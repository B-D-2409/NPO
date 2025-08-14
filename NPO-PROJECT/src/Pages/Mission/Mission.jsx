function Mission() {
    return (
        <section className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 py-16 px-6 md:px-12 transition-colors duration-300">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">
                {/* Text Section */}
                <div className="flex-1">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 text-red-600 dark:text-yellow-400">
                        Нашата Мисия
                    </h2>
                    <p className="text-lg leading-relaxed mb-4 text-gray-700 dark:text-gray-300">
                        Фондация „Родолюбци“ има за цел да изгражда и подкрепя бъдещото поколение лидери, държавници и родолюбиви създатели в Република България. Ние вярваме, че силата на страната ни се крие в хората, които я обичат, разбират и са готови да работят за нейното развитие.
                    </p>
                    <h3 className="text-2xl font-semibold mb-2 text-red-500 dark:text-yellow-300">
                        Нашите цели:
                    </h3>
                    <ul className="list-disc pl-5 mb-4 text-gray-700 dark:text-gray-300">
                        <li><strong>Образование и лидерство:</strong> предоставяне на качествени програми, менторство и възможности за личностно и професионално развитие на младите лидери.</li>
                        <li><strong>Патриотизъм и обществена ангажираност:</strong> възпитаване на ценности като родолюбие, социална отговорност и активна гражданска позиция.</li>
                        <li><strong>Иновации и съзидание:</strong> насърчаване на млади предприемачи, иноватори и творци, които допринасят за развитието на България.</li>
                        <li><strong>Финансова независимост и национална идентичност:</strong> фондацията се финансира изцяло и единствено от български граждани и организации, поддържайки независима и чиста мисия.</li>
                    </ul>
                    <p className="text-md text-gray-600 dark:text-gray-400 italic">
                        Нашата визия: България с младо, отговорно и образовано поколение, което води страната към просперитет, устойчиво развитие и съхраняване на националната идентичност.
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
