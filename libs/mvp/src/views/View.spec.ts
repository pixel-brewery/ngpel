// #region Imports

import { Component, Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { afterEach, describe, expect, it } from 'vitest';
import { provideViewPresenter } from '../presenters/provideViewPresenter';
import { ViewPresenter } from '../presenters/ViewPresenter';
import { View } from './View';

// #endregion

@Injectable()
class OrderViewPresenter extends ViewPresenter {}

@Component({
    selector: 'ngp-order-view',
    template: '<span>{{ presenter.initialized() }}</span>',
    providers: [provideViewPresenter(OrderViewPresenter)],
})
class OrderView extends View<OrderViewPresenter> {}

@Component({
    selector: 'ngp-unbound-view',
    template: '',
})
class UnboundView extends View<OrderViewPresenter> {}

describe('View', () => {
    afterEach(() => {
        TestBed.resetTestingModule();
    });

    it('initializes its presenter when Angular initializes the View', () => {
        // Arrange
        const fixture = TestBed.configureTestingModule({ imports: [OrderView] }).createComponent(OrderView);

        // Act
        fixture.detectChanges();

        // Assert
        expect(fixture.componentInstance.presenter).toBeInstanceOf(OrderViewPresenter);
        expect(fixture.componentInstance.presenter.initialized()).toBe(true);
        expect(fixture.nativeElement.textContent).toContain('true');
    });

    it('disposes its presenter when Angular destroys the View', () => {
        // Arrange
        const fixture = TestBed.configureTestingModule({ imports: [OrderView] }).createComponent(OrderView);
        fixture.detectChanges();
        const presenter = fixture.componentInstance.presenter;

        // Act
        fixture.destroy();

        // Assert
        expect(presenter.disposed()).toBe(true);
    });

    it('fails to construct when no presenter was provided for the token', () => {
        // Arrange
        TestBed.configureTestingModule({ imports: [UnboundView] });

        // Act
        const create = (): unknown => TestBed.createComponent(UnboundView);

        // Assert
        expect(create).toThrow();
    });
});
