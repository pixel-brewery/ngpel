// #region Imports

import { signal } from '@angular/core';
import { describe, expect, it } from 'vitest';
import type { ITourContribution } from './ITourContribution';
import { createTourContributionAnchorMap } from './createTourContributionAnchorMap';
import { createTourContributionSteps } from './createTourContributionSteps';

// #endregion

describe('Tour contributions', () => {
    it('materializes ordered contributions with namespaced anchors and reactive text', () => {
        // arrange
        const title = signal('First title');
        const contributions: ReadonlyArray<ITourContribution> = [
            {
                id: 'first-widget',
                steps: [
                    {
                        id: 'overview',
                        target: 'surface',
                        title,
                        content: 'First content',
                    },
                ],
            },
            {
                id: 'second-widget',
                steps: [
                    {
                        id: 'overview',
                        target: 'surface',
                        title: 'Second title',
                        content: 'Second content',
                        isOptional: true,
                    },
                ],
            },
        ];

        // act
        title.set('Translated title');
        const steps = createTourContributionSteps('explorer.widgets', contributions, {
            duration: 8_000,
            formatter: 'richtext',
        });

        // assert
        expect(steps).toEqual([
            expect.objectContaining({
                id: 'first-widget.overview',
                anchorId: 'explorer.widgets.first-widget.surface',
                title: 'Translated title',
                content: 'First content',
                duration: 8_000,
                formatter: 'richtext',
            }),
            expect.objectContaining({
                id: 'second-widget.overview',
                anchorId: 'explorer.widgets.second-widget.surface',
                isOptional: true,
            }),
        ]);
    });

    it('maps every accessor target to the same namespaced anchors used by the steps', () => {
        // arrange
        const contribution: ITourContribution = {
            id: 'newsletter',
            steps: [
                { id: 'overview', target: 'surface', title: 'Overview', content: 'Overview' },
                { id: 'open', target: 'primaryAction', title: 'Open', content: 'Open' },
                { id: 'navigate', target: 'navigation', title: 'Navigate', content: 'Navigate' },
            ],
        };

        // act
        const anchors = createTourContributionAnchorMap('explorer.widgets', contribution);

        // assert
        expect(anchors).toEqual({
            surface: 'explorer.widgets.newsletter.surface',
            primaryAction: 'explorer.widgets.newsletter.primaryAction',
            navigation: 'explorer.widgets.newsletter.navigation',
        });
    });

    it('namespaces declarative step actions together with their contribution anchors', () => {
        // arrange
        const contribution: ITourContribution = {
            id: 'feedback',
            steps: [
                {
                    id: 'custom-period',
                    target: 'customPeriodAction',
                    title: 'Custom period',
                    content: 'Open custom period',
                    enterActions: [
                        {
                            type: 'click',
                            anchorId: 'customPeriod',
                            skipIfAnchorExists: 'customPeriodAction',
                        },
                    ],
                    advanceActions: [
                        {
                            type: 'click',
                            anchorId: 'customPeriodAction',
                            skipIfAnchorExists: 'customPeriod',
                        },
                    ],
                },
            ],
        };

        // act
        const [step] = createTourContributionSteps('explorer.widgets', [contribution]);

        if (step === undefined) {
            throw new Error('The contribution produced no tour step.');
        }

        const anchors = createTourContributionAnchorMap('explorer.widgets', contribution);

        // assert
        expect(step.enterActions).toEqual([
            {
                type: 'click',
                anchorId: 'explorer.widgets.feedback.customPeriod',
                skipIfAnchorExists: 'explorer.widgets.feedback.customPeriodAction',
            },
        ]);
        expect(step.advanceActions).toEqual([
            {
                type: 'click',
                anchorId: 'explorer.widgets.feedback.customPeriodAction',
                skipIfAnchorExists: 'explorer.widgets.feedback.customPeriod',
            },
        ]);
        expect(anchors).toEqual({
            customPeriodAction: 'explorer.widgets.feedback.customPeriodAction',
            customPeriod: 'explorer.widgets.feedback.customPeriod',
        });
    });

    describe('edge cases', () => {
        it('keeps an empty optional contribution neutral for both composition outputs', () => {
            // arrange
            const contribution: ITourContribution = {
                id: 'empty',
                steps: [],
            };

            // act
            const result = {
                anchors: createTourContributionAnchorMap('explorer.widgets', contribution),
                steps: createTourContributionSteps('explorer.widgets', [contribution]),
            };

            // assert
            expect(result).toEqual({ anchors: {}, steps: [] });
        });
    });
});
