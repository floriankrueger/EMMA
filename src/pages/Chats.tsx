import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonToolbar } from '@ionic/react';
import React from 'react';
import './Chats.css';
import PageHeader from '../components/PageHeader';
import ChatList from '../components/ChatList';

const Chats: React.FC = () => {
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
        <PageHeader assetName='chats' title='Chats' />
        <ChatList />
      </IonContent>
    </IonPage>
  );
};

export default Chats;
