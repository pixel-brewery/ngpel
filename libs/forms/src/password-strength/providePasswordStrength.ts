// #region Imports

import { type EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import type { IPasswordStrengthConfig } from './IPasswordStrengthConfig';
import { PasswordStrengthService } from './PasswordStrengthService';

// #endregion

/**
 * Registers a {@link PasswordStrengthService} configured with the application's password policy.
 *
 * @public
 * @param config The policy defining minimum length, rules and thresholds.
 * @returns Environment providers for the composition root.
 */
export function providePasswordStrength(config: IPasswordStrengthConfig): EnvironmentProviders {
    return makeEnvironmentProviders([
        {
            provide: PasswordStrengthService,
            useFactory: (): PasswordStrengthService => new PasswordStrengthService(config),
        },
    ]);
}
