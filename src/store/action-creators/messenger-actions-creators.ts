import { Dispatch } from 'redux';

import { StatusMessageType } from '../reducers/messengerReducer/messengerReducer';
import { IChatMessage } from '../../shared/types/chat.types';
import { messengerAPI } from '../../services/messanger.service';
import { MessengerActionType } from '../action-types';

export const messengerActions = {
  messagesReceived: (messages: IChatMessage[]) => ({
    type: MessengerActionType.MESSAGES_RECEIVED,
    payload: messages,
  }),
  statusChanged: (status: StatusMessageType) => ({
    type: MessengerActionType.MESSAGES_STATUS_CHANGED,
    payload: status,
  }),
};

let newMessageHandler: ((messages: IChatMessage[]) => void) | null = null;
const newMessageHandlerCreator = (dispatch: Dispatch) => {
  if (newMessageHandler === null) {
    newMessageHandler = (messages: IChatMessage[]) => {
      dispatch(messengerActions.messagesReceived(messages));
    };
  }
  return newMessageHandler;
};

let statusChangedHandler: ((messages: StatusMessageType) => void) | null = null;
const statusChangedHandlerCreator = (dispatch: Dispatch) => {
  if (statusChangedHandler === null) {
    statusChangedHandler = status => {
      dispatch(messengerActions.statusChanged(status));
    };
  }
  return statusChangedHandler;
};

export const startMessagesListening = () => {
  return async (dispatch: Dispatch) => {
    messengerAPI.start();
    messengerAPI.subscribe('messages-received', newMessageHandlerCreator(dispatch));
    messengerAPI.subscribe('status-changed', statusChangedHandlerCreator(dispatch));
  };
};

export const stopMessagesListening = () => {
  return async (dispatch: Dispatch) => {
    messengerAPI.unsubscribe('messages-received', newMessageHandlerCreator(dispatch));
    messengerAPI.unsubscribe('status-changed', statusChangedHandlerCreator(dispatch));
    messengerAPI.stop();
  };
};

export const sendMessage = (message: string) => {
  return async () => {
    messengerAPI.sendMessage(message);
  };
};
