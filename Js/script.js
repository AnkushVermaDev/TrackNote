let currentShape = document.querySelector('.CurrentShape');

let shapesContainer = document.querySelector('.shapesContainer');

let fileButton = document.querySelector('.ButtonHeader h3');

DrawingArea = document.querySelector('.DrawingArea');

let saveBtn = document.querySelector('.saveBtn');

let fileMenu = document.querySelector('.FileMenu');


let fileMenuOpen = false;
let shapeBool = false;

let ShapeAttribute = '';
let NewAttribute = '';
let activeMode = 'canvas';
let currentPath;


// Toggle file menu
fileButton.addEventListener('click', () => {
  fileMenu.style.display = fileMenuOpen ? 'none' : 'flex';
  fileMenuOpen = !fileMenuOpen;
});

// New file clears canvas
document.querySelector('.FileMenu h4:nth-child(2)').addEventListener('click', () => {
  context.clearRect(0, 0, canvas.width, canvas.height);
  svg.innerHTML = '';
});

// Toggle shapes container
currentShape.addEventListener('click', (e) => {
  ShapeAttribute = e.target.getAttribute('class');
  shapesContainer.style.display = shapeBool ? 'none' : 'flex';
  shapeBool = !shapeBool;
});

shapesContainer.addEventListener('click', (e) => {
  let SelectedShapeClass = e.target.className;
  shapesContainer.style.display = 'none';
  NewAttribute = ShapeAttribute.replace(/^\S+/, SelectedShapeClass);
  currentShape.setAttribute('class', NewAttribute);
  activeMode = 'canvas';
  canvas.style.pointerEvents = 'auto';
  svg.style.pointerEvents = 'none';
});

// Pencil = freehand SVG
document.querySelector('.pencil').addEventListener('click', () => {
  activeMode = 'svg';
  canvas.style.pointerEvents = 'none';
  svg.style.pointerEvents = 'auto';
});




// save Picture



function saveDivAsImage() {
  
  html2canvas(DrawingArea).then(canvas => {
    // Create a link element
    const link = document.createElement('a');
    link.download = 'Workspaceimage.jpeg';
    link.href = canvas.toDataURL('image/jpeg');
    link.click();
  });
}



saveBtn.addEventListener('click',()=>{
    saveDivAsImage()
})