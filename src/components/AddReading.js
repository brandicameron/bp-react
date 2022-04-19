import { useState, useRef, useEffect } from 'react';
import { useAddReading } from '../hooks/useAddReading';

export default function AddReading() {
  const [readingInputs, setReadingInputs] = useState({});
  const [openForm, setOpenForm] = useState(false);
  const [systolicMaxLength, setSystolicMaxLength] = useState(3);
  const [diastolicMaxLength, setDiastolicMaxLength] = useState(2);
  const systolic = useRef();
  const diastolic = useRef();
  const pulse = useRef();
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

  const handleOpenForm = () => {
    setOpenForm((prev) => !prev);
    systolic.current.focus();
  };

  useEffect(() => {
    if (!openForm) {
      // Scrolls window to top on mobile after closing add reading form to show most recent reading
      window.scrollTo({ top: 0, behavior: 'smooth' });

      // Close keyboard on mobile when add reading form is lowered
      systolic.current.blur();
      diastolic.current.blur();
      pulse.current.blur();
    }
  }, [openForm]);

  const handleChange = (e) => {
    determineMaxLengthForInputs(e);

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

    setReadingInputs((values) => ({ ...values, [name]: value, month, day, year, time }));

    // auto tab to next input once maxLength is reached
    if (name === 'systolic' && value.length === e.target.maxLength) {
      diastolic.current.focus();
    }
    if (name === 'diastolic' && value.length === e.target.maxLength) {
      pulse.current.focus();
    }
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
              onChange={handleChange}
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
              onChange={handleChange}
              ref={diastolic}
            ></input>
          </label>
          <label className='pulse-label'>
            Pulse
            <input
              className='add-reading-input'
              type='tel'
              value={readingInputs.pulse || ''}
              name='pulse'
              onChange={handleChange}
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
