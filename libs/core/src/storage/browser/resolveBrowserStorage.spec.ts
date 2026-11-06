import { describe, expect, it } from 'vitest';
import type { BrowserStorageArea } from './BrowserStorageArea';
import { resolveBrowserStorage } from './resolveBrowserStorage';

/** In-memory `Storage`: a fresh object per call, so `storageArea` comparisons work. */
function createMockStorage(initialEntries: Readonly<Record<string, string>> = {}): Storage {
    const store = new Map<string, string>(Object.entries(initialEntries));

    return {
        get length(): number {
            return store.size;
        },
        clear(): void {
            store.clear();
        },
        getItem(key: string): string | null {
            return store.get(key) ?? null;
        },
        key(index: number): string | null {
            return [...store.keys()][index] ?? null;
        },
        removeItem(key: string): void {
            store.delete(key);
        },
        setItem(key: string, value: string): void {
            store.set(key, String(value));
        },
    };
}

function createWindow(localStorage: Storage, sessionStorage: Storage): Pick<Window, BrowserStorageArea> {
    return { localStorage, sessionStorage };
}

describe('resolveBrowserStorage', () => {
    it('resolves localStorage of the given window by default', () => {
        // Arrange
        const localStorage = createMockStorage();
        const browserWindow = createWindow(localStorage, createMockStorage());

        // Act
        const storage = resolveBrowserStorage(browserWindow);

        // Assert
        expect(storage).toBe(localStorage);
    });

    it('resolves sessionStorage when that area is requested', () => {
        // Arrange
        const sessionStorage = createMockStorage();
        const browserWindow = createWindow(createMockStorage(), sessionStorage);

        // Act
        const storage = resolveBrowserStorage(browserWindow, 'sessionStorage');

        // Assert
        expect(storage).toBe(sessionStorage);
    });

    it('returns null for a null window (server-side rendering)', () => {
        // Arrange
        const browserWindow = null;

        // Act
        const storage = resolveBrowserStorage(browserWindow);

        // Assert
        expect(storage).toBeNull();
    });

    it('returns null when the storage accessor throws', () => {
        // Arrange
        const browserWindow: Pick<Window, BrowserStorageArea> = {
            get localStorage(): Storage {
                throw new Error('SecurityError: storage is disabled');
            },
            sessionStorage: createMockStorage(),
        };

        // Act
        const storage = resolveBrowserStorage(browserWindow);

        // Assert
        expect(storage).toBeNull();
    });

    it('returns null when the area is absent on the window', () => {
        // Arrange
        const incompleteWindow: Partial<Pick<Window, BrowserStorageArea>> = {};
        const browserWindow = incompleteWindow as Pick<Window, BrowserStorageArea>;

        // Act
        const storage = resolveBrowserStorage(browserWindow);

        // Assert
        expect(storage).toBeNull();
    });
});
