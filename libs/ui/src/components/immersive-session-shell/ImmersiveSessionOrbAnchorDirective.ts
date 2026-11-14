import { Directive, ElementRef, inject } from '@angular/core';

/** Marks the element whose box the orb occupies while the session is in preflight. */
@Directive({ selector: '[ngpImmersiveSessionOrbAnchor]' })
export class ImmersiveSessionOrbAnchorDirective {
    /** Preflight anchor measured by the immersive session shell. */
    public readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
}
