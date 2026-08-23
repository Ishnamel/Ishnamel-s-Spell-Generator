

/* ==========================================================================
   ADVANCED COMBINATORIAL SYNTACTIC SPELL COMPILER & LORE SYNTHESIZER
   ========================================================================== */

function joinNatural(list) {
    if (!list || list.length === 0) return "";
    if (list.length === 1) return list[0];
    if (list.length === 2) return `${list[0]} and ${list[1]}`;
    return `${list.slice(0, -1).join(", ")}, and ${list[list.length - 1]}`;
}

// ================= MASTER COMBINATORIAL LEXICON TABLES ================= //

const ELEMENT_THEMES = {
    sfalhoy: { adj: "Infernal", noun: "Flame", prefix: "Pyro", dragon: "Dragon's", coat: "Salamander", edge: "Blazing" },
    hanhum: { adj: "Tidal", noun: "Water", prefix: "Hydro", frost: "Glacial", coat: "Laminar", edge: "Flowing" },
    falga: { adj: "Tectonic", noun: "Bedrock", prefix: "Geo", stone: "Basalt", coat: "Diamond", edge: "Obsidian" },
    jalfinn: { adj: "Zephyr", noun: "Wind", prefix: "Aero", storm: "Tempest", coat: "Slipstream", edge: "Vacuum" },
    iklad: { adj: "Thunder", noun: "Lightning", prefix: "Ionic", storm: "Storm", coat: "Corona", edge: "Ionized" },
    erlaaw: { adj: "Solar", noun: "Radiance", prefix: "Photonic", hard: "Hard-Light", coat: "Prismatic", edge: "Hard-Light" },
    worulim: { adj: "Abyssal", noun: "Void", prefix: "Umbral", shadow: "Shadow", coat: "Nether", edge: "Void" },
    amin: { adj: "Etheric", noun: "Mana", prefix: "Arcane", pure: "Astral", coat: "Aegis", edge: "Etheric" }
};

// 1. BASE ANATOMY TITLES (HLAKBIL)
const HLAKBIL_ANATOMY_BASE = {
    sfalhoy: {
        whole_body: "Flame Cloak", eyes: "Flame Vision", throat: "Dragon's Breath",
        fists: "Blazing Fists", arms: "Infernal Bracers", legs: "Firewalker Stride",
        torso: "Furnace Core", spine: "Infernal Reflex", skin: "Salamander Hide", weapon_grip: "Flaming Edge"
    },
    hanhum: {
        whole_body: "Tidal Shroud", eyes: "Tide Vision", throat: "Torrential Roar",
        fists: "Torrent Fists", arms: "Surging Bracers", legs: "Waterwalker Stride",
        torso: "Maelstrom Core", spine: "Fluid Neural Axis", skin: "Laminar Mantle", weapon_grip: "Hydro-Blade"
    },
    falga: {
        whole_body: "Bedrock Bastion", eyes: "Tremorsense Vision", throat: "Seismic Roar",
        fists: "Bedrock Fists", arms: "Granite Bracers", legs: "Tectonic Stride",
        torso: "Basalt Bastion", spine: "Obsidian Spine", skin: "Diamond Skin", weapon_grip: "Obsidian Edge"
    },
    jalfinn: {
        whole_body: "Tempest Cloak", eyes: "Zephyr Vision", throat: "Tempest Breath",
        fists: "Vacuum Palms", arms: "Cyclone Bracers", legs: "Windwalker Stride",
        torso: "Eye of the Storm", spine: "Aero-Reflex", skin: "Slipstream Mantle", weapon_grip: "Vacuum Blade"
    },
    iklad: {
        whole_body: "Lightning Cloak", eyes: "Storm Vision", throat: "Thunder Roar",
        fists: "Thunderstrike Fists", arms: "Ionic Bracers", legs: "Flash-Step Stride",
        torso: "Storm Dynamo", spine: "Superconducting Reflex", skin: "Static Corona", weapon_grip: "Thunder Edge"
    },
    erlaaw: {
        whole_body: "Radiant Avatar", eyes: "Solar Vision", throat: "Prismatic Voice",
        fists: "Hard-Light Fists", arms: "Luminous Bracers", legs: "Light-Speed Stride",
        torso: "Solar Core", spine: "Photonic Synapse", skin: "Prismatic Mantle", weapon_grip: "Hard-Light Blade"
    },
    worulim: {
        whole_body: "Void Shroud", eyes: "Void Vision", throat: "Abyssal Whisper",
        fists: "Shadow Claws", arms: "Umbral Bracers", legs: "Shadow Stride",
        torso: "Abyssal Heart", spine: "Void Synapse", skin: "Shadow Mantle", weapon_grip: "Void Edge"
    },
    amin: {
        whole_body: "Mana Cloak", eyes: "Mana Vision", throat: "Arcane Voice",
        fists: "Etheric Fists", arms: "Mana Bracers", legs: "Ether Stride",
        torso: "Mana Core", spine: "Etheric Conduit", skin: "Mana Mantle", weapon_grip: "Etheric Edge"
    }
};

// 2. MULTI-PART COMBINATION TITLES
const HLAKBIL_COMBO_BASE = {
    martial: {
        sfalhoy: "Blazing Martial Form", hanhum: "Flowing Current Martial Form",
        falga: "Tectonic Martial Form", jalfinn: "Windwalker Combat Form",
        iklad: "Flash-Strike Combat Stance", erlaaw: "Radiant Martial Form",
        worulim: "Shadow Strike Stance", amin: "Etheric Martial Arts"
    },
    sight_voice: {
        sfalhoy: "Dragon's Sight & Breath", hanhum: "Tidal Vision & Roar",
        falga: "Tremorsense & Seismic Roar", jalfinn: "Zephyr Vision & Tempest Roar",
        iklad: "Storm Vision & Thunder Roar", erlaaw: "Solar Vision & Prismatic Voice",
        worulim: "Void Vision & Abyssal Whisper", amin: "Mana Vision & Arcane Voice"
    },
    sight_spine: {
        sfalhoy: "Infernal Reflex & Sight", hanhum: "Tidal Perception & Reflex",
        falga: "Tremorsense & Tectonic Axis", jalfinn: "Zephyr Perception & Reflex",
        iklad: "Neural Overdrive & Storm Vision", erlaaw: "Photonic Perception & Synapse",
        worulim: "Void Sight & Umbral Instinct", amin: "Mana Vision & Neural Reflex"
    },
    core_spine: {
        sfalhoy: "Furnace Core & Neural Axis", hanhum: "Maelstrom Core & Axis",
        falga: "Bedrock Core & Obsidian Spine", jalfinn: "Tempest Core & Aero-Reflex",
        iklad: "Storm Dynamo & Superconducting Axis", erlaaw: "Solar Heart & Photonic Axis",
        worulim: "Abyssal Heart & Void Spine", amin: "Mana Font & Etheric Conduit"
    },
    skin_core: {
        sfalhoy: "Salamander Carapace & Core", hanhum: "Glacial Mantle & Core",
        falga: "Diamond Skin & Bedrock Bastion", jalfinn: "Slipstream Mantle & Core",
        iklad: "Static Corona & Storm Core", erlaaw: "Prismatic Dermis & Solar Core",
        worulim: "Shadow Mantle & Abyssal Core", amin: "Mana Aegis Shell & Core"
    },
    chassis: {
        sfalhoy: "Infernal Somatic Frame", hanhum: "Tidal Flow Frame",
        falga: "Tectonic Adamantine Frame", jalfinn: "Zephyr Tempest Frame",
        iklad: "Ionic Superconductor Frame", erlaaw: "Prismatic Hard-Light Frame",
        worulim: "Abyssal Shadow Frame", amin: "Arcane Etheric Frame"
    }
};

// 3. SHAPE × BODY PART NATURAL VOCABULARY
function getSomaticShapeTitle(elKey, part, shapeId) {
    const t = ELEMENT_THEMES[elKey] || ELEMENT_THEMES.amin;

    switch (shapeId) {
        case 'yangga':
            if (part === 'skin') return `${t.coat} Spined Hide`;
            if (part === 'torso') return `${t.adj} Thoracic Spikes`;
            if (part === 'fists') return `${t.prefix}-Needle Knuckles`;
            if (part === 'legs') return `${t.adj} Stiletto Stride`;
            if (part === 'eyes') return `${t.adj} Piercing Gaze`;
            if (part === 'throat') return `${t.adj} Piercing Shriek`;
            if (part === 'spine') return `${t.adj} Spined Neural Axis`;
            if (part === 'arms') return `${t.adj} Spiked Bracers`;
            if (part === 'whole_body') return `${t.adj} Spiked Armor`;
            if (part === 'weapon_grip') return `${t.adj} Piercing Lance`;
            break;

        case 'taddum':
            if (part === 'skin') return `${t.adj} Razor-Scaled Dermis`;
            if (part === 'torso') return `${t.adj} Serrated Breastplate`;
            if (part === 'fists') return `${t.noun} Claws`;
            if (part === 'legs') return `${t.adj} Scythe Stride`;
            if (part === 'eyes') return `${t.adj} Severing Gaze`;
            if (part === 'throat') return `${t.adj} Shearing Roar`;
            if (part === 'spine') return `${t.adj} Serrated Spine`;
            if (part === 'arms') return `${t.adj} Bladed Forearms`;
            if (part === 'whole_body') return `${t.adj} Razor Carapace`;
            if (part === 'weapon_grip') return `${t.adj} Executioner Blade`;
            break;

        case 'yinla':
            if (part === 'eyes') return `${t.noun} Optical Ray`;
            if (part === 'throat') return `${t.adj} Breath Cannon`;
            if (part === 'fists') return `${t.prefix}-Ray Palms`;
            if (part === 'arms') return `${t.adj} Linear Ray Bracers`;
            if (part === 'legs') return `${t.adj} Vector Flash Steps`;
            if (part === 'torso') return `${t.adj} Chest Ray Dynamo`;
            if (part === 'spine') return `${t.adj} Linear Synapse Conduit`;
            if (part === 'skin') return `${t.adj} Radiant Dermal Lattice`;
            if (part === 'whole_body') return `${t.adj} Laser Avatar`;
            if (part === 'weapon_grip') return `${t.noun} Beam Edge`;
            break;

        case 'gilbo':
            if (part === 'eyes') return `${t.noun} Orb Gaze`;
            if (part === 'throat') return `${t.adj} Resonant Orb Roar`;
            if (part === 'fists') return `${t.noun} Impact Orbs`;
            if (part === 'arms') return `${t.adj} Spherical Bracers`;
            if (part === 'torso') return `${t.noun} Core Dynamo`;
            if (part === 'legs') return `${t.adj} Orb-Treading Stride`;
            if (part === 'spine') return `${t.adj} Orbital Vertebrae`;
            if (part === 'skin') return `${t.coat} Orb-Studded Mantle`;
            if (part === 'whole_body') return `${t.adj} Spherical Shroud`;
            if (part === 'weapon_grip') return `${t.noun} Orb Mace`;
            break;

        case 'praba':
            if (part === 'skin') return `${t.coat} Aegis Carapace`;
            if (part === 'torso') return `${t.adj} Bastion Chestplate`;
            if (part === 'arms') return `${t.adj} Bulwark Bracers`;
            if (part === 'fists') return `${t.adj} Shield Palms`;
            if (part === 'legs') return `${t.adj} Bastion Greaves`;
            if (part === 'eyes') return `${t.adj} Ocular Prism Barrier`;
            if (part === 'throat') return `${t.adj} Repelling Voice`;
            if (part === 'spine') return `${t.adj} Fortified Neural Axis`;
            if (part === 'whole_body') return `${t.noun} Aegis Shell`;
            if (part === 'weapon_grip') return `${t.adj} Shield-Blade`;
            break;

        case 'ngisngi':
            if (part === 'eyes') return `${t.noun} Halo Gaze`;
            if (part === 'throat') return `${t.adj} Sonic Halo Roar`;
            if (part === 'fists') return `${t.noun} Chakram Knuckles`;
            if (part === 'arms') return `${t.adj} Orbiting Halo Bracers`;
            if (part === 'legs') return `${t.adj} Chakram Stride`;
            if (part === 'torso') return `${t.noun} Halo Core`;
            if (part === 'spine') return `${t.adj} Chakram Neural Axis`;
            if (part === 'skin') return `${t.coat} Halo Mantle`;
            if (part === 'whole_body') return `${t.adj} Halo-Girded Avatar`;
            if (part === 'weapon_grip') return `${t.noun} Chakram Edge`;
            break;

        case 'apap':
            if (part === 'throat') return `${t.dragon} ${t.noun} Breath Cone`;
            if (part === 'fists') return `${t.prefix}-Blast Palms`;
            if (part === 'eyes') return `${t.adj} Expanding Flare Gaze`;
            if (part === 'torso') return `${t.adj} Flaring Furnace Core`;
            if (part === 'legs') return `${t.adj} Flaring Jet Stride`;
            if (part === 'arms') return `${t.adj} Cone-Projecting Bracers`;
            if (part === 'skin') return `${t.coat} Flaring Mantle`;
            if (part === 'spine') return `${t.adj} Ascending Spinal Wave`;
            if (part === 'whole_body') return `${t.adj} Erupting Shroud`;
            if (part === 'weapon_grip') return `${t.adj} Sweeping Cleaver`;
            break;

        case 'abbay':
            if (part === 'whole_body') return `${t.adj} Dominion Aura`;
            if (part === 'torso') return `${t.noun} Perimeter Core`;
            if (part === 'skin') return `${t.coat} Domain Mantle`;
            if (part === 'eyes') return `${t.adj} Omni-Gaze Field`;
            if (part === 'throat') return `${t.adj} Resonant Field Roar`;
            if (part === 'fists') return `${t.prefix}-Field Strikes`;
            if (part === 'legs') return `${t.adj} Territorial Stride`;
            if (part === 'spine') return `${t.adj} Neural Domain Axis`;
            if (part === 'arms') return `${t.adj} Radial Ward Bracers`;
            if (part === 'weapon_grip') return `${t.noun} Domain Rending Blade`;
            break;
    }
    return HLAKBIL_ANATOMY_BASE[elKey][part] || `${t.noun} Infusion`;
}

// 4. ELEMENT × SHAPE MATRIX (Standard Manifestations)
const ELEMENT_SHAPE_MANIFESTATIONS = {
    sfalhoy: {
        yangga: "a needle-thin spike of white-hot incandescent plasma",
        taddum: "a serrated, hyperthermic blade of oscillating fire",
        gilbo: "a superheated, compressed orb of volatile thermal plasma",
        yinla: "a focused, continuous ray of searing laser-grade heat",
        praba: "a roaring vertical wall of solid, repelling heat ripples and flame",
        ngisngi: "a rapidly whirling chakram halo of concentrated solar fire",
        apap: "a roaring, wide-angled cone of sweeping dragon-breath flames",
        abbay: "an omnidirectional 360-degree perimeter of scorching thermal updrafts",
        default: "a roiling, turbulent mass of combustible fire"
    },
    hanhum: {
        yangga: "a hyper-pressurized, needle-pointed icicle-water jet",
        taddum: "a high-frequency oscillating water-blade capable of laminar cutting",
        gilbo: "a dense, churning orb of cryogenic hydrostatic fluid",
        yinla: "an industrial-grade, ultra-high PSI hydro-abrasive cutting beam",
        praba: "a surging rectangular cascade of dense, impact-absorbing fluid",
        ngisngi: "a spinning annular ring of razor-sharp vortex currents",
        apap: "a torrential, expanding cone of high-pressure freezing spray",
        abbay: "a drowning tidal perimeter that submerges the entire designated zone",
        default: "a dense, heavy volume of pressurized water"
    },
    falga: {
        yangga: "a jagged, diamond-hard lance of dense calcified obsidian",
        taddum: "a heavy, razor-edged slab of tectonic flint and basalt",
        gilbo: "a solid, gravitationally dense boulder of compressed bedrock",
        yinla: "a focused, continuous spear-line of pulverized high-speed gravel and sand",
        praba: "an impenetrable, monolithic slab of fortified bedrock",
        ngisngi: "an orbiting ring of jagged, rapidly spinning stone shards",
        apap: "a violent, flaring cone of seismic debris and pulverized rock",
        abbay: "a field-wide bastion of upheaved tectonic plates and earthen spikes",
        default: "a heavy, compacted mass of mineral bedrock"
    },
    jalfinn: {
        yangga: "a hyper-compressed, needle-thin vortex spike of vacuum wind",
        taddum: "an invisible, sub-molecular slicing crescent of shearing gale",
        gilbo: "a howling, self-contained sphere of cyclonic barometric pressure",
        yinla: "a piercing, straight-line lance of high-mach laminar wind shear",
        praba: "a turbulent, pressurized air cushion that deflects incoming physical vector force",
        ngisngi: "a shrieking, spinning aerovane chakram of vacuum blades",
        apap: "a wide, flaring gale cone that flattens anything in its frontal path",
        abbay: "an expansive, 360-degree cyclonic tempest enclosing the battlefield",
        default: "a swirling vortex of high-velocity barometric wind"
    },
    iklad: {
        yangga: "a pinpoint, blinding bolt of ionized dielectric lightning",
        taddum: "a crackling, jagged arc-blade of pure high-voltage electricity",
        gilbo: "a humming, violently unstable ball lightning orb",
        yinla: "a blinding, continuous laser-straight arc of ionizing electrical discharge",
        praba: "an electrified Faraday screen that discharges high voltage upon contact",
        ngisngi: "a spinning corona ring of crackling electric arcs and magnetic induction",
        apap: "a branching, conical web of high-voltage fork lightning",
        abbay: "an electrified electromagnetic storm cage that ionizes the entire perimeter",
        default: "a crackling, unstable surge of raw high-voltage electricity"
    },
    erlaaw: {
        yangga: "a pinpoint needle of hard-light photonic radiation",
        taddum: "a gleaming, weightless light-saber of coherent solar luminance",
        gilbo: "a brilliant, miniature sun of blinding optical radiance",
        yinla: "a coherent, zero-dispersion beam of searing photonic laser light",
        praba: "a translucent, refractive prism sheet that disperses and refracts kinetic force",
        ngisngi: "a gleaming solar halo pulsing with rhythmic starlight flashes",
        apap: "an overwhelming, wide-angle flare of blinding optical radiation",
        abbay: "a domain of total optical daylight that purges all shadows and illuminates true forms",
        default: "a brilliant, concentrated mass of hard-light radiance"
    },
    worulim: {
        yangga: "a light-devouring needle of condensed null-space and void",
        taddum: "a razor-thin scythe of spatial excision that devours matter on contact",
        gilbo: "an event-horizon orb that pulls surrounding light into absolute darkness",
        yinla: "a focused, straight-line piercing beam of entropic nullification",
        praba: "an opaque wall of abyssal shadow that absorbs mana and deadens kinetic impact",
        ngisngi: "a revolving eclipse ring of dark matter and entropic tendrils",
        apap: "a suffocating cone of absolute darkness that snuffs out heat, sound, and light",
        abbay: "a creeping miasmic domain of sensory-nullifying shadow and cold",
        default: "a swirling, light-consuming shroud of abyssal darkness"
    },
    amin: {
        yangga: "a crystalline, needle-sharp dart of pure condensed ether",
        taddum: "a shimmering ethereal edge attuned to severing mana structures",
        gilbo: "a perfectly balanced, humming orb of unformatted astral power",
        yinla: "a dense, coherent ray of raw kinetic etheric resonance",
        praba: "a hexagonal lattice barrier of pure mana geometry",
        ngisngi: "a spinning runic ring of pure mana matrices",
        apap: "a sweeping, flaring wave of raw magical force",
        abbay: "a high-density mana field that destabilizes and overcharges local magical channels",
        default: "a concentrated, unformatted mass of pure kinetic mana"
    }
};

