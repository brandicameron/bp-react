import './scss/App.scss';
import { useUser } from './hooks/useUser';
import LoginPage from './components/LoginPage';
import Header from './components/Header';
import Ratings from './components/Ratings';
import Readings from './components/Readings';
import NewReading from './components/NewReading';

function App() {
  const { loggedIn } = useUser();

  return (
    <>
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

export default App;
