/* ==========================================================================
   MAGIC ARRAY MASTER DATA & COMBINATORIAL ENCYCLOPEDIA
   Contains Node Constraints, 64 Deployment Classes, 120 Tri-Elemental Reactions,
   and Closed-Circuit Modifier Mechanics.
   ========================================================================== */

// -------------------------------------------------------------
// 1. ARRAY DELIVERIES (Ruluwar is strictly exempted)
// -------------------------------------------------------------
const ARRAY_DELIVERIES = [
    { id: "uruwak", code: "U", name: "Uruwak", label: "Ballistic Vector", stem: "Uru", desc: "guided ballistic propulsion along an accelerated trajectory" },
    { id: "lalhwa", code: "L", name: "Lalhwa", label: "Territorial Surge", stem: "Lal", desc: "an expanding planar wave or broad field domain" },
    { id: "hlakbil", code: "H", name: "Hlakbil", label: "Somatic Vessel", stem: "Hlak", desc: "biological infusion into living neuromuscular or organ tissue" },
    { id: "iwati", code: "I", name: "Iwati", label: "Runic Anchor", stem: "Iwat", desc: "permanent structural inscription into an inanimate monolith or relic" }
];

// -------------------------------------------------------------
// 2. STRICT TRI-NODE CATEGORY CONSTRAINTS
// -------------------------------------------------------------
const ARRAY_NODE_CONSTRAINTS = {
    alpha: {
        key: "alpha",
        name: "Node α (Genesis / Anchor)",
        role: "Spatial bounds, target locking, containment, and vector intake",
        allowedCategories: ["target", "control"],
        categoryNames: ["6. Target", "7. Control"]
    },
    beta: {
        key: "beta",
        name: "Node β (Modulation / Circuit)",
        role: "Kinetic throughput, temporal oscillation, frequency division, and salvo fission",
        allowedCategories: ["movement", "duration", "multiply"],
        categoryNames: ["2. Movement", "4. Duration", "5. Multiply"]
    },
    gamma: {
        key: "gamma",
        name: "Node γ (Apex / Culmination)",
        role: "Geometric envelope, terminal impact discharge, and thermodynamic overcharge",
        allowedCategories: ["shape", "impact", "intensity"],
        categoryNames: ["1. Shape", "3. Impact", "8. Intensity"]
    }
};

