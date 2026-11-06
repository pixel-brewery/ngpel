---
title: '@pixel-brewery/ngpel-core'
generated: true
editUrl: false
---
# @pixel-brewery/ngpel-core

## Classes

| Class | Description |
| ------ | ------ |
| [ApiResultError](Class.ApiResultError) | Error thrown when an API call returns a failure result. Wraps the [IProblemDetail](Interface.IProblemDetail) so callers can inspect the structured error information in their error handler. |
| [AudioInputDeviceError](Class.AudioInputDeviceError) | Typed browser audio-input failure with a stable recovery category. The original browser failure is preserved as the error `cause`. |
| [AudioInputDevicePreferenceService](Class.AudioInputDevicePreferenceService) | Persists the verified microphone selection for the current browser profile. |
| [AudioInputDeviceService](Class.AudioInputDeviceService) | Discovers browser microphones and owns one short-lived, non-recording voice test. |
| [AudioLevelMonitor](Class.AudioLevelMonitor) | Measures a borrowed stream in sample-aligned mono windows at 24 kHz. Provide a separate monitor for each independent capture. Only the analysis graph is owned by the monitor. |
| [AudioLevelWorkletModuleLoader](Class.AudioLevelWorkletModuleLoader) | DI token and strategy for registering the level processor in one Web Audio context. By default the browser loads a temporary blob URL. Hosts can provide a loader for a static [AUDIO\_LEVEL\_WORKLET\_SOURCE](Variable.AUDIO_LEVEL_WORKLET_SOURCE) asset under their content security policy. |
| [AudioNotificationInterceptor](Class.AudioNotificationInterceptor) | Plays a sound for a raised notification through the [AudioPlayer](Class.AudioPlayer). Playback is started but never awaited, so a browser that refuses to play unprompted audio slows nothing down: the rejection is reported on the configured diagnostic channel and the notification keeps travelling through the remaining interceptors. |
| [AudioPlayer](Class.AudioPlayer) | Plays seekable audio and externally owned live media streams through one audio element. |
| [AudioRecorder](Class.AudioRecorder) | Owns one microphone and emits bounded, ordered audio chunks while recording remains active. |
| [AudioRecorderError](Class.AudioRecorderError) | Typed browser audio failure suitable for user-facing recovery decisions. The original browser failure is preserved as the error `cause`. |
| [BusyScope](Class.BusyScope) | A strictly typed busy scope holding multiple named busy states, each with its own nested counter (enter/exit). All signals are created up front, so the scope is ready to bind to templates immediately after construction. |
| [BusyScopeService](Class.BusyScopeService) | Factory service for per-component [BusyScope](Class.BusyScope) instances with strict typing. |
| [ClipboardService](Class.ClipboardService) | Default [IClipboard](Interface.IClipboard) adapter over the asynchronous Clipboard API. The platform is reached through the injected `DOCUMENT` only, so the adapter stays free of module globals, can be faked in a `TestBed` and does nothing outside a browser window. |
| [ConsoleNotificationInterceptor](Class.ConsoleNotificationInterceptor) | Writes every raised notification to a diagnostic channel, mapping the severity onto the matching console level. Compose it with `withConsoleNotificationInterceptor()` to keep a record of what a session was told in environments that have no visible notification surface. |
| [CryptoOperationIdFactory](Class.CryptoOperationIdFactory) | Generates operation IDs using the Web Crypto API with a Math.random fallback. |
| [DefaultSearchRankingStrategy](Class.DefaultSearchRankingStrategy) | Default ranking: an exact label match wins over a label prefix, a label prefix over a label substring, and both text fields of lower weight (description, keywords) come last. Items that match nowhere keep their contributed order behind the matches, because the sort is stable. |
| [DefaultUpdateHandlerStrategy](Class.DefaultUpdateHandlerStrategy) | Console-only strategy: reports the lifecycle with the [IUpdateIntl](Interface.IUpdateIntl) texts and never touches the UI. Registered by default when `provideUpdate()` receives no strategy feature. |
| [EventHub](Class.EventHub) | Publishes typed frontend events within an Angular environment injector. Use `inject<EventHub<IApplicationEvents>>(EventHub)` to apply the application's event map. |
| [ExternalLinkService](Class.ExternalLinkService) | Default [IExternalLinkOpener](Interface.IExternalLinkOpener) adapter: `window.open(url, '_blank', 'noopener,noreferrer')` on the injected `DOCUMENT`'s window. The call shape is deliberately fixed and the return value ignored — desktop shells intercept exactly this window-open request to hand the URL to the OS browser, and a fallback to in-app navigation would drive such a shell off-app. |
| [FileDownloadService](Class.FileDownloadService) | Default [IFileDownloader](Interface.IFileDownloader) adapter: a temporary object URL on a detached anchor whose `download` attribute carries the file name, so the browser never derives a suggestion from the object URL. The URL is revoked in a `finally` block, even when the click throws. |
| [ImageUploadPreparationService](Class.ImageUploadPreparationService) | Prepares a browser-selected image for upload. Files within the byte limit retain their bytes and name. |
| [JsonUserPreferenceCodec](Class.JsonUserPreferenceCodec) | JSON preference codec with caller-provided runtime validation. The value is stored as-is; the adapter performs the JSON round trip. |
| [KeepOptimisticOnFailurePolicy](Class.KeepOptimisticOnFailurePolicy) | Failure policy that intentionally does nothing. The operation remains in its optimistic state after a failure. |
| [LocalStorageUnavailableError](Class.LocalStorageUnavailableError) | Error raised when a storage operation cannot be performed because browser storage is unavailable: outside a browser (server-side rendering), when the window denies the storage accessor, or when the host bound `BROWSER_STORAGE` to `null` on purpose. |
| [LocalVoiceTranscriber](Class.LocalVoiceTranscriber) | Browser-based [ILiveVoiceTranscriber](Interface.ILiveVoiceTranscriber) over the Web Speech API. |
| [MediaUrlPipe](Class.MediaUrlPipe) | Resolves backend-owned media paths for template bindings: `[src]="user.avatarUrl | ngpMediaUrl"`. |
| [MediaUrlResolver](Class.MediaUrlResolver) | Resolves backend-owned relative media paths against the configured API origin. Available in the root injector without configuration (pass-through), and re-registered by `provideMediaUrls(...)` so a route-level composition gets its own scoped instance. |
| [NoOperationMergePolicy](Class.NoOperationMergePolicy) | Merge policy that never merges operations. Every enqueued operation creates a new entry. |
| [NotificationInterceptor](Class.NotificationInterceptor) | Base class for a notification sink. It owns the configuration handshake so a subclass only has to answer [NotificationInterceptor.push](Class.NotificationInterceptor#push): the composing `with*` factory calls [NotificationInterceptor.configure](Class.NotificationInterceptor#configure) once, and the options are readable from [NotificationInterceptor.config](Class.NotificationInterceptor#config) afterwards. |
| [NotificationService](Class.NotificationService) | Raises notifications and fans them out to every composed [INotificationInterceptor](Interface.INotificationInterceptor). |
| [NotificationSoundPreviewService](Class.NotificationSoundPreviewService) | Plays a notification sound on demand without raising a notification, so a settings screen can let a user hear what they are about to switch on. It ignores the sound preferences by design — a preview of a silenced severity has to be audible. |
| [NotificationSoundSettingsService](Class.NotificationSoundSettingsService) | Holds the user's notification sound preferences for the running session and answers the gate the [AudioNotificationInterceptor](Class.AudioNotificationInterceptor) consults before it plays anything. |
| [OperationLifecycle](Class.OperationLifecycle) | Reactive stream of operation lifecycle events. |
| [OperationQueue](Class.OperationQueue) | Central operation queue managing enqueue, scheduling, commit, and rollback lifecycle. |
| [QuickCreateManager](Class.QuickCreateManager) | Resolves and executes contextual create actions registered by feature modules. |
| [ReactiveCacheRegistrar](Class.ReactiveCacheRegistrar) | An in-memory key/value registry with observable change notification. Subclass it to build product registries whose consumers react through RxJS streams. |
| [ReplacePendingByMergeKeyPolicy](Class.ReplacePendingByMergeKeyPolicy) | Merge policy that replaces the first pending entry sharing the same [IOperation.mergeKey](Interface.IOperation#mergekey). |
| [RollbackOnFailurePolicy](Class.RollbackOnFailurePolicy) | Failure policy that rolls back the failed operation via OperationExecutor.rollback. |
| [SearchManager](Class.SearchManager) | Environment-wide owner of the search capability: it holds the registered contributors, the surface state every search view binds to, and the querying itself. It is headless — it decides *that* the surface should be open, never *how* it looks. |
| [SearchRankingStrategy](Class.SearchRankingStrategy) | Strategy that orders the items of a search surface. It is used as the DI token of the ranking implementation; `provideSearch()` binds it to `DefaultSearchRankingStrategy` and applications override it by providing their own subclass after the composition root. |
| [SearchSession](Class.SearchSession) | View-independent state of one search surface: the query, the ranked sections, the active item and the loading and error flags. It is deliberately not provided by `provideSearch()` — every surface lists it in its own providers, so a launcher and a full-page surface keep separate state while sharing the one [SearchManager](Class.SearchManager). |
| [ServiceWorkerUpdateSource](Class.ServiceWorkerUpdateSource) | [IUpdateSource](Interface.IUpdateSource) adapter over the Angular service worker: maps `versionUpdates` and `unrecoverable` onto [IUpdateEvent](TypeAlias.IUpdateEvent), derives the [IUpdateStatus](Interface.IUpdateStatus) from that stream and from the outcome of `checkForUpdate()`, and delegates activation to `activateUpdate()`. Requires `provideServiceWorker()` in the application; reports `disabled` when the service worker is not enabled (for example in development builds). |
| [SignalCacheRegistrar](Class.SignalCacheRegistrar) | An in-memory key/value registry with signal-based change notification. Subclass it to build product registries (navigation items, commands, widgets) that templates can observe. |
| [SystemOperationClock](Class.SystemOperationClock) | Clock implementation delegating to Date.now. |
| [TextToSpeechService](Class.TextToSpeechService) | Reads text aloud through the Web Speech API. |
| [UpdateHandlerStrategyBase](Class.UpdateHandlerStrategyBase) | No-op base for [IUpdateHandlerStrategy](Interface.IUpdateHandlerStrategy) implementations: override only the events a strategy cares about. |
| [UpdateManager](Class.UpdateManager) | Drives the update lifecycle: listens to the [IUpdateSource](Interface.IUpdateSource), fans every event out to all registered strategies and exposes check/activate operations that wait for application stability. Created by `provideUpdate()`; inject it to trigger manual checks or to read the status. |
| [WebStorageUserPreferenceStorage](Class.WebStorageUserPreferenceStorage) | Web Storage adapter of the user-preference port. Values are stored as JSON under their key; the codec validates the parsed payload. Backs `withLocalStorage()` and `withSessionStorage()`. |

## Interfaces

| Interface | Description |
| ------ | ------ |
| [IApiFailure](Interface.IApiFailure) | Represents a failed API response with Problem Detail information. |
| [IApiFailureSource](Interface.IApiFailureSource) | Transport-agnostic description of a failed response, the input of [toApiFailure](Function.toApiFailure). HTTP adapters map their native error type (for example Angular's `HttpErrorResponse`) onto this shape; the core stays free of any transport dependency. |
| [IApiSuccess](Interface.IApiSuccess) | Represents a successful API response. |
| [IAttentionRequestRef](Interface.IAttentionRequestRef) | Structural contract of a UI surface (drawer, dialog) that exposes implicit close attempts and can request the user's attention. Typed structurally so any UI kit's surface ref satisfies it. |
| [IAudioInputDevice](Interface.IAudioInputDevice) | Stable, serializable projection of a browser audio-input device. |
| [IAudioInputDevicePreference](Interface.IAudioInputDevicePreference) | Locally persisted, successfully tested audio-input selection. |
| [IAudioLevelMeasurement](Interface.IAudioLevelMeasurement) | One measured window of the mono audio input. |
| [IAudioLevelMonitorOptions](Interface.IAudioLevelMonitorOptions) | Options for monitoring a borrowed audio stream. |
| [IAudioNotificationInterceptorConfig](Interface.IAudioNotificationInterceptorConfig) | Options of the [AudioNotificationInterceptor](Class.AudioNotificationInterceptor). The sound table is the only required part: this package ships no audio assets, so the composing application names its own files. |
| [IAudioPlayOptions](Interface.IAudioPlayOptions) | Per-call playback options. Every option is optional and keeps the player's current setting when omitted, so a caller can start a sound without restating the whole configuration. |
| [IAudioRecorderChunk](Interface.IAudioRecorderChunk) | One ordered audio fragment emitted while recording is still active. |
| [IAudioRecorderStartOptions](Interface.IAudioRecorderStartOptions) | Configures microphone acquisition and incremental browser recording. Every option is optional; an empty object records the default microphone with Opus in WebM at 128 kbit/s, one chunk per second, retained in memory. |
| [IAudioRecordingResult](Interface.IAudioRecordingResult) | Metadata produced when an audio recording ends successfully. |
| [IAudioSource](Interface.IAudioSource) | The audio the [AudioPlayer](Class.AudioPlayer) attaches to its element: a URL, a retained blob, or an externally owned live media stream. Ownership of a stream stays with the caller — the player detaches it but never stops its tracks. |
| [IClipboard](Interface.IClipboard) | Port for writing text to the system clipboard. The outcome is reported instead of swallowed: a rejected write is indistinguishable from a successful one to the user, so the caller owns the confirmation it shows. |
| [ICommandItem](Interface.ICommandItem) | A single executable action offered by the command palette. Features contribute command items either statically through `withSearchCommands({ commands })` or dynamically through a command source, and the surface renders them without knowing the feature that owns them. |
| [ICommandSource](Interface.ICommandSource) | A dynamic contributor of command items. Sources are injectable classes and are asked on every query, so labels and permissions that resolve late (translations, session state) stay current. |
| [IConsoleNotificationInterceptorConfig](Interface.IConsoleNotificationInterceptorConfig) | Options of the [ConsoleNotificationInterceptor](Class.ConsoleNotificationInterceptor). |
| [IExternalLinkOpener](Interface.IExternalLinkOpener) | Port for handing a URL to a new, isolated browsing context from a command context (menus, shortcuts) where no rendered link exists. Rendered links keep using anchors with `target="_blank"`; this port only owns the raw open primitive. |
| [IFeature](Interface.IFeature) | A generic, DI-provider contributing feature. |
| [IFeatureIncompatibilityRule](Interface.IFeatureIncompatibilityRule) | Describes an incompatibility rule between features. If `isViolated()` returns true, composition must fail fast with `message`. |
| [IFeatureOptions](Interface.IFeatureOptions) | Options controlling a feature's composition behavior. |
| [IFileDownloader](Interface.IFileDownloader) | Port for saving in-memory content under an explicit, caller-supplied file name. |
| [IImageUploadPreparationOptions](Interface.IImageUploadPreparationOptions) | Bounds an upload and sets the dimensions used when the image needs re-encoding. |
| [ILiveVoiceTranscriber](Interface.ILiveVoiceTranscriber) | Extends a voice transcriber with a manually controlled live recognition session. |
| [ILocalStorageSignalOptions](Interface.ILocalStorageSignalOptions) | Configures one storage-backed signal. |
| [ILocalVoiceTranscriberOptions](Interface.ILocalVoiceTranscriberOptions) | Configuration of the browser-based [LocalVoiceTranscriber](Class.LocalVoiceTranscriber). |
| [IMatchHandlers](Interface.IMatchHandlers) | Handlers applied by [matchResult](Function.matchResult) to the success and failure branches of an API result. |
| [IMediaUrlOptions](Interface.IMediaUrlOptions) | Configuration of the media URL resolution. |
| [INotification](Interface.INotification) | A raised notification. It is what [NotificationService](Class.NotificationService) materializes from an [INotificationMessage](Interface.INotificationMessage) and hands to every interceptor: identified, timestamped and with every text normalized to a signal, so an interceptor never has to know whether the caller passed a string or a reactive caption. |
| [INotificationInterceptor](Interface.INotificationInterceptor) | A sink every raised notification is fanned out to: a console logger, a sound, a toast. The pipeline is deliberately fire-and-forget — an interceptor reports nothing back, so one sink can never influence another or the raising caller. |
| [INotificationMessage](Interface.INotificationMessage) | What a caller hands to [NotificationService.push](Class.NotificationService#push): the raw message, before an id, a timestamp and a resolved lifetime turn it into an [INotification](Interface.INotification). |
| [INotificationOptions](Interface.INotificationOptions) | The parts of an [INotificationMessage](Interface.INotificationMessage) the typed convenience methods of [NotificationService](Class.NotificationService) do not take positionally. |
| [INotificationSoundPreviewConfig](Interface.INotificationSoundPreviewConfig) | Sound table of the [NotificationSoundPreviewService](Class.NotificationSoundPreviewService). `withAudioNotificationInterceptor()` applies the interceptor's own table, so a preview always plays what the notification would. |
| [IOffsetCollectionLimits](Interface.IOffsetCollectionLimits) | Limits on a complete offset collection load. |
| [IOffsetCollectionPage](Interface.IOffsetCollectionPage) | A page or a combined result from an offset-paginated collection. |
| [IOperation](Interface.IOperation) | Contract for a queued operation that can apply, commit, and rollback. |
| [IOperationClock](Interface.IOperationClock) | Abstraction over the system clock, enabling deterministic testing. |
| [IOperationContext](Interface.IOperationContext) | Runtime context passed to every [IOperation](Interface.IOperation) lifecycle hook. |
| [IOperationDefinition](Interface.IOperationDefinition) | Simplified operation definition. Only [IOperationDefinition.commit](Interface.IOperationDefinition#commit) is required; all other fields are optional and filled with sensible defaults by the [operation](Function.operation) factory. |
| [IOperationEntry](Interface.IOperationEntry) | Internal representation of a queued operation with its lifecycle state. |
| [IOperationFailurePolicy](Interface.IOperationFailurePolicy) | Policy invoked when OperationExecutor.commit throws. |
| [IOperationIdFactory](Interface.IOperationIdFactory) | Strategy for generating unique operation entry identifiers. |
| [IOperationMergePolicy](Interface.IOperationMergePolicy) | Policy responsible for finding a merge target when a new operation is enqueued. |
| [IOperationPolicy](Interface.IOperationPolicy) | Base contract for all operation policies. |
| [IOperationQueueOptions](Interface.IOperationQueueOptions) | Configuration options for the operation queue. |
| [IPreventableCloseAttempt](Interface.IPreventableCloseAttempt) | Close attempt contract for implicit interactions (backdrop click, Escape) that can be cancelled. |
| [IProblemDetail](Interface.IProblemDetail) | RFC 9457 Problem Detail for HTTP APIs. |
| [IQuickCreateItem](Interface.IQuickCreateItem) | Represents a single contextual create action registered by a feature module. |
| [IQuickCreateItemSource](Interface.IQuickCreateItemSource) | Interface for dynamic quick-create item sources (injectable classes). |
| [IReactiveCacheChange](Interface.IReactiveCacheChange) | Describes a single change event emitted by a [ReactiveCacheRegistrar](Class.ReactiveCacheRegistrar). |
| [ISearchConfig](Interface.ISearchConfig) | Behavioural options of the search engine, published through `SEARCH_CONFIG`. |
| [ISearchProvider](Interface.ISearchProvider) | Contract for features that contribute semantic search. A provider searches its own domain objects and activates a result when the user selects it. |
| [ISearchQueryOptions](Interface.ISearchQueryOptions) | Optional observation and cancellation of one search request. |
| [ISearchResult](Interface.ISearchResult) | A semantic search result produced by a search provider. |
| [ISearchResultRendererEntry](Interface.ISearchResultRendererEntry) | Registration of a component that renders the rows of one result kind. The surface instantiates it dynamically and owns the input contract it is bound with; the engine only carries the registration. |
| [ISearchSection](Interface.ISearchSection) | A visual group of the search surface, produced by `SearchSession`. Sections are the rendering unit; flattening them in order yields the keyboard navigation order. |
| [ISignalCacheChange](Interface.ISignalCacheChange) | Describes a single change event emitted by a [SignalCacheRegistrar](Class.SignalCacheRegistrar). |
| [ISignalValidationIssueLike](Interface.ISignalValidationIssueLike) | Structural shape of a Signal Forms validation issue, narrow enough that this package does not depend on the forms package to report one. Each entry of [ISignalValidationIssueLike.errors](Interface.ISignalValidationIssueLike#errors) is inspected for a user-facing message — a string, a signal of a string, or an object carrying either under `message`. |
| [ITextToSpeechOptions](Interface.ITextToSpeechOptions) | Options of one speech synthesis utterance. Every option is optional and falls back to the browser default of the selected voice. |
| [IToastVisibility](Interface.IToastVisibility) | Decides whether the application may present toast notifications. Cross-package contract used by notification interceptors, update strategies and drawers alike; the product supplies the policy. |
| [ITranscriptionInput](Interface.ITranscriptionInput) | The recorded audio handed to a [IVoiceTranscriber](Interface.IVoiceTranscriber). |
| [IUpdateConfig](Interface.IUpdateConfig) | Options of `provideUpdate()`. |
| [IUpdateHandlerStrategy](Interface.IUpdateHandlerStrategy) | Reacts to update lifecycle events. The manager fans every event out to all registered strategies, so a logging strategy and a user-facing one can coexist. |
| [IUpdateIntl](Interface.IUpdateIntl) | User-facing texts of the update lifecycle. Products replace the neutral English defaults through `provideUpdate({ intl })` instead of the package shipping a translation catalogue. |
| [IUpdateManagerOptions](Interface.IUpdateManagerOptions) | Construction options of the [UpdateManager](Class.UpdateManager). |
| [IUpdateNoNewVersionDetectedEvent](Interface.IUpdateNoNewVersionDetectedEvent) | A check completed and the running version is still the latest one. |
| [IUpdateSource](Interface.IUpdateSource) | Port between the update lifecycle and the platform that delivers updates. The service-worker entry point ships an adapter over `SwUpdate`; a desktop application implements it over its IPC channel, a test over a scriptable fake. |
| [IUpdateStatus](Interface.IUpdateStatus) | Snapshot of the update lifecycle as reported by an [IUpdateSource](Interface.IUpdateSource). Only `kind` is mandatory; sources fill in whatever their platform knows. |
| [IUpdateUnrecoverableEvent](Interface.IUpdateUnrecoverableEvent) | The installed version is in a broken state that cannot be repaired without a full reload. |
| [IUpdateVersion](Interface.IUpdateVersion) | Identifies one application version inside an update event. |
| [IUpdateVersionDetectedEvent](Interface.IUpdateVersionDetectedEvent) | A newer version was found and its download is about to start. |
| [IUpdateVersionInstallationFailedEvent](Interface.IUpdateVersionInstallationFailedEvent) | Checking for or downloading a newer version failed. |
| [IUpdateVersionReadyEvent](Interface.IUpdateVersionReadyEvent) | A newer version is fully downloaded and can be activated. |
| [IUserPreferenceStorage](Interface.IUserPreferenceStorage) | Storage port for user-scoped preferences. Adapters decide where preferences live (Web Storage, an Electron bridge, an in-memory map); consumers only see typed reads and writes. |
| [IValueCodec](Interface.IValueCodec) | Converts between a serialized representation and a typed application value. |
| [IVoiceTranscriber](Interface.IVoiceTranscriber) | Port for converting recorded voice audio to text. Implementations decide where recognition happens — in the browser, on a device, or behind an API of the product's own choosing. |
| [IWithQuickCreateItemsOptions](Interface.IWithQuickCreateItemsOptions) | Options for contributing contextual create actions. |
| [IWithSearchCommandsOptions](Interface.IWithSearchCommandsOptions) | Options for contributing palette commands through `withSearchCommands()`. |
| [IWithSearchProvidersOptions](Interface.IWithSearchProvidersOptions) | Options for contributing semantic search providers through `withSearchProviders()`. |
| [IWithSearchRenderersOptions](Interface.IWithSearchRenderersOptions) | Options for contributing result renderers through `withSearchRenderers()`. |

## Type Aliases

| Type Alias | Description |
| ------ | ------ |
| [AudioFeatureKind](TypeAlias.AudioFeatureKind) | The kinds of features `provideAudioRecorder(...)` accepts. `transcriber` is non-multi — exactly one recognition strategy may be registered — while `telemetry` is multi so several observers can follow one recorder. |
| [AudioInputDeviceErrorCode](TypeAlias.AudioInputDeviceErrorCode) | Stable recovery categories for browser audio-input failures. |
| [AudioInputDeviceFeatureKind](TypeAlias.AudioInputDeviceFeatureKind) | The kinds of features `provideAudioInputDevices(...)` accepts. The preference-key kind is non-multi: one composition stores its microphone selection under exactly one key. |
| [AudioInputPermissionState](TypeAlias.AudioInputPermissionState) | Browser permission state for microphone access. `unknown` is the state before the browser was asked, `unsupported` the state of a runtime without media APIs. |
| [AudioInputSignalQuality](TypeAlias.AudioInputSignalQuality) | Normalized quality of the currently sampled microphone signal, derived from its RMS level and its peak amplitude. |
| [AudioInputTestState](TypeAlias.AudioInputTestState) | Lifecycle of the non-recording microphone voice test. |
| [AudioLevelMonitorState](TypeAlias.AudioLevelMonitorState) | Lifecycle of a single audio level monitor. |
| [AudioRecorderErrorCode](TypeAlias.AudioRecorderErrorCode) | Stable failure categories of the browser audio recorder. They exist so a user interface can decide on recovery — ask for permission again, offer another device, fall back to typing — without parsing browser messages. |
| [AudioRecorderState](TypeAlias.AudioRecorderState) | Lifecycle states of a browser audio recording session. `stopping` is entered while the browser still delivers its final chunk, and `disposed` is terminal. |
| [AudioRecordingRetention](TypeAlias.AudioRecordingRetention) | Controls whether emitted chunks are also retained for a final in-memory recording. `none` keeps a long session memory-free for callers that persist or upload every chunk themselves. |
| [BrowserFeatureKind](TypeAlias.BrowserFeatureKind) | The kinds of features `provideBrowser(...)` accepts. Each kind is non-multi: exactly one adapter per capability may be registered. |
| [BrowserStorageArea](TypeAlias.BrowserStorageArea) | The Web Storage areas a browser window exposes. |
| [BrowserStorageFeatureKind](TypeAlias.BrowserStorageFeatureKind) | The feature kinds accepted by `provideBrowserStorage()`. |
| [DestroyBag](TypeAlias.DestroyBag) | A tiny teardown container that hooks into a `DestroyRef` once and lets you register everything else imperatively: subscriptions, output subscriptions or plain callbacks. |
| [DestroyBagTeardown](TypeAlias.DestroyBagTeardown) | A teardown item a [DestroyBag](TypeAlias.DestroyBag) can own: anything with an `unsubscribe()` method (RxJS subscriptions, Angular output subscriptions) or a plain callback. |
| [EnvExport](TypeAlias.EnvExport) | The shape of environment variables exposed to the application through the [ENV](Variable.ENV) token: a flat, string-valued record such as the one produced by a build-time `.env` export. |
| [FeatureKind](TypeAlias.FeatureKind) | Represents a branded string for feature kinds to prevent accidental mixing of arbitrary strings. |
| [IApiResult](TypeAlias.IApiResult) | Discriminated union type for API responses. Narrow through the `success` discriminator. |
| [IOperationInput](TypeAlias.IOperationInput) | Flexible input for [OperationQueue.enqueue](Class.OperationQueue#enqueue). Accepts either a full [IOperation](Interface.IOperation) or a simplified [IOperationDefinition](Interface.IOperationDefinition). |
| [IUpdateEvent](TypeAlias.IUpdateEvent) | Discriminated union of every event an [IUpdateSource](Interface.IUpdateSource) can emit. It replaces the `@angular/service-worker` event classes in the strategy contract, so the primary entry point has no service-worker dependency and any platform can implement the port. |
| [IUserPreferenceCodec](TypeAlias.IUserPreferenceCodec) | A codec over the JSON payload of a user preference. The storage adapter owns the JSON serialization, so the codec sees the parsed payload as `unknown` and must validate it. |
| [LocalStorageCodec](TypeAlias.LocalStorageCodec) | A codec over the string representation of Web Storage (`localStorage`/`sessionStorage`). Every built-in codec of this package (`stringCodec`, `booleanCodec`, `jsonCodec`, ...) has this shape; `fromNullable` lifts it to `string | null` for URL parameters. |
| [LocalStorageOperation](TypeAlias.LocalStorageOperation) | Identifies the storage operation that failed. |
| [LocalStorageSignal](TypeAlias.LocalStorageSignal) | A storage-backed Angular signal. `set()`, `update()` and `clear()` synchronously write the storage first and then the signal; other instances on the same key in this document are notified directly, other documents through the browser `storage` event. |
| [MediaUrlFeatureKind](TypeAlias.MediaUrlFeatureKind) | The kinds of features `provideMediaUrls(...)` accepts. The origin kind is non-multi: exactly one origin source may be registered per composition. |
| [NotificationDuration](TypeAlias.NotificationDuration) | How long a notification stays relevant. Interceptors that render transient user interface use it as their timeout, and [NotificationService](Class.NotificationService) uses it as the window within which an identical message is deduplicated instead of raised twice. |
| [NotificationFeatureKind](TypeAlias.NotificationFeatureKind) | The kind vocabulary of the notification composition root. Both kinds are single: one console sink and one audio sink per composition, so a duplicated `with*` call is rejected instead of quietly doubling every log line or playing a sound twice. |
| [NotificationSoundSettingKey](TypeAlias.NotificationSoundSettingKey) | The severities a user can silence individually. [NotificationType.None](Variable.NotificationType#property-none) has no key: an ungraded notification is never gated by a sound preference. |
| [NotificationSoundSettings](TypeAlias.NotificationSoundSettings) | Whether a notification sound is wanted, per severity a user can silence. |
| [NotificationText](TypeAlias.NotificationText) | Text of a notification. A plain string is the simple case; a signal lets a translated or otherwise reactive caption keep updating after the notification was raised, which matters for a notification history that outlives a language switch. |
| [NotificationType](TypeAlias.NotificationType) | Union of the [NotificationType](Variable.NotificationType) values. |
| [OperationLifecycleEvent](TypeAlias.OperationLifecycleEvent) | Discriminated union of all lifecycle events emitted by the operation queue. |
| [OperationPolicyKind](TypeAlias.OperationPolicyKind) | Discriminator for policy categories. |
| [OperationQueueFeatureKind](TypeAlias.OperationQueueFeatureKind) | Discriminated union of feature kinds supported by the operation queue. |
| [OperationStatus](TypeAlias.OperationStatus) | Union of all possible lifecycle states for an [IOperationEntry](Interface.IOperationEntry). |
| [ReactiveCacheChangedReason](TypeAlias.ReactiveCacheChangedReason) | Union of the [ReactiveCacheChangedReason](Variable.ReactiveCacheChangedReason) values. |
| [ReadonlyDeep](TypeAlias.ReadonlyDeep) | Recursively marks `T` and everything reachable from it as `readonly`. Dates, regular expressions and functions keep their identity instead of being mapped structurally. |
| [SearchFeatureKind](TypeAlias.SearchFeatureKind) | The kind vocabulary of the search composition root. All three kinds are multi: any number of features may contribute commands, providers and renderers. |
| [SearchSectionLayout](TypeAlias.SearchSectionLayout) | Determines how a search section arranges its items. |
| [SignalCacheChangedReason](TypeAlias.SignalCacheChangedReason) | Union of the [SignalCacheChangedReason](Variable.SignalCacheChangedReason) values. |
| [UpdateFeatureKind](TypeAlias.UpdateFeatureKind) | Feature kinds accepted by `provideUpdate()`: exactly one update source and any number of handler strategies. |
| [UpdateStatusKind](TypeAlias.UpdateStatusKind) | Source-agnostic lifecycle phases of an application update. The vocabulary is distilled from the desktop update state so a service worker, an Electron auto-updater or a mobile channel can report through the same [IUpdateStatus](Interface.IUpdateStatus). |
| [UserPreferenceFeatureKind](TypeAlias.UserPreferenceFeatureKind) | The feature kinds accepted by `provideUserPreferences()`. |

## Variables

| Variable | Description |
| ------ | ------ |
| [AUDIO\_INPUT\_DEVICE\_PREFERENCE\_KEY](Variable.AUDIO_INPUT_DEVICE_PREFERENCE_KEY) | Injection token carrying the user-preference key the [AudioInputDevicePreferenceService](Class.AudioInputDevicePreferenceService) stores its selection under. It defaults to a neutral, versioned key; a product that already persists a microphone under its own key keeps that key by composing `provideAudioInputDevices(withAudioInputDevicePreferenceKey('acme.audio.input-device.v1'))` instead of migrating the stored value. |
| [AUDIO\_LEVEL\_WORKLET\_SOURCE](Variable.AUDIO_LEVEL_WORKLET_SOURCE) | JavaScript source for the level monitor's AudioWorklet module. A host with a restrictive content security policy can write this string to a same-origin asset and load it with its own `AudioLevelWorkletModuleLoader`. |
| [AudioFeatureKinds](Variable.AudioFeatureKinds) | The branded kind vocabulary of the audio entry point. Products that ship their own recognition strategy create features with these kinds, so the kernel still rejects a second transcriber. |
| [AudioInputDeviceFeatureKinds](Variable.AudioInputDeviceFeatureKinds) | The branded kind vocabulary of the audio-input device composition. |
| [BROWSER\_STORAGE](Variable.BROWSER_STORAGE) | The single storage seam of ngpel. Defaults to the `localStorage` of the injected `DOCUMENT`'s window (SSR-safe: `null` when there is no window or the accessor throws). Hosts that need a different backing store (Electron, Capacitor, tests) bind it through `provideBrowserStorage(withStorage(...))`; `localStorageSignal` and the user-preference adapter of `withLocalStorage()` both resolve through it. |
| [BrowserFeatureKinds](Variable.BrowserFeatureKinds) | The branded kind vocabulary of the browser package. Products that ship their own adapter (for example an IPC-backed clipboard in a desktop shell) create features with these kinds so the kernel still rejects duplicate registrations. |
| [BrowserStorageFeatureKinds](Variable.BrowserStorageFeatureKinds) | Branded feature kinds of `provideBrowserStorage()`. Co-located with the type because both describe the same vocabulary. |
| [CLIPBOARD](Variable.CLIPBOARD) | Injection token for the [IClipboard](Interface.IClipboard) port. Registered by `withClipboard()` through `provideBrowser(...)`; nothing is registered by default, so a missing composition surfaces as a `NullInjectorError` instead of a silently inert clipboard. |
| [DEFAULT\_NOTIFICATION\_SOUND\_SETTINGS](Variable.DEFAULT_NOTIFICATION_SOUND_SETTINGS) | Sound preferences a session starts with: every severity audible, so a product that never wires persistence still behaves as its sound table describes. |
| [DEFAULT\_UPDATE\_INTL](Variable.DEFAULT_UPDATE_INTL) | Neutral English texts used until a product overrides them through `provideUpdate({ intl })`. |
| [ENV](Variable.ENV) | Injection token carrying the application's environment variables. Products provide it at the composition root, for example `{ provide: ENV, useValue: environment }`. |
| [EXTERNAL\_LINK\_OPENER](Variable.EXTERNAL_LINK_OPENER) | Injection token for the [IExternalLinkOpener](Interface.IExternalLinkOpener) port. Registered by `withExternalLinks()` through `provideBrowser(...)`. |
| [FILE\_DOWNLOADER](Variable.FILE_DOWNLOADER) | Injection token for the [IFileDownloader](Interface.IFileDownloader) port. Registered by `withFileDownload()` through `provideBrowser(...)`. |
| [LOCAL\_VOICE\_TRANSCRIBER\_OPTIONS](Variable.LOCAL_VOICE_TRANSCRIBER_OPTIONS) | Injection token carrying the [ILocalVoiceTranscriberOptions](Interface.ILocalVoiceTranscriberOptions). Registered by `withLocalTranscriber(...)`; when absent, the [LocalVoiceTranscriber](Class.LocalVoiceTranscriber) falls back to its documented defaults. |
| [LONG\_DURATION](Variable.LONG_DURATION) | Lifetime of a `'long'` notification in milliseconds, for messages a user has to be able to read and act on before they disappear. |
| [MEDIA\_URL\_OPTIONS](Variable.MEDIA_URL_OPTIONS) | Injection token carrying the [IMediaUrlOptions](Interface.IMediaUrlOptions). Registered by `withApiOrigin(...)` through `provideMediaUrls(...)`; when absent, media paths are passed through unchanged. |
| [MediaUrlFeatureKinds](Variable.MediaUrlFeatureKinds) | The branded kind vocabulary of the media entry point, exposed so products can contribute their own origin features (for example a tenant-aware origin) that still conflict with `withApiOrigin()`. |
| [nonEmptyStringCodec](Variable.nonEmptyStringCodec) | Accepts meaningful textual values while rejecting empty or whitespace-only persisted state. Values are trimmed on both sides of the boundary. |
| [nonNegativeIntegerCodec](Variable.nonNegativeIntegerCodec) | Persists zero-based offsets and counters as safe integers (`0`, `1`, ...). Only the canonical decimal representation parses, matching `positiveIntegerCodec`: a padded `"007"` did not come from this codec and is treated as foreign data rather than silently coerced. |
| [NOTIFICATION\_INTERCEPTORS](Variable.NOTIFICATION_INTERCEPTORS) | Multi-provider token of the sinks [NotificationService](Class.NotificationService) fans every raised notification out to. Each `with*NotificationInterceptor()` feature contributes one configured interceptor. |
| [NotificationKinds](Variable.NotificationKinds) | Branded feature kinds accepted by `provideNotification()`. |
| [NotificationType](Variable.NotificationType) | Severity of a notification. `None` is the neutral grade a message without an explicit type receives, so every interceptor has to answer for it; it is deliberately the empty string, which keeps a missing severity falsy for consumers that only care whether one was stated. |
| [OperationQueueFeatureKinds](Variable.OperationQueueFeatureKinds) | Branded feature kind constants for the operation queue. |
| [positiveIntegerCodec](Variable.positiveIntegerCodec) | Persists positive identifiers and one-based pagination values as safe integers (`1`, `2`, ...). |
| [PROBLEM\_DETAIL\_MEDIA\_TYPE](Variable.PROBLEM_DETAIL_MEDIA_TYPE) | The media type under which RFC 9457 problem details are served (`application/problem+json`). Mirrors the backend constant published by Archipel's `ProblemDetailResponse.MEDIA_TYPE`. |
| [ReactiveCacheChangedReason](Variable.ReactiveCacheChangedReason) | The reason a [ReactiveCacheRegistrar](Class.ReactiveCacheRegistrar) reported a change. |
| [SEARCH\_ALL\_QUERY](Variable.SEARCH_ALL_QUERY) | Sentinel query understood by `SearchManager.getCommands()`, `SearchManager.search()` and `SearchManager.query()`: it asks for the complete catalogue instead of a filtered match. The manager never forwards the sentinel — command sources and search providers are called with an empty query, which is their documented "return everything you have" input. |
| [SEARCH\_COMMAND\_SOURCE\_TOKEN](Variable.SEARCH_COMMAND_SOURCE_TOKEN) | Multi-provider token for dynamic command sources. Every registered source class contributes one batch, so the injected value is a list of batches which the manager flattens. |
| [SEARCH\_COMMAND\_TOKEN](Variable.SEARCH_COMMAND_TOKEN) | Multi-provider token for statically contributed command items. Every `withSearchCommands()` feature contributes one batch — the commands of one feature — so the injected value is a list of batches which the manager flattens. |
| [SEARCH\_CONFIG](Variable.SEARCH_CONFIG) | Configuration of the search engine, published by `provideSearch(config, ...)`. Both the manager and every session read it optionally, so the engine also works without it. |
| [SEARCH\_PROVIDER\_TOKEN](Variable.SEARCH_PROVIDER_TOKEN) | Multi-provider token for semantic search providers. Every registered provider class contributes one batch, so the injected value is a list of batches which the manager flattens. |
| [SEARCH\_RESULT\_RENDERER\_TOKEN](Variable.SEARCH_RESULT_RENDERER_TOKEN) | Multi-provider token for custom result renderers. Every `withSearchRenderers()` feature contributes one batch of entries, so the injected value is a list of batches which the surface flattens. |
| [SearchKinds](Variable.SearchKinds) | Branded feature kinds accepted by `provideSearch()`. |
| [SHORT\_DURATION](Variable.SHORT_DURATION) | Lifetime of a `'short'` notification in milliseconds. It is also the lifetime of a message that states no duration at all. |
| [SignalCacheChangedReason](Variable.SignalCacheChangedReason) | The reason a [SignalCacheRegistrar](Class.SignalCacheRegistrar) reported a change. |
| [stringCodec](Variable.stringCodec) | Preserves plain text values unchanged. |
| [TOAST\_VISIBILITY](Variable.TOAST_VISIBILITY) | Application-level toast visibility policy. Defaults to a policy that always allows toasts; products override it to suppress toasts, for example while a modal surface is open. |
| [UPDATE\_CHECK\_ON\_START](Variable.UPDATE_CHECK_ON_START) | Whether the manager runs a check as soon as the application is stable. Set by `provideUpdate({ checkOnStart })`. |
| [UPDATE\_INTL](Variable.UPDATE_INTL) | Injection token carrying the [IUpdateIntl](Interface.IUpdateIntl) texts. Falls back to [DEFAULT\_UPDATE\_INTL](Variable.DEFAULT_UPDATE_INTL) so strategies work without any configuration; `provideUpdate({ intl })` overrides it. |
| [UPDATE\_SOURCE](Variable.UPDATE_SOURCE) | Injection token of the single [IUpdateSource](Interface.IUpdateSource) the manager listens to. Registered by `withUpdateSource()` or an adapter feature such as `withServiceWorkerUpdateSource()`. |
| [UPDATE\_STRATEGIES](Variable.UPDATE_STRATEGIES) | Multi-provider token of the registered [IUpdateHandlerStrategy](Interface.IUpdateHandlerStrategy) instances. Every event is dispatched to all of them in registration order. |
| [UpdateKinds](Variable.UpdateKinds) | Branded [UpdateFeatureKind](TypeAlias.UpdateFeatureKind) values for feature authors. |
| [USER\_PREFERENCE\_STORAGE](Variable.USER_PREFERENCE_STORAGE) | Injection token of the active user-preference storage adapter. It has no default factory on purpose: importing the token must not pull any adapter into the bundle. Bind it through `provideUserPreferences(withLocalStorage())`, `withSessionStorage()` or `withUserPreferenceStorage(() => adapter)`. |
| [UserPreferenceFeatureKinds](Variable.UserPreferenceFeatureKinds) | Branded feature kinds of `provideUserPreferences()`. Co-located with the type because both describe the same vocabulary. |
| [VOICE\_TRANSCRIBER](Variable.VOICE_TRANSCRIBER) | Injection token of the active [IVoiceTranscriber](Interface.IVoiceTranscriber). It has no default factory on purpose: importing the token must not pull a recognition strategy into the bundle. Bind it through `provideAudioRecorder(withLocalTranscriber())` or `withVoiceTranscriber(...)`; while it is unbound, transcription is simply unavailable and the recorder still records. |

## Functions

| Function | Description |
| ------ | ------ |
| [booleanCodec](Function.booleanCodec) | Creates a codec that persists boolean values with explicit textual representations. |
| [composeProviders](Function.composeProviders) | Composes base providers with validated feature providers. |
| [composeWithBase](Function.composeWithBase) | Convenience to compose a **single** base provider with features. |
| [createFeature](Function.createFeature) | Factory to create a typed feature from metadata and static providers. |
| [destroyBag](Function.destroyBag) | Creates a new destroy bag tied to a `DestroyRef`. Co-located with the [DestroyBag](TypeAlias.DestroyBag) type because a separate `destroyBag.ts` would collide with `DestroyBag.ts` on case-insensitive file systems. |
| [enumCodec](Function.enumCodec) | Creates a codec that restricts a persisted string to a compile-time union of allowed values. |
| [featureKind](Function.featureKind) | Brands a plain string literal as a [FeatureKind](TypeAlias.FeatureKind). Co-located with the type because a separate `featureKind.ts` would collide with `FeatureKind.ts` on case-insensitive file systems. |
| [fromCalendarDate](Function.fromCalendarDate) | Creates the local date shown by a date control for a stored calendar day. |
| [fromNullable](Function.fromNullable) | Lifts a codec so that it also accepts `null` as an absent serialized value. This lets the same validators that back Web Storage (`string`) serve URL parameters (`string | null`) without a second codec set. |
| [guardImplicitCloseAttempts](Function.guardImplicitCloseAttempts) | Prevents implicit close attempts while the supplied predicate reports unsaved state, requesting attention for the surface instead. |
| [isCommandItem](Function.isCommandItem) | Narrows a search surface item to an executable command. A command is recognised by its `execute()` method, which no search result carries. |
| [isEmailAddress](Function.isEmailAddress) | Determines whether text is a non-empty email address with a qualified domain. Surrounding whitespace is ignored. Framework-free so pipes and validators can share one definition. |
| [isLiveVoiceTranscriber](Function.isLiveVoiceTranscriber) | Determines whether a configured transcriber supports live recognition sessions, so a recorder user interface can offer live dictation without knowing which strategy is registered. |
| [isProblemDetail](Function.isProblemDetail) | Determines whether a response body is an RFC 9457 problem detail. A body qualifies when the response was declared as `application/problem+json` (header detection) or when the body carries a `title` together with a numeric `status` or a textual `detail` (body detection). Both detection paths are treated alike so header-only and body-only producers behave the same. |
| [isSearchResult](Function.isSearchResult) | Narrows a search surface item to a semantic search result. Commands are rejected first, so the two guards partition the item union exactly. |
| [jsonCodec](Function.jsonCodec) | Creates a codec that persists structured JSON only after runtime validation. Validation is mandatory because storage is mutable outside the application and persisted data must not be trusted as a TypeScript type assertion. |
| [loadCompleteOffsetCollection](Function.loadCompleteOffsetCollection) | Loads offset pages sequentially and emits their combined items and the latest reported total. |
| [localStorageSignal](Function.localStorageSignal) | Creates a storage-backed signal without exposing an injectable storage service to feature code. Must be called in an injection context (a field initializer or constructor). Co-located with the [LocalStorageSignal](TypeAlias.LocalStorageSignal) type because a separate `localStorageSignal.ts` would collide with `LocalStorageSignal.ts` on case-insensitive file systems. |
| [mapServiceWorkerEvent](Function.mapServiceWorkerEvent) | Translates a `SwUpdate` event into the source-agnostic [IUpdateEvent](TypeAlias.IUpdateEvent) vocabulary. |
| [matchResult](Function.matchResult) | Operator which takes a stream of [IApiResult](TypeAlias.IApiResult) and applies the matching handler for the success or failure branch. |
| [normalizeCalendarDate](Function.normalizeCalendarDate) | Normalizes a date-only value or legacy calendar date-time to `YYYY-MM-DD`. |
| [notificationDurationToMilliseconds](Function.notificationDurationToMilliseconds) | Resolves a symbolic [NotificationDuration](TypeAlias.NotificationDuration) to its lifetime in milliseconds. The mapping is total: everything that is not `'long'` resolves to the short lifetime, so a value that survived an untyped boundary can never produce a notification without a lifetime. |
| [onceOn](Function.onceOn) | Subscribes once to a source, forwarding its values until completion, error or cancellation. |
| [operation](Function.operation) | Creates a full [IOperation](Interface.IOperation) from a simplified [IOperationDefinition](Interface.IOperationDefinition). |
| [play](Function.play) | Plays one sound through the [AudioPlayer](Class.AudioPlayer) of the current injector. Intended for the short notification sounds that would otherwise make every caller inject the player itself; it must run inside an injection context, so a component reaches it from a field initializer or through `runInInjectionContext`. |
| [provideAudioInputDevices](Function.provideAudioInputDevices) | Registers the microphone discovery and voice-test services together with the persisted selection. Persistence goes through the user-preference port of `@pixel-brewery/ngpel-core/storage`, so an application that stores a microphone also composes `provideUserPreferences(...)`; without it, injecting the preference service fails loudly instead of dropping writes. |
| [provideAudioPlayer](Function.provideAudioPlayer) | Registers the [AudioPlayer](Class.AudioPlayer) for the composition root it is added to. The player is bound to that injector's lifetime, so a route-level composition releases its element when the route is left instead of keeping one element alive for the whole application. |
| [provideAudioRecorder](Function.provideAudioRecorder) | Registers the [AudioRecorder](Class.AudioRecorder) together with the features contributed to it. Without a transcriber feature the recorder still records; only `transcribe()` stays unavailable. |
| [provideBrowser](Function.provideBrowser) | Composes the browser capability ports. Only the capabilities contributed by the given features are registered — `provideBrowser()` without features registers nothing. |
| [provideBrowserStorage](Function.provideBrowserStorage) | Composes the browser storage seam. Without features `BROWSER_STORAGE` keeps its root default (the window's `localStorage`); `withStorage(...)` substitutes another implementation. Two storage features in one call raise the kernel's feature-conflict error. |
| [provideEventHub](Function.provideEventHub) | Installs a hub in the current environment injector. |
| [provideMediaUrls](Function.provideMediaUrls) | Configures media URL resolution: registers a [MediaUrlResolver](Class.MediaUrlResolver) scoped to the composition root together with the origin contributed by the given features. |
| [provideNotification](Function.provideNotification) | Root environment provider of the notification pipeline: registers [NotificationService](Class.NotificationService) and composes the sinks the passed features contribute. Composed without a feature the service still works — messages are materialized and kept in the history, they just reach no sink. |
| [provideOperationQueue](Function.provideOperationQueue) | Registers the operation queue with composable features. |
| [provideQuickCreate](Function.provideQuickCreate) | Provides the manager for feature-owned contextual create actions. |
| [provideSearch](Function.provideSearch) | Composition root of the search capability. It publishes the configuration, registers the [SearchManager](Class.SearchManager) together with the default ranking, and composes the commands, providers and renderers contributed by features. The manager is created eagerly so that a configured hotkey is bound before the first surface exists. |
| [provideTextToSpeech](Function.provideTextToSpeech) | Registers the [TextToSpeechService](Class.TextToSpeechService) for the composition root it is added to. Speech is bound to that injector's lifetime, so leaving a route that reads text aloud silences it. |
| [provideUpdate](Function.provideUpdate) | Root environment provider of the update lifecycle: composes the source and strategy features, creates the [UpdateManager](Class.UpdateManager) eagerly and disposes it with the environment injector. Without a strategy feature the console-only default is registered; a source feature is mandatory and missing one fails fast when the manager is created. |
| [provideUserPreferences](Function.provideUserPreferences) | Composes the user-preference port. Exactly one storage feature (`withLocalStorage()`, `withSessionStorage()` or `withUserPreferenceStorage()`) binds `USER_PREFERENCE_STORAGE`; two raise the kernel's feature-conflict error, none leaves the token unbound. |
| [readStorageValue](Function.readStorageValue) | Reads and parses one value from a storage area. This is the framework-free read path for call sites outside an injection context, such as bootstrap configuration. |
| [resolveBrowserStorage](Function.resolveBrowserStorage) | Resolves a Web Storage area of a window when the accessor is usable. The accessor can throw (for example under a restrictive storage policy) and the window itself is absent outside a browser, so both cases degrade to `null` — the marker this entry point uses for "storage is unavailable", never `undefined`, which always means "not specified, resolve the default". |
| [resolveMediaUrl](Function.resolveMediaUrl) | Resolves a root-relative backend media path against an API origin while preserving browser-local and absolute URLs. Only single-leading-slash paths are prefixed: absolute (`https://`), protocol-relative (`//cdn`), `data:` and `blob:` URLs and empty values pass through unchanged, and an empty origin keeps the path relative (local proxies). |
| [toApiFailure](Function.toApiFailure) | Creates a failed API result envelope from a transport-agnostic failure source. When the body is a problem detail it is carried over (missing `title`/`status` members are backfilled from the response); otherwise a synthetic problem is built from the status text and message. |
| [toApiSuccess](Function.toApiSuccess) | Creates a successful API result envelope. |
| [toCalendarDate](Function.toCalendarDate) | Formats the local calendar day shown by a date control as `YYYY-MM-DD`. |
| [unwrapApiResultOrThrow](Function.unwrapApiResultOrThrow) | Emits the data of a successful API result and turns a failure into an [ApiResultError](Class.ApiResultError). |
| [validateFeatures](Function.validateFeatures) | Validates a set of features: 1) Non-multi kinds may appear at most once. 2) IDs must be unique within the same kind. 3) Optional incompatibility rules must not be violated. |
| [withApiOrigin](Function.withApiOrigin) | Contributes the API origin root-relative media paths are resolved against. |
| [withAudioInputDevicePreferenceKey](Function.withAudioInputDevicePreferenceKey) | Overrides the user-preference key the microphone selection is stored under. A product that already persists a microphone keeps its own key here, so the stored value survives the move to this package instead of silently resetting every browser profile. |
| [withAudioNotificationInterceptor](Function.withAudioNotificationInterceptor) | Adds the [AudioNotificationInterceptor](Class.AudioNotificationInterceptor) to `provideNotification()`, so every raised notification also plays the sound its severity is mapped to. |
| [withClipboard](Function.withClipboard) | Registers the [CLIPBOARD](Variable.CLIPBOARD) port. |
| [withClock](Function.withClock) | Registers a custom clock for the operation queue (non-multi). |
| [withConsoleNotificationInterceptor](Function.withConsoleNotificationInterceptor) | Adds the [ConsoleNotificationInterceptor](Class.ConsoleNotificationInterceptor) to `provideNotification()`, so every raised notification is also written to a diagnostic channel. The interceptor is configured while it is constructed, which makes it behave the same whether it is reached through the pipeline or injected directly, and it is disposed with the injector it was composed into. |
| [withDefaultUpdateStrategy](Function.withDefaultUpdateStrategy) | Registers the console-only [DefaultUpdateHandlerStrategy](Class.DefaultUpdateHandlerStrategy). Applied automatically when `provideUpdate()` receives no strategy feature at all. |
| [withExternalLinks](Function.withExternalLinks) | Registers the [EXTERNAL\_LINK\_OPENER](Variable.EXTERNAL_LINK_OPENER) port. |
| [withFailurePolicy](Function.withFailurePolicy) | Registers a failure policy for the operation queue (non-multi). |
| [withFileDownload](Function.withFileDownload) | Registers the [FILE\_DOWNLOADER](Variable.FILE_DOWNLOADER) port. |
| [withIdFactory](Function.withIdFactory) | Registers a custom ID factory for the operation queue (non-multi). |
| [withLifecycleEvents](Function.withLifecycleEvents) | Feature that enables lifecycle event emission on the operation queue. |
| [withLocalStorage](Function.withLocalStorage) | Stores preferences in the storage bound to `BROWSER_STORAGE` — the window's `localStorage` by default, or whatever the host substituted through `provideBrowserStorage(withStorage(...))`. The adapter is only reachable through this call, so the token itself stays adapter-free. |
| [withLocalTranscriber](Function.withLocalTranscriber) | Registers the browser-based [LocalVoiceTranscriber](Class.LocalVoiceTranscriber) under [VOICE\_TRANSCRIBER](Variable.VOICE_TRANSCRIBER). It also satisfies the live-session contract, so a recorder user interface can dictate while recording. |
| [withMergePolicy](Function.withMergePolicy) | Registers a merge policy for the operation queue (non-multi). |
| [withQuickCreateItems](Function.withQuickCreateItems) | Declaratively contributes quick-create items and/or dynamic sources. |
| [withSearchCommands](Function.withSearchCommands) | Declaratively contributes palette commands to `provideSearch()`. The feature is multi-capable: every contributing feature composes one `withSearchCommands()` call. |
| [withSearchProviders](Function.withSearchProviders) | Declaratively contributes semantic search providers to `provideSearch()`. The feature is multi-capable: every contributing feature composes one `withSearchProviders()` call. |
| [withSearchRenderers](Function.withSearchRenderers) | Declaratively contributes result renderer components to `provideSearch()`. The feature is multi-capable: every contributing feature composes one `withSearchRenderers()` call. |
| [withServiceWorkerUpdateSource](Function.withServiceWorkerUpdateSource) | Registers the [ServiceWorkerUpdateSource](Class.ServiceWorkerUpdateSource) as the update source. The application must also call `provideServiceWorker()` from `@angular/service-worker`. |
| [withSessionStorage](Function.withSessionStorage) | Stores preferences in the `sessionStorage` of the injected `DOCUMENT`'s window, so they live only as long as the browsing session. |
| [withStorage](Function.withStorage) | Binds `BROWSER_STORAGE` to a specific storage implementation. Pass a factory when the storage must be resolved lazily or needs the injection context (for example a Capacitor bridge); pass `null` to declare storage unavailable. |
| [withTelemetry](Function.withTelemetry) | Adds product-owned providers to the recorder composition — a logger, a metrics sink, anything that observes recording without changing it. The feature is multi, so several telemetry contributions compose; each one carries its own id, and a repeated id is reported as a conflict instead of quietly registering the same observer twice. |
| [withUpdateSource](Function.withUpdateSource) | Registers the [IUpdateSource](Interface.IUpdateSource) the manager listens to. Only one source feature may be composed; the feature kernel rejects a second one. |
| [withUpdateStrategy](Function.withUpdateStrategy) | Registers an [IUpdateHandlerStrategy](Interface.IUpdateHandlerStrategy). Strategy features are `multi`: several may be composed as long as their ids differ, and every event reaches all of them. |
| [withUserPreferenceStorage](Function.withUserPreferenceStorage) | Binds a custom adapter of the user-preference port, for hosts whose preferences live outside Web Storage (an Electron bridge, a remote profile). The factory runs in the injection context. |
| [withVoiceTranscriber](Function.withVoiceTranscriber) | Registers a product-owned recognition strategy under [VOICE\_TRANSCRIBER](Variable.VOICE_TRANSCRIBER) — an API-backed transcriber, a desktop bridge, or any other adapter. It conflicts with `withLocalTranscriber()` by design: one recorder recognizes through one strategy. |
| [writeStorageValue](Function.writeStorageValue) | Serializes and writes one value to a storage area; `undefined` removes the key. This is the framework-free write path for call sites outside an injection context. |
