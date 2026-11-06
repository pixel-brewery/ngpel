// #region Imports

import { ChangeDetectionStrategy, Component, computed, contentChildren, effect, ElementRef, input, signal, untracked, viewChild } from '@angular/core';
import {
    ButtonComponent,
    DividerComponent,
    DropDownButtonComponent,
    IconNameDirective,
    MenuComponent,
    MenuItemComponent,
    ToggleButtonComponent,
    ToolbarComponent,
    TooltipDirective,
} from '@pixel-brewery/mosaik-elements-angular';
import { CommandDirective } from '@pixel-brewery/ngpel-mvp';
import { compactViewportSignal } from '../navigation/compactViewportSignal';

// #endregion

interface IToolbarAction {
    readonly element: HTMLElement;
    readonly control: ButtonComponent | ToggleButtonComponent;
    readonly checked?: () => boolean | undefined;
}

interface IToolbarOverflow {
    readonly start: ReadonlyArray<IToolbarAction>;
    readonly end: ReadonlyArray<IToolbarAction>;
    readonly startDividers: ReadonlyArray<HTMLElement>;
    readonly endDividers: ReadonlyArray<HTMLElement>;
}

/**
 * Hosts a Mosaik page toolbar. In compact mode secondary start actions and end actions that
 * overflow appear in a menu. A menu choice activates the original projected control.
 *
 * Apply `data-ngp-toolbar-keep` to keep a slotted button visible. The primary start button and
 * link buttons stay visible automatically.
 *
 * @public
 */
