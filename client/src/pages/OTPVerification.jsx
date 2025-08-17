import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

export default function OTPVerification() {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [resendLoading, setResendLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const navigate = useNavigate();
  const location = useLocation();
  const { email, username, password } = location.state || {};

  // Redirect if no email data
  if (!email || !username || !password) {
    navigate('/sign-up');
    return null;
  }

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    if (!otp || otp.length !== 6) {
      return setErrorMessage('Please enter a valid 6-digit OTP');
    }

    try {
      setLoading(true);
      setErrorMessage(null);

      const res = await fetch('/api/otp/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          otp,
          username,
          password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccessMessage('Email verified successfully! Redirecting to sign in...');
        setTimeout(() => {
          navigate('/sign-in');
        }, 2000);
      } else {
        setErrorMessage(data.message);
      }
    } catch (error) {
      setErrorMessage('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    try {
      setResendLoading(true);
      setErrorMessage(null);

      const res = await fetch('/api/otp/resend-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccessMessage('OTP resent successfully! Check your email.');
        setCountdown(60);
        const timer = setInterval(() => {
          setCountdown((prev) => {
            if (prev <= 1) {
              clearInterval(timer);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      } else {
        setErrorMessage(data.message);
      }
    } catch (error) {
      setErrorMessage('Failed to resend OTP. Please try again.');
    } finally {
      setResendLoading(false);
    }
  };

  const handleOtpChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
    setOtp(value);
  };

  return (
    <div className='min-h-screen mt-20'>
      <div className='flex p-3 max-w-2xl mx-auto flex-col md:flex-row md:items-center gap-10'>
        {/* left */}
        <div className="flex-1">
          <Link to="/" className="block mb-4">
            <h1 className="text-4xl font-extrabold dark:text-white">
              <span className="px-3 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-xl text-white shadow">
                NSUTExperienceX
              </span>
            </h1>
          </Link>

          <p className="text-lg font-medium text-gray-300 dark:text-gray-300 max-w-md leading-relaxed">
            Almost there! Verify your email to complete your registration.
          </p>

          <p className="text-sm mt-6 text-gray-400">
            We've sent a 6-digit verification code to <strong>{email}</strong>
          </p>
        </div>

        {/* right */}
        <div className='flex-1'>
          <form className='flex flex-col gap-4' onSubmit={handleVerifyOTP}>
            <div>
              <Label value='Enter OTP' />
              <TextInput
                type='text'
                placeholder='123456'
                value={otp}
                onChange={handleOtpChange}
                maxLength={6}
                className='text-center text-2xl font-mono tracking-widest'
              />
              <p className="text-xs mt-1 text-gray-500">
                Enter the 6-digit code sent to your email
              </p>
            </div>

            <Button
              gradientDuoTone='purpleToPink'
              type='submit'
              disabled={loading || otp.length !== 6}
            >
              {loading ? (
                <>
                  <Spinner size='sm' />
                  <span className='pl-3'>Verifying...</span>
                </>
              ) : (
                'Verify Email'
              )}
            </Button>
          </form>

          <div className='mt-4 text-center'>
            <p className="text-sm text-gray-500 mb-2">
              Didn't receive the code?
            </p>
            <Button
              size='sm'
              color='gray'
              outline
              disabled={resendLoading || countdown > 0}
              onClick={handleResendOTP}
            >
              {resendLoading ? (
                <>
                  <Spinner size='sm' />
                  <span className='pl-2'>Sending...</span>
                </>
              ) : countdown > 0 ? (
                `Resend in ${countdown}s`
              ) : (
                'Resend OTP'
              )}
            </Button>
          </div>

          <div className='flex gap-2 text-sm mt-5 justify-center'>
            <span>Already have an account?</span>
            <Link to='/sign-in' className='text-blue-500'>
              Sign In
            </Link>
          </div>

          {errorMessage && (
            <Alert className='mt-5' color='failure'>
              {errorMessage}
            </Alert>
          )}

          {successMessage && (
            <Alert className='mt-5' color='success'>
              {successMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}
