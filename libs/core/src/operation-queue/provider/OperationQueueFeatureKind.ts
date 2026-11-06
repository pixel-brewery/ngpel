/**
 * Discriminated union of feature kinds supported by the operation queue.
 *
 * @public
 */
export type OperationQueueFeatureKind = 'failure-policy' | 'merge-policy' | 'clock' | 'id-factory' | 'lifecycle';
