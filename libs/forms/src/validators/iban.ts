// #region Imports

import { type PathKind, type SchemaPath, type SchemaPathRules, validate } from '@angular/forms/signals';
import { resolveSignalValidatorError } from '../config/resolveSignalValidatorError';
import { shouldApplySignalValidator } from '../config/shouldApplySignalValidator';
import type { SignalValidatorConfig } from '../config/SignalValidatorConfig';
import type { IIbanValidationError } from './IIbanValidationError';

// #endregion

/** Official IBAN lengths by ISO 3166-1 alpha-2 country code (IBAN registry). */
const IBAN_LENGTHS: Readonly<Record<string, number>> = {
    AD: 24,
    AE: 23,
    AL: 28,
    AT: 20,
    AZ: 28,
    BA: 20,
    BE: 16,
    BG: 22,
    BH: 22,
    BR: 29,
    BY: 28,
    CH: 21,
    CR: 22,
    CY: 28,
    CZ: 24,
    DE: 22,
    DK: 18,
    DO: 28,
    EE: 20,
    EG: 29,
    ES: 24,
    FI: 18,
    FO: 18,
    FR: 27,
    GB: 22,
    GE: 22,
    GI: 23,
    GL: 18,
    GR: 27,
    GT: 28,
    HR: 21,
    HU: 28,
    IE: 22,
    IL: 23,
    IQ: 23,
    IS: 26,
    IT: 27,
    JO: 30,
    KZ: 20,
    KW: 30,
    LB: 28,
    LC: 32,
    LI: 21,
    LT: 20,
    LU: 20,
    LV: 21,
    MC: 27,
    MD: 24,
    ME: 22,
    MK: 19,
    MR: 27,
    MT: 31,
    MU: 30,
    NL: 18,
    NO: 15,
    PK: 24,
    PL: 28,
    PS: 29,
    PT: 25,
    QA: 29,
    RO: 24,
    RS: 22,
    SA: 24,
    SC: 31,
    SE: 24,
    SI: 19,
    SK: 24,
    SM: 27,
    ST: 25,
    SV: 28,
    TL: 23,
    TN: 24,
    TR: 26,
    UA: 29,
    VA: 22,
    VG: 24,
    XK: 20,
};

const IBAN_SHAPE_PATTERN = /^[A-Z]{2}\d{2}[A-Z0-9]+$/;
const LETTER_PATTERN = /[A-Z]/;
const WHITESPACE_PATTERN = /\s/g;
const LETTER_OFFSET = 55;
const MOD_97 = 97;

/**
 * Validates that an optional string is an IBAN with a known country code, the registered length
 * for that country and a valid ISO 7064 mod-97 checksum. Whitespace and casing are ignored. Empty
 * strings pass so the validator composes with `required`.
 *
 * @public
 * @typeParam TPathKind The kind of the validated path.
 * @param path Signal Forms schema path to validate.
 * @param config Optional custom message, error or activation condition.
 */
export function iban<TPathKind extends PathKind = PathKind.Root>(
    path: SchemaPath<string, SchemaPathRules.Supported, TPathKind>,
    config?: SignalValidatorConfig<string, TPathKind>,
): void {
    validate(path, (context) => {
        const value = context.value();

        if (!shouldApplySignalValidator(config, context) || (typeof value === 'string' && (value === '' || isValidIban(value)))) {
            return null;
        }

        return resolveSignalValidatorError(config, context, (message) => ({ kind: 'iban', actualValue: value, message }) satisfies IIbanValidationError);
    });
}

function isValidIban(value: string): boolean {
    const normalized = value.replace(WHITESPACE_PATTERN, '').toUpperCase();
    const expectedLength = IBAN_LENGTHS[normalized.slice(0, 2)];

    if (expectedLength === undefined || normalized.length !== expectedLength || !IBAN_SHAPE_PATTERN.test(normalized)) {
        return false;
    }

    const rearranged = `${normalized.slice(4)}${normalized.slice(0, 4)}`;
    let remainder = 0;

    for (const character of rearranged) {
        const digits = LETTER_PATTERN.test(character) ? String(character.charCodeAt(0) - LETTER_OFFSET) : character;

        for (const digit of digits) {
            remainder = (remainder * 10 + Number(digit)) % MOD_97;
        }
    }

    return remainder === 1;
}
