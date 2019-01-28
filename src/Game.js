class Game
{
  /**
   * @desc constructor for the game class
   */
  constructor(){

    this.canvas = new Canvas("canvas");
    this.ctx = canvas.getContext("2d");
    this.audioManager = new AudioManager();
    this.myAssets = new AssetLoader();
  }
  /**
  * initWorld
  * @desc Initialises game world
  */
  initWorld(){

    console.log("Initialising game world");
    //mouse position
    this.mouseX = -100;
    this.mouseY = 100;

    //buttons
    this.playButton;
    //images
    this.wed;
    this.playButtonImg =  new Image(50,50);
    this.playButtonImg.src = this.myAssets.data["Images"]["PLAYICON"];
    this.pauseButtonImg = new Image(50,50);
    this.pauseButtonImg.src = this.myAssets.data["Images"]["PAUSEICON"];
    this.stopButtonImg = new Image(50,50);
    this.stopButtonImg.src = this.myAssets.data["Images"]["STOPICON"];
    this.muteButtonImg = new Image(50,50);
    this.muteButtonImg.src = this.myAssets.data["Images"]["MUTEICON"];
    //sounds
    this.audioManager.loadSoundFile("Rock", this.myAssets.data["Audio"]["ROCKSONGAUDIO"]);
    this.audioManager.loadSoundFile("Rap", this.myAssets.data["Audio"]["RAPSONGAUDIO"]);
    this.audioManager.loadSoundFile("Reggae", this.myAssets.data["Audio"]["REGGAESONGAUDIO"]);
    //GUI
    //Buttons img, id, posX, posY, width, height
    this.buttonArr = [];
    this.buttonArr.push(new Button(this.playButtonImg, "PLAYBUTTON",100,700,50,50));
    this.buttonArr.push(new Button(this.pauseButtonImg, "PAUSEBUTTON",300,700,50,50));
    this.buttonArr.push(new Button(this.stopButtonImg, "STOPBUTTON",500,700,50,50));
    this.buttonArr.push(new Button(this.muteButtonImg, "MUTEBUTTON",700,700,50,50));


    this.gameLoop();
  }
  /**
   * @desc gameloop to continuously call the update and draw functions
   */
  gameLoop(){
  
   this.update();
   this.draw();
   
   /** Use bind function to keep the 'this' context throughout loop usage */
   window.requestAnimationFrame(this.gameLoop.bind(this));
  }

  /**
  * update
  * @desc calls draw and itself recursively also updates animations
  */
  update(){
    this.buttonArr.forEach(button =>{
      button.update();
    });
    this.updateButtons();
   
  }

  /**
  * @desc used to draw to the screen
  */
  draw(){
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.buttonArr.forEach(button =>{
      button.draw(this.ctx);
    });
  }
  updateButtons()
  {
    if(this.buttonArr[0].clicked === true)
    {
      this.audioManager.playAudio("Reggae", false, 1.0);
    }
    else if(this.buttonArr[1].clicked === true)
    {
      this.audioManager.pauseAudio("Reggae");
    }
    else if(this.buttonArr[2].clicked === true)
    {
      this.audioManager.stopAudio("Reggae");
    }
    else if(this.buttonArr[3].clicked === true)
    {
      this.audioManager.muteAudio("Reggae");
    }
    this.buttonArr.forEach(button =>{
      button.clicked = false;
    });
  }

}
    