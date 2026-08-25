/* ==========================================================================
   MAGIC ARRAY PRE-BUILT ARCHIVE & BOOK MODAL ENGINE
   Contains all 32,768 Combinations (64 Deployment Classes x 512 Elemental Triads [8x8x8])
   Features Real-Time Filtering, Chunked Rendering & Generated Academic Subtitles
   ========================================================================== */

// -------------------------------------------------------------
// 1. SYSTEM METADATA: ELEMENTS, TOPOLOGIES & 8x8x8 PERMUTATIONS
// -------------------------------------------------------------
const PRESET_ELEMENTS = [
    { id: "sfalhoy", name: "Sfalhoy", label: "Fire", color: "#f97316" },
    { id: "hanhum",  name: "Hanhum",  label: "Water", color: "#38bdf8" },
    { id: "falga",   name: "Falga",   label: "Earth", color: "#f59e0b" },
    { id: "jalfinn", name: "Jalfinn", label: "Wind",  color: "#34d399" },
    { id: "iklad",   name: "Iklad",   label: "Lightning", color: "#facc15" },
    { id: "erlaaw",  name: "Erlaaw",  label: "Light", color: "#fef08a" },
    { id: "worulim", name: "Worulim", label: "Void",  color: "#c084fc" },
    { id: "amin",    name: "Amin",    label: "Aether", color: "#e879f9" }
];

