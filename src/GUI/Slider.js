class Slider
{
  constructor(id, width, height, posX, posY)
  {
    var slider = document.createElement("INPUT");
    slider.setAttribute("type", "range");
    slider.min = 0;
    slider.max = 100;
    slider.style.width = width + 'px';
    slider.style.height = height + 'px';
    slider.style.left = posX + 'px';
    slider.style.top = posY + 'px';
    slider.style.position='absolute';
    slider.id = id;
    slider.defaultValue = 50;
    document.body.appendChild(slider);
  }
  changed(id)
  {
    var value = document.getElementById(id).value/100;
    gameNamespace.volume = parseFloat(value);

    gameNamespace.RapAudio.volume = gameNamespace.volume;
    gameNamespace.RockAudio.volume = gameNamespace.volume;
    gameNamespace.ReggaeAudio.volume = gameNamespace.volume;
  }
}
