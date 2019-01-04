import { defineMessages } from 'react-intl';

export default defineMessages({
  headline: {
    id: 'dashboard.headline',
    defaultMessage: 'Hello {name}!',
  },
  onlineStatus: {
    id: 'dashboard.onlineStatus',
    defaultMessage: 'Is Online: {value}',
  },
  syncStatus: {
    id: 'dashboard.syncStatus',
    defaultMessage: 'Is Syncing: {value}',
  },
  consumption: {
    id: 'dashboard.consumption',
    defaultMessage: 'Consumption: {value}',
  },
  addButton: {
    id: 'dashboard.addButton',
    defaultMessage: 'Drink 250ml of water',
  },
  resetButton: {
    id: 'dashboard.resetButton',
    defaultMessage: 'Reset daily consumption',
  },
});
