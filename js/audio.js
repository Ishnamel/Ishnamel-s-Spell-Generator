/* ==========================================================================
   TONE.JS PROCEDURAL ARCANE BGM & MULTI-VOICE MODIFIER SYNTHESIZER
   ========================================================================== */

class ArcaneAudioEngine {
    constructor() {
        this.isInitialized = false;
        this.isPlaying = false;
        this.currentElement = "sfalhoy";
        this.currentDelivery = "uruwak";
        this.currentModifiers = [];

        // Master Output Chain (+50% Loudness Boost & Limiter)
        this.limiter = null;
        this.masterVolume = null;
        this.reverb = null;
        this.chorus = null;

        // Continuous Living Elemental Drone Oscillators (No Decay Envelopes)
        this.droneFilter = null;
        this.droneOscA = null;
        this.droneOscB = null;
        this.droneLFO = null;
        this.noiseFilter = null;
        this.noiseGenerator = null;

        // 7 Specialized Synthesizer Voices
        this.subImpactSynth = null;   // Low Sub/Membrane Thuds (C0 - C2)
        this.metallicSynth = null;    // Anvils, Blades, Crystals, Piercing Clangs
        this.fmLeadSynth = null;      // Crystalline Beams, Lances, Arpeggios
        this.noiseSlashSynth = null;  // Vacuum Whooshes, Slashes, Barriers
        this.chronoPluckSynth = null; // Staccato Ticks, Time-Gates, Pulses
        this.glitchSynth = null;      // Ring-Modulated Anti-Magic, Spell-Breakers
        this.polyChordSynth = null;   // Dense Multi-Voice Chords & Domain Stabs

        // Vocal Formant Choir Engine (Dedicated for Erlaaw / Light Manifestation)
        this.choirFilter1 = null;     // Formant F1 (Vocal Aperture)
        this.choirFilter2 = null;     // Formant F2 (Vocal Position)
        this.choirSynth = null;

        this.bgmLoop = null;

        // 1. Dynamic Elemental Drones (Exact Numeric Frequencies & LFO Breathing Rates)
        this.elementDrones = {
            sfalhoy: { 
                freqA: 55.0,  freqB: 82.41, typeA: "sawtooth", typeB: "triangle",
                filterFreq: 260, Q: 3.5, lfoRate: 3.2, lfoDepth: 160, noiseFreq: 650, noiseVol: -20 
            },
            hanhum:  { 
                freqA: 43.65, freqB: 65.41, typeA: "sine",     typeB: "triangle",
                filterFreq: 220, Q: 2.0, lfoRate: 0.18, lfoDepth: 110, noiseFreq: 280, noiseVol: -24 
            },
            falga:   { 
                freqA: 32.7,  freqB: 49.0,  typeA: "triangle", typeB: "sawtooth",
                filterFreq: 130, Q: 5.5, lfoRate: 0.08, lfoDepth: 55,  noiseFreq: 150, noiseVol: -28 
            },
            jalfinn: { 
                freqA: 82.41, freqB: 123.47, typeA: "sine",    typeB: "sine",
                filterFreq: 420, Q: 2.5, lfoRate: 2.4, lfoDepth: 220, noiseFreq: 1100, noiseVol: -18 
            },
            iklad:   { 
                freqA: 36.71, freqB: 65.41, typeA: "square",   typeB: "sawtooth",
                filterFreq: 300, Q: 4.0, lfoRate: 8.0, lfoDepth: 180, noiseFreq: 750, noiseVol: -22 
            },
            erlaaw:  { 
                freqA: 49.0,  freqB: 123.47, typeA: "triangle", typeB: "sine",
                filterFreq: 420, Q: 2.0, lfoRate: 1.6, lfoDepth: 260, noiseFreq: 380, noiseVol: -28 
            },
            worulim: { 
                freqA: 36.71, freqB: 51.91, typeA: "sawtooth", typeB: "square",
                filterFreq: 180, Q: 5.5, lfoRate: 0.35, lfoDepth: 90, noiseFreq: 220, noiseVol: -24 
            },
            amin:    { 
                freqA: 73.42, freqB: 110.0, typeA: "sine",     typeB: "triangle",
                filterFreq: 360, Q: 3.0, lfoRate: 0.5, lfoDepth: 180, noiseFreq: 400, noiseVol: -22 
            }
        };

        // 2. Delivery Rhythm Meters & Tempos
        this.deliveryGrooves = {
            uruwak:  { bpm: 116, swing: 0.1,  division: "8n", kickPitches: ["C1", "C1", "D1", "C1"] },
            lalhwa:  { bpm: 64,  swing: 0.3,  division: "4n", kickPitches: ["F1", "A1", "G1", "F1"] },
            hlakbil: { bpm: 74,  swing: 0.05, division: "4n", kickPitches: ["A0", "A0", "C1", "A0"] },
            ruluwar: { bpm: 86,  swing: 0.25, division: "8n", kickPitches: ["D1", "G1", "F1", "A1"] },
            iwati:   { bpm: 92,  swing: 0.0,  division: "16n", kickPitches: ["E1", "E1", "B0", "E1"] }
        };
    }

