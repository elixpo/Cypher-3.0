const { initializeApp } = require('firebase/app');
const { getFirestore, doc, setDoc, getDoc } = require('firebase/firestore');
const admins = require('../DETAILS/admins.json'); 

const firebaseConfig = {
  apiKey: "AIzaSyAqZVtGORWEgXy_6RWJUcAa_wx7ws7IX6A",
  authDomain: "elixpoblogs.firebaseapp.com",
  projectId: "elixpoblogs",
  storageBucket: "elixpoblogs.firebasestorage.app",
  messagingSenderId: "282902721299",
  appId: "1:282902721299:web:c612bc124842c9ee9260e6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function uploadAdmins() {
  for (const [adminid, adminData] of Object.entries(admins)) {
    const adminRef = doc(db, "ADMINS", adminid);
    const docSnap = await getDoc(adminRef);

    if (docSnap.exists()) {
      console.log(`Admin ${adminid} already exists. Skipping...`);
    } else {
      await setDoc(adminRef, adminData);
      console.log(`Uploaded admin: ${adminid}`);
    }
  }
}

uploadAdmins();
