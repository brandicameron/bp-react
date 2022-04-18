import { useState, useEffect } from 'react';
import { useReadings } from '../hooks/useReadings';
import Arrow from '../images/arrow.svg';
import Reading from './Reading';

export default function Readings() {
  const [noReadings, setNoReadings] = useState(true);
  const { userReadings } = useReadings();

  useEffect(() => {
    if (userReadings.length === 0) {
      setNoReadings(true);
    } else if (userReadings.length > 0) {
      setNoReadings(false);
    }
  }, [userReadings]);

  return (
    <main>
      {noReadings && (
        <section className='no-readings'>
          <h2>Click Below to Add Your First Reading</h2>
          <img className='arrow' src={Arrow} alt='Downward arrow.' />
        </section>
      )}
      <ul className='readings'>
        {userReadings.map((reading) => (
          <Reading reading={reading} key={reading.id} />
        ))}
      </ul>
    </main>
  );
}
