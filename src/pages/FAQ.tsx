import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonToolbar } from '@ionic/react';
import React, { useRef } from 'react';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

import { useTypedSelector, sortedFAQEntries, sortedFAQLinks } from '../store';
import { useFetchFAQEntries } from '../hooks';
import PageHeader from '../components/PageHeader';
import PageContent from '../components/PageContent';

import './FAQ.css';

type References = { [key: string]: React.RefObject<HTMLDivElement> };

const FAQ: React.FC = () => {
  useFetchFAQEntries();
  const [entries, links] = useTypedSelector((state) => [sortedFAQEntries(state.faq), sortedFAQLinks(state.faq)]);
  const topRef = useRef<HTMLDivElement>(null);

  const refs: References = links.reduce<References>((obj, link) => {
    obj[link.slug] = React.createRef();
    return obj;
  }, {});

  const scrollToTop = () => {
    topRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  const scrollToSlug = (slug: string) => {
    refs[slug].current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
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
        <div ref={topRef} />
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
            {links.map((linkData, index) => {
              return (
                <li key={index}>
                  <span>{index + 1}. </span>
                  <button type='button' onClick={() => scrollToSlug(`${linkData.slug}`)}>
                    {linkData.title}
                  </button>
                </li>
              );
            })}
          </ul>
          {entries.map((entry, index) => {
            return (
              <div className='faq-entry' key={index} ref={refs[entry.slug]}>
                <h6>
                  {index + 1}. {entry.question}
                  <button type='button' onClick={() => scrollToTop()} id={`faq-${entry.slug}`} className='to-top'>
                    nach oben
                  </button>
                </h6>
                {documentToReactComponents(entry.answer)}
              </div>
            );
          })}
        </PageContent>
      </IonContent>
    </IonPage>
  );
};

export default FAQ;
