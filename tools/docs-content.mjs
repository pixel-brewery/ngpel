/**
 * The hand-written prose of every package: the tagline, the feature bullets, the quick start and
 * what deliberately stays in the application. `tools/render-package-docs.mjs` renders it into
 * `libs/<name>/README.md` and `.docs/packages/<name>/index.md`, filling in the mechanical parts
 * (entry points, export counts, peer ranges, layer) from `tools/packages.json` and the barrels.
 */
export const CONTENT = {
    core: {
        tagline:
            'Application foundation: the composition kernel every other package builds on, the RFC 9457 result envelope, and the cross-cutting runtime services each product used to re-solve.',
        features: [
            '**Feature composition** — `provide<Feature>(config?, ...with<Option>())` built on `createFeature`, `composeProviders` and `validateFeatures`, which reject duplicate ids, a second non-multi feature of one kind and declared incompatibilities.',
            '**Result envelope** — `IApiResult` with RFC 9457 problem details, `isProblemDetail` detecting both the problem media type and a problem-shaped body, and `ApiResultError` for the throwing path.',
            '**Event hub** — `provideEventHub` scopes typed events and their listeners to an Angular injector. A configured set of event keys can expose their latest payload through a read-only signal.',
            '**RxJS collection and result helpers** — `loadCompleteOffsetCollection` reads all offset pages sequentially with cancellation and configurable page and item limits. `unwrapApiResultOrThrow` exposes successful data or raises `ApiResultError` with its problem details.',
            '**State helpers** — `BusyScope` for named busy states, `destroyBag` for teardown, `ENV` and `TOAST_VISIBILITY` as host-supplied contracts.',
            '**Cache registrars** — a signal-backed and an RxJS-backed registry with change notifications.',
            '**Calendar days** — `toCalendarDate`, `fromCalendarDate` and `normalizeCalendarDate` preserve date-only fields and read older ISO values.',
            '**Image uploads** — `ImageUploadPreparationService` preserves files within the byte limit and resizes and encodes larger images in the browser.',
            '**Audio** — `AudioLevelMonitor` measures a borrowed microphone stream without stopping its tracks; the worklet loader can use a same-origin asset.',
            '**Contextual create actions** — `provideQuickCreate` and `withQuickCreateItems` collect feature actions and resolve what is available at the time of lookup or execution.',
            '**Operation queue** — `provideOperationQueue` gives Angular applications delayed optimistic operations with rollback, retry, lifecycle events and a stable idempotency key.',
            '**Search** — provider results can arrive progressively in registry order. Cancellation discards superseded results, and activation rechecks availability and access.',
            '**Concerns as subpaths** — RxJS operators, storage, browser ports, notifications, updates, audio, search and the operation queue, each tree-shakable on its own.',
        ],
        quickStart: `import { type ApplicationConfig } from '@angular/core';
import { composeProviders, createFeature, featureKind, type IFeature } from '@pixel-brewery/ngpel-core';

type ThemeKind = 'palette';
const ThemeKinds = { Palette: featureKind<ThemeKind>('palette') } as const;

export function withPalette(name: string): IFeature<ThemeKind> {
    return createFeature('palette', ThemeKinds.Palette, [{ provide: PALETTE, useValue: name }]);
}

export function provideTheme(...features: ReadonlyArray<IFeature<ThemeKind>>): EnvironmentProviders {
    return makeEnvironmentProviders(composeProviders([ThemeService], features));
}

// Composed once in the application configuration:
export const appConfig: ApplicationConfig = { providers: [provideTheme(withPalette('joy'))] };`,
        productSide:
            'Environment values, API roots, themes, translation keys, permission catalogues and every product feature registration stay in the application.',
    },
    mvp: {
        tagline:
            'The Model-View-Presenter pattern as a package: a presenter base class, behaviors that compose onto it, the view host that resolves the presenter, and the command and ref primitives they are built from.',
        features: [
            '**Presenters** — `ViewPresenter` owns the lifecycle: an `initialize()`/`dispose()` pair, a loading counter, an abort signal per run and subscription bookkeeping.',
            '**Behaviors** — `Closeable`, `Hydratable`, `Lockable`, `Pageable`, `Refreshable`, `Mentionable` and `Trackable` add composable capabilities; `withUndoRedo` connects a tracked model to undo/redo commands.',
            '**Views** — `View` resolves its presenter through `VIEW_PRESENTER`, so a component never constructs one itself.',
            '**Commands** — `command`, `asyncCommand`, `asyncAwaitCommand` and `compositeCommand`: an executable with a `canExecute` signal that reports its own loading state.',
            '**Controllers** — `usePresenterController` binds a behavior-only unit to the presenter that created it, `useController` does the same for a component.',
            '**Mentions** — `ViewMentionRegistry` registers selectable view context, supports contributor sources and removes registrations with their presenter.',
            '**Item actions** — `ViewItemActionRegistry` composes feature actions for a mentionable view. `ViewItemActionable` resolves current items and checks availability and choice state at activation.',
            '**Signals** — `SignalSubject`, signal `pipe`/`map` and `trackableSignal` provide observation, derived state and bounded undo/redo history.',
            '**Refs** — `LoadingRef`, `AbortRef`, `DisposableRef`, `InitializableRef` and `LockRef`, the structural vocabulary presenters, behaviors and commands share.',
        ],
        quickStart: `import { Component, Injectable, signal } from '@angular/core';
import { command, type Command, View, VIEW_PRESENTER, ViewPresenter } from '@pixel-brewery/ngpel-mvp';

@Injectable()
export class OrderListViewPresenter extends ViewPresenter {
    private readonly _orders = signal<ReadonlyArray<IOrder>>([]);

    public readonly reload: Command<void> = command(() => this.load());

    public get orders(): Signal<ReadonlyArray<IOrder>> {
        return this._orders.asReadonly();
    }
}

@Component({
    selector: 'app-order-list',
    providers: [{ provide: VIEW_PRESENTER, useClass: OrderListViewPresenter }],
    template: \`<button type="button" (click)="presenter.reload.execute()">Reload</button>\`,
})
export class OrderListView extends View<OrderListViewPresenter> {}`,
        productSide: 'The presenters themselves, their API calls and every view template stay in the application; this package only supplies the pattern.',
    },
    ui: {
        tagline:
            'The presentation layer: every component, directive and pipe the products share — the AI surfaces, the media and file components, the collection view, the guided tour and the dashboard widget grid — plus a safe markdown pipeline.',
        features: [
            '**AI surfaces** — the AI beam that marks AI-produced content (one shared frame-rate-capped loop for the whole page), the AI rail with its choice, configuration and result sections, the AI presentation directive and the typewriter.',
            '**Voice and audio** — a live waveform, an activity orb, a signal-quality indicator, the session controls, the immersive session shell with separate preparation and session content and optional idle controls, and the voice-recorder bridge onto the recorder of `ngpel-core`.',
            '**Collections** — table, flow, gallery and calendar views, persisted table column widths and visibility, managed list rows with loading and contextual actions, numeric and named filters, and CSV/Excel export.',
            '**Forms and decisions** — configurable entity and color pickers, asynchronous input suggestions, dynamic radio and multiple-choice fields, nested condition groups, stacked compound editors, URL lists, agreement prompts and recurrence editing.',
            '**Media and files** — file cards, lists and inline chips, image crop, markup and preview, an image editor, and a document drawer with retry, download and optional PDF rendering supplied by the host.',
            '**Shell and navigation** — a composable navigation bar with an accessible collapse control, a separate collapsible navigation panel with a narrow-screen overlay, responsive toolbar actions, registered page paths, rails, content navigation and the floating host. Connect `NavigationCollapseToggleComponent` to `createSideNavigationController` from `ngpel-router/shell` for a persisted desktop preference.',
            '**Context drawers** — compose `provideContextOverlayRouting` with `provideContextDrawerTarget` and the application’s Mosaik drawer provider. The feature supplies its allowed modes, lazy content and how to turn the ID and context into drawer data. `resolveDetailData` can restore that data from a direct link.',
            '**Context menus** — `ngp-context-menu` renders a caller-owned Mosaik menu for one item. Use `ngpContextMenuTriggerFor` on an item with `ngpContextMenuValue`, or directly on a Mosaik data table to resolve the row under the pointer. Right-click, the context-menu key and Shift+F10 open the menu. Set `ngpContextMenuOpenOnClick` on a visible action button for touch and pointer use.',
            '**Activity** — a paged timeline with projected entries and optional read markers, long-text comparisons, and themed chart options with escaped tooltips.',
            '**Guided tour** — tour contributions, anchors and the `provideTour()` composition over the Mosaik tour overlay.',
            '**Display pipes and directives** — byte sizes, initials, truncation, hash colours, links, plus pseudo links, hover-reveal, event-propagation stops, infinite scroll, eye dropper and scroll-to-error.',
            '**Markdown** — a hardened string pipeline and a semantic Angular renderer for documents, compact previews and editor preview hooks. Raw HTML is rendered as text.',
            '**Widgets** — the dashboard widget registry, the editable widget grid with drag and resize, value summaries with optional hints, and a framework-free layout algebra with a versioned codec.',
            '**Google Maps adapter** — the optional `/google-maps` import handles browser script loading, projected map content and viewport bounds. The host provides its own key and data loaders.',
        ],
        quickStart: `import { Component } from '@angular/core';
import { BytesPipe, InitialsPipe, PseudoLinkDirective } from '@pixel-brewery/ngpel-ui';

@Component({
    selector: 'app-file-row',
    imports: [BytesPipe, InitialsPipe, PseudoLinkDirective],
    template: \`
        <span>{{ file.owner | ngpInitials }}</span>
        <span [ngpPseudoLink]="file.url">{{ file.name }}</span>
        <span>{{ file.size | ngpBytes }}</span>
    \`,
})
export class FileRowComponent {}`,
        productSide:
            'Theme tokens, the translation catalogue behind the `provide*Intl()` providers, product-specific layouts and every domain view stay in the application. Mosaik and CodeMirror are optional peers: install them only for the components that render through them.',
    },
    forms: {
        tagline: 'Signal Forms validators, the async validator helpers, the status-class map all three products duplicated, and the password-strength service.',
        features: [
            '**Validators** — IBAN with a mod-97 check and a country-length table, BIC, email, hostname, HTTP and HTTPS URLs, UUID, hex colour, country, currency and language-region codes, ports, safe integers, decimal places, dates and cross-field comparisons.',
            '**Dynamic and trimmed values** — `allowedValue` accepts a static list or a resolver that reads other fields or signals; `trimmedMinLength` and `trimmedMaxLength` ignore surrounding whitespace.',
            '**Typed errors** — every validator ships its own `I*ValidationError` shape, so a template can react to the specific failure rather than a boolean.',
            '**Async helpers** — `useAsyncValidator` and its debounced variant, both honouring the shared `when` option.',
            '**Status classes** — `NG_STATUS_CLASSES` wires `provideSignalFormsConfig` in one line.',
            '**Password strength** — a configurable rule set with thresholds and a score signal.',
        ],
        quickStart: `import { form, schema } from '@angular/forms/signals';
import { emailAddress, iban, NG_STATUS_CLASSES, trimmedMinLength } from '@pixel-brewery/ngpel-forms';

const paymentSchema = schema<IPayment>((path) => {
    emailAddress(path.email);
    iban(path.iban);
    trimmedMinLength(path.reference, 3);
});

// Once, in the application configuration:
provideSignalFormsConfig({ classes: NG_STATUS_CLASSES });`,
        productSide: 'Locale-specific catalogues such as academic titles, and any validator bound to a product domain, stay in the application.',
    },
    router: {
        tagline:
            'Route path construction and URL-backed signals, the navigation item registry with its handle scheme, and the responsive application shell controller.',
        features: [
            '**Route paths** — `RoutePath` builds and parses paths without pulling the router, so unauthenticated route files stay light.',
            '**URL state** — `routeParamSignal` and `queryParamSignal` back a signal with the URL, using the codecs from `ngpel-core/storage`.',
            '**Context overlays** — `provideContextOverlayRouting` coordinates lazy targets and browser history on application-selected paths. The URL uses `overlay`, `overlayId` and `overlayContext`, with numeric suffixes for further layers. Inject `ContextOverlayUrl` to build a shareable link with `add` or a return link with `remove`. `ContextOverlayService.closed` emits the address after an interactive close, and `closedOutcome` includes the result.',
            '**Titles and journal** — a route-data title strategy with an injected text resolver, plus a navigator that records where the user came from.',
            '**Navigation registry** — items, guards and a handle scheme (`route:`, `ext:`, `cmd:`) with a dispatcher whose window access is a port.',
            '**Resource links** — features register canonical URLs for named resources with `provideResourceNavigationTarget`. Use `ResourceNavigationRegistry` from `/navigation` to resolve a target key or a source alias and build links to pages or drawers.',
            '**Shell** — a side-navigation controller driven by media queries and persisted through the storage port, and a presentation routes factory.',
        ],
        quickStart: `import { provideRouter } from '@angular/router';
import { RoutePath } from '@pixel-brewery/ngpel-router';
import { provideNavigation, withNavigationItems } from '@pixel-brewery/ngpel-router/navigation';
import { presentationRoutes } from '@pixel-brewery/ngpel-router/shell';

export const ORDERS = RoutePath.create('orders');

export const appConfig = {
    providers: [
        provideRouter(presentationRoutes([orderRoutes], { main: 'orders' })),
        provideNavigation(withNavigationItems([{ id: 'orders', label: 'Orders', handle: \`route:\${ORDERS.path}\`, order: 10 }])),
    ],
};`,
        productSide: 'Route tables, labels, icons, ordering values and the branded system pages stay in the application.',
    },
};
