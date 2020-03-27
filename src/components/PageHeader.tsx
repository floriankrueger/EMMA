import React from 'react';
import './PageHeader.css';
import { IonGrid, IonRow, IonCol } from '@ionic/react';

interface PageHeaderProps {
  assetName: string;
  title: string;
  copy?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ assetName, title, copy }) => {
  return (
    <IonGrid id='page-header'>
      <IonRow>
        <IonCol size-xs='0' size-md='2'></IonCol>
        <IonCol className='header-col'>
          <img src={`assets/icon_${assetName}.svg`} alt='' />
          <h3>{title}</h3>
          <hr />
          {copy ? <p className='lead'>{copy}</p> : null}
        </IonCol>
        <IonCol size-xs='0' size-md='2'></IonCol>
      </IonRow>
    </IonGrid>
  );
};

export default PageHeader;
