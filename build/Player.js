import CanvasRenderer from './CanvasRenderer.js';
export default class Player {
    image;
    posY;
    posX;
    maxX;
    speed = 0.4;
    movingLeft = false;
    movingRight = false;
    constructor(canvasWidth, canvasHeight) {
        this.image = CanvasRenderer.loadNewImage('./assets/basket.png');
        this.posX = canvasWidth / 2;
        this.posY = canvasHeight - 100;
        this.maxX = canvasWidth;
    }
    moveLeft() {
        this.movingLeft = true;
    }
    moveRight() {
        this.movingRight = true;
    }
    isCollidingItem(items) {
        return (items.getPosX() + items.getWidth() > this.posX
            && items.getPosX() < this.posX + this.image.width
            && items.getPosY() + items.getHeight() > this.posY
            && items.getPosY() < this.posY + this.image.height);
    }
    update(elapsed) {
        if (this.movingLeft) {
            this.posX -= this.speed * elapsed;
            if (this.posX < 0) {
                this.posX = 0;
            }
            this.movingLeft = false;
        }
        if (this.movingRight) {
            this.posX += this.speed * elapsed;
            if (this.posX + (this.image.width) > this.maxX) {
                this.posX = this.maxX - (this.image.width);
            }
            this.movingRight = false;
        }
    }
    render(canvas) {
        CanvasRenderer.drawImage(canvas, this.image, this.posX, this.posY);
    }
}
//# sourceMappingURL=Player.js.map