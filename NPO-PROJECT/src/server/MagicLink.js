// magicLink.js
import { sendSignInLinkToEmail } from "firebase/auth";
import { auth } from "./AuthenticationConfig";

const actionCodeSettings = {
  url: window.location.origin + '/admin', // Къде ще те пренасочи линка
  handleCodeInApp: true,
};
export async function sendMagicLink(email) {
    try {
      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      window.localStorage.setItem("emailForSignIn", email); // 🔥 тази част е важна
      alert("Изпратихме ти линк за вход на имейла!");
    } catch (error) {
      alert("Грешка при изпращане: " + error.message);
    }
  }