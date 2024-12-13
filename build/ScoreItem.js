import CanvasRenderer from './CanvasRenderer.js';
export default class ScoreItem {
    image;
    posX;
    posY;
    score;
    constructor(maxX) {
        this.posX = Math.random() * maxX;
        this.posY = -32;
    }
    getPosX() {
        return this.posX;
    }
    getPosY() {
        return this.posY;
    }
    getWidth() {
        return this.image.width;
    }
    getHeight() {
        return this.image.height;
    }
    getScore() {
        return this.score;
    }
    render(canvas) {
        CanvasRenderer.drawImage(canvas, this.image, this.posX, this.posY);
    }
}
//# sourceMappingURL=ScoreItem.js.map