/* ==========================================================================
   DYNAMIC SVG ARCANE SPELL CIRCLE GENERATOR (INSCRIPTION & GIF ENGINE)
   ========================================================================== */

let circleState = {
    isInscribing: false
};

// 1. ELEMENT COLOR & GLOW SCHEMES
const ELEMENT_COLORS = {
    sfalhoy: { primary: "#f97316", secondary: "#ea580c", glow: "rgba(249, 115, 22, 0.5)", bg: "#431407" },
    hanhum:  { primary: "#38bdf8", secondary: "#0284c7", glow: "rgba(56, 189, 248, 0.5)", bg: "#082f49" },
    falga:   { primary: "#f59e0b", secondary: "#b45309", glow: "rgba(245, 158, 11, 0.5)", bg: "#451a03" },
    jalfinn: { primary: "#34d399", secondary: "#059669", glow: "rgba(52, 211, 153, 0.5)", bg: "#064e3b" },
    iklad:   { primary: "#facc15", secondary: "#ca8a04", glow: "rgba(250, 204, 21, 0.5)", bg: "#422006" },
    erlaaw:  { primary: "#fffbeb", secondary: "#fef08a", glow: "rgba(254, 240, 138, 0.65)", bg: "#713f12" },
    worulim: { primary: "#c084fc", secondary: "#9333ea", glow: "rgba(192, 132, 252, 0.5)", bg: "#3b0764" },
    amin:    { primary: "#e879f9", secondary: "#c026d3", glow: "rgba(232, 121, 249, 0.5)", bg: "#4a044e" }
};

// 2. ELDER FUTHARK RUNIC TRANSLITERATION ENGINE
const LATIN_TO_RUNIC = {
    'A': 'ᚨ', 'B': 'ᛒ', 'C': 'ᚲ', 'D': 'ᛞ', 'E': 'ᛖ',
    'F': 'ᚠ', 'G': 'ᚷ', 'H': 'ᚺ', 'I': 'ᛁ', 'J': 'ᛃ',
    'K': 'ᚲ', 'L': 'ᛚ', 'M': 'ᛗ', 'N': 'ᚾ', 'O': 'ᛟ',
    'P': 'ᛈ', 'Q': 'ᚲ', 'R': 'ᚱ', 'S': 'ᛋ', 'T': 'ᛏ',
    'U': 'ᚢ', 'V': 'ᚹ', 'W': 'ᚹ', 'X': 'ᛉ', 'Y': 'ᛇ',
    'Z': 'ᛉ', '-': '᛫', '!': '', ' ': '᛫', '0': 'ᛟ',
    '1': 'ᛁ', '2': 'ᛚ', '3': 'ᚦ', '4': 'ᚠ', '5': 'ᚱ',
    '6': 'ᛋ', '7': 'ᛏ', '8': 'ᛒ', '9': 'ᛗ'
};

function transliterateToRunes(text) {
    if (!text) return "";
    return text.toUpperCase().split("").map(ch => LATIN_TO_RUNIC[ch] || ch).join("");
}

