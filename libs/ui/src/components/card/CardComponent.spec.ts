// @vitest-environment jsdom

// #region Imports

import { TestBed } from '@angular/core/testing';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { CardAccordion } from './CardAccordion';
import { CardComponent } from './CardComponent';

// #endregion

vi.mock('@pixel-brewery/mosaik-elements-angular', () => ({
    CardActionsComponent: class CardActionsComponent {},
    CardComponent: class CardComponent {},
    CardFooterComponent: class CardFooterComponent {},
    ExpandableComponent: class ExpandableComponent {},
}));

describe('CardComponent expansion', () => {
    afterEach(() => TestBed.resetTestingModule());

    it('starts compact cards closed', () => {
        // arrange
        const { accordion, first, second } = createCards();

        // act
        accordion.setExpandable(true);

        // assert
        expect(first.isExpanded()).toBe(false);
        expect(second.isExpanded()).toBe(false);
    });

    it('opens all cards when the layout becomes wide', () => {
        // arrange
        const { accordion, first, second } = createCards();
        accordion.setExpandable(true);
        first.toggle();

        // act
        accordion.setExpandable(false);

        // assert
        expect(first.isExpanded()).toBe(true);
        expect(second.isExpanded()).toBe(true);
    });

    it('starts closed again when returning to compact layout', () => {
        // arrange
        const { accordion, first, second } = createCards();
        accordion.setExpandable(true);
        first.toggle();
        accordion.setExpandable(false);

        // act
        accordion.setExpandable(true);

        // assert
        expect(first.isExpanded()).toBe(false);
        expect(second.isExpanded()).toBe(false);
    });

    it('closes the previous card when another card opens', () => {
        // arrange
        const { accordion, first, second } = createCards();
        accordion.setExpandable(true);
        first.toggle();

        // act
        second.toggle();

        // assert
        expect(first.isExpanded()).toBe(false);
        expect(second.isExpanded()).toBe(true);
    });

    it('allows the active card to close', () => {
        // arrange
        const { accordion, first } = createCards();
        accordion.setExpandable(true);
        first.toggle();

        // act
        first.toggle();

        // assert
        expect(first.isExpanded()).toBe(false);
    });
});

function createCards(): {
    readonly accordion: CardAccordion;
    readonly first: CardComponent;
    readonly second: CardComponent;
} {
    TestBed.configureTestingModule({ providers: [CardAccordion] });
    TestBed.overrideComponent(CardComponent, { set: { template: '', imports: [] } });
    const accordion = TestBed.inject(CardAccordion);
    const first = TestBed.createComponent(CardComponent).componentInstance;
    const second = TestBed.createComponent(CardComponent).componentInstance;
    return { accordion, first, second };
}
