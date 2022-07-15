import { Signal } from "../utils/signal";

export type BaseFeature = {
  readonly featureName: "Node" | "Air" | "Link" | "TwistedPair";
  // transmitting: boolean;
  signals: Signal[];
};
