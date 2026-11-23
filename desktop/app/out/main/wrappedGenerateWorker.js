"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="781337d3-7031-5a91-9751-40738d8270ba")}catch(e){}}();

Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const useCases = require("./useCases-CLjkUKfw.js");
const sqliteStorage = require("./sqliteStorage-BNMiEthf.js");
require("./flowerUnlocks-C4stZB4n.js");
require("better-sqlite3");
require("fs");
require("path");
require("./index-DvaJIvS-.js");
require("./insights-CJUxz2Be.js");
require("./deliveryBriefs-CbTihYeZ.js");
require("./index-UFoqNX7c.js");
require("./hash-DCMQIns_.js");
require("./identity-C50QOXIb.js");
require("./desktopSearch-UUzZxN96.js");
require("./repositoryKey-CSvrvo7G.js");
function xmur3(str2) {
  let h = 1779033703 ^ str2.length;
  for (let i = 0; i < str2.length; i++) {
    h = Math.imul(h ^ str2.charCodeAt(i), 3432918353);
    h = h << 13 | h >>> 19;
  }
  return () => {
    h = Math.imul(h ^ h >>> 16, 2246822507);
    h = Math.imul(h ^ h >>> 13, 3266489909);
    return (h ^= h >>> 16) >>> 0;
  };
}
function mulberry32(a) {
  return () => {
    a |= 0;
    a = a + 1831565813 | 0;
    let t = Math.imul(a ^ a >>> 15, 1 | a);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}
function createRng(seed) {
  const hash = xmur3(seed);
  const gen = mulberry32(hash());
  const rng = {
    seed,
    next: gen,
    range: (min, max) => min + gen() * (max - min),
    int: (min, max) => min + Math.floor(gen() * (max - min + 1)),
    pick: (items) => {
      if (items.length === 0) {
        throw new Error("cannot pick from an empty list");
      }
      return items[Math.min(items.length - 1, Math.floor(gen() * items.length))];
    },
    bool: (probability = 0.5) => gen() < probability,
    shuffle: (items) => {
      const copy = [...items];
      for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(gen() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
      }
      return copy;
    },
    fork: (label) => createRng(`${seed}\0${label}`)
  };
  return rng;
}
const FLOWER_PALETTES = [
  { name: "blush", hue: "pink", petal: "#F8A8BC", petalShade: "#EF7D9B", center: "#F9C74F", centerShade: "#B8860B" },
  { name: "rosewood", hue: "pink", petal: "#E56B8C", petalShade: "#C94A70", center: "#FFE8A3", centerShade: "#D9A441" },
  { name: "poppy-red", hue: "red", petal: "#E4573D", petalShade: "#C23A2B", center: "#3E2A35", centerShade: "#6D4C41" },
  { name: "crimson", hue: "red", petal: "#C0334E", petalShade: "#992940", center: "#F4D06F", centerShade: "#8A5A2B" },
  { name: "tangerine", hue: "orange", petal: "#F58A3C", petalShade: "#DD6B20", center: "#7A3E2E", centerShade: "#4E2A1E" },
  { name: "peach", hue: "orange", petal: "#FFB380", petalShade: "#F28C52", center: "#A65B32", centerShade: "#7A3E2E" },
  { name: "sunbeam", hue: "yellow", petal: "#FFC93C", petalShade: "#F0A500", center: "#5C4033", centerShade: "#8B6242" },
  { name: "butter", hue: "yellow", petal: "#FFE08A", petalShade: "#F4C542", center: "#B5651D", centerShade: "#7A4413" },
  { name: "cream", hue: "neutral", petal: "#FFF6E9", petalShade: "#F0DFC0", center: "#F4A93C", centerShade: "#C77B21" },
  { name: "lilac", hue: "purple", petal: "#B79CED", petalShade: "#9678D3", center: "#F4D06F", centerShade: "#9A6A2F" },
  { name: "violet", hue: "purple", petal: "#8B5FBF", petalShade: "#6F4599", center: "#FFE8A3", centerShade: "#C79A3C" },
  { name: "periwinkle", hue: "blue", petal: "#8FA6E8", petalShade: "#6C84D4", center: "#FFF1C9", centerShade: "#D9B45B" },
  { name: "cornflower", hue: "blue", petal: "#5B7FD4", petalShade: "#4363B8", center: "#F9E4B7", centerShade: "#C9A24B" },
  { name: "orchid", hue: "pink", petal: "#D883C9", petalShade: "#BC5FAD", center: "#FBEFD5", centerShade: "#D3A75C" }
];
const BACKGROUND_PALETTES = [
  { name: "linen", hue: "neutral", fill: "#F5EDDF", accent: "#E0D2B8" },
  { name: "blush", hue: "pink", fill: "#FADDE1", accent: "#F0B9C3" },
  { name: "rose", hue: "pink", fill: "#F5C7DC", accent: "#E79FC4" },
  { name: "peach", hue: "orange", fill: "#FFDFC2", accent: "#F7BE93" },
  { name: "clay", hue: "orange", fill: "#F1CDB0", accent: "#DFAC85" },
  { name: "butter", hue: "yellow", fill: "#FBEEB8", accent: "#EDD786" },
  { name: "pistachio", hue: "green", fill: "#DDE8BE", accent: "#C1D392" },
  { name: "mint", hue: "green", fill: "#C8E8D4", accent: "#9CD1B1" },
  { name: "sea", hue: "blue", fill: "#C4E3E0", accent: "#94C8C3" },
  { name: "sky", hue: "blue", fill: "#CBE4F5", accent: "#9DC8E8" },
  { name: "periwinkle", hue: "blue", fill: "#D8DDF7", accent: "#B3BCEC" },
  { name: "lilac", hue: "purple", fill: "#E7D9F6", accent: "#CBB2E8" },
  { name: "mauve", hue: "purple", fill: "#DFC7DE", accent: "#C4A0C2" },
  { name: "lemon", hue: "yellow", fill: "#F3EFC3", accent: "#DCD489" }
];
FLOWER_PALETTES.map((p) => p.petal);
BACKGROUND_PALETTES.map((b) => b.fill);
let colorModeSampler = null;
function registerColorModeSampler(fn) {
  colorModeSampler = fn;
}
function sampleParams(specs, r) {
  const out = {};
  for (const s of specs) {
    switch (s.kind) {
      case "float":
        out[s.key] = Math.round(r.range(s.min, s.max) * 100) / 100;
        break;
      case "int":
        out[s.key] = r.int(s.min, s.max);
        break;
      case "bool":
        out[s.key] = r.bool(s.probability ?? 0.5);
        break;
      case "enum":
        out[s.key] = r.pick(s.options);
        break;
      case "colorMode":
        out[s.key] = colorModeSampler(r, s.modes);
        break;
    }
  }
  return out;
}
const num = (p, key) => p[key];
const str = (p, key) => p[key];
const flag = (p, key) => p[key];
function hexToHsl(hex) {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  if (max === min) return [0, 0, l];
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h;
  if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
  else if (max === g) h = ((b - r) / d + 2) / 6;
  else h = ((r - g) / d + 4) / 6;
  return [h * 360, s, l];
}
function hslToHex(h, s, l) {
  h = (h % 360 + 360) % 360;
  s = Math.min(1, Math.max(0, s));
  l = Math.min(1, Math.max(0, l));
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(h / 60 % 2 - 1));
  const m = l - c / 2;
  const [r, g, b] = h < 60 ? [c, x, 0] : h < 120 ? [x, c, 0] : h < 180 ? [0, c, x] : h < 240 ? [0, x, c] : h < 300 ? [x, 0, c] : [c, 0, x];
  const to = (v) => Math.round((v + m) * 255).toString(16).padStart(2, "0");
  return `#${to(r)}${to(g)}${to(b)}`.toUpperCase();
}
function mixHex(a, b, t) {
  const ch = (hex, i) => parseInt(hex.slice(i, i + 2), 16);
  const to = (x, y) => Math.round(x + (y - x) * t).toString(16).padStart(2, "0");
  return `#${to(ch(a, 1), ch(b, 1))}${to(ch(a, 3), ch(b, 3))}${to(ch(a, 5), ch(b, 5))}`.toUpperCase();
}
const COLOR_MODIFIERS = {
  hueShift: {
    label: "Hue shift",
    params: [{ key: "degrees", label: "Degrees", kind: "float", min: -180, max: 180, step: 1 }],
    apply: (color, p) => {
      const [h, s, l] = hexToHsl(color);
      return hslToHex(h + num(p, "degrees"), s, l);
    }
  },
  lighten: {
    label: "Lighten",
    params: [{ key: "amount", label: "Amount", kind: "float", min: -0.4, max: 0.4, step: 0.01 }],
    apply: (color, p) => {
      const [h, s, l] = hexToHsl(color);
      return hslToHex(h, s, l + num(p, "amount"));
    }
  },
  saturate: {
    label: "Saturate",
    params: [{ key: "amount", label: "Amount", kind: "float", min: -0.6, max: 0.6, step: 0.01 }],
    apply: (color, p) => {
      const [h, s, l] = hexToHsl(color);
      return hslToHex(h, s + num(p, "amount"), l);
    }
  },
  greener: {
    label: "Greener",
    params: [{ key: "amount", label: "Amount", kind: "float", min: 0, max: 1, step: 0.01 }],
    apply: (color, p) => mixHex(color, "#5B8C5A", num(p, "amount"))
  }
};
function applyModifier(name, color, params) {
  return COLOR_MODIFIERS[name].apply(color, params);
}
const hueShift = (color, degrees) => applyModifier("hueShift", color, { degrees });
const lighten = (color, amount) => applyModifier("lighten", color, { amount });
const COLOR_MODES = {
  tint: {
    label: "Tint",
    description: "Lightness steps of the same hue.",
    params: [
      { key: "amount", label: "Step size", kind: "float", min: 0.06, max: 0.24, step: 0.01 },
      { key: "steps", label: "Steps", kind: "int", min: 1, max: 3 },
      { key: "direction", label: "Direction", kind: "enum", options: ["darker", "lighter", "both"] }
    ],
    derive: (base, p) => {
      const direction = str(p, "direction");
      const amount = num(p, "amount");
      const set = [base];
      for (let i = 1; i <= num(p, "steps"); i++) {
        const sign = direction === "lighter" ? 1 : direction === "darker" ? -1 : i % 2 === 1 ? -1 : 1;
        const magnitude = direction === "both" ? amount * Math.ceil(i / 2) : amount * i;
        set.push(lighten(base, sign * magnitude));
      }
      return set;
    }
  },
  blend: {
    label: "Blend",
    description: "Even steps toward a target color, given as offsets from the base.",
    params: [
      { key: "targetHue", label: "Target hue shift", kind: "float", min: -180, max: 180, step: 1 },
      { key: "targetSaturation", label: "Target saturation shift", kind: "float", min: -0.6, max: 0.6, step: 0.01 },
      { key: "targetLightness", label: "Target lightness shift", kind: "float", min: -0.3, max: 0.3, step: 0.01 },
      { key: "steps", label: "Steps", kind: "int", min: 1, max: 3 }
    ],
    derive: (base, p) => {
      const target = applyModifier(
        "saturate",
        lighten(hueShift(base, num(p, "targetHue")), num(p, "targetLightness")),
        { amount: num(p, "targetSaturation") }
      );
      const steps = num(p, "steps");
      const set = [base];
      for (let i = 1; i <= steps; i++) {
        set.push(mixHex(base, target, i / steps));
      }
      return set;
    }
  },
  analogous: {
    label: "Analogous",
    description: "Neighbors on the hue wheel.",
    params: [
      { key: "angle", label: "Angle", kind: "float", min: 12, max: 60, step: 1 },
      { key: "direction", label: "Direction", kind: "enum", options: ["clockwise", "counter", "both"] }
    ],
    derive: (base, p) => {
      const angle = num(p, "angle");
      const direction = str(p, "direction");
      const set = [base];
      if (direction !== "counter") set.push(hueShift(base, angle));
      if (direction !== "clockwise") set.push(hueShift(base, -angle));
      return set;
    }
  },
  complementary: {
    label: "Complementary",
    description: "The opposite side of the hue wheel.",
    params: [
      { key: "offset", label: "Offset from 180°", kind: "float", min: -30, max: 30, step: 1 },
      { key: "lightnessShift", label: "Lightness shift", kind: "float", min: -0.15, max: 0.15, step: 0.01 }
    ],
    derive: (base, p) => [base, lighten(hueShift(base, 180 + num(p, "offset")), num(p, "lightnessShift"))]
  }
};
const COLOR_MODE_NAMES = Object.keys(COLOR_MODES);
function deriveColorSet(mode, base, params) {
  return COLOR_MODES[mode].derive(base, params);
}
function sampleColorMode(r, modes) {
  const pool = modes?.filter((m) => m in COLOR_MODES) ?? COLOR_MODE_NAMES;
  const mode = r.pick(pool.length > 0 ? pool : COLOR_MODE_NAMES);
  return {
    mode,
    params: sampleParams(COLOR_MODES[mode].params, r),
    index: 1
  };
}
registerColorModeSampler(sampleColorMode);
function resolveModeSet(value, base) {
  if (!value || typeof value !== "object") return [base];
  const set = deriveColorSet(value.mode, base, value.params);
  const [baseHue, baseSaturation] = hexToHsl(base);
  const clamped = set.map((color) => {
    let [h, sat, l] = hexToHsl(color);
    if (l > 0.84 && sat < 0.01 && baseSaturation >= 0.01) {
      h = baseHue;
      sat = baseSaturation;
    }
    return hslToHex(h, sat, Math.min(0.84, Math.max(0.16, l)));
  });
  if (colorCollector) colorCollector.push(...clamped);
  return clamped;
}
let colorCollector = null;
function collectDerivedColors(fn) {
  const prev = colorCollector;
  colorCollector = [];
  const result = fn();
  const colors = colorCollector;
  colorCollector = prev;
  return { result, colors };
}
function resolveModeColor(value, base) {
  if (!value || typeof value !== "object") return base;
  const set = resolveModeSet(value, base);
  return set[Math.min(Math.max(1, value.index), set.length - 1)] ?? base;
}
function towardParams(base, target) {
  const [bh, bs, bl] = hexToHsl(base);
  const [th, ts, tl] = hexToHsl(target);
  let dh = th - bh;
  if (dh > 180) dh -= 360;
  if (dh < -180) dh += 360;
  return { targetHue: dh, targetSaturation: ts - bs, targetLightness: tl - bl };
}
const FLOWER_TYPES = [
  "forgetmenot",
  "sunflower",
  "lantana",
  "bluebell",
  "tulip",
  "daylily",
  "daisy",
  "rose",
  "poppy"
];
const f = (n) => Math.round(n * 100) / 100;
const STALK = "#4E7A48";
const DAISY_PARAMS = [
  { key: "petals", label: "Petals", kind: "int", min: 10, max: 16 },
  { key: "centerSize", label: "Center size", kind: "float", min: 1.8, max: 3.4, step: 0.1 },
  { key: "petalLength", label: "Petal length", kind: "float", min: 0.6, max: 1, step: 0.01 },
  { key: "petalWidth", label: "Petal width", kind: "float", min: 1.6, max: 3.4, step: 0.1 },
  { key: "petalShape", label: "Petal shape", kind: "enum", options: ["round", "pointed"] },
  {
    key: "layering",
    label: "Petal layering",
    kind: "enum",
    options: ["alternating", "ladder", "weave"]
  },
  { key: "flipLayers", label: "Swap front layer", kind: "bool", probability: 0.5 },
  { key: "twoTone", label: "Two-tone petals", kind: "bool", probability: 0.45 },
  { key: "toneColor", label: "Second tone", kind: "colorMode", modes: ["tint"] }
];
function petalOrder(count, layering, flip) {
  const idx = Array.from({ length: count }, (_, i) => i);
  const groups = layering === "alternating" ? [idx.filter((i) => i % 2 === 0), idx.filter((i) => i % 2 === 1)] : layering === "weave" ? [idx.filter((i) => i % 3 === 0), idx.filter((i) => i % 3 === 1), idx.filter((i) => i % 3 === 2)] : [idx];
  if (flip) groups.reverse();
  if (flip && layering === "ladder") groups[0] = [...groups[0]].reverse();
  return groups.flat();
}
function drawDaisy(p, pal) {
  const petals = num(p, "petals");
  const centerR = num(p, "centerSize");
  const len = (9.8 - centerR) * num(p, "petalLength");
  const width = num(p, "petalWidth");
  const twoTone = flag(p, "twoTone");
  const pointed = str(p, "petalShape") === "pointed";
  const tone = resolveModeColor(p["toneColor"], pal.petal);
  let out = "";
  for (const i of petalOrder(petals, str(p, "layering"), flag(p, "flipLayers"))) {
    const angle = i * 360 / petals;
    const fill = twoTone && i % 2 === 1 ? tone : pal.petal;
    if (pointed) {
      const base = centerR * 0.5;
      const l = len + centerR * 0.5;
      out += `<path d="M0,${f(-base)} C ${f(-width)},${f(-base - l * 0.3)} ${f(-width * 0.72)},${f(-base - l * 0.75)} 0,${f(-base - l)} C ${f(width * 0.72)},${f(-base - l * 0.75)} ${f(width)},${f(-base - l * 0.3)} 0,${f(-base)} Z" fill="${fill}" transform="rotate(${f(angle)})"/>`;
    } else {
      out += `<ellipse cx="0" cy="${f(-(centerR * 0.6 + len / 2))}" rx="${f(width)}" ry="${f(len / 2 + centerR * 0.3)}" fill="${fill}" transform="rotate(${f(angle)})"/>`;
    }
  }
  out += `<circle r="${f(centerR)}" fill="${pal.center}"/>`;
  out += `<circle r="${f(centerR * 0.45)}" fill="${pal.centerShade}" opacity="0.6"/>`;
  return out;
}
const TULIP_PARAMS = [
  { key: "height", label: "Height", kind: "float", min: 15, max: 19, step: 0.1 },
  { key: "width", label: "Width", kind: "float", min: 8.5, max: 10.8, step: 0.1 },
  { key: "spread", label: "Side petal spread", kind: "float", min: 0.3, max: 0.5, step: 0.01 },
  { key: "shoulder", label: "Cup roundness", kind: "float", min: 0.42, max: 0.62, step: 0.01 },
  { key: "sideColor", label: "Side petal color", kind: "colorMode", modes: ["tint"] }
];
function drawTulip(p, pal) {
  const h = num(p, "height");
  const w = num(p, "width");
  const spread = num(p, "spread");
  const shoulder = num(p, "shoulder");
  const top = -h * 0.52;
  const bot = h * 0.48;
  const norm = (shoulder + 0.14) / 0.66;
  const offset = w * spread * 0.9 * norm;
  const tilt = Math.asin(Math.min(0.6, spread * 0.95 * w / h)) * 180 / Math.PI * norm;
  const petal = (fill) => `<path d="M0,${f(bot)} C ${f(-w * (shoulder + 0.14))},${f(bot - h * 0.2)} ${f(-w * shoulder)},${f(top + h * 0.28)} 0,${f(top)} C ${f(w * shoulder)},${f(top + h * 0.28)} ${f(w * (shoulder + 0.14))},${f(bot - h * 0.2)} 0,${f(bot)} Z" fill="${fill}"/>`;
  const sideColor = resolveModeColor(p["sideColor"], pal.petal);
  return `<g transform="translate(${f(-offset)},0) rotate(${f(-tilt)})">${petal(sideColor)}</g><g transform="translate(${f(offset)},0) rotate(${f(tilt)})">${petal(sideColor)}</g>` + petal(pal.petal);
}
const ROSE_PARAMS = [
  { key: "size", label: "Size", kind: "float", min: 8, max: 9.6, step: 0.1 },
  { key: "petalsPerRing", label: "Petals per ring", kind: "int", min: 6, max: 9 },
  { key: "rings", label: "Petal rings", kind: "int", min: 2, max: 3 },
  { key: "openness", label: "Openness", kind: "float", min: 0.58, max: 0.72, step: 0.01 },
  { key: "twist", label: "Ring twist", kind: "float", min: 14, max: 40, step: 1 },
  { key: "depth", label: "Depth shading", kind: "float", min: 0.35, max: 0.62, step: 0.01 },
  { key: "rotation", label: "Rotation", kind: "float", min: 0, max: 360, step: 1 }
];
function drawRose(p, pal) {
  const R = num(p, "size");
  const perRing = num(p, "petalsPerRing");
  const rings = num(p, "rings");
  const open = num(p, "openness");
  const twist = num(p, "twist");
  const depth = num(p, "depth");
  const rampTarget = lighten(pal.petalShade, -depth * 0.13);
  const ramp = deriveColorSet("blend", pal.petal, {
    ...towardParams(pal.petal, rampTarget),
    steps: Math.max(1, rings - 1) + 1
  });
  let out = `<g transform="rotate(${f(num(p, "rotation"))})">`;
  for (let k = 0; k < rings; k++) {
    const radius = R * Math.pow(open, k);
    const w = radius * Math.PI / perRing * 1.15;
    const color = ramp[Math.min(k, ramp.length - 1)];
    const petal = `M0,0 C ${f(-w)},${f(-radius * 0.3)} ${f(-w * 1.02)},${f(-radius * 0.78)} 0,${f(-radius)} C ${f(w * 1.02)},${f(-radius * 0.78)} ${f(w)},${f(-radius * 0.3)} 0,0 Z`;
    for (let i = 0; i < perRing; i++) {
      const angle = i * 360 / perRing + k * twist;
      out += `<path d="${petal}" fill="${color}" transform="rotate(${f(angle)})"/>`;
    }
  }
  const budR = R * Math.pow(open, rings);
  const budColor = lighten(mixHex(pal.petalShade, pal.petal, 0.18), -depth * 0.14);
  out += `<circle r="${f(budR * 0.95)}" fill="${budColor}"/>`;
  out += `<circle cx="${f(budR * 0.28)}" cy="${f(-budR * 0.18)}" r="${f(budR * 0.6)}" fill="${mixHex(pal.petalShade, pal.petal, 0.38)}"/>`;
  out += `<circle cx="${f(-budR * 0.18)}" cy="${f(budR * 0.22)}" r="${f(budR * 0.34)}" fill="${budColor}"/>`;
  out += "</g>";
  return out;
}
const POPPY_PARAMS = [
  { key: "petals", label: "Petals", kind: "int", min: 5, max: 7 },
  { key: "petalLength", label: "Petal length", kind: "float", min: 8, max: 10, step: 0.1 },
  { key: "petalWidth", label: "Petal width", kind: "float", min: 4, max: 5.5, step: 0.1 },
  { key: "centerSize", label: "Center size", kind: "float", min: 1.8, max: 3, step: 0.1 },
  { key: "dotCount", label: "Center dots", kind: "int", min: 6, max: 10 },
  {
    key: "layering",
    label: "Petal layering",
    kind: "enum",
    options: ["alternating", "ladder", "weave"]
  },
  { key: "flipLayers", label: "Swap front layer", kind: "bool", probability: 0.5 },
  { key: "shadeAlternate", label: "Alternate shading", kind: "bool", probability: 0.7 },
  { key: "toneColor", label: "Second tone", kind: "colorMode", modes: ["tint"] },
  { key: "rotation", label: "Rotation", kind: "float", min: 0, max: 360, step: 1 }
];
function drawPoppy(p, pal) {
  const petals = num(p, "petals");
  const len = num(p, "petalLength");
  const width = num(p, "petalWidth");
  const centerR = num(p, "centerSize");
  const alternate = flag(p, "shadeAlternate");
  const tone = resolveModeColor(p["toneColor"], pal.petal);
  let out = "";
  for (const i of petalOrder(petals, str(p, "layering"), flag(p, "flipLayers"))) {
    const angle = num(p, "rotation") + i * 360 / petals;
    const fill = alternate && i % 2 === 1 ? tone : pal.petal;
    out += `<path d="M0,-0.5 C ${f(-width)},${f(-len * 0.35)} ${f(-width * 0.82)},${f(-len * 0.95)} 0,${f(-len)} C ${f(width * 0.82)},${f(-len * 0.95)} ${f(width)},${f(-len * 0.35)} 0,-0.5 Z" fill="${fill}" transform="rotate(${f(angle)})"/>`;
  }
  out += `<circle r="${f(centerR)}" fill="${pal.center}"/>`;
  const dotCount = num(p, "dotCount");
  for (let i = 0; i < dotCount; i++) {
    const a = i * 2 * Math.PI / dotCount;
    out += `<circle cx="${f(Math.cos(a) * centerR * 1.45)}" cy="${f(Math.sin(a) * centerR * 1.45)}" r="0.55" fill="${pal.centerShade}"/>`;
  }
  return out;
}
const BLUEBELL_PARAMS = [
  { key: "bells", label: "Bells", kind: "int", min: 1, max: 3 },
  { key: "height", label: "Bell length", kind: "float", min: 11.5, max: 14, step: 0.1 },
  { key: "width", label: "Bell width", kind: "float", min: 4.4, max: 5.4, step: 0.1 },
  { key: "flare", label: "Skirt flare", kind: "float", min: 0.55, max: 0.68, step: 0.01 },
  { key: "fan", label: "Bell tilt", kind: "float", min: 4, max: 14, step: 0.5 },
  { key: "stemAngle", label: "Stem angle", kind: "float", min: 34, max: 70, step: 0.5 },
  { key: "outerColor", label: "Outer bell color", kind: "colorMode", modes: ["tint"] },
  { key: "ridge", label: "Ridge line", kind: "bool", probability: 0.8 },
  { key: "pedicelWidth", label: "Thin stem thickness", kind: "float", min: 0.85, max: 1.15, step: 0.05 }
];
function renderBluebell(p, pal, mode = "category") {
  const bells = num(p, "bells");
  const h = num(p, "height");
  const flare = num(p, "flare");
  const fan = num(p, "fan");
  const spacingW = num(p, "width");
  const w = bells === 1 ? spacingW * 1.35 : bells === 3 ? Math.min(spacingW, 4.9) : spacingW;
  const bh = Math.min(h, w * 2.05);
  const bell = (fill) => `<path d="M ${f(-w * 0.2)},0 C ${f(-w * 0.46)},${f(bh * 0.14)} ${f(-w * 0.4)},${f(bh * 0.5)} ${f(-w * 0.48)},${f(bh * 0.74)} C ${f(-w * 0.6)},${f(bh * 0.8)} ${f(-w * flare)},${f(bh * 0.84)} ${f(-w * flare)},${f(bh * 0.88)} Q ${f(-w * 0.3)},${f(bh * 0.98)} 0,${f(bh)} Q ${f(w * 0.3)},${f(bh * 0.98)} ${f(w * flare)},${f(bh * 0.88)} C ${f(w * flare)},${f(bh * 0.84)} ${f(w * 0.6)},${f(bh * 0.8)} ${f(w * 0.48)},${f(bh * 0.74)} C ${f(w * 0.4)},${f(bh * 0.5)} ${f(w * 0.46)},${f(bh * 0.14)} ${f(w * 0.2)},0 Q 0,${f(-bh * 0.05)} ${f(-w * 0.2)},0 Z" fill="${fill}"/>` + (flag(p, "ridge") ? `<path d="M0,${f(bh * 0.12)} C ${f(-w * 0.06)},${f(bh * 0.4)} ${f(w * 0.04)},${f(bh * 0.6)} 0,${f(bh * 0.82)}" fill="none" stroke="${ridgeColor(fill)}" stroke-width="0.6" opacity="0.6"/>` : "");
  function ridgeColor(fill) {
    const [, , l] = hexToHsl(fill);
    return lighten(fill, l > 0.55 ? -0.12 : 0.12);
  }
  const knotY = -2.6;
  const reach = 7.4;
  const stemAngle = num(p, "stemAngle");
  const requestedPedicelWidth = num(p, "pedicelWidth");
  const pedicelWidth = Number.isFinite(requestedPedicelWidth) ? requestedPedicelWidth : 0.75;
  const rad = (deg) => deg * Math.PI / 180;
  const attach = (theta, len) => ({
    x: Math.sin(rad(theta)) * len,
    y: knotY + Math.cos(rad(theta)) * len
  });
  const spots = bells === 1 ? [{ ...attach(0, reach * 0.55), a: fan * 0.3 - 2 }] : bells === 2 ? [
    { ...attach(-stemAngle * 0.9, reach * 0.9), a: -fan * 0.9 },
    { ...attach(stemAngle * 0.9, reach * 0.82), a: fan * 0.9 }
  ] : [
    { ...attach(-stemAngle, reach), a: -fan },
    { ...attach(stemAngle, reach), a: fan },
    { ...attach(0, reach), a: 0 }
  ];
  if (mode === "stem-attached") {
    for (const spot of spots) spot.a = 0;
  }
  if (bells > 1) {
    const minX = bells === 3 ? w : w * 0.62;
    const maxX = bells === 3 ? w * 1.22 : w * 0.76;
    for (const s of spots) {
      if (s.x !== 0) s.x = Math.sign(s.x) * Math.min(maxX, Math.max(minX, Math.abs(s.x)));
    }
  }
  const ys = spots.flatMap((s) => [s.y, s.y + Math.cos(rad(s.a)) * bh]);
  const top = Math.min(...ys);
  const bottom = Math.max(...ys);
  const hBox = bottom - top;
  const desiredHalfW = Math.max(
    ...spots.map((s) => Math.abs(s.x) + Math.sin(rad(Math.abs(s.a))) * bh * 0.67 + w * 0.7)
  );
  const baseHalfW = Math.max(...spots.map((s) => Math.abs(s.x) + w * 0.7));
  const scale = Math.min(16.6 / hBox, Math.max(9.6 / desiredHalfW, 9.6 / (baseHalfW + 1)));
  const maxHalfW = 9.6 / scale;
  for (const s of spots) {
    const room = maxHalfW - Math.abs(s.x) - w * 0.7;
    if (Math.sin(rad(Math.abs(s.a))) * bh * 0.67 > room) {
      const maxTilt = Math.asin(Math.max(0, Math.min(1, room / (bh * 0.67)))) * 180 / Math.PI;
      s.a = Math.sign(s.a || 1) * Math.min(Math.abs(s.a), maxTilt);
    }
    s.x -= Math.sin(rad(s.a)) * bh * 0.33;
  }
  let cluster = "";
  for (let i = 0; i < spots.length; i++) {
    const s = spots[i];
    const fill = i < spots.length - 1 ? resolveModeColor(p["outerColor"], pal.petal) : pal.petal;
    cluster += `<path d="M0,${knotY} Q ${f(s.x * 0.45)},${f(knotY + (s.y - knotY) * 0.55)} ${f(s.x)},${f(s.y)}" fill="none" stroke="${STALK}" stroke-width="${f(pedicelWidth)}" stroke-linecap="round"/>`;
    cluster += `<g transform="translate(${f(s.x)},${f(s.y)}) rotate(${f(s.a)})">${bell(fill)}</g>`;
  }
  cluster += `<circle cy="${knotY}" r="0.75" fill="${STALK}"/>`;
  const points = spots.flatMap((s) => {
    const tipX = s.x + Math.sin(rad(s.a)) * bh;
    const tipY = s.y + Math.cos(rad(s.a)) * bh;
    return [
      { x: s.x - w * 0.7, y: s.y },
      { x: s.x + w * 0.7, y: s.y },
      { x: tipX - w * 0.7, y: tipY },
      { x: tipX + w * 0.7, y: tipY }
    ];
  });
  const left = Math.min(...points.map((pt) => pt.x));
  const right = Math.max(...points.map((pt) => pt.x));
  const cx = (left + right) / 2;
  const cy = (top + bottom) / 2;
  const translateX = f(-cx * scale);
  const translateY = f(-cy * scale);
  const renderedScale = f(scale);
  return {
    svg: `<g transform="translate(${translateX},${translateY}) scale(${renderedScale})">${cluster}</g>`,
    anchorPoint: {
      x: translateX || 0,
      y: f(translateY + knotY * renderedScale)
    }
  };
}
const SUNFLOWER_PARAMS = [
  { key: "petals", label: "Petals", kind: "int", min: 12, max: 20 },
  { key: "centerSize", label: "Center size", kind: "float", min: 3.2, max: 4.6, step: 0.1 },
  { key: "petalLength", label: "Petal length", kind: "float", min: 0.75, max: 1, step: 0.01 },
  { key: "petalFullness", label: "Petal fullness", kind: "float", min: 0.6, max: 0.85, step: 0.01 },
  { key: "twoLayer", label: "Second petal layer", kind: "bool", probability: 0.55 },
  { key: "layerColor", label: "Back layer color", kind: "colorMode", modes: ["tint"] },
  { key: "seedRings", label: "Seed rings", kind: "int", min: 1, max: 2 }
];
function drawSunflower(p, pal) {
  const petals = num(p, "petals");
  const centerR = num(p, "centerSize");
  const len = (10 - centerR * 0.55) * num(p, "petalLength");
  const spacing = 2 * Math.PI * (centerR + len * 0.35) / petals;
  const width = Math.min(3.4, spacing * num(p, "petalFullness"));
  let out = "";
  const petalPath = (scale, fill, offset) => {
    let s = "";
    for (let i = 0; i < petals; i++) {
      const angle = offset + i * 360 / petals;
      const l = len * scale;
      s += `<path d="M0,${f(-centerR * 0.7)} C ${f(-width)},${f(-centerR - l * 0.4)} ${f(-width * 0.7)},${f(-centerR - l * 0.85)} 0,${f(-centerR - l)} C ${f(width * 0.7)},${f(-centerR - l * 0.85)} ${f(width)},${f(-centerR - l * 0.4)} 0,${f(-centerR * 0.7)} Z" fill="${fill}" transform="rotate(${f(angle)})"/>`;
    }
    return s;
  };
  if (flag(p, "twoLayer")) {
    out += petalPath(0.78, resolveModeColor(p["layerColor"], pal.petal), 180 / petals);
  }
  out += petalPath(1, pal.petal, 0);
  out += `<circle r="${f(centerR)}" fill="${pal.center}"/>`;
  const rings = num(p, "seedRings") === 1 ? [[0.55, 7]] : [
    [0.62, 8],
    [0.3, 5]
  ];
  for (const [ring, count] of rings) {
    for (let i = 0; i < count; i++) {
      const a = i * 2 * Math.PI / count + ring;
      out += `<circle cx="${f(Math.cos(a) * centerR * ring)}" cy="${f(Math.sin(a) * centerR * ring)}" r="0.5" fill="${pal.centerShade}"/>`;
    }
  }
  return out;
}
const FORGETMENOT_PARAMS = [
  { key: "petals", label: "Petals", kind: "int", min: 5, max: 6 },
  { key: "spacing", label: "Petal spacing", kind: "float", min: 0.78, max: 0.92, step: 0.01 },
  { key: "petalSize", label: "Petal size", kind: "float", min: 3.1, max: 3.9, step: 0.05 },
  { key: "squish", label: "Petal roundness", kind: "float", min: 0.85, max: 1, step: 0.01 },
  { key: "rotation", label: "Rotation", kind: "float", min: 0, max: 72, step: 1 },
  { key: "twoTone", label: "Two-tone petals", kind: "bool", probability: 0.35 },
  { key: "toneColor", label: "Second tone", kind: "colorMode", modes: ["tint"] }
];
function drawForgetmenot(p, pal) {
  const petals = num(p, "petals");
  const petalR = num(p, "petalSize");
  const dist = Math.min(petalR * num(p, "spacing") / Math.sin(Math.PI / petals), 10 - petalR);
  const squish = num(p, "squish");
  const offset = num(p, "rotation");
  const twoTone = flag(p, "twoTone");
  const tone = resolveModeColor(p["toneColor"], pal.petal);
  let out = "";
  for (let i = 0; i < petals; i++) {
    const deg = offset + i * 360 / petals;
    const a = deg * Math.PI / 180;
    const fill = twoTone && i % 2 === 1 ? tone : pal.petal;
    out += `<ellipse cx="${f(Math.cos(a) * dist)}" cy="${f(Math.sin(a) * dist)}" rx="${f(petalR)}" ry="${f(petalR * squish)}" fill="${fill}" transform="rotate(${f(deg)} ${f(Math.cos(a) * dist)} ${f(Math.sin(a) * dist)})"/>`;
  }
  out += `<circle r="${f(petalR * 0.6)}" fill="${pal.center}"/>`;
  out += `<circle r="${f(petalR * 0.6)}" fill="none" stroke="#FFFFFF" stroke-width="${f(petalR * 0.24)}" opacity="0.9"/>`;
  out += `<circle r="${f(petalR * 0.18)}" fill="${pal.centerShade}"/>`;
  return out;
}
const LANTANA_PARAMS = [
  { key: "outerFlorets", label: "Outer florets", kind: "int", min: 10, max: 14 },
  { key: "midFlorets", label: "Middle florets", kind: "int", min: 5, max: 7 },
  { key: "floretSize", label: "Floret size", kind: "float", min: 2, max: 2.5, step: 0.05 },
  { key: "floretPetals", label: "Floret petals", kind: "int", min: 4, max: 5 },
  { key: "ringColors", label: "Ring colors", kind: "colorMode", modes: ["tint"] },
  { key: "rotation", label: "Rotation", kind: "float", min: 0, max: 360, step: 1 }
];
function lantanaColors(p, pal) {
  const P = pal.petal;
  const S = pal.petalShade;
  const set = resolveModeSet(p["ringColors"], P);
  const rings = [set[0] ?? P, set[1] ?? S, set[2] ?? set[1] ?? S];
  return { rings, dots: [S, lighten(rings[1], -0.13), lighten(rings[2], -0.13)] };
}
function drawLantana(p, pal) {
  const outerCount = num(p, "outerFlorets");
  const midCount = num(p, "midFlorets");
  const floretR = num(p, "floretSize");
  const floretPetals = num(p, "floretPetals");
  const { rings, dots } = lantanaColors(p, pal);
  const floret = (cx, cy, s, color, dot) => {
    let out2 = "";
    for (let i = 0; i < floretPetals; i++) {
      const a = i * 2 * Math.PI / floretPetals + Math.PI / 4;
      out2 += `<circle cx="${f(cx + Math.cos(a) * s * 0.52)}" cy="${f(cy + Math.sin(a) * s * 0.52)}" r="${f(s * 0.56)}" fill="${color}"/>`;
    }
    out2 += `<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(s * 0.3)}" fill="${dot}"/>`;
    return out2;
  };
  let out = `<g transform="rotate(${f(num(p, "rotation"))})">`;
  for (let i = 0; i < outerCount; i++) {
    const a = i * 2 * Math.PI / outerCount;
    out += floret(Math.cos(a) * 6.1, Math.sin(a) * 6.1, floretR, rings[0], dots[0]);
  }
  for (let i = 0; i < midCount; i++) {
    const a = i * 2 * Math.PI / midCount + 0.5;
    out += floret(Math.cos(a) * 3.3, Math.sin(a) * 3.3, floretR * 0.96, rings[1], dots[1]);
  }
  out += floret(0, 0, floretR * 1.02, rings[2], dots[2]);
  out += "</g>";
  return out;
}
const DAYLILY_PARAMS = [
  { key: "petalLength", label: "Petal length", kind: "float", min: 8.4, max: 10, step: 0.1 },
  { key: "petalWidth", label: "Petal width", kind: "float", min: 3.2, max: 4.6, step: 0.05 },
  { key: "curl", label: "Petal curl", kind: "float", min: 0.6, max: 0.9, step: 0.01 },
  { key: "backColor", label: "Back petal color", kind: "colorMode", modes: ["tint"] },
  { key: "stamens", label: "Stamens", kind: "int", min: 3, max: 5 },
  { key: "stamenLength", label: "Stamen length", kind: "float", min: 2.2, max: 3.8, step: 0.05 },
  { key: "midribs", label: "Petal midribs", kind: "bool", probability: 0.8 },
  { key: "rotation", label: "Rotation", kind: "float", min: 0, max: 120, step: 1 }
];
function drawDaylily(p, pal) {
  const len = num(p, "petalLength");
  const width = num(p, "petalWidth");
  const curl = num(p, "curl");
  const stamens = num(p, "stamens");
  const stamenLen = num(p, "stamenLength");
  const petal = (l, w, fill) => `<path d="M0,0 C ${f(-w)},${f(-l * 0.25)} ${f(-w * curl)},${f(-l * 0.7)} ${f(-w * 0.14)},${f(-l * 0.96)} L 0,${f(-l)} L ${f(w * 0.14)},${f(-l * 0.96)} C ${f(w * curl)},${f(-l * 0.7)} ${f(w)},${f(-l * 0.25)} 0,0 Z" fill="${fill}"/>`;
  const backColor = resolveModeColor(p["backColor"], pal.petal);
  let out = `<g transform="rotate(${f(num(p, "rotation"))})">`;
  for (let i = 0; i < 3; i++) {
    out += `<g transform="rotate(${f(60 + i * 120)})">${petal(len, width * 1.18, backColor)}</g>`;
  }
  for (let i = 0; i < 3; i++) {
    out += `<g transform="rotate(${f(i * 120)})">${petal(len, width, pal.petal)}</g>`;
    if (flag(p, "midribs")) {
      out += `<path d="M0,-1.4 L0,${f(-len * 0.82)}" stroke="${pal.petalShade}" stroke-width="0.55" opacity="0.55" transform="rotate(${f(i * 120)})"/>`;
    }
  }
  out += `<circle r="2.1" fill="${pal.center}"/>`;
  for (let i = 0; i < stamens; i++) {
    const spread = (i - (stamens - 1) / 2) * 1.3;
    out += `<path d="M0,0 Q ${f(spread)},${f(-stamenLen * 0.6)} ${f(spread * 1.2)},${f(-stamenLen)}" fill="none" stroke="${pal.centerShade}" stroke-width="0.5"/>`;
    out += `<circle cx="${f(spread * 1.2)}" cy="${f(-stamenLen)}" r="0.55" fill="${pal.centerShade}"/>`;
  }
  out += "</g>";
  return out;
}
function centered(draw) {
  return (params, pal) => ({
    svg: draw(params, pal),
    anchorPoint: { x: 0, y: 0 }
  });
}
function renderTulip(p, pal) {
  return {
    svg: drawTulip(p, pal),
    // The stem enters the base of the cup, not its visual center.
    anchorPoint: { x: 0, y: f(num(p, "height") * 0.48) }
  };
}
function flowerDef(params, render, headRadius, growthHabit) {
  return {
    params,
    growthHabit,
    render,
    draw: (flowerParams, pal) => render(flowerParams, pal).svg,
    headRadius
  };
}
const FLOWER_DEFS = {
  forgetmenot: flowerDef(FORGETMENOT_PARAMS, centered(drawForgetmenot), 8.7, "radial"),
  sunflower: flowerDef(SUNFLOWER_PARAMS, centered(drawSunflower), 9.9, "radial"),
  lantana: flowerDef(LANTANA_PARAMS, centered(drawLantana), 8.6, "radial"),
  bluebell: flowerDef(BLUEBELL_PARAMS, renderBluebell, 8.4, "hanging"),
  tulip: flowerDef(TULIP_PARAMS, renderTulip, 9.2, "upright"),
  daylily: flowerDef(DAYLILY_PARAMS, centered(drawDaylily), 9.3, "radial"),
  daisy: flowerDef(DAISY_PARAMS, centered(drawDaisy), 9.4, "radial"),
  rose: flowerDef(ROSE_PARAMS, centered(drawRose), 10.6, "radial"),
  poppy: flowerDef(POPPY_PARAMS, centered(drawPoppy), 9.3, "radial")
};
function renderFlowerImage(type, params, pal, mode = "category") {
  return FLOWER_DEFS[type].render(params, pal, mode);
}
function sampleFlowerParams(type, r) {
  return sampleParams(FLOWER_DEFS[type].params, r);
}
function renderFlowerWithAnchorPoint(type, r, pal, mode = "category") {
  return renderFlowerImage(type, sampleFlowerParams(type, r), pal, mode);
}
function renderLeaf(len, width, fill) {
  return `<path d="M0,0 Q ${f(-width)},${f(-len * 0.48)} 0,${f(-len)} Q ${f(width)},${f(-len * 0.48)} 0,0 Z" fill="${fill}"/>`;
}
const PREFERRED_HUES = {
  forgetmenot: ["blue", "purple"],
  bluebell: ["blue", "purple"],
  sunflower: ["yellow", "orange"],
  daylily: ["orange", "yellow", "red", "pink"],
  lantana: ["pink", "orange", "yellow"]
};
function pickPalette(r, type, palettes) {
  const preferred = PREFERRED_HUES[type];
  const useBias = r.bool(0.75);
  if (preferred && useBias) {
    const subset = palettes.filter((p) => preferred.includes(p.hue));
    if (subset.length > 0) return r.pick(subset);
  }
  return r.pick(palettes);
}
function makeBloom(r, type, ctx) {
  const base = pickPalette(r, type, ctx.flowerPalettes);
  const hueJitter = r.range(-7, 7);
  const lightJitter = r.range(-0.035, 0.035);
  const tweak = (color) => lighten(hueShift(color, hueJitter), lightJitter);
  const palette = {
    ...base,
    petal: tweak(base.petal),
    petalShade: tweak(base.petalShade)
  };
  const { result: rendered, colors } = collectDerivedColors(
    () => renderFlowerWithAnchorPoint(type, r, palette, ctx.renderMode)
  );
  const petalHue = hexToHsl(palette.petal)[0];
  const isPetalHued = (c) => {
    const d = Math.abs(hexToHsl(c)[0] - petalHue);
    return Math.min(d, 360 - d) < 6;
  };
  return {
    type,
    palette,
    svg: rendered.svg,
    anchorPoint: rendered.anchorPoint,
    colors: [palette.petal, palette.petalShade, ...colors.filter(isPetalHued)]
  };
}
function categoryHead(catRng, ctx) {
  const r = catRng.fork("head");
  return makeBloom(r, r.pick(ctx.flowerTypes), ctx);
}
const BACKGROUND_MODES = ["solid", "stripes", "dots", "waves", "arc"];
const COLOR_RELATIONS = COLOR_MODE_NAMES;
function byName(all, names) {
  if (!names || names.length === 0) return all;
  const set = new Set(names);
  const filtered = all.filter((item) => set.has(item.name));
  return filtered.length > 0 ? filtered : all;
}
function known(all, values) {
  const filtered = values?.filter((v) => all.includes(v)) ?? [];
  return filtered.length > 0 ? filtered : all;
}
function resolveOptions(options) {
  return {
    variant: options.variant === "bouquet" ? "bouquet" : "flower",
    categoryBackground: options.categoryBackground !== false,
    flowerTypes: known(FLOWER_TYPES, options.flowerTypes),
    flowerPalettes: byName(FLOWER_PALETTES, options.flowerPalettes),
    backgrounds: byName(BACKGROUND_PALETTES, options.backgrounds),
    backgroundModes: known(BACKGROUND_MODES, options.backgroundModes),
    colorRelations: known(COLOR_RELATIONS, options.colorRelations)
  };
}
function categoryRng(categoryId) {
  return createRng(`fable-flowers cat ${categoryId}`);
}
function categoryCrown(categoryId, renderMode = "stem-attached", options = {}) {
  const resolved = resolveOptions(options);
  return categoryHead(categoryRng(categoryId), {
    flowerTypes: resolved.flowerTypes,
    flowerPalettes: resolved.flowerPalettes,
    renderMode
  });
}
const SNPRO = "'SN Pro Variable', 'SN Pro', system-ui, sans-serif";
const GELICA = "'Gelica', Georgia, serif";
const DISC_BASE = "#fffcf2";
const TILE_BG = "#fffcf2";
const STEM = "#5B8C5A";
const LEAF = "#5B8C5A";
const LEAF_LIGHT = "#8FB06A";
const EARTH = "#ad8a61";
const EARTH_DARK = "#9a7750";
const INK = "#1a1a1a";
const INK_SOFT = "#5e5747";
const CLIP_R = 15.9;
const SKIES = {
  hours: {
    stops: [
      [0, "#f7ac47"],
      [0.4, "#f8cf8d"],
      [1, "#f9eec9"]
    ],
    ink: "#1a140d",
    shade: 0
  },
  peak: {
    stops: [
      [0, "#0c1332"],
      [0.5, "#22315f"],
      [1, "#535390"]
    ],
    ink: "#fdf6e8",
    shade: 0.34
  },
  flow: {
    stops: [
      [0, "#9db8e4"],
      [0.5, "#ccd8e8"],
      [1, "#f4ebd3"]
    ],
    ink: "#1a140d",
    shade: 0
  },
  shipped: {
    stops: [
      [0, "#79b7ec"],
      [0.5, "#badbef"],
      [1, "#f6eed1"]
    ],
    ink: "#1a140d",
    shade: 0
  },
  tempest: {
    stops: [
      [0, "#454f64"],
      [0.45, "#7c8294"],
      [1, "#d8d1bc"]
    ],
    ink: "#fdf6e8",
    shade: 0.16
  },
  endurance: {
    stops: [
      [0, "#191f4d"],
      [0.5, "#584a85"],
      [1, "#dd9a68"]
    ],
    ink: "#fdf6e8",
    shade: 0.3
  },
  nightowl: {
    stops: [
      [0, "#0a0e24"],
      [0.5, "#161d40"],
      [1, "#454071"]
    ],
    ink: "#fdf6e8",
    shade: 0.42
  },
  craft: {
    stops: [
      [0, "#becfe7"],
      [0.5, "#e7ddda"],
      [1, "#f7edca"]
    ],
    ink: "#1a140d",
    shade: 0
  }
};
const GROUNDS = {
  hours: { far: "#dcc98b", near: "#8fae5e", valley: "#7c9b50", tint: "#8a5f2a" },
  peak: { far: "#53628c", near: "#37544a", valley: "#2b4239", tint: "#232e52" },
  flow: { far: "#ccd6bd", near: "#7ba25e", valley: "#699052", tint: "#5d7a8c" },
  shipped: { far: "#bdd598", near: "#6fa452", valley: "#5f9346", tint: "#4d7a3c" },
  tempest: { far: "#a9ad92", near: "#647f4e", valley: "#556f43", tint: "#3f4a55" },
  endurance: { far: "#9d8a5c", near: "#5c7d4b", valley: "#4b6a3f", tint: "#4a3560" },
  nightowl: { far: "#454a72", near: "#2f4a3c", valley: "#263c31", tint: "#1a2038" },
  craft: { far: "#d8dabf", near: "#8aa768", valley: "#78955b", tint: "#7a7f96" }
};
const HUES = {
  hours: "#FFC93C",
  peak: "#8FA6E8",
  flow: "#8B5FBF",
  shipped: "#F58A3C",
  tempest: "#E4573D",
  endurance: "#E56B8C",
  nightowl: "#E4573D",
  craft: "#F8A8BC"
};
const BADGE_FLOWERS = {
  hours: {
    type: "sunflower",
    seed: "crown:sunflower:2",
    shade: "#F0A500",
    center: "#5C4033",
    centerShade: "#8B6242"
  },
  peak: {
    type: "daisy",
    seed: "crown:daisy:2",
    shade: "#6C84D4",
    center: "#FFF1C9",
    centerShade: "#D9B45B"
  },
  flow: {
    type: "forgetmenot",
    seed: "crown:forgetmenot:2",
    shade: "#6F4599",
    center: "#FFE8A3",
    centerShade: "#C79A3C"
  },
  shipped: {
    type: "lantana",
    seed: "crown:lantana:4",
    shade: "#DD6B20",
    center: "#7A3E2E",
    centerShade: "#4E2A1E"
  },
  tempest: {
    type: "poppy",
    seed: "crown:poppy:5",
    shade: "#C23A2B",
    center: "#3E2A35",
    centerShade: "#6D4C41"
  },
  endurance: {
    type: "tulip",
    seed: "crown:tulip:6",
    shade: "#C94A70",
    center: "#FFE8A3",
    centerShade: "#D9A441"
  },
  nightowl: {
    type: "rose",
    seed: "crown:rose:3",
    shade: "#C23A2B",
    center: "#3E2A35",
    centerShade: "#6D4C41"
  },
  craft: {
    type: "daylily",
    seed: "crown:daylily:4",
    shade: "#F8A8BC",
    center: "#F9C74F",
    centerShade: "#B8860B"
  }
};
const BADGE_IDS = [
  "hours",
  "peak",
  "flow",
  "shipped",
  "tempest",
  "endurance",
  "nightowl",
  "craft"
];
function fx(n) {
  return String(Math.round(n * 100) / 100);
}
function esc(text) {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function lerp(a, b, t) {
  return a + (b - a) * t;
}
function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}
function renderCrown(type, params, pal) {
  const def = FLOWER_DEFS[type];
  const rendered = def.render(params, pal, "stem-attached");
  return {
    svg: rendered.svg,
    ax: rendered.anchorPoint.x,
    ay: rendered.anchorPoint.y,
    headRadius: def.headRadius,
    hanging: def.growthHabit === "hanging"
  };
}
function badgeCrown(id) {
  const def = BADGE_FLOWERS[id];
  const pal = {
    name: `badge-${id}`,
    hue: "neutral",
    petal: HUES[id],
    petalShade: def.shade,
    center: def.center,
    centerShade: def.centerShade
  };
  return renderCrown(def.type, sampleParams(FLOWER_DEFS[def.type].params, createRng(def.seed)), pal);
}
function meadowCrown(projectKey, cache) {
  const existing = cache.get(projectKey);
  if (existing) return existing;
  const head = categoryCrown(projectKey, "stem-attached");
  const def = FLOWER_DEFS[head.type];
  const crown = {
    svg: head.svg,
    ax: head.anchorPoint.x,
    ay: head.anchorPoint.y,
    headRadius: def.headRadius,
    hanging: def.growthHabit === "hanging"
  };
  cache.set(projectKey, crown);
  return crown;
}
function renderAurora(w, h, rng, uid) {
  let out = "";
  const bands = [
    { tint: "122,242,196", top: 0.1, amp: 0.05, drop: 0.16 },
    { tint: "89,214,201", top: 0.2, amp: 0.07, drop: 0.2 },
    { tint: "148,166,255", top: 0.3, amp: 0.06, drop: 0.22 },
    { tint: "222,142,255", top: 0.42, amp: 0.05, drop: 0.18 }
  ];
  out += `<defs><filter id="${uid}-aurora" x="-10%" y="-30%" width="120%" height="160%"><feGaussianBlur stdDeviation="8"/></filter>`;
  bands.forEach((band, i) => {
    out += `<linearGradient id="${uid}-au${i}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="rgba(${band.tint},0.44)"/><stop offset="0.55" stop-color="rgba(${band.tint},0.14)"/><stop offset="1" stop-color="rgba(${band.tint},0)"/></linearGradient>`;
  });
  out += "</defs>";
  bands.forEach((band, i) => {
    const y = h * band.top + rng.range(-6, 6);
    const amp = h * band.amp;
    const drop = h * band.drop;
    const phase = rng.range(0, Math.PI * 2);
    const topEdge = [];
    const points = [];
    for (let k = 0; k <= 16; k++) {
      const x = k / 16 * (w + 40) - 20;
      const wave = Math.sin(k / 16 * Math.PI * (1.6 + i * 0.4) + phase) * amp + Math.sin(k / 16 * Math.PI * 3.7 + phase * 1.7) * amp * 0.35;
      points.push({ x, y: y + wave });
      topEdge.push(`${k === 0 ? "M" : "L"} ${fx(x)} ${fx(y + wave)}`);
    }
    let d = topEdge.join(" ");
    for (let k = 16; k >= 0; k--) {
      const pt = points[k];
      const sway = Math.sin(k / 16 * Math.PI * 2.3 + phase) * drop * 0.25;
      d += ` L ${fx(pt.x)} ${fx(pt.y + drop + sway)}`;
    }
    out += `<path d="${d} Z" fill="url(#${uid}-au${i})" filter="url(#${uid}-aurora)"/>`;
    out += `<path d="${topEdge.join(" ")}" fill="none" stroke="rgba(${band.tint},0.5)" stroke-width="1.6" filter="url(#${uid}-aurora)"/>`;
  });
  for (let k = 0; k < 24; k++) {
    out += `<circle cx="${(rng.next() * w).toFixed(0)}" cy="${(rng.next() * h * 0.6).toFixed(0)}" r="${(0.8 + rng.next() * 1.2).toFixed(1)}" fill="#fdf6e8" opacity="${(0.25 + rng.next() * 0.5).toFixed(2)}"/>`;
  }
  return out;
}
function sunRays(cx, cy, r) {
  let out = "";
  for (let i = 0; i < 12; i++) {
    const a = i / 12 * Math.PI * 2;
    const far = r * (2.1 + i % 2 * 0.5);
    out += `<line x1="${fx(cx + Math.cos(a) * r * 1.5)}" y1="${fx(cy + Math.sin(a) * r * 1.5)}" x2="${fx(cx + Math.cos(a) * far)}" y2="${fx(cy + Math.sin(a) * far)}" stroke="rgba(255,244,214,0.75)" stroke-width="2.5" stroke-linecap="round"/>`;
  }
  return out;
}
function starfield(w, h, rng, count) {
  let out = "";
  for (let k = 0; k < count; k++) {
    const x = rng.next() * w;
    const y = rng.next() * h;
    const big = k % 9 === 0;
    const r = big ? 1.5 + rng.next() * 0.8 : 0.6 + rng.next() * 1.2;
    const opacity = big ? 0.65 + rng.next() * 0.25 : 0.2 + rng.next() * 0.55;
    out += `<circle cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="${r.toFixed(1)}" fill="#fdf6e8" opacity="${opacity.toFixed(2)}"/>`;
  }
  return out;
}
function cumulus(x, y, s, fill, opacity) {
  return `<g transform="translate(${x.toFixed(0)},${y.toFixed(0)}) scale(${s.toFixed(2)})" fill="${fill}" opacity="${opacity.toFixed(2)}"><path d="M -52 8 Q -56 -8 -40 -12 Q -36 -30 -14 -28 Q -4 -44 18 -36 Q 40 -34 42 -16 Q 58 -12 54 4 Q 56 10 46 10 L -46 10 Q -54 12 -52 8 Z"/></g>`;
}
function renderWeather(persona, w, h, rng, uid) {
  let out = "";
  if (persona === "hours") {
    const cx = w * 0.74;
    const cy = h * 0.34;
    const r = Math.min(w, h) * 0.085;
    out += `<defs><radialGradient id="${uid}-w2halo"><stop offset="0" stop-color="rgba(255,243,205,0.9)"/><stop offset="0.35" stop-color="rgba(255,226,158,0.42)"/><stop offset="1" stop-color="rgba(255,214,128,0)"/></radialGradient></defs>`;
    out += `<circle cx="${fx(cx)}" cy="${fx(cy)}" r="${fx(r * 4.4)}" fill="url(#${uid}-w2halo)"/>`;
    out += sunRays(cx, cy, r);
    out += `<circle cx="${fx(cx)}" cy="${fx(cy)}" r="${fx(r)}" fill="#fff3cf"/><circle cx="${fx(cx)}" cy="${fx(cy)}" r="${fx(r * 1.5)}" fill="none" stroke="rgba(255,248,224,0.5)" stroke-width="1.5"/>`;
  } else if (persona === "peak") {
    out += starfield(w, h * 0.72, rng.fork("stars"), 24);
    out += renderAurora(w, h, rng.fork("aurora"), uid);
  } else if (persona === "flow") {
    const cx = w * 0.72;
    const cy = h * 0.3;
    out += `<defs><radialGradient id="${uid}-w2fsun"><stop offset="0" stop-color="rgba(255,252,240,0.95)"/><stop offset="0.4" stop-color="rgba(255,250,232,0.35)"/><stop offset="1" stop-color="rgba(255,250,232,0)"/></radialGradient><filter id="${uid}-w2fog" x="-10%" y="-60%" width="120%" height="220%"><feGaussianBlur stdDeviation="5"/></filter></defs>`;
    out += `<circle cx="${fx(cx)}" cy="${fx(cy)}" r="${fx(h * 0.3)}" fill="url(#${uid}-w2fsun)"/><circle cx="${fx(cx)}" cy="${fx(cy)}" r="${fx(h * 0.07)}" fill="rgba(255,253,244,0.9)"/>`;
    for (let i = 0; i < 5; i++) {
      const y = h * (0.3 + i * 0.15) + rng.range(-5, 5);
      const amp = rng.range(4, 9);
      const phase = rng.range(0, Math.PI * 2);
      let d = `M -20 ${fx(y)}`;
      for (let k = 1; k <= 12; k++) {
        const x = k / 12 * (w + 40) - 20;
        d += ` L ${fx(x)} ${fx(y + Math.sin(k / 12 * Math.PI * 2.4 + phase) * amp)}`;
      }
      const depth = rng.range(10, 22);
      d += ` L ${fx(w + 20)} ${fx(y + depth)} L -20 ${fx(y + depth)} Z`;
      out += `<path d="${d}" fill="rgba(255,255,255,${(0.5 - i * 0.06).toFixed(2)})" filter="url(#${uid}-w2fog)"/>`;
    }
  } else if (persona === "shipped") {
    out += `<defs><linearGradient id="${uid}-w2cloud" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#e8ecdf"/></linearGradient><filter id="${uid}-w2puff" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="1.6"/></filter></defs>`;
    const cx = w * 0.5;
    const cy = h * 1.1;
    const r0 = h * 0.85;
    const arc = ["#e4573d", "#f4a300", "#ffe08a", "#5fa97a", "#5b8fd6", "#8b5fbf"];
    out += `<g filter="url(#${uid}-w2puff)">`;
    arc.forEach((c, i) => {
      const r = r0 - i * 9;
      out += `<path d="M ${fx(cx - r)} ${fx(cy)} A ${fx(r)} ${fx(r)} 0 0 1 ${fx(cx + r)} ${fx(cy)}" stroke="${c}" stroke-width="9" fill="none" opacity="0.22"/>`;
    });
    out += "</g>";
    const clouds = [
      { x: w * 0.2, y: h * 0.24, s: 1.15 },
      { x: w * 0.66, y: h * 0.14, s: 0.85 },
      { x: w * 0.85, y: h * 0.42, s: 0.7 }
    ];
    for (const cloud of clouds) {
      out += `<g filter="url(#${uid}-w2puff)">${cumulus(cloud.x, cloud.y, cloud.s, `url(#${uid}-w2cloud)`, 0.92)}</g>`;
    }
    for (let k = 0; k < 4; k++) {
      const x = rng.range(0.1, 0.9) * w;
      const y = rng.range(0.32, 0.62) * h;
      const s = rng.range(0.8, 1.3);
      out += `<g transform="translate(${x.toFixed(0)},${y.toFixed(0)}) scale(${s.toFixed(2)}) rotate(${rng.range(-20, 20).toFixed(0)})"><g fill="#cc7a4a" opacity="0.85"><path d="M-0.6 0 Q-6 -5.5 -6.8 -2.1 Q-7.2 1.1 -0.6 0Z"/><path d="M0.6 0 Q6 -5.5 6.8 -2.1 Q7.2 1.1 0.6 0Z"/><path d="M-0.6 0.4 Q-4.6 5.1 -5.6 2.7 Q-6.1 0.4 -0.6 0.4Z"/><path d="M0.6 0.4 Q4.6 5.1 5.6 2.7 Q6.1 0.4 0.6 0.4Z"/></g><rect x="-0.5" y="-3.9" width="1" height="8" rx="0.5" fill="#4a3d2a"/></g>`;
    }
  } else if (persona === "tempest") {
    out += `<defs><linearGradient id="${uid}-w2storm" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="rgba(236,232,222,0.5)"/><stop offset="1" stop-color="rgba(74,82,100,0.55)"/></linearGradient><filter id="${uid}-w2sblur" x="-20%" y="-40%" width="140%" height="180%"><feGaussianBlur stdDeviation="4"/></filter><filter id="${uid}-w2bolt" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="2.4"/></filter><linearGradient id="${uid}-w2rain" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="rgba(253,246,232,0)"/><stop offset="0.4" stop-color="rgba(253,246,232,0.22)"/><stop offset="1" stop-color="rgba(253,246,232,0.02)"/></linearGradient></defs>`;
    let sheets = "";
    for (let k = 0; k < 16; k++) {
      const x = rng.next() * (w + 60) - 30;
      const top = h * rng.range(0.16, 0.26);
      const bottom = h * rng.range(0.6, 0.95);
      const lean = rng.range(-22, -12);
      const width = rng.range(5, 14);
      sheets += `<path d="M ${fx(x)} ${fx(top)} L ${fx(x + width)} ${fx(top)} L ${fx(x + width + lean)} ${fx(bottom)} L ${fx(x + lean)} ${fx(bottom)} Z" fill="url(#${uid}-w2rain)" opacity="${rng.range(0.4, 0.85).toFixed(2)}"/>`;
    }
    out += `<g filter="url(#${uid}-w2bolt)">${sheets}</g>`;
    const boltSide = rng.bool() ? 0.22 : 0.78;
    const clouds = [
      { x: w * boltSide, y: h * 0.19, s: 1.5 },
      { x: w * (boltSide < 0.5 ? 0.62 : 0.4), y: h * 0.12, s: 1.15 },
      { x: w * (boltSide < 0.5 ? 0.94 : 0.06), y: h * 0.22, s: 1 }
    ];
    const bx = clouds[0].x;
    const by = clouds[0].y + 10 * clouds[0].s;
    const bolt = `M ${fx(bx)} ${fx(by)} L ${fx(bx - 13)} ${fx(by + h * 0.16)} L ${fx(bx + 3)} ${fx(by + h * 0.17)} L ${fx(bx - 11)} ${fx(by + h * 0.37)}`;
    out += `<path d="${bolt}" stroke="rgba(255,244,200,0.55)" stroke-width="6" fill="none" stroke-linejoin="round" stroke-linecap="round" filter="url(#${uid}-w2bolt)"/><path d="${bolt}" stroke="#fff3cd" stroke-width="2" fill="none" stroke-linejoin="round" stroke-linecap="round"/>`;
    out += `<g filter="url(#${uid}-w2sblur)">`;
    for (const cloud of clouds) {
      out += cumulus(cloud.x, cloud.y, cloud.s, `url(#${uid}-w2storm)`, 0.9);
    }
    out += "</g>";
  } else if (persona === "endurance") {
    out += `<defs><linearGradient id="${uid}-w2glow" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="rgba(255,171,110,0)"/><stop offset="1" stop-color="rgba(255,171,110,0.4)"/></linearGradient><linearGradient id="${uid}-w2trail" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="rgba(255,243,214,0)"/><stop offset="1" stop-color="rgba(255,243,214,0.9)"/></linearGradient><filter id="${uid}-w2cblur" x="-20%" y="-60%" width="140%" height="220%"><feGaussianBlur stdDeviation="1.8"/></filter></defs>`;
    out += `<rect x="0" y="${fx(h * 0.62)}" width="${fx(w)}" height="${fx(h * 0.38)}" fill="url(#${uid}-w2glow)"/>`;
    out += starfield(w, h * 0.5, rng.fork("stars"), 26);
    const x1 = w * 0.88;
    const y1 = h * 0.16;
    const trail = `M ${fx(w * 0.1)} ${fx(h * 0.34)} Q ${fx(w * 0.52)} ${fx(h * 0.38)} ${fx(x1)} ${fx(y1)}`;
    out += `<path d="${trail}" stroke="url(#${uid}-w2trail)" stroke-width="7" fill="none" stroke-linecap="round" filter="url(#${uid}-w2cblur)"/>`;
    const sparks = rng.fork("sparks");
    for (let k = 0; k < 9; k++) {
      const t = 0.25 + sparks.next() * 0.68;
      const sx = w * 0.1 + (x1 - w * 0.1) * t + sparks.range(-8, 8);
      const sy = h * 0.34 + (y1 - h * 0.34) * t * t + sparks.range(2, 16);
      out += `<circle cx="${fx(sx)}" cy="${fx(sy)}" r="${sparks.range(0.7, 1.6).toFixed(1)}" fill="#ffe9bd" opacity="${sparks.range(0.3, 0.75).toFixed(2)}"/>`;
    }
    out += `<circle cx="${fx(x1)}" cy="${fx(y1)}" r="12" fill="rgba(255,243,214,0.35)"/><circle cx="${fx(x1)}" cy="${fx(y1)}" r="6.5" fill="#fff3d6"/>`;
  } else if (persona === "nightowl") {
    out += `<defs><radialGradient id="${uid}-w2mhalo"><stop offset="0" stop-color="rgba(246,236,210,0.5)"/><stop offset="0.5" stop-color="rgba(246,236,210,0.12)"/><stop offset="1" stop-color="rgba(246,236,210,0)"/></radialGradient></defs>`;
    out += starfield(w, h * 0.72, rng.fork("stars"), 52);
    const mx = w * 0.8;
    const my = h * 0.18;
    out += `<mask id="${uid}-w2moonm"><circle cx="${fx(mx)}" cy="${fx(my)}" r="17" fill="#ffffff"/><circle cx="${fx(mx - 6.5)}" cy="${fx(my - 3)}" r="15.2" fill="#000000"/></mask>`;
    out += `<circle cx="${fx(mx)}" cy="${fx(my)}" r="46" fill="url(#${uid}-w2mhalo)"/><circle cx="${fx(mx)}" cy="${fx(my)}" r="17" fill="#f6ecd2" mask="url(#${uid}-w2moonm)"/>`;
  } else {
    const cx = w * 0.78;
    const cy = h * 0.24;
    out += `<defs><filter id="${uid}-w2pearl" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="4"/></filter></defs>`;
    for (let i = 0; i < 7; i++) {
      const y = h * 0.1 + i * 13;
      out += `<line x1="0" y1="${fx(y)}" x2="${fx(w)}" y2="${fx(y)}" stroke="rgba(90,100,120,0.08)" stroke-width="1"/>`;
    }
    out += `<circle cx="${fx(cx)}" cy="${fx(cy)}" r="26" fill="none" stroke="rgba(120,110,90,0.12)" stroke-width="6" filter="url(#${uid}-w2pearl)"/>`;
    out += `<circle cx="${fx(cx)}" cy="${fx(cy)}" r="14" fill="#f6ecd2"/><circle cx="${fx(cx)}" cy="${fx(cy)}" r="20" fill="none" stroke="rgba(120,110,90,0.2)" stroke-width="1"/>`;
    for (let k = 0; k < 14; k++) {
      out += `<circle cx="${(rng.next() * w).toFixed(0)}" cy="${(rng.next() * h * 0.8).toFixed(0)}" r="${(0.7 + rng.next() * 1).toFixed(1)}" fill="rgba(255,252,242,0.8)" opacity="${(0.3 + rng.next() * 0.4).toFixed(2)}"/>`;
    }
  }
  return out;
}
const MAX_MEADOW_FLOWERS = 260;
function renderMeadow(summary, w, h, geo, rng, uid, sky, ground) {
  const hazeColor = sky.stops[sky.stops.length - 1][1];
  const shadeTint = ground.tint;
  const shaded = (c) => sky.shade ? mixHex(c, shadeTint, sky.shade) : c;
  const horizon = h * geo.horizon;
  const bandCount = geo.bands;
  const Z_NEAR = 6;
  const K = (h - horizon) * Z_NEAR;
  const FOCAL = K / 10;
  const zOf = (t) => Z_NEAR / Math.pow(Math.max(t, 1e-4), 1.55);
  const tOf = (z) => Math.pow(Z_NEAR / z, 1 / 1.55);
  const groundY = (t) => horizon + (h - horizon) * Math.pow(t, 1.55);
  const waveAmp = (t) => lerp(h * 0.02, h * 0.045, t);
  const waveVal = (u, t) => {
    const fr = 1.4 + t * bandCount * 0.5;
    const fr2 = 3.1 + t * bandCount;
    const phase = 1.7 * t * bandCount;
    return Math.sin(u * Math.PI * fr + phase) + Math.sin(u * Math.PI * fr2 + phase * 1.7) * 0.35;
  };
  const crestBase = (bi) => groundY(bi / bandCount) - (bi === 0 ? waveAmp(0) * 1.4 : 0);
  const crestYat = (bi, u) => bi >= bandCount ? h * 1.03 : crestBase(bi) + waveAmp(bi / bandCount) * waveVal(u, bi / bandCount);
  const HIDDEN_BEHIND_CREST = 1.28;
  const gauss = () => {
    const raw = Math.sqrt(-2 * Math.log(Math.max(1e-9, rng.next()))) * Math.cos(2 * Math.PI * rng.next());
    return clamp(raw, -2.5, 2.5);
  };
  const items = [];
  const mistTop = geo.gridY - 96;
  const zLo = clamp(K / Math.max(60, mistTop - horizon) * 0.85, Z_NEAR * 1.25, 60);
  const zHi = zOf(0.75 / bandCount);
  const stretches = Array.from({ length: bandCount }, (_, bi) => {
    const zFar = bi === 0 ? zHi : K / Math.max(1, crestBase(bi) - horizon);
    const zNear = bi === bandCount - 1 ? Z_NEAR : K / Math.max(1, crestBase(bi + 1) - horizon) * HIDDEN_BEHIND_CREST;
    return { zFar, zNear };
  });
  const stretchFor = (z) => {
    for (let bi = 0; bi < bandCount; bi++) {
      const stretch = stretches[bi];
      if (z >= stretch.zNear && z <= stretch.zFar) return bi;
    }
    return -1;
  };
  summary.days.forEach((day, d) => {
    const n = day.sessions.length;
    if (n === 0) return;
    const step = (zHi - zLo) / n;
    const ranked = [...day.sessions].sort(
      (a, b) => b.minutes + b.turns * 2 - (a.minutes + a.turns * 2)
    );
    ranked.forEach((session, i) => {
      const z = clamp(zLo + (i + 0.5) * step + gauss() * step, Z_NEAR * 1.05, zHi * 1.15);
      const laneX = ((d + 0.5) / 7 - 0.5) * w * z / FOCAL;
      const xw = laneX + gauss() * 0.9 * w / 7 / FOCAL * z;
      const cx = w / 2 + FOCAL * xw / z;
      if (cx < -w * 0.06 || cx > w * 1.06) return;
      const u = cx / w;
      const band = stretchFor(z);
      if (band >= 0) {
        const stretch = stretches[band];
        const p = (1 / z - 1 / stretch.zFar) / (1 / stretch.zNear - 1 / stretch.zFar);
        const rootY = lerp(crestYat(band, u), crestYat(band + 1, u), clamp(p, 0, 1)) + 2;
        items.push({
          session,
          band,
          z,
          t: tOf(z),
          cx,
          rootY,
          scale: Z_NEAR / z * 1.38 * geo.nearScale
        });
        return;
      }
      for (let bi = 0; bi < bandCount - 1; bi++) {
        const crestTopZ = stretches[bi + 1].zFar;
        const slopeBaseZ = stretches[bi].zNear;
        if (z <= crestTopZ || z >= slopeBaseZ) continue;
        items.push({
          session,
          band: bi,
          z,
          t: tOf(z),
          cx,
          rootY: crestYat(bi + 1, u) + 2,
          scale: Z_NEAR / z * 1.38 * geo.nearScale,
          farSide: (z - crestTopZ) / (slopeBaseZ - crestTopZ)
        });
        return;
      }
    });
  });
  items.sort((a, b) => a.band - b.band || b.z - a.z || a.cx - b.cx);
  const drawn = items.length > MAX_MEADOW_FLOWERS ? items.filter((_, i) => i % Math.ceil(items.length / MAX_MEADOW_FLOWERS) === 0) : items;
  const hillFor = (bi) => {
    let d = `M -10 ${fx(crestBase(bi) + waveAmp(bi / bandCount))}`;
    for (let i = 0; i <= 24; i++) {
      const x = i / 24 * w;
      d += ` L ${fx(x)} ${fx(crestYat(bi, x / w))}`;
    }
    return `${d} L ${fx(w + 10)} ${fx(h + 10)} L -10 ${fx(h + 10)} Z`;
  };
  const groundBandFill = (bi) => {
    const t0 = bi / bandCount;
    const crest = mixHex(
      mixHex(ground.far, ground.near, Math.pow(t0, 0.55)),
      hazeColor,
      Math.pow(1 - t0, 2.2) * 0.55
    );
    const lit = lighten(crest, 0.07);
    const valley = mixHex(mixHex(crest, ground.valley, 0.55), shadeTint, 0.08);
    const y1 = groundY(t0) - lerp(h * 0.02, h * 0.045, t0);
    const y2 = groundY(Math.min(1, (bi + 1.6) / bandCount));
    return `<linearGradient id="${uid}-hill${bi}" x1="0" y1="${fx(y1)}" x2="0" y2="${fx(y2)}" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="${lit}"/><stop offset="0.45" stop-color="${crest}"/><stop offset="1" stop-color="${valley}"/></linearGradient>`;
  };
  const crowns = /* @__PURE__ */ new Map();
  let out = "";
  let cursor = 0;
  for (let bi = 0; bi < bandCount; bi++) {
    out += groundBandFill(bi);
    out += `<path d="${hillFor(bi)}" fill="url(#${uid}-hill${bi})"/>`;
    let stems = "";
    const heads = [];
    while (cursor < drawn.length && drawn[cursor].band === bi) {
      const item = drawn[cursor++];
      const session = item.session;
      const rootY = item.rootY;
      const crown = meadowCrown(session.projectKey, crowns);
      const ds = item.scale;
      const r = (14 + Math.min(12, session.turns * 0.5)) * (w / 700) * ds;
      if (r < 1.1) continue;
      const scale = r / crown.headRadius;
      const height = Math.min(r * (1.9 + 1.3 * Math.log2(1 + session.minutes / 25)), r * 4.2);
      let sunkRootY = rootY;
      if (item.farSide !== void 0) {
        const sink = item.farSide * (height + r * 2.6);
        if (sink - height - r * 1.3 > 0) continue;
        sunkRootY = rootY + sink;
      }
      const sway = rng.range(-8, 8) * ds;
      const bx = item.cx + sway * 0.5;
      const rot = crown.hanging ? rng.range(-12, 12) : rng.range(-7, 7);
      const rad = rot * Math.PI / 180;
      const ax = crown.ax * scale;
      const ay = crown.ay * scale;
      const anchorDx = ax * Math.cos(rad) - ay * Math.sin(rad);
      const anchorDy = ax * Math.sin(rad) + ay * Math.cos(rad);
      const cy = sunkRootY - height - anchorDy;
      const ex = bx + anchorDx;
      const ey = cy + anchorDy;
      const green = shaded(mixHex(hueShift(STEM, -4 + bi * 2), hazeColor, (1 - item.t) * 0.5));
      const strokeW = Math.max(0.5, (1.5 + session.minutes / 120) * ds);
      stems += `<path data-meadow-stem="1" data-stem-height="${fx(height)}" d="M${fx(item.cx)} ${fx(sunkRootY)} C ${fx(item.cx + sway)} ${fx(sunkRootY - height * 0.45)}, ${fx(item.cx + sway * 0.4)} ${fx(ey + height * 0.25)}, ${fx(ex)} ${fx(ey)}" stroke="${green}" stroke-width="${strokeW.toFixed(2)}" fill="none" stroke-linecap="round"/>`;
      if (r > 7) {
        const ly = sunkRootY - height * rng.range(0.3, 0.5);
        const flip = rng.bool() ? 1 : -1;
        stems += `<g transform="translate(${fx(item.cx + sway * 0.4)},${fx(ly)}) rotate(${(flip * rng.range(38, 62)).toFixed(0)})">${renderLeaf(r * 0.55, r * 0.2, green)}</g>`;
      }
      heads.push(
        `<g transform="translate(${fx(bx)},${fx(cy)}) rotate(${fx(rot)}) scale(${scale.toFixed(3)})">${crown.svg}</g>`
      );
    }
    out += stems + heads.join("");
    if (bi < bandCount - 1) {
      const alpha = lerp(0.1, 0.025, bi / (bandCount - 1));
      const skyMist = sky.shade ? mixHex(hazeColor, sky.stops[Math.max(0, sky.stops.length - 2)][1], 0.55) : hazeColor;
      const mist = mixHex(skyMist, ground.tint, 0.45);
      out += `<linearGradient id="${uid}-haze${bi}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${mist}" stop-opacity="0"/><stop offset="0.4" stop-color="${mist}" stop-opacity="${alpha.toFixed(3)}"/><stop offset="1" stop-color="${mist}" stop-opacity="${(alpha * 0.55).toFixed(3)}"/></linearGradient>`;
      out += `<rect x="0" y="${fx(horizon - 4)}" width="${fx(w)}" height="${fx(h - horizon + 8)}" fill="url(#${uid}-haze${bi})"/>`;
    }
  }
  return out;
}
function teardrop(w, h, fill) {
  return `<path d="M0,${fx(-h)} C${fx(w)},${fx(-h * 0.78)} ${fx(w * 1.07)},${fx(-h * 0.28)} 0,0 C${fx(-w * 1.07)},${fx(-h * 0.28)} ${fx(-w)},${fx(-h * 0.78)} 0,${fx(-h)} Z" fill="${fill}"/>`;
}
function leafAt(x, y, rot, len, wid, fill) {
  return `<g transform="translate(${fx(x)},${fx(y)}) rotate(${fx(rot)})">${renderLeaf(len, wid, fill)}</g>`;
}
function stemAt(d, sw) {
  return `<path d="${d}" fill="none" stroke="${STEM}" stroke-width="${fx(sw)}" stroke-linecap="round"/>`;
}
function bloomAt(id, tipX, tipY, targetR, rot) {
  const crown = badgeCrown(id);
  let r = targetR;
  let y = tipY;
  if (crown.hanging) {
    r = targetR * 0.86;
    y = tipY - r * 0.95;
  }
  const s = r / crown.headRadius;
  const rad = rot * Math.PI / 180;
  const ax = crown.ax * s;
  const ay = crown.ay * s;
  const px = tipX - (ax * Math.cos(rad) - ay * Math.sin(rad));
  const py = y - (ax * Math.sin(rad) + ay * Math.cos(rad));
  return `<g transform="translate(${fx(px)},${fx(py)}) rotate(${fx(rot)}) scale(${s.toFixed(4)})">${crown.svg}</g>`;
}
function unit(ctx, x, y, r, inner) {
  return `<g data-bloom="1" data-badge="${ctx.badgeId}" data-level="${ctx.level}" data-bx="${fx(x)}" data-by="${fx(y)}" data-br="${fx(r)}">${inner}</g>`;
}
const CLUMPS = {
  2: [
    { x: -4.3, y: -3.4, r: 6.4, rot: -10, base: -1.7, sw: 1.6 },
    { x: 4.6, y: -0.6, r: 5.6, rot: 12, base: 1.5, sw: 1.4 }
  ],
  3: [
    { x: 0.2, y: -5, r: 5.6, rot: 1, base: 0, sw: 1.5 },
    { x: -5.6, y: -1.2, r: 5, rot: -16, base: -2, sw: 1.35 },
    { x: 5.8, y: -0.2, r: 4.6, rot: 15, base: 1.9, sw: 1.3 }
  ],
  5: [
    { x: 0.4, y: -6, r: 4.4, rot: 2, base: 0, sw: 1.4 },
    { x: -3.8, y: -2.6, r: 4.2, rot: -9, base: -1.3, sw: 1.25 },
    { x: 4.4, y: -2, r: 4, rot: 11, base: 1.4, sw: 1.25 },
    { x: -7.4, y: 1.4, r: 3.6, rot: -22, base: -2.7, sw: 1.1 },
    { x: 7.6, y: 1.6, r: 3.4, rot: 20, base: 2.8, sw: 1.1 }
  ]
};
function clumpSvg(ctx, count) {
  const specs = CLUMPS[count] ?? CLUMPS[5];
  const rng = createRng(`wrapped:clump:${ctx.badgeId}:${count}`);
  let s = leafAt(-4.6, 9.2, -66, 5.2, 1.8, LEAF_LIGHT) + leafAt(4.6, 9.2, 66, 5.2, 1.8, LEAF);
  specs.forEach((sp, i) => {
    const r = sp.r * (1 + rng.range(-0.06, 0.06));
    const rot = sp.rot + rng.range(-6, 6);
    s += stemAt(
      `M${fx(sp.base)},9.6 C${fx(sp.base)},${fx(6.4 + i * 0.2)} ${fx(sp.x * 0.72)},${fx(sp.y + 3.4)} ${fx(sp.x)},${fx(sp.y)}`,
      sp.sw
    );
    if (i < 3) {
      s += leafAt(
        sp.base + (sp.x < 0 ? -0.5 : 0.5),
        6.2 + i * 0.5,
        sp.x < 0 ? -48 : 48,
        4.6 - i * 0.4,
        1.8,
        i % 2 ? LEAF : LEAF_LIGHT
      );
    }
    s += unit(ctx, sp.x, sp.y, r, bloomAt(ctx.badgeId, sp.x, sp.y, r, rot));
  });
  return s;
}
function plantSvg(ctx) {
  const id = ctx.badgeId;
  const stage = ctx.level;
  const hue = HUES[id];
  const grad = `url(#${ctx.uid}-p-${id})`;
  let s = "";
  if (stage === 1) {
    s += stemAt("M0,9.6 C0,7.9 0.2,6.4 0,5", 1.5);
    s += unit(
      ctx,
      0,
      5.1,
      3.5,
      leafAt(0, 5.1, -50, 7, 2.6, LEAF_LIGHT) + leafAt(0.2, 5.1, 46, 6.2, 2.3, LEAF)
    );
  } else if (stage === 2) {
    s += stemAt("M0,9.6 C-0.3,6.6 0.3,3.4 0,1", 1.6);
    s += unit(
      ctx,
      0,
      3.5,
      4,
      leafAt(-0.1, 6.4, -48, 6.8, 2.4, LEAF_LIGHT) + leafAt(0.3, 3.8, 44, 6, 2.2, LEAF) + leafAt(0, 1.2, -10, 5.6, 2.1, LEAF_LIGHT)
    );
  } else if (stage === 3) {
    s += stemAt("M0,9.6 C0,6.6 0.25,1.6 0,-1.1", 1.6);
    s += leafAt(-0.1, 6.6, -46, 6.4, 2.3, LEAF_LIGHT);
    s += leafAt(0.3, 4, 46, 5.8, 2.1, LEAF);
    s += unit(
      ctx,
      0,
      -4.5,
      3.8,
      `<g transform="translate(0,-1.1)">${teardrop(2.7, 7.6, grad)}</g>` + leafAt(-1, -0.8, -32, 3.6, 1.4, LEAF) + leafAt(1, -0.8, 32, 3.6, 1.4, LEAF)
    );
  } else if (stage === 4) {
    s += stemAt("M0,9.6 C0,6.6 0.25,1.6 0,-1.4", 1.6);
    s += leafAt(-0.1, 6.6, -46, 6.4, 2.3, LEAF_LIGHT);
    s += leafAt(0.3, 4, 46, 5.8, 2.1, LEAF);
    s += unit(
      ctx,
      0,
      -4.8,
      4.2,
      `<g transform="translate(-1,-1.4) rotate(-12)">${teardrop(1.9, 8, grad)}</g><g transform="translate(1,-1.4) rotate(12)">${teardrop(1.9, 8, lighten(hue, 0.1))}</g><path d="M-3.1,-1.4 C-2.5,1.4 2.5,1.4 3.1,-1.4 C1.6,0.3 -1.6,0.3 -3.1,-1.4 Z" fill="${LEAF}"/>` + leafAt(-1.6, -0.4, -42, 4, 1.6, LEAF) + leafAt(1.6, -0.4, 42, 4, 1.6, LEAF)
    );
  } else if (stage === 5) {
    s += stemAt("M0,9.6 C0,6.4 -1.2,1.4 -1.6,-1.6", 1.7);
    s += leafAt(-0.2, 6.6, -46, 6.6, 2.4, LEAF_LIGHT);
    s += leafAt(0.4, 4, 46, 5.8, 2.1, LEAF);
    s += unit(ctx, -1.6, -1.6, 5.2, bloomAt(id, -1.6, -1.6, 5.2, -12));
    s += leafAt(-2.9, 0.4, -56, 4.8, 1.9, LEAF);
    s += leafAt(-0.3, 0.4, 56, 4.8, 1.9, LEAF);
  } else if (stage === 6) {
    s += stemAt("M0,9.6 C0,6.2 0,0.6 0,-3", 1.8);
    s += leafAt(-0.2, 6.8, -46, 7, 2.5, LEAF_LIGHT);
    s += leafAt(0.4, 4, 48, 6, 2.2, LEAF);
    s += unit(ctx, 0, -3, 8.6, bloomAt(id, 0, -3, 8.6, 0));
  } else if (stage === 7) {
    s += stemAt("M0,9.6 C-0.6,6.2 -1.2,0.8 -1.4,-2.6", 1.8);
    s += leafAt(-0.9, 6.8, -48, 6.8, 2.5, LEAF_LIGHT);
    s += `<path d="M-0.4,4.4 C2.4,3 5,0.8 6.4,-1.6" fill="none" stroke="${STEM}" stroke-width="1.3" stroke-linecap="round"/>`;
    s += leafAt(2.8, 2.4, 62, 4.4, 1.7, LEAF);
    s += `<g transform="translate(6.4,-1.9) rotate(16)">${teardrop(1.9, 5.2, grad)}</g>`;
    s += leafAt(5.9, -1.5, -20, 2.8, 1.2, LEAF);
    s += unit(ctx, -1.4, -2.6, 8.2, bloomAt(id, -1.4, -2.6, 8.2, -4));
    s += `<ellipse cx="-6.6" cy="10.6" rx="2.6" ry="1.2" transform="rotate(-16 -6.6 10.6)" fill="${hue}" opacity="0.9"/>`;
  } else if (stage === 8) {
    s += clumpSvg(ctx, 2);
  } else if (stage === 9) {
    s += clumpSvg(ctx, 3);
  } else {
    s += clumpSvg(ctx, 5);
  }
  return `<g data-stage="${stage}">${s}</g>`;
}
function vignetteSvg(ctx) {
  const hue = HUES[ctx.badgeId];
  const stage = ctx.level;
  const clipId = `${ctx.uid}-c-${ctx.badgeId}${ctx.key}`;
  const tint = 0.095 + stage * 0.0155;
  const edge = 0.24 + stage * 0.021;
  let out = "";
  if (ctx.halo) {
    out += `<circle r="19.8" fill="none" stroke="${mixHex(DISC_BASE, hue, 0.38)}" stroke-width="3"/>`;
  }
  out += `<circle r="16.5" fill="${mixHex(DISC_BASE, hue, tint)}" stroke="${mixHex(DISC_BASE, hue, edge)}" stroke-width="1"${` filter="url(#${ctx.uid}-lift)"`}/>`;
  out += `<defs><clipPath id="${clipId}"><circle r="${CLIP_R}"/></clipPath></defs>`;
  out += `<g clip-path="url(#${clipId})">`;
  out += `<path d="M-14,18.5 Q-11,9.9 0,8.7 Q11,9.9 14,18.5 Z" fill="${EARTH}"/>`;
  out += `<path d="M-14,18.5 Q-6,13.4 0,13.2 Q6,13.4 14,18.5 Z" fill="${EARTH_DARK}" opacity=".55"/>`;
  out += plantSvg(ctx);
  out += "</g>";
  out += '<circle r="15.6" fill="none" stroke="rgba(255,255,255,0.5)" stroke-width="1"/>';
  return out;
}
function estWidth(text, fs, factor) {
  return text.length * fs * factor;
}
function estCaps(text, fs, ls) {
  return text.length * (fs * 0.64 + fs * ls);
}
function wrapCaps(name, fs, avail) {
  const t = name.toUpperCase();
  if (estCaps(t, fs, 0.08) <= avail || !t.includes(" ")) return [t];
  let best = -1;
  let bestDistance = Number.POSITIVE_INFINITY;
  for (let i = 0; i < t.length; i++) {
    if (t[i] === " ") {
      const d = Math.abs(i - t.length / 2);
      if (d < bestDistance) {
        bestDistance = d;
        best = i;
      }
    }
  }
  if (best < 0) return [t];
  return [t.slice(0, best), t.slice(best + 1)];
}
function fitValue(text, base, avail, floor) {
  if (estWidth(text, base, 0.53) <= avail) return { fs: base, tl: 0 };
  const fs = Math.max(floor, Math.min(base, Math.floor(avail / (text.length * 0.53) * 2) / 2));
  return { fs, tl: estWidth(text, fs, 0.53) > avail ? avail : 0 };
}
const TILE_KINDS = {
  feature: { pad: 22, sc: 4.5, valFs: 44, nameFs: 13, gapV: 16, rx: 26 },
  feature11: { pad: 18, sc: 3.7, valFs: 34, nameFs: 12, gapV: 13, rx: 22 },
  narrow: { pad: 10, sc: 1.62, valFs: 25, nameFs: 11, gapV: 9, rx: 18 },
  narrow11: { pad: 9, sc: 1.3, valFs: 24, nameFs: 11, gapV: 8, rx: 16 },
  wide: { pad: 14, sc: 1.78, valFs: 27, nameFs: 11.5, gapV: 10, rx: 18 },
  wide11: { pad: 12, sc: 1.45, valFs: 25, nameFs: 11, gapV: 9, rx: 16 },
  // Bento 2, stat-first: the number leads, the label sits under it, and the
  // disc keeps to the right. The winner gets a full-width banner.
  // (Bento 3 is the meadow chart and draws itself in renderBentoChart.)
  stat: { pad: 14, sc: 0.92, valFs: 31, nameFs: 10.5, gapV: 7, rx: 18 },
  stat11: { pad: 11, sc: 0.78, valFs: 24, nameFs: 10, gapV: 6, rx: 16 },
  statWin: { pad: 22, sc: 2.2, valFs: 54, nameFs: 12.5, gapV: 9, rx: 22 },
  statWin11: { pad: 16, sc: 1.7, valFs: 38, nameFs: 11, gapV: 7, rx: 18 }
};
function renderTile(badge, x, y, w, h, o) {
  const z = TILE_KINDS[o.kind];
  const hue = HUES[badge.id];
  const level = clamp(Math.round(badge.level), 1, 10);
  const hueInk = lighten(hue, -0.3);
  const wash = 0.15 + 0.016 * level + (o.winner ? 0.06 : 0);
  const bg = mixHex(TILE_BG, hue, wash);
  const alpha = o.winner ? 0.68 : 0.6;
  const valueColor = level >= 8 || o.winner ? hueInk : INK;
  const halo = level >= 8 || o.winner;
  let out = `<g data-badge="${badge.id}" data-level="${level}" data-blooms="${badge.blooms}" data-win="${o.winner ? 1 : 0}" data-kind="${o.kind}">`;
  out += `<title>${esc(badge.name)}: ${esc(badge.display)} (level ${level} of 10)</title>`;
  out += `<rect x="${fx(x)}" y="${fx(y)}" width="${fx(w)}" height="${fx(h)}" rx="${z.rx}" fill="${bg}" fill-opacity="${alpha}" stroke="rgba(255,255,255,0.5)" stroke-width="1"/>`;
  if (o.winner) {
    out += `<rect x="${fx(x - 1.5)}" y="${fx(y - 1.5)}" width="${fx(w + 3)}" height="${fx(h + 3)}" rx="${z.rx + 1.5}" fill="none" stroke="${hue}" stroke-opacity="0.26" stroke-width="3"/>`;
  }
  out += `<rect x="${fx(x + 1)}" y="${fx(y + 1)}" width="${fx(w - 2)}" height="${fx(h - 2)}" rx="${z.rx - 1}" fill="none" stroke="rgba(255,255,255,0.35)" stroke-width="1"/>`;
  const nameLineHeight = z.nameFs + 3;
  const nameColor = o.winner ? lighten(hue, -0.4) : INK_SOFT;
  const dia = 2 * 19.8 * z.sc;
  const avail = w - 2 * z.pad;
  const fit = fitValue(badge.display, z.valFs, avail, Math.min(24, z.valFs));
  const lines = wrapCaps(badge.name, z.nameFs, avail);
  const blockH = dia + z.gapV + fit.fs * 0.95 + lines.length * nameLineHeight;
  const top = y + (h - blockH) / 2;
  const cx = x + w / 2;
  const cy = top + dia / 2;
  out += `<g transform="translate(${fx(cx)},${fx(cy)}) scale(${z.sc.toFixed(3)})">`;
  out += vignetteSvg({ uid: o.uid, key: o.key, halo, badgeId: badge.id, level });
  out += "</g>";
  const valueY = top + dia + z.gapV + fit.fs * 0.78;
  out += `<text x="${fx(cx)}" y="${fx(valueY)}" text-anchor="middle" font-family="${GELICA}" font-weight="500" font-size="${fit.fs}" letter-spacing="-.02em"${fit.tl ? ` textLength="${fx(fit.tl)}" lengthAdjust="spacingAndGlyphs"` : ""} style="font-variant-numeric:tabular-nums" fill="${valueColor}">${esc(badge.display)}</text>`;
  lines.forEach((line, i) => {
    out += `<text x="${fx(cx)}" y="${fx(valueY + z.gapV * 0.5 + z.nameFs + i * nameLineHeight)}" text-anchor="middle" font-family="${SNPRO}" font-weight="700" font-size="${z.nameFs}" letter-spacing=".08em" fill="${nameColor}">${esc(line)}</text>`;
  });
  out += "</g>";
  return out;
}
const CARD_WIDTH = 700;
const GEOMETRY = {
  // 700 x 1244 is the 1080 x 1920 ratio.
  portrait: {
    h: 1244,
    horizon: 0.37,
    nearScale: 1.7,
    bands: 7,
    lockF: 44,
    lockX: 30,
    lockY: 26,
    urlFs: 11,
    rangeY: 44,
    rangeFs: 15.5,
    kickerY: 178,
    kickerFs: 16,
    numY: 302,
    numFs: 114,
    subY: 354,
    subFs: 21,
    // gridY leaves a bottom margin close to the side margin: with the wordmark
    // moved up top, nothing sits under the last row of tiles.
    gridX: 22,
    gap: 12,
    gridY: 736,
    rowH: 148,
    feature: "feature",
    narrow: "narrow",
    wide: "wide"
  },
  square: {
    h: 700,
    horizon: 0.36,
    nearScale: 1.45,
    bands: 6,
    lockF: 36,
    lockX: 26,
    lockY: 22,
    urlFs: 9.5,
    rangeY: 34,
    rangeFs: 13,
    kickerY: 92,
    kickerFs: 13,
    numY: 168,
    numFs: 70,
    subY: 206,
    subFs: 16,
    gridX: 20,
    gap: 10,
    gridY: 285,
    rowH: 124,
    feature: "feature11",
    narrow: "narrow11",
    wide: "wide11"
  }
};
function cardDefs(uid, sky, horizonY) {
  let d = "<defs>";
  for (const id of BADGE_IDS) {
    const hue = HUES[id];
    d += `<linearGradient id="${uid}-p-${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${lighten(hue, 0.16)}"/><stop offset="0.55" stop-color="${hue}"/><stop offset="1" stop-color="${lighten(hue, -0.12)}"/></linearGradient>`;
  }
  d += `<linearGradient id="${uid}-sky" x1="0" y1="0" x2="0" y2="${fx(horizonY * 1.2)}" gradientUnits="userSpaceOnUse" spreadMethod="pad">` + sky.stops.map(([p, c]) => `<stop offset="${p}" stop-color="${c}"/>`).join("") + "</linearGradient>";
  d += `<linearGradient id="${uid}-comet" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#ffecc8" stop-opacity="0"/><stop offset="1" stop-color="#ffecc8" stop-opacity="0.9"/></linearGradient>`;
  d += `<filter id="${uid}-tile" x="-25%" y="-25%" width="150%" height="150%"><feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#3d2f16" flood-opacity="0.2"/></filter>`;
  d += `<filter id="${uid}-lift" x="-45%" y="-45%" width="190%" height="190%"><feDropShadow dx="0" dy="2.2" stdDeviation="2.6" flood-color="#3d2f16" flood-opacity="0.22"/></filter>`;
  return `${d}</defs>`;
}
function renderLockup(persona, geo, ink, flowerId) {
  const frame = geo.lockF;
  const crown = badgeCrown(persona);
  const markScale = frame * 0.3 / crown.headRadius;
  const mx = geo.lockX + frame * 0.4;
  const my = geo.lockY + frame * 0.5;
  const fontSize = frame * 0.52447398;
  let out = `<g data-blume-mark="1" data-flower="${esc(flowerId ?? "")}" data-mark-x="${fx(geo.lockX)}" data-mark-y="${fx(geo.lockY)}" data-mark-size="${fx(frame)}"><g transform="translate(${fx(mx)},${fx(my)}) scale(${markScale.toFixed(4)})">${crown.svg}</g></g><!--/blume-mark-->`;
  out += `<text x="${fx(geo.lockX + frame * 0.82244762)}" y="${fx(geo.lockY + frame * 0.25886423 + fontSize * 0.8)}" font-family="${SNPRO}" font-weight="400" font-size="${fx(fontSize)}" letter-spacing="-.01em" fill="${ink}">blume</text>`;
  return out;
}
function renderWrappedCardSvg(summary, options = {}) {
  const format = options.format === "square" ? "square" : "portrait";
  const geo = GEOMETRY[format];
  const w = CARD_WIDTH;
  const h = geo.h;
  const sky = SKIES[summary.persona] ?? SKIES.hours;
  const ground = GROUNDS[summary.persona] ?? GROUNDS.hours;
  const ink = sky.ink;
  const uid = `wr-${summary.period.periodStart.replace(/[^0-9a-zA-Z-]/g, "")}-${format}`;
  const rng = createRng(`wrapped:${summary.period.periodStart}:${summary.persona}:${format}`);
  const pixelWidth = options.width && options.width > 0 ? options.width : w;
  const pixelHeight = Math.round(pixelWidth * h / w);
  let out = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${pixelWidth}" height="${pixelHeight}" role="img" aria-label="Blume Wrapped, ${esc(summary.rangeLabel)}">`;
  out += cardDefs(uid, sky, h * geo.horizon);
  const horizon = h * geo.horizon;
  let scene = "";
  scene += `<rect width="${w}" height="${h}" fill="url(#${uid}-sky)"/>`;
  scene += `<g data-layer="weather">${renderWeather(summary.persona, w, horizon, rng.fork("weather"), uid)}</g>`;
  scene += `<g data-layer="meadow">${renderMeadow(summary, w, h, geo, rng.fork("meadow"), uid, sky, ground)}</g>`;
  scene += `<g data-layer="brand">${renderLockup(summary.persona, geo, ink, summary.flowerId)}</g>`;
  scene += `<text x="${w - 32}" y="${fx(geo.rangeY + 8)}" text-anchor="end" font-family="${SNPRO}" font-weight="700" font-size="${geo.rangeFs}" letter-spacing=".18em" fill="${ink}" opacity="0.88">${esc(summary.rangeLabel.toUpperCase())}</text>`;
  out += scene;
  const heroValue = summary.hero.value;
  const heroUnit = summary.hero.unit ? ` ${summary.hero.unit}` : "";
  const heroFit = fitValue(heroValue + heroUnit, geo.numFs, w - 76, Math.round(geo.numFs * 0.45));
  const smallFs = Math.round(heroFit.fs * 0.55);
  out += `<g data-layer="hero">`;
  out += `<text x="${w / 2}" y="${geo.kickerY}" text-anchor="middle" font-family="${SNPRO}" font-weight="700" font-size="${geo.kickerFs}" letter-spacing=".22em" fill="${ink}" opacity="0.88">${esc(summary.hero.kicker.toUpperCase())}</text>`;
  out += `<text x="${w / 2}" y="${geo.numY}" text-anchor="middle" font-family="${GELICA}" font-weight="500" font-size="${heroFit.fs}" letter-spacing="-.02em" fill="${ink}">${esc(heroValue)}`;
  if (summary.hero.unit) {
    out += `<tspan font-size="${smallFs}" font-weight="500"> ${esc(summary.hero.unit)}</tspan>`;
  }
  out += "</text>";
  out += `<text x="${w / 2}" y="${geo.subY}" text-anchor="middle" font-family="${SNPRO}" font-weight="400" font-size="${geo.subFs}" fill="${ink}" opacity="0.92">${esc(summary.hero.detail)}</text>`;
  out += "</g>";
  const byId = /* @__PURE__ */ new Map();
  for (const badge of summary.badges) byId.set(badge.id, badge);
  const winner = byId.get(summary.persona) ?? summary.badges[0];
  const rest = summary.badges.filter((badge) => badge.id !== winner?.id).slice().sort((a, b) => b.level - a.level || summary.badges.indexOf(a) - summary.badges.indexOf(b));
  const colW = (w - 2 * geo.gridX - 3 * geo.gap) / 4;
  const rowY = [geo.gridY, geo.gridY + geo.rowH + geo.gap, geo.gridY + 2 * (geo.rowH + geo.gap)];
  const colX = [0, 1, 2, 3].map((i) => geo.gridX + i * (colW + geo.gap));
  let key = 0;
  const mistTop = geo.gridY - 96;
  const mistH = h - mistTop;
  out += `<defs><clipPath id="${uid}-glassclip"><rect x="0" y="${fx(mistTop)}" width="${w}" height="${fx(mistH)}"/></clipPath><filter id="${uid}-glassblur" x="-5%" y="-5%" width="110%" height="110%"><feGaussianBlur stdDeviation="12"/><feColorMatrix type="saturate" values="1.15"/></filter><linearGradient id="${uid}-glassfade" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff" stop-opacity="0"/><stop offset="0.3" stop-color="#ffffff" stop-opacity="0.7"/><stop offset="0.55" stop-color="#ffffff" stop-opacity="0.88"/><stop offset="1" stop-color="#ffffff" stop-opacity="0.88"/></linearGradient><mask id="${uid}-glassmask"><rect x="0" y="${fx(mistTop)}" width="${w}" height="${fx(mistH)}" fill="url(#${uid}-glassfade)"/></mask></defs>`;
  out += `<g data-layer="glass" clip-path="url(#${uid}-glassclip)" mask="url(#${uid}-glassmask)"><g filter="url(#${uid}-glassblur)">${scene.replaceAll(`${uid}-`, `${uid}-g-`)}</g><rect x="0" y="${fx(mistTop)}" width="${w}" height="${fx(mistH)}" fill="#ffffff" fill-opacity="0.16"/><rect x="0" y="${fx(mistTop)}" width="${w}" height="${fx(mistH)}" fill="#fdf7eb" fill-opacity="0.08"/></g>`;
  out += '<g data-layer="bento">';
  if (winner) {
    out += renderTile(winner, colX[0], rowY[0], colW * 2 + geo.gap, geo.rowH * 2 + geo.gap, {
      uid,
      kind: geo.feature,
      winner: true,
      key: `t${key++}`
    });
  }
  const cells = [
    [2, 0],
    [3, 0],
    [2, 1],
    [3, 1]
  ];
  cells.forEach((cell, i) => {
    const badge = rest[i];
    if (!badge) return;
    out += renderTile(badge, colX[cell[0]], rowY[cell[1]], colW, geo.rowH, {
      uid,
      kind: geo.narrow,
      winner: false,
      key: `t${key++}`
    });
  });
  const wideW = (w - 2 * geo.gridX - 2 * geo.gap) / 3;
  for (let i = 0; i < 3; i++) {
    const badge = rest[4 + i];
    if (!badge) continue;
    out += renderTile(badge, geo.gridX + i * (wideW + geo.gap), rowY[2], wideW, geo.rowH, {
      uid,
      kind: geo.wide,
      winner: false,
      key: `t${key++}`
    });
  }
  out += "</g>";
  const gridBottom = rowY[2] + geo.rowH;
  out += `<text x="${fx(w - geo.gridX)}" y="${fx(gridBottom + (h - gridBottom) / 2 + geo.urlFs * 0.36)}" text-anchor="end" font-family="${SNPRO}" font-weight="600" font-size="${geo.urlFs}" letter-spacing=".06em" fill="${INK_SOFT}" opacity="0.55">blume.codes</text>`;
  out += "</svg>";
  return out;
}
const parentPort = process.parentPort;
const WRAPPED_GENERATE_WORKER_HEARTBEAT_INTERVAL_MS = 1e4;
let storageHandle = null;
let storagePath = null;
let busy = false;
let activeRequestId = null;
let activeAbortController = null;
function post(message) {
  parentPort?.postMessage(message);
}
function serializeError(id, error) {
  const err = error instanceof Error ? error : new Error(String(error));
  return {
    type: "worker-error",
    id,
    ok: false,
    errorMessage: err.message,
    errorName: err.name,
    errorStack: err.stack
  };
}
function getStorageHandle(dbPath) {
  if (storageHandle && storagePath === dbPath) return storageHandle;
  storageHandle?.close();
  storageHandle = sqliteStorage.openDesktopSqliteStorage(dbPath);
  storagePath = dbPath;
  return storageHandle;
}
function readSummary(outcome) {
  if (!outcome?.record) return null;
  try {
    return JSON.parse(outcome.record.summary_json);
  } catch {
    return null;
  }
}
function cardBytesFor(summary) {
  if (!summary) return 0;
  try {
    return renderWrappedCardSvg(summary).length;
  } catch {
    return 0;
  }
}
function badgeValuesFor(outcome, summary) {
  if (!outcome?.record || outcome.record.period_kind !== "weekly") return null;
  const badges = summary?.badges;
  if (!Array.isArray(badges)) return null;
  const values = {};
  for (const badge of badges) {
    if (typeof badge?.id !== "string" || typeof badge.value !== "number") continue;
    if (!Number.isFinite(badge.value)) continue;
    values[badge.id] = badge.value;
  }
  return Object.keys(values).length > 0 ? values : null;
}
async function generate(request) {
  const startedAtMs = Date.now();
  const { storage } = getStorageHandle(request.dbPath);
  const useCases$1 = useCases.createWrappedUseCases({
    store: storage.wrapped,
    settings: storage.settings,
    now: () => request.nowMs,
    accountUserId: async () => request.accountUserId,
    // The curve arrives already resolved: this process has no analytics
    // credentials and makes no network calls. Contribution is main's job,
    // driven by the badge values posted back below.
    cohort: {
      load: async () => request.cohort,
      contribute: async () => {
      }
    }
  });
  const outcome = request.mode === "rolling" ? await useCases$1.generateLastSevenDays() : request.mode === "launch-recap" ? await useCases$1.runLaunchRecapIfDue(true) : request.mode === "archive-week" ? await useCases$1.generateArchiveWeek(request.periodStart) : await useCases$1.runWeeklyIfDue(request.lastRunMs, request.lastPeriodStart);
  const summary = readSummary(outcome);
  const attemptedPeriodStart = outcome === null ? null : outcome.record?.period_start ?? (request.mode === "weekly-if-due" || request.mode === "launch-recap" ? useCases.previousWeekPeriod(request.nowMs).periodStart : request.mode === "archive-week" ? request.periodStart : null);
  post({
    type: "generate-result",
    id: request.id,
    ok: true,
    status: outcome?.status ?? "skipped",
    wrappedId: outcome?.record?.id ?? null,
    periodStart: attemptedPeriodStart,
    sessionCount: typeof summary?.sessionCount === "number" ? summary.sessionCount : 0,
    cardBytes: cardBytesFor(summary),
    durationMs: Date.now() - startedAtMs,
    badgeValues: badgeValuesFor(outcome, summary)
  });
}
async function listAvailableWeeks(request, signal) {
  const { storage } = getStorageHandle(request.dbPath);
  const useCases$1 = useCases.createWrappedUseCases({
    store: storage.wrapped,
    settings: storage.settings,
    now: () => request.nowMs,
    accountUserId: async () => null
  });
  const page = await useCases$1.listAvailableWeeks(request.limit, request.beforePeriodStart, signal);
  post({ type: "available-weeks-result", id: request.id, ok: true, page });
}
async function handleMessage(message) {
  if (message.type === "cancel") {
    if (activeRequestId === message.id) activeAbortController?.abort();
    return;
  }
  if (busy) {
    post(serializeError(message.id, new Error("wrapped generation already in flight")));
    return;
  }
  busy = true;
  activeRequestId = message.id;
  activeAbortController = message.type === "list-available-weeks" ? new AbortController() : null;
  const heartbeat = setInterval(() => {
    post({ type: "heartbeat", id: message.id });
  }, WRAPPED_GENERATE_WORKER_HEARTBEAT_INTERVAL_MS);
  try {
    if (message.type === "list-available-weeks") {
      await listAvailableWeeks(message, activeAbortController.signal);
    } else await generate(message);
  } catch (error) {
    post(serializeError(message.id, error));
  } finally {
    clearInterval(heartbeat);
    activeRequestId = null;
    activeAbortController = null;
    busy = false;
  }
}
parentPort?.on("message", (event) => {
  void handleMessage(event.data);
});
exports.WRAPPED_GENERATE_WORKER_HEARTBEAT_INTERVAL_MS = WRAPPED_GENERATE_WORKER_HEARTBEAT_INTERVAL_MS;
//# sourceMappingURL=wrappedGenerateWorker.js.map

//# debugId=781337d3-7031-5a91-9751-40738d8270ba
