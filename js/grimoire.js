/* ================= GRIMOIRE MODAL & PERSISTENCE ================= */

function openGrimoireModal() {
    renderGrimoireList();
    document.getElementById("grimoireModal").classList.add("open");
}

function closeGrimoireModal() {
    document.getElementById("grimoireModal").classList.remove("open");
}

function switchGrimoireTab(tab) {
    state.grimoireTab = tab;
    document.getElementById("tabArchetypes").classList.toggle("active", tab === "archetypes");
    document.getElementById("tabCustom").classList.toggle("active", tab === "custom");
    renderGrimoireList();
}

function renderGrimoireList() {
    const container = document.getElementById("grimoireListContainer");
    const list = state.grimoireTab === "archetypes" ? ANCIENT_ARCHETYPES : state.customSpells;

    if (state.grimoireTab === "custom" && list.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                No custom spells inscribed yet.<br>Compose a spell matrix and click <strong>"Inscribe into Grimoire"</strong> to save your customized incantations!
            </div>
        `;
        return;
    }

    container.innerHTML = list.map((spell, i) => {
        const el = ELEMENTS.find(e => e.id === spell.element);
        const del = DELIVERIES.find(d => d.id === spell.delivery);
        const mods = (spell.modifiers || []).map(mId => MODIFIERS.find(m => m.id === mId)?.stem).join("-");
        
        let vesselBadge = "";
        if (spell.delivery === "hlakbil" && spell.bodyParts && spell.bodyParts.length > 0) {
            const bpLabels = spell.bodyParts.map(bpId => BODY_PARTS.find(b => b.id === bpId)?.label || bpId).join(", ");
            vesselBadge = `<span class="badge vessel-badge">📍 ${bpLabels}</span>`;
        }

        const deleteBtn = state.grimoireTab === "custom" 
            ? `<button class="del-spell-btn" onclick="deleteCustomSpell(${i})">Delete</button>` 
            : "";

        return `
            <div class="spell-card">
                <div class="card-info">
                    <h4>${spell.name}</h4>
                    <div class="card-badges">
                        <span class="badge">${el.name}</span>
                        <span class="badge">${del.name}</span>
                        ${vesselBadge}
                        <span class="badge stem">${el.stem}-${del.stem}${mods ? '-' + mods : ''}!</span>
                    </div>
                    <div class="card-desc">${spell.desc}</div>
                </div>
                <div class="card-actions">
                    <button class="load-btn" onclick='loadSpellFromData(${JSON.stringify(spell)})'>Load Matrix</button>
                    ${deleteBtn}
                </div>
            </div>
        `;
    }).join("");
}

function loadSpellFromData(spell) {
    state.element = spell.element;
    state.delivery = spell.delivery;
    state.modifiers = [...(spell.modifiers || [])];
    state.bodyParts = spell.bodyParts ? [...spell.bodyParts] : ["whole_body"];
    renderElements();
    renderDeliveries();
    renderBodyPartSelector();
    updatePipeline();
    closeGrimoireModal();
}

function loadCustomSpellsFromStorage() {
    try {
        const saved = localStorage.getItem("arcane_grimoire_custom_spells");
        if (saved) {
            state.customSpells = JSON.parse(saved);
        }
    } catch (e) {
        console.error("Could not load custom spells", e);
    }
}

function saveCustomSpellsToStorage() {
    try {
        localStorage.setItem("arcane_grimoire_custom_spells", JSON.stringify(state.customSpells));
    } catch (e) {
        console.error("Could not save custom spells", e);
    }
    updateGrimoireCounter();
}

function updateGrimoireCounter() {
    const count = state.customSpells.length;
    document.getElementById("customCount").innerText = count;
    document.getElementById("tomeCounter").innerText = `${ANCIENT_ARCHETYPES.length} Archetypes + ${count} Inscribed`;
}

function openSaveModal() {
    const currentTitle = document.getElementById("spellTitle").innerText;
    const currentHighChant = document.getElementById("highChant").innerText;
    const currentStory = document.getElementById("spellStory").innerText;

    document.getElementById("saveSpellName").value = currentTitle;
    document.getElementById("saveSpellDesc").value = currentStory;
    document.getElementById("saveSpellChant").innerText = currentHighChant;

    document.getElementById("saveModal").classList.add("open");
}

function closeSaveModal() {
    document.getElementById("saveModal").classList.remove("open");
}

function confirmSaveSpell() {
    const name = document.getElementById("saveSpellName").value.trim() || "Untitled Spell";
    const desc = document.getElementById("saveSpellDesc").value.trim() || "No description recorded.";

    const newSpell = {
        name: name,
        desc: desc,
        element: state.element,
        delivery: state.delivery,
        bodyParts: state.delivery === "hlakbil" ? [...state.bodyParts] : [],
        modifiers: [...state.modifiers]
    };

    state.customSpells.unshift(newSpell);
    saveCustomSpellsToStorage();
    closeSaveModal();
    openGrimoireModal();
    switchGrimoireTab("custom");
}

function deleteCustomSpell(index) {
    if (confirm("Erase this spell formula from your Codex?")) {
        state.customSpells.splice(index, 1);
        saveCustomSpellsToStorage();
        renderGrimoireList();
    }
}

// Close Modals on backdrop click
window.onclick = function(event) {
    const grimoire = document.getElementById("grimoireModal");
    const save = document.getElementById("saveModal");
    if (event.target === grimoire) closeGrimoireModal();
    if (event.target === save) closeSaveModal();
};