import React from 'react';
import './BlogPostPreviewList.css';
import { IonGrid, IonCol, IonRow } from '@ionic/react';
import BlogPostPreviewItem from './BlogPostPreviewItem';
import { TBlogPostPreview } from '../models';

interface BlogPostPreviewListProps {
  blogPostPreviewItems: TBlogPostPreview[];
}

const BlogPostPreviewList: React.FC<BlogPostPreviewListProps> = ({ blogPostPreviewItems }) => {
  return (
    <IonGrid>
      {blogPostPreviewItems.map((item, index) => {
        return (
          <IonRow key={index}>
            <IonCol size-xs='0' size-md='2'></IonCol>
            <IonCol>
              <BlogPostPreviewItem blogPostPreview={item} />
            </IonCol>
            <IonCol size-xs='0' size-md='2'></IonCol>
          </IonRow>
        );
      })}
    </IonGrid>
  );
};

export default BlogPostPreviewList;
