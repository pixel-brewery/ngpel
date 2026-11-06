import { DOCUMENT, inject } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import type { IUserPreferenceCodec } from './IUserPreferenceCodec';
import { describe, expect, it } from 'vitest';
import type { IUserPreferenceStorage } from './IUserPreferenceStorage';
import { provideUserPreferences } from './provideUserPreferences';
import { USER_PREFERENCE_STORAGE } from './USER_PREFERENCE_STORAGE';
import { UserPreferenceFeatureKinds } from './UserPreferenceFeatureKind';
import { withUserPreferenceStorage } from './withUserPreferenceStorage';

/** In-memory adapter of the user-preference port, performing the same JSON round trip as the Web Storage adapter. */
class InMemoryUserPreferenceStorage implements IUserPreferenceStorage {
    private readonly _entries = new Map<string, string>();

    public read<T>(key: string, codec: IUserPreferenceCodec<T>): T | undefined {
        const serializedValue = this._entries.get(key);

        return serializedValue === undefined ? undefined : codec.parse(JSON.parse(serializedValue));
    }

    public write<T>(key: string, value: T, codec: IUserPreferenceCodec<T>): void {
        this._entries.set(key, JSON.stringify(codec.serialize(value)));
    }

    public remove(key: string): void {
        this._entries.delete(key);
    }

    public has(key: string): boolean {
        return this._entries.has(key);
    }

    public clear(): void {
        this._entries.clear();
    }
}

describe('withUserPreferenceStorage', () => {
    it('creates a non-multi storage feature with the id "custom"', () => {
        // Arrange
        const adapter = new InMemoryUserPreferenceStorage();

        // Act
        const feature = withUserPreferenceStorage(() => adapter);

        // Assert
        expect(feature.id).toBe('custom');
        expect(feature.kind).toBe(UserPreferenceFeatureKinds.Storage);
        expect(feature.options.multi).toBe(false);
    });

    it('runs the factory in the injection context and binds its adapter', () => {
        // Arrange
        const adapter = new InMemoryUserPreferenceStorage();
        const factory = (): IUserPreferenceStorage => (inject(DOCUMENT) ? adapter : new InMemoryUserPreferenceStorage());
        TestBed.configureTestingModule({ providers: [provideUserPreferences(withUserPreferenceStorage(factory))] });

        // Act
        const resolved = TestBed.inject(USER_PREFERENCE_STORAGE);

        // Assert
        expect(resolved).toBe(adapter);
    });
});
