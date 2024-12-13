import CanvasRenderer from './CanvasRenderer.js';
import ScoreItem from './ScoreItem.js';

export default class Player {
  private image: HTMLImageElement;

  private posY: number;

  private posX: number;

  private maxX: number;

  private speed: number = 0.4;

  private movingLeft: boolean = false;

  private movingRight: boolean = false;

  public constructor(canvasWidth: number, canvasHeight: number) {
    this.image = CanvasRenderer.loadNewImage('./assets/basket.png');
    this.posX = canvasWidth / 2;
    this.posY = canvasHeight - 100;
    this.maxX = canvasWidth;
  }

  /**
   * moves the basket left
   */
  public moveLeft(): void {
    this.movingLeft = true;
  }

  /**
   * moves the basket right
   */
  public moveRight(): void {
    this.movingRight = true;
  }

  /**
   * does the collision
   * @param items are the score items
   * @returns the positions of the collision
   */
  public isCollidingItem(items: ScoreItem): boolean {
    return (items.getPosX() + items.getWidth() > this.posX
      && items.getPosX() < this.posX + this.image.width
      && items.getPosY() + items.getHeight() > this.posY
      && items.getPosY() < this.posY + this.image.height);
  }

  /**
   * updates the position of the player
   * @param elapsed players's speed
   */
  public update(elapsed: number): void {
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

  /**
   * draws the player on the canvas
   * @param canvas is the canvas
   */
  public render(canvas: HTMLCanvasElement): void {
    CanvasRenderer.drawImage(canvas, this.image, this.posX, this.posY);
  }
}
