// #region Imports

import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { describe, expect, it, vi } from 'vitest';
import { FileSourceComponent } from './FileSourceComponent';
import { FileSourceType } from './FileSourceType';

// #endregion

describe('FileSourceComponent', () => {
    it('should invoke only enabled action sources', () => {
        // arrange
        const component = createSource({ type: FileSourceType.Action });
        const emitter = vi.spyOn(component.requested, 'emit');

        // act
        component.request();

        // assert
        expect(emitter).toHaveBeenCalledOnce();
    });

    it('should emit selected and rejected files only for picker sources', () => {
        // arrange
        const component = createSource({ type: FileSourceType.Picker });
        const selectedEmitter = vi.spyOn(component.filesSelected, 'emit');
        const rejectedEmitter = vi.spyOn(component.filesRejected, 'emit');
        const file = new File(['content'], 'image.png', { type: 'image/png' });

        // act
        component.selectFiles([file]);
        component.rejectFiles([file]);

        // assert
        expect(selectedEmitter).toHaveBeenCalledWith([file]);
        expect(rejectedEmitter).toHaveBeenCalledWith([file]);
    });

    it.each([
        { busy: true, disabled: false },
        { busy: false, disabled: true },
    ])('should fail closed while disabled or busy', ({ busy, disabled }) => {
        // arrange
        const component = createSource({ busy, disabled, type: FileSourceType.Action });
        const emitter = vi.spyOn(component.requested, 'emit');

        // act
        component.request();

        // assert
        expect(emitter).not.toHaveBeenCalled();
    });
});

function createSource(config: Partial<{ busy: boolean; disabled: boolean; type: 'action' | 'picker' }> = {}): FileSourceComponent {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({});
    const component = TestBed.runInInjectionContext(() => new FileSourceComponent());

    Object.defineProperties(component, {
        busy: { value: signal(config.busy ?? false) },
        disabled: { value: signal(config.disabled ?? false) },
        type: { value: signal(config.type ?? FileSourceType.Action) },
    });

    return component;
}
