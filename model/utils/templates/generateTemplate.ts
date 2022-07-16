import { NetworkFeature } from "../../../@types/networkFeatures/networkFeature";
import { getNode } from "../../networkFeatures/node/getNode";
import { getTwistedPair } from "../../networkFeatures/twistedPair/getTwistedPair";

export const generateTemplate = (
  elements: NetworkFeature[][],
  template: "icon" | "stripes"
): NetworkFeature[][] => {
  switch (template) {
    case "icon":
      return generateIcon(elements);
    case "stripes":
      return generateStripes(elements);

    default:
      return elements;
  }
};

export const generateIcon = (elements: NetworkFeature[][]) => {
  const copyElements = [
    ...elements.map((item) => {
      return [...item];
    }),
  ];
  if (copyElements.length > 6 && copyElements[0].length > 12) {
    copyElements[1][6] = getNode();
    copyElements[5][3] = getNode({ transmitting: false });
    copyElements[5][9] = getNode({ transmitting: false });
    for (let i = 1; i < 12; i++) {
      copyElements[3][i] = getTwistedPair();
    }
    copyElements[4][3] = getTwistedPair();
    copyElements[2][6] = getTwistedPair();
    copyElements[4][9] = getTwistedPair();
  } else if (copyElements.length > 6 && copyElements[0].length > 12) {
  }
  return copyElements;
};

export const generateStripes = (elements: NetworkFeature[][]) => {
  const copyElements = [
    ...elements.map((item) => {
      return [...item];
    }),
  ];
  for (let index = 0; index < copyElements.length; index += 2) {
    copyElements[index][0] = getNode();
    for (let j = 1; j < copyElements[0].length; j++) {
      copyElements[index][j] = getTwistedPair();
    }
  }

  console.log(copyElements);

  return copyElements;
};
