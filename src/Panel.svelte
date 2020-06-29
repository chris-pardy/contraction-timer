<script>
  import Graph from './Graph.svelte';
  import Stats from './Stats.svelte';
  import Timer from "./Timer.svelte";
  import Button from "./Button.svelte";
</script>

<style>
  .panel {
    background-color: #EAE7E2;
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 100vw;
  }
  @media (orientation: landscape) {
    .panel {
      flex-direction: row;
    }
    .button-panel {
      max-width: 300px;
    }
  }
  @media (orientation: portrait) {
    .button-panel {
      max-height: 300px;
    }
  }
  .stat-panel {
    flex-basis: 50%;
    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: 30% auto 30%;
    flex-grow: 1;
    margin-bottom: 10px;
    color: #818d96
  }
  .button-panel {
    flex-basis: 50%;
  }
</style>

<div class="panel">
  <div class="stat-panel">
    <Graph />
    <Stats />
    <Timer />
  </div>
  <div class="button-panel">
    <Button />
  </div>
</div>
