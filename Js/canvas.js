

let isDrawing = false;
let startX = 0;
let startY = 0;
let snapshot;
let color='blue'

let CurrentcolorInput = document.querySelector('#colorinput');



let canvas = document.getElementById('drawingCanvas');
const context = canvas.getContext('2d');



CurrentcolorInput.addEventListener('change', (e) => {
  
    color = e.target.value;
    
  
});



// Canvas Drawing

function getPointerPosition(e, targetElement) {
  const rect = targetElement.getBoundingClientRect();
  let clientX, clientY;

  if (e.touches && e.touches.length > 0) {
    clientX = e.touches[0].clientX;
    clientY = e.touches[0].clientY;
  } else {
    clientX = e.clientX;
    clientY = e.clientY;
  }

  const scaleX = targetElement.width / rect.width;
  const scaleY = targetElement.height / rect.height;

  return {
    x: (clientX - rect.left) * scaleX,
    y: (clientY - rect.top) * scaleY
  };
}

// Replace old mouse events with unified pointer event handlers:

function startCanvasDraw(e) {
  if (activeMode !== 'canvas') return;
  e.preventDefault();
  const pos = getPointerPosition(e, canvas);
  startX = pos.x;
  startY = pos.y;
  isDrawing = true;
  snapshot = context.getImageData(0, 0, canvas.width, canvas.height);
}

function drawOnCanvas(e) {
  if (!isDrawing || activeMode !== 'canvas') return;
  e.preventDefault();
  const pos = getPointerPosition(e, canvas);
  const width = pos.x - startX;
  const height = pos.y - startY;

  context.putImageData(snapshot, 0, 0);
  context.strokeStyle = color;
  context.fillStyle = color ;
  context.lineWidth = 2;

  if (NewAttribute.includes('SquareShape')) {
    context.fillRect(startX, startY, width, height);
  } else if (NewAttribute.includes('Circle')) {
    const centerX = startX + width / 2;
    const centerY = startY + height / 2;
    const radiusX = Math.abs(width) / 2;
    const radiusY = Math.abs(height) / 2;
    context.beginPath();
    context.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, Math.PI * 2);
    context.fill();
    context.closePath();
  } else if (NewAttribute.includes('line')) {
    context.beginPath();
    context.moveTo(startX, startY);
    context.lineTo(pos.x, pos.y);
    context.stroke();
    context.closePath();
  }
}

function endCanvasDraw(e) {
  if (activeMode !== 'canvas') return;
  e.preventDefault();
  isDrawing = false;
}

// Add listeners for both mouse and touch
canvas.addEventListener('mousedown', startCanvasDraw);
canvas.addEventListener('mousemove', drawOnCanvas);
canvas.addEventListener('mouseup', endCanvasDraw);

canvas.addEventListener('touchstart', startCanvasDraw);
canvas.addEventListener('touchmove', drawOnCanvas);
canvas.addEventListener('touchend', endCanvasDraw);



canvas.addEventListener('mouseup', () => {
  if (activeMode !== 'canvas') return;
  isDrawing = false;
});