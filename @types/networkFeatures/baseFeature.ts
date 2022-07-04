import { Signal } from "../utils/singal";

export type BaseFeature = {
  featureName: "Node" | "Air" | "Link" | "TwistedPair";
  transmitting: boolean;
  signals: Signal[];
};
