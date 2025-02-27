const PrivateRoutes = () => {
    const { user } = useSelector((state) => state.auth);
  
    return user ? <Outlet /> : <Navigate to="/auth/login" />;
  };
  
  export default PrivateRoutes;