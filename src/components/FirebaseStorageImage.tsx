import React from 'react';
import { IonAvatar } from '@ionic/react';
import { useStorageDownloadUrl } from '../hooks';

interface FirebaseStorageImageProps {
  reference: string;
  alt: string;
}

const FirebaseStorageImage: React.FC<FirebaseStorageImageProps> = ({ reference, alt }) => {
  const src = useStorageDownloadUrl(reference);
  return (
    <IonAvatar>
      <img className='firebase-storage-image' src={src} alt={alt} />
    </IonAvatar>
  );
};

export default FirebaseStorageImage;
