/* ================= MASTER LEXICON & ARCHETYPES ================= */

const ELEMENTS = [
    { id: "sfalhoy", name: "Sfalhoy", label: "Fire", stem: "Shal", desc: "thermal combustion and raging heat" },
    { id: "hanhum", name: "Hanhum", label: "Water", stem: "Han", desc: "hydrostatic pressure, fluid momentum, and cold" },
    { id: "falga", name: "Falga", label: "Earth", stem: "Fal", desc: "mineral density, solid bedrock, and blunt mass" },
    { id: "jalfinn", name: "Jalfinn", label: "Air", stem: "Jal", desc: "atmospheric currents and high-velocity shearing wind" },
    { id: "iklad", name: "Iklad", label: "Lightning", stem: "Ikl", desc: "high-voltage ionizing electric discharge" },
    { id: "erlaaw", name: "Erlaaw", label: "Light", stem: "Erl", desc: "photonic radiation, luminous clarity, and blinding flare" },
    { id: "worulim", name: "Worulim", label: "Dark", stem: "Wor", desc: "light-devouring void and absolute sensory obscuration" },
    { id: "amin", name: "Amin", label: "Pure Mana", stem: "Amin", desc: "raw, unaspected kinetic and etheric force" }
];

const DELIVERIES = [
    { id: "uruwak", name: "Uruwak", label: "Projectile", stem: "Uru", desc: "ballistic propulsion along a forward trajectory" },
    { id: "lalhwa", name: "Lalhwa", label: "Wide / Surge", stem: "Lal", desc: "a wide-fronted wave or expanding area surge" },
    { id: "hlakbil", name: "Hlakbil", label: "Imbue (Vessel)", stem: "Hlak", desc: "temporary infusion into a physical vessel or body part" },
    { id: "ruluwar", name: "Ruluwar", label: "Free-Form", stem: "Rul", desc: "continuous telekinetic elemental flow controlled by gesture or thought" },
    { id: "iwati", name: "Iwati", label: "Enchant", stem: "Iwat", desc: "permanent structural enchantment into a non-living object" }
];

const BODY_PARTS = [
    { id: "whole_body", name: "Entire Body", label: "Full Somatic Shell", desc: "the caster's entire somatic vessel from crown to heel" },
    { id: "fists", name: "Fists & Hands", label: "Fists", desc: "the caster's fists, knuckles, and striking palms" },
    { id: "arms", name: "Arms & Forearms", label: "Arms", desc: "the caster's forearms, elbows, and upper limbs" },
    { id: "legs", name: "Legs & Feet", label: "Legs", desc: "the caster's legs, knees, calves, and soles" },
    { id: "torso", name: "Torso & Chest", label: "Torso", desc: "the chest cavity, ribs, and thoracic core" },
    { id: "eyes", name: "Eyes & Gaze", label: "Ocular", desc: "the optical pathways, corneas, and retinas" },
    { id: "throat", name: "Throat & Voice", label: "Vocal", desc: "the vocal tract, larynx, and lungs" },
    { id: "spine", name: "Spine & Nerves", label: "Neural", desc: "the spinal column, vertebrae, and central nervous system" },
    { id: "skin", name: "Skin & Dermis", label: "Dermal", desc: "the epidermal dermal layers and external skin" },
    { id: "weapon_grip", name: "Held Armament", label: "Weapon", desc: "the physical weapon or armament gripped in the caster's hand" }
];

const CATEGORIES = [
    { id: "shape", name: "1. Shape" },
    { id: "movement", name: "2. Movement" },
    { id: "impact", name: "3. Impact" },
    { id: "duration", name: "4. Duration" },
    { id: "multiply", name: "5. Multiply" },
    { id: "target", name: "6. Target" },
    { id: "control", name: "7. Control" },
    { id: "intensity", name: "8. Intensity" }
];

