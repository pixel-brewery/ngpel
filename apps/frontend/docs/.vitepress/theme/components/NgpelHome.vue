<script setup lang="ts">
import { withBase } from 'vitepress';
import packagesData from 'virtual:packages-data';

// Packages are loaded at BUILD TIME from .docs/packages/{slug}/index.md and libs/{slug}/package.json.
// Add a new library with its docs index and it appears automatically.
// Set `ngpel.featured: true` in package.json to highlight a package.
const packages = packagesData.packages.map((pkg) => ({
    name: pkg.slug,
    desc: pkg.description,
    featured: pkg.featured,
    layer: pkg.layer,
}));

const packageCount = packagesData.count;
const layerCount = new Set(packagesData.packages.map((pkg) => pkg.layer).filter((layer) => layer !== null)).size;
const projectShields = [
    {
        label: 'GitHub Packages',
        href: 'https://github.com/orgs/pixel-brewery/packages',
        image: 'https://img.shields.io/badge/registry-GitHub%20Packages-181717?style=flat-square&logo=github&logoColor=white',
    },
    {
        label: 'GitHub Actions CI',
        href: 'https://github.com/pixel-brewery/ngpel/actions/workflows/ci.yml',
        image: 'https://img.shields.io/badge/CI-GitHub%20Actions-2088FF?style=flat-square&logo=githubactions&logoColor=white',
    },
    {
        label: 'MIT License',
        href: 'https://github.com/pixel-brewery/ngpel/blob/main/LICENSE',
        image: 'https://img.shields.io/badge/license-MIT-2ea44f?style=flat-square',
    },
    {
        label: 'Node.js 22.22.3 or later on 22.x',
        href: 'https://nodejs.org/',
        image: 'https://img.shields.io/badge/node-22.22.3%2B-339933?style=flat-square&logo=nodedotjs&logoColor=white',
    },
    {
        label: 'Yarn 4.10.3',
        href: 'https://yarnpkg.com/',
        image: 'https://img.shields.io/badge/yarn-4.10.3-2C8EBB?style=flat-square&logo=yarn&logoColor=white',
    },
    {
        label: 'Nx 23.1.2',
        href: 'https://nx.dev/',
        image: 'https://img.shields.io/badge/Nx-23.1.2-143055?style=flat-square&logo=nx&logoColor=white',
    },
    {
        label: 'Angular 22',
        href: 'https://angular.dev/',
        image: 'https://img.shields.io/badge/Angular-22-DD0031?style=flat-square&logo=angular&logoColor=white',
    },
    {
        label: 'TypeScript 6',
        href: 'https://www.typescriptlang.org/',
        image: 'https://img.shields.io/badge/TypeScript-6-3178C6?style=flat-square&logo=typescript&logoColor=white',
    },
];
</script>

