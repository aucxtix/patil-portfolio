export class AudioEngine {
  private context: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private enabled: boolean = true;

  private init() {
    if (this.context) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      this.context = new AudioCtx();
      this.masterGain = this.context.createGain();
      this.masterGain.gain.value = 0.1; // Default volume
      this.masterGain.connect(this.context.destination);
    } catch (e) {
      console.error("AudioEngine: Web Audio API not supported.", e);
    }
  }

  public enable() {
    this.enabled = true;
    this.resume();
  }

  public disable() {
    this.enabled = false;
  }

  public toggle() {
    this.enabled = !this.enabled;
    if (this.enabled) {
      this.init();
      this.resume();
    }
    return this.enabled;
  }

  public isEnabled() {
    return this.enabled;
  }

  public resume() {
    if (this.context && this.context.state === 'suspended') {
      this.context.resume();
    }
  }

  // Premium, subtle hover tick
  public hover() {
    if (!this.enabled) return;
    this.init();
    if (!this.context || !this.masterGain) return;
    this.resume();

    const t = this.context.currentTime;
    const osc = this.context.createOscillator();
    const gain = this.context.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, t);
    osc.frequency.exponentialRampToValueAtTime(1200, t + 0.02);

    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(0.02, t + 0.005);
    gain.gain.linearRampToValueAtTime(0, t + 0.02);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(t);
    osc.stop(t + 0.02);
  }

  // Deeper click sound
  public click() {
    if (!this.enabled) return;
    this.init();
    if (!this.context || !this.masterGain) return;
    this.resume();

    const t = this.context.currentTime;
    const osc = this.context.createOscillator();
    const gain = this.context.createGain();

    // A low thud for click
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(150, t);
    osc.frequency.exponentialRampToValueAtTime(40, t + 0.08);

    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(0.08, t + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.08);

    // Add a high click attack
    const oscClick = this.context.createOscillator();
    const gainClick = this.context.createGain();
    
    oscClick.type = 'square';
    oscClick.frequency.setValueAtTime(2000, t);
    oscClick.frequency.exponentialRampToValueAtTime(100, t + 0.01);

    gainClick.gain.setValueAtTime(0, t);
    gainClick.gain.linearRampToValueAtTime(0.03, t + 0.002);
    gainClick.gain.exponentialRampToValueAtTime(0.001, t + 0.01);

    osc.connect(gain);
    gain.connect(this.masterGain);

    oscClick.connect(gainClick);
    gainClick.connect(this.masterGain);

    osc.start(t);
    oscClick.start(t);
    osc.stop(t + 0.08);
    oscClick.stop(t + 0.01);
  }

  // Terminal keystroke/message sound
  public type() {
    if (!this.enabled) return;
    this.init();
    if (!this.context || !this.masterGain) return;
    this.resume();

    const t = this.context.currentTime;
    const osc = this.context.createOscillator();
    const gain = this.context.createGain();

    // Mechanical keystroke sound
    osc.type = 'square';
    // Randomize pitch slightly
    const freq = 300 + Math.random() * 200;
    osc.frequency.setValueAtTime(freq, t);
    osc.frequency.exponentialRampToValueAtTime(freq * 0.8, t + 0.02);

    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(0.015, t + 0.002);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.02);

    // Filter to make it sound more closed/mechanical
    const filter = this.context.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1200, t);
    filter.Q.setValueAtTime(2, t);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc.start(t);
    osc.stop(t + 0.02);
  }

  // Success / activation sound (e.g., terminal output complete, form submit)
  public success() {
    if (!this.enabled) return;
    this.init();
    if (!this.context || !this.masterGain) return;
    this.resume();

    const t = this.context.currentTime;
    const osc1 = this.context.createOscillator();
    const osc2 = this.context.createOscillator();
    const gain = this.context.createGain();

    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(440, t);
    osc1.frequency.setTargetAtTime(880, t, 0.1);

    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(220, t);
    osc2.frequency.setTargetAtTime(440, t, 0.1);

    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(0.05, t + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.4);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(this.masterGain);

    osc1.start(t);
    osc2.start(t);
    osc1.stop(t + 0.4);
    osc2.stop(t + 0.4);
  }

  public error() {
    if (!this.enabled) return;
    this.init();
    if (!this.context || !this.masterGain) return;
    this.resume();

    const t = this.context.currentTime;
    const osc = this.context.createOscillator();
    const gain = this.context.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(150, t);
    osc.frequency.linearRampToValueAtTime(100, t + 0.2);

    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(0.04, t + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.2);

    const filter = this.context.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800, t);
    
    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc.start(t);
    osc.stop(t + 0.2);
  }
}

export const audio = new AudioEngine();
