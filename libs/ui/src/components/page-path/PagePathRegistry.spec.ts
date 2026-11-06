import { signal } from '@angular/core';
import { describe, expect, it } from 'vitest';
import { PagePathRegistry } from './PagePathRegistry';

describe('PagePathRegistry', () => {
    it('restores the earlier page when the active declaration is removed', () => {
        // Arrange
        const registry = new PagePathRegistry();
        const list = signal([{ label: 'Reports' }]);
        registry.register(list);
        const releaseDetail = registry.register(signal([{ label: 'Reports' }, { label: 'Quarterly' }]));
        list.set([{ label: 'Saved reports' }]);

        // Act
        releaseDetail();

        // Assert
        expect(registry.levels()).toEqual([{ label: 'Saved reports' }]);
    });

    it('retains the current path when an earlier page releases its own registration', () => {
        // Arrange
        const registry = new PagePathRegistry();
        const release = registry.register(signal([{ label: 'List' }]));
        registry.register(signal([{ label: 'Detail' }]));

        // Act
        release();

        // Assert
        expect(registry.levels()).toEqual([{ label: 'Detail' }]);
    });
});