// ==========================================================================
// 5. MASTER 8×8×5 COMBINATORIAL IMPACT MATRIX (320 Permutations)
// ==========================================================================

const IMPACT_LORE_MATRIX = {
    bamtuk: {
        sfalhoy: {
            uruwak: "impacts and instantly erupts in a high-yield thermobaric fireball, superheating the ambient air and incinerating everything in the immediate blast zone",
            lalhwa: "the advancing firefront detonates in a rolling series of incendiary carpet explosions, engulfing the battlefield in an expanding wall of flame",
            hlakbil: "contact strikes release explosive thermobaric bursts directly from the imbued vessel, blasting foes backward with blinding backdraft",
            ruluwar: "the free-form flame construct detonates on telepathic command in directed thermobaric bursts while continuously reforming",
            iwati: "the enchanted relic permanently triggers incendiary thermal detonations upon forceful contact with solid matter"
        },
        hanhum: {
            uruwak: "explodes upon impact in a violent high-pressure hydraulic burst, drowning the area in catastrophic water-hammer shockwaves",
            lalhwa: "the sweeping tidal surge bursts outward across its entire front, releasing crushing hydraulic eruptions as it hits",
            hlakbil: "striking impacts release pressurized cavitation bursts, imploding biological tissue and shattering armor with hydraulic shock",
            ruluwar: "the fluid elemental mass ruptures into concussive hydraulic geysers wherever telepathically directed",
            iwati: "the relic permanently unleashes violent hydrostatic shockwave bursts on collision"
        },
        falga: {
            uruwak: "detonates like a subterranean seismic charge, cratering bedrock and blasting dense granite shrapnel in all directions",
            lalhwa: "the advancing earth wave erupts in cascading tectonic detonations that rupture terrain from below",
            hlakbil: "physical strikes trigger seismic bedrock explosions at the point of impact, pulverizing underlying bone and armor",
            ruluwar: "the floating stone construct ruptures in controlled seismic detonations at the caster's command",
            iwati: "the relic resonates with permanent seismic explosive matrices that detonate ground upon contact"
        },
        jalfinn: {
            uruwak: "discharges on impact as an atmospheric decompression burst, creating a deafening concussive air-blast that blows out eardrums",
            lalhwa: "the sweeping gale surge detonates in overlapping barometric microbursts that flatten the target zone",
            hlakbil: "each physical strike discharges an explosive compressed-air burst, hurling struck adversaries backward with pneumatic recoil",
            ruluwar: "the hovering vortex entity collapses inward before violently detonating into directed atmospheric shockwaves",
            iwati: "the enchanted relic releases an explosive decompression burst whenever struck"
        },
        iklad: {
            uruwak: "detonates in an ionizing thunderclap explosion, scattering high-voltage electromagnetic plasma across the blast radius",
            lalhwa: "the wide electrical front detonates in rolling chain-lightning thunderclaps across the entire vanguard",
            hlakbil: "physical impacts discharge explosive ionizing thunderclaps directly into the target's frame",
            ruluwar: "the lightning familiar explodes in cascading ball-lightning detonations before restabilizing",
            iwati: "the relic discharges high-voltage ionizing thunderclaps upon physical collision"
        },
        erlaaw: {
            uruwak: "erupts on contact in a blinding solar photoflash burst, scorching optics and vaporizing superficial matter",
            lalhwa: "the advancing wave of light flashes outward in a coordinated optical supernova burst",
            hlakbil: "strikes unleash point-blank blinding solar flash detonations upon contact",
            ruluwar: "the light construct detonates in directed flashes of radiant energy to disorient and incinerate",
            iwati: "the relic flashes with permanent solar burst detonations on impact"
        },
        worulim: {
            uruwak: "collapses outward in an entropic void eruption that rapidly decays and dissolves all material caught within",
            lalhwa: "the rolling darkness front erupts in cascading pockets of void detonations, decaying everything caught in the wave",
            hlakbil: "striking contact detonates an entropic void pulse directly inside the victim's defenses",
            ruluwar: "the void entity detonates in controlled entropic implosion-bursts that devour surrounding matter",
            iwati: "the relic discharges an entropic void detonation upon striking a target"
        },
        amin: {
            uruwak: "detonates in a raw astral etheric explosion, violently repelling physical matter and unraveling all active foreign mana",
            lalhwa: "the sweeping pure mana surge violently ruptures in overlapping etheric bursts, nullifying all magic in its path",
            hlakbil: "physical strikes discharge raw etheric explosions on impact, blasting apart foreign armor and shields",
            ruluwar: "the raw mana construct discharges voluntary etheric explosions to disrupt enemy formations",
            iwati: "the relic permanently unleashes pure kinetic ether bursts upon each strike"
        }
    },
    tupwok: {
        sfalhoy: {
            uruwak: "unleashes a blistering thermal backdraft shockwave that hammers foes backward with immense superheated kinetic recoil",
            lalhwa: "projects a sweeping wall of concussive thermal overpressure that knocks down entire frontline ranks",
            hlakbil: "somatic strikes release concussive flame shockwaves that send struck foes hurtling through the air",
            ruluwar: "the free-form flame lashes outward with heavy concussive thermal shockwaves",
            iwati: "the relic continuously discharges concussive kinetic thermal shockwaves on impact"
        },
        hanhum: {
            uruwak: "discharges a crushing tidal shockwave that slams opponents backward with the full force of an ocean breaker",
            lalhwa: "the sweeping surge rolls forward as an unbroken wall of concussive hydrostatic pressure",
            hlakbil: "physical impacts release crushing water-hammer shockwaves that disorient targets and shatter ribcages",
            ruluwar: "the fluid construct delivers heavy, sweeping hydraulic shockwaves across the field",
            iwati: "the relic permanently delivers concussive ocean-grade tidal force on every strike"
        },
        falga: {
            uruwak: "strikes with tectonic concussive force, sending violent tremors through armor, bone, and bedrock",
            lalhwa: "radiates a rolling seismic shockwave that shatters the earth and throws combatants from their feet",
            hlakbil: "somatic strikes discharge tectonic blunt-force shockwaves capable of buckling plate armor",
            ruluwar: "the earthen entity pounds the ground with relentless, concussive seismic tremors",
            iwati: "the relic permanently channels tectonic blunt shockwaves upon impact"
        },
        jalfinn: {
            uruwak: "hits with the concussive blunt impact of a supersonic barometric microburst",
            lalhwa: "unleashes an expansive atmospheric shockwave that flattens defensive barricades across the front",
            hlakbil: "strikes release supersonic pneumatic shockwaves that launch opponents across the battlefield",
            ruluwar: "the cyclonic entity sweeps the field with howling, concussive pressure waves",
            iwati: "the relic permanently releases supersonic air-blast shockwaves on impact"
        },
        iklad: {
            uruwak: "releases an electromagnetic shockwave that throws foes backward while inducing neuromuscular paralysis",
            lalhwa: "unleashes a sweeping ionic shockwave that disrupts enemy balance and short-circuits magical defenses",
            hlakbil: "somatic strikes discharge electromagnetic concussive shockwaves directly into the target's frame",
            ruluwar: "the storm entity pulses with heavy electromagnetic shockwaves that buffet nearby targets",
            iwati: "the relic permanently discharges concussive electromagnetic shockwaves on impact"
        },
        erlaaw: {
            uruwak: "delivers an overwhelming photonic radiation pulse that shoves matter backward with pure light pressure",
            lalhwa: "sweeps the battlefield with a high-intensity radiant shockwave that staggers enemy formations",
            hlakbil: "strikes release concussive hard-light forcewaves that throw foes backward on contact",
            ruluwar: "the luminous construct pulses with radiant light-pressure shockwaves",
            iwati: "the relic permanently delivers concussive photonic forcewaves upon striking"
        },
        worulim: {
            uruwak: "unleashes a heavy, suffocating wave of negative pressure that crushes breath and destabilizes footing",
            lalhwa: "rolls across the field as a suffocating wave of gravity-deadening negative pressure",
            hlakbil: "somatic strikes discharge heavy void-pressure forcewaves that sap enemy momentum and vigor",
            ruluwar: "the void construct pulses with crushing waves of suffocating negative pressure",
            iwati: "the relic permanently projects heavy negative-pressure shockwaves on impact"
        },
        amin: {
            uruwak: "releases a pure concussive forcewave of unaspected kinetic ether that knocks back physical matter",
            lalhwa: "advances as an immense wall of raw kinetic mana force that sweeps aside enemy lines",
            hlakbil: "strikes discharge pure kinetic ether shockwaves that shatter defensive stances",
            ruluwar: "the mana construct slams targets with heavy waves of pure etheric force",
            iwati: "the relic permanently delivers raw kinetic ether shockwaves on contact"
        }
    },
    dukto: {
        sfalhoy: {
            uruwak: "superheats into a needle-thin white-hot thermal lance that melts cleanly through heavy armor plate",
            lalhwa: "the sweeping surge concentrates into thousands of needle-sharp thermal lances that riddle the front",
            hlakbil: "somatic strikes pierce through armor and shields like white-hot burning lances",
            ruluwar: "the flame construct dynamically extends needle-thin thermal lances to skewer distant targets",
            iwati: "the relic permanently pierces heavy armor with a white-hot thermal point"
        },
        hanhum: {
            uruwak: "focuses into an industrial-grade ultra-high PSI hydro-abrasive jet that punches through stone and steel",
            lalhwa: "the sweeping wave focuses into a line of high-pressure cutting jets that bore through barricades",
            hlakbil: "somatic strikes focus into high-PSI hydro-piercing points that drill through enemy plate",
            ruluwar: "the fluid construct extends high-velocity hydro-jets that puncture fortified defenses",
            iwati: "the relic permanently pierces defenses with an ultra-high PSI hydro-jet edge"
        },
        falga: {
            uruwak: "drives an adamantine obsidian point straight through enemy fortifications with overwhelming mineral mass",
            lalhwa: "upheaves a frontline row of diamond-dense stalagmites that impale advancing foes from below",
            hlakbil: "somatic strikes drive adamantine bedrock spikes clean through enemy armor and bone",
            ruluwar: "the earthen construct manifests dense stone lances that spear through enemy lines",
            iwati: "the relic permanently strikes with an adamantine armor-piercing mineral point"
        },
        jalfinn: {
            uruwak: "compresses into a frictionless vacuum vortex that drills cleanly through physical barriers",
            lalhwa: "the advancing gale condenses into a sweeping row of needle-fine vacuum drills",
            hlakbil: "somatic strikes drill through defenses using frictionless vacuum needle-points",
            ruluwar: "the wind entity projects high-mach needle-thin vacuum vortexes to bore through cover",
            iwati: "the relic permanently bores through armor with frictionless vacuum drill energy"
        },
        iklad: {
            uruwak: "concentrates into a dielectric breakdown arc that burns a pinpoint hole straight through defensive shielding",
            lalhwa: "discharges a wide grid of pinpoint ionizing needle-arcs that puncture defensive lines simultaneously",
            hlakbil: "somatic strikes channel dielectric breakdown arcs that bore straight through conductive armor",
            ruluwar: "the lightning construct hurls pinpoint dielectric breakdown needles at designated weak points",
            iwati: "the relic permanently burns pinpoint puncture holes through armor with electric discharge"
        },
        erlaaw: {
            uruwak: "channels coherent gamma-photons into a pinpoint optical laser that bores through physical defenses instantaneously",
            lalhwa: "sweeps a grid of parallel high-intensity laser lines that puncture through defensive ranks",
            hlakbil: "somatic strikes project pinpoint optical laser needles directly from the limbs",
            ruluwar: "the luminous entity projects coherent optical lasers that bore through distant targets",
            iwati: "the relic permanently pierces defenses with a coherent optical laser point"
        },
        worulim: {
            uruwak: "excises a clean dimensional hole straight through defenses by erasing the matter within its path",
            lalhwa: "sweeps an advancing boundary of void needles that erase matter along the frontline",
            hlakbil: "somatic strikes excise clean holes through enemy armor by dissolving matter into the void",
            ruluwar: "the void entity projects fine void needles that bypass physical toughness by erasing matter",
            iwati: "the relic permanently erases matter on contact to pierce all physical defenses"
        },
        amin: {
            uruwak: "channels raw etheric resonance to puncture cleanly through foreign magical wards and physical plate alike",
            lalhwa: "sweeps an array of etheric needle-lances that puncture foreign mana barriers simultaneously",
            hlakbil: "somatic strikes drive raw etheric needles straight through foreign magical wards",
            ruluwar: "the mana entity fires pure etheric darts that puncture foreign spells and physical shields",
            iwati: "the relic permanently pierces foreign wards and armor with raw etheric resonance"
        }
    },
    iwa: {
        sfalhoy: {
            uruwak: "scatters into razor-thin arcs of flame that sear and slice through flesh and steel alike",
            lalhwa: "unleashes a sweeping horizontal crescent of roaring flame blades across the entire vanguard",
            hlakbil: "somatic strikes shear through targets with razor-thin incandescent flame edges",
            ruluwar: "the flame construct morphs into oscillating fire scythes that slice cleanly through matter",
            iwati: "the relic permanently maintains a hyperthermic slicing edge of pure fire"
        },
        hanhum: {
            uruwak: "accelerates into high-frequency laminar fluid streams that slice cleanly through armor plates",
            lalhwa: "advances as an unbroken guillotine wave of oscillating water blades that cleaves the frontline",
            hlakbil: "somatic strikes slice through defenses using high-frequency laminar water-blades",
            ruluwar: "the fluid mass whips into high-speed liquid sawblades that cleave targets on command",
            iwati: "the relic permanently maintains an oscillating laminar cutting water-edge"
        },
        falga: {
            uruwak: "cleaves with the razor-honed obsidian edge of an ancient tectonic shear line",
            lalhwa: "upheaves a frontline row of razor-sharp basalt blades that slice advancing ranks",
            hlakbil: "somatic strikes cleave through armor like sharpened tectonic obsidian blades",
            ruluwar: "the earthen entity forms sweeping basalt scythes to slice through fortifications",
            iwati: "the relic permanently cuts with the razor-sharp edge of tectonic obsidian"
        },
        jalfinn: {
            uruwak: "unleashes dozens of invisible, molecular-level vacuum blades that shear effortlessly through matter",
            lalhwa: "sweeps an advancing grid of horizontal vacuum guillotines that decapitate frontline defenses",
            hlakbil: "somatic strikes cut with molecular-level vacuum blades formed over the limbs",
            ruluwar: "the wind construct flings invisible crescents of vacuum shears that cleave targets at range",
            iwati: "the relic permanently maintains a molecular vacuum shearing edge"
        },
        iklad: {
            uruwak: "slits through defenses using searing, high-amperage electrical ribbons",
            lalhwa: "sweeps a horizontal curtain of ionizing lightning ribbons that cleave across enemy lines",
            hlakbil: "somatic strikes shear through targets using high-voltage ionizing electric ribbons",
            ruluwar: "the storm entity lashes out with whipping electric blades that slice on contact",
            iwati: "the relic permanently cleaves through defenses with searing electric ribbons"
        },
        erlaaw: {
            uruwak: "shears through defenses with a razor-thin beam of pure hard-light radiance",
            lalhwa: "projects an advancing laser curtain that cleaves through enemy ranks with photonic precision",
            hlakbil: "somatic strikes slice through matter using hard-light laser edges",
            ruluwar: "the light entity wields sweeping hard-light sabers that shear through obstacles",
            iwati: "the relic permanently maintains a razor-sharp hard-light laser cutting edge"
        },
        worulim: {
            uruwak: "shears through targets along spatial fault lines, ignoring conventional physical toughness",
            lalhwa: "advances as a rolling wave of spatial shear lines that cleaves matter into the void",
            hlakbil: "somatic strikes slice through targets along spatial fault lines to excise physical matter",
            ruluwar: "the void construct whips out ribbons of spatial excision that slice cleanly through armor",
            iwati: "the relic permanently cuts along spatial fault lines to ignore physical resistance"
        },
        amin: {
            uruwak: "cleaves cleanly through magical constructs and flesh with an edge of pure compressed mana",
            lalhwa: "sweeps a wide etheric blade wave that severs magical bonds and physical armor alike",
            hlakbil: "somatic strikes cleave through matter and spell matrices with edges of pure mana",
            ruluwar: "the mana construct manifests sweeping etheric blades that sever foreign spell constructs",
            iwati: "the relic permanently cleaves through magic and armor with compressed ether edges"
        }
    },
    pittip: {
        sfalhoy: {
            uruwak: "generates an inescapable crucible of downward thermal pressure that melts target foundations",
            lalhwa: "blankets the zone in a heavy thermal downdraft that pins enemies beneath blistering heat pressure",
            hlakbil: "somatic strikes slam downward with extreme thermal compressive force, buckling target stances",
            ruluwar: "the flame construct descends as a heavy crucible of fire, crushing targets into the ground",
            iwati: "the relic permanently exerts downward thermal compressive force on impact"
        },
        hanhum: {
            uruwak: "subjects the impact area to crushing deep-sea hydrostatic pressure that buckles metal",
            lalhwa: "inundates the field beneath thousands of tons of crushing hydrostatic overburden",
            hlakbil: "somatic strikes deliver deep-sea hydrostatic pressure that crushes internal structures",
            ruluwar: "the fluid mass collapses downward onto targets with the crushing weight of an ocean trench",
            iwati: "the relic permanently applies crushing deep-sea hydrostatic pressure upon contact"
        },
        falga: {
            uruwak: "collapses downward with the crushing weight of an entire mountain overburden",
            lalhwa: "compresses the entire battlefield beneath an overwhelming tectonic gravity lock",
            hlakbil: "somatic strikes hammer downward with the crushing density of solid bedrock",
            ruluwar: "the earthen entity pins enemies beneath massive boulders of compressed bedrock",
            iwati: "the relic permanently crushes targets beneath the weight of tectonic bedrock"
        },
        jalfinn: {
            uruwak: "creates an extreme high-pressure atmospheric pocket that pins targets helplessly to the ground",
            lalhwa: "unleashes a colossal downdraft of pressurized air that flattens everything within the zone",
            hlakbil: "somatic strikes generate intense atmospheric downdrafts that force opponents to their knees",
            ruluwar: "the cyclonic entity exerts immense barometric downward pressure to immobilize targets",
            iwati: "the relic permanently exerts crushing atmospheric pressure upon each strike"
        },
        iklad: {
            uruwak: "pins targets beneath intense magnetic downward induction that crushes metal armaments",
            lalhwa: "blankets the area in an electromagnetic gravity field that grounds and crushes enemy vanguard lines",
            hlakbil: "somatic strikes channel intense downward magnetic induction to pin opponents to the earth",
            ruluwar: "the lightning construct forces targets down beneath heavy electromagnetic pressure",
            iwati: "the relic permanently applies crushing magnetic induction force on impact"
        },
        erlaaw: {
            uruwak: "manifests solid hard-light gravity pillars that pin down and crush hostile targets",
            lalhwa: "brings down an array of hard-light gravity pillars across the entire target sector",
            hlakbil: "somatic strikes slam downward with solid hard-light pillars that crush target foundations",
            ruluwar: "the luminous entity shapes hard-light presses to pin and crush targets from above",
            iwati: "the relic permanently crushes targets beneath hard-light gravitational pillars"
        },
        worulim: {
            uruwak: "drags victims downward beneath the relentless crushing gravity of an event horizon",
            lalhwa: "sinks the entire combat zone into a heavy event-horizon gravity field that crushes breath and movement",
            hlakbil: "somatic strikes inflict event-horizon gravitational weight that drags struck foes into the ground",
            ruluwar: "the void construct manifests a micro-singularity that crushes surrounding matter into its core",
            iwati: "the relic permanently crushes targets beneath event-horizon gravitational pressure"
        },
        amin: {
            uruwak: "crushes targets beneath an overwhelming density of raw astral ether pressure",
            lalhwa: "blankets the battlefield beneath a suffocating ceiling of pure mana overburden",
            hlakbil: "somatic strikes hammer downward with concentrated astral force that buckles stances",
            ruluwar: "the mana construct descends upon targets as a heavy hammer of pure etheric density",
            iwati: "the relic permanently applies crushing astral ether pressure on every strike"
        }
    },
    waras: {
        sfalhoy: {
            uruwak: "bursts on impact into a deadly shower of white phosphorus incendiary embers that pepper the area",
            lalhwa: "the advancing flame surge fractures into hundreds of incendiary sub-munitions that saturate the field",
            hlakbil: "somatic strikes burst into a spray of burning incendiary embers that scorch surrounding foes",
            ruluwar: "the flame construct scatters clusters of floating incendiary embers across enemy ranks",
            iwati: "the relic permanently scatters incendiary embers across surrounding targets on impact"
        },
        hanhum: {
            uruwak: "disperses into an explosive spray of sub-zero ice needles and freezing mist that blankets the area",
            lalhwa: "the sweeping wave shatters into a broad flurry of high-velocity ice darts across the frontline",
            hlakbil: "somatic strikes disperse into a spray of sub-zero ice needles that pierce surrounding foes",
            ruluwar: "the fluid entity flings volleys of freezing ice darts in all directions",
            iwati: "the relic permanently scatters cryogenic ice needles upon physical collision"
        },
        falga: {
            uruwak: "explodes on impact into a lethal cloud of high-velocity gravel and granite flak",
            lalhwa: "the seismic surge shatters into a field-wide storm of razor-sharp stone shrapnel",
            hlakbil: "somatic strikes erupt into a spray of high-velocity mineral flak that peppers nearby enemies",
            ruluwar: "the earthen entity hurls clouds of jagged granite flak into surrounding ranks",
            iwati: "the relic permanently discharges high-velocity stone flak upon striking matter"
        },
        jalfinn: {
            uruwak: "scatters into a turbulent maelstrom of unpredictable micro-cyclones that buffet nearby foes",
            lalhwa: "the wind surge breaks into hundreds of swirling vortex needles that saturate the target zone",
            hlakbil: "somatic strikes scatter into miniature vacuum whirlwinds that disrupt nearby enemies",
            ruluwar: "the cyclonic entity fragments into a swarm of tracking micro-cyclones",
            iwati: "the relic permanently scatters turbulent micro-vortexes upon every impact"
        },
        iklad: {
            uruwak: "splits upon impact into dozens of secondary fork-lightning arcs that hunt nearby conductors",
            lalhwa: "the electrical surge breaks into a wide storm of branching lightning arcs across the frontline",
            hlakbil: "somatic strikes discharge a storm of secondary electric arcs that shock surrounding targets",
            ruluwar: "the storm entity continuously fires off showers of branching secondary spark arcs",
            iwati: "the relic permanently scatters branching fork-lightning arcs to adjacent enemies on impact"
        },
        erlaaw: {
            uruwak: "scatters into hundreds of radiant micro-flares that light up and burn the entire area",
            lalhwa: "the light surge fragments into a dense shower of radiant photonic darts across the battlefield",
            hlakbil: "somatic strikes burst into a spray of radiant micro-flares that blind nearby foes",
            ruluwar: "the light construct scatters orbiting micro-flares that seek out target blind spots",
            iwati: "the relic permanently scatters radiant micro-flares upon physical impact"
        },
        worulim: {
            uruwak: "dissolves on contact into creeping tendrils of living shadow that seek out and smother surviving foes",
            lalhwa: "the darkness wave breaks into hundreds of creeping shadow tendrils that bind the frontline",
            hlakbil: "somatic strikes scatter creeping tendrils of living shadow that latch onto nearby enemies",
            ruluwar: "the void construct sends out seeking tendrils of shadow to ensnare surrounding targets",
            iwati: "the relic permanently scatters creeping void tendrils onto struck adversaries"
        },
        amin: {
            uruwak: "fragments into a flurry of homing mana darts that pepper surrounding targets with kinetic force",
            lalhwa: "the mana surge breaks into an expansive salvo of etheric darts that riddle the target zone",
            hlakbil: "somatic strikes scatter homing mana darts that strike surrounding adversaries",
            ruluwar: "the mana entity disperses swarms of etheric darts to pepper enemy defenses",
            iwati: "the relic permanently scatters homing mana darts upon physical collision"
        }
    },
    tublag: {
        sfalhoy: {
            uruwak: "ricochets cleanly off solid obstacles, leaving scorched trails of combustion along its deflection path",
            lalhwa: "the fire wave rebounds off physical barriers, folding back into secondary overlapping flame fronts",
            hlakbil: "somatic strikes rebound elastically off enemy guards, seamlessly chaining momentum into follow-up strikes",
            ruluwar: "the flame construct bounces elastically between targets, scorching each in sequence",
            iwati: "the relic permanently rebounds off hard surfaces without losing kinetic combustion energy"
        },
        hanhum: {
            uruwak: "flows and rebounds cleanly off obstacles as an unbroken, pressurized fluid stream",
            lalhwa: "the tidal surge rebounds off fortified walls, creating secondary turbulent backwash waves",
            hlakbil: "somatic strikes flow and ricochet off enemy parries to strike instantly from flank angles",
            ruluwar: "the fluid mass rebounds cleanly from surface to surface like a pressurized liquid whip",
            iwati: "the relic permanently ricochets off solid surfaces as an unbroken fluid conduit"
        },
        falga: {
            uruwak: "bounces heavily off hard surfaces, carving deep furrows into terrain without losing momentum",
            lalhwa: "the seismic surge reflects off bedrock boundaries to create secondary crushing shockwaves",
            hlakbil: "somatic strikes rebound with tectonic elasticity, transferring kinetic shock through multiple targets",
            ruluwar: "the stone construct ricochets heavily across the battlefield like a bowling boulder",
            iwati: "the relic permanently bounces off solid stone while retaining full tectonic mass momentum"
        },
        jalfinn: {
            uruwak: "deflects smoothly across obstacles, using air resistance to whip violently into secondary trajectories",
            lalhwa: "the wind surge reflects off terrain walls, creating turbulent cross-breeze shears",
            hlakbil: "somatic strikes deflect seamlessly off enemy blocks, whipping into unexpected reverse strikes",
            ruluwar: "the cyclonic entity ricochets across the field using air currents to accelerate between bounces",
            iwati: "the relic permanently deflects and whips into secondary angles on impact"
        },
        iklad: {
            uruwak: "leaps from surface to surface like an autonomous Tesla arc without loss of charge",
            lalhwa: "the electric front bounces across conducting terrain, creating a zigzagging storm grid",
            hlakbil: "somatic strikes rebound as high-voltage electric arcs that leap into adjacent foes",
            ruluwar: "the storm entity ricochets between conductive targets in a continuous electric cascade",
            iwati: "the relic permanently leaps from surface to surface as an undiminished Tesla arc"
        },
        erlaaw: {
            uruwak: "reflects perfectly off crystalline and polished surfaces, striking targets from impossible reflective angles",
            lalhwa: "the light surge reflects off ambient surfaces, filling the battlefield with a crisscrossing laser cage",
            hlakbil: "somatic strikes reflect specular hard-light energy off enemy defenses into secondary targets",
            ruluwar: "the light construct reflects across reflective surfaces at photonic speeds",
            iwati: "the relic permanently reflects off solid surfaces with zero photonic dispersion"
        },
        worulim: {
            uruwak: "phases smoothly through initial impacts before emerging from nearby shadows to strike anew",
            lalhwa: "the darkness wave rebounds through shadow dimensions to strike from unexpected blind spots",
            hlakbil: "somatic strikes rebound through shadow portals to strike adversaries from behind",
            ruluwar: "the void entity phases into surface shadows before ricocheting out to strike again",
            iwati: "the relic permanently rebounds through shadow dimensions on contact"
        },
        amin: {
            uruwak: "rebounds elastically off physical surfaces while retaining full kinetic momentum",
            lalhwa: "the mana surge reflects off magical barriers to double back and strike from flank vectors",
            hlakbil: "somatic strikes rebound with pure etheric elasticity to chain rapid-fire combos",
            ruluwar: "the mana construct ricochets elastically between enemies like a pure kinetic sphere",
            iwati: "the relic permanently bounces off physical obstacles while maintaining full etheric charge"
        }
    },
    tigkab: {
        sfalhoy: {
            uruwak: "fractures violently into shards of burning volcanic glass and superheated slag",
            lalhwa: "the flame front crystallizes and shatters into a field of burning glass shrapnel",
            hlakbil: "somatic strikes rupture into jagged shards of volcanic glass that embed in target armor",
            ruluwar: "the flame entity shatters its outer shell into burning slag before regenerating",
            iwati: "the relic permanently fractures into superheated obsidian shrapnel on impact"
        },
        hanhum: {
            uruwak: "flash-freezes upon contact, shattering instantly into hundreds of razor-sharp cryogenic shards",
            lalhwa: "the advancing deluge flash-freezes and shatters into a crushing wave of ice shrapnel",
            hlakbil: "somatic strikes flash-freeze the point of impact, shattering into razor-sharp glacial shards",
            ruluwar: "the fluid mass freezes and shatters into spinning ice blades on command",
            iwati: "the relic permanently flash-freezes and shatters into cryogenic ice shards on impact"
        },
        falga: {
            uruwak: "shatters violently on impact, raining jagged obsidian and granite shrapnel over the area",
            lalhwa: "the seismic surge shatters the terrain into an advancing storm of razor-edged rock fragments",
            hlakbil: "somatic strikes fracture into high-velocity granite shrapnel upon hitting armor",
            ruluwar: "the stone construct fractures into razor-sharp rock fragments to shred nearby foes",
            iwati: "the relic permanently shatters into jagged granite shrapnel upon collision"
        },
        jalfinn: {
            uruwak: "cavitation pockets implode simultaneously, producing a deafening wave of sonic shrapnel",
            lalhwa: "the wind surge ruptures in a field-wide cavitation wave that shatters fragile structures",
            hlakbil: "somatic strikes trigger sonic cavitation implosions that shatter defenses from within",
            ruluwar: "the cyclonic entity detonates its cavitation pockets to unleash sonic shrapnel",
            iwati: "the relic permanently produces sonic cavitation implosions on impact"
        },
        iklad: {
            uruwak: "causes explosive electrical vaporization, scattering superheated sparks and ionized slag",
            lalhwa: "the electrical front vaporizes surface matter, scattering a blinding cloud of ionized sparks",
            hlakbil: "somatic strikes cause explosive electrical vaporization, blasting ionized slag into the target",
            ruluwar: "the storm entity ruptures in bursts of electrical vaporization that shred metal",
            iwati: "the relic permanently vaporizes matter into explosive ionized slag on contact"
        },
        erlaaw: {
            uruwak: "crystallizes into prismatic hard-light glass before shattering into radiant light shards",
            lalhwa: "the light front solidifies into a crystal sheet that shatters across enemy ranks",
            hlakbil: "somatic strikes crystallize into hard-light glass that shatters into radiant needle-shards",
            ruluwar: "the light construct crystallizes and shatters into radiant glass shards at will",
            iwati: "the relic permanently shatters into radiant hard-light glass shards on impact"
        },
        worulim: {
            uruwak: "ruptures into a cloud of jagged dark-matter crystals that corrode matter on contact",
            lalhwa: "the void surge solidifies into entropic dark crystals that shatter across the field",
            hlakbil: "somatic strikes rupture into dark-matter crystal shards that corrode flesh and steel",
            ruluwar: "the void entity shatters its dark-matter shell into corroding crystal shards",
            iwati: "the relic permanently shatters into corrosive dark-matter crystal shards upon collision"
        },
        amin: {
            uruwak: "crystallizes into volatile mana quartz that shatters in a secondary cascade of kinetic fragments",
            lalhwa: "the mana surge solidifies into an etheric lattice that shatters across the entire frontline",
            hlakbil: "somatic strikes crystallize into volatile mana quartz that shatters through foreign armor",
            ruluwar: "the mana construct crystallizes and shatters into kinetic quartz fragments on command",
            iwati: "the relic permanently shatters into volatile kinetic mana quartz shards on contact"
        }
    }
};

