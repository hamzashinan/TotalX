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
   

      <h1 className="text-5xl font-bold mb-4">
        Login
      </h1>

      <p className="text-gray-500 mb-8">
        Login to access your TotalX account
      </p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="Enter mobile number"
          className="w-full h-12 rounded-lg border px-4"
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

        <div className="mt-6">
          <Button disabled={isSubmitting}>
            {isSubmitting ? "Sending..." : "Get OTP"}
          </Button>
        </div>
      </form>

      <p className="mt-8 text-center text-sm">
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