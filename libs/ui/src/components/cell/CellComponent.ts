// #region Imports

import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { HintComponent, TextComponent, TypographyDirective } from '@pixel-brewery/mosaik-elements-angular';

// #endregion

/**
 * Presents up to four semantic tracks inside an owning list item: title, description, hints and chips.
 * The list item remains responsible for click, focus and selection behavior.
 * Use named projection attributes for rich content and leading/trailing elements. A track can
 * alternatively use its text input; do not supply both forms for the same track.
 *
 * @public
 */
@Component({
    selector: 'ngp-cell',
    template: `
        <div part="root" class="flex w-full min-w-0 items-center gap-3">
            <div part="leading" class="shrink-0 empty:hidden"><ng-content select="[ngpCellLeading]" /></div>

            <div part="content" class="flex min-w-0 flex-1 flex-col gap-1">
                @if (label(); as title) {
                    <mosaik-text part="title" [text]="title" [wrap]="true" [mosaikTypography]="'subtitle2'" />
                }
                <div part="title-projection" class="min-w-0 empty:hidden"><ng-content select="[ngpCellTitle]" /></div>

                @if (description(); as content) {
                    <mosaik-text part="description" [text]="content" [wrap]="true" />
                }
                <div part="description-projection" class="min-w-0 empty:hidden">
                    <ng-content select="[ngpCellDescription]" />
                </div>

                @if (visibleHints().length) {
                    <div part="hints" class="flex min-w-0 flex-wrap items-center gap-x-1 gap-y-0.5">
                        @for (hint of visibleHints(); track $index) {
                            @if (!$first) {
                                <mosaik-hint part="separator" [text]="'·'" />
                            }
                            <mosaik-hint part="hint" [text]="hint" [textOverflow]="'wrap'" />
                        }
                    </div>
                }
                <div part="hints-projection" class="min-w-0 empty:hidden"><ng-content select="[ngpCellHints]" /></div>

                <div part="chips" class="flex min-w-0 flex-wrap items-center gap-2 empty:hidden">
                    <ng-content select="[ngpCellChips]" />
                </div>
            </div>

            <div part="actions" class="shrink-0 empty:hidden"><ng-content select="[ngpCellActions]" /></div>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [HintComponent, TextComponent, TypographyDirective],
    host: {
        class: 'block w-full min-w-0',
    },
})
export class CellComponent {
    // #region Fields

    /**
     * Plain title for the first track, alternative to the title projection.
     *
     * @public
     * @readonly
     */
    public readonly label = input<string>();

    /**
     * Plain description for the second track, alternative to the description projection.
     *
     * @public
     * @readonly
     */
    public readonly description = input<string | null>();

    /**
     * Ordered third-track values; absent and empty entries are omitted before separators are placed.
     *
     * @public
     * @readonly
     */
    public readonly hints = input<readonly (string | null | undefined)[]>([]);

    /**
     * Hints that participate in the rendered sequence.
     *
     * @protected
     * @readonly
     */
    protected readonly visibleHints = computed(() => this.hints().filter((hint): hint is string => !!hint));

    // #endregion
}
