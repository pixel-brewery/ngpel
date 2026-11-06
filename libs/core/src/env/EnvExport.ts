/**
 * The shape of environment variables exposed to the application through the {@link ENV} token:
 * a flat, string-valued record such as the one produced by a build-time `.env` export.
 *
 * @public
 */
export type EnvExport = Record<string, string>;