// ==========================================================================
// 6. MASTER 8×8×5 COMBINATORIAL MOVEMENT MATRIX (320 Permutations)
// ==========================================================================

const MOVEMENT_LORE_MATRIX = {
    surut: {
        sfalhoy: {
            uruwak: "curving in a hungry homing arc to track the evasive movements and thermal heat of its quarry",
            lalhwa: "the sweeping firefront dynamically bends its advancing flanks to pursue fleeing enemy clusters",
            hlakbil: "somatic strikes autonomously correct their striking trajectory to track target weak points",
            ruluwar: "the flame entity relentlessly pursues and stalks designated quarry across any terrain",
            iwati: "the relic's strikes autonomously curve toward marked adversary targets upon swing"
        },
        hanhum: {
            uruwak: "weaving through fluid homing curves like an aquatic predator tracking its quarry",
            lalhwa: "the tidal surge dynamically redirects its currents to engulf shifting enemy formations",
            hlakbil: "somatic strikes flow along optimal pursuit vectors, tracking target evasion effortlessly",
            ruluwar: "the fluid mass navigates obstacles like a living serpent to chase down designated foes",
            iwati: "the relic flows toward target vitals on every swing, correcting aim mid-attack"
        },
        falga: {
            uruwak: "banking heavily along guided subterranean and aerial trajectories to hunt marked targets",
            lalhwa: "the seismic earth wave tracks subterranean fault lines to pursue running foes",
            hlakbil: "somatic blows gravitate toward target centers of balance, tracking footing adjustments",
            ruluwar: "the stone construct relentlessly lumbers after marked adversaries without losing quarry lock",
            iwati: "the relic's heavy mass magnetically guides itself toward the target's armor keystones"
        },
        jalfinn: {
            uruwak: "riding dynamic atmospheric slipstreams that bank sharply to follow evasive targets",
            lalhwa: "the cyclonic front shifts its barometric axis to chase moving enemy formations",
            hlakbil: "somatic strikes whip along wind currents to track and intercept dodging adversaries",
            ruluwar: "the tempest entity maneuvers with zero-drag agility to pursue quarry relentlessly",
            iwati: "the relic whips along slipstream vectors to chase down targets on every strike"
        },
        iklad: {
            uruwak: "zigzagging autonomously along ionizing dielectric paths that home into target bio-electricity",
            lalhwa: "the electrical surge branches toward the densest cluster of conductive armor on the field",
            hlakbil: "somatic strikes snap along neuromuscular electric pathways, homing into struck foes",
            ruluwar: "the storm familiar darts through the air at lightning speed to intercept dodging targets",
            iwati: "the relic discharges seeking electric arcs that home into target conductors on swing"
        },
        erlaaw: {
            uruwak: "refracting continuously through ambient vectors to pursue marked targets with zero latency",
            lalhwa: "the sweeping light wave curves its illumination vectors to track evasive frontline troops",
            hlakbil: "somatic strikes track optical vectors, landing on the quarry with pinpoint photonic precision",
            ruluwar: "the luminous construct tracks and illuminates target positions with unrelenting speed",
            iwati: "the relic's hard-light edge refracts toward target vitals instantaneously upon attack"
        },
        worulim: {
            uruwak: "slithering through shadow contours to relentlessly pursue the target's life essence",
            lalhwa: "the darkness wave creeps along terrain shadows to engulf fleeing enemy ranks",
            hlakbil: "somatic strikes track the target's shadow, ensuring unavoidable physical connection",
            ruluwar: "the void construct stalks marked prey through the nether, emerging to intercept them",
            iwati: "the relic's void edge homes toward target soul signatures with eerie precision"
        },
        amin: {
            uruwak: "tracking foreign mana signatures with true-seeking etheric resonance",
            lalhwa: "the pure mana surge bends its advancing geometry to hunt down foreign spellcasters",
            hlakbil: "somatic strikes home into active foreign spell matrices and mana pathways",
            ruluwar: "the mana construct autonomously seeks out and intercepts hostile spellcasters",
            iwati: "the relic's etheric edge guides itself toward active foreign magical fields"
        }
    },
    blisu: {
        sfalhoy: {
            uruwak: "curving in a broad returning arc to streak back toward the caster's hand like an incendiary boomerang",
            lalhwa: "the firefront surges outward before rolling back in a secondary reverse conflagration",
            hlakbil: "somatic strikes spring-load kinetic recoil, snapping limbs instantly back to guard position",
            ruluwar: "the flame construct strikes out before returning to hover defensively at the caster's side",
            iwati: "the relic can be hurled through the air and returns smoothly to the wielder's grip"
        },
        hanhum: {
            uruwak: "looping back along a fluid returning arc, striking through targets a second time on its return",
            lalhwa: "the tidal wave surges outward before creating a crushing reverse backwash wave toward origin",
            hlakbil: "somatic strikes flow back with hydraulic elasticity, recovering guard instantly",
            ruluwar: "the fluid mass lashes outward before returning to re-integrate with the caster's aura",
            iwati: "the relic returns to the wielder's hand through a pressurized fluid tether when thrown"
        },
        falga: {
            uruwak: "banking in a heavy parabolic return arc to strike the quarry from behind on its way back",
            lalhwa: "the seismic wave rolls outward before folding backward in a secondary crushing ground tremor",
            hlakbil: "somatic blows rebound off targets with tectonic elasticity to reset defensive stance",
            ruluwar: "the earthen projectile returns to the stone golem's mass after impacting targets",
            iwati: "the relic returns directly to the wielder's grip via gravitational magnetic recall"
        },
        jalfinn: {
            uruwak: "whipping around in a high-speed returning slipstream loop back to the caster's grasp",
            lalhwa: "the gale wave sweeps outward before generating a reverse vacuum pull back toward origin",
            hlakbil: "somatic strikes use pneumatic recoil to snap limbs back into striking position instantaneously",
            ruluwar: "the wind construct darts forward to strike before returning to circle the caster",
            iwati: "the relic whips back to the wielder's hand on a returning vacuum slipstream"
        },
        iklad: {
            uruwak: "arcing through target lines before returning as a crackling lightning bolt to the caster",
            lalhwa: "the electric front surges outward before arcing back along grounded paths to origin",
            hlakbil: "somatic strikes use bio-electric recoil to reset limbs at lightning speeds",
            ruluwar: "the lightning familiar strikes distant targets before darting back to the caster's shoulder",
            iwati: "the relic recalls itself to the wielder's hand via electromagnetic induction tether"
        },
        erlaaw: {
            uruwak: "reflecting across distant coordinates before returning to the caster as a hard-light ray",
            lalhwa: "the light surge expands across the field before refracting backward into the caster's focus",
            hlakbil: "somatic strikes reset with photonic speed, snapping back into perfect form",
            ruluwar: "the light avatar flashes forward to strike before reforming at the caster's position",
            iwati: "the relic teleports back to the wielder's grasp via hard-light photonic recall"
        },
        worulim: {
            uruwak: "passing through targets into the shadow realm before emerging to return to the caster's hand",
            lalhwa: "the darkness wave rolls forward before drawing shadows back toward the caster's core",
            hlakbil: "somatic strikes phase through targets and snap back through shadow space to guard",
            ruluwar: "the void construct attacks and collapses back into the caster's shadow",
            iwati: "the relic returns to the wielder through a shadow portal when thrown"
        },
        amin: {
            uruwak: "looping back along pure etheric ley lines to return to the caster's casting focus",
            lalhwa: "the mana surge sweeps forward before contracting back into the caster's mana pool",
            hlakbil: "somatic strikes rebound elastically with pure mana force to chain continuous combos",
            ruluwar: "the mana construct strikes and reconstitutes immediately around the caster",
            iwati: "the relic recalls itself through an etheric mana tether directly to the wielder's hand"
        }
    },
    liwak: {
        sfalhoy: {
            uruwak: "settling into a rapid, revolving orbital perimeter of spinning fireballs around the anchor",
            lalhwa: "creating an expanding, revolving vortex of fire that circles the battlefield",
            hlakbil: "igniting orbiting halos of flame that revolve rapidly around the caster's limbs and torso",
            ruluwar: "the flame construct revolves in continuous defensive orbital rings around the caster",
            iwati: "the relic causes orbiting flame rings to permanently revolve around the wielder"
        },
        hanhum: {
            uruwak: "entering an unbroken orbital current of pressurized water revolving around the target area",
            lalhwa: "creating a sweeping, revolving maelstrom perimeter that circles the combat zone",
            hlakbil: "encasing the caster in revolving rings of high-velocity laminar cutting water",
            ruluwar: "the fluid entity circles the caster as a continuous, rotating liquid barrier",
            iwati: "the relic maintains revolving orbital fluid shields around the wielder"
        },
        falga: {
            uruwak: "settling into an orbital ring of dense basalt boulders revolving around the anchor point",
            lalhwa: "upheaving revolving monoliths of granite that circle and crush the battlefield perimeter",
            hlakbil: "manifesting orbiting stone shields that revolve around the caster's somatic vessel",
            ruluwar: "the earthen construct commands a belt of orbiting stone satellites for defense",
            iwati: "the relic permanently maintains orbiting granite plates around the wielder"
        },
        jalfinn: {
            uruwak: "entering a perpetual cyclonic orbit of screaming vacuum blades around the anchor",
            lalhwa: "spinning the entire sector into a revolving hurricane perimeter of gale shears",
            hlakbil: "surrounding the caster in rapidly revolving chakram rings of razor-sharp wind",
            ruluwar: "the tempest entity continuously orbits the caster as a shrieking aerodynamic shield",
            iwati: "the relic permanently maintains revolving cyclonic wind rings around the wielder"
        },
        iklad: {
            uruwak: "forming a crackling orbital cage of ball-lightning orbs revolving at high speeds",
            lalhwa: "generating an expansive, revolving cyclone of high-voltage lightning arcs",
            hlakbil: "surrounding the caster in revolving rings of crackling electromagnetic arcs",
            ruluwar: "the lightning construct orbits the caster as a continuous, buzzing electric corona",
            iwati: "the relic permanently maintains revolving dielectric lightning rings around the wielder"
        },
        erlaaw: {
            uruwak: "entering a brilliant orbital rotation of hard-light prisms revolving around the focal coordinate",
            lalhwa: "creating an expansive, revolving halo perimeter of blinding solar radiance",
            hlakbil: "encasing the caster in revolving solar halos that deflect incoming kinetic attacks",
            ruluwar: "the luminous construct orbits the caster as a constellation of protective hard-light stars",
            iwati: "the relic permanently maintains revolving solar hard-light shields around the wielder"
        },
        worulim: {
            uruwak: "entering a slow, light-devouring eclipse orbit of void spheres around the anchor",
            lalhwa: "creating a revolving perimeter of creeping darkness that circles the battlefield",
            hlakbil: "surrounding the caster in revolving eclipse halos that devour incoming foreign mana",
            ruluwar: "the void construct revolves around the caster as a protective event-horizon ring",
            iwati: "the relic permanently maintains revolving void-shroud orbits around the wielder"
        },
        amin: {
            uruwak: "settling into a revolving orbital lattice of pure mana quartz darts around the anchor",
            lalhwa: "creating an expansive revolving perimeter of pure kinetic mana waves",
            hlakbil: "surrounding the somatic vessel in revolving runic mana rings that ward off spells",
            ruluwar: "the mana construct continuously orbits the caster as an etheric barrier familiar",
            iwati: "the relic permanently maintains revolving pure mana shields around the wielder"
        }
    },
    kijlo: {
        sfalhoy: {
            uruwak: "soaring along a high-arching lobbed artillery trajectory before plunging down in an incendiary strike",
            lalhwa: "raining an overhead artillery carpet of fire down upon fortified enemy blind spots",
            hlakbil: "somatic strikes launch lobbed overhead flame mortars that plunge behind enemy shields",
            ruluwar: "the flame construct arches high over battlefield obstacles to strike fortified redoubts",
            iwati: "the relic unleashes lobbed incendiary artillery shells on overhead swings"
        },
        hanhum: {
            uruwak: "arching high along a parabolic mortar vector before descending as a crushing hydraulic deluge",
            lalhwa: "raining a crushing overhead torrent of high-pressure water down upon enemy cover",
            hlakbil: "somatic strikes launch plunging water-hammer mortars over enemy barricades",
            ruluwar: "the fluid entity lobs overhead liquid bombs that crash down onto target fortifications",
            iwati: "the relic permanently launches high-arching hydraulic mortar shells on attack"
        },
        falga: {
            uruwak: "catapulting along a heavy ballistic artillery arc to crash down upon enemy bunkers with crushing mass",
            lalhwa: "bombarding the enemy backline with an overhead storm of plunging tectonic boulders",
            hlakbil: "somatic strikes catapult heavy bedrock boulders along lobbed parabolic arcs",
            ruluwar: "the stone golem hurls massive earthen boulders in high-arching artillery barrages",
            iwati: "the relic permanently launches lobbed tectonic mortar stones on impact"
        },
        jalfinn: {
            uruwak: "vaulting high into the upper atmosphere before plunging down as a supersonic vacuum drill",
            lalhwa: "raining plunging microbursts and downdrafts over enemy fortifications from above",
            hlakbil: "somatic strikes launch high-arching pneumatic mortar blasts that crash down over cover",
            ruluwar: "the cyclonic entity vaults skyward to drop concentrated vacuum bombs from above",
            iwati: "the relic permanently launches high-arching pneumatic mortar shells on swing"
        },
        iklad: {
            uruwak: "arching high into the cloud layer before descending as a devastating vertical lightning strike",
            lalhwa: "calling down an overhead artillery barrage of plunging vertical thunderbolts across the rear guard",
            hlakbil: "somatic strikes launch skyward arcs that plunge down as vertical lightning bolts",
            ruluwar: "the storm entity vaults skyward to call down vertical lightning mortars on enemy cover",
            iwati: "the relic permanently launches high-arching dielectric artillery arcs on strike"
        },
        erlaaw: {
            uruwak: "ascending along a solar parabola before plunging vertically as an orbital laser strike",
            lalhwa: "bombarding the target sector with a plunging overhead curtain of vertical hard-light lances",
            hlakbil: "somatic strikes launch overhead solar flares that plunge down onto enemy blind spots",
            ruluwar: "the light construct arches overhead to fire plunging hard-light rays from high altitude",
            iwati: "the relic permanently calls down plunging vertical solar lances on attack"
        },
        worulim: {
            uruwak: "soaring along a dark celestial parabola before plunging down as an entropic void mortar",
            lalhwa: "raining a plunging overhead deluge of entropic darkness across the enemy rear lines",
            hlakbil: "somatic strikes launch lobbed void seeds that plunge down behind enemy defenses",
            ruluwar: "the void construct arches overhead to drop dimensional excision bombs onto target cover",
            iwati: "the relic permanently launches lobbed entropic void shells on impact"
        },
        amin: {
            uruwak: "catapulting along an etheric artillery arc to plunge down through foreign anti-air wards",
            lalhwa: "bombarding the enemy backline with a plunging rain of pure kinetic mana lances",
            hlakbil: "somatic strikes launch lobbed etheric mortars that bypass frontline shields",
            ruluwar: "the mana construct lobs heavy etheric bombs over intervening obstacles",
            iwati: "the relic permanently launches high-arching kinetic ether shells on strike"
        }
    },
    rundo: {
        sfalhoy: {
            uruwak: "hurls struck foes backward through explosive thermal recoil, leaving scorched skid marks across the ground",
            lalhwa: "the advancing firestorm shoves the entire enemy vanguard backward on an unbroken wall of flame",
            hlakbil: "physical strikes release concussive thermal backdraft that launches struck opponents backward",
            ruluwar: "the flame construct repeatedly shoves and scatters enemy lines with blasts of superheated kinetic force",
            iwati: "the relic permanently unleashes violent thermal repulsion that hurls struck foes backward"
        },
        hanhum: {
            uruwak: "blasts targets backward on a surging crest of high-pressure hydraulic fluid force",
            lalhwa: "the sweeping tidal surge sweeps away the enemy frontline, pushing all combatants backward in its wake",
            hlakbil: "somatic strikes release hydraulic water-hammer recoil, throwing opponents backward off their feet",
            ruluwar: "the fluid entity crashes into enemy ranks, repeatedly pushing back foes with hydraulic surges",
            iwati: "the relic permanently discharges forceful hydraulic shove-waves on every strike"
        },
        falga: {
            uruwak: "violently shoves struck adversaries backward with the crushing blunt inertia of rolling bedrock",
            lalhwa: "the upheaving tectonic wave bulldozes enemy formations backward with rolling bedrock force",
            hlakbil: "somatic impacts transfer tectonic mass to blast struck adversaries backward with heavy blunt force",
            ruluwar: "the stone construct bulldozes forward, shoving aside all resistance with unstoppable bedrock mass",
            iwati: "the relic permanently delivers unstoppable tectonic blunt recoil upon physical collision"
        },
        jalfinn: {
            uruwak: "launches struck foes dozens of paces backward on a focused supersonic pneumatic blast",
            lalhwa: "the sweeping gale surge blows the entire enemy frontline backward with gale-force pneumatic overpressure",
            hlakbil: "physical strikes discharge explosive pneumatic recoil that hurls foes across the arena",
            ruluwar: "the cyclonic entity buffets the battlefield, violently pushing foes in chosen directions with heavy gales",
            iwati: "the relic permanently discharges high-velocity pneumatic repulsion upon striking matter"
        },
        iklad: {
            uruwak: "hurls targets violently backward through high-voltage electromagnetic repulsion",
            lalhwa: "the sweeping electric surge drives back the frontline under a continuous wall of electromagnetic force",
            hlakbil: "somatic strikes discharge electromagnetic repulsive pulses that blast opponents away from the caster",
            ruluwar: "the storm familiar pulses with electromagnetic repulsion to constantly push adversaries away",
            iwati: "the relic permanently discharges electromagnetic repulsive force upon each impact"
        },
        erlaaw: {
            uruwak: "propels struck foes backward under intense, concentrated photonic light-pressure",
            lalhwa: "the wide hard-light surge steadily pushes back the entire vanguard with continuous photonic pressure",
            hlakbil: "strikes release hard-light kinetic shove-waves that hurl adversaries backward upon contact",
            ruluwar: "the luminous entity shines with concentrated photonic force that pushes back advancing targets",
            iwati: "the relic permanently releases hard-light shove-pressure against whatever it strikes"
        },
        worulim: {
            uruwak: "violently repels targets backward with a wave of anti-gravitational void pressure",
            lalhwa: "the rolling darkness wave steadily shoves back all matter caught within its repelling void field",
            hlakbil: "somatic impacts discharge anti-gravitational void pulses that violently repel struck foes",
            ruluwar: "the void entity pushes matter away from its perimeter using anti-gravitational void waves",
            iwati: "the relic permanently repels targets backward with anti-gravitational void pulses"
        },
        amin: {
            uruwak: "throws struck entities backward with pure, concentrated etheric kinetic momentum",
            lalhwa: "the sweeping mana surge bulldozes foreign defenses and ranks backward with pure kinetic ether",
            hlakbil: "strikes discharge raw kinetic ether pulses that blow opponents backward through the air",
            ruluwar: "the mana construct repeatedly rams and shoves enemy formations with pure etheric force",
            iwati: "the relic permanently discharges pure kinetic etheric recoil on every blow"
        }
    },
    yudgo: {
        sfalhoy: {
            uruwak: "drags surrounding matter and foes violently inward toward its superheated combustion center",
            lalhwa: "the sweeping flame surge creates an expansive thermal updraft that pulls flanking foes inward into the blaze",
            hlakbil: "somatic strikes create sudden thermal vacuums that drag opponents inward toward the caster's next blow",
            ruluwar: "the flame construct draws surrounding matter into its burning core to feed its conflagration",
            iwati: "the relic permanently pulls nearby combustible matter and foes inward toward its fiery core"
        },
        hanhum: {
            uruwak: "creates a vortex suction that pulls nearby adversaries directly into its churning hydraulic core",
            lalhwa: "the sweeping surge folds into an expansive maelstrom that drags the entire frontline inward",
            hlakbil: "somatic impacts generate vortex currents that pull struck foes into close grappling range",
            ruluwar: "the fluid entity acts as a mobile maelstrom, continuously sucking foes into its swirling depths",
            iwati: "the relic permanently generates hydraulic suction that drags targets toward the blade on contact"
        },
        falga: {
            uruwak: "exerts an inward gravitational pull that drags surrounding earth and foes into the impact crater",
            lalhwa: "the tectonic wave causes the ground to collapse inward, dragging all frontline combatants into a central fissure",
            hlakbil: "somatic strikes anchor local gravity to drag opponents stumbling toward the caster's guard",
            ruluwar: "the stone construct manifests localized gravity wells to pull distant targets into its crushing grip",
            iwati: "the relic permanently exerts gravitational attraction that pulls struck targets toward the weapon"
        },
        jalfinn: {
            uruwak: "implodes in a low-pressure eye that sucks surrounding air and targets violently inward",
            lalhwa: "the sweeping gale generates a massive barometric low that suctions the entire enemy line into its vortex core",
            hlakbil: "somatic strikes generate vacuum suction over the limbs, pulling enemies off-balance toward the caster",
            ruluwar: "the cyclonic entity acts as a mobile vacuum, continuously pulling nearby targets into its eye",
            iwati: "the relic permanently creates a vacuum suction that drags nearby foes into its striking path"
        },
        iklad: {
            uruwak: "generates a high-power electromagnetic pinch that pulls conductive armor and targets inward",
            lalhwa: "the electrical surge creates a wide electromagnetic vacuum that drags conductive foes into the strike center",
            hlakbil: "somatic impacts induce intense electromagnetic attraction, dragging metal-clad foes into the caster's grasp",
            ruluwar: "the storm construct draws in metallic weapons and foes using focused electromagnetic suction",
            iwati: "the relic permanently exerts electromagnetic pull that drags metallic armor toward its edge"
        },
        erlaaw: {
            uruwak: "manifests a hard-light focal point that draws in ambient optical vectors and nearby targets",
            lalhwa: "the light surge draws in surrounding photons and targets toward an intense central focal line",
            hlakbil: "somatic strikes create hard-light focal wells that pull nearby foes inward",
            ruluwar: "the light entity draws in surrounding light and targets toward its radiant center",
            iwati: "the relic permanently draws in optical light and target trajectories toward its center"
        },
        worulim: {
            uruwak: "drags surrounding matter, light, and foes violently inward into a micro-void singularity",
            lalhwa: "the darkness wave manifests an expansive event horizon that pulls the entire enemy line inward into the abyss",
            hlakbil: "somatic strikes manifest micro-void suction that drags the target's limbs and body inward",
            ruluwar: "the void entity continuously pulls surrounding matter and adversaries into its entropic vortex",
            iwati: "the relic permanently generates a micro-void pull that suctions struck foes into its dark edge"
        },
        amin: {
            uruwak: "manifests a concentrated etheric vortex that suctions surrounding magical and physical matter inward",
            lalhwa: "the pure mana wave generates an expansive etheric vacuum that pulls all enemy constructs inward",
            hlakbil: "somatic strikes generate pure kinetic ether suction that pulls targets helplessly toward the caster",
            ruluwar: "the mana construct exerts an active etheric pull, suctioning foreign spells and foes inward",
            iwati: "the relic permanently generates etheric suction that pulls nearby mana and foes inward"
        }
    },
    kitas: {
        sfalhoy: {
            uruwak: "radiates a superheated magnetic attraction that binds to enemy armor and draws in surrounding heat",
            lalhwa: "magnetizes the entire target zone, pulling all metallic and thermal conduits into convergence",
            hlakbil: "somatic limbs radiate intense thermal magnetism that locks onto enemy weapons on parry",
            ruluwar: "the flame construct magnetically attracts hostile projectiles into its incinerating core",
            iwati: "the relic permanently exerts intense thermal magnetic attraction upon struck targets"
        },
        hanhum: {
            uruwak: "exerts hydrostatic surface-tension attraction, binding relentlessly to target moisture",
            lalhwa: "creates an expansive hydrostatic convergence field that pulls wet matter together",
            hlakbil: "somatic strikes establish hydrostatic cohesion that glues target defenses to the caster's limbs",
            ruluwar: "the fluid entity draws ambient moisture and foes together into an inescapable fluid mass",
            iwati: "the relic permanently adheres to target armor on contact via hydrostatic cohesion"
        },
        falga: {
            uruwak: "radiates dense geological gravitational attraction, drawing in metallic armaments and nearby debris",
            lalhwa: "the seismic wave creates a field-wide gravitational convergence that clumps enemy ranks together",
            hlakbil: "somatic limbs exert dense gravitational attraction, pulling enemy weapons directly into the caster's guard",
            ruluwar: "the stone golem magnetically draws nearby rocks and metal armor into its rocky body",
            iwati: "the relic permanently exerts intense gravitational magnetic attraction toward metallic armor"
        },
        jalfinn: {
            uruwak: "manifests an aerodynamic slipstream funnel that draws in nearby projectiles and targets",
            lalhwa: "creates a field-wide cyclonic convergence that pulls all airborne matter together",
            hlakbil: "somatic strikes create slipstream vortexes that trap enemy weapons against the caster's bracers",
            ruluwar: "the tempest entity aerodynamically converges surrounding matter into its vortex center",
            iwati: "the relic permanently draws in target weapons via aerodynamic slipstream attraction"
        },
        iklad: {
            uruwak: "exerts intense ionizing magnetic induction, clamping onto metallic armor and conductive tissue",
            lalhwa: "the electrical surge polarizes the entire frontline, magnetically locking enemy troops together",
            hlakbil: "somatic strikes polarize struck adversaries, magnetically trapping their weapons against the caster's guard",
            ruluwar: "the storm construct acts as an intense electromagnetic attractor, pulling metal weaponry out of enemy hands",
            iwati: "the relic permanently magnetizes struck targets to draw in secondary metallic strikes"
        },
        erlaaw: {
            uruwak: "manifests photonic gravitational convergence, drawing in ambient light and target trajectories",
            lalhwa: "the light surge creates an optical convergence grid that pulls dispersed troops toward a focal line",
            hlakbil: "somatic strikes create hard-light prism anchors that magnetically lock target limbs in place",
            ruluwar: "the luminous construct attracts optical vectors to blind and draw targets into its radiance",
            iwati: "the relic permanently establishes hard-light photonic convergence on strike"
        },
        worulim: {
            uruwak: "exerts deep gravitational singularity attraction that relentlessly drags nearby foes toward the point of impact",
            lalhwa: "the darkness wave creates multiple gravitational sinkholes that pull the entire frontline into clusters",
            hlakbil: "somatic strikes anchor gravitational singularity wells on struck foes, pulling their allies toward them",
            ruluwar: "the void entity exerts continuous gravitational attraction, pulling surrounding matter into its dark core",
            iwati: "the relic permanently exerts gravitational singularity attraction on struck targets"
        },
        amin: {
            uruwak: "exerts raw etheric resonance attraction, drawing in active foreign spells and physical matter",
            lalhwa: "the mana surge creates an etheric convergence zone that pulls all foreign magical constructs together",
            hlakbil: "somatic strikes establish etheric resonance locks that drag foreign mana shields into the caster's fists",
            ruluwar: "the mana construct draws in foreign spells and entities through pure etheric affinity",
            iwati: "the relic permanently draws in foreign magical constructs through raw etheric attraction"
        }
    },
    ewansi: {
        sfalhoy: {
            uruwak: "generates a blisteringly hot repulsive thermal field that deflects incoming physical projectiles",
            lalhwa: "advances as an impenetrable wall of repelling thermal backdraft that throws aside enemy charges",
            hlakbil: "somatic limbs radiate a deflective heat field that parries and pushes aside incoming weapons",
            ruluwar: "the flame construct surrounds the caster with a continuous, projectile-deflecting thermal shield",
            iwati: "the relic permanently projects a repelling thermal forcefield that deflects incoming blows"
        },
        hanhum: {
            uruwak: "generates a deflective hydrostatic pressure cushion that pushes aside counter-attacks",
            lalhwa: "advances as an impenetrable wave of repelling water-pressure that deflects all incoming projectiles",
            hlakbil: "somatic limbs radiate laminar fluid deflection barriers that effortlessly parry enemy weapons",
            ruluwar: "the fluid entity surrounds the caster as an active, impact-deflecting liquid shield",
            iwati: "the relic permanently projects a high-pressure hydrostatic deflection field"
        },
        falga: {
            uruwak: "generates a dense tectonic repulsion field that deflects physical impacts with solid bedrock resistance",
            lalhwa: "upheaves an advancing wall of tectonic deflection plates that blocks and repels incoming strikes",
            hlakbil: "somatic limbs form impervious bedrock deflection angles that effortlessly throw aside enemy weapons",
            ruluwar: "the stone golem acts as a massive physical bulwark, deflecting and repelling all incoming attacks",
            iwati: "the relic permanently deflects incoming weapons with impenetrable tectonic mass"
        },
        jalfinn: {
            uruwak: "generates an aerodynamic slipstream cushion that blows aside incoming arrows and projectiles",
            lalhwa: "advances as an impenetrable gale barrier that repels and redirects all incoming ranged attacks",
            hlakbil: "somatic limbs radiate high-speed vacuum cushions that deflect and parry incoming blows effortlessly",
            ruluwar: "the cyclonic entity wraps the caster in a howling wind barrier that throws aside all projectiles",
            iwati: "the relic permanently deflects incoming projectiles with a frictionless slipstream cushion"
        },
        iklad: {
            uruwak: "generates an electromagnetic repulsion screen that violently deflects metallic weapons and projectiles",
            lalhwa: "advances as a crackling Faraday deflection grid that repels all metallic and physical charges",
            hlakbil: "somatic limbs radiate high-voltage electromagnetic shields that parry and repel enemy weapons",
            ruluwar: "the storm construct maintains an active electromagnetic shield that deflects incoming attacks",
            iwati: "the relic permanently projects an electromagnetic deflection shield against metallic weapons"
        },
        erlaaw: {
            uruwak: "generates a hard-light prism screen that refracts and reflects incoming kinetic and magical attacks",
            lalhwa: "advances as an impenetrable hard-light mirror wall that reflects all incoming attacks back toward the enemy",
            hlakbil: "somatic limbs form hard-light mirror shields that deflect and parry incoming blows with zero friction",
            ruluwar: "the luminous entity projects hard-light reflector shields that bounce back hostile spells and projectiles",
            iwati: "the relic permanently reflects and deflects incoming attacks with hard-light prism plating"
        },
        worulim: {
            uruwak: "generates a null-gravity void field that swallows and deflects incoming kinetic energy",
            lalhwa: "advances as an impenetrable void horizon that absorbs and repels incoming physical and magical charges",
            hlakbil: "somatic limbs radiate a null-field shadow shield that deadens and deflects incoming weapon strikes",
            ruluwar: "the void construct surrounds the caster in an event-horizon shield that absorbs and repels attacks",
            iwati: "the relic permanently deadens and repels incoming attacks with an entropic null-field"
        },
        amin: {
            uruwak: "generates a pure etheric deflection lattice that pushes aside incoming spells and kinetic projectiles",
            lalhwa: "advances as an impenetrable pure mana wall that repels foreign spells and physical forces alike",
            hlakbil: "somatic limbs form raw mana ward barriers that effortlessly deflect and shatter incoming attacks",
            ruluwar: "the mana construct wraps the caster in a dense etheric shell that repels all hostile matrices",
            iwati: "the relic permanently projects a pure kinetic ether deflection shield against all attacks"
        }
    }
};

