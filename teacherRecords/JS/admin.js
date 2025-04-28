// ../JS/admin.js

const firebaseConfig = {
    apiKey: "AIzaSyAqZVtGORWEgXy_6RWJUcAa_wx7ws7IX6A", // <-- Replace with your actual API Key if this is a public repo
    authDomain: "elixpoblogs.firebaseapp.com",
    projectId: "elixpoblogs",
    storageBucket: "elixpoblogs.firebasestorage.app",
    messagingSenderId: "282902721299",
    appId: "1:282902721299:web:c612bc124842c9ee9260e6"
};

// Initialize Firebase if not already initialized
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const db = firebase.firestore();
const auth = firebase.auth(); // Get auth instance for logout

function getRoleFromCookie() {
    const cookies = document.cookie.split(';');
    let role = '';
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim();
        if (cookie.startsWith('role=')) {
            role = cookie.substring('role='.length);
            break;
        }
    }
    return role;
}

if (getRoleFromCookie() !== 'admins') {
     console.warn("User is not an admin. Redirecting...");
     // Assuming redirectTo is defined in linkRedirect.js and handles path correctly
     redirectTo("teacherRecords/login"); // Use this if the login page is at /teacherRecords/login.html
     // Or simply:
} else {
    console.log("User is admin. Access granted.");
    // Optionally hide login/signup links if they exist and show admin content
}


// Function to fetch teachers from Firestore and populate the table
async function fetchTeachers() {
    try {
        const teachersTableBody = document.getElementById('teachersTable').getElementsByTagName('tbody')[0];

        // Clear existing table rows
        teachersTableBody.innerHTML = '';

        const teachersSnapshot = await db.collection('TEACHERS').get();

        if (teachersSnapshot.empty) {
            const row = teachersTableBody.insertRow();
            const cell = row.insertCell(0);
            cell.colSpan = 5; // Span across all columns
            cell.textContent = "No teacher data available.";
            cell.style.textAlign = "center";
            return; // Exit the function if no teachers
        }


        teachersSnapshot.forEach(doc => {
            const teacher = doc.data();
            const row = teachersTableBody.insertRow();

            // Populate cells based on HTML table headers:
            // Teacher ID | Name | Department | Role | Action
            row.insertCell(0).textContent = doc.id;          // Teacher ID
            row.insertCell(1).textContent = teacher.name || 'N/A';          // Name
            row.insertCell(2).textContent = teacher.department || 'N/A';  // Department (Assuming field exists)
            row.insertCell(3).textContent = teacher.role || 'N/A';          // Role (Assuming field exists)
            row.insertCell(4).innerHTML = `
                <button class="edit-btn" onclick="openEditTeacherModal('${doc.id}')">Edit</button>
                <button class="delete-btn" onclick="deleteTeacher('${doc.id}')">Delete</button>
                <button class="schedule-btn" onclick="scheduleClass('${doc.id}')">Schedule Class</button>
            `; // Action buttons
        });
    } catch (error) {
        console.error("Error fetching teachers:", error);
        const teachersTableBody = document.getElementById('teachersTable').getElementsByTagName('tbody')[0];
        teachersTableBody.innerHTML = ''; // Clear table on error
        const row = teachersTableBody.insertRow();
        const cell = row.insertCell(0);
        cell.colSpan = 5; // Span across all columns
        cell.textContent = "Error loading teacher data.";
        cell.style.textAlign = "center";
    }
}

// --- Modal Handling Functions ---

// Get modals and close buttons
const editTeacherModal = document.getElementById('editTeacherModal');
const scheduleClassModal = document.getElementById('scheduleClassModal');
const closeModalBtn = document.getElementById('closeModal');
const closeScheduleModalBtn = document.getElementById('closeScheduleModal');

