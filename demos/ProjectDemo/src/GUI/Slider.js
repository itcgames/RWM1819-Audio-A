/**
 * @description slider class
 */
class Slider{
  /**
   * @constructor constructor for the slider class
   * @param {Image} sliderImg the image of the slider
   * @param {Float} posX the x position of the slider
   * @param {Float} posY the y position of the slide
   * @param {Float} width the width of the slider
   * @param {Float} height the height of the slider
   * @param {Image} valueIconImg the image of the value icon
   * @param {Float} valuePosX  the value icon x
   * @param {Float} valuePosY the value icon y
   * @param {Float} valueWidth the width of the icon
   * @param {Float} valueHeight the height of the icon
   */
  constructor(sliderImg, posX, posY, width, height, valueIconImg, valuePosX, valuePosY,valueWidth, valueHeight){
    this.sliderImg = sliderImg;
    this.x = posX;
    this.y = posY;
    this.width = width;
    this.height = height;

    this.valueIconImg = valueIconImg;
    this.valueX = valuePosX;
    this.valueY = valuePosY;
    this.valueWidth = valueWidth;
    this.valueHeight = valueHeight;

    this.value = 50;
    this.clicked = false;
    //event listeners for the mouse 
    window.addEventListener("mousedown", this.mouseDown.bind(null, this));
    window.addEventListener("mousemove", this.mouseMove.bind(null, this));
    window.addEventListener("mouseup", this.mouseUp.bind(null, this));
  }
  /**
   * @description update the slider class
   */
  update(){
  }
  /**
   * @description draw the slider
   * @param {CanvasRenderingContext2D} ctx used to draw on the canvas 
   */
  draw(ctx){
    ctx.save()
    ctx.drawImage(this.sliderImg, this.x, this.y, this.width, this.height);
    ctx.drawImage(this.valueIconImg, this.valueX, this.valueY, this.valueWidth, this.valueHeight);
    ctx.restore();
  }
  /**
   * @description detect if the mouse click is within the value icon
   * @param {Float} mX mouse x position 
   * @param {Float} mY mouse y position
   */
  collisionWithMouse(mX,mY){
    if(mX > this.valueX && mX < this.valueX + this.valueWidth && mY > this.valueY && mY < this.valueY + this.valueHeight){
      this.clicked = true;
    }
  }
  /**
   * @description event listener for mouse up
   * @param {Slider} slider our current slider
   * @param {Event} e the event thrown 
   */
  mouseUp(slider,e){
    slider.clicked = false;
  }
   /**
   * @description event listener for mouse down
   * @param {Slider} slider our current slider
   * @param {Event} e the event thrown 
   */
  mouseDown(slider, e){
     slider.collisionWithMouse(e.x,e.y);
  }
   /**
   * @description event listener for mouse movement
   * @param {Slider} slider our current slider
   * @param {Event} e the event thrown 
   */
  mouseMove(slider,e){
    if(slider.clicked === true)
    {
      slider.valueX = e.x - (slider.valueWidth/2);
      if(slider.valueX < slider.x - (slider.valueWidth/2))
      {
        slider.valueX = slider.x -(slider.valueWidth/2);
      }
      else if(slider.valueX > (slider.x + slider.width - (slider.valueWidth/2)))
      {
        slider.valueX = (slider.x + slider.width - (slider.valueWidth/2));
      }
      slider.value = slider.calculateValue();
    }
  }
  /**
   * @description calculate the percentage of the slider the value icon is at 
   */
  calculateValue(){
    var numerator = (this.valueX + (this.valueWidth/2) - this.x);
    var denominator = (this.width);  
    var result = (numerator/denominator);
    return result;
  }
}
