import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { BytesPipe, InitialsPipe } from '@pixel-brewery/ngpel-ui';
import { isProblemDetail } from '@pixel-brewery/ngpel-core';
import { View, VIEW_PRESENTER } from '@pixel-brewery/ngpel-mvp';
import { renderPlainMarkdown } from '@pixel-brewery/ngpel-ui/markdown';
import { NG_STATUS_CLASSES } from '@pixel-brewery/ngpel-forms';
import { RoutePath } from '@pixel-brewery/ngpel-router';
import { FixturePresenter } from './FixturePresenter';
import { GREETING } from './provideFixture';

@Component({
    selector: 'app-root',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [BytesPipe, InitialsPipe],
    providers: [{ provide: VIEW_PRESENTER, useClass: FixturePresenter }],
    template: `
        <h1>ngpel fixture</h1>
        <p data-test="greeting">{{ greeting }}</p>
        <p data-test="problem">isProblemDetail: {{ problem }}</p>
        <p data-test="bytes">{{ 2048 | ngpBytes }}</p>
        <p data-test="initials">{{ 'Ada Lovelace' | ngpInitials }}</p>
        <p data-test="markdown">{{ markdown }}</p>
        <p data-test="route">{{ route }}</p>
        <p data-test="status">{{ statusClasses }}</p>
        <button type="button" data-test="increment" (click)="presenter.increment.execute()">clicks: {{ presenter.clicks() }}</button>
        <button type="button" (click)="presenter.refreshCommand.execute()">Refresh</button>
        <button type="button" [disabled]="!presenter.canUndo()" (click)="presenter.undoCommand.execute()">Undo</button>
        <button type="button" [disabled]="!presenter.canRedo()" (click)="presenter.redoCommand.execute()">Redo</button>
        <p>{{ presenter.model.value().title }}</p>
    `,
})
export class AppComponent extends View<FixturePresenter> {
    protected readonly greeting = inject(GREETING);
    protected readonly problem = isProblemDetail({ title: 'Not Found', status: 404 });
    protected readonly markdown = renderPlainMarkdown('**bold** fixture');
    protected readonly route = RoutePath.create('fixtures').path;
    protected readonly statusClasses = Object.keys(NG_STATUS_CLASSES).length;
}
