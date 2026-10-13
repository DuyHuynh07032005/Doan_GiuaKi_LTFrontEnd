class SoundController {
    constructor() {
        this.ctx = null;
        this.isMuted = false;
        this.masterGain = null;
    }
    init() {
        if (!this.ctx) {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            if (AudioCtx) {
                this.ctx = new AudioCtx();
                this.masterGain = this.ctx.createGain();
                this.masterGain.gain.value = 0.28;
                this.masterGain.connect(this.ctx.destination);
            }
        }
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }
    toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.masterGain && this.ctx) {
    this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 0.28, this.ctx.currentTime);
}
return this.isMuted;
}
    playMove() {
        if (this.isMuted || !this.ctx) return;
        try {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'sine';
            osc.frequency.setValueAtTime(480, this.ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(720, this.ctx.currentTime + 0.035);

            gain.gain.setValueAtTime(0.25, this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.005, this.ctx.currentTime + 0.035);

            osc.connect(gain);
            gain.connect(this.masterGain);

            osc.start();
            osc.stop(this.ctx.currentTime + 0.035);
        } catch (e) {}
    }
    playRotate() {
        if (this.isMuted || !this.ctx) return;
        try {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'triangle';
            osc.frequency.setValueAtTime(320, this.ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.07);

            gain.gain.setValueAtTime(0.32, this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.005, this.ctx.currentTime + 0.07);

            osc.connect(gain);
            gain.connect(this.masterGain);

            osc.start();
            osc.stop(this.ctx.currentTime + 0.07);
        } catch (e) {}
    }
    playLock() {
        if (this.isMuted || !this.ctx) return;
        try {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'sine';
            osc.frequency.setValueAtTime(180, this.ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(70, this.ctx.currentTime + 0.07);

            gain.gain.setValueAtTime(0.35, this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.07);

            osc.connect(gain);
            gain.connect(this.masterGain);

            osc.start();
            osc.stop(this.ctx.currentTime + 0.07);
        } catch (e) {}
    }
    playHardDrop() {
        if (this.isMuted || !this.ctx) return;
        try {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'sine';
            osc.frequency.setValueAtTime(260, this.ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(45, this.ctx.currentTime + 0.12);

            gain.gain.setValueAtTime(0.6, this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.12);

            osc.connect(gain);
            gain.connect(this.masterGain);

            osc.start();
            osc.stop(this.ctx.currentTime + 0.12);
        } catch (e) {}
    }
    playHold() {
        if (this.isMuted || !this.ctx) return;
        try {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(350, this.ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(650, this.ctx.currentTime + 0.08);

            gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.08);

            osc.connect(gain);
            gain.connect(this.masterGain);

            osc.start();
            osc.stop(this.ctx.currentTime + 0.08);
        } catch (e) {}
    }
    playLineClear(linesCount) {
        if (this.isMuted || !this.ctx) return;
        try {
            const now = this.ctx.currentTime;

            if (linesCount === 4) {
                // Quantum Singularity / Tetris: 4 nốt hợp âm lăng kính bùng nổ
                const frequencies = [587.33, 739.99, 880.00, 1174.66]; // D5, F#5, A5, D6
                frequencies.forEach((freq, idx) => {
                    const osc = this.ctx.createOscillator();
                    const gain = this.ctx.createGain();

                    osc.type = 'triangle';
                    osc.frequency.value = freq;

                    const start = now + idx * 0.06;
                    gain.gain.setValueAtTime(0.4, start);
                    gain.gain.exponentialRampToValueAtTime(0.01, start + 0.22);

                    osc.connect(gain);
                    gain.connect(this.masterGain);

                    osc.start(start);
                    osc.stop(start + 0.22);
                });
            } else {
                // Dọn 1-3 dòng: Phase Shift Chime
                const baseFreq = 520 + linesCount * 90;
                [baseFreq, baseFreq * 1.33].forEach((freq, idx) => {
                    const osc = this.ctx.createOscillator();
                    const gain = this.ctx.createGain();

                    osc.type = 'sine';
                    osc.frequency.value = freq;

                    const start = now + idx * 0.06;
                    gain.gain.setValueAtTime(0.35, start);
                    gain.gain.exponentialRampToValueAtTime(0.01, start + 0.16);

                    osc.connect(gain);
                    gain.connect(this.masterGain);

                    osc.start(start);
                    osc.stop(start + 0.16);
                });
            }
        } catch (e) {}
    }
    playLevelComplete() {
        if (this.isMuted || !this.ctx) return;
        try {
            const now = this.ctx.currentTime;
            const melody = [
                { f: 523.25, t: 0.0 },
                { f: 659.25, t: 0.12 },
                { f: 783.99, t: 0.24 },
                { f: 1046.50, t: 0.36 },
                { f: 1318.51, t: 0.50 },
                { f: 1567.98, t: 0.65 }
            ];

            melody.forEach(item => {
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();

                osc.type = 'triangle';
                osc.frequency.value = item.f;

                const start = now + item.t;
                gain.gain.setValueAtTime(0.38, start);
                gain.gain.exponentialRampToValueAtTime(0.005, start + 0.4);

                osc.connect(gain);
                gain.connect(this.masterGain);

                osc.start(start);
                osc.stop(start + 0.4);
            });
        } catch (e) {}
    }
    playGameOver() {
        if (this.isMuted || !this.ctx) return;
        try {
            const now = this.ctx.currentTime;
            const frequencies = [360, 310, 240, 160, 90];
            frequencies.forEach((freq, idx) => {
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();

                osc.type = 'sawtooth';
                osc.frequency.value = freq;

                const start = now + idx * 0.12;
                gain.gain.setValueAtTime(0.32, start);
                gain.gain.exponentialRampToValueAtTime(0.01, start + 0.22);

                osc.connect(gain);
                gain.connect(this.masterGain);

                osc.start(start);
                osc.stop(start + 0.22);
            });
        } catch (e) {}
    }
}

const soundCtrl = new SoundController();
