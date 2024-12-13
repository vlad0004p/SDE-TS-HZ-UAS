import CanvasRenderer from './CanvasRenderer.js';

export default abstract class ScoreItem {
  protected image: HTMLImageElement;

  protected posX: number;

  protected posY: number;

  protected score: number;

  public constructor(maxX: number) {
    this.posX = Math.random() * maxX;
    this.posY = -32;
  }

  public abstract update(elapsed: number): void;

  public getPosX(): number {
    return this.posX;
  }

  public getPosY(): number {
    return this.posY;
  }

  public getWidth(): number {
    return this.image.width;
  }

  public getHeight(): number {
    return this.image.height;
  }

  public getScore(): number {
    return this.score;
  }

  /**
   * renders the images of the score items on the screen
   * @param canvas it's just the canvas
   */
  public render(canvas: HTMLCanvasElement): void {
    CanvasRenderer.drawImage(canvas, this.image, this.posX, this.posY);
  }
}
