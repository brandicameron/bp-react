export default function ToggleButton({ login, label, handleToggle }) {
  return (
    <button
      onClick={handleToggle}
      className={login ? 'toggle-btn active-bg' : 'toggle-btn'}
      disabled={login ? true : false}
    >
      {label}
    </button>
  );
}
