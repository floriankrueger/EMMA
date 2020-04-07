import { TImage } from './image';

export interface TBlogPost {
  title: string;
  slug: string;
  heroImage: TImage | null;
  description: string;
  body: string;
  author: string;
  publishDate: number;
  tags: string[];
}
