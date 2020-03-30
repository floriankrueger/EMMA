import { TMessage } from './message';

export interface TMessageGroup {
  sender: string;
  messages: TMessage[];
}

// Append

export function appendToMessageGroups(message: TMessage, toGroups: TMessageGroup[]): TMessageGroup[] {
  var lastGroup = toGroups.length >= 1 ? toGroups[toGroups.length - 1] : undefined;
  if (lastGroup && lastGroup.sender === message.sender) {
    return toGroups.map((group, index) => {
      if (index === toGroups.length - 1) {
        return appendToMessageGroup(message, lastGroup!);
      } else {
        return group;
      }
    });
  }
  return toGroups.concat({
    sender: message.sender,
    messages: [message]
  });
}

export function appendToMessageGroup(message: TMessage, group: TMessageGroup): TMessageGroup {
  return {
    sender: group.sender,
    messages: group.messages.concat([message])
  };
}

// Update

export function updateInMessageGroups(message: TMessage, groups: TMessageGroup[]): TMessageGroup[] {
  return groups.map(group => updateInMessageGroup(message, group));
}

export function updateInMessageGroup(message: TMessage, group: TMessageGroup): TMessageGroup {
  return {
    messages: group.messages.map(groupedMessage => {
      if (groupedMessage.mid === message.mid) {
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
  const index = group.messages.findIndex(existingMessage => existingMessage.mid === message.mid);
  if (index >= 0) {
    const filteredMessages = group.messages.filter(groupedMessage => groupedMessage.mid === message.mid);
    return {
      messages: filteredMessages,
      ...group
    };
  }
  return group;
}
