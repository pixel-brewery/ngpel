import { InjectionToken } from '@angular/core';

/** Keys whose most recent payload the configured hub keeps. @internal */
export const EVENT_HUB_RETAINED_KEYS = new InjectionToken<ReadonlyArray<string>>('EVENT_HUB_RETAINED_KEYS');
