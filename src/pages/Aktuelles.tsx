import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonToolbar } from '@ionic/react';
import React from 'react';
import { observer } from 'mobx-react';
import './Aktuelles.css';
import PageHeader from '../components/PageHeader';
import BlogPostPreviewList from '../components/BlogPostPreviewList';
import { useStores } from '../hooks/use-stores';

const Aktuelles = observer(() => {
  const { blogStore } = useStores();

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
        <BlogPostPreviewList blogPostPreviewItems={blogStore.currentBlogEntries} />
      </IonContent>
    </IonPage>
  );
});

export default Aktuelles;
