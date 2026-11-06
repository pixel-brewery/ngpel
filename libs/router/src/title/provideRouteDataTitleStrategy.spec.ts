import { TestBed } from '@angular/core/testing';
import { provideRouter, TitleStrategy } from '@angular/router';
import { beforeEach, describe, expect, it } from 'vitest';
import { provideRouteDataTitleStrategy } from './provideRouteDataTitleStrategy';
import { ROUTE_TITLE_OPTIONS } from './ROUTE_TITLE_OPTIONS';
import { RouteDataTitleStrategy } from './RouteDataTitleStrategy';

describe('provideRouteDataTitleStrategy', () => {
    beforeEach(() => {
        TestBed.resetTestingModule();
    });

    it('binds the strategy and the given options', () => {
        // Arrange
        TestBed.configureTestingModule({
            providers: [provideRouter([]), provideRouteDataTitleStrategy({ appName: 'Contoso' })],
        });

        // Act
        const strategy = TestBed.inject(TitleStrategy);

        // Assert
        expect(strategy).toBeInstanceOf(RouteDataTitleStrategy);
        expect(TestBed.inject(ROUTE_TITLE_OPTIONS)).toEqual({ appName: 'Contoso' });
    });

    it('keeps the neutral default options when none are given', () => {
        // Arrange
        TestBed.configureTestingModule({ providers: [provideRouter([]), provideRouteDataTitleStrategy()] });

        // Act
        const options = TestBed.inject(ROUTE_TITLE_OPTIONS);

        // Assert
        expect(options).toEqual({});
    });

    it('leaves Angular its own strategy when it is not provided', () => {
        // Arrange
        TestBed.configureTestingModule({ providers: [provideRouter([])] });

        // Act
        const strategy = TestBed.inject(TitleStrategy);

        // Assert
        expect(strategy).not.toBeInstanceOf(RouteDataTitleStrategy);
    });
});
