import { type Provider, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { type IReactiveCacheChange, ReactiveCacheChangedReason } from '@pixel-brewery/ngpel-core/rx';
import { afterEach, describe, expect, it, vi } from 'vitest';
import type { INotificationInterceptor } from '../interception/INotificationInterceptor';
import type { INotification } from '../models/INotification';
import { LONG_DURATION } from '../models/LONG_DURATION';
import { NotificationType } from '../models/NotificationType';
import { SHORT_DURATION } from '../models/SHORT_DURATION';
import { NOTIFICATION_INTERCEPTORS } from '../provider/NOTIFICATION_INTERCEPTORS';
import { NotificationService } from './NotificationService';

/** Recording notification sink: keeps every notification and configuration it was handed, in order. */
class RecordingNotificationInterceptor implements INotificationInterceptor {
    public readonly pushed: Array<INotification> = [];
    public readonly configurations: Array<object> = [];
    public disposals = 0;

    public configure(config: object): void {
        this.configurations.push(config);
    }

    public push(notification: INotification): void {
        this.pushed.push(notification);
    }

    public dispose(): void {
        this.disposals += 1;
    }

    public provide(): Provider {
        return { provide: NOTIFICATION_INTERCEPTORS, useValue: this, multi: true };
    }
}

describe('NotificationService', () => {
    afterEach(() => {
        vi.useRealTimers();
        TestBed.resetTestingModule();
        vi.restoreAllMocks();
    });

    it.each([
        ['showInfo', NotificationType.Info],
        ['showWarning', NotificationType.Warning],
        ['showError', NotificationType.Error],
        ['showSuccess', NotificationType.Success],
    ] as const)('grades a notification raised through %s', (method, type) => {
        // Arrange
        const service = createService();

        // Act
        const notification = service[method]('Delivery', 'It went through.');

        // Assert
        expect(notification.type).toBe(type);
        expect(notification.title()).toBe('Delivery');
        expect(notification.body()).toBe('It went through.');
    });

    it('leaves a message that states no severity ungraded and short lived', () => {
        // Arrange
        const service = createService();

        // Act
        const notification = service.push({ title: 'Delivery', content: 'It went through.' });

        // Assert
        expect(notification.type).toBe(NotificationType.None);
        expect(notification.duration).toBe(SHORT_DURATION);
        expect(notification.subTitle()).toBe('');
        expect(notification.detail).toBeUndefined();
    });

    it('resolves the symbolic duration of a message to a lifetime', () => {
        // Arrange
        const service = createService();

        // Act
        const notification = service.push({ title: 'Delivery', content: 'It went through.', duration: 'long' });

        // Assert
        expect(notification.duration).toBe(LONG_DURATION);
    });

    it('keeps a reactive caption reactive instead of freezing its current text', () => {
        // Arrange
        const title = signal('Before');
        const service = createService();

        // Act
        const notification = service.push({ title, content: 'Body' });
        title.set('After');

        // Assert
        expect(notification.title()).toBe('After');
    });

    it('fans a raised notification out to every composed interceptor', () => {
        // Arrange
        const first = new RecordingNotificationInterceptor();
        const second = new RecordingNotificationInterceptor();
        const service = createService([first, second]);

        // Act
        const notification = service.showError('Delivery failed.', 'Try again later.');

        // Assert
        expect(first.pushed).toEqual([notification]);
        expect(second.pushed).toEqual([notification]);
    });

    it('deduplicates an identical notification while the first one is still alive', () => {
        // Arrange
        vi.useFakeTimers();
        vi.setSystemTime(new Date('2026-09-02T10:00:00.000Z'));
        const interceptor = new RecordingNotificationInterceptor();
        const service = createService([interceptor]);
        const first = service.showError('Delivery failed.', 'Try again later.');

        // Act
        const duplicate = service.showError('Delivery failed.', 'Try again later.');

        // Assert
        expect(duplicate).toBe(first);
        expect(interceptor.pushed).toEqual([first]);
        expect(service.all()).toHaveLength(1);
    });

    it('raises the message again once the first notification outlived its duration', () => {
        // Arrange
        vi.useFakeTimers();
        vi.setSystemTime(new Date('2026-09-02T10:00:00.000Z'));
        const service = createService();
        const first = service.showError('Delivery failed.', 'Try again later.');

        // Act
        vi.setSystemTime(new Date(Date.now() + SHORT_DURATION + 1));
        const second = service.showError('Delivery failed.', 'Try again later.');

        // Assert
        expect(second).not.toBe(first);
        expect(service.all()).toHaveLength(2);
    });

    it('keeps the history newest first', () => {
        // Arrange
        vi.useFakeTimers();
        vi.setSystemTime(new Date('2026-09-02T10:00:00.000Z'));
        const service = createService();
        const older = service.showInfo('First', 'Body');

        // Act
        vi.setSystemTime(new Date(Date.now() + 1_000));
        const newer = service.showInfo('Second', 'Body');

        // Assert
        expect(service.all()).toEqual([newer, older]);
    });

    it('lets a silent message reach the interceptors without entering the history', () => {
        // Arrange
        const interceptor = new RecordingNotificationInterceptor();
        const service = createService([interceptor]);

        // Act
        const notification = service.push({ title: 'Delivery', content: 'It went through.', silent: true });

        // Assert
        expect(interceptor.pushed).toEqual([notification]);
        expect(service.all()).toEqual([]);
    });

    it('removes one notification from the history by its id', () => {
        // Arrange
        const service = createService();
        const kept = service.showInfo('Kept', 'Body');
        const removed = service.showInfo('Removed', 'Body');

        // Act
        service.remove(removed.id);

        // Assert
        expect(service.all()).toEqual([kept]);
    });

    it('clears the whole history when no id is named', () => {
        // Arrange
        const service = createService();
        service.showInfo('First', 'Body');
        service.showWarning('Second', 'Body');

        // Act
        service.remove();

        // Assert
        expect(service.all()).toEqual([]);
    });

    it('reports every change of the history', () => {
        // Arrange
        const service = createService();
        const changes: Array<IReactiveCacheChange<INotification>> = [];
        service.changed.subscribe((change) => changes.push(change));

        // Act
        const notification = service.showInfo('Delivery', 'It went through.');

        // Assert
        expect(changes).toEqual([{ reason: ReactiveCacheChangedReason.Add, items: [notification] }]);
    });

    it('identifies every raised notification distinctly', () => {
        // Arrange
        const service = createService();

        // Act
        const first = service.showInfo('First', 'Body');
        const second = service.showInfo('Second', 'Body');

        // Assert
        expect(first.id).not.toBe(second.id);
        expect(first.id.startsWith('Notification_')).toBe(true);
    });

    it('heads a validation error with the first readable message of the issues', () => {
        // Arrange
        const service = createService();
        const issues = [{ errors: [{ kind: 'required' }] }, { errors: [{ message: 'Enter an email address.' }, { message: 'Ignored.' }] }];

        // Act
        const notification = service.showSignalValidationError(issues, 'Fallback error.', 'Review the marked fields and try again.');

        // Assert
        expect(notification.type).toBe(NotificationType.Error);
        expect(notification.title()).toBe('Enter an email address.');
        expect(notification.body()).toBe('Review the marked fields and try again.');
    });

    it.each([
        ['a plain string error', ['Enter an email address.']],
        ['a signal error', [signal('Enter an email address.')]],
        ['a signal message', [{ message: signal('Enter an email address.') }]],
    ])('reads the validation message out of %s', (_case, errors) => {
        // Arrange
        const service = createService();

        // Act
        const notification = service.showSignalValidationError([{ errors }], 'Fallback error.', 'Review the marked fields.');

        // Assert
        expect(notification.title()).toBe('Enter an email address.');
    });

    it('falls back when no issue exposes a readable message', () => {
        // Arrange
        const service = createService();

        // Act
        const notification = service.showSignalValidationError(
            [{ errors: [{ kind: 'required' }, null, 42, { message: 7 }] }],
            'Fallback error.',
            'Review the marked fields and try again.',
        );

        // Assert
        expect(notification.type).toBe(NotificationType.Error);
        expect(notification.title()).toBe('Fallback error.');
    });

    it('reaches no interceptor when none was composed', () => {
        // Arrange
        const service = createService();

        // Act
        const notification = service.showInfo('Delivery', 'It went through.');

        // Assert
        expect(notification.type).toBe(NotificationType.Info);
        expect(service.all()).toEqual([notification]);
    });

    it('injects the interceptors registered on the multi token', () => {
        // Arrange
        const interceptor = new RecordingNotificationInterceptor();
        TestBed.configureTestingModule({ providers: [NotificationService, { provide: NOTIFICATION_INTERCEPTORS, useValue: interceptor, multi: true }] });

        // Act
        const notification = TestBed.inject(NotificationService).showWarning('Careful', 'Body');

        // Assert
        expect(interceptor.pushed).toEqual([notification]);
    });
});

/**
 * Resolves a {@link NotificationService} from a `TestBed` the passed sinks are registered on, which
 * is the only way to build it: it reads `NOTIFICATION_INTERCEPTORS` in its own injection context.
 *
 * @param interceptors The sinks to register on `NOTIFICATION_INTERCEPTORS`.
 * @returns The resolved service.
 */
function createService(interceptors: ReadonlyArray<RecordingNotificationInterceptor> = []): NotificationService {
    TestBed.configureTestingModule({
        providers: [NotificationService, ...interceptors.map((interceptor) => interceptor.provide())],
    });

    return TestBed.inject(NotificationService);
}
