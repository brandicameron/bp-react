import { useState, useRef, useEffect } from 'react';
import { useAddReading } from '../hooks/useAddReading';

export default function AddReading() {
  const [readingInputs, setReadingInputs] = useState({});
  const [openForm, setOpenForm] = useState(false);
  const systolic = useRef();
  const diastolic = useRef();
  const pulse = useRef();

  const { addReading } = useAddReading();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleOpenForm = () => {
    setOpenForm((prev) => !prev);
    systolic.current.focus();
  };

  // Scroll window to top on mobile after add reading form closes
  useEffect(() => {
    if (!openForm) {
      // window.scrollTo(0, 0);
      window.scrollTo({ top: 0, behavior: 'smooth' });

      // Close keyboard on mobile when add reading form is lowered
      systolic.current.blur();
      diastolic.current.blur();
      pulse.current.blur();
    }
  }, [openForm]);

  const handleChange = (e) => {
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
    if (e.target.name === 'systolic' && e.target.value.length === e.target.maxLength) {
      diastolic.current.focus();
    }
    if (e.target.name === 'diastolic' && e.target.value.length === e.target.maxLength) {
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
              maxlength='3'
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
              maxlength='2'
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
