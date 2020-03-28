import React from 'react';
import { observer } from 'mobx-react';
import { useStores } from '../hooks';
import BuddyListItem from './BuddyListItem';
import './BuddyList.css';

const BuddyList = observer(() => {
  let { firebaseStore } = useStores();
  return (
    <div id='buddy-list'>
      {firebaseStore.buddys.map((buddy, index) => {
        return <BuddyListItem key={index} buddy={buddy} />;
      })}
    </div>
  );
});

export default BuddyList;
