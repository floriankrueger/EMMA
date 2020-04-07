import * as contentful from 'contentful';

import { TFAQEntry } from '../models';

type ContentfulFAQEntry = { [key: string]: any };

const getFAQEntries = (client: contentful.ContentfulClientApi): Promise<TFAQEntry[]> => {
  return client
    .getEntries({
      content_type: 'frequentlyAskedQuestion',
    })
    .then((entries) => {
      const faqEntries = entries.items.reduce<TFAQEntry[]>((list, entry) => {
        const fields = entry.fields as ContentfulFAQEntry;
        const newEntry = {
          sorting: fields.sorting,
          slug: fields.slug,
          question: fields.question,
          answer: fields.answer,
        } as TFAQEntry;
        return [...list, newEntry];
      }, []);
      return new Promise((resolve) => resolve(faqEntries));
    });
};

export { getFAQEntries };
