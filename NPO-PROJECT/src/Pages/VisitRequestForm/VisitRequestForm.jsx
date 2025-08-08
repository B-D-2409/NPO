import React, { useEffect, useState } from "react";
import { ref, get, set, update, onValue } from "firebase/database";
import { database } from "../../server/AuthenticationConfig";

function VisitRequestForm() {
    const [carVotes, setCarVotes] = useState({ ferrari: 0, mclaren: 0 });
    const [city, setCity] = useState("");
    const [topCities, setTopCities] = useState([]);
    const [selectedCar, setSelectedCar] = useState("ferrari");

    const handleVote = async (e) => {
        e.preventDefault();

        // Update local car votes
        setCarVotes((prev) => ({
            ...prev,
            [selectedCar]: prev[selectedCar] + 1,
        }));

        // Update city vote in Realtime Database
        const trimmedCity = city.trim().toLowerCase();
        if (trimmedCity) {
            const cityRef = ref(database, `cityVotes/${trimmedCity}`);

            const snapshot = await get(cityRef);
            const currentVotes = snapshot.exists() ? snapshot.val() : 0;

            await set(cityRef, currentVotes + 1);

            setCity("");
            fetchTopCities(); // refresh
        }
    };

    const fetchTopCities = async () => {
        const cityVotesRef = ref(database, "cityVotes");

        const snapshot = await get(cityVotesRef);
        const data = snapshot.val() || {};

        const sorted = Object.entries(data)
            .map(([name, votes]) => ({ name, votes }))
            .sort((a, b) => b.votes - a.votes)
            .slice(0, 5);

        setTopCities(sorted);
    };

    useEffect(() => {
        fetchTopCities();
    }, []);
    return (
        <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white p-6 transition-colors duration-300">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-extrabold text-red-600 dark:text-red-400 uppercase">
                    Ferrari и McLaren
                </h1>
                <p className="mt-4 text-lg text-gray-700 dark:text-gray-300">
                    Гласувайте за любимия си автомобил и изберете град за нашето следващо посещение!
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
                {/* Left: Voting Form */}
                <div className="bg-gray-100 dark:bg-gray-800 rounded-xl shadow-xl p-8">
                    <h2 className="text-2xl font-semibold mb-6 text-yellow-600 dark:text-yellow-400">Гласуване</h2>
                    <form className="space-y-4" onSubmit={handleVote}>
                        <div>
                            <label className="block text-sm mb-1">Избери автомобил</label>
                            <select
                                value={selectedCar}
                                onChange={(e) => setSelectedCar(e.target.value)}
                                className="w-full px-4 py-2 rounded-lg bg-white dark:bg-gray-700 text-black dark:text-white"
                            >
                                <option value="ferrari">Ferrari</option>
                                <option value="mclaren">McLaren</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm mb-1">Град за посещение</label>
                            <input
                                type="text"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                className="w-full px-4 py-2 rounded-lg bg-white dark:bg-gray-700 text-black dark:text-white border border-gray-300 dark:border-gray-600"
                                placeholder="напр. Пловдив, Варна"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg"
                        >
                            Гласувай сега
                        </button>
                    </form>

                    {/* Car votes (local only) */}
                    <div className="mt-8">
                        <h3 className="text-lg font-semibold mb-2 text-green-600 dark:text-green-400">Популярност на коли</h3>
                        <p>🚗 Ferrari: <span className="font-bold text-red-600">{carVotes.ferrari}</span> гласа</p>
                        <p>🏎️ McLaren: <span className="font-bold text-orange-500">{carVotes.mclaren}</span> гласа</p>
                    </div>

                    {/* Top cities */}
                    <div className="mt-8">
                        <h3 className="text-lg font-semibold mb-2 text-blue-600 dark:text-blue-400">Топ 5 града</h3>
                        <ol className="list-decimal list-inside space-y-1">
                            {topCities.length > 0 ? (
                                topCities.map((c, i) => (
                                    <li key={i}>
                                        {c.name} – <span className="text-yellow-500">{c.votes}</span> гласа
                                    </li>
                                ))
                            ) : (
                                <p className="text-gray-500 dark:text-gray-400">Още няма гласове.</p>
                            )}
                        </ol>
                    </div>
                </div>

                {/* Right: T-Shirts (unchanged) */}
                <div>
                    <h2 className="text-2xl font-bold mb-4 text-center md:text-left">Лимитирани тениски</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/* ... вашите тениски ... */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VisitRequestForm;
