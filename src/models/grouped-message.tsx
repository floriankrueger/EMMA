import { TMessage } from './message';

export interface TGroupedMessage {
  message: TMessage;
  style: string;
}

export function makeFirst(groupedMessage: TGroupedMessage): TGroupedMessage {
  return {
    style: 'first',
    ...groupedMessage
  };
}

export function makeMiddle(groupedMessage: TGroupedMessage): TGroupedMessage {
  return {
    style: 'middle',
    ...groupedMessage
  };
}
