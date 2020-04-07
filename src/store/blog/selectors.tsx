import { BlogState } from './types';
import { TBlogPost } from '../../models';

export const sortedBlogPosts = (state: BlogState): TBlogPost[] => {
  return [...state.posts].sort((lhs, rhs) => rhs.publishDate - lhs.publishDate);
};
