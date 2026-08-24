/* ==========================================================================
   MAGIC ARRAY PRE-BUILT ARCHIVE & BOOK MODAL ENGINE
   Contains 68 Exhaustive Pre-Built Tactical Arrays with Generated Technical Subtitles
   ========================================================================== */

const PREBUILT_ARRAYS = [
    // =========================================================================
    // 1. HOMOGENEOUS TRIADS (U-U-U, L-L-L, H-H-H, I-I-I)
    // =========================================================================
    {
        id: "solar_railgun",
        title: "Photonic Solar Flare Siege Battery",
        academicTitle: "Interlocking Orbital Battery of the Thermonuclear Photonic Arc",
        topology: "U-U-U",
        elements: ["sfalhoy", "iklad", "erlaaw"],
        reaction: "Thermonuclear Photonic Arc",
        role: "Autonomous Orbital Crossfire & Precision Piercing",
        desc: "Precision plasma darts accelerating along synchronized orbital relays before delivering unblockable laser-guided rail strikes.",
        nodes: {
            alpha: { element: "sfalhoy", delivery: "uruwak", bodyParts: ["whole_body"], modifiers: ["asym", "suruti"] },
            beta:  { element: "iklad",   delivery: "uruwak", bodyParts: ["whole_body"], modifiers: ["liwak", "tat"] },
            gamma: { element: "erlaaw",  delivery: "uruwak", bodyParts: ["whole_body"], modifiers: ["yinla", "dukto", "sapas"] }
        }
    },
    {
        id: "hadal_trench_collapse",
        title: "Hadal Abyss Cataclysm Domain",
        academicTitle: "Calamity Domain Horizon of the Hadal Abyss Trench-Collapse",
        topology: "L-L-L",
        elements: ["hanhum", "falga", "worulim"],
        reaction: "Hadal Abyss Trench-Collapse",
        role: "Battlefield-Wide Planar Restructuring & Crushing",
        desc: "Generates massive ocean-trench hydrostatic pressure across regional bedrock, collapsing enemy armor and subterranean structures.",
        nodes: {
            alpha: { element: "hanhum",  delivery: "lalhwa", bodyParts: ["whole_body"], modifiers: ["adau", "itta"] },
            beta:  { element: "falga",   delivery: "lalhwa", bodyParts: ["whole_body"], modifiers: ["yudgo", "tul"] },
            gamma: { element: "worulim", delivery: "lalhwa", bodyParts: ["whole_body"], modifiers: ["pittip", "kupos", "lawal"] }
        }
    },
    {
        id: "thunder_god_avatar",
        title: "Transcendent Thunder God Avatar",
        academicTitle: "Transcendent God-Form Stance of the Superconducting Terawatt Overdrive",
        topology: "H-H-H",
        elements: ["iklad", "iklad", "iklad"],
        reaction: "Superconducting Terawatt Overdrive",
        role: "Supreme Martial Transmutation & Continuous Chaining",
        desc: "Overclocks the caster's biological and neural frame with zero electrical resistance, turning the physical body into living lightning.",
        nodes: {
            alpha: { element: "iklad", delivery: "hlakbil", bodyParts: ["whole_body"], modifiers: ["shak", "giba"] },
            beta:  { element: "iklad", delivery: "hlakbil", bodyParts: ["arms", "legs"], modifiers: ["rundo", "silpu", "tan"] },
            gamma: { element: "iklad", delivery: "hlakbil", bodyParts: ["fists"], modifiers: ["sapas", "piag", "ngisngi"] }
        }
    },
    {
        id: "adamantine_citadel",
        title: "Monumental Adamantine Aegis Citadel",
        academicTitle: "Monumental Aegis Citadel of the Adamantine Runic Monolith",
        topology: "I-I-I",
        elements: ["falga", "falga", "amin"],
        reaction: "Adamantine Runic Monolith",
        role: "Indestructible Fortress Warding & Permanent Anchoring",
        desc: "Interlocking permanent architectural monoliths forming an unbreakable city-scale warding crucible impervious to kinetic breaches.",
        nodes: {
            alpha: { element: "falga", delivery: "iwati", bodyParts: ["whole_body"], modifiers: ["pakut", "tigam"] },
            beta:  { element: "falga", delivery: "iwati", bodyParts: ["whole_body"], modifiers: ["bati", "ewansi"] },
            gamma: { element: "amin",  delivery: "iwati", bodyParts: ["whole_body"], modifiers: ["praba", "kunta"] }
        }
    },
    {
        id: "vacuum_singularity_battery",
        title: "Supersonic Vacuum Shear Singularity",
        academicTitle: "Interlocking Orbital Battery of the Supersonic Vacuum Singularity",
        topology: "U-U-U",
        elements: ["jalfinn", "jalfinn", "jalfinn"],
        reaction: "Supersonic Vacuum Singularity",
        role: "Atmospheric Evacuation & Molecular Slicing",
        desc: "Launches synchronized wind cores that expand into an airless vacuum vortex surrounded by Mach-5 slicing wind shears.",
        nodes: {
            alpha: { element: "jalfinn", delivery: "uruwak", bodyParts: ["whole_body"], modifiers: ["aduy", "asym"] },
            beta:  { element: "jalfinn", delivery: "uruwak", bodyParts: ["whole_body"], modifiers: ["liwak", "tiha"] },
            gamma: { element: "jalfinn", delivery: "uruwak", bodyParts: ["whole_body"], modifiers: ["iwa", "sapas", "taddum"] }
        }
    },
    {
        id: "glacial_permafrost_domain",
        title: "Cryogenic Glacial Permafrost Cataclysm",
        academicTitle: "Calamity Domain Horizon of the Glacial Permafrost",
        topology: "L-L-L",
        elements: ["hanhum", "hanhum", "jalfinn"],
        reaction: "Cryogenic Glacial Permafrost",
        role: "Frontline Glaciation & Molecular Brittle Shattering",
        desc: "A territory-wide sub-zero thermal collapse that flash-freezes ambient moisture, instantly crystallizing enemy lines into brittle ice.",
        nodes: {
            alpha: { element: "hanhum",  delivery: "lalhwa", bodyParts: ["whole_body"], modifiers: ["adau", "itta"] },
            beta:  { element: "hanhum",  delivery: "lalhwa", bodyParts: ["whole_body"], modifiers: ["tul", "litu"] },
            gamma: { element: "jalfinn", delivery: "lalhwa", bodyParts: ["whole_body"], modifiers: ["tigkab", "lawal"] }
        }
    },
    {
        id: "infernal_dragon_avatar",
        title: "Thermonuclear Dragon-God Avatar",
        academicTitle: "Transcendent God-Form Stance of the Thermonuclear Stellar Core",
        topology: "H-H-H",
        elements: ["sfalhoy", "sfalhoy", "sfalhoy"],
        reaction: "Thermonuclear Stellar Core",
        role: "Thermal Plasma Transmutation & Meltdown Aura",
        desc: "Converts the caster's circulatory and neuromuscular core into a thermonuclear reactor, radiating unquenchable blue plasma.",
        nodes: {
            alpha: { element: "sfalhoy", delivery: "hlakbil", bodyParts: ["whole_body"], modifiers: ["shak", "spat"] },
            beta:  { element: "sfalhoy", delivery: "hlakbil", bodyParts: ["torso", "arms"], modifiers: ["liwak", "tat"] },
            gamma: { element: "sfalhoy", delivery: "hlakbil", bodyParts: ["fists"], modifiers: ["bamtuk", "piag", "sapas"] }
        }
    },
    {
        id: "oblivion_aegis_vault",
        title: "Oblivion Event Horizon Aegis Vault",
        academicTitle: "Monumental Aegis Citadel of the Oblivion Event Horizon",
        topology: "I-I-I",
        elements: ["worulim", "worulim", "worulim"],
        reaction: "Oblivion Event Horizon",
        role: "Total Magical & Kinetic Absorption Vault",
        desc: "Three monolithic void obelisks anchored into bedrock, continuously consuming incoming magical spells and matter into non-existence.",
        nodes: {
            alpha: { element: "worulim", delivery: "iwati", bodyParts: ["whole_body"], modifiers: ["pakut", "ami"] },
            beta:  { element: "worulim", delivery: "iwati", bodyParts: ["whole_body"], modifiers: ["bati", "yudgo"] },
            gamma: { element: "worulim", delivery: "iwati", bodyParts: ["whole_body"], modifiers: ["kunta", "praba"] }
        }
    },

    // =========================================================================
    // 2. PROJECTILE-INITIATED MATRICES (U-X-X)
    // =========================================================================
    {
        id: "vector_rail_lance",
        title: "Accelerated Vector Rail-Lance",
        academicTitle: "Accelerated Vector Rail-Array of the Thermonuclear Photonic Arc",
        topology: "U-L-U",
        elements: ["sfalhoy", "erlaaw", "iklad"],
        reaction: "Thermonuclear Photonic Arc",
        role: "Anti-Fortification Rail Piercing",
        desc: "A projectile fired into an expansive planar acceleration corridor, exiting as a hyper-mach kinetic penetrator.",
        nodes: {
            alpha: { element: "sfalhoy", delivery: "uruwak", bodyParts: ["whole_body"], modifiers: ["asym", "suruti"] },
            beta:  { element: "erlaaw",  delivery: "lalhwa", bodyParts: ["whole_body"], modifiers: ["liwak", "tat"] },
            gamma: { element: "iklad",   delivery: "uruwak", bodyParts: ["whole_body"], modifiers: ["yinla", "dukto", "sapas"] }
        }
    },
    {
        id: "breaching_shockwave_cannon",
        title: "Volcanic Breaching Shockwave Cannon",
        academicTitle: "Breaching Shockwave Cannon of the Subterranean Volcanic Core",
        topology: "U-L-L",
        elements: ["sfalhoy", "falga", "falga"],
        reaction: "Subterranean Volcanic Core",
        role: "Bunker Busting & Secondary Cluster Eradication",
        desc: "A concentrated ballistic seed penetrates defensive barriers before releasing a field-wide subterranean magma shockwave.",
        nodes: {
            alpha: { element: "sfalhoy", delivery: "uruwak", bodyParts: ["whole_body"], modifiers: ["asym", "genu"] },
            beta:  { element: "falga",   delivery: "lalhwa", bodyParts: ["whole_body"], modifiers: ["rundo", "tan"] },
            gamma: { element: "falga",   delivery: "lalhwa", bodyParts: ["whole_body"], modifiers: ["bamtuk", "tupwok", "lawal"] }
        }
    },
    {
        id: "flak_saturation_matrix",
        title: "Pyroclastic Flak Saturation Matrix",
        academicTitle: "Dispersing Flak Saturation Array of the Pyroclastic Ash Tempest",
        topology: "U-U-L",
        elements: ["sfalhoy", "jalfinn", "falga"],
        reaction: "Pyroclastic Ash Tempest",
        role: "Frontline Breaching & Blanket Area Saturation",
        desc: "Precision ballistic missiles accelerate through orbital relays before expanding into a sweeping carpet of burning ash shrapnel.",
        nodes: {
            alpha: { element: "sfalhoy", delivery: "uruwak", bodyParts: ["whole_body"], modifiers: ["asym", "alisi"] },
            beta:  { element: "jalfinn", delivery: "uruwak", bodyParts: ["whole_body"], modifiers: ["liwak", "bunton"] },
            gamma: { element: "falga",   delivery: "lalhwa", bodyParts: ["whole_body"], modifiers: ["waras", "lawal"] }
        }
    },
    {
        id: "bio_transfusion_vector",
        title: "Astral Bio-Transfusion Vector",
        academicTitle: "Kinetic Bio-Transfusion Vector of the Sacred Astral Purifier",
        topology: "U-U-H",
        elements: ["erlaaw", "amin", "amin"],
        reaction: "Sacred Astral Purifier",
        role: "Remote Ally Overcharging & Instant Buffing",
        desc: "High-speed seeking mana darts converge on a biological host, injecting kinetic momentum and celestial warding cloaks.",
        nodes: {
            alpha: { element: "erlaaw", delivery: "uruwak",  bodyParts: ["whole_body"], modifiers: ["giba", "suruti"] },
            beta:  { element: "amin",   delivery: "uruwak",  bodyParts: ["whole_body"], modifiers: ["padu", "tat"] },
            gamma: { element: "amin",   delivery: "hlakbil", bodyParts: ["whole_body"], modifiers: ["gilbo", "asanu"] }
        }
    },
    {
        id: "ballistic_anchor_battery",
        title: "Continental Ballistic Anchor Battery",
        academicTitle: "Ballistic Anchor Battery of the Continental Adamantine Core",
        topology: "U-U-I",
        elements: ["falga", "falga", "falga"],
        reaction: "Continental Adamantine Core",
        role: "Remote Territorial Inscription & Pylon Grounding",
        desc: "Launches heavy piercing spikes that embed permanently into distant bedrock, establishing remote warding pylons.",
        nodes: {
            alpha: { element: "falga", delivery: "uruwak", bodyParts: ["whole_body"], modifiers: ["asym", "pakut"] },
            beta:  { element: "falga", delivery: "uruwak", bodyParts: ["whole_body"], modifiers: ["liwak", "bati"] },
            gamma: { element: "falga", delivery: "iwati",  bodyParts: ["whole_body"], modifiers: ["praba", "kunta"] }
        }
    },
    {
        id: "somatic_vanguard_breaker",
        title: "Caldera Somatic Vanguard Breaker",
        academicTitle: "Somatic Vanguard Breaker of the Basaltic Caldera Magma",
        topology: "U-L-H",
        elements: ["sfalhoy", "sfalhoy", "falga"],
        reaction: "Basaltic Caldera Magma",
        role: "Shock-Troop Infiltration & Point-Blank Strike",
        desc: "Launches an expansive breach projectile that clears an environmental path for a reinforced somatic charge.",
        nodes: {
            alpha: { element: "sfalhoy", delivery: "uruwak",  bodyParts: ["whole_body"], modifiers: ["asym", "genu"] },
            beta:  { element: "sfalhoy", delivery: "lalhwa",  bodyParts: ["whole_body"], modifiers: ["rundo", "tat"] },
            gamma: { element: "falga",   delivery: "hlakbil", bodyParts: ["fists"], modifiers: ["tupwok", "dukto", "piag"] }
        }
    },
    {
        id: "remote_pylon_projector",
        title: "Magnetic Sandstorm Pylon Projector",
        academicTitle: "Remote Pylon Projector of the Ferromagnetic Sandstorm Tempest",
        topology: "U-L-I",
        elements: ["falga", "jalfinn", "iklad"],
        reaction: "Ferromagnetic Sandstorm Tempest",
        role: "Long-Range Minefield Deployment & Zone Lockdown",
        desc: "Fires broad-area seeds across vast distances that immediately crystallize into permanent electrified runic traps upon landing.",
        nodes: {
            alpha: { element: "falga",   delivery: "uruwak", bodyParts: ["whole_body"], modifiers: ["aduy", "itta"] },
            beta:  { element: "jalfinn", delivery: "lalhwa", bodyParts: ["whole_body"], modifiers: ["yudgo", "litu"] },
            gamma: { element: "iklad",   delivery: "iwati",  bodyParts: ["whole_body"], modifiers: ["yangga", "silpu"] }
        }
    },
    {
        id: "bio_guided_rail_lance",
        title: "Photonic Bio-Guided Rail-Lance",
        academicTitle: "Bio-Kinetic Guided Rail-Lance of the Radiant Dielectric Supercharger",
        topology: "U-H-U",
        elements: ["erlaaw", "iklad", "amin"],
        reaction: "Radiant Dielectric Supercharger",
        role: "Flawless Homing Elimination & High-Evasion Interception",
        desc: "A ballistic core linked to the caster's optical nerves, correcting flight trajectories mid-air via somatic neural focus.",
        nodes: {
            alpha: { element: "erlaaw", delivery: "uruwak",  bodyParts: ["whole_body"], modifiers: ["asym", "spat"] },
            beta:  { element: "iklad",  delivery: "hlakbil", bodyParts: ["eyes"], modifiers: ["surut", "liwak"] },
            gamma: { element: "amin",   delivery: "uruwak",  bodyParts: ["whole_body"], modifiers: ["yinla", "sapas", "dukto"] }
        }
    },
    {
        id: "somatic_rupture_ballistics",
        title: "Hydrothermal Somatic Rupture Darts",
        academicTitle: "Somatic Rupture Ballistics of the Volcanic Hydrothermal Crucible",
        topology: "U-H-L",
        elements: ["sfalhoy", "hanhum", "falga"],
        reaction: "Volcanic Hydrothermal Crucible",
        role: "Localized Armor Shattering & Repulsion",
        desc: "Fires bodily-charged kinetic darts that violently rupture into wide boiling scald shockwaves upon contacting target armor.",
        nodes: {
            alpha: { element: "sfalhoy", delivery: "uruwak",  bodyParts: ["whole_body"], modifiers: ["genu", "suruti"] },
            beta:  { element: "hanhum",  delivery: "hlakbil", bodyParts: ["arms"], modifiers: ["rundo", "tat"] },
            gamma: { element: "falga",   delivery: "lalhwa",  bodyParts: ["whole_body"], modifiers: ["bamtuk", "tupwok"] }
        }
    },
    {
        id: "symbiotic_piercing_avatar",
        title: "Hypersonic Symbiotic Piercing Avatar",
        academicTitle: "Symbiotic Piercing Avatar of the Hypersonic Aether Vortex",
        topology: "U-H-H",
        elements: ["jalfinn", "amin", "amin"],
        reaction: "Hypersonic Aether Vortex",
        role: "High-Velocity Martial Penetration",
        desc: "A piercing missile cycles its momentum back into the caster's vessel, turning the caster into a living kinetic drill.",
        nodes: {
            alpha: { element: "jalfinn", delivery: "uruwak",  bodyParts: ["whole_body"], modifiers: ["asym", "alisi"] },
            beta:  { element: "amin",    delivery: "hlakbil", bodyParts: ["legs"], modifiers: ["liwak", "rundo"] },
            gamma: { element: "amin",    delivery: "hlakbil", bodyParts: ["fists"], modifiers: ["yangga", "sapas", "iwa"] }
        }
    },
    {
        id: "living_spike_inscription",
        title: "Obsidian Living Spike Inscription",
        academicTitle: "Living Spike Inscription of the Obsidian Black-Arc Conduit",
        topology: "U-H-I",
        elements: ["falga", "iklad", "worulim"],
        reaction: "Obsidian Black-Arc Conduit",
        role: "Target Immobilization & Anti-Escape Sealing",
        desc: "Fires blood-infused projectile spikes that pin enemy targets to bedrock, permanently branding them with nerve-rotting runes.",
        nodes: {
            alpha: { element: "falga",   delivery: "uruwak",  bodyParts: ["whole_body"], modifiers: ["asym", "giba"] },
            beta:  { element: "iklad",   delivery: "hlakbil", bodyParts: ["arms"], modifiers: ["silpu", "tan"] },
            gamma: { element: "worulim", delivery: "iwati",   bodyParts: ["whole_body"], modifiers: ["kunta", "praba"] }
        }
    },
    {
        id: "relic_refracted_matrix",
        title: "Aqua-Prism Relic-Refracted Matrix",
        academicTitle: "Relic-Refracted Ballistic Matrix of the Crystalline Aqua-Prism Bastion",
        topology: "U-I-U",
        elements: ["erlaaw", "hanhum", "falga"],
        reaction: "Crystalline Aqua-Prism Bastion",
        role: "Multi-Vector Interception & Laser Prism Weaponry",
        desc: "A ballistic solar beam fired into an ancient water relic splits into a refracted salvo of seeking laser darts.",
        nodes: {
            alpha: { element: "erlaaw", delivery: "uruwak", bodyParts: ["whole_body"], modifiers: ["asym", "aduy"] },
            beta:  { element: "hanhum", delivery: "iwati",  bodyParts: ["whole_body"], modifiers: ["padu", "ewansi"] },
            gamma: { element: "falga",  delivery: "uruwak", bodyParts: ["whole_body"], modifiers: ["yinla", "ngisngi"] }
        }
    },
    {
        id: "anchor_detonating_array",
        title: "Volcanic Anchor-Detonating Siege Array",
        academicTitle: "Anchor-Detonating Siege Array of the Subterranean Volcanic Core",
        topology: "U-I-L",
        elements: ["falga", "sfalhoy", "falga"],
        reaction: "Subterranean Volcanic Core",
        role: "Fortress Structural Demolition & Seismic Takedowns",
        desc: "Drives an inscribed harpoon into fortifications, converting the structure into an explosive seismic epicenter.",
        nodes: {
            alpha: { element: "falga",   delivery: "uruwak", bodyParts: ["whole_body"], modifiers: ["pakut", "asym"] },
            beta:  { element: "sfalhoy", delivery: "iwati",  bodyParts: ["whole_body"], modifiers: ["tat", "rundo"] },
            gamma: { element: "falga",   delivery: "lalhwa", bodyParts: ["whole_body"], modifiers: ["bamtuk", "tupwok"] }
        }
    },
    {
        id: "relic_striking_spear",
        title: "Plasma Foundry Relic-Transferred Spear",
        academicTitle: "Relic-Transferred Striking Lance of the Volcanic Plasma Foundry",
        topology: "U-I-H",
        elements: ["falga", "iklad", "sfalhoy"],
        reaction: "Volcanic Plasma Foundry",
        role: "Ranged-to-Melee Momentum Transition",
        desc: "An enchanted relic fired as a missile channels kinetic recoil directly into empowering the caster's fists with magnetized plasma.",
        nodes: {
            alpha: { element: "falga",   delivery: "uruwak",  bodyParts: ["whole_body"], modifiers: ["asym", "genu"] },
            beta:  { element: "iklad",   delivery: "iwati",   bodyParts: ["whole_body"], modifiers: ["silpu", "liwak"] },
            gamma: { element: "sfalhoy", delivery: "hlakbil", bodyParts: ["fists"], modifiers: ["dukto", "piag"] }
        }
    },
    {
        id: "perpetual_siege_harpoon",
        title: "Continental Perpetual Siege Harpoon",
        academicTitle: "Perpetual Siege Harpoon of the Continental Adamantine Core",
        topology: "U-I-I",
        elements: ["falga", "falga", "falga"],
        reaction: "Continental Adamantine Core",
        role: "Continuous Heavy Armor Piercing & Eradication",
        desc: "An adamantine-inscribed missile burrows into enemy armor and perpetually drills deeper without losing momentum.",
        nodes: {
            alpha: { element: "falga", delivery: "uruwak", bodyParts: ["whole_body"], modifiers: ["asym", "pakut"] },
            beta:  { element: "falga", delivery: "iwati",  bodyParts: ["whole_body"], modifiers: ["bati", "tul"] },
            gamma: { element: "falga", delivery: "iwati",  bodyParts: ["whole_body"], modifiers: ["dukto", "kunta", "tunbog"] }
        }
    },

    // =========================================================================
    // 3. FIELD-INITIATED MATRICES (L-X-X)
    // =========================================================================
    {
        id: "horizon_catapult",
        title: "Aero-Resonant Horizon Catapult",
        academicTitle: "Focused Horizon Catapult of the Aero-Resonant Mana Stream",
        topology: "L-L-U",
        elements: ["jalfinn", "jalfinn", "amin"],
        reaction: "Aero-Resonant Mana Stream",
        role: "Environmental Compression & Forward Release",
        desc: "A vast atmospheric sweep suctions ambient mana inward before launching it outward as a singular hypersonic super-projectile.",
        nodes: {
            alpha: { element: "jalfinn", delivery: "lalhwa", bodyParts: ["whole_body"], modifiers: ["adau", "itta"] },
            beta:  { element: "jalfinn", delivery: "lalhwa", bodyParts: ["whole_body"], modifiers: ["yudgo", "liwak"] },
            gamma: { element: "amin",    delivery: "uruwak", bodyParts: ["whole_body"], modifiers: ["yinla", "sapas", "piag"] }
        }
    },
    {
        id: "atmospheric_bio_cloak",
        title: "Blizzard Atmospheric Bio-Cloak",
        academicTitle: "Atmospheric Bio-Cloak of the Absolute-Zero Blizzard Tempest",
        topology: "L-L-H",
        elements: ["hanhum", "jalfinn", "jalfinn"],
        reaction: "Absolute-Zero Blizzard Tempest",
        role: "Total Environmental Camouflage & Glaciation",
        desc: "A field-wide elemental storm condenses around a host organism, granting sub-zero phase shifting and armor.",
        nodes: {
            alpha: { element: "hanhum",  delivery: "lalhwa",  bodyParts: ["whole_body"], modifiers: ["adau", "morpa"] },
            beta:  { element: "jalfinn", delivery: "lalhwa",  bodyParts: ["whole_body"], modifiers: ["tul", "ewansi"] },
            gamma: { element: "jalfinn", delivery: "hlakbil", bodyParts: ["whole_body"], modifiers: ["tigkab", "asanu"] }
        }
    },
    {
        id: "territorial_consecration",
        title: "Astral Territorial Consecration Array",
        academicTitle: "Territorial Consecration Array of the Sacred Astral Purifier",
        topology: "L-L-I",
        elements: ["erlaaw", "erlaaw", "amin"],
        reaction: "Sacred Astral Purifier",
        role: "Zone Sanctification & Anti-Curse Grounding",
        desc: "A wide elemental surge permanently crystallizes the ground beneath it into consecrated runic wardstone.",
        nodes: {
            alpha: { element: "erlaaw", delivery: "lalhwa", bodyParts: ["whole_body"], modifiers: ["adau", "giba"] },
            beta:  { element: "erlaaw", delivery: "lalhwa", bodyParts: ["whole_body"], modifiers: ["tul", "bati"] },
            gamma: { element: "amin",   delivery: "iwati",  bodyParts: ["whole_body"], modifiers: ["praba", "kunta"] }
        }
    },
    {
        id: "intercepting_flak_perimeter",
        title: "Pyroclastic Intercepting Flak Perimeter",
        academicTitle: "Intercepting Flak Perimeter of the Pyroclastic Ash Tempest",
        topology: "L-U-L",
        elements: ["sfalhoy", "falga", "jalfinn"],
        reaction: "Pyroclastic Ash Tempest",
        role: "Anti-Air Defense & Salvo Deflection",
        desc: "An area-denial field continuously tracks incoming threats and launches autonomous defensive interceptor flak.",
        nodes: {
            alpha: { element: "sfalhoy", delivery: "lalhwa", bodyParts: ["whole_body"], modifiers: ["adau", "suruti"] },
            beta:  { element: "falga",   delivery: "uruwak", bodyParts: ["whole_body"], modifiers: ["kijlo", "bunton"] },
            gamma: { element: "jalfinn", delivery: "lalhwa", bodyParts: ["whole_body"], modifiers: ["waras", "lawal"] }
        }
    },
    {
        id: "converging_crossfire_nexus",
        title: "Photonic Converging Crossfire Nexus",
        academicTitle: "Converging Crossfire Nexus of the Photonic Dielectric Beam",
        topology: "L-U-U",
        elements: ["erlaaw", "erlaaw", "iklad"],
        reaction: "Photonic Dielectric Beam",
        role: "Inescapable Encirclement & Multi-Angle Annihilation",
        desc: "Establishes an expansive kill-zone that generates perimeter launch nodes, firing lasers inward at trapped targets.",
        nodes: {
            alpha: { element: "erlaaw", delivery: "lalhwa", bodyParts: ["whole_body"], modifiers: ["adau", "asym"] },
            beta:  { element: "erlaaw", delivery: "uruwak", bodyParts: ["whole_body"], modifiers: ["padu", "liwak"] },
            gamma: { element: "iklad",  delivery: "uruwak", bodyParts: ["whole_body"], modifiers: ["yinla", "sapas"] }
        }
    },
    {
        id: "field_drawing_conduit",
        title: "Abyssal Siphoning Martial Conduit",
        academicTitle: "Field-Drawing Martial Conduit of the Abyssal Ether-Mire Devourer",
        topology: "L-U-H",
        elements: ["worulim", "hanhum", "amin"],
        reaction: "Abyssal Ether-Mire Devourer",
        role: "Kinetic Siphoning & Close-Quarters Dominance",
        desc: "A wide sensory field siphons kinetic energy from moving enemies, channeling it into the caster's striking fists.",
        nodes: {
            alpha: { element: "worulim", delivery: "lalhwa",  bodyParts: ["whole_body"], modifiers: ["ami", "adau"] },
            beta:  { element: "hanhum",  delivery: "uruwak",  bodyParts: ["whole_body"], modifiers: ["yudgo", "blisu"] },
            gamma: { element: "amin",    delivery: "hlakbil", bodyParts: ["fists"], modifiers: ["tupwok", "piag"] }
        }
    },
    {
        id: "tactical_trap_minefield",
        title: "Magnetic Sandstorm Trap Minefield",
        academicTitle: "Tactical Trap Minefield of the Polarized Magnetic Fulgurite",
        topology: "L-U-I",
        elements: ["falga", "falga", "iklad"],
        reaction: "Polarized Magnetic Fulgurite",
        role: "Perimeter Defense & Ambush Denial",
        desc: "Blankets terrain with dormant runic charges that launch armor-piercing darts upon enemy intrusion.",
        nodes: {
            alpha: { element: "falga", delivery: "lalhwa", bodyParts: ["whole_body"], modifiers: ["adau", "itta"] },
            beta:  { element: "falga", delivery: "uruwak", bodyParts: ["whole_body"], modifiers: ["talkib", "kitas"] },
            gamma: { element: "iklad", delivery: "iwati",  bodyParts: ["whole_body"], modifiers: ["yangga", "silpu"] }
        }
    },
    {
        id: "cardiac_resonance_horizon",
        title: "Hyper-Oxygen Cardiac Resonance Horizon",
        academicTitle: "Somatic Resonance Horizon of the Hyper-Oxygen Fire Vortex",
        topology: "L-H-L",
        elements: ["sfalhoy", "jalfinn", "jalfinn"],
        reaction: "Hyper-Oxygen Fire Vortex",
        role: "Territorial Dominance & Synchronized Blasts",
        desc: "The caster acts as the living conductor for a field-wide firestorm that expands and contracts with their respiration.",
        nodes: {
            alpha: { element: "sfalhoy", delivery: "lalhwa",  bodyParts: ["whole_body"], modifiers: ["adau", "morpa"] },
            beta:  { element: "jalfinn", delivery: "hlakbil", bodyParts: ["torso"], modifiers: ["litu", "liwak"] },
            gamma: { element: "jalfinn", delivery: "lalhwa",  bodyParts: ["whole_body"], modifiers: ["bamtuk", "lawal"] }
        }
    },
    {
        id: "bio_artillery_dome",
        title: "Thermobaric Bio-Artillery Dome",
        academicTitle: "Bio-Generated Artillery Dome of the Thermobaric Scald-Typhoon",
        topology: "L-H-U",
        elements: ["hanhum", "jalfinn", "sfalhoy"],
        reaction: "Thermobaric Scald-Typhoon",
        role: "Stationary Fortress Defense & Bombardment",
        desc: "A defensive perimeter powered by somatic life force continuously fires high-arching boiling scald mortars.",
        nodes: {
            alpha: { element: "hanhum",  delivery: "lalhwa",  bodyParts: ["whole_body"], modifiers: ["adau", "suruti"] },
            beta:  { element: "jalfinn", delivery: "hlakbil", bodyParts: ["throat"], modifiers: ["kijlo", "tul"] },
            gamma: { element: "sfalhoy", delivery: "uruwak",  bodyParts: ["whole_body"], modifiers: ["bamtuk", "sapas"] }
        }
    },
    {
        id: "vanguard_absorption_shroud",
        title: "Anti-Magic Vanguard Absorption Shroud",
        academicTitle: "Vanguard Absorption Shroud of the Absolute Anti-Magic Devourer",
        topology: "L-H-H",
        elements: ["worulim", "worulim", "amin"],
        reaction: "Absolute Anti-Magic Devourer",
        role: "Anti-Mage Armor & Self-Sustaining Combat",
        desc: "An environmental field absorbs hostile magic, directly repairing tissue and hardening the caster's bones.",
        nodes: {
            alpha: { element: "worulim", delivery: "lalhwa",  bodyParts: ["whole_body"], modifiers: ["ami", "giba"] },
            beta:  { element: "worulim", delivery: "hlakbil", bodyParts: ["skin"], modifiers: ["ewansi", "blisu"] },
            gamma: { element: "amin",    delivery: "hlakbil", bodyParts: ["whole_body"], modifiers: ["kunta", "praba"] }
        }
    },
    {
        id: "life_bound_fortress_ward",
        title: "Alluvial Life-Bound Stronghold Ward",
        academicTitle: "Life-Bound Fortress Ward of the Adamantine Alluvial Conduit",
        topology: "L-H-I",
        elements: ["falga", "hanhum", "amin"],
        reaction: "Adamantine Alluvial Conduit",
        role: "Unbreakable Life-Tethered Stronghold Defense",
        desc: "A vast territory-locking barrier anchored to the caster's vital conduits and reinforced by permanent boundary runes.",
        nodes: {
            alpha: { element: "falga",  delivery: "lalhwa",  bodyParts: ["whole_body"], modifiers: ["adau", "itta"] },
            beta:  { element: "hanhum", delivery: "hlakbil", bodyParts: ["skin"], modifiers: ["ewansi", "tul"] },
            gamma: { element: "amin",   delivery: "iwati",   bodyParts: ["whole_body"], modifiers: ["kunta", "praba"] }
        }
    },
    {
        id: "monolith_perimeter_lock",
        title: "Obsidian Monolith-Resonating Perimeter",
        academicTitle: "Monolith-Resonating Perimeter of the Obsidian Gravitational Singularity",
        topology: "L-I-L",
        elements: ["falga", "falga", "worulim"],
        reaction: "Obsidian Gravitational Singularity",
        role: "Anti-Teleportation & Dimensional Grounding",
        desc: "A field stabilized by an array of inscribed stone pillars prevents dimensional tears and spatial teleportation.",
        nodes: {
            alpha: { element: "falga",   delivery: "lalhwa", bodyParts: ["whole_body"], modifiers: ["pakut", "tigam"] },
            beta:  { element: "falga",   delivery: "iwati",  bodyParts: ["whole_body"], modifiers: ["bati", "yudgo"] },
            gamma: { element: "worulim", delivery: "lalhwa", bodyParts: ["whole_body"], modifiers: ["pittip", "lawal"] }
        }
    },
    {
        id: "relic_artillery_battery",
        title: "Sunfire Relic-Driven Artillery Battery",
        academicTitle: "Relic-Driven Artillery Battery of the Thermonuclear Sunfire Flare",
        topology: "L-I-U",
        elements: ["erlaaw", "erlaaw", "sfalhoy"],
        reaction: "Thermonuclear Sunfire Flare",
        role: "Over-the-Horizon Siege Bombardment",
        desc: "A wide mana font feeding ancient inscribed obelisks rains homing sunfire missiles across miles.",
        nodes: {
            alpha: { element: "erlaaw",  delivery: "lalhwa", bodyParts: ["whole_body"], modifiers: ["adau", "suruti"] },
            beta:  { element: "erlaaw",  delivery: "iwati",  bodyParts: ["whole_body"], modifiers: ["padu", "kijlo"] },
            gamma: { element: "sfalhoy", delivery: "uruwak", bodyParts: ["whole_body"], modifiers: ["bamtuk", "piag"] }
        }
    },
    {
        id: "temple_bastion_infusion",
        title: "Astral Temple Bastion Infusion",
        academicTitle: "Temple Bastion Infusion of the Sacred Astral Purifier",
        topology: "L-I-H",
        elements: ["erlaaw", "erlaaw", "amin"],
        reaction: "Sacred Astral Purifier",
        role: "Mass Army Fortification & Morale Regeneration",
        desc: "A consecrated temple zone channels elemental blessings into defenders standing within its boundaries.",
        nodes: {
            alpha: { element: "erlaaw", delivery: "lalhwa",  bodyParts: ["whole_body"], modifiers: ["adau", "giba"] },
            beta:  { element: "erlaaw", delivery: "iwati",   bodyParts: ["whole_body"], modifiers: ["tul", "ewansi"] },
            gamma: { element: "amin",   delivery: "hlakbil", bodyParts: ["whole_body"], modifiers: ["gilbo", "asanu"] }
        }
    },
    {
        id: "eternal_citadel_barrier",
        title: "Adamantine Eternal Citadel Barrier",
        academicTitle: "Eternal Citadel Barrier of the Adamantine Runic Monolith",
        topology: "L-I-I",
        elements: ["falga", "falga", "amin"],
        reaction: "Adamantine Runic Monolith",
        role: "Permanent Capital Defense & Siege Immunity",
        desc: "An impenetrable city-scale dome powered by interlocking subterranean runic keystones.",
        nodes: {
            alpha: { element: "falga", delivery: "lalhwa", bodyParts: ["whole_body"], modifiers: ["pakut", "tigam"] },
            beta:  { element: "falga", delivery: "iwati",  bodyParts: ["whole_body"], modifiers: ["bati", "ewansi"] },
            gamma: { element: "amin",  delivery: "iwati",  bodyParts: ["whole_body"], modifiers: ["praba", "kunta"] }
        }
    },

    // =========================================================================
    // 4. SOMATIC-INITIATED MATRICES (H-X-X)
    // =========================================================================
    {
        id: "bio_rail_cannon",
        title: "Astral Bio-Ballistic Rail-Cannon",
        academicTitle: "Bio-Ballistic Rail-Cannon of the Overcharged Astral Plasma Burst",
        topology: "H-H-U",
        elements: ["sfalhoy", "iklad", "amin"],
        reaction: "Overcharged Astral Plasma Burst",
        role: "Point-Blank Heavy Sniper Discharge",
        desc: "Channels biological and neural reserves through the striking arm, firing a high-velocity piercing beam from the palms.",
        nodes: {
            alpha: { element: "sfalhoy", delivery: "hlakbil", bodyParts: ["arms"],  modifiers: ["shak", "asym"] },
            beta:  { element: "iklad",   delivery: "hlakbil", bodyParts: ["fists"], modifiers: ["liwak", "padu"] },
            gamma: { element: "amin",    delivery: "uruwak",  bodyParts: ["whole_body"], modifiers: ["yinla", "piag", "sapas"] }
        }
    },
    {
        id: "erupting_somatic_shockwave",
        title: "Arc-Plasma Erupting Somatic Shockwave",
        academicTitle: "Erupting Somatic Shockwave of the Ionized Arc-Plasma Crucible",
        topology: "H-H-L",
        elements: ["sfalhoy", "sfalhoy", "iklad"],
        reaction: "Ionized Arc-Plasma Crucible",
        role: "Emergency Crowd Repulsion & Planar Clearing",
        desc: "Overcharges the caster's circulatory core, releasing a devastating omnidirectional plasma shockwave from the skin.",
        nodes: {
            alpha: { element: "sfalhoy", delivery: "hlakbil", bodyParts: ["whole_body"], modifiers: ["shak", "giba"] },
            beta:  { element: "sfalhoy", delivery: "hlakbil", bodyParts: ["torso"], modifiers: ["tat", "rundo"] },
            gamma: { element: "iklad",   delivery: "lalhwa",  bodyParts: ["whole_body"], modifiers: ["bamtuk", "tupwok", "lawal"] }
        }
    },
    {
        id: "self_petrifying_aegis",
        title: "Adamantine Self-Petrifying Immortal Aegis",
        academicTitle: "Self-Petrifying Immortal Aegis of the Adamantine Runic Monolith",
        topology: "H-H-I",
        elements: ["falga", "falga", "amin"],
        reaction: "Adamantine Runic Monolith",
        role: "Permanent Physical Invulnerability",
        desc: "Permanently petrifies dermal and skeletal tissue into diamond-grade living adamantine.",
        nodes: {
            alpha: { element: "falga", delivery: "hlakbil", bodyParts: ["skin"], modifiers: ["shak", "pakut"] },
            beta:  { element: "falga", delivery: "hlakbil", bodyParts: ["spine"], modifiers: ["bati", "ewansi"] },
            gamma: { element: "amin",  delivery: "iwati",   bodyParts: ["whole_body"], modifiers: ["kunta", "praba"] }
        }
    },
    {
        id: "kinetic_strike_overdrive",
        title: "Dielectric Kinetic Strike Overdrive",
        academicTitle: "Kinetic Strike Overdrive of the Hypersonic Dielectric Lance",
        topology: "H-U-H",
        elements: ["jalfinn", "iklad", "amin"],
        reaction: "Hypersonic Dielectric Lance",
        role: "Infinite Martial Combos & Machine-Gun Striking",
        desc: "Somatic punches launch air-compressed shockwave bullets that rebound back to instantly reset muscular elasticity.",
        nodes: {
            alpha: { element: "jalfinn", delivery: "hlakbil", bodyParts: ["fists"], modifiers: ["shak", "asym"] },
            beta:  { element: "iklad",   delivery: "uruwak",  bodyParts: ["whole_body"], modifiers: ["tat", "rundo"] },
            gamma: { element: "amin",    delivery: "hlakbil", bodyParts: ["arms"], modifiers: ["yangga", "sapas"] }
        }
    },
    {
        id: "somatic_machine_gun",
        title: "Dielectric Somatic Machine-Gun Salvo",
        academicTitle: "Somatic Machine-Gun Salvo of the Dielectric Mana Overload",
        topology: "H-U-U",
        elements: ["iklad", "amin", "amin"],
        reaction: "Dielectric Mana Overload",
        role: "Rapid-Fire Suppressive Needles from Fists",
        desc: "Overclocks vocal or ocular pathways to discharge a continuous stream of needle-thin ballistic mana darts.",
        nodes: {
            alpha: { element: "iklad", delivery: "hlakbil", bodyParts: ["fists"], modifiers: ["shak", "suruti"] },
            beta:  { element: "amin",  delivery: "uruwak",  bodyParts: ["whole_body"], modifiers: ["tat", "padu", "liwak"] },
            gamma: { element: "amin",  delivery: "uruwak",  bodyParts: ["whole_body"], modifiers: ["yangga", "sapas"] }
        }
    },
    {
        id: "lunging_shockwave_cleave",
        title: "Pyroclastic Lunging Shockwave Cleave",
        academicTitle: "Lunging Shockwave Cleave of the Pyroclastic Ash Tempest",
        topology: "H-U-L",
        elements: ["falga", "jalfinn", "sfalhoy"],
        reaction: "Pyroclastic Ash Tempest",
        role: "Vanguard Line-Breaking & Shield Decapitation",
        desc: "A martial thrust launches a compressed air projectile, detonating into a wide cleaving arc of burning ash on contact.",
        nodes: {
            alpha: { element: "falga",   delivery: "hlakbil", bodyParts: ["fists"], modifiers: ["shak", "asym"] },
            beta:  { element: "jalfinn", delivery: "uruwak",  bodyParts: ["whole_body"], modifiers: ["liwak", "rundo"] },
            gamma: { element: "sfalhoy", delivery: "lalhwa",  bodyParts: ["whole_body"], modifiers: ["taddum", "lawal"] }
        }
    },
    {
        id: "weapon_branding_strike",
        title: "Entropic Weapon-Branding Martial Strike",
        academicTitle: "Weapon-Branding Martial Strike of the Entropic Spell-Flayer Arc",
        topology: "H-U-I",
        elements: ["iklad", "worulim", "amin"],
        reaction: "Entropic Spell-Flayer Arc",
        role: "Enemy Disarmament & Ward Neutralization",
        desc: "Physical punches imprint disruptive anti-magic runes directly onto enemy armor plates.",
        nodes: {
            alpha: { element: "iklad",   delivery: "hlakbil", bodyParts: ["fists"], modifiers: ["giba", "asym"] },
            beta:  { element: "worulim", delivery: "uruwak",  bodyParts: ["whole_body"], modifiers: ["surut", "ami"] },
            gamma: { element: "amin",    delivery: "iwati",   bodyParts: ["whole_body"], modifiers: ["iwa", "kunta"] }
        }
    },
    {
        id: "circulatory_maelstrom_cloak",
        title: "Fire Vortex Circulatory Maelstrom Cloak",
        academicTitle: "Circulatory Maelstrom Cloak of the Hyper-Oxygen Fire Vortex",
        topology: "H-L-H",
        elements: ["jalfinn", "sfalhoy", "jalfinn"],
        reaction: "Hyper-Oxygen Fire Vortex",
        role: "Deflective Martial Aura & Melee Superiority",
        desc: "Circulates an elemental cyclone through the aura, deflecting incoming attacks and empowering martial counters.",
        nodes: {
            alpha: { element: "jalfinn", delivery: "hlakbil", bodyParts: ["torso"], modifiers: ["shak", "morpa"] },
            beta:  { element: "sfalhoy", delivery: "lalhwa",  bodyParts: ["whole_body"], modifiers: ["liwak", "tul"] },
            gamma: { element: "jalfinn", delivery: "hlakbil", bodyParts: ["arms"], modifiers: ["taddum", "ngisngi"] }
        }
    },
    {
        id: "breath_artillery_battery",
        title: "Scald-Typhoon Storm-Calling Breath",
        academicTitle: "Storm-Calling Breath Battery of the Thermobaric Scald-Typhoon",
        topology: "H-L-U",
        elements: ["hanhum", "jalfinn", "sfalhoy"],
        reaction: "Thermobaric Scald-Typhoon",
        role: "Mobile Artillery Breath Attacks",
        desc: "Inhales ambient field mana into the lungs, exhaling it as high-arching superheated scald mortars.",
        nodes: {
            alpha: { element: "hanhum",  delivery: "hlakbil", bodyParts: ["throat"], modifiers: ["shak", "spat"] },
            beta:  { element: "jalfinn", delivery: "lalhwa",  bodyParts: ["whole_body"], modifiers: ["yudgo", "kijlo"] },
            gamma: { element: "sfalhoy", delivery: "uruwak",  bodyParts: ["whole_body"], modifiers: ["bamtuk", "sapas"] }
        }
    },
    {
        id: "cataclysmic_dragon_avatar",
        title: "Thermonuclear Cataclysmic Dragon Avatar",
        academicTitle: "Cataclysmic Dragon Avatar of the Thermonuclear Stellar Core",
        topology: "H-L-L",
        elements: ["sfalhoy", "sfalhoy", "sfalhoy"],
        reaction: "Thermonuclear Stellar Core",
        role: "Sustained Frontline Conflagration",
        desc: "Converts the caster's thoracic core into a continuous elemental furnace, flooding the vanguard with blue plasma.",
        nodes: {
            alpha: { element: "sfalhoy", delivery: "hlakbil", bodyParts: ["torso"], modifiers: ["shak", "spat"] },
            beta:  { element: "sfalhoy", delivery: "lalhwa",  bodyParts: ["whole_body"], modifiers: ["liwak", "tul"] },
            gamma: { element: "sfalhoy", delivery: "lalhwa",  bodyParts: ["whole_body"], modifiers: ["bamtuk", "lawal", "piag"] }
        }
    },
    {
        id: "blood_monument_nexus",
        title: "Hadal Blood-Bound Monument Nexus",
        academicTitle: "Blood-Bound Monument Nexus of the Hadal Abyss Trench-Collapse",
        topology: "H-L-I",
        elements: ["hanhum", "falga", "worulim"],
        reaction: "Hadal Abyss Trench-Collapse",
        role: "Instant Field Base Creation at Vitality Cost",
        desc: "Sacrifices a portion of vitality to immediately manifest an immovable, permanent crushing ward monument.",
        nodes: {
            alpha: { element: "hanhum",  delivery: "hlakbil", bodyParts: ["whole_body"], modifiers: ["shak", "giba"] },
            beta:  { element: "falga",   delivery: "lalhwa",  bodyParts: ["whole_body"], modifiers: ["yudgo", "tul"] },
            gamma: { element: "worulim", delivery: "iwati",   bodyParts: ["whole_body"], modifiers: ["pittip", "kunta"] }
        }
    },
    {
        id: "relic_symbiote_exoskeleton",
        title: "Adamantine Relic-Symbiote Exoskeleton",
        academicTitle: "Relic-Symbiote Exoskeleton of the Aetheric Adamantine Bastion",
        topology: "H-I-H",
        elements: ["falga", "amin", "amin"],
        reaction: "Aetheric Adamantine Bastion",
        role: "Living Armor Synergy & Extended Combat",
        desc: "Bonds an inscribed armament biologically to the caster's skeletal frame, granting passive armor and regeneration.",
        nodes: {
            alpha: { element: "falga", delivery: "hlakbil", bodyParts: ["spine"], modifiers: ["shak", "pakut"] },
            beta:  { element: "amin",  delivery: "iwati",   bodyParts: ["whole_body"], modifiers: ["bati", "ewansi"] },
            gamma: { element: "amin",  delivery: "hlakbil", bodyParts: ["whole_body"], modifiers: ["kunta", "praba"] }
        }
    },
    {
        id: "armament_discharge_array",
        title: "Photonic Armament Discharge Array",
        academicTitle: "Armament Discharge Array of the Thermonuclear Photonic Arc",
        topology: "H-I-U",
        elements: ["erlaaw", "iklad", "sfalhoy"],
        reaction: "Thermonuclear Photonic Arc",
        role: "Sword-Beam Projection & Mid-Range Artillery",
        desc: "A held weapon acts as an arcane focusing prism, launching high-precision ballistic plasma lances on swing.",
        nodes: {
            alpha: { element: "erlaaw",  delivery: "hlakbil", bodyParts: ["weapon_grip"], modifiers: ["asym", "spat"] },
            beta:  { element: "iklad",   delivery: "iwati",   bodyParts: ["whole_body"], modifiers: ["liwak", "tat"] },
            gamma: { element: "sfalhoy", delivery: "uruwak",  bodyParts: ["whole_body"], modifiers: ["yinla", "dukto", "piag"] }
        }
    },
    {
        id: "relic_amplified_martial_domain",
        title: "Volcanic Relic-Amplified Martial Domain",
        academicTitle: "Relic-Amplified Martial Domain of the Subterranean Volcanic Core",
        topology: "H-I-L",
        elements: ["falga", "sfalhoy", "falga"],
        reaction: "Subterranean Volcanic Core",
        role: "Ground-Shattering Cleaves & Crowd Control",
        desc: "Striking a held weapon against the ground triggers a massive territory-wide molten seismic shockwave.",
        nodes: {
            alpha: { element: "falga",   delivery: "hlakbil", bodyParts: ["fists"], modifiers: ["shak", "asym"] },
            beta:  { element: "sfalhoy", delivery: "iwati",   bodyParts: ["whole_body"], modifiers: ["tat", "rundo"] },
            gamma: { element: "falga",   delivery: "lalhwa",  bodyParts: ["whole_body"], modifiers: ["bamtuk", "tupwok"] }
        }
    },
    {
        id: "living_relic_crucible",
        title: "Primordial Living Relic Crucible",
        academicTitle: "Living Relic Crucible of the Adamantine Primordial Forge",
        topology: "H-I-I",
        elements: ["sfalhoy", "falga", "amin"],
        reaction: "Adamantine Primordial Forge",
        role: "Permanent Magical Nexus Grounding",
        desc: "The caster anchors their life force between dual ritual pillars, permanently powering an indestructible arcane forge.",
        nodes: {
            alpha: { element: "sfalhoy", delivery: "hlakbil", bodyParts: ["whole_body"], modifiers: ["shak", "itta"] },
            beta:  { element: "falga",   delivery: "iwati",   bodyParts: ["whole_body"], modifiers: ["bati", "tul"] },
            gamma: { element: "amin",    delivery: "iwati",   bodyParts: ["whole_body"], modifiers: ["kunta", "praba"] }
        }
    },

    // =========================================================================
    // 5. INSCRIPTION/RELIC-INITIATED MATRICES (I-X-X)
    // =========================================================================
    {
        id: "ballistic_spire",
        title: "Radiant Automated Ballistic Spire",
        academicTitle: "Automated Ballistic Spire of the Coherent Radiant Arc-Laser",
        topology: "I-I-U",
        elements: ["erlaaw", "iklad", "erlaaw"],
        reaction: "Coherent Radiant Arc-Laser",
        role: "Automated Air-Defense & Interception",
        desc: "An immovable runic obelisk tracks and shoots down incoming aerial threats with precision coherent lasers.",
        nodes: {
            alpha: { element: "erlaaw", delivery: "iwati",  bodyParts: ["whole_body"], modifiers: ["pakut", "suruti"] },
            beta:  { element: "iklad",  delivery: "iwati",  bodyParts: ["whole_body"], modifiers: ["bati", "liwak"] },
            gamma: { element: "erlaaw", delivery: "uruwak", bodyParts: ["whole_body"], modifiers: ["yinla", "sapas"] }
        }
    },
    {
        id: "cataclysm_forge",
        title: "Basaltic Perpetual Cataclysm Forge",
        academicTitle: "Perpetual Cataclysm Forge of the Basaltic Caldera Magma",
        topology: "I-I-L",
        elements: ["sfalhoy", "sfalhoy", "falga"],
        reaction: "Basaltic Caldera Magma",
        role: "Territorial Denial & Automated Warping",
        desc: "A master rune engine constantly floods surrounding terrain with molten lava and burning basalt.",
        nodes: {
            alpha: { element: "sfalhoy", delivery: "iwati",  bodyParts: ["whole_body"], modifiers: ["pakut", "itta"] },
            beta:  { element: "sfalhoy", delivery: "iwati",  bodyParts: ["whole_body"], modifiers: ["bati", "tul"] },
            gamma: { element: "falga",   delivery: "lalhwa", bodyParts: ["whole_body"], modifiers: ["bamtuk", "lawal"] }
        }
    },
    {
        id: "sarcophagus_ascendancy",
        title: "Astral Sarcophagus of Ascendancy",
        academicTitle: "Sarcophagus of Ascendancy of the Sacred Astral Cascade",
        topology: "I-I-H",
        elements: ["hanhum", "erlaaw", "amin"],
        reaction: "Sacred Astral Cascade",
        role: "Genetic & Somatic Healing and Transmutation",
        desc: "A sealed, inscribed chamber reconstructs, cleanses, and enhances a host body resting inside.",
        nodes: {
            alpha: { element: "hanhum", delivery: "iwati",   bodyParts: ["whole_body"], modifiers: ["pakut", "giba"] },
            beta:  { element: "erlaaw", delivery: "iwati",   bodyParts: ["whole_body"], modifiers: ["bati", "tul"] },
            gamma: { element: "amin",   delivery: "hlakbil", bodyParts: ["whole_body"], modifiers: ["gilbo", "asanu"] }
        }
    },
    {
        id: "relay_network_cage",
        title: "Aqua-Prism Relic-Reflecting Relay",
        academicTitle: "Relic-Reflecting Relay Network of the Crystalline Aqua-Prism Bastion",
        topology: "I-U-I",
        elements: ["erlaaw", "hanhum", "falga"],
        reaction: "Crystalline Aqua-Prism Bastion",
        role: "Perimeter Laser Cages & Total Containment",
        desc: "Boundary stones reflect looping coherent beams between each other, creating an impenetrable light cage.",
        nodes: {
            alpha: { element: "erlaaw", delivery: "iwati",  bodyParts: ["whole_body"], modifiers: ["pakut", "aduy"] },
            beta:  { element: "hanhum", delivery: "uruwak", bodyParts: ["whole_body"], modifiers: ["ewansi", "padu"] },
            gamma: { element: "falga",  delivery: "iwati",  bodyParts: ["whole_body"], modifiers: ["praba", "ngisngi"] }
        }
    },
    {
        id: "automated_turret",
        title: "Dielectric Automated Defense Turret",
        academicTitle: "Automated Defense Turret of the Hypersonic Dielectric Lance",
        topology: "I-U-U",
        elements: ["iklad", "jalfinn", "amin"],
        reaction: "Hypersonic Dielectric Lance",
        role: "Perimeter Security & Automated Sentry Fire",
        desc: "A runic pillar fires seeking high-voltage elemental darts at any unauthorized intruder.",
        nodes: {
            alpha: { element: "iklad",   delivery: "iwati",  bodyParts: ["whole_body"], modifiers: ["pakut", "suruti"] },
            beta:  { element: "jalfinn", delivery: "uruwak", bodyParts: ["whole_body"], modifiers: ["liwak", "tat"] },
            gamma: { element: "amin",    delivery: "uruwak", bodyParts: ["whole_body"], modifiers: ["yangga", "sapas"] }
        }
    },
    {
        id: "seismic_mine_inscription",
        title: "Hydrothermal Seismic Mine Inscription",
        academicTitle: "Seismic Mine Inscription of the Volcanic Hydrothermal Crucible",
        topology: "I-U-L",
        elements: ["sfalhoy", "hanhum", "falga"],
        reaction: "Volcanic Hydrothermal Crucible",
        role: "Area Denial & Scald Ambush Traps",
        desc: "An inscribed ground trap launches shrapnel darts, detonating into a wide boiling scald blast when stepped on.",
        nodes: {
            alpha: { element: "sfalhoy", delivery: "iwati",  bodyParts: ["whole_body"], modifiers: ["pakut", "genu"] },
            beta:  { element: "hanhum",  delivery: "uruwak", bodyParts: ["whole_body"], modifiers: ["talkib", "kitas"] },
            gamma: { element: "falga",   delivery: "lalhwa", bodyParts: ["whole_body"], modifiers: ["tupwok", "tublag"] }
        }
    },
    {
        id: "bio_overdrive_waypoint",
        title: "Astral Relic-Triggered Bio-Overdrive",
        academicTitle: "Relic-Triggered Bio-Overdrive of the Sacred Astral Cascade",
        topology: "I-U-H",
        elements: ["hanhum", "erlaaw", "amin"],
        reaction: "Sacred Astral Cascade",
        role: "Allied Support & Combat Waypoints",
        desc: "A stationary talisman detects the presence of an ally, injecting combat stimulants and regenerative shielding.",
        nodes: {
            alpha: { element: "hanhum", delivery: "iwati",   bodyParts: ["whole_body"], modifiers: ["giba", "pakut"] },
            beta:  { element: "erlaaw", delivery: "uruwak",  bodyParts: ["whole_body"], modifiers: ["tat", "padu"] },
            gamma: { element: "amin",   delivery: "hlakbil", bodyParts: ["whole_body"], modifiers: ["gilbo", "asanu"] }
        }
    },
    {
        id: "self_reinforcing_ley_pylon",
        title: "Adamantine Self-Reinforcing Ley-Pylon",
        academicTitle: "Self-Reinforcing Ley-Pylon of the Adamantine Runic Monolith",
        topology: "I-L-I",
        elements: ["falga", "falga", "amin"],
        reaction: "Adamantine Runic Monolith",
        role: "Self-Healing Fortification Network",
        desc: "Inscribed monoliths draw ambient environmental mana to repair structural fractures in defensive wards.",
        nodes: {
            alpha: { element: "falga", delivery: "iwati",  bodyParts: ["whole_body"], modifiers: ["pakut", "tigam"] },
            beta:  { element: "falga", delivery: "lalhwa", bodyParts: ["whole_body"], modifiers: ["bati", "ewansi"] },
            gamma: { element: "amin",  delivery: "iwati",  bodyParts: ["whole_body"], modifiers: ["kunta", "praba"] }
        }
    },
    {
        id: "ancient_siege_crucible",
        title: "Sunfire Ancient Siege Crucible",
        academicTitle: "Ancient Siege Crucible of the Celestial Sunfire Purifier",
        topology: "I-L-U",
        elements: ["sfalhoy", "erlaaw", "amin"],
        reaction: "Celestial Sunfire Purifier",
        role: "Long-Range Planetary Orbital Strikes",
        desc: "A ritual altar gathers ambient mana across miles, firing an orbital lance that rains down on distant targets.",
        nodes: {
            alpha: { element: "sfalhoy", delivery: "iwati",  bodyParts: ["whole_body"], modifiers: ["pakut", "aduy"] },
            beta:  { element: "erlaaw",  delivery: "lalhwa", bodyParts: ["whole_body"], modifiers: ["tul", "liwak"] },
            gamma: { element: "amin",    delivery: "uruwak", bodyParts: ["whole_body"], modifiers: ["yinla", "piag", "sapas"] }
        }
    },
    {
        id: "eternal_elemental_geyser",
        title: "Hydro-Resonant Eternal Mana Geyser",
        academicTitle: "Eternal Elemental Geyser of the Astral Hydro-Resonance",
        topology: "I-L-L",
        elements: ["hanhum", "amin", "amin"],
        reaction: "Astral Hydro-Resonance",
        role: "Industrial Arcane Power Generation",
        desc: "A permanent floor seal releases an uninterrupted fountain of purified elemental mana to power arcane constructs.",
        nodes: {
            alpha: { element: "hanhum", delivery: "iwati",  bodyParts: ["whole_body"], modifiers: ["pakut", "itta"] },
            beta:  { element: "amin",   delivery: "lalhwa", bodyParts: ["whole_body"], modifiers: ["tul", "bati"] },
            gamma: { element: "amin",   delivery: "lalhwa", bodyParts: ["whole_body"], modifiers: ["lawal", "gilbo"] }
        }
    },
    {
        id: "fountain_of_rejuvenation",
        title: "Consecrated Fountain of Rejuvenation",
        academicTitle: "Fountain of Rejuvenation of the Sacred Astral Cascade",
        topology: "I-L-H",
        elements: ["hanhum", "erlaaw", "amin"],
        reaction: "Sacred Astral Cascade",
        role: "Mass Battlefield Healing & Curse Cleansing",
        desc: "A consecrated pool whose infusions wash over wounded warriors, healing deep tissue and cleansing dark curses.",
        nodes: {
            alpha: { element: "hanhum", delivery: "iwati",   bodyParts: ["whole_body"], modifiers: ["pakut", "giba"] },
            beta:  { element: "erlaaw", delivery: "lalhwa",  bodyParts: ["whole_body"], modifiers: ["tul", "ewansi"] },
            gamma: { element: "amin",   delivery: "hlakbil", bodyParts: ["whole_body"], modifiers: ["gilbo", "asanu"] }
        }
    },
    {
        id: "soul_bound_guardian_golem",
        title: "Adamantine Soul-Bound Guardian Golem",
        academicTitle: "Soul-Bound Guardian Golem of the Aetheric Adamantine Bastion",
        topology: "I-H-I",
        elements: ["falga", "amin", "amin"],
        reaction: "Aetheric Adamantine Bastion",
        role: "Autonomous Heavy Defense Combatant",
        desc: "An ancient suit of inscribed plate armor animated by the biological imprint of an ancient warrior.",
        nodes: {
            alpha: { element: "falga", delivery: "iwati",   bodyParts: ["whole_body"], modifiers: ["pakut", "tigam"] },
            beta:  { element: "amin",  delivery: "hlakbil", bodyParts: ["whole_body"], modifiers: ["bati", "ewansi"] },
            gamma: { element: "amin",  delivery: "iwati",   bodyParts: ["whole_body"], modifiers: ["kunta", "praba"] }
        }
    },
    {
        id: "relic_guided_living_javelin",
        title: "Void-Erasing Living Relic Javelin",
        academicTitle: "Relic-Guided Living Javelin of the Absolute Anti-Magic Devourer",
        topology: "I-H-U",
        elements: ["worulim", "worulim", "amin"],
        reaction: "Absolute Anti-Magic Devourer",
        role: "Unmissable Kinetic Javelin Throws",
        desc: "An enchanted spear bonded with the thrower's arm corrects flight trajectories to erase enemy spell wards.",
        nodes: {
            alpha: { element: "worulim", delivery: "iwati",   bodyParts: ["whole_body"], modifiers: ["ami", "itta"] },
            beta:  { element: "worulim", delivery: "hlakbil", bodyParts: ["arms"], modifiers: ["surut", "tiha"] },
            gamma: { element: "amin",    delivery: "uruwak",  bodyParts: ["whole_body"], modifiers: ["dukto", "iwa", "sapas"] }
        }
    },
    {
        id: "altar_blood_vanguard",
        title: "Black-Arc Altar of the Blood Vanguard",
        academicTitle: "Altar of the Blood Vanguard of the Sanguine Black-Arc Hellfire",
        topology: "I-H-L",
        elements: ["sfalhoy", "iklad", "worulim"],
        reaction: "Sanguine Black-Arc Hellfire",
        role: "Mass Army Empowerment & Blood Tithe Buffs",
        desc: "An inscribed altar consumes blood tithes to grant an entire army dark elemental berserker auras.",
        nodes: {
            alpha: { element: "sfalhoy", delivery: "iwati",   bodyParts: ["whole_body"], modifiers: ["pakut", "giba"] },
            beta:  { element: "iklad",   delivery: "hlakbil", bodyParts: ["whole_body"], modifiers: ["silpu", "tan"] },
            gamma: { element: "worulim", delivery: "lalhwa",  bodyParts: ["whole_body"], modifiers: ["iwa", "lawal"] }
        }
    },
    {
        id: "vessel_transmuting_forge",
        title: "Adamantine Vessel-Transmuting Forge",
        academicTitle: "Vessel-Transmuting Forge of the Aetheric Adamantine Bastion",
        topology: "I-H-H",
        elements: ["falga", "amin", "amin"],
        reaction: "Aetheric Adamantine Bastion",
        role: "Permanent Biological Enhancement",
        desc: "An enchanted anvil permanently forges raw elemental energy into the bone and sinew of an initiate.",
        nodes: {
            alpha: { element: "falga", delivery: "iwati",   bodyParts: ["whole_body"], modifiers: ["pakut", "tigam"] },
            beta:  { element: "amin",  delivery: "hlakbil", bodyParts: ["torso"], modifiers: ["bati", "ewansi"] },
            gamma: { element: "amin",  delivery: "hlakbil", bodyParts: ["whole_body"], modifiers: ["kunta", "praba"] }
        }
    }
];

