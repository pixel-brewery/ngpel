// #region Imports

import type { ThumbnailPreview } from '@pixel-brewery/mosaik-elements-foundation';

// #endregion

export type FilePreviewMediaKind = 'audio' | 'image' | 'other' | 'video';

const AUDIO_EXTENSIONS: ReadonlySet<string> = new Set(['aac', 'flac', 'm4a', 'mp3', 'oga', 'ogg', 'wav']);
const IMAGE_EXTENSIONS: ReadonlySet<string> = new Set(['avif', 'bmp', 'gif', 'heic', 'heif', 'jpeg', 'jpg', 'png', 'svg', 'webp']);
const VIDEO_EXTENSIONS: ReadonlySet<string> = new Set(['avi', 'm4v', 'mkv', 'mov', 'mp4', 'ogg', 'ogv', 'webm']);

// Only formats a browser cannot render inline reach the icon fallback, so the icon carries
// the document family and the extension label separates members of the same family.
const ARCHIVE_EXTENSIONS: ReadonlySet<string> = new Set(['7z', 'bz2', 'gz', 'rar', 'tar', 'tgz', 'zip']);
const CODE_EXTENSIONS: ReadonlySet<string> = new Set(['css', 'html', 'js', 'json', 'ts', 'xml', 'yaml', 'yml']);
const SPREADSHEET_EXTENSIONS: ReadonlySet<string> = new Set(['csv', 'ods', 'tsv', 'xls', 'xlsm', 'xlsx']);
const TEXT_EXTENSIONS: ReadonlySet<string> = new Set(['log', 'md', 'rtf', 'txt']);

export function createFilePreview(mediaKind: FilePreviewMediaKind, url: string, fileName: string): ThumbnailPreview {
    switch (mediaKind) {
        case 'image':
            return { type: 'image', url, alt: fileName };
        case 'video':
            return { type: 'video', url };
        case 'audio':
            return { type: 'audio', url };
        default:
            return createFilePreviewFallback();
    }
}

export function createFilePreviewFallback(): ThumbnailPreview {
    return { type: 'other' };
}

/**
 * Returns the file extension in upper case, or an empty string when the name carries none.
 *
 * @public
 */
export function resolveFileExtensionLabel(fileName: null | string | undefined): string {
    return resolveFileExtension(fileName).toUpperCase();
}

/**
 * Returns the registered icon representing the document family of one file name.
 *
 * @public
 */
export function resolveFileIconName(fileName: null | string | undefined): string {
    const extension = resolveFileExtension(fileName);
    if (SPREADSHEET_EXTENSIONS.has(extension)) {
        return 'table';
    }
    if (ARCHIVE_EXTENSIONS.has(extension)) {
        return 'archive';
    }
    if (CODE_EXTENSIONS.has(extension)) {
        return 'code';
    }
    if (TEXT_EXTENSIONS.has(extension)) {
        return 'textParagraph';
    }

    return 'document';
}

export function matchesFilePreviewMediaKind(mediaKind: FilePreviewMediaKind, fileName: string): boolean {
    const extension = resolveFileExtension(fileName);

    switch (mediaKind) {
        case 'image':
            return IMAGE_EXTENSIONS.has(extension);
        case 'video':
            return VIDEO_EXTENSIONS.has(extension);
        case 'audio':
            return AUDIO_EXTENSIONS.has(extension);
        default:
            return false;
    }
}

export function resolveFilePreviewMediaKind(contentType: string, fileName: string): FilePreviewMediaKind {
    const normalizedContentType = contentType.trim().toLowerCase();
    if (normalizedContentType.startsWith('image/')) {
        return 'image';
    }
    if (normalizedContentType.startsWith('video/')) {
        return 'video';
    }
    if (normalizedContentType.startsWith('audio/')) {
        return 'audio';
    }

    if (matchesFilePreviewMediaKind('image', fileName)) {
        return 'image';
    }
    if (matchesFilePreviewMediaKind('video', fileName)) {
        return 'video';
    }
    if (matchesFilePreviewMediaKind('audio', fileName)) {
        return 'audio';
    }

    return 'other';
}

function resolveFileExtension(fileName: null | string | undefined): string {
    const name = fileName?.trim() ?? '';
    const separatorIndex = name.lastIndexOf('.');

    return separatorIndex > 0 ? name.slice(separatorIndex + 1).toLowerCase() : '';
}
