import { useEffect } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { bookingAPI } from "../services/api"
import toast from "react-hot-toast"

const VerifyPayment = () => {
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()

    useEffect(() => {
        const verify = async () => {
            const reference =
                searchParams.get("reference") || searchParams.get("trxref");
    
            console.log("REFERENCE:", reference); // 👈 DEBUG
    
            if (!reference) {
                toast.error("No payment reference found");
                return;
            }
    
            try {
                const res = await bookingAPI.verifyPayment(reference);
    
                console.log("VERIFY RESPONSE:", res); // 👈 DEBUG
    
                if (res.success) {
                    const bookingId = res.data.booking.bookingId;
    
                    toast.success("Payment successful!");
                    navigate(`/booking-confirmation/${bookingId}`);
                }
            } catch (err) {
                console.error("VERIFY ERROR:", err);
                toast.error("Payment verification failed");
            }
        };
    
        verify();
    }, [searchParams]); // ✅ THIS IS THE FIX

    return <p className="text-center mt-20">Verifying payment...</p>
}

export default VerifyPayment