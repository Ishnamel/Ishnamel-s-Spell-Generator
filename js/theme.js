/* ==========================================================================
   VISUAL THEMES & SKIN SWITCHER ENGINE
   Manages global UI themes, CSS variable overrides, and dynamic SVG circle skins
   ========================================================================== */

const THEME_SKINS = [
    {
        id: "default",
        name: "Arcane Codex",
        icon: "🌌",
        desc: "Classic celestial gold & obsidian crystal weave",
        fontFamily: "'Segoe UI', system-ui, sans-serif"
    },
    {
        id: "astrolabe",
        name: "Brass Astrolabe",
        icon: "⚙️",
        desc: "Polished clockwork brass, astronomical needles & starry velvet",
        fontFamily: "'Georgia', 'Palatino Linotype', serif"
    },
    {
        id: "magitech",
        name: "Magitech HUD",
        icon: "🖲️",
        desc: "Cybernetic wireframe, neon telemetry & scanline matrices",
        fontFamily: "'Courier New', 'Consolas', monospace"
    },
    {
        id: "stone",
        name: "Stone Stele",
        icon: "🗿",
        desc: "Chiseled granite slab with glowing bioluminescent moss",
        fontFamily: "'Cinzel', 'Trajan Pro', 'Palatino', serif"
    },
    {
        id: "blood",
        name: "Blood Pact",
        icon: "🩸",
        desc: "Visceral crimson runes drawn on dark scorched leather",
        fontFamily: "'Crimson Text', 'Garamond', serif"
    },
    {
        id: "manga",
        name: "Manga Inscription",
        icon: "✒️",
        desc: "Stark high-contrast black & white, speed lines & screentones",
        fontFamily: "'Impact', 'Arial Black', sans-serif"
    },
    {
        id: "parchment",
        name: "Ancient Tome",
        icon: "📜",
        desc: "Aged vellum parchment with sepia iron-gall ink calligraphy",
        fontFamily: "'Garamond', 'Baskerville', serif"
    }
];

let themeState = {
    currentSkin: "default"
};

// -------------------------------------------------------------
// 1. SKIN INITIALIZER & SWITCHER
// -------------------------------------------------------------
function initThemeEngine() {
    try {
        const saved = localStorage.getItem("arcane_grimoire_skin");
        if (saved && THEME_SKINS.some(s => s.id === saved)) {
            themeState.currentSkin = saved;
        }
    } catch (e) {
        console.warn("Could not read theme from storage", e);
    }
    applyThemeSkin(themeState.currentSkin, false);
    renderSkinSelectorUI();
}

function applyThemeSkin(skinId, shouldSave = true) {
    const skin = THEME_SKINS.find(s => s.id === skinId) || THEME_SKINS[0];
    themeState.currentSkin = skin.id;

    if (shouldSave) {
        try {
            localStorage.setItem("arcane_grimoire_skin", skin.id);
        } catch (e) {}
    }

    // Apply global data attribute to <html>
    document.documentElement.setAttribute("data-skin", skin.id);

    // Update active dropdown/button state if rendered
    const select = document.getElementById("skinSelectorDropdown");
    if (select) select.value = skin.id;

    // Re-render Spell Circle with skin-specific textures and overlays
    if (typeof renderSpellCircle === "function") {
        renderSpellCircle();
    }
}

function renderSkinSelectorUI() {
    const container = document.getElementById("skinSelectorContainer");
    if (!container) return;

    container.innerHTML = `
        <div class="skin-selector-wrapper">
            <span class="skin-label">🎨 Skin:</span>
            <select id="skinSelectorDropdown" class="skin-dropdown" onchange="applyThemeSkin(this.value)">
                ${THEME_SKINS.map(s => `
                    <option value="${s.id}" ${themeState.currentSkin === s.id ? 'selected' : ''}>
                        ${s.icon} ${s.name}
                    </option>
                `).join("")}
            </select>
        </div>
    `;
}

