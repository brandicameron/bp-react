import { useState, useRef, useEffect } from 'react';
import { useAddReading } from '../hooks/useAddReading';

export default function NewReading() {
  const systolic = useRef();
  const diastolic = useRef();
  const pulse = useRef();
  const [readingInputs, setReadingInputs] = useState({});
  const [openForm, setOpenForm] = useState(false);
  const [systolicMaxLength, setSystolicMaxLength] = useState(3);
  const [diastolicMaxLength, setDiastolicMaxLength] = useState(2);
  const { addReading } = useAddReading();

  // Auto-tab assist
  const determineMaxLengthForInputs = (e) => {
    if (e.target.name === 'systolic') {
      if (parseInt(e.target.value[0]) > 1) {
        setSystolicMaxLength(2);
      } else {
        setSystolicMaxLength(3);
      }
    }

    if (e.target.name === 'diastolic') {
      if (parseInt(e.target.value[0]) === 1) {
        setDiastolicMaxLength(3);
      } else {
        setDiastolicMaxLength(2);
      }
    }
  };

  const autoTabAfterMaxLength = (e) => {
    if (e.target.name === 'systolic' && e.target.value.length === e.target.maxLength) {
      diastolic.current.focus();
    }
    if (e.target.name === 'diastolic' && e.target.value.length === e.target.maxLength) {
      pulse.current.focus();
    }
  };

  const handleOpenForm = () => {
    setOpenForm((prev) => !prev);
    systolic.current.focus();
  };

  useEffect(() => {
    if (!openForm) {
      // Scrolls window to top (for mobile) after closing form to show most recent reading
      window.scrollTo({ top: 0, behavior: 'smooth' });

      // Closes keyboard on mobile when form is lowered
      systolic.current.blur();
      diastolic.current.blur();
      pulse.current.blur();
    }
  }, [openForm]);

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const date = new Date();
    const month = date.toLocaleString('default', { month: 'short' });
    const day = date.getDate();
    const year = date.getFullYear();
    const time = new Date().toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });

    determineMaxLengthForInputs(e);
    autoTabAfterMaxLength(e);
    setReadingInputs((values) => ({ ...values, [name]: value, month, day, year, time }));
  };

  const handleAddNewReading = (e) => {
    e.preventDefault();
    addReading(readingInputs);
    setReadingInputs({});
    setOpenForm(false);
  };

  return (
    <form
      className={openForm ? 'add-reading-form active' : 'add-reading-form'}
      onSubmit={handleAddNewReading}
    >
      <button
        type='button'
        className='add-reading-btn'
        onClick={handleOpenForm}
        aria-label='Add a new reading.'
      >
        {openForm ? '–' : '+'}
      </button>
      <div className='form-elements'>
        <div className='reading-input-group'>
          <label>
            Systolic
            <input
              className='add-reading-input'
              type='tel'
              name='systolic'
              value={readingInputs.systolic || ''}
              maxlength={systolicMaxLength}
              onChange={handleInputChange}
              ref={systolic}
            ></input>
          </label>
          <div class='slash'>/</div>
          <label>
            Diastolic
            <input
              className='add-reading-input'
              type='tel'
              name='diastolic'
              value={readingInputs.diastolic || ''}
              maxlength={diastolicMaxLength}
              onChange={handleInputChange}
              ref={diastolic}
            ></input>
          </label>
          <label className='pulse-label'>
            Pulse
            <input
              className='add-reading-input'
              type='tel'
              name='pulse'
              value={readingInputs.pulse || ''}
              onChange={handleInputChange}
              ref={pulse}
            ></input>
          </label>
        </div>
        <button class='save-btn' type='submit'>
          Save
        </button>
      </div>
    </form>
  );
}