// Function to open edit teacher modal
async function openEditTeacherModal(teacherId) {
    const teacherDoc = await db.collection('TEACHERS').doc(teacherId).get();

    if (!teacherDoc.exists) {
        console.error("Teacher document not found:", teacherId);
        alert("Teacher not found.");
        return;
    }

    const teacher = teacherDoc.data();

    // Prefill the modal form with teacher data
    document.getElementById('teacherName').value = teacher.name || '';
    document.getElementById('teacherDept').value = teacher.department || ''; // Prefill department

    // Show the modal
    editTeacherModal.style.display = "block";

    // IMPORTANT: Remove previous submit handler to avoid multiple submissions
    const editForm = document.getElementById('editTeacherForm');
    const oldHandler = editForm.onsubmit; // Store the old handler
    if (oldHandler) {
        // Remove listener if using addEventListener, or just overwrite for onsubmit
        editForm.onsubmit = null; // Clear the old handler
    }

    // Set the new submit handler
    editForm.onsubmit = async function(event) {
        event.preventDefault(); // Prevent default form submission

        const updatedName = document.getElementById('teacherName').value;
        const updatedDept = document.getElementById('teacherDept').value;

        try {
            await db.collection("TEACHERS").doc(teacherId).update({
                name: updatedName,
                department: updatedDept // Update department field
                // Note: Role and ID are typically not editable via this form
            });
            alert("Teacher details updated successfully!");
            editTeacherModal.style.display = "none"; // Hide modal
            fetchTeachers(); // Refresh table data
        } catch (error) {
            console.error("Error updating teacher:", error);
            alert("Failed to update teacher details.");
        }
    };
}

// Function to open class scheduling modal
async function scheduleClass(teacherId) {
    // Clear previous form data
    document.getElementById('scheduleClassForm').reset();

    // Show the modal
    const scheduleClassModal = document.getElementById('scheduleClassModal');
    scheduleClassModal.style.display = "block";

    // IMPORTANT: Remove previous submit handler to avoid multiple submissions
    const scheduleForm = document.getElementById('scheduleClassForm');
    const oldHandler = scheduleForm.onsubmit;
    if (oldHandler) {
        scheduleForm.onsubmit = null; // Clear the old handler
    }

    // Handle class scheduling form submission
    scheduleForm.onsubmit = async function(event) {
        event.preventDefault(); // Prevent default form submission

        // Get values from the form
        const classID = document.getElementById('classID').value; // Maps to 'classid' in DB
        const subject = document.getElementById('subject').value;   // Maps to 'subject' in DB
        const timeStart = document.getElementById('timeStart').value; // Maps to 'time_start' in DB
        const timeEnd = document.getElementById('timeEnd').value;   // Maps to 'time_end' in DB
        const roomNo = document.getElementById('roomNo').value;     // Maps to 'room_no' in DB
        const weekNo = parseInt(document.getElementById('weekNo').value, 10); // Maps to 'week_no' in DB
        const course = document.getElementById('course').value; // Maps to 'class' in DB (optional)

        // Basic validation (optional but recommended)
        if (!classID || !subject || !timeStart || !timeEnd || !roomNo || isNaN(weekNo)) {
            alert("Please fill in all fields correctly.");
            return; // Stop if validation fails
        }

        try {
            // Fetch teacher's department from the TEACHERS collection
            const teacherDoc = await db.collection('TEACHERS').doc(teacherId).get();
            const teacherData = teacherDoc.data();
            const teacherDept = teacherData ? teacherData.department || 'N/A' : 'N/A';
             const teacherName = teacherData ? teacherData.name || 'Unknown Teacher' : 'Unknown Teacher'; // For alert


            // Create the new class object matching the structure in your DB screenshot
            const newClassData = {
                // Fields from the form, mapped to DB field names
                classid: classID,
                subject: subject,
                time_start: timeStart,
                time_end: timeEnd,
                room_no: roomNo,
                week_no: weekNo, // Use the parsed integer

                // Fields from the teacher data (fetched)
                dept: teacherDept, // e.g., "Computer Science"

                // Other fields from the screenshot (add defaults or placeholder values)
                class: course, // Example: "BTech CSE-1st Year" - Not on form, using placeholder
                // Example: 1 - Not on form, using default
                duration: calculateDurationInHoursOrMinutes(timeStart, timeEnd),
                if_holiday: false,   // Default boolean
                is_completed: false  // Default boolean
            };

            // Get the document reference for this specific teacher in the CLASSES collection
            const teacherClassesRef = db.collection('CLASSES').doc(teacherId);

            // Use arrayUnion to add the new class object to the 'classes' array
            // This will create the document if it doesn't exist, or update it if it does.
            // It will also create the 'classes' array field if it doesn't exist.
            // It adds the item only if it's not already present (based on strict equality).
            await teacherClassesRef.update({
                classes: firebase.firestore.FieldValue.arrayUnion(newClassData)
            });

            alert(`Class scheduled successfully for ${teacherName} (ID: ${teacherId})!`);

            // Close the modal and reset the form
            scheduleClassModal.style.display = "none";
            scheduleForm.reset(); // Clear form after submission

        } catch (error) {
            console.error("Error scheduling class:", error);
            alert("Failed to schedule class. See console for details.");
            // Keep the modal open or close based on preference after error
            // scheduleClassModal.style.display = "none"; // Optional: close on error
        }
    };
}

