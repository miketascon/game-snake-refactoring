import Snake from './Snake.js';
import Square from "./Square";


export default class {


    constructor(idCanvasElement, standardSize) {
        this.myCanvas = document.getElementById(idCanvasElement);
        this.context = myCanvas.getContext('2d');
        this.SIZE = standardSize;
        this.food = null;
        this.snake = new Snake();
        this.dx = 0;
        this.dy = 0;
        this.lastAxis; // position x, y
        document.addEventListener('keydown', this.moveSanke.bind(this)); // bind hace referencia a que this sea usado por la clase y no por el metodo que se le pasa el evento
    }


    update() {

        if (this.snakeHasCollided()) {
            this.gameOver();
            return;
        }

        //salvar la posisción previa de la serpiente
        const lastElemen = this.snake.getLastElement();
        let prevX = lastElemen.x;
        let prevY = lastElemen.y;

        this.snake.move(this.dx, this.dy);
        // determina en que eje ocurrio el último movivmiento
        if (this.dx !== 0) {
            this.lastAxis = 'X';
        } else if (this.dy !== 0) {
            this.lastAxis = 'Y';
        }

        // dectar si ha consumido alimento del

        if (this.food && this.snake.head.checkCollision(this.food)) {
            this.food = null;
            // aumentar el tamaño de la serpiente
            this.snake.addElement(new Square(prevX, prevY));
        }

        // genera el alimento en casos de que no exista
        if (!this.food) {
            this.generateFood();
        }
    }

    gameOver() {
        alert('You lose');
        this.dx = 0;
        this.dy = 0;
        this.snake.reset()
    }

    snakeHasCollided() {
        // coordenadas de la cabeza sean igual a un elemento del cuerpo de la swerpiente
        if (this.snake.hasCollided()) {
            return true;
        }

        if (this.snake.hasBrokenTheLimit(this.myCanvas.width - this.SIZE, 0, 0, this.myCanvas.height - this.SIZE)) {
            return true;
        }

        return false;
    }

    generateFood() {
        do {
            this.food = new Square(this.getRandomX(), this.getRandomY());
        } while (this.snake.checkFullCollision(this.food))
    }

    getRandomX() {
        console.log(this.SIZE);
        return this.SIZE * parseInt(Math.random() * 20);
    }

    getRandomY() {
        return this.SIZE * parseInt(Math.random() * 23);
    }


    draw() {

        // definir fondo
        this.context.fillStyle = 'black'
        this.context.fillRect(0, 0, this.myCanvas.width, this.myCanvas.height)
        // cabeza
        this.drawObject(this.snake.head, 'lime');
        //Cuerpo
        this.snake.body.forEach(elem => this.drawObject(elem, 'lime'));
        //ALIMENTO
        this.drawObject(this.food, 'white');
    }

    drawObject(obj, color) {
        this.context.fillStyle = color
        this.context.fillRect(obj.x, obj.y, this.SIZE, this.SIZE);
    }




    moveSanke(event) {
        switch (event.key) {
            case 'ArrowUp':
                if (this.lastAxis !== 'Y') {
                    this.dx = 0;
                    this.dy = -this.SIZE;
                    console.log('Mover hacia arriba');
                }
                break;
            case 'ArrowDown':
                if (this.lastAxis !== 'Y') {
                    this.dx = 0;
                    this.dy = +this.SIZE;
                    console.log('Mover hacia abajo');
                }
                break;
            case 'ArrowRight':
                if (this.lastAxis !== 'X') {
                    this.dx = +this.SIZE;
                    this.dy = 0;
                    console.log('Mover hacia la derecha');
                }
                break;
            case 'ArrowLeft':
                if (this.lastAxis !== 'X') {
                    this.dx = -this.SIZE;
                    this.dy = 0;
                    console.log('Mover hacia la izquierda');
                }
                break;
        }
    }

}