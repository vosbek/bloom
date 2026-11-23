
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="83b23c28-8088-515e-b36a-1eac383096d2")}catch(e){}}();
const OFFSET = 0xcbf29ce484222325n;
const PRIME = 0x100000001b3n;
const MASK = 0xffffffffffffffffn;
function fnv1a64Hex(input) {
  let hash = OFFSET;
  for (let i = 0; i < input.length; i++) {
    const code = input.charCodeAt(i);
    hash ^= BigInt(code & 255);
    hash = hash * PRIME & MASK;
    hash ^= BigInt(code >> 8 & 255);
    hash = hash * PRIME & MASK;
  }
  return hash.toString(16).padStart(16, "0");
}
const contentHash = (content) => `fnv1a64:${fnv1a64Hex(content)}`;
export {
  contentHash as c,
  fnv1a64Hex as f
};
//# sourceMappingURL=hash-DXS7Ca7H.js.map

//# debugId=83b23c28-8088-515e-b36a-1eac383096d2
