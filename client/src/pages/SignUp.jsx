import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import OAuth from '../components/OAuth';

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage('Please fill out all fields.');
    }

    try {
      setLoading(true);
      setErrorMessage(null);

      // Send OTP first
      const res = await fetch('/api/otp/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email }),
      });

      const data = await res.json();

      if (res.ok) {
        // Navigate to OTP verification page with form data
        navigate('/verify-otp', {
          state: {
            email: formData.email,
            username: formData.username,
            password: formData.password,
          },
        });
      } else {
        setErrorMessage(data.message);
      }
    } catch (error) {
      setErrorMessage('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen mt-20'>
      <div className='flex p-3 max-w-4xl mx-auto flex-col md:flex-row md:items-center gap-10'>
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
            Join a community of NSUT students sharing real placement insights. <br />
            Learn from your seniors and ace your interviews.
          </p>

          <p className="text-sm mt-6 text-gray-400">
            You can sign up with your NSUT email and password or continue with Google.
          </p>
          <p className="text-xs mt-2 text-gray-500">
            Only @nsut.ac.in email addresses are allowed.
          </p>
        </div>
        {/* right */}

        <div className='flex-1'>
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <div>
              <Label value='Your username' />
              <TextInput
                type='text'
                placeholder='Username'
                id='username'
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value='Your email' />
              <TextInput
                type='email'
                placeholder='yourname@nsut.ac.in'
                id='email'
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value='Your password' />
              <TextInput
                type='password'
                placeholder='Password'
                id='password'
                onChange={handleChange}
              />
            </div>
            <Button
              gradientDuoTone='purpleToPink'
              type='submit'
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size='sm' />
                  <span className='pl-3'>Sending OTP...</span>
                </>
              ) : (
                'Send Verification Code'
              )}
            </Button>
            <OAuth />
          </form>
          <div className='flex gap-2 text-sm mt-5'>
            <span>Have an account?</span>
            <Link to='/sign-in' className='text-blue-500'>
              Sign In
            </Link>
          </div>
          {errorMessage && (
            <Alert className='mt-5' color='failure'>
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}