// -------------------------------------------------------------
// 3. THE 64 EXHAUSTIVE TOPOLOGICAL DEPLOYMENT CLASSES (4 x 4 x 4)
// -------------------------------------------------------------
const ARRAY_DEPLOYMENT_CLASSES = {
    // === GROUP 1: HOMOGENEOUS TRIADS (4) ===
    "U-U-U": {
        id: "U-U-U",
        name: "Interlocking Orbital Battery",
        shortClass: "Orbital Battery",
        stem: "Uru-Uru-Uru",
        desc: "An autonomous constellation of ballistic projectiles circulating along synchronized orbital tracks, delivering continuous crossfire salvos.",
        tacticalRole: "Autonomous Area Denial & Sustained Long-Range Siege"
    },
    "L-L-L": {
        id: "L-L-L",
        name: "Calamity Domain Horizon",
        shortClass: "Calamity Horizon",
        stem: "Lal-Lal-Lal",
        desc: "A massive territory-wide environmental collapse array that permanently alters atmospheric and geological physics across the entire vanguard.",
        tacticalRole: "Battlefield-Wide Planar Restructuring & Army Neutralization"
    },
    "H-H-H": {
        id: "H-H-H",
        name: "Transcendent God-Form Stance",
        shortClass: "God-Form Avatar",
        stem: "Hlak-Hlak-Hlak",
        desc: "Overclocks the caster's biological frame across muscular, neural, and thoracic tiers, converting the living body into a self-sustaining elemental entity.",
        tacticalRole: "Ultimate Martial Transmutation & Autonomous Physical Dominance"
    },
    "I-I-I": {
        id: "I-I-I",
        name: "Monumental Aegis Citadel",
        shortClass: "Aegis Citadel",
        stem: "Iwat-Iwat-Iwat",
        desc: "Interlocking permanent architectural monoliths forming an unbreakable city-scale warding crucible or eternal magical forge.",
        tacticalRole: "Indestructible Fortress Warding & Permanent Arcane Anchoring"
    },

    // === GROUP 2: PROJECTILE-INITIATED MATRICES (15) ===
    "U-U-L": {
        id: "U-U-L",
        name: "Dispersing Flak Saturation Array",
        shortClass: "Flak Saturation",
        stem: "Uru-Uru-Lal",
        desc: "Precision ballistic missiles that accelerate through orbital relays before expanding into a sweeping carpet detonation.",
        tacticalRole: "Frontline Breaching & Blanket Area Saturation"
    },
    "U-U-H": {
        id: "U-U-H",
        name: "Kinetic Bio-Transfusion Vector",
        shortClass: "Bio-Transfusion Vector",
        stem: "Uru-Uru-Hlak",
        desc: "High-speed seeking mana darts that converge on a biological host, injecting kinetic momentum and elemental cloaks.",
        tacticalRole: "Remote Ally Overcharging & Instantaneous Vanguard Buffing"
    },
    "U-U-I": {
        id: "U-U-I",
        name: "Ballistic Anchor Battery",
        shortClass: "Ballistic Anchor",
        stem: "Uru-Uru-Iwat",
        desc: "Launches heavy piercing spikes that embed permanently into distant bedrock, establishing remote warding pylons.",
        tacticalRole: "Remote Territorial Inscription & Forward Base Anchoring"
    },
    "U-L-U": {
        id: "U-L-U",
        name: "Accelerated Vector Rail-Array",
        shortClass: "Vector Rail-Array",
        stem: "Uru-Lal-Uru",
        desc: "A projectile fired into an expansive planar acceleration corridor, exiting as a hyper-mach kinetic penetrator.",
        tacticalRole: "Anti-Fortification Rail-Piercing & Precision Elimination"
    },
    "U-L-L": {
        id: "U-L-L",
        name: "Breaching Shockwave Cannon",
        shortClass: "Shockwave Cannon",
        stem: "Uru-Lal-Lal",
        desc: "A concentrated ballistic seed that penetrates defensive barriers before releasing a field-wide secondary shockwave.",
        tacticalRole: "Bunker Busting & Secondary Cluster Eradication"
    },
    "U-L-H": {
        id: "U-L-H",
        name: "Somatic Vanguard Breaker",
        shortClass: "Vanguard Breaker",
        stem: "Uru-Lal-Hlak",
        desc: "Launches an expansive breach projectile that clears an environmental path for a reinforced somatic charge.",
        tacticalRole: "Shock-Troop Infiltration & Point-Blank Break-Ins"
    },
    "U-L-I": {
        id: "U-L-I",
        name: "Remote Pylon Projector",
        shortClass: "Pylon Projector",
        stem: "Uru-Lal-Iwat",
        desc: "Fires broad-area seeds across vast distances that immediately crystallize into permanent runic traps upon landing.",
        tacticalRole: "Long-Range Minefield Deployment & Zone Containment"
    },
    "U-H-U": {
        id: "U-H-U",
        name: "Bio-Kinetic Guided Rail-Lance",
        shortClass: "Bio-Rail Lance",
        stem: "Uru-Hlak-Uru",
        desc: "A ballistic core linked to the caster's optical nerves, correcting flight trajectories mid-air via neural focus.",
        tacticalRole: "Flawless Homing Elimination & High-Evasion Interception"
    },
    "U-H-L": {
        id: "U-H-L",
        name: "Somatic Rupture Ballistics",
        shortClass: "Somatic Rupture",
        stem: "Uru-Hlak-Lal",
        desc: "Fires bodily-charged kinetic darts that violently rupture into wide elemental shockwaves upon contacting target armor.",
        tacticalRole: "Localized Armor Shattering & Crowd Repulsion"
    },
    "U-H-H": {
        id: "U-H-H",
        name: "Symbiotic Piercing Avatar",
        shortClass: "Piercing Avatar",
        stem: "Uru-Hlak-Hlak",
        desc: "A piercing missile that cycles its momentum back into the caster's vessel, turning the caster into a living kinetic drill.",
        tacticalRole: "High-Velocity Martial Penetration & Rebound Striking"
    },
    "U-H-I": {
        id: "U-H-I",
        name: "Living Spike Inscription",
        shortClass: "Living Spike Inscription",
        stem: "Uru-Hlak-Iwat",
        desc: "Fires blood-infused projectile spikes that pin enemy targets to the earth, permanently branding them with binding runes.",
        tacticalRole: "High-Value Target Immobilization & Anti-Escape Sealing"
    },
    "U-I-U": {
        id: "U-I-U",
        name: "Relic-Refracted Ballistic Matrix",
        shortClass: "Relic-Refracted Matrix",
        stem: "Uru-Iwat-Uru",
        desc: "A ballistic beam fired into an ancient talisman focus, splitting into a refracted salvo of seeking laser darts.",
        tacticalRole: "Multi-Vector Interception & Prism Weaponry"
    },
    "U-I-L": {
        id: "U-I-L",
        name: "Anchor-Detonating Siege Array",
        shortClass: "Anchor-Detonating Array",
        stem: "Uru-Iwat-Lal",
        desc: "Drives an inscribed harpoon into fortifications, converting the structure into an explosive seismic epicenter.",
        tacticalRole: "Fortress Structural Demolition & Seismic Takedowns"
    },
    "U-I-H": {
        id: "U-I-H",
        name: "Relic-Transferred Striking Lance",
        shortClass: "Relic Striking Lance",
        stem: "Uru-Iwat-Hlak",
        desc: "An enchanted relic fired as a missile that channels kinetic recoil directly into empowering the caster's fists.",
        tacticalRole: "Ranged-to-Melee Momentum Transition"
    },
    "U-I-I": {
        id: "U-I-I",
        name: "Perpetual Siege Harpoon",
        shortClass: "Perpetual Harpoon",
        stem: "Uru-Iwat-Iwat",
        desc: "An inscribed missile that burrows into enemy armor and perpetually drills deeper without losing momentum.",
        tacticalRole: "Continuous Heavy Armor Piercing & Boss Eradication"
    },

    // === GROUP 3: FIELD-INITIATED MATRICES (15) ===
    "L-L-U": {
        id: "L-L-U",
        name: "Focused Horizon Catapult",
        shortClass: "Horizon Catapult",
        stem: "Lal-Lal-Uru",
        desc: "A vast atmospheric sweep that suctions ambient matter inward before launching it outward as a singular super-projectile.",
        tacticalRole: "Environmental Compression & Catastrophic Forward Release"
    },
    "L-L-H": {
        id: "L-L-H",
        name: "Atmospheric Bio-Cloak",
        shortClass: "Atmospheric Bio-Cloak",
        stem: "Lal-Lal-Hlak",
        desc: "A field-wide elemental storm that condenses around a host organism, granting elemental phase-shifting.",
        tacticalRole: "Total Environmental Camouflage & Atmospheric Shielding"
    },
    "L-L-I": {
        id: "L-L-I",
        name: "Territorial Consecration Array",
        shortClass: "Territorial Consecration",
        stem: "Lal-Lal-Iwat",
        desc: "A wide elemental surge that permanently crystallizes the ground beneath it into consecrated runic wardstone.",
        tacticalRole: "Zone Sanctification & Permanent Anti-Curse Grounding"
    },
    "L-U-L": {
        id: "L-U-L",
        name: "Intercepting Flak Perimeter",
        shortClass: "Flak Perimeter",
        stem: "Lal-Uru-Lal",
        desc: "An area-denial field that continuously tracks incoming threats and launches autonomous defensive interceptors.",
        tacticalRole: "Anti-Air Defense & Salvo Deflection"
    },
    "L-U-U": {
        id: "L-U-U",
        name: "Converging Crossfire Nexus",
        shortClass: "Crossfire Nexus",
        stem: "Lal-Uru-Uru",
        desc: "Establishes an expansive kill-zone that generates perimeter launch nodes, firing inward at trapped targets.",
        tacticalRole: "Inescapable Encirclement & Multi-Angle Annihilation"
    },
    "L-U-H": {
        id: "L-U-H",
        name: "Field-Drawing Martial Conduit",
        shortClass: "Martial Conduit",
        stem: "Lal-Uru-Hlak",
        desc: "A wide sensory field that siphons kinetic energy from moving enemies, channeling it into the caster's striking limbs.",
        tacticalRole: "Kinetic Siphoning & Close-Quarters Dominance"
    },
    "L-U-I": {
        id: "L-U-I",
        name: "Tactical Trap Minefield",
        shortClass: "Trap Minefield",
        stem: "Lal-Uru-Iwat",
        desc: "Blankets terrain with dormant runic charges that launch armor-piercing darts upon enemy intrusion.",
        tacticalRole: "Perimeter Defense & Ambush Denial"
    },
    "L-H-L": {
        id: "L-H-L",
        name: "Somatic Resonance Horizon",
        shortClass: "Resonance Horizon",
        stem: "Lal-Hlak-Lal",
        desc: "The caster acts as the living conductor for a field-wide storm that expands and contracts with their respiration.",
        tacticalRole: "Territorial Area Dominance & Cardiac Synchronized Blasts"
    },
    "L-H-U": {
        id: "L-H-U",
        name: "Bio-Generated Artillery Dome",
        shortClass: "Artillery Dome",
        stem: "Lal-Hlak-Uru",
        desc: "A defensive perimeter powered by somatic life force that continuously fires high-arching mortar salvos.",
        tacticalRole: "Stationary Fortress Defense & Siege Bombardment"
    },
    "L-H-H": {
        id: "L-H-H",
        name: "Vanguard Absorption Shroud",
        shortClass: "Absorption Shroud",
        stem: "Lal-Hlak-Hlak",
        desc: "An environmental field that absorbs hostile magic, directly repairing tissue and hardening the caster's bones.",
        tacticalRole: "Anti-Mage Vanguard Armor & Self-Sustaining Combat"
    },
    "L-H-I": {
        id: "L-H-I",
        name: "Life-Bound Fortress Ward",
        shortClass: "Life-Bound Ward",
        stem: "Lal-Hlak-Iwat",
        desc: "A vast territory-locking barrier anchored to the caster's vital conduits and reinforced by permanent boundary runes.",
        tacticalRole: "Unbreakable Life-Tethered Stronghold Defense"
    },
    "L-I-L": {
        id: "L-I-L",
        name: "Monolith-Resonating Perimeter",
        shortClass: "Resonating Perimeter",
        stem: "Lal-Iwat-Lal",
        desc: "A field stabilized by an array of inscribed stone pillars, preventing dimensional tears and spatial teleportation.",
        tacticalRole: "Anti-Teleportation & Dimensional Grounding"
    },
    "L-I-U": {
        id: "L-I-U",
        name: "Relic-Driven Artillery Battery",
        shortClass: "Relic Artillery Battery",
        stem: "Lal-Iwat-Uru",
        desc: "A wide mana font feeding ancient inscribed obelisks that rain homing missiles across miles.",
        tacticalRole: "Over-the-Horizon Siege Bombardment"
    },
    "L-I-H": {
        id: "L-I-H",
        name: "Temple Bastion Infusion",
        shortClass: "Temple Bastion",
        stem: "Lal-Iwat-Hlak",
        desc: "A consecrated temple zone that channels elemental blessings into defenders standing within its boundaries.",
        tacticalRole: "Mass Army Fortification & Morale Regeneration"
    },
    "L-I-I": {
        id: "L-I-I",
        name: "Eternal Citadel Barrier",
        shortClass: "Citadel Barrier",
        stem: "Lal-Iwat-Iwat",
        desc: "An impenetrable city-scale dome powered by interlocking subterranean runic keystones.",
        tacticalRole: "Permanent Capital Defense & Siege Immunity"
    },

    // === GROUP 4: SOMATIC-INITIATED MATRICES (15) ===
    "H-H-U": {
        id: "H-H-U",
        name: "Bio-Ballistic Rail-Cannon",
        shortClass: "Bio-Rail Cannon",
        stem: "Hlak-Hlak-Uru",
        desc: "Channels biological and neural reserves through the striking arm, firing a high-velocity piercing beam from the palms.",
        tacticalRole: "Point-Blank Heavy Sniper Discharge"
    },
    "H-H-L": {
        id: "H-H-L",
        name: "Erupting Somatic Shockwave",
        shortClass: "Erupting Shockwave",
        stem: "Hlak-Hlak-Lal",
        desc: "Overcharges the caster's circulatory core, releasing a devastating omnidirectional planar shockwave from the skin.",
        tacticalRole: "Emergency Crowd Repulsion & Planar Clearing"
    },
    "H-H-I": {
        id: "H-H-I",
        name: "Self-Petrifying Immortal Aegis",
        shortClass: "Immortal Aegis",
        stem: "Hlak-Hlak-Iwat",
        desc: "Permanently petrifies dermal and skeletal tissue into diamond-grade living adamantine.",
        tacticalRole: "Permanent Physical Invulnerability"
    },
    "H-U-H": {
        id: "H-U-H",
        name: "Kinetic Strike Overdrive",
        shortClass: "Strike Overdrive",
        stem: "Hlak-Uru-Hlak",
        desc: "Somatic punches launch air-compressed shockwave bullets that rebound back to instantly reset muscular elasticity.",
        tacticalRole: "Infinite Martial Combos & Machine-Gun Striking"
    },
    "H-U-U": {
        id: "H-U-U",
        name: "Somatic Machine-Gun Salvo",
        shortClass: "Somatic Salvo",
        stem: "Hlak-Uru-Uru",
        desc: "Overclocks vocal or ocular pathways to discharge a continuous stream of needle-thin ballistic darts.",
        tacticalRole: "Rapid-Fire Suppressive Fire from Eyes or Breath"
    },
    "H-U-L": {
        id: "H-U-L",
        name: "Lunging Shockwave Cleave",
        shortClass: "Shockwave Cleave",
        stem: "Hlak-Uru-Lal",
        desc: "A martial thrust that launches a compressed air projectile, detonating into a wide cleaving arc on contact.",
        tacticalRole: "Vanguard Line-Breaking & Shield Decapitation"
    },
    "H-U-I": {
        id: "H-U-I",
        name: "Weapon-Branding Martial Strike",
        shortClass: "Branding Strike",
        stem: "Hlak-Uru-Iwat",
        desc: "Physical punches imprint disruptive anti-magic runes directly onto enemy armor plates.",
        tacticalRole: "Enemy Disarmament & Ward Neutralization"
    },
    "H-L-H": {
        id: "H-L-H",
        name: "Circulatory Maelstrom Cloak",
        shortClass: "Maelstrom Cloak",
        stem: "Hlak-Lal-Hlak",
        desc: "Circulates an elemental cyclone through the aura, deflecting attacks and empowering counter-attacks.",
        tacticalRole: "Deflective Martial Aura & Melee Superiority"
    },
    "H-L-U": {
        id: "H-L-U",
        name: "Storm-Calling Breath Battery",
        shortClass: "Breath Battery",
        stem: "Hlak-Lal-Uru",
        desc: "Inhales ambient field mana into the lungs, exhaling it as high-arching artillery salvos.",
        tacticalRole: "Mobile Artillery Breath Attacks"
    },
    "H-L-L": {
        id: "H-L-L",
        name: "Cataclysmic Dragon Avatar",
        shortClass: "Dragon Avatar",
        stem: "Hlak-Lal-Lal",
        desc: "Converts the caster's thoracic core into a continuous elemental furnace, flooding the field with flame or frost.",
        tacticalRole: "Sustained Frontline Conflagration"
    },
    "H-L-I": {
        id: "H-L-I",
        name: "Blood-Bound Monument Nexus",
        shortClass: "Blood Monument",
        stem: "Hlak-Lal-Iwat",
        desc: "Sacrifices a portion of vitality to immediately manifest an immovable, permanent warding monument.",
        tacticalRole: "Instant Field Base Creation at Vitality Cost"
    },
    "H-I-H": {
        id: "H-I-H",
        name: "Relic-Symbiote Exoskeleton",
        shortClass: "Symbiote Exoskeleton",
        stem: "Hlak-Iwat-Hlak",
        desc: "Bonds an inscribed armament biologically to the caster's skeletal frame, granting passive armor and regeneration.",
        tacticalRole: "Living Armor Synergy & Extended Combat Endurance"
    },
    "H-I-U": {
        id: "H-I-U",
        name: "Armament Discharge Array",
        shortClass: "Armament Discharge",
        stem: "Hlak-Iwat-Uru",
        desc: "A held weapon acts as an arcane focusing prism, launching high-precision ballistic lances on swing.",
        tacticalRole: "Sword-Beam Projection & Mid-Range Melee Artillery"
    },
    "H-I-L": {
        id: "H-I-L",
        name: "Relic-Amplified Martial Domain",
        shortClass: "Martial Domain",
        stem: "Hlak-Iwat-Lal",
        desc: "Striking a held weapon against the ground triggers a massive territory-wide seismic or thermal shockwave.",
        tacticalRole: "Ground-Shattering Cleaves & Crowd Control"
    },
    "H-I-I": {
        id: "H-I-I",
        name: "Living Relic Crucible",
        shortClass: "Living Crucible",
        stem: "Hlak-Iwat-Iwat",
        desc: "The caster anchors their life force between dual ritual pillars, permanently powering an arcane forge.",
        tacticalRole: "Permanent Magical Nexus Grounding"
    },

    // === GROUP 5: INSCRIPTION/RELIC-INITIATED MATRICES (15) ===
    "I-I-U": {
        id: "I-I-U",
        name: "Automated Ballistic Spire",
        shortClass: "Ballistic Spire",
        stem: "Iwat-Iwat-Uru",
        desc: "An immovable runic obelisk that tracks and shoots down incoming aerial threats with precision beams.",
        tacticalRole: "Automated Air-Defense & Anti-Missile Interception"
    },
    "I-I-L": {
        id: "I-I-L",
        name: "Perpetual Cataclysm Forge",
        shortClass: "Cataclysm Forge",
        stem: "Iwat-Iwat-Lal",
        desc: "A master rune engine that constantly floods surrounding terrain with molten lava, miasma, or permafrost.",
        tacticalRole: "Territorial Denial & Automated Environmental Warping"
    },
    "I-I-H": {
        id: "I-I-H",
        name: "Sarcophagus of Ascendancy",
        shortClass: "Sarcophagus",
        stem: "Iwat-Iwat-Hlak",
        desc: "A sealed, inscribed chamber that reconstructs and enhances a host body resting inside.",
        tacticalRole: "Long-Term Genetic/Somatic Healing & Enhancement"
    },
    "I-U-I": {
        id: "I-U-I",
        name: "Relic-Reflecting Relay Network",
        shortClass: "Relay Network",
        stem: "Iwat-Uru-Iwat",
        desc: "Boundary stones reflecting a looping beam between each other, creating an impenetrable light cage.",
        tacticalRole: "Perimeter Laser Cages & Total Containment"
    },
    "I-U-U": {
        id: "I-U-U",
        name: "Automated Defense Turret",
        shortClass: "Defense Turret",
        stem: "Iwat-Uru-Uru",
        desc: "A runic pillar that fires seeking elemental darts at any unauthorized intruder.",
        tacticalRole: "Perimeter Security & Automated Sentry Fire"
    },
    "I-U-L": {
        id: "I-U-L",
        name: "Seismic Mine Inscription",
        shortClass: "Seismic Mine",
        stem: "Iwat-Uru-Lal",
        desc: "An inscribed ground trap that launches shrapnel darts, detonating into a wide blast when stepped on.",
        tacticalRole: "Area Denial & Ambush Traps"
    },
    "I-U-H": {
        id: "I-U-H",
        name: "Relic-Triggered Bio-Overdrive",
        shortClass: "Bio-Overdrive Trap",
        stem: "Iwat-Uru-Hlak",
        desc: "A stationary talisman that detects the presence of an ally, injecting combat stimulants and shielding.",
        tacticalRole: "Allied Support & Defensive Waypoints"
    },
    "I-L-I": {
        id: "I-L-I",
        name: "Self-Reinforcing Ley-Pylon",
        shortClass: "Ley-Pylon",
        stem: "Iwat-Lal-Iwat",
        desc: "Inscribed monoliths that draw ambient environmental mana to repair structural fractures in defensive wards.",
        tacticalRole: "Self-Healing Defensive Fortifications"
    },
    "I-L-U": {
        id: "I-L-U",
        name: "Ancient Siege Crucible",
        shortClass: "Siege Crucible",
        stem: "Iwat-Lal-Uru",
        desc: "A ritual altar that gathers ambient mana across miles, firing an orbital lance that rains down on distant targets.",
        tacticalRole: "Long-Range Planetary Orbital Strikes"
    },
    "I-L-L": {
        id: "I-L-L",
        name: "Eternal Elemental Geyser",
        shortClass: "Elemental Geyser",
        stem: "Iwat-Lal-Lal",
        desc: "A permanent floor seal that releases an uninterrupted fountain of elemental energy to power arcane constructs.",
        tacticalRole: "Industrial Arcane Power Generation"
    },
    "I-L-H": {
        id: "I-L-H",
        name: "Fountain of Rejuvenation",
        shortClass: "Rejuvenation Fountain",
        stem: "Iwat-Lal-Hlak",
        desc: "A consecrated pool whose infusions wash over wounded warriors, healing deep tissue and cleansing curses.",
        tacticalRole: "Mass Battlefield Healing & Curse Cleansing"
    },
    "I-H-I": {
        id: "I-H-I",
        name: "Soul-Bound Guardian Golem",
        shortClass: "Guardian Golem",
        stem: "Iwat-Hlak-Iwat",
        desc: "An ancient suit of inscribed plate armor animated by the biological imprint of an ancient warrior.",
        tacticalRole: "Autonomous Heavy Defense Combatant"
    },
    "I-H-U": {
        id: "I-H-U",
        name: "Relic-Guided Living Javelin",
        shortClass: "Living Javelin",
        stem: "Iwat-Hlak-Uru",
        desc: "An enchanted spear bonded with the thrower's arm, correcting flight trajectories to strike true.",
        tacticalRole: "Unmissable Kinetic Javelin Throws"
    },
    "I-H-L": {
        id: "I-H-L",
        name: "Altar of the Blood Vanguard",
        shortClass: "Blood Vanguard Altar",
        stem: "Iwat-Hlak-Lal",
        desc: "An inscribed altar that consumes blood tithes to grant an entire army elemental berserker auras.",
        tacticalRole: "Mass Army Empowerment & Blood Tithe Buffs"
    },
    "I-H-H": {
        id: "I-H-H",
        name: "Vessel-Transmuting Forge",
        shortClass: "Transmuting Forge",
        stem: "Iwat-Hlak-Hlak",
        desc: "An enchanted anvil that permanently forges raw elemental energy into the bone and sinew of an initiate.",
        tacticalRole: "Permanent Biological Enhancement & Initiation"
    }
};

