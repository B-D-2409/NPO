import React from 'react';
import { database } from '../../server/AuthenticationConfig';
import { ref, push, set } from "firebase/database";
import { toast } from 'react-toastify';
import { useFormValidation } from '../../Components/Common/Validation';

function Contacts() {
    const {
        formData: contactForm,
        setFormData: setContactForm,
        loading,
        handleValidation,
    } = useFormValidation({
        subject: '',
        firstName: '',
        lastName: '',
        email: '',
        description: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        const errors = await handleValidation(async () => {
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

            toast.success("Вашето съобщение е изпратено успешно!");
            setContactForm({
                subject: '',
                firstName: '',
                lastName: '',
                email: '',
                description: ''
            });
        });

        if (errors.length > 0) {
            errors.forEach(err => toast.error(err));
        }
    };

    return (
        <div className="relative max-w-2xl mx-auto px-6 py-12 bg-white shadow-xl rounded-2xl
    dark:bg-black dark:border dark:border-gray-700 dark:shadow-lg overflow-visible">

            {/* glow effect layers */}
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-green-600 opacity-10 blur-2xl rounded-full pointer-events-none"></div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-red-600 opacity-10 blur-2xl rounded-full pointer-events-none"></div>

            <h1 className="text-3xl font-bold text-center mb-10 text-gray-800 dark:text-white">
                Контактна форма
            </h1>
            <form className="space-y-6" onSubmit={handleSubmit}>
                {/* Subject */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-100 mb-1">
                        Тема
                    </label>
                    <select
                        value={contactForm.subject}
                        onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-500 rounded-lg 
                            focus:ring-2 focus:ring-blue-500 focus:outline-none 
                            bg-white dark:bg-gray-800 text-black dark:text-white"
                    >
                        <option value="">Изберете тема</option>
                        <option value="General Inquiry">Обща информация</option>
                        <option value="Support">Помощ</option>
                        <option value="Feedback">Обратна Връзка</option>
                    </select>
                </div>

                {/* Name Fields */}
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-100 mb-1">Име</label>
                        <input
                            type="text"
                            value={contactForm.firstName}
                            onChange={(e) => setContactForm({ ...contactForm, firstName: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-500 rounded-lg 
                                focus:ring-2 focus:ring-blue-500 focus:outline-none 
                                bg-white dark:bg-gray-800 text-black dark:text-white"
                            placeholder="Име"
                        />
                    </div>
                    <div className="flex-1">
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-100 mb-1">Фамилия</label>
                        <input
                            type="text"
                            value={contactForm.lastName}
                            onChange={(e) => setContactForm({ ...contactForm, lastName: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-500 rounded-lg 
                                focus:ring-2 focus:ring-blue-500 focus:outline-none 
                bg-white dark:bg-gray-800 text-black dark:text-white"
                            placeholder="Фамилия"
                        />
                    </div>
                </div>

                {/* Email */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-100 mb-1">Email</label>
                    <input
                        type="email"
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-500 rounded-lg 
                        focus:ring-2 focus:ring-blue-500 focus:outline-none 
                            bg-white dark:bg-gray-800 text-black dark:text-white"
                        placeholder="Email"
                    />
                </div>

                {/* Description */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-100 mb-1">Описание</label>
                    <textarea
                        value={contactForm.description}
                        onChange={(e) => setContactForm({ ...contactForm, description: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-500 rounded-lg 
                            focus:ring-2 focus:ring-blue-500 focus:outline-none 
                    bg-white dark:bg-gray-800 text-black dark:text-white"
                        placeholder="Вашето съобщение"
                        rows={4}
                    />
                </div>

                {/* Submit Button */}
                <div className="text-center">
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full px-4 py-2 rounded font-semibold text-white transition-colors duration-300 ${loading
                            ? 'opacity-70 cursor-not-allowed'
                            : 'bg-green-600 hover:bg-green-700 dark:bg-gradient-to-r dark:from-green-600 dark:to-red-600 dark:hover:from-green-700 dark:hover:to-red-700'
                            }`}
                    >
                        {loading ? 'Изпращане...' : 'Изпрати'}
                    </button>
                </div>
            </form>
        </div>
    );



}

export default Contacts;
