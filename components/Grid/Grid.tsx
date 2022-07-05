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
  // const cursorElement = useAppSelector((state) => state.grid.cursorElement);
  // const network = useAppSelector((state) => state.grid.network);
  // const dispatch = useAppDispatch();

  // const elementFactory = () => {
  //   switch (cursorElement) {
  //     case networkFeatureCategories.Empty:
  //       return new Empty();
  //     case networkFeatureCategories.TwistedPair:
  //       return new TwistedPair(
  //         TransmissionStatus.notTransmitting,
  //         new Signal(0, false)
  //       );
  //     case networkFeatureCategories.Node:
  //       return new Node();

  //     default:
  //       return new Empty();
  //   }
  // };

  // const handleClickFactory = (position: Position) => () => {
  //   let newElements = [...network.elements];
  //   if (network.elements[position.x][position.y] instanceof Empty) {
  //     newElements[position.x][position.y] = elementFactory();
  //   } else {
  //     newElements[position.x][position.y] = new Empty();
  //   }

  //   dispatch(setElements(newElements));
  // };

  const grid = useAppSelector(selectGrid);
  console.log(grid);

  return (
    <div
      className={sytles.networkGrid + " " + sytles.unselectable}
      style={{
        gridTemplateColumns: `repeat(${grid[0].length}, auto) `,
        width: `${1.75 * grid[0].length}rem`,
      }}
      // onMouseUp={() => dispatch(copyNetwork())}
    >
      {grid.map((rowItem, row) => {
        return grid[row].map((item, column) => {
          return (
            <GridElement
              key={`${row}${column}`}
              networkFeature={item}
              position={{ row, column }}
              // handleClick={handleClickFactory({ x: row, y: column })}
            ></GridElement>
          );
        });
      })}
    </div>
  );
}

export default Grid;
