// #region Imports

import { afterEach, describe, expect, it, vi } from 'vitest';
import { requestDependabotGitHub } from './requestDependabotGitHub.mjs';

// #endregion

const system = vi.hoisted(() => ({ execFile: vi.fn() }));

vi.mock('node:child_process', () => ({ execFile: system.execFile }));

afterEach(() => {
    vi.unstubAllEnvs();
    system.execFile.mockReset();
});

describe('Dependabot GitHub request boundary', () => {
    it('sends JSON through stdin with the existing job token and bounded direct CLI execution', async () => {
        // arrange
        const input = vi.fn();
        const endpoint = 'repos/pixel-brewery/ngpel/issues/7/comments';

        vi.stubEnv('GH_TOKEN', 'synthetic-workflow-token');
        system.execFile.mockImplementation((_command, _arguments, _options, callback) => ({
            stdin: {
                on: vi.fn(),
                end: (body: string) => {
                    input(body);
                    callback(null, '{"id":7}');
                },
            },
        }));

        // act
        const result = await requestDependabotGitHub('POST', endpoint, { body: '@dependabot rebase' });

        // assert
        expect(result).toEqual({ id: 7 });
        expect(input).toHaveBeenCalledExactlyOnceWith('{"body":"@dependabot rebase"}');

        const [command, arguments_, options] = system.execFile.mock.calls[0];

        expect(command).toBe('gh');
        expect(arguments_.slice(0, 3)).toEqual(['api', '--hostname', 'github.com']);
        expect(arguments_).toContain(endpoint);
        expect(arguments_.slice(-2)).toEqual(['--input', '-']);
        expect(arguments_.join(' ')).not.toContain('synthetic-workflow-token');
        expect(arguments_).not.toContain('auth');
        expect(options).toMatchObject({
            timeout: 15_000,
            maxBuffer: 1024 * 1024,
            killSignal: 'SIGKILL',
            env: { GH_TOKEN: 'synthetic-workflow-token', GH_PROMPT_DISABLED: '1' },
        });
    });

    it('accepts the empty successful workflow-dispatch response', async () => {
        // arrange
        vi.stubEnv('GH_TOKEN', 'synthetic-workflow-token');
        system.execFile.mockImplementation((_command, _arguments, _options, callback) => ({
            stdin: { on: vi.fn(), end: () => callback(null, '') },
        }));

        // act
        const result = await requestDependabotGitHub('POST', 'repos/pixel-brewery/ngpel/actions/workflows/ci.yml/dispatches', {
            ref: 'dependabot/npm_and_yarn/frameworks',
        });

        // assert
        expect(result).toBeUndefined();
        expect(system.execFile).toHaveBeenCalledTimes(1);
    });

    it('does not accept an empty response from a metadata read', async () => {
        // arrange
        vi.stubEnv('GH_TOKEN', 'synthetic-workflow-token');
        system.execFile.mockImplementation((_command, _arguments, _options, callback) => ({
            stdin: { on: vi.fn(), end: () => callback(null, '') },
        }));

        // act
        const result = requestDependabotGitHub('GET', 'repositories/1440122208');

        // assert
        await expect(result).rejects.toThrow('GitHub API request failed');
    });

    it('requires GH_TOKEN without falling back to a stored account or another token', async () => {
        // arrange
        vi.stubEnv('GH_TOKEN', '');
        vi.stubEnv('GITHUB_TOKEN', 'synthetic-secondary-token');

        // act
        const result = requestDependabotGitHub('GET', 'repositories/1440122208');

        // assert
        await expect(result).rejects.toThrow('GitHub API request failed');
        expect(system.execFile).not.toHaveBeenCalled();
    });

    it.each(['spawn', 'command', 'json', 'stdin'])('sanitizes %s failures without retrying or exposing process output', async (kind) => {
        // arrange
        vi.stubEnv('GH_TOKEN', 'synthetic-workflow-token');
        system.execFile.mockImplementation((_command, _arguments, _options, callback) => {
            if (kind === 'spawn') throw new Error('sensitive-upstream-output');

            return {
                stdin: {
                    on: (_event: string, failure: (cause: Error) => void) => {
                        if (kind === 'stdin') failure(new Error('sensitive-upstream-output'));
                    },
                    end: () =>
                        callback(kind === 'command' ? new Error('sensitive-upstream-output') : null, kind === 'json' ? 'sensitive-upstream-output' : '{}'),
                },
            };
        });

        // act
        const result = requestDependabotGitHub('GET', 'repositories/1440122208');

        // assert
        await expect(result).rejects.toThrow('GitHub API request failed');
        await expect(result).rejects.not.toThrow('sensitive-upstream-output');
        expect(system.execFile).toHaveBeenCalledTimes(1);
    });
});

