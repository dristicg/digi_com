import CommonForm from "@/components/common/form";
import { loginFormControls } from "@/config";
// import { loginUser } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";


const initialState = {
  email: "",
  password: "",
};

function AuthLogin() {
  const [formData, setFormData] = useState(initialState)
  const dispatch = useDispatch();

  function onSubmit(event) {
    event.preventDefault();


    dispatch(loginUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: data?.payload?.message,
        });
      } else {
        toast({
          title: data?.payload?.message,
          variant: "destructive",
        });
      }
    });

  }




  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", formData, {
        withCredentials: true,
      });
      console.log("Login Response:", response.data);
      if (response.data.success) {
        localStorage.setItem("token", response.data.token);  // ✅ Storing token
        dispatch(loginUser(response.data));  // ✅ Updating Redux state
        alert("Login Successful");
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Login Error:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Login failed");
    }
  };


  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Create new account
        </h1>
        <p className="mt-2">
          Already have an account
          <Link
            className="font-medium ml-2 text-primary hover:underline"
            to="/auth/login"
          >
            Login
          </Link>
        </p>
      </div>
      console.log("formControls in login.jsx:", loginFormControls); // Debugging log

      <CommonForm
        formControls={loginFormControls}
        buttonText={"Sign Up"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  );
}

export default AuthLogin;