// #region Imports

// #endregion

/**
 * Union of all possible lifecycle states for an {@link IOperationEntry}.
 *
 * @public
 */
export type OperationStatus = 'pending' | 'committing' | 'committed' | 'rejecting' | 'rolling-back' | 'rolled-back' | 'rejected' | 'failed';
