// #region Imports

import { SimpleChange, ɵresolveComponentResources as resolveComponentResources, ɵSIGNAL as SIGNAL, type InputSignal } from '@angular/core';
import { TestBed, type ComponentFixture } from '@angular/core/testing';
import type { FieldState } from '@angular/forms/signals';
import { By } from '@angular/platform-browser';
import { TranslateService } from '@pixel-brewery/mosaik-elements-angular';
import { readFile } from 'node:fs/promises';
import { EMPTY } from 'rxjs';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { DynamicFormComponent } from './DynamicFormComponent';
import { DynamicFormControlType } from './DynamicFormControlType';
import { DynamicFormValidationRuleKey } from './DynamicFormValidationRuleKey';
import type { DynamicFormValue } from './DynamicFormValue';
import type { IDynamicFormDefinition } from './IDynamicFormDefinition';
import type { IDynamicFormFieldDefinition } from './IDynamicFormFieldDefinition';

// #endregion

vi.mock('@pixel-brewery/mosaik-elements-angular', async () => {
    const angular = await vi.importActual<typeof import('@angular/core')>('@angular/core');
    const inputs = [
        'autocomplete',
        'appearance',
        'disabled',
        'dropDownPlacement',
        'fieldState',
        'formField',
        'href',
        'iconName',
        'isClearable',
        'isReadOnly',
        'label',
        'max',
        'maxDate',
        'maxlength',
        'min',
        'minDate',
        'multiline',
        'multilineRows',
        'placeholder',
        'readonly',
        'rel',
        'required',
        'size',
        'step',
        'text',
        'target',
        'type',
        'value',
        'variant',
        'wrap',
    ];

    function createComponent(selector: string): unknown {
        class StubComponent {}

        angular.Component({
            selector,
            standalone: true,
            template: '<ng-content />',
            inputs,
        })(StubComponent);

        return StubComponent;
    }

    function createDirective(selector: string): unknown {
        class StubDirective {}

        angular.Directive({
            selector,
            standalone: true,
            inputs,
        })(StubDirective);

        return StubDirective;
    }

    return {
        AnchorComponent: createComponent('mosaik-anchor'),
        ButtonComponent: createComponent('mosaik-button'),
        CheckboxComponent: createComponent('mosaik-checkbox'),
        DateBoxComponent: createComponent('mosaik-datebox'),
        FormFieldComponent: createComponent('mosaik-form-field'),
        FormFieldDirective: createDirective('[formField]'),
        FormFieldStateDirective: createDirective('[fieldState]'),
        IconNameDirective: createDirective('[iconName]'),
        LocaleDirective: createDirective('[locale]'),
        NumberBoxComponent: createComponent('mosaik-numberbox'),
        PasswordBoxComponent: createComponent('mosaik-passwordbox'),
        SelectComponent: createComponent('mosaik-select'),
        SelectItemComponent: createComponent('mosaik-select-item'),
        TextBoxComponent: createComponent('mosaik-textbox'),
        TextComponent: createComponent('mosaik-text'),
        TranslateService: class TranslateService {},
    };
});

const ORIGINAL_CLIPBOARD_DESCRIPTOR = Object.getOwnPropertyDescriptor(globalThis.navigator, 'clipboard');

interface IDynamicFormComponentTestApi {
    field(key: string): () => FieldState<DynamicFormValue>;
    linkUrl(field: IDynamicFormFieldDefinition): string | null;
}

