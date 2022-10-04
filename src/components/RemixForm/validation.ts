import { emailPattern } from '@/helpers/constants';

export const descriptionFieldValidation = {
  required: 'This field is required',
  maxLength: {
    value: 500,
    message: 'Maximum 500 characters'
  }
};

export const emailFieldValidation = {
  required: 'The field is required',
  pattern: {
    value: emailPattern,
    message: 'Invalid Email'
  }
};

export const nameFieldValidation = {
  required: 'The field is required',
  minLength: {
    value: 3,
    message: 'Minimum 3 characters long'
  },
  maxLength: {
    value: 50,
    message: 'Maximum 50 characters long'
  }
};

export const priceFieldValidation = {
  valueAsNumber: true,
  required: 'This field is required',
  max: {
    value: 1000,
    message: 'Maximum value is 1000'
  }
};

export const trackLengthFieldValidation = {
  valueAsNumber: true,
  required: 'This field is required',
  max: {
    value: 300,
    message: 'Maximum value is 300'
  }
};
