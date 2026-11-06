/**
 * Conventional-commit rules feeding nx release versioning and the generated changelogs.
 *
 * @type {import('@commitlint/types').UserConfig}
 */
export default {
    extends: ['@commitlint/config-conventional'],
    rules: {
        'type-enum': [2, 'always', ['feat', 'fix', 'docs', 'style', 'refactor', 'perf', 'test', 'build', 'ci', 'chore', 'revert']],
    },
    helpUrl: 'https://github.com/conventional-changelog/commitlint/#what-is-commitlint',
};
