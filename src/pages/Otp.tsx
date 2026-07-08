import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../components/layout/AuthLayout";
import Button from "../components/ui/Button";
import Navbar from "../components/layout/Navbar";
import loginImage from "../assets/images/login-image.png";
import { db } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";

function Otp() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const verifyOTP = async () => {
  try {
    setLoading(true);

    const confirmationResult = (window as any).confirmationResult;

    if (!confirmationResult) {
      alert("OTP session expired. Please login again.");
      navigate("/");
      return;
    }

    const result = await confirmationResult.confirm(otp);

    const user = result.user;

    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      navigate("/home");
    } else {
      navigate("/register");
    }
  } catch (error) {
    console.error(error);
    alert("Invalid OTP");
  } finally {
    setLoading(false);
  }
};

  return (
    <>
      <Navbar />
      <AuthLayout image={loginImage}>
        

      <h1 className="text-5xl font-bold mb-4">
        Verify OTP
      </h1>

      <p className="text-gray-500 mb-8">
        Enter the verification code
      </p>

      <input
        type="text"
        maxLength={6}
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        placeholder="Enter OTP"
        className="w-full h-12 rounded-lg border border-gray-300 px-4 focus:outline-none focus:border-indigo-600"
      />

      <div className="mt-6">
        <Button onClick={verifyOTP} disabled={loading}>
          {loading ? "Verifying..." : "Verify OTP"}
        </Button>
      </div>
    </AuthLayout>
    </>
  );
  
}

export default Otp;