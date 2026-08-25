

/* ==========================================================================
   MAGIC ARRAY MANIFEST & RADIAL INSCRIPTION ENGINE
   Full 7-Stage Radial Genesis (0° to 360° Tracing with Complete Rail Coverage)
   ========================================================================== */

let arrayManifestState = {
    isManifesting: false,
    timerId: null
};

// -------------------------------------------------------------
// 1. INJECT STAGED 0° TO 360° RADIAL INSCRIPTION STYLES
// -------------------------------------------------------------
function injectManifestStyles() {
    if (document.getElementById("arrayManifestStyles")) return;

    const style = document.createElement("style");
    style.id = "arrayManifestStyles";
    style.textContent = `
        /* Cursor styling for center hub trigger */
        #arcaneSpellCircleSVG .array-nexus-group,
        #arcaneSpellCircleSVG .yinyang-triad-rotation,
        #arcaneSpellCircleSVG .mini-combo-yinyang {
            cursor: pointer;
        }

        /* Initial Hide during Manifest Inscription */
        #arcaneSpellCircleSVG.is-manifesting .stage-elem,
        #arcaneSpellCircleSVG.is-manifesting .array-ruluwar-orbital-system,
        #arcaneSpellCircleSVG.is-manifesting .harmonic-laser-bridge,
        #arcaneSpellCircleSVG.is-manifesting .inscribe-triquetra-blade,
        #arcaneSpellCircleSVG.is-manifesting .inscribe-triquetra-spine,
        #arcaneSpellCircleSVG.is-manifesting .tip-subnode-group {
            opacity: 0;
        }

        /* Pure Circular Tracing Keyframes with Exact Perimeter Coverage */
        @keyframes manifestDrawCircInnerRail {
            0%   { stroke-dashoffset: 1000; opacity: 0; }
            10%  { opacity: 1; }
            100% { stroke-dashoffset: 0; opacity: 1; }
        }
        @keyframes manifestDrawCircMidRail {
            0%   { stroke-dashoffset: 1400; opacity: 0; }
            10%  { opacity: 1; }
            100% { stroke-dashoffset: 0; opacity: 1; }
        }
        @keyframes manifestDrawCircOuterRail {
            0%   { stroke-dashoffset: 1800; opacity: 0; }
            10%  { opacity: 1; }
            100% { stroke-dashoffset: 0; opacity: 1; }
        }
        @keyframes manifestDrawCircSubRings {
            0%   { stroke-dashoffset: 1400; opacity: 0; }
            10%  { opacity: 1; }
            100% { stroke-dashoffset: 0; opacity: 1; }
        }
        @keyframes manifestDrawBladeFast {
            0%   { stroke-dashoffset: 3000; opacity: 0; }
            15%  { opacity: 0.45; }
            100% { stroke-dashoffset: 0; opacity: 0.45; }
        }
        @keyframes manifestDrawGrandCirc {
            0%   { stroke-dashoffset: 3600; opacity: 0; }
            10%  { opacity: 1; }
            100% { stroke-dashoffset: 0; opacity: 1; }
        }
        @keyframes manifestRayOutward {
            0%   { stroke-dashoffset: 180; opacity: 0; }
            15%  { opacity: 1; }
            100% { stroke-dashoffset: 0; opacity: 1; }
        }
        @keyframes manifestRuneIgniteInPlace {
            0%   { opacity: 0; }
            50%  { opacity: 1; filter: drop-shadow(0 0 18px currentColor); }
            100% { opacity: 1; filter: none; }
        }
        @keyframes manifestGrandChantSweep {
            0%   { opacity: 0; letter-spacing: 8px; }
            40%  { opacity: 1; }
            100% { opacity: 0.96; letter-spacing: 3px; }
        }
        @keyframes manifestSubChantSweep {
            0%   { opacity: 0; letter-spacing: 4px; }
            40%  { opacity: 1; }
            100% { opacity: 0.90; letter-spacing: 1.2px; }
        }
        @keyframes manifestFadeInLayer {
            0%   { opacity: 0; }
            100% { opacity: 1; }
        }
        @keyframes manifestRadialShockwave {
            0%   { r: 0; opacity: 0.95; stroke-width: 8; }
            50%  { opacity: 0.6; }
            100% { r: 460; opacity: 0; stroke-width: 1; }
        }

        /* STAGE 0: Center 3-Sided Yin-Yang */
        #arcaneSpellCircleSVG.is-manifesting .inscribe-array-bg {
            animation: manifestFadeInLayer 1.4s ease-out 0.1s forwards;
        }
        #arcaneSpellCircleSVG.is-manifesting .inscribe-nexus-ring {
            stroke-dasharray: 600; stroke-dashoffset: 600;
            animation: manifestDrawCircInnerRail 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.2s forwards;
        }
        #arcaneSpellCircleSVG.is-manifesting .yinyang-triad-rotation path {
            animation: manifestRuneIgniteInPlace 0.7s ease-out 0.3s forwards;
        }
        #arcaneSpellCircleSVG.is-manifesting .mini-combo-yinyang {
            animation: manifestRuneIgniteInPlace 0.7s ease-out 0.5s forwards;
        }

        /* STAGE 1: Rail Tracks Tracing with Complete 360° Circumferences */
        #arcaneSpellCircleSVG.is-manifesting .inscribe-rail-inner {
            stroke-dasharray: 1000; stroke-dashoffset: 1000;
            animation: manifestDrawCircInnerRail 0.9s cubic-bezier(0.4, 0, 0.2, 1) 0.8s forwards;
        }
        #arcaneSpellCircleSVG.is-manifesting .inscribe-rail-mid {
            stroke-dasharray: 1400; stroke-dashoffset: 1400;
            animation: manifestDrawCircMidRail 1.0s cubic-bezier(0.4, 0, 0.2, 1) 0.9s forwards;
        }
        #arcaneSpellCircleSVG.is-manifesting .inscribe-rail-outer {
            stroke-dasharray: 1800; stroke-dashoffset: 1800;
            animation: manifestDrawCircOuterRail 1.1s cubic-bezier(0.4, 0, 0.2, 1) 1.0s forwards;
        }
        #arcaneSpellCircleSVG.is-manifesting #astrolabeInnerTriad .inscribe-conduit-loop {
            stroke-dasharray: 1600; stroke-dashoffset: 1600;
            animation: manifestDrawCircInnerRail 1.1s cubic-bezier(0.4, 0, 0.2, 1) 0.9s forwards;
        }

        /* STAGE 2: Sub-Circles Inscription & Morphed Hulls */
        #arcaneSpellCircleSVG.is-manifesting #astrolabeInnerTriad .inscribe-sub-bg {
            animation: manifestFadeInLayer 0.6s ease-out 1.5s forwards;
        }
        #arcaneSpellCircleSVG.is-manifesting #astrolabeInnerTriad .inscribe-sub-core-ring {
            stroke-dasharray: 200; stroke-dashoffset: 200;
            animation: manifestDrawCircInnerRail 0.6s cubic-bezier(0.4, 0, 0.2, 1) 1.6s forwards;
        }
        #arcaneSpellCircleSVG.is-manifesting #astrolabeInnerTriad .inscribe-sub-core-rune {
            animation: manifestRuneIgniteInPlace 0.5s ease-out 1.8s forwards;
        }
        #arcaneSpellCircleSVG.is-manifesting #astrolabeInnerTriad .inscribe-sub-conduit-ray {
            stroke-dasharray: 100; stroke-dashoffset: 100;
            animation: manifestRayOutward 0.4s ease-out 2.0s forwards;
        }
        #arcaneSpellCircleSVG.is-manifesting #astrolabeInnerTriad .inscribe-sub-delivery-ring {
            stroke-dasharray: 1000; stroke-dashoffset: 1000;
            animation: manifestDrawCircSubRings 0.7s cubic-bezier(0.4, 0, 0.2, 1) 2.1s forwards;
        }
        #arcaneSpellCircleSVG.is-manifesting #astrolabeInnerTriad .inscribe-sub-delivery-rune {
            animation: manifestRuneIgniteInPlace 0.5s ease-out 2.3s forwards;
        }
        #arcaneSpellCircleSVG.is-manifesting #astrolabeInnerTriad .inscribe-sub-modifier-ring {
            stroke-dasharray: 1400; stroke-dashoffset: 1400;
            animation: manifestDrawCircSubRings 0.8s cubic-bezier(0.4, 0, 0.2, 1) 2.4s forwards;
        }
        #arcaneSpellCircleSVG.is-manifesting #astrolabeInnerTriad .inscribe-sub-modifier-rune,
        #arcaneSpellCircleSVG.is-manifesting #astrolabeInnerTriad .inscribe-sub-constellation {
            animation: manifestRuneIgniteInPlace 0.5s ease-out 2.6s forwards;
        }
        #arcaneSpellCircleSVG.is-manifesting #astrolabeInnerTriad .inscribe-sub-hull,
        #arcaneSpellCircleSVG.is-manifesting #astrolabeInnerTriad .inscribe-sub-hull-inner,
        #arcaneSpellCircleSVG.is-manifesting #astrolabeInnerTriad .inscribe-sub-halo,
        #arcaneSpellCircleSVG.is-manifesting #astrolabeInnerTriad .inscribe-sub-border-ring {
            stroke-dasharray: 1400; stroke-dashoffset: 1400;
            animation: manifestDrawCircSubRings 0.8s cubic-bezier(0.4, 0, 0.2, 1) 2.7s forwards;
        }
        #arcaneSpellCircleSVG.is-manifesting #astrolabeInnerTriad .inscribe-sub-hull-fins,
        #arcaneSpellCircleSVG.is-manifesting #astrolabeInnerTriad .inscribe-sub-lattice {
            animation: manifestFadeInLayer 0.6s ease-out 2.8s forwards;
        }
        #arcaneSpellCircleSVG.is-manifesting #astrolabeInnerTriad .inscribe-sub-border-chant {
            animation: manifestSubChantSweep 0.8s ease-out 2.9s forwards;
        }

        /* STAGE 3: Mid-Ring Ruluwar Crown */
        #arcaneSpellCircleSVG.is-manifesting .array-ruluwar-orbital-system {
            animation: manifestFadeInLayer 0.8s ease-out 2.8s forwards;
        }
        #arcaneSpellCircleSVG.is-manifesting .inscribe-ruluwar-glyph {
            animation: manifestRuneIgniteInPlace 0.6s ease-out 2.9s forwards;
        }

        /* STAGE 4: Outer Triad & Laser Bridges */
        #arcaneSpellCircleSVG.is-manifesting .harmonic-laser-bridge {
            stroke-dasharray: 600; stroke-dashoffset: 600;
            animation: manifestRayOutward 1.0s ease-out 3.3s forwards;
        }
        #arcaneSpellCircleSVG.is-manifesting #astrolabeOuterTriad .inscribe-conduit-loop {
            stroke-dasharray: 1800; stroke-dashoffset: 1800;
            animation: manifestDrawCircOuterRail 1.0s cubic-bezier(0.4, 0, 0.2, 1) 3.4s forwards;
        }
        #arcaneSpellCircleSVG.is-manifesting #astrolabeOuterTriad .inscribe-sub-hull,
        #arcaneSpellCircleSVG.is-manifesting #astrolabeOuterTriad .inscribe-sub-core-ring,
        #arcaneSpellCircleSVG.is-manifesting #astrolabeOuterTriad .inscribe-sub-delivery-ring {
            stroke-dasharray: 1400; stroke-dashoffset: 1400;
            animation: manifestDrawCircSubRings 0.8s cubic-bezier(0.4, 0, 0.2, 1) 3.5s forwards;
        }
        #arcaneSpellCircleSVG.is-manifesting #astrolabeOuterTriad .inscribe-sub-core-rune,
        #arcaneSpellCircleSVG.is-manifesting #astrolabeOuterTriad .inscribe-sub-delivery-rune {
            animation: manifestRuneIgniteInPlace 0.5s ease-out 3.7s forwards;
        }

        /* STAGE 5: Dual Celtic Triquetras & Blade-Tip Sub-Circles */
        #arcaneSpellCircleSVG.is-manifesting .inscribe-triquetra-blade {
            stroke-dasharray: 3000; stroke-dashoffset: 3000;
            animation: manifestDrawBladeFast 1.2s cubic-bezier(0.4, 0, 0.2, 1) 3.4s forwards;
        }
        #arcaneSpellCircleSVG.is-manifesting .inscribe-triquetra-spine {
            stroke-dasharray: 2800; stroke-dashoffset: 2800;
            animation: manifestDrawBladeFast 1.0s ease-out 3.6s forwards;
        }

        #arcaneSpellCircleSVG.is-manifesting .tip-subnode-group .inscribe-sub-bg {
            animation: manifestFadeInLayer 0.6s ease-out 3.6s forwards;
        }
        #arcaneSpellCircleSVG.is-manifesting .tip-subnode-group .inscribe-sub-core-ring {
            stroke-dasharray: 200; stroke-dashoffset: 200;
            animation: manifestDrawCircInnerRail 0.6s cubic-bezier(0.4, 0, 0.2, 1) 3.7s forwards;
        }
        #arcaneSpellCircleSVG.is-manifesting .tip-subnode-group .inscribe-sub-core-rune {
            animation: manifestRuneIgniteInPlace 0.5s ease-out 3.9s forwards;
        }
        #arcaneSpellCircleSVG.is-manifesting .tip-subnode-group .inscribe-sub-delivery-ring {
            stroke-dasharray: 1000; stroke-dashoffset: 1000;
            animation: manifestDrawCircSubRings 0.7s cubic-bezier(0.4, 0, 0.2, 1) 3.9s forwards;
        }
        #arcaneSpellCircleSVG.is-manifesting .tip-subnode-group .inscribe-sub-delivery-rune {
            animation: manifestRuneIgniteInPlace 0.5s ease-out 4.1s forwards;
        }
        #arcaneSpellCircleSVG.is-manifesting .tip-subnode-group .inscribe-sub-modifier-ring {
            stroke-dasharray: 1400; stroke-dashoffset: 1400;
            animation: manifestDrawCircSubRings 0.7s cubic-bezier(0.4, 0, 0.2, 1) 4.1s forwards;
        }
        #arcaneSpellCircleSVG.is-manifesting .tip-subnode-group .inscribe-sub-modifier-rune {
            animation: manifestRuneIgniteInPlace 0.5s ease-out 4.3s forwards;
        }
        #arcaneSpellCircleSVG.is-manifesting .tip-subnode-group .inscribe-sub-hull,
        #arcaneSpellCircleSVG.is-manifesting .tip-subnode-group .inscribe-sub-border-ring {
            stroke-dasharray: 1400; stroke-dashoffset: 1400;
            animation: manifestDrawCircSubRings 0.8s cubic-bezier(0.4, 0, 0.2, 1) 4.2s forwards;
        }
        #arcaneSpellCircleSVG.is-manifesting .tip-subnode-group .inscribe-sub-border-chant {
            animation: manifestSubChantSweep 0.7s ease-out 4.4s forwards;
        }

        /* STAGE 6: Grand Encompassing 38px Runic Chant Circle */
        #arcaneSpellCircleSVG.is-manifesting .inscribe-grand-border {
            stroke-dasharray: 3600; stroke-dashoffset: 3600;
            animation: manifestDrawGrandCirc 1.0s cubic-bezier(0.4, 0, 0.2, 1) 4.2s forwards;
        }
        #arcaneSpellCircleSVG.is-manifesting .inscribe-grand-chant {
            animation: manifestGrandChantSweep 1.0s ease-out 4.4s forwards;
        }
    `;
    document.head.appendChild(style);
}

