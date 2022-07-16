import React from "react";
import { selectGrid } from "../../redux/features/simulation/simulationSlice";
import { useAppSelector } from "../../redux/hooks";

type Props = {};

function GridProperties({}: Props) {
  const grid = useAppSelector(selectGrid);

  return (
    <div className="flex w-full justify-center">
      {/* Size */}
      <form className="flex items-center">
        <label htmlFor="">Size:</label>
        <input
          type="text"
          name="rows"
          className="w-8 p-1 m-1"
          value={grid.length}
        />
        x
        <input
          type="text"
          name="columns"
          className="w-8 p-1 m-1"
          value={grid[0].length}
        />
        <input type="submit" value={"Update size"} />
      </form>
    </div>
  );
}

export default GridProperties;
