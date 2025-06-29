<<<<<<< HEAD
import updatevalue from "./DrawingPen.js";
import sharedState from './sharedState.js';
import { customColorMode } from './DrawingPen.js';

// Shared handler variables
let mousedownhandler = null;
let mouseuphandler = null;
let FormTextContainer = document.querySelector('.FormTextContainer')

let FormTextContainerStatus = false
let FillShapeButton = document.querySelector('.FillShapeButton');
let FillshapeBtnBall = document.querySelector('.FillShapeButton .BtnBall');

let fillshapeStatus = false;

// Toggle fill shape button
FillShapeButton.addEventListener('click', () => {
    FillshapeBtnBall.classList.toggle('active');
    fillshapeStatus = FillshapeBtnBall.classList.contains('active');
});

function checker(selectedItemInSetting) {
    let currentmode = selectedItemInSetting;
    sharedState.currentTool = currentmode;

    let CurrentPageNumber = updatevalue();
    let currentCanvas = document.querySelectorAll('canvas')[CurrentPageNumber];
    let context = currentCanvas.getContext('2d');

    let sx = 0, sy = 0, e_x = 0, e_y = 0;

    function getpos(e, canvas) {
        const rect = canvas.getBoundingClientRect();

        let clientX, clientY;
        if (e.touches && e.touches.length > 0) {
            clientX = e.touches[0].clientX;
            clientY = e.touches[0].clientY;
        } else if (e.changedTouches && e.changedTouches.length > 0) {
            clientX = e.changedTouches[0].clientX;
            clientY = e.changedTouches[0].clientY;
        } else {
            clientX = e.clientX;
            clientY = e.clientY;
        }

        return {
            x: clientX - rect.left,
            y: clientY - rect.top
        };
    }

    // ✅ Remove previous handlers
    if (mousedownhandler) currentCanvas.removeEventListener('mousedown', mousedownhandler);
    if (mouseuphandler) currentCanvas.removeEventListener('mouseup', mouseuphandler);
    if (mousedownhandler) currentCanvas.removeEventListener('touchstart', mousedownhandler);
    if (mouseuphandler) currentCanvas.removeEventListener('touchend', mouseuphandler);

    // ✅ Define new handlers
    mousedownhandler = (e) => {
        const { x, y } = getpos(e, currentCanvas);
        sx = x;
        sy = y;
    };

    mouseuphandler = (e) => {
        const { x, y } = getpos(e, currentCanvas);
        e_x = x;
        e_y = y;

        context.beginPath();
        context.strokeStyle = customColorMode.color;

        if (currentmode === 'circle') {
            const centerX = (sx + e_x) / 2;
            const centerY = (sy + e_y) / 2;
            const dx = e_x - sx;
            const dy = e_y - sy;
            const radius = Math.sqrt(dx * dx + dy * dy) / 2;
            context.arc(centerX, centerY, radius, 0, 2 * Math.PI);
            if (fillshapeStatus) {
                context.fillStyle = customColorMode.color;
                context.fill();
            } else {
                context.stroke();
            }
        }

        else if (currentmode === 'line-shape') {
            context.moveTo(sx, sy);
            context.lineTo(e_x, e_y);
            context.stroke();
        }

        else if (currentmode === 'square-shape') {
            if (fillshapeStatus) {
                context.fillStyle = customColorMode.color;
                context.fillRect(sx, sy, e_x - sx, e_y - sy);
            } else {
                context.strokeRect(sx, sy, e_x - sx, e_y - sy);
            }
        }

        context.closePath();
    };

    // ✅ Attach new event handlers
    currentCanvas.addEventListener('mousedown', mousedownhandler);
    currentCanvas.addEventListener('mouseup', mouseuphandler);
    currentCanvas.addEventListener('touchstart', mousedownhandler);
    currentCanvas.addEventListener('touchend', mouseuphandler);
}

