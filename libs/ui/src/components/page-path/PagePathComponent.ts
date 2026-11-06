import { ChangeDetectionStrategy, Component, DestroyRef, inject, input, type OnInit } from '@angular/core';
import type { IPagePathLevel } from './IPagePathLevel';
import { PagePathRegistry } from './PagePathRegistry';

/** Declares the path of the enclosing page for the shell's path outlet. @public */
@Component({
    selector: 'ngp-page-path',
    template: '',
    styles: ':host { display: none; }',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PagePathComponent implements OnInit {
    // #region Fields

    private readonly _registry = inject(PagePathRegistry);
    private readonly _destroyRef = inject(DestroyRef);

    // #endregion

    // #region Properties

    /** Path ordered from the outermost context to the current page. */
    public readonly levels = input.required<ReadonlyArray<IPagePathLevel>>();

    // #endregion

    // #region Methods

    /** Registers the path after Angular sets its input. */
    public ngOnInit(): void {
        this._destroyRef.onDestroy(this._registry.register(this.levels));
    }

    // #endregion
}
