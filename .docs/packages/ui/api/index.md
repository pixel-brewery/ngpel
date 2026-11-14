---
title: '@pixel-brewery/ngpel-ui'
generated: true
editUrl: false
---
# @pixel-brewery/ngpel-ui

## Classes

| Class | Description |
| ------ | ------ |
| [ActionStripComponent](Class.ActionStripComponent) | Hosts one item-anchored action strip whose actions are declared as projected HTML. |
| [ActionStripContentDirective](Class.ActionStripContentDirective) | Marks the declarative HTML template rendered inside an action strip. |
| [ActionStripTriggerDirective](Class.ActionStripTriggerDirective) | Shows a declarative action strip while an item is hovered or contains keyboard focus. |
| [ActivityLogComponent](Class.ActivityLogComponent) | Renders caller-projected entries with paging, load feedback and an optional unread boundary. |
| [ActivityLogEntryDirective](Class.ActivityLogEntryDirective) | Marks a projected entry template. Bind the controller's entries to infer the item type. |
| [ActivityTextChangeComponent](Class.ActivityTextChangeComponent) | Renders a word comparison and lets the reader reveal runs of unchanged paragraphs. |
| [AgreementGateComponent](Class.AgreementGateComponent) | Requests an explicit agreement without owning its content, persistence or protected action. |
| [AiBeamComponent](Class.AiBeamComponent) | Renders an animated border around arbitrary projected content, the visual language products use to mark that something is being produced by an AI. |
| [AiBeamDirective](Class.AiBeamDirective) | Structural shorthand that wraps its template in an [AiBeamComponent](Class.AiBeamComponent), so a single element gains an AI beam without an extra wrapper in the template. |
| [AiDirective](Class.AiDirective) | Marks an element as AI-enhanced and applies the configured presentation to it. |
| [AiRailActionComponent](Class.AiRailActionComponent) | Consistent compact action that opens the dialog AI rail. |
| [AiRailChoiceComponent](Class.AiRailChoiceComponent) | Declares one headless interaction choice consumed and rendered by an AI rail. |
| [AiRailComponent](Class.AiRailComponent) | Renders a declaratively configured, inline AI interaction inside a drawer rail. |
| [AiRailComponentIntl](Class.AiRailComponentIntl) | Internationalization labels for the AI rail component. |
| [AnchoredPopupDirective](Class.AnchoredPopupDirective) | Coordinates one popup across changing anchors and asynchronous content. |
| [AppointmentItemComponent](Class.AppointmentItemComponent) | The `AppointmentItemComponent` component. |
| [AudioActivityOrbComponent](Class.AudioActivityOrbComponent) | Renders the central audio activity surface for listening and speaking experiences. |
| [AudioSignalQualityIndicatorComponent](Class.AudioSignalQualityIndicatorComponent) | Displays an accessible, business-agnostic audio signal quality state. |
| [AuditLogComponent](Class.AuditLogComponent) | Renders the inner content of a single audit log timeline entry. |
| [BackTopComponent](Class.BackTopComponent) | Displays a floating back-to-top button that scrolls the nearest scroll container to the top. |
| [BooleanPipe](Class.BooleanPipe) | Chooses between two values by a condition, which keeps the two-branch decisions a template makes over and over out of the component: `[icon]="task.isDone \| ngpBoolean: 'check' : 'clock'"`, `[variant]="isCritical \| ngpBoolean: 'danger' : 'default'"`. |
| [BytesPipe](Class.BytesPipe) | Renders a byte count as a human readable size: <code v-pre>{{ file.size \&#124; ngpBytes }}</code>. |
| [CaptchaComponent](Class.CaptchaComponent) | Captcha component rendering a generated question with three answer options. |
| [CaptchaComponentIntl](Class.CaptchaComponentIntl) | Internationalization labels for the captcha component. |
| [CardAccordion](Class.CardAccordion) | Coordinates the expansion of cards within one owning view. |
| [CardComponent](Class.CardComponent) | Preserves Mosaik card slots while allowing its body to collapse. |
| [CardHeaderComponent](Class.CardHeaderComponent) | Adds the card's expansion control to the Mosaik header suffix. |
| [CellComponent](Class.CellComponent) | Presents up to four semantic tracks inside an owning list item: title, description, hints and chips. The list item remains responsible for click, focus and selection behavior. Use named projection attributes for rich content and leading/trailing elements. A track can alternatively use its text input; do not supply both forms for the same track. |
| [ChunkPipe](Class.ChunkPipe) | Splits a list into rows of a fixed length, which is what a template needs to lay a flat collection out as a grid: `@for (row of items() \| ngpChunk: 3; track $index)`. |
| [CloseDescendantMenusDirective](Class.CloseDescendantMenusDirective) | Closes contextual menus before a collection row executes its primary action. |
| [CodeEditorComponent](Class.CodeEditorComponent) | A consolidated code editor component built on CodeMirror 6. Follows the Mosaik code-editor pattern with compartment-based extension management. Supports placeholder autocompletion for template variables (e.g. <code v-pre>{{firstName}}</code>). |
| [CodeEditorComponentIntl](Class.CodeEditorComponentIntl) | Internationalization labels for the code editor component. |
| [CollapsibleNavigationPanelComponent](Class.CollapsibleNavigationPanelComponent) | A page-level navigation panel with independent scrolling and a compact rail. Both navigation views stay mounted. On narrow viewports the expanded panel overlays adjacent content. |
| [CollectionExportDrawerComponent](Class.CollectionExportDrawerComponent) | A configurable drawer component for collection data export. Allows the user to select which columns to include and which format to export in before triggering the actual download. |
| [CollectionExportDrawerComponentIntl](Class.CollectionExportDrawerComponentIntl) | Internationalization labels for the collection export dialog component. |
| [CollectionExportService](Class.CollectionExportService) | Service that opens a configurable collection export drawer. Feature presenters inject this service and call [open](Class.CollectionExportService#open) instead of wiring the drawer themselves. |
| [CollectionListComponent](Class.CollectionListComponent) | Renders a collection heading and menus above caller-templated rows in one scrolling region. |
| [CollectionListEmptyDirective](Class.CollectionListEmptyDirective) | Marks content rendered when a collection list is empty. |
| [CollectionListItemDirective](Class.CollectionListItemDirective) | Marks the caller-provided row template of a collection list. |
| [CollectionTableRows](Class.CollectionTableRows) | Connects existing collection queries to Mosaik's native lazy row provider. |
| [ColorPickerButtonComponent](Class.ColorPickerButtonComponent) | Opens Mosaik's color picker beside a preset palette and emits an opaque RGB hex value. |
| [ColorSelectorComponent](Class.ColorSelectorComponent) | A reusable color selector component with palette selection and eye dropper support. Implements ControlValueAccessor for Reactive Forms integration. |
| [ColorSelectorComponentIntl](Class.ColorSelectorComponentIntl) | Internationalization labels for the color selector component. |
| [CompactTextPipe](Class.CompactTextPipe) | Condenses a markdown block into a single plain-text line for list rows, tooltips and card subtitles: <code v-pre>{{ note.body \&#124; ngpCompactText }}</code>. |
| [CompoundActionsDirective](Class.CompoundActionsDirective) | Marks a consumer-owned action template rendered beside the compound navigation. |
| [CompoundComponent](Class.CompoundComponent) | Renders a collection with single-item, list or stacked editing and consumer-owned actions. |
| [CompoundEmptyDirective](Class.CompoundEmptyDirective) | Marks a consumer-owned template rendered when a compound collection is empty. |
| [CompoundItemDirective](Class.CompoundItemDirective) | Marks the template used to render the active item of a compound collection. |
| [CompoundItemStatusDirective](Class.CompoundItemStatusDirective) | Projects status alongside a stacked compound item's heading. |
| [CompoundItemSummaryDirective](Class.CompoundItemSummaryDirective) | Projects the heading of each stacked compound item. |
| [CompoundListHeaderDirective](Class.CompoundListHeaderDirective) | Marks an optional consumer-owned header template for the compound list view. |
| [CompoundListItemDirective](Class.CompoundListItemDirective) | Marks the template used to render each item in the compound list view. |
| [ConditionGroupComponent](Class.ConditionGroupComponent) | Composes the shared And/Or group toolbar from the advanced list filters with projected domain conditions. The consumer owns its rule model, allowed operations and evaluation; nested groups reuse the common leading line. |
| [ContentAnchorDirective](Class.ContentAnchorDirective) | Registers a semantic heading or section as an in-page navigation destination. |
| [ContentFragmentLinkDirective](Class.ContentFragmentLinkDirective) | Builds a same-document fragment link without losing the active application route. |
| [ContentIndicatorNavigationComponent](Class.ContentIndicatorNavigationComponent) | Renders registered content destinations as a compact Mosaik position indicator. |
| [ContentNavigationContext](Class.ContentNavigationContext) | Route-scoped registry for stable in-page navigation destinations. |
| [ContentTableOfContentsComponent](Class.ContentTableOfContentsComponent) | Renders an accessible fragment-link navigation for registered page content. |
| [ContextMenuComponent](Class.ContextMenuComponent) | Displays caller-provided Mosaik menu actions for the item that opened it. Place one host beside a list or table and connect it using `ngpContextMenuTriggerFor`. |
| [ContextMenuContentDirective](Class.ContextMenuContentDirective) | Marks the declarative HTML template rendered inside a context menu. |
| [ContextMenuTriggerDirective](Class.ContextMenuTriggerDirective) | Connects a host to a context menu. Supply a value for explicit triggers, or omit it on a Mosaik data table to read the row value from the event's composed path. |
| [DataTableLoadingDirective](Class.DataTableLoadingDirective) | Keeps a Mosaik data table in place while replacing its body with five loading rows. |
| [DataTablePreferencesDirective](Class.DataTablePreferencesDirective) | Persists column visibility and widths for a Mosaik data-table, with optional grouping and column pinning. |
| [DayStripComponent](Class.DayStripComponent) | Displays a horizontally scrollable day selector. |
| [DetailPanelComponent](Class.DetailPanelComponent) | - |
| [DetailPanelComponentIntl](Class.DetailPanelComponentIntl) | Internationalization labels for the detail panel component. |
| [DocumentLayoutSymbolComponent](Class.DocumentLayoutSymbolComponent) | Renders a compact, inert representation of a configurable document layout. |
| [DocumentPreviewIntl](Class.DocumentPreviewIntl) | Generic preview feedback; document names and business context come from the caller. |
| [DocumentPreviewService](Class.DocumentPreviewService) | Opens a document in its own drawer without navigating or replacing the caller. |
| [DrawerExteriorPlacementDirective](Class.DrawerExteriorPlacementDirective) | Places contextual drawer content outside the drawer on its leading backdrop edge. |
| [DynamicFormComponent](Class.DynamicFormComponent) | Renders a versioned UI-owned form definition with Mosaik controls and Signal Forms. |
| [DynamicSizeVirtualScrollDirective](Class.DynamicSizeVirtualScrollDirective) | Provides dynamic-size virtualization to a CDK viewport. |
| [DynamicSizeVirtualScrollItemDirective](Class.DynamicSizeVirtualScrollItemDirective) | Marks one rendered item so the dynamic virtual-scroll strategy can measure it by stable key. |
| [DynamicSizeVirtualScrollStrategy](Class.DynamicSizeVirtualScrollStrategy) | Virtual-scroll strategy for lists whose rendered items have different and changing block sizes. |
| [EmailLayoutSymbolComponent](Class.EmailLayoutSymbolComponent) | Renders a compact, inert representation of a configurable email layout. |
| [EntityPickerFieldComponent](Class.EntityPickerFieldComponent) | Presents the label of a selected entity and delegates choosing or clearing it to caller commands. The value of a surrounding form field can remain an identifier independent of the display text. |
| [ExpandableMultilineDirective](Class.ExpandableMultilineDirective) | - |
| [EyeDropperDirective](Class.EyeDropperDirective) | - |
| [FileComponent](Class.FileComponent) | Displays one file as a Mosaik-based list row, gallery tile, full-width preview or inline chip. |
| [FilePreviewPipe](Class.FilePreviewPipe) | Creates a lifecycle-safe Mosaik thumbnail preview for a browser file. |
| [FilesComponent](Class.FilesComponent) | Frames a file collection, its semantic layout, and declaratively projected acquisition sources. |
| [FileSourceComponent](Class.FileSourceComponent) | Declares one headless acquisition source rendered by a parent [FilesComponent](Class.FilesComponent). |
| [FilterBarComponent](Class.FilterBarComponent) | A configurable, reusable filter bar for list views. Renders filter controls from [IFilterDefinition](Interface.IFilterDefinition) items and emits active filter values whenever the Signal Form changes. |
| [FilterBarComponentIntl](Class.FilterBarComponentIntl) | Internationalization labels for the filter bar component. |
| [FlameBackgroundComponent](Class.FlameBackgroundComponent) | Renders the decorative flame with its animated heat-haze effect. |
| [FloatingHostComponent](Class.FloatingHostComponent) | Generic floating host container that can be positioned anywhere on screen. Supports drag-to-move and resize functionality. Use content projection for header and body content. |
| [FocusTargetDirective](Class.FocusTargetDirective) | Scrolls to and focuses a descendant of the host whenever a focus key is requested. |
| [HashBrushBackgroundPipe](Class.HashBrushBackgroundPipe) | Derives a stable background colour from a value, which gives avatars, tags and legend swatches a recognisable tint without storing one: `[style.background-color]="tag.name \| ngpHashBrushBackground"`. |
| [HashBrushForegroundPipe](Class.HashBrushForegroundPipe) | Picks the readable text colour for a background colour, and pairs with [HashBrushBackgroundPipe](Class.HashBrushBackgroundPipe): `[style.color]="(tag.name \| ngpHashBrushBackground) \| ngpHashBrushForeground"`. |
| [HoverRevealForDirective](Class.HoverRevealForDirective) | Reveals its host element when the specified area is hovered or receives focus. |
| [ImageCropDialogComponent](Class.ImageCropDialogComponent) | Renders a localized dialog for selecting and encoding an image region. |
| [ImageCropSelectionDirective](Class.ImageCropSelectionDirective) | Coordinates pointer selection and renders a selected image region to a PNG file. |
| [ImageCropService](Class.ImageCropService) | Opens image files in the reusable crop dialog and manages temporary browser resources. |
| [ImageEditorComponent](Class.ImageEditorComponent) | A reusable image editor component with avatar display, file picker, and remove button. Implements ControlValueAccessor for Reactive Forms integration. |
| [ImageMarkupCanvasDirective](Class.ImageMarkupCanvasDirective) | Owns pointer interaction, history rendering, and PNG encoding for one markup canvas. |
| [ImageMarkupDocument](Class.ImageMarkupDocument) | Framework-neutral immutable history for raster image markup operations. |
| [ImageMarkupEditorDialogComponent](Class.ImageMarkupEditorDialogComponent) | Renders the localized, feature-neutral image markup editor dialog. |
| [ImageMarkupEditorService](Class.ImageMarkupEditorService) | Opens image files in the framework-neutral raster markup editor. |
| [ImagePreviewComponent](Class.ImagePreviewComponent) | Renders a keyboard-accessible overlay for zoomable images and playable videos. |
| [ImagePreviewDialogSurfaceDirective](Class.ImagePreviewDialogSurfaceDirective) | Makes the owning Mosaik dialog an invisible interaction host for the full-screen preview. |
| [ImagePreviewDirective](Class.ImagePreviewDirective) | Opens image-bearing controls and elements in the shared image preview. |
| [ImagePreviewGroupDirective](Class.ImagePreviewGroupDirective) | Opens descendant Mosaik image controls as one navigable preview collection. |
| [ImagePreviewImagePipe](Class.ImagePreviewImagePipe) | Converts image source strings into image preview descriptors. |
| [ImagePreviewRef](Class.ImagePreviewRef) | Controls one open image preview. |
| [ImagePreviewService](Class.ImagePreviewService) | Opens images in a full-screen CDK overlay. |
| [ImagePreviewState](Class.ImagePreviewState) | Owns the reactive state of one image preview instance. |
| [ImmersiveSessionOrbAnchorDirective](Class.ImmersiveSessionOrbAnchorDirective) | Marks the element whose box the orb occupies while the session is in preflight. |
| [ImmersiveSessionShellComponent](Class.ImmersiveSessionShellComponent) | Provides a responsive, business-agnostic shell for immersive sessions. |
| [InfiniteScrollDirective](Class.InfiniteScrollDirective) | Emits an event when the user scrolls near the end of a container. |
| [InitialsPipe](Class.InitialsPipe) | Reduces a display name to at most two upper-case initials for avatar fallbacks: <code v-pre>{{ user.displayName \&#124; ngpInitials }}</code> renders `AW` for `Andre Wehlert`. |
| [InputHistoryNavigationDirective](Class.InputHistoryNavigationDirective) | Adds shell-like submitted-value history navigation to `mosaik-chat-prompt-box` elements. |
| [InputSuggestionsDirective](Class.InputSuggestionsDirective) | Adds whole-field suggestions to an editable input. Selection emits the original option; the caller owns writing the selected value to its form. |
| [LeadingLineComponent](Class.LeadingLineComponent) | Marks nested content with a narrow vertical line instead of a frame. |
| [LegalLinksComponent](Class.LegalLinksComponent) | Renders trusted website-level legal navigation without accepting HTML content. |
| [LiveAudioWaveformComponent](Class.LiveAudioWaveformComponent) | Renders a reusable live audio spectrum without taking ownership of its media stream. |
| [LogoComponent](Class.LogoComponent) | The `logo` component. |
| [LookupPipe](Class.LookupPipe) | Resolves a key through a lookup table, which replaces the `@switch` ladders a template grows once a status, a severity or a kind has more than two branches: `[icon]="ticket.status \| ngpLookup: statusIcons : 'help'"`. |
| [MailPipe](Class.MailPipe) | Turns an email address into a `mailto:` link target: `[href]="contact.email \| ngpMail"`. |
| [MapComponent](Class.MapComponent) | Composes Angular Google Maps with lazy SDK loading and deferred native overlays. |
| [MapContentDirective](Class.MapContentDirective) | Defers Angular map overlays until the SDK and their owning GoogleMap exist. |
| [MapLoadError](Class.MapLoadError) | Sanitized failure at the browser Maps SDK boundary. |
| [MapScriptLoader](Class.MapScriptLoader) | Loads only Google's rendering SDK through its supported script entry point. |
| [MapsPipe](Class.MapsPipe) | Turns an address into a map search link: `[href]="site.address \| ngpMaps: site.name"`. |
| [MapViewportDirective](Class.MapViewportDirective) | Applies the server-provided bounds to the native Angular map after initialization. |
| [MarkdownComponent](Class.MarkdownComponent) | Safely renders the supported Markdown dialect as semantic Angular DOM. |
| [MarkdownPreviewDirective](Class.MarkdownPreviewDirective) | Supplies the safe Markdown renderer to the Mosaik CodeEditor preview hook. Use it on a CodeEditor version that exposes `previewRenderer`. |
| [MatchWidthDirective](Class.MatchWidthDirective) | Keeps the host's inline size equal to another element's rendered width. |
| [MultilineExpansionBoundaryDirective](Class.MultilineExpansionBoundaryDirective) | - |
| [NavDirective](Class.NavDirective) | Attribute directive to bind a generic INavItem / handle to `<mosaik-menu-item/>`. |
| [NavigationCollapseToggleComponent](Class.NavigationCollapseToggleComponent) | Switches the application navigation between its labelled and icon-only forms. The shell owns the persisted state and positions the control through its inline and block offsets. |
| [NavigationComponent](Class.NavigationComponent) | Provides the layout shell for an application navigation surface. |
| [NavigationMenuComponent](Class.NavigationMenuComponent) | Wraps the Mosaik menu used by an application navigation surface. |
| [NavigationMenuGroupComponent](Class.NavigationMenuGroupComponent) | Wraps a Mosaik navigation menu group. |
| [NavigationMenuItemComponent](Class.NavigationMenuItemComponent) | Application navigation item backed by a Mosaik menu item. |
| [NotAvailablePipe](Class.NotAvailablePipe) | Renders a placeholder instead of an absent value, so a table cell reads as "not filled in" rather than as an empty gap: <code v-pre>{{ contact.phone \&#124; ngpNotAvailable }}</code>. |
| [OverlayScrollBoundaryDirective](Class.OverlayScrollBoundaryDirective) | Keeps wheel and touch scrolling inside an overflow region before an overlay's document-level scroll lock can cancel the event. |
| [PagePathComponent](Class.PagePathComponent) | Declares the path of the enclosing page for the shell's path outlet. |
| [PagePathOutletComponent](Class.PagePathOutletComponent) | Renders the current page path as a breadcrumb or a compact parent and title. |
| [PagePathRegistry](Class.PagePathRegistry) | Resolves the latest mounted page path while retaining previous mounted declarations. |
| [PageToolbarComponent](Class.PageToolbarComponent) | Hosts a Mosaik page toolbar. In compact mode secondary start actions and end actions that overflow appear in a menu. A menu choice activates the original projected control. |
| [PaperSurfaceComponent](Class.PaperSurfaceComponent) | Responsive paper-like content surface that grows with its projected content. |
| [PickerCreateActionComponent](Class.PickerCreateActionComponent) | Sticky primary action rendered above an entity picker list. |
| [PickerLoadingSkeletonComponent](Class.PickerLoadingSkeletonComponent) | Shared layout-preserving loading state for picker result lists. |
| [PointerIdleDirective](Class.PointerIdleDirective) | Reports pointer inactivity on its host. |
| [PrimaryLegalActionContext](Class.PrimaryLegalActionContext) | Route-scoped bridge through which routed content can expose one prominent legal action without depending on its surrounding shell. |
| [PseudoLinkDirective](Class.PseudoLinkDirective) | Removes the user-agent link styling from an anchor element while preserving every link capability: routing, `href`, context menu, middle-click and keyboard activation. Use it when an anchor wraps composed content such as cards, brand marks or table cells; text-only hyperlinks keep the regular anchor styling. |
| [RailActionComponent](Class.RailActionComponent) | Renders one compact action that either activates independently declared rail content or hosts another action directive when no target is supplied. |
| [RailActionsComponent](Class.RailActionsComponent) | Groups the compact actions displayed in a rail's initial state. |
| [RailComponent](Class.RailComponent) | Coordinates a compact action list with one independently declared drawer rail at a time. |
| [RailComponentIntl](Class.RailComponentIntl) | Internationalization labels for the rail component. |
| [RailContentDirective](Class.RailContentDirective) | Registers independently declared content with its nearest generic rail coordinator. |
| [RailDrawerController](Class.RailDrawerController) | Coordinates a generic rail with its host drawer: the docked rail expands the drawer for its content, the floating rail gives its column back to the drawer body and anchors the floating actions above the drawer footer. |
| [RecurrenceEditorComponent](Class.RecurrenceEditorComponent) | Reusable RFC 5545 recurrence editor for Signal Forms. |
| [RecurrenceEditorService](Class.RecurrenceEditorService) | Opens the recurrence editor in the application's Mosaik drawer. |
| [RecurrenceSummaryPipe](Class.RecurrenceSummaryPipe) | Renders a localized description of the recurrence in a read-only view. |
| [SavedFilterDrawerComponent](Class.SavedFilterDrawerComponent) | Drawer used to name and review a saved filter. |
| [ScrollToErrorDirective](Class.ScrollToErrorDirective) | Defines a generic validation scope and reveals its first visible invalid control. |
| [ScrollToErrorTriggerDirective](Class.ScrollToErrorTriggerDirective) | Triggers error navigation for a validation scope associated through the same Signal Forms state. |
| [SectionComponent](Class.SectionComponent) | Groups a section header and its projected content while consumers configure the host as the section boundary. |
| [SectionContentComponent](Class.SectionContentComponent) | Projects the content that belongs to a section without adding a layout box. |
| [SectionHeaderComponent](Class.SectionHeaderComponent) | Displays a section heading with its explanatory description. |
| [SheetAutoOpenDirective](Class.SheetAutoOpenDirective) | Opens a declaratively rendered sheet as soon as its Mosaik element has connected. |
| [SignalPipe](Class.SignalPipe) | Wraps a template expression in a signal, so a plain value can be handed to an input, a directive or a helper that expects one: `<ngp-chart [series]="rows() \| ngpSignal" />`. |
| [StopEventPropagationDirective](Class.StopEventPropagationDirective) | Stops the propagation of pointer, mouse and keyboard events at the host element, so nested interactive controls (a delete button inside a clickable row, for instance) do not trigger the surrounding handlers. |
| [TelPipe](Class.TelPipe) | Turns a phone number into a `tel:` link target: `[href]="contact.phone \| ngpTel"`. |
| [TextOnlyHtmlTokenizer](Class.TextOnlyHtmlTokenizer) | Drops raw HTML tokens so embedded markup falls back to plain text. The pipeline renders content that nobody in the consuming application authored, and the elements the default renderer emits put their `text` on screen through `unsafeHTML`. Refusing the tokens is what keeps that path inert; escaping the Markdown source instead would corrupt code fences, where the escapes are literal content. |
| [TicktackPanelComponent](Class.TicktackPanelComponent) | Horizontally switches between a primary and secondary content surface. |
| [TicktackPanelComponentIntl](Class.TicktackPanelComponentIntl) | Internationalization labels for the ticktack panel component. |
| [TruncateStartPipe](Class.TruncateStartPipe) | Shortens text from the front, keeping its end readable: <code v-pre>{{ path \&#124; ngpTruncateStart: 30 }}</code>. |
| [TypewriterDirective](Class.TypewriterDirective) | Types one or more text values into its host, character by character, and optionally rotates through them. |
| [UrlListComponent](Class.UrlListComponent) | Edits categorized web links with caller-owned Signal Forms state, choices and mutations. |
| [UserSelectDirective](Class.UserSelectDirective) | Ignores initial and bound-value selections emitted while Mosaik reconciles items. |
| [ValueMagnitudeDirective](Class.ValueMagnitudeDirective) | Scales a Mosaik text element by the magnitude of a numeric value. |
| [ViewportClearanceDirective](Class.ViewportClearanceDirective) | Keeps the floating surface clear of the host element, for example an open side panel or a session dock. The host reserves the distance from its leading edge to the given viewport edge while it is visible. |
| [ViewportClearanceService](Class.ViewportClearanceService) | Collects the screen areas, such as an open side panel or a session dock, that the floating surface keeps clear. Overlapping reservations along one edge do not add up; a floating surface keeps clear of the widest one. A modal full-screen surface opens its own layer: while it is open, only reservations inside it count, because everything beneath it is covered anyway. |
| [ViewSlotAnchorOutletComponent](Class.ViewSlotAnchorOutletComponent) | Renders active Mosaik view-slot entries with stable DOM anchors. |
| [ViewSlotAnchorTargetDirective](Class.ViewSlotAnchorTargetDirective) | Scrolls an anchored view-slot item into view when it becomes the active anchor. |
| [VoiceRecorderDirective](Class.VoiceRecorderDirective) | Connects the Mosaik prompt box voice controls to the audio recorder and transcriber of `ngpel-core`. |
| [VoiceSessionControlsComponent](Class.VoiceSessionControlsComponent) | Renders externally controlled actions for a long-running voice session. |
| [WeekPanelComponent](Class.WeekPanelComponent) | - |
| [WeekStripComponent](Class.WeekStripComponent) | Displays one controlled calendar-week row inside a week panel. |
| [WidgetComponent](Class.WidgetComponent) | Renders a single widget by lazy-loading its front and optional back view. |
| [WidgetEditorCanvasComponent](Class.WidgetEditorCanvasComponent) | Visual authoring canvas for semantic zones and their widget grid items. |
| [WidgetGridComponent](Class.WidgetGridComponent) | Generic configurable widget grid with local persistence. |
| [WidgetGridDragDirective](Class.WidgetGridDragDirective) | Applies the shared widget-grid drag-preview configuration to an Angular CDK drag source. |
| [WidgetGridItemComponent](Class.WidgetGridItemComponent) | Renders one editable widget-grid item including controls, ghost, placeholder, and resize feedback. |
| [WidgetGridItemTemplate](Class.WidgetGridItemTemplate) | Marks the template used to render one concrete widget inside a widget grid. |
| [WidgetGridResizeDirective](Class.WidgetGridResizeDirective) | Converts a pointer resize gesture into column/row spans snapped to the visible grid. |
| [WidgetGridToolboxComponent](Class.WidgetGridToolboxComponent) | Renders the available widget selection independently from its owning surface. |
| [WidgetManager](Class.WidgetManager) | Collects the widgets contributed under the [WIDGET](Variable.WIDGET) multi-token and registers them in the [WidgetRegistry](Class.WidgetRegistry), which stays the only store and the only order. A host may still add or drop widgets afterwards — a widget that only exists for one tenant, or one that a background capability check turns out to allow. |
| [WidgetRegistry](Class.WidgetRegistry) | The in-memory widget store. It is the single source of order: widgets are published sorted by `order` and then by id, so a dashboard renders the same sequence no matter in which sequence the feature libraries were composed. |
| [WidgetSummaryComponent](Class.WidgetSummaryComponent) | Presents one prominent widget value with a descriptive label, an optional unit and a hint. |
| [WidgetViewDirective](Class.WidgetViewDirective) | Exposes the logical grid size of the surrounding widget to its own template, so a view can trade detail for space without knowing anything about the grid that placed it. |

## Interfaces

| Interface | Description |
| ------ | ------ |
| [IActionStripContentContext](Interface.IActionStripContentContext) | Template context supplied to declarative action-strip content. |
| [IActionStripShowRequest](Interface.IActionStripShowRequest) | Information required to show an action strip for one item. |
| [IActivityLogController](Interface.IActivityLogController) | State and actions of an activity log whose data source is supplied by its host. |
| [IActivityLogControllerOptions](Interface.IActivityLogControllerOptions) | Data and identity supplied by the host for a paged activity log. |
| [IActivityLogEntryContext](Interface.IActivityLogEntryContext) | Data provided to the caller's projected activity entry template. |
| [IActivityLogLabels](Interface.IActivityLogLabels) | Labels the application can override for the shared activity view. |
| [IActivityLogPage](Interface.IActivityLogPage) | One page of entries, ordered newest first by the caller's data source. |
| [IActivityTextPart](Interface.IActivityTextPart) | One segment of a changed paragraph. |
| [IAdvancedFilterGroup](Interface.IAdvancedFilterGroup) | An advanced filter group with nested rules or groups. |
| [IAdvancedFilterRow](Interface.IAdvancedFilterRow) | Flattened advanced filter node with display metadata. |
| [IAdvancedFilterRule](Interface.IAdvancedFilterRule) | A single advanced filter rule. |
| [IAdvancedFilterValues](Interface.IAdvancedFilterValues) | Emitted values for advanced filter mode. |
| [IAiRailChoiceConfigurationField](Interface.IAiRailChoiceConfigurationField) | One reusable select field shown before a configurable AI rail action executes. |
| [IAnchoredPopupEvent](Interface.IAnchoredPopupEvent) | Configuration supplied by the consuming view. |
| [IAuditLogChange](Interface.IAuditLogChange) | Field-level change rendered by the audit log component. |
| [IAuditLogChangeGroup](Interface.IAuditLogChangeGroup) | Named set of field changes rendered as one audit comparison card. |
| [ICaptchaChallenge](Interface.ICaptchaChallenge) | Represents a generated captcha challenge. |
| [ICaptchaInvalidEvent](Interface.ICaptchaInvalidEvent) | Payload emitted when captcha verification fails. |
| [ICaptchaProps](Interface.ICaptchaProps) | Public captcha component state contract. |
| [ICaptchaVerifiedEvent](Interface.ICaptchaVerifiedEvent) | Payload emitted when captcha verification succeeds. |
| [ICollectionCalendarView](Interface.ICollectionCalendarView) | Runtime calendar projection for a collection view. |
| [ICollectionCalendarViewConfig](Interface.ICollectionCalendarViewConfig) | Configuration for the calendar projection of a collection view. |
| [ICollectionExportColumn](Interface.ICollectionExportColumn) | Export column metadata derived from a collection field. |
| [ICollectionExportDrawerData](Interface.ICollectionExportDrawerData) | Input data for the collection export dialog. |
| [ICollectionExportDrawerResult](Interface.ICollectionExportDrawerResult) | Result returned by the collection export drawer on confirmation. |
| [ICollectionExportFieldConfig](Interface.ICollectionExportFieldConfig) | Export behavior for a collection field. |
| [ICollectionExportFilter](Interface.ICollectionExportFilter) | Export filter metadata derived from active collection filters. |
| [ICollectionField](Interface.ICollectionField) | Field metadata used as the source for table columns, filters, and exports. |
| [ICollectionFlowView](Interface.ICollectionFlowView) | Runtime flow projection for a collection view. |
| [ICollectionFlowViewConfig](Interface.ICollectionFlowViewConfig) | Configuration for the flow projection of a collection view. |
| [ICollectionGalleryView](Interface.ICollectionGalleryView) | Runtime gallery projection for a collection view. |
| [ICollectionGalleryViewConfig](Interface.ICollectionGalleryViewConfig) | Configuration for the gallery projection of a collection view. |
| [ICollectionListItemContext](Interface.ICollectionListItemContext) | Template context supplied for one collection-list item. |
| [ICollectionListMenu](Interface.ICollectionListMenu) | Dropdown menu displayed in a collection-list header. |
| [ICollectionListMenuOption](Interface.ICollectionListMenuOption) | Selectable option shown in a collection-list menu. |
| [ICollectionListMenuSelection](Interface.ICollectionListMenuSelection) | Activated menu option emitted by a collection list. |
| [ICollectionTablePage](Interface.ICollectionTablePage) | A bounded page of rows, or group paths and full filtered counts from the source. |
| [ICollectionTablePageQuery](Interface.ICollectionTablePageQuery) | A grouped collection request, independent of the source transport. |
| [ICollectionTableRowsOptions](Interface.ICollectionTableRowsOptions) | Host capabilities and data callbacks for a desktop table backed by a paged source. |
| [ICollectionTableView](Interface.ICollectionTableView) | Runtime table projection for a collection view. |
| [ICollectionTableViewConfig](Interface.ICollectionTableViewConfig) | Configuration for the table projection of a collection view. |
| [ICollectionView](Interface.ICollectionView) | Runtime collection-view model exposed by feature presenters. |
| [ICollectionViewConfig](Interface.ICollectionViewConfig) | Complete collection-view configuration for a feature collection. |
| [ICollectionViewDefinition](Interface.ICollectionViewDefinition) | Describes a view option that can be activated for a collection surface. |
| [IColorSelectedEvent](Interface.IColorSelectedEvent) | Event emitted when a color is selected. |
| [ICompoundItemContext](Interface.ICompoundItemContext) | Context exposed to a compound item's dynamic template. |
| [IContentNavigationItem](Interface.IContentNavigationItem) | Describes a stable in-page destination exposed by a content navigation. |
| [IContentNavigationViewportState](Interface.IContentNavigationViewportState) | - |
| [IContextDrawerTarget](Interface.IContextDrawerTarget) | A feature-owned contextual overlay presented through Mosaik drawers. |
| [IContextMenuContentContext](Interface.IContextMenuContentContext) | Template context supplied to declarative context-menu content. |
| [IContextMenuOpenRequest](Interface.IContextMenuOpenRequest) | Describes one request to open a context menu at a viewport position. |
| [IDataTableColumnPreference](Interface.IDataTableColumnPreference) | Persisted visibility, width and pinning of one data-table column. |
| [IDataTablePreferenceState](Interface.IDataTablePreferenceState) | Persisted state for a Mosaik data-table. |
| [IDateFilterRange](Interface.IDateFilterRange) | Date range resolved from a filter value. |
| [IDetailPanelChange](Interface.IDetailPanelChange) | - |
| [IDocumentLayoutSymbolAppearance](Interface.IDocumentLayoutSymbolAppearance) | Presentation-only appearance contract for the compact document-layout symbol. |
| [IDocumentPreviewRequest](Interface.IDocumentPreviewRequest) | Captures one document and the caller-owned operation that loads its bytes. Authentication, document identity and permission checks remain with the caller. |
| [IDynamicFormDefinition](Interface.IDynamicFormDefinition) | Versioned, UI-owned definition of a dynamic form. |
| [IDynamicFormFieldDefinition](Interface.IDynamicFormFieldDefinition) | UI-owned definition of one dynamically rendered form field. |
| [IDynamicFormFieldLayout](Interface.IDynamicFormFieldLayout) | Responsive semantic layout for a dynamic form field. |
| [IDynamicFormGridPlacement](Interface.IDynamicFormGridPlacement) | Semantic placement of a field in a twelve-column grid. |
| [IDynamicFormLinkConfiguration](Interface.IDynamicFormLinkConfiguration) | UI-owned labels for a read-only dynamic link control. |
| [IDynamicFormOption](Interface.IDynamicFormOption) | Selectable option owned by the frontend dynamic form contract. |
| [IDynamicFormSectionDefinition](Interface.IDynamicFormSectionDefinition) | Visual section containing related dynamic form fields. |
| [IDynamicFormValidationRule](Interface.IDynamicFormValidationRule) | UI-owned declarative validation rule for a dynamic form field. |
| [IEmailLayoutSymbolAppearance](Interface.IEmailLayoutSymbolAppearance) | Presentation-only appearance contract for the compact email-layout symbol. |
| [IExpandableMultilineConfiguration](Interface.IExpandableMultilineConfiguration) | Configuration supplied by the consuming view. |
| [IEyeDropperColorChange](Interface.IEyeDropperColorChange) | - |
| [IEyeDropperError](Interface.IEyeDropperError) | - |
| [IFileItem](Interface.IFileItem) | Framework-independent view model rendered by the generic files container. |
| [IFilterBarConfig](Interface.IFilterBarConfig) | Configuration for the FilterBarComponent. |
| [IFilterColumnBinding](Interface.IFilterColumnBinding) | Binds a column key to its filter metadata. Used by [buildFilterDefinitions](Function.buildFilterDefinitions) to resolve labels from column definitions and produce [IFilterDefinition](Interface.IFilterDefinition) entries. |
| [IFilterController](Interface.IFilterController) | Controller for list filter visibility, application and saved filters. |
| [IFilterControllerConfig](Interface.IFilterControllerConfig) | Configuration for `createFilterController()`. |
| [IFilterDefinition](Interface.IFilterDefinition) | Describes a single filter field in the filter bar. |
| [IFilterOption](Interface.IFilterOption) | Option for select-type filters. |
| [IFloatingHostPosition](Interface.IFloatingHostPosition) | Position and size configuration for the floating host. |
| [IFlowColumnExpansionPreference](Interface.IFlowColumnExpansionPreference) | Persistent expanded state for the columns of one flow board. |
| [IHasElementRef](Interface.IHasElementRef) | Represents any object that exposes a native element reference, which lets the hover-reveal directive accept Angular components that inject and expose their `ElementRef`. |
| [IImageAddedEvent](Interface.IImageAddedEvent) | Event emitted when a file is selected via the file picker. |
| [IImageCropConfig](Interface.IImageCropConfig) | Optional behavior and presentation overrides for an image crop dialog. |
| [IImageCropLabels](Interface.IImageCropLabels) | User-visible labels rendered by the image crop dialog. |
| [IImageCropPoint](Interface.IImageCropPoint) | Two-dimensional point in rendered-image coordinates. |
| [IImageCropRef](Interface.IImageCropRef) | Public handle for observing and visually integrating an open image crop dialog. |
| [IImageCropSelection](Interface.IImageCropSelection) | Pixel-based rectangle selected on a rendered image. |
| [IImageMarkupCropSelection](Interface.IImageMarkupCropSelection) | Immutable crop rectangle expressed in source-image pixels. |
| [IImageMarkupEditorConfig](Interface.IImageMarkupEditorConfig) | Optional behavior and presentation overrides for the generic image markup editor. |
| [IImageMarkupEditorLabels](Interface.IImageMarkupEditorLabels) | User-visible labels rendered by the generic image markup editor. |
| [IImageMarkupEditorRef](Interface.IImageMarkupEditorRef) | Public handle for observing and visually integrating an open image markup editor. |
| [IImageMarkupOperation](Interface.IImageMarkupOperation) | Immutable drawing operation stored by the markup editor history. |
| [IImageMarkupPoint](Interface.IImageMarkupPoint) | Point in source-image pixel coordinates. |
| [IImagePreviewConfig](Interface.IImagePreviewConfig) | Configures image preview behavior and presentation. |
| [IImagePreviewImage](Interface.IImagePreviewImage) | Describes an image or video rendered by the preview. |
| [IImagePreviewLabels](Interface.IImagePreviewLabels) | Accessible labels used by image preview controls. |
| [IImageRemovedEvent](Interface.IImageRemovedEvent) | Event emitted when the image is removed. |
| [IInputHistoryNavigationEvent](Interface.IInputHistoryNavigationEvent) | Describes a value recalled through input history navigation. |
| [ILegalLink](Interface.ILegalLink) | Describes a trusted website-level legal or company link. |
| [ILiveFilterPreference](Interface.ILiveFilterPreference) | Stores an active filter so the presenter can restore it before the first list load. |
| [IMapConfiguration](Interface.IMapConfiguration) | Application-owned browser credentials and localization for Google Maps. |
| [IMapsAddress](Interface.IMapsAddress) | A postal address as [MapsPipe](Class.MapsPipe) reads it. Every part is optional, because the shape mirrors what an API actually returns rather than what a complete address would hold. |
| [IMarkdownRendererOptions](Interface.IMarkdownRendererOptions) | Options for the markdown renderer. |
| [IPagePathLevel](Interface.IPagePathLevel) | One level of a page path. The last level names the current page. |
| [IPageToolbarDefaults](Interface.IPageToolbarDefaults) | Application defaults for the page toolbar. Label getters can read translation signals. |
| [IParseRecurrenceRuleOptions](Interface.IParseRecurrenceRuleOptions) | - |
| [IPdfPreviewOptions](Interface.IPdfPreviewOptions) | Host configuration for the optional PDF.js preview. The host owns the matching SDK, worker, viewer styles and any assets it chooses to serve. |
| [IPrimaryLegalAction](Interface.IPrimaryLegalAction) | One prominent route-scoped legal action rendered by a public shell. |
| [IRailHost](Interface.IRailHost) | Coordinates declarative rail actions with independently declared rail content. |
| [IRecurrenceEditorLabels](Interface.IRecurrenceEditorLabels) | - |
| [IRecurrenceEditorOptions](Interface.IRecurrenceEditorOptions) | Initial value, available options and labels for the recurrence drawer. |
| [IRecurrenceOption](Interface.IRecurrenceOption) | - |
| [IRecurrenceSummaryLabels](Interface.IRecurrenceSummaryLabels) | Translated sentence fragments used to describe a recurrence. |
| [IRecurrenceValue](Interface.IRecurrenceValue) | - |
| [ISavedFilter](Interface.ISavedFilter) | Named filter definition persisted for one list view. |
| [ISavedFilterController](Interface.ISavedFilterController) | Controller for persisted named filters. |
| [ISavedFilterControllerConfig](Interface.ISavedFilterControllerConfig) | Configuration for [createSavedFilterController](Function.createSavedFilterController). |
| [ISavedFilterCreateRequest](Interface.ISavedFilterCreateRequest) | Request emitted when a user wants to save the current filter values. |
| [ISavedFilterDrawerData](Interface.ISavedFilterDrawerData) | Drawer input data for saving a filter. |
| [ISavedFilterDrawerResult](Interface.ISavedFilterDrawerResult) | Drawer result for saving a filter. |
| [ISavedFilterPreferenceState](Interface.ISavedFilterPreferenceState) | Persisted named filter preference payload. |
| [ISavedFilterSummaryItem](Interface.ISavedFilterSummaryItem) | Visual summary item for a saved filter definition. |
| [ITextSuggestionMessages](Interface.ITextSuggestionMessages) | Localized labels used by a whole-field suggestion list. |
| [ITextSuggestionOption](Interface.ITextSuggestionOption) | A selectable result supplied by an application-owned suggestion source. |
| [ITicktackPanelChange](Interface.ITicktackPanelChange) | State change emitted by a ticktack panel. |
| [ITourContribution](Interface.ITourContribution) | Describes a feature-owned set of steps that can be composed into a larger tour. |
| [ITourContributionStep](Interface.ITourContributionStep) | Describes one feature-owned step before its final tour anchor is namespaced. |
| [IUrlFormData](Interface.IUrlFormData) | Editable web-link fields shared by feature forms. |
| [IUrlListLabels](Interface.IUrlListLabels) | Localized labels of a categorized web-link editor. |
| [IViewportClearanceReservation](Interface.IViewportClearanceReservation) | A live reservation that can be resized and released. |
| [IVoiceSessionControlLabels](Interface.IVoiceSessionControlLabels) | Localized copy required by the voice-session control surface. |
| [IWidget](Interface.IWidget) | One dashboard widget, contributed as plain data so any host can render the same registry: its identity and order, its reactive display text, the default placement and resize constraints it asks for, and the lazily loaded components that make up its faces. |
| [IWidgetData](Interface.IWidgetData) | The data payload attached to one widget instance. A widget shell binds it into the child injector of the rendered view under `WIDGET_DATA`, which is how a view reads what its widget was configured with without the registry knowing the payload's shape. |
| [IWidgetEditorCanvasZone](Interface.IWidgetEditorCanvasZone) | One semantic zone and the enabled widgets currently rendered on the editor canvas. |
| [IWidgetGridItemDefinition](Interface.IWidgetGridItemDefinition) | One item a widget grid can place, with its text already resolved. It is the framework-free projection of an `IWidget`: `toWidgetGridItemDefinition(...)` derives it, and a host that has no widget registry at all can build it by hand. |
| [IWidgetGridItemLayout](Interface.IWidgetGridItemLayout) | The persisted placement of one widget: where the user put it, how large they made it and whether they kept it visible. |
| [IWidgetGridItemTemplateContext](Interface.IWidgetGridItemTemplateContext) | The context a widget grid hands to the template that renders one item. |
| [IWidgetGridLabels](Interface.IWidgetGridLabels) | Resolved user-facing labels needed by the generic widget-grid editor. |
| [IWidgetGridLayout](Interface.IWidgetGridLayout) | The versioned user configuration of one widget grid: the order of its zones and the placement of every widget the user has ever seen. |
| [IWidgetGridResizePreview](Interface.IWidgetGridResizePreview) | The span a widget grid item would take if the user released the resize handle now. |
| [IWidgetGridZoneDefinition](Interface.IWidgetGridZoneDefinition) | One semantic zone a widget grid renders, with its text already resolved. The layout algebra is i18n-agnostic on purpose: it receives finished strings and never a translation key, so nothing about a persisted layout depends on the language it was created in. |
| [IWidgetGridZoneLayout](Interface.IWidgetGridZoneLayout) | The persisted ordering of one widget-grid zone. |
| [IWidgetLayout](Interface.IWidgetLayout) | The default placement and the resize constraints contributed by one widget. A persisted user layout overrides the defaults without ever mutating the registered widget definition. |
| [IWidgetManager](Interface.IWidgetManager) | The composition port of the widget infrastructure: it collects the widgets contributed through DI and lets a host add or drop widgets at runtime. Storage and ordering are delegated to the [IWidgetRegistry](Interface.IWidgetRegistry). |
| [IWidgetRegistry](Interface.IWidgetRegistry) | The storage port of the widget infrastructure: it keeps the registered widgets and publishes them in registration-independent order. It holds definitions only — a user's placement of those widgets is a separate, persisted `IWidgetGridLayout`. |
| [IWidgetSize](Interface.IWidgetSize) | The logical size of a widget inside its owning grid, in grid cells. A shell publishes it under `WIDGET_SIZE` so a widget view can adapt its density to the space it actually occupies. |
| [IWidgetSizeCondition](Interface.IWidgetSizeCondition) | A size condition a widget template checks before it renders a density variant. Each axis is either an exact span or an inclusive [IWidgetSizeRange](Interface.IWidgetSizeRange); an omitted axis is unconstrained. |
| [IWidgetSizeRange](Interface.IWidgetSizeRange) | An inclusive span range used by one axis of an [IWidgetSizeCondition](Interface.IWidgetSizeCondition). An omitted bound is unconstrained. |
| [IWidgetSpanRange](Interface.IWidgetSpanRange) | The supported span range of one widget axis together with the span it starts out with. The same shape describes a contributed [IWidgetLayout](Interface.IWidgetLayout) and a reconciled [IWidgetGridItemDefinition](Interface.IWidgetGridItemDefinition), so a widget declares its constraints exactly once. |
| [IWidgetViews](Interface.IWidgetViews) | The lazily loaded components of one widget: the face it normally shows and an optional back side a shell may flip to. Both are loaders rather than component references, so a dashboard only pays for the widgets it actually renders. |
| [IWidgetVisualConfig](Interface.IWidgetVisualConfig) | Visual treatment applied by the shared widget shell. |
| [IWidgetZone](Interface.IWidgetZone) | A page-neutral suggestion for a widget's initial semantic zone. Widgets contribute these descriptors dynamically, so a new contribution can introduce a zone without a central zone inventory. The consuming page owns the localized labels and decides whether or how to render a zone heading. |
| [IWithTourDefinitionsOptions](Interface.IWithTourDefinitionsOptions) | Options for contributing one or more native Mosaik tour definitions. |
| [IWithWidgetItemsOptions](Interface.IWithWidgetItemsOptions) | Options of `withWidgetItems(...)`. |

## Type Aliases

| Type Alias | Description |
| ------ | ------ |
| [ActivityLogState](TypeAlias.ActivityLogState) | Lifecycle of a paged activity request. |
| [ActivityTextParagraph](TypeAlias.ActivityTextParagraph) | Paragraph from a text comparison. |
| [AdvancedFilterNode](TypeAlias.AdvancedFilterNode) | Advanced filter tree node. |
| [AiAttention](TypeAlias.AiAttention) | Optional visual attention treatment for an AI-enhanced element. |
| [AiBeamPalette](TypeAlias.AiBeamPalette) | Color palette rendered by an AI beam. |
| [AiBeamPreset](TypeAlias.AiBeamPreset) | Visual and motion preset rendered by an AI beam. |
| [AiBeamResolvedTheme](TypeAlias.AiBeamResolvedTheme) | The theme the rendering engine works with, once `auto` has been resolved against the browser's preferred color scheme. |
| [AiBeamTheme](TypeAlias.AiBeamTheme) | Theme used to tune an AI beam for its background. `auto` follows the browser's preferred color scheme. |
| [AiRailBadgeVariant](TypeAlias.AiRailBadgeVariant) | Defines the supported badge variants for an AI rail result. |
| [AiRailChoiceType](TypeAlias.AiRailChoiceType) | Represents a supported AI rail choice type. |
| [AiRailSection](TypeAlias.AiRailSection) | Represents an internally rendered AI rail section. |
| [AudioActivityState](TypeAlias.AudioActivityState) | Visual activity states supported by the audio activity orb. |
| [AudioSignalQuality](TypeAlias.AudioSignalQuality) | Technical input-signal quality visualized by the signal indicator. |
| [AuditLogChangeSide](TypeAlias.AuditLogChangeSide) | Identifies one side of an audit log field change. |
| [AuditLogChangeValueFormatter](TypeAlias.AuditLogChangeValueFormatter) | Formats a raw audit log value for display. |
| [AuditLogChangeValueFormatterFn](TypeAlias.AuditLogChangeValueFormatterFn) | Formats a raw audit log value for display. |
| [AuditLogFieldIconResolverFn](TypeAlias.AuditLogFieldIconResolverFn) | Resolves the icon name for an audit log field change. |
| [AuditLogFieldLabelResolver](TypeAlias.AuditLogFieldLabelResolver) | Resolves the display label for an audit log field change. |
| [AuditLogFieldLabelResolverFn](TypeAlias.AuditLogFieldLabelResolverFn) | Resolves the display label for an audit log field change. |
| [CaptchaOperator](TypeAlias.CaptchaOperator) | Supported mathematical operations for captcha challenges. |
| [CaptchaState](TypeAlias.CaptchaState) | Captcha component state. |
| [CollectionExportFormat](TypeAlias.CollectionExportFormat) | Supported export document formats. |
| [CollectionViewKindValue](TypeAlias.CollectionViewKindValue) | Union of all collection-view projection kinds. |
| [CollectionViewTypeValue](TypeAlias.CollectionViewTypeValue) | Union of all built-in collection view types. |
| [CompoundLayoutValue](TypeAlias.CompoundLayoutValue) | A supported compound layout. |
| [CompoundViewModeValue](TypeAlias.CompoundViewModeValue) | Supported view mode value of a compound collection. |
| [ContentNavigationScrollDirection](TypeAlias.ContentNavigationScrollDirection) | - |
| [DetailPanelCloseReason](TypeAlias.DetailPanelCloseReason) | - |
| [DetailPanelHandleVariant](TypeAlias.DetailPanelHandleVariant) | - |
| [DocumentPreviewMimeType](TypeAlias.DocumentPreviewMimeType) | Media type required from a document loader before its content can be rendered. |
| [DynamicFormControlTypeValue](TypeAlias.DynamicFormControlTypeValue) | Union of supported dynamic form renderer kinds. |
| [DynamicFormGridSpan](TypeAlias.DynamicFormGridSpan) | Number of columns occupied in the semantic twelve-column grid. |
| [DynamicFormGridStart](TypeAlias.DynamicFormGridStart) | One-based start column in the semantic twelve-column grid. |
| [DynamicFormOptionValue](TypeAlias.DynamicFormOptionValue) | Scalar value supported by a dynamic select option. |
| [DynamicFormValidationRuleKeyValue](TypeAlias.DynamicFormValidationRuleKeyValue) | Supported declarative dynamic-form validation rule key. |
| [DynamicFormValue](TypeAlias.DynamicFormValue) | Value supported by the dynamic form renderer. |
| [DynamicFormValues](TypeAlias.DynamicFormValues) | Values indexed by stable dynamic form field keys. |
| [FilePresentationValue](TypeAlias.FilePresentationValue) | Union of semantic file presentation values. |
| [FilePreviewMediaKind](TypeAlias.FilePreviewMediaKind) | Media families supported by a Mosaik file thumbnail. |
| [FilesLayoutValue](TypeAlias.FilesLayoutValue) | Value represented by [FilesLayout](Variable.FilesLayout). |
| [FileSourceTypeValue](TypeAlias.FileSourceTypeValue) | Value represented by [FileSourceType](Variable.FileSourceType). |
| [FileStateValue](TypeAlias.FileStateValue) | Union of visual states supported by the file component. |
| [FilterBarModeValue](TypeAlias.FilterBarModeValue) | Union type of all supported filter bar modes. |
| [FilterConditionValue](TypeAlias.FilterConditionValue) | Union type of all supported advanced filter conditions. |
| [FilterOperatorValue](TypeAlias.FilterOperatorValue) | Union type of all supported advanced filter operators. |
| [FilterTypeValue](TypeAlias.FilterTypeValue) | Union type of all supported filter types. |
| [FilterValues](TypeAlias.FilterValues) | Emitted filter values as a key-value record. |
| [HoverRevealTarget](TypeAlias.HoverRevealTarget) | Union of every value the hover-reveal directive can observe: an Angular `ElementRef`, a raw `HTMLElement`, a component exposing an `elementRef`, or `null` to detach. |
| [ICollectionTableFieldConfig](TypeAlias.ICollectionTableFieldConfig) | Data-table behavior for a collection field. |
| [IDocumentPreviewRef](TypeAlias.IDocumentPreviewRef) | Existing Mosaik drawer reference for dismissing or observing a document preview. |
| [ImageMarkupSymbolValue](TypeAlias.ImageMarkupSymbolValue) | Value accepted as an image markup symbol. |
| [ImageMarkupToolValue](TypeAlias.ImageMarkupToolValue) | Value accepted as an image markup tool. |
| [ImmersiveSessionPhase](TypeAlias.ImmersiveSessionPhase) | The caller-controlled preparation, connection, live or completion phase of a session. |
| [ImmersiveSessionRailState](TypeAlias.ImmersiveSessionRailState) | Visibility and attachment state of an immersive session rail. |
| [InputHistoryNavigationDirection](TypeAlias.InputHistoryNavigationDirection) | Describes the navigation operation that changed the control value. |
| [InputSuggestionSource](TypeAlias.InputSuggestionSource) | Supplies options for a normalized whole-field query. The signal is aborted when the query is replaced, the suggestions close, or the owning directive is destroyed. |
| [IntlLabelKey](TypeAlias.IntlLabelKey) | The string-valued property keys of an internationalization class — the labels an application may translate. |
| [IntlTranslationMap](TypeAlias.IntlTranslationMap) | Maps the labels of an internationalization class onto the application's own translation keys. Every key must name an existing string property of the class, so a renamed label breaks the build instead of silently falling back to English. |
| [LiveAudioWaveformMode](TypeAlias.LiveAudioWaveformMode) | Available waveform layout modes. |
| [LiveAudioWaveformState](TypeAlias.LiveAudioWaveformState) | Visual and analysis states supported by the live audio waveform. |
| [LogoType](TypeAlias.LogoType) | - |
| [MapsSearchUrlFactory](TypeAlias.MapsSearchUrlFactory) | Builds the URL of a map search for an already assembled address query. |
| [MapsValue](TypeAlias.MapsValue) | Everything [MapsPipe](Class.MapsPipe) can turn into a map query: a structured address or a single line of address text. |
| [MarkdownRenderer](TypeAlias.MarkdownRenderer) | Partial renderer type for `marked`. |
| [MatchWidthSource](TypeAlias.MatchWidthSource) | Sources supported by [MatchWidthDirective](Class.MatchWidthDirective). |
| [RecurrenceEndMode](TypeAlias.RecurrenceEndMode) | - |
| [RecurrenceFrequency](TypeAlias.RecurrenceFrequency) | - |
| [RecurrenceMonthlyMode](TypeAlias.RecurrenceMonthlyMode) | - |
| [RecurrenceWeekday](TypeAlias.RecurrenceWeekday) | - |
| [ScrollToErrorState](TypeAlias.ScrollToErrorState) | Minimal Signal Forms state used to associate a validation scope with its triggers. |
| [StopEventPropagationEventName](TypeAlias.StopEventPropagationEventName) | The DOM events the stop-propagation directive can intercept. |
| [TicktackPanelChangeReason](TypeAlias.TicktackPanelChangeReason) | Describes why a ticktack panel changed sides. |
| [TicktackPanelPosition](TypeAlias.TicktackPanelPosition) | Describes which side of a ticktack panel is visible. |
| [TourContributionText](TypeAlias.TourContributionText) | Text supplied by a feature to a composed tour step. |
| [TourFeature](TypeAlias.TourFeature) | Composable contribution to the shared tour runtime. |
| [TourFeatureKind](TypeAlias.TourFeatureKind) | Feature kind supported by the root tour composition. |
| [ViewportClearanceEdge](TypeAlias.ViewportClearanceEdge) | Viewport edge reserved by a visible surface. |
| [WidgetFeatureKind](TypeAlias.WidgetFeatureKind) | The kinds of features `provideWidget(...)` accepts. The kind is multi: any number of feature libraries may contribute widgets. |

## Variables

| Variable | Description |
| ------ | ------ |
| [AiRailChoiceType](Variable.AiRailChoiceType) | Defines how an AI rail choice continues the inline interaction. |
| [AiRailSection](Variable.AiRailSection) | Defines the internally rendered section of an AI rail. |
| [BYTES\_FALLBACK\_TEXT](Variable.BYTES_FALLBACK_TEXT) | The text [BytesPipe](Class.BytesPipe) renders for an unknown size, that is `null`, `undefined` or a non-finite number. Defaults to `0 B`; provide a translated string such as "measuring…" where a size is still being determined. |
| [CollectionViewKind](Variable.CollectionViewKind) | Internal projection kinds supported by the collection-view factory. |
| [CollectionViewType](Variable.CollectionViewType) | Built-in collection view types supported by ngpel. |
| [COMPOUND\_TOUR\_TARGETS](Variable.COMPOUND_TOUR_TARGETS) | Stable signal-accessor targets exposed by every compound component. |
| [CompoundLayout](Variable.CompoundLayout) | Layouts available to a compound collection. |
| [CompoundViewMode](Variable.CompoundViewMode) | View modes supported by a compound collection. |
| [DEFAULT\_CAPTCHA\_OPERATORS](Variable.DEFAULT_CAPTCHA_OPERATORS) | Default operators used when none specified. |
| [DEFAULT\_MARKDOWN\_RENDERER](Variable.DEFAULT_MARKDOWN_RENDERER) | Default renderer instance. |
| [DOCUMENT\_PREVIEW\_MIME\_TYPES](Variable.DOCUMENT_PREVIEW_MIME_TYPES) | Browser-renderable document media types accepted by the shared preview. Active HTML and SVG documents are deliberately excluded. |
| [DynamicFormControlType](Variable.DynamicFormControlType) | Supported renderer kinds for a dynamic form field. |
| [DynamicFormValidationRuleKey](Variable.DynamicFormValidationRuleKey) | Supported declarative validation rules for UI-owned dynamic forms. |
| [FilePresentation](Variable.FilePresentation) | Semantic presentations supported by a file component. |
| [FilesLayout](Variable.FilesLayout) | Layouts supported by the generic files container. |
| [FileSourceType](Variable.FileSourceType) | Supported acquisition mechanisms for a declarative file source. |
| [FileState](Variable.FileState) | Visual states supported by the file component. |
| [FilterBarMode](Variable.FilterBarMode) | Supported filter bar modes. |
| [FilterCondition](Variable.FilterCondition) | Logical conditions for advanced filter groups. |
| [FilterOperator](Variable.FilterOperator) | Operators for advanced filter rules. |
| [FilterType](Variable.FilterType) | Supported filter field types. |
| [ImageMarkupSymbol](Variable.ImageMarkupSymbol) | Vector-safe symbols supported by the generic image markup editor. |
| [ImageMarkupTool](Variable.ImageMarkupTool) | Tools supported by the generic raster image markup editor. |
| [MAP\_CONFIGURATION](Variable.MAP_CONFIGURATION) | - |
| [MAPS\_SEARCH\_URL\_FACTORY](Variable.MAPS_SEARCH_URL_FACTORY) | The map service [MapsPipe](Class.MapsPipe) links to. Defaults to the Google Maps search URL; provide a different factory to link to another map provider or to an in-house map view. |
| [NOT\_AVAILABLE\_TEXT](Variable.NOT_AVAILABLE_TEXT) | The text [NotAvailablePipe](Class.NotAvailablePipe) renders for a missing value. Defaults to the locale-neutral `n/a`; provide a translated string once the application knows its locale. |
| [RAIL\_HOST](Variable.RAIL_HOST) | Resolves the generic coordinator shared by rail actions and rail content. |
| [RECURRENCE\_DEFAULT\_VALUE](Variable.RECURRENCE_DEFAULT_VALUE) | - |
| [RECURRENCE\_EDITOR\_TOUR\_TARGETS](Variable.RECURRENCE_EDITOR_TOUR_TARGETS) | Stable signal-accessor targets exposed by every recurrence editor. |
| [RECURRENCE\_END\_MODE\_OPTIONS](Variable.RECURRENCE_END_MODE_OPTIONS) | - |
| [RECURRENCE\_INTERVAL\_OPTIONS](Variable.RECURRENCE_INTERVAL_OPTIONS) | - |
| [RECURRENCE\_MONTHLY\_MODE\_OPTIONS](Variable.RECURRENCE_MONTHLY_MODE_OPTIONS) | - |
| [RECURRENCE\_WEEKDAY\_OPTIONS](Variable.RECURRENCE_WEEKDAY_OPTIONS) | - |
| [RECURRENCE\_WEEKDAY\_ORDINAL\_OPTIONS](Variable.RECURRENCE_WEEKDAY_ORDINAL_OPTIONS) | - |
| [TourFeatureKinds](Variable.TourFeatureKinds) | Branded feature kinds supported by the root tour composition. |
| [WIDGET](Variable.WIDGET) | The multi-provider token every feature library contributes its widgets to. `provideWidget(...)` collects the contributions and hands them to the [WidgetManager](Class.WidgetManager); contribute through `withWidgetItems(...)` rather than binding the token by hand. |
| [WIDGET\_DATA](Variable.WIDGET_DATA) | The token a widget shell binds in the child injector of a rendered widget view, so the view can read the payload its widget was registered with. |
| [WIDGET\_FLIP](Variable.WIDGET_FLIP) | Switches between the card's primary view and its settings. |
| [WIDGET\_GRID\_LAYOUT\_CODEC](Variable.WIDGET_GRID_LAYOUT_CODEC) | The codec for a locally persisted widget-grid layout. It plugs straight into the user-preference port of `@pixel-brewery/ngpel-core/storage`. |
| [WIDGET\_GRID\_LAYOUT\_VERSION](Variable.WIDGET_GRID_LAYOUT_VERSION) | The schema version of the persisted widget-grid layout. `WIDGET_GRID_LAYOUT_CODEC` migrates older payloads to it and rejects payloads it does not understand, so a stored layout never reaches the grid half-applied. |
| [WIDGET\_SIZE](Variable.WIDGET_SIZE) | The token a widget shell binds to publish the logical grid size of the widget it renders, including a live resize preview. A view reads it through `WidgetViewDirective` and adapts its density to the space it actually has. |
| [WIDGET\_TOUR\_TARGETS](Variable.WIDGET_TOUR_TARGETS) | Stable tour target keys exposed by widget shells and tour-aware widget views. |
| [WidgetFeatureKinds](Variable.WidgetFeatureKinds) | The branded kind vocabulary of the widget entry point. |

## Functions

| Function | Description |
| ------ | ------ |
| [addAdvancedFilterNode](Function.addAdvancedFilterNode) | Adds a node to a target group. |
| [buildFilterDefinitions](Function.buildFilterDefinitions) | Builds filter definitions by resolving [IFilterColumnBinding](Interface.IFilterColumnBinding) entries against column definitions. The column's `title` is used as the filter label. |
| [byteSize](Function.byteSize) | Formats a byte count as a human readable size. |
| [collectWidgetZones](Function.collectWidgetZones) | Derives the distinct zones the registered widgets ask for, ordered by the zone order and then by zone id. There is no global zone inventory: a new widget contribution introduces its zone by declaring it, and a zone disappears with the last widget that wanted it. |
| [colorFromString](Function.colorFromString) | Derives a stable colour from text, so the same tenant, tag or user always shows the same tint without anybody storing a colour for it. |
| [createActivityLogController](Function.createActivityLogController) | Owns paging and cancellation for one activity view. Create in the host's injection context. |
| [createAdvancedFilterGroup](Function.createAdvancedFilterGroup) | Creates an advanced filter group. |
| [createAdvancedFilterRule](Function.createAdvancedFilterRule) | Creates an advanced filter rule. |
| [createCollectionView](Function.createCollectionView) | Creates a signal-based collection-view model from a declarative configuration. |
| [createDefaultWidgetGridLayout](Function.createDefaultWidgetGridLayout) | Creates the layout a user starts with, purely from what the zones and items contribute. |
| [createFilePreview](Function.createFilePreview) | Creates a thumbnail for a URL whose lifecycle is owned by the caller. |
| [createFilePreviewFallback](Function.createFilePreviewFallback) | Returns a generic document thumbnail for files without a media preview. |
| [createFilterController](Function.createFilterController) | Creates the shared controller for list filter interactions. |
| [createFlowColumnExpansionPreference](Function.createFlowColumnExpansionPreference) | Creates a local-storage-backed flow-column expansion preference. |
| [createImageCropSelection](Function.createImageCropSelection) | Creates a normalized rectangle independent of drag direction. |
| [createMarkdownExtensions](Function.createMarkdownExtensions) | The authored Markdown dialect that `@pixel-brewery/markdowner-core` adds on top of GitHub-flavored Markdown, rendered as Mosaik element compositions: `::: splits`, `::: callout`, `> [!TYPE]`, fenced code, `::: tabs`, `::: steps`, `::: details`, `::: button` and `::: card`. |
| [createMarkedRenderer](Function.createMarkedRenderer) | Creates a `marked` renderer that outputs Mosaik web component HTML. |
| [createPlaceholderCompletions](Function.createPlaceholderCompletions) | Creates a CodeMirror `CompletionSource` that suggests <code v-pre>{{placeholder}}</code> tokens. The completions trigger when the user types <code v-pre>{{</code> or when invoked explicitly. |
| [createRecurrenceRule](Function.createRecurrenceRule) | Serializes the editable recurrence. Applications that store the end separately can keep the default behavior. Set `includeUntil` for a self-contained RFC 5545 rule. |
| [createSavedFilterController](Function.createSavedFilterController) | Creates a local-storage backed saved filter controller. |
| [createSavedFilterSummary](Function.createSavedFilterSummary) | Creates display-ready summary rows for standard and advanced filter values. |
| [createTourContributionAnchorMap](Function.createTourContributionAnchorMap) | Creates the accessor mapping for a contribution within a composed tour. |
| [createTourContributionSteps](Function.createTourContributionSteps) | Materializes feature-owned contributions as native Mosaik tour steps. |
| [defineCalendarCollectionView](Function.defineCalendarCollectionView) | Defines a calendar collection view with full type inference. |
| [defineCollectionField](Function.defineCollectionField) | Defines a collection field with full type inference. |
| [defineFlowCollectionView](Function.defineFlowCollectionView) | Defines a flow collection view with full type inference. |
| [defineGalleryCollectionView](Function.defineGalleryCollectionView) | Defines a gallery collection view with full type inference. |
| [defineTableCollectionView](Function.defineTableCollectionView) | Defines a table collection view with full type inference. |
| [describeRecurrence](Function.describeRecurrence) | Describes the frequency and end condition for read-only recurrence fields. |
| [diffActivityText](Function.diffActivityText) | Compares two versions of a long text paragraph by paragraph and, within changed paragraphs, word by word. |
| [escapeMarkdownAttribute](Function.escapeMarkdownAttribute) | Escapes an untrusted value for one HTML attribute of the generated markup. The ampersand is escaped first so the entities produced by the later replacements are not escaped a second time. Elements that treat their `text` attribute as plain content need exactly this single pass, because the HTML parser decodes the attribute once before the element ever sees it. |
| [escapeMarkdownText](Function.escapeMarkdownText) | Escapes untrusted Markdown source for a `text` attribute that the receiving element renders as HTML (Mosaik elements put such values on screen through `unsafeHTML`). The HTML parser already consumes one level of escaping while parsing the attribute, so a single pass would hand live markup to the element. Escaping twice makes embedded HTML arrive as the literal characters a reader is supposed to see. |
| [flattenAdvancedFilterTree](Function.flattenAdvancedFilterTree) | Flattens a filter tree for list-like rendering. |
| [getBooleanFilterValue](Function.getBooleanFilterValue) | Resolves a boolean filter value. |
| [getContrastingTextColor](Function.getContrastingTextColor) | Picks the text colour that stays readable on a background colour, using the YIQ brightness of the background: dark text on a light ground, light text on a dark one. |
| [getDateFilterRange](Function.getDateFilterRange) | Resolves a date filter to a full-day UTC range. |
| [getDateFilterValue](Function.getDateFilterValue) | Reads the raw selected value of a date filter from a simple filter or the first matching equality or on-date rule in an advanced filter. Callers choose how to interpret the stored date. |
| [getNumberFilterValue](Function.getNumberFilterValue) | Resolves a finite number filter value. |
| [getOptionFilterValue](Function.getOptionFilterValue) | Resolves an option value when it is part of the allowed backend enum values. |
| [getTextFilterValue](Function.getTextFilterValue) | Resolves a trimmed string filter value. |
| [isAdvancedFilterGroup](Function.isAdvancedFilterGroup) | Returns whether a node is a group. |
| [isAdvancedFilterRule](Function.isAdvancedFilterRule) | Returns whether a node is a rule. |
| [mapAiRailPromptSubmittedEvent](Function.mapAiRailPromptSubmittedEvent) | Maps an AI rail's Mosaik Prompt Box submission to its submitted text. |
| [matchesWidgetSize](Function.matchesWidgetSize) | Evaluates whether a logical widget size satisfies an exact or ranged template condition. Both axes must match; an axis the condition omits is unconstrained. |
| [moveWidgetGridItem](Function.moveWidgetGridItem) | Moves one widget into a zone at a position and renumbers both the zone it left and the zone it joined. Dropping a widget always shows it, which is what makes dragging one out of the toolbox the same gesture as moving one between zones. |
| [moveWidgetGridZone](Function.moveWidgetGridZone) | Moves one zone to another position and renumbers the zone order. |
| [normalizeRecurrenceByDays](Function.normalizeRecurrenceByDays) | - |
| [parseRecurrenceRule](Function.parseRecurrenceRule) | - |
| [provideAiRailComponentIntl](Function.provideAiRailComponentIntl) | Provides application-specific internationalization labels for the AI rail component. |
| [provideCaptchaComponentIntl](Function.provideCaptchaComponentIntl) | Provides application-specific internationalization labels for the captcha component. |
| [provideCodeEditorComponentIntl](Function.provideCodeEditorComponentIntl) | Provides application-specific internationalization labels for the code editor component. |
| [provideCollectionExportDrawerComponentIntl](Function.provideCollectionExportDrawerComponentIntl) | Provides application-specific internationalization labels for the collection export drawer component. |
| [provideColorSelectorComponentIntl](Function.provideColorSelectorComponentIntl) | Provides application-specific internationalization labels for the color selector component. |
| [provideContextDrawerTarget](Function.provideContextDrawerTarget) | Registers a contextual target using the application's existing Mosaik drawer provider. The router owns URL-driven closing, while Mosaik retains the shell's presentation defaults. |
| [provideDetailPanelComponentIntl](Function.provideDetailPanelComponentIntl) | Provides application-specific internationalization labels for the detail panel component. |
| [provideDocumentPreviewIntl](Function.provideDocumentPreviewIntl) | Maps the preview labels to application translation keys. Unmapped labels retain their defaults. |
| [provideFilterBarComponentIntl](Function.provideFilterBarComponentIntl) | Provides application-specific internationalization labels for the filter bar component. |
| [provideMap](Function.provideMap) | Registers application-owned Maps configuration without loading Google's SDK. |
| [providePageToolbarDefaults](Function.providePageToolbarDefaults) | Supplies application defaults for page toolbars. Individual toolbar inputs take precedence. |
| [providePdfPreview](Function.providePdfPreview) | Enables lazy PDF.js rendering for document previews opened by the host application. |
| [provideRailComponentIntl](Function.provideRailComponentIntl) | Provides application-specific internationalization labels for the rail component. |
| [provideTicktackPanelComponentIntl](Function.provideTicktackPanelComponentIntl) | Provides application-specific internationalization labels for the ticktack panel component. |
| [provideTour](Function.provideTour) | Provides the native tour runtime and composes feature-owned tour definitions. |
| [provideWidget](Function.provideWidget) | Composes the widget infrastructure: the [WidgetRegistry](Class.WidgetRegistry) that stores and orders widgets, the [WidgetManager](Class.WidgetManager) that collects the contributed ones, and every contribution passed in. Call it once, in the application composition root. |
| [reconcileWidgetGridLayout](Function.reconcileWidgetGridLayout) | Reconciles a stored layout with the zones and items that currently exist. |
| [removeAdvancedFilterNode](Function.removeAdvancedFilterNode) | Removes a node from a tree. The root group is kept intact. |
| [renderMarkdown](Function.renderMarkdown) | Renders untrusted GitHub-flavored Markdown into Mosaik element markup without raw HTML pass-through: embedded HTML degrades to literal text, every interpolated value is escaped for the attribute it lands in and only http(s) targets become links. |
| [renderPlainMarkdown](Function.renderPlainMarkdown) | Renders untrusted GitHub-flavored Markdown to plain HTML. A dense preview wants a few clipped lines of text rather than the element compositions the default renderer builds, and a host's own HTML sanitizer stays active on this path because no custom elements are involved. |
| [resizeWidgetGridItem](Function.resizeWidgetGridItem) | Grows or shrinks one widget by a number of grid cells, clamped to the constraints the widget itself declares. A resize gesture therefore never has to be validated by the pointer code: an over-long drag simply stops at the widget's own maximum. |
| [resolveDeclarativeTourTargetElements](Function.resolveDeclarativeTourTargetElements) | Collects the first rendered element for every declarative tour target value. |
| [resolveDynamicFormLayoutClasses](Function.resolveDynamicFormLayoutClasses) | Resolves semantic grid placement into statically discoverable Tailwind classes. |
| [resolveFilePreviewMediaKind](Function.resolveFilePreviewMediaKind) | Determines the thumbnail media family from MIME type, then from the file extension. |
| [resolveMosaikSelectionValue](Function.resolveMosaikSelectionValue) | Resolves the string value selected by a Mosaik selector. |
| [setWidgetGridItemEnabled](Function.setWidgetGridItemEnabled) | Shows or hides one widget while keeping its placement, so bringing it back puts it exactly where the user last had it. |
| [toPositiveInteger](Function.toPositiveInteger) | - |
| [toStopEventPropagationEvents](Function.toStopEventPropagationEvents) | Normalises the value bound to `ngpStopEventPropagation` into the shape the directive evaluates. |
| [toWidgetGridItemDefinition](Function.toWidgetGridItemDefinition) | Projects a registered widget onto the framework-free item contract the layout algebra works with, resolving the widget's reactive text on the way. Calling it inside a `computed(...)` keeps the derived definitions in step with a title that arrives with a late translation. |
| [translateIntl](Function.translateIntl) | Replaces the labels of an internationalization instance with the application's translations, resolved through Mosaik's translate service. |
| [updateAdvancedFilterGroupCondition](Function.updateAdvancedFilterGroupCondition) | Updates a group condition. |
| [withTourDefinitions](Function.withTourDefinitions) | Creates a composable feature contribution for native Mosaik tour definitions. |
| [withWidgetItems](Function.withWidgetItems) | Contributes widgets to the dashboard. A feature library exports one such contribution; the composition root passes it to `provideWidget(...)`. |
