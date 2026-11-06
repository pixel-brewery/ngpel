/**
 * The schema version of the persisted widget-grid layout. `WIDGET_GRID_LAYOUT_CODEC` migrates
 * older payloads to it and rejects payloads it does not understand, so a stored layout never
 * reaches the grid half-applied.
 *
 * @public
 */
export const WIDGET_GRID_LAYOUT_VERSION = 2;
