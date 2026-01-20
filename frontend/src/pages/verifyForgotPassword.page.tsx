
import { useState } from "react";
import { authService } from "../lib/authService";
import { useLocation, useNavigate } from "react-router-dom";
import { getErrorMessage } from "../lib/handleApiError";

export default function VerifyResetOtp() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const email = state?.email;

  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  const handleVerify = async () => {
    try {
      const res = await authService.verifyResetOtp(email, otp);
      navigate("/reset-password", { state: { token: res.resetToken } });
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  if (!email) return <p>Unauthorized access</p>;

  return (
    <div className="auth-container">
      <h2>Verify OTP</h2>
      {error && <p className="error">{error}</p>}
      <input placeholder="OTP" value={otp} onChange={e => setOtp(e.target.value)} />
      <button onClick={handleVerify}>Verify</button>
    </div>
  );
}
