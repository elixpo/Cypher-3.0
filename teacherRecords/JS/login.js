const firebaseConfig = {
    apiKey: "AIzaSyAqZVtGORWEgXy_6RWJUcAa_wx7ws7IX6A",
    authDomain: "elixpoblogs.firebaseapp.com",
    projectId: "elixpoblogs",
    storageBucket: "elixpoblogs.firebasestorage.app",
    messagingSenderId: "282902721299",
    appId: "1:282902721299:web:c612bc124842c9ee9260e6"
  };
  

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Handle login
document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');
    errorMessage.textContent = ''; // Clear any previous error message

    try {
        // Check in all collections (ADMINS, STUDENTS, TEACHERS)
        const collections = ['ADMINS', 'STUDENTS', 'TEACHERS'];
        let userData = null;
        let userRole = null;

        // Loop through each collection to find the user by name
        for (let collection of collections) {
            const querySnapshot = await db.collection(collection).where('name', '==', name).get();
            
            if (!querySnapshot.empty) {
                const userDoc = querySnapshot.docs[0]; // Get the first matching document
                userData = userDoc.data();
                userRole = collection.toLowerCase(); // Set the role based on the collection name
                break; // Stop the loop once the user is found
            }
        }

        if (!userData) {
            errorMessage.textContent = 'User not found';
            return;
        }

        // Compare the entered password with the stored passwordHash (Assuming passwordHash is stored securely)
        const passwordMatch = await checkPasswordHash(password, userData.passwordHash);

        if (passwordMatch) {
            // Store the user role in cookies
            document.cookie = `role=${userRole}; path=/`;

            // Redirect based on user role
            if (userRole === 'admins') {
                redirectTo('admin');
            } else if (userRole === 'teachers') {
                redirectTo('teacher');
            } 
            
            else {
                errorMessage.textContent = 'Invalid role';
            }
        } else {
            errorMessage.textContent = 'Incorrect password';
        }
    } catch (error) {
        console.error('Error during login:', error);
        errorMessage.textContent = 'An error occurred. Please try again.';
    }
});


async function checkPasswordHash(enteredPassword, storedPasswordHash) {
    return enteredPassword === storedPasswordHash;  
}