// -------------------------------------------------------------
// 4. THE 120 TRI-ELEMENTAL REACTIONS (ORDER-INDEPENDENT)
// -------------------------------------------------------------
const TRI_ELEMENTAL_REACTIONS = {
    // === 8 MONOLITHIC OVERDRIVE TRIADS (E1 + E1 + E1) ===
    "sfalhoy+sfalhoy+sfalhoy": {
        name: "Thermonuclear Stellar Core",
        compoundName: "Stellar Core",
        stem: "ShalShalShal",
        desc: "An artificial stellar singularity of blue-white plasma that vaporizes matter at atomic bonds, ignoring fire resistance and melting bedrock instantly.",
        resonanceBuff: "Thermonuclear Overdrive: Thermal yield bypasses all elemental resistances; vaporizes armor on contact.",
        hazardWarning: "Thermal Meltdown: Extreme heat output risks catastrophic somatic burns without Kunta stabilization."
    },
    "hanhum+hanhum+hanhum": {
        name: "Hadal Trench Leviathan",
        compoundName: "Hadal Leviathan",
        stem: "HanHanHan",
        desc: "Compresses millions of tons of ocean-trench hydrostatic pressure into a localized zone, crushing plate armor and bone under immense gravity-like force.",
        resonanceBuff: "Hadal Compression: Applies crushing hydrostatic pressure that collapses heavy armor and barriers.",
        hazardWarning: null
    },
    "falga+falga+falga": {
        name: "Continental Adamantine Core",
        compoundName: "Adamantine Core",
        stem: "FalFalFal",
        desc: "Upheaves pure diamond-grade bedrock, nullifying kinetic momentum and locking regional tectonic plates against all movement.",
        resonanceBuff: "Continental Bedrock: Renders all defensive structures completely immune to physical and seismic breaches.",
        hazardWarning: null
    },
    "jalfinn+jalfinn+jalfinn": {
        name: "Supersonic Vacuum Singularity",
        compoundName: "Vacuum Singularity",
        stem: "JalJalJal",
        desc: "Creates a complete atmospheric void surrounded by Mach-5 slicing wind shears, suffocating targets while slicing structures at the molecular level.",
        resonanceBuff: "Vacuum Shearing: Strips away atmospheric air, increasing projectile velocity to Mach 5.",
        hazardWarning: "Hypoxia Asphyxiation: Rapid atmospheric evacuation suffocates the immediate area."
    },
    "iklad+iklad+iklad": {
        name: "Superconducting Terawatt Overdrive",
        compoundName: "Terawatt Overdrive",
        stem: "IklIklIkl",
        desc: "Discharges billions of continuous volts with zero electrical resistance, turning the entire zone into a permanent electromagnetic storm cage.",
        resonanceBuff: "Dielectric Saturation: Arcs chain continuously with zero voltage drop across all grounded targets.",
        hazardWarning: "Neuromuscular Seizure: Extreme voltage risks bio-electric feedback to the caster."
    },
    "erlaaw+erlaaw+erlaaw": {
        name: "Absolute Photonic Supernova",
        compoundName: "Photonic Supernova",
        stem: "ErlErlErl",
        desc: "Zero-dispersion coherent gamma radiation. Emits an unquenchable glare that burns retinas, illuminates all spatial dimensions, and dissolves illusions.",
        resonanceBuff: "Photonic Coherence: Emits unblockable coherent light that instantly dissolves all illusions and shadow magic.",
        hazardWarning: null
    },
    "worulim+worulim+worulim": {
        name: "Oblivion Event Horizon",
        compoundName: "Oblivion Horizon",
        stem: "WorWorWor",
        desc: "A true spatial tear of absolute null-space that irreversibly swallows light, sound, heat, and active magical spells into non-existence.",
        resonanceBuff: "Total Spatial Erasure: Permanently consumes incoming kinetic energy and enemy spellcraft.",
        hazardWarning: "Singularity Decay: Unchecked void pull will begin eroding local spacetime."
    },
    "amin+amin+amin": {
        name: "Unbound Primordial Aether-Font",
        compoundName: "Aether-Font",
        stem: "AminAminAmin",
        desc: "Unfiltered kinetic ether in its purest form, overloading and unraveling all foreign spell circles while granting inexhaustible casting throughput.",
        resonanceBuff: "Primordial Purity: Disintegrates all foreign spell circles and wards upon contact.",
        hazardWarning: null
    },

    // === 56 CATALYZED DUALS (E1 + E1 + E2) ===
    "hanhum+sfalhoy+sfalhoy": {
        name: "Supercritical Scald-Plasma",
        compoundName: "Scald-Plasma",
        stem: "ShalShalHan",
        desc: "Superheated steam expanding at explosive velocities with extreme thermal and hydraulic shock.",
        resonanceBuff: "Thermal Cavitation: Combines white-hot plasma heat with explosive steam overpressure.",
        hazardWarning: "Scald Blowback: High-pressure vapor flash risks burning the caster without Kunta."
    },
    "falga+sfalhoy+sfalhoy": {
        name: "Basaltic Caldera Magma",
        compoundName: "Caldera Magma",
        stem: "ShalShalFal",
        desc: "Viscous molten lava pools that stick to surfaces and melt through armor plate.",
        resonanceBuff: "Volcanic Slag: Leaves lingering pools of molten rock that melt through physical armor.",
        hazardWarning: null
    },
    "jalfinn+sfalhoy+sfalhoy": {
        name: "Thermobaric Convection Storm",
        compoundName: "Convection Storm",
        stem: "ShalShalJal",
        desc: "High-oxygen firestorm that rapidly consumes atmospheric air to feed an expanding inferno.",
        resonanceBuff: "Convection Spread: Firestorm expands rapidly as it feeds on atmospheric air currents.",
        hazardWarning: "Oxygen Depletion: Consumes all breathable air within the array perimeter."
    },
    "iklad+sfalhoy+sfalhoy": {
        name: "Ionized Arc-Plasma Crucible",
        compoundName: "Arc-Plasma Crucible",
        stem: "ShalShalIkl",
        desc: "Electrified plasma arcs that vaporize conductive shielding and melt structural armor.",
        resonanceBuff: "Thermo-Ionic Arc: Vaporizes conductive and metallic armor on contact.",
        hazardWarning: null
    },
    "erlaaw+sfalhoy+sfalhoy": {
        name: "Thermonuclear Solar Flare",
        compoundName: "Sunfire Flare",
        stem: "ShalShalErl",
        desc: "Blinding white-hot flash that permanently blinds and incinerates targets across the vanguard.",
        resonanceBuff: "Solar Incandescence: Blinds enemies while burning target optics.",
        hazardWarning: null
    },
    "sfalhoy+sfalhoy+worulim": {
        name: "Entropic Nether-Hellfire",
        compoundName: "Nether-Hellfire",
        stem: "ShalShalWor",
        desc: "Freezing black flame that consumes biological life force and enemy mana reserves.",
        resonanceBuff: "Void Burn: Consumes both physical matter and mana reserves directly into the void.",
        hazardWarning: null
    },
    "amin+sfalhoy+sfalhoy": {
        name: "Astral Primordial Ignition",
        compoundName: "Astral Ignition",
        stem: "ShalShalAmin",
        desc: "Overcharged mana-fueled fire that burns through magical wards and physical plate alike.",
        resonanceBuff: "Aetheric Combustion: Pure mana fuels thermal output to bypass standard elemental armor.",
        hazardWarning: null
    },

    "hanhum+hanhum+sfalhoy": {
        name: "Hydrothermal Geyser Eruption",
        compoundName: "Hydrothermal Geyser",
        stem: "HanHanShal",
        desc: "Deep-ocean pressure releasing explosive scald waves that shatter and cook enemy lines.",
        resonanceBuff: "Scald Shockwave: High-PSI boiling water delivers thermal and concussive damage.",
        hazardWarning: null
    },
    "falga+hanhum+hanhum": {
        name: "Liquefied Silt Quagmire",
        compoundName: "Silt Quagmire",
        stem: "HanHanFal",
        desc: "Dense mud currents that trap, drown, and crush targets beneath heavy sediment overburden.",
        resonanceBuff: "Hydro-Liquefaction: Turns solid earth into a drowning quagmire beneath target ranks.",
        hazardWarning: null
    },
    "hanhum+hanhum+jalfinn": {
        name: "Cryogenic Glacial Permafrost",
        compoundName: "Glacial Permafrost",
        stem: "HanHanJal",
        desc: "Instant absolute-zero freeze, crystallizing flesh into brittle ice that shatters under impact.",
        resonanceBuff: "Absolute-Zero Glaciation: Flash-freezes matter into brittle ice vulnerable to shattering.",
        hazardWarning: null
    },
    "hanhum+hanhum+iklad": {
        name: "Electrolytic Storm Surge",
        compoundName: "Electrolytic Surge",
        stem: "HanHanIkl",
        desc: "High-voltage electrical water turning the area into a lethal circuit that electrocutes everything.",
        resonanceBuff: "Electrolytic Grid: Turns flooded ground into a continuous high-voltage shock network.",
        hazardWarning: "Conduction Backfire: Electrical feedback through moisture risks self-electrocution."
    },
    "erlaaw+hanhum+hanhum": {
        name: "Refractive Photonic Mist",
        compoundName: "Photonic Mist",
        stem: "HanHanErl",
        desc: "Micro-droplet light dispersion creating blinding laser arrays that disorient and slice.",
        resonanceBuff: "Optical Dispersion: Micro-droplets split light into blinding refractive laser traps.",
        hazardWarning: null
    },
    "hanhum+hanhum+worulim": {
        name: "Hadal Abyss Mire",
        compoundName: "Hadal Mire",
        stem: "HanHanWor",
        desc: "Crushing darkness that rots and slows everything caught in its depths under extreme pressure.",
        resonanceBuff: "Hadal Weight: Sinks enemies beneath deep-sea pressure that slows movement and rots mana.",
        hazardWarning: null
    },
    "amin+hanhum+hanhum": {
        name: "Laminar Ether Deluge",
        compoundName: "Ether Deluge",
        stem: "HanHanAmin",
        desc: "Dense magical fluid that washes away and dismantles active foreign spells with ease.",
        resonanceBuff: "Laminar Mana Stream: High-density pure mana flows with frictionless momentum, shattering wards.",
        hazardWarning: null
    },

    "falga+falga+sfalhoy": {
        name: "Subterranean Volcanic Core",
        compoundName: "Volcanic Core",
        stem: "FalFalShal",
        desc: "Pressurized molten rock that erupts violently from the ground, raining lava and rock.",
        resonanceBuff: "Tectonic Eruption: Subterranean lava pressure upheaves burning stone from below.",
        hazardWarning: null
    },
    "falga+falga+hanhum": {
        name: "Petrified Alluvial Bastion",
        compoundName: "Alluvial Bastion",
        stem: "FalFalHan",
        desc: "Water-hardened clay and rock forming self-repairing stone armor impervious to blunt force.",
        resonanceBuff: "Alluvial Hardening: Self-repairing stone armor that absorbs blunt kinetic force.",
        hazardWarning: null
    },
    "falga+falga+jalfinn": {
        name: "Micro-Abrasive Sandstorm",
        compoundName: "Abrasive Sandstorm",
        stem: "FalFalJal",
        desc: "High-mach dust winds that strip flesh and metal down to bone with pulverized mineral flak.",
        resonanceBuff: "Flak Abrasion: High-mach sand winds strip armor and flesh down to bone.",
        hazardWarning: null
    },
    "falga+falga+iklad": {
        name: "Polarized Magnetic Fulgurite",
        compoundName: "Magnetic Fulgurite",
        stem: "FalFalIkl",
        desc: "Magnetized glass-stone that violently attracts and grounds metal gear, locking combatants.",
        resonanceBuff: "Magnetic Clamping: Lightning-fused stone violently attracts and clamps metallic armaments.",
        hazardWarning: null
    },
    "erlaaw+falga+falga": {
        name: "Crystalline Photolith Monolith",
        compoundName: "Photolith Monolith",
        stem: "FalFalErl",
        desc: "Diamond-hard crystal prisms that focus light into piercing lasers while deflecting strikes.",
        resonanceBuff: "Crystal Focus: Solidified hard-light quartz reflects incoming spells and focuses laser beams.",
        hazardWarning: null
    },
    "falga+falga+worulim": {
        name: "Obsidian Gravitational Singularity",
        compoundName: "Obsidian Singularity",
        stem: "FalFalWor",
        desc: "Dense black stone creating localized gravity wells that crush targets into bedrock.",
        resonanceBuff: "Tectonic Gravity Well: Heavy black stone creates localized gravitational collapses.",
        hazardWarning: null
    },
    "amin+falga+falga": {
        name: "Adamantine Runic Monolith",
        compoundName: "Runic Monolith",
        stem: "FalFalAmin",
        desc: "Mana-infused bedrock impervious to physical and magical breaches, locking terrain.",
        resonanceBuff: "Etheric Bedrock: Channels pure mana into mineral lattice for unbreakable defenses.",
        hazardWarning: null
    },

    "jalfinn+jalfinn+sfalhoy": {
        name: "Hyper-Oxygen Fire Vortex",
        compoundName: "Fire Vortex",
        stem: "JalJalShal",
        desc: "Screaming gale feeding an inescapable vortex of flame that burns at extreme temperatures.",
        resonanceBuff: "Cyclonic Conflagration: Vortex wind feeds flames, creating an inescapable fire column.",
        hazardWarning: "Suffocation Risk: Rapid combustion consumes all local oxygen."
    },
    "hanhum+jalfinn+jalfinn": {
        name: "Absolute-Zero Blizzard Tempest",
        compoundName: "Blizzard Tempest",
        stem: "JalJalHan",
        desc: "High-mach freezing winds carrying razor-sharp hail flurries that shred and freeze targets.",
        resonanceBuff: "Glacial Tempest: Freezing winds carry razor-sharp hail that shreds armor.",
        hazardWarning: null
    },
    "falga+jalfinn+jalfinn": {
        name: "Tectonic Particulate Flak",
        compoundName: "Particulate Flak",
        stem: "JalJalFal",
        desc: "High-velocity stone shrapnel shredded by screaming winds into an impenetrable storm.",
        resonanceBuff: "High-Mach Flak: Propels pulverized rock shards at supersonic penetrating speeds.",
        hazardWarning: null
    },
    "iklad+jalfinn+jalfinn": {
        name: "Ionized Hurricane Maelstrom",
        compoundName: "Hurricane Maelstrom",
        stem: "JalJalIkl",
        desc: "Atmospheric wind shears generating continuous lightning strikes that gridlock the battlefield.",
        resonanceBuff: "Dielectric Gale: Wind shears generate continuous localized lightning storms.",
        hazardWarning: null
    },
    "erlaaw+jalfinn+jalfinn": {
        name: "Photonic Solar Gale",
        compoundName: "Solar Gale",
        stem: "JalJalErl",
        desc: "Frictionless air currents guiding coherent lasers with zero loss, maximizing velocity.",
        resonanceBuff: "Zero-Loss Aerodynamics: Wind slipstreams channel light rays with zero dispersion.",
        hazardWarning: null
    },
    "jalfinn+jalfinn+worulim": {
        name: "Matter-Erasing Vacuum Rift",
        compoundName: "Vacuum Rift",
        stem: "JalJalWor",
        desc: "Total air vacuum tearing matter into void space, disintegrating physical obstacles.",
        resonanceBuff: "Atmospheric Excision: Creates howling vacuum vortexes that erase matter into null-space.",
        hazardWarning: null
    },
    "amin+jalfinn+jalfinn": {
        name: "Aero-Resonant Mana Stream",
        compoundName: "Mana Stream",
        stem: "JalJalAmin",
        desc: "Accelerates raw mana darts to hypersonic speeds, punching cleanly through heavy armor.",
        resonanceBuff: "Kinetic Velocity Amp: Accelerates raw mana darts to hypersonic velocities.",
        hazardWarning: null
    },

    "iklad+iklad+sfalhoy": {
        name: "Thermo-Electric Plasma Lance",
        compoundName: "Plasma Lance",
        stem: "IklIklShal",
        desc: "Superheated electric arcs that melt armor upon impact and shock internal systems.",
        resonanceBuff: "Plasma Ionization: Combines plasma heat with high-voltage electric discharge.",
        hazardWarning: null
    },
    "hanhum+iklad+iklad": {
        name: "Hydro-Dielectric Cascade",
        compoundName: "Hydro-Dielectric",
        stem: "IklIklHan",
        desc: "High-amperage shockwaves traveling through moisture, electrocuting all nearby enemies.",
        resonanceBuff: "Conductive Grid: High-amperage shockwaves propagate through all target moisture.",
        hazardWarning: "Conduction Backfire: Fluid saturation risks self-electrocution."
    },
    "falga+iklad+iklad": {
        name: "Ferromagnetic Grounding Grid",
        compoundName: "Grounding Grid",
        stem: "IklIklFal",
        desc: "Electrified stone network that roots and paralyzes grounded enemies with magnetic pull.",
        resonanceBuff: "Ferromagnetic Lock: Electrified stone pins metallic armor to the ground.",
        hazardWarning: null
    },
    "iklad+iklad+jalfinn": {
        name: "Dielectric Ion Tempest",
        compoundName: "Ion Tempest",
        stem: "IklIklJal",
        desc: "High-frequency electric storms that short-circuit wards and paralyze motor reflexes.",
        resonanceBuff: "Dielectric Storm: High-frequency arcs short-circuit foreign magical wards.",
        hazardWarning: null
    },
    "erlaaw+iklad+iklad": {
        name: "Coherent Radiant Arc-Laser",
        compoundName: "Radiant Arc-Laser",
        stem: "IklIklErl",
        desc: "Pre-ionized laser tracks delivering instantaneous lightning with 100% accuracy.",
        resonanceBuff: "Pre-Ionized Tracking: Laser tracks guide lightning strikes with zero latency.",
        hazardWarning: null
    },
    "iklad+iklad+worulim": {
        name: "Black Lightning Neural Rot",
        compoundName: "Neural Rot Arc",
        stem: "IklIklWor",
        desc: "Negative electricity that targets and decays nervous systems, inducing paralysis.",
        resonanceBuff: "Neural Decay: Negative dielectric arcs travel through nervous conduits, rotting synapses.",
        hazardWarning: "Neural Feedback: High voltage laced with void risks nerve damage without Kunta."
    },
    "amin+iklad+iklad": {
        name: "Unfiltered Spellbreaker Arc",
        compoundName: "Spellbreaker Arc",
        stem: "IklIklAmin",
        desc: "High-voltage mana arcs that overload and shatter enemy spell circles on contact.",
        resonanceBuff: "Dielectric Spellbreak: Pure mana lightning overloads and shatters foreign spell circles.",
        hazardWarning: null
    },

    "erlaaw+erlaaw+sfalhoy": {
        name: "Thermonuclear Sunfire Flare",
        compoundName: "Sunfire Flare",
        stem: "ErlErlShal",
        desc: "Blinding optical radiance combined with intense thermonuclear heat.",
        resonanceBuff: "Radiant Fusion: Blinding radiance and intense heat permanently blind and flash-burn targets.",
        hazardWarning: null
    },
    "erlaaw+erlaaw+hanhum": {
        name: "Refractive Prismatic Aurora",
        compoundName: "Prismatic Aurora",
        stem: "ErlErlHan",
        desc: "Water droplets splitting light into a maze of blinding, cutting laser reflections.",
        resonanceBuff: "Optical Dispersion: Micro-droplets split light into a disorienting laser array.",
        hazardWarning: null
    },
    "erlaaw+erlaaw+falga": {
        name: "Solid Hard-Light Quartz",
        compoundName: "Hard-Light Quartz",
        stem: "ErlErlFal",
        desc: "Solidified light beams forming permanent crystal barriers that deflect all attacks.",
        resonanceBuff: "Hard-Light Mineralization: Solidifies photonic beams into permanent diamond-hard quartz.",
        hazardWarning: null
    },
    "erlaaw+erlaaw+jalfinn": {
        name: "Solar Wind Slipstream",
        compoundName: "Solar Slipstream",
        stem: "ErlErlJal",
        desc: "Frictionless light rays moving without air resistance to achieve maximum speed.",
        resonanceBuff: "Zero-Dispersion: Wind slipstreams channel light rays with zero atmospheric loss.",
        hazardWarning: null
    },
    "erlaaw+erlaaw+iklad": {
        name: "Photonic Dielectric Beam",
        compoundName: "Photonic Dielectric",
        stem: "ErlErlIkl",
        desc: "Laser paths that channel high-voltage lightning strikes with perfect accuracy.",
        resonanceBuff: "Photonic Dielectric: Laser paths guide lightning with pinpoint precision.",
        hazardWarning: null
    },
    "erlaaw+erlaaw+worulim": {
        name: "Twilight Penumbra Singularity",
        compoundName: "Penumbra Singularity",
        stem: "ErlErlWor",
        desc: "Balanced light and dark creating localized reality distortions and spatial tearing.",
        resonanceBuff: "Penumbra Equilibrium: Radiance and void annihilate, creating space-rending distortions.",
        hazardWarning: "Annihilation Instability: Fusing photonics with the abyss creates intense mana recoil."
    },
    "amin+erlaaw+erlaaw": {
        name: "Sacred Astral Purifier",
        compoundName: "Astral Purifier",
        stem: "ErlErlAmin",
        desc: "Coherent celestial rays that purge curses, illusions, and dark magic instantly.",
        resonanceBuff: "Purifying Ether: Amplifies photonic coherence to instantly purge foreign curses.",
        hazardWarning: null
    },

    "sfalhoy+worulim+worulim": {
        name: "Entropic Cold Netherflame",
        compoundName: "Cold Netherflame",
        stem: "WorWorShal",
        desc: "Lightless fire that consumes both physical flesh and magical energy into the void.",
        resonanceBuff: "Void Combustion: Burns cold while consuming matter and mana into the void.",
        hazardWarning: null
    },
    "hanhum+worulim+worulim": {
        name: "Abyssal Hadal Sludge",
        compoundName: "Hadal Sludge",
        stem: "WorWorHan",
        desc: "Suffocating black mire that drowns targets and saps life force under extreme pressure.",
        resonanceBuff: "Hadal Pressure: Crushes targets beneath lightless deep-ocean gravity and cold.",
        hazardWarning: null
    },
    "falga+worulim+worulim": {
        name: "Null-Matter Obsidian Bastion",
        compoundName: "Obsidian Bastion",
        stem: "WorWorFal",
        desc: "Super-dense black rock that absorbs impact, spells, and light into non-existence.",
        resonanceBuff: "Tectonic Singularity: Hyper-dense black mineral absorbs light and pulls terrain inward.",
        hazardWarning: null
    },
    "jalfinn+worulim+worulim": {
        name: "Atmospheric Void Excision",
        compoundName: "Void Excision",
        stem: "WorWorJal",
        desc: "Vacuum vortex that pulls matter into non-existence, erasing physical cover.",
        resonanceBuff: "Atmospheric Excision: Creates howling vacuum vortexes that erase matter into null-space.",
        hazardWarning: null
    },
    "iklad+worulim+worulim": {
        name: "Negative Arc Synapse Flayer",
        compoundName: "Synapse Flayer",
        stem: "WorWorIkl",
        desc: "Black lightning that disables nervous systems and rots motor pathways.",
        resonanceBuff: "Neural Decay: Negative dielectric arcs travel through nerves, rotting motor pathways.",
        hazardWarning: "Neural Feedback: High voltage laced with void risks nerve damage without Kunta."
    },
    "erlaaw+worulim+worulim": {
        name: "Twilight Eclipse Event Horizon",
        compoundName: "Eclipse Horizon",
        stem: "WorWorErl",
        desc: "Spatial singularity balancing light and shadow, consuming reality at its focal point.",
        resonanceBuff: "Penumbra Equilibrium: Radiance and void annihilate, creating space-rending distortions.",
        hazardWarning: "Annihilation Instability: Fusing photonics with the abyss creates intense mana recoil."
    },
    "amin+worulim+worulim": {
        name: "Absolute Anti-Magic Devourer",
        compoundName: "Anti-Magic Devourer",
        stem: "WorWorAmin",
        desc: "Voracious void that eats incoming spell matrices to fuel its own destructive expansion.",
        resonanceBuff: "Total Spell Devourer: Actively consumes ambient and hostile mana to grow larger.",
        hazardWarning: null
    },

    "amin+amin+sfalhoy": {
        name: "Primordial Ether Flame",
        compoundName: "Ether Flame",
        stem: "AminAminShal",
        desc: "Overcharged mana fire that burns through elemental defenses and physical barriers.",
        resonanceBuff: "Etheric Overcharge: Raw mana fuels thermal reaction, bypassing conventional armor.",
        hazardWarning: null
    },
    "amin+amin+hanhum": {
        name: "Astral Hydro-Resonance",
        compoundName: "Hydro-Resonance",
        stem: "AminAminHan",
        desc: "Frictionless magical water that shatters foreign shields and cleanses magic.",
        resonanceBuff: "Laminar Mana Stream: High-density pure mana flows with frictionless momentum.",
        hazardWarning: null
    },
    "amin+amin+falga": {
        name: "Aetheric Adamantine Bastion",
        compoundName: "Adamantine Bastion",
        stem: "AminAminFal",
        desc: "Diamond-hard mana-infused stone fortifications impervious to physical breach.",
        resonanceBuff: "Etheric Fortification: Channels raw mana into mineral lattice for unbreakable defenses.",
        hazardWarning: null
    },
    "amin+amin+jalfinn": {
        name: "Hypersonic Aether Vortex",
        compoundName: "Aether Vortex",
        stem: "AminAminJal",
        desc: "Mach-speed mana needles with extreme penetration that drill through defenses.",
        resonanceBuff: "Kinetic Velocity Amp: Accelerates raw mana darts to hypersonic velocities.",
        hazardWarning: null
    },
    "amin+amin+iklad": {
        name: "Dielectric Mana Overload",
        compoundName: "Mana Overload",
        stem: "AminAminIkl",
        desc: "Lightning-fast mana bursts that shatter wards and short-circuit enemy circles.",
        resonanceBuff: "Dielectric Spellbreak: Pure mana lightning overloads and shatters foreign spell circles.",
        hazardWarning: null
    },
    "amin+amin+erlaaw": {
        name: "Celestial Solar Aether",
        compoundName: "Solar Aether",
        stem: "AminAminErl",
        desc: "Pure light-infused mana that burns through dark magic and dissolves illusions.",
        resonanceBuff: "Purifying Ether: Amplifies photonic coherence to instantly purge foreign curses.",
        hazardWarning: null
    },
    "amin+amin+worulim": {
        name: "Null-Ether Void Matrix",
        compoundName: "Null-Ether Matrix",
        stem: "AminAminWor",
        desc: "Polarized anti-magic mana that dissolves foreign spells and consumes magic.",
        resonanceBuff: "Total Spell Devourer: Actively consumes ambient and hostile mana to grow larger.",
        hazardWarning: null
    },

    // === 56 HETEROGENEOUS ALCHEMICAL TRIADS (E1 + E2 + E3) ===
    "falga+hanhum+sfalhoy": {
        name: "Volcanic Hydrothermal Crucible",
        compoundName: "Hydrothermal Crucible",
        stem: "ShalHanFal",
        desc: "Molten lava meets cold water, generating pressurized steam explosions and razor-sharp obsidian glass shrapnel.",
        resonanceBuff: "Hydrothermal Explosion: High-pressure steam ruptures ground into flying obsidian shrapnel.",
        hazardWarning: "Scald Hazard: Superheated vapor blowback risks burns without Kunta."
    },
    "hanhum+jalfinn+sfalhoy": {
        name: "Thermobaric Scald-Typhoon",
        compoundName: "Scald-Typhoon",
        stem: "ShalHanJal",
        desc: "A screaming cyclone carrying boiling water vapor and superheated air that suffocates and cooks targets.",
        resonanceBuff: "Thermobaric Maelstrom: Boiling vapor cyclone cooks targets while stripping atmospheric oxygen.",
        hazardWarning: "Hypoxia Hazard: Rapid steam expansion starves immediate area of oxygen."
    },
    "hanhum+iklad+sfalhoy": {
        name: "Electrolytic Thermal Cavitation",
        compoundName: "Thermal Cavitation",
        stem: "ShalHanIkl",
        desc: "Boiling water charged with high-voltage electricity, creating violent shockwave explosions on impact.",
        resonanceBuff: "Cavitation Shock: Vaporizes and shocks targets simultaneously with explosive overpressure.",
        hazardWarning: "Electrolytic Backfire: Discharging lightning through boiling water risks self-shock."
    },
    "erlaaw+hanhum+sfalhoy": {
        name: "Prismatic Scald-Mirage",
        compoundName: "Scald-Mirage",
        stem: "ShalHanErl",
        desc: "Boiling steam clouds refracting brilliant solar lasers, blinding and burning targets across the vanguard.",
        resonanceBuff: "Refractive Scald: Blinding solar lasers refract through steam to hit from all angles.",
        hazardWarning: null
    },
    "hanhum+sfalhoy+worulim": {
        name: "Abyssal Black-Smoker Vent",
        compoundName: "Black-Smoker Vent",
        stem: "ShalHanWor",
        desc: "Toxic superheated mineral water and suffocating darkness that rots flesh and obscures all vision.",
        resonanceBuff: "Hadal Smoker: Superheated black water blinds foes while eroding armor.",
        hazardWarning: null
    },
    "amin+hanhum+sfalhoy": {
        name: "Primordial Hydro-Combustion",
        compoundName: "Hydro-Combustion",
        stem: "ShalHanAmin",
        desc: "Pure mana forcing fire and water into an unnatural explosive fusion that bypasses elemental armor.",
        resonanceBuff: "Unnatural Fusion: Pure mana fuses water and fire into unblockable explosive bursts.",
        hazardWarning: null
    },
    "falga+jalfinn+sfalhoy": {
        name: "Pyroclastic Ash Tempest",
        compoundName: "Pyroclastic Tempest",
        stem: "ShalFalJal",
        desc: "A high-speed windstorm of molten ash, toxic gas, and burning volcanic stone shards.",
        resonanceBuff: "Pyroclastic Flak: High-mach wind drives burning volcanic slag through defenses.",
        hazardWarning: "Suffocation Risk: Choking volcanic ash fills the area."
    },
    "falga+iklad+sfalhoy": {
        name: "Volcanic Plasma Foundry",
        compoundName: "Plasma Foundry",
        stem: "ShalFalIkl",
        desc: "Molten basalt fused with high-amperage lightning arcs, creating magnetized glass slag that clings to metal.",
        resonanceBuff: "Magnetic Slag: Electrified molten rock clings to and melts through metallic armor.",
        hazardWarning: null
    },
    "erlaaw+falga+sfalhoy": {
        name: "Solar Magma Glass-Forge",
        compoundName: "Magma Glass-Forge",
        stem: "ShalFalErl",
        desc: "Concentrated solar heat melting bedrock into razor-sharp, glowing obsidian crystal lances.",
        resonanceBuff: "Solar Obsidian: Hardened solar glass lances pierce armor with white-hot precision.",
        hazardWarning: null
    },
    "falga+sfalhoy+worulim": {
        name: "Abyssal Nether-Magma Singularity",
        compoundName: "Nether-Magma Singularity",
        stem: "ShalFalWor",
        desc: "Heavy black lava that generates gravity wells while burning with entropic cold fire.",
        resonanceBuff: "Singularity Lava: Dark magma pulls enemies into a molten entropic core.",
        hazardWarning: null
    },
    "amin+falga+sfalhoy": {
        name: "Adamantine Primordial Forge",
        compoundName: "Primordial Forge",
        stem: "ShalFalAmin",
        desc: "Mana-reinforced molten rock forming indestructible burning constructs and blades.",
        resonanceBuff: "Aetheric Magma: Mana-stabilized molten stone ignores physical resistance.",
        hazardWarning: null
    },
    "iklad+jalfinn+sfalhoy": {
        name: "Ionized Firestorm Tempest",
        compoundName: "Firestorm Tempest",
        stem: "ShalJalIkl",
        desc: "High-speed wind driving superheated plasma and branching lightning strikes across the area.",
        resonanceBuff: "Plasma Hurricane: High-speed winds spread high-voltage plasma across the front.",
        hazardWarning: "Oxygen Depletion: High combustion starves area of oxygen."
    },
    "erlaaw+jalfinn+sfalhoy": {
        name: "Solar Flare Cyclone",
        compoundName: "Solar Cyclone",
        stem: "ShalJalErl",
        desc: "A howling vortex of solar fire and blinding laser radiation that burns the battlefield.",
        resonanceBuff: "Photonic Inferno: Blinding lasers ride cyclonic winds to incinerate lines.",
        hazardWarning: null
    },
    "jalfinn+sfalhoy+worulim": {
        name: "Nether-Ash Vacuum Storm",
        compoundName: "Nether-Ash Storm",
        stem: "ShalJalWor",
        desc: "A freezing black firestorm that pulls air and matter into an entropic vacuum void.",
        resonanceBuff: "Vacuum Ash: Freezing black fire pulls matter inward, decaying defenses.",
        hazardWarning: null
    },
    "amin+jalfinn+sfalhoy": {
        name: "Hypersonic Astral Conflagration",
        compoundName: "Astral Conflagration",
        stem: "ShalJalAmin",
        desc: "Hypersonic wind slipstreams carrying pure mana flames that burn through magical barriers.",
        resonanceBuff: "Aetheric Slipstream: Accelerates mana-fueled fire to hypersonic speeds.",
        hazardWarning: null
    },
    "erlaaw+iklad+sfalhoy": {
        name: "Thermonuclear Photonic Arc",
        compoundName: "Photonic Arc",
        stem: "ShalIklErl",
        desc: "Laser beams guiding superheated plasma and lightning strikes with pinpoint precision.",
        resonanceBuff: "Photonic Guidance: Laser tracks guide thermonuclear plasma arcs with zero latency.",
        hazardWarning: null
    },
    "iklad+sfalhoy+worulim": {
        name: "Sanguine Black-Arc Hellfire",
        compoundName: "Black-Arc Hellfire",
        stem: "ShalIklWor",
        desc: "Black lightning and dark flames that burn nervous systems and dissolve organic matter.",
        resonanceBuff: "Neural Hellfire: Black lightning rots nerves while burning armor.",
        hazardWarning: "Neural Feedback: Risk of nerve damage without Kunta."
    },
    "amin+iklad+sfalhoy": {
        name: "Overcharged Astral Plasma Burst",
        compoundName: "Astral Plasma Burst",
        stem: "ShalIklAmin",
        desc: "Pure mana accelerating electric plasma to extreme speeds, shattering shields.",
        resonanceBuff: "Aetheric Plasma: Pure mana overcharges plasma velocity to pierce all wards.",
        hazardWarning: null
    },
    "erlaaw+sfalhoy+worulim": {
        name: "Twilight Solar Eclipse Engine",
        compoundName: "Solar Eclipse Engine",
        stem: "ShalErlWor",
        desc: "Searing light and freezing void meeting in a volatile ring of reality-distorting fire.",
        resonanceBuff: "Penumbra Annihilation: Light and void balance to create space-rending thermal rifts.",
        hazardWarning: "Annihilation Instability: High mana recoil risk."
    },
    "amin+erlaaw+sfalhoy": {
        name: "Celestial Sunfire Purifier",
        compoundName: "Sunfire Purifier",
        stem: "ShalErlAmin",
        desc: "Pure mana-fueled solar fire that purges curses, illusions, and undead entities instantly.",
        resonanceBuff: "Holy Purifier: Celestial fire purges all foreign curses and illusions instantly.",
        hazardWarning: null
    },
    "amin+sfalhoy+worulim": {
        name: "Entropic Null-Flame Devourer",
        compoundName: "Null-Flame Devourer",
        stem: "ShalWorAmin",
        desc: "Pure mana driving an all-consuming black fire that eats incoming spells to grow larger.",
        resonanceBuff: "Spell Eater: Black fire eats incoming magical energy to fuel its expansion.",
        hazardWarning: null
    },

    "falga+hanhum+jalfinn": {
        name: "Cryogenic Silt Blizzard",
        compoundName: "Silt Blizzard",
        stem: "HanFalJal",
        desc: "Freezing gales carrying frozen mud and sharp rock shards that blind, freeze, and shred foes.",
        resonanceBuff: "Glacial Silt: Frozen mud and rock shards tear through armor while freezing targets.",
        hazardWarning: null
    },
    "falga+hanhum+iklad": {
        name: "Hydro-Magnetic Bedrock Surge",
        compoundName: "Hydro-Magnetic Surge",
        stem: "HanFalIkl",
        desc: "Mud currents conducting high-voltage lightning, magnetizing armor and shocking targets.",
        resonanceBuff: "Conductive Mire: Mud pools conduct high-voltage electricity across all targets.",
        hazardWarning: "Conduction Backfire: Moisture risks self-electrocution."
    },
    "erlaaw+falga+hanhum": {
        name: "Crystalline Aqua-Prism Bastion",
        compoundName: "Aqua-Prism Bastion",
        stem: "HanFalErl",
        desc: "Solid crystal stone infused with flowing water, refracting lasers and absorbing blows.",
        resonanceBuff: "Prismatic Fortress: Solid crystal stone reflects lasers while water absorbs kinetic hits.",
        hazardWarning: null
    },
    "falga+hanhum+worulim": {
        name: "Hadal Abyss Trench-Collapse",
        compoundName: "Trench-Collapse",
        stem: "HanFalWor",
        desc: "Deep-sea mud and suffocating darkness that crushes structures under extreme pressure.",
        resonanceBuff: "Hadal Collapse: Crushes structures beneath deep-sea mud and void gravity.",
        hazardWarning: null
    },
    "amin+falga+hanhum": {
        name: "Adamantine Alluvial Conduit",
        compoundName: "Alluvial Conduit",
        stem: "HanFalAmin",
        desc: "Pure mana turning soil and water into indestructible, self-repairing stone armor.",
        resonanceBuff: "Self-Repairing Stone: Pure mana regenerates damaged stone armor continuously.",
        hazardWarning: null
    },
    "hanhum+iklad+jalfinn": {
        name: "Cryogenic Thunderstorm Tempest",
        compoundName: "Thunderstorm Tempest",
        stem: "HanJalIkl",
        desc: "A freezing storm of hail and gale winds laced with continuous high-voltage lightning.",
        resonanceBuff: "Hail Arc: Lightning branches through hail flurries to shock entire ranks.",
        hazardWarning: null
    },
    "erlaaw+hanhum+jalfinn": {
        name: "Prismatic Aurora Glaciation",
        compoundName: "Aurora Glaciation",
        stem: "HanJalErl",
        desc: "Freezing winds and water droplets refracting radiant light into an aurora of cutting lasers.",
        resonanceBuff: "Aurora Shards: Freezing droplets refract light into a maze of cutting lasers.",
        hazardWarning: null
    },
    "hanhum+jalfinn+worulim": {
        name: "Hadal Void-Maelstrom",
        compoundName: "Void-Maelstrom",
        stem: "HanJalWor",
        desc: "A freezing black cyclone that pulls matter inward, crushing it with ocean pressure and void.",
        resonanceBuff: "Abyssal Cyclone: Freezing black cyclone pulls matter into crushing void pressure.",
        hazardWarning: null
    },
    "amin+hanhum+jalfinn": {
        name: "Hypersonic Glacial Aether-Jet",
        compoundName: "Glacial Aether-Jet",
        stem: "HanJalAmin",
        desc: "Pure mana accelerating sub-zero water jets to hypersonic cutting speeds.",
        resonanceBuff: "Aetheric Hydro-Cut: Sub-zero water jets accelerated to hypersonic cutting speeds.",
        hazardWarning: null
    },
    "erlaaw+hanhum+iklad": {
        name: "Photonic Hydro-Electric Arc",
        compoundName: "Hydro-Electric Arc",
        stem: "HanIklErl",
        desc: "Electrified water droplets reflecting and focusing coherent laser beams into a deadly web.",
        resonanceBuff: "Laser Circuit: Electrified water droplets reflect laser beams into an inescapable web.",
        hazardWarning: null
    },
    "hanhum+iklad+worulim": {
        name: "Abyssal Black-Surge Flayer",
        compoundName: "Black-Surge Flayer",
        stem: "HanIklWor",
        desc: "Electrified dark water that rots nerves and paralyzes muscles on contact.",
        resonanceBuff: "Neural Sludge: Electrified black water paralyzes muscles and rots nerves.",
        hazardWarning: "Nerve Damage Risk: High void voltage hazard."
    },
    "amin+hanhum+iklad": {
        name: "Electrolytic Spellbreaker Surge",
        compoundName: "Spellbreaker Surge",
        stem: "HanIklAmin",
        desc: "High-voltage mana water that conducts through enemy defenses to shatter their spell circles.",
        resonanceBuff: "Mana Conduction: High-voltage mana water conducts through shields to shatter circles.",
        hazardWarning: null
    },
    "erlaaw+hanhum+worulim": {
        name: "Hadal Twilight Penumbra",
        compoundName: "Twilight Penumbra",
        stem: "HanErlWor",
        desc: "Flowing water balancing light and shadow, refracting illusions while crushing targets.",
        resonanceBuff: "Hadal Illusion: Flowing water bends light and shadow to create deceptive reality rifts.",
        hazardWarning: null
    },
    "amin+erlaaw+hanhum": {
        name: "Sacred Astral Cascade",
        compoundName: "Astral Cascade",
        stem: "HanErlAmin",
        desc: "Radiant, purified water that heals biological wounds and purges dark curses.",
        resonanceBuff: "Holy Rejuvenation: Purified water washes away dark curses and regenerates tissue.",
        hazardWarning: null
    },
    "amin+hanhum+worulim": {
        name: "Abyssal Ether-Mire Devourer",
        compoundName: "Ether-Mire Devourer",
        stem: "HanWorAmin",
        desc: "Dark magical fluid that drags enemies into the earth while draining their mana reserves.",
        resonanceBuff: "Mana Siphon Mire: Dark magical fluid drains enemy mana to fuel the array.",
        hazardWarning: null
    },

    "falga+iklad+jalfinn": {
        name: "Ferromagnetic Sandstorm Tempest",
        compoundName: "Sandstorm Tempest",
        stem: "FalJalIkl",
        desc: "High-speed winds carrying magnetized rock shards that discharge lightning upon impact.",
        resonanceBuff: "Magnetic Flak Arc: Magnetized rock flak discharges high-voltage arcs on impact.",
        hazardWarning: null
    },
    "erlaaw+falga+jalfinn": {
        name: "Photolith Sand-Prism Storm",
        compoundName: "Sand-Prism Storm",
        stem: "FalJalErl",
        desc: "Wind-blown crystal sand that catches and reflects blinding laser beams in all directions.",
        resonanceBuff: "Prism Sand: Crystal sand clouds reflect laser beams in omnidirectional bursts.",
        hazardWarning: null
    },
    "falga+jalfinn+worulim": {
        name: "Tectonic Vacuum-Dust Singularity",
        compoundName: "Dust Singularity",
        stem: "FalJalWor",
        desc: "A dust cyclone generating gravitational collapse, grinding captured matter into dust.",
        resonanceBuff: "Singularity Grinder: Dust cyclone generates gravity wells, pulverizing matter.",
        hazardWarning: null
    },
    "amin+falga+jalfinn": {
        name: "Hypersonic Adamantine Flak",
        compoundName: "Adamantine Flak",
        stem: "FalJalAmin",
        desc: "Pure mana accelerating diamond-hard stone shards to hypersonic penetrating velocities.",
        resonanceBuff: "Aetheric Flak: Accelerates diamond stone shards to hypersonic piercing speeds.",
        hazardWarning: null
    },
    "erlaaw+falga+iklad": {
        name: "Fulgurite Crystal-Arc Laser",
        compoundName: "Crystal-Arc Laser",
        stem: "FalIklErl",
        desc: "Lightning-fused glass crystals focusing high-voltage electric lasers with zero dispersion.",
        resonanceBuff: "Fulgurite Laser: Lightning-fused glass crystals focus high-voltage laser beams.",
        hazardWarning: null
    },
    "falga+iklad+worulim": {
        name: "Obsidian Black-Arc Conduit",
        compoundName: "Black-Arc Conduit",
        stem: "FalIklWor",
        desc: "Electrified black stone pillars that channel nerve-rotting lightning across the ground.",
        resonanceBuff: "Black Pillar Grid: Obsidian pillars conduct nerve-rotting lightning across terrain.",
        hazardWarning: "Nerve Rot Hazard: Black lightning conduction risks."
    },
    "amin+falga+iklad": {
        name: "Adamantine Rail-Arc Battery",
        compoundName: "Rail-Arc Battery",
        stem: "FalIklAmin",
        desc: "Mana-charged stone rails launching high-voltage kinetic rock penetrators.",
        resonanceBuff: "Aetheric Railgun: Mana stone rails fire high-voltage kinetic penetrators.",
        hazardWarning: null
    },
    "erlaaw+falga+worulim": {
        name: "Twilight Obsidian Monolith",
        compoundName: "Obsidian Monolith",
        stem: "FalErlWor",
        desc: "Black crystal obelisks that absorb spells on one side while firing lasers from the other.",
        resonanceBuff: "Bifurcated Monolith: Obsidian crystals absorb hostile spells and reflect laser beams.",
        hazardWarning: null
    },
    "amin+erlaaw+falga": {
        name: "Sacred Photolith Citadel",
        compoundName: "Photolith Citadel",
        stem: "FalErlAmin",
        desc: "Diamond stone structures glowing with pure mana light that repel all dark magic.",
        resonanceBuff: "Holy Bastion: Mana stone structures glow with sacred light, repelling dark magic.",
        hazardWarning: null
    },
    "amin+falga+worulim": {
        name: "Adamantine Void Null-Gate",
        compoundName: "Void Null-Gate",
        stem: "FalWorAmin",
        desc: "Indestructible black stone portals that siphon nearby magical energy into the void.",
        resonanceBuff: "Null Portal: Indestructible stone gates siphon nearby magical energy away.",
        hazardWarning: null
    },

    "erlaaw+iklad+jalfinn": {
        name: "Photonic Hurricane Beam-Array",
        compoundName: "Hurricane Beam-Array",
        stem: "JalIklErl",
        desc: "Wind storms guiding laser-directed lightning bolts with pinpoint accuracy.",
        resonanceBuff: "Laser Hurricane: Cyclonic winds guide laser-directed lightning bolts with precision.",
        hazardWarning: null
    },
    "iklad+jalfinn+worulim": {
        name: "Black-Arc Vacuum Tempest",
        compoundName: "Black-Arc Tempest",
        stem: "JalIklWor",
        desc: "Vacuum winds carrying nerve-rotting black lightning that suffocates and paralyzes foes.",
        resonanceBuff: "Vacuum Paralysis: Vacuum winds deliver black lightning that paralyzes motor functions.",
        hazardWarning: "Neural Feedback: Risk of nerve damage."
    },
    "amin+iklad+jalfinn": {
        name: "Hypersonic Dielectric Lance",
        compoundName: "Dielectric Lance",
        stem: "JalIklAmin",
        desc: "Mach-speed wind needles wrapped in high-voltage mana arcs that puncture any shield.",
        resonanceBuff: "Aetheric Arc Lance: Hypersonic wind needles wrapped in high-voltage mana arcs.",
        hazardWarning: null
    },
    "erlaaw+jalfinn+worulim": {
        name: "Twilight Gale Penumbra",
        compoundName: "Gale Penumbra",
        stem: "JalErlWor",
        desc: "High-speed wind shears alternating between burning light and freezing void.",
        resonanceBuff: "Penumbra Shears: Wind shears alternate between burning light and freezing void.",
        hazardWarning: null
    },
    "amin+erlaaw+jalfinn": {
        name: "Solar Wind Aether-Gale",
        compoundName: "Aether-Gale",
        stem: "JalErlAmin",
        desc: "Pure mana wind carrying solar radiation that strips away illusions and curses.",
        resonanceBuff: "Purifying Gale: Mana wind carries solar radiation, stripping illusions.",
        hazardWarning: null
    },
    "amin+jalfinn+worulim": {
        name: "Matter-Erasing Aether Vacuum",
        compoundName: "Aether Vacuum",
        stem: "JalWorAmin",
        desc: "High-speed vacuum winds fueled by pure mana that erase matter on contact.",
        resonanceBuff: "Aetheric Excision: Hypersonic vacuum winds powered by mana erase matter.",
        hazardWarning: null
    },

    "erlaaw+iklad+worulim": {
        name: "Twilight Arc Singularity",
        compoundName: "Arc Singularity",
        stem: "IklErlWor",
        desc: "An electric singularity balancing solar lasers and black lightning, tearing reality.",
        resonanceBuff: "Singularity Arcs: Electric singularity balances solar lasers and black lightning.",
        hazardWarning: "Annihilation Risk: Extreme mana instability."
    },
    "amin+erlaaw+iklad": {
        name: "Radiant Dielectric Supercharger",
        compoundName: "Dielectric Supercharger",
        stem: "IklErlAmin",
        desc: "High-voltage solar lasers supercharged by pure mana to melt through fortified targets.",
        resonanceBuff: "Aetheric Laser Arc: Pure mana supercharges high-voltage solar lasers.",
        hazardWarning: null
    },
    "amin+iklad+worulim": {
        name: "Entropic Spell-Flayer Arc",
        compoundName: "Spell-Flayer Arc",
        stem: "IklWorAmin",
        desc: "Black lightning infused with pure mana that disintegrates foreign spell circles instantly.",
        resonanceBuff: "Spell Flayer: Black lightning infused with pure mana disintegrates foreign circles.",
        hazardWarning: null
    },

    "amin+erlaaw+worulim": {
        name: "Genesis-Oblivion Twilight Loom",
        compoundName: "Twilight Loom",
        stem: "ErlWorAmin",
        desc: "The ultimate balance of light, void, and pure mana, warping reality and rewriting spells.",
        resonanceBuff: "Reality Loom: Balances creation and void, warping reality and rewriting spells.",
        hazardWarning: "Cosmic Backdraft: Channeling the Twilight Loom tests mortal sanity."
    }
};