// ==========================================================================
// 7. MASTER 7×8×5 COMBINATORIAL DURATION MATRIX (280 Permutations)
// ==========================================================================

const DURATION_LORE_MATRIX = {
    tat: {
        sfalhoy: {
            uruwak: "discharging its entire thermal payload in a blinding, microsecond combustion flash on impact",
            lalhwa: "erupting in a single instantaneous frontline flashover that incinerates the entire sweep in a microsecond",
            hlakbil: "channeling all thermal power into a single instantaneous point-blank combustion flash",
            ruluwar: "the construct expending its entire thermal volume in a single instantaneous conflagration pulse",
            iwati: "the relic triggering an instantaneous full-yield thermal flash on first collision"
        },
        hanhum: {
            uruwak: "releasing its entire hydrostatic payload in a singular instantaneous water-hammer shockwave",
            lalhwa: "discharging the entire tidal front in an instantaneous sweeping hydraulic shockwave",
            hlakbil: "dumping its full hydraulic pressure into a single instantaneous bone-crushing impact shock",
            ruluwar: "the fluid mass expending its entire volume in an instantaneous high-pressure hydraulic burst",
            iwati: "the relic releasing its entire hydraulic payload instantaneously upon contact"
        },
        falga: {
            uruwak: "unleashing its full tectonic mass in a single instantaneous bedrock-shattering shockwave",
            lalhwa: "rupturing the entire tectonic front in a single simultaneous bedrock upheaval",
            hlakbil: "transferring its full tectonic density into a single instantaneous armor-shattering strike",
            ruluwar: "the earthen construct expending its mass in an instantaneous seismic shockwave",
            iwati: "the relic releasing an instantaneous tectonic bedrock shockwave on physical impact"
        },
        jalfinn: {
            uruwak: "discharging all barometric energy in an instantaneous supersonic microburst decompression",
            lalhwa: "detonating the advancing gale in an instantaneous field-wide atmospheric microburst",
            hlakbil: "releasing its pneumatic payload in a single instantaneous supersonic punch recoil",
            ruluwar: "the vortex entity expending all barometric force in a single instantaneous explosive gust",
            iwati: "the relic expending its pneumatic charge in an instantaneous supersonic blast"
        },
        iklad: {
            uruwak: "releasing its entire gigawatt ionic payload in an instantaneous dielectric flash arc",
            lalhwa: "discharging an instantaneous blanket of blinding arc-lightning across the entire vanguard",
            hlakbil: "discharging its entire voltage payload in a single instantaneous electric shock",
            ruluwar: "the storm construct expending its electrical charge in an instantaneous thunderclap arc",
            iwati: "the relic discharging its entire electric reservoir instantaneously upon contact"
        },
        erlaaw: {
            uruwak: "discharging all photonic radiance in an instantaneous retinal-scorching supernova flash",
            lalhwa: "flashing in an instantaneous wide-angle solar flare that blinds the frontline in a microsecond",
            hlakbil: "unleashing an instantaneous point-blank solar flash strike directly from the somatic vessel",
            ruluwar: "the light construct expending its luminous mass in an instantaneous blinding burst",
            iwati: "the relic releasing an instantaneous solar flashburst upon striking a target"
        },
        worulim: {
            uruwak: "discharging all entropic void energy in a single instantaneous reality-excising pulse",
            lalhwa: "collapsing the entire vanguard into an instantaneous shadow-eclipse flash",
            hlakbil: "discharging all entropic void power into a single instantaneous flesh-decaying strike",
            ruluwar: "the void entity expending its entropic mass in a single instantaneous dimensional collapse",
            iwati: "the relic discharging its entire entropic void charge instantaneously on impact"
        },
        amin: {
            uruwak: "discharging all stored ether in an instantaneous unaspected kinetic force burst",
            lalhwa: "unleashing an instantaneous field-wide kinetic mana burst, nullifying all foreign spells",
            hlakbil: "dumping all raw kinetic mana into a single instantaneous ward-shattering strike",
            ruluwar: "the mana construct expending its etheric mass in an instantaneous kinetic forcewave",
            iwati: "the relic expending its entire etheric payload in an instantaneous kinetic shock on strike"
        }
    },
    tul: {
        sfalhoy: {
            uruwak: "sustaining a continuous, channeled beam of roaring incandescent fire as long as concentration is fed",
            lalhwa: "maintaining a rolling, uninterrupted wall of continuous flame sweeping across the battlefield",
            hlakbil: "continuously feeding mental focus to sustain a permanent furnace aura over the somatic limbs",
            ruluwar: "maintaining active mental focus to sustain the free-form fire entity indefinitely",
            iwati: "drawing upon the wielder's continuous mana channel to maintain an uninterrupted flame sheath"
        },
        hanhum: {
            uruwak: "sustaining a continuous, high-pressure jet stream of hydro-abrasive water through focused channeling",
            lalhwa: "maintaining an uninterrupted, rolling deluge that continuously drowns the target sector",
            hlakbil: "continuously channeling focus to sustain high-pressure laminar fluid armor over the limbs",
            ruluwar: "maintaining active telepathic focus to control and nourish the fluid elemental construct",
            iwati: "drawing upon active mana circulation to sustain a permanent oscillating fluid edge"
        },
        falga: {
            uruwak: "sustaining a continuous forward thrust of grinding tectonic bedrock through active concentration",
            lalhwa: "maintaining continuous seismic focus to sustain rolling tectonic earth-waves across the field",
            hlakbil: "continuously channeling earthen mana to sustain adamantine bedrock density across the bones",
            ruluwar: "feeding continuous psionic will to sustain and reform the living stone golem",
            iwati: "drawing sustained mana focus to maintain an impenetrable mineral fortification barrier"
        },
        jalfinn: {
            uruwak: "sustaining a continuous, howling vacuum vortex beam through steady mental focus",
            lalhwa: "maintaining a persistent, howling cyclonic front that sweeps the battlefield uninterrupted",
            hlakbil: "continuously feeding mana to sustain slipstream vacuum acceleration across the body",
            ruluwar: "maintaining active mental focus to direct and sustain the hovering tempest entity",
            iwati: "drawing continuous focus to sustain a permanent molecular-shearing wind blade"
        },
        iklad: {
            uruwak: "sustaining an uninterrupted, crackling arc of high-voltage ionic lightning through constant channeling",
            lalhwa: "maintaining an electrified, rolling lightning grid that continuously shocks advancing ranks",
            hlakbil: "continuously feeding mental focus to sustain superconducting bio-electric reflexes",
            ruluwar: "maintaining unbroken concentration to hold the living storm familiar in coherent form",
            iwati: "drawing sustained mana to feed a permanent crackling electric discharge across the relic"
        },
        erlaaw: {
            uruwak: "sustaining a coherent, unbroken laser beam of hard-light photonic energy through steady focus",
            lalhwa: "maintaining an uninterrupted, daylight-bright solar barrier that illuminates the sector",
            hlakbil: "continuously feeding mana to sustain hard-light photonic armor over the vessel",
            ruluwar: "maintaining active mental focus to sustain and guide the radiant hard-light avatar",
            iwati: "drawing sustained focus to maintain a permanent laser-sharp hard-light edge"
        },
        worulim: {
            uruwak: "sustaining a continuous, light-devouring ray of entropic void through unbroken channeling",
            lalhwa: "maintaining a rolling, persistent shroud of sensory-nullifying shadow across the front",
            hlakbil: "continuously feeding focus to sustain an abyssal void shroud that absorbs incoming mana",
            ruluwar: "maintaining unbroken telepathic will to anchor the living void entity in physical reality",
            iwati: "drawing sustained mana to maintain an enduring spatial-excision enchantment"
        },
        amin: {
            uruwak: "sustaining a continuous, pure etheric lance of raw mana through steady casting concentration",
            lalhwa: "maintaining an uninterrupted, sweeping kinetic mana wave that repels foreign constructs",
            hlakbil: "continuously channeling mana to sustain an overcharged etheric strike matrix across the body",
            ruluwar: "maintaining active mental focus to sustain the unformatted raw mana construct",
            iwati: "drawing continuous mana to maintain a permanent ward-shattering etheric matrix"
        }
    },
    bati: {
        sfalhoy: {
            uruwak: "locking into permanent physical reality as self-sustaining, everburning incandescent plasma bolts",
            lalhwa: "permanently transforming the target territory into a scorched, everburning sea of fire without ongoing mana drain",
            hlakbil: "permanently calcifying the somatic vessel with heat-resistant salamander dermal scales",
            ruluwar: "locking the fire construct into independent, permanent existence as a self-sustaining flame familiar",
            iwati: "permanently engraving the flame enchantment into the relic's matrix, persisting for centuries"
        },
        hanhum: {
            uruwak: "locking into permanent physical reality as everlasting absolute-zero glacial ice lances",
            lalhwa: "permanently transforming the battlefield into an eternal permafrost glacier without ongoing mana drain",
            hlakbil: "permanently reinforcing the somatic tissue with enduring sub-zero glacial density",
            ruluwar: "locking the fluid construct into independent existence as a self-sustaining water familiar",
            iwati: "permanently engraving the laminar water-edge into the relic, lasting indefinitely without upkeep"
        },
        falga: {
            uruwak: "locking into permanent physical reality as indestructible monoliths of solid basalt bedrock",
            lalhwa: "permanently upheaving the terrain into an enduring bastion of fortified granite walls",
            hlakbil: "permanently petrifying the caster's skeletal framework into diamond-grade adamantine mineral",
            ruluwar: "locking the earthen entity into permanent physical reality as an autonomous stone golem",
            iwati: "permanently anchoring the seismic fortification matrix into the relic's molecular structure"
        },
        jalfinn: {
            uruwak: "locking into permanent physical reality as self-sustaining, perpetual micro-vacuum vortexes",
            lalhwa: "permanently locking the local atmosphere into an enduring, perpetual windstorm zone",
            hlakbil: "permanently modifying the somatic nervous system with frictionless slipstream reflex pathways",
            ruluwar: "locking the tempest construct into permanent physical reality as an autonomous wind spirit",
            iwati: "permanently engraving the vacuum shearing edge into the relic without ongoing mana drain"
        },
        iklad: {
            uruwak: "locking into permanent physical reality as self-sustaining, trapped ball-lightning orbs",
            lalhwa: "permanently ionizing the local environment into an enduring electromagnetic hazard zone",
            hlakbil: "permanently rewiring the caster's neural pathways with superconducting bio-electric conduits",
            ruluwar: "locking the storm familiar into permanent physical reality as an autonomous lightning entity",
            iwati: "permanently anchoring the high-voltage dielectric arc matrix into the relic's core"
        },
        erlaaw: {
            uruwak: "locking into permanent physical reality as solid, everlasting hard-light crystalline prisms",
            lalhwa: "permanently illuminating the battlefield with an enduring, unquenchable hard-light daylight field",
            hlakbil: "permanently crystallizing the caster's dermal layer into refractive hard-light prisms",
            ruluwar: "locking the luminous construct into permanent physical reality as an autonomous hard-light avatar",
            iwati: "permanently engraving the coherent laser matrix into the relic's crystalline structure"
        },
        worulim: {
            uruwak: "locking into permanent physical reality as an enduring dimensional tear of light-devouring void",
            lalhwa: "permanently cursing the target zone into an enduring, lightless abyssal wasteland",
            hlakbil: "permanently grafting the somatic vessel with shadow-phasing entropic void tendrils",
            ruluwar: "locking the void construct into permanent physical reality as an autonomous shadow familiar",
            iwati: "permanently binding the spatial-excision void matrix into the relic's dark alloy"
        },
        amin: {
            uruwak: "locking into permanent physical reality as indestructible crystallized mana-quartz darts",
            lalhwa: "permanently altering the local mana field into a stabilized, foreign-magic-nullifying zone",
            hlakbil: "permanently reinforcing the somatic channels with crystallized raw ether conduits",
            ruluwar: "locking the mana construct into permanent physical reality as an autonomous etheric familiar",
            iwati: "permanently binding the ward-shattering etheric enchantment into the relic indefinitely"
        }
    },
    tan: {
        sfalhoy: {
            uruwak: "implanting an incendiary thermal fuse that detonates in a delayed thermobaric blast seconds after impact",
            lalhwa: "blanketing the area in volatile, delayed embers that detonate simultaneously after a set interval",
            hlakbil: "implanting a delayed combustion charge into struck foes that detonates after a timed interval",
            ruluwar: "the flame construct hovering silently into position before executing a timed terminal detonation",
            iwati: "the relic arming an incendiary timed fuse on contact that explodes after a set delay"
        },
        hanhum: {
            uruwak: "embedding a cryogenic hydrostatic fuse that implodes in a delayed cavitation burst after impact",
            lalhwa: "saturating the zone with pressurized moisture that flash-freezes into a crushing deluge after a delay",
            hlakbil: "implanting a delayed hydraulic pressure wave that ruptures target tissues seconds after the strike",
            ruluwar: "the fluid entity enveloping the target before executing a timed high-pressure constriction",
            iwati: "the relic arming a delayed hydrostatic cavitation burst upon striking solid matter"
        },
        falga: {
            uruwak: "burrowing deep into target terrain before triggering a delayed subterranean seismic explosion",
            lalhwa: "seeding the ground with delayed tectonic charges that erupt in rolling earthquakes after a delay",
            hlakbil: "implanting a delayed seismic resonance into the target's armor that shatters it seconds later",
            ruluwar: "the earthen construct surrounding the quarry before collapsing inward on a timed trigger",
            iwati: "the relic arming a timed seismic bedrock charge that detonates seconds after collision"
        },
        jalfinn: {
            uruwak: "implanting a compressed-air seed that ruptures in a delayed supersonic microburst decompression",
            lalhwa: "seeding the area with low-pressure vacuum pockets that implode simultaneously after a timed delay",
            hlakbil: "implanting a delayed pneumatic shock into struck opponents that hurls them backward seconds later",
            ruluwar: "the vortex construct boxing in the quarry before executing a timed atmospheric implosion",
            iwati: "the relic arming a delayed pneumatic decompression burst upon physical contact"
        },
        iklad: {
            uruwak: "implanting an electromagnetic charge that detonates in a delayed ionizing thunderclap after impact",
            lalhwa: "ionizing the target grid with dormant charges that trigger a synchronized lightning storm after a delay",
            hlakbil: "implanting a delayed bio-electric pulse that induces full-body neuromuscular paralysis seconds later",
            ruluwar: "the lightning familiar encircling the target before discharging a synchronized timed strike",
            iwati: "the relic arming a delayed dielectric breakdown arc upon physical collision"
        },
        erlaaw: {
            uruwak: "implanting a dormant photonic seed that flares in a delayed blinding supernova burst",
            lalhwa: "saturating the field with dormant light particles that erupt into an optical flash after a timed delay",
            hlakbil: "implanting a delayed optical flare that permanently blinds the target seconds after physical contact",
            ruluwar: "the light construct positioning around foes before executing a timed radiant burst",
            iwati: "the relic arming a delayed photonic flash detonation upon striking an adversary"
        },
        worulim: {
            uruwak: "implanting an entropic void seed that expands and dissolves the target from within after a timed delay",
            lalhwa: "seeding the battlefield with dormant shadow runes that collapse into void rifts after an interval",
            hlakbil: "implanting a delayed void curse that rots and dissolves the struck limb seconds after the blow",
            ruluwar: "the void entity enveloping the quarry before triggering a delayed dimensional collapse",
            iwati: "the relic arming a delayed entropic void pulse upon striking target matter"
        },
        amin: {
            uruwak: "implanting an etheric resonance seed that detonates in a delayed kinetic mana explosion",
            lalhwa: "saturating the area with delayed etheric runes that unravel all active foreign magic after a delay",
            hlakbil: "implanting a delayed etheric pulse that overloads and shatters the target's mana channels seconds later",
            ruluwar: "the mana construct positioning silently before triggering a timed kinetic forcewave",
            iwati: "the relic arming a delayed ward-shattering etheric burst upon physical contact"
        }
    },
    lit: {
        sfalhoy: {
            uruwak: "releasing multiple recurring pulses of searing thermal shockwaves on impact",
            lalhwa: "sweeping the vanguard in rhythmic, recurring waves of rolling conflagration",
            hlakbil: "somatic strikes reverberating with multiple recurring thermal pulses per impact",
            ruluwar: "the flame construct pulsing rhythmic waves of heat in continuous staccato bursts",
            iwati: "the relic repeatedly pulsing searing thermal waves on every single blow"
        },
        hanhum: {
            uruwak: "delivering recurring pulses of crushing water-hammer shockwaves after initial impact",
            lalhwa: "inundating the field in rhythmic, recurring tidal breaker waves that batter defenses",
            hlakbil: "somatic strikes discharging multiple recurring hydraulic shockwaves through target tissue",
            ruluwar: "the fluid entity pulsing rhythmic cavitation shockwaves into the target area",
            iwati: "the relic repeatedly pulsing high-pressure hydraulic shockwaves upon collision"
        },
        falga: {
            uruwak: "delivering recurring staccato seismic shockwaves that repeatedly crack bedrock",
            lalhwa: "rupturing the ground in rhythmic, recurring seismic pulses across the frontline",
            hlakbil: "somatic strikes echoing with multiple recurring tectonic tremors through target bone",
            ruluwar: "the earthen entity pounding the ground in rhythmic, recurring seismic pulses",
            iwati: "the relic repeatedly pulsing tectonic blunt-force shockwaves upon each impact"
        },
        jalfinn: {
            uruwak: "discharging recurring supersonic pneumatic pulses that repeatedly buffet the target",
            lalhwa: "sweeping the area in rhythmic, recurring gale pulses that prevent enemy recovery",
            hlakbil: "somatic strikes reverberating with multiple recurring vacuum shockwaves on impact",
            ruluwar: "the vortex construct pulsing rhythmic barometric microbursts across the field",
            iwati: "the relic repeatedly pulsing supersonic pneumatic shockwaves on contact"
        },
        iklad: {
            uruwak: "discharging recurring pulses of high-voltage ionic arcs into the struck target",
            lalhwa: "surging across the frontline in rhythmic, recurring waves of chain-lightning arcs",
            hlakbil: "somatic strikes delivering multiple recurring electric shocks directly into the victim",
            ruluwar: "the storm entity pulsing rhythmic electromagnetic shockwaves continuously",
            iwati: "the relic repeatedly pulsing high-voltage dielectric arcs on each strike"
        },
        erlaaw: {
            uruwak: "pulsing in recurring stroboscopic bursts of blinding hard-light radiance",
            lalhwa: "sweeping the battlefield in rhythmic, recurring flashes of solar radiation",
            hlakbil: "somatic strikes bursting with multiple recurring hard-light flashes on impact",
            ruluwar: "the light construct pulsing rhythmic radiant flares to continuously disorient foes",
            iwati: "the relic repeatedly pulsing blinding solar flares upon striking an enemy"
        },
        worulim: {
            uruwak: "pulsing in recurring waves of entropic void pressure that continuously decay target defenses",
            lalhwa: "rolling across the field in rhythmic, recurring waves of suffocating shadow",
            hlakbil: "somatic strikes discharging multiple recurring void pulses that steadily corrode matter",
            ruluwar: "the void construct pulsing rhythmic waves of entropic decay across the zone",
            iwati: "the relic repeatedly pulsing corrosive void shockwaves on contact"
        },
        amin: {
            uruwak: "discharging recurring pulses of raw kinetic ether that repeatedly batter target shielding",
            lalhwa: "sweeping the vanguard in rhythmic, recurring waves of pure kinetic mana force",
            hlakbil: "somatic strikes reverberating with multiple recurring etheric shockwaves per blow",
            ruluwar: "the mana construct pulsing rhythmic etheric forcewaves to continuously disrupt lines",
            iwati: "the relic repeatedly pulsing raw kinetic mana shockwaves upon physical contact"
        }
    },
    talkib: {
        sfalhoy: {
            uruwak: "lying dormant as a concealed thermal stasis trap that detonates when an enemy breaches proximity",
            lalhwa: "seeding the entire battlefield as a dormant incendiary minefield that erupts upon enemy intrusion",
            hlakbil: "arming the somatic vessel with a reactive combustion trap that detonates instantly upon being struck",
            ruluwar: "the flame construct entering dormant stasis, lying in wait to ambush intruders with a sudden firestorm",
            iwati: "the relic holding its thermal charge dormant until triggered by proximity or command"
        },
        hanhum: {
            uruwak: "holding its charge as a concealed cryogenic stasis trap that implodes when an adversary approaches",
            lalhwa: "blanketing the terrain in dormant hydrostatic runes that erupt into a drowning deluge upon contact",
            hlakbil: "arming the somatic vessel with a reactive cavitation trap that crushes attackers on contact",
            ruluwar: "the fluid entity blending into ambient moisture, waiting to ambush foes with a hydraulic blast",
            iwati: "the relic holding its hydrostatic charge dormant until contact triggers a cavitation burst"
        },
        falga: {
            uruwak: "anchoring underground as a dormant seismic landmine that triggers when stepped upon",
            lalhwa: "seeding the ground with concealed tectonic trigger runes that upheave bedrock upon intrusion",
            hlakbil: "arming the somatic vessel with a reactive bedrock armor trap that shatters incoming weapons",
            ruluwar: "the earthen entity submerging beneath the earth, lying in wait to ambush foes from below",
            iwati: "the relic holding its seismic charge dormant until forceful collision triggers an eruption"
        },
        jalfinn: {
            uruwak: "hovering invisibly as a dormant vacuum trap that detonates in a microburst when crossed",
            lalhwa: "seeding the area with dormant barometric trigger runes that unleash howling gales upon intrusion",
            hlakbil: "arming the somatic vessel with a reactive pneumatic trap that violently repels attackers",
            ruluwar: "the cyclonic entity dispersing into ambient breeze, waiting to ambush foes with a vacuum vortex",
            iwati: "the relic holding its pneumatic charge dormant until motion triggers an explosive air-blast"
        },
        iklad: {
            uruwak: "lying dormant as an invisible electromagnetic arc trap that discharges when an enemy enters range",
            lalhwa: "seeding the frontline with dormant ionizing trigger runes that electrocute advancing ranks",
            hlakbil: "arming the somatic vessel with a reactive lightning trap that electrocutes foes upon physical contact",
            ruluwar: "the storm entity holding its charge in dormant stealth, waiting to ambush targets with a thunderclap",
            iwati: "the relic holding its electric charge dormant until contact triggers a dielectric discharge"
        },
        erlaaw: {
            uruwak: "hovering as a concealed hard-light prism trap that erupts in a blinding flash when triggered",
            lalhwa: "seeding the field with dormant solar trigger runes that blind and incinerate advancing foes",
            hlakbil: "arming the somatic vessel with a reactive solar flash trap that blinds attacking adversaries",
            ruluwar: "the light construct holding its radiance dormant, waiting to ambush foes with an optical flash",
            iwati: "the relic holding its photonic charge dormant until impact triggers a supernova burst"
        },
        worulim: {
            uruwak: "lying dormant as a concealed abyssal void trap that devours any entity crossing its threshold",
            lalhwa: "seeding the combat zone with dormant shadow rifts that pull intruders into the void",
            hlakbil: "arming the somatic vessel with a reactive shadow trap that decays attacking weapons on contact",
            ruluwar: "the void entity lurking inside surface shadows, waiting to ambush prey with entropic tendrils",
            iwati: "the relic holding its void charge dormant until contact triggers a dimensional excision"
        },
        amin: {
            uruwak: "lying dormant as a concealed etheric mana trap that violently discharges when an enemy approaches",
            lalhwa: "seeding the area with dormant arcane trigger runes that nullify foreign spells upon intrusion",
            hlakbil: "arming the somatic vessel with a reactive mana trap that shatters attacking spell matrices",
            ruluwar: "the mana construct holding its ether in dormant stasis, waiting to ambush foes with kinetic force",
            iwati: "the relic holding its etheric charge dormant until impact triggers a raw kinetic burst"
        }
    },
    litu: {
        sfalhoy: {
            uruwak: "maintaining an oscillating, self-renewing cycle of combustion flares along its trajectory",
            lalhwa: "maintaining an oscillating tidal cycle of waxing and waning flame fronts across the field",
            hlakbil: "cycling through rhythmic surges of combustion synchronized with the caster's breath and cardiac cycle",
            ruluwar: "the flame construct operating on an oscillating breathing cycle of expansion and eruption",
            iwati: "the relic cycling through rhythmic, self-renewing thermal power surges indefinitely"
        },
        hanhum: {
            uruwak: "maintaining an oscillating cycle of waxing hydrostatic pressure and freezing waves",
            lalhwa: "maintaining an oscillating, self-renewing ebb and surge cycle that continuously batters the frontline",
            hlakbil: "cycling through rhythmic surges of hydrostatic pressure synchronized with blood circulation",
            ruluwar: "the fluid entity operating on an oscillating breathing cycle of fluid expansion and compression",
            iwati: "the relic cycling through rhythmic, self-renewing laminar water-cutting surges"
        },
        falga: {
            uruwak: "maintaining an oscillating cycle of tectonic density pulses along its trajectory",
            lalhwa: "maintaining an oscillating, self-renewing seismic cycle of rolling earthquakes",
            hlakbil: "cycling through rhythmic surges of bedrock density synchronized with muscular tension",
            ruluwar: "the earthen construct operating on an oscillating breathing cycle of seismic contraction",
            iwati: "the relic cycling through rhythmic, self-renewing tectonic fortification cycles"
        },
        jalfinn: {
            uruwak: "maintaining an oscillating cycle of accelerating and decelerating vacuum shears",
            lalhwa: "maintaining an oscillating, self-renewing tempest cycle of barometric high and low pressure fronts",
            hlakbil: "cycling through rhythmic surges of slipstream acceleration synchronized with movement",
            ruluwar: "the vortex construct operating on an oscillating breathing cycle of cyclonic rotation",
            iwati: "the relic cycling through rhythmic, self-renewing pneumatic vacuum surges"
        },
        iklad: {
            uruwak: "maintaining an oscillating, self-renewing cycle of high-voltage alternating current arcs",
            lalhwa: "maintaining an oscillating electromagnetic cycle of waxing and waning lightning surges",
            hlakbil: "cycling through rhythmic surges of superconducting bio-electric voltage with each heartbeat",
            ruluwar: "the storm entity operating on an oscillating breathing cycle of electromagnetic pulses",
            iwati: "the relic cycling through rhythmic, self-renewing high-voltage dielectric pulses"
        },
        erlaaw: {
            uruwak: "maintaining an oscillating, self-renewing circadian cycle of photonic hard-light pulses",
            lalhwa: "maintaining an oscillating daylight cycle of waxing solar radiation across the battlefield",
            hlakbil: "cycling through rhythmic surges of hard-light radiance synchronized with neural focus",
            ruluwar: "the light construct operating on an oscillating breathing cycle of luminous expansion",
            iwati: "the relic cycling through rhythmic, self-renewing solar radiance cycles"
        },
        worulim: {
            uruwak: "maintaining an oscillating, self-renewing eclipse cycle of waxing entropic void waves",
            lalhwa: "maintaining an oscillating eclipse cycle of expanding and contracting shadow domains",
            hlakbil: "cycling through rhythmic surges of void entropy synchronized with the caster's pulse",
            ruluwar: "the void entity operating on an oscillating breathing cycle of entropic consumption",
            iwati: "the relic cycling through rhythmic, self-renewing spatial-excision void pulses"
        },
        amin: {
            uruwak: "maintaining an oscillating, self-renewing wave cycle of pure kinetic ether pulses",
            lalhwa: "maintaining an oscillating mana cycle of waxing etheric resonance that continuously purges magic",
            hlakbil: "cycling through rhythmic surges of raw kinetic mana synchronized with internal ley lines",
            ruluwar: "the mana construct operating on an oscillating breathing cycle of etheric resonance",
            iwati: "the relic cycling through rhythmic, self-renewing ward-shattering etheric surges"
        }
    }
};

