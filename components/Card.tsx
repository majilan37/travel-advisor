import { forwardRef, useEffect } from "react";
import { Chip } from "../material-tailwind";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Tooltip,
  Typography,
  Button,
  IconButton,
} from "../material-tailwind";
import { StarIcon, MapPinIcon, PhoneIcon } from "@heroicons/react/24/solid";
import { MutableRefObject } from "react";

type Props = { place?: ResponseData["data"][0]; selected: boolean };

const BookingCard = forwardRef<HTMLDivElement, Props>(
  ({ place, selected }, ref) => {
    useEffect(() => {
      if (!!selected) {
        (ref as MutableRefObject<HTMLDivElement>)?.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, [selected]);
    return (
      <Card ref={ref} className="w-full max-w-[26rem] shadow-lg">
        <CardHeader floated={false} color="blue-gray">
          <img
            src={
              place?.photo?.images?.large?.url ??
              "https://www.smaroadsafety.com/wp-content/uploads/2022/06/no-pic.png"
            }
            loading="lazy"
            className="object-cover h-72 w-full object-center"
            alt="ui/ux review check"
          />
        </CardHeader>
        <CardBody>
          <div className="mb-3 flex items-center justify-between">
            <Typography variant="h5" color="blue-gray" className="font-medium ">
              {place?.name}
            </Typography>
            <Typography
              color="blue-gray"
              className="flex items-center whitespace-nowrap gap-1.5 font-normal">
              <StarIcon className="-mt-0.5 h-5 w-5 text-yellow-700" />
              {place?.rating ?? "--"} {`(${place?.num_reviews ?? "0"})`}
            </Typography>
          </div>
          <Typography className="text-justify line-clamp-6" color="gray">
            {place?.description ?? <i>No description</i>}
          </Typography>
          <br />
          {/* Price */}
          <Typography className="flex justify-between">
            <span className="font-medium">Price level :</span>
            <span>{`${place?.price_level || "--"}`}</span>
          </Typography>

          {/* Ranking */}
          <Typography
            title={place?.ranking || "--"}
            className="flex gap-2 justify-between">
            <span className="font-medium whitespace-nowrap">Ranking :</span>
            <span className="line-clamp-1">{`${place?.ranking || "--"}`}</span>
          </Typography>

          {/* Awards */}
          <div className="py-2 space-y-2">
            <div className="">
              {place?.awards?.length === 0 && (
                <i className="text-sm">No awards to display</i>
              )}
              {place?.awards?.map((award) => (
                <div key={award.display_name} className="">
                  <img src={award?.images?.small} alt={award.display_name} />
                  <Typography variant="small">{award.display_name}</Typography>
                </div>
              ))}
            </div>
            <div className="">
              {place?.cuisine?.map(({ name }) => (
                <Chip
                  key={name}
                  className="inline-block mr-1"
                  size="sm"
                  color="gray"
                  value={name}
                />
              ))}
            </div>
          </div>

          {/* Address */}
          <div className="flex justify-between mt-2 gap-2">
            {/* <span className="font-medium">Address :</span> */}
            <div className="h-5 min-h-[20px]">
              <MapPinIcon className="h-5" />
            </div>

            <Typography
              title={
                place?.address ||
                place?.address_obj?.street1 ||
                place?.address_obj?.street2
              }
              className="line-clamp-1">{`${
              place?.address ||
              place?.address_obj?.street1 ||
              place?.address_obj?.street2 ||
              "--"
            }`}</Typography>
          </div>

          {/* Phone */}
          <div className="flex justify-between gap-2">
            {/* <span className="font-medium">Address :</span> */}
            <PhoneIcon className="h-5" />

            <Typography className=" ">{`${place?.phone ?? "--"}`}</Typography>
          </div>
        </CardBody>
        <CardFooter className="pt-3 space-y-2">
          <Button
            size="lg"
            onClick={() => window.open(place?.web_url, "_blank")}
            fullWidth={true}>
            Tripa advisor
          </Button>

          <Button
            size="lg"
            variant="outlined"
            onClick={() => window.open(place?.website, "_blank")}
            fullWidth={true}>
            Website
          </Button>
        </CardFooter>
      </Card>
    );
  }
);

BookingCard.displayName = "BookingCard";

export default BookingCard;
