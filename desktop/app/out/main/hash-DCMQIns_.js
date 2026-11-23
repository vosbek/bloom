"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="9c5ad4d1-03be-5c6e-a059-b933958d6e8e")}catch(e){}}();

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
exports.contentHash = contentHash;
exports.fnv1a64Hex = fnv1a64Hex;
//# sourceMappingURL=hash-DCMQIns_.js.map

//# debugId=9c5ad4d1-03be-5c6e-a059-b933958d6e8e
