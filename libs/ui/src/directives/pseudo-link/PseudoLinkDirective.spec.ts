// #region Imports

import { Component } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { PseudoLinkDirective } from './PseudoLinkDirective';

// #endregion

@Component({
    imports: [PseudoLinkDirective],
    template: '<a ngpPseudoLink href="#/tickets/1" title="Open">content</a><a id="plain" href="#/plain">plain</a>',
})
class HostComponent {}

describe('PseudoLinkDirective', () => {
    let fixture: ComponentFixture<HostComponent>;

    beforeEach(() => {
        fixture = TestBed.configureTestingModule({ imports: [HostComponent] }).createComponent(HostComponent);
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });

    it('neutralises the user-agent link styling while keeping the anchor a link', () => {
        // Arrange
        const anchor = fixture.nativeElement.querySelector('a[ngpPseudoLink]') as HTMLAnchorElement;

        // Act
        fixture.detectChanges();

        // Assert
        expect(anchor.style.color).toBe('inherit');
        expect(anchor.style.textDecoration).toBe('none');
        expect(anchor.style.cursor).toBe('pointer');
        expect(anchor.getAttribute('href')).toBe('#/tickets/1');
        expect(anchor.getAttribute('title')).toBe('Open');
    });

    it('leaves anchors without the attribute untouched', () => {
        // Arrange
        const plain = fixture.nativeElement.querySelector('#plain') as HTMLAnchorElement;

        // Act
        fixture.detectChanges();

        // Assert
        expect(plain.style.color).toBe('');
        expect(plain.style.textDecoration).toBe('');
        expect(plain.style.cursor).toBe('');
    });
});
