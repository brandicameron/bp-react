import { useState, useRef, useEffect } from 'react';
import { useLogin } from '../hooks/useLogin';
import { useSignInGuest } from '../hooks/useSignInGuest';
import { useSignUp } from '../hooks/useSignUp';
import { useForgotPassword } from '../hooks/useForgotPassword';

export default function LoginForm({ login }) {
  const userEmailRef = useRef();
  const userPasswordRef = useRef();
  const [inputs, setInputs] = useState({});
  const [showMessage, setShowMessage] = useState(true);
  const { loginUser } = useLogin();
  const { loginGuest } = useSignInGuest();
  const { signUpUser, errorMessage } = useSignUp();
  const { sendPasswordReset, forgotPasswordText } = useForgotPassword();

  // Capture the user email/password if the browser autofills it
  useEffect(() => {
    setTimeout(() => {
      let email = userEmailRef.current.value;
      let password = userPasswordRef.current.value;
      setInputs({ email: email, password: password });
    }, 100);
  }, []);

  // Show/hide password length requirement message
  useEffect(() => {
    setShowMessage(true);
    if (inputs.password) {
      if (inputs.password.length > 5) {
        setShowMessage(false);
      } else {
        setShowMessage(true);
      }
    }
  }, [inputs.password]);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (e, email, password) => {
    e.preventDefault();
    if (login) {
      loginUser(email, password);
    } else {
      signUpUser(email, password);
    }
  };

  return (
    <form onSubmit={(e) => handleSubmit(e, inputs.email, inputs.password)}>
      <input
        onChange={handleChange}
        name='email'
        type='email'
        placeholder='Email Address'
        required
        ref={userEmailRef}
      />
      <p className='error'></p>
      <input
        onChange={handleChange}
        name='password'
        type='password'
        placeholder={login ? 'Password' : 'Create Password'}
        required
        minLength={6}
        ref={userPasswordRef}
      />

      <p className='message error'>
        {!login && showMessage && !errorMessage && (
          <span>*Password must be at least 6 characters.</span>
        )}
        {!login && errorMessage && <span>{errorMessage}</span>}
        {login && (
          <button onClick={() => sendPasswordReset(inputs.email)} className='message link-button'>
            {forgotPasswordText}
          </button>
        )}
      </p>

      <input className='submit-btn' type='submit' value={login ? 'Login' : 'Signup'} />
      {/* uses visiblity styles so the button can hide on signup page & still retain space */}
      <button
        onClick={loginGuest}
        className='submit-btn'
        style={login ? { visibility: 'visible' } : { visibility: 'hidden' }}
      >
        or Enter as Guest
      </button>
    </form>
  );
}
