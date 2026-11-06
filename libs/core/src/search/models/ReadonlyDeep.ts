/**
 * Recursively marks `T` and everything reachable from it as `readonly`. Dates, regular expressions
 * and functions keep their identity instead of being mapped structurally.
 *
 * The type is inlined on purpose: the payload of a search result must be immutable for consumers,
 * but that guarantee may not cost the entry point a `type-fest` peer dependency.
 *
 * @public
 * @typeParam T The type to freeze structurally.
 */
export type ReadonlyDeep<T> = T extends ReadonlyDeepAtom
    ? T
    : T extends ReadonlyArray<infer TItem>
      ? ReadonlyArray<ReadonlyDeep<TItem>>
      : T extends ReadonlyMap<infer TKey, infer TValue>
        ? ReadonlyMap<ReadonlyDeep<TKey>, ReadonlyDeep<TValue>>
        : T extends ReadonlySet<infer TItem>
          ? ReadonlySet<ReadonlyDeep<TItem>>
          : T extends object
            ? { readonly [TKey in keyof T]: ReadonlyDeep<T[TKey]> }
            : T;

/**
 * Values that are immutable already or whose identity must survive the mapping.
 */
type ReadonlyDeepAtom = string | number | bigint | boolean | symbol | null | undefined | Date | RegExp | ((...args: never[]) => unknown);
