import * as dat from "dat.gui";

export type ControlData = {
  amplitude: number;
  frequency: number;
  size: number;
};

export function installControls(data): dat.GUI {
  const gui = new dat.GUI();
  gui.add(data, "amplitude", 0, 40);
  gui.add(data, "frequency", 0.001, 1, 0.001);
  gui.add(data, "size", 1, 100, 1);
  gui.add(data, "speed", 0, 0.2, 0.001);
  gui.add(data, "infinite");
  gui.add(data, "rainbow");
  gui.add(data, "wave type", ["circle", "rectangle"]);
  gui.add(data, "clear waves");

  return gui;
}
