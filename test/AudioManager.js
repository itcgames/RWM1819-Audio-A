/* global rwm1819AudioA, describe, it, expect, should */
var audioManager = new AudioManager();
describe('AudioManager()', function () {
  'use strict';

  it('exists', function () {
    expect(AudioManager).to.be.a('function');
    expect(audioManager.playAudio).to.be.a('function');
    expect(audioManager.stopAudio).to.be.a('function');
    expect(audioManager.muteAudio).to.be.a('function');
    expect(audioManager.pauseAudio).to.be.a('function');
    expect(audioManager.playFromAudioSprite).to.be.a('function');
    expect(audioManager.eventBasedAudio).to.be.a('function');
    expect(audioManager.playEvent).to.be.a('function');
    expect(audioManager.changeVolume).to.be.a('function');
    expect(audioManager.loadSoundFile).to.be.a('function');
    expect(audioManager.onDecode).to.be.a('function');
    expect(audioManager.onLoad).to.be.a('function');
  });

  //not sure how or what to test hereq
  // Add more assertions here
});
