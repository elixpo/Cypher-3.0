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

### For Teachers:
- **Attendance Management**: Teachers can scan student IDs to take attendance and save it securely in the database.
- **Class Scheduling**: Teachers can schedule classes, view details, and manage attendance records.
- **Authentication**: Teachers can log in using their credentials, with role-based access control.

### For Admins:
- **Teacher Management**: Admins can add, edit, and delete teacher records.
- **Class Scheduling**: Admins can schedule classes for teachers and manage class details.
- **Role-Based Access**: Admins have exclusive access to manage the platform.

---

## About Safe Cypher

Safe Cypher is an experimental web application that focuses on Full Stack Development. It offers a secure platform for users to store and manage their passwords and other sensitive data. The application utilizes AES encryption for data security and Caesar cipher for experimental purposes. Users can sign up using Google or Github credentials and access various features like adding passwords, login info from various services, and saving them securely on the backend server. The application also allows users to log out when needed, ensuring their data's safety.

---

## How It Works

1. **Authentication**: Users can log in using Firebase Authentication.
2. **Data Storage**: Sensitive data is stored securely in Firebase Firestore.
3. **Encryption**: Data is encrypted using AES before being stored.
4. **Role-Based Access**: Teachers and Admins have distinct roles and access levels.

---

## Getting Started

1. Clone the repository:  
   ```bash
   git clone https://github.com/Circuit-Overtime/Cypher-3.0.git
   ```
2. Install dependencies:  
   ```bash
   npm install
   ```
3. Set up Firebase credentials in the respective files:
   - `serviceAccountKey.json` for backend scripts.
   - Firebase configuration in frontend JavaScript files.

4. Run the application:  
   ```bash
   npm start
   ```

---

## Feedback and Contributions

We welcome contributions to improve Safe Cypher! Feel free to open issues or submit pull requests on our [GitHub repository](https://github.com/Circuit-Overtime/Cypher-3.0).

Happy coding! 🚀🔐
