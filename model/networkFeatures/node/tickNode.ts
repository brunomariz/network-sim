import { Node } from "../../../@types/networkFeatures/node";
import { ITickFunctionParams } from "../../../@types/utils/tickFunctionInterface";
import { getSignal } from "../../utils/signal/getSignal";

export const tickNode = ({ elements, position }: ITickFunctionParams) => {
  const { row, column } = position;
  const node = JSON.parse(JSON.stringify(elements[row][column])) as Node;
  if (node.transmitting) {
    if (node.signals.length > 0) {
      node.signals = [];
    } else {
      node.signals = [getSignal()];
    }
  }
  return node;
};
