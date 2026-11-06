import { createEnvironmentInjector, EnvironmentInjector } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { ConsoleNotificationInterceptor } from '../interception/ConsoleNotificationInterceptor';
import { NotificationType } from '../models/NotificationType';
import { NotificationService } from '../services/NotificationService';
import { NotificationKinds } from './NotificationKinds';
import { provideNotification } from './provideNotification';
import { withConsoleNotificationInterceptor } from './withConsoleNotificationInterceptor';

/** Recording console surface: keeps the arguments of every call instead of silencing the real console. */
class RecordingLogger implements Pick<Console, 'error' | 'info' | 'log' | 'warn'> {
    public readonly errors: Array<ReadonlyArray<unknown>> = [];
    public readonly infos: Array<ReadonlyArray<unknown>> = [];
    public readonly logs: Array<ReadonlyArray<unknown>> = [];
    public readonly warns: Array<ReadonlyArray<unknown>> = [];

    public error(...data: Array<unknown>): void {
        this.errors.push(data);
    }

    public info(...data: Array<unknown>): void {
        this.infos.push(data);
    }

    public log(...data: Array<unknown>): void {
        this.logs.push(data);
    }

    public warn(...data: Array<unknown>): void {
        this.warns.push(data);
    }
}

describe('withConsoleNotificationInterceptor', () => {
    afterEach(() => {
        vi.restoreAllMocks();
        TestBed.resetTestingModule();
    });

    it('creates a feature of the console kind', () => {
        // Arrange
        const feature = withConsoleNotificationInterceptor();

        // Act
        const kind = feature.kind;

        // Assert
        expect(kind).toBe(NotificationKinds.ConsoleInterceptor);
        expect(feature.id).toBe('notification-console-interceptor');
    });

    it('applies the options to the registered interceptor', () => {
        // Arrange
        const logger = new RecordingLogger();
        TestBed.configureTestingModule({ providers: [provideNotification(withConsoleNotificationInterceptor({ logger }))] });

        // Act
        TestBed.inject(NotificationService).showError('Delivery failed.', 'Try again later.');

        // Assert
        expect(logger.errors).toEqual([['Delivery failed.\nTry again later.']]);
    });

    it('registers the interceptor class so a product can reach it directly', () => {
        // Arrange
        TestBed.configureTestingModule({ providers: [provideNotification(withConsoleNotificationInterceptor())] });

        // Act
        const interceptor = TestBed.inject(ConsoleNotificationInterceptor);

        // Assert
        expect(interceptor).toBeInstanceOf(ConsoleNotificationInterceptor);
    });

    it('writes nothing once the feature was composed as disabled', () => {
        // Arrange
        const logger = new RecordingLogger();
        TestBed.configureTestingModule({ providers: [provideNotification(withConsoleNotificationInterceptor({ isDisabled: true, logger }))] });

        // Act
        TestBed.inject(NotificationService).push({ title: 'Delivery', content: 'Body', type: NotificationType.Error });

        // Assert
        expect(logger.errors).toEqual([]);
    });

    it('disposes the interceptor with the injector it was composed into', () => {
        // Arrange
        TestBed.configureTestingModule({});
        const injector = createEnvironmentInjector([...withConsoleNotificationInterceptor().provide()], TestBed.inject(EnvironmentInjector));
        const interceptor = injector.get(ConsoleNotificationInterceptor);
        const dispose = vi.spyOn(interceptor, 'dispose');

        // Act
        injector.destroy();

        // Assert
        expect(dispose).toHaveBeenCalledTimes(1);
    });
});
