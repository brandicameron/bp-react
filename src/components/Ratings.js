import { useState, useEffect } from 'react';

export default function Ratings() {
  const [showDescription, setShowDescription] = useState(false);
  const [description, setDescription] = useState({
    heading: '',
    message: '',
  });

  useEffect(() => {
    if (description.heading) {
      setShowDescription(true);
      let timer = setTimeout(() => {
        setShowDescription(false);
      }, 2500);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [description]);

  const handleRatingClick = (e) => {
    const rating = e.target.getAttribute('data-rating');

    switch (rating) {
      case 'normal':
        setDescription({
          heading: 'Normal',
          message: '120 or Less / 80 or Less',
        });
        break;
      case 'elevated':
        setDescription({
          heading: 'Elevated',
          message: '121 - 129 / 80 or Less',
        });
        break;
      case 'stage-1':
        setDescription({
          heading: 'Stage 1',
          message: '130 - 139 / 81 - 89',
        });
        break;
      case 'stage-2':
        setDescription({
          heading: 'Stage 2',
          message: '140 or Higher / 90 or Higher',
        });
        break;
      default:
        setDescription({
          heading: 'Normal',
          message: '120 or Less / 80 or Less',
        });
    }
  };

  return (
    <aside className='ratings'>
      <small
        className={showDescription ? 'rating-description show-description' : 'rating-description'}
      >
        <span className='label'>{description.heading}</span> {description.message}
      </small>
      <ul class='rating-list'>
        {colorRatings.map((rating) => (
          <li key={rating} class='rating'>
            <button
              onClick={handleRatingClick}
              data-rating={rating.class}
              title='Click for more info'
            >
              <span class={rating.class}>{'\u2B24'}</span>
              {rating.label}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}

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
