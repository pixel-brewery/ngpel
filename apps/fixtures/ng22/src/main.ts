import './configureMosaik';

import { provideZonelessChangeDetection } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideDrawers, provideTheme, provideToasts } from '@pixel-brewery/mosaik-elements-angular';
import { ReiconAliases } from '@pixel-brewery/mosaik-elements-foundation/icons/reicon';
import { IconRegistry } from '@pixel-brewery/mosaik-icons';
import { JoyTheme } from '@pixel-brewery/mosaik-themes';
import { provideOperationQueue } from '@pixel-brewery/ngpel-core/operation-queue';
import { AppComponent } from './app/AppComponent';
import { provideFixture } from './app/provideFixture';

// cspell:words reicon
IconRegistry.instance.registerSet('reicon', ReiconAliases);
IconRegistry.instance.setDefaultSet('reicon');

bootstrapApplication(AppComponent, {
    providers: [
        provideZonelessChangeDetection(),
        provideDrawers(),
        provideToasts(),
        provideTheme({ theme: JoyTheme.JOY_THEME, mode: matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light' }),
        provideFixture(),
        provideOperationQueue(),
    ],
}).catch((error: unknown) => console.error(error));
