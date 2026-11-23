"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="b66f4184-b4e1-529a-81f0-38d61592f638")}catch(e){}}();

const index = require("./index-DaMMxjo0.js");
function _mergeNamespaces(n, m) {
  for (var i = 0; i < m.length; i++) {
    const e = m[i];
    if (typeof e !== "string" && !Array.isArray(e)) {
      for (const k in e) {
        if (k !== "default" && !(k in n)) {
          const d = Object.getOwnPropertyDescriptor(e, k);
          if (d) {
            Object.defineProperty(n, k, d.get ? d : {
              enumerable: true,
              get: () => e[k]
            });
          }
        }
      }
    }
  }
  return Object.freeze(Object.defineProperty(n, Symbol.toStringTag, { value: "Module" }));
}
var tokenUtilExports = index.requireTokenUtil();
const tokenUtil = /* @__PURE__ */ index.getDefaultExportFromCjs(tokenUtilExports);
const tokenUtil$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: tokenUtil
}, [tokenUtilExports]);
exports.tokenUtil = tokenUtil$1;
//# sourceMappingURL=token-util-ClfVXrBv.js.map

//# debugId=b66f4184-b4e1-529a-81f0-38d61592f638
