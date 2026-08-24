/* ==========================================================================
   ARCANE SPELL CIRCLE GIF EXPORTER ENGINE
   Captures connected manifestation drawing sequence -> transitions to idle loop
   ========================================================================== */

function clamp01(v) {
    return Math.max(0, Math.min(1, v));
}

function easeOutQuad(t) {
    return t * (2 - t);
}

function getStageProgress(t, start, end) {
    if (t <= start) return 0;
    if (t >= end) return 1;
    return easeOutQuad((t - start) / (end - start));
}

async function exportSpellCircleGIF() {
    const statusBtn = document.getElementById("exportGifBtn");
    const defaultBtnHtml = "<span>💾</span> Save as GIF"; // <-- Fixed default reset text

    try {
        if (statusBtn) {
            statusBtn.disabled = true;
            statusBtn.innerHTML = "⏳ Initializing Encoder...";
        }

        // Lazy-load gifshot library from CDN if not already present
        if (typeof gifshot === "undefined") {
            await new Promise((resolve, reject) => {
                const script = document.createElement("script");
                script.src = "https://cdnjs.cloudflare.com/ajax/libs/gifshot/0.3.2/gifshot.min.js";
                script.onload = resolve;
                script.onerror = () => reject(new Error("Could not load GIF encoder library"));
                document.head.appendChild(script);
            });
        }

        const spellTitle = (document.getElementById("spellTitle")?.innerText || "Spell").replace(/[^a-zA-Z0-9_-]/g, "_");
        const canvas = document.createElement("canvas");
        const size = 480;
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext("2d");

        // 42 frames covering 5.6s (Manifestation: 0.0s - 3.8s, Idle Loop: 3.8s - 5.6s)
        const totalDuration = 5.6;
        const numFrames = 42;
        const frameImages = [];

        for (let i = 0; i < numFrames; i++) {
            const t = (i / (numFrames - 1)) * totalDuration;
            const svgFrameString = generateProceduralFrameSVG(t, totalDuration);

            const svgBlob = new Blob([svgFrameString], { type: "image/svg+xml;charset=utf-8" });
            const url = URL.createObjectURL(svgBlob);

            const img = new Image();
            await new Promise((res, rej) => {
                img.onload = res;
                img.onerror = rej;
                img.src = url;
            });

            ctx.fillStyle = "#090b10";
            ctx.fillRect(0, 0, size, size);
            ctx.drawImage(img, 0, 0, size, size);
            URL.revokeObjectURL(url);

            frameImages.push(canvas.toDataURL("image/png"));

            if (statusBtn) {
                const pct = Math.round(((i + 1) / numFrames) * 75);
                statusBtn.innerHTML = `⏳ Inscribing (${pct}%)...`;
            }
        }

        if (statusBtn) statusBtn.innerHTML = "✨ Binding Arcane GIF (90%)...";

        gifshot.createGIF({
            images: frameImages,
            gifWidth: size,
            gifHeight: size,
            interval: totalDuration / numFrames,
            numFrames: numFrames,
            sampleInterval: 6
        }, function (obj) {
            if (!obj.error) {
                const link = document.createElement("a");
                link.download = `${spellTitle}_Circle.gif`;
                link.href = obj.image;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            } else {
                console.error("GIF export error", obj.error);
                alert("Could not generate animated GIF. Please try again.");
            }
            if (statusBtn) {
                statusBtn.disabled = false;
                statusBtn.innerHTML = defaultBtnHtml; // <-- Restores clean button state
            }
        });

    } catch (err) {
        console.error("GIF export failed", err);
        alert("Could not export animated GIF. Please check your network connection.");
        if (statusBtn) {
            statusBtn.disabled = false;
            statusBtn.innerHTML = defaultBtnHtml; // <-- Restores clean button state
        }
    }
}
// Generates an exact SVG frame with baked-in procedural attributes at timestamp t (in seconds)
function generateProceduralFrameSVG(t, totalDuration) {
    const elId1 = (typeof state !== "undefined" && state.element) ? state.element : 'sfalhoy';
    const elId2 = (typeof state !== "undefined" && state.secondaryElement) ? state.secondaryElement : null;
    const delId = (typeof state !== "undefined" && state.delivery) ? state.delivery : 'uruwak';
    const bodyParts = (typeof state !== "undefined" && state.bodyParts) ? state.bodyParts : ['whole_body'];

    const isDual = !!elId2;
    const isSameDual = isDual && elId1 === elId2;
    const isDifferentDual = isDual && elId1 !== elId2;

    const theme1 = (typeof ELEMENT_COLORS !== "undefined" && ELEMENT_COLORS[elId1]) ? ELEMENT_COLORS[elId1] : { primary: "#f97316", secondary: "#ea580c", glow: "rgba(249, 115, 22, 0.5)", bg: "#431407" };
    const theme2 = isDual ? ((typeof ELEMENT_COLORS !== "undefined" && ELEMENT_COLORS[elId2]) ? ELEMENT_COLORS[elId2] : theme1) : theme1;

    const activeMods = (typeof state !== "undefined" && state.modifiers ? state.modifiers : []).map(id => (typeof MODIFIERS !== 'undefined' ? MODIFIERS.find(m => m.id === id) : null)).filter(Boolean);
    const nonDurationMods = activeMods.filter(m => m.cat !== 'duration');
    const activeDurationMod = activeMods.find(m => m.cat === 'duration');

    const hb = typeof calculateHeartbeatMetrics === "function" ? calculateHeartbeatMetrics(activeMods, isSameDual) : { speed: 3.5, glow: 1.0, blur: 3.5, scaleDelta: 0.05 };

    const CX = 300;
    const CY = 300;
    const R_INNER = 135;
    const R_OUTER = 220;
    const R_BORDER_CHANT = 270;
    const CHANT_CIRCUMFERENCE = 2 * Math.PI * R_BORDER_CHANT;

    // --- TIMELINE STAGE PROGRESS CALCULATIONS ---
    const bgGlowOp = getStageProgress(t, 0.15, 1.2);
    const coreRingsProg = getStageProgress(t, 0.2, 1.0);
    const coreRuneOp = getStageProgress(t, 0.4, 1.1);
    const conduit1Prog = getStageProgress(t, 0.9, 1.4);
    const deliveryRingsProg = getStageProgress(t, 1.2, 2.1);
    const deliveryGlyphOp = getStageProgress(t, 1.5, 2.3);
    const conduit2Prog = getStageProgress(t, 1.9, 2.4);
    const latticeOp = getStageProgress(t, 2.0, 2.8) * 0.65;
    const modRingProg = getStageProgress(t, 2.2, 3.2);
    const modNodeProg = getStageProgress(t, 2.4, 3.1);
    const modGlyphOp = getStageProgress(t, 2.6, 3.3);
    const borderRingsProg = getStageProgress(t, 2.9, 3.8);
    const borderChantOp = getStageProgress(t, 3.1, 3.9) * 0.92;

    // --- PROCEDURAL ROTATIONS & PULSES ---
    const rotInner = (t * (360 / 50)).toFixed(2);
    const rotOuter = (-t * (360 / 80)).toFixed(2);
    const rotBorder = (t * (360 / 75)).toFixed(2);
    const rotYinYang = (-t * (360 / 35)).toFixed(2);
    const pulseScale = (1.0 + hb.scaleDelta * Math.sin((2 * Math.PI * t) / hb.speed)).toFixed(3);

    // Inscribed Chant Text
    const elObj1 = (typeof ELEMENTS !== 'undefined' ? ELEMENTS.find(e => e.id === elId1) : null) || { name: "Sfalhoy", stem: "Shal" };
    const delObj = (typeof DELIVERIES !== 'undefined' ? DELIVERIES.find(d => d.id === delId) : null) || { id: "uruwak", name: "Uruwak", stem: "Uru" };

    let mainStem = "";
    if (isDual && typeof getHybridReaction === 'function') {
        const hybrid = getHybridReaction(elId1, elId2);
        if (hybrid) {
            if (delObj.id === 'hlakbil') mainStem = "Hlak-" + hybrid.stem;
            else if (delObj.id === 'ruluwar') mainStem = "Rul-" + hybrid.stem;
            else if (delObj.id === 'iwati') mainStem = "Iwat-" + hybrid.stem;
            else mainStem = hybrid.stem + " " + delObj.stem;
        }
    }
    if (!mainStem) {
        if (delObj.id === 'hlakbil') mainStem = "Hlak-" + elObj1.name;
        else if (delObj.id === 'ruluwar') mainStem = "Rul-" + elObj1.name;
        else if (delObj.id === 'iwati') mainStem = "Iwat-" + elObj1.name;
        else mainStem = elObj1.name + " " + delObj.stem;
    }

    const highChantRaw = activeMods.length > 0 ? `${mainStem}-${activeMods.map(m => m.stem).join("-")}!` : `${mainStem}!`;
    const fullRunicBorderText = typeof generateFullBorderRunicChant === "function" ? generateFullBorderRunicChant(highChantRaw, R_BORDER_CHANT) : highChantRaw;

    // Delivery Runes & Conduits
    const numDeliveryRunes = 6;
    let deliveryRunesSVG = "";
    let innerConduitsSVG = "";
    const conduit1Offset = (200 * (1 - conduit1Prog)).toFixed(1);

    for (let i = 0; i < numDeliveryRunes; i++) {
        const angleDeg = (i * 360) / numDeliveryRunes;
        const angleRad = (angleDeg * Math.PI) / 180;
        const x = CX + R_INNER * Math.cos(angleRad);
        const y = CY + R_INNER * Math.sin(angleRad);
        const rune = typeof getDeliveryRunePath === "function" ? getDeliveryRunePath(delId, bodyParts) : "";
        const activeColor = isDifferentDual && (i % 2 === 1) ? theme2.primary : theme1.primary;

        deliveryRunesSVG += `
            <g transform="translate(${x.toFixed(2)}, ${y.toFixed(2)}) rotate(${angleDeg + 90})" color="${activeColor}" opacity="${deliveryGlyphOp}">
                ${rune}
            </g>
        `;

        innerConduitsSVG += `
            <line x1="${(CX + 64 * Math.cos(angleRad)).toFixed(2)}" y1="${(CY + 64 * Math.sin(angleRad)).toFixed(2)}" 
                  x2="${(CX + (R_INNER - 20) * Math.cos(angleRad)).toFixed(2)}" y2="${(CY + (R_INNER - 20) * Math.sin(angleRad)).toFixed(2)}" 
                  stroke="${activeColor}" stroke-width="${isSameDual ? '2.4' : '1.8'}" stroke-dasharray="200" stroke-dashoffset="${conduit1Offset}" />
        `;
    }

    // Modifier Runes & Outer Conduits
    let ruluwarDenseRingSVG = "";
    const isRuluwar = delId === 'ruluwar';

    if (isRuluwar && typeof getVerticalRuluwarGlyph === "function") {
        const ruluwarDensity = 36;
        for (let i = 0; i < ruluwarDensity; i++) {
            const angleDeg = (i * 360) / ruluwarDensity;
            const angleRad = (angleDeg * Math.PI) / 180;
            const x = CX + R_OUTER * Math.cos(angleRad);
            const y = CY + R_OUTER * Math.sin(angleRad);
            const activeColor = isDifferentDual && (i % 2 === 1) ? theme2.primary : theme1.primary;
            ruluwarDenseRingSVG += `
                <g transform="translate(${x.toFixed(2)}, ${y.toFixed(2)}) rotate(0)" color="${activeColor}" opacity="${(modGlyphOp * 0.85).toFixed(2)}">
                    ${getVerticalRuluwarGlyph()}
                </g>
            `;
        }
    }

    let modifierRunesSVG = "";
    let constellationPolygon = "";
    let outerConduitsSVG = "";
    const modCount = nonDurationMods.length;
    const conduit2Offset = (200 * (1 - conduit2Prog)).toFixed(1);
    const modNodeBorderOffset = (120 * (1 - modNodeProg)).toFixed(1);

    if (modCount > 0) {
        let polygonPoints = [];
        nonDurationMods.forEach((mod, i) => {
            const angleDeg = (i * 360) / modCount - 90;
            const angleRad = (angleDeg * Math.PI) / 180;
            const x = CX + R_OUTER * Math.cos(angleRad);
            const y = CY + R_OUTER * Math.sin(angleRad);
            polygonPoints.push(`${x.toFixed(2)},${y.toFixed(2)}`);

            const glyph = typeof getModifierGlyphPath === "function" ? getModifierGlyphPath(mod.id) : "";
            const activeColor = isDifferentDual && (i % 2 === 1) ? theme2.primary : theme1.primary;

            modifierRunesSVG += `
                <g transform="translate(${x.toFixed(2)}, ${y.toFixed(2)}) rotate(${angleDeg + 90})" color="${activeColor}">
                    <circle cx="0" cy="0" r="18" fill="#0c0e15" stroke="${activeColor}" stroke-width="1.8" filter="url(#arcaneGlow)" stroke-dasharray="120" stroke-dashoffset="${modNodeBorderOffset}" opacity="${modNodeProg}"/>
                    <circle cx="0" cy="0" r="22" fill="none" stroke="${activeColor}" stroke-width="0.75" stroke-dasharray="2 3" opacity="${modNodeProg}"/>
                    <g opacity="${modGlyphOp}">
                        ${glyph}
                    </g>
                </g>
            `;

            outerConduitsSVG += `
                <line x1="${(CX + 156 * Math.cos(angleRad)).toFixed(2)}" y1="${(CY + 156 * Math.sin(angleRad)).toFixed(2)}"
                      x2="${(CX + (R_OUTER - 24) * Math.cos(angleRad)).toFixed(2)}" y2="${(CY + (R_OUTER - 24) * Math.sin(angleRad)).toFixed(2)}"
                      stroke="${activeColor}" stroke-width="2" stroke-dasharray="200" stroke-dashoffset="${conduit2Offset}" />
            `;
        });

        if (modCount >= 2 && modGlyphOp > 0.1) {
            const pointsStr = polygonPoints.join(" ");
            constellationPolygon = `
                <polygon points="${pointsStr}" fill="none" stroke="${theme1.primary}" stroke-width="1.2" opacity="${(modGlyphOp * 0.4).toFixed(2)}"/>
                <polygon points="${pointsStr}" fill="${theme1.glow}" opacity="${(modGlyphOp * 0.12).toFixed(2)}"/>
            `;
        }
    }

    // Center Core
    let centerCoreSVG = "";
    const coreRingsOffset = (600 * (1 - coreRingsProg)).toFixed(1);

    if (isDifferentDual) {
        centerCoreSVG = `
            <g transform="translate(${CX}, ${CY}) scale(${pulseScale})">
                <circle cx="0" cy="0" r="74" fill="none" stroke="url(#dualThemeGradient)" stroke-width="1.5" stroke-dasharray="4 4" opacity="${(coreRingsProg * 0.7).toFixed(2)}"/>
                <circle cx="0" cy="0" r="64" fill="#0b0d13" stroke="url(#dualThemeGradient)" stroke-width="2.5" filter="url(#arcaneGlow)" stroke-dasharray="600" stroke-dashoffset="${coreRingsOffset}"/>

                <g transform="rotate(${rotYinYang})" opacity="${coreRuneOp}">
                    <path d="M 0,-54 A 54,54 0 0,1 0,54 A 27,27 0 0,1 0,0 A 27,27 0 0,0 0,-54 Z" fill="${theme1.bg}" stroke="none" opacity="0.95"/>
                    <path d="M 0,-54 A 54,54 0 0,0 0,54 A 27,27 0 0,1 0,0 A 27,27 0 0,0 0,-54 Z" fill="${theme2.bg}" stroke="none" opacity="0.95"/>

                    <path d="M 0,-54 A 54,54 0 0,1 0,54" fill="none" stroke="${theme1.primary}" stroke-width="2.2" filter="url(#arcaneGlow)"/>
                    <path d="M 0,54 A 54,54 0 0,1 0,-54" fill="none" stroke="${theme2.primary}" stroke-width="2.2" filter="url(#arcaneGlow)"/>

                    <path d="M 0,-54 A 27,27 0 0,0 0,0" fill="none" stroke="${theme1.primary}" stroke-width="2.4" filter="url(#arcaneGlow)"/>
                    <path d="M 0,0 A 27,27 0 0,1 0,54" fill="none" stroke="${theme2.primary}" stroke-width="2.4" filter="url(#arcaneGlow)"/>

                    <circle cx="0" cy="0" r="2" fill="#ffffff" opacity="0.9" filter="url(#arcaneGlow)"/>

                    <g transform="translate(0, -27)">
                        <circle cx="0" cy="0" r="14" fill="#0b0d13" stroke="${theme1.primary}" stroke-width="1.4" opacity="0.95"/>
                        <g transform="scale(0.30)" color="${theme1.primary}">
                            ${typeof getElementalRunePath === "function" ? getElementalRunePath(elId1) : ""}
                        </g>
                    </g>

                    <g transform="translate(0, 27)">
                        <circle cx="0" cy="0" r="14" fill="#0b0d13" stroke="${theme2.primary}" stroke-width="1.4" opacity="0.95"/>
                        <g transform="scale(0.30)" color="${theme2.primary}">
                            ${typeof getElementalRunePath === "function" ? getElementalRunePath(elId2) : ""}
                        </g>
                    </g>
                </g>
            </g>
        `;
    } else if (isSameDual) {
        centerCoreSVG = `
            <g transform="translate(${CX}, ${CY}) scale(${pulseScale})" color="${theme1.primary}">
                <circle cx="0" cy="0" r="88" fill="none" stroke="${theme1.primary}" stroke-width="0.8" stroke-dasharray="3 3" opacity="${(coreRingsProg * 0.6).toFixed(2)}"/>
                <circle cx="0" cy="0" r="78" fill="none" stroke="${theme1.primary}" stroke-width="1.6" stroke-dasharray="6 3" opacity="${(coreRingsProg * 0.85).toFixed(2)}" filter="url(#arcaneGlow)"/>
                
                <polygon points="0,-84 72,42 -72,42" fill="none" stroke="${theme1.primary}" stroke-width="1.2" opacity="${(coreRingsProg * 0.5).toFixed(2)}"/>
                <polygon points="0,84 72,-42 -72,-42" fill="none" stroke="${theme1.primary}" stroke-width="1.2" opacity="${(coreRingsProg * 0.5).toFixed(2)}"/>
                
                <circle cx="0" cy="0" r="64" fill="#0b0d13" stroke="${theme1.primary}" stroke-width="3" filter="url(#arcaneGlow)" stroke-dasharray="600" stroke-dashoffset="${coreRingsOffset}"/>
                <circle cx="0" cy="0" r="54" fill="none" stroke="#ffffff" stroke-width="1.4" stroke-dasharray="4 2" opacity="${(coreRingsProg * 0.9).toFixed(2)}"/>
                
                <g opacity="${coreRuneOp}" filter="url(#arcaneGlow)">
                    ${typeof getOverchargedRunePath === "function" ? getOverchargedRunePath(elId1) : (typeof getElementalRunePath === "function" ? getElementalRunePath(elId1) : "")}
                </g>
            </g>
        `;
    } else {
        centerCoreSVG = `
            <g transform="translate(${CX}, ${CY}) scale(${pulseScale})" color="${theme1.primary}">
                <circle cx="0" cy="0" r="74" fill="none" stroke="currentColor" stroke-width="1" stroke-dasharray="4 4" opacity="${(coreRingsProg * 0.6).toFixed(2)}"/>
                <polygon points="0,-72 62,36 -62,36" fill="none" stroke="currentColor" stroke-width="0.8" opacity="${(coreRingsProg * 0.4).toFixed(2)}"/>
                <polygon points="0,72 62,-36 -62,-36" fill="none" stroke="currentColor" stroke-width="0.8" opacity="${(coreRingsProg * 0.4).toFixed(2)}"/>
                <circle cx="0" cy="0" r="64" fill="#0b0d13" stroke="currentColor" stroke-width="2.2" filter="url(#arcaneGlow)" stroke-dasharray="600" stroke-dashoffset="${coreRingsOffset}"/>
                <circle cx="0" cy="0" r="54" fill="none" stroke="currentColor" stroke-width="1" stroke-dasharray="3 3" opacity="${(coreRingsProg * 0.75).toFixed(2)}"/>
                <g opacity="${coreRuneOp}" filter="url(#arcaneGlow)">
                    ${typeof getElementalRunePath === "function" ? getElementalRunePath(elId1) : ""}
                </g>
            </g>
        `;
    }

    // Gradients
    let gradientDefs = "";
    if (isDifferentDual) {
        gradientDefs = `
            <linearGradient id="dualThemeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="${theme1.primary}"/>
                <stop offset="50%" stop-color="#ffffff" stop-opacity="0.8"/>
                <stop offset="100%" stop-color="${theme2.primary}"/>
            </linearGradient>
            <radialGradient id="centerGradient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stop-color="${theme1.primary}" stop-opacity="${(0.35 * hb.glow * bgGlowOp).toFixed(2)}"/>
                <stop offset="45%" stop-color="${theme2.primary}" stop-opacity="${(0.25 * hb.glow * bgGlowOp).toFixed(2)}"/>
                <stop offset="80%" stop-color="${theme1.bg}" stop-opacity="${(0.15 * hb.glow * bgGlowOp).toFixed(2)}"/>
                <stop offset="100%" stop-color="#0b0d13" stop-opacity="0"/>
            </radialGradient>
        `;
    } else if (isSameDual) {
        gradientDefs = `
            <radialGradient id="centerGradient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stop-color="#ffffff" stop-opacity="${(0.55 * hb.glow * bgGlowOp).toFixed(2)}"/>
                <stop offset="35%" stop-color="${theme1.primary}" stop-opacity="${(0.45 * hb.glow * bgGlowOp).toFixed(2)}"/>
                <stop offset="70%" stop-color="${theme1.bg}" stop-opacity="${(0.28 * hb.glow * bgGlowOp).toFixed(2)}"/>
                <stop offset="100%" stop-color="#0b0d13" stop-opacity="0"/>
            </radialGradient>
        `;
    } else {
        gradientDefs = `
            <radialGradient id="centerGradient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stop-color="${theme1.primary}" stop-opacity="${(0.38 * hb.glow * bgGlowOp).toFixed(2)}"/>
                <stop offset="60%" stop-color="${theme1.bg}" stop-opacity="${(0.20 * hb.glow * bgGlowOp).toFixed(2)}"/>
                <stop offset="100%" stop-color="#0b0d13" stop-opacity="0"/>
            </radialGradient>
        `;
    }

    const deliveryRingsOffset = (1200 * (1 - deliveryRingsProg)).toFixed(1);
    const modRingOffset = (1800 * (1 - modRingProg)).toFixed(1);
    const borderRingsOffset = (2000 * (1 - borderRingsProg)).toFixed(1);

    return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="480" height="480">
        <defs>
            <filter id="arcaneGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="${hb.blur.toFixed(1)}" result="blur" />
                <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                </feMerge>
            </filter>
            ${gradientDefs}
            <path id="outerBorderRunicTrack" d="M ${CX}, ${CY - R_BORDER_CHANT} a ${R_BORDER_CHANT},${R_BORDER_CHANT} 0 1,1 -0.01,0 Z" fill="none" />
        </defs>

        <!-- BACKGROUND GLOW -->
        <circle cx="${CX}" cy="${CY}" r="282" fill="url(#centerGradient)" opacity="${bgGlowOp}"/>

        <!-- STATIC SACRED GEOMETRY LATTICE -->
        <g color="${theme1.primary}" opacity="${latticeOp}">
            <line x1="16" y1="${CY}" x2="584" y2="${CY}" stroke="currentColor" stroke-width="0.6" stroke-dasharray="8 6" opacity="0.35"/>
            <line x1="${CX}" y1="16" x2="${CX}" y2="584" stroke="currentColor" stroke-width="0.6" stroke-dasharray="8 6" opacity="0.35"/>
            <line x1="102" y1="102" x2="498" y2="498" stroke="currentColor" stroke-width="0.5" stroke-dasharray="4 6" opacity="0.25"/>
            <line x1="102" y1="498" x2="498" y2="102" stroke="currentColor" stroke-width="0.5" stroke-dasharray="4 6" opacity="0.25"/>

            ${typeof generateCrissCrossLattice === "function" ? generateCrissCrossLattice(CX, CY, 105, 185, 16) : ""}
            ${typeof generateWaveRing === "function" ? generateWaveRing(CX, CY, 172, 4, 16) : ""}
            ${typeof generateWaveRing === "function" ? generateWaveRing(CX, CY, 88, 3, 12) : ""}
            ${typeof generateZigzagRing === "function" ? generateZigzagRing(CX, CY, 248, 3.5, 48) : ""}
            ${typeof generateAstrolabeDialTicks === "function" ? generateAstrolabeDialTicks(CX, CY, 286, 72, 5) : ""}
        </g>

        <!-- CONNECTIVE CONDUITS -->
        <g color="${theme1.primary}">
            <g>${innerConduitsSVG}</g>
            <g>${outerConduitsSVG}</g>
        </g>

        <!-- OUTER MODIFIER RING (STAGE 3) -->
        <g transform="rotate(${rotOuter}, ${CX}, ${CY})" color="${theme1.primary}">
            <g stroke-dasharray="1800" stroke-dashoffset="${modRingOffset}">
                ${typeof getDurationRingGeometry === "function" ? getDurationRingGeometry(activeDurationMod ? activeDurationMod.id : null, CX, CY, R_OUTER) : ""}
            </g>
            ${ruluwarDenseRingSVG}
            ${constellationPolygon}
            ${modifierRunesSVG}
        </g>

        <!-- OUTER BORDER CHANT RING (STAGE 4) -->
        <g transform="rotate(${rotBorder}, ${CX}, ${CY})" color="${theme1.primary}">
            <circle cx="${CX}" cy="${CY}" r="282" fill="none" stroke="${isDifferentDual ? 'url(#dualThemeGradient)' : 'currentColor'}" stroke-width="${isSameDual ? '2.4' : '1.8'}" opacity="${borderRingsProg}" filter="url(#arcaneGlow)" stroke-dasharray="2000" stroke-dashoffset="${borderRingsOffset}"/>
            <circle cx="${CX}" cy="${CY}" r="258" fill="none" stroke="currentColor" stroke-width="1.2" opacity="${(borderRingsProg * 0.7).toFixed(2)}" stroke-dasharray="2000" stroke-dashoffset="${borderRingsOffset}"/>
            <text font-family="'Segoe UI Historic', 'Noto Sans Runic', 'Apple Symbols', 'Segoe UI Symbol', 'Courier New', monospace" font-size="9.5" font-weight="700" letter-spacing="1.5" fill="${isDifferentDual ? 'url(#dualThemeGradient)' : theme1.primary}" opacity="${borderChantOp}" filter="url(#arcaneGlow)">
                <textPath href="#outerBorderRunicTrack" startOffset="0%" textLength="${(CHANT_CIRCUMFERENCE - 6).toFixed(1)}" lengthAdjust="spacing">
                    ${fullRunicBorderText}
                </textPath>
            </text>
        </g>

        <!-- FIRST RING: DELIVERY ARCHETYPE (STAGE 2) -->
        <g transform="rotate(${rotInner}, ${CX}, ${CY})" color="${theme1.primary}">
            <g stroke-dasharray="1200" stroke-dashoffset="${deliveryRingsOffset}">
                <circle cx="${CX}" cy="${CY}" r="156" fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.75"/>
                <circle cx="${CX}" cy="${CY}" r="150" fill="none" stroke="currentColor" stroke-width="0.75" stroke-dasharray="4 4" opacity="0.5"/>
                <circle cx="${CX}" cy="${CY}" r="${R_INNER}" fill="none" stroke="${isDifferentDual ? 'url(#dualThemeGradient)' : 'currentColor'}" stroke-width="2" opacity="0.9" filter="url(#arcaneGlow)"/>
                <circle cx="${CX}" cy="${CY}" r="108" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="6 4" opacity="0.65"/>
                <circle cx="${CX}" cy="${CY}" r="102" fill="none" stroke="currentColor" stroke-width="0.75" opacity="0.45"/>
            </g>
            ${deliveryRunesSVG}
        </g>

        <!-- CENTER ELEMENTAL CHAMBER (STAGE 1 + ROTATION) -->
        ${centerCoreSVG}
    </svg>
    `;
}

// Explicit window binding
window.exportSpellCircleGIF = exportSpellCircleGIF;