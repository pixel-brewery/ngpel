import { InjectionToken } from '@angular/core';
import type { IContextOverlayTarget } from './IContextOverlayTarget';

/** Multi-provider token for application overlay targets. @internal */
export const CONTEXT_OVERLAY_TARGETS = new InjectionToken<ReadonlyArray<IContextOverlayTarget>>('CONTEXT_OVERLAY_TARGETS');
