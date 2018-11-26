class AudioManager
{
	constructor()
	{

	}
	playAudio(current)
  {
		current.play();
  }
	pauseAudio(current)
	{
		current.pause();
	}
	stopAudio(current)
	{
		current.pause();
		current.currentTime = 0;
	}
	muteAudio(current)
	{
		if(current.muted === true)
		{
			current.muted = false;
		}
		else
		{
			current.muted = true;
		}
	}
}
