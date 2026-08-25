/* ==========================================================================
   DEDICATED MAGIC ARRAY SPELL CIRCLE SVG & ASTROLABE ENGINE
   Autonomous Native CSS Keyframe Orbits (Works in Saved Standalone .SVG Files)
   ========================================================================== */

let arrayCircleState = {
    isInscribing: false
};

// -------------------------------------------------------------
// ASTROLABE ENGINE STATE
// -------------------------------------------------------------
let arrayAstrolabe = {
    phase: 0,
    isAutoOrbit: true,
    speedMult: 1.0,
    targetPhase: null,
    rafId: null,
    isTelemetryOpen: false
};

// -------------------------------------------------------------
// 1. VERTICAL RULUWAR GLYPH GENERATOR (52px NATIVE HEIGHT)
// -------------------------------------------------------------
function getVerticalRuluwarGlyph() {
    return `
        <path d="M0,-24 C13,-24 16,-8 0,0 C-16,8 -13,24 0,24 C13,24 16,8 0,0 C-16,-8 -13,-24 0,-24 Z" fill="none" stroke="currentColor" stroke-width="2.0" stroke-linecap="round" filter="url(#arcaneGlow)"/>
        <circle cx="0" cy="-12" r="3.0" fill="currentColor"/>
        <circle cx="0" cy="12" r="3.0" fill="currentColor"/>
        <circle cx="0" cy="0" r="1.8" fill="currentColor"/>
    `;
}

// -------------------------------------------------------------
// 2. LARGE-SCALE RUNIC CHANT GENERATOR (FOR 38px FONT)
// -------------------------------------------------------------
function generateGrandBorderRunicChant(rawChant, radius, fontSize = 38) {
    const runes = typeof transliterateToRunes === "function" 
        ? transliterateToRunes(rawChant) 
        : rawChant.toUpperCase();
    const separator = " ✦ ";
    const unit = runes + separator;

    const circumference = 2 * Math.PI * radius;
    const charWidth = fontSize * 0.74;
    const totalSlots = Math.max(1, Math.round(circumference / charWidth));

    const unitLen = unit.length;
    const fitCount = Math.max(1, Math.floor(totalSlots / Math.max(1, unitLen)));
    const remainder = totalSlots - (fitCount * unitLen);

    const baseFillers = Math.floor(remainder / fitCount);
    const extraFillers = remainder % fitCount;

    let fullString = "";
    for (let i = 0; i < fitCount; i++) {
        const count = baseFillers + (i < extraFillers ? 1 : 0);
        let fillerDots = "";
        for (let j = 0; j < count; j++) {
            fillerDots += "⊙ ";
        }
        const gapString = fillerDots ? `✦ ${fillerDots}` : `✦ `;
        fullString += runes + " " + gapString;
    }
    return fullString.trim();
}

// -------------------------------------------------------------
// 3. MINI 2-SIDED YIN-YANG GENERATOR (FOR EYE COMBINATIONS)
// -------------------------------------------------------------
function generateMiniDualYinYangSVG(el1, el2, theme1, theme2) {
    const r = 11.5;
    const hr = r / 2;
    const rune1 = typeof getElementalRunePath === "function" ? getElementalRunePath(el1) : `<circle cx="0" cy="0" r="4" fill="${theme1.primary}"/>`;
    const rune2 = typeof getElementalRunePath === "function" ? getElementalRunePath(el2) : `<circle cx="0" cy="0" r="4" fill="${theme2.primary}"/>`;

    return `
        <!-- Mini 2-Sided Yin-Yang (${el1} + ${el2}) -->
        <g class="mini-combo-yinyang">
            <circle cx="0" cy="0" r="${r}" fill="#0b0d13" stroke="#ffffff" stroke-width="0.8" opacity="0.95"/>
            
            <path d="M 0,-${r} A ${r},${r} 0 0,1 0,${r} A ${hr},${hr} 0 0,0 0,0 A ${hr},${hr} 0 0,1 0,-${r} Z"
                  fill="${theme1.bg || '#151822'}" stroke="none" opacity="0.95"/>
            
            <path d="M 0,${r} A ${r},${r} 0 0,1 0,-${r} A ${hr},${hr} 0 0,0 0,0 A ${hr},${hr} 0 0,1 0,${r} Z"
                  fill="${theme2.bg || '#151822'}" stroke="none" opacity="0.95"/>

            <path d="M 0,-${r} A ${hr},${hr} 0 0,0 0,0" fill="none" stroke="${theme1.primary}" stroke-width="1.2"/>
            <path d="M 0,0 A ${hr},${hr} 0 0,1 0,${r}" fill="none" stroke="${theme2.primary}" stroke-width="1.2"/>
            <circle cx="0" cy="0" r="${r}" fill="none" stroke="#ffffff" stroke-width="0.9"/>

            <g transform="translate(0, -${hr}) scale(0.14)" color="${theme1.primary}">
                ${rune1}
            </g>

            <g transform="translate(0, ${hr}) scale(0.14)" color="${theme2.primary}">
                ${rune2}
            </g>
        </g>
    `;
}

// -------------------------------------------------------------
// 4. MASTER 3-SIDED YIN-YANG CENTER CORE
// -------------------------------------------------------------
function generateTripleYinYangSVG(nA, nB, nG, themeA, themeB, themeG) {
    const R = 46;
    const r = R / 2;
    const p2x = (R * Math.cos((30 * Math.PI) / 180)).toFixed(2);
    const p2y = (R * Math.sin((30 * Math.PI) / 180)).toFixed(2);

    const lobePathD = `M 0,0 A ${r},${r} 0 0,1 0,-${R} A ${R},${R} 0 0,1 ${p2x},${p2y} A ${r},${r} 0 0,0 0,0 Z`;
    const lobeArcD  = `M 0,0 A ${r},${r} 0 0,1 0,-${R}`;

    return `
        <!-- MASTER 3-SIDED YIN-YANG CORE -->
        <g class="array-nexus-group stage-elem inscribe-nexus-hub">
            <circle cx="0" cy="0" r="54" fill="#090b10" stroke="#ffffff" stroke-width="2.2" filter="url(#arcaneGlow)" class="stage-elem inscribe-nexus-ring"/>
            <circle cx="0" cy="0" r="49" fill="none" stroke="${themeA.primary}" stroke-width="1.0" stroke-dasharray="3 3" opacity="0.8"/>

            <g class="yinyang-triad-rotation">
                <!-- Lobe 1 (Top / Alpha) -->
                <path d="${lobePathD}" fill="${themeA.bg || '#151822'}" stroke="${themeA.primary}" stroke-width="1.4" opacity="0.95"/>
                <path d="${lobeArcD}" fill="none" stroke="${themeA.primary}" stroke-width="2.0" filter="url(#arcaneGlow)"/>

                <!-- Lobe 2 (Bottom-Right / Beta) -->
                <g transform="rotate(120)">
                    <path d="${lobePathD}" fill="${themeB.bg || '#151822'}" stroke="${themeB.primary}" stroke-width="1.4" opacity="0.95"/>
                    <path d="${lobeArcD}" fill="none" stroke="${themeB.primary}" stroke-width="2.0" filter="url(#arcaneGlow)"/>
                </g>

                <!-- Lobe 3 (Bottom-Left / Gamma) -->
                <g transform="rotate(240)">
                    <path d="${lobePathD}" fill="${themeG.bg || '#151822'}" stroke="${themeG.primary}" stroke-width="1.4" opacity="0.95"/>
                    <path d="${lobeArcD}" fill="none" stroke="${themeG.primary}" stroke-width="2.0" filter="url(#arcaneGlow)"/>
                </g>

                <!-- Combo Eyes -->
                <g transform="translate(0, -23)">
                    ${generateMiniDualYinYangSVG(nB.element, nG.element, themeB, themeG)}
                </g>
                <g transform="translate(19.92, 11.5)">
                    ${generateMiniDualYinYangSVG(nG.element, nA.element, themeG, themeA)}
                </g>
                <g transform="translate(-19.92, 11.5)">
                    ${generateMiniDualYinYangSVG(nA.element, nB.element, themeA, themeB)}
                </g>
            </g>

            <circle cx="0" cy="0" r="3.5" fill="#ffffff" filter="url(#arcaneGlow)"/>
        </g>
    `;
}

