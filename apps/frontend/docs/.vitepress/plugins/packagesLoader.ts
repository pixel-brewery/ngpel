/**
 * packagesLoader.ts
 *
 * Build-time loader that pairs every `.docs/packages/<slug>/index.md` with its library's
 * `libs/<slug>/package.json` and extracts the metadata the docs site needs.
 * This runs ONCE at VitePress build time, not at runtime.
 *
 * **100% Dynamic**: nothing is hardcoded here. Sources, in order of precedence:
 * - `.docs/packages/<slug>/index.md` frontmatter: `title`, `description`, `package`, `category`, `order`
 * - `libs/<slug>/package.json`: `name`, `description`, `keywords` and the `ngpel` namespace:
 *   - `ngpel.category`: category name (e.g. "Foundation", "Composition"); required in one of the two sources
 *   - `ngpel.layer`: dependency layer (0 = zero ngpel dependencies)
 *   - `ngpel.featured`: optional boolean to highlight important packages
 */

import matter from 'gray-matter';
import fs from 'node:fs';
import path from 'node:path';

export interface IPackageInfo {
    slug: string;
    name: string;
    description: string;
    keywords: string[];
    category: string;
    layer: number | null;
    featured: boolean;
    order: number;
}

export interface ICategoryInfo {
    title: string;
    packages: IPackageInfo[];
}

export interface IPackagesData {
    packages: IPackageInfo[];
    categories: ICategoryInfo[];
    count: number;
}

const NPM_NAME_PREFIX = '@pixel-brewery/ngpel-';

interface ILibraryPackageJson {
    name?: unknown;
    description?: unknown;
    keywords?: unknown;
    ngpel?: {
        category?: unknown;
        layer?: unknown;
        featured?: unknown;
    };
}

/**
 * Loads all package metadata from `.docs/packages` and `libs` at build time.
 * This function is called ONCE during VitePress build, not at runtime.
 */
export function loadPackagesAtBuildTime(docsRoot: string, configDir: string): IPackagesData {
    const packagesDocsDir = path.join(docsRoot, 'packages');
    // Go from .vitepress → docs → frontend → apps → root → libs
    const libsDir = path.resolve(configDir, '../../../../libs');
    const packages: IPackageInfo[] = [];

    if (!fs.existsSync(packagesDocsDir)) {
        console.warn('[packagesLoader] Packages docs directory not found:', packagesDocsDir);
        return { packages: [], categories: [], count: 0 };
    }

    const slugs = fs
        .readdirSync(packagesDocsDir, { withFileTypes: true })
        .filter((d) => d.isDirectory())
        .map((d) => d.name)
        .sort();

    for (const slug of slugs) {
        const indexPath = path.join(packagesDocsDir, slug, 'index.md');
        if (!fs.existsSync(indexPath)) {
            console.warn('[packagesLoader] Missing index.md for', slug);
            continue;
        }

        const frontmatter = readFrontmatter(indexPath);
        const pkg = readLibraryPackageJson(path.join(libsDir, slug, 'package.json'));
        const ngpelConfig = pkg?.ngpel;

        const category = asNonEmptyString(frontmatter['category']) ?? asNonEmptyString(ngpelConfig?.category);
        if (!category) {
            throw new Error(
                `[packagesLoader] ${slug}: neither .docs/packages/${slug}/index.md (category) nor libs/${slug}/package.json (ngpel.category) declares a category.`,
            );
        }

        if (ngpelConfig?.featured !== undefined && typeof ngpelConfig.featured !== 'boolean') {
            throw new Error(`[packagesLoader] libs/${slug}/package.json ngpel.featured must be a boolean when present.`);
        }

        if (ngpelConfig?.layer !== undefined && !(typeof ngpelConfig.layer === 'number' && Number.isInteger(ngpelConfig.layer))) {
            throw new Error(`[packagesLoader] libs/${slug}/package.json ngpel.layer must be an integer when present.`);
        }

        const keywords = pkg?.keywords;
        const order = frontmatter['order'];

        packages.push({
            slug,
            name: asNonEmptyString(frontmatter['package']) ?? asNonEmptyString(pkg?.name) ?? NPM_NAME_PREFIX + slug,
            description: asNonEmptyString(frontmatter['description']) ?? asNonEmptyString(pkg?.description) ?? '',
            keywords: Array.isArray(keywords) ? keywords.filter((keyword): keyword is string => typeof keyword === 'string') : [],
            category,
            layer: typeof ngpelConfig?.layer === 'number' ? ngpelConfig.layer : null,
            featured: ngpelConfig?.featured === true,
            order: typeof order === 'number' && Number.isFinite(order) ? order : 999,
        });
    }

    // Sort: featured first, then by documented order (layer * 10 by convention), then alphabetically
    packages.sort((a, b) => {
        if (a.featured !== b.featured) return a.featured ? -1 : 1;
        if (a.order !== b.order) return a.order - b.order;
        return a.slug.localeCompare(b.slug);
    });

    // Build categories from package data
    const categoryMap = new Map<string, IPackageInfo[]>();
    for (const pkg of packages) {
        const categoryPackages = categoryMap.get(pkg.category);
        if (categoryPackages) {
            categoryPackages.push(pkg);
        } else {
            categoryMap.set(pkg.category, [pkg]);
        }
    }

    // Convert map to array; categories are ranked by their lowest package order so the foundation leads.
    const categories: ICategoryInfo[] = [...categoryMap.entries()]
        .map(([title, categoryPackages]) => ({
            title,
            packages: categoryPackages,
            rank: Math.min(...categoryPackages.map((pkg) => pkg.order)),
        }))
        .sort((firstCategory, secondCategory) => firstCategory.rank - secondCategory.rank || firstCategory.title.localeCompare(secondCategory.title))
        .map(({ title, packages: categoryPackages }) => ({ title, packages: categoryPackages }));

    console.log('[packagesLoader] Loaded', packages.length, 'packages in', categories.length, 'categories from .docs/packages and libs/');

    return { packages, categories, count: packages.length };
}

function readFrontmatter(filePath: string): Record<string, unknown> {
    try {
        return matter(fs.readFileSync(filePath, 'utf-8')).data;
    } catch (error: unknown) {
        const message = error instanceof Error ? (error.message.split('\n')[0] ?? error.message) : String(error);
        throw new Error(`[packagesLoader] Invalid frontmatter in ${filePath}: ${message}. Quote YAML values that start with "@" or contain ": ".`, {
            cause: error,
        });
    }
}

function readLibraryPackageJson(packageJsonPath: string): ILibraryPackageJson | null {
    if (!fs.existsSync(packageJsonPath)) {
        return null;
    }

    return JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8')) as ILibraryPackageJson;
}

function asNonEmptyString(value: unknown): string | null {
    return typeof value === 'string' && value.trim().length > 0 ? value : null;
}
