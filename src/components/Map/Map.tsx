import {
  GoogleMap,
  DirectionsRenderer,
  useJsApiLoader,
  Marker
} from "@react-google-maps/api";
import { useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { IRouteUnit } from "../../store/types/IRoutes";

interface ICoordinates {
  origin: ILocation
  destination: ILocation
  setIsError: (value: boolean) => void
}

interface ILocation {
  lat: number,
  lng: number
}

function getCoordinates({ origin, destination, setIsError }: ICoordinates) {
  const directionsService = new google.maps.DirectionsService();

  directionsService.route(
    {
      origin: origin,
      destination: destination,
      travelMode: google.maps.TravelMode.DRIVING
    },
    (result, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        return result;
      } else {
        setIsError(true);
      }
    }
  );
  return undefined;
}

const formatDirections = (routes: IRouteUnit) => {
  const route = routes.units[0].routes;

  const origin = { lat: route[0].start ? route[0].start.lat : route[0].end.lat, lng: route[0].start ? route[0].start.lng : route[0].end.lng };
  const destination = { lat: route[route.length - 1].end ? route[route.length - 1].end.lat : route[route.length - 1].start.lat, lng: route[route.length - 1].end ? route[route.length - 1].end.lng : route[route.length - 1].start.lng };

  return [origin, destination]
}

const Map: React.FC<{ routes: IRouteUnit }> = ({ routes }) => {
  const [isError, setIsError] = useState(false);
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API
  })

  const [origin, destination] = formatDirections(routes);

  if (isError) {
    return <Skeleton width={600} height={200} />;
  }

  if (isLoaded) {
    return (
      <GoogleMap
        zoom={8}
        center={origin}
        mapContainerStyle={{ width: "600px", height: "200px" }}
        options={{
          zoomControl: false,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false
        }
      }
      >
        <Marker position={origin} icon={{
          url: (require('../../images/marker.png'))
        }} />
        <Marker position={destination} icon={{
          url: (require('../../images/marker.png'))
        }} />
        {/* <DirectionsRenderer directions={getCoordinates({ origin, destination, setIsError })} /> */}
      </GoogleMap>
    );
  };

  return <Skeleton width={600} height={200} />;
};

export default Map;
