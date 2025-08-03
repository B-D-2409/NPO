import { auth, database } from '../../server/AuthenticationConfig';
import { onAuthStateChanged } from "firebase/auth";
import { ref, onValue } from "firebase/database";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

function AdminPage() {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [contacts, setContacts] = useState([]);
    const navigate = useNavigate();

    const allowedEmails = [
        "borislav.davidov.59@gmail.com",
        "borislav.2404g@gmail.com",
    ];

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser && allowedEmails.includes(currentUser.email)) {
                setUser(currentUser);
            } else {
                setUser(null);
                navigate('/admin/login');
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, [navigate]);

    useEffect(() => {
        if (!user) return;

        const contactsRef = ref(database, 'contacts');
        const unsubscribeContacts = onValue(contactsRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const contactsArray = Object.entries(data).map(([id, contact]) => ({
                    id,
                    ...contact
                }));
                setContacts(contactsArray);
            } else {
                setContacts([]);
            }
        });

        return () => unsubscribeContacts();
    }, [user]);

    const handleReplyClick = (contact) => {
        const mailtoLink = `mailto:${contact.email}?subject=${encodeURIComponent('Re: ' + (contact.subject || ''))}&body=${encodeURIComponent('\n\n\n---\nТова е отговор на вашето запитване:\n' + (contact.description || ''))}`;
        window.location.href = mailtoLink;
    };

    if (loading) {
        return <p style={{ fontSize: '20px', color: 'blue' }}>Зареждане...</p>;
    }

    if (!user) {
        return <p style={{ fontSize: '20px', color: 'red' }}>Нямаш достъп до тази страница.</p>;
    }

    return (
        <div style={{ maxWidth: 800, margin: 'auto', padding: 20 }}>
            <h1>Добре дошъл, администратор!</h1>
            <p>Потребител: {user.email}</p>

            <h2 className="mt-6 text-xl font-semibold">Запитвания от контактната форма</h2>
            {contacts.length === 0 ? (
                <p>Няма нови запитвания.</p>
            ) : (
                contacts.map(contact => (
                    <div key={contact.id} style={{ border: '1px solid #ccc', padding: 12, marginBottom: 10, borderRadius: 5 }}>
                        <p><strong>Тема:</strong> {contact.subject}</p>
                        <p><strong>Име:</strong> {contact.firstName} {contact.lastName}</p>
                        <p><strong>Email:</strong> {contact.email}</p>
                        <p><strong>Съобщение:</strong> {contact.description}</p>
                        <p><small>Изпратено на: {new Date(contact.timestamp).toLocaleString()}</small></p>
                        <button onClick={() => handleReplyClick(contact)}>Отговори</button>
                    </div>
                ))
            )}
        </div>
    );
}

export default AdminPage;
