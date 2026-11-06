// #region Imports

import { NgTemplateOutlet } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    Injector,
    afterNextRender,
    computed,
    contentChild,
    ElementRef,
    effect,
    forwardRef,
    inject,
    input,
    model,
    OnInit,
    output,
    signal,
    viewChild,
} from '@angular/core';
import {
    BadgeComponent,
    ButtonComponent,
    createTourAccessorTarget,
    IconNameDirective,
    IndicatorComponent,
    ListComponent,
    ListItemComponent,
    SegmentComponent,
    SegmentItemComponent,
    type ITourAccessor,
    TOUR_ACCESSOR,
} from '@pixel-brewery/mosaik-elements-angular';
import { SectionComponent } from '../section/SectionComponent';
import { SectionContentComponent } from '../section/SectionContentComponent';
import { SectionHeaderComponent } from '../section/SectionHeaderComponent';
import { CompoundActionsDirective } from './CompoundActionsDirective';
import { CompoundEmptyDirective } from './CompoundEmptyDirective';
import { CompoundItemDirective } from './CompoundItemDirective';
import { CompoundListHeaderDirective } from './CompoundListHeaderDirective';
import { CompoundListItemDirective } from './CompoundListItemDirective';
import { CompoundViewMode } from './CompoundViewMode';
import type { CompoundViewModeValue } from './CompoundViewModeValue';
import type { ICompoundItemContext } from './ICompoundItemContext';

// #endregion

/** Stable signal-accessor targets exposed by every compound component. */
export const COMPOUND_TOUR_TARGETS = {
    activeItem: 'activeItem',
    add: 'add',
    next: 'next',
    previous: 'previous',
    singleView: 'singleView',
} as const;

/**
 * Renders one item of a collection at a time with generic navigation and creation controls.
 *
 * @typeParam T - Collection item type supplied by the consumer.
 * @public
 */
