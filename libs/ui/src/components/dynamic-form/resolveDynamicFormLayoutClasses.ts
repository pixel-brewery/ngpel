// #region Imports

import type { DynamicFormGridSpan } from './DynamicFormGridSpan';
import type { DynamicFormGridStart } from './DynamicFormGridStart';
import type { IDynamicFormFieldLayout } from './IDynamicFormFieldLayout';
import type { IDynamicFormGridPlacement } from './IDynamicFormGridPlacement';

// #endregion

const BASE_SPAN_CLASSES: Readonly<Record<DynamicFormGridSpan, string>> = {
    1: 'col-span-1',
    2: 'col-span-2',
    3: 'col-span-3',
    4: 'col-span-4',
    5: 'col-span-5',
    6: 'col-span-6',
    7: 'col-span-7',
    8: 'col-span-8',
    9: 'col-span-9',
    10: 'col-span-10',
    11: 'col-span-11',
    12: 'col-span-12',
};

const SMALL_SPAN_CLASSES: Readonly<Record<DynamicFormGridSpan, string>> = {
    1: 'sm:col-span-1',
    2: 'sm:col-span-2',
    3: 'sm:col-span-3',
    4: 'sm:col-span-4',
    5: 'sm:col-span-5',
    6: 'sm:col-span-6',
    7: 'sm:col-span-7',
    8: 'sm:col-span-8',
    9: 'sm:col-span-9',
    10: 'sm:col-span-10',
    11: 'sm:col-span-11',
    12: 'sm:col-span-12',
};

const MEDIUM_SPAN_CLASSES: Readonly<Record<DynamicFormGridSpan, string>> = {
    1: 'md:col-span-1',
    2: 'md:col-span-2',
    3: 'md:col-span-3',
    4: 'md:col-span-4',
    5: 'md:col-span-5',
    6: 'md:col-span-6',
    7: 'md:col-span-7',
    8: 'md:col-span-8',
    9: 'md:col-span-9',
    10: 'md:col-span-10',
    11: 'md:col-span-11',
    12: 'md:col-span-12',
};

const LARGE_SPAN_CLASSES: Readonly<Record<DynamicFormGridSpan, string>> = {
    1: 'lg:col-span-1',
    2: 'lg:col-span-2',
    3: 'lg:col-span-3',
    4: 'lg:col-span-4',
    5: 'lg:col-span-5',
    6: 'lg:col-span-6',
    7: 'lg:col-span-7',
    8: 'lg:col-span-8',
    9: 'lg:col-span-9',
    10: 'lg:col-span-10',
    11: 'lg:col-span-11',
    12: 'lg:col-span-12',
};

const BASE_START_CLASSES: Readonly<Record<DynamicFormGridStart, string>> = {
    1: 'col-start-1',
    2: 'col-start-2',
    3: 'col-start-3',
    4: 'col-start-4',
    5: 'col-start-5',
    6: 'col-start-6',
    7: 'col-start-7',
    8: 'col-start-8',
    9: 'col-start-9',
    10: 'col-start-10',
    11: 'col-start-11',
    12: 'col-start-12',
};

const SMALL_START_CLASSES: Readonly<Record<DynamicFormGridStart, string>> = {
    1: 'sm:col-start-1',
    2: 'sm:col-start-2',
    3: 'sm:col-start-3',
    4: 'sm:col-start-4',
    5: 'sm:col-start-5',
    6: 'sm:col-start-6',
    7: 'sm:col-start-7',
    8: 'sm:col-start-8',
    9: 'sm:col-start-9',
    10: 'sm:col-start-10',
    11: 'sm:col-start-11',
    12: 'sm:col-start-12',
};

const MEDIUM_START_CLASSES: Readonly<Record<DynamicFormGridStart, string>> = {
    1: 'md:col-start-1',
    2: 'md:col-start-2',
    3: 'md:col-start-3',
    4: 'md:col-start-4',
    5: 'md:col-start-5',
    6: 'md:col-start-6',
    7: 'md:col-start-7',
    8: 'md:col-start-8',
    9: 'md:col-start-9',
    10: 'md:col-start-10',
    11: 'md:col-start-11',
    12: 'md:col-start-12',
};

const LARGE_START_CLASSES: Readonly<Record<DynamicFormGridStart, string>> = {
    1: 'lg:col-start-1',
    2: 'lg:col-start-2',
    3: 'lg:col-start-3',
    4: 'lg:col-start-4',
    5: 'lg:col-start-5',
    6: 'lg:col-start-6',
    7: 'lg:col-start-7',
    8: 'lg:col-start-8',
    9: 'lg:col-start-9',
    10: 'lg:col-start-10',
    11: 'lg:col-start-11',
    12: 'lg:col-start-12',
};

/**
 * Resolves semantic grid placement into statically discoverable Tailwind classes.
 *
 * @param layout - Responsive field layout.
 * @returns Classes for a twelve-column field wrapper.
 * @public
 */
export function resolveDynamicFormLayoutClasses(layout?: IDynamicFormFieldLayout): string {
    const classes = ['min-w-0'];

    appendPlacementClasses(classes, layout?.base ?? { span: 12 }, BASE_SPAN_CLASSES, BASE_START_CLASSES, 'base');
    appendOptionalPlacementClasses(classes, layout?.small, SMALL_SPAN_CLASSES, SMALL_START_CLASSES, 'small');
    appendOptionalPlacementClasses(classes, layout?.medium, MEDIUM_SPAN_CLASSES, MEDIUM_START_CLASSES, 'medium');
    appendOptionalPlacementClasses(classes, layout?.large, LARGE_SPAN_CLASSES, LARGE_START_CLASSES, 'large');

    return classes.join(' ');
}

function appendOptionalPlacementClasses(
    classes: string[],
    placement: IDynamicFormGridPlacement | undefined,
    spanClasses: Readonly<Record<DynamicFormGridSpan, string>>,
    startClasses: Readonly<Record<DynamicFormGridStart, string>>,
    breakpoint: string,
): void {
    if (placement) {
        appendPlacementClasses(classes, placement, spanClasses, startClasses, breakpoint);
    }
}

function appendPlacementClasses(
    classes: string[],
    placement: IDynamicFormGridPlacement,
    spanClasses: Readonly<Record<DynamicFormGridSpan, string>>,
    startClasses: Readonly<Record<DynamicFormGridStart, string>>,
    breakpoint: string,
): void {
    const spanClass = spanClasses[placement.span];

    if (!spanClass) {
        throw new RangeError(`Dynamic form ${breakpoint} span must be between 1 and 12.`);
    }

    classes.push(spanClass);

    if (placement.start === undefined) {
        return;
    }

    const startClass = startClasses[placement.start];

    if (!startClass) {
        throw new RangeError(`Dynamic form ${breakpoint} start must be between 1 and 12.`);
    }

    if (placement.start + placement.span > 13) {
        throw new RangeError(`Dynamic form ${breakpoint} placement exceeds the twelve-column grid.`);
    }

    classes.push(startClass);
}
