// Globals
var player = document.getElementById("player");
var playerX = 7;
var playerY = 7;
var moveVertical = false;
let tileSize = 65;
let activeMoves = {
	left: 0,
  right: 0,
  up: 0,
  down: 0,
}

document.onkeydown = keyDown;
document.onkeyup = keyUp;

function keyDown(e) {
  e = e || window.event;
  if (e.keyCode == '38') {
    if(!activeMoves.up) { 
      activeMoves.up = 1;
      moveVertical = true;
    }
  }
  else if (e.keyCode == '40') {
    if(!activeMoves.down) {
      activeMoves.down = 1;
      moveVertical = true;
    }
  }
  else if (e.keyCode == '37') {
    if(!activeMoves.left) {
      activeMoves.left = 1;
      moveVertical = false;
    }
  }
  else if (e.keyCode == '39') {
    if(!activeMoves.right) {
      activeMoves.right = 1;
      moveVertical = false;
    }
  }
  e.preventDefault();
}

function keyUp(e) {
  e = e || window.event;
  if (e.keyCode == '38') {
    activeMoves.up = 0;
    moveVertical = false;
  }
  else if (e.keyCode == '40') {
    activeMoves.down = 0;
    moveVertical = false;
  }
  else if (e.keyCode == '37') {
    activeMoves.left = 0;
    moveVertical = true;
  }
  else if (e.keyCode == '39') {
    activeMoves.right = 0;
    moveVertical = true;
  }
  e.preventDefault();
}

function playerCanMove(direction){
	switch(direction) {
  	case "up":
    	return activeMoves.up && !(playerY-tileSize <= 0);
    	break;
    case "down":
    	return activeMoves.down && !(playerY+tileSize >= window.innerHeight);
      break;
    case "left":
    	return activeMoves.left && !(playerX-tileSize <= 0);
      break;
    case "right":
    	return activeMoves.right && !(playerX+tileSize >= window.innerWidth);
      break;
    default:
    	throw TypeError(`${direction} is not a valid direction for playerCanMove!`);
    	break;
  }
}

setInterval(() => {
	if(!playerCanMove("up") && !playerCanMove("down")) moveVertical = false;
  if(!playerCanMove("left") && !playerCanMove("right")) moveVertical = true;
  

	if(!moveVertical) {
    player.style.left = (playerCanMove("right") ? playerX+=tileSize : playerX)+"px";
    player.style.left = (playerCanMove("left") ? playerX-=tileSize : playerX)+"px";
  } else {
    player.style.top = (playerCanMove("up") ? playerY-=tileSize : playerY)+"px";
   	player.style.top = (playerCanMove("down") ? playerY+=tileSize : playerY)+"px";
  }

  moveVertical = !moveVertical;
}, 300);
