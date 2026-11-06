/**
 * Returns a new array sorted by ascending `order`, treating an absent order as `0`. The sort is
 * stable, so contributions with the same order keep their registration order.
 *
 * @internal
 * @typeParam TItem The ordered item type.
 * @param list The items to sort.
 * @returns The sorted copy.
 */
export function sortByOrder<TItem extends { readonly order?: number }>(list: ReadonlyArray<TItem>): TItem[] {
    return [...list].sort((first, second): number => (first.order ?? 0) - (second.order ?? 0));
}
