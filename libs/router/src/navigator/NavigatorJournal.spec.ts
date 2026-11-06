import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { beforeEach, describe, expect, it } from 'vitest';
import type { INavigatorJournalEntry } from './INavigatorJournalEntry';
import { NavigatorJournal } from './NavigatorJournal';

function createJournal(): { journal: NavigatorJournal; entry: (url: string) => INavigatorJournalEntry } {
    TestBed.configureTestingModule({ providers: [provideRouter([{ path: '**', children: [] }]), NavigatorJournal] });

    const router = TestBed.inject(Router);

    return {
        journal: TestBed.inject(NavigatorJournal),
        entry: (url: string): INavigatorJournalEntry => ({ urlTree: router.parseUrl(url) }),
    };
}

describe('NavigatorJournal', () => {
    beforeEach(() => {
        TestBed.resetTestingModule();
    });

    it('records visited URLs and reports where the cursor can move', () => {
        // Arrange
        const { journal, entry } = createJournal();
        journal.recordNavigation(entry('/first'));

        // Act
        journal.recordNavigation(entry('/second'));

        // Assert
        expect(journal.entries).toHaveLength(2);
        expect(journal.canGoBack).toBe(true);
        expect(journal.canGoForward).toBe(false);
    });

    it('ignores a repeated navigation to the current entry', () => {
        // Arrange
        const { journal, entry } = createJournal();
        journal.recordNavigation(entry('/first'));

        // Act
        journal.recordNavigation(entry('/first'));

        // Assert
        expect(journal.entries).toHaveLength(1);
        expect(journal.canGoBack).toBe(false);
    });

    it('moves the cursor on a traversal instead of appending, so the forward entry survives', () => {
        // Arrange
        const { journal, entry } = createJournal();
        journal.recordNavigation(entry('/first'));
        journal.recordNavigation(entry('/second'));
        journal.goBack();

        // Act
        journal.recordNavigation(entry('/first'));

        // Assert
        expect(journal.entries).toHaveLength(2);
        expect(journal.canGoBack).toBe(false);
        expect(journal.canGoForward).toBe(true);
    });

    it('truncates the forward entries when a new destination is visited after a step back', () => {
        // Arrange
        const { journal, entry } = createJournal();
        journal.recordNavigation(entry('/first'));
        journal.recordNavigation(entry('/second'));
        journal.goBack();
        journal.recordNavigation(entry('/first'));

        // Act
        journal.recordNavigation(entry('/third'));

        // Assert
        expect(journal.entries.map((recorded): string => recorded.urlTree.toString())).toEqual(['/first', '/third']);
        expect(journal.canGoForward).toBe(false);
    });

    it('does nothing when there is no entry to move to', () => {
        // Arrange
        const { journal, entry } = createJournal();
        journal.recordNavigation(entry('/first'));

        // Act
        journal.goForward();

        // Assert
        expect(journal.canGoForward).toBe(false);
        expect(journal.entries).toHaveLength(1);
    });

    it('emits and empties the journal on clear', () => {
        // Arrange
        const { journal, entry } = createJournal();
        journal.recordNavigation(entry('/first'));
        const changes: number[] = [];
        journal.journalChanged.subscribe((): void => {
            changes.push(changes.length);
        });

        // Act
        journal.clear();

        // Assert
        expect(journal.entries).toHaveLength(0);
        expect(journal.canGoBack).toBe(false);
        expect(changes).toEqual([0]);
    });
});
