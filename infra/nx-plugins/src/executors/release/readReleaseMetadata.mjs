const sha = /^[a-f0-9]{40}$/u;
const version = /^(0|[1-9][0-9]*)\.(0|[1-9][0-9]*)\.(0|[1-9][0-9]*)$/u;
const keys = ['candidate', 'runId', 'source', 'version'];

/**
 * Reads the complete canonical source-bound release record without trusting PR prose.
 *
 * @param value - The complete metadata pull-request body.
 * @returns The bounded canonical record, or undefined for other or modified bodies.
 * @internal
 */
export function readReleaseMetadata(value) {
    if (typeof value !== 'string' || value.length > 1_024) return undefined;
    let record;
    try {
        record = JSON.parse(value);
    } catch {
        return undefined;
    }
    if (
        !record ||
        typeof record !== 'object' ||
        Array.isArray(record) ||
        Object.keys(record).sort().join(',') !== keys.join(',') ||
        typeof record.source !== 'string' ||
        typeof record.candidate !== 'string' ||
        typeof record.version !== 'string' ||
        !sha.test(record.source) ||
        !sha.test(record.candidate) ||
        record.source === record.candidate ||
        !version.test(record.version ?? '') ||
        !Number.isSafeInteger(record.runId) ||
        record.runId <= 0
    )
        return undefined;
    return Object.freeze(record);
}
