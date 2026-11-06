import type { IExpandableMultilineConfiguration } from './IExpandableMultilineConfiguration';
import { AfterViewInit, DestroyRef, Directive, effect, ElementRef, inject, Input, Renderer2, signal, type Signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslateService } from '@pixel-brewery/mosaik-elements-angular';
import { MultilineExpansionBoundaryDirective } from './MultilineExpansionBoundaryDirective';

interface IExpandableButtonElement extends HTMLElement {
    appearance: string;
    icon: string;
    size: string;
    type: string;
    variant: string;
}

interface ITextBoxElement extends HTMLElement {
    multilineMaxRows?: number | null;
    multilineRows?: number;
    readonly updateComplete?: Promise<unknown>;
}

interface ITooltipElement extends HTMLElement {
    content: string;
    attach?(anchorElement: HTMLElement): void;
    detach?(): void;
}

interface IInitialMultilineLayout {
    readonly multilineMaxRows: number | null | undefined;
    readonly multilineRows: number;
    readonly textareaHeight: string;
}

const DEFAULT_TEXTAREA_LINE_HEIGHT = 20;

const EXPANDED_HOST_STYLE_PROPERTIES = [
    'bottom',
    'box-sizing',
    'height',
    'left',
    'margin',
    'max-height',
    'max-width',
    'position',
    'right',
    'top',
    'width',
    'z-index',
] as const;

@Directive({
    selector: '[ngpExpandableMultiline]',
    exportAs: 'ngpExpandableMultiline',
    standalone: true,
})
export class ExpandableMultilineDirective implements AfterViewInit {
    private readonly _boundary = inject(MultilineExpansionBoundaryDirective, { optional: true });
    private readonly _destroyRef = inject(DestroyRef);
    private readonly _elementRef = inject<ElementRef<ITextBoxElement>>(ElementRef);
    private readonly _renderer = inject(Renderer2);
    private readonly _translate = inject(TranslateService);
    private readonly _isExpanded = signal(false);
    private readonly _isPointerWithin = signal(false);
    private readonly _hasFocusWithin = signal(false);
    private readonly _isActionReady = signal(false);
    private readonly _configuration = signal<IExpandableMultilineConfiguration>({});
    private readonly _languageRevision = signal(0);
    private readonly _initialHostStyles = new Map<string, string>();
    private _initialMultilineLayout: IInitialMultilineLayout | null = null;
    private _actionElement: IExpandableButtonElement | null = null;
    private _tooltipElement: ITooltipElement | null = null;
    private _resizeObserver: ResizeObserver | null = null;
    private _listenerCleanups: Array<() => void> = [];
    private _boundsListenerCleanup: (() => void) | null = null;
    private _observedOffsetParent: HTMLElement | null = null;

    public constructor() {
        this._destroyRef.onDestroy(() => this.destroy());
        this._translate.languageChanged.pipe(takeUntilDestroyed()).subscribe(() => this._languageRevision.update((revision) => revision + 1));

        effect(() => {
            this._isActionReady();
            this._languageRevision();
            const configuration = this._configuration();
            const isExpanded = this._isExpanded();
            const isVisible = isExpanded || this._isPointerWithin() || this._hasFocusWithin();
            const actionElement = this._actionElement;
            const tooltipElement = this._tooltipElement;

            if (actionElement === null || tooltipElement === null) {
                return;
            }

            const label = isExpanded
                ? (configuration.collapseLabel ?? this._translate.translate('loc.expandableMultiline.actions.collapse'))
                : (configuration.expandLabel ?? this._translate.translate('loc.expandableMultiline.actions.expand'));
            actionElement.icon = isExpanded ? 'fullScreenMinimize' : 'fullScreenMaximize';
            actionElement.setAttribute('aria-label', label);
            actionElement.setAttribute('aria-pressed', String(isExpanded));
            tooltipElement.content = label;

            if (configuration.actionTestId) {
                actionElement.setAttribute('test-id', configuration.actionTestId);
            } else {
                actionElement.removeAttribute('test-id');
            }

            this._renderer.setStyle(actionElement, 'opacity', isVisible ? '1' : '0');
            this._renderer.setStyle(actionElement, 'pointer-events', isVisible ? 'auto' : 'none');
        });
    }

    @Input({ alias: 'ngpExpandableMultiline' })
    public set configuration(value: IExpandableMultilineConfiguration | '' | null | undefined) {
        this._configuration.set(typeof value === 'object' && value !== null ? value : {});
    }

    /** Whether the host field currently occupies its expansion boundary. */
    public readonly isExpanded: Signal<boolean> = this._isExpanded.asReadonly();

