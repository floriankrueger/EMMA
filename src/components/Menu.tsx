import { IonContent, IonThumbnail, IonItem, IonLabel, IonList, IonMenu, IonMenuToggle, IonFooter } from '@ionic/react';
import React from 'react';
import MenuHeader from './MenuHeader';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import './Menu.css';

interface MenuProps extends RouteComponentProps {}

interface AppPage {
  title: string;
  url: string;
  icon: string;
}

const appPages: AppPage[] = [
  {
    title: 'Aktuelles',
    url: '/aktuelles',
    icon: 'assets/icon_aktuelles.svg'
  },
  {
    title: 'EMMA:Buddys',
    url: '/buddys',
    icon: 'assets/icon_buddys.svg'
  },
  {
    title: 'Chats',
    url: '/chats',
    icon: 'assets/icon_chats.svg'
  },
  {
    title: 'Karte',
    url: '/karte',
    icon: 'assets/icon_karte.svg'
  },
  {
    title: 'F.A.Q.',
    url: '/faq',
    icon: 'assets/icon_faq.svg'
  }
];

interface SecondaryPage {
  title: string;
  url: string;
}

const appSecondaryPages: SecondaryPage[] = [
  {
    title: 'Impressum',
    url: '/impressum'
  }
];

const Menu: React.FunctionComponent<MenuProps> = ({ location }) => {
  return (
    <IonMenu contentId='main' type='overlay'>
      {/* Menu */}
      <IonContent>
        <MenuHeader />
        <IonList id='main-menu'>
          {appPages.map((appPage, index) => {
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

      {/* Footer (Impressum) --> */}
      <IonFooter>
        <IonList id='secondary-menu'>
          {appSecondaryPages.map((secondaryPage, index) => {
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
