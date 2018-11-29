class AudioManager
{
	constructor()
	{
		//an object to hold a name for each sound and its associated buffer (memory holding the sound)
		this.audioBuffers={}
	  //Required for managing and for playing any sound.
		this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
		this.gainNode = this.audioContext.createGain();
		//stores value for previous volume
		this.previousVol = 0.0;

	init()
	{
		try
		{
				// Fix up for prefixing
				window.AudioContext = window.AudioContext||window.webkitAudioContext;
				this.audioContext = new AudioContext();
		}
		catch(e)
		{
				alert('Web Audio API is not supported in this browser');
		}
	}

	playAudio(name, loop, volume)
  {
		if(this.audioBuffers[name] == undefined)
	  {
	    console.log("Sound '"+name+"' doesn't exist or hasn't been loaded")
	    return;
	  }
	  //retrieve the buffer we stored earlier
	  var audioBuffer = this.audioBuffers[name];

	  //create a buffer source - used to play once and then a new one must be made
	  var source = this.audioContext.createBufferSource();
		this.source = source;
	  source.buffer = audioBuffer;

	  source.loop = isLoop;

		//source.connect(this.audioContext.destination);
		this.gainNode = this.audioContext.createGain();
		source.connect(this.gainNode);
	  this.gainNode.connect(this.audioContext.destination);
		changeVolume(volume);
	  source.start(0); // Play immediately.

  }
	changeVolume(volume)
	{
		if(volume < 0.0)
		{
			this.gainNode.gain.value = 0.0;
		}
		else if(volume > 1.0) {
			this.gainNode.gain.value = 1.0;
		}
		else {
			this.gainNode.gain.value = volume;
		}

		this.previousVol = this.gainNode.gain.value;
	}
	pauseAudio(current)
	{
		//currently unavailable
	}
	stopAudio(current)
	{
		this.source.disconnect();
	  this.stopped = true;
	}
	muteAudio(current)
	{
		if(this.gainNode.gain.value === 0.0)
		{
			this.gainNode.gain.value = this.previousVol;
		}
		else
		{
			this.gainNode.gain.value = 0.0;
		}
	}
		/**
	Loads a sound file into an audio buffer
	@param url is the url to the sound file - you can also use relative path
	@param name is you give the sound, it is stored
	*/
	loadSoundFile(name, url)
	{
		var that = this;
	  console.log(url);

	  var xhr = new XMLHttpRequest();
	  xhr.open('GET', url, true);
	  xhr.responseType = 'arraybuffer';

	  xhr.onload = function(e) {

	      //buffer containing sound returned by xhr
	      var arrayBuffer=this.response;

	      that.audioContext.decodeAudioData(arrayBuffer, function(buffer) {
	      //associate the audio buffer with the sound name so can use the decoded audio later.
	      that.audioBuffers[name]=buffer;

	      }, function(e) {
	      console.log('Error decoding file', e);
	    });

	  };

	  //send the xhr request to download the sound file
	  xhr.send();
	}
}
