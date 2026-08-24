/* ==========================================================================
   ROUGH.JS HAND-DRAWN ALCHEMY & INKING ENGINE
   Renders organic quill strokes, manga inking, and chiseled stone for skins
   ========================================================================== */

const ROUGH_SKIN_CONFIGS = {
    parchment: {
        roughness: 1.5,
        bowing: 1.3,
        strokeWidth: 1.8,
        fillStyle: "cross-hatch",
        hachureAngle: 60,
        hachureGap: 12, // Wide sparse gap for light desaturated shading
        curveRoughness: 1.4,
        getStroke: (theme1) => theme1.primary || "#543718",
        getFill: () => "rgba(140, 88, 37, 0.08)",
        getPolyFill: () => "rgba(140, 88, 37, 0.10)"
    },
manga: {
        roughness: 0.9,
        bowing: 0.6,
        strokeWidth: 2.8,
        fillStyle: "dots",
        hachureAngle: 45,
        hachureGap: 10,
        curveRoughness: 0.8,
        getStroke: () => "#000000",
        getFill: () => "#e4e4e7", // <-- Changed to light screentone grey
        getPolyFill: () => "rgba(113, 113, 122, 0.14)"
    },
    stone: {
        roughness: 2.2,
        bowing: 1.8,
        strokeWidth: 2.0,
        fillStyle: "zigzag",
        hachureAngle: 30,
        hachureGap: 14,
        curveRoughness: 1.8,
        getStroke: () => "#3f3f46",
        getFill: () => "rgba(82, 82, 91, 0.10)",
        getPolyFill: () => "rgba(82, 82, 91, 0.12)" // Desaturated slate grey
    }
};

function isRoughSkinActive() {
    const currentSkin = typeof themeState !== "undefined" ? themeState.currentSkin : "default";
    return Boolean(ROUGH_SKIN_CONFIGS[currentSkin]);
}

async function ensureRoughJSLoaded() {
    if (typeof rough !== "undefined") return true;

    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = "https://cdnjs.cloudflare.com/ajax/libs/rough.js/3.1.0/rough.js";
        script.onload = () => resolve(true);
        script.onerror = () => {
            console.warn("Could not load Rough.js from CDN");
            resolve(false);
        };
        document.head.appendChild(script);
    });
}

