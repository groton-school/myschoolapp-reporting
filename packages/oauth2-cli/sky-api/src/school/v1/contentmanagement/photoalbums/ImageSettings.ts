import { ImageDimension } from './ImageDimension.js';

export type ImageSettings = {
  max_allowed?: number;
  allow_title?: boolean;
  allow_captions?: boolean;
  allow_descriptions?: boolean;
  standard?: ImageDimension;
  zoom?: ImageDimension;
  thumbnail?: ImageDimension;
};
