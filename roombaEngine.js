

"use strict";

var RoombaEngine = {
	/** Sends the roomba down the path
	 *
	 * @param roomba : roomba obj to modify
	 *
	 */
	run: function( roomba ) {
		if( roomba.running ) {
			if( roomba.currentTarget == 0 ) {
				// set the roomba at the start position
				roomba.x = roomba.pathPoints[0][0]; 
				roomba.y = roomba.pathPoints[0][1];
				roomba.currentTarget++;
			} else if(roomba.currentTarget < roomba.pathPoints.length-1) {
				RoombaEngine.calculateForward( roomba );
				roomba.x += roomba.forward[0];
				roomba.y += roomba.forward[1];
				
			} else {
				roomba.running = false;
			}
		
			RoombaEngine.checkCollisions( roomba );
		}
	},
	//SOMETIMES FORWARD DOES NOT RECALCULATE, FIX IT!!!!
	calculateForward: function( roomba ) {
		
		var vec1 = [ roomba.x, roomba.y ];
		var vec2 = roomba.pathPoints[roomba.currentTarget];
		
		var targetVec = [ vec2[0] - vec1[0], vec2[1] - vec1[1] ];
		
		//Some Crazy shite
		// Please explain this peter
		// NOT NOW!!!!
		if( ( targetVec[0] * targetVec[0] + targetVec[1] * targetVec[1] ) < 25 ) { 
			roomba.currentTarget++;
			var vec3 = [ roomba.x, roomba.y ];
			var vec4 = roomba.pathPoints[roomba.currentTarget];
			
			var targetVec2 = [ vec4[0] - vec3[0], vec4[1] - vec3[1] ];
			roomba.forward = RoombaEngine.normalize( targetVec2[0], targetVec2[1] );
		}
	
	},
	normalize: function( x, y ) {
		var mag = Math.sqrt( x * x + y * y );
		return [ x/mag, y/mag ];
		
	},
	/** Checks the path of the roomba for collisions with the room elements
	 *
	 * @param roomba : roomba obj to modify
	 *
	 */
	checkCollisions: function( roomba ) {

	},
	/** Checks the path of the roomba for collisions with the room elements
	 *
	 * @param roomba : roomba to check positions of
	 * @param objs : array of objects to collect
	 *
	 */
	collectObjs: function( roomba, objs ) {
		
	},
	/** Resets all of the roomba values to default
	 *
	 * @param roomba : roomba obj to modify
	 *
	 */
	reset: function( roomba ) {
		roomba.pathPoints = [];
		roomba.running = false;
		roomba.currentTarget = 0;
	},
	/** Adds point passed in to the end of the pathPoints array
	 *
	 * @param roomba : roomba obj to modify
	 * @param x : x value of point passed in
	 * @param y : y value of point passed in
	 *
	 */
	recordPath: function recordPath( roomba, x, y ) {
		roomba.pathPoints.push( [x, y] );
	}
	
};