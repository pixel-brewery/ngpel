// #region Imports

import type { IDynamicFormSectionDefinition } from './IDynamicFormSectionDefinition';

// #endregion

/**
 * Versioned, UI-owned definition of a dynamic form.
 *
 * @public
 */
export interface IDynamicFormDefinition {
    /**
     * Stable form definition key.
     *
     * @public
     * @readonly
     */
    readonly key: string;

    /**
     * Immutable definition version.
     *
     * @public
     * @readonly
     */
    readonly version: number;

    /**
     * Optional form title.
     *
     * @public
     * @readonly
     */
    readonly title?: string;

    /**
     * Optional form description.
     *
     * @public
     * @readonly
     */
    readonly description?: string;

    /**
     * Ordered visual sections.
     *
     * @public
     * @readonly
     */
    readonly sections: ReadonlyArray<IDynamicFormSectionDefinition>;
}
