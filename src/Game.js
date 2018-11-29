class Game
{
  constructor()
  {
    //used for JSON loading
    this.canvas = null;
    this.dataLoaded = false;
    this.myAssets = new AssetLoader();
  }
    /**
  * initWorld
  * @desc Initialises game world
  */
  initWorld()
  {
    gameNamespace.ctx;
    gameNamespace.game.initCanvas();
    console.log("Initialising game world");

    gameNamespace.audioManager = new AudioManager();
    //overall volume
    gameNamespace.volume = 0.5;
    //sound Images
    gameNamespace.currentlySelectedImg = "";
    this.createDiv("<img src=" + gameNamespace.game.myAssets.data["Images"]["RAPSONGIMG"] + ">","RapImg",50,50,true);
    this.createDiv("<img src=" + gameNamespace.game.myAssets.data["Images"]["ROCKSONGIMG"] + ">","RockImg",400,50,true);
    this.createDiv("<img src=" + gameNamespace.game.myAssets.data["Images"]["REGGAESONGIMG"] + ">","ReggaeImg",750,50,true);
    //sound audio
    gameNamespace.currentlySelectedSound = "";
    gameNamespace.RapAudio = new Audio(gameNamespace.game.myAssets.data["Audio"]["RAPSONGAUDIO"]);
    gameNamespace.RockAudio = new Audio(gameNamespace.game.myAssets.data["Audio"]["ROCKSONGAUDIO"]);
    gameNamespace.ReggaeAudio = new Audio(gameNamespace.game.myAssets.data["Audio"]["REGGAESONGAUDIO"]);


    //GUI
    //Buttons id, posX, posY, img, width, height
    //will implement images when ive nicer sprites
    gameNamespace.playButton = new Button("play", 150,400, "PLAY",100,100, "blue");
    document.getElementById("play").addEventListener("click", function(){gameNamespace.playButton.clicked("play",gameNamespace.currentlySelectedSound);});

    gameNamespace.muteButton = new Button("mute", 600,400, "MUTE",100,100, "purple");
    document.getElementById("mute").addEventListener("click", function(){gameNamespace.muteButton.clicked("mute",gameNamespace.currentlySelectedSound);});

    gameNamespace.pauseButton = new Button("pause", 300,400, "PAUSE",100,100, "yellow");
    document.getElementById("pause").addEventListener("click", function(){gameNamespace.pauseButton.clicked("pause",gameNamespace.currentlySelectedSound);});

    gameNamespace.stopButton = new Button("stop", 450,400, "STOP",100,100, "red");
    document.getElementById("stop").addEventListener("click", function(){gameNamespace.stopButton.clicked("stop",gameNamespace.currentlySelectedSound);});
    //Slider id, width, height, posX, posY
    gameNamespace.volumeSlider = new Slider("volume", 250,50,300,550,"<img src=" + gameNamespace.game.myAssets.data["Images"]["VOLUMEICON"] + ">" );
    document.getElementById("volume").addEventListener("click", function(){gameNamespace.volumeSlider.changed("volume");});



    gameNamespace.game.update();
  }
  /**
 * update
 * @desc calls draw and itself recursively also updates animations
 */
 update()
 {
   //draws to screen
   gameNamespace.game.draw();
   //recursively calls update of game : this method
   window.requestAnimationFrame(gameNamespace.game.update);
 }
 draw()
 {

 }
  createDiv(divType,divID,divPosX,divPosY,clickable)
  {
    var div = document.createElement("div");
    div.innerHTML = divType;
    div.id = divID;
    div.style.left=divPosX + 'px';
    div.style.top=divPosY+ 'px';
    div.style.position='absolute';
    if(clickable === true)
    {
      div.addEventListener("click", gameNamespace.game.clicked.bind(null,divID));
    }
    else {
       div.style.pointerEvents = "none";
    }
    document.body.appendChild(div);
  }

  initCanvas()
  {
    gameNamespace.canvas = document.createElement("canvas");
    gameNamespace.canvas.id = "canvas";
    gameNamespace.canvas.width = window.innerWidth;
    gameNamespace.canvas.height = window.innerHeight;
    document.body.appendChild(gameNamespace.canvas);
    gameNamespace.ctx = gameNamespace.canvas.getContext("2d");
  }

  clicked(id,e)
  {
    e.preventDefault();
    if("RapImg" === id)
    {
      document.getElementById("RockImg").style.borderStyle = "none";
      document.getElementById("ReggaeImg").style.borderStyle = "none";
      gameNamespace.audioManager.stopAudio(gameNamespace.RockAudio);
      gameNamespace.audioManager.stopAudio(gameNamespace.ReggaeAudio);

      document.getElementById("RapImg").style.borderStyle = "solid";
      gameNamespace.currentlySelectedImg = "RapImg";
      gameNamespace.currentlySelectedSound = gameNamespace.RapAudio;
    }
    if("RockImg" === id)
    {
      document.getElementById("ReggaeImg").style.borderStyle = "none";
      document.getElementById("RapImg").style.borderStyle = "none";
      gameNamespace.audioManager.stopAudio(gameNamespace.RapAudio);
      gameNamespace.audioManager.stopAudio(gameNamespace.ReggaeAudio);

      document.getElementById("RockImg").style.borderStyle = "solid";
      gameNamespace.currentlySelectedImg = "RockImg";
      gameNamespace.currentlySelectedSound = gameNamespace.RockAudio;
    }
    if("ReggaeImg" === id)
    {
      document.getElementById("RapImg").style.borderStyle = "none";
      document.getElementById("RockImg").style.borderStyle = "none";
      gameNamespace.audioManager.stopAudio(gameNamespace.RockAudio);
      gameNamespace.audioManager.stopAudio(gameNamespace.RapAudio);

      document.getElementById("ReggaeImg").style.borderStyle = "solid";
      gameNamespace.currentlySelectedImg = "ReggaeImg";
      gameNamespace.currentlySelectedSound = gameNamespace.ReggaeAudio;
    }
  }
}
