import { useState, useRef, useEffect } from 'react';
import { useLogin } from '../hooks/useLogin';
import { useSignInGuest } from '../hooks/useSignInGuest';
import { useSignUp } from '../hooks/useSignUp';
import { useForgotPassword } from '../hooks/useForgotPassword';

export default function Form({ login }) {
  const { loginUser } = useLogin();
  const { loginGuest } = useSignInGuest();
  const { signUpUser } = useSignUp();
  const { sendPasswordReset, forgotPasswordText } = useForgotPassword();
  const userEmailRef = useRef();
  const userPasswordRef = useRef();
  const [inputs, setInputs] = useState({});
  const [showMessage, setShowMessage] = useState(true);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  useEffect(() => {
    setTimeout(() => {
      let email = userEmailRef.current.value;
      let password = userPasswordRef.current.value;
      setInputs({ email: email, password: password });
    }, 100);
  }, []);

  const handleSubmit = (e, email, password) => {
    e.preventDefault();
    if (login) {
      loginUser(email, password);
    } else {
      signUpUser(email, password);
    }
  };

  // show/hide password length requirement message
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
        {!login && showMessage && <span>*Password must be at least 6 characters.</span>}
        {login && (
          <button onClick={() => sendPasswordReset(inputs.email)} className='message link-button'>
            {forgotPasswordText}
          </button>
        )}
      </p>

      <input className='submit-btn' type='submit' value={login ? 'Login' : 'Signup'} />
      <button onClick={loginGuest} className='message link-button'>
        or Enter as Guest
      </button>
    </form>
  );
}