@Component({
    selector: 'ngp-page-toolbar',
    imports: [DropDownButtonComponent, IconNameDirective, MenuComponent, MenuItemComponent, ToolbarComponent],
    template: `
        <div part="root" class="border-y border-(--mosaik-scheme-highlight)">
            <mosaik-toolbar #toolbar part="toolbar" role="toolbar" [attr.aria-label]="ariaLabel()" [appearance]="'plain'" [fit]="'width'">
                <ng-content />
                @if (isCompact()) {
                    <mosaik-dropdown-button
                        #more
                        part="overflow"
                        slot="end"
                        [attr.aria-label]="moreActionsLabel()"
                        [label]="moreActionsLabel()"
                        [iconName]="'more-horizontal'"
                        [caretVisible]="false"
                        [appearance]="'plain'"
                        [dropDownPlacement]="'bottom-end'"
                    >
                        <mosaik-menu>
                            @for (action of overflowActions(); track action.element) {
                                <mosaik-menu-item
                                    part="overflow-action"
                                    [label]="action.label"
                                    [icon]="action.icon"
                                    [disabled]="action.disabled"
                                    [isChecked]="action.checked"
                                    [attr.test-id]="action.testId"
                                    (activated)="activate(action.element, more)"
                                />
                            }
                        </mosaik-menu>
                    </mosaik-dropdown-button>
                }
            </mosaik-toolbar>
        </div>
    `,
    styles: `
        :host {
            display: block;
        }
        mosaik-dropdown-button[part='overflow'] {
            flex: none;
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'block min-w-0',
        slot: 'preContent',
    },
})
export class PageToolbarComponent {
    // #region Fields

    private readonly _compactViewport = compactViewportSignal();
    private readonly _toolbar = viewChild('toolbar', { read: ElementRef<HTMLElement> });
    private readonly _more = viewChild('more', { read: ElementRef<HTMLElement> });
    private readonly _buttons = contentChildren(ButtonComponent, { descendants: true });
    private readonly _toggles = contentChildren(ToggleButtonComponent, { descendants: true });
    private readonly _dividers = contentChildren(DividerComponent, { descendants: true, read: ElementRef<HTMLElement> });
    private readonly _tooltips = contentChildren(TooltipDirective, { descendants: true });
    private readonly _tooltipElements = contentChildren(TooltipDirective, { descendants: true, read: ElementRef<HTMLElement> });
    private readonly _tooltipsByElement = computed(
        () => new Map(this._tooltipElements().map((element, index) => [element.nativeElement, this._tooltips()[index]])),
    );
    private readonly _commands = contentChildren(CommandDirective, { descendants: true });
    private readonly _commandElements = contentChildren(CommandDirective, { descendants: true, read: ElementRef<HTMLElement> });
    private readonly _commandsByElement = computed(
        () => new Map(this._commandElements().map((element, index) => [element.nativeElement, this._commands()[index]])),
    );
    private readonly _overflow = signal<ReadonlyArray<IToolbarAction>>([]);
    private readonly _attributesChanged = signal(0);
    private readonly _display = new Map<HTMLElement, { readonly value: string; readonly priority: string }>();

    // #endregion

    // #region Ctor

    /** Observes projected controls and reconciles the compact overflow layout. */
    public constructor() {
        effect((onCleanup) => {
            const toolbar = this._toolbar()?.nativeElement;
            const more = this._more()?.nativeElement;
            const buttons = this._buttons();
            const toggles = this._toggles();
            const dividers = this._dividers().map((divider) => divider.nativeElement);
            this._tooltipsByElement();
            this._attributesChanged();
            if (!this.isCompact() || !toolbar || !more) {
                untracked(() => {
                    this.restoreDisplay();
                    this._overflow.set([]);
                });
                return;
            }

            const actions: IToolbarAction[] = [
                ...buttons.map((control) => ({ element: control.elementRef.nativeElement, control })),
                ...toggles.map((control) => ({ element: control.elementRef.nativeElement, control, checked: control.isChecked })),
            ].filter(({ element }) => element.parentElement === toolbar);
            for (const action of actions) {
                this.actionLabel(action);
                action.control.variant();
                if ('href' in action.control) {
                    action.control.href();
                }
            }
            const view = toolbar.ownerDocument.defaultView;
            let frame: number | undefined;
            const measure = (): void => this.measure(toolbar, more, actions, dividers);
            const schedule = (): void => {
                if (!view?.requestAnimationFrame) {
                    untracked(measure);
                    return;
                }
                frame ??= view.requestAnimationFrame(() => {
                    frame = undefined;
                    measure();
                });
            };
            const resize = view?.ResizeObserver ? new view.ResizeObserver(schedule) : undefined;
            resize?.observe(toolbar);
            resize?.observe(more);
            const mutations = view?.MutationObserver ? new view.MutationObserver(() => this._attributesChanged.update((value) => value + 1)) : undefined;
            for (const { element } of actions) {
                resize?.observe(element);
                mutations?.observe(element, {
                    attributes: true,
                    attributeFilter: ['aria-label', 'disabled', 'hidden', 'icon', 'slot', 'data-ngp-toolbar-keep', 'is-checked', 'test-id'],
                });
            }
            schedule();
            onCleanup(() => {
                resize?.disconnect();
                mutations?.disconnect();
                if (frame !== undefined) {
                    view?.cancelAnimationFrame(frame);
                }
                this.restoreDisplay();
            });
        });
    }

    // #endregion

    // #region Properties

    /**
     * Accessible name that describes the actions offered by the toolbar.
     *
     * @public
     * @readonly
     */
    public readonly ariaLabel = input.required<string>();

    /** Overrides the compact breakpoint. Leave it unset to follow the application's breakpoints. */
    public readonly compact = input<boolean | null>(null);

    /** Accessible label of the menu for overflow actions. */
    public readonly moreActionsLabel = input('More actions');

    /** Whether the toolbar currently uses its compact layout. */
    public readonly isCompact = computed(() => this.compact() ?? this._compactViewport());

    protected readonly overflowActions = computed(() => {
        this._attributesChanged();
        return this._overflow().map((action) => {
            const icon = (action.element as HTMLElement & { readonly icon?: ReturnType<MenuItemComponent['icon']> }).icon;
            const testId = action.element.getAttribute('test-id');
            return {
                element: action.element,
                label: this.actionLabel(action),
                icon,
                disabled: this.isDisabled(action),
                checked: action.checked?.() ?? false,
                testId: testId ? `${testId}-menu-item` : null,
            };
        });
    });

    // #endregion

    // #region Methods

    protected activate(element: HTMLElement, menu: DropDownButtonComponent): void {
        const action = this._overflow().find((candidate) => candidate.element === element);
        if (action && element.parentElement === this._toolbar()?.nativeElement && !this.isDisabled(action)) {
            element.click();
            menu.invoke('close');
        }
    }

    private measure(toolbar: HTMLElement, more: HTMLElement, actions: ReadonlyArray<IToolbarAction>, dividers: ReadonlyArray<HTMLElement>): void {
        this.restoreDisplay();
        const layout = this.group(toolbar, actions, dividers);
        const overflow = [...layout.start];
        for (const { element } of layout.start) {
            this.hide(element);
        }
        if (layout.start.length) {
            layout.startDividers.forEach((element) => this.hide(element));
        } else {
            this.hide(more);
        }

        const overflows = (): boolean => toolbar.scrollWidth > toolbar.clientWidth + 1;
        if (overflows() && layout.end.length) {
            this.restore(more);
            layout.endDividers.forEach((element) => this.hide(element));
            for (const action of layout.end) {
                if (!overflows()) {
                    break;
                }
                this.hide(action.element);
                overflow.push(action);
            }
        }
        if (!overflow.length) {
            this.hide(more);
            layout.endDividers.forEach((element) => this.restore(element));
        }
        this._overflow.set(overflow);
    }

    private group(toolbar: HTMLElement, actions: ReadonlyArray<IToolbarAction>, dividers: ReadonlyArray<HTMLElement>): IToolbarOverflow {
        const byElement = new Map(actions.map((action) => [action.element, action]));
        const ordered = Array.from(toolbar.children)
            .flatMap((element) => byElement.get(element as HTMLElement) ?? [])
            .filter(({ element }) => !element.hidden && element.style.display !== 'none');
        const start = ordered.filter(({ element }) => element.getAttribute('slot') === 'start');
        const primary = start.find((action) => !action.checked && action.control.variant() === 'primary');
        const canMove = (action: IToolbarAction): boolean => {
            const { element, control } = action;
            const link = 'href' in control ? control.href() : undefined;
            return !link && !element.hasAttribute('data-ngp-toolbar-keep') && Boolean(this.actionLabel(action));
        };

        return {
            start: start.filter((action) => action !== primary && canMove(action)),
            end: ordered.filter((action) => action.element.getAttribute('slot') === 'end' && canMove(action)),
            startDividers: dividers.filter((element) => element.parentElement === toolbar && element.getAttribute('slot') === 'start'),
            endDividers: dividers.filter((element) => element.parentElement === toolbar && element.getAttribute('slot') === 'end'),
        };
    }

    private actionLabel({ element, control }: IToolbarAction): string {
        const tooltip = this._tooltipsByElement().get(element)?.config;
        const tooltipText = typeof tooltip === 'string' ? tooltip : tooltip?.content;
        return tooltipText?.trim() || element.getAttribute('aria-label')?.trim() || control.label()?.trim() || '';
    }

    private isDisabled(action: IToolbarAction): boolean {
        const command = this._commandsByElement().get(action.element)?.command()['click'];
        return Boolean(action.control.disabled() || action.control.isBusy() || action.element.hasAttribute('disabled') || command?.canExecute() === false);
    }

    private hide(element: HTMLElement): void {
        if (!this._display.has(element)) {
            this._display.set(element, { value: element.style.getPropertyValue('display'), priority: element.style.getPropertyPriority('display') });
        }
        element.style.setProperty('display', 'none', 'important');
    }

    private restore(element: HTMLElement): void {
        const display = this._display.get(element);
        if (display) {
            element.style.setProperty('display', display.value, display.priority);
            this._display.delete(element);
        }
    }

    private restoreDisplay(): void {
        for (const element of this._display.keys()) {
            this.restore(element);
        }
    }

    // #endregion
}
