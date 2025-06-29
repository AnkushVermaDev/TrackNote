let insertTextField = document.querySelector('#insertTextField');
let insertTextFieldBtn = document.querySelector('#insertTextFieldBtn');
let formdataText = document.querySelector('#formdataText');
let takeuserinputText = document.querySelector('.takeuserinputText');
let settingOption = document.querySelectorAll('.settingOption input');

let selectedText = null;
let isDragging = false, offsetX = 0, offsetY = 0;

// 🔁 Apply drag/select handlers to all eligible elements
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

    el.style.cursor = "move";
    el.style.position = "absolute";
}

// 🔁 Run this after new eligible elements are added
function refreshEligibleElements() {
    document.querySelectorAll('.settingOptionEligible').forEach(el => {
        if (!el.dataset.listenerAttached) {
            makeElementDraggable(el);
            el.dataset.listenerAttached = "true";
        }
    });
}

// ⬅️ Mouse & Touch movement
document.addEventListener('mousemove', (e) => {
    if (isDragging && selectedText) {
        selectedText.style.left = `${e.clientX - offsetX}px`;
        selectedText.style.top = `${e.clientY - offsetY}px`;
    }
});
document.addEventListener('mouseup', () => { isDragging = false; });

document.addEventListener('touchmove', (e) => {
    if (isDragging && selectedText) {
        const touch = e.touches[0];
        selectedText.style.left = `${touch.clientX - offsetX}px`;
        selectedText.style.top = `${touch.clientY - offsetY}px`;
    }
});
document.addEventListener('touchend', () => { isDragging = false; });

// 🔧 Slider controls for selected item
settingOption.forEach((input) => {
    input.addEventListener('input', (e) => {
        if (!selectedText) return;
        const id = e.target.getAttribute('id');
        const val = e.target.value;

        if (id === 'sizeItem') {
            selectedText.style.fontSize = val + 'rem';
        } else if (id === 'RotateItem') {
            selectedText.style.transform = `rotate(${val}deg)`;
        }
    });
});

// 📝 Insert new text and make it eligible
insertTextFieldBtn.addEventListener('click', () => {
    let currenttext = insertTextField.value.trim();
    if (!currenttext) return;

    document.querySelector('.FormTextContainer').style.display = 'none';

    let child = document.createElement('h3');
    child.className = 'childtakeuserinputText settingOptionEligible';
    child.innerText = currenttext;
    child.style.left = '100px';
    child.style.top = '100px';

    takeuserinputText.appendChild(child);
    insertTextField.value = '';
    formdataText.style.display = 'none';

    refreshEligibleElements(); // ✅ Make draggable, rotatable, resizable
});

// ✅ Run once at startup
refreshEligibleElements();
