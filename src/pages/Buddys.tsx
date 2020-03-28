import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonToolbar } from '@ionic/react';
import React from 'react';
import './Buddys.css';
import PageHeader from '../components/PageHeader';
import PageContent from '../components/PageContent';
import BuddyList from '../components/BuddyList';

const Buddys: React.FC = () => {
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
        <PageHeader assetName='buddys' title='EMMA:Buddys' copy='Klicke einen EMMA:Buddy an, um mehr zu erfahren oder einen Chat zu starten.' />
        <PageContent>
          <BuddyList />
        </PageContent>
      </IonContent>
    </IonPage>
  );
};

export default Buddys;