    // -------------------------------------------------------------
    // 1. ASYNC INITIALIZATION & MASTER AUDIO CHAIN (+50% LOUDNESS)
    // -------------------------------------------------------------
    async init() {
        if (this.isInitialized) return;

        if (typeof Tone === "undefined") {
            await new Promise((resolve, reject) => {
                const script = document.createElement("script");
                script.src = "js/tone.js";
                script.onload = resolve;
                script.onerror = () => {
                    const cdnScript = document.createElement("script");
                    cdnScript.src = "https://cdnjs.cloudflare.com/ajax/libs/tone/14.8.49/Tone.js";
                    cdnScript.onload = resolve;
                    cdnScript.onerror = () => reject(new Error("Could not load Tone.js"));
                    document.head.appendChild(cdnScript);
                };
                document.head.appendChild(script);
            });
        }

        await Tone.start();

        // 1. Master Output: Limiter + 50% Volume Boost (+4.5dB)
        this.limiter = new Tone.Limiter(-0.5).toDestination();
        this.masterVolume = new Tone.Volume(+4.5).connect(this.limiter);

        // 2. Global Spatial Reverb & Stereo Chorus
        this.reverb = new Tone.Reverb({ decay: 4.2, preDelay: 0.12, wet: 0.38 }).connect(this.masterVolume);
        await this.reverb.generate();

        this.chorus = new Tone.Chorus(2.5, 3.5, 0.5).connect(this.reverb).start();

        // Voice A: Continuous Pure Oscillators for Living Elemental Drone (No Decay)
        this.droneFilter = new Tone.Filter({ frequency: 240, type: "lowpass", rolloff: -24 }).connect(this.reverb);
        this.droneLFO = new Tone.LFO(0.5, 100, 320).connect(this.droneFilter.frequency).start();

        this.droneOscA = new Tone.FatOscillator({
            frequency: 55.0,
            type: "sawtooth",
            spread: 15,
            count: 3
        }).connect(this.droneFilter);
        this.droneOscA.volume.value = -3.5;

        this.droneOscB = new Tone.Oscillator({
            frequency: 82.41,
            type: "triangle"
        }).connect(this.droneFilter);
        this.droneOscB.volume.value = -4.5;

        // Voice B: Sub-Bass / Heavy Impact Kick (Bamtuk, Tupwok, Pittip, Rundo)
        this.subImpactSynth = new Tone.MembraneSynth({
            pitchDecay: 0.08,
            octaves: 3.5,
            oscillator: { type: "sine" },
            envelope: { attack: 0.005, decay: 0.45, sustain: 0.01, release: 0.8 }
        }).connect(this.masterVolume);
        this.subImpactSynth.volume.value = +3.0;

        // Voice C: Metallic Anvil / Razor Blade Clang (Dukto, Iwa, Tigkab, Kunta, Asanu, Bati)
        this.metallicSynth = new Tone.MetalSynth({
            frequency: 220,
            envelope: { attack: 0.001, decay: 0.35, release: 0.2 },
            harmonicity: 4.1,
            modulationIndex: 32,
            resonance: 3500,
            octaves: 1.5
        }).connect(this.reverb);
        this.metallicSynth.volume.value = -7.0;

        // Voice D: Crystalline FM Lead (Shapes, Beams, Multiplication, Arcs)
        this.fmLeadSynth = new Tone.FMSynth({
            harmonicity: 1.5,
            modulationIndex: 2.5,
            oscillator: { type: "triangle" },
            envelope: { attack: 0.03, decay: 0.22, sustain: 0.25, release: 0.55 },
            modulation: { type: "sine" },
            modulationEnvelope: { attack: 0.02, decay: 0.18, sustain: 0.1, release: 0.4 }
        }).connect(this.chorus);
        this.fmLeadSynth.volume.value = +0.5;

        // Voice E: Aeromantic Noise Whoosh / Slash / Barrier (Apap, Praba, Abbay, Yudgo, Ewansi)
        this.noiseFilter = new Tone.Filter(240, "lowpass").connect(this.reverb);
        this.noiseGenerator = new Tone.Noise("pink").connect(this.noiseFilter);
        this.noiseGenerator.volume.value = -22.0;

        this.noiseSlashSynth = new Tone.NoiseSynth({
            noise: { type: "white" },
            envelope: { attack: 0.02, decay: 0.25, offset: 0 }
        }).connect(this.reverb);
        this.noiseSlashSynth.volume.value = -8.0;

        // Voice F: Chrono-Staccato Pluck (Tat, Tan, Lit, Talkib, Litu)
        this.chronoPluckSynth = new Tone.PluckSynth({
            attackNoise: 1.2,
            dampening: 3500,
            resonance: 0.92
        }).connect(this.reverb);
        this.chronoPluckSynth.volume.value = -1.5;

        // Voice G: Anti-Magic Ring-Modulation Glitch (Ami, Giba, Tigam, Aduy, Morpa)
        this.glitchSynth = new Tone.AMSynth({
            harmonicity: 2.75,
            oscillator: { type: "square" },
            envelope: { attack: 0.01, decay: 0.15, sustain: 0.05, release: 0.2 },
            modulation: { type: "sawtooth" }
        }).connect(this.reverb);
        this.glitchSynth.volume.value = -4.5;

        // Voice H: Polyphonic Chord Stabs (Abbay, Bunton, Multi-Voice Matrices)
        this.polyChordSynth = new Tone.PolySynth(Tone.Synth, {
            oscillator: { type: "triangle" },
            envelope: { attack: 0.04, decay: 0.35, sustain: 0.35, release: 0.7 }
        }).connect(this.reverb);
        this.polyChordSynth.volume.value = -3.0;

        // Voice I: Calibrated Vocal Formant Choir Synth (For Erlaaw / Celestial Light)
        this.choirFilter1 = new Tone.Filter(320, "bandpass", -12);
        this.choirFilter2 = new Tone.Filter(850, "bandpass", -12);
        this.choirFilter1.Q.value = 4.0;
        this.choirFilter2.Q.value = 4.5;

        const choirVolume = new Tone.Volume(-2.5).connect(this.reverb);
        this.choirFilter1.connect(choirVolume);
        this.choirFilter2.connect(choirVolume);

        this.choirSynth = new Tone.PolySynth(Tone.Synth, {
            oscillator: { type: "sawtooth" },
            envelope: { attack: 0.7, decay: 1.0, sustain: 0.8, release: 2.0 }
        });
        this.choirSynth.connect(this.choirFilter1);
        this.choirSynth.connect(this.choirFilter2);

        this.isInitialized = true;
    }

