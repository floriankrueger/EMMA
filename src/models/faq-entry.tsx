import { Document } from '@contentful/rich-text-types';

export interface TFAQEntry {
  sorting: number;
  slug: string;
  question: string;
  answer: Document;
}
