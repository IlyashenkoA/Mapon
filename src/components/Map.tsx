import {
  GoogleMap,
  DirectionsRenderer,
  useJsApiLoader,
  Marker,
} from '@react-google-maps/api';
import { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { useDispatch } from 'react-redux';

import { fetchRouteDirection } from '../store/action-creators/action-creators';
import { IRoute } from '../store/types/IRoutes';

import 'react-loading-skeleton/dist/skeleton.css';

const formatDirections = (routes: IRoute[]) => {
  const route = routes[0].routes;

  const origin = {
    lat: route[0].start
      ? route[0].start.lat
      : route[0].end.lat,
    lng: route[0].start
      ? route[0].start.lng
      : route[0].end.lng,
  };
  const destination = {
    lat: route[route.length - 1].end
      ? route[route.length - 1].end.lat
      : route[route.length - 1].start.lat,
    lng: route[route.length - 1].end
      ? route[route.length - 1].end.lng
      : route[route.length - 1].start.lng,
  };

  return [origin, destination];
};

const Map: React.FC<{ routes: IRoute[] }> = ({
  routes,
}) => {
  const dispatch = useDispatch();
  const [isError, setIsError] = useState(false);
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API,
    language: 'en',
  });

  const [origin, destination] = formatDirections(routes);
  const [directions, setDirections] =
    useState<google.maps.DirectionsResult | null>(null);

  useEffect(() => {
    if (isLoaded) {
      const directionsService =
        new google.maps.DirectionsService();

      directionsService.route(
        {
          origin: origin,
          destination: destination,
          travelMode: google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
            if (result) {
              setIsError(false);
              dispatch(fetchRouteDirection(result));
              setDirections(result);
            }

            return result;
          } else {
            setIsError(true);
          }
        }
      );
    }
  }, [isLoaded, routes]);

  if (isError) {
    return <Skeleton />;
  }

  if (isLoaded) {
    return (
      <GoogleMap
        zoom={8}
        center={origin}
        options={{
          zoomControl: false,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
        }}
      >
        <Marker
          position={origin}
          icon={{
            url: require('../assets/images/marker.png'),
          }}
        />
        <Marker
          position={destination}
          icon={{
            url: require('../assets/images/marker.png'),
          }}
        />
        {directions && (
          <DirectionsRenderer
            directions={directions}
            options={{
              suppressMarkers: true,
            }}
          />
        )}
      </GoogleMap>
    );
  }

  return <Skeleton />;
};

export default Map;
