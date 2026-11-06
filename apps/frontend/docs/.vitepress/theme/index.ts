import type { Theme } from 'vitepress';
import DefaultTheme from 'vitepress/theme';
import ApiMetaHeader from './components/ApiMetaHeader.vue';
import ApiOverview from './components/ApiOverview.vue';
import InstallTabs from './components/InstallTabs.vue';
import NgpelLayout from './components/NgpelLayout.vue';
import PackagesOverview from './components/PackagesOverview.vue';
import './style.css';

export default {
    extends: DefaultTheme,
    Layout: NgpelLayout,
    enhanceApp({ app }) {
        app.component('ApiMetaHeader', ApiMetaHeader);
        app.component('ApiOverview', ApiOverview);
        app.component('InstallTabs', InstallTabs);
        app.component('PackagesOverview', PackagesOverview);
    },
} satisfies Theme;
