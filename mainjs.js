"use strict";

// Game var with all globals so that things don't get messy
var CatOnARoomba;

//I shouldn't have to explain an init function
function init() {
	
	CatOnARoomba = {
		canvas: "undefined",
		ctx: "undefined",
		stopMain: "undefined",
		mouseDown: false,
		roomba: "undefined",
		layout: "undefined"
	};
	// Initalize canvas
	CatOnARoomba.canvas = document.querySelector("#canvas");
	CatOnARoomba.ctx = canvas.getContext("2d");
	// Roomba Obj
	CatOnARoomba.roomba = {
		x : 0,
		y : 0,
		forward : [0,0],
		running : false,
		pathPoints : [],
		radius : 15,
		currentTarget : 0
	};
	
	setMouseListeners();
	loadLevel();
	main();
}

function loadLevel() {
	
	$.getJSON("levels/1.json", function(json) {
		CatOnARoomba.layout = json;
	});
	
	
	
}

function setMouseListeners() {
	CatOnARoomba.canvas.addEventListener("mousedown", function(e) {
		CatOnARoomba.mouseDown = true;
		RoombaEngine.reset( CatOnARoomba.roomba );
		//clearCanvas();
		var mouse = getMouse(event);
		RoombaEngine.recordPath( CatOnARoomba.roomba, mouse.x, mouse.y );
		
	});
	
	CatOnARoomba.canvas.addEventListener("mousemove", function(event) {
		if( CatOnARoomba.mouseDown ) {
			var mouse = getMouse(event);
			RoombaEngine.recordPath( CatOnARoomba.roomba, mouse.x, mouse.y ); 
			
		}
	});
	
	CatOnARoomba.canvas.addEventListener("mouseup", function(event) {
		CatOnARoomba.roomba.running = true;
		CatOnARoomba.mouseDown = false;
	});
	
	CatOnARoomba.canvas.addEventListener("mouseleave", function(event) {
		if( CatOnARoomba.mouseDown ) {
			CatOnARoomba.roomba.running = true;
			CatOnARoomba.mouseDown = false;
		}
	});
};

function getMouse(e){
	var mouse = {};
	mouse.x = e.pageX - e.target.offsetLeft;
	mouse.y = e.pageY - e.target.offsetTop;
	return mouse;
};

function clearCanvas() {
	CatOnARoomba.ctx.clearRect(0,0,CatOnARoomba.canvas.width,CatOnARoomba.canvas.height);
	
};

function drawCircle(x,y,radius,fillColor){
	CatOnARoomba.ctx.fillStyle = fillColor;
	
	CatOnARoomba.ctx.beginPath();
	
	CatOnARoomba.ctx.arc(x, y, radius, 0, Math.PI*2, false); 
	CatOnARoomba.ctx.closePath();
	CatOnARoomba.ctx.fill();

}
/** Draws stuff to the screen. DO NOT DRAW OUTSIDE OF THIS METHOD
 *
 *
 */
function render() {
	clearCanvas();
	Renderer.draw();
	
		
};

function drawPath( points, color, width ) {
			CatOnARoomba.ctx.strokeStyle = color;
			CatOnARoomba.ctx.lineWidth = width;
			
			CatOnARoomba.ctx.beginPath();
			CatOnARoomba.ctx.moveTo(points[0][0], points[0][1]);
			
			for(var i = 1; i < points.length; i++) {
				CatOnARoomba.ctx.lineTo(points[i][0], points[i][1]);
				//drawCircle( points[i][0], points[i][1], 1, "black" );
			}
			CatOnARoomba.ctx.stroke();
};

function drawPathDots( points, color, width ) {
			
			
			for(var i = 1; i < points.length; i++) {
				
				drawCircle( points[i][0], points[i][1], 1, color );
			}
			
};

/*
* Game Loop Stuff
*
*/
function main() {
    CatOnARoomba.stopMain = window.requestAnimationFrame( main );
	
	
    //update();
	render();
};

window.onload = init;