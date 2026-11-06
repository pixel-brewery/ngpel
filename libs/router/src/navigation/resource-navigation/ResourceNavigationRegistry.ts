import { inject, Injectable } from '@angular/core';
import type { IResourceNavigationSource } from './IResourceNavigationSource';
import type { IResourceNavigationTarget } from './IResourceNavigationTarget';
import { RESOURCE_NAVIGATION_TARGETS } from './RESOURCE_NAVIGATION_TARGETS';

const INTERNAL_ORIGIN = 'https://resource-navigation.invalid';
const TARGET_KEY = /^[a-z][a-z0-9]*(?:[.-][a-z0-9]+)*$/u;
const SOURCE_PART = /^[A-Za-z][A-Za-z0-9._-]{0,127}$/u;
const RESOURCE_ID = /^[A-Za-z0-9][A-Za-z0-9._:-]{0,127}$/u;
const INVALID_URL_CHARACTERS = /[\\\s]/u;

/**
 * Resolves feature-owned resource links by semantic target or source.
 *
 * @public
 */
@Injectable({ providedIn: 'root' })
export class ResourceNavigationRegistry {
    // #region Fields

    private readonly _targets = new Map<string, IResourceNavigationTarget>();
    private readonly _sources = new Map<string, IResourceNavigationSource>();

    // #endregion

    // #region Ctor

    /** Indexes targets and source aliases contributed at application composition. */
    public constructor() {
        const targets = inject(RESOURCE_NAVIGATION_TARGETS, { optional: true }) ?? [];
        for (const target of targets) {
            if (
                !target ||
                typeof target.targetKey !== 'string' ||
                target.targetKey.length > 128 ||
                !TARGET_KEY.test(target.targetKey) ||
                typeof target.createUrl !== 'function' ||
                (target.canNavigate !== undefined && typeof target.canNavigate !== 'function') ||
                (target.sources !== undefined && !Array.isArray(target.sources))
            ) {
                throw new Error('Invalid resource navigation target.');
            }
            if (this._targets.has(target.targetKey)) {
                throw new Error(`Duplicate resource navigation target: "${target.targetKey}".`);
            }
            this._targets.set(target.targetKey, target);

            for (const source of target.sources ?? []) {
                if (
                    !source ||
                    typeof source.key !== 'string' ||
                    !SOURCE_PART.test(source.key) ||
                    typeof source.idField !== 'string' ||
                    !SOURCE_PART.test(source.idField)
                ) {
                    throw new Error(`Invalid resource navigation source for "${target.targetKey}".`);
                }
                if (this._sources.has(source.key)) {
                    throw new Error(`Duplicate resource navigation source: "${source.key}".`);
                }
                this._sources.set(source.key, { target, idField: source.idField });
            }
        }
    }

    // #endregion

    // #region Methods

    /**
     * Finds a target by its semantic key.
     *
     * @param targetKey Registered target key.
     * @returns The target, if registered.
     */
    public resolve(targetKey: string): IResourceNavigationTarget | undefined {
        return this._targets.get(targetKey);
    }

    /**
     * Finds the resource destination described by a source row.
     *
     * @param sourceKey Registered source alias.
     * @returns The target and identifier field, if registered.
     */
    public resolveSource(sourceKey: string): IResourceNavigationSource | undefined {
        return this._sources.get(sourceKey);
    }

    /**
     * Builds a canonical root-relative address for a registered resource.
     *
     * @param targetKey Registered target key.
     * @param resourceId A nonempty identifier of at most 128 characters.
     * @returns The application URL, including its query and fragment.
     * @throws Error if the target is unavailable, the identifier is invalid, the target denies the link or the URL is unsafe.
     */
    public urlFor(targetKey: string, resourceId: string): string {
        const target = this.resolve(targetKey);
        if (!target) {
            throw new Error(`Unknown resource navigation target: "${targetKey}".`);
        }
        if (typeof resourceId !== 'string' || !RESOURCE_ID.test(resourceId)) {
            throw new Error('Invalid resource navigation identifier.');
        }
        if (target.canNavigate && !target.canNavigate(resourceId)) {
            throw new Error(`Resource navigation target "${targetKey}" denied the link.`);
        }

        const address = target.createUrl(resourceId);
        if (typeof address !== 'string' || !address.startsWith('/') || address.startsWith('//') || INVALID_URL_CHARACTERS.test(address)) {
            throw new Error('Resource navigation target returned an invalid application URL.');
        }
        const url = new URL(address, INTERNAL_ORIGIN);
        if (url.origin !== INTERNAL_ORIGIN || url.pathname.startsWith('//')) {
            throw new Error('Resource navigation target returned an invalid application URL.');
        }

        return `${url.pathname}${url.search}${url.hash}`;
    }

    // #endregion
}
