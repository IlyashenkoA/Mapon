import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const Info: React.FC<google.maps.DirectionsResult> = ({
  routes,
}) => {
  const distance = routes[0]?.legs[0].distance?.text;
  const duration = routes[0]?.legs[0].duration?.text;

  return (
    <div className='route__info'>
      <div className='info__distance'>
        <span>{distance ? distance : <Skeleton />}</span>
        <label>Km driven</label>
      </div>
      <span></span>
      <div className='info__driving-time'>
        <span>{duration ? duration : <Skeleton />}</span>
        <label>Driving time</label>
      </div>
    </div>
  );
};

export default Info;
