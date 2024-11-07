import React from "react";
import Grid from "../Grid/Grid";

function ColumnsSkeleton() {
  return (
    <Grid className="grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
      <Column />
      <Column />
      <Column />
      <Column />
      <Column />
    </Grid>
  );
  function Column() {
    return (
      <div className="flex flex-col gap-5">
        <div className=" skeleton h-10 w-full"></div>
        <div className=" skeleton h-36 w-full"></div>
        <div className=" skeleton h-36 w-full"></div>
        <div className=" skeleton h-36 w-full"></div>
        <div className=" skeleton h-36 w-full"></div>
        <div className=" skeleton h-36 w-full"></div>
      </div>
    );
  }
}

export default ColumnsSkeleton;