// ==========================================================================
// 8. MASTER 4×8×5 COMBINATORIAL MULTIPLY MATRIX (160 Permutations)
// ==========================================================================

const MULTIPLY_LORE_MATRIX = {
    tiha: {
        sfalhoy: {
            uruwak: "fissions mid-trajectory into a fan of distinct incendiary plasma bolts that diverge before converging on target",
            lalhwa: "the advancing firefront divides into multiple intersecting conflagration currents that cross-stitch the battlefield",
            hlakbil: "somatic strikes disperse into secondary splitting flame ripples that scorch adjacent foes with each impact",
            ruluwar: "the flame construct effortlessly fissions into multiple smaller, coordinated fire entities on command",
            iwati: "the relic's incendiary discharges split into secondary branching flame jets upon physical impact"
        },
        hanhum: {
            uruwak: "splits in flight into branching laminar water-javelins that strike simultaneously across multiple angles",
            lalhwa: "the sweeping tidal surge splits into diverging river currents that encircle and isolate enemy squads",
            hlakbil: "somatic impacts divide into branching fluid shockwaves that propagate through target tissue and armor",
            ruluwar: "the fluid mass divides into multiple autonomous water constructs that flank the target simultaneously",
            iwati: "the relic's fluid strikes divide into branching high-pressure cutting streams on contact"
        },
        falga: {
            uruwak: "fractures mid-air into dense, jagged basalt fragments that pelt the target area with heavy kinetic shrapnel",
            lalhwa: "the seismic shockwave branches into multiple subterranean fault lines, fracturing the earth under target ranks",
            hlakbil: "somatic blows fracture into secondary seismic shockwaves that travel through ground and bone",
            ruluwar: "the stone golem splits into miniature animated basalt sentinels that swarm enemy positions",
            iwati: "the relic's strikes fracture into secondary seismic fissures that travel into surrounding terrain"
        },
        jalfinn: {
            uruwak: "fissions into forked vacuum vortex shears that diverge to bypass frontal cover before slicing inward",
            lalhwa: "the sweeping gale divides into diverging shear fronts that trap enemies between opposing wind corridors",
            hlakbil: "somatic strikes split into diverging vacuum shears, striking multiple weak points with a single motion",
            ruluwar: "the cyclonic entity divides into multiple whirling vortex familiars under the caster's telepathic control",
            iwati: "the relic's blows split into diverging vacuum shears that strike flanking adversaries"
        },
        iklad: {
            uruwak: "branches into multiple autonomous fork-lightning bolts that strike flanking vectors simultaneously",
            lalhwa: "the wide electrical front splits into parallel branching lightning grids that gridlock the battlefield",
            hlakbil: "somatic strikes branch into secondary high-voltage arcs that travel through target nervous conduits",
            ruluwar: "the storm construct fissions into multiple ball-lightning familiars that coordinate synchronized strikes",
            iwati: "the relic's strikes branch into secondary dielectric fork arcs upon collision"
        },
        erlaaw: {
            uruwak: "refracts through a mid-air photonic lens, splitting into a fan of coherent laser rays",
            lalhwa: "the light surge refracts into an intersecting web of laser lines that blanket the entire forward sector",
            hlakbil: "somatic strikes refract into branching hard-light beams that lance through secondary target lines",
            ruluwar: "the luminous entity splits into multiple dancing hard-light avatars that distract and strike",
            iwati: "the relic's strikes refract into branching laser rays that lance adjacent targets"
        },
        worulim: {
            uruwak: "fractures along dimensional fault lines into separate void tendrils that seek different target coordinates",
            lalhwa: "the darkness wave fractures into creeping fingers of shadow that isolate and blind individual targets",
            hlakbil: "somatic strikes split into branching void fissures that decay multiple armor zones simultaneously",
            ruluwar: "the void entity fissions into separate shadow phantoms that stalk and ambush targets from different angles",
            iwati: "the relic's strikes fracture into branching void tendrils that infect surrounding matter"
        },
        amin: {
            uruwak: "fissions mid-flight into distinct etheric needle-darts that strike foreign mana matrices from multiple vectors",
            lalhwa: "the pure mana wave splits into overlapping etheric harmonics that unravel multiple foreign spells at once",
            hlakbil: "somatic strikes fracture into separate etheric pulses that dismantle multiple layers of foreign wards",
            ruluwar: "the mana construct divides into multiple autonomous etheric orbs that coordinate anti-magic strikes",
            iwati: "the relic's strikes split into multiple etheric pulses that dismantle adjacent foreign wards"
        }
    },
    padu: {
        sfalhoy: {
            uruwak: "manifests as four synchronized, identical incendiary plasma bolts flying in tight diamond formation",
            lalhwa: "unleashes a fourfold echelon of rolling flame surges that sweep the battlefield in rapid succession",
            hlakbil: "somatic strikes manifest fourfold phantom flame blows that land simultaneously with each single swing",
            ruluwar: "the caster manifests four fully realized flame entities that execute coordinated pincer attacks",
            iwati: "the relic multiplies each strike into four synchronized thermal detonations"
        },
        hanhum: {
            uruwak: "manifests as four parallel, high-pressure hydro-torpedoes launched in synchronized quad-formation",
            lalhwa: "unleashes four consecutive tidal breaker waves that drown and overwhelm frontline defenses",
            hlakbil: "somatic strikes deliver fourfold hydraulic impacts, multiplying the force of each blow four times",
            ruluwar: "the caster manifests four autonomous fluid constructs that coordinate surround-and-drown maneuvers",
            iwati: "the relic multiplies every blow into four consecutive hydraulic impacts"
        },
        falga: {
            uruwak: "manifests as four massive basalt monoliths hurled simultaneously in a devastating coordinated quad-barrage",
            lalhwa: "upheaves four consecutive tectonic earth-rollers that repeatedly crush the advancing vanguard",
            hlakbil: "somatic strikes hit with the quadruple mass of four tectonic monoliths on every impact",
            ruluwar: "the caster manifests four towering stone golems that operate in unbreakable quad-formation",
            iwati: "the relic multiplies each impact into four crushing tectonic shockwaves"
        },
        jalfinn: {
            uruwak: "manifests as four supersonic vacuum vortexes launched simultaneously along parallel flight vectors",
            lalhwa: "unleashes four successive gale fronts that compress and flatten everything across the combat zone",
            hlakbil: "somatic strikes unleash fourfold pneumatic shockwaves that hit the target from four angles at once",
            ruluwar: "the caster manifests four swirling cyclonic familiars that create a fourfold wind cage",
            iwati: "the relic multiplies every swing into four supersonic pneumatic blasts"
        },
        iklad: {
            uruwak: "manifests as four synchronized lightning bolts that strike down in a devastating fourfold thunderclap",
            lalhwa: "discharges four rapid-fire electrical storm surges that repeatedly ionize and shock the frontlines",
            hlakbil: "somatic strikes discharge four synchronized high-voltage arcs directly through the target's frame",
            ruluwar: "the caster manifests four crackling storm entities that coordinate fourfold lightning crossfires",
            iwati: "the relic multiplies each strike into four simultaneous high-voltage lightning discharges"
        },
        erlaaw: {
            uruwak: "manifests as four parallel hard-light laser lances that fire simultaneously with zero convergence loss",
            lalhwa: "unleashes four consecutive solar radiation waves that bleach and incinerate the target sector",
            hlakbil: "somatic strikes land with fourfold hard-light resonance, multiplying striking precision and damage",
            ruluwar: "the caster manifests four radiant hard-light avatars that overwhelm enemy defenses from four flanks",
            iwati: "the relic multiplies every blow into four synchronized hard-light laser pulses"
        },
        worulim: {
            uruwak: "manifests as four identical void spheres that travel in synchronized quad-formation to erase matter",
            lalhwa: "rolls forward in four successive waves of deep void that completely swallow ambient light",
            hlakbil: "somatic strikes inflict fourfold void decay pulses that multiply matter dissolution four times",
            ruluwar: "the caster manifests four abyssal void constructs that systematically devour enemy formations",
            iwati: "the relic multiplies each strike into fourfold entropic void pulses"
        },
        amin: {
            uruwak: "manifests as four identical pure etheric darts launched in a perfectly synchronized quad-salvo",
            lalhwa: "unleashes four consecutive pure mana shockwaves that comprehensively purge all foreign spellcraft",
            hlakbil: "somatic strikes hit with fourfold pure mana force, overwhelming foreign defenses in an instant",
            ruluwar: "the caster manifests four pure etheric mana constructs that systematically dismantle foreign spells",
            iwati: "the relic multiplies every impact into fourfold pure kinetic ether shocks"
        }
    },
    silpu: {
        sfalhoy: {
            uruwak: "primes incendiary thermal bridges that arc leaping fire bolts across adjacent secondary targets upon impact",
            lalhwa: "the advancing flame surge establishes cascading thermal conduits that leap across enemy lines",
            hlakbil: "somatic strikes discharge leaping flame arcs that cascade through nearby enemy ranks with every blow",
            ruluwar: "the flame construct unleashes chained incendiary ribbons that arc continuously between adjacent foes",
            iwati: "the relic's strikes discharge leaping fire arcs that chain into secondary targets on collision"
        },
        hanhum: {
            uruwak: "primes pressurized fluid bridges that arc high-velocity water jets across adjacent targets upon impact",
            lalhwa: "the sweeping surge creates cascading hydraulic conduits that bridge across enemy clusters",
            hlakbil: "somatic strikes discharge pressurized water arcs that leap into adjacent foes on impact",
            ruluwar: "the fluid entity lashes out with chained water tendrils that connect and drown multiple targets",
            iwati: "the relic's strikes discharge cascading water jets that leap into secondary targets"
        },
        falga: {
            uruwak: "primes seismic resonance bridges that arc subterranean shockwaves across adjacent grounded foes",
            lalhwa: "the tectonic wave establishes cascading fault lines that propagate through nearby enemy ranks",
            hlakbil: "somatic strikes discharge ground-conducting seismic shockwaves that chain into nearby foes",
            ruluwar: "the stone golem pounds the ground to send cascading seismic arcs leaping between targets",
            iwati: "the relic's strikes discharge leaping seismic shockwaves through target ground"
        },
        jalfinn: {
            uruwak: "primes aerodynamic slipstream bridges that arc leaping vacuum shears across adjacent targets",
            lalhwa: "the gale wave establishes cascading wind corridors that slice across multiple enemy squads",
            hlakbil: "somatic strikes discharge leaping vacuum blades that chain into surrounding adversaries",
            ruluwar: "the cyclonic entity unleashes chained aerodynamic shears that leap between foes",
            iwati: "the relic's strikes discharge leaping vacuum blades to secondary targets on impact"
        },
        iklad: {
            uruwak: "primes high-voltage dielectric conduits that arc cascading lightning bolts across multiple adjacent targets",
            lalhwa: "the electrical surge establishes an unbroken chain-lightning grid that shocks the entire frontline",
            hlakbil: "somatic strikes discharge leaping high-voltage lightning arcs that chain through enemy formations",
            ruluwar: "the storm entity continuously fires cascading Tesla arcs that leap between conductive foes",
            iwati: "the relic's strikes discharge leaping chain-lightning arcs to adjacent enemies on impact"
        },
        erlaaw: {
            uruwak: "primes specular hard-light conduits that refract leaping laser beams across adjacent targets",
            lalhwa: "the light surge establishes cascading photonic reflections that illuminate and lance secondary lines",
            hlakbil: "somatic strikes discharge leaping hard-light beams that refract into nearby adversaries",
            ruluwar: "the luminous entity projects cascading laser reflections that chain between targets",
            iwati: "the relic's strikes discharge leaping hard-light rays to secondary targets on collision"
        },
        worulim: {
            uruwak: "primes entropic shadow tethers that leap across adjacent foes, draining vitality in a dark chain",
            lalhwa: "the darkness wave establishes cascading void tendrils that bridge across enemy combatants",
            hlakbil: "somatic strikes discharge leaping void tethers that spread entropic decay to nearby foes",
            ruluwar: "the void construct lashes out with chained shadow tendrils that bind and drain multiple targets",
            iwati: "the relic's strikes discharge leaping shadow tethers that decay secondary targets"
        },
        amin: {
            uruwak: "primes pure etheric resonance conduits that arc ward-shattering mana pulses across adjacent spells",
            lalhwa: "the pure mana wave establishes cascading etheric bridges that purge foreign magical constructs",
            hlakbil: "somatic strikes discharge leaping etheric shockwaves that shatter adjacent foreign spell matrices",
            ruluwar: "the mana construct projects cascading etheric arcs that leap between hostile spellcasters",
            iwati: "the relic's strikes discharge leaping pure mana pulses that disrupt secondary wards"
        }
    },
    bunton: {
        sfalhoy: {
            uruwak: "swarms forward as a dense, overlapping cluster-salvo of roiling fireballs that saturates the target zone",
            lalhwa: "unleashes an overlapping cluster carpet of flame eruptions that completely blankets the field",
            hlakbil: "somatic strikes discharge a machine-gun flurry of overlapping incendiary bursts with each punch",
            ruluwar: "the flame construct disperses into a dense swarm of orbiting incendiary orbs that overwhelm targets",
            iwati: "the relic unleashes dense clusters of incendiary plasma darts on every strike"
        },
        hanhum: {
            uruwak: "swarms forward as a high-density cluster-salvo of pressurized hydro-bolts that bombards the target",
            lalhwa: "unleashes an overlapping cluster carpet of crushing water-hammer geysers across the front",
            hlakbil: "somatic strikes discharge a rapid-fire cluster of high-pressure fluid bursts on impact",
            ruluwar: "the fluid mass disperses into a dense swarm of tracking water darts that pepper the quarry",
            iwati: "the relic discharges dense clusters of high-pressure water-javelins upon contact"
        },
        falga: {
            uruwak: "swarms forward as a devastating cluster-volley of jagged basalt boulders that bombards the zone",
            lalhwa: "unleashes an overlapping cluster carpet of upheaving stalagmites across the entire sector",
            hlakbil: "somatic strikes discharge a machine-gun barrage of heavy granite flak on every blow",
            ruluwar: "the stone golem hurls dense swarms of jagged stone fragments to pepper enemy ranks",
            iwati: "the relic unleashes dense clusters of high-velocity granite flak on impact"
        },
        jalfinn: {
            uruwak: "swarms forward as a screaming cluster-salvo of micro-cyclones that shreds target defenses",
            lalhwa: "unleashes an overlapping cluster carpet of barometric microbursts across the entire front",
            hlakbil: "somatic strikes discharge a rapid-fire flurry of overlapping pneumatic shockwaves",
            ruluwar: "the tempest entity disperses into a dense swarm of tracking vacuum vortexes",
            iwati: "the relic discharges dense clusters of supersonic vacuum blades on strike"
        },
        iklad: {
            uruwak: "swarms forward as a dense, buzzing cluster-salvo of ball-lightning orbs that saturates the area",
            lalhwa: "unleashes an overlapping cluster carpet of dielectric thunderclaps across the frontline",
            hlakbil: "somatic strikes discharge a machine-gun flurry of high-voltage electric sparks on impact",
            ruluwar: "the storm entity disperses into a dense swarm of buzzing ball-lightning familiars",
            iwati: "the relic discharges dense clusters of dielectric spark needles upon collision"
        },
        erlaaw: {
            uruwak: "swarms forward as a blinding cluster-salvo of radiant photonic darts that saturates the target",
            lalhwa: "unleashes an overlapping cluster carpet of solar micro-flares that incinerates the forward line",
            hlakbil: "somatic strikes discharge a rapid-fire flurry of blinding hard-light laser pulses",
            ruluwar: "the luminous construct disperses into a dense constellation of radiant hard-light stars",
            iwati: "the relic discharges dense clusters of coherent hard-light laser needles on strike"
        },
        worulim: {
            uruwak: "swarms forward as a suffocating cluster-salvo of micro-void spheres that devours matter in its path",
            lalhwa: "unleashes an overlapping cluster carpet of entropic shadow rifts across the battlefield",
            hlakbil: "somatic strikes discharge a rapid-fire flurry of entropic void pulses on impact",
            ruluwar: "the void construct disperses into a dense swarm of shadowy entropic familiars",
            iwati: "the relic discharges dense clusters of matter-excision void darts on contact"
        },
        amin: {
            uruwak: "swarms forward as a dense, high-velocity cluster-salvo of pure etheric mana darts",
            lalhwa: "unleashes an overlapping cluster carpet of raw kinetic mana bursts across the front",
            hlakbil: "somatic strikes discharge a machine-gun flurry of pure etheric shockwaves on impact",
            ruluwar: "the mana construct disperses into a dense swarm of tracking pure mana darts",
            iwati: "the relic discharges dense clusters of ward-shattering etheric needles on strike"
        }
    }
};

