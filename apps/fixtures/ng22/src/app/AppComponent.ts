import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormField, form } from '@angular/forms/signals';
import { BytesPipe, CollectionExportService, InitialsPipe } from '@pixel-brewery/ngpel-ui';
import { isProblemDetail, normalizeCalendarDate } from '@pixel-brewery/ngpel-core';
import { AudioLevelMonitor } from '@pixel-brewery/ngpel-core/audio';
import { ImageUploadPreparationService } from '@pixel-brewery/ngpel-core/browser';
import { OperationQueue } from '@pixel-brewery/ngpel-core/operation-queue';
import { View, VIEW_PRESENTER } from '@pixel-brewery/ngpel-mvp';
import { renderPlainMarkdown } from '@pixel-brewery/ngpel-ui/markdown';
import { NG_STATUS_CLASSES, trimmedMaxLength } from '@pixel-brewery/ngpel-forms';
import { RoutePath } from '@pixel-brewery/ngpel-router';
import { filter, firstValueFrom, timeout } from 'rxjs';
import { ContextMenuFixture } from './ContextMenuFixture';
import { FixturePresenter } from './FixturePresenter';
import { NavigationFixture } from './NavigationFixture';
import { GREETING } from './provideFixture';
import { SessionFixture } from './SessionFixture';

@Component({
    selector: 'app-root',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [BytesPipe, ContextMenuFixture, FormField, InitialsPipe, NavigationFixture, SessionFixture],
    providers: [{ provide: VIEW_PRESENTER, useClass: FixturePresenter }, AudioLevelMonitor],
    template: `
        <h1>ngpel fixture</h1>
        <p data-test="greeting">{{ greeting }}</p>
        <p data-test="problem">isProblemDetail: {{ problem }}</p>
        <p data-test="bytes">{{ 2048 | ngpBytes }}</p>
        <p data-test="initials">{{ 'Ada Lovelace' | ngpInitials }}</p>
        <p data-test="markdown">{{ markdown }}</p>
        <p data-test="route">{{ route }}</p>
        <p data-test="status">{{ statusClasses }}</p>
        <p data-test="calendar">{{ calendarDay }}</p>
        <label>Label <input [formField]="imageForm.label" /></label>
        <label>Image <input #imageInput type="file" accept="image/*" (change)="prepareImage(imageInput)" /></label>
        <p data-test="image">{{ imageStatus() }}</p>
        <button type="button" [disabled]="imageForm().invalid()" (click)="enqueueLabel()">Queue label</button>
        <p data-test="queued">{{ queue.pendingEntries().length }}</p>
        <button type="button" (click)="openExport()">Export sample</button>
        <button type="button" (click)="measureTone()">Measure sample audio</button>
        <p data-test="audio">{{ audioStatus() }}</p>
        <button type="button" data-test="increment" (click)="presenter.increment.execute()">clicks: {{ presenter.clicks() }}</button>
        <button type="button" (click)="presenter.refreshCommand.execute()">Refresh</button>
        <button type="button" [disabled]="!presenter.canUndo()" (click)="presenter.undoCommand.execute()">Undo</button>
        <button type="button" [disabled]="!presenter.canRedo()" (click)="presenter.redoCommand.execute()">Redo</button>
        <p>{{ presenter.model.value().title }}</p>
        <app-context-menu-fixture />
        <app-navigation-fixture />
        <app-session-fixture />
    `,
})
export class AppComponent extends View<FixturePresenter> {
    protected readonly greeting = inject(GREETING);
    protected readonly problem = isProblemDetail({ title: 'Not Found', status: 404 });
    protected readonly markdown = renderPlainMarkdown('**bold** fixture');
    protected readonly route = RoutePath.create('fixtures').path;
    protected readonly statusClasses = Object.keys(NG_STATUS_CLASSES).length;
    protected readonly calendarDay = normalizeCalendarDate('2024-02-29T00:00:00.000Z');
    protected readonly queue = inject(OperationQueue);
    protected readonly imageStatus = signal('');
    protected readonly audioStatus = signal('');
    private readonly _imagePreparation = inject(ImageUploadPreparationService);
    private readonly _audioMonitor = inject(AudioLevelMonitor);
    private readonly _export = inject(CollectionExportService);
    private readonly _imageModel = signal({ label: '' });
    protected readonly imageForm = form(this._imageModel, (fields) => trimmedMaxLength(fields.label, 40));

    protected async prepareImage(input: HTMLInputElement): Promise<void> {
        const file = input.files?.[0];
        if (file) {
            try {
                const image = await this._imagePreparation.prepare(file, file.name, {
                    maximumFileSizeInBytes: 512_000,
                    maximumWidthInPixels: 1600,
                    maximumHeightInPixels: 1600,
                });
                this.imageStatus.set(image.name);
            } catch {
                this.imageStatus.set('Image preparation failed');
            }
        }
    }

    protected enqueueLabel(): void {
        const label = this._imageModel().label.trim();
        this.queue.enqueue({ label, commit: async () => this.imageStatus.set(label) });
    }

    protected async openExport(): Promise<void> {
        await this._export.open({ columns: [{ key: 'label', header: 'Label' }], recordCount: 12 });
    }

    protected async measureTone(): Promise<void> {
        const context = new AudioContext({ sampleRate: 24_000 });
        const oscillator = context.createOscillator();
        const destination = context.createMediaStreamDestination();
        oscillator.connect(destination);
        oscillator.start();

        try {
            await context.resume();
            await this._audioMonitor.start(destination.stream);
            const level = await firstValueFrom(
                this._audioMonitor.levels.pipe(
                    filter((value) => value.peak > 0),
                    timeout(4_000),
                ),
            );
            await this._audioMonitor.stop();
            this.audioStatus.set(`Measured ${level.durationMs} ms; track is ${destination.stream.getAudioTracks()[0]?.readyState}`);
        } catch (error: unknown) {
            this.audioStatus.set(error instanceof Error ? error.message : String(error));
        } finally {
            await this._audioMonitor.stop();
            for (const track of destination.stream.getTracks()) {
                track.stop();
            }
            oscillator.stop();
            await context.close();
        }
    }
}
