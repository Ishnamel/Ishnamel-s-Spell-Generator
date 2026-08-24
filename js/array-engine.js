/* ==========================================================================
   MAGIC ARRAY COMPILER, STATE MANAGER & TRIQUETRA SVG ENGINE
   ========================================================================== */

let arrayState = {
    mode: "single", // "single" | "array"
    activeNode: "alpha", // "alpha" | "beta" | "gamma"
    nodes: {
        alpha: {
            element: "sfalhoy",
            delivery: "iwati",
            bodyParts: ["whole_body"],
            modifiers: ["aduy", "suruti"]
        },
        beta: {
            element: "iklad",
            delivery: "lalhwa",
            bodyParts: ["whole_body"],
            modifiers: ["liwak", "bati", "silpu"]
        },
        gamma: {
            element: "falga",
            delivery: "uruwak",
            bodyParts: ["whole_body"],
            modifiers: ["yangga", "dukto", "sapas"]
        }
    }
};

// -------------------------------------------------------------
// 1. MODE & NODE SWITCHING LOGIC
// -------------------------------------------------------------

function switchCompilerMode(mode) {
    arrayState.mode = mode;
    
    const singleTab = document.getElementById("tabModeSingle");
    const arrayTab = document.getElementById("tabModeArray");
    const nodeNav = document.getElementById("arrayNodeNav");
    const singleDualBtn = document.getElementById("dualCastToggleBtn");
    const secondarySection = document.getElementById("secondaryElementSection");

    if (mode === "array") {
        if (singleTab) singleTab.classList.remove("active");
        if (arrayTab) arrayTab.classList.add("active");
        if (nodeNav) nodeNav.style.display = "flex";
        if (singleDualBtn) singleDualBtn.style.display = "none";
        if (secondarySection) secondarySection.style.display = "none";
        
        renderArrayNodeUI();
        compileArray();
    } else {
        if (singleTab) singleTab.classList.add("active");
        if (arrayTab) arrayTab.classList.remove("active");
        if (nodeNav) nodeNav.style.display = "none";
        if (singleDualBtn) singleDualBtn.style.display = "inline-flex";
        
        if (typeof init === "function") {
            init();
        } else if (typeof compileSpell === "function") {
            compileSpell();
        }
    }
}

function setActiveArrayNode(nodeKey) {
    if (!["alpha", "beta", "gamma"].includes(nodeKey)) return;
    arrayState.activeNode = nodeKey;
    
    // Update Tab UI
    document.querySelectorAll(".array-node-tab").forEach(tab => {
        tab.classList.toggle("active", tab.dataset.node === nodeKey);
    });

    renderArrayNodeUI();
    compileArray();
}

// -------------------------------------------------------------
// 2. DYNAMIC UI RENDERING & CONSTRAINT ENFORCEMENT
// -------------------------------------------------------------

