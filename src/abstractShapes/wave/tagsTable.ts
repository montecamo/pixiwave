import { makeTagsTable, putTagsTable } from "../../utils";
import type { TagsTable } from "../../utils";

import * as pulseUtils from "./pulse";
import * as infiniteWaveUtils from "./infiniteWave";

export function initTagsTable(): TagsTable {
  const table = makeTagsTable();

  // PULSE
  putTagsTable(table, "pulse", "increase", pulseUtils.increasePulse);
  putTagsTable(table, "pulse", "getDistance", pulseUtils.getPulseDistance);
  putTagsTable(table, "pulse", "makeBasic", pulseUtils.makeBasicPulse);
  putTagsTable(table, "pulse", "makePartGetter", pulseUtils.getPulsePart);

  // INFINITE WAVE
  putTagsTable(
    table,
    "infinite",
    "increase",
    infiniteWaveUtils.increaseInfiniteWave
  );
  putTagsTable(table, "infinite", "getDistance", () => Infinity);
  putTagsTable(
    table,
    "infinite",
    "makeBasic",
    infiniteWaveUtils.makeBasicInfiniteWave
  );
  putTagsTable(
    table,
    "infinite",
    "makePartGetter",
    infiniteWaveUtils.getInfiniteWavePart
  );

  return table;
}
