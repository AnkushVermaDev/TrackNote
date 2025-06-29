// AddNewPage.js


import updatevalue from './DrawingPen.js';
import sharedState from './sharedState.js'; // optional if you want to read from it directly


let leftPage = document.querySelector('.leftPage');
let rightPage = document.querySelector('.rightPage');
let insertpagePlusBtn = document.querySelector('.insertpagePlusBtn');
let currentpageNumberHolderBox = document.querySelector('.currentpageNumberHolderBox');
let drawingcontainer = document.querySelector('.drawingcontainer');

let allpagesElements = document.querySelectorAll('.currentpageNumberHolder');
let canvasPages = document.querySelectorAll('.canvas');

let totalpagesNumber = 0;
let CurrentPageNumber = 0;

// Show first page initially
window.onload = () => {
     ShowPage(0);
    GlowPageNumber(0);
    updatevalue(0); 
};

leftPage.addEventListener('click', () => {
    if (CurrentPageNumber > 0) {
        RemoveGlowNumber(CurrentPageNumber);
        CurrentPageNumber--;
        ShowPage(CurrentPageNumber);
        updatevalue(CurrentPageNumber);
        GlowPageNumber(CurrentPageNumber);
    }
});

rightPage.addEventListener('click', () => {
    if (CurrentPageNumber < allpagesElements.length - 1) {
        RemoveGlowNumber(CurrentPageNumber);
        CurrentPageNumber++;
        ShowPage(CurrentPageNumber);
        updatevalue(CurrentPageNumber);
        GlowPageNumber(CurrentPageNumber);
    }
});

insertpagePlusBtn.addEventListener('click', () => {
    // Add dot
    let newDot = document.createElement('div');
    newDot.setAttribute('class', 'currentpageNumberHolder');
    currentpageNumberHolderBox.appendChild(newDot);

    // Add canvas
    let newCanvas = document.createElement('canvas');
    newCanvas.setAttribute('class', 'canvas');
    newCanvas.width = 800;
    newCanvas.height = 600;
    newCanvas.style.display = 'none'; // hidden by default
    drawingcontainer.appendChild(newCanvas);

    // Draw random letter
    let myarr = ['a', 'b', 'c', 'd', 'e', 'f'];
    let randomIndex = Math.floor(Math.random() * myarr.length);
    let ctx = newCanvas.getContext('2d');
    ctx.fillStyle = 'white';
    ctx.font = '30px Arial';
    ctx.fillText(myarr[randomIndex], 50, 50);

    // Update state
    allpagesElements = document.querySelectorAll('.currentpageNumberHolder');
    canvasPages = document.querySelectorAll('.canvas');

    if (totalpagesNumber >= 0) RemoveGlowNumber(CurrentPageNumber);
    totalpagesNumber = allpagesElements.length - 1;
    CurrentPageNumber = totalpagesNumber;

    ShowPage(CurrentPageNumber);
    GlowPageNumber(CurrentPageNumber);
    updatevalue(CurrentPageNumber);
});

function GlowPageNumber(index) {
    allpagesElements = document.querySelectorAll('.currentpageNumberHolder');
    if (allpagesElements[index])
        allpagesElements[index].style.boxShadow = '0px 0px 5px yellow,0px 0px 10px yellow,0px 0px 20px yellow';
}

function RemoveGlowNumber(index) {
    allpagesElements = document.querySelectorAll('.currentpageNumberHolder');
    if (allpagesElements[index])
        allpagesElements[index].style.boxShadow = 'none';
}

function ShowPage(currentIndex) {
    canvasPages = document.querySelectorAll('.canvas');
    canvasPages.forEach((element, index) => {
        if (index === currentIndex) {
            element.style.display = 'block';
            element.style.zIndex = '0';
        } else {
            element.style.display = 'none';
            element.style.zIndex = '0';
        }
    });
}

