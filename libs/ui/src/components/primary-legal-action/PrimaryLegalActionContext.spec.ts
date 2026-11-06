// #region Imports

import { describe, expect, it } from 'vitest';
import { PrimaryLegalActionContext } from './PrimaryLegalActionContext';

// #endregion

describe('PrimaryLegalActionContext', () => {
    describe('route-scoped action registration', () => {
        it('publishes and idempotently removes a safe same-origin action', () => {
            // arrange
            const context = new PrimaryLegalActionContext();
            const unregister = context.register({
                label: ' Vertrag widerrufen ',
                url: '/external/withdrawal/8d51aa37-a10c-47ce-85d5-829f0d29da3e',
            });

            // act
            unregister();
            unregister();

            // assert
            expect(context.action()).toBeNull();
        });

        it('normalizes the action before publishing it', () => {
            // arrange
            const context = new PrimaryLegalActionContext();

            // act
            context.register({
                label: ' Vertrag widerrufen ',
                url: ' /external/withdrawal/8d51aa37-a10c-47ce-85d5-829f0d29da3e ',
            });

            // assert
            expect(context.action()).toEqual({
                label: 'Vertrag widerrufen',
                url: '/external/withdrawal/8d51aa37-a10c-47ce-85d5-829f0d29da3e',
            });
        });

        it('keeps the newest action when an older registration is removed', () => {
            // arrange
            const context = new PrimaryLegalActionContext();
            const unregisterOlder = context.register({
                label: 'Older action',
                url: '/external/older',
            });
            context.register({
                label: 'Newest action',
                url: '/external/newest',
            });

            // act
            unregisterOlder();

            // assert
            expect(context.action()).toEqual({
                label: 'Newest action',
                url: '/external/newest',
            });
        });

        it('restores the previous action when the newest registration is removed', () => {
            // arrange
            const context = new PrimaryLegalActionContext();
            context.register({
                label: 'Previous action',
                url: '/external/previous',
            });
            const unregisterNewest = context.register({
                label: 'Newest action',
                url: '/external/newest',
            });

            // act
            unregisterNewest();

            // assert
            expect(context.action()).toEqual({
                label: 'Previous action',
                url: '/external/previous',
            });
        });

        describe('error handling', () => {
            it.each(['https://attacker.example/withdrawal', '//attacker.example/withdrawal', 'javascript:alert(1)'])('rejects unsafe action URL %s', (url) => {
                // arrange
                const context = new PrimaryLegalActionContext();

                // act
                const registration = (): (() => void) => context.register({ label: 'Vertrag widerrufen', url });

                // assert
                expect(registration).toThrow('safe same-origin path');
                expect(context.action()).toBeNull();
            });

            it('rejects an empty label without replacing the current action', () => {
                // arrange
                const context = new PrimaryLegalActionContext();
                context.register({
                    label: 'Existing action',
                    url: '/external/existing',
                });

                // act
                const registration = (): (() => void) => context.register({ label: '   ', url: '/external/replacement' });

                // assert
                expect(registration).toThrow('requires a label');
                expect(context.action()?.label).toBe('Existing action');
            });
        });
    });
});
