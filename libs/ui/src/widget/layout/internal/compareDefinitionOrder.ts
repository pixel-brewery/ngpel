/**
 * Orders contributed definitions by their declared order and breaks ties by id, so the result never
 * depends on the sequence in which feature libraries were composed.
 *
 * @param left The left definition.
 * @param right The right definition.
 * @returns A negative number, zero or a positive number, as `Array.prototype.sort` expects.
 */
export function compareDefinitionOrder(left: { readonly id: string; readonly order: number }, right: { readonly id: string; readonly order: number }): number {
    return left.order - right.order || left.id.localeCompare(right.id);
}
