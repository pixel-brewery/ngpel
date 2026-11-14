// #region Imports

import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, DestroyRef, ElementRef, ErrorHandler, inject, input, output, viewChild } from '@angular/core';
import {
    IconNameDirective,
    MenuComponent,
    MenuItemComponent,
    MenuItemGroupComponent,
    PopupComponent,
    TextComponent,
} from '@pixel-brewery/mosaik-elements-angular';
import type { ITextSuggestionMessages } from '../../directives/input-suggestions/ITextSuggestionMessages';
import type { ITextSuggestionOption } from '../../directives/input-suggestions/ITextSuggestionOption';
import type { ITextSuggestionMenuState } from './ITextSuggestionMenuState';

// #endregion

/** Internal popup that keeps keyboard focus in the editable input. */
@Component({
    selector: 'ngp-text-suggestion-menu',
    imports: [IconNameDirective, MenuComponent, MenuItemComponent, MenuItemGroupComponent, NgTemplateOutlet, PopupComponent, TextComponent],
    template: `
        <mosaik-popup
            part="popup"
            role="presentation"
            tabindex="-1"
            [trigger]="'manual'"
            [placement]="'bottom-start'"
            [placements]="['bottom-start', 'top-start', 'bottom-end', 'top-end']"
            [interactive]="true"
            [flip]="true"
            [shift]="true"
            [trapFocus]="false"
            [closeOnScroll]="false"
            [hasBackdrop]="false"
            [pressEscapeToClose]="false"
            [clickOutsideToClose]="false"
        >
            <div part="surface" slot="content" class="surface" (pointerdown)="preserveInputFocus($event)">
                @if (state().loading) {
                    <mosaik-text part="loading" role="status" [text]="messages().loading" [wrap]="true" />
                } @else if (state().error) {
                    <mosaik-text part="error" role="status" [text]="messages().error" [wrap]="true" />
                } @else if (state().items.length === 0) {
                    <mosaik-text part="empty" role="status" [text]="messages().empty" [wrap]="true" />
                }

                <mosaik-menu #listbox part="listbox" role="listbox" [attr.id]="menuId()" [attr.aria-label]="messages().label">
                    @for (group of groups(); track group.key) {
                        @if (group.label) {
                            <mosaik-menu-item-group
                                part="suggestion-group"
                                role="group"
                                [header]="group.label"
                                [attr.aria-label]="group.label"
                                [attr.test-id]="'text-suggestion-group-' + group.key"
                            >
                                <ng-container [ngTemplateOutlet]="options" [ngTemplateOutletContext]="{ $implicit: group.entries }" />
                            </mosaik-menu-item-group>
                        } @else {
                            <ng-container [ngTemplateOutlet]="options" [ngTemplateOutletContext]="{ $implicit: group.entries }" />
                        }
                    }
                </mosaik-menu>

                <ng-template #options let-entries>
                    @for (entry of entries; track entry.item.id) {
                        <mosaik-menu-item
                            part="option"
                            role="option"
                            tabindex="-1"
                            [attr.id]="menuId() + '-option-' + entry.index"
                            [attr.test-id]="'text-suggestion-' + entry.item.id"
                            [attr.aria-selected]="entry.index === state().selectedIndex"
                            [attr.data-ngp-mention-tone]="entry.item.tone ?? null"
                            [label]="entry.item.label"
                            [iconName]="entry.item.icon ?? ''"
                            [variant]="entry.item.tone"
                            [appearance]="entry.index === state().selectedIndex ? 'soft' : 'plain'"
                            (activated)="selected.emit(entry.index)"
                        >
                            @if (entry.item.description; as description) {
                                <mosaik-text slot="subLabel" [text]="description" [wrap]="true" />
                            }
                        </mosaik-menu-item>
                    }
                </ng-template>

                @if (attribution(); as credit) {
                    <mosaik-text part="attribution" class="attribution" [text]="credit" [wrap]="true" translate="no" />
                }
            </div>
        </mosaik-popup>
    `,
    styles: `
        .surface {
            inline-size: min(24rem, calc(100vw - 1rem));
            max-block-size: 18rem;
            overflow-y: auto;
            overflow-wrap: anywhere;
            touch-action: pan-y;
        }

        [part='loading'],
        [part='empty'],
        [part='error'],
        .attribution {
            display: block;
            padding: 0.375rem 0.625rem;
        }

        .attribution {
            text-align: end;
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextSuggestionMenuComponent {
    // #region Fields

    private readonly _destroyRef = inject(DestroyRef);
    private readonly _errorHandler = inject(ErrorHandler);
    private readonly _popup = viewChild(PopupComponent);
    private readonly _listbox = viewChild<unknown, ElementRef<HTMLElement>>('listbox', { read: ElementRef });
    private _anchor: HTMLElement | null = null;
    private _transition = Promise.resolve();

    // #endregion

    // #region Properties

    public readonly state = input.required<ITextSuggestionMenuState>();
    public readonly messages = input.required<ITextSuggestionMessages>();
    public readonly menuId = input.required<string>();
    public readonly attribution = input<string | null>(null);
    public readonly selected = output<number>();

    protected readonly groups = computed(() => {
        const groups = new Map<string | null, { key: string | null; label?: string; entries: Array<{ item: ITextSuggestionOption; index: number }> }>();

        this.state().items.forEach((item, index) => {
            const key = item.group?.key ?? null;
            let group = groups.get(key);

            if (!group) {
                group = { key, label: item.group?.label, entries: [] };
                groups.set(key, group);
            }

            group.entries.push({ item, index });
        });

        return [...groups.values()];
    });

    // #endregion

    // #region Methods

    public open(anchor: HTMLElement): void {
        if (this._anchor === anchor) {
            return;
        }

        this._anchor = anchor;
        this.enqueue(async () => {
            const popup = this._popup();

            if (popup && this._anchor === anchor && anchor.isConnected) {
                popup.invoke('attach', anchor);
                await popup.invoke('open');
            }
        });
    }

    public close(): void {
        const anchor = this._anchor;
        this._anchor = null;

        if (!anchor) {
            return;
        }

        this.enqueue(async () => {
            if (this._anchor) {
                return;
            }

            const document = anchor.ownerDocument;
            const destination = this.activeElement(document);
            await this._popup()?.invoke('close');

            // Older Mosaik popups restore the anchor even after the user has tabbed away.
            if (!this._destroyRef.destroyed && !this._anchor && document.activeElement === anchor && destination !== this.activeElement(document)) {
                if (destination?.isConnected && destination !== document.body) {
                    destination.focus({ preventScroll: true });
                } else {
                    this.activeElement(document)?.blur();
                }
            }
        });
    }

    public listboxElement(): HTMLElement | null {
        return this._listbox()?.nativeElement ?? null;
    }

    public optionElement(index: number): HTMLElement | null {
        return this.listboxElement()?.querySelector<HTMLElement>(`[role="option"][id="${this.menuId()}-option-${index}"]`) ?? null;
    }

    protected preserveInputFocus(event: PointerEvent): void {
        event.preventDefault();
    }

    private enqueue(operation: () => Promise<void>): void {
        this._transition = this._transition
            .then(async () => {
                if (!this._destroyRef.destroyed) {
                    await operation();
                }
            })
            .catch((reason: unknown) => this._errorHandler.handleError(reason));
    }

    private activeElement(document: Document): HTMLElement | null {
        let element = document.activeElement;

        while (element?.shadowRoot?.activeElement) {
            element = element.shadowRoot.activeElement;
        }

        return element instanceof HTMLElement ? element : null;
    }

    // #endregion
}