// ==========================================================================
// 9. NON-REDUNDANT UNIVERSAL COMPOUND TITLE DESCRIPTORS
// ==========================================================================

// Impact Compound Descriptors (Focus on kinetic/destruction physics - no "Lance" or "Blade" collisions)
const IMPACT_DESCRIPTORS = {
    bamtuk: "Detonating",
    tupwok: "Concussive-Shock",
    dukto: "Armor-Boring",
    iwa: "Razor-Cleaving",
    pittip: "Mountain-Crushing",
    waras: "Flak-Scattering",
    tublag: "Ricocheting",
    tigkab: "Shatter-Fragmenting"
};

// Movement Compound Descriptors (Focus on vector physics - no repetitive elemental prefixes)
const MOVEMENT_DESCRIPTORS = {
    rundo: "Force-Repelling",
    yudgo: "Vortex-Pulling",
    kitas: "Magnetic-Drawing",
    ewansi: "Ward-Deflective",
    surut: "Quarry-Seeking",
    blisu: "Boomerang-Returning",
    liwak: "Orbital-Revolving",
    kijlo: "Artillery-Lobbed"
};

// Duration Compound Descriptors (Focus on temporal cadence)
const DURATION_DESCRIPTORS = {
    tat: "Instant-Flash",
    tul: "Sustained",
    bati: "Everlasting",
    tan: "Delayed-Fuse",
    lit: "Staccato-Pulsing",
    talkib: "Stasis-Trap",
    litu: "Self-Cycling"
};

