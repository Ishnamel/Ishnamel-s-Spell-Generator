/* ==========================================================================
   DEDICATED MAGIC ARRAY SPELL CIRCLE SVG & ASTROLABE ENGINE
   Hyper-Speed Inner Turbines, Supersonic Streamers & Merkabah Physics
   ========================================================================== */

let arrayCircleState = {
    isInscribing: false
};

// -------------------------------------------------------------
// ASTROLABE ENGINE STATE
// -------------------------------------------------------------
let arrayAstrolabe = {
    phase: 0,           // Master phase angle in degrees [0 - 360]
    isAutoOrbit: true,  // Auto-rotation toggle
    speedMult: 1.0,     // Speed multiplier
    targetPhase: null,  // For smooth snapping interpolation
    rafId: null         // Animation frame request ID
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
// 2. UNIVERSAL PHYSICAL HULL MORPHING ENGINE (ALL 8 CATEGORIES)
// -------------------------------------------------------------
function getModifierHullMorphSVG(modId, rBase, theme, spinAnimCW, spinAnimCCW) {
    if (!modId) {
        return `<circle cx="0" cy="0" r="${rBase}" fill="#090b10" stroke="currentColor" stroke-width="1.8" filter="url(#arcaneGlow)"/>`;
    }

    switch (modId) {
        // =========================================================
        // CATEGORY 1: SHAPE MODIFIERS
        // =========================================================
        case "taddum": { // Oscillating Blade: 18-tooth hyper-speed spinning saw-blade chakram
            let pts = [];
            for (let i = 0; i < 18; i++) {
                const a0 = (i * 2 * Math.PI) / 18;
                const a1 = ((i + 0.45) * 2 * Math.PI) / 18;
                const a2 = ((i + 0.85) * 2 * Math.PI) / 18;
                pts.push(`${((rBase - 2) * Math.cos(a0)).toFixed(2)},${((rBase - 2) * Math.sin(a0)).toFixed(2)}`);
                pts.push(`${((rBase + 10) * Math.cos(a1)).toFixed(2)},${((rBase + 10) * Math.sin(a1)).toFixed(2)}`);
                pts.push(`${((rBase - 3) * Math.cos(a2)).toFixed(2)},${((rBase - 3) * Math.sin(a2)).toFixed(2)}`);
            }
            return `<polygon points="${pts.join(' ')}" fill="#090b10" stroke="currentColor" stroke-width="2.2" filter="url(#arcaneGlow)"/>`;
        }
        case "yinla": // Linear Ray: 4 sharp prismatic focusing fins
            return `
                <circle cx="0" cy="0" r="${rBase}" fill="#090b10" stroke="currentColor" stroke-width="1.8" filter="url(#arcaneGlow)"/>
                <polygon points="0,-${rBase + 15} 7,-${rBase - 2} -7,-${rBase - 2}" fill="currentColor" opacity="0.9"/>
                <polygon points="0,${rBase + 15} 7,${rBase - 2} -7,${rBase - 2}" fill="currentColor" opacity="0.9"/>
                <polygon points="-${rBase + 15},0 -${rBase - 2},7 -${rBase - 2},-7" fill="currentColor" opacity="0.9"/>
                <polygon points="${rBase + 15},0 ${rBase - 2},7 ${rBase - 2},-7" fill="currentColor" opacity="0.9"/>
            `;
        case "praba": { // Planar Barrier: Octagonal adamantine plate
            let pts = [];
            for (let i = 0; i < 8; i++) {
                const a = (i * 2 * Math.PI) / 8 + Math.PI / 8;
                pts.push(`${(rBase * Math.cos(a)).toFixed(2)},${(rBase * Math.sin(a)).toFixed(2)}`);
            }
            return `
                <polygon points="${pts.join(' ')}" fill="#090b10" stroke="currentColor" stroke-width="2.6" filter="url(#arcaneGlow)"/>
                <polygon points="${pts.join(' ')}" fill="none" stroke="currentColor" stroke-width="1.0" stroke-dasharray="4 2" opacity="0.7"/>
            `;
        }
        case "ngisngi": // Spinning Annular Halos (Rapid Dual Rotation)
            return `
                <circle cx="0" cy="0" r="${rBase}" fill="#090b10" stroke="currentColor" stroke-width="1.8" filter="url(#arcaneGlow)"/>
                <g class="${spinAnimCW}">
                    <circle cx="0" cy="0" r="${rBase + 6}" fill="none" stroke="currentColor" stroke-width="1.2" stroke-dasharray="14 8" opacity="0.85"/>
                    <circle cx="0" cy="0" r="${rBase + 12}" fill="none" stroke="currentColor" stroke-width="0.8" stroke-dasharray="6 4" opacity="0.65"/>
                </g>
                <g class="${spinAnimCCW}">
                    <circle cx="0" cy="0" r="${rBase + 9}" fill="none" stroke="currentColor" stroke-width="1.0" stroke-dasharray="20 10" opacity="0.75"/>
                </g>
            `;
        case "yangga": { // Pinpoint Spike: 8 radiating armor-piercing diamond lances
            let pts = [];
            for (let i = 0; i < 8; i++) {
                const a1 = ((i - 0.22) * 2 * Math.PI) / 8;
                const aTip = (i * 2 * Math.PI) / 8;
                const a2 = ((i + 0.22) * 2 * Math.PI) / 8;
                pts.push(`${(rBase * Math.cos(a1)).toFixed(2)},${(rBase * Math.sin(a1)).toFixed(2)}`);
                pts.push(`${((rBase + 14) * Math.cos(aTip)).toFixed(2)},${((rBase + 14) * Math.sin(aTip)).toFixed(2)}`);
                pts.push(`${(rBase * Math.cos(a2)).toFixed(2)},${(rBase * Math.sin(a2)).toFixed(2)}`);
            }
            return `<polygon points="${pts.join(' ')}" fill="#090b10" stroke="currentColor" stroke-width="2.0" filter="url(#arcaneGlow)"/>`;
        }
        case "gilbo": { // Condensed Spherical Core: High-density ring with orbital beads
            let pips = "";
            for (let i = 0; i < 12; i++) {
                const a = (i * 2 * Math.PI) / 12;
                pips += `<circle cx="${((rBase + 5) * Math.cos(a)).toFixed(2)}" cy="${((rBase + 5) * Math.sin(a)).toFixed(2)}" r="2.2" fill="currentColor"/>`;
            }
            return `
                <circle cx="0" cy="0" r="${rBase}" fill="#090b10" stroke="currentColor" stroke-width="2.6" filter="url(#arcaneGlow)"/>
                <circle cx="0" cy="0" r="${rBase + 5}" fill="none" stroke="currentColor" stroke-width="1.0" stroke-dasharray="3 3" opacity="0.8"/>
                ${pips}
            `;
        }
        case "apap": // Expanding Frontal Cone: Flared directional chevron brackets
            return `
                <circle cx="0" cy="0" r="${rBase}" fill="#090b10" stroke="currentColor" stroke-width="1.8" filter="url(#arcaneGlow)"/>
                <path d="M -${rBase},-8 L -${rBase + 14},0 L -${rBase},8" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>
                <path d="M ${rBase},-8 L ${rBase + 14},0 L ${rBase},8" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>
                <path d="M -8,${rBase} L 0,${rBase + 14} L 8,${rBase}" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>
            `;
        case "abbay": { // Omnidirectional: 16-point star barrier
            let pts = [];
            for (let i = 0; i < 16; i++) {
                const a = (i * 2 * Math.PI) / 16;
                const r = i % 2 === 0 ? rBase + 11 : rBase - 3;
                pts.push(`${(r * Math.cos(a)).toFixed(2)},${(r * Math.sin(a)).toFixed(2)}`);
            }
            return `<polygon points="${pts.join(' ')}" fill="#090b10" stroke="currentColor" stroke-width="2.0" filter="url(#arcaneGlow)"/>`;
        }

        // =========================================================
        // CATEGORY 2: MOVEMENT MODIFIERS
        // =========================================================
        case "rundo": // Kinetic Repulsion: Radiating directional exhaust baffles
            return `
                <circle cx="0" cy="0" r="${rBase}" fill="#090b10" stroke="currentColor" stroke-width="1.8" filter="url(#arcaneGlow)"/>
                <path d="M -12,-${rBase} L 0,-${rBase + 12} L 12,-${rBase}" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/>
                <path d="M -${rBase},-12 L -${rBase + 12},0 L -${rBase},12" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/>
                <path d="M ${rBase},-12 L ${rBase + 12},0 L ${rBase},12" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/>
            `;
        case "yudgo": // Gravitational Suction: Inward-curving turbine vortex blades
            return `
                <circle cx="0" cy="0" r="${rBase}" fill="#090b10" stroke="currentColor" stroke-width="1.8" filter="url(#arcaneGlow)"/>
                <g class="${spinAnimCCW}">
                    <path d="M 0,-${rBase + 10} Q 14,-${rBase} 0,-${rBase - 8}" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>
                    <path d="M ${rBase + 10},0 Q ${rBase},14 ${rBase - 8},0" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>
                    <path d="M 0,${rBase + 10} Q -14,${rBase} 0,${rBase - 8}" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>
                    <path d="M -${rBase - 10},0 Q -${rBase},-14 -${rBase + 8},0" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>
                </g>
            `;
        case "kitas": // Magnetic Convergence: Dual polarized magnetic horseshoe clamp arcs
            return `
                <circle cx="0" cy="0" r="${rBase}" fill="#090b10" stroke="currentColor" stroke-width="1.8" filter="url(#arcaneGlow)"/>
                <path d="M -${rBase + 6},-16 A ${rBase + 6},${rBase + 6} 0 0,1 -${rBase + 6},16" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="square"/>
                <path d="M ${rBase + 6},-16 A ${rBase + 6},${rBase + 6} 0 0,0 ${rBase + 6},16" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="square"/>
            `;
        case "ewansi": // Deflective Shield Buffer: Convex curved protective aegis crescents
            return `
                <circle cx="0" cy="0" r="${rBase}" fill="#090b10" stroke="currentColor" stroke-width="1.8" filter="url(#arcaneGlow)"/>
                <path d="M -24,-${rBase + 4} Q 0,-${rBase + 16} 24,-${rBase + 4}" fill="none" stroke="currentColor" stroke-width="3.0" stroke-linecap="round"/>
                <path d="M -24,${rBase + 4} Q 0,${rBase + 16} 24,${rBase + 4}" fill="none" stroke="currentColor" stroke-width="3.0" stroke-linecap="round"/>
            `;
        case "surut": // Bio-Thermal Tracking: Thermal homing whiskers
            return `
                <circle cx="0" cy="0" r="${rBase}" fill="#090b10" stroke="currentColor" stroke-width="1.8" filter="url(#arcaneGlow)"/>
                <path d="M -18,-${rBase} Q 0,-${rBase - 18} 18,-${rBase}" fill="none" stroke="currentColor" stroke-width="2.0"/>
                <circle cx="0" cy="-${rBase + 8}" r="3" fill="currentColor"/>
                <circle cx="-${rBase + 6}" cy="0" r="3" fill="currentColor"/>
                <circle cx="${rBase + 6}" cy="0" r="3" fill="currentColor"/>
            `;
        case "blisu": // Closed-Loop Recycle: Dual looped Möbius energy lobes
            return `
                <circle cx="0" cy="0" r="${rBase}" fill="#090b10" stroke="currentColor" stroke-width="1.8" filter="url(#arcaneGlow)"/>
                <ellipse cx="0" cy="-${rBase + 4}" rx="8" ry="5" fill="none" stroke="currentColor" stroke-width="1.8"/>
                <ellipse cx="0" cy="${rBase + 4}" rx="8" ry="5" fill="none" stroke="currentColor" stroke-width="1.8"/>
                <polygon points="0,-${rBase + 9} -3,-${rBase + 4} 3,-${rBase + 4}" fill="currentColor"/>
            `;
        case "liwak": { // Centrifugal Acceleration: Aerodynamic swept vortex fins
            let fins = "";
            for (let i = 0; i < 6; i++) {
                const a = (i * 2 * Math.PI) / 6;
                const x1 = (rBase * Math.cos(a)).toFixed(2);
                const y1 = (rBase * Math.sin(a)).toFixed(2);
                const x2 = ((rBase + 12) * Math.cos(a + 0.35)).toFixed(2);
                const y2 = ((rBase + 12) * Math.sin(a + 0.35)).toFixed(2);
                fins += `<path d="M ${x1},${y1} Q ${x2},${y2} ${x2},${y2}" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>`;
            }
            return `
                <circle cx="0" cy="0" r="${rBase}" fill="#090b10" stroke="currentColor" stroke-width="1.8" filter="url(#arcaneGlow)"/>
                ${fins}
            `;
        }
        case "kijlo": // Ballistic Artillery Arc: Parabolic elevation guide brackets
            return `
                <circle cx="0" cy="0" r="${rBase}" fill="#090b10" stroke="currentColor" stroke-width="1.8" filter="url(#arcaneGlow)"/>
                <path d="M -${rBase + 8},10 Q 0,-${rBase + 18} ${rBase + 8},10" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/>
                <circle cx="0" cy="-${rBase + 18}" r="3.5" fill="currentColor"/>
            `;

        // =========================================================
        // CATEGORY 3: IMPACT MODIFIERS
        // =========================================================
        case "bamtuk": { // Thermobaric Blast Burst: Explosive fragmentation burst
            let pts = [];
            for (let i = 0; i < 20; i++) {
                const a = (i * 2 * Math.PI) / 20;
                const r = i % 2 === 0 ? rBase + 13 : rBase - 2;
                pts.push(`${(r * Math.cos(a)).toFixed(2)},${(r * Math.sin(a)).toFixed(2)}`);
            }
            return `<polygon points="${pts.join(' ')}" fill="#090b10" stroke="currentColor" stroke-width="2.2" filter="url(#arcaneGlow)"/>`;
        }
        case "tupwok": // Concussive Shockwave: Triple concentric ripple rings
            return `
                <circle cx="0" cy="0" r="${rBase}" fill="#090b10" stroke="currentColor" stroke-width="1.8" filter="url(#arcaneGlow)"/>
                <circle cx="0" cy="0" r="${rBase + 5}" fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.8"/>
                <circle cx="0" cy="0" r="${rBase + 11}" fill="none" stroke="currentColor" stroke-width="1.0" opacity="0.6"/>
                <circle cx="0" cy="0" r="${rBase + 16}" fill="none" stroke="currentColor" stroke-width="0.6" opacity="0.4"/>
            `;
        case "dukto": // Armor-Boring Drill: Diamond-tipped armor-piercing drill head
            return `
                <circle cx="0" cy="0" r="${rBase}" fill="#090b10" stroke="currentColor" stroke-width="1.8" filter="url(#arcaneGlow)"/>
                <polygon points="0,-${rBase + 18} -8,-${rBase} 8,-${rBase}" fill="currentColor"/>
                <line x1="0" y1="-${rBase + 18}" x2="0" y2="${rBase}" stroke="currentColor" stroke-width="2.0"/>
            `;
        case "iwa": // Molecular Shearing Cut: Cross-cutting razor blades
            return `
                <circle cx="0" cy="0" r="${rBase}" fill="#090b10" stroke="currentColor" stroke-width="1.8" filter="url(#arcaneGlow)"/>
                <line x1="-${rBase + 10}" y1="-${rBase + 10}" x2="${rBase + 10}" y2="${rBase + 10}" stroke="currentColor" stroke-width="2.5"/>
                <line x1="-${rBase + 10}" y1="${rBase + 10}" x2="${rBase + 10}" y2="-${rBase + 10}" stroke="currentColor" stroke-width="2.5"/>
            `;
        case "pittip": // Downwards Gravity Crush: Heavy downward compression anvil
            return `
                <circle cx="0" cy="0" r="${rBase}" fill="#090b10" stroke="currentColor" stroke-width="1.8" filter="url(#arcaneGlow)"/>
                <polygon points="-${rBase},-${rBase + 6} ${rBase},-${rBase + 6} 0,${rBase + 14}" fill="#090b10" stroke="currentColor" stroke-width="2.4" opacity="0.9"/>
            `;
        case "waras": { // Flak Cluster: Orbiting shrapnel cluster nodes
            let pips = "";
            for (let i = 0; i < 8; i++) {
                const a = (i * 2 * Math.PI) / 8 + 0.2;
                pips += `<circle cx="${((rBase + 8) * Math.cos(a)).toFixed(2)}" cy="${((rBase + 8) * Math.sin(a)).toFixed(2)}" r="2.8" fill="currentColor"/>`;
            }
            return `
                <circle cx="0" cy="0" r="${rBase}" fill="#090b10" stroke="currentColor" stroke-width="1.8" filter="url(#arcaneGlow)"/>
                ${pips}
            `;
        }
        case "tublag": { // Elastic Ricochet: Zigzag rebound teeth
            let pts = [];
            for (let i = 0; i < 12; i++) {
                const a = (i * 2 * Math.PI) / 12;
                const r = i % 2 === 0 ? rBase + 8 : rBase - 4;
                pts.push(`${(r * Math.cos(a)).toFixed(2)},${(r * Math.sin(a)).toFixed(2)}`);
            }
            return `<polygon points="${pts.join(' ')}" fill="#090b10" stroke="currentColor" stroke-width="2.0" filter="url(#arcaneGlow)"/>`;
        }
        case "tigkab": { // Fracture Crystal: Jagged crystalline fracture shards
            let pts = [];
            for (let i = 0; i < 9; i++) {
                const a = (i * 2 * Math.PI) / 9;
                const r = rBase + (i % 3 === 0 ? 12 : (i % 3 === 1 ? 4 : 8));
                pts.push(`${(r * Math.cos(a)).toFixed(2)},${(r * Math.sin(a)).toFixed(2)}`);
            }
            return `<polygon points="${pts.join(' ')}" fill="#090b10" stroke="currentColor" stroke-width="2.2" filter="url(#arcaneGlow)"/>`;
        }

        // =========================================================
        // CATEGORY 4: DURATION MODIFIERS
        // =========================================================
        case "tat": { // Instantaneous Flashover: 32-point corona spike burst
            let pts = [];
            for (let i = 0; i < 32; i++) {
                const a = (i * 2 * Math.PI) / 32;
                const r = i % 2 === 0 ? rBase + 12 : rBase - 3;
                pts.push(`${(r * Math.cos(a)).toFixed(2)},${(r * Math.sin(a)).toFixed(2)}`);
            }
            return `<polygon points="${pts.join(' ')}" fill="#090b10" stroke="currentColor" stroke-width="2.0" filter="url(#arcaneGlow)"/>`;
        }
        case "tul": // Continuous Channeled Loop: Triple heavy concentric containment bands
            return `
                <circle cx="0" cy="0" r="${rBase + 10}" fill="none" stroke="currentColor" stroke-width="1.8"/>
                <circle cx="0" cy="0" r="${rBase}" fill="#090b10" stroke="currentColor" stroke-width="2.8" filter="url(#arcaneGlow)"/>
                <circle cx="0" cy="0" r="${rBase - 8}" fill="none" stroke="currentColor" stroke-width="1.4"/>
            `;
        case "bati": { // Eternal Circuit Lock: Fortress keystone clamp brackets
            let ptsOuter = [], ptsInner = [];
            for (let i = 0; i < 8; i++) {
                const a = (i * 2 * Math.PI) / 8 + Math.PI / 8;
                ptsOuter.push(`${((rBase + 12) * Math.cos(a)).toFixed(2)},${((rBase + 12) * Math.sin(a)).toFixed(2)}`);
                ptsInner.push(`${((rBase - 6) * Math.cos(a)).toFixed(2)},${((rBase - 6) * Math.sin(a)).toFixed(2)}`);
            }
            return `
                <polygon points="${ptsOuter.join(' ')}" fill="#090b10" stroke="currentColor" stroke-width="2.4" filter="url(#arcaneGlow)"/>
                <polygon points="${ptsInner.join(' ')}" fill="none" stroke="currentColor" stroke-width="1.2"/>
            `;
        }
        case "tan": // Temporal Fuse Delay: 4 segmented chrono dial quadrants
            return `
                <circle cx="0" cy="0" r="${rBase}" fill="#090b10" stroke="currentColor" stroke-width="1.8" filter="url(#arcaneGlow)"/>
                <path d="M 0,-${rBase + 8} A ${rBase + 8},${rBase + 8} 0 0,1 ${rBase + 8},0" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round"/>
                <path d="M 0,${rBase + 8} A ${rBase + 8},${rBase + 8} 0 0,1 -${rBase + 8},0" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round"/>
            `;
        case "lit": // Staccato Pulse Repeater: Multi-tiered stepped pulse rings
            return `
                <circle cx="0" cy="0" r="${rBase + 12}" fill="none" stroke="currentColor" stroke-width="1.0" stroke-dasharray="4 4" opacity="0.6"/>
                <circle cx="0" cy="0" r="${rBase + 6}" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="8 4" opacity="0.85"/>
                <circle cx="0" cy="0" r="${rBase}" fill="#090b10" stroke="currentColor" stroke-width="2.2" filter="url(#arcaneGlow)"/>
            `;
        case "talkib": { // Proximity Trap Stasis: Inward interlocking trap teeth
            let teeth = "";
            for (let i = 0; i < 16; i++) {
                const a = (i * 2 * Math.PI) / 16;
                const x1 = ((rBase + 8) * Math.cos(a)).toFixed(2);
                const y1 = ((rBase + 8) * Math.sin(a)).toFixed(2);
                const x2 = ((rBase - 6) * Math.cos(a)).toFixed(2);
                const y2 = ((rBase - 6) * Math.sin(a)).toFixed(2);
                teeth += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="currentColor" stroke-width="1.8"/>`;
            }
            return `
                <circle cx="0" cy="0" r="${rBase}" fill="#090b10" stroke="currentColor" stroke-width="1.8" filter="url(#arcaneGlow)"/>
                ${teeth}
            `;
        }
        case "litu": { // Oscillating Tidal Wave: 12-lobed sinusoidal wave rim
            let pts = [];
            for (let i = 0; i <= 72; i++) {
                const th = (i * 2 * Math.PI) / 72;
                const r = rBase + 8 * Math.sin(12 * th);
                pts.push(`${(r * Math.cos(th)).toFixed(2)},${(r * Math.sin(th)).toFixed(2)}`);
            }
            return `<path d="M${pts.join(' L')} Z" fill="#090b10" stroke="currentColor" stroke-width="2.2" filter="url(#arcaneGlow)"/>`;
        }

        // =========================================================
        // CATEGORY 5: MULTIPLY MODIFIERS
        // =========================================================
        case "tiha": // Branching Fission: 3-pronged trident emitter crown
            return `
                <circle cx="0" cy="0" r="${rBase}" fill="#090b10" stroke="currentColor" stroke-width="1.8" filter="url(#arcaneGlow)"/>
                <path d="M 0,-${rBase} L 0,-${rBase + 16} M -10,-${rBase + 12} L 0,-${rBase} L 10,-${rBase + 12}" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/>
            `;
        case "padu": // Quad-Conduit Multiplying: 4 symmetric satellite node housings
            return `
                <circle cx="0" cy="0" r="${rBase}" fill="#090b10" stroke="currentColor" stroke-width="1.8" filter="url(#arcaneGlow)"/>
                <circle cx="-${rBase + 6}" cy="-${rBase + 6}" r="4" fill="currentColor"/>
                <circle cx="${rBase + 6}" cy="-${rBase + 6}" r="4" fill="currentColor"/>
                <circle cx="-${rBase + 6}" cy="${rBase + 6}" r="4" fill="currentColor"/>
                <circle cx="${rBase + 6}" cy="${rBase + 6}" r="4" fill="currentColor"/>
            `;
        case "silpu": // Dielectric Chain Cascade: Interlocking chain link arcs
            return `
                <circle cx="0" cy="0" r="${rBase}" fill="#090b10" stroke="currentColor" stroke-width="1.8" filter="url(#arcaneGlow)"/>
                <ellipse cx="-${rBase + 2}" cy="0" rx="8" ry="14" fill="none" stroke="currentColor" stroke-width="2.0"/>
                <ellipse cx="${rBase + 2}" cy="0" rx="8" ry="14" fill="none" stroke="currentColor" stroke-width="2.0"/>
            `;
        case "bunton": { // Salvo Cluster Swarm: Dense satellite cluster constellation
            let pips = "";
            for (let i = 0; i < 12; i++) {
                const a = (i * 2 * Math.PI) / 12;
                pips += `<circle cx="${((rBase + 6) * Math.cos(a)).toFixed(2)}" cy="${((rBase + 6) * Math.sin(a)).toFixed(2)}" r="2.2" fill="currentColor"/>`;
            }
            return `
                <circle cx="0" cy="0" r="${rBase}" fill="#090b10" stroke="currentColor" stroke-width="1.8" filter="url(#arcaneGlow)"/>
                ${pips}
            `;
        }

        // =========================================================
        // CATEGORY 6: TARGET MODIFIERS
        // =========================================================
        case "shak": // Somatic Grounding: Biometric neural pulse / cardiogram perimeter
            return `
                <circle cx="0" cy="0" r="${rBase}" fill="#090b10" stroke="currentColor" stroke-width="1.8" filter="url(#arcaneGlow)"/>
                <path d="M -${rBase + 8},0 L -12,0 L -6,-8 L 0,8 L 6,-4 L 12,0 L ${rBase + 8},0" fill="none" stroke="currentColor" stroke-width="2.0" stroke-linecap="round"/>
            `;
        case "genu": // Contact Circuit Closure: Interlocking contact switch jaws
            return `
                <circle cx="0" cy="0" r="${rBase}" fill="#090b10" stroke="currentColor" stroke-width="1.8" filter="url(#arcaneGlow)"/>
                <path d="M -${rBase + 8},-14 L -${rBase + 2},0 L -${rBase + 8},14" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round"/>
                <path d="M ${rBase + 8},-14 L ${rBase + 2},0 L ${rBase + 8},14" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round"/>
            `;
        case "asym": // Single-Entity Lock: Precision optical sniper reticle calipers
            return `
                <circle cx="0" cy="0" r="${rBase}" fill="#090b10" stroke="currentColor" stroke-width="1.8" filter="url(#arcaneGlow)"/>
                <circle cx="0" cy="0" r="${rBase + 8}" fill="none" stroke="currentColor" stroke-width="1.2" stroke-dasharray="16 28"/>
                <line x1="0" y1="-${rBase + 12}" x2="0" y2="-${rBase + 4}" stroke="currentColor" stroke-width="2.0"/>
                <line x1="0" y1="${rBase + 4}" x2="0" y2="${rBase + 12}" stroke="currentColor" stroke-width="2.0"/>
                <line x1="-${rBase + 12}" y1="0" x2="-${rBase + 4}" y2="0" stroke="currentColor" stroke-width="2.0"/>
                <line x1="${rBase + 4}" y1="0" x2="${rBase + 12}" y2="0" stroke="currentColor" stroke-width="2.0"/>
            `;
        case "adau": // Field Boundary Expansion: Wide flared perimeter radar array brackets
            return `
                <circle cx="0" cy="0" r="${rBase}" fill="#090b10" stroke="currentColor" stroke-width="1.8" filter="url(#arcaneGlow)"/>
                <path d="M -${rBase + 10},-20 A ${rBase + 12},${rBase + 12} 0 0,1 ${rBase + 10},-20" fill="none" stroke="currentColor" stroke-width="2.4" stroke-dasharray="4 2"/>
                <path d="M -${rBase + 10},20 A ${rBase + 12},${rBase + 12} 0 0,0 ${rBase + 10},20" fill="none" stroke="currentColor" stroke-width="2.4" stroke-dasharray="4 2"/>
            `;
        case "tigam": { // Inorganic Matter Selective: Crystalline metallic hexagonal lattice
            let pts = [];
            for (let i = 0; i < 6; i++) {
                const a = (i * 2 * Math.PI) / 6;
                pts.push(`${((rBase + 6) * Math.cos(a)).toFixed(2)},${((rBase + 6) * Math.sin(a)).toFixed(2)}`);
            }
            return `
                <polygon points="${pts.join(' ')}" fill="#090b10" stroke="currentColor" stroke-width="2.4" filter="url(#arcaneGlow)"/>
                <circle cx="0" cy="0" r="${rBase}" fill="none" stroke="currentColor" stroke-width="1.0" stroke-dasharray="4 3"/>
            `;
        }
        case "giba": // Biological Life Attunement: Floral/petaloid bio-sensory lobes
            return `
                <circle cx="0" cy="0" r="${rBase}" fill="#090b10" stroke="currentColor" stroke-width="1.8" filter="url(#arcaneGlow)"/>
                <path d="M 0,-${rBase} C 12,-${rBase + 14} -12,-${rBase + 14} 0,-${rBase}" fill="none" stroke="currentColor" stroke-width="2.0"/>
                <path d="M 0,${rBase} C 12,${rBase + 14} -12,${rBase + 14} 0,${rBase}" fill="none" stroke="currentColor" stroke-width="2.0"/>
                <path d="M -${rBase},0 C -${rBase + 14},12 -${rBase + 14},-12 -${rBase},0" fill="none" stroke="currentColor" stroke-width="2.0"/>
                <path d="M ${rBase},0 C ${rBase + 14},12 ${rBase + 14},-12 ${rBase},0" fill="none" stroke="currentColor" stroke-width="2.0"/>
            `;
        case "ami": { // Anti-Magic Siphon: Inward siphon teeth maw
            let teeth = "";
            for (let i = 0; i < 8; i++) {
                const a = (i * 2 * Math.PI) / 8;
                teeth += `<polygon points="${((rBase + 10) * Math.cos(a)).toFixed(2)},${((rBase + 10) * Math.sin(a)).toFixed(2)} ${((rBase - 4) * Math.cos(a + 0.1)).toFixed(2)},${((rBase - 4) * Math.sin(a + 0.1)).toFixed(2)} ${((rBase - 4) * Math.cos(a - 0.1)).toFixed(2)},${((rBase - 4) * Math.sin(a - 0.1)).toFixed(2)}" fill="currentColor"/>`;
            }
            return `
                <circle cx="0" cy="0" r="${rBase}" fill="#090b10" stroke="currentColor" stroke-width="1.8" filter="url(#arcaneGlow)"/>
                ${teeth}
            `;
        }

        // =========================================================
        // CATEGORY 7: CONTROL MODIFIERS
        // =========================================================
        case "aduy": // Remote Focal Origin: Extended astral projection horns
            return `
                <circle cx="0" cy="0" r="${rBase}" fill="#090b10" stroke="currentColor" stroke-width="1.8" filter="url(#arcaneGlow)"/>
                <polygon points="0,-${rBase + 20} -6,-${rBase} 6,-${rBase}" fill="currentColor"/>
                <polygon points="0,${rBase + 20} -6,${rBase} 6,${rBase}" fill="currentColor"/>
            `;
        case "spat": // Active Psionic Steering: Psionic telepathic crown finials
            return `
                <circle cx="0" cy="0" r="${rBase}" fill="#090b10" stroke="currentColor" stroke-width="1.8" filter="url(#arcaneGlow)"/>
                <path d="M -14,-${rBase} Q 0,-${rBase - 14} 14,-${rBase}" fill="none" stroke="currentColor" stroke-width="2.2"/>
                <polygon points="0,-${rBase - 16} -4,-${rBase - 8} 4,-${rBase - 8}" fill="currentColor"/>
            `;
        case "suruti": // Autonomous Telemetry: Gyroscopic vernier calibration marks
            return `
                <circle cx="0" cy="0" r="${rBase}" fill="#090b10" stroke="currentColor" stroke-width="1.8" filter="url(#arcaneGlow)"/>
                <circle cx="0" cy="0" r="${rBase + 6}" fill="none" stroke="currentColor" stroke-width="1.0" stroke-dasharray="3 3"/>
                <circle cx="0" cy="0" r="${rBase + 10}" fill="none" stroke="currentColor" stroke-width="0.6" stroke-dasharray="8 8"/>
            `;
        case "itta": // Conduit Inertia Lock: Heavy locked vice calipers
            return `
                <circle cx="0" cy="0" r="${rBase}" fill="#090b10" stroke="currentColor" stroke-width="1.8" filter="url(#arcaneGlow)"/>
                <rect x="-${rBase + 8}" y="-8" width="6" height="16" fill="currentColor"/>
                <rect x="${rBase + 2}" y="-8" width="6" height="16" fill="currentColor"/>
            `;
        case "pakut": // Terrain Substrate Anchor: Triangular foundation pilings
            return `
                <circle cx="0" cy="0" r="${rBase}" fill="#090b10" stroke="currentColor" stroke-width="1.8" filter="url(#arcaneGlow)"/>
                <polygon points="0,${rBase + 16} -8,${rBase} 8,${rBase}" fill="currentColor"/>
                <polygon points="-${rBase + 14},-6 -${rBase},0 -${rBase},-12" fill="currentColor"/>
                <polygon points="${rBase + 14},-6 ${rBase},0 ${rBase},-12" fill="currentColor"/>
            `;
        case "alisi": // Orthogonal Vector Snap: 4 right-angle stepped corner fins
            return `
                <circle cx="0" cy="0" r="${rBase}" fill="#090b10" stroke="currentColor" stroke-width="1.8" filter="url(#arcaneGlow)"/>
                <path d="M -${rBase + 8},0 L -${rBase + 8},-${rBase + 8} L 0,-${rBase + 8}" fill="none" stroke="currentColor" stroke-width="2.2"/>
                <path d="M ${rBase + 8},0 L ${rBase + 8},${rBase + 8} L 0,${rBase + 8}" fill="none" stroke="currentColor" stroke-width="2.2"/>
            `;
        case "morpa": { // Adaptive Array Morph: Dynamic shifting wave perimeter
            let pts = [];
            for (let i = 0; i <= 48; i++) {
                const th = (i * 2 * Math.PI) / 48;
                const r = rBase + 6 * Math.sin(6 * th);
                pts.push(`${(r * Math.cos(th)).toFixed(2)},${(r * Math.sin(th)).toFixed(2)}`);
            }
            return `<path d="M${pts.join(' L')} Z" fill="#090b10" stroke="currentColor" stroke-width="2.0" filter="url(#arcaneGlow)"/>`;
        }

        // =========================================================
        // CATEGORY 8: INTENSITY MODIFIERS
        // =========================================================
        case "piag": { // Overcharge Strengthening: Flaring solar power spikes
            let pts = [];
            for (let i = 0; i < 16; i++) {
                const a = (i * 2 * Math.PI) / 16;
                const r = i % 2 === 0 ? rBase + 15 : rBase - 2;
                pts.push(`${(r * Math.cos(a)).toFixed(2)},${(r * Math.sin(a)).toFixed(2)}`);
            }
            return `<polygon points="${pts.join(' ')}" fill="#090b10" stroke="currentColor" stroke-width="2.5" filter="url(#arcaneGlow)"/>`;
        }
        case "sukap": // Throttled Non-Lethal: Buffered dampening rim
            return `
                <circle cx="0" cy="0" r="${rBase}" fill="#090b10" stroke="currentColor" stroke-width="1.6" stroke-dasharray="6 3" opacity="0.85"/>
                <circle cx="0" cy="0" r="${rBase + 4}" fill="none" stroke="currentColor" stroke-width="1.0" opacity="0.6"/>
            `;
        case "kupos": // Hyper-Dense Compression: Compact heavy iron ring with rivets
            return `
                <circle cx="0" cy="0" r="${rBase}" fill="#090b10" stroke="currentColor" stroke-width="3.6" filter="url(#arcaneGlow)"/>
                <circle cx="0" cy="0" r="${rBase - 6}" fill="none" stroke="currentColor" stroke-width="1.2" stroke-dasharray="3 3"/>
            `;
        case "lawal": // Volumetric Expansion: Vast expanding parabolic bloom petals
            return `
                <circle cx="0" cy="0" r="${rBase}" fill="#090b10" stroke="currentColor" stroke-width="1.8" filter="url(#arcaneGlow)"/>
                <circle cx="0" cy="0" r="${rBase + 12}" fill="none" stroke="currentColor" stroke-width="1.4" opacity="0.7"/>
                <circle cx="0" cy="0" r="${rBase + 18}" fill="none" stroke="currentColor" stroke-width="0.8" opacity="0.4" stroke-dasharray="4 4"/>
            `;
        case "sapas": // Supersonic Acceleration: Swept-back hypersonic delta wings
            return `
                <circle cx="0" cy="0" r="${rBase}" fill="#090b10" stroke="currentColor" stroke-width="1.8" filter="url(#arcaneGlow)"/>
                <polygon points="0,-${rBase + 18} -${rBase},-8 0,-${rBase - 2} ${rBase},-8" fill="currentColor" opacity="0.9"/>
                <polygon points="0,${rBase + 18} -${rBase},8 0,${rBase + 2} ${rBase},8" fill="currentColor" opacity="0.9"/>
            `;
        case "tunbog": // Crushing Heavy Momentum: Massive square ballast weights
            return `
                <circle cx="0" cy="0" r="${rBase}" fill="#090b10" stroke="currentColor" stroke-width="1.8" filter="url(#arcaneGlow)"/>
                <rect x="-${rBase + 6}" y="-${rBase + 6}" width="12" height="12" fill="currentColor"/>
                <rect x="${rBase - 6}" y="-${rBase + 6}" width="12" height="12" fill="currentColor"/>
                <rect x="-${rBase + 6}" y="${rBase - 6}" width="12" height="12" fill="currentColor"/>
                <rect x="${rBase - 6}" y="${rBase - 6}" width="12" height="12" fill="currentColor"/>
            `;
        case "kunta": { // Adamantine Solidification: Diamond bulwark shield
            let pts = [];
            for (let i = 0; i < 4; i++) {
                const a = (i * Math.PI) / 2;
                pts.push(`${((rBase + 14) * Math.cos(a)).toFixed(2)},${((rBase + 14) * Math.sin(a)).toFixed(2)}`);
            }
            return `
                <polygon points="${pts.join(' ')}" fill="#090b10" stroke="currentColor" stroke-width="2.8" filter="url(#arcaneGlow)"/>
                <circle cx="0" cy="0" r="${rBase}" fill="none" stroke="currentColor" stroke-width="1.2" stroke-dasharray="3 3"/>
            `;
        }
        case "asanu": // Molecular Edge Sharpening: Razor bevel edge
            return `
                <circle cx="0" cy="0" r="${rBase}" fill="#090b10" stroke="currentColor" stroke-width="2.6" filter="url(#arcaneGlow)"/>
                <circle cx="0" cy="0" r="${rBase + 4}" fill="none" stroke="currentColor" stroke-width="0.8" stroke-dasharray="1 2"/>
            `;

        default:
            return `<circle cx="0" cy="0" r="${rBase}" fill="#090b10" stroke="currentColor" stroke-width="1.8" filter="url(#arcaneGlow)"/>`;
    }
}

// -------------------------------------------------------------
// 3. FULL MULTI-TIER SUB-NODE MAGIC CIRCLE GENERATOR
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

    // LATEST ADDED MODIFIER RULE: Find the latest slotted modifier on this node to drive the physical hull morph
    let latestModId = null;
    if (mods.length > 0) {
        latestModId = mods[mods.length - 1];
    }

    const morphedHullSVG = getModifierHullMorphSVG(latestModId, R_BOUND, theme, spinChantClass, spinModClass);

    // --- A. INNER DELIVERY ARCHETYPE RING ---
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
            <g transform="translate(${dx}, ${dy}) rotate(${angleDeg + 90}) scale(0.35)" color="${theme.primary}">
                ${delRune}
            </g>
        `;

        innerConduitsSVG += `
            <line x1="${(R_CORE * Math.cos(angleRad)).toFixed(2)}" y1="${(R_CORE * Math.sin(angleRad)).toFixed(2)}"
                  x2="${((R_DEL - 7) * Math.cos(angleRad)).toFixed(2)}" y2="${((R_DEL - 7) * Math.sin(angleRad)).toFixed(2)}"
                  stroke="${theme.primary}" stroke-width="1.2" stroke-dasharray="2 2" opacity="0.75"/>
        `;
    }

    // --- B. OUTER MODIFIER NODES & DURATION RING ---
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
                <g transform="translate(${mx}, ${my}) scale(0.34)" color="${theme.primary}">
                    <circle cx="0" cy="0" r="14" fill="#090b10" stroke="${theme.primary}" stroke-width="1.5" filter="url(#arcaneGlow)"/>
                    <circle cx="0" cy="0" r="17" fill="none" stroke="${theme.primary}" stroke-width="0.7" stroke-dasharray="2 2" opacity="0.6"/>
                    ${glyph}
                </g>
            `;

            outerConduitsSVG += `
                <line x1="${((R_DEL + 8) * Math.cos(angleRad)).toFixed(2)}" y1="${((R_DEL + 8) * Math.sin(angleRad)).toFixed(2)}"
                      x2="${((R_MOD - 9) * Math.cos(angleRad)).toFixed(2)}" y2="${((R_MOD - 9) * Math.sin(angleRad)).toFixed(2)}"
                      stroke="${theme.primary}" stroke-width="1.2" opacity="0.8"/>
            `;
        });

        if (modCount >= 2) {
            constellationPolySVG = `
                <polygon points="${polyPts.join(" ")}" fill="${theme.glow || 'rgba(212, 175, 55, 0.15)'}" fill-opacity="0.2" stroke="${theme.primary}" stroke-width="0.8" opacity="0.6"/>
            `;
        }
    } else {
        for (let i = 0; i < 8; i++) {
            const angleRad = (i * 45 * Math.PI) / 180;
            const mx = (R_MOD * Math.cos(angleRad)).toFixed(2);
            const my = (R_MOD * Math.sin(angleRad)).toFixed(2);
            modifierNodesSVG += `
                <circle cx="${mx}" cy="${my}" r="1.8" fill="${theme.primary}" opacity="0.4"/>
            `;
        }
    }

    const durRingSVG = typeof getDurationRingGeometry === "function" 
        ? getDurationRingGeometry(activeDurationMod ? activeDurationMod.id : null, 0, 0, R_MOD)
        : `<circle cx="0" cy="0" r="${R_MOD}" fill="none" stroke="currentColor" stroke-width="1.2" opacity="0.85"/>`;

    // --- C. SUB-CIRCLE RUNIC BORDER CHANT ---
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

            <!-- Physical Morphed Hull (Driven by Latest Modifier: ${latestModId || 'None'}) -->
            <g color="${theme.primary}">
                ${morphedHullSVG}
            </g>
            <circle cx="0" cy="0" r="${R_BOUND - 3}" fill="${theme.bg || '#151822'}" fill-opacity="0.45" stroke="${theme.primary}" stroke-width="0.75" opacity="0.6"/>

            <g color="${theme.primary}" opacity="0.35">
                <line x1="-${R_BOUND}" y1="0" x2="${R_BOUND}" y2="0" stroke="currentColor" stroke-width="0.5" stroke-dasharray="3 3"/>
                <line x1="0" y1="-${R_BOUND}" x2="0" y2="${R_BOUND}" stroke="currentColor" stroke-width="0.5" stroke-dasharray="3 3"/>
                ${subLatticeTicks}
            </g>

            <!-- Tier 4: Runic Border Chant -->
            <g class="${spinChantClass}" color="${theme.primary}">
                <circle cx="0" cy="0" r="${R_BOUND - 1}" fill="none" stroke="currentColor" stroke-width="1.4" opacity="0.85"/>
                <circle cx="0" cy="0" r="${R_CHANT - 4}" fill="none" stroke="currentColor" stroke-width="0.8" opacity="0.5" stroke-dasharray="4 3"/>
                <path id="subTrack_${nodeKey}_${subIdSuffix}" d="M 0,-${R_CHANT} a ${R_CHANT},${R_CHANT} 0 1,1 -0.01,0 Z" fill="none" />
                <text font-family="'Segoe UI Historic', 'Noto Sans Runic', monospace" font-size="5.4" font-weight="700" letter-spacing="1.2" fill="${theme.primary}" opacity="0.9" filter="url(#arcaneGlow)">
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
                <g opacity="0.85">${durRingSVG}</g>
                ${constellationPolySVG}
                ${modifierNodesSVG}
            </g>

            <!-- Tier 2: Delivery Ring (Hyper-Fast) -->
            <g class="${spinDelClass}" color="${theme.primary}">
                <circle cx="0" cy="0" r="${R_DEL + 8}" fill="none" stroke="currentColor" stroke-width="0.9" stroke-dasharray="3 2" opacity="0.6"/>
                <circle cx="0" cy="0" r="${R_DEL}" fill="none" stroke="currentColor" stroke-width="1.3" opacity="0.85" filter="url(#arcaneGlow)"/>
                <circle cx="0" cy="0" r="${R_DEL - 8}" fill="none" stroke="currentColor" stroke-width="0.75" opacity="0.5"/>
                ${deliveryRunesSVG}
            </g>

            <!-- Tier 1: Core Elemental Chamber -->
            <g class="${pulseCoreClass}" color="${theme.primary}">
                <circle cx="0" cy="0" r="${R_CORE + 4}" fill="none" stroke="${theme.primary}" stroke-width="0.8" stroke-dasharray="2 2" opacity="0.65"/>
                <circle cx="0" cy="0" r="${R_CORE}" fill="#090b10" stroke="${theme.primary}" stroke-width="1.6" filter="url(#arcaneGlow)"/>
                <g transform="scale(0.36)" color="${theme.primary}">
                    ${typeof getElementalRunePath === "function" ? getElementalRunePath(elId) : `<circle cx="0" cy="0" r="8" fill="${theme.primary}"/>`}
                </g>
            </g>
        </g>
    `;
}

// -------------------------------------------------------------
// 4. CENTER TRI-ELEMENTAL SYNTHESIS FUSION CORE
// -------------------------------------------------------------
function generateTriElementCoreSVG(cx, cy, nA, nB, nG, themeA, themeB, themeG) {
    const R_TRI_ORBIT = 18;

    const r1x = cx;
    const r1y = cy - R_TRI_ORBIT;
    const r2x = Number((cx + R_TRI_ORBIT * Math.cos((30 * Math.PI) / 180)).toFixed(2));
    const r2y = Number((cy + R_TRI_ORBIT * Math.sin((30 * Math.PI) / 180)).toFixed(2));
    const r3x = Number((cx + R_TRI_ORBIT * Math.cos((150 * Math.PI) / 180)).toFixed(2));
    const r3y = Number((cy + R_TRI_ORBIT * Math.sin((150 * Math.PI) / 180)).toFixed(2));

    const runeA = typeof getElementalRunePath === "function" ? getElementalRunePath(nA.element) : "";
    const runeB = typeof getElementalRunePath === "function" ? getElementalRunePath(nB.element) : "";
    const runeG = typeof getElementalRunePath === "function" ? getElementalRunePath(nG.element) : "";

    return `
        <!-- MASTER TRI-ELEMENTAL CORE (CENTER) -->
        <g class="array-nexus-group stage-elem inscribe-nexus-hub">
            <circle cx="${cx}" cy="${cy}" r="48" fill="#090b10" stroke="#ffffff" stroke-width="1.8" filter="url(#arcaneGlow)"/>
            <circle cx="${cx}" cy="${cy}" r="42" fill="none" stroke="${themeA.primary}" stroke-width="1.0" stroke-dasharray="3 3" opacity="0.8"/>

            <!-- Hyper-Speed Spinning Triquetra Engine -->
            <g id="astrolabeNexusCoreSpin" class="nexus-triquetra-spin">
                <polygon points="${cx},${cy-28} ${cx+24},${cy+14} ${cx-24},${cy+14}" fill="none" stroke="${themeB.primary}" stroke-width="1.6" opacity="0.85"/>
                <polygon points="${cx},${cy+28} ${cx+24},${cy-14} ${cx-24},${cy-14}" fill="none" stroke="${themeG.primary}" stroke-width="1.2" opacity="0.65"/>
            </g>

            <!-- Node α Element (Top) -->
            <g transform="translate(${r1x}, ${r1y}) scale(0.28)" color="${themeA.primary}">
                <circle cx="0" cy="0" r="14" fill="#0b0d13" stroke="${themeA.primary}" stroke-width="1.2"/>
                ${runeA}
            </g>
            <!-- Node β Element (Bottom-Right) -->
            <g transform="translate(${r2x}, ${r2y}) scale(0.28)" color="${themeB.primary}">
                <circle cx="0" cy="0" r="14" fill="#0b0d13" stroke="${themeB.primary}" stroke-width="1.2"/>
                ${runeB}
            </g>
            <!-- Node γ Element (Bottom-Left) -->
            <g transform="translate(${r3x}, ${r3y}) scale(0.28)" color="${themeG.primary}">
                <circle cx="0" cy="0" r="14" fill="#0b0d13" stroke="${themeG.primary}" stroke-width="1.2"/>
                ${runeG}
            </g>

            <circle cx="${cx}" cy="${cy}" r="4.5" fill="#ffffff" filter="url(#arcaneGlow)"/>
        </g>
    `;
}

// -------------------------------------------------------------
// 5. MASTER PROCEDURAL ARRAY SVG BUILDER
// -------------------------------------------------------------
function generateArrayCircleSVG(isInscribing = false) {
    const CX = 300;
    const CY = 300;
    const R_INNER_ORBIT   = 158;
    const R_RULUWAR_ORBIT = 218;
    const R_OUTER_ORBIT   = 278;
    const CHANT_CIRCUMFERENCE = (2 * Math.PI * R_OUTER_ORBIT).toFixed(1);

    const nA = arrayState.nodes.alpha;
    const nB = arrayState.nodes.beta;
    const nG = arrayState.nodes.gamma;

    const themeA = (typeof ELEMENT_COLORS !== "undefined" && ELEMENT_COLORS[nA.element]) ? ELEMENT_COLORS[nA.element] : { primary: "#f97316", secondary: "#ea580c", bg: "#431407" };
    const themeB = (typeof ELEMENT_COLORS !== "undefined" && ELEMENT_COLORS[nB.element]) ? ELEMENT_COLORS[nB.element] : { primary: "#facc15", secondary: "#ca8a04", bg: "#422006" };
    const themeG = (typeof ELEMENT_COLORS !== "undefined" && ELEMENT_COLORS[nG.element]) ? ELEMENT_COLORS[nG.element] : { primary: "#f59e0b", secondary: "#b45309", bg: "#451a03" };

    // Inner Triad Vertices ($R = 158$)
    const ax = Number((CX + R_INNER_ORBIT * Math.cos((-90 * Math.PI) / 180)).toFixed(2)); // 300
    const ay = Number((CY + R_INNER_ORBIT * Math.sin((-90 * Math.PI) / 180)).toFixed(2)); // 142
    const bx = Number((CX + R_INNER_ORBIT * Math.cos((30 * Math.PI) / 180)).toFixed(2));  // 436.83
    const by = Number((CY + R_INNER_ORBIT * Math.sin((30 * Math.PI) / 180)).toFixed(2));  // 379
    const gx = Number((CX + R_INNER_ORBIT * Math.cos((150 * Math.PI) / 180)).toFixed(2)); // 163.17
    const gy = Number((CY + R_INNER_ORBIT * Math.sin((150 * Math.PI) / 180)).toFixed(2)); // 379

    // Outer Triad Vertices ($R = 278$)
    const oax = Number((CX + R_OUTER_ORBIT * Math.cos((-90 * Math.PI) / 180)).toFixed(2)); // 300
    const oay = Number((CY + R_OUTER_ORBIT * Math.sin((-90 * Math.PI) / 180)).toFixed(2)); // 22
    const obx = Number((CX + R_OUTER_ORBIT * Math.cos((30 * Math.PI) / 180)).toFixed(2));  // 540.75
    const oby = Number((CY + R_OUTER_ORBIT * Math.sin((30 * Math.PI) / 180)).toFixed(2));  // 439
    const ogx = Number((CX + R_OUTER_ORBIT * Math.cos((150 * Math.PI) / 180)).toFixed(2)); // 59.25
    const ogy = Number((CY + R_OUTER_ORBIT * Math.sin((150 * Math.PI) / 180)).toFixed(2)); // 439

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
            <g transform="translate(${rx}, ${ry}) rotate(${angleDeg + 90}) scale(0.82)" color="${activeTheme.primary}">
                ${getVerticalRuluwarGlyph()}
            </g>
        `;
    }

    const triReaction = typeof getTriElementalReaction === "function" ? getTriElementalReaction(nA.element, nB.element, nG.element) : { name: "Array", stem: "Tri" };
    const depClass = typeof getDeploymentClass === "function" ? getDeploymentClass(nA.delivery, nB.delivery, nG.delivery) : { id: "U-U-U", name: "Array" };

    const rawArrayChant = `Array-${triReaction.stem}-${depClass.id}!`;
    const fullRunicChant = typeof generateFullBorderRunicChant === "function" ? generateFullBorderRunicChant(rawArrayChant, R_OUTER_ORBIT) : rawArrayChant;

    const dialTicks = typeof generateAstrolabeDialTicks === "function" 
        ? generateAstrolabeDialTicks(CX, CY, R_OUTER_ORBIT + 6, 72, 5) 
        : "";

    // HYPER-SPEED & DIFFERENTIAL MULTI-SPEED KEYFRAME STYLES
    let animStyles = `
        @keyframes rotateChantBorderCW {
            from { transform: rotate(0deg); }
            to   { transform: rotate(360deg); }
        }
        @keyframes pulseMasterHub {
            0%, 100% { transform: scale(1.0); opacity: 0.94; }
            50%      { transform: scale(1.06); opacity: 1.0; }
        }
        @keyframes rotateNexusTriquetraFastCCW {
            from { transform: rotate(0deg); }
            to   { transform: rotate(-360deg); }
        }

        /* Supersonic Mana Particle Streamers */
        @keyframes flowNeedleHyper {
            0%   { stroke-dashoffset: 160; }
            100% { stroke-dashoffset: 0; }
        }
        @keyframes flowBraidedHyper {
            0%   { stroke-dashoffset: 140; }
            100% { stroke-dashoffset: 0; }
        }
        @keyframes flowFeedbackFast {
            0%   { stroke-dashoffset: 180; }
            100% { stroke-dashoffset: 0; }
        }
        @keyframes pulseApexRapid {
            0%, 100% { opacity: 0.55; stroke-dashoffset: 100; }
            50%      { opacity: 1.0; }
            100%     { stroke-dashoffset: 0; }
        }

        .stream-genesis-to-mod {
            stroke-dasharray: 10 14;
            animation: flowNeedleHyper 0.65s linear infinite;
        }
        .stream-needle-particles {
            stroke-dasharray: 3 24;
            animation: flowNeedleHyper 0.35s linear infinite;
        }
        .stream-mod-to-apex {
            stroke-dasharray: 16 10;
            animation: flowBraidedHyper 0.85s linear infinite;
        }
        .stream-braid-strand-a {
            stroke-dasharray: 8 16;
            animation: flowBraidedHyper 0.55s linear infinite;
            opacity: 0.9;
        }
        .stream-braid-strand-b {
            stroke-dasharray: 12 12;
            animation: flowBraidedHyper 0.75s linear infinite;
            opacity: 0.9;
        }
        .stream-recirculation-loop {
            stroke-dasharray: 6 12;
            animation: flowFeedbackFast 1.2s linear infinite;
            opacity: 0.85;
        }
        .stream-ghost-particles {
            animation: flowFeedbackFast 0.8s linear infinite;
        }
        .stream-apex-discharge {
            stroke-dasharray: 6 8;
            animation: pulseApexRapid 0.7s linear infinite;
        }

        .array-border-chant-group {
            transform-origin: ${CX}px ${CY}px;
            animation: rotateChantBorderCW 75s linear infinite;
        }
        .array-nexus-group {
            transform-origin: ${CX}px ${CY}px;
            animation: pulseMasterHub 2.2s ease-in-out infinite;
        }
        .nexus-triquetra-spin {
            transform-origin: ${CX}px ${CY}px;
            animation: rotateNexusTriquetraFastCCW 2.8s linear infinite;
        }

        /* =========================================================
           HYPER-SPEED & MULTI-SPEED SUB-CIRCLE TIER LAYERS
           ========================================================= */
        @keyframes spinFastCW_2_2  { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes spinFastCW_2_9  { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes spinFastCW_3_8  { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes spinFastCW_5_5  { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes spinFastCW_7_2  { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes spinFastCW_16   { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes spinFastCW_22   { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes spinFastCW_26   { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

        @keyframes spinFastCCW_3_2 { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }
        @keyframes spinFastCCW_3_5 { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }
        @keyframes spinFastCCW_4_4 { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }
        @keyframes spinFastCCW_4_8 { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }
        @keyframes spinFastCCW_6_5 { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }
        @keyframes spinFastCCW_8_5 { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }
        @keyframes spinFastCCW_18  { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }
        @keyframes spinFastCCW_24  { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }

        @keyframes pulseCore_1_8 { 0%, 100% { transform: scale(0.93); opacity: 0.8; } 50% { transform: scale(1.08); opacity: 1.0; } }
        @keyframes pulseCore_2_4 { 0%, 100% { transform: scale(0.95); opacity: 0.85; } 50% { transform: scale(1.05); opacity: 1.0; } }

        /* Node Alpha (Genesis Inner) */
        .sub-spin-inner-alpha-chant { transform-origin: 0px 0px; animation: spinFastCW_22 22s linear infinite; }
        .sub-spin-inner-alpha-mod   { transform-origin: 0px 0px; animation: spinFastCCW_7_2 7.2s linear infinite; }
        .sub-spin-inner-alpha-del   { transform-origin: 0px 0px; animation: spinFastCW_3_8 3.8s linear infinite; }
        .sub-pulse-inner-alpha-core { transform-origin: 0px 0px; animation: pulseCore_2_4 2.4s ease-in-out infinite; }

        /* Node Beta (Modulation Inner - KINETIC HYPER-SPEED) */
        .sub-spin-inner-beta-chant  { transform-origin: 0px 0px; animation: spinFastCW_16 16s linear infinite; }
        .sub-spin-inner-beta-mod    { transform-origin: 0px 0px; animation: spinFastCCW_4_8 4.8s linear infinite; }
        .sub-spin-inner-beta-del    { transform-origin: 0px 0px; animation: spinFastCW_2_2 2.2s linear infinite; }
        .sub-pulse-inner-beta-core  { transform-origin: 0px 0px; animation: pulseCore_1_8 1.8s ease-in-out infinite; }

        /* Node Gamma (Apex Inner - OVERCHARGE SAWBLADE SPEED) */
        .sub-spin-inner-gamma-chant { transform-origin: 0px 0px; animation: spinFastCW_26 26s linear infinite; }
        .sub-spin-inner-gamma-mod   { transform-origin: 0px 0px; animation: spinFastCCW_3_5 3.5s linear infinite; }
        .sub-spin-inner-gamma-del   { transform-origin: 0px 0px; animation: spinFastCW_2_9 2.9s linear infinite; }
        .sub-pulse-inner-gamma-core { transform-origin: 0px 0px; animation: pulseCore_1_8 1.8s ease-in-out infinite; }

        /* Node Alpha (Genesis Outer Duplicate) */
        .sub-spin-outer-alpha-chant { transform-origin: 0px 0px; animation: spinFastCCW_24 24s linear infinite; }
        .sub-spin-outer-alpha-mod   { transform-origin: 0px 0px; animation: spinFastCW_5_5 5.5s linear infinite; }
        .sub-spin-outer-alpha-del   { transform-origin: 0px 0px; animation: spinFastCCW_4_4 4.4s linear infinite; }
        .sub-pulse-outer-alpha-core { transform-origin: 0px 0px; animation: pulseCore_2_4 2.4s ease-in-out infinite; }

        /* Node Beta (Modulation Outer Duplicate - FAST TURBINE) */
        .sub-spin-outer-beta-chant  { transform-origin: 0px 0px; animation: spinFastCCW_18 18s linear infinite; }
        .sub-spin-outer-beta-mod    { transform-origin: 0px 0px; animation: spinFastCW_3_8 3.8s linear infinite; }
        .sub-spin-outer-beta-del    { transform-origin: 0px 0px; animation: spinFastCCW_3_2 3.2s linear infinite; }
        .sub-pulse-outer-beta-core  { transform-origin: 0px 0px; animation: pulseCore_1_8 1.8s ease-in-out infinite; }

        /* Node Gamma (Apex Outer Duplicate) */
        .sub-spin-outer-gamma-chant { transform-origin: 0px 0px; animation: spinFastCCW_24 24s linear infinite; }
        .sub-spin-outer-gamma-mod   { transform-origin: 0px 0px; animation: spinFastCW_5_5 5.5s linear infinite; }
        .sub-spin-outer-gamma-del   { transform-origin: 0px 0px; animation: spinFastCCW_3_5 3.5s linear infinite; }
        .sub-pulse-outer-gamma-core { transform-origin: 0px 0px; animation: pulseCore_1_8 1.8s ease-in-out infinite; }

        .node-selection-pulse {
            transform-origin: 0px 0px;
            animation: pulseCore_1_8 1.8s ease-in-out infinite;
        }
    `;

    if (isInscribing) {
        animStyles = `
            #arcaneSpellCircleSVG.is-inscribing .stage-elem {
                opacity: 0;
            }
            @keyframes traceArrayConduitFast {
                0%   { stroke-dashoffset: 800; opacity: 0; }
                15%  { opacity: 1; }
                100% { stroke-dashoffset: 0; opacity: 1; }
            }
            @keyframes igniteNodeFade {
                0%   { opacity: 0; transform: scale(0.85); }
                60%  { opacity: 1; filter: drop-shadow(0 0 14px currentColor); }
                100% { opacity: 1; transform: scale(1.0); filter: none; }
            }
            @keyframes fadeInArrayBg {
                0%   { opacity: 0; }
                100% { opacity: 1; }
            }
            #arcaneSpellCircleSVG.is-inscribing .inscribe-array-bg {
                animation: fadeInArrayBg 1.4s ease-out 0.1s forwards;
            }
            #arcaneSpellCircleSVG.is-inscribing .inscribe-nexus-hub {
                animation: igniteNodeFade 0.9s ease-out 0.2s forwards;
            }
            #arcaneSpellCircleSVG.is-inscribing .inscribe-conduit-loop {
                stroke-dasharray: 800;
                stroke-dashoffset: 800;
                animation: traceArrayConduitFast 1.1s cubic-bezier(0.4, 0, 0.2, 1) 0.8s forwards;
            }
            #arcaneSpellCircleSVG.is-inscribing .inscribe-node-alpha {
                animation: igniteNodeFade 0.9s ease-out 1.4s forwards;
            }
            #arcaneSpellCircleSVG.is-inscribing .inscribe-node-beta {
                animation: igniteNodeFade 0.9s ease-out 2.1s forwards;
            }
            #arcaneSpellCircleSVG.is-inscribing .inscribe-node-gamma {
                animation: igniteNodeFade 0.9s ease-out 2.8s forwards;
            }
            #arcaneSpellCircleSVG.is-inscribing .inscribe-array-border {
                stroke-dasharray: 2000;
                stroke-dashoffset: 2000;
                animation: traceArrayConduitFast 1.0s cubic-bezier(0.4, 0, 0.2, 1) 3.4s forwards;
            }
            #arcaneSpellCircleSVG.is-inscribing .inscribe-array-chant {
                animation: fadeInArrayBg 1.0s ease-out 3.7s forwards;
            }
        `;
    }

    return `
    <svg id="arcaneSpellCircleSVG" xmlns="http://www.w3.org/2000/svg" viewBox="-50 -50 700 700" class="spell-circle-svg ${isInscribing ? 'is-inscribing' : ''}" style="width: 100%; height: 100%; max-width: 540px; aspect-ratio: 1/1; cursor: pointer;">
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

            <path id="outerBorderArrayTrack" d="M ${CX}, ${CY - R_OUTER_ORBIT} a ${R_OUTER_ORBIT},${R_OUTER_ORBIT} 0 1,1 -0.01,0 Z" fill="none" />
            
            <style>
                ${animStyles}
            </style>
        </defs>

        <!-- BACKGROUND TRI-SPECTRAL GLOW -->
        <circle cx="${CX}" cy="${CY}" r="290" fill="url(#arrayTriGradient)" class="stage-elem inscribe-array-bg"/>

        <!-- SACRED GEOMETRY LATTICE & AXES -->
        <g color="#94a3b8" opacity="0.30" class="stage-elem inscribe-array-bg">
            <line x1="16" y1="${CY}" x2="584" y2="${CY}" stroke="currentColor" stroke-width="0.6" stroke-dasharray="8 6"/>
            <line x1="${CX}" y1="16" x2="${CX}" y2="584" stroke="currentColor" stroke-width="0.6" stroke-dasharray="8 6"/>
            ${dialTicks}
        </g>

        <!-- ASTROLABE TELEMETRY HUD HEADER -->
        <g id="astrolabeHudGroup" opacity="0.9">
            <rect x="160" y="-36" width="280" height="24" rx="6" fill="#090b10" stroke="#334155" stroke-width="1.2" filter="url(#arcaneGlow)"/>
            <text id="astrolabeStatusText" x="${CX}" y="-20" font-family="'Segoe UI', monospace" font-size="9" font-weight="900" fill="#38bdf8" text-anchor="middle" letter-spacing="1.5">
                ✦ MERKABAH HARMONIC LOCK ✦
            </text>
            <text id="astrolabeAngleText" x="${CX + 115}" y="-20" font-family="'Segoe UI', monospace" font-size="8" font-weight="700" fill="#94a3b8" text-anchor="end">
                060.0°
            </text>
        </g>

        <!-- RAIL TRACKS: INNER, MID-RULUWAR & REAL OUTER RING -->
        <g class="stage-elem inscribe-conduit-loop">
            <circle cx="${CX}" cy="${CY}" r="${R_INNER_ORBIT}" fill="none" stroke="#ffffff" stroke-width="2.6" opacity="0.85" filter="url(#arcaneGlow)"/>
            <circle cx="${CX}" cy="${CY}" r="${R_INNER_ORBIT}" fill="none" stroke="${themeA.primary}" stroke-width="1.4" class="array-flow-conduit" opacity="0.9"/>

            <circle cx="${CX}" cy="${CY}" r="${R_RULUWAR_ORBIT + 10}" fill="none" stroke="#ffffff" stroke-width="0.8" opacity="0.25" stroke-dasharray="2 4"/>
            <circle cx="${CX}" cy="${CY}" r="${R_RULUWAR_ORBIT}" fill="none" stroke="${themeG.primary}" stroke-width="1.2" opacity="0.65" class="array-flow-conduit" filter="url(#arcaneGlow)"/>
            <circle cx="${CX}" cy="${CY}" r="${R_RULUWAR_ORBIT - 10}" fill="none" stroke="#ffffff" stroke-width="0.8" opacity="0.25" stroke-dasharray="2 4"/>

            <circle cx="${CX}" cy="${CY}" r="${R_OUTER_ORBIT}" fill="none" stroke="#ffffff" stroke-width="2.2" opacity="0.65" filter="url(#arcaneGlow)"/>
            <circle cx="${CX}" cy="${CY}" r="${R_OUTER_ORBIT}" fill="none" stroke="${themeB.primary}" stroke-width="1.4" class="array-flow-conduit" opacity="0.85"/>
        </g>

        <!-- ================= 1. INNER ORBITING TRIAD + SUPERSONIC MANA STREAMERS ================= -->
        <g id="astrolabeInnerTriad" transform="rotate(0, ${CX}, ${CY})">
            <!-- Closed-Circuit Rail Framework & Mana Particle Streamers -->
            <g class="stage-elem inscribe-conduit-loop">
                <polygon points="${ax},${ay} ${bx},${by} ${gx},${gy}" fill="none" stroke="#000000" stroke-width="7.0" opacity="0.85"/>
                <polygon points="${ax},${ay} ${bx},${by} ${gx},${gy}" fill="none" stroke="#ffffff" stroke-width="2.2" opacity="0.9" filter="url(#arcaneGlow)"/>

                <!-- Stage 1: Genesis -> Modulation (Alpha -> Beta) [Supersonic Particle Stream] -->
                <line x1="${ax}" y1="${ay}" x2="${bx}" y2="${by}" stroke="url(#flowGrad12)" stroke-width="3.2" class="stream-genesis-to-mod" filter="url(#arcaneGlow)"/>
                <line x1="${ax}" y1="${ay}" x2="${bx}" y2="${by}" stroke="#ffffff" stroke-width="1.4" class="stream-needle-particles"/>

                <!-- Stage 2: Modulation -> Apex (Beta -> Gamma) [Hyper-Speed Braided Ribbon] -->
                <line x1="${bx}" y1="${by}" x2="${gx}" y2="${gy}" stroke="url(#flowGrad23)" stroke-width="4.0" class="stream-mod-to-apex" filter="url(#arcaneGlow)"/>
                <line x1="${bx}" y1="${by - 3}" x2="${gx}" y2="${gy - 3}" stroke="${themeB.primary}" stroke-width="1.5" class="stream-braid-strand-a"/>
                <line x1="${bx}" y1="${by + 3}" x2="${gx}" y2="${gy + 3}" stroke="${themeG.primary}" stroke-width="1.5" class="stream-braid-strand-b"/>

                <!-- Stage 3: Apex -> Genesis (Gamma -> Alpha) [Closed Recirculation Loop] -->
                <line x1="${gx}" y1="${gy}" x2="${ax}" y2="${ay}" stroke="url(#flowGrad31)" stroke-width="2.2" class="stream-recirculation-loop" filter="url(#arcaneGlow)"/>
                <line x1="${gx}" y1="${gy}" x2="${ax}" y2="${ay}" stroke="#ffffff" stroke-width="1.0" stroke-dasharray="2 12" class="stream-ghost-particles" opacity="0.75"/>

                <!-- Stage 4: Apex -> Center Discharge Spoke (Gamma -> Nexus) -->
                <line x1="${gx}" y1="${gy}" x2="${CX}" y2="${CY}" stroke="${themeG.primary}" stroke-width="2.0" class="stream-apex-discharge" filter="url(#arcaneGlow)"/>

                <!-- Radial Feeds -->
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

            <g class="stage-elem inscribe-node-alpha">
                ${generateSubNodeCircleSVG("alpha", nA, ax, ay, arrayState.activeNode === "alpha", themeA, "sub-spin-inner-alpha-chant", "sub-spin-inner-alpha-mod", "sub-spin-inner-alpha-del", "sub-pulse-inner-alpha-core", "inner", 1.0)}
            </g>
            <g class="stage-elem inscribe-node-beta">
                ${generateSubNodeCircleSVG("beta", nB, bx, by, arrayState.activeNode === "beta", themeB, "sub-spin-inner-beta-chant", "sub-spin-inner-beta-mod", "sub-spin-inner-beta-del", "sub-pulse-inner-beta-core", "inner", 1.0)}
            </g>
            <g class="stage-elem inscribe-node-gamma">
                ${generateSubNodeCircleSVG("gamma", nG, gx, gy, arrayState.activeNode === "gamma", themeG, "sub-spin-inner-gamma-chant", "sub-spin-inner-gamma-mod", "sub-spin-inner-gamma-del", "sub-pulse-inner-gamma-core", "inner", 1.0)}
            </g>
        </g>

        <!-- 2. MID-RING RULUWAR CROWN -->
        <g id="astrolabeRuluwarOrbit" class="stage-elem inscribe-conduit-loop" transform="rotate(0, ${CX}, ${CY})">
            ${ruluwarOuterRunesSVG}
        </g>

        <!-- 3. OUTER DUPLICATE TRIAD (ON REAL OUTER RING $R=278$) -->
        <g id="astrolabeOuterTriad" transform="rotate(0, ${CX}, ${CY})">
            <g class="stage-elem inscribe-conduit-loop" opacity="0.8">
                <polygon points="${oax},${oay} ${obx},${oby} ${ogx},${ogy}" fill="none" stroke="#ffffff" stroke-width="1.6" stroke-dasharray="4 4" filter="url(#arcaneGlow)"/>
                <line x1="${oax}" y1="${oay}" x2="${obx}" y2="${oby}" stroke="url(#flowGrad12)" stroke-width="1.8" class="stream-genesis-to-mod"/>
                <line x1="${obx}" y1="${oby}" x2="${ogx}" y2="${ogy}" stroke="url(#flowGrad23)" stroke-width="1.8" class="stream-mod-to-apex"/>
                <line x1="${ogx}" y1="${ogy}" x2="${oax}" y2="${oay}" stroke="url(#flowGrad31)" stroke-width="1.8" class="stream-recirculation-loop"/>
            </g>

            <!-- Inward Laser Beams (Exact 120px radial match) -->
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

            <g class="stage-elem inscribe-node-alpha">
                ${generateSubNodeCircleSVG("alpha", nA, oax, oay, arrayState.activeNode === "alpha", themeA, "sub-spin-outer-alpha-chant", "sub-spin-outer-alpha-mod", "sub-spin-outer-alpha-del", "sub-pulse-outer-alpha-core", "outer", 0.70)}
            </g>
            <g class="stage-elem inscribe-node-beta">
                ${generateSubNodeCircleSVG("beta", nB, obx, oby, arrayState.activeNode === "beta", themeB, "sub-spin-outer-beta-chant", "sub-spin-outer-beta-mod", "sub-spin-outer-beta-del", "sub-pulse-outer-beta-core", "outer", 0.70)}
            </g>
            <g class="stage-elem inscribe-node-gamma">
                ${generateSubNodeCircleSVG("gamma", nG, ogx, ogy, arrayState.activeNode === "gamma", themeG, "sub-spin-outer-gamma-chant", "sub-spin-outer-gamma-mod", "sub-spin-outer-gamma-del", "sub-pulse-outer-gamma-core", "outer", 0.70)}
            </g>
        </g>

        <!-- CENTER MASTER TRI-ELEMENTAL CORE -->
        ${generateTriElementCoreSVG(CX, CY, nA, nB, nG, themeA, themeB, themeG)}

        <!-- OUTER CHANT & CONTAINMENT BORDER -->
        <g class="array-border-chant-group" color="${themeA.primary}">
            <g class="stage-elem inscribe-array-border">
                <circle cx="${CX}" cy="${CY}" r="${R_OUTER_ORBIT + 4}" fill="none" stroke="${themeA.primary}" stroke-width="2.0" opacity="0.88" filter="url(#arcaneGlow)"/>
                <circle cx="${CX}" cy="${CY}" r="${R_OUTER_ORBIT - 12}" fill="none" stroke="${themeB.primary}" stroke-width="1.2" opacity="0.6" stroke-dasharray="6 4"/>
            </g>
            <g class="stage-elem inscribe-array-chant">
                <text font-family="'Segoe UI Historic', 'Noto Sans Runic', monospace" font-size="9.5" font-weight="700" letter-spacing="1.5" fill="${themeA.primary}" opacity="0.92" filter="url(#arcaneGlow)">
                    <textPath href="#outerBorderArrayTrack" startOffset="0%" textLength="${CHANT_CIRCUMFERENCE}" lengthAdjust="spacing">
                        ${fullRunicChant}
                    </textPath>
                </text>
            </g>
        </g>
    </svg>
    `;
}

// -------------------------------------------------------------
// 6. ASTROLABE REAL-TIME RAF ENGINE & ALIGNMENT PHYSICS
// -------------------------------------------------------------
function startAstrolabeEngine() {
    if (arrayAstrolabe.rafId) {
        cancelAnimationFrame(arrayAstrolabe.rafId);
    }

    let lastTime = performance.now();

    function updateAstrolabe(now) {
        const delta = (now - lastTime) / 1000;
        lastTime = now;

        if (arrayAstrolabe.targetPhase !== null) {
            let diff = arrayAstrolabe.targetPhase - arrayAstrolabe.phase;
            while (diff < -180) diff += 360;
            while (diff > 180) diff -= 360;

            if (Math.abs(diff) < 0.2) {
                arrayAstrolabe.phase = arrayAstrolabe.targetPhase;
                arrayAstrolabe.targetPhase = null;
            } else {
                arrayAstrolabe.phase = (arrayAstrolabe.phase + diff * 0.12 + 360) % 360;
            }
        } else if (arrayAstrolabe.isAutoOrbit && !arrayCircleState.isInscribing) {
            arrayAstrolabe.phase = (arrayAstrolabe.phase + 10 * arrayAstrolabe.speedMult * delta) % 360;
        }

        // TACHYON-SPEED CENTER NEXUS & DYNAMIC HARMONIC ORBITS
        const rotInner = (arrayAstrolabe.phase * 0.65) % 360;
        const rotOuter = (-arrayAstrolabe.phase * 0.45) % 360;
        const rotRul = (arrayAstrolabe.phase * 1.8) % 360;          // Fast Ruluwar crown glide
        const rotNexus = (-arrayAstrolabe.phase * 3.5) % 360;       // Hyper-speed center tachyon core

        const innerElem = document.getElementById("astrolabeInnerTriad");
        const outerElem = document.getElementById("astrolabeOuterTriad");
        const rulElem = document.getElementById("astrolabeRuluwarOrbit");
        const nexusElem = document.getElementById("astrolabeNexusCoreSpin");

        if (innerElem) innerElem.setAttribute("transform", `rotate(${rotInner.toFixed(2)}, 300, 300)`);
        if (outerElem) outerElem.setAttribute("transform", `rotate(${rotOuter.toFixed(2)}, 300, 300)`);
        if (rulElem) rulElem.setAttribute("transform", `rotate(${rotRul.toFixed(2)}, 300, 300)`);
        if (nexusElem) nexusElem.setAttribute("transform", `rotate(${rotNexus.toFixed(2)}, 300, 300)`);

        const A = ((arrayAstrolabe.phase % 120) + 120) % 120;
        const conjDist = Math.min(A, 120 - A);

        let statusText = "○ ASTROLABE TRANSIT ○";
        let statusColor = "#94a3b8";
        let laserBoost = 0.55;

        if (conjDist < 3.5) {
            statusText = "✦ CONJUNCTION (LASER BURST) ✦";
            statusColor = "#ffffff";
            laserBoost = 1.0;
        } else if (Math.abs(A - 60) < 3.5) {
            statusText = "✡ MERKABAH (STAR OF DAVID) ✡";
            statusColor = "#38bdf8";
            laserBoost = 0.92;
        } else if (Math.abs(A - 30) < 3.5) {
            statusText = "◈ DELTOID KITE RESONANCE ◈";
            statusColor = "#facc15";
            laserBoost = 0.78;
        } else if (Math.abs(A - 90) < 3.5) {
            statusText = "✴ OCTAGRAM TANGENT ✴";
            statusColor = "#f97316";
            laserBoost = 0.78;
        }

        const statusEl = document.getElementById("astrolabeStatusText");
        const angleEl = document.getElementById("astrolabeAngleText");
        const sliderEl = document.getElementById("astrolabePhaseSlider");
        const innerLasers = document.getElementById("astrolabeInnerLasers");
        const outerLasers = document.getElementById("astrolabeOuterLasers");

        if (statusEl) {
            statusEl.textContent = statusText;
            statusEl.setAttribute("fill", statusColor);
        }
        if (angleEl) {
            angleEl.textContent = `${arrayAstrolabe.phase.toFixed(1).padStart(5, '0')}°`;
        }
        if (sliderEl && !sliderEl.matches(":active")) {
            sliderEl.value = arrayAstrolabe.phase.toFixed(1);
        }
        if (innerLasers) innerLasers.style.opacity = laserBoost.toFixed(2);
        if (outerLasers) outerLasers.style.opacity = laserBoost.toFixed(2);

        arrayAstrolabe.rafId = requestAnimationFrame(updateAstrolabe);
    }

    arrayAstrolabe.rafId = requestAnimationFrame(updateAstrolabe);
}

// -------------------------------------------------------------
// 7. INTERACTIVE ASTROLABE CONTROLS UI INJECTOR
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
        max-width: 520px;
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

// -------------------------------------------------------------
// 8. RENDER & TRIGGER FUNCTIONS
// -------------------------------------------------------------
function renderArrayCircleSVG() {
    const container = document.getElementById("spellCircleContainer");
    if (!container) return;
    container.innerHTML = generateArrayCircleSVG(arrayCircleState.isInscribing);
    renderAstrolabeControlPanel();
    startAstrolabeEngine();
}

function triggerArrayInscriptionAnimation() {
    if (arrayCircleState.isInscribing) return;
    arrayCircleState.isInscribing = true;

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