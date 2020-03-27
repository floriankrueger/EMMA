import { action, observable, computed } from 'mobx';
import { TBlogPost, TBlogPostPreview } from '../models';

export class BlogStore {
  @observable
  blogPosts: TBlogPost[] = dummyBlogPosts;

  @action
  set(blogPosts: TBlogPost[]) {
    this.blogPosts = blogPosts;
  }

  @computed
  get currentBlogEntries(): TBlogPostPreview[] {
    return this.blogPosts
      .slice()
      .sort(sortBlogPosts)
      .map(makeBlogPostPreview);
  }
}

// Helpers

const sortBlogPosts = (lhs: TBlogPost, rhs: TBlogPost): number => {
  if (lhs.publishDate > rhs.publishDate) {
    return 1;
  } else if (lhs.publishDate < rhs.publishDate) {
    return -1;
  } else {
    return 0;
  }
};

const makeBlogPostPreview = (blogPost: TBlogPost): TBlogPostPreview => {
  return {
    title: blogPost.title,
    slug: blogPost.slug,
    heroImage: blogPost.heroImage,
    description: blogPost.description,
    publishDate: blogPost.publishDate,
    tags: blogPost.tags
  };
};

// Dummy Data

const dummyBlogPosts = [
  {
    title: 'This is a title 1',
    slug: 'this-is-a-title-1',
    heroImage: 'https://images.unsplash.com/photo-1585119192304-5f4ae7af29ff?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2848&q=80',
    description: 'Lorem ipsum dolor sit amet.',
    body: 'Lorem ipsum dolor sit amet. But longer.',
    author: 'John Doe',
    publishDate: new Date(),
    tags: ['first', 'blog', 'post']
  },
  {
    title: 'This is a title 2',
    slug: 'this-is-a-title-2',
    heroImage: 'https://images.unsplash.com/photo-1585134425874-a858f1de7c9f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1868&q=80',
    description: 'Lorem ipsum dolor sit amet.',
    body: 'Lorem ipsum dolor sit amet. But longer.',
    author: 'John Doe',
    publishDate: new Date(),
    tags: ['first', 'blog', 'post']
  },
  {
    title: 'This is a title 3',
    slug: 'this-is-a-title-3',
    heroImage: 'https://images.unsplash.com/photo-1585039249674-f5bf1a25445f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2200&q=80',
    description: 'Lorem ipsum dolor sit amet.',
    body: 'Lorem ipsum dolor sit amet. But longer.',
    author: 'John Doe',
    publishDate: new Date(),
    tags: ['first', 'blog', 'post']
  },
  {
    title: 'This is a title 4',
    slug: 'this-is-a-title-4',
    heroImage: 'https://images.unsplash.com/photo-1558980664-3a031cf67ea8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80',
    description: 'Lorem ipsum dolor sit amet.',
    body: 'Lorem ipsum dolor sit amet. But longer.',
    author: 'John Doe',
    publishDate: new Date(),
    tags: ['first', 'blog', 'post']
  }
] as TBlogPost[];
