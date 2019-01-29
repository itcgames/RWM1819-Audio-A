# RWM1819-Audio Manager

## Overview of the Audio Manager component
The audio manager component comes along with a Button.js class and a Slider.js class both located in src/GUI they are intentionally kept
separate to allow the user to define what the button clicks and slider movement actually do.
The audio manager itself contains the rest of the features on my list. 
This component should be used when you want to quickly add a lot of useful audio functions to your game/project.
This component should not be used if the audio you need is highly complex with various audio tricks and techniques attached. 

## How to Use:
To use the audio manager component your browser must support Web Audio API.
```javascript
this.audioContext = new(window.AudioContext || window.wekkitAudioContext)();
```
The first thing you need to do is define a new audioManager
```javascript
// new audioManager
this.audioManager = new AudioManager();
```
Next you load in the sound file you wish to you which takes the name you want to call the sound by and the url to the file
then you’re good to go. 
```javascript
//audio sprite sound
this.audioManager.loadSoundFile("AudioSprite", this.myAssets.data["AudioSpriteExample"]["BUTTONSOUNDEFFECTS"]);
```
From here you can call various audio functions for example
```javascript
// Play (name,loop,volume)
this.audioManager.playAudio("AudioSprite", false, 1.0);
```
```javascript
// Pause (name)
this.audioManage.pauseAudio("AudioSprite");
```
```javascript
// Stop (name)
this.audioManager.stopAudio("AudioSprite");
```
```javascript
// Mute (name)
this.audioManager.muteAudio("AudioSprite");
```
