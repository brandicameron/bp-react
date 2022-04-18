import { useState } from 'react';
import TrashCan from '../images/trash-can.svg';
import { useDeleteReading } from '../hooks/useDeleteReading';

export default function Reading({ reading }) {
  const [animate, setAnimate] = useState(false);
  const { deleteReading } = useDeleteReading();

  function bpColorRating(systolic, diastolic) {
    if (systolic >= 180 || diastolic >= 120) {
      console.log('Make Danger Modal');
    } else if (systolic >= 140 || diastolic >= 90) {
      return 'stage-2';
    } else if (systolic >= 130 || diastolic >= 80) {
      return 'stage-1';
    } else if (systolic >= 120 || diastolic >= 80) {
      return 'elevated';
    } else {
      return 'normal';
    }
  }

  const handleDelete = (e) => {
    const id = e.currentTarget.id;
    setAnimate(true);
    setTimeout(() => {
      deleteReading(id);
    }, 300);
  };

  return (
    <li className={animate ? 'card delete-slideaway' : 'card'}>
      <div className='reading'>
        <h2 className={`reading ${bpColorRating(reading.sys, reading.dia)}`}>
          {reading.sys}/{reading.dia}
        </h2>
        <p className='date'>
          {reading.month} {reading.day}, {reading.year} @ {reading.time}
        </p>
      </div>
      <h3 className='pulse'>{reading.pulse}</h3>
      <button className='delete-btn' id={`${reading.id}`} onClick={handleDelete}>
        <img className='trash-icon' src={TrashCan} alt='Delete Reading' />
      </button>
    </li>
  );
}