    // -------------------------------------------------------------
    // 2. START / STOP NONSTOP ARCANE BGM
    // -------------------------------------------------------------
    startBGM(state) {
        if (!this.isInitialized) return;
        if (this.isPlaying) return;

        this.updateParameters(state);

        let step = 0;
        const self = this;

        // Start Pure Drone Oscillators (Continuous & Non-Decaying)
        const elData = this.elementDrones[this.currentElement] || this.elementDrones.amin;
        this.droneOscA.frequency.value = elData.freqA;
        this.droneOscB.frequency.value = elData.freqB;
        this.droneOscA.type = elData.typeA;
        this.droneOscB.type = elData.typeB;
        
        this.droneOscA.start();
        this.droneOscB.start();
        this.noiseGenerator.start();

        // Main Transport Rhythmic Loop
        this.bgmLoop = new Tone.Loop(time => {
            const groove = self.deliveryGrooves[self.currentDelivery] || self.deliveryGrooves.uruwak;
            
            // 1. Trigger Delivery Rhythm
            if (self.currentDelivery === 'hlakbil') {
                self.subImpactSynth.triggerAttackRelease("A0", "16n", time);
                self.subImpactSynth.triggerAttackRelease("F0", "16n", time + 0.22);
            } else if (self.currentDelivery === 'iwati') {
                self.metallicSynth.triggerAttackRelease("C2", "32n", time);
                if (step % 2 === 0) self.subImpactSynth.triggerAttackRelease("E1", "16n", time);
            } else if (step % 2 === 0 || self.currentDelivery === 'uruwak') {
                const pitch = groove.kickPitches[step % groove.kickPitches.length];
                self.subImpactSynth.triggerAttackRelease(pitch, "8n", time);
            }

            // 2. Trigger Active Modifier Audio Signature on the Beat (Instantly Stops when Empty)
            if (self.currentModifiers && self.currentModifiers.length > 0) {
                const modId = self.currentModifiers[step % self.currentModifiers.length];
                self.playModifierAcousticSignature(modId, time);
            }

            step = (step + 1) % 8;
        }, "8n").start(0);

        Tone.Transport.start();
        this.isPlaying = true;
    }

    stopBGM() {
        if (!this.isPlaying) return;
        if (this.bgmLoop) {
            this.bgmLoop.stop();
            this.bgmLoop.dispose();
            this.bgmLoop = null;
        }
        if (this.droneOscA) this.droneOscA.stop();
        if (this.droneOscB) this.droneOscB.stop();
        if (this.noiseGenerator) this.noiseGenerator.stop();
        Tone.Transport.stop();
        this.isPlaying = false;
    }

