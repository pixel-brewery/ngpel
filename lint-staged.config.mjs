/**
 * Runs linters and formatters on staged files before commit.
 *
 * @type {import('lint-staged').Configuration}
 */
export default {
    '!(.docs)/**/*.{ts,tsx,js,jsx,mjs,mts}': (filenames) => [`eslint ${filenames.join(' ')} --fix`, `prettier --write ${filenames.join(' ')}`],
    '!(.docs)/**/*.{json,yml,yaml}': (filenames) => `prettier --write ${filenames.join(' ')}`,
    '!(.docs)/**/*.md': (filenames) => `prettier --write ${filenames.join(' ')}`,
};
