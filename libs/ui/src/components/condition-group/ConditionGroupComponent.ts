import { ChangeDetectionStrategy, Component, computed, inject, input, output } from '@angular/core';
import {
    DropDownButtonComponent,
    IconNameDirective,
    MenuComponent,
    MenuItemComponent,
    PressButtonComponent,
    SegmentComponent,
    SegmentItemComponent,
} from '@pixel-brewery/mosaik-elements-angular';
import { LeadingLineComponent } from '../leading-line/LeadingLineComponent';

/**
 * Composes the shared And/Or group toolbar from the advanced list filters with projected domain conditions.
 * The consumer owns its rule model, allowed operations and evaluation; nested groups reuse the common leading line.
 *
 * @public
 */
@Component({
    selector: 'ngp-condition-group',
    template: `
        <div part="root" class="flex min-w-0 gap-2.5">
            @if (showLeadingLine() && level() > 1) {
                <ngp-leading-line [level]="level()" />
            }
            <div part="group" class="flex min-w-0 flex-1 flex-col gap-3">
                <div
                    part="toolbar"
                    class="relative z-1 flex min-w-0 items-center"
                    [class.gap-1]="!inlineActions()"
                    [class.py-0.5]="!inlineActions()"
                    [class.gap-2]="inlineActions()"
                    [class.py-1]="inlineActions()"
                >
                    <mosaik-segment
                        class="shrink-0"
                        [class]="inlineActions() ? 'w-40' : 'w-[9.5rem]'"
                        [appearance]="'soft'"
                        [attr.aria-label]="conditionLabel()"
                        [attr.data-ngp-part]="testIdPrefix() + '-condition'"
                        [attr.test-id]="testIdPrefix() + '-condition'"
                    >
                        @if (allowConditionChange() || condition() === 'and') {
                            <mosaik-segment-item
                                [label]="andLabel()"
                                [isChecked]="condition() === 'and'"
                                [disabled]="disabled()"
                                [attr.data-ngp-part]="testIdPrefix() + '-and'"
                                [attr.test-id]="testIdPrefix() + '-and'"
                                (checked)="setCondition('and')"
                            />
                        }
                        @if (allowConditionChange() || condition() === 'or') {
                            <mosaik-segment-item
                                [label]="orLabel()"
                                [isChecked]="condition() === 'or'"
                                [disabled]="disabled()"
                                [attr.data-ngp-part]="testIdPrefix() + '-or'"
                                [attr.test-id]="testIdPrefix() + '-or'"
                                (checked)="setCondition('or')"
                            />
                        }
                    </mosaik-segment>
                    <div class="flex min-w-0 items-center gap-1 overflow-hidden" [class.flex-1]="!inlineActions()">
                        @if (canAddRule() || canAddGroup()) {
                            <mosaik-dropdown-button
                                [iconName]="'add'"
                                [caretVisible]="false"
                                [disabled]="disabled()"
                                [dropDownPlacement]="'bottom-end'"
                                [attr.aria-label]="canAddRule() ? addRuleLabel() : addGroupLabel()"
                                [attr.data-ngp-part]="testIdPrefix() + '-add'"
                                [attr.test-id]="testIdPrefix() + '-add'"
                            >
                                <mosaik-menu>
                                    @if (canAddRule()) {
                                        <mosaik-menu-item
                                            [label]="addRuleLabel()"
                                            [disabled]="disabled()"
                                            [attr.data-ngp-part]="testIdPrefix() + '-add-rule'"
                                            [attr.test-id]="testIdPrefix() + '-add-rule'"
                                            (click)="!disabled() && addRuleRequested.emit()"
                                        />
                                    }
                                    @if (canAddGroup()) {
                                        <mosaik-menu-item
                                            [label]="addGroupLabel()"
                                            [disabled]="disabled()"
                                            [attr.data-ngp-part]="testIdPrefix() + '-add-group'"
                                            [attr.test-id]="testIdPrefix() + '-add-group'"
                                            (click)="!disabled() && addGroupRequested.emit()"
                                        />
                                    }
                                </mosaik-menu>
                            </mosaik-dropdown-button>
                        }
                    </div>
                    @if (canRemove()) {
                        <mosaik-press-button
                            [appearance]="'plain'"
                            [variant]="removeVariant()"
                            [iconName]="'delete'"
                            [disabled]="disabled()"
                            [attr.title]="removeLabel()"
                            [attr.aria-label]="removeLabel()"
                            [attr.data-ngp-part]="testIdPrefix() + '-remove'"
                            [attr.test-id]="testIdPrefix() + '-remove'"
                            (pressed)="!disabled() && removeRequested.emit()"
                        />
                    }
                </div>
                <ng-content />
            </div>
        </div>
    `,
    styles: [':host { display: block; min-width: 0; }'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        DropDownButtonComponent,
        IconNameDirective,
        MenuComponent,
        MenuItemComponent,
        PressButtonComponent,
        SegmentComponent,
        SegmentItemComponent,
        LeadingLineComponent,
    ],
})
export class ConditionGroupComponent {
    private readonly _parent = inject(ConditionGroupComponent, { optional: true, skipSelf: true });

    public readonly condition = input.required<'and' | 'or'>();
    public readonly allowConditionChange = input(true);
    public readonly disabled = input(false);
    public readonly canAddRule = input(true);
    public readonly canAddGroup = input(true);
    public readonly canRemove = input(false);
    /** Keeps actions beside the condition selector. */
    public readonly inlineActions = input(false);
    /** Shows the leading line for nested groups. Disable when the consumer draws its own tree. */
    public readonly showLeadingLine = input(true);
    public readonly removeVariant = input<'primary' | 'danger'>('danger');
    public readonly andLabel = input.required<string>();
    public readonly orLabel = input.required<string>();
    /** Accessible name of the condition selector. */
    public readonly conditionLabel = input<string>();
    public readonly addRuleLabel = input('');
    public readonly addGroupLabel = input('');
    public readonly removeLabel = input('');
    public readonly testIdPrefix = input('condition-group');

    public readonly conditionChanged = output<'and' | 'or'>();
    public readonly addRuleRequested = output<void>();
    public readonly addGroupRequested = output<void>();
    public readonly removeRequested = output<void>();

    protected readonly level = computed((): number => (this._parent?.level() ?? 0) + 1);

    /** Applies an allowed change without making a fixed domain conjunction editable. */
    protected setCondition(value: 'and' | 'or'): void {
        if (!this.disabled() && this.allowConditionChange() && value !== this.condition()) {
            this.conditionChanged.emit(value);
        }
    }
}