const PRESET_TOPOLOGIES = [
    { code: "U-U-U", name: "Interlocking Orbital Battery", short: "Orbital Battery", role: "Autonomous Area Denial & Sustained Long-Range Siege" },
    { code: "U-U-L", name: "Dispersing Flak Saturation Array", short: "Flak Saturation", role: "Frontline Breaching & Blanket Area Saturation" },
    { code: "U-U-H", name: "Kinetic Bio-Transfusion Vector", short: "Bio-Transfusion", role: "Remote Ally Overcharging & Vanguard Buffing" },
    { code: "U-U-I", name: "Ballistic Anchor Battery", short: "Ballistic Anchor", role: "Remote Territorial Inscription & Pylon Grounding" },
    { code: "U-L-U", name: "Accelerated Vector Rail-Array", short: "Vector Rail-Array", role: "Anti-Fortification Rail-Piercing & Precision Elimination" },
    { code: "U-L-L", name: "Breaching Shockwave Cannon", short: "Shockwave Cannon", role: "Bunker Busting & Secondary Cluster Eradication" },
    { code: "U-L-H", name: "Somatic Vanguard Breaker", short: "Vanguard Breaker", role: "Shock-Troop Infiltration & Point-Blank Break-Ins" },
    { code: "U-L-I", name: "Remote Pylon Projector", short: "Pylon Projector", role: "Long-Range Minefield Deployment & Zone Lockdown" },
    { code: "U-H-U", name: "Bio-Kinetic Guided Rail-Lance", short: "Bio-Rail Lance", role: "Flawless Homing Elimination & High-Evasion Interception" },
    { code: "U-H-L", name: "Somatic Rupture Ballistics", short: "Somatic Rupture", role: "Localized Armor Shattering & Crowd Repulsion" },
    { code: "U-H-H", name: "Symbiotic Piercing Avatar", short: "Piercing Avatar", role: "High-Velocity Martial Penetration & Rebound Striking" },
    { code: "U-H-I", name: "Living Spike Inscription", short: "Spike Inscription", role: "Target Immobilization & Anti-Escape Sealing" },
    { code: "U-I-U", name: "Relic-Refracted Ballistic Matrix", short: "Refracted Matrix", role: "Multi-Vector Interception & Prism Weaponry" },
    { code: "U-I-L", name: "Anchor-Detonating Siege Array", short: "Anchor Demolition", role: "Fortress Structural Demolition & Seismic Takedowns" },
    { code: "U-I-H", name: "Relic-Transferred Striking Lance", short: "Relic Lance", role: "Ranged-to-Melee Momentum Transition" },
    { code: "U-I-I", name: "Perpetual Siege Harpoon", short: "Siege Harpoon", role: "Continuous Heavy Armor Piercing & Boss Eradication" },

    { code: "L-U-U", name: "Converging Crossfire Nexus", short: "Crossfire Nexus", role: "Inescapable Encirclement & Multi-Angle Annihilation" },
    { code: "L-U-L", name: "Intercepting Flak Perimeter", short: "Flak Perimeter", role: "Anti-Air Defense & Salvo Deflection" },
    { code: "L-U-H", name: "Field-Drawing Martial Conduit", short: "Martial Conduit", role: "Kinetic Siphoning & Close-Quarters Dominance" },
    { code: "L-U-I", name: "Tactical Trap Minefield", short: "Trap Minefield", role: "Perimeter Defense & Ambush Denial" },
    { code: "L-L-U", name: "Focused Horizon Catapult", short: "Horizon Catapult", role: "Environmental Compression & Catastrophic Forward Release" },
    { code: "L-L-L", name: "Calamity Domain Horizon", short: "Calamity Horizon", role: "Battlefield-Wide Planar Restructuring & Army Neutralization" },
    { code: "L-L-H", name: "Atmospheric Bio-Cloak", short: "Atmospheric Cloak", role: "Total Environmental Camouflage & Atmospheric Shielding" },
    { code: "L-L-I", name: "Territorial Consecration Array", short: "Consecration Array", role: "Zone Sanctification & Permanent Anti-Curse Grounding" },
    { code: "L-H-U", name: "Bio-Generated Artillery Dome", short: "Artillery Dome", role: "Stationary Fortress Defense & Siege Bombardment" },
    { code: "L-H-L", name: "Somatic Resonance Horizon", short: "Resonance Horizon", role: "Territorial Area Dominance & Synchronized Blasts" },
    { code: "L-H-H", name: "Vanguard Absorption Shroud", short: "Absorption Shroud", role: "Anti-Mage Vanguard Armor & Self-Sustaining Combat" },
    { code: "L-H-I", name: "Life-Bound Fortress Ward", short: "Life-Bound Ward", role: "Unbreakable Life-Tethered Stronghold Defense" },
    { code: "L-I-U", name: "Relic-Driven Artillery Battery", short: "Relic Battery", role: "Over-the-Horizon Siege Bombardment" },
    { code: "L-I-L", name: "Monolith-Resonating Perimeter", short: "Resonating Perimeter", role: "Anti-Teleportation & Dimensional Grounding" },
    { code: "L-I-H", name: "Temple Bastion Infusion", short: "Temple Bastion", role: "Mass Army Fortification & Morale Regeneration" },
    { code: "L-I-I", name: "Eternal Citadel Barrier", short: "Citadel Barrier", role: "Permanent Capital Defense & Siege Immunity" },

    { code: "H-U-U", name: "Somatic Machine-Gun Salvo", short: "Somatic Salvo", role: "Rapid-Fire Suppressive Fire from Eyes or Breath" },
    { code: "H-U-L", name: "Lunging Shockwave Cleave", short: "Shockwave Cleave", role: "Vanguard Line-Breaking & Shield Decapitation" },
    { code: "H-U-H", name: "Kinetic Strike Overdrive", short: "Strike Overdrive", role: "Infinite Martial Combos & Machine-Gun Striking" },
    { code: "H-U-I", name: "Weapon-Branding Martial Strike", short: "Branding Strike", role: "Enemy Disarmament & Ward Neutralization" },
    { code: "H-L-U", name: "Storm-Calling Breath Battery", short: "Breath Battery", role: "Mobile Artillery Breath Attacks" },
    { code: "H-L-L", name: "Cataclysmic Dragon Avatar", short: "Dragon Avatar", role: "Sustained Frontline Conflagration" },
    { code: "H-L-H", name: "Circulatory Maelstrom Cloak", short: "Maelstrom Cloak", role: "Deflective Martial Aura & Melee Superiority" },
    { code: "H-L-I", name: "Blood-Bound Monument Nexus", short: "Blood Monument", role: "Instant Field Base Creation at Vitality Cost" },
    { code: "H-H-U", name: "Bio-Ballistic Rail-Cannon", short: "Bio-Rail Cannon", role: "Point-Blank Heavy Sniper Discharge" },
    { code: "H-H-L", name: "Erupting Somatic Shockwave", short: "Erupting Shockwave", role: "Emergency Crowd Repulsion & Planar Clearing" },
    { code: "H-H-H", name: "Transcendent God-Form Stance", short: "God-Form Avatar", role: "Ultimate Martial Transmutation & Physical Dominance" },
    { code: "H-H-I", name: "Self-Petrifying Immortal Aegis", short: "Immortal Aegis", role: "Permanent Physical Invulnerability" },
    { code: "H-I-U", name: "Armament Discharge Array", short: "Armament Discharge", role: "Sword-Beam Projection & Mid-Range Melee Artillery" },
    { code: "H-I-L", name: "Relic-Amplified Martial Domain", short: "Martial Domain", role: "Ground-Shattering Cleaves & Crowd Control" },
    { code: "H-I-H", name: "Relic-Symbiote Exoskeleton", short: "Symbiote Exoskeleton", role: "Living Armor Synergy & Extended Combat Endurance" },
    { code: "H-I-I", name: "Living Relic Crucible", short: "Living Crucible", role: "Permanent Magical Nexus Grounding" },

    { code: "I-U-U", name: "Automated Defense Turret", short: "Defense Turret", role: "Perimeter Security & Automated Sentry Fire" },
    { code: "I-U-L", name: "Seismic Mine Inscription", short: "Seismic Mine", role: "Area Denial & Ambush Traps" },
    { code: "I-U-H", name: "Relic-Triggered Bio-Overdrive", short: "Bio-Overdrive", role: "Allied Support & Defensive Waypoints" },
    { code: "I-U-I", name: "Relic-Reflecting Relay Network", short: "Relay Network", role: "Perimeter Laser Cages & Total Containment" },
    { code: "I-L-U", name: "Ancient Siege Crucible", short: "Siege Crucible", role: "Long-Range Planetary Orbital Strikes" },
    { code: "I-L-L", name: "Eternal Elemental Geyser", short: "Elemental Geyser", role: "Industrial Arcane Power Generation" },
    { code: "I-L-H", name: "Fountain of Rejuvenation", short: "Rejuvenation Font", role: "Mass Battlefield Healing & Curse Cleansing" },
    { code: "I-L-I", name: "Self-Reinforcing Ley-Pylon", short: "Ley-Pylon", role: "Self-Healing Defensive Fortifications" },
    { code: "I-H-U", name: "Relic-Guided Living Javelin", short: "Living Javelin", role: "Unmissable Kinetic Javelin Throws" },
    { code: "I-H-L", name: "Altar of the Blood Vanguard", short: "Blood Altar", role: "Mass Army Empowerment & Blood Tithe Buffs" },
    { code: "I-H-H", name: "Vessel-Transmuting Forge", short: "Transmuting Forge", role: "Permanent Biological Enhancement & Initiation" },
    { code: "I-H-I", name: "Soul-Bound Guardian Golem", short: "Guardian Golem", role: "Autonomous Heavy Defense Combatant" },
    { code: "I-I-U", name: "Automated Ballistic Spire", short: "Ballistic Spire", role: "Automated Air-Defense & Anti-Missile Interception" },
    { code: "I-I-L", name: "Perpetual Cataclysm Forge", short: "Cataclysm Forge", role: "Territorial Denial & Automated Environmental Warping" },
    { code: "I-I-H", name: "Sarcophagus of Ascendancy", short: "Sarcophagus", role: "Long-Term Genetic/Somatic Healing & Enhancement" },
    { code: "I-I-I", name: "Monumental Aegis Citadel", short: "Aegis Citadel", role: "Indestructible Fortress Warding & Permanent Anchoring" }
];