function renderArrayNodeUI() {
    const currentNodeKey = arrayState.activeNode;
    const nodeData = arrayState.nodes[currentNodeKey];
    const constraints = ARRAY_NODE_CONSTRAINTS[currentNodeKey];

    // 1. Render Elements for Active Node
    const elContainer = document.getElementById("elementContainer");
    if (elContainer && typeof ELEMENTS !== "undefined") {
        elContainer.innerHTML = ELEMENTS.map(e => `
            <div class="opt-card ${nodeData.element === e.id ? 'active' : ''}" onclick="setArrayNodeElement('${e.id}')">
                <span class="title">${e.name}</span>
                <span class="sub">${e.label}</span>
            </div>
        `).join("");
    }

    // 2. Render Deliveries for Active Node (Exempts Ruluwar)
    const delContainer = document.getElementById("deliveryContainer");
    if (delContainer) {
        delContainer.innerHTML = ARRAY_DELIVERIES.map(d => `
            <div class="opt-card ${nodeData.delivery === d.id ? 'active' : ''}" onclick="setArrayNodeDelivery('${d.id}')">
                <span class="title">${d.name}</span>
                <span class="sub">${d.label}</span>
            </div>
        `).join("");
    }

    // 3. Render Body Part Selector if Hlakbil is active
    renderArrayBodyPartSelector();

    // 4. Render Strictly Allowed Category Tabs
    const catTabs = document.getElementById("categoryTabs");
    if (catTabs && typeof CATEGORIES !== "undefined") {
        const allowed = CATEGORIES.filter(c => constraints.allowedCategories.includes(c.id));
        
        // Ensure active category is within allowed set
        if (!constraints.allowedCategories.includes(state.activeCategory)) {
            state.activeCategory = constraints.allowedCategories[0];
        }

        catTabs.innerHTML = allowed.map(c => `
            <button class="tab-btn ${state.activeCategory === c.id ? 'active' : ''}" onclick="setArrayCategory('${c.id}')">
                ${c.name}
            </button>
        `).join("");
    }

    // 5. Render Modifier Pool for active category
    renderArrayModifierPool();

    // 6. Update Active Pipeline
    updateArrayPipeline();
}

function renderArrayBodyPartSelector() {
    const container = document.getElementById("bodyPartContainer");
    const section = document.getElementById("bodyPartSection");
    const nodeData = arrayState.nodes[arrayState.activeNode];
    
    if (nodeData.delivery !== "hlakbil") {
        if (section) section.style.display = "none";
        return;
    }
    
    if (section) section.style.display = "block";
    if (container && typeof BODY_PARTS !== "undefined") {
        container.innerHTML = BODY_PARTS.map(bp => {
            const isSelected = (nodeData.bodyParts || ["whole_body"]).includes(bp.id);
            return `
                <div class="bp-chip ${isSelected ? 'active' : ''}" onclick="toggleArrayBodyPart('${bp.id}')">
                    <span class="bp-title">${bp.name}</span>
                    <span class="bp-sub">${bp.label}</span>
                </div>
            `;
        }).join("");
    }
}

function toggleArrayBodyPart(id) {
    const nodeData = arrayState.nodes[arrayState.activeNode];
    nodeData.bodyParts = nodeData.bodyParts || ["whole_body"];

    if (id === "whole_body") {
        nodeData.bodyParts = ["whole_body"];
    } else {
        nodeData.bodyParts = nodeData.bodyParts.filter(p => p !== "whole_body");
        if (nodeData.bodyParts.includes(id)) {
            nodeData.bodyParts = nodeData.bodyParts.filter(p => p !== id);
        } else {
            nodeData.bodyParts.push(id);
        }
        if (nodeData.bodyParts.length === 0) {
            nodeData.bodyParts = ["whole_body"];
        }
    }
    renderArrayBodyPartSelector();
    compileArray();
}

function renderArrayModifierPool() {
    const container = document.getElementById("modifierPool");
    if (!container || typeof MODIFIERS === "undefined") return;

    const filtered = MODIFIERS.filter(m => m.cat === state.activeCategory);
    const nodeKey = arrayState.activeNode;

    container.innerHTML = filtered.map(m => {
        const isAllowed = isModifierAllowedInNode(nodeKey, m.id);
        return `
            <div class="mod-chip ${isAllowed ? '' : 'disabled-mod'}" onclick="${isAllowed ? `addArrayModifier('${m.id}')` : ''}">
                <strong style="color:var(--accent)">${m.name}</strong><br>
                <span style="font-size:0.7rem; color:var(--text-dim);">${m.role}</span>
            </div>
        `;
    }).join("");
}

