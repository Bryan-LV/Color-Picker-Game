// UI variables
let rgbDisplay = document.querySelector('#rgbDisplay');
let boxContainer = document.querySelector('.body');
let easySetting = document.querySelector('.easy');
let restart = document.querySelector('.restart');
let hardSetting = document.querySelector('.hard');
let tries = document.querySelector('.tries');
let count = 3;
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
    // reset count
    count = 3;
    tries.textContent = count;

    // add event listener for box clicks
    document.addEventListener('click',chooseBox);

    // add boxes back to screen

    // clear message text
    let message = document.querySelector('.message');
    message.textContent = '';
    //each box should get a different rgb value
    boxes.forEach(function(box){
        box.style.backgroundColor = `RGB(${ran()}, ${ran()}, ${ran()})`;
        box.style.display = 'flex';
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
            document.removeEventListener('click',chooseBox);
            // make all boxes the correct RGB color
            let boxes = document.querySelectorAll('.box');
            boxes.forEach(function(box){
                box.style.backgroundColor = headerRGB;
            });
            setTimeout(generateRGB, 3000)
            setTimeout(function(){
                message.textContent = '';
            },3000);
        } else if (count !== 0){
            tries.textContent = --count;
            // take away box if not the right color
            e.target.style.display = 'none';
        } else{
            let message = document.querySelector('.message');
            message.textContent = `Sorry You Ran Out Of chances`;
            document.removeEventListener('click',chooseBox);
            setTimeout(generateRGB, 2000);
        }
    }
}

