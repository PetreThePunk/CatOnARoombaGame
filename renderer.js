// ctx.save();
// ctx.restore(); ------- VERY USEFULL(Think transformations)
"use strict";

var Renderer = {

	draw: function() {
		Renderer.drawRoomba();
		Renderer.drawLevel( CatOnARoomba.layout );
	},
	drawRoomba: function() {
	
		if(CatOnARoomba.roomba.running || typeof CatOnARoomba.roomba.pathPoints[0] !== "undefined" ) {
			drawPath( CatOnARoomba.roomba.pathPoints, "green", 5 );
			drawCircle( CatOnARoomba.roomba.x, CatOnARoomba.roomba.y, CatOnARoomba.roomba.radius, "black" );
			RoombaEngine.run(CatOnARoomba.roomba);
		}
	},
	drawLevel: function( layout ) {
		Renderer.drawObstacles( layout.obstacles );
	},
	drawTrash: function( trash ) {
	
	},
	drawObstacles: function( obstacles ) {
		var context = CatOnARoomba.ctx;
		for( var i = 0; i < obstacles.length; i++ ) {
			context.fillStyle = "brown";
			context.fillRect( obstacles[i].positionX, obstacles[i].positionY,
				obstacles[i].width, obstacles[i].height );
		}
	}



};