const PRESET_DEL_MAP = { U: "uruwak", L: "lalhwa", H: "hlakbil", I: "iwati" };

// Generate all 512 elemental permutations (8 x 8 x 8)
const ELEMENTAL_PERMUTATIONS_512 = [];
for (let i = 0; i < PRESET_ELEMENTS.length; i++) {
    for (let j = 0; j < PRESET_ELEMENTS.length; j++) {
        for (let k = 0; k < PRESET_ELEMENTS.length; k++) {
            ELEMENTAL_PERMUTATIONS_512.push([
                PRESET_ELEMENTS[i].id,
                PRESET_ELEMENTS[j].id,
                PRESET_ELEMENTS[k].id
            ]);
        }
    }
}

// -------------------------------------------------------------
// 2. PROCEDURAL 32,768 ARRAY GENERATOR & CATALOG FACTORY
// -------------------------------------------------------------
function getPresetArrayData(topCode, e1, e2, e3) {
    const top = PRESET_TOPOLOGIES.find(t => t.code === topCode) || PRESET_TOPOLOGIES[0];
    const letters = top.code.split("-");
    const delA = PRESET_DEL_MAP[letters[0]];
    const delB = PRESET_DEL_MAP[letters[1]];
    const delG = PRESET_DEL_MAP[letters[2]];

    const reaction = (typeof getTriElementalReaction === "function")
        ? getTriElementalReaction(e1, e2, e3)
        : { name: "Tri-Elemental Reaction", compoundName: "Tri-Elemental Core" };

    const id = `arr_${top.code.toLowerCase().replace(/-/g, "_")}_${e1}_${e2}_${e3}`;
    const compound = reaction.compoundName || reaction.name;
    const title = `${compound} ${top.short || top.name}`;
    const academicTitle = `${top.name} of the ${reaction.name}`;

    // Deterministic node modifiers strictly conforming to category restrictions
    const modsA = ["asym", "suruti"];
    const modsB = ["liwak", "tat"];
    const modsG = ["yinla", "dukto", "sapas"];

    const bpA = delA === "hlakbil" ? ["fists"] : ["whole_body"];
    const bpB = delB === "hlakbil" ? ["arms"] : ["whole_body"];
    const bpG = delG === "hlakbil" ? ["eyes"] : ["whole_body"];

    return {
        id: id,
        title: title,
        academicTitle: academicTitle,
        topology: top.code,
        elements: [e1, e2, e3],
        reaction: reaction.name,
        role: top.role,
        desc: reaction.desc || `A high-order ${top.name} channeling ${e1}, ${e2}, and ${e3} in closed-circuit circulation.`,
        nodes: {
            alpha: { element: e1, delivery: delA, bodyParts: bpA, modifiers: modsA },
            beta:  { element: e2, delivery: delB, bodyParts: bpB, modifiers: modsB },
            gamma: { element: e3, delivery: delG, bodyParts: bpG, modifiers: modsG }
        }
    };
}

