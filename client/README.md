# Digi_Com  Frontend

## Overview
Digi Com is a modern e-commerce platform designed to simplify online clothing shopping with a seamless and intuitive experience. It offers fast performance, a streamlined checkout process, and a user-centric shopping interface. With **secure Firebase authentication**, users can log in effortlessly, while the **cart and checkout system** ensures a smooth shopping experience. Built with **React.js, Redux, and Firebase**, Digi Com is optimized for speed, security, and scalability.



## Features
### **Platform-wide Features**:
- **User Authentication** 🔐: Firebase-based login & registration.
- **Product Catalog** 🛍️: Browse various product categories.
- **Shopping Cart** 🛒: Add/remove products from the cart.
- **Secure Checkout** 💳: Future integration of payment gateways.
- **Admin Panel** 🛠️: Manage products & orders (coming soon).
- **Dark Mode** 🌙: Light/Dark mode support (upcoming).


---

## Tech Stack  
| Technology        | Usage                        |
|------------------|----------------------------|
| **React.js**     | Frontend UI                 |
| **Redux Toolkit** | State management            |
| **Firebase Auth** | User authentication         |
| **MongoDB & Mongoose** | Database & schema    |
| **Node.js & Express** | Backend API          |
| **Axios**        | HTTP requests                |
| **Tailwind CSS** | Styling                      |
| **shadcn/ui**    | Pre-built UI components for better styling |

---

## Installation  

### 1. Clone the Repository  
```sh
git clone https://github.com/dristicg/digi_com.git
```

### 2. Navigate to the project folder & install dependencies
```bash
cd frontend
npm install
```

## Folder Structure
```bash
client/
│── node_modules/        # Dependencies
│── public/              # Static assets (favicon, images, etc.)
│── src/
│   ├── assets/          # Images, icons, fonts
│   ├── components/      # Reusable UI components
│   │   ├── admin-view  
|   |   |   |── header.jsx  # Header component for navigation.
|   |   |   |── image-upload.jsx  # Handles image uploads in admin view.
|   |   |   |── layout.jsx  # Wrapper component for page layout.
|   |   |   |── product-tile.jsx  # Displays a product preview.
|   |   |   |── sidebar.jsx  # Sidebar navigation for admin.
│   │   ├── auth   
|   |   |   |── layout.jsx
│   │   ├── common  
|   |   |   |── check-auth.jsx  # Checks user authentication status.
|   |   |   |── form.jsx  # Reusable form component.
|   |   |   |── PrivateRoutes.jsx  # Protects routes from unauthorized users.
│   │   ├── shopping-view   
|   |   |   |── address-card.jsx  # Displays user address details.
|   |   |   |── address.jsx  # Address management component.
|   |   |   |── cart-items-content.jsx  # Displays cart items.
|   |   |   |── cart-wrapper.jsx  # Wrapper for cart functionality.
|   |   |   |── header.jsx  #
|   |   |   |── layout.jsx  # 
|   |   |   |── order-details.jsx  # Displays individual order details.
|   |   |   |── orders.jsx  # List of user orders.
|   |   |   |── product-details.jsx  # Shows detailed product info.
|   |   |   |── product-tile.jsx  # 
│   │   ├── ui   # COmponents from shadcn
│   │   ├── DebugAuth.jsx
│   ├── pages/           # React pages (Home, Product, Cart, Checkout)
│   │   ├── admin-view 
|   |   |   |── dashboard.jsx  # Admin dashboard page. 
|   |   |   |── features.jsx  # Admin features management page.
|   |   |   |── orders.jsx  # Admin order management page.
|   |   |   |── products.jsx  # Admin product management page.
│   │   ├── auth
|   |   |   |── AuthGaurd.jsx  # Protects authentication routes.
|   |   |   |── login.jsx  # User login page.
|   |   |   |── register.jsx  # User registration page.
│   │   ├── notFound
|   |   |   |── index.jsx  # Not found (404) page.
│   │   ├── shopping-view 
|   |   |   |── account.jsx  # User account page.
|   |   |   |── checkout.jsx  # Checkout page.
|   |   |   |── home.jsx  # Homepage displaying featured products.
|   |   |   |── listing.jsx  # Product listing page.
|   |   |   |── search.jsx  # Search results page
│   │   ├── unauth-page
│   ├── store/           # Redux state management (shoppingCart slice)
│   │   ├── admin
|   |   |   |── product-slice  
|   |   |   |   |── index.js  # Entry point for product slice.
│   │   ├── auth-slice
|   |   |   |── index.jsx  # Entry point for auth slice.
│   │   ├── shop
|   |   |   |── address-slice  # Manages user addresses.
|   |   |   |── cart-slice  # Handles shopping cart state.
|   |   |   |── order-slice  # Manages order state.
|   |   |   |── product-slice  # Manages product state.
|   |   |   |── search-slice  # Handles search functionality.
│   │   ├── store.js  # Configures and exports the Redux store.
│   ├── lib/             # API calls and helper functions
│   ├── hooks/           
│   │   ├── useAuthState.js  # Custom hook for Firebase authentication.
│   ├── App.jsx          # Main application component
│   ├── main.jsx         # Entry point
│── .env                 # Environment variables
│── .gitignore           # Ignored files
│── package.json         # Project dependencies & scripts
│── vite.config.js       # Vite configuration
│── README.md            # Project documentation

### 🔹 **What's Included?**
- **`assets/`** → For storing images, icons, and fonts  
- **`components/`** → All reusable UI components  
- **`pages/`** → Main pages like Home, Product, Cart, Checkout  
- **`store/`** → Redux store (with your `shoppingCart` slice)  
- **`lib/`** → API calls (Axios requests) and helper functions  
- **`hooks/`** → Custom hooks if any  

```

## Contribution
1. Fork the repository
2. Create a new branch (`feature-branch`)
3. Commit changes (`git commit -m 'Added new feature'`)
4. Push to the branch (`git push origin feature-branch`)
5. Open a Pull Request

---

