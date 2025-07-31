import { useState } from "react";
import { toast } from "react-toastify";

function DonationForm() {
    const [activeTab, setActiveTab] = useState("small");
    const [amount, setAmount] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [comment, setComment] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("bank");

    const stripeLinksSmall = {
        20: "https://buy.stripe.com/7sIeV5buv6mV0BG4gi",
        30: "https://buy.stripe.com/30BGN-EXAMPLE",
        50: "https://buy.stripe.com/6oEdR1gOP4eN1FK4gj",
        70: "https://buy.stripe.com/70BGN-EXAMPLE",
        100: "https://buy.stripe.com/14kdR19mnaDbbgk6os",
    };


    const stripeLinksLarge = {
        1000: "https://buy.stripe.com/28odR1aqr5iR3NS5kr",
        2000: "https://buy.stripe.com/eVacMXfKL4eNesw9AI",
        5000: "https://buy.stripe.com/4gw00b1TV3aJ98c7sB",
        10000: "https://buy.stripe.com/00gfZ90PRh1zdos8wG",
    };

    const handleDefaultAmountClick = (val) => {
        setAmount(val.toString());
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const donationAmount = parseFloat(amount);
        const stripeUrl =
            activeTab === "small"
                ? stripeLinksSmall[donationAmount]
                : stripeLinksLarge[donationAmount];

        if (paymentMethod === "bank") {
            toast.info("Моля направете банков превод по посочените данни.");
            return;
        }

        if (!stripeUrl) {
            toast.error("Няма директен Stripe линк за тази сума.");
            return;
        }
        window.open(stripeUrl, "_blank");
    };

    return (
        <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-xl mt-10">
            <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
                Подкрепете нашата кауза
            </h1>


            <div className="flex justify-center mb-8 space-x-6">
                <button
                    onClick={() => {
                        setActiveTab("small");
                        setAmount("");
                        setName("");
                        setEmail("");
                        setPhone("");
                        setComment("");
                        setPaymentMethod("bank");
                    }}
                    className={`px-8 py-3 rounded-t-lg font-semibold transition ${activeTab === "small"
                        ? "bg-green-600 text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        }`}
                >
                    Дарения
                </button>
                <button
                    onClick={() => {
                        setActiveTab("large");
                        setAmount("");
                        setName("");
                        setEmail("");
                        setPhone("");
                        setComment("");
                        setPaymentMethod("bank");
                    }}
                    className={`px-8 py-3 rounded-t-lg font-semibold transition ${activeTab === "large"
                        ? "bg-green-600 text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        }`}
                >
                    По-Големи Дарения
                </button>
            </div>
            {activeTab === "small" && (
                <>
                    <p className="mb-6 text-gray-700">
                        Открийте възможностите да подкрепите Фондация "Родолюбци за България"
                    </p>

                    <div className="mb-6 p-6 border rounded-md bg-gray-50">
                        <p><strong>Банков превод:</strong></p>
                        <p>Титуляр: “Родолюбци за България“</p>
                        <p>Адрес: София център, ул. „Георги С. Раковски“ 82, 1202 София</p>
                        <p>"ЮРОБАНК БЪЛГАРИЯ" АД</p>
                        <p>IBAN: BG74BPBI79421026341301</p>
                        <p>BIC: BPBIBGSF</p>
                        <p>Основание: Дарение.</p>
                    </div>


                    <div className="mb-6">
                        <label htmlFor="payment-method-small" className="block text-sm font-medium text-gray-700 mb-1">
                            Изберете метод на превод
                        </label>
                        <select
                            id="payment-method-small"
                            value={paymentMethod}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            className="w-full border border-gray-300 rounded-md px-4 py-2"
                        >
                            <option value='Method'><strong>Изберете Метод</strong></option>
                            <option value="bank">Банков превод</option>
                            <option value="applePay">Apple Pay</option>
                            <option value="paypal">Paypal</option>
                            <option value="revolut">Revolut</option>
                        </select>
                    </div>

                    <div className="grid grid-cols-5 gap-4 mb-8">
                        {[20, 30, 50, 70, 100].map((val) => (
                            <button
                                key={val}
                                type="button"
                                onClick={() => handleDefaultAmountClick(val)}
                                className={`py-3 rounded-lg text-white font-semibold transition ${amount === val.toString()
                                    ? "bg-green-600"
                                    : "bg-blue-600 hover:bg-blue-700"
                                    }`}
                            >
                                {val} лв
                            </button>
                        ))}
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label
                                htmlFor="donation-amount"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Дарение (лв)
                            </label>
                            <input
                                type="number"
                                id="donation-amount"
                                name="amount"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                required
                                className="mt-1 w-full border border-gray-300 rounded-md px-4 py-3"
                                min="1"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="donor-name"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Вашето име
                            </label>
                            <input
                                type="text"
                                id="donor-name"
                                name="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                className="mt-1 w-full border border-gray-300 rounded-md px-4 py-3"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="donor-email"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Вашият имейл
                            </label>
                            <input
                                type="email"
                                id="donor-email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="mt-1 w-full border border-gray-300 rounded-md px-4 py-3"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="donor-phone-small"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Телефон
                            </label>
                            <input
                                type="tel"
                                id="donor-phone-small"
                                name="phone"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="mt-1 w-full border border-gray-300 rounded-md px-4 py-3"
                                placeholder="+359..."
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="donor-comment-small"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Коментар (по желание)
                            </label>
                            <textarea
                                id="donor-comment-small"
                                name="comment"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                rows="3"
                                className="mt-1 w-full border border-gray-300 rounded-md px-4 py-3"
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
                        >
                            Дарете сега
                        </button>
                    </form>
                </>
            )}

            {activeTab === "large" && (
                <>
                    <p className="mb-6 text-gray-700">
                        За големи дарения използвайте предоставените линкове или данни за банков превод.
                    </p>

                    {/* Избор на метод за превод */}
                    <div className="mb-6">
                        <label htmlFor="payment-method-large" className="block text-sm font-medium text-gray-700 mb-1">
                            Изберете метод на превод
                        </label>
                        <select
                            id="payment-method-large"
                            value={paymentMethod}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            className="w-full border border-gray-300 rounded-md px-4 py-2"
                        >
                            <option value='Method'><strong>Изберете Метод</strong></option>
                            <option value="bank">Банков превод</option>
                            <option value="applePay">Apple Pay</option>
                            <option value="paypal">Paypal</option>
                            <option value="revolut">Revolut</option>
                        </select>
                    </div>

                    <div className="grid grid-cols-4 gap-4 mb-8">
                        {[1000, 2000, 5000, 10000].map((val) => (
                            <button
                                key={val}
                                type="button"
                                onClick={() => handleDefaultAmountClick(val)}
                                className={`py-3 rounded-lg text-white font-semibold transition ${amount === val.toString()
                                    ? "bg-green-600"
                                    : "bg-blue-600 hover:bg-blue-700"
                                    }`}
                            >
                                {val} лв
                            </button>
                        ))}
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label
                                htmlFor="donation-amount-large"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Дарение (лв)
                            </label>
                            <input
                                type="number"
                                id="donation-amount-large"
                                name="amount"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                required
                                className="mt-1 w-full border border-gray-300 rounded-md px-4 py-3"
                                min="1"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="donor-name-large"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Вашето име
                            </label>
                            <input
                                type="text"
                                id="donor-name-large"
                                name="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                className="mt-1 w-full border border-gray-300 rounded-md px-4 py-3"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="donor-email-large"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Вашият имейл
                            </label>
                            <input
                                type="email"
                                id="donor-email-large"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="mt-1 w-full border border-gray-300 rounded-md px-4 py-3"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="donor-phone-large"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Телефон
                            </label>
                            <input
                                type="tel"
                                id="donor-phone-large"
                                name="phone"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="mt-1 w-full border border-gray-300 rounded-md px-4 py-3"
                                placeholder="+359..."
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="donor-comment-large"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Коментар (по желание)
                            </label>
                            <textarea
                                id="donor-comment-large"
                                name="comment"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                rows="3"
                                className="mt-1 w-full border border-gray-300 rounded-md px-4 py-3"
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
                        >
                            Дарете сега
                        </button>
                    </form>
                </>
            )}
        </div>
    );
}

export default DonationForm;
