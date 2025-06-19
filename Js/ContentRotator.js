// Get all sliders
const SettingObjectInput = document.querySelectorAll('.SettingObjectInput');

// Get the settings panel
const SettingObject = document.querySelector('.SettingObject');

// All elements that are eligible for transform
const eligibleItems = document.querySelectorAll('.PropertiesEligible');

let xAsis = 0;
let yAsis = 0;
let RotateAngle = 0;
let selectedObject = null;

// 🔹 Show slider panel when a valid object is clicked
eligibleItems.forEach(item => {
  item.addEventListener('click', e => {
    selectedObject = e.currentTarget;
    SettingObject.style.display = 'block';
  });
});

// 🔹 Hide panel if clicking outside eligible object or slider panel
document.addEventListener('click', e => {
  const clicked = e.target;

  // If clicked element is NOT a .PropertiesEligible AND not inside the .SettingObject
  if (
    !clicked.classList.contains('PropertiesEligible') &&
    !clicked.closest('.SettingObject')
  ) {
    selectedObject = null;
    SettingObject.style.display = 'none';
  }
});

// 🔹 Apply transformation to selected object
function applyTransform() {
  if (!selectedObject) return;
  selectedObject.style.transform = `translate(${xAsis}px, ${yAsis}px) rotate(${RotateAngle}deg)`;
}

// 🔹 Slider event listeners
SettingObjectInput.forEach(input => {
  input.addEventListener('input', e => {
    switch (e.target.id) {
      case 'RotateId':
        RotateAngle = e.target.value;
        break;
      case 'Xasis':
        xAsis = e.target.value;
        break;
      case 'Yasis':
        yAsis = e.target.value;
        break;
    }

    applyTransform();
  });
});
