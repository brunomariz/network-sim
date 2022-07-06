import { NetworkFeature } from "../../../@types/networkFeatures/networkFeature";
import { TwistedPair } from "../../../@types/networkFeatures/twistedPair";
import { Direction } from "../../../@types/utils/direction";
import { Position } from "../../../@types/utils/position";
import { Signal } from "../../../@types/utils/singal";

export const tickTwistedPair = (
  elements: NetworkFeature[][],
  position: Position
): TwistedPair => {
  const { row, column } = position;
  const newTwistedPair = {
    ...elements[row][column],
    signals: [],
  } as TwistedPair;
  let neighbor: NetworkFeature;

  // Update based on neighbor above
  if (row > 0) {
    neighbor = JSON.parse(
      JSON.stringify(elements[row - 1][column])
    ) as NetworkFeature;

    neighbor.signals.forEach((signal) => {
      // Append signals that didnt come from below
      if (signal.fromDirection != Direction.bottom) {
        signal.fromDirection = Direction.up;
        newTwistedPair.signals.push(signal);
      }
    });
  }

  // Update based on neighbor to the right
  if (elements.length > 0 && column < elements[0].length - 1) {
    neighbor = JSON.parse(
      JSON.stringify(elements[row][column + 1])
    ) as NetworkFeature;

    neighbor.signals.forEach((signal) => {
      // Append signals that didnt come from the left
      if (signal.fromDirection != Direction.left) {
        signal.fromDirection = Direction.right;
        newTwistedPair.signals.push(signal);
      }
    });
  }

  // Update based on neighbor below
  if (row < elements.length - 1) {
    neighbor = JSON.parse(
      JSON.stringify(elements[row + 1][column])
    ) as NetworkFeature;

    neighbor.signals.forEach((signal) => {
      // Append signals that didnt come from above
      if (signal.fromDirection != Direction.up) {
        signal.fromDirection = Direction.bottom;
        newTwistedPair.signals.push(signal);
      }
    });
  }

  // Update based on neighbor to the left
  if (column > 0) {
    neighbor = JSON.parse(
      JSON.stringify(elements[row][column - 1])
    ) as NetworkFeature;

    neighbor.signals.forEach((signal) => {
      // Append signals that didnt come from the right
      if (signal.fromDirection != Direction.right) {
        signal.fromDirection = Direction.left;
        newTwistedPair.signals.push(signal);
      }
    });
  }

  return newTwistedPair;
};
