import { Game } from './GameLoop.js';
import CanvasRenderer from './CanvasRenderer.js';
import KeyListener from './KeyListener.js';
import ScoreItem from './ScoreItem.js';
import Fruit from './Fruit.js';
import Spider from './Spider.js';
import Player from './Player.js';

export default class FruitDrop extends Game {
  private canvas: HTMLCanvasElement;

  private keyListener: KeyListener;

  private items: ScoreItem[];

  private player: Player;

  private score: number;

  private timeLeft: number;

  private timeToNextItem: number;

  public constructor(canvas: HTMLCanvasElement) {
    super();
    this.canvas = canvas;
    this.canvas.height = window.innerHeight;
    this.canvas.width = window.innerWidth;

    this.score = 0;
    this.items = [];
    this.timeLeft = 60 * 1000;
    this.timeToNextItem = Math.random() * 500;

    for (let i: number = 0; i < 10; i++) {
      this.makeItem();
    }
    this.player = new Player(this.canvas.width, this.canvas.height);
  }

  /**
   * Make a new item that falls from the screen.
   */
  private makeItem(): void {
    if (Math.random() > 0.1) {
      this.items.push(new Fruit(this.canvas.width));
    } else {
      this.items.push(new Spider(this.canvas.width));
    }
  }

  /**
   * Process all input. Called from the GameLoop.
   */
  public processInput(): void {
    if (this.keyListener.isKeyDown(KeyListener.KEY_RIGHT)) {
      this.player.moveRight();
    } else if (this.keyListener.isKeyDown(KeyListener.KEY_LEFT)) {
      this.player.moveLeft();
    }
  }

  /**
   * Update game state. Called from the GameLoop
   *
   * @param elapsed time in ms elapsed from the GameLoop
   * @returns true if the game should continue
   */
  public update(elapsed: number): boolean {
    this.timeLeft -= elapsed;

    for (let i: number = 0; i < this.items.length; i++) {
      this.items[i].update(elapsed);
    }
    this.player.update(elapsed);

    this.items = this.items.filter((items: ScoreItem) => {
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

  /**
   * Tests conditions whether game is over. If time left is less than 0
   *
   * @returns True if game is over
   */
  private isGameOver(): boolean {
    return (this.timeLeft < 0);
  }

  /**
   * Render all the elements in the screen.
   */
  public render(): void {
    // Clear the canvas
    CanvasRenderer.clearCanvas(this.canvas);

    for (let i: number = 0; i < this.items.length; i++) {
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
