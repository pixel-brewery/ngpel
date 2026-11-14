import { InjectionToken } from '@angular/core';

/** Switches between the card's primary view and its settings. @public */
export const WIDGET_FLIP = new InjectionToken<(side: 'front' | 'back') => void>('NGPEL_WIDGET_FLIP');
