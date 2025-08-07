import { useState } from "react";
import { Link } from "react-router-dom";
import useDarkMode from "../Common/Theme";
function NavigationBar({ darkMode, setDarkMode }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMoreOpen, setIsMoreOpen] = useState(false);

    const mainLinks = [
        { to: "/donationform", label: "ДАРЕТЕ", color: "bg-white text-black" },
        { to: "/mission", label: "МИСИЯ", color: "bg-green-500 text-white" },
        { to: "/activityhistory", label: "ДЕЙНОСТИ", color: "bg-red-500 text-white" },
    ];

    const moreLinks = [
        { to: "/", label: "Начало" },
        { to: "/news", label: "Новини" },
        { to: "/projects", label: "Проекти" },
        { to: "/eventsregistration", label: "Записване за Семинари" },
        { to: "/events", label: "Събития" },
        { to: "/podcast", label: "Видео" },
        { to: "/contacts", label: "Контакти" },
    ];
    return (
        <nav className="bg-[rgb(199,255,252)] shadow-md fixed w-full top-0 z-50 h-32">
            <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8 h-full flex items-center justify-between">
                {/* Logo */}
                <div className="flex-shrink-0 h-full flex items-center">
                    <Link to="/" className="h-full flex items-center">
                        <img
                            className="h-full w-auto object-contain"
                            src="/Logo.png"
                            alt="Logo"
                        />
                    </Link>
                </div>

                {/* Desktop menu */}
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

                    {/* More menu button (desktop) */}
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
                                    className="bg-green-50 rounded-lg shadow-xl w-[95%] max-w-[1100px] p-8 space-y-6"
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

                    {/* Dark mode toggle on desktop (top right) */}
                    <button
                        onClick={() => setDarkMode(!darkMode)}
                        aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
                        className="ml-4 p-2 bg-gray-300 dark:bg-gray-700 rounded text-black dark:text-white shadow transition-colors"
                    >
                        {darkMode ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round"
                                    d="M12 3v1m0 16v1m8.66-9h-1M4.34 12h-1m15.36 4.95l-.7-.7M6.34 6.34l-.7-.7m12.02 12.02l-.7-.7M6.34 17.66l-.7-.7M12 7a5 5 0 100 10 5 5 0 000-10z" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round"
                                    d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
                            </svg>
                        )}
                    </button>
                </div>

                {/* Mobile menu toggle & links */}
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

                    {/* Mobile menu toggle button */}
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

            {/* Mobile expanded menu */}
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

                    {/* Dark mode toggle on mobile, placed below the mobile menu toggle */}
                    <button
                        onClick={() => setDarkMode(!darkMode)}
                        aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
                        className="mt-4 p-2 bg-gray-300 dark:bg-gray-700 rounded text-black dark:text-white shadow transition-colors w-full"
                    >
                        {darkMode ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mx-auto" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round"
                                    d="M12 3v1m0 16v1m8.66-9h-1M4.34 12h-1m15.36 4.95l-.7-.7M6.34 6.34l-.7-.7m12.02 12.02l-.7-.7M6.34 17.66l-.7-.7M12 7a5 5 0 100 10 5 5 0 000-10z" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mx-auto" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round"
                                    d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
                            </svg>
                        )}
                    </button>
                </div>
            )}
        </nav>
    );


}




export default NavigationBar;