function updateArrayPipeline() {
    const container = document.getElementById("pipeline");
    if (!container) return;

    const nodeData = arrayState.nodes[arrayState.activeNode];
    const constraints = ARRAY_NODE_CONSTRAINTS[arrayState.activeNode];

    if (!nodeData.modifiers || nodeData.modifiers.length === 0) {
        container.innerHTML = `<span style="color:var(--text-dim); font-size:0.8rem; font-style:italic;">${constraints.name}: No modifiers slotted. Add from allowed categories.</span>`;
    } else {
        container.innerHTML = nodeData.modifiers.map((modId, index) => {
            const mod = (typeof MODIFIERS !== "undefined") ? MODIFIERS.find(m => m.id === modId) : { name: modId, role: "" };
            return `
                <div class="pipe-item">
                    <span>${mod.name} (${mod.role})</span>
                    <span class="del-btn" onclick="removeArrayModifier(${index})">&times;</span>
                </div>
            `;
        }).join("");
    }
}

function setArrayNodeElement(id) {
    arrayState.nodes[arrayState.activeNode].element = id;
    renderArrayNodeUI();
    compileArray();
}

function setArrayNodeDelivery(id) {
    arrayState.nodes[arrayState.activeNode].delivery = id;
    renderArrayNodeUI();
    compileArray();
}

function setArrayCategory(catId) {
    state.activeCategory = catId;
    renderArrayNodeUI();
}

function addArrayModifier(id) {
    const nodeKey = arrayState.activeNode;
    if (!isModifierAllowedInNode(nodeKey, id)) return;
    
    arrayState.nodes[nodeKey].modifiers.push(id);
    updateArrayPipeline();
    compileArray();
}

function removeArrayModifier(index) {
    arrayState.nodes[arrayState.activeNode].modifiers.splice(index, 1);
    updateArrayPipeline();
    compileArray();
}

function clearArrayModifiers() {
    arrayState.nodes[arrayState.activeNode].modifiers = [];
    updateArrayPipeline();
    compileArray();
}

// -------------------------------------------------------------
// 3. MASTER MAGIC ARRAY COMPILER & LORE SYNTHESIZER
// -------------------------------------------------------------

