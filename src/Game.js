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
    //images
    //buttons
    this.playButtonImg =  new Image(50,50);
    this.playButtonImg.src = this.myAssets.data["Images"]["PLAYICON"];
    this.pauseButtonImg = new Image(50,50);
    this.pauseButtonImg.src = this.myAssets.data["Images"]["PAUSEICON"];
    this.stopButtonImg = new Image(50,50);
    this.stopButtonImg.src = this.myAssets.data["Images"]["STOPICON"];
    this.muteButtonImg = new Image(50,50);
    this.muteButtonImg.src = this.myAssets.data["Images"]["MUTEICON"];

    //images for testing 
    this.music1Img = new Image(50,50);
    this.music1Img.src = this.myAssets.data["Images"]["REGGAESONGIMG"];
    this.music2Img = new Image(50,50);
    this.music2Img.src = this.myAssets.data["Images"]["ROCKSONGIMG"];
    this.music3Img = new Image(50,50);
    this.music3Img.src = this.myAssets.data["Images"]["RAPSONGIMG"];
    this.audioSpriteImg = new Image(50,50);
    this.audioSpriteImg.src = this.myAssets.data["Images"]["AUDIOSPRITEICON"];
    //sliders
    this.sliderImg = new Image(50,50);
    this.sliderImg.src = this.myAssets.data["Images"]["SLIDERICON"];
    this.sliderValueImg = new Image(50,50);
    this.sliderValueImg.src = this.myAssets.data["Images"]["VOLUMEICON"];
    //sounds
    this.audioManager.loadSoundFile("Reggae", this.myAssets.data["Audio"]["REGGAESONGAUDIO"]);
    this.audioManager.loadSoundFile("Rock", this.myAssets.data["Audio"]["ROCKSONGAUDIO"]);
    this.audioManager.loadSoundFile("Rap", this.myAssets.data["Audio"]["RAPSONGAUDIO"]);
    //audio sprite sound
    this.audioManager.loadSoundFile("AudioSprite", this.myAssets.data["AudioSpriteExample"]["BUTTONSOUNDEFFECTS"]);
    //event based system sound
    this.audioManager.loadSoundFile("MouseClick", this.myAssets.data["Audio"]["MOUSECLICK"]);
    //GUI
    //Buttons img, id, posX, posY, width, height
    /** @type {Array<Button>} */
    this.buttonArr = [];
    this.buttonArr.push(new Button(this.playButtonImg,100,700,50,50));
    this.buttonArr.push(new Button(this.pauseButtonImg,300,700,50,50));
    this.buttonArr.push(new Button(this.stopButtonImg,500,700,50,50));
    this.buttonArr.push(new Button(this.muteButtonImg,700,700,50,50));

    //testing buttons
    this.buttonArr.push(new Button(this.music1Img,100,100,100,100));
    this.buttonArr.push(new Button(this.music2Img,300,100,100,100));
    this.buttonArr.push(new Button(this.music3Img,500,100,100,100));
    this.buttonArr.push(new Button(this.audioSpriteImg, 800,200,50,50));
    //Sliders sliderImg, valueIconImg, id, posX, posY, width, height
    /** @type {Array<Slider>} */
    this.sliderArr = [];
    this.sliderArr.push(new Slider(this.sliderImg, 100,500,300,30, this.sliderValueImg,225,500 -10,50,50));
    //event based system example
    this.audioManager.eventBasedAudio("mousedown", "MouseClick", false, this.sliderArr[0].value);
    window.addEventListener("mousedown", this.onMouseDown.bind(this));

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
    this.sliderArr.forEach(slider =>{
      slider.update();
    });
    this.updateButtons();
    this.updateSliders();
   
  }

  /**
  * @desc used to draw to the screen
  */
  draw(){
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.buttonArr.forEach(button =>{
      button.draw(this.ctx);
    });
    this.sliderArr.forEach(slider =>{
      slider.draw(this.ctx);
    });
  }
  /**
   * @description what the user makes for their specific needs the button knows when its clicked you tell it what to do when it is
   */
  updateButtons(){
    if(this.buttonArr[0].clicked === true)
    {
      this.audioManager.playAudio(this.currentlySelected, false, this.sliderArr[0].value);
    }
    else if(this.buttonArr[1].clicked === true)
    {
      this.audioManager.pauseAudio(this.currentlySelected);
    }
    else if(this.buttonArr[2].clicked === true)
    {
      this.audioManager.stopAudio(this.currentlySelected,0);
    }
    else if(this.buttonArr[3].clicked === true)
    {
      this.audioManager.muteAudio(this.currentlySelected);
    }
    else if(this.buttonArr[4].clicked === true)
    {
      this.currentlySelected = "Reggae";
    }
    else if(this.buttonArr[5].clicked === true)
    {
      this.currentlySelected = "Rock";
    }
    else if(this.buttonArr[6].clicked === true)
    {
      this.currentlySelected = "Rap";
    }
    else if(this.buttonArr[7].clicked === true)
    {
      this.audioManager.playFromAudioSprite("AudioSprite",false,this.sliderArr[0].value,this.myAssets.data["AudioSpriteExample"]["TIMES"][0]["start"],this.myAssets.data["AudioSpriteExample"]["TIMES"][0]["end"]);
    }
    this.buttonArr.forEach(button =>{
      button.clicked = false;
    });
  }
  /**
   * @description what the user makes for their specific needs the slider knows when its clicked you tell it what to do when it is
   */
  updateSliders(){
    if(this.sliderArr[0].clicked === true){
     this.audioManager.changeVolume(this.sliderArr[0].value);
    }
  }
  /**
   * 
   * @param {Event} e event triggered on mouse down 
   */
  onMouseDown(e){
   gameNamespace.game.audioManager.playEvent("mousedown");
  }
}
    