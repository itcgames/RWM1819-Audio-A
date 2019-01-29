//if i have time id like to make an audioManager use an object audioInstance

/**
 * @description Audio class used to control audio for a project
 */
class AudioManager{
	/**
	 * @constructor for the audio class 
	 */
	constructor(){
		//an object to hold a name for each sound and its associated buffer (memory holding the sound)
		this.audioBuffers={}
	    //Required for managing and for playing any sound.
		this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
		this.gainNode = this.audioContext.createGain();
		//stores value for previous volume
		this.previousVol = 0.0;
		//stores if the sound is pause or not
		this.playing = false;
		// time audio started
		this.startedTime = 0;
		// time audio paused
		this.pausedTime = 0;
		//if trying to play sound before loaded its added to queue
		this.audioQueue = [];
		//array of events
		this.events = [];

	}
	/**
	 * @description makes sure your browser supports webaudio
	 */
	init(){
		try{
				// Fix up for prefixing
				window.AudioContext = window.AudioContext||window.webkitAudioContext;
				this.audioContext = new AudioContext();
		}
		catch(e){
				alert('Web Audio API is not supported in this browser');
		}
	}
/**
 * @description Plays the audio 'name' at a certain 'volume' and decided if it is looped using 'loop'
 * @param {String} name string of the sound we want to play
 * @param {Boolean} loop decides whether to loop the sound or not
 * @param {Float} volume volume we wish to play the sound at between 0 and 1
 */
	playAudio(name, loop, volume){
		//if the sound doesnt exist yet
		if(this.audioBuffers[name] == undefined){
	    console.log("Sound '"+name+"' doesn't exist or hasn't been loaded(adding to queue)")
			this.audioQueue.push({name:name, loop:loop, volume:volume});
	    return;
	  }
		else{
			//retrieve the buffer we stored earlier
			var audioBuffer = this.audioBuffers[name];

			//create a buffer source - used to play once and then a new one must be made
			var source = this.audioContext.createBufferSource();
			this.source = source;
			source.buffer = audioBuffer;
			// set loop
			source.loop = loop;
			//set playing to true
			this.playing = true;
			//offset from start
			this.offset = this.pausedTime;
			this.pausedTime = 0;

			this.startedTime = this.audioContext.currentTime - this.offset;
			//source.connect(this.audioContext.destination);
			this.gainNode = this.audioContext.createGain();
			source.connect(this.gainNode);
			this.gainNode.connect(this.audioContext.destination);
			this.changeVolume(volume);
			
			source.start(0, this.offset); // Play immediately. at an offset 
			
			
	  }
	}
	/**
	 * @description plays sounds from an audio sprite which contains 1 sound file with many sounds
	 * @param {String} name name of sound to be played 
	 * @param {Boolean} loop decide to loop or not 
	 * @param {Float} volume volume to play at
	 * @param {Float} start time to start playing at 
	 * @param {Float} end  time to stop playing at 
	 */
	playFromAudioSprite(name, loop, volume, start, end){
		//if the sound doesnt exist yet
		if(this.audioBuffers[name] == undefined){
			console.log("Sound '"+name+"' doesn't exist or hasn't been loaded(adding to queue)")
				this.audioQueue.push({name:name, loop:loop, volume:volume});
			return;
		  }
		else{
			//retrieve the buffer we stored earlier
			var audioBuffer = this.audioBuffers[name];
	
			//create a buffer source - used to play once and then a new one must be made
			var source = this.audioContext.createBufferSource();
			this.source = source;
			source.buffer = audioBuffer;
			// set loop
			source.loop = loop;

			this.gainNode = this.audioContext.createGain();
			source.connect(this.gainNode);
			this.gainNode.connect(this.audioContext.destination);
			this.changeVolume(volume);
			//start at time specified when called 
			//end after start-end seconds has passed
			//if my audio starts at 5 seconds and ends at 8 seconds 8-5 = 3;
			//the audio will play for 3 seconds starting from 5
			source.start(0, start); // Play immediately. at an offset 	
			source.stop(this.audioContext.currentTime + (end-start));	
		  }
	}
	/**
	 * @description user creates an event that they want to play a sound when its triggered that event gets passed in here along with the sound they would like to play 
	 * then when the event is triggered the sound is played
	 * @param {String} event event to trigger on
	 * @param {String} name of audio to play 
	 * @param {Boolean} loop whether to loop audio or not 
	 * @param {Float} volume to play audio at 
	 */
	eventBasedAudio(event, name, loop, volume)
	{
		this.events.push({type:event,title:name,repeat:loop,value:volume});
	}
	/**
	 * @description when an event is triggered play the corresponding sound
	 * @param {String} event type of event
	 */
	playEvent(event){
		this.events.forEach(e =>{
			if(e.type === event)
			{
				this.playAudio(e.title, e.repeat, e.value);
			}
		});
	}
	/**
	 * @description function to change the volume value
	 * @param {Float} volume change the volume to this value
	 */
	changeVolume(volume){
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
	/**
	 * @description if audio is playing pause it and store the offset 
	 * @param {AudioContext} current sound to manipulate 
	 */
	pauseAudio(current){
		try{
			if(this.playing === true){
				var elapsed = this.audioContext.currentTime - this.startedTime;
        this.stopAudio(current);
        this.pausedTime = elapsed;
			}
		}
		catch(e){
			console.log(e);
		}
	}
	/**
	 * @description function to stop the current audio from playing
	 * @param {AudioContext} current sound to manipulate
	 */
	stopAudio(current){
		try{
			this.source.disconnect(current);			
		}
		catch(e){
				console.log(e);
		}
		
	}
	/**
	 * @description mute the audio and store the volume if its muted already then unmute 
	 * @param {AudioContext} current 
	 */
	muteAudio(){
		try{
			if(this.gainNode.gain.value === 0.0){
				this.gainNode.gain.value = this.previousVol;
			}
			else{
				this.gainNode.gain.value = 0.0;
			}
		}
		catch(e){
			console.log(e);
		}
	
	}
		/**
	Loads a sound file into an audio buffer
	@param url is the url to the sound file - you can also use relative path
	@param name is you give the sound, it is stored
	*/
	loadSoundFile(name, url){
		var that = this;
	  console.log(url);

	  var xhr = new XMLHttpRequest();
	  xhr.open('GET', url, true);
	  xhr.responseType = 'arraybuffer';
		xhr.addEventListener("load", this.onLoad.bind(this, name, xhr));
	  //send the xhr request to download the sound file
	  xhr.send();
	}
	//when the sound buffer loads
	/**
	 * @param {string} name 
	 * @param {XMLHttpRequest} xhr 
	 * @param {ProgressEvent} e 
	 */
	onLoad(name,xhr,e){
		var arrayBuffer = xhr.response;
		this.audioContext.decodeAudioData(arrayBuffer, this.onDecode.bind(this, name));
	}
	/**
	 * @description if the audio buffer is successfully decoded we can play sounds in queue
	 * @param {String} name of the current sound
	 * @param {AudioBuffer} audioBuffer 
	 */
	//if the audio buffer is successfully decoded we can play sounds in queue
	onDecode(name,audioBuffer){
		this.audioBuffers[name] = audioBuffer;
		for(var i = this.audioQueue.length-1; i>= 0; --i){
			if (this.audioQueue[i].name === name){
					this.playAudio(this.audioQueue[i].name, this.audioQueue[i].loop, this.audioQueue[i].volume);
					this.audioQueue.splice(i, 1);
			}
		}
	}
}
