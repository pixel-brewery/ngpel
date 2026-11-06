// #region Imports

import { inject, Injectable } from '@angular/core';
import { DrawerService, type IDrawerRef } from '@pixel-brewery/mosaik-elements-angular';
import { firstValueFrom } from 'rxjs';
import { CollectionExportDrawerComponent } from './CollectionExportDrawerComponent';
import type { ICollectionExportDrawerData } from './ICollectionExportDrawerData';
import type { ICollectionExportDrawerResult } from './ICollectionExportDrawerResult';

// #endregion

/**
 * Service that opens a configurable collection export drawer.
 * Feature presenters inject this service and call {@link open} instead
 * of wiring the drawer themselves.
 *
 * @public
 */
@Injectable({ providedIn: 'root' })
export class CollectionExportService {
    // #region Fields

    private readonly _drawerService: DrawerService = inject(DrawerService);

    // #endregion

    // #region Methods

    /**
     * Opens the export configuration drawer and returns the user's
     * selection. Resolves to `undefined` when the user cancels.
     *
     * @param data - Column metadata and format options for the drawer.
     * @returns The selected columns and format, or `undefined` on cancel.
     *
     * @public
     */
    public async open(data: ICollectionExportDrawerData): Promise<ICollectionExportDrawerResult | undefined> {
        const ref: IDrawerRef<ICollectionExportDrawerData, ICollectionExportDrawerResult> = this._drawerService.show(CollectionExportDrawerComponent, {
            data: data,
        });

        const cancel = await firstValueFrom(ref.closed);
        if (cancel && cancel.reason === 'positive' && cancel.result) {
            return cancel.result;
        }

        return undefined;
    }

    // #endregion
}
