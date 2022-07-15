import { TwistedPair } from "../../../@types/networkFeatures/twistedPair";
import { Direction } from "../../../@types/utils/direction";
import { Signal } from "../../../@types/utils/signal";
import {
  berPerMaxLength,
  maxLenghtElements,
} from "../../../constants/networkFeatures/twistedPair/twistedPairConstants";
import { getSignal } from "../../utils/signal/getSignal";
import { getAir } from "../air/getAir";
import { tickTwistedPair } from "./tickTwistedPair";

describe("twisted pair tick function", () => {
  test("gets new twisted pair after tick", () => {
    const grid = [
      [getAir(), getAir(), getAir()],
      [
        {
          featureName: "TwistedPair",
          signals: [
            {
              value: 2.5,
              corrupted: false,
              fromDirection: Direction.left,
            } as Signal,
          ],
        } as TwistedPair,
        { featureName: "TwistedPair", signals: [] } as TwistedPair,
        { featureName: "TwistedPair", signals: [] } as TwistedPair,
      ],
      [getAir(), getAir(), getAir()],
    ];
    expect(
      tickTwistedPair({ elements: grid, position: { column: 1, row: 1 } })
    ).toEqual({
      featureName: "TwistedPair",
      signals: [
        {
          value: 2.5,
          corrupted: false,
          fromDirection: Direction.left,
        } as Signal,
      ],
    });
  });

  // test("bit error rate corrupts signals at expected rate", () => {
  //   const grid = [
  //     [
  //       {
  //         featureName: "TwistedPair",
  //         signals: [
  //           {
  //             value: 2.5,
  //             corrupted: false,
  //             fromDirection: Direction.left,
  //           } as Signal,
  //         ],
  //       } as TwistedPair,
  //       {
  //         featureName: "TwistedPair",
  //         signals: [],
  //       } as TwistedPair,
  //     ],
  //   ];
  //   // Number of trips to be simulated (number of times the signal would travel a wire of length maxLenthElements)
  //   const numTrips = 10 ** 5;
  //   let newTwistedPair: TwistedPair;
  //   let corruptedCount = 0;
  //   for (let i = 0; i < maxLenghtElements * numTrips; i++) {
  //     newTwistedPair = tickTwistedPair({
  //       elements: grid,
  //       position: { column: 1, row: 0 },
  //     });
  //     if (newTwistedPair.signals[0].corrupted) {
  //       corruptedCount += 1;
  //     }
  //   }
  //   console.log("count", corruptedCount);
  //   console.log("num trips", numTrips);
  //   console.log("ber", berPerMaxLength);
  //   console.log("count/trips", corruptedCount / numTrips);

  //   expect(corruptedCount / numTrips - berPerMaxLength).toBeCloseTo(0, 4);
  // });
});