// -------------------------------------------------------------
// 5. UNIVERSAL PHYSICAL HULL MORPHING
// -------------------------------------------------------------
function getModifierHullMorphSVG(modId, rBase, theme, spinAnimCW, spinAnimCCW) {
    if (!modId) {
        return `<circle cx="0" cy="0" r="${rBase}" fill="#090b10" stroke="currentColor" stroke-width="1.8" filter="url(#arcaneGlow)" class="stage-elem inscribe-sub-hull"/>`;
    }

    switch (modId) {
        case "taddum": {
            let pts = [];
            const teeth = 14;
            for (let i = 0; i < teeth; i++) {
                const a0 = (i * 2 * Math.PI) / teeth;
                const a1 = ((i + 0.38) * 2 * Math.PI) / teeth;
                const a2 = ((i + 0.85) * 2 * Math.PI) / teeth;
                pts.push(`${((rBase - 6) * Math.cos(a0)).toFixed(2)},${((rBase - 6) * Math.sin(a0)).toFixed(2)}`);
                pts.push(`${((rBase + 22) * Math.cos(a1)).toFixed(2)},${((rBase + 22) * Math.sin(a1)).toFixed(2)}`);
                pts.push(`${((rBase - 3) * Math.cos(a2)).toFixed(2)},${((rBase - 3) * Math.sin(a2)).toFixed(2)}`);
            }
            return `
                <polygon points="${pts.join(' ')}" fill="#090b10" stroke="currentColor" stroke-width="2.4" filter="url(#arcaneGlow)" class="stage-elem inscribe-sub-hull"/>
                <circle cx="0" cy="0" r="${rBase}" fill="none" stroke="currentColor" stroke-width="1.0" stroke-dasharray="4 3" opacity="0.6"/>
            `;
        }
        case "yinla":
            return `
                <circle cx="0" cy="0" r="${rBase}" fill="#090b10" stroke="currentColor" stroke-width="1.8" filter="url(#arcaneGlow)" class="stage-elem inscribe-sub-hull"/>
                <g class="stage-elem inscribe-sub-hull-fins">
                    <polygon points="0,-${rBase + 24} 12,-${rBase - 4} -12,-${rBase - 4}" fill="currentColor" opacity="0.95"/>
                    <polygon points="0,${rBase + 24} 12,${rBase - 4} -12,${rBase - 4}" fill="currentColor" opacity="0.95"/>
                    <polygon points="-${rBase + 24},0 -${rBase - 4},12 -${rBase - 4},-12" fill="currentColor" opacity="0.95"/>
                    <polygon points="${rBase + 24},0 ${rBase - 4},12 ${rBase - 4},-12" fill="currentColor" opacity="0.95"/>
                </g>
            `;
        case "praba": {
            let pts = [];
            for (let i = 0; i < 8; i++) {
                const a = (i * 2 * Math.PI) / 8 + Math.PI / 8;
                pts.push(`${((rBase + 6) * Math.cos(a)).toFixed(2)},${((rBase + 6) * Math.sin(a)).toFixed(2)}`);
            }
            return `
                <polygon points="${pts.join(' ')}" fill="#090b10" stroke="currentColor" stroke-width="2.8" filter="url(#arcaneGlow)" class="stage-elem inscribe-sub-hull"/>
                <polygon points="${pts.join(' ')}" fill="none" stroke="currentColor" stroke-width="1.2" stroke-dasharray="4 2" opacity="0.75" class="stage-elem inscribe-sub-hull-inner"/>
            `;
        }
        case "ngisngi":
            return `
                <circle cx="0" cy="0" r="${rBase}" fill="#090b10" stroke="currentColor" stroke-width="1.8" filter="url(#arcaneGlow)" class="stage-elem inscribe-sub-hull"/>
                <g class="${spinAnimCW}">
                    <circle cx="0" cy="0" r="${rBase + 8}" fill="none" stroke="currentColor" stroke-width="1.4" stroke-dasharray="16 8" opacity="0.85" class="stage-elem inscribe-sub-halo"/>
                    <circle cx="0" cy="0" r="${rBase + 16}" fill="none" stroke="currentColor" stroke-width="0.9" stroke-dasharray="8 6" opacity="0.65" class="stage-elem inscribe-sub-halo"/>
                </g>
                <g class="${spinAnimCCW}">
                    <circle cx="0" cy="0" r="${rBase + 12}" fill="none" stroke="currentColor" stroke-width="1.2" stroke-dasharray="24 12" opacity="0.75" class="stage-elem inscribe-sub-halo"/>
                </g>
            `;
        case "yangga": {
            let pts = [];
            for (let i = 0; i < 8; i++) {
                const a1 = ((i - 0.28) * 2 * Math.PI) / 8;
                const aTip = (i * 2 * Math.PI) / 8;
                const a2 = ((i + 0.28) * 2 * Math.PI) / 8;
                pts.push(`${(rBase * Math.cos(a1)).toFixed(2)},${(rBase * Math.sin(a1)).toFixed(2)}`);
                pts.push(`${((rBase + 20) * Math.cos(aTip)).toFixed(2)},${((rBase + 20) * Math.sin(aTip)).toFixed(2)}`);
                pts.push(`${(rBase * Math.cos(a2)).toFixed(2)},${(rBase * Math.sin(a2)).toFixed(2)}`);
            }
            return `<polygon points="${pts.join(' ')}" fill="#090b10" stroke="currentColor" stroke-width="2.2" filter="url(#arcaneGlow)" class="stage-elem inscribe-sub-hull"/>`;
        }
        case "gilbo": {
            let pips = "";
            for (let i = 0; i < 12; i++) {
                const a = (i * 2 * Math.PI) / 12;
                pips += `<circle cx="${((rBase + 7) * Math.cos(a)).toFixed(2)}" cy="${((rBase + 7) * Math.sin(a)).toFixed(2)}" r="2.6" fill="currentColor"/>`;
            }
            return `
                <circle cx="0" cy="0" r="${rBase}" fill="#090b10" stroke="currentColor" stroke-width="2.8" filter="url(#arcaneGlow)" class="stage-elem inscribe-sub-hull"/>
                <circle cx="0" cy="0" r="${rBase + 7}" fill="none" stroke="currentColor" stroke-width="1.2" stroke-dasharray="3 3" opacity="0.85" class="stage-elem inscribe-sub-hull-inner"/>
                <g class="stage-elem inscribe-sub-hull-fins">${pips}</g>
            `;
        }
        case "apap":
            return `
                <circle cx="0" cy="0" r="${rBase}" fill="#090b10" stroke="currentColor" stroke-width="1.8" filter="url(#arcaneGlow)" class="stage-elem inscribe-sub-hull"/>
                <g class="stage-elem inscribe-sub-hull-fins">
                    <polygon points="-${rBase - 2},-12 -${rBase + 20},0 -${rBase - 2},12 -${rBase + 6},0" fill="currentColor"/>
                    <polygon points="${rBase - 2},-12 ${rBase + 20},0 ${rBase - 2},12 ${rBase + 6},0" fill="currentColor"/>
                    <polygon points="-12,${rBase - 2} 0,${rBase + 20} 12,${rBase - 2} 0,${rBase + 6}" fill="currentColor"/>
                </g>
            `;
        case "abbay": {
            let pts = [];
            for (let i = 0; i < 16; i++) {
                const a = (i * 2 * Math.PI) / 16;
                const r = i % 2 === 0 ? rBase + 16 : rBase - 3;
                pts.push(`${(r * Math.cos(a)).toFixed(2)},${(r * Math.sin(a)).toFixed(2)}`);
            }
            return `<polygon points="${pts.join(' ')}" fill="#090b10" stroke="currentColor" stroke-width="2.2" filter="url(#arcaneGlow)" class="stage-elem inscribe-sub-hull"/>`;
        }
        case "iwa":
            return `
                <circle cx="0" cy="0" r="${rBase}" fill="#090b10" stroke="currentColor" stroke-width="1.8" filter="url(#arcaneGlow)" class="stage-elem inscribe-sub-hull"/>
                <g class="stage-elem inscribe-sub-hull-fins">
                    <polygon points="-${rBase + 18},-${rBase + 18} -${rBase + 18},-${rBase - 2} -${rBase - 2},-${rBase + 18}" fill="currentColor"/>
                    <polygon points="${rBase + 18},${rBase + 18} ${rBase + 18},${rBase - 2} ${rBase - 2},${rBase + 18}" fill="currentColor"/>
                    <polygon points="-${rBase + 18},${rBase + 18} -${rBase + 18},${rBase - 2} -${rBase - 2},${rBase + 18}" fill="currentColor"/>
                    <polygon points="${rBase + 18},-${rBase + 18} ${rBase + 18},-${rBase - 2} ${rBase - 2},-${rBase + 18}" fill="currentColor"/>
                </g>
            `;
        case "piag": {
            let pts = [];
            for (let i = 0; i < 16; i++) {
                const a = (i * 2 * Math.PI) / 16;
                const r = i % 2 === 0 ? rBase + 22 : rBase - 4;
                pts.push(`${(r * Math.cos(a)).toFixed(2)},${(r * Math.sin(a)).toFixed(2)}`);
            }
            return `<polygon points="${pts.join(' ')}" fill="#090b10" stroke="currentColor" stroke-width="2.6" filter="url(#arcaneGlow)" class="stage-elem inscribe-sub-hull"/>`;
        }
        case "kunta": {
            let pts = [];
            for (let i = 0; i < 4; i++) {
                const a = (i * Math.PI) / 2;
                pts.push(`${((rBase + 20) * Math.cos(a)).toFixed(2)},${((rBase + 20) * Math.sin(a)).toFixed(2)}`);
            }
            return `
                <polygon points="${pts.join(' ')}" fill="#090b10" stroke="currentColor" stroke-width="3.2" filter="url(#arcaneGlow)" class="stage-elem inscribe-sub-hull"/>
                <circle cx="0" cy="0" r="${rBase}" fill="none" stroke="currentColor" stroke-width="1.4" stroke-dasharray="4 4" class="stage-elem inscribe-sub-hull-inner"/>
            `;
        }
        default:
            return `<circle cx="0" cy="0" r="${rBase}" fill="#090b10" stroke="currentColor" stroke-width="1.8" filter="url(#arcaneGlow)" class="stage-elem inscribe-sub-hull"/>`;
    }
}

