function Mission() {
    return (
        <section className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 py-16 px-6 md:px-12 transition-colors duration-300">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">
                {/* Text Section */}
                <div className="flex-1">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 text-red-600 dark:text-yellow-400">
                        Нашата Мисия
                    </h2>
                    <p className="text-lg leading-relaxed mb-6 text-gray-700 dark:text-gray-300">
                        Тук ще опишем нашата мисия – какво ни вдъхновява, какви цели си поставяме и как искаме да допринесем за по-добро бъдеще.
                    </p>
                    <p className="text-md text-gray-600 dark:text-gray-400 italic">
                        (Това е шаблонен текст. Можем да добавим конкретни идеи за мисията ви тук.)
                    </p>
                </div>

                {/* Image Section */}
                <div className="flex-1">
                    <img
                        src="/public/Bulgaria.png"
                        alt="Мисията ни"
                        className="w-full rounded-xl shadow-lg border border-gray-200 dark:border-gray-700"
                    />
                </div>
            </div>
        </section>
    );
}

export default Mission;
