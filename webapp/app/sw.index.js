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

const drinkWaterHistory = [];

const syncWaterHistoryUser = (data) => {
  return firebase.database().ref('/users').child(data.uid).child('waterConsumption').transaction(
    (currentConsumption) => (currentConsumption || 0) + data.value
  ).then(() => {
    drinkWaterHistory.splice(drinkWaterHistory.indexOf(data), 1);
  });
};

const syncWaterHistory = () => {
  return Promise.all(drinkWaterHistory.map(syncWaterHistoryUser));
};

const postSyncStatusMessage = (value) => {
  self.clients.matchAll().then((clients) => {
    clients.forEach((client) => {
      client.postMessage({ type: 'syncStatus', value });
    });
  });
};

self.addEventListener('sync', (event) => {
  if (event.tag === 'drinkWaterSync') {
    postSyncStatusMessage(true);

    const syncWaterHistoryPromise = syncWaterHistory()
      .finally(() => postSyncStatusMessage(false));

    event.waitUntil(syncWaterHistoryPromise);
  }
});

self.addEventListener('message', event => {
  if (event.data.type === 'drinkWater') {
    drinkWaterHistory.push(event.data);
  }
});
