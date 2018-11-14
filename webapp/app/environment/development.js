import buildConfig from '../utils/buildConfig';

export default buildConfig({
  name: 'development',
  firebaseConfig: {
    apiKey: 'AIzaSyAnRvtO12LDAMsT7faZWV0njJGSL_YkXAM',
    authDomain: 'devtalk-service-worker-app.firebaseapp.com',
    databaseURL: 'https://devtalk-service-worker-app.firebaseio.com',
    projectId: 'devtalk-service-worker-app',
    storageBucket: 'devtalk-service-worker-app.appspot.com',
    messagingSenderId: '382154385012',
  },
});