// -------------------------------------------------------------
// 6. SUB-NODE MAGIC CIRCLE COMPONENT BUILDER
// -------------------------------------------------------------
function generateSubNodeCircleSVG(nodeKey, nodeData, cx, cy, isSelected, theme, spinChantClass, spinModClass, spinDelClass, pulseCoreClass, subIdSuffix = "inner", scale = 1.0) {
    const R_BOUND = 68;
    const R_CHANT = 62;
    const R_MOD   = 48;
    const R_DEL   = 30;
    const R_CORE  = 16;

    const elId = nodeData.element || "sfalhoy";
    const delId = nodeData.delivery || "uruwak";
    const bodyParts = nodeData.bodyParts || ["whole_body"];
    const mods = nodeData.modifiers || [];

    const activeMods = mods
        .map(id => (typeof MODIFIERS !== "undefined" ? MODIFIERS.find(m => m.id === id) : null))
        .filter(Boolean);
    const nonDurationMods = activeMods.filter(m => m.cat !== "duration");
    const activeDurationMod = activeMods.find(m => m.cat === "duration");

    let latestModId = mods.length > 0 ? mods[mods.length - 1] : null;
    const morphedHullSVG = getModifierHullMorphSVG(latestModId, R_BOUND, theme, spinChantClass, spinModClass);

    const numDeliveryRunes = 4;
    let deliveryRunesSVG = "";
    let innerConduitsSVG = "";

    for (let i = 0; i < numDeliveryRunes; i++) {
        const angleDeg = (i * 360) / numDeliveryRunes;
        const angleRad = (angleDeg * Math.PI) / 180;
        const dx = (R_DEL * Math.cos(angleRad)).toFixed(2);
        const dy = (R_DEL * Math.sin(angleRad)).toFixed(2);
        const delRune = typeof getDeliveryRunePath === "function" ? getDeliveryRunePath(delId, bodyParts) : "";

        deliveryRunesSVG += `
            <g transform="translate(${dx}, ${dy}) rotate(${angleDeg + 90}) scale(0.35)" color="${theme.primary}" class="stage-elem inscribe-sub-delivery-rune">
                ${delRune}
            </g>
        `;

        innerConduitsSVG += `
            <line x1="${(R_CORE * Math.cos(angleRad)).toFixed(2)}" y1="${(R_CORE * Math.sin(angleRad)).toFixed(2)}"
                  x2="${((R_DEL - 7) * Math.cos(angleRad)).toFixed(2)}" y2="${((R_DEL - 7) * Math.sin(angleRad)).toFixed(2)}"
                  stroke="${theme.primary}" stroke-width="1.2" stroke-dasharray="2 2" opacity="0.75" class="stage-elem inscribe-sub-conduit-ray"/>
        `;
    }

    let modifierNodesSVG = "";
    let constellationPolySVG = "";
    let outerConduitsSVG = "";
    const modCount = nonDurationMods.length;

    if (modCount > 0) {
        let polyPts = [];
        nonDurationMods.forEach((mod, i) => {
            const angleDeg = (i * 360) / modCount - 90;
            const angleRad = (angleDeg * Math.PI) / 180;
            const mx = (R_MOD * Math.cos(angleRad)).toFixed(2);
            const my = (R_MOD * Math.sin(angleRad)).toFixed(2);
            polyPts.push(`${mx},${my}`);

            const glyph = typeof getModifierGlyphPath === "function" ? getModifierGlyphPath(mod.id) : "";
            modifierNodesSVG += `
                <g transform="translate(${mx}, ${my}) scale(0.34)" color="${theme.primary}" class="stage-elem inscribe-sub-modifier-rune">
                    <circle cx="0" cy="0" r="14" fill="#090b10" stroke="${theme.primary}" stroke-width="1.5" filter="url(#arcaneGlow)"/>
                    <circle cx="0" cy="0" r="17" fill="none" stroke="${theme.primary}" stroke-width="0.7" stroke-dasharray="2 2" opacity="0.6"/>
                    ${glyph}
                </g>
            `;

            outerConduitsSVG += `
                <line x1="${((R_DEL + 8) * Math.cos(angleRad)).toFixed(2)}" y1="${((R_DEL + 8) * Math.sin(angleRad)).toFixed(2)}"
                      x2="${((R_MOD - 9) * Math.cos(angleRad)).toFixed(2)}" y2="${((R_MOD - 9) * Math.sin(angleRad)).toFixed(2)}"
                      stroke="${theme.primary}" stroke-width="1.2" opacity="0.8" class="stage-elem inscribe-sub-conduit-ray"/>
            `;
        });

        if (modCount >= 2) {
            constellationPolySVG = `
                <polygon points="${polyPts.join(" ")}" fill="${theme.glow || 'rgba(212, 175, 55, 0.15)'}" fill-opacity="0.2" stroke="${theme.primary}" stroke-width="0.8" opacity="0.6" class="stage-elem inscribe-sub-constellation"/>
            `;
        }
    } else {
        for (let i = 0; i < 8; i++) {
            const angleRad = (i * 45 * Math.PI) / 180;
            const mx = (R_MOD * Math.cos(angleRad)).toFixed(2);
            const my = (R_MOD * Math.sin(angleRad)).toFixed(2);
            modifierNodesSVG += `
                <circle cx="${mx}" cy="${my}" r="1.8" fill="${theme.primary}" opacity="0.4" class="stage-elem inscribe-sub-modifier-rune"/>
            `;
        }
    }

    const durRingSVG = typeof getDurationRingGeometry === "function" 
        ? getDurationRingGeometry(activeDurationMod ? activeDurationMod.id : null, 0, 0, R_MOD)
        : `<circle cx="0" cy="0" r="${R_MOD}" fill="none" stroke="currentColor" stroke-width="1.2" opacity="0.85"/>`;

    const rawSubChant = `${delId}-${elId}`;
    const fullSubChantRunes = typeof generateFullBorderRunicChant === "function"
        ? generateFullBorderRunicChant(rawSubChant, R_CHANT)
        : rawSubChant;
    const subChantCircumference = (2 * Math.PI * R_CHANT).toFixed(1);

    const subLatticeTicks = typeof generateAstrolabeDialTicks === "function"
        ? generateAstrolabeDialTicks(0, 0, R_BOUND - 1, 36, 3)
        : "";

    return `
        <!-- SUB-NODE MAGIC CIRCLE [${nodeKey.toUpperCase()} / ${subIdSuffix.toUpperCase()}] -->
        <g transform="translate(${cx}, ${cy}) scale(${scale})" class="array-sub-node ${isSelected ? 'is-selected-node' : ''}" onclick="setActiveArrayNode('${nodeKey}')" style="cursor: pointer;">
            ${isSelected ? `<circle cx="0" cy="0" r="${R_BOUND + 9}" fill="none" stroke="${theme.primary}" stroke-width="2.2" stroke-dasharray="6 4" filter="url(#arcaneGlow)" class="node-selection-pulse"/>` : ''}

            <!-- Subcircle Ambient Base Plate -->
            <circle cx="0" cy="0" r="${R_BOUND - 3}" fill="${theme.bg || '#151822'}" fill-opacity="0.45" stroke="${theme.primary}" stroke-width="0.75" opacity="0.6" class="stage-elem inscribe-sub-bg"/>

            <!-- Morphed Physical Hull -->
            <g color="${theme.primary}">
                ${morphedHullSVG}
            </g>

            <g color="${theme.primary}" opacity="0.35" class="stage-elem inscribe-sub-lattice">
                <line x1="-${R_BOUND}" y1="0" x2="${R_BOUND}" y2="0" stroke="currentColor" stroke-width="0.5" stroke-dasharray="3 3"/>
                <line x1="0" y1="-${R_BOUND}" x2="0" y2="${R_BOUND}" stroke="currentColor" stroke-width="0.5" stroke-dasharray="3 3"/>
                ${subLatticeTicks}
            </g>

            <!-- Tier 4: Runic Border Chant -->
            <g class="${spinChantClass}" color="${theme.primary}">
                <circle cx="0" cy="0" r="${R_BOUND - 1}" fill="none" stroke="currentColor" stroke-width="1.4" opacity="0.85" class="stage-elem inscribe-sub-border-ring"/>
                <circle cx="0" cy="0" r="${R_CHANT - 4}" fill="none" stroke="currentColor" stroke-width="0.8" opacity="0.5" stroke-dasharray="4 3" class="stage-elem inscribe-sub-border-ring"/>
                <path id="subTrack_${nodeKey}_${subIdSuffix}" d="M 0,-${R_CHANT} a ${R_CHANT},${R_CHANT} 0 1,1 -0.01,0 Z" fill="none" />
                <text font-family="'Segoe UI Historic', 'Noto Sans Runic', monospace" font-size="5.4" font-weight="700" letter-spacing="1.2" fill="${theme.primary}" opacity="0.9" filter="url(#arcaneGlow)" class="stage-elem inscribe-sub-border-chant">
                    <textPath href="#subTrack_${nodeKey}_${subIdSuffix}" startOffset="0%" textLength="${subChantCircumference}" lengthAdjust="spacing">
                        ${fullSubChantRunes}
                    </textPath>
                </text>
            </g>

            <g color="${theme.primary}">
                ${innerConduitsSVG}
                ${outerConduitsSVG}
            </g>

            <!-- Tier 3: Modifier Ring -->
            <g class="${spinModClass}" color="${theme.primary}">
                <g class="stage-elem inscribe-sub-modifier-ring">${durRingSVG}</g>
                ${constellationPolySVG}
                ${modifierNodesSVG}
            </g>

            <!-- Tier 2: Delivery Ring -->
            <g class="${spinDelClass}" color="${theme.primary}">
                <circle cx="0" cy="0" r="${R_DEL + 8}" fill="none" stroke="currentColor" stroke-width="0.9" stroke-dasharray="3 2" opacity="0.6" class="stage-elem inscribe-sub-delivery-ring"/>
                <circle cx="0" cy="0" r="${R_DEL}" fill="none" stroke="currentColor" stroke-width="1.3" opacity="0.85" filter="url(#arcaneGlow)" class="stage-elem inscribe-sub-delivery-ring"/>
                <circle cx="0" cy="0" r="${R_DEL - 8}" fill="none" stroke="currentColor" stroke-width="0.75" opacity="0.5" class="stage-elem inscribe-sub-delivery-ring"/>
                ${deliveryRunesSVG}
            </g>

            <!-- Tier 1: Core Elemental Chamber -->
            <g class="${pulseCoreClass}" color="${theme.primary}">
                <circle cx="0" cy="0" r="${R_CORE + 4}" fill="none" stroke="${theme.primary}" stroke-width="0.8" stroke-dasharray="2 2" opacity="0.65" class="stage-elem inscribe-sub-core-ring"/>
                <circle cx="0" cy="0" r="${R_CORE}" fill="#090b10" stroke="${theme.primary}" stroke-width="1.6" filter="url(#arcaneGlow)" class="stage-elem inscribe-sub-core-ring"/>
                <g transform="scale(0.36)" color="${theme.primary}" class="stage-elem inscribe-sub-core-rune">
                    ${typeof getElementalRunePath === "function" ? getElementalRunePath(elId) : `<circle cx="0" cy="0" r="8" fill="${theme.primary}"/>`}
                </g>
            </g>
        </g>
    `;
}

// -------------------------------------------------------------
// 7. DUAL CELTIC TRIQUETRAS WITH BLADE-TIP SUB-CIRCLES
// -------------------------------------------------------------
function generateBigWrappingTriquetraSVG(nA, nB, nG, themeA, themeB, themeG) {
    const L = 355;
    const bladePathD = `M 0,-${L} C 170,-260 275,-60 190,110 C 80,35 -80,35 -190,110 C -275,-60 -170,-260 0,-${L} Z`;
    const spinePathD = `M 0,-${L - 15} C 145,-240 235,-60 165,95 C 65,30 -65,30 -165,95 C -235,-60 -145,-240 0,-${L - 15} Z`;

    return `
        <!-- ================= DUAL ALTERNATING CELTIC TRIQUETRAS + 6 BLADE-TIP SUB-CIRCLES ================= -->
        <!-- 1. PRIMARY GRAND TRIQUETRA (Angles: 0°, 120°, 240°) [Fast Clockwise Spin] -->
        <g id="astrolabeGrandTriquetra1" class="grand-triquetra-wrap-1">
            <path d="${bladePathD}" fill="none" stroke="${themeA.primary}" stroke-width="3.2" opacity="0.42" filter="url(#arcaneGlow)" class="stage-elem inscribe-triquetra-blade"/>
            <path d="${spinePathD}" fill="none" stroke="${themeA.primary}" stroke-width="1.0" stroke-dasharray="8 6" opacity="0.25" class="stage-elem inscribe-triquetra-spine"/>

            <g transform="rotate(120)">
                <path d="${bladePathD}" fill="none" stroke="${themeB.primary}" stroke-width="3.2" opacity="0.42" filter="url(#arcaneGlow)" class="stage-elem inscribe-triquetra-blade"/>
                <path d="${spinePathD}" fill="none" stroke="${themeB.primary}" stroke-width="1.0" stroke-dasharray="8 6" opacity="0.25" class="stage-elem inscribe-triquetra-spine"/>
            </g>

            <g transform="rotate(240)">
                <path d="${bladePathD}" fill="none" stroke="${themeG.primary}" stroke-width="3.2" opacity="0.42" filter="url(#arcaneGlow)" class="stage-elem inscribe-triquetra-blade"/>
                <path d="${spinePathD}" fill="none" stroke="${themeG.primary}" stroke-width="1.0" stroke-dasharray="8 6" opacity="0.25" class="stage-elem inscribe-triquetra-spine"/>
            </g>

            <!-- BLADE-TIP SUB-CIRCLES (TRIQUETRA 1) -->
            <g class="tip-subnode-group">
                ${generateSubNodeCircleSVG("alpha", nA, 0, -L, false, themeA, "sub-spin-tip-chant", "sub-spin-tip-mod", "sub-spin-tip-del", "sub-pulse-tip-core", "tip1_alpha", 0.50)}
            </g>
            <g transform="rotate(120)" class="tip-subnode-group">
                ${generateSubNodeCircleSVG("beta", nB, 0, -L, false, themeB, "sub-spin-tip-chant", "sub-spin-tip-mod", "sub-spin-tip-del", "sub-pulse-tip-core", "tip1_beta", 0.50)}
            </g>
            <g transform="rotate(240)" class="tip-subnode-group">
                ${generateSubNodeCircleSVG("gamma", nG, 0, -L, false, themeG, "sub-spin-tip-chant", "sub-spin-tip-mod", "sub-spin-tip-del", "sub-pulse-tip-core", "tip1_gamma", 0.50)}
            </g>
        </g>

        <!-- 2. DUPLICATED ALTERNATING TRIQUETRA (Angles: 60°, 180°, 300°) [Fast Counter-Clockwise Spin] -->
        <g id="astrolabeGrandTriquetra2" class="grand-triquetra-wrap-2">
            <g transform="rotate(60)">
                <path d="${bladePathD}" fill="none" stroke="${themeB.primary}" stroke-width="2.8" opacity="0.36" filter="url(#arcaneGlow)" class="stage-elem inscribe-triquetra-blade"/>
                <path d="${spinePathD}" fill="none" stroke="${themeB.primary}" stroke-width="0.9" stroke-dasharray="8 6" opacity="0.20" class="stage-elem inscribe-triquetra-spine"/>
            </g>

            <g transform="rotate(180)">
                <path d="${bladePathD}" fill="none" stroke="${themeG.primary}" stroke-width="2.8" opacity="0.36" filter="url(#arcaneGlow)" class="stage-elem inscribe-triquetra-blade"/>
                <path d="${spinePathD}" fill="none" stroke="${themeG.primary}" stroke-width="0.9" stroke-dasharray="8 6" opacity="0.20" class="stage-elem inscribe-triquetra-spine"/>
            </g>

            <g transform="rotate(300)">
                <path d="${bladePathD}" fill="none" stroke="${themeA.primary}" stroke-width="2.8" opacity="0.36" filter="url(#arcaneGlow)" class="stage-elem inscribe-triquetra-blade"/>
                <path d="${spinePathD}" fill="none" stroke="${themeA.primary}" stroke-width="0.9" stroke-dasharray="8 6" opacity="0.20" class="stage-elem inscribe-triquetra-spine"/>
            </g>

            <!-- BLADE-TIP SUB-CIRCLES (TRIQUETRA 2) -->
            <g transform="rotate(60)" class="tip-subnode-group">
                ${generateSubNodeCircleSVG("beta", nB, 0, -L, false, themeB, "sub-spin-tip-chant", "sub-spin-tip-mod", "sub-spin-tip-del", "sub-pulse-tip-core", "tip2_beta", 0.46)}
            </g>
            <g transform="rotate(180)" class="tip-subnode-group">
                ${generateSubNodeCircleSVG("gamma", nG, 0, -L, false, themeG, "sub-spin-tip-chant", "sub-spin-tip-mod", "sub-spin-tip-del", "sub-pulse-tip-core", "tip2_gamma", 0.46)}
            </g>
            <g transform="rotate(300)" class="tip-subnode-group">
                ${generateSubNodeCircleSVG("alpha", nA, 0, -L, false, themeA, "sub-spin-tip-chant", "sub-spin-tip-mod", "sub-spin-tip-del", "sub-pulse-tip-core", "tip2_alpha", 0.46)}
            </g>
        </g>
    `;
}