// Main function to convert SVG elements into hand-drawn rough counterparts
async function applyRoughEngineToSpellCircle() {
    if (!isRoughSkinActive()) return;

    const svgElement = document.getElementById("arcaneSpellCircleSVG");
    if (!svgElement) return;

    const loaded = await ensureRoughJSLoaded();
    if (!loaded || typeof rough === "undefined") return;

    const currentSkin = themeState.currentSkin;
    const skinConfig = ROUGH_SKIN_CONFIGS[currentSkin];
    if (!skinConfig) return;

    const elId1 = (typeof state !== "undefined" && state.element) ? state.element : 'sfalhoy';
    const theme1 = (typeof ELEMENT_COLORS !== "undefined" && ELEMENT_COLORS[elId1]) ? ELEMENT_COLORS[elId1] : { primary: "#d4af37", bg: "#151822" };

    const rc = rough.svg(svgElement);

    const baseOptions = {
        roughness: skinConfig.roughness,
        bowing: skinConfig.bowing,
        stroke: skinConfig.getStroke(theme1),
        strokeWidth: skinConfig.strokeWidth,
        curveRoughness: skinConfig.curveRoughness
    };

    // 1. Process Sacred Geometry Lattice Lines
    const latticeLines = svgElement.querySelectorAll(".inscribe-lattice line");
    latticeLines.forEach(line => {
        const x1 = parseFloat(line.getAttribute("x1") || 0);
        const y1 = parseFloat(line.getAttribute("y1") || 0);
        const x2 = parseFloat(line.getAttribute("x2") || 0);
        const y2 = parseFloat(line.getAttribute("y2") || 0);
        
        const roughLine = rc.line(x1, y1, x2, y2, {
            ...baseOptions,
            strokeWidth: skinConfig.strokeWidth * 0.6,
            roughness: skinConfig.roughness * 0.8
        });
        line.parentNode.replaceChild(roughLine, line);
    });

    // 2. Process Sacred Geometry Wave Rings & Polygons
    const latticePolys = svgElement.querySelectorAll(".inscribe-lattice polygon, .inscribe-lattice path");
    latticePolys.forEach(el => {
        if (el.tagName.toLowerCase() === "polygon") {
            const pointsStr = el.getAttribute("points");
            if (pointsStr) {
                const pts = pointsStr.trim().split(/\s+/).map(p => p.split(',').map(Number));
                const roughPoly = rc.polygon(pts, {
                    ...baseOptions,
                    strokeWidth: skinConfig.strokeWidth * 0.7
                });
                el.parentNode.replaceChild(roughPoly, el);
            }
        } else if (el.tagName.toLowerCase() === "path") {
            const d = el.getAttribute("d");
            if (d) {
                const roughPath = rc.path(d, {
                    ...baseOptions,
                    strokeWidth: skinConfig.strokeWidth * 0.7
                });
                el.parentNode.replaceChild(roughPath, el);
            }
        }
    });

    // 3. Process Delivery Rings & Circles
    const deliveryCircles = svgElement.querySelectorAll(".inscribe-delivery-rings circle");
    deliveryCircles.forEach(circle => {
        const cx = parseFloat(circle.getAttribute("cx") || 300);
        const cy = parseFloat(circle.getAttribute("cy") || 300);
        const r = parseFloat(circle.getAttribute("r") || 100);
        
        const roughCircle = rc.circle(cx, cy, r * 2, {
            ...baseOptions,
            strokeWidth: skinConfig.strokeWidth
        });
        circle.parentNode.replaceChild(roughCircle, circle);
    });

    // 4. Process Border Rings
    const borderCircles = svgElement.querySelectorAll(".inscribe-border-rings circle");
    borderCircles.forEach(circle => {
        const cx = parseFloat(circle.getAttribute("cx") || 300);
        const cy = parseFloat(circle.getAttribute("cy") || 300);
        const r = parseFloat(circle.getAttribute("r") || 280);
        
        const roughBorder = rc.circle(cx, cy, r * 2, {
            ...baseOptions,
            strokeWidth: skinConfig.strokeWidth * 1.3
        });
        circle.parentNode.replaceChild(roughBorder, circle);
    });

    // 5. Process Modifier Ring Constellation Polygons (Low Saturation & Grey Shading for Manga)
    const constellationPolys = svgElement.querySelectorAll(".outer-ring-group polygon");
    constellationPolys.forEach(poly => {
        const pointsStr = poly.getAttribute("points");
        if (pointsStr) {
            const pts = pointsStr.trim().split(/\s+/).map(p => p.split(',').map(Number));
            const isFilled = poly.getAttribute("fill") && poly.getAttribute("fill") !== "none";
            
            const roughConstellation = rc.polygon(pts, {
                ...baseOptions,
                stroke: currentSkin === "manga" ? "rgba(113, 113, 122, 0.4)" : (skinConfig.getStroke(theme1)),
                strokeWidth: isFilled ? 0 : 1.0,
                fill: isFilled ? skinConfig.getPolyFill(theme1) : undefined,
                fillStyle: isFilled ? skinConfig.fillStyle : undefined,
                hachureGap: skinConfig.hachureGap * 1.4
            });
            poly.parentNode.replaceChild(roughConstellation, poly);
        }
    });

    // 6. Process Node Mini-Circles
    const nodeCircles = svgElement.querySelectorAll(".inscribe-node-border");
    nodeCircles.forEach(circle => {
        const cx = parseFloat(circle.getAttribute("cx") || 0);
        const cy = parseFloat(circle.getAttribute("cy") || 0);
        const r = parseFloat(circle.getAttribute("r") || 18);
        
        const roughNode = rc.circle(cx, cy, r * 2, {
            ...baseOptions,
            fill: "#090b10",
            fillStyle: "solid",
            strokeWidth: skinConfig.strokeWidth
        });
        circle.parentNode.replaceChild(roughNode, circle);
    });

    // 7. Process Core Rings (Single Element & Overdrive Aligned)
// 7. Process Core Rings (Single Element & Overdrive Aligned)
    const coreCircles = svgElement.querySelectorAll(".center-core-group circle");
    coreCircles.forEach(circle => {
        const cx = parseFloat(circle.getAttribute("cx") || 300);
        const cy = parseFloat(circle.getAttribute("cy") || 300);
        const r = parseFloat(circle.getAttribute("r") || 64);
        
        const isCenterChamber = Math.round(r) === 64;
        const chamberFill = currentSkin === "manga" ? "#e4e4e7" : "#090b10";
        
        const roughCore = rc.circle(cx, cy, r * 2, {
            ...baseOptions,
            fill: isCenterChamber ? chamberFill : undefined,
            fillStyle: isCenterChamber ? "solid" : undefined,
            strokeWidth: isCenterChamber ? skinConfig.strokeWidth * 1.3 : skinConfig.strokeWidth * 0.9
        });
        circle.parentNode.replaceChild(roughCore, circle);
    });

    // 8. Process Core Polygons (Single & Overdrive Double-Triangles)
    const corePolygons = svgElement.querySelectorAll(".center-core-group polygon");
    corePolygons.forEach(poly => {
        const pointsStr = poly.getAttribute("points");
        if (pointsStr) {
            const pts = pointsStr.trim().split(/\s+/).map(p => p.split(',').map(Number));
            const roughPoly = rc.polygon(pts, {
                ...baseOptions,
                strokeWidth: skinConfig.strokeWidth * 0.9
            });
            poly.parentNode.replaceChild(roughPoly, poly);
        }
    });

    // 9. Process Overdrive Glyph Geometry (Lines, Polylines, Rects)
    const overdriveLines = svgElement.querySelectorAll(".center-core-group line, .center-core-group polyline, .center-core-group rect");
    overdriveLines.forEach(el => {
        const tag = el.tagName.toLowerCase();
        if (tag === "line") {
            const x1 = parseFloat(el.getAttribute("x1") || 0);
            const y1 = parseFloat(el.getAttribute("y1") || 0);
            const x2 = parseFloat(el.getAttribute("x2") || 0);
            const y2 = parseFloat(el.getAttribute("y2") || 0);
            const roughL = rc.line(x1, y1, x2, y2, { ...baseOptions, strokeWidth: skinConfig.strokeWidth * 1.1 });
            el.parentNode.replaceChild(roughL, el);
        } else if (tag === "polyline") {
            const ptsStr = el.getAttribute("points");
            if (ptsStr) {
                const pts = ptsStr.trim().split(/\s+/).map(p => p.split(',').map(Number));
                const roughPL = rc.linearPath(pts, { ...baseOptions, strokeWidth: skinConfig.strokeWidth * 1.1 });
                el.parentNode.replaceChild(roughPL, el);
            }
        } else if (tag === "rect") {
            const x = parseFloat(el.getAttribute("x") || 0);
            const y = parseFloat(el.getAttribute("y") || 0);
            const w = parseFloat(el.getAttribute("width") || 0);
            const h = parseFloat(el.getAttribute("height") || 0);
            const roughR = rc.rectangle(x, y, w, h, { ...baseOptions, strokeWidth: skinConfig.strokeWidth });
            el.parentNode.replaceChild(roughR, el);
        }
    });

    // 10. Process Yin-Yang Dual Lobe Paths
    const yinYangPaths = svgElement.querySelectorAll(".yinyang-core-rotation path");
    yinYangPaths.forEach(path => {
        const d = path.getAttribute("d");
        const stroke = path.getAttribute("stroke");
        const fill = path.getAttribute("fill");

        if (d && stroke && stroke !== "none") {
            const roughArc = rc.path(d, {
                ...baseOptions,
                stroke: stroke,
                strokeWidth: skinConfig.strokeWidth * 1.1
            });
            path.parentNode.replaceChild(roughArc, path);
        } else if (d && fill && fill !== "none") {
            const roughLobe = rc.path(d, {
                ...baseOptions,
                stroke: "none",
                fill: fill,
                fillStyle: skinConfig.fillStyle,
                hachureGap: skinConfig.hachureGap
            });
            path.parentNode.replaceChild(roughLobe, path);
        }
    });
}

// Global window attachment
window.applyRoughEngineToSpellCircle = applyRoughEngineToSpellCircle;
window.isRoughSkinActive = isRoughSkinActive;