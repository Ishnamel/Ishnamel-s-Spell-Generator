/* ==========================================================================
   ARCANE SPELL CIRCLE & MAGIC ARRAY EXPORTER ENGINE
   Exports Single Spell Circles & Magic Arrays to GIF, High-Res PNG, or Vector SVG
   Features Procedural Array Frame Synthesis & Interactive Dropdown Menu
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

// -------------------------------------------------------------
// 1. DROPDOWN MENU CONTROLLER
// -------------------------------------------------------------
function toggleExportDropdown(e) {
    if (e) e.stopPropagation();
    let menu = document.getElementById("arcaneExportDropdown");
    if (!menu) {
        mountExportDropdownUI();
        menu = document.getElementById("arcaneExportDropdown");
    }
    const isVisible = menu.style.display === "block";
    menu.style.display = isVisible ? "none" : "block";
}

function closeExportDropdown() {
    const menu = document.getElementById("arcaneExportDropdown");
    if (menu) menu.style.display = "none";
}

// Close dropdown when clicking anywhere outside
document.addEventListener("click", (e) => {
    const menu = document.getElementById("arcaneExportDropdown");
    const btn = document.getElementById("exportGifBtn");
    if (menu && menu.style.display === "block") {
        if (!menu.contains(e.target) && (!btn || !btn.contains(e.target))) {
            closeExportDropdown();
        }
    }
});

// -------------------------------------------------------------
// 2. VECTOR SVG EXPORT (.svg)
// -------------------------------------------------------------
function exportSpellCircleSVG() {
    closeExportDropdown();
    const isArray = (typeof arrayState !== "undefined" && arrayState.mode === "array") || document.getElementById("astrolabeInnerTriad") !== null;
    const title = (document.getElementById("spellTitle")?.innerText || (isArray ? "Magic_Array" : "Spell")).replace(/[^a-zA-Z0-9_-]/g, "_");

    let svgElement = document.getElementById("arcaneSpellCircleSVG");
    let svgString = "";

    if (svgElement) {
    svgString = new XMLSerializer().serializeToString(svgElement);
} else {
    svgString = isArray ? generateArrayCircleSVG(false) : generateSpellCircleSVG(false);
}

svgString = svgString.replace(
    /(<svg\b[^>]*viewBox="([^"]+)"[^>]*>)/,
    (match, svgTag, viewBox) => {
        const [x, y, width, height] = viewBox.trim().split(/\s+/).map(Number);

        return `${svgTag}<rect x="${x}" y="${y}" width="${width}" height="${height}" fill="#090b10"/>`;
    }
);

    // Wrap in standalone XML declaration
    const fullSvgContent = `<?xml version="1.0" encoding="utf-8"?>\n${svgString}`;
    const blob = new Blob([fullSvgContent], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.download = `${title}_Circle.svg`;
    link.href = url;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

// -------------------------------------------------------------
// 3. HIGH-RES PNG SNAPSHOT EXPORT (.png at 1200x1200px)
// -------------------------------------------------------------
async function exportSpellCirclePNG() {
    closeExportDropdown();
    const statusBtn = document.getElementById("exportGifBtn");
    const origText = statusBtn ? statusBtn.innerHTML : "Save as...";

    try {
        if (statusBtn) statusBtn.innerHTML = "⏳ Rendering PNG...";

        const isArray = (typeof arrayState !== "undefined" && arrayState.mode === "array") || document.getElementById("astrolabeInnerTriad") !== null;
        const title = (document.getElementById("spellTitle")?.innerText || (isArray ? "Magic_Array" : "Spell")).replace(/[^a-zA-Z0-9_-]/g, "_");

        let svgElement = document.getElementById("arcaneSpellCircleSVG");
        let svgString = svgElement ? new XMLSerializer().serializeToString(svgElement) : (isArray ? generateArrayCircleSVG(false) : generateSpellCircleSVG(false));

        const canvas = document.createElement("canvas");
        const size = 1200; // Crisp High-Resolution Canvas
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext("2d");

        const svgBlob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
        const url = URL.createObjectURL(svgBlob);

        const img = new Image();
        await new Promise((res, rej) => {
            img.onload = res;
            img.onerror = rej;
            img.src = url;
        });

        // Dark background plate
        ctx.fillStyle = "#090b10";
        ctx.fillRect(0, 0, size, size);
        ctx.drawImage(img, 0, 0, size, size);
        URL.revokeObjectURL(url);

        const link = document.createElement("a");
        link.download = `${title}_Circle.png`;
        link.href = canvas.toDataURL("image/png");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        if (statusBtn) statusBtn.innerHTML = origText;

    } catch (err) {
        console.error("PNG export failed", err);
        alert("Could not export PNG. Please try again.");
        if (statusBtn) statusBtn.innerHTML = origText;
    }
}

// -------------------------------------------------------------
// 4. ANIMATED GIF EXPORT ENGINE (.gif - SUPPORTS ARRAY & SINGLE)
// -------------------------------------------------------------
async function exportSpellCircleGIF() {
    closeExportDropdown();
    const statusBtn = document.getElementById("exportGifBtn");
    const defaultBtnHtml = statusBtn ? statusBtn.innerHTML : "Save as...";

    try {
        if (statusBtn) {
            statusBtn.disabled = true;
            statusBtn.innerHTML = "⏳ Loading Encoder...";
        }

        // Lazy-load gifshot library from CDN if not already loaded
        if (typeof gifshot === "undefined") {
            await new Promise((resolve, reject) => {
                const script = document.createElement("script");
                script.src = "https://cdnjs.cloudflare.com/ajax/libs/gifshot/0.3.2/gifshot.min.js";
                script.onload = resolve;
                script.onerror = () => reject(new Error("Could not load GIF encoder library"));
                document.head.appendChild(script);
            });
        }

        const isArray = (typeof arrayState !== "undefined" && arrayState.mode === "array") || document.getElementById("astrolabeInnerTriad") !== null;
        const spellTitle = (document.getElementById("spellTitle")?.innerText || (isArray ? "Magic_Array" : "Spell")).replace(/[^a-zA-Z0-9_-]/g, "_");
        
        const canvas = document.createElement("canvas");
        const size = 480;
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext("2d");

        // 40 frames covering a seamless 4.4-second orbital loop
        const totalDuration = 4.4;
        const numFrames = 36;
        const frameImages = [];

        for (let i = 0; i < numFrames; i++) {
            const t = (i / (numFrames - 1)) * totalDuration;
            const svgFrameString = isArray ? generateProceduralArrayFrameSVG(t, totalDuration) : generateProceduralFrameSVG(t, totalDuration);

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
                statusBtn.innerHTML = defaultBtnHtml;
            }
        });

    } catch (err) {
        console.error("GIF export failed", err);
        alert("Could not export animated GIF. Please check your network connection.");
        if (statusBtn) {
            statusBtn.disabled = false;
            statusBtn.innerHTML = defaultBtnHtml;
        }
    }
}

// -------------------------------------------------------------
// 5. PROCEDURAL ARRAY GIF FRAME GENERATOR (AT TIMESTAMP t)
// -------------------------------------------------------------
function generateProceduralArrayFrameSVG(t, totalDuration) {
    const CX = 300;
    const CY = 300;
    const R_INNER_ORBIT   = 158;
    const R_RULUWAR_ORBIT = 218;
    const R_OUTER_ORBIT   = 278;
    const R_GRAND_CHANT   = 412;
    const GRAND_CHANT_CIRCUMFERENCE = (2 * Math.PI * R_GRAND_CHANT).toFixed(1);

    const nA = arrayState.nodes.alpha;
    const nB = arrayState.nodes.beta;
    const nG = arrayState.nodes.gamma;

    const themeA = (typeof ELEMENT_COLORS !== "undefined" && ELEMENT_COLORS[nA.element]) ? ELEMENT_COLORS[nA.element] : { primary: "#f97316", secondary: "#ea580c", bg: "#431407" };
    const themeB = (typeof ELEMENT_COLORS !== "undefined" && ELEMENT_COLORS[nB.element]) ? ELEMENT_COLORS[nB.element] : { primary: "#facc15", secondary: "#ca8a04", bg: "#422006" };
    const themeG = (typeof ELEMENT_COLORS !== "undefined" && ELEMENT_COLORS[nG.element]) ? ELEMENT_COLORS[nG.element] : { primary: "#f59e0b", secondary: "#b45309", bg: "#451a03" };

    // Procedural Rotations at time t
    const rotInner = (t * (360 / 18)).toFixed(2);
    const rotOuter = (-t * (360 / 24)).toFixed(2);
    const rotRul = (t * (360 / 12)).toFixed(2);
    const rotYinYang = (t * (360 / 14)).toFixed(2);
    const rotTriq1 = (t * (360 / 16)).toFixed(2);
    const rotTriq2 = (-t * (360 / 16) + 60).toFixed(2);
    const rotGrandChant = (t * (360 / 75)).toFixed(2);

    // Live Particle Streamer Dash Offsets
    const streamOffsetA = (t * 240 % 200).toFixed(1);
    const streamOffsetB = (t * 300 % 200).toFixed(1);
    const streamOffsetG = (t * 180 % 200).toFixed(1);

    // Inner Triad Vertices ($R = 158$)
    const ax = Number((CX + R_INNER_ORBIT * Math.cos((-90 * Math.PI) / 180)).toFixed(2));
    const ay = Number((CY + R_INNER_ORBIT * Math.sin((-90 * Math.PI) / 180)).toFixed(2));
    const bx = Number((CX + R_INNER_ORBIT * Math.cos((30 * Math.PI) / 180)).toFixed(2));
    const by = Number((CY + R_INNER_ORBIT * Math.sin((30 * Math.PI) / 180)).toFixed(2));
    const gx = Number((CX + R_INNER_ORBIT * Math.cos((150 * Math.PI) / 180)).toFixed(2));
    const gy = Number((CY + R_INNER_ORBIT * Math.sin((150 * Math.PI) / 180)).toFixed(2));

    // Outer Triad Vertices ($R = 278$)
    const oax = Number((CX + R_OUTER_ORBIT * Math.cos((-90 * Math.PI) / 180)).toFixed(2));
    const oay = Number((CY + R_OUTER_ORBIT * Math.sin((-90 * Math.PI) / 180)).toFixed(2));
    const obx = Number((CX + R_OUTER_ORBIT * Math.cos((30 * Math.PI) / 180)).toFixed(2));
    const oby = Number((CY + R_OUTER_ORBIT * Math.sin((30 * Math.PI) / 180)).toFixed(2));
    const ogx = Number((CX + R_OUTER_ORBIT * Math.cos((150 * Math.PI) / 180)).toFixed(2));
    const ogy = Number((CY + R_OUTER_ORBIT * Math.sin((150 * Math.PI) / 180)).toFixed(2));

    // Mid-Ring Ruluwar Crown
    const ruluwarDensity = 36;
    let ruluwarOuterRunesSVG = "";
    const themesList = [themeA, themeB, themeG];

    for (let i = 0; i < ruluwarDensity; i++) {
        const angleDeg = (i * 360) / ruluwarDensity;
        const angleRad = (angleDeg * Math.PI) / 180;
        const rx = Number((CX + R_RULUWAR_ORBIT * Math.cos(angleRad)).toFixed(2));
        const ry = Number((CY + R_RULUWAR_ORBIT * Math.sin(angleRad)).toFixed(2));
        const activeTheme = themesList[i % 3];

        ruluwarOuterRunesSVG += `
            <g transform="translate(${rx}, ${ry}) rotate(${angleDeg + 90}) scale(0.82)" color="${activeTheme.primary}">
                ${typeof getVerticalRuluwarGlyph === "function" ? getVerticalRuluwarGlyph() : ""}
            </g>
        `;
    }

    const triReaction = typeof getTriElementalReaction === "function" ? getTriElementalReaction(nA.element, nB.element, nG.element) : { name: "Array", stem: "Tri" };
    const depClass = typeof getDeploymentClass === "function" ? getDeploymentClass(nA.delivery, nB.delivery, nG.delivery) : { id: "U-U-U", name: "Array" };

    const rawArrayChant = `Array-${triReaction.stem}-${depClass.id}!`;
    const fullGrandRunicChant = typeof generateGrandBorderRunicChant === "function" ? generateGrandBorderRunicChant(rawArrayChant, R_GRAND_CHANT, 38) : rawArrayChant;

    const grandDialTicks = typeof generateAstrolabeDialTicks === "function" 
        ? generateAstrolabeDialTicks(CX, CY, 438, 96, 7) 
        : "";

    return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="-170 -170 940 940" width="480" height="480">
        <defs>
            <filter id="arcaneGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="3.5" result="blur" />
                <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                </feMerge>
            </filter>

            <radialGradient id="arrayTriGradient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stop-color="#ffffff" stop-opacity="0.25"/>
                <stop offset="30%" stop-color="${themeA.primary}" stop-opacity="0.18"/>
                <stop offset="60%" stop-color="${themeB.primary}" stop-opacity="0.14"/>
                <stop offset="85%" stop-color="${themeG.primary}" stop-opacity="0.08"/>
                <stop offset="100%" stop-color="#0b0d13" stop-opacity="0"/>
            </radialGradient>

            <linearGradient id="flowGrad12" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="${themeA.primary}"/>
                <stop offset="100%" stop-color="${themeB.primary}"/>
            </linearGradient>
            <linearGradient id="flowGrad23" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="${themeB.primary}"/>
                <stop offset="100%" stop-color="${themeG.primary}"/>
            </linearGradient>
            <linearGradient id="flowGrad31" x1="0%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stop-color="${themeG.primary}"/>
                <stop offset="100%" stop-color="${themeA.primary}"/>
            </linearGradient>

            <path id="grandOuterBorderArrayTrack" d="M ${CX}, ${CY - R_GRAND_CHANT} a ${R_GRAND_CHANT},${R_GRAND_CHANT} 0 1,1 -0.01,0 Z" fill="none" />
        </defs>

        <!-- BACKGROUND GLOW -->
        <circle cx="${CX}" cy="${CY}" r="450" fill="url(#arrayTriGradient)"/>

        <!-- AXES & TICKS -->
        <g color="#94a3b8" opacity="0.25">
            <line x1="-150" y1="${CY}" x2="750" y2="${CY}" stroke="currentColor" stroke-width="0.6" stroke-dasharray="8 6"/>
            <line x1="${CX}" y1="-150" x2="${CX}" y2="750" stroke="currentColor" stroke-width="0.6" stroke-dasharray="8 6"/>
            ${grandDialTicks}
        </g>

        <!-- DUAL CELTIC TRIQUETRAS (ROTATING) -->
        <g transform="translate(${CX}, ${CY})">
            <g transform="rotate(${rotTriq1})">
                <g id="astrolabeGrandTriquetra1">
                    ${typeof generateBigWrappingTriquetraSVG === "function" ? generateBigWrappingTriquetraSVG(nA, nB, nG, themeA, themeB, themeG) : ""}
                </g>
            </g>
        </g>

        <!-- RAIL TRACKS -->
        <g>
            <circle cx="${CX}" cy="${CY}" r="${R_INNER_ORBIT}" fill="none" stroke="#ffffff" stroke-width="2.6" opacity="0.85" filter="url(#arcaneGlow)"/>
            <circle cx="${CX}" cy="${CY}" r="${R_RULUWAR_ORBIT}" fill="none" stroke="${themeG.primary}" stroke-width="1.2" opacity="0.65" filter="url(#arcaneGlow)"/>
            <circle cx="${CX}" cy="${CY}" r="${R_OUTER_ORBIT}" fill="none" stroke="#ffffff" stroke-width="2.2" opacity="0.55" filter="url(#arcaneGlow)"/>
        </g>

        <!-- INNER ORBITING TRIAD -->
        <g transform="rotate(${rotInner}, ${CX}, ${CY})">
            <polygon points="${ax},${ay} ${bx},${by} ${gx},${gy}" fill="none" stroke="#ffffff" stroke-width="2.2" opacity="0.9" filter="url(#arcaneGlow)"/>
            <line x1="${ax}" y1="${ay}" x2="${bx}" y2="${by}" stroke="url(#flowGrad12)" stroke-width="3.2" stroke-dasharray="10 14" stroke-dashoffset="${streamOffsetA}" filter="url(#arcaneGlow)"/>
            <line x1="${bx}" y1="${by}" x2="${gx}" y2="${gy}" stroke="url(#flowGrad23)" stroke-width="4.0" stroke-dasharray="16 10" stroke-dashoffset="${streamOffsetB}" filter="url(#arcaneGlow)"/>
            <line x1="${gx}" y1="${gy}" x2="${ax}" y2="${ay}" stroke="url(#flowGrad31)" stroke-width="2.2" stroke-dasharray="6 12" stroke-dashoffset="${streamOffsetG}" filter="url(#arcaneGlow)"/>
            <line x1="${gx}" y1="${gy}" x2="${CX}" y2="${CY}" stroke="${themeG.primary}" stroke-width="2.0" stroke-dasharray="6 8" stroke-dashoffset="${streamOffsetA}" filter="url(#arcaneGlow)"/>

            <!-- Sub-nodes -->
            ${typeof generateSubNodeCircleSVG === "function" ? generateSubNodeCircleSVG("alpha", nA, ax, ay, false, themeA, "", "", "", "", "inner", 1.0) : ""}
            ${typeof generateSubNodeCircleSVG === "function" ? generateSubNodeCircleSVG("beta", nB, bx, by, false, themeB, "", "", "", "", "inner", 1.0) : ""}
            ${typeof generateSubNodeCircleSVG === "function" ? generateSubNodeCircleSVG("gamma", nG, gx, gy, false, themeG, "", "", "", "", "inner", 1.0) : ""}
        </g>

        <!-- MID-RING RULUWAR CROWN -->
        <g transform="rotate(${rotRul}, ${CX}, ${CY})">
            ${ruluwarOuterRunesSVG}
        </g>

        <!-- INTERMEDIATE OUTER TRIAD -->
        <g transform="rotate(${rotOuter}, ${CX}, ${CY})">
            <polygon points="${oax},${oay} ${obx},${oby} ${ogx},${ogy}" fill="none" stroke="#ffffff" stroke-width="1.6" stroke-dasharray="4 4" filter="url(#arcaneGlow)"/>
            ${typeof generateSubNodeCircleSVG === "function" ? generateSubNodeCircleSVG("alpha", nA, oax, oay, false, themeA, "", "", "", "", "outer", 0.70) : ""}
            ${typeof generateSubNodeCircleSVG === "function" ? generateSubNodeCircleSVG("beta", nB, obx, oby, false, themeB, "", "", "", "", "outer", 0.70) : ""}
            ${typeof generateSubNodeCircleSVG === "function" ? generateSubNodeCircleSVG("gamma", nG, ogx, ogy, false, themeG, "", "", "", "", "outer", 0.70) : ""}
        </g>

        <!-- CENTER 3-SIDED YIN-YANG CORE -->
        <g transform="translate(${CX}, ${CY}) rotate(${rotYinYang})">
            ${typeof generateTripleYinYangSVG === "function" ? generateTripleYinYangSVG(nA, nB, nG, themeA, themeB, themeG) : ""}
        </g>

        <!-- GRAND ENCOMPASSING RUNIC CHANT CIRCLE (38px FONT) -->
        <g transform="rotate(${rotGrandChant}, ${CX}, ${CY})" color="${themeA.primary}">
            <circle cx="${CX}" cy="${CY}" r="438" fill="none" stroke="${themeA.primary}" stroke-width="2.6" opacity="0.92" filter="url(#arcaneGlow)"/>
            <circle cx="${CX}" cy="${CY}" r="388" fill="none" stroke="${themeB.primary}" stroke-width="1.4" opacity="0.65" stroke-dasharray="6 4"/>
            <circle cx="${CX}" cy="${CY}" r="448" fill="none" stroke="${themeG.primary}" stroke-width="1.0" opacity="0.45" stroke-dasharray="4 6"/>
            <text font-family="'Segoe UI Historic', 'Noto Sans Runic', 'Apple Symbols', 'Segoe UI Symbol', monospace" font-size="38" font-weight="900" letter-spacing="3" fill="${themeA.primary}" opacity="0.96" filter="url(#arcaneGlow)">
                <textPath href="#grandOuterBorderArrayTrack" startOffset="0%" textLength="${GRAND_CHANT_CIRCUMFERENCE}" lengthAdjust="spacing">
                    ${fullGrandRunicChant}
                </textPath>
            </text>
        </g>
    </svg>
    `;
}

// -------------------------------------------------------------
// 6. SINGLE SPELL CIRCLE PROCEDURAL FRAME GENERATOR
// -------------------------------------------------------------
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

    const rotInner = (t * (360 / 50)).toFixed(2);
    const rotOuter = (-t * (360 / 80)).toFixed(2);
    const rotBorder = (t * (360 / 75)).toFixed(2);
    const rotYinYang = (-t * (360 / 35)).toFixed(2);
    const pulseScale = (1.0 + hb.scaleDelta * Math.sin((2 * Math.PI * t) / hb.speed)).toFixed(3);

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
            <path id="outerBorderRunicTrack" d="M ${CX}, ${CY - R_BORDER_CHANT} a ${R_BORDER_CHANT},${R_BORDER_CHANT} 0 1,1 -0.01,0 Z" fill="none" />
        </defs>

        <circle cx="${CX}" cy="${CY}" r="282" fill="url(#centerGradient)" opacity="${bgGlowOp}"/>

        <g color="${theme1.primary}" opacity="${latticeOp}">
            <line x1="16" y1="${CY}" x2="584" y2="${CY}" stroke="currentColor" stroke-width="0.6" stroke-dasharray="8 6" opacity="0.35"/>
            <line x1="${CX}" y1="16" x2="${CX}" y2="584" stroke="currentColor" stroke-width="0.6" stroke-dasharray="8 6" opacity="0.35"/>
            ${typeof generateCrissCrossLattice === "function" ? generateCrissCrossLattice(CX, CY, 105, 185, 16) : ""}
            ${typeof generateAstrolabeDialTicks === "function" ? generateAstrolabeDialTicks(CX, CY, 286, 72, 5) : ""}
        </g>

        <g color="${theme1.primary}">
            <g>${innerConduitsSVG}</g>
            <g>${outerConduitsSVG}</g>
        </g>

        <g transform="rotate(${rotOuter}, ${CX}, ${CY})" color="${theme1.primary}">
            <g stroke-dasharray="1800" stroke-dashoffset="${modRingOffset}">
                ${typeof getDurationRingGeometry === "function" ? getDurationRingGeometry(activeDurationMod ? activeDurationMod.id : null, CX, CY, R_OUTER) : ""}
            </g>
            ${ruluwarDenseRingSVG}
            ${constellationPolygon}
            ${modifierRunesSVG}
        </g>

        <g transform="rotate(${rotBorder}, ${CX}, ${CY})" color="${theme1.primary}">
            <circle cx="${CX}" cy="${CY}" r="282" fill="none" stroke="currentColor" stroke-width="1.8" opacity="${borderRingsProg}" filter="url(#arcaneGlow)" stroke-dasharray="2000" stroke-dashoffset="${borderRingsOffset}"/>
            <circle cx="${CX}" cy="${CY}" r="258" fill="none" stroke="currentColor" stroke-width="1.2" opacity="${(borderRingsProg * 0.7).toFixed(2)}" stroke-dasharray="2000" stroke-dashoffset="${borderRingsOffset}"/>
            <text font-family="'Segoe UI Historic', 'Noto Sans Runic', monospace" font-size="9.5" font-weight="700" letter-spacing="1.5" fill="${theme1.primary}" opacity="${borderChantOp}" filter="url(#arcaneGlow)">
                <textPath href="#outerBorderRunicTrack" startOffset="0%" textLength="${(CHANT_CIRCUMFERENCE - 6).toFixed(1)}" lengthAdjust="spacing">
                    ${fullRunicBorderText}
                </textPath>
            </text>
        </g>

        <g transform="rotate(${rotInner}, ${CX}, ${CY})" color="${theme1.primary}">
            <g stroke-dasharray="1200" stroke-dashoffset="${deliveryRingsOffset}">
                <circle cx="${CX}" cy="${CY}" r="156" fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.75"/>
                <circle cx="${CX}" cy="${CY}" r="${R_INNER}" fill="none" stroke="currentColor" stroke-width="2" opacity="0.9" filter="url(#arcaneGlow)"/>
            </g>
            ${deliveryRunesSVG}
        </g>

        ${centerCoreSVG}
    </svg>
    `;
}

// -------------------------------------------------------------
// 7. MOUNT EXPORT DROPDOWN UI (AUTONOMOUS INJECTION)
// -------------------------------------------------------------
function mountExportDropdownUI() {
    if (document.getElementById("arcaneExportDropdown")) return;

    const btn = document.getElementById("exportGifBtn");
    if (!btn || !btn.parentNode) return;

    // Convert button to dropdown trigger if not already bound
    btn.onclick = (e) => toggleExportDropdown(e);

    const dropdown = document.createElement("div");
    dropdown.id = "arcaneExportDropdown";
    dropdown.style.cssText = `
        display: none;
        position: absolute;
        top: 42px;
        right: 0;
        min-width: 200px;
        background: #090b10;
        border: 1.5px solid #38bdf8;
        border-radius: 8px;
        padding: 6px;
        box-shadow: 0 12px 32px rgba(0, 0, 0, 0.8), 0 0 16px rgba(56, 189, 248, 0.25);
        z-index: 99999;
        font-family: 'Segoe UI', sans-serif;
        font-size: 0.82rem;
        box-sizing: border-box;
    `;

    dropdown.innerHTML = `
        <div style="font-size:0.68rem; font-weight:800; color:#64748b; padding:4px 8px; border-bottom:1px solid #1e293b; letter-spacing:0.8px;">
            EXPORT FORMAT
        </div>
        <button class="export-opt-btn" onclick="exportSpellCircleGIF()" style="
            width:100%; display:flex; align-items:center; gap:8px; padding:8px 10px; margin-top:4px;
            background:transparent; border:none; border-radius:4px; color:#f8fafc; cursor:pointer; font-weight:700; text-align:left;
        " onmouseover="this.style.background='#1e293b'; this.style.color='#38bdf8';" onmouseout="this.style.background='transparent'; this.style.color='#f8fafc';">
            <span>🎬</span> Animated GIF (.gif)
        </button>

        <button class="export-opt-btn" onclick="exportSpellCirclePNG()" style="
            width:100%; display:flex; align-items:center; gap:8px; padding:8px 10px;
            background:transparent; border:none; border-radius:4px; color:#f8fafc; cursor:pointer; font-weight:700; text-align:left;
        " onmouseover="this.style.background='#1e293b'; this.style.color='#38bdf8';" onmouseout="this.style.background='transparent'; this.style.color='#f8fafc';">
            <span>🖼️</span> High-Res PNG (.png)
        </button>

        <button class="export-opt-btn" onclick="exportSpellCircleSVG()" style="
            width:100%; display:flex; align-items:center; gap:8px; padding:8px 10px;
            background:transparent; border:none; border-radius:4px; color:#f8fafc; cursor:pointer; font-weight:700; text-align:left;
        " onmouseover="this.style.background='#1e293b'; this.style.color='#38bdf8';" onmouseout="this.style.background='transparent'; this.style.color='#f8fafc';">
            <span>📐</span> Vector SVG (.svg)
        </button>
    `;

    // Position relative to the export button parent
    btn.parentNode.style.position = "relative";
    btn.parentNode.appendChild(dropdown);
}

// Auto-mount listeners
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mountExportDropdownUI);
} else {
    mountExportDropdownUI();
}

// Global window attachments
window.exportSpellCircleGIF = exportSpellCircleGIF;
window.exportSpellCirclePNG = exportSpellCirclePNG;
window.exportSpellCircleSVG = exportSpellCircleSVG;
window.toggleExportDropdown = toggleExportDropdown;
window.closeExportDropdown = closeExportDropdown;
window.mountExportDropdownUI = mountExportDropdownUI;