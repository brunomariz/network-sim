import { TwistedPair } from "../../@types/networkFeatures/twistedPair";

export const getTwistedPair = () => {
  return {
    featureName: "TwistedPair",
    bitErrorRate: 10e-6,
    signals: [],
    transmitting: false,
  } as TwistedPair;
};
