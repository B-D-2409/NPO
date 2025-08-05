import { useEffect, useRef } from "react";

function PayPalButton({ amount }) {
    const paypalRef = useRef();

    useEffect(() => {
        if (!window.paypal) return;

        window.paypal.Buttons({
            createOrder: (data, actions) => {
                return actions.order.create({
                    purchase_units: [{
                        amount: { value: amount },
                    }],
                });
            },
            onApprove: (data, actions) => {
                return actions.order.capture().then(details => {
                    toast.success("Плащането е успешно, благодаря ви " + details.payer.name.given_name);
                });
            },
            onError: err => {
                console.error("PayPal Error", err);
                toast.error("Възникна грешка с PayPal.");
            }
        }).render(paypalRef.current);
    }, [amount]);

    return <div ref={paypalRef} />;
}

export default PayPalButton;
