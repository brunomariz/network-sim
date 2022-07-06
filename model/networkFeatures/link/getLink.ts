import { Link } from "../../../@types/networkFeatures/link";

export const getLink = () => {
  return {
    bitErrorRate: 0.1,
    featureName: "Link",
    signals: [],
    // transmitting: false,
  } as Link;
};
