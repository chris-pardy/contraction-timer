import { derived } from 'svelte/store';
import { window } from './window';

const lastTwoHours = window(7200000);

export const averages = derived(
  lastTwoHours,
  $lastTwoHours => {
    const durations = [];
    const intervals = [];
    let lastStartTime;
    $lastTwoHours.forEach(({ startTime, duration }) => {
      if (duration) {
        durations.push(duration);
      }
      if (lastStartTime) {
        intervals.push(startTime - lastStartTime);
      }
      lastStartTime = startTime;
    });
    return {
      duration: durations.length > 0 ? durations.reduce((l, r) => l + r, 0) / durations.length : null,
      interval: intervals.length > 0 ? intervals.reduce((l, r) => l + r, 0) / intervals.length : null
    }
  }
);