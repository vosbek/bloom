"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="bfc30b59-4982-509b-94b3-e7acc3d4d261")}catch(e){}}();

const hash = require("./hash-DCMQIns_.js");
const SEP = "\0";
function portablePath(value) {
  const slashes = value.replace(/\\/g, "/");
  const withoutDot = slashes.replace(/^\.\//, "");
  return withoutDot.replace(/\/{2,}/g, "/").replace(/\/$/, "");
}
function sourceKey(source) {
  switch (source.type) {
    case "file":
    case "directory":
      return [source.type, portablePath(source.path)].join(SEP);
    case "config-entry":
      return [source.type, portablePath(source.path), source.keyPath].join(SEP);
    case "installed-package":
      return [source.type, source.packageId, source.path ? portablePath(source.path) : ""].join(SEP);
    case "external":
      return [source.type, source.uri].join(SEP);
  }
}
function artifactKey(identity) {
  return [
    identity.scope,
    identity.provider ?? "shared",
    identity.projectId ?? "",
    identity.workspaceLocationId ?? "",
    sourceKey(identity.source)
  ].join(SEP);
}
function artifactId(identity) {
  return `unit_${hash.fnv1a64Hex(artifactKey(identity))}`;
}
function influenceForArtifactKind(kind) {
  switch (kind) {
    case "instruction":
      return "instructions";
    case "knowledge":
      return "knowledge";
    case "configuration":
      return "configuration";
    case "workflow":
      return "workflow";
    case "skill":
    case "mcp-server":
    case "plugin":
    case "sub-agent":
    case "command":
    case "hook":
      return "capability";
    case "unknown":
      return "unknown";
  }
}
const SETUP_WRITE_CONFLICT_CODE = "SETUP_WRITE_CONFLICT";
class SetupWriteConflictError extends Error {
  constructor(path) {
    super(
      `${SETUP_WRITE_CONFLICT_CODE}: the file changed on disk since it was loaded${path ? ` (${path})` : ""}`
    );
    this.code = SETUP_WRITE_CONFLICT_CODE;
    this.name = "SetupWriteConflictError";
  }
}
const HARNESSES = [
  {
    id: "claude",
    label: "Claude Code",
    kind: "cli",
    plugin: { route: "installer" },
    sessions: {
      homeDir: ".claude",
      configDirs: [".claude"],
      docFiles: ["CLAUDE.md"],
      hasUsage: true,
      // Blume writes into ~/.claude itself, so the directory proves nothing.
      // These are paths only Claude Code creates.
      installEvidencePaths: [".claude/projects", ".claude/todos", ".claude/statsig", ".claude.json"]
    }
  },
  {
    id: "codex",
    label: "Codex",
    kind: "cli",
    plugin: { route: "installer" },
    sessions: { homeDir: ".codex", configDirs: [".codex"], docFiles: ["AGENTS.md"], hasUsage: true }
  },
  {
    id: "cursor",
    label: "Cursor",
    kind: "ide",
    plugin: { route: "config" },
    sessions: {
      homeDir: ".cursor",
      configDirs: [".cursor"],
      docFiles: [".cursorrules"],
      hasUsage: true,
      installEvidencePaths: [".cursor/extensions", "Library/Application Support/Cursor", ".config/Cursor"]
    }
  },
  { id: "copilot", label: "GitHub Copilot CLI", kind: "cli", plugin: { route: "plugin" }, evidencePaths: [".copilot"] },
  {
    id: "gemini",
    label: "Gemini CLI",
    kind: "cli",
    plugin: { route: "plugin", note: "Google moved personal accounts to Antigravity CLI in June 2026." },
    evidencePaths: [".gemini"]
  },
  { id: "agy", label: "Antigravity CLI", kind: "cli", plugin: { route: "config" } },
  { id: "opencode", label: "OpenCode", kind: "cli", plugin: { route: "config" }, evidencePaths: [".config/opencode"] },
  { id: "droid", label: "Factory Droid", kind: "cli", plugin: { route: "plugin" } },
  { id: "qwen", label: "Qwen Code", kind: "cli", plugin: { route: "plugin" }, evidencePaths: [".qwen"] },
  { id: "kiro", label: "Kiro", kind: "ide", plugin: { route: "config" } },
  { id: "cline", label: "Cline", kind: "ide", plugin: { route: "config" }, evidencePaths: [".cline"] },
  { id: "amp", label: "Amp", kind: "cli", plugin: { route: "config" }, evidencePaths: [".config/amp"] },
  {
    id: "pi",
    label: "Pi",
    kind: "cli",
    plugin: { route: "plugin" },
    sessions: { homeDir: ".pi", configDirs: [".pi"], docFiles: [], hasUsage: false }
  },
  {
    id: "omp",
    label: "Oh My Pi",
    shortLabel: "OMP",
    kind: "cli",
    plugin: { route: "config" },
    sessions: { homeDir: ".omp/agent", configDirs: [".omp"], docFiles: [], hasUsage: false }
  },
  { id: "hermes", label: "Hermes Agent", kind: "cli", plugin: { route: "config" } },
  { id: "openclaw", label: "OpenClaw", kind: "cli", plugin: { route: "plugin" } },
  { id: "grok", label: "Grok Build", kind: "cli", plugin: { route: "plugin" } },
  { id: "grokbot", label: "Grok Bot", kind: "cloud", plugin: { route: "cloud", note: "Runs in xAI’s cloud: paste the setup message into the bot." } },
  { id: "goose", label: "Goose", kind: "cli", plugin: { route: "plugin" }, evidencePaths: [".config/goose"] },
  { id: "devin", label: "Devin", kind: "ide", plugin: { route: "config" } },
  {
    id: "windsurf",
    label: "Windsurf",
    kind: "ide",
    plugin: { route: "config", note: "Windsurf is now Devin Desktop." },
    evidencePaths: [".codeium/windsurf"]
  },
  { id: "crush", label: "Crush", kind: "cli", plugin: { route: "config" } },
  {
    id: "continue",
    label: "Continue",
    kind: "ide",
    plugin: { route: "config", note: "Continue is no longer maintained." },
    evidencePaths: [".continue"]
  },
  { id: "zed", label: "Zed", kind: "ide", plugin: { route: "config" }, evidencePaths: [".config/zed"] },
  { id: "warp", label: "Warp", kind: "cli", plugin: { route: "config" }, evidencePaths: [".warp"] },
  {
    id: "aider",
    label: "Aider",
    kind: "cli",
    plugin: { route: "command", note: "Aider has no MCP: it runs Blume as a command and asks you first." },
    evidencePaths: [".aider.conf.yml", ".aider"]
  }
];
HARNESSES.map((harness) => harness.id);
function registeredHarness(id) {
  return HARNESSES.find((harness) => harness.id === id);
}
function harnessCliBinaryEnvKeys(bin) {
  const upper = bin.toUpperCase();
  return [`BLUME_${upper}_BIN`, `${upper}_BIN`];
}
function harnessCliBinaryOverride(bin, env) {
  const [blumeKey, legacyKey] = harnessCliBinaryEnvKeys(bin);
  return env[blumeKey] || env[legacyKey] || void 0;
}
const HARNESS_CATALOG = HARNESSES.flatMap(
  (harness) => harness.sessions ? [{ id: harness.id, label: harness.shortLabel ?? harness.label, ...harness.sessions }] : []
);
const HARNESS_SETUP_GUIDES = [
  {
    harnessId: "claude",
    setupUrl: "https://docs.anthropic.com/en/docs/claude-code/setup",
    installCommand: "npm install -g @anthropic-ai/claude-code",
    authCommand: "claude auth login",
    startCommand: "claude"
  },
  {
    harnessId: "codex",
    setupUrl: "https://developers.openai.com/codex/cli",
    installCommand: "npm install -g @openai/codex",
    authCommand: "codex login",
    startCommand: "codex"
  },
  {
    harnessId: "cursor",
    setupUrl: "https://cursor.com"
  },
  {
    harnessId: "pi",
    setupUrl: "https://www.npmjs.com/package/@earendil-works/pi-coding-agent",
    // npm resolves an older published tag than Pi's own updater tracks, so a
    // fresh install otherwise greets the user with an update notice.
    installCommand: "npm install -g @earendil-works/pi-coding-agent && pi update",
    startCommand: "pi"
  },
  {
    harnessId: "omp",
    setupUrl: "https://www.npmjs.com/package/@oh-my-pi/pi-coding-agent",
    // OMP runs on bun; installing it alone leaves a CLI that cannot start.
    installCommand: "npm install -g bun && npm install -g @oh-my-pi/pi-coding-agent",
    startCommand: "omp"
  }
];
function harnessSetupGuide(id) {
  return HARNESS_SETUP_GUIDES.find((guide) => guide.harnessId === id);
}
const KNOWN_AGENT_TOOLS = HARNESSES.flatMap(
  (harness) => !harness.sessions && harness.evidencePaths && isLocalKind(harness.kind) ? [{ id: harness.id, label: harness.label, kind: harness.kind, evidencePaths: harness.evidencePaths }] : []
);
function isLocalKind(kind) {
  return kind === "cli" || kind === "ide";
}
function getHarness(id) {
  return HARNESS_CATALOG.find((harness) => harness.id === id);
}
function harnessIds() {
  return HARNESS_CATALOG.map((harness) => harness.id);
}
function harnessLabel(id) {
  const harness = registeredHarness(id);
  return harness ? harness.shortLabel ?? harness.label : id;
}
function harnessHomeDir(id) {
  return getHarness(id)?.homeDir ?? `.${id}`;
}
let DATE_TIME_RE = /^(\d{4}-\d{2}-\d{2})?[T ]?(?:(\d{2}):\d{2}(?::\d{2}(?:\.\d+)?)?)?(Z|[-+]\d{2}:\d{2})?$/i;
class TomlDate extends Date {
  #hasDate = false;
  #hasTime = false;
  #offset = null;
  constructor(date) {
    let hasDate = true;
    let hasTime = true;
    let offset = "Z";
    if (typeof date === "string") {
      let match = date.match(DATE_TIME_RE);
      if (match) {
        if (!match[1]) {
          hasDate = false;
          date = `0000-01-01T${date}`;
        }
        hasTime = !!match[2];
        hasTime && date[10] === " " && (date = date.replace(" ", "T"));
        if (match[2] && +match[2] > 23) {
          date = "";
        } else {
          offset = match[3] || null;
          date = date.toUpperCase();
          if (!offset && hasTime)
            date += "Z";
        }
      } else {
        date = "";
      }
    }
    super(date);
    if (!isNaN(this.getTime())) {
      this.#hasDate = hasDate;
      this.#hasTime = hasTime;
      this.#offset = offset;
    }
  }
  isDateTime() {
    return this.#hasDate && this.#hasTime;
  }
  isLocal() {
    return !this.#hasDate || !this.#hasTime || !this.#offset;
  }
  isDate() {
    return this.#hasDate && !this.#hasTime;
  }
  isTime() {
    return this.#hasTime && !this.#hasDate;
  }
  isValid() {
    return this.#hasDate || this.#hasTime;
  }
  toISOString() {
    let iso = super.toISOString();
    if (this.isDate())
      return iso.slice(0, 10);
    if (this.isTime())
      return iso.slice(11, 23);
    if (this.#offset === null)
      return iso.slice(0, -1);
    if (this.#offset === "Z")
      return iso;
    let offset = +this.#offset.slice(1, 3) * 60 + +this.#offset.slice(4, 6);
    offset = this.#offset[0] === "-" ? offset : -offset;
    let offsetDate = new Date(this.getTime() - offset * 6e4);
    return offsetDate.toISOString().slice(0, -1) + this.#offset;
  }
  static wrapAsOffsetDateTime(jsDate, offset = "Z") {
    let date = new TomlDate(jsDate);
    date.#offset = offset;
    return date;
  }
  static wrapAsLocalDateTime(jsDate) {
    let date = new TomlDate(jsDate);
    date.#offset = null;
    return date;
  }
  static wrapAsLocalDate(jsDate) {
    let date = new TomlDate(jsDate);
    date.#hasTime = false;
    date.#offset = null;
    return date;
  }
  static wrapAsLocalTime(jsDate) {
    let date = new TomlDate(jsDate);
    date.#hasDate = false;
    date.#offset = null;
    return date;
  }
}
function getLineColFromPtr(string, ptr) {
  let lines = string.slice(0, ptr).split(/\r\n|\n|\r/g);
  return [lines.length, lines.pop().length + 1];
}
function makeCodeBlock(string, line, column) {
  let lines = string.split(/\r\n|\n|\r/g);
  let codeblock = "";
  let numberLen = (Math.log10(line + 1) | 0) + 1;
  for (let i = line - 1; i <= line + 1; i++) {
    let l = lines[i - 1];
    if (!l)
      continue;
    codeblock += i.toString().padEnd(numberLen, " ");
    codeblock += ":  ";
    codeblock += l;
    codeblock += "\n";
    if (i === line) {
      codeblock += " ".repeat(numberLen + column + 2);
      codeblock += "^\n";
    }
  }
  return codeblock;
}
class TomlError extends Error {
  line;
  column;
  codeblock;
  constructor(message, options) {
    const [line, column] = getLineColFromPtr(options.toml, options.ptr);
    const codeblock = makeCodeBlock(options.toml, line, column);
    super(`Invalid TOML document: ${message}

${codeblock}`, options);
    this.line = line;
    this.column = column;
    this.codeblock = codeblock;
  }
}
let INT_REGEX = /^((0x[0-9a-fA-F](_?[0-9a-fA-F])*)|(([+-]|0[ob])?\d(_?\d)*))$/;
let FLOAT_REGEX = /^[+-]?\d(_?\d)*(\.\d(_?\d)*)?([eE][+-]?\d(_?\d)*)?$/;
let LEADING_ZERO = /^[+-]?0[0-9_]/;
function parseString(str, ptr) {
  let c = str[ptr++];
  let first = c;
  let isLiteral = c === "'";
  let isMultiline = c === str[ptr] && c === str[ptr + 1];
  if (isMultiline) {
    if (str[ptr += 2] === "\n")
      ptr++;
    else if (str[ptr] === "\r" && str[ptr + 1] === "\n")
      ptr += 2;
  }
  let parsed = "";
  let sliceStart = ptr;
  let state = 0;
  for (let i = ptr; i < str.length; i++) {
    c = str[i];
    if (isMultiline && (c === "\n" || c === "\r" && str[i + 1] === "\n")) {
      state = state && 3;
    } else if (c < " " && c !== "	" || c === "") {
      throw new TomlError("control characters are not allowed in strings", {
        toml: str,
        ptr: i
      });
    } else if ((!state || state === 3) && c === first && (!isMultiline || str[i + 1] === first && str[i + 2] === first)) {
      if (isMultiline) {
        if (str[i + 3] === first)
          i++;
        if (str[i + 3] === first)
          i++;
      }
      return [
        // If we're in a newline escape still, then there's nothing to add.
        // Also try to avoid concat if there's nothing to add to parsed, or nothing has been added to parsed.
        state ? parsed : parsed + str.slice(sliceStart, i),
        i + (isMultiline ? 3 : 1)
      ];
    } else if (!state) {
      if (!isLiteral && c === "\\") {
        parsed += str.slice(sliceStart, sliceStart = i);
        state = 1;
      }
    } else if (state === 1) {
      if (c === "x" || c === "u" || c === "U") {
        let value = 0;
        let len = c === "x" ? 2 : c === "u" ? 4 : 8;
        for (let j = 0; j < len; j++, i++) {
          let hex = str.charCodeAt(i + 1);
          let digit = (
            /* 0-9 */
            hex >= 48 && hex <= 57 ? hex - 48 : (
              /* A-F */
              hex >= 65 && hex <= 70 ? hex - 65 + 10 : (
                /* a-f */
                hex >= 97 && hex <= 102 ? hex - 97 + 10 : -1
              )
            )
          );
          if (digit < 0)
            throw new TomlError("invalid non-hex character in unicode escape", { toml: str, ptr: i + 1 });
          value = value << 4 | digit;
        }
        if (value < 0 || value > 1114111 || value >= 55296 && value <= 57343) {
          throw new TomlError("invalid unicode escape", { toml: str, ptr: i });
        }
        parsed += String.fromCodePoint(value);
        sliceStart = i + 1;
        state = 0;
      } else if (c === " " || c === "	") {
        state = 2;
      } else {
        if (c === "b")
          parsed += "\b";
        else if (c === "t")
          parsed += "	";
        else if (c === "n")
          parsed += "\n";
        else if (c === "f")
          parsed += "\f";
        else if (c === "r")
          parsed += "\r";
        else if (c === "e")
          parsed += "\x1B";
        else if (c === '"')
          parsed += '"';
        else if (c === "\\")
          parsed += "\\";
        else
          throw new TomlError("unrecognized escape sequence", { toml: str, ptr: i });
        sliceStart = i + 1;
        state = 0;
      }
    } else if (c !== " " && c !== "	") {
      if (state === 2) {
        throw new TomlError("invalid escape: only line-ending whitespace may be escaped", {
          toml: str,
          ptr: sliceStart
        });
      }
      state = !isLiteral && c === "\\" ? 1 : 0;
      sliceStart = i;
    }
  }
  throw new TomlError("unfinished string", { toml: str, ptr });
}
function parseValue(value, toml, ptr, integersAsBigInt) {
  if (value === "true")
    return true;
  if (value === "false")
    return false;
  if (value === "-inf")
    return -Infinity;
  if (value === "inf" || value === "+inf")
    return Infinity;
  if (value === "nan" || value === "+nan" || value === "-nan")
    return NaN;
  if (value === "-0")
    return integersAsBigInt ? 0n : 0;
  let isInt = INT_REGEX.test(value);
  if (isInt || FLOAT_REGEX.test(value)) {
    if (LEADING_ZERO.test(value)) {
      throw new TomlError("leading zeroes are not allowed", {
        toml,
        ptr
      });
    }
    value = value.replace(/_/g, "");
    let numeric = +value;
    if (isNaN(numeric)) {
      throw new TomlError("invalid number", {
        toml,
        ptr
      });
    }
    if (isInt) {
      if ((isInt = !Number.isSafeInteger(numeric)) && !integersAsBigInt) {
        throw new TomlError("integer value cannot be represented losslessly", {
          toml,
          ptr
        });
      }
      if (isInt || integersAsBigInt === true)
        numeric = BigInt(value);
    }
    return numeric;
  }
  const date = new TomlDate(value);
  if (!date.isValid()) {
    throw new TomlError("invalid value", {
      toml,
      ptr
    });
  }
  return date;
}
function indexOfNewline(str, start = 0, end = str.length) {
  let idx = str.indexOf("\n", start);
  if (str[idx - 1] === "\r")
    idx--;
  return idx <= end ? idx : -1;
}
function skipComment(str, ptr) {
  for (let i = ptr; i < str.length; i++) {
    let c = str[i];
    if (c === "\n")
      return i;
    if (c === "\r" && str[i + 1] === "\n")
      return i + 1;
    if (c < " " && c !== "	" || c === "") {
      throw new TomlError("control characters are not allowed in comments", {
        toml: str,
        ptr
      });
    }
  }
  return str.length;
}
function skipVoid(str, ptr, banNewLines, banComments) {
  let c;
  while (1) {
    while ((c = str[ptr]) === " " || c === "	" || !banNewLines && (c === "\n" || c === "\r" && str[ptr + 1] === "\n"))
      ptr++;
    if (banComments || c !== "#")
      break;
    ptr = skipComment(str, ptr);
  }
  return ptr;
}
function skipUntil(str, ptr, sep, end, banNewLines = false) {
  if (!end) {
    ptr = indexOfNewline(str, ptr);
    return ptr < 0 ? str.length : ptr;
  }
  for (let i = ptr; i < str.length; i++) {
    let c = str[i];
    if (c === "#") {
      i = indexOfNewline(str, i);
    } else if (c === sep) {
      return i + 1;
    } else if (c === end || banNewLines && (c === "\n" || c === "\r" && str[i + 1] === "\n")) {
      return i;
    }
  }
  throw new TomlError("cannot find end of structure", {
    toml: str,
    ptr
  });
}
function sliceAndTrimEndOf(str, startPtr, endPtr) {
  let value = str.slice(startPtr, endPtr);
  let commentIdx = value.indexOf("#");
  if (commentIdx > -1) {
    skipComment(str, commentIdx);
    value = value.slice(0, commentIdx);
  }
  return [value.trimEnd(), commentIdx];
}
function extractValue(str, ptr, end, depth, integersAsBigInt) {
  if (depth === 0) {
    throw new TomlError("document contains excessively nested structures. aborting.", {
      toml: str,
      ptr
    });
  }
  let c = str[ptr];
  if (c === "[" || c === "{") {
    let [value, endPtr2] = c === "[" ? parseArray(str, ptr, depth, integersAsBigInt) : parseInlineTable(str, ptr, depth, integersAsBigInt);
    if (end) {
      endPtr2 = skipVoid(str, endPtr2);
      if (str[endPtr2] === ",")
        endPtr2++;
      else if (str[endPtr2] !== end) {
        throw new TomlError("expected comma or end of structure", {
          toml: str,
          ptr: endPtr2
        });
      }
    }
    return [value, endPtr2];
  }
  if (c === '"' || c === "'") {
    let [parsed, endPtr2] = parseString(str, ptr);
    if (end) {
      endPtr2 = skipVoid(str, endPtr2);
      if (str[endPtr2] && str[endPtr2] !== "," && str[endPtr2] !== end && str[endPtr2] !== "\n" && str[endPtr2] !== "\r") {
        throw new TomlError("unexpected character encountered", {
          toml: str,
          ptr: endPtr2
        });
      }
      if (str[endPtr2] === ",")
        endPtr2++;
    }
    return [parsed, endPtr2];
  }
  let endPtr = skipUntil(str, ptr, ",", end);
  let slice = sliceAndTrimEndOf(str, ptr, endPtr - (str[endPtr - 1] === "," ? 1 : 0));
  if (!slice[0]) {
    throw new TomlError("incomplete key-value declaration: no value specified", {
      toml: str,
      ptr
    });
  }
  if (end && slice[1] > -1) {
    endPtr = skipVoid(str, ptr + slice[1]);
    if (str[endPtr] === ",")
      endPtr++;
  }
  return [
    parseValue(slice[0], str, ptr, integersAsBigInt),
    endPtr
  ];
}
let KEY_PART_RE = /^[a-zA-Z0-9-_]+[ \t]*$/;
function parseKey(str, ptr, end = "=") {
  let dot = ptr - 1;
  let parsed = [];
  let endPtr = str.indexOf(end, ptr);
  if (endPtr < 0) {
    throw new TomlError("incomplete key-value: cannot find end of key", {
      toml: str,
      ptr
    });
  }
  do {
    let c = str[ptr = ++dot];
    if (c !== " " && c !== "	") {
      if (c === '"' || c === "'") {
        if (c === str[ptr + 1] && c === str[ptr + 2]) {
          throw new TomlError("multiline strings are not allowed in keys", {
            toml: str,
            ptr
          });
        }
        let [part, eos] = parseString(str, ptr);
        dot = str.indexOf(".", eos);
        let strEnd = str.slice(eos, dot < 0 || dot > endPtr ? endPtr : dot);
        let newLine = indexOfNewline(strEnd);
        if (newLine > -1) {
          throw new TomlError("newlines are not allowed in keys", {
            toml: str,
            ptr: ptr + dot + newLine
          });
        }
        if (strEnd.trimStart()) {
          throw new TomlError("found extra tokens after the string part", {
            toml: str,
            ptr: eos
          });
        }
        if (endPtr < eos) {
          endPtr = str.indexOf(end, eos);
          if (endPtr < 0) {
            throw new TomlError("incomplete key-value: cannot find end of key", {
              toml: str,
              ptr
            });
          }
        }
        parsed.push(part);
      } else {
        dot = str.indexOf(".", ptr);
        let part = str.slice(ptr, dot < 0 || dot > endPtr ? endPtr : dot);
        if (!KEY_PART_RE.test(part)) {
          throw new TomlError("only letter, numbers, dashes and underscores are allowed in keys", {
            toml: str,
            ptr
          });
        }
        parsed.push(part.trimEnd());
      }
    }
  } while (dot + 1 && dot < endPtr);
  return [parsed, skipVoid(str, endPtr + 1, true, true)];
}
function parseInlineTable(str, ptr, depth, integersAsBigInt) {
  let res = {};
  let seen = /* @__PURE__ */ new Set();
  let c;
  ptr++;
  while ((c = str[ptr++]) !== "}" && c) {
    if (c === ",") {
      throw new TomlError("expected value, found comma", {
        toml: str,
        ptr: ptr - 1
      });
    } else if (c === "#")
      ptr = skipComment(str, ptr);
    else if (c !== " " && c !== "	" && c !== "\n" && c !== "\r") {
      let k;
      let t = res;
      let hasOwn = false;
      let [key, keyEndPtr] = parseKey(str, ptr - 1);
      for (let i = 0; i < key.length; i++) {
        if (i)
          t = hasOwn ? t[k] : t[k] = {};
        k = key[i];
        if ((hasOwn = Object.hasOwn(t, k)) && (typeof t[k] !== "object" || seen.has(t[k]))) {
          throw new TomlError("trying to redefine an already defined value", {
            toml: str,
            ptr
          });
        }
        if (!hasOwn && k === "__proto__") {
          Object.defineProperty(t, k, { enumerable: true, configurable: true, writable: true });
        }
      }
      if (hasOwn) {
        throw new TomlError("trying to redefine an already defined value", {
          toml: str,
          ptr
        });
      }
      let [value, valueEndPtr] = extractValue(str, keyEndPtr, "}", depth - 1, integersAsBigInt);
      seen.add(value);
      t[k] = value;
      ptr = valueEndPtr;
    }
  }
  if (!c) {
    throw new TomlError("unfinished table encountered", {
      toml: str,
      ptr
    });
  }
  return [res, ptr];
}
function parseArray(str, ptr, depth, integersAsBigInt) {
  let res = [];
  let c;
  ptr++;
  while ((c = str[ptr++]) !== "]" && c) {
    if (c === ",") {
      throw new TomlError("expected value, found comma", {
        toml: str,
        ptr: ptr - 1
      });
    } else if (c === "#")
      ptr = skipComment(str, ptr);
    else if (c !== " " && c !== "	" && c !== "\n" && c !== "\r") {
      let e = extractValue(str, ptr - 1, "]", depth - 1, integersAsBigInt);
      res.push(e[0]);
      ptr = e[1];
    }
  }
  if (!c) {
    throw new TomlError("unfinished array encountered", {
      toml: str,
      ptr
    });
  }
  return [res, ptr];
}
function peekTable(key, table, meta, type) {
  let t = table;
  let m = meta;
  let k;
  let hasOwn = false;
  let state;
  for (let i = 0; i < key.length; i++) {
    if (i) {
      t = hasOwn ? t[k] : t[k] = {};
      m = (state = m[k]).c;
      if (type === 0 && (state.t === 1 || state.t === 2)) {
        return null;
      }
      if (state.t === 2) {
        let l = t.length - 1;
        t = t[l];
        m = m[l].c;
      }
    }
    k = key[i];
    if ((hasOwn = Object.hasOwn(t, k)) && m[k]?.t === 0 && m[k]?.d) {
      return null;
    }
    if (!hasOwn) {
      if (k === "__proto__") {
        Object.defineProperty(t, k, { enumerable: true, configurable: true, writable: true });
        Object.defineProperty(m, k, { enumerable: true, configurable: true, writable: true });
      }
      m[k] = {
        t: i < key.length - 1 && type === 2 ? 3 : type,
        d: false,
        i: 0,
        c: {}
      };
    }
  }
  state = m[k];
  if (state.t !== type && !(type === 1 && state.t === 3)) {
    return null;
  }
  if (type === 2) {
    if (!state.d) {
      state.d = true;
      t[k] = [];
    }
    t[k].push(t = {});
    state.c[state.i++] = state = { t: 1, d: false, i: 0, c: {} };
  }
  if (state.d) {
    return null;
  }
  state.d = true;
  if (type === 1) {
    t = hasOwn ? t[k] : t[k] = {};
  } else if (type === 0 && hasOwn) {
    return null;
  }
  return [k, t, state.c];
}
function parse(toml, { maxDepth = 1e3, integersAsBigInt } = {}) {
  let res = {};
  let meta = {};
  let tbl = res;
  let m = meta;
  for (let ptr = skipVoid(toml, 0); ptr < toml.length; ) {
    if (toml[ptr] === "[") {
      let isTableArray = toml[++ptr] === "[";
      let k = parseKey(toml, ptr += +isTableArray, "]");
      if (isTableArray) {
        if (toml[k[1] - 1] !== "]") {
          throw new TomlError("expected end of table declaration", {
            toml,
            ptr: k[1] - 1
          });
        }
        k[1]++;
      }
      let p = peekTable(
        k[0],
        res,
        meta,
        isTableArray ? 2 : 1
        /* Type.EXPLICIT */
      );
      if (!p) {
        throw new TomlError("trying to redefine an already defined table or value", {
          toml,
          ptr
        });
      }
      m = p[2];
      tbl = p[1];
      ptr = k[1];
    } else {
      let k = parseKey(toml, ptr);
      let p = peekTable(
        k[0],
        tbl,
        m,
        0
        /* Type.DOTTED */
      );
      if (!p) {
        throw new TomlError("trying to redefine an already defined table or value", {
          toml,
          ptr
        });
      }
      let v = extractValue(toml, k[1], void 0, maxDepth, integersAsBigInt);
      p[1][p[0]] = v[0];
      ptr = v[1];
    }
    ptr = skipVoid(toml, ptr, true);
    if (toml[ptr] && toml[ptr] !== "\n" && toml[ptr] !== "\r") {
      throw new TomlError("each key-value declaration must be followed by an end-of-line", {
        toml,
        ptr
      });
    }
    ptr = skipVoid(toml, ptr);
  }
  return res;
}
const STRUCTURED_ARTIFACT_PARSER_VERSION = "artifact-structured-1";
const STRUCTURED_ARTIFACT_SCANNER_VERSION = "artifact-config-1";
function isRecord(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
function deleteNamedEntry(value, keyPath, artifactName) {
  const [root, maybeProjectId, maybeProjectCollection] = keyPath.split(".");
  if (root === "projects" && maybeProjectCollection === "mcpServers") {
    if (!maybeProjectId || !isRecord(value.projects)) return false;
    const matches = Object.entries(value.projects).filter(
      ([projectPath]) => hash.fnv1a64Hex(projectPath) === maybeProjectId
    );
    if (matches.length !== 1) return false;
    const project = matches[0]?.[1];
    if (!isRecord(project) || !isRecord(project.mcpServers)) return false;
    if (!Object.hasOwn(project.mcpServers, artifactName)) return false;
    delete project.mcpServers[artifactName];
    return true;
  }
  const collection = value[root];
  if (!isRecord(collection)) return false;
  if (!Object.hasOwn(collection, artifactName)) return false;
  delete collection[artifactName];
  return true;
}
const TOML_DELETE_PROBE = "__blume_artifact_delete_probe_7f9182f0__";
function valuesEqual(left, right) {
  if (Object.is(left, right)) return true;
  if (left instanceof Date || right instanceof Date) {
    return left instanceof Date && right instanceof Date && left.getTime() === right.getTime();
  }
  if (Array.isArray(left) || Array.isArray(right)) {
    return Array.isArray(left) && Array.isArray(right) && left.length === right.length && left.every((item, index) => valuesEqual(item, right[index]));
  }
  if (!isRecord(left) || !isRecord(right)) return false;
  const leftKeys = Object.keys(left);
  const rightKeys = Object.keys(right);
  return leftKeys.length === rightKeys.length && leftKeys.every((key, index) => key === rightKeys[index] && valuesEqual(left[key], right[key]));
}
function containsTomlDeleteProbe(value) {
  if (!isRecord(value)) return false;
  if (value[TOML_DELETE_PROBE] === true) return true;
  return Object.values(value).some(containsTomlDeleteProbe);
}
function tomlHeaderTargetsEntry(line, root, artifactName) {
  if (!/^\s*\[(?!\[).+\]\s*(?:#.*)?$/.test(line)) return false;
  try {
    const parsed = parse(`${line}
${TOML_DELETE_PROBE} = true
`);
    if (!isRecord(parsed) || !isRecord(parsed[root])) return false;
    return containsTomlDeleteProbe(parsed[root][artifactName]);
  } catch {
    return false;
  }
}
function parsesAsExpectedToml(content, expected) {
  try {
    return valuesEqual(parse(content), expected);
  } catch {
    return false;
  }
}
function removeTomlEntryPreservingComments(content, keyPath, artifactName, expected) {
  const [root] = keyPath.split(".");
  if (!root) throw new Error("artifact entry has no TOML collection");
  const lines = content.split("\n");
  const headerLines = lines.flatMap((line, index) => /^\s*\[(?:\[)?/.test(line) ? [index] : []);
  const removed = /* @__PURE__ */ new Set();
  for (let headerPosition = 0; headerPosition < headerLines.length; headerPosition += 1) {
    const start = headerLines[headerPosition];
    if (!tomlHeaderTargetsEntry(lines[start] ?? "", root, artifactName)) continue;
    let end = headerLines[headerPosition + 1] ?? lines.length;
    while (end > start + 1) {
      const trailing = (lines[end - 1] ?? "").trim();
      if (trailing && !trailing.startsWith("#")) break;
      end -= 1;
    }
    for (let index = start; index < end; index += 1) removed.add(index);
  }
  if (removed.size > 0) {
    const candidate = lines.filter((_, index) => !removed.has(index)).join("\n");
    if (parsesAsExpectedToml(candidate, expected)) return candidate;
  }
  for (let index = 0; index < lines.length; index += 1) {
    const candidate = lines.filter((_, candidateIndex) => candidateIndex !== index).join("\n");
    if (parsesAsExpectedToml(candidate, expected)) return candidate;
  }
  throw new Error("TOML entry layout cannot be edited without rewriting unrelated content");
}
function removeStructuredArtifactConfigEntry(content, sourcePath, keyPath, artifactName) {
  const isToml = sourcePath.toLocaleLowerCase().endsWith(".toml");
  let value;
  if (isToml) {
    const parsed = parse(content);
    if (!isRecord(parsed)) throw new Error("expected a TOML table");
    value = parsed;
  } else {
    const parsed = JSON.parse(content);
    if (!isRecord(parsed)) throw new Error("expected a JSON object");
    value = parsed;
  }
  if (!deleteNamedEntry(value, keyPath, artifactName)) {
    throw new Error(`artifact entry no longer exists: ${artifactName}`);
  }
  if (isToml) return removeTomlEntryPreservingComments(content, keyPath, artifactName, value);
  const indent = content.match(/\n([ \t]+)"/)?.[1] ?? "  ";
  const trailingNewline = content.endsWith("\n") ? "\n" : "";
  return `${JSON.stringify(value, null, indent)}${trailingNewline}`;
}
function stringValue(value) {
  return typeof value === "string" && value.trim() ? value.trim() : void 0;
}
function stringArray(value) {
  return Array.isArray(value) ? value.filter((item) => typeof item === "string") : [];
}
function safeRemoteUrl(value) {
  const raw = stringValue(value);
  if (!raw) return void 0;
  try {
    const parsed = new URL(raw);
    parsed.username = "";
    parsed.password = "";
    parsed.search = "";
    parsed.hash = "";
    return parsed.toString();
  } catch {
    return void 0;
  }
}
function commandName(value) {
  const command = stringValue(value);
  if (!command) return void 0;
  return command.replace(/\\/g, "/").split("/").filter(Boolean).at(-1);
}
function envNames(value) {
  return isRecord(value) ? Object.keys(value).sort() : [];
}
function headerNames(value) {
  return isRecord(value) ? Object.keys(value).sort() : [];
}
function unit(context, input) {
  const identity = {
    scope: context.scope,
    provider: context.provider,
    projectId: context.projectId,
    workspaceLocationId: context.workspaceLocationId,
    source: input.source
  };
  return {
    ...identity,
    id: artifactId(identity),
    name: input.name,
    kind: input.kind,
    influence: influenceForArtifactKind(input.kind),
    composition: input.composition ?? "atomic",
    enabled: input.enabled,
    effective: input.enabled === false ? false : void 0,
    metadata: input.metadata,
    parserVersion: STRUCTURED_ARTIFACT_PARSER_VERSION,
    scannerVersion: STRUCTURED_ARTIFACT_SCANNER_VERSION
  };
}
function fileSource(context) {
  return { type: "file", path: context.sourcePath, runtimePath: context.runtimePath };
}
function configEntrySource(context, keyPath) {
  return {
    type: "config-entry",
    path: context.sourcePath,
    runtimePath: context.runtimePath,
    keyPath
  };
}
function configurationMetadata(value) {
  const keys = Object.keys(value).filter((key) => !["mcp_servers", "mcpServers", "plugins", "enabledPlugins"].includes(key)).sort();
  return { keys };
}
function mcpMetadata(value) {
  const url = safeRemoteUrl(value.url);
  const command = commandName(value.command);
  const type = stringValue(value.type) ?? (url ? url.includes("/sse") ? "sse" : "http" : command ? "stdio" : "unknown");
  return {
    transport: type,
    ...url ? { url } : {},
    ...command ? { command } : {},
    argumentCount: stringArray(value.args).length,
    envNames: envNames(value.env),
    headerNames: headerNames(value.headers)
  };
}
function diagnostic(context, code, error) {
  return {
    sourcePath: context.sourcePath,
    provider: context.provider,
    severity: code === "parse-error" ? "error" : "warning",
    code,
    message: error instanceof Error ? error.message : String(error)
  };
}
function parseJsonRecord(content, context) {
  try {
    const value = JSON.parse(content);
    if (!isRecord(value)) {
      return { diagnostic: diagnostic(context, "unsupported-shape", "expected a JSON object") };
    }
    return { value };
  } catch (error) {
    return { diagnostic: diagnostic(context, "parse-error", error) };
  }
}
function mcpUnitsFromRecord(servers, context, keyPrefix) {
  if (!isRecord(servers)) return [];
  return Object.entries(servers).flatMap(([name, value]) => {
    if (!isRecord(value)) return [];
    return [
      unit(context, {
        name,
        kind: "mcp-server",
        enabled: value.enabled !== false && value.disabled !== true,
        source: configEntrySource(context, `${keyPrefix}.${name}`),
        metadata: mcpMetadata(value)
      })
    ];
  });
}
function pluginUnitsFromRecord(plugins, context, keyPrefix) {
  if (!isRecord(plugins)) return [];
  return Object.entries(plugins).flatMap(([name, value]) => {
    const enabled = typeof value === "boolean" ? value : isRecord(value) ? value.enabled !== false : true;
    return [
      unit(context, {
        name,
        kind: "plugin",
        composition: "composite",
        enabled,
        source: configEntrySource(context, `${keyPrefix}.${name}`),
        metadata: { packageId: name }
      })
    ];
  });
}
function parseCodexConfigArtifacts(content, context) {
  const actual = { ...context, provider: "codex" };
  let value;
  try {
    const parsed = parse(content);
    if (!isRecord(parsed)) throw new Error("expected a TOML table");
    value = parsed;
  } catch (error) {
    return { units: [], relationships: [], diagnostics: [diagnostic(actual, "parse-error", error)] };
  }
  const config = unit(actual, {
    name: "Codex configuration",
    kind: "configuration",
    source: fileSource(actual),
    metadata: configurationMetadata(value)
  });
  const units = [
    config,
    ...mcpUnitsFromRecord(value.mcp_servers, actual, "mcp_servers"),
    ...pluginUnitsFromRecord(value.plugins, actual, "plugins")
  ];
  return {
    units,
    relationships: units.slice(1).map((child) => ({
      fromUnitId: config.id,
      toUnitId: child.id,
      kind: "declares",
      evidence: "confirmed"
    })),
    diagnostics: []
  };
}
function parseClaudeMcpArtifacts(content, context) {
  const actual = { ...context, provider: "claude" };
  const parsed = parseJsonRecord(content, actual);
  if (!parsed.value) {
    return {
      units: [],
      relationships: [],
      diagnostics: parsed.diagnostic ? [parsed.diagnostic] : []
    };
  }
  const config = unit(actual, {
    name: actual.scope === "project" ? "Project MCP configuration" : "Claude MCP configuration",
    kind: "configuration",
    source: fileSource(actual),
    metadata: configurationMetadata(parsed.value)
  });
  const servers = mcpUnitsFromRecord(parsed.value.mcpServers, actual, "mcpServers");
  const projectServers = isRecord(parsed.value.projects) ? Object.entries(parsed.value.projects).sort(([left], [right]) => left.localeCompare(right)).flatMap(
    ([projectPath, project]) => isRecord(project) ? mcpUnitsFromRecord(
      project.mcpServers,
      actual,
      `projects.${hash.fnv1a64Hex(projectPath)}.mcpServers`
    ).map((server) => ({
      ...server,
      metadata: { ...server.metadata, configuredScope: "project" }
    })) : []
  ) : [];
  const allServers = [...servers, ...projectServers];
  return {
    units: [config, ...allServers],
    relationships: allServers.map((server) => ({
      fromUnitId: config.id,
      toUnitId: server.id,
      kind: "declares",
      evidence: "confirmed"
    })),
    diagnostics: []
  };
}
function parseClaudeSettingsArtifacts(content, context) {
  const actual = { ...context, provider: "claude" };
  const parsed = parseJsonRecord(content, actual);
  if (!parsed.value) {
    return {
      units: [],
      relationships: [],
      diagnostics: parsed.diagnostic ? [parsed.diagnostic] : []
    };
  }
  const config = unit(actual, {
    name: "Claude settings",
    kind: "configuration",
    source: fileSource(actual),
    metadata: configurationMetadata(parsed.value)
  });
  const plugins = pluginUnitsFromRecord(parsed.value.enabledPlugins, actual, "enabledPlugins");
  const servers = mcpUnitsFromRecord(parsed.value.mcpServers, actual, "mcpServers");
  const children = [...plugins, ...servers];
  return {
    units: [config, ...children],
    relationships: children.map((child) => ({
      fromUnitId: config.id,
      toUnitId: child.id,
      kind: "declares",
      evidence: "confirmed"
    })),
    diagnostics: []
  };
}
const CONFIG_CATEGORY_BY_NAME = {
  "skill.md": "skills",
  "skills.md": "skills",
  "skills.local.md": "skills",
  "agents.md": "agents",
  "agents.local.md": "agents",
  "claude.md": "rules",
  "claude.local.md": "rules",
  "cursor.md": "rules",
  "codex.md": "rules",
  ".cursorrules": "rules"
};
const CONFIG_CATEGORY_ORDER = ["skills", "agents", "rules"];
const SETUP_BROWSER_CATEGORY_DIRS = [
  "skills",
  "agents",
  "commands",
  "hooks",
  "rules"
];
const SETUP_BROWSER_STRUCTURED_CONFIG_NAMES_BY_ROOT = {
  ".claude": ["settings.json"],
  ".codex": ["config.toml"]
};
const SETUP_BROWSER_SKIP_SUBDIRS = [
  "node_modules",
  ".git",
  "dist",
  "build",
  "out",
  "__pycache__",
  ".cache"
];
const SETUP_BROWSER_PREFERRED_CONTENT_FILES = [
  "SKILL.md",
  "README.md",
  "index.md",
  "AGENT.md",
  "COMMAND.md"
];
const DEFAULT_SETUP_BROWSER_MAX_ENTRY_FILES = 40;
const DEFAULT_SETUP_BROWSER_MAX_ENTRY_WALK_DEPTH = 3;
const DEFAULT_SETUP_BROWSER_SCATTERED_MAX_FILES = 50;
const DEFAULT_SETUP_BROWSER_SCATTERED_MAX_DEPTH = 4;
const DEFAULT_SETUP_BROWSER_PROJECT_SCAN_MAX_FILES = 500;
const DEFAULT_SETUP_BROWSER_PROJECT_SCAN_MAX_DEPTH = 5;
const DEFAULT_ARTIFACT_DOCUMENT_MAX_UNITS = 1e3;
const DEFAULT_ARTIFACT_DOCUMENT_MAX_DEPTH = 8;
const ARTIFACT_DOCUMENT_SKIP_SUBDIRS = [
  ...SETUP_BROWSER_SKIP_SUBDIRS,
  ".next",
  ".turbo",
  ".venv",
  "coverage",
  "target",
  "vendor",
  "venv"
];
const ARTIFACT_DOCUMENT_MANAGED_WORKTREE_ROOTS = [
  ".claude/worktrees",
  ".codex/worktrees",
  ".codex/workspaces",
  ".cursor/worktrees"
];
const ARTIFACT_DOCUMENT_PARSER_VERSION = "artifact-document-path-1";
const ARTIFACT_DOCUMENT_SCANNER_VERSION = "artifact-project-documents-2";
const SETUP_BROWSER_CONTENT_FILE_RE = /\.(md|mdc|markdown|txt|toml|ya?ml|json)$/i;
function throwIfSetupBrowserScanAborted(signal) {
  if (!signal?.aborted) return;
  const error = new Error("setup scan aborted");
  error.name = "AbortError";
  throw error;
}
const DEFAULT_SETUP_DEV_FORMAT_MAX_CHILDREN = 160;
function isSetupBrowserCategoryDir(name) {
  return SETUP_BROWSER_CATEGORY_DIRS.includes(name);
}
function isSetupBrowserStructuredConfigName(rootName, name) {
  const names = SETUP_BROWSER_STRUCTURED_CONFIG_NAMES_BY_ROOT[rootName.toLowerCase()];
  return names?.includes(name.toLowerCase()) ?? false;
}
function shouldSkipSetupBrowserSubdir(name) {
  return SETUP_BROWSER_SKIP_SUBDIRS.includes(name);
}
function isSetupBrowserContentFileName(name) {
  return SETUP_BROWSER_CONTENT_FILE_RE.test(name);
}
const ARTIFACT_DOCUMENT_RE = /\.(md|mdx|mdc|markdown)$/i;
function isArtifactDocumentFileName(name) {
  return ARTIFACT_DOCUMENT_RE.test(name);
}
function shouldSkipArtifactDocumentSubdir(name) {
  return ARTIFACT_DOCUMENT_SKIP_SUBDIRS.includes(name);
}
function isArtifactDocumentManagedWorktreePath(path) {
  const normalized = path.replace(/\\/g, "/").replace(/^\.\//, "").replace(/\/+$/, "").toLowerCase();
  return ARTIFACT_DOCUMENT_MANAGED_WORKTREE_ROOTS.some(
    (root) => normalized === root || normalized.startsWith(`${root}/`)
  );
}
function isArtifactDocumentWorkspaceTemplatePath(path) {
  const segments = path.replace(/\\/g, "/").replace(/^\.\//, "").replace(/\/+$/, "").toLowerCase().split("/");
  return segments.some(
    (segment, index) => segment === "workspace" && (segments[index + 1] === "template" || segments[index + 1] === "templates")
  );
}
function artifactProviderFromPath(path) {
  const normalized = path.replace(/\\/g, "/");
  const segments = normalized.toLowerCase().split("/");
  if (segments.includes(".claude")) return "claude";
  if (segments.includes(".codex")) return "codex";
  if (segments.includes(".cursor")) return "cursor";
  const file = segments[segments.length - 1];
  if (file === "claude.md" || file === "claude.local.md") return "claude";
  if (file === "agents.md" || file === "agents.local.md" || file === "codex.md") return "codex";
  if (file === "cursor.md" || file === ".cursorrules") return "cursor";
  return void 0;
}
function classifyArtifactDocumentPath(path, options = {}) {
  const normalized = path.replace(/\\/g, "/");
  const segments = normalized.toLowerCase().split("/");
  const file = segments[segments.length - 1];
  const provider = artifactProviderFromPath(normalized);
  const harnessRootIndex = segments.findIndex(
    (segment) => [".claude", ".codex", ".cursor", ".agents"].includes(segment)
  );
  const harnessSegments = harnessRootIndex >= 0 ? segments.slice(harnessRootIndex + 1) : [];
  if (harnessSegments.includes("rules")) return { kind: "instruction", provider };
  if (harnessSegments.includes("agents")) return { kind: "sub-agent", provider };
  if (harnessSegments.includes("commands")) return { kind: "command", provider };
  if (harnessSegments.includes("hooks")) return { kind: "hook", provider };
  if (file === "agents.md" || file === "agents.local.md") {
    return { kind: "instruction", provider };
  }
  if (file === "claude.md" || file === "claude.local.md" || file === "codex.md" || file === "cursor.md" || file === ".cursorrules") {
    return { kind: "instruction", provider };
  }
  if (file === "skill.md" && !options.containedBySkill) return { kind: "skill", provider };
  if (file === "skill.md") return { kind: "instruction", provider };
  return { kind: "knowledge", provider };
}
function setupBrowserCategoryOrder(name) {
  const idx = CONFIG_CATEGORY_ORDER.indexOf(name);
  return idx === -1 ? CONFIG_CATEGORY_ORDER.length : idx;
}
function configCategory(name) {
  const key = name.toLowerCase();
  return Object.hasOwn(CONFIG_CATEGORY_BY_NAME, key) ? CONFIG_CATEGORY_BY_NAME[key] : void 0;
}
function isConfigName(name) {
  return Object.hasOwn(CONFIG_CATEGORY_BY_NAME, name.toLowerCase());
}
const CONFIG_SOURCE_BY_NAME = {
  "claude.md": "claude",
  "claude.local.md": "claude",
  "cursor.md": "cursor",
  ".cursorrules": "cursor",
  "codex.md": "codex"
};
function configSource(name) {
  const key = name.toLowerCase();
  return Object.hasOwn(CONFIG_SOURCE_BY_NAME, key) ? CONFIG_SOURCE_BY_NAME[key] : void 0;
}
const READABLE_EXT_RE = /\.(md|mdc|markdown|txt|toml|ya?ml|json|jsonl|sh|bash|py|ts|tsx|js|jsx|css|html|xml|sql|log)$/i;
function isReadableFileName(name) {
  return READABLE_EXT_RE.test(name) || isConfigName(name);
}
function isSetupDevFormatReadableFileName(name) {
  return isReadableFileName(name) || name.toLowerCase() === "settings";
}
function approxSetupBrowserTokens(text) {
  return Math.max(0, Math.round(text.length / 4));
}
async function setupBrowserTokensForFile(path, fs) {
  try {
    return approxSetupBrowserTokens(await fs.readFile(path));
  } catch {
    return void 0;
  }
}
async function setupBrowserDirectoryListing(dir, fs) {
  if (fs.readdirEntries) {
    const values = await fs.readdirEntries(dir);
    return {
      names: values.map((entry) => entry.name),
      entries: new Map(values.map((entry) => [entry.name, entry]))
    };
  }
  return { names: await fs.readdir(dir) };
}
async function setupBrowserEntryStat(child, name, listing, fs) {
  const entry = listing.entries?.get(name);
  if (entry && (entry.isDirectory() || entry.isFile())) return entry;
  return fs.stat(child);
}
async function resolveSetupBrowserContentPath(entryPath, deps) {
  if (await setupBrowserSafeIsFile(entryPath, deps.fs)) {
    return isSetupBrowserContentFileName(entryPath) ? entryPath : void 0;
  }
  if (!await setupBrowserSafeIsDir(entryPath, deps.fs)) return void 0;
  for (const name of SETUP_BROWSER_PREFERRED_CONTENT_FILES) {
    const candidate = deps.path.join(entryPath, name);
    if (await setupBrowserSafeIsFile(candidate, deps.fs)) return candidate;
  }
  let kids;
  try {
    kids = await deps.fs.readdir(entryPath);
  } catch {
    return void 0;
  }
  const md = kids.find((name) => /\.md$/i.test(name));
  return md ? deps.path.join(entryPath, md) : void 0;
}
async function walkSetupBrowserEntryFiles(root, deps) {
  const maxFiles = deps.maxFiles ?? DEFAULT_SETUP_BROWSER_MAX_ENTRY_FILES;
  const maxDepth = deps.maxDepth ?? DEFAULT_SETUP_BROWSER_MAX_ENTRY_WALK_DEPTH;
  const results = [];
  async function recurse(dir, depth) {
    throwIfSetupBrowserScanAborted(deps.signal);
    if (results.length >= maxFiles) return;
    if (depth > maxDepth) return;
    let listing;
    try {
      listing = await setupBrowserDirectoryListing(dir, deps.fs);
    } catch {
      return;
    }
    const kids = listing.names;
    kids.sort((a, b) => a.localeCompare(b));
    for (const name of kids) {
      throwIfSetupBrowserScanAborted(deps.signal);
      if (results.length >= maxFiles) return;
      if (name.startsWith(".")) continue;
      if (shouldSkipSetupBrowserSubdir(name)) continue;
      const child = deps.path.join(dir, name);
      let st;
      try {
        st = await setupBrowserEntryStat(child, name, listing, deps.fs);
      } catch {
        continue;
      }
      if (st.isDirectory()) {
        await recurse(child, depth + 1);
      } else if (st.isFile() && READABLE_EXT_RE.test(name)) {
        results.push({
          relPath: child.startsWith(root + deps.path.sep) ? child.slice(root.length + 1) : name,
          absPath: child,
          tokens: deps.summaryOnly ? void 0 : await setupBrowserTokensForFile(child, deps.fs)
        });
      }
    }
  }
  await recurse(root, 0);
  return results;
}
async function listSetupBrowserCategoryEntries(dir, deps) {
  let names;
  try {
    names = await deps.fs.readdir(dir);
  } catch {
    return [];
  }
  const filtered = names.filter((name) => {
    if (name.startsWith(".")) return false;
    if (name.endsWith(".json") && name !== "package.json") return false;
    return true;
  });
  filtered.sort((a, b) => a.localeCompare(b));
  const entries = [];
  for (const name of filtered) {
    throwIfSetupBrowserScanAborted(deps.signal);
    const entryPath = deps.path.join(dir, name);
    const isDir = await setupBrowserSafeIsDir(entryPath, deps.fs);
    const contentPath = await resolveSetupBrowserContentPath(entryPath, deps);
    if (!isDir) {
      const tokens2 = contentPath ? deps.summaryOnly ? void 0 : await setupBrowserTokensForFile(contentPath, deps.fs) : void 0;
      entries.push({ name, contentPath, tokens: tokens2 });
      continue;
    }
    const files = deps.summaryOnly ? void 0 : await walkSetupBrowserEntryFiles(entryPath, deps);
    const tokens = files?.reduce((n, f) => n + (f.tokens ?? 0), 0) || void 0;
    entries.push({ name, contentPath, tokens, files });
  }
  return entries;
}
async function listSetupBrowserHarnessCategories(root, deps) {
  const categories = [];
  for (const name of SETUP_BROWSER_CATEGORY_DIRS) {
    throwIfSetupBrowserScanAborted(deps.signal);
    const sub = deps.path.join(root, name);
    if (!await setupBrowserSafeIsDir(sub, deps.fs)) continue;
    const entries = await listSetupBrowserCategoryEntries(sub, deps);
    if (entries.length === 0) continue;
    categories.push({ name, entries });
  }
  return categories;
}
function discoveredArtifact(identity, input) {
  return {
    ...identity,
    id: artifactId(identity),
    name: input.name,
    kind: input.kind,
    influence: influenceForArtifactKind(input.kind),
    composition: input.composition,
    enabled: input.enabled,
    effective: input.enabled === false ? false : void 0,
    metadata: input.metadata,
    parserVersion: input.parserVersion,
    scannerVersion: input.scannerVersion
  };
}
function artifactKindForCategory(category) {
  switch (category) {
    case "skills":
      return "skill";
    case "agents":
      return "sub-agent";
    case "commands":
      return "command";
    case "hooks":
      return "hook";
    case "rules":
      return "instruction";
    default:
      return "unknown";
  }
}
function harnessCategoryArtifacts(source, root, categories, path) {
  const artifacts = [];
  const artifactRelationships = [];
  const globalRootName = harnessHomeDir(source).replace(/\\/g, "/").replace(/\/$/, "");
  for (const category of categories) {
    const kind = artifactKindForCategory(category.name);
    for (const entry of category.entries) {
      const runtimePath = path.join(root, category.name, entry.name);
      const sourcePath = `${globalRootName}/${category.name}/${entry.name}`;
      const composite = Boolean(entry.files?.length) || kind === "skill";
      const parent = discoveredArtifact(
        {
          scope: "global",
          provider: source,
          source: composite ? { type: "directory", path: sourcePath, runtimePath } : {
            type: "file",
            path: sourcePath,
            runtimePath: entry.contentPath ?? runtimePath
          }
        },
        {
          name: entry.name,
          kind,
          composition: composite ? "composite" : "atomic",
          parserVersion: ARTIFACT_DOCUMENT_PARSER_VERSION,
          scannerVersion: ARTIFACT_DOCUMENT_SCANNER_VERSION
        }
      );
      artifacts.push(parent);
      for (const file of entry.files ?? []) {
        if (!isArtifactDocumentFileName(file.relPath)) continue;
        const childPath = `${sourcePath}/${file.relPath.replace(/\\/g, "/")}`;
        const classification = classifyArtifactDocumentPath(childPath, {
          containedBySkill: kind === "skill"
        });
        const child = discoveredArtifact(
          {
            scope: "global",
            provider: source,
            source: { type: "file", path: childPath, runtimePath: file.absPath }
          },
          {
            name: file.relPath,
            kind: classification.kind,
            composition: "atomic",
            parserVersion: ARTIFACT_DOCUMENT_PARSER_VERSION,
            scannerVersion: ARTIFACT_DOCUMENT_SCANNER_VERSION
          }
        );
        artifacts.push(child);
        artifactRelationships.push({
          fromUnitId: parent.id,
          toUnitId: child.id,
          kind: "contains",
          evidence: "confirmed"
        });
      }
    }
  }
  return { artifacts, artifactRelationships };
}
async function installedPluginArtifacts(source, root, deps) {
  if (source !== "codex" && source !== "claude") return { units: [], relationships: [] };
  const cacheRoot = deps.path.join(root, "plugins", "cache");
  if (!await setupBrowserSafeIsDir(cacheRoot, deps.fs)) return { units: [], relationships: [] };
  const marketplaceNames = (await deps.fs.readdir(cacheRoot)).filter((name) => !name.startsWith(".")).sort().slice(0, 64);
  const units = [];
  const relationships = [];
  const maxProvidedUnitsPerPlugin = 512;
  for (const marketplace of marketplaceNames) {
    const marketplacePath = deps.path.join(cacheRoot, marketplace);
    if (!await setupBrowserSafeIsDir(marketplacePath, deps.fs)) continue;
    const pluginNames = (await deps.fs.readdir(marketplacePath)).filter((name) => !name.startsWith(".")).sort().slice(0, 256);
    for (const plugin of pluginNames) {
      const pluginPath = deps.path.join(marketplacePath, plugin);
      if (!await setupBrowserSafeIsDir(pluginPath, deps.fs)) continue;
      const versionNames = (await deps.fs.readdir(pluginPath)).filter((name) => !name.startsWith(".")).sort((left, right) => right.localeCompare(left, void 0, { numeric: true }));
      const version = versionNames[0];
      const runtimePath = version ? deps.path.join(pluginPath, version) : pluginPath;
      if (version && !await setupBrowserSafeIsDir(runtimePath, deps.fs)) continue;
      const packageId = `${plugin}@${marketplace}`;
      const portablePath2 = `${harnessHomeDir(source).replace(/\\/g, "/")}/plugins/cache/${marketplace}/${plugin}`;
      const pluginUnit = discoveredArtifact(
        {
          scope: "global",
          provider: source,
          source: {
            type: "installed-package",
            packageId,
            version,
            path: portablePath2,
            runtimePath
          }
        },
        {
          name: plugin,
          kind: "plugin",
          composition: "composite",
          metadata: { packageId, marketplace, installed: true, ...version ? { version } : {} },
          parserVersion: STRUCTURED_ARTIFACT_PARSER_VERSION,
          scannerVersion: STRUCTURED_ARTIFACT_SCANNER_VERSION
        }
      );
      units.push(pluginUnit);
      let providedUnitCount = 0;
      for (const category of SETUP_BROWSER_CATEGORY_DIRS) {
        if (providedUnitCount >= maxProvidedUnitsPerPlugin) break;
        const categoryPath = deps.path.join(runtimePath, category);
        if (!await setupBrowserSafeIsDir(categoryPath, deps.fs)) continue;
        const entryNames = (await deps.fs.readdir(categoryPath)).filter((name) => !name.startsWith(".")).sort().slice(0, maxProvidedUnitsPerPlugin - providedUnitCount);
        for (const entryName of entryNames) {
          const entryRuntimePath = deps.path.join(categoryPath, entryName);
          let stat;
          try {
            stat = await deps.fs.stat(entryRuntimePath);
          } catch {
            continue;
          }
          if (!stat.isDirectory() && !stat.isFile()) continue;
          const entrySourcePath = `${portablePath2}/${category}/${entryName}`;
          const providedUnit = discoveredArtifact(
            {
              scope: "global",
              provider: source,
              source: stat.isDirectory() ? { type: "directory", path: entrySourcePath, runtimePath: entryRuntimePath } : { type: "file", path: entrySourcePath, runtimePath: entryRuntimePath }
            },
            {
              name: entryName,
              kind: artifactKindForCategory(category),
              composition: stat.isDirectory() ? "composite" : "atomic",
              metadata: { providedBy: packageId },
              parserVersion: ARTIFACT_DOCUMENT_PARSER_VERSION,
              scannerVersion: ARTIFACT_DOCUMENT_SCANNER_VERSION
            }
          );
          units.push(providedUnit);
          relationships.push({
            fromUnitId: pluginUnit.id,
            toUnitId: providedUnit.id,
            kind: "provides",
            evidence: "confirmed"
          });
          providedUnitCount += 1;
        }
      }
    }
  }
  return { units, relationships };
}
function mergeInstalledPluginUnits(target, installed) {
  const remappedIds = /* @__PURE__ */ new Map();
  for (const candidate of installed.units.filter((unit2) => unit2.kind === "plugin")) {
    const candidatePackageId = String(candidate.metadata?.packageId ?? "");
    const declared = target.artifacts.find((unit2) => {
      if (unit2.kind !== "plugin" || unit2.source.type !== "config-entry") return false;
      const declaredPackageId = String(unit2.metadata?.packageId ?? unit2.name);
      return declaredPackageId === candidatePackageId || declaredPackageId.split("@")[0] === candidatePackageId.split("@")[0];
    });
    if (declared) {
      declared.metadata = { ...declared.metadata, ...candidate.metadata };
      remappedIds.set(candidate.id, declared.id);
      continue;
    }
    target.artifacts.push(candidate);
  }
  for (const candidate of installed.units.filter((unit2) => unit2.kind !== "plugin")) {
    if (!target.artifacts.some((unit2) => unit2.id === candidate.id)) target.artifacts.push(candidate);
  }
  target.artifactRelationships.push(
    ...installed.relationships.map((relationship) => ({
      ...relationship,
      fromUnitId: remappedIds.get(relationship.fromUnitId) ?? relationship.fromUnitId,
      toUnitId: remappedIds.get(relationship.toUnitId) ?? relationship.toUnitId
    }))
  );
}
async function readStructuredArtifacts(path, parser, fs) {
  if (!await setupBrowserSafeIsFile(path, fs)) {
    return { units: [], relationships: [], diagnostics: [] };
  }
  try {
    return parser(await fs.readFile(path));
  } catch (error) {
    return {
      units: [],
      relationships: [],
      diagnostics: [
        {
          sourcePath: path,
          severity: "error",
          code: "parse-error",
          message: error instanceof Error ? error.message : String(error)
        }
      ]
    };
  }
}
function mergeStructuredArtifacts(target, addition) {
  const existing = new Set(target.artifacts.map((unit2) => unit2.id));
  for (const unit2 of addition.units) {
    if (!existing.has(unit2.id)) target.artifacts.push(unit2);
  }
  target.artifactRelationships.push(...addition.relationships);
  target.artifactDiagnostics.push(...addition.diagnostics);
}
async function scanSetupBrowserHarness(source, root, deps) {
  const exists = await setupBrowserSafeIsDir(root, deps.fs);
  if (!exists) {
    return {
      source,
      path: "",
      exists: false,
      categories: [],
      artifacts: [],
      artifactRelationships: [],
      artifactDiagnostics: []
    };
  }
  const categories = await listSetupBrowserHarnessCategories(root, deps);
  const categoryUnits = harnessCategoryArtifacts(source, root, categories, deps.path);
  const result = {
    source,
    path: root,
    exists: true,
    categories,
    ...categoryUnits,
    artifactDiagnostics: []
  };
  const sourcePathRoot = harnessHomeDir(source).replace(/\\/g, "/");
  if (source === "codex") {
    const configPath = deps.path.join(root, "config.toml");
    mergeStructuredArtifacts(
      result,
      await readStructuredArtifacts(
        configPath,
        (content) => parseCodexConfigArtifacts(content, {
          scope: "global",
          sourcePath: `${sourcePathRoot}/config.toml`,
          runtimePath: configPath
        }),
        deps.fs
      )
    );
  } else if (source === "claude") {
    const settingsPath = deps.path.join(root, "settings.json");
    mergeStructuredArtifacts(
      result,
      await readStructuredArtifacts(
        settingsPath,
        (content) => parseClaudeSettingsArtifacts(content, {
          scope: "global",
          sourcePath: `${sourcePathRoot}/settings.json`,
          runtimePath: settingsPath
        }),
        deps.fs
      )
    );
  }
  mergeInstalledPluginUnits(result, await installedPluginArtifacts(source, root, deps));
  return result;
}
async function scanSetupBrowserHarnesses(deps) {
  const scans = await Promise.all(
    deps.sources.map(
      (source) => scanSetupBrowserHarness(source, deps.path.join(deps.home, harnessHomeDir(source)), deps)
    )
  );
  const existing = scans.filter((harness) => harness.exists);
  const claude = existing.find((harness) => harness.source === "claude");
  if (claude) {
    const userConfigPath = deps.path.join(deps.home, ".claude.json");
    mergeStructuredArtifacts(
      claude,
      await readStructuredArtifacts(
        userConfigPath,
        (content) => parseClaudeMcpArtifacts(content, {
          scope: "global",
          sourcePath: ".claude.json",
          runtimePath: userConfigPath
        }),
        deps.fs
      )
    );
  }
  return existing;
}
async function walkSetupBrowserScatteredConfigFiles(root, deps) {
  const maxFiles = deps.maxFiles ?? DEFAULT_SETUP_BROWSER_SCATTERED_MAX_FILES;
  const maxDepth = deps.maxDepth ?? DEFAULT_SETUP_BROWSER_SCATTERED_MAX_DEPTH;
  const results = [];
  async function recurse(dir, depth) {
    throwIfSetupBrowserScanAborted(deps.signal);
    if (results.length >= maxFiles) return;
    if (depth > maxDepth) return;
    let listing;
    try {
      listing = await setupBrowserDirectoryListing(dir, deps.fs);
    } catch {
      return;
    }
    const kids = listing.names;
    kids.sort((a, b) => a.localeCompare(b));
    for (const name of kids) {
      throwIfSetupBrowserScanAborted(deps.signal);
      if (results.length >= maxFiles) return;
      if (shouldSkipSetupBrowserSubdir(name)) continue;
      const child = deps.path.join(dir, name);
      let st;
      try {
        st = await setupBrowserEntryStat(child, name, listing, deps.fs);
      } catch {
        continue;
      }
      if (st.isFile() && isConfigName(name)) {
        results.push({
          relPath: child.startsWith(root + deps.path.sep) ? child.slice(root.length + 1) : name,
          absPath: child,
          tokens: deps.summaryOnly ? void 0 : await setupBrowserTokensForFile(child, deps.fs)
        });
      } else if (st.isDirectory()) {
        if (name.startsWith(".")) continue;
        await recurse(child, depth + 1);
      }
    }
  }
  await recurse(root, 0);
  return results;
}
async function collectSetupBrowserScatteredEntries(root, deps) {
  const maxFiles = deps.maxFiles ?? DEFAULT_SETUP_BROWSER_PROJECT_SCAN_MAX_FILES;
  const maxDepth = deps.maxDepth ?? DEFAULT_SETUP_BROWSER_PROJECT_SCAN_MAX_DEPTH;
  const found = [];
  async function recurse(dir, depth) {
    throwIfSetupBrowserScanAborted(deps.signal);
    if (found.length >= maxFiles) return;
    if (depth > maxDepth) return;
    let listing;
    try {
      listing = await setupBrowserDirectoryListing(dir, deps.fs);
    } catch {
      return;
    }
    const names = listing.names;
    names.sort((a, b) => a.localeCompare(b));
    const skillFile = names.find((name) => name.toLowerCase() === "skill.md");
    if (skillFile) {
      const files = deps.summaryOnly ? void 0 : await walkSetupBrowserEntryFiles(dir, deps);
      const contentPath = await resolveSetupBrowserContentPath(dir, deps);
      const tokens = files?.reduce((n, f) => n + (f.tokens ?? 0), 0) || void 0;
      found.push({
        category: "skills",
        entry: {
          name: setupBrowserPathLeaf(dir, deps.path.sep),
          contentPath,
          tokens,
          files,
          source: configSource(skillFile)
        }
      });
      return;
    }
    const subdirs = [];
    for (const name of names) {
      throwIfSetupBrowserScanAborted(deps.signal);
      if (found.length >= maxFiles) return;
      if (shouldSkipSetupBrowserSubdir(name)) continue;
      if (isSetupBrowserSourceDirSegment(name, deps.sources)) continue;
      const child = deps.path.join(dir, name);
      let st;
      try {
        st = await setupBrowserEntryStat(child, name, listing, deps.fs);
      } catch {
        continue;
      }
      if (st.isDirectory()) {
        subdirs.push(child);
        continue;
      }
      if (!st.isFile()) continue;
      const category = configCategory(name);
      if (!category) continue;
      const rel = child.startsWith(root + deps.path.sep) ? child.slice(root.length + 1) : name;
      found.push({
        category,
        entry: {
          name: rel,
          contentPath: child,
          tokens: deps.summaryOnly ? void 0 : await setupBrowserTokensForFile(child, deps.fs),
          source: configSource(name)
        }
      });
    }
    for (const child of subdirs) {
      throwIfSetupBrowserScanAborted(deps.signal);
      if (found.length >= maxFiles) return;
      await recurse(child, depth + 1);
    }
  }
  await recurse(root, 0);
  return found;
}
function projectArtifact(input) {
  const identity = {
    scope: "project",
    provider: input.provider,
    projectId: input.projectId,
    workspaceLocationId: input.workspaceLocationId,
    source: input.source
  };
  return {
    ...identity,
    id: artifactId(identity),
    name: input.name,
    kind: input.kind,
    influence: influenceForArtifactKind(input.kind),
    composition: input.composition,
    parserVersion: ARTIFACT_DOCUMENT_PARSER_VERSION,
    scannerVersion: ARTIFACT_DOCUMENT_SCANNER_VERSION
  };
}
async function discoverProjectAgentDocumentUnits(root, deps) {
  const maxUnits = deps.maxUnits ?? DEFAULT_ARTIFACT_DOCUMENT_MAX_UNITS;
  const maxDepth = deps.maxDepth ?? DEFAULT_ARTIFACT_DOCUMENT_MAX_DEPTH;
  const units = [];
  const relationships = [];
  let truncated = false;
  function relativePath(path) {
    return path.startsWith(root + deps.path.sep) ? path.slice(root.length + 1) : path;
  }
  function pushUnit(unit2, containingUnitId) {
    if (units.length >= maxUnits) {
      truncated = true;
      return false;
    }
    units.push(unit2);
    if (containingUnitId) {
      relationships.push({
        fromUnitId: containingUnitId,
        toUnitId: unit2.id,
        kind: "contains",
        evidence: "confirmed"
      });
    }
    return true;
  }
  async function recurse(dir, depth, containingUnitId) {
    throwIfSetupBrowserScanAborted(deps.signal);
    if (units.length >= maxUnits) {
      truncated = true;
      return;
    }
    let listing;
    try {
      listing = await setupBrowserDirectoryListing(dir, deps.fs);
    } catch {
      return;
    }
    const names = listing.names.sort((left, right) => left.localeCompare(right));
    const skillFile = names.find((name) => name.toLowerCase() === "skill.md");
    let currentContainerId = containingUnitId;
    if (skillFile) {
      const skillPath = relativePath(dir) || ".";
      const classification = classifyArtifactDocumentPath(deps.path.join(skillPath, skillFile));
      const skill = projectArtifact({
        name: setupBrowserPathLeaf(dir, deps.path.sep),
        kind: "skill",
        composition: "composite",
        provider: classification.provider,
        projectId: deps.projectId,
        workspaceLocationId: deps.workspaceLocationId,
        source: { type: "directory", path: skillPath, runtimePath: dir }
      });
      if (!pushUnit(skill, containingUnitId)) return;
      currentContainerId = skill.id;
    }
    const subdirs = [];
    for (const name of names) {
      throwIfSetupBrowserScanAborted(deps.signal);
      if (units.length >= maxUnits) {
        truncated = true;
        return;
      }
      if (shouldSkipArtifactDocumentSubdir(name)) continue;
      const child = deps.path.join(dir, name);
      const childRelativePath = relativePath(child);
      if (isArtifactDocumentManagedWorktreePath(childRelativePath) || isArtifactDocumentWorkspaceTemplatePath(childRelativePath)) {
        continue;
      }
      const listedEntry = listing.entries?.get(name);
      if (listedEntry && !listedEntry.isDirectory() && !listedEntry.isFile()) continue;
      let stat;
      try {
        stat = await setupBrowserEntryStat(child, name, listing, deps.fs);
      } catch {
        continue;
      }
      if (stat.isDirectory()) {
        subdirs.push(child);
        continue;
      }
      if (!stat.isFile() || !isArtifactDocumentFileName(name)) continue;
      const relPath = relativePath(child);
      const classification = classifyArtifactDocumentPath(relPath, {
        containedBySkill: Boolean(currentContainerId && skillFile)
      });
      const unit2 = projectArtifact({
        name: currentContainerId ? name : relPath,
        kind: classification.kind,
        composition: "atomic",
        provider: classification.provider,
        projectId: deps.projectId,
        workspaceLocationId: deps.workspaceLocationId,
        source: { type: "file", path: relPath, runtimePath: child }
      });
      if (!pushUnit(unit2, currentContainerId)) return;
    }
    if (subdirs.length > 0 && depth >= maxDepth) return;
    for (const child of subdirs) {
      await recurse(child, depth + 1, currentContainerId);
      if (units.length >= maxUnits) return;
    }
  }
  if (await setupBrowserSafeIsDir(root, deps.fs)) await recurse(root, 0);
  return { units, relationships, truncated };
}
async function scanSetupBrowserProject(root, deps) {
  const exists = await setupBrowserSafeIsDir(root, deps.fs);
  if (!exists) {
    return {
      harnesses: [],
      scattered: [],
      categories: [],
      artifacts: [],
      artifactRelationships: [],
      artifactDiagnostics: [],
      artifactsTruncated: false
    };
  }
  const harnesses = [];
  const harnessEntries = [];
  for (const source of deps.sources) {
    throwIfSetupBrowserScanAborted(deps.signal);
    const harnessRoot = deps.path.join(root, `.${source}`);
    if (!await setupBrowserSafeIsDir(harnessRoot, deps.fs)) continue;
    const categories = await listSetupBrowserHarnessCategories(harnessRoot, deps);
    for (const category of categories) {
      for (const entry of category.entries) {
        harnessEntries.push({ category: category.name, entry: { ...entry, source } });
      }
    }
    if (categories.length > 0) {
      harnesses.push({
        source,
        path: harnessRoot,
        exists: true,
        categories,
        artifacts: [],
        artifactRelationships: [],
        artifactDiagnostics: []
      });
    }
  }
  const scattered = await walkSetupBrowserScatteredConfigFiles(root, deps);
  const scatteredEntries = (await collectSetupBrowserScatteredEntries(root, deps)).map(
    ({ category, entry }) => ({
      category,
      entry: { ...entry, source: entry.source }
    })
  );
  const artifactContext = deps.artifactContext;
  let artifacts = [];
  let artifactRelationships = [];
  let artifactDiagnostics = [];
  let artifactsTruncated = false;
  if (!deps.summaryOnly && artifactContext) {
    const documents = await discoverProjectAgentDocumentUnits(root, {
      fs: deps.fs,
      path: deps.path,
      projectId: artifactContext.projectId,
      workspaceLocationId: artifactContext.workspaceLocationId,
      signal: deps.signal
    });
    artifacts = documents.units;
    artifactRelationships = documents.relationships;
    artifactsTruncated = documents.truncated;
    if (documents.truncated) {
      artifactDiagnostics.push({
        sourcePath: root,
        severity: "warning",
        code: "truncated",
        message: "Project document discovery reached its configured limit."
      });
    }
    const structuredSpecs = [
      {
        sourcePath: ".codex/config.toml",
        parser: (content, runtimePath) => parseCodexConfigArtifacts(content, {
          scope: "project",
          projectId: artifactContext.projectId,
          workspaceLocationId: artifactContext.workspaceLocationId,
          sourcePath: ".codex/config.toml",
          runtimePath
        })
      },
      {
        sourcePath: ".mcp.json",
        parser: (content, runtimePath) => parseClaudeMcpArtifacts(content, {
          scope: "project",
          projectId: artifactContext.projectId,
          workspaceLocationId: artifactContext.workspaceLocationId,
          sourcePath: ".mcp.json",
          runtimePath
        })
      },
      ...[".claude/settings.json", ".claude/settings.local.json"].map((sourcePath) => ({
        sourcePath,
        parser: (content, runtimePath) => parseClaudeSettingsArtifacts(content, {
          scope: "project",
          projectId: artifactContext.projectId,
          workspaceLocationId: artifactContext.workspaceLocationId,
          sourcePath,
          runtimePath
        })
      }))
    ];
    for (const spec of structuredSpecs) {
      throwIfSetupBrowserScanAborted(deps.signal);
      const runtimePath = deps.path.join(root, spec.sourcePath);
      const structured = await readStructuredArtifacts(
        runtimePath,
        (content) => spec.parser(content, runtimePath),
        deps.fs
      );
      const seen = new Set(artifacts.map((unit2) => unit2.id));
      for (const unit2 of structured.units) {
        if (!seen.has(unit2.id)) artifacts.push(unit2);
      }
      artifactRelationships.push(...structured.relationships);
      artifactDiagnostics.push(...structured.diagnostics);
    }
  }
  return {
    harnesses,
    scattered,
    categories: groupSetupBrowserEntries([...harnessEntries, ...scatteredEntries]),
    artifacts,
    artifactRelationships,
    artifactDiagnostics,
    artifactsTruncated
  };
}
function summarizeSetupBrowserProjectScan(workspacePath, scan, scannedAt) {
  const counts = { skills: 0, agents: 0, commands: 0, hooks: 0, rules: 0 };
  let totalEntries = 0;
  for (const category of scan.categories) {
    const key = category.name.toLowerCase();
    if (key in counts) counts[key] += category.entries.length;
    totalEntries += category.entries.length;
  }
  return { workspacePath, ...counts, totalEntries, scannedAt };
}
function groupSetupBrowserEntries(items) {
  const byCategory = /* @__PURE__ */ new Map();
  const seen = /* @__PURE__ */ new Set();
  for (const { category, entry } of items) {
    const key = `${category}::${entry.contentPath ?? entry.name}`;
    if (seen.has(key)) continue;
    seen.add(key);
    const list = byCategory.get(category) ?? [];
    list.push(entry);
    byCategory.set(category, list);
  }
  return [...byCategory.entries()].sort(
    (a, b) => setupBrowserCategoryOrder(a[0]) - setupBrowserCategoryOrder(b[0]) || a[0].localeCompare(b[0])
  ).map(([name, entries]) => ({
    name,
    entries: entries.sort((a, b) => a.name.localeCompare(b.name))
  }));
}
function setupBrowserPathEquals(a, b, platform = "posix") {
  return platform === "win32" ? a.toLowerCase() === b.toLowerCase() : a === b;
}
function setupBrowserPathStartsWith(path, prefix, platform = "posix") {
  return platform === "win32" ? path.toLowerCase().startsWith(prefix.toLowerCase()) : path.startsWith(prefix);
}
function isAllowedSetupBrowserHarnessPath(resolved, policy) {
  if (setupBrowserPathEquals(resolved, `${policy.home}${policy.sep}.claude.json`, policy.platform)) {
    return true;
  }
  if (policy.systemRoots.some((root) => isAllowedSetupBrowserSystemRootPath(root, resolved, policy))) {
    return true;
  }
  if (setupBrowserPathStartsWith(resolved, policy.home + policy.sep, policy.platform)) {
    const segments = resolved.slice(policy.home.length + 1).split(policy.sep);
    return isAllowedSetupBrowserHarnessSegments(segments, policy.sources);
  }
  return false;
}
function isAllowedSetupBrowserSystemRootPath(root, resolved, policy) {
  if (setupBrowserPathEquals(resolved, root, policy.platform)) return true;
  if (!setupBrowserPathStartsWith(resolved, root + policy.sep, policy.platform)) return false;
  const segments = resolved.slice(root.length + 1).split(policy.sep);
  const finalSegment = segments[segments.length - 1] ?? "";
  const rootName = root.split(policy.sep).filter(Boolean).at(-1) ?? root;
  return isSetupBrowserCategoryDir(segments[0] ?? "") || segments.length === 1 && (isConfigName(finalSegment) || isSetupBrowserStructuredConfigName(rootName, finalSegment));
}
function isAllowedSetupBrowserHarnessSegments(segments, sources) {
  const finalSegment = segments[segments.length - 1] ?? "";
  if (isConfigName(finalSegment)) return true;
  const sourceDirIndex = segments.findIndex(
    (segment) => isSetupBrowserSourceDirSegment(segment, sources)
  );
  if (sourceDirIndex === -1) return false;
  const category = segments[sourceDirIndex + 1];
  return category === void 0 || isSetupBrowserCategoryDir(category);
}
function isAllowedSetupBrowserProjectPath(resolved, policy) {
  const root = policy.knownProjectRoots.find(
    (candidate) => setupBrowserPathEquals(resolved, candidate, policy.platform) || setupBrowserPathStartsWith(resolved, candidate + policy.sep, policy.platform)
  );
  if (!root) return false;
  return isReadableFileName(policy.basename(resolved));
}
function isSetupBrowserMissingFileError(err) {
  return typeof err === "object" && err !== null && "code" in err && err.code === "ENOENT";
}
function resolveAllowedSetupBrowserFilePath(absPath, deps) {
  const resolved = deps.path.resolve(absPath);
  if (deps.allowPath(resolved)) return resolved;
  throw new Error("path not allowed");
}
async function readAllowedSetupBrowserFile(absPath, deps) {
  const allowedPath = resolveAllowedSetupBrowserFilePath(absPath, deps);
  const st = await deps.fs.lstat(allowedPath);
  if (st.isSymbolicLink()) throw new Error("path not allowed");
  if (!st.isFile()) throw new Error("path is not a file");
  const realTarget = await deps.fs.realpath(allowedPath);
  if (!deps.allowPath(realTarget)) throw new Error("path not allowed");
  return deps.fs.readFile(realTarget);
}
async function writeAllowedSetupBrowserFile(absPath, content, deps) {
  const allowedPath = resolveAllowedSetupBrowserFilePath(absPath, deps);
  try {
    const st = await deps.fs.lstat(allowedPath);
    if (st.isSymbolicLink()) throw new Error("path not allowed");
    if (!st.isFile()) throw new Error("path is not a file");
    const realTarget = await deps.fs.realpath(allowedPath);
    if (!deps.allowPath(realTarget)) throw new Error("path not allowed");
    if (deps.expectedContent !== void 0) {
      const current = await deps.fs.readFile(realTarget);
      if (current !== deps.expectedContent) throw new SetupWriteConflictError(absPath);
    }
    await deps.fs.writeFile(realTarget, content);
    return;
  } catch (err) {
    if (err instanceof SetupWriteConflictError) throw err;
    if (!deps.allowCreate || !isSetupBrowserMissingFileError(err)) throw err;
    if (deps.expectedContent !== void 0) {
      throw new SetupWriteConflictError(absPath);
    }
    const parent = deps.path.dirname(allowedPath);
    const parentSt = await deps.fs.lstat(parent);
    if (parentSt.isSymbolicLink()) throw new Error("path not allowed");
    if (!parentSt.isDirectory()) throw new Error("parent is not a directory");
    const realParent = await deps.fs.realpath(parent);
    if (!deps.allowPath(deps.path.join(realParent, deps.path.basename(allowedPath)))) {
      throw new Error("path not allowed");
    }
  }
  await deps.fs.writeFile(allowedPath, content);
}
async function deleteAllowedSetupBrowserPath(absPath, expectedType, deps) {
  const allowedPath = resolveAllowedSetupBrowserFilePath(absPath, deps);
  const st = await deps.fs.lstat(allowedPath);
  if (st.isSymbolicLink()) throw new Error("path not allowed");
  if (expectedType === "file" && !st.isFile()) throw new Error("path is not a file");
  if (expectedType === "directory" && !st.isDirectory()) {
    throw new Error("path is not a directory");
  }
  if (expectedType === "either" && !st.isFile() && !st.isDirectory()) {
    throw new Error("path cannot be deleted");
  }
  const realTarget = await deps.fs.realpath(allowedPath);
  if (!deps.allowPath(realTarget)) throw new Error("path not allowed");
  if (st.isDirectory()) await deps.fs.removeDirectory(realTarget);
  else await deps.fs.removeFile(realTarget);
}
function isAllowedSetupDevFormatPath(resolved, policy) {
  return policy.roots.some(
    (root) => setupBrowserPathEquals(resolved, root, policy.platform) || setupBrowserPathStartsWith(resolved, root + policy.sep, policy.platform)
  );
}
function setupDevFormatNodeFromStat(path, name, st) {
  if (st.isDirectory()) {
    return {
      name,
      path,
      kind: "directory",
      mtimeMs: st.mtimeMs
    };
  }
  return {
    name,
    path,
    kind: "file",
    size: st.size,
    mtimeMs: st.mtimeMs,
    readable: isSetupDevFormatReadableFileName(name)
  };
}
async function listSetupDevFormatChildren(path, deps) {
  let st;
  try {
    st = await deps.fs.stat(path);
  } catch {
    return { children: [], truncated: false };
  }
  if (!st.isDirectory()) return { children: [], truncated: false };
  let entries;
  try {
    entries = await deps.fs.readdir(path);
  } catch {
    return { children: [], truncated: false };
  }
  entries.sort((a, b) => {
    const hiddenDelta = Number(a.startsWith(".")) - Number(b.startsWith("."));
    if (hiddenDelta !== 0) return hiddenDelta;
    return a.localeCompare(b);
  });
  const maxChildren = deps.maxChildren ?? DEFAULT_SETUP_DEV_FORMAT_MAX_CHILDREN;
  const truncated = entries.length > maxChildren;
  if (truncated) entries = entries.slice(0, maxChildren);
  const children = [];
  for (const entry of entries) {
    const childPath = deps.path.join(path, entry);
    try {
      children.push(setupDevFormatNodeFromStat(childPath, entry, await deps.fs.stat(childPath)));
    } catch {
    }
  }
  children.sort((a, b) => {
    if (a.kind !== b.kind) return a.kind === "directory" ? -1 : 1;
    return a.name.localeCompare(b.name);
  });
  return { children, truncated };
}
function isUnsafeSetupScanRoot(input) {
  const resolved = input.path.resolve(input.projectPath);
  const home = input.path.resolve(input.home);
  const rel = input.path.relative(resolved, home);
  if (input.path.isAbsolute(rel)) return false;
  return !rel.startsWith("..");
}
function isSetupBrowserSourceDirSegment(segment, sources) {
  return segment.startsWith(".") && sources.includes(segment.slice(1));
}
function setupBrowserPathLeaf(path, sep) {
  const parts = path.split(sep).filter(Boolean);
  return parts[parts.length - 1] ?? path;
}
async function setupBrowserSafeIsDir(path, fs) {
  try {
    return (await fs.stat(path)).isDirectory();
  } catch {
    return false;
  }
}
async function setupBrowserSafeIsFile(path, fs) {
  try {
    return (await fs.stat(path)).isFile();
  } catch {
    return false;
  }
}
Object.fromEntries(
  HARNESS_CATALOG.flatMap((harness) => harness.configDirs.map((dir) => [dir, harness.id]))
);
Object.fromEntries(
  HARNESS_CATALOG.flatMap((harness) => harness.docFiles.map((file) => [file, harness.id]))
);
const ALWAYS_ON_RULE_FILES = /* @__PURE__ */ new Set(["CLAUDE.md", "AGENTS.md", ".cursorrules", "rules.md"]);
function kindFromPath(path) {
  const segments = path.split("/");
  const file = segments[segments.length - 1];
  if (segments.includes("rules")) return "rule";
  if (ALWAYS_ON_RULE_FILES.has(file)) return "rule";
  if (segments.includes("skills")) return "skill";
  if (segments.includes("commands")) return "command";
  if (segments.includes("agents")) return "agent";
  if (segments.includes("hooks")) return "hook";
  if (file === "mcp.json" || file.endsWith(".mcp.json")) return "mcp";
  if (file === "auth.json") return "auth-layout";
  if (file === "usage.json") return "usage-layout";
  if (file === "settings.json" || file === "settings.local.json" || file === "config.toml")
    return "setting";
  if (file.endsWith(".md")) return "doc";
  return "unknown";
}
exports.HARNESSES = HARNESSES;
exports.HARNESS_CATALOG = HARNESS_CATALOG;
exports.KNOWN_AGENT_TOOLS = KNOWN_AGENT_TOOLS;
exports.SETUP_BROWSER_CATEGORY_DIRS = SETUP_BROWSER_CATEGORY_DIRS;
exports.deleteAllowedSetupBrowserPath = deleteAllowedSetupBrowserPath;
exports.harnessCliBinaryOverride = harnessCliBinaryOverride;
exports.harnessHomeDir = harnessHomeDir;
exports.harnessIds = harnessIds;
exports.harnessLabel = harnessLabel;
exports.harnessSetupGuide = harnessSetupGuide;
exports.isAllowedSetupBrowserHarnessPath = isAllowedSetupBrowserHarnessPath;
exports.isAllowedSetupBrowserProjectPath = isAllowedSetupBrowserProjectPath;
exports.isAllowedSetupBrowserSystemRootPath = isAllowedSetupBrowserSystemRootPath;
exports.isAllowedSetupDevFormatPath = isAllowedSetupDevFormatPath;
exports.isUnsafeSetupScanRoot = isUnsafeSetupScanRoot;
exports.kindFromPath = kindFromPath;
exports.listSetupDevFormatChildren = listSetupDevFormatChildren;
exports.parse = parse;
exports.readAllowedSetupBrowserFile = readAllowedSetupBrowserFile;
exports.removeStructuredArtifactConfigEntry = removeStructuredArtifactConfigEntry;
exports.scanSetupBrowserHarnesses = scanSetupBrowserHarnesses;
exports.scanSetupBrowserProject = scanSetupBrowserProject;
exports.setupDevFormatNodeFromStat = setupDevFormatNodeFromStat;
exports.summarizeSetupBrowserProjectScan = summarizeSetupBrowserProjectScan;
exports.writeAllowedSetupBrowserFile = writeAllowedSetupBrowserFile;
//# sourceMappingURL=index-TxTRDZxy.js.map

//# debugId=bfc30b59-4982-509b-94b3-e7acc3d4d261
