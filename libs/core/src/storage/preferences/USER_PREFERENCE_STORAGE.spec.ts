import { TestBed } from '@angular/core/testing';
import type { IUserPreferenceCodec } from './IUserPreferenceCodec';
import type { IUserPreferenceStorage } from './IUserPreferenceStorage';
import { describe, expect, it } from 'vitest';
import { USER_PREFERENCE_STORAGE } from './USER_PREFERENCE_STORAGE';

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

describe('USER_PREFERENCE_STORAGE', () => {
    it('has no default adapter and therefore no provider until composed', () => {
        // Arrange
        TestBed.configureTestingModule({});

        // Act
        const resolve = (): unknown => TestBed.inject(USER_PREFERENCE_STORAGE);

        // Assert
        expect(resolve).toThrow(/No provider/);
    });

    it('resolves a directly provided adapter', () => {
        // Arrange
        const adapter = new InMemoryUserPreferenceStorage();
        TestBed.configureTestingModule({ providers: [{ provide: USER_PREFERENCE_STORAGE, useValue: adapter }] });

        // Act
        const resolved = TestBed.inject(USER_PREFERENCE_STORAGE);

        // Assert
        expect(resolved).toBe(adapter);
    });
});
