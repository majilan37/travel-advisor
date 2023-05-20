"use client";

import { Coords } from "google-map-react";
import { createContext, useState, useContext } from "react";

type State = ReturnType<typeof useState<Coords | {}>>[0];
type SetState = ReturnType<typeof useState<Coords | {}>>[1];

const coords = {} as State;
const setCoords: SetState = () => {};

const StateContext = createContext<[State, SetState]>([coords, setCoords]);

export default function StateProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StateContext.Provider value={useState<Coords | {}>()}>
      {children}
    </StateContext.Provider>
  );
}

export const useStateValue = () => useContext(StateContext);
