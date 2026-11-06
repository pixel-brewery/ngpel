import { IAuditLogChange } from './IAuditLogChange';

/**
 * Resolves the display label for an audit log field change.
 *
 * @public
 */
export type AuditLogFieldLabelResolverFn = (change: IAuditLogChange) => string;

/**
 * Resolves the display label for an audit log field change.
 *
 * @public
 */
export type AuditLogFieldLabelResolver = AuditLogFieldLabelResolverFn;
