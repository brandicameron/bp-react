import { useState } from 'react';
import Form from './Form';

export default function LoginPage() {
  const [login, setLogin] = useState(true);

  const handleToggle = () => {
    setLogin((prev) => !prev);
  };

  return (
    <main className='login-page'>
      <section className='form-container'>
        <h1 className='form-title'>{login ? 'Login' : 'Signup'}</h1>
        <div className='toggle'>
          <button
            onClick={handleToggle}
            className={login ? 'toggle-btn active-bg' : 'toggle-btn'}
            disabled={login ? true : false}
          >
            Login
          </button>
          <button
            onClick={handleToggle}
            className={login ? 'toggle-btn' : 'toggle-btn active-bg'}
            disabled={login ? false : true}
          >
            Signup
          </button>
        </div>
        <Form login={login} />
      </section>
    </main>
  );
}
