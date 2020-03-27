import React from 'react';
import './BlogPostPreviewItem.css';
import { Link } from 'react-router-dom';
import { TBlogPostPreview } from '../models';

interface BlogPostPreviewItemProps {
  blogPostPreview: TBlogPostPreview;
}

const BlogPostPreviewItem: React.FC<BlogPostPreviewItemProps> = ({ blogPostPreview }) => {
  return (
    <div className='blog-post-preview'>
      <Link to={`/aktuelles/${blogPostPreview.slug}`}>
        <img src={blogPostPreview.heroImage} alt='' />
      </Link>
      <h2>{blogPostPreview.title}</h2>
      <p>{blogPostPreview.description}</p>
      <Link to={`/aktuelles/${blogPostPreview.slug}`}>weiterlesen</Link>
    </div>
  );
};

export default BlogPostPreviewItem;
