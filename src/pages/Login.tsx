import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";

import { auth } from "../firebase/firebase";
import { sendOTP } from "../firebase/auth";
import AuthLayout from "../components/layout/AuthLayout";
import Button from "../components/ui/Button";
import { Link } from "react-router-dom";
import loginImage from "../assets/images/login-image.png";
import Navbar from "../components/layout/Navbar";



type LoginForm = {
  phone: string;
};

function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/home");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>();

  const onSubmit = async (data: LoginForm) => {
    try {
      const confirmation = await sendOTP("+91" + data.phone);

      (window as any).confirmationResult = confirmation;

      navigate("/otp");
    } catch (err) {
      alert("Failed to send OTP");
      console.error(err);
    }
  };

  return (
    <>
      <Navbar />
   <AuthLayout image={loginImage}>
   

      <h1 className="text-[48px] font-bold leading-tight">
  Login
</h1>

<p className="mt-2 text-sm text-gray-500">
  Login to access your TotalX account
</p><br></br>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
        <input
          type="text"
          placeholder="Enter mobile number"
          className="h-12 w-full rounded-md border border-gray-300 px-4 text-sm focus:border-indigo-500 focus:outline-none"
          {...register("phone", {
            required: "Phone number is required",
            pattern: {
              value: /^[6-9]\d{9}$/,
              message: "Enter a valid 10-digit phone number",
            },
          })}
        />
        

        {errors.phone && (
          <p className="text-red-500 mt-2">
            {errors.phone.message}
          </p>
        )} 
        

        <div  className="h-12 w-full rounded-md">
          <Button disabled={isSubmitting}>
            {isSubmitting ? "Sending..." : "Get OTP"}
          </Button>
        </div><br></br>
      </form>

      <p className="mt-6 text-center text-sm text-gray-600">
        Don't have an account?
        <Link to="/register"className="text-indigo-600 ml-1 font-semibold">
       Sign Up
       </Link>
      </p>

      <div id="recaptcha-container"></div>
    </AuthLayout>
    </>
  );
}

export default Login;