// -------------------------------------------------------------
// 5. NODE-SPECIFIC MODIFIER BEHAVIOR DICTIONARIES
// -------------------------------------------------------------
const NODE_ALPHA_MODIFIERS = {
    shak: { role: "Somatic Core Grounding", desc: "anchors the array's grounding wire to the caster's biological core, absorbing surplus feedback" },
    genu: { role: "Contact Circuit Closure", desc: "closes the array circuit only upon physical impact, preventing pre-detonation energy leakage" },
    asym: { role: "Single-Entity Lock", desc: "calibrates the feedback loop into a focused resonance beam locked onto a single designated quarry" },
    adau: { role: "Field Boundary Expansion", desc: "distributes the array's grounding perimeter across an entire geographic sector" },
    tigam: { role: "Inorganic Matter Selective", desc: "calibrates the array to bypass organic tissue, grounding all discharge into armor and structures" },
    giba: { role: "Biological Life Attunement", desc: "attunes the circuit to the biological warmth and nervous systems of living organisms" },
    ami: { role: "Anti-Magic Siphon", desc: "attunes the intake conduit to hunt down and consume foreign spell circles as fuel" },
    aduy: { role: "Remote Focal Origin", desc: "projects the array's genesis point across space, forming the closed circuit at distant coordinates" },
    spat: { role: "Active Psionic Steering", desc: "allows the caster to dynamically guide the circulating energy current via mental focus" },
    suruti: { role: "Autonomous Telemetry", desc: "automates targeting calculations, continuously correcting interception angles" },
    itta: { role: "Conduit Inertia Lock", desc: "locks circulating mana in place, holding the array in a charged state until released" },
    pakut: { role: "Terrain Substrate Anchor", desc: "pins the circuit immovably to target bedrock, preventing array drift" },
    alisi: { role: "Orthogonal Vector Snap", desc: "enables the circulating current to make instantaneous 90-degree vector corrections" },
    morpa: { role: "Adaptive Array Morph", desc: "dynamically shifts the array's geometry mid-cycle to bypass adaptive enemy defenses" }
};

