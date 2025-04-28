const { initializeApp } = require('firebase/app');
const { getFirestore, doc, setDoc, getDoc } = require('firebase/firestore');
const students = require('../DETAILS/students.json'); // your students data

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

async function uploadStudents() {
  for (const [studentid, studentData] of Object.entries(students)) {
    const studentRef = doc(db, "STUDENTS", studentid);
    const docSnap = await getDoc(studentRef);

    if (docSnap.exists()) {
      console.log(`Student ${studentid} already exists. Skipping...`);
    } else {
      await setDoc(studentRef, studentData);
      console.log(`Uploaded student: ${studentid}`);
    }
  }
}

uploadStudents();
