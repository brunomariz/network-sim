import { Direction } from "../../@types/utils/direction";
import { getSignal } from "./getSignal";

test("gets signal for twisted pair", () => {
  expect(
    getSignal({
      featureName: "TwistedPair",
      bitErrorRate: 10e-6,
      signals: [
        { corrupted: false, value: 2.5, fromDirection: Direction.up },
        { corrupted: false, value: 2.5, fromDirection: Direction.right },
        { corrupted: true, value: 1.2, fromDirection: Direction.bottom },
        { corrupted: true, value: 4, fromDirection: Direction.left },
      ],
      transmitting: true,
    })
  ).toBe(10.2);
});
