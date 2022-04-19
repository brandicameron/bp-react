import './scss/App.scss';
import { useUser } from './hooks/useUser';
import LoginPage from './components/LoginPage';
import Header from './components/Header';
import Ratings from './components/Ratings';
import Readings from './components/Readings';
import AddReading from './components/AddReading';

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
          <AddReading />
        </>
      )}
    </>
  );
}

export default App;
