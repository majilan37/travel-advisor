"use client";

import useFetch from "@/hooks/useFetch";
import List from "./List";
import Map from "./Map";
import { useState, useEffect, useRef } from "react";
import { Bounds, Coords } from "google-map-react";
import { useStateValue } from "@/context/StateProvider";

interface PreviousValues {
  type: Type;
  bounds: Bounds | null;
  coords: Coords | {} | undefined;
}

function Content() {
  const [bounds, setBounds] = useState<Bounds | null>(null);

  // * Context
  const [coords, setCoords] = useStateValue();

  const [type, setType] = useState<Type>("restaurants");

  // * Store prev value of type
  const prevRef = useRef<PreviousValues>({
    type: "restaurants",
    bounds: null,
    coords: {},
  });

  useEffect(() => {
    prevRef.current.type = type;
    prevRef.current.bounds = bounds;
    prevRef.current.coords = coords;
  }, [type, bounds, coords]);

  const [child, setChild] = useState<number | null>(null);

  const params = new URLSearchParams({
    bl_latitude: bounds?.sw.lat?.toString() || "",
    tr_latitude: bounds?.ne.lat?.toString() || "",
    bl_longitude: bounds?.sw.lng?.toString() || "",
    tr_longitude: bounds?.ne.lng?.toString() || "",
  });

  // * Get the user's location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      setCoords({ lat: coords.latitude, lng: coords.longitude });
    });
  }, []);

  const { data, loading } = useFetch<ResponseData>(
    `${process.env.NEXT_PUBLIC_API_URL}/${type}/list-in-boundary?${params}`,
    {}
  );

  useEffect(() => {
    setChild(0);
  }, [loading]);

  return (
    <div className="grid lg:flex">
      <List
        data={data?.data}
        loading={loading}
        child={child}
        type={type}
        setType={setType}
      />
      <Map
        setChild={setChild}
        places={data?.data}
        coords={coords}
        setCoords={setCoords}
        setBounds={setBounds}
      />
    </div>
  );
}

export default Content;
