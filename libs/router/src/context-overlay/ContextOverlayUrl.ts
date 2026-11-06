import type { IContextOverlayState } from './IContextOverlayState';
import { isContextOverlayKey } from './isContextOverlayKey';

const INTERNAL_ORIGIN = 'https://context-overlay.invalid';
const MAX_DEPTH = 8;
const OVERLAY_PARAMETER = /^overlay(?:Id|Context)?(?:\.(\d+))?$/u;
const ADDRESS_PART = /^[A-Za-z0-9][A-Za-z0-9._:-]{0,127}$/u;

/**
 * Reads and writes an ordered overlay stack in a relative application URL. The first layer uses
 * `overlay`, `overlayId`, and `overlayContext`. Further layers use suffixes `.1` through `.7`.
 *
 * @public
 */
export class ContextOverlayUrl {
    // #region Fields

    private readonly _supportsPath: (path: string) => boolean;

    // #endregion

    // #region Ctor

    /**
     * @param supportsPath Application policy for paths allowed to host overlays.
     */
    public constructor(supportsPath: (path: string) => boolean) {
        this._supportsPath = supportsPath;
    }

    // #endregion

    // #region Methods

    /**
     * Parses up to eight layers. Out-of-scope paths and URLs with no overlay yield an empty stack.
     *
     * @param value Application-relative URL.
     * @returns The ordered stack, or `invalid` for an invalid URL or malformed overlay parameters.
     */
    public parseStack(value: string): ReadonlyArray<IContextOverlayState> | 'invalid' {
        const url = this.parseUrl(value);
        if (!url) {
            return 'invalid';
        }
        if (!this._supportsPath(url.pathname)) {
            return [];
        }

        let depth = 0;
        for (const name of url.searchParams.keys()) {
            const match = OVERLAY_PARAMETER.exec(name);
            if (!match) {
                continue;
            }
            const suffix = match[1];
            const index = suffix === undefined ? 0 : Number(suffix);
            if (suffix !== undefined && (index < 1 || index >= MAX_DEPTH || String(index) !== suffix)) {
                return 'invalid';
            }
            depth = Math.max(depth, index + 1);
        }

        const stack: IContextOverlayState[] = [];
        for (let index = 0; index < depth; index++) {
            const suffix = this.suffix(index);
            const keys = url.searchParams.getAll(`overlay${suffix}`);
            const ids = url.searchParams.getAll(`overlayId${suffix}`);
            const contexts = url.searchParams.getAll(`overlayContext${suffix}`);
            const [key] = keys;
            const [id] = ids;
            const [context] = contexts;
            if (key === undefined || keys.length !== 1 || ids.length > 1 || contexts.length > 1 || !this.isValid(key, id, context)) {
                return 'invalid';
            }
            stack.push({
                key,
                ...(id === undefined ? {} : { id }),
                ...(context === undefined ? {} : { context }),
            });
        }

        return stack;
    }

    /**
     * Replaces the overlay parameters while preserving the path, unrelated query parameters and
     * fragment, including their original encoding and order.
     *
     * @param value In-scope application URL.
     * @param stack Desired stack, with its bottom layer first.
     * @returns The URL with the requested overlays.
     * @throws Error when the URL is outside the configured scope or the stack is invalid.
     */
    public writeStack(value: string, stack: ReadonlyArray<IContextOverlayState>): string {
        const url = this.parseUrl(value);
        if (!url || !this._supportsPath(url.pathname) || stack.length > MAX_DEPTH || stack.some(({ key, id, context }) => !this.isValid(key, id, context))) {
            throw new Error('Invalid contextual overlay URL or stack.');
        }

        const fragmentIndex = value.indexOf('#');
        const fragment = fragmentIndex === -1 ? '' : value.slice(fragmentIndex);
        const beforeFragment = fragmentIndex === -1 ? value : value.slice(0, fragmentIndex);
        const queryIndex = beforeFragment.indexOf('?');
        const path = queryIndex === -1 ? beforeFragment : beforeFragment.slice(0, queryIndex);
        const query = queryIndex === -1 ? '' : beforeFragment.slice(queryIndex + 1);
        const unrelated = query ? query.split('&').filter((part) => !OVERLAY_PARAMETER.test(new URLSearchParams(`&${part}`).keys().next().value ?? '')) : [];

        const overlays = new URLSearchParams();
        for (const [index, state] of stack.entries()) {
            const suffix = this.suffix(index);
            overlays.set(`overlay${suffix}`, state.key);
            if (state.id !== undefined) {
                overlays.set(`overlayId${suffix}`, state.id);
            }
            if (state.context !== undefined) {
                overlays.set(`overlayContext${suffix}`, state.context);
            }
        }
        const parameters = [...unrelated, overlays.toString()].filter(Boolean).join('&');

        return `${path}${parameters ? `?${parameters}` : ''}${fragment}`;
    }

    private parseUrl(value: string): URL | null {
        if (!value.startsWith('/') || value.startsWith('//')) {
            return null;
        }
        try {
            const url = new URL(value, INTERNAL_ORIGIN);
            return url.origin === INTERNAL_ORIGIN ? url : null;
        } catch {
            return null;
        }
    }

    private isValid(key: string, id?: string, context?: string): boolean {
        return isContextOverlayKey(key) && (id === undefined || ADDRESS_PART.test(id)) && (context === undefined || ADDRESS_PART.test(context));
    }

    private suffix(index: number): string {
        return index === 0 ? '' : `.${index}`;
    }

    // #endregion
}
