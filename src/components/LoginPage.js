import { useState } from 'react';
import LoginForm from './LoginForm';
import ToggleButton from './ToggleButton';

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
          <ToggleButton login={login} label='Login' handleToggle={handleToggle} />
          <ToggleButton login={!login} label='Signup' handleToggle={handleToggle} />
        </div>
        <LoginForm login={login} />
      </section>
    </main>
  );
}
