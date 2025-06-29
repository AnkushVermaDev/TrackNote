let insertTextField = document.querySelector('#insertTextField');
let insertTextFieldBtn = document.querySelector('#insertTextFieldBtn');
let formdataText = document.querySelector('#formdataText');
let takeuserinputText = document.querySelector('.takeuserinputText');

let settingOption = document.querySelectorAll('.settingOption input');

let currenttext = '';
let selectedText = null;

let xpos = 0, ypos = 0, sizeitem = 0, RotateItem = 0;
let previousTextX = 0, previousTextY = 0;

// 🛠️ GLOBAL drag state
let isDragging = false, offsetX = 0, offsetY = 0;

insertTextField.addEventListener('input', (e) => {
    currenttext = e.target.value;
});

insertTextFieldBtn.addEventListener('click', () => {
    if (!currenttext.trim()) return;

    document.querySelector('.FormTextContainer').style.display = 'none';

    let child = document.createElement('h3');
    child.className = 'childtakeuserinputText settingOptionEligible';
    child.innerText = currenttext;

    child.style.position = 'absolute';
    child.style.left = '100px';
    child.style.top = '100px';

    // ✅ MOUSE DRAG START
    child.addEventListener('mousedown', (e) => {
        selectedText = child;
        const rect = selectedText.getBoundingClientRect();
        isDragging = true;
        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;
    });

    // ✅ TOUCH DRAG START
    child.addEventListener('touchstart', (e) => {
        selectedText = child;
        const rect = selectedText.getBoundingClientRect();
        const touch = e.touches[0];
        isDragging = true;
        offsetX = touch.clientX - rect.left;
        offsetY = touch.clientY - rect.top;
    });

    // ✅ MOUSE MOVE
    document.addEventListener('mousemove', (e) => {
        if (isDragging && selectedText) {
            selectedText.style.left = `${e.clientX - offsetX}px`;
            selectedText.style.top = `${e.clientY - offsetY}px`;
        }
    });

    // ✅ TOUCH MOVE
    document.addEventListener('touchmove', (e) => {
        if (isDragging && selectedText) {
            const touch = e.touches[0];
            selectedText.style.left = `${touch.clientX - offsetX}px`;
            selectedText.style.top = `${touch.clientY - offsetY}px`;
        }
    });

    // ✅ MOUSE END
    document.addEventListener('mouseup', () => {
        isDragging = false;
    });

    // ✅ TOUCH END
    document.addEventListener('touchend', () => {
        isDragging = false;
    });

    child.addEventListener('click', () => {
        selectedText = child;
    });

    takeuserinputText.appendChild(child);
    formdataText.style.display = 'none';
    currenttext = '';
    previousTextX = 0;
    previousTextY = 0;
    insertTextField.value = '';
});

// ✅ Setting option update
settingOption.forEach((input) => {
    input.addEventListener('change', (e) => {
        if (!selectedText) return;

        const id = e.target.getAttribute('id');
        const val = e.target.value;

        if (id === 'sizeItem') {
            sizeitem = val;
            selectedText.style.fontSize = sizeitem + 'rem';
        } else if (id === 'RotateItem') {
            RotateItem = val;
            selectedText.style.transform = `rotateZ(${RotateItem}deg)`;
        }
    });
});
