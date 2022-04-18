export default function Ratings() {
  return (
    <aside>
      <ul class='rating-list'>
        <li class='rating'>
          <span class='rating-color normal'>{'\u2B24'}</span>Normal
        </li>
        <li class='rating'>
          <span class='rating-color elevated'>{'\u2B24'}</span>Elevated
        </li>
        <li class='rating'>
          <span class='rating-color stage-1'>{'\u2B24'}</span>Stage 1
        </li>
        <li class='rating'>
          <span class='rating-color stage-2'>{'\u2B24'}</span>Stage 2
        </li>
      </ul>
    </aside>
  );
}
