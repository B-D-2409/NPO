// magicLink.js
import { sendSignInLinkToEmail } from "firebase/auth";
import { auth } from "./AuthenticationConfig";

const actionCodeSettings = {
    url: 'http://localhost:5173/email-link',
    handleCodeInApp: true
};


export async function sendMagicLink(email) {
    try {
        await sendSignInLinkToEmail(auth, email, actionCodeSettings);
        window.localStorage.setItem("emailForSignIn", email);
        toast.success("Изпратихме ти линк за вход на имейла!");
    } catch (error) {
        console.error("Magic link sending error:", error);
        toast.error("Грешка при изпращане: " + error.message);
    }

}