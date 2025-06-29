<<<<<<< HEAD
import sharedState from './sharedState.js';

let CurrentPageNumber = 0;
let currentCanvas = null;
let context = null;
let isDrawing = false;
let pencolor = 'yellow'; // Change to any color
let neonPenStatus = false; // true = glow, false = normal
let currentmode  = sharedState.currentTool
let mouseerasewidth = 5;

let customColor  = document.querySelector('#customColor')

export let  customColorMode = {
    color:'red'
}

// Create the eraser cursor
let erasermouse = document.createElement('div');
erasermouse.setAttribute('class', 'eraserMouse');

document.body.appendChild(erasermouse);


let eraserSizeCustomElement =document.querySelector('#eraserSizeCustom')
let PenSizeCustomElement = document.querySelector('#PenSizeCustom')
let eraserSizeCustom = 5;
let PenSizeCustom = 0

 function getcurrentmode(){
    
    console.log(sharedState.currentTool);

    
}

let BtnBallNeon = document.querySelector('.BtnBallNeon')
let penNeonButton  = document.querySelector('.penNeonButton')


customColor.addEventListener('change',(e)=>{

    pencolor = customColorMode.color = e.target.value;

})

eraserSizeCustomElement.addEventListener('change',(e)=>{
    eraserSizeCustom = e.target.value;
    mouseerasewidth = eraserSizeCustom;
    erasermouse.style.width = mouseerasewidth + 'px';
    erasermouse.style.height = mouseerasewidth + 'px';
})


PenSizeCustomElement.addEventListener('change',(e)=>{
    PenSizeCustom = e.target.value
})



export function checkpenmode(){ 



if (BtnBallNeon.classList.contains('active')) {
    neonPenStatus =true;
    
}
else{
    neonPenStatus=false;
}

}

let erasermode = document.querySelector('.eraser');
let penmode = document.querySelector('.pen');


erasermode.addEventListener('click',()=>{
    sharedState.currentTool = 'eraser';
})

penmode.addEventListener('click',()=>{
    sharedState.currentTool = 'pen';
})


let lastX = 0, lastY = 0;

export default function updatevalue(index=CurrentPageNumber) {
    CurrentPageNumber = sharedState.CurrentPageNumber = index;
    setdrawingarea(CurrentPageNumber);
    checkpenmode()
    getcurrentmode()
    return CurrentPageNumber
}



// Show eraser cursor only in eraser mode
document.addEventListener('mousemove', (e) => {
    if (sharedState.currentTool === 'eraser') {
        erasermouse.style.display = 'block';
        erasermouse.style.left = (e.clientX - mouseerasewidth / 2) + 'px';
        erasermouse.style.top = (e.clientY - mouseerasewidth / 2) + 'px';
    } else {
        erasermouse.style.display = 'none';
    }
});





