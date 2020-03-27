import { action, observable, computed } from 'mobx';
import { TFAQEntry, TFAQLinkData } from '../models';

export class FAQStore {
  @observable
  entries: TFAQEntry[] = dummyFAQEntries;

  @action
  set(entries: TFAQEntry[]) {
    this.entries = entries;
  }

  @computed
  get links(): TFAQLinkData[] {
    return this.entries.map(makeLink);
  }
}

// Helpers

const makeLink = (entry: TFAQEntry): TFAQLinkData => {
  return {
    slug: entry.slug,
    title: entry.question
  };
};

// Dummy Data

const dummyFAQEntries = [
  {
    slug: 'was-ist-das-ziel',
    question: 'Was ist das Ziel eures Projekts?',
    answer: `Es soll aufgezeigt werden, wie eine digitale Schnittstelle aussehen und funktionieren könnte, die 
im Bereich der Kinder- und Jugendhilfe niederschwellig eine kurzfristige Beratung durch professionelle Ansprechpersonen 
als Überbrückung ermöglicht.\n\n
Wesentliche Elemente sind dabei: Tipps für den Alltag, die konkrete Unterstützung durch eine Chatfunktion sowie die 
lokale Orientierung mittels Karte, auf der relevante Institutionen und Einrichtungen verzeichnet sind.\n\n
Es ist nicht das Ziel, Beratung vor Ort bzw.langfristige Begleitung zu ersetzen oder die Kinder- und Jugendhilfe 
vollständig zu digitalisieren.\n\n
Zielgruppen sind Eltern und Erziehungsberechtigte.`
  },
  {
    slug: 'ich-komme-woanders-her',
    question: 'Ich komme nicht aus dem Raum Münster oder Osnabrück. Kann ich trotzdem als Buddy teilnehmen?',
    answer: `Gar kein Problem. Wir freuen uns trotzdem über deine Anmeldung als Buddy. In den nächsten Tagen und Wochen wollen wir die Reichweite immer weiter ausbauen und dafür brauchen wir deine Hilfe.`
  },
  {
    slug: 'wer-kann-mitmachen',
    question: 'Wer kann mitmachen? Welche Erfahrungen und Kompetenzen sollte ich haben?',
    answer: `Wir suchen Buddys, die in professionellen pädagogischen Feldern arbeiten und ihre Kompetenzen im Bereich Kurz-Beratung einbringen möchten. Pädagogische Felder sind z.B. Schule, Kindertageseinrichtung, Erziehungsberatungsstellen, aus dem Bereich Kinder- und Jugendhilfe usw.`
  },
  {
    slug: 'was-passiert-nach-der-anmeldung',
    question: 'Was passiert, nachdem ich mich bei euch angemeldet habe?',
    answer: `Zunächst bekommst du von uns einen Link zu einem Formular, in welches du die benötigten Informationen zu dir als Berater:in einträgst. Es handelt sich dabei um Informationen, die wir später in der Web-Beratung öffentlich anzeigen wollen. Sonntag vor- und nachmittag soll der Test der Webfunktion stattfinden.\n\nWir möchten gern bis 17 Uhr unseren Prototypen fertig stellen, um ihn der Welt präsentieren zu können. Dafür heißt es von eurer Seite: testen, testen, testen - und konstruktives Feedback geben.`
  }
] as TFAQEntry[];
