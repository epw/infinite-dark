var canvas;
var main_loop;

var keys = {};

var player;

var BOTTOM = 447;

function log (s) {
    $("#log").append ("<div class=\"logentry\">");
    $("#log").append ("<span class=\"logtimestamp\">"
		      + Math.floor((new Date()).getTime() / 1000) + "</span> ");
    $("#log").append (s  + "</div>\n");
}

Player.prototype = new Game_Object;
function Player () {
    Game_Object.call (this, "elf.png", 1,30 , BOTTOM);
    this.speed = 5;
    this.jump_speed = 20;
}
Player.prototype.try_move =
    function (vx, vy) {
	this.x += vx;
	this.y += vy;
	
	if (this.left() < 0 || this.right() > canvas.width
	    || this.top() < 0 || this.bottom() > canvas.height) {
	    this.x -= vx;
	    this.y -= vy;
	}
    };
Player.prototype.update =
    function () {
	if (keys[KEY.LEFT]) {
	    player.try_move (-player.speed, 0);
	}
	if (keys[KEY.RIGHT]) {
	    player.try_move (player.speed, 0);
	}
	if (keys[KEY.UP]) {
	    player.try_move (0, -player.jump_speed);
	}
	if (keys[KEY.DOWN]) {
	    player.try_move (0, player.speed);
	}
	player.apply_gravity();
	Game_Object.prototype.update.call (this);
    };
Player.prototype.apply_gravity =
    function (){
    if(player.y != BOTTOM){
	player.y += 5;
    }
};

Platform.prototype = new Game_Object;
function Platform(){
    Game_Object.call ( this, ctx.fillRect(60,BOTTOM+50,), 1, 60, BOTTOM);
}

function draw () {
    ctx = canvas.getContext ('2d');

    ctx.save ();

    ctx.fillStyle = "rgb(175, 200, 255)";
    ctx.fillRect (0, 0, canvas.width, canvas.height);

    ctx.restore ();

    player.draw (ctx);
}

function update () {
    player.update ();
    
    draw ();
}

function key_press (event) {
    keys[event.which] = true;
    switch (event.which) {
    }
}
function key_release (event) {
    keys[event.which] = false;
    switch (event.which) {
    case KEY.ESCAPE:
	clearInterval (main_loop);
	log ("Stopped");
	break;
    }
}

function init () {
    canvas = document.getElementById("canvas");

    player = new Player ();

    main_loop = setInterval (update, 1000.0 / FRAME_RATE);
}

$(document).ready (init);
$(document).keydown (key_press);
$(document).keyup (key_release);
