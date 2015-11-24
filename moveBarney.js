// Created by: Molnár Barnabás (FLHZ6I)
function FLHZ6I(pname,px,py,pmap){
	// Am I alive?
	if (px && py) {
		var direction = 4;
		var againEndlessCycle = 0;
		
		// Looking for "ones" ===========================================================================
		console.log("Searching for ones...");
		var ones = [];

		if (map[py - 1][px] == 1) {ones.push(0);}
		if (map[py + 1][px] == 1) {ones.push(2);}
		if (map[py][px - 1] == 1) {ones.push(1);}
		if (map[py][px + 1] == 1) {ones.push(3);}
		
		// Searching for good route
		var goodOnes = [];

		for (var i = 0; i < ones.length; i++) {
			if (!isThereAnyRobotNearby (px, py, ones[i])) {
				goodOnes.push(ones[i]);
			}
		}

		// Select random from good routes
		if(goodOnes.length > 0){
			direction = goodOnes[Math.floor(Math.random() * goodOnes.length)];
		}
		// End of looking for "ones" ====================================================================

		// Randomize movement ===========================================================================
		if(direction == 4)
		{
			console.log("Searching for ones: FAILED -> Randomize movement...");
			do {
					// Generating a move
					var nextMoveDirection = generateNextMoveDirection(); // 0, 1, 2, 3
						
					// If it's not a wall
					if (!isItWall(px, py, nextMoveDirection)) {
						// If there isn't any robot
						if (!isThereAnyRobot(px, py, nextMoveDirection)) {			
							// Is againEndlessCycle > 8 -> there's no way to run, must take a risky move
							if (againEndlessCycle > 8) {
								direction = nextMoveDirection;
							} else {
								// If there aren't any robot nearby
								if (!isThereAnyRobotNearby (px, py, nextMoveDirection)) {
									direction = nextMoveDirection;
								} else againEndlessCycle++;
							}
						};
					};
			} while(direction == 4);
		}
		// End of randomize movement ====================================================================
	}

	// Original source code
	$("body").trigger({
		type: "refreshmap",
		name: pname,
		//walk: Math.floor(Math.random()*4)
		walk: direction
	});
}

function getRandomValueFromArray(ones){
	var randomIndex = Math.floor(Math.random() * ones.length);
}

function generateNextMoveDirection(){
	var nextMove = Math.floor(Math.random()*4);
	return nextMove;
}

// If it's wall -> return true
function isItWall(px, py, nextMoveDirection){
	var x = px;
	var y = py;

	if (nextMoveDirection == 0) {y--;};
	if (nextMoveDirection == 1) {x--;};
	if (nextMoveDirection == 2) {y++;};
	if (nextMoveDirection == 3) {x++;};
	
	if (map[y][x] == 9) {
		return true;
	}

	return false;
}

// If there's any robot -> return true
function isThereAnyRobot(px, py, nextMoveDirection){
	var x = px;
	var y = py;

	if (nextMoveDirection == 0) {y--;};
	if (nextMoveDirection == 1) {x--;};
	if (nextMoveDirection == 2) {y++;};
	if (nextMoveDirection == 3) {x++;};

	for (var i = 0; i < 5; i++) {
		var enemy = "m" + i;
		if ((x == players[enemy].x) && (y == players[enemy].y)) {
			return true;
		}
	}

	return false;
}

// If there's any robot nearby -> return true
function isThereAnyRobotNearby(px, py, nextMoveDirection){
	var x = px;
	var y = py;

	if (nextMoveDirection == 0) {y--;};
	if (nextMoveDirection == 1) {x--;};
	if (nextMoveDirection == 2) {y++;};
	if (nextMoveDirection == 3) {x++;};

	for (var i = 0; i < 5; i++) {
		var enemy = "m" + i;
		// Up -> [y-1; x-1] || [y-1; x] || [y-1; x+1]
		if (
			((x - 1 == players[enemy].x) && (y - 1 == players[enemy].y)) ||
			((x == players[enemy].x) && (y - 1 == players[enemy].y)) ||
			((x + 1 == players[enemy].x) && (y - 1 == players[enemy].y))
			) {
			return true;
		}
		// Next -> [y; x-1] || [y; x+1]
		if (
			((x - 1 == players[enemy].x) && (y == players[enemy].y)) ||
			((x + 1 == players[enemy].x) && (y == players[enemy].y))
			) {
			return true;
		}
		// Down -> [y+1; x-1] || [y+1; x] || [y+1; x+1]
		if (
			((x - 1 == players[enemy].x) && (y + 1 == players[enemy].y)) ||
			((x == players[enemy].x) && (y + 1 == players[enemy].y)) ||
			((x + 1 == players[enemy].x) && (y + 1 == players[enemy].y))
			) {
			return true;
		}
	}
	return false;
}