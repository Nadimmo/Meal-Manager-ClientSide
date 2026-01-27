# 🍽️ Meal Manager Website

A full‑stack **Meal Manager** web application designed to manage mess/hostel meals efficiently. The system supports **admin** and **user** roles with role‑based access control. Admins can manage borders, meals, and users, while users can view their monthly meal details.

---

## 🚀 Features Overview

### 🏠 Home Page

Displays a table of all borders with the following information:

* Border Name
* Email
* Deposit
* Bill
* Total Meals
* Due (Balance)

Also includes:

* Login
* Register

---

## 🔐 Authentication & Authorization

* Secure login & registration system
* Role‑based access (Admin & User)
* Private routes for protected pages

---

## 👑 Admin Features

### ➕ Border Management

* Add new border
* Update border information
* Delete border

### 🍛 Meal Management

* Update daily meal count
* View **monthly meals** of all borders
* Filter meals by **Mess Name**
* Search borders by **name or email**

### 👥 User Management

* View all users
* Make a user **Admin**
* Delete user

---

## 👤 User Features

* View **monthly meal report** (only logged‑in users)
* See personal meal count, bill, and due amount

> ⚠️ Users **cannot** access admin features

---

## 🔎 Search & Filter System

* Search borders by **name or email**
* Filter monthly meals by **mess name**
* Highlight matched search text for better UX

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Tailwind CSS
* React Router
* Axios

### Backend

* Node.js
* Express.js
* MongoDB
* JWT Authentication

---

## 📁 Project Structure

Client-side project structure based on the current codebase:

```
meal-manager-clientSide/
├── src/
│   ├── AuthProvider/        # Authentication context & provider
│   ├── components/         # Reusable UI components
│   │   ├── AllUsers/        # User-related components
│   │   ├── Footer/
│   │   ├── Hooks/           # Custom React hooks
│   │   ├── Login/
│   │   ├── Navbar/
│   │   ├── Register/
│   │   └── Firebase/        # Firebase configuration
│   │
│   ├── pages/
│   │   ├── Dashboard/
│   │   │   ├── AddNewBorder/    # Admin: add new border
│   │   │   ├── ManageBorder/    # Admin: update & delete border
│   │   │   ├── ManageUsers/     # Admin: manage users & roles
│   │   │   ├── MealCalculation/ # Admin: meal count update
│   │   │   ├── MonthlyMeals/    # Monthly meals (admin & user)
│   │   │   └── MyMeals/         # User-only monthly meals
│   │   │
│   │   ├── Home/                # Home page
│   │   └── Root/                # Root layout
│   │
│   ├── Route/                   # Application routing
│   ├── App.css
│   └── main.jsx
│
├── public/
├── package.json
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Nadimmo/Meal-Manager-ClientSide.git
cd meal-manager
```

### 2️⃣ Frontend Setup

```bash
cd client
npm install
npm run dev
```

### 3️⃣ Backend Setup

```bash
cd server
npm install
npm run start
```

### 4️⃣ Environment Variables

Create a `.env` file in the server directory:

```
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

---

## 📌 Role Permissions Table

| Feature              | Admin | User |
| -------------------- | ----- | ---- |
| View Home Page       | ✅     | ✅    |
| View Monthly Meals   | ✅     | ✅    |
| Add Border           | ✅     | ❌    |
| Update/Delete Border | ✅     | ❌    |
| Update Meal Count    | ✅     | ❌    |
| Manage Users         | ✅     | ❌    |

---

## 🧪 Future Improvements

* Export monthly reports (PDF / Excel)
* Payment integration
* Notification system
* Responsive dashboard charts

---

## 🙌 Author

**Nadim Mostofa**
Junior MERN Stack Developer
🌐 Portfolio: [https://nadim-mostofa.vercel.app](https://nadim-mostofa.vercel.app)

---

## ⭐ Support

If you like this project, please give it a ⭐ on GitHub!
