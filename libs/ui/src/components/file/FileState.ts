/**
 * Visual states supported by the file component.
 *
 * @public
 */
export const FileState = {
    Normal: 'normal',
    Progress: 'progress',
    Loading: 'loading',
    Error: 'error',
    Retry: 'retry',
    Unavailable: 'unavailable',
} as const;
