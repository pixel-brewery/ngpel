// #region Imports

import { Component, ElementRef, signal, WritableSignal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { InputHistoryNavigationDirective } from './InputHistoryNavigationDirective';

// #endregion

/**
 * Mock implementation of the ChatPromptBoxElement for testing.
 */
class MockChatPromptBoxElement {
    // #region Fields

    public disabled = false;
    public readonly dispatchedEvents: Array<Event> = [];
    public entries: ReadonlyArray<unknown> = [];
    public value = '';

    // #endregion

    // #region Methods

    public dispatchEvent(event: Event): boolean {
        this.dispatchedEvents.push(event);

        return true;
    }

    // #endregion
}

/**
 * Test host component that uses the InputHistoryNavigationDirective.
 */
@Component({
    template: '<div></div>',
    imports: [InputHistoryNavigationDirective],
})
class TestHostComponent {
    // #region Fields

    public readonly history: WritableSignal<readonly string[]> = signal<readonly string[]>([]);
    public readonly disabled: WritableSignal<boolean> = signal<boolean>(false);
    public readonly onlyWhenEmpty: WritableSignal<boolean> = signal<boolean>(true);
    public lastNavigatedEvent: unknown = null;

    // #endregion

    // #region Methods

    public onNavigated(event: unknown): void {
        this.lastNavigatedEvent = event;
    }

    // #endregion
}

describe('InputHistoryNavigationDirective', () => {
    let directive: InputHistoryNavigationDirective;
    let mockElement: MockChatPromptBoxElement;

    beforeEach(() => {
        mockElement = new MockChatPromptBoxElement();

        TestBed.configureTestingModule({
            providers: [
                InputHistoryNavigationDirective,
                {
                    provide: ElementRef,
                    useValue: { nativeElement: mockElement },
                },
            ],
        });

        directive = TestBed.inject(InputHistoryNavigationDirective);
    });

    describe('recallPrevious', () => {
        it('should return false when history is empty', () => {
            TestBed.runInInjectionContext(() => {
                const historySignal = signal<readonly string[]>([]);

                // Access the internal signal through reflection for testing
                Object.defineProperty(directive, 'history', {
                    value: () => historySignal(),
                    writable: true,
                });

                const result = directive.recallPrevious();

                expect(result).toBe(false);
            });
        });

        it('should return false when disabled', () => {
            TestBed.runInInjectionContext(() => {
                const historySignal = signal<readonly string[]>(['previous message']);
                const disabledSignal = signal<boolean>(true);

                Object.defineProperty(directive, 'history', {
                    value: () => historySignal(),
                    writable: true,
                });
                Object.defineProperty(directive, 'disabled', {
                    value: () => disabledSignal(),
                    writable: true,
                });

                const result = directive.recallPrevious();

                expect(result).toBe(false);
            });
        });

        it('should return false when onlyWhenEmpty is true and input has content', () => {
            TestBed.runInInjectionContext(() => {
                const historySignal = signal<readonly string[]>(['previous message']);
                const onlyWhenEmptySignal = signal<boolean>(true);

                Object.defineProperty(directive, 'history', {
                    value: () => historySignal(),
                    writable: true,
                });
                Object.defineProperty(directive, 'onlyWhenEmpty', {
                    value: () => onlyWhenEmptySignal(),
                    writable: true,
                });

                mockElement.value = 'current input';

                const result = directive.recallPrevious();

                expect(result).toBe(false);
            });
        });

        it('should recall the most recent history entry and return true', () => {
            TestBed.runInInjectionContext(() => {
                const historySignal = signal<readonly string[]>(['first', 'second', 'third']);
                const onlyWhenEmptySignal = signal<boolean>(true);
                const disabledSignal = signal<boolean>(false);

                Object.defineProperty(directive, 'history', {
                    value: () => historySignal(),
                    writable: true,
                });
                Object.defineProperty(directive, 'onlyWhenEmpty', {
                    value: () => onlyWhenEmptySignal(),
                    writable: true,
                });
                Object.defineProperty(directive, 'disabled', {
                    value: () => disabledSignal(),
                    writable: true,
                });

                const entries = [{ id: 'attachment-1', type: 'attachment', value: new File([], 'test.txt') }];
                mockElement.entries = entries;
                mockElement.value = '';

                const result = directive.recallPrevious();

                expect(result).toBe(true);
                expect(mockElement.value).toBe('third');
                expect(mockElement.entries).toBe(entries);
                expect(mockElement.dispatchedEvents).toHaveLength(1);
                expect(mockElement.dispatchedEvents[0]).toMatchObject({
                    type: 'input',
                    bubbles: true,
                    composed: true,
                });
            });
        });

        it('should navigate backwards through history on repeated calls', () => {
            TestBed.runInInjectionContext(() => {
                const historySignal = signal<readonly string[]>(['first', 'second', 'third']);
                const onlyWhenEmptySignal = signal<boolean>(true);
                const disabledSignal = signal<boolean>(false);

                Object.defineProperty(directive, 'history', {
                    value: () => historySignal(),
                    writable: true,
                });
                Object.defineProperty(directive, 'onlyWhenEmpty', {
                    value: () => onlyWhenEmptySignal(),
                    writable: true,
                });
                Object.defineProperty(directive, 'disabled', {
                    value: () => disabledSignal(),
                    writable: true,
                });

                mockElement.value = '';

                directive.recallPrevious();
                expect(mockElement.value).toBe('third');

                directive.recallPrevious();
                expect(mockElement.value).toBe('second');

                directive.recallPrevious();
                expect(mockElement.value).toBe('first');
            });
        });

        it('should not go past the oldest entry', () => {
            TestBed.runInInjectionContext(() => {
                const historySignal = signal<readonly string[]>(['only']);
                const onlyWhenEmptySignal = signal<boolean>(true);
                const disabledSignal = signal<boolean>(false);

                Object.defineProperty(directive, 'history', {
                    value: () => historySignal(),
                    writable: true,
                });
                Object.defineProperty(directive, 'onlyWhenEmpty', {
                    value: () => onlyWhenEmptySignal(),
                    writable: true,
                });
                Object.defineProperty(directive, 'disabled', {
                    value: () => disabledSignal(),
                    writable: true,
                });

                mockElement.value = '';

                directive.recallPrevious();
                expect(mockElement.value).toBe('only');

                // Trying to go further back should still return true but keep the same value
                const result = directive.recallPrevious();
                expect(result).toBe(true);
                expect(mockElement.value).toBe('only');
            });
        });
    });

    describe('recallNext', () => {
        it('should return false when no session is active', () => {
            const result = directive.recallNext();

            expect(result).toBe(false);
        });

        it('should navigate forward through history', () => {
            TestBed.runInInjectionContext(() => {
                const historySignal = signal<readonly string[]>(['first', 'second', 'third']);
                const onlyWhenEmptySignal = signal<boolean>(true);
                const disabledSignal = signal<boolean>(false);

                Object.defineProperty(directive, 'history', {
                    value: () => historySignal(),
                    writable: true,
                });
                Object.defineProperty(directive, 'onlyWhenEmpty', {
                    value: () => onlyWhenEmptySignal(),
                    writable: true,
                });
                Object.defineProperty(directive, 'disabled', {
                    value: () => disabledSignal(),
                    writable: true,
                });

                mockElement.value = '';

                // Go back twice
                directive.recallPrevious();
                directive.recallPrevious();
                expect(mockElement.value).toBe('second');

                // Go forward once
                directive.recallNext();
                expect(mockElement.value).toBe('third');
            });
        });

        it('should restore draft when navigating past newest entry', () => {
            TestBed.runInInjectionContext(() => {
                const historySignal = signal<readonly string[]>(['history entry']);
                const onlyWhenEmptySignal = signal<boolean>(false);
                const disabledSignal = signal<boolean>(false);

                Object.defineProperty(directive, 'history', {
                    value: () => historySignal(),
                    writable: true,
                });
                Object.defineProperty(directive, 'onlyWhenEmpty', {
                    value: () => onlyWhenEmptySignal(),
                    writable: true,
                });
                Object.defineProperty(directive, 'disabled', {
                    value: () => disabledSignal(),
                    writable: true,
                });

                mockElement.value = 'my draft';

                // Go back (captures draft)
                directive.recallPrevious();
                expect(mockElement.value).toBe('history entry');

                // Go forward past history (should restore draft)
                directive.recallNext();
                expect(mockElement.value).toBe('my draft');
            });
        });
    });

    describe('reset', () => {
        it('should clear the active navigation session', () => {
            TestBed.runInInjectionContext(() => {
                const historySignal = signal<readonly string[]>(['entry']);
                const onlyWhenEmptySignal = signal<boolean>(true);
                const disabledSignal = signal<boolean>(false);

                Object.defineProperty(directive, 'history', {
                    value: () => historySignal(),
                    writable: true,
                });
                Object.defineProperty(directive, 'onlyWhenEmpty', {
                    value: () => onlyWhenEmptySignal(),
                    writable: true,
                });
                Object.defineProperty(directive, 'disabled', {
                    value: () => disabledSignal(),
                    writable: true,
                });

                mockElement.value = '';

                directive.recallPrevious();
                directive.reset();

                // recallNext should return false since session was cleared
                const result = directive.recallNext();
                expect(result).toBe(false);
            });
        });
    });

    describe('keyboard events', () => {
        it('should handle ArrowUp keydown event', () => {
            TestBed.runInInjectionContext(() => {
                const historySignal = signal<readonly string[]>(['entry']);
                const onlyWhenEmptySignal = signal<boolean>(true);
                const disabledSignal = signal<boolean>(false);

                Object.defineProperty(directive, 'history', {
                    value: () => historySignal(),
                    writable: true,
                });
                Object.defineProperty(directive, 'onlyWhenEmpty', {
                    value: () => onlyWhenEmptySignal(),
                    writable: true,
                });
                Object.defineProperty(directive, 'disabled', {
                    value: () => disabledSignal(),
                    writable: true,
                });

                mockElement.value = '';

                const event = new KeyboardEvent('keydown', {
                    key: 'ArrowUp',
                    bubbles: true,
                });
                const preventDefaultSpy = vi.spyOn(event, 'preventDefault');

                // Call the protected method directly
                (directive as unknown as { onKeydown: (e: KeyboardEvent) => void }).onKeydown(event);

                expect(preventDefaultSpy).toHaveBeenCalled();
                expect(mockElement.value).toBe('entry');
            });
        });

        it('should ignore ArrowUp with modifier keys', () => {
            TestBed.runInInjectionContext(() => {
                const historySignal = signal<readonly string[]>(['entry']);
                const onlyWhenEmptySignal = signal<boolean>(true);
                const disabledSignal = signal<boolean>(false);

                Object.defineProperty(directive, 'history', {
                    value: () => historySignal(),
                    writable: true,
                });
                Object.defineProperty(directive, 'onlyWhenEmpty', {
                    value: () => onlyWhenEmptySignal(),
                    writable: true,
                });
                Object.defineProperty(directive, 'disabled', {
                    value: () => disabledSignal(),
                    writable: true,
                });

                mockElement.value = '';

                const event = new KeyboardEvent('keydown', {
                    key: 'ArrowUp',
                    ctrlKey: true,
                    bubbles: true,
                });
                const preventDefaultSpy = vi.spyOn(event, 'preventDefault');

                (directive as unknown as { onKeydown: (e: KeyboardEvent) => void }).onKeydown(event);

                expect(preventDefaultSpy).not.toHaveBeenCalled();
                expect(mockElement.value).toBe('');
            });
        });

        it('should reset session on Escape key', () => {
            TestBed.runInInjectionContext(() => {
                const historySignal = signal<readonly string[]>(['entry']);
                const onlyWhenEmptySignal = signal<boolean>(true);
                const disabledSignal = signal<boolean>(false);

                Object.defineProperty(directive, 'history', {
                    value: () => historySignal(),
                    writable: true,
                });
                Object.defineProperty(directive, 'onlyWhenEmpty', {
                    value: () => onlyWhenEmptySignal(),
                    writable: true,
                });
                Object.defineProperty(directive, 'disabled', {
                    value: () => disabledSignal(),
                    writable: true,
                });

                mockElement.value = '';

                // Start a session
                directive.recallPrevious();

                const escapeEvent = new KeyboardEvent('keydown', {
                    key: 'Escape',
                    bubbles: true,
                });

                (directive as unknown as { onKeydown: (e: KeyboardEvent) => void }).onKeydown(escapeEvent);

                // Session should be cleared
                const result = directive.recallNext();
                expect(result).toBe(false);
            });
        });
    });

    describe('input and focusout events', () => {
        it('should reset session on user input', () => {
            TestBed.runInInjectionContext(() => {
                const historySignal = signal<readonly string[]>(['entry']);
                const onlyWhenEmptySignal = signal<boolean>(true);
                const disabledSignal = signal<boolean>(false);

                Object.defineProperty(directive, 'history', {
                    value: () => historySignal(),
                    writable: true,
                });
                Object.defineProperty(directive, 'onlyWhenEmpty', {
                    value: () => onlyWhenEmptySignal(),
                    writable: true,
                });
                Object.defineProperty(directive, 'disabled', {
                    value: () => disabledSignal(),
                    writable: true,
                });

                mockElement.value = '';

                // Start a session
                directive.recallPrevious();

                // Simulate user input (not from directive)
                (directive as unknown as { onInput: () => void }).onInput();

                // Session should be cleared
                const result = directive.recallNext();
                expect(result).toBe(false);
            });
        });

        it('should reset session on focusout', () => {
            TestBed.runInInjectionContext(() => {
                const historySignal = signal<readonly string[]>(['entry']);
                const onlyWhenEmptySignal = signal<boolean>(true);
                const disabledSignal = signal<boolean>(false);

                Object.defineProperty(directive, 'history', {
                    value: () => historySignal(),
                    writable: true,
                });
                Object.defineProperty(directive, 'onlyWhenEmpty', {
                    value: () => onlyWhenEmptySignal(),
                    writable: true,
                });
                Object.defineProperty(directive, 'disabled', {
                    value: () => disabledSignal(),
                    writable: true,
                });

                mockElement.value = '';

                // Start a session
                directive.recallPrevious();

                // Simulate focus out
                (directive as unknown as { onFocusOut: () => void }).onFocusOut();

                // Session should be cleared
                const result = directive.recallNext();
                expect(result).toBe(false);
            });
        });
    });

    describe('empty entries filtering', () => {
        it('should filter out empty history entries', () => {
            TestBed.runInInjectionContext(() => {
                const historySignal = signal<readonly string[]>(['', 'valid', '', 'also valid', '']);
                const onlyWhenEmptySignal = signal<boolean>(true);
                const disabledSignal = signal<boolean>(false);

                Object.defineProperty(directive, 'history', {
                    value: () => historySignal(),
                    writable: true,
                });
                Object.defineProperty(directive, 'onlyWhenEmpty', {
                    value: () => onlyWhenEmptySignal(),
                    writable: true,
                });
                Object.defineProperty(directive, 'disabled', {
                    value: () => disabledSignal(),
                    writable: true,
                });

                mockElement.value = '';

                directive.recallPrevious();
                expect(mockElement.value).toBe('also valid');

                directive.recallPrevious();
                expect(mockElement.value).toBe('valid');
            });
        });
    });
});