<template>
    <div class="ngpel-home">
        <!-- Hero -->
        <section class="hero">
            <div class="hero-glow"></div>
            <div class="hero-content">
                <div class="hero-badge">Open Source Libraries</div>
                <h1 class="hero-title">
                    <span class="hero-title-gradient">ngpel</span>
                </h1>
                <p class="hero-tagline">
                    Shared Angular frontend companion libraries — the MVP triad, commands, feature composition, navigation, storage and more, cut vertically per
                    concern with subpath entry points.
                </p>
                <div class="hero-shields" aria-label="Project metadata">
                    <a
                        v-for="shield in projectShields"
                        :key="shield.label"
                        :href="shield.href"
                        :aria-label="shield.label"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img :src="shield.image" :alt="shield.label" />
                    </a>
                </div>
                <div class="hero-actions">
                    <a :href="withBase('/guides/')" class="btn btn-primary">Get Started</a>
                    <a :href="withBase('/packages/')" class="btn btn-secondary">View Packages</a>
                </div>
            </div>
        </section>

        <!-- Package registry -->
        <section class="registry-card" aria-labelledby="registry-title">
            <div class="registry-copy">
                <span class="registry-eyebrow">Package Registry</span>
                <h2 id="registry-title">Published on GitHub Packages</h2>
                <p>
                    ngpel packages are distributed under the
                    <code>@pixel-brewery</code> scope as <code>@pixel-brewery/ngpel-&lt;name&gt;</code>. GitHub requires a personal access token with
                    <code>read:packages</code> permission for installation.
                </p>
            </div>
            <div class="registry-actions">
                <code>https://npm.pkg.github.com</code>
                <a :href="withBase('/guides/#getting-started')"> Configure package access → </a>
            </div>
        </section>

        <!-- Stats -->
        <section class="stats">
            <div class="stat">
                <span class="stat-value">{{ packageCount }}</span>
                <span class="stat-label">Packages</span>
            </div>
            <div class="stat">
                <span class="stat-value">{{ layerCount }}</span>
                <span class="stat-label">Layers</span>
            </div>
            <div class="stat">
                <span class="stat-value">Partial-Ivy</span>
                <span class="stat-label">ng-packagr</span>
            </div>
            <div class="stat">
                <span class="stat-value">Strict</span>
                <span class="stat-label">Type Safety</span>
            </div>
        </section>

        <!-- Packages grid -->
        <section class="packages">
            <h2 class="section-title">Packages</h2>
            <p class="section-desc">
                Each package is independently installable, tree-shakeable through subpath entry points and imports only strictly lower layers.
            </p>
            <div class="packages-grid">
                <a
                    v-for="pkg in packages"
                    :key="pkg.name"
                    :href="withBase(`/packages/${pkg.name}/`)"
                    class="package-card"
                    :class="{ 'package-card--featured': pkg.featured }"
                >
                    <div class="package-card-header">
                        <span v-if="pkg.layer !== null" class="package-layer">Layer {{ pkg.layer }}</span>
                        <span v-if="pkg.featured" class="package-badge">Featured</span>
                    </div>
                    <h3 class="package-name">{{ pkg.name }}</h3>
                    <p class="package-desc">{{ pkg.desc }}</p>
                </a>
            </div>
        </section>

        <!-- Architecture principles -->
        <section class="principles">
            <h2 class="section-title">Architecture Principles</h2>
            <div class="principles-grid">
                <div class="principle">
                    <div class="principle-icon">🧩</div>
                    <h3>Vertical Packages</h3>
                    <p>One npm package per concern with a zero-dependency <code>core</code>. Dependencies flow strictly downward through the layers.</p>
                </div>
                <div class="principle">
                    <div class="principle-icon">⚙️</div>
                    <h3>Composable Providers</h3>
                    <p>
                        Every package exposes <code>provide&lt;Feature&gt;()</code> and contributes optional capabilities through
                        <code>with&lt;Option&gt;()</code> factories.
                    </p>
                </div>
                <div class="principle">
                    <div class="principle-icon">🔌</div>
                    <h3>Ports &amp; Adapters</h3>
                    <p>Ports are abstract classes that double as DI tokens. Products supply the concrete adapters behind them.</p>
                </div>
                <div class="principle">
                    <div class="principle-icon">🛡️</div>
                    <h3>Type Safety</h3>
                    <p>Full TypeScript strict mode. No <code>any</code>. Signals, <code>inject()</code> and standalone components throughout.</p>
                </div>
            </div>
        </section>
    </div>
</template>

<style scoped>
.ngpel-home {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 24px 80px;
}

/* ─── Hero ─── */
.hero {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 80px 0 60px;
    overflow: visible;
}

.hero-glow {
    position: absolute;
    top: -100px;
    left: 50%;
    transform: translateX(-50%);
    width: 700px;
    height: 500px;
    background: radial-gradient(ellipse, rgba(255, 20, 147, 0.15) 0%, rgba(255, 77, 184, 0.06) 40%, transparent 70%);
    pointer-events: none;
    z-index: 0;
}

.dark .hero-glow {
    background: radial-gradient(ellipse, rgba(255, 20, 147, 0.25) 0%, rgba(255, 77, 184, 0.1) 40%, transparent 70%);
}

.hero-content {
    position: relative;
    z-index: 1;
}

.hero-badge {
    display: inline-block;
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    padding: 4px 14px;
    border-radius: 20px;
    background: var(--vp-c-brand-soft);
    color: var(--vp-c-brand-1);
    border: 1px solid rgba(255, 20, 147, 0.2);
    margin-bottom: 24px;
}

.hero-title {
    font-family: var(--ngpel-font-display);
    font-size: 3.5rem;
    font-weight: 700;
    letter-spacing: -0.04em;
    line-height: 1.1;
    margin: 0 0 20px;
}

