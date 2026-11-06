import { InjectionToken, makeEnvironmentProviders, type EnvironmentProviders } from '@angular/core';
import { composeProviders, createFeature, featureKind, type IFeature } from '@pixel-brewery/ngpel-core';

type FixtureKind = 'greeting';
const FixtureKinds = { Greeting: featureKind<FixtureKind>('greeting') } as const;

export const GREETING = new InjectionToken<string>('FIXTURE_GREETING');

export function withGreeting(text: string): IFeature<FixtureKind> {
    return createFeature('greeting', FixtureKinds.Greeting, [{ provide: GREETING, useValue: text }]);
}

/** Exercises the provide<Feature>(...with<Option>()) kernel from @pixel-brewery/ngpel-core. */
export function provideFixture(): EnvironmentProviders {
    return makeEnvironmentProviders(composeProviders([], [withGreeting('ngpel core is wired')]));
}
