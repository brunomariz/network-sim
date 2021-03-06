import React from "react";
import {
  BsCircle,
  BsCircleFill,
  BsSquareFill,
  BsPlusCircle,
} from "react-icons/bs";
import { CgTrashEmpty } from "react-icons/cg";
import { FiPause, FiPlay } from "react-icons/fi";
import { getAir } from "../../model/networkFeatures/air/getAir";
import { getNode } from "../../model/networkFeatures/node/getNode";
import { getTwistedPair } from "../../model/networkFeatures/twistedPair/getTwistedPair";
import { selectedFeatureChanged } from "../../redux/features/cursor/cursorSlice";
// import { networkFeatureCategories } from "../../@types/networkFeatureCategories";
// import {
//   clearElements,
//   resetNetwork,
//   setCursorElement,
//   tick,
// } from "../../redux/features/grid/gridSlice";
import {
  clearElements,
  resetElements,
  selectRunning,
  rowsChanged,
  start,
  stop,
  tick,
  selectGrid,
} from "../../redux/features/simulation/simulationSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import DropdownMenu from "../DropdownMenu/DropdownMenu";
import NavButton from "../NavButton/NavButton";

type Props = {};

function Navbar({}: Props) {
  // const resetNetwork = (running: boolean, template: NetworkTemplate) => {
  //   dispatch(stop());
  //   // setNetwork(
  //   //   new Network(networkSize[0], networkSize[1], undefined, template)
  //   // );
  //   dispatch();
  //   if (running) dispatch(start());
  // };
  const running = useAppSelector(selectRunning);
  const dispatch = useAppDispatch();

  return (
    <div className="fixed top-0 left-0 bg-gray-50 w-screen border-b-2 shadow-sm z-10 flex items-center sm:overflow-visible overflow-scroll ">
      <div className="inline text-2xl p-5 font-semibold">Network Simulator</div>
      <DropdownMenu
        run={running}
        buttons={[
          {
            title: "Icon",
            onClick: () => {
              dispatch(resetElements("icon"));
            },
          },
          {
            title: "Stripes",
            onClick: () => {
              dispatch(resetElements("stripes"));
            },
          },
        ]}
        title="Network Templates"
      ></DropdownMenu>

      {/* Start button */}
      <NavButton
        onClick={() => {
          dispatch(start());
        }}
        disabled={running}
        text="Start"
        icon={<FiPlay></FiPlay>}
        fill
      ></NavButton>

      {/* Stop button */}
      <NavButton
        onClick={() => {
          dispatch(stop());
        }}
        disabled={!running}
        text="Stop"
        icon={<FiPause></FiPause>}
      ></NavButton>

      {/* Tick button */}
      <NavButton
        text="Tick"
        onClick={() => {
          dispatch(tick());
        }}
        disabled={running}
        icon={<></>}
        outline
      ></NavButton>

      {/* Clear Button */}
      <NavButton
        onClick={() => {
          dispatch(stop());
          dispatch(clearElements());
        }}
        disabled={false}
        text="Clear"
        icon={<CgTrashEmpty></CgTrashEmpty>}
      ></NavButton>

      {/* Air button */}
      <NavButton
        disabled={false}
        icon={<BsCircle></BsCircle>}
        onClick={() => dispatch(selectedFeatureChanged(getAir()))}
        text="Air"
      ></NavButton>

      {/* TP button */}
      <NavButton
        text="Twisted Pair"
        onClick={() => dispatch(selectedFeatureChanged(getTwistedPair()))}
        disabled={false}
        icon={<BsCircleFill></BsCircleFill>}
      ></NavButton>

      {/* Node button */}
      <NavButton
        disabled={false}
        icon={<BsSquareFill></BsSquareFill>}
        onClick={() => dispatch(selectedFeatureChanged(getNode()))}
        text="Node"
      ></NavButton>
    </div>
  );
}

export default Navbar;
