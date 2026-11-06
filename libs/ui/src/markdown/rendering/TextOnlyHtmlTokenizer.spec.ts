import { Lexer, Tokenizer } from 'marked';
import { describe, expect, it } from 'vitest';
import { TextOnlyHtmlTokenizer } from './TextOnlyHtmlTokenizer';

describe('TextOnlyHtmlTokenizer', () => {
    it('is a marked tokenizer', () => {
        // Arrange
        const tokenizer = new TextOnlyHtmlTokenizer();

        // Act
        const actual = tokenizer instanceof Tokenizer;

        // Assert
        expect(actual).toBe(true);
    });

    it('refuses block-level HTML', () => {
        // Arrange
        const tokenizer = new TextOnlyHtmlTokenizer();

        // Act
        const actual = tokenizer.html();

        // Assert
        expect(actual).toBeUndefined();
    });

    it('refuses inline HTML tags', () => {
        // Arrange
        const tokenizer = new TextOnlyHtmlTokenizer();

        // Act
        const actual = tokenizer.tag();

        // Assert
        expect(actual).toBeUndefined();
    });

    it('lexes embedded block HTML as a paragraph instead of an html token', () => {
        // Arrange
        const lexer = new Lexer({ gfm: true, tokenizer: new TextOnlyHtmlTokenizer() });

        // Act
        const tokens = lexer.lex('<div onclick="x">hi</div>');

        // Assert
        expect(tokens.map((token) => token.type)).toEqual(['paragraph']);
        expect(tokens.some((token) => token.type === 'html')).toBe(false);
    });

    it('lexes an inline tag as text instead of a tag token', () => {
        // Arrange
        const lexer = new Lexer({ gfm: true, tokenizer: new TextOnlyHtmlTokenizer() });

        // Act
        const tokens = lexer.lex('a <b>x</b> b');

        // Assert
        const paragraph = tokens[0];
        const inlineTypes = paragraph?.type === 'paragraph' ? (paragraph.tokens ?? []).map((token) => token.type) : [];

        expect(inlineTypes).not.toContain('html');
        expect(inlineTypes.length).toBeGreaterThan(0);
        expect(inlineTypes.every((type) => type === 'text' || type === 'escape')).toBe(true);
    });
});
