/**
 * NX Executor: generate-package-docs
 *
 * Generates API documentation for a single NX library package using TypeDoc.
 * All project-specific values (name, paths, entry points) are derived from
 * the NX project graph and the library's own package.json.
 *
 * Entry points follow the ng-packagr layout consumed by `@nx/angular:package`:
 * - primary:   `<projectRoot>/src/index.ts`
 * - secondary: every `<projectRoot>/<entry>/ng-package.json`, resolved through its `lib.entryFile`
 *
 * Output: .docs/packages/{projectName}/api/
 *
 * Post-processing:
 * - Removes README.md (package readme - already exists as manual docs)
 * - Removes _media directory (typedoc-plugin-markdown copies full dependency trees)
 * - Renames globals.md → index.md (API listing)
 * - Writes a placeholder index.md when the package exports no symbols yet
 * - Rewrites internal links for VitePress compatibility
 * - Escapes angle brackets for Vue/VitePress
 * - Normalizes frontmatter with generated flag
 * - Strips TypeDoc package back-links
 * - Resolves unresolved {@link} TSDoc references
 */

import type { ExecutorContext } from '@nx/devkit';
import { logger } from '@nx/devkit';
import * as fs from 'node:fs';
import * as path from 'node:path';
import type { TypeDocOptions } from 'typedoc' with { 'resolution-mode': 'import' };
import type { PluginOptions } from 'typedoc-plugin-markdown' with { 'resolution-mode': 'import' };

import {
    countMarkdownFiles,
    escapeAngleBrackets,
    escapeVueInterpolation,
    normalizeFrontmatter,
    resolveInlineLinks,
    rewriteLinks,
    stripPackageBackLink,
} from '../../utils/markdown-processing';

export interface IGeneratePackageDocsOptions {
    outputDir?: string;
}

/** Directories under the project root that are never ng-packagr secondary entry points. */
const IGNORED_ENTRY_DIRECTORIES = new Set<string>(['node_modules', 'dist', 'src']);

