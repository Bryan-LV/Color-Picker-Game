// UI variables
let rgbDisplay = document.querySelector('#rgbDisplay');
let boxContainer = document.querySelector('.body');
let easySetting = document.querySelector('.easy');
let restart = document.querySelector('.restart');
let hardSetting = document.querySelector('.hard');
let div = document.createElement('div');
div.classList.add('box-grid');

// set up event listeners
runEvents();

function runEvents(){
    // Start Game
    document.addEventListener('DOMContentLoaded',generateRGB);
    // boxes choosing event
    document.addEventListener('click',chooseBox);
    // Reset
    restart.addEventListener('click',generateRGB);
    // Easy Mode
    easySetting.addEventListener('click',hideBoxes);
    // Hard mode
    hardSetting.addEventListener('click',showBoxes);
}

// when page loads generate rgb values
function generateRGB(){
    
    // generate header RGB on DOM load
    rgbDisplay.textContent = `RGB(${ran()}, ${ran()}, ${ran()})`;
    // grab boxes
    let boxes = document.querySelectorAll('.box');
    // hide boxes on easy mode
    hideBoxes();
    //each box should get a different rgb value
    boxes.forEach(function(box){
        box.style.backgroundColor = `RGB(${ran()}, ${ran()}, ${ran()})`;
    });
    // select one box to match header rgb
    let randomBox = Math.round(Math.random() * 2);
    console.log(randomBox);
    boxes[randomBox].style.backgroundColor = rgbDisplay.textContent;
}   

// generates random number
function ran(){
    return Math.floor(Math.random() * 255);
}

// hide boxes on easy mode
function hideBoxes(){
    let hardModeDiv = document.querySelector('.hardMode');
    hardModeDiv.style.display = 'none';
}

// show boxes on hard mode
function showBoxes(){
    let hardModeDiv = document.querySelector('.hardMode');
    hardModeDiv.style.display = 'flex';
}

// check if box is same as header rgb
function chooseBox(e){
    if(e.target.classList.contains('box')){
        let headerRGB = rgbDisplay.textContent.toLowerCase();
        let targetBox = e.target.style.backgroundColor.toLowerCase();

        if(headerRGB == targetBox){
            let message = document.querySelector('.message');
            message.textContent = `You picked the right RGB Value!`
            setTimeout(generateRGB, 3000)
            setTimeout(function(){
                message.textContent = '';
            },3000);
        }
    }
}

