import { waitor } from "@/lib/utils";
import React from "react";

const Waitor = async (ms: number) => {
  await waitor(ms, "Waitor");
  return <div>Waitor</div>;
};

export default Waitor;
