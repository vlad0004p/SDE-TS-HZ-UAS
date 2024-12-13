import { Game } from './GameLoop.js';
import CanvasRenderer from './CanvasRenderer.js';
import KeyListener from './KeyListener.js';
import Fruit from './Fruit.js';
import Spider from './Spider.js';
import Player from './Player.js';
export default class FruitDrop extends Game {
    canvas;
    keyListener;
    items;
    player;
    score;
    timeLeft;
    timeToNextItem;
    constructor(canvas) {
        super();
        this.canvas = canvas;
        this.canvas.height = window.innerHeight;
        this.canvas.width = window.innerWidth;
        this.score = 0;
        this.items = [];
        this.timeLeft = 60 * 1000;
        this.timeToNextItem = Math.random() * 500;
        for (let i = 0; i < 10; i++) {
            this.makeItem();
        }
        this.player = new Player(this.canvas.width, this.canvas.height);
    }
    makeItem() {
        if (Math.random() > 0.1) {
            this.items.push(new Fruit(this.canvas.width));
        }
        else {
            this.items.push(new Spider(this.canvas.width));
        }
    }
    processInput() {
        if (this.keyListener.isKeyDown(KeyListener.KEY_RIGHT)) {
            this.player.moveRight();
        }
        else if (this.keyListener.isKeyDown(KeyListener.KEY_LEFT)) {
            this.player.moveLeft();
        }
    }
    update(elapsed) {
        this.timeLeft -= elapsed;
        for (let i = 0; i < this.items.length; i++) {
            this.items[i].update(elapsed);
        }
        this.player.update(elapsed);
        this.items = this.items.filter((items) => {
            if (this.player.isCollidingItem(items)) {
                this.score += items.getScore();
                return false;
            }
            return (items.getPosY() < this.canvas.height);
        });
        this.timeToNextItem -= elapsed;
        if (this.timeToNextItem < 0) {
            this.makeItem();
            this.timeToNextItem = Math.random() * 200;
        }
        return !this.isGameOver();
    }
    isGameOver() {
        return (this.timeLeft < 0);
    }
    render() {
        CanvasRenderer.clearCanvas(this.canvas);
        for (let i = 0; i < this.items.length; i++) {
            this.items[i].render(this.canvas);
        }
        this.player.render(this.canvas);
        CanvasRenderer.writeText(this.canvas, `Score: ${this.score}`, 10, 45, 'left', 'Ariel', 32, 'white');
        CanvasRenderer.writeText(this.canvas, `Time: ${this.timeLeft}`, 10, 45, 'left', 'Ariel', 32, 'white');
        if (this.isGameOver()) {
            CanvasRenderer.writeText(this.canvas, 'Game Over', this.canvas.width / 2, this.canvas.height / 2, 'center', 'Arial', 60, 'cyan');
        }
    }
}
//# sourceMappingURL=FruitDrop.js.map