// -------------------------------------------------------------
// 3. PAGINATED MODAL STATE & CHUNKED RENDERING (60 FPS)
// -------------------------------------------------------------
let presetModalState = {
    filteredMatches: [],
    renderedCount: 0,
    chunkSize: 40,
    selectedTopology: "ALL",
    selectedElA: "ALL",
    selectedElB: "ALL",
    selectedElG: "ALL",
    searchQuery: ""
};

function openArrayPresetsModal() {
    let modal = document.getElementById("arrayPresetsModal");
    if (!modal) {
        createArrayPresetsModal();
        modal = document.getElementById("arrayPresetsModal");
    }
    resetAndFilterPresets();
    modal.style.display = "flex";
    document.body.style.overflow = "hidden";
}

function closeArrayPresetsModal() {
    const modal = document.getElementById("arrayPresetsModal");
    if (modal) {
        modal.style.display = "none";
        document.body.style.overflow = "";
    }
}

function loadPrebuiltArray(topCode, e1, e2, e3) {
    const preset = getPresetArrayData(topCode, e1, e2, e3);
    if (!preset) return;

    if (typeof switchCompilerMode === "function") {
        switchCompilerMode("array");
    } else {
        arrayState.mode = "array";
    }

    arrayState.nodes = JSON.parse(JSON.stringify(preset.nodes));
    arrayState.activeNode = "alpha";

    if (typeof renderArrayNodeUI === "function") {
        renderArrayNodeUI();
    }
    if (typeof compileArray === "function") {
        compileArray();
    }

    closeArrayPresetsModal();

    if (typeof triggerArrayInscriptionAnimation === "function") {
        triggerArrayInscriptionAnimation();
    }
}