describe('DynamicFormComponent', () => {
    afterEach(() => {
        vi.restoreAllMocks();
        if (ORIGINAL_CLIPBOARD_DESCRIPTOR) {
            Object.defineProperty(globalThis.navigator, 'clipboard', ORIGINAL_CLIPBOARD_DESCRIPTOR);
        } else {
            Reflect.deleteProperty(globalThis.navigator, 'clipboard');
        }
        TestBed.resetTestingModule();
    });

    it('should render all supported controls in semantic grid positions', async () => {
        // arrange
        const fixture = await createFixture();
        setDefinition(fixture.componentInstance, createDefinition());
        fixture.componentInstance.value.set({
            name: 'Contoso',
            recipientEmail: 'customer@example.com',
            notes: 'Prepared',
            amount: 42,
            status: 'OPEN',
            accepted: true,
            validUntil: '2026-08-01',
            confirmationLink: 'https://confirm.example.com/grants/secure-token',
            summary: 'Ready',
        });

        // act
        fixture.detectChanges();

        // assert
        const element: HTMLElement = fixture.nativeElement;
        expect(element.querySelectorAll('mosaik-textbox')).toHaveLength(3);
        expect(element.querySelectorAll('mosaik-numberbox')).toHaveLength(1);
        expect(element.querySelectorAll('mosaik-select')).toHaveLength(1);
        expect(element.querySelectorAll('mosaik-checkbox')).toHaveLength(1);
        expect(element.querySelectorAll('mosaik-datebox')).toHaveLength(1);
        expect(element.querySelectorAll('mosaik-anchor')).toHaveLength(1);
        expect(element.querySelectorAll('[test-id="dynamic-form-field-confirmationLink"] mosaik-button')).toHaveLength(1);
        expect(element.querySelector('[test-id="dynamic-form-field-summary"] mosaik-text')).not.toBeNull();
        expect(element.querySelector('[test-id="dynamic-form-field-recipientEmail"] mosaik-textbox')?.getAttribute('type')).toBe('email');
        expect(element.querySelector('[test-id="dynamic-form-field-name"]')?.className).toContain('md:col-span-6');
        expect(element.querySelector('[test-id="dynamic-form-field-notes"]')?.className).toContain('md:col-start-7');
        const anchor = fixture.debugElement.query(By.css('[test-id="dynamic-form-field-confirmationLink"] mosaik-anchor'));
        expect(anchor.componentInstance.href).toBe('https://confirm.example.com/grants/secure-token');
        expect(anchor.componentInstance.target).toBe('_blank');
        expect(anchor.componentInstance.rel).toBe('noopener noreferrer');
        expect((fixture.componentInstance as unknown as IDynamicFormComponentTestApi).field('recipientEmail')().errors()).toEqual([]);
    });

    it('should render only HTTPS, root-relative, and local development HTTP links', async () => {
        // arrange
        const fixture = await createFixture();
        const field: IDynamicFormFieldDefinition = {
            key: 'confirmationLink',
            label: 'Customer confirmation',
            controlType: DynamicFormControlType.Link,
        };
        setDefinition(fixture.componentInstance, createLinkDefinition(field));
        const api = fixture.componentInstance as unknown as IDynamicFormComponentTestApi;

        // act
        fixture.componentInstance.value.set({ confirmationLink: 'javascript:alert(1)' });
        const unsafeUrl = api.linkUrl(field);
        fixture.componentInstance.value.set({ confirmationLink: '/public/confirm/token' });
        const relativeUrl = api.linkUrl(field);
        fixture.componentInstance.value.set({ confirmationLink: 'http://localhost:4200/public/confirm/token' });
        const localDevelopmentUrl = api.linkUrl(field);
        fixture.componentInstance.value.set({ confirmationLink: 'http://example.com/public/confirm/token' });
        const insecureRemoteUrl = api.linkUrl(field);

        // assert
        expect(unsafeUrl).toBeNull();
        expect(relativeUrl).toBe('/public/confirm/token');
        expect(localDevelopmentUrl).toBe('http://localhost:4200/public/confirm/token');
        expect(insecureRemoteUrl).toBeNull();
    });

    it('should copy a safe link and announce the configured success status', async () => {
        // arrange
        const writeText = vi.fn<Clipboard['writeText']>().mockResolvedValue(undefined);
        Object.defineProperty(globalThis.navigator, 'clipboard', {
            configurable: true,
            value: { writeText },
        });
        const fixture = await createFixture();
        setDefinition(
            fixture.componentInstance,
            createLinkDefinition({
                key: 'confirmationLink',
                label: 'Customer confirmation',
                controlType: DynamicFormControlType.Link,
                link: {
                    copyLabel: 'Copy confirmation link',
                    copiedLabel: 'Confirmation link copied',
                },
            }),
        );
        fixture.componentInstance.value.set({
            confirmationLink: 'https://confirm.example.com/grants/secure-token',
        });
        fixture.detectChanges();
        const copyButton = fixture.nativeElement.querySelector('[test-id="dynamic-form-field-confirmationLink"] mosaik-button') as HTMLElement;

        // act
        copyButton.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        await fixture.whenStable();
        fixture.detectChanges();

        // assert
        expect(writeText).toHaveBeenCalledOnce();
        expect(writeText).toHaveBeenCalledWith('https://confirm.example.com/grants/secure-token');
        expect(fixture.nativeElement.querySelector('[role="status"]')?.textContent).toContain('Confirmation link copied');
    });

    it('should contain Clipboard API failures and announce the configured error status', async () => {
        // arrange
        const writeText = vi.fn<Clipboard['writeText']>().mockRejectedValue(new Error('Permission denied'));
        Object.defineProperty(globalThis.navigator, 'clipboard', {
            configurable: true,
            value: { writeText },
        });
        const fixture = await createFixture();
        setDefinition(
            fixture.componentInstance,
            createLinkDefinition({
                key: 'confirmationLink',
                label: 'Customer confirmation',
                controlType: DynamicFormControlType.Link,
                link: {
                    copyErrorLabel: 'Confirmation link could not be copied',
                },
            }),
        );
        fixture.componentInstance.value.set({
            confirmationLink: 'https://confirm.example.com/grants/secure-token',
        });
        fixture.detectChanges();
        const copyButton = fixture.nativeElement.querySelector('[test-id="dynamic-form-field-confirmationLink"] mosaik-button') as HTMLElement;

        // act
        copyButton.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        await fixture.whenStable();
        fixture.detectChanges();

        // assert
        expect(writeText).toHaveBeenCalledOnce();
        expect(fixture.nativeElement.querySelector('[role="status"]')?.textContent).toContain('Confirmation link could not be copied');
    });

    it('should initialize missing values from field definitions without removing additional values', async () => {
        // arrange
        const fixture = await createFixture();
        fixture.componentInstance.value.set({ retained: 'future-value' });
        setDefinition(fixture.componentInstance, createDefinition());

        // act
        fixture.detectChanges();

        // assert
        expect(fixture.componentInstance.value()).toMatchObject({
            accepted: false,
            retained: 'future-value',
            status: 'OPEN',
        });
    });

    it('should expose a validation error for invalid email values', async () => {
        // arrange
        const fixture = await createFixture();
        fixture.componentInstance.value.set({ recipientEmail: 'invalid-address' });
        setDefinition(fixture.componentInstance, createDefinition());
        const api = fixture.componentInstance as unknown as IDynamicFormComponentTestApi;

        // act
        const errors = api.field('recipientEmail')().errors();

        // assert
        expect(errors.map((error) => error.kind)).toContain('email');
    });

    it('should apply declarative required validation to empty values', async () => {
        // arrange
        const fixture = await createFixture();
        fixture.componentInstance.value.set({ recipientEmail: null });
        setDefinition(fixture.componentInstance, createRequiredEmailDefinition());
        const api = fixture.componentInstance as unknown as IDynamicFormComponentTestApi;

        // act
        const errors = api.field('recipientEmail')().errors();

        // assert
        expect(errors.map((error) => error.kind)).toContain('required');
        expect(fixture.componentInstance.valid()).toBe(false);
        expect(fixture.componentInstance.canSubmit()).toBe(false);
    });

    it('should expose validation errors after the host requests validation', async () => {
        // arrange
        const fixture = await createFixture();
        fixture.componentInstance.value.set({ recipientEmail: null });
        setDefinition(fixture.componentInstance, createRequiredEmailDefinition());
        const api = fixture.componentInstance as unknown as IDynamicFormComponentTestApi;
        expect(api.field('recipientEmail')().touched()).toBe(false);

        // act
        setRequiredInput(fixture.componentInstance.validationAttempted, true);
        fixture.detectChanges();

        // assert
        expect(api.field('recipientEmail')().touched()).toBe(true);
        expect(
            api
                .field('recipientEmail')()
                .errors()
                .map((error) => error.kind),
        ).toContain('required');
    });

    it('should apply declarative maximum-length validation to text values', async () => {
        // arrange
        const fixture = await createFixture();
        fixture.componentInstance.value.set({ message: 'seventh' });
        setDefinition(fixture.componentInstance, createMaximumLengthDefinition());
        const api = fixture.componentInstance as unknown as IDynamicFormComponentTestApi;

        // act
        fixture.detectChanges();

        // assert
        expect(
            api
                .field('message')()
                .errors()
                .map((error) => error.kind),
        ).toContain('maxLength');
        expect(fixture.componentInstance.valid()).toBe(false);
        expect(fixture.componentInstance.canSubmit()).toBe(false);
    });

    it('should reactively expose when all declarative validation rules permit submission', async () => {
        // arrange
        const fixture = await createFixture();
        fixture.componentInstance.value.set({ recipientEmail: null });
        setDefinition(fixture.componentInstance, createRequiredEmailDefinition());
        const api = fixture.componentInstance as unknown as IDynamicFormComponentTestApi;

        // act
        api.field('recipientEmail')().value.set('customer@example.com');

        // assert
        expect(fixture.componentInstance.valid()).toBe(true);
        expect(fixture.componentInstance.canSubmit()).toBe(true);
    });

    it('should make all editable controls immutable when the host enforces read-only mode', async () => {
        // arrange
        const fixture = await createFixture();
        setDefinition(fixture.componentInstance, createDefinition());
        setRequiredInput(fixture.componentInstance.isReadonly, true);

        // act
        fixture.detectChanges();

        // assert
        expect(fixture.componentInstance.canSubmit()).toBe(false);
        expect(fixture.debugElement.query(By.css('[test-id="dynamic-form-field-name"] mosaik-textbox')).componentInstance.readonly).toBe(true);
        expect(fixture.debugElement.query(By.css('[test-id="dynamic-form-field-amount"] mosaik-numberbox')).componentInstance.readonly).toBe(true);
        expect(fixture.debugElement.query(By.css('[test-id="dynamic-form-field-status"] mosaik-select')).componentInstance.isReadOnly).toBe(true);
        expect(fixture.debugElement.query(By.css('[test-id="dynamic-form-field-accepted"] mosaik-checkbox')).componentInstance.disabled).toBe(true);
        expect(fixture.debugElement.query(By.css('[test-id="dynamic-form-field-validUntil"] mosaik-datebox')).componentInstance.readonly).toBe(true);
    });

    describe('edge cases', () => {
        it('should reject duplicate field keys across sections', async () => {
            // arrange
            const fixture = await createFixture();
            const definition: IDynamicFormDefinition = {
                key: 'duplicate',
                version: 1,
                sections: [
                    {
                        key: 'first',
                        fields: [{ key: 'same', label: 'First', controlType: DynamicFormControlType.Text }],
                    },
                    {
                        key: 'second',
                        fields: [{ key: 'same', label: 'Second', controlType: DynamicFormControlType.Text }],
                    },
                ],
            };

            // act
            const action = (): void => setDefinition(fixture.componentInstance, definition);

            // assert
            expect(action).toThrowError("Dynamic form field key 'same' is duplicated.");
        });

        it('should reject prototype-sensitive field keys', async () => {
            // arrange
            const fixture = await createFixture();
            const definition: IDynamicFormDefinition = {
                key: 'unsafe',
                version: 1,
                sections: [
                    {
                        key: 'main',
                        fields: [{ key: '__proto__', label: 'Unsafe', controlType: DynamicFormControlType.Text }],
                    },
                ],
            };

            // act
            const action = (): void => setDefinition(fixture.componentInstance, definition);

            // assert
            expect(action).toThrowError("Dynamic form field key '__proto__' is not allowed.");
        });

        it('should reject malformed maximum-length rules before rendering', async () => {
            // arrange
            const fixture = await createFixture();
            const definition: IDynamicFormDefinition = {
                key: 'malformed-validation',
                version: 1,
                sections: [
                    {
                        key: 'main',
                        fields: [
                            {
                                key: 'message',
                                label: 'Message',
                                controlType: DynamicFormControlType.Text,
                                validationRules: [
                                    {
                                        key: DynamicFormValidationRuleKey.MaxLength,
                                        value: -1,
                                    },
                                ],
                            },
                        ],
                    },
                ],
            };

            // act
            const action = (): void => setDefinition(fixture.componentInstance, definition);

            // assert
            expect(action).toThrowError("Dynamic form field 'message' has an invalid maxLength rule.");
            expect(fixture.componentInstance.canSubmit()).toBe(false);
        });

        it('should reject date boundaries that form an impossible range', async () => {
            // arrange
            const fixture = await createFixture();
            const definition: IDynamicFormDefinition = {
                key: 'invalid-date-range',
                version: 1,
                sections: [
                    {
                        key: 'main',
                        fields: [
                            {
                                key: 'validUntil',
                                label: 'Valid until',
                                controlType: DynamicFormControlType.Date,
                                minimumDate: '2026-08-02',
                                maximumDate: '2026-08-01',
                            },
                        ],
                    },
                ],
            };

            // act
            const action = (): void => setDefinition(fixture.componentInstance, definition);

            // assert
            expect(action).toThrowError("Dynamic form field 'validUntil' has an invalid date range.");
        });
    });
});

