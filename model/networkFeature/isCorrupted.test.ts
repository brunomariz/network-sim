import { Direction } from "../../@types/utils/direction";
import { isCorrupted } from "./isCorrupted";

test("gets corrupted status for twisted pair, multiple signals, transmitting", () => {
  expect(
    isCorrupted({
      featureName: "TwistedPair",
      bitErrorRate: 10e-6,
      signals: [
        { corrupted: false, value: 2.5, fromDirection: Direction.up },
        { corrupted: false, value: 2.5, fromDirection: Direction.right },
        { corrupted: true, value: 1.2, fromDirection: Direction.bottom },
        { corrupted: false, value: 4, fromDirection: Direction.left },
      ],
      transmitting: true,
    })
  ).toBe(true);
});

test("gets corrupted status for twisted pair, one signal, corrupted, transmitting", () => {
  expect(
    isCorrupted({
      featureName: "TwistedPair",
      bitErrorRate: 10e-6,
      signals: [
        { corrupted: true, value: 1.2, fromDirection: Direction.bottom },
      ],
      transmitting: true,
    })
  ).toBe(true);
});

test("gets corrupted status for twisted pair, one signal, corrupted, not transmitting", () => {
  expect(
    isCorrupted({
      featureName: "TwistedPair",
      bitErrorRate: 10e-6,
      signals: [
        { corrupted: true, value: 1.2, fromDirection: Direction.bottom },
      ],
      transmitting: false,
    })
  ).toBe(true);
});

test("gets corrupted status for twisted pair, one signal, not corrupted, transmitting", () => {
  expect(
    isCorrupted({
      featureName: "TwistedPair",
      bitErrorRate: 10e-6,
      signals: [
        { corrupted: false, value: 1.2, fromDirection: Direction.bottom },
      ],
      transmitting: true,
    })
  ).toBe(false);
});

test("gets corrupted status for twisted pair, one signal, not corrupted, not transmitting", () => {
  expect(
    isCorrupted({
      featureName: "TwistedPair",
      bitErrorRate: 10e-6,
      signals: [
        { corrupted: false, value: 1.2, fromDirection: Direction.bottom },
      ],
      transmitting: false,
    })
  ).toBe(false);
});
