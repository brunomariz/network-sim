import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import {
  selectRunning,
  start,
  stop,
  tick,
} from "../../redux/features/simulation/simulationSlice";
import Navbar from "../Navbar/Navbar";
import Grid from "../Grid/Grid";
import GridProperties from "../GridProperties/GridProperties";

type Props = {};

function NetworkSim({}: Props) {
  const dispatch = useAppDispatch();
  const running = useAppSelector(selectRunning);

  const newIntervalId = setInterval(() => {
    if (running) {
      // setElements(network.tick().elements);
      dispatch(tick());
    }
  }, 25);

  // Clear intervals
  for (let i = 1; i < Number(newIntervalId); i++) {
    clearInterval(i);
  }

  return (
    <>
      <Navbar></Navbar>
      <div className="bg-gray-100 pt-20 h-full min-h-screen">
        <GridProperties></GridProperties>
        <div className="overflow-scoll px-2  flex justify-center items-center min-w-max">
          <Grid></Grid>
        </div>
      </div>
    </>
  );
}

export default NetworkSim;
