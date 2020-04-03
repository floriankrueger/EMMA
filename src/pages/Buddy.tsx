import React from 'react';
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonToolbar, IonButton, IonRouterLink } from '@ionic/react';
import { RouteComponentProps, withRouter, useHistory } from 'react-router-dom';

import { useTypedSelector } from '../store/rootReducer';
import { createChat } from '../firebase';

import PageContent from '../components/PageContent';
import EmptyStateContainer from '../components/EmptyStateContainer';

import './Buddy.css';

interface BuddyProps
  extends RouteComponentProps<{
    bid: string;
  }> {}

const Buddy: React.FC<BuddyProps> = ({ match }) => {
  const [user, buddy] = useTypedSelector(state => [state.authentication.user, state.buddy.buddys.find(b => b.bid === match.params.bid)]);
  const conversation = useTypedSelector(state => state.conversation.conversations.find(c => c.bid === buddy?.bid));
  const history = useHistory();

  const startChatting = () => {
    if (user && buddy) {
      if (conversation) {
        history.push(`/chats/${conversation.cid}`);
      } else {
        createChat(user.uid, buddy.bid).then(docRef => {
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
