import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ButtonComponent } from '@pixel-brewery/mosaik-elements-angular';
import type { INavItem } from '@pixel-brewery/ngpel-router/navigation';
import { createSideNavigationController } from '@pixel-brewery/ngpel-router/shell';
import {
    CollapsibleNavigationPanelComponent,
    NavigationCollapseToggleComponent,
    NavigationComponent,
    NavigationMenuComponent,
    NavigationMenuItemComponent,
} from '@pixel-brewery/ngpel-ui';

@Component({
    selector: 'app-navigation-fixture',
    imports: [
        ButtonComponent,
        CollapsibleNavigationPanelComponent,
        NavigationCollapseToggleComponent,
        NavigationComponent,
        NavigationMenuComponent,
        NavigationMenuItemComponent,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    styles: `
        section {
            position: relative;
            min-height: calc(var(--mosaik-layout-space) * 16);
        }
        ngp-navigation {
            display: block;
            width: var(--app-nav-width);
        }
        .panel-demo {
            display: grid;
            grid-template-columns: var(--app-panel-width) 1fr;
            overflow: clip;
        }
        .panel-workspace {
            padding: var(--mosaik-layout-space);
        }
    `,
    template: `
        <h2>Collapsible navigation</h2>
        <section [style.--app-nav-width]="shell.isNavigationCompact() ? '4rem' : '14rem'">
            <ngp-navigation #navigation id="fixture-navigation" ariaLabel="Fixture navigation" [compact]="shell.isNavigationCompact()">
                <strong ngpNavigationBrand>{{ shell.isNavigationCompact() ? 'N' : 'ngpel' }}</strong>
                <ngp-navigation-menu ngpNavigationContent [compact]="shell.isNavigationCompact()">
                    <ngp-navigation-menu-item [item]="home" [label]="home.label" [compact]="shell.isNavigationCompact()" />
                </ngp-navigation-menu>
            </ngp-navigation>
            @if (!shell.isMobile()) {
                <ngp-navigation-collapse-toggle
                    [navigation]="navigation"
                    [collapsed]="shell.isNavigationCompact()"
                    [label]="shell.isNavigationCompact() ? 'Expand navigation' : 'Collapse navigation'"
                    shortcutKey="b"
                    (collapsedChange)="shell.toggleNavigationCompact()"
                />
            }
        </section>
        <section class="panel-demo" [style.--app-panel-width]="!shell.isMobile() && panelExpanded() ? '16.5rem' : '4.5rem'">
            <ngp-collapsible-navigation-panel
                #panel
                title="Section navigation"
                contentId="fixture-panel-navigation"
                expandLabel="Expand section navigation"
                collapseLabel="Collapse section navigation"
                [(expanded)]="panelExpanded"
            >
                <mosaik-button label="Expanded section" />
                <mosaik-button ngpCollapsibleNavigationPanelCollapsed label="Compact section" />
            </ngp-collapsible-navigation-panel>
            <div class="panel-workspace" [attr.inert]="panel.isOverlayOpen() ? '' : null">
                <mosaik-button label="Workspace action" />
            </div>
        </section>
    `,
})
export class NavigationFixture {
    protected readonly shell = createSideNavigationController({ navigationCompactStorageKey: 'fixture-navigation-compact' });
    protected readonly panelExpanded = signal(false);
    protected readonly home: INavItem = { key: 'fixture-home', label: 'Home', icon: 'home' };
}
