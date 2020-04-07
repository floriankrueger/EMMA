import { BlogState, BlogActionTypes, UPSERT_BLOG_POST } from './types';
import { TBlogPost } from '../../models';

const initialState: BlogState = {
  posts: [],
};

export function blogReducer(state = initialState, action: BlogActionTypes): BlogState {
  switch (action.type) {
    case UPSERT_BLOG_POST:
      return {
        ...state,
        posts: upsertBlogPost(state.posts, action.payload),
      };
    default:
      return state;
  }
}

// Helpers

function upsertBlogPost(list: TBlogPost[], entry: TBlogPost): TBlogPost[] {
  var updated: Boolean = false;
  var updatedList = list.map((existingEntry) => {
    if (existingEntry.slug === entry.slug) {
      updated = true;
      return entry;
    } else {
      return existingEntry;
    }
  });
  if (!updated) {
    updatedList.push(entry);
  }
  return updatedList;
}
