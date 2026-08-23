/* ================= APPLICATION INITIALIZER & UI HANDLERS ================= */

let state = {
    element: "sfalhoy",
    delivery: "uruwak",
    bodyParts: ["whole_body"], // Default somatic vessel
    modifiers: [],
    activeCategory: "shape",
    grimoireTab: "archetypes",
    customSpells: []
};

function init() {
    loadCustomSpellsFromStorage();
    renderElements();
    renderDeliveries();
    renderBodyPartSelector();
    renderCategoryTabs();
    renderModifierPool();
    updatePipeline();
    updateGrimoireCounter();
}

function renderElements() {
    const container = document.getElementById("elementContainer");
    container.innerHTML = ELEMENTS.map(e => `
        <div class="opt-card ${state.element === e.id ? 'active' : ''}" onclick="setElement('${e.id}')">
            <span class="title">${e.name}</span>
            <span class="sub">${e.label}</span>
        </div>
    `).join("");
}

function renderDeliveries() {
    const container = document.getElementById("deliveryContainer");
    container.innerHTML = DELIVERIES.map(d => `
        <div class="opt-card ${state.delivery === d.id ? 'active' : ''}" onclick="setDelivery('${d.id}')">
            <span class="title">${d.name}</span>
            <span class="sub">${d.label}</span>
        </div>
    `).join("");
}

function setDelivery(id) {
    state.delivery = id;
    renderDeliveries();
    renderBodyPartSelector();
    compileSpell();
}

function renderBodyPartSelector() {
    const container = document.getElementById("bodyPartContainer");
    const section = document.getElementById("bodyPartSection");
    
    // Only display when Hlakbil (Imbue Vessel) is active
    if (state.delivery !== "hlakbil") {
        section.style.display = "none";
        return;
    }
    
    section.style.display = "block";
    container.innerHTML = BODY_PARTS.map(bp => {
        const isSelected = state.bodyParts.includes(bp.id);
        return `
            <div class="bp-chip ${isSelected ? 'active' : ''}" onclick="toggleBodyPart('${bp.id}')">
                <span class="bp-title">${bp.name}</span>
                <span class="bp-sub">${bp.label}</span>
            </div>
        `;
    }).join("");
}

function toggleBodyPart(id) {
    if (id === "whole_body") {
        // Selecting whole body clears individual parts
        state.bodyParts = ["whole_body"];
    } else {
        // Remove whole_body if selecting specific body parts
        state.bodyParts = state.bodyParts.filter(p => p !== "whole_body");
        
        if (state.bodyParts.includes(id)) {
            state.bodyParts = state.bodyParts.filter(p => p !== id);
        } else {
            state.bodyParts.push(id);
        }
        
        // If everything is deselected, fallback to whole body
        if (state.bodyParts.length === 0) {
            state.bodyParts = ["whole_body"];
        }
    }
    renderBodyPartSelector();
    compileSpell();
}

function renderCategoryTabs() {
    const container = document.getElementById("categoryTabs");
    container.innerHTML = CATEGORIES.map(c => `
        <button class="tab-btn ${state.activeCategory === c.id ? 'active' : ''}" onclick="setCategory('${c.id}')">
            ${c.name}
        </button>
    `).join("");
}

function renderModifierPool() {
    const container = document.getElementById("modifierPool");
    const filtered = MODIFIERS.filter(m => m.cat === state.activeCategory);
    container.innerHTML = filtered.map(m => `
        <div class="mod-chip" onclick="addModifier('${m.id}')">
            <strong style="color:var(--accent)">${m.name}</strong><br>
            <span style="font-size:0.7rem; color:var(--text-dim);">${m.role}</span>
        </div>
    `).join("");
}

function updatePipeline() {
    const container = document.getElementById("pipeline");
    if (state.modifiers.length === 0) {
        container.innerHTML = `<span style="color:var(--text-dim); font-size:0.8rem; font-style:italic;">Matrix is empty. Append modifiers above.</span>`;
    } else {
        container.innerHTML = state.modifiers.map((modId, index) => {
            const mod = MODIFIERS.find(m => m.id === modId);
            return `
                <div class="pipe-item">
                    <span>${mod.name} (${mod.role})</span>
                    <span class="del-btn" onclick="removeModifier(${index})">&times;</span>
                </div>
            `;
        }).join("");
    }
    compileSpell();
}

function setElement(id) {
    state.element = id;
    renderElements();
    compileSpell();
}

function setCategory(id) {
    state.activeCategory = id;
    renderCategoryTabs();
    renderModifierPool();
}

function addModifier(id) {
    state.modifiers.push(id);
    updatePipeline();
}

function removeModifier(index) {
    state.modifiers.splice(index, 1);
    updatePipeline();
}

function clearModifiers() {
    state.modifiers = [];
    updatePipeline();
}

// Start application
window.onload = init;