@Component({
    selector: 'ngp-compound',
    template: `
        <div part="root" class="flex min-w-0 flex-col gap-4 surface-input">
            <ngp-section>
                <div part="header" class="flex min-w-0 items-start justify-between gap-3">
                    <ngp-section-header class="min-w-0 flex-1" [header]="title()" [description]="description()" />

                    <div part="header-actions" class="flex shrink-0 items-center gap-2">
                        @if (hasViewModeSwitch()) {
                            <mosaik-segment [attr.test-id]="viewModeSwitchTestId()" [attr.aria-label]="viewModeSwitchLabel()" [appearance]="'soft'">
                                <mosaik-segment-item
                                    [attr.test-id]="listViewTestId()"
                                    [label]="listViewLabel()"
                                    [isChecked]="isListView()"
                                    (checked)="selectViewMode(viewModes.List)"
                                />
                                <mosaik-segment-item
                                    #singleViewTarget
                                    [attr.test-id]="singleViewTestId()"
                                    [label]="singleViewLabel()"
                                    [isChecked]="!isListView()"
                                    (checked)="selectViewMode(viewModes.Single)"
                                />
                            </mosaik-segment>
                        }
                    </div>
                </div>
                <ngp-section-content>
                    <div #activeItemTarget part="content" class="relative min-w-0">
                        @if (itemCount() === 0) {
                            @if (emptyTemplate(); as template) {
                                <ng-container [ngTemplateOutlet]="template.templateRef" />
                            }
                        } @else if (isListView()) {
                            @if (constrainListToSingleViewHeight()) {
                                @if (itemContext(); as context) {
                                    @for (itemKey of [activeItemKey()]; track itemKey) {
                                        <div part="single-view-height-reference" class="invisible min-w-0" aria-hidden="true" inert>
                                            <ng-container [ngTemplateOutlet]="itemTemplate().templateRef" [ngTemplateOutletContext]="context" />
                                        </div>
                                    }
                                }
                                <div part="list-viewport" class="absolute inset-0 min-h-0 min-w-0 overflow-y-auto overscroll-contain">
                                    <ng-container [ngTemplateOutlet]="listViewTemplate" />
                                </div>
                            } @else {
                                <ng-container [ngTemplateOutlet]="listViewTemplate" />
                            }
                        } @else if (itemContext(); as context) {
                            @for (itemKey of [activeItemKey()]; track itemKey) {
                                <ng-container [ngTemplateOutlet]="itemTemplate().templateRef" [ngTemplateOutletContext]="context" />
                            }
                        }
                    </div>

                    <div part="actions" class="flex items-center justify-between gap-3">
                        <div part="position" class="flex min-w-0 items-center gap-2">
                            @if (itemCount() > 0) {
                                @if (!isListView()) {
                                    <mosaik-indicator [total]="itemCount()" [selected]="activeIndex()" (indicated)="selectFromIndicator($event)" />
                                }
                                <mosaik-badge [label]="positionText()" [appearance]="'soft'" />
                            }
                        </div>

                        <div part="item-actions" class="flex shrink-0 items-center gap-1">
                            @if (!isListView()) {
                                <mosaik-button
                                    #previousTarget
                                    [attr.test-id]="previousTestId()"
                                    [type]="'button'"
                                    [iconName]="'chevronLeft'"
                                    [appearance]="'plain'"
                                    [disabled]="!hasPrevious()"
                                    [attr.aria-label]="previousLabel()"
                                    (click)="selectPrevious()"
                                />
                                <mosaik-button
                                    #nextTarget
                                    [attr.test-id]="nextTestId()"
                                    [type]="'button'"
                                    [iconName]="'chevronRight'"
                                    [appearance]="'plain'"
                                    [disabled]="!hasNext()"
                                    [attr.aria-label]="nextLabel()"
                                    (click)="selectNext()"
                                />
                            }
                            @if (actionsTemplate(); as template) {
                                <ng-container [ngTemplateOutlet]="template.templateRef" />
                            } @else if (canAdd()) {
                                <mosaik-button
                                    #addTarget
                                    [attr.test-id]="addTestId()"
                                    [type]="'button'"
                                    [iconName]="'add'"
                                    [appearance]="'solid'"
                                    [variant]="'primary'"
                                    [attr.aria-label]="addLabel()"
                                    (click)="requestAdd($event)"
                                />
                            }
                        </div>
                    </div>
                </ngp-section-content>
            </ngp-section>
        </div>

        <ng-template #listViewTemplate>
            @if (listItemTemplate(); as template) {
                <mosaik-list part="list" class="w-full" [attr.test-id]="listTestId()" [selectionMode]="listSelectionMode()">
                    @if (listHeaderTemplate(); as headerTemplate) {
                        <div slot="header" part="list-header" class="min-w-0">
                            <ng-container [ngTemplateOutlet]="headerTemplate.templateRef" />
                        </div>
                    }
                    @for (context of listItemContexts(); track resolveItemKey(context)) {
                        <mosaik-list-item
                            part="list-item"
                            [attr.test-id]="resolveListItemTestId(context)"
                            [value]="context.item"
                            [isSelected]="context.index === activeIndex()"
                            [disabled]="isListItemDisabled(context)"
                            (click)="openItemFromList(context)"
                        >
                            <ng-container [ngTemplateOutlet]="template.templateRef" [ngTemplateOutletContext]="context" />
                        </mosaik-list-item>
                    }
                </mosaik-list>
            }
        </ng-template>
    `,
    styles: `
        :host {
            display: block;
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        BadgeComponent,
        ButtonComponent,
        SectionComponent,
        SectionContentComponent,
        SectionHeaderComponent,
        IconNameDirective,
        IndicatorComponent,
        ListComponent,
        ListItemComponent,
        SegmentComponent,
        SegmentItemComponent,
        NgTemplateOutlet,
    ],
    providers: [
        {
            provide: TOUR_ACCESSOR,
            useExisting: forwardRef(() => CompoundComponent),
        },
    ],
})
export class CompoundComponent<T> implements ITourAccessor, OnInit {
    // #region Fields

    /**
     * Collection size observed during the previous synchronization.
     *
     * @private
     */
    private _previousItemCount = 0;

    /**
     * Indicates that the collection has completed its first non-empty hydration.
     *
     * @private
     */
    private _hasObservedNonEmptyCollection = false;

    /**
     * Indicates that the next collection growth originated from the add action.
     *
     * @private
     */
    private _selectLastAfterCollectionGrowth = false;

    /** Moves focus into the next item appended through the add action. */
    private _focusAppendedItemAfterGrowth = false;

    private readonly _injector = inject(Injector);

    /** Current projected item surface exposed through the signal tour accessor. */
    private readonly _activeItemTarget = viewChild<ElementRef<HTMLElement>>('activeItemTarget');

    /** Built-in add action exposed through the signal tour accessor. */
    private readonly _addTarget = viewChild<ButtonComponent>('addTarget');

    /** Built-in next action exposed through the signal tour accessor. */
    private readonly _nextTarget = viewChild<ButtonComponent>('nextTarget');

    /** Built-in previous action exposed through the signal tour accessor. */
    private readonly _previousTarget = viewChild<ButtonComponent>('previousTarget');

    /** Built-in single-view segment item exposed through the signal tour accessor. */
    private readonly _singleViewTarget = viewChild<SegmentItemComponent>('singleViewTarget');

    // #endregion

    // #region Ctor

    /**
     * Constructs the component and keeps its selection valid as the collection changes.
     *
     * @public
     */
    public constructor() {
        effect(() => {
            this.synchronizeSelection(this.items().length);
        });
    }

    // #endregion

    // #region Properties

    /**
     * Heading displayed above the collection item.
     *
     * @public
     * @readonly
     */
    public readonly title = input.required<string>();

    /**
     * Explanatory text displayed below the collection heading.
     *
     * @public
     * @readonly
     */
    public readonly description = input.required<string>();

    /**
     * Ordered items managed by the consumer.
     *
     * @public
     * @readonly
     */
    public readonly items = input.required<ReadonlyArray<T>>();

    /**
     * Index of the currently displayed item.
     *
     * @public
     * @readonly
     */
    public readonly selectedIndex = model<number>(0);

    /**
     * Current collection view mode.
     *
     * Bind this model two-way when the collection owner needs to observe or control view changes.
     *
     * @public
     * @readonly
     */
    public readonly viewMode = model<CompoundViewModeValue>(CompoundViewMode.Single);

    /**
     * Optional view mode applied once when the component receives its initial inputs.
     *
     * Use this input for an uncontrolled starting mode. Use the `viewMode` model instead when the collection owner
     * controls the mode throughout the component lifetime.
     *
     * @public
     * @readonly
     */
    public readonly initialViewMode = input<CompoundViewModeValue>();

    /**
     * Accessible label for the previous-item button.
     *
     * @public
     * @readonly
     */
    public readonly previousLabel = input.required<string>();

    /**
     * Accessible label for the next-item button.
     *
     * @public
     * @readonly
     */
    public readonly nextLabel = input.required<string>();

    /**
     * Accessible label for the add-item button.
     *
     * @public
     * @readonly
     */
    public readonly addLabel = input.required<string>();

    /**
     * Optional stable test identifier for the add action.
     *
     * @public
     * @readonly
     */
    public readonly addTestId = input<string>();

    /**
     * Optional stable test identifier for the previous-item action.
     *
     * @public
     * @readonly
     */
    public readonly previousTestId = input<string>();

    /**
     * Optional stable test identifier for the next-item action.
     *
     * @public
     * @readonly
     */
    public readonly nextTestId = input<string>();

    /**
     * Optional stable test identifier for the view-mode segment.
     *
     * @public
     * @readonly
     */
    public readonly viewModeSwitchTestId = input<string>();

    /**
     * Optional stable test identifier for the list-view segment item.
     *
     * @public
     * @readonly
     */
    public readonly listViewTestId = input<string>();

    /**
     * Optional stable test identifier for the single-view segment item.
     *
     * @public
     * @readonly
     */
    public readonly singleViewTestId = input<string>();

    /**
     * Optional stable test identifier for the list surface.
     *
     * @public
     * @readonly
     */
    public readonly listTestId = input<string>();

    /**
     * Optional resolver for stable, domain-specific list-item test identifiers.
     *
     * @public
     * @readonly
     */
    public readonly listItemTestId = input<(item: T, index: number) => string | undefined>();

    /**
     * Optional resolver for the identity of an item.
     *
     * The projected item view is destroyed and recreated whenever this identity changes, so a
     * control that caches its rendered value cannot carry it over to a different item. Supply a
     * resolver whenever an item keeps its position while its identity changes, such as after a
     * removal. Without a resolver the position itself is the identity.
     *
     * @public
     * @readonly
     */
    public readonly itemKey = input<(item: T, index: number) => unknown>();

    /**
     * Whether the collection exposes its add action.
     *
     * @public
     * @readonly
     */
    public readonly canAdd = input<boolean>(true);

    /**
     * Whether the built-in segment for changing the view mode is displayed.
     *
     * A list item template must also be present. Consumers enabling the switch provide both view labels.
     *
     * @public
     * @readonly
     */
    public readonly canSwitchViewMode = input<boolean>(false);

    /**
     * Whether selecting a list item opens that item in the single view.
     *
     * @public
     * @readonly
     */
    public readonly canOpenItemsFromList = input<boolean>(true);

    /**
     * Whether the list view uses the active single-item view as its live height boundary.
     *
     * @public
     * @readonly
     */
    public readonly constrainListToSingleViewHeight = input<boolean>(false);

    /**
     * Optional resolver that disables individual entries in the list view.
     *
     * @public
     * @readonly
     */
    public readonly listItemDisabled = input<(item: T, index: number) => boolean>();

    /**
     * Consumer-owned label for the list-view segment item.
     *
     * A non-empty label is required when the built-in view-mode switch is enabled.
     *
     * @public
     * @readonly
     */
    public readonly listViewLabel = input<string>('');

    /**
     * Consumer-owned label for the single-view segment item.
     *
     * A non-empty label is required when the built-in view-mode switch is enabled.
     *
     * @public
     * @readonly
     */
    public readonly singleViewLabel = input<string>('');

    /**
     * Optional accessible label for the view-mode segment.
     *
     * @public
     * @readonly
     */
    public readonly viewModeSwitchLabel = input<string>();

    /**
     * Whether later collection growth selects the newly appended last item.
     *
     * The first non-empty collection is treated as hydration and keeps the initial selection.
     *
     * @public
     * @readonly
     */
    public readonly selectLastOnCollectionGrowth = input<boolean>(false);

    /**
     * Emits when the consumer should add a new item.
     *
     * @public
     * @readonly
     */
    public readonly addRequested = output<void>();

    /**
     * Reactive component capabilities available to an external tour mapping.
     * No tour identifiers or feature-specific anchors are stored here.
     *
     * @public
     * @readonly
     */
    public readonly targets = signal(
        new Map([
            [COMPOUND_TOUR_TARGETS.activeItem, createTourAccessorTarget(computed(() => this._activeItemTarget()?.nativeElement ?? null))],
            [
                COMPOUND_TOUR_TARGETS.add,
                createTourAccessorTarget(
                    computed(() => this._addTarget()?.elementRef.nativeElement ?? null),
                    undefined,
                    () => this.requestAddFromTour(),
                ),
            ],
            [
                COMPOUND_TOUR_TARGETS.next,
                createTourAccessorTarget(
                    computed(() => this._nextTarget()?.elementRef.nativeElement ?? null),
                    undefined,
                    () => this.selectNextFromTour(),
                ),
            ],
            [
                COMPOUND_TOUR_TARGETS.previous,
                createTourAccessorTarget(
                    computed(() => this._previousTarget()?.elementRef.nativeElement ?? null),
                    undefined,
                    () => this.selectPreviousFromTour(),
                ),
            ],
            [
                COMPOUND_TOUR_TARGETS.singleView,
                createTourAccessorTarget(
                    computed(() => this._singleViewTarget()?.elementRef.nativeElement ?? null),
                    undefined,
                    () => this.selectSingleViewFromTour(),
                ),
            ],
        ]),
    );

    /**
     * Consumer template used to render the active item.
     *
     * @protected
     * @readonly
     */
    protected readonly itemTemplate = contentChild.required<CompoundItemDirective<T>>(CompoundItemDirective);

    /**
     * Optional consumer template used to render each item in the list view.
     *
     * @protected
     * @readonly
     */
    protected readonly listItemTemplate = contentChild<CompoundListItemDirective<T>>(CompoundListItemDirective);

    /**
     * Optional consumer template rendered in the Mosaik list header slot.
     *
     * @protected
     * @readonly
     */
    protected readonly listHeaderTemplate = contentChild<CompoundListHeaderDirective>(CompoundListHeaderDirective);

    /**
     * Optional consumer template replacing the built-in add action.
     *
     * @protected
     * @readonly
     */
    protected readonly actionsTemplate = contentChild<CompoundActionsDirective>(CompoundActionsDirective);

    /**
     * Optional consumer template displayed for an empty collection.
     *
     * @protected
     * @readonly
     */
    protected readonly emptyTemplate = contentChild<CompoundEmptyDirective>(CompoundEmptyDirective);

    /**
     * Number of items currently available.
     *
     * @protected
     * @readonly
     */
    protected readonly itemCount = computed(() => this.items().length);

    /**
     * View-mode values available to the component template.
     *
     * @protected
     * @readonly
     */
    protected readonly viewModes = CompoundViewMode;

    /**
     * Indicates whether the collection currently renders its list view.
     *
     * A missing list item template fails closed to the existing single view.
     *
     * @protected
     * @readonly
     */
    protected readonly isListView = computed(() => this.viewMode() === CompoundViewMode.List && this.listItemTemplate() !== undefined);

    /**
     * Indicates whether the built-in view-mode segment can be rendered.
     *
     * @protected
     * @readonly
     */
    protected readonly hasViewModeSwitch = computed(
        () =>
            this.canSwitchViewMode() &&
            this.listItemTemplate() !== undefined &&
            this.listViewLabel().trim().length > 0 &&
            this.singleViewLabel().trim().length > 0,
    );

    /**
     * Mosaik selection mode matching whether list items can open the single view.
     *
     * @protected
     * @readonly
     */
    protected readonly listSelectionMode = computed<'none' | 'single'>(() => (this.canOpenItemsFromList() ? 'single' : 'none'));

    /**
     * Selected index restricted to the current collection range.
     *
     * @protected
     * @readonly
     */
    protected readonly activeIndex = computed(() => this.clampIndex(this.selectedIndex(), this.itemCount()));

    /**
     * Indicates whether backward navigation is available.
     *
     * @protected
     * @readonly
     */
    protected readonly hasPrevious = computed(() => this.itemCount() > 0 && this.activeIndex() > 0);

    /**
     * Indicates whether forward navigation is available.
     *
     * @protected
     * @readonly
     */
    protected readonly hasNext = computed(() => this.itemCount() > 0 && this.activeIndex() < this.itemCount() - 1);

    /**
     * Human-readable one-based collection position.
     *
     * @protected
     * @readonly
     */
    protected readonly positionText = computed(() => (this.itemCount() === 0 ? '0 / 0' : `${this.activeIndex() + 1} / ${this.itemCount()}`));

    /**
     * Template context for the currently active item.
     *
     * @protected
     * @readonly
     */
    protected readonly itemContext = computed<ICompoundItemContext<T> | null>(() => {
        const items = this.items();

        if (items.length === 0) {
            return null;
        }

        const index = this.activeIndex();
        const item = items[index] as T;

        return {
            $implicit: item,
            item,
            index,
            count: items.length,
        };
    });

    /**
     * Identity of the currently active item.
     *
     * @protected
     * @readonly
     */
    protected readonly activeItemKey = computed<unknown>(() => this.resolveItemKey(this.itemContext()));

    /**
     * Template contexts for all items displayed in the list view.
     *
     * @protected
     * @readonly
     */
    protected readonly listItemContexts = computed<ReadonlyArray<ICompoundItemContext<T>>>(() => {
        const items = this.items();

        return items.map((item, index) => ({
            $implicit: item,
            item,
            index,
            count: items.length,
        }));
    });

    // #endregion

    // #region Methods

    /**
     * Applies the optional uncontrolled starting mode after Angular initializes the component inputs.
     *
     * @public
     */
    public ngOnInit(): void {
        const initialViewMode = this.initialViewMode();

        if (initialViewMode !== undefined) {
            this.viewMode.set(initialViewMode);
        }
    }

    /**
     * Selects the item before the current item.
     *
     * @protected
     */
    protected selectPrevious(): void {
        this.selectedIndex.set(this.clampIndex(this.activeIndex() - 1, this.itemCount()));
    }

    /**
     * Selects the item after the current item.
     *
     * @protected
     */
    protected selectNext(): void {
        this.selectedIndex.set(this.clampIndex(this.activeIndex() + 1, this.itemCount()));
    }

    /**
     * Changes the currently rendered collection view.
     *
     * @param viewMode - View mode requested by the built-in segment.
     * @protected
     */
    protected selectViewMode(viewMode: CompoundViewModeValue): void {
        this.viewMode.set(viewMode);
    }

    /**
     * Opens a list item in the existing single-item view.
     *
     * @param context - Template context of the selected list item.
     * @protected
     */
    protected openItemFromList(context: ICompoundItemContext<T>): void {
        if (!this.canOpenItemsFromList() || this.isListItemDisabled(context) || context.index < 0 || context.index >= this.itemCount()) {
            return;
        }

        this.selectedIndex.set(context.index);
        this.viewMode.set(CompoundViewMode.Single);
    }

    /**
     * Resolves whether a list item is unavailable for opening.
     *
     * @param context - Template context of the list item.
     * @returns Whether the list item is disabled.
     * @protected
     */
    protected isListItemDisabled(context: ICompoundItemContext<T>): boolean {
        return this.listItemDisabled()?.(context.item, context.index) ?? false;
    }

    /**
     * Resolves the optional stable test identifier of a list item.
     *
     * @param context - Template context of the list item.
     * @returns The consumer-provided test identifier.
     * @protected
     */
    protected resolveListItemTestId(context: ICompoundItemContext<T>): string | undefined {
        return this.listItemTestId()?.(context.item, context.index);
    }

    /**
     * Selects an item requested through the Mosaik indicator.
     *
     * @param event - Indicator event or event detail containing the selected index.
     * @protected
     */
    protected selectFromIndicator(event: unknown): void {
        const index = this.readIndicatorIndex(event);

        if (index !== null) {
            this.selectedIndex.set(this.clampIndex(index, this.itemCount()));
        }
    }

    /**
     * Requests a new item from the collection owner.
     *
     * @protected
     */
    protected requestAdd(event?: Event): void {
        event?.preventDefault();
        if (!this.canAdd()) {
            return;
        }
        this._selectLastAfterCollectionGrowth = true;
        this._focusAppendedItemAfterGrowth = true;
        this.addRequested.emit();
    }

    /**
     * Requests a new item through the component-safe tour action contract.
     *
     * @returns Whether the add action was available.
     * @private
     */
    private requestAddFromTour(): boolean {
        if (!this.canAdd()) {
            return false;
        }

        this.requestAdd();
        return true;
    }

    /**
     * Selects the next item through the component-safe tour action contract.
     *
     * @returns Whether forward navigation was available.
     * @private
     */
    private selectNextFromTour(): boolean {
        if (!this.hasNext()) {
            return false;
        }

        this.selectNext();
        return true;
    }

    /**
     * Selects the previous item through the component-safe tour action contract.
     *
     * @returns Whether backward navigation was available.
     * @private
     */
    private selectPreviousFromTour(): boolean {
        if (!this.hasPrevious()) {
            return false;
        }

        this.selectPrevious();
        return true;
    }

    /**
     * Opens the single-item view through the component-safe tour action contract.
     *
     * @returns Whether the view-mode switch was available.
     * @private
     */
    private selectSingleViewFromTour(): boolean {
        if (!this.hasViewModeSwitch()) {
            return false;
        }

        this.selectViewMode(CompoundViewMode.Single);
        return true;
    }

    /**
     * Resolves the identity that keeps the projected item view alive.
     *
     * @param context - Template context of the active item, or `null` for an empty collection.
     * @returns The consumer-resolved identity, or the active position when none is supplied.
     * @protected
     */
    protected resolveItemKey(context: ICompoundItemContext<T> | null): unknown {
        if (context === null) {
            return null;
        }

        return this.itemKey()?.(context.item, context.index) ?? context.index;
    }

    /**
     * Restricts an index to the available collection range.
     *
     * @param index - Candidate collection index.
     * @param itemCount - Current collection size.
     * @returns A valid index or zero for an empty collection.
     * @private
     */
    private clampIndex(index: number, itemCount: number): number {
        if (itemCount === 0) {
            return 0;
        }

        return Math.min(Math.max(index, 0), itemCount - 1);
    }

    /**
     * Keeps the selection valid and optionally selects a newly appended item.
     *
     * @param itemCount - Current collection size.
     * @private
     */
    private synchronizeSelection(itemCount: number): void {
        const previousItemCount = this._previousItemCount;
        const selectedIndex = this.selectedIndex();
        const shouldSelectLastOnGrowth = this.selectLastOnCollectionGrowth() && this._hasObservedNonEmptyCollection && itemCount > previousItemCount;
        const shouldOpenAppendedItem = this._selectLastAfterCollectionGrowth && itemCount > previousItemCount;
        const nextSelectedIndex = shouldOpenAppendedItem || shouldSelectLastOnGrowth ? itemCount - 1 : this.clampIndex(selectedIndex, itemCount);

        if (selectedIndex !== nextSelectedIndex) {
            this.selectedIndex.set(nextSelectedIndex);
        }

        if (itemCount !== previousItemCount) {
            if (shouldOpenAppendedItem) {
                this.viewMode.set(CompoundViewMode.Single);
            }
            if (this._focusAppendedItemAfterGrowth && itemCount > previousItemCount) {
                this._focusAppendedItemAfterGrowth = false;
                if (this._injector) {
                    afterNextRender(() => this.focusAppendedItem(), { injector: this._injector });
                }
            }
            this._selectLastAfterCollectionGrowth = false;
            this._previousItemCount = itemCount;
        }

        if (itemCount > 0) {
            this._hasObservedNonEmptyCollection = true;
        }
    }

    private focusAppendedItem(): void {
        const root = this._activeItemTarget()?.nativeElement;
        if (!root) {
            return;
        }
        const queue: Array<Element | ShadowRoot> = [root];
        while (queue.length > 0) {
            const current = queue.shift();
            if (!current) {
                continue;
            }
            for (const element of Array.from(current.children)) {
                if (element instanceof HTMLElement && element.tabIndex >= 0 && !element.hasAttribute('disabled')) {
                    element.focus();
                    return;
                }
                if (element.shadowRoot) {
                    queue.push(element.shadowRoot);
                }
                queue.push(element);
            }
        }
    }

    /**
     * Extracts the selected index from the Angular wrapper or native custom event shape.
     *
     * @param event - Indicator output payload.
     * @returns The selected index or `null` for an unsupported payload.
     * @private
     */
    private readIndicatorIndex(event: unknown): number | null {
        if (typeof event === 'number') {
            return event;
        }

        if (!event || typeof event !== 'object') {
            return null;
        }

        const directIndex = (event as { readonly index?: unknown }).index;

        if (typeof directIndex === 'number') {
            return directIndex;
        }

        const detail = (event as { readonly detail?: unknown }).detail;

        if (!detail || typeof detail !== 'object') {
            return null;
        }

        const detailIndex = (detail as { readonly index?: unknown }).index;

        return typeof detailIndex === 'number' ? detailIndex : null;
    }

    // #endregion
}
