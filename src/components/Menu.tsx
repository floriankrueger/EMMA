import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { IonContent, IonThumbnail, IonItem, IonLabel, IonList, IonMenu, IonMenuToggle, IonFooter } from '@ionic/react';

import { useTypedSelector } from '../store/rootReducer';
import MenuHeader from './MenuHeader';

import './Menu.css';

interface MenuProps extends RouteComponentProps {}

interface AppPage {
  title: string;
  url: string;
  icon: string;
  wellKnownUsersOnly: boolean;
}

const appPages: AppPage[] = [
  {
    title: 'Aktuelles',
    url: '/aktuelles',
    icon: 'assets/icon_aktuelles.svg',
    wellKnownUsersOnly: false
  },
  {
    title: 'EMMA:Buddys',
    url: '/buddys',
    icon: 'assets/icon_buddys.svg',
    wellKnownUsersOnly: false
  },
  {
    title: 'Chats',
    url: '/chats',
    icon: 'assets/icon_chats.svg',
    wellKnownUsersOnly: false
  },
  {
    title: 'Karte',
    url: '/karte',
    icon: 'assets/icon_karte.svg',
    wellKnownUsersOnly: false
  },
  {
    title: 'F.A.Q.',
    url: '/faq',
    icon: 'assets/icon_faq.svg',
    wellKnownUsersOnly: false
  }
];

interface SecondaryPage {
  title: string;
  url: string;
  wellKnownUsersOnly: boolean;
}

const appSecondaryPages: SecondaryPage[] = [
  {
    title: 'Abmelden',
    url: '/anmeldung',
    wellKnownUsersOnly: true
  },
  {
    title: 'Impressum',
    url: '/impressum',
    wellKnownUsersOnly: false
  }
];

const Menu: React.FunctionComponent<MenuProps> = ({ location }) => {
  const isWellKnown = useTypedSelector(state => state.authentication.user?.isWellKnown || false);

  return (
    <IonMenu contentId='main' type='overlay'>
      {/* Menu */}
      <IonContent>
        <MenuHeader />
        <IonList id='main-menu'>
          {appPages.map((appPage, index) => {
            if (appPage.wellKnownUsersOnly && !isWellKnown) {
              return null;
            }
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem
                  className={location.pathname.toLowerCase().startsWith(appPage.url.toLowerCase()) ? 'selected' : ''}
                  routerLink={appPage.url}
                  routerDirection='none'
                  lines='none'
                  detail={false}
                >
                  <IonThumbnail className='menu-icon' slot='start'>
                    <img src={appPage.icon} alt='' />
                  </IonThumbnail>
                  <IonLabel className='menu-label'>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>
      </IonContent>

      {/* Footer (Abmelden, Impressum) --> */}
      <IonFooter>
        <IonList id='secondary-menu'>
          {appSecondaryPages.map((secondaryPage, index) => {
            if (secondaryPage.wellKnownUsersOnly && !isWellKnown) {
              return null;
            }
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem
                  className={location.pathname.toLowerCase().startsWith(secondaryPage.url.toLowerCase()) ? 'selected' : ''}
                  routerLink={secondaryPage.url}
                  routerDirection='none'
                  lines='none'
                  detail={false}
                >
                  <IonLabel className='menu-label'>{secondaryPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>
      </IonFooter>
    </IonMenu>
  );
};

export default withRouter(Menu);
