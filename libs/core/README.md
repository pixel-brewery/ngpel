# @pixel-brewery/ngpel-core

Application foundation: the composition kernel every other package builds on, the RFC 9457 result envelope, and the cross-cutting runtime services each product used to re-solve.

## Features

- **Feature composition** — `provide<Feature>(config?, ...with<Option>())` built on `createFeature`, `composeProviders` and `validateFeatures`, which reject duplicate ids, a second non-multi feature of one kind and declared incompatibilities.
- **Result envelope** — `IApiResult` with RFC 9457 problem details, `isProblemDetail` detecting both the problem media type and a problem-shaped body, and `ApiResultError` for the throwing path.
- **State helpers** — `BusyScope` for named busy states, `destroyBag` for teardown, `ENV` and `TOAST_VISIBILITY` as host-supplied contracts.
- **Cache registrars** — a signal-backed and an RxJS-backed registry with change notifications.
- **Calendar days** — `toCalendarDate`, `fromCalendarDate` and `normalizeCalendarDate` preserve date-only fields and read older ISO values.
- **Image uploads** — `ImageUploadPreparationService` preserves files within the byte limit and resizes and encodes larger images in the browser.
- **Audio** — `AudioLevelMonitor` measures a borrowed microphone stream without stopping its tracks; the worklet loader can use a same-origin asset.
- **Contextual create actions** — `provideQuickCreate` and `withQuickCreateItems` collect feature actions and resolve what is available at the time of lookup or execution.
- **Operation queue** — `provideOperationQueue` gives Angular applications delayed optimistic operations with rollback, retry, lifecycle events and a stable idempotency key.
- **Concerns as subpaths** — RxJS operators, storage, browser ports, notifications, updates, audio, search and the operation queue, each tree-shakable on its own.

## Import Options

```typescript
// @pixel-brewery/ngpel-core — 35 exports
import { ApiResultError, BusyScope, BusyScopeService, composeProviders, composeWithBase, createFeature /* … */ } from '@pixel-brewery/ngpel-core';

// @pixel-brewery/ngpel-core/rx — 9 exports
import {
    guardImplicitCloseAttempts,
    IAttentionRequestRef,
    IMatchHandlers,
    IPreventableCloseAttempt,
    IReactiveCacheChange,
    matchResult /* … */,
} from '@pixel-brewery/ngpel-core/rx';

// @pixel-brewery/ngpel-core/storage — 35 exports
import {
    booleanCodec,
    BROWSER_STORAGE,
    BrowserStorageArea,
    BrowserStorageFeatureKind,
    BrowserStorageFeatureKinds,
    enumCodec /* … */,
} from '@pixel-brewery/ngpel-core/storage';

// @pixel-brewery/ngpel-core/browser — 26 exports
import {
    BrowserFeatureKind,
    BrowserFeatureKinds,
    CLIPBOARD,
    ClipboardService,
    EXTERNAL_LINK_OPENER,
    ExternalLinkService /* … */,
} from '@pixel-brewery/ngpel-core/browser';

// @pixel-brewery/ngpel-core/notification — 29 exports
import {
    AudioNotificationInterceptor,
    ConsoleNotificationInterceptor,
    DEFAULT_NOTIFICATION_SOUND_SETTINGS,
    IAudioNotificationInterceptorConfig,
    IConsoleNotificationInterceptorConfig,
    INotification /* … */,
} from '@pixel-brewery/ngpel-core/notification';

// @pixel-brewery/ngpel-core/update — 31 exports
import {
    DEFAULT_UPDATE_INTL,
    DefaultUpdateHandlerStrategy,
    IUpdateConfig,
    IUpdateEvent,
    IUpdateHandlerStrategy,
    IUpdateIntl /* … */,
} from '@pixel-brewery/ngpel-core/update';

// @pixel-brewery/ngpel-core/audio — 50 exports
import {
    AUDIO_INPUT_DEVICE_PREFERENCE_KEY,
    AUDIO_LEVEL_WORKLET_SOURCE,
    AudioFeatureKind,
    AudioFeatureKinds,
    AudioInputDeviceError,
    AudioInputDeviceErrorCode /* … */,
} from '@pixel-brewery/ngpel-core/audio';

// @pixel-brewery/ngpel-core/search — 36 exports
import {
    DefaultSearchRankingStrategy,
    ICommandItem,
    ICommandSource,
    IQuickCreateItem,
    IQuickCreateItemSource,
    isCommandItem /* … */,
} from '@pixel-brewery/ngpel-core/search';

// @pixel-brewery/ngpel-core/operation-queue — 31 exports
import {
    CryptoOperationIdFactory,
    IOperation,
    IOperationClock,
    IOperationContext,
    IOperationDefinition,
    IOperationEntry /* … */,
} from '@pixel-brewery/ngpel-core/operation-queue';
```

## Peer Dependencies

| Package                   | Range                           |
| ------------------------- | ------------------------------- |
| `@angular/core`           | `>=22.0.0 <23.0.0`              |
| `@angular/service-worker` | `>=22.0.0 <23.0.0` _(optional)_ |
| `rxjs`                    | `>=7.8.0 <8.0.0`                |

## Quick Start

```typescript
import { type ApplicationConfig } from '@angular/core';
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
export const appConfig: ApplicationConfig = { providers: [provideTheme(withPalette('joy'))] };
```

## Layer

Layer 0 — depends on nothing from ngpel. A package imports only packages of a strictly lower layer.

## What stays in the application

Environment values, API roots, themes, translation keys, permission catalogues and every product feature registration stay in the application.
