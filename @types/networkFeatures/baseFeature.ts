import { Signal } from "../utils/singal";

export type BaseFeature = {
  readonly featureName: "Node" | "Air" | "Link" | "TwistedPair";
  // transmitting: boolean;
  signals: Signal[];
};
