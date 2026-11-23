
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="e41766dc-f6f4-5f69-bafc-09ec0d43947f")}catch(e){}}();
const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./angular-html-Ca5ixmHM.js","./html-GC16tDh9.js","./javascript-BsAkV7mL.js","./css-BtVcDqlU.js","./angular-ts-BppQq056.js","./scss-Dq-LbI_c.js","./apl-CGZawg-A.js","./xml-BMzZeaqs.js","./java-BfXh-0uJ.js","./json-TjWBGEk1.js","./astro-BxdWOZvM.js","./typescript-CP6ECzON.js","./postcss-kj1IbjVd.js","./tsx-CmGGo4Hm.js","./blade-BbH7YAUi.js","./html-derivative-HU9p64q4.js","./sql-DzUuSofg.js","./bsl-DwPS0BId.js","./sdbl-BBUhycGU.js","./cairo-BtYx2aM5.js","./python-CrdIx4PZ.js","./cobol-B8r1pfPr.js","./coffee-XLjtuEYs.js","./cpp-zh2ePAE_.js","./regexp-BxWeO75u.js","./glsl-CGsiYPcu.js","./c-C4VtT7JA.js","./crystal-BqBRy7Ec.js","./shellscript-CQ8MXh-D.js","./edge-CnHxQ_FD.js","./elixir-B_LIBv5J.js","./elm-BlO7pcFp.js","./erb-Bzn22wO6.js","./ruby-C13Bjepi.js","./haml-DrIklt7F.js","./graphql-CwmtR1ib.js","./jsx-BPmvoin2.js","./lua-BVbbqwZC.js","./yaml-B_vW5iTY.js","./erlang-Ch5kuXHm.js","./markdown-F_EULe_G.js","./fortran-fixed-form-CpmOyvS5.js","./fortran-free-form-5X94ETMi.js","./fsharp-5vtGqRR9.js","./gdresource-B5TLWiFO.js","./gdshader-BEzE4j_3.js","./gdscript-CNW3Aj-d.js","./git-commit-PP9xCApN.js","./diff-BEdzuHlE.js","./git-rebase-D-XQSvDj.js","./glimmer-js-h2QNNiD7.js","./glimmer-ts-Bk3uX6Ae.js","./hack-BTX3ICIE.js","./handlebars-yWFGGD2R.js","./http-DjsOm9E4.js","./hurl-Am2cDU4f.js","./csv-Ba84L8e5.js","./hxml-Jle7oGdm.js","./haxe-BpobLYM9.js","./jinja-FkIlHBgj.js","./jison-BkdOIOd4.js","./julia-CU_UwNb8.js","./r-Dpdc-Kyk.js","./just-tGFryTtU.js","./perl-HITCDkgu.js","./latex-B0gTO9uZ.js","./tex-CGVqF8nD.js","./liquid-QmJ_LYTW.js","./marko-BAWrmNIa.js","./less-BAzLMJNR.js","./mdc-Ca0ft0PS.js","./nextflow-B166B-y1.js","./nextflow-groovy-BOO9s0iq.js","./nginx-BFAkI5_-.js","./nim-B3PAIZ4D.js","./php-C2HieitX.js","./pug-BwQB43qN.js","./qml-jtL8okyu.js","./razor-gBXW6YBJ.js","./csharp-DxX_6tHh.js","./rst-by6KAwTb.js","./cmake-CDfQILeU.js","./sas-BLBgC3TA.js","./shaderlab-C07uO3dL.js","./hlsl-TRzjajlb.js","./shellsession-CkeTp4M1.js","./soy-BHaHgMUy.js","./sparql-DswowMAp.js","./turtle-BnC7StHY.js","./stata-Dl7wDdBE.js","./surrealql-Bs3vUeKA.js","./svelte-fC0HkEkx.js","./templ-CSEiQwNm.js","./go-DRMr3iML.js","./ts-tags-cG2hZuda.js","./twig-CwEEYIBf.js","./vue-K-7Ga-y8.js","./vue-html-DhreShjd.js","./vue-vine-rMIwOpFf.js","./stylus-DXFa_2Jl.js","./xsl-CnwVr_6q.js"])))=>i.map(i=>d[i]);
import { hx as reactExports, gP as jsxRuntimeExports, jx as whitespace, il as svg, g9 as find, ih as stringify$1, ii as stringify$2, fv as ccount, gx as html$2, fd as __vitePreload } from "./index-nrW_ocxo.js";
const own$2 = {}.hasOwnProperty;
function zwitch(key2, options) {
  const settings = options || {};
  function one2(value, ...parameters) {
    let fn = one2.invalid;
    const handlers = one2.handlers;
    if (value && own$2.call(value, key2)) {
      const id = String(value[key2]);
      fn = own$2.call(handlers, id) ? handlers[id] : one2.unknown;
    }
    if (fn) {
      return fn.call(this, value, ...parameters);
    }
  }
  one2.handlers = settings.handlers || {};
  one2.invalid = settings.invalid;
  one2.unknown = settings.unknown;
  return one2;
}
const LINE_FEED = 10;
const CARRIAGE_RETURN = 13;
const DENSE_LINE_BREAK_BLOCK_SIZE = 4;
const DENSE_LINE_BREAK_BLOCK_SPAN = 40;
function computeLineOffsets(contents) {
  const offsets = [0];
  let carriageReturn = contents.indexOf("\r");
  let lineFeed = contents.indexOf("\n");
  let blockStart = 0;
  let blockBreaks = 0;
  while (carriageReturn !== -1 || lineFeed !== -1) {
    let nextOffset;
    if (carriageReturn !== -1 && (lineFeed === -1 || carriageReturn < lineFeed)) if (lineFeed === carriageReturn + 1) {
      nextOffset = lineFeed + 1;
      carriageReturn = contents.indexOf("\r", nextOffset);
      lineFeed = contents.indexOf("\n", nextOffset);
    } else {
      nextOffset = carriageReturn + 1;
      carriageReturn = contents.indexOf("\r", nextOffset);
    }
    else {
      nextOffset = lineFeed + 1;
      lineFeed = contents.indexOf("\n", nextOffset);
    }
    offsets.push(nextOffset);
    if (++blockBreaks === DENSE_LINE_BREAK_BLOCK_SIZE) {
      if (nextOffset - blockStart <= DENSE_LINE_BREAK_BLOCK_SPAN) {
        for (let i2 = nextOffset; i2 < contents.length; i2++) {
          const char = contents.charCodeAt(i2);
          if (char === LINE_FEED || char === CARRIAGE_RETURN) {
            if (char === CARRIAGE_RETURN && i2 + 1 < contents.length && contents.charCodeAt(i2 + 1) === LINE_FEED) i2++;
            offsets.push(i2 + 1);
          }
        }
        return offsets;
      }
      blockStart = nextOffset;
      blockBreaks = 0;
    }
  }
  return offsets;
}
function countLineBreaks(contents) {
  let count = 0;
  for (let i2 = 0; i2 < contents.length; i2++) {
    const char = contents.charCodeAt(i2);
    if (char === LINE_FEED || char === CARRIAGE_RETURN) {
      if (char === CARRIAGE_RETURN && i2 + 1 < contents.length && contents.charCodeAt(i2 + 1) === LINE_FEED) i2++;
      count++;
    }
  }
  return count;
}
function linesFromFileContents(contents) {
  const offsets = computeLineOffsets(contents);
  return Array.from({ length: offsets.length }, (_2, i2) => {
    const start = offsets[i2];
    const end = offsets[i2 + 1] ?? contents.length;
    return contents.slice(start, end);
  });
}
const callbacks = /* @__PURE__ */ new Set();
let frameId = null;
function queueRender(callback) {
  callbacks.add(callback);
  frameId ??= requestAnimationFrame(render);
}
function dequeueRender(callback) {
  if (callbacks.delete(callback) && callbacks.size === 0 && frameId != null) {
    cancelAnimationFrame(frameId);
    frameId = null;
  }
}
function render(time) {
  const toIterate = new Set(callbacks);
  callbacks.clear();
  for (const callback of toIterate) try {
    callback(time);
  } catch (error) {
    console.error(error);
  }
  if (callbacks.size > 0) frameId = requestAnimationFrame(render);
  else frameId = null;
}
function isGutterUtilityPath(path) {
  for (const element2 of path) {
    if (!(element2 instanceof HTMLElement)) continue;
    if (element2.hasAttribute("data-utility-button") || element2.hasAttribute("data-gutter-utility-slot") || element2.getAttribute("slot") === "gutter-utility-slot" || element2.getAttribute("name") === "gutter-utility-slot") return true;
  }
  return false;
}
const CUSTOM_EXTENSION_TO_FILE_FORMAT = /* @__PURE__ */ new Map();
const EXTENSION_TO_FILE_FORMAT = {
  "1c": "1c",
  abap: "abap",
  as: "actionscript-3",
  ada: "ada",
  adb: "ada",
  ads: "ada",
  adoc: "asciidoc",
  asciidoc: "asciidoc",
  "component.html": "angular-html",
  "component.ts": "angular-ts",
  conf: "nginx",
  htaccess: "apache",
  cls: "tex",
  trigger: "apex",
  apl: "apl",
  applescript: "applescript",
  scpt: "applescript",
  ara: "ara",
  asm: "asm",
  s: "riscv",
  astro: "astro",
  awk: "awk",
  bal: "ballerina",
  sh: "zsh",
  bash: "zsh",
  bat: "cmd",
  cmd: "cmd",
  be: "berry",
  beancount: "beancount",
  bib: "bibtex",
  bicep: "bicep",
  "blade.php": "blade",
  bsl: "bsl",
  c: "c",
  h: "objective-cpp",
  cs: "csharp",
  cpp: "cpp",
  hpp: "cpp",
  cc: "cpp",
  cxx: "cpp",
  hh: "cpp",
  cdc: "cdc",
  cairo: "cairo",
  clar: "clarity",
  clj: "clojure",
  cljs: "clojure",
  cljc: "clojure",
  soy: "soy",
  cmake: "cmake",
  "CMakeLists.txt": "cmake",
  cob: "cobol",
  cbl: "cobol",
  cobol: "cobol",
  CODEOWNERS: "codeowners",
  ql: "ql",
  coffee: "coffeescript",
  lisp: "lisp",
  cl: "lisp",
  lsp: "lisp",
  log: "log",
  v: "verilog",
  cql: "cql",
  cr: "crystal",
  css: "css",
  csv: "csv",
  cue: "cue",
  cypher: "cypher",
  cyp: "cypher",
  d: "d",
  dart: "dart",
  dax: "dax",
  desktop: "desktop",
  diff: "diff",
  patch: "diff",
  Dockerfile: "dockerfile",
  dockerfile: "dockerfile",
  env: "dotenv",
  dm: "dream-maker",
  edge: "edge",
  el: "emacs-lisp",
  ex: "elixir",
  exs: "elixir",
  elm: "elm",
  erb: "erb",
  erl: "erlang",
  hrl: "erlang",
  f: "fortran-fixed-form",
  for: "fortran-fixed-form",
  fs: "fsharp",
  fsi: "fsharp",
  fsx: "fsharp",
  f03: "f03",
  f08: "f08",
  f18: "f18",
  f77: "f77",
  f90: "fortran-free-form",
  f95: "fortran-free-form",
  fnl: "fennel",
  fish: "fish",
  ftl: "ftl",
  tres: "gdresource",
  res: "gdresource",
  gd: "gdscript",
  gdshader: "gdshader",
  gs: "genie",
  feature: "gherkin",
  COMMIT_EDITMSG: "git-commit",
  "git-rebase-todo": "git-rebase",
  gjs: "glimmer-js",
  gleam: "gleam",
  gts: "glimmer-ts",
  glsl: "glsl",
  vert: "glsl",
  frag: "glsl",
  shader: "shaderlab",
  gp: "gnuplot",
  plt: "gnuplot",
  gnuplot: "gnuplot",
  go: "go",
  graphql: "graphql",
  gql: "graphql",
  groovy: "groovy",
  gvy: "groovy",
  hack: "hack",
  haml: "haml",
  hbs: "handlebars",
  handlebars: "handlebars",
  hs: "haskell",
  lhs: "haskell",
  hx: "haxe",
  hcl: "hcl",
  hjson: "hjson",
  hlsl: "hlsl",
  fx: "hlsl",
  html: "html",
  htm: "html",
  http: "http",
  rest: "http",
  hxml: "hxml",
  hy: "hy",
  imba: "imba",
  ini: "ini",
  cfg: "ini",
  jade: "pug",
  pug: "pug",
  java: "java",
  js: "javascript",
  mjs: "javascript",
  cjs: "javascript",
  jinja: "jinja",
  jinja2: "jinja",
  j2: "jinja",
  jison: "jison",
  jl: "julia",
  json: "json",
  json5: "json5",
  jsonc: "jsonc",
  jsonl: "jsonl",
  jsonnet: "jsonnet",
  libsonnet: "jsonnet",
  jssm: "jssm",
  jsx: "jsx",
  kt: "kotlin",
  kts: "kts",
  kql: "kusto",
  tex: "tex",
  ltx: "tex",
  lean: "lean4",
  less: "less",
  liquid: "liquid",
  lit: "lit",
  ll: "llvm",
  logo: "logo",
  lua: "lua",
  luau: "luau",
  Makefile: "makefile",
  mk: "makefile",
  makefile: "makefile",
  md: "markdown",
  markdown: "markdown",
  marko: "marko",
  m: "wolfram",
  mat: "matlab",
  mdc: "mdc",
  mdx: "mdx",
  wiki: "wikitext",
  mediawiki: "wikitext",
  mmd: "mermaid",
  mermaid: "mermaid",
  mips: "mipsasm",
  mojo: "mojo",
  "🔥": "mojo",
  move: "move",
  nar: "narrat",
  nf: "nextflow",
  nim: "nim",
  nims: "nim",
  nimble: "nim",
  nix: "nix",
  nu: "nushell",
  mm: "objective-cpp",
  ml: "ocaml",
  mli: "ocaml",
  mll: "ocaml",
  mly: "ocaml",
  pas: "pascal",
  p: "pascal",
  pl: "prolog",
  pm: "perl",
  t: "perl",
  raku: "raku",
  p6: "raku",
  pl6: "raku",
  php: "php",
  phtml: "php",
  pls: "plsql",
  sql: "sql",
  po: "po",
  polar: "polar",
  pcss: "postcss",
  pot: "pot",
  potx: "potx",
  pq: "powerquery",
  pqm: "powerquery",
  ps1: "powershell",
  psm1: "powershell",
  psd1: "powershell",
  prisma: "prisma",
  pro: "prolog",
  P: "prolog",
  properties: "properties",
  proto: "protobuf",
  pp: "puppet",
  purs: "purescript",
  py: "python",
  pyw: "python",
  pyi: "python",
  qml: "qml",
  qmldir: "qmldir",
  qss: "qss",
  r: "r",
  R: "r",
  rkt: "racket",
  rktl: "racket",
  razor: "razor",
  cshtml: "razor",
  rb: "ruby",
  rbw: "ruby",
  reg: "reg",
  regex: "regexp",
  rel: "rel",
  rs: "rust",
  rst: "rst",
  rake: "ruby",
  gemspec: "ruby",
  jbuilder: "ruby",
  builder: "ruby",
  rabl: "ruby",
  arb: "ruby",
  ru: "ruby",
  podspec: "ruby",
  Gemfile: "ruby",
  Rakefile: "ruby",
  Guardfile: "ruby",
  Capfile: "ruby",
  Berksfile: "ruby",
  Brewfile: "ruby",
  Vagrantfile: "ruby",
  Thorfile: "ruby",
  Appraisals: "ruby",
  Dangerfile: "ruby",
  sas: "sas",
  sass: "sass",
  scala: "scala",
  sc: "scala",
  scm: "scheme",
  ss: "scheme",
  sld: "scheme",
  scss: "scss",
  sdbl: "sdbl",
  shadergraph: "shader",
  st: "smalltalk",
  sol: "solidity",
  sparql: "sparql",
  rq: "sparql",
  spl: "splunk",
  config: "ssh-config",
  do: "stata",
  ado: "stata",
  dta: "stata",
  styl: "stylus",
  stylus: "stylus",
  svelte: "svelte",
  swift: "swift",
  sv: "system-verilog",
  svh: "system-verilog",
  service: "systemd",
  socket: "systemd",
  device: "systemd",
  timer: "systemd",
  talon: "talonscript",
  tasl: "tasl",
  tcl: "tcl",
  templ: "templ",
  tf: "tf",
  tfvars: "tfvars",
  toml: "toml",
  ts: "typescript",
  mts: "typescript",
  cts: "typescript",
  tsp: "typespec",
  tsv: "tsv",
  tsx: "tsx",
  ttl: "turtle",
  twig: "twig",
  typ: "typst",
  vv: "v",
  vala: "vala",
  vapi: "vala",
  vb: "vb",
  vbs: "vb",
  bas: "vb",
  vh: "verilog",
  vhd: "vhdl",
  vhdl: "vhdl",
  vim: "vimscript",
  vue: "vue",
  "vine.ts": "vue-vine",
  vy: "vyper",
  wasm: "wasm",
  wat: "wasm",
  wy: "文言",
  wgsl: "wgsl",
  wit: "wit",
  wl: "wolfram",
  nb: "wolfram",
  xml: "xml",
  xsl: "xsl",
  xslt: "xsl",
  yaml: "yaml",
  yml: "yml",
  zs: "zenscript",
  zig: "zig",
  zsh: "zsh",
  sty: "tex"
};
function getFiletypeFromFileName(fileName) {
  if (CUSTOM_EXTENSION_TO_FILE_FORMAT.has(fileName)) return CUSTOM_EXTENSION_TO_FILE_FORMAT.get(fileName) ?? "text";
  if (EXTENSION_TO_FILE_FORMAT[fileName] != null) return EXTENSION_TO_FILE_FORMAT[fileName];
  const compoundMatch = fileName.match(/\.([^/\\]+\.[^/\\]+)$/);
  if (compoundMatch != null) {
    if (CUSTOM_EXTENSION_TO_FILE_FORMAT.has(compoundMatch[1])) return CUSTOM_EXTENSION_TO_FILE_FORMAT.get(compoundMatch[1]) ?? "text";
    if (EXTENSION_TO_FILE_FORMAT[compoundMatch[1]] != null) return EXTENSION_TO_FILE_FORMAT[compoundMatch[1]] ?? "text";
  }
  const simpleMatch = fileName.match(/\.([^.]+)$/)?.[1] ?? "";
  if (CUSTOM_EXTENSION_TO_FILE_FORMAT.has(simpleMatch)) return CUSTOM_EXTENSION_TO_FILE_FORMAT.get(simpleMatch) ?? "text";
  return EXTENSION_TO_FILE_FORMAT[simpleMatch] ?? "text";
}
let _isMacLike = void 0;
let _isSafari = void 0;
function isMacLike() {
  return _isMacLike ??= /macOS|MacIntel|iPhone|iPad|iPod/i.test(getPlatform());
}
function isSafari() {
  return _isSafari ??= "safari" in window && "pushNotification" in window.safari || /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
}
function getPlatform() {
  const navigator2 = globalThis.navigator;
  return navigator2?.platform ?? navigator2?.userAgentData?.platform ?? "unknown";
}
function getLineAnnotationName(annotation) {
  return `annotation-${"side" in annotation ? `${annotation.side}-` : ""}${annotation.lineNumber}`;
}
const DIFFS_TAG_NAME = "diffs-container";
(() => {
  try {
    return false;
  } catch {
    return false;
  }
})();
const COMMIT_METADATA_SPLIT = /(?=^From [a-f0-9]+ .+$)/m;
const GIT_DIFF_FILE_BREAK_REGEX = /(?=^diff --git)/gm;
const SPLIT_WITH_NEWLINES = /(?<=\n)/;
const FILENAME_HEADER_REGEX = /^(---|\+\+\+)\s+([^\t\r\n]+)/;
const FILENAME_HEADER_REGEX_GIT = /^(---|\+\+\+)\s+[ab]\/([^\t\r\n]+)/;
const ALTERNATE_FILE_NAMES_GIT = /^diff --git (?:"a\/(.+?)"|a\/(.+?)) (?:"b\/(.+?)"|b\/(.+?))$/;
const INDEX_LINE_METADATA = /^index ([0-9a-f]+)\.\.([0-9a-f]+)(?: (\d+))?$/i;
const HEADER_PREFIX_SLOT_ID = "header-prefix";
const HEADER_FILENAME_SUFFIX_SLOT_ID = "header-filename-suffix";
const HEADER_METADATA_SLOT_ID = "header-metadata";
const CUSTOM_HEADER_SLOT_ID = "header-custom";
const DEFAULT_THEMES = {
  dark: "pierre-dark",
  light: "pierre-light"
};
const THEME_CSS_ATTRIBUTE = "data-theme-css";
const UNSAFE_CSS_ATTRIBUTE = "data-unsafe-css";
const DIFFS_SCROLLBAR_MEASURE_ATTRIBUTE = "data-diffs-scrollbar-measure";
const DIFFS_SCROLLBAR_GUTTER_MEASURED_PROPERTY = "--diffs-scrollbar-gutter-measured";
const DEFAULT_TOKENIZE_MAX_LENGTH = 1e5;
const DEFAULT_VIRTUAL_FILE_METRICS = {
  hunkLineCount: 50,
  lineHeight: 20,
  diffHeaderHeight: 44,
  spacing: 8
};
({
  ...DEFAULT_VIRTUAL_FILE_METRICS
});
const DEFAULT_EXPANDED_REGION = Object.freeze({
  fromStart: 0,
  fromEnd: 0
});
const DEFAULT_RENDER_RANGE = {
  startingLine: 0,
  totalLines: Infinity,
  bufferBefore: 0,
  bufferAfter: 0
};
const EMPTY_RENDER_RANGE = {
  startingLine: 0,
  totalLines: 0,
  bufferBefore: 0,
  bufferAfter: 0
};
const HEX_TRANSPARENT_RE = /^#(?:[0-9a-f]{3}0|[0-9a-f]{6}00)$/i;
const ALPHA_ZERO_RE = /^0(?:\.0+)?%?$/;
function getFunctionalAlpha(color) {
  const openParen = color.indexOf("(");
  if (openParen <= 0 || !color.endsWith(")")) return;
  const fn = color.slice(0, openParen).trim();
  if (!/^(?:rgb|rgba|hsl|hsla|hwb|lab|lch|oklab|oklch|color)$/i.test(fn)) return;
  const inner = color.slice(openParen + 1, -1).trim();
  if (inner.length === 0) return;
  const slashIndex = inner.lastIndexOf("/");
  if (slashIndex !== -1) return inner.slice(slashIndex + 1).trim();
  if (/^(?:rgba|hsla)$/i.test(fn)) {
    const parts = inner.split(",");
    if (parts.length === 4) return parts[3]?.trim();
  }
}
function parseHexRgba(color) {
  const match = /^#([0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})\b/i.exec(color.trim());
  if (match == null) return null;
  const hex = match[1];
  let expanded;
  let alpha = 1;
  if (hex.length === 3) expanded = hex.split("").map((c) => c + c).join("");
  else if (hex.length === 6) expanded = hex;
  else {
    expanded = hex.slice(0, 6);
    alpha = parseInt(hex.slice(6, 8), 16) / 255;
  }
  return [
    parseInt(expanded.slice(0, 2), 16),
    parseInt(expanded.slice(2, 4), 16),
    parseInt(expanded.slice(4, 6), 16),
    alpha
  ];
}
function relativeLuminance(color) {
  if (color == null) return null;
  const rgba = parseHexRgba(color);
  if (rgba == null) return null;
  const r2 = rgba[0] / 255;
  const g = rgba[1] / 255;
  const b2 = rgba[2] / 255;
  const channel = (v2) => v2 <= 0.03928 ? v2 / 12.92 : ((v2 + 0.055) / 1.055) ** 2.4;
  return 0.2126 * channel(r2) + 0.7152 * channel(g) + 0.0722 * channel(b2);
}
function contrastRatio(a, b2) {
  const [hi, lo] = a > b2 ? [a, b2] : [b2, a];
  return (hi + 0.05) / (lo + 0.05);
}
function compositeOverBg(fgColor, bgColor) {
  if (bgColor == null) return void 0;
  const fgParts = parseHexRgba(fgColor);
  const bgParts = parseHexRgba(bgColor);
  if (fgParts == null || bgParts == null) return void 0;
  const [fr, fg, fb, fa] = fgParts;
  const [br, bg, bb] = bgParts;
  return "#" + [
    Math.round(fr * fa + br * (1 - fa)),
    Math.round(fg * fa + bg * (1 - fa)),
    Math.round(fb * fa + bb * (1 - fa))
  ].map((v2) => v2.toString(16).padStart(2, "0")).join("");
}
function isFullyTransparent(color) {
  if (color == null) return false;
  const normalized = color.trim().toLowerCase();
  if (normalized === "transparent") return true;
  if (HEX_TRANSPARENT_RE.test(normalized)) return true;
  const alpha = getFunctionalAlpha(normalized);
  return alpha != null && ALPHA_ZERO_RE.test(alpha);
}
function isDarkSurface(bg, fgHint) {
  const fromBg = relativeLuminance(bg);
  if (fromBg != null) return fromBg < 0.4;
  const fromFg = relativeLuminance(fgHint);
  return fromFg != null ? fromFg > 0.6 : false;
}
function surfacesMatch(a, b2) {
  if (a == null || b2 == null) return false;
  if (a.trim().toLowerCase() === b2.trim().toLowerCase()) return true;
  const la = relativeLuminance(a);
  const lb = relativeLuminance(b2);
  if (la == null || lb == null) return false;
  return Math.abs(la - lb) < 0.06;
}
function hoverWouldEraseText(hover, bg, fg) {
  if (bg == null || fg == null) return false;
  const hoverL = relativeLuminance(hover);
  const bgL = relativeLuminance(bg);
  const fgL = relativeLuminance(fg);
  if (hoverL == null || bgL == null || fgL == null) return false;
  return Math.abs(hoverL - fgL) < Math.abs(hoverL - bgL);
}
function pickReadableForeground(bg, candidates) {
  const bgL = relativeLuminance(bg);
  const firstDefined = candidates.find((candidate) => candidate != null && candidate !== "");
  if (bgL == null) return firstDefined;
  let best;
  let bestRatio = -1;
  for (const candidate of candidates) {
    if (candidate == null || candidate === "") continue;
    const candidateL = relativeLuminance(candidate);
    if (candidateL == null) continue;
    const ratio = contrastRatio(bgL, candidateL);
    if (ratio >= 3) return candidate;
    if (ratio > bestRatio) {
      best = candidate;
      bestRatio = ratio;
    }
  }
  return best ?? firstDefined;
}
function deriveMutedFg(primaryFg, bg) {
  if (bg == null) return primaryFg;
  const fgParts = parseHexRgba(primaryFg);
  const bgParts = parseHexRgba(bg);
  const bgL = relativeLuminance(bg);
  if (fgParts == null || bgParts == null || bgL == null) return `color-mix(in srgb, ${primaryFg} 70%, ${bg})`;
  const [fr, fg2, fb] = fgParts;
  const [br, bg3, bb] = bgParts;
  for (const weight of [
    0.6,
    0.7,
    0.8,
    0.9
  ]) {
    const hex = "#" + [
      Math.round(fr * weight + br * (1 - weight)),
      Math.round(fg2 * weight + bg3 * (1 - weight)),
      Math.round(fb * weight + bb * (1 - weight))
    ].map((v2) => v2.toString(16).padStart(2, "0")).join("");
    const L2 = relativeLuminance(hex);
    if (L2 != null && contrastRatio(bgL, L2) >= 4.5) return hex;
  }
  return primaryFg;
}
const cache = /* @__PURE__ */ new WeakMap();
function normalizeThemeColors(theme) {
  const cached = cache.get(theme);
  if (cached != null) return cached;
  const originalColors = theme.colors ?? {};
  const colors = { ...originalColors };
  const editorBackground = originalColors["editor.background"] ?? theme.bg;
  const editorForeground = originalColors["editor.foreground"] ?? theme.fg;
  const sidebarBackground = originalColors["sideBar.background"] ?? editorBackground;
  const sidebarForeground = originalColors["sideBar.foreground"] ?? editorForeground;
  fill(colors, "editor.background", editorBackground);
  fill(colors, "editor.foreground", editorForeground);
  fill(colors, "sideBar.background", sidebarBackground);
  fill(colors, "sideBar.foreground", sidebarForeground);
  fill(colors, "input.background", originalColors["input.background"] ?? sidebarBackground);
  fill(colors, "sideBarSectionHeader.foreground", originalColors["sideBarSectionHeader.foreground"] ?? sidebarForeground);
  fill(colors, "list.activeSelectionForeground", originalColors["list.activeSelectionForeground"] ?? sidebarForeground);
  fill(colors, "gitDecoration.addedResourceForeground", firstColor(originalColors["gitDecoration.addedResourceForeground"], originalColors["terminal.ansiGreen"], originalColors["editorGutter.addedBackground"]));
  fill(colors, "gitDecoration.modifiedResourceForeground", firstColor(originalColors["gitDecoration.modifiedResourceForeground"], originalColors["terminal.ansiBlue"], originalColors["editorGutter.modifiedBackground"]));
  fill(colors, "gitDecoration.deletedResourceForeground", firstColor(originalColors["gitDecoration.deletedResourceForeground"], originalColors["terminal.ansiRed"], originalColors["editorGutter.deletedBackground"]));
  const focusRing = (isFullyTransparent(originalColors["list.focusOutline"]) ? void 0 : originalColors["list.focusOutline"]) ?? (isFullyTransparent(originalColors["focusBorder"]) ? void 0 : originalColors["focusBorder"]);
  if (focusRing != null) colors["list.focusOutline"] = focusRing;
  else delete colors["list.focusOutline"];
  const hover = originalColors["list.hoverBackground"];
  if (hover != null && (matchesSurface(hover, sidebarBackground) || hoverWouldEraseText(hover, sidebarBackground, sidebarForeground))) delete colors["list.hoverBackground"];
  const result = Object.freeze({
    ...theme,
    colors: Object.freeze(colors)
  });
  cache.set(theme, result);
  return result;
}
function fill(colors, key2, value) {
  if (value != null && value !== "") colors[key2] = value;
}
function firstColor(...candidates) {
  for (const candidate of candidates) if (candidate != null && candidate !== "") return candidate;
}
function matchesSurface(color, surface) {
  return surface != null && color.toLowerCase() === surface.toLowerCase();
}
function clone(something) {
  return doClone(something);
}
function doClone(something) {
  if (Array.isArray(something)) {
    return cloneArray(something);
  }
  if (something instanceof RegExp) {
    return something;
  }
  if (typeof something === "object") {
    return cloneObj(something);
  }
  return something;
}
function cloneArray(arr) {
  let r2 = [];
  for (let i2 = 0, len = arr.length; i2 < len; i2++) {
    r2[i2] = doClone(arr[i2]);
  }
  return r2;
}
function cloneObj(obj) {
  let r2 = {};
  for (let key2 in obj) {
    r2[key2] = doClone(obj[key2]);
  }
  return r2;
}
function mergeObjects(target, ...sources) {
  sources.forEach((source) => {
    for (let key2 in source) {
      target[key2] = source[key2];
    }
  });
  return target;
}
function basename(path) {
  const idx = ~path.lastIndexOf("/") || ~path.lastIndexOf("\\");
  if (idx === 0) {
    return path;
  } else if (~idx === path.length - 1) {
    return basename(path.substring(0, path.length - 1));
  } else {
    return path.substr(~idx + 1);
  }
}
var CAPTURING_REGEX_SOURCE = /\$(\d+)|\${(\d+):\/(downcase|upcase)}/g;
var RegexSource = class {
  static hasCaptures(regexSource) {
    if (regexSource === null) {
      return false;
    }
    CAPTURING_REGEX_SOURCE.lastIndex = 0;
    return CAPTURING_REGEX_SOURCE.test(regexSource);
  }
  static replaceCaptures(regexSource, captureSource, captureIndices) {
    return regexSource.replace(CAPTURING_REGEX_SOURCE, (match, index, commandIndex, command) => {
      let capture = captureIndices[parseInt(index || commandIndex, 10)];
      if (capture) {
        let result = captureSource.substring(capture.start, capture.end);
        while (result[0] === ".") {
          result = result.substring(1);
        }
        switch (command) {
          case "downcase":
            return result.toLowerCase();
          case "upcase":
            return result.toUpperCase();
          default:
            return result;
        }
      } else {
        return match;
      }
    });
  }
};
function strcmp(a, b2) {
  if (a < b2) {
    return -1;
  }
  if (a > b2) {
    return 1;
  }
  return 0;
}
function strArrCmp(a, b2) {
  if (a === null && b2 === null) {
    return 0;
  }
  if (!a) {
    return -1;
  }
  if (!b2) {
    return 1;
  }
  let len1 = a.length;
  let len2 = b2.length;
  if (len1 === len2) {
    for (let i2 = 0; i2 < len1; i2++) {
      let res = strcmp(a[i2], b2[i2]);
      if (res !== 0) {
        return res;
      }
    }
    return 0;
  }
  return len1 - len2;
}
function isValidHexColor(hex) {
  if (/^#[0-9a-f]{6}$/i.test(hex)) {
    return true;
  }
  if (/^#[0-9a-f]{8}$/i.test(hex)) {
    return true;
  }
  if (/^#[0-9a-f]{3}$/i.test(hex)) {
    return true;
  }
  if (/^#[0-9a-f]{4}$/i.test(hex)) {
    return true;
  }
  return false;
}
function escapeRegExpCharacters(value) {
  return value.replace(/[\-\\\{\}\*\+\?\|\^\$\.\,\[\]\(\)\#\s]/g, "\\$&");
}
var CachedFn = class {
  constructor(fn) {
    this.fn = fn;
  }
  cache = /* @__PURE__ */ new Map();
  get(key2) {
    if (this.cache.has(key2)) {
      return this.cache.get(key2);
    }
    const value = this.fn(key2);
    this.cache.set(key2, value);
    return value;
  }
};
var Theme = class {
  constructor(_colorMap, _defaults, _root) {
    this._colorMap = _colorMap;
    this._defaults = _defaults;
    this._root = _root;
  }
  static createFromRawTheme(source, colorMap) {
    return this.createFromParsedTheme(parseTheme(source), colorMap);
  }
  static createFromParsedTheme(source, colorMap) {
    return resolveParsedThemeRules(source, colorMap);
  }
  _cachedMatchRoot = new CachedFn(
    (scopeName) => this._root.match(scopeName)
  );
  getColorMap() {
    return this._colorMap.getColorMap();
  }
  getDefaults() {
    return this._defaults;
  }
  match(scopePath) {
    if (scopePath === null) {
      return this._defaults;
    }
    const scopeName = scopePath.scopeName;
    const matchingTrieElements = this._cachedMatchRoot.get(scopeName);
    const effectiveRule = matchingTrieElements.find(
      (v2) => _scopePathMatchesParentScopes(scopePath.parent, v2.parentScopes)
    );
    if (!effectiveRule) {
      return null;
    }
    return new StyleAttributes(
      effectiveRule.fontStyle,
      effectiveRule.foreground,
      effectiveRule.background
    );
  }
};
var ScopeStack = class _ScopeStack {
  constructor(parent, scopeName) {
    this.parent = parent;
    this.scopeName = scopeName;
  }
  static push(path, scopeNames) {
    for (const name of scopeNames) {
      path = new _ScopeStack(path, name);
    }
    return path;
  }
  static from(...segments) {
    let result = null;
    for (let i2 = 0; i2 < segments.length; i2++) {
      result = new _ScopeStack(result, segments[i2]);
    }
    return result;
  }
  push(scopeName) {
    return new _ScopeStack(this, scopeName);
  }
  getSegments() {
    let item = this;
    const result = [];
    while (item) {
      result.push(item.scopeName);
      item = item.parent;
    }
    result.reverse();
    return result;
  }
  toString() {
    return this.getSegments().join(" ");
  }
  extends(other) {
    if (this === other) {
      return true;
    }
    if (this.parent === null) {
      return false;
    }
    return this.parent.extends(other);
  }
  getExtensionIfDefined(base) {
    const result = [];
    let item = this;
    while (item && item !== base) {
      result.push(item.scopeName);
      item = item.parent;
    }
    return item === base ? result.reverse() : void 0;
  }
};
function _scopePathMatchesParentScopes(scopePath, parentScopes) {
  if (parentScopes.length === 0) {
    return true;
  }
  for (let index = 0; index < parentScopes.length; index++) {
    let scopePattern = parentScopes[index];
    let scopeMustMatch = false;
    if (scopePattern === ">") {
      if (index === parentScopes.length - 1) {
        return false;
      }
      scopePattern = parentScopes[++index];
      scopeMustMatch = true;
    }
    while (scopePath) {
      if (_matchesScope(scopePath.scopeName, scopePattern)) {
        break;
      }
      if (scopeMustMatch) {
        return false;
      }
      scopePath = scopePath.parent;
    }
    if (!scopePath) {
      return false;
    }
    scopePath = scopePath.parent;
  }
  return true;
}
function _matchesScope(scopeName, scopePattern) {
  return scopePattern === scopeName || scopeName.startsWith(scopePattern) && scopeName[scopePattern.length] === ".";
}
var StyleAttributes = class {
  constructor(fontStyle, foregroundId, backgroundId) {
    this.fontStyle = fontStyle;
    this.foregroundId = foregroundId;
    this.backgroundId = backgroundId;
  }
};
function parseTheme(source) {
  if (!source) {
    return [];
  }
  if (!source.settings || !Array.isArray(source.settings)) {
    return [];
  }
  let settings = source.settings;
  let result = [], resultLen = 0;
  for (let i2 = 0, len = settings.length; i2 < len; i2++) {
    let entry = settings[i2];
    if (!entry.settings) {
      continue;
    }
    let scopes;
    if (typeof entry.scope === "string") {
      let _scope = entry.scope;
      _scope = _scope.replace(/^[,]+/, "");
      _scope = _scope.replace(/[,]+$/, "");
      scopes = _scope.split(",");
    } else if (Array.isArray(entry.scope)) {
      scopes = entry.scope;
    } else {
      scopes = [""];
    }
    let fontStyle = -1;
    if (typeof entry.settings.fontStyle === "string") {
      fontStyle = 0;
      let segments = entry.settings.fontStyle.split(" ");
      for (let j2 = 0, lenJ = segments.length; j2 < lenJ; j2++) {
        let segment = segments[j2];
        switch (segment) {
          case "italic":
            fontStyle = fontStyle | 1;
            break;
          case "bold":
            fontStyle = fontStyle | 2;
            break;
          case "underline":
            fontStyle = fontStyle | 4;
            break;
          case "strikethrough":
            fontStyle = fontStyle | 8;
            break;
        }
      }
    }
    let foreground = null;
    if (typeof entry.settings.foreground === "string" && isValidHexColor(entry.settings.foreground)) {
      foreground = entry.settings.foreground;
    }
    let background = null;
    if (typeof entry.settings.background === "string" && isValidHexColor(entry.settings.background)) {
      background = entry.settings.background;
    }
    for (let j2 = 0, lenJ = scopes.length; j2 < lenJ; j2++) {
      let _scope = scopes[j2].trim();
      let segments = _scope.split(" ");
      let scope = segments[segments.length - 1];
      let parentScopes = null;
      if (segments.length > 1) {
        parentScopes = segments.slice(0, segments.length - 1);
        parentScopes.reverse();
      }
      result[resultLen++] = new ParsedThemeRule(
        scope,
        parentScopes,
        i2,
        fontStyle,
        foreground,
        background
      );
    }
  }
  return result;
}
var ParsedThemeRule = class {
  constructor(scope, parentScopes, index, fontStyle, foreground, background) {
    this.scope = scope;
    this.parentScopes = parentScopes;
    this.index = index;
    this.fontStyle = fontStyle;
    this.foreground = foreground;
    this.background = background;
  }
};
var FontStyle = /* @__PURE__ */ ((FontStyle2) => {
  FontStyle2[FontStyle2["NotSet"] = -1] = "NotSet";
  FontStyle2[FontStyle2["None"] = 0] = "None";
  FontStyle2[FontStyle2["Italic"] = 1] = "Italic";
  FontStyle2[FontStyle2["Bold"] = 2] = "Bold";
  FontStyle2[FontStyle2["Underline"] = 4] = "Underline";
  FontStyle2[FontStyle2["Strikethrough"] = 8] = "Strikethrough";
  return FontStyle2;
})(FontStyle || {});
function resolveParsedThemeRules(parsedThemeRules, _colorMap) {
  parsedThemeRules.sort((a, b2) => {
    let r2 = strcmp(a.scope, b2.scope);
    if (r2 !== 0) {
      return r2;
    }
    r2 = strArrCmp(a.parentScopes, b2.parentScopes);
    if (r2 !== 0) {
      return r2;
    }
    return a.index - b2.index;
  });
  let defaultFontStyle = 0;
  let defaultForeground = "#000000";
  let defaultBackground = "#ffffff";
  while (parsedThemeRules.length >= 1 && parsedThemeRules[0].scope === "") {
    let incomingDefaults = parsedThemeRules.shift();
    if (incomingDefaults.fontStyle !== -1) {
      defaultFontStyle = incomingDefaults.fontStyle;
    }
    if (incomingDefaults.foreground !== null) {
      defaultForeground = incomingDefaults.foreground;
    }
    if (incomingDefaults.background !== null) {
      defaultBackground = incomingDefaults.background;
    }
  }
  let colorMap = new ColorMap(_colorMap);
  let defaults = new StyleAttributes(defaultFontStyle, colorMap.getId(defaultForeground), colorMap.getId(defaultBackground));
  let root2 = new ThemeTrieElement(new ThemeTrieElementRule(0, null, -1, 0, 0), []);
  for (let i2 = 0, len = parsedThemeRules.length; i2 < len; i2++) {
    let rule = parsedThemeRules[i2];
    root2.insert(0, rule.scope, rule.parentScopes, rule.fontStyle, colorMap.getId(rule.foreground), colorMap.getId(rule.background));
  }
  return new Theme(colorMap, defaults, root2);
}
var ColorMap = class {
  _isFrozen;
  _lastColorId;
  _id2color;
  _color2id;
  constructor(_colorMap) {
    this._lastColorId = 0;
    this._id2color = [];
    this._color2id = /* @__PURE__ */ Object.create(null);
    if (Array.isArray(_colorMap)) {
      this._isFrozen = true;
      for (let i2 = 0, len = _colorMap.length; i2 < len; i2++) {
        this._color2id[_colorMap[i2]] = i2;
        this._id2color[i2] = _colorMap[i2];
      }
    } else {
      this._isFrozen = false;
    }
  }
  getId(color) {
    if (color === null) {
      return 0;
    }
    color = color.toUpperCase();
    let value = this._color2id[color];
    if (value) {
      return value;
    }
    if (this._isFrozen) {
      throw new Error(`Missing color in color map - ${color}`);
    }
    value = ++this._lastColorId;
    this._color2id[color] = value;
    this._id2color[value] = color;
    return value;
  }
  getColorMap() {
    return this._id2color.slice(0);
  }
};
var emptyParentScopes = Object.freeze([]);
var ThemeTrieElementRule = class _ThemeTrieElementRule {
  scopeDepth;
  parentScopes;
  fontStyle;
  foreground;
  background;
  constructor(scopeDepth, parentScopes, fontStyle, foreground, background) {
    this.scopeDepth = scopeDepth;
    this.parentScopes = parentScopes || emptyParentScopes;
    this.fontStyle = fontStyle;
    this.foreground = foreground;
    this.background = background;
  }
  clone() {
    return new _ThemeTrieElementRule(this.scopeDepth, this.parentScopes, this.fontStyle, this.foreground, this.background);
  }
  static cloneArr(arr) {
    let r2 = [];
    for (let i2 = 0, len = arr.length; i2 < len; i2++) {
      r2[i2] = arr[i2].clone();
    }
    return r2;
  }
  acceptOverwrite(scopeDepth, fontStyle, foreground, background) {
    if (this.scopeDepth > scopeDepth) {
      console.log("how did this happen?");
    } else {
      this.scopeDepth = scopeDepth;
    }
    if (fontStyle !== -1) {
      this.fontStyle = fontStyle;
    }
    if (foreground !== 0) {
      this.foreground = foreground;
    }
    if (background !== 0) {
      this.background = background;
    }
  }
};
var ThemeTrieElement = class _ThemeTrieElement {
  constructor(_mainRule, rulesWithParentScopes = [], _children = {}) {
    this._mainRule = _mainRule;
    this._children = _children;
    this._rulesWithParentScopes = rulesWithParentScopes;
  }
  _rulesWithParentScopes;
  static _cmpBySpecificity(a, b2) {
    if (a.scopeDepth !== b2.scopeDepth) {
      return b2.scopeDepth - a.scopeDepth;
    }
    let aParentIndex = 0;
    let bParentIndex = 0;
    while (true) {
      if (a.parentScopes[aParentIndex] === ">") {
        aParentIndex++;
      }
      if (b2.parentScopes[bParentIndex] === ">") {
        bParentIndex++;
      }
      if (aParentIndex >= a.parentScopes.length || bParentIndex >= b2.parentScopes.length) {
        break;
      }
      const parentScopeLengthDiff = b2.parentScopes[bParentIndex].length - a.parentScopes[aParentIndex].length;
      if (parentScopeLengthDiff !== 0) {
        return parentScopeLengthDiff;
      }
      aParentIndex++;
      bParentIndex++;
    }
    return b2.parentScopes.length - a.parentScopes.length;
  }
  match(scope) {
    if (scope !== "") {
      let dotIndex = scope.indexOf(".");
      let head2;
      let tail;
      if (dotIndex === -1) {
        head2 = scope;
        tail = "";
      } else {
        head2 = scope.substring(0, dotIndex);
        tail = scope.substring(dotIndex + 1);
      }
      if (this._children.hasOwnProperty(head2)) {
        return this._children[head2].match(tail);
      }
    }
    const rules = this._rulesWithParentScopes.concat(this._mainRule);
    rules.sort(_ThemeTrieElement._cmpBySpecificity);
    return rules;
  }
  insert(scopeDepth, scope, parentScopes, fontStyle, foreground, background) {
    if (scope === "") {
      this._doInsertHere(scopeDepth, parentScopes, fontStyle, foreground, background);
      return;
    }
    let dotIndex = scope.indexOf(".");
    let head2;
    let tail;
    if (dotIndex === -1) {
      head2 = scope;
      tail = "";
    } else {
      head2 = scope.substring(0, dotIndex);
      tail = scope.substring(dotIndex + 1);
    }
    let child;
    if (this._children.hasOwnProperty(head2)) {
      child = this._children[head2];
    } else {
      child = new _ThemeTrieElement(this._mainRule.clone(), ThemeTrieElementRule.cloneArr(this._rulesWithParentScopes));
      this._children[head2] = child;
    }
    child.insert(scopeDepth + 1, tail, parentScopes, fontStyle, foreground, background);
  }
  _doInsertHere(scopeDepth, parentScopes, fontStyle, foreground, background) {
    if (parentScopes === null) {
      this._mainRule.acceptOverwrite(scopeDepth, fontStyle, foreground, background);
      return;
    }
    for (let i2 = 0, len = this._rulesWithParentScopes.length; i2 < len; i2++) {
      let rule = this._rulesWithParentScopes[i2];
      if (strArrCmp(rule.parentScopes, parentScopes) === 0) {
        rule.acceptOverwrite(scopeDepth, fontStyle, foreground, background);
        return;
      }
    }
    if (fontStyle === -1) {
      fontStyle = this._mainRule.fontStyle;
    }
    if (foreground === 0) {
      foreground = this._mainRule.foreground;
    }
    if (background === 0) {
      background = this._mainRule.background;
    }
    this._rulesWithParentScopes.push(new ThemeTrieElementRule(scopeDepth, parentScopes, fontStyle, foreground, background));
  }
};
var EncodedTokenMetadata = class _EncodedTokenMetadata {
  static toBinaryStr(encodedTokenAttributes) {
    return encodedTokenAttributes.toString(2).padStart(32, "0");
  }
  static print(encodedTokenAttributes) {
    const languageId = _EncodedTokenMetadata.getLanguageId(encodedTokenAttributes);
    const tokenType = _EncodedTokenMetadata.getTokenType(encodedTokenAttributes);
    const fontStyle = _EncodedTokenMetadata.getFontStyle(encodedTokenAttributes);
    const foreground = _EncodedTokenMetadata.getForeground(encodedTokenAttributes);
    const background = _EncodedTokenMetadata.getBackground(encodedTokenAttributes);
    console.log({
      languageId,
      tokenType,
      fontStyle,
      foreground,
      background
    });
  }
  static getLanguageId(encodedTokenAttributes) {
    return (encodedTokenAttributes & 255) >>> 0;
  }
  static getTokenType(encodedTokenAttributes) {
    return (encodedTokenAttributes & 768) >>> 8;
  }
  static containsBalancedBrackets(encodedTokenAttributes) {
    return (encodedTokenAttributes & 1024) !== 0;
  }
  static getFontStyle(encodedTokenAttributes) {
    return (encodedTokenAttributes & 30720) >>> 11;
  }
  static getForeground(encodedTokenAttributes) {
    return (encodedTokenAttributes & 16744448) >>> 15;
  }
  static getBackground(encodedTokenAttributes) {
    return (encodedTokenAttributes & 4278190080) >>> 24;
  }
  /**
   * Updates the fields in `metadata`.
   * A value of `0`, `NotSet` or `null` indicates that the corresponding field should be left as is.
   */
  static set(encodedTokenAttributes, languageId, tokenType, containsBalancedBrackets, fontStyle, foreground, background) {
    let _languageId = _EncodedTokenMetadata.getLanguageId(encodedTokenAttributes);
    let _tokenType = _EncodedTokenMetadata.getTokenType(encodedTokenAttributes);
    let _containsBalancedBracketsBit = _EncodedTokenMetadata.containsBalancedBrackets(encodedTokenAttributes) ? 1 : 0;
    let _fontStyle = _EncodedTokenMetadata.getFontStyle(encodedTokenAttributes);
    let _foreground = _EncodedTokenMetadata.getForeground(encodedTokenAttributes);
    let _background = _EncodedTokenMetadata.getBackground(encodedTokenAttributes);
    if (languageId !== 0) {
      _languageId = languageId;
    }
    if (tokenType !== 8) {
      _tokenType = fromOptionalTokenType(tokenType);
    }
    if (containsBalancedBrackets !== null) {
      _containsBalancedBracketsBit = containsBalancedBrackets ? 1 : 0;
    }
    if (fontStyle !== -1) {
      _fontStyle = fontStyle;
    }
    if (foreground !== 0) {
      _foreground = foreground;
    }
    if (background !== 0) {
      _background = background;
    }
    return (_languageId << 0 | _tokenType << 8 | _containsBalancedBracketsBit << 10 | _fontStyle << 11 | _foreground << 15 | _background << 24) >>> 0;
  }
};
function toOptionalTokenType(standardType) {
  return standardType;
}
function fromOptionalTokenType(standardType) {
  return standardType;
}
function createMatchers(selector, matchesName) {
  const results = [];
  const tokenizer = newTokenizer(selector);
  let token2 = tokenizer.next();
  while (token2 !== null) {
    let priority = 0;
    if (token2.length === 2 && token2.charAt(1) === ":") {
      switch (token2.charAt(0)) {
        case "R":
          priority = 1;
          break;
        case "L":
          priority = -1;
          break;
        default:
          console.log(`Unknown priority ${token2} in scope selector`);
      }
      token2 = tokenizer.next();
    }
    let matcher = parseConjunction();
    results.push({ matcher, priority });
    if (token2 !== ",") {
      break;
    }
    token2 = tokenizer.next();
  }
  return results;
  function parseOperand() {
    if (token2 === "-") {
      token2 = tokenizer.next();
      const expressionToNegate = parseOperand();
      return (matcherInput) => !!expressionToNegate && !expressionToNegate(matcherInput);
    }
    if (token2 === "(") {
      token2 = tokenizer.next();
      const expressionInParents = parseInnerExpression();
      if (token2 === ")") {
        token2 = tokenizer.next();
      }
      return expressionInParents;
    }
    if (isIdentifier(token2)) {
      const identifiers = [];
      do {
        identifiers.push(token2);
        token2 = tokenizer.next();
      } while (isIdentifier(token2));
      return (matcherInput) => matchesName(identifiers, matcherInput);
    }
    return null;
  }
  function parseConjunction() {
    const matchers = [];
    let matcher = parseOperand();
    while (matcher) {
      matchers.push(matcher);
      matcher = parseOperand();
    }
    return (matcherInput) => matchers.every((matcher2) => matcher2(matcherInput));
  }
  function parseInnerExpression() {
    const matchers = [];
    let matcher = parseConjunction();
    while (matcher) {
      matchers.push(matcher);
      if (token2 === "|" || token2 === ",") {
        do {
          token2 = tokenizer.next();
        } while (token2 === "|" || token2 === ",");
      } else {
        break;
      }
      matcher = parseConjunction();
    }
    return (matcherInput) => matchers.some((matcher2) => matcher2(matcherInput));
  }
}
function isIdentifier(token2) {
  return !!token2 && !!token2.match(/[\w\.:]+/);
}
function newTokenizer(input) {
  let regex = /([LR]:|[\w\.:][\w\.:\-]*|[\,\|\-\(\)])/g;
  let match = regex.exec(input);
  return {
    next: () => {
      if (!match) {
        return null;
      }
      const res = match[0];
      match = regex.exec(input);
      return res;
    }
  };
}
function disposeOnigString(str) {
  if (typeof str.dispose === "function") {
    str.dispose();
  }
}
var TopLevelRuleReference = class {
  constructor(scopeName) {
    this.scopeName = scopeName;
  }
  toKey() {
    return this.scopeName;
  }
};
var TopLevelRepositoryRuleReference = class {
  constructor(scopeName, ruleName) {
    this.scopeName = scopeName;
    this.ruleName = ruleName;
  }
  toKey() {
    return `${this.scopeName}#${this.ruleName}`;
  }
};
var ExternalReferenceCollector = class {
  _references = [];
  _seenReferenceKeys = /* @__PURE__ */ new Set();
  get references() {
    return this._references;
  }
  visitedRule = /* @__PURE__ */ new Set();
  add(reference) {
    const key2 = reference.toKey();
    if (this._seenReferenceKeys.has(key2)) {
      return;
    }
    this._seenReferenceKeys.add(key2);
    this._references.push(reference);
  }
};
var ScopeDependencyProcessor = class {
  constructor(repo, initialScopeName) {
    this.repo = repo;
    this.initialScopeName = initialScopeName;
    this.seenFullScopeRequests.add(this.initialScopeName);
    this.Q = [new TopLevelRuleReference(this.initialScopeName)];
  }
  seenFullScopeRequests = /* @__PURE__ */ new Set();
  seenPartialScopeRequests = /* @__PURE__ */ new Set();
  Q;
  processQueue() {
    const q2 = this.Q;
    this.Q = [];
    const deps = new ExternalReferenceCollector();
    for (const dep of q2) {
      collectReferencesOfReference(dep, this.initialScopeName, this.repo, deps);
    }
    for (const dep of deps.references) {
      if (dep instanceof TopLevelRuleReference) {
        if (this.seenFullScopeRequests.has(dep.scopeName)) {
          continue;
        }
        this.seenFullScopeRequests.add(dep.scopeName);
        this.Q.push(dep);
      } else {
        if (this.seenFullScopeRequests.has(dep.scopeName)) {
          continue;
        }
        if (this.seenPartialScopeRequests.has(dep.toKey())) {
          continue;
        }
        this.seenPartialScopeRequests.add(dep.toKey());
        this.Q.push(dep);
      }
    }
  }
};
function collectReferencesOfReference(reference, baseGrammarScopeName, repo, result) {
  const selfGrammar = repo.lookup(reference.scopeName);
  if (!selfGrammar) {
    if (reference.scopeName === baseGrammarScopeName) {
      throw new Error(`No grammar provided for <${baseGrammarScopeName}>`);
    }
    return;
  }
  const baseGrammar = repo.lookup(baseGrammarScopeName);
  if (reference instanceof TopLevelRuleReference) {
    collectExternalReferencesInTopLevelRule({ baseGrammar, selfGrammar }, result);
  } else {
    collectExternalReferencesInTopLevelRepositoryRule(
      reference.ruleName,
      { baseGrammar, selfGrammar, repository: selfGrammar.repository },
      result
    );
  }
  const injections = repo.injections(reference.scopeName);
  if (injections) {
    for (const injection of injections) {
      result.add(new TopLevelRuleReference(injection));
    }
  }
}
function collectExternalReferencesInTopLevelRepositoryRule(ruleName, context, result) {
  if (context.repository && context.repository[ruleName]) {
    const rule = context.repository[ruleName];
    collectExternalReferencesInRules([rule], context, result);
  }
}
function collectExternalReferencesInTopLevelRule(context, result) {
  if (context.selfGrammar.patterns && Array.isArray(context.selfGrammar.patterns)) {
    collectExternalReferencesInRules(
      context.selfGrammar.patterns,
      { ...context, repository: context.selfGrammar.repository },
      result
    );
  }
  if (context.selfGrammar.injections) {
    collectExternalReferencesInRules(
      Object.values(context.selfGrammar.injections),
      { ...context, repository: context.selfGrammar.repository },
      result
    );
  }
}
function collectExternalReferencesInRules(rules, context, result) {
  for (const rule of rules) {
    if (result.visitedRule.has(rule)) {
      continue;
    }
    result.visitedRule.add(rule);
    const patternRepository = rule.repository ? mergeObjects({}, context.repository, rule.repository) : context.repository;
    if (Array.isArray(rule.patterns)) {
      collectExternalReferencesInRules(rule.patterns, { ...context, repository: patternRepository }, result);
    }
    const include = rule.include;
    if (!include) {
      continue;
    }
    const reference = parseInclude(include);
    switch (reference.kind) {
      case 0:
        collectExternalReferencesInTopLevelRule({ ...context, selfGrammar: context.baseGrammar }, result);
        break;
      case 1:
        collectExternalReferencesInTopLevelRule(context, result);
        break;
      case 2:
        collectExternalReferencesInTopLevelRepositoryRule(reference.ruleName, { ...context, repository: patternRepository }, result);
        break;
      case 3:
      case 4:
        const selfGrammar = reference.scopeName === context.selfGrammar.scopeName ? context.selfGrammar : reference.scopeName === context.baseGrammar.scopeName ? context.baseGrammar : void 0;
        if (selfGrammar) {
          const newContext = { baseGrammar: context.baseGrammar, selfGrammar, repository: patternRepository };
          if (reference.kind === 4) {
            collectExternalReferencesInTopLevelRepositoryRule(reference.ruleName, newContext, result);
          } else {
            collectExternalReferencesInTopLevelRule(newContext, result);
          }
        } else {
          if (reference.kind === 4) {
            result.add(new TopLevelRepositoryRuleReference(reference.scopeName, reference.ruleName));
          } else {
            result.add(new TopLevelRuleReference(reference.scopeName));
          }
        }
        break;
    }
  }
}
var BaseReference = class {
  kind = 0;
};
var SelfReference = class {
  kind = 1;
};
var RelativeReference = class {
  constructor(ruleName) {
    this.ruleName = ruleName;
  }
  kind = 2;
};
var TopLevelReference = class {
  constructor(scopeName) {
    this.scopeName = scopeName;
  }
  kind = 3;
};
var TopLevelRepositoryReference = class {
  constructor(scopeName, ruleName) {
    this.scopeName = scopeName;
    this.ruleName = ruleName;
  }
  kind = 4;
};
function parseInclude(include) {
  if (include === "$base") {
    return new BaseReference();
  } else if (include === "$self") {
    return new SelfReference();
  }
  const indexOfSharp = include.indexOf("#");
  if (indexOfSharp === -1) {
    return new TopLevelReference(include);
  } else if (indexOfSharp === 0) {
    return new RelativeReference(include.substring(1));
  } else {
    const scopeName = include.substring(0, indexOfSharp);
    const ruleName = include.substring(indexOfSharp + 1);
    return new TopLevelRepositoryReference(scopeName, ruleName);
  }
}
var HAS_BACK_REFERENCES = /\\(\d+)/;
var BACK_REFERENCING_END = /\\(\d+)/g;
var endRuleId = -1;
var whileRuleId = -2;
function ruleIdFromNumber(id) {
  return id;
}
function ruleIdToNumber(id) {
  return id;
}
var Rule = class {
  $location;
  id;
  _nameIsCapturing;
  _name;
  _contentNameIsCapturing;
  _contentName;
  constructor($location, id, name, contentName) {
    this.$location = $location;
    this.id = id;
    this._name = name || null;
    this._nameIsCapturing = RegexSource.hasCaptures(this._name);
    this._contentName = contentName || null;
    this._contentNameIsCapturing = RegexSource.hasCaptures(this._contentName);
  }
  get debugName() {
    const location = this.$location ? `${basename(this.$location.filename)}:${this.$location.line}` : "unknown";
    return `${this.constructor.name}#${this.id} @ ${location}`;
  }
  getName(lineText, captureIndices) {
    if (!this._nameIsCapturing || this._name === null || lineText === null || captureIndices === null) {
      return this._name;
    }
    return RegexSource.replaceCaptures(this._name, lineText, captureIndices);
  }
  getContentName(lineText, captureIndices) {
    if (!this._contentNameIsCapturing || this._contentName === null) {
      return this._contentName;
    }
    return RegexSource.replaceCaptures(this._contentName, lineText, captureIndices);
  }
};
var CaptureRule = class extends Rule {
  retokenizeCapturedWithRuleId;
  constructor($location, id, name, contentName, retokenizeCapturedWithRuleId) {
    super($location, id, name, contentName);
    this.retokenizeCapturedWithRuleId = retokenizeCapturedWithRuleId;
  }
  dispose() {
  }
  collectPatterns(grammar, out) {
    throw new Error("Not supported!");
  }
  compile(grammar, endRegexSource) {
    throw new Error("Not supported!");
  }
  compileAG(grammar, endRegexSource, allowA, allowG) {
    throw new Error("Not supported!");
  }
};
var MatchRule = class extends Rule {
  _match;
  captures;
  _cachedCompiledPatterns;
  constructor($location, id, name, match, captures) {
    super($location, id, name, null);
    this._match = new RegExpSource(match, this.id);
    this.captures = captures;
    this._cachedCompiledPatterns = null;
  }
  dispose() {
    if (this._cachedCompiledPatterns) {
      this._cachedCompiledPatterns.dispose();
      this._cachedCompiledPatterns = null;
    }
  }
  get debugMatchRegExp() {
    return `${this._match.source}`;
  }
  collectPatterns(grammar, out) {
    out.push(this._match);
  }
  compile(grammar, endRegexSource) {
    return this._getCachedCompiledPatterns(grammar).compile(grammar);
  }
  compileAG(grammar, endRegexSource, allowA, allowG) {
    return this._getCachedCompiledPatterns(grammar).compileAG(grammar, allowA, allowG);
  }
  _getCachedCompiledPatterns(grammar) {
    if (!this._cachedCompiledPatterns) {
      this._cachedCompiledPatterns = new RegExpSourceList();
      this.collectPatterns(grammar, this._cachedCompiledPatterns);
    }
    return this._cachedCompiledPatterns;
  }
};
var IncludeOnlyRule = class extends Rule {
  hasMissingPatterns;
  patterns;
  _cachedCompiledPatterns;
  constructor($location, id, name, contentName, patterns) {
    super($location, id, name, contentName);
    this.patterns = patterns.patterns;
    this.hasMissingPatterns = patterns.hasMissingPatterns;
    this._cachedCompiledPatterns = null;
  }
  dispose() {
    if (this._cachedCompiledPatterns) {
      this._cachedCompiledPatterns.dispose();
      this._cachedCompiledPatterns = null;
    }
  }
  collectPatterns(grammar, out) {
    for (const pattern of this.patterns) {
      const rule = grammar.getRule(pattern);
      rule.collectPatterns(grammar, out);
    }
  }
  compile(grammar, endRegexSource) {
    return this._getCachedCompiledPatterns(grammar).compile(grammar);
  }
  compileAG(grammar, endRegexSource, allowA, allowG) {
    return this._getCachedCompiledPatterns(grammar).compileAG(grammar, allowA, allowG);
  }
  _getCachedCompiledPatterns(grammar) {
    if (!this._cachedCompiledPatterns) {
      this._cachedCompiledPatterns = new RegExpSourceList();
      this.collectPatterns(grammar, this._cachedCompiledPatterns);
    }
    return this._cachedCompiledPatterns;
  }
};
var BeginEndRule = class extends Rule {
  _begin;
  beginCaptures;
  _end;
  endHasBackReferences;
  endCaptures;
  applyEndPatternLast;
  hasMissingPatterns;
  patterns;
  _cachedCompiledPatterns;
  constructor($location, id, name, contentName, begin, beginCaptures, end, endCaptures, applyEndPatternLast, patterns) {
    super($location, id, name, contentName);
    this._begin = new RegExpSource(begin, this.id);
    this.beginCaptures = beginCaptures;
    this._end = new RegExpSource(end ? end : "￿", -1);
    this.endHasBackReferences = this._end.hasBackReferences;
    this.endCaptures = endCaptures;
    this.applyEndPatternLast = applyEndPatternLast || false;
    this.patterns = patterns.patterns;
    this.hasMissingPatterns = patterns.hasMissingPatterns;
    this._cachedCompiledPatterns = null;
  }
  dispose() {
    if (this._cachedCompiledPatterns) {
      this._cachedCompiledPatterns.dispose();
      this._cachedCompiledPatterns = null;
    }
  }
  get debugBeginRegExp() {
    return `${this._begin.source}`;
  }
  get debugEndRegExp() {
    return `${this._end.source}`;
  }
  getEndWithResolvedBackReferences(lineText, captureIndices) {
    return this._end.resolveBackReferences(lineText, captureIndices);
  }
  collectPatterns(grammar, out) {
    out.push(this._begin);
  }
  compile(grammar, endRegexSource) {
    return this._getCachedCompiledPatterns(grammar, endRegexSource).compile(grammar);
  }
  compileAG(grammar, endRegexSource, allowA, allowG) {
    return this._getCachedCompiledPatterns(grammar, endRegexSource).compileAG(grammar, allowA, allowG);
  }
  _getCachedCompiledPatterns(grammar, endRegexSource) {
    if (!this._cachedCompiledPatterns) {
      this._cachedCompiledPatterns = new RegExpSourceList();
      for (const pattern of this.patterns) {
        const rule = grammar.getRule(pattern);
        rule.collectPatterns(grammar, this._cachedCompiledPatterns);
      }
      if (this.applyEndPatternLast) {
        this._cachedCompiledPatterns.push(this._end.hasBackReferences ? this._end.clone() : this._end);
      } else {
        this._cachedCompiledPatterns.unshift(this._end.hasBackReferences ? this._end.clone() : this._end);
      }
    }
    if (this._end.hasBackReferences) {
      if (this.applyEndPatternLast) {
        this._cachedCompiledPatterns.setSource(this._cachedCompiledPatterns.length() - 1, endRegexSource);
      } else {
        this._cachedCompiledPatterns.setSource(0, endRegexSource);
      }
    }
    return this._cachedCompiledPatterns;
  }
};
var BeginWhileRule = class extends Rule {
  _begin;
  beginCaptures;
  whileCaptures;
  _while;
  whileHasBackReferences;
  hasMissingPatterns;
  patterns;
  _cachedCompiledPatterns;
  _cachedCompiledWhilePatterns;
  constructor($location, id, name, contentName, begin, beginCaptures, _while, whileCaptures, patterns) {
    super($location, id, name, contentName);
    this._begin = new RegExpSource(begin, this.id);
    this.beginCaptures = beginCaptures;
    this.whileCaptures = whileCaptures;
    this._while = new RegExpSource(_while, whileRuleId);
    this.whileHasBackReferences = this._while.hasBackReferences;
    this.patterns = patterns.patterns;
    this.hasMissingPatterns = patterns.hasMissingPatterns;
    this._cachedCompiledPatterns = null;
    this._cachedCompiledWhilePatterns = null;
  }
  dispose() {
    if (this._cachedCompiledPatterns) {
      this._cachedCompiledPatterns.dispose();
      this._cachedCompiledPatterns = null;
    }
    if (this._cachedCompiledWhilePatterns) {
      this._cachedCompiledWhilePatterns.dispose();
      this._cachedCompiledWhilePatterns = null;
    }
  }
  get debugBeginRegExp() {
    return `${this._begin.source}`;
  }
  get debugWhileRegExp() {
    return `${this._while.source}`;
  }
  getWhileWithResolvedBackReferences(lineText, captureIndices) {
    return this._while.resolveBackReferences(lineText, captureIndices);
  }
  collectPatterns(grammar, out) {
    out.push(this._begin);
  }
  compile(grammar, endRegexSource) {
    return this._getCachedCompiledPatterns(grammar).compile(grammar);
  }
  compileAG(grammar, endRegexSource, allowA, allowG) {
    return this._getCachedCompiledPatterns(grammar).compileAG(grammar, allowA, allowG);
  }
  _getCachedCompiledPatterns(grammar) {
    if (!this._cachedCompiledPatterns) {
      this._cachedCompiledPatterns = new RegExpSourceList();
      for (const pattern of this.patterns) {
        const rule = grammar.getRule(pattern);
        rule.collectPatterns(grammar, this._cachedCompiledPatterns);
      }
    }
    return this._cachedCompiledPatterns;
  }
  compileWhile(grammar, endRegexSource) {
    return this._getCachedCompiledWhilePatterns(grammar, endRegexSource).compile(grammar);
  }
  compileWhileAG(grammar, endRegexSource, allowA, allowG) {
    return this._getCachedCompiledWhilePatterns(grammar, endRegexSource).compileAG(grammar, allowA, allowG);
  }
  _getCachedCompiledWhilePatterns(grammar, endRegexSource) {
    if (!this._cachedCompiledWhilePatterns) {
      this._cachedCompiledWhilePatterns = new RegExpSourceList();
      this._cachedCompiledWhilePatterns.push(this._while.hasBackReferences ? this._while.clone() : this._while);
    }
    if (this._while.hasBackReferences) {
      this._cachedCompiledWhilePatterns.setSource(0, endRegexSource ? endRegexSource : "￿");
    }
    return this._cachedCompiledWhilePatterns;
  }
};
var RuleFactory = class _RuleFactory {
  static createCaptureRule(helper, $location, name, contentName, retokenizeCapturedWithRuleId) {
    return helper.registerRule((id) => {
      return new CaptureRule($location, id, name, contentName, retokenizeCapturedWithRuleId);
    });
  }
  static getCompiledRuleId(desc, helper, repository) {
    if (!desc.id) {
      helper.registerRule((id) => {
        desc.id = id;
        if (desc.match) {
          return new MatchRule(
            desc.$vscodeTextmateLocation,
            desc.id,
            desc.name,
            desc.match,
            _RuleFactory._compileCaptures(desc.captures, helper, repository)
          );
        }
        if (typeof desc.begin === "undefined") {
          if (desc.repository) {
            repository = mergeObjects({}, repository, desc.repository);
          }
          let patterns = desc.patterns;
          if (typeof patterns === "undefined" && desc.include) {
            patterns = [{ include: desc.include }];
          }
          return new IncludeOnlyRule(
            desc.$vscodeTextmateLocation,
            desc.id,
            desc.name,
            desc.contentName,
            _RuleFactory._compilePatterns(patterns, helper, repository)
          );
        }
        if (desc.while) {
          return new BeginWhileRule(
            desc.$vscodeTextmateLocation,
            desc.id,
            desc.name,
            desc.contentName,
            desc.begin,
            _RuleFactory._compileCaptures(desc.beginCaptures || desc.captures, helper, repository),
            desc.while,
            _RuleFactory._compileCaptures(desc.whileCaptures || desc.captures, helper, repository),
            _RuleFactory._compilePatterns(desc.patterns, helper, repository)
          );
        }
        return new BeginEndRule(
          desc.$vscodeTextmateLocation,
          desc.id,
          desc.name,
          desc.contentName,
          desc.begin,
          _RuleFactory._compileCaptures(desc.beginCaptures || desc.captures, helper, repository),
          desc.end,
          _RuleFactory._compileCaptures(desc.endCaptures || desc.captures, helper, repository),
          desc.applyEndPatternLast,
          _RuleFactory._compilePatterns(desc.patterns, helper, repository)
        );
      });
    }
    return desc.id;
  }
  static _compileCaptures(captures, helper, repository) {
    let r2 = [];
    if (captures) {
      let maximumCaptureId = 0;
      for (const captureId in captures) {
        if (captureId === "$vscodeTextmateLocation") {
          continue;
        }
        const numericCaptureId = parseInt(captureId, 10);
        if (numericCaptureId > maximumCaptureId) {
          maximumCaptureId = numericCaptureId;
        }
      }
      for (let i2 = 0; i2 <= maximumCaptureId; i2++) {
        r2[i2] = null;
      }
      for (const captureId in captures) {
        if (captureId === "$vscodeTextmateLocation") {
          continue;
        }
        const numericCaptureId = parseInt(captureId, 10);
        let retokenizeCapturedWithRuleId = 0;
        if (captures[captureId].patterns) {
          retokenizeCapturedWithRuleId = _RuleFactory.getCompiledRuleId(captures[captureId], helper, repository);
        }
        r2[numericCaptureId] = _RuleFactory.createCaptureRule(helper, captures[captureId].$vscodeTextmateLocation, captures[captureId].name, captures[captureId].contentName, retokenizeCapturedWithRuleId);
      }
    }
    return r2;
  }
  static _compilePatterns(patterns, helper, repository) {
    let r2 = [];
    if (patterns) {
      for (let i2 = 0, len = patterns.length; i2 < len; i2++) {
        const pattern = patterns[i2];
        let ruleId = -1;
        if (pattern.include) {
          const reference = parseInclude(pattern.include);
          switch (reference.kind) {
            case 0:
            case 1:
              ruleId = _RuleFactory.getCompiledRuleId(repository[pattern.include], helper, repository);
              break;
            case 2:
              let localIncludedRule = repository[reference.ruleName];
              if (localIncludedRule) {
                ruleId = _RuleFactory.getCompiledRuleId(localIncludedRule, helper, repository);
              }
              break;
            case 3:
            case 4:
              const externalGrammarName = reference.scopeName;
              const externalGrammarInclude = reference.kind === 4 ? reference.ruleName : null;
              const externalGrammar = helper.getExternalGrammar(externalGrammarName, repository);
              if (externalGrammar) {
                if (externalGrammarInclude) {
                  let externalIncludedRule = externalGrammar.repository[externalGrammarInclude];
                  if (externalIncludedRule) {
                    ruleId = _RuleFactory.getCompiledRuleId(externalIncludedRule, helper, externalGrammar.repository);
                  }
                } else {
                  ruleId = _RuleFactory.getCompiledRuleId(externalGrammar.repository.$self, helper, externalGrammar.repository);
                }
              }
              break;
          }
        } else {
          ruleId = _RuleFactory.getCompiledRuleId(pattern, helper, repository);
        }
        if (ruleId !== -1) {
          const rule = helper.getRule(ruleId);
          let skipRule = false;
          if (rule instanceof IncludeOnlyRule || rule instanceof BeginEndRule || rule instanceof BeginWhileRule) {
            if (rule.hasMissingPatterns && rule.patterns.length === 0) {
              skipRule = true;
            }
          }
          if (skipRule) {
            continue;
          }
          r2.push(ruleId);
        }
      }
    }
    return {
      patterns: r2,
      hasMissingPatterns: (patterns ? patterns.length : 0) !== r2.length
    };
  }
};
var RegExpSource = class _RegExpSource {
  source;
  ruleId;
  hasAnchor;
  hasBackReferences;
  _anchorCache;
  constructor(regExpSource, ruleId) {
    if (regExpSource && typeof regExpSource === "string") {
      const len = regExpSource.length;
      let lastPushedPos = 0;
      let output = [];
      let hasAnchor = false;
      for (let pos = 0; pos < len; pos++) {
        const ch = regExpSource.charAt(pos);
        if (ch === "\\") {
          if (pos + 1 < len) {
            const nextCh = regExpSource.charAt(pos + 1);
            if (nextCh === "z") {
              output.push(regExpSource.substring(lastPushedPos, pos));
              output.push("$(?!\\n)(?<!\\n)");
              lastPushedPos = pos + 2;
            } else if (nextCh === "A" || nextCh === "G") {
              hasAnchor = true;
            }
            pos++;
          }
        }
      }
      this.hasAnchor = hasAnchor;
      if (lastPushedPos === 0) {
        this.source = regExpSource;
      } else {
        output.push(regExpSource.substring(lastPushedPos, len));
        this.source = output.join("");
      }
    } else {
      this.hasAnchor = false;
      this.source = regExpSource;
    }
    if (this.hasAnchor) {
      this._anchorCache = this._buildAnchorCache();
    } else {
      this._anchorCache = null;
    }
    this.ruleId = ruleId;
    if (typeof this.source === "string") {
      this.hasBackReferences = HAS_BACK_REFERENCES.test(this.source);
    } else {
      this.hasBackReferences = false;
    }
  }
  clone() {
    return new _RegExpSource(this.source, this.ruleId);
  }
  setSource(newSource) {
    if (this.source === newSource) {
      return;
    }
    this.source = newSource;
    if (this.hasAnchor) {
      this._anchorCache = this._buildAnchorCache();
    }
  }
  resolveBackReferences(lineText, captureIndices) {
    if (typeof this.source !== "string") {
      throw new Error("This method should only be called if the source is a string");
    }
    let capturedValues = captureIndices.map((capture) => {
      return lineText.substring(capture.start, capture.end);
    });
    BACK_REFERENCING_END.lastIndex = 0;
    return this.source.replace(BACK_REFERENCING_END, (match, g1) => {
      return escapeRegExpCharacters(capturedValues[parseInt(g1, 10)] || "");
    });
  }
  _buildAnchorCache() {
    if (typeof this.source !== "string") {
      throw new Error("This method should only be called if the source is a string");
    }
    let A0_G0_result = [];
    let A0_G1_result = [];
    let A1_G0_result = [];
    let A1_G1_result = [];
    let pos, len, ch, nextCh;
    for (pos = 0, len = this.source.length; pos < len; pos++) {
      ch = this.source.charAt(pos);
      A0_G0_result[pos] = ch;
      A0_G1_result[pos] = ch;
      A1_G0_result[pos] = ch;
      A1_G1_result[pos] = ch;
      if (ch === "\\") {
        if (pos + 1 < len) {
          nextCh = this.source.charAt(pos + 1);
          if (nextCh === "A") {
            A0_G0_result[pos + 1] = "￿";
            A0_G1_result[pos + 1] = "￿";
            A1_G0_result[pos + 1] = "A";
            A1_G1_result[pos + 1] = "A";
          } else if (nextCh === "G") {
            A0_G0_result[pos + 1] = "￿";
            A0_G1_result[pos + 1] = "G";
            A1_G0_result[pos + 1] = "￿";
            A1_G1_result[pos + 1] = "G";
          } else {
            A0_G0_result[pos + 1] = nextCh;
            A0_G1_result[pos + 1] = nextCh;
            A1_G0_result[pos + 1] = nextCh;
            A1_G1_result[pos + 1] = nextCh;
          }
          pos++;
        }
      }
    }
    return {
      A0_G0: A0_G0_result.join(""),
      A0_G1: A0_G1_result.join(""),
      A1_G0: A1_G0_result.join(""),
      A1_G1: A1_G1_result.join("")
    };
  }
  resolveAnchors(allowA, allowG) {
    if (!this.hasAnchor || !this._anchorCache || typeof this.source !== "string") {
      return this.source;
    }
    if (allowA) {
      if (allowG) {
        return this._anchorCache.A1_G1;
      } else {
        return this._anchorCache.A1_G0;
      }
    } else {
      if (allowG) {
        return this._anchorCache.A0_G1;
      } else {
        return this._anchorCache.A0_G0;
      }
    }
  }
};
var RegExpSourceList = class {
  _items;
  _hasAnchors;
  _cached;
  _anchorCache;
  constructor() {
    this._items = [];
    this._hasAnchors = false;
    this._cached = null;
    this._anchorCache = {
      A0_G0: null,
      A0_G1: null,
      A1_G0: null,
      A1_G1: null
    };
  }
  dispose() {
    this._disposeCaches();
  }
  _disposeCaches() {
    if (this._cached) {
      this._cached.dispose();
      this._cached = null;
    }
    if (this._anchorCache.A0_G0) {
      this._anchorCache.A0_G0.dispose();
      this._anchorCache.A0_G0 = null;
    }
    if (this._anchorCache.A0_G1) {
      this._anchorCache.A0_G1.dispose();
      this._anchorCache.A0_G1 = null;
    }
    if (this._anchorCache.A1_G0) {
      this._anchorCache.A1_G0.dispose();
      this._anchorCache.A1_G0 = null;
    }
    if (this._anchorCache.A1_G1) {
      this._anchorCache.A1_G1.dispose();
      this._anchorCache.A1_G1 = null;
    }
  }
  push(item) {
    this._items.push(item);
    this._hasAnchors = this._hasAnchors || item.hasAnchor;
  }
  unshift(item) {
    this._items.unshift(item);
    this._hasAnchors = this._hasAnchors || item.hasAnchor;
  }
  length() {
    return this._items.length;
  }
  setSource(index, newSource) {
    if (this._items[index].source !== newSource) {
      this._disposeCaches();
      this._items[index].setSource(newSource);
    }
  }
  compile(onigLib) {
    if (!this._cached) {
      let regExps = this._items.map((e) => e.source);
      this._cached = new CompiledRule(onigLib, regExps, this._items.map((e) => e.ruleId));
    }
    return this._cached;
  }
  compileAG(onigLib, allowA, allowG) {
    if (!this._hasAnchors) {
      return this.compile(onigLib);
    } else {
      if (allowA) {
        if (allowG) {
          if (!this._anchorCache.A1_G1) {
            this._anchorCache.A1_G1 = this._resolveAnchors(onigLib, allowA, allowG);
          }
          return this._anchorCache.A1_G1;
        } else {
          if (!this._anchorCache.A1_G0) {
            this._anchorCache.A1_G0 = this._resolveAnchors(onigLib, allowA, allowG);
          }
          return this._anchorCache.A1_G0;
        }
      } else {
        if (allowG) {
          if (!this._anchorCache.A0_G1) {
            this._anchorCache.A0_G1 = this._resolveAnchors(onigLib, allowA, allowG);
          }
          return this._anchorCache.A0_G1;
        } else {
          if (!this._anchorCache.A0_G0) {
            this._anchorCache.A0_G0 = this._resolveAnchors(onigLib, allowA, allowG);
          }
          return this._anchorCache.A0_G0;
        }
      }
    }
  }
  _resolveAnchors(onigLib, allowA, allowG) {
    let regExps = this._items.map((e) => e.resolveAnchors(allowA, allowG));
    return new CompiledRule(onigLib, regExps, this._items.map((e) => e.ruleId));
  }
};
var CompiledRule = class {
  constructor(onigLib, regExps, rules) {
    this.regExps = regExps;
    this.rules = rules;
    this.scanner = onigLib.createOnigScanner(regExps);
  }
  scanner;
  dispose() {
    if (typeof this.scanner.dispose === "function") {
      this.scanner.dispose();
    }
  }
  toString() {
    const r2 = [];
    for (let i2 = 0, len = this.rules.length; i2 < len; i2++) {
      r2.push("   - " + this.rules[i2] + ": " + this.regExps[i2]);
    }
    return r2.join("\n");
  }
  findNextMatchSync(string, startPosition, options) {
    const result = this.scanner.findNextMatchSync(string, startPosition, options);
    if (!result) {
      return null;
    }
    return {
      ruleId: this.rules[result.index],
      captureIndices: result.captureIndices
    };
  }
};
var BasicScopeAttributes = class {
  constructor(languageId, tokenType) {
    this.languageId = languageId;
    this.tokenType = tokenType;
  }
};
var BasicScopeAttributesProvider = class _BasicScopeAttributesProvider {
  _defaultAttributes;
  _embeddedLanguagesMatcher;
  constructor(initialLanguageId, embeddedLanguages) {
    this._defaultAttributes = new BasicScopeAttributes(
      initialLanguageId,
      8
      /* NotSet */
    );
    this._embeddedLanguagesMatcher = new ScopeMatcher(Object.entries(embeddedLanguages || {}));
  }
  getDefaultAttributes() {
    return this._defaultAttributes;
  }
  getBasicScopeAttributes(scopeName) {
    if (scopeName === null) {
      return _BasicScopeAttributesProvider._NULL_SCOPE_METADATA;
    }
    return this._getBasicScopeAttributes.get(scopeName);
  }
  static _NULL_SCOPE_METADATA = new BasicScopeAttributes(0, 0);
  _getBasicScopeAttributes = new CachedFn((scopeName) => {
    const languageId = this._scopeToLanguage(scopeName);
    const standardTokenType = this._toStandardTokenType(scopeName);
    return new BasicScopeAttributes(languageId, standardTokenType);
  });
  /**
   * Given a produced TM scope, return the language that token describes or null if unknown.
   * e.g. source.html => html, source.css.embedded.html => css, punctuation.definition.tag.html => null
   */
  _scopeToLanguage(scope) {
    return this._embeddedLanguagesMatcher.match(scope) || 0;
  }
  _toStandardTokenType(scopeName) {
    const m2 = scopeName.match(_BasicScopeAttributesProvider.STANDARD_TOKEN_TYPE_REGEXP);
    if (!m2) {
      return 8;
    }
    switch (m2[1]) {
      case "comment":
        return 1;
      case "string":
        return 2;
      case "regex":
        return 3;
      case "meta.embedded":
        return 0;
    }
    throw new Error("Unexpected match for standard token type!");
  }
  static STANDARD_TOKEN_TYPE_REGEXP = /\b(comment|string|regex|meta\.embedded)\b/;
};
var ScopeMatcher = class {
  values;
  scopesRegExp;
  constructor(values) {
    if (values.length === 0) {
      this.values = null;
      this.scopesRegExp = null;
    } else {
      this.values = new Map(values);
      const escapedScopes = values.map(
        ([scopeName, value]) => escapeRegExpCharacters(scopeName)
      );
      escapedScopes.sort();
      escapedScopes.reverse();
      this.scopesRegExp = new RegExp(
        `^((${escapedScopes.join(")|(")}))($|\\.)`,
        ""
      );
    }
  }
  match(scope) {
    if (!this.scopesRegExp) {
      return void 0;
    }
    const m2 = scope.match(this.scopesRegExp);
    if (!m2) {
      return void 0;
    }
    return this.values.get(m2[1]);
  }
};
var TokenizeStringResult = class {
  constructor(stack, stoppedEarly) {
    this.stack = stack;
    this.stoppedEarly = stoppedEarly;
  }
};
function _tokenizeString(grammar, lineText, isFirstLine, linePos, stack, lineTokens, checkWhileConditions, timeLimit) {
  const lineLength = lineText.content.length;
  let STOP = false;
  let anchorPosition = -1;
  if (checkWhileConditions) {
    const whileCheckResult = _checkWhileConditions(
      grammar,
      lineText,
      isFirstLine,
      linePos,
      stack,
      lineTokens
    );
    stack = whileCheckResult.stack;
    linePos = whileCheckResult.linePos;
    isFirstLine = whileCheckResult.isFirstLine;
    anchorPosition = whileCheckResult.anchorPosition;
  }
  const startTime = Date.now();
  while (!STOP) {
    if (timeLimit !== 0) {
      const elapsedTime = Date.now() - startTime;
      if (elapsedTime > timeLimit) {
        return new TokenizeStringResult(stack, true);
      }
    }
    scanNext();
  }
  return new TokenizeStringResult(stack, false);
  function scanNext() {
    const r2 = matchRuleOrInjections(
      grammar,
      lineText,
      isFirstLine,
      linePos,
      stack,
      anchorPosition
    );
    if (!r2) {
      lineTokens.produce(stack, lineLength);
      STOP = true;
      return;
    }
    const captureIndices = r2.captureIndices;
    const matchedRuleId = r2.matchedRuleId;
    const hasAdvanced = captureIndices && captureIndices.length > 0 ? captureIndices[0].end > linePos : false;
    if (matchedRuleId === endRuleId) {
      const poppedRule = stack.getRule(grammar);
      lineTokens.produce(stack, captureIndices[0].start);
      stack = stack.withContentNameScopesList(stack.nameScopesList);
      handleCaptures(
        grammar,
        lineText,
        isFirstLine,
        stack,
        lineTokens,
        poppedRule.endCaptures,
        captureIndices
      );
      lineTokens.produce(stack, captureIndices[0].end);
      const popped = stack;
      stack = stack.parent;
      anchorPosition = popped.getAnchorPos();
      if (!hasAdvanced && popped.getEnterPos() === linePos) {
        stack = popped;
        lineTokens.produce(stack, lineLength);
        STOP = true;
        return;
      }
    } else {
      const _rule = grammar.getRule(matchedRuleId);
      lineTokens.produce(stack, captureIndices[0].start);
      const beforePush = stack;
      const scopeName = _rule.getName(lineText.content, captureIndices);
      const nameScopesList = stack.contentNameScopesList.pushAttributed(
        scopeName,
        grammar
      );
      stack = stack.push(
        matchedRuleId,
        linePos,
        anchorPosition,
        captureIndices[0].end === lineLength,
        null,
        nameScopesList,
        nameScopesList
      );
      if (_rule instanceof BeginEndRule) {
        const pushedRule = _rule;
        handleCaptures(
          grammar,
          lineText,
          isFirstLine,
          stack,
          lineTokens,
          pushedRule.beginCaptures,
          captureIndices
        );
        lineTokens.produce(stack, captureIndices[0].end);
        anchorPosition = captureIndices[0].end;
        const contentName = pushedRule.getContentName(
          lineText.content,
          captureIndices
        );
        const contentNameScopesList = nameScopesList.pushAttributed(
          contentName,
          grammar
        );
        stack = stack.withContentNameScopesList(contentNameScopesList);
        if (pushedRule.endHasBackReferences) {
          stack = stack.withEndRule(
            pushedRule.getEndWithResolvedBackReferences(
              lineText.content,
              captureIndices
            )
          );
        }
        if (!hasAdvanced && beforePush.hasSameRuleAs(stack)) {
          stack = stack.pop();
          lineTokens.produce(stack, lineLength);
          STOP = true;
          return;
        }
      } else if (_rule instanceof BeginWhileRule) {
        const pushedRule = _rule;
        handleCaptures(
          grammar,
          lineText,
          isFirstLine,
          stack,
          lineTokens,
          pushedRule.beginCaptures,
          captureIndices
        );
        lineTokens.produce(stack, captureIndices[0].end);
        anchorPosition = captureIndices[0].end;
        const contentName = pushedRule.getContentName(
          lineText.content,
          captureIndices
        );
        const contentNameScopesList = nameScopesList.pushAttributed(
          contentName,
          grammar
        );
        stack = stack.withContentNameScopesList(contentNameScopesList);
        if (pushedRule.whileHasBackReferences) {
          stack = stack.withEndRule(
            pushedRule.getWhileWithResolvedBackReferences(
              lineText.content,
              captureIndices
            )
          );
        }
        if (!hasAdvanced && beforePush.hasSameRuleAs(stack)) {
          stack = stack.pop();
          lineTokens.produce(stack, lineLength);
          STOP = true;
          return;
        }
      } else {
        const matchingRule = _rule;
        handleCaptures(
          grammar,
          lineText,
          isFirstLine,
          stack,
          lineTokens,
          matchingRule.captures,
          captureIndices
        );
        lineTokens.produce(stack, captureIndices[0].end);
        stack = stack.pop();
        if (!hasAdvanced) {
          stack = stack.safePop();
          lineTokens.produce(stack, lineLength);
          STOP = true;
          return;
        }
      }
    }
    if (captureIndices[0].end > linePos) {
      linePos = captureIndices[0].end;
      isFirstLine = false;
    }
  }
}
function _checkWhileConditions(grammar, lineText, isFirstLine, linePos, stack, lineTokens) {
  let anchorPosition = stack.beginRuleCapturedEOL ? 0 : -1;
  const whileRules = [];
  for (let node = stack; node; node = node.pop()) {
    const nodeRule = node.getRule(grammar);
    if (nodeRule instanceof BeginWhileRule) {
      whileRules.push({
        rule: nodeRule,
        stack: node
      });
    }
  }
  for (let whileRule = whileRules.pop(); whileRule; whileRule = whileRules.pop()) {
    const { ruleScanner, findOptions } = prepareRuleWhileSearch(whileRule.rule, grammar, whileRule.stack.endRule, isFirstLine, linePos === anchorPosition);
    const r2 = ruleScanner.findNextMatchSync(lineText, linePos, findOptions);
    if (r2) {
      const matchedRuleId = r2.ruleId;
      if (matchedRuleId !== whileRuleId) {
        stack = whileRule.stack.pop();
        break;
      }
      if (r2.captureIndices && r2.captureIndices.length) {
        lineTokens.produce(whileRule.stack, r2.captureIndices[0].start);
        handleCaptures(grammar, lineText, isFirstLine, whileRule.stack, lineTokens, whileRule.rule.whileCaptures, r2.captureIndices);
        lineTokens.produce(whileRule.stack, r2.captureIndices[0].end);
        anchorPosition = r2.captureIndices[0].end;
        if (r2.captureIndices[0].end > linePos) {
          linePos = r2.captureIndices[0].end;
          isFirstLine = false;
        }
      }
    } else {
      stack = whileRule.stack.pop();
      break;
    }
  }
  return { stack, linePos, anchorPosition, isFirstLine };
}
function matchRuleOrInjections(grammar, lineText, isFirstLine, linePos, stack, anchorPosition) {
  const matchResult = matchRule(grammar, lineText, isFirstLine, linePos, stack, anchorPosition);
  const injections = grammar.getInjections();
  if (injections.length === 0) {
    return matchResult;
  }
  const injectionResult = matchInjections(injections, grammar, lineText, isFirstLine, linePos, stack, anchorPosition);
  if (!injectionResult) {
    return matchResult;
  }
  if (!matchResult) {
    return injectionResult;
  }
  const matchResultScore = matchResult.captureIndices[0].start;
  const injectionResultScore = injectionResult.captureIndices[0].start;
  if (injectionResultScore < matchResultScore || injectionResult.priorityMatch && injectionResultScore === matchResultScore) {
    return injectionResult;
  }
  return matchResult;
}
function matchRule(grammar, lineText, isFirstLine, linePos, stack, anchorPosition) {
  const rule = stack.getRule(grammar);
  const { ruleScanner, findOptions } = prepareRuleSearch(rule, grammar, stack.endRule, isFirstLine, linePos === anchorPosition);
  const r2 = ruleScanner.findNextMatchSync(lineText, linePos, findOptions);
  if (r2) {
    return {
      captureIndices: r2.captureIndices,
      matchedRuleId: r2.ruleId
    };
  }
  return null;
}
function matchInjections(injections, grammar, lineText, isFirstLine, linePos, stack, anchorPosition) {
  let bestMatchRating = Number.MAX_VALUE;
  let bestMatchCaptureIndices = null;
  let bestMatchRuleId;
  let bestMatchResultPriority = 0;
  const scopes = stack.contentNameScopesList.getScopeNames();
  for (let i2 = 0, len = injections.length; i2 < len; i2++) {
    const injection = injections[i2];
    if (!injection.matcher(scopes)) {
      continue;
    }
    const rule = grammar.getRule(injection.ruleId);
    const { ruleScanner, findOptions } = prepareRuleSearch(rule, grammar, null, isFirstLine, linePos === anchorPosition);
    const matchResult = ruleScanner.findNextMatchSync(lineText, linePos, findOptions);
    if (!matchResult) {
      continue;
    }
    const matchRating = matchResult.captureIndices[0].start;
    if (matchRating >= bestMatchRating) {
      continue;
    }
    bestMatchRating = matchRating;
    bestMatchCaptureIndices = matchResult.captureIndices;
    bestMatchRuleId = matchResult.ruleId;
    bestMatchResultPriority = injection.priority;
    if (bestMatchRating === linePos) {
      break;
    }
  }
  if (bestMatchCaptureIndices) {
    return {
      priorityMatch: bestMatchResultPriority === -1,
      captureIndices: bestMatchCaptureIndices,
      matchedRuleId: bestMatchRuleId
    };
  }
  return null;
}
function prepareRuleSearch(rule, grammar, endRegexSource, allowA, allowG) {
  const ruleScanner = rule.compileAG(grammar, endRegexSource, allowA, allowG);
  return {
    ruleScanner,
    findOptions: 0
    /* None */
  };
}
function prepareRuleWhileSearch(rule, grammar, endRegexSource, allowA, allowG) {
  const ruleScanner = rule.compileWhileAG(grammar, endRegexSource, allowA, allowG);
  return {
    ruleScanner,
    findOptions: 0
    /* None */
  };
}
function handleCaptures(grammar, lineText, isFirstLine, stack, lineTokens, captures, captureIndices) {
  if (captures.length === 0) {
    return;
  }
  const lineTextContent = lineText.content;
  const len = Math.min(captures.length, captureIndices.length);
  const localStack = [];
  const maxEnd = captureIndices[0].end;
  for (let i2 = 0; i2 < len; i2++) {
    const captureRule = captures[i2];
    if (captureRule === null) {
      continue;
    }
    const captureIndex = captureIndices[i2];
    if (captureIndex.length === 0) {
      continue;
    }
    if (captureIndex.start > maxEnd) {
      break;
    }
    while (localStack.length > 0 && localStack[localStack.length - 1].endPos <= captureIndex.start) {
      lineTokens.produceFromScopes(localStack[localStack.length - 1].scopes, localStack[localStack.length - 1].endPos);
      localStack.pop();
    }
    if (localStack.length > 0) {
      lineTokens.produceFromScopes(localStack[localStack.length - 1].scopes, captureIndex.start);
    } else {
      lineTokens.produce(stack, captureIndex.start);
    }
    if (captureRule.retokenizeCapturedWithRuleId) {
      const scopeName = captureRule.getName(lineTextContent, captureIndices);
      const nameScopesList = stack.contentNameScopesList.pushAttributed(scopeName, grammar);
      const contentName = captureRule.getContentName(lineTextContent, captureIndices);
      const contentNameScopesList = nameScopesList.pushAttributed(contentName, grammar);
      const stackClone = stack.push(captureRule.retokenizeCapturedWithRuleId, captureIndex.start, -1, false, null, nameScopesList, contentNameScopesList);
      const onigSubStr = grammar.createOnigString(lineTextContent.substring(0, captureIndex.end));
      _tokenizeString(
        grammar,
        onigSubStr,
        isFirstLine && captureIndex.start === 0,
        captureIndex.start,
        stackClone,
        lineTokens,
        false,
        /* no time limit */
        0
      );
      disposeOnigString(onigSubStr);
      continue;
    }
    const captureRuleScopeName = captureRule.getName(lineTextContent, captureIndices);
    if (captureRuleScopeName !== null) {
      const base = localStack.length > 0 ? localStack[localStack.length - 1].scopes : stack.contentNameScopesList;
      const captureRuleScopesList = base.pushAttributed(captureRuleScopeName, grammar);
      localStack.push(new LocalStackElement(captureRuleScopesList, captureIndex.end));
    }
  }
  while (localStack.length > 0) {
    lineTokens.produceFromScopes(localStack[localStack.length - 1].scopes, localStack[localStack.length - 1].endPos);
    localStack.pop();
  }
}
var LocalStackElement = class {
  scopes;
  endPos;
  constructor(scopes, endPos) {
    this.scopes = scopes;
    this.endPos = endPos;
  }
};
function createGrammar(scopeName, grammar, initialLanguage, embeddedLanguages, tokenTypes, balancedBracketSelectors, grammarRepository, onigLib) {
  return new Grammar(
    scopeName,
    grammar,
    initialLanguage,
    embeddedLanguages,
    tokenTypes,
    balancedBracketSelectors,
    grammarRepository,
    onigLib
  );
}
function collectInjections(result, selector, rule, ruleFactoryHelper, grammar) {
  const matchers = createMatchers(selector, nameMatcher);
  const ruleId = RuleFactory.getCompiledRuleId(rule, ruleFactoryHelper, grammar.repository);
  for (const matcher of matchers) {
    result.push({
      debugSelector: selector,
      matcher: matcher.matcher,
      ruleId,
      grammar,
      priority: matcher.priority
    });
  }
}
function nameMatcher(identifers, scopes) {
  if (scopes.length < identifers.length) {
    return false;
  }
  let lastIndex = 0;
  return identifers.every((identifier) => {
    for (let i2 = lastIndex; i2 < scopes.length; i2++) {
      if (scopesAreMatching(scopes[i2], identifier)) {
        lastIndex = i2 + 1;
        return true;
      }
    }
    return false;
  });
}
function scopesAreMatching(thisScopeName, scopeName) {
  if (!thisScopeName) {
    return false;
  }
  if (thisScopeName === scopeName) {
    return true;
  }
  const len = scopeName.length;
  return thisScopeName.length > len && thisScopeName.substr(0, len) === scopeName && thisScopeName[len] === ".";
}
var Grammar = class {
  constructor(_rootScopeName, grammar, initialLanguage, embeddedLanguages, tokenTypes, balancedBracketSelectors, grammarRepository, _onigLib) {
    this._rootScopeName = _rootScopeName;
    this.balancedBracketSelectors = balancedBracketSelectors;
    this._onigLib = _onigLib;
    this._basicScopeAttributesProvider = new BasicScopeAttributesProvider(
      initialLanguage,
      embeddedLanguages
    );
    this._rootId = -1;
    this._lastRuleId = 0;
    this._ruleId2desc = [null];
    this._includedGrammars = {};
    this._grammarRepository = grammarRepository;
    this._grammar = initGrammar(grammar, null);
    this._injections = null;
    this._tokenTypeMatchers = [];
    if (tokenTypes) {
      for (const selector of Object.keys(tokenTypes)) {
        const matchers = createMatchers(selector, nameMatcher);
        for (const matcher of matchers) {
          this._tokenTypeMatchers.push({
            matcher: matcher.matcher,
            type: tokenTypes[selector]
          });
        }
      }
    }
  }
  _rootId;
  _lastRuleId;
  _ruleId2desc;
  _includedGrammars;
  _grammarRepository;
  _grammar;
  _injections;
  _basicScopeAttributesProvider;
  _tokenTypeMatchers;
  get themeProvider() {
    return this._grammarRepository;
  }
  dispose() {
    for (const rule of this._ruleId2desc) {
      if (rule) {
        rule.dispose();
      }
    }
  }
  createOnigScanner(sources) {
    return this._onigLib.createOnigScanner(sources);
  }
  createOnigString(sources) {
    return this._onigLib.createOnigString(sources);
  }
  getMetadataForScope(scope) {
    return this._basicScopeAttributesProvider.getBasicScopeAttributes(scope);
  }
  _collectInjections() {
    const grammarRepository = {
      lookup: (scopeName2) => {
        if (scopeName2 === this._rootScopeName) {
          return this._grammar;
        }
        return this.getExternalGrammar(scopeName2);
      },
      injections: (scopeName2) => {
        return this._grammarRepository.injections(scopeName2);
      }
    };
    const result = [];
    const scopeName = this._rootScopeName;
    const grammar = grammarRepository.lookup(scopeName);
    if (grammar) {
      const rawInjections = grammar.injections;
      if (rawInjections) {
        for (let expression in rawInjections) {
          collectInjections(
            result,
            expression,
            rawInjections[expression],
            this,
            grammar
          );
        }
      }
      const injectionScopeNames = this._grammarRepository.injections(scopeName);
      if (injectionScopeNames) {
        injectionScopeNames.forEach((injectionScopeName) => {
          const injectionGrammar = this.getExternalGrammar(injectionScopeName);
          if (injectionGrammar) {
            const selector = injectionGrammar.injectionSelector;
            if (selector) {
              collectInjections(
                result,
                selector,
                injectionGrammar,
                this,
                injectionGrammar
              );
            }
          }
        });
      }
    }
    result.sort((i1, i2) => i1.priority - i2.priority);
    return result;
  }
  getInjections() {
    if (this._injections === null) {
      this._injections = this._collectInjections();
    }
    return this._injections;
  }
  registerRule(factory) {
    const id = ++this._lastRuleId;
    const result = factory(ruleIdFromNumber(id));
    this._ruleId2desc[id] = result;
    return result;
  }
  getRule(ruleId) {
    return this._ruleId2desc[ruleIdToNumber(ruleId)];
  }
  getExternalGrammar(scopeName, repository) {
    if (this._includedGrammars[scopeName]) {
      return this._includedGrammars[scopeName];
    } else if (this._grammarRepository) {
      const rawIncludedGrammar = this._grammarRepository.lookup(scopeName);
      if (rawIncludedGrammar) {
        this._includedGrammars[scopeName] = initGrammar(
          rawIncludedGrammar,
          repository && repository.$base
        );
        return this._includedGrammars[scopeName];
      }
    }
    return void 0;
  }
  tokenizeLine(lineText, prevState, timeLimit = 0) {
    const r2 = this._tokenize(lineText, prevState, false, timeLimit);
    return {
      tokens: r2.lineTokens.getResult(r2.ruleStack, r2.lineLength),
      ruleStack: r2.ruleStack,
      stoppedEarly: r2.stoppedEarly
    };
  }
  tokenizeLine2(lineText, prevState, timeLimit = 0) {
    const r2 = this._tokenize(lineText, prevState, true, timeLimit);
    return {
      tokens: r2.lineTokens.getBinaryResult(r2.ruleStack, r2.lineLength),
      ruleStack: r2.ruleStack,
      stoppedEarly: r2.stoppedEarly
    };
  }
  _tokenize(lineText, prevState, emitBinaryTokens, timeLimit) {
    if (this._rootId === -1) {
      this._rootId = RuleFactory.getCompiledRuleId(
        this._grammar.repository.$self,
        this,
        this._grammar.repository
      );
      this.getInjections();
    }
    let isFirstLine;
    if (!prevState || prevState === StateStackImpl.NULL) {
      isFirstLine = true;
      const rawDefaultMetadata = this._basicScopeAttributesProvider.getDefaultAttributes();
      const defaultStyle = this.themeProvider.getDefaults();
      const defaultMetadata = EncodedTokenMetadata.set(
        0,
        rawDefaultMetadata.languageId,
        rawDefaultMetadata.tokenType,
        null,
        defaultStyle.fontStyle,
        defaultStyle.foregroundId,
        defaultStyle.backgroundId
      );
      const rootScopeName = this.getRule(this._rootId).getName(
        null,
        null
      );
      let scopeList;
      if (rootScopeName) {
        scopeList = AttributedScopeStack.createRootAndLookUpScopeName(
          rootScopeName,
          defaultMetadata,
          this
        );
      } else {
        scopeList = AttributedScopeStack.createRoot(
          "unknown",
          defaultMetadata
        );
      }
      prevState = new StateStackImpl(
        null,
        this._rootId,
        -1,
        -1,
        false,
        null,
        scopeList,
        scopeList
      );
    } else {
      isFirstLine = false;
      prevState.reset();
    }
    lineText = lineText + "\n";
    const onigLineText = this.createOnigString(lineText);
    const lineLength = onigLineText.content.length;
    const lineTokens = new LineTokens(
      emitBinaryTokens,
      lineText,
      this._tokenTypeMatchers,
      this.balancedBracketSelectors
    );
    const r2 = _tokenizeString(
      this,
      onigLineText,
      isFirstLine,
      0,
      prevState,
      lineTokens,
      true,
      timeLimit
    );
    disposeOnigString(onigLineText);
    return {
      lineLength,
      lineTokens,
      ruleStack: r2.stack,
      stoppedEarly: r2.stoppedEarly
    };
  }
};
function initGrammar(grammar, base) {
  grammar = clone(grammar);
  grammar.repository = grammar.repository || {};
  grammar.repository.$self = {
    $vscodeTextmateLocation: grammar.$vscodeTextmateLocation,
    patterns: grammar.patterns,
    name: grammar.scopeName
  };
  grammar.repository.$base = base || grammar.repository.$self;
  return grammar;
}
var AttributedScopeStack = class _AttributedScopeStack {
  /**
   * Invariant:
   * ```
   * if (parent && !scopePath.extends(parent.scopePath)) {
   * 	throw new Error();
   * }
   * ```
   */
  constructor(parent, scopePath, tokenAttributes) {
    this.parent = parent;
    this.scopePath = scopePath;
    this.tokenAttributes = tokenAttributes;
  }
  static fromExtension(namesScopeList, contentNameScopesList) {
    let current = namesScopeList;
    let scopeNames = namesScopeList?.scopePath ?? null;
    for (const frame of contentNameScopesList) {
      scopeNames = ScopeStack.push(scopeNames, frame.scopeNames);
      current = new _AttributedScopeStack(current, scopeNames, frame.encodedTokenAttributes);
    }
    return current;
  }
  static createRoot(scopeName, tokenAttributes) {
    return new _AttributedScopeStack(null, new ScopeStack(null, scopeName), tokenAttributes);
  }
  static createRootAndLookUpScopeName(scopeName, tokenAttributes, grammar) {
    const rawRootMetadata = grammar.getMetadataForScope(scopeName);
    const scopePath = new ScopeStack(null, scopeName);
    const rootStyle = grammar.themeProvider.themeMatch(scopePath);
    const resolvedTokenAttributes = _AttributedScopeStack.mergeAttributes(
      tokenAttributes,
      rawRootMetadata,
      rootStyle
    );
    return new _AttributedScopeStack(null, scopePath, resolvedTokenAttributes);
  }
  get scopeName() {
    return this.scopePath.scopeName;
  }
  toString() {
    return this.getScopeNames().join(" ");
  }
  equals(other) {
    return _AttributedScopeStack.equals(this, other);
  }
  static equals(a, b2) {
    do {
      if (a === b2) {
        return true;
      }
      if (!a && !b2) {
        return true;
      }
      if (!a || !b2) {
        return false;
      }
      if (a.scopeName !== b2.scopeName || a.tokenAttributes !== b2.tokenAttributes) {
        return false;
      }
      a = a.parent;
      b2 = b2.parent;
    } while (true);
  }
  static mergeAttributes(existingTokenAttributes, basicScopeAttributes, styleAttributes) {
    let fontStyle = -1;
    let foreground = 0;
    let background = 0;
    if (styleAttributes !== null) {
      fontStyle = styleAttributes.fontStyle;
      foreground = styleAttributes.foregroundId;
      background = styleAttributes.backgroundId;
    }
    return EncodedTokenMetadata.set(
      existingTokenAttributes,
      basicScopeAttributes.languageId,
      basicScopeAttributes.tokenType,
      null,
      fontStyle,
      foreground,
      background
    );
  }
  pushAttributed(scopePath, grammar) {
    if (scopePath === null) {
      return this;
    }
    if (scopePath.indexOf(" ") === -1) {
      return _AttributedScopeStack._pushAttributed(this, scopePath, grammar);
    }
    const scopes = scopePath.split(/ /g);
    let result = this;
    for (const scope of scopes) {
      result = _AttributedScopeStack._pushAttributed(result, scope, grammar);
    }
    return result;
  }
  static _pushAttributed(target, scopeName, grammar) {
    const rawMetadata = grammar.getMetadataForScope(scopeName);
    const newPath = target.scopePath.push(scopeName);
    const scopeThemeMatchResult = grammar.themeProvider.themeMatch(newPath);
    const metadata = _AttributedScopeStack.mergeAttributes(
      target.tokenAttributes,
      rawMetadata,
      scopeThemeMatchResult
    );
    return new _AttributedScopeStack(target, newPath, metadata);
  }
  getScopeNames() {
    return this.scopePath.getSegments();
  }
  getExtensionIfDefined(base) {
    const result = [];
    let self2 = this;
    while (self2 && self2 !== base) {
      result.push({
        encodedTokenAttributes: self2.tokenAttributes,
        scopeNames: self2.scopePath.getExtensionIfDefined(self2.parent?.scopePath ?? null)
      });
      self2 = self2.parent;
    }
    return self2 === base ? result.reverse() : void 0;
  }
};
var StateStackImpl = class _StateStackImpl {
  /**
   * Invariant:
   * ```
   * if (contentNameScopesList !== nameScopesList && contentNameScopesList?.parent !== nameScopesList) {
   * 	throw new Error();
   * }
   * if (this.parent && !nameScopesList.extends(this.parent.contentNameScopesList)) {
   * 	throw new Error();
   * }
   * ```
   */
  constructor(parent, ruleId, enterPos, anchorPos, beginRuleCapturedEOL, endRule, nameScopesList, contentNameScopesList) {
    this.parent = parent;
    this.ruleId = ruleId;
    this.beginRuleCapturedEOL = beginRuleCapturedEOL;
    this.endRule = endRule;
    this.nameScopesList = nameScopesList;
    this.contentNameScopesList = contentNameScopesList;
    this.depth = this.parent ? this.parent.depth + 1 : 1;
    this._enterPos = enterPos;
    this._anchorPos = anchorPos;
  }
  _stackElementBrand = void 0;
  // TODO remove me
  static NULL = new _StateStackImpl(
    null,
    0,
    0,
    0,
    false,
    null,
    null,
    null
  );
  /**
   * The position on the current line where this state was pushed.
   * This is relevant only while tokenizing a line, to detect endless loops.
   * Its value is meaningless across lines.
   */
  _enterPos;
  /**
   * The captured anchor position when this stack element was pushed.
   * This is relevant only while tokenizing a line, to restore the anchor position when popping.
   * Its value is meaningless across lines.
   */
  _anchorPos;
  /**
   * The depth of the stack.
   */
  depth;
  equals(other) {
    if (other === null) {
      return false;
    }
    return _StateStackImpl._equals(this, other);
  }
  static _equals(a, b2) {
    if (a === b2) {
      return true;
    }
    if (!this._structuralEquals(a, b2)) {
      return false;
    }
    return AttributedScopeStack.equals(a.contentNameScopesList, b2.contentNameScopesList);
  }
  /**
   * A structural equals check. Does not take into account `scopes`.
   */
  static _structuralEquals(a, b2) {
    do {
      if (a === b2) {
        return true;
      }
      if (!a && !b2) {
        return true;
      }
      if (!a || !b2) {
        return false;
      }
      if (a.depth !== b2.depth || a.ruleId !== b2.ruleId || a.endRule !== b2.endRule) {
        return false;
      }
      a = a.parent;
      b2 = b2.parent;
    } while (true);
  }
  clone() {
    return this;
  }
  static _reset(el) {
    while (el) {
      el._enterPos = -1;
      el._anchorPos = -1;
      el = el.parent;
    }
  }
  reset() {
    _StateStackImpl._reset(this);
  }
  pop() {
    return this.parent;
  }
  safePop() {
    if (this.parent) {
      return this.parent;
    }
    return this;
  }
  push(ruleId, enterPos, anchorPos, beginRuleCapturedEOL, endRule, nameScopesList, contentNameScopesList) {
    return new _StateStackImpl(
      this,
      ruleId,
      enterPos,
      anchorPos,
      beginRuleCapturedEOL,
      endRule,
      nameScopesList,
      contentNameScopesList
    );
  }
  getEnterPos() {
    return this._enterPos;
  }
  getAnchorPos() {
    return this._anchorPos;
  }
  getRule(grammar) {
    return grammar.getRule(this.ruleId);
  }
  toString() {
    const r2 = [];
    this._writeString(r2, 0);
    return "[" + r2.join(",") + "]";
  }
  _writeString(res, outIndex) {
    if (this.parent) {
      outIndex = this.parent._writeString(res, outIndex);
    }
    res[outIndex++] = `(${this.ruleId}, ${this.nameScopesList?.toString()}, ${this.contentNameScopesList?.toString()})`;
    return outIndex;
  }
  withContentNameScopesList(contentNameScopeStack) {
    if (this.contentNameScopesList === contentNameScopeStack) {
      return this;
    }
    return this.parent.push(
      this.ruleId,
      this._enterPos,
      this._anchorPos,
      this.beginRuleCapturedEOL,
      this.endRule,
      this.nameScopesList,
      contentNameScopeStack
    );
  }
  withEndRule(endRule) {
    if (this.endRule === endRule) {
      return this;
    }
    return new _StateStackImpl(
      this.parent,
      this.ruleId,
      this._enterPos,
      this._anchorPos,
      this.beginRuleCapturedEOL,
      endRule,
      this.nameScopesList,
      this.contentNameScopesList
    );
  }
  // Used to warn of endless loops
  hasSameRuleAs(other) {
    let el = this;
    while (el && el._enterPos === other._enterPos) {
      if (el.ruleId === other.ruleId) {
        return true;
      }
      el = el.parent;
    }
    return false;
  }
  toStateStackFrame() {
    return {
      ruleId: ruleIdToNumber(this.ruleId),
      beginRuleCapturedEOL: this.beginRuleCapturedEOL,
      endRule: this.endRule,
      nameScopesList: this.nameScopesList?.getExtensionIfDefined(this.parent?.nameScopesList ?? null) ?? [],
      contentNameScopesList: this.contentNameScopesList?.getExtensionIfDefined(this.nameScopesList) ?? []
    };
  }
  static pushFrame(self2, frame) {
    const namesScopeList = AttributedScopeStack.fromExtension(self2?.nameScopesList ?? null, frame.nameScopesList);
    return new _StateStackImpl(
      self2,
      ruleIdFromNumber(frame.ruleId),
      frame.enterPos ?? -1,
      frame.anchorPos ?? -1,
      frame.beginRuleCapturedEOL,
      frame.endRule,
      namesScopeList,
      AttributedScopeStack.fromExtension(namesScopeList, frame.contentNameScopesList)
    );
  }
};
var BalancedBracketSelectors = class {
  balancedBracketScopes;
  unbalancedBracketScopes;
  allowAny = false;
  constructor(balancedBracketScopes, unbalancedBracketScopes) {
    this.balancedBracketScopes = balancedBracketScopes.flatMap(
      (selector) => {
        if (selector === "*") {
          this.allowAny = true;
          return [];
        }
        return createMatchers(selector, nameMatcher).map((m2) => m2.matcher);
      }
    );
    this.unbalancedBracketScopes = unbalancedBracketScopes.flatMap(
      (selector) => createMatchers(selector, nameMatcher).map((m2) => m2.matcher)
    );
  }
  get matchesAlways() {
    return this.allowAny && this.unbalancedBracketScopes.length === 0;
  }
  get matchesNever() {
    return this.balancedBracketScopes.length === 0 && !this.allowAny;
  }
  match(scopes) {
    for (const excluder of this.unbalancedBracketScopes) {
      if (excluder(scopes)) {
        return false;
      }
    }
    for (const includer of this.balancedBracketScopes) {
      if (includer(scopes)) {
        return true;
      }
    }
    return this.allowAny;
  }
};
var LineTokens = class {
  constructor(emitBinaryTokens, lineText, tokenTypeOverrides, balancedBracketSelectors) {
    this.balancedBracketSelectors = balancedBracketSelectors;
    this._emitBinaryTokens = emitBinaryTokens;
    this._tokenTypeOverrides = tokenTypeOverrides;
    {
      this._lineText = null;
    }
    this._tokens = [];
    this._binaryTokens = [];
    this._lastTokenEndIndex = 0;
  }
  _emitBinaryTokens;
  /**
   * defined only if `false`.
   */
  _lineText;
  /**
   * used only if `_emitBinaryTokens` is false.
   */
  _tokens;
  /**
   * used only if `_emitBinaryTokens` is true.
   */
  _binaryTokens;
  _lastTokenEndIndex;
  _tokenTypeOverrides;
  produce(stack, endIndex) {
    this.produceFromScopes(stack.contentNameScopesList, endIndex);
  }
  produceFromScopes(scopesList, endIndex) {
    if (this._lastTokenEndIndex >= endIndex) {
      return;
    }
    if (this._emitBinaryTokens) {
      let metadata = scopesList?.tokenAttributes ?? 0;
      let containsBalancedBrackets = false;
      if (this.balancedBracketSelectors?.matchesAlways) {
        containsBalancedBrackets = true;
      }
      if (this._tokenTypeOverrides.length > 0 || this.balancedBracketSelectors && !this.balancedBracketSelectors.matchesAlways && !this.balancedBracketSelectors.matchesNever) {
        const scopes2 = scopesList?.getScopeNames() ?? [];
        for (const tokenType of this._tokenTypeOverrides) {
          if (tokenType.matcher(scopes2)) {
            metadata = EncodedTokenMetadata.set(
              metadata,
              0,
              toOptionalTokenType(tokenType.type),
              null,
              -1,
              0,
              0
            );
          }
        }
        if (this.balancedBracketSelectors) {
          containsBalancedBrackets = this.balancedBracketSelectors.match(scopes2);
        }
      }
      if (containsBalancedBrackets) {
        metadata = EncodedTokenMetadata.set(
          metadata,
          0,
          8,
          containsBalancedBrackets,
          -1,
          0,
          0
        );
      }
      if (this._binaryTokens.length > 0 && this._binaryTokens[this._binaryTokens.length - 1] === metadata) {
        this._lastTokenEndIndex = endIndex;
        return;
      }
      this._binaryTokens.push(this._lastTokenEndIndex);
      this._binaryTokens.push(metadata);
      this._lastTokenEndIndex = endIndex;
      return;
    }
    const scopes = scopesList?.getScopeNames() ?? [];
    this._tokens.push({
      startIndex: this._lastTokenEndIndex,
      endIndex,
      // value: lineText.substring(lastTokenEndIndex, endIndex),
      scopes
    });
    this._lastTokenEndIndex = endIndex;
  }
  getResult(stack, lineLength) {
    if (this._tokens.length > 0 && this._tokens[this._tokens.length - 1].startIndex === lineLength - 1) {
      this._tokens.pop();
    }
    if (this._tokens.length === 0) {
      this._lastTokenEndIndex = -1;
      this.produce(stack, lineLength);
      this._tokens[this._tokens.length - 1].startIndex = 0;
    }
    return this._tokens;
  }
  getBinaryResult(stack, lineLength) {
    if (this._binaryTokens.length > 0 && this._binaryTokens[this._binaryTokens.length - 2] === lineLength - 1) {
      this._binaryTokens.pop();
      this._binaryTokens.pop();
    }
    if (this._binaryTokens.length === 0) {
      this._lastTokenEndIndex = -1;
      this.produce(stack, lineLength);
      this._binaryTokens[this._binaryTokens.length - 2] = 0;
    }
    const result = new Uint32Array(this._binaryTokens.length);
    for (let i2 = 0, len = this._binaryTokens.length; i2 < len; i2++) {
      result[i2] = this._binaryTokens[i2];
    }
    return result;
  }
};
var SyncRegistry = class {
  constructor(theme, _onigLib) {
    this._onigLib = _onigLib;
    this._theme = theme;
  }
  _grammars = /* @__PURE__ */ new Map();
  _rawGrammars = /* @__PURE__ */ new Map();
  _injectionGrammars = /* @__PURE__ */ new Map();
  _theme;
  dispose() {
    for (const grammar of this._grammars.values()) {
      grammar.dispose();
    }
  }
  setTheme(theme) {
    this._theme = theme;
  }
  getColorMap() {
    return this._theme.getColorMap();
  }
  /**
   * Add `grammar` to registry and return a list of referenced scope names
   */
  addGrammar(grammar, injectionScopeNames) {
    this._rawGrammars.set(grammar.scopeName, grammar);
    if (injectionScopeNames) {
      this._injectionGrammars.set(grammar.scopeName, injectionScopeNames);
    }
  }
  /**
   * Lookup a raw grammar.
   */
  lookup(scopeName) {
    return this._rawGrammars.get(scopeName);
  }
  /**
   * Returns the injections for the given grammar
   */
  injections(targetScope) {
    return this._injectionGrammars.get(targetScope);
  }
  /**
   * Get the default theme settings
   */
  getDefaults() {
    return this._theme.getDefaults();
  }
  /**
   * Match a scope in the theme.
   */
  themeMatch(scopePath) {
    return this._theme.match(scopePath);
  }
  /**
   * Lookup a grammar.
   */
  grammarForScopeName(scopeName, initialLanguage, embeddedLanguages, tokenTypes, balancedBracketSelectors) {
    if (!this._grammars.has(scopeName)) {
      let rawGrammar = this._rawGrammars.get(scopeName);
      if (!rawGrammar) {
        return null;
      }
      this._grammars.set(scopeName, createGrammar(
        scopeName,
        rawGrammar,
        initialLanguage,
        embeddedLanguages,
        tokenTypes,
        balancedBracketSelectors,
        this,
        this._onigLib
      ));
    }
    return this._grammars.get(scopeName);
  }
};
var Registry$1 = class Registry {
  _options;
  _syncRegistry;
  _ensureGrammarCache;
  constructor(options) {
    this._options = options;
    this._syncRegistry = new SyncRegistry(
      Theme.createFromRawTheme(options.theme, options.colorMap),
      options.onigLib
    );
    this._ensureGrammarCache = /* @__PURE__ */ new Map();
  }
  dispose() {
    this._syncRegistry.dispose();
  }
  /**
   * Change the theme. Once called, no previous `ruleStack` should be used anymore.
   */
  setTheme(theme, colorMap) {
    this._syncRegistry.setTheme(Theme.createFromRawTheme(theme, colorMap));
  }
  /**
   * Returns a lookup array for color ids.
   */
  getColorMap() {
    return this._syncRegistry.getColorMap();
  }
  /**
   * Load the grammar for `scopeName` and all referenced included grammars asynchronously.
   * Please do not use language id 0.
   */
  loadGrammarWithEmbeddedLanguages(initialScopeName, initialLanguage, embeddedLanguages) {
    return this.loadGrammarWithConfiguration(initialScopeName, initialLanguage, { embeddedLanguages });
  }
  /**
   * Load the grammar for `scopeName` and all referenced included grammars asynchronously.
   * Please do not use language id 0.
   */
  loadGrammarWithConfiguration(initialScopeName, initialLanguage, configuration) {
    return this._loadGrammar(
      initialScopeName,
      initialLanguage,
      configuration.embeddedLanguages,
      configuration.tokenTypes,
      new BalancedBracketSelectors(
        configuration.balancedBracketSelectors || [],
        configuration.unbalancedBracketSelectors || []
      )
    );
  }
  /**
   * Load the grammar for `scopeName` and all referenced included grammars asynchronously.
   */
  loadGrammar(initialScopeName) {
    return this._loadGrammar(initialScopeName, 0, null, null, null);
  }
  _loadGrammar(initialScopeName, initialLanguage, embeddedLanguages, tokenTypes, balancedBracketSelectors) {
    const dependencyProcessor = new ScopeDependencyProcessor(this._syncRegistry, initialScopeName);
    while (dependencyProcessor.Q.length > 0) {
      dependencyProcessor.Q.map((request) => this._loadSingleGrammar(request.scopeName));
      dependencyProcessor.processQueue();
    }
    return this._grammarForScopeName(
      initialScopeName,
      initialLanguage,
      embeddedLanguages,
      tokenTypes,
      balancedBracketSelectors
    );
  }
  _loadSingleGrammar(scopeName) {
    if (!this._ensureGrammarCache.has(scopeName)) {
      this._doLoadSingleGrammar(scopeName);
      this._ensureGrammarCache.set(scopeName, true);
    }
  }
  _doLoadSingleGrammar(scopeName) {
    const grammar = this._options.loadGrammar(scopeName);
    if (grammar) {
      const injections = typeof this._options.getInjections === "function" ? this._options.getInjections(scopeName) : void 0;
      this._syncRegistry.addGrammar(grammar, injections);
    }
  }
  /**
   * Adds a rawGrammar.
   */
  addGrammar(rawGrammar, injections = [], initialLanguage = 0, embeddedLanguages = null) {
    this._syncRegistry.addGrammar(rawGrammar, injections);
    return this._grammarForScopeName(rawGrammar.scopeName, initialLanguage, embeddedLanguages);
  }
  /**
   * Get the grammar for `scopeName`. The grammar must first be created via `loadGrammar` or `addGrammar`.
   */
  _grammarForScopeName(scopeName, initialLanguage = 0, embeddedLanguages = null, tokenTypes = null, balancedBracketSelectors = null) {
    return this._syncRegistry.grammarForScopeName(
      scopeName,
      initialLanguage,
      embeddedLanguages,
      tokenTypes,
      balancedBracketSelectors
    );
  }
};
var INITIAL = StateStackImpl.NULL;
function useStableCallback(callback) {
  const callbackRef = reactExports.useRef(callback);
  reactExports.useInsertionEffect(() => void (callbackRef.current = callback));
  return reactExports.useCallback((...args) => {
    return callbackRef.current(...args);
  }, []);
}
const EditContext = reactExports.createContext(void 0);
function EditProvider({ children, createEditor }) {
  const stableCreateEditor = useStableCallback(createEditor);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(EditContext.Provider, {
    value: stableCreateEditor,
    children
  });
}
function useCreateEditor() {
  return reactExports.useContext(EditContext);
}
const GutterUtilitySlotStyles = {
  position: "absolute",
  top: 0,
  bottom: 0,
  textAlign: "center",
  whiteSpace: "normal",
  touchAction: "none"
};
const MergeConflictSlotStyles = { display: "contents" };
function noopRender() {
  return null;
}
function getMergeConflictActionSlotName({ hunkIndex, lineIndex, conflictIndex }) {
  return `merge-conflict-action-${hunkIndex}-${lineIndex}-${conflictIndex}`;
}
function getHunkSideStartBoundary(start, count) {
  return start - (count === 0 ? 0 : 1);
}
function getHunkSideEndBoundary(start, count) {
  return getHunkSideStartBoundary(start, count) + count;
}
function getMergeConflictActionAnchor(action, fileDiff) {
  const hunk = fileDiff.hunks[action.hunkIndex];
  if (hunk == null) return;
  return {
    hunkIndex: action.hunkIndex,
    lineIndex: getUnifiedLineStartForContent(hunk, action.startContentIndex)
  };
}
function getUnifiedLineStartForContent(hunk, contentIndex) {
  let lineIndex = hunk.unifiedLineStart;
  for (let index = 0; index < contentIndex; index++) {
    const content = hunk.hunkContent[index];
    lineIndex += content.type === "context" ? content.lines : content.deletions + content.additions;
  }
  return lineIndex;
}
function renderDiffChildren({ fileDiff, actions, renderCustomHeader, renderHeaderPrefix, renderHeaderFilenameSuffix, renderHeaderMetadata, renderAnnotation, renderGutterUtility, renderMergeConflictUtility, lineAnnotations, getHoveredLine, getInstance }) {
  const customHeader = renderCustomHeader?.(fileDiff);
  const prefix = renderHeaderPrefix?.(fileDiff);
  const suffix = renderHeaderFilenameSuffix?.(fileDiff);
  const metadata = renderHeaderMetadata?.(fileDiff);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    customHeader != null ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", {
      slot: CUSTOM_HEADER_SLOT_ID,
      children: customHeader
    }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      prefix != null && /* @__PURE__ */ jsxRuntimeExports.jsx("div", {
        slot: "header-prefix",
        children: prefix
      }),
      suffix != null && /* @__PURE__ */ jsxRuntimeExports.jsx("div", {
        slot: "header-filename-suffix",
        children: suffix
      }),
      metadata != null && /* @__PURE__ */ jsxRuntimeExports.jsx("div", {
        slot: "header-metadata",
        children: metadata
      })
    ] }),
    renderAnnotation != null && lineAnnotations?.map((annotation, index) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", {
      slot: getLineAnnotationName(annotation),
      children: renderAnnotation(annotation)
    }, index)),
    actions != null && renderMergeConflictUtility != null && getInstance != null && actions.map((action) => {
      if (action == null) return;
      const slot = getSlotName(action, fileDiff);
      return /* @__PURE__ */ jsxRuntimeExports.jsx("div", {
        slot,
        style: MergeConflictSlotStyles,
        children: renderMergeConflictUtility(action, getInstance)
      }, slot);
    }),
    renderGutterUtility != null && /* @__PURE__ */ jsxRuntimeExports.jsx("div", {
      slot: "gutter-utility-slot",
      style: GutterUtilitySlotStyles,
      children: renderGutterUtility(getHoveredLine)
    })
  ] });
}
function getSlotName(action, fileDiff) {
  const anchor = getMergeConflictActionAnchor(action, fileDiff);
  return anchor != null ? getMergeConflictActionSlotName({
    hunkIndex: anchor.hunkIndex,
    lineIndex: anchor.lineIndex,
    conflictIndex: action.conflictIndex
  }) : void 0;
}
function areThemesEqual(themeA, themeB) {
  if (themeA == null || themeB == null || typeof themeA === "string" || typeof themeB === "string") return themeA === themeB;
  return themeA.dark === themeB.dark && themeA.light === themeB.light;
}
function areFilesEqual(fileA, fileB) {
  return fileA?.cacheKey === fileB?.cacheKey && fileA?.contents === fileB?.contents && fileA?.name === fileB?.name && fileA?.lang === fileB?.lang;
}
const AttachedThemes = /* @__PURE__ */ new Set();
function createThemeCollection(options) {
  const descriptors = [];
  const seen = /* @__PURE__ */ new Set();
  for (const entry of getCollectionEntries(options.themes)) {
    const themes = isThemeCollectionSource(entry) ? entry.getThemes() : [entry];
    for (const descriptor of themes) {
      if (seen.has(descriptor.name)) throw new Error(`Theme collection already contains theme "${descriptor.name}"`);
      seen.add(descriptor.name);
      descriptors.push(descriptor);
    }
  }
  const allThemes = Object.freeze([...descriptors]);
  const lightThemes = Object.freeze(allThemes.filter((descriptor) => descriptor.colorScheme === "light"));
  const darkThemes = Object.freeze(allThemes.filter((descriptor) => descriptor.colorScheme === "dark"));
  const themesByName = new Map(allThemes.map((descriptor) => [descriptor.name, descriptor]));
  const allNames = Object.freeze(allThemes.map((descriptor) => descriptor.name));
  const lightNames = Object.freeze(lightThemes.map((descriptor) => descriptor.name));
  const darkNames = Object.freeze(darkThemes.map((descriptor) => descriptor.name));
  function filteredThemes(filterOptions) {
    if (filterOptions == null) return allThemes;
    const { colorScheme, collection } = filterOptions;
    if (collection == null) {
      if (colorScheme === "light") return lightThemes;
      if (colorScheme === "dark") return darkThemes;
      return allThemes;
    }
    return allThemes.filter((descriptor) => {
      if (descriptor.collection !== collection) return false;
      return colorScheme == null || descriptor.colorScheme === colorScheme;
    });
  }
  return {
    getTheme(name) {
      return themesByName.get(name);
    },
    getThemes(themeOptions) {
      return filteredThemes(themeOptions);
    },
    getThemeNames(namesOptions) {
      if (namesOptions?.collection == null) {
        if (namesOptions?.colorScheme === "light") return lightNames;
        if (namesOptions?.colorScheme === "dark") return darkNames;
        return allNames;
      }
      return filteredThemes(namesOptions).map((descriptor) => descriptor.name);
    },
    hasTheme(name) {
      return themesByName.has(name);
    },
    orderBy(compare) {
      return createThemeCollection({ themes: allThemes.map((descriptor, index) => ({
        descriptor,
        index
      })).sort((a, b2) => {
        const result = compare(a.descriptor, b2.descriptor);
        if (result !== 0) return result;
        return a.index - b2.index;
      }).map((entry) => entry.descriptor) });
    },
    pick(names) {
      const picked = [];
      const pickedNames = /* @__PURE__ */ new Set();
      for (const name of names) {
        if (pickedNames.has(name)) throw new Error(`Theme collection pick already includes theme "${name}"`);
        pickedNames.add(name);
        const descriptor = themesByName.get(name);
        if (descriptor == null) throw new Error(`Theme collection does not contain theme "${name}"`);
        picked.push(descriptor);
      }
      return createThemeCollection({ themes: picked });
    },
    registerInto(resolver) {
      for (const descriptor of allThemes) resolver.registerThemeIfAbsent(descriptor.name, descriptor.load);
    }
  };
}
function getCollectionEntries(input) {
  if (isThemeCollectionEntry(input)) return [input];
  return input;
}
function isThemeCollectionEntry(input) {
  return isThemeCollectionSource(input) || isThemeDescriptor(input);
}
function isThemeDescriptor(input) {
  return typeof input.name === "string" && typeof input.load === "function";
}
function isThemeCollectionSource(entry) {
  return typeof entry.getThemes === "function";
}
function unwrapDefault(value) {
  return value !== null && typeof value === "object" && "default" in value ? value.default : value;
}
var DuplicateThemeError = class extends Error {
  constructor(name) {
    super(`Theme "${name}" is already registered`);
    this.name = "DuplicateThemeError";
  }
};
var UnregisteredThemeError = class extends Error {
  constructor(name) {
    super(`No loader registered for theme "${name}"`);
    this.name = "UnregisteredThemeError";
  }
};
var UnresolvedThemeError = class extends Error {
  constructor(name) {
    super(`Theme "${name}" has not been resolved`);
    this.name = "UnresolvedThemeError";
  }
};
function createThemeResolver() {
  const loaders = /* @__PURE__ */ new Map();
  const resolved = /* @__PURE__ */ new Map();
  const inflight = /* @__PURE__ */ new Map();
  let cacheGeneration = 0;
  function registerTheme(name, loader) {
    if (loaders.has(name)) throw new DuplicateThemeError(name);
    loaders.set(name, loader);
  }
  function registerThemeIfAbsent(name, loader) {
    if (loaders.has(name)) return false;
    loaders.set(name, loader);
    return true;
  }
  function hasRegisteredTheme(name) {
    return loaders.has(name);
  }
  function resolveTheme2(name) {
    const cached = resolved.get(name);
    if (cached !== void 0) return Promise.resolve(cached);
    const existing = inflight.get(name);
    if (existing !== void 0) return existing;
    const loader = loaders.get(name);
    if (loader === void 0) return Promise.reject(new UnregisteredThemeError(name));
    const generation = cacheGeneration;
    const promise = loader().then((result) => {
      const theme = unwrapDefault(result);
      if (generation === cacheGeneration) resolved.set(name, theme);
      if (inflight.get(name) === promise) inflight.delete(name);
      return theme;
    }).catch((err) => {
      if (inflight.get(name) === promise) inflight.delete(name);
      throw err;
    });
    inflight.set(name, promise);
    return promise;
  }
  function resolveThemes2(names) {
    return Promise.all(names.map((name) => resolveTheme2(name)));
  }
  function seedResolvedTheme(name, theme) {
    resolved.set(name, theme);
  }
  function seedResolvedThemes(entries) {
    for (const [name, theme] of entries) seedResolvedTheme(name, theme);
  }
  function getResolvedTheme(name) {
    return resolved.get(name);
  }
  function getResolvedThemes(names) {
    const themes = [];
    for (const name of names) {
      const theme = resolved.get(name);
      if (theme === void 0) throw new UnresolvedThemeError(name);
      themes.push(theme);
    }
    return themes;
  }
  function hasResolvedTheme(name) {
    return resolved.has(name);
  }
  function hasResolvedThemes(names) {
    for (const name of names) if (!resolved.has(name)) return false;
    return true;
  }
  function getResolvedOrResolveTheme2(name) {
    const cached = resolved.get(name);
    if (cached !== void 0) return cached;
    return resolveTheme2(name);
  }
  function clearResolvedThemes() {
    cacheGeneration++;
    resolved.clear();
    inflight.clear();
  }
  return {
    clearResolvedThemes,
    getResolvedOrResolveTheme: getResolvedOrResolveTheme2,
    getResolvedTheme,
    getResolvedThemes,
    hasRegisteredTheme,
    hasResolvedTheme,
    hasResolvedThemes,
    registerTheme,
    registerThemeIfAbsent,
    resolveTheme: resolveTheme2,
    resolveThemes: resolveThemes2,
    seedResolvedTheme,
    seedResolvedThemes
  };
}
const themeResolver = createThemeResolver();
function attachResolvedThemes(themes, highlighter2) {
  themes = Array.isArray(themes) ? themes : [themes];
  for (let themeRef of themes) {
    let resolvedTheme;
    if (typeof themeRef === "string") {
      resolvedTheme = themeResolver.getResolvedTheme(themeRef);
      if (resolvedTheme == null) throw new Error(`loadResolvedThemes: ${themeRef} is not resolved, you must resolve it before calling loadResolvedThemes`);
    } else {
      resolvedTheme = themeRef;
      themeRef = themeRef.name;
      if (themeResolver.getResolvedTheme(themeRef) == null) themeResolver.seedResolvedTheme(themeRef, resolvedTheme);
    }
    if (AttachedThemes.has(themeRef)) continue;
    AttachedThemes.add(themeRef);
    highlighter2.loadThemeSync(resolvedTheme);
  }
}
const ResolvedLanguages = /* @__PURE__ */ new Map();
const ResolvingLanguages = /* @__PURE__ */ new Map();
const RegisteredCustomLanguages = /* @__PURE__ */ new Map();
const AttachedLanguages = /* @__PURE__ */ new Set();
function attachResolvedLanguages(resolvedLanguages, highlighter2) {
  resolvedLanguages = Array.isArray(resolvedLanguages) ? resolvedLanguages : [resolvedLanguages];
  for (const resolvedLang of resolvedLanguages) {
    if (AttachedLanguages.has(resolvedLang.name)) continue;
    let lang = ResolvedLanguages.get(resolvedLang.name);
    if (lang == null) {
      lang = resolvedLang;
      ResolvedLanguages.set(resolvedLang.name, lang);
    }
    AttachedLanguages.add(lang.name);
    highlighter2.loadLanguageSync(lang.data);
  }
}
function isWorkerContext() {
  return typeof WorkerGlobalScope !== "undefined" && typeof self !== "undefined" && self instanceof WorkerGlobalScope;
}
let ShikiError$2 = class ShikiError extends Error {
  constructor(message) {
    super(message);
    this.name = "ShikiError";
  }
};
const htmlVoidElements = [
  "area",
  "base",
  "basefont",
  "bgsound",
  "br",
  "col",
  "command",
  "embed",
  "frame",
  "hr",
  "image",
  "img",
  "input",
  "keygen",
  "link",
  "meta",
  "param",
  "source",
  "track",
  "wbr"
];
const defaultSubsetRegex = /["&'<>`]/g;
const surrogatePairsRegex = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
const controlCharactersRegex = (
  // eslint-disable-next-line no-control-regex, unicorn/no-hex-escape
  /[\x01-\t\v\f\x0E-\x1F\x7F\x81\x8D\x8F\x90\x9D\xA0-\uFFFF]/g
);
const regexEscapeRegex = /[|\\{}()[\]^$+*?.]/g;
const subsetToRegexCache = /* @__PURE__ */ new WeakMap();
function core(value, options) {
  value = value.replace(
    options.subset ? charactersToExpressionCached(options.subset) : defaultSubsetRegex,
    basic
  );
  if (options.subset || options.escapeOnly) {
    return value;
  }
  return value.replace(surrogatePairsRegex, surrogate).replace(controlCharactersRegex, basic);
  function surrogate(pair, index, all2) {
    return options.format(
      (pair.charCodeAt(0) - 55296) * 1024 + pair.charCodeAt(1) - 56320 + 65536,
      all2.charCodeAt(index + 2),
      options
    );
  }
  function basic(character, index, all2) {
    return options.format(
      character.charCodeAt(0),
      all2.charCodeAt(index + 1),
      options
    );
  }
}
function charactersToExpressionCached(subset) {
  let cached = subsetToRegexCache.get(subset);
  if (!cached) {
    cached = charactersToExpression(subset);
    subsetToRegexCache.set(subset, cached);
  }
  return cached;
}
function charactersToExpression(subset) {
  const groups = [];
  let index = -1;
  while (++index < subset.length) {
    groups.push(subset[index].replace(regexEscapeRegex, "\\$&"));
  }
  return new RegExp("(?:" + groups.join("|") + ")", "g");
}
const hexadecimalRegex = /[\dA-Fa-f]/;
function toHexadecimal(code, next, omit) {
  const value = "&#x" + code.toString(16).toUpperCase();
  return omit && next && !hexadecimalRegex.test(String.fromCharCode(next)) ? value : value + ";";
}
const decimalRegex = /\d/;
function toDecimal(code, next, omit) {
  const value = "&#" + String(code);
  return omit && next && !decimalRegex.test(String.fromCharCode(next)) ? value : value + ";";
}
const characterEntitiesLegacy = [
  "AElig",
  "AMP",
  "Aacute",
  "Acirc",
  "Agrave",
  "Aring",
  "Atilde",
  "Auml",
  "COPY",
  "Ccedil",
  "ETH",
  "Eacute",
  "Ecirc",
  "Egrave",
  "Euml",
  "GT",
  "Iacute",
  "Icirc",
  "Igrave",
  "Iuml",
  "LT",
  "Ntilde",
  "Oacute",
  "Ocirc",
  "Ograve",
  "Oslash",
  "Otilde",
  "Ouml",
  "QUOT",
  "REG",
  "THORN",
  "Uacute",
  "Ucirc",
  "Ugrave",
  "Uuml",
  "Yacute",
  "aacute",
  "acirc",
  "acute",
  "aelig",
  "agrave",
  "amp",
  "aring",
  "atilde",
  "auml",
  "brvbar",
  "ccedil",
  "cedil",
  "cent",
  "copy",
  "curren",
  "deg",
  "divide",
  "eacute",
  "ecirc",
  "egrave",
  "eth",
  "euml",
  "frac12",
  "frac14",
  "frac34",
  "gt",
  "iacute",
  "icirc",
  "iexcl",
  "igrave",
  "iquest",
  "iuml",
  "laquo",
  "lt",
  "macr",
  "micro",
  "middot",
  "nbsp",
  "not",
  "ntilde",
  "oacute",
  "ocirc",
  "ograve",
  "ordf",
  "ordm",
  "oslash",
  "otilde",
  "ouml",
  "para",
  "plusmn",
  "pound",
  "quot",
  "raquo",
  "reg",
  "sect",
  "shy",
  "sup1",
  "sup2",
  "sup3",
  "szlig",
  "thorn",
  "times",
  "uacute",
  "ucirc",
  "ugrave",
  "uml",
  "uuml",
  "yacute",
  "yen",
  "yuml"
];
const characterEntitiesHtml4 = {
  nbsp: " ",
  iexcl: "¡",
  cent: "¢",
  pound: "£",
  curren: "¤",
  yen: "¥",
  brvbar: "¦",
  sect: "§",
  uml: "¨",
  copy: "©",
  ordf: "ª",
  laquo: "«",
  not: "¬",
  shy: "­",
  reg: "®",
  macr: "¯",
  deg: "°",
  plusmn: "±",
  sup2: "²",
  sup3: "³",
  acute: "´",
  micro: "µ",
  para: "¶",
  middot: "·",
  cedil: "¸",
  sup1: "¹",
  ordm: "º",
  raquo: "»",
  frac14: "¼",
  frac12: "½",
  frac34: "¾",
  iquest: "¿",
  Agrave: "À",
  Aacute: "Á",
  Acirc: "Â",
  Atilde: "Ã",
  Auml: "Ä",
  Aring: "Å",
  AElig: "Æ",
  Ccedil: "Ç",
  Egrave: "È",
  Eacute: "É",
  Ecirc: "Ê",
  Euml: "Ë",
  Igrave: "Ì",
  Iacute: "Í",
  Icirc: "Î",
  Iuml: "Ï",
  ETH: "Ð",
  Ntilde: "Ñ",
  Ograve: "Ò",
  Oacute: "Ó",
  Ocirc: "Ô",
  Otilde: "Õ",
  Ouml: "Ö",
  times: "×",
  Oslash: "Ø",
  Ugrave: "Ù",
  Uacute: "Ú",
  Ucirc: "Û",
  Uuml: "Ü",
  Yacute: "Ý",
  THORN: "Þ",
  szlig: "ß",
  agrave: "à",
  aacute: "á",
  acirc: "â",
  atilde: "ã",
  auml: "ä",
  aring: "å",
  aelig: "æ",
  ccedil: "ç",
  egrave: "è",
  eacute: "é",
  ecirc: "ê",
  euml: "ë",
  igrave: "ì",
  iacute: "í",
  icirc: "î",
  iuml: "ï",
  eth: "ð",
  ntilde: "ñ",
  ograve: "ò",
  oacute: "ó",
  ocirc: "ô",
  otilde: "õ",
  ouml: "ö",
  divide: "÷",
  oslash: "ø",
  ugrave: "ù",
  uacute: "ú",
  ucirc: "û",
  uuml: "ü",
  yacute: "ý",
  thorn: "þ",
  yuml: "ÿ",
  fnof: "ƒ",
  Alpha: "Α",
  Beta: "Β",
  Gamma: "Γ",
  Delta: "Δ",
  Epsilon: "Ε",
  Zeta: "Ζ",
  Eta: "Η",
  Theta: "Θ",
  Iota: "Ι",
  Kappa: "Κ",
  Lambda: "Λ",
  Mu: "Μ",
  Nu: "Ν",
  Xi: "Ξ",
  Omicron: "Ο",
  Pi: "Π",
  Rho: "Ρ",
  Sigma: "Σ",
  Tau: "Τ",
  Upsilon: "Υ",
  Phi: "Φ",
  Chi: "Χ",
  Psi: "Ψ",
  Omega: "Ω",
  alpha: "α",
  beta: "β",
  gamma: "γ",
  delta: "δ",
  epsilon: "ε",
  zeta: "ζ",
  eta: "η",
  theta: "θ",
  iota: "ι",
  kappa: "κ",
  lambda: "λ",
  mu: "μ",
  nu: "ν",
  xi: "ξ",
  omicron: "ο",
  pi: "π",
  rho: "ρ",
  sigmaf: "ς",
  sigma: "σ",
  tau: "τ",
  upsilon: "υ",
  phi: "φ",
  chi: "χ",
  psi: "ψ",
  omega: "ω",
  thetasym: "ϑ",
  upsih: "ϒ",
  piv: "ϖ",
  bull: "•",
  hellip: "…",
  prime: "′",
  Prime: "″",
  oline: "‾",
  frasl: "⁄",
  weierp: "℘",
  image: "ℑ",
  real: "ℜ",
  trade: "™",
  alefsym: "ℵ",
  larr: "←",
  uarr: "↑",
  rarr: "→",
  darr: "↓",
  harr: "↔",
  crarr: "↵",
  lArr: "⇐",
  uArr: "⇑",
  rArr: "⇒",
  dArr: "⇓",
  hArr: "⇔",
  forall: "∀",
  part: "∂",
  exist: "∃",
  empty: "∅",
  nabla: "∇",
  isin: "∈",
  notin: "∉",
  ni: "∋",
  prod: "∏",
  sum: "∑",
  minus: "−",
  lowast: "∗",
  radic: "√",
  prop: "∝",
  infin: "∞",
  ang: "∠",
  and: "∧",
  or: "∨",
  cap: "∩",
  cup: "∪",
  int: "∫",
  there4: "∴",
  sim: "∼",
  cong: "≅",
  asymp: "≈",
  ne: "≠",
  equiv: "≡",
  le: "≤",
  ge: "≥",
  sub: "⊂",
  sup: "⊃",
  nsub: "⊄",
  sube: "⊆",
  supe: "⊇",
  oplus: "⊕",
  otimes: "⊗",
  perp: "⊥",
  sdot: "⋅",
  lceil: "⌈",
  rceil: "⌉",
  lfloor: "⌊",
  rfloor: "⌋",
  lang: "〈",
  rang: "〉",
  loz: "◊",
  spades: "♠",
  clubs: "♣",
  hearts: "♥",
  diams: "♦",
  quot: '"',
  amp: "&",
  lt: "<",
  gt: ">",
  OElig: "Œ",
  oelig: "œ",
  Scaron: "Š",
  scaron: "š",
  Yuml: "Ÿ",
  circ: "ˆ",
  tilde: "˜",
  ensp: " ",
  emsp: " ",
  thinsp: " ",
  zwnj: "‌",
  zwj: "‍",
  lrm: "‎",
  rlm: "‏",
  ndash: "–",
  mdash: "—",
  lsquo: "‘",
  rsquo: "’",
  sbquo: "‚",
  ldquo: "“",
  rdquo: "”",
  bdquo: "„",
  dagger: "†",
  Dagger: "‡",
  permil: "‰",
  lsaquo: "‹",
  rsaquo: "›",
  euro: "€"
};
const dangerous = [
  "cent",
  "copy",
  "divide",
  "gt",
  "lt",
  "not",
  "para",
  "times"
];
const own$1 = {}.hasOwnProperty;
const characters = {};
let key;
for (key in characterEntitiesHtml4) {
  if (own$1.call(characterEntitiesHtml4, key)) {
    characters[characterEntitiesHtml4[key]] = key;
  }
}
const notAlphanumericRegex = /[^\dA-Za-z]/;
function toNamed(code, next, omit, attribute) {
  const character = String.fromCharCode(code);
  if (own$1.call(characters, character)) {
    const name = characters[character];
    const value = "&" + name;
    if (omit && characterEntitiesLegacy.includes(name) && !dangerous.includes(name) && (!attribute || next && next !== 61 && notAlphanumericRegex.test(String.fromCharCode(next)))) {
      return value;
    }
    return value + ";";
  }
  return "";
}
function formatSmart(code, next, options) {
  let numeric = toHexadecimal(code, next, options.omitOptionalSemicolons);
  let named;
  if (options.useNamedReferences || options.useShortestReferences) {
    named = toNamed(
      code,
      next,
      options.omitOptionalSemicolons,
      options.attribute
    );
  }
  if ((options.useShortestReferences || !named) && options.useShortestReferences) {
    const decimal = toDecimal(code, next, options.omitOptionalSemicolons);
    if (decimal.length < numeric.length) {
      numeric = decimal;
    }
  }
  return named && (!options.useShortestReferences || named.length < numeric.length) ? named : numeric;
}
function stringifyEntities(value, options) {
  return core(value, Object.assign({ format: formatSmart }, options));
}
const htmlCommentRegex = /^>|^->|<!--|-->|--!>|<!-$/g;
const bogusCommentEntitySubset = [">"];
const commentEntitySubset = ["<", ">"];
function comment(node, _1, _2, state) {
  return state.settings.bogusComments ? "<?" + stringifyEntities(
    node.value,
    Object.assign({}, state.settings.characterReferences, {
      subset: bogusCommentEntitySubset
    })
  ) + ">" : "<!--" + node.value.replace(htmlCommentRegex, encode) + "-->";
  function encode($0) {
    return stringifyEntities(
      $0,
      Object.assign({}, state.settings.characterReferences, {
        subset: commentEntitySubset
      })
    );
  }
}
function doctype(_1, _2, _3, state) {
  return "<!" + (state.settings.upperDoctype ? "DOCTYPE" : "doctype") + (state.settings.tightDoctype ? "" : " ") + "html>";
}
const siblingAfter = siblings(1);
const siblingBefore = siblings(-1);
const emptyChildren$1 = [];
function siblings(increment) {
  return sibling;
  function sibling(parent, index, includeWhitespace) {
    const siblings2 = parent ? parent.children : emptyChildren$1;
    let offset = (index || 0) + increment;
    let next = siblings2[offset];
    if (!includeWhitespace) {
      while (next && whitespace(next)) {
        offset += increment;
        next = siblings2[offset];
      }
    }
    return next;
  }
}
const own = {}.hasOwnProperty;
function omission(handlers) {
  return omit;
  function omit(node, index, parent) {
    return own.call(handlers, node.tagName) && handlers[node.tagName](node, index, parent);
  }
}
const closing = omission({
  body: body$1,
  caption: headOrColgroupOrCaption,
  colgroup: headOrColgroupOrCaption,
  dd,
  dt,
  head: headOrColgroupOrCaption,
  html: html$1,
  li,
  optgroup,
  option,
  p,
  rp: rubyElement,
  rt: rubyElement,
  tbody: tbody$1,
  td: cells,
  tfoot,
  th: cells,
  thead,
  tr
});
function headOrColgroupOrCaption(_2, index, parent) {
  const next = siblingAfter(parent, index, true);
  return !next || next.type !== "comment" && !(next.type === "text" && whitespace(next.value.charAt(0)));
}
function html$1(_2, index, parent) {
  const next = siblingAfter(parent, index);
  return !next || next.type !== "comment";
}
function body$1(_2, index, parent) {
  const next = siblingAfter(parent, index);
  return !next || next.type !== "comment";
}
function p(_2, index, parent) {
  const next = siblingAfter(parent, index);
  return next ? next.type === "element" && (next.tagName === "address" || next.tagName === "article" || next.tagName === "aside" || next.tagName === "blockquote" || next.tagName === "details" || next.tagName === "div" || next.tagName === "dl" || next.tagName === "fieldset" || next.tagName === "figcaption" || next.tagName === "figure" || next.tagName === "footer" || next.tagName === "form" || next.tagName === "h1" || next.tagName === "h2" || next.tagName === "h3" || next.tagName === "h4" || next.tagName === "h5" || next.tagName === "h6" || next.tagName === "header" || next.tagName === "hgroup" || next.tagName === "hr" || next.tagName === "main" || next.tagName === "menu" || next.tagName === "nav" || next.tagName === "ol" || next.tagName === "p" || next.tagName === "pre" || next.tagName === "section" || next.tagName === "table" || next.tagName === "ul") : !parent || // Confusing parent.
  !(parent.type === "element" && (parent.tagName === "a" || parent.tagName === "audio" || parent.tagName === "del" || parent.tagName === "ins" || parent.tagName === "map" || parent.tagName === "noscript" || parent.tagName === "video"));
}
function li(_2, index, parent) {
  const next = siblingAfter(parent, index);
  return !next || next.type === "element" && next.tagName === "li";
}
function dt(_2, index, parent) {
  const next = siblingAfter(parent, index);
  return Boolean(
    next && next.type === "element" && (next.tagName === "dt" || next.tagName === "dd")
  );
}
function dd(_2, index, parent) {
  const next = siblingAfter(parent, index);
  return !next || next.type === "element" && (next.tagName === "dt" || next.tagName === "dd");
}
function rubyElement(_2, index, parent) {
  const next = siblingAfter(parent, index);
  return !next || next.type === "element" && (next.tagName === "rp" || next.tagName === "rt");
}
function optgroup(_2, index, parent) {
  const next = siblingAfter(parent, index);
  return !next || next.type === "element" && next.tagName === "optgroup";
}
function option(_2, index, parent) {
  const next = siblingAfter(parent, index);
  return !next || next.type === "element" && (next.tagName === "option" || next.tagName === "optgroup");
}
function thead(_2, index, parent) {
  const next = siblingAfter(parent, index);
  return Boolean(
    next && next.type === "element" && (next.tagName === "tbody" || next.tagName === "tfoot")
  );
}
function tbody$1(_2, index, parent) {
  const next = siblingAfter(parent, index);
  return !next || next.type === "element" && (next.tagName === "tbody" || next.tagName === "tfoot");
}
function tfoot(_2, index, parent) {
  return !siblingAfter(parent, index);
}
function tr(_2, index, parent) {
  const next = siblingAfter(parent, index);
  return !next || next.type === "element" && next.tagName === "tr";
}
function cells(_2, index, parent) {
  const next = siblingAfter(parent, index);
  return !next || next.type === "element" && (next.tagName === "td" || next.tagName === "th");
}
const opening = omission({
  body,
  colgroup,
  head,
  html,
  tbody
});
function html(node) {
  const head2 = siblingAfter(node, -1);
  return !head2 || head2.type !== "comment";
}
function head(node) {
  const seen = /* @__PURE__ */ new Set();
  for (const child2 of node.children) {
    if (child2.type === "element" && (child2.tagName === "base" || child2.tagName === "title")) {
      if (seen.has(child2.tagName)) return false;
      seen.add(child2.tagName);
    }
  }
  const child = node.children[0];
  return !child || child.type === "element";
}
function body(node) {
  const head2 = siblingAfter(node, -1, true);
  return !head2 || head2.type !== "comment" && !(head2.type === "text" && whitespace(head2.value.charAt(0))) && !(head2.type === "element" && (head2.tagName === "meta" || head2.tagName === "link" || head2.tagName === "script" || head2.tagName === "style" || head2.tagName === "template"));
}
function colgroup(node, index, parent) {
  const previous = siblingBefore(parent, index);
  const head2 = siblingAfter(node, -1, true);
  if (parent && previous && previous.type === "element" && previous.tagName === "colgroup" && closing(previous, parent.children.indexOf(previous), parent)) {
    return false;
  }
  return Boolean(head2 && head2.type === "element" && head2.tagName === "col");
}
function tbody(node, index, parent) {
  const previous = siblingBefore(parent, index);
  const head2 = siblingAfter(node, -1);
  if (parent && previous && previous.type === "element" && (previous.tagName === "thead" || previous.tagName === "tbody") && closing(previous, parent.children.indexOf(previous), parent)) {
    return false;
  }
  return Boolean(head2 && head2.type === "element" && head2.tagName === "tr");
}
const constants = {
  // See: <https://html.spec.whatwg.org/#attribute-name-state>.
  name: [
    ["	\n\f\r &/=>".split(""), "	\n\f\r \"&'/=>`".split("")],
    [`\0	
\f\r "&'/<=>`.split(""), "\0	\n\f\r \"&'/<=>`".split("")]
  ],
  // See: <https://html.spec.whatwg.org/#attribute-value-(unquoted)-state>.
  unquoted: [
    ["	\n\f\r &>".split(""), "\0	\n\f\r \"&'<=>`".split("")],
    ["\0	\n\f\r \"&'<=>`".split(""), "\0	\n\f\r \"&'<=>`".split("")]
  ],
  // See: <https://html.spec.whatwg.org/#attribute-value-(single-quoted)-state>.
  single: [
    ["&'".split(""), "\"&'`".split("")],
    ["\0&'".split(""), "\0\"&'`".split("")]
  ],
  // See: <https://html.spec.whatwg.org/#attribute-value-(double-quoted)-state>.
  double: [
    ['"&'.split(""), "\"&'`".split("")],
    ['\0"&'.split(""), "\0\"&'`".split("")]
  ]
};
function element(node, index, parent, state) {
  const schema = state.schema;
  const omit = schema.space === "svg" ? false : state.settings.omitOptionalTags;
  let selfClosing = schema.space === "svg" ? state.settings.closeEmptyElements : state.settings.voids.includes(node.tagName.toLowerCase());
  const parts = [];
  let last;
  if (schema.space === "html" && node.tagName === "svg") {
    state.schema = svg;
  }
  const attributes = serializeAttributes(state, node.properties);
  const content = state.all(
    schema.space === "html" && node.tagName === "template" ? node.content : node
  );
  state.schema = schema;
  if (content) selfClosing = false;
  if (attributes || !omit || !opening(node, index, parent)) {
    parts.push("<", node.tagName, attributes ? " " + attributes : "");
    if (selfClosing && (schema.space === "svg" || state.settings.closeSelfClosing)) {
      last = attributes.charAt(attributes.length - 1);
      if (!state.settings.tightSelfClosing || last === "/" || last && last !== '"' && last !== "'") {
        parts.push(" ");
      }
      parts.push("/");
    }
    parts.push(">");
  }
  parts.push(content);
  if (!selfClosing && (!omit || !closing(node, index, parent))) {
    parts.push("</" + node.tagName + ">");
  }
  return parts.join("");
}
function serializeAttributes(state, properties) {
  const values = [];
  let index = -1;
  let key2;
  if (properties) {
    for (key2 in properties) {
      if (properties[key2] !== null && properties[key2] !== void 0) {
        const value = serializeAttribute(state, key2, properties[key2]);
        if (value) values.push(value);
      }
    }
  }
  while (++index < values.length) {
    const last = state.settings.tightAttributes ? values[index].charAt(values[index].length - 1) : void 0;
    if (index !== values.length - 1 && last !== '"' && last !== "'") {
      values[index] += " ";
    }
  }
  return values.join("");
}
function serializeAttribute(state, key2, value) {
  const info = find(state.schema, key2);
  const x2 = state.settings.allowParseErrors && state.schema.space === "html" ? 0 : 1;
  const y2 = state.settings.allowDangerousCharacters ? 0 : 1;
  let quote = state.quote;
  let result;
  if (info.overloadedBoolean && (value === info.attribute || value === "")) {
    value = true;
  } else if ((info.boolean || info.overloadedBoolean) && (typeof value !== "string" || value === info.attribute || value === "")) {
    value = Boolean(value);
  }
  if (value === null || value === void 0 || value === false || typeof value === "number" && Number.isNaN(value)) {
    return "";
  }
  const name = stringifyEntities(
    info.attribute,
    Object.assign({}, state.settings.characterReferences, {
      // Always encode without parse errors in non-HTML.
      subset: constants.name[x2][y2]
    })
  );
  if (value === true) return name;
  value = Array.isArray(value) ? (info.commaSeparated ? stringify$1 : stringify$2)(value, {
    padLeft: !state.settings.tightCommaSeparatedLists
  }) : String(value);
  if (state.settings.collapseEmptyAttributes && !value) return name;
  if (state.settings.preferUnquoted) {
    result = stringifyEntities(
      value,
      Object.assign({}, state.settings.characterReferences, {
        attribute: true,
        subset: constants.unquoted[x2][y2]
      })
    );
  }
  if (result !== value) {
    if (state.settings.quoteSmart && ccount(value, quote) > ccount(value, state.alternative)) {
      quote = state.alternative;
    }
    result = quote + stringifyEntities(
      value,
      Object.assign({}, state.settings.characterReferences, {
        // Always encode without parse errors in non-HTML.
        subset: (quote === "'" ? constants.single : constants.double)[x2][y2],
        attribute: true
      })
    ) + quote;
  }
  return name + (result ? "=" + result : result);
}
const textEntitySubset = ["<", "&"];
function text(node, _2, parent, state) {
  return parent && parent.type === "element" && (parent.tagName === "script" || parent.tagName === "style") ? node.value : stringifyEntities(
    node.value,
    Object.assign({}, state.settings.characterReferences, {
      subset: textEntitySubset
    })
  );
}
function raw(node, index, parent, state) {
  return state.settings.allowDangerousHtml ? node.value : text(node, index, parent, state);
}
function root(node, _1, _2, state) {
  return state.all(node);
}
const handle = zwitch("type", {
  invalid,
  unknown,
  handlers: { comment, doctype, element, raw, root, text }
});
function invalid(node) {
  throw new Error("Expected node, not `" + node + "`");
}
function unknown(node_) {
  const node = (
    /** @type {Nodes} */
    node_
  );
  throw new Error("Cannot compile unknown node `" + node.type + "`");
}
const emptyOptions = {};
const emptyCharacterReferences = {};
const emptyChildren = [];
function toHtml(tree, options) {
  const options_ = options || emptyOptions;
  const quote = options_.quote || '"';
  const alternative = quote === '"' ? "'" : '"';
  if (quote !== '"' && quote !== "'") {
    throw new Error("Invalid quote `" + quote + "`, expected `'` or `\"`");
  }
  const state = {
    one,
    all,
    settings: {
      omitOptionalTags: options_.omitOptionalTags || false,
      allowParseErrors: options_.allowParseErrors || false,
      allowDangerousCharacters: options_.allowDangerousCharacters || false,
      quoteSmart: options_.quoteSmart || false,
      preferUnquoted: options_.preferUnquoted || false,
      tightAttributes: options_.tightAttributes || false,
      upperDoctype: options_.upperDoctype || false,
      tightDoctype: options_.tightDoctype || false,
      bogusComments: options_.bogusComments || false,
      tightCommaSeparatedLists: options_.tightCommaSeparatedLists || false,
      tightSelfClosing: options_.tightSelfClosing || false,
      collapseEmptyAttributes: options_.collapseEmptyAttributes || false,
      allowDangerousHtml: options_.allowDangerousHtml || false,
      voids: options_.voids || htmlVoidElements,
      characterReferences: options_.characterReferences || emptyCharacterReferences,
      closeSelfClosing: options_.closeSelfClosing || false,
      closeEmptyElements: options_.closeEmptyElements || false
    },
    schema: options_.space === "svg" ? svg : html$2,
    quote,
    alternative
  };
  return state.one(
    Array.isArray(tree) ? { type: "root", children: tree } : tree,
    void 0,
    void 0
  );
}
function one(node, index, parent) {
  return handle(node, index, parent, this);
}
function all(parent) {
  const results = [];
  const children = parent && parent.children || emptyChildren;
  let index = -1;
  while (++index < children.length) {
    results[index] = this.one(children[index], index, parent);
  }
  return results.join("");
}
function resolveColorReplacements(theme, options) {
  const replacements = typeof theme === "string" ? {} : { ...theme.colorReplacements };
  const themeName = typeof theme === "string" ? theme : theme.name;
  for (const [key2, value] of Object.entries(options?.colorReplacements || {})) {
    if (typeof value === "string")
      replacements[key2] = value;
    else if (key2 === themeName)
      Object.assign(replacements, value);
  }
  return replacements;
}
function applyColorReplacements(color, replacements) {
  if (!color)
    return color;
  return replacements?.[color?.toLowerCase()] || color;
}
function toArray(x2) {
  return Array.isArray(x2) ? x2 : [x2];
}
async function normalizeGetter(p2) {
  return Promise.resolve(typeof p2 === "function" ? p2() : p2).then((r2) => r2.default || r2);
}
function isPlainLang(lang) {
  return !lang || ["plaintext", "txt", "text", "plain"].includes(lang);
}
function isSpecialLang(lang) {
  return lang === "ansi" || isPlainLang(lang);
}
function isNoneTheme(theme) {
  return theme === "none";
}
function isSpecialTheme(theme) {
  return isNoneTheme(theme);
}
function addClassToHast(node, className) {
  if (!className)
    return node;
  node.properties ||= {};
  node.properties.class ||= [];
  if (typeof node.properties.class === "string")
    node.properties.class = node.properties.class.split(/\s+/g);
  if (!Array.isArray(node.properties.class))
    node.properties.class = [];
  const targets = Array.isArray(className) ? className : className.split(/\s+/g);
  for (const c of targets) {
    if (c && !node.properties.class.includes(c))
      node.properties.class.push(c);
  }
  return node;
}
function splitLines$1(code, preserveEnding = false) {
  if (code.length === 0) {
    return [["", 0]];
  }
  const parts = code.split(/(\r?\n)/g);
  let index = 0;
  const lines = [];
  for (let i2 = 0; i2 < parts.length; i2 += 2) {
    const line = preserveEnding ? parts[i2] + (parts[i2 + 1] || "") : parts[i2];
    lines.push([line, index]);
    index += parts[i2].length;
    index += parts[i2 + 1]?.length || 0;
  }
  return lines;
}
function createPositionConverter(code) {
  const lines = splitLines$1(code, true).map(([line]) => line);
  function indexToPos(index) {
    if (index === code.length) {
      return {
        line: lines.length - 1,
        character: lines[lines.length - 1].length
      };
    }
    let character = index;
    let line = 0;
    for (const lineText of lines) {
      if (character < lineText.length)
        break;
      character -= lineText.length;
      line++;
    }
    return { line, character };
  }
  function posToIndex(line, character) {
    let index = 0;
    for (let i2 = 0; i2 < line; i2++)
      index += lines[i2].length;
    index += character;
    return index;
  }
  return {
    lines,
    indexToPos,
    posToIndex
  };
}
const DEFAULT_COLOR_LIGHT_DARK = "light-dark()";
const COLOR_KEYS = ["color", "background-color"];
function splitToken(token2, offsets) {
  let lastOffset = 0;
  const tokens = [];
  for (const offset of offsets) {
    if (offset > lastOffset) {
      tokens.push({
        ...token2,
        content: token2.content.slice(lastOffset, offset),
        offset: token2.offset + lastOffset
      });
    }
    lastOffset = offset;
  }
  if (lastOffset < token2.content.length) {
    tokens.push({
      ...token2,
      content: token2.content.slice(lastOffset),
      offset: token2.offset + lastOffset
    });
  }
  return tokens;
}
function splitTokens(tokens, breakpoints) {
  const sorted = Array.from(breakpoints instanceof Set ? breakpoints : new Set(breakpoints)).sort((a, b2) => a - b2);
  if (!sorted.length)
    return tokens;
  return tokens.map((line) => {
    return line.flatMap((token2) => {
      const breakpointsInToken = sorted.filter((i2) => token2.offset < i2 && i2 < token2.offset + token2.content.length).map((i2) => i2 - token2.offset).sort((a, b2) => a - b2);
      if (!breakpointsInToken.length)
        return token2;
      return splitToken(token2, breakpointsInToken);
    });
  });
}
function flatTokenVariants(merged, variantsOrder, cssVariablePrefix, defaultColor, colorsRendering = "css-vars") {
  const token2 = {
    content: merged.content,
    explanation: merged.explanation,
    offset: merged.offset
  };
  const styles = variantsOrder.map((t) => getTokenStyleObject(merged.variants[t]));
  const styleKeys = new Set(styles.flatMap((t) => Object.keys(t)));
  const mergedStyles = {};
  const varKey = (idx, key2) => {
    const keyName = key2 === "color" ? "" : key2 === "background-color" ? "-bg" : `-${key2}`;
    return cssVariablePrefix + variantsOrder[idx] + (key2 === "color" ? "" : keyName);
  };
  styles.forEach((cur, idx) => {
    for (const key2 of styleKeys) {
      const value = cur[key2] || "inherit";
      if (idx === 0 && defaultColor && COLOR_KEYS.includes(key2)) {
        if (defaultColor === DEFAULT_COLOR_LIGHT_DARK && styles.length > 1) {
          const lightIndex = variantsOrder.findIndex((t) => t === "light");
          const darkIndex = variantsOrder.findIndex((t) => t === "dark");
          if (lightIndex === -1 || darkIndex === -1)
            throw new ShikiError$2('When using `defaultColor: "light-dark()"`, you must provide both `light` and `dark` themes');
          const lightValue = styles[lightIndex][key2] || "inherit";
          const darkValue = styles[darkIndex][key2] || "inherit";
          mergedStyles[key2] = `light-dark(${lightValue}, ${darkValue})`;
          if (colorsRendering === "css-vars")
            mergedStyles[varKey(idx, key2)] = value;
        } else {
          mergedStyles[key2] = value;
        }
      } else {
        if (colorsRendering === "css-vars")
          mergedStyles[varKey(idx, key2)] = value;
      }
    }
  });
  token2.htmlStyle = mergedStyles;
  return token2;
}
function getTokenStyleObject(token2) {
  const styles = {};
  if (token2.color)
    styles.color = token2.color;
  if (token2.bgColor)
    styles["background-color"] = token2.bgColor;
  if (token2.fontStyle) {
    if (token2.fontStyle & FontStyle.Italic)
      styles["font-style"] = "italic";
    if (token2.fontStyle & FontStyle.Bold)
      styles["font-weight"] = "bold";
    const decorations2 = [];
    if (token2.fontStyle & FontStyle.Underline)
      decorations2.push("underline");
    if (token2.fontStyle & FontStyle.Strikethrough)
      decorations2.push("line-through");
    if (decorations2.length)
      styles["text-decoration"] = decorations2.join(" ");
  }
  return styles;
}
function stringifyTokenStyle(token2) {
  if (typeof token2 === "string")
    return token2;
  return Object.entries(token2).map(([key2, value]) => `${key2}:${value}`).join(";");
}
const _grammarStateMap = /* @__PURE__ */ new WeakMap();
function setLastGrammarStateToMap(keys, state) {
  _grammarStateMap.set(keys, state);
}
function getLastGrammarStateFromMap(keys) {
  return _grammarStateMap.get(keys);
}
class GrammarState {
  /**
   * Theme to Stack mapping
   */
  _stacks = {};
  lang;
  get themes() {
    return Object.keys(this._stacks);
  }
  get theme() {
    return this.themes[0];
  }
  get _stack() {
    return this._stacks[this.theme];
  }
  /**
   * Static method to create a initial grammar state.
   */
  static initial(lang, themes) {
    return new GrammarState(
      Object.fromEntries(toArray(themes).map((theme) => [theme, INITIAL])),
      lang
    );
  }
  constructor(...args) {
    if (args.length === 2) {
      const [stacksMap, lang] = args;
      this.lang = lang;
      this._stacks = stacksMap;
    } else {
      const [stack, lang, theme] = args;
      this.lang = lang;
      this._stacks = { [theme]: stack };
    }
  }
  /**
   * Get the internal stack object.
   * @internal
   */
  getInternalStack(theme = this.theme) {
    return this._stacks[theme];
  }
  getScopes(theme = this.theme) {
    return getScopes(this._stacks[theme]);
  }
  toJSON() {
    return {
      lang: this.lang,
      theme: this.theme,
      themes: this.themes,
      scopes: this.getScopes()
    };
  }
}
function getScopes(stack) {
  const scopes = [];
  const visited = /* @__PURE__ */ new Set();
  function pushScope(stack2) {
    if (visited.has(stack2))
      return;
    visited.add(stack2);
    const name = stack2?.nameScopesList?.scopeName;
    if (name)
      scopes.push(name);
    if (stack2.parent)
      pushScope(stack2.parent);
  }
  pushScope(stack);
  return scopes;
}
function getGrammarStack(state, theme) {
  if (!(state instanceof GrammarState))
    throw new ShikiError$2("Invalid grammar state");
  return state.getInternalStack(theme);
}
function transformerDecorations() {
  const map = /* @__PURE__ */ new WeakMap();
  function getContext(shiki) {
    if (!map.has(shiki.meta)) {
      let normalizePosition = function(p2) {
        if (typeof p2 === "number") {
          if (p2 < 0 || p2 > shiki.source.length)
            throw new ShikiError$2(`Invalid decoration offset: ${p2}. Code length: ${shiki.source.length}`);
          return {
            ...converter.indexToPos(p2),
            offset: p2
          };
        } else {
          const line = converter.lines[p2.line];
          if (line === void 0)
            throw new ShikiError$2(`Invalid decoration position ${JSON.stringify(p2)}. Lines length: ${converter.lines.length}`);
          let character = p2.character;
          if (character < 0)
            character = line.length + character;
          if (character < 0 || character > line.length)
            throw new ShikiError$2(`Invalid decoration position ${JSON.stringify(p2)}. Line ${p2.line} length: ${line.length}`);
          return {
            ...p2,
            character,
            offset: converter.posToIndex(p2.line, character)
          };
        }
      };
      const converter = createPositionConverter(shiki.source);
      const decorations2 = (shiki.options.decorations || []).map((d2) => ({
        ...d2,
        start: normalizePosition(d2.start),
        end: normalizePosition(d2.end)
      }));
      verifyIntersections(decorations2);
      map.set(shiki.meta, {
        decorations: decorations2,
        converter,
        source: shiki.source
      });
    }
    return map.get(shiki.meta);
  }
  return {
    name: "shiki:decorations",
    tokens(tokens) {
      if (!this.options.decorations?.length)
        return;
      const ctx = getContext(this);
      const breakpoints = ctx.decorations.flatMap((d2) => [d2.start.offset, d2.end.offset]);
      const splitted = splitTokens(tokens, breakpoints);
      return splitted;
    },
    code(codeEl) {
      if (!this.options.decorations?.length)
        return;
      const ctx = getContext(this);
      const lines = Array.from(codeEl.children).filter((i2) => i2.type === "element" && i2.tagName === "span");
      if (lines.length !== ctx.converter.lines.length)
        throw new ShikiError$2(`Number of lines in code element (${lines.length}) does not match the number of lines in the source (${ctx.converter.lines.length}). Failed to apply decorations.`);
      function applyLineSection(line, start, end, decoration) {
        const lineEl = lines[line];
        let text2 = "";
        let startIndex = -1;
        let endIndex = -1;
        if (start === 0)
          startIndex = 0;
        if (end === 0)
          endIndex = 0;
        if (end === Number.POSITIVE_INFINITY)
          endIndex = lineEl.children.length;
        if (startIndex === -1 || endIndex === -1) {
          for (let i2 = 0; i2 < lineEl.children.length; i2++) {
            text2 += stringify(lineEl.children[i2]);
            if (startIndex === -1 && text2.length === start)
              startIndex = i2 + 1;
            if (endIndex === -1 && text2.length === end)
              endIndex = i2 + 1;
          }
        }
        if (startIndex === -1)
          throw new ShikiError$2(`Failed to find start index for decoration ${JSON.stringify(decoration.start)}`);
        if (endIndex === -1)
          throw new ShikiError$2(`Failed to find end index for decoration ${JSON.stringify(decoration.end)}`);
        const children = lineEl.children.slice(startIndex, endIndex);
        if (!decoration.alwaysWrap && children.length === lineEl.children.length) {
          applyDecoration(lineEl, decoration, "line");
        } else if (!decoration.alwaysWrap && children.length === 1 && children[0].type === "element") {
          applyDecoration(children[0], decoration, "token");
        } else {
          const wrapper = {
            type: "element",
            tagName: "span",
            properties: {},
            children
          };
          applyDecoration(wrapper, decoration, "wrapper");
          lineEl.children.splice(startIndex, children.length, wrapper);
        }
      }
      function applyLine(line, decoration) {
        lines[line] = applyDecoration(lines[line], decoration, "line");
      }
      function applyDecoration(el, decoration, type) {
        const properties = decoration.properties || {};
        const transform2 = decoration.transform || ((i2) => i2);
        el.tagName = decoration.tagName || "span";
        el.properties = {
          ...el.properties,
          ...properties,
          class: el.properties.class
        };
        if (decoration.properties?.class)
          addClassToHast(el, decoration.properties.class);
        el = transform2(el, type) || el;
        return el;
      }
      const lineApplies = [];
      const sorted = ctx.decorations.sort((a, b2) => b2.start.offset - a.start.offset || a.end.offset - b2.end.offset);
      for (const decoration of sorted) {
        const { start, end } = decoration;
        if (start.line === end.line) {
          applyLineSection(start.line, start.character, end.character, decoration);
        } else if (start.line < end.line) {
          applyLineSection(start.line, start.character, Number.POSITIVE_INFINITY, decoration);
          for (let i2 = start.line + 1; i2 < end.line; i2++)
            lineApplies.unshift(() => applyLine(i2, decoration));
          applyLineSection(end.line, 0, end.character, decoration);
        }
      }
      lineApplies.forEach((i2) => i2());
    }
  };
}
function verifyIntersections(items) {
  for (let i2 = 0; i2 < items.length; i2++) {
    const foo = items[i2];
    if (foo.start.offset > foo.end.offset)
      throw new ShikiError$2(`Invalid decoration range: ${JSON.stringify(foo.start)} - ${JSON.stringify(foo.end)}`);
    for (let j2 = i2 + 1; j2 < items.length; j2++) {
      const bar = items[j2];
      const isFooHasBarStart = foo.start.offset <= bar.start.offset && bar.start.offset < foo.end.offset;
      const isFooHasBarEnd = foo.start.offset < bar.end.offset && bar.end.offset <= foo.end.offset;
      const isBarHasFooStart = bar.start.offset <= foo.start.offset && foo.start.offset < bar.end.offset;
      const isBarHasFooEnd = bar.start.offset < foo.end.offset && foo.end.offset <= bar.end.offset;
      if (isFooHasBarStart || isFooHasBarEnd || isBarHasFooStart || isBarHasFooEnd) {
        if (isFooHasBarStart && isFooHasBarEnd)
          continue;
        if (isBarHasFooStart && isBarHasFooEnd)
          continue;
        if (isBarHasFooStart && foo.start.offset === foo.end.offset)
          continue;
        if (isFooHasBarEnd && bar.start.offset === bar.end.offset)
          continue;
        throw new ShikiError$2(`Decorations ${JSON.stringify(foo.start)} and ${JSON.stringify(bar.start)} intersect.`);
      }
    }
  }
}
function stringify(el) {
  if (el.type === "text")
    return el.value;
  if (el.type === "element")
    return el.children.map(stringify).join("");
  return "";
}
const builtInTransformers = [
  /* @__PURE__ */ transformerDecorations()
];
function getTransformers(options) {
  const transformers = sortTransformersByEnforcement(options.transformers || []);
  return [
    ...transformers.pre,
    ...transformers.normal,
    ...transformers.post,
    ...builtInTransformers
  ];
}
function sortTransformersByEnforcement(transformers) {
  const pre = [];
  const post = [];
  const normal = [];
  for (const transformer of transformers) {
    switch (transformer.enforce) {
      case "pre":
        pre.push(transformer);
        break;
      case "post":
        post.push(transformer);
        break;
      default:
        normal.push(transformer);
    }
  }
  return { pre, post, normal };
}
var namedColors = [
  "black",
  "red",
  "green",
  "yellow",
  "blue",
  "magenta",
  "cyan",
  "white",
  "brightBlack",
  "brightRed",
  "brightGreen",
  "brightYellow",
  "brightBlue",
  "brightMagenta",
  "brightCyan",
  "brightWhite"
];
var decorations = {
  1: "bold",
  2: "dim",
  3: "italic",
  4: "underline",
  7: "reverse",
  8: "hidden",
  9: "strikethrough"
};
function findSequence(value, position) {
  const nextEscape = value.indexOf("\x1B", position);
  if (nextEscape !== -1) {
    if (value[nextEscape + 1] === "[") {
      const nextClose = value.indexOf("m", nextEscape);
      if (nextClose !== -1) {
        return {
          sequence: value.substring(nextEscape + 2, nextClose).split(";"),
          startPosition: nextEscape,
          position: nextClose + 1
        };
      }
    }
  }
  return {
    position: value.length
  };
}
function parseColor(sequence) {
  const colorMode = sequence.shift();
  if (colorMode === "2") {
    const rgb = sequence.splice(0, 3).map((x2) => Number.parseInt(x2));
    if (rgb.length !== 3 || rgb.some((x2) => Number.isNaN(x2)))
      return;
    return {
      type: "rgb",
      rgb
    };
  } else if (colorMode === "5") {
    const index = sequence.shift();
    if (index) {
      return { type: "table", index: Number(index) };
    }
  }
}
function parseSequence(sequence) {
  const commands = [];
  while (sequence.length > 0) {
    const code = sequence.shift();
    if (!code)
      continue;
    const codeInt = Number.parseInt(code);
    if (Number.isNaN(codeInt))
      continue;
    if (codeInt === 0) {
      commands.push({ type: "resetAll" });
    } else if (codeInt <= 9) {
      const decoration = decorations[codeInt];
      if (decoration) {
        commands.push({
          type: "setDecoration",
          value: decorations[codeInt]
        });
      }
    } else if (codeInt <= 29) {
      const decoration = decorations[codeInt - 20];
      if (decoration) {
        commands.push({
          type: "resetDecoration",
          value: decoration
        });
        if (decoration === "dim") {
          commands.push({
            type: "resetDecoration",
            value: "bold"
          });
        }
      }
    } else if (codeInt <= 37) {
      commands.push({
        type: "setForegroundColor",
        value: { type: "named", name: namedColors[codeInt - 30] }
      });
    } else if (codeInt === 38) {
      const color = parseColor(sequence);
      if (color) {
        commands.push({
          type: "setForegroundColor",
          value: color
        });
      }
    } else if (codeInt === 39) {
      commands.push({
        type: "resetForegroundColor"
      });
    } else if (codeInt <= 47) {
      commands.push({
        type: "setBackgroundColor",
        value: { type: "named", name: namedColors[codeInt - 40] }
      });
    } else if (codeInt === 48) {
      const color = parseColor(sequence);
      if (color) {
        commands.push({
          type: "setBackgroundColor",
          value: color
        });
      }
    } else if (codeInt === 49) {
      commands.push({
        type: "resetBackgroundColor"
      });
    } else if (codeInt === 53) {
      commands.push({
        type: "setDecoration",
        value: "overline"
      });
    } else if (codeInt === 55) {
      commands.push({
        type: "resetDecoration",
        value: "overline"
      });
    } else if (codeInt >= 90 && codeInt <= 97) {
      commands.push({
        type: "setForegroundColor",
        value: { type: "named", name: namedColors[codeInt - 90 + 8] }
      });
    } else if (codeInt >= 100 && codeInt <= 107) {
      commands.push({
        type: "setBackgroundColor",
        value: { type: "named", name: namedColors[codeInt - 100 + 8] }
      });
    }
  }
  return commands;
}
function createAnsiSequenceParser() {
  let foreground = null;
  let background = null;
  let decorations2 = /* @__PURE__ */ new Set();
  return {
    parse(value) {
      const tokens = [];
      let position = 0;
      do {
        const findResult = findSequence(value, position);
        const text2 = findResult.sequence ? value.substring(position, findResult.startPosition) : value.substring(position);
        if (text2.length > 0) {
          tokens.push({
            value: text2,
            foreground,
            background,
            decorations: new Set(decorations2)
          });
        }
        if (findResult.sequence) {
          const commands = parseSequence(findResult.sequence);
          for (const styleToken of commands) {
            if (styleToken.type === "resetAll") {
              foreground = null;
              background = null;
              decorations2.clear();
            } else if (styleToken.type === "resetForegroundColor") {
              foreground = null;
            } else if (styleToken.type === "resetBackgroundColor") {
              background = null;
            } else if (styleToken.type === "resetDecoration") {
              decorations2.delete(styleToken.value);
            }
          }
          for (const styleToken of commands) {
            if (styleToken.type === "setForegroundColor") {
              foreground = styleToken.value;
            } else if (styleToken.type === "setBackgroundColor") {
              background = styleToken.value;
            } else if (styleToken.type === "setDecoration") {
              decorations2.add(styleToken.value);
            }
          }
        }
        position = findResult.position;
      } while (position < value.length);
      return tokens;
    }
  };
}
var defaultNamedColorsMap = {
  black: "#000000",
  red: "#bb0000",
  green: "#00bb00",
  yellow: "#bbbb00",
  blue: "#0000bb",
  magenta: "#ff00ff",
  cyan: "#00bbbb",
  white: "#eeeeee",
  brightBlack: "#555555",
  brightRed: "#ff5555",
  brightGreen: "#00ff00",
  brightYellow: "#ffff55",
  brightBlue: "#5555ff",
  brightMagenta: "#ff55ff",
  brightCyan: "#55ffff",
  brightWhite: "#ffffff"
};
function createColorPalette(namedColorsMap = defaultNamedColorsMap) {
  function namedColor(name) {
    return namedColorsMap[name];
  }
  function rgbColor(rgb) {
    return `#${rgb.map((x2) => Math.max(0, Math.min(x2, 255)).toString(16).padStart(2, "0")).join("")}`;
  }
  let colorTable;
  function getColorTable() {
    if (colorTable) {
      return colorTable;
    }
    colorTable = [];
    for (let i2 = 0; i2 < namedColors.length; i2++) {
      colorTable.push(namedColor(namedColors[i2]));
    }
    let levels = [0, 95, 135, 175, 215, 255];
    for (let r2 = 0; r2 < 6; r2++) {
      for (let g = 0; g < 6; g++) {
        for (let b2 = 0; b2 < 6; b2++) {
          colorTable.push(rgbColor([levels[r2], levels[g], levels[b2]]));
        }
      }
    }
    let level = 8;
    for (let i2 = 0; i2 < 24; i2++, level += 10) {
      colorTable.push(rgbColor([level, level, level]));
    }
    return colorTable;
  }
  function tableColor(index) {
    return getColorTable()[index];
  }
  function value(color) {
    switch (color.type) {
      case "named":
        return namedColor(color.name);
      case "rgb":
        return rgbColor(color.rgb);
      case "table":
        return tableColor(color.index);
    }
  }
  return {
    value
  };
}
const defaultAnsiColors = {
  black: "#000000",
  red: "#cd3131",
  green: "#0DBC79",
  yellow: "#E5E510",
  blue: "#2472C8",
  magenta: "#BC3FBC",
  cyan: "#11A8CD",
  white: "#E5E5E5",
  brightBlack: "#666666",
  brightRed: "#F14C4C",
  brightGreen: "#23D18B",
  brightYellow: "#F5F543",
  brightBlue: "#3B8EEA",
  brightMagenta: "#D670D6",
  brightCyan: "#29B8DB",
  brightWhite: "#FFFFFF"
};
function tokenizeAnsiWithTheme(theme, fileContents, options) {
  const colorReplacements = resolveColorReplacements(theme, options);
  const lines = splitLines$1(fileContents);
  const ansiPalette = Object.fromEntries(
    namedColors.map((name) => {
      const key2 = `terminal.ansi${name[0].toUpperCase()}${name.substring(1)}`;
      const themeColor = theme.colors?.[key2];
      return [name, themeColor || defaultAnsiColors[name]];
    })
  );
  const colorPalette = createColorPalette(ansiPalette);
  const parser = createAnsiSequenceParser();
  return lines.map(
    (line) => parser.parse(line[0]).map((token2) => {
      let color;
      let bgColor;
      if (token2.decorations.has("reverse")) {
        color = token2.background ? colorPalette.value(token2.background) : theme.bg;
        bgColor = token2.foreground ? colorPalette.value(token2.foreground) : theme.fg;
      } else {
        color = token2.foreground ? colorPalette.value(token2.foreground) : theme.fg;
        bgColor = token2.background ? colorPalette.value(token2.background) : void 0;
      }
      color = applyColorReplacements(color, colorReplacements);
      bgColor = applyColorReplacements(bgColor, colorReplacements);
      if (token2.decorations.has("dim"))
        color = dimColor(color);
      let fontStyle = FontStyle.None;
      if (token2.decorations.has("bold"))
        fontStyle |= FontStyle.Bold;
      if (token2.decorations.has("italic"))
        fontStyle |= FontStyle.Italic;
      if (token2.decorations.has("underline"))
        fontStyle |= FontStyle.Underline;
      if (token2.decorations.has("strikethrough"))
        fontStyle |= FontStyle.Strikethrough;
      return {
        content: token2.value,
        offset: line[1],
        // TODO: more accurate offset? might need to fork ansi-sequence-parser
        color,
        bgColor,
        fontStyle
      };
    })
  );
}
function dimColor(color) {
  const hexMatch = color.match(/#([0-9a-f]{3,8})/i);
  if (hexMatch) {
    const hex = hexMatch[1];
    if (hex.length === 8) {
      const alpha = Math.round(Number.parseInt(hex.slice(6, 8), 16) / 2).toString(16).padStart(2, "0");
      return `#${hex.slice(0, 6)}${alpha}`;
    } else if (hex.length === 6) {
      return `#${hex}80`;
    } else if (hex.length === 4) {
      const r2 = hex[0];
      const g = hex[1];
      const b2 = hex[2];
      const a = hex[3];
      const alpha = Math.round(Number.parseInt(`${a}${a}`, 16) / 2).toString(16).padStart(2, "0");
      return `#${r2}${r2}${g}${g}${b2}${b2}${alpha}`;
    } else if (hex.length === 3) {
      const r2 = hex[0];
      const g = hex[1];
      const b2 = hex[2];
      return `#${r2}${r2}${g}${g}${b2}${b2}80`;
    }
  }
  const cssVarMatch = color.match(/var\((--[\w-]+-ansi-[\w-]+)\)/);
  if (cssVarMatch)
    return `var(${cssVarMatch[1]}-dim)`;
  return color;
}
function codeToTokensBase(internal, code, options = {}) {
  const {
    theme: themeName = internal.getLoadedThemes()[0]
  } = options;
  const lang = internal.resolveLangAlias(options.lang || "text");
  if (isPlainLang(lang) || isNoneTheme(themeName))
    return splitLines$1(code).map((line) => [{ content: line[0], offset: line[1] }]);
  const { theme, colorMap } = internal.setTheme(themeName);
  if (lang === "ansi")
    return tokenizeAnsiWithTheme(theme, code, options);
  const _grammar = internal.getLanguage(options.lang || "text");
  if (options.grammarState) {
    if (options.grammarState.lang !== _grammar.name) {
      throw new ShikiError$2(`Grammar state language "${options.grammarState.lang}" does not match highlight language "${_grammar.name}"`);
    }
    if (!options.grammarState.themes.includes(theme.name)) {
      throw new ShikiError$2(`Grammar state themes "${options.grammarState.themes}" do not contain highlight theme "${theme.name}"`);
    }
  }
  return tokenizeWithTheme(code, _grammar, theme, colorMap, options);
}
function getLastGrammarState(...args) {
  if (args.length === 2) {
    return getLastGrammarStateFromMap(args[1]);
  }
  const [internal, code, options = {}] = args;
  const {
    lang = "text",
    theme: themeName = internal.getLoadedThemes()[0]
  } = options;
  if (isPlainLang(lang) || isNoneTheme(themeName))
    throw new ShikiError$2("Plain language does not have grammar state");
  if (lang === "ansi")
    throw new ShikiError$2("ANSI language does not have grammar state");
  const { theme, colorMap } = internal.setTheme(themeName);
  const _grammar = internal.getLanguage(lang);
  return new GrammarState(
    _tokenizeWithTheme(code, _grammar, theme, colorMap, options).stateStack,
    _grammar.name,
    theme.name
  );
}
function tokenizeWithTheme(code, grammar, theme, colorMap, options) {
  const result = _tokenizeWithTheme(code, grammar, theme, colorMap, options);
  const grammarState = new GrammarState(
    result.stateStack,
    grammar.name,
    theme.name
  );
  setLastGrammarStateToMap(result.tokens, grammarState);
  return result.tokens;
}
function _tokenizeWithTheme(code, grammar, theme, colorMap, options) {
  const colorReplacements = resolveColorReplacements(theme, options);
  const {
    tokenizeMaxLineLength = 0,
    tokenizeTimeLimit = 500
  } = options;
  const lines = splitLines$1(code);
  let stateStack = options.grammarState ? getGrammarStack(options.grammarState, theme.name) ?? INITIAL : options.grammarContextCode != null ? _tokenizeWithTheme(
    options.grammarContextCode,
    grammar,
    theme,
    colorMap,
    {
      ...options,
      grammarState: void 0,
      grammarContextCode: void 0
    }
  ).stateStack : INITIAL;
  let actual = [];
  const final = [];
  for (let i2 = 0, len = lines.length; i2 < len; i2++) {
    const [line, lineOffset] = lines[i2];
    if (line === "") {
      actual = [];
      final.push([]);
      continue;
    }
    if (tokenizeMaxLineLength > 0 && line.length >= tokenizeMaxLineLength) {
      actual = [];
      final.push([{
        content: line,
        offset: lineOffset,
        color: "",
        fontStyle: 0
      }]);
      continue;
    }
    let resultWithScopes;
    let tokensWithScopes;
    let tokensWithScopesIndex;
    if (options.includeExplanation) {
      resultWithScopes = grammar.tokenizeLine(line, stateStack, tokenizeTimeLimit);
      tokensWithScopes = resultWithScopes.tokens;
      tokensWithScopesIndex = 0;
    }
    const result = grammar.tokenizeLine2(line, stateStack, tokenizeTimeLimit);
    const tokensLength = result.tokens.length / 2;
    for (let j2 = 0; j2 < tokensLength; j2++) {
      const startIndex = result.tokens[2 * j2];
      const nextStartIndex = j2 + 1 < tokensLength ? result.tokens[2 * j2 + 2] : line.length;
      if (startIndex === nextStartIndex)
        continue;
      const metadata = result.tokens[2 * j2 + 1];
      const color = applyColorReplacements(
        colorMap[EncodedTokenMetadata.getForeground(metadata)],
        colorReplacements
      );
      const fontStyle = EncodedTokenMetadata.getFontStyle(metadata);
      const token2 = {
        content: line.substring(startIndex, nextStartIndex),
        offset: lineOffset + startIndex,
        color,
        fontStyle
      };
      if (options.includeExplanation) {
        const themeSettingsSelectors = [];
        if (options.includeExplanation !== "scopeName") {
          for (const setting of theme.settings) {
            let selectors;
            switch (typeof setting.scope) {
              case "string":
                selectors = setting.scope.split(/,/).map((scope) => scope.trim());
                break;
              case "object":
                selectors = setting.scope;
                break;
              default:
                continue;
            }
            themeSettingsSelectors.push({
              settings: setting,
              selectors: selectors.map((selector) => selector.split(/ /))
            });
          }
        }
        token2.explanation = [];
        let offset = 0;
        while (startIndex + offset < nextStartIndex) {
          const tokenWithScopes = tokensWithScopes[tokensWithScopesIndex];
          const tokenWithScopesText = line.substring(
            tokenWithScopes.startIndex,
            tokenWithScopes.endIndex
          );
          offset += tokenWithScopesText.length;
          token2.explanation.push({
            content: tokenWithScopesText,
            scopes: options.includeExplanation === "scopeName" ? explainThemeScopesNameOnly(
              tokenWithScopes.scopes
            ) : explainThemeScopesFull(
              themeSettingsSelectors,
              tokenWithScopes.scopes
            )
          });
          tokensWithScopesIndex += 1;
        }
      }
      actual.push(token2);
    }
    final.push(actual);
    actual = [];
    stateStack = result.ruleStack;
  }
  return {
    tokens: final,
    stateStack
  };
}
function explainThemeScopesNameOnly(scopes) {
  return scopes.map((scope) => ({ scopeName: scope }));
}
function explainThemeScopesFull(themeSelectors, scopes) {
  const result = [];
  for (let i2 = 0, len = scopes.length; i2 < len; i2++) {
    const scope = scopes[i2];
    result[i2] = {
      scopeName: scope,
      themeMatches: explainThemeScope(themeSelectors, scope, scopes.slice(0, i2))
    };
  }
  return result;
}
function matchesOne(selector, scope) {
  return selector === scope || scope.substring(0, selector.length) === selector && scope[selector.length] === ".";
}
function matches(selectors, scope, parentScopes) {
  if (!matchesOne(selectors[selectors.length - 1], scope))
    return false;
  let selectorParentIndex = selectors.length - 2;
  let parentIndex = parentScopes.length - 1;
  while (selectorParentIndex >= 0 && parentIndex >= 0) {
    if (matchesOne(selectors[selectorParentIndex], parentScopes[parentIndex]))
      selectorParentIndex -= 1;
    parentIndex -= 1;
  }
  if (selectorParentIndex === -1)
    return true;
  return false;
}
function explainThemeScope(themeSettingsSelectors, scope, parentScopes) {
  const result = [];
  for (const { selectors, settings } of themeSettingsSelectors) {
    for (const selectorPieces of selectors) {
      if (matches(selectorPieces, scope, parentScopes)) {
        result.push(settings);
        break;
      }
    }
  }
  return result;
}
function codeToTokensWithThemes(internal, code, options) {
  const themes = Object.entries(options.themes).filter((i2) => i2[1]).map((i2) => ({ color: i2[0], theme: i2[1] }));
  const themedTokens = themes.map((t) => {
    const tokens2 = codeToTokensBase(internal, code, {
      ...options,
      theme: t.theme
    });
    const state = getLastGrammarStateFromMap(tokens2);
    const theme = typeof t.theme === "string" ? t.theme : t.theme.name;
    return {
      tokens: tokens2,
      state,
      theme
    };
  });
  const tokens = syncThemesTokenization(
    ...themedTokens.map((i2) => i2.tokens)
  );
  const mergedTokens = tokens[0].map(
    (line, lineIdx) => line.map((_token, tokenIdx) => {
      const mergedToken = {
        content: _token.content,
        variants: {},
        offset: _token.offset
      };
      if ("includeExplanation" in options && options.includeExplanation) {
        mergedToken.explanation = _token.explanation;
      }
      tokens.forEach((t, themeIdx) => {
        const {
          content: _2,
          explanation: __,
          offset: ___,
          ...styles
        } = t[lineIdx][tokenIdx];
        mergedToken.variants[themes[themeIdx].color] = styles;
      });
      return mergedToken;
    })
  );
  const mergedGrammarState = themedTokens[0].state ? new GrammarState(
    Object.fromEntries(themedTokens.map((s2) => [s2.theme, s2.state?.getInternalStack(s2.theme)])),
    themedTokens[0].state.lang
  ) : void 0;
  if (mergedGrammarState)
    setLastGrammarStateToMap(mergedTokens, mergedGrammarState);
  return mergedTokens;
}
function syncThemesTokenization(...themes) {
  const outThemes = themes.map(() => []);
  const count = themes.length;
  for (let i2 = 0; i2 < themes[0].length; i2++) {
    const lines = themes.map((t) => t[i2]);
    const outLines = outThemes.map(() => []);
    outThemes.forEach((t, i22) => t.push(outLines[i22]));
    const indexes = lines.map(() => 0);
    const current = lines.map((l2) => l2[0]);
    while (current.every((t) => t)) {
      const minLength = Math.min(...current.map((t) => t.content.length));
      for (let n = 0; n < count; n++) {
        const token2 = current[n];
        if (token2.content.length === minLength) {
          outLines[n].push(token2);
          indexes[n] += 1;
          current[n] = lines[n][indexes[n]];
        } else {
          outLines[n].push({
            ...token2,
            content: token2.content.slice(0, minLength)
          });
          current[n] = {
            ...token2,
            content: token2.content.slice(minLength),
            offset: token2.offset + minLength
          };
        }
      }
    }
  }
  return outThemes;
}
function codeToTokens(internal, code, options) {
  let bg;
  let fg;
  let tokens;
  let themeName;
  let rootStyle;
  let grammarState;
  if ("themes" in options) {
    const {
      defaultColor = "light",
      cssVariablePrefix = "--shiki-",
      colorsRendering = "css-vars"
    } = options;
    const themes = Object.entries(options.themes).filter((i2) => i2[1]).map((i2) => ({ color: i2[0], theme: i2[1] })).sort((a, b2) => a.color === defaultColor ? -1 : b2.color === defaultColor ? 1 : 0);
    if (themes.length === 0)
      throw new ShikiError$2("`themes` option must not be empty");
    const themeTokens = codeToTokensWithThemes(
      internal,
      code,
      options
    );
    grammarState = getLastGrammarStateFromMap(themeTokens);
    if (defaultColor && DEFAULT_COLOR_LIGHT_DARK !== defaultColor && !themes.find((t) => t.color === defaultColor))
      throw new ShikiError$2(`\`themes\` option must contain the defaultColor key \`${defaultColor}\``);
    const themeRegs = themes.map((t) => internal.getTheme(t.theme));
    const themesOrder = themes.map((t) => t.color);
    tokens = themeTokens.map((line) => line.map((token2) => flatTokenVariants(token2, themesOrder, cssVariablePrefix, defaultColor, colorsRendering)));
    if (grammarState)
      setLastGrammarStateToMap(tokens, grammarState);
    const themeColorReplacements = themes.map((t) => resolveColorReplacements(t.theme, options));
    fg = mapThemeColors(themes, themeRegs, themeColorReplacements, cssVariablePrefix, defaultColor, "fg", colorsRendering);
    bg = mapThemeColors(themes, themeRegs, themeColorReplacements, cssVariablePrefix, defaultColor, "bg", colorsRendering);
    themeName = `shiki-themes ${themeRegs.map((t) => t.name).join(" ")}`;
    rootStyle = defaultColor ? void 0 : [fg, bg].join(";");
  } else if ("theme" in options) {
    const colorReplacements = resolveColorReplacements(options.theme, options);
    tokens = codeToTokensBase(
      internal,
      code,
      options
    );
    const _theme = internal.getTheme(options.theme);
    bg = applyColorReplacements(_theme.bg, colorReplacements);
    fg = applyColorReplacements(_theme.fg, colorReplacements);
    themeName = _theme.name;
    grammarState = getLastGrammarStateFromMap(tokens);
  } else {
    throw new ShikiError$2("Invalid options, either `theme` or `themes` must be provided");
  }
  return {
    tokens,
    fg,
    bg,
    themeName,
    rootStyle,
    grammarState
  };
}
function mapThemeColors(themes, themeRegs, themeColorReplacements, cssVariablePrefix, defaultColor, property, colorsRendering) {
  return themes.map((t, idx) => {
    const value = applyColorReplacements(themeRegs[idx][property], themeColorReplacements[idx]) || "inherit";
    const cssVar = `${cssVariablePrefix + t.color}${property === "bg" ? "-bg" : ""}:${value}`;
    if (idx === 0 && defaultColor) {
      if (defaultColor === DEFAULT_COLOR_LIGHT_DARK && themes.length > 1) {
        const lightIndex = themes.findIndex((t2) => t2.color === "light");
        const darkIndex = themes.findIndex((t2) => t2.color === "dark");
        if (lightIndex === -1 || darkIndex === -1)
          throw new ShikiError$2('When using `defaultColor: "light-dark()"`, you must provide both `light` and `dark` themes');
        const lightValue = applyColorReplacements(themeRegs[lightIndex][property], themeColorReplacements[lightIndex]) || "inherit";
        const darkValue = applyColorReplacements(themeRegs[darkIndex][property], themeColorReplacements[darkIndex]) || "inherit";
        return `light-dark(${lightValue}, ${darkValue});${cssVar}`;
      }
      return value;
    }
    if (colorsRendering === "css-vars") {
      return cssVar;
    }
    return null;
  }).filter((i2) => !!i2).join(";");
}
function codeToHast(internal, code, options, transformerContext = {
  meta: {},
  options,
  codeToHast: (_code, _options) => codeToHast(internal, _code, _options),
  codeToTokens: (_code, _options) => codeToTokens(internal, _code, _options)
}) {
  let input = code;
  for (const transformer of getTransformers(options))
    input = transformer.preprocess?.call(transformerContext, input, options) || input;
  let {
    tokens,
    fg,
    bg,
    themeName,
    rootStyle,
    grammarState
  } = codeToTokens(internal, input, options);
  const {
    mergeWhitespaces = true,
    mergeSameStyleTokens = false
  } = options;
  if (mergeWhitespaces === true)
    tokens = mergeWhitespaceTokens(tokens);
  else if (mergeWhitespaces === "never")
    tokens = splitWhitespaceTokens(tokens);
  if (mergeSameStyleTokens) {
    tokens = mergeAdjacentStyledTokens(tokens);
  }
  const contextSource = {
    ...transformerContext,
    get source() {
      return input;
    }
  };
  for (const transformer of getTransformers(options))
    tokens = transformer.tokens?.call(contextSource, tokens) || tokens;
  return tokensToHast(
    tokens,
    {
      ...options,
      fg,
      bg,
      themeName,
      rootStyle: options.rootStyle === false ? false : options.rootStyle ?? rootStyle
    },
    contextSource,
    grammarState
  );
}
function tokensToHast(tokens, options, transformerContext, grammarState = getLastGrammarStateFromMap(tokens)) {
  const transformers = getTransformers(options);
  const lines = [];
  const root2 = {
    type: "root",
    children: []
  };
  const {
    structure = "classic",
    tabindex = "0"
  } = options;
  const properties = {
    class: `shiki ${options.themeName || ""}`
  };
  if (options.rootStyle !== false) {
    if (options.rootStyle != null)
      properties.style = options.rootStyle;
    else
      properties.style = `background-color:${options.bg};color:${options.fg}`;
  }
  if (tabindex !== false && tabindex != null)
    properties.tabindex = tabindex.toString();
  for (const [key2, value] of Object.entries(options.meta || {})) {
    if (!key2.startsWith("_"))
      properties[key2] = value;
  }
  let preNode = {
    type: "element",
    tagName: "pre",
    properties,
    children: [],
    data: options.data
  };
  let codeNode = {
    type: "element",
    tagName: "code",
    properties: {},
    children: lines
  };
  const lineNodes = [];
  const context = {
    ...transformerContext,
    structure,
    addClassToHast,
    get source() {
      return transformerContext.source;
    },
    get tokens() {
      return tokens;
    },
    get options() {
      return options;
    },
    get root() {
      return root2;
    },
    get pre() {
      return preNode;
    },
    get code() {
      return codeNode;
    },
    get lines() {
      return lineNodes;
    }
  };
  tokens.forEach((line, idx) => {
    if (idx) {
      if (structure === "inline")
        root2.children.push({ type: "element", tagName: "br", properties: {}, children: [] });
      else if (structure === "classic")
        lines.push({ type: "text", value: "\n" });
    }
    let lineNode = {
      type: "element",
      tagName: "span",
      properties: { class: "line" },
      children: []
    };
    let col = 0;
    for (const token2 of line) {
      let tokenNode = {
        type: "element",
        tagName: "span",
        properties: {
          ...token2.htmlAttrs
        },
        children: [{ type: "text", value: token2.content }]
      };
      const style = stringifyTokenStyle(token2.htmlStyle || getTokenStyleObject(token2));
      if (style)
        tokenNode.properties.style = style;
      for (const transformer of transformers)
        tokenNode = transformer?.span?.call(context, tokenNode, idx + 1, col, lineNode, token2) || tokenNode;
      if (structure === "inline")
        root2.children.push(tokenNode);
      else if (structure === "classic")
        lineNode.children.push(tokenNode);
      col += token2.content.length;
    }
    if (structure === "classic") {
      for (const transformer of transformers)
        lineNode = transformer?.line?.call(context, lineNode, idx + 1) || lineNode;
      lineNodes.push(lineNode);
      lines.push(lineNode);
    } else if (structure === "inline") {
      lineNodes.push(lineNode);
    }
  });
  if (structure === "classic") {
    for (const transformer of transformers)
      codeNode = transformer?.code?.call(context, codeNode) || codeNode;
    preNode.children.push(codeNode);
    for (const transformer of transformers)
      preNode = transformer?.pre?.call(context, preNode) || preNode;
    root2.children.push(preNode);
  } else if (structure === "inline") {
    const syntheticLines = [];
    let currentLine = {
      type: "element",
      tagName: "span",
      properties: { class: "line" },
      children: []
    };
    for (const child of root2.children) {
      if (child.type === "element" && child.tagName === "br") {
        syntheticLines.push(currentLine);
        currentLine = {
          type: "element",
          tagName: "span",
          properties: { class: "line" },
          children: []
        };
      } else if (child.type === "element" || child.type === "text") {
        currentLine.children.push(child);
      }
    }
    syntheticLines.push(currentLine);
    const syntheticCode = {
      type: "element",
      tagName: "code",
      properties: {},
      children: syntheticLines
    };
    let transformedCode = syntheticCode;
    for (const transformer of transformers)
      transformedCode = transformer?.code?.call(context, transformedCode) || transformedCode;
    root2.children = [];
    for (let i2 = 0; i2 < transformedCode.children.length; i2++) {
      if (i2 > 0)
        root2.children.push({ type: "element", tagName: "br", properties: {}, children: [] });
      const line = transformedCode.children[i2];
      if (line.type === "element")
        root2.children.push(...line.children);
    }
  }
  let result = root2;
  for (const transformer of transformers)
    result = transformer?.root?.call(context, result) || result;
  if (grammarState)
    setLastGrammarStateToMap(result, grammarState);
  return result;
}
function mergeWhitespaceTokens(tokens) {
  return tokens.map((line) => {
    const newLine = [];
    let carryOnContent = "";
    let firstOffset;
    line.forEach((token2, idx) => {
      const isDecorated = token2.fontStyle && (token2.fontStyle & FontStyle.Underline || token2.fontStyle & FontStyle.Strikethrough);
      const couldMerge = !isDecorated;
      if (couldMerge && token2.content.match(/^\s+$/) && line[idx + 1]) {
        if (firstOffset === void 0)
          firstOffset = token2.offset;
        carryOnContent += token2.content;
      } else {
        if (carryOnContent) {
          if (couldMerge) {
            newLine.push({
              ...token2,
              offset: firstOffset,
              content: carryOnContent + token2.content
            });
          } else {
            newLine.push(
              {
                content: carryOnContent,
                offset: firstOffset
              },
              token2
            );
          }
          firstOffset = void 0;
          carryOnContent = "";
        } else {
          newLine.push(token2);
        }
      }
    });
    return newLine;
  });
}
function splitWhitespaceTokens(tokens) {
  return tokens.map((line) => {
    return line.flatMap((token2) => {
      if (token2.content.match(/^\s+$/))
        return token2;
      const match = token2.content.match(/^(\s*)(.*?)(\s*)$/);
      if (!match)
        return token2;
      const [, leading, content, trailing] = match;
      if (!leading && !trailing)
        return token2;
      const expanded = [{
        ...token2,
        offset: token2.offset + leading.length,
        content
      }];
      if (leading) {
        expanded.unshift({
          content: leading,
          offset: token2.offset
        });
      }
      if (trailing) {
        expanded.push({
          content: trailing,
          offset: token2.offset + leading.length + content.length
        });
      }
      return expanded;
    });
  });
}
function mergeAdjacentStyledTokens(tokens) {
  return tokens.map((line) => {
    const newLine = [];
    for (const token2 of line) {
      if (newLine.length === 0) {
        newLine.push({ ...token2 });
        continue;
      }
      const prevToken = newLine[newLine.length - 1];
      const prevStyle = stringifyTokenStyle(prevToken.htmlStyle || getTokenStyleObject(prevToken));
      const currentStyle = stringifyTokenStyle(token2.htmlStyle || getTokenStyleObject(token2));
      const isPrevDecorated = prevToken.fontStyle && (prevToken.fontStyle & FontStyle.Underline || prevToken.fontStyle & FontStyle.Strikethrough);
      const isDecorated = token2.fontStyle && (token2.fontStyle & FontStyle.Underline || token2.fontStyle & FontStyle.Strikethrough);
      if (!isPrevDecorated && !isDecorated && prevStyle === currentStyle) {
        prevToken.content += token2.content;
      } else {
        newLine.push({ ...token2 });
      }
    }
    return newLine;
  });
}
const hastToHtml = toHtml;
function codeToHtml(internal, code, options) {
  const context = {
    meta: {},
    options,
    codeToHast: (_code, _options) => codeToHast(internal, _code, _options),
    codeToTokens: (_code, _options) => codeToTokens(internal, _code, _options)
  };
  let result = hastToHtml(codeToHast(internal, code, options, context));
  for (const transformer of getTransformers(options))
    result = transformer.postprocess?.call(context, result, options) || result;
  return result;
}
const VSCODE_FALLBACK_EDITOR_FG = { light: "#333333", dark: "#bbbbbb" };
const VSCODE_FALLBACK_EDITOR_BG = { light: "#fffffe", dark: "#1e1e1e" };
const RESOLVED_KEY = "__shiki_resolved";
function normalizeTheme(rawTheme) {
  if (rawTheme?.[RESOLVED_KEY])
    return rawTheme;
  const theme = {
    ...rawTheme
  };
  if (theme.tokenColors && !theme.settings) {
    theme.settings = theme.tokenColors;
    delete theme.tokenColors;
  }
  theme.type ||= "dark";
  theme.colorReplacements = { ...theme.colorReplacements };
  theme.settings ||= [];
  let { bg, fg } = theme;
  if (!bg || !fg) {
    const globalSetting = theme.settings ? theme.settings.find((s2) => !s2.name && !s2.scope) : void 0;
    if (globalSetting?.settings?.foreground)
      fg = globalSetting.settings.foreground;
    if (globalSetting?.settings?.background)
      bg = globalSetting.settings.background;
    if (!fg && theme?.colors?.["editor.foreground"])
      fg = theme.colors["editor.foreground"];
    if (!bg && theme?.colors?.["editor.background"])
      bg = theme.colors["editor.background"];
    if (!fg)
      fg = theme.type === "light" ? VSCODE_FALLBACK_EDITOR_FG.light : VSCODE_FALLBACK_EDITOR_FG.dark;
    if (!bg)
      bg = theme.type === "light" ? VSCODE_FALLBACK_EDITOR_BG.light : VSCODE_FALLBACK_EDITOR_BG.dark;
    theme.fg = fg;
    theme.bg = bg;
  }
  if (!(theme.settings[0] && theme.settings[0].settings && !theme.settings[0].scope)) {
    theme.settings.unshift({
      settings: {
        foreground: theme.fg,
        background: theme.bg
      }
    });
  }
  let replacementCount = 0;
  const replacementMap = /* @__PURE__ */ new Map();
  function getReplacementColor(value) {
    if (replacementMap.has(value))
      return replacementMap.get(value);
    replacementCount += 1;
    const hex = `#${replacementCount.toString(16).padStart(8, "0").toLowerCase()}`;
    if (theme.colorReplacements?.[`#${hex}`])
      return getReplacementColor(value);
    replacementMap.set(value, hex);
    return hex;
  }
  theme.settings = theme.settings.map((setting) => {
    const replaceFg = setting.settings?.foreground && !setting.settings.foreground.startsWith("#");
    const replaceBg = setting.settings?.background && !setting.settings.background.startsWith("#");
    if (!replaceFg && !replaceBg)
      return setting;
    const clone2 = {
      ...setting,
      settings: {
        ...setting.settings
      }
    };
    if (replaceFg) {
      const replacement = getReplacementColor(setting.settings.foreground);
      theme.colorReplacements[replacement] = setting.settings.foreground;
      clone2.settings.foreground = replacement;
    }
    if (replaceBg) {
      const replacement = getReplacementColor(setting.settings.background);
      theme.colorReplacements[replacement] = setting.settings.background;
      clone2.settings.background = replacement;
    }
    return clone2;
  });
  for (const key2 of Object.keys(theme.colors || {})) {
    if (key2 === "editor.foreground" || key2 === "editor.background" || key2.startsWith("terminal.ansi")) {
      if (!theme.colors[key2]?.startsWith("#")) {
        const replacement = getReplacementColor(theme.colors[key2]);
        theme.colorReplacements[replacement] = theme.colors[key2];
        theme.colors[key2] = replacement;
      }
    }
  }
  Object.defineProperty(theme, RESOLVED_KEY, {
    enumerable: false,
    writable: false,
    value: true
  });
  return theme;
}
async function resolveLangs(langs) {
  return Array.from(new Set((await Promise.all(
    langs.filter((l2) => !isSpecialLang(l2)).map(async (lang) => await normalizeGetter(lang).then((r2) => Array.isArray(r2) ? r2 : [r2]))
  )).flat()));
}
async function resolveThemes(themes) {
  const resolved = await Promise.all(
    themes.map(
      async (theme) => isSpecialTheme(theme) ? null : normalizeTheme(await normalizeGetter(theme))
    )
  );
  return resolved.filter((i2) => !!i2);
}
let _emitDeprecation = 3;
function warnDeprecated(message, version = 3) {
  if (version > _emitDeprecation)
    return;
  {
    console.trace(`[SHIKI DEPRECATE]: ${message}`);
  }
}
let ShikiError$1 = class ShikiError2 extends Error {
  constructor(message) {
    super(message);
    this.name = "ShikiError";
  }
};
function resolveLangAlias(name, alias) {
  if (!alias)
    return name;
  if (alias[name]) {
    const resolved = /* @__PURE__ */ new Set([name]);
    while (alias[name]) {
      name = alias[name];
      if (resolved.has(name))
        throw new ShikiError$1(`Circular alias \`${Array.from(resolved).join(" -> ")} -> ${name}\``);
      resolved.add(name);
    }
  }
  return name;
}
class Registry2 extends Registry$1 {
  constructor(_resolver, _themes, _langs, _alias = {}) {
    super(_resolver);
    this._resolver = _resolver;
    this._themes = _themes;
    this._langs = _langs;
    this._alias = _alias;
    this._themes.map((t) => this.loadTheme(t));
    this.loadLanguages(this._langs);
  }
  _resolvedThemes = /* @__PURE__ */ new Map();
  _resolvedGrammars = /* @__PURE__ */ new Map();
  _langMap = /* @__PURE__ */ new Map();
  _langGraph = /* @__PURE__ */ new Map();
  _textmateThemeCache = /* @__PURE__ */ new WeakMap();
  _loadedThemesCache = null;
  _loadedLanguagesCache = null;
  getTheme(theme) {
    if (typeof theme === "string")
      return this._resolvedThemes.get(theme);
    else
      return this.loadTheme(theme);
  }
  loadTheme(theme) {
    const _theme = normalizeTheme(theme);
    if (_theme.name) {
      this._resolvedThemes.set(_theme.name, _theme);
      this._loadedThemesCache = null;
    }
    return _theme;
  }
  getLoadedThemes() {
    if (!this._loadedThemesCache)
      this._loadedThemesCache = [...this._resolvedThemes.keys()];
    return this._loadedThemesCache;
  }
  // Override and re-implement this method to cache the textmate themes as `TextMateTheme.createFromRawTheme`
  // is expensive. Themes can switch often especially for dual-theme support.
  //
  // The parent class also accepts `colorMap` as the second parameter, but since we don't use that,
  // we omit here so it's easier to cache the themes.
  setTheme(theme) {
    let textmateTheme = this._textmateThemeCache.get(theme);
    if (!textmateTheme) {
      textmateTheme = Theme.createFromRawTheme(theme);
      this._textmateThemeCache.set(theme, textmateTheme);
    }
    this._syncRegistry.setTheme(textmateTheme);
  }
  getGrammar(name) {
    name = resolveLangAlias(name, this._alias);
    return this._resolvedGrammars.get(name);
  }
  loadLanguage(lang) {
    if (this.getGrammar(lang.name))
      return;
    const embeddedLazilyBy = new Set(
      [...this._langMap.values()].filter((i2) => i2.embeddedLangsLazy?.includes(lang.name))
    );
    this._resolver.addLanguage(lang);
    const grammarConfig = {
      balancedBracketSelectors: lang.balancedBracketSelectors || ["*"],
      unbalancedBracketSelectors: lang.unbalancedBracketSelectors || []
    };
    this._syncRegistry._rawGrammars.set(lang.scopeName, lang);
    const g = this.loadGrammarWithConfiguration(lang.scopeName, 1, grammarConfig);
    g.name = lang.name;
    this._resolvedGrammars.set(lang.name, g);
    if (lang.aliases) {
      lang.aliases.forEach((alias) => {
        this._alias[alias] = lang.name;
      });
    }
    this._loadedLanguagesCache = null;
    if (embeddedLazilyBy.size) {
      for (const e of embeddedLazilyBy) {
        this._resolvedGrammars.delete(e.name);
        this._loadedLanguagesCache = null;
        this._syncRegistry?._injectionGrammars?.delete(e.scopeName);
        this._syncRegistry?._grammars?.delete(e.scopeName);
        this.loadLanguage(this._langMap.get(e.name));
      }
    }
  }
  dispose() {
    super.dispose();
    this._resolvedThemes.clear();
    this._resolvedGrammars.clear();
    this._langMap.clear();
    this._langGraph.clear();
    this._loadedThemesCache = null;
  }
  loadLanguages(langs) {
    for (const lang of langs)
      this.resolveEmbeddedLanguages(lang);
    const langsGraphArray = Array.from(this._langGraph.entries());
    const missingLangs = langsGraphArray.filter(([_2, lang]) => !lang);
    if (missingLangs.length) {
      const dependents = langsGraphArray.filter(([_2, lang]) => {
        if (!lang)
          return false;
        const embedded = lang.embeddedLanguages || lang.embeddedLangs;
        return embedded?.some((l2) => missingLangs.map(([name]) => name).includes(l2));
      }).filter((lang) => !missingLangs.includes(lang));
      throw new ShikiError$1(`Missing languages ${missingLangs.map(([name]) => `\`${name}\``).join(", ")}, required by ${dependents.map(([name]) => `\`${name}\``).join(", ")}`);
    }
    for (const [_2, lang] of langsGraphArray)
      this._resolver.addLanguage(lang);
    for (const [_2, lang] of langsGraphArray)
      this.loadLanguage(lang);
  }
  getLoadedLanguages() {
    if (!this._loadedLanguagesCache) {
      this._loadedLanguagesCache = [
        .../* @__PURE__ */ new Set([...this._resolvedGrammars.keys(), ...Object.keys(this._alias)])
      ];
    }
    return this._loadedLanguagesCache;
  }
  resolveEmbeddedLanguages(lang) {
    this._langMap.set(lang.name, lang);
    this._langGraph.set(lang.name, lang);
    const embedded = lang.embeddedLanguages ?? lang.embeddedLangs;
    if (embedded) {
      for (const embeddedLang of embedded)
        this._langGraph.set(embeddedLang, this._langMap.get(embeddedLang));
    }
  }
}
class Resolver {
  _langs = /* @__PURE__ */ new Map();
  _scopeToLang = /* @__PURE__ */ new Map();
  _injections = /* @__PURE__ */ new Map();
  _onigLib;
  constructor(engine, langs) {
    this._onigLib = {
      createOnigScanner: (patterns) => engine.createScanner(patterns),
      createOnigString: (s2) => engine.createString(s2)
    };
    langs.forEach((i2) => this.addLanguage(i2));
  }
  get onigLib() {
    return this._onigLib;
  }
  getLangRegistration(langIdOrAlias) {
    return this._langs.get(langIdOrAlias);
  }
  loadGrammar(scopeName) {
    return this._scopeToLang.get(scopeName);
  }
  addLanguage(l2) {
    this._langs.set(l2.name, l2);
    if (l2.aliases) {
      l2.aliases.forEach((a) => {
        this._langs.set(a, l2);
      });
    }
    this._scopeToLang.set(l2.scopeName, l2);
    if (l2.injectTo) {
      l2.injectTo.forEach((i2) => {
        if (!this._injections.get(i2))
          this._injections.set(i2, []);
        this._injections.get(i2).push(l2.scopeName);
      });
    }
  }
  getInjections(scopeName) {
    const scopeParts = scopeName.split(".");
    let injections = [];
    for (let i2 = 1; i2 <= scopeParts.length; i2++) {
      const subScopeName = scopeParts.slice(0, i2).join(".");
      injections = [...injections, ...this._injections.get(subScopeName) || []];
    }
    return injections;
  }
}
let instancesCount = 0;
function createShikiInternalSync(options) {
  instancesCount += 1;
  if (options.warnings !== false && instancesCount >= 10 && instancesCount % 10 === 0)
    console.warn(`[Shiki] ${instancesCount} instances have been created. Shiki is supposed to be used as a singleton, consider refactoring your code to cache your highlighter instance; Or call \`highlighter.dispose()\` to release unused instances.`);
  let isDisposed = false;
  if (!options.engine)
    throw new ShikiError$1("`engine` option is required for synchronous mode");
  const langs = (options.langs || []).flat(1);
  const themes = (options.themes || []).flat(1).map(normalizeTheme);
  const resolver = new Resolver(options.engine, langs);
  const _registry = new Registry2(resolver, themes, langs, options.langAlias);
  let _lastTheme;
  function resolveLangAlias$1(name) {
    return resolveLangAlias(name, options.langAlias);
  }
  function getLanguage(name) {
    ensureNotDisposed();
    const _lang = _registry.getGrammar(typeof name === "string" ? name : name.name);
    if (!_lang)
      throw new ShikiError$1(`Language \`${name}\` not found, you may need to load it first`);
    return _lang;
  }
  function getTheme(name) {
    if (name === "none")
      return { bg: "", fg: "", name: "none", settings: [], type: "dark" };
    ensureNotDisposed();
    const _theme = _registry.getTheme(name);
    if (!_theme)
      throw new ShikiError$1(`Theme \`${name}\` not found, you may need to load it first`);
    return _theme;
  }
  function setTheme(name) {
    ensureNotDisposed();
    const theme = getTheme(name);
    if (_lastTheme !== name) {
      _registry.setTheme(theme);
      _lastTheme = name;
    }
    const colorMap = _registry.getColorMap();
    return {
      theme,
      colorMap
    };
  }
  function getLoadedThemes() {
    ensureNotDisposed();
    return _registry.getLoadedThemes();
  }
  function getLoadedLanguages() {
    ensureNotDisposed();
    return _registry.getLoadedLanguages();
  }
  function loadLanguageSync(...langs2) {
    ensureNotDisposed();
    _registry.loadLanguages(langs2.flat(1));
  }
  async function loadLanguage(...langs2) {
    return loadLanguageSync(await resolveLangs(langs2));
  }
  function loadThemeSync(...themes2) {
    ensureNotDisposed();
    for (const theme of themes2.flat(1)) {
      _registry.loadTheme(theme);
    }
  }
  async function loadTheme(...themes2) {
    ensureNotDisposed();
    return loadThemeSync(await resolveThemes(themes2));
  }
  function ensureNotDisposed() {
    if (isDisposed)
      throw new ShikiError$1("Shiki instance has been disposed");
  }
  function dispose() {
    if (isDisposed)
      return;
    isDisposed = true;
    _registry.dispose();
    instancesCount -= 1;
  }
  return {
    setTheme,
    getTheme,
    getLanguage,
    getLoadedThemes,
    getLoadedLanguages,
    resolveLangAlias: resolveLangAlias$1,
    loadLanguage,
    loadLanguageSync,
    loadTheme,
    loadThemeSync,
    dispose,
    [Symbol.dispose]: dispose
  };
}
async function createShikiInternal(options) {
  if (!options.engine) {
    warnDeprecated("`engine` option is required. Use `createOnigurumaEngine` or `createJavaScriptRegexEngine` to create an engine.");
  }
  const [
    themes,
    langs,
    engine
  ] = await Promise.all([
    resolveThemes(options.themes || []),
    resolveLangs(options.langs || []),
    options.engine
  ]);
  return createShikiInternalSync({
    ...options,
    themes,
    langs,
    engine
  });
}
async function createHighlighterCore(options) {
  const internal = await createShikiInternal(options);
  return {
    getLastGrammarState: (...args) => getLastGrammarState(internal, ...args),
    codeToTokensBase: (code, options2) => codeToTokensBase(internal, code, options2),
    codeToTokensWithThemes: (code, options2) => codeToTokensWithThemes(internal, code, options2),
    codeToTokens: (code, options2) => codeToTokens(internal, code, options2),
    codeToHast: (code, options2) => codeToHast(internal, code, options2),
    codeToHtml: (code, options2) => codeToHtml(internal, code, options2),
    getBundledLanguages: () => ({}),
    getBundledThemes: () => ({}),
    ...internal,
    getInternalContext: () => internal
  };
}
function createBundledHighlighter(options) {
  const bundledLanguages2 = options.langs;
  const bundledThemes2 = options.themes;
  const engine = options.engine;
  async function createHighlighter2(options2) {
    function resolveLang(lang) {
      if (typeof lang === "string") {
        lang = options2.langAlias?.[lang] || lang;
        if (isSpecialLang(lang))
          return [];
        const bundle = bundledLanguages2[lang];
        if (!bundle)
          throw new ShikiError$2(`Language \`${lang}\` is not included in this bundle. You may want to load it from external source.`);
        return bundle;
      }
      return lang;
    }
    function resolveTheme2(theme) {
      if (isSpecialTheme(theme))
        return "none";
      if (typeof theme === "string") {
        const bundle = bundledThemes2[theme];
        if (!bundle)
          throw new ShikiError$2(`Theme \`${theme}\` is not included in this bundle. You may want to load it from external source.`);
        return bundle;
      }
      return theme;
    }
    const _themes = (options2.themes ?? []).map((i2) => resolveTheme2(i2));
    const langs = (options2.langs ?? []).map((i2) => resolveLang(i2));
    const core2 = await createHighlighterCore({
      engine: options2.engine ?? engine(),
      ...options2,
      themes: _themes,
      langs
    });
    return {
      ...core2,
      loadLanguage(...langs2) {
        return core2.loadLanguage(...langs2.map(resolveLang));
      },
      loadTheme(...themes) {
        return core2.loadTheme(...themes.map(resolveTheme2));
      },
      getBundledLanguages() {
        return bundledLanguages2;
      },
      getBundledThemes() {
        return bundledThemes2;
      }
    };
  }
  return createHighlighter2;
}
const bundledLanguagesInfo = [
  {
    "id": "abap",
    "name": "ABAP",
    "import": (() => __vitePreload(() => import("./abap-B7h4dtBh.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "actionscript-3",
    "name": "ActionScript",
    "import": (() => __vitePreload(() => import("./actionscript-3-DtnkuHN2.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "ada",
    "name": "Ada",
    "import": (() => __vitePreload(() => import("./ada-BZS802Se.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "angular-html",
    "name": "Angular HTML",
    "import": (() => __vitePreload(() => import("./angular-html-Ca5ixmHM.js").then((n) => n.a), true ? __vite__mapDeps([0,1,2,3]) : void 0, import.meta.url))
  },
  {
    "id": "angular-ts",
    "name": "Angular TypeScript",
    "import": (() => __vitePreload(() => import("./angular-ts-BppQq056.js"), true ? __vite__mapDeps([4,0,1,2,3,5]) : void 0, import.meta.url))
  },
  {
    "id": "apache",
    "name": "Apache Conf",
    "import": (() => __vitePreload(() => import("./apache-D4roVlsU.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "apex",
    "name": "Apex",
    "import": (() => __vitePreload(() => import("./apex-B-mI3Md2.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "apl",
    "name": "APL",
    "import": (() => __vitePreload(() => import("./apl-CGZawg-A.js"), true ? __vite__mapDeps([6,1,2,3,7,8,9]) : void 0, import.meta.url))
  },
  {
    "id": "applescript",
    "name": "AppleScript",
    "import": (() => __vitePreload(() => import("./applescript-C43Knf0G.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "ara",
    "name": "Ara",
    "import": (() => __vitePreload(() => import("./ara-DRBH84ND.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "asciidoc",
    "name": "AsciiDoc",
    "aliases": [
      "adoc"
    ],
    "import": (() => __vitePreload(() => import("./asciidoc-CT8_dLUs.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "asm",
    "name": "Assembly",
    "import": (() => __vitePreload(() => import("./asm-3tg4MVib.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "astro",
    "name": "Astro",
    "import": (() => __vitePreload(() => import("./astro-BxdWOZvM.js"), true ? __vite__mapDeps([10,9,2,11,3,12,13]) : void 0, import.meta.url))
  },
  {
    "id": "awk",
    "name": "AWK",
    "import": (() => __vitePreload(() => import("./awk-ChreaG-G.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "ballerina",
    "name": "Ballerina",
    "import": (() => __vitePreload(() => import("./ballerina-B0yt0TYU.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "bat",
    "name": "Batch File",
    "aliases": [
      "batch"
    ],
    "import": (() => __vitePreload(() => import("./bat-BzNgQIA7.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "beancount",
    "name": "Beancount",
    "import": (() => __vitePreload(() => import("./beancount-aZWrE5WV.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "berry",
    "name": "Berry",
    "aliases": [
      "be"
    ],
    "import": (() => __vitePreload(() => import("./berry--Qc8OslH.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "bibtex",
    "name": "BibTeX",
    "import": (() => __vitePreload(() => import("./bibtex-BLeFwAes.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "bicep",
    "name": "Bicep",
    "import": (() => __vitePreload(() => import("./bicep-DbBeGdXQ.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "bird2",
    "name": "BIRD2 Configuration",
    "aliases": [
      "bird"
    ],
    "import": (() => __vitePreload(() => import("./bird2-aXhIUHPg.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "blade",
    "name": "Blade",
    "import": (() => __vitePreload(() => import("./blade-BbH7YAUi.js"), true ? __vite__mapDeps([14,15,1,2,3,7,8,16,9]) : void 0, import.meta.url))
  },
  {
    "id": "bsl",
    "name": "1C (Enterprise)",
    "aliases": [
      "1c"
    ],
    "import": (() => __vitePreload(() => import("./bsl-DwPS0BId.js"), true ? __vite__mapDeps([17,18]) : void 0, import.meta.url))
  },
  {
    "id": "c",
    "name": "C",
    "import": (() => __vitePreload(() => import("./c-C4VtT7JA.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "c3",
    "name": "C3",
    "import": (() => __vitePreload(() => import("./c3-CWHczQMq.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "cadence",
    "name": "Cadence",
    "aliases": [
      "cdc"
    ],
    "import": (() => __vitePreload(() => import("./cadence-S_NtR5Dy.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "cairo",
    "name": "Cairo",
    "import": (() => __vitePreload(() => import("./cairo-BtYx2aM5.js"), true ? __vite__mapDeps([19,20]) : void 0, import.meta.url))
  },
  {
    "id": "clarity",
    "name": "Clarity",
    "import": (() => __vitePreload(() => import("./clarity-D2ViJC0i.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "clojure",
    "name": "Clojure",
    "aliases": [
      "clj"
    ],
    "import": (() => __vitePreload(() => import("./clojure-C_G4_w5x.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "cmake",
    "name": "CMake",
    "import": (() => __vitePreload(() => import("./cmake-CDfQILeU.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "cobol",
    "name": "COBOL",
    "import": (() => __vitePreload(() => import("./cobol-B8r1pfPr.js"), true ? __vite__mapDeps([21,1,2,3,8]) : void 0, import.meta.url))
  },
  {
    "id": "codeowners",
    "name": "CODEOWNERS",
    "import": (() => __vitePreload(() => import("./codeowners-awy7PWCD.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "codeql",
    "name": "CodeQL",
    "aliases": [
      "ql"
    ],
    "import": (() => __vitePreload(() => import("./codeql-lfK8ppuq.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "coffee",
    "name": "CoffeeScript",
    "aliases": [
      "coffeescript"
    ],
    "import": (() => __vitePreload(() => import("./coffee-XLjtuEYs.js"), true ? __vite__mapDeps([22,2]) : void 0, import.meta.url))
  },
  {
    "id": "common-lisp",
    "name": "Common Lisp",
    "aliases": [
      "lisp"
    ],
    "import": (() => __vitePreload(() => import("./common-lisp-DAq1kaby.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "coq",
    "name": "Coq",
    "import": (() => __vitePreload(() => import("./coq-l_JvzFJl.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "cpp",
    "name": "C++",
    "aliases": [
      "c++"
    ],
    "import": (() => __vitePreload(() => import("./cpp-zh2ePAE_.js"), true ? __vite__mapDeps([23,24,25,26,16]) : void 0, import.meta.url))
  },
  {
    "id": "crystal",
    "name": "Crystal",
    "import": (() => __vitePreload(() => import("./crystal-BqBRy7Ec.js"), true ? __vite__mapDeps([27,1,2,3,16,26,28]) : void 0, import.meta.url))
  },
  {
    "id": "csharp",
    "name": "C#",
    "aliases": [
      "c#",
      "cs"
    ],
    "import": (() => __vitePreload(() => import("./csharp-DxX_6tHh.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "css",
    "name": "CSS",
    "import": (() => __vitePreload(() => import("./css-BtVcDqlU.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "csv",
    "name": "CSV",
    "import": (() => __vitePreload(() => import("./csv-Ba84L8e5.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "cue",
    "name": "CUE",
    "import": (() => __vitePreload(() => import("./cue-BFSVLV6N.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "cypher",
    "name": "Cypher",
    "aliases": [
      "cql"
    ],
    "import": (() => __vitePreload(() => import("./cypher-DbUmWIxC.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "d",
    "name": "D",
    "import": (() => __vitePreload(() => import("./d-9qSZPw74.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "dart",
    "name": "Dart",
    "import": (() => __vitePreload(() => import("./dart-CCSsOg9l.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "dax",
    "name": "DAX",
    "import": (() => __vitePreload(() => import("./dax-CvsmLV-B.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "desktop",
    "name": "Desktop",
    "import": (() => __vitePreload(() => import("./desktop-_xiGZ9X1.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "diff",
    "name": "Diff",
    "import": (() => __vitePreload(() => import("./diff-BEdzuHlE.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "docker",
    "name": "Dockerfile",
    "aliases": [
      "dockerfile"
    ],
    "import": (() => __vitePreload(() => import("./docker-CUaLOm2I.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "dotenv",
    "name": "dotEnv",
    "import": (() => __vitePreload(() => import("./dotenv-Bb4iNxXK.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "dream-maker",
    "name": "Dream Maker",
    "import": (() => __vitePreload(() => import("./dream-maker-CNLQpoF-.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "edge",
    "name": "Edge",
    "import": (() => __vitePreload(() => import("./edge-CnHxQ_FD.js"), true ? __vite__mapDeps([29,11,1,2,3,15]) : void 0, import.meta.url))
  },
  {
    "id": "elixir",
    "name": "Elixir",
    "import": (() => __vitePreload(() => import("./elixir-B_LIBv5J.js"), true ? __vite__mapDeps([30,1,2,3]) : void 0, import.meta.url))
  },
  {
    "id": "elm",
    "name": "Elm",
    "import": (() => __vitePreload(() => import("./elm-BlO7pcFp.js"), true ? __vite__mapDeps([31,25,26]) : void 0, import.meta.url))
  },
  {
    "id": "emacs-lisp",
    "name": "Emacs Lisp",
    "aliases": [
      "elisp"
    ],
    "import": (() => __vitePreload(() => import("./emacs-lisp-4gdXY_g3.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "erb",
    "name": "ERB",
    "import": (() => __vitePreload(() => import("./erb-Bzn22wO6.js"), true ? __vite__mapDeps([32,1,2,3,33,34,7,8,16,35,11,36,13,23,24,25,26,28,37,38]) : void 0, import.meta.url))
  },
  {
    "id": "erlang",
    "name": "Erlang",
    "aliases": [
      "erl"
    ],
    "import": (() => __vitePreload(() => import("./erlang-Ch5kuXHm.js"), true ? __vite__mapDeps([39,40]) : void 0, import.meta.url))
  },
  {
    "id": "fennel",
    "name": "Fennel",
    "import": (() => __vitePreload(() => import("./fennel-BTELNkeT.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "fish",
    "name": "Fish",
    "import": (() => __vitePreload(() => import("./fish-kGF2-4SL.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "fluent",
    "name": "Fluent",
    "aliases": [
      "ftl"
    ],
    "import": (() => __vitePreload(() => import("./fluent-YyC28MRr.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "fortran-fixed-form",
    "name": "Fortran (Fixed Form)",
    "aliases": [
      "f",
      "for",
      "f77"
    ],
    "import": (() => __vitePreload(() => import("./fortran-fixed-form-CpmOyvS5.js"), true ? __vite__mapDeps([41,42]) : void 0, import.meta.url))
  },
  {
    "id": "fortran-free-form",
    "name": "Fortran (Free Form)",
    "aliases": [
      "f90",
      "f95",
      "f03",
      "f08",
      "f18"
    ],
    "import": (() => __vitePreload(() => import("./fortran-free-form-5X94ETMi.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "fsharp",
    "name": "F#",
    "aliases": [
      "f#",
      "fs"
    ],
    "import": (() => __vitePreload(() => import("./fsharp-5vtGqRR9.js"), true ? __vite__mapDeps([43,40]) : void 0, import.meta.url))
  },
  {
    "id": "gdresource",
    "name": "GDResource",
    "aliases": [
      "tscn",
      "tres"
    ],
    "import": (() => __vitePreload(() => import("./gdresource-B5TLWiFO.js"), true ? __vite__mapDeps([44,45,46]) : void 0, import.meta.url))
  },
  {
    "id": "gdscript",
    "name": "GDScript",
    "aliases": [
      "gd"
    ],
    "import": (() => __vitePreload(() => import("./gdscript-CNW3Aj-d.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "gdshader",
    "name": "GDShader",
    "import": (() => __vitePreload(() => import("./gdshader-BEzE4j_3.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "genie",
    "name": "Genie",
    "import": (() => __vitePreload(() => import("./genie-BvhtM5Ga.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "gherkin",
    "name": "Gherkin",
    "import": (() => __vitePreload(() => import("./gherkin-xCNF9gh8.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "git-commit",
    "name": "Git Commit Message",
    "import": (() => __vitePreload(() => import("./git-commit-PP9xCApN.js"), true ? __vite__mapDeps([47,48]) : void 0, import.meta.url))
  },
  {
    "id": "git-rebase",
    "name": "Git Rebase Message",
    "import": (() => __vitePreload(() => import("./git-rebase-D-XQSvDj.js"), true ? __vite__mapDeps([49,28]) : void 0, import.meta.url))
  },
  {
    "id": "gleam",
    "name": "Gleam",
    "import": (() => __vitePreload(() => import("./gleam-LmNxrMsN.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "glimmer-js",
    "name": "Glimmer JS",
    "aliases": [
      "gjs"
    ],
    "import": (() => __vitePreload(() => import("./glimmer-js-h2QNNiD7.js"), true ? __vite__mapDeps([50,2,11,3,1]) : void 0, import.meta.url))
  },
  {
    "id": "glimmer-ts",
    "name": "Glimmer TS",
    "aliases": [
      "gts"
    ],
    "import": (() => __vitePreload(() => import("./glimmer-ts-Bk3uX6Ae.js"), true ? __vite__mapDeps([51,11,3,2,1]) : void 0, import.meta.url))
  },
  {
    "id": "glsl",
    "name": "GLSL",
    "import": (() => __vitePreload(() => import("./glsl-CGsiYPcu.js"), true ? __vite__mapDeps([25,26]) : void 0, import.meta.url))
  },
  {
    "id": "gn",
    "name": "GN",
    "import": (() => __vitePreload(() => import("./gn-OUMx7fqt.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "gnuplot",
    "name": "Gnuplot",
    "import": (() => __vitePreload(() => import("./gnuplot-tV8vezdE.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "go",
    "name": "Go",
    "import": (() => __vitePreload(() => import("./go-DRMr3iML.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "graphql",
    "name": "GraphQL",
    "aliases": [
      "gql"
    ],
    "import": (() => __vitePreload(() => import("./graphql-CwmtR1ib.js"), true ? __vite__mapDeps([35,2,11,36,13]) : void 0, import.meta.url))
  },
  {
    "id": "groovy",
    "name": "Groovy",
    "import": (() => __vitePreload(() => import("./groovy-Bn4MhXgW.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "hack",
    "name": "Hack",
    "import": (() => __vitePreload(() => import("./hack-BTX3ICIE.js"), true ? __vite__mapDeps([52,1,2,3,16]) : void 0, import.meta.url))
  },
  {
    "id": "haml",
    "name": "Ruby Haml",
    "import": (() => __vitePreload(() => import("./haml-DrIklt7F.js"), true ? __vite__mapDeps([34,2,3]) : void 0, import.meta.url))
  },
  {
    "id": "handlebars",
    "name": "Handlebars",
    "aliases": [
      "hbs"
    ],
    "import": (() => __vitePreload(() => import("./handlebars-yWFGGD2R.js"), true ? __vite__mapDeps([53,1,2,3,38]) : void 0, import.meta.url))
  },
  {
    "id": "haskell",
    "name": "Haskell",
    "aliases": [
      "hs"
    ],
    "import": (() => __vitePreload(() => import("./haskell-CzPS7wjM.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "haxe",
    "name": "Haxe",
    "import": (() => __vitePreload(() => import("./haxe-BpobLYM9.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "hcl",
    "name": "HashiCorp HCL",
    "import": (() => __vitePreload(() => import("./hcl-axoq0Ycu.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "hjson",
    "name": "Hjson",
    "import": (() => __vitePreload(() => import("./hjson-I7LcauIB.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "hlsl",
    "name": "HLSL",
    "import": (() => __vitePreload(() => import("./hlsl-TRzjajlb.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "html",
    "name": "HTML",
    "import": (() => __vitePreload(() => import("./html-GC16tDh9.js"), true ? __vite__mapDeps([1,2,3]) : void 0, import.meta.url))
  },
  {
    "id": "html-derivative",
    "name": "HTML (Derivative)",
    "import": (() => __vitePreload(() => import("./html-derivative-HU9p64q4.js"), true ? __vite__mapDeps([15,1,2,3]) : void 0, import.meta.url))
  },
  {
    "id": "http",
    "name": "HTTP",
    "import": (() => __vitePreload(() => import("./http-DjsOm9E4.js"), true ? __vite__mapDeps([54,28,9,7,8,35,2,11,36,13]) : void 0, import.meta.url))
  },
  {
    "id": "hurl",
    "name": "Hurl",
    "import": (() => __vitePreload(() => import("./hurl-Am2cDU4f.js"), true ? __vite__mapDeps([55,35,2,11,36,13,7,8,56]) : void 0, import.meta.url))
  },
  {
    "id": "hxml",
    "name": "HXML",
    "import": (() => __vitePreload(() => import("./hxml-Jle7oGdm.js"), true ? __vite__mapDeps([57,58]) : void 0, import.meta.url))
  },
  {
    "id": "hy",
    "name": "Hy",
    "import": (() => __vitePreload(() => import("./hy-B1k9U6S8.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "imba",
    "name": "Imba",
    "import": (() => __vitePreload(() => import("./imba-C4923lSV.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "ini",
    "name": "INI",
    "aliases": [
      "properties"
    ],
    "import": (() => __vitePreload(() => import("./ini-B84Ha1bx.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "java",
    "name": "Java",
    "import": (() => __vitePreload(() => import("./java-BfXh-0uJ.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "javascript",
    "name": "JavaScript",
    "aliases": [
      "js",
      "cjs",
      "mjs"
    ],
    "import": (() => __vitePreload(() => import("./javascript-BsAkV7mL.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "jinja",
    "name": "Jinja",
    "import": (() => __vitePreload(() => import("./jinja-FkIlHBgj.js"), true ? __vite__mapDeps([59,1,2,3]) : void 0, import.meta.url))
  },
  {
    "id": "jison",
    "name": "Jison",
    "import": (() => __vitePreload(() => import("./jison-BkdOIOd4.js"), true ? __vite__mapDeps([60,2]) : void 0, import.meta.url))
  },
  {
    "id": "json",
    "name": "JSON",
    "import": (() => __vitePreload(() => import("./json-TjWBGEk1.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "json5",
    "name": "JSON5",
    "import": (() => __vitePreload(() => import("./json5-DCGCKrmX.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "jsonc",
    "name": "JSON with Comments",
    "import": (() => __vitePreload(() => import("./jsonc-DLVLp8id.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "jsonl",
    "name": "JSON Lines",
    "import": (() => __vitePreload(() => import("./jsonl-B-R_pDGg.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "jsonnet",
    "name": "Jsonnet",
    "import": (() => __vitePreload(() => import("./jsonnet-Cs8BnnC6.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "jssm",
    "name": "JSSM",
    "aliases": [
      "fsl"
    ],
    "import": (() => __vitePreload(() => import("./jssm-DDuANZ2u.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "jsx",
    "name": "JSX",
    "import": (() => __vitePreload(() => import("./jsx-BPmvoin2.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "julia",
    "name": "Julia",
    "aliases": [
      "jl"
    ],
    "import": (() => __vitePreload(() => import("./julia-CU_UwNb8.js"), true ? __vite__mapDeps([61,23,24,25,26,16,20,2,62]) : void 0, import.meta.url))
  },
  {
    "id": "just",
    "name": "Just",
    "import": (() => __vitePreload(() => import("./just-tGFryTtU.js"), true ? __vite__mapDeps([63,28,2,11,64,1,3,7,8,16,20,33,34,35,36,13,23,24,25,26,37,38]) : void 0, import.meta.url))
  },
  {
    "id": "kdl",
    "name": "KDL",
    "import": (() => __vitePreload(() => import("./kdl-DzNQTDs7.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "kotlin",
    "name": "Kotlin",
    "aliases": [
      "kt",
      "kts"
    ],
    "import": (() => __vitePreload(() => import("./kotlin-BM2ZNTMh.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "kusto",
    "name": "Kusto",
    "aliases": [
      "kql"
    ],
    "import": (() => __vitePreload(() => import("./kusto-dtpuxMFE.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "latex",
    "name": "LaTeX",
    "import": (() => __vitePreload(() => import("./latex-B0gTO9uZ.js"), true ? __vite__mapDeps([65,66,62]) : void 0, import.meta.url))
  },
  {
    "id": "lean",
    "name": "Lean 4",
    "aliases": [
      "lean4"
    ],
    "import": (() => __vitePreload(() => import("./lean-CTow-IzD.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "less",
    "name": "Less",
    "import": (() => __vitePreload(() => import("./less-BAzLMJNR.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "liquid",
    "name": "Liquid",
    "import": (() => __vitePreload(() => import("./liquid-QmJ_LYTW.js"), true ? __vite__mapDeps([67,1,2,3,9]) : void 0, import.meta.url))
  },
  {
    "id": "llvm",
    "name": "LLVM IR",
    "import": (() => __vitePreload(() => import("./llvm-CTKcAHbb.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "log",
    "name": "Log file",
    "import": (() => __vitePreload(() => import("./log-BF22rfM9.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "logo",
    "name": "Logo",
    "import": (() => __vitePreload(() => import("./logo-D9l7oEJ8.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "lua",
    "name": "Lua",
    "import": (() => __vitePreload(() => import("./lua-BVbbqwZC.js"), true ? __vite__mapDeps([37,26]) : void 0, import.meta.url))
  },
  {
    "id": "luau",
    "name": "Luau",
    "import": (() => __vitePreload(() => import("./luau-CdZ6BoEa.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "make",
    "name": "Makefile",
    "aliases": [
      "makefile"
    ],
    "import": (() => __vitePreload(() => import("./make-DLtqaK4D.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "markdown",
    "name": "Markdown",
    "aliases": [
      "md"
    ],
    "import": (() => __vitePreload(() => import("./markdown-F_EULe_G.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "marko",
    "name": "Marko",
    "import": (() => __vitePreload(() => import("./marko-BAWrmNIa.js"), true ? __vite__mapDeps([68,3,69,5,11]) : void 0, import.meta.url))
  },
  {
    "id": "matlab",
    "name": "MATLAB",
    "import": (() => __vitePreload(() => import("./matlab-7XHduepk.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "mdc",
    "name": "MDC",
    "import": (() => __vitePreload(() => import("./mdc-Ca0ft0PS.js"), true ? __vite__mapDeps([70,40,38,15,1,2,3]) : void 0, import.meta.url))
  },
  {
    "id": "mdx",
    "name": "MDX",
    "import": (() => __vitePreload(() => import("./mdx-D5wExp-O.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "mermaid",
    "name": "Mermaid",
    "aliases": [
      "mmd"
    ],
    "import": (() => __vitePreload(() => import("./mermaid-z_1ejSlp.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "mipsasm",
    "name": "MIPS Assembly",
    "aliases": [
      "mips"
    ],
    "import": (() => __vitePreload(() => import("./mipsasm-BQyyUrpa.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "mojo",
    "name": "Mojo",
    "import": (() => __vitePreload(() => import("./mojo-ByCRDvCf.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "moonbit",
    "name": "MoonBit",
    "aliases": [
      "mbt",
      "mbti"
    ],
    "import": (() => __vitePreload(() => import("./moonbit-CqjK87KZ.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "move",
    "name": "Move",
    "import": (() => __vitePreload(() => import("./move-DhTNmxqC.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "narrat",
    "name": "Narrat Language",
    "aliases": [
      "nar"
    ],
    "import": (() => __vitePreload(() => import("./narrat-CLjGcbCy.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "nextflow",
    "name": "Nextflow",
    "aliases": [
      "nf"
    ],
    "import": (() => __vitePreload(() => import("./nextflow-B166B-y1.js"), true ? __vite__mapDeps([71,72]) : void 0, import.meta.url))
  },
  {
    "id": "nextflow-groovy",
    "name": "nextflow-groovy",
    "import": (() => __vitePreload(() => import("./nextflow-groovy-BOO9s0iq.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "nginx",
    "name": "Nginx",
    "import": (() => __vitePreload(() => import("./nginx-BFAkI5_-.js"), true ? __vite__mapDeps([73,37,26]) : void 0, import.meta.url))
  },
  {
    "id": "nim",
    "name": "Nim",
    "import": (() => __vitePreload(() => import("./nim-B3PAIZ4D.js"), true ? __vite__mapDeps([74,26,1,2,3,7,8,25,40]) : void 0, import.meta.url))
  },
  {
    "id": "nix",
    "name": "Nix",
    "import": (() => __vitePreload(() => import("./nix-ByWcmvXF.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "nushell",
    "name": "nushell",
    "aliases": [
      "nu"
    ],
    "import": (() => __vitePreload(() => import("./nushell-DB8ZUEbK.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "objective-c",
    "name": "Objective-C",
    "aliases": [
      "objc"
    ],
    "import": (() => __vitePreload(() => import("./objective-c-BRoNQF42.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "objective-cpp",
    "name": "Objective-C++",
    "import": (() => __vitePreload(() => import("./objective-cpp-DEoN9Fe5.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "ocaml",
    "name": "OCaml",
    "import": (() => __vitePreload(() => import("./ocaml-B1kfGk9Y.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "odin",
    "name": "Odin",
    "import": (() => __vitePreload(() => import("./odin-CNQ56Ay2.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "openscad",
    "name": "OpenSCAD",
    "aliases": [
      "scad"
    ],
    "import": (() => __vitePreload(() => import("./openscad-C_m7ehZF.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "pascal",
    "name": "Pascal",
    "import": (() => __vitePreload(() => import("./pascal-CU8Kjkr_.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "perl",
    "name": "Perl",
    "import": (() => __vitePreload(() => import("./perl-HITCDkgu.js"), true ? __vite__mapDeps([64,1,2,3,7,8,16]) : void 0, import.meta.url))
  },
  {
    "id": "php",
    "name": "PHP",
    "import": (() => __vitePreload(() => import("./php-C2HieitX.js"), true ? __vite__mapDeps([75,1,2,3,7,8,16,9]) : void 0, import.meta.url))
  },
  {
    "id": "pkl",
    "name": "Pkl",
    "import": (() => __vitePreload(() => import("./pkl-BsByaYax.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "plsql",
    "name": "PL/SQL",
    "import": (() => __vitePreload(() => import("./plsql-B3Na24V4.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "po",
    "name": "Gettext PO",
    "aliases": [
      "pot",
      "potx"
    ],
    "import": (() => __vitePreload(() => import("./po-BajfNjc5.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "polar",
    "name": "Polar",
    "import": (() => __vitePreload(() => import("./polar-BB-dlxnO.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "postcss",
    "name": "PostCSS",
    "import": (() => __vitePreload(() => import("./postcss-kj1IbjVd.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "powerquery",
    "name": "PowerQuery",
    "import": (() => __vitePreload(() => import("./powerquery-B-e1fO-k.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "powershell",
    "name": "PowerShell",
    "aliases": [
      "ps",
      "ps1"
    ],
    "import": (() => __vitePreload(() => import("./powershell-BcMVbGpk.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "prisma",
    "name": "Prisma",
    "import": (() => __vitePreload(() => import("./prisma-bmxcSDxq.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "prolog",
    "name": "Prolog",
    "import": (() => __vitePreload(() => import("./prolog-BT9GCzqD.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "proto",
    "name": "Protocol Buffer 3",
    "aliases": [
      "protobuf"
    ],
    "import": (() => __vitePreload(() => import("./proto-Ds-m32NR.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "pug",
    "name": "Pug",
    "aliases": [
      "jade"
    ],
    "import": (() => __vitePreload(() => import("./pug-BwQB43qN.js"), true ? __vite__mapDeps([76,2,3,1]) : void 0, import.meta.url))
  },
  {
    "id": "puppet",
    "name": "Puppet",
    "import": (() => __vitePreload(() => import("./puppet-N15G4Usj.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "purescript",
    "name": "PureScript",
    "import": (() => __vitePreload(() => import("./purescript-DrwsEYNH.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "python",
    "name": "Python",
    "aliases": [
      "py"
    ],
    "import": (() => __vitePreload(() => import("./python-CrdIx4PZ.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "qml",
    "name": "QML",
    "import": (() => __vitePreload(() => import("./qml-jtL8okyu.js"), true ? __vite__mapDeps([77,2]) : void 0, import.meta.url))
  },
  {
    "id": "qmldir",
    "name": "QML Directory",
    "import": (() => __vitePreload(() => import("./qmldir-DuMSk0Oz.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "qss",
    "name": "Qt Style Sheets",
    "import": (() => __vitePreload(() => import("./qss-BFrB6p4y.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "r",
    "name": "R",
    "import": (() => __vitePreload(() => import("./r-Dpdc-Kyk.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "racket",
    "name": "Racket",
    "import": (() => __vitePreload(() => import("./racket-DbA06HL7.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "raku",
    "name": "Raku",
    "aliases": [
      "perl6"
    ],
    "import": (() => __vitePreload(() => import("./raku-6v-Y17bs.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "razor",
    "name": "ASP.NET Razor",
    "import": (() => __vitePreload(() => import("./razor-gBXW6YBJ.js"), true ? __vite__mapDeps([78,1,2,3,79]) : void 0, import.meta.url))
  },
  {
    "id": "reg",
    "name": "Windows Registry Script",
    "import": (() => __vitePreload(() => import("./reg-CULnG2WX.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "regexp",
    "name": "RegExp",
    "aliases": [
      "regex"
    ],
    "import": (() => __vitePreload(() => import("./regexp-BxWeO75u.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "rel",
    "name": "Rel",
    "import": (() => __vitePreload(() => import("./rel-CHRwzjd4.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "riscv",
    "name": "RISC-V",
    "import": (() => __vitePreload(() => import("./riscv-BNQ9cVpw.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "ron",
    "name": "RON",
    "import": (() => __vitePreload(() => import("./ron-CUEPaFZU.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "rosmsg",
    "name": "ROS Interface",
    "import": (() => __vitePreload(() => import("./rosmsg-Bfahr6vb.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "rst",
    "name": "reStructuredText",
    "import": (() => __vitePreload(() => import("./rst-by6KAwTb.js"), true ? __vite__mapDeps([80,15,1,2,3,23,24,25,26,16,20,28,38,81,33,34,7,8,35,11,36,13,37]) : void 0, import.meta.url))
  },
  {
    "id": "ruby",
    "name": "Ruby",
    "aliases": [
      "rb"
    ],
    "import": (() => __vitePreload(() => import("./ruby-C13Bjepi.js"), true ? __vite__mapDeps([33,1,2,3,34,7,8,16,35,11,36,13,23,24,25,26,28,37,38]) : void 0, import.meta.url))
  },
  {
    "id": "rust",
    "name": "Rust",
    "aliases": [
      "rs"
    ],
    "import": (() => __vitePreload(() => import("./rust-CMNYZh5a.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "sas",
    "name": "SAS",
    "import": (() => __vitePreload(() => import("./sas-BLBgC3TA.js"), true ? __vite__mapDeps([82,16]) : void 0, import.meta.url))
  },
  {
    "id": "sass",
    "name": "Sass",
    "import": (() => __vitePreload(() => import("./sass-BheygBdF.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "scala",
    "name": "Scala",
    "import": (() => __vitePreload(() => import("./scala-B-_7vFVn.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "scheme",
    "name": "Scheme",
    "import": (() => __vitePreload(() => import("./scheme-BSHdPinv.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "scss",
    "name": "SCSS",
    "import": (() => __vitePreload(() => import("./scss-Dq-LbI_c.js"), true ? __vite__mapDeps([5,3]) : void 0, import.meta.url))
  },
  {
    "id": "sdbl",
    "name": "1C (Query)",
    "aliases": [
      "1c-query"
    ],
    "import": (() => __vitePreload(() => import("./sdbl-BBUhycGU.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "shaderlab",
    "name": "ShaderLab",
    "aliases": [
      "shader"
    ],
    "import": (() => __vitePreload(() => import("./shaderlab-C07uO3dL.js"), true ? __vite__mapDeps([83,84]) : void 0, import.meta.url))
  },
  {
    "id": "shellscript",
    "name": "Shell",
    "aliases": [
      "bash",
      "sh",
      "shell",
      "zsh"
    ],
    "import": (() => __vitePreload(() => import("./shellscript-CQ8MXh-D.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "shellsession",
    "name": "Shell Session",
    "aliases": [
      "console"
    ],
    "import": (() => __vitePreload(() => import("./shellsession-CkeTp4M1.js"), true ? __vite__mapDeps([85,28]) : void 0, import.meta.url))
  },
  {
    "id": "smalltalk",
    "name": "Smalltalk",
    "import": (() => __vitePreload(() => import("./smalltalk-qxcGy4fT.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "solidity",
    "name": "Solidity",
    "import": (() => __vitePreload(() => import("./solidity-CSTQ0FCC.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "soy",
    "name": "Closure Templates",
    "aliases": [
      "closure-templates"
    ],
    "import": (() => __vitePreload(() => import("./soy-BHaHgMUy.js"), true ? __vite__mapDeps([86,1,2,3]) : void 0, import.meta.url))
  },
  {
    "id": "sparql",
    "name": "SPARQL",
    "import": (() => __vitePreload(() => import("./sparql-DswowMAp.js"), true ? __vite__mapDeps([87,88]) : void 0, import.meta.url))
  },
  {
    "id": "splunk",
    "name": "Splunk Query Language",
    "aliases": [
      "spl"
    ],
    "import": (() => __vitePreload(() => import("./splunk-DcGJXIDa.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "sql",
    "name": "SQL",
    "import": (() => __vitePreload(() => import("./sql-DzUuSofg.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "ssh-config",
    "name": "SSH Config",
    "import": (() => __vitePreload(() => import("./ssh-config-Bk_I5wDR.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "stata",
    "name": "Stata",
    "import": (() => __vitePreload(() => import("./stata-Dl7wDdBE.js"), true ? __vite__mapDeps([89,16]) : void 0, import.meta.url))
  },
  {
    "id": "stylus",
    "name": "Stylus",
    "aliases": [
      "styl"
    ],
    "import": (() => __vitePreload(() => import("./stylus-DXFa_2Jl.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "surrealql",
    "name": "SurrealQL",
    "aliases": [
      "surql"
    ],
    "import": (() => __vitePreload(() => import("./surrealql-Bs3vUeKA.js"), true ? __vite__mapDeps([90,2]) : void 0, import.meta.url))
  },
  {
    "id": "svelte",
    "name": "Svelte",
    "import": (() => __vitePreload(() => import("./svelte-fC0HkEkx.js"), true ? __vite__mapDeps([91,2,11,3,12]) : void 0, import.meta.url))
  },
  {
    "id": "swift",
    "name": "Swift",
    "import": (() => __vitePreload(() => import("./swift-Cohr-WZC.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "system-verilog",
    "name": "SystemVerilog",
    "import": (() => __vitePreload(() => import("./system-verilog-BcESSvRn.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "systemd",
    "name": "Systemd Units",
    "import": (() => __vitePreload(() => import("./systemd-DJPFjU02.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "talonscript",
    "name": "TalonScript",
    "aliases": [
      "talon"
    ],
    "import": (() => __vitePreload(() => import("./talonscript-CEEMXJTH.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "tasl",
    "name": "Tasl",
    "import": (() => __vitePreload(() => import("./tasl-DfOr2qHi.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "tcl",
    "name": "Tcl",
    "import": (() => __vitePreload(() => import("./tcl-CTsc4-t7.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "templ",
    "name": "Templ",
    "import": (() => __vitePreload(() => import("./templ-CSEiQwNm.js"), true ? __vite__mapDeps([92,93,2,3]) : void 0, import.meta.url))
  },
  {
    "id": "terraform",
    "name": "Terraform",
    "aliases": [
      "tf",
      "tfvars"
    ],
    "import": (() => __vitePreload(() => import("./terraform-CeztUfUr.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "tex",
    "name": "TeX",
    "import": (() => __vitePreload(() => import("./tex-CGVqF8nD.js"), true ? __vite__mapDeps([66,62]) : void 0, import.meta.url))
  },
  {
    "id": "toml",
    "name": "TOML",
    "import": (() => __vitePreload(() => import("./toml-vHPzWDj6.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "ts-tags",
    "name": "TypeScript with Tags",
    "aliases": [
      "lit"
    ],
    "import": (() => __vitePreload(() => import("./ts-tags-cG2hZuda.js"), true ? __vite__mapDeps([94,11,3,2,25,26,1,16,7,8]) : void 0, import.meta.url))
  },
  {
    "id": "tsv",
    "name": "TSV",
    "import": (() => __vitePreload(() => import("./tsv-ChRVFvMy.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "tsx",
    "name": "TSX",
    "import": (() => __vitePreload(() => import("./tsx-CmGGo4Hm.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "turtle",
    "name": "Turtle",
    "import": (() => __vitePreload(() => import("./turtle-BnC7StHY.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "twig",
    "name": "Twig",
    "import": (() => __vitePreload(() => import("./twig-CwEEYIBf.js"), true ? __vite__mapDeps([95,3,2,5,75,1,7,8,16,9,20,33,34,35,11,36,13,23,24,25,26,28,37,38]) : void 0, import.meta.url))
  },
  {
    "id": "typescript",
    "name": "TypeScript",
    "aliases": [
      "ts",
      "cts",
      "mts"
    ],
    "import": (() => __vitePreload(() => import("./typescript-CP6ECzON.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "typespec",
    "name": "TypeSpec",
    "aliases": [
      "tsp"
    ],
    "import": (() => __vitePreload(() => import("./typespec-CkDVVIcK.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "typst",
    "name": "Typst",
    "aliases": [
      "typ"
    ],
    "import": (() => __vitePreload(() => import("./typst-XYLFxYau.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "v",
    "name": "V",
    "import": (() => __vitePreload(() => import("./v-BSYXvR4g.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "vala",
    "name": "Vala",
    "import": (() => __vitePreload(() => import("./vala-qJa5rry9.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "vb",
    "name": "Visual Basic",
    "aliases": [
      "cmd"
    ],
    "import": (() => __vitePreload(() => import("./vb-Bzg9rspf.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "verilog",
    "name": "Verilog",
    "import": (() => __vitePreload(() => import("./verilog-CCb_iTfF.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "vhdl",
    "name": "VHDL",
    "import": (() => __vitePreload(() => import("./vhdl-DMqk4T2s.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "viml",
    "name": "Vim Script",
    "aliases": [
      "vim",
      "vimscript"
    ],
    "import": (() => __vitePreload(() => import("./viml--FINbfoq.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "vue",
    "name": "Vue",
    "import": (() => __vitePreload(() => import("./vue-K-7Ga-y8.js"), true ? __vite__mapDeps([96,3,2,11,9,1,15]) : void 0, import.meta.url))
  },
  {
    "id": "vue-html",
    "name": "Vue HTML",
    "import": (() => __vitePreload(() => import("./vue-html-DhreShjd.js"), true ? __vite__mapDeps([97,2]) : void 0, import.meta.url))
  },
  {
    "id": "vue-vine",
    "name": "Vue Vine",
    "import": (() => __vitePreload(() => import("./vue-vine-rMIwOpFf.js"), true ? __vite__mapDeps([98,3,5,69,99,12,2]) : void 0, import.meta.url))
  },
  {
    "id": "vyper",
    "name": "Vyper",
    "aliases": [
      "vy"
    ],
    "import": (() => __vitePreload(() => import("./vyper-DP4whl13.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "wasm",
    "name": "WebAssembly",
    "import": (() => __vitePreload(() => import("./wasm-BBh6f151.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "wenyan",
    "name": "Wenyan",
    "aliases": [
      "文言"
    ],
    "import": (() => __vitePreload(() => import("./wenyan-BdqozpMZ.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "wgsl",
    "name": "WGSL",
    "import": (() => __vitePreload(() => import("./wgsl-Vo-hHVWH.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "wikitext",
    "name": "Wikitext",
    "aliases": [
      "mediawiki",
      "wiki"
    ],
    "import": (() => __vitePreload(() => import("./wikitext-BDjE6pmL.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "wit",
    "name": "WebAssembly Interface Types",
    "import": (() => __vitePreload(() => import("./wit-C_nQzOkY.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "wolfram",
    "name": "Wolfram",
    "aliases": [
      "wl"
    ],
    "import": (() => __vitePreload(() => import("./wolfram-CRmjUoI4.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "xml",
    "name": "XML",
    "import": (() => __vitePreload(() => import("./xml-BMzZeaqs.js"), true ? __vite__mapDeps([7,8]) : void 0, import.meta.url))
  },
  {
    "id": "xsl",
    "name": "XSL",
    "import": (() => __vitePreload(() => import("./xsl-CnwVr_6q.js"), true ? __vite__mapDeps([100,7,8]) : void 0, import.meta.url))
  },
  {
    "id": "yaml",
    "name": "YAML",
    "aliases": [
      "yml"
    ],
    "import": (() => __vitePreload(() => import("./yaml-B_vW5iTY.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "zenscript",
    "name": "ZenScript",
    "import": (() => __vitePreload(() => import("./zenscript-DFINJL6j.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "zig",
    "name": "Zig",
    "import": (() => __vitePreload(() => import("./zig-CS4FMAZp.js"), true ? [] : void 0, import.meta.url))
  }
];
const bundledLanguagesBase = Object.fromEntries(bundledLanguagesInfo.map((i2) => [i2.id, i2.import]));
const bundledLanguagesAlias = Object.fromEntries(bundledLanguagesInfo.flatMap((i2) => i2.aliases?.map((a) => [a, i2.import]) || []));
const bundledLanguages = {
  ...bundledLanguagesBase,
  ...bundledLanguagesAlias
};
const bundledThemesInfo = [
  {
    "id": "andromeeda",
    "displayName": "Andromeeda",
    "type": "dark",
    "import": (() => __vitePreload(() => import("./andromeeda-C847lm7Z.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "aurora-x",
    "displayName": "Aurora X",
    "type": "dark",
    "import": (() => __vitePreload(() => import("./aurora-x-wJ4-eM2h.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "ayu-dark",
    "displayName": "Ayu Dark",
    "type": "dark",
    "import": (() => __vitePreload(() => import("./ayu-dark-rtpbXCNg.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "ayu-light",
    "displayName": "Ayu Light",
    "type": "light",
    "import": (() => __vitePreload(() => import("./ayu-light-BCZDSyV8.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "ayu-mirage",
    "displayName": "Ayu Mirage",
    "type": "dark",
    "import": (() => __vitePreload(() => import("./ayu-mirage-BVoH71sA.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "catppuccin-frappe",
    "displayName": "Catppuccin Frappé",
    "type": "dark",
    "import": (() => __vitePreload(() => import("./catppuccin-frappe-C21OPQfC.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "catppuccin-latte",
    "displayName": "Catppuccin Latte",
    "type": "light",
    "import": (() => __vitePreload(() => import("./catppuccin-latte-0ZtXlsrX.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "catppuccin-macchiato",
    "displayName": "Catppuccin Macchiato",
    "type": "dark",
    "import": (() => __vitePreload(() => import("./catppuccin-macchiato-BD_FR4sl.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "catppuccin-mocha",
    "displayName": "Catppuccin Mocha",
    "type": "dark",
    "import": (() => __vitePreload(() => import("./catppuccin-mocha-C653csR5.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "dark-plus",
    "displayName": "Dark Plus",
    "type": "dark",
    "import": (() => __vitePreload(() => import("./dark-plus-DmZ1Dzd4.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "dracula",
    "displayName": "Dracula Theme",
    "type": "dark",
    "import": (() => __vitePreload(() => import("./dracula-B8-AVrwI.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "dracula-soft",
    "displayName": "Dracula Theme Soft",
    "type": "dark",
    "import": (() => __vitePreload(() => import("./dracula-soft-BHeefow7.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "everforest-dark",
    "displayName": "Everforest Dark",
    "type": "dark",
    "import": (() => __vitePreload(() => import("./everforest-dark-Cg1xdODP.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "everforest-light",
    "displayName": "Everforest Light",
    "type": "light",
    "import": (() => __vitePreload(() => import("./everforest-light-BmTD3bxe.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "github-dark",
    "displayName": "GitHub Dark",
    "type": "dark",
    "import": (() => __vitePreload(() => import("./github-dark-O22yVQaY.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "github-dark-default",
    "displayName": "GitHub Dark Default",
    "type": "dark",
    "import": (() => __vitePreload(() => import("./github-dark-default-DB2Hkvqn.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "github-dark-dimmed",
    "displayName": "GitHub Dark Dimmed",
    "type": "dark",
    "import": (() => __vitePreload(() => import("./github-dark-dimmed-CMZ_OfqC.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "github-dark-high-contrast",
    "displayName": "GitHub Dark High Contrast",
    "type": "dark",
    "import": (() => __vitePreload(() => import("./github-dark-high-contrast-DmxWVmCU.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "github-light",
    "displayName": "GitHub Light",
    "type": "light",
    "import": (() => __vitePreload(() => import("./github-light-BTbR9xVK.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "github-light-default",
    "displayName": "GitHub Light Default",
    "type": "light",
    "import": (() => __vitePreload(() => import("./github-light-default-DWEonwFe.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "github-light-high-contrast",
    "displayName": "GitHub Light High Contrast",
    "type": "light",
    "import": (() => __vitePreload(() => import("./github-light-high-contrast-WJ_cPDts.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "gruvbox-dark-hard",
    "displayName": "Gruvbox Dark Hard",
    "type": "dark",
    "import": (() => __vitePreload(() => import("./gruvbox-dark-hard-DVsRsETr.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "gruvbox-dark-medium",
    "displayName": "Gruvbox Dark Medium",
    "type": "dark",
    "import": (() => __vitePreload(() => import("./gruvbox-dark-medium-B5JBrQdg.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "gruvbox-dark-soft",
    "displayName": "Gruvbox Dark Soft",
    "type": "dark",
    "import": (() => __vitePreload(() => import("./gruvbox-dark-soft-Db-YOqRx.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "gruvbox-light-hard",
    "displayName": "Gruvbox Light Hard",
    "type": "light",
    "import": (() => __vitePreload(() => import("./gruvbox-light-hard-CXzJt7DI.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "gruvbox-light-medium",
    "displayName": "Gruvbox Light Medium",
    "type": "light",
    "import": (() => __vitePreload(() => import("./gruvbox-light-medium-B89RAI1Y.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "gruvbox-light-soft",
    "displayName": "Gruvbox Light Soft",
    "type": "light",
    "import": (() => __vitePreload(() => import("./gruvbox-light-soft-Cs0hTZYv.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "horizon",
    "displayName": "Horizon",
    "type": "dark",
    "import": (() => __vitePreload(() => import("./horizon-DWzh3z5C.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "horizon-bright",
    "displayName": "Horizon Bright",
    "type": "dark",
    "import": (() => __vitePreload(() => import("./horizon-bright-C1AFkPsv.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "houston",
    "displayName": "Houston",
    "type": "dark",
    "import": (() => __vitePreload(() => import("./houston-CF_ws8Cq.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "kanagawa-dragon",
    "displayName": "Kanagawa Dragon",
    "type": "dark",
    "import": (() => __vitePreload(() => import("./kanagawa-dragon-DU8n2NNT.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "kanagawa-lotus",
    "displayName": "Kanagawa Lotus",
    "type": "light",
    "import": (() => __vitePreload(() => import("./kanagawa-lotus-Byd0CDet.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "kanagawa-wave",
    "displayName": "Kanagawa Wave",
    "type": "dark",
    "import": (() => __vitePreload(() => import("./kanagawa-wave-DExoagcR.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "laserwave",
    "displayName": "LaserWave",
    "type": "dark",
    "import": (() => __vitePreload(() => import("./laserwave-DF03wMlf.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "light-plus",
    "displayName": "Light Plus",
    "type": "light",
    "import": (() => __vitePreload(() => import("./light-plus-DS08Xg5J.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "material-theme",
    "displayName": "Material Theme",
    "type": "dark",
    "import": (() => __vitePreload(() => import("./material-theme-B8B2U48Q.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "material-theme-darker",
    "displayName": "Material Theme Darker",
    "type": "dark",
    "import": (() => __vitePreload(() => import("./material-theme-darker-BV0iY_T3.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "material-theme-lighter",
    "displayName": "Material Theme Lighter",
    "type": "light",
    "import": (() => __vitePreload(() => import("./material-theme-lighter-DrzybSTF.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "material-theme-ocean",
    "displayName": "Material Theme Ocean",
    "type": "dark",
    "import": (() => __vitePreload(() => import("./material-theme-ocean-BRPLVReX.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "material-theme-palenight",
    "displayName": "Material Theme Palenight",
    "type": "dark",
    "import": (() => __vitePreload(() => import("./material-theme-palenight-DSJwsR_D.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "min-dark",
    "displayName": "Min Dark",
    "type": "dark",
    "import": (() => __vitePreload(() => import("./min-dark-BNaN9fWk.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "min-light",
    "displayName": "Min Light",
    "type": "light",
    "import": (() => __vitePreload(() => import("./min-light-CMrjentn.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "monokai",
    "displayName": "Monokai",
    "type": "dark",
    "import": (() => __vitePreload(() => import("./monokai-DelygWXa.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "night-owl",
    "displayName": "Night Owl",
    "type": "dark",
    "import": (() => __vitePreload(() => import("./night-owl-DSS199ra.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "night-owl-light",
    "displayName": "Night Owl Light",
    "type": "light",
    "import": (() => __vitePreload(() => import("./night-owl-light-gC6E-Eh2.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "nord",
    "displayName": "Nord",
    "type": "dark",
    "import": (() => __vitePreload(() => import("./nord-CvDbBq5M.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "one-dark-pro",
    "displayName": "One Dark Pro",
    "type": "dark",
    "import": (() => __vitePreload(() => import("./one-dark-pro-CsMf0BoJ.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "one-light",
    "displayName": "One Light",
    "type": "light",
    "import": (() => __vitePreload(() => import("./one-light-B0cTzZyr.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "plastic",
    "displayName": "Plastic",
    "type": "dark",
    "import": (() => __vitePreload(() => import("./plastic-BjwMpBc0.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "poimandres",
    "displayName": "Poimandres",
    "type": "dark",
    "import": (() => __vitePreload(() => import("./poimandres-ChWyhPrn.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "red",
    "displayName": "Red",
    "type": "dark",
    "import": (() => __vitePreload(() => import("./red-DByOl5N0.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "rose-pine",
    "displayName": "Rosé Pine",
    "type": "dark",
    "import": (() => __vitePreload(() => import("./rose-pine-B-kZ4Z9q.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "rose-pine-dawn",
    "displayName": "Rosé Pine Dawn",
    "type": "light",
    "import": (() => __vitePreload(() => import("./rose-pine-dawn-efeVGdSI.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "rose-pine-moon",
    "displayName": "Rosé Pine Moon",
    "type": "dark",
    "import": (() => __vitePreload(() => import("./rose-pine-moon-DmodZNzl.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "slack-dark",
    "displayName": "Slack Dark",
    "type": "dark",
    "import": (() => __vitePreload(() => import("./slack-dark-BEe10hxO.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "slack-ochin",
    "displayName": "Slack Ochin",
    "type": "light",
    "import": (() => __vitePreload(() => import("./slack-ochin-BKmu9pBc.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "snazzy-light",
    "displayName": "Snazzy Light",
    "type": "light",
    "import": (() => __vitePreload(() => import("./snazzy-light-Dcvd-ZyI.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "solarized-dark",
    "displayName": "Solarized Dark",
    "type": "dark",
    "import": (() => __vitePreload(() => import("./solarized-dark-BBl5y5sR.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "solarized-light",
    "displayName": "Solarized Light",
    "type": "light",
    "import": (() => __vitePreload(() => import("./solarized-light-DW9b_AY8.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "synthwave-84",
    "displayName": "Synthwave '84",
    "type": "dark",
    "import": (() => __vitePreload(() => import("./synthwave-84-CoUef9sh.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "tokyo-night",
    "displayName": "Tokyo Night",
    "type": "dark",
    "import": (() => __vitePreload(() => import("./tokyo-night-DjtLpAEY.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "vesper",
    "displayName": "Vesper",
    "type": "dark",
    "import": (() => __vitePreload(() => import("./vesper-4Q1cEwPL.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "vitesse-black",
    "displayName": "Vitesse Black",
    "type": "dark",
    "import": (() => __vitePreload(() => import("./vitesse-black-BqNLki8b.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "vitesse-dark",
    "displayName": "Vitesse Dark",
    "type": "dark",
    "import": (() => __vitePreload(() => import("./vitesse-dark-jJ32WhwH.js"), true ? [] : void 0, import.meta.url))
  },
  {
    "id": "vitesse-light",
    "displayName": "Vitesse Light",
    "type": "light",
    "import": (() => __vitePreload(() => import("./vitesse-light-476zM4e6.js"), true ? [] : void 0, import.meta.url))
  }
];
const bundledThemes = Object.fromEntries(bundledThemesInfo.map((i2) => [i2.id, i2.import]));
class ShikiError3 extends Error {
  constructor(message) {
    super(message);
    this.name = "ShikiError";
  }
}
function getHeapMax() {
  return 2147483648;
}
function _emscripten_get_now() {
  return typeof performance !== "undefined" ? performance.now() : Date.now();
}
const alignUp = (x2, multiple) => x2 + (multiple - x2 % multiple) % multiple;
async function main(init) {
  let wasmMemory;
  let buffer;
  const binding = {};
  function updateGlobalBufferAndViews(buf) {
    buffer = buf;
    binding.HEAPU8 = new Uint8Array(buf);
    binding.HEAPU32 = new Uint32Array(buf);
  }
  function _emscripten_memcpy_big(dest, src, num) {
    binding.HEAPU8.copyWithin(dest, src, src + num);
  }
  function emscripten_realloc_buffer(size) {
    try {
      wasmMemory.grow(size - buffer.byteLength + 65535 >>> 16);
      updateGlobalBufferAndViews(wasmMemory.buffer);
      return 1;
    } catch {
    }
  }
  function _emscripten_resize_heap(requestedSize) {
    const oldSize = binding.HEAPU8.length;
    requestedSize = requestedSize >>> 0;
    const maxHeapSize = getHeapMax();
    if (requestedSize > maxHeapSize)
      return false;
    for (let cutDown = 1; cutDown <= 4; cutDown *= 2) {
      let overGrownHeapSize = oldSize * (1 + 0.2 / cutDown);
      overGrownHeapSize = Math.min(overGrownHeapSize, requestedSize + 100663296);
      const newSize = Math.min(maxHeapSize, alignUp(Math.max(requestedSize, overGrownHeapSize), 65536));
      const replacement = emscripten_realloc_buffer(newSize);
      if (replacement)
        return true;
    }
    return false;
  }
  const UTF8Decoder = typeof TextDecoder != "undefined" ? new TextDecoder("utf8") : void 0;
  function UTF8ArrayToString(heapOrArray, idx, maxBytesToRead = 1024) {
    const endIdx = idx + maxBytesToRead;
    let endPtr = idx;
    while (heapOrArray[endPtr] && !(endPtr >= endIdx)) ++endPtr;
    if (endPtr - idx > 16 && heapOrArray.buffer && UTF8Decoder) {
      return UTF8Decoder.decode(heapOrArray.subarray(idx, endPtr));
    }
    let str = "";
    while (idx < endPtr) {
      let u0 = heapOrArray[idx++];
      if (!(u0 & 128)) {
        str += String.fromCharCode(u0);
        continue;
      }
      const u1 = heapOrArray[idx++] & 63;
      if ((u0 & 224) === 192) {
        str += String.fromCharCode((u0 & 31) << 6 | u1);
        continue;
      }
      const u2 = heapOrArray[idx++] & 63;
      if ((u0 & 240) === 224) {
        u0 = (u0 & 15) << 12 | u1 << 6 | u2;
      } else {
        u0 = (u0 & 7) << 18 | u1 << 12 | u2 << 6 | heapOrArray[idx++] & 63;
      }
      if (u0 < 65536) {
        str += String.fromCharCode(u0);
      } else {
        const ch = u0 - 65536;
        str += String.fromCharCode(55296 | ch >> 10, 56320 | ch & 1023);
      }
    }
    return str;
  }
  function UTF8ToString(ptr, maxBytesToRead) {
    return ptr ? UTF8ArrayToString(binding.HEAPU8, ptr, maxBytesToRead) : "";
  }
  const asmLibraryArg = {
    emscripten_get_now: _emscripten_get_now,
    emscripten_memcpy_big: _emscripten_memcpy_big,
    emscripten_resize_heap: _emscripten_resize_heap,
    fd_write: () => 0
  };
  async function createWasm() {
    const info = {
      env: asmLibraryArg,
      wasi_snapshot_preview1: asmLibraryArg
    };
    const exports$1 = await init(info);
    wasmMemory = exports$1.memory;
    updateGlobalBufferAndViews(wasmMemory.buffer);
    Object.assign(binding, exports$1);
    binding.UTF8ToString = UTF8ToString;
  }
  await createWasm();
  return binding;
}
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key2, value) => key2 in obj ? __defProp(obj, key2, { enumerable: true, configurable: true, writable: true, value }) : obj[key2] = value;
var __publicField = (obj, key2, value) => __defNormalProp(obj, typeof key2 !== "symbol" ? key2 + "" : key2, value);
let onigBinding = null;
function throwLastOnigError(onigBinding2) {
  throw new ShikiError3(onigBinding2.UTF8ToString(onigBinding2.getLastOnigError()));
}
class UtfString {
  constructor(str) {
    __publicField(this, "utf16Length");
    __publicField(this, "utf8Length");
    __publicField(this, "utf16Value");
    __publicField(this, "utf8Value");
    __publicField(this, "utf16OffsetToUtf8");
    __publicField(this, "utf8OffsetToUtf16");
    const utf16Length = str.length;
    const utf8Length = UtfString._utf8ByteLength(str);
    const computeIndicesMapping = utf8Length !== utf16Length;
    const utf16OffsetToUtf8 = computeIndicesMapping ? new Uint32Array(utf16Length + 1) : null;
    if (computeIndicesMapping)
      utf16OffsetToUtf8[utf16Length] = utf8Length;
    const utf8OffsetToUtf16 = computeIndicesMapping ? new Uint32Array(utf8Length + 1) : null;
    if (computeIndicesMapping)
      utf8OffsetToUtf16[utf8Length] = utf16Length;
    const utf8Value = new Uint8Array(utf8Length);
    let i8 = 0;
    for (let i16 = 0; i16 < utf16Length; i16++) {
      const charCode = str.charCodeAt(i16);
      let codePoint = charCode;
      let wasSurrogatePair = false;
      if (charCode >= 55296 && charCode <= 56319) {
        if (i16 + 1 < utf16Length) {
          const nextCharCode = str.charCodeAt(i16 + 1);
          if (nextCharCode >= 56320 && nextCharCode <= 57343) {
            codePoint = (charCode - 55296 << 10) + 65536 | nextCharCode - 56320;
            wasSurrogatePair = true;
          }
        }
      }
      if (computeIndicesMapping) {
        utf16OffsetToUtf8[i16] = i8;
        if (wasSurrogatePair)
          utf16OffsetToUtf8[i16 + 1] = i8;
        if (codePoint <= 127) {
          utf8OffsetToUtf16[i8 + 0] = i16;
        } else if (codePoint <= 2047) {
          utf8OffsetToUtf16[i8 + 0] = i16;
          utf8OffsetToUtf16[i8 + 1] = i16;
        } else if (codePoint <= 65535) {
          utf8OffsetToUtf16[i8 + 0] = i16;
          utf8OffsetToUtf16[i8 + 1] = i16;
          utf8OffsetToUtf16[i8 + 2] = i16;
        } else {
          utf8OffsetToUtf16[i8 + 0] = i16;
          utf8OffsetToUtf16[i8 + 1] = i16;
          utf8OffsetToUtf16[i8 + 2] = i16;
          utf8OffsetToUtf16[i8 + 3] = i16;
        }
      }
      if (codePoint <= 127) {
        utf8Value[i8++] = codePoint;
      } else if (codePoint <= 2047) {
        utf8Value[i8++] = 192 | (codePoint & 1984) >>> 6;
        utf8Value[i8++] = 128 | (codePoint & 63) >>> 0;
      } else if (codePoint <= 65535) {
        utf8Value[i8++] = 224 | (codePoint & 61440) >>> 12;
        utf8Value[i8++] = 128 | (codePoint & 4032) >>> 6;
        utf8Value[i8++] = 128 | (codePoint & 63) >>> 0;
      } else {
        utf8Value[i8++] = 240 | (codePoint & 1835008) >>> 18;
        utf8Value[i8++] = 128 | (codePoint & 258048) >>> 12;
        utf8Value[i8++] = 128 | (codePoint & 4032) >>> 6;
        utf8Value[i8++] = 128 | (codePoint & 63) >>> 0;
      }
      if (wasSurrogatePair)
        i16++;
    }
    this.utf16Length = utf16Length;
    this.utf8Length = utf8Length;
    this.utf16Value = str;
    this.utf8Value = utf8Value;
    this.utf16OffsetToUtf8 = utf16OffsetToUtf8;
    this.utf8OffsetToUtf16 = utf8OffsetToUtf16;
  }
  static _utf8ByteLength(str) {
    let result = 0;
    for (let i2 = 0, len = str.length; i2 < len; i2++) {
      const charCode = str.charCodeAt(i2);
      let codepoint = charCode;
      let wasSurrogatePair = false;
      if (charCode >= 55296 && charCode <= 56319) {
        if (i2 + 1 < len) {
          const nextCharCode = str.charCodeAt(i2 + 1);
          if (nextCharCode >= 56320 && nextCharCode <= 57343) {
            codepoint = (charCode - 55296 << 10) + 65536 | nextCharCode - 56320;
            wasSurrogatePair = true;
          }
        }
      }
      if (codepoint <= 127)
        result += 1;
      else if (codepoint <= 2047)
        result += 2;
      else if (codepoint <= 65535)
        result += 3;
      else
        result += 4;
      if (wasSurrogatePair)
        i2++;
    }
    return result;
  }
  createString(onigBinding2) {
    const result = onigBinding2.omalloc(this.utf8Length);
    onigBinding2.HEAPU8.set(this.utf8Value, result);
    return result;
  }
}
const _OnigString = class _OnigString2 {
  constructor(str) {
    __publicField(this, "id", ++_OnigString2.LAST_ID);
    __publicField(this, "_onigBinding");
    __publicField(this, "content");
    __publicField(this, "utf16Length");
    __publicField(this, "utf8Length");
    __publicField(this, "utf16OffsetToUtf8");
    __publicField(this, "utf8OffsetToUtf16");
    __publicField(this, "ptr");
    if (!onigBinding)
      throw new ShikiError3("Must invoke loadWasm first.");
    this._onigBinding = onigBinding;
    this.content = str;
    const utfString = new UtfString(str);
    this.utf16Length = utfString.utf16Length;
    this.utf8Length = utfString.utf8Length;
    this.utf16OffsetToUtf8 = utfString.utf16OffsetToUtf8;
    this.utf8OffsetToUtf16 = utfString.utf8OffsetToUtf16;
    if (this.utf8Length < 1e4 && !_OnigString2._sharedPtrInUse) {
      if (!_OnigString2._sharedPtr)
        _OnigString2._sharedPtr = onigBinding.omalloc(1e4);
      _OnigString2._sharedPtrInUse = true;
      onigBinding.HEAPU8.set(utfString.utf8Value, _OnigString2._sharedPtr);
      this.ptr = _OnigString2._sharedPtr;
    } else {
      this.ptr = utfString.createString(onigBinding);
    }
  }
  convertUtf8OffsetToUtf16(utf8Offset) {
    if (this.utf8OffsetToUtf16) {
      if (utf8Offset < 0)
        return 0;
      if (utf8Offset > this.utf8Length)
        return this.utf16Length;
      return this.utf8OffsetToUtf16[utf8Offset];
    }
    return utf8Offset;
  }
  convertUtf16OffsetToUtf8(utf16Offset) {
    if (this.utf16OffsetToUtf8) {
      if (utf16Offset < 0)
        return 0;
      if (utf16Offset > this.utf16Length)
        return this.utf8Length;
      return this.utf16OffsetToUtf8[utf16Offset];
    }
    return utf16Offset;
  }
  dispose() {
    if (this.ptr === _OnigString2._sharedPtr)
      _OnigString2._sharedPtrInUse = false;
    else
      this._onigBinding.ofree(this.ptr);
  }
};
__publicField(_OnigString, "LAST_ID", 0);
__publicField(_OnigString, "_sharedPtr", 0);
__publicField(_OnigString, "_sharedPtrInUse", false);
let OnigString = _OnigString;
class OnigScanner {
  constructor(patterns) {
    __publicField(this, "_onigBinding");
    __publicField(this, "_ptr");
    if (!onigBinding)
      throw new ShikiError3("Must invoke loadWasm first.");
    const strPtrsArr = [];
    const strLenArr = [];
    for (let i2 = 0, len = patterns.length; i2 < len; i2++) {
      const utfString = new UtfString(patterns[i2]);
      strPtrsArr[i2] = utfString.createString(onigBinding);
      strLenArr[i2] = utfString.utf8Length;
    }
    const strPtrsPtr = onigBinding.omalloc(4 * patterns.length);
    onigBinding.HEAPU32.set(strPtrsArr, strPtrsPtr / 4);
    const strLenPtr = onigBinding.omalloc(4 * patterns.length);
    onigBinding.HEAPU32.set(strLenArr, strLenPtr / 4);
    const scannerPtr = onigBinding.createOnigScanner(strPtrsPtr, strLenPtr, patterns.length);
    for (let i2 = 0, len = patterns.length; i2 < len; i2++)
      onigBinding.ofree(strPtrsArr[i2]);
    onigBinding.ofree(strLenPtr);
    onigBinding.ofree(strPtrsPtr);
    if (scannerPtr === 0)
      throwLastOnigError(onigBinding);
    this._onigBinding = onigBinding;
    this._ptr = scannerPtr;
  }
  dispose() {
    this._onigBinding.freeOnigScanner(this._ptr);
  }
  findNextMatchSync(string, startPosition, arg) {
    let options = 0;
    if (typeof arg === "number") {
      options = arg;
    }
    if (typeof string === "string") {
      string = new OnigString(string);
      const result = this._findNextMatchSync(string, startPosition, false, options);
      string.dispose();
      return result;
    }
    return this._findNextMatchSync(string, startPosition, false, options);
  }
  _findNextMatchSync(string, startPosition, debugCall, options) {
    const onigBinding2 = this._onigBinding;
    const resultPtr = onigBinding2.findNextOnigScannerMatch(this._ptr, string.id, string.ptr, string.utf8Length, string.convertUtf16OffsetToUtf8(startPosition), options);
    if (resultPtr === 0) {
      return null;
    }
    const HEAPU32 = onigBinding2.HEAPU32;
    let offset = resultPtr / 4;
    const index = HEAPU32[offset++];
    const count = HEAPU32[offset++];
    const captureIndices = [];
    for (let i2 = 0; i2 < count; i2++) {
      const beg = string.convertUtf8OffsetToUtf16(HEAPU32[offset++]);
      const end = string.convertUtf8OffsetToUtf16(HEAPU32[offset++]);
      captureIndices[i2] = {
        start: beg,
        end,
        length: end - beg
      };
    }
    return {
      index,
      captureIndices
    };
  }
}
function isInstantiatorOptionsObject(dataOrOptions) {
  return typeof dataOrOptions.instantiator === "function";
}
function isInstantiatorModule(dataOrOptions) {
  return typeof dataOrOptions.default === "function";
}
function isDataOptionsObject(dataOrOptions) {
  return typeof dataOrOptions.data !== "undefined";
}
function isResponse(dataOrOptions) {
  return typeof Response !== "undefined" && dataOrOptions instanceof Response;
}
function isArrayBuffer(data) {
  return typeof ArrayBuffer !== "undefined" && (data instanceof ArrayBuffer || ArrayBuffer.isView(data)) || typeof Buffer !== "undefined" && Buffer.isBuffer?.(data) || typeof SharedArrayBuffer !== "undefined" && data instanceof SharedArrayBuffer || typeof Uint32Array !== "undefined" && data instanceof Uint32Array;
}
let initPromise;
function loadWasm(options) {
  if (initPromise)
    return initPromise;
  async function _load() {
    onigBinding = await main(async (info) => {
      let instance = options;
      instance = await instance;
      if (typeof instance === "function")
        instance = await instance(info);
      if (typeof instance === "function")
        instance = await instance(info);
      if (isInstantiatorOptionsObject(instance)) {
        instance = await instance.instantiator(info);
      } else if (isInstantiatorModule(instance)) {
        instance = await instance.default(info);
      } else {
        if (isDataOptionsObject(instance))
          instance = instance.data;
        if (isResponse(instance)) {
          if (typeof WebAssembly.instantiateStreaming === "function")
            instance = await _makeResponseStreamingLoader(instance)(info);
          else
            instance = await _makeResponseNonStreamingLoader(instance)(info);
        } else if (isArrayBuffer(instance)) {
          instance = await _makeArrayBufferLoader(instance)(info);
        } else if (instance instanceof WebAssembly.Module) {
          instance = await _makeArrayBufferLoader(instance)(info);
        } else if ("default" in instance && instance.default instanceof WebAssembly.Module) {
          instance = await _makeArrayBufferLoader(instance.default)(info);
        }
      }
      if ("instance" in instance)
        instance = instance.instance;
      if ("exports" in instance)
        instance = instance.exports;
      return instance;
    });
  }
  initPromise = _load();
  return initPromise;
}
function _makeArrayBufferLoader(data) {
  return (importObject) => WebAssembly.instantiate(data, importObject);
}
function _makeResponseStreamingLoader(data) {
  return (importObject) => WebAssembly.instantiateStreaming(data, importObject);
}
function _makeResponseNonStreamingLoader(data) {
  return async (importObject) => {
    const arrayBuffer = await data.arrayBuffer();
    return WebAssembly.instantiate(arrayBuffer, importObject);
  };
}
async function createOnigurumaEngine(options) {
  if (options)
    await loadWasm(options);
  return {
    createScanner(patterns) {
      return new OnigScanner(patterns.map((p2) => typeof p2 === "string" ? p2 : p2.source));
    },
    createString(s2) {
      return new OnigString(s2);
    }
  };
}
const createHighlighter = /* @__PURE__ */ createBundledHighlighter({
  langs: bundledLanguages,
  themes: bundledThemes,
  engine: () => createOnigurumaEngine(__vitePreload(() => import("./wasm-DDgzZJey.js"), true ? [] : void 0, import.meta.url))
});
function r$2(e) {
  if ([...e].length !== 1) throw new Error(`Expected "${e}" to be a single code point`);
  return e.codePointAt(0);
}
function l$1(e, t, n) {
  return e.has(t) || e.set(t, n), e.get(t);
}
const i = /* @__PURE__ */ new Set(["alnum", "alpha", "ascii", "blank", "cntrl", "digit", "graph", "lower", "print", "punct", "space", "upper", "word", "xdigit"]), o$1 = String.raw;
function u(e, t) {
  if (e == null) throw new Error(t ?? "Value expected");
  return e;
}
const m$1 = o$1`\[\^?`, b$1 = `c.? | C(?:-.?)?|${o$1`[pP]\{(?:\^?[-\x20_]*[A-Za-z][-\x20\w]*\})?`}|${o$1`x[89A-Fa-f]\p{AHex}(?:\\x[89A-Fa-f]\p{AHex})*`}|${o$1`u(?:\p{AHex}{4})? | x\{[^\}]*\}? | x\p{AHex}{0,2}`}|${o$1`o\{[^\}]*\}?`}|${o$1`\d{1,3}`}`, y$1 = /[?*+][?+]?|\{(?:\d+(?:,\d*)?|,\d+)\}\??/, C$1 = new RegExp(o$1`
  \\ (?:
    ${b$1}
    | [gk]<[^>]*>?
    | [gk]'[^']*'?
    | .
  )
  | \( (?:
    \? (?:
      [:=!>({]
      | <[=!]
      | <[^>]*>
      | '[^']*'
      | ~\|?
      | #(?:[^)\\]|\\.?)*
      | [^:)]*[:)]
    )?
    | \*[^\)]*\)?
  )?
  | (?:${y$1.source})+
  | ${m$1}
  | .
`.replace(/\s+/g, ""), "gsu"), T$1 = new RegExp(o$1`
  \\ (?:
    ${b$1}
    | .
  )
  | \[:(?:\^?\p{Alpha}+|\^):\]
  | ${m$1}
  | &&
  | .
`.replace(/\s+/g, ""), "gsu");
function M$1(e, n = {}) {
  const t = { flags: "", ...n, rules: { captureGroup: false, singleline: false, ...n.rules } };
  if (typeof e != "string") throw new Error("String expected as pattern");
  const o2 = Y(t.flags), s2 = [o2.extended], a = { captureGroup: t.rules.captureGroup, getCurrentModX() {
    return s2.at(-1);
  }, numOpenGroups: 0, popModX() {
    s2.pop();
  }, pushModX(u2) {
    s2.push(u2);
  }, replaceCurrentModX(u2) {
    s2[s2.length - 1] = u2;
  }, singleline: t.rules.singleline };
  let r2 = [], i2;
  for (C$1.lastIndex = 0; i2 = C$1.exec(e); ) {
    const u2 = F$1(a, e, i2[0], C$1.lastIndex);
    u2.tokens ? r2.push(...u2.tokens) : u2.token && r2.push(u2.token), u2.lastIndex !== void 0 && (C$1.lastIndex = u2.lastIndex);
  }
  const l2 = [];
  let c = 0;
  r2.filter((u2) => u2.type === "GroupOpen").forEach((u2) => {
    u2.kind === "capturing" ? u2.number = ++c : u2.raw === "(" && l2.push(u2);
  }), c || l2.forEach((u2, S2) => {
    u2.kind = "capturing", u2.number = S2 + 1;
  });
  const g = c || l2.length;
  return { tokens: r2.map((u2) => u2.type === "EscapedNumber" ? ee$1(u2, g) : u2).flat(), flags: o2 };
}
function F$1(e, n, t, o2) {
  const [s2, a] = t;
  if (t === "[" || t === "[^") {
    const r2 = K$1(n, t, o2);
    return { tokens: r2.tokens, lastIndex: r2.lastIndex };
  }
  if (s2 === "\\") {
    if ("AbBGyYzZ".includes(a)) return { token: w$1(t, t) };
    if (/^\\g[<']/.test(t)) {
      if (!/^\\g(?:<[^>]+>|'[^']+')$/.test(t)) throw new Error(`Invalid group name "${t}"`);
      return { token: R$1(t) };
    }
    if (/^\\k[<']/.test(t)) {
      if (!/^\\k(?:<[^>]+>|'[^']+')$/.test(t)) throw new Error(`Invalid group name "${t}"`);
      return { token: A$1(t) };
    }
    if (a === "K") return { token: I$1("keep", t) };
    if (a === "N" || a === "R") return { token: k$1("newline", t, { negate: a === "N" }) };
    if (a === "O") return { token: k$1("any", t) };
    if (a === "X") return { token: k$1("text_segment", t) };
    const r2 = x$1(t, { inCharClass: false });
    return Array.isArray(r2) ? { tokens: r2 } : { token: r2 };
  }
  if (s2 === "(") {
    if (a === "*") return { token: j(t) };
    if (t === "(?{") throw new Error(`Unsupported callout "${t}"`);
    if (t.startsWith("(?#")) {
      if (n[o2] !== ")") throw new Error('Unclosed comment group "(?#"');
      return { lastIndex: o2 + 1 };
    }
    if (/^\(\?[-imx]+[:)]$/.test(t)) return { token: L$1(t, e) };
    if (e.pushModX(e.getCurrentModX()), e.numOpenGroups++, t === "(" && !e.captureGroup || t === "(?:") return { token: f("group", t) };
    if (t === "(?>") return { token: f("atomic", t) };
    if (t === "(?=" || t === "(?!" || t === "(?<=" || t === "(?<!") return { token: f(t[2] === "<" ? "lookbehind" : "lookahead", t, { negate: t.endsWith("!") }) };
    if (t === "(" && e.captureGroup || t.startsWith("(?<") && t.endsWith(">") || t.startsWith("(?'") && t.endsWith("'")) return { token: f("capturing", t, { ...t !== "(" && { name: t.slice(3, -1) } }) };
    if (t.startsWith("(?~")) {
      if (t === "(?~|") throw new Error(`Unsupported absence function kind "${t}"`);
      return { token: f("absence_repeater", t) };
    }
    throw t === "(?(" ? new Error(`Unsupported conditional "${t}"`) : new Error(`Invalid or unsupported group option "${t}"`);
  }
  if (t === ")") {
    if (e.popModX(), e.numOpenGroups--, e.numOpenGroups < 0) throw new Error('Unmatched ")"');
    return { token: Q$1(t) };
  }
  if (e.getCurrentModX()) {
    if (t === "#") {
      const r2 = n.indexOf(`
`, o2);
      return { lastIndex: r2 === -1 ? n.length : r2 };
    }
    if (/^\s$/.test(t)) {
      const r2 = /\s+/y;
      return r2.lastIndex = o2, { lastIndex: r2.exec(n) ? r2.lastIndex : o2 };
    }
  }
  if (t === ".") return { token: k$1("dot", t) };
  if (t === "^" || t === "$") {
    const r2 = e.singleline ? { "^": o$1`\A`, $: o$1`\Z` }[t] : t;
    return { token: w$1(r2, t) };
  }
  return t === "|" ? { token: P$1(t) } : y$1.test(t) ? { tokens: te$1(t) } : { token: d(r$2(t), t) };
}
function K$1(e, n, t) {
  const o2 = [E$1(n[1] === "^", n)];
  let s2 = 1, a;
  for (T$1.lastIndex = t; a = T$1.exec(e); ) {
    const r2 = a[0];
    if (r2[0] === "[" && r2[1] !== ":") s2++, o2.push(E$1(r2[1] === "^", r2));
    else if (r2 === "]") {
      if (o2.at(-1).type === "CharacterClassOpen") o2.push(d(93, r2));
      else if (s2--, o2.push(z$1(r2)), !s2) break;
    } else {
      const i2 = X$1(r2);
      Array.isArray(i2) ? o2.push(...i2) : o2.push(i2);
    }
  }
  return { tokens: o2, lastIndex: T$1.lastIndex || e.length };
}
function X$1(e) {
  if (e[0] === "\\") return x$1(e, { inCharClass: true });
  if (e[0] === "[") {
    const n = /\[:(?<negate>\^?)(?<name>[a-z]+):\]/.exec(e);
    if (!n || !i.has(n.groups.name)) throw new Error(`Invalid POSIX class "${e}"`);
    return k$1("posix", e, { value: n.groups.name, negate: !!n.groups.negate });
  }
  return e === "-" ? U$1(e) : e === "&&" ? H(e) : d(r$2(e), e);
}
function x$1(e, { inCharClass: n }) {
  const t = e[1];
  if (t === "c" || t === "C") return Z(e);
  if ("dDhHsSwW".includes(t)) return q(e);
  if (e.startsWith(o$1`\o{`)) throw new Error(`Incomplete, invalid, or unsupported octal code point "${e}"`);
  if (/^\\[pP]\{/.test(e)) {
    if (e.length === 3) throw new Error(`Incomplete or invalid Unicode property "${e}"`);
    return V$1(e);
  }
  if (new RegExp("^\\\\x[89A-Fa-f]\\p{AHex}", "u").test(e)) try {
    const o2 = e.split(/\\x/).slice(1).map((i2) => parseInt(i2, 16)), s2 = new TextDecoder("utf-8", { ignoreBOM: true, fatal: true }).decode(new Uint8Array(o2)), a = new TextEncoder();
    return [...s2].map((i2) => {
      const l2 = [...a.encode(i2)].map((c) => `\\x${c.toString(16)}`).join("");
      return d(r$2(i2), l2);
    });
  } catch {
    throw new Error(`Multibyte code "${e}" incomplete or invalid in Oniguruma`);
  }
  if (t === "u" || t === "x") return d(J$1(e), e);
  if ($$1.has(t)) return d($$1.get(t), e);
  if (/\d/.test(t)) return W$1(n, e);
  if (e === "\\") throw new Error(o$1`Incomplete escape "\"`);
  if (t === "M") throw new Error(`Unsupported meta "${e}"`);
  if ([...e].length === 2) return d(e.codePointAt(1), e);
  throw new Error(`Unexpected escape "${e}"`);
}
function P$1(e) {
  return { type: "Alternator", raw: e };
}
function w$1(e, n) {
  return { type: "Assertion", kind: e, raw: n };
}
function A$1(e) {
  return { type: "Backreference", raw: e };
}
function d(e, n) {
  return { type: "Character", value: e, raw: n };
}
function z$1(e) {
  return { type: "CharacterClassClose", raw: e };
}
function U$1(e) {
  return { type: "CharacterClassHyphen", raw: e };
}
function H(e) {
  return { type: "CharacterClassIntersector", raw: e };
}
function E$1(e, n) {
  return { type: "CharacterClassOpen", negate: e, raw: n };
}
function k$1(e, n, t = {}) {
  return { type: "CharacterSet", kind: e, ...t, raw: n };
}
function I$1(e, n, t = {}) {
  return e === "keep" ? { type: "Directive", kind: e, raw: n } : { type: "Directive", kind: e, flags: u(t.flags), raw: n };
}
function W$1(e, n) {
  return { type: "EscapedNumber", inCharClass: e, raw: n };
}
function Q$1(e) {
  return { type: "GroupClose", raw: e };
}
function f(e, n, t = {}) {
  return { type: "GroupOpen", kind: e, ...t, raw: n };
}
function D$1(e, n, t, o2) {
  return { type: "NamedCallout", kind: e, tag: n, arguments: t, raw: o2 };
}
function _$1(e, n, t, o2) {
  return { type: "Quantifier", kind: e, min: n, max: t, raw: o2 };
}
function R$1(e) {
  return { type: "Subroutine", raw: e };
}
const B$1 = /* @__PURE__ */ new Set(["COUNT", "CMP", "ERROR", "FAIL", "MAX", "MISMATCH", "SKIP", "TOTAL_COUNT"]), $$1 = /* @__PURE__ */ new Map([["a", 7], ["b", 8], ["e", 27], ["f", 12], ["n", 10], ["r", 13], ["t", 9], ["v", 11]]);
function Z(e) {
  const n = e[1] === "c" ? e[2] : e[3];
  if (!n || !/[A-Za-z]/.test(n)) throw new Error(`Unsupported control character "${e}"`);
  return d(r$2(n.toUpperCase()) - 64, e);
}
function L$1(e, n) {
  let { on: t, off: o2 } = /^\(\?(?<on>[imx]*)(?:-(?<off>[-imx]*))?/.exec(e).groups;
  o2 ??= "";
  const s2 = (n.getCurrentModX() || t.includes("x")) && !o2.includes("x"), a = v(t), r2 = v(o2), i2 = {};
  if (a && (i2.enable = a), r2 && (i2.disable = r2), e.endsWith(")")) return n.replaceCurrentModX(s2), I$1("flags", e, { flags: i2 });
  if (e.endsWith(":")) return n.pushModX(s2), n.numOpenGroups++, f("group", e, { ...(a || r2) && { flags: i2 } });
  throw new Error(`Unexpected flag modifier "${e}"`);
}
function j(e) {
  const n = /\(\*(?<name>[A-Za-z_]\w*)?(?:\[(?<tag>(?:[A-Za-z_]\w*)?)\])?(?:\{(?<args>[^}]*)\})?\)/.exec(e);
  if (!n) throw new Error(`Incomplete or invalid named callout "${e}"`);
  const { name: t, tag: o2, args: s2 } = n.groups;
  if (!t) throw new Error(`Invalid named callout "${e}"`);
  if (o2 === "") throw new Error(`Named callout tag with empty value not allowed "${e}"`);
  const a = s2 ? s2.split(",").filter((g) => g !== "").map((g) => /^[+-]?\d+$/.test(g) ? +g : g) : [], [r2, i2, l2] = a, c = B$1.has(t) ? t.toLowerCase() : "custom";
  switch (c) {
    case "fail":
    case "mismatch":
    case "skip":
      if (a.length > 0) throw new Error(`Named callout arguments not allowed "${a}"`);
      break;
    case "error":
      if (a.length > 1) throw new Error(`Named callout allows only one argument "${a}"`);
      if (typeof r2 == "string") throw new Error(`Named callout argument must be a number "${r2}"`);
      break;
    case "max":
      if (!a.length || a.length > 2) throw new Error(`Named callout must have one or two arguments "${a}"`);
      if (typeof r2 == "string" && !/^[A-Za-z_]\w*$/.test(r2)) throw new Error(`Named callout argument one must be a tag or number "${r2}"`);
      if (a.length === 2 && (typeof i2 == "number" || !/^[<>X]$/.test(i2))) throw new Error(`Named callout optional argument two must be '<', '>', or 'X' "${i2}"`);
      break;
    case "count":
    case "total_count":
      if (a.length > 1) throw new Error(`Named callout allows only one argument "${a}"`);
      if (a.length === 1 && (typeof r2 == "number" || !/^[<>X]$/.test(r2))) throw new Error(`Named callout optional argument must be '<', '>', or 'X' "${r2}"`);
      break;
    case "cmp":
      if (a.length !== 3) throw new Error(`Named callout must have three arguments "${a}"`);
      if (typeof r2 == "string" && !/^[A-Za-z_]\w*$/.test(r2)) throw new Error(`Named callout argument one must be a tag or number "${r2}"`);
      if (typeof i2 == "number" || !/^(?:[<>!=]=|[<>])$/.test(i2)) throw new Error(`Named callout argument two must be '==', '!=', '>', '<', '>=', or '<=' "${i2}"`);
      if (typeof l2 == "string" && !/^[A-Za-z_]\w*$/.test(l2)) throw new Error(`Named callout argument three must be a tag or number "${l2}"`);
      break;
    case "custom":
      throw new Error(`Undefined callout name "${t}"`);
    default:
      throw new Error(`Unexpected named callout kind "${c}"`);
  }
  return D$1(c, o2 ?? null, s2?.split(",") ?? null, e);
}
function O$1(e) {
  let n = null, t, o2;
  if (e[0] === "{") {
    const { minStr: s2, maxStr: a } = /^\{(?<minStr>\d*)(?:,(?<maxStr>\d*))?/.exec(e).groups, r2 = 1e5;
    if (+s2 > r2 || a && +a > r2) throw new Error("Quantifier value unsupported in Oniguruma");
    if (t = +s2, o2 = a === void 0 ? +s2 : a === "" ? 1 / 0 : +a, t > o2 && (n = "possessive", [t, o2] = [o2, t]), e.endsWith("?")) {
      if (n === "possessive") throw new Error('Unsupported possessive interval quantifier chain with "?"');
      n = "lazy";
    } else n || (n = "greedy");
  } else t = e[0] === "+" ? 1 : 0, o2 = e[0] === "?" ? 1 : 1 / 0, n = e[1] === "+" ? "possessive" : e[1] === "?" ? "lazy" : "greedy";
  return _$1(n, t, o2, e);
}
function q(e) {
  const n = e[1].toLowerCase();
  return k$1({ d: "digit", h: "hex", s: "space", w: "word" }[n], e, { negate: e[1] !== n });
}
function V$1(e) {
  const { p: n, neg: t, value: o2 } = /^\\(?<p>[pP])\{(?<neg>\^?)(?<value>[^}]+)/.exec(e).groups;
  return k$1("property", e, { value: o2, negate: n === "P" && !t || n === "p" && !!t });
}
function v(e) {
  const n = {};
  return e.includes("i") && (n.ignoreCase = true), e.includes("m") && (n.dotAll = true), e.includes("x") && (n.extended = true), Object.keys(n).length ? n : null;
}
function Y(e) {
  const n = { ignoreCase: false, dotAll: false, extended: false, digitIsAscii: false, posixIsAscii: false, spaceIsAscii: false, wordIsAscii: false, textSegmentMode: null };
  for (let t = 0; t < e.length; t++) {
    const o2 = e[t];
    if (!"imxDPSWy".includes(o2)) throw new Error(`Invalid flag "${o2}"`);
    if (o2 === "y") {
      if (!/^y{[gw]}/.test(e.slice(t))) throw new Error('Invalid or unspecified flag "y" mode');
      n.textSegmentMode = e[t + 2] === "g" ? "grapheme" : "word", t += 3;
      continue;
    }
    n[{ i: "ignoreCase", m: "dotAll", x: "extended", D: "digitIsAscii", P: "posixIsAscii", S: "spaceIsAscii", W: "wordIsAscii" }[o2]] = true;
  }
  return n;
}
function J$1(e) {
  if (new RegExp("^(?:\\\\u(?!\\p{AHex}{4})|\\\\x(?!\\p{AHex}{1,2}|\\{\\p{AHex}{1,8}\\}))", "u").test(e)) throw new Error(`Incomplete or invalid escape "${e}"`);
  const n = e[2] === "{" ? new RegExp("^\\\\x\\{\\s*(?<hex>\\p{AHex}+)", "u").exec(e).groups.hex : e.slice(2);
  return parseInt(n, 16);
}
function ee$1(e, n) {
  const { raw: t, inCharClass: o2 } = e, s2 = t.slice(1);
  if (!o2 && (s2 !== "0" && s2.length === 1 || s2[0] !== "0" && +s2 <= n)) return [A$1(t)];
  const a = [], r2 = s2.match(/^[0-7]+|\d/g);
  for (let i2 = 0; i2 < r2.length; i2++) {
    const l2 = r2[i2];
    let c;
    if (i2 === 0 && l2 !== "8" && l2 !== "9") {
      if (c = parseInt(l2, 8), c > 127) throw new Error(o$1`Octal encoded byte above 177 unsupported "${t}"`);
    } else c = r$2(l2);
    a.push(d(c, (i2 === 0 ? "\\" : "") + l2));
  }
  return a;
}
function te$1(e) {
  const n = [], t = new RegExp(y$1, "gy");
  let o2;
  for (; o2 = t.exec(e); ) {
    const s2 = o2[0];
    if (s2[0] === "{") {
      const a = /^\{(?<min>\d+),(?<max>\d+)\}\??$/.exec(s2);
      if (a) {
        const { min: r2, max: i2 } = a.groups;
        if (+r2 > +i2 && s2.endsWith("?")) {
          t.lastIndex--, n.push(O$1(s2.slice(0, -1)));
          continue;
        }
      }
    }
    n.push(O$1(s2));
  }
  return n;
}
function o(e, t) {
  if (!Array.isArray(e.body)) throw new Error("Expected node with body array");
  if (e.body.length !== 1) return false;
  const r2 = e.body[0];
  return !t || Object.keys(t).every((n) => t[n] === r2[n]);
}
function s(e) {
  return y.has(e.type);
}
const y = /* @__PURE__ */ new Set(["AbsenceFunction", "Backreference", "CapturingGroup", "Character", "CharacterClass", "CharacterSet", "Group", "Quantifier", "Subroutine"]);
function J(e, r2 = {}) {
  const n = { flags: "", normalizeUnknownPropertyNames: false, skipBackrefValidation: false, skipLookbehindValidation: false, skipPropertyNameValidation: false, unicodePropertyMap: null, ...r2, rules: { captureGroup: false, singleline: false, ...r2.rules } }, o2 = M$1(e, { flags: n.flags, rules: { captureGroup: n.rules.captureGroup, singleline: n.rules.singleline } }), i2 = (p2, N) => {
    const u2 = o2.tokens[t.nextIndex];
    switch (t.parent = p2, t.nextIndex++, u2.type) {
      case "Alternator":
        return b();
      case "Assertion":
        return W(u2);
      case "Backreference":
        return X(u2, t);
      case "Character":
        return m(u2.value, { useLastValid: !!N.isCheckingRangeEnd });
      case "CharacterClassHyphen":
        return ee(u2, t, N);
      case "CharacterClassOpen":
        return re(u2, t, N);
      case "CharacterSet":
        return ne(u2, t);
      case "Directive":
        return I(u2.kind, { flags: u2.flags });
      case "GroupOpen":
        return te(u2, t, N);
      case "NamedCallout":
        return U(u2.kind, u2.tag, u2.arguments);
      case "Quantifier":
        return oe(u2, t);
      case "Subroutine":
        return ae(u2, t);
      default:
        throw new Error(`Unexpected token type "${u2.type}"`);
    }
  }, t = { capturingGroups: [], hasNumberedRef: false, namedGroupsByName: /* @__PURE__ */ new Map(), nextIndex: 0, normalizeUnknownPropertyNames: n.normalizeUnknownPropertyNames, parent: null, skipBackrefValidation: n.skipBackrefValidation, skipLookbehindValidation: n.skipLookbehindValidation, skipPropertyNameValidation: n.skipPropertyNameValidation, subroutines: [], tokens: o2.tokens, unicodePropertyMap: n.unicodePropertyMap, walk: i2 }, d2 = B(T(o2.flags));
  let s2 = d2.body[0];
  for (; t.nextIndex < o2.tokens.length; ) {
    const p2 = i2(s2, {});
    p2.type === "Alternative" ? (d2.body.push(p2), s2 = p2) : s2.body.push(p2);
  }
  const { capturingGroups: a, hasNumberedRef: l2, namedGroupsByName: c, subroutines: f2 } = t;
  if (l2 && c.size && !n.rules.captureGroup) throw new Error("Numbered backref/subroutine not allowed when using named capture");
  for (const { ref: p2 } of f2) if (typeof p2 == "number") {
    if (p2 > a.length) throw new Error("Subroutine uses a group number that's not defined");
    p2 && (a[p2 - 1].isSubroutined = true);
  } else if (c.has(p2)) {
    if (c.get(p2).length > 1) throw new Error(o$1`Subroutine uses a duplicate group name "\g<${p2}>"`);
    c.get(p2)[0].isSubroutined = true;
  } else throw new Error(o$1`Subroutine uses a group name that's not defined "\g<${p2}>"`);
  return d2;
}
function W({ kind: e }) {
  return F(u({ "^": "line_start", $: "line_end", "\\A": "string_start", "\\b": "word_boundary", "\\B": "word_boundary", "\\G": "search_start", "\\y": "text_segment_boundary", "\\Y": "text_segment_boundary", "\\z": "string_end", "\\Z": "string_end_newline" }[e], `Unexpected assertion kind "${e}"`), { negate: e === o$1`\B` || e === o$1`\Y` });
}
function X({ raw: e }, r2) {
  const n = /^\\k[<']/.test(e), o2 = n ? e.slice(3, -1) : e.slice(1), i2 = (t, d2 = false) => {
    const s2 = r2.capturingGroups.length;
    let a = false;
    if (t > s2) if (r2.skipBackrefValidation) a = true;
    else throw new Error(`Not enough capturing groups defined to the left "${e}"`);
    return r2.hasNumberedRef = true, k(d2 ? s2 + 1 - t : t, { orphan: a });
  };
  if (n) {
    const t = /^(?<sign>-?)0*(?<num>[1-9]\d*)$/.exec(o2);
    if (t) return i2(+t.groups.num, !!t.groups.sign);
    if (/[-+]/.test(o2)) throw new Error(`Invalid backref name "${e}"`);
    if (!r2.namedGroupsByName.has(o2)) throw new Error(`Group name not defined to the left "${e}"`);
    return k(o2);
  }
  return i2(+o2);
}
function ee(e, r2, n) {
  const { tokens: o2, walk: i2 } = r2, t = r2.parent, d2 = t.body.at(-1), s2 = o2[r2.nextIndex];
  if (!n.isCheckingRangeEnd && d2 && d2.type !== "CharacterClass" && d2.type !== "CharacterClassRange" && s2 && s2.type !== "CharacterClassOpen" && s2.type !== "CharacterClassClose" && s2.type !== "CharacterClassIntersector") {
    const a = i2(t, { ...n, isCheckingRangeEnd: true });
    if (d2.type === "Character" && a.type === "Character") return t.body.pop(), L(d2, a);
    throw new Error("Invalid character class range");
  }
  return m(r$2("-"));
}
function re({ negate: e }, r2, n) {
  const { tokens: o2, walk: i2 } = r2, t = [C()], d2 = o2[r2.nextIndex];
  let s2 = z(d2);
  for (; s2.type !== "CharacterClassClose"; ) {
    if (s2.type === "CharacterClassIntersector") t.push(C()), r2.nextIndex++;
    else {
      const l2 = t.at(-1);
      l2.body.push(i2(l2, n));
    }
    s2 = z(o2[r2.nextIndex], d2);
  }
  const a = C({ negate: e });
  return t.length === 1 ? a.body = t[0].body : (a.kind = "intersection", a.body = t.map((l2) => l2.body.length === 1 ? l2.body[0] : l2)), r2.nextIndex++, a;
}
function ne({ kind: e, negate: r2, value: n }, o2) {
  const { normalizeUnknownPropertyNames: i$1, skipPropertyNameValidation: t, unicodePropertyMap: d2 } = o2;
  if (e === "property") {
    const s2 = w(n);
    if (i.has(s2) && !d2?.has(s2)) e = "posix", n = s2;
    else return Q(n, { negate: r2, normalizeUnknownPropertyNames: i$1, skipPropertyNameValidation: t, unicodePropertyMap: d2 });
  }
  return e === "posix" ? R(n, { negate: r2 }) : E(e, { negate: r2 });
}
function te(e, r2, n) {
  const { tokens: o2, capturingGroups: i2, namedGroupsByName: t, skipLookbehindValidation: d2, walk: s2 } = r2, a = ie(e), l2 = a.type === "AbsenceFunction", c = $(a), f2 = c && a.negate;
  if (a.type === "CapturingGroup" && (i2.push(a), a.name && l$1(t, a.name, []).push(a)), l2 && n.isInAbsenceFunction) throw new Error("Nested absence function not supported by Oniguruma");
  let p2 = D(o2[r2.nextIndex]);
  for (; p2.type !== "GroupClose"; ) {
    if (p2.type === "Alternator") a.body.push(b()), r2.nextIndex++;
    else {
      const N = a.body.at(-1), u2 = s2(N, { ...n, isInAbsenceFunction: n.isInAbsenceFunction || l2, isInLookbehind: n.isInLookbehind || c, isInNegLookbehind: n.isInNegLookbehind || f2 });
      if (N.body.push(u2), (c || n.isInLookbehind) && !d2) {
        const v2 = "Lookbehind includes a pattern not allowed by Oniguruma";
        if (f2 || n.isInNegLookbehind) {
          if (M(u2) || u2.type === "CapturingGroup") throw new Error(v2);
        } else if (M(u2) || $(u2) && u2.negate) throw new Error(v2);
      }
    }
    p2 = D(o2[r2.nextIndex]);
  }
  return r2.nextIndex++, a;
}
function oe({ kind: e, min: r2, max: n }, o2) {
  const i2 = o2.parent, t = i2.body.at(-1);
  if (!t || !s(t)) throw new Error("Quantifier requires a repeatable token");
  const d2 = _(e, r2, n, t);
  return i2.body.pop(), d2;
}
function ae({ raw: e }, r2) {
  const { capturingGroups: n, subroutines: o2 } = r2;
  let i2 = e.slice(3, -1);
  const t = /^(?<sign>[-+]?)0*(?<num>[1-9]\d*)$/.exec(i2);
  if (t) {
    const s2 = +t.groups.num, a = n.length;
    if (r2.hasNumberedRef = true, i2 = { "": s2, "+": a + s2, "-": a + 1 - s2 }[t.groups.sign], i2 < 1) throw new Error("Invalid subroutine number");
  } else i2 === "0" && (i2 = 0);
  const d2 = O(i2);
  return o2.push(d2), d2;
}
function G(e, r2) {
  return { type: "AbsenceFunction", kind: e, body: h(r2?.body) };
}
function b(e) {
  return { type: "Alternative", body: V(e?.body) };
}
function F(e, r2) {
  const n = { type: "Assertion", kind: e };
  return (e === "word_boundary" || e === "text_segment_boundary") && (n.negate = !!r2?.negate), n;
}
function k(e, r2) {
  const n = !!r2?.orphan;
  return { type: "Backreference", ref: e, ...n && { orphan: n } };
}
function P(e, r2) {
  const n = { name: void 0, isSubroutined: false, ...r2 };
  if (n.name !== void 0 && !se(n.name)) throw new Error(`Group name "${n.name}" invalid in Oniguruma`);
  return { type: "CapturingGroup", number: e, ...n.name && { name: n.name }, ...n.isSubroutined && { isSubroutined: n.isSubroutined }, body: h(r2?.body) };
}
function m(e, r2) {
  const n = { useLastValid: false, ...r2 };
  if (e > 1114111) {
    const o2 = e.toString(16);
    if (n.useLastValid) e = 1114111;
    else throw e > 1310719 ? new Error(`Invalid code point out of range "\\x{${o2}}"`) : new Error(`Invalid code point out of range in JS "\\x{${o2}}"`);
  }
  return { type: "Character", value: e };
}
function C(e) {
  const r2 = { kind: "union", negate: false, ...e };
  return { type: "CharacterClass", kind: r2.kind, negate: r2.negate, body: V(e?.body) };
}
function L(e, r2) {
  if (r2.value < e.value) throw new Error("Character class range out of order");
  return { type: "CharacterClassRange", min: e, max: r2 };
}
function E(e, r2) {
  const n = !!r2?.negate, o2 = { type: "CharacterSet", kind: e };
  return (e === "digit" || e === "hex" || e === "newline" || e === "space" || e === "word") && (o2.negate = n), (e === "text_segment" || e === "newline" && !n) && (o2.variableLength = true), o2;
}
function I(e, r2 = {}) {
  if (e === "keep") return { type: "Directive", kind: e };
  if (e === "flags") return { type: "Directive", kind: e, flags: u(r2.flags) };
  throw new Error(`Unexpected directive kind "${e}"`);
}
function T(e) {
  return { type: "Flags", ...e };
}
function A(e) {
  const r2 = e?.atomic, n = e?.flags;
  if (r2 && n) throw new Error("Atomic group cannot have flags");
  return { type: "Group", ...r2 && { atomic: r2 }, ...n && { flags: n }, body: h(e?.body) };
}
function K(e) {
  const r2 = { behind: false, negate: false, ...e };
  return { type: "LookaroundAssertion", kind: r2.behind ? "lookbehind" : "lookahead", negate: r2.negate, body: h(e?.body) };
}
function U(e, r2, n) {
  return { type: "NamedCallout", kind: e, tag: r2, arguments: n };
}
function R(e, r2) {
  const n = !!r2?.negate;
  if (!i.has(e)) throw new Error(`Invalid POSIX class "${e}"`);
  return { type: "CharacterSet", kind: "posix", value: e, negate: n };
}
function _(e, r2, n, o2) {
  if (r2 > n) throw new Error("Invalid reversed quantifier range");
  return { type: "Quantifier", kind: e, min: r2, max: n, body: o2 };
}
function B(e, r2) {
  return { type: "Regex", body: h(r2?.body), flags: e };
}
function O(e) {
  return { type: "Subroutine", ref: e };
}
function Q(e, r2) {
  const n = { negate: false, normalizeUnknownPropertyNames: false, skipPropertyNameValidation: false, unicodePropertyMap: null, ...r2 };
  let o2 = n.unicodePropertyMap?.get(w(e));
  if (!o2) {
    if (n.normalizeUnknownPropertyNames) o2 = de(e);
    else if (n.unicodePropertyMap && !n.skipPropertyNameValidation) throw new Error(o$1`Invalid Unicode property "\p{${e}}"`);
  }
  return { type: "CharacterSet", kind: "property", value: o2 ?? e, negate: n.negate };
}
function ie({ flags: e, kind: r2, name: n, negate: o2, number: i2 }) {
  switch (r2) {
    case "absence_repeater":
      return G("repeater");
    case "atomic":
      return A({ atomic: true });
    case "capturing":
      return P(i2, { name: n });
    case "group":
      return A({ flags: e });
    case "lookahead":
    case "lookbehind":
      return K({ behind: r2 === "lookbehind", negate: o2 });
    default:
      throw new Error(`Unexpected group kind "${r2}"`);
  }
}
function h(e) {
  if (e === void 0) e = [b()];
  else if (!Array.isArray(e) || !e.length || !e.every((r2) => r2.type === "Alternative")) throw new Error("Invalid body; expected array of one or more Alternative nodes");
  return e;
}
function V(e) {
  if (e === void 0) e = [];
  else if (!Array.isArray(e) || !e.every((r2) => !!r2.type)) throw new Error("Invalid body; expected array of nodes");
  return e;
}
function M(e) {
  return e.type === "LookaroundAssertion" && e.kind === "lookahead";
}
function $(e) {
  return e.type === "LookaroundAssertion" && e.kind === "lookbehind";
}
function se(e) {
  return /^[\p{Alpha}\p{Pc}][^)]*$/u.test(e);
}
function de(e) {
  return e.trim().replace(/[- _]+/g, "_").replace(/[A-Z][a-z]+(?=[A-Z])/g, "$&_").replace(/[A-Za-z]+/g, (r2) => r2[0].toUpperCase() + r2.slice(1).toLowerCase());
}
function w(e) {
  return e.replace(/[- _]+/g, "").toLowerCase();
}
function z(e, r2) {
  const n = r2;
  return u(e, `Unclosed character class${n?.type === "Character" && n.value === 93 && n.raw === "]" ? ' (started with "]")' : ""}`);
}
function D(e) {
  return u(e, "Unclosed group");
}
function S(a, v2, N = null) {
  function b2(e, s2) {
    for (let t = 0; t < e.length; t++) {
      const r2 = n(e[t], s2, t, e);
      t = Math.max(-1, t + r2);
    }
  }
  function n(e, s2 = null, t = null, r2 = null) {
    let i2 = 0, c = false;
    const d2 = { node: e, parent: s2, key: t, container: r2, root: a, remove() {
      x(r2).splice(Math.max(0, l(t) + i2), 1), i2--, c = true;
    }, removeAllNextSiblings() {
      return x(r2).splice(l(t) + 1);
    }, removeAllPrevSiblings() {
      const o2 = l(t) + i2;
      return i2 -= o2, x(r2).splice(0, Math.max(0, o2));
    }, replaceWith(o2, m2 = {}) {
      const y2 = !!m2.traverse;
      r2 ? r2[Math.max(0, l(t) + i2)] = o2 : u(s2, "Can't replace root node")[t] = o2, y2 && n(o2, s2, t, r2), c = true;
    }, replaceWithMultiple(o2, m2 = {}) {
      const y2 = !!m2.traverse;
      if (x(r2).splice(Math.max(0, l(t) + i2), 1, ...o2), i2 += o2.length - 1, y2) {
        let g = 0;
        for (let p2 = 0; p2 < o2.length; p2++) g += n(o2[p2], s2, l(t) + p2 + g, r2);
      }
      c = true;
    }, skip() {
      c = true;
    } }, { type: f2 } = e, u$1 = v2["*"], h2 = v2[f2], R2 = typeof u$1 == "function" ? u$1 : u$1?.enter, P2 = typeof h2 == "function" ? h2 : h2?.enter;
    if (R2?.(d2, N), P2?.(d2, N), !c) switch (f2) {
      case "AbsenceFunction":
      case "Alternative":
      case "CapturingGroup":
      case "CharacterClass":
      case "Group":
      case "LookaroundAssertion":
        b2(e.body, e);
        break;
      case "Assertion":
      case "Backreference":
      case "Character":
      case "CharacterSet":
      case "Directive":
      case "Flags":
      case "NamedCallout":
      case "Subroutine":
        break;
      case "CharacterClassRange":
        n(e.min, e, "min"), n(e.max, e, "max");
        break;
      case "Quantifier":
        n(e.body, e, "body");
        break;
      case "Regex":
        b2(e.body, e), n(e.flags, e, "flags");
        break;
      default:
        throw new Error(`Unexpected node type "${f2}"`);
    }
    return h2?.exit?.(d2, N), u$1?.exit?.(d2, N), i2;
  }
  return n(a), a;
}
function x(a) {
  if (!Array.isArray(a)) throw new Error("Container expected");
  return a;
}
function l(a) {
  if (typeof a != "number") throw new Error("Numeric key expected");
  return a;
}
const noncapturingDelim = String.raw`\(\?(?:[:=!>A-Za-z\-]|<[=!]|\(DEFINE\))`;
function incrementIfAtLeast$1(arr, threshold) {
  for (let i2 = 0; i2 < arr.length; i2++) {
    if (arr[i2] >= threshold) {
      arr[i2]++;
    }
  }
}
function spliceStr(str, pos, oldValue, newValue) {
  return str.slice(0, pos) + newValue + str.slice(pos + oldValue.length);
}
const Context = Object.freeze({
  DEFAULT: "DEFAULT",
  CHAR_CLASS: "CHAR_CLASS"
});
function replaceUnescaped(expression, needle, replacement, context) {
  const re2 = new RegExp(String.raw`${needle}|(?<$skip>\[\^?|\\?.)`, "gsu");
  const negated = [false];
  let numCharClassesOpen = 0;
  let result = "";
  for (const match of expression.matchAll(re2)) {
    const { 0: m2, groups: { $skip } } = match;
    if (!$skip && (!context || context === Context.DEFAULT === !numCharClassesOpen)) {
      if (replacement instanceof Function) {
        result += replacement(match, {
          context: numCharClassesOpen ? Context.CHAR_CLASS : Context.DEFAULT,
          negated: negated[negated.length - 1]
        });
      } else {
        result += replacement;
      }
      continue;
    }
    if (m2[0] === "[") {
      numCharClassesOpen++;
      negated.push(m2[1] === "^");
    } else if (m2 === "]" && numCharClassesOpen) {
      numCharClassesOpen--;
      negated.pop();
    }
    result += m2;
  }
  return result;
}
function forEachUnescaped(expression, needle, callback, context) {
  replaceUnescaped(expression, needle, callback, context);
}
function execUnescaped(expression, needle, pos = 0, context) {
  if (!new RegExp(needle, "su").test(expression)) {
    return null;
  }
  const re2 = new RegExp(`${needle}|(?<$skip>\\\\?.)`, "gsu");
  re2.lastIndex = pos;
  let numCharClassesOpen = 0;
  let match;
  while (match = re2.exec(expression)) {
    const { 0: m2, groups: { $skip } } = match;
    if (!$skip && (!context || context === Context.DEFAULT === !numCharClassesOpen)) {
      return match;
    }
    if (m2 === "[") {
      numCharClassesOpen++;
    } else if (m2 === "]" && numCharClassesOpen) {
      numCharClassesOpen--;
    }
    if (re2.lastIndex == match.index) {
      re2.lastIndex++;
    }
  }
  return null;
}
function hasUnescaped(expression, needle, context) {
  return !!execUnescaped(expression, needle, 0, context);
}
function getGroupContents(expression, contentsStartPos) {
  const token2 = /\\?./gsu;
  token2.lastIndex = contentsStartPos;
  let contentsEndPos = expression.length;
  let numCharClassesOpen = 0;
  let numGroupsOpen = 1;
  let match;
  while (match = token2.exec(expression)) {
    const [m2] = match;
    if (m2 === "[") {
      numCharClassesOpen++;
    } else if (!numCharClassesOpen) {
      if (m2 === "(") {
        numGroupsOpen++;
      } else if (m2 === ")") {
        numGroupsOpen--;
        if (!numGroupsOpen) {
          contentsEndPos = match.index;
          break;
        }
      }
    } else if (m2 === "]") {
      numCharClassesOpen--;
    }
  }
  return expression.slice(contentsStartPos, contentsEndPos);
}
const atomicPluginToken = new RegExp(String.raw`(?<noncapturingStart>${noncapturingDelim})|(?<capturingStart>\((?:\?<[^>]+>)?)|\\?.`, "gsu");
function atomic(expression, data) {
  const hiddenCaptures = data?.hiddenCaptures ?? [];
  let captureTransfers = data?.captureTransfers ?? /* @__PURE__ */ new Map();
  if (!/\(\?>/.test(expression)) {
    return {
      pattern: expression,
      captureTransfers,
      hiddenCaptures
    };
  }
  const aGDelim = "(?>";
  const emulatedAGDelim = "(?:(?=(";
  const captureNumMap = [0];
  const addedHiddenCaptures = [];
  let numCapturesBeforeAG = 0;
  let numAGs = 0;
  let aGPos = NaN;
  let hasProcessedAG;
  do {
    hasProcessedAG = false;
    let numCharClassesOpen = 0;
    let numGroupsOpenInAG = 0;
    let inAG = false;
    let match;
    atomicPluginToken.lastIndex = Number.isNaN(aGPos) ? 0 : aGPos + emulatedAGDelim.length;
    while (match = atomicPluginToken.exec(expression)) {
      const { 0: m2, index, groups: { capturingStart, noncapturingStart } } = match;
      if (m2 === "[") {
        numCharClassesOpen++;
      } else if (!numCharClassesOpen) {
        if (m2 === aGDelim && !inAG) {
          aGPos = index;
          inAG = true;
        } else if (inAG && noncapturingStart) {
          numGroupsOpenInAG++;
        } else if (capturingStart) {
          if (inAG) {
            numGroupsOpenInAG++;
          } else {
            numCapturesBeforeAG++;
            captureNumMap.push(numCapturesBeforeAG + numAGs);
          }
        } else if (m2 === ")" && inAG) {
          if (!numGroupsOpenInAG) {
            numAGs++;
            const addedCaptureNum = numCapturesBeforeAG + numAGs;
            expression = `${expression.slice(0, aGPos)}${emulatedAGDelim}${expression.slice(aGPos + aGDelim.length, index)}))<$$${addedCaptureNum}>)${expression.slice(index + 1)}`;
            hasProcessedAG = true;
            addedHiddenCaptures.push(addedCaptureNum);
            incrementIfAtLeast$1(hiddenCaptures, addedCaptureNum);
            if (captureTransfers.size) {
              const newCaptureTransfers = /* @__PURE__ */ new Map();
              captureTransfers.forEach((from, to) => {
                newCaptureTransfers.set(
                  to >= addedCaptureNum ? to + 1 : to,
                  from.map((f2) => f2 >= addedCaptureNum ? f2 + 1 : f2)
                );
              });
              captureTransfers = newCaptureTransfers;
            }
            break;
          }
          numGroupsOpenInAG--;
        }
      } else if (m2 === "]") {
        numCharClassesOpen--;
      }
    }
  } while (hasProcessedAG);
  hiddenCaptures.push(...addedHiddenCaptures);
  expression = replaceUnescaped(
    expression,
    String.raw`\\(?<backrefNum>[1-9]\d*)|<\$\$(?<wrappedBackrefNum>\d+)>`,
    ({ 0: m2, groups: { backrefNum, wrappedBackrefNum } }) => {
      if (backrefNum) {
        const bNum = +backrefNum;
        if (bNum > captureNumMap.length - 1) {
          throw new Error(`Backref "${m2}" greater than number of captures`);
        }
        return `\\${captureNumMap[bNum]}`;
      }
      return `\\${wrappedBackrefNum}`;
    },
    Context.DEFAULT
  );
  return {
    pattern: expression,
    captureTransfers,
    hiddenCaptures
  };
}
const baseQuantifier = String.raw`(?:[?*+]|\{\d+(?:,\d*)?\})`;
const possessivePluginToken = new RegExp(String.raw`
\\(?: \d+
  | c[A-Za-z]
  | [gk]<[^>]+>
  | [pPu]\{[^\}]+\}
  | u[A-Fa-f\d]{4}
  | x[A-Fa-f\d]{2}
  )
| \((?: \? (?: [:=!>]
  | <(?:[=!]|[^>]+>)
  | [A-Za-z\-]+:
  | \(DEFINE\)
  ))?
| (?<qBase>${baseQuantifier})(?<qMod>[?+]?)(?<invalidQ>[?*+\{]?)
| \\?.
`.replace(/\s+/g, ""), "gsu");
function possessive(expression) {
  if (!new RegExp(`${baseQuantifier}\\+`).test(expression)) {
    return {
      pattern: expression
    };
  }
  const openGroupIndices = [];
  let lastGroupIndex = null;
  let lastCharClassIndex = null;
  let lastToken = "";
  let numCharClassesOpen = 0;
  let match;
  possessivePluginToken.lastIndex = 0;
  while (match = possessivePluginToken.exec(expression)) {
    const { 0: m2, index, groups: { qBase, qMod, invalidQ } } = match;
    if (m2 === "[") {
      if (!numCharClassesOpen) {
        lastCharClassIndex = index;
      }
      numCharClassesOpen++;
    } else if (m2 === "]") {
      if (numCharClassesOpen) {
        numCharClassesOpen--;
      } else {
        lastCharClassIndex = null;
      }
    } else if (!numCharClassesOpen) {
      if (qMod === "+" && lastToken && !lastToken.startsWith("(")) {
        if (invalidQ) {
          throw new Error(`Invalid quantifier "${m2}"`);
        }
        let charsAdded = -1;
        if (/^\{\d+\}$/.test(qBase)) {
          expression = spliceStr(expression, index + qBase.length, qMod, "");
        } else {
          if (lastToken === ")" || lastToken === "]") {
            const nodeIndex = lastToken === ")" ? lastGroupIndex : lastCharClassIndex;
            if (nodeIndex === null) {
              throw new Error(`Invalid unmatched "${lastToken}"`);
            }
            expression = `${expression.slice(0, nodeIndex)}(?>${expression.slice(nodeIndex, index)}${qBase})${expression.slice(index + m2.length)}`;
          } else {
            expression = `${expression.slice(0, index - lastToken.length)}(?>${lastToken}${qBase})${expression.slice(index + m2.length)}`;
          }
          charsAdded += 4;
        }
        possessivePluginToken.lastIndex += charsAdded;
      } else if (m2[0] === "(") {
        openGroupIndices.push(index);
      } else if (m2 === ")") {
        lastGroupIndex = openGroupIndices.length ? openGroupIndices.pop() : null;
      }
    }
    lastToken = m2;
  }
  return {
    pattern: expression
  };
}
const r$1 = String.raw;
const gRToken = r$1`\\g<(?<gRNameOrNum>[^>&]+)&R=(?<gRDepth>[^>]+)>`;
const recursiveToken = r$1`\(\?R=(?<rDepth>[^\)]+)\)|${gRToken}`;
const namedCaptureDelim = r$1`\(\?<(?![=!])(?<captureName>[^>]+)>`;
const captureDelim = r$1`${namedCaptureDelim}|(?<unnamed>\()(?!\?)`;
const token = new RegExp(r$1`${namedCaptureDelim}|${recursiveToken}|\(\?|\\?.`, "gsu");
const overlappingRecursionMsg = "Cannot use multiple overlapping recursions";
function recursion(pattern, data) {
  const { hiddenCaptures, mode } = {
    hiddenCaptures: [],
    mode: "plugin",
    ...data
  };
  let captureTransfers = data?.captureTransfers ?? /* @__PURE__ */ new Map();
  if (!new RegExp(recursiveToken, "su").test(pattern)) {
    return {
      pattern,
      captureTransfers,
      hiddenCaptures
    };
  }
  if (mode === "plugin" && hasUnescaped(pattern, r$1`\(\?\(DEFINE\)`, Context.DEFAULT)) {
    throw new Error("DEFINE groups cannot be used with recursion");
  }
  const addedHiddenCaptures = [];
  const hasNumberedBackref = hasUnescaped(pattern, r$1`\\[1-9]`, Context.DEFAULT);
  const groupContentsStartPos = /* @__PURE__ */ new Map();
  const openGroups = [];
  let hasRecursed = false;
  let numCharClassesOpen = 0;
  let numCapturesPassed = 0;
  let match;
  token.lastIndex = 0;
  while (match = token.exec(pattern)) {
    const { 0: m2, groups: { captureName, rDepth, gRNameOrNum, gRDepth } } = match;
    if (m2 === "[") {
      numCharClassesOpen++;
    } else if (!numCharClassesOpen) {
      if (rDepth) {
        assertMaxInBounds(rDepth);
        if (hasRecursed) {
          throw new Error(overlappingRecursionMsg);
        }
        if (hasNumberedBackref) {
          throw new Error(
            // When used in `external` mode by transpilers other than Regex+, backrefs might have
            // gone through conversion from named to numbered, so avoid a misleading error
            `${mode === "external" ? "Backrefs" : "Numbered backrefs"} cannot be used with global recursion`
          );
        }
        const left = pattern.slice(0, match.index);
        const right = pattern.slice(token.lastIndex);
        if (hasUnescaped(right, recursiveToken, Context.DEFAULT)) {
          throw new Error(overlappingRecursionMsg);
        }
        const reps = +rDepth - 1;
        pattern = makeRecursive(
          left,
          right,
          reps,
          false,
          hiddenCaptures,
          addedHiddenCaptures,
          numCapturesPassed
        );
        captureTransfers = mapCaptureTransfers(
          captureTransfers,
          left,
          reps,
          addedHiddenCaptures.length,
          0,
          numCapturesPassed
        );
        break;
      } else if (gRNameOrNum) {
        assertMaxInBounds(gRDepth);
        let isWithinReffedGroup = false;
        for (const g of openGroups) {
          if (g.name === gRNameOrNum || g.num === +gRNameOrNum) {
            isWithinReffedGroup = true;
            if (g.hasRecursedWithin) {
              throw new Error(overlappingRecursionMsg);
            }
            break;
          }
        }
        if (!isWithinReffedGroup) {
          throw new Error(r$1`Recursive \g cannot be used outside the referenced group "${mode === "external" ? gRNameOrNum : r$1`\g<${gRNameOrNum}&R=${gRDepth}>`}"`);
        }
        const startPos = groupContentsStartPos.get(gRNameOrNum);
        const groupContents = getGroupContents(pattern, startPos);
        if (hasNumberedBackref && hasUnescaped(groupContents, r$1`${namedCaptureDelim}|\((?!\?)`, Context.DEFAULT)) {
          throw new Error(
            // When used in `external` mode by transpilers other than Regex+, backrefs might have
            // gone through conversion from named to numbered, so avoid a misleading error
            `${mode === "external" ? "Backrefs" : "Numbered backrefs"} cannot be used with recursion of capturing groups`
          );
        }
        const groupContentsLeft = pattern.slice(startPos, match.index);
        const groupContentsRight = groupContents.slice(groupContentsLeft.length + m2.length);
        const numAddedHiddenCapturesPreExpansion = addedHiddenCaptures.length;
        const reps = +gRDepth - 1;
        const expansion = makeRecursive(
          groupContentsLeft,
          groupContentsRight,
          reps,
          true,
          hiddenCaptures,
          addedHiddenCaptures,
          numCapturesPassed
        );
        captureTransfers = mapCaptureTransfers(
          captureTransfers,
          groupContentsLeft,
          reps,
          addedHiddenCaptures.length - numAddedHiddenCapturesPreExpansion,
          numAddedHiddenCapturesPreExpansion,
          numCapturesPassed
        );
        const pre = pattern.slice(0, startPos);
        const post = pattern.slice(startPos + groupContents.length);
        pattern = `${pre}${expansion}${post}`;
        token.lastIndex += expansion.length - m2.length - groupContentsLeft.length - groupContentsRight.length;
        openGroups.forEach((g) => g.hasRecursedWithin = true);
        hasRecursed = true;
      } else if (captureName) {
        numCapturesPassed++;
        groupContentsStartPos.set(String(numCapturesPassed), token.lastIndex);
        groupContentsStartPos.set(captureName, token.lastIndex);
        openGroups.push({
          num: numCapturesPassed,
          name: captureName
        });
      } else if (m2[0] === "(") {
        const isUnnamedCapture = m2 === "(";
        if (isUnnamedCapture) {
          numCapturesPassed++;
          groupContentsStartPos.set(String(numCapturesPassed), token.lastIndex);
        }
        openGroups.push(isUnnamedCapture ? { num: numCapturesPassed } : {});
      } else if (m2 === ")") {
        openGroups.pop();
      }
    } else if (m2 === "]") {
      numCharClassesOpen--;
    }
  }
  hiddenCaptures.push(...addedHiddenCaptures);
  return {
    pattern,
    captureTransfers,
    hiddenCaptures
  };
}
function assertMaxInBounds(max) {
  const errMsg = `Max depth must be integer between 2 and 100; used ${max}`;
  if (!/^[1-9]\d*$/.test(max)) {
    throw new Error(errMsg);
  }
  max = +max;
  if (max < 2 || max > 100) {
    throw new Error(errMsg);
  }
}
function makeRecursive(left, right, reps, isSubpattern, hiddenCaptures, addedHiddenCaptures, numCapturesPassed) {
  const namesInRecursed = /* @__PURE__ */ new Set();
  if (isSubpattern) {
    forEachUnescaped(left + right, namedCaptureDelim, ({ groups: { captureName } }) => {
      namesInRecursed.add(captureName);
    }, Context.DEFAULT);
  }
  const rest = [
    reps,
    isSubpattern ? namesInRecursed : null,
    hiddenCaptures,
    addedHiddenCaptures,
    numCapturesPassed
  ];
  return `${left}${repeatWithDepth(`(?:${left}`, "forward", ...rest)}(?:)${repeatWithDepth(`${right})`, "backward", ...rest)}${right}`;
}
function repeatWithDepth(pattern, direction, reps, namesInRecursed, hiddenCaptures, addedHiddenCaptures, numCapturesPassed) {
  const startNum = 2;
  const getDepthNum = (i2) => direction === "forward" ? i2 + startNum : reps - i2 + startNum - 1;
  let result = "";
  for (let i2 = 0; i2 < reps; i2++) {
    const depthNum = getDepthNum(i2);
    result += replaceUnescaped(
      pattern,
      r$1`${captureDelim}|\\k<(?<backref>[^>]+)>`,
      ({ 0: m2, groups: { captureName, unnamed, backref } }) => {
        if (backref && namesInRecursed && !namesInRecursed.has(backref)) {
          return m2;
        }
        const suffix = `_$${depthNum}`;
        if (unnamed || captureName) {
          const addedCaptureNum = numCapturesPassed + addedHiddenCaptures.length + 1;
          addedHiddenCaptures.push(addedCaptureNum);
          incrementIfAtLeast(hiddenCaptures, addedCaptureNum);
          return unnamed ? m2 : `(?<${captureName}${suffix}>`;
        }
        return r$1`\k<${backref}${suffix}>`;
      },
      Context.DEFAULT
    );
  }
  return result;
}
function incrementIfAtLeast(arr, threshold) {
  for (let i2 = 0; i2 < arr.length; i2++) {
    if (arr[i2] >= threshold) {
      arr[i2]++;
    }
  }
}
function mapCaptureTransfers(captureTransfers, left, reps, numCapturesAddedInExpansion, numAddedHiddenCapturesPreExpansion, numCapturesPassed) {
  if (captureTransfers.size && numCapturesAddedInExpansion) {
    let numCapturesInLeft = 0;
    forEachUnescaped(left, captureDelim, () => numCapturesInLeft++, Context.DEFAULT);
    const recursionDelimCaptureNum = numCapturesPassed - numCapturesInLeft + numAddedHiddenCapturesPreExpansion;
    const newCaptureTransfers = /* @__PURE__ */ new Map();
    captureTransfers.forEach((from, to) => {
      const numCapturesInRight = (numCapturesAddedInExpansion - numCapturesInLeft * reps) / reps;
      const numCapturesAddedInLeft = numCapturesInLeft * reps;
      const newTo = to > recursionDelimCaptureNum + numCapturesInLeft ? to + numCapturesAddedInExpansion : to;
      const newFrom = [];
      for (const f2 of from) {
        if (f2 <= recursionDelimCaptureNum) {
          newFrom.push(f2);
        } else if (f2 > recursionDelimCaptureNum + numCapturesInLeft + numCapturesInRight) {
          newFrom.push(f2 + numCapturesAddedInExpansion);
        } else if (f2 <= recursionDelimCaptureNum + numCapturesInLeft) {
          for (let i2 = 0; i2 <= reps; i2++) {
            newFrom.push(f2 + numCapturesInLeft * i2);
          }
        } else {
          for (let i2 = 0; i2 <= reps; i2++) {
            newFrom.push(f2 + numCapturesAddedInLeft + numCapturesInRight * i2);
          }
        }
      }
      newCaptureTransfers.set(newTo, newFrom);
    });
    return newCaptureTransfers;
  }
  return captureTransfers;
}
var cp = String.fromCodePoint;
var r = String.raw;
var envFlags = {};
var globalRegExp = globalThis.RegExp;
envFlags.flagGroups = (() => {
  try {
    new globalRegExp("(?i:)");
  } catch {
    return false;
  }
  return true;
})();
envFlags.unicodeSets = (() => {
  try {
    new globalRegExp("[[]]", "v");
  } catch {
    return false;
  }
  return true;
})();
envFlags.bugFlagVLiteralHyphenIsRange = envFlags.unicodeSets ? (() => {
  try {
    new globalRegExp(r`[\d\-a]`, "v");
  } catch {
    return true;
  }
  return false;
})() : false;
envFlags.bugNestedClassIgnoresNegation = envFlags.unicodeSets && new globalRegExp("[[^a]]", "v").test("a");
function getNewCurrentFlags(current, { enable, disable }) {
  return {
    dotAll: !disable?.dotAll && !!(enable?.dotAll || current.dotAll),
    ignoreCase: !disable?.ignoreCase && !!(enable?.ignoreCase || current.ignoreCase)
  };
}
function getOrInsert(map, key2, defaultValue) {
  if (!map.has(key2)) {
    map.set(key2, defaultValue);
  }
  return map.get(key2);
}
function isMinTarget(target, min) {
  return EsVersion[target] >= EsVersion[min];
}
function throwIfNullish(value, msg) {
  if (value == null) {
    throw new Error(msg ?? "Value expected");
  }
  return value;
}
var EsVersion = {
  ES2025: 2025,
  ES2024: 2024,
  ES2018: 2018
};
var Target = (
  /** @type {const} */
  {
    auto: "auto",
    ES2025: "ES2025",
    ES2024: "ES2024",
    ES2018: "ES2018"
  }
);
function getOptions(options = {}) {
  if ({}.toString.call(options) !== "[object Object]") {
    throw new Error("Unexpected options");
  }
  if (options.target !== void 0 && !Target[options.target]) {
    throw new Error(`Unexpected target "${options.target}"`);
  }
  const opts = {
    // Sets the level of emulation rigor/strictness.
    accuracy: "default",
    // Disables advanced emulation that relies on returning a `RegExp` subclass, resulting in
    // certain patterns not being emulatable.
    avoidSubclass: false,
    // Oniguruma flags; a string with `i`, `m`, `x`, `D`, `S`, `W`, `y{g}` in any order (all
    // optional). Oniguruma's `m` is equivalent to JavaScript's `s` (`dotAll`).
    flags: "",
    // Include JavaScript flag `g` (`global`) in the result.
    global: false,
    // Include JavaScript flag `d` (`hasIndices`) in the result.
    hasIndices: false,
    // Delay regex construction until first use if the transpiled pattern is at least this length.
    lazyCompileLength: Infinity,
    // JavaScript version used for generated regexes. Using `auto` detects the best value based on
    // your environment. Later targets allow faster processing, simpler generated source, and
    // support for additional features.
    target: "auto",
    // Disables minifications that simplify the pattern without changing the meaning.
    verbose: false,
    ...options,
    // Advanced options that override standard behavior, error checking, and flags when enabled.
    rules: {
      // Useful with TextMate grammars that merge backreferences across patterns.
      allowOrphanBackrefs: false,
      // Use ASCII `\b` and `\B`, which increases search performance of generated regexes.
      asciiWordBoundaries: false,
      // Allow unnamed captures and numbered calls (backreferences and subroutines) when using
      // named capture. This is Oniguruma option `ONIG_OPTION_CAPTURE_GROUP`; on by default in
      // `vscode-oniguruma`.
      captureGroup: false,
      // Change the recursion depth limit from Oniguruma's `20` to an integer `2`–`20`.
      recursionLimit: 20,
      // `^` as `\A`; `$` as`\Z`. Improves search performance of generated regexes without changing
      // the meaning if searching line by line. This is Oniguruma option `ONIG_OPTION_SINGLELINE`.
      singleline: false,
      ...options.rules
    }
  };
  if (opts.target === "auto") {
    opts.target = envFlags.flagGroups ? "ES2025" : envFlags.unicodeSets ? "ES2024" : "ES2018";
  }
  return opts;
}
var asciiSpaceChar = "[	-\r ]";
var CharsWithoutIgnoreCaseExpansion = /* @__PURE__ */ new Set([
  cp(304),
  // İ
  cp(305)
  // ı
]);
var defaultWordChar = r`[\p{L}\p{M}\p{N}\p{Pc}]`;
function getIgnoreCaseMatchChars(char) {
  if (CharsWithoutIgnoreCaseExpansion.has(char)) {
    return [char];
  }
  const set = /* @__PURE__ */ new Set();
  const lower = char.toLowerCase();
  const upper = lower.toUpperCase();
  const title = LowerToTitleCaseMap.get(lower);
  const altLower = LowerToAlternativeLowerCaseMap.get(lower);
  const altUpper = LowerToAlternativeUpperCaseMap.get(lower);
  if ([...upper].length === 1) {
    set.add(upper);
  }
  altUpper && set.add(altUpper);
  title && set.add(title);
  set.add(lower);
  altLower && set.add(altLower);
  return [...set];
}
var JsUnicodePropertyMap = /* @__PURE__ */ new Map(
  `C Other
Cc Control cntrl
Cf Format
Cn Unassigned
Co Private_Use
Cs Surrogate
L Letter
LC Cased_Letter
Ll Lowercase_Letter
Lm Modifier_Letter
Lo Other_Letter
Lt Titlecase_Letter
Lu Uppercase_Letter
M Mark Combining_Mark
Mc Spacing_Mark
Me Enclosing_Mark
Mn Nonspacing_Mark
N Number
Nd Decimal_Number digit
Nl Letter_Number
No Other_Number
P Punctuation punct
Pc Connector_Punctuation
Pd Dash_Punctuation
Pe Close_Punctuation
Pf Final_Punctuation
Pi Initial_Punctuation
Po Other_Punctuation
Ps Open_Punctuation
S Symbol
Sc Currency_Symbol
Sk Modifier_Symbol
Sm Math_Symbol
So Other_Symbol
Z Separator
Zl Line_Separator
Zp Paragraph_Separator
Zs Space_Separator
ASCII
ASCII_Hex_Digit AHex
Alphabetic Alpha
Any
Assigned
Bidi_Control Bidi_C
Bidi_Mirrored Bidi_M
Case_Ignorable CI
Cased
Changes_When_Casefolded CWCF
Changes_When_Casemapped CWCM
Changes_When_Lowercased CWL
Changes_When_NFKC_Casefolded CWKCF
Changes_When_Titlecased CWT
Changes_When_Uppercased CWU
Dash
Default_Ignorable_Code_Point DI
Deprecated Dep
Diacritic Dia
Emoji
Emoji_Component EComp
Emoji_Modifier EMod
Emoji_Modifier_Base EBase
Emoji_Presentation EPres
Extended_Pictographic ExtPict
Extender Ext
Grapheme_Base Gr_Base
Grapheme_Extend Gr_Ext
Hex_Digit Hex
IDS_Binary_Operator IDSB
IDS_Trinary_Operator IDST
ID_Continue IDC
ID_Start IDS
Ideographic Ideo
Join_Control Join_C
Logical_Order_Exception LOE
Lowercase Lower
Math
Noncharacter_Code_Point NChar
Pattern_Syntax Pat_Syn
Pattern_White_Space Pat_WS
Quotation_Mark QMark
Radical
Regional_Indicator RI
Sentence_Terminal STerm
Soft_Dotted SD
Terminal_Punctuation Term
Unified_Ideograph UIdeo
Uppercase Upper
Variation_Selector VS
White_Space space
XID_Continue XIDC
XID_Start XIDS`.split(/\s/).map((p2) => [w(p2), p2])
);
var LowerToAlternativeLowerCaseMap = /* @__PURE__ */ new Map([
  ["s", cp(383)],
  // s, ſ
  [cp(383), "s"]
  // ſ, s
]);
var LowerToAlternativeUpperCaseMap = /* @__PURE__ */ new Map([
  [cp(223), cp(7838)],
  // ß, ẞ
  [cp(107), cp(8490)],
  // k, K (Kelvin)
  [cp(229), cp(8491)],
  // å, Å (Angstrom)
  [cp(969), cp(8486)]
  // ω, Ω (Ohm)
]);
var LowerToTitleCaseMap = new Map([
  titleEntry(453),
  titleEntry(456),
  titleEntry(459),
  titleEntry(498),
  ...titleRange(8072, 8079),
  ...titleRange(8088, 8095),
  ...titleRange(8104, 8111),
  titleEntry(8124),
  titleEntry(8140),
  titleEntry(8188)
]);
var PosixClassMap = /* @__PURE__ */ new Map([
  ["alnum", r`[\p{Alpha}\p{Nd}]`],
  ["alpha", r`\p{Alpha}`],
  ["ascii", r`\p{ASCII}`],
  ["blank", r`[\p{Zs}\t]`],
  ["cntrl", r`\p{Cc}`],
  ["digit", r`\p{Nd}`],
  ["graph", r`[\P{space}&&\P{Cc}&&\P{Cn}&&\P{Cs}]`],
  ["lower", r`\p{Lower}`],
  ["print", r`[[\P{space}&&\P{Cc}&&\P{Cn}&&\P{Cs}]\p{Zs}]`],
  ["punct", r`[\p{P}\p{S}]`],
  // Updated value from Onig 6.9.9; changed from Unicode `\p{punct}`
  ["space", r`\p{space}`],
  ["upper", r`\p{Upper}`],
  ["word", r`[\p{Alpha}\p{M}\p{Nd}\p{Pc}]`],
  ["xdigit", r`\p{AHex}`]
]);
function range(start, end) {
  const range2 = [];
  for (let i2 = start; i2 <= end; i2++) {
    range2.push(i2);
  }
  return range2;
}
function titleEntry(codePoint) {
  const char = cp(codePoint);
  return [char.toLowerCase(), char];
}
function titleRange(start, end) {
  return range(start, end).map((codePoint) => titleEntry(codePoint));
}
var UnicodePropertiesWithSpecificCase = /* @__PURE__ */ new Set([
  "Lower",
  "Lowercase",
  "Upper",
  "Uppercase",
  "Ll",
  "Lowercase_Letter",
  "Lt",
  "Titlecase_Letter",
  "Lu",
  "Uppercase_Letter"
  // The `Changes_When_*` properties (and their aliases) could be included, but they're very rare.
  // Some other properties include a handful of chars with specific cases only, but these chars are
  // generally extreme edge cases and using such properties case insensitively generally produces
  // undesired behavior anyway
]);
function transform(ast, options) {
  const opts = {
    // A couple edge cases exist where options `accuracy` and `bestEffortTarget` are used:
    // - `CharacterSet` kind `text_segment` (`\X`): An exact representation would require heavy
    //   Unicode data; a best-effort approximation requires knowing the target.
    // - `CharacterSet` kind `posix` with values `graph` and `print`: Their complex Unicode
    //   representations would be hard to change to ASCII versions after the fact in the generator
    //   based on `target`/`accuracy`, so produce the appropriate structure here.
    accuracy: "default",
    asciiWordBoundaries: false,
    avoidSubclass: false,
    bestEffortTarget: "ES2025",
    ...options
  };
  addParentProperties(ast);
  const firstPassState = {
    accuracy: opts.accuracy,
    asciiWordBoundaries: opts.asciiWordBoundaries,
    avoidSubclass: opts.avoidSubclass,
    flagDirectivesByAlt: /* @__PURE__ */ new Map(),
    jsGroupNameMap: /* @__PURE__ */ new Map(),
    minTargetEs2024: isMinTarget(opts.bestEffortTarget, "ES2024"),
    passedLookbehind: false,
    strategy: null,
    // Subroutines can appear before the groups they ref, so collect reffed nodes for a second pass 
    subroutineRefMap: /* @__PURE__ */ new Map(),
    supportedGNodes: /* @__PURE__ */ new Set(),
    digitIsAscii: ast.flags.digitIsAscii,
    spaceIsAscii: ast.flags.spaceIsAscii,
    wordIsAscii: ast.flags.wordIsAscii
  };
  S(ast, FirstPassVisitor, firstPassState);
  const globalFlags = {
    dotAll: ast.flags.dotAll,
    ignoreCase: ast.flags.ignoreCase
  };
  const secondPassState = {
    currentFlags: globalFlags,
    prevFlags: null,
    globalFlags,
    groupOriginByCopy: /* @__PURE__ */ new Map(),
    groupsByName: /* @__PURE__ */ new Map(),
    multiplexCapturesToLeftByRef: /* @__PURE__ */ new Map(),
    openRefs: /* @__PURE__ */ new Map(),
    reffedNodesByReferencer: /* @__PURE__ */ new Map(),
    subroutineRefMap: firstPassState.subroutineRefMap
  };
  S(ast, SecondPassVisitor, secondPassState);
  const thirdPassState = {
    groupsByName: secondPassState.groupsByName,
    highestOrphanBackref: 0,
    numCapturesToLeft: 0,
    reffedNodesByReferencer: secondPassState.reffedNodesByReferencer
  };
  S(ast, ThirdPassVisitor, thirdPassState);
  ast._originMap = secondPassState.groupOriginByCopy;
  ast._strategy = firstPassState.strategy;
  return ast;
}
var FirstPassVisitor = {
  AbsenceFunction({ node, parent, replaceWith }) {
    const { body: body2, kind } = node;
    if (kind === "repeater") {
      const innerGroup = A();
      innerGroup.body[0].body.push(
        // Insert own alts as `body`
        K({ negate: true, body: body2 }),
        Q("Any")
      );
      const outerGroup = A();
      outerGroup.body[0].body.push(
        _("greedy", 0, Infinity, innerGroup)
      );
      replaceWith(setParentDeep(outerGroup, parent), { traverse: true });
    } else {
      throw new Error(`Unsupported absence function "(?~|"`);
    }
  },
  Alternative: {
    enter({ node, parent, key: key2 }, { flagDirectivesByAlt }) {
      const flagDirectives = node.body.filter((el) => el.kind === "flags");
      for (let i2 = key2 + 1; i2 < parent.body.length; i2++) {
        const forwardSiblingAlt = parent.body[i2];
        getOrInsert(flagDirectivesByAlt, forwardSiblingAlt, []).push(...flagDirectives);
      }
    },
    exit({ node }, { flagDirectivesByAlt }) {
      if (flagDirectivesByAlt.get(node)?.length) {
        const flags = getCombinedFlagModsFromFlagNodes(flagDirectivesByAlt.get(node));
        if (flags) {
          const flagGroup = A({ flags });
          flagGroup.body[0].body = node.body;
          node.body = [setParentDeep(flagGroup, node)];
        }
      }
    }
  },
  Assertion({ node, parent, key: key2, container, root: root2, remove, replaceWith }, state) {
    const { kind, negate } = node;
    const { asciiWordBoundaries, avoidSubclass, supportedGNodes, wordIsAscii } = state;
    if (kind === "text_segment_boundary") {
      throw new Error(`Unsupported text segment boundary "\\${negate ? "Y" : "y"}"`);
    } else if (kind === "line_end") {
      replaceWith(setParentDeep(K({ body: [
        b({ body: [F("string_end")] }),
        b({ body: [m(10)] })
        // `\n`
      ] }), parent));
    } else if (kind === "line_start") {
      replaceWith(setParentDeep(parseFragment(r`(?<=\A|\n(?!\z))`, { skipLookbehindValidation: true }), parent));
    } else if (kind === "search_start") {
      if (supportedGNodes.has(node)) {
        root2.flags.sticky = true;
        remove();
      } else {
        const prev = container[key2 - 1];
        if (prev && isAlwaysNonZeroLength(prev)) {
          replaceWith(setParentDeep(K({ negate: true }), parent));
        } else if (avoidSubclass) {
          throw new Error(r`Uses "\G" in a way that requires a subclass`);
        } else {
          replaceWith(setParent(F("string_start"), parent));
          state.strategy = "clip_search";
        }
      }
    } else if (kind === "string_end" || kind === "string_start") ;
    else if (kind === "string_end_newline") {
      replaceWith(setParentDeep(parseFragment(r`(?=\n?\z)`), parent));
    } else if (kind === "word_boundary") {
      if (!wordIsAscii && !asciiWordBoundaries) {
        const b2 = `(?:(?<=${defaultWordChar})(?!${defaultWordChar})|(?<!${defaultWordChar})(?=${defaultWordChar}))`;
        const B2 = `(?:(?<=${defaultWordChar})(?=${defaultWordChar})|(?<!${defaultWordChar})(?!${defaultWordChar}))`;
        replaceWith(setParentDeep(parseFragment(negate ? B2 : b2), parent));
      }
    } else {
      throw new Error(`Unexpected assertion kind "${kind}"`);
    }
  },
  Backreference({ node }, { jsGroupNameMap }) {
    let { ref } = node;
    if (typeof ref === "string" && !isValidJsGroupName(ref)) {
      ref = getAndStoreJsGroupName(ref, jsGroupNameMap);
      node.ref = ref;
    }
  },
  CapturingGroup({ node }, { jsGroupNameMap, subroutineRefMap }) {
    let { name } = node;
    if (name && !isValidJsGroupName(name)) {
      name = getAndStoreJsGroupName(name, jsGroupNameMap);
      node.name = name;
    }
    subroutineRefMap.set(node.number, node);
    if (name) {
      subroutineRefMap.set(name, node);
    }
  },
  CharacterClassRange({ node, parent, replaceWith }) {
    if (parent.kind === "intersection") {
      const cc = C({ body: [node] });
      replaceWith(setParentDeep(cc, parent), { traverse: true });
    }
  },
  CharacterSet({ node, parent, replaceWith }, { accuracy, minTargetEs2024, digitIsAscii, spaceIsAscii, wordIsAscii }) {
    const { kind, negate, value } = node;
    if (digitIsAscii && (kind === "digit" || value === "digit")) {
      replaceWith(setParent(E("digit", { negate }), parent));
      return;
    }
    if (spaceIsAscii && (kind === "space" || value === "space")) {
      replaceWith(setParentDeep(setNegate(parseFragment(asciiSpaceChar), negate), parent));
      return;
    }
    if (wordIsAscii && (kind === "word" || value === "word")) {
      replaceWith(setParent(E("word", { negate }), parent));
      return;
    }
    if (kind === "any") {
      replaceWith(setParent(Q("Any"), parent));
    } else if (kind === "digit") {
      replaceWith(setParent(Q("Nd", { negate }), parent));
    } else if (kind === "dot") ;
    else if (kind === "text_segment") {
      if (accuracy === "strict") {
        throw new Error(r`Use of "\X" requires non-strict accuracy`);
      }
      const eBase = "\\p{Emoji}(?:\\p{EMod}|\\uFE0F\\u20E3?|[\\x{E0020}-\\x{E007E}]+\\x{E007F})?";
      const emoji = r`\p{RI}{2}|${eBase}(?:\u200D${eBase})*`;
      replaceWith(setParentDeep(parseFragment(
        // Close approximation of an extended grapheme cluster; see <unicode.org/reports/tr29/>
        r`(?>\r\n|${minTargetEs2024 ? r`\p{RGI_Emoji}` : emoji}|\P{M}\p{M}*)`,
        // Allow JS property `RGI_Emoji` through
        { skipPropertyNameValidation: true }
      ), parent));
    } else if (kind === "hex") {
      replaceWith(setParent(Q("AHex", { negate }), parent));
    } else if (kind === "newline") {
      replaceWith(setParentDeep(parseFragment(negate ? "[^\n]" : "(?>\r\n?|[\n\v\f\u2028\u2029])"), parent));
    } else if (kind === "posix") {
      if (!minTargetEs2024 && (value === "graph" || value === "print")) {
        if (accuracy === "strict") {
          throw new Error(`POSIX class "${value}" requires min target ES2024 or non-strict accuracy`);
        }
        let ascii = {
          graph: "!-~",
          print: " -~"
        }[value];
        if (negate) {
          ascii = `\0-${cp(ascii.codePointAt(0) - 1)}${cp(ascii.codePointAt(2) + 1)}-􏿿`;
        }
        replaceWith(setParentDeep(parseFragment(`[${ascii}]`), parent));
      } else {
        replaceWith(setParentDeep(setNegate(parseFragment(PosixClassMap.get(value)), negate), parent));
      }
    } else if (kind === "property") {
      if (!JsUnicodePropertyMap.has(w(value))) {
        node.key = "sc";
      }
    } else if (kind === "space") {
      replaceWith(setParent(Q("space", { negate }), parent));
    } else if (kind === "word") {
      replaceWith(setParentDeep(setNegate(parseFragment(defaultWordChar), negate), parent));
    } else {
      throw new Error(`Unexpected character set kind "${kind}"`);
    }
  },
  Directive({ node, parent, root: root2, remove, replaceWith, removeAllPrevSiblings, removeAllNextSiblings }) {
    const { kind, flags } = node;
    if (kind === "flags") {
      if (!flags.enable && !flags.disable) {
        remove();
      } else {
        const flagGroup = A({ flags });
        flagGroup.body[0].body = removeAllNextSiblings();
        replaceWith(setParentDeep(flagGroup, parent), { traverse: true });
      }
    } else if (kind === "keep") {
      const firstAlt = root2.body[0];
      const hasWrapperGroup = root2.body.length === 1 && // Not emulatable if within a `CapturingGroup`
      o(firstAlt, { type: "Group" }) && firstAlt.body[0].body.length === 1;
      const topLevel = hasWrapperGroup ? firstAlt.body[0] : root2;
      if (parent.parent !== topLevel || topLevel.body.length > 1) {
        throw new Error(r`Uses "\K" in a way that's unsupported`);
      }
      const lookbehind = K({ behind: true });
      lookbehind.body[0].body = removeAllPrevSiblings();
      replaceWith(setParentDeep(lookbehind, parent));
    } else {
      throw new Error(`Unexpected directive kind "${kind}"`);
    }
  },
  Flags({ node, parent }) {
    if (node.posixIsAscii) {
      throw new Error('Unsupported flag "P"');
    }
    if (node.textSegmentMode === "word") {
      throw new Error('Unsupported flag "y{w}"');
    }
    [
      "digitIsAscii",
      // Flag D
      "extended",
      // Flag x
      "posixIsAscii",
      // Flag P
      "spaceIsAscii",
      // Flag S
      "wordIsAscii",
      // Flag W
      "textSegmentMode"
      // Flag y{g} or y{w}
    ].forEach((f2) => delete node[f2]);
    Object.assign(node, {
      // JS flag g; no Onig equiv
      global: false,
      // JS flag d; no Onig equiv
      hasIndices: false,
      // JS flag m; no Onig equiv but its behavior is always on in Onig. Onig's only line break
      // char is line feed, unlike JS, so this flag isn't used since it would produce inaccurate
      // results (also allows `^` and `$` to be used in the generator for string start and end)
      multiline: false,
      // JS flag y; no Onig equiv, but used for `\G` emulation
      sticky: node.sticky ?? false
      // Note: Regex+ doesn't allow explicitly adding flags it handles implicitly, so leave out
      // properties `unicode` (JS flag u) and `unicodeSets` (JS flag v). Keep the existing values
      // for `ignoreCase` (flag i) and `dotAll` (JS flag s, but Onig flag m)
    });
    parent.options = {
      disable: {
        // Onig uses different rules for flag x than Regex+, so disable the implicit flag
        x: true,
        // Onig has no flag to control "named capture only" mode but contextually applies its
        // behavior when named capturing is used, so disable Regex+'s implicit flag for it
        n: true
      },
      force: {
        // Always add flag v because we're generating an AST that relies on it (it enables JS
        // support for Onig features nested classes, intersection, Unicode properties, etc.).
        // However, the generator might disable flag v based on its `target` option
        v: true
      }
    };
  },
  Group({ node }) {
    if (!node.flags) {
      return;
    }
    const { enable, disable } = node.flags;
    enable?.extended && delete enable.extended;
    disable?.extended && delete disable.extended;
    enable?.dotAll && disable?.dotAll && delete enable.dotAll;
    enable?.ignoreCase && disable?.ignoreCase && delete enable.ignoreCase;
    enable && !Object.keys(enable).length && delete node.flags.enable;
    disable && !Object.keys(disable).length && delete node.flags.disable;
    !node.flags.enable && !node.flags.disable && delete node.flags;
  },
  LookaroundAssertion({ node }, state) {
    const { kind } = node;
    if (kind === "lookbehind") {
      state.passedLookbehind = true;
    }
  },
  NamedCallout({ node, parent, replaceWith }) {
    const { kind } = node;
    if (kind === "fail") {
      replaceWith(setParentDeep(K({ negate: true }), parent));
    } else {
      throw new Error(`Unsupported named callout "(*${kind.toUpperCase()}"`);
    }
  },
  Quantifier({ node }) {
    if (node.body.type === "Quantifier") {
      const group = A();
      group.body[0].body.push(node.body);
      node.body = setParentDeep(group, node);
    }
  },
  Regex: {
    enter({ node }, { supportedGNodes }) {
      const leadingGs = [];
      let hasAltWithLeadG = false;
      let hasAltWithoutLeadG = false;
      for (const alt of node.body) {
        if (alt.body.length === 1 && alt.body[0].kind === "search_start") {
          alt.body.pop();
        } else {
          const leadingG = getLeadingG(alt.body);
          if (leadingG) {
            hasAltWithLeadG = true;
            Array.isArray(leadingG) ? leadingGs.push(...leadingG) : leadingGs.push(leadingG);
          } else {
            hasAltWithoutLeadG = true;
          }
        }
      }
      if (hasAltWithLeadG && !hasAltWithoutLeadG) {
        leadingGs.forEach((g) => supportedGNodes.add(g));
      }
    },
    exit(_2, { accuracy, passedLookbehind, strategy }) {
      if (accuracy === "strict" && passedLookbehind && strategy) {
        throw new Error(r`Uses "\G" in a way that requires non-strict accuracy`);
      }
    }
  },
  Subroutine({ node }, { jsGroupNameMap }) {
    let { ref } = node;
    if (typeof ref === "string" && !isValidJsGroupName(ref)) {
      ref = getAndStoreJsGroupName(ref, jsGroupNameMap);
      node.ref = ref;
    }
  }
};
var SecondPassVisitor = {
  Backreference({ node }, { multiplexCapturesToLeftByRef, reffedNodesByReferencer }) {
    const { orphan, ref } = node;
    if (!orphan) {
      reffedNodesByReferencer.set(node, [...multiplexCapturesToLeftByRef.get(ref).map(({ node: node2 }) => node2)]);
    }
  },
  CapturingGroup: {
    enter({
      node,
      parent,
      replaceWith,
      skip
    }, {
      groupOriginByCopy,
      groupsByName,
      multiplexCapturesToLeftByRef,
      openRefs,
      reffedNodesByReferencer
    }) {
      const origin = groupOriginByCopy.get(node);
      if (origin && openRefs.has(node.number)) {
        const recursion2 = setParent(createRecursion(node.number), parent);
        reffedNodesByReferencer.set(recursion2, openRefs.get(node.number));
        replaceWith(recursion2);
        return;
      }
      openRefs.set(node.number, node);
      multiplexCapturesToLeftByRef.set(node.number, []);
      if (node.name) {
        getOrInsert(multiplexCapturesToLeftByRef, node.name, []);
      }
      const multiplexNodes = multiplexCapturesToLeftByRef.get(node.name ?? node.number);
      for (let i2 = 0; i2 < multiplexNodes.length; i2++) {
        const multiplex = multiplexNodes[i2];
        if (
          // This group is from subroutine expansion, and there's a multiplex value from either the
          // origin node or a prior subroutine expansion group with the same origin
          origin === multiplex.node || origin && origin === multiplex.origin || // This group is not from subroutine expansion, and it comes after a subroutine expansion
          // group that refers to this group
          node === multiplex.origin
        ) {
          multiplexNodes.splice(i2, 1);
          break;
        }
      }
      multiplexCapturesToLeftByRef.get(node.number).push({ node, origin });
      if (node.name) {
        multiplexCapturesToLeftByRef.get(node.name).push({ node, origin });
      }
      if (node.name) {
        const groupsWithSameName = getOrInsert(groupsByName, node.name, /* @__PURE__ */ new Map());
        let hasDuplicateNameToRemove = false;
        if (origin) {
          hasDuplicateNameToRemove = true;
        } else {
          for (const groupInfo of groupsWithSameName.values()) {
            if (!groupInfo.hasDuplicateNameToRemove) {
              hasDuplicateNameToRemove = true;
              break;
            }
          }
        }
        groupsByName.get(node.name).set(node, { node, hasDuplicateNameToRemove });
      }
    },
    exit({ node }, { openRefs }) {
      if (openRefs.get(node.number) === node) {
        openRefs.delete(node.number);
      }
    }
  },
  Group: {
    enter({ node }, state) {
      state.prevFlags = state.currentFlags;
      if (node.flags) {
        state.currentFlags = getNewCurrentFlags(state.currentFlags, node.flags);
      }
    },
    exit(_2, state) {
      state.currentFlags = state.prevFlags;
    }
  },
  Subroutine({ node, parent, replaceWith }, state) {
    const { isRecursive, ref } = node;
    if (isRecursive) {
      let reffed = parent;
      while (reffed = reffed.parent) {
        if (reffed.type === "CapturingGroup" && (reffed.name === ref || reffed.number === ref)) {
          break;
        }
      }
      state.reffedNodesByReferencer.set(node, reffed);
      return;
    }
    const reffedGroupNode = state.subroutineRefMap.get(ref);
    const isGlobalRecursion = ref === 0;
    const expandedSubroutine = isGlobalRecursion ? createRecursion(0) : (
      // The reffed group might itself contain subroutines, which are expanded during sub-traversal
      cloneCapturingGroup(reffedGroupNode, state.groupOriginByCopy, null)
    );
    let replacement = expandedSubroutine;
    if (!isGlobalRecursion) {
      const reffedGroupFlagMods = getCombinedFlagModsFromFlagNodes(getAllParents(
        reffedGroupNode,
        (p2) => p2.type === "Group" && !!p2.flags
      ));
      const reffedGroupFlags = reffedGroupFlagMods ? getNewCurrentFlags(state.globalFlags, reffedGroupFlagMods) : state.globalFlags;
      if (!areFlagsEqual(reffedGroupFlags, state.currentFlags)) {
        replacement = A({
          flags: getFlagModsFromFlags(reffedGroupFlags)
        });
        replacement.body[0].body.push(expandedSubroutine);
      }
    }
    replaceWith(setParentDeep(replacement, parent), { traverse: !isGlobalRecursion });
  }
};
var ThirdPassVisitor = {
  Backreference({ node, parent, replaceWith }, state) {
    if (node.orphan) {
      state.highestOrphanBackref = Math.max(state.highestOrphanBackref, node.ref);
      return;
    }
    const reffedNodes = state.reffedNodesByReferencer.get(node);
    const participants = reffedNodes.filter((reffed) => canParticipateWithNode(reffed, node));
    if (!participants.length) {
      replaceWith(setParentDeep(K({ negate: true }), parent));
    } else if (participants.length > 1) {
      const group = A({
        atomic: true,
        body: participants.reverse().map((reffed) => b({
          body: [k(reffed.number)]
        }))
      });
      replaceWith(setParentDeep(group, parent));
    } else {
      node.ref = participants[0].number;
    }
  },
  CapturingGroup({ node }, state) {
    node.number = ++state.numCapturesToLeft;
    if (node.name) {
      if (state.groupsByName.get(node.name).get(node).hasDuplicateNameToRemove) {
        delete node.name;
      }
    }
  },
  Regex: {
    exit({ node }, state) {
      const numCapsNeeded = Math.max(state.highestOrphanBackref - state.numCapturesToLeft, 0);
      for (let i2 = 0; i2 < numCapsNeeded; i2++) {
        const emptyCapture = P();
        node.body.at(-1).body.push(emptyCapture);
      }
    }
  },
  Subroutine({ node }, state) {
    if (!node.isRecursive || node.ref === 0) {
      return;
    }
    node.ref = state.reffedNodesByReferencer.get(node).number;
  }
};
function addParentProperties(root2) {
  S(root2, {
    "*"({ node, parent }) {
      node.parent = parent;
    }
  });
}
function areFlagsEqual(a, b2) {
  return a.dotAll === b2.dotAll && a.ignoreCase === b2.ignoreCase;
}
function canParticipateWithNode(capture, node) {
  let rightmostPoint = node;
  do {
    if (rightmostPoint.type === "Regex") {
      return false;
    }
    if (rightmostPoint.type === "Alternative") {
      continue;
    }
    if (rightmostPoint === capture) {
      return false;
    }
    const kidsOfParent = getKids(rightmostPoint.parent);
    for (const kid of kidsOfParent) {
      if (kid === rightmostPoint) {
        break;
      }
      if (kid === capture || isAncestorOf(kid, capture)) {
        return true;
      }
    }
  } while (rightmostPoint = rightmostPoint.parent);
  throw new Error("Unexpected path");
}
function cloneCapturingGroup(obj, originMap, up, up2) {
  const store = Array.isArray(obj) ? [] : {};
  for (const [key2, value] of Object.entries(obj)) {
    if (key2 === "parent") {
      store.parent = Array.isArray(up) ? up2 : up;
    } else if (value && typeof value === "object") {
      store[key2] = cloneCapturingGroup(value, originMap, store, up);
    } else {
      if (key2 === "type" && value === "CapturingGroup") {
        originMap.set(store, originMap.get(obj) ?? obj);
      }
      store[key2] = value;
    }
  }
  return store;
}
function createRecursion(ref) {
  const node = O(ref);
  node.isRecursive = true;
  return node;
}
function getAllParents(node, filterFn) {
  const results = [];
  while (node = node.parent) {
    if (!filterFn || filterFn(node)) {
      results.push(node);
    }
  }
  return results;
}
function getAndStoreJsGroupName(name, map) {
  if (map.has(name)) {
    return map.get(name);
  }
  const jsName = `$${map.size}_${name.replace(/^[^$_\p{IDS}]|[^$\u200C\u200D\p{IDC}]/ug, "_")}`;
  map.set(name, jsName);
  return jsName;
}
function getCombinedFlagModsFromFlagNodes(flagNodes) {
  const flagProps = ["dotAll", "ignoreCase"];
  const combinedFlags = { enable: {}, disable: {} };
  flagNodes.forEach(({ flags }) => {
    flagProps.forEach((prop) => {
      if (flags.enable?.[prop]) {
        delete combinedFlags.disable[prop];
        combinedFlags.enable[prop] = true;
      }
      if (flags.disable?.[prop]) {
        combinedFlags.disable[prop] = true;
      }
    });
  });
  if (!Object.keys(combinedFlags.enable).length) {
    delete combinedFlags.enable;
  }
  if (!Object.keys(combinedFlags.disable).length) {
    delete combinedFlags.disable;
  }
  if (combinedFlags.enable || combinedFlags.disable) {
    return combinedFlags;
  }
  return null;
}
function getFlagModsFromFlags({ dotAll, ignoreCase }) {
  const mods = {};
  if (dotAll || ignoreCase) {
    mods.enable = {};
    dotAll && (mods.enable.dotAll = true);
    ignoreCase && (mods.enable.ignoreCase = true);
  }
  if (!dotAll || !ignoreCase) {
    mods.disable = {};
    !dotAll && (mods.disable.dotAll = true);
    !ignoreCase && (mods.disable.ignoreCase = true);
  }
  return mods;
}
function getKids(node) {
  if (!node) {
    throw new Error("Node expected");
  }
  const { body: body2 } = node;
  return Array.isArray(body2) ? body2 : body2 ? [body2] : null;
}
function getLeadingG(els) {
  const firstToConsider = els.find((el) => el.kind === "search_start" || isLoneGLookaround(el, { negate: false }) || !isAlwaysZeroLength(el));
  if (!firstToConsider) {
    return null;
  }
  if (firstToConsider.kind === "search_start") {
    return firstToConsider;
  }
  if (firstToConsider.type === "LookaroundAssertion") {
    return firstToConsider.body[0].body[0];
  }
  if (firstToConsider.type === "CapturingGroup" || firstToConsider.type === "Group") {
    const gNodesForGroup = [];
    for (const alt of firstToConsider.body) {
      const leadingG = getLeadingG(alt.body);
      if (!leadingG) {
        return null;
      }
      Array.isArray(leadingG) ? gNodesForGroup.push(...leadingG) : gNodesForGroup.push(leadingG);
    }
    return gNodesForGroup;
  }
  return null;
}
function isAncestorOf(node, descendant) {
  const kids = getKids(node) ?? [];
  for (const kid of kids) {
    if (kid === descendant || isAncestorOf(kid, descendant)) {
      return true;
    }
  }
  return false;
}
function isAlwaysZeroLength({ type }) {
  return type === "Assertion" || type === "Directive" || type === "LookaroundAssertion";
}
function isAlwaysNonZeroLength(node) {
  const types = [
    "Character",
    "CharacterClass",
    "CharacterSet"
  ];
  return types.includes(node.type) || node.type === "Quantifier" && node.min && types.includes(node.body.type);
}
function isLoneGLookaround(node, options) {
  const opts = {
    negate: null,
    ...options
  };
  return node.type === "LookaroundAssertion" && (opts.negate === null || node.negate === opts.negate) && node.body.length === 1 && o(node.body[0], {
    type: "Assertion",
    kind: "search_start"
  });
}
function isValidJsGroupName(name) {
  return /^[$_\p{IDS}][$\u200C\u200D\p{IDC}]*$/u.test(name);
}
function parseFragment(pattern, options) {
  const ast = J(pattern, {
    ...options,
    // Providing a custom set of Unicode property names avoids converting some JS Unicode
    // properties (ex: `\p{Alpha}`) to Onig POSIX classes
    unicodePropertyMap: JsUnicodePropertyMap
  });
  const alts = ast.body;
  if (alts.length > 1 || alts[0].body.length > 1) {
    return A({ body: alts });
  }
  return alts[0].body[0];
}
function setNegate(node, negate) {
  node.negate = negate;
  return node;
}
function setParent(node, parent) {
  node.parent = parent;
  return node;
}
function setParentDeep(node, parent) {
  addParentProperties(node);
  node.parent = parent;
  return node;
}
function generate(ast, options) {
  const opts = getOptions(options);
  const minTargetEs2024 = isMinTarget(opts.target, "ES2024");
  const minTargetEs2025 = isMinTarget(opts.target, "ES2025");
  const recursionLimit = opts.rules.recursionLimit;
  if (!Number.isInteger(recursionLimit) || recursionLimit < 2 || recursionLimit > 20) {
    throw new Error("Invalid recursionLimit; use 2-20");
  }
  let hasCaseInsensitiveNode = null;
  let hasCaseSensitiveNode = null;
  if (!minTargetEs2025) {
    const iStack = [ast.flags.ignoreCase];
    S(ast, FlagModifierVisitor, {
      getCurrentModI: () => iStack.at(-1),
      popModI() {
        iStack.pop();
      },
      pushModI(isIOn) {
        iStack.push(isIOn);
      },
      setHasCasedChar() {
        if (iStack.at(-1)) {
          hasCaseInsensitiveNode = true;
        } else {
          hasCaseSensitiveNode = true;
        }
      }
    });
  }
  const appliedGlobalFlags = {
    dotAll: ast.flags.dotAll,
    // - Turn global flag i on if a case insensitive node was used and no case sensitive nodes were
    //   used (to avoid unnecessary node expansion).
    // - Turn global flag i off if a case sensitive node was used (since case sensitivity can't be
    //   forced without the use of ES2025 flag groups)
    ignoreCase: !!((ast.flags.ignoreCase || hasCaseInsensitiveNode) && !hasCaseSensitiveNode)
  };
  let lastNode = ast;
  const state = {
    accuracy: opts.accuracy,
    appliedGlobalFlags,
    captureMap: /* @__PURE__ */ new Map(),
    currentFlags: {
      dotAll: ast.flags.dotAll,
      ignoreCase: ast.flags.ignoreCase
    },
    inCharClass: false,
    lastNode,
    originMap: ast._originMap,
    recursionLimit,
    useAppliedIgnoreCase: !!(!minTargetEs2025 && hasCaseInsensitiveNode && hasCaseSensitiveNode),
    useFlagMods: minTargetEs2025,
    useFlagV: minTargetEs2024,
    verbose: opts.verbose
  };
  function gen(node) {
    state.lastNode = lastNode;
    lastNode = node;
    const fn = throwIfNullish(generator[node.type], `Unexpected node type "${node.type}"`);
    return fn(node, state, gen);
  }
  const result = {
    pattern: ast.body.map(gen).join("|"),
    // Could reset `lastNode` at this point via `lastNode = ast`, but it isn't needed by flags
    flags: gen(ast.flags),
    options: { ...ast.options }
  };
  if (!minTargetEs2024) {
    delete result.options.force.v;
    result.options.disable.v = true;
    result.options.unicodeSetsPlugin = null;
  }
  result._captureTransfers = /* @__PURE__ */ new Map();
  result._hiddenCaptures = [];
  state.captureMap.forEach((value, key2) => {
    if (value.hidden) {
      result._hiddenCaptures.push(key2);
    }
    if (value.transferTo) {
      getOrInsert(result._captureTransfers, value.transferTo, []).push(key2);
    }
  });
  return result;
}
var FlagModifierVisitor = {
  "*": {
    enter({ node }, state) {
      if (isAnyGroup(node)) {
        const currentModI = state.getCurrentModI();
        state.pushModI(
          node.flags ? getNewCurrentFlags({ ignoreCase: currentModI }, node.flags).ignoreCase : currentModI
        );
      }
    },
    exit({ node }, state) {
      if (isAnyGroup(node)) {
        state.popModI();
      }
    }
  },
  Backreference(_2, state) {
    state.setHasCasedChar();
  },
  Character({ node }, state) {
    if (charHasCase(cp(node.value))) {
      state.setHasCasedChar();
    }
  },
  CharacterClassRange({ node, skip }, state) {
    skip();
    if (getCasesOutsideCharClassRange(node, { firstOnly: true }).length) {
      state.setHasCasedChar();
    }
  },
  CharacterSet({ node }, state) {
    if (node.kind === "property" && UnicodePropertiesWithSpecificCase.has(node.value)) {
      state.setHasCasedChar();
    }
  }
};
var generator = {
  /**
  @param {AlternativeNode} node
  */
  Alternative({ body: body2 }, _2, gen) {
    return body2.map(gen).join("");
  },
  /**
  @param {AssertionNode} node
  */
  Assertion({ kind, negate }) {
    if (kind === "string_end") {
      return "$";
    }
    if (kind === "string_start") {
      return "^";
    }
    if (kind === "word_boundary") {
      return negate ? r`\B` : r`\b`;
    }
    throw new Error(`Unexpected assertion kind "${kind}"`);
  },
  /**
  @param {BackreferenceNode} node
  */
  Backreference({ ref }, state) {
    if (typeof ref !== "number") {
      throw new Error("Unexpected named backref in transformed AST");
    }
    if (!state.useFlagMods && state.accuracy === "strict" && state.currentFlags.ignoreCase && !state.captureMap.get(ref).ignoreCase) {
      throw new Error("Use of case-insensitive backref to case-sensitive group requires target ES2025 or non-strict accuracy");
    }
    return "\\" + ref;
  },
  /**
  @param {CapturingGroupNode} node
  */
  CapturingGroup(node, state, gen) {
    const { body: body2, name, number } = node;
    const data = { ignoreCase: state.currentFlags.ignoreCase };
    const origin = state.originMap.get(node);
    if (origin) {
      data.hidden = true;
      if (number > origin.number) {
        data.transferTo = origin.number;
      }
    }
    state.captureMap.set(number, data);
    return `(${name ? `?<${name}>` : ""}${body2.map(gen).join("|")})`;
  },
  /**
  @param {CharacterNode} node
  */
  Character({ value }, state) {
    const char = cp(value);
    const escaped = getCharEscape(value, {
      escDigit: state.lastNode.type === "Backreference",
      inCharClass: state.inCharClass,
      useFlagV: state.useFlagV
    });
    if (escaped !== char) {
      return escaped;
    }
    if (state.useAppliedIgnoreCase && state.currentFlags.ignoreCase && charHasCase(char)) {
      const cases = getIgnoreCaseMatchChars(char);
      return state.inCharClass ? cases.join("") : cases.length > 1 ? `[${cases.join("")}]` : cases[0];
    }
    return char;
  },
  /**
  @param {CharacterClassNode} node
  */
  CharacterClass(node, state, gen) {
    const { kind, negate, parent } = node;
    let { body: body2 } = node;
    if (kind === "intersection" && !state.useFlagV) {
      throw new Error("Use of character class intersection requires min target ES2024");
    }
    if (envFlags.bugFlagVLiteralHyphenIsRange && state.useFlagV && body2.some(isLiteralHyphen)) {
      body2 = [m(45), ...body2.filter((kid) => !isLiteralHyphen(kid))];
    }
    const genClass = () => `[${negate ? "^" : ""}${body2.map(gen).join(kind === "intersection" ? "&&" : "")}]`;
    if (!state.inCharClass) {
      if (
        // Already established `kind !== 'intersection'` if `!state.useFlagV`; don't check again
        (!state.useFlagV || envFlags.bugNestedClassIgnoresNegation) && !negate
      ) {
        const negatedChildClasses = body2.filter(
          (kid) => kid.type === "CharacterClass" && kid.kind === "union" && kid.negate
        );
        if (negatedChildClasses.length) {
          const group = A();
          const groupFirstAlt = group.body[0];
          group.parent = parent;
          groupFirstAlt.parent = group;
          body2 = body2.filter((kid) => !negatedChildClasses.includes(kid));
          node.body = body2;
          if (body2.length) {
            node.parent = groupFirstAlt;
            groupFirstAlt.body.push(node);
          } else {
            group.body.pop();
          }
          negatedChildClasses.forEach((cc) => {
            const newAlt = b({ body: [cc] });
            cc.parent = newAlt;
            newAlt.parent = group;
            group.body.push(newAlt);
          });
          return gen(group);
        }
      }
      state.inCharClass = true;
      const result = genClass();
      state.inCharClass = false;
      return result;
    }
    const firstEl = body2[0];
    if (
      // Already established that the parent is a char class via `inCharClass`; don't check again
      kind === "union" && !negate && firstEl && // Allows many nested classes to work with `target` ES2018 which doesn't support nesting
      ((!state.useFlagV || !state.verbose) && parent.kind === "union" && !(envFlags.bugFlagVLiteralHyphenIsRange && state.useFlagV) || !state.verbose && parent.kind === "intersection" && // JS doesn't allow intersection with union or ranges
      body2.length === 1 && firstEl.type !== "CharacterClassRange")
    ) {
      return body2.map(gen).join("");
    }
    if (!state.useFlagV && parent.type === "CharacterClass") {
      throw new Error("Uses nested character class in a way that requires min target ES2024");
    }
    return genClass();
  },
  /**
  @param {CharacterClassRangeNode} node
  */
  CharacterClassRange(node, state) {
    const min = node.min.value;
    const max = node.max.value;
    const escOpts = {
      escDigit: false,
      inCharClass: true,
      useFlagV: state.useFlagV
    };
    const minStr = getCharEscape(min, escOpts);
    const maxStr = getCharEscape(max, escOpts);
    const extraChars = /* @__PURE__ */ new Set();
    if (state.useAppliedIgnoreCase && state.currentFlags.ignoreCase) {
      const charsOutsideRange = getCasesOutsideCharClassRange(node);
      const ranges = getCodePointRangesFromChars(charsOutsideRange);
      ranges.forEach((value) => {
        extraChars.add(
          Array.isArray(value) ? `${getCharEscape(value[0], escOpts)}-${getCharEscape(value[1], escOpts)}` : getCharEscape(value, escOpts)
        );
      });
    }
    return `${minStr}-${maxStr}${[...extraChars].join("")}`;
  },
  /**
  @param {CharacterSetNode} node
  */
  CharacterSet({ kind, negate, value, key: key2 }, state) {
    if (kind === "dot") {
      return state.currentFlags.dotAll ? state.appliedGlobalFlags.dotAll || state.useFlagMods ? "." : "[^]" : (
        // Onig's only line break char is line feed, unlike JS
        r`[^\n]`
      );
    }
    if (kind === "digit") {
      return negate ? r`\D` : r`\d`;
    }
    if (kind === "property") {
      if (state.useAppliedIgnoreCase && state.currentFlags.ignoreCase && UnicodePropertiesWithSpecificCase.has(value)) {
        throw new Error(`Unicode property "${value}" can't be case-insensitive when other chars have specific case`);
      }
      return `${negate ? r`\P` : r`\p`}{${key2 ? `${key2}=` : ""}${value}}`;
    }
    if (kind === "word") {
      return negate ? r`\W` : r`\w`;
    }
    throw new Error(`Unexpected character set kind "${kind}"`);
  },
  /**
  @param {FlagsNode} node
  */
  Flags(node, state) {
    return (
      // The transformer should never turn on the properties for flags d, g, m since Onig doesn't
      // have equivs. Flag m is never used since Onig uses different line break chars than JS
      // (node.hasIndices ? 'd' : '') +
      // (node.global ? 'g' : '') +
      // (node.multiline ? 'm' : '') +
      (state.appliedGlobalFlags.ignoreCase ? "i" : "") + (node.dotAll ? "s" : "") + (node.sticky ? "y" : "")
    );
  },
  /**
  @param {GroupNode} node
  */
  Group({ atomic: atomic2, body: body2, flags, parent }, state, gen) {
    const currentFlags = state.currentFlags;
    if (flags) {
      state.currentFlags = getNewCurrentFlags(currentFlags, flags);
    }
    const contents = body2.map(gen).join("|");
    const result = !state.verbose && body2.length === 1 && // Single alt
    parent.type !== "Quantifier" && !atomic2 && (!state.useFlagMods || !flags) ? contents : `(?${getGroupPrefix(atomic2, flags, state.useFlagMods)}${contents})`;
    state.currentFlags = currentFlags;
    return result;
  },
  /**
  @param {LookaroundAssertionNode} node
  */
  LookaroundAssertion({ body: body2, kind, negate }, _2, gen) {
    const prefix = `${kind === "lookahead" ? "" : "<"}${negate ? "!" : "="}`;
    return `(?${prefix}${body2.map(gen).join("|")})`;
  },
  /**
  @param {QuantifierNode} node
  */
  Quantifier(node, _2, gen) {
    return gen(node.body) + getQuantifierStr(node);
  },
  /**
  @param {SubroutineNode & {isRecursive: true}} node
  */
  Subroutine({ isRecursive, ref }, state) {
    if (!isRecursive) {
      throw new Error("Unexpected non-recursive subroutine in transformed AST");
    }
    const limit = state.recursionLimit;
    return ref === 0 ? `(?R=${limit})` : r`\g<${ref}&R=${limit}>`;
  }
};
var BaseEscapeChars = /* @__PURE__ */ new Set([
  "$",
  "(",
  ")",
  "*",
  "+",
  ".",
  "?",
  "[",
  "\\",
  "]",
  "^",
  "{",
  "|",
  "}"
]);
var CharClassEscapeChars = /* @__PURE__ */ new Set([
  "-",
  "\\",
  "]",
  "^",
  // Literal `[` doesn't require escaping with flag u, but this can help work around regex source
  // linters and regex syntax processors that expect unescaped `[` to create a nested class
  "["
]);
var CharClassEscapeCharsFlagV = /* @__PURE__ */ new Set([
  "(",
  ")",
  "-",
  "/",
  "[",
  "\\",
  "]",
  "^",
  "{",
  "|",
  "}",
  // Double punctuators; also includes already-listed `-` and `^`
  "!",
  "#",
  "$",
  "%",
  "&",
  "*",
  "+",
  ",",
  ".",
  ":",
  ";",
  "<",
  "=",
  ">",
  "?",
  "@",
  "`",
  "~"
]);
var CharCodeEscapeMap = /* @__PURE__ */ new Map([
  [9, r`\t`],
  // horizontal tab
  [10, r`\n`],
  // line feed
  [11, r`\v`],
  // vertical tab
  [12, r`\f`],
  // form feed
  [13, r`\r`],
  // carriage return
  [8232, r`\u2028`],
  // line separator
  [8233, r`\u2029`],
  // paragraph separator
  [65279, r`\uFEFF`]
  // ZWNBSP/BOM
]);
var casedRe = new RegExp("^\\p{Cased}$", "u");
function charHasCase(char) {
  return casedRe.test(char);
}
function getCasesOutsideCharClassRange(node, options) {
  const firstOnly = !!options?.firstOnly;
  const min = node.min.value;
  const max = node.max.value;
  const found = [];
  if (min < 65 && (max === 65535 || max >= 131071) || min === 65536 && max >= 131071) {
    return found;
  }
  for (let i2 = min; i2 <= max; i2++) {
    const char = cp(i2);
    if (!charHasCase(char)) {
      continue;
    }
    const charsOutsideRange = getIgnoreCaseMatchChars(char).filter((caseOfChar) => {
      const num = caseOfChar.codePointAt(0);
      return num < min || num > max;
    });
    if (charsOutsideRange.length) {
      found.push(...charsOutsideRange);
      if (firstOnly) {
        break;
      }
    }
  }
  return found;
}
function getCharEscape(codePoint, { escDigit, inCharClass, useFlagV }) {
  if (CharCodeEscapeMap.has(codePoint)) {
    return CharCodeEscapeMap.get(codePoint);
  }
  if (
    // Control chars, etc.; condition modeled on the Chrome developer console's display for strings
    codePoint < 32 || codePoint > 126 && codePoint < 160 || // Unicode planes 4-16; unassigned, special purpose, and private use area
    codePoint > 262143 || // Avoid corrupting a preceding backref by immediately following it with a literal digit
    escDigit && isDigitCharCode(codePoint)
  ) {
    return codePoint > 255 ? `\\u{${codePoint.toString(16).toUpperCase()}}` : `\\x${codePoint.toString(16).toUpperCase().padStart(2, "0")}`;
  }
  const escapeChars = inCharClass ? useFlagV ? CharClassEscapeCharsFlagV : CharClassEscapeChars : BaseEscapeChars;
  const char = cp(codePoint);
  return (escapeChars.has(char) ? "\\" : "") + char;
}
function getCodePointRangesFromChars(chars) {
  const codePoints = chars.map((char) => char.codePointAt(0)).sort((a, b2) => a - b2);
  const values = [];
  let start = null;
  for (let i2 = 0; i2 < codePoints.length; i2++) {
    if (codePoints[i2 + 1] === codePoints[i2] + 1) {
      start ??= codePoints[i2];
    } else if (start === null) {
      values.push(codePoints[i2]);
    } else {
      values.push([start, codePoints[i2]]);
      start = null;
    }
  }
  return values;
}
function getGroupPrefix(atomic2, flagMods, useFlagMods) {
  if (atomic2) {
    return ">";
  }
  let mods = "";
  if (flagMods && useFlagMods) {
    const { enable, disable } = flagMods;
    mods = (enable?.ignoreCase ? "i" : "") + (enable?.dotAll ? "s" : "") + (disable ? "-" : "") + (disable?.ignoreCase ? "i" : "") + (disable?.dotAll ? "s" : "");
  }
  return `${mods}:`;
}
function getQuantifierStr({ kind, max, min }) {
  let base;
  if (!min && max === 1) {
    base = "?";
  } else if (!min && max === Infinity) {
    base = "*";
  } else if (min === 1 && max === Infinity) {
    base = "+";
  } else if (min === max) {
    base = `{${min}}`;
  } else {
    base = `{${min},${max === Infinity ? "" : max}}`;
  }
  return base + {
    greedy: "",
    lazy: "?",
    possessive: "+"
  }[kind];
}
function isAnyGroup({ type }) {
  return type === "CapturingGroup" || type === "Group" || type === "LookaroundAssertion";
}
function isDigitCharCode(value) {
  return value > 47 && value < 58;
}
function isLiteralHyphen({ type, value }) {
  return type === "Character" && value === 45;
}
var EmulatedRegExp = class _EmulatedRegExp extends RegExp {
  /**
  @type {Map<number, {
    hidden?: true;
    transferTo?: number;
  }>}
  */
  #captureMap = /* @__PURE__ */ new Map();
  /**
  @type {RegExp | EmulatedRegExp | null}
  */
  #compiled = null;
  /**
  @type {string}
  */
  #pattern;
  /**
  @type {Map<number, string>?}
  */
  #nameMap = null;
  /**
  @type {string?}
  */
  #strategy = null;
  /**
  Can be used to serialize the instance.
  @type {EmulatedRegExpOptions}
  */
  rawOptions = {};
  // Override the getter with one that works with lazy-compiled regexes
  get source() {
    return this.#pattern || "(?:)";
  }
  /**
  @overload
  @param {string} pattern
  @param {string} [flags]
  @param {EmulatedRegExpOptions} [options]
  */
  /**
  @overload
  @param {EmulatedRegExp} pattern
  @param {string} [flags]
  */
  constructor(pattern, flags, options) {
    const lazyCompile = !!options?.lazyCompile;
    if (pattern instanceof RegExp) {
      if (options) {
        throw new Error("Cannot provide options when copying a regexp");
      }
      const re2 = pattern;
      super(re2, flags);
      this.#pattern = re2.source;
      if (re2 instanceof _EmulatedRegExp) {
        this.#captureMap = re2.#captureMap;
        this.#nameMap = re2.#nameMap;
        this.#strategy = re2.#strategy;
        this.rawOptions = re2.rawOptions;
      }
    } else {
      const opts = {
        hiddenCaptures: [],
        strategy: null,
        transfers: [],
        ...options
      };
      super(lazyCompile ? "" : pattern, flags);
      this.#pattern = pattern;
      this.#captureMap = createCaptureMap(opts.hiddenCaptures, opts.transfers);
      this.#strategy = opts.strategy;
      this.rawOptions = options ?? {};
    }
    if (!lazyCompile) {
      this.#compiled = this;
    }
  }
  /**
  Called internally by all String/RegExp methods that use regexes.
  @override
  @param {string} str
  @returns {RegExpExecArray?}
  */
  exec(str) {
    if (!this.#compiled) {
      const { lazyCompile, ...rest } = this.rawOptions;
      this.#compiled = new _EmulatedRegExp(this.#pattern, this.flags, rest);
    }
    const useLastIndex = this.global || this.sticky;
    const pos = this.lastIndex;
    if (this.#strategy === "clip_search" && useLastIndex && pos) {
      this.lastIndex = 0;
      const match = this.#execCore(str.slice(pos));
      if (match) {
        adjustMatchDetailsForOffset(match, pos, str, this.hasIndices);
        this.lastIndex += pos;
      }
      return match;
    }
    return this.#execCore(str);
  }
  /**
  Adds support for hidden and transfer captures.
  @param {string} str
  @returns
  */
  #execCore(str) {
    this.#compiled.lastIndex = this.lastIndex;
    const match = super.exec.call(this.#compiled, str);
    this.lastIndex = this.#compiled.lastIndex;
    if (!match || !this.#captureMap.size) {
      return match;
    }
    const matchCopy = [...match];
    match.length = 1;
    let indicesCopy;
    if (this.hasIndices) {
      indicesCopy = [...match.indices];
      match.indices.length = 1;
    }
    const mappedNums = [0];
    for (let i2 = 1; i2 < matchCopy.length; i2++) {
      const { hidden, transferTo } = this.#captureMap.get(i2) ?? {};
      if (hidden) {
        mappedNums.push(null);
      } else {
        mappedNums.push(match.length);
        match.push(matchCopy[i2]);
        if (this.hasIndices) {
          match.indices.push(indicesCopy[i2]);
        }
      }
      if (transferTo && matchCopy[i2] !== void 0) {
        const to = mappedNums[transferTo];
        if (!to) {
          throw new Error(`Invalid capture transfer to "${to}"`);
        }
        match[to] = matchCopy[i2];
        if (this.hasIndices) {
          match.indices[to] = indicesCopy[i2];
        }
        if (match.groups) {
          if (!this.#nameMap) {
            this.#nameMap = createNameMap(this.source);
          }
          const name = this.#nameMap.get(transferTo);
          if (name) {
            match.groups[name] = matchCopy[i2];
            if (this.hasIndices) {
              match.indices.groups[name] = indicesCopy[i2];
            }
          }
        }
      }
    }
    return match;
  }
};
function adjustMatchDetailsForOffset(match, offset, input, hasIndices) {
  match.index += offset;
  match.input = input;
  if (hasIndices) {
    const indices = match.indices;
    for (let i2 = 0; i2 < indices.length; i2++) {
      const arr = indices[i2];
      if (arr) {
        indices[i2] = [arr[0] + offset, arr[1] + offset];
      }
    }
    const groupIndices = indices.groups;
    if (groupIndices) {
      Object.keys(groupIndices).forEach((key2) => {
        const arr = groupIndices[key2];
        if (arr) {
          groupIndices[key2] = [arr[0] + offset, arr[1] + offset];
        }
      });
    }
  }
}
function createCaptureMap(hiddenCaptures, transfers) {
  const captureMap = /* @__PURE__ */ new Map();
  for (const num of hiddenCaptures) {
    captureMap.set(num, {
      hidden: true
    });
  }
  for (const [to, from] of transfers) {
    for (const num of from) {
      getOrInsert(captureMap, num, {}).transferTo = to;
    }
  }
  return captureMap;
}
function createNameMap(pattern) {
  const re2 = /(?<capture>\((?:\?<(?![=!])(?<name>[^>]+)>|(?!\?)))|\\?./gsu;
  const map = /* @__PURE__ */ new Map();
  let numCharClassesOpen = 0;
  let numCaptures = 0;
  let match;
  while (match = re2.exec(pattern)) {
    const { 0: m2, groups: { capture, name } } = match;
    if (m2 === "[") {
      numCharClassesOpen++;
    } else if (!numCharClassesOpen) {
      if (capture) {
        numCaptures++;
        if (name) {
          map.set(numCaptures, name);
        }
      }
    } else if (m2 === "]") {
      numCharClassesOpen--;
    }
  }
  return map;
}
function toRegExp(pattern, options) {
  const d2 = toRegExpDetails(pattern, options);
  if (d2.options) {
    return new EmulatedRegExp(d2.pattern, d2.flags, d2.options);
  }
  return new RegExp(d2.pattern, d2.flags);
}
function toRegExpDetails(pattern, options) {
  const opts = getOptions(options);
  const onigurumaAst = J(pattern, {
    flags: opts.flags,
    normalizeUnknownPropertyNames: true,
    rules: {
      captureGroup: opts.rules.captureGroup,
      singleline: opts.rules.singleline
    },
    skipBackrefValidation: opts.rules.allowOrphanBackrefs,
    unicodePropertyMap: JsUnicodePropertyMap
  });
  const regexPlusAst = transform(onigurumaAst, {
    accuracy: opts.accuracy,
    asciiWordBoundaries: opts.rules.asciiWordBoundaries,
    avoidSubclass: opts.avoidSubclass,
    bestEffortTarget: opts.target
  });
  const generated = generate(regexPlusAst, opts);
  const recursionResult = recursion(generated.pattern, {
    captureTransfers: generated._captureTransfers,
    hiddenCaptures: generated._hiddenCaptures,
    mode: "external"
  });
  const possessiveResult = possessive(recursionResult.pattern);
  const atomicResult = atomic(possessiveResult.pattern, {
    captureTransfers: recursionResult.captureTransfers,
    hiddenCaptures: recursionResult.hiddenCaptures
  });
  const details = {
    pattern: atomicResult.pattern,
    flags: `${opts.hasIndices ? "d" : ""}${opts.global ? "g" : ""}${generated.flags}${generated.options.disable.v ? "u" : "v"}`
  };
  if (opts.avoidSubclass) {
    if (opts.lazyCompileLength !== Infinity) {
      throw new Error("Lazy compilation requires subclass");
    }
  } else {
    const hiddenCaptures = atomicResult.hiddenCaptures.sort((a, b2) => a - b2);
    const transfers = Array.from(atomicResult.captureTransfers);
    const strategy = regexPlusAst._strategy;
    const lazyCompile = details.pattern.length >= opts.lazyCompileLength;
    if (hiddenCaptures.length || transfers.length || strategy || lazyCompile) {
      details.options = {
        ...hiddenCaptures.length && { hiddenCaptures },
        ...transfers.length && { transfers },
        ...strategy && { strategy },
        ...lazyCompile && { lazyCompile }
      };
    }
  }
  return details;
}
const MAX = 4294967295;
class JavaScriptScanner {
  constructor(patterns, options = {}) {
    this.patterns = patterns;
    this.options = options;
    const {
      forgiving = false,
      cache: cache2,
      regexConstructor
    } = options;
    if (!regexConstructor) {
      throw new Error("Option `regexConstructor` is not provided");
    }
    this.regexps = patterns.map((p2) => {
      if (typeof p2 !== "string") {
        return p2;
      }
      const cached = cache2?.get(p2);
      if (cached) {
        if (cached instanceof RegExp) {
          return cached;
        }
        if (forgiving)
          return null;
        throw cached;
      }
      try {
        const regex = regexConstructor(p2);
        cache2?.set(p2, regex);
        return regex;
      } catch (e) {
        cache2?.set(p2, e);
        if (forgiving)
          return null;
        throw e;
      }
    });
  }
  regexps;
  findNextMatchSync(string, startPosition, _options) {
    const str = typeof string === "string" ? string : string.content;
    const pending = [];
    function toResult(index, match, offset = 0) {
      return {
        index,
        captureIndices: match.indices.map((indice) => {
          if (indice == null) {
            return {
              start: MAX,
              end: MAX,
              length: 0
            };
          }
          return {
            start: indice[0] + offset,
            end: indice[1] + offset,
            length: indice[1] - indice[0]
          };
        })
      };
    }
    for (let i2 = 0; i2 < this.regexps.length; i2++) {
      const regexp = this.regexps[i2];
      if (!regexp)
        continue;
      try {
        regexp.lastIndex = startPosition;
        const match = regexp.exec(str);
        if (!match)
          continue;
        if (match.index === startPosition) {
          return toResult(i2, match, 0);
        }
        pending.push([i2, match, 0]);
      } catch (e) {
        if (this.options.forgiving)
          continue;
        throw e;
      }
    }
    if (pending.length) {
      const minIndex = Math.min(...pending.map((m2) => m2[1].index));
      for (const [i2, match, offset] of pending) {
        if (match.index === minIndex) {
          return toResult(i2, match, offset);
        }
      }
    }
    return null;
  }
}
function defaultJavaScriptRegexConstructor(pattern, options) {
  return toRegExp(
    pattern,
    {
      global: true,
      hasIndices: true,
      // This has no benefit for the standard JS engine, but it avoids a perf penalty for
      // precompiled grammars when constructing extremely long patterns that aren't always used
      lazyCompileLength: 3e3,
      rules: {
        // Needed since TextMate grammars merge backrefs across patterns
        allowOrphanBackrefs: true,
        // Improves search performance for generated regexes
        asciiWordBoundaries: true,
        // Follow `vscode-oniguruma` which enables this Oniguruma option by default
        captureGroup: true,
        // Oniguruma uses depth limit `20`; lowered here to keep regexes shorter and maybe
        // sometimes faster, but can be increased if issues reported due to low limit
        recursionLimit: 5,
        // Oniguruma option for `^`->`\A`, `$`->`\Z`; improves search performance without any
        // change in meaning since TM grammars search line by line
        singleline: true
      },
      ...options
    }
  );
}
function createJavaScriptRegexEngine(options = {}) {
  const _options = Object.assign(
    {
      target: "auto",
      cache: /* @__PURE__ */ new Map()
    },
    options
  );
  _options.regexConstructor ||= (pattern) => defaultJavaScriptRegexConstructor(pattern, { target: _options.target });
  return {
    createScanner(patterns) {
      return new JavaScriptScanner(patterns, _options);
    },
    createString(s2) {
      return {
        content: s2
      };
    }
  };
}
async function resolveLanguage(lang) {
  if (isWorkerContext()) throw new Error(`resolveLanguage("${lang}") cannot be called from a worker context. Languages must be pre-resolved on the main thread and passed to the worker via the resolvedLanguages parameter.`);
  const resolver = ResolvingLanguages.get(lang);
  if (resolver != null) return resolver;
  try {
    let loader = RegisteredCustomLanguages.get(lang);
    if (loader == null && Object.prototype.hasOwnProperty.call(bundledLanguages, lang)) loader = bundledLanguages[lang];
    if (loader == null) throw new Error(`resolveLanguage: "${lang}" not found in bundled or custom languages`);
    const resolver2 = loader().then(({ default: data }) => {
      const resolvedLang = {
        name: lang,
        data
      };
      if (!ResolvedLanguages.has(lang)) ResolvedLanguages.set(lang, resolvedLang);
      return resolvedLang;
    });
    ResolvingLanguages.set(lang, resolver2);
    return await resolver2;
  } finally {
    ResolvingLanguages.delete(lang);
  }
}
function getResolvedOrResolveLanguage(language) {
  return ResolvedLanguages.get(language) ?? resolveLanguage(language);
}
function createTheme({ name, load, colorScheme, collection, displayName }) {
  return {
    name,
    colorScheme,
    collection,
    displayName,
    load: normalizingLoader(load)
  };
}
function normalizingLoader(loader) {
  return async () => {
    return normalizeTheme(unwrapDefault(await loader()));
  };
}
const PIERRE_COLLECTION = "pierre";
const DARK_PIERRE_THEMES = [
  "pierre-dark",
  "pierre-dark-soft",
  "pierre-dark-vibrant",
  "pierre-dark-protanopia-deuteranopia",
  "pierre-dark-tritanopia"
];
const LIGHT_PIERRE_THEMES = [
  "pierre-light",
  "pierre-light-soft",
  "pierre-light-vibrant",
  "pierre-light-protanopia-deuteranopia",
  "pierre-light-tritanopia"
];
const PIERRE_THEMES = [...LIGHT_PIERRE_THEMES, ...DARK_PIERRE_THEMES];
const LIGHT_PIERRE_THEME_NAMES = new Set(LIGHT_PIERRE_THEMES);
function pierreColorScheme(name) {
  if (LIGHT_PIERRE_THEME_NAMES.has(name)) return "light";
  return "dark";
}
const PIERRE_THEME_DISPLAY_NAMES = {
  "pierre-dark": "Pierre Dark",
  "pierre-dark-soft": "Pierre Dark Soft",
  "pierre-dark-vibrant": "Pierre Dark Vibrant",
  "pierre-dark-protanopia-deuteranopia": "Pierre Dark Protanopia & Deuteranopia",
  "pierre-dark-tritanopia": "Pierre Dark Tritanopia",
  "pierre-light": "Pierre Light",
  "pierre-light-soft": "Pierre Light Soft",
  "pierre-light-vibrant": "Pierre Light Vibrant",
  "pierre-light-protanopia-deuteranopia": "Pierre Light Protanopia & Deuteranopia",
  "pierre-light-tritanopia": "Pierre Light Tritanopia"
};
const PIERRE_THEME_IMPORTS = {
  "pierre-dark": () => __vitePreload(() => import("./pierre-dark-BL-l9r39.js"), true ? [] : void 0, import.meta.url),
  "pierre-dark-soft": () => __vitePreload(() => import("./pierre-dark-soft-B6TBhICr.js"), true ? [] : void 0, import.meta.url),
  "pierre-dark-vibrant": () => __vitePreload(() => import("./pierre-dark-vibrant-yElMGqZN.js"), true ? [] : void 0, import.meta.url),
  "pierre-dark-protanopia-deuteranopia": () => __vitePreload(() => import("./pierre-dark-protanopia-deuteranopia-BBjGuJQU.js"), true ? [] : void 0, import.meta.url),
  "pierre-dark-tritanopia": () => __vitePreload(() => import("./pierre-dark-tritanopia-f-j_EX9A.js"), true ? [] : void 0, import.meta.url),
  "pierre-light": () => __vitePreload(() => import("./pierre-light-BUzWTcjO.js"), true ? [] : void 0, import.meta.url),
  "pierre-light-soft": () => __vitePreload(() => import("./pierre-light-soft-CCMU-Zh0.js"), true ? [] : void 0, import.meta.url),
  "pierre-light-vibrant": () => __vitePreload(() => import("./pierre-light-vibrant-BRUbQnMc.js"), true ? [] : void 0, import.meta.url),
  "pierre-light-protanopia-deuteranopia": () => __vitePreload(() => import("./pierre-light-protanopia-deuteranopia-DlvVSCaI.js"), true ? [] : void 0, import.meta.url),
  "pierre-light-tritanopia": () => __vitePreload(() => import("./pierre-light-tritanopia-v4xacE1C.js"), true ? [] : void 0, import.meta.url)
};
function createPierreTheme(name) {
  return createTheme({
    name,
    collection: PIERRE_COLLECTION,
    colorScheme: pierreColorScheme(name),
    displayName: PIERRE_THEME_DISPLAY_NAMES[name],
    load: PIERRE_THEME_IMPORTS[name]
  });
}
const pierreThemes = createThemeCollection({ themes: PIERRE_THEMES.map((name) => createPierreTheme(name)) });
const SHIKI_COLLECTION = "shiki";
const LIGHT_SHIKI_THEMES = [
  "ayu-light",
  "catppuccin-latte",
  "everforest-light",
  "github-light",
  "github-light-default",
  "github-light-high-contrast",
  "gruvbox-light-hard",
  "gruvbox-light-medium",
  "gruvbox-light-soft",
  "horizon-bright",
  "kanagawa-lotus",
  "light-plus",
  "material-theme-lighter",
  "min-light",
  "night-owl-light",
  "one-light",
  "rose-pine-dawn",
  "slack-ochin",
  "snazzy-light",
  "solarized-light",
  "vitesse-light"
];
const DARK_SHIKI_THEMES = [
  "andromeeda",
  "aurora-x",
  "ayu-dark",
  "ayu-mirage",
  "catppuccin-frappe",
  "catppuccin-macchiato",
  "catppuccin-mocha",
  "dark-plus",
  "dracula",
  "dracula-soft",
  "everforest-dark",
  "github-dark",
  "github-dark-default",
  "github-dark-dimmed",
  "github-dark-high-contrast",
  "gruvbox-dark-hard",
  "gruvbox-dark-medium",
  "gruvbox-dark-soft",
  "horizon",
  "houston",
  "kanagawa-dragon",
  "kanagawa-wave",
  "laserwave",
  "material-theme",
  "material-theme-darker",
  "material-theme-ocean",
  "material-theme-palenight",
  "min-dark",
  "monokai",
  "night-owl",
  "nord",
  "one-dark-pro",
  "plastic",
  "poimandres",
  "red",
  "rose-pine",
  "rose-pine-moon",
  "slack-dark",
  "solarized-dark",
  "synthwave-84",
  "tokyo-night",
  "vesper",
  "vitesse-black",
  "vitesse-dark"
];
const LIGHT_SHIKI_THEME_NAMES = new Set(LIGHT_SHIKI_THEMES);
function shikiColorScheme(name) {
  if (LIGHT_SHIKI_THEME_NAMES.has(name)) return "light";
  return "dark";
}
const SHIKI_THEME_IMPORTS = {
  andromeeda: () => __vitePreload(() => import("./andromeeda-C847lm7Z.js"), true ? [] : void 0, import.meta.url),
  "aurora-x": () => __vitePreload(() => import("./aurora-x-wJ4-eM2h.js"), true ? [] : void 0, import.meta.url),
  "ayu-dark": () => __vitePreload(() => import("./ayu-dark-rtpbXCNg.js"), true ? [] : void 0, import.meta.url),
  "ayu-light": () => __vitePreload(() => import("./ayu-light-BCZDSyV8.js"), true ? [] : void 0, import.meta.url),
  "ayu-mirage": () => __vitePreload(() => import("./ayu-mirage-BVoH71sA.js"), true ? [] : void 0, import.meta.url),
  "catppuccin-frappe": () => __vitePreload(() => import("./catppuccin-frappe-C21OPQfC.js"), true ? [] : void 0, import.meta.url),
  "catppuccin-latte": () => __vitePreload(() => import("./catppuccin-latte-0ZtXlsrX.js"), true ? [] : void 0, import.meta.url),
  "catppuccin-macchiato": () => __vitePreload(() => import("./catppuccin-macchiato-BD_FR4sl.js"), true ? [] : void 0, import.meta.url),
  "catppuccin-mocha": () => __vitePreload(() => import("./catppuccin-mocha-C653csR5.js"), true ? [] : void 0, import.meta.url),
  "dark-plus": () => __vitePreload(() => import("./dark-plus-DmZ1Dzd4.js"), true ? [] : void 0, import.meta.url),
  dracula: () => __vitePreload(() => import("./dracula-B8-AVrwI.js"), true ? [] : void 0, import.meta.url),
  "dracula-soft": () => __vitePreload(() => import("./dracula-soft-BHeefow7.js"), true ? [] : void 0, import.meta.url),
  "everforest-dark": () => __vitePreload(() => import("./everforest-dark-Cg1xdODP.js"), true ? [] : void 0, import.meta.url),
  "everforest-light": () => __vitePreload(() => import("./everforest-light-BmTD3bxe.js"), true ? [] : void 0, import.meta.url),
  "github-dark": () => __vitePreload(() => import("./github-dark-O22yVQaY.js"), true ? [] : void 0, import.meta.url),
  "github-dark-default": () => __vitePreload(() => import("./github-dark-default-DB2Hkvqn.js"), true ? [] : void 0, import.meta.url),
  "github-dark-dimmed": () => __vitePreload(() => import("./github-dark-dimmed-CMZ_OfqC.js"), true ? [] : void 0, import.meta.url),
  "github-dark-high-contrast": () => __vitePreload(() => import("./github-dark-high-contrast-DmxWVmCU.js"), true ? [] : void 0, import.meta.url),
  "github-light": () => __vitePreload(() => import("./github-light-BTbR9xVK.js"), true ? [] : void 0, import.meta.url),
  "github-light-default": () => __vitePreload(() => import("./github-light-default-DWEonwFe.js"), true ? [] : void 0, import.meta.url),
  "github-light-high-contrast": () => __vitePreload(() => import("./github-light-high-contrast-WJ_cPDts.js"), true ? [] : void 0, import.meta.url),
  "gruvbox-dark-hard": () => __vitePreload(() => import("./gruvbox-dark-hard-DVsRsETr.js"), true ? [] : void 0, import.meta.url),
  "gruvbox-dark-medium": () => __vitePreload(() => import("./gruvbox-dark-medium-B5JBrQdg.js"), true ? [] : void 0, import.meta.url),
  "gruvbox-dark-soft": () => __vitePreload(() => import("./gruvbox-dark-soft-Db-YOqRx.js"), true ? [] : void 0, import.meta.url),
  "gruvbox-light-hard": () => __vitePreload(() => import("./gruvbox-light-hard-CXzJt7DI.js"), true ? [] : void 0, import.meta.url),
  "gruvbox-light-medium": () => __vitePreload(() => import("./gruvbox-light-medium-B89RAI1Y.js"), true ? [] : void 0, import.meta.url),
  "gruvbox-light-soft": () => __vitePreload(() => import("./gruvbox-light-soft-Cs0hTZYv.js"), true ? [] : void 0, import.meta.url),
  horizon: () => __vitePreload(() => import("./horizon-DWzh3z5C.js"), true ? [] : void 0, import.meta.url),
  "horizon-bright": () => __vitePreload(() => import("./horizon-bright-C1AFkPsv.js"), true ? [] : void 0, import.meta.url),
  houston: () => __vitePreload(() => import("./houston-CF_ws8Cq.js"), true ? [] : void 0, import.meta.url),
  "kanagawa-dragon": () => __vitePreload(() => import("./kanagawa-dragon-DU8n2NNT.js"), true ? [] : void 0, import.meta.url),
  "kanagawa-lotus": () => __vitePreload(() => import("./kanagawa-lotus-Byd0CDet.js"), true ? [] : void 0, import.meta.url),
  "kanagawa-wave": () => __vitePreload(() => import("./kanagawa-wave-DExoagcR.js"), true ? [] : void 0, import.meta.url),
  laserwave: () => __vitePreload(() => import("./laserwave-DF03wMlf.js"), true ? [] : void 0, import.meta.url),
  "light-plus": () => __vitePreload(() => import("./light-plus-DS08Xg5J.js"), true ? [] : void 0, import.meta.url),
  "material-theme": () => __vitePreload(() => import("./material-theme-B8B2U48Q.js"), true ? [] : void 0, import.meta.url),
  "material-theme-darker": () => __vitePreload(() => import("./material-theme-darker-BV0iY_T3.js"), true ? [] : void 0, import.meta.url),
  "material-theme-lighter": () => __vitePreload(() => import("./material-theme-lighter-DrzybSTF.js"), true ? [] : void 0, import.meta.url),
  "material-theme-ocean": () => __vitePreload(() => import("./material-theme-ocean-BRPLVReX.js"), true ? [] : void 0, import.meta.url),
  "material-theme-palenight": () => __vitePreload(() => import("./material-theme-palenight-DSJwsR_D.js"), true ? [] : void 0, import.meta.url),
  "min-dark": () => __vitePreload(() => import("./min-dark-BNaN9fWk.js"), true ? [] : void 0, import.meta.url),
  "min-light": () => __vitePreload(() => import("./min-light-CMrjentn.js"), true ? [] : void 0, import.meta.url),
  monokai: () => __vitePreload(() => import("./monokai-DelygWXa.js"), true ? [] : void 0, import.meta.url),
  "night-owl": () => __vitePreload(() => import("./night-owl-DSS199ra.js"), true ? [] : void 0, import.meta.url),
  "night-owl-light": () => __vitePreload(() => import("./night-owl-light-gC6E-Eh2.js"), true ? [] : void 0, import.meta.url),
  nord: () => __vitePreload(() => import("./nord-CvDbBq5M.js"), true ? [] : void 0, import.meta.url),
  "one-dark-pro": () => __vitePreload(() => import("./one-dark-pro-CsMf0BoJ.js"), true ? [] : void 0, import.meta.url),
  "one-light": () => __vitePreload(() => import("./one-light-B0cTzZyr.js"), true ? [] : void 0, import.meta.url),
  plastic: () => __vitePreload(() => import("./plastic-BjwMpBc0.js"), true ? [] : void 0, import.meta.url),
  poimandres: () => __vitePreload(() => import("./poimandres-ChWyhPrn.js"), true ? [] : void 0, import.meta.url),
  red: () => __vitePreload(() => import("./red-DByOl5N0.js"), true ? [] : void 0, import.meta.url),
  "rose-pine": () => __vitePreload(() => import("./rose-pine-B-kZ4Z9q.js"), true ? [] : void 0, import.meta.url),
  "rose-pine-dawn": () => __vitePreload(() => import("./rose-pine-dawn-efeVGdSI.js"), true ? [] : void 0, import.meta.url),
  "rose-pine-moon": () => __vitePreload(() => import("./rose-pine-moon-DmodZNzl.js"), true ? [] : void 0, import.meta.url),
  "slack-dark": () => __vitePreload(() => import("./slack-dark-BEe10hxO.js"), true ? [] : void 0, import.meta.url),
  "slack-ochin": () => __vitePreload(() => import("./slack-ochin-BKmu9pBc.js"), true ? [] : void 0, import.meta.url),
  "snazzy-light": () => __vitePreload(() => import("./snazzy-light-Dcvd-ZyI.js"), true ? [] : void 0, import.meta.url),
  "solarized-dark": () => __vitePreload(() => import("./solarized-dark-BBl5y5sR.js"), true ? [] : void 0, import.meta.url),
  "solarized-light": () => __vitePreload(() => import("./solarized-light-DW9b_AY8.js"), true ? [] : void 0, import.meta.url),
  "synthwave-84": () => __vitePreload(() => import("./synthwave-84-CoUef9sh.js"), true ? [] : void 0, import.meta.url),
  "tokyo-night": () => __vitePreload(() => import("./tokyo-night-DjtLpAEY.js"), true ? [] : void 0, import.meta.url),
  vesper: () => __vitePreload(() => import("./vesper-4Q1cEwPL.js"), true ? [] : void 0, import.meta.url),
  "vitesse-black": () => __vitePreload(() => import("./vitesse-black-BqNLki8b.js"), true ? [] : void 0, import.meta.url),
  "vitesse-dark": () => __vitePreload(() => import("./vitesse-dark-jJ32WhwH.js"), true ? [] : void 0, import.meta.url),
  "vitesse-light": () => __vitePreload(() => import("./vitesse-light-476zM4e6.js"), true ? [] : void 0, import.meta.url)
};
function createShikiTheme(name) {
  return createTheme({
    name,
    collection: SHIKI_COLLECTION,
    colorScheme: shikiColorScheme(name),
    load: SHIKI_THEME_IMPORTS[name]
  });
}
const shikiThemes = createThemeCollection({ themes: Object.freeze([...LIGHT_SHIKI_THEMES.map((name) => createShikiTheme(name)), ...DARK_SHIKI_THEMES.map((name) => createShikiTheme(name))]) });
createThemeCollection({ themes: [pierreThemes, shikiThemes] });
function prepareThemeResolution(themeName) {
  if (isWorkerContext()) throw new Error(`Theme "${themeName}" cannot be resolved from a worker context. Themes must be pre-resolved on the main thread and passed to the worker via the resolvedLanguages parameter.`);
  if (themeResolver.hasRegisteredTheme(themeName)) return;
  const descriptor = shikiThemes.getTheme(themeName);
  if (descriptor != null) {
    themeResolver.registerThemeIfAbsent(descriptor.name, descriptor.load);
    return;
  }
  throw new Error(`No valid theme loader registered for "${themeName}"`);
}
function validateResolvedThemeName(themeName, theme) {
  if (theme.name !== themeName) throw new Error(`resolvedTheme: themeName: ${themeName} does not match theme.name: ${theme.name}`);
}
async function resolveTheme(themeName) {
  prepareThemeResolution(themeName);
  const theme = await themeResolver.resolveTheme(themeName);
  validateResolvedThemeName(themeName, theme);
  return theme;
}
function getResolvedOrResolveTheme(themeName) {
  return themeResolver.getResolvedTheme(themeName) ?? resolveTheme(themeName);
}
let highlighter;
async function getSharedHighlighter({ themes, langs, preferredHighlighter = "shiki-js" }) {
  highlighter ??= createHighlighter({
    themes: [],
    langs: ["text"],
    engine: preferredHighlighter === "shiki-wasm" ? createOnigurumaEngine(__vitePreload(() => import("./wasm-DDgzZJey.js"), true ? [] : void 0, import.meta.url)) : createJavaScriptRegexEngine()
  });
  const instance = isHighlighterLoading(highlighter) ? await highlighter : highlighter;
  highlighter = instance;
  const languageLoaders = [];
  for (const language of langs) {
    if (language === "text" || language === "ansi") continue;
    const maybeResolvedLanguage = getResolvedOrResolveLanguage(language);
    if ("then" in maybeResolvedLanguage) languageLoaders.push(maybeResolvedLanguage);
    else attachResolvedLanguages(maybeResolvedLanguage, instance);
  }
  const themeLoaders = [];
  for (const themeName of themes) {
    const maybeResolvedTheme = getResolvedOrResolveTheme(themeName);
    if ("then" in maybeResolvedTheme) themeLoaders.push(maybeResolvedTheme);
    else attachResolvedThemes(maybeResolvedTheme, highlighter);
  }
  if (languageLoaders.length > 0 || themeLoaders.length > 0) await Promise.all([Promise.all(languageLoaders).then((languages) => {
    attachResolvedLanguages(languages, instance);
  }), Promise.all(themeLoaders).then((themes2) => {
    attachResolvedThemes(themes2, instance);
  })]);
  return instance;
}
function getHighlighterIfLoaded() {
  if (highlighter != null && !("then" in highlighter)) return highlighter;
}
function isHighlighterLoading(h2 = highlighter) {
  return h2 != null && "then" in h2;
}
async function preloadHighlighter(options) {
  await getSharedHighlighter(options);
}
for (const descriptor of pierreThemes.getThemes()) themeResolver.registerThemeIfAbsent(descriptor.name, descriptor.load);
function getThemes(theme = DEFAULT_THEMES) {
  const themesArr = [];
  if (typeof theme === "string") themesArr.push(theme);
  else {
    themesArr.push(theme.dark);
    themesArr.push(theme.light);
  }
  return themesArr;
}
function createTextNodeElement(value) {
  return {
    type: "text",
    value
  };
}
function createHastElement({ tagName, children = [], properties = {} }) {
  return {
    type: "element",
    tagName,
    properties,
    children
  };
}
function createIconElement({ name, width = 16, height = 16, properties }) {
  return createHastElement({
    tagName: "svg",
    properties: {
      width,
      height,
      viewBox: "0 0 16 16",
      ...properties
    },
    children: [createHastElement({
      tagName: "use",
      properties: { href: `#${name.replace(/^#/, "")}` }
    })]
  });
}
function findCodeElement(nodes) {
  let firstChild = nodes.children[0];
  while (firstChild != null) {
    if (firstChild.type === "element" && firstChild.tagName === "code") return firstChild;
    if ("children" in firstChild) firstChild = firstChild.children[0];
    else firstChild = null;
  }
}
function createGutterWrapper(children) {
  return createHastElement({
    tagName: "div",
    properties: { "data-gutter": "" },
    children
  });
}
function createGutterItem(lineType, lineNumber, lineIndex, properties = {}) {
  return createHastElement({
    tagName: "div",
    properties: {
      "data-line-type": lineType,
      "data-column-number": lineNumber,
      "data-line-index": lineIndex,
      ...properties
    },
    children: lineNumber != null ? [createHastElement({
      tagName: "span",
      properties: { "data-line-number-content": "" },
      children: [createTextNodeElement(`${lineNumber}`)]
    })] : void 0
  });
}
function createGutterGap(type, bufferType, size) {
  return createHastElement({
    tagName: "div",
    properties: {
      "data-gutter-buffer": bufferType,
      "data-buffer-size": size,
      "data-line-type": bufferType === "annotation" ? void 0 : type,
      style: bufferType === "annotation" ? `grid-row: span ${size};` : `grid-row: span ${size};min-height:calc(${size} * 1lh);`
    }
  });
}
function processLine(node, line, state) {
  const lineInfo = typeof state.lineInfo === "function" ? state.lineInfo(line) : state.lineInfo[line - 1];
  if (lineInfo == null) {
    const errorMessage = `processLine: line ${line}, contains no state.lineInfo`;
    console.error(errorMessage, {
      node,
      line,
      state
    });
    throw new Error(errorMessage);
  }
  node.tagName = "div";
  node.properties["data-line"] = lineInfo.lineNumber;
  node.properties["data-alt-line"] = lineInfo.altLineNumber;
  node.properties["data-line-type"] = lineInfo.type;
  node.properties["data-line-index"] = lineInfo.lineIndex;
  if (node.children.length === 0) node.children.push(createTextNodeElement("\n"));
  return node;
}
const NO_TOKEN = /* @__PURE__ */ Symbol("no-token");
const MULTIPLE_TOKENS = /* @__PURE__ */ Symbol("multiple-tokens");
function wrapTokenFragments(container) {
  const ownTokenChar = getTokenChar(container);
  if (ownTokenChar != null) return ownTokenChar;
  let containerTokenState = NO_TOKEN;
  const wrappedChildren = [];
  let currentTokenChildren = [];
  let currentTokenChar;
  const flushTokenChildren = () => {
    if (currentTokenChildren.length === 0 || currentTokenChar == null) {
      currentTokenChildren = [];
      currentTokenChar = void 0;
      return;
    }
    if (currentTokenChildren.length === 1) {
      const child = currentTokenChildren[0];
      if (child?.type === "element") {
        setTokenChar(child, currentTokenChar);
        for (const grandChild of child.children) stripTokenChar(grandChild);
      } else stripTokenChar(child);
      wrappedChildren.push(child);
      currentTokenChildren = [];
      currentTokenChar = void 0;
      return;
    }
    for (const child of currentTokenChildren) stripTokenChar(child);
    wrappedChildren.push(createHastElement({
      tagName: "span",
      properties: { "data-char": currentTokenChar },
      children: currentTokenChildren
    }));
    currentTokenChildren = [];
    currentTokenChar = void 0;
  };
  const mergeContainerTokenState = (childTokenState) => {
    if (childTokenState === NO_TOKEN) return;
    if (childTokenState === MULTIPLE_TOKENS) {
      containerTokenState = MULTIPLE_TOKENS;
      return;
    }
    if (containerTokenState === NO_TOKEN) {
      containerTokenState = childTokenState;
      return;
    }
    if (containerTokenState !== childTokenState) containerTokenState = MULTIPLE_TOKENS;
  };
  for (const child of container.children) {
    const childTokenState = child.type === "element" ? wrapTokenFragments(child) : NO_TOKEN;
    mergeContainerTokenState(childTokenState);
    if (typeof childTokenState !== "number") {
      flushTokenChildren();
      wrappedChildren.push(child);
      continue;
    }
    if (currentTokenChar != null && currentTokenChar !== childTokenState) flushTokenChildren();
    currentTokenChar ??= childTokenState;
    currentTokenChildren.push(child);
  }
  flushTokenChildren();
  container.children = wrappedChildren;
  return containerTokenState;
}
function getTokenChar(node) {
  const value = node.properties["data-char"];
  if (typeof value === "number") return value;
}
function stripTokenChar(node) {
  if (node.type !== "element") return;
  node.properties["data-char"] = void 0;
  for (const child of node.children) stripTokenChar(child);
}
function setTokenChar(node, char) {
  node.properties["data-char"] = char;
}
function transformerStyleToClass(options = {}) {
  const {
    classPrefix = "__shiki_",
    classSuffix = "",
    classReplacer = (className) => className
  } = options;
  const classToStyle = /* @__PURE__ */ new Map();
  function stringifyStyle(style) {
    return Object.entries(style).map(([key2, value]) => `${key2}:${value}`).join(";");
  }
  function registerStyle(style) {
    const str = typeof style === "string" ? style : stringifyStyle(style);
    let className = classPrefix + cyrb53(str) + classSuffix;
    className = classReplacer(className);
    if (!classToStyle.has(className)) {
      classToStyle.set(
        className,
        typeof style === "string" ? style : { ...style }
      );
    }
    return className;
  }
  return {
    name: "@shikijs/transformers:style-to-class",
    pre(t) {
      if (!t.properties.style)
        return;
      const className = registerStyle(t.properties.style);
      delete t.properties.style;
      this.addClassToHast(t, className);
    },
    tokens(lines) {
      for (const line of lines) {
        for (const token2 of line) {
          if (!token2.htmlStyle)
            continue;
          const className = registerStyle(token2.htmlStyle);
          token2.htmlStyle = {};
          token2.htmlAttrs ||= {};
          if (!token2.htmlAttrs.class)
            token2.htmlAttrs.class = className;
          else
            token2.htmlAttrs.class += ` ${className}`;
        }
      }
    },
    getClassRegistry() {
      return classToStyle;
    },
    getCSS() {
      let css = "";
      for (const [className, style] of classToStyle.entries()) {
        css += `.${className}{${typeof style === "string" ? style : stringifyStyle(style)}}`;
      }
      return css;
    },
    clearRegistry() {
      classToStyle.clear();
    }
  };
}
function cyrb53(str, seed = 0) {
  let h1 = 3735928559 ^ seed;
  let h2 = 1103547991 ^ seed;
  for (let i2 = 0, ch; i2 < str.length; i2++) {
    ch = str.charCodeAt(i2);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ h1 >>> 16, 2246822507);
  h1 ^= Math.imul(h2 ^ h2 >>> 13, 3266489909);
  h2 = Math.imul(h2 ^ h2 >>> 16, 2246822507);
  h2 ^= Math.imul(h1 ^ h1 >>> 13, 3266489909);
  return (4294967296 * (2097151 & h2) + (h1 >>> 0)).toString(36).slice(0, 6);
}
function createTransformerWithState(useTokenTransformer = false, useCSSClasses = false) {
  const state = { lineInfo: [] };
  const transformers = [{
    line(node) {
      delete node.properties.class;
      return node;
    },
    pre(pre) {
      const code = findCodeElement(pre);
      const children = [];
      if (code != null) {
        let index = 1;
        for (const node of code.children) {
          if (node.type !== "element") continue;
          if (useTokenTransformer) wrapTokenFragments(node);
          children.push(processLine(node, index, state));
          index++;
        }
        code.children = children;
      }
      return pre;
    },
    ...useTokenTransformer ? {
      tokens(lines) {
        for (const line of lines) {
          let col = 0;
          for (const token2 of line) {
            const tokenWithOriginalRange = token2;
            tokenWithOriginalRange.__lineChar ??= col;
            col += token2.content.length;
          }
        }
      },
      preprocess(_code, options) {
        options.mergeWhitespaces = "never";
      },
      span(hast, _line, _char, _lineElement, token2) {
        if (token2?.offset != null && token2.content != null) {
          const tokenChar = token2.__lineChar;
          if (tokenChar != null) hast.properties["data-char"] = tokenChar;
          return hast;
        }
        return hast;
      }
    } : null
  }];
  if (useCSSClasses) transformers.push(tokenStyleNormalizer, toClass);
  if (useTokenTransformer) transformers.push({ line: (node) => {
    if (node.type === "element" && node.children.length === 0) node.children.push({
      type: "element",
      tagName: "br",
      properties: {},
      children: []
    });
    return node;
  } });
  return {
    state,
    transformers,
    toClass
  };
}
const toClass = transformerStyleToClass({ classPrefix: "hl-" });
const tokenStyleNormalizer = {
  name: "token-style-normalizer",
  tokens(lines) {
    for (const line of lines) for (const token2 of line) {
      if (token2.htmlStyle != null) continue;
      const style = {};
      if (token2.color != null) style.color = token2.color;
      if (token2.bgColor != null) style["background-color"] = token2.bgColor;
      if (token2.fontStyle != null && token2.fontStyle !== 0) {
        if ((token2.fontStyle & 1) !== 0) style["font-style"] = "italic";
        if ((token2.fontStyle & 2) !== 0) style["font-weight"] = "bold";
        if ((token2.fontStyle & 4) !== 0) style["text-decoration"] = "underline";
      }
      if (Object.keys(style).length > 0) token2.htmlStyle = style;
    }
  }
};
function formatCSSVariablePrefix(type) {
  return `--${type === "token" ? "diffs-token" : "diffs"}-`;
}
function getHighlighterThemeStyles({ theme = DEFAULT_THEMES, highlighter: highlighter2, prefix }) {
  let styles = "";
  if (typeof theme === "string") {
    const themeData = highlighter2.getTheme(theme);
    const normalized = normalizeThemeColors(themeData);
    styles += `color:${normalized.fg};`;
    styles += `background-color:${normalized.bg};`;
    styles += `${formatCSSVariablePrefix("global")}fg:${normalized.fg};`;
    styles += `${formatCSSVariablePrefix("global")}bg:${normalized.bg};`;
    styles += getGitVariables(themeData, prefix);
  } else {
    let themeData = highlighter2.getTheme(theme.dark);
    let normalized = normalizeThemeColors(themeData);
    styles += `${formatCSSVariablePrefix("global")}dark:${normalized.fg};`;
    styles += `${formatCSSVariablePrefix("global")}dark-bg:${normalized.bg};`;
    styles += getGitVariables(themeData, "dark");
    themeData = highlighter2.getTheme(theme.light);
    normalized = normalizeThemeColors(themeData);
    styles += `${formatCSSVariablePrefix("global")}light:${normalized.fg};`;
    styles += `${formatCSSVariablePrefix("global")}light-bg:${normalized.bg};`;
    styles += getGitVariables(themeData, "light");
  }
  return styles;
}
function getGitVariables(themeData, modePrefix) {
  modePrefix = modePrefix != null ? `${modePrefix}-` : "";
  let styles = "";
  const additionGreen = themeData.colors?.["gitDecoration.addedResourceForeground"] ?? themeData.colors?.["terminal.ansiGreen"];
  if (additionGreen != null) styles += `${formatCSSVariablePrefix("global")}${modePrefix}addition-color:${additionGreen};`;
  const deletionRed = themeData.colors?.["gitDecoration.deletedResourceForeground"] ?? themeData.colors?.["terminal.ansiRed"];
  if (deletionRed != null) styles += `${formatCSSVariablePrefix("global")}${modePrefix}deletion-color:${deletionRed};`;
  const modifiedBlue = themeData.colors?.["gitDecoration.modifiedResourceForeground"] ?? themeData.colors?.["terminal.ansiBlue"];
  if (modifiedBlue != null) styles += `${formatCSSVariablePrefix("global")}${modePrefix}modified-color:${modifiedBlue};`;
  return styles;
}
function getLineNodes(nodes) {
  let firstChild = nodes.children[0];
  while (firstChild != null) {
    if (firstChild.type === "element" && firstChild.tagName === "code") return firstChild.children;
    if ("children" in firstChild) firstChild = firstChild.children[0];
    else firstChild = null;
  }
  console.error(nodes);
  throw new Error("getLineNodes: Unable to find children");
}
function areDiffTargetsEqual(diffA, diffB) {
  return diffA === diffB || diffA?.cacheKey != null && diffA.cacheKey === diffB?.cacheKey;
}
function areDiffRenderOptionsEqual(optionsA, optionsB) {
  return areThemesEqual(optionsA.theme, optionsB.theme) && optionsA.useTokenTransformer === optionsB.useTokenTransformer && optionsA.tokenizeMaxLineLength === optionsB.tokenizeMaxLineLength && optionsA.lineDiffType === optionsB.lineDiffType && optionsA.maxLineDiffLength === optionsB.maxLineDiffLength;
}
function isDiffPlainText(diff) {
  const computedLang = diff.lang ?? getFiletypeFromFileName(diff.name);
  const computedPreviousLang = diff.lang ?? (diff.prevName != null ? getFiletypeFromFileName(diff.prevName) : "text");
  return computedLang === "text" && computedPreviousLang === "text";
}
function cleanLastNewline(contents) {
  let end = contents.length;
  if (contents.charCodeAt(end - 1) === 10) {
    end--;
    if (contents.charCodeAt(end - 1) === 13) end--;
  }
  return contents.slice(0, end);
}
function computeVirtualFileMetrics(metrics) {
  return {
    ...DEFAULT_VIRTUAL_FILE_METRICS,
    ...metrics
  };
}
function getVirtualFileHeaderRegion(metrics, disableFileHeader) {
  const paddingTop = getVirtualFilePaddingTop(metrics, disableFileHeader);
  return disableFileHeader ? paddingTop : metrics.diffHeaderHeight + paddingTop;
}
function getVirtualFilePaddingTop(metrics, disableFileHeader) {
  return metrics.paddingTop ?? (disableFileHeader ? metrics.spacing : 0);
}
function getVirtualFilePaddingBottom(metrics) {
  return metrics.paddingBottom ?? metrics.spacing;
}
function getDefaultHunkSeparatorHeight(type) {
  switch (type) {
    case "simple":
      return 4;
    case "metadata":
    case "line-info":
    case "line-info-basic":
    case "custom":
      return 32;
  }
}
function getHunkAdditionLineRange(hunk) {
  return [getHunkSideStartBoundary(hunk.additionStart, hunk.additionCount) + 1, getHunkSideEndBoundary(hunk.additionStart, hunk.additionCount) + 1];
}
function getExpandedRegion({ isPartial, rangeSize, expandedHunks, hunkIndex, collapsedContextThreshold }) {
  const normalizedRangeSize = Math.max(rangeSize, 0);
  if (normalizedRangeSize === 0 || isPartial) return {
    fromStart: 0,
    fromEnd: 0,
    rangeSize: normalizedRangeSize,
    collapsedLines: normalizedRangeSize,
    renderAll: false
  };
  if (expandedHunks === true || normalizedRangeSize <= collapsedContextThreshold) return {
    fromStart: normalizedRangeSize,
    fromEnd: 0,
    rangeSize: normalizedRangeSize,
    collapsedLines: 0,
    renderAll: true
  };
  const region = expandedHunks?.get(hunkIndex);
  const fromStart = Math.min(Math.max(region?.fromStart ?? 0, 0), normalizedRangeSize);
  const fromEnd = Math.min(Math.max(region?.fromEnd ?? 0, 0), normalizedRangeSize);
  const expandedCount = fromStart + fromEnd;
  const renderAll = expandedCount >= normalizedRangeSize;
  return {
    fromStart: renderAll ? normalizedRangeSize : fromStart,
    fromEnd: renderAll ? 0 : fromEnd,
    rangeSize: normalizedRangeSize,
    collapsedLines: Math.max(normalizedRangeSize - expandedCount, 0),
    renderAll
  };
}
function hasTrailingContextMismatch(fileDiff) {
  const lastHunk = fileDiff.hunks[fileDiff.hunks.length - 1];
  if (lastHunk == null || fileDiff.isPartial || fileDiff.additionLines.length === 0 || fileDiff.deletionLines.length === 0) return false;
  const additionRemaining = fileDiff.additionLines.length - getHunkSideEndBoundary(lastHunk.additionStart, lastHunk.additionCount);
  const deletionRemaining = fileDiff.deletionLines.length - getHunkSideEndBoundary(lastHunk.deletionStart, lastHunk.deletionCount);
  if (additionRemaining <= 0 && deletionRemaining <= 0) return false;
  return additionRemaining !== deletionRemaining;
}
function getTrailingContextRangeSize({ fileDiff, errorPrefix }) {
  const lastHunk = fileDiff.hunks[fileDiff.hunks.length - 1];
  if (lastHunk == null || fileDiff.isPartial || fileDiff.additionLines.length === 0 || fileDiff.deletionLines.length === 0) return 0;
  const additionRemaining = fileDiff.additionLines.length - getHunkSideEndBoundary(lastHunk.additionStart, lastHunk.additionCount);
  const deletionRemaining = fileDiff.deletionLines.length - getHunkSideEndBoundary(lastHunk.deletionStart, lastHunk.deletionCount);
  if (additionRemaining <= 0 && deletionRemaining <= 0) return 0;
  if (additionRemaining !== deletionRemaining) throw new Error(`${errorPrefix}: trailing context mismatch (additions=${additionRemaining}, deletions=${deletionRemaining}) for ${fileDiff.name}`);
  return Math.min(additionRemaining, deletionRemaining);
}
function getTrailingExpandedRegion({ fileDiff, hunkIndex, expandedHunks, collapsedContextThreshold, errorPrefix }) {
  if (hunkIndex !== fileDiff.hunks.length - 1) return;
  const trailingRangeSize = getTrailingContextRangeSize({
    fileDiff,
    errorPrefix
  });
  if (trailingRangeSize <= 0) return;
  if (expandedHunks === true || trailingRangeSize <= collapsedContextThreshold) return {
    fromStart: trailingRangeSize,
    fromEnd: 0,
    rangeSize: trailingRangeSize,
    collapsedLines: 0,
    renderAll: true
  };
  const region = expandedHunks?.get(fileDiff.hunks.length);
  const fromStart = Math.min(Math.max(region?.fromStart ?? 0, 0), trailingRangeSize);
  return {
    fromStart,
    fromEnd: 0,
    rangeSize: trailingRangeSize,
    collapsedLines: trailingRangeSize - fromStart,
    renderAll: fromStart >= trailingRangeSize
  };
}
function isAdditionLineRenderable({ fileDiff, lineNumber, expandedHunks, collapsedContextThreshold }) {
  if (expandedHunks === true || fileDiff.isPartial) return true;
  for (const [hunkIndex, hunk] of fileDiff.hunks.entries()) {
    const [hunkStart, hunkEnd] = getHunkAdditionLineRange(hunk);
    if (lineNumber < hunkStart) {
      const region = getExpandedRegion({
        isPartial: fileDiff.isPartial,
        rangeSize: hunk.collapsedBefore,
        expandedHunks,
        hunkIndex,
        collapsedContextThreshold
      });
      const gapStart = hunkStart - region.rangeSize;
      return region.renderAll || lineNumber < gapStart + region.fromStart || lineNumber >= hunkStart - region.fromEnd;
    }
    if (lineNumber < hunkEnd) return true;
  }
  const trailingRegion = getTrailingExpandedRegion({
    fileDiff,
    hunkIndex: fileDiff.hunks.length - 1,
    expandedHunks,
    collapsedContextThreshold,
    errorPrefix: "isAdditionLineRenderable"
  });
  if (trailingRegion == null || trailingRegion.renderAll) return true;
  const lastHunk = fileDiff.hunks[fileDiff.hunks.length - 1];
  const [, trailingStart] = getHunkAdditionLineRange(lastHunk);
  return lineNumber < trailingStart + trailingRegion.fromStart || lineNumber >= trailingStart + trailingRegion.rangeSize;
}
function getNearestRenderableAdditionLine({ fileDiff, lineNumber, direction, expandedHunks, collapsedContextThreshold }) {
  if (expandedHunks === true || fileDiff.isPartial) return lineNumber;
  const ranges = [];
  let modeledEnd = 1;
  for (const [hunkIndex, hunk] of fileDiff.hunks.entries()) {
    const [hunkStart, hunkEnd] = getHunkAdditionLineRange(hunk);
    const region = getExpandedRegion({
      isPartial: fileDiff.isPartial,
      rangeSize: hunk.collapsedBefore,
      expandedHunks,
      hunkIndex,
      collapsedContextThreshold
    });
    const gapStart = hunkStart - region.rangeSize;
    if (region.renderAll) ranges.push([gapStart, hunkStart]);
    else {
      if (region.fromStart > 0) ranges.push([gapStart, gapStart + region.fromStart]);
      if (region.fromEnd > 0) ranges.push([hunkStart - region.fromEnd, hunkStart]);
    }
    ranges.push([hunkStart, hunkEnd]);
    modeledEnd = hunkEnd;
  }
  const trailingRegion = getTrailingExpandedRegion({
    fileDiff,
    hunkIndex: fileDiff.hunks.length - 1,
    expandedHunks,
    collapsedContextThreshold,
    errorPrefix: "getNearestRenderableAdditionLine"
  });
  if (trailingRegion != null) {
    const trailingStart = modeledEnd;
    modeledEnd = trailingStart + trailingRegion.rangeSize;
    if (trailingRegion.renderAll) ranges.push([trailingStart, modeledEnd]);
    else if (trailingRegion.fromStart > 0) ranges.push([trailingStart, trailingStart + trailingRegion.fromStart]);
  }
  if (lineNumber >= modeledEnd) return lineNumber;
  if (direction === "down") {
    for (const [start, end] of ranges) if (end > lineNumber) return Math.max(start, lineNumber);
    return;
  }
  for (let index = ranges.length - 1; index >= 0; index--) {
    const [start, end] = ranges[index];
    if (start <= lineNumber) return Math.min(end - 1, lineNumber);
  }
}
function getHunkSeparatorHeight({ type, metrics }) {
  return metrics.hunkSeparatorHeight ?? getDefaultHunkSeparatorHeight(type);
}
function getHunkSeparatorGap({ type, metrics }) {
  return type === "simple" || type === "metadata" || type === "line-info-basic" ? 0 : metrics.spacing;
}
function hasLeadingHunkSeparator({ type, hunkIndex, hunkSpecs }) {
  switch (type) {
    case "simple":
      return hunkIndex > 0;
    case "metadata":
      return hunkSpecs != null;
    case "line-info":
    case "line-info-basic":
    case "custom":
      return true;
  }
}
function hasTrailingHunkSeparator(type) {
  return type !== "simple" && type !== "metadata";
}
function getLeadingHunkSeparatorLayout({ type, metrics, hunkIndex, hunkSpecs }) {
  if (!hasLeadingHunkSeparator({
    type,
    hunkIndex,
    hunkSpecs
  })) return;
  const height = getHunkSeparatorHeight({
    type,
    metrics
  });
  const gap = getHunkSeparatorGap({
    type,
    metrics
  });
  const gapBefore = hunkIndex > 0 ? gap : 0;
  const gapAfter = gap;
  return {
    height,
    gapBefore,
    gapAfter,
    totalHeight: gapBefore + height + gapAfter
  };
}
function getTrailingHunkSeparatorLayout({ type, metrics }) {
  if (!hasTrailingHunkSeparator(type)) return;
  const height = getHunkSeparatorHeight({
    type,
    metrics
  });
  const gapBefore = getHunkSeparatorGap({
    type,
    metrics
  });
  return {
    height,
    gapBefore,
    gapAfter: 0,
    totalHeight: gapBefore + height
  };
}
function iterateOverDiff({ diff, diffStyle, startingLine = 0, totalLines = Infinity, expandedHunks, collapsedContextThreshold = 1, callback }) {
  const iterationStart = getIterationStartState({
    diff,
    diffStyle,
    startingLine,
    expandedHunks,
    collapsedContextThreshold
  });
  const state = {
    viewportStart: startingLine,
    viewportEnd: startingLine + totalLines,
    isWindowedHighlight: startingLine > 0 || totalLines < Infinity,
    splitCount: iterationStart.splitCount,
    unifiedCount: iterationStart.unifiedCount,
    finalHunkIndex: diff.hunks.length - 1,
    shouldBreak() {
      if (!state.isWindowedHighlight) return false;
      const breakUnified = state.unifiedCount >= startingLine + totalLines;
      const breakSplit = state.splitCount >= startingLine + totalLines;
      if (diffStyle === "unified") return breakUnified;
      else if (diffStyle === "split") return breakSplit;
      else return breakUnified && breakSplit;
    },
    shouldSkip(unifiedCount, splitCount) {
      if (!state.isWindowedHighlight) return false;
      const skipUnified = unifiedCount > 0 && state.unifiedCount + unifiedCount <= startingLine;
      const skipSplit = splitCount > 0 && state.splitCount + splitCount <= startingLine;
      if (diffStyle === "unified") return skipUnified;
      else if (diffStyle === "split") return skipSplit;
      else return skipUnified && skipSplit;
    },
    incrementCounts(unifiedValue, splitValue) {
      if (diffStyle === "unified" || diffStyle === "both") state.unifiedCount += unifiedValue;
      if (diffStyle === "split" || diffStyle === "both") state.splitCount += splitValue;
    },
    isInWindow(unifiedHeight, splitHeight) {
      if (!state.isWindowedHighlight) return true;
      const unifiedInWindow = state.isInUnifiedWindow(unifiedHeight);
      const splitInWindow = state.isInSplitWindow(splitHeight);
      if (diffStyle === "unified") return unifiedInWindow;
      else if (diffStyle === "split") return splitInWindow;
      else return unifiedInWindow || splitInWindow;
    },
    isInUnifiedWindow(unifiedHeight) {
      return !state.isWindowedHighlight || state.unifiedCount >= startingLine - unifiedHeight && state.unifiedCount < startingLine + totalLines;
    },
    isInSplitWindow(splitHeight) {
      return !state.isWindowedHighlight || state.splitCount >= startingLine - splitHeight && state.splitCount < startingLine + totalLines;
    },
    emit(props, silent = false) {
      if (!silent) if (diffStyle === "unified") state.incrementCounts(1, 0);
      else if (diffStyle === "split") state.incrementCounts(0, 1);
      else state.incrementCounts(1, 1);
      return callback(props) ?? false;
    }
  };
  hunkIterator: for (let hunkIndex = iterationStart.hunkIndex; hunkIndex < diff.hunks.length; hunkIndex++) {
    let getTrailingCollapsedAfter = function(unifiedLineIndex2, splitLineIndex2) {
      if (trailingRegion == null || trailingRegion.collapsedLines <= 0 || trailingRegion.fromStart + trailingRegion.fromEnd > 0) return 0;
      if (diffStyle === "unified") return unifiedLineIndex2 === hunk.unifiedLineStart + hunk.unifiedLineCount - 1 ? trailingRegion.collapsedLines : 0;
      return splitLineIndex2 === hunk.splitLineStart + hunk.splitLineCount - 1 ? trailingRegion.collapsedLines : 0;
    }, consumePendingCollapsed = function() {
      if (consumedCollapsed) return 0;
      consumedCollapsed = true;
      return leadingRegion.collapsedLines;
    };
    const hunk = diff.hunks[hunkIndex];
    if (hunk == null) throw new Error("iterateOverDiff: invalid hunk index");
    if (state.shouldBreak()) break;
    const deletionBoundary = getHunkSideStartBoundary(hunk.deletionStart, hunk.deletionCount);
    const additionBoundary = getHunkSideStartBoundary(hunk.additionStart, hunk.additionCount);
    const deletionStartIndex = !diff.isPartial && hunk.deletionCount === 0 ? deletionBoundary : hunk.deletionLineIndex;
    const additionStartIndex = !diff.isPartial && hunk.additionCount === 0 ? additionBoundary : hunk.additionLineIndex;
    const leadingRegion = getExpandedRegion({
      isPartial: diff.isPartial,
      rangeSize: hunk.collapsedBefore,
      expandedHunks,
      hunkIndex,
      collapsedContextThreshold
    });
    const trailingRegion = hunkIndex === state.finalHunkIndex ? getTrailingExpandedRegion({
      fileDiff: diff,
      hunkIndex,
      expandedHunks,
      collapsedContextThreshold,
      errorPrefix: "iterateOverDiff"
    }) : void 0;
    const expandedLineCount = leadingRegion.fromStart + leadingRegion.fromEnd;
    let consumedCollapsed = leadingRegion.collapsedLines === 0;
    if (!state.shouldSkip(expandedLineCount, expandedLineCount)) {
      let unifiedLineIndex2 = hunk.unifiedLineStart - leadingRegion.rangeSize;
      let splitLineIndex2 = hunk.splitLineStart - leadingRegion.rangeSize;
      let deletionLineIndex2 = deletionStartIndex - leadingRegion.rangeSize;
      let additionLineIndex2 = additionStartIndex - leadingRegion.rangeSize;
      let deletionLineNumber2 = deletionBoundary + 1 - leadingRegion.rangeSize;
      let additionLineNumber2 = additionBoundary + 1 - leadingRegion.rangeSize;
      if (walkContextLines(state, leadingRegion.fromStart, diffStyle, (index) => {
        return state.emit({
          hunkIndex,
          hunk,
          collapsedBefore: 0,
          collapsedAfter: 0,
          type: "context-expanded",
          deletionLine: {
            lineNumber: deletionLineNumber2 + index,
            lineIndex: deletionLineIndex2 + index,
            noEOFCR: false,
            unifiedLineIndex: unifiedLineIndex2 + index,
            splitLineIndex: splitLineIndex2 + index
          },
          additionLine: {
            unifiedLineIndex: unifiedLineIndex2 + index,
            splitLineIndex: splitLineIndex2 + index,
            lineIndex: additionLineIndex2 + index,
            lineNumber: additionLineNumber2 + index,
            noEOFCR: false
          }
        });
      })) break hunkIterator;
      unifiedLineIndex2 = hunk.unifiedLineStart - leadingRegion.fromEnd;
      splitLineIndex2 = hunk.splitLineStart - leadingRegion.fromEnd;
      deletionLineIndex2 = deletionStartIndex - leadingRegion.fromEnd;
      additionLineIndex2 = additionStartIndex - leadingRegion.fromEnd;
      deletionLineNumber2 = deletionBoundary + 1 - leadingRegion.fromEnd;
      additionLineNumber2 = additionBoundary + 1 - leadingRegion.fromEnd;
      if (walkContextLines(state, leadingRegion.fromEnd, diffStyle, (index) => {
        return state.emit({
          hunkIndex,
          hunk,
          collapsedBefore: consumePendingCollapsed(),
          collapsedAfter: 0,
          type: "context-expanded",
          deletionLine: {
            lineNumber: deletionLineNumber2 + index,
            lineIndex: deletionLineIndex2 + index,
            noEOFCR: false,
            unifiedLineIndex: unifiedLineIndex2 + index,
            splitLineIndex: splitLineIndex2 + index
          },
          additionLine: {
            unifiedLineIndex: unifiedLineIndex2 + index,
            splitLineIndex: splitLineIndex2 + index,
            lineIndex: additionLineIndex2 + index,
            lineNumber: additionLineNumber2 + index,
            noEOFCR: false
          }
        });
      }, () => {
        consumePendingCollapsed();
      })) break hunkIterator;
    } else {
      state.incrementCounts(expandedLineCount, expandedLineCount);
      consumePendingCollapsed();
    }
    let unifiedLineIndex = hunk.unifiedLineStart;
    let splitLineIndex = hunk.splitLineStart;
    let deletionLineIndex = deletionStartIndex;
    let additionLineIndex = additionStartIndex;
    let deletionLineNumber = deletionBoundary + 1;
    let additionLineNumber = additionBoundary + 1;
    const lastContent = hunk.hunkContent.at(-1);
    for (const content of hunk.hunkContent) {
      if (state.shouldBreak()) break hunkIterator;
      const isLastContent = content === lastContent;
      if (content.type === "context") {
        if (!state.shouldSkip(content.lines, content.lines)) {
          if (walkContextLines(state, content.lines, diffStyle, (index) => {
            const isLastLine = isLastContent && index === content.lines - 1;
            const unifiedRowIndex = unifiedLineIndex + index;
            const splitRowIndex = splitLineIndex + index;
            return state.emit({
              hunkIndex,
              hunk,
              collapsedBefore: consumePendingCollapsed(),
              collapsedAfter: getTrailingCollapsedAfter(unifiedRowIndex, splitRowIndex),
              type: "context",
              deletionLine: {
                lineNumber: deletionLineNumber + index,
                lineIndex: deletionLineIndex + index,
                noEOFCR: isLastLine && hunk.noEOFCRDeletions,
                unifiedLineIndex: unifiedRowIndex,
                splitLineIndex: splitRowIndex
              },
              additionLine: {
                unifiedLineIndex: unifiedRowIndex,
                splitLineIndex: splitRowIndex,
                lineIndex: additionLineIndex + index,
                lineNumber: additionLineNumber + index,
                noEOFCR: isLastLine && hunk.noEOFCRAdditions
              }
            });
          }, () => {
            consumePendingCollapsed();
          })) break hunkIterator;
        } else {
          state.incrementCounts(content.lines, content.lines);
          consumePendingCollapsed();
        }
        unifiedLineIndex += content.lines;
        splitLineIndex += content.lines;
        deletionLineIndex += content.lines;
        additionLineIndex += content.lines;
        deletionLineNumber += content.lines;
        additionLineNumber += content.lines;
      } else {
        const splitCount = Math.max(content.deletions, content.additions);
        const unifiedCount = content.deletions + content.additions;
        if (!state.shouldSkip(unifiedCount, splitCount)) {
          const iterationRanges = getChangeIterationRanges(state, content, diffStyle);
          if ((iterationRanges[0]?.[0] ?? 0) > 0) consumePendingCollapsed();
          for (const [rangeStart, rangeEnd] of iterationRanges) for (let index = rangeStart; index < rangeEnd; index++) {
            const collapsedAfter = getTrailingCollapsedAfter(unifiedLineIndex + index, diffStyle === "unified" ? splitLineIndex + (index < content.deletions ? index : index - content.deletions) : splitLineIndex + index);
            if (state.emit(getChangeLineData({
              hunkIndex,
              hunk,
              collapsedBefore: consumePendingCollapsed(),
              collapsedAfter,
              diffStyle,
              index,
              unifiedLineIndex,
              splitLineIndex,
              additionLineIndex,
              deletionLineIndex,
              additionLineNumber,
              deletionLineNumber,
              content,
              isLastContent,
              unifiedCount,
              splitCount
            }), true)) break hunkIterator;
          }
        }
        consumePendingCollapsed();
        state.incrementCounts(unifiedCount, splitCount);
        unifiedLineIndex += unifiedCount;
        splitLineIndex += splitCount;
        deletionLineIndex += content.deletions;
        additionLineIndex += content.additions;
        deletionLineNumber += content.deletions;
        additionLineNumber += content.additions;
      }
    }
    if (trailingRegion != null) {
      const { collapsedLines, fromStart, fromEnd } = trailingRegion;
      const len = fromStart + fromEnd;
      if (walkContextLines(state, len, diffStyle, (index) => {
        const isLastLine = index === len - 1;
        return state.emit({
          hunkIndex: diff.hunks.length,
          hunk: void 0,
          collapsedBefore: 0,
          collapsedAfter: isLastLine ? collapsedLines : 0,
          type: "context-expanded",
          deletionLine: {
            lineNumber: deletionLineNumber + index,
            lineIndex: deletionLineIndex + index,
            noEOFCR: false,
            unifiedLineIndex: unifiedLineIndex + index,
            splitLineIndex: splitLineIndex + index
          },
          additionLine: {
            unifiedLineIndex: unifiedLineIndex + index,
            splitLineIndex: splitLineIndex + index,
            lineIndex: additionLineIndex + index,
            lineNumber: additionLineNumber + index,
            noEOFCR: false
          }
        });
      }, void 0, () => state.shouldBreak())) break hunkIterator;
    }
  }
}
function getIterationStartState({ diff, diffStyle, startingLine, expandedHunks, collapsedContextThreshold }) {
  if (startingLine <= 0 || diffStyle === "both") return {
    hunkIndex: 0,
    splitCount: 0,
    unifiedCount: 0
  };
  const prefixCounts = getHunkPrefixCounts({
    diff,
    expandedHunks,
    collapsedContextThreshold
  });
  let low = 0;
  let high = diff.hunks.length - 1;
  let result = diff.hunks.length;
  while (low <= high) {
    const mid = low + high >> 1;
    const counts2 = prefixCounts[mid + 1];
    if (counts2 == null) throw new Error("iterateOverDiff: invalid hunk prefix index");
    if ((diffStyle === "unified" ? counts2.unifiedCount : counts2.splitCount) > startingLine) {
      result = mid;
      high = mid - 1;
    } else low = mid + 1;
  }
  if (result >= diff.hunks.length) {
    const counts2 = prefixCounts[diff.hunks.length];
    if (counts2 == null) throw new Error("iterateOverDiff: invalid terminal hunk prefix index");
    return {
      hunkIndex: diff.hunks.length,
      splitCount: counts2.splitCount,
      unifiedCount: counts2.unifiedCount
    };
  }
  const counts = prefixCounts[result];
  if (counts == null) throw new Error("iterateOverDiff: invalid selected hunk prefix index");
  return {
    hunkIndex: result,
    splitCount: counts.splitCount,
    unifiedCount: counts.unifiedCount
  };
}
function getHunkPrefixCounts({ diff, expandedHunks, collapsedContextThreshold }) {
  let splitCount = 0;
  let unifiedCount = 0;
  const finalHunkIndex = diff.hunks.length - 1;
  const prefixCounts = [{
    splitCount: 0,
    unifiedCount: 0
  }];
  for (let index = 0; index < diff.hunks.length; index++) {
    const hunk = diff.hunks[index];
    if (hunk == null) throw new Error("iterateOverDiff: invalid hunk summary index");
    const leadingRegion = getExpandedRegion({
      isPartial: diff.isPartial,
      rangeSize: hunk.collapsedBefore,
      expandedHunks,
      hunkIndex: index,
      collapsedContextThreshold
    });
    const leadingCount = leadingRegion.fromStart + leadingRegion.fromEnd;
    splitCount += leadingCount + hunk.splitLineCount;
    unifiedCount += leadingCount + hunk.unifiedLineCount;
    const trailingRegion = index === finalHunkIndex ? getTrailingExpandedRegion({
      fileDiff: diff,
      hunkIndex: index,
      expandedHunks,
      collapsedContextThreshold,
      errorPrefix: "iterateOverDiff"
    }) : void 0;
    if (trailingRegion != null) {
      const trailingCount = trailingRegion.fromStart + trailingRegion.fromEnd;
      splitCount += trailingCount;
      unifiedCount += trailingCount;
    }
    prefixCounts.push({
      splitCount,
      unifiedCount
    });
  }
  return prefixCounts;
}
function getContextLineIterationBounds(state, count, diffStyle) {
  if (!state.isWindowedHighlight || count <= 0) return [0, count];
  const ranges = [];
  function pushRange(currentCount) {
    const start2 = Math.max(0, state.viewportStart - currentCount);
    const end2 = Math.min(count, state.viewportEnd - currentCount);
    if (end2 > start2) ranges.push([start2, end2]);
  }
  if (diffStyle !== "split") pushRange(state.unifiedCount);
  if (diffStyle !== "unified") pushRange(state.splitCount);
  if (ranges.length === 0) return [0, 0];
  let start = ranges[0][0];
  let end = ranges[0][1];
  for (let index = 1; index < ranges.length; index++) {
    const range2 = ranges[index];
    start = Math.min(start, range2[0]);
    end = Math.max(end, range2[1]);
  }
  return [start, end];
}
function walkContextLines(state, count, diffStyle, callback, onSkippedStart, shouldBreak) {
  const [startIndex, endIndex] = getContextLineIterationBounds(state, count, diffStyle);
  if (startIndex > 0) {
    state.incrementCounts(startIndex, startIndex);
    onSkippedStart?.();
  }
  let index = startIndex;
  while (index < count) {
    if (shouldBreak?.() === true) return true;
    if (index >= endIndex) {
      state.incrementCounts(count - index, count - index);
      break;
    }
    if (state.isInWindow(0, 0)) {
      if (callback(index) === true) return true;
    } else state.incrementCounts(1, 1);
    index++;
  }
  return false;
}
function getChangeIterationRanges(state, content, diffStyle) {
  if (!state.isWindowedHighlight) return [[0, diffStyle === "unified" ? content.deletions + content.additions : Math.max(content.deletions, content.additions)]];
  const useUnified = diffStyle !== "split";
  const useSplit = diffStyle !== "unified";
  const iterationSpace = diffStyle === "unified" ? "unified" : "split";
  const iterationRanges = [];
  function getVisibleRange(start, count) {
    if (start + count <= state.viewportStart || start >= state.viewportEnd) return;
    const visibleStart = Math.max(0, state.viewportStart - start);
    const visibleEnd = Math.min(count, state.viewportEnd - start);
    return visibleEnd > visibleStart ? [visibleStart, visibleEnd] : void 0;
  }
  function mapRangeToIteration(range2, kind) {
    if (iterationSpace === "split") return range2;
    return kind === "additions" ? [range2[0] + content.deletions, range2[1] + content.deletions] : range2;
  }
  function pushRange(range2, kind) {
    if (range2 == null) return;
    const [start, end] = mapRangeToIteration(range2, kind);
    if (end > start) iterationRanges.push([start, end]);
  }
  if (useUnified) {
    pushRange(getVisibleRange(state.unifiedCount, content.deletions), "deletions");
    pushRange(getVisibleRange(state.unifiedCount + content.deletions, content.additions), "additions");
  }
  if (useSplit) {
    pushRange(getVisibleRange(state.splitCount, content.deletions), "deletions");
    pushRange(getVisibleRange(state.splitCount, content.additions), "additions");
  }
  if (iterationRanges.length === 0) return iterationRanges;
  iterationRanges.sort((a, b2) => a[0] - b2[0]);
  const merged = [iterationRanges[0]];
  for (const [start, end] of iterationRanges.slice(1)) {
    const last = merged[merged.length - 1];
    if (start <= last[1]) last[1] = Math.max(last[1], end);
    else merged.push([start, end]);
  }
  return merged;
}
function getChangeLineData({ hunkIndex, hunk, collapsedAfter, collapsedBefore, diffStyle, index, unifiedLineIndex, splitLineIndex, additionLineIndex, deletionLineIndex, additionLineNumber, deletionLineNumber, content, isLastContent, unifiedCount, splitCount }) {
  const unifiedDeletionLineIndex = index < content.deletions ? unifiedLineIndex + index : void 0;
  const unifiedAdditionLineIndex = diffStyle === "unified" ? index >= content.deletions ? unifiedLineIndex + index : void 0 : index < content.additions ? unifiedLineIndex + content.deletions + index : void 0;
  const resolvedSplitLineIndex = diffStyle === "unified" ? splitLineIndex + (index < content.deletions ? index : index - content.deletions) : splitLineIndex + index;
  const deletionLineIndexValue = index < content.deletions ? deletionLineIndex + index : void 0;
  const deletionLineNumberValue = index < content.deletions ? deletionLineNumber + index : void 0;
  const additionLineIndexValue = diffStyle === "unified" ? index >= content.deletions ? additionLineIndex + (index - content.deletions) : void 0 : index < content.additions ? additionLineIndex + index : void 0;
  const additionLineNumberValue = diffStyle === "unified" ? index >= content.deletions ? additionLineNumber + (index - content.deletions) : void 0 : index < content.additions ? additionLineNumber + index : void 0;
  const noEOFCRDeletion = diffStyle === "unified" ? isLastContent && index === content.deletions - 1 && hunk.noEOFCRDeletions : isLastContent && index === splitCount - 1 && hunk.noEOFCRDeletions;
  const noEOFCRAddition = diffStyle === "unified" ? isLastContent && index === unifiedCount - 1 && hunk.noEOFCRAdditions : isLastContent && index === splitCount - 1 && hunk.noEOFCRAdditions;
  const deletionLine = deletionLineIndexValue != null && deletionLineNumberValue != null && unifiedDeletionLineIndex != null ? {
    lineNumber: deletionLineNumberValue,
    lineIndex: deletionLineIndexValue,
    noEOFCR: noEOFCRDeletion,
    unifiedLineIndex: unifiedDeletionLineIndex,
    splitLineIndex: resolvedSplitLineIndex
  } : void 0;
  const additionLine = additionLineIndexValue != null && additionLineNumberValue != null && unifiedAdditionLineIndex != null ? {
    unifiedLineIndex: unifiedAdditionLineIndex,
    splitLineIndex: resolvedSplitLineIndex,
    lineIndex: additionLineIndexValue,
    lineNumber: additionLineNumberValue,
    noEOFCR: noEOFCRAddition
  } : void 0;
  if (deletionLine == null && additionLine != null) return {
    type: "change",
    hunkIndex,
    hunk,
    collapsedAfter,
    collapsedBefore,
    deletionLine: void 0,
    additionLine
  };
  else if (deletionLine != null && additionLine == null) return {
    type: "change",
    hunkIndex,
    hunk,
    collapsedAfter,
    collapsedBefore,
    deletionLine,
    additionLine: void 0
  };
  if (deletionLine == null || additionLine == null) throw new Error("iterateOverDiff: missing change line data");
  return {
    type: "change",
    hunkIndex,
    hunk,
    collapsedAfter,
    collapsedBefore,
    deletionLine,
    additionLine
  };
}
class Diff {
  diff(oldStr, newStr, options = {}) {
    let callback;
    if (typeof options === "function") {
      callback = options;
      options = {};
    } else if ("callback" in options) {
      callback = options.callback;
    }
    const oldString = this.castInput(oldStr, options);
    const newString = this.castInput(newStr, options);
    const oldTokens = this.removeEmpty(this.tokenize(oldString, options));
    const newTokens = this.removeEmpty(this.tokenize(newString, options));
    return this.diffWithOptionsObj(oldTokens, newTokens, options, callback);
  }
  diffWithOptionsObj(oldTokens, newTokens, options, callback) {
    var _a;
    const done = (value) => {
      value = this.postProcess(value, options);
      if (callback) {
        setTimeout(function() {
          callback(value);
        }, 0);
        return void 0;
      } else {
        return value;
      }
    };
    const newLen = newTokens.length, oldLen = oldTokens.length;
    let editLength = 1;
    let maxEditLength = newLen + oldLen;
    if (options.maxEditLength != null) {
      maxEditLength = Math.min(maxEditLength, options.maxEditLength);
    }
    const maxExecutionTime = (_a = options.timeout) !== null && _a !== void 0 ? _a : Infinity;
    const abortAfterTimestamp = Date.now() + maxExecutionTime;
    const bestPath = [{ oldPos: -1, lastComponent: void 0 }];
    let newPos = this.extractCommon(bestPath[0], newTokens, oldTokens, 0, options);
    if (bestPath[0].oldPos + 1 >= oldLen && newPos + 1 >= newLen) {
      return done(this.buildValues(bestPath[0].lastComponent, newTokens, oldTokens));
    }
    let minDiagonalToConsider = -Infinity, maxDiagonalToConsider = Infinity;
    const execEditLength = () => {
      for (let diagonalPath = Math.max(minDiagonalToConsider, -editLength); diagonalPath <= Math.min(maxDiagonalToConsider, editLength); diagonalPath += 2) {
        let basePath;
        const removePath = bestPath[diagonalPath - 1], addPath = bestPath[diagonalPath + 1];
        if (removePath) {
          bestPath[diagonalPath - 1] = void 0;
        }
        let canAdd = false;
        if (addPath) {
          const addPathNewPos = addPath.oldPos - diagonalPath;
          canAdd = addPath && 0 <= addPathNewPos && addPathNewPos < newLen;
        }
        const canRemove = removePath && removePath.oldPos + 1 < oldLen;
        if (!canAdd && !canRemove) {
          bestPath[diagonalPath] = void 0;
          continue;
        }
        if (!canRemove || canAdd && removePath.oldPos < addPath.oldPos) {
          basePath = this.addToPath(addPath, true, false, 0, options);
        } else {
          basePath = this.addToPath(removePath, false, true, 1, options);
        }
        newPos = this.extractCommon(basePath, newTokens, oldTokens, diagonalPath, options);
        if (basePath.oldPos + 1 >= oldLen && newPos + 1 >= newLen) {
          return done(this.buildValues(basePath.lastComponent, newTokens, oldTokens)) || true;
        } else {
          bestPath[diagonalPath] = basePath;
          if (basePath.oldPos + 1 >= oldLen) {
            maxDiagonalToConsider = Math.min(maxDiagonalToConsider, diagonalPath - 1);
          }
          if (newPos + 1 >= newLen) {
            minDiagonalToConsider = Math.max(minDiagonalToConsider, diagonalPath + 1);
          }
        }
      }
      editLength++;
    };
    if (callback) {
      (function exec() {
        setTimeout(function() {
          if (editLength > maxEditLength || Date.now() > abortAfterTimestamp) {
            return callback(void 0);
          }
          if (!execEditLength()) {
            exec();
          }
        }, 0);
      })();
    } else {
      while (editLength <= maxEditLength && Date.now() <= abortAfterTimestamp) {
        const ret = execEditLength();
        if (ret) {
          return ret;
        }
      }
    }
  }
  addToPath(path, added, removed, oldPosInc, options) {
    const last = path.lastComponent;
    if (last && !options.oneChangePerToken && last.added === added && last.removed === removed) {
      return {
        oldPos: path.oldPos + oldPosInc,
        lastComponent: { count: last.count + 1, added, removed, previousComponent: last.previousComponent }
      };
    } else {
      return {
        oldPos: path.oldPos + oldPosInc,
        lastComponent: { count: 1, added, removed, previousComponent: last }
      };
    }
  }
  extractCommon(basePath, newTokens, oldTokens, diagonalPath, options) {
    const newLen = newTokens.length, oldLen = oldTokens.length;
    let oldPos = basePath.oldPos, newPos = oldPos - diagonalPath, commonCount = 0;
    while (newPos + 1 < newLen && oldPos + 1 < oldLen && this.equals(oldTokens[oldPos + 1], newTokens[newPos + 1], options)) {
      newPos++;
      oldPos++;
      commonCount++;
      if (options.oneChangePerToken) {
        basePath.lastComponent = { count: 1, previousComponent: basePath.lastComponent, added: false, removed: false };
      }
    }
    if (commonCount && !options.oneChangePerToken) {
      basePath.lastComponent = { count: commonCount, previousComponent: basePath.lastComponent, added: false, removed: false };
    }
    basePath.oldPos = oldPos;
    return newPos;
  }
  equals(left, right, options) {
    if (options.comparator) {
      return options.comparator(left, right);
    } else {
      return left === right || !!options.ignoreCase && left.toLowerCase() === right.toLowerCase();
    }
  }
  removeEmpty(array) {
    const ret = [];
    for (let i2 = 0; i2 < array.length; i2++) {
      if (array[i2]) {
        ret.push(array[i2]);
      }
    }
    return ret;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  castInput(value, options) {
    return value;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  tokenize(value, options) {
    return Array.from(value);
  }
  join(chars) {
    return chars.join("");
  }
  postProcess(changeObjects, options) {
    return changeObjects;
  }
  get useLongestToken() {
    return false;
  }
  buildValues(lastComponent, newTokens, oldTokens) {
    const components = [];
    let nextComponent;
    while (lastComponent) {
      components.push(lastComponent);
      nextComponent = lastComponent.previousComponent;
      delete lastComponent.previousComponent;
      lastComponent = nextComponent;
    }
    components.reverse();
    const componentLen = components.length;
    let componentPos = 0, newPos = 0, oldPos = 0;
    for (; componentPos < componentLen; componentPos++) {
      const component = components[componentPos];
      if (!component.removed) {
        if (!component.added && this.useLongestToken) {
          let value = newTokens.slice(newPos, newPos + component.count);
          value = value.map(function(value2, i2) {
            const oldValue = oldTokens[oldPos + i2];
            return oldValue.length > value2.length ? oldValue : value2;
          });
          component.value = this.join(value);
        } else {
          component.value = this.join(newTokens.slice(newPos, newPos + component.count));
        }
        newPos += component.count;
        if (!component.added) {
          oldPos += component.count;
        }
      } else {
        component.value = this.join(oldTokens.slice(oldPos, oldPos + component.count));
        oldPos += component.count;
      }
    }
    return components;
  }
}
class CharacterDiff extends Diff {
}
const characterDiff = new CharacterDiff();
function diffChars(oldStr, newStr, options) {
  return characterDiff.diff(oldStr, newStr, options);
}
const extendedWordChars = "a-zA-Z0-9_\\u{AD}\\u{C0}-\\u{D6}\\u{D8}-\\u{F6}\\u{F8}-\\u{2C6}\\u{2C8}-\\u{2D7}\\u{2DE}-\\u{2FF}\\u{1E00}-\\u{1EFF}";
class WordsWithSpaceDiff extends Diff {
  tokenize(value) {
    const regex = new RegExp(`(\\r?\\n)|[${extendedWordChars}]+|[^\\S\\n\\r]+|[^${extendedWordChars}]`, "ug");
    return value.match(regex) || [];
  }
}
const wordsWithSpaceDiff = new WordsWithSpaceDiff();
function diffWordsWithSpace(oldStr, newStr, options) {
  return wordsWithSpaceDiff.diff(oldStr, newStr, options);
}
class LineDiff extends Diff {
  constructor() {
    super(...arguments);
    this.tokenize = tokenize;
  }
  equals(left, right, options) {
    if (options.ignoreWhitespace) {
      if (!options.newlineIsToken || !left.includes("\n")) {
        left = left.trim();
      }
      if (!options.newlineIsToken || !right.includes("\n")) {
        right = right.trim();
      }
    } else if (options.ignoreNewlineAtEof && !options.newlineIsToken) {
      if (left.endsWith("\n")) {
        left = left.slice(0, -1);
      }
      if (right.endsWith("\n")) {
        right = right.slice(0, -1);
      }
    }
    return super.equals(left, right, options);
  }
}
const lineDiff = new LineDiff();
function diffLines(oldStr, newStr, options) {
  return lineDiff.diff(oldStr, newStr, options);
}
function tokenize(value, options) {
  if (options.stripTrailingCr) {
    value = value.replace(/\r\n/g, "\n");
  }
  const retLines = [], linesAndNewlines = value.split(/(\n|\r\n)/);
  if (!linesAndNewlines[linesAndNewlines.length - 1]) {
    linesAndNewlines.pop();
  }
  for (let i2 = 0; i2 < linesAndNewlines.length; i2++) {
    const line = linesAndNewlines[i2];
    if (i2 % 2 && !options.newlineIsToken) {
      retLines[retLines.length - 1] += line;
    } else {
      retLines.push(line);
    }
  }
  return retLines;
}
function needsQuoting(s2) {
  for (let i2 = 0; i2 < s2.length; i2++) {
    if (s2[i2] < " " || s2[i2] > "~" || s2[i2] === '"' || s2[i2] === "\\") {
      return true;
    }
  }
  return false;
}
function quoteFileNameIfNeeded(s2) {
  if (!needsQuoting(s2)) {
    return s2;
  }
  let result = '"';
  const bytes = new TextEncoder().encode(s2);
  let i2 = 0;
  while (i2 < bytes.length) {
    const b2 = bytes[i2];
    if (b2 === 7) {
      result += "\\a";
    } else if (b2 === 8) {
      result += "\\b";
    } else if (b2 === 9) {
      result += "\\t";
    } else if (b2 === 10) {
      result += "\\n";
    } else if (b2 === 11) {
      result += "\\v";
    } else if (b2 === 12) {
      result += "\\f";
    } else if (b2 === 13) {
      result += "\\r";
    } else if (b2 === 34) {
      result += '\\"';
    } else if (b2 === 92) {
      result += "\\\\";
    } else if (b2 >= 32 && b2 <= 126) {
      result += String.fromCharCode(b2);
    } else {
      result += "\\" + b2.toString(8).padStart(3, "0");
    }
    i2++;
  }
  result += '"';
  return result;
}
const INCLUDE_HEADERS = {
  includeIndex: true,
  includeUnderline: true,
  includeFileHeaders: true
};
function structuredPatch(oldFileName, newFileName, oldStr, newStr, oldHeader, newHeader, options) {
  let optionsObj;
  if (!options) {
    optionsObj = {};
  } else if (typeof options === "function") {
    optionsObj = { callback: options };
  } else {
    optionsObj = options;
  }
  if (typeof optionsObj.context === "undefined") {
    optionsObj.context = 4;
  }
  const context = optionsObj.context;
  if (optionsObj.newlineIsToken) {
    throw new Error("newlineIsToken may not be used with patch-generation functions, only with diffing functions");
  }
  if (!optionsObj.callback) {
    return diffLinesResultToPatch(diffLines(oldStr, newStr, optionsObj));
  } else {
    const { callback } = optionsObj;
    diffLines(oldStr, newStr, Object.assign(Object.assign({}, optionsObj), { callback: (diff) => {
      const patch = diffLinesResultToPatch(diff);
      callback(patch);
    } }));
  }
  function diffLinesResultToPatch(diff) {
    if (!diff) {
      return;
    }
    diff.push({ value: "", lines: [] });
    function contextLines(lines) {
      return lines.map(function(entry) {
        return " " + entry;
      });
    }
    const hunks = [];
    let oldRangeStart = 0, newRangeStart = 0, curRange = [], oldLine = 1, newLine = 1;
    for (let i2 = 0; i2 < diff.length; i2++) {
      const current = diff[i2], lines = current.lines || splitLines(current.value);
      current.lines = lines;
      if (current.added || current.removed) {
        if (!oldRangeStart) {
          const prev = diff[i2 - 1];
          oldRangeStart = oldLine;
          newRangeStart = newLine;
          if (prev) {
            curRange = context > 0 ? contextLines(prev.lines.slice(-context)) : [];
            oldRangeStart -= curRange.length;
            newRangeStart -= curRange.length;
          }
        }
        for (const line of lines) {
          curRange.push((current.added ? "+" : "-") + line);
        }
        if (current.added) {
          newLine += lines.length;
        } else {
          oldLine += lines.length;
        }
      } else {
        if (oldRangeStart) {
          if (lines.length <= context * 2 && i2 < diff.length - 2) {
            for (const line of contextLines(lines)) {
              curRange.push(line);
            }
          } else {
            const contextSize = Math.min(lines.length, context);
            for (const line of contextLines(lines.slice(0, contextSize))) {
              curRange.push(line);
            }
            const hunk = {
              oldStart: oldRangeStart,
              oldLines: oldLine - oldRangeStart + contextSize,
              newStart: newRangeStart,
              newLines: newLine - newRangeStart + contextSize,
              lines: curRange
            };
            hunks.push(hunk);
            oldRangeStart = 0;
            newRangeStart = 0;
            curRange = [];
          }
        }
        oldLine += lines.length;
        newLine += lines.length;
      }
    }
    for (const hunk of hunks) {
      for (let i2 = 0; i2 < hunk.lines.length; i2++) {
        if (hunk.lines[i2].endsWith("\n")) {
          hunk.lines[i2] = hunk.lines[i2].slice(0, -1);
        } else {
          hunk.lines.splice(i2 + 1, 0, "\\ No newline at end of file");
          i2++;
        }
      }
    }
    return {
      oldFileName,
      newFileName,
      oldHeader,
      newHeader,
      hunks
    };
  }
}
function formatPatch(patch, headerOptions) {
  var _a, _b, _c, _d, _e, _f;
  if (!headerOptions) {
    headerOptions = INCLUDE_HEADERS;
  }
  if (Array.isArray(patch)) {
    if (patch.length > 1 && !headerOptions.includeFileHeaders && !patch.every((p2) => p2.isGit)) {
      throw new Error("Cannot omit file headers on a multi-file patch. (The result would be unparseable; how would a tool trying to apply the patch know which changes are to which file?)");
    }
    return patch.map((p2) => formatPatch(p2, headerOptions)).join("\n");
  }
  const ret = [];
  if (patch.isGit) {
    headerOptions = INCLUDE_HEADERS;
    if (!patch.oldFileName) {
      throw new Error("oldFileName must be specified for Git patches");
    }
    if (!patch.newFileName) {
      throw new Error("newFileName must be specified for Git patches");
    }
    let gitOldName = patch.oldFileName;
    let gitNewName = patch.newFileName;
    if (patch.isCreate && gitOldName === "/dev/null") {
      gitOldName = gitNewName.replace(/^b\//, "a/");
    } else if (patch.isDelete && gitNewName === "/dev/null") {
      gitNewName = gitOldName.replace(/^a\//, "b/");
    }
    ret.push("diff --git " + quoteFileNameIfNeeded(gitOldName) + " " + quoteFileNameIfNeeded(gitNewName));
    if (patch.isDelete) {
      ret.push("deleted file mode " + ((_a = patch.oldMode) !== null && _a !== void 0 ? _a : "100644"));
    }
    if (patch.isCreate) {
      ret.push("new file mode " + ((_b = patch.newMode) !== null && _b !== void 0 ? _b : "100644"));
    }
    if (patch.oldMode && patch.newMode && !patch.isDelete && !patch.isCreate) {
      ret.push("old mode " + patch.oldMode);
      ret.push("new mode " + patch.newMode);
    }
    if (patch.isRename) {
      ret.push("rename from " + quoteFileNameIfNeeded(((_c = patch.oldFileName) !== null && _c !== void 0 ? _c : "").replace(/^a\//, "")));
      ret.push("rename to " + quoteFileNameIfNeeded(((_d = patch.newFileName) !== null && _d !== void 0 ? _d : "").replace(/^b\//, "")));
    }
    if (patch.isCopy) {
      ret.push("copy from " + quoteFileNameIfNeeded(((_e = patch.oldFileName) !== null && _e !== void 0 ? _e : "").replace(/^a\//, "")));
      ret.push("copy to " + quoteFileNameIfNeeded(((_f = patch.newFileName) !== null && _f !== void 0 ? _f : "").replace(/^b\//, "")));
    }
  } else {
    if (headerOptions.includeIndex && patch.oldFileName == patch.newFileName && patch.oldFileName !== void 0) {
      ret.push("Index: " + patch.oldFileName);
    }
    if (headerOptions.includeUnderline) {
      ret.push("===================================================================");
    }
  }
  const hasHunks = patch.hunks.length > 0;
  if (headerOptions.includeFileHeaders && patch.oldFileName !== void 0 && patch.newFileName !== void 0 && (!patch.isGit || hasHunks)) {
    ret.push("--- " + quoteFileNameIfNeeded(patch.oldFileName) + (patch.oldHeader ? "	" + patch.oldHeader : ""));
    ret.push("+++ " + quoteFileNameIfNeeded(patch.newFileName) + (patch.newHeader ? "	" + patch.newHeader : ""));
  }
  for (let i2 = 0; i2 < patch.hunks.length; i2++) {
    const hunk = patch.hunks[i2];
    const oldStart = hunk.oldLines === 0 ? hunk.oldStart - 1 : hunk.oldStart;
    const newStart = hunk.newLines === 0 ? hunk.newStart - 1 : hunk.newStart;
    ret.push("@@ -" + oldStart + "," + hunk.oldLines + " +" + newStart + "," + hunk.newLines + " @@");
    for (const line of hunk.lines) {
      ret.push(line);
    }
  }
  return ret.join("\n") + "\n";
}
function createTwoFilesPatch(oldFileName, newFileName, oldStr, newStr, oldHeader, newHeader, options) {
  if (typeof options === "function") {
    options = { callback: options };
  }
  if (!(options === null || options === void 0 ? void 0 : options.callback)) {
    const patchObj = structuredPatch(oldFileName, newFileName, oldStr, newStr, oldHeader, newHeader, options);
    if (!patchObj) {
      return;
    }
    return formatPatch(patchObj, options === null || options === void 0 ? void 0 : options.headerOptions);
  } else {
    const { callback } = options;
    structuredPatch(oldFileName, newFileName, oldStr, newStr, oldHeader, newHeader, Object.assign(Object.assign({}, options), { callback: (patchObj) => {
      if (!patchObj) {
        callback(void 0);
      } else {
        callback(formatPatch(patchObj, options.headerOptions));
      }
    } }));
  }
}
function splitLines(text2) {
  const hasTrailingNl = text2.endsWith("\n");
  const result = text2.split("\n").map((line) => line + "\n");
  if (hasTrailingNl) {
    result.pop();
  } else {
    result.push(result.pop().slice(0, -1));
  }
  return result;
}
function createDiffSpanDecoration({ line, spanStart, spanLength }) {
  return {
    start: {
      line,
      character: spanStart
    },
    end: {
      line,
      character: spanStart + spanLength
    },
    properties: { "data-diff-span": "" },
    alwaysWrap: true
  };
}
function pushOrJoinSpan({ item, arr, enableJoin, isNeutral = false, isLastItem = false }) {
  const lastItem = arr[arr.length - 1];
  if (lastItem == null || isLastItem || !enableJoin) {
    arr.push([isNeutral ? 0 : 1, item.value]);
    return;
  }
  const isLastItemNeutral = lastItem[0] === 0;
  if (isNeutral === isLastItemNeutral || isNeutral && item.value.length === 1 && !isLastItemNeutral) {
    lastItem[1] += item.value;
    return;
  }
  arr.push([isNeutral ? 0 : 1, item.value]);
}
const DEFAULT_PLAIN_TEXT_OPTIONS = { forcePlainText: false };
function renderDiffWithHighlighter(diff, highlighter2, options, { forcePlainText, startingLine, totalLines, expandedHunks, collapsedContextThreshold = 1 } = DEFAULT_PLAIN_TEXT_OPTIONS) {
  if (forcePlainText) {
    startingLine ??= 0;
    totalLines ??= Infinity;
  } else {
    startingLine = 0;
    totalLines = Infinity;
  }
  const isWindowedHighlight = startingLine > 0 || totalLines < Infinity;
  const baseThemeType = typeof options.theme === "string" ? highlighter2.getTheme(options.theme).type : void 0;
  const themeStyles = getHighlighterThemeStyles({
    theme: options.theme,
    highlighter: highlighter2
  });
  const lineDiffType = forcePlainText && !isWindowedHighlight && (diff.unifiedLineCount > 1e3 || diff.splitLineCount > 1e3) ? "none" : options.lineDiffType;
  const code = {
    deletionLines: [],
    additionLines: []
  };
  const { maxLineDiffLength } = options;
  const shouldGroupAll = !forcePlainText && !diff.isPartial;
  const expandedHunksForIteration = forcePlainText ? expandedHunks : void 0;
  const buckets = /* @__PURE__ */ new Map();
  function getBucketForHunk(hunkIndex) {
    const index = shouldGroupAll ? 0 : hunkIndex;
    const bucket = buckets.get(index) ?? createBucket();
    buckets.set(index, bucket);
    return bucket;
  }
  function appendContent(lineContent, lineIndex, segments, contentWrapper) {
    if (isWindowedHighlight) {
      let segment = segments.at(-1);
      if (segment == null || segment.targetIndex + segment.count !== lineIndex) {
        segment = {
          targetIndex: lineIndex,
          originalOffset: contentWrapper.length,
          count: 0
        };
        segments.push(segment);
      }
      segment.count++;
    }
    contentWrapper.push(lineContent);
  }
  iterateOverDiff({
    diff,
    diffStyle: "both",
    startingLine,
    totalLines,
    expandedHunks: isWindowedHighlight ? expandedHunksForIteration : true,
    collapsedContextThreshold,
    callback: ({ hunkIndex, additionLine, deletionLine, type }) => {
      const bucket = getBucketForHunk(hunkIndex);
      const splitLineIndex = additionLine != null ? additionLine.splitLineIndex : deletionLine.splitLineIndex;
      if (type === "change" && additionLine != null && deletionLine != null) computeLineDiffDecorations({
        additionLine: diff.additionLines[additionLine.lineIndex],
        deletionLine: diff.deletionLines[deletionLine.lineIndex],
        deletionLineIndex: bucket.deletionContent.length,
        additionLineIndex: bucket.additionContent.length,
        deletionDecorations: bucket.deletionDecorations,
        additionDecorations: bucket.additionDecorations,
        lineDiffType,
        maxLineDiffLength
      });
      if (deletionLine != null) {
        appendContent(diff.deletionLines[deletionLine.lineIndex], deletionLine.lineIndex, bucket.deletionSegments, bucket.deletionContent);
        bucket.deletionInfo.push({
          type: type === "change" ? "change-deletion" : type,
          lineNumber: deletionLine.lineNumber,
          altLineNumber: type === "change" ? void 0 : additionLine.lineNumber ?? void 0,
          lineIndex: `${deletionLine.unifiedLineIndex},${splitLineIndex}`
        });
      }
      if (additionLine != null) {
        appendContent(diff.additionLines[additionLine.lineIndex], additionLine.lineIndex, bucket.additionSegments, bucket.additionContent);
        bucket.additionInfo.push({
          type: type === "change" ? "change-addition" : type,
          lineNumber: additionLine.lineNumber,
          altLineNumber: type === "change" ? void 0 : deletionLine.lineNumber ?? void 0,
          lineIndex: `${additionLine.unifiedLineIndex},${splitLineIndex}`
        });
      }
    }
  });
  for (const bucket of buckets.values()) {
    if (bucket.deletionContent.length === 0 && bucket.additionContent.length === 0) continue;
    const deletionFile = {
      name: diff.prevName ?? diff.name,
      contents: bucket.deletionContent.value
    };
    const additionFile = {
      name: diff.name,
      contents: bucket.additionContent.value
    };
    const { deletionLines, additionLines } = renderTwoFiles({
      deletionFile,
      deletionInfo: bucket.deletionInfo,
      deletionDecorations: bucket.deletionDecorations,
      additionFile,
      additionInfo: bucket.additionInfo,
      additionDecorations: bucket.additionDecorations,
      highlighter: highlighter2,
      options,
      languageOverride: forcePlainText ? "text" : diff.lang
    });
    if (shouldGroupAll) {
      code.deletionLines = deletionLines;
      code.additionLines = additionLines;
      continue;
    }
    if (bucket.deletionSegments.length > 0) for (const seg of bucket.deletionSegments) for (let i2 = 0; i2 < seg.count; i2++) code.deletionLines[seg.targetIndex + i2] = deletionLines[seg.originalOffset + i2];
    else code.deletionLines.push(...deletionLines);
    if (bucket.additionSegments.length > 0) for (const seg of bucket.additionSegments) for (let i2 = 0; i2 < seg.count; i2++) code.additionLines[seg.targetIndex + i2] = additionLines[seg.originalOffset + i2];
    else code.additionLines.push(...additionLines);
  }
  return {
    code,
    themeStyles,
    baseThemeType
  };
}
function computeLineDiffDecorations({ deletionLine, additionLine, deletionLineIndex, additionLineIndex, deletionDecorations, additionDecorations, lineDiffType, maxLineDiffLength }) {
  if (deletionLine == null || additionLine == null || lineDiffType === "none") return;
  deletionLine = cleanLastNewline(deletionLine);
  additionLine = cleanLastNewline(additionLine);
  if (deletionLine.length > maxLineDiffLength || additionLine.length > maxLineDiffLength) return;
  const lineDiff2 = lineDiffType === "char" ? diffChars(deletionLine, additionLine) : diffWordsWithSpace(deletionLine, additionLine);
  const deletionSpans = [];
  const additionSpans = [];
  const enableJoin = lineDiffType === "word-alt";
  const lastItem = lineDiff2.at(-1);
  for (const item of lineDiff2) {
    const isLastItem = item === lastItem;
    if (!item.added && !item.removed) {
      pushOrJoinSpan({
        item,
        arr: deletionSpans,
        enableJoin,
        isNeutral: true,
        isLastItem
      });
      pushOrJoinSpan({
        item,
        arr: additionSpans,
        enableJoin,
        isNeutral: true,
        isLastItem
      });
    } else if (item.removed) pushOrJoinSpan({
      item,
      arr: deletionSpans,
      enableJoin,
      isLastItem
    });
    else pushOrJoinSpan({
      item,
      arr: additionSpans,
      enableJoin,
      isLastItem
    });
  }
  let spanIndex = 0;
  for (const span of deletionSpans) {
    if (span[0] === 1) deletionDecorations.push(createDiffSpanDecoration({
      line: deletionLineIndex,
      spanStart: spanIndex,
      spanLength: span[1].length
    }));
    spanIndex += span[1].length;
  }
  spanIndex = 0;
  for (const span of additionSpans) {
    if (span[0] === 1) additionDecorations.push(createDiffSpanDecoration({
      line: additionLineIndex,
      spanStart: spanIndex,
      spanLength: span[1].length
    }));
    spanIndex += span[1].length;
  }
}
function createBucket() {
  return {
    deletionContent: {
      push(value) {
        this.value += value;
        this.length++;
      },
      value: "",
      length: 0
    },
    additionContent: {
      push(value) {
        this.value += value;
        this.length++;
      },
      value: "",
      length: 0
    },
    deletionInfo: [],
    additionInfo: [],
    deletionDecorations: [],
    additionDecorations: [],
    deletionSegments: [],
    additionSegments: []
  };
}
function renderTwoFiles({ deletionFile, additionFile, deletionInfo, additionInfo, highlighter: highlighter2, deletionDecorations, additionDecorations, languageOverride, options: { theme: themeOrThemes = DEFAULT_THEMES, ...options } }) {
  const deletionLang = languageOverride ?? getFiletypeFromFileName(deletionFile.name);
  const additionLang = languageOverride ?? getFiletypeFromFileName(additionFile.name);
  const { state, transformers } = createTransformerWithState(options.useTokenTransformer);
  const hastConfig = (() => {
    return typeof themeOrThemes === "string" ? {
      ...options,
      lang: "text",
      theme: themeOrThemes,
      transformers,
      decorations: void 0,
      defaultColor: false,
      cssVariablePrefix: formatCSSVariablePrefix("token"),
      tokenizeTimeLimit: 0
    } : {
      ...options,
      lang: "text",
      themes: themeOrThemes,
      transformers,
      decorations: void 0,
      defaultColor: false,
      cssVariablePrefix: formatCSSVariablePrefix("token"),
      tokenizeTimeLimit: 0
    };
  })();
  return {
    deletionLines: (() => {
      if (deletionFile.contents === "") return [];
      hastConfig.lang = deletionLang;
      state.lineInfo = deletionInfo;
      hastConfig.decorations = deletionDecorations;
      return getLineNodes(highlighter2.codeToHast(cleanLastNewline(deletionFile.contents), hastConfig));
    })(),
    additionLines: (() => {
      if (additionFile.contents === "") return [];
      hastConfig.lang = additionLang;
      hastConfig.decorations = additionDecorations;
      state.lineInfo = additionInfo;
      return getLineNodes(highlighter2.codeToHast(cleanLastNewline(additionFile.contents), hastConfig));
    })()
  };
}
const WorkerPoolContext = reactExports.createContext(void 0);
function areObjectsEqual(objA, objB, omitKeys) {
  if (objA === objB || objA == null || objB == null) return objA === objB;
  const omitSet = new Set(omitKeys);
  const keysA = Object.keys(objA);
  const keysBSet = new Set(Object.keys(objB));
  for (const key2 of keysA) {
    keysBSet.delete(key2);
    if (omitSet.has(key2)) continue;
    if (!(key2 in objB) || objA[key2] !== objB[key2]) return false;
  }
  for (const key2 of Array.from(keysBSet)) if (!omitSet.has(key2)) return false;
  return true;
}
function areOptionsEqual(optionsA, optionsB) {
  const themeA = optionsA?.theme ?? DEFAULT_THEMES;
  const themeB = optionsB?.theme ?? DEFAULT_THEMES;
  const diffOptsA = getParseDiffOptions(optionsA);
  const diffOptsB = getParseDiffOptions(optionsB);
  return areThemesEqual(themeA, themeB) && areObjectsEqual(optionsA, optionsB, ["theme", "parseDiffOptions"]) && areObjectsEqual(diffOptsA, diffOptsB);
}
function getParseDiffOptions(options) {
  if (options != null && "parseDiffOptions" in options) return options.parseDiffOptions;
}
function areSelectionsEqual(selectionA, selectionB) {
  return selectionA?.start === selectionB?.start && selectionA?.end === selectionB?.end && selectionA?.side === selectionB?.side && selectionA?.endSide === selectionB?.endSide;
}
const stringDetachEncoder = new TextEncoder();
const stringDetachDecoder = new TextDecoder("utf-8", { ignoreBOM: true });
const SURROGATE_CODE_UNIT_PATTERN = /[\uD800-\uDFFF]/;
const STRING_DETACH_INITIAL_BUFFER_SIZE = 1024;
let stringDetachBuffer = new Uint8Array(STRING_DETACH_INITIAL_BUFFER_SIZE);
function releaseStringDetachBuffer() {
  if (stringDetachBuffer.length !== STRING_DETACH_INITIAL_BUFFER_SIZE) stringDetachBuffer = new Uint8Array(STRING_DETACH_INITIAL_BUFFER_SIZE);
}
function detachString(value) {
  if (value.length === 0) return value;
  if (SURROGATE_CODE_UNIT_PATTERN.test(value)) return JSON.parse(JSON.stringify(value));
  const requiredByteLength = value.length * 3;
  if (stringDetachBuffer.length < requiredByteLength) stringDetachBuffer = new Uint8Array(requiredByteLength);
  const { written } = stringDetachEncoder.encodeInto(value, stringDetachBuffer);
  return stringDetachDecoder.decode(stringDetachBuffer.subarray(0, written));
}
const MAX_ALIGNMENT_COMPARISONS = 4096;
const MIN_IMPROVEMENT_PER_PAIR = 0.5;
function realignChangeContentBySimilarity(diff) {
  for (const hunk of diff.hunks) {
    for (let index = 0; index < hunk.hunkContent.length; index++) {
      const content = hunk.hunkContent[index];
      if (content.type !== "change") continue;
      const replacement = realignChangeBlock(diff, content);
      if (replacement != null) {
        hunk.hunkContent.splice(index, 1, ...replacement);
        index += replacement.length - 1;
      }
    }
    slideBlankBoundaryBlocksUp(hunk, diff);
  }
}
function slideBlankBoundaryBlocksUp(hunk, diff) {
  const { hunkContent } = hunk;
  for (let index = 1; index < hunkContent.length; index++) {
    const block = hunkContent[index];
    const previous = hunkContent[index - 1];
    if (block.type !== "change" || block.additions > 0 && block.deletions > 0 || previous.type !== "context") continue;
    const isInsert = block.additions > 0;
    const lines = isInsert ? diff.additionLines : diff.deletionLines;
    const blockStart = isInsert ? block.additionLineIndex : block.deletionLineIndex;
    const blockLength = isInsert ? block.additions : block.deletions;
    const unit = lines[blockStart] ?? "";
    if (unit.trim() !== "") continue;
    let uniform = true;
    for (let offset = 1; offset < blockLength; offset++) if (lines[blockStart + offset] !== unit) {
      uniform = false;
      break;
    }
    if (!uniform) continue;
    let slide = 0;
    while (slide < previous.lines && diff.additionLines[previous.additionLineIndex + previous.lines - 1 - slide] === unit) slide++;
    if (slide === 0) continue;
    if (index === 1 && slide === previous.lines) continue;
    block.additionLineIndex -= slide;
    block.deletionLineIndex -= slide;
    const blockAdditionEnd = block.additionLineIndex + block.additions;
    const blockDeletionEnd = block.deletionLineIndex + block.deletions;
    const next = hunkContent[index + 1];
    if (next?.type === "context") {
      next.lines += slide;
      next.additionLineIndex = blockAdditionEnd;
      next.deletionLineIndex = blockDeletionEnd;
    } else hunkContent.splice(index + 1, 0, {
      type: "context",
      lines: slide,
      additionLineIndex: blockAdditionEnd,
      deletionLineIndex: blockDeletionEnd
    });
    previous.lines -= slide;
    if (previous.lines === 0) {
      hunkContent.splice(index - 1, 1);
      index--;
    }
  }
}
function realignChangeBlock(diff, content) {
  const { deletions, additions, deletionLineIndex, additionLineIndex } = content;
  const pairCount = Math.min(deletions, additions);
  const surplus = Math.abs(additions - deletions);
  if (pairCount === 0 || surplus === 0 || pairCount * (surplus + 1) > MAX_ALIGNMENT_COMPARISONS) return null;
  const strippedDeletions = [];
  for (let line = 0; line < deletions; line++) strippedDeletions.push(stripWhitespace(diff.deletionLines[deletionLineIndex + line] ?? ""));
  const strippedAdditions = [];
  for (let line = 0; line < additions; line++) strippedAdditions.push(stripWhitespace(diff.additionLines[additionLineIndex + line] ?? ""));
  const additionsAreLonger = additions > deletions;
  let bestOffset = 0;
  let bestScore = -1;
  for (let offset = 0; offset <= surplus; offset++) {
    let score = 0;
    for (let pair = 0; pair < pairCount; pair++) score += lineSimilarity(strippedDeletions[pair + (additionsAreLonger ? 0 : offset)], strippedAdditions[pair + (additionsAreLonger ? offset : 0)]);
    if (offset === 0) bestScore = score + pairCount * MIN_IMPROVEMENT_PER_PAIR;
    else if (score > bestScore) {
      bestScore = score;
      bestOffset = offset;
    }
  }
  if (bestOffset === 0) return null;
  const blocks = [];
  const pushBlock = (blockDeletions, blockAdditions, blockDeletionIndex, blockAdditionIndex) => {
    if (blockDeletions > 0 || blockAdditions > 0) blocks.push({
      type: "change",
      deletions: blockDeletions,
      additions: blockAdditions,
      deletionLineIndex: blockDeletionIndex,
      additionLineIndex: blockAdditionIndex
    });
  };
  if (additionsAreLonger) {
    pushBlock(0, bestOffset, deletionLineIndex, additionLineIndex);
    pushBlock(pairCount, pairCount, deletionLineIndex, additionLineIndex + bestOffset);
    pushBlock(0, additions - pairCount - bestOffset, deletionLineIndex + pairCount, additionLineIndex + bestOffset + pairCount);
  } else {
    pushBlock(bestOffset, 0, deletionLineIndex, additionLineIndex);
    pushBlock(pairCount, pairCount, deletionLineIndex + bestOffset, additionLineIndex);
    pushBlock(deletions - pairCount - bestOffset, 0, deletionLineIndex + bestOffset + pairCount, additionLineIndex + pairCount);
  }
  return blocks;
}
const WHITESPACE = /\s+/g;
function stripWhitespace(line) {
  return line.replace(WHITESPACE, "");
}
function lineSimilarity(a, b2) {
  if (a === b2) return 1;
  const maxLength = Math.max(a.length, b2.length);
  const minLength = Math.min(a.length, b2.length);
  if (minLength === 0) return 0;
  let prefix = 0;
  while (prefix < minLength && a[prefix] === b2[prefix]) prefix++;
  let suffix = 0;
  while (suffix < minLength - prefix && a[a.length - 1 - suffix] === b2[b2.length - 1 - suffix]) suffix++;
  return (prefix + suffix) / maxLength;
}
function processPatch(data, cacheKeyPrefix, throwOnError) {
  try {
    return _processPatch(data, cacheKeyPrefix, throwOnError);
  } finally {
    releaseStringDetachBuffer();
  }
}
function _processPatch(data, cacheKeyPrefix, throwOnError = false) {
  const isGitDiff = isGitDiffPatch(data);
  const rawFiles = isGitDiff ? splitGitDiffFiles(data) : splitUnifiedDiffFiles(data);
  let patchMetadata;
  const files = [];
  for (const fileOrPatchMetadata of rawFiles) {
    if (isGitDiff && !GIT_DIFF_FILE_BREAK_REGEX.test(fileOrPatchMetadata)) {
      if (patchMetadata == null) patchMetadata = detachString(fileOrPatchMetadata);
      else if (throwOnError) throw Error("parsePatchContent: unknown file blob");
      else console.error("parsePatchContent: unknown file blob:", fileOrPatchMetadata);
      continue;
    } else if (!isGitDiff && !startsWithUnifiedDiffFileHeader(fileOrPatchMetadata)) {
      if (patchMetadata == null) patchMetadata = detachString(fileOrPatchMetadata);
      else if (throwOnError) throw Error("parsePatchContent: unknown file blob");
      else console.error("parsePatchContent: unknown file blob:", fileOrPatchMetadata);
      continue;
    }
    const currentFile = _processFile(fileOrPatchMetadata, {
      cacheKey: cacheKeyPrefix != null ? `${cacheKeyPrefix}-${files.length}` : void 0,
      isGitDiff,
      throwOnError
    });
    if (currentFile != null) files.push(currentFile);
  }
  return {
    patchMetadata,
    files
  };
}
function processFile(fileDiffString, options) {
  try {
    return _processFile(fileDiffString, options);
  } finally {
    releaseStringDetachBuffer();
  }
}
function _processFile(fileDiffString, { cacheKey, isGitDiff = GIT_DIFF_FILE_BREAK_REGEX.test(fileDiffString), oldFile, newFile, throwOnError = false } = {}) {
  let lastHunkEnd = 0;
  const hunks = splitAtLinePrefix(fileDiffString, "@@ ");
  let currentFile;
  const isPartial = oldFile == null || newFile == null;
  let deletionLineIndex = 0;
  let additionLineIndex = 0;
  for (const hunk of hunks) {
    const lines = splitWithNewlines(hunk);
    const firstLine = lines[0];
    if (firstLine == null) {
      if (throwOnError) throw Error("parsePatchContent: invalid hunk");
      else console.error("parsePatchContent: invalid hunk", hunk);
      continue;
    }
    const fileHeader = parseHunkHeader(firstLine);
    let additionLines = 0;
    let deletionLines = 0;
    if (fileHeader == null || currentFile == null) {
      if (currentFile != null) {
        if (throwOnError) throw Error("parsePatchContent: Invalid hunk");
        else console.error("parsePatchContent: Invalid hunk", hunk);
        continue;
      }
      currentFile = {
        name: "",
        type: "change",
        hunks: [],
        splitLineCount: 0,
        unifiedLineCount: 0,
        isPartial,
        additionLines: !isPartial && oldFile != null && newFile != null ? splitFileContents$1(newFile.contents) : [],
        deletionLines: !isPartial && oldFile != null && newFile != null ? splitFileContents$1(oldFile.contents) : [],
        cacheKey: maybeDetachOptionalString(cacheKey)
      };
      if (currentFile.additionLines.length === 1 && newFile?.contents === "") currentFile.additionLines.length = 0;
      if (currentFile.deletionLines.length === 1 && oldFile?.contents === "") currentFile.deletionLines.length = 0;
      for (const line of lines) {
        if (line.startsWith("diff --git")) {
          const filenameMatch2 = line.trim().match(ALTERNATE_FILE_NAMES_GIT);
          const prevName = filenameMatch2?.[1] ?? filenameMatch2?.[2];
          const name = filenameMatch2?.[3] ?? filenameMatch2?.[4];
          if (prevName == null || name == null) {
            if (throwOnError) throw Error("parsePatchContent: invalid git diff header");
            else console.error("parsePatchContent: invalid git diff header", line);
            continue;
          }
          currentFile.name = detachString(name.trim());
          if (prevName !== name) currentFile.prevName = detachString(prevName.trim());
          continue;
        }
        const filenameMatch = line.startsWith("---") || line.startsWith("+++") ? line.match(isGitDiff ? FILENAME_HEADER_REGEX_GIT : FILENAME_HEADER_REGEX) : null;
        if (filenameMatch != null) {
          const [, type, fileName] = filenameMatch;
          if (type === "---" && fileName !== "/dev/null") {
            const detachedFileName = detachString(fileName.trim());
            currentFile.prevName = detachedFileName;
            currentFile.name = detachedFileName;
          } else if (type === "+++" && fileName !== "/dev/null") currentFile.name = detachString(fileName.trim());
        } else if (isGitDiff) {
          if (line.startsWith("new mode ")) currentFile.mode = detachString(line.slice(8).trim());
          if (line.startsWith("old mode ")) currentFile.prevMode = detachString(line.slice(8).trim());
          if (line.startsWith("new file mode")) {
            currentFile.type = "new";
            currentFile.mode = detachString(line.slice(13).trim());
          }
          if (line.startsWith("deleted file mode")) {
            currentFile.type = "deleted";
            currentFile.mode = detachString(line.slice(17).trim());
          }
          if (line.startsWith("similarity index")) if (line.startsWith("similarity index 100%")) currentFile.type = "rename-pure";
          else currentFile.type = "rename-changed";
          if (line.startsWith("index ")) {
            const [, prevObjectId, newObjectId, mode] = line.trim().match(INDEX_LINE_METADATA) ?? [];
            if (prevObjectId != null) currentFile.prevObjectId = detachString(prevObjectId);
            if (newObjectId != null) currentFile.newObjectId = detachString(newObjectId);
            if (mode != null) currentFile.mode = detachString(mode);
          }
          if (line.startsWith("rename from ")) currentFile.prevName = detachString(line.slice(12).trim());
          if (line.startsWith("rename to ")) currentFile.name = detachString(line.slice(10).trim());
        }
      }
      continue;
    }
    let currentContent;
    let lastLineType;
    while (lines.length > 0 && (lines[lines.length - 1] === "\n" || lines[lines.length - 1] === "\r" || lines[lines.length - 1] === "\r\n" || lines[lines.length - 1] === "")) lines.pop();
    const { additionStart, deletionStart } = fileHeader;
    deletionLineIndex = isPartial ? deletionLineIndex : deletionStart - 1;
    additionLineIndex = isPartial ? additionLineIndex : additionStart - 1;
    const hunkData = {
      collapsedBefore: 0,
      splitLineCount: 0,
      splitLineStart: 0,
      unifiedLineCount: 0,
      unifiedLineStart: 0,
      additionCount: fileHeader.additionCount,
      additionStart,
      additionLines,
      deletionCount: fileHeader.deletionCount,
      deletionStart,
      deletionLines,
      deletionLineIndex,
      additionLineIndex,
      hunkContent: [],
      hunkContext: maybeDetachOptionalString(fileHeader.hunkContext),
      hunkSpecs: detachString(firstLine),
      noEOFCRAdditions: false,
      noEOFCRDeletions: false
    };
    let parsedAdditionLines = 0;
    let parsedDeletionLines = 0;
    for (let lineIndex = 1; lineIndex < lines.length; lineIndex++) {
      const rawLine = lines[lineIndex];
      if (parsedAdditionLines >= hunkData.additionCount && parsedDeletionLines >= hunkData.deletionCount && !rawLine.startsWith("\\")) {
        if (throwOnError && isHunkBodyLine(rawLine) && !isFormatPatchVersionSeparator(rawLine)) throw Error("parsePatchContent: hunk has more lines than expected");
        break;
      }
      const firstChar = rawLine[0];
      if (firstChar !== "+" && firstChar !== "-" && firstChar !== " " && firstChar !== "\\") {
        if (throwOnError) throw Error("parsePatchContent: invalid hunk line");
        console.error(`parseLineType: Invalid firstChar: "${firstChar}", full line: "${rawLine}"`);
        console.error("processFile: invalid rawLine:", rawLine);
        continue;
      }
      const type = parseRawLineType(firstChar);
      if (type === "addition") {
        if (throwOnError && parsedAdditionLines >= hunkData.additionCount) throw Error("parsePatchContent: hunk has too many addition lines");
        const line = getParsedLineContent(rawLine);
        if (currentContent == null || currentContent.type !== "change") {
          currentContent = createContentGroup("change", deletionLineIndex, additionLineIndex);
          hunkData.hunkContent.push(currentContent);
        }
        additionLineIndex++;
        parsedAdditionLines++;
        if (isPartial) currentFile.additionLines.push(line);
        currentContent.additions++;
        additionLines++;
        lastLineType = "addition";
      } else if (type === "deletion") {
        if (throwOnError && parsedDeletionLines >= hunkData.deletionCount) throw Error("parsePatchContent: hunk has too many deletion lines");
        const line = getParsedLineContent(rawLine);
        if (currentContent == null || currentContent.type !== "change") {
          currentContent = createContentGroup("change", deletionLineIndex, additionLineIndex);
          hunkData.hunkContent.push(currentContent);
        }
        deletionLineIndex++;
        parsedDeletionLines++;
        if (isPartial) currentFile.deletionLines.push(line);
        currentContent.deletions++;
        deletionLines++;
        lastLineType = "deletion";
      } else if (type === "context") {
        if (throwOnError && (parsedDeletionLines >= hunkData.deletionCount || parsedAdditionLines >= hunkData.additionCount)) throw Error("parsePatchContent: hunk has too many context lines");
        const line = getParsedLineContent(rawLine);
        if (currentContent == null || currentContent.type !== "context") {
          currentContent = createContentGroup("context", deletionLineIndex, additionLineIndex);
          hunkData.hunkContent.push(currentContent);
        }
        additionLineIndex++;
        deletionLineIndex++;
        parsedAdditionLines++;
        parsedDeletionLines++;
        if (isPartial) {
          currentFile.deletionLines.push(line);
          currentFile.additionLines.push(line);
        }
        currentContent.lines++;
        lastLineType = "context";
      } else if (type === "metadata" && currentContent != null) {
        if (currentContent.type === "context") {
          hunkData.noEOFCRAdditions = true;
          hunkData.noEOFCRDeletions = true;
        } else if (lastLineType === "deletion") hunkData.noEOFCRDeletions = true;
        else if (lastLineType === "addition") hunkData.noEOFCRAdditions = true;
        if (isPartial && (lastLineType === "addition" || lastLineType === "context")) {
          const lastIndex = currentFile.additionLines.length - 1;
          if (lastIndex >= 0) currentFile.additionLines[lastIndex] = cleanLastNewline(currentFile.additionLines[lastIndex]);
        }
        if (isPartial && (lastLineType === "deletion" || lastLineType === "context")) {
          const lastIndex = currentFile.deletionLines.length - 1;
          if (lastIndex >= 0) currentFile.deletionLines[lastIndex] = cleanLastNewline(currentFile.deletionLines[lastIndex]);
        }
      }
    }
    if (throwOnError && (parsedAdditionLines !== hunkData.additionCount || parsedDeletionLines !== hunkData.deletionCount)) throw Error("parsePatchContent: hunk line count mismatch");
    hunkData.additionLines = additionLines;
    hunkData.deletionLines = deletionLines;
    hunkData.collapsedBefore = Math.max(getHunkSideStartBoundary(hunkData.additionStart, hunkData.additionCount) - lastHunkEnd, 0);
    currentFile.hunks.push(hunkData);
    lastHunkEnd = getHunkSideEndBoundary(hunkData.additionStart, hunkData.additionCount);
    for (const content of hunkData.hunkContent) if (content.type === "context") {
      hunkData.splitLineCount += content.lines;
      hunkData.unifiedLineCount += content.lines;
    } else {
      hunkData.splitLineCount += Math.max(content.additions, content.deletions);
      hunkData.unifiedLineCount += content.deletions + content.additions;
    }
    hunkData.splitLineStart = currentFile.splitLineCount + hunkData.collapsedBefore;
    hunkData.unifiedLineStart = currentFile.unifiedLineCount + hunkData.collapsedBefore;
    currentFile.splitLineCount += hunkData.collapsedBefore + hunkData.splitLineCount;
    currentFile.unifiedLineCount += hunkData.collapsedBefore + hunkData.unifiedLineCount;
  }
  if (currentFile == null) return;
  if (throwOnError && isPartial && !isGitDiff && currentFile.hunks.length === 0) throw Error("parsePatchContent: unified file has no hunks");
  if (currentFile.hunks.length > 0 && !isPartial && currentFile.additionLines.length > 0 && currentFile.deletionLines.length > 0) {
    const lastHunk = currentFile.hunks[currentFile.hunks.length - 1];
    const lastHunkEnd2 = getHunkSideEndBoundary(lastHunk.additionStart, lastHunk.additionCount);
    const totalFileLines = currentFile.additionLines.length;
    const collapsedAfter = Math.max(totalFileLines - lastHunkEnd2, 0);
    currentFile.splitLineCount += collapsedAfter;
    currentFile.unifiedLineCount += collapsedAfter;
  }
  if (!isGitDiff) {
    if (currentFile.prevName != null && currentFile.name !== currentFile.prevName) if (currentFile.hunks.length > 0) currentFile.type = "rename-changed";
    else currentFile.type = "rename-pure";
    else if ((oldFile == null || oldFile.contents === "") && newFile != null && newFile.contents !== "") currentFile.type = "new";
    else if (oldFile != null && oldFile.contents !== "" && (newFile == null || newFile.contents === "")) currentFile.type = "deleted";
  }
  if (currentFile.type !== "rename-pure" && currentFile.type !== "rename-changed") currentFile.prevName = void 0;
  realignChangeContentBySimilarity(currentFile);
  return currentFile;
}
function parsePatchFiles(data, cacheKeyPrefix, throwOnError = false) {
  const patches = [];
  const rawPatches = hasCommitMetadataBoundary(data) ? data.split(COMMIT_METADATA_SPLIT) : [data];
  for (const patch of rawPatches) try {
    patches.push(processPatch(patch, cacheKeyPrefix != null ? `${cacheKeyPrefix}-${patches.length}` : void 0, throwOnError));
  } catch (error) {
    if (throwOnError) throw error;
    else console.error(error);
  }
  return patches;
}
function hasCommitMetadataBoundary(data) {
  return data.startsWith("From ") || data.includes("\nFrom ");
}
function splitFileContents$1(contents) {
  const lines = splitWithNewlines(contents);
  for (let index = 0; index < lines.length; index++) lines[index] = detachString(lines[index]);
  return lines;
}
function splitWithNewlines(contents) {
  if (contents.length === 0) return [""];
  const lines = [];
  let startIndex = 0;
  for (; ; ) {
    const newlineIndex = contents.indexOf("\n", startIndex);
    if (newlineIndex === -1) break;
    lines.push(contents.slice(startIndex, newlineIndex + 1));
    startIndex = newlineIndex + 1;
  }
  if (startIndex < contents.length) lines.push(contents.slice(startIndex));
  return lines;
}
function splitGitDiffFiles(contents) {
  return splitAtLinePrefix(contents, "diff --git");
}
function splitUnifiedDiffFiles(contents) {
  if (contents.length === 0) return [""];
  const parts = [];
  let partStartIndex = 0;
  let lineStartIndex = 0;
  let remainingDeletionLines = 0;
  let remainingAdditionLines = 0;
  let hasOpenedUnifiedFile = false;
  while (lineStartIndex < contents.length) {
    const nextLineStartIndex = getNextLineStartIndex(contents, lineStartIndex);
    if (remainingDeletionLines <= 0 && remainingAdditionLines <= 0) {
      if (isUnifiedDiffFileHeaderAt(contents, lineStartIndex)) {
        if (lineStartIndex > partStartIndex) parts.push(contents.slice(partStartIndex, lineStartIndex));
        partStartIndex = lineStartIndex;
        hasOpenedUnifiedFile = true;
        lineStartIndex = getNextLineStartIndex(contents, nextLineStartIndex);
        continue;
      }
      if (hasOpenedUnifiedFile && contents.startsWith("@@ -", lineStartIndex)) {
        const fileHeader = parseHunkHeader(contents.slice(lineStartIndex, nextLineStartIndex));
        if (fileHeader != null) {
          remainingDeletionLines = fileHeader.deletionCount;
          remainingAdditionLines = fileHeader.additionCount;
        }
      }
      lineStartIndex = nextLineStartIndex;
      continue;
    }
    const firstChar = contents[lineStartIndex];
    if (firstChar === "\\") {
      lineStartIndex = nextLineStartIndex;
      continue;
    }
    if (firstChar === " ") {
      remainingDeletionLines = Math.max(remainingDeletionLines - 1, 0);
      remainingAdditionLines = Math.max(remainingAdditionLines - 1, 0);
    } else if (firstChar === "-") remainingDeletionLines = Math.max(remainingDeletionLines - 1, 0);
    else if (firstChar === "+") remainingAdditionLines = Math.max(remainingAdditionLines - 1, 0);
    lineStartIndex = nextLineStartIndex;
  }
  parts.push(contents.slice(partStartIndex));
  return parts;
}
function startsWithUnifiedDiffFileHeader(contents) {
  return isUnifiedDiffFileHeaderAt(contents, 0);
}
function isUnifiedDiffFileHeaderAt(contents, lineStartIndex) {
  const nextLineStartIndex = getNextLineStartIndex(contents, lineStartIndex);
  return isUnifiedDiffHeaderLineAt(contents, lineStartIndex, "---") && isUnifiedDiffHeaderLineAt(contents, nextLineStartIndex, "+++");
}
function isUnifiedDiffHeaderLineAt(contents, lineStartIndex, prefix) {
  if (!contents.startsWith(prefix, lineStartIndex)) return false;
  const separator = contents[lineStartIndex + prefix.length];
  if (separator !== " " && separator !== "	") return false;
  for (let index = lineStartIndex + prefix.length + 1; index < contents.length; index++) {
    const char = contents[index];
    if (char === "\n" || char === "\r") break;
    if (char !== " " && char !== "	") return true;
  }
  return false;
}
function getNextLineStartIndex(contents, lineStartIndex) {
  const newlineIndex = contents.indexOf("\n", lineStartIndex);
  return newlineIndex === -1 ? contents.length : newlineIndex + 1;
}
function isHunkBodyLine(line) {
  const firstChar = line[0];
  return firstChar === "+" || firstChar === "-" || firstChar === " ";
}
function isFormatPatchVersionSeparator(line) {
  if (!line.startsWith("--")) return false;
  for (let index = 2; index < line.length; index++) {
    const char = line[index];
    if (char !== " " && char !== "	" && char !== "\n" && char !== "\r") return false;
  }
  return true;
}
function parseHunkHeader(line) {
  if (!line.startsWith("@@ -")) return;
  let index = 4;
  const deletionStartResult = readPositiveInteger(line, index);
  if (deletionStartResult == null) return;
  const deletionStart = deletionStartResult.value;
  index = deletionStartResult.endIndex;
  let deletionCount = 1;
  if (line[index] === ",") {
    const deletionCountResult = readPositiveInteger(line, index + 1);
    if (deletionCountResult == null) return;
    deletionCount = deletionCountResult.value;
    index = deletionCountResult.endIndex;
  }
  if (line[index] !== " " || line[index + 1] !== "+") return;
  index += 2;
  const additionStartResult = readPositiveInteger(line, index);
  if (additionStartResult == null) return;
  const additionStart = additionStartResult.value;
  index = additionStartResult.endIndex;
  let additionCount = 1;
  if (line[index] === ",") {
    const additionCountResult = readPositiveInteger(line, index + 1);
    if (additionCountResult == null) return;
    additionCount = additionCountResult.value;
    index = additionCountResult.endIndex;
  }
  if (line[index] !== " " || line[index + 1] !== "@" || line[index + 2] !== "@") return;
  let hunkContext;
  const contextStartIndex = index + 3;
  if (line[contextStartIndex] === " ") hunkContext = trimLineEnd(line.slice(contextStartIndex + 1));
  return {
    additionCount,
    additionStart,
    deletionCount,
    deletionStart,
    hunkContext
  };
}
function readPositiveInteger(value, startIndex) {
  let index = startIndex;
  let parsedValue = 0;
  for (; index < value.length; index++) {
    const digit = value.charCodeAt(index) - 48;
    if (digit < 0 || digit > 9) break;
    parsedValue = parsedValue * 10 + digit;
  }
  if (index === startIndex) return;
  return {
    value: parsedValue,
    endIndex: index
  };
}
function trimLineEnd(value) {
  if (value.endsWith("\r\n")) return value.slice(0, -2);
  if (value.endsWith("\n")) return value.slice(0, -1);
  return value;
}
function isGitDiffPatch(data) {
  return data.startsWith("diff --git") || data.includes("\ndiff --git");
}
function splitAtLinePrefix(contents, prefix) {
  if (contents.length === 0) return [""];
  const newlinePrefix = `
${prefix}`;
  const firstBoundaryIndex = contents.startsWith(prefix) ? 0 : findLinePrefixIndex(contents, newlinePrefix, 0);
  if (firstBoundaryIndex === -1) return [contents];
  const parts = [];
  if (firstBoundaryIndex > 0) parts.push(contents.slice(0, firstBoundaryIndex));
  let startIndex = firstBoundaryIndex;
  for (; ; ) {
    const nextBoundaryIndex = findLinePrefixIndex(contents, newlinePrefix, startIndex + 1);
    if (nextBoundaryIndex === -1) break;
    parts.push(contents.slice(startIndex, nextBoundaryIndex));
    startIndex = nextBoundaryIndex;
  }
  parts.push(contents.slice(startIndex));
  return parts;
}
function findLinePrefixIndex(contents, newlinePrefix, fromIndex) {
  const index = contents.indexOf(newlinePrefix, fromIndex);
  return index === -1 ? -1 : index + 1;
}
function maybeDetachOptionalString(value) {
  return value == null ? value : detachString(value);
}
function parseRawLineType(firstChar) {
  return firstChar === " " ? "context" : firstChar === "\\" ? "metadata" : firstChar === "+" ? "addition" : "deletion";
}
function getParsedLineContent(rawLine) {
  const processedLine = rawLine.slice(1);
  return detachString(processedLine === "" ? "\n" : processedLine);
}
function createContentGroup(type, deletionLineIndex, additionLineIndex) {
  if (type === "change") return {
    type: "change",
    additions: 0,
    deletions: 0,
    additionLineIndex,
    deletionLineIndex
  };
  return {
    type: "context",
    lines: 0,
    additionLineIndex,
    deletionLineIndex
  };
}
const MISSING_FILE_NAME = "/dev/null";
function parseDiffFromFile(oldFile, newFile, options, throwOnError = false) {
  if (oldFile === null && newFile === null) throw new Error("parseDiffFromFile: You must pass oldFile, newFile, or both");
  const resolvedOldFile = oldFile ?? createMissingFile();
  const resolvedNewFile = newFile ?? createMissingFile();
  const fileData = processFile(createTwoFilesPatch(resolvedOldFile.name, resolvedNewFile.name, resolvedOldFile.contents, resolvedNewFile.contents, resolvedOldFile.header, resolvedNewFile.header, options), {
    cacheKey: (() => {
      const oldCacheKey = oldFile?.cacheKey ?? oldFile?.name;
      const newCacheKey = newFile?.cacheKey ?? newFile?.name;
      if (oldCacheKey != null && newCacheKey != null) return oldCacheKey + ":" + newCacheKey;
      return oldCacheKey ?? newCacheKey;
    })(),
    oldFile: resolvedOldFile,
    newFile: resolvedNewFile,
    throwOnError
  });
  if (fileData == null) throw new Error("parseDiffFrom: FileInvalid diff -- probably need to fix something -- if the files are the same maybe?");
  if (oldFile === null) {
    fileData.type = "new";
    fileData.prevName = void 0;
  } else if (newFile === null) {
    fileData.type = "deleted";
    fileData.prevName = void 0;
  }
  const language = newFile?.lang ?? (newFile === null ? oldFile?.lang : void 0);
  if (language != null) fileData.lang = language;
  return fileData;
}
function createMissingFile() {
  return {
    name: MISSING_FILE_NAME,
    contents: ""
  };
}
function recomputeDiffHunks(diff, parseDiffOptions) {
  const recomputed = parseDiffFromFile({
    name: diff.prevName ?? diff.name,
    contents: diff.deletionLines.join("")
  }, {
    name: diff.name,
    contents: diff.additionLines.join(""),
    lang: diff.lang
  }, parseDiffOptions);
  return {
    hunks: recomputed.hunks,
    splitLineCount: recomputed.splitLineCount,
    unifiedLineCount: recomputed.unifiedLineCount,
    additionLines: recomputed.additionLines,
    deletionLines: recomputed.deletionLines,
    type: recomputed.type
  };
}
function buildTopAlignedAdditionSentinel(lineCount, deletionContents) {
  const count = Math.max(lineCount, 1);
  let sentinel = Array.from({ length: count }, (_2, index) => `${" ".repeat(index + 1)}
`).join("");
  if (sentinel === deletionContents) sentinel = Array.from({ length: count }, (_2, index) => `\0${" ".repeat(index)}
`).join("");
  return sentinel;
}
function hasOnlyBlankAdditionContents(additionLines) {
  for (const line of additionLines) if (line.trim().length > 0) return false;
  return true;
}
function shouldTopAlignAdditionRecompute(diff, additionLines) {
  return additionLines.length > 0 && additionLines.length < diff.deletionLines.length && hasOnlyBlankAdditionContents(additionLines);
}
function recomputeTopAlignedAdditionDiff(diff, additionLines, parseDiffOptions) {
  const deletionContents = diff.deletionLines.join("");
  const additionSentinel = buildTopAlignedAdditionSentinel(additionLines.length, deletionContents);
  const recomputed = parseDiffFromFile({
    name: diff.prevName ?? diff.name,
    contents: deletionContents
  }, {
    name: diff.name,
    contents: additionSentinel,
    lang: diff.lang
  }, parseDiffOptions);
  return {
    hunks: recomputed.hunks,
    splitLineCount: recomputed.splitLineCount,
    unifiedLineCount: recomputed.unifiedLineCount,
    additionLines,
    deletionLines: recomputed.deletionLines,
    type: recomputed.type
  };
}
function recomputeEmptyDocumentDiff(diff, parseDiffOptions) {
  return recomputeTopAlignedAdditionDiff(diff, [""], parseDiffOptions);
}
function recomputeDiffHunksForEdit(diff, parseDiffOptions) {
  if (diff.additionLines.length === 0) return recomputeEmptyDocumentDiff(diff, parseDiffOptions);
  if (shouldTopAlignAdditionRecompute(diff, diff.additionLines)) return recomputeTopAlignedAdditionDiff(diff, diff.additionLines, parseDiffOptions);
  const additionLines = diff.additionLines;
  const recomputed = recomputeDiffHunks(diff, parseDiffOptions);
  preserveTrailingEditorBlankLine(recomputed, additionLines);
  return recomputed;
}
function hasTrailingEditorBlankLine(additionLines) {
  return additionLines.length > 1 && additionLines.at(-1) === "";
}
function preserveTrailingEditorBlankLine(recomputed, additionLines) {
  if (!hasTrailingEditorBlankLine(additionLines)) return;
  const extraLineCount = additionLines.length - recomputed.additionLines.length;
  if (extraLineCount <= 0) return;
  const extraAdditionLineIndex = recomputed.additionLines.length;
  const lastHunk = recomputed.hunks.at(-1);
  if (lastHunk == null) return;
  if (getHunkSideEndBoundary(lastHunk.additionStart, lastHunk.additionCount) !== extraAdditionLineIndex) return;
  for (const content of lastHunk.hunkContent) if (content.type === "change" && content.additions < content.deletions && content.additionLineIndex + content.additions === extraAdditionLineIndex) {
    recomputed.additionLines = additionLines;
    content.additions += extraLineCount;
    lastHunk.additionCount += extraLineCount;
    lastHunk.additionLines += extraLineCount;
    recomputeDiffRenderLineCounts(recomputed);
    return;
  }
}
function updateDiffHunks(diff, changedAdditionLineIndexes, parseDiffOptions) {
  if (diff.isPartial) return applyHunkUpdateResult(diff, recomputeDiffHunks(diff, parseDiffOptions));
  if (diff.deletionLines.length !== diff.additionLines.length) return applyHunkUpdateResult(diff, recomputeDiffHunks(diff, parseDiffOptions));
  const changedLines = Array.from(changedAdditionLineIndexes);
  if (changedLines.length === 0) return applyHunkUpdateResult(diff, {
    hunks: diff.hunks,
    splitLineCount: diff.splitLineCount,
    unifiedLineCount: diff.unifiedLineCount,
    type: diff.type
  });
  for (const line of changedLines) {
    const additionLine = diff.additionLines[line];
    const deletionLine = diff.deletionLines[line];
    if (additionLine == null || deletionLine == null) return applyHunkUpdateResult(diff, recomputeDiffHunks(diff, parseDiffOptions));
    if (cleanLastNewline(additionLine) === cleanLastNewline(deletionLine)) return applyHunkUpdateResult(diff, recomputeDiffHunks(diff, parseDiffOptions));
  }
  const affectedHunkIndexes = getAffectedHunkIndexes(diff, changedLines);
  if (affectedHunkIndexes.size === 0) return applyHunkUpdateResult(diff, recomputeDiffHunks(diff, parseDiffOptions));
  for (const hunkIndex of affectedHunkIndexes) if (!reparseHunkRegion(diff, hunkIndex, parseDiffOptions)) return applyHunkUpdateResult(diff, recomputeDiffHunks(diff, parseDiffOptions));
  recomputeDiffRenderLineCounts(diff);
  if (hasTrailingContextMismatch(diff)) return applyHunkUpdateResult(diff, recomputeDiffHunks(diff, parseDiffOptions));
  return applyHunkUpdateResult(diff, {
    hunks: diff.hunks,
    splitLineCount: diff.splitLineCount,
    unifiedLineCount: diff.unifiedLineCount,
    type: diff.type
  });
}
function applyHunkUpdateResult(diff, result) {
  Object.assign(diff, result);
  return result;
}
function getAffectedHunkIndexes(diff, changedAdditionLineIndexes) {
  const indexes = /* @__PURE__ */ new Set();
  for (const line of changedAdditionLineIndexes) {
    const hunkIndex = findHunkIndexForAdditionLine(diff, line);
    if (hunkIndex == null) return /* @__PURE__ */ new Set();
    indexes.add(hunkIndex);
  }
  return indexes;
}
function findHunkIndexForAdditionLine(diff, line) {
  for (const [hunkIndex, hunk] of diff.hunks.entries()) {
    const end = hunk.additionLineIndex + hunk.additionCount;
    if (line >= hunk.additionLineIndex && line < end) return hunkIndex;
  }
}
function reparseHunkRegion(diff, hunkIndex, parseDiffOptions) {
  const hunk = diff.hunks[hunkIndex];
  if (hunk == null) return false;
  const deletionSlice = diff.deletionLines.slice(hunk.deletionLineIndex, hunk.deletionLineIndex + hunk.deletionCount);
  const additionSlice = diff.additionLines.slice(hunk.additionLineIndex, hunk.additionLineIndex + hunk.additionCount);
  const reparsed = parseDiffFromFile({
    name: diff.prevName ?? diff.name,
    contents: deletionSlice.join("")
  }, {
    name: diff.name,
    contents: additionSlice.join(""),
    lang: diff.lang
  }, {
    ...parseDiffOptions,
    context: 0
  });
  const reparsedHunk = reparsed.hunks[0];
  if (reparsedHunk == null || reparsed.hunks.length !== 1) return false;
  applyReparsedHunk(hunk, reparsedHunk);
  syncHunkNoEOFCRFromFullFile(diff, hunkIndex);
  return true;
}
function syncHunkNoEOFCRFromFullFile(diff, hunkIndex) {
  const hunk = diff.hunks[hunkIndex];
  if (hunk == null) return;
  if (!(hunkIndex === diff.hunks.length - 1)) {
    hunk.noEOFCRAdditions = false;
    hunk.noEOFCRDeletions = false;
    return;
  }
  const lastAdditionLine = diff.additionLines.at(-1);
  const lastDeletionLine = diff.deletionLines.at(-1);
  hunk.noEOFCRAdditions = lastAdditionLine != null && lastAdditionLine !== "" && !lastAdditionLine.endsWith("\n");
  hunk.noEOFCRDeletions = lastDeletionLine != null && lastDeletionLine !== "" && !lastDeletionLine.endsWith("\n");
}
function applyReparsedHunk(target, parsed) {
  const additionOffset = target.additionLineIndex;
  const deletionOffset = target.deletionLineIndex;
  target.hunkContent = parsed.hunkContent.map((content) => offsetHunkContent(content, additionOffset, deletionOffset));
  target.additionLineIndex = additionOffset + parsed.additionLineIndex;
  target.additionStart = target.additionStart + parsed.additionLineIndex;
  target.additionCount = parsed.additionCount;
  target.additionLines = parsed.additionLines;
  if (parsed.deletionLineIndex >= 0) {
    target.deletionLineIndex = deletionOffset + parsed.deletionLineIndex;
    target.deletionStart = target.deletionStart + parsed.deletionLineIndex;
  }
  target.deletionCount = parsed.deletionCount;
  target.deletionLines = parsed.deletionLines;
  target.noEOFCRAdditions = parsed.noEOFCRAdditions;
  target.noEOFCRDeletions = parsed.noEOFCRDeletions;
  recomputeHunkRenderLineCounts(target);
}
function offsetHunkContent(content, additionOffset, deletionOffset) {
  return {
    ...content,
    additionLineIndex: content.additionLineIndex + additionOffset,
    deletionLineIndex: content.deletionLineIndex + deletionOffset
  };
}
function recomputeHunkRenderLineCounts(hunk) {
  let splitLineCount = 0;
  let unifiedLineCount = 0;
  for (const content of hunk.hunkContent) if (content.type === "context") {
    splitLineCount += content.lines;
    unifiedLineCount += content.lines;
  } else {
    splitLineCount += Math.max(content.additions, content.deletions);
    unifiedLineCount += content.additions + content.deletions;
  }
  hunk.splitLineCount = splitLineCount;
  hunk.unifiedLineCount = unifiedLineCount;
}
function recomputeDiffRenderLineCounts(diff) {
  let splitTotal = 0;
  let unifiedTotal = 0;
  let lastHunkAdditionEnd = 0;
  for (const hunk of diff.hunks) {
    hunk.collapsedBefore = Math.max(getHunkSideStartBoundary(hunk.additionStart, hunk.additionCount) - lastHunkAdditionEnd, 0);
    hunk.splitLineStart = splitTotal + hunk.collapsedBefore;
    hunk.unifiedLineStart = unifiedTotal + hunk.collapsedBefore;
    recomputeHunkRenderLineCounts(hunk);
    splitTotal += hunk.collapsedBefore + hunk.splitLineCount;
    unifiedTotal += hunk.collapsedBefore + hunk.unifiedLineCount;
    lastHunkAdditionEnd = getHunkSideEndBoundary(hunk.additionStart, hunk.additionCount);
  }
  if (diff.hunks.length > 0) {
    const lastHunk = diff.hunks[diff.hunks.length - 1];
    const collapsedAfter = Math.max(diff.additionLines.length - getHunkSideEndBoundary(lastHunk.additionStart, lastHunk.additionCount), 0);
    splitTotal += collapsedAfter;
    unifiedTotal += collapsedAfter;
  }
  diff.splitLineCount = splitTotal;
  diff.unifiedLineCount = unifiedTotal;
}
const deletionLineSetCache = /* @__PURE__ */ new WeakMap();
function normalizeEditorLines(lines) {
  if (lines.length > 1 && lines[lines.length - 1] === "") return lines.slice(0, -1);
  return lines;
}
function findDivergenceCore(deletionLines, additionLines) {
  const maxStart = Math.min(deletionLines.length, additionLines.length);
  let start = 0;
  while (start < maxStart && deletionLines[start] === additionLines[start]) start++;
  let deletionEnd = deletionLines.length;
  let additionEnd = additionLines.length;
  while (deletionEnd > start && additionEnd > start && deletionLines[deletionEnd - 1] === additionLines[additionEnd - 1]) {
    deletionEnd--;
    additionEnd--;
  }
  if (start === deletionEnd && start === additionEnd) return;
  return {
    start,
    deletionEnd,
    additionEnd
  };
}
function rebuildSessionHunks(diff, parseDiffOptions) {
  const previousHunks = diff.hunks;
  const editorAdditionLines = diff.additionLines;
  const canonicalAdditionLines = normalizeEditorLines(editorAdditionLines);
  const canonicalDiff = canonicalAdditionLines === editorAdditionLines ? diff : {
    ...diff,
    additionLines: canonicalAdditionLines
  };
  const plans = buildRegionPlans(previousHunks, parseCanonicalChangeBlocks(canonicalDiff, parseDiffOptions), diff.deletionLines.length);
  const nextHunks = buildRegionHunks(canonicalDiff, plans);
  diff.additionLines = canonicalAdditionLines;
  diff.hunks = nextHunks;
  diff.editSessionDirty = true;
  finalizeSessionHunks(diff);
  preserveTrailingEditorBlankLine(diff, editorAdditionLines);
  if (!hasRegionOrSplitLayoutChanged(previousHunks, diff.hunks)) return;
  return { regions: plans.map((plan) => plan.previousSpan) };
}
function applySessionChangedLines(diff, changedAdditionLineIndexes, parseDiffOptions, previousAdditionLines) {
  const lines = Array.from(new Set(changedAdditionLineIndexes)).filter((line) => line >= 0 && line < diff.additionLines.length).sort((a, b2) => a - b2);
  if (lines.length === 0) return;
  const { hunks } = diff;
  let regionIndex;
  let hunkIndex = 0;
  for (const line of lines) {
    while (hunkIndex < hunks.length) {
      const hunk2 = hunks[hunkIndex];
      if (line < getHunkAdditionStart(hunk2) + hunk2.additionCount) break;
      hunkIndex++;
    }
    const hunk = hunks[hunkIndex];
    const start = hunk == null ? void 0 : getHunkAdditionStart(hunk);
    if (start == null || line < start || regionIndex != null && regionIndex !== hunkIndex) return rebuildSessionHunks(diff, parseDiffOptions);
    regionIndex = hunkIndex;
  }
  if (regionIndex == null) return;
  if (canRetainCanonicalBlocks(diff, lines, regionIndex, previousAdditionLines, parseDiffOptions)) {
    diff.editSessionDirty = true;
    return;
  }
  return rebuildSessionHunks(diff, parseDiffOptions);
}
function canRetainCanonicalBlocks(diff, changedLines, regionIndex, previousAdditionLines, parseDiffOptions) {
  if (previousAdditionLines == null || parseDiffOptions?.ignoreWhitespace === true || parseDiffOptions?.stripTrailingCr === true) return false;
  const deletionLineSet = getDeletionLineSet(diff);
  const hunk = diff.hunks[regionIndex];
  if (hunk.hunkContent.some(isPureChange)) return false;
  for (const line of changedLines) {
    const previousLine = previousAdditionLines.get(line);
    const additionLine = diff.additionLines[line];
    if (previousLine == null || additionLine == null || deletionLineSet.has(previousLine) || deletionLineSet.has(additionLine)) return false;
    let insideBalancedChange = false;
    for (const content of hunk.hunkContent) if (content.type === "change" && content.additions === content.deletions && line >= content.additionLineIndex && line < content.additionLineIndex + content.additions) {
      insideBalancedChange = true;
      break;
    }
    if (!insideBalancedChange) return false;
  }
  return true;
}
function getDeletionLineSet(diff) {
  const cached = deletionLineSetCache.get(diff);
  if (cached?.lines === diff.deletionLines) return cached.set;
  const set = new Set(diff.deletionLines);
  deletionLineSetCache.set(diff, {
    lines: diff.deletionLines,
    set
  });
  return set;
}
function isPureChange(content) {
  return content?.type === "change" && (content.additions === 0 || content.deletions === 0);
}
function remapExpandedHunksForRegionChange(expandedHunks, change) {
  const remapped = /* @__PURE__ */ new Map();
  const { regions } = change;
  for (let key2 = 0; key2 <= regions.length; key2++) {
    const previous = regions[key2 - 1];
    const next = regions[key2];
    const fromStartSource = key2 === 0 ? expandedHunks.get(0) : previous == null ? void 0 : expandedHunks.get(previous.lastIndex + 1);
    const fromEndSource = next == null ? void 0 : expandedHunks.get(next.firstIndex);
    const fromStart = fromStartSource?.fromStart ?? 0;
    const fromEnd = fromEndSource?.fromEnd ?? 0;
    if (fromStart > 0 || fromEnd > 0) remapped.set(key2, {
      fromStart,
      fromEnd
    });
  }
  return remapped;
}
function captureExpansionAnchors(diff, expandedHunks, collapsedContextThreshold) {
  const anchors = [];
  if (diff.isPartial) return anchors;
  for (const [hunkIndex, hunk] of diff.hunks.entries()) {
    const region = getExpandedRegion({
      isPartial: diff.isPartial,
      rangeSize: hunk.collapsedBefore,
      expandedHunks,
      hunkIndex,
      collapsedContextThreshold
    });
    if (region.rangeSize <= collapsedContextThreshold) continue;
    const gapEnd = getHunkDeletionStart(hunk);
    const gapStart = gapEnd - region.rangeSize;
    if (region.fromStart > 0) anchors.push([gapStart, gapStart + region.fromStart]);
    if (region.fromEnd > 0) anchors.push([gapEnd - region.fromEnd, gapEnd]);
  }
  const trailingRegion = getTrailingExpandedRegion({
    fileDiff: diff,
    hunkIndex: diff.hunks.length - 1,
    expandedHunks,
    collapsedContextThreshold,
    errorPrefix: "captureExpansionAnchors"
  });
  if (trailingRegion != null && trailingRegion.fromStart > 0 && trailingRegion.rangeSize > collapsedContextThreshold) {
    const lastHunk = diff.hunks[diff.hunks.length - 1];
    const gapStart = getHunkDeletionStart(lastHunk) + lastHunk.deletionCount;
    anchors.push([gapStart, gapStart + trailingRegion.fromStart]);
  }
  return anchors;
}
function rebuildExpansionFromAnchors(diff, anchors) {
  const rebuilt = /* @__PURE__ */ new Map();
  if (anchors.length === 0) return rebuilt;
  const applyGap = (key2, gapStart, gapEnd) => {
    if (gapEnd <= gapStart) return;
    let fromStart = 0;
    let fromEnd = 0;
    for (const [start, end] of anchors) {
      if (end <= gapStart || start >= gapEnd) continue;
      if (start <= gapStart) fromStart = Math.max(fromStart, Math.min(end, gapEnd) - gapStart);
      if (end >= gapEnd) fromEnd = Math.max(fromEnd, gapEnd - Math.max(start, gapStart));
    }
    if (fromStart > 0 || fromEnd > 0) rebuilt.set(key2, {
      fromStart,
      fromEnd
    });
  };
  for (const [hunkIndex, hunk] of diff.hunks.entries()) {
    const gapEnd = getHunkDeletionStart(hunk);
    applyGap(hunkIndex, gapEnd - Math.max(hunk.collapsedBefore, 0), gapEnd);
  }
  const lastHunk = diff.hunks[diff.hunks.length - 1];
  if (lastHunk != null && !diff.isPartial && diff.deletionLines.length > 0) applyGap(diff.hunks.length, getHunkDeletionStart(lastHunk) + lastHunk.deletionCount, diff.deletionLines.length);
  return rebuilt;
}
function finishEditSessionForDiff(diff, parseDiffOptions) {
  if (diff.editSessionDirty !== true) return false;
  diff.editSessionDirty = void 0;
  Object.assign(diff, recomputeDiffHunksForEdit(diff, parseDiffOptions));
  return true;
}
function parseCanonicalChangeBlocks(diff, parseDiffOptions) {
  if (findDivergenceCore(diff.deletionLines, diff.additionLines) == null) return [];
  const parsed = parseDiffFromFile({
    name: diff.prevName ?? diff.name,
    contents: diff.deletionLines.join("")
  }, {
    name: diff.name,
    contents: diff.additionLines.join(""),
    lang: diff.lang
  }, parseDiffOptions);
  const blocks = [];
  let coveredAdditions = 0;
  let coveredDeletions = 0;
  for (const hunk of parsed.hunks) {
    const contextLines = hunk.additionCount > 0 ? hunk.additionLineIndex - coveredAdditions : hunk.deletionLineIndex - coveredDeletions;
    coveredAdditions += contextLines;
    coveredDeletions += contextLines;
    for (const content of hunk.hunkContent) {
      if (content.type === "context") {
        coveredAdditions += content.lines;
        coveredDeletions += content.lines;
        continue;
      }
      const block = offsetHunkContent(content, 0, 0);
      if (block.additions === 0) block.additionLineIndex = coveredAdditions;
      if (block.deletions === 0) block.deletionLineIndex = coveredDeletions;
      blocks.push(block);
      coveredAdditions += block.additions;
      coveredDeletions += block.deletions;
    }
  }
  return blocks;
}
function buildRegionPlans(previousHunks, blocks, deletionLineCount) {
  const previousPlans = previousHunks.map((hunk, index) => {
    const deletionStart = getHunkDeletionStart(hunk);
    return {
      deletionStart,
      deletionEnd: deletionStart + hunk.deletionCount,
      blocks: [],
      previousSpan: {
        firstIndex: index,
        lastIndex: index
      }
    };
  });
  const plans = [];
  let previousIndex = 0;
  for (const block of blocks) {
    const blockStart = block.deletionLineIndex;
    const blockEnd = blockStart + block.deletions;
    while (previousIndex < previousPlans.length && previousPlans[previousIndex].deletionEnd < blockStart) {
      plans.push(previousPlans[previousIndex]);
      previousIndex++;
    }
    let plan = plans.length > 0 && blockTouchesRegion(blockStart, blockEnd, plans[plans.length - 1]) ? plans.pop() : void 0;
    while (previousIndex < previousPlans.length && previousPlans[previousIndex].deletionStart <= blockEnd) {
      plan = mergeRegionPlans(plan, previousPlans[previousIndex]);
      previousIndex++;
    }
    if (plan == null) {
      let deletionStart = blockStart;
      let deletionEnd = blockEnd;
      if ((block.deletions === 0 || block.additions === 0) && deletionLineCount > block.deletions) {
        const previousEnd = plans[plans.length - 1]?.deletionEnd ?? 0;
        const nextStart = previousPlans[previousIndex]?.deletionStart ?? deletionLineCount;
        if (blockStart > previousEnd) deletionStart--;
        else if (blockEnd < nextStart) deletionEnd++;
      }
      plan = {
        deletionStart,
        deletionEnd,
        blocks: [],
        previousSpan: void 0
      };
    }
    plan.deletionStart = Math.min(plan.deletionStart, blockStart);
    plan.deletionEnd = Math.max(plan.deletionEnd, blockEnd);
    plan.blocks.push(block);
    plans.push(plan);
  }
  while (previousIndex < previousPlans.length) {
    plans.push(previousPlans[previousIndex]);
    previousIndex++;
  }
  return plans;
}
function blockTouchesRegion(blockStart, blockEnd, region) {
  return blockStart <= region.deletionEnd && blockEnd >= region.deletionStart;
}
function mergeRegionPlans(target, source) {
  if (target == null) return source;
  target.deletionStart = Math.min(target.deletionStart, source.deletionStart);
  target.deletionEnd = Math.max(target.deletionEnd, source.deletionEnd);
  target.blocks.push(...source.blocks);
  if (source.previousSpan != null) {
    target.previousSpan ??= { ...source.previousSpan };
    target.previousSpan.firstIndex = Math.min(target.previousSpan.firstIndex, source.previousSpan.firstIndex);
    target.previousSpan.lastIndex = Math.max(target.previousSpan.lastIndex, source.previousSpan.lastIndex);
  }
  return target;
}
function buildRegionHunks(diff, plans) {
  const hunks = [];
  let deletionCursor = 0;
  let additionCursor = 0;
  for (const plan of plans) {
    const contextBefore = plan.deletionStart - deletionCursor;
    if (contextBefore < 0) throw new Error("buildRegionHunks: overlapping old-side regions");
    deletionCursor += contextBefore;
    additionCursor += contextBefore;
    const additionStart = additionCursor;
    const hunkContent = [];
    for (const canonicalBlock of plan.blocks) {
      const deletionContext = canonicalBlock.deletionLineIndex - deletionCursor;
      const additionContext = canonicalBlock.additionLineIndex - additionCursor;
      if (deletionContext < 0 || deletionContext !== additionContext) throw new Error("buildRegionHunks: canonical block context mismatch");
      pushContext(hunkContent, deletionContext, additionCursor, deletionCursor);
      deletionCursor += deletionContext;
      additionCursor += additionContext;
      hunkContent.push({ ...canonicalBlock });
      deletionCursor += canonicalBlock.deletions;
      additionCursor += canonicalBlock.additions;
    }
    const trailingContext = plan.deletionEnd - deletionCursor;
    if (trailingContext < 0) throw new Error("buildRegionHunks: block exceeds its old-side region");
    pushContext(hunkContent, trailingContext, additionCursor, deletionCursor);
    deletionCursor += trailingContext;
    additionCursor += trailingContext;
    hunks.push(createRegionHunk(diff, {
      additionStart,
      additionEnd: additionCursor,
      deletionStart: plan.deletionStart,
      deletionEnd: plan.deletionEnd
    }, hunkContent));
  }
  if (diff.deletionLines.length - deletionCursor !== diff.additionLines.length - additionCursor) throw new Error("buildRegionHunks: trailing context mismatch");
  return hunks;
}
function createRegionHunk(diff, bounds, hunkContent) {
  const additionCount = bounds.additionEnd - bounds.additionStart;
  const deletionCount = bounds.deletionEnd - bounds.deletionStart;
  let additionLines = 0;
  let deletionLines = 0;
  for (const content of hunkContent) if (content.type === "change") {
    additionLines += content.additions;
    deletionLines += content.deletions;
  }
  const hunk = {
    collapsedBefore: 0,
    additionStart: getUnifiedStart(bounds.additionStart, additionCount),
    additionCount,
    additionLines,
    additionLineIndex: getUnifiedLineIndex(bounds.additionStart, additionCount),
    deletionStart: getUnifiedStart(bounds.deletionStart, deletionCount),
    deletionCount,
    deletionLines,
    deletionLineIndex: getUnifiedLineIndex(bounds.deletionStart, deletionCount),
    hunkContent,
    hunkSpecs: `@@ -${getUnifiedStart(bounds.deletionStart, deletionCount)},${deletionCount} +${getUnifiedStart(bounds.additionStart, additionCount)},${additionCount} @@`,
    splitLineStart: 0,
    splitLineCount: 0,
    unifiedLineStart: 0,
    unifiedLineCount: 0,
    noEOFCRAdditions: false,
    noEOFCRDeletions: false
  };
  recomputeHunkRenderLineCounts(hunk);
  return hunk;
}
function pushContext(hunkContent, lines, additionLineIndex, deletionLineIndex) {
  if (lines > 0) hunkContent.push({
    type: "context",
    lines,
    additionLineIndex,
    deletionLineIndex
  });
}
function hasRegionOrSplitLayoutChanged(previous, next) {
  if (previous.length !== next.length) return true;
  for (let index = 0; index < previous.length; index++) {
    const previousHunk = previous[index];
    const nextHunk = next[index];
    if (getHunkDeletionStart(previousHunk) !== getHunkDeletionStart(nextHunk) || previousHunk.deletionCount !== nextHunk.deletionCount || getHunkAdditionStart(previousHunk) !== getHunkAdditionStart(nextHunk) || previousHunk.additionCount !== nextHunk.additionCount || previousHunk.splitLineCount !== nextHunk.splitLineCount || !haveSameSplitRowMapping(previousHunk, nextHunk)) return true;
  }
  return false;
}
function haveSameSplitRowMapping(previous, next) {
  const previousRows = iterateSplitRowMapping(previous);
  const nextRows = iterateSplitRowMapping(next);
  while (true) {
    const previousRow = previousRows.next();
    const nextRow = nextRows.next();
    if (previousRow.done === true || nextRow.done === true) return previousRow.done === nextRow.done;
    if (previousRow.value[0] !== nextRow.value[0] || previousRow.value[1] !== nextRow.value[1]) return false;
  }
}
function* iterateSplitRowMapping(hunk) {
  for (const content of hunk.hunkContent) {
    if (content.type === "context") {
      for (let offset = 0; offset < content.lines; offset++) yield [content.deletionLineIndex + offset, content.additionLineIndex + offset];
      continue;
    }
    const rowCount = Math.max(content.deletions, content.additions);
    for (let offset = 0; offset < rowCount; offset++) yield [offset < content.deletions ? content.deletionLineIndex + offset : void 0, offset < content.additions ? content.additionLineIndex + offset : void 0];
  }
}
function getHunkAdditionStart(hunk) {
  return getHunkSideStartBoundary(hunk.additionStart, hunk.additionCount);
}
function getHunkDeletionStart(hunk) {
  return getHunkSideStartBoundary(hunk.deletionStart, hunk.deletionCount);
}
function getUnifiedStart(lineIndex, count) {
  return count === 0 ? lineIndex : lineIndex + 1;
}
function getUnifiedLineIndex(lineIndex, count) {
  return count === 0 ? lineIndex - 1 : lineIndex;
}
function finalizeSessionHunks(diff) {
  recomputeDiffRenderLineCounts(diff);
  for (let index = 0; index < diff.hunks.length; index++) syncHunkNoEOFCRFromFullFile(diff, index);
}
function isStyleNode(element2) {
  if (typeof HTMLStyleElement !== "undefined" && element2 instanceof HTMLStyleElement) return true;
  const tagName = element2.tagName ?? element2.nodeName;
  return typeof tagName === "string" && tagName.toLowerCase() === "style";
}
const FILE_ANNOTATION_DOM_KEY = `-1,-1`;
function includesFileAnnotations(annotations) {
  return annotations?.some((annotation) => annotation.lineNumber === 0) ?? false;
}
function getFileAnnotations(annotations) {
  const fileAnnotations = annotations[0];
  return fileAnnotations != null && fileAnnotations.length > 0 ? fileAnnotations : void 0;
}
function shouldRenderFileAnnotations(renderRange) {
  return renderRange.startingLine === 0 && renderRange.totalLines > 0;
}
function areSelectionPointsEqual(a, b2) {
  return a.lineNumber === b2.lineNumber && a.side === b2.side;
}
function createGutterUtilityElement() {
  return createHastElement({
    tagName: "button",
    properties: {
      "data-utility-button": "",
      type: "button"
    },
    children: [createIconElement({
      name: "diffs-icon-plus",
      properties: { "data-icon": "" }
    })]
  });
}
var InteractionManager = class {
  mode;
  options;
  hoveredLine;
  hoveredToken;
  pre;
  gutterUtilityLine;
  gutterUtilityContainer;
  gutterUtilityButton;
  gutterUtilitySlot;
  interactiveLinesAttr = false;
  interactiveLineNumbersAttr = false;
  hasPointerListeners = false;
  hasDocumentPointerListeners = false;
  selectedRange = null;
  selectedRangeHighlightSide;
  selectedRangeLineNumberOnly = false;
  editorActiveLine = null;
  editorActiveLineSide;
  editorLineNumberOnly = false;
  proposedSelectedRange;
  renderedSelectedLinesState;
  renderedEditorActiveLineState;
  selectionAnchor;
  pointerSession = { mode: "idle" };
  constructor(mode, options) {
    this.mode = mode;
    this.options = options;
  }
  setOptions(options) {
    this.options = options;
  }
  cleanUp() {
    this.pre?.removeEventListener("click", this.handlePointerClick);
    this.pre?.removeEventListener("pointerdown", this.handlePointerDown);
    this.pre?.removeEventListener("pointermove", this.handlePointerMove);
    this.pre?.removeEventListener("pointerleave", this.handlePointerLeave);
    this.pre?.removeAttribute("data-interactive-lines");
    this.pre?.removeAttribute("data-interactive-line-numbers");
    this.pre = void 0;
    this.gutterUtilityContainer?.remove();
    this.gutterUtilityLine = void 0;
    this.gutterUtilityContainer = void 0;
    this.gutterUtilityButton = void 0;
    this.gutterUtilitySlot = void 0;
    this.clearHoveredLine();
    this.clearHoveredToken();
    this.detachDocumentPointerListeners();
    this.clearPointerSession();
    dequeueRender(this.renderSelection);
    this.interactiveLinesAttr = false;
    this.interactiveLineNumbersAttr = false;
    this.hasPointerListeners = false;
    this.setSelectionDirty();
  }
  setup(pre) {
    this.setSelectionDirty();
    const { usesCustomGutterUtility = false, enableGutterUtility = false } = this.options;
    if (this.pre !== pre) {
      this.cleanUp();
      this.pre = pre;
    }
    if (enableGutterUtility) this.ensureGutterUtilityNode(usesCustomGutterUtility);
    else if (this.gutterUtilityContainer != null) {
      this.gutterUtilityContainer.remove();
      this.gutterUtilityLine = void 0;
      this.gutterUtilityContainer = void 0;
      this.gutterUtilityButton = void 0;
      this.gutterUtilitySlot = void 0;
      if (this.pointerSession.mode === "gutterSelecting") {
        this.clearPointerSession();
        this.detachDocumentPointerListeners();
      }
    }
    this.syncPointerListeners(pre);
    this.updateInteractiveLineAttributes();
    this.renderSelection();
    this.placeUtility();
  }
  setSelectionDirty() {
    this.renderedSelectedLinesState = void 0;
    this.renderedEditorActiveLineState = void 0;
  }
  isSelectionDirty() {
    return this.renderedSelectedLinesState === void 0 || this.renderedEditorActiveLineState === void 0;
  }
  setSelection(range2, options) {
    const isRangeChange = !(range2 === this.selectedRange || areSelectionsEqual(range2 ?? void 0, this.selectedRange ?? void 0));
    const lineNumberOnly = options?.lineNumberOnly ?? false;
    const isStyleChange = options?.activeLineSide !== this.selectedRangeHighlightSide || lineNumberOnly !== this.selectedRangeLineNumberOnly;
    if (!this.isSelectionDirty() && !isRangeChange && !isStyleChange) return;
    this.proposedSelectedRange = void 0;
    this.selectedRange = range2;
    this.selectedRangeHighlightSide = options?.activeLineSide;
    this.selectedRangeLineNumberOnly = lineNumberOnly;
    this.renderSelection();
    this.placeUtility();
    if (isRangeChange && options?.notify !== false) this.notifySelectionCommitted(range2);
  }
  setEditorActiveLine(lineNumber, { lineNumberOnly = false, side } = {}) {
    const isLineChange = lineNumber !== this.editorActiveLine;
    const isStyleChange = side !== this.editorActiveLineSide || lineNumberOnly !== this.editorLineNumberOnly;
    if (!this.isSelectionDirty() && !isLineChange && !isStyleChange) return;
    this.editorActiveLine = lineNumber;
    this.editorActiveLineSide = side;
    this.editorLineNumberOnly = lineNumberOnly;
    this.renderSelection();
  }
  getSelection() {
    return this.selectedRange;
  }
  getHoveredLine = () => {
    const gutterUtilityLine = this.gutterUtilityLine ?? this.hoveredLine;
    if (gutterUtilityLine != null) {
      if (this.mode === "diff" && gutterUtilityLine.type === "diff-line") return {
        lineNumber: gutterUtilityLine.lineNumber,
        side: gutterUtilityLine.annotationSide
      };
      if (this.mode === "file" && gutterUtilityLine.type === "line") return { lineNumber: gutterUtilityLine.lineNumber };
    }
  };
  handlePointerClick = (event) => {
    const { onHunkExpand, onLineClick, onLineNumberClick, onTokenClick, onMergeConflictActionClick } = this.options;
    if (onHunkExpand == null && onLineClick == null && onLineNumberClick == null && onMergeConflictActionClick == null && onTokenClick == null) return;
    if (this.options.onGutterUtilityClick != null && isGutterUtilityPath(event.composedPath())) return;
    debugLogIfEnabled(this.options.__debugPointerEvents, "click", "FileDiff.DEBUG.handlePointerClick:", event);
    this.handlePointerEvent({
      eventType: "click",
      event
    });
  };
  handlePointerMove = (event) => {
    if (event.pointerType !== "mouse") return;
    const { lineHoverHighlight = "disabled", onLineEnter, onLineLeave, onTokenEnter, onTokenLeave, enableGutterUtility = false } = this.options;
    if (lineHoverHighlight === "disabled" && !enableGutterUtility && onLineEnter == null && onLineLeave == null && onTokenEnter == null && onTokenLeave == null) return;
    debugLogIfEnabled(this.options.__debugPointerEvents, "move", "FileDiff.DEBUG.handlePointerMove:", event);
    this.handlePointerEvent({
      eventType: "move",
      event
    });
  };
  handlePointerLeave = (event) => {
    const { __debugPointerEvents } = this.options;
    debugLogIfEnabled(__debugPointerEvents, "move", "FileDiff.DEBUG.handlePointerLeave: no event");
    if (this.hoveredLine == null && this.hoveredToken == null) {
      debugLogIfEnabled(__debugPointerEvents, "move", "FileDiff.DEBUG.handlePointerLeave: returned early, no hovered line or token");
      return;
    }
    if (this.hoveredToken != null) {
      this.options.onTokenLeave?.(this.hoveredToken, event);
      this.clearHoveredToken();
    }
    if (this.hoveredLine != null) {
      this.options.onLineLeave?.({
        ...this.hoveredLine,
        event
      });
      this.clearHoveredLine();
    }
    this.placeUtility();
  };
  handlePointerEvent({ eventType, event }) {
    const { __debugPointerEvents } = this.options;
    const composedPath = event.composedPath();
    debugLogIfEnabled(__debugPointerEvents, eventType, "FileDiff.DEBUG.handlePointerEvent:", {
      eventType,
      composedPath
    });
    const target = this.resolvePointerTarget(composedPath);
    debugLogIfEnabled(__debugPointerEvents, eventType, "FileDiff.DEBUG.handlePointerEvent: resolvePointerTarget result:", target);
    const { onLineClick, onLineNumberClick, onLineEnter, onLineLeave, onTokenClick, onTokenEnter, onTokenLeave, onHunkExpand, onMergeConflictActionClick } = this.options;
    switch (eventType) {
      case "move": {
        const sameLine = isHoverableLinePointerTarget(target) && this.hoveredLine?.lineElement === target.lineElement;
        if (!(isTokenPointerTarget(target) && this.hoveredToken?.tokenElement === target.tokenElement)) {
          if (this.hoveredToken != null) {
            onTokenLeave?.(this.hoveredToken, event);
            this.clearHoveredToken();
          }
          if (isTokenPointerTarget(target)) {
            this.setHoveredToken(this.toTokenEventBaseProps(target));
            onTokenEnter?.(this.hoveredToken, event);
          }
        }
        if (!sameLine) {
          if (this.hoveredLine != null) {
            onLineLeave?.({
              ...this.hoveredLine,
              event
            });
            this.clearHoveredLine();
          }
          if (isHoverableLinePointerTarget(target)) {
            this.setHoveredLine(this.toEventBaseProps(target));
            this.placeUtility();
            onLineEnter?.({
              ...this.hoveredLine,
              event
            });
          } else this.placeUtility();
        }
        break;
      }
      case "click": {
        if (target == null) break;
        if (isMergeConflictActionPointerTarget(target) && onMergeConflictActionClick != null) {
          onMergeConflictActionClick(target);
          break;
        }
        if (isExpandoPointerTarget(target) && onHunkExpand != null) {
          onHunkExpand(target.hunkIndex, target.all || event.shiftKey ? "both" : target.direction, target.all || event.shiftKey ? Number.POSITIVE_INFINITY : void 0);
          break;
        }
        if (!isHoverableLinePointerTarget(target)) break;
        if (isTokenPointerTarget(target) && onTokenClick != null) onTokenClick(this.toTokenEventBaseProps(target), event);
        const eventBase = this.toEventBaseProps(target);
        if (onLineNumberClick != null && target.numberColumn) onLineNumberClick({
          ...eventBase,
          event
        });
        else if (onLineClick != null) onLineClick({
          ...eventBase,
          event
        });
        break;
      }
    }
  }
  syncPointerListeners(pre) {
    const { __debugPointerEvents, lineHoverHighlight = "disabled", onLineClick, onLineNumberClick, onLineEnter, onLineLeave, onTokenClick, onTokenEnter, onTokenLeave, onHunkExpand, onMergeConflictActionClick, enableGutterUtility = false, enableLineSelection = false, onGutterUtilityClick } = this.options;
    const enableGutterSelection = onGutterUtilityClick != null;
    const shouldAttachPointerListeners = lineHoverHighlight !== "disabled" || onLineClick != null || onLineNumberClick != null || onLineEnter != null || onLineLeave != null || onTokenClick != null || onTokenEnter != null || onTokenLeave != null || onHunkExpand != null || onMergeConflictActionClick != null || enableGutterUtility || enableLineSelection || enableGutterSelection;
    if (shouldAttachPointerListeners && !this.hasPointerListeners) {
      pre.addEventListener("click", this.handlePointerClick);
      pre.addEventListener("pointerdown", this.handlePointerDown);
      pre.addEventListener("pointermove", this.handlePointerMove);
      pre.addEventListener("pointerleave", this.handlePointerLeave);
      this.hasPointerListeners = true;
      debugLogIfEnabled(__debugPointerEvents, "click", "FileDiff.DEBUG.attachEventListeners: Attaching click events for:", (() => {
        const reasons = [];
        if (__debugPointerEvents === "both" || __debugPointerEvents === "click") {
          if (onLineClick != null) reasons.push("onLineClick");
          if (onLineNumberClick != null) reasons.push("onLineNumberClick");
          if (onHunkExpand != null) reasons.push("expandable hunk separators");
          if (onMergeConflictActionClick != null) reasons.push("merge conflict actions");
        }
        return reasons;
      })());
      debugLogIfEnabled(__debugPointerEvents, "move", "FileDiff.DEBUG.attachEventListeners: Attaching pointer move event");
      debugLogIfEnabled(__debugPointerEvents, "move", "FileDiff.DEBUG.attachEventListeners: Attaching pointer leave event");
    } else if (!shouldAttachPointerListeners && this.hasPointerListeners) {
      pre.removeEventListener("click", this.handlePointerClick);
      pre.removeEventListener("pointerdown", this.handlePointerDown);
      pre.removeEventListener("pointermove", this.handlePointerMove);
      pre.removeEventListener("pointerleave", this.handlePointerLeave);
      this.hasPointerListeners = false;
    }
    const hasActiveLineSelectionSession = this.pointerSession.mode === "selecting" || this.pointerSession.mode === "pendingSingleLineUnselect";
    const hasActiveGutterSelectionSession = this.pointerSession.mode === "gutterSelecting";
    if (!enableLineSelection && hasActiveLineSelectionSession || !enableGutterSelection && hasActiveGutterSelectionSession) {
      this.clearPointerSession();
      this.detachDocumentPointerListeners();
      this.selectionAnchor = void 0;
      this.clearPendingSingleLineState();
    }
  }
  updateInteractiveLineAttributes() {
    if (this.pre == null) return;
    const { onLineClick, onLineNumberClick, enableLineSelection = false } = this.options;
    const shouldHaveInteractiveLines = onLineClick != null;
    const shouldHaveInteractiveLineNumbers = onLineNumberClick != null || enableLineSelection;
    if (shouldHaveInteractiveLines && !this.interactiveLinesAttr) {
      this.pre.setAttribute("data-interactive-lines", "");
      this.interactiveLinesAttr = true;
    } else if (!shouldHaveInteractiveLines && this.interactiveLinesAttr) {
      this.pre.removeAttribute("data-interactive-lines");
      this.interactiveLinesAttr = false;
    }
    if (shouldHaveInteractiveLineNumbers && !this.interactiveLineNumbersAttr) {
      this.pre.setAttribute("data-interactive-line-numbers", "");
      this.interactiveLineNumbersAttr = true;
    } else if (!shouldHaveInteractiveLineNumbers && this.interactiveLineNumbersAttr) {
      this.pre.removeAttribute("data-interactive-line-numbers");
      this.interactiveLineNumbersAttr = false;
    }
  }
  handlePointerDown = (event) => {
    if (event.pointerType === "mouse" && event.button !== 0 || this.pre == null || this.pointerSession.mode !== "idle") return;
    const path = event.composedPath();
    if (isGutterUtilityPath(path) && this.options.onGutterUtilityClick != null) this.startGutterSelectionFromPointerDown(event);
    else {
      if (event.pointerType !== "mouse") this.revealUtilityFromGutterPath(path);
      this.startLineSelectionFromPointerDown(event);
    }
  };
  startLineSelectionFromPointerDown(event) {
    const { enableLineSelection = false } = this.options;
    if (!enableLineSelection) return;
    const pointerInfo = this.resolveSelectionInfo(event, {
      source: "event-path",
      requireNumberColumn: true
    });
    if (pointerInfo == null) return;
    const { pre } = this;
    if (pre == null) return;
    const { lineNumber, eventSide, lineIndex } = pointerInfo;
    if (event.shiftKey && this.selectedRange != null) {
      const rowRange = this.getIndexesFromSelection(this.selectedRange, pre.getAttribute("data-diff-type") === "split");
      if (rowRange == null) return;
      const useStart = rowRange.start <= rowRange.end ? lineIndex >= rowRange.start : lineIndex <= rowRange.end;
      this.selectionAnchor = {
        lineNumber: useStart ? this.selectedRange.start : this.selectedRange.end,
        side: useStart ? this.selectedRange.side : this.selectedRange.endSide ?? this.selectedRange.side
      };
      this.updateSelection(lineNumber, eventSide, false);
      this.notifySelectionStart(this.getCurrentSelectionRange());
      this.pointerSession = {
        mode: "selecting",
        pointerId: event.pointerId
      };
      this.attachDocumentPointerListeners();
      return;
    }
    if (this.selectedRange?.start === lineNumber && this.selectedRange?.end === lineNumber) {
      const point = {
        lineNumber,
        side: eventSide
      };
      this.selectionAnchor = point;
      this.pointerSession = {
        mode: "pendingSingleLineUnselect",
        pointerId: event.pointerId,
        anchor: point,
        pending: point
      };
      this.attachDocumentPointerListeners();
      return;
    }
    if (this.options.controlledSelection === true) this.proposedSelectedRange = null;
    else this.selectedRange = null;
    this.placeUtility();
    this.selectionAnchor = {
      lineNumber,
      side: eventSide
    };
    this.updateSelection(lineNumber, eventSide, false);
    this.notifySelectionStart(this.getCurrentSelectionRange());
    this.pointerSession = {
      mode: "selecting",
      pointerId: event.pointerId
    };
    this.attachDocumentPointerListeners();
  }
  startGutterSelectionFromPointerDown(event) {
    const { onGutterUtilityClick } = this.options;
    if (onGutterUtilityClick == null) return;
    const selectedEndpoints = this.currentSelectionEnds();
    const point = selectedEndpoints?.bottom ?? this.resolveSelectionPoint(event, {
      source: "event-path",
      excludeUtility: false
    });
    const anchor = selectedEndpoints?.top ?? point;
    if (point == null || anchor == null) return;
    event.preventDefault();
    event.stopPropagation();
    this.pointerSession = {
      mode: "gutterSelecting",
      pointerId: event.pointerId,
      anchor,
      current: point
    };
    this.selectionAnchor = {
      lineNumber: anchor.lineNumber,
      side: anchor.side
    };
    this.updateSelection(point.lineNumber, point.side, false);
    this.notifySelectionStart(this.getCurrentSelectionRange());
    this.attachDocumentPointerListeners();
  }
  handleDocumentPointerMove = (event) => {
    switch (this.pointerSession.mode) {
      case "idle":
        return;
      case "gutterSelecting": {
        if (event.pointerId !== this.pointerSession.pointerId) return;
        event.preventDefault();
        const point = this.resolveSelectionPoint(event, { source: "coordinates-first" });
        if (point == null) return;
        this.pointerSession.current = point;
        this.updateSelection(point.lineNumber, point.side);
        return;
      }
      case "selecting": {
        if (event.pointerId !== this.pointerSession.pointerId) return;
        event.preventDefault();
        const pointerInfo = this.resolveSelectionInfo(event, {
          source: "coordinates-first",
          requireNumberColumn: false
        });
        if (pointerInfo == null || this.selectionAnchor == null) return;
        this.updateSelection(pointerInfo.lineNumber, pointerInfo.eventSide);
        return;
      }
      case "pendingSingleLineUnselect": {
        if (event.pointerId !== this.pointerSession.pointerId) return;
        event.preventDefault();
        const pointerInfo = this.resolveSelectionInfo(event, {
          source: "coordinates-first",
          requireNumberColumn: false
        });
        if (pointerInfo == null || this.selectionAnchor == null) return;
        const point = {
          lineNumber: pointerInfo.lineNumber,
          side: pointerInfo.eventSide
        };
        if (areSelectionPointsEqual(this.pointerSession.pending, point)) return;
        this.updateSelection(pointerInfo.lineNumber, pointerInfo.eventSide, false);
        this.notifySelectionStart(this.getCurrentSelectionRange());
        this.notifySelectionChangeDelta();
        this.pointerSession = {
          mode: "selecting",
          pointerId: event.pointerId
        };
        return;
      }
    }
  };
  handleDocumentPointerUp = (event) => {
    const { onGutterUtilityClick } = this.options;
    switch (this.pointerSession.mode) {
      case "idle":
        return;
      case "gutterSelecting": {
        const { pointerSession: session } = this;
        if (event.pointerId !== session.pointerId) return;
        event.preventDefault();
        const point = this.resolveSelectionPoint(event, { source: "coordinates-first" });
        if (point != null) {
          session.current = point;
          this.updateSelection(point.lineNumber, point.side);
        }
        const completedRange = this.buildSelectedLineRange(session.anchor, session.current);
        onGutterUtilityClick?.({ ...completedRange });
        this.selectionAnchor = void 0;
        this.notifySelectionEnd(completedRange);
        this.notifySelectionCommitted(completedRange);
        this.clearProposedSelection();
        this.clearPointerSession();
        this.detachDocumentPointerListeners();
        return;
      }
      case "pendingSingleLineUnselect":
        if (event.pointerId !== this.pointerSession.pointerId) return;
        event.preventDefault();
        this.updateSelection(null, void 0, false);
        this.selectionAnchor = void 0;
        this.clearPendingSingleLineState();
        this.detachDocumentPointerListeners();
        this.notifySelectionEnd(this.getCurrentSelectionRange());
        this.notifySelectionCommitted(this.getCurrentSelectionRange());
        this.clearProposedSelection();
        return;
      case "selecting":
        if (event.pointerId !== this.pointerSession.pointerId) return;
        event.preventDefault();
        this.selectionAnchor = void 0;
        this.detachDocumentPointerListeners();
        this.clearPointerSession();
        this.notifySelectionEnd(this.getCurrentSelectionRange());
        this.notifySelectionCommitted(this.getCurrentSelectionRange());
        this.clearProposedSelection();
    }
  };
  handleDocumentPointerCancel = (event) => {
    switch (this.pointerSession.mode) {
      case "idle":
        return;
      case "gutterSelecting":
      case "selecting":
      case "pendingSingleLineUnselect":
        if ("pointerId" in this.pointerSession) {
          if (event.pointerId !== this.pointerSession.pointerId) return;
        }
        this.selectionAnchor = void 0;
        this.clearProposedSelection();
        this.clearPendingSingleLineState();
        this.clearPointerSession();
        this.detachDocumentPointerListeners();
    }
  };
  clearHoveredLine() {
    if (this.hoveredLine == null) return;
    this.hoveredLine.lineElement.removeAttribute("data-hovered");
    this.hoveredLine.numberElement.removeAttribute("data-hovered");
    this.hoveredLine = void 0;
  }
  setHoveredLine(hoveredLine) {
    const { lineHoverHighlight = "disabled" } = this.options;
    if (this.hoveredLine != null) this.clearHoveredLine();
    this.hoveredLine = hoveredLine;
    if (lineHoverHighlight !== "disabled") {
      if (lineHoverHighlight === "both" || lineHoverHighlight === "line") this.hoveredLine.lineElement.setAttribute("data-hovered", "");
      if (lineHoverHighlight === "both" || lineHoverHighlight === "number") this.hoveredLine.numberElement.setAttribute("data-hovered", "");
    }
  }
  clearHoveredToken() {
    if (this.hoveredToken == null) return;
    this.hoveredToken = void 0;
  }
  setHoveredToken(hoveredToken) {
    if (this.hoveredToken != null) this.clearHoveredToken();
    this.hoveredToken = hoveredToken;
  }
  ensureGutterUtilityNode(useCustomGutterUtility) {
    if (this.gutterUtilityContainer == null) {
      this.gutterUtilityContainer = document.createElement("div");
      this.gutterUtilityContainer.setAttribute("data-gutter-utility-slot", "");
    }
    if (useCustomGutterUtility) {
      if (this.gutterUtilityButton != null) {
        this.gutterUtilityButton.remove();
        this.gutterUtilityButton = void 0;
      }
      if (this.gutterUtilitySlot == null) {
        this.gutterUtilitySlot = document.createElement("slot");
        this.gutterUtilitySlot.name = "gutter-utility-slot";
      }
      if (this.gutterUtilitySlot.parentNode !== this.gutterUtilityContainer) this.gutterUtilityContainer.replaceChildren(this.gutterUtilitySlot);
    } else {
      this.gutterUtilitySlot?.remove();
      this.gutterUtilitySlot = void 0;
      if (this.gutterUtilityButton == null) {
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = toHtml(createGutterUtilityElement());
        const utilityButton = tempDiv.firstElementChild;
        if (!(utilityButton instanceof HTMLButtonElement)) throw new Error("InteractionManager.ensureGutterUtilityNode: Node element should be a button");
        utilityButton.remove();
        this.gutterUtilityButton = utilityButton;
      }
      if (this.gutterUtilityButton.parentNode !== this.gutterUtilityContainer) this.gutterUtilityContainer.replaceChildren(this.gutterUtilityButton);
    }
  }
  revealUtilityFromGutterPath(path) {
    if (this.placeUtilityFromSelection()) return;
    const target = this.resolvePointerTarget(path);
    if (isLinePointerTarget(target) && target.numberColumn) this.showUtilityOnLine(this.toEventBaseProps(target));
  }
  placeUtility() {
    if (this.placeUtilityFromSelection()) return;
    if (this.hoveredLine != null) {
      this.showUtilityOnLine(this.hoveredLine);
      return;
    }
    this.hideUtility();
  }
  placeUtilityFromSelection() {
    const endpoints = this.currentSelectionEnds();
    if (endpoints == null) return false;
    const target = this.targetForSelectionPoint(endpoints.bottom);
    if (target == null) this.hideUtility();
    else this.showUtilityOnLine(this.toEventBaseProps(target));
    return true;
  }
  showUtilityOnLine(line) {
    if (this.gutterUtilityContainer == null) return;
    this.gutterUtilityLine = line;
    line.numberElement.appendChild(this.gutterUtilityContainer);
  }
  hideUtility() {
    this.gutterUtilityContainer?.remove();
    this.gutterUtilityLine = void 0;
  }
  currentSelectionEnds() {
    const range2 = this.getCurrentSelectionRange();
    return range2 == null ? void 0 : this.selectionEnds(range2);
  }
  selectionEnds(range2) {
    const start = {
      lineNumber: range2.start,
      side: range2.side
    };
    const end = {
      lineNumber: range2.end,
      side: range2.endSide ?? range2.side
    };
    const startIndex = this.selectionPointRowIndex(start);
    const endIndex = this.selectionPointRowIndex(end);
    if (startIndex == null || endIndex == null) return;
    return startIndex > endIndex ? {
      top: end,
      bottom: start
    } : {
      top: start,
      bottom: end
    };
  }
  selectionPointRowIndex(point) {
    const indexes = this.getLineIndex(point.lineNumber, point.side);
    if (indexes == null) return;
    return this.isSplitDiff() ? indexes[1] : indexes[0];
  }
  targetForSelectionPoint(point) {
    if (this.pre == null) return;
    const indexes = this.getLineIndex(point.lineNumber, point.side);
    if (indexes == null) return;
    const lineIndex = this.mode === "diff" ? `${indexes[0]},${indexes[1]}` : `${indexes[0]}`;
    const candidates = this.pre.querySelectorAll(`[data-column-number="${point.lineNumber}"][data-line-index="${lineIndex}"]`);
    for (const element2 of candidates) {
      if (!(element2 instanceof HTMLElement)) continue;
      const target = this.resolvePointerTarget(getElementPath(element2));
      if (!isLinePointerTarget(target)) continue;
      if (this.mode === "diff" && point.side != null && target.side !== point.side) continue;
      return target;
    }
  }
  attachDocumentPointerListeners() {
    if (this.hasDocumentPointerListeners) return;
    document.addEventListener("pointermove", this.handleDocumentPointerMove);
    document.addEventListener("pointerup", this.handleDocumentPointerUp);
    document.addEventListener("pointercancel", this.handleDocumentPointerCancel);
    this.hasDocumentPointerListeners = true;
  }
  detachDocumentPointerListeners() {
    if (!this.hasDocumentPointerListeners) return;
    document.removeEventListener("pointermove", this.handleDocumentPointerMove);
    document.removeEventListener("pointerup", this.handleDocumentPointerUp);
    document.removeEventListener("pointercancel", this.handleDocumentPointerCancel);
    this.hasDocumentPointerListeners = false;
  }
  clearPointerSession() {
    this.pointerSession = { mode: "idle" };
  }
  clearPendingSingleLineState() {
    if (this.pointerSession.mode === "pendingSingleLineUnselect") this.pointerSession = { mode: "idle" };
  }
  selectionInfoFromPath(path, requireNumberColumn) {
    const target = this.resolvePointerTarget(path);
    if (!isLinePointerTarget(target)) return;
    if (requireNumberColumn && !target.numberColumn) return;
    if (target.splitLineIndex == null) return;
    return {
      lineIndex: target.splitLineIndex,
      lineNumber: target.lineNumber,
      eventSide: this.mode === "diff" ? target.side : void 0
    };
  }
  resolveSelectionInfo(event, options) {
    const path = this.resolveSelectionPath(event, options);
    return path != null ? this.selectionInfoFromPath(path, options.requireNumberColumn) : void 0;
  }
  selectionPointFromPath(path) {
    const target = this.resolvePointerTarget(path);
    if (!isLinePointerTarget(target)) return;
    return {
      lineNumber: target.lineNumber,
      side: this.mode === "diff" ? target.side : void 0
    };
  }
  resolveSelectionPoint(event, options) {
    const path = this.resolveSelectionPath(event, options);
    return path != null ? this.selectionPointFromPath(path) : void 0;
  }
  resolveSelectionPath(event, options) {
    const excludeUtility = options.excludeUtility !== false;
    switch (options.source) {
      case "event-path":
        return this.pathFromEventPath(event.composedPath(), excludeUtility);
      case "coordinates-first": {
        const coordinatePath = this.pathFromCoordinates(event, excludeUtility);
        if (coordinatePath !== void 0) return coordinatePath ?? void 0;
        return this.pathFromEventPath(event.composedPath(), excludeUtility);
      }
    }
  }
  pathFromCoordinates(event, excludeUtility) {
    const coordinateTarget = this.hitTest(event);
    if (coordinateTarget === void 0) return;
    if (coordinateTarget === null) return null;
    return this.pathFromElement(coordinateTarget, excludeUtility) ?? null;
  }
  pathFromEventPath(path, excludeUtility) {
    if (excludeUtility && isGutterUtilityPath(path)) return;
    for (const element2 of path) if (element2 instanceof Element) return this.pathFromElement(element2, excludeUtility);
  }
  pathFromElement(element2, excludeUtility) {
    const path = getElementPath(element2);
    if (excludeUtility && isGutterUtilityPath(path)) return;
    const row = closestSelectableRow(element2);
    if (row != null) return getElementPath(row);
    return this.pathFromAnnotationSlot(element2);
  }
  pathFromAnnotationSlot(element2) {
    const point = selectionPointFromAnnotationSlotName(getAnnotationSlotName(element2));
    if (point == null) return;
    const target = this.targetForSelectionPoint(point);
    return target != null ? getElementPath(target.lineElement) : void 0;
  }
  hitTest(event) {
    if (!Number.isFinite(event.clientX) || !Number.isFinite(event.clientY)) return;
    const root2 = this.pre?.getRootNode();
    const elementFromPointRoot = hasElementFromPoint(root2) ? root2 : hasElementFromPoint(document) ? document : void 0;
    if (elementFromPointRoot == null) return;
    return elementFromPointRoot.elementFromPoint(event.clientX, event.clientY);
  }
  getLineIndex(lineNumber, side) {
    const { getLineIndex } = this.options;
    return getLineIndex != null ? getLineIndex(lineNumber, side) : [lineNumber - 1, lineNumber - 1];
  }
  getCurrentSelectionRange() {
    return this.proposedSelectedRange !== void 0 ? this.proposedSelectedRange : this.selectedRange;
  }
  clearProposedSelection() {
    this.proposedSelectedRange = void 0;
  }
  updateSelection(currentLine, side, emitChange = true) {
    const previousRange = this.getCurrentSelectionRange();
    let nextRange;
    if (currentLine == null) nextRange = null;
    else {
      const anchorSide = this.selectionAnchor?.side ?? side;
      const anchorLine = this.selectionAnchor?.lineNumber ?? currentLine;
      nextRange = this.buildSelectionRange(anchorLine, currentLine, anchorSide, side);
    }
    if (areSelectionsEqual(previousRange ?? void 0, nextRange ?? void 0)) return;
    this.selectedRangeHighlightSide = void 0;
    this.selectedRangeLineNumberOnly = false;
    if (this.options.controlledSelection === true) this.proposedSelectedRange = nextRange;
    else {
      this.selectedRange = nextRange;
      queueRender(this.renderSelection);
    }
    this.placeUtility();
    if (emitChange) this.notifySelectionChangeDelta();
  }
  getIndexesFromSelection(selectedRange, split) {
    if (this.pre == null) return;
    const startIndexes = this.getLineIndex(selectedRange.start, selectedRange.side);
    const finalIndexes = this.getLineIndex(selectedRange.end, selectedRange.endSide ?? selectedRange.side);
    return startIndexes != null && finalIndexes != null ? {
      start: split ? startIndexes[1] : startIndexes[0],
      end: split ? finalIndexes[1] : finalIndexes[0]
    } : void 0;
  }
  getSelectionRenderState() {
    return {
      selectedLines: {
        range: this.selectedRange,
        highlightSide: this.selectedRangeHighlightSide,
        lineNumberOnly: this.selectedRangeLineNumberOnly
      },
      editorActiveLine: {
        range: this.editorActiveLine == null ? null : {
          start: this.editorActiveLine,
          end: this.editorActiveLine,
          side: this.editorActiveLineSide
        },
        highlightSide: this.editorActiveLineSide,
        lineNumberOnly: this.editorLineNumberOnly
      }
    };
  }
  resolveLineRenderRange(state, split, source) {
    if (state.range == null) return;
    const rowRange = this.getIndexesFromSelection(state.range, split);
    if (rowRange == null) {
      console.error({
        rowRange,
        range: state.range
      });
      throw new Error(`InteractionManager.renderSelection: No valid ${source} rowRange`);
    }
    return rowRange;
  }
  getLineRenderColumns(selectedLines, selectedRowRange, editorActiveLine, editorRowRange) {
    if (this.pre == null || selectedRowRange == null && editorRowRange == null) return [];
    const { children: codeElements } = this.pre;
    if (codeElements.length > 2) {
      console.error(codeElements);
      throw new Error("InteractionManager.renderSelection: Somehow there are more than 2 code elements...");
    }
    const columns = [];
    for (const code of codeElements) {
      const side = code.hasAttribute("data-deletions") ? "deletions" : code.hasAttribute("data-additions") ? "additions" : void 0;
      const renderSelectedLines = selectedLines != null && selectedRowRange != null && (selectedLines.highlightSide == null || side == null || selectedLines.highlightSide === side);
      const renderEditorActiveLine = editorActiveLine != null && editorRowRange != null && (editorActiveLine.highlightSide == null || side == null || editorActiveLine.highlightSide === side);
      if (!renderSelectedLines && !renderEditorActiveLine) continue;
      const [gutter, content] = code.children;
      if (!(gutter instanceof HTMLElement) || !(content instanceof HTMLElement)) throw new Error("InteractionManager.renderSelection: missing gutter or content element");
      if (content.children.length !== gutter.children.length) throw new Error("InteractionManager.renderSelection: gutter and content children dont match, something is wrong");
      columns.push({
        content,
        gutter,
        renderEditorActiveLine,
        renderSelectedLines
      });
    }
    return columns;
  }
  renderSelection = () => {
    dequeueRender(this.renderSelection);
    const renderState = this.getSelectionRenderState();
    if (this.pre == null) return;
    const { editorActiveLine, selectedLines } = renderState;
    const selectedLinesChanged = !areLineRenderStatesEqual(this.renderedSelectedLinesState, selectedLines);
    const editorActiveLineChanged = !areLineRenderStatesEqual(this.renderedEditorActiveLineState, editorActiveLine);
    if (!selectedLinesChanged && !editorActiveLineChanged) return;
    if (selectedLinesChanged) this.renderedSelectedLinesState = void 0;
    if (editorActiveLineChanged) this.renderedEditorActiveLineState = void 0;
    const split = this.pre.getAttribute("data-diff-type") === "split";
    const selectedRowRange = !selectedLinesChanged ? void 0 : this.resolveLineRenderRange(selectedLines, split, "selected-lines");
    const editorRowRange = !editorActiveLineChanged ? void 0 : this.resolveLineRenderRange(editorActiveLine, split, "editor-active-line");
    const columns = this.getLineRenderColumns(selectedLinesChanged ? selectedLines : void 0, selectedRowRange, editorActiveLineChanged ? editorActiveLine : void 0, editorRowRange);
    const selectedLinesComplete = selectedLines.range == null || columns.some((column) => column.renderSelectedLines);
    const editorActiveLineComplete = editorActiveLine.range == null || columns.some((column) => column.renderEditorActiveLine);
    if (selectedLinesChanged) for (const element2 of this.pre.querySelectorAll("[data-selected-line]")) element2.removeAttribute("data-selected-line");
    if (editorActiveLineChanged) for (const element2 of this.pre.querySelectorAll("[data-editor-active-line]")) element2.removeAttribute("data-editor-active-line");
    const selectedFirst = selectedRowRange == null ? void 0 : Math.min(selectedRowRange.start, selectedRowRange.end);
    const selectedLast = selectedRowRange == null ? void 0 : Math.max(selectedRowRange.start, selectedRowRange.end);
    const selectedIsSingle = selectedFirst === selectedLast;
    const editorLineIndex = editorRowRange?.start;
    for (const column of columns) {
      const { content, gutter, renderEditorActiveLine, renderSelectedLines } = column;
      const finalLineIndex = Math.max(renderSelectedLines ? selectedLast ?? -Infinity : -Infinity, renderEditorActiveLine ? editorLineIndex ?? -Infinity : -Infinity);
      const len = content.children.length;
      for (let i2 = 0; i2 < len; i2++) {
        const contentElement = content.children[i2];
        const gutterElement = gutter.children[i2];
        if (!(contentElement instanceof HTMLElement) || !(gutterElement instanceof HTMLElement)) continue;
        const lineIndex = this.parseLineIndex(contentElement, split);
        if ((lineIndex ?? 0) > finalLineIndex) break;
        if (lineIndex == null) continue;
        if (renderSelectedLines && selectedFirst != null && selectedLast != null && lineIndex >= selectedFirst && lineIndex <= selectedLast) {
          let attributeValue = selectedIsSingle ? "single" : lineIndex === selectedFirst ? "first" : lineIndex === selectedLast ? "last" : "";
          gutterElement.setAttribute("data-selected-line", attributeValue);
          if (!selectedLines.lineNumberOnly) {
            contentElement.setAttribute("data-selected-line", attributeValue);
            if (gutterElement.nextSibling instanceof HTMLElement && contentElement.nextSibling instanceof HTMLElement && (contentElement.nextSibling.hasAttribute("data-line-annotation") || contentElement.nextSibling.hasAttribute("data-merge-conflict-actions"))) {
              if (selectedIsSingle) {
                attributeValue = "last";
                contentElement.setAttribute("data-selected-line", "first");
              } else if (lineIndex === selectedFirst) attributeValue = "";
              else if (lineIndex === selectedLast) contentElement.setAttribute("data-selected-line", "");
              contentElement.nextSibling.setAttribute("data-selected-line", attributeValue);
              gutterElement.nextSibling.setAttribute("data-selected-line", attributeValue);
            }
          }
        }
        if (renderEditorActiveLine && lineIndex === editorLineIndex) {
          gutterElement.setAttribute("data-editor-active-line", "");
          if (!editorActiveLine.lineNumberOnly) contentElement.setAttribute("data-editor-active-line", "");
        }
      }
    }
    if (selectedLinesChanged && selectedLinesComplete) this.renderedSelectedLinesState = selectedLines;
    if (editorActiveLineChanged && editorActiveLineComplete) this.renderedEditorActiveLineState = editorActiveLine;
  };
  notifySelectionCommitted(range2) {
    this.options.onLineSelected?.(range2);
  }
  notifySelectionChangeDelta() {
    this.options.onLineSelectionChange?.(this.getCurrentSelectionRange() ?? null);
  }
  notifySelectionStart(range2) {
    this.options.onLineSelectionStart?.(range2);
  }
  notifySelectionEnd(range2) {
    this.options.onLineSelectionEnd?.(range2);
  }
  toEventBaseProps(target) {
    if (this.mode === "file") return {
      type: "line",
      lineElement: target.lineElement,
      lineNumber: target.lineNumber,
      numberColumn: target.numberColumn,
      numberElement: target.numberElement
    };
    return {
      type: "diff-line",
      annotationSide: target.side,
      lineType: target.lineType,
      lineElement: target.lineElement,
      numberElement: target.numberElement,
      lineNumber: target.lineNumber,
      numberColumn: target.numberColumn
    };
  }
  toTokenEventBaseProps({ lineCharEnd, lineCharStart, lineNumber, side, tokenElement, tokenText }) {
    if (this.mode === "file") return {
      type: "token",
      lineCharEnd,
      lineCharStart,
      lineNumber,
      tokenElement,
      tokenText
    };
    return {
      type: "token",
      lineCharEnd,
      lineCharStart,
      lineNumber,
      side,
      tokenElement,
      tokenText
    };
  }
  buildSelectedLineRange(anchor, current) {
    return this.buildSelectionRange(anchor.lineNumber, current.lineNumber, anchor.side, current.side);
  }
  buildSelectionRange(start, end, side, endSide) {
    return {
      start,
      end,
      ...side != null ? { side } : {},
      ...side !== endSide && endSide != null ? { endSide } : {}
    };
  }
  resolvePointerTarget(path) {
    let numberColumn = false;
    let lineType;
    let codeElement;
    let lineElement;
    let lineIndexValue;
    let numberElement;
    let tokenElement;
    let tokenInfo;
    let expandInfo;
    let lineNumber;
    let mergeConflictActionTarget;
    for (const element2 of path) {
      if (!(element2 instanceof HTMLElement)) continue;
      if (mergeConflictActionTarget == null && element2.hasAttribute("data-merge-conflict-action")) {
        const resolutionValue = element2.getAttribute("data-merge-conflict-action") ?? void 0;
        const conflictIndexValue = element2.getAttribute("data-merge-conflict-conflict-index") ?? void 0;
        const conflictIndex = conflictIndexValue != null ? Number.parseInt(conflictIndexValue, 10) : NaN;
        if (isMergeConflictResolution(resolutionValue) && Number.isFinite(conflictIndex)) mergeConflictActionTarget = {
          kind: "merge-conflict-action",
          resolution: resolutionValue,
          conflictIndex
        };
      }
      if (tokenElement == null && element2.hasAttribute("data-char")) {
        tokenElement = element2;
        const startAttr = element2.getAttribute("data-char");
        if (startAttr != null) {
          const lineCharStart = Number.parseInt(startAttr, 10);
          if (!Number.isNaN(lineCharStart)) {
            const tokenText = element2.textContent ?? "";
            const lineCharEnd = lineCharStart + tokenText.length;
            if (tokenText.trim() !== "" || this.options.enableTokenInteractionsOnWhitespace === true) tokenInfo = {
              tokenElement,
              lineCharStart,
              lineCharEnd,
              tokenText
            };
            continue;
          }
        }
      }
      const columnNumber = numberElement == null ? element2.getAttribute("data-column-number") ?? void 0 : void 0;
      if (columnNumber != null) {
        numberElement = element2;
        lineNumber = Number.parseInt(columnNumber, 10);
        numberColumn = true;
        lineType = getLineTypeFromElement(element2);
        lineIndexValue = element2.getAttribute("data-line-index") ?? void 0;
        continue;
      }
      const lineAttr = lineElement == null ? element2.getAttribute("data-line") ?? void 0 : void 0;
      if (lineAttr != null) {
        lineElement = element2;
        lineNumber = Number.parseInt(lineAttr, 10);
        lineType = getLineTypeFromElement(element2);
        lineIndexValue = element2.getAttribute("data-line-index") ?? void 0;
        continue;
      }
      if (expandInfo == null && (element2.hasAttribute("data-expand-button") || element2.hasAttribute("data-unmodified-lines"))) {
        expandInfo = {
          hunkIndex: void 0,
          direction: (() => {
            if (element2.hasAttribute("data-expand-up")) return "up";
            if (element2.hasAttribute("data-expand-down")) return "down";
            return "both";
          })(),
          all: element2.hasAttribute("data-expand-all-button")
        };
        continue;
      }
      const expandIndexValue = expandInfo != null ? element2.getAttribute("data-expand-index") ?? void 0 : void 0;
      if (expandInfo != null && expandIndexValue != null) {
        const expandIndex = Number.parseInt(expandIndexValue, 10);
        if (!Number.isNaN(expandIndex)) expandInfo.hunkIndex = expandIndex;
        continue;
      }
      if (codeElement == null && element2.hasAttribute("data-code")) {
        codeElement = element2;
        break;
      }
    }
    if (mergeConflictActionTarget != null) return mergeConflictActionTarget;
    if (expandInfo?.hunkIndex != null) return {
      type: "line-info",
      hunkIndex: expandInfo.hunkIndex,
      direction: expandInfo.direction,
      all: expandInfo.all
    };
    lineElement ??= lineIndexValue != null ? queryHTMLElement(codeElement, `[data-line][data-line-index="${lineIndexValue}"]`) : void 0;
    numberElement ??= lineIndexValue != null ? queryHTMLElement(codeElement, `[data-column-number][data-line-index="${lineIndexValue}"]`) : void 0;
    if (codeElement == null || lineElement == null || numberElement == null || lineType == null || lineNumber == null || Number.isNaN(lineNumber)) return;
    const splitLineIndex = this.parseLineIndex(lineElement, this.isSplitDiff());
    if (tokenInfo != null) {
      if (this.mode === "file") return {
        kind: "token",
        lineType,
        lineElement,
        lineNumber,
        numberColumn,
        numberElement,
        side: void 0,
        splitLineIndex,
        ...tokenInfo
      };
      return {
        kind: "token",
        lineType,
        lineElement,
        lineNumber,
        numberColumn,
        numberElement,
        side: getAnnotationSide(lineType, codeElement),
        splitLineIndex,
        ...tokenInfo
      };
    }
    if (this.mode === "file") return {
      kind: "line",
      lineType,
      lineElement,
      lineNumber,
      numberColumn,
      numberElement,
      side: void 0,
      splitLineIndex
    };
    return {
      kind: "line",
      lineType,
      lineElement,
      lineNumber,
      numberColumn,
      numberElement,
      side: getAnnotationSide(lineType, codeElement),
      splitLineIndex
    };
  }
  isSplitDiff() {
    return this.pre?.getAttribute("data-diff-type") === "split";
  }
  parseLineIndex(element2, split) {
    const lineIndexes = (element2.getAttribute("data-line-index") ?? "").split(",").map((value) => Number.parseInt(value, 10)).filter((value) => !Number.isNaN(value));
    if (split && lineIndexes.length === 2) return lineIndexes[1];
    if (!split) return lineIndexes[0];
  }
};
function pluckInteractionOptions({ enableTokenInteractionsOnWhitespace, enableGutterUtility, lineHoverHighlight, onGutterUtilityClick, onLineClick, onLineEnter, onLineLeave, onLineNumberClick, onTokenClick, onTokenEnter, onTokenLeave, renderGutterUtility, __debugPointerEvents, enableLineSelection, controlledSelection, onLineSelected, onLineSelectionStart, onLineSelectionChange, onLineSelectionEnd }, onHunkExpand, getLineIndex, onMergeConflictActionClick) {
  return {
    enableTokenInteractionsOnWhitespace,
    enableGutterUtility: resolveEnableGutterUtilityOption({
      enableGutterUtility,
      renderGutterUtility,
      onGutterUtilityClick
    }),
    usesCustomGutterUtility: renderGutterUtility != null,
    lineHoverHighlight,
    onGutterUtilityClick,
    onHunkExpand,
    onMergeConflictActionClick,
    onLineClick,
    onLineEnter,
    onLineLeave,
    onLineNumberClick,
    onTokenClick,
    onTokenEnter,
    onTokenLeave,
    __debugPointerEvents,
    enableLineSelection,
    controlledSelection,
    onLineSelected,
    onLineSelectionStart,
    onLineSelectionChange,
    onLineSelectionEnd,
    getLineIndex
  };
}
function resolveEnableGutterUtilityOption({ enableGutterUtility, renderGutterUtility, onGutterUtilityClick }) {
  if (onGutterUtilityClick != null && renderGutterUtility != null) throw new Error("Cannot use both 'onGutterUtilityClick' and 'renderGutterUtility'. Use only one gutter utility API.");
  return enableGutterUtility ?? false;
}
function isLinePointerTarget(target) {
  return target != null && "kind" in target && target.kind === "line";
}
function isTokenPointerTarget(target) {
  return target != null && "kind" in target && target.kind === "token";
}
function isHoverableLinePointerTarget(target) {
  return isLinePointerTarget(target) || isTokenPointerTarget(target);
}
function isExpandoPointerTarget(target) {
  return "type" in target && target.type === "line-info";
}
function isMergeConflictActionPointerTarget(target) {
  return "kind" in target && target.kind === "merge-conflict-action";
}
function isMergeConflictResolution(value) {
  return value === "current" || value === "incoming" || value === "both";
}
function queryHTMLElement(parent, query) {
  const element2 = parent?.querySelector(query);
  return element2 instanceof HTMLElement ? element2 : void 0;
}
function getElementPath(element2) {
  const path = [];
  let current = element2;
  while (current != null) {
    path.push(current);
    current = current.parentNode;
  }
  return path;
}
function closestSelectableRow(element2) {
  const row = element2.closest("[data-line], [data-column-number]");
  if (row instanceof HTMLElement) return row;
  const annotationRow = element2.closest('[data-line-annotation], [data-gutter-buffer="annotation"]');
  if (!(annotationRow instanceof HTMLElement)) return;
  const previousRow = annotationRow.previousElementSibling;
  return previousRow instanceof HTMLElement && (previousRow.hasAttribute("data-line") || previousRow.hasAttribute("data-column-number")) ? previousRow : void 0;
}
function getAnnotationSlotName(element2) {
  const slottedElement = element2.closest('[slot^="annotation-"]');
  if (slottedElement instanceof HTMLElement) return slottedElement.getAttribute("slot") ?? void 0;
  if (element2 instanceof HTMLElement) {
    const slotName = element2.getAttribute("name") ?? void 0;
    return slotName != null && slotName.startsWith("annotation-") ? slotName : void 0;
  }
}
function selectionPointFromAnnotationSlotName(slotName) {
  if (slotName == null) return;
  const match = /^annotation-(?:(additions|deletions)-)?(\d+)$/.exec(slotName);
  if (match == null) return;
  const lineNumber = Number.parseInt(match[2], 10);
  if (!Number.isFinite(lineNumber) || lineNumber <= 0) return;
  return {
    lineNumber,
    side: match[1]
  };
}
function hasElementFromPoint(value) {
  return value != null && typeof value.elementFromPoint === "function";
}
function areSelectionRangesEqual(first, second) {
  return first === second || areSelectionsEqual(first ?? void 0, second ?? void 0);
}
function areLineRenderStatesEqual(first, second) {
  return first?.highlightSide === second.highlightSide && first?.lineNumberOnly === second.lineNumberOnly && areSelectionRangesEqual(first?.range ?? null, second.range);
}
function getAnnotationSide(lineType, codeElement) {
  switch (lineType) {
    case "change-deletion":
      return "deletions";
    case "change-addition":
      return "additions";
    default:
      return codeElement.hasAttribute("data-deletions") ? "deletions" : "additions";
  }
}
function getLineTypeFromElement(element2) {
  const lineType = element2.getAttribute("data-line-type");
  if (lineType == null) return;
  switch (lineType) {
    case "change-deletion":
    case "change-addition":
    case "context":
    case "context-expanded":
      return lineType;
    default:
      return;
  }
}
function debugLogIfEnabled(debugLogType = "none", logIfType, ...args) {
  switch (debugLogType) {
    case "none":
      return;
    case "both":
      break;
    case "click":
      if (logIfType !== "click") return;
      break;
    case "move":
      if (logIfType !== "move") return;
      break;
  }
  console.log(...args);
}
var ResizeManager = class ResizeManager2 {
  static resizeObserver;
  static managersByElement = /* @__PURE__ */ new Map();
  static getResizeObserver() {
    const resizeObserver = ResizeManager2.resizeObserver ?? new ResizeObserver(ResizeManager2.handleSharedResizeEntries);
    ResizeManager2.resizeObserver = resizeObserver;
    return resizeObserver;
  }
  static handleSharedResizeEntries(entries) {
    const entriesByManager = /* @__PURE__ */ new Map();
    for (const entry of entries) {
      const manager = ResizeManager2.managersByElement.get(entry.target);
      if (manager == null) continue;
      const managerEntries = entriesByManager.get(manager);
      if (managerEntries == null) entriesByManager.set(manager, [entry]);
      else managerEntries.push(entry);
    }
    for (const [manager, managerEntries] of entriesByManager) manager.handleResizeEntries(managerEntries);
  }
  observedNodes = /* @__PURE__ */ new Map();
  setup(pre, { disableAnnotations, columnVariables = "apply" }) {
    const annotationUpdates = /* @__PURE__ */ new Set();
    const applyColumnVariables = columnVariables === "apply";
    let columnCount = 0;
    const observedNodes = new Map(this.observedNodes);
    this.observedNodes.clear();
    for (const element2 of pre.children) {
      if (columnCount === 2) break;
      const codeElement = (() => {
        if (element2 instanceof HTMLElement && element2.tagName === "CODE") return element2;
      })();
      if (codeElement == null) continue;
      columnCount++;
      let item = observedNodes.get(codeElement);
      if (item != null && item.type !== "code") throw new Error("ResizeManager.setup: somehow a code node is being used for an annotation, should be impossible");
      let numberElement = codeElement.firstElementChild;
      if (!(numberElement instanceof HTMLElement)) numberElement = null;
      if (item != null) {
        this.observedNodes.set(codeElement, item);
        observedNodes.delete(codeElement);
        if (item.numberElement !== numberElement) {
          if (item.numberElement != null) {
            this.unobserve(item.numberElement);
            observedNodes.delete(item.numberElement);
          }
          if (numberElement != null) {
            this.observe(numberElement);
            observedNodes.delete(numberElement);
            this.observedNodes.set(numberElement, item);
          }
          item.numberElement = numberElement;
          item.numberWidth = 0;
        } else if (item.numberElement != null) {
          observedNodes.delete(item.numberElement);
          this.observedNodes.set(item.numberElement, item);
        } else item.numberWidth = 0;
        syncColumnVariableMode(item, applyColumnVariables);
      } else {
        item = {
          type: "code",
          codeElement,
          numberElement,
          codeWidth: "auto",
          numberWidth: 0,
          applyColumnVariables
        };
        this.observedNodes.set(codeElement, item);
        this.observe(codeElement);
        if (numberElement != null) {
          this.observedNodes.set(numberElement, item);
          this.observe(numberElement);
        }
      }
    }
    if (columnCount > 1 && !disableAnnotations) {
      const annotationElements = pre.querySelectorAll('[data-line-annotation*=","]');
      const elementMap = /* @__PURE__ */ new Map();
      for (const element2 of annotationElements) {
        if (!(element2 instanceof HTMLElement)) continue;
        const lineAnnotation = element2.getAttribute("data-line-annotation") ?? "";
        if (!/^-?\d+,-?\d+$/.test(lineAnnotation)) {
          console.error("DiffFileRenderer.setupResizeObserver: Invalid element or annotation", {
            lineAnnotation,
            element: element2
          });
          continue;
        }
        let pairs = elementMap.get(lineAnnotation);
        if (pairs == null) {
          pairs = [];
          elementMap.set(lineAnnotation, pairs);
        }
        pairs.push(element2);
      }
      for (const [key2, pair] of elementMap) {
        if (pair.length !== 2) {
          console.error("DiffFileRenderer.setupResizeObserver: Bad Pair", key2, pair);
          continue;
        }
        const [container1, container2] = pair;
        const child1 = container1.firstElementChild;
        const child2 = container2.firstElementChild;
        if (!(container1 instanceof HTMLElement) || !(container2 instanceof HTMLElement) || !(child1 instanceof HTMLElement) || !(child2 instanceof HTMLElement)) continue;
        let item = observedNodes.get(child1);
        if (item != null) {
          this.observedNodes.set(child1, item);
          this.observedNodes.set(child2, item);
          observedNodes.delete(child1);
          observedNodes.delete(child2);
          continue;
        }
        const child1Height = child1.getBoundingClientRect().height;
        const child2Height = child2.getBoundingClientRect().height;
        item = {
          type: "annotations",
          column1: {
            container: container1,
            child: child1,
            childHeight: child1Height
          },
          column2: {
            container: container2,
            child: child2,
            childHeight: child2Height
          },
          currentHeight: "auto"
        };
        annotationUpdates.add({
          child1,
          child2,
          item,
          newHeight: Math.max(child1Height, child2Height)
        });
      }
      for (const pendingUpdate of annotationUpdates) {
        this.applyNewHeight(pendingUpdate.item, pendingUpdate.newHeight);
        this.observedNodes.set(pendingUpdate.child1, pendingUpdate.item);
        this.observedNodes.set(pendingUpdate.child2, pendingUpdate.item);
        this.observe(pendingUpdate.child1);
        this.observe(pendingUpdate.child2);
      }
      annotationUpdates.clear();
    }
    for (const [element2, item] of observedNodes) {
      this.unobserve(element2);
      if (item.type === "code") cleanupStaleCodeItem(item);
      else cleanupStaleAnnotationItem(item);
    }
    observedNodes.clear();
  }
  cleanUp() {
    for (const element2 of this.observedNodes.keys()) this.unobserve(element2);
    this.observedNodes.clear();
  }
  observe(element2) {
    const { managersByElement } = ResizeManager2;
    const owner = managersByElement.get(element2);
    if (owner === this) return;
    else if (owner != null && owner !== this) throw new Error("ResizeManager.observe: element is already owned by another ResizeManager");
    managersByElement.set(element2, this);
    ResizeManager2.getResizeObserver().observe(element2);
  }
  unobserve(element2) {
    const { managersByElement, resizeObserver } = ResizeManager2;
    const owner = managersByElement.get(element2);
    if (owner == null) return;
    else if (owner !== this) throw new Error("ResizeManager.unobserve: element is owned by another ResizeManager");
    managersByElement.delete(element2);
    resizeObserver?.unobserve(element2);
    if (resizeObserver != null && managersByElement.size === 0) {
      resizeObserver.disconnect();
      ResizeManager2.resizeObserver = void 0;
    }
  }
  handleResizeEntries(entries) {
    const codeUpdates = /* @__PURE__ */ new Map();
    const annotationUpdates = /* @__PURE__ */ new Set();
    for (const entry of entries) {
      const { target, borderBoxSize, contentBoxSize } = entry;
      if (!(target instanceof HTMLElement)) {
        console.error("ResizeManager.handleResizeEntries: Invalid element for ResizeObserver", entry);
        continue;
      }
      const item = this.observedNodes.get(target);
      if (item == null) {
        console.error("ResizeManager.handleResizeEntries: Not a valid observed node", entry);
        continue;
      }
      if (item.type === "annotations") {
        const column = (() => {
          if (target === item.column1.child) return item.column1;
          if (target === item.column2.child) return item.column2;
        })();
        if (column == null) {
          console.error(`ResizeManager.handleResizeEntries: Couldn't find a column for`, {
            item,
            target
          });
          continue;
        }
        column.childHeight = borderBoxSize[0].blockSize;
        annotationUpdates.add(item);
      } else if (item.type === "code") {
        const update = codeUpdates.get(item) ?? {};
        const inlineSize = contentBoxSize[0].inlineSize;
        if (target === item.codeElement) update.codeInlineSize = inlineSize;
        else if (target === item.numberElement) update.numberInlineSize = inlineSize;
        codeUpdates.set(item, update);
      }
    }
    this.applyAnnotationUpdates(annotationUpdates);
    annotationUpdates.clear();
    this.applyColumnUpdates(codeUpdates);
    codeUpdates.clear();
  }
  applyAnnotationUpdates(annotationUpdates) {
    for (const item of annotationUpdates) this.applyNewHeight(item, Math.max(item.column1.childHeight, item.column2.childHeight));
  }
  applyColumnUpdates = (queuedUpdates) => {
    for (const [item, update] of queuedUpdates) {
      const nextCodeWidth = update.codeInlineSize != null ? resolveCodeWidth(update.codeInlineSize) : item.codeWidth;
      const nextNumberWidth = update.numberInlineSize != null ? resolveNumberWidth(update.numberInlineSize) : item.numberWidth;
      const codeWidthChanged = nextCodeWidth !== item.codeWidth;
      const numberWidthChanged = nextNumberWidth !== item.numberWidth;
      if (!codeWidthChanged && !numberWidthChanged) continue;
      item.codeWidth = nextCodeWidth;
      item.numberWidth = nextNumberWidth;
      if (item.applyColumnVariables) applyCodeColumnVariables(item, {
        codeWidthChanged,
        numberWidthChanged
      });
    }
  };
  applyNewHeight(item, newHeight) {
    if (newHeight !== item.currentHeight) {
      item.currentHeight = Math.max(newHeight, 0);
      item.column1.container.style.setProperty("--diffs-annotation-min-height", `${item.currentHeight}px`);
      item.column2.container.style.setProperty("--diffs-annotation-min-height", `${item.currentHeight}px`);
    }
  }
};
function resolveCodeWidth(inlineSize) {
  const width = Math.max(Math.floor(inlineSize), 0);
  return width === 0 ? "auto" : width;
}
function resolveNumberWidth(inlineSize) {
  return Math.max(Math.ceil(inlineSize), 0);
}
function syncColumnVariableMode(item, applyColumnVariables) {
  if (item.applyColumnVariables === applyColumnVariables) return;
  item.applyColumnVariables = applyColumnVariables;
  if (applyColumnVariables) applyCodeColumnVariables(item, {
    codeWidthChanged: true,
    numberWidthChanged: true
  });
  else removeCodeColumnVariables(item);
}
function applyCodeColumnVariables(item, { codeWidthChanged, numberWidthChanged }) {
  const { codeElement, codeWidth, numberWidth } = item;
  if (codeWidthChanged) codeElement.style.setProperty("--diffs-column-width", `${typeof codeWidth === "number" ? `${codeWidth}px` : "auto"}`);
  if (numberWidthChanged) codeElement.style.setProperty("--diffs-column-number-width", `${numberWidth === 0 ? "auto" : `${numberWidth}px`}`);
  if (codeWidthChanged || numberWidthChanged && codeWidth !== "auto") {
    const targetWidth = typeof codeWidth === "number" ? Math.max(codeWidth - numberWidth, 0) : 0;
    codeElement.style.setProperty("--diffs-column-content-width", `${targetWidth > 0 ? `${targetWidth}px` : "auto"}`);
  }
}
function removeCodeColumnVariables(item) {
  item.codeElement.style.removeProperty("--diffs-column-content-width");
  item.codeElement.style.removeProperty("--diffs-column-number-width");
  item.codeElement.style.removeProperty("--diffs-column-width");
}
function cleanupStaleCodeItem(item) {
  if (item.codeElement.isConnected) removeCodeColumnVariables(item);
}
function cleanupStaleAnnotationItem(item) {
  if (item.column1.container.isConnected) item.column1.container.style.removeProperty("--diffs-annotation-min-height");
  if (item.column2.container.isConnected) item.column2.container.style.removeProperty("--diffs-annotation-min-height");
}
function areRenderRangesEqual(renderRangeA, renderRangeB) {
  if (renderRangeA == null || renderRangeB == null) return renderRangeA === renderRangeB;
  return renderRangeA.startingLine === renderRangeB.startingLine && renderRangeA.totalLines === renderRangeB.totalLines && renderRangeA.bufferBefore === renderRangeB.bufferBefore && renderRangeA.bufferAfter === renderRangeB.bufferAfter;
}
function areLanguagesAttached(languages) {
  for (const language of Array.isArray(languages) ? languages : [languages]) {
    if (language === "text" || language === "ansi") continue;
    if (!AttachedLanguages.has(language)) return false;
  }
  return true;
}
function areThemesAttached(themes) {
  for (const theme of getThemes(themes)) if (!AttachedThemes.has(theme)) return false;
  return true;
}
function applyLineTextWithNewline(line, lineText) {
  if (line.endsWith("\r\n")) return lineText + "\r\n";
  if (line.endsWith("\r")) return lineText + "\r";
  if (line.endsWith("\n")) return lineText + "\n";
  return lineText;
}
function createAnnotationElement(span) {
  return createHastElement({
    tagName: "div",
    children: [createHastElement({
      tagName: "div",
      children: span.annotations?.map((slotId) => createHastElement({
        tagName: "slot",
        properties: { name: slotId }
      })),
      properties: { "data-annotation-content": "" }
    })],
    properties: { "data-line-annotation": `${span.hunkIndex},${span.lineIndex}` }
  });
}
function createContentColumn(children, rowCount) {
  return createHastElement({
    tagName: "div",
    children,
    properties: {
      "data-content": "",
      style: `grid-row: span ${rowCount}`
    }
  });
}
function getIconForType(type) {
  switch (type) {
    case "file":
      return "diffs-icon-file-code";
    case "change":
      return "diffs-icon-symbol-modified";
    case "new":
      return "diffs-icon-symbol-added";
    case "deleted":
      return "diffs-icon-symbol-deleted";
    case "rename-pure":
    case "rename-changed":
      return "diffs-icon-symbol-moved";
  }
}
function createFileHeaderElement({ fileOrDiff, mode, stickyHeader }) {
  const fileDiff = "type" in fileOrDiff ? fileOrDiff : void 0;
  const properties = {
    "data-diffs-header": mode,
    "data-change-type": fileDiff?.type,
    "data-sticky": stickyHeader ? "" : void 0
  };
  return createHastElement({
    tagName: "div",
    children: [mode === "custom" ? createHastElement({
      tagName: "slot",
      properties: { name: CUSTOM_HEADER_SLOT_ID }
    }) : createHeaderElement({
      name: fileOrDiff.name,
      prevName: "prevName" in fileOrDiff ? fileOrDiff.prevName : void 0,
      iconType: fileDiff?.type ?? "file"
    }), ...mode === "custom" ? [] : [createMetadataElement(fileDiff)]],
    properties
  });
}
function createHeaderElement({ name, prevName, iconType }) {
  const children = [createHastElement({
    tagName: "slot",
    properties: { name: HEADER_PREFIX_SLOT_ID }
  }), createIconElement({
    name: getIconForType(iconType),
    properties: { "data-change-icon": iconType }
  })];
  if (prevName != null) {
    children.push(createHastElement({
      tagName: "div",
      children: [createHastElement({
        tagName: "bdi",
        children: [createTextNodeElement(prevName)]
      })],
      properties: { "data-prev-name": "" }
    }));
    children.push(createIconElement({
      name: "diffs-icon-arrow-right-short",
      properties: { "data-rename-icon": "" }
    }));
  }
  children.push(createHastElement({
    tagName: "div",
    children: [createHastElement({
      tagName: "bdi",
      children: [createTextNodeElement(name)]
    })],
    properties: { "data-title": "" }
  }));
  children.push(createHastElement({
    tagName: "slot",
    properties: { name: HEADER_FILENAME_SUFFIX_SLOT_ID }
  }));
  return createHastElement({
    tagName: "div",
    children,
    properties: { "data-header-content": "" }
  });
}
function createMetadataElement(fileDiff) {
  const children = [];
  if (fileDiff != null) {
    let additions = 0;
    let deletions = 0;
    for (const hunk of fileDiff.hunks) {
      additions += hunk.additionLines;
      deletions += hunk.deletionLines;
    }
    if (deletions > 0 || additions === 0) children.push(createHastElement({
      tagName: "span",
      children: [createTextNodeElement(`-${deletions}`)],
      properties: { "data-deletions-count": "" }
    }));
    if (additions > 0 || deletions === 0) children.push(createHastElement({
      tagName: "span",
      children: [createTextNodeElement(`+${additions}`)],
      properties: { "data-additions-count": "" }
    }));
  }
  children.push(createHastElement({
    tagName: "slot",
    properties: { name: HEADER_METADATA_SLOT_ID }
  }));
  return createHastElement({
    tagName: "div",
    children,
    properties: { "data-metadata": "" }
  });
}
function createPreElement(options) {
  return createHastElement({
    tagName: "pre",
    properties: createPreWrapperProperties(options)
  });
}
function createPreWrapperProperties({ diffIndicators, disableBackground, disableLineNumbers, overflow, split, totalLines, type, customProperties }) {
  return {
    ...customProperties,
    "data-diff": type === "diff" ? "" : void 0,
    "data-file": type === "file" ? "" : void 0,
    "data-diff-type": type === "diff" ? split ? "split" : "single" : void 0,
    "data-overflow": overflow,
    "data-disable-line-numbers": disableLineNumbers ? "" : void 0,
    "data-background": !disableBackground ? "" : void 0,
    "data-indicators": diffIndicators === "bars" || diffIndicators === "classic" ? diffIndicators : void 0,
    style: `--diffs-min-number-column-width-default:${`${totalLines}`.length}ch;`
  };
}
function getHighlighterOptions(lang, { theme, preferredHighlighter = "shiki-js" }) {
  return {
    langs: [lang ?? "text"],
    themes: getThemes(theme),
    preferredHighlighter
  };
}
const SVGSpriteSheet = `<svg data-icon-sprite aria-hidden="true" width="0" height="0">
  <symbol id="diffs-icon-arrow-right-short" viewBox="0 0 16 16">
    <path d="M8.47 4.22a.75.75 0 0 0 0 1.06l1.97 1.97H3.75a.75.75 0 0 0 0 1.5h6.69l-1.97 1.97a.75.75 0 1 0 1.06 1.06l3.25-3.25a.75.75 0 0 0 0-1.06L9.53 4.22a.75.75 0 0 0-1.06 0"/>
  </symbol>
  <symbol id="diffs-icon-brand-github" viewBox="0 0 16 16">
    <path d="M8 0c4.42 0 8 3.58 8 8a8.01 8.01 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27s-1.36.09-2 .27c-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8"/>
  </symbol>
  <symbol id="diffs-icon-chevron" viewBox="0 0 16 16">
    <path d="M1.47 4.47a.75.75 0 0 1 1.06 0L8 9.94l5.47-5.47a.75.75 0 1 1 1.06 1.06l-6 6a.75.75 0 0 1-1.06 0l-6-6a.75.75 0 0 1 0-1.06"/>
  </symbol>
  <symbol id="diffs-icon-chevrons-narrow" viewBox="0 0 10 16">
    <path d="M4.47 2.22a.75.75 0 0 1 1.06 0l3.25 3.25a.75.75 0 0 1-1.06 1.06L5 3.81 2.28 6.53a.75.75 0 0 1-1.06-1.06zM1.22 9.47a.75.75 0 0 1 1.06 0L5 12.19l2.72-2.72a.75.75 0 0 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0l-3.25-3.25a.75.75 0 0 1 0-1.06"/>
  </symbol>
  <symbol id="diffs-icon-diff-split" viewBox="0 0 16 16">
    <path d="M14 0H8.5v16H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2m-1.5 6.5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0"/><path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h5.5V0zm.5 7.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1 0-1" opacity=".3"/>
  </symbol>
  <symbol id="diffs-icon-diff-unified" viewBox="0 0 16 16">
    <path fill-rule="evenodd" d="M16 14a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V8.5h16zm-8-4a.5.5 0 0 0-.5.5v1h-1a.5.5 0 0 0 0 1h1v1a.5.5 0 0 0 1 0v-1h1a.5.5 0 0 0 0-1h-1v-1A.5.5 0 0 0 8 10" clip-rule="evenodd"/><path fill-rule="evenodd" d="M14 0a2 2 0 0 1 2 2v5.5H0V2a2 2 0 0 1 2-2zM6.5 3.5a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1z" clip-rule="evenodd" opacity=".4"/>
  </symbol>
  <symbol id="diffs-icon-expand" viewBox="0 0 16 16">
    <path d="M3.47 5.47a.75.75 0 0 1 1.06 0L8 8.94l3.47-3.47a.75.75 0 1 1 1.06 1.06l-4 4a.75.75 0 0 1-1.06 0l-4-4a.75.75 0 0 1 0-1.06"/>
  </symbol>
  <symbol id="diffs-icon-expand-all" viewBox="0 0 16 16">
    <path d="M11.47 9.47a.75.75 0 1 1 1.06 1.06l-4 4a.75.75 0 0 1-1.06 0l-4-4a.75.75 0 1 1 1.06-1.06L8 12.94zM7.526 1.418a.75.75 0 0 1 1.004.052l4 4a.75.75 0 1 1-1.06 1.06L8 3.06 4.53 6.53a.75.75 0 1 1-1.06-1.06l4-4z"/>
  </symbol>
  <symbol id="diffs-icon-file-code" viewBox="0 0 16 16">
    <path d="M10.75 0c.199 0 .39.08.53.22l3.5 3.5c.14.14.22.331.22.53v9A2.75 2.75 0 0 1 12.25 16h-8.5A2.75 2.75 0 0 1 1 13.25V2.75A2.75 2.75 0 0 1 3.75 0zm-7 1.5c-.69 0-1.25.56-1.25 1.25v10.5c0 .69.56 1.25 1.25 1.25h8.5c.69 0 1.25-.56 1.25-1.25V5h-1.25A2.25 2.25 0 0 1 10 2.75V1.5z"/><path d="M7.248 6.19a.75.75 0 0 1 .063 1.058L5.753 9l1.558 1.752a.75.75 0 0 1-1.122.996l-2-2.25a.75.75 0 0 1 0-.996l2-2.25a.75.75 0 0 1 1.06-.063M8.69 7.248a.75.75 0 1 1 1.12-.996l2 2.25a.75.75 0 0 1 0 .996l-2 2.25a.75.75 0 1 1-1.12-.996L10.245 9z"/>
  </symbol>
  <symbol id="diffs-icon-plus" viewBox="0 0 16 16">
    <path d="M8 3a.75.75 0 0 1 .75.75v3.5h3.5a.75.75 0 0 1 0 1.5h-3.5v3.5a.75.75 0 0 1-1.5 0v-3.5h-3.5a.75.75 0 0 1 0-1.5h3.5v-3.5A.75.75 0 0 1 8 3"/>
  </symbol>
  <symbol id="diffs-icon-symbol-added" viewBox="0 0 16 16">
    <path d="M8 4a.75.75 0 0 1 .75.75v2.5h2.5a.75.75 0 0 1 0 1.5h-2.5v2.5a.75.75 0 0 1-1.5 0v-2.5h-2.5a.75.75 0 0 1 0-1.5h2.5v-2.5A.75.75 0 0 1 8 4"/><path d="M1.788 4.296c.196-.88.478-1.381.802-1.706s.826-.606 1.706-.802C5.194 1.588 6.387 1.5 8 1.5s2.806.088 3.704.288c.88.196 1.381.478 1.706.802s.607.826.802 1.706c.2.898.288 2.091.288 3.704s-.088 2.806-.288 3.704c-.195.88-.478 1.381-.802 1.706s-.826.607-1.706.802c-.898.2-2.091.288-3.704.288s-2.806-.088-3.704-.288c-.88-.195-1.381-.478-1.706-.802s-.606-.826-.802-1.706C1.588 10.806 1.5 9.613 1.5 8s.088-2.806.288-3.704M8 0C1.412 0 0 1.412 0 8s1.412 8 8 8 8-1.412 8-8-1.412-8-8-8"/>
  </symbol>
  <symbol id="diffs-icon-symbol-deleted" viewBox="0 0 16 16">
    <path d="M4 8a.75.75 0 0 1 .75-.75h6.5a.75.75 0 0 1 0 1.5h-6.5A.75.75 0 0 1 4 8"/><path d="M1.788 4.296c.196-.88.478-1.381.802-1.706s.826-.606 1.706-.802C5.194 1.588 6.387 1.5 8 1.5s2.806.088 3.704.288c.88.196 1.381.478 1.706.802s.607.826.802 1.706c.2.898.288 2.091.288 3.704s-.088 2.806-.288 3.704c-.195.88-.478 1.381-.802 1.706s-.826.607-1.706.802c-.898.2-2.091.288-3.704.288s-2.806-.088-3.704-.288c-.88-.195-1.381-.478-1.706-.802s-.606-.826-.802-1.706C1.588 10.806 1.5 9.613 1.5 8s.088-2.806.288-3.704M8 0C1.412 0 0 1.412 0 8s1.412 8 8 8 8-1.412 8-8-1.412-8-8-8"/>
  </symbol>
  <symbol id="diffs-icon-symbol-diffstat" viewBox="0 0 16 16">
    <path d="M1.788 4.296c.196-.88.478-1.381.802-1.706s.826-.606 1.706-.802C5.194 1.588 6.387 1.5 8 1.5s2.806.088 3.704.288c.88.196 1.381.478 1.706.802s.607.826.802 1.706c.2.898.288 2.091.288 3.704s-.088 2.806-.288 3.704c-.195.88-.478 1.381-.802 1.706s-.826.607-1.706.802c-.898.2-2.091.288-3.704.288s-2.806-.088-3.704-.288c-.88-.195-1.381-.478-1.706-.802s-.606-.826-.802-1.706C1.588 10.806 1.5 9.613 1.5 8s.088-2.806.288-3.704M8 0C1.412 0 0 1.412 0 8s1.412 8 8 8 8-1.412 8-8-1.412-8-8-8"/><path d="M8.75 4.296a.75.75 0 0 0-1.5 0V6.25h-2a.75.75 0 0 0 0 1.5h2v1.5h1.5v-1.5h2a.75.75 0 0 0 0-1.5h-2zM5.25 10a.75.75 0 0 0 0 1.5h5.5a.75.75 0 0 0 0-1.5z"/>
  </symbol>
  <symbol id="diffs-icon-symbol-ignored" viewBox="0 0 16 16">
    <path d="M1.5 8c0 1.613.088 2.806.288 3.704.196.88.478 1.381.802 1.706s.826.607 1.706.802c.898.2 2.091.288 3.704.288s2.806-.088 3.704-.288c.88-.195 1.381-.478 1.706-.802s.607-.826.802-1.706c.2-.898.288-2.091.288-3.704s-.088-2.806-.288-3.704c-.195-.88-.478-1.381-.802-1.706s-.826-.606-1.706-.802C10.806 1.588 9.613 1.5 8 1.5s-2.806.088-3.704.288c-.88.196-1.381.478-1.706.802s-.606.826-.802 1.706C1.588 5.194 1.5 6.387 1.5 8M0 8c0-6.588 1.412-8 8-8s8 1.412 8 8-1.412 8-8 8-8-1.412-8-8m11.53-2.47a.75.75 0 0 0-1.06-1.06l-6 6a.75.75 0 1 0 1.06 1.06z"/>
  </symbol>
  <symbol id="diffs-icon-symbol-modified" viewBox="0 0 16 16">
    <path d="M1.5 8c0 1.613.088 2.806.288 3.704.196.88.478 1.381.802 1.706s.826.607 1.706.802c.898.2 2.091.288 3.704.288s2.806-.088 3.704-.288c.88-.195 1.381-.478 1.706-.802s.607-.826.802-1.706c.2-.898.288-2.091.288-3.704s-.088-2.806-.288-3.704c-.195-.88-.478-1.381-.802-1.706s-.826-.606-1.706-.802C10.806 1.588 9.613 1.5 8 1.5s-2.806.088-3.704.288c-.88.196-1.381.478-1.706.802s-.606.826-.802 1.706C1.588 5.194 1.5 6.387 1.5 8M0 8c0-6.588 1.412-8 8-8s8 1.412 8 8-1.412 8-8 8-8-1.412-8-8m8 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
  </symbol>
  <symbol id="diffs-icon-symbol-moved" viewBox="0 0 16 16">
    <path d="M1.788 4.296c.196-.88.478-1.381.802-1.706s.826-.606 1.706-.802C5.194 1.588 6.387 1.5 8 1.5s2.806.088 3.704.288c.88.196 1.381.478 1.706.802s.607.826.802 1.706c.2.898.288 2.091.288 3.704s-.088 2.806-.288 3.704c-.195.88-.478 1.381-.802 1.706s-.826.607-1.706.802c-.898.2-2.091.288-3.704.288s-2.806-.088-3.704-.288c-.88-.195-1.381-.478-1.706-.802s-.606-.826-.802-1.706C1.588 10.806 1.5 9.613 1.5 8s.088-2.806.288-3.704M8 0C1.412 0 0 1.412 0 8s1.412 8 8 8 8-1.412 8-8-1.412-8-8-8"/><path d="M8.495 4.695a.75.75 0 0 0-.05 1.06L10.486 8l-2.041 2.246a.75.75 0 0 0 1.11 1.008l2.5-2.75a.75.75 0 0 0 0-1.008l-2.5-2.75a.75.75 0 0 0-1.06-.051m-4 0a.75.75 0 0 0-.05 1.06l2.044 2.248-1.796 1.995a.75.75 0 0 0 1.114 1.004l2.25-2.5a.75.75 0 0 0-.002-1.007l-2.5-2.75a.75.75 0 0 0-1.06-.05"/>
  </symbol>
  <symbol id="diffs-icon-symbol-ref" viewBox="0 0 16 16">
    <path d="M1.5 8c0 1.613.088 2.806.288 3.704.196.88.478 1.381.802 1.706.286.286.71.54 1.41.73V1.86c-.7.19-1.124.444-1.41.73-.324.325-.606.826-.802 1.706C1.588 5.194 1.5 6.387 1.5 8m4 6.397c.697.07 1.522.103 2.5.103 1.613 0 2.806-.088 3.704-.288.88-.195 1.381-.478 1.706-.802s.607-.826.802-1.706c.2-.898.288-2.091.288-3.704s-.088-2.806-.288-3.704c-.195-.88-.478-1.381-.802-1.706s-.826-.606-1.706-.802C10.806 1.588 9.613 1.5 8 1.5c-.978 0-1.803.033-2.5.103zM0 8c0-6.588 1.412-8 8-8s8 1.412 8 8-1.412 8-8 8-8-1.412-8-8m7-2a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1z"/>
  </symbol>
</svg>`;
function arePrePropertiesEqual(propsA, propsB) {
  if (propsA == null || propsB == null) return propsA === propsB;
  return areCustomPropertiesEqual(propsA.customProperties, propsB.customProperties) && propsA.type === propsB.type && propsA.diffIndicators === propsB.diffIndicators && propsA.disableBackground === propsB.disableBackground && propsA.disableLineNumbers === propsB.disableLineNumbers && propsA.overflow === propsB.overflow && propsA.split === propsB.split && propsA.totalLines === propsB.totalLines;
}
const EMPTY_CUSTOM_PROPERTIES = {};
function areCustomPropertiesEqual(customPropertiesA = EMPTY_CUSTOM_PROPERTIES, customPropertiesB = EMPTY_CUSTOM_PROPERTIES) {
  if (customPropertiesA === customPropertiesB) return true;
  const keysA = Object.keys(customPropertiesA);
  const keysB = Object.keys(customPropertiesB);
  if (keysA.length !== keysB.length) return false;
  for (const key2 of keysA) if (customPropertiesA[key2] !== customPropertiesB[key2]) return false;
  return true;
}
function createAnnotationWrapperNode(slot) {
  const wrapper = document.createElement("div");
  wrapper.dataset.annotationSlot = "";
  wrapper.slot = slot;
  wrapper.style.whiteSpace = "normal";
  return wrapper;
}
function createGutterUtilityContentNode() {
  const gutterUtilityContent = document.createElement("div");
  gutterUtilityContent.slot = "gutter-utility-slot";
  gutterUtilityContent.style.position = "absolute";
  gutterUtilityContent.style.top = "0";
  gutterUtilityContent.style.bottom = "0";
  gutterUtilityContent.style.textAlign = "center";
  gutterUtilityContent.style.whiteSpace = "normal";
  gutterUtilityContent.style.touchAction = "none";
  return gutterUtilityContent;
}
function createUnsafeCSSStyleNode() {
  const node = document.createElement("style");
  node.setAttribute(UNSAFE_CSS_ATTRIBUTE, "");
  return node;
}
let measuredScrollbarGutter;
function getMeasuredScrollbarGutter(shadowRoot) {
  if (measuredScrollbarGutter != null) return measuredScrollbarGutter;
  const host = shadowRoot.host;
  if (typeof HTMLElement !== "undefined" && host instanceof HTMLElement && !host.isConnected) return;
  const wrapper = document.createElement("div");
  wrapper.setAttribute("data-code", "");
  wrapper.setAttribute(DIFFS_SCROLLBAR_MEASURE_ATTRIBUTE, "true");
  const child = document.createElement("div");
  child.style.position = "relative";
  child.style.width = "200%";
  child.style.height = "200%";
  wrapper.appendChild(child);
  shadowRoot.appendChild(wrapper);
  measuredScrollbarGutter = Math.max(wrapper.offsetHeight - wrapper.clientHeight, 0);
  wrapper.remove();
  return measuredScrollbarGutter;
}
function createMeasuredScrollbarGutterDeclaration(scrollbarGutter) {
  return `${DIFFS_SCROLLBAR_GUTTER_MEASURED_PROPERTY}: ${scrollbarGutter == null ? "var(--diffs-scrollbar-gutter-fallback)" : `${scrollbarGutter}px`};`;
}
var style_default = '@layer base {\n  :host {\n    --diffs-font-fallback: "SF Mono", Monaco, Consolas, "Ubuntu Mono", "Liberation Mono",\n      "Courier New", monospace;\n    --diffs-header-font-fallback: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue",\n      "Noto Sans", "Liberation Sans", Arial, sans-serif;\n    --diffs-mixer: light-dark(#000, #fff);\n    --diffs-gap-fallback: 8px;\n    --diffs-scrollbar-gutter-fallback: 6px;\n    --diffs-scrollbar-gutter: var(--diffs-scrollbar-gutter-override, var(--diffs-scrollbar-gutter-measured, var(--diffs-scrollbar-gutter-fallback)));\n    --diffs-added-light: #0dbe4e;\n    --diffs-added-dark: #5ecc71;\n    --diffs-modified-light: #009fff;\n    --diffs-modified-dark: #69b1ff;\n    --diffs-deleted-light: #ff2e3f;\n    --diffs-deleted-dark: #ff6762;\n    --diffs-warning-light: #d5a910;\n    --diffs-warning-dark: #ffd452;\n    color-scheme: light dark;\n    font-family: var(--diffs-header-font-family, var(--diffs-header-font-fallback));\n    font-size: var(--diffs-font-size, 13px);\n    line-height: var(--diffs-line-height, 20px);\n    font-feature-settings: var(--diffs-font-features);\n    --diffs-bg: light-dark(var(--diffs-light-bg, #fff), var(--diffs-dark-bg, #000));\n    --diffs-bg-buffer: var(--diffs-bg-buffer-override, light-dark(color-mix(in lab, var(--diffs-bg) 92%, var(--diffs-mixer)), color-mix(in lab, var(--diffs-bg) 92%, var(--diffs-mixer))));\n    --diffs-bg-context: var(--diffs-bg-context-override, light-dark(color-mix(in lab, var(--diffs-bg) 98.5%, var(--diffs-mixer)), color-mix(in lab, var(--diffs-bg) 92.5%, var(--diffs-mixer))));\n    --diffs-bg-context-gutter: var(--diffs-bg-context-gutter-override, light-dark(color-mix(in lab, var(--diffs-bg-context) 90%, var(--diffs-bg)), color-mix(in lab, var(--diffs-bg-context) 45%, var(--diffs-bg))));\n    --diffs-bg-separator: var(--diffs-bg-separator-override, light-dark(color-mix(in lab, var(--diffs-bg) 96%, var(--diffs-mixer)), color-mix(in lab, var(--diffs-bg) 85%, var(--diffs-mixer))));\n    --diffs-fg: light-dark(var(--diffs-light, #000), var(--diffs-dark, #fff));\n    --diffs-fg-number: var(--diffs-fg-number-override, light-dark(color-mix(in lab, var(--diffs-fg) 65%, var(--diffs-bg)), color-mix(in lab, var(--diffs-fg) 65%, var(--diffs-bg))));\n    --diffs-fg-conflict-marker: var(--diffs-fg-conflict-marker-override, var(--diffs-fg-number));\n    --diffs-deletion-base: var(--diffs-deletion-color-override, light-dark(var(--diffs-light-deletion-color, var(--diffs-deletion-color, var(--diffs-deleted-light))), var(--diffs-dark-deletion-color, var(--diffs-deletion-color, var(--diffs-deleted-dark)))));\n    --diffs-addition-base: var(--diffs-addition-color-override, light-dark(var(--diffs-light-addition-color, var(--diffs-addition-color, var(--diffs-added-light))), var(--diffs-dark-addition-color, var(--diffs-addition-color, var(--diffs-added-dark)))));\n    --diffs-modified-base: var(--diffs-modified-color-override, light-dark(var(--diffs-light-modified-color, var(--diffs-modified-color, var(--diffs-modified-light))), var(--diffs-dark-modified-color, var(--diffs-modified-color, var(--diffs-modified-dark)))));\n    --diffs-bg-deletion: var(--diffs-bg-deletion-override, light-dark(color-mix(in lab, var(--diffs-bg) 88%, var(--diffs-deletion-base)), color-mix(in lab, var(--diffs-bg) 80%, var(--diffs-deletion-base))));\n    --diffs-bg-deletion-emphasis: var(--diffs-bg-deletion-emphasis-override, light-dark(rgb(from var(--diffs-deletion-base) r g b / .15), rgb(from var(--diffs-deletion-base) r g b / .2)));\n    --diffs-bg-addition: var(--diffs-bg-addition-override, light-dark(color-mix(in lab, var(--diffs-bg) 88%, var(--diffs-addition-base)), color-mix(in lab, var(--diffs-bg) 80%, var(--diffs-addition-base))));\n    --diffs-bg-addition-emphasis: var(--diffs-bg-addition-emphasis-override, light-dark(rgb(from var(--diffs-addition-base) r g b / .15), rgb(from var(--diffs-addition-base) r g b / .2)));\n    --diffs-selection-base: var(--diffs-modified-base);\n    --diffs-selection-number-fg: light-dark(color-mix(in lab, var(--diffs-selection-base) 65%, var(--diffs-mixer)), color-mix(in lab, var(--diffs-selection-base) 75%, var(--diffs-mixer)));\n    background-color: var(--diffs-bg);\n    color: var(--diffs-fg);\n    display: block;\n  }\n\n  pre, code, [data-error-wrapper] {\n    isolation: isolate;\n    font-family: var(--diffs-font-family, var(--diffs-font-fallback));\n    outline: none;\n    margin: 0;\n    padding: 0;\n    display: block;\n  }\n\n  pre, code {\n    background-color: var(--diffs-bg);\n  }\n\n  code {\n    contain: content;\n  }\n\n  input, button {\n    font-family: inherit;\n    font-size: inherit;\n    line-height: inherit;\n  }\n\n  *, :before, :after {\n    box-sizing: border-box;\n  }\n\n  [data-icon-sprite] {\n    display: none;\n  }\n\n  [data-diffs-header], [data-separator] {\n    font-family: var(--diffs-header-font-family, var(--diffs-header-font-fallback));\n  }\n\n  [data-diffs-header][data-sticky] {\n    z-index: 1;\n    background-color: var(--diffs-bg);\n    position: sticky;\n    top: 0;\n  }\n\n  [data-file-info] {\n    color: var(--fg);\n    background-color: color-mix(in lab, var(--bg) 98%, var(--fg));\n    border-block: 1px solid color-mix(in lab, var(--bg) 95%, var(--fg));\n    padding: 10px;\n    font-weight: 700;\n  }\n\n  [data-diff], [data-file] {\n    --diffs-grid-number-column-width: minmax(min-content, max-content);\n    --diffs-code-grid: var(--diffs-grid-number-column-width) 1fr;\n\n    &[data-dehydrated] {\n      --diffs-code-grid: var(--diffs-grid-number-column-width) minmax(0, 1fr);\n    }\n\n    &:hover [data-code]::-webkit-scrollbar-thumb {\n      background-color: var(--diffs-bg-context);\n    }\n  }\n\n  @supports (-webkit-touch-callout: none) {\n    :host {\n      --diffs-scrollbar-gutter-fallback: 0px;\n    }\n  }\n\n  [data-line] span {\n    color: light-dark(var(--diffs-token-light, var(--diffs-light)), var(--diffs-token-dark, var(--diffs-dark)));\n    background-color: light-dark(var(--diffs-token-light-bg, inherit), var(--diffs-token-dark-bg, inherit));\n    font-weight: light-dark(var(--diffs-token-light-font-weight, inherit), var(--diffs-token-dark-font-weight, inherit));\n    font-style: light-dark(var(--diffs-token-light-font-style, inherit), var(--diffs-token-dark-font-style, inherit));\n    text-decoration: light-dark(var(--diffs-token-light-text-decoration, inherit), var(--diffs-token-dark-text-decoration, inherit));\n  }\n\n  [data-line], [data-gutter-buffer], [data-column-number], [data-line-annotation], [data-no-newline], [data-merge-conflict], [data-merge-conflict-actions], [data-editor-overlay] {\n    --diffs-computed-decoration-bg: var(--diffs-bg);\n    --diffs-computed-diff-line-bg: var(--diffs-computed-decoration-bg);\n    --diffs-computed-selected-line-bg: var(--diffs-computed-diff-line-bg);\n    --diffs-computed-editor-active-line-bg: var(--diffs-computed-selected-line-bg);\n    --diffs-computed-hovered-line-bg: var(--diffs-computed-editor-active-line-bg);\n    --diffs-hover-mix-target: var(--diffs-bg-hover-override, var(--diffs-mixer));\n    --diffs-line-bg: var(--diffs-computed-hovered-line-bg);\n    color: var(--diffs-fg);\n    background-color: var(--diffs-line-bg, var(--diffs-bg));\n  }\n\n  [data-line], [data-no-newline] {\n    &[data-decoration-bg] {\n      --mix-deco-light: 92%;\n      --mix-deco-dark: 85%;\n\n      &[data-decoration-bg-depth="2"] {\n        --mix-deco-light: 88%;\n        --mix-deco-dark: 80%;\n      }\n\n      &[data-decoration-bg-depth="3"] {\n        --mix-deco-light: 85%;\n        --mix-deco-dark: 78%;\n      }\n\n      --diffs-hover-mix-target: var(--diffs-decoration-bg);\n      --diffs-computed-decoration-bg: light-dark(color-mix(in lab,\n          var(--diffs-bg) var(--mix-deco-light),\n          var(--diffs-decoration-bg)), color-mix(in lab,\n          var(--diffs-bg) var(--mix-deco-dark),\n          var(--diffs-decoration-bg)));\n    }\n  }\n\n  [data-line-annotation], [data-gutter-buffer="annotation"] {\n    --diffs-annotation-bg: var(--diffs-bg-context);\n    --diffs-computed-decoration-bg: var(--diffs-annotation-bg);\n    --diffs-hover-mix-target: var(--diffs-computed-editor-active-line-bg);\n  }\n\n  [data-merge-conflict-actions], [data-gutter-buffer="merge-conflict-action"], [data-gutter-buffer="merge-conflict-marker-base"], [data-gutter-buffer="merge-conflict-marker-separator"], [data-merge-conflict="marker-base"], [data-merge-conflict="marker-separator"] {\n    --diffs-computed-decoration-bg: var(--diffs-bg-context);\n    --diffs-hover-mix-target: var(--diffs-computed-editor-active-line-bg);\n  }\n\n  [data-gutter-buffer="merge-conflict-marker-start"], [data-merge-conflict="marker-start"] {\n    --diffs-computed-decoration-bg: light-dark(color-mix(in lab,\n        var(--diffs-bg) 78%,\n        var(--conflict-bg-current-header-override, var(--diffs-addition-base))), color-mix(in lab,\n        var(--diffs-bg) 68%,\n        var(--conflict-bg-current-header-override, var(--diffs-addition-base))));\n    --diffs-hover-mix-target: var(--diffs-computed-editor-active-line-bg);\n  }\n\n  [data-gutter-buffer="merge-conflict-marker-end"], [data-merge-conflict="marker-end"] {\n    --diffs-computed-decoration-bg: light-dark(color-mix(in lab,\n        var(--diffs-bg) 78%,\n        var(--conflict-bg-incoming-header-override, var(--diffs-modified-base))), color-mix(in lab,\n        var(--diffs-bg) 68%,\n        var(--conflict-bg-incoming-header-override, var(--diffs-modified-base))));\n    --diffs-hover-mix-target: var(--diffs-computed-editor-active-line-bg);\n  }\n\n  [data-has-merge-conflict] [data-line-annotation], [data-has-merge-conflict] [data-gutter-buffer="annotation"] {\n    --diffs-computed-decoration-bg: var(--diffs-bg);\n    --diffs-hover-mix-target: var(--diffs-computed-editor-active-line-bg);\n  }\n\n  :where([data-background]) {\n    & [data-gutter-buffer], & [data-column-number] {\n      --mix-light: 91%;\n      --mix-dark: 85%;\n    }\n\n    & [data-line], & [data-no-newline] {\n      --mix-light: 88%;\n      --mix-dark: 80%;\n    }\n\n    & [data-gutter-buffer], & [data-column-number], & [data-line], & [data-no-newline] {\n      --diffs-diff-line-mix-target: var(--diffs-bg);\n\n      &[data-line-type="change-deletion"] {\n        --diffs-diff-line-mix-target: var(--diffs-bg-deletion-override, var(--diffs-deletion-base));\n        --diffs-hover-mix-target: var(--diffs-diff-line-mix-target);\n\n        &:where([data-gutter-buffer], [data-column-number]) {\n          color: var(--diffs-fg-number-deletion-override, var(--diffs-deletion-base));\n          --diffs-diff-line-mix-target: var(--diffs-bg-deletion-number-override, var(--diffs-deletion-base));\n        }\n\n        --diffs-computed-diff-line-bg: light-dark(color-mix(in lab,\n            var(--diffs-computed-decoration-bg) var(--mix-light),\n            var(--diffs-diff-line-mix-target)), color-mix(in lab,\n            var(--diffs-computed-decoration-bg) var(--mix-dark),\n            var(--diffs-diff-line-mix-target)));\n      }\n\n      &[data-line-type="change-addition"] {\n        --diffs-diff-line-mix-target: var(--diffs-bg-addition-override, var(--diffs-addition-base));\n        --diffs-hover-mix-target: var(--diffs-diff-line-mix-target);\n\n        &:where([data-gutter-buffer], [data-column-number]) {\n          color: var(--diffs-fg-number-addition-override, var(--diffs-addition-base));\n          --diffs-diff-line-mix-target: var(--diffs-bg-addition-number-override, var(--diffs-addition-base));\n        }\n\n        --diffs-computed-diff-line-bg: light-dark(color-mix(in lab,\n            var(--diffs-computed-decoration-bg) var(--mix-light),\n            var(--diffs-diff-line-mix-target)), color-mix(in lab,\n            var(--diffs-computed-decoration-bg) var(--mix-dark),\n            var(--diffs-diff-line-mix-target)));\n      }\n\n      &[data-merge-conflict="current"] {\n        --diffs-diff-line-mix-target: var(--conflict-bg-current-override, var(--diffs-addition-base));\n        --diffs-hover-mix-target: var(--diffs-diff-line-mix-target);\n\n        &:where([data-gutter-buffer], [data-column-number]) {\n          color: var(--diffs-fg-number-addition-override, var(--diffs-addition-base));\n          --diffs-diff-line-mix-target: var(--conflict-bg-current-number-override, var(--diffs-addition-base));\n        }\n\n        --diffs-computed-diff-line-bg: light-dark(color-mix(in lab,\n            var(--diffs-computed-decoration-bg) var(--mix-light),\n            var(--diffs-diff-line-mix-target)), color-mix(in lab,\n            var(--diffs-computed-decoration-bg) var(--mix-dark),\n            var(--diffs-diff-line-mix-target)));\n      }\n\n      &[data-merge-conflict="incoming"] {\n        --diffs-diff-line-mix-target: var(--conflict-bg-incoming-override, var(--diffs-modified-base));\n        --diffs-hover-mix-target: var(--diffs-diff-line-mix-target);\n\n        &:where([data-gutter-buffer], [data-column-number]) {\n          color: var(--diffs-modified-base);\n          --diffs-diff-line-mix-target: var(--conflict-bg-incoming-number-override, var(--diffs-modified-base));\n        }\n\n        --diffs-computed-diff-line-bg: light-dark(color-mix(in lab,\n            var(--diffs-computed-decoration-bg) var(--mix-light),\n            var(--diffs-diff-line-mix-target)), color-mix(in lab,\n            var(--diffs-computed-decoration-bg) var(--mix-dark),\n            var(--diffs-diff-line-mix-target)));\n      }\n    }\n  }\n\n  [data-gutter-buffer], [data-column-number], [data-line], [data-line-annotation], [data-merge-conflict], [data-merge-conflict-actions], [data-no-newline], [data-editor-overlay] {\n    --diffs-selection-mix-target: var(--diffs-bg-selection-override, var(--diffs-selection-base));\n    --diffs-selection-emphasis-mix-target: var(--diffs-selection-mix-target);\n\n    &:where([data-editor-overlay]), &:where([data-line], [data-line-annotation], [data-merge-conflict], [data-merge-conflict-actions], [data-no-newline])[data-selected-line] {\n      --mix-selection-light: 82%;\n      --mix-selection-dark: 75%;\n      --diffs-hover-mix-target: var(--diffs-selection-mix-target);\n    }\n\n    &:where([data-gutter-buffer][data-selected-line], [data-column-number]:is([data-selected-line], [data-editor-active-line])) {\n      --mix-selection-light: 75%;\n      --mix-selection-dark: 60%;\n      --diffs-selection-mix-target: var(--diffs-bg-selection-number-override, var(--diffs-selection-base));\n      --diffs-hover-mix-target: var(--diffs-selection-mix-target);\n    }\n\n    &:where([data-line][data-selected-line]):is([data-line-type="change-addition"], [data-line-type="change-deletion"]) {\n      --diffs-selection-emphasis-mix-target: light-dark(color-mix(in lab,\n          var(--diffs-diff-line-mix-target, var(--diffs-selection-mix-target))\n            var(--mix-selection-light),\n          var(--diffs-selection-mix-target)), var(--diffs-selection-mix-target));\n    }\n\n    &:where([data-editor-overlay]), &[data-selected-line] {\n      --diffs-computed-selected-line-bg: light-dark(color-mix(in lab,\n          var(--diffs-computed-diff-line-bg) var(--mix-selection-light),\n          var(--diffs-selection-mix-target)), color-mix(in lab,\n          var(--diffs-computed-diff-line-bg) var(--mix-selection-dark),\n          var(--diffs-selection-mix-target)));\n    }\n  }\n\n  [data-line][data-editor-active-line], [data-column-number][data-editor-active-line] {\n    --diffs-computed-editor-active-line-bg: color-mix(in lab,\n      var(--diffs-computed-selected-line-bg)\n        var(--diffs-editor-active-line-source-mix, 100%),\n      var(--diffs-selection-emphasis-mix-target));\n  }\n\n  @media (pointer: fine) {\n    [data-line][data-hovered], [data-gutter-buffer][data-hovered], [data-column-number][data-hovered], [data-line-annotation][data-hovered], [data-no-newline][data-hovered], [data-merge-conflict][data-hovered], [data-merge-conflict-actions][data-hovered], [data-editor-overlay][data-hovered] {\n      --diffs-computed-hovered-line-bg: light-dark(color-mix(in lab,\n          var(--diffs-computed-editor-active-line-bg) 97%,\n          var(--diffs-hover-mix-target)), color-mix(in lab,\n          var(--diffs-computed-editor-active-line-bg) 91%,\n          var(--diffs-hover-mix-target)));\n    }\n  }\n\n  [data-gutter-buffer][data-selected-line], [data-column-number]:is([data-selected-line], [data-editor-active-line]) {\n    color: var(--diffs-selection-number-fg);\n  }\n\n  [data-no-newline] {\n    user-select: none;\n\n    & span {\n      opacity: .6;\n    }\n  }\n\n  [data-diff-type="split"][data-overflow="scroll"] {\n    grid-template-columns: 1fr 1fr;\n    display: grid;\n\n    & [data-additions] {\n      border-left: 1px solid var(--diffs-bg);\n    }\n\n    & [data-deletions] {\n      border-right: 1px solid var(--diffs-bg);\n    }\n  }\n\n  [data-code] {\n    grid-auto-flow: dense;\n    grid-template-columns: var(--diffs-code-grid);\n    overflow: var(--diffs-overflow-override, scroll) clip;\n    overscroll-behavior-x: none;\n    tab-size: var(--diffs-tab-size, 2);\n    padding-top: var(--diffs-gap-block, var(--diffs-gap-fallback));\n    padding-bottom: max(0px,\n      calc(var(--diffs-gap-block, var(--diffs-gap-fallback)) -\n          var(--diffs-scrollbar-gutter)));\n    scrollbar-gutter: stable;\n    align-self: flex-start;\n    display: grid;\n  }\n\n  [data-diffs-scrollbar-measure] {\n    opacity: 0;\n    pointer-events: none;\n    scrollbar-gutter: auto;\n    grid-template-columns: none;\n    width: 100px;\n    height: 100px;\n    padding: 0;\n    position: absolute;\n    top: -200px;\n    left: -200px;\n  }\n\n  [data-container-size] {\n    container-type: inline-size;\n  }\n\n  [data-code]::-webkit-scrollbar {\n    width: 0;\n    height: var(--diffs-scrollbar-gutter);\n  }\n\n  [data-code]::-webkit-scrollbar-track {\n    background: none;\n  }\n\n  [data-code]::-webkit-scrollbar-thumb {\n    background-color: #0000;\n    background-clip: content-box;\n    border: 1px solid #0000;\n    border-radius: 3px;\n  }\n\n  [data-code]::-webkit-scrollbar-corner {\n    background-color: #0000;\n  }\n\n  @supports ((-moz-appearance: none)) {\n    [data-code] {\n      scrollbar-width: thin;\n      scrollbar-color: var(--diffs-bg-context) transparent;\n      padding-bottom: var(--diffs-gap-block, var(--diffs-gap-fallback));\n    }\n  }\n\n  [data-diffs-header] ~ [data-diff], [data-diffs-header] ~ [data-file] {\n    & [data-code], &[data-overflow="wrap"], &[data-dehydrated][data-diff-type="split"][data-overflow="scroll"] {\n      padding-top: 0;\n    }\n  }\n\n  [data-gutter] {\n    grid-template-rows: subgrid;\n    grid-template-columns: subgrid;\n    z-index: 3;\n    background-color: var(--diffs-bg);\n    grid-column: 1;\n    display: grid;\n    position: relative;\n\n    & [data-gutter-buffer], & [data-column-number] {\n      border-right: var(--diffs-gap-style, 2px solid var(--diffs-bg));\n    }\n  }\n\n  [data-content] {\n    grid-template-rows: subgrid;\n    grid-template-columns: subgrid;\n    background-color: var(--diffs-bg);\n    grid-column: 2;\n    min-width: 0;\n    display: grid;\n  }\n\n  [data-diff-type="split"][data-overflow="wrap"], [data-dehydrated][data-diff-type="split"][data-overflow="scroll"] {\n    grid-auto-flow: dense;\n    grid-template-columns: repeat(2, var(--diffs-code-grid));\n    padding-block: var(--diffs-gap-block, var(--diffs-gap-fallback));\n    display: grid;\n\n    & [data-code] {\n      display: contents;\n    }\n\n    & [data-deletions] {\n      & [data-gutter] {\n        grid-column: 1;\n      }\n\n      & [data-content] {\n        border-right: 1px solid var(--diffs-bg);\n        grid-column: 2;\n      }\n    }\n\n    & [data-additions] {\n      & [data-gutter] {\n        border-left: 1px solid var(--diffs-bg);\n        grid-column: 3;\n      }\n\n      & [data-content] {\n        grid-column: 4;\n      }\n    }\n  }\n\n  [data-dehydrated][data-diff-type="split"][data-overflow="scroll"] [data-content] {\n    overflow: clip;\n  }\n\n  [data-overflow="scroll"] [data-gutter] {\n    position: sticky;\n    left: 0;\n  }\n\n  [data-interactive-lines] [data-line] {\n    cursor: pointer;\n  }\n\n  [data-interactive-line-numbers] [data-column-number] {\n    cursor: pointer;\n    touch-action: none;\n  }\n\n  [data-content-buffer], [data-gutter-buffer] {\n    user-select: none;\n    min-height: 1lh;\n    position: relative;\n  }\n\n  [data-gutter-buffer] {\n    padding-left: 2ch;\n    padding-right: 1ch;\n\n    &:before {\n      content: "";\n      min-width: var(--diffs-min-number-column-width, var(--diffs-min-number-column-width-default, 3ch));\n      display: block;\n    }\n  }\n\n  [data-gutter-buffer="annotation"] {\n    --diffs-annotation-bg: var(--diffs-bg-context-gutter);\n    min-height: 0;\n  }\n\n  [data-gutter-buffer="buffer"] {\n    --diffs-line-bg: var(--diffs-bg-context-gutter);\n  }\n\n  [data-content-buffer] {\n    background-position: 5px 0;\n    background-size: 8px 8px;\n    background-origin: border-box;\n    background-image: repeating-linear-gradient(-45deg,\n      transparent,\n      transparent calc(3px * 1.414),\n      var(--diffs-bg-buffer) calc(3px * 1.414),\n      var(--diffs-bg-buffer) calc(4px * 1.414));\n    grid-column: 1;\n  }\n\n  [data-separator] {\n    box-sizing: content-box;\n    background-color: var(--diffs-bg);\n  }\n\n  [data-separator="simple"] {\n    min-height: 4px;\n  }\n\n  [data-separator="line-info"], [data-separator="line-info-basic"], [data-separator="metadata"], [data-separator="simple"] {\n    background-color: var(--diffs-bg-separator);\n  }\n\n  [data-separator="line-info"], [data-separator="line-info-basic"], [data-separator="metadata"] {\n    height: 32px;\n    position: relative;\n  }\n\n  [data-separator-wrapper] {\n    user-select: none;\n    fill: currentColor;\n    background-color: var(--diffs-bg);\n    align-items: center;\n    height: 100%;\n    display: flex;\n    position: absolute;\n    inset-inline: 0;\n  }\n\n  [data-content] [data-separator-wrapper] {\n    display: none;\n  }\n\n  [data-separator="metadata"] [data-separator-wrapper] {\n    background-color: var(--diffs-bg-separator);\n    height: 100%;\n    color: var(--diffs-fg-number);\n    white-space: nowrap;\n    text-overflow: ellipsis;\n    min-width: min-content;\n    padding-inline: 1ch;\n    inset-inline: 100% auto;\n    overflow: hidden;\n  }\n\n  [data-separator="line-info"] {\n    margin-block: var(--diffs-gap-block, var(--diffs-gap-fallback));\n\n    & [data-separator-wrapper] {\n      min-width: 16px;\n    }\n  }\n\n  [data-separator="line-info-basic"], [data-separator="metadata"] {\n    margin-block: 0;\n  }\n\n  [data-separator="line-info"][data-separator-first] {\n    margin-top: 0;\n  }\n\n  [data-separator="line-info"][data-separator-last] {\n    margin-bottom: 0;\n  }\n\n  [data-expand-index] [data-separator-wrapper] {\n    grid-template-columns: 32px auto;\n    display: grid;\n  }\n\n  [data-expand-index] [data-separator-wrapper][data-separator-multi-button] {\n    grid-template-columns: 32px 32px auto;\n  }\n\n  [data-expand-button], [data-separator-content] {\n    background-color: var(--diffs-bg-separator);\n    flex: none;\n    align-items: center;\n    display: flex;\n  }\n\n  [data-expand-index] [data-separator-content]:hover {\n    cursor: pointer;\n    text-decoration: underline;\n  }\n\n  [data-expand-button] {\n    cursor: pointer;\n    min-width: 32px;\n    color: var(--diffs-fg-number);\n    border-right: 2px solid var(--diffs-bg);\n    flex-shrink: 0;\n    justify-content: center;\n    align-self: stretch;\n\n    &:hover {\n      color: var(--diffs-fg);\n    }\n\n    &[data-expand-all-button] {\n      display: none;\n    }\n  }\n\n  [data-expand-down] [data-icon] {\n    transform: scaleY(-1);\n  }\n\n  [data-separator-content] {\n    height: 100%;\n    color: var(--diffs-fg-number);\n    flex: auto;\n    justify-content: flex-start;\n    padding: 0 1ch;\n    overflow: hidden;\n  }\n\n  [data-separator="line-info"], [data-separator="line-info-basic"] {\n    & [data-separator-content] {\n      user-select: none;\n      height: 100%;\n      overflow: clip;\n    }\n  }\n\n  [data-unmodified-lines] {\n    text-overflow: ellipsis;\n    white-space: nowrap;\n    flex: 0 auto;\n    min-width: 0;\n    display: block;\n    overflow: hidden;\n  }\n\n  @supports (width: 1cqi) {\n    [data-unified] {\n      & [data-separator="line-info"] [data-separator-wrapper] {\n        padding-inline: var(--diffs-gap-inline, var(--diffs-gap-fallback));\n        width: 100cqi;\n\n        & [data-separator-content] {\n          border-radius: 6px;\n        }\n      }\n\n      & [data-separator="line-info"][data-expand-index] [data-separator-wrapper] [data-separator-content] {\n        border-top-left-radius: unset;\n        border-bottom-left-radius: unset;\n      }\n    }\n\n    [data-gutter] {\n      & [data-separator="line-info"] [data-separator-wrapper] {\n        padding-left: var(--diffs-gap-inline, var(--diffs-gap-fallback));\n      }\n\n      & [data-separator="line-info"] [data-separator-content] {\n        border-top-left-radius: 6px;\n        border-bottom-left-radius: 6px;\n      }\n\n      & [data-separator="line-info"][data-expand-index] [data-separator-content] {\n        border-top-left-radius: unset;\n        border-bottom-left-radius: unset;\n      }\n    }\n\n    [data-additions] {\n      & [data-content] [data-separator="line-info"] {\n        background-color: var(--diffs-bg);\n\n        & [data-separator-wrapper] {\n          display: none;\n        }\n      }\n\n      & [data-gutter] [data-separator="line-info"] [data-separator-wrapper] {\n        background-color: var(--diffs-bg-separator);\n        border-top-right-radius: 6px;\n        border-bottom-right-radius: 6px;\n        height: 100%;\n        display: block;\n\n        & [data-separator-content], & [data-expand-button] {\n          display: none;\n        }\n      }\n    }\n\n    [data-overflow="scroll"] [data-additions] [data-gutter] [data-separator="line-info"] [data-separator-wrapper] {\n      width: calc(100cqi - var(--diffs-gap-inline, var(--diffs-gap-fallback)));\n    }\n\n    [data-overflow="wrap"] [data-additions] [data-content] [data-separator="line-info"] [data-separator-wrapper] {\n      background-color: var(--diffs-bg-separator);\n      height: 100%;\n      margin-right: var(--diffs-gap-inline, var(--diffs-gap-fallback));\n      border-top-right-radius: 6px;\n      border-bottom-right-radius: 6px;\n      display: block;\n\n      & [data-separator-content], & [data-expand-button] {\n        display: none;\n      }\n    }\n\n    [data-separator="line-info"] [data-separator-wrapper] {\n      & [data-expand-both], & [data-expand-down], & [data-expand-up] {\n        border-top-left-radius: 6px;\n        border-bottom-left-radius: 6px;\n      }\n    }\n\n    @media (pointer: fine) {\n      [data-separator="line-info"] [data-separator-wrapper] {\n        &[data-separator-multi-button] {\n          & [data-expand-up] {\n            border-top-left-radius: 6px;\n            border-bottom-left-radius: unset;\n          }\n\n          & [data-expand-down] {\n            border-bottom-left-radius: 6px;\n            border-top-left-radius: unset;\n          }\n        }\n      }\n    }\n  }\n\n  @media (pointer: coarse) {\n    [data-separator="line-info-basic"] [data-separator-wrapper][data-separator-multi-button] {\n      grid-template-columns: 34px 34px auto;\n\n      & [data-separator-content] {\n        grid-column: unset;\n        grid-row: unset;\n      }\n    }\n\n    @supports (width: 1cqi) {\n      [data-separator="line-info"] [data-separator-wrapper] {\n        & [data-expand-both], & [data-expand-down], & [data-expand-up] {\n          border-top-left-radius: 6px;\n          border-bottom-left-radius: 6px;\n        }\n\n        &[data-separator-multi-button] {\n          & [data-expand-up] {\n            border-top-left-radius: 6px;\n            border-bottom-left-radius: 6px;\n          }\n\n          & [data-expand-down] {\n            border-bottom-left-radius: unset;\n            border-top-left-radius: unset;\n          }\n        }\n      }\n    }\n  }\n\n  @media (pointer: fine) {\n    [data-separator-wrapper][data-separator-multi-button] {\n      grid-template-rows: 50% 50%;\n      display: grid;\n\n      & [data-separator-content] {\n        grid-area: 1 / 2 / -1;\n        min-width: min-content;\n      }\n\n      & [data-expand-button] {\n        grid-column: 1;\n      }\n    }\n\n    [data-separator="line-info"] [data-separator-wrapper], [data-separator="line-info"] [data-separator-wrapper][data-separator-multi-button] {\n      grid-template-columns: 34px auto;\n    }\n\n    [data-separator="line-info-basic"][data-expand-index] [data-separator-wrapper] {\n      grid-template-columns: 100% auto;\n    }\n\n    [data-separator="line-info"], [data-separator="line-info-basic"] {\n      & [data-separator-multi-button] {\n        & [data-expand-up] {\n          border-bottom: 1px solid var(--diffs-bg);\n          border-right: 2px solid var(--diffs-bg);\n        }\n\n        & [data-expand-down] {\n          border-top: 1px solid var(--diffs-bg);\n          border-right: 2px solid var(--diffs-bg);\n        }\n      }\n    }\n  }\n\n  [data-additions] [data-gutter] [data-separator-wrapper], [data-additions] [data-separator="line-info-basic"] [data-separator-wrapper], [data-content] [data-separator-wrapper] {\n    display: none;\n  }\n\n  [data-line-annotation] {\n    min-height: var(--diffs-annotation-min-height, 0);\n    z-index: 2;\n  }\n\n  [data-merge-conflict-actions] {\n    z-index: 2;\n  }\n\n  [data-separator="custom"] {\n    grid-template-columns: subgrid;\n    display: grid;\n  }\n\n  [data-line], [data-column-number], [data-no-newline] {\n    padding-inline: 1ch;\n    position: relative;\n  }\n\n  [data-indicators="classic"] [data-line] {\n    padding-inline-start: 2ch;\n  }\n\n  [data-indicators="classic"] {\n    & [data-line-type="change-addition"], & [data-line-type="change-deletion"] {\n      &[data-no-newline], &[data-line] {\n        &:before {\n          user-select: none;\n          width: 1ch;\n          height: 1lh;\n          display: inline-block;\n          position: absolute;\n          top: 0;\n          left: 0;\n        }\n      }\n    }\n\n    & [data-line-type="change-addition"] {\n      &[data-line], &[data-no-newline] {\n        &:before {\n          content: "+";\n          color: var(--diffs-addition-base);\n        }\n      }\n    }\n\n    & [data-line-type="change-deletion"] {\n      &[data-line], &[data-no-newline] {\n        &:before {\n          content: "-";\n          color: var(--diffs-deletion-base);\n        }\n      }\n    }\n  }\n\n  [data-indicators="bars"] {\n    & [data-line-type="change-deletion"], & [data-line-type="change-addition"] {\n      &[data-column-number] {\n        &:before {\n          content: "";\n          user-select: none;\n          contain: strict;\n          width: 4px;\n          height: 100%;\n          display: block;\n          position: absolute;\n          top: 0;\n          left: 0;\n        }\n      }\n    }\n\n    & [data-line-type="change-deletion"] {\n      &[data-column-number] {\n        &:before {\n          background-image: linear-gradient(0deg,\n            var(--diffs-bg-deletion) 50%,\n            var(--diffs-deletion-base) 50%);\n          background-repeat: repeat;\n          background-size: 2px 2px;\n          background-size: calc(1lh / round(1lh / 2px))\n            calc(1lh / round(1lh / 2px));\n        }\n      }\n    }\n\n    & [data-line-type="change-addition"] {\n      &[data-column-number] {\n        &:before {\n          background-color: var(--diffs-addition-base);\n        }\n      }\n    }\n  }\n\n  [data-overflow="wrap"] {\n    & [data-line] {\n      white-space: pre-wrap;\n      word-break: break-word;\n    }\n\n    & [data-annotation-content] {\n      word-break: break-word;\n    }\n  }\n\n  [data-overflow="scroll"] [data-line] {\n    white-space: pre;\n    min-height: 1lh;\n  }\n\n  [data-column-number] {\n    box-sizing: content-box;\n    text-align: right;\n    user-select: none;\n    color: var(--diffs-fg-number);\n    padding-left: 2ch;\n  }\n\n  [data-line-number-content] {\n    min-width: var(--diffs-min-number-column-width, var(--diffs-min-number-column-width-default, 3ch));\n    z-index: 1;\n    display: inline-block;\n    position: relative;\n  }\n\n  [data-disable-line-numbers] {\n    & [data-gutter-buffer], & [data-column-number] {\n      min-width: 4px;\n      padding: 0;\n\n      &:before {\n        min-width: 0;\n      }\n    }\n\n    & [data-line-number-content] {\n      display: none;\n    }\n\n    & [data-gutter-utility-slot] {\n      right: unset;\n      justify-content: flex-start;\n      left: 0;\n    }\n\n    &[data-indicators="bars"] [data-gutter-utility-slot] {\n      left: 6px;\n    }\n  }\n\n  [data-file][data-disable-line-numbers] {\n    & [data-gutter-buffer], & [data-column-number] {\n      border-right: 0;\n      min-width: 0;\n    }\n  }\n\n  [data-diff-span] {\n    box-decoration-break: clone;\n    border-radius: 3px;\n  }\n\n  [data-line-type="change-addition"] [data-diff-span] {\n    background-color: var(--diffs-bg-addition-emphasis);\n  }\n\n  [data-line-type="change-deletion"] [data-diff-span] {\n    background-color: var(--diffs-bg-deletion-emphasis);\n  }\n\n  [data-merge-conflict="marker-start"], [data-merge-conflict="marker-base"], [data-merge-conflict="marker-separator"], [data-merge-conflict="marker-end"] {\n    color: var(--diffs-fg);\n    padding-left: 1ch;\n  }\n\n  [data-merge-conflict="marker-start"], [data-merge-conflict="marker-end"] {\n    align-items: center;\n    display: flex;\n\n    &:after {\n      color: var(--diffs-fg-conflict-marker);\n      font-size: .75rem;\n      font-style: normal;\n      line-height: 1.25rem;\n      font-family: var(--diffs-header-font-family, var(--diffs-header-font-fallback));\n      padding-left: 1ch;\n    }\n  }\n\n  [data-merge-conflict="marker-start"]:after {\n    content: "(Current Change)";\n  }\n\n  [data-merge-conflict="marker-end"]:after {\n    content: "(Incoming Change)";\n  }\n\n  [data-merge-conflict-actions-content] {\n    min-height: 1.75rem;\n    font-family: var(--diffs-header-font-family, var(--diffs-header-font-fallback));\n    color: var(--diffs-fg);\n    align-items: center;\n    gap: .25rem;\n    padding-inline: .5rem;\n    font-size: .75rem;\n    line-height: 1.2;\n    display: flex;\n  }\n\n  [data-merge-conflict-action] {\n    appearance: none;\n    color: var(--diffs-fg-number);\n    font: inherit;\n    cursor: pointer;\n    background: none;\n    border: 0;\n    padding: 0;\n    font-style: normal;\n  }\n\n  [data-merge-conflict-action]:hover {\n    color: var(--diffs-fg);\n  }\n\n  [data-merge-conflict-action="current"]:hover {\n    color: var(--diffs-addition-base);\n  }\n\n  [data-merge-conflict-action="incoming"]:hover {\n    color: var(--diffs-modified-base);\n  }\n\n  [data-merge-conflict-action-separator] {\n    color: var(--diffs-fg-number);\n    opacity: .6;\n    user-select: none;\n  }\n\n  [data-diffs-header="default"] {\n    background-color: var(--diffs-bg);\n    justify-content: space-between;\n    align-items: center;\n    gap: var(--diffs-gap-inline, var(--diffs-gap-fallback));\n    min-height: calc(1lh + (var(--diffs-gap-block, var(--diffs-gap-fallback)) * 3));\n    z-index: 2;\n    flex-direction: row;\n    padding-inline: 16px;\n    display: flex;\n    position: relative;\n    top: 0;\n  }\n\n  [data-header-content] {\n    align-items: center;\n    gap: var(--diffs-gap-inline, var(--diffs-gap-fallback));\n    white-space: nowrap;\n    flex-direction: row;\n    min-width: 0;\n    display: flex;\n  }\n\n  [data-header-content] [data-prev-name], [data-header-content] [data-title] {\n    text-overflow: ellipsis;\n    white-space: nowrap;\n    direction: rtl;\n    min-width: 0;\n    overflow: hidden;\n  }\n\n  [data-prev-name] {\n    opacity: .7;\n  }\n\n  [data-rename-icon] {\n    fill: currentColor;\n    flex-grow: 0;\n    flex-shrink: 0;\n  }\n\n  [data-diffs-header="default"] [data-metadata] {\n    white-space: nowrap;\n    align-items: center;\n    gap: 1ch;\n    display: flex;\n  }\n\n  [data-diffs-header="default"] [data-additions-count] {\n    font-family: var(--diffs-font-family, var(--diffs-font-fallback));\n    color: var(--diffs-addition-base);\n  }\n\n  [data-diffs-header="default"] [data-deletions-count] {\n    font-family: var(--diffs-font-family, var(--diffs-font-fallback));\n    color: var(--diffs-deletion-base);\n  }\n\n  [data-change-icon] {\n    fill: currentColor;\n    flex-shrink: 0;\n  }\n\n  [data-change-icon="change"], [data-change-icon="rename-pure"], [data-change-icon="rename-changed"] {\n    color: var(--diffs-modified-base);\n  }\n\n  [data-change-icon="new"] {\n    color: var(--diffs-addition-base);\n  }\n\n  [data-change-icon="deleted"] {\n    color: var(--diffs-deletion-base);\n  }\n\n  [data-change-icon="file"] {\n    opacity: .6;\n  }\n\n  [data-annotation-content] {\n    z-index: 2;\n    isolation: isolate;\n    white-space: normal;\n    align-self: flex-start;\n    min-width: 0;\n    display: flow-root;\n    position: relative;\n  }\n\n  [data-overflow="scroll"] [data-annotation-content], [data-overflow="scroll"] [data-merge-conflict-actions-content] {\n    width: var(--diffs-column-content-width, auto);\n    left: var(--diffs-column-number-width, 0);\n    position: sticky;\n  }\n\n  [data-annotation-slot] {\n    text-wrap-mode: wrap;\n    word-break: normal;\n    white-space-collapse: collapse;\n  }\n\n  [data-gutter-utility-slot] {\n    touch-action: none;\n    justify-content: flex-end;\n    display: flex;\n    position: absolute;\n    top: 0;\n    bottom: 0;\n    right: 0;\n  }\n\n  [data-utility-button] {\n    appearance: none;\n    cursor: pointer;\n    width: 1lh;\n    height: 1lh;\n    font-size: var(--diffs-font-size, 13px);\n    line-height: var(--diffs-line-height, 20px);\n    background-color: var(--diffs-modified-base);\n    color: var(--diffs-bg);\n    fill: currentColor;\n    z-index: 4;\n    touch-action: none;\n    border: none;\n    border-radius: 4px;\n    justify-content: center;\n    align-items: center;\n    margin-right: calc(-1lh + 1ch);\n    padding: 0;\n    display: flex;\n    position: relative;\n\n    &:before {\n      content: "";\n      display: block;\n      position: absolute;\n      inset: 0 0 0 -4px;\n    }\n  }\n\n  [data-decoration-bar-stack] {\n    pointer-events: none;\n    isolation: isolate;\n    z-index: 1;\n    background-color: var(--diffs-decoration-bar-color, transparent);\n    box-sizing: content-box;\n    border-left: 2px solid var(--diffs-bg);\n    border-right: 2px solid var(--diffs-bg);\n    width: 6px;\n    position: absolute;\n    top: 0;\n    bottom: 0;\n    right: -2px;\n\n    [data-decoration-bar-depth="1"] & {\n      background-color: color-mix(in lab,\n        var(--diffs-bg) 20%,\n        var(--diffs-decoration-bar-color, transparent));\n    }\n\n    [data-decoration-bar-depth="2"] & {\n      background-color: color-mix(in lab,\n        var(--diffs-bg) 45%,\n        var(--diffs-decoration-bar-color, transparent));\n    }\n\n    [data-decoration-bar-depth="3"] & {\n      background-color: color-mix(in lab,\n        var(--diffs-bg) 65%,\n        var(--diffs-decoration-bar-color, transparent));\n    }\n\n    [data-decoration-bar-start] & {\n      border-top-left-radius: 5px;\n      border-top-right-radius: 5px;\n    }\n\n    [data-decoration-bar-end] & {\n      z-index: 3;\n      border-bottom-right-radius: 5px;\n      border-bottom-left-radius: 5px;\n    }\n  }\n\n  [data-placeholder] {\n    contain: strict;\n  }\n\n  [data-error-wrapper] {\n    padding: var(--diffs-gap-block, var(--diffs-gap-fallback))\n      var(--diffs-gap-inline, var(--diffs-gap-fallback));\n    scrollbar-width: none;\n    max-height: 400px;\n    overflow: auto;\n\n    & [data-error-message] {\n      color: var(--diffs-deletion-base);\n      font-size: 18px;\n      font-weight: bold;\n    }\n\n    & [data-error-stack] {\n      color: var(--diffs-fg-number);\n    }\n  }\n}\n\n@layer theme, rendered, unsafe;\n';
const LAYER_ORDER = `@layer base, theme, rendered, unsafe;`;
const SCROLLBAR_GUTTER_DECLARATION_PATTERN = new RegExp(`${escapeRegExp(DIFFS_SCROLLBAR_GUTTER_MEASURED_PROPERTY)}\\s*:\\s*[^;]+;`);
function wrapUnsafeCSS(unsafeCSS) {
  return `${LAYER_ORDER}
@layer unsafe {
  ${unsafeCSS}
}`;
}
function wrapThemeCSS(themeCSS, themeType = "system", scrollbarGutter) {
  return `${LAYER_ORDER}
@layer rendered {
  :host {${themeType === "system" ? "" : `
  color-scheme: ${themeType};`}
  ${createMeasuredScrollbarGutterDeclaration(scrollbarGutter)}
  ${themeCSS}
  }
}`;
}
function patchScrollbarGutterSize(themeCSS, scrollbarGutter) {
  const scrollbarGutterRule = createMeasuredScrollbarGutterDeclaration(scrollbarGutter);
  return themeCSS.replace(SCROLLBAR_GUTTER_DECLARATION_PATTERN, scrollbarGutterRule);
}
function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function shouldUseTokenTransformer(options) {
  return options?.useTokenTransformer === true || options?.onTokenClick != null || options?.onTokenEnter != null || options?.onTokenLeave != null;
}
function getOrCreateCodeNode({ code, pre, columnType, rowSpan, containerSize = false } = {}) {
  if (code == null) {
    code = document.createElement("code");
    code.setAttribute("data-code", "");
    if (columnType != null) code.setAttribute(`data-${columnType}`, "");
    pre?.appendChild(code);
  }
  if (rowSpan != null) code.style.setProperty("grid-row", `span ${rowSpan}`);
  else code.style.removeProperty("grid-row");
  if (containerSize) code.setAttribute("data-container-size", "");
  else code.removeAttribute("data-container-size");
  return code;
}
function guardWebKitScrollDuringRebuild(pre, rebuild) {
  const height = pre?.offsetHeight ?? 0;
  if (pre == null || height === 0) {
    rebuild();
    return;
  }
  pre.style.minHeight = `${height}px`;
  try {
    rebuild();
    pre.offsetHeight;
  } finally {
    pre.style.minHeight = "";
  }
}
function upsertHostThemeStyle({ shadowRoot, currentNode, themeCSS }) {
  if (themeCSS.trim() === "") {
    currentNode?.remove();
    return;
  }
  currentNode ??= createHostThemeStyleNode();
  currentNode.textContent = themeCSS;
  if (currentNode.parentNode !== shadowRoot) shadowRoot.appendChild(currentNode);
  return currentNode;
}
function createHostThemeStyleNode() {
  const node = document.createElement("style");
  node.setAttribute(THEME_CSS_ATTRIBUTE, "");
  return node;
}
function prerenderHTMLIfNecessary(element2, html2) {
  if (html2 == null) return;
  const shadowRoot = element2.shadowRoot ?? element2.attachShadow({ mode: "open" });
  if (shadowRoot.innerHTML === "") shadowRoot.innerHTML = html2;
}
function setPreNodeProperties(pre, { type, diffIndicators, disableBackground, disableLineNumbers, overflow, split, totalLines, customProperties }) {
  if (customProperties != null) for (const key2 in customProperties) {
    const value = customProperties[key2];
    if (value != null) pre.setAttribute(key2, `${value}`);
  }
  if (type === "diff") {
    pre.setAttribute("data-diff", "");
    pre.removeAttribute("data-file");
  } else {
    pre.setAttribute("data-file", "");
    pre.removeAttribute("data-diff");
  }
  switch (diffIndicators) {
    case "bars":
    case "classic":
      pre.setAttribute("data-indicators", diffIndicators);
      break;
    case "none":
      pre.removeAttribute("data-indicators");
      break;
  }
  if (disableLineNumbers) pre.setAttribute("data-disable-line-numbers", "");
  else pre.removeAttribute("data-disable-line-numbers");
  if (disableBackground) pre.removeAttribute("data-background");
  else pre.setAttribute("data-background", "");
  if (type === "diff") pre.setAttribute("data-diff-type", split ? "split" : "single");
  else pre.removeAttribute("data-diff-type");
  pre.setAttribute("data-overflow", overflow);
  pre.style.setProperty("--diffs-min-number-column-width-default", `${`${totalLines}`.length}ch`);
  return pre;
}
if (typeof HTMLElement !== "undefined" && customElements.get("diffs-container") == null) {
  let sheet;
  class FileDiffContainer extends HTMLElement {
    constructor() {
      super();
      if (this.shadowRoot != null) return;
      const shadowRoot = this.attachShadow({ mode: "open" });
      if (sheet == null) {
        sheet = new CSSStyleSheet();
        sheet.replaceSync(style_default);
      }
      shadowRoot.adoptedStyleSheets = [sheet];
    }
    connectedCallback() {
      getMeasuredScrollbarGutter(this.shadowRoot ?? this.attachShadow({ mode: "open" }));
    }
  }
  customElements.define(DIFFS_TAG_NAME, FileDiffContainer);
}
async function awaitWithTimeout(callback, timeout = 300) {
  let timeoutId;
  try {
    await Promise.race([callback(), new Promise((resolve) => {
      timeoutId = setTimeout(resolve, timeout);
    })]);
  } finally {
    if (timeoutId != null) clearTimeout(timeoutId);
  }
}
function computeEstimatedDiffHeights({ fileDiff, metrics, disableFileHeader, hunkSeparators, expandUnchanged, expandedHunks: configuredExpandedHunks, collapsedContextThreshold, canHydratePartialDiff }) {
  let splitHeight = getVirtualFileHeaderRegion(metrics, disableFileHeader);
  let unifiedHeight = splitHeight;
  const expandedHunks = expandUnchanged ? true : configuredExpandedHunks;
  const finalHunkIndex = fileDiff.hunks.length - 1;
  for (let hunkIndex = 0; hunkIndex < fileDiff.hunks.length; hunkIndex++) {
    const hunk = fileDiff.hunks[hunkIndex];
    if (hunk == null) throw new Error("computeEstimatedDiffHeights: invalid hunk index");
    const leadingRegion = getExpandedRegion({
      isPartial: fileDiff.isPartial,
      rangeSize: hunk.collapsedBefore,
      expandedHunks,
      hunkIndex,
      collapsedContextThreshold
    });
    const leadingExpandedHeight = (leadingRegion.fromStart + leadingRegion.fromEnd) * metrics.lineHeight;
    splitHeight += leadingExpandedHeight;
    unifiedHeight += leadingExpandedHeight;
    if (leadingRegion.collapsedLines > 0) {
      const separatorHeight = getLeadingHunkSeparatorLayout({
        type: hunkSeparators,
        metrics,
        hunkIndex,
        hunkSpecs: hunk.hunkSpecs
      })?.totalHeight ?? 0;
      splitHeight += separatorHeight;
      unifiedHeight += separatorHeight;
    }
    splitHeight += hunk.splitLineCount * metrics.lineHeight;
    unifiedHeight += hunk.unifiedLineCount * metrics.lineHeight;
    const metadataLineCounts = getNoNewlineMetadataLineCounts(hunk);
    splitHeight += metadataLineCounts.split * metrics.lineHeight;
    unifiedHeight += metadataLineCounts.unified * metrics.lineHeight;
    const trailingRegion = hunkIndex === finalHunkIndex ? getTrailingExpandedRegion({
      fileDiff,
      hunkIndex,
      expandedHunks,
      collapsedContextThreshold,
      errorPrefix: "computeEstimatedDiffHeights"
    }) : void 0;
    if (trailingRegion != null) {
      const trailingExpandedHeight = (trailingRegion.fromStart + trailingRegion.fromEnd) * metrics.lineHeight;
      splitHeight += trailingExpandedHeight;
      unifiedHeight += trailingExpandedHeight;
      if (trailingRegion.collapsedLines > 0) {
        const separatorHeight = getTrailingHunkSeparatorLayout({
          type: hunkSeparators,
          metrics
        })?.totalHeight ?? 0;
        splitHeight += separatorHeight;
        unifiedHeight += separatorHeight;
      }
    } else if (hunkIndex === finalHunkIndex && fileDiff.isPartial && canHydratePartialDiff) {
      const separatorHeight = getTrailingHunkSeparatorLayout({
        type: hunkSeparators,
        metrics
      })?.totalHeight ?? 0;
      splitHeight += separatorHeight;
      unifiedHeight += separatorHeight;
    }
  }
  if (fileDiff.hunks.length > 0) {
    const paddingBottom = getVirtualFilePaddingBottom(metrics);
    splitHeight += paddingBottom;
    unifiedHeight += paddingBottom;
  }
  return {
    splitHeight,
    unifiedHeight
  };
}
function getNoNewlineMetadataLineCounts(hunk) {
  if (!hunk.noEOFCRAdditions && !hunk.noEOFCRDeletions) return {
    split: 0,
    unified: 0
  };
  const lastContent = hunk.hunkContent.at(-1);
  if (lastContent == null) return {
    split: 0,
    unified: 0
  };
  if (lastContent.type === "context") {
    const metadataRows = lastContent.lines > 0 ? 1 : 0;
    return {
      split: metadataRows,
      unified: metadataRows
    };
  }
  return getChangeNoNewlineMetadataLineCounts(hunk, lastContent);
}
function getChangeNoNewlineMetadataLineCounts(hunk, content) {
  const unified = (content.deletions > 0 && hunk.noEOFCRDeletions ? 1 : 0) + (content.additions > 0 && hunk.noEOFCRAdditions ? 1 : 0);
  const splitDeletionHasMetadata = content.deletions > 0 && hunk.noEOFCRDeletions;
  const splitAdditionHasMetadata = content.additions > 0 && hunk.noEOFCRAdditions;
  return {
    split: splitDeletionHasMetadata || splitAdditionHasMetadata ? 1 : 0,
    unified
  };
}
function getDiffFileInput({ oldFile, newFile }, context) {
  if (oldFile === void 0 && newFile === void 0) return;
  if (oldFile === void 0 || newFile === void 0) throw new Error(`${context}: Pass null for an intentionally missing oldFile or newFile side`);
  if (oldFile === null) {
    if (newFile === null) throw new Error(`${context}: You must pass oldFile, newFile, or both`);
    return {
      oldFile,
      newFile
    };
  }
  if (newFile === null) return {
    oldFile,
    newFile
  };
  return {
    oldFile,
    newFile
  };
}
function cloneFileDiffMetadata(fileDiff) {
  return {
    ...fileDiff,
    hunks: fileDiff.hunks.map((hunk) => ({
      ...hunk,
      hunkContent: hunk.hunkContent.map((content) => ({ ...content }))
    })),
    deletionLines: [...fileDiff.deletionLines],
    additionLines: [...fileDiff.additionLines]
  };
}
function splitFileContents(contents) {
  return contents !== "" ? contents.split(SPLIT_WITH_NEWLINES) : [];
}
function hydratePartialDiff(type, fileDiff, files) {
  const targetFileDiff = type === "clone" ? cloneFileDiffMetadata(fileDiff) : fileDiff;
  if (!targetFileDiff.isPartial) throw new Error("hydratePartialDiff: fileDiff must be partial");
  switch (targetFileDiff.type) {
    case "change":
    case "rename-changed":
      return hydrateTwoSidedFileDiff(targetFileDiff, requireOldFile(targetFileDiff, files), requireNewFile(targetFileDiff, files));
    case "rename-pure": {
      const newFile = requireNewFile(targetFileDiff, files);
      requireMissingOldFile(targetFileDiff, files);
      const lines = splitFileContents(newFile.contents);
      targetFileDiff.isPartial = false;
      targetFileDiff.deletionLines = lines;
      targetFileDiff.additionLines = lines;
      setHydratedCacheKey(targetFileDiff, null, newFile);
      return targetFileDiff;
    }
  }
  throw new Error(`hydratePartialDiff: ${targetFileDiff.type} diffs cannot be hydrated from loaded files`);
}
function hydrateTwoSidedFileDiff(fileDiff, oldFile, newFile) {
  const deletionLines = splitFileContents(oldFile.contents);
  const additionLines = splitFileContents(newFile.contents);
  const { hunks, splitLineCount, unifiedLineCount } = hydrateHunks(fileDiff.hunks, additionLines.length);
  fileDiff.hunks = hunks;
  fileDiff.splitLineCount = splitLineCount;
  fileDiff.unifiedLineCount = unifiedLineCount;
  fileDiff.isPartial = false;
  fileDiff.deletionLines = deletionLines;
  fileDiff.additionLines = additionLines;
  setHydratedCacheKey(fileDiff, oldFile, newFile);
  return fileDiff;
}
function hydrateHunks(hunks, totalAdditionLines) {
  let splitLineCount = 0;
  let unifiedLineCount = 0;
  let lastHunkAdditionEnd = 0;
  const hydratedHunks = [];
  for (const hunk of hunks) {
    const additionLineIndex = Math.max(hunk.additionStart - 1, 0);
    const deletionLineIndex = Math.max(hunk.deletionStart - 1, 0);
    let contentAdditionLineIndex = additionLineIndex;
    let contentDeletionLineIndex = deletionLineIndex;
    let hunkAdditionLines = 0;
    let hunkDeletionLines = 0;
    let hunkSplitLineCount = 0;
    let hunkUnifiedLineCount = 0;
    const hunkContent = [];
    for (const content of hunk.hunkContent) {
      if (content.type === "context") {
        hunkContent.push({
          ...content,
          additionLineIndex: contentAdditionLineIndex,
          deletionLineIndex: contentDeletionLineIndex
        });
        contentAdditionLineIndex += content.lines;
        contentDeletionLineIndex += content.lines;
        hunkSplitLineCount += content.lines;
        hunkUnifiedLineCount += content.lines;
        continue;
      }
      hunkContent.push({
        ...content,
        additionLineIndex: contentAdditionLineIndex,
        deletionLineIndex: contentDeletionLineIndex
      });
      contentAdditionLineIndex += content.additions;
      contentDeletionLineIndex += content.deletions;
      hunkAdditionLines += content.additions;
      hunkDeletionLines += content.deletions;
      hunkSplitLineCount += Math.max(content.additions, content.deletions);
      hunkUnifiedLineCount += content.additions + content.deletions;
    }
    const collapsedBefore = Math.max(getHunkSideStartBoundary(hunk.additionStart, hunk.additionCount) - lastHunkAdditionEnd, 0);
    hydratedHunks.push({
      ...hunk,
      collapsedBefore,
      additionLineIndex,
      deletionLineIndex,
      additionLines: hunkAdditionLines,
      deletionLines: hunkDeletionLines,
      hunkContent,
      splitLineStart: splitLineCount + collapsedBefore,
      unifiedLineStart: unifiedLineCount + collapsedBefore,
      splitLineCount: hunkSplitLineCount,
      unifiedLineCount: hunkUnifiedLineCount
    });
    splitLineCount += collapsedBefore + hunkSplitLineCount;
    unifiedLineCount += collapsedBefore + hunkUnifiedLineCount;
    lastHunkAdditionEnd = getHunkSideEndBoundary(hunk.additionStart, hunk.additionCount);
  }
  if (hydratedHunks.length > 0) {
    const lastHunk = hydratedHunks[hydratedHunks.length - 1];
    const lastHunkEnd = getHunkSideEndBoundary(lastHunk.additionStart, lastHunk.additionCount);
    const collapsedAfter = Math.max(totalAdditionLines - lastHunkEnd, 0);
    splitLineCount += collapsedAfter;
    unifiedLineCount += collapsedAfter;
  }
  return {
    hunks: hydratedHunks,
    splitLineCount,
    unifiedLineCount
  };
}
function requireOldFile(fileDiff, files) {
  if (files.oldFile == null) throw new Error(`hydratePartialDiff: ${fileDiff.type} diff for ${fileDiff.name} requires oldFile`);
  return files.oldFile;
}
function requireNewFile(fileDiff, files) {
  if (files.newFile == null) throw new Error(`hydratePartialDiff: ${fileDiff.type} diff for ${fileDiff.name} requires newFile`);
  return files.newFile;
}
function requireMissingOldFile(fileDiff, files) {
  if (files.oldFile !== null) throw new Error(`hydratePartialDiff: ${fileDiff.type} diff for ${fileDiff.name} requires oldFile to be null`);
}
function getHydratedCacheKey(fileDiff, oldFile, newFile) {
  if (fileDiff.cacheKey != null) return `${fileDiff.cacheKey}:hydrated`;
  return getLoadedFileCacheKey(oldFile, newFile);
}
function setHydratedCacheKey(fileDiff, oldFile, newFile) {
  const cacheKey = getHydratedCacheKey(fileDiff, oldFile, newFile);
  if (cacheKey == null) {
    delete fileDiff.cacheKey;
    return;
  }
  fileDiff.cacheKey = cacheKey;
}
function getLoadedFileCacheKey(oldFile, newFile) {
  if (oldFile != null && newFile != null) return oldFile.cacheKey != null && newFile.cacheKey != null ? `${oldFile.cacheKey}:${newFile.cacheKey}` : void 0;
  return oldFile?.cacheKey ?? newFile?.cacheKey;
}
var ScrollSyncManager = class {
  isDeletionsScrolling = false;
  isAdditionsScrolling = false;
  timeoutId = -1;
  codeDeletions;
  codeAdditions;
  enabled = false;
  cleanUp() {
    if (!this.enabled) return;
    this.codeDeletions?.removeEventListener("scroll", this.handleDeletionsScroll);
    this.codeAdditions?.removeEventListener("scroll", this.handleAdditionsScroll);
    clearTimeout(this.timeoutId);
    this.codeDeletions = void 0;
    this.codeAdditions = void 0;
    this.enabled = false;
  }
  setup(pre, codeDeletions, codeAdditions) {
    if (codeDeletions == null || codeAdditions == null) for (const element2 of pre.children ?? []) {
      if (!(element2 instanceof HTMLElement)) continue;
      if ("deletions" in element2.dataset) codeDeletions = element2;
      else if ("additions" in element2.dataset) codeAdditions = element2;
    }
    if (codeAdditions == null || codeDeletions == null) {
      this.cleanUp();
      return;
    }
    if (this.codeDeletions !== codeDeletions) {
      this.codeDeletions?.removeEventListener("scroll", this.handleDeletionsScroll);
      this.codeDeletions = codeDeletions;
      codeDeletions.addEventListener("scroll", this.handleDeletionsScroll, { passive: true });
    }
    if (this.codeAdditions !== codeAdditions) {
      this.codeAdditions?.removeEventListener("scroll", this.handleAdditionsScroll);
      this.codeAdditions = codeAdditions;
      codeAdditions.addEventListener("scroll", this.handleAdditionsScroll, { passive: true });
    }
    this.enabled = true;
  }
  handleDeletionsScroll = () => {
    if (this.isAdditionsScrolling) return;
    this.isDeletionsScrolling = true;
    clearTimeout(this.timeoutId);
    this.timeoutId = setTimeout(() => {
      this.isDeletionsScrolling = false;
    }, 300);
    this.codeAdditions?.scrollTo({ left: this.codeDeletions?.scrollLeft });
  };
  handleAdditionsScroll = () => {
    if (this.isDeletionsScrolling) return;
    this.isAdditionsScrolling = true;
    clearTimeout(this.timeoutId);
    this.timeoutId = setTimeout(() => {
      this.isAdditionsScrolling = false;
    }, 300);
    this.codeDeletions?.scrollTo({ left: this.codeAdditions?.scrollLeft });
  };
};
function isDefaultRenderRange(renderRange) {
  return renderRange.startingLine === 0 && renderRange.totalLines === Infinity && renderRange.bufferBefore === 0 && renderRange.bufferAfter === 0;
}
function createEmptyRowBuffer(size) {
  return createHastElement({
    tagName: "div",
    properties: {
      "data-content-buffer": "",
      "data-buffer-size": size,
      style: `grid-row: span ${size};min-height:calc(${size} * 1lh)`
    }
  });
}
function createNoNewlineElement(type) {
  return createHastElement({
    tagName: "div",
    children: [createHastElement({
      tagName: "span",
      children: [createTextNodeElement("No newline at end of file")]
    })],
    properties: {
      "data-no-newline": "",
      "data-line-type": type,
      "data-column-content": ""
    }
  });
}
function createExpandButton(type) {
  return createHastElement({
    tagName: "div",
    children: [createIconElement({
      name: type === "both" ? "diffs-icon-expand-all" : "diffs-icon-expand",
      properties: { "data-icon": "" }
    })],
    properties: {
      role: "button",
      "data-expand-button": "",
      "data-expand-both": type === "both" ? "" : void 0,
      "data-expand-up": type === "up" ? "" : void 0,
      "data-expand-down": type === "down" ? "" : void 0
    }
  });
}
function createSeparator({ type, content, expandIndex, chunked = false, slotName, isFirstHunk, isLastHunk }) {
  let buttonCount = 0;
  const children = [];
  if (type === "metadata" && content != null) children.push(createHastElement({
    tagName: "div",
    children: [createTextNodeElement(content)],
    properties: { "data-separator-wrapper": "" }
  }));
  if ((type === "line-info" || type === "line-info-basic") && content != null) {
    const contentChildren = [];
    if (expandIndex != null) if (!chunked) {
      contentChildren.push(createExpandButton(!isFirstHunk && !isLastHunk ? "both" : isFirstHunk ? "down" : "up"));
      buttonCount++;
    } else {
      if (!isFirstHunk) {
        contentChildren.push(createExpandButton("up"));
        buttonCount++;
      }
      if (!isLastHunk) {
        contentChildren.push(createExpandButton("down"));
        buttonCount++;
      }
    }
    contentChildren.push(createHastElement({
      tagName: "div",
      children: [createHastElement({
        tagName: "span",
        children: [createTextNodeElement(content)],
        properties: { "data-unmodified-lines": "" }
      })],
      properties: { "data-separator-content": "" }
    }));
    if (chunked && expandIndex != null) contentChildren.push(createHastElement({
      tagName: "div",
      children: [createTextNodeElement("Expand all")],
      properties: {
        role: "button",
        "data-expand-button": "",
        "data-expand-all-button": ""
      }
    }));
    children.push(createHastElement({
      tagName: "div",
      children: contentChildren,
      properties: {
        "data-separator-wrapper": "",
        "data-separator-multi-button": buttonCount > 1 ? "" : void 0
      }
    }));
  }
  if (type === "custom" && slotName != null) children.push(createHastElement({
    tagName: "slot",
    properties: { name: slotName }
  }));
  return createHastElement({
    tagName: "div",
    children,
    properties: {
      "data-separator": children.length === 0 ? "simple" : type,
      "data-expand-index": expandIndex,
      "data-separator-first": isFirstHunk ? "" : void 0,
      "data-separator-last": isLastHunk ? "" : void 0
    }
  });
}
function getHunkSeparatorSlotName(type, hunkIndex) {
  return `hunk-separator-${type}-${hunkIndex}`;
}
function getTotalLineCountFromHunks(hunks) {
  const lastHunk = hunks.at(-1);
  if (lastHunk == null) return 0;
  return Math.max(getHunkSideEndBoundary(lastHunk.additionStart, lastHunk.additionCount), getHunkSideEndBoundary(lastHunk.deletionStart, lastHunk.deletionCount));
}
let instanceId$2 = -1;
var DiffHunksRenderer = class {
  options;
  onRenderUpdate;
  workerManager;
  __id = `diff-hunks-renderer:${++instanceId$2}`;
  highlighter;
  diff;
  expandedHunks = /* @__PURE__ */ new Map();
  deletionAnnotations = {};
  additionAnnotations = {};
  computedLang = "text";
  renderCache;
  editSessionActive = false;
  constructor(options = { theme: DEFAULT_THEMES }, onRenderUpdate, workerManager) {
    this.options = options;
    this.onRenderUpdate = onRenderUpdate;
    this.workerManager = workerManager;
    if (workerManager?.isWorkingPool() !== true) this.highlighter = areThemesAttached(options.theme ?? DEFAULT_THEMES) ? getHighlighterIfLoaded() : void 0;
  }
  cleanUp() {
    this.recycle();
    this.expandedHunks.clear();
    this.workerManager = void 0;
    this.onRenderUpdate = void 0;
  }
  recycle() {
    this.highlighter = void 0;
    this.diff = void 0;
    this.clearRenderCache();
    this.additionAnnotations = {};
    this.deletionAnnotations = {};
    this.workerManager?.cleanUpTasks(this);
    this.endEditSession();
  }
  /**
  * Enter edit-session mode: hunk updates preserve the current region
  * skeleton instead of recomputing hunks, and rendering happens locally
  * with the token transformer forced on (worker-pool requests/results are
  * suspended for this renderer). Called on every editor attach, including
  * a re-attach after recycle.
  */
  beginEditSession() {
    this.editSessionActive = true;
  }
  /** Leave edit-session mode. The exit recompute is the host's concern. */
  endEditSession() {
    this.editSessionActive = false;
  }
  /**
  * Ensures that the DOM is compatible with editor render updates
  */
  editorRenderReady() {
    return this.renderCache?.options.useTokenTransformer === true && this.renderCache.highlighted && this.renderCache.result != null;
  }
  /**
  * Re-highlights the current diff in the background and swaps the fresh
  * result in (with a re-render) once it completes. Needed after an edit
  * session's exit recompute: session passes plain-fill shifted lines in the
  * cached result, and the recompute mutates the diff in place (same object,
  * same cacheKey), so identity/cacheKey checks would otherwise treat the
  * stale highlight as current forever. The current result — content-correct,
  * mostly highlighted — keeps rendering until the fresh one lands, so no
  * interim paint drops highlighting.
  */
  refreshHighlightedResult() {
    const { renderCache } = this;
    if (renderCache == null || isDiffPlainText(renderCache.diff) || isDiffMassive(renderCache.diff, this.getTokenizeMaxLength())) return Promise.resolve();
    const { diff } = renderCache;
    const { workerManager } = this;
    if (!this.editSessionActive && workerManager?.isWorkingPool() === true && diff.cacheKey != null) {
      workerManager.evictDiffFromCache(diff.cacheKey);
      return workerManager.primeDiffHighlightCache(diff).then(() => {
        this.applyRefreshedResult(diff, workerManager.getDiffResultCache(diff));
      }).catch((error) => this.onHighlightError(error));
    }
    return this.asyncHighlight(diff).then((fresh) => this.applyRefreshedResult(diff, fresh)).catch((error) => this.onHighlightError(error));
  }
  applyRefreshedResult(diff, fresh) {
    if (fresh == null || this.renderCache == null || this.renderCache.diff !== diff || this.editSessionActive) return;
    const { options } = this.getRenderOptions(diff);
    if (!areDiffRenderOptionsEqual(options, fresh.options)) return;
    this.renderCache = {
      diff,
      options: fresh.options,
      highlighted: true,
      result: fresh.result,
      renderRange: void 0
    };
    this.onRenderUpdate?.();
  }
  get diffCache() {
    return this.renderCache?.diff ?? this.diff;
  }
  clearRenderCache() {
    const renderCache = this.renderCache;
    this.renderCache = void 0;
    if (renderCache != null && renderCache.isDirty === true && renderCache.diff.cacheKey != null) this.workerManager?.evictDiffFromCache(renderCache.diff.cacheKey);
  }
  setOptions(options) {
    this.options = options;
  }
  mergeOptions(options) {
    this.options = {
      ...this.options,
      ...options
    };
  }
  expandHunk(index, direction, expansionLineCount = this.getOptionsWithDefaults().expansionLineCount) {
    const region = { ...this.expandedHunks.get(index) ?? {
      fromStart: 0,
      fromEnd: 0
    } };
    if (direction === "up" || direction === "both") region.fromStart += expansionLineCount;
    if (direction === "down" || direction === "both") region.fromEnd += expansionLineCount;
    if (this.renderCache?.highlighted !== true) this.clearRenderCache();
    this.expandedHunks.set(index, region);
  }
  getExpandedHunk(hunkIndex) {
    return this.expandedHunks.get(hunkIndex) ?? DEFAULT_EXPANDED_REGION;
  }
  getExpandedHunksMap() {
    return this.expandedHunks;
  }
  /** Replace the whole expansion map (session-exit expansion remapping). */
  setExpandedHunksMap(expandedHunks) {
    this.expandedHunks = expandedHunks;
  }
  setLineAnnotations(lineAnnotations) {
    this.additionAnnotations = {};
    this.deletionAnnotations = {};
    for (const annotation of lineAnnotations) {
      const map = (() => {
        switch (annotation.side) {
          case "deletions":
            return this.deletionAnnotations;
          case "additions":
            return this.additionAnnotations;
        }
      })();
      const arr = map[annotation.lineNumber] ?? [];
      map[annotation.lineNumber] = arr;
      arr.push(annotation);
    }
  }
  /**
  * Returns true when a session-mode pass changed the region skeleton itself
  * (a gap edit synthesized or merged regions), which changes the rendered
  * row set without a line-count change — the host must escalate to a full
  * re-render instead of its cheap refresh path.
  */
  updateRenderCache(dirtyLines, themeType, lineCountChangeInFlight = false) {
    if (this.renderCache == null) return false;
    const { result, diff } = this.renderCache;
    if (result == null) return false;
    if (diff.isPartial) throw new Error("Could not update render cache for partial diff");
    const hastLines = result.code.additionLines;
    const changedAdditionLines = [];
    const previousAdditionLines = /* @__PURE__ */ new Map();
    for (const [line, tokens] of dirtyLines) {
      const prevProps = hastLines[line]?.properties ?? {};
      const lineText = tokens.map((a) => a[2]).join("");
      const canSyncDiffLine = line < diff.additionLines.length;
      const prevLine = canSyncDiffLine ? diff.additionLines[line] ?? "" : "";
      const prevText = cleanLastNewline(prevLine);
      if (canSyncDiffLine) {
        diff.additionLines[line] = applyLineTextWithNewline(prevLine, lineText);
        if (prevText !== lineText) {
          changedAdditionLines.push(line);
          previousAdditionLines.set(line, prevLine);
        }
      }
      hastLines[line] = {
        type: "element",
        tagName: "div",
        properties: {
          "data-line": prevProps["data-line"] ?? line + 1,
          "data-line-index": prevProps["data-line-index"] ?? line,
          "data-line-type": prevProps["data-line-type"] ?? "context"
        },
        children: tokens.map(([char, fg, text2]) => {
          if (char === 0 && fg === "") {
            if (text2 === "") return {
              type: "element",
              tagName: "br",
              properties: {},
              children: []
            };
            return {
              type: "text",
              value: text2
            };
          }
          return {
            type: "element",
            tagName: "span",
            properties: {
              "data-char": char,
              style: `color:${fg};`
            },
            children: [{
              type: "text",
              value: text2
            }]
          };
        })
      };
    }
    let regionsChanged = false;
    if (changedAdditionLines.length > 0) if (this.editSessionActive && !diff.isPartial) {
      if (!lineCountChangeInFlight) if (diff.additionLines.length <= 1 && diff.additionLines.join("") === "") {
        Object.assign(diff, recomputeEmptyDocumentDiff(diff, this.options.parseDiffOptions));
        this.markEditSessionPass(diff);
        regionsChanged = true;
      } else if (shouldTopAlignAdditionRecompute(diff, diff.additionLines)) {
        Object.assign(diff, recomputeTopAlignedAdditionDiff(diff, diff.additionLines, this.options.parseDiffOptions));
        this.markEditSessionPass(diff);
        regionsChanged = true;
      } else {
        const change = applySessionChangedLines(diff, changedAdditionLines, this.options.parseDiffOptions, previousAdditionLines);
        this.applyExpansionRemap(change);
        regionsChanged = change != null;
      }
    } else Object.assign(diff, updateDiffHunks(diff, changedAdditionLines, this.options.parseDiffOptions));
    result.baseThemeType = themeType;
    this.renderCache.isDirty = true;
    return regionsChanged;
  }
  applyExpansionRemap(change) {
    if (change != null) this.expandedHunks = remapExpandedHunksForRegionChange(this.expandedHunks, change);
  }
  applyDocumentChange(textDocument) {
    if (this.renderCache == null) return;
    const { diff, result } = this.renderCache;
    if (result == null) return;
    if (diff.isPartial) throw new Error("Could not apply document change for partial diff");
    const { additionLines: previousAdditionLines } = diff;
    diff.additionLines = getEditorDocumentLines(textDocument, previousAdditionLines);
    result.code.additionLines = realignAdditionHastLines(previousAdditionLines, diff.additionLines, result.code.additionLines, textDocument);
    if (diff.additionLines.length <= 1 && diff.additionLines.join("") === "") {
      Object.assign(diff, recomputeEmptyDocumentDiff(diff, this.options.parseDiffOptions));
      result.code.additionLines[0] = createPlainAdditionLineElement(0, textDocument);
      this.markEditSessionPass(diff);
    } else if (this.editSessionActive) this.applySessionDocumentChange(diff);
    else Object.assign(diff, recomputeDiffHunksForEdit(diff, this.options.parseDiffOptions));
    this.renderCache.isDirty = true;
  }
  applySessionDocumentChange(diff) {
    const { parseDiffOptions } = this.options;
    const rawLines = diff.additionLines;
    if (shouldTopAlignAdditionRecompute(diff, rawLines)) {
      Object.assign(diff, recomputeTopAlignedAdditionDiff(diff, rawLines, parseDiffOptions));
      this.markEditSessionPass(diff);
      return;
    }
    this.applyExpansionRemap(rebuildSessionHunks(diff, parseDiffOptions));
  }
  markEditSessionPass(diff) {
    if (!this.editSessionActive) return;
    diff.editSessionDirty = true;
  }
  getUnifiedLineDecoration({ lineType }) {
    return {
      gutterLineType: lineType,
      contentProperties: { "data-line-type": lineType }
    };
  }
  getSplitLineDecoration({ side, type }) {
    const lineType = type === "change" ? side === "deletions" ? "change-deletion" : "change-addition" : type;
    return {
      gutterLineType: lineType,
      contentProperties: { "data-line-type": lineType }
    };
  }
  createAnnotationElement = (span) => {
    return createAnnotationElement(span);
  };
  getOptionsWithDefaults() {
    const { diffIndicators = "bars", diffStyle = "split", disableBackground = false, disableFileHeader = false, disableLineNumbers = false, disableVirtualizationBuffers = false, collapsed = false, expandUnchanged = false, collapsedContextThreshold = 1, expansionLineCount = 100, hunkSeparators = "line-info", lineDiffType = "word-alt", maxLineDiffLength = 1e3, overflow = "scroll", stickyHeader = false, theme = DEFAULT_THEMES, headerRenderMode = "default", tokenizeMaxLineLength = 1e3, tokenizeMaxLength = DEFAULT_TOKENIZE_MAX_LENGTH, useTokenTransformer = false, useCSSClasses = false } = this.options;
    return {
      diffIndicators,
      diffStyle,
      disableBackground,
      disableFileHeader,
      disableLineNumbers,
      disableVirtualizationBuffers,
      collapsed,
      expandUnchanged,
      collapsedContextThreshold,
      expansionLineCount,
      hunkSeparators,
      lineDiffType,
      maxLineDiffLength,
      overflow,
      stickyHeader,
      theme: this.workerManager?.getDiffRenderOptions().theme ?? theme,
      headerRenderMode,
      tokenizeMaxLineLength,
      tokenizeMaxLength,
      useTokenTransformer,
      useCSSClasses
    };
  }
  async initializeHighlighter() {
    this.highlighter = await getSharedHighlighter(getHighlighterOptions(this.computedLang, {
      theme: this.getLocalHighlightTheme(),
      preferredHighlighter: this.workerManager?.getPreferredHighlighter() ?? this.options.preferredHighlighter
    }));
    return this.highlighter;
  }
  hydrate(diff) {
    if (diff == null) return;
    this.diff = diff;
    const { options } = this.getRenderOptions(diff);
    const massiveDiff = isDiffMassive(diff, this.getTokenizeMaxLength());
    let cache2 = this.workerManager?.getDiffResultCache(diff);
    if (cache2 != null && !areDiffRenderOptionsEqual(options, cache2.options)) cache2 = void 0;
    this.renderCache ??= {
      diff,
      highlighted: !massiveDiff && !isDiffPlainText(diff),
      options,
      result: massiveDiff ? void 0 : cache2?.result,
      renderRange: void 0
    };
    if (!this.editSessionActive && this.workerManager?.isWorkingPool() === true) {
      if (this.renderCache.result == null && !massiveDiff) this.workerManager.highlightDiffAST(this, this.diff);
    } else if (this.highlighter == null) {
      this.computedLang = diff.lang ?? getFiletypeFromFileName(diff.name);
      this.initializeHighlighter();
    }
  }
  getLocalHighlightTheme() {
    return this.workerManager?.getDiffRenderOptions().theme ?? this.options.theme ?? DEFAULT_THEMES;
  }
  getEffectiveCodeOptions() {
    const poolOptions = this.workerManager?.isWorkingPool() === true ? this.workerManager.getDiffRenderOptions() : void 0;
    return {
      theme: this.getLocalHighlightTheme(),
      tokenizeMaxLineLength: poolOptions?.tokenizeMaxLineLength ?? this.options.tokenizeMaxLineLength
    };
  }
  getRenderOptions(diff) {
    const options = (() => {
      if (this.workerManager?.isWorkingPool() === true) {
        const poolOptions = this.workerManager.getDiffRenderOptions();
        if (this.editSessionActive && poolOptions.useTokenTransformer !== true) return {
          ...poolOptions,
          useTokenTransformer: true
        };
        return poolOptions;
      }
      const { theme, tokenizeMaxLineLength, lineDiffType, maxLineDiffLength } = this.getOptionsWithDefaults();
      return {
        theme,
        useTokenTransformer: this.editSessionActive || this.options.useTokenTransformer === true,
        tokenizeMaxLineLength,
        lineDiffType,
        maxLineDiffLength
      };
    })();
    this.getOptionsWithDefaults();
    const { renderCache } = this;
    if (renderCache?.result == null) return {
      options,
      forceHighlight: true
    };
    if (!areDiffTargetsEqual(diff, renderCache.diff) || !areDiffRenderOptionsEqual(options, renderCache.options)) return {
      options,
      forceHighlight: true
    };
    return {
      options,
      forceHighlight: false
    };
  }
  renderDiff(diff = this.renderCache?.diff, renderRange = DEFAULT_RENDER_RANGE) {
    if (diff == null) return;
    const { expandUnchanged, collapsedContextThreshold } = this.getOptionsWithDefaults();
    let { options, forceHighlight } = this.getRenderOptions(diff);
    const cache2 = this.getMatchingWorkerResultCache(diff, options);
    if (cache2 != null && !this.hasHighlightedRenderCache(diff, options)) {
      this.renderCache = {
        diff,
        highlighted: true,
        renderRange: void 0,
        ...cache2
      };
      forceHighlight = false;
    }
    this.renderCache ??= {
      diff,
      highlighted: false,
      options,
      result: void 0,
      renderRange: void 0
    };
    const hasContent = diff.additionLines.length > 0 || diff.deletionLines.length > 0;
    const forcePlainText = !hasContent || isDiffPlainText(diff) || isDiffMassive(diff, this.getTokenizeMaxLength());
    const newContent = !areDiffTargetsEqual(diff, this.renderCache.diff);
    const newRenderRange = !areRenderRangesEqual(this.renderCache.renderRange, renderRange);
    if (!this.editSessionActive && this.workerManager?.isWorkingPool() === true) {
      const highlightPending = this.renderCache.result == null && this.renderCache.highlighted && !forcePlainText && !newContent && isDefaultRenderRange(renderRange);
      if (highlightPending) this.renderCache.highlightPending = true;
      if (!highlightPending && (forcePlainText || this.renderCache.result == null || !this.renderCache.highlighted && (newContent || newRenderRange))) {
        this.renderCache.diff = diff;
        this.renderCache.options = options;
        this.renderCache.highlighted = false;
        if (this.renderCache.result == null || newContent || newRenderRange || forceHighlight) this.renderCache.result = this.workerManager.getPlainDiffAST(diff, renderRange.startingLine, renderRange.totalLines, isDefaultRenderRange(renderRange) ? true : expandUnchanged ? true : this.expandedHunks, collapsedContextThreshold);
        this.renderCache.renderRange = renderRange;
      }
      if (!forcePlainText && hasContent && (!this.renderCache.highlighted || forceHighlight)) this.workerManager.highlightDiffAST(this, diff);
    } else {
      this.computedLang = diff.lang ?? getFiletypeFromFileName(diff.name);
      const hasThemes = this.highlighter != null && areThemesAttached(options.theme);
      const hasLangs = this.highlighter != null && areLanguagesAttached(this.computedLang);
      const canHighlight = !forcePlainText && hasLangs;
      if (this.highlighter != null && hasThemes && (forceHighlight || forcePlainText || !this.renderCache.highlighted && canHighlight || this.renderCache.result == null)) {
        const { result, options: options2 } = this.renderDiffWithHighlighter(diff, this.highlighter, forcePlainText || !hasLangs);
        this.renderCache = {
          diff,
          options: options2,
          highlighted: canHighlight,
          result,
          renderRange: void 0
        };
      }
      if (!hasThemes || !forcePlainText && !hasLangs) this.asyncHighlight(diff).then(({ result, options: options2 }) => {
        if (this.renderCache != null) this.renderCache.highlighted = false;
        this.applyHighlightResult(diff, result, options2, !forcePlainText);
      });
    }
    return this.renderCache.result != null ? this.processDiffResult(this.renderCache.diff, renderRange, this.renderCache.result) : void 0;
  }
  async asyncRender(diff, renderRange = DEFAULT_RENDER_RANGE) {
    const { result } = await this.asyncHighlight(diff);
    return this.processDiffResult(diff, renderRange, result);
  }
  createPreElement(split, totalLines, customProperties) {
    const { diffIndicators, disableBackground, disableLineNumbers, overflow } = this.getOptionsWithDefaults();
    return createPreElement({
      type: "diff",
      diffIndicators,
      disableBackground,
      disableLineNumbers,
      overflow,
      split,
      totalLines,
      customProperties
    });
  }
  async asyncHighlight(diff) {
    const forcePlainText = isDiffMassive(diff, this.getTokenizeMaxLength());
    this.computedLang = forcePlainText ? "text" : diff.lang ?? getFiletypeFromFileName(diff.name);
    const hasThemes = this.highlighter != null && areThemesAttached(this.getLocalHighlightTheme());
    const hasLangs = forcePlainText || this.highlighter != null && areLanguagesAttached(this.computedLang);
    if (this.highlighter == null || !hasThemes || !hasLangs) this.highlighter = await this.initializeHighlighter();
    return this.renderDiffWithHighlighter(diff, this.highlighter, forcePlainText);
  }
  renderDiffWithHighlighter(diff, highlighter2, forcePlainText = false) {
    const { options } = this.getRenderOptions(diff);
    const { collapsedContextThreshold } = this.getOptionsWithDefaults();
    return {
      result: renderDiffWithHighlighter(diff, highlighter2, options, {
        forcePlainText,
        expandedHunks: forcePlainText ? true : void 0,
        collapsedContextThreshold
      }),
      options
    };
  }
  onHighlightSuccess(diff, result, options, highlighted = true) {
    if (this.editSessionActive) return;
    this.applyHighlightResult(diff, result, options, highlighted);
  }
  applyHighlightResult(diff, result, options, highlighted = true) {
    if (this.renderCache == null) return;
    const triggerRenderUpdate = this.renderCache.highlightPending === true || !this.renderCache.highlighted || !areDiffRenderOptionsEqual(this.renderCache.options, options) || !areDiffTargetsEqual(this.renderCache.diff, diff);
    this.renderCache = {
      diff,
      options,
      highlighted,
      result,
      renderRange: void 0
    };
    if (triggerRenderUpdate) this.onRenderUpdate?.();
  }
  getMatchingWorkerResultCache(diff, options) {
    if (this.editSessionActive) return;
    const cache2 = this.workerManager?.getDiffResultCache(diff);
    if (cache2 == null || !areDiffRenderOptionsEqual(options, cache2.options)) return;
    return cache2;
  }
  hasHighlightedRenderCache(diff, options) {
    const { renderCache } = this;
    return renderCache?.result != null && renderCache.highlighted && areDiffTargetsEqual(diff, renderCache.diff) && areDiffRenderOptionsEqual(options, renderCache.options);
  }
  onHighlightError(error) {
    console.error(error);
  }
  getTokenizeMaxLength() {
    return this.options.tokenizeMaxLength ?? 1e5;
  }
  processDiffResult(fileDiff, renderRange, { code, themeStyles, baseThemeType }) {
    const { diffStyle, disableFileHeader, expandUnchanged, expansionLineCount, collapsedContextThreshold, hunkSeparators } = this.getOptionsWithDefaults();
    const isRenderCacheDirty = this.renderCache?.isDirty ?? false;
    this.diff = fileDiff;
    const unified = diffStyle === "unified";
    const canHydrateContext = canHydrateCollapsedContext$1(fileDiff, this.options.loadDiffFiles != null);
    const isExpandableDiff = !fileDiff.isPartial || canHydrateContext;
    let additionsContentAST = [];
    let deletionsContentAST = [];
    let unifiedContentAST = [];
    const hunkData = [];
    const { additionLines, deletionLines } = code;
    const context = {
      rowCount: 0,
      hunkSeparators,
      additionsContentAST,
      deletionsContentAST,
      unifiedContentAST,
      unifiedGutterAST: createGutterWrapper(),
      deletionsGutterAST: createGutterWrapper(),
      additionsGutterAST: createGutterWrapper(),
      expansionLineCount,
      hunkData,
      incrementRowCount(count = 1) {
        context.rowCount += count;
      },
      pushToGutter(type, element2) {
        switch (type) {
          case "unified":
            context.unifiedGutterAST.children.push(element2);
            break;
          case "deletions":
            context.deletionsGutterAST.children.push(element2);
            break;
          case "additions":
            context.additionsGutterAST.children.push(element2);
            break;
        }
      }
    };
    const trailingRangeSize = getTrailingContextRangeSize({
      fileDiff,
      errorPrefix: "DiffHunksRenderer.processDiffResult"
    });
    const pendingSplitContext = {
      size: 0,
      side: void 0,
      increment() {
        this.size += 1;
      },
      flush() {
        if (diffStyle === "unified") return;
        if (this.size <= 0 || this.side == null) {
          this.side = void 0;
          this.size = 0;
          return;
        }
        if (this.side === "additions") {
          context.pushToGutter("additions", createGutterGap(void 0, "buffer", this.size));
          additionsContentAST?.push(createEmptyRowBuffer(this.size));
        } else {
          context.pushToGutter("deletions", createGutterGap(void 0, "buffer", this.size));
          deletionsContentAST?.push(createEmptyRowBuffer(this.size));
        }
        this.size = 0;
        this.side = void 0;
      }
    };
    const pushGutterLineNumber = (type, lineType, lineNumber, lineIndex, gutterProperties) => {
      context.pushToGutter(type, createGutterItem(lineType, lineNumber, lineIndex, gutterProperties));
    };
    function pushSeparators(props) {
      pendingSplitContext.flush();
      if (diffStyle === "unified") pushSeparator("unified", props, context);
      else {
        pushSeparator("deletions", props, context);
        pushSeparator("additions", props, context);
      }
    }
    this.pushFileLevelAnnotations(fileDiff, diffStyle, renderRange, context);
    iterateOverDiff({
      diff: fileDiff,
      diffStyle,
      startingLine: renderRange.startingLine,
      totalLines: renderRange.totalLines,
      expandedHunks: expandUnchanged ? true : this.expandedHunks,
      collapsedContextThreshold,
      callback: ({ hunkIndex, hunk, collapsedBefore, collapsedAfter, additionLine, deletionLine, type }) => {
        const splitLineIndex = deletionLine != null ? deletionLine.splitLineIndex : additionLine.splitLineIndex;
        const unifiedLineIndex = additionLine != null ? additionLine.unifiedLineIndex : deletionLine.unifiedLineIndex;
        if (diffStyle === "split" && type !== "change") pendingSplitContext.flush();
        if (collapsedBefore > 0) pushSeparators({
          hunkIndex,
          collapsedLines: collapsedBefore,
          rangeSize: Math.max(hunk?.collapsedBefore ?? 0, 0),
          hunkSpecs: hunk?.hunkSpecs,
          isFirstHunk: hunkIndex === 0,
          isLastHunk: false,
          isExpandable: isExpandableDiff
        });
        const lineIndex = diffStyle === "unified" ? unifiedLineIndex : splitLineIndex;
        const renderedLineContext = {
          type,
          hunkIndex,
          lineIndex,
          unifiedLineIndex,
          splitLineIndex,
          deletionLine,
          additionLine
        };
        if (diffStyle === "unified") {
          const injectedRows = this.getUnifiedInjectedRowsForLine?.(renderedLineContext);
          if (injectedRows?.before != null) pushUnifiedInjectedRows(injectedRows.before, context);
          let deletionLineContent = deletionLine != null ? deletionLines[deletionLine.lineIndex] : void 0;
          let additionLineContent = additionLine != null ? additionLines[additionLine.lineIndex] : void 0;
          if (deletionLineContent == null && additionLineContent == null) {
            const errorMessage = "DiffHunksRenderer.processDiffResult: deletionLine and additionLine are null, something is wrong";
            console.error(errorMessage, { file: fileDiff.name });
            throw new Error(errorMessage);
          }
          const lineType = type === "change" ? additionLine != null ? "change-addition" : "change-deletion" : type;
          const lineDecoration = this.getUnifiedLineDecoration({
            type,
            lineType,
            additionLineIndex: additionLine?.lineIndex,
            deletionLineIndex: deletionLine?.lineIndex
          });
          pushGutterLineNumber("unified", lineDecoration.gutterLineType, additionLine != null ? additionLine.lineNumber : deletionLine.lineNumber, `${unifiedLineIndex},${splitLineIndex}`, lineDecoration.gutterProperties);
          if (additionLineContent != null) additionLineContent = withContentProperties(additionLineContent, lineDecoration.contentProperties, isRenderCacheDirty && additionLine != null ? {
            "data-line": additionLine.lineNumber,
            "data-line-index": `${unifiedLineIndex},${splitLineIndex}`
          } : void 0);
          else if (deletionLineContent != null) deletionLineContent = withContentProperties(deletionLineContent, lineDecoration.contentProperties, isRenderCacheDirty && deletionLine != null ? {
            "data-line": deletionLine.lineNumber,
            "data-line-index": `${unifiedLineIndex},${splitLineIndex}`
          } : void 0);
          pushLineWithAnnotation({
            diffStyle: "unified",
            type,
            deletionLine: deletionLineContent,
            additionLine: additionLineContent,
            unifiedSpan: this.getAnnotations("unified", deletionLine?.lineNumber, additionLine?.lineNumber, hunkIndex, lineIndex),
            createAnnotationElement: (span) => this.createAnnotationElement(span),
            context
          });
          if (injectedRows?.after != null) pushUnifiedInjectedRows(injectedRows.after, context);
        } else {
          const injectedRows = this.getSplitInjectedRowsForLine?.(renderedLineContext);
          if (injectedRows?.before != null) pushSplitInjectedRows(injectedRows.before, context, pendingSplitContext);
          let deletionLineContent = deletionLine != null ? deletionLines[deletionLine.lineIndex] : void 0;
          let additionLineContent = additionLine != null ? additionLines[additionLine.lineIndex] : void 0;
          const deletionLineDecoration = this.getSplitLineDecoration({
            side: "deletions",
            type,
            lineIndex: deletionLine?.lineIndex
          });
          const additionLineDecoration = this.getSplitLineDecoration({
            side: "additions",
            type,
            lineIndex: additionLine?.lineIndex
          });
          if (deletionLineContent == null && additionLineContent == null) {
            const errorMessage = "DiffHunksRenderer.processDiffResult: deletionLine and additionLine are null, something is wrong";
            console.error(errorMessage, { file: fileDiff.name });
            throw new Error(errorMessage);
          }
          const missingSide = (() => {
            if (type === "change") {
              if (additionLineContent == null) return "additions";
              else if (deletionLineContent == null) return "deletions";
            }
          })();
          if (missingSide != null) {
            if (pendingSplitContext.side != null && pendingSplitContext.side !== missingSide) pendingSplitContext.flush();
            pendingSplitContext.side = missingSide;
            pendingSplitContext.increment();
          } else if (type === "change") pendingSplitContext.flush();
          const annotationSpans = this.getAnnotations("split", deletionLine?.lineNumber, additionLine?.lineNumber, hunkIndex, lineIndex);
          if (annotationSpans != null && pendingSplitContext.size > 0) pendingSplitContext.flush();
          if (deletionLine != null) {
            const deletionLineDecorated = withContentProperties(deletionLineContent, deletionLineDecoration.contentProperties, isRenderCacheDirty ? {
              "data-line": deletionLine.lineNumber,
              "data-line-index": `${deletionLine.unifiedLineIndex},${splitLineIndex}`
            } : void 0);
            pushGutterLineNumber("deletions", deletionLineDecoration.gutterLineType, deletionLine.lineNumber, `${deletionLine.unifiedLineIndex},${splitLineIndex}`, deletionLineDecoration.gutterProperties);
            if (deletionLineDecorated != null) deletionLineContent = deletionLineDecorated;
          }
          if (additionLine != null) {
            const additionLineDecorated = withContentProperties(additionLineContent, additionLineDecoration.contentProperties, isRenderCacheDirty ? {
              "data-line": additionLine.lineNumber,
              "data-line-index": `${additionLine.unifiedLineIndex},${splitLineIndex}`
            } : void 0);
            pushGutterLineNumber("additions", additionLineDecoration.gutterLineType, additionLine.lineNumber, `${additionLine.unifiedLineIndex},${splitLineIndex}`, additionLineDecoration.gutterProperties);
            if (additionLineDecorated != null) additionLineContent = additionLineDecorated;
          }
          pushLineWithAnnotation({
            diffStyle: "split",
            type,
            additionLine: additionLineContent,
            deletionLine: deletionLineContent,
            ...annotationSpans,
            createAnnotationElement: (span) => this.createAnnotationElement(span),
            context
          });
          if (injectedRows?.after != null) pushSplitInjectedRows(injectedRows.after, context, pendingSplitContext);
        }
        const isFinalSplitHunkRow = diffStyle === "split" && hunk != null && splitLineIndex === hunk.splitLineStart + hunk.splitLineCount - 1;
        const isFinalHunkRow = hunkIndex === fileDiff.hunks.length - 1 && hunk != null && (diffStyle === "split" ? splitLineIndex === hunk.splitLineStart + hunk.splitLineCount - 1 : unifiedLineIndex === hunk.unifiedLineStart + hunk.unifiedLineCount - 1);
        const splitNoEOFCRDeletion = isFinalSplitHunkRow ? hunk.noEOFCRDeletions : false;
        const splitNoEOFCRAddition = isFinalSplitHunkRow ? hunk.noEOFCRAdditions : false;
        const noEOFCRDeletion = (deletionLine?.noEOFCR ?? false) || splitNoEOFCRDeletion;
        const noEOFCRAddition = (additionLine?.noEOFCR ?? false) || splitNoEOFCRAddition;
        if (noEOFCRAddition || noEOFCRDeletion) {
          if (diffStyle === "split") pendingSplitContext.flush();
          if (noEOFCRDeletion) {
            const noEOFType = type === "context" || type === "context-expanded" ? type : "change-deletion";
            if (diffStyle === "unified") {
              context.unifiedContentAST.push(createNoNewlineElement(noEOFType));
              context.pushToGutter("unified", createGutterGap(noEOFType, "metadata", 1));
            } else {
              context.deletionsContentAST.push(createNoNewlineElement(noEOFType));
              context.pushToGutter("deletions", createGutterGap(noEOFType, "metadata", 1));
              if (!noEOFCRAddition) {
                context.pushToGutter("additions", createGutterGap(void 0, "buffer", 1));
                context.additionsContentAST.push(createEmptyRowBuffer(1));
              }
            }
          }
          if (noEOFCRAddition) {
            const noEOFType = type === "context" || type === "context-expanded" ? type : "change-addition";
            if (diffStyle === "unified") {
              context.unifiedContentAST.push(createNoNewlineElement(noEOFType));
              context.pushToGutter("unified", createGutterGap(noEOFType, "metadata", 1));
            } else {
              context.additionsContentAST.push(createNoNewlineElement(noEOFType));
              context.pushToGutter("additions", createGutterGap(noEOFType, "metadata", 1));
              if (!noEOFCRDeletion) {
                context.pushToGutter("deletions", createGutterGap(void 0, "buffer", 1));
                context.deletionsContentAST.push(createEmptyRowBuffer(1));
              }
            }
          }
          context.incrementRowCount(1);
        }
        if (hunkSeparators !== "simple" && hunkSeparators !== "metadata" && (collapsedAfter > 0 || isFinalHunkRow && canHydrateContext)) pushSeparators({
          hunkIndex: type === "context-expanded" ? hunkIndex : hunkIndex + 1,
          collapsedLines: isFinalHunkRow && canHydrateContext ? "unknown" : collapsedAfter,
          rangeSize: trailingRangeSize,
          hunkSpecs: void 0,
          isFirstHunk: false,
          isLastHunk: true,
          isExpandable: isExpandableDiff
        });
        context.incrementRowCount(1);
      }
    });
    if (diffStyle === "split") pendingSplitContext.flush();
    const totalLines = Math.max(getTotalLineCountFromHunks(fileDiff.hunks), fileDiff.additionLines.length ?? 0, fileDiff.deletionLines.length ?? 0);
    const hasBuffer = renderRange.bufferBefore > 0 || renderRange.bufferAfter > 0;
    const shouldIncludeAdditions = !unified && fileDiff.type !== "deleted";
    const shouldIncludeDeletions = !unified && fileDiff.type !== "new";
    const hasContent = context.rowCount > 0 || hasBuffer;
    additionsContentAST = shouldIncludeAdditions && hasContent ? additionsContentAST : void 0;
    deletionsContentAST = shouldIncludeDeletions && hasContent ? deletionsContentAST : void 0;
    unifiedContentAST = unified && hasContent ? unifiedContentAST : void 0;
    const preNode = this.createPreElement(deletionsContentAST != null && additionsContentAST != null, totalLines);
    return {
      unifiedGutterAST: unified && hasContent ? context.unifiedGutterAST.children : void 0,
      unifiedContentAST,
      deletionsGutterAST: shouldIncludeDeletions && hasContent ? context.deletionsGutterAST.children : void 0,
      deletionsContentAST,
      additionsGutterAST: shouldIncludeAdditions && hasContent ? context.additionsGutterAST.children : void 0,
      additionsContentAST,
      hunkData,
      preNode,
      themeStyles,
      baseThemeType,
      headerElement: !disableFileHeader ? this.renderHeader(this.diff) : void 0,
      totalLines,
      rowCount: context.rowCount,
      bufferBefore: renderRange.bufferBefore,
      bufferAfter: renderRange.bufferAfter,
      css: ""
    };
  }
  renderCodeAST(type, result) {
    const gutterAST = type === "unified" ? result.unifiedGutterAST : type === "deletions" ? result.deletionsGutterAST : result.additionsGutterAST;
    const contentAST = type === "unified" ? result.unifiedContentAST : type === "deletions" ? result.deletionsContentAST : result.additionsContentAST;
    if (gutterAST == null || contentAST == null) return;
    const gutter = createGutterWrapper(gutterAST);
    gutter.properties.style = `grid-row: span ${result.rowCount}`;
    return [gutter, createContentColumn(contentAST, result.rowCount)];
  }
  renderFullAST(result, children = []) {
    const containerSize = this.getOptionsWithDefaults().hunkSeparators === "line-info";
    const unifiedAST = this.renderCodeAST("unified", result);
    if (unifiedAST != null) {
      children.push(createHastElement({
        tagName: "code",
        children: unifiedAST,
        properties: {
          "data-code": "",
          "data-container-size": containerSize ? "" : void 0,
          "data-unified": ""
        }
      }));
      return {
        ...result.preNode,
        children
      };
    }
    const deletionsAST = this.renderCodeAST("deletions", result);
    if (deletionsAST != null) children.push(createHastElement({
      tagName: "code",
      children: deletionsAST,
      properties: {
        "data-code": "",
        "data-container-size": containerSize ? "" : void 0,
        "data-deletions": ""
      }
    }));
    const additionsAST = this.renderCodeAST("additions", result);
    if (additionsAST != null) children.push(createHastElement({
      tagName: "code",
      children: additionsAST,
      properties: {
        "data-code": "",
        "data-container-size": containerSize ? "" : void 0,
        "data-additions": ""
      }
    }));
    return {
      ...result.preNode,
      children
    };
  }
  renderFullHTML(result, tempChildren = []) {
    return toHtml(this.renderFullAST(result, tempChildren));
  }
  renderPartialHTML(children, columnType) {
    if (columnType == null) return toHtml(children);
    return toHtml(createHastElement({
      tagName: "code",
      children,
      properties: {
        "data-code": "",
        "data-container-size": this.getOptionsWithDefaults().hunkSeparators === "line-info" ? "" : void 0,
        [`data-${columnType}`]: ""
      }
    }));
  }
  pushFileLevelAnnotations(fileDiff, diffStyle, renderRange, context) {
    if (!shouldRenderFileAnnotations(renderRange)) return;
    const deletionAnnotationNames = fileDiff.type !== "new" ? getAnnotationNames(getFileAnnotations(this.deletionAnnotations)) : [];
    const additionAnnotationNames = fileDiff.type !== "deleted" ? getAnnotationNames(getFileAnnotations(this.additionAnnotations)) : [];
    if (deletionAnnotationNames.length === 0 && additionAnnotationNames.length === 0) return;
    const hunkIndex = -1;
    const lineIndex = -1;
    const { createAnnotationElement: createAnnotationElement2 } = this;
    if (diffStyle === "unified") {
      pushLineWithAnnotation({
        diffStyle,
        type: "context",
        unifiedSpan: {
          type: "annotation",
          hunkIndex,
          lineIndex,
          annotations: deletionAnnotationNames.concat(additionAnnotationNames)
        },
        createAnnotationElement: createAnnotationElement2,
        context
      });
      return;
    }
    pushLineWithAnnotation({
      diffStyle,
      type: "context",
      deletionSpan: {
        type: "annotation",
        hunkIndex,
        lineIndex,
        annotations: deletionAnnotationNames
      },
      additionSpan: {
        type: "annotation",
        hunkIndex,
        lineIndex,
        annotations: additionAnnotationNames
      },
      createAnnotationElement: createAnnotationElement2,
      context
    });
  }
  getAnnotations(type, deletionLineNumber, additionLineNumber, hunkIndex, lineIndex) {
    const deletionSpan = {
      type: "annotation",
      hunkIndex,
      lineIndex,
      annotations: []
    };
    if (deletionLineNumber != null) for (const anno of this.deletionAnnotations[deletionLineNumber] ?? []) deletionSpan.annotations.push(getLineAnnotationName(anno));
    const additionSpan = {
      type: "annotation",
      hunkIndex,
      lineIndex,
      annotations: []
    };
    if (additionLineNumber != null) for (const anno of this.additionAnnotations[additionLineNumber] ?? []) (type === "unified" ? deletionSpan : additionSpan).annotations.push(getLineAnnotationName(anno));
    if (type === "unified") {
      if (deletionSpan.annotations.length > 0) return deletionSpan;
      return;
    }
    if (additionSpan.annotations.length === 0 && deletionSpan.annotations.length === 0) return;
    return {
      deletionSpan,
      additionSpan
    };
  }
  renderHeader(diff) {
    const { headerRenderMode, stickyHeader } = this.getOptionsWithDefaults();
    return createFileHeaderElement({
      fileOrDiff: diff,
      mode: headerRenderMode,
      stickyHeader
    });
  }
};
function getAnnotationNames(annotations) {
  return annotations?.map((annotation) => getLineAnnotationName(annotation)) ?? [];
}
const EN_PLURAL_RULES = new Intl.PluralRules("en-US");
function getModifiedLinesString(lines) {
  return `${lines} unmodified line${EN_PLURAL_RULES.select(lines) === "one" ? "" : "s"}`;
}
function pushUnifiedInjectedRows(rows, context) {
  for (const row of rows) {
    context.unifiedContentAST.push(row.content);
    context.pushToGutter("unified", row.gutter);
    context.incrementRowCount(1);
  }
}
function pushSplitInjectedRows(rows, context, pendingSplitContext) {
  for (const { deletion, addition } of rows) {
    if (deletion == null && addition == null) continue;
    const missingSide = deletion != null && addition != null ? void 0 : deletion == null ? "deletions" : "additions";
    if (missingSide == null || pendingSplitContext.side !== missingSide) pendingSplitContext.flush();
    if (deletion != null) {
      context.deletionsContentAST.push(deletion.content);
      context.pushToGutter("deletions", deletion.gutter);
    }
    if (addition != null) {
      context.additionsContentAST.push(addition.content);
      context.pushToGutter("additions", addition.gutter);
    }
    if (missingSide != null) {
      pendingSplitContext.side = missingSide;
      pendingSplitContext.increment();
    }
    context.incrementRowCount(1);
  }
}
function pushLineWithAnnotation({ diffStyle, type, deletionLine, additionLine, unifiedSpan, deletionSpan, additionSpan, createAnnotationElement: createAnnotationElement2, context }) {
  let hasAnnotationRow = false;
  if (diffStyle === "unified") {
    if (additionLine != null) context.unifiedContentAST.push(additionLine);
    else if (deletionLine != null) context.unifiedContentAST.push(deletionLine);
    if (unifiedSpan != null) {
      const lineType = type === "change" ? deletionLine != null ? "change-deletion" : "change-addition" : type;
      context.unifiedContentAST.push(createAnnotationElement2(unifiedSpan));
      context.pushToGutter("unified", createGutterGap(lineType, "annotation", 1));
      hasAnnotationRow = true;
    }
  } else if (diffStyle === "split") {
    if (deletionLine != null) context.deletionsContentAST.push(deletionLine);
    if (additionLine != null) context.additionsContentAST.push(additionLine);
    if (deletionSpan != null) {
      const lineType = type === "change" ? deletionLine != null ? "change-deletion" : "context" : type;
      context.deletionsContentAST.push(createAnnotationElement2(deletionSpan));
      context.pushToGutter("deletions", createGutterGap(lineType, "annotation", 1));
      hasAnnotationRow = true;
    }
    if (additionSpan != null) {
      const lineType = type === "change" ? additionLine != null ? "change-addition" : "context" : type;
      context.additionsContentAST.push(createAnnotationElement2(additionSpan));
      context.pushToGutter("additions", createGutterGap(lineType, "annotation", 1));
      hasAnnotationRow = true;
    }
  }
  if (hasAnnotationRow) context.incrementRowCount(1);
}
function pushSeparator(type, { hunkIndex, collapsedLines, rangeSize, hunkSpecs, isFirstHunk, isLastHunk, isExpandable }, context) {
  if (typeof collapsedLines === "number" && collapsedLines <= 0) return;
  const linesAST = type === "unified" ? context.unifiedContentAST : type === "deletions" ? context.deletionsContentAST : context.additionsContentAST;
  if (context.hunkSeparators === "metadata") {
    if (hunkSpecs != null) {
      context.pushToGutter(type, createSeparator({
        type: "metadata",
        content: hunkSpecs,
        isFirstHunk,
        isLastHunk
      }));
      linesAST.push(createSeparator({
        type: "metadata",
        content: hunkSpecs,
        isFirstHunk,
        isLastHunk
      }));
      if (type !== "additions") context.incrementRowCount(1);
    }
    return;
  }
  if (context.hunkSeparators === "simple") {
    if (hunkIndex > 0) {
      context.pushToGutter(type, createSeparator({
        type: "simple",
        isFirstHunk,
        isLastHunk: false
      }));
      linesAST.push(createSeparator({
        type: "simple",
        isFirstHunk,
        isLastHunk: false
      }));
      if (type !== "additions") context.incrementRowCount(1);
    }
    return;
  }
  const slotName = getHunkSeparatorSlotName(type, hunkIndex);
  const chunked = rangeSize > context.expansionLineCount;
  const expandIndex = isExpandable ? hunkIndex : void 0;
  const content = typeof collapsedLines === "number" ? getModifiedLinesString(collapsedLines) : "More unchanged context may be available";
  context.pushToGutter(type, createSeparator({
    type: context.hunkSeparators,
    content,
    expandIndex,
    chunked,
    slotName,
    isFirstHunk,
    isLastHunk
  }));
  linesAST.push(createSeparator({
    type: context.hunkSeparators,
    content,
    expandIndex,
    chunked,
    slotName,
    isFirstHunk,
    isLastHunk
  }));
  if (type !== "additions") context.incrementRowCount(1);
  context.hunkData.push({
    slotName,
    hunkIndex,
    lines: typeof collapsedLines === "number" ? collapsedLines : 0,
    lineCountKnown: typeof collapsedLines === "number",
    type,
    expandable: isExpandable ? {
      up: !isFirstHunk,
      down: !isLastHunk,
      chunked
    } : void 0
  });
}
function withContentProperties(lineNode, contentProperties, extendProperties) {
  if (lineNode == null || lineNode.type !== "element" || contentProperties == null && extendProperties == null) return lineNode;
  return {
    ...lineNode,
    properties: {
      ...lineNode.properties,
      ...contentProperties,
      ...extendProperties
    }
  };
}
function contentLineCount(lines) {
  return lines.length > 0 && lines[lines.length - 1] === "" ? lines.length - 1 : lines.length;
}
function realignAdditionHastLines(previousLines, nextLines, hastLines, textDocument) {
  const previousContentLength = contentLineCount(previousLines);
  const nextContentLength = contentLineCount(nextLines);
  const maxShared = Math.min(previousContentLength, nextContentLength);
  let prefix = 0;
  while (prefix < maxShared && previousLines[prefix] === nextLines[prefix]) prefix++;
  let suffix = 0;
  while (suffix < maxShared - prefix && previousLines[previousContentLength - 1 - suffix] === nextLines[nextContentLength - 1 - suffix]) suffix++;
  const realigned = new Array(nextLines.length);
  for (let index = 0; index < prefix; index++) realigned[index] = hastLines[index];
  for (let offset = 0; offset < suffix; offset++) realigned[nextContentLength - 1 - offset] = hastLines[previousContentLength - 1 - offset];
  if (previousContentLength < previousLines.length && nextContentLength < nextLines.length) realigned[nextLines.length - 1] = hastLines[previousLines.length - 1];
  for (let index = previousLines.length; index < nextLines.length; index++) realigned[index] ??= hastLines[index];
  for (let index = prefix; index < nextLines.length; index++) realigned[index] ??= createPlainAdditionLineElement(index, textDocument);
  return realigned;
}
function createPlainAdditionLineElement(lineIndex, textDocument) {
  return {
    type: "element",
    tagName: "div",
    properties: {
      "data-line": lineIndex + 1,
      "data-line-index": `${lineIndex},${lineIndex}`,
      "data-line-type": "context"
    },
    children: [{
      type: "element",
      tagName: "span",
      properties: { "data-char": 0 },
      children: [{
        type: "text",
        value: textDocument.getLineText(lineIndex)
      }]
    }]
  };
}
function getEditorDocumentLines(textDocument, previousLines) {
  const lines = [];
  const fallbackLineBreak = getFallbackLineBreak(previousLines);
  for (let line = 0; line < textDocument.lineCount; line++) {
    const lineText = textDocument.getLineText(line, true);
    lines.push(line < textDocument.lineCount - 1 && !hasLineBreakSuffix(lineText) ? lineText + fallbackLineBreak : lineText);
  }
  return lines;
}
function hasLineBreakSuffix(line) {
  return line.endsWith("\n") || line.endsWith("\r");
}
function getFallbackLineBreak(lines) {
  for (const line of lines) {
    if (line.endsWith("\r\n")) return "\r\n";
    if (line.endsWith("\n")) return "\n";
    if (line.endsWith("\r")) return "\r";
  }
  return "\n";
}
function isDiffMassive(diff, tokenizeMaxLength) {
  return Math.max(diff.additionLines.length, diff.deletionLines.length) > tokenizeMaxLength;
}
function canHydrateCollapsedContext$1(fileDiff, hasFileLoader) {
  return fileDiff.isPartial && hasFileLoader && (fileDiff.type === "change" || fileDiff.type === "rename-changed");
}
function areDiffLineAnnotationsEqual(annotationA, annotationB) {
  return annotationA.lineNumber === annotationB.lineNumber && annotationA.side === annotationB.side && annotationA.metadata === annotationB.metadata;
}
function areHunkDataEqual(hunkA, hunkB) {
  return hunkA.slotName === hunkB.slotName && hunkA.hunkIndex === hunkB.hunkIndex && hunkA.lines === hunkB.lines && hunkA.lineCountKnown === hunkB.lineCountKnown && hunkA.type === hunkB.type && hunkA.expandable?.chunked === hunkB.expandable?.chunked && hunkA.expandable?.up === hunkB.expandable?.up && hunkA.expandable?.down === hunkB.expandable?.down;
}
function getDiffHunksRendererOptions(options) {
  return {
    theme: options?.theme,
    disableLineNumbers: options?.disableLineNumbers,
    overflow: options?.overflow,
    collapsed: options?.collapsed,
    disableFileHeader: options?.disableFileHeader,
    disableVirtualizationBuffers: options?.disableVirtualizationBuffers,
    stickyHeader: options?.stickyHeader,
    preferredHighlighter: options?.preferredHighlighter,
    useCSSClasses: options?.useCSSClasses,
    useTokenTransformer: shouldUseTokenTransformer(options),
    tokenizeMaxLineLength: options?.tokenizeMaxLineLength,
    tokenizeMaxLength: options?.tokenizeMaxLength,
    diffStyle: options?.diffStyle,
    diffIndicators: options?.diffIndicators,
    disableBackground: options?.disableBackground,
    hunkSeparators: typeof options?.hunkSeparators === "function" ? "custom" : options?.hunkSeparators,
    expandUnchanged: options?.expandUnchanged,
    loadDiffFiles: options?.loadDiffFiles,
    collapsedContextThreshold: options?.collapsedContextThreshold,
    lineDiffType: options?.lineDiffType,
    maxLineDiffLength: options?.maxLineDiffLength,
    expansionLineCount: options?.expansionLineCount,
    headerRenderMode: options?.renderCustomHeader != null ? "custom" : "default"
  };
}
function canHydrateDiff(fileDiff) {
  return fileDiff.isPartial && (fileDiff.type === "change" || fileDiff.type === "rename-changed" || fileDiff.type === "rename-pure");
}
let instanceId$1 = -1;
var FileDiff$1 = class FileDiff {
  options;
  workerManager;
  isContainerManaged;
  static LoadedCustomComponent = true;
  __id = `file-diff:${++instanceId$1}`;
  type = "file-diff";
  fileContainer;
  spriteSVG;
  pre;
  codeUnified;
  codeDeletions;
  codeAdditions;
  bufferBefore;
  bufferAfter;
  themeCSSStyle;
  appliedThemeCSS;
  hasAdoptedThemeCSS = false;
  unsafeCSSStyle;
  appliedUnsafeCSS;
  gutterUtilityContent;
  headerElement;
  headerPrefix;
  headerFilenameSuffix;
  headerMetadata;
  headerCustom;
  separatorCache = /* @__PURE__ */ new Map();
  errorWrapper;
  placeHolder;
  hunksRenderer;
  resizeManager;
  scrollSyncManager;
  interactionManager;
  annotationCache = /* @__PURE__ */ new Map();
  lineAnnotations = [];
  managersDirty = false;
  deletionFile;
  additionFile;
  fileDiff;
  renderRange;
  pendingFiles;
  appliedPreAttributes;
  lastRenderedHeaderHTML;
  cachedHeaderHTML;
  lastRowCount;
  mounted = false;
  enabled = true;
  editor;
  refreshViewTimeout;
  lineStateRefreshPending = false;
  deferredSelectedLines;
  deferredEditorActiveLine;
  constructor(options = { theme: DEFAULT_THEMES }, workerManager, isContainerManaged = false) {
    this.options = options;
    this.workerManager = workerManager;
    this.isContainerManaged = isContainerManaged;
    this.hunksRenderer = this.createHunksRenderer(options);
    this.resizeManager = new ResizeManager();
    this.scrollSyncManager = new ScrollSyncManager();
    this.interactionManager = new InteractionManager("diff", pluckInteractionOptions(options, typeof options.hunkSeparators === "function" || (options.hunkSeparators ?? "line-info") === "line-info" || options.hunkSeparators === "line-info-basic" ? this.handleExpandHunk : void 0, this.getLineIndex));
    this.workerManager?.subscribeToThemeChanges(this);
    this.enabled = true;
  }
  handleHighlightRender = () => {
    this.rerender();
  };
  getHunksRendererOptions(options) {
    return getDiffHunksRendererOptions(options);
  }
  createHunksRenderer(options) {
    return new DiffHunksRenderer(this.getHunksRendererOptions(options), this.handleHighlightRender, this.workerManager);
  }
  getLineIndex = (lineNumber, side = "additions") => {
    const fileDiff = this.fileDiffCache;
    if (fileDiff == null) return;
    const lastHunk = fileDiff.hunks.at(-1);
    let targetUnifiedIndex;
    let targetSplitIndex;
    hunkIterator: for (const hunk of fileDiff.hunks) {
      const hunkStart = side === "deletions" ? hunk.deletionStart : hunk.additionStart;
      const hunkCount = side === "deletions" ? hunk.deletionCount : hunk.additionCount;
      let currentLineNumber = getHunkSideStartBoundary(hunkStart, hunkCount) + 1;
      let splitIndex = hunk.splitLineStart;
      let unifiedIndex = hunk.unifiedLineStart;
      if (lineNumber < currentLineNumber) {
        const difference = currentLineNumber - lineNumber;
        targetUnifiedIndex = Math.max(unifiedIndex - difference, 0);
        targetSplitIndex = Math.max(splitIndex - difference, 0);
        break hunkIterator;
      }
      if (lineNumber >= currentLineNumber + hunkCount) {
        if (hunk === lastHunk) {
          const difference = lineNumber - (currentLineNumber + hunkCount);
          targetUnifiedIndex = unifiedIndex + hunk.unifiedLineCount + difference;
          targetSplitIndex = splitIndex + hunk.splitLineCount + difference;
          break hunkIterator;
        }
        continue;
      }
      for (const content of hunk.hunkContent) if (content.type === "context") if (lineNumber < currentLineNumber + content.lines) {
        const difference = lineNumber - currentLineNumber;
        targetSplitIndex = splitIndex + difference;
        targetUnifiedIndex = unifiedIndex + difference;
        break hunkIterator;
      } else {
        currentLineNumber += content.lines;
        splitIndex += content.lines;
        unifiedIndex += content.lines;
      }
      else {
        const sideCount = side === "deletions" ? content.deletions : content.additions;
        if (lineNumber < currentLineNumber + sideCount) {
          const indexDifference = lineNumber - currentLineNumber;
          targetUnifiedIndex = unifiedIndex + (side === "additions" ? content.deletions : 0) + indexDifference;
          targetSplitIndex = splitIndex + indexDifference;
          break hunkIterator;
        } else {
          currentLineNumber += sideCount;
          splitIndex += Math.max(content.deletions, content.additions);
          unifiedIndex += content.deletions + content.additions;
        }
      }
      break hunkIterator;
    }
    if (targetUnifiedIndex == null || targetSplitIndex == null) return;
    return [targetUnifiedIndex, targetSplitIndex];
  };
  setOptions(options) {
    if (options == null) return;
    this.options = options;
    this.cachedHeaderHTML = void 0;
    this.hunksRenderer.setOptions(this.getHunksRendererOptions(options));
    this.syncInteractionOptions();
  }
  syncInteractionOptions() {
    this.interactionManager.setOptions(pluckInteractionOptions(this.options, typeof this.options.hunkSeparators === "function" || (this.options.hunkSeparators ?? "line-info") === "line-info" || this.options.hunkSeparators === "line-info-basic" ? this.handleExpandHunk : void 0, this.getLineIndex));
  }
  mergeOptions(options) {
    this.options = {
      ...this.options,
      ...options
    };
  }
  setThemeType(themeType) {
    if ((this.options.themeType ?? "system") === themeType) return;
    this.mergeOptions({ themeType });
    this.applyCachedThemeState(themeType);
  }
  applyCachedThemeState(themeType) {
    if (typeof this.options.theme === "string" || this.fileContainer == null || this.appliedThemeCSS == null) return false;
    const effectiveThemeType = this.appliedThemeCSS.baseThemeType ?? themeType;
    if (this.appliedThemeCSS.themeType === effectiveThemeType) return false;
    this.applyThemeState(this.fileContainer, this.appliedThemeCSS.themeStyles, themeType, this.appliedThemeCSS.baseThemeType);
    return true;
  }
  hasThemeChanged() {
    return this.appliedThemeCSS != null && !areThemesEqual(this.appliedThemeCSS.theme, this.options.theme ?? DEFAULT_THEMES);
  }
  getHoveredLine = () => {
    return this.interactionManager.getHoveredLine();
  };
  setLineAnnotations(lineAnnotations) {
    this.lineAnnotations = lineAnnotations;
  }
  canPartiallyRender(forceRender, annotationsChanged, didContentChange) {
    if (forceRender || annotationsChanged || didContentChange || typeof this.options.hunkSeparators === "function") return false;
    return true;
  }
  setSelectedLines(range2, options) {
    if (this.lineStateRefreshPending) this.deferredSelectedLines = [range2, options];
    else this.interactionManager.setSelection(range2, options);
  }
  setEditorActiveLine(lineNumber, options) {
    if (this.lineStateRefreshPending) this.deferredEditorActiveLine = [lineNumber, options];
    else this.interactionManager.setEditorActiveLine(lineNumber, {
      lineNumberOnly: options?.lineNumberOnly,
      side: options?.side ?? "additions"
    });
  }
  flushDeferredLineState() {
    const { deferredEditorActiveLine: editorActiveLine, deferredSelectedLines: selectedLines } = this;
    this.lineStateRefreshPending = false;
    this.deferredEditorActiveLine = void 0;
    this.deferredSelectedLines = void 0;
    if (editorActiveLine != null) this.setEditorActiveLine(...editorActiveLine);
    if (selectedLines != null) this.interactionManager.setSelection(...selectedLines);
  }
  flushManagers() {
    if (!this.managersDirty || this.pre == null) {
      this.managersDirty = false;
      return;
    }
    const { diffStyle = "split", overflow = "scroll" } = this.options;
    this.interactionManager.setup(this.pre);
    this.resizeManager.setup(this.pre, {
      disableAnnotations: overflow === "wrap",
      columnVariables: this.shouldApplyColumnVariables(overflow) ? "apply" : "measure"
    });
    if (overflow === "scroll" && diffStyle === "split") this.scrollSyncManager.setup(this.pre, this.codeDeletions, this.codeAdditions);
    else this.scrollSyncManager.cleanUp();
    this.managersDirty = false;
  }
  shouldApplyColumnVariables(overflow) {
    if (typeof this.options.hunkSeparators === "function") return true;
    return overflow === "scroll" && (this.lineAnnotations.length > 0 || this.pre?.hasAttribute("data-has-merge-conflict") === true);
  }
  getCodeScrollLeft() {
    return Math.max(this.codeUnified?.scrollLeft ?? 0, this.codeDeletions?.scrollLeft ?? 0, this.codeAdditions?.scrollLeft ?? 0);
  }
  setCodeScrollLeft(position) {
    if (this.codeUnified != null) this.codeUnified.scrollLeft = position;
    if (this.codeAdditions != null) this.codeAdditions.scrollLeft = position;
    if (this.codeDeletions != null) this.codeDeletions.scrollLeft = position;
  }
  __getEffectiveCodeOptions() {
    return {
      ...this.options,
      ...this.hunksRenderer.getEffectiveCodeOptions()
    };
  }
  cleanUp(recycle = false) {
    dequeueRender(this.handleEditSessionRender);
    this.emitPostRender(true);
    this.editor?.cleanUp(recycle);
    this.editor = void 0;
    this.resizeManager.cleanUp();
    this.interactionManager.cleanUp();
    this.scrollSyncManager.cleanUp();
    this.managersDirty = false;
    this.workerManager?.unsubscribeToThemeChanges(this);
    this.renderRange = void 0;
    this.pendingFiles = void 0;
    if (!this.isContainerManaged) this.fileContainer?.remove();
    this.fileContainer = void 0;
    this.mounted = false;
    if (!recycle) this.lineAnnotations = [];
    this.clearAuxiliaryNodes();
    this.annotationCache.clear();
    this.pre = void 0;
    this.codeUnified = void 0;
    this.codeDeletions = void 0;
    this.codeAdditions = void 0;
    this.bufferBefore?.remove();
    this.bufferBefore = void 0;
    this.bufferAfter?.remove();
    this.bufferAfter = void 0;
    this.appliedPreAttributes = void 0;
    this.headerElement = void 0;
    this.headerPrefix = void 0;
    this.headerFilenameSuffix = void 0;
    this.headerMetadata = void 0;
    this.headerCustom = void 0;
    this.placeHolder?.remove();
    this.placeHolder = void 0;
    this.lastRenderedHeaderHTML = void 0;
    if (!recycle) this.cachedHeaderHTML = void 0;
    this.errorWrapper?.remove();
    this.errorWrapper = void 0;
    this.spriteSVG = void 0;
    this.lastRowCount = void 0;
    this.themeCSSStyle = void 0;
    this.appliedThemeCSS = void 0;
    this.hasAdoptedThemeCSS = false;
    this.unsafeCSSStyle = void 0;
    this.appliedUnsafeCSS = void 0;
    if (recycle) this.hunksRenderer.recycle();
    else {
      this.hunksRenderer.cleanUp();
      this.workerManager = void 0;
      this.fileDiff = void 0;
      this.deletionFile = void 0;
      this.additionFile = void 0;
    }
    if (this.refreshViewTimeout != null) {
      clearTimeout(this.refreshViewTimeout);
      this.refreshViewTimeout = void 0;
    }
    this.lineStateRefreshPending = false;
    this.deferredEditorActiveLine = void 0;
    this.deferredSelectedLines = void 0;
    this.enabled = false;
  }
  virtualizedSetup() {
    this.enabled = true;
    this.workerManager?.subscribeToThemeChanges(this);
  }
  hydrate({ fileContainer, prerenderedHTML, preventEmit = false, lineAnnotations, fileDiff, ...fileInputProps }) {
    if (!this.enabled) throw new Error("FileDiff.hydrate: attempting to call hydrate after cleaned up");
    if (this.fileContainer != null) throw new Error("FileDiff.hydrate: hydrate can only be called before the instance has rendered or hydrated");
    const fileInput = getDiffFileInput(fileInputProps, "FileDiff.hydrate");
    const oldFile = fileInput?.oldFile;
    const newFile = fileInput?.newFile;
    this.hydrateElements(fileContainer, prerenderedHTML);
    if (shouldRenderCode(this.pre, hasDiffContent({
      fileDiff,
      oldFile,
      newFile
    }), this.options.collapsed) || shouldRenderHeader(this.headerElement, hasDiffHeaderContent({
      fileDiff,
      oldFile,
      newFile
    }), this.options.disableFileHeader)) this.render({
      ...fileInputProps,
      fileContainer,
      lineAnnotations,
      fileDiff,
      preventEmit: true
    });
    else this.hydrationSetup({
      fileDiff,
      lineAnnotations,
      ...fileInput
    });
    if (!preventEmit) this.emitPostRender();
  }
  hydrateElements(fileContainer, prerenderedHTML) {
    if (this.fileContainer !== fileContainer) this.emitPostRender(true);
    prerenderHTMLIfNecessary(fileContainer, prerenderedHTML);
    for (const element2 of fileContainer.shadowRoot?.children ?? []) {
      if (element2 instanceof SVGElement) {
        this.spriteSVG = element2;
        continue;
      }
      if (!(element2 instanceof HTMLElement)) continue;
      if (element2 instanceof HTMLPreElement) {
        this.pre = element2;
        for (const code of element2.children) {
          if (!(code instanceof HTMLElement) || code.tagName.toLowerCase() !== "code") continue;
          if ("deletions" in code.dataset) this.codeDeletions = code;
          if ("additions" in code.dataset) this.codeAdditions = code;
          if ("unified" in code.dataset) this.codeUnified = code;
        }
        continue;
      }
      if ("diffsHeader" in element2.dataset) {
        this.headerElement = element2;
        continue;
      }
      if (element2 instanceof HTMLStyleElement && element2.hasAttribute("data-theme-css")) {
        this.themeCSSStyle = element2;
        continue;
      }
      if (element2 instanceof HTMLStyleElement && element2.hasAttribute("data-unsafe-css")) {
        this.unsafeCSSStyle = element2;
        this.appliedUnsafeCSS = element2.textContent;
        continue;
      }
    }
    if (this.pre != null) {
      this.syncCodeNodesFromPre(this.pre);
      this.pre.removeAttribute("data-dehydrated");
    }
    this.fileContainer = fileContainer;
    this.hydrateMeasuredScrollbar();
  }
  hydrationSetup({ fileDiff, oldFile, newFile, lineAnnotations }) {
    this.lineAnnotations = lineAnnotations ?? this.lineAnnotations;
    this.additionFile = newFile;
    this.deletionFile = oldFile;
    this.fileDiff = fileDiff ?? (oldFile !== void 0 && newFile !== void 0 ? parseDiffFromFile(oldFile, newFile, this.options.parseDiffOptions) : void 0);
    if (this.pre == null) return;
    this.syncInteractionOptions();
    this.hunksRenderer.hydrate(this.fileDiff);
    this.renderAnnotations();
    this.renderGutterUtility();
    this.injectUnsafeCSS();
    this.managersDirty = true;
    this.flushManagers();
  }
  rerender() {
    if (!this.enabled || this.fileDiff == null && this.additionFile == null && this.deletionFile == null) return;
    this.render({
      forceRender: true,
      renderRange: this.renderRange
    });
  }
  onThemeChange() {
    this.hunksRenderer.clearRenderCache();
    this.rerender();
  }
  handleExpandHunk = (hunkIndex, direction, expansionLineCountOverride) => {
    this.expandHunk(hunkIndex, direction, expansionLineCountOverride);
  };
  expandHunk = (hunkIndex, direction, expansionLineCountOverride) => {
    this.hunksRenderer.expandHunk(hunkIndex, direction, expansionLineCountOverride);
    this.loadFilesIfNecessary();
    this.rerender();
  };
  loadFilesIfNecessary() {
    const { fileDiff, options: { loadDiffFiles } } = this;
    if (fileDiff == null || loadDiffFiles == null || !canHydrateDiff(fileDiff) || this.pendingFiles?.fileDiff === fileDiff) return;
    this.pendingFiles = {
      fileDiff,
      promise: this.loadFilesForDiff(fileDiff, loadDiffFiles)
    };
  }
  async loadFilesForDiff(fileDiff, loadDiffFiles) {
    try {
      const files = await loadDiffFiles(fileDiff);
      if (!this.enabled || this.fileDiff !== fileDiff) return;
      await this.handleFilesLoaded(fileDiff, files);
    } catch (error) {
      if (this.options.disableErrorHandling === true) throw error;
      console.error(error);
    } finally {
      if (this.pendingFiles?.fileDiff === fileDiff) this.pendingFiles = void 0;
    }
  }
  async handleFilesLoaded(expectedDiff, files) {
    if (this.fileDiff !== expectedDiff || !expectedDiff.isPartial) return;
    hydratePartialDiff("merge", expectedDiff, files);
    this.setHydratedState(files);
    await awaitWithTimeout(() => this.primeHighlightCache(expectedDiff));
    if (!this.enabled || this.fileDiff !== expectedDiff) return;
    this.rerender();
  }
  setHydratedState(files) {
    this.deletionFile = files.oldFile;
    this.additionFile = files.newFile;
    this.workerManager?.cleanUpTasks(this.hunksRenderer);
    this.hunksRenderer.clearRenderCache();
  }
  render({ fileDiff, deferManagers = false, forceRender = false, preventEmit = false, lineAnnotations, fileContainer, containerWrapper, renderRange, ...fileInputProps }) {
    const fileInput = getDiffFileInput(fileInputProps, "FileDiff.render");
    const oldFile = fileInput?.oldFile;
    const newFile = fileInput?.newFile;
    if (!this.enabled) throw new Error("FileDiff.render: attempting to call render after cleaned up");
    if (fileDiff != null && fileDiff.cacheKey === void 0) fileDiff.cacheKey = fileDiff.prevName != null ? fileDiff.prevName + ":" + fileDiff.name : fileDiff.name;
    this.editor?.__postponeBgTokenizeToNextFrame();
    const { collapsed = false, themeType = "system", expandUnchanged = false } = this.options;
    const nextRenderRange = collapsed ? void 0 : renderRange;
    const themeChanged = this.hasThemeChanged();
    const hasFileInput = fileInput != null;
    const filesDidChange = hasFileInput && (!areOptionalFilesEqual$1(oldFile, this.deletionFile) || !areOptionalFilesEqual$1(newFile, this.additionFile));
    let diffDidChange = fileDiff != null && fileDiff !== this.fileDiff;
    const annotationsChanged = lineAnnotations != null && (lineAnnotations.length > 0 || this.lineAnnotations.length > 0) ? lineAnnotations !== this.lineAnnotations : false;
    if (!collapsed && areRenderRangesEqual(nextRenderRange, this.renderRange) && !forceRender && !annotationsChanged && !themeChanged && (fileDiff != null && fileDiff === this.fileDiff || fileDiff == null && !filesDidChange)) return this.applyCachedThemeState(themeType);
    let nextParsedFileDiff;
    if (fileDiff == null && hasFileInput && (filesDidChange || this.fileDiff == null)) nextParsedFileDiff = parseDiffFromFile(fileInput.oldFile, fileInput.newFile, this.options.parseDiffOptions);
    const { renderRange: previousRenderRange } = this;
    this.renderRange = nextRenderRange;
    if (hasFileInput) {
      this.deletionFile = oldFile;
      this.additionFile = newFile;
    } else if (fileDiff != null) {
      this.deletionFile = void 0;
      this.additionFile = void 0;
    }
    if (fileDiff != null) this.fileDiff = fileDiff;
    else if (nextParsedFileDiff != null) {
      diffDidChange = true;
      this.fileDiff = nextParsedFileDiff;
    }
    if (diffDidChange) this.cachedHeaderHTML = void 0;
    if (lineAnnotations != null) this.setLineAnnotations(lineAnnotations);
    if (this.fileDiff == null) return false;
    if (this.fileDiff.editSessionDirty === true && this.shouldSelfHealEditSession()) {
      finishEditSessionForDiff(this.fileDiff, this.options.parseDiffOptions);
      this.hunksRenderer.refreshHighlightedResult();
    }
    if (expandUnchanged) this.loadFilesIfNecessary();
    this.hunksRenderer.setOptions(this.getHunksRendererOptions(this.options));
    this.syncInteractionOptions();
    this.hunksRenderer.setLineAnnotations(this.lineAnnotations);
    const { disableErrorHandling = false, disableFileHeader = false } = this.options;
    if (disableFileHeader) {
      if (this.headerElement != null) {
        this.headerElement.remove();
        this.headerElement = void 0;
        this.lastRenderedHeaderHTML = void 0;
      }
      this.clearHeaderSlots();
    }
    fileContainer = this.getOrCreateFileContainer(fileContainer, containerWrapper);
    this.applyCachedThemeState(themeType);
    if (collapsed) {
      this.removeRenderedCode();
      this.clearAuxiliaryNodes();
      try {
        const hunksResult = this.hunksRenderer.renderDiff(this.fileDiff, EMPTY_RENDER_RANGE);
        if (hunksResult != null) this.applyThemeState(fileContainer, hunksResult.themeStyles, themeType, hunksResult.baseThemeType);
        if (hunksResult?.headerElement != null) this.applyHeaderToDOM(hunksResult.headerElement, fileContainer);
        this.renderSeparators([]);
        this.injectUnsafeCSS();
      } catch (error) {
        if (disableErrorHandling) throw error;
        console.error(error);
        if (error instanceof Error) this.applyErrorToDOM(error, fileContainer);
      }
      if (!preventEmit) this.emitPostRender();
      return true;
    }
    try {
      const pre = this.getOrCreatePreNode(fileContainer);
      if (!(this.canPartiallyRender(forceRender, annotationsChanged, filesDidChange || diffDidChange || themeChanged) && this.applyPartialRender({
        previousRenderRange,
        renderRange: nextRenderRange
      }))) {
        const hunksResult = this.hunksRenderer.renderDiff(this.fileDiff, nextRenderRange);
        if (hunksResult == null) {
          if (this.workerManager?.isInitialized() === false) this.workerManager.initialize().then(() => this.rerender());
          return false;
        }
        this.applyThemeState(fileContainer, hunksResult.themeStyles, themeType, hunksResult.baseThemeType);
        if (hunksResult.headerElement != null) this.applyHeaderToDOM(hunksResult.headerElement, fileContainer);
        if (hunksResult.additionsContentAST != null || hunksResult.deletionsContentAST != null || hunksResult.unifiedContentAST != null) this.applyHunksToDOM(pre, hunksResult);
        else if (this.pre != null) {
          this.pre.remove();
          this.pre = void 0;
        }
        this.renderSeparators(hunksResult.hunkData);
      }
      this.applyBuffers(pre, nextRenderRange);
      this.injectUnsafeCSS();
      this.renderAnnotations();
      this.renderGutterUtility();
      this.managersDirty = true;
      if (!deferManagers) this.flushManagers();
      if (this.editor != null) this.syncRenderViewToEditor();
    } catch (error) {
      if (disableErrorHandling) throw error;
      console.error(error);
      if (error instanceof Error) this.applyErrorToDOM(error, fileContainer);
    }
    if (!preventEmit) this.emitPostRender();
    return true;
  }
  emitPostRender(unmount = false) {
    const { fileContainer, options: { onPostRender } } = this;
    if (unmount) {
      if (!this.mounted) return;
      this.mounted = false;
      if (fileContainer == null) return;
      this.options.onPostRender?.(fileContainer, this, "unmount");
      return;
    }
    if (fileContainer == null) return;
    const phase = this.mounted ? "update" : "mount";
    this.mounted = true;
    onPostRender?.(fileContainer, this, phase);
  }
  get fileDiffCache() {
    return this.hunksRenderer.diffCache ?? this.fileDiff;
  }
  syncRenderViewToEditor() {
    const editor = this.editor;
    const fileContainer = this.fileContainer;
    const fileDiff = this.fileDiffCache;
    const lineAnnotations = this.lineAnnotations;
    const renderRange = this.computeEditorRenderRange(this.renderRange);
    if (editor != null && fileContainer != null && fileDiff != null && !fileDiff.isPartial) this.hunksRenderer.initializeHighlighter().then((highlighter2) => {
      if (!this.enabled || this.editor !== editor || this.fileContainer !== fileContainer || this.fileDiffCache !== fileDiff) return;
      editor.__syncRenderView(highlighter2, fileContainer, fileDiff, lineAnnotations, renderRange);
    });
  }
  computeEditorRenderRange(renderRange) {
    const fileDiff = this.fileDiffCache;
    if (renderRange == null || fileDiff == null || isDefaultRenderRange(renderRange)) return renderRange;
    const { diffStyle = "split", expandUnchanged = false, collapsedContextThreshold = 1 } = this.options;
    let firstLineNumber;
    let lastLineNumber;
    iterateOverDiff({
      diff: fileDiff,
      diffStyle,
      startingLine: renderRange.startingLine,
      totalLines: renderRange.totalLines,
      expandedHunks: expandUnchanged ? true : this.hunksRenderer.getExpandedHunksMap(),
      collapsedContextThreshold,
      callback: ({ additionLine }) => {
        if (additionLine != null) {
          firstLineNumber ??= additionLine.lineNumber;
          lastLineNumber = additionLine.lineNumber;
        }
      }
    });
    if (firstLineNumber == null || lastLineNumber == null) return {
      ...renderRange,
      startingLine: 0,
      totalLines: 0
    };
    return {
      ...renderRange,
      startingLine: firstLineNumber - 1,
      totalLines: lastLineNumber - firstLineNumber + 1
    };
  }
  attachEditor(editor) {
    if (this.type !== "file-diff") throw new Error(`FileDiff.attachEditor: cannot attach an editor to a "${this.type}" diff`);
    this.editor?.cleanUp();
    this.editor = editor;
    this.hunksRenderer.beginEditSession();
    if (this.fileDiff?.isPartial === true) this.loadFilesIfNecessary();
    if (this.hunksRenderer.editorRenderReady()) this.syncRenderViewToEditor();
    else this.rerender();
    return (recycle) => {
      this.editor = void 0;
      if (recycle !== true) this.finishEditSession();
    };
  }
  finishEditSession() {
    this.hunksRenderer.endEditSession();
    this.completeEditSession();
  }
  /**
  * Run the genuine session-end recompute: restore recompute-shaped hunks (a
  * context-only region collapses away, boundaries re-derive), preserve
  * expansion state best-effort via old-side anchors, and repaint through
  * the session render path — which also invalidates virtualized layout,
  * since nothing else does at exit now that editing does not flip
  * expandUnchanged. Marker-guarded and idempotent; CodeView also calls this
  * when reaping a session whose detach closure was consumed by a recycle.
  * Safe on a cleaned-up instance: the recompute is pure metadata work and
  * the deferred rerender is enabled-guarded. Returns true when a recompute
  * ran.
  */
  completeEditSession() {
    const fileDiff = this.fileDiffCache;
    if (fileDiff == null || fileDiff.editSessionDirty !== true) return false;
    const { collapsedContextThreshold = 1 } = this.options;
    const anchors = captureExpansionAnchors(fileDiff, this.hunksRenderer.getExpandedHunksMap(), collapsedContextThreshold);
    finishEditSessionForDiff(fileDiff, this.options.parseDiffOptions);
    this.hunksRenderer.setExpandedHunksMap(rebuildExpansionFromAnchors(fileDiff, anchors));
    this.hunksRenderer.refreshHighlightedResult();
    this.escalateEditSessionRender();
    return true;
  }
  applyDocumentChange(textDocument, newLineAnnotations) {
    this.hunksRenderer.applyDocumentChange(textDocument);
    const fileDiff = this.hunksRenderer.diffCache;
    if (fileDiff != null) {
      const cacheKey = this.fileDiff?.cacheKey;
      if (cacheKey != null && fileDiff.cacheKey == null) fileDiff.cacheKey = cacheKey;
      this.fileDiff = fileDiff;
    }
    if (newLineAnnotations !== void 0 && newLineAnnotations !== this.lineAnnotations) {
      this.setLineAnnotations(newLineAnnotations);
      this.hunksRenderer.setLineAnnotations(this.lineAnnotations);
      this.renderAnnotations();
    }
    this.rerender();
    this.interactionManager.setSelectionDirty();
  }
  updateRenderCache(dirtyLines, themeType, options = {}) {
    const { shouldRefreshDiffsView, lineCountChangeInFlight } = options;
    if (this.hunksRenderer.updateRenderCache(dirtyLines, themeType, lineCountChangeInFlight)) {
      if (this.refreshViewTimeout != null) {
        clearTimeout(this.refreshViewTimeout);
        this.refreshViewTimeout = void 0;
      }
      this.lineStateRefreshPending = true;
      this.escalateEditSessionRender();
      return;
    }
    if (shouldRefreshDiffsView === true) {
      if (this.refreshViewTimeout != null) clearTimeout(this.refreshViewTimeout);
      this.lineStateRefreshPending = true;
      this.refreshViewTimeout = setTimeout(() => {
        this.refreshViewTimeout = void 0;
        if (this.options.diffStyle === "split") this.refreshSplitDiffView();
        else this.refreshUnifiedDiffView();
        this.flushDeferredLineState();
      }, 150);
    }
  }
  isLineRenderable(lineNumber) {
    const fileDiff = this.fileDiffCache;
    if (fileDiff == null) return true;
    const { expandUnchanged = false, collapsedContextThreshold = 1 } = this.options;
    return isAdditionLineRenderable({
      fileDiff,
      lineNumber,
      expandedHunks: expandUnchanged ? true : this.hunksRenderer.getExpandedHunksMap(),
      collapsedContextThreshold
    });
  }
  getNearestRenderableLine(lineNumber, direction) {
    const fileDiff = this.fileDiffCache;
    if (fileDiff == null) return lineNumber;
    const { expandUnchanged = false, collapsedContextThreshold = 1 } = this.options;
    return getNearestRenderableAdditionLine({
      fileDiff,
      lineNumber,
      direction,
      expandedHunks: expandUnchanged ? true : this.hunksRenderer.getExpandedHunksMap(),
      collapsedContextThreshold
    });
  }
  revealLine(lineNumber) {
    const fileDiff = this.fileDiffCache;
    const { expandUnchanged = false, collapsedContextThreshold = 1, expansionLineCount = 100 } = this.options;
    if (fileDiff == null || fileDiff.isPartial || expandUnchanged) return false;
    const expandedHunks = this.hunksRenderer.getExpandedHunksMap();
    for (const [hunkIndex, hunk] of fileDiff.hunks.entries()) {
      const [hunkStart, hunkEnd] = getHunkAdditionLineRange(hunk);
      if (lineNumber < hunkStart) {
        const region = getExpandedRegion({
          isPartial: fileDiff.isPartial,
          rangeSize: hunk.collapsedBefore,
          expandedHunks,
          hunkIndex,
          collapsedContextThreshold
        });
        const gapStart = hunkStart - region.rangeSize;
        if (region.renderAll || lineNumber < gapStart + region.fromStart || lineNumber >= hunkStart - region.fromEnd) return false;
        const fromStartDistance = lineNumber - (gapStart + region.fromStart) + 1;
        const fromEndDistance = hunkStart - region.fromEnd - lineNumber;
        if (fromStartDistance <= fromEndDistance) this.expandHunk(hunkIndex, "up", fromStartDistance + expansionLineCount);
        else this.expandHunk(hunkIndex, "down", fromEndDistance + expansionLineCount);
        return true;
      }
      if (lineNumber < hunkEnd) return false;
    }
    const trailingRegion = getTrailingExpandedRegion({
      fileDiff,
      hunkIndex: fileDiff.hunks.length - 1,
      expandedHunks,
      collapsedContextThreshold,
      errorPrefix: "FileDiff.revealLine"
    });
    if (trailingRegion == null || trailingRegion.renderAll) return false;
    const lastHunk = fileDiff.hunks[fileDiff.hunks.length - 1];
    const [, trailingStart] = getHunkAdditionLineRange(lastHunk);
    if (lineNumber < trailingStart + trailingRegion.fromStart || lineNumber >= trailingStart + trailingRegion.rangeSize) return false;
    this.expandHunk(fileDiff.hunks.length, "up", lineNumber - (trailingStart + trailingRegion.fromStart) + 1 + expansionLineCount);
    return true;
  }
  shouldSelfHealEditSession() {
    return this.editor == null;
  }
  escalateEditSessionRender() {
    queueRender(this.handleEditSessionRender);
  }
  handleEditSessionRender = () => {
    this.rerender();
    this.flushDeferredLineState();
  };
  removeRenderedCode() {
    this.resizeManager.cleanUp();
    this.scrollSyncManager.cleanUp();
    this.interactionManager.cleanUp();
    this.bufferBefore?.remove();
    this.bufferBefore = void 0;
    this.bufferAfter?.remove();
    this.bufferAfter = void 0;
    this.codeUnified?.remove();
    this.codeUnified = void 0;
    this.codeDeletions?.remove();
    this.codeDeletions = void 0;
    this.codeAdditions?.remove();
    this.codeAdditions = void 0;
    this.pre?.remove();
    this.pre = void 0;
    this.appliedPreAttributes = void 0;
    this.lastRowCount = void 0;
  }
  clearAuxiliaryNodes() {
    for (const { element: element2 } of this.separatorCache.values()) element2.remove();
    this.separatorCache.clear();
    for (const { element: element2 } of this.annotationCache.values()) element2.remove();
    this.annotationCache.clear();
    this.gutterUtilityContent?.remove();
    this.gutterUtilityContent = void 0;
  }
  renderPlaceholder(height) {
    if (this.fileContainer == null) return false;
    this.emitPostRender(true);
    this.cleanChildNodes();
    if (this.placeHolder == null) {
      const shadowRoot = this.fileContainer.shadowRoot ?? this.fileContainer.attachShadow({ mode: "open" });
      this.placeHolder = document.createElement("div");
      this.placeHolder.dataset.placeholder = "";
      shadowRoot.appendChild(this.placeHolder);
    }
    this.placeHolder.style.setProperty("height", `${height}px`);
    return true;
  }
  async primeHighlightCache(fileDiff = this.fileDiff) {
    const { workerManager } = this;
    if (fileDiff == null || workerManager == null || !workerManager.isWorkingPool() || fileDiff.cacheKey == null || isDiffPlainText(fileDiff)) return;
    const tokenizeMaxLength = this.options.tokenizeMaxLength ?? 1e5;
    if (Math.max(fileDiff.additionLines.length, fileDiff.deletionLines.length) > tokenizeMaxLength) return;
    await workerManager.primeDiffHighlightCache(fileDiff).catch((error) => {
      console.error(error);
    });
  }
  cleanChildNodes() {
    this.resizeManager.cleanUp();
    this.scrollSyncManager.cleanUp();
    this.interactionManager.cleanUp();
    this.clearAuxiliaryNodes();
    this.bufferAfter?.remove();
    this.bufferBefore?.remove();
    this.codeAdditions?.remove();
    this.codeDeletions?.remove();
    this.codeUnified?.remove();
    this.errorWrapper?.remove();
    this.headerElement?.remove();
    this.headerPrefix?.remove();
    this.headerFilenameSuffix?.remove();
    this.headerMetadata?.remove();
    this.headerCustom?.remove();
    this.pre?.remove();
    this.spriteSVG?.remove();
    this.themeCSSStyle?.remove();
    this.unsafeCSSStyle?.remove();
    this.bufferAfter = void 0;
    this.bufferBefore = void 0;
    this.codeAdditions = void 0;
    this.codeDeletions = void 0;
    this.codeUnified = void 0;
    this.errorWrapper = void 0;
    this.headerElement = void 0;
    this.headerPrefix = void 0;
    this.headerFilenameSuffix = void 0;
    this.headerMetadata = void 0;
    this.headerCustom = void 0;
    this.pre = void 0;
    this.spriteSVG = void 0;
    this.themeCSSStyle = void 0;
    this.appliedThemeCSS = void 0;
    this.hasAdoptedThemeCSS = false;
    this.unsafeCSSStyle = void 0;
    this.appliedUnsafeCSS = void 0;
    this.lastRenderedHeaderHTML = void 0;
    this.lastRowCount = void 0;
    this.mounted = false;
  }
  renderSeparators(hunkData) {
    const { hunkSeparators } = this.options;
    if (this.isContainerManaged || this.fileContainer == null || typeof hunkSeparators !== "function") {
      for (const { element: element2 } of this.separatorCache.values()) element2.remove();
      this.separatorCache.clear();
      return;
    }
    const staleSeparators = new Map(this.separatorCache);
    for (const hunk of hunkData) {
      const id = hunk.slotName;
      let cache2 = this.separatorCache.get(id);
      if (cache2 == null || !areHunkDataEqual(hunk, cache2.hunkData)) {
        cache2?.element.remove();
        const element2 = document.createElement("div");
        element2.style.display = "contents";
        element2.slot = hunk.slotName;
        const child = hunkSeparators(hunk, this);
        if (child != null) element2.appendChild(child);
        this.fileContainer.appendChild(element2);
        cache2 = {
          element: element2,
          hunkData: hunk
        };
        this.separatorCache.set(id, cache2);
      }
      staleSeparators.delete(id);
    }
    for (const [id, { element: element2 }] of staleSeparators.entries()) {
      this.separatorCache.delete(id);
      element2.remove();
    }
  }
  renderAnnotations() {
    if (this.isContainerManaged || this.fileContainer == null) {
      for (const { element: element2 } of this.annotationCache.values()) element2.remove();
      this.annotationCache.clear();
      return;
    }
    const staleAnnotations = new Map(this.annotationCache);
    const { renderAnnotation } = this.options;
    if (renderAnnotation != null && this.lineAnnotations.length > 0) for (const [index, annotation] of this.lineAnnotations.entries()) {
      const id = `${index}-${getLineAnnotationName(annotation)}`;
      let cache2 = this.annotationCache.get(id);
      if (cache2 == null || !areDiffLineAnnotationsEqual(annotation, cache2.annotation)) {
        cache2?.element.remove();
        const content = renderAnnotation(annotation);
        if (content == null) continue;
        cache2 = {
          element: createAnnotationWrapperNode(getLineAnnotationName(annotation)),
          annotation
        };
        cache2.element.appendChild(content);
        this.fileContainer.appendChild(cache2.element);
        this.annotationCache.set(id, cache2);
      }
      staleAnnotations.delete(id);
    }
    for (const [id, { element: element2 }] of staleAnnotations.entries()) {
      this.annotationCache.delete(id);
      element2.remove();
    }
  }
  renderGutterUtility() {
    const { renderGutterUtility } = this.options;
    if (this.fileContainer == null || renderGutterUtility == null) {
      this.gutterUtilityContent?.remove();
      this.gutterUtilityContent = void 0;
      return;
    }
    const element2 = renderGutterUtility(this.interactionManager.getHoveredLine);
    if (element2 != null && this.gutterUtilityContent != null) return;
    else if (element2 == null) {
      this.gutterUtilityContent?.remove();
      this.gutterUtilityContent = void 0;
      return;
    }
    const gutterUtilityContent = createGutterUtilityContentNode();
    gutterUtilityContent.appendChild(element2);
    this.fileContainer.appendChild(gutterUtilityContent);
    this.gutterUtilityContent = gutterUtilityContent;
  }
  getOrCreateFileContainer(fileContainer, parentNode) {
    const { fileContainer: previousContainer } = this;
    const nextContainer = fileContainer ?? previousContainer ?? document.createElement("diffs-container");
    const containerChanged = previousContainer !== nextContainer;
    if (previousContainer != null && containerChanged) this.editor?.__captureFocusForDOMReplacement();
    if (containerChanged) this.emitPostRender(true);
    this.fileContainer = nextContainer;
    if (previousContainer != null && containerChanged) {
      this.lastRenderedHeaderHTML = void 0;
      this.headerElement = void 0;
    }
    if (parentNode != null && this.fileContainer.parentNode !== parentNode) parentNode.appendChild(this.fileContainer);
    if (containerChanged) this.adoptReusableShellElements(this.fileContainer);
    this.ensureSpriteSVG(this.fileContainer);
    return this.fileContainer;
  }
  adoptReusableShellElements(fileContainer) {
    const { shadowRoot } = fileContainer;
    if (shadowRoot == null) return;
    for (const element2 of shadowRoot.children) if (element2 instanceof SVGElement) this.spriteSVG ??= element2;
    else if (isStyleNode(element2) && element2.hasAttribute("data-theme-css")) {
      this.themeCSSStyle ??= element2;
      this.hasAdoptedThemeCSS = true;
    } else if (isStyleNode(element2) && element2.hasAttribute("data-unsafe-css")) {
      this.unsafeCSSStyle ??= element2;
      this.appliedUnsafeCSS ??= this.options.unsafeCSS ?? void 0;
    }
  }
  ensureSpriteSVG(fileContainer) {
    const shadowRoot = fileContainer.shadowRoot ?? fileContainer.attachShadow({ mode: "open" });
    if (this.spriteSVG == null) {
      const fragment = document.createElement("div");
      fragment.innerHTML = SVGSpriteSheet;
      const firstChild = fragment.firstChild;
      if (firstChild instanceof SVGElement) this.spriteSVG = firstChild;
    }
    if (this.spriteSVG != null && this.spriteSVG.parentNode !== shadowRoot) shadowRoot.appendChild(this.spriteSVG);
  }
  getOrCreatePreNode(container) {
    const shadowRoot = container.shadowRoot ?? container.attachShadow({ mode: "open" });
    if (this.pre == null) {
      this.pre = document.createElement("pre");
      this.appliedPreAttributes = void 0;
      this.codeUnified = void 0;
      this.codeDeletions = void 0;
      this.codeAdditions = void 0;
      shadowRoot.appendChild(this.pre);
    } else if (this.pre.parentNode !== shadowRoot) {
      this.editor?.__captureFocusForDOMReplacement();
      shadowRoot.appendChild(this.pre);
      this.appliedPreAttributes = void 0;
    }
    this.placeHolder?.remove();
    this.placeHolder = void 0;
    return this.pre;
  }
  syncCodeNodesFromPre(pre) {
    this.codeUnified = void 0;
    this.codeDeletions = void 0;
    this.codeAdditions = void 0;
    for (const child of Array.from(pre.children)) {
      if (!(child instanceof HTMLElement)) continue;
      if (child.hasAttribute("data-unified")) this.codeUnified = child;
      else if (child.hasAttribute("data-deletions")) this.codeDeletions = child;
      else if (child.hasAttribute("data-additions")) this.codeAdditions = child;
    }
  }
  applyHeaderToDOM(headerAST, container) {
    this.cleanupErrorWrapper();
    this.placeHolder?.remove();
    this.placeHolder = void 0;
    const { fileDiff } = this;
    const headerHTML = this.cachedHeaderHTML ?? toHtml(headerAST);
    this.cachedHeaderHTML = headerHTML;
    if (headerHTML !== this.lastRenderedHeaderHTML) {
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = headerHTML;
      const newHeader = tempDiv.firstElementChild;
      if (!(newHeader instanceof HTMLElement)) return;
      if (this.headerElement != null) container.shadowRoot?.replaceChild(newHeader, this.headerElement);
      else container.shadowRoot?.prepend(newHeader);
      this.headerElement = newHeader;
      this.lastRenderedHeaderHTML = headerHTML;
    }
    if (this.isContainerManaged || fileDiff == null) return;
    const { renderCustomHeader, renderHeaderPrefix, renderHeaderFilenameSuffix, renderHeaderMetadata } = this.options;
    if (renderCustomHeader != null) {
      const content2 = renderCustomHeader(fileDiff) ?? void 0;
      this.headerCustom = this.upsertHeaderSlotElement(container, this.headerCustom, CUSTOM_HEADER_SLOT_ID, content2);
      this.headerPrefix?.remove();
      this.headerFilenameSuffix?.remove();
      this.headerMetadata?.remove();
      this.headerPrefix = void 0;
      this.headerFilenameSuffix = void 0;
      this.headerMetadata = void 0;
      return;
    }
    const prefix = renderHeaderPrefix?.(fileDiff) ?? void 0;
    const suffix = renderHeaderFilenameSuffix?.(fileDiff) ?? void 0;
    const content = renderHeaderMetadata?.(fileDiff) ?? void 0;
    this.headerPrefix = this.upsertHeaderSlotElement(container, this.headerPrefix, HEADER_PREFIX_SLOT_ID, prefix);
    this.headerFilenameSuffix = this.upsertHeaderSlotElement(container, this.headerFilenameSuffix, HEADER_FILENAME_SUFFIX_SLOT_ID, suffix);
    this.headerMetadata = this.upsertHeaderSlotElement(container, this.headerMetadata, HEADER_METADATA_SLOT_ID, content);
    this.headerCustom?.remove();
    this.headerCustom = void 0;
  }
  clearHeaderSlots() {
    this.headerPrefix?.remove();
    this.headerFilenameSuffix?.remove();
    this.headerMetadata?.remove();
    this.headerCustom?.remove();
    this.headerPrefix = void 0;
    this.headerFilenameSuffix = void 0;
    this.headerMetadata = void 0;
    this.headerCustom = void 0;
  }
  upsertHeaderSlotElement(container, current, slot, content) {
    if (content == null) {
      current?.remove();
      return;
    }
    const element2 = current ?? this.createHeaderSlotElement(slot);
    if (current == null) container.appendChild(element2);
    this.replaceHeaderSlotContent(element2, content);
    return element2;
  }
  replaceHeaderSlotContent(element2, content) {
    element2.replaceChildren();
    if (content instanceof Element) element2.appendChild(content);
    else element2.innerText = `${content}`;
  }
  createHeaderSlotElement(slot) {
    const element2 = document.createElement("div");
    element2.slot = slot;
    return element2;
  }
  injectUnsafeCSS() {
    const { unsafeCSS } = this.options;
    const shadowRoot = this.fileContainer?.shadowRoot;
    if (shadowRoot == null) return;
    if (unsafeCSS == null || unsafeCSS === "") {
      if (this.unsafeCSSStyle != null) {
        this.unsafeCSSStyle.remove();
        this.unsafeCSSStyle = void 0;
      }
      this.appliedUnsafeCSS = void 0;
      return;
    }
    if (this.unsafeCSSStyle?.parentNode === shadowRoot && this.appliedUnsafeCSS === unsafeCSS) return;
    this.unsafeCSSStyle ??= createUnsafeCSSStyleNode();
    if (this.unsafeCSSStyle.parentNode !== shadowRoot) shadowRoot.appendChild(this.unsafeCSSStyle);
    this.unsafeCSSStyle.textContent = wrapUnsafeCSS(unsafeCSS);
    this.appliedUnsafeCSS = unsafeCSS;
  }
  applyThemeState(container, themeStyles, themeType, baseThemeType) {
    const shadowRoot = container.shadowRoot ?? container.attachShadow({ mode: "open" });
    const effectiveThemeType = baseThemeType ?? themeType;
    const currentTheme = this.options.theme ?? DEFAULT_THEMES;
    const theme = typeof currentTheme === "string" ? currentTheme : { ...currentTheme };
    const scrollbarGutter = getMeasuredScrollbarGutter(shadowRoot);
    if (this.themeCSSStyle?.parentNode === shadowRoot && this.appliedThemeCSS?.themeStyles === themeStyles && this.appliedThemeCSS.themeType === effectiveThemeType && this.appliedThemeCSS.scrollbarGutter === scrollbarGutter) {
      this.appliedThemeCSS.theme = theme;
      return;
    }
    if (this.hasAdoptedThemeCSS && this.themeCSSStyle?.parentNode === shadowRoot) {
      this.hasAdoptedThemeCSS = false;
      this.appliedThemeCSS = {
        theme,
        themeStyles,
        themeType: effectiveThemeType,
        baseThemeType,
        scrollbarGutter
      };
      return;
    }
    this.themeCSSStyle = upsertHostThemeStyle({
      shadowRoot,
      currentNode: this.themeCSSStyle,
      themeCSS: wrapThemeCSS(themeStyles, effectiveThemeType, scrollbarGutter)
    });
    this.appliedThemeCSS = this.themeCSSStyle != null ? {
      theme,
      themeStyles,
      themeType: effectiveThemeType,
      baseThemeType,
      scrollbarGutter
    } : void 0;
  }
  hydrateMeasuredScrollbar() {
    const shadowRoot = this.fileContainer?.shadowRoot;
    if (shadowRoot == null || this.themeCSSStyle == null) return;
    this.themeCSSStyle.textContent = patchScrollbarGutterSize(this.themeCSSStyle.textContent ?? "", getMeasuredScrollbarGutter(shadowRoot));
  }
  shouldGuardRebuildScroll() {
    return this.editor != null && isSafari();
  }
  applyHunksToDOM(pre, result) {
    if (this.shouldGuardRebuildScroll()) guardWebKitScrollDuringRebuild(pre, () => this.replaceCodeColumns(pre, result));
    else this.replaceCodeColumns(pre, result);
  }
  applyCodeColumnsInPlace(code, ast, rowCount) {
    const columns = this.getColumnPair(code);
    if (columns == null) return false;
    const gutterChildren = getElementChildren(ast[0]);
    const contentChildren = getElementChildren(ast[1]);
    if (gutterChildren == null || contentChildren == null) return false;
    columns.gutter.innerHTML = toHtml(gutterChildren);
    columns.content.innerHTML = toHtml(contentChildren);
    if (rowCount !== this.lastRowCount) {
      columns.gutter.style.setProperty("grid-row", `span ${rowCount}`);
      columns.content.style.setProperty("grid-row", `span ${rowCount}`);
    }
    return true;
  }
  replaceCodeColumns(pre, result) {
    const { overflow = "scroll" } = this.options;
    const containerSize = (this.options.hunkSeparators ?? "line-info") === "line-info";
    const rowSpan = overflow === "wrap" ? result.rowCount : void 0;
    this.cleanupErrorWrapper();
    this.applyPreNodeAttributes(pre, result);
    let shouldReplace = false;
    const codeElements = [];
    const unifiedAST = this.hunksRenderer.renderCodeAST("unified", result);
    const deletionsAST = this.hunksRenderer.renderCodeAST("deletions", result);
    const additionsAST = this.hunksRenderer.renderCodeAST("additions", result);
    this.editor?.__captureFocusForDOMReplacement();
    if (unifiedAST != null) {
      shouldReplace = this.codeUnified == null || this.codeAdditions != null || this.codeDeletions != null;
      this.codeDeletions?.remove();
      this.codeDeletions = void 0;
      this.codeAdditions?.remove();
      this.codeAdditions = void 0;
      this.codeUnified = getOrCreateCodeNode({
        code: this.codeUnified,
        columnType: "unified",
        rowSpan,
        containerSize
      });
      if (!this.applyCodeColumnsInPlace(this.codeUnified, unifiedAST, result.rowCount)) this.codeUnified.innerHTML = this.hunksRenderer.renderPartialHTML(unifiedAST);
      codeElements.push(this.codeUnified);
    } else if (deletionsAST != null || additionsAST != null) {
      if (deletionsAST != null) {
        shouldReplace = this.codeDeletions == null || this.codeUnified != null;
        this.codeUnified?.remove();
        this.codeUnified = void 0;
        this.codeDeletions = getOrCreateCodeNode({
          code: this.codeDeletions,
          columnType: "deletions",
          rowSpan,
          containerSize
        });
        if (!this.applyCodeColumnsInPlace(this.codeDeletions, deletionsAST, result.rowCount)) this.codeDeletions.innerHTML = this.hunksRenderer.renderPartialHTML(deletionsAST);
        codeElements.push(this.codeDeletions);
      } else {
        this.codeDeletions?.remove();
        this.codeDeletions = void 0;
      }
      if (additionsAST != null) {
        shouldReplace = shouldReplace || this.codeAdditions == null || this.codeUnified != null;
        this.codeUnified?.remove();
        this.codeUnified = void 0;
        this.codeAdditions = getOrCreateCodeNode({
          code: this.codeAdditions,
          columnType: "additions",
          rowSpan,
          containerSize
        });
        if (!this.applyCodeColumnsInPlace(this.codeAdditions, additionsAST, result.rowCount)) this.codeAdditions.innerHTML = this.hunksRenderer.renderPartialHTML(additionsAST);
        codeElements.push(this.codeAdditions);
      } else {
        this.codeAdditions?.remove();
        this.codeAdditions = void 0;
      }
    } else {
      this.codeUnified?.remove();
      this.codeUnified = void 0;
      this.codeDeletions?.remove();
      this.codeDeletions = void 0;
      this.codeAdditions?.remove();
      this.codeAdditions = void 0;
    }
    if (codeElements.length === 0) pre.textContent = "";
    else if (shouldReplace) pre.replaceChildren(...codeElements);
    this.lastRowCount = result.rowCount;
  }
  applyPartialRender({ previousRenderRange, renderRange }) {
    const { pre, codeUnified, codeAdditions, codeDeletions, options: { diffStyle = "split" } } = this;
    if (pre == null || previousRenderRange == null || renderRange == null || !Number.isFinite(previousRenderRange.totalLines) || !Number.isFinite(renderRange.totalLines) || this.lastRowCount == null) return false;
    const codeElements = this.getCodeColumns(diffStyle, codeUnified, codeDeletions, codeAdditions);
    if (codeElements == null) return false;
    const previousStart = previousRenderRange.startingLine;
    const nextStart = renderRange.startingLine;
    const previousEnd = previousStart + previousRenderRange.totalLines;
    const nextEnd = nextStart + renderRange.totalLines;
    const overlapStart = Math.max(previousStart, nextStart);
    const overlapEnd = Math.min(previousEnd, nextEnd);
    if (overlapEnd <= overlapStart) return false;
    const trimStart = Math.max(0, overlapStart - previousStart);
    const trimEnd = Math.max(0, previousEnd - overlapEnd);
    const trimResult = this.trimColumns({
      columns: codeElements,
      trimStart,
      trimEnd,
      previousStart,
      overlapStart,
      overlapEnd,
      diffStyle
    });
    if (trimResult < 0) throw new Error("FileDiff.applyPartialRender: failed to trim to overlap");
    if (this.lastRowCount < trimResult) throw new Error("FileDiff.applyPartialRender: trimmed beyond DOM row count");
    let rowCount = this.lastRowCount - trimResult;
    const renderChunk = (startingLine, totalLines) => {
      if (totalLines <= 0 || this.fileDiff == null) return;
      return this.hunksRenderer.renderDiff(this.fileDiff, {
        startingLine,
        totalLines,
        bufferBefore: 0,
        bufferAfter: 0
      });
    };
    const prependResult = renderChunk(nextStart, Math.max(overlapStart - nextStart, 0));
    if (prependResult == null && nextStart < overlapStart) return false;
    const appendResult = renderChunk(overlapEnd, Math.max(nextEnd - overlapEnd, 0));
    if (appendResult == null && nextEnd > overlapEnd) return false;
    const applyChunk = (result, insertPosition) => {
      if (result == null) return;
      if (diffStyle === "unified" && !Array.isArray(codeElements)) this.insertPartialHTML(diffStyle, codeElements, result, insertPosition);
      else if (diffStyle === "split" && Array.isArray(codeElements)) this.insertPartialHTML(diffStyle, codeElements, result, insertPosition);
      else throw new Error("FileDiff.applyPartialRender.applyChunk: invalid chunk application");
      rowCount += result.rowCount;
    };
    this.cleanupErrorWrapper();
    applyChunk(prependResult, "afterbegin");
    applyChunk(appendResult, "beforeend");
    if (this.lastRowCount !== rowCount) {
      this.applyRowSpan(diffStyle, codeElements, rowCount);
      this.lastRowCount = rowCount;
    }
    return true;
  }
  insertPartialHTML(diffStyle, columns, result, insertPosition) {
    if (diffStyle === "unified" && !Array.isArray(columns)) {
      const unifiedAST = this.hunksRenderer.renderCodeAST("unified", result);
      this.renderPartialColumn(columns, unifiedAST, insertPosition);
    } else if (diffStyle === "split" && Array.isArray(columns)) {
      const deletionsAST = this.hunksRenderer.renderCodeAST("deletions", result);
      const additionsAST = this.hunksRenderer.renderCodeAST("additions", result);
      this.renderPartialColumn(columns[0], deletionsAST, insertPosition);
      this.renderPartialColumn(columns[1], additionsAST, insertPosition);
    } else throw new Error("FileDiff.insertPartialHTML: Invalid argument composition");
  }
  refreshSplitDiffView() {
    if (this.options.diffStyle !== "split") return;
    const hunksResult = this.hunksRenderer.renderDiff(this.fileDiff, this.renderRange);
    if (hunksResult == null) return;
    const columns = this.getCodeColumns("split", this.codeUnified, this.codeDeletions, this.codeAdditions);
    if (!Array.isArray(columns)) return;
    const applyLineType = (type, column) => {
      if (column == null) return;
      const ast = this.hunksRenderer.renderCodeAST(type, hunksResult);
      const gutterChildren = getElementChildren(ast?.[0]);
      const contentChildren = getElementChildren(ast?.[1]);
      for (const [el, astChildren] of [[column.gutter, gutterChildren], [column.content, contentChildren]]) if (astChildren != null && el.childElementCount === astChildren.length) for (let i2 = 0; i2 < astChildren.length; i2++) {
        const gutterElement = el.children[i2];
        const lineType = astChildren[i2].properties["data-line-type"];
        if (lineType != null && gutterElement.dataset.lineType !== lineType) gutterElement.dataset.lineType = lineType;
      }
    };
    applyLineType("deletions", columns[0]);
    applyLineType("additions", columns[1]);
  }
  refreshUnifiedDiffView() {
    if (this.options.diffStyle !== "unified") return;
    const hunksResult = this.hunksRenderer.renderDiff(this.fileDiff, this.renderRange);
    if (hunksResult == null) return;
    const columns = this.getCodeColumns("unified", this.codeUnified, this.codeDeletions, this.codeAdditions);
    if (columns == null || Array.isArray(columns)) return;
    const ast = this.hunksRenderer.renderCodeAST("unified", hunksResult);
    const gutterChildren = getElementChildren(ast?.[0]);
    const contentChildren = getElementChildren(ast?.[1]);
    const applyColumns = () => {
      for (const [el, astChildren] of [[columns.gutter, gutterChildren], [columns.content, contentChildren]]) if (astChildren != null) el.innerHTML = toHtml(astChildren);
      if (hunksResult.rowCount !== this.lastRowCount) {
        this.applyRowSpan("unified", columns, hunksResult.rowCount);
        this.lastRowCount = hunksResult.rowCount;
      }
    };
    if (this.shouldGuardRebuildScroll()) guardWebKitScrollDuringRebuild(this.pre, applyColumns);
    else applyColumns();
    this.renderSeparators(hunksResult.hunkData);
    this.managersDirty = true;
    this.flushManagers();
    this.syncRenderViewToEditor();
  }
  renderPartialColumn(column, ast, insertPosition) {
    if (column == null || ast == null) return;
    const gutterChildren = getElementChildren(ast[0]);
    const contentChildren = getElementChildren(ast[1]);
    if (gutterChildren == null || contentChildren == null) throw new Error("FileDiff.insertPartialHTML: Unexpected AST structure");
    const firstHASTElement = contentChildren.at(0);
    if (insertPosition === "beforeend" && firstHASTElement?.type === "element" && typeof firstHASTElement.properties["data-buffer-size"] === "number") this.mergeBuffersIfNecessary(firstHASTElement.properties["data-buffer-size"], column.content.children[column.content.children.length - 1], column.gutter.children[column.gutter.children.length - 1], gutterChildren, contentChildren, true);
    const lastHASTElement = contentChildren.at(-1);
    if (insertPosition === "afterbegin" && lastHASTElement?.type === "element" && typeof lastHASTElement.properties["data-buffer-size"] === "number") this.mergeBuffersIfNecessary(lastHASTElement.properties["data-buffer-size"], column.content.children[0], column.gutter.children[0], gutterChildren, contentChildren, false);
    column.gutter.insertAdjacentHTML(insertPosition, this.hunksRenderer.renderPartialHTML(gutterChildren));
    column.content.insertAdjacentHTML(insertPosition, this.hunksRenderer.renderPartialHTML(contentChildren));
  }
  mergeBuffersIfNecessary(adjustmentSize, contentElement, gutterElement, gutterChildren, contentChildren, fromStart) {
    if (!(contentElement instanceof HTMLElement) || !(gutterElement instanceof HTMLElement)) return;
    const currentSize = this.getBufferSize(contentElement.dataset);
    if (currentSize == null) return;
    if (fromStart) {
      gutterChildren.shift();
      contentChildren.shift();
    } else {
      gutterChildren.pop();
      contentChildren.pop();
    }
    this.updateBufferSize(contentElement, currentSize + adjustmentSize);
    this.updateBufferSize(gutterElement, currentSize + adjustmentSize);
  }
  applyRowSpan(diffStyle, columns, rowCount) {
    const applySpan = (column) => {
      if (column == null) return;
      column.gutter.style.setProperty("grid-row", `span ${rowCount}`);
      column.content.style.setProperty("grid-row", `span ${rowCount}`);
    };
    if (diffStyle === "unified" && !Array.isArray(columns)) applySpan(columns);
    else if (diffStyle === "split" && Array.isArray(columns)) {
      applySpan(columns[0]);
      applySpan(columns[1]);
    } else throw new Error("dun fuuuuked up");
  }
  trimColumnRows(columns, preTrimCount, postTrimStart) {
    let visibleLineIndex = 0;
    let rowCount = 0;
    let rowIndex = 0;
    let pendingMetadataTrim = false;
    const hasPostTrim = postTrimStart >= 0;
    if (columns == null) return 0;
    const contentChildren = Array.from(columns.content.children);
    const gutterChildren = Array.from(columns.gutter.children);
    if (contentChildren.length !== gutterChildren.length) throw new Error("FileDiff.trimColumnRows: columns do not match");
    while (rowIndex < contentChildren.length) {
      if (preTrimCount <= 0 && !hasPostTrim && !pendingMetadataTrim) break;
      const gutterElement = gutterChildren[rowIndex];
      const contentElement = contentChildren[rowIndex];
      rowIndex++;
      if (!(gutterElement instanceof HTMLElement) || !(contentElement instanceof HTMLElement)) {
        console.error({
          gutterElement,
          contentElement
        });
        throw new Error("FileDiff.trimColumnRows: invalid row elements");
      }
      if (pendingMetadataTrim) {
        pendingMetadataTrim = false;
        if (gutterElement.dataset.gutterBuffer === "annotation" && "lineAnnotation" in contentElement.dataset || gutterElement.dataset.gutterBuffer === "metadata" && "noNewline" in contentElement.dataset) {
          gutterElement.remove();
          contentElement.remove();
          rowCount++;
          continue;
        }
      }
      if ("lineIndex" in gutterElement.dataset && "lineIndex" in contentElement.dataset) {
        if (preTrimCount > 0 || hasPostTrim && visibleLineIndex >= postTrimStart) {
          gutterElement.remove();
          contentElement.remove();
          if (preTrimCount > 0) {
            preTrimCount--;
            if (preTrimCount === 0) pendingMetadataTrim = true;
          }
          rowCount++;
        }
        visibleLineIndex++;
        continue;
      }
      if ("separator" in gutterElement.dataset && "separator" in contentElement.dataset) {
        if (preTrimCount > 0 || hasPostTrim && visibleLineIndex >= postTrimStart) {
          gutterElement.remove();
          contentElement.remove();
          rowCount++;
        }
        continue;
      }
      if (gutterElement.dataset.gutterBuffer === "annotation" && "lineAnnotation" in contentElement.dataset) {
        if (preTrimCount > 0 || hasPostTrim && visibleLineIndex >= postTrimStart) {
          gutterElement.remove();
          contentElement.remove();
          rowCount++;
        }
        continue;
      }
      if (gutterElement.dataset.gutterBuffer === "metadata" && "noNewline" in contentElement.dataset) {
        if (preTrimCount > 0 || hasPostTrim && visibleLineIndex >= postTrimStart) {
          gutterElement.remove();
          contentElement.remove();
          rowCount++;
        }
        continue;
      }
      if (gutterElement.dataset.gutterBuffer === "buffer" && "contentBuffer" in contentElement.dataset) {
        const totalRows = this.getBufferSize(contentElement.dataset);
        if (totalRows == null) throw new Error("FileDiff.trimColumnRows: invalid element");
        if (preTrimCount > 0) {
          const rowsToRemove = Math.min(preTrimCount, totalRows);
          const newSize = totalRows - rowsToRemove;
          if (newSize > 0) {
            this.updateBufferSize(gutterElement, newSize);
            this.updateBufferSize(contentElement, newSize);
            rowCount += rowsToRemove;
          } else {
            gutterElement.remove();
            contentElement.remove();
            rowCount += totalRows;
          }
          preTrimCount -= rowsToRemove;
          if (preTrimCount === 0 && newSize === 0) pendingMetadataTrim = true;
        } else if (hasPostTrim) {
          const bufferStart = visibleLineIndex;
          const bufferEnd = visibleLineIndex + totalRows - 1;
          if (postTrimStart <= bufferStart) {
            gutterElement.remove();
            contentElement.remove();
            rowCount += totalRows;
          } else if (postTrimStart <= bufferEnd) {
            const rowsToRemove = bufferEnd - postTrimStart + 1;
            const newSize = totalRows - rowsToRemove;
            this.updateBufferSize(gutterElement, newSize);
            this.updateBufferSize(contentElement, newSize);
            rowCount += rowsToRemove;
          }
        }
        visibleLineIndex += totalRows;
        continue;
      }
      console.error({
        gutterElement,
        contentElement
      });
      throw new Error("FileDiff.trimColumnRows: unknown row elements");
    }
    return rowCount;
  }
  trimColumns({ columns, diffStyle, overlapEnd, overlapStart, previousStart, trimEnd, trimStart }) {
    const preTrimCount = Math.max(0, overlapStart - previousStart);
    const postTrimStart = overlapEnd - previousStart;
    if (postTrimStart < 0) throw new Error("FileDiff.trimColumns: overlap ends before previous");
    const shouldTrimStart = trimStart > 0;
    const shouldTrimEnd = trimEnd > 0;
    if (!shouldTrimStart && !shouldTrimEnd) return 0;
    const effectivePreTrimCount = shouldTrimStart ? preTrimCount : 0;
    const effectivePostTrimStart = shouldTrimEnd ? postTrimStart : -1;
    if (diffStyle === "unified" && !Array.isArray(columns)) return this.trimColumnRows(columns, effectivePreTrimCount, effectivePostTrimStart);
    else if (diffStyle === "split" && Array.isArray(columns)) {
      const deletionsTrim = this.trimColumnRows(columns[0], effectivePreTrimCount, effectivePostTrimStart);
      const additionsTrim = this.trimColumnRows(columns[1], effectivePreTrimCount, effectivePostTrimStart);
      if (columns[0] != null && columns[1] != null && deletionsTrim !== additionsTrim) throw new Error("FileDiff.trimColumns: split columns out of sync");
      return columns[0] != null ? deletionsTrim : additionsTrim;
    } else {
      console.error({
        diffStyle,
        columns
      });
      throw new Error("FileDiff.trimColumns: Invalid columns for diffType");
    }
  }
  getBufferSize(properties) {
    const parsed = Number.parseInt(properties?.bufferSize ?? "", 10);
    return Number.isNaN(parsed) ? void 0 : parsed;
  }
  updateBufferSize(element2, size) {
    element2.dataset.bufferSize = `${size}`;
    element2.style.setProperty("grid-row", `span ${size}`);
    element2.style.setProperty("min-height", `calc(${size} * 1lh)`);
  }
  getColumnPair(code) {
    if (code == null) return;
    const gutter = code.children[0];
    const content = code.children[1];
    if (!(gutter instanceof HTMLElement) || !(content instanceof HTMLElement) || gutter.dataset.gutter == null || content.dataset.content == null) return;
    return {
      gutter,
      content
    };
  }
  getCodeColumns(diffStyle, codeUnified, codeDeletions, codeAdditions) {
    if (diffStyle === "unified") return this.getColumnPair(codeUnified);
    else {
      const deletions = this.getColumnPair(codeDeletions);
      const additions = this.getColumnPair(codeAdditions);
      return deletions != null || additions != null ? [deletions, additions] : void 0;
    }
  }
  updateBuffers(renderRange) {
    if (this.pre != null) this.applyBuffers(this.pre, renderRange);
  }
  applyBuffers(pre, renderRange) {
    if (renderRange == null || this.shouldDisableVirtualizationBuffers()) {
      if (this.bufferBefore != null) {
        this.bufferBefore.remove();
        this.bufferBefore = void 0;
      }
      if (this.bufferAfter != null) {
        this.bufferAfter.remove();
        this.bufferAfter = void 0;
      }
      return;
    }
    if (renderRange.bufferBefore > 0) {
      if (this.bufferBefore == null) {
        this.bufferBefore = document.createElement("div");
        this.bufferBefore.dataset.virtualizerBuffer = "before";
        pre.before(this.bufferBefore);
      }
      this.bufferBefore.style.setProperty("height", `${renderRange.bufferBefore}px`);
      this.bufferBefore.style.setProperty("contain", "strict");
    } else if (this.bufferBefore != null) {
      this.bufferBefore.remove();
      this.bufferBefore = void 0;
    }
    if (renderRange.bufferAfter > 0) {
      if (this.bufferAfter == null) {
        this.bufferAfter = document.createElement("div");
        this.bufferAfter.dataset.virtualizerBuffer = "after";
        pre.after(this.bufferAfter);
      }
      this.bufferAfter.style.setProperty("height", `${renderRange.bufferAfter}px`);
      this.bufferAfter.style.setProperty("contain", "strict");
    } else if (this.bufferAfter != null) {
      this.bufferAfter.remove();
      this.bufferAfter = void 0;
    }
  }
  shouldDisableVirtualizationBuffers() {
    return this.options.disableVirtualizationBuffers ?? false;
  }
  applyPreNodeAttributes(pre, { additionsContentAST, deletionsContentAST, totalLines }, customProperties) {
    const { diffIndicators = "bars", disableBackground = false, disableLineNumbers = false, overflow = "scroll", diffStyle = "split" } = this.options;
    const preProperties = {
      type: "diff",
      diffIndicators,
      disableBackground,
      disableLineNumbers,
      overflow,
      split: diffStyle === "unified" ? false : additionsContentAST != null && deletionsContentAST != null,
      totalLines,
      customProperties
    };
    if (arePrePropertiesEqual(preProperties, this.appliedPreAttributes)) return;
    setPreNodeProperties(pre, preProperties);
    this.appliedPreAttributes = preProperties;
  }
  applyErrorToDOM(error, container) {
    this.cleanupErrorWrapper();
    this.pre?.remove();
    this.pre = void 0;
    this.appliedPreAttributes = void 0;
    const shadowRoot = container.shadowRoot ?? container.attachShadow({ mode: "open" });
    this.errorWrapper ??= document.createElement("div");
    this.errorWrapper.dataset.errorWrapper = "";
    this.errorWrapper.textContent = "";
    shadowRoot.appendChild(this.errorWrapper);
    const errorMessage = document.createElement("div");
    errorMessage.dataset.errorMessage = "";
    errorMessage.innerText = error.message;
    this.errorWrapper.appendChild(errorMessage);
    const errorStack = document.createElement("pre");
    errorStack.dataset.errorStack = "";
    errorStack.innerText = error.stack ?? "No Error Stack";
    this.errorWrapper.appendChild(errorStack);
  }
  cleanupErrorWrapper() {
    this.errorWrapper?.remove();
    this.errorWrapper = void 0;
  }
};
function areOptionalFilesEqual$1(fileA, fileB) {
  if (fileA == null || fileB == null) return fileA == null && fileB == null;
  return areFilesEqual(fileA, fileB);
}
function hasDiffContent({ fileDiff, oldFile, newFile }) {
  return fileDiff != null && fileDiff.hunks.length > 0 || oldFile != null || newFile != null;
}
function hasDiffHeaderContent({ fileDiff, oldFile, newFile }) {
  return fileDiff != null || oldFile != null || newFile != null;
}
function shouldRenderCode(pre, hasContent, collapsed = false) {
  return !collapsed && pre == null && hasContent;
}
function shouldRenderHeader(headerElement, hasContent, disableFileHeader = false) {
  return headerElement == null && hasContent && !disableFileHeader;
}
function getElementChildren(node) {
  if (node == null || node.type !== "element") return;
  return node.children ?? [];
}
const VIRTUALIZED_FILE_DIFF_LAYOUT_CHECKPOINT_INTERVAL = 3e3;
let instanceId = -1;
var VirtualizedFileDiff = class extends FileDiff$1 {
  __id = `little-virtualized-file-diff:${++instanceId}`;
  top;
  height = 0;
  metrics;
  cache = {
    heightDeltas: /* @__PURE__ */ new Map(),
    measuredHeightDeltaTotal: 0,
    estimatedSplitHeight: void 0,
    estimatedUnifiedHeight: void 0,
    checkpoints: [],
    totalLines: 0,
    fileAnnotationHeight: 0
  };
  isVisible = false;
  isSetup = false;
  virtualizer;
  layoutDirty = true;
  forceRenderOverride;
  currentCollapsed;
  currentExpandUnchanged;
  pendingHydratedDiff;
  pendingExpansions;
  constructor(options, virtualizer, metrics, workerManager, isContainerManaged = false) {
    super(options, workerManager, isContainerManaged);
    this.virtualizer = virtualizer;
    this.metrics = computeVirtualFileMetrics(metrics);
  }
  setMetrics(metrics, force = false) {
    const nextMetrics = computeVirtualFileMetrics(metrics);
    if (!force && areObjectsEqual(this.metrics, nextMetrics)) return;
    this.metrics = nextMetrics;
    this.resetLayoutCache({ includeEstimatedHeights: true });
  }
  setLineAnnotations(lineAnnotations) {
    if (this.syncLineAnnotations(lineAnnotations)) this.resetLayoutCache({ includeEstimatedHeights: false });
  }
  syncLineAnnotations(lineAnnotations) {
    if (lineAnnotations == null || lineAnnotations === this.lineAnnotations || lineAnnotations.length === 0 && this.lineAnnotations.length === 0) return false;
    super.setLineAnnotations(lineAnnotations);
    return true;
  }
  setFileAnnotationHeight(nextHeight) {
    const previousHeight = this.cache.fileAnnotationHeight;
    if (nextHeight === previousHeight) return false;
    this.cache.fileAnnotationHeight = nextHeight;
    this.cache.measuredHeightDeltaTotal += nextHeight - previousHeight;
    return true;
  }
  hasFileAnnotations(fileDiff = this.fileDiff) {
    if (fileDiff == null || !includesFileAnnotations(this.lineAnnotations)) return false;
    return this.lineAnnotations.some((annotation) => {
      if (annotation.lineNumber !== 0) return false;
      if (fileDiff.type === "new") return annotation.side === "additions";
      if (fileDiff.type === "deleted") return annotation.side === "deletions";
      return true;
    });
  }
  getLineHeight(lineIndex, hasMetadataLine = false) {
    return this.getEstimatedLineHeight(hasMetadataLine) + (this.cache.heightDeltas.get(lineIndex) ?? 0);
  }
  getEstimatedLineHeight(hasMetadataLine = false) {
    const multiplier = hasMetadataLine ? 2 : 1;
    return this.metrics.lineHeight * multiplier;
  }
  setOptions(options) {
    if (this.isAdvancedMode()) throw new Error("VirtualizedFileDiff.setOptions cannot be used inside CodeView. Update CodeView options instead.");
    if (options == null) return;
    const { options: previousOptions } = this;
    const optionsChanged = !areOptionsEqual(previousOptions, options);
    const layoutChanged = optionsChanged && hasDiffLayoutOptionChanged(previousOptions, options);
    super.setOptions(options);
    if (layoutChanged) this.resetLayoutCache({
      forceSimpleRecompute: true,
      includeEstimatedHeights: hasDiffEstimateOptionChanged(previousOptions, options)
    });
    if (optionsChanged) this.forceRenderOverride = true;
    if (optionsChanged && this.isSimpleMode()) this.virtualizer.instanceChanged(this, layoutChanged);
  }
  setThemeType(themeType) {
    if (this.isAdvancedMode()) throw new Error("VirtualizedFileDiff.setThemeType cannot be used inside CodeView. Update CodeView options instead.");
    super.setThemeType(themeType);
  }
  resetLayoutCache({ forceSimpleRecompute = false, includeEstimatedHeights = false, resetRenderRange = true } = {}) {
    this.layoutDirty = true;
    this.cache.fileAnnotationHeight = 0;
    if (this.cache.heightDeltas.size > 0) this.cache.heightDeltas.clear();
    if (this.cache.measuredHeightDeltaTotal !== 0) this.cache.measuredHeightDeltaTotal = 0;
    this.invalidateDerivedLayoutCache(includeEstimatedHeights, resetRenderRange);
    if (forceSimpleRecompute && this.isSimpleMode()) this.computeApproximateSize();
  }
  invalidateDerivedLayoutCache(includeEstimatedHeights, resetRenderRange = true) {
    this.layoutDirty = true;
    if (this.cache.checkpoints.length > 0) this.cache.checkpoints.length = 0;
    if (this.cache.totalLines !== 0) this.cache.totalLines = 0;
    if (includeEstimatedHeights) {
      this.cache.estimatedSplitHeight = void 0;
      this.cache.estimatedUnifiedHeight = void 0;
    }
    if (this.renderRange != null && resetRenderRange) this.renderRange = void 0;
  }
  reconcileHeights() {
    let hasHeightChange = false;
    const { overflow = "scroll" } = this.options;
    if (this.fileContainer == null || this.fileDiff == null) {
      if (this.height !== 0) hasHeightChange = true;
      this.height = 0;
      return hasHeightChange;
    }
    this.top = this.getVirtualizedTop();
    if (overflow === "scroll" && this.lineAnnotations.length === 0 && !this.isResizeDebuggingEnabled()) return hasHeightChange;
    const diffStyle = this.getDiffStyle();
    const codeGroups = diffStyle === "split" ? [this.codeDeletions, this.codeAdditions] : [this.codeUnified];
    const hasFileAnnotations = this.hasFileAnnotations(this.fileDiff);
    if (this.renderRange != null && hasFileAnnotations && shouldRenderFileAnnotations(this.renderRange)) {
      const nextFileAnnotationHeight = measureFileAnnotationHeight(codeGroups) ?? 0;
      if (this.setFileAnnotationHeight(nextFileAnnotationHeight)) hasHeightChange = true;
    } else if (!hasFileAnnotations && this.setFileAnnotationHeight(0)) hasHeightChange = true;
    for (const codeGroup of codeGroups) {
      if (codeGroup == null) continue;
      const content = codeGroup.children[1];
      if (!(content instanceof HTMLElement)) continue;
      for (const line of content.children) {
        if (!(line instanceof HTMLElement)) continue;
        const lineIndexAttr = line.dataset.lineIndex;
        if (lineIndexAttr == null) continue;
        const lineIndex = parseLineIndex(lineIndexAttr, diffStyle);
        let measuredHeight = line.getBoundingClientRect().height;
        let hasMetadata = false;
        if (line.nextElementSibling instanceof HTMLElement && ("lineAnnotation" in line.nextElementSibling.dataset || "noNewline" in line.nextElementSibling.dataset)) {
          if ("noNewline" in line.nextElementSibling.dataset) hasMetadata = true;
          measuredHeight += line.nextElementSibling.getBoundingClientRect().height;
        }
        const estimatedHeight = this.getEstimatedLineHeight(hasMetadata);
        const previousDelta = this.cache.heightDeltas.get(lineIndex) ?? 0;
        const nextDelta = measuredHeight - estimatedHeight;
        if (nextDelta === previousDelta) continue;
        hasHeightChange = true;
        this.cache.measuredHeightDeltaTotal += nextDelta - previousDelta;
        if (nextDelta === 0) this.cache.heightDeltas.delete(lineIndex);
        else this.cache.heightDeltas.set(lineIndex, nextDelta);
      }
    }
    if (hasHeightChange || this.isResizeDebuggingEnabled()) this.computeApproximateSize(true);
    return hasHeightChange;
  }
  onRender = (dirty) => {
    if (this.fileContainer == null) return false;
    if (dirty) this.top = this.getVirtualizedTop();
    return this.render();
  };
  flushManagers() {
    super.flushManagers();
    if (this.lineStateRefreshPending) this.flushDeferredLineState();
  }
  prepareCodeViewItem(fileDiff, top, reset, lineAnnotations) {
    const targetChanged = !areDiffTargetsEqual(this.fileDiff, fileDiff);
    const annotationsChanged = this.syncLineAnnotations(lineAnnotations);
    let shouldResetLayoutCache = reset?.resetDiffLayoutCache === true || targetChanged || annotationsChanged;
    let includeEstimatedHeights = targetChanged || reset?.resetDiffLayoutCache === true && reset.includeEstimatedDiffHeights;
    if (reset?.metrics != null) {
      this.metrics = computeVirtualFileMetrics(reset.metrics);
      shouldResetLayoutCache = true;
      includeEstimatedHeights = true;
    }
    const { collapsed = false, expandUnchanged = false } = this.options;
    if (this.currentCollapsed !== collapsed) {
      this.currentCollapsed = collapsed;
      shouldResetLayoutCache = true;
    }
    if (this.currentExpandUnchanged !== expandUnchanged) {
      this.currentExpandUnchanged = expandUnchanged;
      shouldResetLayoutCache = true;
      includeEstimatedHeights = true;
    }
    if (shouldResetLayoutCache) this.resetLayoutCache({ includeEstimatedHeights });
    this.fileDiff = fileDiff;
    this.top = top;
    this.computeApproximateSize();
    return this.height;
  }
  getLinePosition(lineNumber, side = "additions") {
    if (this.fileDiff == null || lineNumber < 1) return;
    const targetLineIndexes = this.getLineIndex(lineNumber, side);
    if (targetLineIndexes == null) return;
    const { disableFileHeader = false, expandUnchanged = false, collapsed = false, collapsedContextThreshold = 1 } = this.options;
    const diffStyle = this.getDiffStyle();
    const hunkSeparators = this.getHunkSeparatorType();
    const targetLineIndex = diffStyle === "split" ? targetLineIndexes[1] : targetLineIndexes[0];
    this.approximateLayoutCheckpoints();
    const headerRegion = getVirtualFileHeaderRegion(this.metrics, disableFileHeader);
    const checkpoint = this.getLayoutCheckpointBeforeLineIndex(targetLineIndex);
    let top = checkpoint?.top ?? headerRegion + this.cache.fileAnnotationHeight;
    if (collapsed) return {
      top: headerRegion,
      height: 0
    };
    let position;
    iterateOverDiff({
      diff: this.fileDiff,
      diffStyle,
      startingLine: checkpoint?.renderedLineIndex ?? 0,
      expandedHunks: expandUnchanged ? true : this.hunksRenderer.getExpandedHunksMap(),
      collapsedContextThreshold,
      callback: ({ hunkIndex, hunk, collapsedBefore, collapsedAfter, deletionLine, additionLine }) => {
        const lineIndex = diffStyle === "split" ? additionLine?.splitLineIndex ?? deletionLine?.splitLineIndex : additionLine?.unifiedLineIndex ?? deletionLine?.unifiedLineIndex;
        if (lineIndex == null) throw new Error("VirtualizedFileDiff.getLinePosition: missing line index data");
        if (collapsedBefore > 0) {
          const separator = getLeadingHunkSeparatorLayout({
            type: hunkSeparators,
            metrics: this.metrics,
            hunkIndex,
            hunkSpecs: hunk?.hunkSpecs
          });
          if (separator != null) {
            top += separator.gapBefore;
            if (targetLineIndex >= lineIndex - collapsedBefore && targetLineIndex < lineIndex) {
              position = {
                top,
                height: separator.height
              };
              return true;
            }
            top += separator.height + separator.gapAfter;
          }
        }
        const lineHeight = this.getLineHeight(lineIndex, (additionLine?.noEOFCR ?? false) || (deletionLine?.noEOFCR ?? false));
        if (lineIndex === targetLineIndex) {
          position = {
            top,
            height: lineHeight
          };
          return true;
        }
        top += lineHeight;
        if (collapsedAfter > 0) {
          const separator = getTrailingHunkSeparatorLayout({
            type: hunkSeparators,
            metrics: this.metrics
          });
          if (separator != null) {
            if (targetLineIndex > lineIndex && targetLineIndex <= lineIndex + collapsedAfter) {
              position = {
                top: top + separator.gapBefore,
                height: separator.height
              };
              return true;
            }
            top += separator.totalHeight;
          }
        }
        return false;
      }
    });
    return position;
  }
  getEditorViewport() {
    return this.virtualizer.type === "simple" ? this.virtualizer.getRoot() : this.virtualizer.getContainerElement();
  }
  getNumericScrollAnchor(localViewportTop) {
    if (this.fileDiff == null) return;
    const { disableFileHeader = false, expandUnchanged = false, collapsed = false, collapsedContextThreshold = 1 } = this.options;
    if (collapsed) return;
    const diffStyle = this.getDiffStyle();
    const hunkSeparators = this.getHunkSeparatorType();
    this.approximateLayoutCheckpoints();
    const checkpoint = this.getLayoutCheckpointBeforeTop(localViewportTop);
    let top = checkpoint?.top ?? getVirtualFileHeaderRegion(this.metrics, disableFileHeader) + this.cache.fileAnnotationHeight;
    let anchor;
    iterateOverDiff({
      diff: this.fileDiff,
      diffStyle,
      startingLine: checkpoint?.renderedLineIndex ?? 0,
      expandedHunks: expandUnchanged ? true : this.hunksRenderer.getExpandedHunksMap(),
      collapsedContextThreshold,
      callback: ({ hunkIndex, hunk, collapsedBefore, collapsedAfter, deletionLine, additionLine }) => {
        const lineIndex = diffStyle === "split" ? additionLine?.splitLineIndex ?? deletionLine?.splitLineIndex : additionLine?.unifiedLineIndex ?? deletionLine?.unifiedLineIndex;
        if (lineIndex == null) throw new Error("VirtualizedFileDiff.getNumericScrollAnchor: missing line index data");
        if (collapsedBefore > 0) {
          const separator = getLeadingHunkSeparatorLayout({
            type: hunkSeparators,
            metrics: this.metrics,
            hunkIndex,
            hunkSpecs: hunk?.hunkSpecs
          });
          if (separator != null) top += separator.totalHeight;
        }
        if (top >= localViewportTop) {
          if (deletionLine != null) anchor = {
            lineNumber: deletionLine.lineNumber,
            side: "deletions",
            top
          };
          else if (additionLine != null) anchor = {
            lineNumber: additionLine.lineNumber,
            side: "additions",
            top
          };
          if (anchor != null) return true;
        }
        const lineHeight = this.getLineHeight(lineIndex, (additionLine?.noEOFCR ?? false) || (deletionLine?.noEOFCR ?? false));
        top += lineHeight;
        if (collapsedAfter > 0) {
          const separator = getTrailingHunkSeparatorLayout({
            type: hunkSeparators,
            metrics: this.metrics
          });
          if (separator != null) top += separator.totalHeight;
        }
        return false;
      }
    });
    return anchor;
  }
  getVirtualizedHeight() {
    return this.height;
  }
  getAdvancedStickySpecs(windowSpecs) {
    if (this.top == null || this.fileDiff == null) return;
    if (this.options.collapsed === true) return {
      topOffset: this.top,
      height: this.height
    };
    const renderRange = windowSpecs != null ? this.computeRenderRangeFromWindow(this.fileDiff, this.top, windowSpecs) : this.renderRange;
    if (renderRange == null) return;
    const { bufferBefore, bufferAfter, totalLines } = renderRange;
    let headerOnlyOffset = 0;
    if (totalLines === 0) {
      const activeWindow = windowSpecs ?? this.virtualizer.getWindowSpecs();
      if (this.top < activeWindow.top) headerOnlyOffset = bufferAfter;
    }
    return {
      topOffset: this.top + bufferBefore + headerOnlyOffset,
      height: this.height - (bufferBefore + bufferAfter)
    };
  }
  cleanUp(recycle = false) {
    if (this.fileContainer != null && this.isSimpleMode()) this.getSimpleVirtualizer()?.disconnect(this.fileContainer);
    if (!recycle) {
      this.resetLayoutCache({ includeEstimatedHeights: true });
      this.pendingExpansions = void 0;
      this.pendingHydratedDiff = void 0;
    }
    this.isSetup = false;
    super.cleanUp(recycle);
  }
  expandHunk = (hunkIndex, direction, expansionLineCountOverride) => {
    if (this.fileDiff == null) return;
    if (this.isAdvancedMode()) {
      this.pendingExpansions ??= [];
      this.pendingExpansions.push({
        hunkIndex,
        direction,
        expansionLineCountOverride
      });
    } else {
      this.hunksRenderer.expandHunk(hunkIndex, direction, expansionLineCountOverride);
      this.resetLayoutCache({ includeEstimatedHeights: true });
      this.computeApproximateSize();
    }
    this.loadFilesIfNecessary();
    this.forceRenderOverride = true;
    this.virtualizer.instanceChanged(this, true);
  };
  async handleFilesLoaded(expectedDiff, files) {
    if (this.fileDiff !== expectedDiff || !expectedDiff.isPartial) return;
    if (this.isAdvancedMode()) {
      const nextDiff = hydratePartialDiff("clone", expectedDiff, files);
      await awaitWithTimeout(() => this.primeHighlightCache(nextDiff));
      if (!this.enabled || this.fileDiff !== expectedDiff) return;
      this.pendingHydratedDiff = {
        expectedDiff,
        nextDiff,
        files
      };
    } else {
      hydratePartialDiff("merge", expectedDiff, files);
      this.setHydratedState(files);
      await awaitWithTimeout(() => this.primeHighlightCache(expectedDiff));
      if (!this.enabled || this.fileDiff !== expectedDiff) return;
      this.resetLayoutCache({ includeEstimatedHeights: true });
      this.computeApproximateSize();
    }
    this.forceRenderOverride = true;
    this.virtualizer.instanceChanged(this, true);
  }
  consumeCodeViewLayoutChanges(expectedFileDiff) {
    let hasLayoutChange = false;
    let nextDiff;
    const { pendingExpansions, pendingHydratedDiff } = this;
    if (pendingExpansions != null) {
      this.pendingExpansions = void 0;
      for (const pendingExpansion of pendingExpansions) {
        this.hunksRenderer.expandHunk(pendingExpansion.hunkIndex, pendingExpansion.direction, pendingExpansion.expansionLineCountOverride);
        hasLayoutChange = true;
      }
    }
    if (pendingHydratedDiff != null) {
      this.pendingHydratedDiff = void 0;
      if (pendingHydratedDiff.expectedDiff === expectedFileDiff) {
        this.setHydratedState(pendingHydratedDiff.files);
        nextDiff = pendingHydratedDiff.nextDiff;
      }
    }
    if (nextDiff != null) {
      this.forceRenderOverride = true;
      this.resetLayoutCache({ includeEstimatedHeights: true });
    } else if (hasLayoutChange) {
      this.forceRenderOverride = true;
      this.invalidateDerivedLayoutCache(true);
    }
    return nextDiff;
  }
  loadFilesIfNecessary() {
    if (this.pendingHydratedDiff != null) {
      if (this.pendingHydratedDiff.expectedDiff === this.fileDiff) return;
      this.pendingHydratedDiff = void 0;
    }
    super.loadFilesIfNecessary();
  }
  isLineRenderable(lineNumber) {
    if (super.isLineRenderable(lineNumber)) return true;
    const { pendingExpansions } = this;
    const fileDiff = this.fileDiffCache;
    if (pendingExpansions == null || pendingExpansions.length === 0 || fileDiff == null) return false;
    const { expansionLineCount = 100, collapsedContextThreshold = 1 } = this.options;
    const staged = new Map(this.hunksRenderer.getExpandedHunksMap());
    for (const expansion of pendingExpansions) {
      const region = { ...staged.get(expansion.hunkIndex) ?? {
        fromStart: 0,
        fromEnd: 0
      } };
      const count = expansion.expansionLineCountOverride ?? expansionLineCount;
      if (expansion.direction === "up" || expansion.direction === "both") region.fromStart += count;
      if (expansion.direction === "down" || expansion.direction === "both") region.fromEnd += count;
      staged.set(expansion.hunkIndex, region);
    }
    return isAdditionLineRenderable({
      fileDiff,
      lineNumber,
      expandedHunks: staged,
      collapsedContextThreshold
    });
  }
  /**
  * Invalidate layout after an edit session changed the rendered row set
  * without a line-count change (a mid-session region change or the exit
  * recompute): estimated heights bake the hunk shapes in, and nothing else
  * invalidates them now that editing does not flip expandUnchanged. Public
  * so CodeView can run it when reaping a session whose instance was already
  * released.
  */
  invalidateEditSessionLayout() {
    this.getSimpleVirtualizer()?.markDOMDirty();
    this.resetLayoutCache({
      forceSimpleRecompute: this.isSimpleMode(),
      includeEstimatedHeights: true,
      resetRenderRange: false
    });
    if (!this.isSimpleMode()) this.computeApproximateSize(true);
    this.getSimpleVirtualizer()?.requestHeightReconcile(this);
  }
  escalateEditSessionRender() {
    this.invalidateEditSessionLayout();
    if (!this.enabled || this.fileDiff == null) return;
    this.forceRenderOverride = true;
    this.virtualizer.instanceChanged(this, true);
  }
  shouldSelfHealEditSession() {
    return !this.isAdvancedMode() && super.shouldSelfHealEditSession();
  }
  setVisibility(visible) {
    if (this.isAdvancedMode() || this.fileContainer == null) return;
    this.renderRange = void 0;
    if (visible && !this.isVisible) {
      this.top = this.getVirtualizedTop();
      this.isVisible = true;
    } else if (!visible && this.isVisible) {
      this.isVisible = false;
      this.rerender();
    }
  }
  rerender() {
    if (!this.enabled || this.fileDiff == null && this.additionFile == null && this.deletionFile == null) return;
    this.forceRenderOverride = true;
    this.virtualizer.instanceChanged(this, false);
  }
  applyDocumentChange(textDocument, newLineAnnotations, shouldUpdateBuffer = false) {
    const { renderRange: previousRenderRange } = this;
    this.getAdvancedVirtualizer()?.capturePendingLayoutAnchor();
    super.applyDocumentChange(textDocument, newLineAnnotations);
    this.getSimpleVirtualizer()?.markDOMDirty();
    this.resetLayoutCache({
      forceSimpleRecompute: this.isSimpleMode(),
      includeEstimatedHeights: true,
      resetRenderRange: false
    });
    if (!this.isSimpleMode()) this.computeApproximateSize(true);
    else if (shouldUpdateBuffer && previousRenderRange !== void 0 && this.fileDiff !== void 0) {
      const windowSpecs = this.virtualizer.getWindowSpecs();
      const renderRange = this.computeRenderRangeFromWindow(this.fileDiff, this.top ?? 0, windowSpecs);
      if (renderRange.bufferAfter !== previousRenderRange.bufferAfter) this.updateBuffers(renderRange);
    }
    this.forceRenderOverride = true;
    this.virtualizer.instanceChanged(this, true);
  }
  computeApproximateSize(force = false, fileDiff = this.fileDiff) {
    const shouldValidateSize = this.isResizeDebuggingEnabled();
    if (!force && !this.layoutDirty && !shouldValidateSize) return;
    const isFirstCompute = this.height === 0;
    this.height = 0;
    this.cache.checkpoints = [];
    this.cache.totalLines = 0;
    if (fileDiff == null) {
      this.layoutDirty = false;
      return;
    }
    const { disableFileHeader = false, collapsed = false } = this.options;
    const headerRegion = getVirtualFileHeaderRegion(this.metrics, disableFileHeader);
    this.height += headerRegion;
    if (collapsed) {
      this.layoutDirty = false;
      return;
    }
    this.height = this.getActiveEstimatedHeight(fileDiff) + this.cache.measuredHeightDeltaTotal;
    if (shouldValidateSize && !isFirstCompute) this.validateComputedHeight(fileDiff);
    this.layoutDirty = false;
  }
  getActiveEstimatedHeight(fileDiff = this.fileDiff) {
    this.ensureEstimatedDiffHeights(fileDiff);
    const estimatedHeight = this.getDiffStyle() === "split" ? this.cache.estimatedSplitHeight : this.cache.estimatedUnifiedHeight;
    if (estimatedHeight == null) throw new Error("VirtualizedFileDiff.getActiveEstimatedHeight: missing estimated height");
    return estimatedHeight;
  }
  ensureEstimatedDiffHeights(fileDiff = this.fileDiff) {
    if (fileDiff == null) {
      this.cache.estimatedSplitHeight = void 0;
      this.cache.estimatedUnifiedHeight = void 0;
      return;
    }
    if (this.cache.estimatedSplitHeight != null && this.cache.estimatedUnifiedHeight != null) return;
    const { disableFileHeader = false, expandUnchanged = false, collapsedContextThreshold = 1 } = this.options;
    const { splitHeight, unifiedHeight } = computeEstimatedDiffHeights({
      fileDiff,
      metrics: this.metrics,
      disableFileHeader,
      hunkSeparators: this.getHunkSeparatorType(),
      expandUnchanged,
      expandedHunks: this.hunksRenderer.getExpandedHunksMap(),
      collapsedContextThreshold,
      canHydratePartialDiff: canHydrateCollapsedContext(fileDiff, this.options.loadDiffFiles != null)
    });
    this.cache.estimatedSplitHeight = splitHeight;
    this.cache.estimatedUnifiedHeight = unifiedHeight;
  }
  validateComputedHeight(fileDiff = this.fileDiff) {
    if (this.fileContainer == null || fileDiff == null) return;
    const rect = this.fileContainer.getBoundingClientRect();
    if (rect.height !== this.height) console.log("VirtualizedFileDiff.computeApproximateSize: computed height doesnt match", {
      name: fileDiff.name,
      elementHeight: rect.height,
      computedHeight: this.height
    });
    else console.log("VirtualizedFileDiff.computeApproximateSize: computed height IS CORRECT");
  }
  render({ fileContainer, fileDiff, forceRender = false, lineAnnotations, ...fileInputProps } = {}) {
    const fileInput = getDiffFileInput(fileInputProps, "VirtualizedFileDiff.render");
    const hasFileInput = fileInput != null;
    const oldFile = fileInput?.oldFile;
    const newFile = fileInput?.newFile;
    const filesDidChange = hasFileInput && (!areOptionalFilesEqual(oldFile, this.deletionFile) || !areOptionalFilesEqual(newFile, this.additionFile));
    let nextFileDiff = fileDiff ?? this.fileDiff;
    if (fileDiff == null && hasFileInput && (filesDidChange || this.fileDiff == null)) nextFileDiff = parseDiffFromFile(fileInput.oldFile, fileInput.newFile, this.options.parseDiffOptions);
    const { forceRenderOverride, isSetup } = this;
    this.forceRenderOverride = void 0;
    const annotationsChanged = this.syncLineAnnotations(lineAnnotations);
    if (annotationsChanged) this.resetLayoutCache({ includeEstimatedHeights: false });
    const diffInputChanged = fileDiff != null && fileDiff !== this.fileDiff;
    const targetChanged = nextFileDiff != null && !areDiffTargetsEqual(this.fileDiff, nextFileDiff);
    const dataChanged = diffInputChanged || filesDidChange;
    if (targetChanged) this.resetLayoutCache({ includeEstimatedHeights: true });
    fileContainer = this.getOrCreateFileContainer(fileContainer);
    if (nextFileDiff == null) {
      console.error("VirtualizedFileDiff.render: attempting to virtually render when we dont have the correct data");
      return false;
    }
    if (!isSetup) {
      this.computeApproximateSize(false, nextFileDiff);
      const virtualizer = this.getSimpleVirtualizer();
      this.top ??= this.getVirtualizedTop();
      if (this.isAdvancedMode()) this.isVisible = true;
      else {
        if (virtualizer == null) throw new Error("VirtualizedFileDiff.render: simple virtualizer is not available");
        virtualizer.connect(fileContainer, this);
        this.isVisible = virtualizer.isInstanceVisible(this.top ?? 0, this.height);
      }
      this.isSetup = true;
    } else {
      this.top ??= this.getVirtualizedTop();
      if (targetChanged) {
        this.getSimpleVirtualizer()?.markDOMDirty();
        this.computeApproximateSize(false, nextFileDiff);
      }
    }
    if (!this.isVisible && this.isSimpleMode() && (!dataChanged || !isSetup)) {
      this.fileDiff = nextFileDiff;
      if (fileInput != null) {
        this.deletionFile = oldFile;
        this.additionFile = newFile;
      }
      if (targetChanged) this.cachedHeaderHTML = void 0;
      return this.renderPlaceholder(this.height);
    }
    const windowSpecs = this.virtualizer.getWindowSpecs();
    const fileTop = this.top ?? 0;
    const renderRange = this.computeRenderRangeFromWindow(nextFileDiff, fileTop, windowSpecs);
    const rendered = super.render({
      fileDiff: nextFileDiff,
      fileContainer,
      renderRange,
      lineAnnotations,
      forceRender: (forceRenderOverride ?? forceRender) || annotationsChanged || targetChanged,
      ...fileInput,
      ...fileInputProps
    });
    if (this.isSimpleMode() && rendered) this.getSimpleVirtualizer()?.requestHeightReconcile(this);
    return rendered;
  }
  syncVirtualizedTop() {
    this.top = this.getVirtualizedTop();
  }
  shouldDisableVirtualizationBuffers() {
    return this.isAdvancedMode() || super.shouldDisableVirtualizationBuffers();
  }
  shouldGuardRebuildScroll() {
    return false;
  }
  isSimpleMode() {
    return this.virtualizer.type === "simple";
  }
  isAdvancedMode() {
    return this.virtualizer.type === "advanced";
  }
  getVirtualizedTop() {
    if (this.virtualizer.type === "advanced") return this.virtualizer.getLocalTopForInstance(this);
    return this.fileContainer != null ? this.virtualizer.getOffsetInScrollContainer(this.fileContainer) : 0;
  }
  getSimpleVirtualizer() {
    return this.virtualizer.type === "simple" ? this.virtualizer : void 0;
  }
  getAdvancedVirtualizer() {
    return this.virtualizer.type === "advanced" ? this.virtualizer : void 0;
  }
  isResizeDebuggingEnabled() {
    return this.getSimpleVirtualizer()?.config.resizeDebugging ?? false;
  }
  getDiffStyle() {
    return this.options.diffStyle ?? "split";
  }
  getHunkSeparatorType() {
    return getOptionHunkSeparatorType(this.options.hunkSeparators);
  }
  approximateLayoutCheckpoints(fileDiff = this.fileDiff) {
    if (!this.layoutDirty && this.cache.checkpoints.length > 0 || fileDiff == null || fileDiff.hunks.length === 0 || this.options.collapsed === true) return;
    const { disableFileHeader = false, expandUnchanged = false, collapsedContextThreshold = 1 } = this.options;
    const finalHunkIndex = fileDiff.hunks.length - 1;
    const canHydratePartialDiff = canHydrateCollapsedContext(fileDiff, this.options.loadDiffFiles != null);
    const diffStyle = this.getDiffStyle();
    const hunkSeparators = this.getHunkSeparatorType();
    const expandedHunks = expandUnchanged ? true : this.hunksRenderer.getExpandedHunksMap();
    const heightDeltaPrefix = createHeightDeltaPrefix(this.cache.heightDeltas);
    let top = getVirtualFileHeaderRegion(this.metrics, disableFileHeader) + this.cache.fileAnnotationHeight;
    let renderedLineIndex = 0;
    const processRows = ({ rowCount, startLineIndex, preSeparatorHeight = 0, postSeparatorHeight = 0, metadataOffsets = [] }) => {
      if (rowCount <= 0) return;
      const blockStart = renderedLineIndex;
      const blockEnd = renderedLineIndex + rowCount;
      let nextCheckpoint = getNextCheckpointIndex(blockStart);
      while (nextCheckpoint < blockEnd) {
        const offset = nextCheckpoint - blockStart;
        const checkpointTop = top + (offset > 0 ? preSeparatorHeight : 0) + offset * this.metrics.lineHeight + countMetadataOffsetsBefore(metadataOffsets, offset) * this.metrics.lineHeight + sumHeightDeltas(heightDeltaPrefix, startLineIndex, startLineIndex + offset);
        this.cache.checkpoints.push({
          renderedLineIndex: nextCheckpoint,
          lineIndex: startLineIndex + offset,
          top: checkpointTop
        });
        nextCheckpoint += VIRTUALIZED_FILE_DIFF_LAYOUT_CHECKPOINT_INTERVAL;
      }
      top += preSeparatorHeight + rowCount * this.metrics.lineHeight + metadataOffsets.length * this.metrics.lineHeight + sumHeightDeltas(heightDeltaPrefix, startLineIndex, startLineIndex + rowCount) + postSeparatorHeight;
      renderedLineIndex = blockEnd;
    };
    for (let hunkIndex = 0; hunkIndex < fileDiff.hunks.length; hunkIndex++) {
      const hunk = fileDiff.hunks[hunkIndex];
      if (hunk == null) throw new Error("VirtualizedFileDiff.approximateLayoutCheckpoints: invalid hunk index");
      const leadingRegion = getExpandedRegion({
        isPartial: fileDiff.isPartial,
        rangeSize: hunk.collapsedBefore,
        expandedHunks,
        hunkIndex,
        collapsedContextThreshold
      });
      const leadingSeparatorHeight = leadingRegion.collapsedLines > 0 ? getLeadingHunkSeparatorLayout({
        type: hunkSeparators,
        metrics: this.metrics,
        hunkIndex,
        hunkSpecs: hunk.hunkSpecs
      })?.totalHeight ?? 0 : 0;
      processRows({
        rowCount: leadingRegion.fromStart,
        startLineIndex: (diffStyle === "split" ? hunk.splitLineStart : hunk.unifiedLineStart) - leadingRegion.rangeSize
      });
      let pendingLeadingSeparatorHeight = leadingSeparatorHeight;
      processRows({
        rowCount: leadingRegion.fromEnd,
        startLineIndex: (diffStyle === "split" ? hunk.splitLineStart : hunk.unifiedLineStart) - leadingRegion.fromEnd,
        preSeparatorHeight: pendingLeadingSeparatorHeight
      });
      if (leadingRegion.fromEnd > 0) pendingLeadingSeparatorHeight = 0;
      const trailingRegion = hunkIndex === finalHunkIndex ? getTrailingExpandedRegion({
        fileDiff,
        hunkIndex,
        expandedHunks,
        collapsedContextThreshold,
        errorPrefix: "VirtualizedFileDiff"
      }) : void 0;
      const trailingSeparatorHeight = trailingRegion != null && trailingRegion.collapsedLines > 0 ? getTrailingHunkSeparatorLayout({
        type: hunkSeparators,
        metrics: this.metrics
      })?.totalHeight ?? 0 : hunkIndex === finalHunkIndex && canHydratePartialDiff ? getTrailingHunkSeparatorLayout({
        type: hunkSeparators,
        metrics: this.metrics
      })?.totalHeight ?? 0 : 0;
      const trailingExpandedCount = trailingRegion != null ? trailingRegion.fromStart + trailingRegion.fromEnd : 0;
      const hunkBodyRowCount = diffStyle === "split" ? hunk.splitLineCount : hunk.unifiedLineCount;
      const hunkBodyStartLineIndex = diffStyle === "split" ? hunk.splitLineStart : hunk.unifiedLineStart;
      processRows({
        rowCount: hunkBodyRowCount,
        startLineIndex: hunkBodyStartLineIndex,
        preSeparatorHeight: pendingLeadingSeparatorHeight,
        postSeparatorHeight: trailingExpandedCount === 0 ? trailingSeparatorHeight : 0,
        metadataOffsets: getHunkMetadataOffsets({
          diffStyle,
          hunk,
          rowCount: hunkBodyRowCount
        })
      });
      if (trailingRegion != null && trailingExpandedCount > 0) processRows({
        rowCount: trailingExpandedCount,
        startLineIndex: hunkBodyStartLineIndex + hunkBodyRowCount,
        postSeparatorHeight: trailingSeparatorHeight
      });
    }
    this.cache.totalLines = renderedLineIndex;
  }
  getLayoutCheckpointBeforeLineIndex(lineIndex) {
    if (lineIndex <= 0 || this.cache.checkpoints.length === 0) return;
    let low = 0;
    let high = this.cache.checkpoints.length - 1;
    let result;
    while (low <= high) {
      const mid = low + high >> 1;
      const checkpoint = this.cache.checkpoints[mid];
      if (checkpoint == null) throw new Error("VirtualizedFileDiff: invalid checkpoint index");
      if (checkpoint.lineIndex <= lineIndex) {
        result = checkpoint;
        low = mid + 1;
      } else high = mid - 1;
    }
    return result;
  }
  getLayoutCheckpointBeforeTop(top, hunkLineCount) {
    let low = 0;
    let high = this.cache.checkpoints.length - 1;
    let resultIndex = -1;
    while (low <= high) {
      const mid = low + high >> 1;
      const checkpoint = this.cache.checkpoints[mid];
      if (checkpoint == null) throw new Error("VirtualizedFileDiff: invalid checkpoint index");
      if (checkpoint.top <= top) {
        resultIndex = mid;
        low = mid + 1;
      } else high = mid - 1;
    }
    if (hunkLineCount == null) return resultIndex >= 0 ? this.cache.checkpoints[resultIndex] : void 0;
    for (let index = resultIndex; index >= 0; index--) {
      const checkpoint = this.cache.checkpoints[index];
      if (checkpoint == null) throw new Error("VirtualizedFileDiff: invalid checkpoint index");
      if (checkpoint.renderedLineIndex % hunkLineCount === 0) return checkpoint;
    }
  }
  getExpandedLineCount(fileDiff, diffStyle) {
    let count = 0;
    if (fileDiff.isPartial) {
      for (const hunk of fileDiff.hunks) count += diffStyle === "split" ? hunk.splitLineCount : hunk.unifiedLineCount;
      return count;
    }
    const { expandUnchanged = false, collapsedContextThreshold = 1 } = this.options;
    const expandedHunks = expandUnchanged ? true : this.hunksRenderer.getExpandedHunksMap();
    for (const [hunkIndex, hunk] of fileDiff.hunks.entries()) {
      const hunkCount = diffStyle === "split" ? hunk.splitLineCount : hunk.unifiedLineCount;
      count += hunkCount;
      const collapsedBefore = Math.max(hunk.collapsedBefore, 0);
      const { fromStart, fromEnd, renderAll } = getExpandedRegion({
        isPartial: fileDiff.isPartial,
        rangeSize: collapsedBefore,
        expandedHunks,
        hunkIndex,
        collapsedContextThreshold
      });
      if (collapsedBefore > 0) count += renderAll ? collapsedBefore : fromStart + fromEnd;
    }
    const trailingRegion = getTrailingExpandedRegion({
      fileDiff,
      hunkIndex: fileDiff.hunks.length - 1,
      expandedHunks,
      collapsedContextThreshold,
      errorPrefix: "VirtualizedFileDiff"
    });
    if (trailingRegion != null) count += trailingRegion.fromStart + trailingRegion.fromEnd;
    return count;
  }
  getLayoutLineCount(fileDiff, diffStyle) {
    const expandedLineCount = this.getExpandedLineCount(fileDiff, diffStyle);
    const metadataLineCount = diffStyle === "split" ? fileDiff.splitLineCount : fileDiff.unifiedLineCount;
    return Math.max(expandedLineCount, metadataLineCount, fileDiff.additionLines.length, fileDiff.deletionLines.length, this.cache.totalLines);
  }
  computeRenderRangeFromWindow(fileDiff, fileTop, { top, bottom }) {
    const { disableFileHeader = false, expandUnchanged = false, collapsedContextThreshold = 1 } = this.options;
    const { hunkLineCount, lineHeight } = this.metrics;
    const diffStyle = this.getDiffStyle();
    const hunkSeparators = this.getHunkSeparatorType();
    const canHydratePartialDiff = canHydrateCollapsedContext(fileDiff, this.options.loadDiffFiles != null);
    const fileHeight = this.height;
    let lineCount = this.getLayoutLineCount(fileDiff, diffStyle);
    const headerRegion = getVirtualFileHeaderRegion(this.metrics, disableFileHeader);
    const paddingBottom = fileDiff.hunks.length > 0 ? getVirtualFilePaddingBottom(this.metrics) : 0;
    const { fileAnnotationHeight } = this.cache;
    const codeRegionTop = headerRegion + fileAnnotationHeight;
    const codeHeight = Math.max(0, fileHeight - headerRegion - fileAnnotationHeight - paddingBottom);
    const hasFileAnnotations = this.hasFileAnnotations(fileDiff);
    const fileAnnotationTop = fileTop + headerRegion;
    const measuredFileAnnotationVisible = fileAnnotationHeight > 0 && hasFileAnnotations && fileAnnotationTop < bottom && fileAnnotationTop + fileAnnotationHeight > top;
    if (fileTop < top - fileHeight || fileTop > bottom) return {
      startingLine: 0,
      totalLines: 0,
      bufferBefore: 0,
      bufferAfter: fileHeight - headerRegion - paddingBottom
    };
    if (lineCount <= hunkLineCount || fileDiff.hunks.length === 0) return {
      startingLine: 0,
      totalLines: hunkLineCount,
      bufferBefore: 0,
      bufferAfter: 0
    };
    this.approximateLayoutCheckpoints(fileDiff);
    lineCount = this.getLayoutLineCount(fileDiff, diffStyle);
    const estimatedTargetLines = Math.ceil(Math.max(bottom - top, 0) / lineHeight);
    const totalLines = Math.ceil(estimatedTargetLines / hunkLineCount) * hunkLineCount + hunkLineCount;
    const totalHunks = totalLines / hunkLineCount;
    const overflowHunks = totalHunks;
    const hunkOffsets = [];
    const viewportCenter = (top + bottom) / 2;
    const checkpoint = this.getLayoutCheckpointBeforeTop(Math.max(0, top - fileTop - totalLines * lineHeight * 2), hunkLineCount);
    let absoluteLineTop = fileTop + (checkpoint?.top ?? codeRegionTop);
    let currentLine = checkpoint?.renderedLineIndex ?? 0;
    let firstVisibleHunk;
    let centerHunk;
    let overflowCounter;
    iterateOverDiff({
      diff: fileDiff,
      diffStyle,
      startingLine: checkpoint?.renderedLineIndex ?? 0,
      expandedHunks: expandUnchanged ? true : this.hunksRenderer.getExpandedHunksMap(),
      collapsedContextThreshold,
      callback: ({ hunkIndex, hunk, collapsedBefore, collapsedAfter, deletionLine, additionLine }) => {
        const splitLineIndex = additionLine != null ? additionLine.splitLineIndex : deletionLine.splitLineIndex;
        const unifiedLineIndex = additionLine != null ? additionLine.unifiedLineIndex : deletionLine.unifiedLineIndex;
        const hasMetadata = (additionLine?.noEOFCR ?? false) || (deletionLine?.noEOFCR ?? false);
        const isFinalHunkRow = hunkIndex === fileDiff.hunks.length - 1 && hunk != null && (diffStyle === "split" ? splitLineIndex === hunk.splitLineStart + hunk.splitLineCount - 1 : unifiedLineIndex === hunk.unifiedLineStart + hunk.unifiedLineCount - 1);
        const gapAdjustment = (collapsedBefore > 0 ? getLeadingHunkSeparatorLayout({
          type: hunkSeparators,
          metrics: this.metrics,
          hunkIndex,
          hunkSpecs: hunk?.hunkSpecs
        }) : void 0)?.totalHeight ?? 0;
        absoluteLineTop += gapAdjustment;
        const isAtHunkBoundary = currentLine % hunkLineCount === 0;
        const currentHunk = Math.floor(currentLine / hunkLineCount);
        if (isAtHunkBoundary) {
          hunkOffsets[currentHunk] = absoluteLineTop - (fileTop + codeRegionTop + gapAdjustment);
          if (overflowCounter != null) {
            if (overflowCounter <= 0) return true;
            overflowCounter--;
          }
        }
        const lineHeight2 = this.getLineHeight(diffStyle === "split" ? splitLineIndex : unifiedLineIndex, hasMetadata);
        if (absoluteLineTop > top - lineHeight2 && absoluteLineTop < bottom) firstVisibleHunk ??= currentHunk;
        if (centerHunk == null && absoluteLineTop + lineHeight2 > viewportCenter) centerHunk = currentHunk;
        if (overflowCounter == null && absoluteLineTop >= bottom && isAtHunkBoundary) overflowCounter = overflowHunks;
        currentLine++;
        absoluteLineTop += lineHeight2;
        if (collapsedAfter > 0 || isFinalHunkRow && canHydratePartialDiff) {
          const trailingSeparator = getTrailingHunkSeparatorLayout({
            type: hunkSeparators,
            metrics: this.metrics
          });
          if (trailingSeparator != null) {
            if (absoluteLineTop < bottom && absoluteLineTop + trailingSeparator.totalHeight > top) firstVisibleHunk ??= currentHunk;
            if (centerHunk == null && absoluteLineTop + trailingSeparator.totalHeight > viewportCenter) centerHunk = currentHunk;
            absoluteLineTop += trailingSeparator.totalHeight;
          }
        }
        return false;
      }
    });
    if (firstVisibleHunk == null) if (measuredFileAnnotationVisible) {
      firstVisibleHunk = 0;
      centerHunk = 0;
    } else return {
      startingLine: 0,
      totalLines: 0,
      bufferBefore: 0,
      bufferAfter: fileHeight - headerRegion - paddingBottom
    };
    centerHunk ??= firstVisibleHunk;
    const idealStartHunk = Math.round(centerHunk - totalHunks / 2);
    const maxStartHunk = Math.max(0, Math.ceil(lineCount / hunkLineCount) - totalHunks);
    const startHunk = Math.max(0, Math.min(idealStartHunk, maxStartHunk));
    const startingLine = startHunk * hunkLineCount;
    const clampedTotalLines = idealStartHunk < 0 ? totalLines + idealStartHunk * hunkLineCount : totalLines;
    const codeBufferBefore = hunkOffsets[startHunk] ?? 0;
    const bufferBefore = startingLine === 0 ? 0 : fileAnnotationHeight + codeBufferBefore;
    const finalHunkIndex = startHunk + clampedTotalLines / hunkLineCount;
    const bufferAfter = finalHunkIndex < hunkOffsets.length ? codeHeight - hunkOffsets[finalHunkIndex] : codeHeight - (absoluteLineTop - fileTop - codeRegionTop);
    return {
      startingLine,
      totalLines: clampedTotalLines,
      bufferBefore,
      bufferAfter: Math.max(0, bufferAfter)
    };
  }
};
function measureFileAnnotationHeight(codeGroups) {
  let height;
  for (const codeGroup of codeGroups) {
    if (codeGroup == null) continue;
    const content = codeGroup.children[1];
    if (!(content instanceof HTMLElement)) continue;
    for (const child of content.children) {
      if (!(child instanceof HTMLElement)) continue;
      if (child.dataset.lineAnnotation !== FILE_ANNOTATION_DOM_KEY) continue;
      height = Math.max(height ?? 0, child.getBoundingClientRect().height);
    }
  }
  return height;
}
function createHeightDeltaPrefix(heightDeltas) {
  const entries = Array.from(heightDeltas).sort((a, b2) => a[0] - b2[0]);
  const lineIndexes = [];
  const prefixTotals = [0];
  let total = 0;
  for (const [lineIndex, delta] of entries) {
    lineIndexes.push(lineIndex);
    total += delta;
    prefixTotals.push(total);
  }
  return {
    lineIndexes,
    prefixTotals
  };
}
function sumHeightDeltas({ lineIndexes, prefixTotals }, startLineIndex, endLineIndex) {
  if (startLineIndex >= endLineIndex || lineIndexes.length === 0) return 0;
  const start = lowerBound(lineIndexes, startLineIndex);
  return (prefixTotals[lowerBound(lineIndexes, endLineIndex)] ?? 0) - (prefixTotals[start] ?? 0);
}
function lowerBound(values, target) {
  let low = 0;
  let high = values.length;
  while (low < high) {
    const mid = low + high >> 1;
    const value = values[mid];
    if (value == null) throw new Error("VirtualizedFileDiff: invalid prefix index");
    if (value < target) low = mid + 1;
    else high = mid;
  }
  return low;
}
function getNextCheckpointIndex(renderedLineIndex) {
  return Math.ceil(renderedLineIndex / VIRTUALIZED_FILE_DIFF_LAYOUT_CHECKPOINT_INTERVAL) * VIRTUALIZED_FILE_DIFF_LAYOUT_CHECKPOINT_INTERVAL;
}
function countMetadataOffsetsBefore(metadataOffsets, offset) {
  let count = 0;
  for (const metadataOffset of metadataOffsets) if (metadataOffset < offset) count++;
  return count;
}
function getHunkMetadataOffsets({ diffStyle, hunk, rowCount }) {
  if (rowCount <= 0 || !hunk.noEOFCRAdditions && !hunk.noEOFCRDeletions) return [];
  const lastContent = hunk.hunkContent.at(-1);
  if (lastContent == null) return [];
  if (lastContent.type === "context") return [rowCount - 1];
  const splitCount = Math.max(lastContent.deletions, lastContent.additions);
  const unifiedCount = lastContent.deletions + lastContent.additions;
  if (diffStyle === "split") return splitCount > 0 && (hunk.noEOFCRAdditions || hunk.noEOFCRDeletions) ? [rowCount - 1] : [];
  const offsets = [];
  const contentStartOffset = rowCount - unifiedCount;
  if (lastContent.deletions > 0 && hunk.noEOFCRDeletions) offsets.push(contentStartOffset + lastContent.deletions - 1);
  if (lastContent.additions > 0 && hunk.noEOFCRAdditions) offsets.push(rowCount - 1);
  return offsets;
}
function hasDiffLayoutOptionChanged(previousOptions, nextOptions) {
  return (previousOptions.diffStyle ?? "split") !== (nextOptions.diffStyle ?? "split") || (previousOptions.overflow ?? "scroll") !== (nextOptions.overflow ?? "scroll") || (previousOptions.collapsed ?? false) !== (nextOptions.collapsed ?? false) || (previousOptions.disableLineNumbers ?? false) !== (nextOptions.disableLineNumbers ?? false) || (previousOptions.disableFileHeader ?? false) !== (nextOptions.disableFileHeader ?? false) || (previousOptions.diffIndicators ?? "bars") !== (nextOptions.diffIndicators ?? "bars") || (previousOptions.hunkSeparators ?? "line-info") !== (nextOptions.hunkSeparators ?? "line-info") || Boolean(previousOptions.loadDiffFiles) !== Boolean(nextOptions.loadDiffFiles) || (previousOptions.expandUnchanged ?? false) !== (nextOptions.expandUnchanged ?? false) || (previousOptions.collapsedContextThreshold ?? 1) !== (nextOptions.collapsedContextThreshold ?? 1) || previousOptions.unsafeCSS !== nextOptions.unsafeCSS;
}
function hasDiffEstimateOptionChanged(previousOptions, nextOptions) {
  return (previousOptions.disableFileHeader ?? false) !== (nextOptions.disableFileHeader ?? false) || (previousOptions.hunkSeparators ?? "line-info") !== (nextOptions.hunkSeparators ?? "line-info") || Boolean(previousOptions.loadDiffFiles) !== Boolean(nextOptions.loadDiffFiles) || (previousOptions.expandUnchanged ?? false) !== (nextOptions.expandUnchanged ?? false) || (previousOptions.collapsedContextThreshold ?? 1) !== (nextOptions.collapsedContextThreshold ?? 1);
}
function canHydrateCollapsedContext(fileDiff, hasFileLoader) {
  return fileDiff.isPartial && hasFileLoader && (fileDiff.type === "change" || fileDiff.type === "rename-changed");
}
function getOptionHunkSeparatorType(hunkSeparators) {
  return typeof hunkSeparators === "function" ? "custom" : hunkSeparators ?? "line-info";
}
function areOptionalFilesEqual(fileA, fileB) {
  if (fileA == null || fileB == null) return fileA == null && fileB == null;
  return areFilesEqual(fileA, fileB);
}
function parseLineIndex(lineIndexAttr, diffStyle) {
  const [unifiedIndex, splitIndex] = lineIndexAttr.split(",").map(Number);
  return diffStyle === "split" ? splitIndex : unifiedIndex;
}
function templateRender(children, __html) {
  if (typeof window === "undefined" && __html != null) return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [/* @__PURE__ */ jsxRuntimeExports.jsx("template", {
    shadowrootmode: "open",
    dangerouslySetInnerHTML: { __html }
  }), children] });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children });
}
const VirtualizerContext = reactExports.createContext(void 0);
function useVirtualizer() {
  return reactExports.useContext(VirtualizerContext);
}
const useIsomorphicLayoutEffect = typeof window === "undefined" ? reactExports.useEffect : reactExports.useLayoutEffect;
function useFileDiffInstance({ fileDiff, options, editorOptions, lineAnnotations, selectedLines, prerenderedHTML, metrics, hasGutterRenderUtility, hasCustomHeader, disableWorkerPool, edit }) {
  const simpleVirtualizer = useVirtualizer();
  const controlledSelection = selectedLines !== void 0;
  const poolManager = reactExports.useContext(WorkerPoolContext);
  const createEditor = useCreateEditor();
  const instanceRef = reactExports.useRef(null);
  const ref = useStableCallback((fileContainer) => {
    if (fileContainer != null) {
      if (instanceRef.current != null) throw new Error("useFileDiffInstance: An instance should not already exist when a node is created");
      if (simpleVirtualizer != null) instanceRef.current = new VirtualizedFileDiff(mergeFileDiffOptions({
        controlledSelection,
        hasCustomHeader,
        hasGutterRenderUtility,
        options
      }), simpleVirtualizer, metrics, !disableWorkerPool ? poolManager : void 0, true);
      else instanceRef.current = new FileDiff$1(mergeFileDiffOptions({
        controlledSelection,
        hasCustomHeader,
        hasGutterRenderUtility,
        options
      }), !disableWorkerPool ? poolManager : void 0, true);
      instanceRef.current.hydrate({
        fileDiff,
        fileContainer,
        lineAnnotations,
        prerenderedHTML
      });
    } else {
      if (instanceRef.current == null) throw new Error("useFileDiffInstance: A FileDiff instance should exist when unmounting");
      instanceRef.current.cleanUp();
      instanceRef.current = null;
    }
  });
  useIsomorphicLayoutEffect(() => {
    const { current: instance } = instanceRef;
    if (instance == null) return;
    const newOptions = mergeFileDiffOptions({
      controlledSelection,
      hasCustomHeader,
      hasGutterRenderUtility,
      options
    });
    const forceRender = newOptions !== void 0 && !areOptionsEqual(instance.options, newOptions);
    instance.setOptions(newOptions);
    instance.render({
      forceRender,
      fileDiff,
      lineAnnotations
    });
    if (selectedLines !== void 0) instance.setSelectedLines(selectedLines);
  });
  useIsomorphicLayoutEffect(() => {
    if (edit && instanceRef.current != null) {
      if (createEditor === void 0) throw new Error("FileDiff: EditContext is not attached");
      const editor = createEditor(editorOptions ?? {});
      if (editor == null) throw new Error("FileDiff: EditProvider.createEditor must return an editor instance");
      try {
        return editor.edit(instanceRef.current);
      } catch (error) {
        editor.cleanUp();
        throw error;
      }
    }
  }, [edit]);
  return {
    ref,
    getHoveredLine: reactExports.useCallback(() => {
      return instanceRef.current?.getHoveredLine();
    }, [])
  };
}
function mergeFileDiffOptions({ options, controlledSelection, hasCustomHeader, hasGutterRenderUtility }) {
  if (!(controlledSelection || hasGutterRenderUtility || hasCustomHeader)) return options;
  return {
    ...options,
    controlledSelection,
    renderCustomHeader: hasCustomHeader ? noopRender : options?.renderCustomHeader,
    renderGutterUtility: hasGutterRenderUtility ? noopRender : options?.renderGutterUtility
  };
}
function FileDiff2({ fileDiff, options, editorOptions, metrics, lineAnnotations, selectedLines, className, style, prerenderedHTML, renderAnnotation, renderCustomHeader, renderHeaderPrefix, renderHeaderFilenameSuffix, renderHeaderMetadata, renderGutterUtility, disableWorkerPool = false, edit = false }) {
  const { ref, getHoveredLine } = useFileDiffInstance({
    fileDiff,
    options,
    editorOptions,
    metrics,
    lineAnnotations,
    selectedLines,
    prerenderedHTML,
    hasGutterRenderUtility: renderGutterUtility != null,
    hasCustomHeader: renderCustomHeader != null,
    disableWorkerPool,
    edit
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(DIFFS_TAG_NAME, {
    ref,
    className,
    style,
    children: templateRender(renderDiffChildren({
      fileDiff,
      renderCustomHeader,
      renderHeaderPrefix,
      renderHeaderFilenameSuffix,
      renderHeaderMetadata,
      renderAnnotation,
      renderGutterUtility,
      lineAnnotations,
      getHoveredLine
    }), prerenderedHTML)
  });
}
export {
  getLineAnnotationName as $,
  createFileHeaderElement as A,
  createGutterGap as B,
  CUSTOM_HEADER_SLOT_ID as C,
  DEFAULT_RENDER_RANGE as D,
  EMPTY_RENDER_RANGE as E,
  FILE_ANNOTATION_DOM_KEY as F,
  GutterUtilitySlotStyles as G,
  HEADER_FILENAME_SUFFIX_SLOT_ID as H,
  INITIAL as I,
  createGutterItem as J,
  createGutterUtilityContentNode as K,
  createGutterWrapper as L,
  createHastElement as M,
  createPreElement as N,
  createTransformerWithState as O,
  createUnsafeCSSStyleNode as P,
  dequeueRender as Q,
  ResizeManager as R,
  SVGSpriteSheet as S,
  deriveMutedFg as T,
  formatCSSVariablePrefix as U,
  getFileAnnotations as V,
  WorkerPoolContext as W,
  getFiletypeFromFileName as X,
  getHighlighterIfLoaded as Y,
  getHighlighterOptions as Z,
  getHighlighterThemeStyles as _,
  DEFAULT_THEMES as a,
  getLineNodes as a0,
  getMeasuredScrollbarGutter as a1,
  getOrCreateCodeNode as a2,
  getSharedHighlighter as a3,
  getThemes as a4,
  getVirtualFileHeaderRegion as a5,
  getVirtualFilePaddingBottom as a6,
  guardWebKitScrollDuringRebuild as a7,
  hoverWouldEraseText as a8,
  includesFileAnnotations as a9,
  useCreateEditor as aA,
  useFileDiffInstance as aB,
  useStableCallback as aC,
  useVirtualizer as aD,
  wrapThemeCSS as aE,
  wrapUnsafeCSS as aF,
  isDarkSurface as aa,
  isFullyTransparent as ab,
  isGutterUtilityPath as ac,
  isMacLike as ad,
  isSafari as ae,
  isStyleNode as af,
  linesFromFileContents as ag,
  noopRender as ah,
  parseDiffFromFile as ai,
  parsePatchFiles as aj,
  patchScrollbarGutterSize as ak,
  pickReadableForeground as al,
  pluckInteractionOptions as am,
  preloadHighlighter as an,
  prerenderHTMLIfNecessary as ao,
  queueRender as ap,
  relativeLuminance as aq,
  renderDiffChildren as ar,
  setPreNodeProperties as as,
  shouldRenderFileAnnotations as at,
  shouldUseTokenTransformer as au,
  surfacesMatch as av,
  templateRender as aw,
  themeResolver as ax,
  toHtml as ay,
  upsertHostThemeStyle as az,
  DEFAULT_VIRTUAL_FILE_METRICS as b,
  DIFFS_TAG_NAME as c,
  EditProvider as d,
  EncodedTokenMetadata as e,
  FileDiff2 as f,
  HEADER_METADATA_SLOT_ID as g,
  HEADER_PREFIX_SLOT_ID as h,
  InteractionManager as i,
  applyLineTextWithNewline as j,
  areFilesEqual as k,
  areLanguagesAttached as l,
  areObjectsEqual as m,
  areOptionsEqual as n,
  arePrePropertiesEqual as o,
  areRenderRangesEqual as p,
  areThemesAttached as q,
  areThemesEqual as r,
  compositeOverBg as s,
  computeLineOffsets as t,
  computeVirtualFileMetrics as u,
  contrastRatio as v,
  countLineBreaks as w,
  createAnnotationElement as x,
  createAnnotationWrapperNode as y,
  createContentColumn as z
};
//# sourceMappingURL=FileDiff-CNuZdHKn.js.map

//# debugId=e41766dc-f6f4-5f69-bafc-09ec0d43947f