    // -------------------------------------------------------------
    // 3. INSTANT REAL-TIME BGM PARAMETER SWITCHING (NO TOGGLE NEEDED)
    // -------------------------------------------------------------
    updateParameters(state) {
        if (!state) return;
        this.currentElement = state.element || "sfalhoy";
        this.currentDelivery = state.delivery || "uruwak";
        // Defensive copy of modifiers array so "Clear Chain" takes effect immediately
        this.currentModifiers = state.modifiers && state.modifiers.length > 0 ? [...state.modifiers] : [];

        if (!this.isInitialized || !this.isPlaying) return;

        const elData = this.elementDrones[this.currentElement] || this.elementDrones.amin;

        // 1. Instant Frequency Ramp (Guaranteed Smooth Numeric Ramp)
        this.droneOscA.frequency.rampTo(elData.freqA, 0.15);
        this.droneOscB.frequency.rampTo(elData.freqB, 0.15);
        this.droneOscA.type = elData.typeA;
        this.droneOscB.type = elData.typeB;

        this.droneFilter.frequency.rampTo(elData.filterFreq, 0.2);
        this.droneFilter.Q.value = elData.Q;

        if (this.droneLFO) {
            this.droneLFO.frequency.rampTo(elData.lfoRate, 0.25);
            this.droneLFO.min = Math.max(35, elData.filterFreq - elData.lfoDepth);
            this.droneLFO.max = elData.filterFreq + elData.lfoDepth;
        }

        // 2. Instant Delivery BPM & Groove update
        const groove = this.deliveryGrooves[this.currentDelivery] || this.deliveryGrooves.uruwak;
        let targetBPM = groove.bpm;

        if (this.currentModifiers.includes('sapas')) targetBPM *= 1.35; // Fast Hypersonic
        if (this.currentModifiers.includes('tunbog')) targetBPM *= 0.65; // Slow Plodding

        Tone.Transport.bpm.rampTo(targetBPM, 0.25);
        Tone.Transport.swing = groove.swing;

        // 3. Instant Ambient Noise Update
        this.noiseFilter.frequency.rampTo(elData.noiseFreq, 0.25);
        this.noiseGenerator.volume.rampTo(elData.noiseVol, 0.25);
    }

