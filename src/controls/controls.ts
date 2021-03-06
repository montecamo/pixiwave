import type { ShapeType } from "../models";
import * as dat from "dat.gui";

export type Options = {
  amplitude: number;
  frequency: number;
  size: number;
  speed: number;
  infinite: boolean;
  rainbow: boolean;
  wavetype: ShapeType;
  clear: () => void;
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
    wavetype: "circle" as "circle",
    clear: () => {},
  };

  const gui = new dat.GUI();
  const basic = gui.addFolder("Basic");
  basic.add(data, "amplitude", 0, 40).name("Amplitude");
  basic.add(data, "frequency", 0.001, 1, 0.001).name("Frequency");
  basic.add(data, "size", 1, 100, 1).name("Size");
  basic.add(data, "speed", 0, 0.2, 0.001).name("Speed");
  basic.add(data, "rainbow").name("Ranbow ✨");

  basic.open();

  const spawner = gui.addFolder("Wave spawner");
  spawner.add(data, "wavetype", ["circle", "rectangle"]).name("Wave type️");
  spawner.add(data, "infinite").name("Infinite ♾️");
  spawner.add(data, "clear").name("Clear waves 🔥");
  spawner.open();

  return {
    // @ts-ignore
    get: (key) => data[key],
    on: (buttonId, cb) => {
      data[buttonId] = cb;
    },
  };
}
