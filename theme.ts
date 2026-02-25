"use client";

import { createTheme, MantineColorsTuple } from "@mantine/core";

const grape: MantineColorsTuple = [
  "#ffe8ff",
  "#ffceff",
  "#ff9bff",
  "#ff64ff",
  "#fe37fe",
  "#fe1cfe",
  "#ff00ff", //
  "#e400e4",
  "#cb00cb",
  "#b100b2"
];
const cyan: MantineColorsTuple = [
  "#dffdff",
  "#caf5ff",
  "#99e8ff",
  "#64dbff",
  "#3cd0fe",
  "#24c9fe",
  "#00c4ff", //
  "#00afe4",
  "#009bcd",
  "#0087b5"
]

export const theme = createTheme({
  colors: {
    grape,
    cyan,
  },
});