    // -------------------------------------------------------------
    // 4. 42 DISTINCTIVE MODIFIER SOUND SIGNATURES
    // -------------------------------------------------------------
    playModifierAcousticSignature(modId, time) {
        switch (modId) {
            // --- 1. SHAPE MODIFIERS ---
            case 'yinla':
                this.fmLeadSynth.triggerAttackRelease("C3", "16n", time);
                this.fmLeadSynth.frequency.exponentialRampToValueAtTime(523.25, time + 0.1);
                break;
            case 'gilbo':
                this.fmLeadSynth.triggerAttackRelease("E2", "8n", time);
                break;
            case 'taddum':
                this.metallicSynth.triggerAttackRelease("F#3", "32n", time);
                break;
            case 'yangga':
                this.chronoPluckSynth.triggerAttackRelease("B3", time);
                break;
            case 'praba':
                this.glitchSynth.triggerAttackRelease("G1", "4n", time);
                break;
            case 'ngisngi':
                this.fmLeadSynth.triggerAttackRelease("D3", "32n", time);
                this.fmLeadSynth.triggerAttackRelease("A3", "32n", time + 0.08);
                break;
            case 'apap':
                this.noiseSlashSynth.triggerAttackRelease("8n", time);
                break;
            case 'abbay':
                this.polyChordSynth.triggerAttackRelease(["C2", "G2", "Eb3", "Bb3"], "4n", time);
                break;

            // --- 2. MOVEMENT MODIFIERS ---
            case 'rundo':
                this.subImpactSynth.triggerAttackRelease("G0", "8n", time);
                break;
            case 'yudgo':
                this.noiseFilter.frequency.setValueAtTime(800, time);
                this.noiseFilter.frequency.exponentialRampToValueAtTime(90, time + 0.35);
                break;
            case 'kitas':
                this.fmLeadSynth.triggerAttackRelease("C3", "16n", time);
                this.fmLeadSynth.triggerAttackRelease("C2", "16n", time + 0.1);
                break;
            case 'ewansi':
                this.metallicSynth.triggerAttackRelease("E4", "64n", time);
                break;
            case 'surut':
                this.fmLeadSynth.triggerAttackRelease("D1", "8n", time);
                this.fmLeadSynth.frequency.exponentialRampToValueAtTime(110, time + 0.25);
                break;
            case 'blisu':
                this.chronoPluckSynth.triggerAttackRelease("G1", time);
                this.chronoPluckSynth.triggerAttackRelease("G3", time + 0.14);
                break;
            case 'liwak':
                this.fmLeadSynth.triggerAttackRelease("B2", "16n", time);
                break;
            case 'kijlo':
                this.fmLeadSynth.triggerAttackRelease("A3", "16n", time);
                this.fmLeadSynth.frequency.exponentialRampToValueAtTime(65.4, time + 0.3);
                break;

            // --- 3. IMPACT MODIFIERS ---
            case 'bamtuk':
                this.subImpactSynth.triggerAttackRelease("C0", "2n", time);
                break;
            case 'tupwok':
                this.subImpactSynth.triggerAttackRelease("D1", "4n", time);
                break;
            case 'dukto':
                this.metallicSynth.triggerAttackRelease("G3", "64n", time);
                break;
            case 'iwa':
                this.noiseSlashSynth.triggerAttackRelease("16n", time);
                break;
            case 'pittip':
                this.subImpactSynth.triggerAttackRelease("A0", "2n", time);
                this.subImpactSynth.frequency.exponentialRampToValueAtTime(25, time + 0.5);
                break;
            case 'waras':
                this.chronoPluckSynth.triggerAttackRelease("C3", time);
                this.chronoPluckSynth.triggerAttackRelease("E3", time + 0.04);
                this.chronoPluckSynth.triggerAttackRelease("G3", time + 0.08);
                this.chronoPluckSynth.triggerAttackRelease("B3", time + 0.12);
                break;
            case 'tublag':
                this.fmLeadSynth.triggerAttackRelease("A2", "32n", time);
                this.fmLeadSynth.triggerAttackRelease("D3", "32n", time + 0.06);
                this.fmLeadSynth.triggerAttackRelease("G3", "32n", time + 0.12);
                break;
            case 'tigkab':
                this.metallicSynth.triggerAttackRelease("C4", "64n", time);
                break;

            // --- 4. DURATION MODIFIERS ---
            case 'tat':
                this.chronoPluckSynth.triggerAttackRelease("C4", time);
                break;
            case 'tul':
                this.fmLeadSynth.triggerAttackRelease("A1", "2n", time);
                break;
            case 'bati':
                this.metallicSynth.triggerAttackRelease("D2", "2n", time);
                break;
            case 'tan':
                this.chronoPluckSynth.triggerAttackRelease("F2", time + 0.16);
                break;
            case 'lit':
                this.chronoPluckSynth.triggerAttackRelease("A2", time);
                this.chronoPluckSynth.triggerAttackRelease("A2", time + 0.06);
                this.chronoPluckSynth.triggerAttackRelease("A2", time + 0.12);
                break;
            case 'talkib':
                this.chronoPluckSynth.triggerAttackRelease("D3", time);
                break;
            case 'litu':
                this.fmLeadSynth.triggerAttackRelease("G1", "4n", time);
                break;

            // --- 5. MULTIPLY MODIFIERS ---
            case 'tiha':
                this.fmLeadSynth.triggerAttackRelease("D2", "16n", time);
                this.fmLeadSynth.triggerAttackRelease("D3", "16n", time + 0.08);
                break;
            case 'padu':
                this.fmLeadSynth.triggerAttackRelease("C2", "32n", time);
                this.fmLeadSynth.triggerAttackRelease("E2", "32n", time + 0.05);
                this.fmLeadSynth.triggerAttackRelease("G2", "32n", time + 0.10);
                this.fmLeadSynth.triggerAttackRelease("C3", "32n", time + 0.15);
                break;
            case 'silpu':
                this.fmLeadSynth.triggerAttackRelease("E2", "16n", time);
                this.fmLeadSynth.triggerAttackRelease("A2", "16n", time + 0.08);
                this.fmLeadSynth.triggerAttackRelease("D3", "16n", time + 0.16);
                break;
            case 'bunton':
                this.polyChordSynth.triggerAttackRelease(["A1", "C2", "E2", "A2"], "16n", time);
                break;

            // --- 6. TARGET MODIFIERS ---
            case 'ami':
                this.glitchSynth.triggerAttackRelease("F2", "16n", time);
                break;
            case 'giba':
                this.subImpactSynth.triggerAttackRelease("G0", "8n", time);
                break;
            case 'tigam':
                this.metallicSynth.triggerAttackRelease("B1", "32n", time);
                break;
            case 'asym':
                this.chronoPluckSynth.triggerAttackRelease("E3", time);
                break;
            case 'adau':
                this.noiseSlashSynth.triggerAttackRelease("4n", time);
                break;
            case 'aduy':
                this.chronoPluckSynth.triggerAttackRelease("A1", time);
                break;
            case 'genu':
                this.chronoPluckSynth.triggerAttackRelease("C2", time);
                break;
            case 'shak':
                this.subImpactSynth.triggerAttackRelease("A0", "8n", time);
                break;

            // --- 7. CONTROL MODIFIERS ---
            case 'suruti':
                this.chronoPluckSynth.triggerAttackRelease("D3", time);
                this.chronoPluckSynth.triggerAttackRelease("G3", time + 0.06);
                break;
            case 'spat':
                this.fmLeadSynth.triggerAttackRelease("C2", "8n", time);
                break;
            case 'itta':
                this.fmLeadSynth.triggerAttackRelease("F1", "16n", time);
                break;
            case 'pakut':
                this.metallicSynth.triggerAttackRelease("E1", "16n", time);
                break;
            case 'alisi':
                this.glitchSynth.triggerAttackRelease("B2", "32n", time);
                break;
            case 'morpa':
                this.glitchSynth.triggerAttackRelease("A1", "8n", time);
                break;

            // --- 8. INTENSITY MODIFIERS ---
            case 'piag':
                this.subImpactSynth.triggerAttackRelease("C0", "4n", time);
                break;
            case 'sukap':
                this.chronoPluckSynth.triggerAttackRelease("C1", time);
                break;
            case 'kupos':
                this.glitchSynth.triggerAttackRelease("G2", "32n", time);
                break;
            case 'lawal':
                this.noiseSlashSynth.triggerAttackRelease("2n", time);
                break;
            case 'kunta':
                this.metallicSynth.triggerAttackRelease("D3", "32n", time);
                break;
            case 'asanu':
                this.metallicSynth.triggerAttackRelease("A4", "64n", time);
                break;

            default:
                this.fmLeadSynth.triggerAttackRelease("C2", "16n", time);
                break;
        }
    }

