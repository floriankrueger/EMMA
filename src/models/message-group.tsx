import { TMessage } from './message';
import { TGroupedMessage, makeFirst, makeMiddle } from './grouped-message';

export interface TMessageGroup {
  sender: string;
  messages: TGroupedMessage[];
}

// Append

export function appendToMessageGroups(message: TMessage, toGroups: TMessageGroup[]): TMessageGroup[] {
  var lastGroup = toGroups.length >= 1 ? toGroups[toGroups.length - 1] : undefined;
  if (lastGroup && lastGroup.sender === message.sender) {
    return toGroups.slice(-1).concat(appendToMessageGroup(message, lastGroup));
  }
  return toGroups.concat({
    sender: message.sender,
    messages: [
      {
        message,
        style: 'only'
      }
    ]
  });
}

export function appendToMessageGroup(message: TMessage, group: TMessageGroup): TMessageGroup {
  const newLastGroup: TMessageGroup = {
    messages: group.messages.map((groupedMessage, index) => {
      if (index === 0) {
        return makeFirst(groupedMessage);
      } else {
        return makeMiddle(groupedMessage);
      }
    }),
    ...group
  };

  newLastGroup.messages.push({
    message,
    style: 'last'
  });

  return newLastGroup;
}

// Update

export function updateInMessageGroups(message: TMessage, groups: TMessageGroup[]): TMessageGroup[] {
  return groups.map(group => updateInMessageGroup(message, group));
}

export function updateInMessageGroup(message: TMessage, group: TMessageGroup): TMessageGroup {
  return {
    messages: group.messages.map(groupedMessage => {
      if (groupedMessage.message.mid === message.mid) {
        return {
          message,
          ...groupedMessage
        };
      } else {
        return groupedMessage;
      }
    }),
    ...group
  };
}

// Remove

export function removeFromMessageGroups(message: TMessage, groups: TMessageGroup[]): TMessageGroup[] {
  return groups.map(group => removeFromMessageGroup(message, group)).filter(group => group.messages.length === 0);
}

export function removeFromMessageGroup(message: TMessage, group: TMessageGroup): TMessageGroup {
  const index = group.messages.findIndex(existingMessage => existingMessage.message.mid === message.mid);
  if (index >= 0) {
    const filteredMessages = group.messages.filter(groupedMessage => groupedMessage.message.mid === message.mid);
    return {
      messages: filteredMessages.map((groupedMessage, index) => {
        if (index === 0) {
          return {
            style: filteredMessages.length === 1 ? 'only' : 'first',
            ...groupedMessage
          } as TGroupedMessage;
        }
        if (index === filteredMessages.length - 1) {
          return {
            style: 'last',
            ...groupedMessage
          } as TGroupedMessage;
        }
        return {
          style: 'middle',
          ...groupedMessage
        } as TGroupedMessage;
      }),
      ...group
    } as TMessageGroup;
  }
  return group;
}