async function createFixture(): Promise<ComponentFixture<DynamicFormComponent>> {
    await resolveComponentResources(async (resourceUrl) => readFile(new URL(resourceUrl, import.meta.url), 'utf8'));
    TestBed.configureTestingModule({
        imports: [DynamicFormComponent],
        providers: [
            {
                provide: TranslateService,
                useValue: {
                    currentLanguage: 'de',
                    languageChanged: EMPTY,
                    translate: (_key: string, fallback: string): string => fallback,
                },
            },
        ],
    });
    await TestBed.compileComponents();

    return TestBed.createComponent(DynamicFormComponent);
}

function setDefinition(component: DynamicFormComponent, definition: IDynamicFormDefinition): void {
    setRequiredInput(component.definition, definition);
    component.ngOnChanges({
        definition: new SimpleChange(undefined, definition, true),
    });
}

function setRequiredInput<TValue>(input: InputSignal<TValue>, value: TValue): void {
    const node = input[SIGNAL];
    node.applyValueToInputSignal(node, value);
}

function createDefinition(): IDynamicFormDefinition {
    return {
        key: 'commercial-document',
        version: 1,
        title: 'Commercial document',
        sections: [
            {
                key: 'main',
                title: 'Details',
                fields: [
                    {
                        key: 'name',
                        label: 'Name',
                        controlType: DynamicFormControlType.Text,
                        layout: { medium: { span: 6 } },
                    },
                    {
                        key: 'notes',
                        label: 'Notes',
                        controlType: DynamicFormControlType.Multiline,
                        multilineRows: 5,
                        layout: { medium: { span: 6, start: 7 } },
                    },
                    {
                        key: 'recipientEmail',
                        label: 'Recipient email',
                        controlType: DynamicFormControlType.Email,
                        validationRules: [
                            { key: DynamicFormValidationRuleKey.Required },
                            { key: DynamicFormValidationRuleKey.Email },
                            { key: DynamicFormValidationRuleKey.MaxLength, value: 320 },
                        ],
                    },
                    {
                        key: 'amount',
                        label: 'Amount',
                        controlType: DynamicFormControlType.Number,
                        minimum: 0,
                        step: 1,
                    },
                    {
                        key: 'status',
                        label: 'Status',
                        controlType: DynamicFormControlType.Select,
                        initialValue: 'OPEN',
                        options: [
                            { label: 'Open', value: 'OPEN' },
                            { label: 'Done', value: 'DONE' },
                        ],
                    },
                    {
                        key: 'accepted',
                        label: 'Accepted',
                        controlType: DynamicFormControlType.Boolean,
                        initialValue: false,
                    },
                    {
                        key: 'validUntil',
                        label: 'Valid until',
                        controlType: DynamicFormControlType.Date,
                    },
                    {
                        key: 'confirmationLink',
                        label: 'Customer confirmation',
                        controlType: DynamicFormControlType.Link,
                    },
                    {
                        key: 'summary',
                        label: 'Summary',
                        controlType: DynamicFormControlType.Readonly,
                    },
                ],
            },
        ],
    };
}

