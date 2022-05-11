// Import the functions you need from the SDKs you need
import { initializeApp, firebase } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
    apiKey: "AIzaSyBvVh0J1boIFa2SN5dW7cV4Q0j79rw1_Lw",
    authDomain: "etsy-65478.firebaseapp.com",
    projectId: "etsy-65478",
    storageBucket: "gs://etsy-65478.appspot.com",
    messagingSenderId: "671549967186",
    appId: "1:671549967186:web:2b0de8cf371c9175aac88b",
    measurementId: "G-WMH0EVTFHH"
  };

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const storage_bucket = getStorage(app);
// firebase.initializeApp(firebaseConfig);
// const storage_bucket = firebase.storage();
// export {storage_bucket, firebase as default}
