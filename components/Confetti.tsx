"use client";

import Fireworks from "react-canvas-confetti/dist/presets/fireworks";
const Confetti = ({ speed }: { speed: number }) => {
  return <Fireworks autorun={{ speed }} />;
};

export default Confetti;
