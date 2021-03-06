import type { TaggedData } from "../../../utils";
import type { InfiniteWave } from "../infiniteWave";
import type { Pulse } from "../pulse";

export type WaveType = "infinite" | "pulse";
export type RawWave = InfiniteWave | Pulse;

export type Wave = TaggedData<WaveType, RawWave>;

export type WavePart = number;
export type WaveDistance = number;
export type WaveLength = number;
export type WaveSpeed = number;
