// #region Imports

import { Component, type Provider, signal, type Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { afterEach, describe, expect, it } from 'vitest';
import type { IMapsAddress } from './IMapsAddress';
import { MAPS_SEARCH_URL_FACTORY } from './MAPS_SEARCH_URL_FACTORY';
import { MapsPipe } from './MapsPipe';
import type { MapsSearchUrlFactory } from './MapsSearchUrlFactory';

// #endregion

/** Instantiates a pipe without a host component, resolving its `inject()`ed dependencies from the testing module. */
function instantiatePipe<TPipe>(pipeType: Type<TPipe>, providers: ReadonlyArray<Provider> = []): TPipe {
    if (providers.length > 0) {
        TestBed.configureTestingModule({ providers: [...providers] });
    }

    return TestBed.runInInjectionContext(() => new pipeType());
}

const echoUrl: MapsSearchUrlFactory = (query: string): string => `maps:${query}`;

@Component({
    imports: [MapsPipe],
    template: '{{ value() | ngpMaps }}',
})
class HostComponent {
    public readonly value = signal('Alexanderplatz 1, Berlin');
}

describe('MapsPipe', () => {
    afterEach(() => {
        TestBed.resetTestingModule();
    });

    it('links to the default map service', () => {
        // Arrange
        const pipe = instantiatePipe(MapsPipe);

        // Act
        const result = pipe.transform('Alexanderplatz 1, Berlin');

        // Assert
        expect(result).toBe('https://www.google.com/maps/search/?api=1&query=Alexanderplatz%201%2C%20Berlin');
    });

    it('assembles a structured address the way it reads on an envelope', () => {
        // Arrange
        const pipe = instantiatePipe(MapsPipe, [{ provide: MAPS_SEARCH_URL_FACTORY, useValue: echoUrl }]);
        const address: IMapsAddress = { city: 'Berlin', country: 'Germany', postalCode: '10178', street: 'Alexanderplatz', streetNumber: '1' };

        // Act
        const result = pipe.transform(address);

        // Assert
        expect(result).toBe('maps:Alexanderplatz 1, 10178 Berlin, Germany');
    });

    it('drops the parts an address does not carry', () => {
        // Arrange
        const pipe = instantiatePipe(MapsPipe, [{ provide: MAPS_SEARCH_URL_FACTORY, useValue: echoUrl }]);

        // Act
        const result = pipe.transform({ city: 'Berlin', street: 'Alexanderplatz' });

        // Assert
        expect(result).toBe('maps:Alexanderplatz, Berlin');
    });

    it('puts the place name in front of the address', () => {
        // Arrange
        const pipe = instantiatePipe(MapsPipe, [{ provide: MAPS_SEARCH_URL_FACTORY, useValue: echoUrl }]);

        // Act
        const result = pipe.transform('Alexanderplatz 1', 'Head office');

        // Assert
        expect(result).toBe('maps:Head office, Alexanderplatz 1');
    });

    it('links a place that has no address at all', () => {
        // Arrange
        const pipe = instantiatePipe(MapsPipe, [{ provide: MAPS_SEARCH_URL_FACTORY, useValue: echoUrl }]);

        // Act
        const result = pipe.transform(null, 'Head office');

        // Assert
        expect(result).toBe('maps:Head office');
    });

    it.each([null, undefined, '', '   ', {}])('returns null for %j without a place name', (value) => {
        // Arrange
        const pipe = instantiatePipe(MapsPipe, [{ provide: MAPS_SEARCH_URL_FACTORY, useValue: echoUrl }]);

        // Act
        const result = pipe.transform(value);

        // Assert
        expect(result).toBeNull();
    });

    it('renders the map link under the ngpMaps name', () => {
        // Arrange
        const fixture = TestBed.configureTestingModule({ imports: [HostComponent] }).createComponent(HostComponent);

        // Act
        fixture.detectChanges();

        // Assert
        expect((fixture.nativeElement as HTMLElement).textContent?.trim()).toBe(
            'https://www.google.com/maps/search/?api=1&query=Alexanderplatz%201%2C%20Berlin',
        );
    });
});
