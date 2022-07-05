import { NetworkFeature } from "../../@types/networkFeatures/networkFeature";

export const getSignal = (networkFeature: NetworkFeature) => {
  return networkFeature.signals.reduce((prev, curr) => {
    return prev + curr.value;
  }, 0);
};
