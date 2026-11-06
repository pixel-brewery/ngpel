/**
 * Defines how an AI rail choice continues the inline interaction.
 *
 * @public
 */
export const AiRailChoiceType = {
    ACTION: 'ACTION',
    CONFIGURATION: 'CONFIGURATION',
    PROMPT: 'PROMPT',
} as const;

/**
 * Represents a supported AI rail choice type.
 *
 * @public
 */
export type AiRailChoiceType = (typeof AiRailChoiceType)[keyof typeof AiRailChoiceType];
