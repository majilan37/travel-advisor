"use client";
import { MapPinIcon } from "@heroicons/react/24/solid";
import GoogleMap from "google-map-react";
import { Typography, Rating } from "../material-tailwind";
import Image from "next/image";
import mapStyles from "../mapStyles";

function Map({
  places,
  coords,
  setBounds,
  setCoords,
  setChild,
}: {
  places?: ResponseData["data"];
  coords: GoogleMap.Coords | {} | undefined;
  setCoords: React.Dispatch<React.SetStateAction<GoogleMap.Coords>>;
  setBounds: React.Dispatch<React.SetStateAction<GoogleMap.Bounds | null>>;
  setChild: React.Dispatch<React.SetStateAction<any>>;
}) {
  return (
    <div
      style={{
        height: "calc(100vh - 65.6px)",
      }}
      className=" w-full flex-1 ">
      <GoogleMap
        bootstrapURLKeys={{
          key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY || "",
        }}
        center={coords as GoogleMap.Coords}
        defaultZoom={14}
        margin={[50, 50, 50, 50]}
        options={{ styles: mapStyles }}
        onChange={(e) => {
          setCoords({ lat: e.center.lat, lng: e.center.lng });
          //   @ts-ignore
          setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
        }}
        // onChildClick={(child) => setChild(child)}
      >
        {places?.map((place, index) => (
          <div
            key={index}
            onClick={() => setChild(index)}
            className="absolute transform translate-x-[-50%] translate-y-[-50%] z-[10] hover:z-[20] "
            // @ts-ignore
            lat={Number(place.latitude)}
            lng={Number(place.longitude)}>
            <MapPinIcon className="h-5 sm:hidden" />
            <div className="bg-white p-2 border shadow-md">
              <Typography variant="small">{place.name}</Typography>
              <Image
                unoptimized
                height={128}
                width={128}
                src={
                  place?.photo?.images?.large?.url ??
                  "https://www.smaroadsafety.com/wp-content/uploads/2022/06/no-pic.png"
                }
                className="object-cover w-32 h-32 object-center"
                alt="ui/ux review check"
              />
              {place.rating}
              <Rating value={parseInt(place?.rating ?? 4)} readonly />
            </div>
          </div>
        ))}
      </GoogleMap>
    </div>
  );
}

export default Map;
