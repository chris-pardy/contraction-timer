import { ticks } from './ticks';

export function dispatch(start = true) {
  ticks.update(t => [...t, { type: start ? 'begin' : 'end', time: Date.now() }]);
}