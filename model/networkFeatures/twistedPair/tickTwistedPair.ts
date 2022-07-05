import { NetworkFeature } from "../../../@types/networkFeatures/networkFeature";
import { TwistedPair } from "../../../@types/networkFeatures/twistedPair";
import { Direction } from "../../../@types/utils/direction";
import { Position } from "../../../@types/utils/position";

export const tickTwistedPair = (
  elements: NetworkFeature[][],
  position: Position
): TwistedPair => {
  const { row, column } = position;

  const newTwistedPair = { ...elements[row][column] } as TwistedPair;

  let neighbor: NetworkFeature;
  // Update based on neighbor above
  if (row > 0) {
    neighbor = elements[row - 1][column];
    // Append signals that didnt come from below
    newTwistedPair.signals = [
      ...newTwistedPair.signals,
      ...neighbor.signals.filter(
        (item) => item.fromDirection != Direction.bottom
      ),
    ];
  }

  // Update based on neighbor to the right
  if (elements.length > 0 && column < elements[0].length - 1) {
    neighbor = elements[row][column + 1];
    // Append signals that didnt come from the left
    newTwistedPair.signals = [
      ...newTwistedPair.signals,
      ...neighbor.signals.filter(
        (item) => item.fromDirection != Direction.left
      ),
    ];
  }

  // Update based on neighbor below
  if (row < elements.length - 1) {
    neighbor = elements[row + 1][column];
    // Append signals that didnt come from above
    newTwistedPair.signals = [
      ...newTwistedPair.signals,
      ...neighbor.signals.filter((item) => item.fromDirection != Direction.up),
    ];
  }

  // Update based on neighbor to the left
  if (row < elements.length - 1) {
    neighbor = elements[row + 1][column];
    // Append signals that didnt come from the right
    newTwistedPair.signals = [
      ...newTwistedPair.signals,
      ...neighbor.signals.filter(
        (item) => item.fromDirection != Direction.right
      ),
    ];
  }

  return newTwistedPair;
};
