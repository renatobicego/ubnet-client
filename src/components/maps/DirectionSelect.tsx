import { useAutocompleteSuggestions } from "@/utils/hooks/useAutocompleteSuggestion";
import { Autocomplete, AutocompleteItem } from "@heroui/react";
import { FaLocationDot } from "react-icons/fa6";
const DirectionSelect = ({
  handleChangeLocation,
  map,
}: {
  handleChangeLocation: (lat: number, lng: number) => void;
  map: google.maps.Map | null;
}) => {
  const {
    suggestions: placePredictions,
    getPlacePredictions,
    isLoading: isPlacePredictionsLoading,
  } = useAutocompleteSuggestions({
    includedPrimaryTypes: [
      "locality",
      "sublocality",
      "postal_code",
      "street_address",
      "country",
    ],
  });
  // Function to geocode lat/lng into an address
  const geocodeLatLng = (lat: number, lng: number) => {
    const geocoder = new google.maps.Geocoder();
    const latlng = { lat, lng };

    geocoder.geocode({ location: latlng }, (results, status) => {
      if (status === "OK" && results) {
        handleChangeLocation(lat, lng);
      } else {
        console.error("Geocode was not successful: " + status);
      }
    });
  };

  const handleSelectPlace = (placeId: string) => {
    if (map && placeId) {
      const service = new google.maps.places.PlacesService(map);
      service.getDetails({ placeId: placeId }, (result, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && result) {
          const location = result.geometry?.location;
          if (location) {
            const lat = location.lat();
            const lng = location.lng();
            geocodeLatLng(lat, lng);
          }
        }
      });
    }
  };

  return (
    <Autocomplete
      label="Ubicación / Localidad"
      placeholder="Ingresa una ubicación, calle o localidad"
      autoComplete="hidden"
      radius="full"
      listboxProps={{
        emptyContent: "No se encontraron resultados",
      }}
      variant="bordered"
      className="text-black"
      description="Ingrese una ubicación y seleccione de la lista."
      onValueChange={(value) => {
        getPlacePredictions(value);
      }}
      onSelectionChange={(key) => handleSelectPlace(key as string)}
      isLoading={isPlacePredictionsLoading}
    >
      {placePredictions.map((place) => (
        <AutocompleteItem
          startContent={<FaLocationDot />}
          key={place.placePrediction?.placeId}
          textValue={place.placePrediction?.mainText?.text}
        >
          {place.placePrediction?.mainText?.text}
        </AutocompleteItem>
      ))}
    </Autocomplete>
  );
};

export default DirectionSelect;
