import { Button } from 'flowbite-react';
import { AiFillGoogleCircle } from 'react-icons/ai';
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess, signInFailure } from '../redux/user/userSlice';
import { useNavigate, useLocation } from 'react-router-dom';

export default function OAuth() {
    const auth = getAuth(app)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const isSignUp = location.pathname === '/sign-up'
    
    const handleGoogleClick = async () => {
        console.log('Google OAuth button clicked');
        const provider = new GoogleAuthProvider()
        provider.setCustomParameters({ prompt: 'select_account' })
        
        try {
            console.log('Attempting Google sign-in popup...');
            const resultsFromGoogle = await signInWithPopup(auth, provider)
            console.log('Google sign-in successful:', resultsFromGoogle.user.email);
            
            // Check if the email is from NSUT domain before making the API call
            const email = resultsFromGoogle.user.email;
            if (!email.endsWith('@nsut.ac.in')) {
                console.log('Non-NSUT email detected:', email);
                dispatch(signInFailure('Only @nsut.ac.in email addresses are allowed for Google sign-in'))
                return;
            }
            
            console.log('Making API call to /api/auth/google...');
            const res = await fetch('/api/auth/google', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: resultsFromGoogle.user.displayName,
                    email: resultsFromGoogle.user.email,
                    googlePhotoUrl: resultsFromGoogle.user.photoURL,
                }),
            })
            const data = await res.json()
            console.log('API response:', data);
            
            if (res.ok) {
                console.log('Google OAuth successful, dispatching signInSuccess');
                dispatch(signInSuccess(data))
                navigate('/')
            } else {
                console.log('API error:', data.message);
                dispatch(signInFailure(data.message || 'Google sign in failed. Please try again.'))
            }
        } catch (error) {
            console.log('Google OAuth Error:', error);
            // Check if it's a Firebase auth error or network error
            if (error.code === 'auth/popup-closed-by-user') {
                dispatch(signInFailure('Sign-in was cancelled. Please try again.'))
            } else if (error.code === 'auth/popup-blocked') {
                dispatch(signInFailure('Pop-up was blocked. Please allow pop-ups and try again.'))
            } else if (error.code === 'auth/network-request-failed') {
                dispatch(signInFailure('Network error. Please check your internet connection.'))
            } else {
                dispatch(signInFailure('Google sign in failed. Please try again.'))
            }
        }
    }
    
    return (
        <Button 
            type='button' 
            gradientDuoTone='pinkToOrange' 
            outline 
            onClick={handleGoogleClick}
            className='w-full'
        >
            <AiFillGoogleCircle className='w-6 h-6 mr-2' />
            Continue with Google
        </Button>
    )
}