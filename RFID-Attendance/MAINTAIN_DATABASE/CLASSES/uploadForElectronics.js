const { initializeApp } = require("firebase/app");
const { getFirestore, doc, setDoc, collection } = require("firebase/firestore");
const fs = require('fs'); // Assuming you have Node.js to read JSON file

// Your Firebase configuration
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

// Load the JSON file
const classesComputerScience = JSON.parse(fs.readFileSync('../../DETAILS/CLASSES/classes_electronics.json', 'utf8'));

// Function to upload classes for Computer Science department
const uploadClassesForCS = async () => {
  const teachersRef = collection(db, "CLASSES"); 
  
  // Loop through teachers and upload their classes
  for (const teacherId in classesComputerScience.teachers) {
    const teacherData = classesComputerScience.teachers[teacherId];

    // Add the teacher's classes data under their ID
    await setDoc(doc(teachersRef, teacherId), teacherData)
      .then(() => {
        console.log(`Successfully uploaded classes for teacher ${teacherId}`);
      })
      .catch((error) => {
        console.error("Error uploading classes for teacher", teacherId, error);
      });
  }
};

// Call the function to upload classes
uploadClassesForCS();