// Function to calculate duration in hours or minutes between two time strings
function calculateDurationInHoursOrMinutes(startTime, endTime) {
    // Parse the time strings into Date objects
    const start = new Date(`1970-01-01T${startTime}:00`);
    const end = new Date(`1970-01-01T${endTime}:00`);

    // Calculate the difference in milliseconds
    const diffMs = end - start;

    // If the end time is earlier than the start time, assume it spans to the next day
    if (diffMs < 0) {
        const nextDayEnd = new Date(`1970-01-02T${endTime}:00`);
        return calculateDurationInHoursOrMinutes(startTime, nextDayEnd.toISOString().substring(11, 16));
    }

    // Convert milliseconds to minutes
    const diffMinutes = Math.floor(diffMs / (1000 * 60));

    // Convert to hours and minutes
    const hours = Math.floor(diffMinutes / 60);
    const minutes = diffMinutes % 60;

    // Return duration as a formatted string
    return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
}

// Delete teacher function
async function deleteTeacher(teacherId) {
    if (confirm("Are you sure you want to delete this teacher? This action cannot be undone.")) {
        try {
            // Optional: Check if the teacher has scheduled classes before deleting
            // This would involve querying the 'CLASSES' collection for documents where teacherID matches teacherId
            // For simplicity, we are skipping this check here.

            await db.collection('TEACHERS').doc(teacherId).delete();
            alert("Teacher deleted successfully!");
            fetchTeachers(); // Refresh table data
        } catch (error) {
            console.error("Error deleting teacher:", error);
            alert("Failed to delete teacher.");
        }
    }
}

// Handle logout
document.getElementById('logoutBtn').addEventListener('click', function() {
    auth.signOut().then(() => {
        // Clear cookies on logout
        document.cookie = "role=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; SameSite=Lax"; // Also set path and expires for robustness
         redirectTo("teacherRecords/login"); // Use this if the login page is at /teacherRecords/login.html

    }).catch((error) => {
        console.error("Logout error:", error);
        alert("Logout failed. Please try again.");
    });
});


// --- Event Listeners for Modal Closing ---

// When the user clicks on <span> (x), close the modal
closeModalBtn.onclick = () => {
    editTeacherModal.style.display = "none";
};

closeScheduleModalBtn.onclick = () => {
    scheduleClassModal.style.display = "none";
    document.getElementById('scheduleClassForm').reset(); // Clear form when closing
};


// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == editTeacherModal) {
        editTeacherModal.style.display = "none";
    }
    if (event.target == scheduleClassModal) {
        scheduleClassModal.style.display = "none";
        document.getElementById('scheduleClassForm').reset(); // Clear form when closing
    }
};


// --- Initial Data Load ---
fetchTeachers();