// #region Imports

import { ChangeDetectionStrategy, Component, input, output, type InputSignal, type OutputEmitterRef } from '@angular/core';
import type { Appearance, Variant } from '@pixel-brewery/mosaik-elements-foundation';
import { FileSourceType } from './FileSourceType';
import type { FileSourceTypeValue } from './FileSourceTypeValue';

// #endregion

/**
 * Declares one headless acquisition source rendered by a parent {@link FilesComponent}.
 *
 * @public
 */
@Component({
    selector: 'ngp-file-source',
    template: '',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        hidden: 'true',
    },
})
export class FileSourceComponent {
    // #region Fields
    // #endregion

    // #region Ctor
    // #endregion

    // #region Properties

    /** Stable key used to identify the source. */
    public readonly key: InputSignal<string> = input.required<string>();

    /** Acquisition mechanism provided by the source. */
    public readonly type: InputSignal<FileSourceTypeValue> = input<FileSourceTypeValue>(FileSourceType.Action);

    /** Visible action label. */
    public readonly label: InputSignal<string> = input.required<string>();

    /** Mosaik icon rendered with the action. */
    public readonly iconName: InputSignal<string> = input<string>('attach');

    /** Optional explanatory copy rendered below the action. */
    public readonly description: InputSignal<null | string> = input<null | string>(null);

    /** Accepted file extensions or MIME patterns for picker sources. */
    public readonly accept: InputSignal<ReadonlyArray<string>> = input<ReadonlyArray<string>>([]);

    /** Whether one picker interaction may select multiple files. */
    public readonly multiple: InputSignal<boolean> = input<boolean>(false);

    /** Whether a picker source may select directories. */
    public readonly directory: InputSignal<boolean> = input<boolean>(false);

    /** Whether dropped files are routed to this picker source. */
    public readonly dropEnabled: InputSignal<boolean> = input<boolean>(false);

    /** Whether the source rejects user interactions. */
    public readonly disabled: InputSignal<boolean> = input<boolean>(false);

    /** Whether the source currently performs an operation. */
    public readonly busy: InputSignal<boolean> = input<boolean>(false);

    /** Visual appearance of the rendered source action. */
    public readonly appearance: InputSignal<Appearance> = input<Appearance>('outline');

    /** Visual variant of the rendered source action. */
    public readonly variant: InputSignal<Variant> = input<Variant>('primary');

    /** Emits when an action source is invoked. */
    public readonly requested: OutputEmitterRef<void> = output<void>();

    /** Emits files accepted by a picker source. */
    public readonly filesSelected: OutputEmitterRef<ReadonlyArray<File>> = output<ReadonlyArray<File>>();

    /** Emits files rejected by a picker source. */
    public readonly filesRejected: OutputEmitterRef<ReadonlyArray<File>> = output<ReadonlyArray<File>>();

    // #endregion

    // #region Methods

    /** Invokes an enabled action source. */
    public request(): void {
        if (this.type() === FileSourceType.Action && !this.disabled() && !this.busy()) {
            this.requested.emit();
        }
    }

    /** Emits an accepted non-empty file selection for an enabled picker source. */
    public selectFiles(files: ReadonlyArray<File>): void {
        if (this.type() === FileSourceType.Picker && !this.disabled() && !this.busy() && files.length > 0) {
            this.filesSelected.emit(files);
        }
    }

    /** Emits a rejected non-empty file selection for an enabled picker source. */
    public rejectFiles(files: ReadonlyArray<File>): void {
        if (this.type() === FileSourceType.Picker && !this.disabled() && !this.busy() && files.length > 0) {
            this.filesRejected.emit(files);
        }
    }

    // #endregion
}
