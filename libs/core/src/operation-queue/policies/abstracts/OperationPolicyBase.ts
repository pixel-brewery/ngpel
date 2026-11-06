// #region Imports

import type { IOperationPolicy } from '../interfaces/IOperationPolicy';
import type { OperationPolicyKind } from '../interfaces/OperationPolicyKind';

// #endregion

/**
 * Abstract base class for operation policies providing kind, name, and priority.
 *
 * @typeParam TKind - The policy category this policy belongs to.
 * @public
 */
export abstract class OperationPolicy<TKind extends OperationPolicyKind> implements IOperationPolicy<TKind> {
    // #region Properties

    /**
     * @public
     */
    public readonly kind: TKind;

    /**
     * @public
     */
    public readonly name: string;

    /**
     * @public
     */
    public readonly priority: number;

    // #endregion

    // #region Ctor

    /**
     * Creates a new instance of the {@link OperationPolicy} class.
     *
     * @param kind - Policy category discriminator.
     * @param name - Machine-readable identifier.
     * @param priority - Ordering weight (default `0`).
     * @public
     */
    public constructor(kind: TKind, name: string, priority = 0) {
        this.kind = kind;
        this.name = name;
        this.priority = priority;
    }

    // #endregion
}
