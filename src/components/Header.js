import { useLogout } from '../hooks/useLogout';
import Logo from '../images/heart.svg';
import AccountIcon from '../images/account.svg';

export default function Header() {
  const { logoutUser } = useLogout();

  const handleLogout = () => {
    logoutUser();
  };

  return (
    <header className='header'>
      <a href='/'>
        <img src={Logo} width='30' height='30' alt='Go back home.' />
      </a>
      <h1 className='title'>Blood Pressure Readings</h1>
      <img src={AccountIcon} className='account-icon' width='30' height='30' alt='Your account.' />
      <button className='logout-btn' onClick={handleLogout}>
        Logout
      </button>
    </header>
  );
}
