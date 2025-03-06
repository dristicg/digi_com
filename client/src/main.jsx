
import { BrowserRouter } from 'react-router-dom'; // Ensure correct import
import ReactDOM from 'react-dom/client';
import App from './App.jsx'
import { Provider } from "react-redux";
import store from "./store/store.js";
import { Toaster } from "sonner";


ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    <Toaster richColors position="top-right" />
  </Provider>
);


