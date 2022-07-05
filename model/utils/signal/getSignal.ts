import { Direction } from "../../../@types/utils/direction";
import { Signal } from "../../../@types/utils/singal";

export const getSignal = () => {
  return {
    corrupted: false,
    fromDirection: Direction.none,
    value: 2.5,
  } as Signal;
};
