import Square from "./Square";

export default class {
    constructor() {
        this.head = new Square(0, 0);
        this.body = [];
    }



    hasCollided() {
        for (let i = 0; i < this.body.length; i++) {
            if (this.body[i].checkCollision(this.head)) {
                return true;
            }
        }
    }





    move(dx, dy) {
        // el cuerpo siga la cabeza de la serpiente
        for (let i = this.body.length - 1; i >= 1; --i) {
            this.body[i].x = this.body[i - 1].x;
            this.body[i].y = this.body[i - 1].y;
        }
        if (this.body.length) {
            this.body[0].x = this.head.x;
            this.body[0].y = this.head.y;
        }

        // metodo update se encarga de actualizar las cordenadas this.head
        this.head.move(dx, dy)
    }

    addElement(element) {
        this.body.push(element)
    }

    getLastElement() {
        if (this.body.length >= 1) {
            return this.body[this.body.length - 1];
        } else {
            return this.head;
        }
    }


    hasBrokenTheLimit(x1, x2, y1, y2) {
        const topCollision = (this.head.y < y1);
        const bottonCollision = (this.head.y > y2);
        const rightCollision = (this.head.x > x1);
        const leftCollision = (this.head.x < x2)
        // verificar que la  no se salga de los limites permitidos
        if (topCollision || bottonCollision || leftCollision || rightCollision) {
            return true;
        }
    }

    reset() {
        this.head.x = 0;
        this.head.y = 0;
        this.body.length = 0;
    }


    checkFullCollision(position) {
        for (let i = 0; i < this.body.length; ++i) {
            if (this.body[i].checkCollision(position)) {
                return true;
            }
        }

        // comparar las coordenadas del alimento con la cabeza de la serpiente
        if (this.head.checkCollision(position)) {
            return true;
        }

        return false;
    }
}