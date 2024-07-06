// size is the number of horizontal or vertical squares
const CONTAINER_WIDTH = 500;
const CONTAINER_HEIGHT = 500;
const DEFAULT_SQUARES_NUMBER = 32;
const DEFAULT_SQUARES_COLOR = "black";
const DEFAULT_SQUARES_BORDER = "1px solid black";

const container = document.querySelector(".container");

const toggleColorBtn = document.querySelector("#toggle-color");
const toggleBorderBtn = document.querySelector("#toggle-border");
const toggleBtns = document.querySelectorAll(".toggle");

const sizeBtn = document.querySelector("#size");
const clearBtn = document.querySelector("#clear");

let currentSize = DEFAULT_SQUARES_NUMBER;
let getCurrentColorMode = getDefaultColor;
let currentBorder = DEFAULT_SQUARES_BORDER;

function getCurrentSquaresWidthAndHeight() {
    return CONTAINER_WIDTH / currentSize; 
}

function createGrid() {
    const squareWidthAndHeight = getCurrentSquaresWidthAndHeight();
    for (let i = 0; i < currentSize**2; i++) {
        const square = document.createElement("div");
        square.style.width = `${squareWidthAndHeight}px`;
        square.style.height = `${squareWidthAndHeight}px`;
        square.style.border = currentBorder;
        container.appendChild(square);
    }
}

function getDefaultColor() {
    return DEFAULT_SQUARES_COLOR;
}

function getRainbowColor() {
    return `rgb(${Math.floor(Math.random()*256)},
                ${Math.floor(Math.random()*256)},
                ${Math.floor(Math.random()*256)})`;
}

container.addEventListener("mouseover", e => {
    if (e.target.className === "container") return; // ignore hovering on the parent container
    e.target.style.backgroundColor = getCurrentColorMode();
});

toggleColorBtn.addEventListener("click", e => {
    getCurrentColorMode = (getCurrentColorMode === getDefaultColor)? getRainbowColor : getDefaultColor;
});

toggleBorderBtn.addEventListener("click", e => {
    const squares = container.children;
     if (squares[0].style.border === DEFAULT_SQUARES_BORDER) {
        for (const square of squares) {
            square.style.border = "";
        }
        currentBorder = "";
    }
    else {
         for (const square of squares) {
             square.style.border = DEFAULT_SQUARES_BORDER;
         }
         currentBorder = DEFAULT_SQUARES_BORDER;
     }
});

toggleBtns.forEach(button => {
    button.addEventListener("click", e => {
        button.classList.toggle("toggle-active");
    });
});

sizeBtn.addEventListener("click", e => {
    let size;
    while(true) {
        size = prompt("Enter number of square line (1 : 100)");
        if (size === null || size === "") return;
        size = +size;
        if (Number.isInteger(size) && (size >= 1 && size <= 100)) {
            break;
        }
        else {
            alert("Enter a valid number");
        }
    }
    currentSize = size;
    container.innerHTML = "";
    createGrid();
});

clearBtn.addEventListener("click", e => {
    container.innerHTML = "";
    createGrid();
});

createGrid();