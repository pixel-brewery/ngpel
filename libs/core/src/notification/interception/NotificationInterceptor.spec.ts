import { describe, expect, it } from 'vitest';
import { type Signal, signal } from '@angular/core';
import { SHORT_DURATION } from '../models/SHORT_DURATION';
import type { INotification } from '../models/INotification';
import { NotificationType } from '../models/NotificationType';
import { NotificationInterceptor } from './NotificationInterceptor';

/** Optional overrides for {@link fakeNotification}. */
interface IFakeNotificationOptions {
    readonly id?: string;
    readonly title?: string;
    readonly subTitle?: string;
    readonly body?: string;
    readonly detail?: string;
    readonly duration?: number;
    readonly timeStamp?: Date;
}

/** Builds a raised notification without going through `NotificationService`; every text becomes a read-only signal. */
function fakeNotification(type: NotificationType, options: IFakeNotificationOptions = {}): INotification {
    const toTextSignal = (value: string): Signal<string> => signal(value).asReadonly();

    return {
        id: options.id ?? 'notification-id',
        type,
        title: toTextSignal(options.title ?? 'Headline'),
        subTitle: toTextSignal(options.subTitle ?? ''),
        body: toTextSignal(options.body ?? 'The operation completed.'),
        detail: options.detail === undefined ? undefined : toTextSignal(options.detail),
        duration: options.duration ?? SHORT_DURATION,
        timeStamp: options.timeStamp ?? new Date('2026-09-02T10:00:00.000Z'),
    };
}

interface IProbeConfig {
    readonly label: string;
}

class ProbeNotificationInterceptor extends NotificationInterceptor<IProbeConfig> {
    public readonly seen: Array<string> = [];

    public constructor() {
        super();
    }

    public get appliedConfig(): IProbeConfig | null {
        return this.config;
    }

    public push(notification: INotification): void {
        this.seen.push(`${this.config?.label ?? 'unconfigured'}:${notification.id}`);
    }
}

describe('NotificationInterceptor', () => {
    it('exposes the applied options to the subclass', () => {
        // Arrange
        const interceptor = new ProbeNotificationInterceptor();

        // Act
        interceptor.configure({ label: 'first' });

        // Assert
        expect(interceptor.appliedConfig).toEqual({ label: 'first' });
    });

    it('replaces the options of an earlier configuration instead of merging them', () => {
        // Arrange
        const interceptor = new ProbeNotificationInterceptor();
        interceptor.configure({ label: 'first' });

        // Act
        interceptor.configure({ label: 'second' });

        // Assert
        expect(interceptor.appliedConfig).toEqual({ label: 'second' });
    });

    it('reports no options while the interceptor is unconfigured', () => {
        // Arrange
        const interceptor = new ProbeNotificationInterceptor();

        // Act
        interceptor.push(fakeNotification(NotificationType.Info, { id: 'n1' }));

        // Assert
        expect(interceptor.appliedConfig).toBeNull();
        expect(interceptor.seen).toEqual(['unconfigured:n1']);
    });

    it('inherits a disposal that releases nothing', () => {
        // Arrange
        const interceptor = new ProbeNotificationInterceptor();
        interceptor.configure({ label: 'first' });

        // Act
        interceptor.dispose();

        // Assert
        expect(interceptor.appliedConfig).toEqual({ label: 'first' });
    });
});
