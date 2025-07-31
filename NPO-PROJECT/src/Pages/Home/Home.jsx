import { Link } from 'react-router-dom';

function Home() {
    return (
        <div className="pt-36 max-w-4xl mx-auto p-6 space-y-1">
            <h1 className="text-5xl font-extrabold text-center mb-8">
                <span className="text-white">НПО </span>
                <span className="text-green-600">„Родолюбци“</span>
                <span className="text-red-600"> за България</span>
            </h1>

            <section className="bg-white p-6 rounded shadow-md">
                <h2 className="text-2xl font-bold mb-4">Новини</h2>
                <p className="mb-4 text-gray-700">
                    Последните новини за нашата дейност и проекти. Останете информирани за събитията!
                </p>
                <Link
                    to="/news"
                    className="inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                >
                    Вижте всички новини
                </Link>
            </section>

            <section className="bg-white p-6 rounded shadow-md">
                <h2 className="text-2xl font-bold mb-4">Проекти</h2>
                <p className="mb-4 text-gray-700">
                    Разгледайте нашите текущи проекти и инициативи, които подкрепяме.
                </p>
                <Link
                    to="/projects"
                    className="inline-block bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                >
                    Вижте проектите
                </Link>
            </section>
        </div>
    );
}

export default Home;
