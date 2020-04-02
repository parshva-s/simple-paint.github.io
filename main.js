//this is a java file
'use strict';

let cnv = document.getElementById('canvas');
let ctx =cnv.getContext('2d');
cnv.width = 1000;
cnv.height = 600;
let mousePressed = false;//if mouse is pressed
let mouseX,mouseY,pmouseX,pmouseY;//mouse coordinates,
let thickness = 5;//brush size
let paintColor = 'black';
let line = false;
let circle_filled = false;
let circle_outlined = false;
let triangle_filled = false;
let triangle_outlined = false;

//colour of paint
document.getElementById('button0').addEventListener('click',white);
function white() {
    paintColor = 'white';
}
document.getElementById('button1').addEventListener('click',red);
function red() {
    paintColor = 'red';
}
document.getElementById('button2').addEventListener('click',orange);
function orange() {
    paintColor = 'orange';
}
document.getElementById('button3').addEventListener('click',yellow);
function yellow() {
    paintColor = 'yellow';
}
document.getElementById('button4').addEventListener('click',green);
function green() {
    paintColor = 'green';
}
document.getElementById('button5').addEventListener('click',blue);
function blue() {
    paintColor ='blue'; 
}
document.getElementById('button6').addEventListener('click',pink);
function pink() {
    paintColor = 'pink';
}
document.getElementById('button7').addEventListener('click',purple);
function purple() {
    paintColor = 'purple';
}
document.getElementById('button8').addEventListener('click',brown);
function brown() {
    paintColor = 'brown';
}
document.getElementById('button9').addEventListener('click',black);
function black() {
    paintColor = 'black';
}
document.getElementById('color').addEventListener('change',colorPicker);
function colorPicker() {
    paintColor = document.getElementById('color').value;
}

//changing shapes
document.getElementById('line').addEventListener('click',shapeLine);
document.getElementById('filledcircle').addEventListener('click',filledCircle);
document.getElementById('outlinedcircle').addEventListener('click',outlinedCircle);
document.getElementById('filledtriangle').addEventListener('click',filledTriangle);
document.getElementById('outlinedtriangle').addEventListener('click',outlinedTriangle);

//line
function shapeLine() {
    //update to make line true
    line = true;
    circle_filled = false;
    circle_outlined = false;
    triangle_filled = false;
    triangle_outlined = false;
    requestAnimationFrame(draw);
function draw() {
    //when mouse is pressed and brush is set to 'line'
    if(mousePressed && line){
        ctx.strokeStyle = paintColor;//colour of paint
        ctx.lineWidth = thickness;
        ctx.beginPath();
        ctx.moveTo(pmouseX,pmouseY);//the paint brush
        ctx.lineTo(mouseX,mouseY);
        ctx.stroke();//fills the thing its drawing
        }  
    requestAnimationFrame(draw);
    } 
}
//filled circle
function filledCircle() {
    //update to make filled circle true
    line = false;
    circle_filled = true;
    circle_outlined = false;
    triangle_filled = false;
    triangle_outlined = false;
    requestAnimationFrame(draw);
function draw() {
    //when mouse is pressed and brush is set to 'filled circle'
    if(mousePressed && circle_filled) {
        ctx.fillStyle = paintColor;//colour
        ctx.beginPath();
        ctx.arc(mouseX,mouseY-thickness,thickness,0,2*Math.PI);//circle changes radius based on thickness
        ctx.fill();//fills circle     
        }
    requestAnimationFrame(draw);
    }
}
//outlined circle
function outlinedCircle() {
    //update to make outlined circle true
    line = false;
    circle_filled = false;
    circle_outlined = true;
    triangle_filled = false;
    triangle_outlined = false;
    requestAnimationFrame(draw);
function draw() {
    //when mouse is pressed and brush is set to 'outlined circle'
    if (mousePressed && circle_outlined) {
        ctx.strokeStyle = paintColor;//colour
        ctx.lineWidth = 5;//border will always be 5
        ctx.beginPath();
        ctx.arc(mouseX,mouseY-(50+thickness),50+thickness,0,2*Math.PI);//circle changes radius based on thickness
        ctx.stroke();//fills the border of circle
        }
        requestAnimationFrame(draw);
    }
}
//filled triangle
function filledTriangle() {
    //updates to make filled triangle true
    line = false;
    circle_filled = false;
    circle_outlined = false;
    triangle_filled = true;
    triangle_outlined = false;
    requestAnimationFrame(draw);
function draw() {
    //when mouse is pressed and brush is set to 'filled triangle'
    if (mousePressed && triangle_filled) {
        ctx.fillStyle = paintColor;//colour
        ctx.beginPath();//shape of triangle
        ctx.moveTo(mouseX,mouseY-(100+thickness));
        ctx.lineTo(mouseX-(50+thickness),mouseY);
        ctx.lineTo(mouseX+(50+thickness),mouseY);
        ctx.closePath();
        ctx.fill();//fills it
        }
    requestAnimationFrame(draw);
    }
}
//outlined triangle
function outlinedTriangle() {
    //update to make outlined triangle true
    line = false;
    circle_filled = false;
    circle_outlined = false;
    triangle_filled = false;
    triangle_outlined = true;
    requestAnimationFrame(draw);
function draw() {
    //when mouse is pressed and brush is set to 'outlined triangle'
    if (mousePressed && triangle_outlined) {
        ctx.lineWidth = 5;//width of border
        ctx.strokeStyle = paintColor;//colour
        ctx.beginPath();//shape of triangle
        ctx.moveTo(mouseX,mouseY-(50+thickness));
        ctx.lineTo(mouseX-(50+thickness),mouseY);
        ctx.lineTo(mouseX+(50+thickness),mouseY);
        ctx.closePath();
        ctx.stroke();//fills border
        }
        requestAnimationFrame(draw);
    }
}

//event listeners
document.addEventListener('mousedown',mouseDownHandler);
document.addEventListener('mouseup',mouseUpHandler);
document.addEventListener('mousemove', mouseMoveHandler);
document.addEventListener('keydown',thicker)
document.addEventListener('keydown',thinner)
document.addEventListener('keypress',restart);
document.getElementById('output').style.fontWeight = 'bolder';
document.getElementById('output').innerHTML = thickness;//displays thickness of brush

//when mouse is pressed
function mouseDownHandler() {
    mousePressed = true;
}
//when mouse is releases
function mouseUpHandler() {
    mousePressed = false;
}
//when mouse is moving
function mouseMoveHandler() {
    // previous mouse coordinates
    pmouseX = mouseX;
    pmouseY = mouseY;
    //present mouse coordinates
    let cnvRect = cnv.getBoundingClientRect();
    mouseX = event.x - cnvRect.x;
    mouseY = event.y - cnvRect.y;
}
//increases size of brush
function thicker() {
    if (event.code == "ArrowUp") {
        thickness++;
    }console.log(thickness);
    document.getElementById('output').innerHTML = thickness;
}
//decreases size of brush
function thinner() {
    if (event.code == "ArrowDown"){
        if(thickness>1) {
            thickness--;
        }
    }console.log(thickness);
    document.getElementById('output').innerHTML = thickness;
}
//restarts canvas
function restart() {
    if(event.code == "Space"){
        //blank canvas
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, cnv.width, cnv.height);
    }
}