// ../JS/teacher.js

const firebaseConfig = {
    apiKey: "AIzaSyAqZVtGORWEgXy_6RWJUcAa_wx7ws7IX6A", // <-- Replace with your actual API Key
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
// Get FieldValue using the firestore object
const FieldValue = firebase.firestore.FieldValue;


// --- Authentication Check and Get Teacher ID ---

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

function getTeacherIdFromLocalstorage() {
    return localStorage.getItem('teacherID');
}

const teacherId = getTeacherIdFromLocalstorage();
const userRole = getRoleFromCookie();

// Get references to modals and buttons
const scheduleClassModal = document.getElementById('scheduleClassModal');
const classDetailsModal = document.getElementById('classDetailsModal');
const scheduleClassBtn = document.getElementById('scheduleClassBtn');
const closeScheduleModalBtn = document.getElementById('closeScheduleModal');
const closeDetailsModalBtn = document.getElementById('closeDetailsModal');
const scheduleClassForm = document.getElementById('scheduleClassForm');
const classesTableBody = document.getElementById('classesTable').getElementsByTagName('tbody')[0];
const deleteClassFromDetailsBtn = document.getElementById('deleteClassFromDetailsBtn');
const detailsClassIndexInput = document.getElementById('detailsClassIndex');

// Get references for attendance elements in details modal
const attendanceListUl = document.getElementById('attendanceList');
const studentIdInput = document.getElementById('studentIdInput');
const studentNameInput = document.getElementById('studentNameInput');
const addAttendanceBtn = document.getElementById('addAttendanceBtn');
const detailTeacherNameSpan = document.getElementById('detailTeacherName');
const detailTeacherIdSpan = document.getElementById('detailTeacherId');
const detailTotalAttendanceSpan = document.getElementById('detailTotalAttendance');


// --- Global variable to store the fetched classes array ---
// This is needed so delete/details functions can access the array data without re-fetching
let currentTeacherClassesArray = [];
// Global variable to store the classid of the currently open details modal
let currentDetailsClassId = null;


// Redirect user if not a logged-in teacher
if (!teacherId || userRole !== 'teacher') {
    console.warn("User is not a logged-in teacher or role is incorrect. Redirecting...");
    // Assuming redirectTo is defined in linkRedirect.js
    redirectTo("teacherRecords/login"); // Adjust path if necessary

} else {
    console.log(`Teacher ID: ${teacherId}. Access granted.`);
    // Update welcome message - Optionally fetch the teacher's name from TEACHERS collection
    db.collection('TEACHERS').doc(teacherId).get().then(doc => {
        if (doc.exists) {
            document.getElementById('welcomeMessage').textContent = `Welcome, ${doc.data().name || teacherId}`;
        } else {
             document.getElementById('welcomeMessage').textContent = `Welcome, ${teacherId}`;
        }
    }).catch(err => {
         console.error("Error fetching teacher name:", err);
         document.getElementById('welcomeMessage').textContent = `Welcome, ${teacherId}`;
    });

    // Fetch classes
    fetchTeacherClasses(teacherId);
}


// --- Function to Fetch and Display Classes (Main Table) ---
// (This function remains largely the same as before)

async function fetchTeacherClasses(teacherId) {
    // Clear existing table rows and show loading message
    classesTableBody.innerHTML = `<tr><td colspan="8" style="text-align: center;">Loading classes...</td></tr>`;

    try {
        // Get the document in the CLASSES collection whose ID is the teacherId
        const teacherClassesDoc = await db.collection('CLASSES').doc(teacherId).get();

        if (!teacherClassesDoc.exists) {
             currentTeacherClassesArray = []; // Clear global array
            classesTableBody.innerHTML = `<tr><td colspan="8" style="text-align: center;">No classes assigned to this teacher.</td></tr>`;
            console.log("No classes document found for teacher ID:", teacherId);
            return; // Exit the function
        }

        const classesData = teacherClassesDoc.data();
        const classesArray = classesData.classes; // Assuming 'classes' is the array field name

        // Check if the 'classes' field exists and is an array
        if (!classesArray || !Array.isArray(classesArray) || classesArray.length === 0) {
            currentTeacherClassesArray = []; // Clear global array
            classesTableBody.innerHTML = `<tr><td colspan="8" style="text-align: center;">No classes assigned to this teacher.</td></tr>`;
            console.log("Classes field is missing, not an array, or is empty for teacher ID:", teacherId);
            return; // Exit the function
        }

        // Store the fetched array globally
        currentTeacherClassesArray = classesArray;

        // Clear loading/no data message
        classesTableBody.innerHTML = '';

        // Sort classes by week number and then time (optional)
        classesArray.sort((a, b) => {
            if (a.week_no !== b.week_no) {
                return (a.week_no || 0) - (b.week_no || 0); // Handle potential undefined/null
            }
            return (a.time_start || '').localeCompare(b.time_start || '');
        });


        // Populate the table with classes
        classesArray.forEach((classItem, index) => {
            const row = classesTableBody.insertRow();

            // Populate cells based on HTML table headers:
            // Subject | Class ID | Course | Department | Time | Room No | Week No | Action
            row.insertCell(0).textContent = classItem.subject || 'N/A';
            // Make Class ID clickable and store index for details
            const classIdCell = row.insertCell(1);
            classIdCell.textContent = classItem.classid || 'N/A';
            classIdCell.classList.add('expand-class-details'); // Add class for styling/selection
            classIdCell.dataset.index = index; // Store the index

            row.insertCell(2).textContent = classItem.class || 'N/A'; // Assuming 'class' field is the course name
            row.insertCell(3).textContent = classItem.dept || 'N/A';
            row.insertCell(4).textContent = `${classItem.time_start || 'N/A'} - ${classItem.time_end || 'N/A'}`; // Combine start and end time
            row.insertCell(5).textContent = classItem.room_no || 'N/A';
            row.insertCell(6).textContent = classItem.week_no || 'N/A';

            // Add Action button (Delete)
            const actionCell = row.insertCell(7);
            actionCell.innerHTML = `<button class="delete-btn" data-index="${index}">Delete</button>`; // Store index on button
        });

    } catch (error) {
        console.error("Error fetching teacher classes:", error);
        currentTeacherClassesArray = []; // Clear global array on error
        classesTableBody.innerHTML = `<tr><td colspan="8" style="text-align: center; color: red;">Error loading classes.</td></tr>`;
    }
}


// --- Schedule Class Logic ---

// Event listener for the "Schedule New Class" button
scheduleClassBtn.addEventListener('click', () => {
    scheduleClassModal.style.display = "block";
    scheduleClassForm.reset(); // Ensure form is reset when opened
});

// Handle class scheduling form submission
scheduleClassForm.onsubmit = async function(event) {
    event.preventDefault(); // Prevent default form submission

    // Get values from the form
    const classID = document.getElementById('classID').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const courseName = document.getElementById('courseName').value.trim();
    // const classNo = parseInt(document.getElementById('classNo').value, 10);
    const timeStart = document.getElementById('timeStart').value;
    const timeEnd = document.getElementById('timeEnd').value;
    const duration = document.getElementById('duration').value.trim();
    const roomNo = document.getElementById('roomNo').value.trim();
    const weekNo = parseInt(document.getElementById('weekNo').value, 10);

    // Basic validation
    if (!classID || !subject || !courseName || !timeStart || !timeEnd || !duration || !roomNo || isNaN(weekNo)) {
        alert("Please fill in all fields correctly.");
        return;
    }

    try {
        // Fetch teacher's department and name from the TEACHERS collection
        const teacherDoc = await db.collection('TEACHERS').doc(teacherId).get();
        const teacherData = teacherDoc.data();
        const teacherDept = teacherData ? teacherData.department || 'N/A' : 'N/A';
        // No need for teacherName here, it's for the CLASS_DETAILS document

        // Create the new class object matching the structure in your DB screenshot for the CLASSES array
        const newClassData = {
            classid: classID,
            subject: subject,
            class: courseName, // Use value from the new form field
            // class_no: classNo, // Use value from the new form field
            dept: teacherDept, // Use fetched department
            time_start: timeStart,
            time_end: timeEnd,
            duration: duration, // Use value from the new form field
            room_no: roomNo,
            week_no: weekNo,
            if_holiday: false,   // Default boolean as seen in DB
            is_completed: false  // Default boolean as seen in DB
        };

        // Get the document reference for this specific teacher in the CLASSES collection
        const teacherClassesRef = db.collection('CLASSES').doc(teacherId);

        // Use arrayUnion to add the new class object to the 'classes' array
        await teacherClassesRef.update({
            classes: FieldValue.arrayUnion(newClassData)
        });

        alert(`Class "${subject}" scheduled successfully!`);

        // Close the modal and reset the form
        scheduleClassModal.style.display = "none";
        scheduleClassForm.reset();

        // Refresh the table to show the newly added class
        fetchTeacherClasses(teacherId);

        // --- Optional: Create corresponding CLASS_DETAILS document ---
        // You could optionally create the CLASS_DETAILS document here with an empty attendance array
        // This ensures it exists when the teacher later tries to add attendance.
        // Get teacher's name for the CLASS_DETAILS document
         const teacherNameForDetails = teacherData ? teacherData.name || 'Unknown Teacher' : 'Unknown Teacher';

        const classDetailsRef = db.collection('CLASS_DETAILS').doc(classID); // Doc ID is the classID
        classDetailsRef.get().then(doc => {
            if (!doc.exists) {
                // Only create if it doesn't exist
                classDetailsRef.set({
                    attendance: [], // Start with an empty attendance array
                    teacherID: teacherId,
                    teacherName: teacherNameForDetails,
                    totalAttendance: 0 // Start with 0 attendance
                }).catch(error => {
                    console.error("Error creating initial CLASS_DETAILS document:", error);
                });
            }
        }).catch(error => {
             console.error("Error checking for existing CLASS_DETAILS document:", error);
        });
        // --- End Optional Creation ---


    } catch (error) {
        console.error("Error scheduling class:", error);
        alert("Failed to schedule class. See console for details.");
    }
};


// --- Delete Class Logic ---

// Use event delegation on the table body for delete buttons
classesTableBody.addEventListener('click', async (event) => {
    if (event.target.classList.contains('delete-btn')) {
        const index = parseInt(event.target.dataset.index, 10);

        if (confirm("Are you sure you want to delete this class? This will also attempt to delete its attendance record.")) {
            await deleteClass(index);
        }
    }
});

// Handle delete button click from the Details Modal
deleteClassFromDetailsBtn.addEventListener('click', async () => {
     const index = parseInt(detailsClassIndexInput.value, 10);
     if (!isNaN(index)) {
          if (confirm("Are you sure you want to delete this class? This will also attempt to delete its attendance record.")) {
             // Close details modal first
             classDetailsModal.style.display = "none";
             await deleteClass(index);
         }
     } else {
         console.error("Could not get class index for deletion from details modal.");
     }
});


async function deleteClass(indexToDelete) {
    // Ensure we have the teacher ID and the latest class data
    const currentTeacherId = getTeacherIdFromLocalstorage();
     if (!currentTeacherId) {
         console.error("Teacher ID not found for deletion.");
         alert("Could not determine teacher ID to delete class.");
         return;
     }

     if (indexToDelete < 0 || indexToDelete >= currentTeacherClassesArray.length) {
         console.error("Invalid class index for deletion:", indexToDelete);
         alert("Invalid class selected for deletion.");
         // Refresh the table as the local array might be out of sync
         fetchTeacherClasses(currentTeacherId);
         return;
     }

    try {
        // Get the class object to remove from the current array state *before* modifying it
        const classToRemove = currentTeacherClassesArray[indexToDelete];
        const classIdToDelete = classToRemove.classid; // Get the classid for potential CLASS_DETAILS deletion

        // Use arrayRemove to remove the exact object from the array in Firestore
        const teacherClassesRef = db.collection('CLASSES').doc(currentTeacherId);

         // It's safest to refetch the document to get the exact object from the DB
         const docSnapshot = await teacherClassesRef.get();
         if (!docSnapshot.exists) {
              console.error("Teacher CLASSES document not found during deletion attempt.");
              alert("Could not find your class data to perform deletion.");
              fetchTeacherClasses(currentTeacherId); // Attempt refresh
              return;
         }
         const classesArrayInDB = docSnapshot.data().classes;

         // Find the object in the DB array that matches the one we intend to delete by index
         // This assumes the order is consistent. A safer but more complex way is to find by a unique combo of fields.
         const exactClassToRemoveFromDB = classesArrayInDB[indexToDelete];

         if (!exactClassToRemoveFromDB) {
             console.error("Class object not found in database array at expected index for deletion:", indexToDelete);
             alert("Failed to find the class details for deletion.");
             fetchTeacherClasses(currentTeacherId); // Attempt refresh
             return;
         }


        await teacherClassesRef.update({
            classes: FieldValue.arrayRemove(exactClassToRemoveFromDB)
        });

        alert(`Class "${classToRemove.subject || 'N/A'}" deleted successfully!`);

        // --- Attempt to delete the corresponding CLASS_DETAILS document ---
         if (classIdToDelete) {
             const classDetailsRef = db.collection('CLASS_DETAILS').doc(classIdToDelete);
             classDetailsRef.delete().then(() => {
                 console.log(`CLASS_DETAILS document for ${classIdToDelete} successfully deleted.`);
             }).catch((error) => {
                 console.warn(`Could not delete CLASS_DETAILS document for ${classIdToDelete}:`, error);
                 // Alert here might be annoying, console warn is better
             });
         } else {
             console.warn("No classId found for the deleted class, skipping CLASS_DETAILS deletion.");
         }
        // --- End CLASS_DETAILS deletion attempt ---


        // Refresh the main table to reflect the deletion
        fetchTeacherClasses(currentTeacherId);

    } catch (error) {
        console.error("Error deleting class:", error);
        alert("Failed to delete class. See console for details.");
        fetchTeacherClasses(currentTeacherId); // Attempt refresh on error
    }
}


// --- Expand Details Logic ---

// Use event delegation on the table body for the clickable Class ID cells
classesTableBody.addEventListener('click', (event) => {
    // Check if the clicked element or its parent is a td with the class expand-class-details
    const targetCell = event.target.closest('td.expand-class-details');

    if (targetCell) {
        const index = parseInt(targetCell.dataset.index, 10);
         if (!isNaN(index) && index >= 0 && index < currentTeacherClassesArray.length) {
            const classItem = currentTeacherClassesArray[index];
            openClassDetailsModal(classItem, index); // Pass the object and its index
         } else {
             console.error("Invalid index stored on clicked cell:", targetCell.dataset.index);
             // Refresh the table as the local array might be out of sync
             fetchTeacherClasses(getTeacherIdFromLocalstorage());
         }
    }
});

// Function to open the details modal
async function openClassDetailsModal(classItem, index) {
    // Populate the main class details section
    document.getElementById('detailSubject').textContent = classItem.subject || 'N/A';
    document.getElementById('detailClassId').textContent = classItem.classid || 'N/A';
    document.getElementById('detailCourse').textContent = classItem.class || 'N/A'; // 'class' from DB
    document.getElementById('detailDept').textContent = classItem.dept || 'N/A';
    document.getElementById('detailTime').textContent = `${classItem.time_start || 'N/A'} - ${classItem.time_end || 'N/A'}`;
    document.getElementById('detailRoom').textContent = classItem.room_no || 'N/A';
    document.getElementById('detailWeek').textContent = classItem.week_no || 'N/A';
    // document.getElementById('detailClassNo').textContent = classItem.class_no || 'N/A'; // 'class_no' from DB
    document.getElementById('detailDuration').textContent = classItem.duration || 'N/A';
    document.getElementById('detailIsHoliday').textContent = classItem.if_holiday ? 'Yes' : 'No'; // Boolean display
    document.getElementById('detailIsCompleted').textContent = classItem.is_completed ? 'Yes' : 'No'; // Boolean display

    // Store the index and classid globally and in the hidden input
    detailsClassIndexInput.value = index;
    currentDetailsClassId = classItem.classid; // Store classid globally

    // --- Fetch and display Attendance Details ---
    attendanceListUl.innerHTML = '<li>Loading attendance...</li>'; // Show loading message
    detailTeacherNameSpan.textContent = 'Loading...';
    detailTeacherIdSpan.textContent = 'Loading...';
    detailTotalAttendanceSpan.textContent = 'Loading...';

    try {
        const classDetailsDoc = await db.collection('CLASS_DETAILS').doc(classItem.classid).get();

        if (!classDetailsDoc.exists) {
            // Document doesn't exist, no attendance recorded yet
            attendanceListUl.innerHTML = '<li>No attendance recorded yet.</li>';
            detailTeacherNameSpan.textContent = 'N/A';
            detailTeacherIdSpan.textContent = 'N/A';
            detailTotalAttendanceSpan.textContent = '0';
             console.log(`No CLASS_DETAILS document for classID: ${classItem.classid}`);

        } else {
            const detailsData = classDetailsDoc.data();
            const attendanceArray = detailsData.attendance; // Assuming 'attendance' is the array field

            detailTeacherNameSpan.textContent = detailsData.teacherName || 'N/A';
            detailTeacherIdSpan.textContent = detailsData.teacherID || 'N/A';
            detailTotalAttendanceSpan.textContent = detailsData.totalAttendance || '0';


            // Check if attendanceArray exists and is an array
            if (!attendanceArray || !Array.isArray(attendanceArray) || attendanceArray.length === 0) {
                attendanceListUl.innerHTML = '<li>No attendance recorded yet.</li>';
            } else {
                // Populate attendance list
                attendanceListUl.innerHTML = ''; // Clear loading/no data message
                attendanceArray.forEach(student => {
                    const li = document.createElement('li');
                    li.textContent = `${student.name || 'N/A Name'} (ID: ${student.student_id || 'N/A ID'})`;
                    // Optional: Add a delete button next to each student attendance item
                    // li.innerHTML += ` <button class="delete-student-attendance-btn" data-student-id="${student.student_id}">Remove</button>`;
                    attendanceListUl.appendChild(li);
                });
            }
        }

    } catch (error) {
        console.error("Error fetching attendance details:", error);
        attendanceListUl.innerHTML = '<li style="color: red;">Error loading attendance.</li>';
         detailTeacherNameSpan.textContent = 'Error';
         detailTeacherIdSpan.textContent = 'Error';
         detailTotalAttendanceSpan.textContent = 'Error';
    }

    // Show the main details modal
    classDetailsModal.style.display = "block";
}


// --- Add Attendance Logic ---

addAttendanceBtn.addEventListener('click', async () => {
    const studentId = studentIdInput.value.trim();
    const studentName = studentNameInput.value.trim();
    const classid = currentDetailsClassId; // Get classid from global variable

    if (!classid) {
        alert("Error: Class ID not found for adding attendance.");
        console.error("currentDetailsClassId is null. Modal might not have been opened correctly.");
        return;
    }

    if (!studentId || !studentName) {
        alert("Please enter both Student ID and Student Name.");
        return;
    }

    // Prevent adding if already in the list (optional, requires fetching current list first)
    // For simplicity, we'll let Firestore's arrayUnion handle exact duplicates.
    // If you need to prevent adding a student ID even with a different name,
    // you'd need to fetch the current attendance array and check IDs before calling update.


    try {
         // Get the document reference for this class in the CLASS_DETAILS collection
        const classDetailsRef = db.collection('CLASS_DETAILS').doc(classid);

        // Create the student object to add
        const studentAttendanceData = {
            name: studentName,
            student_id: studentId
        };

         // Use a transaction to ensure atomic read-modify-write for totalAttendance
         await db.runTransaction(async (transaction) => {
            const doc = await transaction.get(classDetailsRef);

            if (!doc.exists) {
                // If document doesn't exist, create it with the first student
                 const teacherDoc = await db.collection('TEACHERS').doc(teacherId).get(); // Fetch teacher name
                 const teacherData = teacherDoc.data();
                 const teacherNameForDetails = teacherData ? teacherData.name || 'Unknown Teacher' : 'Unknown Teacher';

                transaction.set(classDetailsRef, {
                    attendance: [studentAttendanceData], // Start with this student
                    teacherID: teacherId,
                    teacherName: teacherNameForDetails,
                    totalAttendance: 1 // First student
                });
                 console.log(`Created new CLASS_DETAILS document for ${classid}`);

            } else {
                // If document exists, update it
                const currentData = doc.data();
                const currentAttendanceArray = currentData.attendance || [];
                const currentTotalAttendance = currentData.totalAttendance || 0;

                 // Check if student ID is already in the list (case-insensitive check)
                 const studentExists = currentAttendanceArray.some(student =>
                     (student.student_id || '').toLowerCase() === studentId.toLowerCase()
                 );

                if (studentExists) {
                    // Abort transaction but don't throw error, just signal completion
                    console.log(`Student ID ${studentId} already exists for class ${classid}. Aborting add.`);
                    throw FieldValue.delete(); // Use a harmless operation to break transaction without erroring
                    // This throw requires a catch block below, or handle the result outside.
                    // A simpler approach might be to just return/alert before the transaction.
                    // Let's try alerting before the transaction instead for simpler flow.
                }


                // Use arrayUnion to add the student object to the attendance array
                // arrayUnion prevents adding *exact* duplicate objects.
                transaction.update(classDetailsRef, {
                    attendance: FieldValue.arrayUnion(studentAttendanceData),
                    // Only increment totalAttendance if the student was actually added (not a duplicate by student_id)
                    // This is complex with arrayUnion alone. Let's increment first, then correct if needed,
                    // OR use a transaction to check existence BEFORE incrementing.
                    // Using transaction to check existence and increment seems most reliable.
                    totalAttendance: currentTotalAttendance + 1
                });
                 console.log(`Added student ${studentId} to attendance for ${classid}. Incremented count.`);
            }
         }); // end transaction

         // Clear the input fields
        studentIdInput.value = '';
        studentNameInput.value = '';

        alert("Attendance added successfully!");

        // Refresh the attendance list in the currently open modal
        // Re-fetch the details for the current classid
        if (currentDetailsClassId) {
             // Find the original classItem from the global array based on classid
             const classItemForRefresh = currentTeacherClassesArray.find(item => item.classid === currentDetailsClassId);
             if (classItemForRefresh) {
                 // Pass the original classItem and its index again to refresh the modal content
                 // Note: This re-fetches attendance data.
                 const indexForRefresh = currentTeacherClassesArray.findIndex(item => item.classid === currentDetailsClassId);
                 if (indexForRefresh !== -1) {
                     openClassDetailsModal(classItemForRefresh, indexForRefresh);
                 } else {
                      // Fallback if index is lost, just re-open with classItem
                      openClassDetailsModal(classItemForRefresh, 0); // Pass a dummy index if needed by open function
                 }
             } else {
                 // Should not happen if currentDetailsClassId is valid, but as a fallback:
                  fetchTeacherClasses(getTeacherIdFromLocalstorage()); // Refresh main table if details object is missing
                  classDetailsModal.style.display = "none"; // Close modal
             }

        } else {
            // Fallback: Refresh the main table if modal context is lost
            fetchTeacherClasses(getTeacherIdFromLocalstorage());
            classDetailsModal.style.display = "none"; // Close modal
        }


    } catch (error) {
         // Check if the error is the deliberate throw from transaction for duplicate student ID
         if (error === FieldValue.delete()) { // Check against the thrown value
             alert(`Student with ID ${studentId} is already in the attendance list for this class.`);
             console.warn("Attempted to add existing student attendance:", studentId);
         } else {
             console.error("Error adding attendance:", error);
             alert("Failed to add attendance. See console for details.");
         }
         // Decide whether to close the modal or keep it open on error
         // classDetailsModal.style.display = "none"; // Optional: close on error
    }
});



// --- Modal Closing Logic ---

// When the user clicks on <span> (x), close the modal
closeScheduleModalBtn.onclick = () => {
    scheduleClassModal.style.display = "none";
    scheduleClassForm.reset(); // Reset form on close
};

closeDetailsModalBtn.onclick = () => {
    classDetailsModal.style.display = "none";
    currentDetailsClassId = null; // Clear global classid when modal is closed
};


// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == scheduleClassModal) {
        scheduleClassModal.style.display = "none";
        scheduleClassForm.reset(); // Reset form on overlay close
    }
    if (event.target == classDetailsModal) {
        classDetailsModal.style.display = "none";
        currentDetailsClassId = null; // Clear global classid when modal is closed
    }
};


// --- Handle Logout ---
document.getElementById('logoutBtn').addEventListener('click', function() {
    auth.signOut().then(() => {
        // Clear stored data on logout
        localStorage.removeItem('teacherID'); // Clear teacher ID
        // Clear role cookie
        document.cookie = "role=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; SameSite=Lax";

        // Redirect to login page
        redirectTo("teacherRecords/login"); // Adjust path if needed
        // window.location.href = "../login.html"; // Adjust path as needed

    }).catch((error) => {
        console.error("Logout error:", error);
        alert("Logout failed. Please try again.");
    });
});

// --- Initial Data Load ---
// This is called in the initial authentication check block
// fetchTeacherClasses(teacherId);