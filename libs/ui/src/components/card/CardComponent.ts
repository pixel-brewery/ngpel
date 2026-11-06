// #region Imports

import {
    ChangeDetectionStrategy,
    Component,
    computed,
    contentChildren,
    DestroyRef,
    inject,
    input,
    signal,
    type InputSignal,
    type Signal,
    type WritableSignal,
} from '@angular/core';
import { CardActionsComponent, CardComponent as MosaikCardComponent, CardFooterComponent, ExpandableComponent } from '@pixel-brewery/mosaik-elements-angular';
import { CardAccordion } from './CardAccordion';

// #endregion

/**
 * Preserves Mosaik card slots while allowing its body to collapse.
 *
 * @public
 */
@Component({
    selector: 'ngp-card',
    template: `
        <mosaik-card>
            <ng-content select="[slot=cover]" />
            <ng-content select="[slot=media]" />
            <ng-content select="ngp-card-header, mosaik-card-header" />
            <mosaik-expandable slot="content" [isExpanded]="isExpanded()" [attr.inert]="isExpanded() ? null : ''">
                <div>
                    <ng-content select="mosaik-card-content" />
                </div>
            </mosaik-expandable>
            @if (hasActions()) {
                <mosaik-expandable slot="actions" [isExpanded]="isExpanded()" [attr.inert]="isExpanded() ? null : ''">
                    <div>
                        <ng-content select="mosaik-card-actions" />
                    </div>
                </mosaik-expandable>
            }
            @if (hasFooter()) {
                <mosaik-expandable slot="footer" [isExpanded]="isExpanded()" [attr.inert]="isExpanded() ? null : ''">
                    <div>
                        <ng-content select="mosaik-card-footer" />
                    </div>
                </mosaik-expandable>
            }
        </mosaik-card>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [MosaikCardComponent, ExpandableComponent],
    host: {
        class: 'block',
    },
})
export class CardComponent {
    // #region Fields

    private readonly _accordion: CardAccordion | null = inject(CardAccordion, { optional: true });
    private readonly _localExpanded: WritableSignal<boolean> = signal(false);
    private readonly _actions = contentChildren(CardActionsComponent, { descendants: false });
    private readonly _footers = contentChildren(CardFooterComponent, { descendants: false });

    // #endregion

    // #region Ctor

    /**
     * Constructs a card and releases its accordion selection when destroyed.
     *
     * @public
     */
    public constructor(destroyRef: DestroyRef = inject(DestroyRef)) {
        destroyRef.onDestroy(() => this._accordion?.release(this));
    }

    // #endregion

    // #region Properties

    /**
     * Overrides the owning view's expansion mode when supplied.
     *
     * @public
     * @readonly
     */
    public readonly isExpandable: InputSignal<boolean | undefined> = input<boolean | undefined>(undefined);

    /**
     * Whether the card shows its expansion control.
     *
     * @public
     * @readonly
     */
    public readonly effectiveIsExpandable: Signal<boolean> = computed(() => this.isExpandable() ?? this._accordion?.isExpandable() ?? false);

    /**
     * Whether the card body and footer are visible.
     *
     * @public
     * @readonly
     */
    public readonly isExpanded: Signal<boolean> = computed(
        () => !this.effectiveIsExpandable() || (this._accordion ? this._accordion.expandedCard() === this : this._localExpanded()),
    );

    /**
     * Whether a projected actions slot exists.
     *
     * @public
     * @readonly
     */
    public readonly hasActions: Signal<boolean> = computed(() => this._actions().length > 0);

    /**
     * Whether a projected footer slot exists.
     *
     * @public
     * @readonly
     */
    public readonly hasFooter: Signal<boolean> = computed(() => this._footers().length > 0);

    // #endregion

    // #region Methods

    /**
     * Toggles this card's body when expansion is enabled.
     *
     * @public
     */
    public toggle(): void {
        if (!this.effectiveIsExpandable()) {
            return;
        }

        if (this._accordion) {
            this._accordion.toggle(this);
        } else {
            this._localExpanded.update((expanded) => !expanded);
        }
    }

    // #endregion
}
