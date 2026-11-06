/**
 * Drops duplicate entries by id, keeping the last one. Two feature libraries contributing the same
 * id is a composition mistake the layout must survive rather than render twice.
 *
 * @typeParam T The entry type.
 * @param entries The entries to deduplicate.
 * @returns The deduplicated entries, in first-seen order.
 */
export function uniqueById<T extends { readonly id: string }>(entries: ReadonlyArray<T>): ReadonlyArray<T> {
    return [...new Map(entries.map((entry): [string, T] => [entry.id, entry])).values()];
}