// -------------------------------------------------------------
// 2. MASTER TRIGGER: MANIFEST RADIAL INSCRIPTION (CLEAN RE-MOUNT)
// -------------------------------------------------------------
function triggerArrayManifestAnimation() {
    if (arrayManifestState.isManifesting) return;
    arrayManifestState.isManifesting = true;

    injectManifestStyles();

    // Randomize initial phase angle so sub-circles start from dynamic, organic positions
    if (typeof arrayAstrolabe !== "undefined") {
        if (arrayAstrolabe.rafId) {
            cancelAnimationFrame(arrayAstrolabe.rafId);
            arrayAstrolabe.rafId = null;
        }
        arrayAstrolabe.phase = Math.floor(Math.random() * 360);
    }

    // Play Audio Symphony
    if (typeof playInscriptionAudio === "function") {
        playInscriptionAudio();
    } else if (typeof ArcaneAudio !== "undefined" && typeof arrayState !== "undefined") {
        ArcaneAudio.init().then(() => {
            ArcaneAudio.playArrayManifestationBurst(arrayState);
        });
    }

    // Clean DOM Re-Mount starting at t=0s with all keyframes in sync
    const container = document.getElementById("spellCircleContainer");
    if (container && typeof generateArrayCircleSVG === "function") {
        container.innerHTML = generateArrayCircleSVG(true);
    }

    wireCenterHubTrigger();

    if (arrayManifestState.timerId) {
        clearTimeout(arrayManifestState.timerId);
    }

    arrayManifestState.timerId = setTimeout(() => {
        arrayManifestState.isManifesting = false;
        if (typeof renderArrayCircleSVG === "function") {
            renderArrayCircleSVG();
        }
    }, 5200);
}

