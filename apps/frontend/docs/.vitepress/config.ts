import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitepress';
import { buildFullSidebar } from './plugins/apiDocsPlugin';
import { loadDocsMeta } from './plugins/docsMeta';
import { loadPackagesAtBuildTime } from './plugins/packagesLoader';

// Get the directory of this config file for proper path resolution
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Path from .vitepress to the repository-level .docs source directory.
const docsRoot = path.resolve(__dirname, '../../../../.docs');

// Top-level sections (index/packages/guides/patterns/architecture/api) and their order come from `.docs/_meta.json`.
const sections = loadDocsMeta(docsRoot);
const nav = sections.map((section) => ({ text: section.title, link: section.key === 'index' ? '/' : `/${section.key}/` }));
const sidebar = buildFullSidebar(docsRoot, sections);

// Load packages at BUILD TIME - this runs once during vitepress build
const packagesData = loadPackagesAtBuildTime(docsRoot, __dirname);

// Virtual module name for packages data
const virtualModuleId = 'virtual:packages-data';
const resolvedVirtualModuleId = '\0' + virtualModuleId;

export default defineConfig({
    title: 'ngpel',
    description: 'Shared Angular frontend companion libraries — the frontend sister of Archipel.',

    base: '/ngpel/',
    srcDir: docsRoot,
    cleanUrls: true,
    lastUpdated: false,
    appearance: 'dark',

    // Vite plugin to provide packages data as a virtual module
    vite: {
        publicDir: path.join(docsRoot, 'public'),
        plugins: [
            {
                name: 'packages-data-plugin',
                resolveId(id) {
                    if (id === virtualModuleId) {
                        return resolvedVirtualModuleId;
                    }
                    return null;
                },
                load(id) {
                    if (id === resolvedVirtualModuleId) {
                        return `export default ${JSON.stringify(packagesData)}`;
                    }
                    return null;
                },
            },
        ],
    },

    head: [
        ['meta', { name: 'theme-color', content: '#ff2975' }],
        ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
        ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
        [
            'link',
            {
                rel: 'stylesheet',
                href: 'https://fonts.googleapis.com/css2?family=Satisfy&family=Orbitron:wght@500;600;700;800;900&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap',
            },
        ],
    ],

    themeConfig: {
        logo: undefined,
        siteTitle: 'ngpel',

        nav,

        sidebar,

        socialLinks: [{ icon: 'github', link: 'https://github.com/pixel-brewery/ngpel' }],

        search: {
            provider: 'local',
        },

        editLink: {
            pattern: 'https://github.com/pixel-brewery/ngpel/edit/main/.docs/:path',
            text: 'Suggest a docs edit',
        },

        footer: {
            message: 'Released under the MIT License.',
            copyright: '© 2026 Pixel Brewery',
        },
    },

    markdown: {
        lineNumbers: true,
    },
});
