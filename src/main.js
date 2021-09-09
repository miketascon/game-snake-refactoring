import Game from './Game.js';


const game = new Game('myCanvas', 20);

setInterval(main, 200); // 1000ms = 1s

function main() {
    game.update(); // actualiza las variables del juegon 
    game.draw(); // dibuja los objetos del juego
}


