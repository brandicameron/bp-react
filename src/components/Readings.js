import { useState, useEffect } from 'react';
import { useReadingData } from '../hooks/useReadingData';
import Reading from './Reading';
import Arrow from '../images/arrow.svg';
import CrisisModal from './CrisisModal';

export default function Readings() {
  const [noReadings, setNoReadings] = useState(false);
  const [lastReading, setLastReading] = useState({});
  const [openCrisisModal, setOpenCrisisModal] = useState(false);
  const { userReadings } = useReadingData();

  useEffect(() => {
    if (userReadings !== null) {
      if (userReadings.length === 0) {
        setNoReadings(true);
      } else if (userReadings.length > 0) {
        setNoReadings(false);
        setLastReading({
          systolic: parseInt(userReadings[0].sys),
          diastolic: parseInt(userReadings[0].dia),
        });
      }
    }
  }, [userReadings]);

  useEffect(() => {
    if (lastReading.systolic >= 180 || lastReading.diastolic >= 120) {
      setOpenCrisisModal(true);
    }
  }, [lastReading]);

  const closeCrisisModal = () => {
    setOpenCrisisModal(false);
  };

  return (
    <main>
      {openCrisisModal && (
        <CrisisModal lastReading={lastReading} closeCrisisModal={closeCrisisModal} />
      )}
      {noReadings && (
        <section className='no-readings'>
          <h2>Click Below to Add Your First Reading</h2>
          <img className='arrow' src={Arrow} alt='Downward arrow.' />
        </section>
      )}
      <ul className='readings'>
        {userReadings?.map((reading) => (
          <Reading reading={reading} key={reading.id} />
        ))}
      </ul>
    </main>
  );
}
