# 🩺 Doctor Appointment App

A web application built using React (frontend) and JSON Server (mock backend) that allows patients to:

- Browse medical departments
- View doctors in each department
- Book appointments with doctors
- Submit reviews for completed appointments
- View their upcoming appointments

---

## 📁 Table of Contents

- [🚀 Features]
- [🧰 Technologies Used]
- [⚙️ Installation Instructions]
- [📂 Folder Structure]
- [🌐 License]
- [🌐 Routes Overview]
- [🧪 Future Improvements]
- [📬 Contact]

---

## 🚀 Features

- ✅ View a list of departments (e.g., Pediatrics, Neurology, Cardiology)
- ✅ See all doctors under a specific department
- ✅ Book a new appointment with a selected doctor
- ✅ View all upcoming appointments
- ✅ Submit reviews for attended appointments
- ✅ Reset all appointments (for testing/demo)

---

## 🧰 Technologies Used

### Frontend
- React (with `useState`, `useEffect`, and `react-router-dom`)
- CSS (basic responsive styling)

### Backend (Mock)
- **JSON Server** (serves RESTful API from `db.json`)
- Endpoints used: `/departments`, `/doctors`, `/appointments`, `/patients`,'/reviews'

---


## ⚙️ Installation Instructions

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/doctor-appointment-app.git
cd doctor-appointment-app

```

### 2. Install dependancies
```bash
npm install
npm install -g json-server
json-server --watch db.json --port 3000
```

### Folder Structure
```bash
DOCTOR-APPOINTMENT-APP
│
├── node_modules/                # Installed npm packages (auto-generated)
├── public/                      # Public assets served directly (like favicon, images, etc.)
│
├── src/                         # Source code for the React app
│   ├── App.jsx                  # Main application component
│   ├── App.css                  # Global styles for the App component
│   ├── index.css                # Global base styles
│   ├── main.jsx                 # Entry point for rendering the app
│   │
│   ├── components/              # Reusable UI components
│   │   ├── AppointmentForm.jsx       # Form to book an appointment
│   │   ├── AppointmentForm.css       # Styles for AppointmentForm
│   │   ├── AppointmentList.jsx       # Displays upcoming appointments
│   │   ├── DepartmentList.jsx        # Displays medical departments
│   │   ├── DepartmentList.css        # Styles for DepartmentList
│   │   ├── DoctorCard.jsx            # Card layout for each doctor
│   │   ├── DoctorList.jsx            # List of doctors per department
│   │   ├── DoctorReview.jsx          # Lists reviews for a doctor or appointment
│   │   ├── DoctorReview.css          # Styles for DoctorReview
│   │   ├── Navbar.jsx                # Top navigation bar
│   │   ├── Navbar.css                # Navbar styling
│   │   └── ReviewForm.jsx            # Form to submit a review
│   │
│   └── pages/                   # Route-specific views
│       ├── LoginForm.jsx             # Patient login view
│       └── SignupForm.jsx            # Patient signup view
│
├── db.json                     # Mock database for json-server (appointments, doctors, users)
├── index.html                  # HTML template loaded by Vite
├── package.json                # Project metadata and dependencies
├── package-lock.json           # Auto-generated lock file
├── vite.config.js              # Vite bundler configuration
├── eslint.config.js            # Linting rules configuration
└── README.md                   # Project documentation (this file)
```

### License
This project is under no license.


### Routes overview
```bash
npm run dev
json-server --watch db.json --port 3000
```


### Future Improvements
📧 Email notifications after booking
📅 Calendar view of appointments
👩‍⚕️ Doctor-side dashboard to see bookings
🗓 Appointment filtering by date/department
🎨 Better UI with component library (e.g. Material UI or Tailwind CSS)

### Contact
name: Melanie Thuranira
Email: melanie.thuranira@student.moringaschool.com
