import type { Observable } from 'rxjs';

/**
 * A mounted surface owned by a contextual overlay target.
 *
 * @public
 * @typeParam TResult The surface's close result.
 */
export interface IContextOverlayRef<TResult = unknown> {
    /** Emits the close result, or completes when the surface closes without a result. */
    readonly closed: Observable<TResult>;
    /** Closes the surface and settles its `closed` stream. */
    close(): void;
    /** Runs after the coordinator starts observing the mounted surface. */
    onOpened?(): void;
}
