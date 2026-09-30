import React from "react";
import { ResponsiveImage } from "./ResponsiveImage";

const Banner = () => {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 border border-red-500">
      <ResponsiveImage
        src="/banner.png"
        alt="Hero image"
        priority
        fit="cover"
        className="h-full md:h-full"
      />
    </div>
  );
};

export default Banner;
