import {
  getTagsTable,
  attachTag,
  getTaggedType,
  getTaggedData,
} from "../../utils";

import type { WaveFunction } from "./function";

import { initTagsTable } from "./tagsTable";

import type {
  WaveType,
  RawWave,
  Wave,
  WavePartGetter,
  WaveDistance,
  WaveSpeed,
} from "./types";

const utilsTable = initTagsTable();

function operate<T>(wave: Wave, util: string, ...args: any[]): T {
  const func = getTagsTable(utilsTable, getTaggedType(wave), util);

  if (!func) {
    throw new Error("Unexpected data type or function type");
  }

  return func(getTaggedData(wave), ...args);
}
function makeWaveSuccessor(wave: Wave, rawWave: RawWave): Wave {
  return attachTag(getTaggedType(wave), rawWave);
}

export function increaseWave(wave: Wave): Wave {
  return makeWaveSuccessor(wave, operate<RawWave>(wave, "increase"));
}

export function getWavePart(wave: Wave): WavePartGetter {
  return operate<WavePartGetter>(wave, "makePartGetter");
}

export function getWaveDistance(wave: Wave): WaveDistance {
  return operate<WaveDistance>(wave, "getDistance");
}

export function makeBasicWave(
  type: WaveType,
  waveFunction: WaveFunction
): Wave {
  const func = getTagsTable(utilsTable, type, "makeBasic");

  if (!func) {
    throw new Error("Unexpected data type or function type");
  }

  return attachTag(type, func(waveFunction));
}

export function updateWaveFunction(wave: Wave, func: WaveFunction): Wave {
  return makeWaveSuccessor(
    wave,
    operate<RawWave>(wave, "updateFunction", func)
  );
}

export function updateWaveSpeed(wave: Wave, speed: WaveSpeed): Wave {
  return makeWaveSuccessor(wave, operate<RawWave>(wave, "updateSpeed", speed));
}
