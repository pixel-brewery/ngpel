// #region Imports

import { Component, Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { afterEach, describe, expect, it } from 'vitest';
import { provideViewPresenter } from '../presenters/provideViewPresenter';
import { ViewPresenter } from '../presenters/ViewPresenter';
import { View } from './View';

// #endregion

@Injectable()
class OrderViewPresenter extends ViewPresenter {
    public disposalCount = 0;

    public override dispose(): void {
        this.disposalCount += 1;
        super.dispose();
    }
}

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

    it('runs presenter teardown once when Angular destroys the View and its injector', () => {
        // Arrange
        const fixture = TestBed.configureTestingModule({ imports: [OrderView] }).createComponent(OrderView);
        fixture.detectChanges();
        const presenter = fixture.componentInstance.presenter;

        // Act
        fixture.destroy();

        // Assert
        expect(presenter.disposed()).toBe(true);
        expect(presenter.disposalCount).toBe(1);
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
