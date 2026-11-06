// #region Imports

import { InjectionToken } from '@angular/core';
import { IOperationIdFactory } from '../identity/interfaces/IOperationIdFactory';
import { IOperationQueueOptions } from '../interfaces/IOperationQueueOptions';
import { OperationLifecycle } from '../lifecycle/OperationLifecycle';
import { IOperationFailurePolicy } from '../policies/interfaces/IOperationFailurePolicy';
import { IOperationMergePolicy } from '../policies/interfaces/IOperationMergePolicy';
import { IOperationClock } from '../scheduling/interfaces/IOperationClock';

// #endregion

/**
 * Injection token for the queue configuration options.
 *
 * @internal
 */
export const OPERATION_QUEUE_OPTIONS = new InjectionToken<IOperationQueueOptions>('OPERATION_QUEUE_OPTIONS');

/**
 * Injection token for the clock strategy used to schedule entries.
 *
 * @internal
 */
export const OPERATION_CLOCK = new InjectionToken<IOperationClock>('OPERATION_CLOCK');

/**
 * Injection token for the ID factory strategy.
 *
 * @internal
 */
export const OPERATION_ID_FACTORY = new InjectionToken<IOperationIdFactory>('OPERATION_ID_FACTORY');

/**
 * Injection token for the failure policy invoked when a commit throws.
 *
 * @internal
 */
export const OPERATION_FAILURE_POLICY = new InjectionToken<IOperationFailurePolicy>('OPERATION_FAILURE_POLICY');

/**
 * Injection token for the merge policy that determines how duplicate operations coalesce.
 *
 * @internal
 */
export const OPERATION_MERGE_POLICY = new InjectionToken<IOperationMergePolicy>('OPERATION_MERGE_POLICY');

/**
 * Injection token for the lifecycle event bus.
 * Optional — only provided when {@link withLifecycleEvents} feature is active.
 *
 * @internal
 */
export const OPERATION_LIFECYCLE = new InjectionToken<OperationLifecycle>('OPERATION_LIFECYCLE');
