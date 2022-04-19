import './scss/App.scss';
import { useState, useEffect } from 'react';
import { useUser } from './hooks/useUser';
import LoginPage from './components/LoginPage';
import Header from './components/Header';
import Ratings from './components/Ratings';
import Readings from './components/Readings';
import NewReading from './components/NewReading';
import SplashPage from './components/SplashPage';

export default function App() {
  const [showSplashPage, setShowSplashPage] = useState(true);
  const { loggedIn } = useUser();

  useEffect(() => {
    let timer1 = setTimeout(() => {
      setShowSplashPage(false);
    }, 1500);
    return () => {
      clearTimeout(timer1);
    };
  }, []);

  return (
    <>
      {showSplashPage && <SplashPage />}
      {!loggedIn && <LoginPage />}
      {loggedIn && (
        <>
          <Header />
          <Ratings />
          <Readings />
          <NewReading />
        </>
      )}
    </>
  );
}
