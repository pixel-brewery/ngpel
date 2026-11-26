// #region Imports

import { execFile } from 'node:child_process';

// #endregion

const requestFailure = 'Dependabot GitHub API request failed; inspect the workflow and pull request before retrying.';

/**
 * Calls GitHub REST with the workflow's existing token and bounded native CLI execution.
 *
 * @param method - The HTTP method for the trusted repository operation.
 * @param endpoint - The repository-scoped REST endpoint constructed by the owning helper.
 * @param body - Optional JSON sent through standard input.
 * @returns The parsed JSON response.
 * @throws An Error with a controlled diagnostic when the token, command or response is unavailable.
 * @remarks Does not install tools, log in, discover credentials, print provider output or retry requests. Tokens stay in the child environment.
 *
 * @internal
 */
export async function requestDependabotGitHub(method, endpoint, body) {
    try {
        if (!process.env.GH_TOKEN) throw new Error(requestFailure);

        return await new Promise((resolveRequest, reject) => {
            const child = execFile(
                'gh',
                [
                    'api',
                    '--hostname',
                    'github.com',
                    '--method',
                    method,
                    '--header',
                    'Accept: application/vnd.github+json',
                    '--header',
                    'X-GitHub-Api-Version: 2022-11-28',
                    endpoint,
                    ...(body === undefined ? [] : ['--input', '-']),
                ],
                {
                    encoding: 'utf8',
                    env: { ...process.env, GH_PROMPT_DISABLED: '1' },
                    maxBuffer: 1024 * 1024,
                    timeout: 15_000,
                    killSignal: 'SIGKILL',
                    windowsHide: true,
                },
                (error, stdout, stderr) => {
                    if (error) {
                        reject(unavailableCandidateFailure(method, endpoint, stdout, stderr) ?? new Error(requestFailure));

                        return;
                    }

                    try {
                        if (
                            method === 'POST' &&
                            (endpoint.endsWith('/dispatches') ||
                                endpoint.endsWith('/approve') ||
                                endpoint.endsWith('/rerun-failed-jobs') ||
                                endpoint.endsWith('/rerun-failed-jobs')) &&
                            stdout.trim() === ''
                        ) {
                            resolveRequest(undefined);
                            return;
                        }
                        resolveRequest(JSON.parse(stdout));
                    } catch {
                        reject(new Error(requestFailure));
                    }
                },
            );

            child.stdin?.on('error', () => reject(new Error(requestFailure)));
            child.stdin?.end(body === undefined ? undefined : JSON.stringify(body));
        });
    } catch (error) {
        if (error?.code === 'NGPEL_RELEASE_CANDIDATE_NOT_CREATED' && error.endpoint === endpoint) throw error;
        throw new Error(requestFailure);
    }
}

/**
 * Classifies only the exact provider response for an own release candidate that is not uploaded yet.
 *
 * @remarks The caller still binds this candidate to its verified original artifact and current main; no other endpoint, permission failure or malformed response is admitted for waiting.
 * @internal
 */
function unavailableCandidateFailure(method, endpoint, stdout, stderr) {
    const candidate = /^repos\/pixel-brewery\/ngpel\/commits\/([a-f0-9]{40})\/pulls\?per_page=100$/u.exec(endpoint ?? '')?.[1];
    const status = /\(HTTP (404|422)\)\s*$/u.exec(typeof stderr === 'string' ? stderr : '')?.[1];
    if (method !== 'GET' || !candidate || !status) return;
    let body;
    try {
        body = JSON.parse(stdout);
    } catch {
        return;
    }
    if (
        !body ||
        Array.isArray(body) ||
        body.status !== status ||
        (status === '404' ? body.message !== 'Not Found' : body.message !== `No commit found for SHA: ${candidate}`)
    )
        return;
    return Object.assign(new Error(requestFailure), { code: 'NGPEL_RELEASE_CANDIDATE_NOT_CREATED', endpoint, candidate });
}