// -------------------------------------------------------------
// 2. PROCEDURAL SVG SKIN FILTER & TEXTURE INJECTOR
// -------------------------------------------------------------
function getSkinSVGDefs() {
    const skin = themeState.currentSkin;

    switch (skin) {
        case "astrolabe":
            return `
                <!-- Astrolabe Polished Brass Gradient & Star Dust -->
                <radialGradient id="skinBgGradient" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stop-color="#14213d" stop-opacity="0.85"/>
                    <stop offset="65%" stop-color="#070d1e" stop-opacity="0.95"/>
                    <stop offset="100%" stop-color="#030712" stop-opacity="1"/>
                </radialGradient>
                <linearGradient id="brassMetallic" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#ffd166"/>
                    <stop offset="45%" stop-color="#d4a348"/>
                    <stop offset="85%" stop-color="#996e24"/>
                    <stop offset="100%" stop-color="#604410"/>
                </linearGradient>
            `;

        case "magitech":
            return `
                <!-- Cyber Scanline & Hexagonal Grid Pattern -->
                <pattern id="cyberGrid" width="24" height="24" patternUnits="userSpaceOnUse">
                    <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#00f0ff" stroke-width="0.35" stroke-opacity="0.25"/>
                    <circle cx="12" cy="12" r="0.8" fill="#ff007f" opacity="0.4"/>
                </pattern>
                <radialGradient id="skinBgGradient" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stop-color="#041b2d" stop-opacity="0.9"/>
                    <stop offset="70%" stop-color="#020914" stop-opacity="0.98"/>
                    <stop offset="100%" stop-color="#010408" stop-opacity="1"/>
                </radialGradient>
            `;

        case "stone":
            return `
                <!-- Weathered Granite Chiseled Texture Filter -->
                <radialGradient id="skinBgGradient" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stop-color="#242831" stop-opacity="0.95"/>
                    <stop offset="65%" stop-color="#14171d" stop-opacity="0.98"/>
                    <stop offset="100%" stop-color="#0a0c0f" stop-opacity="1"/>
                </radialGradient>
            `;

        case "blood":
            return `
                <!-- Visceral Arterial Sanguine Gradient -->
                <radialGradient id="skinBgGradient" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stop-color="#450a0a" stop-opacity="0.92"/>
                    <stop offset="60%" stop-color="#1c0507" stop-opacity="0.96"/>
                    <stop offset="100%" stop-color="#080102" stop-opacity="1"/>
                </radialGradient>
            `;

        case "manga":
            return `
                <!-- Screentone Halftone Dot Matrix Pattern -->
                <pattern id="screentoneDots" width="8" height="8" patternUnits="userSpaceOnUse">
                    <circle cx="4" cy="4" r="1.2" fill="#000000" opacity="0.35"/>
                </pattern>
                <radialGradient id="skinBgGradient" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stop-color="#ffffff" stop-opacity="1"/>
                    <stop offset="80%" stop-color="#f4f4f5" stop-opacity="1"/>
                    <stop offset="100%" stop-color="#e4e4e7" stop-opacity="1"/>
                </radialGradient>
            `;

        case "parchment":
            return `
                <!-- Aged Scorched Vellum Gradient -->
                <radialGradient id="skinBgGradient" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stop-color="#f5eedc" stop-opacity="1"/>
                    <stop offset="70%" stop-color="#e8dcbf" stop-opacity="0.98"/>
                    <stop offset="100%" stop-color="#543718" stop-opacity="1"/>
                </radialGradient>
            `;

        case "default":
        default:
            return ``;
    }
}

