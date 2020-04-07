import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { AppDispatch, useTypedSelector, sortedBlogPosts } from '../store';
import { upsertBlogPost } from '../store/blog/actions';
import { client, getBlogPosts } from '../contentful';

export function useFetchBlogEntries() {
  const dispatch: AppDispatch = useDispatch();
  const posts = useTypedSelector((state) => sortedBlogPosts(state.blog));

  useEffect(() => {
    getBlogPosts(client).then((entries) => {
      entries.forEach((entry) => dispatch(upsertBlogPost(entry)));
    });
  }, [dispatch]);

  return posts;
}
