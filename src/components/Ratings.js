export default function Ratings() {
  const colorRatings = [
    {
      class: 'normal',
      label: 'Normal',
    },
    {
      class: 'elevated',
      label: 'Elevated',
    },
    {
      class: 'stage-1',
      label: 'Stage 1',
    },
    {
      class: 'stage-2',
      label: 'Stage 2',
    },
  ];

  return (
    <aside>
      <ul class='rating-list'>
        {colorRatings.map((rating) => (
          <li class='rating'>
            <span class={rating.class}>{'\u2B24'}</span>
            {rating.label}
          </li>
        ))}
      </ul>
    </aside>
  );
}
