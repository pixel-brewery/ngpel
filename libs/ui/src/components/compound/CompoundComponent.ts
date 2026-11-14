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
    type Signal,
    viewChild,
    viewChildren,
} from '@angular/core';
import {
    BadgeComponent,
    ButtonComponent,
    createTourAccessorTarget,
    ExpanderComponent,
    ExpanderGroupComponent,
    IconNameDirective,
    IndicatorComponent,
    ListComponent,
    ListItemComponent,
    PressButtonComponent,
    SegmentComponent,
    SegmentItemComponent,
    type ITourAccessor,
    TOUR_ACCESSOR,
} from '@pixel-brewery/mosaik-elements-angular';
import { StopEventPropagationDirective } from '../../directives/stop-event-propagation/StopEventPropagationDirective';
import { LeadingLineComponent } from '../leading-line/LeadingLineComponent';
import { SectionComponent } from '../section/SectionComponent';
import { SectionContentComponent } from '../section/SectionContentComponent';
import { SectionHeaderComponent } from '../section/SectionHeaderComponent';
import { CompoundActionsDirective } from './CompoundActionsDirective';
import { CompoundEmptyDirective } from './CompoundEmptyDirective';
import { CompoundItemDirective } from './CompoundItemDirective';
import { CompoundItemStatusDirective } from './CompoundItemStatusDirective';
import { CompoundItemSummaryDirective } from './CompoundItemSummaryDirective';
import { CompoundLayout } from './CompoundLayout';
import type { CompoundLayoutValue } from './CompoundLayoutValue';
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
    delete: 'delete',
    expandItem: 'expandItem',
    next: 'next',
    previous: 'previous',
    singleView: 'singleView',
} as const;

/**
 * Renders a collection with single-item, list or stacked editing and consumer-owned actions.
 *
 * @typeParam T - Collection item type supplied by the consumer.
 * @public
 */