const NODE_BETA_MODIFIERS = {
    rundo: { role: "Kinetic Repulsion Pump", desc: "amplifies outgoing kinetic repulsion with each circuit loop, increasing knockback" },
    yudgo: { role: "Gravitational Vortex Suction", desc: "creates an inward vortex that drags surrounding matter into the array's path" },
    kitas: { role: "Magnetic Convergence", desc: "generates intense magnetic fields that pull the array and target together" },
    ewansi: { role: "Deflective Shield Buffer", desc: "establishes a deflective forcefield that pushes away incoming hostile attacks" },
    surut: { role: "Bio-Thermal Tracking Loop", desc: "bends the circulating current to relentlessly track the target's heat signature" },
    blisu: { role: "Closed-Loop Mana Recycle", desc: "routes surplus energy back to origin after terminal discharge, recycling mana" },
    liwak: { role: "Centrifugal Acceleration", desc: "spins the circulating current into high-speed orbital rings, compounding velocity" },
    kijlo: { role: "Ballistic Artillery Arc", desc: "curves the array's trajectory into high-arching paths to bypass intervening cover" },
    tat: { role: "Instantaneous Flashover", desc: "discharges the entire circuit payload in a single microsecond burst" },
    tul: { role: "Continuous Channeled Loop", desc: "maintains uninterrupted flow through the circuit as long as mana is fed" },
    bati: { role: "Eternal Circuit Lock", desc: "locks the array into permanent physical reality without ongoing mana upkeep" },
    tan: { role: "Temporal Fuse Delay", desc: "stores energy within the conduits, delaying discharge until a set interval passes" },
    lit: { role: "Staccato Pulse Repeater", desc: "pulses the discharge in rhythmic, repeating cycles with each loop of the circuit" },
    talkib: { role: "Proximity Trap Stasis", desc: "arms the circuit as a dormant trap that triggers upon entity intrusion" },
    litu: { role: "Oscillating Tidal Wave", desc: "maintains a self-renewing wave cycle of waxing and waning energy output" },
    tiha: { role: "Branching Fission Split", desc: "divides the circulating current into branching pathways to hit multiple targets" },
    padu: { role: "Quad-Conduit Multiplying", desc: "splits the circuit into 4 synchronized conduits, multiplying throughput fourfold" },
    silpu: { role: "Dielectric Chain Cascade", desc: "creates secondary arcs that leap across adjacent entities upon terminal impact" },
    bunton: { role: "Salvo Cluster Swarm", desc: "condenses the circulating current into a dense salvo that blankets the area" }
};

