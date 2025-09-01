export function drawChart(data) {
  const canvas = document.getElementById("chartNilai");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  const labels = ["A", "B", "C", "D", "E"];
  const values = labels.map(l => data[l] || 0);
  const maxValue = Math.max(...values, 1);

  const width = canvas.width;
  const height = canvas.height;
  const padding = 40;
  const barWidth = (width - padding * 2) / labels.length - 20;

  ctx.clearRect(0, 0, width, height);

  // axes
  ctx.beginPath();
  ctx.moveTo(padding, padding);
  ctx.lineTo(padding, height - padding);
  ctx.lineTo(width - padding, height - padding);
  ctx.strokeStyle = "#333";
  ctx.lineWidth = 2;
  ctx.stroke();

  // bars
  values.forEach((v, i) => {
    const barHeight = ((height - 2 * padding) * v / maxValue);
    const x = padding + i * (barWidth + 20) + 10;
    const y = height - padding - barHeight;

    ctx.fillStyle = "#3498db";
    ctx.fillRect(x, y, barWidth, barHeight);

    ctx.fillStyle = "#000";
    ctx.font = "14px Roboto";
    ctx.textAlign = "center";
    ctx.fillText(v, x + barWidth / 2, y - 5);
    ctx.fillText(labels[i], x + barWidth / 2, height - padding + 15);
  });
}
