import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonToolbar } from '@ionic/react';
import React from 'react';

import { useFetchBlogEntries } from '../hooks';
import PageHeader from '../components/PageHeader';
import BlogPostPreviewList from '../components/BlogPostPreviewList';

import './Aktuelles.css';

const Aktuelles: React.FC = () => {
  const posts = useFetchBlogEntries();

  return (
    <IonPage>
      <IonHeader className='ion-no-border'>
        <IonToolbar>
          <IonButtons slot='start'>
            <IonMenuButton />
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <PageHeader
          assetName='aktuelles_header'
          title='Aktuelles'
          copy='Auf dieser Seite findest du regelmäßig neue Beiträge zu Themen wie Erziehung, Gesundheit oder Krisenbewältigung.'
        />
        <BlogPostPreviewList blogPostPreviewItems={posts} />
      </IonContent>
    </IonPage>
  );
};

export default Aktuelles;
