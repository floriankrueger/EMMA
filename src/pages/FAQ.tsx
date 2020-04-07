import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonToolbar } from '@ionic/react';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import './FAQ.css';
import PageHeader from '../components/PageHeader';
import PageContent from '../components/PageContent';
import { useStores } from '../hooks/use-stores';
import { useFetchBlogEntries } from '../hooks/use-fetch-blog-entries';
import { observer } from 'mobx-react';
import { HashLink } from 'react-router-hash-link';

const FAQ = observer(() => {
  const { faqStore } = useStores();
  useFetchBlogEntries();

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
        <PageHeader assetName='faq' title='F.A.Q.' />
        <PageContent>
          <p className='lead'>Als Zielgruppe wenden wir uns an Eltern und Erziehungsberechtigte, die niederschwelligen Beratungsbedarf haben.</p>
          <p>
            Hier versuchen wir, die wichtigsten Fragen zu beantworten. Sollte noch etwas offen sein, kontaktiert uns unter{' '}
            <a href='mailto:emma.hackathon@gmail.com'>emma.hackathon@gmail.com</a>
          </p>
          <p className='callout callout-error'>
            Hier entsteht gerade etwas Großes. Schaut regelmäßig vorbei. Wir ergänzen die eingehenden Fragen kontinuierlich.
          </p>
          <h5>Inhalt</h5>
          <ul className='faq-link-list' id='faq-index'>
            {faqStore.links.map((linkData, index) => {
              return (
                <li key={index}>
                  <span>{index + 1}. </span>
                  <HashLink to={`#faq-${linkData.slug}`}>{linkData.title}</HashLink>
                </li>
              );
            })}
          </ul>
          {faqStore.entries.map((entry, index) => {
            return (
              <div className='faq-entry' key={index}>
                <h6>
                  {index + 1}. {entry.question}
                  <HashLink id={`faq-${entry.slug}`} className='to-top' to='#page-header'>
                    nach oben
                  </HashLink>
                </h6>
                <ReactMarkdown source={entry.answer} />
              </div>
            );
          })}
        </PageContent>
      </IonContent>
    </IonPage>
  );
});

export default FAQ;