.hero-title-gradient {
    background: linear-gradient(135deg, #ff1493 0%, #ff4db8 50%, #ff86d6 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.hero-tagline {
    font-size: 1.125rem;
    line-height: 1.6;
    color: var(--ngpel-text-muted);
    max-width: 560px;
    margin: 0 auto 32px;
}

.hero-shields {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 6px;
    max-width: 760px;
    margin: 0 auto 32px;
}

.hero-shields a {
    display: inline-flex;
    border-radius: 3px;
    transition:
        transform 0.15s ease,
        opacity 0.15s ease;
}

.hero-shields a:hover {
    opacity: 0.85;
    transform: translateY(-1px);
}

.hero-shields img {
    display: block;
    height: 20px;
}

.hero-actions {
    display: flex;
    gap: 12px;
    justify-content: center;
    flex-wrap: wrap;
    margin-bottom: 32px;
}

.btn {
    display: inline-flex;
    align-items: center;
    padding: 10px 24px;
    border-radius: 8px;
    font-size: 0.9rem;
    font-weight: 600;
    text-decoration: none;
    transition:
        transform 0.15s ease,
        box-shadow 0.15s ease;
}

.btn-primary {
    background: linear-gradient(135deg, #ff1493, #ff4db8);
    color: #fff;
    box-shadow: 0 2px 12px rgba(255, 20, 147, 0.3);
}

.btn-primary:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 20px rgba(255, 20, 147, 0.4);
}

.btn-secondary {
    background: transparent;
    color: var(--ngpel-text);
    border: 1px solid var(--ngpel-border);
}

.btn-secondary:hover {
    border-color: #ff1493;
    background: var(--vp-c-brand-soft);
}

.hero-code {
    display: inline-block;
    background: var(--vp-code-bg);
    border: 1px solid var(--ngpel-border-subtle);
    border-radius: 8px;
    padding: 8px 20px;
}

.hero-code code {
    font-family: var(--vp-font-family-mono);
    font-size: 0.85rem;
    color: var(--ngpel-text-muted);
}

/* ─── Package registry ─── */
.registry-card {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    align-items: center;
    gap: 32px;
    padding: 28px 32px;
    margin: 0 0 32px;
    border: 1px solid rgba(255, 20, 147, 0.25);
    border-radius: 12px;
    background: linear-gradient(135deg, var(--ngpel-bg-alt) 0%, rgba(255, 20, 147, 0.06) 100%);
}

.dark .registry-card {
    background: linear-gradient(135deg, var(--ngpel-bg-elevated) 0%, rgba(255, 20, 147, 0.1) 100%);
}

.registry-eyebrow {
    display: block;
    margin-bottom: 6px;
    color: var(--vp-c-brand-1);
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
}

.registry-copy h2 {
    margin: 0 0 8px;
    color: var(--ngpel-text);
    font-family: var(--ngpel-font-display);
    font-size: 1.25rem;
}

.registry-copy p {
    max-width: 680px;
    margin: 0;
    color: var(--ngpel-text-muted);
    font-size: 0.9rem;
    line-height: 1.6;
}

.registry-copy code,
.registry-actions code {
    font-family: var(--vp-font-family-mono);
}

.registry-actions {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
}

.registry-actions code {
    padding: 6px 10px;
    border: 1px solid var(--ngpel-border-subtle);
    border-radius: 6px;
    background: var(--vp-code-bg);
    color: var(--ngpel-text-muted);
    font-size: 0.78rem;
}

.registry-actions a {
    color: var(--vp-c-brand-1);
    font-size: 0.85rem;
    font-weight: 600;
    text-decoration: none;
}

.registry-actions a:hover {
    text-decoration: underline;
}

/* ─── Stats ─── */
.stats {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1px;
    background: var(--ngpel-border-subtle);
    border: 1px solid var(--ngpel-border-subtle);
    border-radius: 12px;
    overflow: hidden;
    margin: 0 0 80px;
}

.stat {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 24px 16px;
    background: var(--ngpel-bg);
}

.dark .stat {
    background: var(--ngpel-bg-elevated);
}

.stat-value {
    font-family: var(--ngpel-font-display);
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--ngpel-text);
    margin-bottom: 4px;
}

.stat-label {
    font-size: 0.8rem;
    color: var(--ngpel-text-faint);
    text-transform: uppercase;
    letter-spacing: 0.05em;
}

