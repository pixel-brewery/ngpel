import { TestBed } from '@angular/core/testing';
import { afterEach, describe, expect, it } from 'vitest';
import type { Provider } from '@angular/core';
import type { INotification } from '../models/INotification';
import type { INotificationInterceptor } from '../interception/INotificationInterceptor';
import { NOTIFICATION_INTERCEPTORS } from './NOTIFICATION_INTERCEPTORS';

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

describe('NOTIFICATION_INTERCEPTORS', () => {
    afterEach(() => {
        TestBed.resetTestingModule();
    });

    it('collects one entry per contributing feature, in composition order', () => {
        // Arrange
        const first = new RecordingNotificationInterceptor();
        const second = new RecordingNotificationInterceptor();
        TestBed.configureTestingModule({ providers: [first.provide(), second.provide()] });

        // Act
        const interceptors = TestBed.inject(NOTIFICATION_INTERCEPTORS);

        // Assert
        expect(interceptors).toEqual([first, second]);
    });

    it('is absent when no interceptor feature was composed', () => {
        // Arrange
        TestBed.configureTestingModule({});

        // Act
        const interceptors = TestBed.inject(NOTIFICATION_INTERCEPTORS, null, { optional: true });

        // Assert
        expect(interceptors).toBeNull();
    });
});
