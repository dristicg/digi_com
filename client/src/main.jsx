import { BrowserRouter } from 'react-router-dom'; // Ensure correct import
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from "react-redux";
import store from "./store/store.js";
import { Toaster } from "sonner";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
      <Toaster richColors position="top-right" />
    </Provider>
  </BrowserRouter>
);


// import { createRoot } from "react-dom/client";
// import App from "./App.jsx";
// import "./index.css";
// import { BrowserRouter } from "react-router-dom";
// import { Provider } from "react-redux";
// import store from "./store/store.js";
// import { Toaster } from "./components/ui/toaster.jsx";

// createRoot(document.getElementById("root")).render(
//   <BrowserRouter>
//     <Provider store={store}>
//       <App />
//       <Toaster />
//     </Provider>
//   </BrowserRouter>
// );