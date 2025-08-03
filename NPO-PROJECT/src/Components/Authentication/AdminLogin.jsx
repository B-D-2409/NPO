import { useState } from "react";
import { sendMagicLink } from "../../server/MagicLink";

export default function AdminLogin() {
    const [email, setEmail] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        window.localStorage.setItem('emailForSignIn', email);
        sendMagicLink(email);
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 max-w-sm mx-auto">
            <h2 className="text-xl font-bold mb-4">Вход за админ</h2>
            <input
                type="email"
                placeholder="Въведи имейл"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border p-2 w-full mb-4"
            />
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                Изпрати линк за вход
            </button>
        </form>
    );
}
