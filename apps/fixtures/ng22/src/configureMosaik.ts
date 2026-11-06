import { ThemeObserverServiceLocator } from '@pixel-brewery/mosaik-themes';

// The custom elements select their styles as the Angular wrappers load.
ThemeObserverServiceLocator.current.applyTheme('joy', 'system');
