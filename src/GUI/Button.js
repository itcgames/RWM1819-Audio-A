/**
 * @description button class used for audio controls
 */
class Button
{
  /**
   * @constructor for the button class
   * @param {Image} img to use for the button   
   * @param {Float} posX x position of the button
   * @param {Float} posY y position of the button
   * @param {Float} width of the image 
   * @param {Float} height of the image 
   */
  constructor(img, posX, posY, width, height){
    this.img = img;
    this.x = posX;
    this.y = posY;
    this.width = width;
    this.height = height;
    this.clicked = false;
    //detects mouse click
    window.addEventListener("mousedown", this.mouseDown.bind(null, this));
  }
  /**
   * @description used to update button class
   */
  update(){

  }
  /**
   * @description used to draw the buttons
   * @param {CanvasRenderingContext2D} ctx use to draw images on canvas 
   */
  draw(ctx){
    ctx.save()
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    ctx.restore();
  }
  /**
   * @description when mouse down is detected this function checks if we are colliding with the button
   * @param {Float} mX mouse x position 
   * @param {Float} mY mouse y position
   */
  collisionWithMouse(mX,mY){
    if(mX > this.x && mX < this.x + this.width && mY > this.y && mY < this.y + this.height){
      this.clicked = true;
    }
  }
  /**
   * @description event listener for when the mouse is pressed 
   * @param {Button} button the button that has possibly been clicked
   * @param {Event} e the event itself 
   */
  mouseDown(button, e){
    button.collisionWithMouse(e.x,e.y);
  }

}
