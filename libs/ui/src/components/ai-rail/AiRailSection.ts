/**
 * Defines the internally rendered section of an AI rail.
 *
 * @public
 */
export const AiRailSection = {
    BUSY: 'BUSY',
    CHOICES: 'CHOICES',
    CONFIGURATION: 'CONFIGURATION',
    PROMPT: 'PROMPT',
    RESULT: 'RESULT',
} as const;

/**
 * Represents an internally rendered AI rail section.
 *
 * @public
 */
export type AiRailSection = (typeof AiRailSection)[keyof typeof AiRailSection];
