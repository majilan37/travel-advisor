import { Typography, IconButton, Navbar } from "../material-tailwind";
import { BellIcon, Cog6ToothIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import Autocomplete from "./Autocomplete";

function Header() {
  return (
    <Navbar className="mx-auto max-w-screen-xl px-4 py-3">
      <div className="flex flex-wrap items-center justify-between gap-y-4 text-blue-gray-900">
        <Typography
          as="a"
          href="#"
          variant="h6"
          className="mr-4 ml-2 cursor-pointer py-1.5">
          Travel Advisor
        </Typography>
        <div className="ml-auto flex gap-1 md:mr-4">
          <IconButton variant="text" color="blue-gray">
            <Cog6ToothIcon className="h-4 w-4" />
          </IconButton>
          <IconButton variant="text" color="blue-gray">
            <BellIcon className="h-4 w-4" />
          </IconButton>
        </div>
        <Autocomplete />
      </div>
    </Navbar>
  );
}

export default Header;