// -------------------------------------------------------------
// 3. CONTEXT-AWARE HOOK FOR triggerInscriptionAnimation()
// -------------------------------------------------------------
(function setupContextAwareManifestHook() {
    const existingTrigger = window.triggerInscriptionAnimation;

    window.triggerInscriptionAnimation = function() {
        const isArrayMode = (typeof arrayState !== "undefined" && arrayState.mode === "array") ||
                            document.getElementById("astrolabeInnerTriad") !== null;

        if (isArrayMode) {
            triggerArrayManifestAnimation();
        } else if (typeof existingTrigger === "function") {
            existingTrigger();
        } else {
            const container = document.getElementById("spellCircleContainer");
            if (container && typeof generateSpellCircleSVG === "function") {
                container.innerHTML = generateSpellCircleSVG(true);
                setTimeout(() => {
                    if (typeof renderSpellCircle === "function") renderSpellCircle();
                }, 4500);
            }
        }
    };
})();

// -------------------------------------------------------------
// 4. ATTACH LISTENERS TO ARRAY CENTER HUB
// -------------------------------------------------------------
function wireCenterHubTrigger() {
    const svg = document.getElementById("arcaneSpellCircleSVG");
    if (svg && !svg.dataset.centerBound) {
        svg.dataset.centerBound = "true";
        svg.addEventListener("click", (e) => {
            const rect = svg.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const clickY = e.clientY - rect.top;

            // Map click to SVG ViewBox [-170, -170, 940, 940]
            const svgX = (clickX / rect.width) * 940 - 170;
            const svgY = (clickY / rect.height) * 940 - 170;

            const distFromCenter = Math.sqrt(Math.pow(svgX - 300, 2) + Math.pow(svgY - 300, 2));

            if (distFromCenter <= 60) {
                e.stopPropagation();
                triggerArrayManifestAnimation();
            }
        });
    }
}

// -------------------------------------------------------------
// 5. AUTO-INITIALIZE & MUTATION OBSERVER
// -------------------------------------------------------------
function initManifestEngine() {
    injectManifestStyles();
    wireCenterHubTrigger();

    const observer = new MutationObserver(() => {
        wireCenterHubTrigger();
    });

    const target = document.getElementById("spellCircleContainer") || document.body;
    observer.observe(target, { childList: true, subtree: true });
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initManifestEngine);
} else {
    initManifestEngine();
}

// Global window attachments
window.triggerArrayManifestAnimation = triggerArrayManifestAnimation;
window.wireCenterHubTrigger = wireCenterHubTrigger;
