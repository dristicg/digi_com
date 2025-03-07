
# 🛒 Digi Com - E-Commerce Website

Digi Com is a modern e-commerce platform designed to simplify online clothing shopping with a seamless and intuitive experience. It addresses common issues such as slow performance, complex checkout processes, and lack of personalization by offering a fast, mobile-friendly(responvive), and user-centric shopping interface. With secure Firebase authentication, users can log in effortlessly, while the streamlined cart and checkout system reduce cart abandonment. The platform ensures efficient inventory management, allowing store owners to track stock levels and process orders smoothly. Built with React.js and Firebase, Digi Com is optimized for speed, security, and scalability, making it a reliable choice for both shoppers and retailers in the online fashion industry. 🚀🛍
---

## 🚀 Features
- 🔐 **Authentication**: Firebase login & registration
- 🛍 **Product Catalog**: Browse various categories
- 🛒 **Shopping Cart**: Add/remove products from the cart
- 💳 **Checkout System**: Secure checko(future integration)
- 🛠 **Admin Panel**: Manage products & orders (coming soon)
- 🌙 **Dark Mode**: Light/Dark mode support (upcoming)

---

## 🛠 Tech Stack

| Technology  | Usage |
|-------------|----------------|
| **React.js** | Frontend UI |
| **Redux Toolkit** | State management |
| **Firebase Auth** | User authentication |
| **MongoDB & Mongoose** | Database & schema |
| **Node.js & Express** | Backend API |
| **Axios** | HTTP requests |
| **Tailwind CSS** | Styling |

---

## 📦 Installation & Setup

### **1️⃣ Clone the repository**
```sh
git clone https://github.com/yourusername/digi-com.git
cd digi-com

2️⃣ Install dependencies
# Backend
cd backend
npm install

# Frontend
cd ../client
npm install

3️⃣ Set up environment variables
Create a .env file in both backend/:

Backend .env
MONGO_URI=your_mongodb_connection_string
PORT=5000

4️⃣ Start the project
# Start backend
cd backend
npm run dev

# Start frontend
cd ../client
npm run dev

---

### 🏗 Project Structure

digi-com/
│── backend/
│   ├── models/          # Mongoose schemas (User, Cart, Product)
│   ├── routes/          # Express API routes
│   ├── controllers/     # Logic for handling requests
│   ├── config/          # Database connection
│   ├── server.js        # Main server file
│   └── .env
│
│── client/
│   ├── src/
│   │   ├── components/   # UI components
│   │   ├── pages/        # React pages
│   │   ├── store/        # Redux state management
│   │   ├── lib/          # API calls
│   │   ├── App.jsx       # Main app file
│   ├── public/
│   ├── .env
│   ├── package.json
│   ├── vite.config.js


