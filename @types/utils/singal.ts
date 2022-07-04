import { Direction } from "./direction";

export type Signal = {
  value: number;
  fromDirection: Direction;
  corrupted: boolean;
};
