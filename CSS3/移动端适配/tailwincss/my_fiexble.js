
MAX_FONT_SIZE = 42
window.addEventListener("DOMContentLoaded", () => {
    const html = document.querySelector("html");
    fontSize = html.clientWidth / 10
    fontSize = fontSize < MAX_FONT_SIZE ? fontSize : MAX_FONT_SIZE;
    html.style.fontSize = fontSize + "px";
    console.log('html字体大小:', html.style.fontSize);
});