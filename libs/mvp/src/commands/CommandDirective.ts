// #region Imports

import { DestroyRef, Directive, effect, ElementRef, inject, input, model, type InputSignal, type ModelSignal } from '@angular/core';
import type { Command } from './Command';

// #endregion

/**
 * Binds commands to the events of the host element.
 *
 * The binding is an explicit event-to-command map rather than one command per event, so a single
 * element can answer several events — a Mosaik control that raises both `click` and a custom
 * `revealed` event, for instance — without stacking directives. Modifier syntax such as
 * `keydown.enter` is deliberately rejected: this directive attaches plain DOM listeners, and a
 * modifier key would silently never fire.
 *
 * The command parameter is resolved in three steps: an explicit `ngpCommandParameter` wins, then a
 * mapper supplied through `ngpCommandParameterFromEvent`, then the `detail` of a `CustomEvent`, and
 * finally the event itself.
 *
 * @public
 *
 * @example
 * ```html
 * <button type="button" [ngpCommand]="{ click: save }">Save</button>
 * ```
 */
@Directive({
    selector: '[ngpCommand]',
    exportAs: 'ngpCommand',
})
export class CommandDirective {
    // #region Fields

    private readonly _elementRef: ElementRef<HTMLElement>;
    private readonly _destroyRef: DestroyRef;
    private readonly _listeners = new Map<string, EventListener>();

    // #endregion

    // #region Ctor

    /**
     * Constructs a new instance of the `CommandDirective` class.
     *
     * @public
     * @param elementRef The host element the listeners are attached to.
     * @param destroyRef The lifetime the listeners are bound to.
     */
    public constructor(elementRef: ElementRef<HTMLElement> = inject(ElementRef), destroyRef: DestroyRef = inject(DestroyRef)) {
        this._elementRef = elementRef;
        this._destroyRef = destroyRef;

        effect(() => {
            const bindings = this.command();

            this.validateBindings(bindings);
            this.detachAll();
            this.attachAll(bindings);
        });

        this._destroyRef.onDestroy(() => this.detachAll());
    }

    // #endregion

    // #region Properties

    /**
     * The event-to-command bindings, for example `{ click: save, revealed: reveal }`.
     *
     * @public
     * @readonly
     */
    public readonly command: ModelSignal<Readonly<Record<string, Command<unknown>>>> = model<Readonly<Record<string, Command<unknown>>>>(
        {},
        { alias: 'ngpCommand' },
    );

    /**
     * A fixed parameter that overrides whatever the event carries.
     *
     * @public
     * @readonly
     */
    public readonly commandParameter: InputSignal<unknown> = input<unknown>(undefined, { alias: 'ngpCommandParameter' });

    /**
     * Derives the command parameter from the event.
     *
     * @public
     * @readonly
     */
    public readonly commandParameterFromEvent: InputSignal<((event: unknown) => unknown) | undefined> = input<((event: unknown) => unknown) | undefined>(
        undefined,
        { alias: 'ngpCommandParameterFromEvent' },
    );

    /**
     * Whether the default browser behavior of the event is prevented.
     *
     * @public
     * @readonly
     */
    public readonly preventDefault = input(true, { alias: 'ngpCommandPreventDefault' });

    /**
     * Whether the event stops propagating.
     *
     * @public
     * @readonly
     */
    public readonly stopPropagation = input(true, { alias: 'ngpCommandStopPropagation' });

    // #endregion

    // #region Methods

    /**
     * Attaches one listener per bound event.
     *
     * @param bindings The event-to-command bindings to attach.
     */
    private attachAll(bindings: Readonly<Record<string, Command<unknown>>>): void {
        const element = this._elementRef.nativeElement;

        for (const [eventName, command] of Object.entries(bindings)) {
            const handler: EventListener = (event) => this.handleEvent(event, command);

            element.addEventListener(eventName, handler);
            this._listeners.set(eventName, handler);
        }
    }

    /**
     * Removes every listener this directive attached.
     */
    private detachAll(): void {
        const element = this._elementRef.nativeElement;

        for (const [eventName, handler] of this._listeners) {
            element.removeEventListener(eventName, handler);
        }

        this._listeners.clear();
    }

    /**
     * Runs the command bound to the raised event, if it can execute.
     *
     * @param event The raised event.
     * @param command The command bound to it.
     */
    private handleEvent(event: Event, command: Command<unknown>): void {
        if (this.preventDefault()) {
            event.preventDefault();
        }

        if (this.stopPropagation()) {
            event.stopPropagation();
        }

        if (!command.canExecute()) {
            return;
        }

        command.execute(this.commandParameter() ?? this.resolveCommandParameter(event));
    }

    /**
     * Resolves the parameter an event hands to its command.
     *
     * @param event The raised event.
     * @returns The command parameter.
     */
    private resolveCommandParameter(event: Event): unknown {
        const mapper = this.commandParameterFromEvent();

        if (mapper) {
            return mapper(event);
        }

        return event instanceof CustomEvent ? event.detail : event;
    }

    /**
     * Rejects bindings this directive cannot honor.
     *
     * @param bindings The event-to-command bindings to check.
     */
    private validateBindings(bindings: Readonly<Record<string, Command<unknown>>>): void {
        for (const eventName of Object.keys(bindings)) {
            if (eventName.includes('.')) {
                throw new Error(`CommandDirective: modifier events are not supported ("${eventName}"); bind a plain DOM or custom event.`);
            }
        }
    }

    // #endregion
}
