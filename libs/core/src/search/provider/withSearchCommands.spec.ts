import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { afterEach, describe, expect, it } from 'vitest';
import type { ICommandItem } from '../models/ICommandItem';
import type { ICommandSource } from '../models/ICommandSource';
import { SEARCH_COMMAND_SOURCE_TOKEN } from './SEARCH_COMMAND_SOURCE_TOKEN';
import { SEARCH_COMMAND_TOKEN } from './SEARCH_COMMAND_TOKEN';
import { SearchKinds } from './SearchKinds';
import { withSearchCommands } from './withSearchCommands';

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

@Injectable()
class ProbeCommandSource implements ICommandSource {
    public readonly id: string = 'probe';

    public getCommands(): ReadonlyArray<ICommandItem> {
        return [fakeCommandItem('probe.open')];
    }
}

describe('withSearchCommands', () => {
    afterEach(() => {
        TestBed.resetTestingModule();
    });

    it('creates a multi feature of the commands kind carrying the contribution id', () => {
        // Arrange
        const options = { id: 'settings' };

        // Act
        const feature = withSearchCommands(options);

        // Assert
        expect(feature.id).toBe('settings');
        expect(feature.kind).toBe(SearchKinds.Commands);
        expect(feature.options.multi).toBe(true);
    });

    it('contributes static commands as one batch under the command token', () => {
        // Arrange
        const commands = [fakeCommandItem('settings.open')];
        TestBed.configureTestingModule({ providers: [...withSearchCommands({ id: 'settings', commands }).provide()] });

        // Act
        const batches = TestBed.inject(SEARCH_COMMAND_TOKEN);

        // Assert
        expect(batches).toEqual([commands]);
    });

    it('registers source classes as themselves and as a source batch', () => {
        // Arrange
        TestBed.configureTestingModule({ providers: [...withSearchCommands({ id: 'probe', sources: [ProbeCommandSource] }).provide()] });

        // Act
        const batches = TestBed.inject(SEARCH_COMMAND_SOURCE_TOKEN);

        // Assert
        expect(batches).toEqual([[TestBed.inject(ProbeCommandSource)]]);
    });

    it('contributes no providers when neither commands nor sources are given', () => {
        // Arrange
        const feature = withSearchCommands({ id: 'empty' });

        // Act
        const providers = feature.provide();

        // Assert
        expect(providers).toEqual([]);
    });
});
