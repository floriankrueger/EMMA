import * as contentful from 'contentful';

import { TBlogPost } from '../models';

type ContentfulBlogEntry = { [key: string]: any };

const getBlogPosts = (client: contentful.ContentfulClientApi): Promise<TBlogPost[]> => {
  return client
    .getEntries({
      content_type: 'blogPost',
    })
    .then((entries) => {
      const blogPosts = entries.items.reduce<TBlogPost[]>((list, entry) => {
        const fields = entry.fields as ContentfulBlogEntry;
        const newEntry = {
          title: fields.title,
          slug: fields.slug,
          heroImage: '',
          description: fields.description,
          body: fields.body,
          author: '',
          publishDate: new Date(fields.publishDate),
          tags: fields.tags,
        } as TBlogPost;
        return [...list, newEntry];
      }, []);
      return new Promise((resolve) => resolve(blogPosts));
    });
};

export { getBlogPosts };