export default function getselectedItemInSetting(target) {
    const selectedItemInSetting = target.getAttribute('class'); 
       
    checker(selectedItemInSetting);
    if (selectedItemInSetting==='addtextBtn') {
        
        FormTextContainerStatus = !FormTextContainerStatus;
        FormTextContainer.style.display = FormTextContainerStatus ? 'flex' : 'none';



    }
}
=======
import updatevalue from "./DrawingPen.js";
import sharedState from './sharedState.js';
import { customColorMode } from './DrawingPen.js';

// Shared handler variables
let mousedownhandler = null;
let mouseuphandler = null;

let FillShapeButton = document.querySelector('.FillShapeButton');
let FillshapeBtnBall = document.querySelector('.FillShapeButton .BtnBall');

let fillshapeStatus = false;

// Toggle fill shape button
FillShapeButton.addEventListener('click', () => {
    FillshapeBtnBall.classList.toggle('active');
    fillshapeStatus = FillshapeBtnBall.classList.contains('active');
});

function checker(selectedItemInSetting) {
    let currentmode = selectedItemInSetting;
    sharedState.currentTool = currentmode;

    let CurrentPageNumber = updatevalue();
    let currentCanvas = document.querySelectorAll('canvas')[CurrentPageNumber];
    let context = currentCanvas.getContext('2d');

    let sx = 0, sy = 0, e_x = 0, e_y = 0;

    function getpos(e, canvas) {
        const rect = canvas.getBoundingClientRect();

        let clientX, clientY;
        if (e.touches && e.touches.length > 0) {
            clientX = e.touches[0].clientX;
            clientY = e.touches[0].clientY;
        } else if (e.changedTouches && e.changedTouches.length > 0) {
            clientX = e.changedTouches[0].clientX;
            clientY = e.changedTouches[0].clientY;
        } else {
            clientX = e.clientX;
            clientY = e.clientY;
        }

        return {
            x: clientX - rect.left,
            y: clientY - rect.top
        };
    }

    // ✅ Remove previous handlers
    if (mousedownhandler) currentCanvas.removeEventListener('mousedown', mousedownhandler);
    if (mouseuphandler) currentCanvas.removeEventListener('mouseup', mouseuphandler);
    if (mousedownhandler) currentCanvas.removeEventListener('touchstart', mousedownhandler);
    if (mouseuphandler) currentCanvas.removeEventListener('touchend', mouseuphandler);

    // ✅ Define new handlers
    mousedownhandler = (e) => {
        const { x, y } = getpos(e, currentCanvas);
        sx = x;
        sy = y;
    };

    mouseuphandler = (e) => {
        const { x, y } = getpos(e, currentCanvas);
        e_x = x;
        e_y = y;

        context.beginPath();
        context.strokeStyle = customColorMode.color;

        if (currentmode === 'circle') {
            const centerX = (sx + e_x) / 2;
            const centerY = (sy + e_y) / 2;
            const dx = e_x - sx;
            const dy = e_y - sy;
            const radius = Math.sqrt(dx * dx + dy * dy) / 2;
            context.arc(centerX, centerY, radius, 0, 2 * Math.PI);
            if (fillshapeStatus) {
                context.fillStyle = customColorMode.color;
                context.fill();
            } else {
                context.stroke();
            }
        }

        else if (currentmode === 'line-shape') {
            context.moveTo(sx, sy);
            context.lineTo(e_x, e_y);
            context.stroke();
        }

        else if (currentmode === 'square-shape') {
            if (fillshapeStatus) {
                context.fillStyle = customColorMode.color;
                context.fillRect(sx, sy, e_x - sx, e_y - sy);
            } else {
                context.strokeRect(sx, sy, e_x - sx, e_y - sy);
            }
        }

        context.closePath();
    };

    // ✅ Attach new event handlers
    currentCanvas.addEventListener('mousedown', mousedownhandler);
    currentCanvas.addEventListener('mouseup', mouseuphandler);
    currentCanvas.addEventListener('touchstart', mousedownhandler);
    currentCanvas.addEventListener('touchend', mouseuphandler);
}

export default function getselectedItemInSetting(target) {
    const selectedItemInSetting = target.getAttribute('class');
    checker(selectedItemInSetting);
}
>>>>>>> 09451d08de3519fe18a3e9b0fc4a624fc16b5657
