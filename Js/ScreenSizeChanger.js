let ScreenMode = document.querySelector('.ScreenMode');
let DrawingArea = document.querySelector('.DrawingArea');

ScreenMode.addEventListener('click', () => {
    let GetAttrScreen = ScreenMode.getAttribute('class');
    let currentScreenResult = GetAttrScreen.match(/^\S+/)[0];

    if (currentScreenResult === 'Potrait') {
        DrawingArea.style.width = '100vw';
        DrawingArea.style.height = '90vh';

        let NewAttributeScreen = GetAttrScreen.replace(/^\S+/, 'Landscape');
        ScreenMode.setAttribute('class', NewAttributeScreen);
    } else {
        DrawingArea.style.width = '85vw';
        DrawingArea.style.height = '60vh';

        let NewAttributeScreen = GetAttrScreen.replace(/^\S+/, 'Potrait');
        ScreenMode.setAttribute('class', NewAttributeScreen);
    }
});
