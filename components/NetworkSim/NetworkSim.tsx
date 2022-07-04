import React from "react";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import {
  selectRunning,
  start,
  stop,
} from "../../redux/features/simulation/simulationSlice";
import Navbar from "../Navbar/Navbar";
import Grid from "../Grid/Grid";

type Props = {};

function NetworkSim({}: Props) {
  const dispatch = useAppDispatch();
  const running = useAppSelector(selectRunning);
  return (
    <>
      <Navbar></Navbar>
      <div className="overflow-scoll pt-20 px-2 h-full min-h-screen flex justify-center items-center min-w-max bg-gray-100">
        <Grid></Grid>
      </div>
    </>
  );
}

export default NetworkSim;
