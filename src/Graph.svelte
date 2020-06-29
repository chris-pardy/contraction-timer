<script>
  import { window } from "./store";
  import { onMount } from "svelte";

  // 15 minutes
  const span = 900000;
  const data = window(span);

  let canvas;

  function drawLine(ctx, windowed) {
    ctx.fillStyle = "#D7E2E8";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    const end = Date.now();
    const zero = end - span;
    const low = canvas.height - 10;
    ctx.beginPath();
    const minuteSpacing = canvas.width / 15;
    for (let x = minuteSpacing; x < canvas.width; x += minuteSpacing) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
    }
    ctx.lineWidth = 2;
    ctx.strokeStyle = "white";
    ctx.setLineDash([10, 8]);
    ctx.stroke();
    ctx.save();
    ctx.scale(canvas.width / span, 1);
    ctx.beginPath();
    ctx.moveTo(0, low);
    let lastX = 0;
    windowed
      .map(({ startTime, duration }) => {
        duration = duration == null ? (end - startTime) + 1000 : duration;
        const oneSixthDuration = Math.min(duration / 6, 1000);
        const startX = startTime - zero;
        const cp1X = startX + oneSixthDuration;
        const halfX = startX + (duration / 2);
        const endX = startX + duration;
        const cp2X = endX - oneSixthDuration;
        return {
          startX,
          cp1X,
          halfX,
          cp2X,
          endX
        }
      })
      .forEach(({ startX, cp1X, halfX, cp2X, endX }) => {
        ctx.lineTo(startX, low);
        ctx.bezierCurveTo(cp1X, low, cp1X, 10, halfX, 10);
        ctx.bezierCurveTo(cp2X, 10, cp2X, low, endX, low);
        lastX = endX;
      });
    if (lastX < span) {
      ctx.lineTo(span, low);
    }
    ctx.restore();
    ctx.setLineDash([]);
    ctx.lineWidth = 6;
    ctx.strokeStyle = "#818d96";
    ctx.stroke();
  }

  onMount(() => {
    const ctx = canvas.getContext("2d");
    let frame;
    const unsub = data.subscribe(windowed => {
      if (frame) {
        cancelAnimationFrame(frame);
      }
      const draw = () => {
        drawLine(ctx, windowed);
        frame = requestAnimationFrame(draw);
      };
      draw();
    });
    drawLine(ctx, []);
    return () => {
      if (frame) {
        cancelAnimationFrame(frame);
      }
      unsub();
    };
  });
</script>

<style>
  canvas {
    width: 100%;
    height: 30%;
  }
</style>

<canvas bind:this={canvas} width="1200" height="400" />
