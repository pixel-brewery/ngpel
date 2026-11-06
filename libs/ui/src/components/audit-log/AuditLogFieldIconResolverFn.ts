import { IAuditLogChange } from './IAuditLogChange';

/**
 * Resolves the icon name for an audit log field change.
 *
 * @public
 */
export type AuditLogFieldIconResolverFn = (change: IAuditLogChange) => string;
