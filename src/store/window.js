import { derived } from 'svelte/store';
import { ticks } from './ticks';

export function window(timespan) {
  return derived(
    ticks,
    $ticks => {
      // startTime for the window
      const startTime = Date.now() - timespan;
      const contractions = [];
      let lastEnd;
      for (let i = $ticks.length - 1; i >= 0; i--) {
        const { type, time } = $ticks[i];
        if (type === 'end') {
          lastEnd = time;
        } else if (type === 'begin') {
          contractions.unshift({
            startTime: time,
            duration: lastEnd ? lastEnd - time : null
          });
          if (time < startTime) {
            break;
          }
        }
      }
      return contractions;
    }
  )
}