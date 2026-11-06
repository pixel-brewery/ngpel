// #region Imports

import { TestBed } from '@angular/core/testing';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { CaptchaComponent } from './CaptchaComponent';
import { CaptchaComponentIntl } from './CaptchaComponentIntl';

// #endregion

vi.mock('@pixel-brewery/mosaik-elements-angular', () => ({
    AnimateDirective: class AnimateDirective {},
    ButtonComponent: class ButtonComponent {},
    ErrorStateComponent: class ErrorStateComponent {},
    SuccessStateComponent: class SuccessStateComponent {},
    TextComponent: class TextComponent {},
    TranslateService: class TranslateService {},
}));

describe('Captcha verification flow', () => {
    afterEach(() => {
        TestBed.resetTestingModule();
        vi.restoreAllMocks();
    });

    it('should expose an invalid answer without accepting a form value', () => {
        // arrange
        const component = createComponent();
        const challenge = requireChallenge(component);
        const invalidEvent = vi.fn();
        const verifiedChange = vi.fn();
        component.invalidEvent.subscribe(invalidEvent);
        component.verifiedChange.subscribe(verifiedChange);

        // act
        component.validate(challenge.answer + 1);

        // assert
        expect(component.state).toBe('invalid');
        expect(component.value()).toBeNull();
        expect(invalidEvent).toHaveBeenCalledWith({
            answer: challenge.answer + 1,
            challenge,
        });
        expect(verifiedChange).toHaveBeenCalledWith(false);
    });

    it('should replace an invalid challenge and clear its form value on retry', () => {
        // arrange
        const component = createComponent();
        const initialChallenge = requireChallenge(component);
        const onChange = vi.fn();
        const retryEvent = vi.fn();
        component.registerOnChange(onChange);
        component.retryEvent.subscribe(retryEvent);
        component.validate(initialChallenge.answer + 1);

        // act
        component.retry();

        // assert
        expect(component.challenge).not.toBe(initialChallenge);
        expect(component.state).toBe('idle');
        expect(component.value()).toBeNull();
        expect(onChange).toHaveBeenCalledWith(null);
        expect(retryEvent).toHaveBeenCalledOnce();
    });

    it('should publish the verified answer for form submission', () => {
        // arrange
        const component = createComponent();
        const challenge = requireChallenge(component);
        const onChange = vi.fn();
        const verifiedEvent = vi.fn();
        const verifiedChange = vi.fn();
        component.registerOnChange(onChange);
        component.verifiedEvent.subscribe(verifiedEvent);
        component.verifiedChange.subscribe(verifiedChange);

        // act
        component.validate(challenge.answer);

        // assert
        expect(component.state).toBe('verified');
        expect(component.value()).toBe(challenge.answer);
        expect(onChange).toHaveBeenCalledWith(challenge.answer);
        expect(verifiedEvent).toHaveBeenCalledWith({
            answer: challenge.answer,
            challenge,
        });
        expect(verifiedChange).toHaveBeenCalledWith(true);
    });
});

function createComponent(): CaptchaComponent {
    const randomValues = [0, 0, 0, 0.2, 0.8];
    let randomIndex = 0;

    vi.spyOn(Math, 'random').mockImplementation(() => randomValues[randomIndex++ % randomValues.length] ?? 0);
    TestBed.configureTestingModule({
        providers: [CaptchaComponentIntl],
    });
    const component = TestBed.runInInjectionContext(() => new CaptchaComponent());

    Object.defineProperties(component, {
        minValue: { value: () => 2 },
        maxValue: { value: () => 2 },
        operators: { value: () => ['add'] as const },
    });
    component.ngOnInit();

    return component;
}

function requireChallenge(component: CaptchaComponent): NonNullable<CaptchaComponent['challenge']> {
    const challenge = component.challenge;

    if (!challenge) {
        throw new Error('Expected captcha challenge.');
    }

    return challenge;
}
