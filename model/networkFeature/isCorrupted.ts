import { NetworkFeature } from "../../@types/networkFeatures/networkFeature";

export const isCorrupted = (networkFeature: NetworkFeature) => {
  return networkFeature.signals.reduce((acc, curr) => {
    if (curr.corrupted) {
      return true;
    }
    return acc;
  }, false);
};
