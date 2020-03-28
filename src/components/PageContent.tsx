import React from 'react';
import './PageContent.css';
import { IonGrid, IonRow, IonCol } from '@ionic/react';

const PageContent: React.FC = ({ children }) => {
  return (
    <IonGrid id='page-content'>
      <IonRow>
        <IonCol size-xs='0' size-md='2'></IonCol>
        <IonCol>{children}</IonCol>
        <IonCol size-xs='0' size-md='2'></IonCol>
      </IonRow>
    </IonGrid>
  );
};

export default PageContent;
