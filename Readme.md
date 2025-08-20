# 🛒 Shopping Platform

A Node.js + Express.js shopping platform with MongoDB, JWT authentication, sessions, and EJS templating.  
It supports user authentication, product management, and owner/admin functionality.

---

## 🚀 Features
- User **sign up / login** with password hashing (bcrypt)  
- **JWT authentication** for secure access  
- **Owner/Admin panel** for managing products  
- **Product catalog** (add, update, delete products)  
- Session management with **cookies & flash messages**  
- **EJS templating** for frontend pages  
- MongoDB integration via **Mongoose**  

---

## 📦 Tech Stack
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB (Mongoose ODM)  
- **Authentication:** JWT, bcrypt, express-session  
- **Frontend:** EJS templating engine + TailwindCSS  
- **Middleware:** cookie-parser, connect-flash  

---

## ⚙️ Installation & Running the Project

### 1. Clone the repository
```bash
git clone https://github.com/cheril0905/shopping-platform.git
cd shopping-platform
## Install dependencies
npm install
```
## Create a .env file in the project root

Add the following variables:
```bash
MONGO_URI=your-mongodb-connection-string
JWT_SECRET=your-secret-key
SESSION_SECRET=your-session-secret
```
## Enable Debugging for Admin Panel

To enable Admin Panel access (where the owner can add/manage products), set the debug environment variable:
```bash
On PowerShell (Windows)
$env:DEBUG="development:mongoose"

On Linux / macOS
export DEBUG="development:mongoose"

5. Start the development server
npm run dev
```
##📦 Deployment

This project can be deployed on Vercel / Render / Railway.
Make sure to add your .env variables inside your hosting platform’s environment settings.

🤝 Contributing

Fork the repo
```bash
Create a new branch (git checkout -b feature-name)

Commit your changes (git commit -m "Add new feature")

Push to the branch (git push origin feature-name)

Open a Pull Request
```
