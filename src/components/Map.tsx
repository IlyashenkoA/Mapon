import {
  GoogleMap,
  DirectionsRenderer,
  useJsApiLoader,
  Marker,
} from '@react-google-maps/api';
import { useState } from 'react';
import { Dispatch } from 'redux';

import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import { fetchRouteDirection } from '../store/action-creators/action-creators';
import {
  IRouteUnit,
  ILocation,
} from '../store/types/IRoutes';
import { useDispatch } from 'react-redux';

type ICoordinates = {
  origin: ILocation;
  destination: ILocation;
  setIsError: (value: boolean) => void;
  dispatch: Dispatch;
};

const getDirection = ({
  origin,
  destination,
  setIsError,
  dispatch,
}: ICoordinates) => {
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
        }

        return result;
      } else {
        setIsError(true);
      }
    }
  );

  return undefined;
};

const formatDirections = (routes: IRouteUnit) => {
  const route = routes.units[0].routes;

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

const Map: React.FC<{ routes: IRouteUnit }> = ({
  routes,
}) => {
  const dispatch = useDispatch();
  const [isError, setIsError] = useState(false);
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API,
  });

  const [origin, destination] = formatDirections(routes);

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
        <DirectionsRenderer
          directions={getDirection({
            origin,
            destination,
            setIsError,
            dispatch,
          })}
        />
      </GoogleMap>
    );
  }

  return <Skeleton />;
};

export default Map;
