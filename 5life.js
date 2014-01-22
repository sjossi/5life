(function(){
var ctx,
    canvas,
    current = [],
    next = [],

    max_x,
    max_y;

var Config = {
    WIDTH: 800,
    HEIGHT: 400,
    GRIDSIZE:  10
};
    
window.addEventListener('load', init, false);

window.addEventListener('mousedown', runLoop, false);

window.requestAnimFrame = (function(){
      return  window.requestAnimationFrame       ||
              window.webkitRequestAnimationFrame ||
              window.mozRequestAnimationFrame    ||
              window.oRequestAnimationFrame      ||
              window.msRequestAnimationFrame     ||
              function(/* function */ callback, /* DOMElement */ element){
                window.setTimeout(callback, 1000 / 60);
              };
})();

function init(){
    canvas = document.getElementById('board');
    ctx = canvas.getContext('2d');

    //resize
    canvas.width = Config.WIDTH;
    canvas.height = Config.HEIGHT;

    max_x = Config.WIDTH/Config.GRIDSIZE;
    max_y = Config.HEIGHT/Config.GRIDSIZE;

    // focus
    canvas.setAttribute('tabindex','0');
    canvas.focus();

    drawGrid();
    generateBoard();

    // initial seed for testing
    //
    current[10][12] = 1;
    current[50][30] = 1;
    current[51][31] = 1;
    current[51][32] = 1;
    current[50][32] = 1;
    current[49][32] = 1;


    console.log('game loaded');

    runLoop();
}


function drawGrid(){
    // horizontal
    for (var y = 0.5, i = Config.HEIGHT; y<=i; y += Config.GRIDSIZE){
        ctx.moveTo(0, y);
        ctx.lineTo(Config.WIDTH, y);
    }

    // vertical
    for (var x = 0.5, i = Config.WIDTH; x<=i; x += Config.GRIDSIZE){
        ctx.moveTo(x, 0);
        ctx.lineTo(x, Config.HEIGHT);
    }

    ctx.lineWidth = '0.2';
    ctx.strokeStyle = 'white';
    ctx.stroke();

    //console.log('grid drawn');
}

function drawBoard(){
// clean up screen before each frame is drawn
 ctx.clearRect(0,0, canvas.width, canvas.height);

 drawGrid();
    for(var i=0;i<max_x;i++){
        for(var j=0;j<max_y;j++){
            if(current[i][j] == 1){
                ctx.beginPath();
                ctx.rect(i*Config.GRIDSIZE, j*Config.GRIDSIZE, Config.GRIDSIZE, Config.GRIDSIZE);
                ctx.fillStyle = 'white';
                ctx.fill();
            }
        }
	}
}

function generateBoard(){
    for(var i = 0;i < max_x;i++){
    current[i] = [];
    next[i] = [];
        for(var j = 0;j < max_y;j++){
		current[i][j] = 0;
		next[i][j] = 0;
	}
    }
}

function checkNeighbors(board, x, y){
	var sum = 0;

	if(x>0 && y>0){
		board[x-1][y-1] == 1 ? sum += 1 : sum +=0;
	}
	if(x<(max_x) && y>0){
		board[x][y-1] == 1 ? sum += 1 :sum +=0;
	}
	if(x<(max_x-1) && y>0){
		board[x+1][y-1] == 1 ? sum += 1:sum +=0;
	}
	if(x>0){
		board[x-1][y] == 1 ? sum += 1 :sum +=0 ;
	}
	if(x<(max_x-1)){
		board[x+1][y] == 1 ? sum += 1:sum +=0;
	}
	if(x>0 && y<(max_y-1)){
		board[x-1][y+1] == 1 ? sum += 1 : sum +=0;
	}
	if(x<(max_x) && y<(max_y-1)){
		board[x][y+1] == 1 ? sum += 1:sum +=0;
	}
	if(x<(max_x-1) && y<(max_y-1)){
		board[x+1][y+1] == 1 ? sum += 1:sum +=0;
	}

	return sum;
}

function isAlive(board, x, y){

	// fix coordinates to array

	var neighbors = checkNeighbors(board,x,y);
	var current = board[x][y];

	// check neighbors
	//
	if(neighbors == 3){
		return true;
	}
	else if (current == 1 && neighbors == 2){
		return true;
	}
	else{
		return false;
	}
}

function applyToNext(current, next, action){
    for(var i = 0;i < max_x;i++){
        for(var j = 0;j < max_y;j++){
            action(i, j);
        }
    }
}

function nextGen(){
    applyToNext(current, next, function(x, y){
	    if(isAlive(current, x, y)){
            next[x][y] = 1;
        }else{
            next[x][y] = 0;
        }
    });
}

function runLoop(){
    // draw	
    drawBoard();

    // calculate next generation
    nextGen();

    // DEBUG draw next gen
    for(var i=0;i<max_x;i++){
            for(var j=0;j<max_y;j++){
        	if(next[i][j] == 1){
        		ctx.beginPath();
        		ctx.rect(i*Config.GRIDSIZE, j*Config.GRIDSIZE, Config.GRIDSIZE, Config.GRIDSIZE);
        		ctx.fillStyle = 'rgba(255,0,0,0.5)';
        		ctx.fill();
        	}
            }
        } 
    
    current = next.slice();

    //window.requestAnimFrame(runLoop(), ctx.canvas);
    //setTimeout(runLoop(),1000);
    //
    console.log('ran loop');
}

})();
