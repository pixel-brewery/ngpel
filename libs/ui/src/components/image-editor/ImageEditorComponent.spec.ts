import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { ImageEditorComponent } from './ImageEditorComponent';

vi.mock('@pixel-brewery/mosaik-elements-angular', () => ({
    AvatarComponent: class AvatarComponent {},
    ButtonComponent: class ButtonComponent {},
    FilePickerComponent: class FilePickerComponent {},
    IconNameDirective: class IconNameDirective {},
    PressButtonComponent: class PressButtonComponent {},
}));

interface IImageEditorTestApi {
    onRemove(): void;
}

describe('ImageEditorComponent', () => {
    afterEach(() => TestBed.resetTestingModule());

    it('keeps the image when the caller excludes removal', () => {
        // Arrange
        const { component, api } = createComponent(false);
        const removed = vi.fn();
        component.imageRemoved.subscribe(removed);

        // Act
        api.onRemove();

        // Assert
        expect(component.value()).toBe('/images/portrait.png');
        expect(removed).not.toHaveBeenCalled();
    });

    it('clears the value and reports the previous image when removal is allowed', () => {
        // Arrange
        const { component, api } = createComponent(true);
        const removed = vi.fn();
        const changed = vi.fn();
        component.imageRemoved.subscribe(removed);
        component.registerOnChange(changed);

        // Act
        api.onRemove();

        // Assert
        expect(component.value()).toBeUndefined();
        expect(changed).toHaveBeenCalledWith(null);
        expect(removed).toHaveBeenCalledWith({ previousUrl: '/images/portrait.png' });
    });
});

function createComponent(removable: boolean): { readonly component: ImageEditorComponent; readonly api: IImageEditorTestApi } {
    TestBed.configureTestingModule({});
    const component = TestBed.runInInjectionContext(() => new ImageEditorComponent());
    Object.defineProperties(component, {
        removable: { value: signal(removable) },
        value: { value: signal<string | undefined>('/images/portrait.png') },
    });

    return { component, api: component as unknown as IImageEditorTestApi };
}
