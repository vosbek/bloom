"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="5fc3d977-6531-5f95-9bfa-a0027acafbc8")}catch(e){}}();

const GLOBAL_SEARCH_CATEGORIES = [
  "conversations",
  "messages",
  "projects",
  "setup",
  "suggestions",
  "commits"
];
const DEFAULT_GLOBAL_SEARCH_LIMIT = 40;
const MAX_GLOBAL_SEARCH_LIMIT = 100;
const MAX_GLOBAL_SEARCH_SCOPE_IDS = 200;
function normalizeGlobalSearchLimit(limit) {
  const requested = limit ?? DEFAULT_GLOBAL_SEARCH_LIMIT;
  if (!Number.isFinite(requested)) return DEFAULT_GLOBAL_SEARCH_LIMIT;
  return Math.max(1, Math.min(MAX_GLOBAL_SEARCH_LIMIT, Math.trunc(requested)));
}
const WRAPPED_DEFAULT_IDLE_GAP_MS = 5 * 6e4;
const DELIVERY_PHASES = ["Start", "Plan", "Build", "Test", "Review", "Merge", "Release", "Done"];
const PHASE = {
  start: "Start",
  plan: "Plan",
  build: "Build",
  test: "Test",
  outcome: "Review",
  code: "Merge",
  release: "Release",
  done: "Done"
};
const PHASES = {
  [PHASE.start]: { role: "start", name: "Start", stage: "intake", endsWhen: "the outcome is agreed" },
  [PHASE.plan]: { role: "plan", name: "Plan", stage: "work", endsWhen: "the plan is set" },
  [PHASE.build]: { role: "build", name: "Build", stage: "work", endsWhen: "the work is built" },
  [PHASE.test]: { role: "test", name: "Test", stage: "work", endsWhen: "the delivery suite passes" },
  [PHASE.outcome]: { role: "outcome", name: "Review", step: "Outcome review", stage: "review", endsWhen: "the result is accepted" },
  [PHASE.code]: { role: "code", name: "Review", step: "Merge review", stage: "review", endsWhen: "every pull request is merged" },
  [PHASE.release]: { role: "release", name: "Release", stage: "review", endsWhen: "every application is live" },
  [PHASE.done]: { role: "done", name: "Done", stage: "end", endsWhen: "nothing; the delivery is complete" }
};
const SHOWN_PHASES = DELIVERY_PHASES.filter((phase) => phase !== PHASE.code);
const PHASE_CHOICES = [
  ...SHOWN_PHASES.map((phase) => PHASES[phase].name),
  PHASES[PHASE.code].step
];
DELIVERY_PHASES[0];
const LEGACY_DELIVERY_PHASES = {
  Learn: PHASE.plan,
  Ready: PHASE.code,
  Deploy: PHASE.release,
  Live: PHASE.done
};
function deliveryPhase(value) {
  if (typeof value !== "string") return null;
  if (DELIVERY_PHASES.includes(value)) return value;
  return LEGACY_DELIVERY_PHASES[value] ?? null;
}
const BRIEF_SLOTS = ["what-changes", "user-impact", "proof-plan", "risks", "not-proven", "rollback", "why-now"];
const TONE_ALIASES = { info: "note", warn: "caution" };
const briefTone = (tone) => tone in TONE_ALIASES ? TONE_ALIASES[tone] : tone;
function briefFigureOf(block) {
  return {
    type: "figure",
    evidence: block.evidence,
    ...block.image !== void 0 && { image: block.image },
    marks: block.points.map((point) => ({ ...point.box, label: point.title, md: point.md, ...point.tone && { tone: point.tone } }))
  };
}
const BRIEF_REQUIRED_SLOTS = {
  plan: ["proof-plan"],
  outcome: ["not-proven"],
  merge: [],
  // Whoever approves a release needs to know what users will see and what could break. The way
  // back is Blume's to say (redeploy what it replaces); a rollback slide adds only what is more.
  release: ["user-impact", "risks"],
  question: []
};
const BRIEF_REF_KINDS = ["ev", "check", "task", "decision", "file", "pr", "spec", "q"];
const ADDRESS = /^([a-z]+):(\S+)$/;
function parseBriefAddress(address) {
  const match = address ? ADDRESS.exec(address) : null;
  return match && REF_KIND.has(match[1]) ? { kind: match[1], id: match[2] } : void 0;
}
const REF_OR_LINK = /\[([^\]\n]+)\]\(([a-z]+):([^)\s]+)\)/g;
const REF_KIND = new Set(BRIEF_REF_KINDS);
function unknownRefKinds(source) {
  return [...source.matchAll(REF_OR_LINK)].map((match) => match[2]).filter((scheme) => !REF_KIND.has(scheme) && scheme !== "https" && scheme !== "http");
}
function briefBlockTexts(block) {
  switch (block.type) {
    case "prose":
      return [block.md];
    case "callout":
      return [block.title, block.md ?? ""];
    case "stats":
      return block.items.map((item) => item.label);
    case "figure":
      return [block.caption ?? "", block.lookFor ?? "", ...(block.marks ?? []).flatMap((mark) => [mark.label, mark.md ?? ""])];
    case "explain":
      return block.points.flatMap((point) => [point.title, point.md]);
    case "shots":
      return block.items.flatMap((item) => [item.label, item.caption]);
    case "bars":
      return [block.title ?? "", block.note ?? "", ...block.rows.map((row) => row.label), ...(block.legend ?? []).map((entry) => entry.label)];
    case "diagram":
      return [block.title ?? "", ...block.nodes.flatMap((node) => [node.label, node.detail ?? ""]), ...block.edges.map((edge) => edge.label ?? ""), ...(block.lanes ?? []).map((lane) => lane.label)];
    case "table":
      return [block.caption ?? "", ...block.columns, ...block.rows.flat().map((cell) => typeof cell === "string" ? cell : "pill" in cell ? cell.pill : "")];
    case "quote":
      return [block.source];
    case "code":
      return [block.note ?? ""];
    case "evidence":
      return [block.note ?? ""];
    case "checks":
      return [];
    case "timeline":
      return block.items.flatMap((item) => [item.label, item.md ?? ""]);
    case "risks":
      return block.items.flatMap((item) => [item.risk, item.who, item.undo ?? ""]);
    case "matrix":
      return [...block.options.map((option) => option.label), ...block.criteria, ...block.cells.flat().map((cell) => typeof cell === "string" ? cell : cell.pill)];
  }
}
function briefBlocksAsWritten(blocks) {
  return blocks.flatMap((block) => block.type !== "prose" ? [block] : block.newer ? [block.newer] : block.fallback ? [] : [block]);
}
function briefSlideAsWritten(slide) {
  const saved = (list) => list.some((b) => b.type === "prose" && (b.newer || b.fallback));
  if (!saved(slide.blocks) && !(slide.aside && saved(slide.aside)) && !slide.compare?.some((column) => saved(column.blocks))) return slide;
  return {
    ...slide,
    blocks: briefBlocksAsWritten(slide.blocks),
    ...slide.aside ? { aside: briefBlocksAsWritten(slide.aside) } : {},
    ...slide.compare ? { compare: slide.compare.map((column) => ({ ...column, blocks: briefBlocksAsWritten(column.blocks) })) } : {}
  };
}
function briefSlideBlockEntries(written) {
  const slide = briefSlideAsWritten(written);
  return [
    ...slide.blocks.map((block, index) => ({ block, path: ["blocks", index] })),
    ...(slide.aside ?? []).map((block, index) => ({ block, path: ["aside", index] })),
    ...(slide.compare ?? []).flatMap(
      (column, columnIndex) => column.blocks.map((block, index) => ({ block, path: ["compare", columnIndex, "blocks", index] }))
    )
  ];
}
function briefSlideBlocks(written) {
  const slide = briefSlideAsWritten(written);
  return [...slide.blocks, ...slide.aside ?? [], ...(slide.compare ?? []).flatMap((column) => column.blocks)];
}
exports.BRIEF_REF_KINDS = BRIEF_REF_KINDS;
exports.BRIEF_REQUIRED_SLOTS = BRIEF_REQUIRED_SLOTS;
exports.BRIEF_SLOTS = BRIEF_SLOTS;
exports.DELIVERY_PHASES = DELIVERY_PHASES;
exports.GLOBAL_SEARCH_CATEGORIES = GLOBAL_SEARCH_CATEGORIES;
exports.MAX_GLOBAL_SEARCH_SCOPE_IDS = MAX_GLOBAL_SEARCH_SCOPE_IDS;
exports.PHASE = PHASE;
exports.PHASE_CHOICES = PHASE_CHOICES;
exports.WRAPPED_DEFAULT_IDLE_GAP_MS = WRAPPED_DEFAULT_IDLE_GAP_MS;
exports.briefBlockTexts = briefBlockTexts;
exports.briefFigureOf = briefFigureOf;
exports.briefSlideBlockEntries = briefSlideBlockEntries;
exports.briefSlideBlocks = briefSlideBlocks;
exports.briefTone = briefTone;
exports.deliveryPhase = deliveryPhase;
exports.normalizeGlobalSearchLimit = normalizeGlobalSearchLimit;
exports.parseBriefAddress = parseBriefAddress;
exports.unknownRefKinds = unknownRefKinds;
//# sourceMappingURL=deliveryBriefs-CbTihYeZ.js.map

//# debugId=5fc3d977-6531-5f95-9bfa-a0027acafbc8
