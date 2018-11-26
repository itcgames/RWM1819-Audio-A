class Button
{
  constructor(id, posX, posY, img, width, height, color)
  {
    var button = document.createElement("button");
    button.style.width = width + 'px';
    button.style.height = height + 'px';
    button.style.left = posX + 'px';
    button.style.top = posY + 'px';
    button.style.background = color;
    button.style.position='absolute';
    button.innerHTML = img;
    button.id = id;
    document.body.appendChild(button);
  }
  setPosition()
  {

  }
  clicked(id, current)
  {
     if(id === "play")
     {
       gameNamespace.audioManager.playAudio(current);
     }
     if(id === "pause")
     {
       gameNamespace.audioManager.pauseAudio(current);
     }
     if(id === "stop")
     {
       gameNamespace.audioManager.stopAudio(current);
     }
     if(id === "mute")
     {
       gameNamespace.audioManager.muteAudio(current);
     }
  }
}
