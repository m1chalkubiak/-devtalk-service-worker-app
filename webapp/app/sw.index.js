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
const SYNC_USER_DATA_EVENT_TYPES = ['updateUserDataSync'];
const USER_DATA_EVENT_TYPES = ['updateUserData'];
const ALARM_EVENT_TYPES = ['addAlarm', 'removeAlarm', 'initializeAlarms'];
const SYNC_ALARM_EVENT_TYPES = ['addAlarmSync', 'removeAlarmSync', 'initializeAlarmsSync'];
const drinkWaterHistoryToSync = [];
const alarmListToSync = [];
const userUpdatesToSync = [];

const alarmList = {
  uid: null,
  timeout: null,
  items: [],
};

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
        drinkWaterHistoryToSync.splice(drinkWaterHistoryToSync.indexOf(data), 1);
      });
  }

  if (data.type.includes('addAlarm')) {
    return firebase.database()
      .ref('/users').child(data.uid).child('alarms')
      .update({ [data.timeData.id]: data.timeData.time })
      .then(() => {
        alarmListToSync.splice(alarmListToSync.indexOf(data), 1);
      });
  }

  if (data.type.includes('removeAlarm')) {
    return firebase.database()
      .ref('/users').child(data.uid).child('alarms')
      .update({ [data.id]: null })
      .then(() => {
        alarmListToSync.splice(alarmListToSync.indexOf(data), 1);
      });
  }

  if (USER_DATA_EVENT_TYPES.indexOf(data.type) > -1) {
    return firebase.database()
      .ref('/users').child(data.uid).update(
        data.user
      ).then(() => {
        alarmListToSync.splice(alarmListToSync.indexOf(data), 1);
      });
  }

  return null;
};

const syncWaterHistory = () => Promise.all(drinkWaterHistoryToSync.map(syncUserData));

const syncAlarmList = () => Promise.all(alarmListToSync.map(syncUserData));

const syncUserUpdates = () => Promise.all(userUpdatesToSync.map(syncUserData));

const scheduleAlarmListLoop = () => {
  if (alarmList.timeout) {
    clearTimeout(alarmList.timeout);
  }

  const currentDate = new Date();
  const hour = currentDate.getHours();
  const minutes = currentDate.getMinutes();

  self.registration.getNotifications().then((notifications) => {
    notifications.forEach((notification) => notification.close());
  });

  if (alarmList.items.find((alarm) => alarm.time === hour + ':' + minutes)) {
    self.registration.showNotification('I\'ts ' + hour + ':' + minutes + '!', {
      body: 'Time to drink some water',
      icon: 'https://cdn3.iconfinder.com/data/icons/summer/512/water-glass-512.png',
    });
  }

  alarmList.timeout = setTimeout(scheduleAlarmListLoop, 1000 * 60);
};

const initializeAlarmList = () => {
  return firebase.database()
    .ref('/users').child(alarmList.uid).child('alarms')
    .once('value')
    .then((data) => {
      const alarmData = data.val();
      Object.keys(alarmData).forEach((key) => {
        alarmList.items.push({ id: key, time: alarmData[key] });
      });

      scheduleAlarmListLoop();
    });
};

const getSyncFunction = (event) => {
  if (SYNC_WATER_EVENT_TYPES.indexOf(event.tag) > -1) {
    return syncWaterHistory;
  }

  if (SYNC_ALARM_EVENT_TYPES.indexOf(event.tag) > -1 && event.tag !== 'initializeAlarmsSync') {
    return syncAlarmList;
  }

  if (SYNC_ALARM_EVENT_TYPES.indexOf(event.tag) > -1 && event.tag === 'initializeAlarmsSync') {
    return initializeAlarmList;
  }

  if (SYNC_USER_DATA_EVENT_TYPES.indexOf(event.tag) > -1) {
    return syncUserUpdates;
  }

  return null;
};

const postSyncStatusMessage = (value) => {
  self.clients.matchAll().then((clients) => {
    clients.forEach((client) => {
      client.postMessage({ type: 'syncStatus', value });
    });
  });
};

const updateLocalAlarmList = (event) => {
  if (event.data.type === 'initializeAlarms') {
    alarmList.uid = event.data.uid;
  }
  if (event.data.type === 'addAlarm') {
    alarmList.items.push(event.data.timeData);
  }
  if (event.data.type === 'removeAlarm') {
    alarmList.items.splice(alarmList.items.findIndex((alarm) => alarm.id === event.data.id), 1);
  }
};

// Activate worker immediately
self.addEventListener('install', (event) => event.waitUntil(self.skipWaiting()));

// Become available to all pages
self.addEventListener('activate', (event) => {
  scheduleAlarmListLoop();
  event.waitUntil(self.clients.claim());
});

self.addEventListener('sync', (event) => {
  const syncFunction = getSyncFunction(event);
  if (syncFunction) {
    postSyncStatusMessage(true);

    const syncPromise = syncFunction(event)
      .finally(() => postSyncStatusMessage(false));

    event.waitUntil(syncPromise);
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
    drinkWaterHistoryToSync.push(event.data);
  }
  if (ALARM_EVENT_TYPES.indexOf(event.data.type) > -1) {
    alarmListToSync.push(event.data);
    updateLocalAlarmList(event);
  }
  if (USER_DATA_EVENT_TYPES.indexOf(event.data.type) > -1) {
    userUpdatesToSync.push(event.data);
  }
});
