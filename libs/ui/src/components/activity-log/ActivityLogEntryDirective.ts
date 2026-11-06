import { Directive, TemplateRef, inject, input } from '@angular/core';
import type { IActivityLogEntryContext } from './IActivityLogEntryContext';

/** Marks a projected entry template. Bind the controller's entries to infer the item type. @public */
@Directive({ selector: 'ng-template[ngpActivityLogEntry]' })
export class ActivityLogEntryDirective<T> {
    /** Entry collection used to infer the projected context. */
    public readonly items = input.required<ReadonlyArray<T>>({ alias: 'ngpActivityLogEntry' });
    /** Template rendered for each item. */
    public readonly template = inject<TemplateRef<IActivityLogEntryContext<T>>>(TemplateRef);

    /** Supplies the template context type to Angular's compiler. */
    public static ngTemplateContextGuard<TItem>(_directive: ActivityLogEntryDirective<TItem>, value: unknown): value is IActivityLogEntryContext<TItem> {
        return typeof value === 'object' && value !== null;
    }
}
