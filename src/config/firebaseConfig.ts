import firebase from "firebase";
var firebaseConfig = {
  apiKey: "AIzaSyDFZqx9-AKktnMWc5kPLv2HVJ3wtOylYro",
  authDomain: "azonfunction.firebaseapp.com",
  projectId: "azonfunction",
  storageBucket: "azonfunction.appspot.com",
  messagingSenderId: "238842837016",
  appId: "1:238842837016:web:f498b2d40c15d32973ab6d",
  measurementId: "G-7CP18VGF5W",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebase;
/* firebase.auth().onAuthStateChanged(async (user) => {
  if (user) {
    const db = firebase.firestore();
    db.collection("users")
      .get()
      .then(async (data) => {
        data.forEach((doc) => {
          console.log(doc.id, "=>", doc.data());
        });
      });
  }
}); */

//users/${users.uid}/bills
