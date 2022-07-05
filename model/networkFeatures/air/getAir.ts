import { Air } from "../../../@types/networkFeatures/air";

export const getAir = () => {
  return { featureName: "Air", signals: [], transmitting: false } as Air;
};