/* ─── Section headers ─── */
.section-title {
    font-family: var(--ngpel-font-display);
    font-size: 1.75rem;
    font-weight: 700;
    letter-spacing: -0.02em;
    text-align: center;
    margin-bottom: 8px;
    color: var(--ngpel-text);
}

.section-desc {
    text-align: center;
    color: var(--ngpel-text-muted);
    font-size: 1rem;
    margin-bottom: 40px;
    max-width: 500px;
    margin-left: auto;
    margin-right: auto;
}

/* ─── Package cards ─── */
.packages {
    margin-bottom: 80px;
}

.packages-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 16px;
}

.package-card {
    display: block;
    padding: 24px;
    border: 1px solid var(--ngpel-border-subtle);
    border-radius: 12px;
    background: var(--ngpel-bg-alt);
    text-decoration: none;
    color: inherit;
    transition:
        border-color 0.25s ease,
        box-shadow 0.25s ease,
        transform 0.25s ease;
}

.package-card:hover {
    border-color: rgba(255, 20, 147, 0.3);
    box-shadow: 0 4px 20px rgba(255, 20, 147, 0.08);
    transform: translateY(-2px);
}

.dark .package-card {
    background: var(--ngpel-bg-elevated);
}

.dark .package-card:hover {
    box-shadow: 0 4px 20px rgba(255, 20, 147, 0.15);
}

.package-card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    margin-bottom: 12px;
    min-height: 24px;
}

.package-card--featured {
    border-color: rgba(255, 20, 147, 0.4);
    background: linear-gradient(135deg, var(--ngpel-bg-alt) 0%, rgba(255, 20, 147, 0.05) 100%);
}

.dark .package-card--featured {
    background: linear-gradient(135deg, var(--ngpel-bg-elevated) 0%, rgba(255, 20, 147, 0.08) 100%);
}

.package-badge {
    font-size: 0.65rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: #ff1493;
    background: rgba(255, 20, 147, 0.1);
    border: 1px solid rgba(255, 20, 147, 0.2);
    padding: 2px 8px;
    border-radius: 20px;
}

.package-layer {
    font-size: 0.65rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--ngpel-text-faint);
    background: var(--ngpel-bg-elevated);
    border: 1px solid var(--ngpel-border-subtle);
    padding: 2px 8px;
    border-radius: 20px;
}

.package-name {
    font-family: var(--vp-font-family-mono);
    font-size: 0.9rem;
    font-weight: 600;
    color: var(--ngpel-text);
    margin: 0 0 8px;
}

.package-desc {
    font-size: 0.85rem;
    color: var(--ngpel-text-muted);
    line-height: 1.5;
    margin: 0;
}

/* ─── Principles ─── */
.principles-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: 16px;
}

.principle {
    padding: 24px;
    border: 1px solid var(--ngpel-border-subtle);
    border-radius: 12px;
    background: var(--ngpel-bg-alt);
    transition: border-color 0.25s ease;
}

.principle:hover {
    border-color: var(--ngpel-border);
}

.dark .principle {
    background: var(--ngpel-bg-elevated);
}

.principle-icon {
    font-size: 1.5rem;
    margin-bottom: 12px;
}

.principle h3 {
    font-family: var(--ngpel-font-display);
    font-size: 1rem;
    font-weight: 600;
    margin: 0 0 8px;
    color: var(--ngpel-text);
}

.principle p {
    font-size: 0.85rem;
    color: var(--ngpel-text-muted);
    line-height: 1.6;
    margin: 0;
}

.principle code {
    font-size: 0.8em;
    background: var(--vp-c-brand-soft);
    color: var(--vp-c-brand-1);
    padding: 1px 5px;
    border-radius: 4px;
}

/* ─── Responsive ─── */
@media (max-width: 768px) {
    .hero-title {
        font-size: 2.25rem;
    }

    .registry-card {
        grid-template-columns: 1fr;
        gap: 20px;
    }

    .stats {
        grid-template-columns: repeat(2, 1fr);
    }

    .packages-grid,
    .principles-grid {
        grid-template-columns: 1fr;
    }
}

@media (max-width: 480px) {
    .hero-title {
        font-size: 1.75rem;
    }

    .hero-tagline {
        font-size: 1rem;
    }

    .stats {
        grid-template-columns: 1fr 1fr;
    }
}
</style>
