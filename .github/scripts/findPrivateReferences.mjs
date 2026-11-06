import { execFileSync } from 'node:child_process';
import { lstatSync, readFileSync, readlinkSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { gunzipSync } from 'node:zlib';

// Keep excluded project identifiers out of the public tree, including this check.
const excluded = ['666c616d6f78', '7374726976696f', '73796d70686f6e79', '727565646572656e6e6573'].map((hex) => Buffer.from(hex, 'hex').toString('utf8'));

/** Returns redacted paths containing internal identifiers, including in decoded gzip content. */
export function findPrivateReferences(root, identifiers = excluded) {
    const tracked = execFileSync('git', ['ls-files', '-z', '--cached', '--others', '--exclude-standard'], { cwd: root, encoding: 'utf8' });
    const words = identifiers.map((identifier) => identifier.toLowerCase());
    const patterns = words.flatMap((word) => [Buffer.from(word, 'utf8'), Buffer.from(word, 'utf16le')]);
    const hasWord = (text) => words.some((word) => text.toLowerCase().includes(word));
    const hasBytes = (bytes) => {
        const normalized = Buffer.from(bytes);
        for (let index = 0; index < normalized.length; index++) {
            if (normalized[index] >= 65 && normalized[index] <= 90) normalized[index] += 32;
        }
        return patterns.some((pattern) => normalized.includes(pattern));
    };
    const redact = (path) => words.reduce((safe, word) => safe.replaceAll(new RegExp(word, 'gi'), '[private]'), path);
    const results = [];
    for (const path of new Set(tracked.split('\0').filter(Boolean))) {
        const filename = resolve(root, path);
        let info;
        try {
            info = lstatSync(filename);
        } catch (error) {
            if (error.code === 'ENOENT') continue;
            throw error;
        }
        if (hasWord(path)) {
            results.push(redact(path));
            continue;
        }
        if (info.isSymbolicLink() && hasWord(readlinkSync(filename))) results.push(redact(path));
        if (!info.isFile()) continue;
        const bytes = readFileSync(filename);
        if (hasBytes(bytes) || (bytes[0] === 0x1f && bytes[1] === 0x8b && hasBytes(gunzipSync(bytes, { maxOutputLength: 64 * 1024 * 1024 })))) {
            results.push(redact(path));
        }
    }
    return results;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
    const violations = findPrivateReferences(process.cwd());
    if (violations.length) {
        console.error(`Private references in:\n${violations.join('\n')}`);
        process.exitCode = 1;
    } else {
        console.log('Public source check passed.');
    }
}
