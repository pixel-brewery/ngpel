import { InjectionToken } from '@angular/core';
import type { IResourceNavigationTarget } from './IResourceNavigationTarget';

/** Multi-provider token for feature-owned resource links. @internal */
export const RESOURCE_NAVIGATION_TARGETS = new InjectionToken<ReadonlyArray<IResourceNavigationTarget>>('NGPEL_RESOURCE_NAVIGATION_TARGETS');
