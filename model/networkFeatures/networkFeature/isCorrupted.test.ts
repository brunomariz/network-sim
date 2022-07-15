import { Direction } from "../../../@types/utils/direction";
import { isCorrupted } from "./isCorrupted";

describe("twisted pair isCorrupted", () => {
  test("gets corrupted status for twisted pair, multiple signals, transmitting", () => {
    expect(
      isCorrupted({
        featureName: "TwistedPair",
        signals: [
          { corrupted: false, value: 2.5, fromDirection: Direction.up },
          { corrupted: false, value: 2.5, fromDirection: Direction.right },
          { corrupted: true, value: 1.2, fromDirection: Direction.bottom },
          { corrupted: false, value: 4, fromDirection: Direction.left },
        ],
      })
    ).toBe(true);
  });

  test("gets corrupted status for twisted pair, one signal, corrupted, transmitting", () => {
    expect(
      isCorrupted({
        featureName: "TwistedPair",
        signals: [
          { corrupted: true, value: 1.2, fromDirection: Direction.bottom },
        ],
      })
    ).toBe(true);
  });

  test("gets corrupted status for twisted pair, one signal, corrupted, not transmitting", () => {
    expect(
      isCorrupted({
        featureName: "TwistedPair",
        signals: [
          { corrupted: true, value: 1.2, fromDirection: Direction.bottom },
        ],
      })
    ).toBe(true);
  });

  test("gets corrupted status for twisted pair, one signal, not corrupted, transmitting", () => {
    expect(
      isCorrupted({
        featureName: "TwistedPair",
        signals: [
          { corrupted: false, value: 1.2, fromDirection: Direction.bottom },
        ],
      })
    ).toBe(false);
  });

  test("gets corrupted status for twisted pair, one signal, not corrupted, not transmitting", () => {
    expect(
      isCorrupted({
        featureName: "TwistedPair",
        signals: [
          { corrupted: false, value: 1.2, fromDirection: Direction.bottom },
        ],
      })
    ).toBe(false);
  });
});