function generateFullBorderRunicChant(rawChant, radius) {
    const runes = transliterateToRunes(rawChant);
    const separator = " ✦ ";
    const unit = runes + separator;

    const circumference = 2 * Math.PI * radius;
    const charWidth = 7.25; 
    const totalSlots = Math.round(circumference / charWidth);

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

// 3. NUMERICAL MEASURE TABLES FOR INTENSITY & DURATION MODIFIERS
const INTENSITY_METRICS = {
    piag:   { speed: -0.8, glow: 0.70, blur: 2.5,  scale: 0.04,  opacityMax: 0.20, opacityMin: 0.10, animType: 'surge' },
    sukap:  { speed: 1.2,  glow: -0.40, blur: -1.5, scale: -0.03, opacityMax: -0.20, opacityMin: -0.15, animType: 'dim' },
    kupos:  { speed: -0.4, glow: 0.30, blur: -1.2, scale: -0.03, opacityMax: 0.10, opacityMin: 0.10, animType: 'dense' },
    lawal:  { speed: 0.8,  glow: 0.40, blur: 3.0,  scale: 0.06,  opacityMax: 0.15, opacityMin: 0.05, animType: 'bloom' },
    sapas:  { speed: -1.8, glow: 0.20, blur: 1.0,  scale: 0.02,  opacityMax: 0.10, opacityMin: 0.05, animType: 'rapid' },
    tunbog: { speed: 3.0,  glow: 0.10, blur: 0.5,  scale: 0.04,  opacityMax: 0.05, opacityMin: 0.00, animType: 'heavy' },
    kunta:  { speed: 0.5,  glow: 0.20, blur: -1.0, scale: -0.03, opacityMax: 0.05, opacityMin: 0.10, animType: 'rigid' },
    asanu:  { speed: -0.2, glow: 0.10, blur: -1.5, scale: 0.00,  opacityMax: 0.05, opacityMin: 0.00, animType: 'sharp' }
};

const DURATION_METRICS = {
    tat:    { speed: -2.2, glow: 0.80, blur: 3.0,  scale: 0.08,  opacityMax: 0.25, opacityMin: -0.20, animType: 'flash' },
    tul:    { speed: 0.5,  glow: 0.20, blur: 0.5,  scale: 0.00,  opacityMax: 0.05, opacityMin: 0.20,  animType: 'sustain' },
    bati:   { speed: 4.0,  glow: 0.00, blur: -0.5, scale: -0.03, opacityMax: 0.05, opacityMin: 0.25,  animType: 'persist' },
    tan:    { speed: 1.5,  glow: -0.20, blur: 0.0, scale: 0.02,  opacityMax: 0.10, opacityMin: -0.15, animType: 'fuse' },
    lit:    { speed: -1.2, glow: 0.30, blur: 1.0,  scale: 0.04,  opacityMax: 0.15, opacityMin: -0.10, animType: 'staccato' },
    talkib: { speed: 5.0,  glow: -0.65, blur: -2.0, scale: -0.04, opacityMax: -0.30, opacityMin: -0.35, animType: 'stasis' },
    litu:   { speed: 0.0,  glow: 0.30, blur: 1.0,  scale: 0.06,  opacityMax: 0.15, opacityMin: 0.05,  animType: 'wave' }
};

function calculateHeartbeatMetrics(activeMods) {
    let speed = 3.5;
    let glow = 1.0;
    let blur = 3.5;
    let scaleDelta = 0.05;
    let opacityMin = 0.55;
    let opacityMax = 0.95;
    let animType = 'standard';

    activeMods.forEach(mod => {
        if (INTENSITY_METRICS[mod.id]) {
            const m = INTENSITY_METRICS[mod.id];
            speed += m.speed;
            glow += m.glow;
            blur += m.blur;
            scaleDelta += m.scale;
            if (m.opacityMax) opacityMax += m.opacityMax;
            if (m.opacityMin) opacityMin += m.opacityMin;
            if (m.animType) animType = m.animType;
        }
        if (DURATION_METRICS[mod.id]) {
            const d = DURATION_METRICS[mod.id];
            speed += d.speed;
            glow += d.glow;
            blur += d.blur;
            scaleDelta += d.scale;
            if (d.opacityMax) opacityMax += d.opacityMax;
            if (d.opacityMin) opacityMin += d.opacityMin;
            if (d.animType) animType = d.animType;
        }
    });

    speed = Math.max(0.35, Math.min(10.0, speed));
    glow = Math.max(0.15, Math.min(3.2, glow));
    blur = Math.max(1.0, Math.min(9.5, blur));
    scaleDelta = Math.max(0.01, Math.min(0.16, scaleDelta));
    opacityMin = Math.max(0.08, Math.min(0.80, opacityMin));
    opacityMax = Math.max(0.35, Math.min(1.00, opacityMax));

    return { speed, glow, blur, scaleDelta, opacityMin, opacityMax, animType };
}

// 4. CENTER ELEMENTAL CORE RUNES (LIGHTNING IS ᚦ ENCLOSED IN DIAMOND)
function getElementalRunePath(elementId) {
    switch (elementId) {
        case 'iklad': // ANGULAR DIAGONAL STAVE RUNE
            return `
                <!-- Central Vertical Stave -->
                <line x1="0" y1="-32" x2="0" y2="32" stroke="currentColor" stroke-width="4.5" stroke-linecap="square"/>
                <!-- Diagonal Stave Cross -->
                <polyline points="0,-32 18,-11 -18,11 0,32" fill="none" stroke="currentColor" stroke-width="4.5" stroke-linejoin="miter" stroke-miterlimit="4"/>
            `;
        case 'sfalhoy':
            return `
                <polygon points="0,-35 28,25 -28,25" fill="none" stroke="currentColor" stroke-width="2.5"/>
                <polygon points="0,-22 18,18 -18,18" fill="none" stroke="currentColor" stroke-width="1.5"/>
                <circle cx="0" cy="2" r="6" fill="currentColor"/>
                <line x1="0" y1="-35" x2="0" y2="25" stroke="currentColor" stroke-width="1.5" stroke-dasharray="2 3"/>
            `;
        case 'hanhum':
            return `
                <circle cx="0" cy="0" r="28" fill="none" stroke="currentColor" stroke-width="2"/>
                <path d="M-22,0 Q0,-22 22,0 Q0,22 -22,0" fill="none" stroke="currentColor" stroke-width="2"/>
                <circle cx="0" cy="0" r="8" fill="currentColor"/>
                <line x1="-28" y1="0" x2="28" y2="0" stroke="currentColor" stroke-width="1.5"/>
            `;
        case 'falga':
            return `
                <rect x="-22" y="-22" width="44" height="44" fill="none" stroke="currentColor" stroke-width="2"/>
                <polygon points="0,-28 28,0 0,28 -28,0" fill="none" stroke="currentColor" stroke-width="2"/>
                <rect x="-8" y="-8" width="16" height="16" fill="currentColor"/>
            `;
        case 'jalfinn':
            return `
                <circle cx="0" cy="0" r="28" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="6 3"/>
                <path d="M0,0 Q18,-15 15,-28 M0,0 Q-18,-15 -28,5 M0,0 Q5,25 20,20" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
                <circle cx="0" cy="0" r="5" fill="currentColor"/>
            `;
        case 'erlaaw':
            return `
                <polygon points="0,-32 7,-10 30,-10 12,4 19,26 0,14 -19,26 -12,4 -30,-10 -7,-10" fill="none" stroke="currentColor" stroke-width="2"/>
                <circle cx="0" cy="0" r="7" fill="currentColor"/>
            `;
        case 'worulim':
            return `
                <circle cx="0" cy="0" r="26" fill="none" stroke="currentColor" stroke-width="2.5"/>
                <circle cx="0" cy="0" r="14" fill="currentColor"/>
                <path d="M-26,-26 Q0,-10 26,26 M26,-26 Q0,-10 -26,26" fill="none" stroke="currentColor" stroke-width="1.5"/>
            `;
        case 'amin':
        default:
            return `
                <polygon points="0,-30 26,15 -26,15" fill="none" stroke="currentColor" stroke-width="2"/>
                <polygon points="0,30 26,-15 -26,-15" fill="none" stroke="currentColor" stroke-width="2"/>
                <circle cx="0" cy="0" r="8" fill="none" stroke="currentColor" stroke-width="2"/>
                <circle cx="0" cy="0" r="3" fill="currentColor"/>
            `;
    }
}

// 5. FIRST RING: DELIVERY ARCHETYPE RUNES
function getDeliveryRunePath(deliveryId, bodyParts) {
    switch (deliveryId) {
        case 'uruwak':
            return `
                <path d="M-10,-12 L0,-22 L10,-12 M-10,-2 L0,-12 L10,-2 M-10,8 L0,-2 L10,8" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                <line x1="0" y1="-22" x2="0" y2="16" stroke="currentColor" stroke-width="2"/>
            `;
        case 'lalhwa':
            return `
                <path d="M-18,12 Q0,-18 18,12" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
                <path d="M-14,16 Q0,-8 14,16" fill="none" stroke="currentColor" stroke-width="1.5"/>
                <circle cx="0" cy="-6" r="3" fill="currentColor"/>
            `;
        case 'ruluwar':
            return `
                <path d="M-12,0 C-12,-10 0,-10 0,0 C0,10 12,10 12,0 C12,-10 0,-10 0,0 C0,10 -12,10 -12,0 Z" fill="none" stroke="currentColor" stroke-width="2"/>
                <circle cx="-6" cy="0" r="2.5" fill="currentColor"/>
                <circle cx="6" cy="0" r="2.5" fill="currentColor"/>
            `;
        case 'iwati':
            return `
                <rect x="-12" y="-12" width="24" height="24" rx="3" fill="none" stroke="currentColor" stroke-width="2"/>
                <line x1="-12" y1="-12" x2="12" y2="12" stroke="currentColor" stroke-width="1.5"/>
                <line x1="12" y1="-12" x2="-12" y2="12" stroke="currentColor" stroke-width="1.5"/>
                <circle cx="0" cy="0" r="4" fill="currentColor"/>
            `;
        case 'hlakbil':
        default:
            const parts = bodyParts || ["whole_body"];
            let embellishments = "";

            let baseVessel = `
                <rect x="-5" y="-16" width="10" height="32" rx="5" fill="none" stroke="currentColor" stroke-width="2"/>
                <circle cx="0" cy="-10" r="2.5" fill="currentColor"/>
            `;

            if (parts.includes('eyes')) {
                embellishments += `<path d="M-12,-10 Q0,-18 12,-10 Q0,-2 -12,-10 Z" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="0" cy="-10" r="2" fill="currentColor"/>`;
            }
            if (parts.includes('throat')) {
                embellishments += `<path d="M-9,-3 Q0,-6 9,-3 M-11,1 Q0,-2 11,1" fill="none" stroke="currentColor" stroke-width="1.5"/>`;
            }
            if (parts.includes('fists')) {
                embellishments += `<polygon points="-16,-2 -10,-6 -10,2" fill="currentColor"/><polygon points="16,-2 10,-6 10,2" fill="currentColor"/>`;
            }
            if (parts.includes('arms')) {
                embellishments += `<line x1="-15" y1="-4" x2="15" y2="-4" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>`;
            }
            if (parts.includes('legs')) {
                embellishments += `<path d="M-8,12 L0,22 L8,12" fill="none" stroke="currentColor" stroke-width="2"/>`;
            }
            if (parts.includes('torso')) {
                embellishments += `<polygon points="0,0 6,6 0,12 -6,6" fill="currentColor"/>`;
            }
            if (parts.includes('spine')) {
                embellishments += `<line x1="0" y1="-14" x2="0" y2="14" stroke="currentColor" stroke-width="2" stroke-dasharray="2 3"/>`;
            }
            if (parts.includes('skin')) {
                embellishments += `<circle cx="0" cy="0" r="22" fill="none" stroke="currentColor" stroke-width="1" stroke-dasharray="3 2"/>`;
            }
            if (parts.includes('weapon_grip')) {
                embellishments += `<line x1="-16" y1="16" x2="16" y2="-16" stroke="currentColor" stroke-width="2.5"/><line x1="-10" y1="4" x2="-4" y2="10" stroke="currentColor" stroke-width="3"/>`;
            }
            if (parts.includes('whole_body')) {
                embellishments += `<circle cx="0" cy="0" r="24" fill="none" stroke="currentColor" stroke-width="1.5"/><polygon points="0,-24 16,18 -16,18" fill="none" stroke="currentColor" stroke-width="1" opacity="0.5"/>`;
            }

            return baseVessel + embellishments;
    }
}

// 6. GIANT VERTICAL RULUWAR INFINITY GLYPH (52px HEIGHT)
function getVerticalRuluwarGlyph() {
    return `
        <path d="M0,-24 C13,-24 16,-8 0,0 C-16,8 -13,24 0,24 C13,24 16,8 0,0 C-16,-8 -13,-24 0,-24 Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
        <circle cx="0" cy="-12" r="3" fill="currentColor"/>
        <circle cx="0" cy="12" r="3" fill="currentColor"/>
        <circle cx="0" cy="0" r="1.8" fill="currentColor"/>
    `;
}

// 7. OUTER RING: MODIFIER GLYPHS
function getModifierGlyphPath(modId) {
    switch (modId) {
        case 'yinla':  return `<line x1="-14" y1="0" x2="14" y2="0" stroke="currentColor" stroke-width="3"/><circle cx="0" cy="0" r="3" fill="currentColor"/>`;
        case 'gilbo':  return `<circle cx="0" cy="0" r="12" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="0" cy="0" r="4" fill="currentColor"/>`;
       case 'taddum': return `<text x="0" y="5.5" font-size="16" font-family="'Noto Sans JP', 'Segoe UI', 'Microsoft YaHei', sans-serif" font-weight="900" text-anchor="middle" fill="currentColor">刀</text>`;
        case 'yangga': return `<polygon points="0,-15 8,10 0,4 -8,10" fill="currentColor"/>`;
        case 'praba':  return `<rect x="-10" y="-10" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"/>`;
        case 'ngisngi':return `<circle cx="0" cy="0" r="12" fill="none" stroke="currentColor" stroke-width="2" stroke-dasharray="4 2"/>`;
        case 'apap':   return `<polygon points="0,-12 12,12 -12,12" fill="none" stroke="currentColor" stroke-width="2"/>`;
        case 'abbay':  return `<polygon points="0,-12 8,-8 12,0 8,8 0,12 -8,8 -12,0 -8,-8" fill="none" stroke="currentColor" stroke-width="2"/>`;

        case 'rundo':  return `<path d="M-10,-4 L0,-12 L10,-4 M0,-12 L0,12" fill="none" stroke="currentColor" stroke-width="2"/>`;
        case 'yudgo':  return `<path d="M-10,4 L0,12 L10,4 M0,12 L0,-12" fill="none" stroke="currentColor" stroke-width="2"/>`;
        case 'kitas':  return `<circle cx="-6" cy="0" r="4" fill="currentColor"/><circle cx="6" cy="0" r="4" fill="currentColor"/><path d="M-2,0 L2,0" stroke="currentColor" stroke-width="2"/>`;
        case 'ewansi': return `<path d="M-12,-8 Q0,12 12,-8" fill="none" stroke="currentColor" stroke-width="2.5"/>`;
        case 'surut':  return `<path d="M-12,10 Q-12,-10 0,-10 Q12,-10 12,0 Q12,10 0,10" fill="none" stroke="currentColor" stroke-width="2"/>`;
        case 'blisu':  return `<path d="M-10,-6 Q0,-14 10,-6 Q12,10 0,6" fill="none" stroke="currentColor" stroke-width="2"/><polygon points="0,3 -4,8 2,8" fill="currentColor"/>`;
        case 'liwak':  return `<ellipse cx="0" cy="0" rx="14" ry="6" fill="none" stroke="currentColor" stroke-width="1.5" transform="rotate(-30)"/><circle cx="0" cy="0" r="3" fill="currentColor"/>`;
        case 'kijlo':  return `<path d="M-12,10 Q0,-14 12,10" fill="none" stroke="currentColor" stroke-width="2.5"/>`;

        case 'bamtuk': return `<path d="M0,-14 L0,14 M-14,0 L14,0 M-10,-10 L10,10 M-10,10 L10,-10" stroke="currentColor" stroke-width="2"/><circle cx="0" cy="0" r="3" fill="currentColor"/>`;
        case 'tupwok': return `<circle cx="0" cy="0" r="14" fill="none" stroke="currentColor" stroke-width="1"/><circle cx="0" cy="0" r="8" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="0" cy="0" r="3" fill="currentColor"/>`;
        case 'dukto':  return `<line x1="0" y1="-15" x2="0" y2="15" stroke="currentColor" stroke-width="2.5"/><polygon points="0,-15 -5,-6 5,-6" fill="currentColor"/>`;
        case 'iwa':    return `<line x1="-12" y1="-12" x2="12" y2="12" stroke="currentColor" stroke-width="2.5"/><line x1="-12" y1="12" x2="12" y2="-12" stroke="currentColor" stroke-width="1.5"/>`;
        case 'pittip': return `<polygon points="-12,-10 12,-10 0,12" fill="currentColor"/>`;
        case 'waras':  return `<circle cx="-8" cy="-6" r="2.5" fill="currentColor"/><circle cx="8" cy="-6" r="2.5" fill="currentColor"/><circle cx="0" cy="8" r="3" fill="currentColor"/><circle cx="0" cy="-2" r="2" fill="currentColor"/>`;
        case 'tublag': return `<path d="M-12,10 L-4,-8 L4,8 L12,-10" fill="none" stroke="currentColor" stroke-width="2"/>`;
        case 'tigkab': return `<polygon points="-10,-8 -2,-12 -6,-2" fill="currentColor"/><polygon points="8,-10 12,-2 4,-4" fill="currentColor"/><polygon points="-4,8 6,10 0,2" fill="currentColor"/>`;

        case 'tiha':   return `<path d="M0,12 L0,0 L-10,-12 M0,0 L10,-12" fill="none" stroke="currentColor" stroke-width="2.5"/>`;
        case 'padu':   return `<circle cx="-6" cy="-6" r="3" fill="currentColor"/><circle cx="6" cy="-6" r="3" fill="currentColor"/><circle cx="-6" cy="6" r="3" fill="currentColor"/><circle cx="6" cy="6" r="3" fill="currentColor"/>`;
        case 'silpu':  return `<circle cx="-7" cy="0" r="5" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="7" cy="0" r="5" fill="none" stroke="currentColor" stroke-width="2"/><line x1="-2" y1="0" x2="2" y2="0" stroke="currentColor" stroke-width="2"/>`;
        case 'bunton': return `<circle cx="-8" cy="-8" r="2" fill="currentColor"/><circle cx="0" cy="-8" r="2" fill="currentColor"/><circle cx="8" cy="-8" r="2" fill="currentColor"/><circle cx="-4" cy="0" r="2" fill="currentColor"/><circle cx="4" cy="0" r="2" fill="currentColor"/><circle cx="0" cy="8" r="2" fill="currentColor"/>`;

        case 'piag':   return `<polygon points="0,-14 6,-4 14,-10 10,6 -10,6 -14,-10 -6,-4" fill="currentColor"/>`;
        case 'sukap':  return `<circle cx="0" cy="0" r="12" fill="none" stroke="currentColor" stroke-width="1.5"/><line x1="-12" y1="0" x2="12" y2="0" stroke="currentColor" stroke-width="2"/>`;
        case 'kupos':  return `<path d="M-12,-12 L-4,-4 M12,-12 L4,-4 M-12,12 L-4,4 M12,12 L4,4" stroke="currentColor" stroke-width="2"/><circle cx="0" cy="0" r="3" fill="currentColor"/>`;
        case 'lawal':  return `<path d="M-4,-4 L-12,-12 M4,-4 L12,-12 M-4,4 L-12,12 M4,4 L12,12" stroke="currentColor" stroke-width="2"/>`;
        case 'sapas':  return `<path d="M-12,-8 L-4,0 L-12,8 M-2,-8 L6,0 L-2,8 M8,-8 L16,0 L8,8" fill="none" stroke="currentColor" stroke-width="2"/>`;
        case 'tunbog': return `<rect x="-10" y="-4" width="20" height="8" fill="currentColor"/><line x1="0" y1="-12" x2="0" y2="12" stroke="currentColor" stroke-width="2"/>`;
        case 'kunta':  return `<polygon points="0,-14 12,0 0,14 -12,0" fill="currentColor"/>`;
       case 'asanu':  return `
            <!-- Baybayin 'Sa' Symbol -->
            <g transform="translate(-18.36, -16) scale(1.08)">
                <path d="M 8.9846154,4.923077 L 10.769231,23.938462 L 22.461538,7.2615385" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="bevel" stroke-linecap="butt"/>
                <path d="M 19.261538,12.984615 C 21.098792,13.027957 23.438409,15.022447 23.464852,15.755267 C 23.49016,16.456647 22.088153,17.672444 20.923077,18.523077 C 20.923077,18.523077 24.425573,22.346312 24.579645,24.247574 C 24.736252,26.180107 20.996794,24.856938 19.076923,24.184615 C 19.852188,25.438811 20.927057,26.992876 23.323077,27.076923 C 25.657559,27.16097 27.718245,25.869131 27.753846,24.430769 C 27.789474,22.991285 25.081056,20.240541 23.420355,18.740592 C 23.420355,18.740592 26.923266,17.300554 26.922367,16.060118 C 26.921468,14.851161 23.125785,12.043555 20.738462,10.707692 L 19.261538,12.984615 z" fill="currentColor"/>
            </g>
        `;
        default:
            return `<polygon points="0,-10 10,0 0,10 -10,0" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="0" cy="0" r="3" fill="currentColor"/>`;
    }
}

// 8. DURATION-DRIVEN DYNAMIC RING SHAPE GENERATORS
function getDurationRingGeometry(durId, cx, cy, rBase) {
    switch (durId) {
        case 'tat':
            let ptsTat = [];
            for (let i = 0; i < 32; i++) {
                const a = (i * 2 * Math.PI) / 32;
                const r = i % 2 === 0 ? rBase + 12 : rBase - 10;
                ptsTat.push(`${(cx + r * Math.cos(a)).toFixed(2)},${(cy + r * Math.sin(a)).toFixed(2)}`);
            }
            return `<polygon points="${ptsTat.join(' ')}" fill="none" stroke="currentColor" stroke-width="2.5" filter="url(#arcaneGlow)"/>`;

        case 'tul':
            return `
                <circle cx="${cx}" cy="${cy}" r="${rBase + 14}" fill="none" stroke="currentColor" stroke-width="1.8"/>
                <circle cx="${cx}" cy="${cy}" r="${rBase}" fill="none" stroke="currentColor" stroke-width="3.2" filter="url(#arcaneGlow)"/>
                <circle cx="${cx}" cy="${cy}" r="${rBase - 14}" fill="none" stroke="currentColor" stroke-width="1.8"/>
            `;

        case 'bati':
            let ptsOuter = [], ptsInner = [];
            for (let i = 0; i < 8; i++) {
                const a = (i * 2 * Math.PI) / 8 + Math.PI / 8;
                ptsOuter.push(`${(cx + (rBase + 16) * Math.cos(a)).toFixed(2)},${(cy + (rBase + 16) * Math.sin(a)).toFixed(2)}`);
                ptsInner.push(`${(cx + (rBase - 16) * Math.cos(a)).toFixed(2)},${(cy + (rBase - 16) * Math.sin(a)).toFixed(2)}`);
            }
            return `
                <polygon points="${ptsOuter.join(' ')}" fill="none" stroke="currentColor" stroke-width="2.5" filter="url(#arcaneGlow)"/>
                <polygon points="${ptsInner.join(' ')}" fill="none" stroke="currentColor" stroke-width="1.5"/>
            `;

        case 'tan':
            let chronoArcs = "";
            for (let i = 0; i < 4; i++) {
                const startA = i * (Math.PI / 2) + 0.18;
                const endA = (i + 1) * (Math.PI / 2) - 0.18;
                const x1 = (cx + rBase * Math.cos(startA)).toFixed(2);
                const y1 = (cy + rBase * Math.sin(startA)).toFixed(2);
                const x2 = (cx + rBase * Math.cos(endA)).toFixed(2);
                const y2 = (cy + rBase * Math.sin(endA)).toFixed(2);
                chronoArcs += `<path d="M${x1},${y1} A${rBase},${rBase} 0 0,1 ${x2},${y2}" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" filter="url(#arcaneGlow)"/>`;
                const mx = (cx + (rBase + 8) * Math.cos((startA + endA)/2)).toFixed(2);
                const my = (cy + (rBase + 8) * Math.sin((startA + endA)/2)).toFixed(2);
                chronoArcs += `<circle cx="${mx}" cy="${my}" r="3" fill="currentColor"/>`;
            }
            return chronoArcs;

        case 'lit':
            return `
                <circle cx="${cx}" cy="${cy}" r="${rBase + 16}" fill="none" stroke="currentColor" stroke-width="1" opacity="0.45"/>
                <circle cx="${cx}" cy="${cy}" r="${rBase + 8}" fill="none" stroke="currentColor" stroke-width="1.6" opacity="0.75"/>
                <circle cx="${cx}" cy="${cy}" r="${rBase}" fill="none" stroke="currentColor" stroke-width="2.8" filter="url(#arcaneGlow)"/>
                <circle cx="${cx}" cy="${cy}" r="${rBase - 8}" fill="none" stroke="currentColor" stroke-width="1.6" opacity="0.75"/>
                <circle cx="${cx}" cy="${cy}" r="${rBase - 16}" fill="none" stroke="currentColor" stroke-width="1" opacity="0.45"/>
            `;

        case 'talkib':
            let trapTeeth = "";
            for (let i = 0; i < 24; i++) {
                const a = (i * 2 * Math.PI) / 24;
                const x1 = (cx + (rBase + 8) * Math.cos(a)).toFixed(2);
                const y1 = (cy + (rBase + 8) * Math.sin(a)).toFixed(2);
                const x2 = (cx + (rBase - 14) * Math.cos(a)).toFixed(2);
                const y2 = (cy + (rBase - 14) * Math.sin(a)).toFixed(2);
                trapTeeth += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="currentColor" stroke-width="1.5"/>`;
            }
            return `
                <circle cx="${cx}" cy="${cy}" r="${rBase + 8}" fill="none" stroke="currentColor" stroke-width="2"/>
                <circle cx="${cx}" cy="${cy}" r="${rBase - 8}" fill="none" stroke="currentColor" stroke-width="2" filter="url(#arcaneGlow)"/>
                ${trapTeeth}
            `;

        case 'litu':
            let wavePts = [];
            for (let i = 0; i <= 180; i++) {
                const th = (i * 2 * Math.PI) / 180;
                const r = rBase + 12 * Math.sin(12 * th);
                wavePts.push(`${(cx + r * Math.cos(th)).toFixed(2)},${(cy + r * Math.sin(th)).toFixed(2)}`);
            }
            return `<path d="M${wavePts.join(' L')} Z" fill="none" stroke="currentColor" stroke-width="2.2" filter="url(#arcaneGlow)"/>`;

        default:
            return `<circle cx="${cx}" cy="${cy}" r="${rBase}" fill="none" stroke="currentColor" stroke-width="2" opacity="0.85" filter="url(#arcaneGlow)"/>`;
    }
}

// 9. SACRED GEOMETRY LATTICE HELPERS
function generateZigzagRing(cx, cy, rBase, amp, teeth) {
    let points = [];
    for (let i = 0; i < teeth; i++) {
        const a1 = (i * 2 * Math.PI) / teeth;
        const a2 = ((i + 0.5) * 2 * Math.PI) / teeth;
        const r1 = rBase + amp;
        const r2 = rBase - amp;
        points.push(`${(cx + r1 * Math.cos(a1)).toFixed(2)},${(cy + r1 * Math.sin(a1)).toFixed(2)}`);
        points.push(`${(cx + r2 * Math.cos(a2)).toFixed(2)},${(cy + r2 * Math.sin(a2)).toFixed(2)}`);
    }
    return `<polygon points="${points.join(' ')}" fill="none" stroke="currentColor" stroke-width="0.85" opacity="0.6"/>`;
}

function generateWaveRing(cx, cy, rBase, amp, waves, samples = 120) {
    let d = [];
    for (let i = 0; i <= samples; i++) {
        const theta = (i * 2 * Math.PI) / samples;
        const r = rBase + amp * Math.sin(waves * theta);
        const x = (cx + r * Math.cos(theta)).toFixed(2);
        const y = (cy + r * Math.sin(theta)).toFixed(2);
        if (i === 0) d.push(`M${x},${y}`);
        else d.push(`L${x},${y}`);
    }
    d.push('Z');
    return `<path d="${d.join(' ')}" fill="none" stroke="currentColor" stroke-width="0.8" opacity="0.5"/>`;
}

function generateCrissCrossLattice(cx, cy, rInner, rOuter, count) {
    let lines = "";
    for (let i = 0; i < count; i++) {
        const a1 = (i * 2 * Math.PI) / count;
        const a2 = ((i + count / 4) * 2 * Math.PI) / count;
        const a3 = ((i - count / 4) * 2 * Math.PI) / count;
        const x1 = (cx + rInner * Math.cos(a1)).toFixed(2);
        const y1 = (cy + rInner * Math.sin(a1)).toFixed(2);
        const x2 = (cx + rOuter * Math.cos(a2)).toFixed(2);
        const y2 = (cy + rOuter * Math.sin(a2)).toFixed(2);
        const x3 = (cx + rOuter * Math.cos(a3)).toFixed(2);
        const y3 = (cy + rOuter * Math.sin(a3)).toFixed(2);
        lines += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="currentColor" stroke-width="0.6" opacity="0.3"/>`;
        lines += `<line x1="${x1}" y1="${y1}" x2="${x3}" y2="${y3}" stroke="currentColor" stroke-width="0.6" opacity="0.3"/>`;
    }
    return lines;
}

function generateAstrolabeDialTicks(cx, cy, rBase, count, tickLength) {
    let ticks = "";
    for (let i = 0; i < count; i++) {
        const angle = (i * 2 * Math.PI) / count;
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        const x1 = (cx + rBase * cos).toFixed(2);
        const y1 = (cy + rBase * sin).toFixed(2);
        const x2 = (cx + (rBase - (i % 4 === 0 ? tickLength * 1.8 : tickLength)) * cos).toFixed(2);
        const y2 = (cy + (rBase - (i % 4 === 0 ? tickLength * 1.8 : tickLength)) * sin).toFixed(2);
        ticks += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="currentColor" stroke-width="${i % 4 === 0 ? '1.2' : '0.6'}" opacity="0.65"/>`;
    }
    return ticks;
}


// ==========================================================================
// 10. MAIN SVG MAGIC SPELL CIRCLE BUILDER
// ==========================================================================

function generateSpellCircleSVG(isInscribing = false) {
    const elId = state.element || 'sfalhoy';
    const delId = state.delivery || 'uruwak';
    const bodyParts = state.bodyParts || ['whole_body'];
    
    const activeMods = (state.modifiers || []).map(id => MODIFIERS.find(m => m.id === id)).filter(Boolean);
    const nonDurationMods = activeMods.filter(m => m.cat !== 'duration');
    const activeDurationMod = activeMods.find(m => m.cat === 'duration');
    const theme = ELEMENT_COLORS[elId] || ELEMENT_COLORS.amin;

    const hb = calculateHeartbeatMetrics(activeMods);

    const CX = 300;
    const CY = 300;
    const R_INNER = 135;
    const R_OUTER = 220;
    const R_BORDER_CHANT = 270;
    const CHANT_CIRCUMFERENCE = 2 * Math.PI * R_BORDER_CHANT;

    // 1. High Mage Inscribed Chant Text
    const elObj = (typeof ELEMENTS !== 'undefined' ? ELEMENTS.find(e => e.id === elId) : null) || { name: "Sfalhoy", stem: "Shal" };
    const delObj = (typeof DELIVERIES !== 'undefined' ? DELIVERIES.find(d => d.id === delId) : null) || { id: "uruwak", name: "Uruwak", stem: "Uru" };
    
    let mainStem = "";
    if (delObj.id === 'hlakbil') mainStem = "Hlak-" + elObj.name;
    else if (delObj.id === 'ruluwar') mainStem = "Rul-" + elObj.name;
    else if (delObj.id === 'iwati') mainStem = "Iwat-" + elObj.name;
    else mainStem = elObj.name + " " + delObj.stem;

    const highChantRaw = activeMods.length > 0
        ? `${mainStem}-${activeMods.map(m => m.stem).join("-")}!`
        : `${mainStem}!`;

    const fullRunicBorderText = generateFullBorderRunicChant(highChantRaw, R_BORDER_CHANT);

    // 2. Delivery Runes & Radial Conduits
    const numDeliveryRunes = 6;
    let deliveryRunesSVG = "";
    let innerConduitsSVG = "";

    for (let i = 0; i < numDeliveryRunes; i++) {
        const angleDeg = (i * 360) / numDeliveryRunes;
        const angleRad = (angleDeg * Math.PI) / 180;
        const x = CX + R_INNER * Math.cos(angleRad);
        const y = CY + R_INNER * Math.sin(angleRad);
        const rune = getDeliveryRunePath(delId, bodyParts);
        
        deliveryRunesSVG += `
            <g transform="translate(${x.toFixed(2)}, ${y.toFixed(2)}) rotate(${angleDeg + 90})" color="${theme.primary}">
                <g class="stage-elem inscribe-delivery-glyph">
                    ${rune}
                </g>
            </g>
        `;

        innerConduitsSVG += `
            <line x1="${(CX + 64 * Math.cos(angleRad)).toFixed(2)}" y1="${(CY + 64 * Math.sin(angleRad)).toFixed(2)}" 
                  x2="${(CX + (R_INNER - 20) * Math.cos(angleRad)).toFixed(2)}" y2="${(CY + (R_INNER - 20) * Math.sin(angleRad)).toFixed(2)}" 
                  stroke="${theme.primary}" stroke-width="1.8" stroke-dasharray="3 3" />
        `;
    }

    // 3. Modifier Runes, Ruluwar Dense Tiling & Outer Conduits
    let ruluwarDenseRingSVG = "";
    const isRuluwar = delId === 'ruluwar';

    if (isRuluwar) {
        const ruluwarDensity = 36;
        for (let i = 0; i < ruluwarDensity; i++) {
            const angleDeg = (i * 360) / ruluwarDensity;
            const angleRad = (angleDeg * Math.PI) / 180;
            const x = CX + R_OUTER * Math.cos(angleRad);
            const y = CY + R_OUTER * Math.sin(angleRad);
            ruluwarDenseRingSVG += `
                <g transform="translate(${x.toFixed(2)}, ${y.toFixed(2)}) rotate(0)" color="${theme.primary}" opacity="0.85">
                    <g class="stage-elem inscribe-ruluwar-glyph">
                        ${getVerticalRuluwarGlyph()}
                    </g>
                </g>
            `;
        }
    }

    let modifierRunesSVG = "";
    let constellationPolygon = "";
    let outerConduitsSVG = "";
    const modCount = nonDurationMods.length;

    if (modCount > 0) {
        let polygonPoints = [];
        nonDurationMods.forEach((mod, i) => {
            const angleDeg = (i * 360) / modCount - 90;
            const angleRad = (angleDeg * Math.PI) / 180;
            const x = CX + R_OUTER * Math.cos(angleRad);
            const y = CY + R_OUTER * Math.sin(angleRad);
            polygonPoints.push(`${x.toFixed(2)},${y.toFixed(2)}`);

            const glyph = getModifierGlyphPath(mod.id);
            modifierRunesSVG += `
                <g transform="translate(${x.toFixed(2)}, ${y.toFixed(2)}) rotate(${angleDeg + 90})" color="${theme.primary}">
                    <circle cx="0" cy="0" r="18" fill="#0c0e15" stroke="${theme.primary}" stroke-width="1.8" filter="url(#arcaneGlow)" class="stage-elem inscribe-node-border"/>
                    <circle cx="0" cy="0" r="22" fill="none" stroke="${theme.primary}" stroke-width="0.75" stroke-dasharray="2 3" class="stage-elem inscribe-node-orbit"/>
                    <g class="stage-elem inscribe-modifier-glyph">
                        ${glyph}
                    </g>
                </g>
            `;

            outerConduitsSVG += `
                <line x1="${(CX + 156 * Math.cos(angleRad)).toFixed(2)}" y1="${(CY + 156 * Math.sin(angleRad)).toFixed(2)}"
                      x2="${(CX + (R_OUTER - 24) * Math.cos(angleRad)).toFixed(2)}" y2="${(CY + (R_OUTER - 24) * Math.sin(angleRad)).toFixed(2)}"
                      stroke="${theme.primary}" stroke-width="2" />
            `;
        });

        if (modCount >= 2) {
            const pointsStr = polygonPoints.join(" ");
            constellationPolygon = `
                <polygon points="${pointsStr}" fill="none" stroke="${theme.primary}" stroke-width="1.2" opacity="0.4"/>
                <polygon points="${pointsStr}" fill="${theme.glow}" opacity="0.12"/>
            `;
        }
    } else if (!isRuluwar && !activeDurationMod) {
        for (let i = 0; i < 12; i++) {
            const angleDeg = (i * 360) / 12 - 90;
            const angleRad = (angleDeg * Math.PI) / 180;
            const x = CX + R_OUTER * Math.cos(angleRad);
            const y = CY + R_OUTER * Math.sin(angleRad);
            modifierRunesSVG += `
                <g transform="translate(${x.toFixed(2)}, ${y.toFixed(2)})" color="${theme.primary}" opacity="0.3">
                    <circle cx="0" cy="0" r="6" fill="none" stroke="currentColor" stroke-width="1.2"/>
                    <line x1="-8" y1="0" x2="8" y2="0" stroke="currentColor" stroke-width="0.8"/>
                    <line x1="0" y1="-8" x2="0" y2="8" stroke="currentColor" stroke-width="0.8"/>
                </g>
            `;
        }
    }

    const scaleMin = (1.0 - hb.scaleDelta).toFixed(3);
    const scaleMax = (1.0 + hb.scaleDelta).toFixed(3);

    // 4. Dynamic Animation Styles
    let animationStyles = `
        @keyframes dynamicHeartbeat {
            0%, 100% { transform: scale(${scaleMin}); opacity: ${hb.opacityMin.toFixed(2)}; }
            50%      { transform: scale(${scaleMax}); opacity: ${hb.opacityMax.toFixed(2)}; }
        }
        @keyframes rotateBorderChantClockwise {
            from { transform: rotate(0deg); }
            to   { transform: rotate(360deg); }
        }
        @keyframes rotateOuterModifierCounter {
            from { transform: rotate(0deg); }
            to   { transform: rotate(-360deg); }
        }
        @keyframes rotateInnerDeliveryClockwise {
            from { transform: rotate(0deg); }
            to   { transform: rotate(360deg); }
        }

        .heartbeat-element {
            transform-origin: ${CX}px ${CY}px;
            animation: dynamicHeartbeat ${hb.speed.toFixed(2)}s ease-in-out infinite;
        }
        .outer-border-chant-group {
            transform-origin: ${CX}px ${CY}px;
            animation: rotateBorderChantClockwise 75s linear infinite;
        }
        .outer-ring-group {
            transform-origin: ${CX}px ${CY}px;
            animation: rotateOuterModifierCounter 80s linear infinite;
        }
        .inner-delivery-group {
            transform-origin: ${CX}px ${CY}px;
            animation: rotateInnerDeliveryClockwise 50s linear infinite;
        }
    `;

    if (isInscribing) {
        animationStyles = `
            /* Initial Hidden State */
            #arcaneSpellCircleSVG.is-inscribing .stage-elem {
                opacity: 0;
            }

            /* Universal Stroke Tracing Animations */
            @keyframes traceCircFast {
                0%   { stroke-dashoffset: 1800; opacity: 0; }
                10%  { opacity: 1; }
                100% { stroke-dashoffset: 0; opacity: 1; }
            }
            @keyframes traceConduitRay {
                0%   { stroke-dashoffset: 200; opacity: 0; }
                15%  { opacity: 1; }
                100% { stroke-dashoffset: 0; opacity: 1; }
            }
            @keyframes traceNodeCircle {
                0%   { stroke-dashoffset: 140; opacity: 0; }
                20%  { opacity: 1; }
                100% { stroke-dashoffset: 0; opacity: 1; }
            }
            @keyframes igniteRuneInPlace {
                0%   { opacity: 0; }
                50%  { opacity: 1; filter: drop-shadow(0 0 12px currentColor); }
                100% { opacity: 1; filter: none; }
            }
            @keyframes fadeInGlowBg {
                0%   { opacity: 0; }
                100% { opacity: 1; }
            }
            @keyframes fadeInLatticeGrid {
                0%   { opacity: 0; }
                100% { opacity: 0.65; }
            }
            @keyframes sweepRunicChant {
                0%   { opacity: 0; letter-spacing: 5px; }
                40%  { opacity: 0.95; }
                100% { opacity: 0.92; letter-spacing: 1.5px; }
            }

            /* Synchronized Rotation & Heartbeat starting right as Inscription finishes (3.9s) */
            @keyframes rotateBorderChantClockwise {
                from { transform: rotate(0deg); }
                to   { transform: rotate(360deg); }
            }
            @keyframes rotateOuterModifierCounter {
                from { transform: rotate(0deg); }
                to   { transform: rotate(-360deg); }
            }
            @keyframes rotateInnerDeliveryClockwise {
                from { transform: rotate(0deg); }
                to   { transform: rotate(360deg); }
            }
            @keyframes dynamicHeartbeat {
                0%, 100% { transform: scale(${scaleMin}); opacity: ${hb.opacityMin.toFixed(2)}; }
                50%      { transform: scale(${scaleMax}); opacity: ${hb.opacityMax.toFixed(2)}; }
            }

            #arcaneSpellCircleSVG.is-inscribing .heartbeat-element {
                transform-origin: ${CX}px ${CY}px;
                animation: dynamicHeartbeat ${hb.speed.toFixed(2)}s ease-in-out 3.9s infinite;
            }
            #arcaneSpellCircleSVG.is-inscribing .outer-border-chant-group {
                transform-origin: ${CX}px ${CY}px;
                animation: rotateBorderChantClockwise 75s linear 3.9s infinite;
            }
            #arcaneSpellCircleSVG.is-inscribing .outer-ring-group {
                transform-origin: ${CX}px ${CY}px;
                animation: rotateOuterModifierCounter 80s linear 3.9s infinite;
            }
            #arcaneSpellCircleSVG.is-inscribing .inner-delivery-group {
                transform-origin: ${CX}px ${CY}px;
                animation: rotateInnerDeliveryClockwise 50s linear 3.9s infinite;
            }

            /* STAGE 1: Central Core Genesis (0.15s - 1.0s) */
            #arcaneSpellCircleSVG.is-inscribing .inscribe-bg-glow {
                animation: fadeInGlowBg 1.4s ease-out 0.15s forwards;
            }
            #arcaneSpellCircleSVG.is-inscribing .inscribe-core-rings {
                stroke-dasharray: 600;
                stroke-dashoffset: 600;
                animation: traceCircFast 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.2s forwards;
            }
            #arcaneSpellCircleSVG.is-inscribing .inscribe-core-rune {
                animation: igniteRuneInPlace 0.7s ease-out 0.4s forwards;
            }

            /* STAGE 1 -> 2: Inner Conduits (0.9s - 1.4s) */
            #arcaneSpellCircleSVG.is-inscribing .inscribe-conduit-1 line {
                stroke-dasharray: 200;
                stroke-dashoffset: 200;
                animation: traceConduitRay 0.5s ease-out 0.9s forwards;
            }

            /* STAGE 2: Delivery Ring & Somatic Runes (1.3s - 2.2s) */
            #arcaneSpellCircleSVG.is-inscribing .inscribe-delivery-rings {
                stroke-dasharray: 1200;
                stroke-dashoffset: 1200;
                animation: traceCircFast 0.9s cubic-bezier(0.4, 0, 0.2, 1) 1.2s forwards;
            }
            #arcaneSpellCircleSVG.is-inscribing .inscribe-delivery-glyph {
                animation: igniteRuneInPlace 0.8s ease-out 1.5s forwards;
            }

            /* STAGE 2 -> 3: Outer Conduits & Lattice (1.9s - 2.6s) */
            #arcaneSpellCircleSVG.is-inscribing .inscribe-conduit-2 line {
                stroke-dasharray: 200;
                stroke-dashoffset: 200;
                animation: traceConduitRay 0.5s ease-out 1.9s forwards;
            }
            #arcaneSpellCircleSVG.is-inscribing .inscribe-lattice {
                animation: fadeInLatticeGrid 1.0s ease 2.0s forwards;
            }

            /* STAGE 3: Modifier Ring, Node Mini-Rings & Glyphs (2.2s - 3.3s) */
            #arcaneSpellCircleSVG.is-inscribing .inscribe-modifier-ring {
                stroke-dasharray: 1800;
                stroke-dashoffset: 1800;
                animation: traceCircFast 1.0s cubic-bezier(0.4, 0, 0.2, 1) 2.2s forwards;
            }
            #arcaneSpellCircleSVG.is-inscribing .inscribe-node-border {
                stroke-dasharray: 120;
                stroke-dashoffset: 120;
                animation: traceNodeCircle 0.7s cubic-bezier(0.4, 0, 0.2, 1) 2.4s forwards;
            }
            #arcaneSpellCircleSVG.is-inscribing .inscribe-node-orbit {
                animation: fadeInGlowBg 0.6s ease-out 2.5s forwards;
            }
            #arcaneSpellCircleSVG.is-inscribing .inscribe-modifier-glyph {
                animation: igniteRuneInPlace 0.7s ease-out 2.6s forwards;
            }
            #arcaneSpellCircleSVG.is-inscribing .inscribe-ruluwar-glyph {
                animation: igniteRuneInPlace 0.7s ease-out 2.3s forwards;
            }

            /* STAGE 4: Outermost Border Frame & Runic Chant (3.0s - 3.9s) */
            #arcaneSpellCircleSVG.is-inscribing .inscribe-border-rings {
                stroke-dasharray: 2000;
                stroke-dashoffset: 2000;
                animation: traceCircFast 0.9s cubic-bezier(0.4, 0, 0.2, 1) 2.9s forwards;
            }
            #arcaneSpellCircleSVG.is-inscribing .inscribe-border-chant {
                animation: sweepRunicChant 0.9s ease-out 3.1s forwards;
            }
        `;
    }

    // 5. Compose Master SVG
    return `
    <svg id="arcaneSpellCircleSVG" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" class="spell-circle-svg ${isInscribing ? 'is-inscribing' : ''}" style="width: 100%; height: 100%; max-width: 520px; aspect-ratio: 1/1; cursor: pointer;" onclick="triggerInscriptionAnimation()">
        <defs>
            <filter id="arcaneGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="${hb.blur.toFixed(1)}" result="blur" />
                <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                </feMerge>
            </filter>
            <radialGradient id="centerGradient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stop-color="${theme.primary}" stop-opacity="${(0.38 * hb.glow).toFixed(2)}"/>
                <stop offset="60%" stop-color="${theme.bg}" stop-opacity="${(0.20 * hb.glow).toFixed(2)}"/>
                <stop offset="100%" stop-color="#0b0d13" stop-opacity="0"/>
            </radialGradient>
            <path id="outerBorderRunicTrack" d="M ${CX}, ${CY - R_BORDER_CHANT} a ${R_BORDER_CHANT},${R_BORDER_CHANT} 0 1,1 -0.01,0 Z" fill="none" />
            <style>
                ${animationStyles}
            </style>
        </defs>

        <!-- BACKGROUND AMBIENT GLOW -->
        <circle cx="${CX}" cy="${CY}" r="282" fill="url(#centerGradient)" class="heartbeat-element stage-elem inscribe-bg-glow"/>

        <!-- ================= STATIC SACRED GEOMETRY LATTICE ================= -->
        <g color="${theme.primary}" class="stage-elem inscribe-lattice">
            <line x1="16" y1="${CY}" x2="584" y2="${CY}" stroke="currentColor" stroke-width="0.6" stroke-dasharray="8 6" opacity="0.35"/>
            <line x1="${CX}" y1="16" x2="${CX}" y2="584" stroke="currentColor" stroke-width="0.6" stroke-dasharray="8 6" opacity="0.35"/>
            <line x1="102" y1="102" x2="498" y2="498" stroke="currentColor" stroke-width="0.5" stroke-dasharray="4 6" opacity="0.25"/>
            <line x1="102" y1="498" x2="498" y2="102" stroke="currentColor" stroke-width="0.5" stroke-dasharray="4 6" opacity="0.25"/>

            ${generateCrissCrossLattice(CX, CY, 105, 185, 16)}
            ${generateWaveRing(CX, CY, 172, 4, 16)}
            ${generateWaveRing(CX, CY, 88, 3, 12)}
            ${generateZigzagRing(CX, CY, 248, 3.5, 48)}
            ${generateAstrolabeDialTicks(CX, CY, 286, 72, 5)}
        </g>

        <!-- ================= CONNECTIVE CONDUIT LINES ================= -->
        <g color="${theme.primary}">
            <g class="stage-elem inscribe-conduit-1">${innerConduitsSVG}</g>
            <g class="stage-elem inscribe-conduit-2">${outerConduitsSVG}</g>
        </g>

        <!-- ================= OUTER MODIFIER RING (STAGE 3) ================= -->
        <g class="outer-ring-group" color="${theme.primary}">
            <g class="stage-elem inscribe-modifier-ring">
                ${getDurationRingGeometry(activeDurationMod ? activeDurationMod.id : null, CX, CY, R_OUTER)}
            </g>
            ${ruluwarDenseRingSVG}
            <g class="stage-elem inscribe-modifier-ring">
                ${constellationPolygon}
            </g>
            ${modifierRunesSVG}
        </g>

        <!-- ================= REAL OUTER BORDER CHANT RING (STAGE 4) ================= -->
        <g class="outer-border-chant-group" color="${theme.primary}">
            <g class="stage-elem inscribe-border-rings">
                <circle cx="${CX}" cy="${CY}" r="282" fill="none" stroke="currentColor" stroke-width="1.8" opacity="0.85" filter="url(#arcaneGlow)"/>
                <circle cx="${CX}" cy="${CY}" r="258" fill="none" stroke="currentColor" stroke-width="1.2" opacity="0.7"/>
            </g>
            <g class="stage-elem inscribe-border-chant">
                <text font-family="'Segoe UI Historic', 'Noto Sans Runic', 'Apple Symbols', 'Segoe UI Symbol', 'Courier New', monospace" font-size="9.5" font-weight="700" letter-spacing="1.5" fill="${theme.primary}" opacity="0.92" filter="url(#arcaneGlow)">
                    <textPath href="#outerBorderRunicTrack" startOffset="0%" textLength="${(CHANT_CIRCUMFERENCE - 6).toFixed(1)}" lengthAdjust="spacing">
                        ${fullRunicBorderText}
                    </textPath>
                </text>
            </g>
        </g>

        <!-- ================= FIRST RING: DELIVERY ARCHETYPE (STAGE 2) ================= -->
        <g class="inner-delivery-group" color="${theme.primary}">
            <g class="stage-elem inscribe-delivery-rings">
                <circle cx="${CX}" cy="${CY}" r="156" fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.75"/>
                <circle cx="${CX}" cy="${CY}" r="150" fill="none" stroke="currentColor" stroke-width="0.75" stroke-dasharray="4 4" opacity="0.5"/>
                <circle cx="${CX}" cy="${CY}" r="${R_INNER}" fill="none" stroke="currentColor" stroke-width="2" opacity="0.9" filter="url(#arcaneGlow)"/>
                <circle cx="${CX}" cy="${CY}" r="108" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="6 4" opacity="0.65"/>
                <circle cx="${CX}" cy="${CY}" r="102" fill="none" stroke="currentColor" stroke-width="0.75" opacity="0.45"/>
            </g>
            ${deliveryRunesSVG}
        </g>

        <!-- ================= CENTER ELEMENTAL CHAMBER (STAGE 1) ================= -->
        <g class="center-core-group heartbeat-element" color="${theme.primary}">
            <g class="stage-elem inscribe-core-rings">
                <circle cx="${CX}" cy="${CY}" r="74" fill="none" stroke="currentColor" stroke-width="1" stroke-dasharray="4 4" opacity="0.6"/>
                <polygon points="${CX},${CY-72} ${CX+62},${CY+36} ${CX-62},${CY+36}" fill="none" stroke="currentColor" stroke-width="0.8" opacity="0.4"/>
                <polygon points="${CX},${CY+72} ${CX+62},${CY-36} ${CX-62},${CY-36}" fill="none" stroke="currentColor" stroke-width="0.8" opacity="0.4"/>
                <circle cx="${CX}" cy="${CY}" r="64" fill="#0b0d13" stroke="currentColor" stroke-width="2.2" filter="url(#arcaneGlow)"/>
                <circle cx="${CX}" cy="${CY}" r="54" fill="none" stroke="currentColor" stroke-width="1" stroke-dasharray="3 3" opacity="0.75"/>
            </g>
            <g transform="translate(${CX}, ${CY})">
                <g class="stage-elem inscribe-core-rune" filter="url(#arcaneGlow)">
                    ${getElementalRunePath(elId)}
                </g>
            </g>
        </g>
    </svg>
    `;
}

// 11. TRIGGER CONNECTED INSCRIPTION ANIMATION ON CLICK
// 11. TRIGGER CONNECTED INSCRIPTION ANIMATION ON CLICK
function triggerInscriptionAnimation() {
    if (circleState.isInscribing) return;
    circleState.isInscribing = true;

    // Trigger Procedural Web Audio Synthesis
    if (typeof playInscriptionAudio === "function") {
        playInscriptionAudio();
    }

    const container = document.getElementById("spellCircleContainer");
    if (!container) return;

    // Render in pure connected drawing state
    container.innerHTML = generateSpellCircleSVG(true);

    setTimeout(() => {
        circleState.isInscribing = false;
    }, 4500);
}

// 12. CLIENT-SIDE ANIMATED GIF EXPORT ENGINE
async function exportSpellCircleGIF() {
    const statusBtn = document.getElementById("exportGifBtn");
    const origText = statusBtn ? statusBtn.innerHTML : "Save as GIF";
    
    try {
        if (statusBtn) {
            statusBtn.disabled = true;
            statusBtn.innerHTML = "⏳ Inscribing Frames...";
        }

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

        const numFrames = 24;
        const frameImages = [];
        const durationSeconds = 3.2;

        for (let i = 0; i < numFrames; i++) {
            const progress = i / numFrames;
            const rotInner = (progress * 360).toFixed(2);
            const rotOuter = (-progress * 360).toFixed(2);
            const rotBorder = (progress * 360).toFixed(2);
            const pulseScale = (1.0 + 0.05 * Math.sin(progress * 2 * Math.PI)).toFixed(3);

            let svgString = generateSpellCircleSVG(false);

            svgString = svgString.replace(
                'class="outer-border-chant-group"',
                `class="outer-border-chant-group" transform="rotate(${rotBorder}, 300, 300)"`
            ).replace(
                'class="outer-ring-group"',
                `class="outer-ring-group" transform="rotate(${rotOuter}, 300, 300)"`
            ).replace(
                'class="inner-delivery-group"',
                `class="inner-delivery-group" transform="rotate(${rotInner}, 300, 300)"`
            ).replace(
                'class="center-core-group heartbeat-element"',
                `class="center-core-group" transform="scale(${pulseScale})" style="transform-origin: 300px 300px;"`
            );

            const svgBlob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
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
            if (statusBtn) statusBtn.innerHTML = `⏳ Inscribing (${Math.round((i / numFrames) * 100)}%)...`;
        }

        if (statusBtn) statusBtn.innerHTML = "✨ Binding Arcane GIF...";

        gifshot.createGIF({
            images: frameImages,
            gifWidth: size,
            gifHeight: size,
            interval: durationSeconds / numFrames,
            numFrames: numFrames,
            sampleInterval: 8
        }, function(obj) {
            if (!obj.error) {
                const link = document.createElement("a");
                link.download = `${spellTitle}_Circle.gif`;
                link.href = obj.image;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
            if (statusBtn) {
                statusBtn.disabled = false;
                statusBtn.innerHTML = origText;
            }
        });

    } catch (err) {
        console.error("GIF export failed", err);
        alert("Could not export animated GIF. Please ensure an active internet connection on first export.");
        if (statusBtn) {
            statusBtn.disabled = false;
            statusBtn.innerHTML = origText;
        }
    }
}

// 13. AUTO-RENDER FUNCTION TO INJECT INTO DOM
function renderSpellCircle() {
    const container = document.getElementById("spellCircleContainer");
    if (!container) return;
    container.innerHTML = generateSpellCircleSVG(circleState.isInscribing);
}