import CanvasRenderer from './CanvasRenderer.js';
import ScoreItem from './ScoreItem.js';

export default class Spider extends ScoreItem {
  private speed: number = 0.15;

  public constructor(maxX: number) {
    super(maxX);

    const random: number = Math.random();
    if (random > 0.9) {
      this.image = CanvasRenderer.loadNewImage('./assets/spider01.png');
      this.score = -5;
    } else if (random > 0.7) {
      this.image = CanvasRenderer.loadNewImage('./assets/spider01.png');
      this.score = -3;
    } else if (random > 0.4) {
      this.image = CanvasRenderer.loadNewImage('./assets/spider01.png');
      this.score = -2;
    } else {
      this.image = CanvasRenderer.loadNewImage('./assets/spider01.png');
      this.score = -1;
    }
  }

  /**
   * updates the fruits rendeing on the screen
   * @param elapsed elapsed time from the game
   */
  public override update(elapsed: number): void {
    this.posY += elapsed * 0.1;
  }
}
