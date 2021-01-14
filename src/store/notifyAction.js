import { createAction } from '@reduxjs/toolkit';
import { generateID } from '../commons/method';

export const success = createAction(
  'NOTIFY/SUCCESS',
  ({ title, description }) => {
    return {
      payload: {
        id: generateID,
        title,
        description,
        type: 'success',
      },
    };
  },
);

export const error = createAction('NOTIFY/ERROR', ({ title, description }) => {
  return {
    payload: {
      id: generateID,
      title,
      description,
      type: 'error',
    },
  };
});

export const remove = createAction('NOTIFY/REMOVE', (id) => {
  return {
    payload: {
      id,
    },
  };
});