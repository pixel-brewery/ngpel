import { provideZonelessChangeDetection } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/AppComponent';
import { provideFixture } from './app/provideFixture';

bootstrapApplication(AppComponent, {
    providers: [provideZonelessChangeDetection(), provideFixture()],
}).catch((error: unknown) => console.error(error));
