import { auth } from "./firebase";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  signOut,
} from "firebase/auth";

let recaptchaVerifier: RecaptchaVerifier | null = null;

export const setupRecaptcha = async () => {
  if (recaptchaVerifier) return recaptchaVerifier;

  recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
    size: "invisible",
  });

  await recaptchaVerifier.render();

  return recaptchaVerifier;
};

export const sendOTP = async (phoneNumber: string) => {
  const appVerifier = await setupRecaptcha();

  return signInWithPhoneNumber(auth, phoneNumber, appVerifier);
};

export const logout = async () => {
  await signOut(auth);
};