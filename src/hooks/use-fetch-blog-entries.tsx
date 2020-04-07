import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { AppDispatch } from '../store';
import { client, getBlogPosts } from '../contentful';

export function useFetchBlogEntries() {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    getBlogPosts(client).then((entries) => {
      console.log(entries);
    });
  });
}
