import { Maybe } from 'liftjs';

export const validate = (value) => {
  if(!value) {
    throw new Error('string must not be null or empty');
  }
};