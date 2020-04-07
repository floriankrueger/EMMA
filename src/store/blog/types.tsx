import { TBlogPost } from '../../models';

// State Types

export interface BlogState {
  posts: TBlogPost[];
}

// Action Types

export const UPSERT_BLOG_POST = 'UPSERT_BLOG_POST';

interface UpsertBlogPost {
  type: typeof UPSERT_BLOG_POST;
  payload: TBlogPost;
}

export type BlogActionTypes = UpsertBlogPost;
