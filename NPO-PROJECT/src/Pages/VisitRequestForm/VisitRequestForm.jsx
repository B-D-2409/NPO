import React from "react";

function VisitRequestForm() {
    return (
        <div className="bg-gradient-to-br from-black to-gray-900 min-h-screen text-white p-6">
            {/* Header */}
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-red-500 uppercase">
                    Ferrari & McLaren Experience
                </h1>
                <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
                    Drive the dream. Dress the drive. Book your ride and choose your exclusive t-shirt.
                </p>
            </div>

            {/* Main Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
                {/* Left: Booking Form */}
                <div className="bg-gray-800 rounded-xl shadow-xl p-8 h-fit">
                    <h2 className="text-2xl font-semibold mb-6 text-yellow-400">Book Your Ride</h2>
                    <form className="space-y-4">
                        <div>
                            <label className="block text-sm mb-1">Your Name</label>
                            <input
                                type="text"
                                className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                                placeholder="John Doe"
                            />
                        </div>
                        <div>
                            <label className="block text-sm mb-1">City to Visit</label>
                            <input
                                type="text"
                                className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                placeholder="e.g., Milan, Tokyo"
                            />
                        </div>
                        <div>
                            <label className="block text-sm mb-1">Choose Car</label>
                            <select className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600">
                                <option value="ferrari">Ferrari</option>
                                <option value="mclaren">McLaren</option>
                            </select>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg transition duration-300"
                        >
                            Book Now
                        </button>
                    </form>
                </div>

                {/* Right: T-Shirt Grid */}
                <div>
                    <h2 className="text-2xl font-bold text-white mb-4 text-center md:text-left">
                        Limited Edition T-Shirts
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/* T-Shirt Card 1 */}
                        <div className="bg-gray-800 rounded-lg p-4 text-center shadow-md hover:scale-105 transition transform duration-300">
                            <img src="/tshirts/model1.png" alt="T-Shirt 1" className="w-full rounded-md mb-2" />
                            <p className="text-white font-semibold">Ferrari Red Streetwear</p>
                            <button className="mt-2 bg-yellow-400 text-black py-1 px-4 rounded-full hover:bg-yellow-500">
                                Order
                            </button>
                        </div>

                        {/* T-Shirt Card 2 */}
                        <div className="bg-gray-800 rounded-lg p-4 text-center shadow-md hover:scale-105 transition transform duration-300">
                            <img src="/tshirts/model2.png" alt="T-Shirt 2" className="w-full rounded-md mb-2" />
                            <p className="text-white font-semibold">McLaren Urban Black</p>
                            <button className="mt-2 bg-yellow-400 text-black py-1 px-4 rounded-full hover:bg-yellow-500">
                                Order
                            </button>
                        </div>

                        {/* T-Shirt Card 3 */}
                        <div className="bg-gray-800 rounded-lg p-4 text-center shadow-md hover:scale-105 transition transform duration-300">
                            <img src="/tshirts/model3.png" alt="T-Shirt 3" className="w-full rounded-md mb-2" />
                            <p className="text-white font-semibold">Turbo Drive Edition</p>
                            <button className="mt-2 bg-yellow-400 text-black py-1 px-4 rounded-full hover:bg-yellow-500">
                                Order
                            </button>
                        </div>

                        {/* Add more t-shirts as needed */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VisitRequestForm;
