const CANVAS_WIDTH = 512;
const CANVAS_HEIGHT = 512;

let generatedNoise = false;
let heightMap = [];

const canvas = document.getElementById("display");

let context = canvas.getContext("2d");
let data = context.getImageData(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

function initHeightMap(){
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;

    // initialise the 2d array with some random value (to fix later)
    for(let i = 0; i < CANVAS_HEIGHT;  i++){
        heightMap[i] = [];
        for(let j = 0; j < CANVAS_WIDTH; j++){
            heightMap[i][j] = Math.round(Math.random());
        }
    }
}

/**
 * Helper function to draw an individual pixel by manipulating ImageData.data.
 * @param {Number} x x-coordinate
 * @param {Number} y y-coordinate
 * @param {Number} r red
 * @param {Number} g green
 * @param {Number} b blue
 */
function drawPixel(x, y, r, g, b){
    // ImageData.data is an array where every 4 elements represents RGBA of a single pixel
    let index = x * 4 + y * CANVAS_WIDTH * 4
    data.data[index + 0] = r;
    data.data[index + 1] = g;
    data.data[index + 2] = b;
    data.data[index + 3] = 255;
}

function drawHeightMap(){
    for(let y = 0; y < CANVAS_HEIGHT; y++){
        for(let x = 0; x < CANVAS_WIDTH; x++){
            let val = heightMap[x][y] * 255;
            drawPixel(x, y, val, val, val);
        }
    }
    context.putImageData(data, 0, 0);
}

initHeightMap();
drawHeightMap();