    public ngAfterViewInit(): void {
        if (this._boundary === null) {
            return;
        }

        const hostElement = this._elementRef.nativeElement;
        const actionElement = hostElement.ownerDocument.createElement('mosaik-button') as IExpandableButtonElement;
        const tooltipElement = hostElement.ownerDocument.createElement('mosaik-tooltip') as ITooltipElement;

        actionElement.slot = 'suffix';
        actionElement.appearance = 'solid';
        actionElement.variant = 'tertiary';
        actionElement.size = 'small';
        actionElement.type = 'button';
        actionElement.tabIndex = 0;
        this._renderer.setStyle(actionElement, 'position', 'absolute');
        this._renderer.setStyle(actionElement, 'inset-inline-end', '4px');
        this._renderer.setStyle(actionElement, 'top', '4px');
        this._renderer.setStyle(actionElement, 'z-index', '1');
        this._renderer.setStyle(actionElement, 'transition', 'opacity 120ms ease');
        this._renderer.appendChild(hostElement, actionElement);
        this._renderer.appendChild(hostElement, tooltipElement);
        tooltipElement.attach?.(actionElement);
        this._actionElement = actionElement;
        this._tooltipElement = tooltipElement;
        this.bindListeners(hostElement, actionElement);
        this._isActionReady.set(true);
    }

    /** Collapses the field when another field is expanded inside the same boundary. @internal */
    public collapseFromBoundary(): void {
        this.collapse(false);
    }

    private bindListeners(hostElement: HTMLElement, actionElement: HTMLElement): void {
        this._listenerCleanups.push(
            this._renderer.listen(hostElement, 'mouseenter', () => this._isPointerWithin.set(true)),
            this._renderer.listen(hostElement, 'mouseleave', () => this._isPointerWithin.set(false)),
            this._renderer.listen(hostElement, 'focusin', () => this._hasFocusWithin.set(true)),
            this._renderer.listen(hostElement, 'focusout', (event: FocusEvent) => {
                const nextTarget = event.relatedTarget;

                if (nextTarget instanceof Node && hostElement.contains(nextTarget)) {
                    return;
                }

                this._hasFocusWithin.set(false);
            }),
            this._renderer.listen(actionElement, 'click', (event: Event) => {
                event.preventDefault();
                event.stopPropagation();
                this.toggle();
            }),
            this._renderer.listen(hostElement, 'keydown', (event: KeyboardEvent) => {
                if (event.key !== 'Escape' || !this._isExpanded()) {
                    return;
                }

                event.preventDefault();
                event.stopPropagation();
                this.collapse(true);
            }),
        );
    }

    private toggle(): void {
        if (this._isExpanded()) {
            this.collapse(false);
            return;
        }

        this.expand();
    }

    private expand(): void {
        const boundary = this._boundary;

        if (boundary === null) {
            return;
        }

        const hostElement = this._elementRef.nativeElement;

        for (const propertyName of EXPANDED_HOST_STYLE_PROPERTIES) {
            this._initialHostStyles.set(propertyName, hostElement.style.getPropertyValue(propertyName));
        }

        boundary.activate(this);
        this._isExpanded.set(true);
        this._renderer.setStyle(hostElement, 'position', 'absolute');
        this._renderer.setStyle(hostElement, 'margin', '0');
        this._renderer.setStyle(hostElement, 'max-width', 'none');
        this._renderer.setStyle(hostElement, 'max-height', 'none');
        this._renderer.setStyle(hostElement, 'width', 'auto');
        this._renderer.setStyle(hostElement, 'height', 'auto');
        this._renderer.setStyle(hostElement, 'box-sizing', 'border-box');
        this._renderer.setStyle(hostElement, 'z-index', '1100');
        this.updateExpandedBounds();
        this.observeExpandedBounds();
        void this.prepareExpandedTextArea();
    }

    private collapse(restoreActionFocus: boolean): void {
        if (!this._isExpanded()) {
            return;
        }

        this.releaseBoundsObserver();
        this.restoreMultilineLayout();
        this.restoreHostStyles();
        this._isExpanded.set(false);
        this._boundary?.deactivate(this);

        if (restoreActionFocus) {
            this._actionElement?.focus();
        }
    }

    private updateExpandedBounds(): void {
        const boundary = this._boundary;

        if (!this._isExpanded() || boundary === null) {
            return;
        }

        const hostElement = this._elementRef.nativeElement;
        const boundaryElement = boundary.element;
        const offsetParent = hostElement.offsetParent;
        const offsetParentElement = offsetParent instanceof HTMLElement ? offsetParent : boundaryElement;
        const boundaryBounds = boundaryElement.getBoundingClientRect();
        const offsetParentBounds = offsetParentElement.getBoundingClientRect();
        const top = boundaryBounds.top - offsetParentBounds.top + offsetParentElement.scrollTop;
        const left = boundaryBounds.left - offsetParentBounds.left + offsetParentElement.scrollLeft;
        const right = offsetParentBounds.right - boundaryBounds.right - offsetParentElement.scrollLeft;
        const bottom = offsetParentBounds.bottom - boundaryBounds.bottom - offsetParentElement.scrollTop;

        this._renderer.setStyle(hostElement, 'top', `${top}px`);
        this._renderer.setStyle(hostElement, 'left', `${left}px`);
        this._renderer.setStyle(hostElement, 'right', `${right}px`);
        this._renderer.setStyle(hostElement, 'bottom', `${bottom}px`);
        this._observedOffsetParent = offsetParentElement;
        this.updateExpandedMultilineLayout();
    }

