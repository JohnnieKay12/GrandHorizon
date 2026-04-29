import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import { bookingAPI } from "../services/api";
import toast from "react-hot-toast";

const VerifyPayment = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        const reference = searchParams.get("reference") || searchParams.get("trxref");
        if (!reference) {
            toast.error("No payment reference found");
            navigate("/rooms");
            return;
        }

        let attempts = 0;
        const MAX_ATTEMPTS = 10; // 🔥 ~30 seconds (3s * 10)

        const interval = setInterval(async () => {
            attempts++;

            try {
                const res = await bookingAPI.verifyPayment(reference);

                if (res.success) {
                clearInterval(interval);

                const bookingId = res.data.booking.bookingId;

                toast.success("Payment successful!");
                navigate(`/booking-confirmation/${bookingId}`);
                }
            } catch (error) {
                console.log(`Attempt ${attempts}: still verifying...`);
            }

            // ⛔ STOP after max attempts
            if (attempts >= MAX_ATTEMPTS) {
                clearInterval(interval);

                toast.error("Verification taking too long. Please check your booking.");

                // fallback: go to bookings page
                navigate("/bookings");
            }
        }, 3000);

        return () => clearInterval(interval);
    }, [searchParams, navigate]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-4">
            <LoadingSpinner />

            <div className="animate-pulse text-center">
                <p className="text-lg font-semibold text-gray-700">
                    Verifying your payment...
                </p>
                <p className="text-sm text-gray-500">
                    This should take only a few seconds
                </p>
            </div>
        </div>
    );
};

export default VerifyPayment;