function compileArray() {
    if (arrayState.mode !== "array") return;

    const nA = arrayState.nodes.alpha;
    const nB = arrayState.nodes.beta;
    const nG = arrayState.nodes.gamma;

    const elA = (typeof ELEMENTS !== 'undefined' ? ELEMENTS.find(e => e.id === nA.element) : null) || { id: "sfalhoy", name: "Sfalhoy", stem: "Shal", label: "Fire" };
    const elB = (typeof ELEMENTS !== 'undefined' ? ELEMENTS.find(e => e.id === nB.element) : null) || { id: "iklad", name: "Iklad", stem: "Ikl", label: "Lightning" };
    const elG = (typeof ELEMENTS !== 'undefined' ? ELEMENTS.find(e => e.id === nG.element) : null) || { id: "falga", name: "Falga", stem: "Fal", label: "Earth" };

    const delA = (typeof ARRAY_DELIVERIES !== 'undefined' ? ARRAY_DELIVERIES.find(d => d.id === nA.delivery) : null) || { id: "iwati", name: "Iwati", stem: "Iwat", code: "I" };
    const delB = (typeof ARRAY_DELIVERIES !== 'undefined' ? ARRAY_DELIVERIES.find(d => d.id === nB.delivery) : null) || { id: "lalhwa", name: "Lalhwa", stem: "Lal", code: "L" };
    const delG = (typeof ARRAY_DELIVERIES !== 'undefined' ? ARRAY_DELIVERIES.find(d => d.id === nG.delivery) : null) || { id: "uruwak", name: "Uruwak", stem: "Uru", code: "U" };

    // 1. Resolve Deployment Class Topology & Elemental Chemistry
    const depClass = getDeploymentClass(nA.delivery, nB.delivery, nG.delivery);
    const triReaction = getTriElementalReaction(nA.element, nB.element, nG.element);

    // 2. Synthesize Academic Title
    const modsA_stems = nA.modifiers.map(id => (typeof MODIFIERS !== 'undefined' ? MODIFIERS.find(m => m.id === id)?.stem : id)).filter(Boolean).join("-");
    const modsB_stems = nB.modifiers.map(id => (typeof MODIFIERS !== 'undefined' ? MODIFIERS.find(m => m.id === id)?.stem : id)).filter(Boolean);
    const modsG_stems = nG.modifiers.map(id => (typeof MODIFIERS !== 'undefined' ? MODIFIERS.find(m => m.id === id)?.stem : id)).filter(Boolean);

    const circleA_name = `${delA.name} ${elA.name}${modsA_stems ? ' [' + modsA_stems + ']' : ''}`;
    const circleB_name = `${delB.name} ${elB.name}${modsB_stems.length ? ' [' + modsB_stems.join("-") + ']' : ''}`;
    const circleG_name = `${delG.name} ${elG.name}${modsG_stems.length ? ' [' + modsG_stems.join("-") + ']' : ''}`;

    const academicTitle = `${depClass.name} of the ${triReaction.name}`;
    const spellTitleEl = document.getElementById("spellTitle");
    if (spellTitleEl) {
        spellTitleEl.innerText = academicTitle;
    }

    // 3. Academic Full Inscription Chant
    const standardChantText = `Array [${depClass.id}]: ${circleA_name} ── ${circleB_name} ── ${circleG_name}!`;
    const standardChantEl = document.getElementById("standardChant");
    if (standardChantEl) {
        standardChantEl.innerText = standardChantText;
    }

    // 4. High Mage Tri-Chord Speedcast
    const triElStem = `${elA.stem}${elB.stem}${elG.stem}`;
    const triDelStem = `${delA.stem}${delB.stem}${delG.stem}`;
    const modChordA = modsA_stems || "A0";
    const modChordB = modsB_stems.join("") || "B0";
    const modChordG = modsG_stems.join("") || "G0";

    const highChantText = `Array-${triElStem}-${triDelStem}-${modChordA}-${modChordB}-${modChordG}!`;
    const highChantEl = document.getElementById("highChant");
    if (highChantEl) {
        highChantEl.innerText = highChantText;
    }

    // 5. Closed-Circuit 4-Phase Narrative Lore
    let storyParagraphs = [];

    // Phase 1: Genesis & Containment (Node Alpha)
    const alphaModLore = nA.modifiers.map(id => NODE_ALPHA_MODIFIERS[id]?.desc).filter(Boolean);
    const alphaContainmentText = alphaModLore.length > 0
        ? `acting to ${joinNatural(alphaModLore)}`
        : `establishing the primary containment and spatial grounding field`;
    storyParagraphs.push(
        `<strong>Phase 1 [Genesis Node α]:</strong> Anchored through <em>${delA.name} ${elA.name}</em>, the array initiates by ${alphaContainmentText}, stabilizing the ambient intake conduits and locking target coordinates.`
    );

    // Phase 2: Modulation & Kinetic Loop (Node Beta)
    const betaModLore = nB.modifiers.map(id => NODE_BETA_MODIFIERS[id]?.desc).filter(Boolean);
    const betaModulationText = betaModLore.length > 0
        ? `which ${joinNatural(betaModLore)}`
        : `which accelerates kinetic throughput and establishes temporal frequency division`;
    storyParagraphs.push(
        `<strong>Phase 2 [Modulation Node β]:</strong> Channeling into <em>${delB.name} ${elB.name}</em>, the closed circuit accelerates energy into ${depClass.name} dynamics, ${betaModulationText}.`
    );

    // Phase 3: Apex Culmination (Node Gamma)
    const gammaModLore = nG.modifiers.map(id => NODE_GAMMA_MODIFIERS[id]?.desc).filter(Boolean);
    const gammaApexText = gammaModLore.length > 0
        ? `manifesting as ${joinNatural(gammaModLore)}`
        : `releasing the terminal elemental overcharge`;
    storyParagraphs.push(
        `<strong>Phase 3 [Apex Node γ]:</strong> Reaching critical saturation in <em>${delG.name} ${elG.name}</em>, the synthesized <em>${triReaction.name}</em> detonates, ${gammaApexText}.`
    );

    // Phase 4: Closed-Loop Recirculation
    storyParagraphs.push(
        `<strong>Phase 4 [Closed-Circuit Feedback]:</strong> Residual dissipation and thermodynamic backdraft from Node γ are recaptured by Node α's intake lattice, closing the circuit loop (γ → α) and sustaining the array without energy leakage.`
    );

    const spellStoryEl = document.getElementById("spellStory");
    if (spellStoryEl) {
        spellStoryEl.innerHTML = storyParagraphs.map(p => `<p style="margin-bottom:0.7rem;">${p}</p>`).join("");
    }

    // 6. Array Synergies & Hazards
    let synergies = [];
    if (triReaction.resonanceBuff) {
        synergies.push({ type: "buff", text: triReaction.resonanceBuff });
    }
    if (triReaction.hazardWarning) {
        synergies.push({ type: "hazard", text: triReaction.hazardWarning });
    }
    synergies.push({
        type: "buff",
        text: `Tripartite Closed-Loop Synergy: Operating as a ${depClass.name} (${depClass.tacticalRole}).`
    });

    const synContainer = document.getElementById("synergyContainer");
    if (synContainer) {
        synContainer.innerHTML = synergies.map(s => `
            <div class="synergy-tag ${s.type === 'buff' ? 'buff' : ''}">
                <span>${s.type === 'buff' ? '⚡' : '⚠️'}</span>
                <span>${s.text}</span>
            </div>
        `).join("");
    }

    // 7. Modifier Breakdown List
    const breakdownList = document.getElementById("breakdownList");
    if (breakdownList) {
        let items = [];
        items.push(`<li><span>Topology</span> [${depClass.id}]: ${depClass.name}</li>`);
        items.push(`<li><span>Chemistry</span> [${triReaction.stem}]: ${triReaction.name}</li>`);
        items.push(`<li><span>Node α (Genesis)</span>: ${delA.name} ${elA.name} ── ${nA.modifiers.map(m => MODIFIERS.find(mod => mod.id === m)?.name).join(", ") || 'Unmodified'}</li>`);
        items.push(`<li><span>Node β (Modulation)</span>: ${delB.name} ${elB.name} ── ${nB.modifiers.map(m => MODIFIERS.find(mod => mod.id === m)?.name).join(", ") || 'Unmodified'}</li>`);
        items.push(`<li><span>Node γ (Apex)</span>: ${delG.name} ${elG.name} ── ${nG.modifiers.map(m => MODIFIERS.find(mod => mod.id === m)?.name).join(", ") || 'Unmodified'}</li>`);
        breakdownList.innerHTML = items.join("");
    }

    // 8. Render Triquetra SVG Canvas
    renderArrayCircleSVG();
}

// -------------------------------------------------------------
// 4. PROCEDURAL TRIQUETRA ARRAY SVG GENERATOR
// ----------------------------------------------------------

// Render Triquetra SVG Canvas via js/array-circle.js
function renderArrayCircle() {
    if (typeof renderArrayCircleSVG === "function") {
        renderArrayCircleSVG();
    }
}

// Global window attachments
window.switchCompilerMode = switchCompilerMode;
window.setActiveArrayNode = setActiveArrayNode;
window.compileArray = compileArray;
window.renderArrayNodeUI = renderArrayNodeUI;
window.renderArrayCircle = renderArrayCircle;

// Global window attachments
window.switchCompilerMode = switchCompilerMode;
window.setActiveArrayNode = setActiveArrayNode;
window.compileArray = compileArray;
window.renderArrayNodeUI = renderArrayNodeUI;