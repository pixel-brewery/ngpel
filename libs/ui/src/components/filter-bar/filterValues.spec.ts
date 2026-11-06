// #region Imports

import { describe, expect, it } from 'vitest';
import { getBooleanFilterValue, getDateFilterRange, getNumberFilterValue, getOptionFilterValue, getTextFilterValue } from './filterValues';
import { FilterBarMode, FilterCondition, FilterOperator } from './IFilterDefinition';

// #endregion

describe('filterValueHelpers', () => {
    it('should resolve trimmed text values', () => {
        expect(getTextFilterValue({ name: '  Max  ' }, 'name')).toBe('Max');
        expect(getTextFilterValue({ name: '   ' }, 'name')).toBeUndefined();
    });

    it('should resolve advanced text rule values', () => {
        expect(
            getTextFilterValue(
                {
                    mode: FilterBarMode.Advanced,
                    root: {
                        kind: 'group',
                        id: 'root',
                        condition: FilterCondition.And,
                        children: [
                            {
                                kind: 'rule',
                                id: 'rule-1',
                                fieldKey: 'title',
                                operator: FilterOperator.Contains,
                                value: ' Bau ',
                            },
                        ],
                    },
                },
                'title',
            ),
        ).toBe('Bau');
    });

    it('should resolve finite number values', () => {
        expect(getNumberFilterValue({ id: 12 }, 'id')).toBe(12);
        expect(getNumberFilterValue({ id: '13' }, 'id')).toBe(13);
        expect(getNumberFilterValue({ id: 'abc' }, 'id')).toBeUndefined();
    });

    it('should resolve boolean values', () => {
        expect(getBooleanFilterValue({ isActive: true }, 'isActive')).toBe(true);
        expect(getBooleanFilterValue({ isActive: false }, 'isActive')).toBe(false);
        expect(getBooleanFilterValue({ isActive: 'true' }, 'isActive')).toBe(true);
        expect(getBooleanFilterValue({ isActive: 'false' }, 'isActive')).toBe(false);
    });

    it('should resolve advanced boolean operator values', () => {
        expect(
            getBooleanFilterValue(
                {
                    mode: FilterBarMode.Advanced,
                    root: {
                        kind: 'group',
                        id: 'root',
                        condition: FilterCondition.And,
                        children: [
                            {
                                kind: 'rule',
                                id: 'rule-1',
                                fieldKey: 'isActive',
                                operator: FilterOperator.IsTrue,
                            },
                        ],
                    },
                },
                'isActive',
            ),
        ).toBe(true);
    });

    it('should only resolve allowed option values', () => {
        const allowedValues = ['OPEN', 'DONE'] as const;

        expect(getOptionFilterValue({ status: 'OPEN' }, 'status', allowedValues)).toBe('OPEN');
        expect(getOptionFilterValue({ status: 'CANCELLED' }, 'status', allowedValues)).toBeUndefined();
    });

    it('should resolve date values to a full-day range', () => {
        const range = getDateFilterRange({ createdAt: new Date('2026-06-15T12:30:00.000Z') }, 'createdAt');

        expect(range.from).toBe('2026-06-15T00:00:00.000Z');
        expect(range.to).toBe('2026-06-15T23:59:59.999Z');
    });

    it('should ignore invalid date values', () => {
        expect(getDateFilterRange({ createdAt: 'not a date' }, 'createdAt')).toEqual({});
    });
});
