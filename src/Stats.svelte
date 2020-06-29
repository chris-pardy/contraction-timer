<script>
  import { averages } from './store';
  import { onMount } from 'svelte';

  let duration = '--';
  let interval = '--';

  function formatStats(stat) {
    if(stat.duration === null) {
      duration = '--';
    } else if (stat.duration > 60000) {
      const durationMinutes = Math.round(stat.duration / 60000);
      duration = `${durationMinutes} minute${durationMinutes > 1 ? 's' : ''}`;
    } else {
      const durationSeconds = Math.round(stat.duration / 1000);
      duration = `${durationSeconds} second${durationSeconds > 1 ? 's' : ''}`;
    }
    if(stat.interval === null) {
      interval = '--';
    } else if (stat.interval > 60000) {
      const intervalMinutes = Math.round(stat.interval / 60000);
      interval = `${intervalMinutes} minute${intervalMinutes > 1 ? 's' : ''}`;
    } else {
      const intervalSeconds = Math.round(stat.interval / 1000);
      interval = `${intervalSeconds} second${intervalSeconds > 1 ? 's' : ''}`;
    }
  }

  onMount(() => {
    return averages.subscribe(formatStats);
  });
</script>

<style>
  h1 {
    text-align: center;
    font-size: 1.3rem;
  }
  h2 {
    font-size: 1.2rem;
  }
  .multi-stat {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    text-align: center;
  }
  .timing {
    font-family: monospace;
    font-size: 1.3rem;
  }
</style>

<div class="stats">
  <h1>Last 2 Hours</h1>
  <div class="multi-stat">
    <div>
      <h2>Durations</h2>
      <div class="timing">{duration}</div>
    </div>
    <div>
      <h2>Intervals</h2>
      <div class="timing">{interval}</div>
    </div>
  </div> 
</div>