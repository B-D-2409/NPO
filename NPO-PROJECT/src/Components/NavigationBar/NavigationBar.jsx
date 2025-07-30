import { useState } from "react";
import { Link } from "react-router-dom";

function NavigationBar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMoreOpen, setIsMoreOpen] = useState(false);
    const [isLoginOpen, setIsLoginOpen] = useState(false);

    const mainLinks = [
        { to: "/donationform", label: "Дарения" },
        { to: "/mission", label: "Мисия" },
        { to: "/activityhistory", label: "Дейности" },
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
        <nav className="bg-white shadow-md fixed w-full top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    {/* Logo */}
                    <div className="mr-auto">
                        <Link to="/" className="text-xl font-bold text-blue-600">
                            Родолюбци за България
                        </Link>
                    </div>

                    {/* Desktop menu */}
                    <div className="hidden md:flex items-center space-x-6 relative">

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
                                onClick={() => setIsMoreOpen(!isMoreOpen)}
                                className="text-gray-700 hover:text-blue-600 focus:outline-none flex items-center"
                                aria-label="Toggle more menu"
                            >
                            
                                <svg
                                    className="w-6 h-8"  
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={3}       
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 7h18" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h18" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 17h18" />
                                </svg>
                            </button>

                            {isMoreOpen && (
                                <div
                                    className="fixed inset-0 flex justify-center items-start pt-24 bg-black bg-opacity-30 z-50"
                                    onClick={() => setIsMoreOpen(false)}
                                >
                                    <div
                                        className="bg-white rounded-lg shadow-xl w-[28rem] p-8 space-y-6 relative"
                                        onClick={(e) => e.stopPropagation()}
                                    >

                                        <button
                                            onClick={() => setIsMoreOpen(false)}
                                            className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 focus:outline-none"
                                            aria-label="Close menu"
                                        >
                                            <svg
                                                className="w-6 h-6"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth={2}
                                                viewBox="0 0 24 24"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>

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
                                className="text-gray-700 hover:text-blue-600 focus:outline-none font-semibold"
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
