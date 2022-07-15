import { TwistedPair } from "../../../@types/networkFeatures/twistedPair";
import { Direction } from "../../../@types/utils/direction";
import { Signal } from "../../../@types/utils/signal";
import { getSignal } from "../../utils/signal/getSignal";
import { getAir } from "../air/getAir";
import { tickTwistedPair } from "./tickTwistedPair";

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
      bitErrorRate: 0,
    } as TwistedPair,
    { featureName: "TwistedPair", signals: [], bitErrorRate: 0 } as TwistedPair,
    { featureName: "TwistedPair", signals: [], bitErrorRate: 0 } as TwistedPair,
  ],
  [getAir(), getAir(), getAir()],
];

test("gets new twisted pair after tick", () => {
  expect(
    tickTwistedPair({ elements: grid, position: { column: 1, row: 1 } })
  ).toEqual({
    featureName: "TwistedPair",
    signals: [
      { value: 2.5, corrupted: false, fromDirection: Direction.left } as Signal,
    ],
    bitErrorRate: 0,
  });
});
