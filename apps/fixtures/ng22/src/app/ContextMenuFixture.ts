import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ButtonComponent, DataTableComponent, MenuComponent, MenuItemComponent } from '@pixel-brewery/mosaik-elements-angular';
import { ContextMenuComponent, ContextMenuContentDirective, ContextMenuTriggerDirective, DataTablePreferencesDirective } from '@pixel-brewery/ngpel-ui';

@Component({
    selector: 'app-context-menu-fixture',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        ButtonComponent,
        DataTableComponent,
        MenuComponent,
        MenuItemComponent,
        ContextMenuComponent,
        ContextMenuContentDirective,
        ContextMenuTriggerDirective,
        DataTablePreferencesDirective,
    ],
    template: `
        <h2>Context menu</h2>
        @for (item of items; track item.name) {
            <mosaik-button [label]="item.name" [ngpContextMenuTriggerFor]="menu" [ngpContextMenuValue]="item" [ngpContextMenuOpenOnClick]="true" />
        }
        <mosaik-data-table
            [source]="items"
            [autoGenerateColumns]="true"
            [resizable]="true"
            [ngpContextMenuTriggerFor]="menu"
            ngpDataTablePreferences="ngpel-fixture-table"
        />
        <ngp-context-menu #menu>
            <ng-template [ngpContextMenuContent]="items" let-item>
                <mosaik-menu>
                    <mosaik-menu-item label="Unavailable" [disabled]="true" />
                    <mosaik-menu-item [label]="'Select ' + item.name" (activated)="selected.set(item.name)" />
                </mosaik-menu>
            </ng-template>
        </ngp-context-menu>
        <p data-ngp-context-selection>{{ selected() }}</p>
    `,
})
export class ContextMenuFixture {
    protected readonly items = [
        { name: 'First record', status: 'Ready' },
        { name: 'Second record', status: 'Waiting' },
    ];
    protected readonly selected = signal('');
}
