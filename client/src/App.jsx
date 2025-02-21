
// import { Route, Routes } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AuthLayout from "./components/auth/layout";
import AuthLogin from "./pages/auth/login";
import AuthRegister from "./pages/auth/register";
import AdminLayout from "./components/admin-view/layout";
import AdminDashboard from "./pages/admin-view/dashboard";
import AdminProducts from "./pages/admin-view/products.jsx";
import AdminOrders from "./pages/admin-view/orders";
import AdminFeatures from "./pages/admin-view/features";
import NotFound from "./pages/notFound/index";
import ShoppingLayout from "./components/shopping-view/layout";
import ShoppingHome from "./pages/shopping-view/home";
import ShoppingListing from "./pages/shopping-view/listing";
import ShoppingCheckout from "./pages/shopping-view/checkout";
import ShoppingAccount from "./pages/shopping-view/account";
import CheckAuth from "./components/common/check-auth";
import UnauthPage from "./pages/unauth-page/index";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
//  import { checkAuth } from "./store/auth-slice/index"; // Ensure the correct path
//  import { Navigate } from "react-router-dom";
import PrivateRoutes from "./components/common/PrivateRoutes";
import "./App.css";



 function PrivateRoute({ children }) {
  const { user } = useSelector((state) => state.auth); // Check if user is logged in
  return user ? children : <Navigate to="/auth/login" />;
}

function App() {

  // const { user, isAuthenticated, isLoading } = useSelector(
  //   (state) => state.auth
  // );
  // for testing 
  const { user, isAuthenticated } = useSelector((state) => state.auth);
const isLoading = false; // Force it to false


  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(checkAuth());
  // }, [dispatch]);

  if (isLoading) console.log("Still Loading...");


  

  return (
    <div className="flex flex-col overflow-hidden bg-white">
      {/* <h1>Header Components</h1> */}

      <Routes>
        <Route
          path="/auth"
          element={
              <AuthLayout />
          }
        >
          <Route path="login" element={<AuthLogin />} />
          <Route path="register" element={<AuthRegister />} />
        </Route>

        <Route path="/admin" element={<AdminLayout />} >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="features" element={<AdminFeatures />} />
        </Route>


        <Route
          path="/shop"
          element={
            <PrivateRoute>
            
              <ShoppingLayout />
            
            </PrivateRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
        <Route path="/unauth-page" element={<UnauthPage />} />


        <Route path="home" element={<ShoppingHome />} />
        <Route path="listing" element={<ShoppingListing />} />
        <Route path="checkout" element={<ShoppingCheckout />} />
        <Route path="account" element={<ShoppingAccount />} />

      </Routes>

{/* <Routes>
  <Route
    path="/auth"
    element={
      console.log("Rendering AuthLayout") || (
        <CheckAuth isAuthenticated={isAuthenticated} user={user}>
          <AuthLayout />
        </CheckAuth>
      )
    }
  >
    <Route path="login" element={console.log("Rendering AuthLogin") || <AuthLogin />} />
    <Route path="register" element={console.log("Rendering AuthRegister") || <AuthRegister />} />
  </Route>

  <Route
    path="/admin"
    element={
      console.log("Rendering AdminLayout") || (
        <CheckAuth isAuthenticated={isAuthenticated} user={user}>
          <AdminLayout />
        </CheckAuth>
      )
    }
  >
    <Route path="dashboard" element={console.log("Rendering AdminDashboard") || <AdminDashboard />} />
    <Route path="products" element={console.log("Rendering AdminProducts") || <AdminProducts />} />
    <Route path="orders" element={console.log("Rendering AdminOrders") || <AdminOrders />} />
    <Route path="features" element={console.log("Rendering AdminFeatures") || <AdminFeatures />} />
  </Route>

  <Route
    path="/shop"
    element={
      console.log("Rendering ShoppingLayout") || (
        <CheckAuth isAuthenticated={isAuthenticated} user={user}>
          <ShoppingLayout />
        </CheckAuth>
      )
    }
  />
  
  <Route path="*" element={console.log("Rendering NotFound") || <NotFound />} />
  <Route path="/unauth-page" element={console.log("Rendering UnauthPage") || <UnauthPage />} />
  
  <Route path="home" element={console.log("Rendering ShoppingHome") || <ShoppingHome />} />
  <Route path="listing" element={console.log("Rendering ShoppingListing") || <ShoppingListing />} />
  <Route path="checkout" element={console.log("Rendering ShoppingCheckout") || <ShoppingCheckout />} />
  <Route path="account" element={console.log("Rendering ShoppingAccount") || <ShoppingAccount />} />
</Routes> */}


    </div>
  )
}

export default App
