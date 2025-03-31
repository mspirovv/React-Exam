# CarVilla - SoftUni React Exam Project

CarVilla is a project developed as part of the React exam at SoftUni. The application allows users to create, edit, delete, and like cars.

## 📁 Project Structure

The project is divided into two main parts:

- **client/** - Frontend, built with React.
- **server/** - Backend, developed with Node.js and Express (SoftUni practice server).

### 📂 File Structure (client)
```
src/
│── components/    # React components
│── hooks/         # Custom React hooks
│── services/      # API request handling
│── providers/     # Context API for state management
│── utils/         # Utility functions
```

## 🚀 Features
✅ Homepage displaying the 4 most liked cars (based on likes count)
✅ User registration and login
✅ Catalog with all created cars + pagination
✅ Search for cars by brand or maximum price
✅ Registered users can:
   - Add new cars
   - Edit and delete their own cars
   - Like cars that they did not upload

## 🛠️ Technologies Used
### **Frontend:**
- React
- React Router
- Context API

### **Backend:**
- Node.js
- Express

## ▶️ How to Run the Project

### **1. Clone the Repository**
```sh
git clone https://github.com/mspirovv/React-Exam.git
cd carvilla
```

### **2. Install Dependencies**
#### Client:
```sh
cd client
npm install
npm run dev
```
#### Server:
```sh
cd server
npm install
node server.js
```

The project will run at `http://localhost:5173` (React) and `http://localhost:3030` (API).

## 📜 License
This project was created for educational purposes at SoftUni.

---
🎯 **Author:** Mihail Spirov

