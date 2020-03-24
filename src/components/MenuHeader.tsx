import React from 'react';
import { IonContent, IonImg } from '@ionic/react';
import './MenuHeader.css';

const MenuHeader: React.FC = () => {
  return (
    <IonContent id='menu-header'>
      <IonImg src='assets/menuLogo.png' alt='' />
    </IonContent>
  );
};

export default MenuHeader;
