import { defineMessages } from 'react-intl';

export default defineMessages({
  nameField: {
    id: 'profileForm.nameField',
    defaultMessage: 'Name',
  },
  namePresenceError: {
    id: 'profileForm.nameField.error.presence',
    defaultMessage: 'You should have some name.',
  },
  ageField: {
    id: 'profileForm.ageField',
    defaultMessage: 'Age',
  },
  ageFieldEndAdornment: {
    id: 'profileForm.ageField.endAdornment',
    defaultMessage: 'Years',
  },
  agePresenceError: {
    id: 'profileForm.ageField.error.presence',
    defaultMessage: 'Please, give us Your age.',
  },
  ageOnlyIntegerError: {
    id: 'profileForm.ageField.error.integer',
    defaultMessage: 'Please, give us Your age.',
  },
  ageToOldError: {
    id: 'profileForm.ageField.error.lessThanOrEqual',
    defaultMessage: 'You probably too old to be alive.',
  },
  ageToYoungError: {
    id: 'profileForm.ageField.error.greaterThanOrEqualTo',
    defaultMessage: 'Are you planning your life before birth?',
  },
  weightField: {
    id: 'profileForm.weightField',
    defaultMessage: 'Weight',
  },
  weightFieldEndAdornment: {
    id: 'profileForm.weightField.endAdornment',
    defaultMessage: 'Kg',
  },
  weightPresenceError: {
    id: 'profileForm.weightField.error.presence',
    defaultMessage: 'Please, give us Your weight.',
  },
  weightOnlyIntegerError: {
    id: 'profileForm.weightField.error.integer',
    defaultMessage: 'Please, give us Your weight.',
  },
  weightToLargeError: {
    id: 'profileForm.weightField.error.lessThanOrEqual',
    defaultMessage: 'Your weight is too big.',
  },
  weightToSmallError: {
    id: 'profileForm.weightField.error.greaterThanOrEqualTo',
    defaultMessage: 'You are lighter than a feather.',
  },
  notificationField: {
    id: 'profileForm.notificationField',
    defaultMessage: 'Show notifications',
  },
  submit: {
    id: 'profileForm.submit',
    defaultMessage: 'Save',
  },
});
