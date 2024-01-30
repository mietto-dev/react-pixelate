import React from "react";
import { Filter } from "../filters/filters";

export type ImageFilterProps = {
  src: string;
  filters: Filter;
};

export const ImageFilter = ({ src, filters }: ImageFilterProps) => {
  return (
    <>
      <svg style={{ display: "none" }}>
        <filter id="svg-filter">{filters.renderSVG()}</filter>
      </svg>
      <div style={{ width: "400px", height: "500px" }}>
        <img
          style={{ filter: "url(#svg-filter)", ...filters.renderCSS() }}
          src={src}
        />
      </div>
    </>
  );
};
