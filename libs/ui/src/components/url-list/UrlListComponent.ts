// #region Imports

import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';
import type { FieldTree } from '@angular/forms/signals';
import {
    AnchorComponent,
    CompoundComponent,
    CompoundItemComponent,
    FormFieldComponent,
    FormFieldDirective,
    FormFieldStateDirective,
    SelectComponent,
    SelectItemComponent,
    TextBoxComponent,
    ToggleSwitchComponent,
} from '@pixel-brewery/mosaik-elements-angular';
import type { IUrlFormData } from './IUrlFormData';
import type { IUrlListLabels } from './IUrlListLabels';

// #endregion

/**
 * Edits categorized web links with caller-owned Signal Forms state, choices and mutations.
 *
 * @public
 */
@Component({
    selector: 'ngp-url-list',
    imports: [
        AnchorComponent,
        CompoundComponent,
        CompoundItemComponent,
        FormFieldComponent,
        FormFieldDirective,
        FormFieldStateDirective,
        SelectComponent,
        SelectItemComponent,
        TextBoxComponent,
        ToggleSwitchComponent,
    ],
    template: `
        <mosaik-compound
            layout="paged"
            viewMode="single"
            [header]="labels().title"
            [description]="labels().description"
            [controlsInHeader]="controlsInHeader()"
            [addLabel]="labels().add"
            [deleteLabel]="labels().remove"
            [previousLabel]="labels().previous"
            [nextLabel]="labels().next"
            [canAdd]="canAdd()"
            [canDelete]="!disabled()"
            [selectLastOnCollectionGrowth]="true"
            (addRequested)="addRequested.emit()"
            (deleteRequested)="removeRequested.emit($event.index)"
            (selectedIndexChanged)="activeIndex.set($event)"
        >
            <span slot="empty" hidden></span>
            @for (item of fields()().value(); track $index; let index = $index) {
                @if (row(index); as field) {
                    <mosaik-compound-item>
                        <div part="fields">
                            <div part="identity">
                                <mosaik-form-field [fieldState]="field.type()">
                                    <mosaik-select
                                        [formField]="field.type"
                                        [label]="labels().type"
                                        [required]="true"
                                        [disabled]="disabled()"
                                        [attr.test-id]="testIdPrefix() + '-type-' + index"
                                    >
                                        @for (option of options(); track option.value) {
                                            <mosaik-select-item
                                                [value]="option.value"
                                                [label]="option.label"
                                                [attr.test-id]="activeIndex() === index ? testIdPrefix() + '-option-' + option.value : null"
                                            />
                                        }
                                    </mosaik-select>
                                </mosaik-form-field>
                                <mosaik-form-field [fieldState]="field.label()">
                                    <mosaik-textbox
                                        [formField]="field.label"
                                        [label]="labels().label"
                                        [disabled]="disabled()"
                                        [attr.test-id]="testIdPrefix() + '-label-' + index"
                                    />
                                </mosaik-form-field>
                            </div>
                            <mosaik-form-field [fieldState]="field.url()">
                                <mosaik-textbox
                                    [formField]="field.url"
                                    [label]="labels().url"
                                    [required]="true"
                                    [disabled]="disabled()"
                                    [attr.test-id]="testIdPrefix() + '-value-' + index"
                                />
                            </mosaik-form-field>
                            @if (field.url().valid()) {
                                @if (webLink(field.url().value()); as href) {
                                    <mosaik-anchor
                                        [href]="href"
                                        [label]="labels().open"
                                        [target]="'_blank'"
                                        [rel]="'noopener noreferrer'"
                                        [attr.test-id]="testIdPrefix() + '-open-' + index"
                                    />
                                }
                            }
                            <mosaik-form-field [fieldState]="field.isPrimary()">
                                <mosaik-toggle-switch
                                    [formField]="field.isPrimary"
                                    [label]="labels().primary"
                                    [disabled]="disabled()"
                                    [attr.test-id]="testIdPrefix() + '-primary-' + index"
                                />
                            </mosaik-form-field>
                            <mosaik-form-field [fieldState]="field.isActive()">
                                <mosaik-toggle-switch
                                    [formField]="field.isActive"
                                    [label]="labels().active"
                                    [disabled]="disabled()"
                                    [attr.test-id]="testIdPrefix() + '-active-' + index"
                                />
                            </mosaik-form-field>
                        </div>
                    </mosaik-compound-item>
                }
            }
        </mosaik-compound>
    `,
    styles: `
        :host {
            display: block;
            min-width: 0;
        }
        [part='fields'],
        [part='identity'] {
            display: grid;
            min-width: 0;
            gap: var(--mosaik-layout-space);
        }
        [part='identity'] {
            grid-template-columns: repeat(auto-fit, minmax(min(100%, 12rem), 1fr));
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UrlListComponent<TCategory extends string = string> {
    // #region Properties

    /** The editable collection owned by the calling feature. */
    public readonly fields = input.required<FieldTree<IUrlFormData<TCategory>[]>>();
    /** Categories available for each URL. */
    public readonly options = input.required<ReadonlyArray<{ readonly value: TCategory; readonly label: string }>>();
    /** Translated presentation text supplied by the caller. */
    public readonly labels = input.required<IUrlListLabels>();
    /** Places collection actions in the heading instead of beneath the active URL. */
    public readonly controlsInHeader = input(false);
    /** Disables editing and collection mutations. Valid links can still be opened. */
    public readonly disabled = input(false);
    /** Optional collection limit for the add action. */
    public readonly maximumItems = input<number | null>(null);
    /** Prefix for automation hooks. */
    public readonly testIdPrefix = input('url-list');
    /** Requests an additional row from the caller. */
    public readonly addRequested = output<void>();
    /** Requests removal of one row by index. */
    public readonly removeRequested = output<number>();

    /** Keeps category option automation hooks on the active editor. */
    protected readonly activeIndex = signal(0);

    protected readonly canAdd = computed(() => {
        const limit = this.maximumItems();
        return !this.disabled() && (limit === null || this.fields()().value().length < limit);
    });

    // #endregion

    // #region Methods

    protected row(index: number): (FieldTree<IUrlFormData<TCategory>, number> & { readonly type: FieldTree<string, string> }) | undefined {
        // Angular's Subfields type cannot resolve whether a generic property is a function.
        // TCategory is constrained to string, so the row always has the category field.
        return this.fields()[index] as (FieldTree<IUrlFormData<TCategory>, number> & { readonly type: FieldTree<string, string> }) | undefined;
    }

    protected webLink(value: string): string | null {
        const href = value.trim();
        if (!/^https?:\/\//iu.test(href)) {
            return null;
        }
        try {
            const url = new URL(href);
            return url.hostname ? href : null;
        } catch {
            return null;
        }
    }

    // #endregion
}
