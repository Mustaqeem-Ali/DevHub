# 🌐 DevHub - The Ultimate Collaboration Platform

DevHub is a **MERN-based** platform for developers to **collaborate, share repositories, discuss ideas, and manage files** efficiently. It integrates **MongoDB** and **Google Drive** for data storage and offers a **live chat feature** for real-time discussions.

## 🚀 Features
- 📂 **File Storage & Access**: Upload and retrieve files via **Google Drive**.
- 💬 **Live Chat**: Engage in real-time discussions with other developers.
- 📝 **Posts & Repositories**: Share your projects and collaborate effectively.
- 🤝 **Community Discussions**: Start meaningful conversations and contribute.
- 📡 **Multi-Platform Integration**: Connect seamlessly across **GitHub, Discord, and LinkedIn**.

---

## 🛠️ Installation & Setup

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/Mustaqeem-Ali/DevHub.git
cd DevHub
```

### 2️⃣ Install Dependencies
```sh
npm install
```

### 3️⃣ Set Up Environment Variables
Create a `.env` file in the root directory and add the following:
```env
PORT=5000
MONGO_URI=your_mongo_db_connection
GOOGLE_DRIVE_KEY_FILE=path/to/service-account.json
GOOGLE_DRIVE_FOLDER_ID=your_drive_folder_id
```

### 4️⃣ Start the Server
```sh
node server.js
```

---

## 📤 API Endpoints
### 🔹 **Upload File**
- **Endpoint:** `POST /upload`
- **Request:**
  - `file`: The file to be uploaded (multipart/form-data).
- **Response:**
  ```json
  {
    "success": true,
    "fileUrl": "https://drive.google.com/file/d/{fileId}/view"
  }
  ```

---

## 🛠️ Technologies Used
- **Frontend:** React.js
- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Google Drive API
- **Authentication:** JWT
- **File Handling:** Multer
- **Real-Time Chat:** Socket.io
- **Environment Variables:** Dotenv

---

## 📬 Contact
If you have any questions, feel free to reach out:
- 💬 **Email:** mustaqeem.ali.6764.com
- 🐙 **GitHub:** [your-username](https://github.com/Mustaqeem-Ali)


Let's build together! 🚀