export default async function runExecutor(options: IGeneratePackageDocsOptions, context: ExecutorContext): Promise<{ success: boolean }> {
    const root = context.root;
    const projectName = context.projectName;

    if (!projectName) {
        logger.error('No project name available in executor context.');
        return { success: false };
    }

    const projectNode = context.projectGraph?.nodes[projectName];
    if (!projectNode) {
        logger.error(`Project "${projectName}" not found in project graph.`);
        return { success: false };
    }

    const projectRoot = path.join(root, projectNode.data.root);
    const entryPoint = path.join(projectRoot, 'src', 'index.ts');
    const tsConfig = path.join(projectRoot, 'tsconfig.lib.json');
    const outDir = options.outputDir ? path.resolve(root, options.outputDir) : path.join(root, '.docs', 'packages', projectName, 'api');

    // Auto-detect package display name from the library's package.json
    const packageDisplayName = readPackageName(path.join(projectRoot, 'package.json')) ?? projectName;

    if (!fs.existsSync(entryPoint)) {
        logger.error(`Entry point not found: ${entryPoint}`);
        return { success: false };
    }

    logger.info(`📦 Generating docs for ${projectName}...`);

    // Clean previous output
    if (fs.existsSync(outDir)) {
        fs.rmSync(outDir, { recursive: true });
    }

    // Discover secondary entry points from the ng-packagr layout (`<projectRoot>/<entry>/ng-package.json`)
    const additionalEntryPoints = discoverSecondaryEntryPoints(projectRoot);

    // Create a temporary barrel file when additional entry points exist.
    // IMPORTANT: The temp file is placed in the project root (not inside src/ or <entry>/src/)
    // to avoid being picked up by tsconfig.lib.json ("include": ["src/**/*.ts", "*/src/**/*.ts"])
    // during parallel NX builds, which would cause TS6053 errors.
    // A companion temporary tsconfig extends the lib tsconfig and explicitly
    // adds the temp entry file via "files" so TypeDoc can still resolve it.
    let typedocEntry = entryPoint;
    let tempEntryFile: string | null = null;
    const tempTsConfigFile = path.join(projectRoot, '_typedoc-tsconfig.json');

    if (additionalEntryPoints.length > 0) {
        logger.info(`  📂 Entry points: main + ${additionalEntryPoints.length} subpath(s)`);
        tempEntryFile = path.join(projectRoot, '_typedoc-entry.ts');

        const lines = ["export * from './src/index';"];
        for (const ep of additionalEntryPoints) {
            const rel = path.relative(projectRoot, ep).replace(/\.ts$/, '').replace(/\\/g, '/');
            lines.push(`export * from './${rel}';`);
        }
        fs.writeFileSync(tempEntryFile, lines.join('\n') + '\n', 'utf-8');
        typedocEntry = tempEntryFile;
    }

    try {
        // Resolve workspace imports against sources. The library build config points at
        // dist declarations, which may be absent or stale when documentation runs.
        const sourceConfig = path.relative(projectRoot, path.join(root, 'tsconfig.base.json')).replaceAll('\\', '/');
        const tempTsConfigContent = {
            extends: fs.existsSync(tsConfig) ? ['./tsconfig.lib.json', sourceConfig] : sourceConfig,
            compilerOptions: { composite: false },
            files: [`./${path.relative(projectRoot, typedocEntry).replaceAll('\\', '/')}`],
            include: ['src/**/*.ts'],
            exclude: ['**/*.spec.ts', '**/*.test.ts', 'src/test-setup.ts', 'dist'],
        };
        fs.writeFileSync(tempTsConfigFile, JSON.stringify(tempTsConfigContent, null, 2), 'utf-8');
        // Dynamic import - TypeDoc is an ESM-only package
        const { Application } = await import('typedoc');

        const typedocOptions: Partial<TypeDocOptions> & Partial<PluginOptions> = {
            entryPoints: [typedocEntry],
            entryPointStrategy: 'resolve',
            tsconfig: tempTsConfigFile,
            skipErrorChecking: true,
            out: outDir,
            plugin: ['typedoc-plugin-markdown'],

            // Markdown output options
            outputFileStrategy: 'members',
            flattenOutputFiles: true,
            hidePageHeader: false,
            hidePageTitle: false,
            hideBreadcrumbs: true,
            useCodeBlocks: true,
            expandObjects: true,
            parametersFormat: 'table',
            enumMembersFormat: 'table',
            typeDeclarationFormat: 'table',
            indexFormat: 'table',
            membersWithOwnFile: ['Class', 'Interface', 'TypeAlias', 'Enum', 'Function', 'Variable'],

            projectDocuments: [],

            // Filtering
            excludePrivate: true,
            excludeProtected: false,
            excludeInternal: true,
            excludeExternals: true,

            // Presentation
            categoryOrder: ['Classes', 'Interfaces', 'Type Aliases', 'Functions', 'Enumerations', 'Variables'],
            sort: ['alphabetical'],
            kindSortOrder: ['Class', 'Interface', 'TypeAlias', 'Function', 'Enum', 'Variable'],

            // Source links
            sourceLinkTemplate: 'https://github.com/pixel-brewery/ngpel/blob/{gitRevision}/{path}#L{line}',
            gitRevision: 'main',

            logLevel: 'Warn',
            name: packageDisplayName,
        };

        const app = await Application.bootstrapWithPlugins(typedocOptions);
        const project = await app.convert();

        if (!project) {
            logger.error(`  ❌ TypeDoc conversion failed for ${projectName}`);
            return { success: false };
        }

        await app.generateOutputs(project);

        // Post-process: remove README.md, _media directory, rename globals.md → index.md
        const readmePath = path.join(outDir, 'README.md');
        if (fs.existsSync(readmePath)) {
            fs.unlinkSync(readmePath);
        }

        const mediaDir = path.join(outDir, '_media');
        if (fs.existsSync(mediaDir)) {
            fs.rmSync(mediaDir, { recursive: true });
            logger.info(`  🗑️  Removed _media directory for ${projectName}`);
        }

        const globalsPath = path.join(outDir, 'globals.md');
        const indexPath = path.join(outDir, 'index.md');
        if (fs.existsSync(globalsPath) && !fs.existsSync(indexPath)) {
            fs.renameSync(globalsPath, indexPath);
        }

        // A package whose barrels are still empty (`export {};`) yields no symbols: TypeDoc then emits a
        // bare globals page or nothing at all. Keep the docs site navigable and say so on the index page.
        const symbolCount = project.children?.length ?? 0;
        if (symbolCount === 0) {
            writeEmptyPackageIndex(indexPath, packageDisplayName);
            logger.warn(`  ⚠ ${projectName} exports no public API symbols yet - wrote an empty API index page`);
        }

        // Post-process all generated Markdown files
        processGeneratedMarkdown(outDir);

        const count = countMarkdownFiles(outDir);
        logger.info(`✅ ${projectName}: ${count} API doc files`);

        return { success: true };
    } catch (error) {
        logger.error(`Failed to generate docs for ${projectName}: ${error}`);
        return { success: false };
    } finally {
        if (tempEntryFile && fs.existsSync(tempEntryFile)) {
            fs.unlinkSync(tempEntryFile);
        }
        if (fs.existsSync(tempTsConfigFile)) {
            fs.unlinkSync(tempTsConfigFile);
        }
    }
}

