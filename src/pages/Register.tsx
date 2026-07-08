import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import AuthLayout from "../components/layout/AuthLayout";
import Button from "../components/ui/Button";
import registerImage from "../assets/images/register-image.png";
import { doc, setDoc } from "firebase/firestore";
import { db,auth } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/layout/Navbar";



type RegisterForm = {
  firstName: string;
  lastName: string;
  email: string;
  agree: boolean;
};

function Register() {

  const navigate = useNavigate();
 
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterForm>();

const onSubmit = async (data: RegisterForm) => {
  try {
    const user = auth.currentUser;

    if (!user) {
      alert("User not authenticated");
      return;
    }

    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      phone: user.phoneNumber,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      agree: data.agree,
      createdAt: new Date(),
    });

    alert("Registration Successful!");

    navigate("/home");
  } catch (error) {
    console.error(error);
    alert("Registration Failed");
  }
};

  return (
    <>
      <Navbar />
    <AuthLayout image={registerImage}>
      <h1 className="text-5xl font-bold mb-3">
        Sign up
      </h1>

      <p className="text-gray-500 mb-8">
        Let's get you all set up so you can access your personal account.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

        <div className="grid grid-cols-2 gap-4">

          <div>
            <input
              type="text"
              placeholder="First Name"
              className="w-full h-12 rounded-lg border px-4"
              {...register("firstName", {
                required: "First name is required",
              })}
            />

            {errors.firstName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.firstName.message}
              </p>
            )}
          </div>

          <div>
            <input
              type="text"
              placeholder="Last Name"
              className="w-full h-12 rounded-lg border px-4"
              {...register("lastName", {
                required: "Last name is required",
              })}
            />

            {errors.lastName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.lastName.message}
              </p>
            )}
          </div>

        </div><br></br>

        <div>
          <input
            type="email"
            placeholder="Email"
            className="w-full h-12 rounded-lg border px-4"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email",
              },
            })}
          />

          {errors.email && (
            <p className="text-red-500 text-sm mt-1">
              {errors.email.message}
            </p>
          )}
        </div><br></br>

        <label className="flex items-center gap-3 text-sm">
          <input
            type="checkbox"
            {...register("agree", {
              required: "Please accept terms",
            })}
          />

          <span>
            I agree to all the{" "}
            <span className="text-indigo-600">
              Terms
            </span>{" "}
            and{" "}
            <span className="text-indigo-600">
              Privacy Policies
            </span>
          </span>
        </label>

        {errors.agree && (
          <p className="text-red-500 text-sm">
            {errors.agree.message}
          </p>
        )}
       <br></br>
        <Button disabled={isSubmitting}>
          Create account
        </Button>

      </form>

      <p className="text-center mt-6 text-sm">
        Already have an account?{" "}
        <Link
          to="/"
          className="text-indigo-600 font-semibold"
        >
          Login
        </Link>
      </p>
    </AuthLayout>
    </>
  );
}

export default Register;