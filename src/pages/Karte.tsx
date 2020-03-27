import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonToolbar } from '@ionic/react';
import React from 'react';
import { observer } from 'mobx-react';
import './Karte.css';
import Marker from '../components/Marker';
import GoogleMapReact from 'google-map-react';
import { useStores } from '../hooks/use-stores';

const Karte = observer(() => {
  const { markerStore } = useStores();

  const selectMarker = (id: string) => {
    console.log('id', id);
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
        <GoogleMapReact bootstrapURLKeys={{ key: process.env.REACT_APP_MAPS_API_KEY }} defaultCenter={{ lat: 51.9625, lng: 7.6256 }} defaultZoom={12}>
          {markerStore.institutionLocations.map((location, index) => {
            return <Marker key={index} lat={location.lat} lng={location.lng} color={location.color} id={location.id} onSelect={selectMarker} />;
          })}
        </GoogleMapReact>
      </IonContent>
    </IonPage>
  );
});

export default Karte;
