import * as dat from "dat.gui";

export type ControlData = {
  amplitude: number;
  frequency: number;
  size: number;
};

export function installControls(data): ControlData {
  const gui = new dat.GUI();
  gui.add(data, "amplitude", -10, 10);
  gui.add(data, "frequency", 0, 0.5);
  gui.add(data, "size", 10, 100);

  return data;
}
