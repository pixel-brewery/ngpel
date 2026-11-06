import './configureMosaik';

import { provideZonelessChangeDetection } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideDrawers, provideTheme, provideToasts } from '@pixel-brewery/mosaik-elements-angular';
import { ReiconAliases } from '@pixel-brewery/mosaik-elements-foundation/icons/reicon';
import { IconRegistry } from '@pixel-brewery/mosaik-icons';
import { JoyTheme } from '@pixel-brewery/mosaik-themes';
import { provideOperationQueue } from '@pixel-brewery/ngpel-core/operation-queue';
import { provideUserPreferences, withLocalStorage } from '@pixel-brewery/ngpel-core/storage';
import { provideNavigation } from '@pixel-brewery/ngpel-router/navigation';
import { AppComponent } from './app/AppComponent';
import { provideFixture } from './app/provideFixture';

// cspell:words reicon
IconRegistry.instance.registerSet('reicon', ReiconAliases);
IconRegistry.instance.setDefaultSet('reicon');

bootstrapApplication(AppComponent, {
    providers: [
        provideZonelessChangeDetection(),
        provideRouter([]),
        provideNavigation(),
        provideDrawers(),
        provideToasts(),
        provideTheme({ theme: JoyTheme.JOY_THEME, mode: matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light' }),
        provideFixture(),
        provideOperationQueue(),
        provideUserPreferences(withLocalStorage()),
    ],
}).catch((error: unknown) => console.error(error));
