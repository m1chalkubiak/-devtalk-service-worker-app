importScripts('http://www.gstatic.com/firebasejs/5.5.3/firebase-app.js');
importScripts('http://www.gstatic.com/firebasejs/5.5.3/firebase-database.js');

firebase.initializeApp({
  apiKey: 'AIzaSyAnRvtO12LDAMsT7faZWV0njJGSL_YkXAM',
  authDomain: 'devtalk-service-worker-app.firebaseapp.com',
  databaseURL: 'https://devtalk-service-worker-app.firebaseio.com',
  projectId: 'devtalk-service-worker-app',
  storageBucket: 'devtalk-service-worker-app.appspot.com',
  messagingSenderId: '382154385012',
});

const EVENT_TYPES = ['drinkWater', 'resetWaterConsumption'];
const SYNC_EVENT_TYPES = ['drinkWaterSync', 'resetWaterConsumptionSync'];
const drinkWaterHistory = [];

const syncWaterHistoryUser = (data) => {
  const BINDED_FUNCTIONS_MAP = {
    'resetWaterConsumption': () => data.value,
    'drinkWater': (value) => (value || 0) + data.value,
  };

  if (EVENT_TYPES.indexOf(data.type) > -1) {
    return firebase.database()
      .ref('/users').child(data.uid).child('waterConsumption').transaction(
        BINDED_FUNCTIONS_MAP[data.type]
      ).then(() => {
        drinkWaterHistory.splice(drinkWaterHistory.indexOf(data), 1);
      });
  }

  return null;
};

const syncWaterHistory = () => Promise.all(drinkWaterHistory.map(syncWaterHistoryUser));

const postSyncStatusMessage = (value) => {
  self.clients.matchAll().then((clients) => {
    clients.forEach((client) => {
      client.postMessage({ type: 'syncStatus', value });
    });
  });
};

// Activate worker immediately
self.addEventListener('install', (event) => event.waitUntil(self.skipWaiting()));

// Become available to all pages
self.addEventListener('activate', (event) => event.waitUntil(self.clients.claim()));

self.addEventListener('sync', (event) => {
  if (SYNC_EVENT_TYPES.indexOf(event.tag) > -1) {
    postSyncStatusMessage(true);

    const syncWaterHistoryPromise = syncWaterHistory()
      .finally(() => postSyncStatusMessage(false));

    event.waitUntil(syncWaterHistoryPromise);
  }
});

self.addEventListener('fetch', (event) => {
  const { request } = event;

  const response = caches
    .match(request)
    .then((response) => {
      if (response) {
        return response;
      }

      return fetch(request);
    })

  event.respondWith(response);
})

self.addEventListener('message', event => {
  if (EVENT_TYPES.indexOf(event.data.type) > -1) {
    drinkWaterHistory.push(event.data);
  }
});