describe('original release candidate visibility', () => {
    const candidate = 'a'.repeat(40);
    const endpoint = `repos/pixel-brewery/ngpel/commits/${candidate}/pulls?per_page=100`;

    it.each(['404', '422'])('preserves only the exact own-candidate HTTP %s response as a controlled unavailable result', async (status) => {
        // Arrange
        vi.stubEnv('GH_TOKEN', 'synthetic-workflow-token');
        const message = status === '404' ? 'Not Found' : `No commit found for SHA: ${candidate}`;
        system.execFile.mockImplementation((_command, _arguments, _options, callback) => ({
            stdin: {
                on: vi.fn(),
                end: () => callback(new Error('sensitive-upstream-output'), JSON.stringify({ status, message }), `gh: ${message} (HTTP ${status})\n`),
            },
        }));
        // Act
        const error = await requestDependabotGitHub('GET', endpoint).catch((failure) => failure);
        // Assert
        expect(error).toBeInstanceOf(Error);
        expect(error).not.toHaveProperty('cause');
        expect(error).toMatchObject({ code: 'NGPEL_RELEASE_CANDIDATE_NOT_CREATED', endpoint, candidate });
        expect(error.message).toContain('GitHub API request failed');
        expect(error.message).not.toContain('sensitive-upstream-output');
        expect(system.execFile).toHaveBeenCalledTimes(1);
    });

    it.each([
        'permission',
        'other-validation',
        'other-sha',
        'other-repository',
        'other-endpoint',
        'other-method',
        'malformed-json',
        'wrong-body-status',
        'numeric-body-status',
        'wrong-404-message',
    ])('retains the sanitized fatal boundary for %s', async (change) => {
        // Arrange
        vi.stubEnv('GH_TOKEN', 'synthetic-workflow-token');
        let status = '422';
        let bodyStatus: string | number = status;
        let message = `No commit found for SHA: ${candidate}`;
        let path = endpoint;
        let method = 'GET';
        if (change === 'permission') {
            status = '403';
            bodyStatus = status;
            message = 'Resource not accessible by integration';
        }
        if (change === 'other-validation') message = 'Validation Failed';
        if (change === 'other-sha') message = `No commit found for SHA: ${'b'.repeat(40)}`;
        if (change === 'other-repository') path = path.replace('pixel-brewery/ngpel', 'example/other');
        if (change === 'other-endpoint') path = path.replace('/pulls?per_page=100', '');
        if (change === 'other-method') method = 'POST';
        if (change === 'wrong-body-status') bodyStatus = '404';
        if (change === 'numeric-body-status') bodyStatus = 422;
        if (change === 'wrong-404-message') {
            status = '404';
            bodyStatus = status;
            message = 'A different resource was not found';
        }
        const stdout = change === 'malformed-json' ? 'sensitive-upstream-output' : JSON.stringify({ status: bodyStatus, message });
        system.execFile.mockImplementation((_command, _arguments, _options, callback) => ({
            stdin: { on: vi.fn(), end: () => callback(new Error('sensitive-upstream-output'), stdout, `gh: ${message} (HTTP ${status})\n`) },
        }));
        // Act
        const error = await requestDependabotGitHub(method, path).catch((failure) => failure);
        // Assert
        expect(error).toBeInstanceOf(Error);
        expect(error).not.toHaveProperty('cause');
        expect(error).not.toHaveProperty('code');
        expect(error.message).not.toContain('sensitive-upstream-output');
        expect(system.execFile).toHaveBeenCalledTimes(1);
    });
});
