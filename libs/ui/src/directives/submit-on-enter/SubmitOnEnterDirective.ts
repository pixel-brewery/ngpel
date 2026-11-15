import { Directive, ElementRef, inject } from '@angular/core';

/**
 * Submits the containing form when Enter is pressed on a marked input.
 *
 * Use this on inputs that need an explicit keyboard submission. Submission runs through
 * the browser's form validation and submit event. Enter during text composition is ignored.
 *
 * @example
 * ```html
 * <form (submit)="submit($event)">
 *     <mosaik-textbox ngpSubmitOnEnter />
 * </form>
 * ```
 *
 * @public
 */
@Directive({
    selector: '[ngpSubmitOnEnter]',
    host: {
        '(keydown.enter)': 'onEnter($event)',
    },
})
export class SubmitOnEnterDirective {
    private readonly _element = inject<ElementRef<HTMLElement>>(ElementRef);

    /**
     * Forwards a completed Enter keystroke to the containing form.
     *
     * @protected
     * @param event The keyboard event from the marked input.
     */
    protected onEnter(event: Event): void {
        if (!(event instanceof KeyboardEvent) || event.isComposing) {
            return;
        }

        const form = this._element.nativeElement.closest('form');
        if (!form) {
            return;
        }

        event.preventDefault();
        form.requestSubmit();
    }
}
