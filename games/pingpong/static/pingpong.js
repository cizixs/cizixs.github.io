var pingpong = {
    scoreA: 0,
    scoreB: 0,
    time: 0,
};

pingpong.pressedKeys = [];

pingpong.ball = {
    speed: 5,
    x: 150,
    y: 100,
    directionX: 1,
    directionY: 1,
}

var KEY = {
    UP: 38,
    DOWN: 40,
    W: 87,
    S: 83,
    SPACE: 32,
};

var STATE = {
    INIT: "INIT",
    RUNNING: "RUNNING",
    STOP: "STOP",
};


var state_tree = {
    "INIT" : "RUNNING",
    "RUNNING" : "STOP",
    "STOP" :    "RUNNING", 
};

var game_state = STATE.INIT;

$(function(){
    //set interval to call gameloop every 40 milliseconds
    pingpong.timer = setInterval(gameloop,40);
    // mark down what key is down and up into an array called "pressedKeys"
    $(document).keydown(function(e){
       pingpong.pressedKeys[e.which] = true;
    });

    $(document).keyup(function(e){
       pingpong.pressedKeys[e.which] = false;
    });
});


function gameloop() {

    if (pingpong.pressedKeys[KEY.SPACE]){
        game_state = state_tree[game_state];
        pingpong.pressedKeys[KEY.SPACE] = false;
    }
    
    if (game_state == STATE.RUNNING){
        $("#msg").html("");
        pingpong.time += 1;
        pingpong.ball.speed = 5 + pingpong.time / 1000;
        movePaddles();
        moveBall();
    }
}

function init_game(x, y, dirX){
        pingpong.ball.x = x;
        pingpong.ball.y = y;
        $("#ball").css({
            "left": pingpong.ball.x,
            "top" : pingpong.ball.y,
        });

        pingpong.ball.directionX = dirX;
        pingpong.ball.speed = 5;
        pingpong.time = 0;

        game_state = STATE.INIT;

        $("#msg").html("Press Space to start.");
}

function movePaddles() {

    var playgroundHeight = parseInt($("#playground").height());
    var paddleHeight = parseInt($("#paddleA").height());

    // use our custom timer to continuously check if a key is
    // pressed.
    if (pingpong.pressedKeys[KEY.UP]) { // arrow-up
    // move the paddle B up 5 pixels
        var top = parseInt($("#paddleB").css("top"));
        $("#paddleB").css("top", Math.max(top-5, 0));
    }
    if (pingpong.pressedKeys[KEY.DOWN]) { // arrow-down
    // move the paddle B down 5 pixels
        var top = parseInt($("#paddleB").css("top"));
        $("#paddleB").css("top",Math.min(top+5, playgroundHeight - paddleHeight));
    }

    if (pingpong.pressedKeys[KEY.W]) { // w move the paddle A up 5 pixels
        var top = parseInt($("#paddleA").css("top"));
        $("#paddleA").css("top", Math.max(top-5, 0));
    }
    if (pingpong.pressedKeys[KEY.S]) { // s move the paddle A down 5 pixels
        var top = parseInt($("#paddleA").css("top"));
        $("#paddleA").css("top",Math.min(top+5, playgroundHeight - paddleHeight));
   }
}

function ball_hit_paddle_top(x, y){
    return false;
    
}

function ball_hit_paddle_bottom(x, y){
    return false;
}


function moveBall() {
    //reference useful variables
    var playgroundHeight = parseInt($("#playground").height());
    var playgroundWidth = parseInt($("#playground").width());
    var radius = parseInt($("#ball").css("border-radius"));

    var ball = pingpong.ball;

    var present_x = ball.x;
    var present_y = ball.y;
    var next_x    = ball.x + ball.speed * ball.directionX;
    var next_y    = ball.y + ball.speed * ball.directionY;


    if (next_x > playgroundWidth)
    {
        //player B lost.
        // reset the ball;
        pingpong.scoreA++;
        $("#scoreA").html(pingpong.scoreA);

        init_game(250, 100, -1);
        return;
    }

    if (next_x < 0)
    {
        // player A lost.
        // reset the ball;
        pingpong.scoreB++;
        $("#scoreB").html(pingpong.scoreB);

        init_game(150, 100, 1);
        return;

    }

    // check playground boundary
    // check bottom edge or paddle up edge
    if (next_y + 2 * radius > playgroundHeight || ball_hit_paddle_top(present_x, present_y))
    {
        ball.directionY = -1;
    }
    // check top edge or paddle bottom edge
    if (next_y < 0 || ball_hit_paddle_bottom(present_x, present_y))
    {
        ball.directionY = 1;
    }

    // check moving paddle here

    // check left paddle
    var paddleAX = parseInt($("#paddleA").css("left")) + parseInt($("#paddleA").css("width"));
    var paddleAYBottom = parseInt($("#paddleA").css("top")) + parseInt($("#paddleA").css("height"));
    var paddleAYTop = parseInt($("#paddleA").css("top"));

    if (next_x < paddleAX && next_x + radius > paddleAX)
    {
        if (next_y + radius <= paddleAYBottom && 
                next_y + radius >= paddleAYTop)
        {
            ball.directionX = 1;
        }
    }
    // check right paddle
    var paddleBX = parseInt($("#paddleB").css("left"));
    var paddleBYBottom = parseInt($("#paddleB").css("top")) + parseInt($("#paddleB").css("height"));
    var paddleBYTop = parseInt($("#paddleB").css("top"));
    if (next_x + 2 * radius > paddleBX && next_x + radius < paddleBX)
    {
        if (next_y + radius <= paddleBYBottom &&
                next_y + radius >= paddleBYTop)
        {
            ball.directionX = -1;
        }
    }

    ball.x += ball.speed * ball.directionX;
    ball.y += ball.speed * ball.directionY;

    // actually move the ball with speed and direction
    $("#ball").css({
        "left" : ball.x,
        "top" : ball.y
    });
}
