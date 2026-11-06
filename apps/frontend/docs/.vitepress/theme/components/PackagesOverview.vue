<script setup lang="ts">
import { withBase } from 'vitepress';
import packagesData from 'virtual:packages-data';
import { computed, ref } from 'vue';

/**
 * Categories are 100% dynamic - they come from each package's `.docs/packages/{slug}/index.md`
 * frontmatter or its library's package.json `ngpel.category` field. No static arrays here!
 */

const query = ref<string>('');

const packagesByCategory = computed(() => {
    const normalizedQuery = query.value.trim().toLowerCase();

    // Filter packages based on search query, then group by category
    return packagesData.categories
        .map((category) => {
            const filteredPackages = category.packages.filter(
                (p) =>
                    !normalizedQuery ||
                    p.slug.toLowerCase().includes(normalizedQuery) ||
                    p.name.toLowerCase().includes(normalizedQuery) ||
                    p.description.toLowerCase().includes(normalizedQuery) ||
                    p.keywords.some((kw) => kw.toLowerCase().includes(normalizedQuery)),
            );

            return { ...category, packages: filteredPackages };
        })
        .filter((c) => c.packages.length > 0);
});
</script>

<template>
    <div class="packages-overview">
        <p>
            ngpel is organized into <strong>{{ packagesData.count }}</strong> independent Angular packages published under the
            <code>@pixel-brewery</code> scope. Each package can be installed and used on its own — you only pull in what you import.
        </p>
        <p>
            Every package follows the same structure: a <code>provide&lt;Feature&gt;()</code> root provider composed from
            <code>with&lt;Option&gt;()</code> features, abstract ports as contracts you implement, and subpath entry points for optional adapters.
        </p>

        <div class="packages-search">
            <input v-model="query" type="text" placeholder="Filter packages..." class="packages-search-input" />
        </div>

        <template v-for="category in packagesByCategory" :key="category.title">
            <h2>{{ category.title }}</h2>
            <table class="packages-table">
                <thead>
                    <tr>
                        <th>Package</th>
                        <th>Layer</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="pkg in category.packages" :key="pkg.slug">
                        <td>
                            <a :href="withBase(`/packages/${pkg.slug}/`)"
                                ><code>{{ pkg.slug }}</code></a
                            >
                        </td>
                        <td>{{ pkg.layer ?? '—' }}</td>
                        <td>{{ pkg.description }}</td>
                    </tr>
                </tbody>
            </table>
        </template>
    </div>
</template>

<style scoped>
.packages-overview {
    margin-top: 1rem;
}

.packages-search {
    margin: 1.5rem 0;
}

.packages-search-input {
    width: 100%;
    max-width: 400px;
    padding: 0.5rem 0.75rem;
    border: 1px solid var(--ngpel-border-subtle);
    border-radius: 8px;
    background: var(--ngpel-bg-elevated);
    color: var(--ngpel-text);
    font-size: 0.9rem;
    outline: none;
    transition:
        border-color 0.2s ease,
        box-shadow 0.2s ease;
}

.packages-search-input:focus {
    border-color: var(--ngpel-indigo);
    box-shadow: 0 0 8px rgba(255, 20, 147, 0.2);
}

.packages-search-input::placeholder {
    color: var(--ngpel-text-faint);
}

.packages-table {
    width: 100%;
    border-collapse: collapse;
    margin: 0.5rem 0 2rem;
}

.packages-table th,
.packages-table td {
    padding: 0.5rem 0.75rem;
    text-align: left;
    border-bottom: 1px solid var(--ngpel-border-subtle);
}

.packages-table th {
    font-family: var(--ngpel-font-display);
    font-weight: 600;
    color: var(--ngpel-indigo);
    font-size: 0.7rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
}

.packages-table td:first-child {
    white-space: nowrap;
}

.packages-table td a {
    color: var(--ngpel-indigo);
    text-decoration: none;
    transition: text-shadow 0.15s ease;
}

.packages-table td a:hover {
    text-shadow: 0 0 8px rgba(255, 20, 147, 0.4);
}
</style>