// -------------------------------------------------------------
// 3. PROCEDURAL SVG SKIN BACKGROUND & OVERLAY ART
// -------------------------------------------------------------
function getSkinSVGOverlayArt(CX, CY) {
    const skin = themeState.currentSkin;

    switch (skin) {
        case "astrolabe":
            // Brass clockwork gears, rivets, and quadrant compass needles
            let gearTeeth = "";
            for (let i = 0; i < 48; i++) {
                const a = (i * 2 * Math.PI) / 48;
                const x1 = (CX + 282 * Math.cos(a)).toFixed(2);
                const y1 = (CY + 282 * Math.sin(a)).toFixed(2);
                const x2 = (CX + 292 * Math.cos(a)).toFixed(2);
                const y2 = (CY + 292 * Math.sin(a)).toFixed(2);
                gearTeeth += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#d4a348" stroke-width="2.5" opacity="0.8"/>`;
            }
            return `
                <g class="skin-art-layer astrolabe-skin">
                    <!-- Velvet Outer Backing -->
                    <circle cx="${CX}" cy="${CY}" r="294" fill="url(#skinBgGradient)"/>
                    <circle cx="${CX}" cy="${CY}" r="282" fill="none" stroke="url(#brassMetallic)" stroke-width="5" opacity="0.95"/>
                    <circle cx="${CX}" cy="${CY}" r="278" fill="none" stroke="#604410" stroke-width="1.5"/>
                    ${gearTeeth}
                    <!-- Astronomical Compass Needles -->
                    <polygon points="${CX},28 ${CX+7},${CY} ${CX-7},${CY}" fill="#d4a348" opacity="0.75"/>
                    <polygon points="${CX},572 ${CX+7},${CY} ${CX-7},${CY}" fill="#996e24" opacity="0.75"/>
                    <polygon points="28,${CY} ${CX},${CY+7} ${CX},${CY-7}" fill="#d4a348" opacity="0.75"/>
                    <polygon points="572,${CY} ${CX},${CY+7} ${CX},${CY-7}" fill="#996e24" opacity="0.75"/>
                </g>
            `;

        case "magitech":
            // Wireframe hex grid, scanlines, and telemetry HUD text
            return `
                <g class="skin-art-layer magitech-skin">
                    <circle cx="${CX}" cy="${CY}" r="286" fill="url(#skinBgGradient)"/>
                    <rect x="18" y="18" width="564" height="564" rx="282" fill="url(#cyberGrid)" opacity="0.8"/>
                    <circle cx="${CX}" cy="${CY}" r="284" fill="none" stroke="#00f0ff" stroke-width="1.5" stroke-dasharray="12 6" opacity="0.6"/>
                    <circle cx="${CX}" cy="${CY}" r="278" fill="none" stroke="#ff007f" stroke-width="0.8" opacity="0.4"/>
                    
                    <!-- HUD Telemetry Labels -->
                    <text x="36" y="48" font-family="'Courier New', monospace" font-size="8.5" font-weight="900" fill="#00f0ff" opacity="0.75">SYS_0x7F // MATRIX_ONLINE</text>
                    <text x="440" y="48" font-family="'Courier New', monospace" font-size="8.5" font-weight="900" fill="#ff007f" opacity="0.75">FREQ: 528.4 Hz</text>
                    <text x="36" y="565" font-family="'Courier New', monospace" font-size="8.5" font-weight="900" fill="#00f0ff" opacity="0.65">GRID_SYNC // RAD_282px</text>
                    <text x="446" y="565" font-family="'Courier New', monospace" font-size="8.5" font-weight="900" fill="#39ff14" opacity="0.65">STATUS: ENGAGED</text>
                    
                    <!-- Corner Reticle Brackets -->
                    <path d="M 28,60 L 28,28 L 60,28 M 572,60 L 572,28 L 540,28 M 28,540 L 28,572 L 60,572 M 572,540 L 572,572 L 540,572" fill="none" stroke="#00f0ff" stroke-width="2" opacity="0.85"/>
                </g>
            `;

        case "stone":
            // Chiseled granite slab, tectonic fissures, and moss clusters
            return `
                <g class="skin-art-layer stone-skin">
                    <circle cx="${CX}" cy="${CY}" r="288" fill="url(#skinBgGradient)"/>
                    <circle cx="${CX}" cy="${CY}" r="282" fill="none" stroke="#52525b" stroke-width="4" opacity="0.9"/>
                    
                    <!-- Chiseled Erosion Fissures -->
                    <path d="M 64,120 Q 140,160 180,240 T 260,340 M 520,180 Q 420,260 380,340 T 320,510" fill="none" stroke="#090a0f" stroke-width="2.5" opacity="0.75"/>
                    <path d="M 120,480 Q 200,420 280,410" fill="none" stroke="#090a0f" stroke-width="2" opacity="0.6"/>
                    
                    <!-- Bioluminescent Moss Nodes -->
                    <circle cx="160" cy="180" r="4.5" fill="#4ade80" filter="url(#arcaneGlow)" opacity="0.8"/>
                    <circle cx="430" cy="270" r="5.5" fill="#4ade80" filter="url(#arcaneGlow)" opacity="0.85"/>
                    <circle cx="270" cy="460" r="4" fill="#4ade80" filter="url(#arcaneGlow)" opacity="0.75"/>
                    <circle cx="360" cy="140" r="3.5" fill="#22c55e" filter="url(#arcaneGlow)" opacity="0.7"/>
                </g>
            `;

        case "blood":
            // Visceral arterial crimson seals and sacrificial marks
            return `
                <g class="skin-art-layer blood-skin">
                    <circle cx="${CX}" cy="${CY}" r="288" fill="url(#skinBgGradient)"/>
                    <circle cx="${CX}" cy="${CY}" r="282" fill="none" stroke="#ef4444" stroke-width="3" opacity="0.85" filter="url(#arcaneGlow)"/>
                    <circle cx="${CX}" cy="${CY}" r="276" fill="none" stroke="#991b1b" stroke-width="1.8"/>

                    <!-- Sanguine Splatter Tendrils -->
                    <path d="M ${CX},18 Q ${CX-12},70 ${CX},110 Q ${CX+14},160 ${CX},200" fill="none" stroke="#ef4444" stroke-width="2" opacity="0.7" filter="url(#arcaneGlow)"/>
                    <path d="M 18,${CY} Q 70,${CY+12} 110,${CY} Q 160,${CY-14} 200,${CY}" fill="none" stroke="#ef4444" stroke-width="2" opacity="0.7" filter="url(#arcaneGlow)"/>
                    <path d="M 582,${CY} Q 530,${CY-12} 490,${CY} Q 440,${CY+14} 400,${CY}" fill="none" stroke="#ef4444" stroke-width="2" opacity="0.7" filter="url(#arcaneGlow)"/>
                </g>
            `;

        case "manga":
            // High-contrast manga speed lines and screentone paper
            let speedLines = "";
            for (let i = 0; i < 32; i++) {
                const a = (i * 2 * Math.PI) / 32;
                const x1 = (CX + 240 * Math.cos(a)).toFixed(2);
                const y1 = (CY + 240 * Math.sin(a)).toFixed(2);
                const x2 = (CX + 286 * Math.cos(a)).toFixed(2);
                const y2 = (CY + 286 * Math.sin(a)).toFixed(2);
                speedLines += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#000000" stroke-width="${i % 2 === 0 ? '2.5' : '1.2'}"/>`;
            }
            return `
                <g class="skin-art-layer manga-skin">
                    <circle cx="${CX}" cy="${CY}" r="288" fill="url(#skinBgGradient)"/>
                    <rect x="18" y="18" width="564" height="564" rx="282" fill="url(#screentoneDots)" opacity="0.6"/>
                    <circle cx="${CX}" cy="${CY}" r="284" fill="none" stroke="#000000" stroke-width="4.5"/>
                    <circle cx="${CX}" cy="${CY}" r="278" fill="none" stroke="#000000" stroke-width="1.8"/>
                    ${speedLines}
                </g>
            `;

        case "parchment":
            // Scorched vellum edges and sepia iron-gall frame
            return `
                <g class="skin-art-layer parchment-skin">
                    <circle cx="${CX}" cy="${CY}" r="290" fill="url(#skinBgGradient)"/>
                    <circle cx="${CX}" cy="${CY}" r="282" fill="none" stroke="#543718" stroke-width="3.5" opacity="0.9"/>
                    <circle cx="${CX}" cy="${CY}" r="276" fill="none" stroke="#8c5825" stroke-width="1.2" stroke-dasharray="6 3"/>
                    
                    <!-- Corner Wax Seals & Burn Vignette -->
                    <circle cx="58" cy="58" r="14" fill="#991b1b" opacity="0.85"/>
                    <circle cx="58" cy="58" r="9" fill="#7f1d1d"/>
                    <circle cx="542" cy="542" r="14" fill="#991b1b" opacity="0.85"/>
                    <circle cx="542" cy="542" r="9" fill="#7f1d1d"/>
                </g>
            `;

        case "default":
        default:
            return ``;
    }
}

// -------------------------------------------------------------
// 4. COLOR OVERRIDE HELPER FOR SKINS
// -------------------------------------------------------------
function getSkinThemedColor(elementColor, fallbackColor = "#d4af37") {
    const skin = themeState.currentSkin;
    if (skin === "manga") {
        // Return vibrant elemental color so modifier runes pop clearly against the black nodes
        return elementColor || fallbackColor;
    }
    if (skin === "parchment") {
        return "#543718";
    }
    if (skin === "blood") {
        return "#ef4444";
    }
    if (skin === "astrolabe") {
        return "#e5b358";
    }
    if (skin === "magitech") {
        return elementColor || "#00f0ff";
    }
    return elementColor || fallbackColor;
}

// Start Theme Engine on page load
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initThemeEngine);
} else {
    initThemeEngine();
}