/* 
    evt.clientX = Where finger or mouse is in the viewport (X)
    rect.left   = How far canvas is from screen's left side
    => So (clientX - rect.left) = exact position inside canvas
*/
function setdrawingarea(index) {
    currentCanvas = document.querySelectorAll('canvas')[index];

    if (!currentCanvas.dataset.resized) {
        currentCanvas.width = currentCanvas.clientWidth;
        currentCanvas.height = currentCanvas.clientHeight;
        currentCanvas.dataset.resized = 'true';
    }

    context = currentCanvas.getContext('2d');

    function getPos(evt) {
        const rect = currentCanvas.getBoundingClientRect();
        let x, y;

        if (evt.touches && evt.touches.length > 0) {
            x = evt.touches[0].clientX - rect.left;
            y = evt.touches[0].clientY - rect.top;
        } else {
            x = evt.clientX - rect.left;
            y = evt.clientY - rect.top;
        }

        return { x, y };
    }

    function startDrawing(evt) {
        isDrawing = true;
        const { x, y } = getPos(evt);
        lastX = x;
        lastY = y;
    }

    function draw(evt) {
        if (!isDrawing) return;
        const { x, y } = getPos(evt);

        if (sharedState.currentTool === 'pen') {
            if (neonPenStatus) {
                drawNeonGlow(lastX, lastY, x, y, pencolor);
            } else {
                drawNormalLine(lastX, lastY, x, y, pencolor);
            }
        } else if (sharedState.currentTool === 'eraser') {
            drawEraser(lastX, lastY, x, y);
        }

        lastX = x;
        lastY = y;
    }

    function stopDrawing() {
        isDrawing = false;
    }

    function drawNeonGlow(x1, y1, x2, y2, color) {
        const blurSteps = 5;

        




        for (let i = 0; i < blurSteps; i++) {
            context.beginPath();
            context.moveTo(x1, y1);
            context.lineTo(x2, y2);
            context.lineWidth = PenSizeCustom;
            context.globalCompositeOperation = 'source-over';
            context.strokeStyle = color;
            context.shadowColor = color;
            context.shadowBlur = 10 + i * 4;
            context.stroke();
        }

        // Final sharp white core
        context.beginPath();
        context.moveTo(x1, y1);
        context.lineTo(x2, y2);
        context.lineWidth = PenSizeCustom-2;
        context.strokeStyle = 'white';
        context.shadowBlur = 0;
        context.stroke();
    }

    function drawNormalLine(x1, y1, x2, y2, color) {
        context.beginPath();
        context.moveTo(x1, y1);
        context.lineTo(x2, y2);
        context.globalCompositeOperation = 'source-over';
        context.lineWidth = PenSizeCustom;
        context.strokeStyle = color;
        context.shadowBlur = 0;
        context.stroke();
    }

    function drawEraser(x1, y1, x2, y2) {
        context.beginPath();
        context.moveTo(x1, y1);
        context.lineTo(x2, y2);
        context.globalCompositeOperation = 'destination-out';
        context.lineWidth = eraserSizeCustom;
        context.strokeStyle = 'rgba(0,0,0,1)';
        context.shadowBlur = 0;
        context.stroke();
    }

    // 🖱 Mouse
    currentCanvas.addEventListener('mousedown', startDrawing);
    currentCanvas.addEventListener('mousemove', draw);
    currentCanvas.addEventListener('mouseup', stopDrawing);

    // 📱 Touch
    currentCanvas.addEventListener('touchstart', startDrawing);
    currentCanvas.addEventListener('touchmove', (e) => {
        draw(e);
        e.preventDefault();
    }, { passive: false });
    currentCanvas.addEventListener('touchend', stopDrawing);

    currentCanvas.dataset.listenersSet = 'true';
}
=======
import sharedState from './sharedState.js';

let CurrentPageNumber = 0;
let currentCanvas = null;
let context = null;
let isDrawing = false;
let pencolor = 'yellow'; // Change to any color
let neonPenStatus = false; // true = glow, false = normal
let currentmode  = sharedState.currentTool
let mouseerasewidth = 5;

let customColor  = document.querySelector('#customColor')

export let  customColorMode = {
    color:'red'
}

// Create the eraser cursor
let erasermouse = document.createElement('div');
erasermouse.setAttribute('class', 'eraserMouse');

document.body.appendChild(erasermouse);


let eraserSizeCustomElement =document.querySelector('#eraserSizeCustom')
let PenSizeCustomElement = document.querySelector('#PenSizeCustom')
let eraserSizeCustom = 5;
let PenSizeCustom = 0

 function getcurrentmode(){
    
    console.log(sharedState.currentTool);

    
}

let BtnBallNeon = document.querySelector('.BtnBallNeon')
let penNeonButton  = document.querySelector('.penNeonButton')


customColor.addEventListener('change',(e)=>{

    pencolor = customColorMode.color = e.target.value;

})

eraserSizeCustomElement.addEventListener('change',(e)=>{
    eraserSizeCustom = e.target.value;
    mouseerasewidth = eraserSizeCustom;
    erasermouse.style.width = mouseerasewidth + 'px';
    erasermouse.style.height = mouseerasewidth + 'px';
})


PenSizeCustomElement.addEventListener('change',(e)=>{
    PenSizeCustom = e.target.value
})



export function checkpenmode(){ 



if (BtnBallNeon.classList.contains('active')) {
    neonPenStatus =true;
    
}
else{
    neonPenStatus=false;
}

}

let erasermode = document.querySelector('.eraser');
let penmode = document.querySelector('.pen');


erasermode.addEventListener('click',()=>{
    sharedState.currentTool = 'eraser';
})

penmode.addEventListener('click',()=>{
    sharedState.currentTool = 'pen';
})


let lastX = 0, lastY = 0;

export default function updatevalue(index=CurrentPageNumber) {
    CurrentPageNumber = sharedState.CurrentPageNumber = index;
    setdrawingarea(CurrentPageNumber);
    checkpenmode()
    getcurrentmode()
    return CurrentPageNumber
}



