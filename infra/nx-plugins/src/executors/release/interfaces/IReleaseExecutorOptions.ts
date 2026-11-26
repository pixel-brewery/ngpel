/**
 * Describes one private repository release lifecycle operation.
 *
 * @internal
 */
export interface IReleaseExecutorOptions {
    /**
     * Selects the trusted source, artifact, metadata or retained-run operation.
     *
     * @internal
     */
    readonly mode: 'classify' | 'prepare' | 'verify' | 'integrate' | 'resume' | 'recover' | 'authorize' | 'continue';
    /**
     * Locates the workflow-owned immutable artifact directory when required.
     *
     * @internal
     */
    readonly artifactDirectory?: string;
    /**
     * Binds the operation to the exact original source revision.
     *
     * @internal
     */
    readonly sourceSha?: string;
}