@Component({
    selector: 'ngp-compound',
    template: `
        <div part="root" class="flex min-w-0 gap-2.5" [class.surface-input]="!controlsInHeader()">
            @if (showNesting() && level() > 1) {
                <ngp-leading-line part="leading-line" [level]="level()" />
            }
            <ngp-section class="min-w-0 flex-1">
                <div part="header" class="flex min-w-0 items-start justify-between gap-x-3 gap-y-2" [class.flex-wrap]="controlsInHeader()">
                    <ngp-section-header class="min-w-0 flex-1" [class.basis-56]="controlsInHeader()" [header]="title()" [description]="description()" />

                    <div part="header-actions" class="flex shrink-0 items-center gap-2" [class.ml-auto]="controlsInHeader()">
                        @if (controlsInHeader()) {
                            <ng-container [ngTemplateOutlet]="collectionActions" />
                        }
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
                        } @else if (isStacked()) {
                            <mosaik-expander-group part="items" class="w-full" [attr.test-id]="itemsTestId()" [mode]="'multiple'" [stacking]="'joined'">
                                @for (context of listItemContexts(); track resolveItemKey(context)) {
                                    <mosaik-expander
                                        #itemTarget
                                        part="item"
                                        [attr.test-id]="itemTestId()?.(context.item, context.index)"
                                        [header]="itemSummaryTemplate() ? undefined : '' + (context.index + 1)"
                                        [appearance]="'outline'"
                                        [disabled]="isItemDisabled(context)"
                                        [isExpanded]="isItemExpanded(context)"
                                        (expanded)="setItemExpanded(context, true)"
                                        (collapsed)="setItemExpanded(context, false)"
                                    >
                                        @if (itemSummaryTemplate(); as template) {
                                            <div slot="header" part="item-summary" class="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-0.5">
                                                <ng-container [ngTemplateOutlet]="template.templateRef" [ngTemplateOutletContext]="context" />
                                            </div>
                                        }
                                        @if (itemStatusTemplate(); as template) {
                                            <div slot="subHeader" part="item-status" class="flex min-w-0 items-center gap-1.5">
                                                <ng-container [ngTemplateOutlet]="template.templateRef" [ngTemplateOutletContext]="context" />
                                            </div>
                                        }
                                        @if (canDelete()) {
                                            <mosaik-press-button
                                                #itemDeleteTarget
                                                slot="actions"
                                                part="item-delete"
                                                [ngpStopEventPropagation]="['click']"
                                                [attr.test-id]="resolveItemDeleteTestId(context)"
                                                [attr.aria-label]="deleteLabel()"
                                                [type]="'button'"
                                                [iconName]="'delete'"
                                                [appearance]="'plain'"
                                                [variant]="'danger'"
                                                [size]="'small'"
                                                (pressed)="requestDelete(context)"
                                            />
                                        }
                                        @if (isItemExpanded(context)) {
                                            <div part="item-content" [attr.data-ngp-compound-active]="context.index === activeIndex() ? '' : null">
                                                <ng-container [ngTemplateOutlet]="itemTemplate().templateRef" [ngTemplateOutletContext]="context" />
                                            </div>
                                        }
                                    </mosaik-expander>
                                }
                            </mosaik-expander-group>
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

                    @if (!controlsInHeader()) {
                        <ng-container [ngTemplateOutlet]="collectionActions" />
                    }
                </ngp-section-content>
            </ngp-section>
        </div>

        <ng-template #collectionActions>
            @let activeItem = itemContext();
            <div part="actions" class="flex items-center justify-between gap-3" [class.flex-wrap]="controlsInHeader()">
                <div part="position" class="flex min-w-0 items-center gap-2">
                    @if (itemCount() > 0) {
                        @if (!controlsInHeader() && !isListView() && !isStacked()) {
                            <mosaik-indicator [total]="itemCount()" [selected]="activeIndex()" (indicated)="selectFromIndicator($event)" />
                        }
                        <mosaik-badge part="position-count" [label]="positionText()" [appearance]="'soft'" />
                    }
                </div>

                <div part="item-actions" class="flex shrink-0 items-center gap-1">
                    @if (!isListView() && !isStacked()) {
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
                        @if (!controlsInHeader() && canDelete() && activeItem) {
                            <ng-container [ngTemplateOutlet]="deleteAction" [ngTemplateOutletContext]="{ $implicit: activeItem }" />
                        }
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
                    @if (controlsInHeader() && !isListView() && !isStacked() && canDelete()) {
                        <ng-container [ngTemplateOutlet]="deleteAction" [ngTemplateOutletContext]="{ $implicit: activeItem }" />
                    }
                </div>
            </div>
        </ng-template>

        <ng-template #deleteAction let-context>
            <mosaik-press-button
                #deleteTarget
                part="item-delete"
                [attr.test-id]="deleteTestId()"
                [attr.aria-label]="deleteLabel()"
                [type]="'button'"
                [iconName]="'delete'"
                [appearance]="'plain'"
                [variant]="'danger'"
                [disabled]="!context"
                (pressed)="requestDelete(context)"
            />
        </ng-template>

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
        ExpanderComponent,
        ExpanderGroupComponent,
        SectionComponent,
        SectionContentComponent,
        SectionHeaderComponent,
        IconNameDirective,
        IndicatorComponent,
        LeadingLineComponent,
        ListComponent,
        ListItemComponent,
        PressButtonComponent,
        SegmentComponent,
        SegmentItemComponent,
        NgTemplateOutlet,
        StopEventPropagationDirective,
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

    private readonly _expandedItemKeys = signal<ReadonlySet<unknown>>(new Set());

    private readonly _injector = inject(Injector);

    private readonly _parent = inject(CompoundComponent, { optional: true, skipSelf: true });

    /** Current projected item surface exposed through the signal tour accessor. */
    private readonly _activeItemTarget = viewChild<ElementRef<HTMLElement>>('activeItemTarget');

    /** Built-in add action exposed through the signal tour accessor. */
    private readonly _addTarget = viewChild<ButtonComponent>('addTarget');

    /** Built-in delete control in the single-item layout. */
    private readonly _deleteTarget = viewChild<PressButtonComponent>('deleteTarget');

    /** Stacked panels and their delete controls in item order. */
    private readonly _itemTargets = viewChildren<ExpanderComponent>('itemTarget');
    private readonly _itemDeleteTargets = viewChildren<PressButtonComponent>('itemDeleteTarget');

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

            if (this.isStacked()) {
                this.discardRemovedExpansionKeys();
            }
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

    /** Whether collection navigation and actions are placed beside the heading. */
    public readonly controlsInHeader = input(false);

    /** Whether nested collections display a visual nesting indicator. */
    public readonly showNesting = input(false);

    /** One-based nesting depth of this collection. */
    public readonly level: Signal<number> = computed(() => (this._parent?.level() ?? 0) + 1);

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

    /** The collection layout. The default retains the existing single and list views. */
    public readonly layout = input<CompoundLayoutValue>(CompoundLayout.Paged);

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
    public readonly previousLabel = input('');

    /**
     * Accessible label for the next-item button.
     *
     * @public
     * @readonly
     */
    public readonly nextLabel = input('');

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

    /** Accessible label of the built-in delete action. */
    public readonly deleteLabel = input('Delete item');

    /** Test identifier of the single-view delete action. */
    public readonly deleteTestId = input<string>();

    /** Test identifier of the stacked panel group. */
    public readonly itemsTestId = input<string>();

    /** Resolves a stable test identifier for a stacked item. */
    public readonly itemTestId = input<(item: T, index: number) => string | undefined>();

    /** Resolves a stable test identifier for a stacked item's delete action. */
    public readonly itemDeleteTestId = input<(item: T, index: number) => string | undefined>();

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

    /** Enables the built-in delete action for a visible item. */
    public readonly canDelete = input(false);

    /** Keeps matching stacked panels closed and uneditable. */
    public readonly itemDisabled = input<(item: T, index: number) => boolean>();

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

    /** Emits the item the consumer should delete. The consumer owns the mutation. */
    public readonly deleteRequested = output<ICompoundItemContext<T>>();

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
                COMPOUND_TOUR_TARGETS.delete,
                createTourAccessorTarget(
                    computed(() => {
                        const target = this.isStacked() ? this._itemDeleteTargets()[this.activeIndex()] : this._deleteTarget();

                        return target?.elementRef.nativeElement ?? null;
                    }),
                    undefined,
                    () => this.requestDeleteFromTour(),
                ),
            ],
            [
                COMPOUND_TOUR_TARGETS.expandItem,
                createTourAccessorTarget(
                    computed(() => (this.isStacked() ? (this._itemTargets()[this.activeIndex()]?.elementRef.nativeElement ?? null) : null)),
                    undefined,
                    () => this.expandActiveItemFromTour(),
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

    /** Optional template for each stacked panel heading. */
    protected readonly itemSummaryTemplate = contentChild<CompoundItemSummaryDirective<T>>(CompoundItemSummaryDirective);

    /** Optional template for the status shown alongside each stacked panel heading. */
    protected readonly itemStatusTemplate = contentChild<CompoundItemStatusDirective<T>>(CompoundItemStatusDirective);

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
    protected readonly isListView = computed(() => !this.isStacked() && this.viewMode() === CompoundViewMode.List && this.listItemTemplate() !== undefined);

    /** Whether items use independently expandable panels. */
    protected readonly isStacked = computed(() => this.layout() === CompoundLayout.Stacked);

    /**
     * Indicates whether the built-in view-mode segment can be rendered.
     *
     * @protected
     * @readonly
     */
    protected readonly hasViewModeSwitch = computed(
        () =>
            !this.isStacked() &&
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
    protected readonly hasPrevious = computed(() => !this.isStacked() && this.itemCount() > 0 && this.activeIndex() > 0);

    /**
     * Indicates whether forward navigation is available.
     *
     * @protected
     * @readonly
     */
    protected readonly hasNext = computed(() => !this.isStacked() && this.itemCount() > 0 && this.activeIndex() < this.itemCount() - 1);

    /**
     * Human-readable one-based collection position.
     *
     * @protected
     * @readonly
     */
    protected readonly positionText = computed(() => {
        const count = this.itemCount();

        return this.isStacked() ? String(count) : `${count === 0 ? 0 : this.activeIndex() + 1} / ${count}`;
    });

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
            tourAnchor: (anchorId: string) => (index === this.activeIndex() ? anchorId : ''),
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
            tourAnchor: (anchorId: string) => (index === this.activeIndex() ? anchorId : ''),
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

    /** Whether the consumer has disabled editing for this stacked item. */
    protected isItemDisabled(context: ICompoundItemContext<T>): boolean {
        return this.itemDisabled()?.(context.item, context.index) ?? false;
    }

    /** Whether this stacked panel is open. */
    protected isItemExpanded(context: ICompoundItemContext<T>): boolean {
        return !this.isItemDisabled(context) && this._expandedItemKeys().has(this.resolveItemKey(context));
    }

    /** Updates one panel without closing other editors. */
    protected setItemExpanded(context: ICompoundItemContext<T>, expanded: boolean): void {
        if (!this.currentItemContext(context) || (expanded && this.isItemDisabled(context))) {
            return;
        }

        const key = this.resolveItemKey(context);
        const current = this._expandedItemKeys();

        if (current.has(key) === expanded) {
            return;
        }

        const next = new Set(current);

        if (expanded) {
            next.add(key);
            this.selectedIndex.set(context.index);
        } else {
            next.delete(key);
        }

        this._expandedItemKeys.set(next);
    }

    /** Resolves the optional test identifier for a stacked delete action. */
    protected resolveItemDeleteTestId(context: ICompoundItemContext<T>): string | undefined {
        const itemTestId = this.itemTestId()?.(context.item, context.index);
        const deleteTestId = this.deleteTestId();

        return (
            this.itemDeleteTestId()?.(context.item, context.index) ??
            (itemTestId !== undefined ? `${itemTestId}-delete` : deleteTestId === undefined ? undefined : `${deleteTestId}-${context.index}`)
        );
    }

    /** Emits a delete intent only while the rendered entry is still current. */
    protected requestDelete(context: ICompoundItemContext<T> | null): void {
        if (!context) {
            return;
        }

        const current = this.currentItemContext(context);

        if (this.canDelete() && current) {
            this.deleteRequested.emit(current);
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

    private requestDeleteFromTour(): boolean {
        const context = this.itemContext();

        if (!context || this.isListView() || !this.canDelete()) {
            return false;
        }

        this.requestDelete(context);
        return true;
    }

    private expandActiveItemFromTour(): boolean {
        const context = this.itemContext();

        if (!this.isStacked() || !context || this.isItemDisabled(context)) {
            return false;
        }

        this.setItemExpanded(context, true);
        return true;
    }

    private currentItemContext(context: ICompoundItemContext<T>): ICompoundItemContext<T> | undefined {
        const current = this.listItemContexts()[context.index];

        return current && Object.is(current.item, context.item) ? current : undefined;
    }

    private discardRemovedExpansionKeys(): void {
        const expanded = this._expandedItemKeys();

        if (expanded.size === 0) {
            return;
        }

        const present = new Set(this.listItemContexts().map((context) => this.resolveItemKey(context)));
        const next = new Set([...expanded].filter((key) => present.has(key)));

        if (next.size !== expanded.size) {
            this._expandedItemKeys.set(next);
        }
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
            if (this.isStacked() && (shouldOpenAppendedItem || shouldSelectLastOnGrowth)) {
                const context = this.listItemContexts()[nextSelectedIndex];

                if (context && !this.isItemDisabled(context)) {
                    this._expandedItemKeys.set(new Set([this.resolveItemKey(context)]));
                }
            } else if (shouldOpenAppendedItem) {
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
        const content = this._activeItemTarget()?.nativeElement;
        const root = this.isStacked() ? content?.querySelector('[data-ngp-compound-active]') : content;
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
