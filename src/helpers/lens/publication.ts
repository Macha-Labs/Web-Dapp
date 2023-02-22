import { GenericMetadata, MetadataDisplayType } from './generic';

interface MetadataMedia {
  item: string;
  /**
   * This is the mime type of media
   */
  type: string;
}

export interface MetadataAttribute {
  displayType?: MetadataDisplayType;
  traitType?: string;
  value: string;
}

export interface Metadata extends GenericMetadata {
  description?: string;
  content?: string;
  external_url?: string | null;
  name: string;
  attributes: MetadataAttribute[];
  image?: string | null;
  imageMimeType?: string | null;
  media?: MetadataMedia[];
  animation_url?: string;
  locale: string;
  tags?: string[];
  contentWarning?: PublicationContentWarning[];
  // mainContentFocus: PublicationMainFocus;
}

export enum PublicationContentWarning {
  NSFW = 'NSFW',
  SENSITIVE = 'SENSITIVE',
  SPOILER = 'SPOILER',
}

// export enum PublicationMainFocus {
//   VIDEO = 'VIDEO',
//   IMAGE = 'IMAGE',
//   ARTICLE = 'ARTICLE',
//   TEXT_ONLY = 'TEXT_ONLY',
//   AUDIO = 'AUDIO',
//   LINK = 'LINK',
//   EMBED = 'EMBED',
// }

export const PublicationMainFocus = {
  'TEXT_ONLY': 'TEXT_ONLY',
  'video/mp4': 'VIDEO',
  'video/webm': 'VIDEO',
  'video/x-m4v': 'VIDEO',
  'video/ogv': 'VIDEO',
  'video/ogg': 'VIDEO',
  'image/gif': 'IMAGE',
  'image/jpeg': 'IMAGE',
  'image/png': 'IMAGE',
  'image/tiff': 'IMAGE',
  'image/x-ms-bmp': 'IMAGE',
  'image/svg+xml': 'IMAGE',
  'image/webp': 'IMAGE',
  'audio/wav': 'AUDIO',
  'audio/mpeg': 'AUDIO',
  'audio/ogg': 'AUDIO',
  'LINK': 'LINK',
  'EMBED': 'EMBED'
}