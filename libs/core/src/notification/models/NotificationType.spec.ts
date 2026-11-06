import { describe, expect, it } from 'vitest';
import { NotificationType } from './NotificationType';

describe('NotificationType', () => {
    it('grades a notification with the four severities plus the ungraded default', () => {
        // Arrange
        const type = NotificationType;

        // Act
        const values: ReadonlyArray<string> = Object.values(type);

        // Assert
        expect(values).toEqual(['', 'info', 'warning', 'error', 'success']);
    });

    it('keeps the ungraded severity falsy, so a missing grade never reads as a real one', () => {
        // Arrange
        const graded: ReadonlyArray<NotificationType> = [NotificationType.Info, NotificationType.Warning, NotificationType.Error, NotificationType.Success];

        // Act
        const falsy = [NotificationType.None, ...graded].filter((type) => !type);

        // Assert
        expect(falsy).toEqual([NotificationType.None]);
    });
});
