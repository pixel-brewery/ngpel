import { Component, inject, InjectionToken } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';
import type { IControllerHostRef } from './IControllerHostRef';
import { useController } from './useController';

const SCOPED_CONTEXT = new InjectionToken<string>('SCOPED_CONTEXT');

class RecordingController {
    public readonly context = inject(SCOPED_CONTEXT);
    public readonly connections: Array<string> = [];

    public constructor(public readonly host: IControllerHostRef<object>) {}

    public hostConnected(): void {
        this.connections.push('connected');
    }

    public hostDisconnected(): void {
        this.connections.push('disconnected');
    }
}

@Component({
    selector: 'ngp-controller-host',
    template: '',
    providers: [{ provide: SCOPED_CONTEXT, useValue: 'scoped' }],
})
class ControllerHost {
    public readonly controller = useController(RecordingController);
}

describe('useController', () => {
    it('constructs the controller with its host element and scoped collaborators', () => {
        // Arrange
        TestBed.configureTestingModule({ imports: [ControllerHost] });

        // Act
        const fixture = TestBed.createComponent(ControllerHost);

        // Assert
        expect(fixture.componentInstance.controller.host.element).toBe(fixture.nativeElement);
        expect(fixture.componentInstance.controller.context).toBe('scoped');
    });

    it('disconnects the controller of only the destroyed component', () => {
        // Arrange
        TestBed.configureTestingModule({ imports: [ControllerHost] });
        const first = TestBed.createComponent(ControllerHost);
        const firstController = first.componentInstance.controller;
        const secondController = TestBed.createComponent(ControllerHost).componentInstance.controller;

        // Act
        first.destroy();

        // Assert
        expect(firstController.connections).toEqual(['connected', 'disconnected']);
        expect(secondController.connections).toEqual(['connected']);
    });
});
