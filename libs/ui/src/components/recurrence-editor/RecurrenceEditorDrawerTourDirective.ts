import { Directive, forwardRef, input } from '@angular/core';
import { TOUR_ACCESSOR, type ITourAccessor, type ITourAccessorTarget } from '@pixel-brewery/mosaik-elements-angular';

/** Supplies the drawer-owned fields to Mosaik's tour accessor on the same element. @internal */
@Directive({
    selector: '[ngpRecurrenceEditorDrawerTour]',
    providers: [{ provide: TOUR_ACCESSOR, useExisting: forwardRef(() => RecurrenceEditorDrawerTourDirective) }],
})
export class RecurrenceEditorDrawerTourDirective implements ITourAccessor {
    public readonly targets = input.required<ReadonlyMap<string, ITourAccessorTarget>>({ alias: 'ngpRecurrenceEditorDrawerTour' });
}
