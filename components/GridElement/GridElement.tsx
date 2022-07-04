import React, { useEffect, useState } from "react";
import { Air } from "../../@types/networkFeatures/air";
import { NetworkFeature } from "../../@types/networkFeatures/networkFeature";
import { Position } from "../../@types/utils/position";
// import { TransmissionStatus } from "../../@types/transmissionStatus";
// import Link from "../../classes/Link";
// import NetworkFeature from "../../classes/NetworkFeature";
// import Node from "../../classes/Node";
// import TwistedPair from "../../classes/TwistedPair";
import CtxMenu from "../CtxMenu/CtxMenu";
import styles from "./gridElement.module.css";

type Props = {
  networkFeature: NetworkFeature;
  position: Position;
};

function GridElement({ networkFeature, position }: Props) {
  const [clicked, setClicked] = useState(false);
  const [ctxAnchorPoint, setCtxAnchorPoint] = useState({ x: 0, y: 0 });
  const [showCtxMenu, setShowCtxMenu] = useState(false);
  const [clickable, setClickable] = useState(true);

  const handleContextMenu = () => {
    setShowCtxMenu(!showCtxMenu);
    setClickable(false);
  };

  const getClasses = (networkFeature: NetworkFeature) => {
    const { featureName } = networkFeature;
    const classes =
      (featureName == "Node" && styles.nodeElement) +
      " " +
      (featureName == "Link" && styles.linkElement) +
      " " +
      (featureName == "TwistedPair" && styles.tpElement) +
      " " +
      (networkFeature.transmitting &&
        featureName == "TwistedPair" &&
        styles.transmittingLink) +
      " " +
      // (networkFeature.transmissionStatus ==
      //   TransmissionStatus.justTransmitted &&
      //   networkFeature instanceof Link &&
      //   styles.justTransmittedLink) +
      " " +
      (networkFeature.signals[0].corrupted && styles.corruptedLink);
    return classes;
  };

  return (
    <div
      onContextMenu={(e) => {
        e.preventDefault();
        setCtxAnchorPoint({ x: e.pageX, y: e.pageY });
        handleContextMenu();
      }}
      onMouseEnter={(e) => {
        if (clickable) {
          if (e.buttons == 1 || e.buttons == 3) {
            e.stopPropagation();

            // handleClick();
            setClicked(!clicked);
          }
        }
      }}
      onMouseLeave={(e) => {
        setShowCtxMenu(false);
        setClickable(true);
      }}
      onMouseDown={(e) => {
        if (clickable) {
          if (e.buttons == 1 || e.buttons == 3) {
            // handleClick();
            setClicked(!clicked);
            setShowCtxMenu(false);
          }
        }
      }}
      className={styles.baseContainerElement}
    >
      <>
        <div
          className={
            styles.baseInnerElement +
            ` ${clicked && styles.animate} ${getClasses(networkFeature)}`
          }
        ></div>
        {showCtxMenu && (
          <CtxMenu
            ctxAnchorPoint={ctxAnchorPoint}
            networkFeature={networkFeature}
            setShowCtxMenu={setShowCtxMenu}
          ></CtxMenu>
        )}
      </>
    </div>
  );
}

export default GridElement;
