# Safe Cypher: An Experimental Web Application for Full Stack Development

Welcome to Safe Cypher! This web application is designed to delve into the intricacies of Full Stack Development. Its primary purpose is to securely store and manage passwords while offering additional data handling features.

To get started, create your account on Cypher by visiting [Cypher Sign-Up](https://cypherpi.vercel.app). You can register using your Google/Github credentials or opt for direct registration. Upon completion, a confirmation email will guide you to the homepage.

Feel free to explore the platform! As an open-source project, your feedback is invaluable. Don't hesitate to report any issues, contributing to the continual improvement of Cypher.

Happy exploring! 🚀🔐

---

## Contributors

<a href="https://github.com/Circuit-Overtime/Cypher-3.0/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=Circuit-Overtime/Cypher-3.0" />
</a>

---

## Technologies Used

### Frontend:
- HTML
- CSS
- JavaScript

### Backend:
- Firebase Firestore
- Firebase Authentication
- Firebase Storage

### Encryption:
- AES (Advanced Encryption Standard)
- Caesar Cipher (Experimental)

---

## Features

### Teacher Module
- **Attendance Management**: Teachers can scan student IDs and record attendance using the `scanning.py` script.
- **Class Scheduling**: Teachers can schedule classes and manage details via the `teacher.js` module.
- **Authentication**: Teachers are authenticated using Firebase Authentication and role-based access control.

### Admin Module
- **Admin Management**: Admins can upload and manage teacher/admin data using the `upload_admins.js` script.
- **Teacher Management**: Admins can edit, delete, and schedule classes for teachers via the `admin.js` module.
- **Role-Based Access**: Admins are restricted to specific functionalities based on their role.

---

## About Safe Cypher

Safe Cypher is an experimental web application that focuses on Full Stack Development. It offers a secure platform for users to store and manage their passwords and other sensitive data. The application utilizes AES encryption for data security and Caesar cipher for experimental purposes. Users can sign up using Google or Github credentials and access various features like adding passwords, login info from various services, and saving them securely on the backend server. The application also allows users to logout when needed, ensuring their data's safety.

---

## How It Works

1. **Authentication**: Users are authenticated using Firebase Authentication.
2. **Data Storage**: Sensitive data is stored securely in Firebase Firestore.
3. **Encryption**: Data is encrypted using AES before being stored.
4. **Role-Based Access**: Teachers and admins have specific roles and permissions.

---

## Getting Started

1. Clone the repository:  
   ```bash
   git clone https://github.com/Circuit-Overtime/Cypher-3.0.git
   ```
2. Install dependencies for backend scripts:
   ```bash
   npm install
   ```
3. Set up Firebase credentials:
   - Add your Firebase configuration in the respective files (`scanning.py`, `teacher.js`, `admin.js`, `upload_admins.js`).
   - Ensure the `serviceAccountKey.json` file is correctly placed for Firebase Admin SDK.

4. Run the application:
   - For backend scripts, execute them using Node.js or Python as required.
   - For the frontend, open `index.html` in your browser.

---

## Feedback and Contributions

We welcome contributions to improve Safe Cypher! Feel free to fork the repository, make changes, and submit a pull request. For any issues, please open a ticket in the [Issues](https://github.com/Circuit-Overtime/Cypher-3.0/issues) section.

Thank you for being a part of the Safe Cypher journey!
