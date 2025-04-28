const firebaseConfig = {
    apiKey: "AIzaSyAqZVtGORWEgXy_6RWJUcAa_wx7ws7IX6A",
    authDomain: "elixpoblogs.firebaseapp.com",
    projectId: "elixpoblogs",
    storageBucket: "elixpoblogs.firebasestorage.app",
    messagingSenderId: "282902721299",
    appId: "1:282902721299:web:c612bc124842c9ee9260e6"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

function getRoleFromCookie() {
    const cookies = document.cookie.split(';');
    let role = '';
    cookies.forEach(cookie => {
        if (cookie.includes('role=')) {
            role = cookie.split('=')[1];
        }
    });
    return role;
}

// Redirect user if not an admin
if (getRoleFromCookie() !== 'admins') {
    redirectTo("login");
}

// Function to fetch teachers from Firestore
async function fetchTeachers() {
    try {
        // Fetch Teachers
        const teachersSnapshot = await db.collection('TEACHERS').get();
        const teachersTableBody = document.getElementById('teachersTable').getElementsByTagName('tbody')[0];
        teachersSnapshot.forEach(doc => {
            const teacher = doc.data();
            const row = teachersTableBody.insertRow();
            row.insertCell(0).textContent = doc.id;
            row.insertCell(1).textContent = teacher.name;
            row.insertCell(2).textContent = teacher.role;
            row.insertCell(3).innerHTML = `<button class="edit-btn" onclick="editTeacher('${doc.id}')">Edit</button>
                                             <button class="delete-btn" onclick="deleteTeacher('${doc.id}')">Delete</button>
                                             <button class="schedule-btn" onclick="scheduleClass('${doc.id}')">Schedule Class</button>`;
        });
    } catch (error) {
        console.error("Error fetching teachers:", error);
    }
}

// Edit teacher function
function editTeacher(teacherId) {
    alert(`Edit teacher with ID: ${teacherId}`);
    // Implement teacher editing logic here (e.g., show a form/modal to edit teacher data)
    openEditTeacherModal(teacherId);
}

// Open edit teacher modal with teacher details prefilled
async function openEditTeacherModal(teacherId) {
    const teacherDoc = await db.collection('TEACHERS').doc(teacherId).get();
    const teacher = teacherDoc.data();
    
    // Prefill the modal form with teacher data
    document.getElementById('teacherName').value = teacher.name;
    document.getElementById('teacherDept').value = teacher.department;
    
    // Open modal
    const modal = document.getElementById('editTeacherModal');
    modal.style.display = "block";

    // Save updated teacher details
    document.getElementById('editTeacherForm').onsubmit = async function(event) {
        event.preventDefault();
        const updatedName = document.getElementById('teacherName').value;
        const updatedDept = document.getElementById('teacherDept').value;
        await db.collection("TEACHERS").doc(teacherId).update({
            name: updatedName,
            department: updatedDept
        });
        modal.style.display = "none";
        fetchTeachers();  // Refresh teacher data
    };
}

// Delete teacher function
async function deleteTeacher(teacherId) {
    if (confirm("Are you sure you want to delete this teacher?")) {
        await db.collection('TEACHERS').doc(teacherId).delete();
        fetchTeachers();  // Refresh teacher data
    }
}

// Function to open class scheduling modal for a teacher
function scheduleClass(teacherId) {
    const modal = document.getElementById('scheduleClassModal');
    modal.style.display = "block";

    // Handle class scheduling form submission
    document.getElementById('scheduleClassForm').onsubmit = async function(event) {
        event.preventDefault();

        const classID = document.getElementById('classID').value;
        const subject = document.getElementById('subject').value;
        const timeStart = document.getElementById('timeStart').value;
        const timeEnd = document.getElementById('timeEnd').value;
        const roomNo = document.getElementById('roomNo').value;
        const weekNo = document.getElementById('weekNo').value;

        await db.collection('CLASSES').add({
            teacherID: teacherId,
            classID: classID,
            subject: subject,
            timeStart: timeStart,
            timeEnd: timeEnd,
            roomNo: roomNo,
            weekNo: weekNo
        });

        alert(`Class scheduled for teacher ID: ${teacherId}`);
        modal.style.display = "none";
    };
}

// Handle logout
document.getElementById('logoutBtn').addEventListener('click', function() {
    // Clear cookies on logout
    document.cookie = "role=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";

    // Redirect to login page
    redirectTo("login");
});

// Fetch and populate data
fetchTeachers();

// Close modals
document.getElementById('closeModal').onclick = () => document.getElementById('editTeacherModal').style.display = "none";
document.getElementById('closeScheduleModal').onclick = () => document.getElementById('scheduleClassModal').style.display = "none";
