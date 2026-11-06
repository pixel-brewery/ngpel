import { InjectionToken } from '@angular/core';
import type { IContextOverlayRoutingOptions } from './IContextOverlayRoutingOptions';

/** Token for the application's overlay routing policies. @internal */
export const CONTEXT_OVERLAY_OPTIONS = new InjectionToken<IContextOverlayRoutingOptions>('CONTEXT_OVERLAY_OPTIONS');
