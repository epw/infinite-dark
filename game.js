var canvas;
var main_loop;

var keys = {};

var player;

function log (s) {
    $("#log").append ("<div class=\"logentry\">");
    $("#log").append ("<span class=\"logtimestamp\">"
		      + Math.floor((new Date()).getTime() / 1000) + "</span> ");
    $("#log").append (s  + "</div>\n");
}

Player.Inherits (Game_Object);
function Player () {
    Inherit (this, Game_Object, "sphere.png", 1, 40, 40);
    this.speed = 5;
}
Player.def ("try_move",
	  function (vx, vy) {
	      this.x += vx;
	      this.y += vy;

	      if (this.left() < 0 || this.right() > canvas.width
		  || this.top() < 0 || this.bottom() > canvas.height) {
		  this.x -= vx;
		  this.y -= vy;
	      }
	  });
Player.def ("update",
	    function () {
		this.parent ("update");
		if (keys[KEY.LEFT]) {
		    player.try_move (-player.speed, 0);
		}
		if (keys[KEY.RIGHT]) {
		    player.try_move (player.speed, 0);
		}
		if (keys[KEY.UP]) {
		    player.try_move (0, -player.speed);
		}
		if (keys[KEY.DOWN]) {
		    player.try_move (0, player.speed);
		}
	    });

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
