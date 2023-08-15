import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const Info: React.FC<google.maps.DirectionsResult> = ({
  routes,
}) => {
  const distance = routes[0]?.legs[0].distance?.value;
  const duration = routes[0]?.legs[0].duration?.value;

  const formatDuration = (duration: number) => {
    if (duration < 60) return `${duration}m`;

    if (duration === 60) return '1h';

    if (duration > 60) {
      const hours = Math.floor(duration / 60);
      const minutes = duration - hours * 60;
      return `${hours}h ${minutes}m`;
    }
  };

  return (
    <div className='route__info'>
      <div className='info__distance'>
        <span>
          {distance !== undefined ? (
            (distance / 1000).toFixed(1)
          ) : (
            <Skeleton />
          )}
        </span>
        <label>Km driven</label>
      </div>
      <div className='info__driving-time'>
        <span>
          {duration !== undefined ? (
            formatDuration(Math.round(duration / 60))
          ) : (
            <Skeleton />
          )}
        </span>
        <label>Driving time</label>
      </div>
    </div>
  );
};

export default Info;
