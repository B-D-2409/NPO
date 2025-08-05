import { useState, useEffect } from 'react';
import { ref, onValue, query, orderByChild, limitToFirst, startAfter } from "firebase/database";
import { database } from '../../server/AuthenticationConfig';
import { InfiniteScrollWrapper } from '../../Components/Common/InfiniteScroll';

// Компонент за точките (loading indicator)
function Dot({ color, delay }) {
    return (
        <div
            className={`w-3 h-3 rounded-full animate-bounce ${color}`}
            style={{ animationDelay: `${delay}ms` }}
        />
    );
}

function Events() {
    const [events, setEvents] = useState([]);
    const [lastEventKey, setLastEventKey] = useState(null);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const PAGE_SIZE = 10;

    useEffect(() => {
        loadMoreEvents();
    }, []);

    const loadMoreEvents = () => {
        if (loading) return; // избягваме паралелни заявки
        setLoading(true);

        let eventsQuery;
        if (!lastEventKey) {
            eventsQuery = query(
                ref(database, 'events'),
                orderByChild('startDateTime'),
                limitToFirst(PAGE_SIZE)
            );
        } else {
            eventsQuery = query(
                ref(database, 'events'),
                orderByChild('startDateTime'),
                startAfter(lastEventKey),
                limitToFirst(PAGE_SIZE)
            );
        }

        onValue(
            eventsQuery,
            (snapshot) => {
                const data = snapshot.val();
                if (!data) {
                    setHasMore(false);
                    setLoading(false);
                    return;
                }

                const eventsArray = Object.entries(data)
                    .map(([id, event]) => ({ id, ...event }))
                    .sort((a, b) => new Date(a.startDateTime) - new Date(b.startDateTime));

                if (eventsArray.length < PAGE_SIZE) {
                    setHasMore(false);
                }

                setEvents((prev) => [...prev, ...eventsArray]);

                if (eventsArray.length > 0) {
                    setLastEventKey(eventsArray[eventsArray.length - 1].startDateTime);
                }
                setLoading(false);
            },
            { onlyOnce: true }
        );
    };

    return (
        <div className="relative min-h-screen bg-white dark:bg-black p-6 flex flex-col">
            <h1 className="text-4xl font-extrabold text-center mb-8 text-gray-900 dark:text-white">
                Събития
            </h1>

            {loading && events.length === 0 ? (
                // Показваме анимирани точки, докато се зареждат събитията
                <div className="flex justify-center items-center space-x-2 my-8 w-full">
                    <Dot color="text-purple-600" delay={0} />
                    <Dot color="text-blue-600" delay={300} />
                    <Dot color="text-yellow-400" delay={600} />
                    <Dot color="text-green-600" delay={900} />
                    <Dot color="text-orange-500" delay={1200} />
                </div>
            ) : events.length > 0 ? (
                <InfiniteScrollWrapper
                    items={events}
                    loadMore={loadMoreEvents}
                    hasMore={hasMore}
                    height="calc(100vh - 180px)"
                    renderItem={(event) => (
                        <li
                            key={event.id}
                            className="w-full max-w-md p-6 rounded-2xl bg-gradient-to-br from-white via-green-50 to-red-50
                dark:from-gray-800 dark:via-green-900 dark:to-red-900
                shadow-md border border-gray-200 dark:border-gray-700
                hover:shadow-lg transition-shadow duration-300 mx-auto"
                        >
                            <h2 className="text-2xl font-bold mb-4 text-black dark:text-white">Тема</h2>
                            <div className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">
                                {event.title}
                            </div>

                            <h3 className="mb-3 text-gray-700 dark:text-gray-300 leading-relaxed font-semibold">
                                Описание
                            </h3>
                            <p className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
                                {event.description}
                            </p>

                            <p className="text-sm font-semibold mb-1 text-gray-700 dark:text-gray-300">
                                <span>Начало: </span>{new Date(event.startDateTime).toLocaleString()}
                            </p>

                            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                                <span>Край: </span>{new Date(event.endDateTime).toLocaleString()}
                            </p>
                        </li>
                    )}
                />
            ) : (
                <p className="text-center text-gray-500 dark:text-gray-400 italic">
                    Няма предстоящи събития.
                </p>
            )}
        </div>
    );
}

export default Events;
