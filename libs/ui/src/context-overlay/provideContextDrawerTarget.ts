import { inject, type Provider } from '@angular/core';
import { DrawerService, type ICancel } from '@pixel-brewery/mosaik-elements-angular';
import { provideContextOverlayTarget } from '@pixel-brewery/ngpel-router';
import type { IContextDrawerTarget } from './IContextDrawerTarget';

/**
 * Registers a contextual target using the application's existing Mosaik drawer provider.
 * The router owns URL-driven closing, while Mosaik retains the shell's presentation defaults.
 *
 * @public
 * @typeParam TData Data passed to the drawer content.
 * @typeParam TResult Result returned by the drawer content.
 * @param factory Feature factory evaluated in the application injection context.
 * @returns An overlay target provider for application composition.
 */
export function provideContextDrawerTarget<TData, TResult>(factory: () => IContextDrawerTarget<TData, TResult>): Provider {
    return provideContextOverlayTarget<ICancel<TResult>>(() => {
        const target = factory();
        const drawers = inject(DrawerService);

        return {
            key: target.key,
            canOpen: ({ id }): boolean => (id !== undefined || target.createData !== undefined) && target.canOpen(id === undefined ? 'create' : 'detail'),
            prepare: (state, transient) => {
                const { id, context } = state;
                let initialData: TData;
                if (id === undefined) {
                    if (!target.createData) {
                        throw new Error('Creation is unavailable for this overlay.');
                    }
                    initialData = target.createData(context, transient);
                } else {
                    initialData = target.detailData(id, context, transient);
                }

                return async (signal: AbortSignal) => {
                    const [view, data] = await Promise.all([
                        target.loadView(id === undefined ? 'create' : 'detail'),
                        id !== undefined && transient === undefined && target.resolveDetailData ? target.resolveDetailData(id, context, signal) : initialData,
                    ]);

                    return () => {
                        const ref = drawers.show<TData, TResult>(view, {
                            data,
                            closeOnNavigation: false,
                            ...(target.size === undefined ? {} : { size: target.size }),
                        });

                        return { closed: ref.closed, close: (): void => ref.close(), onOpened: (): void => target.onOpened?.(ref, state) };
                    };
                };
            },
            onClosed: target.onClosed,
        };
    });
}