const MODIFIERS = [
    // 1. Shape
    { id: "yinla", cat: "shape", name: "Yinla", stem: "Yin", role: "Straight Line", desc: "concentrated into a linear beam" },
    { id: "gilbo", cat: "shape", name: "Gilbo", stem: "Gil", role: "Sphere", desc: "condensed into an orbicular spherical shape" },
    { id: "taddum", cat: "shape", name: "Taddum", stem: "Tad", role: "Edged Shape", desc: "honed into a sharp-edged blade form" },
    { id: "yangga", cat: "shape", name: "Yangga", stem: "Yang", role: "Pointy", desc: "shaped into a penetrating spearhead or needle point" },
    { id: "praba", cat: "shape", name: "Praba", stem: "Pra", role: "Quadrilateral", desc: "flattened into a rectangular barrier or sheet" },
    { id: "ngisngi", cat: "shape", name: "Ngisngi", stem: "Ngis", role: "Ring Shape", desc: "formed into a spinning or stationary halo ring" },
    { id: "abbay", cat: "shape", name: "Abbay", stem: "Ab", role: "Surround AOE", desc: "manifested in an omnidirectional perimeter around the target radius" },
    { id: "apap", cat: "shape", name: "Apap", stem: "Ap", role: "Cone", desc: "flaring outwards in an expanding frontal cone" },

    // 2. Movement
    { id: "rundo", cat: "movement", name: "Rundo", stem: "Run", role: "Push", desc: "violently shoves targets backwards upon contact" },
    { id: "yudgo", cat: "movement", name: "Yudgo", stem: "Yud", role: "Pull", desc: "draws victims toward the center of the spell" },
    { id: "kitas", cat: "movement", name: "Kitas", stem: "Kit", role: "Attract", desc: "exerts an attractive magnetic or gravitational pull" },
    { id: "ewansi", cat: "movement", name: "Ewansi", stem: "Ewan", role: "Repel", desc: "acts as a deflective field pushing matter away" },
    { id: "surut", cat: "movement", name: "Surut", stem: "Sur", role: "Follow", desc: "curves its flight trajectory toward a designated quarry" },
    { id: "blisu", cat: "movement", name: "Blisu", stem: "Bli", role: "Return", desc: "rebounds back toward the caster after apex" },
    { id: "liwak", cat: "movement", name: "Liwak", stem: "Liw", role: "Orbit", desc: "revolves rapidly in a defensive or offensive orbital path" },
    { id: "kijlo", cat: "movement", name: "Kijlo", stem: "Kij", role: "Arch", desc: "flies along an indirect, high-arching artillery ballistic arc" },

    // 3. Impact
    { id: "bamtuk", cat: "impact", name: "Bamtuk", stem: "Bam", role: "Burst", desc: "violently expands in a localized explosive burst" },
    { id: "tupwok", cat: "impact", name: "Tupwok", stem: "Tup", role: "Blast", desc: "releases a concussive shockwave of pure physical force" },
    { id: "dukto", cat: "impact", name: "Dukto", stem: "Duk", role: "Pierce", desc: "sacrifices blast radius for lethal pinpoint armor penetration" },
    { id: "iwa", cat: "impact", name: "Iwa", stem: "Iw", role: "Cut", desc: "focuses kinetic energy into shearing, lacerating cuts" },
    { id: "pittip", cat: "impact", name: "Pittip", stem: "Pit", role: "Crush", desc: "applies immense compressive downward force" },
    { id: "waras", cat: "impact", name: "Waras", stem: "War", role: "Scatter", desc: "shatters into a cluster of smaller sub-munitions on impact" },
    { id: "tublag", cat: "impact", name: "Tublag", stem: "Tub", role: "Bounce", desc: "ricochets off solid surfaces without losing momentum" },
    { id: "tigkab", cat: "impact", name: "Tigkab", stem: "Tig", role: "Shatter", desc: "splinters into jagged shrapnel fragments upon impact" },

    // 4. Duration
    { id: "tat", cat: "duration", name: "Tat", stem: "Tat", role: "Instant", desc: "discharges all energy instantaneously" },
    { id: "tul", cat: "duration", name: "Tul", stem: "Tul", role: "Sustain", desc: "channels continuously as long as mana and concentration are fed" },
    { id: "bati", cat: "duration", name: "Bati", stem: "Bat", role: "Persist", desc: "remains stable in the physical world without continuous mana drain" },
    { id: "tan", cat: "duration", name: "Tan", stem: "Tan", role: "Delay", desc: "delays detonation or activation until a set interval passes" },
    { id: "lit", cat: "duration", name: "Lit", stem: "Lit", role: "Repeat", desc: "automatically pulses its effect multiple times" },
    { id: "talkib", cat: "duration", name: "Talkib", stem: "Tal", role: "Trigger", desc: "lies dormant as a trap until a proximity or contact trigger occurs" },
    { id: "litu", cat: "duration", name: "Litu", stem: "Litu", role: "Cycle", desc: "maintains an oscillating, recurring activation cycle" },

    // 5. Multiply
    { id: "tiha", cat: "multiply", name: "Tiha", stem: "Tih", role: "Split", desc: "fissions mid-flight into multiple distinct fragments" },
    { id: "padu", cat: "multiply", name: "Padu-4", stem: "Pad4", role: "Multiply (x4)", desc: "manifests 4 identical simultaneous duplicates" },
    { id: "silpu", cat: "multiply", name: "Silpu", stem: "Sil", role: "Chain", desc: "arcs or leaps from the primary target to adjacent secondary targets" },
    { id: "bunton", cat: "multiply", name: "Bunton", stem: "Bun", role: "Cluster", desc: "swarms together as a dense, overlapping salvo" },

    // 6. Target
    { id: "shak", cat: "target", name: "Shak", stem: "Shak", role: "Self", desc: "anchors directly to the caster's body" },
    { id: "genu", cat: "target", name: "Genu", stem: "Gen", role: "Touch", desc: "requires direct physical contact to discharge" },
    { id: "asym", cat: "target", name: "Asym", stem: "As", role: "Single Target", desc: "locks onto a single designated distant entity" },
    { id: "adau", cat: "target", name: "Adau", stem: "Ada", role: "Area", desc: "engulfs all matter within the designated zone" },
    { id: "tigam", cat: "target", name: "Tigam", stem: "Tig", role: "Object", desc: "selectively binds to non-living matter" },
    { id: "giba", cat: "target", name: "Giba", stem: "Gib", role: "Living", desc: "homes exclusively toward biological/living signatures" },
    { id: "ami", cat: "target", name: "Ami", stem: "Am", role: "Mana Target", desc: "targets, drains, or unravels active magical energy" },
    { id: "aduy", cat: "target", name: "Aduy", stem: "Adu", role: "Remote Origin", desc: "manifests directly at a distant coordinate rather than from the caster" },

    // 7. Control
    { id: "spat", cat: "control", name: "Spat", stem: "Spat", role: "Guide", desc: "allows the caster to manually steer the spell mid-flight" },
    { id: "suruti", cat: "control", name: "Suruti", stem: "Suru", role: "Auto-Track", desc: "autonomously locks and chases target coordinates" },
    { id: "itta", cat: "control", name: "Itta", stem: "It", role: "Hold", desc: "freezes and hovers fixed in mid-air at its current position" },
    { id: "pakut", cat: "control", name: "Pakut", stem: "Pak", role: "Anchor", desc: "pins or affixes itself immovably to a target or surface" },
    { id: "alisi", cat: "control", name: "Alisi", stem: "Ali", role: "Redirect", desc: "executes violent 90-degree vector corrections" },
    { id: "morpa", cat: "control", name: "Morpa", stem: "Mor", role: "Morph", desc: "dynamically morphs its shape during flight" },

    // 8. Intensity
    { id: "piag", cat: "intensity", name: "Piag", stem: "Pia", role: "Strengthen", desc: "overcharges raw spell output and destructive yield" },
    { id: "sukap", cat: "intensity", name: "Sukap", stem: "Suk", role: "Weaken", desc: "dampens output to a non-lethal, controlled threshold" },
    { id: "kupos", cat: "intensity", name: "Kupos", stem: "Kup", role: "Compress", desc: "hyper-compresses mana into a super-dense state" },
    { id: "lawal", cat: "intensity", name: "Lawal", stem: "Law", role: "Expand", desc: "bloats the volumetric spread to cover vast territory" },
    { id: "sapas", cat: "intensity", name: "Sapas", stem: "Sap", role: "Accelerate", desc: "propels the spell at supersonic speeds" },
    { id: "tunbog", cat: "intensity", name: "Tunbog", stem: "Tun", role: "Slow", desc: "drifts forward with deliberate, heavy momentum" },
    { id: "kunta", cat: "intensity", name: "Kunta", stem: "Kun", role: "Harden", desc: "crystallizes the manifestation to near-indestructible physical density" },
    { id: "asanu", cat: "intensity", name: "Asanu", stem: "Asan", role: "Sharpen", desc: "sharpens edges down to molecular cutting precision" }
];