// -------------------------------------------------------------
// 4. FILTERING & SEARCH OVER 32,768 ARRAYS (<5ms)
// -------------------------------------------------------------
function resetAndFilterPresets() {
    const q = presetModalState.searchQuery.toLowerCase().trim();
    const selTop = presetModalState.selectedTopology;
    const selA = presetModalState.selectedElA;
    const selB = presetModalState.selectedElB;
    const selG = presetModalState.selectedElG;

    let matches = [];

    const activeTops = (selTop === "ALL")
        ? PRESET_TOPOLOGIES
        : PRESET_TOPOLOGIES.filter(t => t.code === selTop);

    const activePerms = ELEMENTAL_PERMUTATIONS_512.filter(p => {
        if (selA !== "ALL" && p[0] !== selA) return false;
        if (selB !== "ALL" && p[1] !== selB) return false;
        if (selG !== "ALL" && p[2] !== selG) return false;
        return true;
    });

    for (let t = 0; t < activeTops.length; t++) {
        const top = activeTops[t];
        for (let p = 0; p < activePerms.length; p++) {
            const perm = activePerms[p];
            if (q) {
                const rx = (typeof getTriElementalReaction === "function")
                    ? getTriElementalReaction(perm[0], perm[1], perm[2])
                    : { name: "", compoundName: "" };
                const text = `${top.code} ${top.name} ${rx.name} ${rx.compoundName} ${perm[0]} ${perm[1]} ${perm[2]}`.toLowerCase();
                if (!text.includes(q)) continue;
            }
            matches.push({ topCode: top.code, e1: perm[0], e2: perm[1], e3: perm[2] });
        }
    }

    presetModalState.filteredMatches = matches;
    presetModalState.renderedCount = 0;

    const grid = document.getElementById("presetsGridContainer");
    if (grid) {
        grid.innerHTML = "";
    }

    const countEl = document.getElementById("presetMatchCounter");
    if (countEl) {
        countEl.textContent = `${matches.length.toLocaleString()} Arrays Matched`;
    }

    renderNextPresetChunk();
}

