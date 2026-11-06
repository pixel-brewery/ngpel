import type { IDataTableColumnDefinition } from '@pixel-brewery/mosaik-elements-foundation';

const PLACEHOLDERS = Array.from({ length: 5 }, (_, index) => ({ index }));

export interface ITableElement {
    source: Array<unknown>;
    columnDefinitions: Array<IDataTableColumnDefinition>;
    selectionMode: 'none' | 'single' | 'multiple';
    setAttribute(name: string, value: string): void;
    removeAttribute(name: string): void;
}

/** Preserves the Mosaik table's presentation while a page request is in flight. */
export class DataTableLoadingState {
    private previousColumns?: Array<IDataTableColumnDefinition>;
    private previousSelectionMode?: ITableElement['selectionMode'];

    public update(element: ITableElement, loading: boolean, source: Array<unknown>): void {
        if (loading) {
            if (!this.previousColumns) {
                this.previousColumns = element.columnDefinitions;
                this.previousSelectionMode = element.selectionMode;
            }

            element.setAttribute('aria-busy', 'true');
            element.selectionMode = 'none';
            element.columnDefinitions = this.previousColumns.map((column) => ({
                ...column,
                pathFn: () => '',
                cellTemplate: () => {
                    const skeleton = document.createElement('mosaik-skeleton');
                    skeleton.setAttribute('width', '72%');
                    skeleton.setAttribute('height', '16px');
                    skeleton.setAttribute('shimmer', '');
                    skeleton.setAttribute('aria-hidden', 'true');
                    skeleton.style.setProperty('--skeleton-background-color', 'var(--mosaik-scheme-highlight)');
                    return skeleton;
                },
            }));
            element.source = PLACEHOLDERS;
        } else if (this.previousColumns) {
            element.source = source;
            element.columnDefinitions = this.previousColumns;
            element.selectionMode = this.previousSelectionMode ?? 'none';
            element.removeAttribute('aria-busy');
            this.previousColumns = undefined;
            this.previousSelectionMode = undefined;
        }
    }
}
