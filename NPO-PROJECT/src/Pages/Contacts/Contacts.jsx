import React, { useState } from 'react';
import { database } from '../../server/AuthenticationConfig'; 
import { ref, push, set } from "firebase/database";

function Contacts() {
    const [contactForm, setContactForm] = useState({
        subject: '',
        firstName: '',
        lastName: '',
        email: '',
        description: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const contactRef = ref(database, 'contacts');
            const newContactRef = push(contactRef);

            await set(newContactRef, {
                subject: contactForm.subject,
                firstName: contactForm.firstName,
                lastName: contactForm.lastName,
                email: contactForm.email,
                description: contactForm.description,
                timestamp: new Date().toISOString()
            });

            alert("Съобщението беше изпратено успешно!");
            setContactForm({
                subject: '',
                firstName: '',
                lastName: '',
                email: '',
                description: ''
            });
        } catch (error) {
            console.error("Грешка при записване във Firebase:", error);
            alert("Възникна грешка при изпращането. Моля, опитайте отново.");
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-12">
            <h1 className="text-3xl font-bold mb-14">Контактна форма</h1>
            <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                    <label className="block text-sm font-medium mb-1">Тема</label>
                    <select
                        value={contactForm.subject}
                        onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                        className="w-full p-2 border rounded"
                    >
                        <option value="">Изберете тема</option>
                        <option value="General Inquiry">Обща информация</option>
                        <option value="Support">Помощ</option>
                        <option value="Feedback">Обратна Връзка</option>
                    </select>
                </div>

                <div className="flex space-x-2">
                    <div className="flex-1">
                        <label className="block text-sm font-medium mb-1">Име</label>
                        <input
                            type="text"
                            value={contactForm.firstName}
                            onChange={(e) => setContactForm({ ...contactForm, firstName: e.target.value })}
                            className="w-full p-2 border rounded"
                            placeholder="Име"
                        />
                    </div>
                    <div className="flex-1">
                        <label className="block text-sm font-medium mb-1">Фамилия</label>
                        <input
                            type="text"
                            value={contactForm.lastName}
                            onChange={(e) => setContactForm({ ...contactForm, lastName: e.target.value })}
                            className="w-full p-2 border rounded"
                            placeholder="Фамилия"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input
                        type="email"
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        className="w-full p-2 border rounded"
                        placeholder="Email Address"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Описание</label>
                    <textarea
                        value={contactForm.description}
                        onChange={(e) => setContactForm({ ...contactForm, description: e.target.value })}
                        className="w-full p-2 border rounded"
                        placeholder="Вашето съобщение"
                        rows={4}
                    />
                </div>

                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Изпрати
                </button>
            </form>
        </div>
    );
}

export default Contacts;
