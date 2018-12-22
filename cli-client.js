const Coordinate = require('./coordinate.js')
const Minesweeper = require('./minesweeper.js');
const GameState = require('./enum.js');

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });

let ms = new Minesweeper({width: 5, height: 5, mines: 5});

function gameLoop() {
    gameState();
    if (ms.isGameOver())
        process.exit(0);
    readline.question('x:', answer_x => {
        console.log('in x');
        readline.question('y:', answer_y => {
            console.log('in y');
            let x = parseInt(answer_x);
            let y = parseInt(answer_y);
            ms.reveal(new Coordinate(x, y));
            gameLoop();
        });
    });
}

function gameState() {
    console.log(ms.toString());
    console.log('Time: ' + ms.duration);
    console.log('Status: ' + GameState.toString(ms.state));
}

gameLoop();