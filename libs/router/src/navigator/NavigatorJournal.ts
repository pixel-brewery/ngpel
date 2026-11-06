// #region Imports

import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { type Observable, Subject } from 'rxjs';
import type { INavigatorJournalEntry } from './INavigatorJournalEntry';

// #endregion

/**
 * An in-application navigation journal: the URLs the application itself navigated to, with a
 * cursor that `goBack()` and `goForward()` move through. Unlike the browser history it is scoped
 * to the running application, so a shell can offer back and forward affordances that never leave
 * it. Traversal moves the cursor instead of appending, so forward entries survive a step back.
 *
 * Register it with `provideNavigator()`; {@link Navigator} feeds it on every completed navigation.
 *
 * @public
 */
@Injectable()
export class NavigatorJournal {
    // #region Fields

    private readonly _router: Router = inject(Router);
    private readonly _journalChanged = new Subject<void>();
    private _entries: ReadonlyArray<INavigatorJournalEntry> = [];
    private _currentIndex = -1;
    private _traversalIndex: number | null = null;

    // #endregion

    // #region Properties

    /**
     * Emits whenever entries are recorded, the cursor moves or the journal is cleared.
     *
     * @public
     * @readonly
     */
    public get journalChanged(): Observable<void> {
        return this._journalChanged.asObservable();
    }

    /**
     * The recorded entries, oldest first.
     *
     * @public
     * @readonly
     */
    public get entries(): ReadonlyArray<INavigatorJournalEntry> {
        return this._entries;
    }

    /**
     * Whether an earlier entry exists.
     *
     * @public
     * @readonly
     */
    public get canGoBack(): boolean {
        return this._currentIndex > 0;
    }

    /**
     * Whether a later entry exists.
     *
     * @public
     * @readonly
     */
    public get canGoForward(): boolean {
        return this._currentIndex < this._entries.length - 1;
    }

    // #endregion

    // #region Methods

    /**
     * Drops every entry, for example on sign-out.
     *
     * @public
     */
    public clear(): void {
        this._entries = [];
        this._currentIndex = -1;
        this._traversalIndex = null;
        this._journalChanged.next();
    }

    /**
     * Navigates to the previous entry, keeping the later entries reachable through
     * {@link NavigatorJournal.goForward}.
     *
     * @public
     */
    public goBack(): void {
        this.traverseTo(this._currentIndex - 1);
    }

    /**
     * Navigates to the next entry.
     *
     * @public
     */
    public goForward(): void {
        this.traverseTo(this._currentIndex + 1);
    }

    /**
     * Records a completed navigation. A repeated navigation to the current entry is ignored, a
     * navigation issued by {@link NavigatorJournal.goBack} or {@link NavigatorJournal.goForward}
     * only moves the cursor, and any other navigation truncates the forward entries.
     *
     * @public
     * @param entry The entry to record.
     */
    public recordNavigation(entry: INavigatorJournalEntry): void {
        const url = entry.urlTree.toString();
        const traversalIndex = this._traversalIndex;
        this._traversalIndex = null;

        if (traversalIndex !== null && this._entries[traversalIndex]?.urlTree.toString() === url) {
            this._currentIndex = traversalIndex;
            this._journalChanged.next();

            return;
        }

        if (this._entries[this._currentIndex]?.urlTree.toString() === url) {
            return;
        }

        this._entries = [...this._entries.slice(0, this._currentIndex + 1), entry];
        this._currentIndex = this._entries.length - 1;
        this._journalChanged.next();
    }

    /**
     * Navigates to the entry at `targetIndex` and remembers that the resulting navigation is a
     * traversal rather than a new entry.
     */
    private traverseTo(targetIndex: number): void {
        const entry = this._entries[targetIndex];

        if (entry === undefined) {
            return;
        }

        this._traversalIndex = targetIndex;
        void this._router.navigateByUrl(entry.urlTree);
    }

    // #endregion
}
