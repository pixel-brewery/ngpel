// #region Imports

import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { AnchorComponent, BannerComponent, BannerSubHeaderComponent, ButtonComponent } from '@pixel-brewery/mosaik-elements-angular';

// #endregion

/**
 * Requests an explicit agreement without owning its content, persistence or protected action.
 *
 * @public
 */
@Component({
    selector: 'ngp-agreement-gate',
    template: `
        <div part="root" class="flex flex-col gap-2">
            <mosaik-banner
                part="notice"
                [isOpen]="true"
                [variant]="'info'"
                [appearance]="'soft'"
                [orientation]="'vertical'"
                [horizontalContentAlignment]="'left'"
                [icon]="'info'"
                [iconSize]="'small'"
                [header]="title()"
            >
                <mosaik-banner-sub-header slot="subHeader" part="description" [text]="description()" [variant]="'info'" />
                <mosaik-anchor
                    slot="subHeader"
                    part="link"
                    class="block"
                    [attr.data-ngp-part]="'agreement-gate-link'"
                    [attr.test-id]="'agreement-gate-link'"
                    [href]="safeUrl()"
                    [label]="linkLabel()"
                    [variant]="'info'"
                    [target]="'_blank'"
                    [rel]="'noopener noreferrer'"
                />
                <mosaik-button
                    slot="actions"
                    part="submit"
                    [attr.data-ngp-part]="'agreement-gate-accept'"
                    [attr.test-id]="'agreement-gate-accept'"
                    [label]="actionLabel()"
                    [appearance]="'solid'"
                    [variant]="'primary'"
                    [isBusy]="isBusy()"
                    [disabled]="isBusy()"
                    (click)="requestAcceptance()"
                />
            </mosaik-banner>
            @if (errorText(); as error) {
                <mosaik-banner
                    part="error"
                    [attr.data-ngp-part]="'agreement-gate-error'"
                    [attr.test-id]="'agreement-gate-error'"
                    [isOpen]="true"
                    [variant]="'danger'"
                    [subHeader]="error"
                />
            }
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: { class: 'block min-w-0' },
    imports: [AnchorComponent, BannerComponent, BannerSubHeaderComponent, ButtonComponent],
})
export class AgreementGateComponent {
    // #region Properties

    public readonly title = input.required<string>();
    public readonly description = input.required<string>();
    public readonly url = input.required<string>();
    public readonly linkLabel = input.required<string>();
    public readonly actionLabel = input.required<string>();
    public readonly isBusy = input(false);
    public readonly errorText = input<string | null>(null);
    public readonly accepted = output<void>();

    protected readonly safeUrl = computed(() => {
        const target = this.url().trim();
        if (target.startsWith('/') && !/^[/\\]{2}/u.test(target)) {
            return target;
        }
        try {
            const url = new URL(target);
            return url.protocol === 'http:' || url.protocol === 'https:' ? url.href : undefined;
        } catch {
            return undefined;
        }
    });

    // #endregion

    // #region Methods

    /**
     * Emits an explicit acceptance request while idle; the host remains responsible for saving it.
     *
     * @public
     */
    public requestAcceptance(): void {
        if (!this.isBusy()) this.accepted.emit();
    }

    // #endregion
}
