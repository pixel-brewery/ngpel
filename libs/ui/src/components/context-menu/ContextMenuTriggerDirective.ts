// #region Imports

import { Directive, ElementRef, ErrorHandler, inject, input } from '@angular/core';
import type { ContextMenuComponent } from './ContextMenuComponent';

// #endregion

const CONTEXT_FROM_EVENT = Symbol('CONTEXT_FROM_EVENT');

interface IResolvedContext<T> {
    readonly context: T;
    readonly origin: HTMLElement;
}

/**
 * Connects a host to a context menu. Supply a value for explicit triggers, or omit it
 * on a Mosaik data table to read the row value from the event's composed path.
 *
 * @typeParam T The item exposed to the menu template.
 * @public
 */
@Directive({
    selector: '[ngpContextMenuTriggerFor]',
    host: {
        '[attr.aria-haspopup]': 'disabled() || !menu() ? null : "menu"',
        '(contextmenu)': 'onContextMenu($event)',
        '(click)': 'onClick($event)',
        '(keydown)': 'onKeyDown($event)',
    },
})
export class ContextMenuTriggerDirective<T = unknown> {
    // #region Fields

    private readonly _element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    private readonly _errorHandler = inject(ErrorHandler);

    // #endregion

    // #region Properties

    /** Menu shared by the triggers for a collection. */
    public readonly menu = input.required<ContextMenuComponent<T> | undefined>({ alias: 'ngpContextMenuTriggerFor' });

    /** Optional item value; the default resolves a Mosaik body row from the event path. */
    public readonly value = input<T | typeof CONTEXT_FROM_EVENT>(CONTEXT_FROM_EVENT, { alias: 'ngpContextMenuValue' });

    /** Leaves native events alone when the menu is unavailable for this trigger. */
    public readonly disabled = input(false, { alias: 'ngpContextMenuDisabled' });

    /** Enables a normal click on a visible action button. */
    public readonly openOnClick = input(false, { alias: 'ngpContextMenuOpenOnClick' });

    // #endregion

    // #region Methods

    protected onContextMenu(event: MouseEvent): void {
        this.open(event, event);
    }

    protected onClick(event: MouseEvent): void {
        if (this.openOnClick()) {
            this.open(event);
        }
    }

    protected onKeyDown(event: KeyboardEvent): void {
        if (event.key === 'ContextMenu' || (event.shiftKey && event.key === 'F10')) {
            this.open(event);
        }
    }

    private open(event: Event, point?: Pick<MouseEvent, 'clientX' | 'clientY'>): void {
        if (event.defaultPrevented || this.disabled()) {
            return;
        }
        const menu = this.menu();
        if (!menu) {
            return;
        }
        const resolved = this.resolveContext(event);
        if (!resolved) {
            return;
        }

        const { context, origin } = resolved;
        const bounds = origin.getBoundingClientRect();
        event.preventDefault();
        event.stopPropagation();
        void menu
            .open({
                clientX: point?.clientX ?? bounds.left,
                clientY: point?.clientY ?? bounds.bottom,
                context,
                origin,
            })
            .catch((error: unknown) => this._errorHandler.handleError(error));
    }

    private resolveContext(event: Event): IResolvedContext<T> | null {
        const value = this.value();
        if (value !== CONTEXT_FROM_EVENT) {
            return { context: value, origin: this._element };
        }
        for (const element of event.composedPath()) {
            if (element instanceof HTMLElement && element.localName === 'mosaik-table-body-row') {
                const rowValue = (element as HTMLElement & { readonly value?: T }).value;
                return rowValue === undefined ? null : { context: rowValue, origin: element };
            }
        }
        return null;
    }

    // #endregion
}