// -------------------------------------------------------------
// 8. MASTER PROCEDURAL ARRAY SVG BUILDER (WITH COMPLETE 360° RAILS)
// -------------------------------------------------------------
function generateArrayCircleSVG(isInscribing = false) {
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

    // Mid-Ring Ruluwar Crown (36 Glyphs)
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
            <g transform="translate(${rx}, ${ry}) rotate(${angleDeg + 90}) scale(0.82)" color="${activeTheme.primary}" class="stage-elem inscribe-ruluwar-glyph">
                ${getVerticalRuluwarGlyph()}
            </g>
        `;
    }

    const triReaction = typeof getTriElementalReaction === "function" ? getTriElementalReaction(nA.element, nB.element, nG.element) : { name: "Array", stem: "Tri" };
    const depClass = typeof getDeploymentClass === "function" ? getDeploymentClass(nA.delivery, nB.delivery, nG.delivery) : { id: "U-U-U", name: "Array" };

    const rawArrayChant = `Array-${triReaction.stem}-${depClass.id}!`;
    const fullGrandRunicChant = generateGrandBorderRunicChant(rawArrayChant, R_GRAND_CHANT, 38);

    const grandDialTicks = typeof generateAstrolabeDialTicks === "function" 
        ? generateAstrolabeDialTicks(CX, CY, 438, 96, 7) 
        : "";

    // NATIVE CSS ORBITAL REVOLUTIONS (FOR STANDALONE .SVG FILES & APP)
    let animStyles = `
        @keyframes rotateGrandChantCW { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }
        @keyframes pulseMasterHub { 0%, 100% { transform: scale(1.0); opacity: 0.94; } 50% { transform: scale(1.08); opacity: 1.0; } }
        @keyframes rotateYinYangTriadCW { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }
        @keyframes rotateGrandTriquetraFastCW { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes rotateGrandTriquetraFastCCW { from { transform: rotate(60deg); } to { transform: rotate(-300deg); } }

        /* Planetary Orbit Keyframes for all 3 Concentric Tracks */
        @keyframes orbitInnerTriadCW { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes orbitRuluwarCrownCW { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }
        @keyframes orbitOuterTriadCCW { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

        /* Continuous Supersonic Streamers */
        @keyframes flowNeedleHyper { 0% { stroke-dashoffset: 160; } 100% { stroke-dashoffset: 0; } }
        @keyframes flowBraidedHyper { 0% { stroke-dashoffset: 140; } 100% { stroke-dashoffset: 0; } }
        @keyframes flowFeedbackFast { 0% { stroke-dashoffset: 180; } 100% { stroke-dashoffset: 0; } }
        @keyframes pulseApexRapid { 0%, 100% { opacity: 0.55; stroke-dashoffset: 100; } 50% { opacity: 1.0; } 100% { stroke-dashoffset: 0; } }

        .stream-genesis-to-mod { stroke-dasharray: 10 14; animation: flowNeedleHyper 0.38s linear infinite; }
        .stream-needle-particles { stroke-dasharray: 3 24; animation: flowNeedleHyper 0.18s linear infinite; }
        .stream-mod-to-apex { stroke-dasharray: 16 10; animation: flowBraidedHyper 0.45s linear infinite; }
        .stream-braid-strand-a { stroke-dasharray: 8 16; animation: flowBraidedHyper 0.32s linear infinite; opacity: 0.9; }
        .stream-braid-strand-b { stroke-dasharray: 12 12; animation: flowBraidedHyper 0.40s linear infinite; opacity: 0.9; }
        .stream-recirculation-loop { stroke-dasharray: 6 12; animation: flowFeedbackFast 0.75s linear infinite; opacity: 0.85; }
        .stream-ghost-particles { animation: flowFeedbackFast 0.45s linear infinite; }
        .stream-apex-discharge { stroke-dasharray: 6 8; animation: pulseApexRapid 0.45s linear infinite; }

        /* Autonomous CSS Planetary Orbit Classes */
        .array-orbit-inner-triad { transform-origin: ${CX}px ${CY}px; animation: orbitInnerTriadCW 28s linear infinite; }
        .array-orbit-ruluwar-crown { transform-origin: ${CX}px ${CY}px; animation: orbitRuluwarCrownCW 20s linear infinite; }
        .array-orbit-outer-triad { transform-origin: ${CX}px ${CY}px; animation: orbitOuterTriadCCW 36s linear infinite; }
        
        .array-grand-border-chant-group { transform-origin: ${CX}px ${CY}px; animation: rotateGrandChantCW 38s linear infinite; }
        .array-nexus-group { transform-origin: 0px 0px; animation: pulseMasterHub 1.6s ease-in-out infinite; }
        .yinyang-triad-rotation { transform-origin: 0px 0px; animation: rotateYinYangTriadCW 14s linear infinite; }
        
        .grand-triquetra-wrap-1 { transform-origin: 0px 0px; animation: rotateGrandTriquetraFastCW 16s linear infinite; }
        .grand-triquetra-wrap-2 { transform-origin: 0px 0px; animation: rotateGrandTriquetraFastCCW 16s linear infinite; }

        /* Rotations per Node Tier */
        @keyframes spinFastCW_1_8  { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes spinFastCW_2_4  { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes spinFastCW_3_2  { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes spinFastCW_4_5  { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes spinFastCW_8    { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes spinFastCW_12   { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

        @keyframes spinFastCCW_2_0 { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }
        @keyframes spinFastCCW_2_8 { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }
        @keyframes spinFastCCW_3_6 { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }
        @keyframes spinFastCCW_5_2 { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }
        @keyframes spinFastCCW_9   { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }
        @keyframes spinFastCCW_14  { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }

        @keyframes pulseCore_1_2 { 0%, 100% { transform: scale(0.92); opacity: 0.8; } 50% { transform: scale(1.08); opacity: 1.0; } }

        .sub-spin-inner-alpha-chant { transform-origin: 0px 0px; animation: spinFastCW_12 12s linear infinite; }
        .sub-spin-inner-alpha-mod   { transform-origin: 0px 0px; animation: spinFastCCW_3_6 3.6s linear infinite; }
        .sub-spin-inner-alpha-del   { transform-origin: 0px 0px; animation: spinFastCW_2_4 2.4s linear infinite; }
        .sub-pulse-inner-alpha-core { transform-origin: 0px 0px; animation: pulseCore_1_2 1.6s ease-in-out infinite; }

        .sub-spin-inner-beta-chant  { transform-origin: 0px 0px; animation: spinFastCW_8 8s linear infinite; }
        .sub-spin-inner-beta-mod    { transform-origin: 0px 0px; animation: spinFastCCW_2_8 2.8s linear infinite; }
        .sub-spin-inner-beta-del    { transform-origin: 0px 0px; animation: spinFastCW_1_8 1.8s linear infinite; }
        .sub-pulse-inner-beta-core  { transform-origin: 0px 0px; animation: pulseCore_1_2 1.2s ease-in-out infinite; }

        .sub-spin-inner-gamma-chant { transform-origin: 0px 0px; animation: spinFastCW_12 12s linear infinite; }
        .sub-spin-inner-gamma-mod   { transform-origin: 0px 0px; animation: spinFastCCW_2_0 2.0s linear infinite; }
        .sub-spin-inner-gamma-del   { transform-origin: 0px 0px; animation: spinFastCW_2_4 2.4s linear infinite; }
        .sub-pulse-inner-gamma-core { transform-origin: 0px 0px; animation: pulseCore_1_2 1.4s ease-in-out infinite; }

        .sub-spin-outer-alpha-chant { transform-origin: 0px 0px; animation: spinFastCCW_14 14s linear infinite; }
        .sub-spin-outer-alpha-mod   { transform-origin: 0px 0px; animation: spinFastCW_4_5 4.5s linear infinite; }
        .sub-spin-outer-alpha-del   { transform-origin: 0px 0px; animation: spinFastCCW_2_8 2.8s linear infinite; }
        .sub-pulse-outer-alpha-core { transform-origin: 0px 0px; animation: pulseCore_1_2 1.6s ease-in-out infinite; }

        .sub-spin-outer-beta-chant  { transform-origin: 0px 0px; animation: spinFastCCW_9 9s linear infinite; }
        .sub-spin-outer-beta-mod    { transform-origin: 0px 0px; animation: spinFastCW_3_2 3.2s linear infinite; }
        .sub-spin-outer-beta-del    { transform-origin: 0px 0px; animation: spinFastCCW_2_0 2.0s linear infinite; }
        .sub-pulse-outer-beta-core  { transform-origin: 0px 0px; animation: pulseCore_1_2 1.2s ease-in-out infinite; }

        .sub-spin-outer-gamma-chant { transform-origin: 0px 0px; animation: spinFastCCW_14 14s linear infinite; }
        .sub-spin-outer-gamma-mod   { transform-origin: 0px 0px; animation: spinFastCW_3_2 3.2s linear infinite; }
        .sub-spin-outer-gamma-del   { transform-origin: 0px 0px; animation: spinFastCCW_2_0 2.0s linear infinite; }
        .sub-pulse-outer-gamma-core { transform-origin: 0px 0px; animation: pulseCore_1_2 1.4s ease-in-out infinite; }

        /* Blade-Tip Sub-Circles */
        .sub-spin-tip-chant { transform-origin: 0px 0px; animation: spinFastCW_8 8s linear infinite; }
        .sub-spin-tip-mod   { transform-origin: 0px 0px; animation: spinFastCCW_2_8 2.8s linear infinite; }
        .sub-spin-tip-del   { transform-origin: 0px 0px; animation: spinFastCW_1_8 1.8s linear infinite; }
        .sub-pulse-tip-core { transform-origin: 0px 0px; animation: pulseCore_1_2 1.2s ease-in-out infinite; }

        .node-selection-pulse { transform-origin: 0px 0px; animation: pulseCore_1_2 1.4s ease-in-out infinite; }
    `;

    if (isInscribing) {
        animStyles += `
            #arcaneSpellCircleSVG.is-inscribing .stage-elem,
            #arcaneSpellCircleSVG.is-inscribing .inscribe-triquetra-blade,
            #arcaneSpellCircleSVG.is-inscribing .inscribe-triquetra-spine,
            #arcaneSpellCircleSVG.is-inscribing .tip-subnode-group { opacity: 0; }

            /* 100% Complete Circular Tracing Keyframes */
            @keyframes traceCircInnerRail {
                0%   { stroke-dashoffset: 1000; opacity: 0; }
                10%  { opacity: 1; }
                100% { stroke-dashoffset: 0; opacity: 1; }
            }
            @keyframes traceCircMidRail {
                0%   { stroke-dashoffset: 1400; opacity: 0; }
                10%  { opacity: 1; }
                100% { stroke-dashoffset: 0; opacity: 1; }
            }
            @keyframes traceCircOuterRail {
                0%   { stroke-dashoffset: 1800; opacity: 0; }
                10%  { opacity: 1; }
                100% { stroke-dashoffset: 0; opacity: 1; }
            }
            @keyframes traceCircSubRings {
                0%   { stroke-dashoffset: 1400; opacity: 0; }
                10%  { opacity: 1; }
                100% { stroke-dashoffset: 0; opacity: 1; }
            }
            @keyframes traceBladeFast {
                0%   { stroke-dashoffset: 3000; opacity: 0; }
                15%  { opacity: 0.45; }
                100% { stroke-dashoffset: 0; opacity: 0.45; }
            }
            @keyframes traceConduitRay {
                0%   { stroke-dashoffset: 180; opacity: 0; }
                15%  { opacity: 1; }
                100% { stroke-dashoffset: 0; opacity: 1; }
            }
            @keyframes igniteRuneInPlace {
                0%   { opacity: 0; }
                50%  { opacity: 1; filter: drop-shadow(0 0 16px currentColor); }
                100% { opacity: 1; filter: none; }
            }
            @keyframes sweepRunicChant {
                0%   { opacity: 0; letter-spacing: 5px; }
                40%  { opacity: 0.95; }
                100% { opacity: 0.92; letter-spacing: 1.2px; }
            }
            @keyframes fadeInLayer {
                0%   { opacity: 0; }
                100% { opacity: 1; }
            }

            /* STAGE 0: Center 3-Sided Yin-Yang */
            #arcaneSpellCircleSVG.is-inscribing .inscribe-array-bg { animation: fadeInLayer 1.2s ease-out 0.1s forwards; }
            #arcaneSpellCircleSVG.is-inscribing .inscribe-nexus-ring {
                stroke-dasharray: 600; stroke-dashoffset: 600;
                animation: traceCircInnerRail 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.2s forwards;
            }
            #arcaneSpellCircleSVG.is-inscribing .yinyang-triad-rotation path,
            #arcaneSpellCircleSVG.is-inscribing .mini-combo-yinyang {
                animation: igniteRuneInPlace 0.7s ease-out 0.3s forwards;
            }

            /* STAGE 1: Rail Tracks Tracing with Exact 360° Coverage */
            #arcaneSpellCircleSVG.is-inscribing .inscribe-rail-inner {
                stroke-dasharray: 1000; stroke-dashoffset: 1000;
                animation: traceCircInnerRail 0.9s cubic-bezier(0.4, 0, 0.2, 1) 0.8s forwards;
            }
            #arcaneSpellCircleSVG.is-inscribing .inscribe-rail-mid {
                stroke-dasharray: 1400; stroke-dashoffset: 1400;
                animation: traceCircMidRail 1.0s cubic-bezier(0.4, 0, 0.2, 1) 0.9s forwards;
            }
            #arcaneSpellCircleSVG.is-inscribing .inscribe-rail-outer {
                stroke-dasharray: 1800; stroke-dashoffset: 1800;
                animation: traceCircOuterRail 1.1s cubic-bezier(0.4, 0, 0.2, 1) 1.0s forwards;
            }
            #arcaneSpellCircleSVG.is-inscribing .inscribe-conduit-loop {
                stroke-dasharray: 1600; stroke-dashoffset: 1600;
                animation: traceCircInnerRail 1.0s cubic-bezier(0.4, 0, 0.2, 1) 0.9s forwards;
            }

            /* STAGE 2: Complete Sub-Circles Circular Inscription */
            #arcaneSpellCircleSVG.is-inscribing .inscribe-sub-bg { animation: fadeInLayer 0.6s ease-out 1.5s forwards; }
            #arcaneSpellCircleSVG.is-inscribing .inscribe-sub-core-ring {
                stroke-dasharray: 200; stroke-dashoffset: 200;
                animation: traceCircInnerRail 0.6s cubic-bezier(0.4, 0, 0.2, 1) 1.6s forwards;
            }
            #arcaneSpellCircleSVG.is-inscribing .inscribe-sub-core-rune { animation: igniteRuneInPlace 0.5s ease-out 1.8s forwards; }
            #arcaneSpellCircleSVG.is-inscribing .inscribe-sub-conduit-ray {
                stroke-dasharray: 100; stroke-dashoffset: 100;
                animation: traceConduitRay 0.4s ease-out 2.0s forwards;
            }
            #arcaneSpellCircleSVG.is-inscribing .inscribe-sub-delivery-ring {
                stroke-dasharray: 1000; stroke-dashoffset: 1000;
                animation: traceCircSubRings 0.7s cubic-bezier(0.4, 0, 0.2, 1) 2.1s forwards;
            }
            #arcaneSpellCircleSVG.is-inscribing .inscribe-sub-delivery-rune { animation: igniteRuneInPlace 0.5s ease-out 2.3s forwards; }
            
            #arcaneSpellCircleSVG.is-inscribing .inscribe-sub-modifier-ring {
                stroke-dasharray: 1400; stroke-dashoffset: 1400;
                animation: traceCircSubRings 0.8s cubic-bezier(0.4, 0, 0.2, 1) 2.4s forwards;
            }
            #arcaneSpellCircleSVG.is-inscribing .inscribe-sub-modifier-rune,
            #arcaneSpellCircleSVG.is-inscribing .inscribe-sub-constellation { animation: igniteRuneInPlace 0.5s ease-out 2.6s forwards; }

            #arcaneSpellCircleSVG.is-inscribing .inscribe-sub-hull,
            #arcaneSpellCircleSVG.is-inscribing .inscribe-sub-hull-inner,
            #arcaneSpellCircleSVG.is-inscribing .inscribe-sub-halo,
            #arcaneSpellCircleSVG.is-inscribing .inscribe-sub-border-ring {
                stroke-dasharray: 1400; stroke-dashoffset: 1400;
                animation: traceCircSubRings 0.8s cubic-bezier(0.4, 0, 0.2, 1) 2.7s forwards;
            }
            #arcaneSpellCircleSVG.is-inscribing .inscribe-sub-hull-fins,
            #arcaneSpellCircleSVG.is-inscribing .inscribe-sub-lattice { animation: fadeInLayer 0.6s ease-out 2.9s forwards; }
            #arcaneSpellCircleSVG.is-inscribing .inscribe-sub-border-chant { animation: sweepRunicChant 0.8s ease-out 3.0s forwards; }

            /* STAGE 3: Mid-Ring Ruluwar Crown */
            #arcaneSpellCircleSVG.is-inscribing .inscribe-ruluwar-glyph { animation: igniteRuneInPlace 0.7s ease-out 3.2s forwards; }
            
            /* STAGE 4: Dual Celtic Triquetras & 6 Blade-Tip Sub-Circles */
            #arcaneSpellCircleSVG.is-inscribing .inscribe-triquetra-blade {
                stroke-dasharray: 3000; stroke-dashoffset: 3000;
                animation: traceBladeFast 1.2s cubic-bezier(0.4, 0, 0.2, 1) 3.4s forwards;
            }
            #arcaneSpellCircleSVG.is-inscribing .inscribe-triquetra-spine {
                stroke-dasharray: 2800; stroke-dashoffset: 2800;
                animation: traceBladeFast 1.0s ease-out 3.6s forwards;
            }
            #arcaneSpellCircleSVG.is-inscribing .tip-subnode-group {
                animation: igniteRuneInPlace 0.8s ease-out 3.8s forwards;
            }

            /* STAGE 5: GRAND 38px BORDER INSCRIPTION */
            #arcaneSpellCircleSVG.is-inscribing .inscribe-grand-border {
                stroke-dasharray: 3600; stroke-dashoffset: 3600;
                animation: traceCircOuterRail 1.0s cubic-bezier(0.4, 0, 0.2, 1) 4.2s forwards;
            }
            #arcaneSpellCircleSVG.is-inscribing .inscribe-grand-chant {
                animation: sweepRunicChant 1.0s ease-out 4.4s forwards;
            }
        `;
    }

    return `
    <svg id="arcaneSpellCircleSVG" xmlns="http://www.w3.org/2000/svg" viewBox="-170 -170 940 940" class="spell-circle-svg ${isInscribing ? 'is-inscribing' : ''}" style="width: 100%; height: 100%; max-width: 600px; aspect-ratio: 1/1; cursor: pointer;">
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

            <!-- GRAND ENCOMPASSING RUNIC CHANT CIRCULAR TEXT TRACK -->
            <path id="grandOuterBorderArrayTrack" d="M ${CX}, ${CY - R_GRAND_CHANT} a ${R_GRAND_CHANT},${R_GRAND_CHANT} 0 1,1 -0.01,0 Z" fill="none" />
            
            <style>
                ${animStyles}
            </style>
        </defs>

        <!-- BACKGROUND TRI-SPECTRAL GLOW -->
        <circle cx="${CX}" cy="${CY}" r="450" fill="url(#arrayTriGradient)" class="stage-elem inscribe-array-bg"/>

        <!-- SACRED GEOMETRY LATTICE & AXES -->
        <g color="#94a3b8" opacity="0.25" class="stage-elem inscribe-array-bg">
            <line x1="-150" y1="${CY}" x2="750" y2="${CY}" stroke="currentColor" stroke-width="0.6" stroke-dasharray="8 6"/>
            <line x1="${CX}" y1="-150" x2="${CX}" y2="750" stroke="currentColor" stroke-width="0.6" stroke-dasharray="8 6"/>
            ${grandDialTicks}
        </g>

        <!-- ================= DUAL ALTERNATING GRAND CELTIC TRIQUETRAS + 6 BLADE-TIP SUB-CIRCLES ================= -->
        <g transform="translate(${CX}, ${CY})">
            ${generateBigWrappingTriquetraSVG(nA, nB, nG, themeA, themeB, themeG)}
        </g>

        <!-- ================= RAIL TRACKS: COMPLETE 360° DEDICATED CIRCULAR RAILS ================= -->
        <g class="stage-elem inscribe-conduit-loop">
            <!-- 1. Inner Rail Circle ($R = 158$) -->
            <circle cx="${CX}" cy="${CY}" r="${R_INNER_ORBIT}" fill="none" stroke="#ffffff" stroke-width="2.6" opacity="0.85" filter="url(#arcaneGlow)" class="stage-elem inscribe-rail-inner"/>
            <circle cx="${CX}" cy="${CY}" r="${R_INNER_ORBIT}" fill="none" stroke="${themeA.primary}" stroke-width="1.4" class="array-flow-conduit inscribe-rail-inner" opacity="0.9"/>

            <!-- 2. Mid Ruluwar Crown Rail ($R = 218$) -->
            <circle cx="${CX}" cy="${CY}" r="${R_RULUWAR_ORBIT + 10}" fill="none" stroke="#ffffff" stroke-width="0.8" opacity="0.25" stroke-dasharray="2 4" class="stage-elem inscribe-rail-mid"/>
            <circle cx="${CX}" cy="${CY}" r="${R_RULUWAR_ORBIT}" fill="none" stroke="${themeG.primary}" stroke-width="1.2" opacity="0.65" class="array-flow-conduit inscribe-rail-mid" filter="url(#arcaneGlow)"/>
            <circle cx="${CX}" cy="${CY}" r="${R_RULUWAR_ORBIT - 10}" fill="none" stroke="#ffffff" stroke-width="0.8" opacity="0.25" stroke-dasharray="2 4" class="stage-elem inscribe-rail-mid"/>

            <!-- 3. Real Intermediate Outer Rail Circle ($R = 278$) -->
            <circle cx="${CX}" cy="${CY}" r="${R_OUTER_ORBIT}" fill="none" stroke="#ffffff" stroke-width="2.2" opacity="0.65" filter="url(#arcaneGlow)" class="stage-elem inscribe-rail-outer"/>
            <circle cx="${CX}" cy="${CY}" r="${R_OUTER_ORBIT}" fill="none" stroke="${themeB.primary}" stroke-width="1.4" class="array-flow-conduit inscribe-rail-outer" opacity="0.85"/>
        </g>

        <!-- ================= 1. INNER ORBITING TRIAD + LIVE MANA STREAMERS ================= -->
        <g id="astrolabeInnerTriad" class="array-orbit-inner-triad">
            <!-- Closed-Circuit Rail Framework & Mana Particle Streamers -->
            <g class="stage-elem inscribe-conduit-loop">
                <polygon points="${ax},${ay} ${bx},${by} ${gx},${gy}" fill="none" stroke="#000000" stroke-width="7.0" opacity="0.85"/>
                <polygon points="${ax},${ay} ${bx},${by} ${gx},${gy}" fill="none" stroke="#ffffff" stroke-width="2.2" opacity="0.9" filter="url(#arcaneGlow)"/>

                <line x1="${ax}" y1="${ay}" x2="${bx}" y2="${by}" stroke="url(#flowGrad12)" stroke-width="3.2" class="stream-genesis-to-mod" filter="url(#arcaneGlow)"/>
                <line x1="${ax}" y1="${ay}" x2="${bx}" y2="${by}" stroke="#ffffff" stroke-width="1.4" class="stream-needle-particles"/>

                <line x1="${bx}" y1="${by}" x2="${gx}" y2="${gy}" stroke="url(#flowGrad23)" stroke-width="4.0" class="stream-mod-to-apex" filter="url(#arcaneGlow)"/>
                <line x1="${bx}" y1="${by - 3}" x2="${gx}" y2="${gy - 3}" stroke="${themeB.primary}" stroke-width="1.5" class="stream-braid-strand-a"/>
                <line x1="${bx}" y1="${by + 3}" x2="${gx}" y2="${gy + 3}" stroke="${themeG.primary}" stroke-width="1.5" class="stream-braid-strand-b"/>

                <line x1="${gx}" y1="${gy}" x2="${ax}" y2="${ay}" stroke="url(#flowGrad31)" stroke-width="2.2" class="stream-recirculation-loop" filter="url(#arcaneGlow)"/>
                <line x1="${gx}" y1="${gy}" x2="${ax}" y2="${ay}" stroke="#ffffff" stroke-width="1.0" stroke-dasharray="2 12" class="stream-ghost-particles" opacity="0.75"/>

                <line x1="${gx}" y1="${gy}" x2="${CX}" y2="${CY}" stroke="${themeG.primary}" stroke-width="2.0" class="stream-apex-discharge" filter="url(#arcaneGlow)"/>

                <line x1="${CX}" y1="${CY}" x2="${ax}" y2="${ay}" stroke="${themeA.primary}" stroke-width="1.6" stroke-dasharray="3 3" opacity="0.75" filter="url(#arcaneGlow)"/>
                <line x1="${CX}" y1="${CY}" x2="${bx}" y2="${by}" stroke="${themeB.primary}" stroke-width="1.6" stroke-dasharray="3 3" opacity="0.75" filter="url(#arcaneGlow)"/>
            </g>

            <!-- Outward Laser Filaments -->
            <g id="astrolabeInnerLasers" class="stage-elem inscribe-conduit-loop" opacity="0.85">
                <line x1="${ax}" y1="${ay}" x2="${oax}" y2="${oay}" stroke="${themeA.primary}" stroke-width="2.0" filter="url(#arcaneGlow)" class="stream-genesis-to-mod"/>
                <line x1="${ax}" y1="${ay}" x2="240.00" y2="38.08" stroke="${themeA.primary}" stroke-width="0.9" opacity="0.45" stroke-dasharray="3 3"/>
                <line x1="${ax}" y1="${ay}" x2="360.00" y2="38.08" stroke="${themeA.primary}" stroke-width="0.9" opacity="0.45" stroke-dasharray="3 3"/>

                <line x1="${bx}" y1="${by}" x2="${obx}" y2="${oby}" stroke="${themeB.primary}" stroke-width="2.0" filter="url(#arcaneGlow)" class="stream-genesis-to-mod"/>
                <line x1="${bx}" y1="${by}" x2="556.83" y2="379.00" stroke="${themeB.primary}" stroke-width="0.9" opacity="0.45" stroke-dasharray="3 3"/>
                <line x1="${bx}" y1="${by}" x2="496.83" y2="482.92" stroke="${themeB.primary}" stroke-width="0.9" opacity="0.45" stroke-dasharray="3 3"/>

                <line x1="${gx}" y1="${gy}" x2="${ogx}" y2="${ogy}" stroke="${themeG.primary}" stroke-width="2.0" filter="url(#arcaneGlow)" class="stream-genesis-to-mod"/>
                <line x1="${gx}" y1="${gy}" x2="103.17" y2="482.92" stroke="${themeG.primary}" stroke-width="0.9" opacity="0.45" stroke-dasharray="3 3"/>
                <line x1="${gx}" y1="${gy}" x2="43.17" y2="379.00" stroke="${themeG.primary}" stroke-width="0.9" opacity="0.45" stroke-dasharray="3 3"/>
            </g>

            <g class="subnode-alpha-group">
                ${generateSubNodeCircleSVG("alpha", nA, ax, ay, arrayState.activeNode === "alpha", themeA, "sub-spin-inner-alpha-chant", "sub-spin-inner-alpha-mod", "sub-spin-inner-alpha-del", "sub-pulse-inner-alpha-core", "inner", 1.0)}
            </g>
            <g class="subnode-beta-group">
                ${generateSubNodeCircleSVG("beta", nB, bx, by, arrayState.activeNode === "beta", themeB, "sub-spin-inner-beta-chant", "sub-spin-inner-beta-mod", "sub-spin-inner-beta-del", "sub-pulse-inner-beta-core", "inner", 1.0)}
            </g>
            <g class="subnode-gamma-group">
                ${generateSubNodeCircleSVG("gamma", nG, gx, gy, arrayState.activeNode === "gamma", themeG, "sub-spin-inner-gamma-chant", "sub-spin-inner-gamma-mod", "sub-spin-inner-gamma-del", "sub-pulse-inner-gamma-core", "inner", 1.0)}
            </g>
        </g>

        <!-- 2. MID-RING RULUWAR CROWN (PURE CSS ORBIT) -->
        <g id="astrolabeRuluwarOrbit" class="array-orbit-ruluwar-crown stage-elem inscribe-conduit-loop">
            ${ruluwarOuterRunesSVG}
        </g>

        <!-- 3. INTERMEDIATE OUTER TRIAD (ON R=278, PURE CSS ORBIT) -->
        <g id="astrolabeOuterTriad" class="array-orbit-outer-triad">
            <g class="stage-elem inscribe-conduit-loop" opacity="0.8">
                <polygon points="${oax},${oay} ${obx},${oby} ${ogx},${ogy}" fill="none" stroke="#ffffff" stroke-width="1.6" stroke-dasharray="4 4" filter="url(#arcaneGlow)"/>
                <line x1="${oax}" y1="${oay}" x2="${obx}" y2="${oby}" stroke="url(#flowGrad12)" stroke-width="1.8" class="stream-genesis-to-mod"/>
                <line x1="${obx}" y1="${oby}" x2="${ogx}" y2="${ogy}" stroke="url(#flowGrad23)" stroke-width="1.8" class="stream-mod-to-apex"/>
                <line x1="${ogx}" y1="${ogy}" x2="${oax}" y2="${oay}" stroke="url(#flowGrad31)" stroke-width="1.8" class="stream-recirculation-loop"/>
            </g>

            <!-- Inward Laser Beams -->
            <g id="astrolabeOuterLasers" class="stage-elem inscribe-conduit-loop" opacity="0.85">
                <line x1="${oax}" y1="${oay}" x2="${ax}" y2="${ay}" stroke="${themeA.primary}" stroke-width="2.2" filter="url(#arcaneGlow)" class="stream-genesis-to-mod"/>
                <line x1="${oax}" y1="${oay}" x2="240.00" y2="125.92" stroke="${themeA.primary}" stroke-width="0.9" opacity="0.5" stroke-dasharray="3 3"/>
                <line x1="${oax}" y1="${oay}" x2="360.00" y2="125.92" stroke="${themeA.primary}" stroke-width="0.9" opacity="0.5" stroke-dasharray="3 3"/>
                <circle cx="${ax}" cy="${ay}" r="2.5" fill="#ffffff" filter="url(#arcaneGlow)"/>

                <line x1="${obx}" y1="${oby}" x2="${bx}" y2="${by}" stroke="${themeB.primary}" stroke-width="2.2" filter="url(#arcaneGlow)" class="stream-genesis-to-mod"/>
                <line x1="${obx}" y1="${oby}" x2="420.75" y2="439.00" stroke="${themeB.primary}" stroke-width="0.9" opacity="0.5" stroke-dasharray="3 3"/>
                <line x1="${obx}" y1="${oby}" x2="480.75" y2="335.08" stroke="${themeB.primary}" stroke-width="0.9" opacity="0.5" stroke-dasharray="3 3"/>
                <circle cx="${bx}" cy="${by}" r="2.5" fill="#ffffff" filter="url(#arcaneGlow)"/>

                <line x1="${ogx}" y1="${ogy}" x2="${gx}" y2="${gy}" stroke="${themeG.primary}" stroke-width="2.2" filter="url(#arcaneGlow)" class="stream-genesis-to-mod"/>
                <line x1="${ogx}" y1="${ogy}" x2="179.25" y2="439.00" stroke="${themeG.primary}" stroke-width="0.9" opacity="0.5" stroke-dasharray="3 3"/>
                <line x1="${ogx}" y1="${ogy}" x2="119.25" y2="335.08" stroke="${themeG.primary}" stroke-width="0.9" opacity="0.5" stroke-dasharray="3 3"/>
                <circle cx="${gx}" cy="${gy}" r="2.5" fill="#ffffff" filter="url(#arcaneGlow)"/>
            </g>

            <g class="subnode-alpha-group">
                ${generateSubNodeCircleSVG("alpha", nA, oax, oay, arrayState.activeNode === "alpha", themeA, "sub-spin-outer-alpha-chant", "sub-spin-outer-alpha-mod", "sub-spin-outer-alpha-del", "sub-pulse-outer-alpha-core", "outer", 0.70)}
            </g>
            <g class="subnode-beta-group">
                ${generateSubNodeCircleSVG("beta", nB, obx, oby, arrayState.activeNode === "beta", themeB, "sub-spin-outer-beta-chant", "sub-spin-outer-beta-mod", "sub-spin-outer-beta-del", "sub-pulse-outer-beta-core", "outer", 0.70)}
            </g>
            <g class="subnode-gamma-group">
                ${generateSubNodeCircleSVG("gamma", nG, ogx, ogy, arrayState.activeNode === "gamma", themeG, "sub-spin-outer-gamma-chant", "sub-spin-outer-gamma-mod", "sub-spin-outer-gamma-del", "sub-pulse-outer-gamma-core", "outer", 0.70)}
            </g>
        </g>

        <!-- ================= MASTER 3-SIDED YIN-YANG CORE (CENTER) ================= -->
        <g transform="translate(${CX}, ${CY})">
            ${generateTripleYinYangSVG(nA, nB, nG, themeA, themeB, themeG)}
        </g>

        <!-- ================= 4. GRAND ENCOMPASSING RUNIC CHANT CIRCLE (38px FONT) ================= -->
        <g class="array-grand-border-chant-group" color="${themeA.primary}">
            <g class="stage-elem inscribe-grand-border">
                <circle cx="${CX}" cy="${CY}" r="438" fill="none" stroke="${themeA.primary}" stroke-width="2.6" opacity="0.92" filter="url(#arcaneGlow)"/>
                <circle cx="${CX}" cy="${CY}" r="388" fill="none" stroke="${themeB.primary}" stroke-width="1.4" opacity="0.65" stroke-dasharray="6 4"/>
                <circle cx="${CX}" cy="${CY}" r="448" fill="none" stroke="${themeG.primary}" stroke-width="1.0" opacity="0.45" stroke-dasharray="4 6"/>
            </g>
            <g class="stage-elem inscribe-grand-chant">
                <text font-family="'Segoe UI Historic', 'Noto Sans Runic', 'Apple Symbols', 'Segoe UI Symbol', monospace" font-size="38" font-weight="900" letter-spacing="3" fill="${themeA.primary}" opacity="0.96" filter="url(#arcaneGlow)">
                    <textPath href="#grandOuterBorderArrayTrack" startOffset="0%" textLength="${GRAND_CHANT_CIRCUMFERENCE}" lengthAdjust="spacing">
                        ${fullGrandRunicChant}
                    </textPath>
                </text>
            </g>
        </g>
    </svg>
    `;
}

// -------------------------------------------------------------
// 9. ASTROLABE REAL-TIME RAF ENGINE & MANUAL PHASE CONTROLLER
// -------------------------------------------------------------
function startAstrolabeEngine() {
    if (arrayAstrolabe.rafId) {
        cancelAnimationFrame(arrayAstrolabe.rafId);
    }

    let lastTime = performance.now();

    function updateAstrolabe(now) {
        const delta = (now - lastTime) / 1000;
        lastTime = now;

        // If user manually scrubs or snaps to a preset, drive the phase dynamically
        if (arrayAstrolabe.targetPhase !== null) {
            let diff = arrayAstrolabe.targetPhase - arrayAstrolabe.phase;
            while (diff < -180) diff += 360;
            while (diff > 180) diff -= 360;

            if (Math.abs(diff) < 0.2) {
                arrayAstrolabe.phase = arrayAstrolabe.targetPhase;
                arrayAstrolabe.targetPhase = null;
            } else {
                arrayAstrolabe.phase = (arrayAstrolabe.phase + diff * 0.16 + 360) % 360;
            }
        } else if (arrayAstrolabe.isAutoOrbit && !arrayCircleState.isInscribing) {
            arrayAstrolabe.phase = (arrayAstrolabe.phase + 16 * arrayAstrolabe.speedMult * delta) % 360;
        }

        const A = ((arrayAstrolabe.phase % 120) + 120) % 120;
        const conjDist = Math.min(A, 120 - A);

        let statusText = "○ ASTROLABE TRANSIT";
        let statusColor = "#94a3b8";
        let laserBoost = 0.55;

        if (conjDist < 3.5) {
            statusText = "✦ CONJUNCTION SURGE";
            statusColor = "#ffffff";
            laserBoost = 1.0;
        } else if (Math.abs(A - 60) < 3.5) {
            statusText = "✡ MERKABAH HARMONIC LOCK";
            statusColor = "#38bdf8";
            laserBoost = 0.92;
        } else if (Math.abs(A - 30) < 3.5) {
            statusText = "◈ DELTOID KITE RESONANCE";
            statusColor = "#facc15";
            laserBoost = 0.78;
        } else if (Math.abs(A - 90) < 3.5) {
            statusText = "✴ OCTAGRAM TANGENT";
            statusColor = "#f97316";
            laserBoost = 0.78;
        }

        const innerLasers = document.getElementById("astrolabeInnerLasers");
        const outerLasers = document.getElementById("astrolabeOuterLasers");
        if (innerLasers) innerLasers.style.opacity = laserBoost.toFixed(2);
        if (outerLasers) outerLasers.style.opacity = laserBoost.toFixed(2);

        const sliderEl = document.getElementById("astrolabePhaseSlider");
        if (sliderEl && !sliderEl.matches(":active")) {
            sliderEl.value = arrayAstrolabe.phase.toFixed(1);
        }

        const hudPanel = document.getElementById("arcaneJarvisHudPanel");
        if (hudPanel && arrayAstrolabe.isTelemetryOpen) {
            const elStatus = document.getElementById("hudLiveStatus");
            const elPhase = document.getElementById("hudLivePhase");
            const elRatio = document.getElementById("hudLiveRatio");

            if (elStatus) {
                elStatus.textContent = statusText;
                elStatus.style.color = statusColor;
            }
            if (elPhase) elPhase.textContent = `PHASE: ${arrayAstrolabe.phase.toFixed(1).padStart(5, '0')}°`;
            if (elRatio) elRatio.textContent = `HARMONIC: 3:2`;

            const pctA = Math.round(65 + 34 * laserBoost);
            const pctB = Math.round(55 + 42 * laserBoost);
            const pctG = Math.round(70 + 29 * laserBoost);

            const barA = document.getElementById("hudFluxBarA");
            const valA = document.getElementById("hudFluxValA");
            const barB = document.getElementById("hudFluxBarB");
            const valB = document.getElementById("hudFluxValB");
            const barG = document.getElementById("hudFluxBarG");
            const valG = document.getElementById("hudFluxValG");

            if (barA) barA.style.width = `${pctA}%`;
            if (valA) valA.textContent = `${pctA}%`;
            if (barB) barB.style.width = `${pctB}%`;
            if (valB) valB.textContent = `${pctB}%`;
            if (barG) barG.style.width = `${pctG}%`;
            if (valG) valG.textContent = `${pctG}%`;

            const sparkline = document.getElementById("hudWaveformSparkline");
            if (sparkline) {
                const p = (arrayAstrolabe.phase * Math.PI) / 180;
                const y1 = (16 + 8 * Math.sin(p * 2)).toFixed(1);
                const y2 = (16 + 10 * Math.cos(p * 3)).toFixed(1);
                const y3 = (16 - 9 * Math.sin(p * 4)).toFixed(1);
                const y4 = (16 + 8 * Math.cos(p * 2)).toFixed(1);
                sparkline.setAttribute("d", `M 0,16 L 30,16 L 55,${y1} L 85,${y2} L 115,${y3} L 145,${y4} L 175,${y1} L 205,${y2} L 235,${y3} L 270,16`);
            }
        }

        arrayAstrolabe.rafId = requestAnimationFrame(updateAstrolabe);
    }

    arrayAstrolabe.rafId = requestAnimationFrame(updateAstrolabe);
}

// -------------------------------------------------------------
// 10. MOUNT 4X LARGER FLOATING JARVIS TELEMETRY HUD & BUTTON
// -------------------------------------------------------------
function toggleTelemetryHUD() {
    arrayAstrolabe.isTelemetryOpen = !arrayAstrolabe.isTelemetryOpen;
    const hud = document.getElementById("arcaneJarvisHudPanel");
    const btn = document.getElementById("btnToggleTelemetryHUD");

    if (hud) {
        hud.style.display = arrayAstrolabe.isTelemetryOpen ? "block" : "none";
    }
    if (btn) {
        btn.classList.toggle("active", arrayAstrolabe.isTelemetryOpen);
        btn.style.borderColor = arrayAstrolabe.isTelemetryOpen ? "#38bdf8" : "#334155";
        btn.style.color = arrayAstrolabe.isTelemetryOpen ? "#38bdf8" : "#94a3b8";
    }
}

function mountJarvisTelemetryHUD() {
    if (document.getElementById("arcaneJarvisHudPanel")) return;

    const container = document.getElementById("spellCircleContainer") || document.body;
    const nA = arrayState.nodes.alpha;
    const nB = arrayState.nodes.beta;
    const nG = arrayState.nodes.gamma;

    const triReaction = (typeof getTriElementalReaction === "function") 
        ? getTriElementalReaction(nA.element, nB.element, nG.element) 
        : { name: "Tri-Elemental Reaction", compoundName: "Triad Core" };
    const depClass = (typeof getDeploymentClass === "function") 
        ? getDeploymentClass(nA.delivery, nB.delivery, nG.delivery) 
        : { id: "U-U-U", name: "Array Deployment" };

    const themeA = (typeof ELEMENT_COLORS !== "undefined" && ELEMENT_COLORS[nA.element]) ? ELEMENT_COLORS[nA.element] : { primary: "#f97316" };
    const themeB = (typeof ELEMENT_COLORS !== "undefined" && ELEMENT_COLORS[nB.element]) ? ELEMENT_COLORS[nB.element] : { primary: "#facc15" };
    const themeG = (typeof ELEMENT_COLORS !== "undefined" && ELEMENT_COLORS[nG.element]) ? ELEMENT_COLORS[nG.element] : { primary: "#f59e0b" };

    const hud = document.createElement("div");
    hud.id = "arcaneJarvisHudPanel";
    hud.style.cssText = `
        position: absolute;
        top: 54px;
        right: 12px;
        width: 320px;
        max-width: calc(100vw - 32px);
        background: rgba(9, 11, 16, 0.94);
        border: 1.5px solid #38bdf8;
        border-radius: 10px;
        padding: 16px;
        color: #f8fafc;
        font-family: 'Segoe UI', 'Consolas', monospace;
        font-size: 13px;
        line-height: 1.4;
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        box-shadow: 0 12px 36px rgba(0, 0, 0, 0.8), 0 0 20px rgba(56, 189, 248, 0.25);
        z-index: 1000;
        display: none;
        user-select: none;
    `;

    hud.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #1e293b; padding-bottom:8px; margin-bottom:10px;">
            <div style="display:flex; align-items:center; gap:8px;">
                <span style="font-size:10px; color:#38bdf8;">●</span>
                <span style="font-size:13px; font-weight:800; color:#38bdf8; letter-spacing:1px;">SYS.ASTROLABE // HUD</span>
            </div>
            <button onclick="toggleTelemetryHUD()" style="background:transparent; border:none; color:#64748b; font-size:18px; cursor:pointer; line-height:1;" onmouseover="this.style.color='#f8fafc'" onmouseout="this.style.color='#64748b'">&times;</button>
        </div>

        <div style="margin-bottom:12px;">
            <div id="hudLiveStatus" style="font-size:14px; font-weight:900; color:#38bdf8; letter-spacing:0.8px; margin-bottom:4px;">
                ✦ MERKABAH HARMONIC LOCK
            </div>
            <div style="display:flex; justify-content:space-between; font-size:12.5px; color:#94a3b8; font-weight:700;">
                <span id="hudLivePhase">PHASE: 060.0°</span>
                <span id="hudLiveRatio" style="color:#38bdf8;">HARMONIC: 3:2</span>
            </div>
        </div>

        <div style="background:#07090e; border:1px solid #1e293b; border-radius:6px; padding:6px 8px; margin-bottom:12px;">
            <div style="display:flex; justify-content:space-between; font-size:11px; color:#64748b; margin-bottom:4px; font-weight:700;">
                <span>RESONANCE FLUX</span>
                <span style="color:#38bdf8;">432.8 THz</span>
            </div>
            <svg viewBox="0 0 270 32" style="width:100%; height:28px; overflow:visible;">
                <path id="hudWaveformSparkline" d="M 0,16 L 30,16 L 55,8 L 85,24 L 115,6 L 145,26 L 175,8 L 205,24 L 235,6 L 270,16" 
                      fill="none" stroke="#38bdf8" stroke-width="1.8" filter="url(#arcaneGlow)"/>
                <line x1="0" y1="16" x2="270" y2="16" stroke="#1e293b" stroke-width="0.8"/>
            </svg>
        </div>

        <div style="margin-bottom:12px;">
            <div style="display:flex; justify-content:space-between; font-size:12px; font-weight:700; color:${themeA.primary}; margin-bottom:2px;">
                <span>α GENESIS FLUX (${nA.element.toUpperCase()})</span>
                <span id="hudFluxValA">88%</span>
            </div>
            <div style="background:#0d111a; border:1px solid #1e293b; border-radius:4px; height:8px; overflow:hidden; margin-bottom:8px;">
                <div id="hudFluxBarA" style="background:${themeA.primary}; width:88%; height:100%; transition:width 0.2s;"></div>
            </div>

            <div style="display:flex; justify-content:space-between; font-size:12px; font-weight:700; color:${themeB.primary}; margin-bottom:2px;">
                <span>β MODULATION FREQ (${nB.element.toUpperCase()})</span>
                <span id="hudFluxValB">72%</span>
            </div>
            <div style="background:#0d111a; border:1px solid #1e293b; border-radius:4px; height:8px; overflow:hidden; margin-bottom:8px;">
                <div id="hudFluxBarB" style="background:${themeB.primary}; width:72%; height:100%; transition:width 0.2s;"></div>
            </div>

            <div style="display:flex; justify-content:space-between; font-size:12px; font-weight:700; color:${themeG.primary}; margin-bottom:2px;">
                <span>γ APEX SATURATION (${nG.element.toUpperCase()})</span>
                <span id="hudFluxValG">94%</span>
            </div>
            <div style="background:#0d111a; border:1px solid #1e293b; border-radius:4px; height:8px; overflow:hidden;">
                <div id="hudFluxBarG" style="background:${themeG.primary}; width:94%; height:100%; transition:width 0.2s;"></div>
            </div>
        </div>

        <div style="border-top:1px solid #1e293b; padding-top:8px; font-size:11.5px; color:#94a3b8; display:flex; flex-direction:column; gap:4px;">
            <div style="display:flex; justify-content:space-between;">
                <span>CIRCUIT TOPOLOGY:</span>
                <strong style="color:#f8fafc;">[${depClass.id}] ${depClass.name}</strong>
            </div>
            <div style="display:flex; justify-content:space-between;">
                <span>REACTION SYNTHESIS:</span>
                <strong style="color:#38bdf8;">${triReaction.compoundName || triReaction.name}</strong>
            </div>
            <div style="display:flex; justify-content:space-between;">
                <span>CIRCUIT RETENTION:</span>
                <strong style="color:#22c55e;">99.98% (CLOSED-LOOP)</strong>
            </div>
        </div>
    `;

    if (container) {
        container.style.position = "relative";
        container.appendChild(hud);
    }

    if (!document.getElementById("btnToggleTelemetryHUD")) {
        const btn = document.createElement("button");
        btn.id = "btnToggleTelemetryHUD";
        btn.className = "circle-action-btn";
        btn.setAttribute("title", "Toggle Arcane Astrolabe Telemetry HUD");
        btn.style.cssText = `
            display: inline-flex;
            align-items: center;
            gap: 6px;
            cursor: pointer;
        `;
        btn.innerHTML = `<span>📊</span> Telemetry`;
        btn.onclick = () => toggleTelemetryHUD();

        const exportGifBtn = document.getElementById("exportGifBtn");
        const actionContainer = exportGifBtn ? exportGifBtn.parentNode : null;

        if (actionContainer) {
            actionContainer.appendChild(btn);
        } else if (container) {
            btn.style.position = "absolute";
            btn.style.top = "12px";
            btn.style.right = "60px";
            btn.style.zIndex = "100";
            container.appendChild(btn);
        }
    }
}

