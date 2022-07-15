import { NetworkFeature } from "../../../@types/networkFeatures/networkFeature";
import { TwistedPair } from "../../../@types/networkFeatures/twistedPair";
import { Direction } from "../../../@types/utils/direction";
import { Position } from "../../../@types/utils/position";
import { Signal } from "../../../@types/utils/signal";
import { ITickFunctionParams } from "../../../@types/utils/tickFunctionInterface";
import { berPerElement } from "../../../constants/networkFeatures/twistedPair/twistedPairConstants";
import { signalStrength } from "../networkFeature/signalStrength";

export const tickTwistedPair = ({
  elements,
  position,
}: ITickFunctionParams): TwistedPair => {
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

    // Get new signals from neighbors
    const newSignals = validNeighborSignals(
      neighbor,
      Direction.bottom,
      Direction.up
    );
    newTwistedPair.signals.push(...newSignals);
  }

  // Update based on neighbor to the right
  if (elements.length > 0 && column < elements[0].length - 1) {
    neighbor = JSON.parse(
      JSON.stringify(elements[row][column + 1])
    ) as NetworkFeature;

    // Get new signals from neighbors
    const newSignals = validNeighborSignals(
      neighbor,
      Direction.left,
      Direction.right
    );
    newTwistedPair.signals.push(...newSignals);
  }

  // Update based on neighbor below
  if (row < elements.length - 1) {
    neighbor = JSON.parse(
      JSON.stringify(elements[row + 1][column])
    ) as NetworkFeature;

    // Get new signals from neighbors
    const newSignals = validNeighborSignals(
      neighbor,
      Direction.up,
      Direction.bottom
    );
    newTwistedPair.signals.push(...newSignals);
  }

  // Update based on neighbor to the left
  if (column > 0) {
    neighbor = JSON.parse(
      JSON.stringify(elements[row][column - 1])
    ) as NetworkFeature;

    // Get new signals from neighbors
    const newSignals = validNeighborSignals(
      neighbor,
      Direction.right,
      Direction.left
    );
    newTwistedPair.signals.push(...newSignals);
  }

  // Apply noise to signals based on bit error rate
  // newTwistedPair.signals = applyNoise(newTwistedPair.signals);

  return newTwistedPair;
};

const validNeighborSignals = (
  neighbor: NetworkFeature,
  directionFilter: Direction,
  newDirection: Direction
) => {
  const validSignals: Signal[] = [];
  if (signalStrength(neighbor) != 0) {
    neighbor.signals.forEach((signal) => {
      // Append signals that didnt come from the directionFilter direction
      if (signal.fromDirection != directionFilter) {
        // Set new direction for signal
        signal.fromDirection = newDirection;
        validSignals.push(signal);
      }
    });
  }
  return validSignals;
};

// const applyNoise = (signals: Signal[]) => {
//   return signals.map((signal) => {
//     const random = Math.floor(Math.random() / berPerElement);
//     if (random == 0) {
//       return { ...signal, corrupted: true, value: signal.value + 1 };
//     }
//     return signal;
//   });
// };
