import { NetworkFeature } from "../networkFeatures/networkFeature";
import { TwistedPair } from "../networkFeatures/twistedPair";
import { Position } from "./position";

export interface ITickFunctionParams {
  elements: NetworkFeature[][];
  position: Position;
}

export interface ITickFunction {
  (tickFunctionParams: ITickFunctionParams): NetworkFeature;
}
