import React from 'react';
import { TBuddy } from '../models';
import FirebaseStorageImage from './FirebaseStorageImage';
import { useHistory } from 'react-router-dom';
import './BuddyListItem.css';

interface BuddyListItemProps {
  buddy: TBuddy;
}

const BuddyListItem: React.FC<BuddyListItemProps> = ({ buddy }) => {
  const history = useHistory();

  const pushDetails = () => {
    history.push(`/buddys/${buddy.bid}`);
  };

  return (
    <div className='buddy-card' onClick={pushDetails}>
      <FirebaseStorageImage reference={`buddys/${buddy.bid}/${buddy.avatarReference}`} alt={`Benutzeravatar von ${buddy.givenName} ${buddy.familyName}`} />
      <h1>{buddy.givenName}</h1>
      <small>{buddy.occupation}</small>
    </div>
  );
};

export default BuddyListItem;
