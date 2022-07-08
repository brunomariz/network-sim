import React from "react";
import { Link } from "../../@types/networkFeatures/link";
import { NetworkFeature } from "../../@types/networkFeatures/networkFeature";
import { Node } from "../../@types/networkFeatures/node";
import { Coordinates } from "../../@types/utils/coordinates";
import { Position } from "../../@types/utils/position";
import { Signal } from "../../@types/utils/singal";
import { isCorrupted } from "../../model/networkFeatures/networkFeature/isCorrupted";
import { signalStrength } from "../../model/networkFeatures/networkFeature/signalStrength";
import { getSignal } from "../../model/utils/signal/getSignal";
import {
  elementChanged,
  // elementNotTransmitting,
  // elementTransmitting,
} from "../../redux/features/simulation/simulationSlice";
import { useAppDispatch } from "../../redux/hooks";
// import { TransmissionStatus } from "../../@types/transmissionStatus";
// import NetworkFeature from "../../classes/NetworkFeature";
// import TwistedPair from "../../classes/TwistedPair";

type Props = {
  ctxAnchorPoint: Coordinates;
  networkFeature: NetworkFeature;
  setShowCtxMenu: Function;
  position: Position;
};

function CtxMenu({
  ctxAnchorPoint,
  networkFeature,
  setShowCtxMenu,
  position,
}: Props) {
  const dispatch = useAppDispatch();

  const handleSetTransmissionClick = () => {
    const transmissor = { transmitting: false };
    if (networkFeature.signals.length > 0) {
      if ("transmitting" in networkFeature) {
        dispatch(
          elementChanged({
            networkFeature: {
              ...networkFeature,
              transmitting: false,
              signals: [],
            },
            position,
          })
        );
      } else {
        dispatch(
          elementChanged({
            networkFeature: { ...networkFeature, signals: [] },
            position,
          })
        );
      }
    } else {
      if ("transmitting" in networkFeature) {
        dispatch(
          elementChanged({
            networkFeature: {
              ...networkFeature,
              transmitting: true,
              signals: [getSignal()],
            },
            position,
          })
        );
      } else {
        dispatch(
          elementChanged({
            networkFeature: {
              ...networkFeature,
              signals: [getSignal()],
            },
            position,
          })
        );
      }
    }
    setShowCtxMenu(false);
  };
  return (
    <div
      style={{ top: ctxAnchorPoint.y - 2, left: ctxAnchorPoint.x - 2 }}
      className="absolute bg-white shadow-md p-2 z-10"
    >
      <h1 className="mb-2 font-semibold border-b-2 border-b-black">
        {networkFeature.featureName}
      </h1>
      <div className="font-mono">
        Signal: {signalStrength(networkFeature)} V
        {isCorrupted(networkFeature) && (
          <div className="text-red-500">corrupted</div>
        )}
      </div>
      {"transmitting" in networkFeature && (
        <div className="font-mono">
          Transmitting: {networkFeature.transmitting.toString()}
        </div>
      )}
      {networkFeature.featureName == "TwistedPair" && (
        <div className="font-mono">
          <ul>
            <li>
              BER (per element):{" "}
              {(networkFeature as Link).bitErrorRate.toExponential()}
            </li>
            <li>BER (per 100 m): {(10e-2).toExponential()}</li>
          </ul>
        </div>
      )}

      <button
        className="text-sm bg-slate-300 p-1 underline-offset-2 border-2 border-gray-900 border-opacity-0 hover:border-opacity-75"
        onClick={() => handleSetTransmissionClick()}
      >
        Set Transmission {networkFeature.signals.length > 0 ? "Off" : "On"}
      </button>
    </div>
  );
}

export default CtxMenu;
