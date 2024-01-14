let board;
let boardWidth = 650
let boardHeight = 750
let context;

//player
let playerWidth = 100;
let playerHeight = 12;
let playerVeloX = 5;
let PlayerSpeed = 0;


let player = {
    x : boardWidth/2 - playerWidth/2,
    y: boardWidth - playerWidth + 120,
    width : playerWidth,
    height : playerHeight,
    veloX : playerVeloX,
    speed : PlayerSpeed
}

//ball
let ballWidth = 10;
let ballHeight = 10;
let ballVeloX = 4;
let ballVeloY = 3;

let ball = {
    x : boardWidth/2,
    y : boardHeight/2,
    width : ballWidth,
    height : ballHeight,
    veloX : ballVeloX,
    veloY : ballVeloY
}

let blockArray = [];
let blockWidth = 50;
let blockHeight = 20;
let blockColumns = 10;
let blockRows = 6;

let blockX = 25;
let blockY = 35;

let points = 0;

window.onload = function() {
    board = document.getElementById("board");
    board.width = boardWidth;
    board.height = boardHeight;
    context = board.getContext("2d"); 
    context.fillStyle = "rgb(22, 148, 217)";
    context.fillRect(player.x, player.y, player.width, player.height); 

    requestAnimationFrame(update);
    addEventListener("keydown", keydown);
    addEventListener("keyup", keyup);
    createBlocks();
}

const roundRect = (ctx, x, y, width, height, radius, fill, stroke) => {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.arcTo(x + width, y, x + width, y + height, radius);
    ctx.arcTo(x + width, y + height, x, y + height, radius);
    ctx.arcTo(x, y + height, x, y, radius);
    ctx.arcTo(x, y, x + width, y, radius);
    ctx.closePath();

    if (fill) {
        ctx.fill();
    }

    if (stroke) {
        ctx.stroke();
    }
}

const update = () => {
    requestAnimationFrame(update);
    context.clearRect(0, 0, board.width, board.height);
    context.fillStyle = "rgb(158, 215, 24)";
    context.fillRect(player.x, player.y, player.width, player.height);
    
    const borderRadius = 6;
    context.fillStyle = "white";
    roundRect(context, ball.x, ball.y, ball.width, ball.height, borderRadius, true, false);

    ball.x += ball.veloX;
    ball.y += ball.veloY;


    context.fillStyle = "white";
    context.font = "20px Arial";
    context.fillText("Points: " + points, 15, 25);

    //ball col chek

    if (ball.y <= 0) {
        console.log(1);
        ball.veloY *= -1;
    }
    else if (ball.x <= 0 || (ball.x + ball.width) >= boardWidth) {
        ball.veloX *= -1;
        console.log(2);
    }
    else if (ball.y + ball.height >= boardHeight) {
        window.alert("game over");
        ball.x = 0;
        ball.y = 0;
        location.reload();
        console.log(3);
    }
    if (topCol(ball, player)) {
        ball.veloY *= -1;
    }

    context.fillStyle = "rgb(255, 0, 0)";
    for (let i = 0; i < blockArray.length; i++) {
        let block = blockArray[i];
        if (!block.break) {
            if (topCol(ball,block)) {
                block.break = true;
                ball.veloY *= -1;
                points += 100
            }
            context.fillRect(block.x, block.y, block.width, block.height);
        }
    }

    player.x += player.speed;

}

const outOfBox = (xPos) => {
    return (xPos < 0 || xPos + playerWidth > boardWidth);
}

const keydown = (e) => {
    if (e.code == "ArrowLeft") {
       player.speed = (playerVeloX * -1);
    }
    else if (e.code == "ArrowRight") {
        player.speed = playerVeloX
    }
}
const keyup = (e) => {
    player.speed = 0
}


const detectCol = (a, b) => {
    return a.x < b.x + b.width &&
        a.x + a.width > b.x &&
        a.y < b.y + b.height &&
        a.y + a.height > b.y;
}

const topCol = (ball, block) => {
    return detectCol(ball, block) && (ball.y + ballHeight) >= block.y;
}

const createBlocks = () => {
    blockArray = [];
    for (let c = 0; c < blockColumns; c++) {
        for (let r = 0; r < blockRows; r++) {
            let block = {
                x : blockX + c*blockWidth + c*10,
                y : blockY + r*blockWidth,
                width : blockWidth,
                height : blockHeight,
                break : false
            }
            blockArray.push(block);
        }
    }
    blockCount = blockArray.length;
}