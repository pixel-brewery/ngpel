import { afterRenderEffect, Directive, inject, input } from '@angular/core';
import { DataTableComponent } from '@pixel-brewery/mosaik-elements-angular';
import { DataTableLoadingState, type ITableElement } from './DataTableLoadingState';

/** Keeps a Mosaik data table in place while replacing its body with five loading rows. */
@Directive({
    selector: 'mosaik-data-table[ngpDataTableLoading]',
    standalone: true,
})
export class DataTableLoadingDirective {
    private readonly table = inject(DataTableComponent, { host: true });
    private readonly state = new DataTableLoadingState();

    public readonly loading = input.required<boolean>({ alias: 'ngpDataTableLoading' });

    public constructor() {
        afterRenderEffect(() => {
            const loading = this.loading();
            const source = this.table.source();
            this.state.update(this.table.elementRef.nativeElement as unknown as ITableElement, loading, source ?? []);
        });
    }
}
