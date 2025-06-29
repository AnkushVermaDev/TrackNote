let TableDataContainerForm = document.querySelector('#TableDataContainerForm');
let tableINPUT = document.querySelectorAll('#TableDataContainerForm input');
let table = document.querySelector('.table');
let tablecontainer = document.querySelector('.tablecontainer');
let settingOption = document.querySelectorAll('.settingOption input');

let selectedText = null;
let isDragging = false, offsetX = 0, offsetY = 0;

// 1️⃣ Make any eligible element draggable + selectable
function makeElementDraggable(el) {
    el.addEventListener('mousedown', (e) => {
        selectedText = el;
        const rect = el.getBoundingClientRect();
        isDragging = true;
        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;
    });

    el.addEventListener('touchstart', (e) => {
        const touch = e.touches[0];
        const rect = el.getBoundingClientRect();
        selectedText = el;
        isDragging = true;
        offsetX = touch.clientX - rect.left;
        offsetY = touch.clientY - rect.top;
    });

    el.addEventListener('click', () => {
        selectedText = el;
    });

    el.style.cursor = 'move';
    el.style.position = 'absolute';
}

// 2️⃣ Attach behavior to all current and future .settingOptionEligible elements
function refreshEligibleElements() {
    document.querySelectorAll('.settingOptionEligible').forEach(el => {
        if (!el.dataset.listenerAttached) {
            makeElementDraggable(el);
            el.dataset.listenerAttached = 'true';
        }
    });
}

// 3️⃣ Handle mouse/touch dragging
document.addEventListener('mousemove', (e) => {
    if (isDragging && selectedText) {
        selectedText.style.left = `${e.clientX - offsetX}px`;
        selectedText.style.top = `${e.clientY - offsetY}px`;
    }
});
document.addEventListener('mouseup', () => isDragging = false);

document.addEventListener('touchmove', (e) => {
    if (isDragging && selectedText) {
        const touch = e.touches[0];
        selectedText.style.left = `${touch.clientX - offsetX}px`;
        selectedText.style.top = `${touch.clientY - offsetY}px`;
    }
});
document.addEventListener('touchend', () => isDragging = false);

// 4️⃣ Handle size & rotation sliders
settingOption.forEach((input) => {
    input.addEventListener('input', (e) => {
        if (!selectedText) return;

        const id = e.target.id;
        const val = e.target.value;

        if (id === 'sizeItem') {
            selectedText.style.fontSize = val + 'rem';
        } else if (id === 'RotateItem') {
            selectedText.style.transform = `rotate(${val}deg)`;
        }
    });
});

// 5️⃣ Table form submission and generation
TableDataContainerForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let userRow = 0, userCol = 0;

    tableINPUT.forEach((item) => {
        if (item.name === 'tableRow') {
            userRow = parseInt(item.value);
        } else if (item.name === 'tableColumn') {
            userCol = parseInt(item.value);
        }
    });

    if (userRow > 0 && userCol > 0) {
        let fulltable = '';
        for (let i = 0; i < userRow; i++) {
            let row = '<tr>';
            for (let j = 0; j < userCol; j++) {
                row += '<td contenteditable="true">d</td>';
            }
            row += '</tr>';
            fulltable += row;
        }

        table.innerHTML = fulltable;

        // ✅ Make the tablecontainer draggable/resizable/rotatable
        tablecontainer.classList.add('settingOptionEligible');
        tablecontainer.style.left = '100px';
        tablecontainer.style.top = '100px';
        tablecontainer.style.position = 'absolute';

        refreshEligibleElements(); // Apply interactivity
    }

    TableDataContainerForm.style.display = 'none';
});

// ✅ On page load: make existing .settingOptionEligible elements interactive
refreshEligibleElements();
