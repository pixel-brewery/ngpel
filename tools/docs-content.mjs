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
            '**State helpers** — `BusyScope` for named busy states, `destroyBag` for teardown, `ENV` and `TOAST_VISIBILITY` as host-supplied contracts.',
            '**Cache registrars** — a signal-backed and an RxJS-backed registry with change notifications.',
            '**Concerns as subpaths** — RxJS operators, storage, browser ports, notifications, updates, audio and search, each tree-shakable on its own.',
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
            '**Voice and audio** — a live waveform, an activity orb, a signal-quality indicator, the session controls, the immersive session shell and the voice-recorder bridge onto the recorder of `ngpel-core`.',
            '**Collections** — a declarative collection view with table, flow, gallery and calendar variants, field definitions, the filter bar with saved filters, and CSV/Excel export.',
            '**Media and files** — file cards and lists, image crop, markup and preview, an image editor and the file-source picker.',
            '**Shell and navigation** — rails, sections, page toolbars, navigation menus, content navigation with an outline, the back-to-top control and the floating host.',
            '**Guided tour** — tour contributions, anchors and the `provideTour()` composition over the Mosaik tour overlay.',
            '**Display pipes and directives** — byte sizes, initials, truncation, hash colours, links, plus pseudo links, hover-reveal, event-propagation stops, infinite scroll, eye dropper and scroll-to-error.',
            '**Markdown** — a hardened pipeline over `marked` and `markdowner-core` that escapes ampersands first, drops raw HTML to text and rejects unsafe URL schemes.',
            '**Widgets** — the dashboard widget registry, the editable widget grid with drag and resize, and a framework-free layout algebra with a versioned codec.',
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
            '**Titles and journal** — a route-data title strategy with an injected text resolver, plus a navigator that records where the user came from.',
            '**Navigation registry** — items, guards and a handle scheme (`route:`, `ext:`, `cmd:`) with a dispatcher whose window access is a port.',
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
