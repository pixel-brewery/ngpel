import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ButtonComponent } from '@pixel-brewery/mosaik-elements-angular';
import { ImmersiveSessionShellComponent, type ImmersiveSessionPhase } from '@pixel-brewery/ngpel-ui';
import { WidgetSummaryComponent } from '@pixel-brewery/ngpel-ui/widget';

@Component({
    selector: 'app-session-fixture',
    imports: [ButtonComponent, ImmersiveSessionShellComponent, WidgetSummaryComponent],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <h2>Session presentation</h2>
        <ngp-widget-summary label="Session notes" value="4" hint="Two added today" [compact]="true" />
        <ngp-immersive-session-shell ariaLabel="Session example" [phase]="phase()" [idleEnabled]="true" [railOpen]="false">
            <h3 ngpImmersiveSessionHeader>Session example</h3>
            <div ngpImmersiveSessionPreflight>
                <p>Ready to start</p>
                <mosaik-button label="Start session" (click)="phase.set('connecting')" />
            </div>
            <div ngpImmersiveSessionStage>
                @switch (phase()) {
                    @case ('connecting') {
                        <mosaik-button label="Connect session" (click)="phase.set('live')" />
                    }
                    @case ('live') {
                        <p>Session is live</p>
                    }
                    @case ('completed') {
                        <p>Session complete</p>
                    }
                }
            </div>
            <div ngpImmersiveSessionFooter>
                @if (phase() === 'live') {
                    <mosaik-button label="Complete session" (click)="phase.set('completed')" />
                }
            </div>
        </ngp-immersive-session-shell>
    `,
})
export class SessionFixture {
    protected readonly phase = signal<ImmersiveSessionPhase>('preflight');
}
