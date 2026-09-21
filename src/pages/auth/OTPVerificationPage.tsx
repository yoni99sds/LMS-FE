import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { verifyOtp } from '@/api/auth.api';
import { toast } from 'sonner';

const OTPVerificationPage = () => {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // ✅ FIX: prevent undefined email issue
  const email =
    location.state?.email || localStorage.getItem('verify_email') || '';

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await verifyOtp({
        email,
        otp,
      });

      toast.success('Account verified successfully');

      // cleanup stored email
      localStorage.removeItem('verify_email');

      navigate('/login');
    } catch (err: any) {
      toast.error(err?.response?.data?.message || err.message || 'Invalid OTP');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center">
      <form onSubmit={handleVerify} className="space-y-4 w-full max-w-sm">
        <h1 className="text-xl font-bold text-center">Verify OTP</h1>

        {/* optional fallback input (prevents dead state) */}
        {!email && (
          <input
            placeholder="Enter email"
            className="w-full border p-2 rounded"
            onChange={(e) => localStorage.setItem('verify_email', e.target.value)}
          />
        )}

        <input
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter 6-digit OTP"
          maxLength={6}
          className="w-full border p-2 rounded"
          required
        />

        <button
          disabled={loading}
          className="w-full bg-black text-white p-2 rounded"
        >
          {loading ? 'Verifying...' : 'Verify OTP'}
        </button>
      </form>
    </div>
  );
};

export default OTPVerificationPage;