
import { makeStack, pushStack } from './limitedStack';

export const makeSea = (length) => makeStack(length)(0);

export const makeWave = (amplitude) => (time) => () => amplitude(time());

export const shakeSea = (sea) => (wave) => pushStack(sea)(wave());
