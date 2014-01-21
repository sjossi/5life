(function(){
var ctx,
    canvas,
    current = [],
    next = [];

var Config = {
    WIDTH: 800,
    HEIGHT: 400,
    GRIDSIZE:  10
};
    
window.addEventListener('load', init, false);

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

    // focus
    canvas.setAttribute('tabindex','0');
    canvas.focus();

    drawgrid();
    generateboard();

    // initial seed for testing
    //
    current[10][12] = 1;
    current[50][70] = 1;
    current[50][71] = 1;
    current[95][140] = 1;
    current[410][120] = 1;
    current[450][300] = 1;
    current[500][250] = 1;
    

    console.log('game loaded');

    runLoop();
}


function drawgrid(){
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

    console.log('grid drawn');
}

function applytonext(current, next, action){
    for(var i = 0;i < Config.WIDTH;i++){
        for( var j = 0;j < Config.HEIGHT;j++){
		action(next, i, j);
	}
    }
}

function generateboard(){
    for(var i = 0;i < Config.WIDTH;i++){
    current[i] = [];
    next[i] = [];
        for(var j = 0;j < Config.HEIGHT;j++){
		current[i][j] = 0;
		next[i][j] = 0;
	}
    }
}

function isalive(board, x, y){
	var sum = 0;

	if(x>0 && y>0){
		board[x-1][y-1] == 1 ? sum += 1 : sum +=0;
	}
	if(y>0){
		board[x][y-1] == 1 ? sum += 1 :sum +=0;
	}
	if(x<Config.WIDTH && y>0){
		board[x+1][y-1] == 1 ? sum += 1:sum +=0;
	}
	if(x>0){
		board[x-1][y] == 1 ? sum += 1 :sum +=0 ;
	}
	if(x<Config.HEIGHT){
		board[x+1][y] == 1 ? sum += 1:sum +=0;
	}
	if(x>0 && y<Config.HEIGHT){
		board[x-1][y+1] == 1 ? sum += 1 : sum +=0;
	}
	if(y<Config.HEIGHT){
		board[x][y+1] == 1 ? sum += 1:sum +=0;
	}
	if(x<Config.WIDTH && y<Config.HEIGHT){
		board[x+1][y+1] == 1 ? sum += 1:sum +=0;
	}


	// check neighbors
	//
	if(sum == 2 || sum == 3){
		console.log('alive!');
		return true;
	}else{
		console.log('dead!');
		return false;
	}
}

function nextgen(){
    applytonext(current, next, function(cell, x, y){
	    if(isalive(current, x, y)){
    		cell = 1;
	    }
    	});
}

function drawboard(){
    for(var i=0;i<Config.WIDTH;i++){
	    for(var j=0;j<Config.HEIGHT;j++){
		if(current[i][j] == 1){
			ctx.beginPath();
			ctx.rect(i, j, Config.GRIDSIZE, Config.GRIDSIZE);
			ctx.fillStyle = 'white';
			ctx.fill();
		}
	    }
	}
}

function runLoop(){
    // calculate next generation
    nextgen();
    // draw	
    drawboard();

    //window.requestAnimFrame(runLoop(), ctx.canvas);
}

})();
