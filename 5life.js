(function(){
var ctx,
    canvas;

var Config = {
    WIDTH: 800,
    HEIGHT: 400,
    GRIDSIZE:  10
};
    
window.addEventListener('load', init, false);

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

    console.log('game loaded');
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

function makegridarray(){
    
}


})();
