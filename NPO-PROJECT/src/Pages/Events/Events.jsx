import { useState, useEffect } from 'react';
import {
    ref,
    query,
    orderByChild,
    limitToFirst,
    startAfter,
    get
} from 'firebase/database';
import { database } from '../../server/AuthenticationConfig';
import { InfiniteScrollWrapper } from '../../Components/Common/InfiniteScroll';

const PAGE_SIZE = 4;

function Events() {
    const [events, setEvents] = useState([]);
    const [lastStartDateTime, setLastStartDateTime] = useState(null);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const [initialLoadComplete, setInitialLoadComplete] = useState(false);

    useEffect(() => {
        loadMoreEvents();
    }, []);

    const loadMoreEvents = async () => {
        if (loading || !hasMore) return;
        setLoading(true);

        try {
            let eventsQuery;
            if (lastStartDateTime === null) {
                eventsQuery = query(
                    ref(database, 'events'),
                    orderByChild('startDateTime'),
                    limitToFirst(PAGE_SIZE)
                );
            } else {
                eventsQuery = query(
                    ref(database, 'events'),
                    orderByChild('startDateTime'),
                    startAfter(lastStartDateTime),
                    limitToFirst(PAGE_SIZE)
                );
            }

            const snapshot = await get(eventsQuery);

            if (!snapshot.exists()) {
                setHasMore(false);
                setInitialLoadComplete(true);
                setLoading(false);
                return;
            }

            const newEvents = [];
            let lastEventDateTimeInBatch = null;

            snapshot.forEach(childSnap => {
                const event = { id: childSnap.key, ...childSnap.val() };
                newEvents.push(event);
                lastEventDateTimeInBatch = event.startDateTime;
            });

            const filteredEvents = newEvents.filter(
                (event) => !events.some(e => e.id === event.id)
            );

            setEvents(prev => [...prev, ...filteredEvents]);

            if (filteredEvents.length < PAGE_SIZE) {
                setHasMore(false);
            }

            setLastStartDateTime(lastEventDateTimeInBatch);
            setInitialLoadComplete(true);
        } catch (err) {
            console.error('Грешка при зареждане на събития:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen bg-white dark:bg-black p-6 flex flex-col">
            <h1 className="text-4xl font-extrabold text-center mb-8 text-gray-900 dark:text-white">
                Събития
            </h1>


            {events.length > 0 ? (
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
                hover:shadow-lg transition-shadow duration-300 mx-auto mb-6"
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
            ) : initialLoadComplete ? (
                <p className="text-center text-gray-500 dark:text-gray-400 italic">
                    Няма предстоящи събития.
                </p>
            ) : null}

            {!hasMore && events.length > 0 && (
                <div className="text-center text-gray-500 py-4">
                    Няма повече събития.
                </div>
            )}
        </div>
    );
}

export default Events;