    // -------------------------------------------------------------
    // 5. BALANCED, AUDIBLE ELEMENTAL MANIFESTATION BURST PROFILES
    // -------------------------------------------------------------
  // -------------------------------------------------------------
    // 5. EXACT 3-SECOND ELEMENTAL MANIFESTATION PROFILES
    // -------------------------------------------------------------
// -------------------------------------------------------------
    // 5. BALANCED, IMMEDIATE 5+ NOTE ELEMENTAL MANIFESTATION BURSTS
    // -------------------------------------------------------------
    playManifestationBurst(state) {
        if (!this.isInitialized) return;
        const now = Tone.now();
        const elId = state.element || "sfalhoy";

        switch (elId) {
            // =========================================================
            // 1. FIRE (SFALHOY): SUCTION WHOOSH -> FWOOM -> CRACKLING EMBERS
            // =========================================================
            case 'sfalhoy': {
                // Air sucked inward whoosh (starts immediately at now)
                this.noiseFilter.frequency.setValueAtTime(900, now);
                this.noiseFilter.frequency.exponentialRampToValueAtTime(150, now + 0.4);
                this.noiseSlashSynth.triggerAttackRelease("4n", now);

                // Sudden roaring FWOOM at 0.45s
                this.noiseFilter.frequency.exponentialRampToValueAtTime(2600, now + 0.9);
                this.subImpactSynth.triggerAttackRelease("C1", "4n", now + 0.45);

                // 6-Note Melodic Blaze Arpeggio (A2 -> C3 -> E3 -> G3 -> A3 -> C4)
                const fireMelody = ["A2", "C3", "E3", "G3", "A3", "C4"];
                fireMelody.forEach((n, idx) => {
                    this.fmLeadSynth.triggerAttackRelease(n, "16n", now + 0.5 + idx * 0.18);
                });

                // Crackling ember-like flare plucks at the end
                ["E4", "G4", "C5"].forEach((n, idx) => {
                    this.chronoPluckSynth.triggerAttackRelease(n, now + 1.8 + idx * 0.22);
                });
                break;
            }

            // =========================================================
            // 2. WATER (HANHUM): GLASSY WUMMM -> RUSHING SWELL -> CRYSTAL DROPLETS
            // =========================================================
           // =========================================================
            // 2. WATER (HANHUM): AUDIBLE RUSHING WATER & FLUID CASCADE
            // =========================================================
            case 'hanhum': {
                // Loud rushing water surge (400Hz -> 2400Hz sweep)
                this.noiseFilter.type = "bandpass";
                this.noiseFilter.Q.value = 2.2;
                this.noiseFilter.frequency.setValueAtTime(400, now);
                this.noiseFilter.frequency.exponentialRampToValueAtTime(2400, now + 1.2);
                this.noiseFilter.frequency.exponentialRampToValueAtTime(600, now + 3.0);
                this.noiseSlashSynth.volume.setValueAtTime(-1.0, now);
                this.noiseSlashSynth.triggerAttackRelease("1n", now);

                // 6-Note Flowing Liquid Waterfall Cascade
                const waterNotes = ["F2", "Ab2", "C3", "Eb3", "F3", "Ab3"];
                waterNotes.forEach((n, idx) => {
                    this.fmLeadSynth.triggerAttackRelease(n, "8n", now + 0.15 + idx * 0.22);
                });

                // Fluid chord swell + deep hydraulic breaker thud
                this.polyChordSynth.triggerAttackRelease(["F2", "C3", "Eb3", "Ab3"], "2n", now + 1.8);
                this.subImpactSynth.triggerAttackRelease("F1", "2n", now + 2.4);
                break;
            }
            // =========================================================
            // 3. EARTH (FALGA): STONE GROAN -> SUBTERRANEAN RUMBLE -> DEEP DOOM
            // =========================================================
            case 'falga': {
                // Low stone groan & subterranean rumble immediately
                this.droneFilter.frequency.setValueAtTime(90, now);
                this.droneFilter.frequency.linearRampToValueAtTime(250, now + 1.4);
                this.subImpactSynth.triggerAttackRelease("C1", "2n", now);

                // 6-Note Heavy Resonant Basalt Chime Melody
                const stoneMelody = ["C2", "Eb2", "G2", "Bb2", "C3", "Eb3"];
                stoneMelody.forEach((n, idx) => {
                    this.metallicSynth.triggerAttackRelease(n, "8n", now + 0.3 + idx * 0.25);
                });

                // Final Heavy Resonant DOOM at the end
                this.subImpactSynth.triggerAttackRelease("C0", "1n", now + 2.2);
                this.metallicSynth.triggerAttackRelease("C1", "2n", now + 2.2);
                break;
            }

            // =========================================================
            // 4. AIR (JALFINN): WHISTLING HARMONIC -> SPIRALING WIND -> SUDDEN BREATH
            // =========================================================
            case 'jalfinn': {
                // High flute-like whistling harmonic tone immediately
                this.chronoPluckSynth.triggerAttackRelease("E4", now);
                this.fmLeadSynth.triggerAttackRelease("B4", "4n", now + 0.1);

                // Spiraling wind gain & filter sweep
                this.noiseFilter.frequency.setValueAtTime(600, now + 0.2);
                this.noiseFilter.frequency.exponentialRampToValueAtTime(4500, now + 1.6);
                this.noiseSlashSynth.triggerAttackRelease("2n", now + 0.3);

                // 6-Note Circling Aerodynamic Flute Melody
                const windMelody = ["E3", "G#3", "B3", "E4", "G#4", "B4"];
                windMelody.forEach((n, idx) => {
                    this.fmLeadSynth.triggerAttackRelease(n, "16n", now + 0.4 + idx * 0.2);
                });

                // Sharp whoosh / sudden breath cutoff
                this.noiseSlashSynth.triggerAttackRelease("16n", now + 2.3);
                this.subImpactSynth.triggerAttackRelease("E1", "8n", now + 2.3);
                break;
            }

            // =========================================================
            // 5. LIGHTNING (IKLAD): ELECTRICAL HUM -> RISING CRACKLE -> VIOLENT KRAK
            // =========================================================
            case 'iklad': {
                // Accelerating electrical buzz & tiny arcs snapping immediately
                this.glitchSynth.triggerAttackRelease("D2", "8n", now);
                this.glitchSynth.triggerAttackRelease("D3", "16n", now + 0.15);
                this.glitchSynth.triggerAttackRelease("A3", "16n", now + 0.3);

                // 6-Note Fast Biting Electric Melody
                const sparkMelody = ["D3", "F#3", "A3", "C4", "E4", "A4"];
                sparkMelody.forEach((n, idx) => {
                    this.fmLeadSynth.triggerAttackRelease(n, "32n", now + 0.4 + idx * 0.14);
                });

                // Short violent KRAK (not a long thunderclap)
                this.metallicSynth.triggerAttackRelease("D3", "64n", now + 2.0);
                this.subImpactSynth.triggerAttackRelease("D1", "16n", now + 2.0);
                break;
            }

            // =========================================================
            // 6. DARK (WORULIM): SUB-BASS DRONE -> REVERSED WHISPER -> ABRUPT MUFFLE
            // =========================================================
            case 'worulim': {
                // Deep vibration / sub-bass drone immediately
                this.subImpactSynth.triggerAttackRelease("D1", "2n", now);

                // Reversed whisper harmonic filter sweep
                this.noiseFilter.frequency.setValueAtTime(1600, now + 0.1);
                this.noiseFilter.frequency.exponentialRampToValueAtTime(90, now + 1.8);
                this.noiseSlashSynth.triggerAttackRelease("2n", now + 0.1);

                // 6-Note Eerie Descending Dissonant Melody (D3 -> C3 -> Ab2 -> F2 -> D2 -> Ab1)
                const voidMelody = ["D3", "C3", "Ab2", "F2", "D2", "Ab1"];
                voidMelody.forEach((n, idx) => {
                    this.glitchSynth.triggerAttackRelease(n, "8n", now + 0.3 + idx * 0.22);
                });

                // Sound absorption / abrupt silence muffle
                this.droneFilter.frequency.setValueAtTime(70, now + 2.2);
                break;
            }

           // =========================================================
            // 7. PURE MANA (AMIN): FRACTAL GLITCH COSMIC ASTRAL ENGINE
            // =========================================================
            case 'amin': {
                // 1. Immediate Fractal Data-Matrix Glitch Burst (0.0s - 0.4s)
                const glitchStutter = ["D4", "A4", "F#5", "C#6", "A5", "D6"];
                glitchStutter.forEach((pitch, i) => {
                    this.glitchSynth.triggerAttackRelease(pitch, "64n", now + i * 0.05, 0.95);
                    this.chronoPluckSynth.triggerAttackRelease(pitch, now + i * 0.05);
                });

                // 2. Cosmic Astral Space Chord Bloom (0.35s - 2.8s)
                this.polyChordSynth.triggerAttackRelease(["D3", "A3", "E4", "F#4", "C#5"], "2n", now + 0.35, 0.9);
                this.fmLeadSynth.triggerAttackRelease("D3", "1n", now + 0.35, 0.85);

                // 3. Shimmering Fractal Crystal Arpeggio (0.5s - 1.8s)
                const fractalNotes = ["D4", "F#4", "A4", "C#5", "E5", "A5", "C#6", "D6"];
                fractalNotes.forEach((note, idx) => {
                    this.fmLeadSynth.triggerAttackRelease(note, "32n", now + 0.5 + idx * 0.14, 0.8);
                    if (idx % 2 === 0) {
                        this.metallicSynth.triggerAttackRelease(note, "64n", now + 0.5 + idx * 0.14);
                    }
                });

                // 4. Second Wave Rapid Particle Glitch Cascades (1.8s - 2.4s)
                ["C#6", "A5", "F#5", "E5", "A4", "D4"].forEach((p, i) => {
                    this.glitchSynth.triggerAttackRelease(p, "64n", now + 1.8 + i * 0.06, 0.85);
                });

                // 5. Dimensional Astral Gong & Sub-Bass Core Implosion (2.2s)
                this.subImpactSynth.triggerAttackRelease("D1", "2n", now + 2.2, 1.0);
                this.metallicSynth.triggerAttackRelease("D2", "2n", now + 2.2, 0.9);
                this.polyChordSynth.triggerAttackRelease(["D4", "A4", "F#5", "D6"], "1n", now + 2.2, 0.75);
                break;
            }

            // =========================================================
            // 8. LIGHT (ERLAAW): SUBTLE CHOIR HARMONY + LOUD BELL RING
            // =========================================================
            case 'erlaaw':
            default: {
                // Subtle choir harmony starting immediately
                this.choirFilter1.frequency.setValueAtTime(320, now);
                this.choirFilter1.frequency.exponentialRampToValueAtTime(720, now + 1.2);
                this.choirFilter2.frequency.setValueAtTime(850, now);
                this.choirFilter2.frequency.exponentialRampToValueAtTime(1200, now + 1.2);
                this.choirSynth.triggerAttackRelease(["G2", "D3", "B3"], 2.4, now);

                // 6-Note Shimmering Celestial Melody
                const lightChimes = ["G3", "B3", "D4", "F#4", "A4", "D5"];
                lightChimes.forEach((n, idx) => {
                    this.fmLeadSynth.triggerAttackRelease(n, "8n", now + 0.2 + idx * 0.2);
                });

                // Loud Cathedral Bell Ring
                this.metallicSynth.triggerAttackRelease("G2", "1n", now + 1.8);
                this.polyChordSynth.triggerAttackRelease(["G3", "D4", "B4"], "2n", now + 1.8);
                break;
            }
        }
    }
}

// Instantiate Global Engine
const ArcaneAudio = new ArcaneAudioEngine();

// UI Bridge Functions
async function toggleArcaneBGM() {
    await ArcaneAudio.init();
    const btn = document.getElementById("audioToggleBtn");
    
    if (ArcaneAudio.isPlaying) {
        ArcaneAudio.stopBGM();
        if (btn) {
            btn.innerHTML = "<span>🔇</span> BGM: Off";
            btn.classList.remove("active");
        }
    } else {
        if (typeof state !== "undefined") {
            ArcaneAudio.startBGM(state);
        }
        if (btn) {
            btn.innerHTML = "<span>🔊</span> BGM: On";
            btn.classList.add("active");
        }
    }
}

function playInscriptionAudio() {
    if (typeof state !== "undefined") {
        ArcaneAudio.init().then(() => {
            ArcaneAudio.playManifestationBurst(state);
        });
    }
}

// Automatically syncs and updates BGM sounds in real-time when switching elements, delivery, or modifiers
function syncAudioWithState() {
    if (ArcaneAudio && typeof state !== "undefined") {
        ArcaneAudio.updateParameters(state);
    }
}