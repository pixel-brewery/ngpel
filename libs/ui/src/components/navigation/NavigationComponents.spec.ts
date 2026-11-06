// #region Imports

import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

// #endregion

describe('navigation components', () => {
    it('provides dedicated brand, navigation content, and footer areas', async () => {
        // arrange
        const template = inlineTemplateOf('NavigationComponent.ts');

        // act
        const contentAreas = template.match(/<ng-content select=/g) ?? [];

        // assert
        expect(contentAreas).toHaveLength(3);
        expect(template).toContain('select="[ngpNavigationBrand]"');
        expect(template).toContain('select="[ngpNavigationContent]"');
        expect(template).toContain('select="[ngpNavigationFooter]"');
        expect(template).toContain('[attr.data-navigation-mode]');
        expect(template).toContain('[attr.aria-label]="ariaLabel()"');
    });

    it('keeps one Mosaik menu item with an accessible compact label', async () => {
        // arrange
        const template = inlineTemplateOf('NavigationMenuItemComponent.ts');

        // act
        const mosaikItems = template.match(/<mosaik-menu-item/g) ?? [];

        // assert
        expect(mosaikItems).toHaveLength(1);
        expect(template).toContain('[label]="compact() ? \'\' : label()"');
        expect(template).toContain('<span slot="label" class="sr-only">{{ label() }}</span>');
    });

    it('wraps Mosaik menu and group controls instead of replacing their semantics', async () => {
        // arrange
        const [menuTemplate, groupTemplate] = [inlineTemplateOf('NavigationMenuComponent.ts'), inlineTemplateOf('NavigationMenuGroupComponent.ts')];

        // act
        const controls = `${menuTemplate}\n${groupTemplate}`;

        // assert
        expect(controls).toContain('<mosaik-menu');
        expect(controls).toContain('<mosaik-menu-item-group');
        expect(menuTemplate).toContain('<ng-content />');
        expect(groupTemplate).toContain('<ng-content />');
    });

    it('preserves compact group height with a divider in the Mosaik group header slot', async () => {
        // arrange
        const template = inlineTemplateOf('NavigationMenuGroupComponent.ts');

        // act
        const compactHeader = template.match(/@if \(compact\(\)\)[\s\S]*?<ng-content \/>/)?.[0] ?? '';

        // assert
        expect(template).toContain('[header]="compact() ? \'\' : label()"');
        expect(compactHeader).toContain('slot="header"');
        expect(compactHeader).toContain('h-[34px]');
        expect(compactHeader).toContain('<mosaik-divider');
    });

    it('keeps navigation header and menu spacing independent of display mode', async () => {
        // arrange
        const [navigationTemplate, menuTemplate] = [inlineTemplateOf('NavigationComponent.ts'), inlineTemplateOf('NavigationMenuComponent.ts')];

        // act
        const brandHeader = navigationTemplate.match(/<header[\s\S]*?<\/header>/)?.[0] ?? '';

        // assert
        expect(brandHeader).toContain('box-border');
        expect(brandHeader).toContain('h-[64px]');
        expect(menuTemplate).toContain('class="w-full p-2"');
        expect(menuTemplate).not.toContain('[class.p-1]');
    });
});

/** Extracts the inline 'template' of a component source, resolving the escapes a literal needs. */
function inlineTemplateOf(fileName: string): string {
    const source = readFileSync(join(import.meta.dirname, fileName), 'utf8');
    const start = source.indexOf('template: `');

    if (start === -1) {
        throw new Error(`${fileName} has no inline template.`);
    }

    let index = start + 'template: `'.length;
    let block = '';

    while (index < source.length && source[index] !== '`') {
        if (source[index] === '\\') {
            block += source[index + 1];
            index += 2;
            continue;
        }

        block += source[index];
        index += 1;
    }

    const lines = block.split('\n');
    const indent = Math.min(...lines.filter((line) => line.trim() !== '').map((line) => line.length - line.trimStart().length));

    return lines
        .map((line) => line.slice(indent))
        .join('\n')
        .trim();
}