/**
 * Reads the `name` of the library's package.json; returns null when the file is missing or unreadable.
 */
function readPackageName(packageJsonPath: string): string | null {
    if (!fs.existsSync(packageJsonPath)) {
        return null;
    }

    try {
        const pkgJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8')) as { name?: unknown };
        return typeof pkgJson.name === 'string' && pkgJson.name.length > 0 ? pkgJson.name : null;
    } catch {
        // Falls back to project name
        return null;
    }
}

/**
 * Discovers ng-packagr secondary entry points: every `<projectRoot>/<entry>/ng-package.json`
 * resolved through the marker's `lib.entryFile`. `node_modules` and `dist` are ignored.
 */
function discoverSecondaryEntryPoints(projectRoot: string): string[] {
    const entryPoints: string[] = [];

    for (const entry of fs.readdirSync(projectRoot, { withFileTypes: true })) {
        if (!entry.isDirectory() || entry.name.startsWith('.') || IGNORED_ENTRY_DIRECTORIES.has(entry.name)) {
            continue;
        }

        const entryDir = path.join(projectRoot, entry.name);
        if (!fs.existsSync(path.join(entryDir, 'ng-package.json'))) {
            continue;
        }

        // The marker's entryFile is authoritative: the code lives under the package's src/ directory.
        const marker = JSON.parse(fs.readFileSync(path.join(entryDir, 'ng-package.json'), 'utf-8')) as {
            lib?: { entryFile?: unknown };
        };
        const entryFile = typeof marker.lib?.entryFile === 'string' ? marker.lib.entryFile : 'src/index.ts';
        const indexFile = path.resolve(entryDir, entryFile);
        if (fs.existsSync(indexFile)) {
            entryPoints.push(indexFile);
        } else {
            logger.warn(`  ⚠ Secondary entry point "${entry.name}" points at a missing ${entryFile} - skipped`);
        }
    }

    return entryPoints.sort();
}

/**
 * Writes the API index page of a package without public symbols; `processGeneratedMarkdown` adds the frontmatter afterwards.
 */
function writeEmptyPackageIndex(indexPath: string, packageDisplayName: string): void {
    fs.mkdirSync(path.dirname(indexPath), { recursive: true });
    const content = [`# ${packageDisplayName}`, '', 'This package does not export any public API symbols yet.', ''].join('\n');
    fs.writeFileSync(indexPath, content, 'utf-8');
}

function processGeneratedMarkdown(dir: string): void {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            processGeneratedMarkdown(fullPath);
        } else if (entry.name.endsWith('.md')) {
            normalizeFrontmatter(fullPath, { generated: true });
            rewriteLinks(fullPath);
            stripPackageBackLink(fullPath);
            resolveInlineLinks(fullPath);
            escapeAngleBrackets(fullPath);
            escapeVueInterpolation(fullPath);
        }
    }
}
