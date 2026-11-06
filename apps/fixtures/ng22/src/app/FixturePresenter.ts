import { Injectable, signal, type Signal } from '@angular/core';
import { command, type Command, Refreshable, Trackable, ViewPresenter, withUndoRedo } from '@pixel-brewery/ngpel-mvp';

/** Exercises published presenter behaviors, tracked signals and command primitives. */
@Injectable()
export class FixturePresenter extends Trackable(Refreshable(ViewPresenter)) {
    private readonly _clicks = signal(0);

    public readonly increment: Command<void> = command(() => this._clicks.update((value) => value + 1));
    public readonly model = withUndoRedo(this, { title: 'initial' });

    public get clicks(): Signal<number> {
        return this._clicks.asReadonly();
    }

    public override onExecuteRefresh(): void {
        this.loading(true);
        this.model.value.set({ title: 'refreshed' });
        this.loading(false);
    }
}
