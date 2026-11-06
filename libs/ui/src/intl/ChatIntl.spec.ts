// #region Imports

import { InjectionToken } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { CHAT_INTL, TranslateService } from '@pixel-brewery/mosaik-elements-angular';
import type { ChatElementIntl } from '@pixel-brewery/mosaik-elements-foundation';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { provideChatIntl } from './ChatIntl';

// #endregion

vi.mock('@pixel-brewery/mosaik-elements-angular', () => ({
    CHAT_INTL: new InjectionToken<Partial<ChatElementIntl>>('MOSAIK_CHAT_INTL'),
    TranslateService: class {},
}));

vi.mock('@pixel-brewery/mosaik-elements-foundation', () => ({
    ChatElementIntl: class {
        public inputPlaceholder = 'Type a message...';
    },
}));

describe('Chat internationalization provider', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                provideChatIntl({
                    inputPlaceholder: 'loc.assistant.chat.placeholder',
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

    it('provides translated labels through the chat wrapper token', () => {
        // arrange & act
        const intl = TestBed.inject<Partial<ChatElementIntl>>(CHAT_INTL);

        // assert
        expect(intl.inputPlaceholder).toBe('translated:loc.assistant.chat.placeholder');
    });
});
