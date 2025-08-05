import React, { useEffect, useState } from 'react';
import { auth, database } from '../../server/AuthenticationConfig';
import { onAuthStateChanged } from "firebase/auth";
import { ref, onValue, push, update, remove, ref as dbRef } from "firebase/database";
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

function ManageContacts() {
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        const contactsRef = ref(database, 'contacts');
        const unsubscribeContacts = onValue(contactsRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const contactsArray = Object.entries(data)
                    .map(([id, contact]) => ({
                        id,
                        ...contact
                    }))
                    .filter(contact => !contact.replied);

                setContacts(contactsArray);
            } else {
                setContacts([]);
            }
        }, (error) => {
            console.error('Failed to read contacts:', error);
        });

        return () => unsubscribeContacts();
    }, []);

    const handleReplyClick = async (contact) => {
        const mailtoLink = `mailto:${contact.email}?subject=${encodeURIComponent('Re: ' + (contact.subject || ''))}&body=${encodeURIComponent('\n\n\n---\nТова е отговор на вашето запитване:\n' + (contact.description || ''))}`;
        window.location.href = mailtoLink;

        try {
            const contactRef = dbRef(database, `contacts/${contact.id}`);
            await update(contactRef, { replied: true });
        } catch (err) {
            console.error("Failed to update contact as replied:", err);
        }
    };

    return (
        <>
            <h2 className="mt-6 text-xl font-semibold">Запитвания от контактната форма</h2>
            {contacts.length === 0 ? (
                <p>Няма нови запитвания.</p>
            ) : (
                contacts.map(contact => (
                    <div key={contact.id} style={{ border: '1px solid #ccc', padding: 12, marginBottom: 10, borderRadius: 5 }}>
                        <p><strong>Тема:</strong> {contact.subject || 'Без тема'}</p>
                        <p><strong>Име:</strong> {contact.firstName || ''} {contact.lastName || ''}</p>
                        <p><strong>Email:</strong> {contact.email || 'Не е посочен'}</p>
                        <p><strong>Съобщение:</strong> {contact.description || ''}</p>
                        <p><small>Изпратено на: {contact.timestamp ? new Date(contact.timestamp).toLocaleString() : 'Дата неизвестна'}</small></p>
                        <button onClick={() => handleReplyClick(contact)}>Отговори</button>
                    </div>
                ))
            )}
        </>
    );
}

