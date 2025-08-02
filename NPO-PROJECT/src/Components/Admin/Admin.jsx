import { useEffect, useState } from "react";
import { auth } from '../../server/AuthenticationConfig';
import { isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

function AdminPage() {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const allowedEmails = [
        "borislav.davidov.59@gmail.com",
        "borislav.2404g@gmail.com",
    ];

    useEffect(() => {
        async function checkLink() {
            if (isSignInWithEmailLink(auth, window.location.href)) {
                let email = window.localStorage.getItem('emailForSignIn');
                if (!email) {
                    email = window.prompt('Въведи имейла, с който си поискал входа');
                }
                try {
                    const result = await signInWithEmailLink(auth, email, window.location.href);
                    window.localStorage.removeItem('emailForSignIn');

                    if (allowedEmails.includes(result.user.email)) {
                        setUser(result.user);
                    } else {
                        alert('Нямаш достъп.');
                        navigate('/admin/login'); // ако няма достъп, пренасочи към логин
                    }
                } catch (error) {
                    alert('Грешка при влизане: ' + error.message);
                    navigate('/admin/login'); // при грешка - връщай на логин
                }
            } else {
                setLoading(false);
            }
        }

        checkLink();
    }, [navigate]);

    if (loading) {
        return <p style={{ fontSize: '20px', color: 'blue' }}>Зареждане...</p>;
    }

    if (!user) {
        return <p style={{ fontSize: '20px', color: 'red' }}>Нямаш достъп до тази страница.</p>;
    }

    return (
        <div>
            <h1>Добре дошъл, администратор!</h1>
            <p>Потребител: {user.email}</p>
        </div>
    );
}

export default AdminPage;
