import { Link } from 'react-router-dom';

function Home() {
    return (
        <div className="pt-36 max-w-4xl mx-auto p-6 space-y-6">
            <h1 className="text-5xl font-extrabold text-center mb-8">
                <span className="text-black dark:text-white">НПО </span>
                <span className="text-green-600">„Родолюбци“</span>
                <span className="text-red-600"> за България</span>
            </h1>

            {/* Новини */}
            <section className="bg-gradient-to-br from-white via-green-50 to-red-50 dark:from-gray-800 dark:via-green-900 dark:to-red-900 p-6 rounded-2xl shadow-md border dark:border-gray-700">
                <h2 className="text-2xl font-bold mb-4 text-black dark:text-white">Новини</h2>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                    Последните новини за нашата дейност и проекти. Останете информирани за събитията!
                </p>
                <Link
                    to="/news"
                    className="inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                >
                    Вижте всички новини
                </Link>
            </section>

            {/* Проекти */}
            <section className="bg-gradient-to-br from-white via-green-50 to-red-50 dark:from-gray-800 dark:via-green-900 dark:to-red-900 p-6 rounded-2xl shadow-md border dark:border-gray-700">
                <h2 className="text-2xl font-bold mb-4 text-black dark:text-white">Проекти</h2>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                    Разгледайте нашите текущи проекти и инициативи, които подкрепяме.
                </p>
                <Link
                    to="/projects"
                    className="inline-block bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                >
                    Вижте проектите
                </Link>
            </section>


            <section className="bg-gradient-to-br from-white via-green-50 to-red-50 dark:from-gray-800 dark:via-green-900 dark:to-red-900 p-6 rounded-2xl shadow-md border dark:border-gray-700">
                <h2 className="text-2xl font-bold mb-4 text-black dark:text-white">Събития</h2>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                    Разгледайте нашите текущи събития.
                </p>
                <Link
                    to="/events"
                    className="inline-block bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                >
                    Вижте събитията
                </Link>
            </section>
        </div>
    );
}

export default Home;
