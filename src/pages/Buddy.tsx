import React from 'react';
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonToolbar, IonButton, IonRouterLink } from '@ionic/react';
import { RouteComponentProps, withRouter, useHistory } from 'react-router-dom';
import './Buddy.css';
import PageContent from '../components/PageContent';
import EmptyStateContainer from '../components/EmptyStateContainer';
import { useStores } from '../hooks';
import { createChat } from '../firebase';

interface BuddyProps
  extends RouteComponentProps<{
    bid: string;
  }> {}

const Buddy: React.FC<BuddyProps> = ({ match }) => {
  const { firebaseStore } = useStores();
  const user = firebaseStore.user;
  const buddy = firebaseStore.buddy(match.params.bid);
  const history = useHistory();

  const startChatting = () => {
    if (user && buddy) {
      const chat = firebaseStore.chats.find(chat => {
        return chat.bid === buddy.bid;
      });
      if (chat) {
        history.push(`/chats/${chat.cid}`);
      } else {
        createChat(user.uid, buddy.bid).then(docRef => {
          console.log('Chat created', docRef.id);
          history.push(`/chats/${docRef.id}`);
        });
      }
    }
  };

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
        {buddy ? (
          <PageContent>
            <div>
              <div>
                {buddy.givenName} {buddy.familyName}
              </div>
              <div>
                <IonButton size='large' color='primary' onClick={startChatting}>
                  Chat starten
                </IonButton>
              </div>
            </div>
          </PageContent>
        ) : (
          <EmptyStateContainer message='Leider konnten wir den EMMA:Buddy mit dieser ID nicht finden.'>
            Zurück zur{' '}
            <IonRouterLink href='/buddys' color='primary'>
              Übersicht
            </IonRouterLink>
          </EmptyStateContainer>
        )}
      </IonContent>
    </IonPage>
  );
};

export default withRouter(Buddy);
