import { derived } from 'svelte/store';
import { ticks } from './ticks';

export const current = derived(
  ticks,
  $ticks => {
    // find the last begin tick
    for(let i = $ticks.length - 1; i >= 0; i--) {
      if($ticks[i].type === 'begin') {
        return {
          type: i === $ticks.length -1 ? 'duration' : 'interval',
          startTime: $ticks[i].time
        };
      }
    }
    return { type: null, startTime: null };
  }
)
