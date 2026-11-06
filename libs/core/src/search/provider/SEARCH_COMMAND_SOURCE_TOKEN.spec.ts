import { TestBed } from '@angular/core/testing';
import { afterEach, describe, expect, it } from 'vitest';
import type { Provider } from '@angular/core';
import type { ICommandItem } from '../models/ICommandItem';
import type { ICommandSource } from '../models/ICommandSource';
import { SEARCH_COMMAND_SOURCE_TOKEN } from './SEARCH_COMMAND_SOURCE_TOKEN';

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

describe('SEARCH_COMMAND_SOURCE_TOKEN', () => {
    afterEach(() => {
        TestBed.resetTestingModule();
    });

    it('aggregates one batch per registered source', () => {
        // Arrange
        const settingsSource = new RecordingCommandSource('settings');
        const helpSource = new RecordingCommandSource('help');
        TestBed.configureTestingModule({ providers: [settingsSource.provide(), helpSource.provide()] });

        // Act
        const batches = TestBed.inject(SEARCH_COMMAND_SOURCE_TOKEN);

        // Assert
        expect(batches).toEqual([[settingsSource], [helpSource]]);
    });

    it('is absent when no feature contributed sources', () => {
        // Arrange
        TestBed.configureTestingModule({});

        // Act
        const batches = TestBed.inject(SEARCH_COMMAND_SOURCE_TOKEN, null, { optional: true });

        // Assert
        expect(batches).toBeNull();
    });
});
