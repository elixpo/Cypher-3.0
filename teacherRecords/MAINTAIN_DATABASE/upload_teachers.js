const { initializeApp } = require('firebase/app');
const { getFirestore, doc, setDoc, getDoc } = require('firebase/firestore');
const teachers = require('../DETAILS/teachers.json'); // your teachers data

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

async function uploadTeachers() {
  for (const [jisid, teacherData] of Object.entries(teachers)) {
    const teacherRef = doc(db, "TEACHERS", jisid);
    const docSnap = await getDoc(teacherRef);

      await setDoc(teacherRef, teacherData);
      console.log(`Uploaded teacher: ${jisid}`);
    
  }
}

uploadTeachers();
