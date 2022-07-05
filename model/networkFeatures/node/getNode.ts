import { Node } from "../../../@types/networkFeatures/node";

export const getNode = () => {
  return { featureName: "Node", signals: [], transmitting: false } as Node;
};