function renderNextPresetChunk() {
    const grid = document.getElementById("presetsGridContainer");
    if (!grid) return;

    const { filteredMatches, renderedCount, chunkSize } = presetModalState;
    const nextLimit = Math.min(renderedCount + chunkSize, filteredMatches.length);

    if (filteredMatches.length === 0) {
        grid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 48px 20px; color: #64748b;">
                <p style="font-size: 1.15rem; margin-bottom: 6px; color: #94a3b8;">No matching magic arrays found</p>
                <p style="font-size: 0.82rem;">Try clearing specific elemental filters or searching for different keywords.</p>
            </div>
        `;
        return;
    }

    const themeColors = {
        sfalhoy: "#f97316", hanhum: "#38bdf8", falga: "#f59e0b", jalfinn: "#34d399",
        iklad: "#facc15", erlaaw: "#fef08a", worulim: "#c084fc", amin: "#e879f9"
    };

    let fragment = document.createDocumentFragment();

    for (let i = renderedCount; i < nextLimit; i++) {
        const item = filteredMatches[i];
        const data = getPresetArrayData(item.topCode, item.e1, item.e2, item.e3);

        const card = document.createElement("div");
        card.style.cssText = `
            background: #0e131f;
            border: 1px solid #1e293b;
            border-radius: 8px;
            padding: 14px;
            cursor: pointer;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            gap: 8px;
            transition: all 0.18s ease;
        `;

        card.onmouseover = () => {
            card.style.borderColor = '#38bdf8';
            card.style.transform = 'translateY(-2px)';
            card.style.boxShadow = '0 8px 20px rgba(0,0,0,0.6)';
        };
        card.onmouseout = () => {
            card.style.borderColor = '#1e293b';
            card.style.transform = 'none';
            card.style.boxShadow = 'none';
        };
        card.onclick = () => loadPrebuiltArray(item.topCode, item.e1, item.e2, item.e3);

        const elementPills = data.elements.map(elId => {
            const col = themeColors[elId] || "#94a3b8";
            return `<span style="font-size: 0.68rem; font-weight: 700; padding: 2px 6px; border-radius: 4px; background: rgba(255,255,255,0.06); border: 1px solid ${col}; color: ${col}; text-transform: capitalize;">${elId}</span>`;
        }).join(" ");

        card.innerHTML = `
            <div>
                <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                    <span style="font-family: 'Segoe UI', sans-serif; font-size: 0.94rem; font-weight: 800; color: #f8fafc;">${data.title}</span>
                    <span style="font-family: monospace; font-size: 0.72rem; font-weight: 800; padding: 2px 6px; border-radius: 4px; background: #1e293b; color: #38bdf8; border: 1px solid #334155;">${data.topology}</span>
                </div>

                <!-- Little Grey Technical Generated Subtitle -->
                <div style="font-family: 'Segoe UI', sans-serif; font-size: 0.73rem; color: #94a3b8; font-style: italic; margin-top: 2px; margin-bottom: 8px;">
                    ${data.academicTitle}
                </div>

                <div style="display: flex; gap: 6px; margin-bottom: 8px; flex-wrap: wrap;">
                    ${elementPills}
                    <span style="font-size: 0.68rem; color: #cbd5e1; padding: 2px 6px; background: #07090e; border-radius: 4px; border: 1px solid #252b3b;">${data.reaction}</span>
                </div>

                <p style="font-size: 0.78rem; color: #cbd5e1; line-height: 1.35; margin: 0 0 6px 0;">${data.desc}</p>
            </div>

            <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid rgba(255,255,255,0.06); padding-top: 8px;">
                <span style="font-size: 0.70rem; color: #64748b; font-style: italic;">${data.role}</span>
                <span style="font-size: 0.75rem; font-weight: 700; color: #38bdf8;">Load Array &rarr;</span>
            </div>
        `;

        fragment.appendChild(card);
    }

    grid.appendChild(fragment);
    presetModalState.renderedCount = nextLimit;

    const moreBtn = document.getElementById("presetLoadMoreBtn");
    if (moreBtn) {
        if (presetModalState.renderedCount < presetModalState.filteredMatches.length) {
            moreBtn.style.display = "block";
            moreBtn.textContent = `Load More (${(presetModalState.filteredMatches.length - presetModalState.renderedCount).toLocaleString()} Remaining)`;
        } else {
            moreBtn.style.display = "none";
        }
    }
}

// -------------------------------------------------------------
// 5. DYNAMIC MODAL DOM BUILDER
// -------------------------------------------------------------
function createArrayPresetsModal() {
    const modal = document.createElement("div");
    modal.id = "arrayPresetsModal";
    modal.style.cssText = `
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(4, 6, 10, 0.88);
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        z-index: 99999;
        justify-content: center;
        align-items: center;
        padding: 20px;
        box-sizing: border-box;
    `;

    const topOptions = `<option value="ALL">All Topologies (64 Classes)</option>` +
        PRESET_TOPOLOGIES.map(t => `<option value="${t.code}">${t.code} - ${t.name}</option>`).join("");

    const elOptions = `<option value="ALL">Any Element</option>` +
        PRESET_ELEMENTS.map(e => `<option value="${e.id}">${e.label} (${e.name})</option>`).join("");

    modal.innerHTML = `
        <div style="
            position: relative;
            width: 100%;
            max-width: 1020px;
            max-height: 90vh;
            background: #090b10;
            border: 1px solid #334155;
            border-radius: 12px;
            box-shadow: 0 16px 48px rgba(0,0,0,0.8), 0 0 24px rgba(56, 189, 248, 0.15);
            display: flex;
            flex-direction: column;
            overflow: hidden;
        ">
            <!-- Modal Header -->
            <div style="
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 16px 20px;
                background: #0d111a;
                border-bottom: 1px solid #1e293b;
            ">
                <div style="display: flex; align-items: center; gap: 10px;">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                        <line x1="8" y1="6" x2="16" y2="6"></line>
                        <line x1="8" y1="10" x2="16" y2="10"></line>
                    </svg>
                    <div>
                        <span style="font-family: 'Segoe UI', sans-serif; font-size: 1.05rem; font-weight: 800; color: #f8fafc; letter-spacing: 0.8px;">
                            MAGIC ARRAY ENCYCLOPEDIA (32,768 COMBINATIONS)
                        </span>
                        <div id="presetMatchCounter" style="font-size: 0.72rem; color: #38bdf8; font-family: monospace;">32,768 Arrays Matched</div>
                    </div>
                </div>
                <button onclick="closeArrayPresetsModal()" style="
                    background: transparent;
                    border: none;
                    color: #94a3b8;
                    font-size: 1.5rem;
                    cursor: pointer;
                    line-height: 1;
                    padding: 4px 8px;
                    border-radius: 4px;
                " onmouseover="this.style.color='#f8fafc'" onmouseout="this.style.color='#94a3b8'">&times;</button>
            </div>

            <!-- Filter Controls Bar -->
            <div style="padding: 12px 20px; background: #080a0e; border-bottom: 1px solid #1e293b; display: flex; flex-wrap: wrap; gap: 10px;">
                <input type="text" id="presetSearchInput" placeholder="Search by title, technical subtitle, reaction, elements..." style="
                    flex: 2;
                    min-width: 220px;
                    background: #0d111a;
                    border: 1px solid #334155;
                    border-radius: 6px;
                    padding: 6px 12px;
                    color: #f8fafc;
                    font-family: 'Segoe UI', sans-serif;
                    font-size: 0.82rem;
                    outline: none;
                ">
                
                <select id="presetTopologySelect" style="flex: 1; min-width: 170px; background: #0d111a; border: 1px solid #334155; border-radius: 6px; padding: 6px 10px; color: #38bdf8; font-size: 0.8rem; outline: none;">
                    ${topOptions}
                </select>

                <select id="presetElASelect" style="flex: 1; min-width: 120px; background: #0d111a; border: 1px solid #334155; border-radius: 6px; padding: 6px 10px; color: #f97316; font-size: 0.8rem; outline: none;">
                    ${elOptions}
                </select>

                <select id="presetElBSelect" style="flex: 1; min-width: 120px; background: #0d111a; border: 1px solid #334155; border-radius: 6px; padding: 6px 10px; color: #facc15; font-size: 0.8rem; outline: none;">
                    ${elOptions}
                </select>

                <select id="presetElGSelect" style="flex: 1; min-width: 120px; background: #0d111a; border: 1px solid #334155; border-radius: 6px; padding: 6px 10px; color: #f59e0b; font-size: 0.8rem; outline: none;">
                    ${elOptions}
                </select>
            </div>

            <!-- Presets Scrollable Grid -->
            <div id="presetsScrollWrapper" style="flex: 1; overflow-y: auto; padding: 16px 20px; box-sizing: border-box;">
                <div id="presetsGridContainer" style="
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
                    gap: 14px;
                    box-sizing: border-box;
                "></div>

                <div style="text-align: center; padding: 20px 0;">
                    <button id="presetLoadMoreBtn" onclick="renderNextPresetChunk()" style="
                        display: none;
                        margin: 0 auto;
                        background: #1e293b;
                        color: #38bdf8;
                        border: 1px solid #334155;
                        padding: 8px 24px;
                        border-radius: 6px;
                        font-weight: 700;
                        font-size: 0.85rem;
                        cursor: pointer;
                        transition: all 0.2s;
                    " onmouseover="this.style.background='#334155'; this.style.color='#ffffff';" onmouseout="this.style.background='#1e293b'; this.style.color='#38bdf8';">
                        Load More
                    </button>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    modal.addEventListener("click", (e) => {
        if (e.target === modal) closeArrayPresetsModal();
    });

    document.getElementById("presetSearchInput")?.addEventListener("input", (e) => {
        presetModalState.searchQuery = e.target.value;
        resetAndFilterPresets();
    });

    document.getElementById("presetTopologySelect")?.addEventListener("change", (e) => {
        presetModalState.selectedTopology = e.target.value;
        resetAndFilterPresets();
    });

    document.getElementById("presetElASelect")?.addEventListener("change", (e) => {
        presetModalState.selectedElA = e.target.value;
        resetAndFilterPresets();
    });

    document.getElementById("presetElBSelect")?.addEventListener("change", (e) => {
        presetModalState.selectedElB = e.target.value;
        resetAndFilterPresets();
    });

    document.getElementById("presetElGSelect")?.addEventListener("change", (e) => {
        presetModalState.selectedElG = e.target.value;
        resetAndFilterPresets();
    });

    document.getElementById("presetsScrollWrapper")?.addEventListener("scroll", (e) => {
        const el = e.target;
        if (el.scrollHeight - el.scrollTop - el.clientHeight < 200) {
            if (presetModalState.renderedCount < presetModalState.filteredMatches.length) {
                renderNextPresetChunk();
            }
        }
    });
}

// -------------------------------------------------------------
// 6. FLOATING BOOK SYMBOL BUTTON INJECTOR (NO TEXT LABEL)
// -------------------------------------------------------------
function mountArrayBookButton() {
    if (document.getElementById("arrayPresetBookBtn")) return;

    const bookBtn = document.createElement("button");
    bookBtn.id = "arrayPresetBookBtn";
    bookBtn.setAttribute("title", "Open 32,768 Magic Array Archive");
    bookBtn.setAttribute("aria-label", "Pre-Built Array Archive");
    bookBtn.style.cssText = `
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 38px;
        height: 38px;
        padding: 0;
        background: #090b10;
        border: 1.5px solid #38bdf8;
        border-radius: 8px;
        color: #38bdf8;
        cursor: pointer;
        box-shadow: 0 4px 14px rgba(0, 0, 0, 0.6), 0 0 10px rgba(56, 189, 248, 0.25);
        transition: all 0.22s ease-in-out;
        box-sizing: border-box;
    `;

    bookBtn.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="pointer-events: none;">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
            <line x1="9" y1="7" x2="15" y2="7"></line>
            <line x1="9" y1="11" x2="15" y2="11"></line>
            <circle cx="12" cy="15" r="1" fill="currentColor"></circle>
        </svg>
    `;

    bookBtn.onmouseover = () => {
        bookBtn.style.transform = "scale(1.08)";
        bookBtn.style.borderColor = "#ffffff";
        bookBtn.style.color = "#ffffff";
        bookBtn.style.boxShadow = "0 6px 20px rgba(56, 189, 248, 0.45)";
    };

    bookBtn.onmouseout = () => {
        bookBtn.style.transform = "scale(1.0)";
        bookBtn.style.borderColor = "#38bdf8";
        bookBtn.style.color = "#38bdf8";
        bookBtn.style.boxShadow = "0 4px 14px rgba(0, 0, 0, 0.6), 0 0 10px rgba(56, 189, 248, 0.25)";
    };

    bookBtn.onclick = () => openArrayPresetsModal();

    const nodeNav = document.getElementById("arrayNodeNav");
    const container = document.getElementById("spellCircleContainer");
    const controls = document.getElementById("arrayAstrolabeControls");

    if (nodeNav) {
        nodeNav.style.alignItems = "center";
        nodeNav.appendChild(bookBtn);
    } else if (controls) {
        controls.querySelector("div")?.appendChild(bookBtn);
    } else if (container && container.parentNode) {
        const wrap = document.createElement("div");
        wrap.style.cssText = "position: absolute; top: 12px; right: 12px; z-index: 100;";
        wrap.appendChild(bookBtn);
        container.style.position = "relative";
        container.appendChild(wrap);
    } else {
        bookBtn.style.position = "fixed";
        bookBtn.style.bottom = "24px";
        bookBtn.style.right = "24px";
        bookBtn.style.zIndex = "9999";
        document.body.appendChild(bookBtn);
    }
}

// -------------------------------------------------------------
// 7. INITIALIZATION HOOKS
// -------------------------------------------------------------
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mountArrayBookButton);
} else {
    mountArrayBookButton();
}

// Global window attachments
window.openArrayPresetsModal = openArrayPresetsModal;
window.closeArrayPresetsModal = closeArrayPresetsModal;
window.loadPrebuiltArray = loadPrebuiltArray;
window.renderNextPresetChunk = renderNextPresetChunk;
window.mountArrayBookButton = mountArrayBookButton;