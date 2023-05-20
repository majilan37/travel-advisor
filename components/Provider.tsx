"use client";

import StateProvider from "@/context/StateProvider";
import { ThemeProvider } from "@material-tailwind/react";

type Props = {
  children: React.ReactNode;
};

function Provider({ children }: Props) {
  return (
    <ThemeProvider>
      <StateProvider>{children}</StateProvider>
    </ThemeProvider>
  );
}

export default Provider;
