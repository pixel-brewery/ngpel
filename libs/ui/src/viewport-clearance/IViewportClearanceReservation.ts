/** A live reservation that can be resized and released. @public */
export interface IViewportClearanceReservation {
    /** Sets the distance in CSS pixels, measured from the viewport edge, that a floating surface keeps clear. */
    update(distance: number): void;

    /** Removes the reservation. */
    release(): void;
}
