import { useState } from "react";
import { Link } from "react-router-dom";

function NavigationBar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMoreOpen, setIsMoreOpen] = useState(false);
    const [isLoginOpen, setIsLoginOpen] = useState(false);

    const mainLinks = [
        { to: "/donationform", label: "ДАРЕТЕ", color: "bg-white text-black" },
        { to: "/mission", label: "МИСИЯ", color: "bg-green-500 text-white" },
        { to: "/activityhistory", label: "ДЕЙНОСТИ", color: "bg-red-500 text-white" },
    ];

    const moreLinks = [
        { to: "/", label: "Начало" },
        { to: "/news", label: "Новини" },
        { to: "/projects", label: "Проекти" },
        { to: "/contacts", label: "Контакти" },
        { to: "/podcast", label: "Видео" },
        { to: "/eventsregistration", label: "Семинари" },
    ];
    return (
        <nav className="bg-gray-400 shadow-md fixed w-full top-0 z-50 h-32">
            <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8 h-full flex items-center justify-between">
                <div className="flex-shrink-0 h-full flex items-center">
                    <Link to="/" className="h-full flex items-center">
                        <img
                            className="h-full w-auto object-contain"
                            src="/Logo.png"
                            alt="Logo"
                        />
                    </Link>
                </div>

                <div className="hidden md:flex items-center justify-end space-x-6 flex-1">
                    {mainLinks.map(({ to, label, color }) => (
                        <Link
                            key={label}
                            to={to}
                            className={`px-4 py-2 rounded font-semibold hover:opacity-80 transition ${color}`}
                        >
                            {label}
                        </Link>
                    ))}
                    <div className="relative">
                        <button
                            onClick={() => setIsMoreOpen(!isMoreOpen)}
                            className="text-gray-900 hover:text-green-600 focus:outline-none flex items-center"
                            aria-label="Toggle more menu"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={4}
                                viewBox="0 0 24 24"
                            >
                                {isMoreOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 7h18" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h18" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 17h18" />
                                    </>
                                )}
                            </svg>
                        </button>

                        {isMoreOpen && (
                            <div
                                className="fixed inset-0 flex justify-center items-start pt-28 bg-black bg-opacity-0 z-50"
                                onClick={() => setIsMoreOpen(false)}
                            >
                                <div
                                    className="bg-white rounded-lg shadow-xl w-[95%] max-w-[1100px] p-8 space-y-6"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    {moreLinks.map(({ to, label }) => (
                                        <Link
                                            key={label}
                                            to={to}
                                            onClick={() => setIsMoreOpen(false)}
                                            className="block text-center text-xl font-semibold text-gray-700 hover:bg-blue-100 rounded py-3"
                                        >
                                            {label}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Вход */}
                    <div className="relative">
                        <button
                            onClick={() => setIsLoginOpen(!isLoginOpen)}
                            className="text-gray-700 hover:text-green-700 focus:outline-none font-semibold"
                        >
                            Вход
                        </button>
                        {isLoginOpen && (
                            <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg z-50">
                                <Link
                                    to="/authentication"
                                    className="block px-4 py-2 text-gray-700 hover:bg-green-600"
                                    onClick={() => setIsLoginOpen(false)}
                                >
                                    Вход в системата
                                </Link>
                            </div>
                        )}
                    </div>
                </div>

                <div className="md:hidden flex items-center space-x-4">

                    {mainLinks.map(({ to, label, color }) => (
                        <Link
                            key={label}
                            to={to}
                            className={`px-2 py-1 rounded font-semibold text-sm ${color}`}
                        >
                            {label}
                        </Link>
                    ))}

                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="text-gray-700 hover:text-blue-600 focus:outline-none"
                        aria-label="Toggle mobile menu"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            viewBox="0 0 24 24"
                        >
                            {isMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 7h18" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h18" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 17h18" />
                                </>
                            )}
                        </svg>
                    </button>
                </div>
            </div>
            {isMenuOpen && (
                <div className="md:hidden flex flex-col px-4 pb-4 space-y-2 bg-white shadow-sm">
                    {moreLinks.map(({ to, label }) => (
                        <Link
                            key={label}
                            to={to}
                            className="text-gray-700 hover:text-blue-600 text-center py-2"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {label}
                        </Link>
                    ))}
                    <Link
                        to="/authentication"
                        className="text-center text-gray-700 hover:text-green-600 py-2"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Вход
                    </Link>
                </div>
            )}
        </nav>
    );

}

export default NavigationBar;
