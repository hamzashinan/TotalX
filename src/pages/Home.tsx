import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

import { auth, db } from "../firebase/firebase";
import { logout } from "../firebase/auth";

import Navbar from "../components/layout/Navbar";
import Button from "../components/ui/Button";

function Home() {
  const navigate = useNavigate();

  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(true);

  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        navigate("/");
        return;
      }

      setPhone(user.phoneNumber || "");

      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setUserData(docSnap.data() as {
          firstName: string;
          lastName: string;
          email: string;
        });
      }

      setLoading(false);
    });

    return unsubscribe;
  }, [navigate]);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <>
      <Navbar />

      <div className="min-h-[calc(100vh-80px)] flex items-center justify-center">
        <div className="w-full max-w-md text-center">

          <h2 className="text-3xl font-bold">
            Welcome {userData.firstName} {userData.lastName}
          </h2>

          <p className="mt-4 text-gray-600">
            {userData.email}
          </p>

          <p className="mt-2 text-gray-600">
            {phone}
          </p>

          <div className="mt-8">
            <Button onClick={handleLogout}>
              Log Out
            </Button>
          </div>

        </div>
      </div>
    </>
  );
}

export default Home;