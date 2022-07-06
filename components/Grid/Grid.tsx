// import { networkFeatureCategories } from "../../@types/networkFeatureCategories";
// import { TransmissionStatus } from "../../@types/transmissionStatus";
// import Empty from "../../classes/Empty";
// import Node from "../../classes/Node";
// import { Signal } from "../../classes/Signal";
// import TwistedPair from "../../classes/TwistedPair";
// import { copyNetwork, setElements } from "../../redux/features/grid/gridSlice";
import { selectGrid } from "../../redux/features/simulation/simulationSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import GridElement from "../GridElement/GridElement";
import sytles from "./grid.module.css";
import React from "react";
import ReactDOM from "react-dom";

type Props = {};

function Grid({}: Props) {
  const grid = useAppSelector(selectGrid);

  return (
    <div
      className={sytles.networkGrid + " " + sytles.unselectable}
      style={{
        gridTemplateColumns: `repeat(${grid[0].length}, auto) `,
        width: `${1.75 * grid[0].length}rem`,
      }}
    >
      {grid.map((rowItem, row) => {
        return grid[row].map((item, column) => {
          return (
            <GridElement
              key={`${row}${column}`}
              networkFeature={item}
              position={{ row, column }}
            ></GridElement>
          );
        });
      })}
    </div>
  );
}

export default Grid;