    private observeExpandedBounds(): void {
        const boundary = this._boundary;

        if (boundary === null) {
            return;
        }

        const hostElement = this._elementRef.nativeElement;
        const defaultView = hostElement.ownerDocument.defaultView;
        const ResizeObserverConstructor = defaultView?.ResizeObserver;

        if (ResizeObserverConstructor) {
            this._resizeObserver = new ResizeObserverConstructor(() => this.updateExpandedBounds());
            this._resizeObserver.observe(boundary.element);

            if (this._observedOffsetParent && this._observedOffsetParent !== boundary.element) {
                this._resizeObserver.observe(this._observedOffsetParent);
            }
        }

        if (defaultView) {
            this._boundsListenerCleanup = this._renderer.listen(defaultView, 'resize', () => this.updateExpandedBounds());
        }
    }

    private async prepareExpandedTextArea(): Promise<void> {
        const hostElement = this._elementRef.nativeElement;
        await hostElement.updateComplete;

        if (!this._isExpanded()) {
            return;
        }

        this.updateExpandedMultilineLayout();
        hostElement.shadowRoot?.querySelector<HTMLTextAreaElement>('textarea')?.focus();
    }

    private updateExpandedMultilineLayout(): void {
        if (!this._isExpanded()) {
            return;
        }

        const hostElement = this._elementRef.nativeElement;
        const textarea = hostElement.shadowRoot?.querySelector<HTMLTextAreaElement>('textarea');
        const editor = hostElement.shadowRoot?.querySelector<HTMLElement>('.editor');

        if (textarea === null || textarea === undefined || editor === null || editor === undefined) {
            return;
        }

        const currentRows = hostElement.multilineRows;

        if (typeof currentRows !== 'number') {
            return;
        }

        if (this._initialMultilineLayout === null) {
            this._initialMultilineLayout = {
                multilineMaxRows: hostElement.multilineMaxRows,
                multilineRows: currentRows,
                textareaHeight: textarea.style.getPropertyValue('height'),
            };
        }

        const defaultView = hostElement.ownerDocument.defaultView;

        if (defaultView === null) {
            return;
        }

        const textareaStyle = defaultView.getComputedStyle(textarea);
        const editorStyle = defaultView.getComputedStyle(editor);
        const parsedLineHeight = Number.parseFloat(textareaStyle.lineHeight);
        const lineHeight = parsedLineHeight || DEFAULT_TEXTAREA_LINE_HEIGHT;
        const verticalPadding = Number.parseFloat(editorStyle.paddingTop || '0') + Number.parseFloat(editorStyle.paddingBottom || '0');
        const availableHeight = Math.max(0, editor.clientHeight - verticalPadding);

        if (availableHeight <= 0) {
            return;
        }

        const expandedRows = Math.max(1, Math.floor(availableHeight / lineHeight));
        hostElement.multilineRows = expandedRows;
        hostElement.multilineMaxRows = expandedRows;
        this._renderer.setStyle(textarea, 'height', `${availableHeight}px`);
    }

    private restoreMultilineLayout(): void {
        const initialLayout = this._initialMultilineLayout;

        if (initialLayout === null) {
            return;
        }

        const hostElement = this._elementRef.nativeElement;
        const textarea = hostElement.shadowRoot?.querySelector<HTMLTextAreaElement>('textarea');
        hostElement.multilineRows = initialLayout.multilineRows;
        hostElement.multilineMaxRows = initialLayout.multilineMaxRows;

        if (textarea !== null && textarea !== undefined) {
            if (initialLayout.textareaHeight.length === 0) {
                this._renderer.removeStyle(textarea, 'height');
            } else {
                this._renderer.setStyle(textarea, 'height', initialLayout.textareaHeight);
            }
        }

        this._initialMultilineLayout = null;
    }

    private restoreHostStyles(): void {
        const hostElement = this._elementRef.nativeElement;

        for (const propertyName of EXPANDED_HOST_STYLE_PROPERTIES) {
            const initialValue = this._initialHostStyles.get(propertyName) ?? '';

            if (initialValue.length === 0) {
                this._renderer.removeStyle(hostElement, propertyName);
            } else {
                this._renderer.setStyle(hostElement, propertyName, initialValue);
            }
        }

        this._initialHostStyles.clear();
    }

    private releaseBoundsObserver(): void {
        this._resizeObserver?.disconnect();
        this._resizeObserver = null;
        this._boundsListenerCleanup?.();
        this._boundsListenerCleanup = null;
        this._observedOffsetParent = null;
    }

    private destroy(): void {
        this.collapse(false);
        this.releaseBoundsObserver();

        for (const cleanup of this._listenerCleanups) {
            cleanup();
        }

        this._listenerCleanups = [];

        if (this._tooltipElement !== null) {
            this._tooltipElement.detach?.();
            this._renderer.removeChild(this._elementRef.nativeElement, this._tooltipElement);
            this._tooltipElement = null;
        }

        if (this._actionElement !== null) {
            this._renderer.removeChild(this._elementRef.nativeElement, this._actionElement);
            this._actionElement = null;
        }
    }
}
