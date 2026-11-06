/**
 * User-visible labels rendered by the generic image markup editor.
 *
 * @public
 */
export interface IImageMarkupEditorLabels {
    // #region Properties

    /** Dialog title. */
    readonly title: string;
    /** Dialog description. */
    readonly description: string;
    /** Accessible label for the editing canvas. */
    readonly canvasLabel: string;
    /** Cancel action. */
    readonly cancel: string;
    /** Apply action. */
    readonly apply: string;
    /** Undo action. */
    readonly undo: string;
    /** Redo action. */
    readonly redo: string;
    /** Clear-all action. */
    readonly clear: string;
    /** Drawing-tool toolbar label. */
    readonly tools: string;
    /** Hand tool for moving the drawing board. */
    readonly pan: string;
    /** Crop tool. */
    readonly crop: string;
    /** Pen tool. */
    readonly pen: string;
    /** Highlighter tool. */
    readonly highlighter: string;
    /** Eraser tool. */
    readonly eraser: string;
    /** Shape-tool group. */
    readonly shapes: string;
    /** Line tool. */
    readonly line: string;
    /** Arrow tool. */
    readonly arrow: string;
    /** Rectangle tool. */
    readonly rectangle: string;
    /** Ellipse tool. */
    readonly ellipse: string;
    /** Text tool. */
    readonly text: string;
    /** Symbol tool. */
    readonly symbol: string;
    /** Color field. */
    readonly color: string;
    /** Stroke-width field. */
    readonly strokeWidth: string;
    /** Font-size field. */
    readonly fontSize: string;
    /** Text-input placeholder. */
    readonly textPlaceholder: string;
    /** Symbol selector. */
    readonly symbolType: string;
    /** Checkmark symbol. */
    readonly checkmark: string;
    /** Cross symbol. */
    readonly cross: string;
    /** Exclamation-mark symbol. */
    readonly exclamation: string;
    /** Question-mark symbol. */
    readonly question: string;
    /** Star symbol. */
    readonly star: string;
    /** Zoom-in action. */
    readonly zoomIn: string;
    /** Zoom-out action. */
    readonly zoomOut: string;
    /** Reset drawing-board zoom and position action. */
    readonly resetView: string;
    /** Missing-text validation message. */
    readonly textRequired: string;
    /** Source-loading error message. */
    readonly loadError: string;
    /** PNG-export error message. */
    readonly exportError: string;
    /** Source-image pixel-limit message. */
    readonly sourceTooLarge: string;

    // #endregion
}
