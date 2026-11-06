// #region Imports
import type { OperationPolicyKind } from './OperationPolicyKind';

// #endregion

/**
 * Base contract for all operation policies.
 *
 * @typeParam TKind - The policy category this policy belongs to.
 * @public
 */
export interface IOperationPolicy<TKind extends OperationPolicyKind = OperationPolicyKind> {
    /**
     * Policy category discriminator.
     *
     * @public
     */
    readonly kind: TKind;

    /**
     * Machine-readable identifier for this policy.
     *
     * @public
     */
    readonly name: string;

    /**
     * Ordering weight. Lower values execute first when multiple policies are composed.
     *
     * @public
     */
    readonly priority: number;
}
