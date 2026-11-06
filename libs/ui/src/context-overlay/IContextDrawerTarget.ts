import type { Type } from '@angular/core';
import type { ICancel, IDrawerConfig, IDrawerRef } from '@pixel-brewery/mosaik-elements-angular';
import type { IContextOverlayState } from '@pixel-brewery/ngpel-router';

/**
 * A feature-owned contextual overlay presented through Mosaik drawers.
 *
 * @public
 * @typeParam TData Data passed to the drawer content.
 * @typeParam TResult Result returned by the drawer content.
 */
export interface IContextDrawerTarget<TData, TResult> {
    /** Registered URL target key. */
    readonly key: string;
    /** Feature-specific size override. The shell's drawer defaults apply otherwise. */
    readonly size?: IDrawerConfig<TData>['size'];
    /** Application authorization for the requested mode. */
    readonly canOpen: (mode: 'create' | 'detail') => boolean;
    /** Lazy view for the requested mode. */
    readonly loadView: (mode: 'create' | 'detail') => Promise<Type<unknown>>;
    /** Validates a detail address and builds its initial drawer data. */
    readonly detailData: (id: string, context?: string, transient?: unknown) => TData;
    /** Loads detail data when opening an address without transient data. */
    readonly resolveDetailData?: (id: string, context: string | undefined, signal: AbortSignal) => Promise<TData>;
    /** Enables create mode and validates any creation context. */
    readonly createData?: (context?: string, transient?: unknown) => TData;
    /** Observes the mounted drawer. */
    readonly onOpened?: (ref: IDrawerRef<TData, TResult>, state: IContextOverlayState) => void;
    /** Observes an interactive close and its typed outcome. */
    readonly onClosed?: (result: ICancel<TResult> | undefined, state: IContextOverlayState) => void;
}
