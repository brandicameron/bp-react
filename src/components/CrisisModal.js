export default function CrisisModal({ lastReading, closeCrisisModal }) {
  return (
    <section className='crisis-modal'>
      <div className='crisis-message'>
        <h1 className='warning'>WARNING</h1>
        <p>
          Your blood pressure reading of{' '}
          <span className='attention'>
            {lastReading.systolic}/{lastReading.diastolic}{' '}
          </span>
          indicates a<span className='attention'> Hypertensive Crisis</span>.
        </p>
        <p className='attention-box'>Please call your doctor or dial 911.</p>
        <button onClick={closeCrisisModal} aria-label='close' class='close'>
          X
        </button>
      </div>
    </section>
  );
}
