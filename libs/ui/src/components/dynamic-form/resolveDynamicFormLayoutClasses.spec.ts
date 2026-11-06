// #region Imports

import { describe, expect, it } from 'vitest';
import type { IDynamicFormFieldLayout } from './IDynamicFormFieldLayout';
import { resolveDynamicFormLayoutClasses } from './resolveDynamicFormLayoutClasses';

// #endregion

describe('dynamic form layout resolution', () => {
    it('should map semantic placements to responsive twelve-column classes', () => {
        // arrange
        const layout: IDynamicFormFieldLayout = {
            base: { span: 12 },
            small: { span: 6 },
            medium: { span: 4, start: 3 },
            large: { span: 3, start: 7 },
        };

        // act
        const classes = resolveDynamicFormLayoutClasses(layout);

        // assert
        expect(classes).toBe('min-w-0 col-span-12 sm:col-span-6 md:col-span-4 md:col-start-3 lg:col-span-3 lg:col-start-7');
    });

    it('should occupy the full grid when no layout is defined', () => {
        // arrange
        const layout = undefined;

        // act
        const classes = resolveDynamicFormLayoutClasses(layout);

        // assert
        expect(classes).toBe('min-w-0 col-span-12');
    });

    describe('edge cases', () => {
        it('should reject placements that exceed the grid boundary', () => {
            // arrange
            const layout: IDynamicFormFieldLayout = {
                medium: { span: 6, start: 8 },
            };

            // act
            const action = (): string => resolveDynamicFormLayoutClasses(layout);

            // assert
            expect(action).toThrowError('Dynamic form medium placement exceeds the twelve-column grid.');
        });

        it('should reject invalid values received at runtime', () => {
            // arrange
            const layout = {
                base: { span: 0 },
            } as unknown as IDynamicFormFieldLayout;

            // act
            const action = (): string => resolveDynamicFormLayoutClasses(layout);

            // assert
            expect(action).toThrowError('Dynamic form base span must be between 1 and 12.');
        });
    });
});
