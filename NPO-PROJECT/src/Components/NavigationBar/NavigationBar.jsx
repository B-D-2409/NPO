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
        <nav className="bg-gray-400 shadow-md fixed w-full top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    {/* Logo */}
                    <div className="mr-auto">
                        <Link
                            to="/"
                            className="text-xl font-bold bg-clip-text text-transparent"
                            style={{
                                backgroundImage: "linear-gradient(to right, white 10%, lightgreen 30%, green 72%, darkred 70%, red 100%)"

                            }}
                        >
                            Родолюбци за България
                        </Link>

                    </div>

                    {/* Desktop menu */}
                    <div className="hidden md:flex items-center space-x-6 relative">

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
                                    className="fixed inset-0 flex justify-center items-start pt-16 bg-black bg-opacity-0 z-50"
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

                        <div className="ml-6 relative">
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

                    {/* Mobile */}
                    <div className="md:hidden flex items-center space-x-4">

                        {mainLinks.map(({ to, label }) => (
                            <Link
                                key={label}
                                to={to}
                                className="text-blue-700 font-semibold text-lg hover:text-blue-900"
                            >
                                {label}
                            </Link>
                        ))}

                        <div className="relative">
                            <button
                                onClick={() => setIsLoginOpen(!isLoginOpen)}
                                className="text-gray-700 hover:text-blue-600 focus:outline-none"
                            >
                                Вход
                            </button>
                            {isLoginOpen && (
                                <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg z-50">
                                    <Link
                                        to="/authentication"
                                        className="block px-4 py-2 text-gray-700 hover:bg-blue-100"
                                        onClick={() => setIsLoginOpen(false)}
                                    >
                                        Вход в системата
                                    </Link>
                                </div>
                            )}
                        </div>

                        {/* Hamburger меню с три черти и X */}
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
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
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
            </div>

            {/* Mobile меню при отворено състояние */}
            {isMenuOpen && (
                <div className="md:hidden flex flex-col px-4 pb-4 space-y-2 bg-white shadow-sm">
                    {moreLinks.map(({ to, label }) => (
                        <Link
                            key={label}
                            to={to}
                            className="text-gray-700 hover:text-blue-600"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {label}
                        </Link>
                    ))}
                </div>
            )}
        </nav>
    );
}

export default NavigationBar;
