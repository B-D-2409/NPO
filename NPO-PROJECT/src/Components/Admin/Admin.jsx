import { auth, database } from '../../server/AuthenticationConfig';
import { onAuthStateChanged } from "firebase/auth";
import { ref, onValue, push } from "firebase/database";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

function AdminPage() {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [activeSection, setActiveSection] = useState('contacts');
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

    if (loading) {
        return <p style={{ fontSize: '20px', color: 'blue' }}>Зареждане...</p>;
    }

    if (!user) {
        return <p style={{ fontSize: '20px', color: 'red' }}>Нямаш достъп до тази страница.</p>;
    }

    return (
        <div style={{ maxWidth: 900, margin: 'auto', padding: 20, display: 'flex', gap: 20 }}>
            {/* Sidebar */}
            <nav style={{ flexBasis: '200px', borderRight: '1px solid #ccc', paddingRight: 20 }}>
                <h2>Админ меню</h2>
                <button
                    onClick={() => setActiveSection('contacts')}
                    style={{
                        display: 'block',
                        width: '100%',
                        marginBottom: 10,
                        padding: 8,
                        backgroundColor: activeSection === 'contacts' ? '#8BC34A' : '',
                        color: activeSection === 'contacts' ? 'white' : '',
                        border: 'none',
                        cursor: 'pointer',
                    }}
                >
                    Запитвания
                </button>
                <button
                    onClick={() => setActiveSection('events')}
                    style={{
                        display: 'block',
                        width: '100%',
                        padding: 8,
                        backgroundColor: activeSection === 'events' ? '#8BC34A' : '',
                        color: activeSection === 'events' ? 'white' : '',
                        border: 'none',
                        cursor: 'pointer',
                    }}
                >
                    Създай събитие
                </button>
            </nav>

            {/* Main Content */}
            <main style={{ flexGrow: 1 }}>
                <h1>Добре дошъл, администратор!</h1>
                <p>Потребител: {user.email}</p>

                {activeSection === 'contacts' && <ManageContacts />}
                {activeSection === 'events' && <ManageEvents />}
            </main>
        </div>
    );
}

// ManageContacts component (your current contacts code moved here)
function ManageContacts() {
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
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
    }, []);

    const handleReplyClick = (contact) => {
        const mailtoLink = `mailto:${contact.email}?subject=${encodeURIComponent('Re: ' + (contact.subject || ''))}&body=${encodeURIComponent('\n\n\n---\nТова е отговор на вашето запитване:\n' + (contact.description || ''))}`;
        window.location.href = mailtoLink;
    };

    return (
        <>
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
        </>
    );
}

// ManageEvents component with simple Create Event form
function ManageEvents() {
    const [events, setEvents] = useState([]);
    const [formData, setFormData] = useState({ title: '', date: '', description: '' });
    const [editingId, setEditingId] = useState(null);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        const eventsRef = ref(database, 'events');
        const unsubscribe = onValue(eventsRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const eventsArray = Object.entries(data).map(([id, event]) => ({
                    id,
                    ...event
                }));
                // Sort events by date ascending
                eventsArray.sort((a, b) => new Date(a.date) - new Date(b.date));
                setEvents(eventsArray);
            } else {
                setEvents([]);
            }
        });

        return () => unsubscribe();
    }, []);

    const resetForm = () => {
        setFormData({ title: '', date: '', description: '' });
        setEditingId(null);
        setMessage(null);
    };

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setMessage(null);

        try {
            if (editingId) {
                // Update existing event
                await update(ref(database, 'events/' + editingId), {
                    title: formData.title,
                    date: formData.date,
                    description: formData.description,
                    updatedAt: Date.now()
                });
                setMessage('Събитието е обновено успешно!');
            } else {
                // Create new event
                await push(ref(database, 'events'), {
                    title: formData.title,
                    date: formData.date,
                    description: formData.description,
                    createdAt: Date.now()
                });
                setMessage('Събитието е създадено успешно!');
            }
            resetForm();
        } catch (error) {
            setMessage('Грешка при запазване. Опитайте отново.');
        }
        setSaving(false);
    };

    const handleEdit = (event) => {
        setFormData({
            title: event.title,
            date: event.date,
            description: event.description || ''
        });
        setEditingId(event.id);
        setMessage(null);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Сигурни ли сте, че искате да изтриете това събитие?')) {
            try {
                await remove(ref(database, 'events/' + id));
                setMessage('Събитието е изтрито успешно!');
                if (editingId === id) resetForm();
            } catch {
                setMessage('Грешка при изтриването. Опитайте отново.');
            }
        }
    };

    return (
        <div style={{ maxWidth: 600 }}>
            <h2 className="mb-4 text-xl font-semibold">{editingId ? 'Редактирай събитие' : 'Създаване на ново събитие'}</h2>

            <form onSubmit={handleSubmit} style={{ marginBottom: 30 }}>
                <label>
                    Заглавие:<br />
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', marginBottom: 12, padding: 8 }}
                    />
                </label>
                <label>
                    Дата:<br />
                    <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', marginBottom: 12, padding: 8 }}
                    />
                </label>
                <label>
                    Описание:<br />
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={4}
                        style={{ width: '100%', marginBottom: 12, padding: 8 }}
                    />
                </label>
                <button type="submit" disabled={saving} style={{ padding: '8px 16px' }}>
                    {saving ? 'Запазване...' : (editingId ? 'Обнови събитието' : 'Създай събитието')}
                </button>
                {editingId && (
                    <button
                        type="button"
                        onClick={resetForm}
                        style={{ marginLeft: 10, padding: '8px 16px', backgroundColor: '#ccc', border: 'none', cursor: 'pointer' }}
                    >
                        Отказ
                    </button>
                )}
            </form>

            {message && <p style={{ marginBottom: 20 }}>{message}</p>}

            <h3 className="mb-2 text-lg font-semibold">Списък със събития</h3>
            {events.length === 0 ? (
                <p>Все още няма създадени събития.</p>
            ) : (
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {events.map(event => (
                        <li key={event.id} style={{ border: '1px solid #ccc', padding: 12, marginBottom: 10, borderRadius: 5 }}>
                            <p><strong>{event.title}</strong></p>
                            <p><em>{new Date(event.date).toLocaleDateString()}</em></p>
                            <p>{event.description}</p>
                            <button onClick={() => handleEdit(event)} style={{ marginRight: 10 }}>Редактирай</button>
                            <button onClick={() => handleDelete(event.id)} style={{ color: 'red' }}>Изтрий</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default AdminPage;
