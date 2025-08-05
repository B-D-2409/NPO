import { useState } from "react";
import { sendMagicLink } from "../../server/MagicLink";

export default function AdminLogin() {
    const [email, setEmail] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        window.localStorage.setItem("emailForSignIn", email);
        sendMagicLink(email);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-black">
            <form
                onSubmit={handleSubmit}
                className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg w-full max-w-sm"
            >
                <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
                    Вход за админ
                </h2>
                <input
                    type="email"
                    placeholder="Въведи имейл"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full p-2 mb-4 border border-gray-300 rounded 
                            bg-white text-black placeholder-gray-500
                            dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 dark:border-gray-600
                            focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    type="submit"
                    className="
    w-full 
    text-white 
    px-4 py-2 
    rounded 
    transition-colors duration-300
    bg-gradient-to-r from-green-600 to-red-600
    hover:from-green-700 hover:to-red-700"
                >
                    Изпрати линк за вход
                </button>

            </form>
        </div>
    );
}