// -------------------------------------------------------------
// 11. RENDER & TRIGGER FUNCTIONS
// -------------------------------------------------------------
function renderAstrolabeControlPanel() {
    const existing = document.getElementById("arrayAstrolabeControls");
    if (existing) return;

    const container = document.getElementById("spellCircleContainer");
    if (!container || !container.parentNode) return;

    const panel = document.createElement("div");
    panel.id = "arrayAstrolabeControls";
    panel.style.cssText = `
        display: flex;
        flex-direction: column;
        gap: 8px;
        width: 100%;
        max-width: 540px;
        margin: 12px auto 0;
        padding: 10px 14px;
        background: #0b0d13;
        border: 1px solid #252b3b;
        border-radius: 8px;
        box-shadow: 0 4px 16px rgba(0,0,0,0.5);
        color: #e2e8f0;
        font-family: 'Segoe UI', monospace;
        font-size: 0.8rem;
    `;

    panel.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center;">
            <span style="font-weight: 700; color: #38bdf8; letter-spacing: 0.8px;">ASTROLABE HARMONIC CONTROLLER</span>
            <div style="display: flex; gap: 4px;">
                <button id="btnOrbitToggle" class="astrolabe-btn" style="background:#1e293b; color:#f8fafc; border:1px solid #475569; padding:3px 8px; border-radius:4px; cursor:pointer; font-weight:700;">
                    ⏸ PAUSE
                </button>
            </div>
        </div>

        <div style="display: flex; align-items: center; gap: 10px;">
            <span style="font-size: 0.72rem; color: #94a3b8;">PHASE</span>
            <input type="range" id="astrolabePhaseSlider" min="0" max="360" step="0.5" value="0" style="flex: 1; accent-color: #38bdf8; cursor: pointer;">
        </div>

        <div style="display: flex; justify-content: space-between; gap: 4px; flex-wrap: wrap;">
            <button class="astrolabe-preset-btn" onclick="setAstrolabePhase(0)" style="flex:1; background:#0f172a; color:#f8fafc; border:1px solid #334155; padding:4px 4px; border-radius:4px; font-size:0.7rem; cursor:pointer;">
                ✦ 0° Conjunction
            </button>
            <button class="astrolabe-preset-btn" onclick="setAstrolabePhase(30)" style="flex:1; background:#0f172a; color:#facc15; border:1px solid #334155; padding:4px 4px; border-radius:4px; font-size:0.7rem; cursor:pointer;">
                ◈ 30° Deltoid
            </button>
            <button class="astrolabe-preset-btn" onclick="setAstrolabePhase(60)" style="flex:1; background:#0f172a; color:#38bdf8; border:1px solid #334155; padding:4px 4px; border-radius:4px; font-size:0.7rem; cursor:pointer;">
                ✡ 60° Merkabah
            </button>
            <button class="astrolabe-preset-btn" onclick="setAstrolabePhase(90)" style="flex:1; background:#0f172a; color:#f97316; border:1px solid #334155; padding:4px 4px; border-radius:4px; font-size:0.7rem; cursor:pointer;">
                ✴ 90° Octagram
            </button>
        </div>
    `;

    container.parentNode.insertBefore(panel, container.nextSibling);

    const toggleBtn = document.getElementById("btnOrbitToggle");
    const slider = document.getElementById("astrolabePhaseSlider");

    if (toggleBtn) {
        toggleBtn.addEventListener("click", () => {
            arrayAstrolabe.isAutoOrbit = !arrayAstrolabe.isAutoOrbit;
            toggleBtn.innerHTML = arrayAstrolabe.isAutoOrbit ? "⏸ PAUSE" : "▶ ORBIT";
            toggleBtn.style.color = arrayAstrolabe.isAutoOrbit ? "#f8fafc" : "#38bdf8";
        });
    }

    if (slider) {
        slider.addEventListener("input", (e) => {
            arrayAstrolabe.isAutoOrbit = false;
            arrayAstrolabe.targetPhase = null;
            arrayAstrolabe.phase = parseFloat(e.target.value);
            if (toggleBtn) {
                toggleBtn.innerHTML = "▶ ORBIT";
                toggleBtn.style.color = "#38bdf8";
            }
        });
    }
}

function setAstrolabePhase(angle) {
    arrayAstrolabe.targetPhase = angle % 360;
}

function renderArrayCircleSVG() {
    const container = document.getElementById("spellCircleContainer");
    if (!container) return;
    container.innerHTML = generateArrayCircleSVG(arrayCircleState.isInscribing);
    renderAstrolabeControlPanel();
    mountJarvisTelemetryHUD();
    startAstrolabeEngine();
}

function triggerArrayInscriptionAnimation() {
    if (arrayCircleState.isInscribing) return;
    arrayCircleState.isInscribing = true;

    if (typeof arrayAstrolabe !== "undefined") {
        arrayAstrolabe.phase = Math.floor(Math.random() * 360);
    }

    if (typeof playInscriptionAudio === "function") {
        playInscriptionAudio();
    }

    const container = document.getElementById("spellCircleContainer");
    if (!container) return;

    container.innerHTML = generateArrayCircleSVG(true);

    setTimeout(() => {
        arrayCircleState.isInscribing = false;
        renderArrayCircleSVG();
    }, 4800);
}

// Global window attachments
window.generateArrayCircleSVG = generateArrayCircleSVG;
window.renderArrayCircleSVG = renderArrayCircleSVG;
window.triggerArrayInscriptionAnimation = triggerArrayInscriptionAnimation;
window.setAstrolabePhase = setAstrolabePhase;
window.toggleTelemetryHUD = toggleTelemetryHUD;
window.mountJarvisTelemetryHUD = mountJarvisTelemetryHUD;