// Multiply Compound Descriptors (Focus on structural duplication)
const MULTIPLY_DESCRIPTORS = {
    tiha: "Fission-Split",
    padu: "Quad-Salvo",
    silpu: "Cascading-Arc",
    bunton: "Cluster-Swarm"
};

// Tactical Target / Control Descriptors (Focus on combat role)
const TACTICAL_DESCRIPTORS = {
    ami: "Spell-Shattering",
    giba: "Bio-Disrupting",
    tigam: "Structure-Sundering",
    asym: "Target-Locked",
    adau: "Field-Engulfing",
    aduy: "Remote-Manifested",
    genu: "Contact-Discharged",
    shak: "Somatic-Bound",
    suruti: "Auto-Tracking",
    spat: "Gesture-Guided",
    itta: "Hover-Locked",
    pakut: "Terrain-Riveted",
    alisi: "Vector-Snapping",
    morpa: "Adaptive-Morphing"
};


// ================= MAIN COMPILER ENGINE ================= //

function compileSpell() {
    const elObj = ELEMENTS.find(e => e.id === state.element) || ELEMENTS[0];
    const delObj = DELIVERIES.find(d => d.id === state.delivery) || DELIVERIES[0];
    const activeMods = state.modifiers.map(id => MODIFIERS.find(m => m.id === id)).filter(Boolean);
    const hasMod = (id) => activeMods.some(m => m.id === id);

    // 1. DUAL CHANT GENERATION
    let standardTokens = [];
    if (delObj.id === 'hlakbil' || delObj.id === 'ruluwar' || delObj.id === 'iwati') {
        standardTokens.push(delObj.name, elObj.name);
    } else {
        standardTokens.push(elObj.name, delObj.name);
    }
    activeMods.forEach(m => standardTokens.push(m.name));
    document.getElementById("standardChant").innerText = standardTokens.join(" ") + "!";

    let mainStem = "";
    if (delObj.id === 'hlakbil') mainStem = "Hlak-" + elObj.name;
    else if (delObj.id === 'ruluwar') mainStem = "Rul-" + elObj.name;
    else if (delObj.id === 'iwati') mainStem = "Iwat-" + elObj.name;
    else mainStem = elObj.name + " " + delObj.stem;

    let highChant = activeMods.length > 0
        ? `${mainStem}-${activeMods.map(m => m.stem).join("-")}!`
        : `${mainStem}!`;
    document.getElementById("highChant").innerText = highChant;

    // -------------------------------------------------------------
    // 2. DYNAMIC NON-REDUNDANT COMPOUND TITLE SYNTHESIS
    // -------------------------------------------------------------
    let titlePrefix = "";
    if (hasMod('piag') && hasMod('kupos')) titlePrefix = "Overcharged Dense ";
    else if (hasMod('piag')) titlePrefix = "Greater ";
    else if (hasMod('kupos')) titlePrefix = "Condensed ";
    else if (hasMod('asanu')) titlePrefix = "Razor-Honed ";
    else if (hasMod('kunta')) titlePrefix = "Adamantine ";
    else if (hasMod('sapas')) titlePrefix = "Hypersonic ";
    else if (hasMod('sukap')) titlePrefix = "Tempered ";
    else if (hasMod('lawal')) titlePrefix = "Cataclysmic ";

    // Gather unique compounding action/cadence descriptors
    let descriptorTokens = [];

    // 1. Tactical (Target / Control)
    const activeTacMod = activeMods.find(m => m.cat === 'target' || m.cat === 'control');
    if (activeTacMod && TACTICAL_DESCRIPTORS[activeTacMod.id]) {
        descriptorTokens.push(TACTICAL_DESCRIPTORS[activeTacMod.id]);
    }

    // 2. Duration Descriptor
    const activeDurationMod = activeMods.find(m => m.cat === 'duration');
    if (activeDurationMod && DURATION_DESCRIPTORS[activeDurationMod.id]) {
        descriptorTokens.push(DURATION_DESCRIPTORS[activeDurationMod.id]);
    }

    // 3. Movement Descriptor
    const activeMovementMod = activeMods.find(m => m.cat === 'movement');
    if (activeMovementMod && MOVEMENT_DESCRIPTORS[activeMovementMod.id]) {
        descriptorTokens.push(MOVEMENT_DESCRIPTORS[activeMovementMod.id]);
    }

    // 4. Multiply Descriptor
    const activeMultiplyMod = activeMods.find(m => m.cat === 'multiply');
    if (activeMultiplyMod && MULTIPLY_DESCRIPTORS[activeMultiplyMod.id]) {
        descriptorTokens.push(MULTIPLY_DESCRIPTORS[activeMultiplyMod.id]);
    }

    // 5. Impact Descriptor
    const activeImpactMod = activeMods.find(m => m.cat === 'impact');
    if (activeImpactMod && IMPACT_DESCRIPTORS[activeImpactMod.id]) {
        descriptorTokens.push(IMPACT_DESCRIPTORS[activeImpactMod.id]);
    }

    // Core Spell Noun Resolution
    let coreSpellName = "";

    if (delObj.id === 'hlakbil') {
        const parts = state.bodyParts || ["whole_body"];
        const elKey = elObj.id;
        const activeShapeMod = activeMods.find(m => m.cat === 'shape');
        const shapeId = activeShapeMod ? activeShapeMod.id : null;

        if (parts.length === 1) {
            if (shapeId) {
                coreSpellName = getSomaticShapeTitle(elKey, parts[0], shapeId);
            } else {
                coreSpellName = HLAKBIL_ANATOMY_BASE[elKey][parts[0]] || `${elObj.label} Infusion`;
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
                comboBase = HLAKBIL_COMBO_BASE.chassis[elKey] || `${elObj.label} Combat Frame`;
            } else if (hasFists && hasLegs) {
                comboBase = HLAKBIL_COMBO_BASE.martial[elKey];
            } else if (hasEyes && hasThroat) {
                comboBase = HLAKBIL_COMBO_BASE.sight_voice[elKey];
            } else if (hasEyes && hasSpine) {
                comboBase = HLAKBIL_COMBO_BASE.sight_spine[elKey];
            } else if (hasTorso && hasSpine) {
                comboBase = HLAKBIL_COMBO_BASE.core_spine[elKey];
            } else if (hasSkin && hasTorso) {
                comboBase = HLAKBIL_COMBO_BASE.skin_core[elKey];
            } else if (hasWeapon) {
                const otherPart = parts.find(p => p !== 'weapon_grip');
                const otherTitle = shapeId ? getSomaticShapeTitle(elKey, otherPart, shapeId) : HLAKBIL_ANATOMY_BASE[elKey][otherPart];
                comboBase = `${HLAKBIL_ANATOMY_BASE[elKey].weapon_grip} & ${otherTitle}`;
            } else {
                const partTitles = parts.map(p => shapeId ? getSomaticShapeTitle(elKey, p, shapeId) : HLAKBIL_ANATOMY_BASE[elKey][p]);
                comboBase = partTitles.join(" & ");
            }

            if (shapeId && !hasWeapon && parts.length <= 2) {
                if (shapeId === 'yangga') comboBase = comboBase.replace("Martial Form", "Spiked Martial Form").replace("Combat Stance", "Needle-Strike Stance");
                else if (shapeId === 'taddum') comboBase = comboBase.replace("Martial Form", "Razor Martial Form").replace("Combat Stance", "Scythe Stance");
                else if (shapeId === 'praba') comboBase = comboBase.replace("Carapace", "Aegis Plate").replace("Mantle", "Barrier Mantle");
            }

            coreSpellName = comboBase;
        }
    } else {
        let titleShape = elObj.label;
        if (hasMod('yangga')) titleShape = `${elObj.label} Lance`;
        else if (hasMod('taddum')) titleShape = `${elObj.label} Blade`;
        else if (hasMod('gilbo')) titleShape = `${elObj.label} Sphere`;
        else if (hasMod('yinla')) titleShape = `${elObj.label} Ray`;
        else if (hasMod('praba')) titleShape = `${elObj.label} Barrier`;
        else if (hasMod('ngisngi')) titleShape = `${elObj.label} Chakram`;
        else if (hasMod('apap')) titleShape = `${elObj.label} Cone`;
        else if (hasMod('abbay')) titleShape = `${elObj.label} Domain`;
        else titleShape = `${elObj.label} ${delObj.label}`;

        coreSpellName = titleShape;
    }

    // Limit active compound descriptors to the 3 most impactful for maximum punchiness
    const activeDescriptorPrefix = descriptorTokens.slice(0, 3).map(d => d.trim()).join(" ");
    const fullDescriptorChain = activeDescriptorPrefix ? activeDescriptorPrefix + " " : "";

    document.getElementById("spellTitle").innerText = `${titlePrefix}${fullDescriptorChain}${coreSpellName}`.replace(/\s+/g, ' ').trim();

    // ---------------------------------------------------------
    // 3. COMBINATORIAL NARRATIVE LORE SYNTHESIS
    // ---------------------------------------------------------
    let storyParagraphs = [];
    let synergies = [];

    const isHlakbil = delObj.id === 'hlakbil';
    const activeParts = isHlakbil ? (state.bodyParts || ["whole_body"]) : [];
    const isSinglePart = isHlakbil && activeParts.length === 1;
    const primaryPart = isSinglePart ? activeParts[0] : null;

    // --- PHASE 1: MANIFESTATION & SOMATIC IMPLANTATION ---
    let shapeKey = 'default';
    if (hasMod('yangga')) shapeKey = 'yangga';
    else if (hasMod('taddum')) shapeKey = 'taddum';
    else if (hasMod('gilbo')) shapeKey = 'gilbo';
    else if (hasMod('yinla')) shapeKey = 'yinla';
    else if (hasMod('praba')) shapeKey = 'praba';
    else if (hasMod('ngisngi')) shapeKey = 'ngisngi';
    else if (hasMod('apap')) shapeKey = 'apap';
    else if (hasMod('abbay')) shapeKey = 'abbay';

    const elementShapeDesc = (ELEMENT_SHAPE_MANIFESTATIONS[elObj.id] && ELEMENT_SHAPE_MANIFESTATIONS[elObj.id][shapeKey])
        ? ELEMENT_SHAPE_MANIFESTATIONS[elObj.id][shapeKey]
        : `a potent concentration of ${elObj.desc}`;

    let introSentence = "";

    if (isHlakbil) {
        const activePartObjs = activeParts.map(id => BODY_PARTS.find(bp => bp.id === id)).filter(Boolean);
        const anatomyDesc = joinNatural(activePartObjs.map(bp => bp.desc));

        if (primaryPart === 'fists') {
            introSentence = `Igniting the caster's fists, knuckles, and palms with ${elObj.desc}, the striking limbs resonate as living martial weapons, manifesting ${elementShapeDesc} enveloping the hands.`;
        } else if (primaryPart === 'arms') {
            introSentence = `Plating the caster's forearms and upper limbs with ${elObj.desc}, the tissue forms protective and projective conduits, manifesting ${elementShapeDesc} forged directly over the bracers.`;
        } else if (primaryPart === 'legs') {
            introSentence = `Flooding the legs, calves, and soles with ${elObj.desc}, kinetic momentum surges through the lower limbs, manifesting ${elementShapeDesc} across the stride and striking heels.`;
        } else if (primaryPart === 'throat') {
            introSentence = `Suffusing the vocal tract, larynx, and lungs with ${elObj.desc}, the caster's respiration vibrates with compressed arcane harmonics, prepared to discharge ${elementShapeDesc} directly through spoken incantation.`;
        } else if (primaryPart === 'torso') {
            introSentence = `Forging an internal elemental furnace within the chest cavity and thoracic core, ${elObj.desc} circulates through the ribs and heart, anchoring ${elementShapeDesc} over the vital center.`;
        } else if (primaryPart === 'spine') {
            introSentence = `Overclocking the spinal column and central nervous pathways with ${elObj.desc}, bio-electric transmission accelerates across every vertebra, projecting ${elementShapeDesc} along the neural axis.`;
        } else if (primaryPart === 'skin') {
            introSentence = `Reinforcing the epidermal dermal layers with ${elObj.desc}, the skin crystallizes into an adaptive mantle, manifesting ${elementShapeDesc} as a seamless protective carapace.`;
        } else if (primaryPart === 'eyes') {
            introSentence = `Attuning the ocular matrix, corneas, and retinas to ${elObj.desc}, the gaze ignites with enhanced sensory acuity, projecting ${elementShapeDesc} along the caster's line of sight.`;
        } else if (primaryPart === 'weapon_grip') {
            introSentence = `Directing the weave into ${anatomyDesc}, the physical weapon is suffused with ${elObj.desc}, coating the striking edge in ${elementShapeDesc}.`;
        } else if (primaryPart === 'whole_body') {
            introSentence = `Channeling the weave throughout ${anatomyDesc}, the caster's physical form is completely cloaked and reinforced with ${elObj.desc}, manifesting ${elementShapeDesc} as an encompassing somatic aura.`;
        } else {
            introSentence = `Channeling the weave with surgical precision across ${anatomyDesc}, the caster suffuses the chosen anatomy with ${elObj.desc}, causing the linked physical tissue to resonate in unison as ${elementShapeDesc}.`;
        }
    } else if (delObj.id === 'ruluwar') {
        introSentence = `Dispensing with all rigid casting frameworks, the caster externalizes raw ${elObj.desc} as a living extension of their own mind, dynamically molding it into ${elementShapeDesc} governed entirely by pure intent.`;
    } else if (delObj.id === 'iwati') {
        introSentence = `Inscribing enduring runic anchors into an inanimate relic, the caster permanently weaves the properties of ${elObj.desc} into ${elementShapeDesc}.`;
    } else if (delObj.id === 'uruwak') {
        introSentence = `Gathering at the caster's focal matrix, ${elObj.desc} coalesces into ${elementShapeDesc} before launching outward along a true ballistic vector.`;
    } else if (delObj.id === 'lalhwa') {
        introSentence = `Erupting outward in a sweeping, tidal wavefront, ${elObj.desc} blankets the immediate field, advancing as ${elementShapeDesc} across the entire frontline.`;
    }

    // --- PHASE 2: FLIGHT DYNAMICS, MOVEMENT & 4×8×5 MULTIPLICATION ---
    let flightTraits = [];

    const flightModKeys = ['surut', 'blisu', 'liwak', 'kijlo'];
    flightModKeys.forEach(k => {
        if (hasMod(k)) {
            const table = MOVEMENT_LORE_MATRIX[k];
            if (table && table[elObj.id] && table[elObj.id][delObj.id]) {
                flightTraits.push(table[elObj.id][delObj.id]);
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
        if (hasMod(k)) {
            const table = MULTIPLY_LORE_MATRIX[k];
            if (table && table[elObj.id] && table[elObj.id][delObj.id]) {
                multiTraits.push(table[elObj.id][delObj.id]);
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

    // --- PHASE 3: TARGETING, SENSORY MODES & 7×8×5 DURATION DYNAMICS ---
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

    // 7×8×5 Combinatorial Duration Lookup
    let durationClauses = [];
    const durModKeys = ['tat', 'tul', 'bati', 'tan', 'lit', 'talkib', 'litu'];
    durModKeys.forEach(k => {
        if (hasMod(k)) {
            const durTable = DURATION_LORE_MATRIX[k];
            if (durTable && durTable[elObj.id] && durTable[elObj.id][delObj.id]) {
                durationClauses.push(durTable[elObj.id][delObj.id]);
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

    // --- PHASE 4: 8×8×5 COMBINATORIAL IMPACT & TERMINAL MOVEMENT DYNAMICS ---
    let impactClauses = [];

    // Combinatorial Impact Modifiers
    const impactModKeys = ['bamtuk', 'tupwok', 'dukto', 'iwa', 'pittip', 'waras', 'tublag', 'tigkab'];
    impactModKeys.forEach(k => {
        if (hasMod(k)) {
            const table = IMPACT_LORE_MATRIX[k];
            if (table && table[elObj.id] && table[elObj.id][delObj.id]) {
                impactClauses.push(table[elObj.id][delObj.id]);
            }
        }
    });

    // Combinatorial Terminal Movement Modifiers (rundo, yudgo, kitas, ewansi)
    const termMoveModKeys = ['rundo', 'yudgo', 'kitas', 'ewansi'];
    termMoveModKeys.forEach(k => {
        if (hasMod(k)) {
            const table = MOVEMENT_LORE_MATRIX[k];
            if (table && table[elObj.id] && table[elObj.id][delObj.id]) {
                impactClauses.push(table[elObj.id][delObj.id]);
            }
        }
    });

    if (impactClauses.length > 0) {
        storyParagraphs.push(`Upon contact, the spell ${joinNatural(impactClauses)}.`);
    }

    // --- PHASE 5: INTENSITY, SYNERGIES & ELEMENTAL TUNING ---
    let intensityClauses = [];
    if (hasMod('piag')) intensityClauses.push("overcharging mana circulation to maximize physical output and destructive payload");
    if (hasMod('sukap')) intensityClauses.push("throttling power output to a strictly controlled, non-lethal sparring threshold");
    if (hasMod('lawal')) intensityClauses.push("expanding the volumetric shockwave to engulf vast swathes of the frontline");

    if (hasMod('kunta')) {
        if (elObj.id === 'falga') {
            intensityClauses.push("petrifies mineral structures into adamantine, diamond-grade crystalline bedrock");
            synergies.push({ type: 'buff', text: 'Geological Petrification: Diamond-grade density active.' });
        } else if (elObj.id === 'hanhum') {
            intensityClauses.push("crystallizes the fluid into absolute-zero glacial ice sheets");
            synergies.push({ type: 'buff', text: 'Cryogenic Glaciation: Absolute-zero structural freeze.' });
        } else {
            intensityClauses.push("hardens the physical matrix into near-indestructible physical density");
        }
    }

    if (hasMod('kupos')) {
        if (elObj.id === 'sfalhoy') {
            intensityClauses.push("thermal compression forces the flames into a blinding blue-white plasma state of extreme temperature");
            synergies.push({ type: 'buff', text: 'Thermal Synergism: Blue/White Plasma Compression active.' });
        } else if (elObj.id === 'hanhum') {
            intensityClauses.push("hyper-pressurizes the fluid stream into an industrial-grade cutting jet");
            synergies.push({ type: 'buff', text: 'Hydro-Pressure Synergism: Ultra-high PSI jet stream active.' });
        } else if (elObj.id === 'jalfinn') {
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
    // 4. CRITICAL SOMATIC HAZARDS & INCOMPATIBILITY DETECTION MATRIX
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
    if (isHlakbil && elObj.id === 'amin' && hasMod('ami') && (activeParts.includes('fists') || activeParts.includes('weapon_grip'))) {
        synergies.push({ type: 'buff', text: 'Spell-Shattering Strikes: Physical strikes shatter foreign magical barriers, wards, and ongoing enchantments on contact.' });
    }
    if (isHlakbil && activeParts.includes('legs') && hasMod('sapas')) {
        synergies.push({ type: 'buff', text: 'Flash-Step Locomotion: Supersonic sprint bursts grant near-instantaneous evasion.' });
    }
    if (isHlakbil && activeParts.includes('throat') && elObj.id === 'sfalhoy' && (hasMod('apap') || hasMod('lawal'))) {
        synergies.push({ type: 'buff', text: 'Dragon Breath Inhalation: Wide-angle incendiary breath completely incinerates vanguard lines.' });
    }
    if (isHlakbil && activeParts.includes('spine') && elObj.id === 'iklad' && hasMod('sapas')) {
        synergies.push({ type: 'buff', text: 'Superconducting Synapse Overdrive: Microsecond bio-electric reflexes active.' });
    }
    if (isHlakbil && activeParts.includes('skin') && elObj.id === 'falga' && hasMod('kunta')) {
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
    if (elObj.id === 'iklad' && (hasMod('silpu') || hasMod('padu'))) {
        synergies.push({ type: 'buff', text: 'Ionizing Chain Reaction: Lightning arcs chain across multiple targets with zero dissipation.' });
    }
    if (elObj.id === 'worulim' && hasMod('yudgo') && hasMod('gilbo')) {
        synergies.push({ type: 'buff', text: 'Singularity Horizon: Manifests an inescapable micro-void gravitational center.' });
    }
    if (delObj.id === 'iwati' && hasMod('bati')) {
        synergies.push({ type: 'buff', text: 'Permanent Relic Inscription: Enchantment locked into item matrix indefinitely.' });
    }

    // ---------------------------------------------------------
    // 5. RENDER OUTPUT TO DOM & RE-TRIGGER SVG CIRCLE
    // ---------------------------------------------------------
    document.getElementById("spellStory").innerHTML = storyParagraphs.map(p => `<p style="margin-bottom:0.75rem;">${p}</p>`).join("");

    const synContainer = document.getElementById("synergyContainer");
    synContainer.innerHTML = synergies.map(s => `
        <div class="synergy-tag ${s.type === 'buff' ? 'buff' : ''}">
            <span>${s.type === 'buff' ? '⚡' : '⚠️'}</span>
            <span>${s.text}</span>
        </div>
    `).join("");

    const breakdownList = document.getElementById("breakdownList");
    let items = [];
    items.push(`<li><span>${elObj.name}</span>: Elemental Core (${elObj.label})</li>`);
    items.push(`<li><span>${delObj.name}</span>: Vector Matrix (${delObj.label})</li>`);
    activeMods.forEach(m => {
        items.push(`<li><span>${m.name}</span> [${m.stem}]: ${m.desc}</li>`);
    });
    breakdownList.innerHTML = items.join("");
// Safe execution of Spell Circle Renderer & Audio Real-Time State Sync
    if (typeof renderSpellCircle === "function") {
        renderSpellCircle();
    }
    if (typeof syncAudioWithState === "function") {
        syncAudioWithState();
    }
}