// #region Imports

import { ElementRef, signal, type WritableSignal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';
import { command, type Command } from './Command';
import { CommandDirective } from './CommandDirective';

// #endregion

describe('CommandDirective', () => {
    let element: HTMLElement;
    let executions: Array<unknown>;
    let save: Command<unknown>;
    let bindings: WritableSignal<Readonly<Record<string, Command<unknown>>>>;
    let commandParameter: WritableSignal<unknown>;
    let commandParameterFromEvent: WritableSignal<((event: unknown) => unknown) | undefined>;

    beforeEach(() => {
        element = document.createElement('button');
        executions = [];
        save = command<unknown>((parameter) => executions.push(parameter));
        bindings = signal<Readonly<Record<string, Command<unknown>>>>({});
        commandParameter = signal<unknown>(undefined);
        commandParameterFromEvent = signal<((event: unknown) => unknown) | undefined>(undefined);

        TestBed.configureTestingModule({
            providers: [CommandDirective, { provide: ElementRef, useValue: new ElementRef(element) }],
        });

        // The just-in-time compiler never sees an `input()` initialiser, so the spec owns the signals.
        const directive = TestBed.inject(CommandDirective);
        Object.defineProperty(directive, 'command', { value: bindings });
        Object.defineProperty(directive, 'commandParameter', { value: commandParameter });
        Object.defineProperty(directive, 'commandParameterFromEvent', { value: commandParameterFromEvent });
        Object.defineProperty(directive, 'preventDefault', { value: signal(true) });
        Object.defineProperty(directive, 'stopPropagation', { value: signal(true) });
        TestBed.tick();
    });

    it('runs the command bound to the raised event', () => {
        // Arrange
        bindings.set({ click: save });
        TestBed.tick();

        // Act
        element.dispatchEvent(new Event('click'));

        // Assert
        expect(executions).toHaveLength(1);
    });

    it('hands a custom event its detail as the command parameter', () => {
        // Arrange
        bindings.set({ revealed: save });
        TestBed.tick();

        // Act
        element.dispatchEvent(new CustomEvent('revealed', { detail: 'row-7' }));

        // Assert
        expect(executions).toEqual(['row-7']);
    });

    it('prefers the fixed parameter over what the event carries', () => {
        // Arrange
        bindings.set({ revealed: save });
        commandParameter.set('fixed');
        TestBed.tick();

        // Act
        element.dispatchEvent(new CustomEvent('revealed', { detail: 'row-7' }));

        // Assert
        expect(executions).toEqual(['fixed']);
    });

    it('derives the parameter through the supplied mapper', () => {
        // Arrange
        bindings.set({ revealed: save });
        commandParameterFromEvent.set((event: unknown) => (event as CustomEvent<string>).detail.toUpperCase());
        TestBed.tick();

        // Act
        element.dispatchEvent(new CustomEvent('revealed', { detail: 'row-7' }));

        // Assert
        expect(executions).toEqual(['ROW-7']);
    });

    it('leaves a command that cannot execute alone', () => {
        // Arrange
        bindings.set({ click: command<unknown>((parameter) => executions.push(parameter), signal(false)) });
        TestBed.tick();

        // Act
        element.dispatchEvent(new Event('click'));

        // Assert
        expect(executions).toEqual([]);
    });

    it('detaches the listeners of a replaced binding', () => {
        // Arrange
        bindings.set({ click: save });
        TestBed.tick();
        bindings.set({ revealed: save });
        TestBed.tick();

        // Act
        element.dispatchEvent(new Event('click'));

        // Assert
        expect(executions).toEqual([]);
    });

    it('rejects a modifier event it could never receive', () => {
        // Arrange
        bindings.set({ 'keydown.enter': save });

        // Act
        const bindModifierEvent = (): void => TestBed.tick();

        // Assert
        expect(bindModifierEvent).toThrowError(/modifier events are not supported/);
    });
});
