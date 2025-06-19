// === GLOBAL SETUP ===
const svg = document.querySelector('svg'); // Your <svg> element
const currentColorInput = document.querySelector('#colorinput'); // Your color picker
const eraserButton = document.querySelector('.Eraser'); // Eraser button

 isDrawing = false;
 currentPath = null;
 lastDrawTime = 0;
let activeTool = 'pen'; // 'pen' or 'eraser'

// === POSITION TRACKING FUNCTION ===
function getSVGPos(e) {
    const rect = svg.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return {
        x: clientX - rect.left,
        y: clientY - rect.top
    };
}

// === START DRAWING ===
function startDraw(e) {
    if (activeTool !== 'pen') return;
    e.preventDefault();
    isDrawing = true;
    const pos = getSVGPos(e);

    currentPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    currentPath.setAttribute("class", "ink-path");
    currentPath.setAttribute("d", `M ${pos.x} ${pos.y}`);

    const color = currentColorInput.value;
    currentPath.setAttribute("stroke", color);
    currentPath.setAttribute("stroke-width", "2.5");
    currentPath.setAttribute("fill", "none");
    currentPath.setAttribute("stroke-linecap", "round");
    currentPath.style.filter = `drop-shadow(0 0 5px ${color}) drop-shadow(0 0 10px ${color})`;

    svg.appendChild(currentPath);
    lastDrawTime = Date.now();
}

// === CONTINUE DRAWING ===
function draw(e) {
    if (!isDrawing || activeTool !== 'pen') return;

    const now = Date.now();
    if (now - lastDrawTime < 10) return; // smoothing
    lastDrawTime = now;

    const pos = getSVGPos(e);
    const d = currentPath.getAttribute("d");
    currentPath.setAttribute("d", `${d} L ${pos.x} ${pos.y}`);
}

// === END DRAWING ===
function endDraw() {
    isDrawing = false;
}

// === ERASER MODE TOGGLE ===
eraserButton.addEventListener('click', () => {
    activeTool = (activeTool === 'eraser') ? 'pen' : 'eraser';
    svg.classList.toggle('eraser-cursor', activeTool === 'eraser');
    eraserButton.classList.toggle('active', activeTool === 'eraser');
});

// === ERASER FUNCTIONALITY ===
// On mousedown: remove the clicked path if eraser is active
svg.addEventListener('mousedown', (e) => {
    if (activeTool === 'eraser') {
        let clicked = e.target;
        // Traverse up to find ink-path if clicking a child element
        while (clicked && !clicked.classList.contains('ink-path')) {
            clicked = clicked.parentNode;
        }
        if (clicked && clicked.classList.contains('ink-path')) {
            clicked.remove();
        }
        return;
    }
    startDraw(e);
});

// Drawing continues while mouse moves
svg.addEventListener('mousemove', draw);

// Stop drawing on mouseup or leaving svg
svg.addEventListener('mouseup', endDraw);
svg.addEventListener('mouseleave', endDraw);

// === TOUCH EVENTS ===
svg.addEventListener('touchstart', (e) => {
    if (activeTool === 'eraser') {
        const touch = e.touches[0];
        const touchedEl = document.elementFromPoint(touch.clientX, touch.clientY);
        if (touchedEl && touchedEl.classList.contains('ink-path')) {
            touchedEl.remove();
        }
        return;
    }
    startDraw(e);
});
svg.addEventListener('touchmove', draw);
svg.addEventListener('touchend', endDraw);
svg.addEventListener('touchcancel', endDraw);

// === COLOR CHANGE EVENT ===
currentColorInput.addEventListener('change', (e) => {
    if (currentPath) {
        const color = e.target.value;
        currentPath.setAttribute("stroke", color);
        currentPath.style.filter = `drop-shadow(0 0 5px ${color}) drop-shadow(0 0 10px ${color})`;
    }
});
