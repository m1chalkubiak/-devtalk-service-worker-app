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

const WATER_EVENT_TYPES = ['drinkWater', 'resetWaterConsumption'];
const SYNC_WATER_EVENT_TYPES = ['drinkWaterSync', 'resetWaterConsumptionSync'];
const userUpdates = [];
const USER_DATA_EVENT_TYPES = ['updateUserData'];
const SYNC_USER_DATA_EVENT_TYPES = ['updateUserDataSync'];
const drinkWaterHistory = [];
const ALARM_EVENT_TYPES = ['addAlarm', 'removeAlarm'];
const SYNC_ALARM_EVENT_TYPES = ['addAlarmSync', 'removeAlarmSync'];
const alarmList = [];

const syncUserData = (data) => {
  const BINDED_FUNCTIONS_MAP = {
    'resetWaterConsumption': () => data.value,
    'drinkWater': (value) => (value || 0) + data.value,
  };

  if (WATER_EVENT_TYPES.indexOf(data.type) > -1) {
    return firebase.database()
      .ref('/users').child(data.uid).child('waterConsumption').transaction(
        BINDED_FUNCTIONS_MAP[data.type]
      ).then(() => {
        drinkWaterHistory.splice(drinkWaterHistory.indexOf(data), 1);
      });
  }

  if (data.type.includes('addAlarm')) {
    return firebase.database()
      .ref('/users').child(data.uid).child('alarms')
      .update({ [data.timeData.id]: data.timeData.time })
      .then(() => {
        alarmList.splice(alarmList.indexOf(data), 1);
      });
  }

  if (data.type.includes('removeAlarm')) {
    return firebase.database()
      .ref('/users').child(data.uid).child('alarms')
      .update({ [data.id]: null })
      .then(() => {
        alarmList.splice(alarmList.indexOf(data), 1);
      });
  }

  if (USER_DATA_EVENT_TYPES.indexOf(data.type) > -1) {
    return firebase.database()
      .ref('/users').child(data.uid).update(
        data.user
      ).then(() => {
        userUpdates.splice(userUpdates.indexOf(data), 1);
      });
  }

  return null;
};

const syncWaterHistory = () => Promise.all(drinkWaterHistory.map(syncUserData));

const syncAlarmList = () => Promise.all(alarmList.map(syncUserData));

const syncUserUpdates = () => Promise.all(userUpdates.map(syncUserData));

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
  if (SYNC_WATER_EVENT_TYPES.indexOf(event.tag) > -1) {
    postSyncStatusMessage(true);

    const syncWaterHistoryPromise = syncWaterHistory()
      .finally(() => postSyncStatusMessage(false));

    event.waitUntil(syncWaterHistoryPromise);
  }

  if (SYNC_ALARM_EVENT_TYPES.indexOf(event.tag) > -1) {
    postSyncStatusMessage(true);

    const syncAlarmListPromise = syncAlarmList()
      .finally(() => postSyncStatusMessage(false));

    event.waitUntil(syncAlarmListPromise);
  }

  if (SYNC_USER_DATA_EVENT_TYPES.indexOf(event.tag) > -1) {
    postSyncStatusMessage(true);

    const syncUserUpdatesPromise = syncUserUpdates()
      .finally(() => postSyncStatusMessage(false));

    event.waitUntil(syncUserUpdatesPromise);
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

      return fetch(request)
        .then(resp => {
          if (request.url.endsWith('.png')) {
            return caches.open('v1').then(cache => {
              cache.put(request, resp.clone());
              return resp;
            });
          } else { return resp; };
        });
    });
  event.respondWith(response);
});

self.addEventListener('message', event => {
  if (WATER_EVENT_TYPES.indexOf(event.data.type) > -1) {
    drinkWaterHistory.push(event.data);
  }
  if (ALARM_EVENT_TYPES.indexOf(event.data.type) > -1) {
    alarmList.push(event.data);
  }
  if (USER_DATA_EVENT_TYPES.indexOf(event.data.type) > -1) {
    userUpdates.push(event.data);
  }
});
