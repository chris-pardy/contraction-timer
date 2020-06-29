<script>
  import { current } from './store';
  import { onMount } from 'svelte';
  let startTime;
  let text = '';
  let currentFormattedTime = "00:00:00.0";

  function format() {
    const elapsedTime = Date.now() - startTime;
    let seconds = ((elapsedTime / 1000) % 60).toFixed(1);
    if (seconds.length < 4) {
      seconds = '0' + seconds;
    }
    let minutes = (Math.floor(elapsedTime / 60000) %
      60
    ).toFixed(0);
    if (minutes.length < 2) {
      minutes = '0' + minutes;
    }
    let hours = Math.floor(elapsedTime / 3600000).toFixed(0);
    if (hours.length < 2) {
      hours = '0' + hours;
    }
    currentFormattedTime = `${hours}:${minutes}:${seconds}`;
  }

  onMount(() => {
    let frame;
    function loop() {
      frame = requestAnimationFrame(loop);
      format();
    }
    const unsubscribe = current.subscribe(c => {
      if (c.type !== null) {
        startTime = c.startTime;
        text = c.type === 'duration' ? 'Duration' : 'Interval';
        if (!frame) {
          loop();
        }
      }
    });
    
    return () => {
      unsubscribe();
      if (frame) {
        cancelAnimationFrame(frame);
      }
    } 
  });
</script>

<style>
  .timer {
    display: flex;
    flex-direction: column;
    align-content: center;
    align-items: center;
    justify-content: center;
  }
  h4 {
    display: block;
  }
  .counter {
    font-size: 3rem;
    text-align: center;
    font-family: monospace;
  }
</style>

<div class="timer">
  <h3>Current {text}</h3>
  <div class="counter">{currentFormattedTime}</div>
</div>

