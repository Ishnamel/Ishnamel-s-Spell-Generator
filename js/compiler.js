/* ==========================================================================
   SYNTACTIC SPELL COMPILER & ORCHESTRATION ENGINE
   ========================================================================== */

function joinNatural(list) {
    if (!list || list.length === 0) return "";
    if (list.length === 1) return list[0];
    if (list.length === 2) return `${list[0]} and ${list[1]}`;
    return `${list.slice(0, -1).join(", ")}, and ${list[list.length - 1]}`;
}

function compileSpell() {
    const elObj1 = (typeof ELEMENTS !== 'undefined' ? ELEMENTS.find(e => e.id === state.element) : null) || { id: "sfalhoy", name: "Sfalhoy", label: "Fire", stem: "Shal", desc: "thermal combustion and raging heat" };
    
    // Support secondary element even if identical to primary (for homogeneous harmonic overdrive)
    const elObj2 = (typeof ELEMENTS !== 'undefined' && state.secondaryElement) 
        ? ELEMENTS.find(e => e.id === state.secondaryElement) 
        : null;

    const delObj = (typeof DELIVERIES !== 'undefined' ? DELIVERIES.find(d => d.id === state.delivery) : null) || { id: "uruwak", name: "Uruwak", label: "Projectile", stem: "Uru", desc: "ballistic propulsion along a forward trajectory" };
    const activeMods = (state.modifiers || []).map(id => (typeof MODIFIERS !== 'undefined' ? MODIFIERS.find(m => m.id === id) : null)).filter(Boolean);
    const hasMod = (id) => activeMods.some(m => m.id === id);

    const isHybrid = !!elObj2;
    const isHarmonicResonance = isHybrid && elObj1.id === elObj2.id;
    const hybrid = (isHybrid && typeof getHybridReaction === 'function') ? getHybridReaction(elObj1.id, elObj2.id) : null;

    // ---------------------------------------------------------
    // 1. DUAL & HYBRID CHANT GENERATION
    // ---------------------------------------------------------
    let standardTokens = [];
    if (delObj.id === 'hlakbil' || delObj.id === 'ruluwar' || delObj.id === 'iwati') {
        standardTokens.push(delObj.name, elObj1.name);
        if (elObj2) standardTokens.push(elObj2.name);
    } else {
        standardTokens.push(elObj1.name);
        if (elObj2) standardTokens.push(elObj2.name);
        standardTokens.push(delObj.name);
    }
    activeMods.forEach(m => standardTokens.push(m.name));
    
    const standardChantEl = document.getElementById("standardChant");
    if (standardChantEl) standardChantEl.innerText = standardTokens.join(" ") + "!";

    let mainStem = "";
    if (isHybrid && hybrid) {
        if (delObj.id === 'hlakbil') mainStem = "Hlak-" + hybrid.stem;
        else if (delObj.id === 'ruluwar') mainStem = "Rul-" + hybrid.stem;
        else if (delObj.id === 'iwati') mainStem = "Iwat-" + hybrid.stem;
        else mainStem = hybrid.stem + " " + delObj.stem;
    } else {
        if (delObj.id === 'hlakbil') mainStem = "Hlak-" + elObj1.name;
        else if (delObj.id === 'ruluwar') mainStem = "Rul-" + elObj1.name;
        else if (delObj.id === 'iwati') mainStem = "Iwat-" + elObj1.name;
        else mainStem = elObj1.name + " " + delObj.stem;
    }

    let highChant = activeMods.length > 0
        ? `${mainStem}-${activeMods.map(m => m.stem).join("-")}!`
        : `${mainStem}!`;
        
    const highChantEl = document.getElementById("highChant");
    if (highChantEl) highChantEl.innerText = highChant;

    // ---------------------------------------------------------
    // 2. DYNAMIC COMPOUND TITLE SYNTHESIS
    // ---------------------------------------------------------
    let titlePrefix = "";
    if (hasMod('piag') && hasMod('kupos')) titlePrefix = "Overcharged Dense ";
    else if (hasMod('piag')) titlePrefix = "Greater ";
    else if (hasMod('kupos')) titlePrefix = "Condensed ";
    else if (hasMod('asanu')) titlePrefix = "Razor-Honed ";
    else if (hasMod('kunta')) titlePrefix = "Adamantine ";
    else if (hasMod('sapas')) titlePrefix = "Hypersonic ";
    else if (hasMod('sukap')) titlePrefix = "Tempered ";
    else if (hasMod('lawal')) titlePrefix = "Cataclysmic ";

    let descriptorTokens = [];

    // 1. Tactical (Target / Control)
    const activeTacMod = activeMods.find(m => m.cat === 'target' || m.cat === 'control');
    if (activeTacMod && typeof TACTICAL_DESCRIPTORS !== 'undefined' && TACTICAL_DESCRIPTORS[activeTacMod.id]) {
        descriptorTokens.push(TACTICAL_DESCRIPTORS[activeTacMod.id]);
    }

    // 2. Duration Descriptor
    const activeDurationMod = activeMods.find(m => m.cat === 'duration');
    if (activeDurationMod && typeof DURATION_DESCRIPTORS !== 'undefined' && DURATION_DESCRIPTORS[activeDurationMod.id]) {
        descriptorTokens.push(DURATION_DESCRIPTORS[activeDurationMod.id]);
    }

    // 3. Movement Descriptor
    const activeMovementMod = activeMods.find(m => m.cat === 'movement');
    if (activeMovementMod && typeof MOVEMENT_DESCRIPTORS !== 'undefined' && MOVEMENT_DESCRIPTORS[activeMovementMod.id]) {
        descriptorTokens.push(MOVEMENT_DESCRIPTORS[activeMovementMod.id]);
    }

    // 4. Multiply Descriptor
    const activeMultiplyMod = activeMods.find(m => m.cat === 'multiply');
    if (activeMultiplyMod && typeof MULTIPLY_DESCRIPTORS !== 'undefined' && MULTIPLY_DESCRIPTORS[activeMultiplyMod.id]) {
        descriptorTokens.push(MULTIPLY_DESCRIPTORS[activeMultiplyMod.id]);
    }

    // 5. Impact Descriptor
    const activeImpactMod = activeMods.find(m => m.cat === 'impact');
    if (activeImpactMod && typeof IMPACT_DESCRIPTORS !== 'undefined' && IMPACT_DESCRIPTORS[activeImpactMod.id]) {
        descriptorTokens.push(IMPACT_DESCRIPTORS[activeImpactMod.id]);
    }

    // Core Spell Noun Resolution
    let coreSpellName = "";

    if (delObj.id === 'hlakbil') {
        const parts = state.bodyParts || ["whole_body"];
        const activeShapeMod = activeMods.find(m => m.cat === 'shape');
        const shapeId = activeShapeMod ? activeShapeMod.id : null;

        if (parts.length === 1) {
            if (shapeId && typeof getSomaticShapeTitle === 'function') {
                coreSpellName = getSomaticShapeTitle(elObj1.id, parts[0], shapeId, hybrid);
            } else {
                if (hybrid) {
                    coreSpellName = `${hybrid.compoundName} ${(typeof HLAKBIL_ANATOMY_BASE !== 'undefined' && HLAKBIL_ANATOMY_BASE[elObj1.id]) ? HLAKBIL_ANATOMY_BASE[elObj1.id][parts[0]] : 'Infusion'}`;
                } else {
                    coreSpellName = (typeof HLAKBIL_ANATOMY_BASE !== 'undefined' && HLAKBIL_ANATOMY_BASE[elObj1.id]) ? (HLAKBIL_ANATOMY_BASE[elObj1.id][parts[0]] || `${elObj1.label} Infusion`) : `${elObj1.label} Infusion`;
                }
            }
        } else {
            const hasFists = parts.includes('fists') || parts.includes('arms');
            const hasLegs = parts.includes('legs');
            const hasEyes = parts.includes('eyes');
            const hasThroat = parts.includes('throat');
            const hasSpine = parts.includes('spine');
            const hasTorso = parts.includes('torso');
            const hasSkin = parts.includes('skin');
            const hasWeapon = parts.includes('weapon_grip');

            let comboBase = "";
            if (parts.length >= 3) {
                comboBase = hybrid 
                    ? `${hybrid.compoundName} Somatic Frame` 
                    : ((typeof HLAKBIL_COMBO_BASE !== 'undefined' && HLAKBIL_COMBO_BASE.chassis) ? (HLAKBIL_COMBO_BASE.chassis[elObj1.id] || `${elObj1.label} Combat Frame`) : `${elObj1.label} Combat Frame`);
            } else if (hasFists && hasLegs) {
                comboBase = hybrid ? `${hybrid.adj} Martial Form` : ((typeof HLAKBIL_COMBO_BASE !== 'undefined') ? HLAKBIL_COMBO_BASE.martial[elObj1.id] : "");
            } else if (hasEyes && hasThroat) {
                comboBase = hybrid ? `${hybrid.compoundName} Sight & Breath` : ((typeof HLAKBIL_COMBO_BASE !== 'undefined') ? HLAKBIL_COMBO_BASE.sight_voice[elObj1.id] : "");
            } else if (hasEyes && hasSpine) {
                comboBase = hybrid ? `${hybrid.compoundName} Perception & Axis` : ((typeof HLAKBIL_COMBO_BASE !== 'undefined') ? HLAKBIL_COMBO_BASE.sight_spine[elObj1.id] : "");
            } else if (hasTorso && hasSpine) {
                comboBase = hybrid ? `${hybrid.compoundName} Core & Axis` : ((typeof HLAKBIL_COMBO_BASE !== 'undefined') ? HLAKBIL_COMBO_BASE.core_spine[elObj1.id] : "");
            } else if (hasSkin && hasTorso) {
                comboBase = hybrid ? `${hybrid.compoundName} Carapace & Core` : ((typeof HLAKBIL_COMBO_BASE !== 'undefined') ? HLAKBIL_COMBO_BASE.skin_core[elObj1.id] : "");
            } else if (hasWeapon) {
                const otherPart = parts.find(p => p !== 'weapon_grip');
                const otherTitle = (shapeId && typeof getSomaticShapeTitle === 'function')
                    ? getSomaticShapeTitle(elObj1.id, otherPart, shapeId, hybrid) 
                    : (hybrid ? `${hybrid.compoundName} ${HLAKBIL_ANATOMY_BASE[elObj1.id][otherPart]}` : HLAKBIL_ANATOMY_BASE[elObj1.id][otherPart]);
                comboBase = `${hybrid ? hybrid.compoundName + ' Blade' : HLAKBIL_ANATOMY_BASE[elObj1.id].weapon_grip} & ${otherTitle}`;
            } else {
                const partTitles = parts.map(p => (shapeId && typeof getSomaticShapeTitle === 'function')
                    ? getSomaticShapeTitle(elObj1.id, p, shapeId, hybrid) 
                    : (hybrid ? `${hybrid.compoundName} ${HLAKBIL_ANATOMY_BASE[elObj1.id][p]}` : HLAKBIL_ANATOMY_BASE[elObj1.id][p])
                );
                comboBase = partTitles.join(" & ");
            }

            coreSpellName = comboBase;
        }
    } else {
        const baseRootLabel = hybrid ? hybrid.compoundName : elObj1.label;
        let titleShape = baseRootLabel;

        if (hasMod('yangga')) titleShape = `${baseRootLabel} Lance`;
        else if (hasMod('taddum')) titleShape = `${baseRootLabel} Blade`;
        else if (hasMod('gilbo')) titleShape = `${baseRootLabel} Sphere`;
        else if (hasMod('yinla')) titleShape = `${baseRootLabel} Ray`;
        else if (hasMod('praba')) titleShape = `${baseRootLabel} Barrier`;
        else if (hasMod('ngisngi')) titleShape = `${baseRootLabel} Chakram`;
        else if (hasMod('apap')) titleShape = `${baseRootLabel} Cone`;
        else if (hasMod('abbay')) titleShape = `${baseRootLabel} Domain`;
        else titleShape = `${baseRootLabel} ${delObj.label}`;

        coreSpellName = titleShape;
    }

    const activeDescriptorPrefix = descriptorTokens.slice(0, 3).map(d => d.trim()).join(" ");
    const fullDescriptorChain = activeDescriptorPrefix ? activeDescriptorPrefix + " " : "";

    const spellTitleEl = document.getElementById("spellTitle");
    if (spellTitleEl) {
        spellTitleEl.innerText = `${titlePrefix}${fullDescriptorChain}${coreSpellName}`.replace(/\s+/g, ' ').trim();
    }

    // ---------------------------------------------------------
    // 3. COMBINATORIAL NARRATIVE LORE SYNTHESIS
    // ---------------------------------------------------------
    let storyParagraphs = [];
    let synergies = [];

    const isHlakbil = delObj.id === 'hlakbil';
    const activeParts = isHlakbil ? (state.bodyParts || ["whole_body"]) : [];
    const isSinglePart = isHlakbil && activeParts.length === 1;
    const primaryPart = isSinglePart ? activeParts[0] : null;

    // --- PHASE 1: MANIFESTATION & ELEMENTAL REACTION FUSION ---
    let shapeKey = 'default';
    if (hasMod('yangga')) shapeKey = 'yangga';
    else if (hasMod('taddum')) shapeKey = 'taddum';
    else if (hasMod('gilbo')) shapeKey = 'gilbo';
    else if (hasMod('yinla')) shapeKey = 'yinla';
    else if (hasMod('praba')) shapeKey = 'praba';
    else if (hasMod('ngisngi')) shapeKey = 'ngisngi';
    else if (hasMod('apap')) shapeKey = 'apap';
    else if (hasMod('abbay')) shapeKey = 'abbay';

    let elementShapeDesc = "";
    if (isHybrid && hybrid && hybrid.shapes) {
        elementShapeDesc = hybrid.shapes[shapeKey] || `a volatile bifurcation of ${hybrid.desc}`;
    } else {
        elementShapeDesc = (typeof ELEMENT_SHAPE_MANIFESTATIONS !== 'undefined' && ELEMENT_SHAPE_MANIFESTATIONS[elObj1.id] && ELEMENT_SHAPE_MANIFESTATIONS[elObj1.id][shapeKey])
            ? ELEMENT_SHAPE_MANIFESTATIONS[elObj1.id][shapeKey]
            : `a potent concentration of ${elObj1.desc}`;
    }

    let combinedElementalEssence = "";
    if (isHarmonicResonance && hybrid) {
        combinedElementalEssence = `harmonically overcharged dual conduits of ${elObj1.name}, creating ${hybrid.name} (${hybrid.desc})`;
    } else if (isHybrid && hybrid) {
        combinedElementalEssence = `interlocking dual roots of ${elObj1.name} and ${elObj2.name} into ${hybrid.name} (${hybrid.desc})`;
    } else {
        combinedElementalEssence = elObj1.desc;
    }

    let introSentence = "";

    if (isHlakbil) {
        const activePartObjs = activeParts.map(id => (typeof BODY_PARTS !== 'undefined' ? BODY_PARTS.find(bp => bp.id === id) : null)).filter(Boolean);
        const anatomyDesc = joinNatural(activePartObjs.map(bp => bp.desc));

        if (primaryPart === 'fists') {
            introSentence = `Igniting the caster's fists, knuckles, and striking palms with ${combinedElementalEssence}, the striking limbs resonate as living ${isHarmonicResonance ? 'overcharged' : 'hybrid'} weapons, manifesting ${elementShapeDesc} enveloping the hands.`;
        } else if (primaryPart === 'arms') {
            introSentence = `Plating the caster's forearms and upper limbs with ${combinedElementalEssence}, the tissue forms protective dual conduits, manifesting ${elementShapeDesc} forged directly over the bracers.`;
        } else if (primaryPart === 'legs') {
            introSentence = `Flooding the legs, calves, and soles with ${combinedElementalEssence}, kinetic momentum surges through the lower limbs, manifesting ${elementShapeDesc} across the stride and striking heels.`;
        } else if (primaryPart === 'throat') {
            introSentence = `Suffusing the vocal tract, larynx, and lungs with ${combinedElementalEssence}, the caster's respiration vibrates with fused harmonics, prepared to discharge ${elementShapeDesc} directly through spoken incantation.`;
        } else if (primaryPart === 'torso') {
            introSentence = `Forging an internal dual-reaction furnace within the chest cavity and thoracic core, ${combinedElementalEssence} circulates through the ribs, anchoring ${elementShapeDesc} over the vital center.`;
        } else if (primaryPart === 'spine') {
            introSentence = `Overclocking the spinal column and central nervous pathways with ${combinedElementalEssence}, bio-electric transmission accelerates across every vertebra, projecting ${elementShapeDesc} along the neural axis.`;
        } else if (primaryPart === 'skin') {
            introSentence = `Reinforcing the epidermal dermal layers with ${combinedElementalEssence}, the skin crystallizes into an adaptive mantle, manifesting ${elementShapeDesc} as a seamless protective carapace.`;
        } else if (primaryPart === 'eyes') {
            introSentence = `Attuning the ocular matrix, corneas, and retinas to ${combinedElementalEssence}, the gaze ignites with enhanced sensory acuity, projecting ${elementShapeDesc} along the caster's line of sight.`;
        } else if (primaryPart === 'weapon_grip') {
            introSentence = `Directing the weave into ${anatomyDesc}, the physical weapon is suffused with ${combinedElementalEssence}, coating the striking edge in ${elementShapeDesc}.`;
        } else if (primaryPart === 'whole_body') {
            introSentence = `Channeling the dual weave throughout ${anatomyDesc}, the caster's physical form is completely cloaked and reinforced with ${combinedElementalEssence}, manifesting ${elementShapeDesc} as an encompassing somatic aura.`;
        } else {
            introSentence = `Channeling the weave across ${anatomyDesc}, the caster suffuses the chosen anatomy with ${combinedElementalEssence}, causing the linked physical tissue to resonate in unison as ${elementShapeDesc}.`;
        }
    } else if (delObj.id === 'ruluwar') {
        introSentence = `Dispensing with all rigid casting frameworks, the caster externalizes raw ${combinedElementalEssence} as a living extension of their own mind, dynamically molding it into ${elementShapeDesc} governed entirely by pure intent.`;
    } else if (delObj.id === 'iwati') {
        introSentence = `Inscribing enduring runic anchors into an inanimate relic, the caster permanently weaves the dual properties of ${combinedElementalEssence} into ${elementShapeDesc}.`;
    } else if (delObj.id === 'uruwak') {
        introSentence = `Gathering at the caster's focal matrix, ${combinedElementalEssence} coalesces into ${elementShapeDesc} before launching outward along a true ballistic vector.`;
    } else if (delObj.id === 'lalhwa') {
        introSentence = `Erupting outward in a sweeping, tidal wavefront, ${combinedElementalEssence} blankets the immediate field, advancing as ${elementShapeDesc} across the entire frontline.`;
    }

    // --- PHASE 2: FLIGHT DYNAMICS, MOVEMENT & MULTIPLICATION ---
    let flightTraits = [];
    const flightModKeys = ['surut', 'blisu', 'liwak', 'kijlo'];
    flightModKeys.forEach(k => {
        if (hasMod(k) && typeof MOVEMENT_LORE_MATRIX !== 'undefined') {
            const table = MOVEMENT_LORE_MATRIX[k];
            if (table && table[elObj1.id] && table[elObj1.id][delObj.id]) {
                flightTraits.push(table[elObj1.id][delObj.id]);
            }
        }
    });

    if (isHlakbil) {
        if (primaryPart === 'legs') {
            if (hasMod('sapas')) flightTraits.push("propelling the caster forward in supersonic sprint bursts accompanied by sonic booms");
            if (hasMod('alisi')) flightTraits.push("enabling instantaneous 90-degree lateral direction snaps mid-dash without losing speed");
        } else if (primaryPart === 'fists' || primaryPart === 'arms') {
            if (hasMod('sapas')) flightTraits.push("accelerating hand strikes to supersonic velocity with piercing sonic cracks");
            if (hasMod('alisi')) flightTraits.push("flicking punch trajectories at sharp 90-degree angles around enemy guards");
            if (hasMod('suruti') && !hasMod('surut')) flightTraits.push("autonomously correcting striking vectors to home directly into target weak points");
        } else if (primaryPart === 'throat') {
            if (hasMod('sapas')) flightTraits.push("vocal shockwaves erupt at high mach speeds with zero audible delay");
            if (hasMod('alisi')) flightTraits.push("acoustic waves refract around corners to strike behind barricades");
        } else if (primaryPart === 'eyes') {
            if (hasMod('sapas')) flightTraits.push("optic signals and gaze rays discharge at relativistic speeds with zero perceived lag");
            if (hasMod('suruti') && !hasMod('surut')) flightTraits.push("the irises execute autonomous micro-saccadic tracking to maintain an unbreakable lock on the quarry");
            if (hasMod('spat')) flightTraits.push("the optic ray is actively steered mid-flight wherever the caster directs their pupils");
        } else {
            if (hasMod('sapas')) flightTraits.push("somatic kinetic output accelerates to supersonic thresholds");
            if (hasMod('suruti') && !hasMod('surut')) flightTraits.push("strikes autonomously home onto designated targets");
        }
    } else {
        if (hasMod('sapas')) flightTraits.push("accelerating instantly to supersonic speeds accompanied by a distinct sonic crack");
        if (hasMod('tunbog')) flightTraits.push("gliding forward with heavy, crushing momentum");
        if (hasMod('suruti') && !hasMod('surut')) flightTraits.push("autonomously calculating target evasion vectors to maintain a lethal homing lock");
        if (hasMod('spat')) flightTraits.push("being steered dynamically mid-transit through micro-gestures of the caster's hand");
        if (hasMod('alisi')) flightTraits.push("executing violent 90-degree vector snaps to bypass intervening barriers and cover");
        if (hasMod('morpa')) flightTraits.push("fluidly warping its geometry in mid-flight to adapt to changing terrain");
        if (hasMod('itta')) flightTraits.push("abruptly locking its inertia to hover motionless in mid-air awaiting discharge");
    }

    let multiTraits = [];
    const multiModKeys = ['tiha', 'padu', 'silpu', 'bunton'];
    multiModKeys.forEach(k => {
        if (hasMod(k) && typeof MULTIPLY_LORE_MATRIX !== 'undefined') {
            const table = MULTIPLY_LORE_MATRIX[k];
            if (table && table[elObj1.id] && table[elObj1.id][delObj.id]) {
                multiTraits.push(table[elObj1.id][delObj.id]);
            }
        }
    });

    let transitSentence = "";
    if (flightTraits.length > 0 && multiTraits.length > 0) {
        transitSentence = `In motion, the construct travels by ${joinNatural(flightTraits)}, while the weave ${joinNatural(multiTraits)}.`;
    } else if (flightTraits.length > 0) {
        transitSentence = `In motion, the manifestation moves by ${joinNatural(flightTraits)}.`;
    } else if (multiTraits.length > 0) {
        transitSentence = `During execution, the construct ${joinNatural(multiTraits)}.`;
    }

    storyParagraphs.push(`${introSentence} ${transitSentence}`.trim());

    // --- PHASE 3: TARGETING, SENSORY MODES & DURATION DYNAMICS ---
    let targetingClauses = [];
    if (isHlakbil) {
        if (hasMod('ami')) {
            if (primaryPart === 'fists' || primaryPart === 'arms' || primaryPart === 'weapon_grip') {
                targetingClauses.push("attuned to physically punch through, unravel, and shatter foreign magical shields and barriers on contact");
            } else if (primaryPart === 'eyes') {
                targetingClauses.push("calibrating the optic nerves to highlight foreign spell matrices, mana channels, and cloaked wards in plain sight");
            } else if (primaryPart === 'throat') {
                targetingClauses.push("emitting an acoustic anti-magic frequency that silences and destabilizes active foreign spell chanting");
            } else {
                targetingClauses.push("attuned to hunt down and unravel foreign mana fields");
            }
        }
        if (hasMod('giba')) targetingClauses.push("homing precisely into the vital blood flow, nervous conduits, and internal organs of living adversaries");
        if (hasMod('tigam')) targetingClauses.push("selectively bypassing organic tissue to shatter inanimate armor plates, weapons, and fortifications");
        if (hasMod('asym')) targetingClauses.push("locking undivided combat focus exclusively onto a single marked adversary");
        if (hasMod('adau')) targetingClauses.push("saturating the entire combat zone with sweeping somatic shockwaves");
        if (hasMod('genu')) targetingClauses.push("requiring direct physical striking contact to complete the arcane circuit");
        if (hasMod('shak')) targetingClauses.push("anchoring all reactive energy entirely within the caster's personal physical framework");
    } else {
        if (hasMod('shak')) targetingClauses.push("anchoring its reactive matrix directly around the caster's own physical body");
        if (hasMod('genu')) targetingClauses.push("requiring direct physical contact to complete the arcane circuit");
        if (hasMod('asym')) targetingClauses.push("locking its destructive yield exclusively onto a single designated quarry");
        if (hasMod('adau')) targetingClauses.push("saturating everything within the target perimeter indiscriminately");
        if (hasMod('tigam')) targetingClauses.push("ignoring organic tissue to selectively bind and disrupt non-living structures and gear");
        if (hasMod('giba')) targetingClauses.push("seeking out the biological warmth and bio-electric signatures of living organisms");
        if (hasMod('ami')) targetingClauses.push("attuning its frequency to hunt down, unravel, and feed upon foreign mana fields and shields");
        if (hasMod('aduy')) targetingClauses.push("manifesting instantaneously at distant remote coordinates rather than traveling from the caster");
        if (hasMod('pakut')) targetingClauses.push("firmly pinning and riveting itself into local terrain");
    }

    let durationClauses = [];
    const durModKeys = ['tat', 'tul', 'bati', 'tan', 'lit', 'talkib', 'litu'];
    durModKeys.forEach(k => {
        if (hasMod(k) && typeof DURATION_LORE_MATRIX !== 'undefined') {
            const durTable = DURATION_LORE_MATRIX[k];
            if (durTable && durTable[elObj1.id] && durTable[elObj1.id][delObj.id]) {
                durationClauses.push(durTable[elObj1.id][delObj.id]);
            }
        }
    });

    if (hasMod('talkib')) {
        synergies.push({ type: 'buff', text: 'Trap Protocol: Proximity / Trigger matrix primed.' });
    }

    if (targetingClauses.length > 0 || durationClauses.length > 0) {
        let logicText = "";
        if (targetingClauses.length > 0 && durationClauses.length > 0) {
            logicText = `The weave is ${joinNatural(targetingClauses)}, while ${joinNatural(durationClauses)}.`;
        } else if (targetingClauses.length > 0) {
            logicText = `The targeting matrix operates by ${joinNatural(targetingClauses)}.`;
        } else {
            logicText = `In terms of temporal duration, the weave is sustained by ${joinNatural(durationClauses)}.`;
        }
        storyParagraphs.push(logicText);
    }

    // --- PHASE 4: IMPACT & TERMINAL MOVEMENT DYNAMICS ---
    let impactClauses = [];
    const impactModKeys = ['bamtuk', 'tupwok', 'dukto', 'iwa', 'pittip', 'waras', 'tublag', 'tigkab'];
    impactModKeys.forEach(k => {
        if (hasMod(k) && typeof IMPACT_LORE_MATRIX !== 'undefined') {
            const table = IMPACT_LORE_MATRIX[k];
            if (table && table[elObj1.id] && table[elObj1.id][delObj.id]) {
                impactClauses.push(table[elObj1.id][delObj.id]);
            }
        }
    });

    const termMoveModKeys = ['rundo', 'yudgo', 'kitas', 'ewansi'];
    termMoveModKeys.forEach(k => {
        if (hasMod(k) && typeof MOVEMENT_LORE_MATRIX !== 'undefined') {
            const table = MOVEMENT_LORE_MATRIX[k];
            if (table && table[elObj1.id] && table[elObj1.id][delObj.id]) {
                impactClauses.push(table[elObj1.id][delObj.id]);
            }
        }
    });

    if (impactClauses.length > 0) {
        storyParagraphs.push(`Upon contact, the spell ${joinNatural(impactClauses)}.`);
    }

    // --- PHASE 5: INTENSITY, HYBRID SYNERGIES & ELEMENTAL TUNING ---
    let intensityClauses = [];
    if (hasMod('piag')) intensityClauses.push("overcharging mana circulation to maximize physical output and destructive payload");
    if (hasMod('sukap')) intensityClauses.push("throttling power output to a strictly controlled, non-lethal sparring threshold");
    if (hasMod('lawal')) intensityClauses.push("expanding the volumetric shockwave to engulf vast swathes of the frontline");

    if (hasMod('kunta')) {
        if (isHybrid && hybrid) {
            intensityClauses.push(`solidifies the ${hybrid.name} matrix into an adamantine, high-density crystalline state`);
        } else if (elObj1.id === 'falga') {
            intensityClauses.push("petrifies mineral structures into adamantine, diamond-grade crystalline bedrock");
            synergies.push({ type: 'buff', text: 'Geological Petrification: Diamond-grade density active.' });
        } else if (elObj1.id === 'hanhum') {
            intensityClauses.push("crystallizes the fluid into absolute-zero glacial ice sheets");
            synergies.push({ type: 'buff', text: 'Cryogenic Glaciation: Absolute-zero structural freeze.' });
        } else {
            intensityClauses.push("hardens the physical matrix into near-indestructible physical density");
        }
    }

    if (hasMod('kupos')) {
        if (isHybrid && hybrid) {
            intensityClauses.push(`hyper-compresses the ${hybrid.name} reaction into a super-dense state of extreme destructive yield`);
        } else if (elObj1.id === 'sfalhoy') {
            intensityClauses.push("thermal compression forces the flames into a blinding blue-white plasma state of extreme temperature");
            synergies.push({ type: 'buff', text: 'Thermal Synergism: Blue/White Plasma Compression active.' });
        } else if (elObj1.id === 'hanhum') {
            intensityClauses.push("hyper-pressurizes the fluid stream into an industrial-grade cutting jet");
            synergies.push({ type: 'buff', text: 'Hydro-Pressure Synergism: Ultra-high PSI jet stream active.' });
        } else if (elObj1.id === 'jalfinn') {
            intensityClauses.push("compresses the air currents into razor-thin vacuum shears");
            synergies.push({ type: 'buff', text: 'Barometric Shearing: Vacuum blade density active.' });
        } else {
            intensityClauses.push("hyper-compresses the magical payload into an ultra-dense mass");
        }
    }

    if (hasMod('asanu')) {
        intensityClauses.push("hones striking boundaries down to molecular-level cutting precision");
    }

    if (intensityClauses.length > 0) {
        storyParagraphs.push(`Refining the invocation further, ${joinNatural(intensityClauses)}.`);
    }

    // ---------------------------------------------------------
    // 4. HYBRID REACTION BUFFS & HAZARDS
    // ---------------------------------------------------------
    if (isHybrid && hybrid) {
        if (hybrid.synergyBuff) {
            synergies.push({ type: 'buff', text: hybrid.synergyBuff });
        }
        if (hybrid.hazardText) {
            synergies.push({ type: 'hazard', text: hybrid.hazardText });
        }
    }

    // ---------------------------------------------------------
    // 5. SOMATIC HAZARDS & INCOMPATIBILITY DETECTION MATRIX
    // ---------------------------------------------------------
    if (isHlakbil) {
        const selectedParts = activeParts;
        
        if (selectedParts.includes('eyes') && (hasMod('piag') || hasMod('kupos') || hasMod('bamtuk') || hasMod('tupwok'))) {
            if (!hasMod('kunta') && !hasMod('sukap') && !hasMod('praba')) {
                synergies.push({
                    type: 'hazard',
                    text: 'Critical Ocular Hazard (Hlakbil): Channeling high-intensity or explosive thermal/ionizing mana into the retinas without Crystalline Hardening (Kunta) or Prismatic Barrier (Praba) will cause instant retinal detachment and permanent blindness.'
                });
            }
        }

        if (selectedParts.includes('throat') && (hasMod('piag') || hasMod('kupos') || hasMod('bamtuk') || hasMod('tupwok'))) {
            if (!hasMod('kunta') && !hasMod('sukap')) {
                synergies.push({
                    type: 'hazard',
                    text: 'Critical Vocal Hazard (Hlakbil): Discharging high-pressure explosive mana through the larynx without Hardening (Kunta) will cause complete vocal cord rupture and pulmonary hemorrhage.'
                });
            }
        }

        if (selectedParts.includes('spine') && (hasMod('piag') || hasMod('kupos') || hasMod('sapas'))) {
            if (!hasMod('kunta') && !hasMod('sukap')) {
                synergies.push({
                    type: 'hazard',
                    text: 'Neural Overload Hazard (Hlakbil): Overclocking central nervous transmission beyond safety thresholds without Adamantine Hardening (Kunta) risks permanent neural burnout and motor paralysis.'
                });
            }
        }

        if ((selectedParts.includes('fists') || selectedParts.includes('legs')) && (hasMod('piag') || hasMod('bamtuk') || hasMod('tupwok'))) {
            if (!hasMod('kunta')) {
                synergies.push({
                    type: 'hazard',
                    text: 'Skeletal Recoil Hazard (Hlakbil): Explosive physical impact without Bone Hardening (Kunta) will shatter metacarpals, wrists, and tibia bones upon impact.'
                });
            }
        }

        if (activeMods.length >= 4 || hasMod('piag') || hasMod('kupos')) {
            if (!hasMod('kunta')) {
                synergies.push({ 
                    type: 'hazard', 
                    text: 'Vessel Threshold Warning (Hlakbil): High mana compression and overcharging will cause severe structural tear in unhardened biological tissue or low-grade weapons.' 
                });
            }
        }
    }

    // Somatic Mastery Buff Synergies
    if (isHlakbil && elObj1.id === 'amin' && hasMod('ami') && (activeParts.includes('fists') || activeParts.includes('weapon_grip'))) {
        synergies.push({ type: 'buff', text: 'Spell-Shattering Strikes: Physical strikes shatter foreign magical barriers, wards, and ongoing enchantments on contact.' });
    }
    if (isHlakbil && activeParts.includes('legs') && hasMod('sapas')) {
        synergies.push({ type: 'buff', text: 'Flash-Step Locomotion: Supersonic sprint bursts grant near-instantaneous evasion.' });
    }
    if (isHlakbil && activeParts.includes('throat') && elObj1.id === 'sfalhoy' && (hasMod('apap') || hasMod('lawal'))) {
        synergies.push({ type: 'buff', text: 'Dragon Breath Inhalation: Wide-angle incendiary breath completely incinerates vanguard lines.' });
    }
    if (isHlakbil && activeParts.includes('spine') && elObj1.id === 'iklad' && hasMod('sapas')) {
        synergies.push({ type: 'buff', text: 'Superconducting Synapse Overdrive: Microsecond bio-electric reflexes active.' });
    }
    if (isHlakbil && activeParts.includes('skin') && elObj1.id === 'falga' && hasMod('kunta')) {
        synergies.push({ type: 'buff', text: 'Diamond Carapace Aegis: Renders epidermal layers impervious to conventional blades.' });
    }

    // Temporal Hazard
    if (hasMod('tat') && (hasMod('tul') || hasMod('bati'))) {
        synergies.push({
            type: 'hazard',
            text: 'Temporal Paradox: Combining Instant Discharge (Tat) with Sustain (Tul) or Persist (Bati) destabilizes the matrix duration.'
        });
    }

    // Kinetic Conflict
    if (hasMod('sapas') && hasMod('tunbog')) {
        synergies.push({
            type: 'hazard',
            text: 'Kinetic Conflict: Supersonic Acceleration (Sapas) directly opposes Deliberate Slow Velocity (Tunbog).'
        });
    }

    // Elemental Buff Synergies
    if (elObj1.id === 'iklad' && (hasMod('silpu') || hasMod('padu'))) {
        synergies.push({ type: 'buff', text: 'Ionizing Chain Reaction: Lightning arcs chain across multiple targets with zero dissipation.' });
    }
    if (elObj1.id === 'worulim' && hasMod('yudgo') && hasMod('gilbo')) {
        synergies.push({ type: 'buff', text: 'Singularity Horizon: Manifests an inescapable micro-void gravitational center.' });
    }
    if (delObj.id === 'iwati' && hasMod('bati')) {
        synergies.push({ type: 'buff', text: 'Permanent Relic Inscription: Enchantment locked into item matrix indefinitely.' });
    }

    // ---------------------------------------------------------
    // 6. RENDER OUTPUT TO DOM & RE-TRIGGER SVG CIRCLE
    // ---------------------------------------------------------
    const spellStoryEl = document.getElementById("spellStory");
    if (spellStoryEl) {
        spellStoryEl.innerHTML = storyParagraphs.map(p => `<p style="margin-bottom:0.75rem;">${p}</p>`).join("");
    }

    const synContainer = document.getElementById("synergyContainer");
    if (synContainer) {
        synContainer.innerHTML = synergies.map(s => `
            <div class="synergy-tag ${s.type === 'buff' ? 'buff' : ''}">
                <span>${s.type === 'buff' ? '⚡' : '⚠️'}</span>
                <span>${s.text}</span>
            </div>
        `).join("");
    }

    const breakdownList = document.getElementById("breakdownList");
    if (breakdownList) {
        let items = [];
        if (isHarmonicResonance && hybrid) {
            items.push(`<li><span>${hybrid.name}</span> [${hybrid.stem}]: Harmonic Dual Overcharge (${elObj1.name} × 2)</li>`);
        } else if (isHybrid && hybrid) {
            items.push(`<li><span>${hybrid.name}</span> [${hybrid.stem}]: Dual Core (${elObj1.name} + ${elObj2.name})</li>`);
        } else {
            items.push(`<li><span>${elObj1.name}</span>: Elemental Core (${elObj1.label})</li>`);
        }
        items.push(`<li><span>${delObj.name}</span>: Vector Matrix (${delObj.label})</li>`);
        activeMods.forEach(m => {
            items.push(`<li><span>${m.name}</span> [${m.stem}]: ${m.desc}</li>`);
        });
        breakdownList.innerHTML = items.join("");
    }

    if (typeof renderSpellCircle === "function") {
        renderSpellCircle();
    }
    if (typeof syncAudioWithState === "function") {
        syncAudioWithState();
    }
}

