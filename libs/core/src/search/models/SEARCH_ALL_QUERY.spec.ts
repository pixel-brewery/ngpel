import { TestBed } from '@angular/core/testing';
import { afterEach, describe, expect, it } from 'vitest';
import type { ICommandItem } from './ICommandItem';
import type { Provider } from '@angular/core';
import type { ICommandSource } from './ICommandSource';
import { SEARCH_COMMAND_SOURCE_TOKEN } from '../provider/SEARCH_COMMAND_SOURCE_TOKEN';
import { SEARCH_COMMAND_TOKEN } from '../provider/SEARCH_COMMAND_TOKEN';
import { SearchManager } from '../services/SearchManager';
import { SEARCH_ALL_QUERY } from './SEARCH_ALL_QUERY';

/** Scriptable command source: returns the scripted commands and records every query it was asked. */
class RecordingCommandSource implements ICommandSource {
    public readonly queries: Array<string> = [];

    private _commands: ReadonlyArray<ICommandItem>;

    public constructor(
        public readonly id: string,
        commands: ReadonlyArray<ICommandItem> = [],
    ) {
        this._commands = commands;
    }

    public getCommands(query: string): ReadonlyArray<ICommandItem> {
        this.queries.push(query);

        return this._commands;
    }

    public setCommands(commands: ReadonlyArray<ICommandItem>): void {
        this._commands = commands;
    }

    public provide(): Provider {
        return { provide: SEARCH_COMMAND_SOURCE_TOKEN, useValue: [this], multi: true };
    }
}

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

describe('SEARCH_ALL_QUERY', () => {
    afterEach(() => {
        TestBed.resetTestingModule();
    });

    it('returns the whole catalogue and reaches command sources as an empty query', async () => {
        // Arrange
        const source = createManagerWithSource();

        // Act
        const commands = await TestBed.inject(SearchManager).getCommands(SEARCH_ALL_QUERY);

        // Assert
        expect(commands.map((command) => command.id)).toEqual(['help.open', 'settings.open']);
        expect(source.queries).toEqual(['']);
    });

    it('is not a wildcard for any other query, which filters the catalogue and is forwarded verbatim', async () => {
        // Arrange
        const source = createManagerWithSource();

        // Act
        const commands = await TestBed.inject(SearchManager).getCommands('settings');

        // Assert
        expect(commands.map((command) => command.id)).toEqual(['settings.open']);
        expect(source.queries).toEqual(['settings']);
    });
});

function createManagerWithSource(): RecordingCommandSource {
    const source = new RecordingCommandSource('settings', [fakeCommandItem('settings.open')]);

    TestBed.configureTestingModule({
        providers: [SearchManager, { provide: SEARCH_COMMAND_TOKEN, useValue: [fakeCommandItem('help.open')], multi: true }, source.provide()],
    });

    return source;
}
