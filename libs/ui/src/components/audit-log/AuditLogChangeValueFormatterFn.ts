// #region Imports

import type { IAuditLogChange } from './IAuditLogChange';

// #endregion

/**
 * Formats a raw audit log value for display.
 *
 * @public
 */
export type AuditLogChangeValueFormatterFn = (value: unknown, change?: IAuditLogChange) => string;

/**
 * Formats a raw audit log value for display.
 *
 * @public
 */
export type AuditLogChangeValueFormatter = AuditLogChangeValueFormatterFn;
