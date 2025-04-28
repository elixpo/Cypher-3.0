import firebase_admin
from firebase_admin import credentials, firestore

# Initialize Firebase
cred = credentials.Certificate('serviceAccountKey.json')  # Make sure this file path is correct
firebase_admin.initialize_app(cred)

db = firestore.client()

# --- Hardcoded Class and Teacher Info ---
HARDCODED_CLASS_ID = "CS301"
HARDCODED_TEACHER_ID = "T001"

def get_student_name(student_id):
    student_ref = db.collection('STUDENTS').document(student_id)
    student = student_ref.get()
    if student.exists:
        return student.to_dict().get('name', 'Unknown Student')
    else:
        return None

def take_attendance():
    print("\n=== Welcome to the Fingerprint Attendance System ===")
    teacher_id_input = input("Scan your fingerprint (Enter Teacher ID): ").strip()

    if teacher_id_input != HARDCODED_TEACHER_ID:
        print("Unauthorized teacher ID. Exiting...")
        return

    print(f"Teacher verified: {teacher_id_input}")
    print("Start scanning student fingerprints (Enter Student IDs)...")
    print(f"To finish scanning, scan teacher ID ({HARDCODED_TEACHER_ID}) again.\n")

    attendance_list = []

    while True:
        student_id = input("Scan Student ID: ").strip()

        if student_id == HARDCODED_TEACHER_ID:
            print("\nTeacher ID detected again. Ending attendance scan.")
            break

        student_name = get_student_name(student_id)
        if student_name is None:
            print(f"Student ID {student_id} not found. Skipping...")
            continue

        attendance_list.append({
            'student_id': student_id,
            'name': student_name
        })
        print(f"Recorded attendance for: {student_name} ({student_id})")

    # Save attendance to CLASS_DETAILS
    class_details_ref = db.collection('CLASS_DETAILS').document(HARDCODED_CLASS_ID)
    class_doc = class_details_ref.get()

    attendance_data = {
        'teacherID': HARDCODED_TEACHER_ID,
        'teacherName': get_teacher_name(HARDCODED_TEACHER_ID),
        'totalAttendance': len(attendance_list),
        'attendance': attendance_list
    }

    if class_doc.exists:
        print(f"\nUpdating existing class {HARDCODED_CLASS_ID} attendance...")
        class_details_ref.update(attendance_data)
    else:
        print(f"\nCreating new class {HARDCODED_CLASS_ID} record...")
        class_details_ref.set(attendance_data)

    print(f"\nAttendance successfully saved for class {HARDCODED_CLASS_ID}!")

def get_teacher_name(teacher_id):
    teacher_ref = db.collection('TEACHERS').document(teacher_id)
    teacher = teacher_ref.get()
    if teacher.exists:
        return teacher.to_dict().get('name', 'Unknown Teacher')
    else:
        return "Unknown Teacher"

if __name__ == "__main__":
    take_attendance()
