// src/Components/Authentication/EmailLinkHandler.jsx
import { useEffect } from "react";
import { auth } from "../../server/AuthenticationConfig";
import { isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function EmailLinkHandler() {
    const navigate = useNavigate();

    useEffect(() => {
        async function completeSignIn() {
            if (isSignInWithEmailLink(auth, window.location.href)) {
                let email = window.localStorage.getItem('emailForSignIn');
                if (!email) {
                    email = window.prompt('Въведи имейла, с който си поискал входа');
                }

                try {
                    const result = await signInWithEmailLink(auth, email, window.location.href);
                    window.localStorage.removeItem('emailForSignIn');

                    const allowedEmails = [
                        "borislav.davidov.59@gmail.com",
                        "borislav.2404g@gmail.com",
                    ];

                    if (allowedEmails.includes(result.user.email)) {
                        navigate('/admin'); 
                    } else {
                    toast.error("Нямаш достъп.");
                        navigate('/admin/login');
                    }

                } catch (error) {
                    toast.error('Грешка: ' + error.message);
                    navigate('/');
                }
            } else {
                navigate('/');
            }
        }

        completeSignIn();
    }, [navigate]);

    return <p className="text-blue-600 text-xl">Входът се обработва...</p>;
}
