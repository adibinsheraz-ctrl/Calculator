/**
 * Aetheris Sound Engine
 * Optimized for low-latency hardware-grade sound synthesis.
 */
export class SoundManager {
  private static audioContext: AudioContext | null = null;
  private static noiseBuffer: AudioBuffer | null = null;
  private static isInitializing = false;

  /**
   * Initializes the AudioContext and pre-builds assets.
   * This should be called on the first user interaction.
   */
  static async init() {
    if (typeof window === "undefined" || this.audioContext || this.isInitializing) return;
    
    this.isInitializing = true;
    try {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)({
        latencyHint: 'interactive'
      });
      
      // Pre-generate noise buffer for mechanical click texture
      const bufferSize = this.audioContext.sampleRate * 0.05; // 50ms of noise
      this.noiseBuffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate);
      const output = this.noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      if (this.audioContext.state === 'suspended') {
        await this.audioContext.resume();
      }
    } catch (error) {
      console.warn("SoundManager failed to initialize:", error);
    } finally {
      this.isInitializing = false;
    }
  }

  /**
   * Plays a high-fidelity mechanical click sound.
   * Synthesizes a sine tone with a transient noise burst.
   */
  static playClick() {
    if (!this.audioContext) {
      this.init(); // Lazy init if not already done
      return;
    }

    try {
      const now = this.audioContext.currentTime;

      // Ensure context is active (browsers often suspend it)
      if (this.audioContext.state === 'suspended') {
        this.audioContext.resume();
      }

      // 1. Tonal Component (The 'Dink')
      const osc = this.audioContext.createOscillator();
      const oscGain = this.audioContext.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, now); // A5 note
      osc.frequency.exponentialRampToValueAtTime(440, now + 0.02); // Pitch drop for "thump"
      
      oscGain.gain.setValueAtTime(0.3, now);
      oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);

      osc.connect(oscGain);
      oscGain.connect(this.audioContext.destination);

      // 2. Mechanical Component (The 'Click' transient)
      if (this.noiseBuffer) {
        const noise = this.audioContext.createBufferSource();
        const noiseGain = this.audioContext.createGain();
        
        noise.buffer = this.noiseBuffer;
        
        // Very sharp noise burst
        noiseGain.gain.setValueAtTime(0.1, now);
        noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.01);
        
        // High-pass filter the noise for a "sharper" click
        const filter = this.audioContext.createBiquadFilter();
        filter.type = 'highpass';
        filter.frequency.setValueAtTime(2000, now);
        
        noise.connect(filter);
        filter.connect(noiseGain);
        noiseGain.connect(this.audioContext.destination);
        
        noise.start(now);
        noise.stop(now + 0.01);
      }

      osc.start(now);
      osc.stop(now + 0.03);
    } catch (e) {
      // Silent fail to prevent UI lag/collapse
    }
  }
}
