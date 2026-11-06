const KEY_PATTERN = /^[a-z][a-z0-9]*(?:[.-][a-z0-9]+)*$/u;

/** Checks the key format shared by the registry and URL codec. @internal */
export function isContextOverlayKey(key: unknown): key is string {
    return typeof key === 'string' && key.length <= 128 && KEY_PATTERN.test(key);
}
