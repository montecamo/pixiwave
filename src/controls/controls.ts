import type { ShapeType } from "../models";
import * as dat from "dat.gui";

export type Options = {
  amplitude: number;
  frequency: number;
  size: number;
  speed: number;
  infinite: boolean;
  rainbow: boolean;
  ["wave type"]: ShapeType;
  ["clear waves"]: () => void;
};

export type ControlsInterface = {
  get: <T extends Options[keyof Options]>(key: keyof Options) => T;
  on: (buttonId: string, cb: () => void) => void;
};

export function installControls(): ControlsInterface {
  const data = {
    amplitude: 12,
    frequency: 0.4,
    size: 31,
    speed: 0.04,
    infinite: true,
    rainbow: false,
    ["wave type"]: "circle" as "circle",
    ["clear waves"]: () => {},
  };

  const gui = new dat.GUI();
  gui.add(data, "amplitude", 0, 40);
  gui.add(data, "frequency", 0.001, 1, 0.001);
  gui.add(data, "size", 1, 100, 1);
  gui.add(data, "speed", 0, 0.2, 0.001);
  gui.add(data, "infinite");
  gui.add(data, "rainbow");
  gui.add(data, "wave type", ["circle", "rectangle"]);
  gui.add(data, "clear waves");

  return {
    // @ts-ignore
    get: (key) => data[key],
    on: (buttonId, cb) => {
      data[buttonId] = cb;
    },
  };
}
