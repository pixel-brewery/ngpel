import { TestBed } from '@angular/core/testing';
import { afterEach, describe, expect, it } from 'vitest';
import type { ICommandItem } from '../models/ICommandItem';
import { SEARCH_COMMAND_TOKEN } from './SEARCH_COMMAND_TOKEN';

/** Optional overrides for {@link fakeCommandItem}. */
interface IFakeCommandItemOptions {
    readonly label?: string;
    readonly description?: string;
    readonly group?: string;
    readonly keywords?: ReadonlyArray<string>;
    readonly execute?: () => unknown;
}

/** Builds a palette command; the label defaults to the id and `execute()` is a no-op unless overridden. */
function fakeCommandItem(id: string, options: IFakeCommandItemOptions = {}): ICommandItem {
    return {
        id,
        label: options.label ?? id,
        description: options.description,
        group: options.group,
        keywords: options.keywords,
        execute: options.execute ?? ((): void => undefined),
    };
}

describe('SEARCH_COMMAND_TOKEN', () => {
    afterEach(() => {
        TestBed.resetTestingModule();
    });

    it('aggregates one batch per contributing feature', () => {
        // Arrange
        const settingsCommands = [fakeCommandItem('settings.open')];
        const helpCommands = [fakeCommandItem('help.open'), fakeCommandItem('help.shortcuts')];
        TestBed.configureTestingModule({
            providers: [
                { provide: SEARCH_COMMAND_TOKEN, useValue: settingsCommands, multi: true },
                { provide: SEARCH_COMMAND_TOKEN, useValue: helpCommands, multi: true },
            ],
        });

        // Act
        const batches = TestBed.inject(SEARCH_COMMAND_TOKEN);

        // Assert
        expect(batches).toEqual([settingsCommands, helpCommands]);
    });

    it('is absent when no feature contributed commands', () => {
        // Arrange
        TestBed.configureTestingModule({});

        // Act
        const batches = TestBed.inject(SEARCH_COMMAND_TOKEN, null, { optional: true });

        // Assert
        expect(batches).toBeNull();
    });
});