const NODE_GAMMA_MODIFIERS = {
    yinla: { role: "Linear Coherent Ray", desc: "focuses the terminal discharge into a coherent, straight-line piercing beam" },
    gilbo: { role: "Condensed Spherical Core", desc: "condenses the terminal payload into an orbicular, high-density sphere" },
    taddum: { role: "Oscillating Slicing Blade", desc: "hones the terminal discharge into a razor-sharp, oscillating slicing edge" },
    yangga: { role: "Pinpoint Piercing Spike", desc: "shapes the terminal energy into a needle-thin armor-penetrating point" },
    praba: { role: "Fortified Planar Barrier", desc: "flattens the discharge into a reinforced rectangular wall or shield" },
    ngisngi: { role: "Spinning Annular Halo", desc: "forms the terminal energy into a spinning chakram or halo ring" },
    abbay: { role: "Omnidirectional Perimeter", desc: "manifests the discharge in a 360-degree perimeter around the target zone" },
    apap: { role: "Expanding Frontal Cone", desc: "flares the terminal energy outward in an expanding forward cone" },
    bamtuk: { role: "Thermobaric Blast Burst", desc: "triggers an explosive expansion upon impact, blasting outward" },
    tupwok: { role: "Concussive Shockwave", desc: "releases a concussive shockwave of pure physical blunt force" },
    dukto: { role: "Armor-Boring Penetration", desc: "concentrates all energy into a pinpoint armor-penetrating point" },
    iwa: { role: "Molecular Shearing Cut", desc: "converts kinetic energy into high-frequency cuts that slice matter" },
    pittip: { role: "Downwards Gravity Crush", desc: "applies massive downward compressive pressure that flattens targets" },
    waras: { role: "Flak Cluster Shrapnel", desc: "shatters the terminal payload into a cluster of smaller sub-munitions" },
    tublag: { role: "Elastic Ricochet Rebound", desc: "causes the payload to ricochet off solid surfaces without losing momentum" },
    tigkab: { role: "Fracture Crystal Shatter", desc: "fractures target armor and crystal structures into jagged fragments" },
    piag: { role: "Overcharge Strengthening", desc: "overcharges the circuit's throughput to maximize total destructive yield" },
    sukap: { role: "Throttled Non-Lethal Output", desc: "throttles power output to non-lethal thresholds for sparring" },
    kupos: { role: "Hyper-Dense Compression", desc: "hyper-compresses the payload into an ultra-dense mass" },
    lawal: { role: "Volumetric Expansion", desc: "expands the volumetric spread of the discharge to cover vast territory" },
    sapas: { role: "Supersonic Acceleration", desc: "propels the terminal discharge at supersonic velocities" },
    tunbog: { role: "Crushing Heavy Momentum", desc: "deliberately slows the discharge speed, increasing its lingering mass" },
    kunta: { role: "Adamantine Solidification", desc: "solidifies the construct into adamantine, near-indestructible density" },
    asanu: { role: "Molecular Edge Sharpening", desc: "hones cutting boundaries down to molecular precision" }
};

