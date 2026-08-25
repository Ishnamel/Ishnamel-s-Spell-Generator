/* ==========================================================================
   TONE.JS PROCEDURAL ARCANE BGM & MULTI-VOICE MAGIC ARRAY SYNTHESIZER
   Synchronized Multi-Stage Manifestation Symphony & Tri-Elemental Living Drone
   ========================================================================== */

class ArcaneAudioEngine {
    constructor() {
        this.isInitialized = false;
        this.isPlaying = false;
        this.currentMode = "single"; // "single" | "array"
        this.currentElement = "sfalhoy";
        this.currentDelivery = "uruwak";
        this.currentModifiers = [];

        // Master Output Chain (+50% Loudness Boost & Limiter)
        this.limiter = null;
        this.masterVolume = null;
        this.reverb = null;
        this.chorus = null;

        // Continuous Living Elemental Drone Oscillators
        this.droneFilter = null;
        this.droneOscA = null;
        this.droneOscB = null;
        this.droneOscC = null; // 3rd Oscillator for Tri-Elemental Array Chords
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

        // Vocal Formant Choir Engine (For Erlaaw / Celestial Light)
        this.choirFilter1 = null;
        this.choirFilter2 = null;
        this.choirSynth = null;

        this.bgmLoop = null;

        // 1. Dynamic Elemental Drones (Exact Numeric Frequencies & Chords)
        this.elementDrones = {
            sfalhoy: { 
                freqA: 55.0,  freqB: 82.41, freqC: 110.0, typeA: "sawtooth", typeB: "triangle",
                filterFreq: 260, Q: 3.5, lfoRate: 3.2, lfoDepth: 160, noiseFreq: 650, noiseVol: -20,
                chord: ["A2", "C#3", "E3", "A3"]
            },
            hanhum:  { 
                freqA: 43.65, freqB: 65.41, freqC: 87.31, typeA: "sine",     typeB: "triangle",
                filterFreq: 220, Q: 2.0, lfoRate: 0.18, lfoDepth: 110, noiseFreq: 280, noiseVol: -24,
                chord: ["F2", "Ab2", "C3", "Eb3"]
            },
            falga:   { 
                freqA: 32.7,  freqB: 49.0,  freqC: 65.41, typeA: "triangle", typeB: "sawtooth",
                filterFreq: 130, Q: 5.5, lfoRate: 0.08, lfoDepth: 55,  noiseFreq: 150, noiseVol: -28,
                chord: ["C2", "Eb2", "G2", "C3"]
            },
            jalfinn: { 
                freqA: 82.41, freqB: 123.47, freqC: 164.81, typeA: "sine",    typeB: "sine",
                filterFreq: 420, Q: 2.5, lfoRate: 2.4, lfoDepth: 220, noiseFreq: 1100, noiseVol: -18,
                chord: ["E3", "G#3", "B3", "E4"]
            },
            iklad:   { 
                freqA: 36.71, freqB: 65.41, freqC: 146.83, typeA: "square",   typeB: "sawtooth",
                filterFreq: 300, Q: 4.0, lfoRate: 8.0, lfoDepth: 180, noiseFreq: 750, noiseVol: -22,
                chord: ["D2", "A2", "D3", "F#3"]
            },
            erlaaw:  { 
                freqA: 49.0,  freqB: 123.47, freqC: 196.0, typeA: "triangle", typeB: "sine",
                filterFreq: 420, Q: 2.0, lfoRate: 1.6, lfoDepth: 260, noiseFreq: 380, noiseVol: -28,
                chord: ["G2", "B2", "D3", "G3"]
            },
            worulim: { 
                freqA: 36.71, freqB: 51.91, freqC: 73.42, typeA: "sawtooth", typeB: "square",
                filterFreq: 180, Q: 5.5, lfoRate: 0.35, lfoDepth: 90, noiseFreq: 220, noiseVol: -24,
                chord: ["D2", "Ab2", "C3", "D3"]
            },
            amin:    { 
                freqA: 73.42, freqB: 110.0, freqC: 146.83, typeA: "sine",     typeB: "triangle",
                filterFreq: 360, Q: 3.0, lfoRate: 0.5, lfoDepth: 180, noiseFreq: 400, noiseVol: -22,
                chord: ["D3", "F#3", "A3", "C#4"]
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
    // 1. ASYNC INITIALIZATION & MASTER AUDIO CHAIN
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

        // Master Output Chain: Limiter + Volume Gain Staging
        this.limiter = new Tone.Limiter(-0.5).toDestination();
        this.masterVolume = new Tone.Volume(+4.5).connect(this.limiter);

        // Global Spatial Reverb & Stereo Chorus
        this.reverb = new Tone.Reverb({ decay: 4.5, preDelay: 0.12, wet: 0.42 }).connect(this.masterVolume);
        await this.reverb.generate();

        this.chorus = new Tone.Chorus(2.5, 3.5, 0.5).connect(this.reverb).start();

        // Continuous Tri-Harmonic Oscillators
        this.droneFilter = new Tone.Filter({ frequency: 240, type: "lowpass", rolloff: -24 }).connect(this.reverb);
        this.droneLFO = new Tone.LFO(0.5, 100, 320).connect(this.droneFilter.frequency).start();

        this.droneOscA = new Tone.FatOscillator({ frequency: 55.0, type: "sawtooth", spread: 15, count: 3 }).connect(this.droneFilter);
        this.droneOscA.volume.value = -3.5;

        this.droneOscB = new Tone.Oscillator({ frequency: 82.41, type: "triangle" }).connect(this.droneFilter);
        this.droneOscB.volume.value = -4.5;

        this.droneOscC = new Tone.Oscillator({ frequency: 110.0, type: "sine" }).connect(this.droneFilter);
        this.droneOscC.volume.value = -6.0;

        // Sub-Bass / Membrane Impact
        this.subImpactSynth = new Tone.MembraneSynth({
            pitchDecay: 0.08,
            octaves: 3.5,
            oscillator: { type: "sine" },
            envelope: { attack: 0.005, decay: 0.45, sustain: 0.01, release: 0.8 }
        }).connect(this.masterVolume);
        this.subImpactSynth.volume.value = +3.0;

        // Metallic Anvil & Scythe Blade Clangs
        this.metallicSynth = new Tone.MetalSynth({
            frequency: 220,
            envelope: { attack: 0.001, decay: 0.35, release: 0.2 },
            harmonicity: 4.1,
            modulationIndex: 32,
            resonance: 3500,
            octaves: 1.5
        }).connect(this.reverb);
        this.metallicSynth.volume.value = -7.0;

        // Crystalline FM Lead (Beams, Arpeggios, Lasers)
        this.fmLeadSynth = new Tone.FMSynth({
            harmonicity: 1.5,
            modulationIndex: 2.5,
            oscillator: { type: "triangle" },
            envelope: { attack: 0.03, decay: 0.22, sustain: 0.25, release: 0.55 },
            modulation: { type: "sine" },
            modulationEnvelope: { attack: 0.02, decay: 0.18, sustain: 0.1, release: 0.4 }
        }).connect(this.chorus);
        this.fmLeadSynth.volume.value = +0.5;

        // Aeromantic Noise Whoosh / Streamer Synthesizer
        this.noiseFilter = new Tone.Filter(240, "lowpass").connect(this.reverb);
        this.noiseGenerator = new Tone.Noise("pink").connect(this.noiseFilter);
        this.noiseGenerator.volume.value = -22.0;

        this.noiseSlashSynth = new Tone.NoiseSynth({
            noise: { type: "white" },
            envelope: { attack: 0.02, decay: 0.25, offset: 0 }
        }).connect(this.reverb);
        this.noiseSlashSynth.volume.value = -8.0;

        // Chrono-Staccato Pluck
        this.chronoPluckSynth = new Tone.PluckSynth({
            attackNoise: 1.2,
            dampening: 3500,
            resonance: 0.92
        }).connect(this.reverb);
        this.chronoPluckSynth.volume.value = -1.5;

        // Anti-Magic Ring-Modulation Glitch
        this.glitchSynth = new Tone.AMSynth({
            harmonicity: 2.75,
            oscillator: { type: "square" },
            envelope: { attack: 0.01, decay: 0.15, sustain: 0.05, release: 0.2 },
            modulation: { type: "sawtooth" }
        }).connect(this.reverb);
        this.glitchSynth.volume.value = -4.5;

        // Polyphonic Synthesis Chords & Domain Stabs
        this.polyChordSynth = new Tone.PolySynth(Tone.Synth, {
            oscillator: { type: "triangle" },
            envelope: { attack: 0.04, decay: 0.35, sustain: 0.35, release: 0.7 }
        }).connect(this.reverb);
        this.polyChordSynth.volume.value = -3.0;

        // Vocal Formant Choir
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
    // 2. START / STOP ARCANE BGM (SUPPORTS ARRAY & SINGLE CIRCLE)
    // -------------------------------------------------------------
    startBGM(stateOrArrayState) {
        if (!this.isInitialized) return;
        if (this.isPlaying) return;

        this.updateParameters(stateOrArrayState);

        let step = 0;
        const self = this;

        this.droneOscA.start();
        this.droneOscB.start();
        if (this.droneOscC) this.droneOscC.start();
        this.noiseGenerator.start();

        // Main Transport Rhythmic Loop
        this.bgmLoop = new Tone.Loop(time => {
            const groove = self.deliveryGrooves[self.currentDelivery] || self.deliveryGrooves.uruwak;
            
            // 1. Delivery Rhythm
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

            // 2. Interleaved Multi-Node Modifier Signature
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
        if (this.droneOscC) this.droneOscC.stop();
        if (this.noiseGenerator) this.noiseGenerator.stop();
        Tone.Transport.stop();
        this.isPlaying = false;
    }

    // -------------------------------------------------------------
    // 3. PARAMETER SYNCHRONIZER (DYNAMIC ARRAY CHORDS & SINGLE CIRCLE)
    // -------------------------------------------------------------
    updateParameters(stateOrArrayState) {
        if (!stateOrArrayState) return;

        const isArray = (typeof arrayState !== "undefined" && arrayState.mode === "array") || !!stateOrArrayState.nodes;

        if (isArray) {
            const arr = stateOrArrayState.nodes ? stateOrArrayState : (typeof arrayState !== "undefined" ? arrayState : null);
            if (!arr || !arr.nodes) return;

            const nA = arr.nodes.alpha;
            const nB = arr.nodes.beta;
            const nG = arr.nodes.gamma;

            this.currentMode = "array";
            this.currentElement = nA.element || "sfalhoy";
            this.currentDelivery = nA.delivery || "uruwak";

            let combinedMods = [];
            const maxLen = Math.max(nA.modifiers.length, nB.modifiers.length, nG.modifiers.length);
            for (let i = 0; i < maxLen; i++) {
                if (nA.modifiers[i]) combinedMods.push(nA.modifiers[i]);
                if (nB.modifiers[i]) combinedMods.push(nB.modifiers[i]);
                if (nG.modifiers[i]) combinedMods.push(nG.modifiers[i]);
            }
            this.currentModifiers = combinedMods;

            if (!this.isInitialized || !this.isPlaying) return;

            // Tri-Harmonic Drone Chords (Alpha + Beta + Gamma)
            const dA = this.elementDrones[nA.element] || this.elementDrones.sfalhoy;
            const dB = this.elementDrones[nB.element] || this.elementDrones.iklad;
            const dG = this.elementDrones[nG.element] || this.elementDrones.falga;

            this.droneOscA.frequency.rampTo(dA.freqA, 0.2);
            this.droneOscB.frequency.rampTo(dB.freqB, 0.2);
            if (this.droneOscC) this.droneOscC.frequency.rampTo(dG.freqC, 0.2);

            const blendedFilterFreq = (dA.filterFreq + dB.filterFreq + dG.filterFreq) / 3;
            this.droneFilter.frequency.rampTo(blendedFilterFreq, 0.25);

            const groove = this.deliveryGrooves[nA.delivery] || this.deliveryGrooves.uruwak;
            let targetBPM = groove.bpm;
            if (this.currentModifiers.includes('sapas')) targetBPM *= 1.35;
            if (this.currentModifiers.includes('tunbog')) targetBPM *= 0.65;

            Tone.Transport.bpm.rampTo(targetBPM, 0.25);

        } else {
            this.currentMode = "single";
            this.currentElement = stateOrArrayState.element || "sfalhoy";
            this.currentDelivery = stateOrArrayState.delivery || "uruwak";
            this.currentModifiers = stateOrArrayState.modifiers && stateOrArrayState.modifiers.length > 0 ? [...stateOrArrayState.modifiers] : [];

            if (!this.isInitialized || !this.isPlaying) return;

            const elData = this.elementDrones[this.currentElement] || this.elementDrones.amin;

            this.droneOscA.frequency.rampTo(elData.freqA, 0.15);
            this.droneOscB.frequency.rampTo(elData.freqB, 0.15);
            if (this.droneOscC) this.droneOscC.frequency.rampTo(elData.freqC || elData.freqA * 2, 0.15);

            this.droneFilter.frequency.rampTo(elData.filterFreq, 0.2);
            this.droneFilter.Q.value = elData.Q;

            const groove = this.deliveryGrooves[this.currentDelivery] || this.deliveryGrooves.uruwak;
            let targetBPM = groove.bpm;
            if (this.currentModifiers.includes('sapas')) targetBPM *= 1.35;
            if (this.currentModifiers.includes('tunbog')) targetBPM *= 0.65;

            Tone.Transport.bpm.rampTo(targetBPM, 0.25);
            this.noiseFilter.frequency.rampTo(elData.noiseFreq, 0.25);
            this.noiseGenerator.volume.rampTo(elData.noiseVol, 0.25);
        }
    }

    // -------------------------------------------------------------
    // 4. 42 DISTINCTIVE MODIFIER SOUND SIGNATURES
    // -------------------------------------------------------------
    playModifierAcousticSignature(modId, time) {
        switch (modId) {
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
                break;
            case 'tublag':
                this.fmLeadSynth.triggerAttackRelease("A2", "32n", time);
                this.fmLeadSynth.triggerAttackRelease("D3", "32n", time + 0.06);
                break;
            case 'tigkab':
                this.metallicSynth.triggerAttackRelease("C4", "64n", time);
                break;
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
                break;
            case 'talkib':
                this.chronoPluckSynth.triggerAttackRelease("D3", time);
                break;
            case 'litu':
                this.fmLeadSynth.triggerAttackRelease("G1", "4n", time);
                break;
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
    // 5. EXACT SYNCHRONIZED 5.2s MAGIC ARRAY MANIFESTATION SYMPHONY
    // -------------------------------------------------------------
    playArrayManifestationBurst(arrState) {
        if (!this.isInitialized) return;
        const now = Tone.now();

        const nA = arrState.nodes ? arrState.nodes.alpha : { element: "sfalhoy", modifiers: [] };
        const nB = arrState.nodes ? arrState.nodes.beta : { element: "iklad", modifiers: [] };
        const nG = arrState.nodes ? arrState.nodes.gamma : { element: "falga", modifiers: [] };

        const elA = nA.element || "sfalhoy";
        const elB = nB.element || "iklad";
        const elG = nG.element || "falga";

        const chordA = this.elementDrones[elA]?.chord || ["A2", "C3", "E3"];
        const chordB = this.elementDrones[elB]?.chord || ["D2", "F#2", "A2"];
        const chordG = this.elementDrones[elG]?.chord || ["C2", "G2", "C3"];

        // =========================================================================
        // STAGE 0 (0.0s - 0.9s): Center Singularity & 3-Sided Yin-Yang Genesis
        // =========================================================================
        // Sub-bass implosion kick
        this.subImpactSynth.triggerAttackRelease("C0", "2n", now);

        // Suction whoosh
        this.noiseFilter.type = "lowpass";
        this.noiseFilter.frequency.setValueAtTime(900, now);
        this.noiseFilter.frequency.exponentialRampToValueAtTime(140, now + 0.4);
        this.noiseSlashSynth.triggerAttackRelease("4n", now);

        // Tri-chord astral ignition bloom (0.3s)
        this.polyChordSynth.triggerAttackRelease([chordA[0], chordB[1], chordG[2]], "1n", now + 0.3, 0.85);

        // 3 Micro-Chimes for the 3 Combo Yin-Yang Eyes (0.35s, 0.45s, 0.55s)
        ["C4", "F#4", "A4"].forEach((pitch, i) => {
            this.chronoPluckSynth.triggerAttackRelease(pitch, now + 0.35 + i * 0.1);
            this.glitchSynth.triggerAttackRelease(pitch, "64n", now + 0.35 + i * 0.1, 0.6);
        });

        // =========================================================================
        // STAGE 1 (0.85s - 1.4s): Triangle Rails & Supersonic Particle Streamers
        // =========================================================================
        this.noiseFilter.frequency.setValueAtTime(320, now + 0.85);
        this.noiseFilter.frequency.exponentialRampToValueAtTime(3600, now + 1.4);
        this.noiseSlashSynth.triggerAttackRelease("4n", now + 0.9);

        // Supersonic laser streak arpeggio along the triangle rails
        ["C3", "G3", "C4", "G4"].forEach((p, idx) => {
            this.fmLeadSynth.triggerAttackRelease(p, "32n", now + 0.95 + idx * 0.08, 0.75);
        });

        // =========================================================================
        // STAGE 2 (1.45s - 2.8s): Inner Sub-Circles Inscription (Alpha -> Beta -> Gamma)
        // =========================================================================
        // 2a. Node Alpha (1.45s): Genesis Core Draws & Element Alpha Motif Ignites
        this.playSingleElementalMotif(elA, now + 1.45, 0, "16n");

        // 2b. Node Beta (1.85s): Modulation Core Draws, Fission Ribbon & Element Beta Motif
        this.playSingleElementalMotif(elB, now + 1.85, 1, "16n");

        // 2c. Node Gamma (2.25s): Apex Core Draws, Element Gamma Motif & Physical Hull Morph
        this.playSingleElementalMotif(elG, now + 2.25, -1, "8n");
        const latestModG = (nG.modifiers && nG.modifiers.length > 0) ? nG.modifiers[nG.modifiers.length - 1] : null;
        if (latestModG) {
            this.playHullMorphSignature(latestModG, now + 2.35);
        }

        // =========================================================================
        // STAGE 3 (2.85s - 3.3s): Mid-Ring Ruluwar Infinity Crown (36-Rune Wave)
        // =========================================================================
        // Rhythmic 6-pip infinity clockwork cascade
        ["D3", "F#3", "A3", "D4", "F#4", "A4"].forEach((p, i) => {
            this.chronoPluckSynth.triggerAttackRelease(p, now + 2.85 + i * 0.06);
        });

        // =========================================================================
        // STAGE 4 (3.40s - 4.2s): Dual Grand Celtic Triquetras & Merkabah Laser Bridges
        // =========================================================================
        // Crystalline laser bridge arpeggio connecting to outer orbit
        const merkabahLaserArp = ["D3", "A3", "D4", "F#4", "A4", "D5"];
        merkabahLaserArp.forEach((p, idx) => {
            this.fmLeadSynth.triggerAttackRelease(p, "32n", now + 3.4 + idx * 0.10, 0.85);
            if (idx % 2 === 0) {
                this.chronoPluckSynth.triggerAttackRelease(p, now + 3.4 + idx * 0.10);
            }
        });

        // Blade scythe whoosh
        this.noiseSlashSynth.triggerAttackRelease("4n", now + 3.6);

        // =========================================================================
        // STAGE 5 (4.25s - 5.2s): Grand 38px Outer Chant Sweep & Synthesis Resolution
        // =========================================================================
        // Atmospheric perimeter sweep
        this.noiseFilter.frequency.setValueAtTime(600, now + 4.25);
        this.noiseFilter.frequency.exponentialRampToValueAtTime(4800, now + 4.8);
        this.noiseSlashSynth.triggerAttackRelease("2n", now + 4.3);

        // Cathedral Bell Strike & Deep Sub-Bass Resolution
        this.metallicSynth.triggerAttackRelease("C1", "1n", now + 4.6, 1.0);
        this.subImpactSynth.triggerAttackRelease("C0", "1n", now + 4.6, 1.0);

        // Full Tri-Elemental Grand Synthesis Chord (Fusing all 3 active elements)
        this.polyChordSynth.triggerAttackRelease([
            chordA[0], chordA[1],
            chordB[1], chordB[2],
            chordG[0], chordG[2]
        ], "2n", now + 4.6, 0.95);
    }

    // Helper: Distinct, rich 3-note elemental motif
    playSingleElementalMotif(elId, time, octaveShift = 0, length = "16n") {
        switch (elId) {
            case "sfalhoy": // Fire: Ascending flame arpeggio
                ["A2", "E3", "C4"].forEach((n, i) => {
                    this.fmLeadSynth.triggerAttackRelease(n, length, time + i * 0.08);
                });
                break;
            case "hanhum": // Water: Liquid drop cascade
                ["F2", "C3", "Ab3"].forEach((n, i) => {
                    this.fmLeadSynth.triggerAttackRelease(n, length, time + i * 0.08);
                });
                break;
            case "falga": // Earth: Heavy resonant basalt chime
                ["C2", "G2", "Eb3"].forEach((n, i) => {
                    this.metallicSynth.triggerAttackRelease(n, length, time + i * 0.09);
                });
                break;
            case "jalfinn": // Wind: High whistling flute
                ["E3", "B3", "G#4"].forEach((n, i) => {
                    this.chronoPluckSynth.triggerAttackRelease(n, time + i * 0.07);
                });
                break;
            case "iklad": // Lightning: Electric snap & crackle
                ["D2", "A2", "D4"].forEach((n, i) => {
                    this.glitchSynth.triggerAttackRelease(n, "64n", time + i * 0.05);
                });
                break;
            case "erlaaw": // Light: Cathedral chime
                this.metallicSynth.triggerAttackRelease("G2", "2n", time);
                this.fmLeadSynth.triggerAttackRelease("D4", length, time + 0.05);
                break;
            case "worulim": // Void: Sub-bass descending muffle
                ["D3", "Ab2", "D2"].forEach((n, i) => {
                    this.glitchSynth.triggerAttackRelease(n, length, time + i * 0.08);
                });
                break;
            case "amin": // Pure Aether: Fractal crystal glitch
            default:
                ["D4", "F#4", "C#5", "A5"].forEach((n, i) => {
                    this.chronoPluckSynth.triggerAttackRelease(n, time + i * 0.05);
                });
                break;
        }
    }

    // Helper: Physical Hull Morph Audio Signature (Triggers when Node Gamma morphs)
    playHullMorphSignature(modId, time) {
        switch (modId) {
            case "taddum": // Sawblade: Rapid metallic blade whir
                this.metallicSynth.triggerAttackRelease("F#3", "32n", time);
                this.metallicSynth.triggerAttackRelease("C4", "64n", time + 0.06);
                break;
            case "praba": // Octagonal Plate: Heavy anvil clamp
            case "kunta":
                this.metallicSynth.triggerAttackRelease("D2", "4n", time, 0.9);
                break;
            case "yinla": // Focus Fins: High-frequency beam ping
            case "yangga":
                this.fmLeadSynth.triggerAttackRelease("C4", "32n", time);
                this.chronoPluckSynth.triggerAttackRelease("G4", time);
                break;
            case "ngisngi": // Spinning Halos: Dual FM chord
                this.fmLeadSynth.triggerAttackRelease("D3", "32n", time);
                this.fmLeadSynth.triggerAttackRelease("A3", "32n", time + 0.08);
                break;
            case "piag": // Solar Overcharge: Electrical surge
                this.subImpactSynth.triggerAttackRelease("C0", "8n", time);
                this.glitchSynth.triggerAttackRelease("G2", "16n", time);
                break;
            default:
                this.chronoPluckSynth.triggerAttackRelease("C3", time);
                break;
        }
    }

    // -------------------------------------------------------------
    // 6. SINGLE CIRCLE ELEMENTAL MANIFESTATION BURST
    // -------------------------------------------------------------
    playManifestationBurst(state) {
        if (!this.isInitialized) return;
        const now = Tone.now();
        const elId = state.element || "sfalhoy";

        switch (elId) {
            case 'sfalhoy': {
                this.noiseFilter.frequency.setValueAtTime(900, now);
                this.noiseFilter.frequency.exponentialRampToValueAtTime(150, now + 0.4);
                this.noiseSlashSynth.triggerAttackRelease("4n", now);

                this.noiseFilter.frequency.exponentialRampToValueAtTime(2600, now + 0.9);
                this.subImpactSynth.triggerAttackRelease("C1", "4n", now + 0.45);

                ["A2", "C3", "E3", "G3", "A3", "C4"].forEach((n, idx) => {
                    this.fmLeadSynth.triggerAttackRelease(n, "16n", now + 0.5 + idx * 0.18);
                });
                ["E4", "G4", "C5"].forEach((n, idx) => {
                    this.chronoPluckSynth.triggerAttackRelease(n, now + 1.8 + idx * 0.22);
                });
                break;
            }
            case 'hanhum': {
                this.noiseFilter.type = "bandpass";
                this.noiseFilter.Q.value = 2.2;
                this.noiseFilter.frequency.setValueAtTime(400, now);
                this.noiseFilter.frequency.exponentialRampToValueAtTime(2400, now + 1.2);
                this.noiseSlashSynth.triggerAttackRelease("1n", now);

                ["F2", "Ab2", "C3", "Eb3", "F3", "Ab3"].forEach((n, idx) => {
                    this.fmLeadSynth.triggerAttackRelease(n, "8n", now + 0.15 + idx * 0.22);
                });
                this.polyChordSynth.triggerAttackRelease(["F2", "C3", "Eb3", "Ab3"], "2n", now + 1.8);
                this.subImpactSynth.triggerAttackRelease("F1", "2n", now + 2.4);
                break;
            }
            case 'falga': {
                this.droneFilter.frequency.setValueAtTime(90, now);
                this.droneFilter.frequency.linearRampToValueAtTime(250, now + 1.4);
                this.subImpactSynth.triggerAttackRelease("C1", "2n", now);

                ["C2", "Eb2", "G2", "Bb2", "C3", "Eb3"].forEach((n, idx) => {
                    this.metallicSynth.triggerAttackRelease(n, "8n", now + 0.3 + idx * 0.25);
                });
                this.subImpactSynth.triggerAttackRelease("C0", "1n", now + 2.2);
                this.metallicSynth.triggerAttackRelease("C1", "2n", now + 2.2);
                break;
            }
            case 'jalfinn': {
                this.chronoPluckSynth.triggerAttackRelease("E4", now);
                this.fmLeadSynth.triggerAttackRelease("B4", "4n", now + 0.1);

                this.noiseFilter.frequency.setValueAtTime(600, now + 0.2);
                this.noiseFilter.frequency.exponentialRampToValueAtTime(4500, now + 1.6);
                this.noiseSlashSynth.triggerAttackRelease("2n", now + 0.3);

                ["E3", "G#3", "B3", "E4", "G#4", "B4"].forEach((n, idx) => {
                    this.fmLeadSynth.triggerAttackRelease(n, "16n", now + 0.4 + idx * 0.2);
                });
                this.noiseSlashSynth.triggerAttackRelease("16n", now + 2.3);
                this.subImpactSynth.triggerAttackRelease("E1", "8n", now + 2.3);
                break;
            }
            case 'iklad': {
                this.glitchSynth.triggerAttackRelease("D2", "8n", now);
                this.glitchSynth.triggerAttackRelease("D3", "16n", now + 0.15);
                this.glitchSynth.triggerAttackRelease("A3", "16n", now + 0.3);

                ["D3", "F#3", "A3", "C4", "E4", "A4"].forEach((n, idx) => {
                    this.fmLeadSynth.triggerAttackRelease(n, "32n", now + 0.4 + idx * 0.14);
                });
                this.metallicSynth.triggerAttackRelease("D3", "64n", now + 2.0);
                this.subImpactSynth.triggerAttackRelease("D1", "16n", now + 2.0);
                break;
            }
            case 'worulim': {
                this.subImpactSynth.triggerAttackRelease("D1", "2n", now);

                this.noiseFilter.frequency.setValueAtTime(1600, now + 0.1);
                this.noiseFilter.frequency.exponentialRampToValueAtTime(90, now + 1.8);
                this.noiseSlashSynth.triggerAttackRelease("2n", now + 0.1);

                ["D3", "C3", "Ab2", "F2", "D2", "Ab1"].forEach((n, idx) => {
                    this.glitchSynth.triggerAttackRelease(n, "8n", now + 0.3 + idx * 0.22);
                });
                this.droneFilter.frequency.setValueAtTime(70, now + 2.2);
                break;
            }
            case 'amin': {
                ["D4", "A4", "F#5", "C#6", "A5", "D6"].forEach((pitch, i) => {
                    this.glitchSynth.triggerAttackRelease(pitch, "64n", now + i * 0.05, 0.95);
                    this.chronoPluckSynth.triggerAttackRelease(pitch, now + i * 0.05);
                });

                this.polyChordSynth.triggerAttackRelease(["D3", "A3", "E4", "F#4", "C#5"], "2n", now + 0.35, 0.9);
                this.fmLeadSynth.triggerAttackRelease("D3", "1n", now + 0.35, 0.85);

                ["D4", "F#4", "A4", "C#5", "E5", "A5", "C#6", "D6"].forEach((note, idx) => {
                    this.fmLeadSynth.triggerAttackRelease(note, "32n", now + 0.5 + idx * 0.14, 0.8);
                });
                this.subImpactSynth.triggerAttackRelease("D1", "2n", now + 2.2, 1.0);
                this.metallicSynth.triggerAttackRelease("D2", "2n", now + 2.2, 0.9);
                break;
            }
            case 'erlaaw':
            default: {
                this.choirFilter1.frequency.setValueAtTime(320, now);
                this.choirFilter1.frequency.exponentialRampToValueAtTime(720, now + 1.2);
                this.choirFilter2.frequency.setValueAtTime(850, now);
                this.choirFilter2.frequency.exponentialRampToValueAtTime(1200, now + 1.2);
                this.choirSynth.triggerAttackRelease(["G2", "D3", "B3"], 2.4, now);

                ["G3", "B3", "D4", "F#4", "A4", "D5"].forEach((n, idx) => {
                    this.fmLeadSynth.triggerAttackRelease(n, "8n", now + 0.2 + idx * 0.2);
                });
                this.metallicSynth.triggerAttackRelease("G2", "1n", now + 1.8);
                this.polyChordSynth.triggerAttackRelease(["G3", "D4", "B4"], "2n", now + 1.8);
                break;
            }
        }
    }

    // -------------------------------------------------------------
    // 7. INTERACTIVE UI SOUND FX
    // -------------------------------------------------------------
    playNodeSelectAudio(nodeKey, elId) {
        if (!this.isInitialized) return;
        const now = Tone.now();
        const notes = { alpha: "C4", beta: "E4", gamma: "G4" };
        const p = notes[nodeKey] || "C4";
        this.chronoPluckSynth.triggerAttackRelease(p, now);
        this.fmLeadSynth.triggerAttackRelease(p, "32n", now + 0.04, 0.7);
    }

    playAstrolabeSnapAudio(phaseAngle) {
        if (!this.isInitialized) return;
        const now = Tone.now();
        const chord = (phaseAngle === 60 || phaseAngle === 180) 
            ? ["C4", "E4", "G4", "B4"] // Merkabah Lock
            : ["D4", "A4", "D5"];      // Conjunction
        this.polyChordSynth.triggerAttackRelease(chord, "16n", now, 0.8);
        this.metallicSynth.triggerAttackRelease("C3", "32n", now, 0.6);
    }
}

// Instantiate Global Engine
const ArcaneAudio = new ArcaneAudioEngine();

// -------------------------------------------------------------
// GLOBAL CONTEXT-AWARE AUDIO TRIGGERS
// -------------------------------------------------------------
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
        const isArray = typeof arrayState !== "undefined" && arrayState.mode === "array";
        const targetState = isArray ? arrayState : (typeof state !== "undefined" ? state : null);
        
        if (targetState) {
            ArcaneAudio.startBGM(targetState);
        }
        if (btn) {
            btn.innerHTML = "<span>🔊</span> BGM: On";
            btn.classList.add("active");
        }
    }
}

function playInscriptionAudio() {
    const isArray = (typeof arrayState !== "undefined" && arrayState.mode === "array") ||
                    document.getElementById("astrolabeInnerTriad") !== null;

    ArcaneAudio.init().then(() => {
        if (isArray && typeof arrayState !== "undefined") {
            ArcaneAudio.playArrayManifestationBurst(arrayState);
        } else if (typeof state !== "undefined") {
            ArcaneAudio.playManifestationBurst(state);
        }
    });
}

function syncAudioWithState() {
    if (!ArcaneAudio) return;
    const isArray = typeof arrayState !== "undefined" && arrayState.mode === "array";
    const targetState = isArray ? arrayState : (typeof state !== "undefined" ? state : null);
    if (targetState) {
        ArcaneAudio.updateParameters(targetState);
    }
}

// Global window attachments
window.ArcaneAudio = ArcaneAudio;
window.toggleArcaneBGM = toggleArcaneBGM;
window.playInscriptionAudio = playInscriptionAudio;
window.syncAudioWithState = syncAudioWithState;