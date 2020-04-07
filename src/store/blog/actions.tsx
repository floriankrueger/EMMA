import { TBlogPost } from '../../models';
import { UPSERT_BLOG_POST, BlogActionTypes } from './types';

export function upsertBlogPost(blogPost: TBlogPost): BlogActionTypes {
  return {
    type: UPSERT_BLOG_POST,
    payload: blogPost,
  };
}
