import * as contentful from 'contentful';

import { TImage, TBlogPost } from '../models';

type ContentfulBlogEntry = { [key: string]: any };

const getBlogPosts = (client: contentful.ContentfulClientApi): Promise<TBlogPost[]> => {
  return client
    .getEntries({
      content_type: 'blogPost',
    })
    .then((entries) => {
      const blogPosts = entries.items.reduce<TBlogPost[]>((list, entry) => {
        const fields = entry.fields as ContentfulBlogEntry;

        var heroImage: TImage | null = fields.heroImage
          ? ({
              url: fields.heroImage.fields.file.url,
              alt: fields.heroImage.fields.description,
            } as TImage)
          : null;

        const newEntry = {
          title: fields.title,
          slug: fields.slug,
          heroImage: heroImage,
          description: fields.description,
          body: fields.body,
          author: fields.author.fields.name,
          publishDate: new Date(fields.publishDate).getTime(),
          tags: fields.tags,
        } as TBlogPost;
        return [...list, newEntry];
      }, []);
      return new Promise((resolve) => resolve(blogPosts));
    });
};

export { getBlogPosts };
