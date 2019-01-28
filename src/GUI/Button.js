class Button
{
  constructor(img, id, posX, posY, width, height)
  {
    this.img = img;
    this.id = id;
    this.x = posX;
    this.y = posY;
    this.width = width;
    this.height = height;
    this.clicked = false;
    window.addEventListener("mousedown", this.mouseDown.bind(null, this));
  }
  update(mouseX, mouseY){

  }
  draw(ctx){
    ctx.save()
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    ctx.restore();
  }
  collisionWithMouse(mX,mY)
  {
    if(mX > this.x && mX < this.x + this.width && mY > this.y && mY < this.y + this.height){
      this.clicked = true;
    }
  }
  mouseDown(button, e)
  {
    button.collisionWithMouse(e.x,e.y);
  }

}
