// #region Imports

import { InjectionToken } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { SCHEDULER_INTL, TranslateService } from '@pixel-brewery/mosaik-elements-angular';
import type { SchedulerElementIntl } from '@pixel-brewery/mosaik-elements-foundation';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { provideSchedulerIntl } from './SchedulerIntl';

// #endregion

vi.mock('@pixel-brewery/mosaik-elements-angular', () => ({
    SCHEDULER_INTL: new InjectionToken<Partial<SchedulerElementIntl>>('MOSAIK_SCHEDULER_INTL'),
    TranslateService: class {},
}));

vi.mock('@pixel-brewery/mosaik-elements-foundation', () => ({
    SchedulerElementIntl: class {
        public allDayLabel = 'All day';
        public todayLabel = 'Today';
    },
}));

describe('Scheduler internationalization provider', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                provideSchedulerIntl({
                    allDayLabel: 'loc.scheduler.allDay',
                    todayLabel: 'loc.scheduler.today',
                }),
                {
                    provide: TranslateService,
                    useValue: {
                        translate: (key: string): string => `translated:${key}`,
                    },
                },
            ],
        });
    });

    it('provides translated labels through the scheduler wrapper token', () => {
        // arrange & act
        const intl = TestBed.inject<Partial<SchedulerElementIntl>>(SCHEDULER_INTL);

        // assert
        expect(intl.allDayLabel).toBe('translated:loc.scheduler.allDay');
        expect(intl.todayLabel).toBe('translated:loc.scheduler.today');
    });
});
