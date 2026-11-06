// #region Imports

import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { AvatarComponent, IconComponent, IndicatorComponent, TextComponent, TypographyDirective } from '@pixel-brewery/mosaik-elements-angular';
import { MediaUrlPipe } from '@pixel-brewery/ngpel-core/browser';
import { AuditLogChangeSide } from './AuditLogChangeSide';
import { AuditLogChangeValueFormatterFn } from './AuditLogChangeValueFormatterFn';
import { AuditLogFieldIconResolverFn } from './AuditLogFieldIconResolverFn';
import { AuditLogFieldLabelResolverFn } from './AuditLogFieldLabelResolverFn';
import { IAuditLogChange, IAuditLogChangeGroup } from './IAuditLogChange';

// #endregion

/**
 * Renders the inner content of a single audit log timeline entry.
 *
 * @public
 */
@Component({
    selector: 'ngp-audit-log',
    template: `
        <div class="flex min-w-0 w-full flex-col gap-2">
            <div class="flex min-w-0 flex-row items-center gap-2">
                <mosaik-avatar [text]="actorInitials()" [src]="actorAvatarUrl() | ngpMediaUrl" [size]="'tiny'" [appearance]="'soft'" />
                <div class="flex min-w-0 flex-col gap-0">
                    <div class="flex min-w-0 flex-row flex-wrap items-center gap-1">
                        <mosaik-text [text]="actorName()" [variant]="'primary'" />
                    </div>
                    <div class="flex min-w-0 flex-row items-center gap-1">
                        <mosaik-text [text]="timestamp()" [readonly]="true" />
                    </div>
                </div>
            </div>
            <mosaik-text [text]="actionText()" [readonly]="true" [wrap]="true" />

            @if (primaryChangeGroup(); as primaryGroup) {
                @if (selectedSecondaryChangeGroup(); as secondaryGroup) {
                    <div class="flex flex-1 min-w-0 flex-col gap-3">
                        @if (secondaryChangeGroups().length > 1) {
                            <mosaik-indicator
                                [total]="secondaryChangeGroups().length"
                                [selected]="selectedMergeGroupIndex()"
                                (indicated)="onMergeGroupIndicated($event)"
                            />
                        }

                        <div class="flex flex-1 min-w-0 flex-col gap-2 lg:flex-row lg:items-stretch">
                            <div class="surface-input flex-1">
                                <mosaik-text class="surface-input-text" [text]="mergeBeforeLabel(secondaryGroup)" />
                                @for (change of secondaryGroup.changes; track $index) {
                                    <div class="flex min-w-0 flex-row items-center justify-between gap-2 border-b border-black/5 py-2 last:border-0">
                                        <div class="flex min-w-0 flex-row items-center gap-2 shrink-0">
                                            @if (fieldIcon(); as iconFn) {
                                                <mosaik-icon [icon]="iconFn(change)" [size]="'small'" />
                                            }
                                            <mosaik-text [mosaikTypography]="'caption'" [readonly]="true" [text]="fieldLabel()(change)" />
                                        </div>
                                        <mosaik-text class="min-w-0 text-right" [wrap]="true" [text]="formatChangeValue(change, 'before')" />
                                    </div>
                                }
                            </div>

                            <div class="flex items-center justify-center">
                                <mosaik-icon [icon]="'arrowRight'" [size]="'small'" />
                            </div>

                            <div class="surface-input flex-1">
                                <mosaik-text class="surface-input-text" [text]="mergeAfterLabel(primaryGroup)" />
                                @for (change of primaryGroup.changes; track $index) {
                                    <div class="flex min-w-0 flex-row items-center justify-between gap-2 border-b border-green-600/10 py-2 last:border-0">
                                        <div class="flex min-w-0 flex-row items-center gap-2 shrink-0">
                                            @if (fieldIcon(); as iconFn) {
                                                <mosaik-icon [icon]="iconFn(change)" [size]="'small'" />
                                            }
                                            <mosaik-text [mosaikTypography]="'caption'" [readonly]="true" [text]="fieldLabel()(change)" />
                                        </div>
                                        <mosaik-text class="min-w-0 text-right" [wrap]="true" [text]="formatChangeValue(change, 'after')" />
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                }
            } @else if (changes().length > 0) {
                <div class="flex flex-1 min-w-0 flex-col gap-2 lg:flex-row lg:items-stretch">
                    <div class="surface-input flex-1">
                        <mosaik-text class="surface-input-text" [text]="beforeLabel()" />
                        @for (change of changes(); track $index) {
                            <div class="flex min-w-0 flex-row items-center justify-between gap-2 border-b border-black/5 py-2 last:border-0">
                                <div class="flex min-w-0 flex-row items-center gap-2">
                                    @if (fieldIcon(); as iconFn) {
                                        <mosaik-icon [icon]="iconFn(change)" [size]="'small'" />
                                    }
                                    <mosaik-text [readonly]="true" [text]="fieldLabel()(change)" />
                                </div>
                                <mosaik-text class="min-w-0 text-right" [wrap]="true" [text]="formatChangeValue(change, 'before')" />
                            </div>
                        }
                    </div>

                    <div class="flex items-center justify-center">
                        <mosaik-icon [icon]="'arrowRight'" [size]="'small'" />
                    </div>

                    <div class="surface-input flex-1">
                        <mosaik-text class="surface-input-text" [text]="afterLabel()" />
                        @for (change of changes(); track $index) {
                            <div class="flex min-w-0 flex-row items-center justify-between gap-2 border-b border-green-600/10 py-2 last:border-0">
                                <div class="flex min-w-0 flex-row items-center gap-2">
                                    @if (fieldIcon(); as iconFn) {
                                        <mosaik-icon [icon]="iconFn(change)" [size]="'small'" />
                                    }
                                    <mosaik-text [readonly]="true" [text]="fieldLabel()(change)" />
                                </div>
                                <mosaik-text class="min-w-0 text-right" [variant]="'default'" [wrap]="true" [text]="formatChangeValue(change, 'after')" />
                            </div>
                        }
                    </div>
                </div>
            }
        </div>
    `,
    styles: `
        :host {
            display: block;
            min-width: 0;
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [AvatarComponent, IconComponent, IndicatorComponent, MediaUrlPipe, TextComponent, TypographyDirective],
})
export class AuditLogComponent {
    // #region Properties

    /**
     * Human readable audit action text.
     *
     * @public
     * @readonly
     */
    public readonly actionText = input.required<string>();

    /**
     * Display name of the actor.
     *
     * @public
     * @readonly
     */
    public readonly actorName = input.required<string>();

    /**
     * Avatar initials of the actor.
     *
     * @public
     * @readonly
     */
    public readonly actorInitials = input.required<string>();

    /**
     * Optional actor avatar image URL.
     *
     * @public
     * @readonly
     */
    public readonly actorAvatarUrl = input<string>('');

    /**
     * Formatted timestamp label.
     *
     * @public
     * @readonly
     */
    public readonly timestamp = input.required<string>();

    /**
     * Field changes shown in the before/after state comparison.
     *
     * @public
     * @readonly
     */
    public readonly changes = input<ReadonlyArray<IAuditLogChange>>([]);

    /**
     * Optional primary-side comparison group for merge audit entries.
     *
     * @public
     * @readonly
     */
    public readonly primaryChangeGroup = input<IAuditLogChangeGroup | null>(null);

    /**
     * Optional secondary-side comparison groups for merge audit entries.
     *
     * @public
     * @readonly
     */
    public readonly secondaryChangeGroups = input<ReadonlyArray<IAuditLogChangeGroup>>([]);

    /**
     * Resolves the display label of a field change.
     *
     * @public
     * @readonly
     */
    public readonly fieldLabel = input.required<AuditLogFieldLabelResolverFn>();

    /**
     * Resolves the icon of a field change.
     *
     * @public
     * @readonly
     */
    public readonly fieldIcon = input<AuditLogFieldIconResolverFn>();

    /**
     * Formats a raw before/after value for display.
     *
     * @public
     * @readonly
     */
    public readonly changeValue = input.required<AuditLogChangeValueFormatterFn>();

    /**
     * Label for the previous state section.
     *
     * @public
     * @readonly
     */
    public readonly beforeLabel = input.required<string>();

    /**
     * Label for the new state section.
     *
     * @public
     * @readonly
     */
    public readonly afterLabel = input.required<string>();

    /**
     * Label used when a change side does not contain a value.
     *
     * @public
     * @readonly
     */
    public readonly emptyValueLabel = input.required<string>();

    /**
     * Index of the currently visible secondary merge group.
     *
     * @protected
     * @readonly
     */
    protected readonly selectedMergeGroupIndex = signal(0);

    // #endregion

    // #region Methods

    /**
     * Formats a change value for the requested side.
     *
     * @protected
     * @param change - The field change to render.
     * @param side - The side whose value should be rendered.
     * @returns The formatted value text.
     */
    protected formatChangeValue(change: IAuditLogChange, side: AuditLogChangeSide): string {
        const value = side === 'before' ? change.before : change.after;

        if (value === null || value === undefined || value === '') {
            return this.emptyValueLabel();
        }

        return this.changeValue()(value, change);
    }

    /**
     * Returns the currently selected secondary merge group.
     *
     * @protected
     * @returns The selected secondary group or `null` when none is available.
     */
    protected selectedSecondaryChangeGroup(): IAuditLogChangeGroup | null {
        const groups = this.secondaryChangeGroups();

        if (groups.length === 0) {
            return null;
        }

        return groups[this.clampedSelectedMergeGroupIndex()] ?? groups[0] ?? null;
    }

    /**
     * Handles indicator item selection.
     *
     * @protected
     * @param event - Indicator event payload.
     */
    protected onMergeGroupIndicated(event: unknown): void {
        const index = this.readIndicatorIndex(event);

        if (index === null) {
            return;
        }

        this.selectedMergeGroupIndex.set(this.clampMergeGroupIndex(index));
    }

    /**
     * Builds the before-card label for a merge group.
     *
     * @protected
     * @param group - Selected secondary merge group.
     * @returns Human readable before label.
     */
    protected mergeBeforeLabel(group: IAuditLogChangeGroup): string {
        return `${this.beforeLabel()}: ${group.label}`;
    }

    /**
     * Builds the after-card label for the primary merge group.
     *
     * @protected
     * @param group - Primary merge group.
     * @returns Human readable after label.
     */
    protected mergeAfterLabel(group: IAuditLogChangeGroup): string {
        return `${this.afterLabel()}: ${group.label}`;
    }

    private clampedSelectedMergeGroupIndex(): number {
        return this.clampMergeGroupIndex(this.selectedMergeGroupIndex());
    }

    private clampMergeGroupIndex(index: number): number {
        const groupCount = this.secondaryChangeGroups().length;

        if (groupCount === 0) {
            return 0;
        }

        return Math.min(Math.max(index, 0), groupCount - 1);
    }

    private readIndicatorIndex(event: unknown): number | null {
        if (typeof event === 'number') {
            return event;
        }

        if (!event || typeof event !== 'object') {
            return null;
        }

        const detail = (event as { readonly detail?: unknown }).detail;

        if (detail && typeof detail === 'object') {
            const index = (detail as { readonly index?: unknown }).index;

            return typeof index === 'number' ? index : null;
        }

        const index = (event as { readonly index?: unknown }).index;

        return typeof index === 'number' ? index : null;
    }

    // #endregion
}
