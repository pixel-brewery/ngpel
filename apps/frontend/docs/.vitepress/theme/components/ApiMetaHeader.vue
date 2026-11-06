<script setup lang="ts">
import { useData, useRoute, withBase } from 'vitepress';
import { computed } from 'vue';

const { frontmatter } = useData();
const route = useRoute();

const isGenerated = computed(() => frontmatter.value.generated === true);

/** Derive package name from URL path: /packages/core/api/... → @pixel-brewery/ngpel-core */
const packageName = computed(() => {
    if (frontmatter.value.package) return frontmatter.value.package as string;
    const match = route.path.match(/\/packages\/([^/]+)\//);
    return match ? `@pixel-brewery/ngpel-${match[1]}` : '';
});

/** Derive slug for linking back */
const packageSlug = computed(() => {
    const match = route.path.match(/\/packages\/([^/]+)\//);
    return match ? match[1] : '';
});

/** Derive the API kind from the page title (e.g. "Class: BcryptService" → "class") */
const apiKind = computed(() => {
    const title = frontmatter.value.title as string | undefined;
    if (!title) return '';
    const match = title.match(/^(Class|Interface|Type [Aa]lias|Enum|Function|Namespace):/);
    return match ? match[1].toLowerCase().replace(/\s+/g, '-') : '';
});

/** Friendly kind label */
const apiKindLabel = computed(() => {
    const raw = apiKind.value;
    if (!raw) return '';
    return raw.replace('-', ' ');
});

/** Whether this is an API page (under /api/ path) */
const isApiPage = computed(() => route.path.includes('/api/'));
</script>

<template>
    <div v-if="isApiPage && (isGenerated || packageName)" class="api-meta-header">
        <!-- Breadcrumb trail -->
        <nav v-if="packageSlug" class="api-breadcrumb">
            <a :href="withBase('/packages/')" class="api-breadcrumb-link">Packages</a>
            <span class="api-breadcrumb-sep">/</span>
            <a :href="withBase(`/packages/${packageSlug}/`)" class="api-breadcrumb-link">{{ packageSlug }}</a>
            <span class="api-breadcrumb-sep">/</span>
            <span class="api-breadcrumb-current">API Reference</span>
        </nav>

        <!-- Badges row -->
        <div class="api-badges">
            <span v-if="apiKind" :class="`api-kind-badge api-kind-badge--${apiKind}`">
                {{ apiKindLabel }}
            </span>
            <span v-if="packageName" class="package-header__name">
                {{ packageName }}
            </span>
            <span v-if="isGenerated" class="generated-badge"> Auto-generated </span>
        </div>
    </div>
</template>

<style scoped>
.api-meta-header {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-bottom: 20px;
}

.api-breadcrumb {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 0.8rem;
}

.api-breadcrumb-link {
    color: var(--ngpel-text-faint);
    text-decoration: none;
    transition: color 0.15s ease;
}

.api-breadcrumb-link:hover {
    color: var(--ngpel-indigo);
}

.api-breadcrumb-sep {
    color: var(--ngpel-text-faint);
    opacity: 0.5;
}

.api-breadcrumb-current {
    color: var(--ngpel-text-muted);
}

.api-badges {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
}
</style>
