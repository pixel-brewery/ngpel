import type { IContextOverlayRef } from './IContextOverlayRef';

/**
 * Loads a surface and its data without mounting it. The returned function is called only if the
 * target is still current and authorized.
 *
 * @public
 * @typeParam TResult The surface's close result.
 * @param signal Aborted when the request is superseded or the coordinator is disposed.
 * @returns A function that mounts the loaded surface.
 */
export type ContextOverlayLoader<TResult = unknown> = (signal: AbortSignal) => Promise<() => IContextOverlayRef<TResult>>;
