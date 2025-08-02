import { useState } from "react";
import { toast } from "react-toastify";
import PayPalButton from "../../Components/PaymentMethods/PayPal";

function DonationForm() {
    const [showStripe, setShowStripe] = useState(false);
    const [showPaypal, setShowPaypal] = useState(false);

    const stripeLinks = {
        20: "https://buy.stripe.com/7sIeV5buv6mV0BG4gi",
        30: "https://buy.stripe.com/30BGN-EXAMPLE",
        50: "https://buy.stripe.com/6oEdR1gOP4eN1FK4gj",
        70: "https://buy.stripe.com/70BGN-EXAMPLE",
        100: "https://buy.stripe.com/14kdR19mnaDbbgk6os",
        1000: "https://buy.stripe.com/28odR1aqr5iR3NS5kr",
        2000: "https://buy.stripe.com/eVacMXfKL4eNesw9AI",
        5000: "https://buy.stripe.com/4gw00b1TV3aJ98c7sB",
        10000: "https://buy.stripe.com/00gfZ90PRh1zdos8wG",
    };

    const handleSubmit = (amountValue, method) => {
        if (method === "paypal") {
            toast.success(`PayPal плащане за ${amountValue} BGN`);
        }

        if (method === "stripe") {
            const stripeUrl = stripeLinks[amountValue];
            if (!stripeUrl) {
                toast.error("Няма Stripe линк за тази сума.");
                return;
            }
            window.open(stripeUrl, "_blank");
        }
    };

    return (
        <div className="w-full flex flex-col md:flex-row justify-start items-start gap-12 mt-10 px-6 pl-12">
            {/* Info Box */}
            <div className="flex flex-col space-y-6 w-full max-w-md bg-gradient-to-br from-white via-green-50 to-red-50 p-8 rounded-2xl shadow-lg border border-red-200">
                <h2 className="text-2xl font-extrabold text-green-600 mb-4">
                    Подкрепете Фондация <span className="text-green-600">"Родолюбци за България"</span>
                </h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                    <strong>Фондация „Родолюбци за България“</strong> — фондация за изграждане на бъдещото поколение ръководители, държавници и родолюбиви създатели в Република България.
                    Финансирана изцяло и единствено от българи. Подкрепяйки ни, Вие инвестирате в бъдещето на страната чрез образование, култура и създаване на устойчиви лидери на всички нива – от общинско до държавно.
                </p>

                <h3 className="font-semibold text-lg text-green-800 mb-3 border-b-2 border-green-600 pb-1">
                    Банков превод:
                </h3>
                <div className="space-y-2 text-gray-800 text-sm font-medium">
                    <p><span className="font-semibold">Титуляр:</span> Родолюбци за България</p>
                    <p><span className="font-semibold">Адрес:</span> София център, ул. „Георги С. Раковски“ 82, 1202 София</p>
                    <p><span className="font-semibold">Банка:</span> ЮРОБАНК БЪЛГАРИЯ АД</p>
                    <p><span className="font-semibold">IBAN:</span> BG74BPBI79421026341301</p>
                    <p><span className="font-semibold">BIC:</span> BPBIBGSF</p>
                    <p><span className="font-semibold">Основание:</span> Дарение</p>
                    <div className="mt-4 p-4 bg-blue-200 border border-yellow-400 text-yellow-800 rounded-lg text-sm leading-relaxed">
                        Молим Ви, при банков превод да изписвате <strong>„Дарение“</strong> в основанието на плащането, за да може средствата да се отчетат правилно според законовите изисквания. Благодарим Ви за подкрепата!
                    </div>
                </div>
            </div>

            {/* Stripe Section - винаги отворена */}
            <div className="flex flex-col items-end space-y-4 w-full max-w-md">
                <div className="w-full">
                    <h3 className="bg-gradient-to-r from-green-600 via-green-700 to-red-700 text-white px-8 py-4 rounded-xl w-full text-center shadow-lg font-semibold text-lg mb-6">
                        Дарение чрез Stripe
                    </h3>
                    <div className="space-y-3 w-full max-w-xl mx-auto">
                        {Object.entries(stripeLinks).map(([value]) => (
                            <div
                                key={value}
                                className="p-[2px] rounded shadow-md bg-gradient-to-r from-white via-green-500 to-red-500 cursor-pointer"
                                onClick={() => handleSubmit(Number(value), "stripe")}
                            >
                                <div className="rounded p-4 text-white text-center">
                                    <p className="font-bold text-lg mb-4">
                                        Дарение от {value} BGN чрез Stripe
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* PayPal Section */}
            <div className="flex flex-col items-end space-y-4 w-full max-w-md">
                <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-purple-700 text-white px-8 py-4 rounded-xl w-full text-center shadow-lg font-semibold text-lg">
                    Дарение чрез PayPal
                </div>

                <div className="space-y-3 w-full max-w-xl mx-auto">
                    {Object.keys(stripeLinks).map((value) => (
                        <div
                            key={value}
                            className="p-[2px] rounded shadow-md bg-gradient-to-r from-white via-blue-500 to-purple-500"
                        >
                            <div className="rounded p-4 text-white text-center">
                                <p className="font-bold text-lg mb-4">
                                    Дарение от {value} BGN чрез PayPal
                                </p>
                                <PayPalButton amount={value} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );

}

export default DonationForm;