// Show eraser cursor only in eraser mode
document.addEventListener('mousemove', (e) => {
    if (sharedState.currentTool === 'eraser') {
        erasermouse.style.display = 'block';
        erasermouse.style.left = (e.clientX - mouseerasewidth / 2) + 'px';
        erasermouse.style.top = (e.clientY - mouseerasewidth / 2) + 'px';
    } else {
        erasermouse.style.display = 'none';
    }
});





/* 
    evt.clientX = Where finger or mouse is in the viewport (X)
    rect.left   = How far canvas is from screen's left side
    => So (clientX - rect.left) = exact position inside canvas
*/
function setdrawingarea(index) {
    currentCanvas = document.querySelectorAll('canvas')[index];

    if (!currentCanvas.dataset.resized) {
        currentCanvas.width = currentCanvas.clientWidth;
        currentCanvas.height = currentCanvas.clientHeight;
        currentCanvas.dataset.resized = 'true';
    }

    context = currentCanvas.getContext('2d');

    function getPos(evt) {
        const rect = currentCanvas.getBoundingClientRect();
        let x, y;

        if (evt.touches && evt.touches.length > 0) {
            x = evt.touches[0].clientX - rect.left;
            y = evt.touches[0].clientY - rect.top;
        } else {
            x = evt.clientX - rect.left;
            y = evt.clientY - rect.top;
        }

        return { x, y };
    }

    function startDrawing(evt) {
        isDrawing = true;
        const { x, y } = getPos(evt);
        lastX = x;
        lastY = y;
    }

    function draw(evt) {
        if (!isDrawing) return;
        const { x, y } = getPos(evt);

        if (sharedState.currentTool === 'pen') {
            if (neonPenStatus) {
                drawNeonGlow(lastX, lastY, x, y, pencolor);
            } else {
                drawNormalLine(lastX, lastY, x, y, pencolor);
            }
        } else if (sharedState.currentTool === 'eraser') {
            drawEraser(lastX, lastY, x, y);
        }

        lastX = x;
        lastY = y;
    }

    function stopDrawing() {
        isDrawing = false;
    }

    function drawNeonGlow(x1, y1, x2, y2, color) {
        const blurSteps = 5;

        




        for (let i = 0; i < blurSteps; i++) {
            context.beginPath();
            context.moveTo(x1, y1);
            context.lineTo(x2, y2);
            context.lineWidth = PenSizeCustom;
            context.globalCompositeOperation = 'source-over';
            context.strokeStyle = color;
            context.shadowColor = color;
            context.shadowBlur = 10 + i * 4;
            context.stroke();
        }

        // Final sharp white core
        context.beginPath();
        context.moveTo(x1, y1);
        context.lineTo(x2, y2);
        context.lineWidth = PenSizeCustom-2;
        context.strokeStyle = 'white';
        context.shadowBlur = 0;
        context.stroke();
    }

    function drawNormalLine(x1, y1, x2, y2, color) {
        context.beginPath();
        context.moveTo(x1, y1);
        context.lineTo(x2, y2);
        context.globalCompositeOperation = 'source-over';
        context.lineWidth = PenSizeCustom;
        context.strokeStyle = color;
        context.shadowBlur = 0;
        context.stroke();
    }

    function drawEraser(x1, y1, x2, y2) {
        context.beginPath();
        context.moveTo(x1, y1);
        context.lineTo(x2, y2);
        context.globalCompositeOperation = 'destination-out';
        context.lineWidth = eraserSizeCustom;
        context.strokeStyle = 'rgba(0,0,0,1)';
        context.shadowBlur = 0;
        context.stroke();
    }

    // 🖱 Mouse
    currentCanvas.addEventListener('mousedown', startDrawing);
    currentCanvas.addEventListener('mousemove', draw);
    currentCanvas.addEventListener('mouseup', stopDrawing);

    // 📱 Touch
    currentCanvas.addEventListener('touchstart', startDrawing);
    currentCanvas.addEventListener('touchmove', (e) => {
        draw(e);
        e.preventDefault();
    }, { passive: false });
    currentCanvas.addEventListener('touchend', stopDrawing);

    currentCanvas.dataset.listenersSet = 'true';
}
>>>>>>> 09451d08de3519fe18a3e9b0fc4a624fc16b5657
