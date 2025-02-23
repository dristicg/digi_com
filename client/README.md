

frontend/
│── public/                   # Static files (e.g., favicon, index.html)
│── src/                       # Main source code
│   ├── assets/                # Images, icons, fonts, etc.
│   ├── components/            # Reusable UI components
│   │   ├── auth/              # Components for authentication (login, register)
│   │   ├── admin-view/        # Components for admin panel
│   │   ├── shopping-view/     # Components for shopping view
│   │   ├── common/            # Common components (buttons, headers, etc.)
│   ├── pages/                 # Main page components
│   │   ├── auth/              # Login, Register pages
│   │   ├── admin-view/        # Admin dashboard, orders, products
│   │   ├── shopping-view/     # Home, listing, checkout, account
│   │   ├── unauth-page/       # Unauthorized access page
│   ├── store/                 # Redux store, slices, actions
<!-- │   ├── hooks/                 # Custom hooks -->
<!-- │   ├── utils/                 # Utility functions/helpers -->
│   ├── App.jsx                # Main App component
│   ├── index.jsx              # Entry point of the app
│   ├── routes.jsx             # All route configurations
│   ├── main.css               # Global styles
│── .env                       # Environment variables (API keys, etc.)
│── .gitignore                 # Ignore unnecessary files
│── package.json               # Dependencies and scripts
│── README.md                  # Project documentation
│── vite.config.js             # Vite configuration file

Components---------------

auth---