function ManageEvents() {
    const [events, setEvents] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        startDateTime: '',
        endDateTime: '',
        description: ''
    });
    const [editingId, setEditingId] = useState(null);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState(null);
    const [confirmDelete, setConfirmDelete] = useState({ show: false, eventId: null });

    useEffect(() => {
        const eventsRef = ref(database, 'events');
        const unsubscribe = onValue(eventsRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const eventsArray = Object.entries(data).map(([id, event]) => ({
                    id,
                    ...event
                }));
                eventsArray.sort((a, b) => new Date(a.startDateTime) - new Date(b.startDateTime));
                setEvents(eventsArray);
            } else {
                setEvents([]);
            }
        });

        return () => unsubscribe();
    }, []);

    const resetForm = () => {
        setFormData({
            title: '',
            startDateTime: '',
            endDateTime: '',
            description: ''
        });
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
            const eventData = {
                title: formData.title,
                startDateTime: new Date(formData.startDateTime).toISOString(),
                endDateTime: new Date(formData.endDateTime).toISOString(),
                description: formData.description
            };

            if (editingId) {
                await update(ref(database, 'events/' + editingId), {
                    ...eventData,
                    updatedAt: Date.now()
                });
                setMessage('Събитието е обновено успешно!');
            } else {
                await push(ref(database, 'events'), {
                    ...eventData,
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
            startDateTime: new Date(event.startDateTime).toISOString().slice(0, 16),
            endDateTime: new Date(event.endDateTime).toISOString().slice(0, 16),
            description: event.description || ''
        });
        setEditingId(event.id);
        setMessage(null);
    };

    // Show the confirmation modal and store the id to delete
    const handleDeleteClick = (id) => {
        setConfirmDelete({ show: true, eventId: id });
    };

    // Confirm deletion: delete event and close modal
    const confirmDeleteEvent = async () => {
        const id = confirmDelete.eventId;
        setConfirmDelete({ show: false, eventId: null });

        try {
            await remove(ref(database, 'events/' + id));
            setMessage('Събитието е изтрито успешно!');
            if (editingId === id) resetForm();
        } catch {
            setMessage('Грешка при изтриването. Опитайте отново.');
        }
    };

    // Cancel deletion: just close modal
    const cancelDelete = () => {
        setConfirmDelete({ show: false, eventId: null });
    };

    return (
        <div className="max-w-xl mx-auto p-6 bg-white dark:bg-gray-900 text-black dark:text-white rounded shadow relative">
            <h2 className="mb-4 text-xl font-semibold">
                {editingId ? 'Редактирай събитие' : 'Създаване на ново събитие'}
            </h2>

            <form onSubmit={handleSubmit} className="mb-8 space-y-4">
                <div>
                    <label className="block font-medium mb-1">Заглавие:</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded px-3 py-2 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                    />
                </div>
                <div>
                    <label className="block font-medium mb-1">Начална дата и час:</label>
                    <input
                        type="datetime-local"
                        name="startDateTime"
                        value={formData.startDateTime || ''}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded px-3 py-2 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                    />
                </div>

                <div className="mt-4">
                    <label className="block font-medium mb-1">Крайна дата и час:</label>
                    <input
                        type="datetime-local"
                        name="endDateTime"
                        value={formData.endDateTime || ''}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded px-3 py-2 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                    />
                </div>

                <div>
                    <label className="block font-medium mb-1">Описание:</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={4}
                        className="w-full border border-gray-300 rounded px-3 py-2 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                    />
                </div>
                <div className="flex items-center space-x-4">
                    <button
                        type="submit"
                        disabled={saving}
                        className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded disabled:opacity-50"
                    >
                        {saving ? 'Запазване...' : (editingId ? 'Обнови събитието' : 'Създай събитието')}
                    </button>
                    {editingId && (
                        <button
                            type="button"
                            onClick={resetForm}
                            className="bg-gray-300 hover:bg-gray-400 text-black font-semibold px-4 py-2 rounded"
                        >
                            Отказ
                        </button>
                    )}
                </div>
            </form>

            {message && <p className="mb-6 text-green-700 dark:text-green-400">{message}</p>}

            <h3 className="mb-2 text-lg font-semibold">Списък със събития</h3>
            {events.length === 0 ? (
                <p>Все още няма създадени събития.</p>
            ) : (
                <ul className="space-y-4">
                    {events.map(event => (
                        <li
                            key={event.id}
                            className="border border-gray-300 dark:border-gray-700 rounded p-4 bg-gray-50 dark:bg-gray-800"
                        >
                            <p className="font-semibold">{event.title}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                                {new Date(event.startDateTime).toLocaleString()} – {new Date(event.endDateTime).toLocaleString()}
                            </p>

                            <p className="mt-2">{event.description}</p>
                            <div className="mt-4 space-x-4">
                                <button
                                    onClick={() => handleEdit(event)}
                                    className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-3 py-1 rounded"
                                >
                                    Редактирай
                                </button>
                                <button
                                    onClick={() => handleDeleteClick(event.id)}
                                    className="bg-red-500 hover:bg-red-600 text-white font-medium px-3 py-1 rounded"
                                >
                                    Изтрий
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}

            {/* Confirmation modal */}
            {confirmDelete.show && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white dark:bg-gray-900 p-6 rounded shadow max-w-sm w-full">
                        <p className="mb-4 text-black dark:text-white">
                            Сигурни ли сте, че искате да изтриете това събитие?
                        </p>
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={confirmDeleteEvent}
                                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                            >
                                Да
                            </button>
                            <button
                                onClick={cancelDelete}
                                className="px-4 py-2 bg-gray-500 rounded hover:bg-gray-400"
                            >
                                Откажи
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AdminPage;