// -------------------------------------------------------------
// 6. HELPER LOOKUP & SYNTACTIC FUNCTIONS
// -------------------------------------------------------------

function getTriElementKey(el1, el2, el3) {
    if (!el1 || !el2 || !el3) return "sfalhoy+sfalhoy+sfalhoy";
    return [el1, el2, el3].sort().join("+");
}

function getDeploymentClass(delAlpha, delBeta, delGamma) {
    const codeAlpha = ARRAY_DELIVERIES.find(d => d.id === delAlpha)?.code || "U";
    const codeBeta = ARRAY_DELIVERIES.find(d => d.id === delBeta)?.code || "U";
    const codeGamma = ARRAY_DELIVERIES.find(d => d.id === delGamma)?.code || "U";
    
    const key = `${codeAlpha}-${codeBeta}-${codeGamma}`;
    return ARRAY_DEPLOYMENT_CLASSES[key] || ARRAY_DEPLOYMENT_CLASSES["U-U-U"];
}

function getTriElementalReaction(elAlpha, elBeta, elGamma) {
    const key = getTriElementKey(elAlpha, elBeta, elGamma);
    return TRI_ELEMENTAL_REACTIONS[key] || TRI_ELEMENTAL_REACTIONS["sfalhoy+sfalhoy+sfalhoy"];
}

function isModifierAllowedInNode(nodeKey, modId) {
    const constraint = ARRAY_NODE_CONSTRAINTS[nodeKey];
    if (!constraint) return false;
    
    const mod = (typeof MODIFIERS !== 'undefined') ? MODIFIERS.find(m => m.id === modId) : null;
    if (!mod) return false;
    
    return constraint.allowedCategories.includes(mod.cat);
}