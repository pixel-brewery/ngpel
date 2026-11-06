import { createFeature, validateFeatures } from '@pixel-brewery/ngpel-core';
import { describe, expect, it } from 'vitest';
import { NotificationKinds } from './NotificationKinds';

describe('NotificationKinds', () => {
    it('brands every kind with its stable name', () => {
        // Arrange
        const kinds = NotificationKinds;

        // Act
        const names: ReadonlyArray<string> = [kinds.AudioInterceptor, kinds.ConsoleInterceptor];

        // Assert
        expect(names).toEqual(['notification-audio-interceptor', 'notification-console-interceptor']);
    });

    it('keeps the two kinds distinct, so a console and an audio sink compose together', () => {
        // Arrange
        const features = [createFeature('console', NotificationKinds.ConsoleInterceptor, []), createFeature('audio', NotificationKinds.AudioInterceptor, [])];

        // Act
        const validate = (): void => validateFeatures(features);

        // Assert
        expect(validate).not.toThrow();
    });

    it('is non-multi, so the kernel rejects a second sink of the same kind', () => {
        // Arrange
        const features = [createFeature('first', NotificationKinds.ConsoleInterceptor, []), createFeature('second', NotificationKinds.ConsoleInterceptor, [])];

        // Act
        const validate = (): void => validateFeatures(features);

        // Assert
        expect(validate).toThrow(/non-multi kind 'notification-console-interceptor'/);
    });
});
