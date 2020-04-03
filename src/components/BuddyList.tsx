import React from 'react';
import { IonSpinner } from '@ionic/react';

import { useTypedSelector } from '../store/rootReducer';
import { sortedBuddys } from '../store/buddy/reducers';
import EmptyStateContainer from './EmptyStateContainer';
import BuddyListItem from './BuddyListItem';

import './BuddyList.css';

const BuddyList: React.FC = () => {
  const [buddys, didFetchBuddys] = useTypedSelector(state => [sortedBuddys(state.buddy), state.buddy.didFetchBuddys]);

  if (buddys.length === 0) {
    if (didFetchBuddys) {
      return <EmptyStateContainer message='Zur Zeit sind keine Buddys verfügbar.'>Bitte komm später noch einmal wieder.</EmptyStateContainer>;
    } else {
      return (
        <EmptyStateContainer message='Bitte warten.'>
          <IonSpinner />
        </EmptyStateContainer>
      );
    }
  }
  return (
    <div id='buddy-list'>
      {buddys.map(buddy => {
        return <BuddyListItem key={buddy.bid} buddy={buddy} />;
      })}
    </div>
  );
};

export default BuddyList;