function createLinkDefinition(field: IDynamicFormFieldDefinition): IDynamicFormDefinition {
    return {
        key: 'confirmation-link',
        version: 1,
        sections: [
            {
                key: 'main',
                fields: [field],
            },
        ],
    };
}

function createMaximumLengthDefinition(): IDynamicFormDefinition {
    return {
        key: 'maximum-length',
        version: 1,
        sections: [
            {
                key: 'main',
                fields: [
                    {
                        key: 'message',
                        label: 'Message',
                        controlType: DynamicFormControlType.Text,
                        validationRules: [{ key: DynamicFormValidationRuleKey.MaxLength, value: 6 }],
                    },
                ],
            },
        ],
    };
}

function createRequiredEmailDefinition(): IDynamicFormDefinition {
    return {
        key: 'required-email',
        version: 1,
        sections: [
            {
                key: 'main',
                fields: [
                    {
                        key: 'recipientEmail',
                        label: 'Recipient email',
                        controlType: DynamicFormControlType.Email,
                        validationRules: [
                            { key: DynamicFormValidationRuleKey.Required },
                            { key: DynamicFormValidationRuleKey.Email },
                            { key: DynamicFormValidationRuleKey.MaxLength, value: 320 },
                        ],
                    },
                ],
            },
        ],
    };
}
