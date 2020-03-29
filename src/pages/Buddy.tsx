import React from 'react';
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonToolbar } from '@ionic/react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import './Buddy.css';
import PageContent from '../components/PageContent';
import { useStores } from '../hooks';

interface BuddyProps
  extends RouteComponentProps<{
    bid: string;
  }> {}

const Buddy: React.FC<BuddyProps> = ({ match }) => {
  const { firebaseStore } = useStores();
  const buddy = firebaseStore.buddy(match.params.bid);
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
        <PageContent>
          {buddy ? (
            <div>
              {buddy.givenName} {buddy.familyName}
            </div>
          ) : (
            <div>
              <p>Leider konnten wir den EMMA:Buddy mit dieser ID nicht finden.</p>
              <a href='buddys/'>Zurück zur Übersicht</a>
            </div>
          )}
        </PageContent>
      </IonContent>
    </IonPage>
  );
};

export default withRouter(Buddy);
