// Lightweight Web Audio API synthesizer for organic, elegant UI haptics
class SoundDesign {
  constructor() {
    this.ctx = null;
    this.droneOsc = null;
    this.droneGain = null;
    this.isDronePlaying = false;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Soft glass chime on hover
  playHoverChime() {
    try {
      this.init();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, this.ctx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.08); // A5

      gain.gain.setValueAtTime(0.015, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.12);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.12);
    } catch (e) {
      // Audio not permitted or user hasn't interacted
    }
  }

  // Resonant deep cyan click
  playClick() {
    try {
      this.init();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(220, this.ctx.currentTime + 0.15);

      gain.gain.setValueAtTime(0.03, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.18);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.18);
    } catch (e) {
      // Ignore
    }
  }

  // 432 Hz Meditative focus drone
  toggleFocusDrone(callback) {
    this.init();
    if (!this.ctx) return false;

    if (this.isDronePlaying) {
      if (this.droneOsc) {
        try {
          this.droneOsc.stop();
          this.droneOsc.disconnect();
        } catch (e) {}
      }
      this.isDronePlaying = false;
      if (callback) callback(false);
      return false;
    } else {
      try {
        const osc = this.ctx.createOscillator();
        const subOsc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        // 432Hz fundamental + harmonic 216Hz
        osc.type = 'sine';
        osc.frequency.setValueAtTime(432, this.ctx.currentTime);

        subOsc.type = 'triangle';
        subOsc.frequency.setValueAtTime(216, this.ctx.currentTime);

        gain.gain.setValueAtTime(0.0001, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.02, this.ctx.currentTime + 1.5);

        osc.connect(gain);
        subOsc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start();
        subOsc.start();

        this.droneOsc = osc;
        this.droneSubOsc = subOsc;
        this.droneGain = gain;
        this.isDronePlaying = true;
        if (callback) callback(true);
        return true;
      } catch (e) {
        return false;
      }
    }
  }
}

export const sound = new SoundDesign();

