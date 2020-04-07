import { TImage } from './image';

export interface TBlogPostPreview {
  title: string;
  slug: string;
  heroImage: TImage | null;
  description: string;
  publishDate: number;
  tags: string[];
}