const ANCIENT_ARCHETYPES = [
    {
        name: "Armor-Piercing Flame Needle",
        element: "sfalhoy",
        delivery: "uruwak",
        modifiers: ["yangga", "suruti", "dukto", "sapas", "kupos"],
        desc: "A supersonic, needle-thin bolt of white-hot compressed plasma that homes on targets and punches straight through heavy armor."
    },
    {
        name: "Hydro-Cutter Razor Jet",
        element: "hanhum",
        delivery: "uruwak",
        modifiers: ["taddum", "iwa", "kupos", "sapas"],
        desc: "Pressurizes water into a hyper-accelerated cutting stream capable of slicing clean through solid stone or steel."
    },
    {
        name: "Subterranean Seismic Landmine",
        element: "falga",
        delivery: "lalhwa",
        modifiers: ["abbay", "pakut", "tan", "talkib", "tupwok", "waras"],
        desc: "An anchored underground earth trap that triggers upon proximity, blasting outward in concussive rock shrapnel."
    },
    {
        name: "Whirlwind Razor Perimeter",
        element: "jalfinn",
        delivery: "lalhwa",
        modifiers: ["ngisngi", "liwak", "shak", "ewansi", "asanu"],
        desc: "Creates a revolving ring of molecularly sharp wind blades orbiting the caster to slice foes and deflect projectiles."
    },
    {
        name: "Chained Thunder Storm Salvo",
        element: "iklad",
        delivery: "uruwak",
        modifiers: ["padu", "suruti", "silpu", "bamtuk"],
        desc: "Fires 4 autonomous lightning bolts that track targets, detonating on impact and arcing electricity between adjacent victims."
    },
    {
        name: "Solar Blinding Flare",
        element: "erlaaw",
        delivery: "lalhwa",
        modifiers: ["apap", "tat", "bamtuk", "piag", "lawal"],
        desc: "An instantaneous conical burst of overcharged solar radiance that permanently sears optics and blinds entire vanguard ranks."
    },
    {
        name: "Abyssal Sensory Shroud",
        element: "worulim",
        delivery: "lalhwa",
        modifiers: ["abbay", "tul", "lawal", "giba"],
        desc: "A sustained darkness field that deprives living entities within the zone of vision, sound, and thermal perception."
    },
    {
        name: "Mithril Flaming Edge (Hlakbil)",
        element: "sfalhoy",
        delivery: "hlakbil",
        bodyParts: ["weapon_grip"],
        modifiers: ["asanu", "kupos", "sapas", "bati", "piag"],
        desc: "Imbues high-grade weaponry with compressed, persisting fire that sharpens cutting edges to laser-grade lethality."
    },
    {
        name: "Obsidian Bastion Reinforcement (Hlakbil)",
        element: "falga",
        delivery: "hlakbil",
        bodyParts: ["whole_body"],
        modifiers: ["kunta", "piag", "bati", "shak"],
        desc: "Pumps earth mana into the caster's bones and armor, hardening physical density to diamond-like thresholds."
    },
    {
        name: "Archmage Fire Drake (Ruluwar)",
        element: "sfalhoy",
        delivery: "ruluwar",
        modifiers: ["kupos", "ami", "giba", "piag"],
        desc: "A free-form plasma serpent controlled purely by thought; hunts enemy lifeforce while actively devouring enemy mana shields."
    },
    {
        name: "Anti-Magic Spellbreaker Needles",
        element: "amin",
        delivery: "uruwak",
        modifiers: ["yangga", "tiha", "padu", "ami", "dukto"],
        desc: "Pure mana projectiles that split into pinpoint needles, designed to seek and puncture through foreign magical barriers."
    },
    {
        name: "Singularity Gravity Well",
        element: "falga",
        delivery: "uruwak",
        modifiers: ["gilbo", "pakut", "yudgo", "pittip", "tul"],
        desc: "Launches an orb that anchors at a location and exerts immense gravitational attraction, crushing caught enemies into its core."
    }  
];