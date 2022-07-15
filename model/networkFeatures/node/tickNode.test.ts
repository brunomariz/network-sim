import { Node } from "../../../@types/networkFeatures/node";
import { Direction } from "../../../@types/utils/direction";
import { Signal } from "../../../@types/utils/signal";
import { getAir } from "../air/getAir";
import { getNode } from "./getNode";
import { tickNode } from "./tickNode";

const grid = [
  [getAir(), getAir(), getAir()],
  [
    getAir(),
    { featureName: "Node", signals: [], transmitting: true } as Node,
    getAir(),
  ],
  [getAir(), getAir(), getAir()],
];

test("gets new node after tick", () => {
  expect(tickNode({ elements: grid, position: { column: 1, row: 1 } })).toEqual(
    {
      featureName: "Node",
      signals: [
        {
          value: 2.5,
          corrupted: false,
          fromDirection: Direction.none,
        } as Signal,
      ],
      transmitting: true,
    }
  );
});
