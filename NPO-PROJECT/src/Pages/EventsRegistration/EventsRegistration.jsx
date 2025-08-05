import { useState, useEffect } from "react";
import { database } from '../../server/AuthenticationConfig';
import { toast } from "react-toastify";
import { useFormValidation } from "../../Components/Common/Validation";
import { ref, onValue } from "firebase/database";
function EventsRegistration() {

    const [events, setEvents] = useState([]);
    const {
        formData: registrationForm,
        setFormData: setRegistrationForm,
        loading,
        handleValidation
    } = useFormValidation({
        firstName: '',
        lastName: '',
        email: '',
        event: '',
        comments: ''
    })

    useEffect(() => {
        const eventsRef = ref(database, 'events'); 

        const unsubscribe = onValue(eventsRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const eventsArray = Object.entries(data).map(([id, event]) => ({
                    id,
                    ...event,
                }));

                eventsArray.sort((a, b) => new Date(a.startDateTime) - new Date(b.startDateTime));

                setEvents(eventsArray);
            } else {
                setEvents([]);
            }
        });

        return () => unsubscribe();
    }, []);

    const handleSubmitForm = async (e) => {
        e.preventDefault();

        const errors = await handleValidation(async () => {
            const registrationRef = database.ref('registrations');
            const newRegistrationRef = registrationRef.push();
            await newRegistrationRef.set({
                firstName: registrationForm.firstName,
                lastName: registrationForm.lastName,
                email: registrationForm.email,
                event: registrationForm.event,
                comments: registrationForm.comments,
                timestamp: new Date().toISOString()
            });

            toast.success("Регистрацията е успешна!");
            setRegistrationForm({
                firstName: '',
                lastName: '',
                email: '',
                event: '',
                comments: ''
            });
        });

        if (errors.length > 0) {
            errors.forEach(err => toast.error(err));
        }
    };



    return (
        <div className="max-w-2xl mx-auto px-6 py-12 bg-white dark:bg-gray-900 shadow-xl dark:shadow-gray-800 rounded-2xl">
            <h1 className="text-3xl font-bold text-center mb-10 text-gray-800 dark:text-gray-100">
                Записване за Семинар
            </h1>
            <form
                onSubmit={handleSubmitForm}
                className="space-y-5 bg-white dark:bg-gray-800 p-8 rounded shadow-md border border-gray-200 dark:border-gray-700"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                            Име
                        </label>
                        <input
                            type="text"
                            value={registrationForm.firstName}
                            onChange={(e) =>
                                setRegistrationForm({ ...registrationForm, firstName: e.target.value })
                            }
                            className="w-full border border-gray-300 dark:border-gray-600 p-2 rounded bg-white dark:bg-gray-700 text-black dark:text-white"
                            placeholder="Име"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                            Фамилия
                        </label>
                        <input
                            type="text"
                            value={registrationForm.lastName}
                            onChange={(e) =>
                                setRegistrationForm({ ...registrationForm, lastName: e.target.value })
                            }
                            className="w-full border border-gray-300 dark:border-gray-600 p-2 rounded bg-white dark:bg-gray-700 text-black dark:text-white"
                            placeholder="Фамилия"
                        />
                    </div>
                </div>

                <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                        Имейл
                    </label>
                    <input
                        type="email"
                        value={registrationForm.email}
                        onChange={(e) =>
                            setRegistrationForm({ ...registrationForm, email: e.target.value })
                        }
                        className="w-full border border-gray-300 dark:border-gray-600 p-2 rounded bg-white dark:bg-gray-700 text-black dark:text-white"
                        placeholder="your@email.com"
                    />
                </div>

                <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                        Избери събитие
                    </label>
                    <select
                        value={registrationForm.event}
                        onChange={(e) =>
                            setRegistrationForm({ ...registrationForm, event: e.target.value })
                        }
                        className="w-full border border-gray-300 dark:border-gray-600 p-2 rounded bg-white dark:bg-gray-700 text-black dark:text-white"
                    >
                        <option value="">-- Изберете --</option>
                        {events.map((event) => (
                            <option key={event.id} value={event.title || event.name}>
                                {event.title || event.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                        Коментари
                    </label>
                    <textarea
                        value={registrationForm.comments}
                        onChange={(e) =>
                            setRegistrationForm({ ...registrationForm, comments: e.target.value })
                        }
                        className="w-full border border-gray-300 dark:border-gray-600 p-2 rounded bg-white dark:bg-gray-700 text-black dark:text-white"
                        rows={4}
                        placeholder="Допълнителна информация (незадължително)"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full px-4 py-2 rounded font-semibold text-white transition-colors duration-300 ${loading
                        ? 'opacity-70 cursor-not-allowed'
                        : 'bg-green-600 hover:bg-green-700 dark:bg-gradient-to-r dark:from-green-600 dark:to-red-600 dark:hover:from-green-700 dark:hover:to-red-700'
                        }`}
                >
                    {loading ? 'Изпращане...' : 'Регистрирай се'}
                </button>
            </form>
        </div>
    );

}
export default EventsRegistration;