// -------------------------------------------------------------
// 2. MODAL & PRESET LOADING LOGIC
// -------------------------------------------------------------

function openArrayPresetsModal() {
    let modal = document.getElementById("arrayPresetsModal");
    if (!modal) {
        createArrayPresetsModal();
        modal = document.getElementById("arrayPresetsModal");
    }
    renderArrayPresetCards();
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

function loadPrebuiltArray(presetId) {
    const preset = PREBUILT_ARRAYS.find(p => p.id === presetId);
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
// 3. DYNAMIC MODAL DOM BUILDER & SEARCH FILTER
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

    modal.innerHTML = `
        <div style="
            position: relative;
            width: 100%;
            max-width: 920px;
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
                    <span style="font-family: 'Segoe UI', sans-serif; font-size: 1.05rem; font-weight: 800; color: #f8fafc; letter-spacing: 0.8px;">
                        PRE-BUILT MAGIC ARRAY ARCHIVE (${PREBUILT_ARRAYS.length} ENTRIES)
                    </span>
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

            <!-- Search & Filter Bar -->
            <div style="padding: 12px 20px; background: #080a0e; border-bottom: 1px solid #1e293b; display: flex; gap: 10px;">
                <input type="text" id="presetSearchInput" placeholder="Search by name, generated title, element, reaction, or topology (e.g. U-U-U, Void, Railgun)..." style="
                    flex: 1;
                    background: #0d111a;
                    border: 1px solid #334155;
                    border-radius: 6px;
                    padding: 8px 14px;
                    color: #f8fafc;
                    font-family: 'Segoe UI', sans-serif;
                    font-size: 0.85rem;
                    outline: none;
                " oninput="renderArrayPresetCards()">
            </div>

            <!-- Presets Scrollable Grid -->
            <div id="presetsGridContainer" style="
                flex: 1;
                overflow-y: auto;
                padding: 16px 20px;
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
                gap: 14px;
                box-sizing: border-box;
            ">
                <!-- Preset Cards Rendered Here -->
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    modal.addEventListener("click", (e) => {
        if (e.target === modal) closeArrayPresetsModal();
    });
}

function renderArrayPresetCards() {
    const container = document.getElementById("presetsGridContainer");
    const searchInput = document.getElementById("presetSearchInput");
    if (!container) return;

    const query = searchInput ? searchInput.value.toLowerCase().trim() : "";

    const filtered = PREBUILT_ARRAYS.filter(preset => {
        if (!query) return true;
        const text = `${preset.title} ${preset.academicTitle} ${preset.topology} ${preset.reaction} ${preset.role} ${preset.desc} ${preset.elements.join(" ")}`.toLowerCase();
        return text.includes(query);
    });

    if (filtered.length === 0) {
        container.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 40px 20px; color: #64748b;">
                <p style="font-size: 1.1rem; margin-bottom: 6px;">No magic arrays found matching "${query}"</p>
                <p style="font-size: 0.8rem;">Try searching for elements (Fire, Water), deployment codes (U-U-U, L-L-L), or roles.</p>
            </div>
        `;
        return;
    }

    container.innerHTML = filtered.map(p => {
        const themeColors = {
            sfalhoy: "#f97316",
            hanhum:  "#38bdf8",
            falga:   "#f59e0b",
            jalfinn: "#34d399",
            iklad:   "#facc15",
            erlaaw:  "#fef08a",
            worulim: "#c084fc",
            amin:    "#e879f9"
        };

        const elementPills = p.elements.map(elId => {
            const color = themeColors[elId] || "#94a3b8";
            return `<span style="font-size: 0.68rem; font-weight: 700; padding: 2px 6px; border-radius: 4px; background: rgba(255,255,255,0.06); border: 1px solid ${color}; color: ${color}; text-transform: capitalize;">${elId}</span>`;
        }).join(" ");

        return `
            <div onclick="loadPrebuiltArray('${p.id}')" style="
                background: #0e131f;
                border: 1px solid #1e293b;
                border-radius: 8px;
                padding: 14px;
                cursor: pointer;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                gap: 8px;
                transition: all 0.2s ease;
            " onmouseover="this.style.borderColor='#38bdf8'; this.style.transform='translateY(-2px)'; this.style.boxShadow='0 8px 20px rgba(0,0,0,0.6)';"
               onmouseout="this.style.borderColor='#1e293b'; this.style.transform='none'; this.style.boxShadow='none';">
                <div>
                    <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                        <span style="font-family: 'Segoe UI', sans-serif; font-size: 0.94rem; font-weight: 800; color: #f8fafc;">${p.title}</span>
                        <span style="font-family: monospace; font-size: 0.72rem; font-weight: 800; padding: 2px 6px; border-radius: 4px; background: #1e293b; color: #38bdf8; border: 1px solid #334155;">${p.topology}</span>
                    </div>

                    <!-- Little Grey Technical Generated Subtitle -->
                    <div style="font-family: 'Segoe UI', sans-serif; font-size: 0.73rem; color: #94a3b8; font-style: italic; margin-top: 2px; margin-bottom: 8px;">
                        ${p.academicTitle}
                    </div>

                    <div style="display: flex; gap: 6px; margin-bottom: 8px; flex-wrap: wrap;">
                        ${elementPills}
                        <span style="font-size: 0.68rem; color: #cbd5e1; padding: 2px 6px; background: #07090e; border-radius: 4px; border: 1px solid #252b3b;">${p.reaction}</span>
                    </div>

                    <p style="font-size: 0.78rem; color: #cbd5e1; line-height: 1.35; margin: 0 0 6px 0;">${p.desc}</p>
                </div>

                <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid rgba(255,255,255,0.06); padding-top: 8px;">
                    <span style="font-size: 0.70rem; color: #64748b; font-style: italic;">${p.role}</span>
                    <span style="font-size: 0.75rem; font-weight: 700; color: #38bdf8;">Load Array &rarr;</span>
                </div>
            </div>
        `;
    }).join("");
}

// -------------------------------------------------------------
// 4. FLOATING BOOK SYMBOL BUTTON INJECTOR (PURE ICON, NO TEXT)
// -------------------------------------------------------------

function mountArrayBookButton() {
    if (document.getElementById("arrayPresetBookBtn")) return;

    const bookBtn = document.createElement("button");
    bookBtn.id = "arrayPresetBookBtn";
    bookBtn.setAttribute("title", "Open Pre-Built Array Archive");
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
// 5. INITIALIZATION HOOKS
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
window.mountArrayBookButton = mountArrayBookButton;