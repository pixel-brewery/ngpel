import { DOCUMENT } from '@angular/common';
import { Directive, HostListener, computed, inject, input, output, signal } from '@angular/core';

export interface IEyeDropperColorChange {
    readonly color: string;
}

export interface IEyeDropperError {
    readonly error: unknown;
    readonly reason: 'not-supported' | 'not-allowed' | 'already-open' | 'aborted' | 'unknown';
}

interface IEyeDropperResult {
    readonly sRGBHex: string;
}

interface IEyeDropper {
    open(): Promise<IEyeDropperResult>;
}

interface IEyeDropperConstructor {
    new (): IEyeDropper;
}

type EyeDropperWindow = Window & {
    readonly EyeDropper?: IEyeDropperConstructor;
};

@Directive({
    selector: 'mosaik-button[ngpEyeDropper]',
    standalone: true,
    exportAs: 'eyeDropper',
})
export class EyeDropperDirective {
    private readonly document = inject(DOCUMENT);

    public readonly disabled = input(false);

    public readonly colorChange = output<IEyeDropperColorChange>();
    public readonly unsupported = output<void>();
    public readonly failed = output<IEyeDropperError>();
    public readonly canceled = output<void>();

    public readonly isOpen = signal(false);

    public readonly isSupported = computed(() => {
        const defaultView = this.document.defaultView as EyeDropperWindow | null;

        return !!defaultView?.EyeDropper;
    });

    @HostListener('click', ['$event'])
    public async onClick(event: MouseEvent): Promise<void> {
        event.preventDefault();

        if (this.disabled() || this.isOpen()) {
            return;
        }

        const defaultView = this.document.defaultView as EyeDropperWindow | null;
        const EyeDropper = defaultView?.EyeDropper;

        if (!EyeDropper) {
            this.unsupported.emit();
            this.failed.emit({
                error: new Error('EyeDropper API is not supported in this browser.'),
                reason: 'not-supported',
            });

            return;
        }

        this.isOpen.set(true);

        try {
            const eyeDropper = new EyeDropper();
            const result = await eyeDropper.open();

            if (!result?.sRGBHex) {
                return;
            }

            this.colorChange.emit({
                color: result.sRGBHex,
            });
        } catch (error) {
            const reason = this.getErrorReason(error);

            if (reason === 'aborted') {
                this.canceled.emit();
                return;
            }

            this.failed.emit({
                error,
                reason,
            });
        } finally {
            this.isOpen.set(false);
        }
    }

    private getErrorReason(error: unknown): IEyeDropperError['reason'] {
        if (!(error instanceof DOMException)) {
            return 'unknown';
        }

        switch (error.name) {
            case 'NotAllowedError':
                return 'not-allowed';

            case 'InvalidStateError':
                return 'already-open';

            case 'AbortError':
                return 'aborted';

            default:
                return 'unknown';
        }
    }
}
