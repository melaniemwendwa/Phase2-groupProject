# 🩺 Doctor Appointment App

The Doctor Appointment App is a React application that allows users to view various medical departments, view doctors, book appointments, and leave reviews. Users can navigate between pages to view different medical departments (e.g., Cardiology, Dermatology), each containing a list of doctors filtered by department. When a doctor is selected, users can view their details and click a “Book Appointment” button, which opens a controlled form to submit appointment data. Users can also view all their upcoming appointments and leave reviews for doctors after appointments, which are also submitted via forms. Basic styling ensures the UI is user-friendly.

## 🚀 Features

- 🔐 Patient Login & Signup
- 🏥 View Departments
- 👨‍⚕️ View Doctors in a Department
- 📅 Book an Appointment
- 📝 Leave a Review after Appointment
- 🔄 Conditional Navigation based on login status

## 🛠️ Technologies Used

- Frontend: React (with React Router)
- Backend: JSON Server (`db.json`)
- Styling: Basic CSS
- State Management: React useState, useEffect

## 📋 Setup Instructions

### 1. Clone the Repository
git clone git@github.com:melaniemwendwa/Phase2-groupProject.git
cd doctor-appointment-app

### 2. Run on the browser
use:
- npm run dev
- json-server --watch db.json --port 3000