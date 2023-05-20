"use client";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { IconButton, Input } from "../material-tailwind";
import {
  AutocompleteProps,
  Autocomplete as GoogleAutocomplete,
  useJsApiLoader,
} from "@react-google-maps/api";
import { useState } from "react";
import { useStateValue } from "@/context/StateProvider";

function Autocomplete() {
  const [autocomplete, setAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null);

  // * Context
  const [coords, setCoords] = useStateValue();

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY || "",
  });

  const onLoad = (e: google.maps.places.Autocomplete) => setAutocomplete(e);
  const onPlaceChanged = () => {
    const lat = autocomplete?.getPlace().geometry?.location?.lat();
    const lng = autocomplete?.getPlace().geometry?.location?.lng();

    setCoords({ lat, lng });
  };
  return isLoaded ? (
    <GoogleAutocomplete
      className="mx-auto"
      onLoad={onLoad}
      onPlaceChanged={onPlaceChanged}>
      <div className="relative flex w-full gap-2 md:w-max">
        <Input
          type="text"
          label="Search a place..."
          className="pr-20"
          containerProps={{
            className: "min-w-[288px] ",
          }}
        />
        <IconButton size="sm" className="!absolute right-1 !rounded-full top-1">
          <MagnifyingGlassIcon className="h-4" />
        </IconButton>
      </div>
    </GoogleAutocomplete>
  ) : (
    <div className="relative flex w-full gap-2 md:w-max">
      <Input
        type="text"
        label="Search a place..."
        className="pr-20"
        containerProps={{
          className: "min-w-[288px] ",
        }}
      />
      <IconButton size="sm" className="!absolute right-1 !rounded-full top-1">
        <MagnifyingGlassIcon className="h-4" />
      </IconButton>
    </div>
  );
}

export default Autocomplete;
