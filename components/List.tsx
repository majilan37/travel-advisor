"use client";
import { useState, createRef, useEffect, RefObject } from "react";
import { Select, Option } from "../material-tailwind";
import BookingCard from "./Card";
import { Spinner } from "../material-tailwind";

function List({
  data,
  child,
  loading,
  type,
  setType,
}: {
  data?: ResponseData["data"];
  child?: number | null;
  loading: boolean;
  type: Type;
  setType: React.Dispatch<React.SetStateAction<Type>>;
}) {
  const [rating, setRating] = useState<string>("");

  const [elRefs, setElRefs] = useState<RefObject<HTMLDivElement>[]>([]);

  const [_data, set_data] = useState<ResponseData["data"] | undefined>(data);

  const filteredData = () => {
    let _data = [...(data ?? [])];

    if (rating !== "") {
      _data = _data.filter((e) => Number(e?.rating) >= Number(rating));
      console.log({ _data });
    }

    // @ts-ignore
    set_data(_data);
  };

  useEffect(() => {
    if (data) {
      set_data(data);
    }
  }, [data]);

  useEffect(() => {
    filteredData();
  }, [rating, loading]);

  const length = data?.length;
  useEffect(() => {
    const refs = new Array(data?.length)
      .fill(0)
      .map((_, i) => elRefs[i] || createRef());

    setElRefs(refs);
  }, [child, length]);

  return (
    <div className="p-5 max-w-md flex flex-col h-96 lg:h-[calc(100vh-77.6px)] order-2 lg:order-1 ">
      <h2 className="text-2xl font-medium">
        Restaurants, Hotels & Attractions <br /> around you
      </h2>
      <div className="flex flex-col lg:flex-row gap-3 mt-2">
        <Select
          value={type}
          onChange={(e) => setType(e as Type)}
          size="md"
          variant="standard"
          label="Type">
          <Option value="restaurants">Restaurants</Option>
          <Option value="hotels">Hotels</Option>
          <Option value="attractions">Attractions</Option>
        </Select>

        <Select
          value={rating}
          onChange={(e) => setRating(e as string)}
          size="md"
          variant="standard"
          label="Rating">
          <Option value="0">All</Option>
          <Option value="3">Above 3.0</Option>
          <Option value="4">Above 4.0</Option>
          <Option value="4.5">Above 4.5</Option>
        </Select>
      </div>
      <br />
      <div
        className={`overflow-y-auto border space-y-2 px-2 shadow-md ${
          (loading || Number(_data?.length) === 0) &&
          "!shadow-none !border-0 min-h-[100px] "
        } `}>
        {(loading ? Array.from(new Array(1)) : _data)?.map(
          (place: ResponseData["data"][0] | undefined, index) =>
            place ? (
              <BookingCard
                ref={elRefs[index]}
                selected={Number(child) === index}
                key={index}
                place={place}
              />
            ) : (
              <div key={index} className="flex justify-center">
                <Spinner className="h-10 w-10" />
              </div>
            )
        )}
        {Number(_data?.length) === 0 && !loading && (
          <div>
            <p>No results found</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default List;
