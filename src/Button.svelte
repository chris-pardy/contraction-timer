<script>
  import { current, dispatch } from './store';
  import { onMount } from 'svelte';

  const startColor = "#B9CBD9"
  const startText = "Begin";
  const stopColor = "#CFE3E2";
  const stopText = "End"; 
  let buttonText = startText;
  let buttonColor = startColor;
  
  function onClick() {
    switch (buttonText) {
      case startText:
        dispatch(true);
        break;
      case stopText:
      default:
        dispatch(false);
        break;
    }
  }

  onMount(() => current.subscribe(({type }) => {
    switch(type) {
      case 'duration':
        buttonText = stopText;
        buttonColor = stopColor;
        break;
      case 'interval':
      default:
        buttonText = startText;
        buttonColor = startColor;
        break;
    }
  }));


</script>

<style>
  button {
    display: block;
    width: 100%;
    height: 100%;
    font-size: 5rem;
    color: white;
    border: none;
    border-radius: 0%;
    outline: none;
  }
</style>

<button style="background-color: {buttonColor};" on:click={onClick}>
  {buttonText}
</button>
