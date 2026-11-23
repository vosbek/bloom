
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="24333ae1-ee1e-5353-b8e2-730a15c7e206")}catch(e){}}();
import html from "./html-GC16tDh9.js";
import "./javascript-BsAkV7mL.js";
import "./css-BtVcDqlU.js";
const lang = Object.freeze(JSON.parse('{"displayName":"HTML (Derivative)","injections":{"R:text.html - (comment.block, text.html meta.embedded, meta.tag.*.*.html, meta.tag.*.*.*.html, meta.tag.*.*.*.*.html)":{"patterns":[{"match":"<","name":"invalid.illegal.bad-angle-bracket.html"}]}},"name":"html-derivative","patterns":[{"include":"text.html.basic#core-minus-invalid"},{"begin":"(</?)(\\\\w[^<>\\\\s]*)(?<!/)","beginCaptures":{"1":{"name":"punctuation.definition.tag.begin.html"},"2":{"name":"entity.name.tag.html"}},"end":"((?: ?/)?>)","endCaptures":{"1":{"name":"punctuation.definition.tag.end.html"}},"name":"meta.tag.other.unrecognized.html.derivative","patterns":[{"include":"text.html.basic#attribute"}]}],"scopeName":"text.html.derivative","embeddedLangs":["html"]}'));
const html_derivative = [
  ...html,
  lang
];
export {
  html_derivative as default
};
//# sourceMappingURL=html-derivative-HU9p64q4.js.map

//# debugId=24333ae1-ee1e-5353-b8e2-730a15c7e206
