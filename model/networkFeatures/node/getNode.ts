import { Node } from "../../../@types/networkFeatures/node";

export const getNode = (params?: Partial<Node>) => {
  const defaultValues = {
    featureName: "Node",
    signals: [],
    transmitting: true,
  } as Node;
  return { ...defaultValues, ...params };
};
