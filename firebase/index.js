import * as firebase from "firebase/app";
import configKey from "../config/firebase";
// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";


export default ()=>{
  try {
    const config = {
      apiKey: configKey.apiKey,
      authDomain: configKey.authDomain,
      databaseURL: configKey.databaseURL,
      projectId: configKey.projectId,
    };
    firebase.initializeApp(config);

  } catch (err) {
    if (!/already exists/.test(err.message)) {
      console.error('Firebase initialization error', err.stack);
    }
  }
  return firebase
}