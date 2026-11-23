"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="05ff3219-27dd-54f7-b019-28983a2648a3")}catch(e){}}();

const require$$2$1 = require("node:worker_threads");
const node_module = require("node:module");
const crypto = require("crypto");
const pn = require("path");
const fs = require("node:fs");
const Ws = require("node:process");
const un$1 = require("fs");
const require$$0$1 = require("os");
const promises = require("fs/promises");
const _n = require("node:path");
const Nl = require("node:os");
require("events");
const require$$0 = require("child_process");
const require$$2 = require("util");
const async_hooks = require("async_hooks");
require("buffer");
const net = require("net");
require("module");
require("url");
require("readline");
require("string_decoder");
function _interopNamespaceDefault(e10) {
  const n = Object.create(null, { [Symbol.toStringTag]: { value: "Module" } });
  if (e10) {
    for (const k3 in e10) {
      if (k3 !== "default") {
        const d = Object.getOwnPropertyDescriptor(e10, k3);
        Object.defineProperty(n, k3, d.get ? d : {
          enumerable: true,
          get: () => e10[k3]
        });
      }
    }
  }
  n.default = e10;
  return Object.freeze(n);
}
const pn__namespace = /* @__PURE__ */ _interopNamespaceDefault(pn);
const un__namespace = /* @__PURE__ */ _interopNamespaceDefault(un$1);
if (typeof Symbol.dispose !== "symbol") {
  try {
    Symbol.dispose = /* @__PURE__ */ Symbol.for("Symbol.dispose");
  } catch {
  }
}
if (typeof Symbol.asyncDispose !== "symbol") {
  try {
    Symbol.asyncDispose = /* @__PURE__ */ Symbol.for("Symbol.asyncDispose");
  } catch {
  }
}
var Y3 = Object.create;
var { getPrototypeOf: Z3, defineProperty: Zy, getOwnPropertyNames: J3 } = Object;
var Zv = Object.prototype.hasOwnProperty;
function X3(e10) {
  return this[e10];
}
var Q3, Jv = (e10, t, n) => {
  var r = e10 != null && typeof e10 === "object";
  if (r) {
    var o = Q3 ??= /* @__PURE__ */ new WeakMap(), s = o.get(e10);
    if (s) return s;
  }
  n = e10 != null ? Y3(Z3(e10)) : {};
  let i = Zy(n, "default", { value: e10, enumerable: true });
  if (e10 && typeof e10 === "object" || typeof e10 === "function") {
    for (let a of J3(e10)) if (!Zv.call(i, a)) Zy(i, a, { get: X3.bind(e10, a), enumerable: true });
  }
  if (r) o.set(e10, i);
  return i;
};
var X = (e10, t) => () => (t || e10((t = { exports: {} }).exports, t), t.exports);
var tJ = (e10) => e10;
function nJ(e10, t) {
  this[e10] = tJ.bind(null, t);
}
var Rr = (e10, t) => {
  for (var n in t) Zy(e10, n, { get: t[n], enumerable: true, configurable: true, set: nJ.bind(t, n) });
};
node_module.createRequire(require("url").pathToFileURL(__filename).href);
var sJ = Symbol.dispose || /* @__PURE__ */ Symbol.for("Symbol.dispose"), ht = (e10, t, n) => {
  if (t != null) {
    if (typeof t !== "object" && typeof t !== "function") throw TypeError('Object expected to be assigned to "using" declaration');
    var r;
    if (r === void 0) r = t[sJ];
    if (typeof r !== "function") throw TypeError("Object not disposable");
    e10.push([n, r, t]);
  }
  return t;
}, _t = (e10, t, n) => {
  var r = typeof SuppressedError === "function" ? SuppressedError : function(i, a, l, c) {
    return c = Error(l), c.name = "SuppressedError", c.error = i, c.suppressed = a, c;
  }, o = (i) => t = n ? new r(i, t, "An error was suppressed during disposal") : (n = true, i), s = (i) => {
    while (i = e10.pop()) try {
      var a = i[1] && i[1].call(i[2]);
      if (i[0]) return Promise.resolve(a).then(s, (l) => (o(l), s()));
    } catch (l) {
      o(l);
    }
    if (n) throw t;
  };
  return s();
};
var Jd = X(function(T$) {
  Object.defineProperty(T$, "__esModule", { value: true });
  T$.regexpCode = T$.getEsmExportName = T$.getProperty = T$.safeStringify = T$.stringify = T$.strConcat = T$.addCodeArg = T$.str = T$._ = T$.nil = T$._Code = T$.Name = T$.IDENTIFIER = T$._CodeOrName = void 0;
  class qg {
  }
  T$._CodeOrName = qg;
  T$.IDENTIFIER = /^[a-z$_][a-z$_0-9]*$/i;
  class xl extends qg {
    constructor(e10) {
      super();
      if (!T$.IDENTIFIER.test(e10)) throw Error("CodeGen: name must be a valid identifier");
      this.str = e10;
    }
    toString() {
      return this.str;
    }
    emptyStr() {
      return false;
    }
    get names() {
      return { [this.str]: 1 };
    }
  }
  T$.Name = xl;
  class $r extends qg {
    constructor(e10) {
      super();
      this._items = typeof e10 === "string" ? [e10] : e10;
    }
    toString() {
      return this.str;
    }
    emptyStr() {
      if (this._items.length > 1) return false;
      let e10 = this._items[0];
      return e10 === "" || e10 === '""';
    }
    get str() {
      var e10;
      return (e10 = this._str) !== null && e10 !== void 0 ? e10 : this._str = this._items.reduce((t, n) => `${t}${n}`, "");
    }
    get names() {
      var e10;
      return (e10 = this._names) !== null && e10 !== void 0 ? e10 : this._names = this._items.reduce((t, n) => {
        if (n instanceof xl) t[n.str] = (t[n.str] || 0) + 1;
        return t;
      }, {});
    }
  }
  T$._Code = $r;
  T$.nil = new $r("");
  function R$(e10, ...t) {
    let n = [e10[0]], r = 0;
    while (r < t.length) AO(n, t[r]), n.push(e10[++r]);
    return new $r(n);
  }
  T$._ = R$;
  var CO = new $r("+");
  function O$(e10, ...t) {
    let n = [Zd(e10[0])], r = 0;
    while (r < t.length) n.push(CO), AO(n, t[r]), n.push(CO, Zd(e10[++r]));
    return xke(n), new $r(n);
  }
  T$.str = O$;
  function AO(e10, t) {
    if (t instanceof $r) e10.push(...t._items);
    else if (t instanceof xl) e10.push(t);
    else e10.push(Pke(t));
  }
  T$.addCodeArg = AO;
  function xke(e10) {
    let t = 1;
    while (t < e10.length - 1) {
      if (e10[t] === CO) {
        let n = vke(e10[t - 1], e10[t + 1]);
        if (n !== void 0) {
          e10.splice(t - 1, 3, n);
          continue;
        }
        e10[t++] = "+";
      }
      t++;
    }
  }
  function vke(e10, t) {
    if (t === '""') return e10;
    if (e10 === '""') return t;
    if (typeof e10 == "string") {
      if (t instanceof xl || e10[e10.length - 1] !== '"') return;
      if (typeof t != "string") return `${e10.slice(0, -1)}${t}"`;
      if (t[0] === '"') return e10.slice(0, -1) + t.slice(1);
      return;
    }
    if (typeof t == "string" && t[0] === '"' && !(e10 instanceof xl)) return `"${e10}${t.slice(1)}`;
    return;
  }
  function kke(e10, t) {
    return t.emptyStr() ? e10 : e10.emptyStr() ? t : O$`${e10}${t}`;
  }
  T$.strConcat = kke;
  function Pke(e10) {
    return typeof e10 == "number" || typeof e10 == "boolean" || e10 === null ? e10 : Zd(Array.isArray(e10) ? e10.join(",") : e10);
  }
  function Ike(e10) {
    return new $r(Zd(e10));
  }
  T$.stringify = Ike;
  function Zd(e10) {
    return JSON.stringify(e10).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
  }
  T$.safeStringify = Zd;
  function Dke(e10) {
    return typeof e10 == "string" && T$.IDENTIFIER.test(e10) ? new $r(`.${e10}`) : R$`[${e10}]`;
  }
  T$.getProperty = Dke;
  function Lke(e10) {
    if (typeof e10 == "string" && T$.IDENTIFIER.test(e10)) return new $r(`${e10}`);
    throw Error(`CodeGen: invalid export name: ${e10}, use explicit $id name mapping`);
  }
  T$.getEsmExportName = Lke;
  function Mke(e10) {
    return new $r(e10.toString());
  }
  T$.regexpCode = Mke;
});
var wO = X(function(k$) {
  Object.defineProperty(k$, "__esModule", { value: true });
  k$.ValueScope = k$.ValueScopeName = k$.Scope = k$.varKinds = k$.UsedValueState = void 0;
  var et = Jd();
  class x$ extends Error {
    constructor(e10) {
      super(`CodeGen: "code" for ${e10} not defined`);
      this.value = e10.value;
    }
  }
  var Zg;
  (function(e10) {
    e10[e10.Started = 0] = "Started", e10[e10.Completed = 1] = "Completed";
  })(Zg || (k$.UsedValueState = Zg = {}));
  k$.varKinds = { const: new et.Name("const"), let: new et.Name("let"), var: new et.Name("var") };
  class OO {
    constructor({ prefixes: e10, parent: t } = {}) {
      this._names = {}, this._prefixes = e10, this._parent = t;
    }
    toName(e10) {
      return e10 instanceof et.Name ? e10 : this.name(e10);
    }
    name(e10) {
      return new et.Name(this._newName(e10));
    }
    _newName(e10) {
      let t = this._names[e10] || this._nameGroup(e10);
      return `${e10}${t.index++}`;
    }
    _nameGroup(e10) {
      var t, n;
      if (((n = (t = this._parent) === null || t === void 0 ? void 0 : t._prefixes) === null || n === void 0 ? void 0 : n.has(e10)) || this._prefixes && !this._prefixes.has(e10)) throw Error(`CodeGen: prefix "${e10}" is not allowed in this scope`);
      return this._names[e10] = { prefix: e10, index: 0 };
    }
  }
  k$.Scope = OO;
  class TO extends et.Name {
    constructor(e10, t) {
      super(t);
      this.prefix = e10;
    }
    setValue(e10, { property: t, itemIndex: n }) {
      this.value = e10, this.scopePath = et._`.${new et.Name(t)}[${n}]`;
    }
  }
  k$.ValueScopeName = TO;
  var qke = et._`\n`;
  class v$ extends OO {
    constructor(e10) {
      super(e10);
      this._values = {}, this._scope = e10.scope, this.opts = { ...e10, _n: e10.lines ? qke : et.nil };
    }
    get() {
      return this._scope;
    }
    name(e10) {
      return new TO(e10, this._newName(e10));
    }
    value(e10, t) {
      var n;
      if (t.ref === void 0) throw Error("CodeGen: ref must be passed in value");
      let r = this.toName(e10), { prefix: o } = r, s = (n = t.key) !== null && n !== void 0 ? n : t.ref, i = this._values[o];
      if (i) {
        let c = i.get(s);
        if (c) return c;
      } else i = this._values[o] = /* @__PURE__ */ new Map();
      i.set(s, r);
      let a = this._scope[o] || (this._scope[o] = []), l = a.length;
      return a[l] = t.ref, r.setValue(t, { property: o, itemIndex: l }), r;
    }
    getValue(e10, t) {
      let n = this._values[e10];
      if (!n) return;
      return n.get(t);
    }
    scopeRefs(e10, t = this._values) {
      return this._reduceValues(t, (n) => {
        if (n.scopePath === void 0) throw Error(`CodeGen: name "${n}" has no value`);
        return et._`${e10}${n.scopePath}`;
      });
    }
    scopeCode(e10 = this._values, t, n) {
      return this._reduceValues(e10, (r) => {
        if (r.value === void 0) throw Error(`CodeGen: name "${r}" has no value`);
        return r.value.code;
      }, t, n);
    }
    _reduceValues(e10, t, n = {}, r) {
      let o = et.nil;
      for (let s in e10) {
        let i = e10[s];
        if (!i) continue;
        let a = n[s] = n[s] || /* @__PURE__ */ new Map();
        i.forEach((l) => {
          if (a.has(l)) return;
          a.set(l, Zg.Started);
          let c = t(l);
          if (c) {
            let d = this.opts.es5 ? k$.varKinds.var : k$.varKinds.const;
            o = et._`${o}${d} ${l} = ${c};${this.opts._n}`;
          } else if (c = r === null || r === void 0 ? void 0 : r(l)) o = et._`${o}${c}${this.opts._n}`;
          else throw new x$(l);
          a.set(l, Zg.Completed);
        });
      }
      return o;
    }
  }
  k$.ValueScope = v$;
});
var Pe = X(function(Hn) {
  Object.defineProperty(Hn, "__esModule", { value: true });
  Hn.or = Hn.and = Hn.not = Hn.CodeGen = Hn.operators = Hn.varKinds = Hn.ValueScopeName = Hn.ValueScope = Hn.Scope = Hn.Name = Hn.regexpCode = Hn.stringify = Hn.getProperty = Hn.nil = Hn.strConcat = Hn.str = Hn._ = void 0;
  var te = Jd(), Ot = wO(), Hs = Jd();
  Object.defineProperty(Hn, "_", { enumerable: true, get: function() {
    return Hs._;
  } });
  Object.defineProperty(Hn, "str", { enumerable: true, get: function() {
    return Hs.str;
  } });
  Object.defineProperty(Hn, "strConcat", { enumerable: true, get: function() {
    return Hs.strConcat;
  } });
  Object.defineProperty(Hn, "nil", { enumerable: true, get: function() {
    return Hs.nil;
  } });
  Object.defineProperty(Hn, "getProperty", { enumerable: true, get: function() {
    return Hs.getProperty;
  } });
  Object.defineProperty(Hn, "stringify", { enumerable: true, get: function() {
    return Hs.stringify;
  } });
  Object.defineProperty(Hn, "regexpCode", { enumerable: true, get: function() {
    return Hs.regexpCode;
  } });
  Object.defineProperty(Hn, "Name", { enumerable: true, get: function() {
    return Hs.Name;
  } });
  var nh = wO();
  Object.defineProperty(Hn, "Scope", { enumerable: true, get: function() {
    return nh.Scope;
  } });
  Object.defineProperty(Hn, "ValueScope", { enumerable: true, get: function() {
    return nh.ValueScope;
  } });
  Object.defineProperty(Hn, "ValueScopeName", { enumerable: true, get: function() {
    return nh.ValueScopeName;
  } });
  Object.defineProperty(Hn, "varKinds", { enumerable: true, get: function() {
    return nh.varKinds;
  } });
  Hn.operators = { GT: new te._Code(">"), GTE: new te._Code(">="), LT: new te._Code("<"), LTE: new te._Code("<="), EQ: new te._Code("==="), NEQ: new te._Code("!=="), NOT: new te._Code("!"), OR: new te._Code("||"), AND: new te._Code("&&"), ADD: new te._Code("+") };
  class js {
    optimizeNodes() {
      return this;
    }
    optimizeNames(e10, t) {
      return this;
    }
  }
  class I$ extends js {
    constructor(e10, t, n) {
      super();
      this.varKind = e10, this.name = t, this.rhs = n;
    }
    render({ es5: e10, _n: t }) {
      let n = e10 ? Ot.varKinds.var : this.varKind, r = this.rhs === void 0 ? "" : ` = ${this.rhs}`;
      return `${n} ${this.name}${r};` + t;
    }
    optimizeNames(e10, t) {
      if (!e10[this.name.str]) return;
      if (this.rhs) this.rhs = kl(this.rhs, e10, t);
      return this;
    }
    get names() {
      return this.rhs instanceof te._CodeOrName ? this.rhs.names : {};
    }
  }
  class kO extends js {
    constructor(e10, t, n) {
      super();
      this.lhs = e10, this.rhs = t, this.sideEffects = n;
    }
    render({ _n: e10 }) {
      return `${this.lhs} = ${this.rhs};` + e10;
    }
    optimizeNames(e10, t) {
      if (this.lhs instanceof te.Name && !e10[this.lhs.str] && !this.sideEffects) return;
      return this.rhs = kl(this.rhs, e10, t), this;
    }
    get names() {
      let e10 = this.lhs instanceof te.Name ? {} : { ...this.lhs.names };
      return th(e10, this.rhs);
    }
  }
  class D$ extends kO {
    constructor(e10, t, n, r) {
      super(e10, n, r);
      this.op = t;
    }
    render({ _n: e10 }) {
      return `${this.lhs} ${this.op}= ${this.rhs};` + e10;
    }
  }
  class L$ extends js {
    constructor(e10) {
      super();
      this.label = e10, this.names = {};
    }
    render({ _n: e10 }) {
      return `${this.label}:` + e10;
    }
  }
  class M$ extends js {
    constructor(e10) {
      super();
      this.label = e10, this.names = {};
    }
    render({ _n: e10 }) {
      return `break${this.label ? ` ${this.label}` : ""};` + e10;
    }
  }
  class N$ extends js {
    constructor(e10) {
      super();
      this.error = e10;
    }
    render({ _n: e10 }) {
      return `throw ${this.error};` + e10;
    }
    get names() {
      return this.error.names;
    }
  }
  class U$ extends js {
    constructor(e10) {
      super();
      this.code = e10;
    }
    render({ _n: e10 }) {
      return `${this.code};` + e10;
    }
    optimizeNodes() {
      return `${this.code}` ? this : void 0;
    }
    optimizeNames(e10, t) {
      return this.code = kl(this.code, e10, t), this;
    }
    get names() {
      return this.code instanceof te._CodeOrName ? this.code.names : {};
    }
  }
  class rh extends js {
    constructor(e10 = []) {
      super();
      this.nodes = e10;
    }
    render(e10) {
      return this.nodes.reduce((t, n) => t + n.render(e10), "");
    }
    optimizeNodes() {
      let { nodes: e10 } = this, t = e10.length;
      while (t--) {
        let n = e10[t].optimizeNodes();
        if (Array.isArray(n)) e10.splice(t, 1, ...n);
        else if (n) e10[t] = n;
        else e10.splice(t, 1);
      }
      return e10.length > 0 ? this : void 0;
    }
    optimizeNames(e10, t) {
      let { nodes: n } = this, r = n.length;
      while (r--) {
        let o = n[r];
        if (o.optimizeNames(e10, t)) continue;
        Xke(e10, o.names), n.splice(r, 1);
      }
      return n.length > 0 ? this : void 0;
    }
    get names() {
      return this.nodes.reduce((e10, t) => oa(e10, t.names), {});
    }
  }
  class Bs extends rh {
    render(e10) {
      return "{" + e10._n + super.render(e10) + "}" + e10._n;
    }
  }
  class F$ extends rh {
  }
  class Xd extends Bs {
  }
  Xd.kind = "else";
  class Vo extends Bs {
    constructor(e10, t) {
      super(t);
      this.condition = e10;
    }
    render(e10) {
      let t = `if(${this.condition})` + super.render(e10);
      if (this.else) t += "else " + this.else.render(e10);
      return t;
    }
    optimizeNodes() {
      super.optimizeNodes();
      let e10 = this.condition;
      if (e10 === true) return this.nodes;
      let t = this.else;
      if (t) {
        let n = t.optimizeNodes();
        t = this.else = Array.isArray(n) ? new Xd(n) : n;
      }
      if (t) {
        if (e10 === false) return t instanceof Vo ? t : t.nodes;
        if (this.nodes.length) return this;
        return new Vo(B$(e10), t instanceof Vo ? [t] : t.nodes);
      }
      if (e10 === false || !this.nodes.length) return;
      return this;
    }
    optimizeNames(e10, t) {
      var n;
      if (this.else = (n = this.else) === null || n === void 0 ? void 0 : n.optimizeNames(e10, t), !(super.optimizeNames(e10, t) || this.else)) return;
      return this.condition = kl(this.condition, e10, t), this;
    }
    get names() {
      let e10 = super.names;
      if (th(e10, this.condition), this.else) oa(e10, this.else.names);
      return e10;
    }
  }
  Vo.kind = "if";
  class vl extends Bs {
  }
  vl.kind = "for";
  class $$ extends vl {
    constructor(e10) {
      super();
      this.iteration = e10;
    }
    render(e10) {
      return `for(${this.iteration})` + super.render(e10);
    }
    optimizeNames(e10, t) {
      if (!super.optimizeNames(e10, t)) return;
      return this.iteration = kl(this.iteration, e10, t), this;
    }
    get names() {
      return oa(super.names, this.iteration.names);
    }
  }
  class z$ extends vl {
    constructor(e10, t, n, r) {
      super();
      this.varKind = e10, this.name = t, this.from = n, this.to = r;
    }
    render(e10) {
      let t = e10.es5 ? Ot.varKinds.var : this.varKind, { name: n, from: r, to: o } = this;
      return `for(${t} ${n}=${r}; ${n}<${o}; ${n}++)` + super.render(e10);
    }
    get names() {
      let e10 = th(super.names, this.from);
      return th(e10, this.to);
    }
  }
  class xO extends vl {
    constructor(e10, t, n, r) {
      super();
      this.loop = e10, this.varKind = t, this.name = n, this.iterable = r;
    }
    render(e10) {
      return `for(${this.varKind} ${this.name} ${this.loop} ${this.iterable})` + super.render(e10);
    }
    optimizeNames(e10, t) {
      if (!super.optimizeNames(e10, t)) return;
      return this.iterable = kl(this.iterable, e10, t), this;
    }
    get names() {
      return oa(super.names, this.iterable.names);
    }
  }
  class Jg extends Bs {
    constructor(e10, t, n) {
      super();
      this.name = e10, this.args = t, this.async = n;
    }
    render(e10) {
      return `${this.async ? "async " : ""}function ${this.name}(${this.args})` + super.render(e10);
    }
  }
  Jg.kind = "func";
  class Xg extends rh {
    render(e10) {
      return "return " + super.render(e10);
    }
  }
  Xg.kind = "return";
  class H$ extends Bs {
    render(e10) {
      let t = "try" + super.render(e10);
      if (this.catch) t += this.catch.render(e10);
      if (this.finally) t += this.finally.render(e10);
      return t;
    }
    optimizeNodes() {
      var e10, t;
      return super.optimizeNodes(), (e10 = this.catch) === null || e10 === void 0 || e10.optimizeNodes(), (t = this.finally) === null || t === void 0 || t.optimizeNodes(), this;
    }
    optimizeNames(e10, t) {
      var n, r;
      return super.optimizeNames(e10, t), (n = this.catch) === null || n === void 0 || n.optimizeNames(e10, t), (r = this.finally) === null || r === void 0 || r.optimizeNames(e10, t), this;
    }
    get names() {
      let e10 = super.names;
      if (this.catch) oa(e10, this.catch.names);
      if (this.finally) oa(e10, this.finally.names);
      return e10;
    }
  }
  class Qg extends Bs {
    constructor(e10) {
      super();
      this.error = e10;
    }
    render(e10) {
      return `catch(${this.error})` + super.render(e10);
    }
  }
  Qg.kind = "catch";
  class eh extends Bs {
    render(e10) {
      return "finally" + super.render(e10);
    }
  }
  eh.kind = "finally";
  class j$ {
    constructor(e10, t = {}) {
      this._values = {}, this._blockStarts = [], this._constants = {}, this.opts = { ...t, _n: t.lines ? `
` : "" }, this._extScope = e10, this._scope = new Ot.Scope({ parent: e10 }), this._nodes = [new F$()];
    }
    toString() {
      return this._root.render(this.opts);
    }
    name(e10) {
      return this._scope.name(e10);
    }
    scopeName(e10) {
      return this._extScope.name(e10);
    }
    scopeValue(e10, t) {
      let n = this._extScope.value(e10, t);
      return (this._values[n.prefix] || (this._values[n.prefix] = /* @__PURE__ */ new Set())).add(n), n;
    }
    getScopeValue(e10, t) {
      return this._extScope.getValue(e10, t);
    }
    scopeRefs(e10) {
      return this._extScope.scopeRefs(e10, this._values);
    }
    scopeCode() {
      return this._extScope.scopeCode(this._values);
    }
    _def(e10, t, n, r) {
      let o = this._scope.toName(t);
      if (n !== void 0 && r) this._constants[o.str] = n;
      return this._leafNode(new I$(e10, o, n)), o;
    }
    const(e10, t, n) {
      return this._def(Ot.varKinds.const, e10, t, n);
    }
    let(e10, t, n) {
      return this._def(Ot.varKinds.let, e10, t, n);
    }
    var(e10, t, n) {
      return this._def(Ot.varKinds.var, e10, t, n);
    }
    assign(e10, t, n) {
      return this._leafNode(new kO(e10, t, n));
    }
    add(e10, t) {
      return this._leafNode(new D$(e10, Hn.operators.ADD, t));
    }
    code(e10) {
      if (typeof e10 == "function") e10();
      else if (e10 !== te.nil) this._leafNode(new U$(e10));
      return this;
    }
    object(...e10) {
      let t = ["{"];
      for (let [n, r] of e10) {
        if (t.length > 1) t.push(",");
        if (t.push(n), n !== r || this.opts.es5) t.push(":"), te.addCodeArg(t, r);
      }
      return t.push("}"), new te._Code(t);
    }
    if(e10, t, n) {
      if (this._blockNode(new Vo(e10)), t && n) this.code(t).else().code(n).endIf();
      else if (t) this.code(t).endIf();
      else if (n) throw Error('CodeGen: "else" body without "then" body');
      return this;
    }
    elseIf(e10) {
      return this._elseNode(new Vo(e10));
    }
    else() {
      return this._elseNode(new Xd());
    }
    endIf() {
      return this._endBlockNode(Vo, Xd);
    }
    _for(e10, t) {
      if (this._blockNode(e10), t) this.code(t).endFor();
      return this;
    }
    for(e10, t) {
      return this._for(new $$(e10), t);
    }
    forRange(e10, t, n, r, o = this.opts.es5 ? Ot.varKinds.var : Ot.varKinds.let) {
      let s = this._scope.toName(e10);
      return this._for(new z$(o, s, t, n), () => r(s));
    }
    forOf(e10, t, n, r = Ot.varKinds.const) {
      let o = this._scope.toName(e10);
      if (this.opts.es5) {
        let s = t instanceof te.Name ? t : this.var("_arr", t);
        return this.forRange("_i", 0, te._`${s}.length`, (i) => {
          this.var(o, te._`${s}[${i}]`), n(o);
        });
      }
      return this._for(new xO("of", r, o, t), () => n(o));
    }
    forIn(e10, t, n, r = this.opts.es5 ? Ot.varKinds.var : Ot.varKinds.const) {
      if (this.opts.ownProperties) return this.forOf(e10, te._`Object.keys(${t})`, n);
      let o = this._scope.toName(e10);
      return this._for(new xO("in", r, o, t), () => n(o));
    }
    endFor() {
      return this._endBlockNode(vl);
    }
    label(e10) {
      return this._leafNode(new L$(e10));
    }
    break(e10) {
      return this._leafNode(new M$(e10));
    }
    return(e10) {
      let t = new Xg();
      if (this._blockNode(t), this.code(e10), t.nodes.length !== 1) throw Error('CodeGen: "return" should have one node');
      return this._endBlockNode(Xg);
    }
    try(e10, t, n) {
      if (!t && !n) throw Error('CodeGen: "try" without "catch" and "finally"');
      let r = new H$();
      if (this._blockNode(r), this.code(e10), t) {
        let o = this.name("e");
        this._currNode = r.catch = new Qg(o), t(o);
      }
      if (n) this._currNode = r.finally = new eh(), this.code(n);
      return this._endBlockNode(Qg, eh);
    }
    throw(e10) {
      return this._leafNode(new N$(e10));
    }
    block(e10, t) {
      if (this._blockStarts.push(this._nodes.length), e10) this.code(e10).endBlock(t);
      return this;
    }
    endBlock(e10) {
      let t = this._blockStarts.pop();
      if (t === void 0) throw Error("CodeGen: not in self-balancing block");
      let n = this._nodes.length - t;
      if (n < 0 || e10 !== void 0 && n !== e10) throw Error(`CodeGen: wrong number of nodes: ${n} vs ${e10} expected`);
      return this._nodes.length = t, this;
    }
    func(e10, t = te.nil, n, r) {
      if (this._blockNode(new Jg(e10, t, n)), r) this.code(r).endFunc();
      return this;
    }
    endFunc() {
      return this._endBlockNode(Jg);
    }
    optimize(e10 = 1) {
      while (e10-- > 0) this._root.optimizeNodes(), this._root.optimizeNames(this._root.names, this._constants);
    }
    _leafNode(e10) {
      return this._currNode.nodes.push(e10), this;
    }
    _blockNode(e10) {
      this._currNode.nodes.push(e10), this._nodes.push(e10);
    }
    _endBlockNode(e10, t) {
      let n = this._currNode;
      if (n instanceof e10 || t && n instanceof t) return this._nodes.pop(), this;
      throw Error(`CodeGen: not in block "${t ? `${e10.kind}/${t.kind}` : e10.kind}"`);
    }
    _elseNode(e10) {
      let t = this._currNode;
      if (!(t instanceof Vo)) throw Error('CodeGen: "else" without "if"');
      return this._currNode = t.else = e10, this;
    }
    get _root() {
      return this._nodes[0];
    }
    get _currNode() {
      let e10 = this._nodes;
      return e10[e10.length - 1];
    }
    set _currNode(e10) {
      let t = this._nodes;
      t[t.length - 1] = e10;
    }
  }
  Hn.CodeGen = j$;
  function oa(e10, t) {
    for (let n in t) e10[n] = (e10[n] || 0) + (t[n] || 0);
    return e10;
  }
  function th(e10, t) {
    return t instanceof te._CodeOrName ? oa(e10, t.names) : e10;
  }
  function kl(e10, t, n) {
    if (e10 instanceof te.Name) return r(e10);
    if (!o(e10)) return e10;
    return new te._Code(e10._items.reduce((s, i) => {
      if (i instanceof te.Name) i = r(i);
      if (i instanceof te._Code) s.push(...i._items);
      else s.push(i);
      return s;
    }, []));
    function r(s) {
      let i = n[s.str];
      if (i === void 0 || t[s.str] !== 1) return s;
      return delete t[s.str], i;
    }
    function o(s) {
      return s instanceof te._Code && s._items.some((i) => i instanceof te.Name && t[i.str] === 1 && n[i.str] !== void 0);
    }
  }
  function Xke(e10, t) {
    for (let n in t) e10[n] = (e10[n] || 0) - (t[n] || 0);
  }
  function B$(e10) {
    return typeof e10 == "boolean" || typeof e10 == "number" || e10 === null ? !e10 : te._`!${vO(e10)}`;
  }
  Hn.not = B$;
  var Qke = K$(Hn.operators.AND);
  function ePe(...e10) {
    return e10.reduce(Qke);
  }
  Hn.and = ePe;
  var tPe = K$(Hn.operators.OR);
  function nPe(...e10) {
    return e10.reduce(tPe);
  }
  Hn.or = nPe;
  function K$(e10) {
    return (t, n) => t === te.nil ? n : n === te.nil ? t : te._`${vO(t)} ${e10} ${vO(n)}`;
  }
  function vO(e10) {
    return e10 instanceof te.Name ? e10 : te._`(${e10})`;
  }
});
var ze = X(function(ez) {
  Object.defineProperty(ez, "__esModule", { value: true });
  ez.checkStrictMode = ez.getErrorPath = ez.Type = ez.useFunc = ez.setEvaluated = ez.evaluatedPropsToName = ez.mergeEvaluated = ez.eachItem = ez.unescapeJsonPointer = ez.escapeJsonPointer = ez.escapeFragment = ez.unescapeFragment = ez.schemaRefOrVal = ez.schemaHasRulesButRef = ez.schemaHasRules = ez.checkUnknownRules = ez.alwaysValidSchema = ez.toHash = void 0;
  var de = Pe(), q$ = Jd();
  function iPe(e10) {
    let t = {};
    for (let n of e10) t[n] = true;
    return t;
  }
  ez.toHash = iPe;
  function aPe(e10, t) {
    if (typeof t == "boolean") return t;
    if (Object.keys(t).length === 0) return true;
    return Y$(e10, t), !Z$(t, e10.self.RULES.all);
  }
  ez.alwaysValidSchema = aPe;
  function Y$(e10, t = e10.schema) {
    let { opts: n, self: r } = e10;
    if (!n.strictSchema) return;
    if (typeof t === "boolean") return;
    let o = r.RULES.keywords;
    for (let s in t) if (!o[s]) Q$(e10, `unknown keyword: "${s}"`);
  }
  ez.checkUnknownRules = Y$;
  function Z$(e10, t) {
    if (typeof e10 == "boolean") return !e10;
    for (let n in e10) if (t[n]) return true;
    return false;
  }
  ez.schemaHasRules = Z$;
  function lPe(e10, t) {
    if (typeof e10 == "boolean") return !e10;
    for (let n in e10) if (n !== "$ref" && t.all[n]) return true;
    return false;
  }
  ez.schemaHasRulesButRef = lPe;
  function cPe({ topSchemaRef: e10, schemaPath: t }, n, r, o) {
    if (!o) {
      if (typeof n == "number" || typeof n == "boolean") return n;
      if (typeof n == "string") return de._`${n}`;
    }
    return de._`${e10}${t}${de.getProperty(r)}`;
  }
  ez.schemaRefOrVal = cPe;
  function uPe(e10) {
    return J$(decodeURIComponent(e10));
  }
  ez.unescapeFragment = uPe;
  function dPe(e10) {
    return encodeURIComponent(IO(e10));
  }
  ez.escapeFragment = dPe;
  function IO(e10) {
    if (typeof e10 == "number") return `${e10}`;
    return e10.replace(/~/g, "~0").replace(/\//g, "~1");
  }
  ez.escapeJsonPointer = IO;
  function J$(e10) {
    return e10.replace(/~1/g, "/").replace(/~0/g, "~");
  }
  ez.unescapeJsonPointer = J$;
  function pPe(e10, t) {
    if (Array.isArray(e10)) for (let n of e10) t(n);
    else t(e10);
  }
  ez.eachItem = pPe;
  function W$({ mergeNames: e10, mergeToName: t, mergeValues: n, resultToName: r }) {
    return (o, s, i, a) => {
      let l = i === void 0 ? s : i instanceof de.Name ? (s instanceof de.Name ? e10(o, s, i) : t(o, s, i), i) : s instanceof de.Name ? (t(o, i, s), s) : n(s, i);
      return a === de.Name && !(l instanceof de.Name) ? r(o, l) : l;
    };
  }
  ez.mergeEvaluated = { props: W$({ mergeNames: (e10, t, n) => e10.if(de._`${n} !== true && ${t} !== undefined`, () => {
    e10.if(de._`${t} === true`, () => e10.assign(n, true), () => e10.assign(n, de._`${n} || {}`).code(de._`Object.assign(${n}, ${t})`));
  }), mergeToName: (e10, t, n) => e10.if(de._`${n} !== true`, () => {
    if (t === true) e10.assign(n, true);
    else e10.assign(n, de._`${n} || {}`), DO(e10, n, t);
  }), mergeValues: (e10, t) => e10 === true ? true : { ...e10, ...t }, resultToName: X$ }), items: W$({ mergeNames: (e10, t, n) => e10.if(de._`${n} !== true && ${t} !== undefined`, () => e10.assign(n, de._`${t} === true ? true : ${n} > ${t} ? ${n} : ${t}`)), mergeToName: (e10, t, n) => e10.if(de._`${n} !== true`, () => e10.assign(n, t === true ? true : de._`${n} > ${t} ? ${n} : ${t}`)), mergeValues: (e10, t) => e10 === true ? true : Math.max(e10, t), resultToName: (e10, t) => e10.var("items", t) }) };
  function X$(e10, t) {
    if (t === true) return e10.var("props", true);
    let n = e10.var("props", de._`{}`);
    if (t !== void 0) DO(e10, n, t);
    return n;
  }
  ez.evaluatedPropsToName = X$;
  function DO(e10, t, n) {
    Object.keys(n).forEach((r) => e10.assign(de._`${t}${de.getProperty(r)}`, true));
  }
  ez.setEvaluated = DO;
  var V$ = {};
  function fPe(e10, t) {
    return e10.scopeValue("func", { ref: t, code: V$[t.code] || (V$[t.code] = new q$._Code(t.code)) });
  }
  ez.useFunc = fPe;
  var PO;
  (function(e10) {
    e10[e10.Num = 0] = "Num", e10[e10.Str = 1] = "Str";
  })(PO || (ez.Type = PO = {}));
  function mPe(e10, t, n) {
    if (e10 instanceof de.Name) {
      let r = t === PO.Num;
      return n ? r ? de._`"[" + ${e10} + "]"` : de._`"['" + ${e10} + "']"` : r ? de._`"/" + ${e10}` : de._`"/" + ${e10}.replace(/~/g, "~0").replace(/\\//g, "~1")`;
    }
    return n ? de.getProperty(e10).toString() : "/" + IO(e10);
  }
  ez.getErrorPath = mPe;
  function Q$(e10, t, n = e10.opts.strictSchema) {
    if (!n) return;
    if (t = `strict mode: ${t}`, n === true) throw Error(t);
    e10.self.logger.warn(t);
  }
  ez.checkStrictMode = Q$;
});
var qo = X(function(nz) {
  Object.defineProperty(nz, "__esModule", { value: true });
  var Ge = Pe(), IPe = { data: new Ge.Name("data"), valCxt: new Ge.Name("valCxt"), instancePath: new Ge.Name("instancePath"), parentData: new Ge.Name("parentData"), parentDataProperty: new Ge.Name("parentDataProperty"), rootData: new Ge.Name("rootData"), dynamicAnchors: new Ge.Name("dynamicAnchors"), vErrors: new Ge.Name("vErrors"), errors: new Ge.Name("errors"), this: new Ge.Name("this"), self: new Ge.Name("self"), scope: new Ge.Name("scope"), json: new Ge.Name("json"), jsonPos: new Ge.Name("jsonPos"), jsonLen: new Ge.Name("jsonLen"), jsonPart: new Ge.Name("jsonPart") };
  nz.default = IPe;
});
var Qd = X(function(iz) {
  Object.defineProperty(iz, "__esModule", { value: true });
  iz.extendErrors = iz.resetErrorsCount = iz.reportExtraError = iz.reportError = iz.keyword$DataError = iz.keywordError = void 0;
  var oe = Pe(), Ks = ze(), On = qo();
  iz.keywordError = { message: ({ keyword: e10 }) => oe.str`must pass "${e10}" keyword validation` };
  iz.keyword$DataError = { message: ({ keyword: e10, schemaType: t }) => t ? oe.str`"${e10}" keyword must be ${t} ($data)` : oe.str`"${e10}" keyword is invalid ($data)` };
  function LPe(e10, t = iz.keywordError, n, r) {
    let { it: o } = e10, { gen: s, compositeRule: i, allErrors: a } = o, l = sz(e10, t, n);
    if (r !== null && r !== void 0 ? r : i || a) rz(s, l);
    else oz(o, oe._`[${l}]`);
  }
  iz.reportError = LPe;
  function MPe(e10, t = iz.keywordError, n) {
    let { it: r } = e10, { gen: o, compositeRule: s, allErrors: i } = r, a = sz(e10, t, n);
    if (rz(o, a), !(s || i)) oz(r, On.default.vErrors);
  }
  iz.reportExtraError = MPe;
  function NPe(e10, t) {
    e10.assign(On.default.errors, t), e10.if(oe._`${On.default.vErrors} !== null`, () => e10.if(t, () => e10.assign(oe._`${On.default.vErrors}.length`, t), () => e10.assign(On.default.vErrors, null)));
  }
  iz.resetErrorsCount = NPe;
  function UPe({ gen: e10, keyword: t, schemaValue: n, data: r, errsCount: o, it: s }) {
    if (o === void 0) throw Error("ajv implementation error");
    let i = e10.name("err");
    e10.forRange("i", o, On.default.errors, (a) => {
      if (e10.const(i, oe._`${On.default.vErrors}[${a}]`), e10.if(oe._`${i}.instancePath === undefined`, () => e10.assign(oe._`${i}.instancePath`, oe.strConcat(On.default.instancePath, s.errorPath))), e10.assign(oe._`${i}.schemaPath`, oe.str`${s.errSchemaPath}/${t}`), s.opts.verbose) e10.assign(oe._`${i}.schema`, n), e10.assign(oe._`${i}.data`, r);
    });
  }
  iz.extendErrors = UPe;
  function rz(e10, t) {
    let n = e10.const("err", t);
    e10.if(oe._`${On.default.vErrors} === null`, () => e10.assign(On.default.vErrors, oe._`[${n}]`), oe._`${On.default.vErrors}.push(${n})`), e10.code(oe._`${On.default.errors}++`);
  }
  function oz(e10, t) {
    let { gen: n, validateName: r, schemaEnv: o } = e10;
    if (o.$async) n.throw(oe._`new ${e10.ValidationError}(${t})`);
    else n.assign(oe._`${r}.errors`, t), n.return(false);
  }
  var sa = { keyword: new oe.Name("keyword"), schemaPath: new oe.Name("schemaPath"), params: new oe.Name("params"), propertyName: new oe.Name("propertyName"), message: new oe.Name("message"), schema: new oe.Name("schema"), parentSchema: new oe.Name("parentSchema") };
  function sz(e10, t, n) {
    let { createErrors: r } = e10.it;
    if (r === false) return oe._`{}`;
    return FPe(e10, t, n);
  }
  function FPe(e10, t, n = {}) {
    let { gen: r, it: o } = e10, s = [$Pe(o, n), zPe(e10, n)];
    return HPe(e10, t, s), r.object(...s);
  }
  function $Pe({ errorPath: e10 }, { instancePath: t }) {
    let n = t ? oe.str`${e10}${Ks.getErrorPath(t, Ks.Type.Str)}` : e10;
    return [On.default.instancePath, oe.strConcat(On.default.instancePath, n)];
  }
  function zPe({ keyword: e10, it: { errSchemaPath: t } }, { schemaPath: n, parentSchema: r }) {
    let o = r ? t : oe.str`${t}/${e10}`;
    if (n) o = oe.str`${o}${Ks.getErrorPath(n, Ks.Type.Str)}`;
    return [sa.schemaPath, o];
  }
  function HPe(e10, { params: t, message: n }, r) {
    let { keyword: o, data: s, schemaValue: i, it: a } = e10, { opts: l, propertyName: c, topSchemaRef: d, schemaPath: p } = a;
    if (r.push([sa.keyword, o], [sa.params, typeof t == "function" ? t(e10) : t || oe._`{}`]), l.messages) r.push([sa.message, typeof n == "function" ? n(e10) : n]);
    if (l.verbose) r.push([sa.schema, i], [sa.parentSchema, oe._`${d}${p}`], [On.default.data, s]);
    if (c) r.push([sa.propertyName, c]);
  }
});
var fz = X(function(dz) {
  Object.defineProperty(dz, "__esModule", { value: true });
  dz.boolOrEmptySchema = dz.topBoolOrEmptySchema = void 0;
  var lz = Qd(), cz = Pe(), WPe = qo(), VPe = { message: "boolean schema is false" };
  function qPe(e10) {
    let { gen: t, schema: n, validateName: r } = e10;
    if (n === false) uz(e10, false);
    else if (typeof n == "object" && n.$async === true) t.return(WPe.default.data);
    else t.assign(cz._`${r}.errors`, null), t.return(true);
  }
  dz.topBoolOrEmptySchema = qPe;
  function YPe(e10, t) {
    let { gen: n, schema: r } = e10;
    if (r === false) n.var(t, false), uz(e10);
    else n.var(t, true);
  }
  dz.boolOrEmptySchema = YPe;
  function uz(e10, t) {
    let { gen: n, data: r } = e10;
    lz.reportError({ gen: n, keyword: "false schema", data: r, schema: false, schemaCode: false, schemaValue: false, params: {}, it: e10 }, VPe, void 0, t);
  }
});
var MO = X(function(mz) {
  Object.defineProperty(mz, "__esModule", { value: true });
  mz.getRules = mz.isJSONType = void 0;
  var JPe = ["string", "number", "integer", "boolean", "null", "object", "array"], XPe = new Set(JPe);
  function QPe(e10) {
    return typeof e10 == "string" && XPe.has(e10);
  }
  mz.isJSONType = QPe;
  function eIe() {
    let e10 = { number: { type: "number", rules: [] }, string: { type: "string", rules: [] }, array: { type: "array", rules: [] }, object: { type: "object", rules: [] } };
    return { types: { ...e10, integer: true, boolean: true, null: true }, rules: [{ rules: [] }, e10.number, e10.string, e10.array, e10.object], post: { rules: [] }, all: {}, keywords: {} };
  }
  mz.getRules = eIe;
});
var NO = X(function(yz) {
  Object.defineProperty(yz, "__esModule", { value: true });
  yz.shouldUseRule = yz.shouldUseGroup = yz.schemaHasRulesForType = void 0;
  function nIe({ schema: e10, self: t }, n) {
    let r = t.RULES.types[n];
    return r && r !== true && hz(e10, r);
  }
  yz.schemaHasRulesForType = nIe;
  function hz(e10, t) {
    return t.rules.some((n) => _z(e10, n));
  }
  yz.shouldUseGroup = hz;
  function _z(e10, t) {
    var n;
    return e10[t.keyword] !== void 0 || ((n = t.definition.implements) === null || n === void 0 ? void 0 : n.some((r) => e10[r] !== void 0));
  }
  yz.shouldUseRule = _z;
});
var ep = X(function(Oz) {
  Object.defineProperty(Oz, "__esModule", { value: true });
  Oz.reportTypeError = Oz.checkDataTypes = Oz.checkDataType = Oz.coerceAndCheckDataType = Oz.getJSONTypes = Oz.getSchemaTypes = Oz.DataType = void 0;
  var Ez = MO(), bz = NO(), Cz = Qd(), G = Pe(), sh = ze(), Pl;
  (function(e10) {
    e10[e10.Correct = 0] = "Correct", e10[e10.Wrong = 1] = "Wrong";
  })(Pl || (Oz.DataType = Pl = {}));
  function sIe(e10) {
    let t = Az(e10.type);
    if (t.includes("null")) {
      if (e10.nullable === false) throw Error("type: null contradicts nullable: false");
    } else {
      if (!t.length && e10.nullable !== void 0) throw Error('"nullable" cannot be used without "type"');
      if (e10.nullable === true) t.push("null");
    }
    return t;
  }
  Oz.getSchemaTypes = sIe;
  function Az(e10) {
    let t = Array.isArray(e10) ? e10 : e10 ? [e10] : [];
    if (t.every(Ez.isJSONType)) return t;
    throw Error("type must be JSONType or JSONType[]: " + t.join(","));
  }
  Oz.getJSONTypes = Az;
  function iIe(e10, t) {
    let { gen: n, data: r, opts: o } = e10, s = aIe(t, o.coerceTypes), i = t.length > 0 && !(s.length === 0 && t.length === 1 && bz.schemaHasRulesForType(e10, t[0]));
    if (i) {
      let a = FO(t, r, o.strictNumbers, Pl.Wrong);
      n.if(a, () => {
        if (s.length) lIe(e10, t, s);
        else $O(e10);
      });
    }
    return i;
  }
  Oz.coerceAndCheckDataType = iIe;
  var Rz = /* @__PURE__ */ new Set(["string", "number", "integer", "boolean", "null"]);
  function aIe(e10, t) {
    return t ? e10.filter((n) => Rz.has(n) || t === "array" && n === "array") : [];
  }
  function lIe(e10, t, n) {
    let { gen: r, data: o, opts: s } = e10, i = r.let("dataType", G._`typeof ${o}`), a = r.let("coerced", G._`undefined`);
    if (s.coerceTypes === "array") r.if(G._`${i} == 'object' && Array.isArray(${o}) && ${o}.length == 1`, () => r.assign(o, G._`${o}[0]`).assign(i, G._`typeof ${o}`).if(FO(t, o, s.strictNumbers), () => r.assign(a, o)));
    r.if(G._`${a} !== undefined`);
    for (let c of n) if (Rz.has(c) || c === "array" && s.coerceTypes === "array") l(c);
    r.else(), $O(e10), r.endIf(), r.if(G._`${a} !== undefined`, () => {
      r.assign(o, a), cIe(e10, a);
    });
    function l(c) {
      switch (c) {
        case "string":
          r.elseIf(G._`${i} == "number" || ${i} == "boolean"`).assign(a, G._`"" + ${o}`).elseIf(G._`${o} === null`).assign(a, G._`""`);
          return;
        case "number":
          r.elseIf(G._`${i} == "boolean" || ${o} === null
              || (${i} == "string" && ${o} && ${o} == +${o})`).assign(a, G._`+${o}`);
          return;
        case "integer":
          r.elseIf(G._`${i} === "boolean" || ${o} === null
              || (${i} === "string" && ${o} && ${o} == +${o} && !(${o} % 1))`).assign(a, G._`+${o}`);
          return;
        case "boolean":
          r.elseIf(G._`${o} === "false" || ${o} === 0 || ${o} === null`).assign(a, false).elseIf(G._`${o} === "true" || ${o} === 1`).assign(a, true);
          return;
        case "null":
          r.elseIf(G._`${o} === "" || ${o} === 0 || ${o} === false`), r.assign(a, null);
          return;
        case "array":
          r.elseIf(G._`${i} === "string" || ${i} === "number"
              || ${i} === "boolean" || ${o} === null`).assign(a, G._`[${o}]`);
      }
    }
  }
  function cIe({ gen: e10, parentData: t, parentDataProperty: n }, r) {
    e10.if(G._`${t} !== undefined`, () => e10.assign(G._`${t}[${n}]`, r));
  }
  function UO(e10, t, n, r = Pl.Correct) {
    let o = r === Pl.Correct ? G.operators.EQ : G.operators.NEQ, s;
    switch (e10) {
      case "null":
        return G._`${t} ${o} null`;
      case "array":
        s = G._`Array.isArray(${t})`;
        break;
      case "object":
        s = G._`${t} && typeof ${t} == "object" && !Array.isArray(${t})`;
        break;
      case "integer":
        s = i(G._`!(${t} % 1) && !isNaN(${t})`);
        break;
      case "number":
        s = i();
        break;
      default:
        return G._`typeof ${t} ${o} ${e10}`;
    }
    return r === Pl.Correct ? s : G.not(s);
    function i(a = G.nil) {
      return G.and(G._`typeof ${t} == "number"`, a, n ? G._`isFinite(${t})` : G.nil);
    }
  }
  Oz.checkDataType = UO;
  function FO(e10, t, n, r) {
    if (e10.length === 1) return UO(e10[0], t, n, r);
    let o, s = sh.toHash(e10);
    if (s.array && s.object) {
      let i = G._`typeof ${t} != "object"`;
      o = s.null ? i : G._`!${t} || ${i}`, delete s.null, delete s.array, delete s.object;
    } else o = G.nil;
    if (s.number) delete s.integer;
    for (let i in s) o = G.and(o, UO(i, t, n, r));
    return o;
  }
  Oz.checkDataTypes = FO;
  var uIe = { message: ({ schema: e10 }) => `must be ${e10}`, params: ({ schema: e10, schemaValue: t }) => typeof e10 == "string" ? G._`{type: ${e10}}` : G._`{type: ${t}}` };
  function $O(e10) {
    let t = dIe(e10);
    Cz.reportError(t, uIe);
  }
  Oz.reportTypeError = $O;
  function dIe(e10) {
    let { gen: t, data: n, schema: r } = e10, o = sh.schemaRefOrVal(e10, r, "type");
    return { gen: t, keyword: "type", data: n, schema: r.type, schemaCode: o, schemaValue: o, parentSchema: r, params: {}, it: e10 };
  }
});
var Pz = X(function(vz) {
  Object.defineProperty(vz, "__esModule", { value: true });
  vz.assignDefaults = void 0;
  var gr = Pe(), xz = ze();
  function yIe(e10, t) {
    let { properties: n, items: r } = e10.schema;
    if (t === "object" && n) for (let o in n) wz(e10, o, n[o].default);
    else if (t === "array" && Array.isArray(r)) r.forEach((o, s) => wz(e10, s, o.default));
  }
  vz.assignDefaults = yIe;
  function wz(e10, t, n) {
    let { gen: r, compositeRule: o, data: s, opts: i } = e10;
    if (n === void 0) return;
    let a = gr._`${s}${gr.getProperty(t)}`;
    if (o) {
      xz.checkStrictMode(e10, `default is ignored for: ${a}`);
      return;
    }
    let l = gr._`${a} === undefined`;
    if (i.useDefaults === "empty") l = gr._`${l} || ${a} === null || ${a} === ""`;
    r.if(l, gr._`${a} = ${gr.stringify(n)}`);
  }
});
var hr = X(function(Mz) {
  Object.defineProperty(Mz, "__esModule", { value: true });
  Mz.validateUnion = Mz.validateArray = Mz.usePattern = Mz.callValidateCode = Mz.schemaProperties = Mz.allSchemaProperties = Mz.noPropertyInData = Mz.propertyInData = Mz.isOwnProperty = Mz.hasPropFunc = Mz.reportMissingProp = Mz.checkMissingProp = Mz.checkReportMissingProp = void 0;
  var _e = Pe(), Il = ze(), Gs = qo(), Iz = ze();
  function SIe(e10, t) {
    let { gen: n, data: r, it: o } = e10;
    n.if(HO(n, r, t, o.opts.ownProperties), () => {
      e10.setParams({ missingProperty: _e._`${t}` }, true), e10.error();
    });
  }
  Mz.checkReportMissingProp = SIe;
  function EIe({ gen: e10, data: t, it: { opts: n } }, r, o) {
    return _e.or(...r.map((s) => _e.and(HO(e10, t, s, n.ownProperties), _e._`${o} = ${s}`)));
  }
  Mz.checkMissingProp = EIe;
  function bIe(e10, t) {
    e10.setParams({ missingProperty: t }, true), e10.error();
  }
  Mz.reportMissingProp = bIe;
  function Dz(e10) {
    return e10.scopeValue("func", { ref: Object.prototype.hasOwnProperty, code: _e._`Object.prototype.hasOwnProperty` });
  }
  Mz.hasPropFunc = Dz;
  function zO(e10, t, n) {
    return _e._`${Dz(e10)}.call(${t}, ${n})`;
  }
  Mz.isOwnProperty = zO;
  function CIe(e10, t, n, r) {
    let o = _e._`${t}${_e.getProperty(n)} !== undefined`;
    return r ? _e._`${o} && ${zO(e10, t, n)}` : o;
  }
  Mz.propertyInData = CIe;
  function HO(e10, t, n, r) {
    let o = _e._`${t}${_e.getProperty(n)} === undefined`;
    return r ? _e.or(o, _e.not(zO(e10, t, n))) : o;
  }
  Mz.noPropertyInData = HO;
  function Lz(e10) {
    return e10 ? Object.keys(e10).filter((t) => t !== "__proto__") : [];
  }
  Mz.allSchemaProperties = Lz;
  function AIe(e10, t) {
    return Lz(t).filter((n) => !Il.alwaysValidSchema(e10, t[n]));
  }
  Mz.schemaProperties = AIe;
  function RIe({ schemaCode: e10, data: t, it: { gen: n, topSchemaRef: r, schemaPath: o, errorPath: s }, it: i }, a, l, c) {
    let d = c ? _e._`${e10}, ${t}, ${r}${o}` : t, p = [[Gs.default.instancePath, _e.strConcat(Gs.default.instancePath, s)], [Gs.default.parentData, i.parentData], [Gs.default.parentDataProperty, i.parentDataProperty], [Gs.default.rootData, Gs.default.rootData]];
    if (i.opts.dynamicRef) p.push([Gs.default.dynamicAnchors, Gs.default.dynamicAnchors]);
    let f = _e._`${d}, ${n.object(...p)}`;
    return l !== _e.nil ? _e._`${a}.call(${l}, ${f})` : _e._`${a}(${f})`;
  }
  Mz.callValidateCode = RIe;
  var OIe = _e._`new RegExp`;
  function TIe({ gen: e10, it: { opts: t } }, n) {
    let r = t.unicodeRegExp ? "u" : "", { regExp: o } = t.code, s = o(n, r);
    return e10.scopeValue("pattern", { key: s.toString(), ref: s, code: _e._`${o.code === "new RegExp" ? OIe : Iz.useFunc(e10, o)}(${n}, ${r})` });
  }
  Mz.usePattern = TIe;
  function wIe(e10) {
    let { gen: t, data: n, keyword: r, it: o } = e10, s = t.name("valid");
    if (o.allErrors) {
      let a = t.let("valid", true);
      return i(() => t.assign(a, false)), a;
    }
    return t.var(s, true), i(() => t.break()), s;
    function i(a) {
      let l = t.const("len", _e._`${n}.length`);
      t.forRange("i", 0, l, (c) => {
        e10.subschema({ keyword: r, dataProp: c, dataPropType: Il.Type.Num }, s), t.if(_e.not(s), a);
      });
    }
  }
  Mz.validateArray = wIe;
  function xIe(e10) {
    let { gen: t, schema: n, keyword: r, it: o } = e10;
    if (!Array.isArray(n)) throw Error("ajv implementation error");
    if (n.some((l) => Il.alwaysValidSchema(o, l)) && !o.opts.unevaluated) return;
    let i = t.let("valid", false), a = t.name("_valid");
    t.block(() => n.forEach((l, c) => {
      let d = e10.subschema({ keyword: r, schemaProp: c, compositeRule: true }, a);
      if (t.assign(i, _e._`${i} || ${a}`), !e10.mergeValidEvaluated(d, a)) t.if(_e.not(i));
    })), e10.result(i, () => e10.reset(), () => e10.error(true));
  }
  Mz.validateUnion = xIe;
});
var Bz = X(function(Hz) {
  Object.defineProperty(Hz, "__esModule", { value: true });
  Hz.validateKeywordUsage = Hz.validSchemaType = Hz.funcKeywordCode = Hz.macroKeywordCode = void 0;
  var Xe = Pe(), ia = qo(), Fz = hr(), $z = Qd();
  function HIe(e10, t) {
    let { gen: n, keyword: r, schema: o, parentSchema: s, it: i } = e10, a = t.macro.call(i.self, o, s, i), l = zz(n, r, a);
    if (i.opts.validateSchema !== false) i.self.validateSchema(a, true);
    let c = n.name("valid");
    e10.subschema({ schema: a, schemaPath: Xe.nil, errSchemaPath: `${i.errSchemaPath}/${r}`, topSchemaRef: l, compositeRule: true }, c), e10.pass(c, () => e10.error(true));
  }
  Hz.macroKeywordCode = HIe;
  function jIe(e10, t) {
    var n;
    let { gen: r, keyword: o, schema: s, parentSchema: i, $data: a, it: l } = e10;
    KIe(l, t);
    let c = !a && t.compile ? t.compile.call(l.self, s, i, l) : t.validate, d = zz(r, o, c), p = r.let("valid");
    e10.block$data(p, f), e10.ok((n = t.valid) !== null && n !== void 0 ? n : p);
    function f() {
      if (t.errors === false) {
        if (_(), t.modifying) Uz(e10);
        y(() => e10.error());
      } else {
        let S = t.async ? m() : g();
        if (t.modifying) Uz(e10);
        y(() => BIe(e10, S));
      }
    }
    function m() {
      let S = r.let("ruleErrs", null);
      return r.try(() => _(Xe._`await `), (E) => r.assign(p, false).if(Xe._`${E} instanceof ${l.ValidationError}`, () => r.assign(S, Xe._`${E}.errors`), () => r.throw(E))), S;
    }
    function g() {
      let S = Xe._`${d}.errors`;
      return r.assign(S, null), _(Xe.nil), S;
    }
    function _(S = t.async ? Xe._`await ` : Xe.nil) {
      let E = l.opts.passContext ? ia.default.this : ia.default.self, b = !("compile" in t && !a || t.schema === false);
      r.assign(p, Xe._`${S}${Fz.callValidateCode(e10, d, E, b)}`, t.modifying);
    }
    function y(S) {
      var E;
      r.if(Xe.not((E = t.valid) !== null && E !== void 0 ? E : p), S);
    }
  }
  Hz.funcKeywordCode = jIe;
  function Uz(e10) {
    let { gen: t, data: n, it: r } = e10;
    t.if(r.parentData, () => t.assign(n, Xe._`${r.parentData}[${r.parentDataProperty}]`));
  }
  function BIe(e10, t) {
    let { gen: n } = e10;
    n.if(Xe._`Array.isArray(${t})`, () => {
      n.assign(ia.default.vErrors, Xe._`${ia.default.vErrors} === null ? ${t} : ${ia.default.vErrors}.concat(${t})`).assign(ia.default.errors, Xe._`${ia.default.vErrors}.length`), $z.extendErrors(e10);
    }, () => e10.error());
  }
  function KIe({ schemaEnv: e10 }, t) {
    if (t.async && !e10.$async) throw Error("async keyword in sync schema");
  }
  function zz(e10, t, n) {
    if (n === void 0) throw Error(`keyword "${t}" failed to compile`);
    return e10.scopeValue("keyword", typeof n == "function" ? { ref: n } : { ref: n, code: Xe.stringify(n) });
  }
  function GIe(e10, t, n = false) {
    return !t.length || t.some((r) => r === "array" ? Array.isArray(e10) : r === "object" ? e10 && typeof e10 == "object" && !Array.isArray(e10) : typeof e10 == r || n && typeof e10 > "u");
  }
  Hz.validSchemaType = GIe;
  function WIe({ schema: e10, opts: t, self: n, errSchemaPath: r }, o, s) {
    if (Array.isArray(o.keyword) ? !o.keyword.includes(s) : o.keyword !== s) throw Error("ajv implementation error");
    let i = o.dependencies;
    if (i === null || i === void 0 ? void 0 : i.some((a) => !Object.prototype.hasOwnProperty.call(e10, a))) throw Error(`parent schema must have dependencies of ${s}: ${i.join(",")}`);
    if (o.validateSchema) {
      if (!o.validateSchema(e10[s])) {
        let l = `keyword "${s}" value is invalid at path "${r}": ` + n.errorsText(o.validateSchema.errors);
        if (t.validateSchema === "log") n.logger.error(l);
        else throw Error(l);
      }
    }
  }
  Hz.validateKeywordUsage = WIe;
});
var Wz = X(function(Kz) {
  Object.defineProperty(Kz, "__esModule", { value: true });
  Kz.extendSubschemaMode = Kz.extendSubschemaData = Kz.getSubschema = void 0;
  var Ft = Pe(), ih = ze();
  function ZIe(e10, { keyword: t, schemaProp: n, schema: r, schemaPath: o, errSchemaPath: s, topSchemaRef: i }) {
    if (t !== void 0 && r !== void 0) throw Error('both "keyword" and "schema" passed, only one allowed');
    if (t !== void 0) {
      let a = e10.schema[t];
      return n === void 0 ? { schema: a, schemaPath: Ft._`${e10.schemaPath}${Ft.getProperty(t)}`, errSchemaPath: `${e10.errSchemaPath}/${t}` } : { schema: a[n], schemaPath: Ft._`${e10.schemaPath}${Ft.getProperty(t)}${Ft.getProperty(n)}`, errSchemaPath: `${e10.errSchemaPath}/${t}/${ih.escapeFragment(n)}` };
    }
    if (r !== void 0) {
      if (o === void 0 || s === void 0 || i === void 0) throw Error('"schemaPath", "errSchemaPath" and "topSchemaRef" are required with "schema"');
      return { schema: r, schemaPath: o, topSchemaRef: i, errSchemaPath: s };
    }
    throw Error('either "keyword" or "schema" must be passed');
  }
  Kz.getSubschema = ZIe;
  function JIe(e10, t, { dataProp: n, dataPropType: r, data: o, dataTypes: s, propertyName: i }) {
    if (o !== void 0 && n !== void 0) throw Error('both "data" and "dataProp" passed, only one allowed');
    let { gen: a } = t;
    if (n !== void 0) {
      let { errorPath: c, dataPathArr: d, opts: p } = t, f = a.let("data", Ft._`${t.data}${Ft.getProperty(n)}`, true);
      l(f), e10.errorPath = Ft.str`${c}${ih.getErrorPath(n, r, p.jsPropertySyntax)}`, e10.parentDataProperty = Ft._`${n}`, e10.dataPathArr = [...d, e10.parentDataProperty];
    }
    if (o !== void 0) {
      let c = o instanceof Ft.Name ? o : a.let("data", o, true);
      if (l(c), i !== void 0) e10.propertyName = i;
    }
    if (s) e10.dataTypes = s;
    function l(c) {
      e10.data = c, e10.dataLevel = t.dataLevel + 1, e10.dataTypes = [], t.definedProperties = /* @__PURE__ */ new Set(), e10.parentData = t.data, e10.dataNames = [...t.dataNames, c];
    }
  }
  Kz.extendSubschemaData = JIe;
  function XIe(e10, { jtdDiscriminator: t, jtdMetadata: n, compositeRule: r, createErrors: o, allErrors: s }) {
    if (r !== void 0) e10.compositeRule = r;
    if (o !== void 0) e10.createErrors = o;
    if (s !== void 0) e10.allErrors = s;
    e10.jtdDiscriminator = t, e10.jtdMetadata = n;
  }
  Kz.extendSubschemaMode = XIe;
});
var jO = X(function(ymt, Vz) {
  Vz.exports = function e10(t, n) {
    if (t === n) return true;
    if (t && n && typeof t == "object" && typeof n == "object") {
      if (t.constructor !== n.constructor) return false;
      var r, o, s;
      if (Array.isArray(t)) {
        if (r = t.length, r != n.length) return false;
        for (o = r; o-- !== 0; ) if (!e10(t[o], n[o])) return false;
        return true;
      }
      if (t.constructor === RegExp) return t.source === n.source && t.flags === n.flags;
      if (t.valueOf !== Object.prototype.valueOf) return t.valueOf() === n.valueOf();
      if (t.toString !== Object.prototype.toString) return t.toString() === n.toString();
      if (s = Object.keys(t), r = s.length, r !== Object.keys(n).length) return false;
      for (o = r; o-- !== 0; ) if (!Object.prototype.hasOwnProperty.call(n, s[o])) return false;
      for (o = r; o-- !== 0; ) {
        var i = s[o];
        if (!e10(t[i], n[i])) return false;
      }
      return true;
    }
    return t !== t && n !== n;
  };
});
var Yz = X(function(Smt, qz) {
  var Ws2 = qz.exports = function(e10, t, n) {
    if (typeof t == "function") n = t, t = {};
    n = t.cb || n;
    var r = typeof n == "function" ? n : n.pre || function() {
    }, o = n.post || function() {
    };
    ah(t, r, o, e10, "", e10);
  };
  Ws2.keywords = { additionalItems: true, items: true, contains: true, additionalProperties: true, propertyNames: true, not: true, if: true, then: true, else: true };
  Ws2.arrayKeywords = { items: true, allOf: true, anyOf: true, oneOf: true };
  Ws2.propsKeywords = { $defs: true, definitions: true, properties: true, patternProperties: true, dependencies: true };
  Ws2.skipKeywords = { default: true, enum: true, const: true, required: true, maximum: true, minimum: true, exclusiveMaximum: true, exclusiveMinimum: true, multipleOf: true, maxLength: true, minLength: true, pattern: true, format: true, maxItems: true, minItems: true, uniqueItems: true, maxProperties: true, minProperties: true };
  function ah(e10, t, n, r, o, s, i, a, l, c) {
    if (r && typeof r == "object" && !Array.isArray(r)) {
      t(r, o, s, i, a, l, c);
      for (var d in r) {
        var p = r[d];
        if (Array.isArray(p)) {
          if (d in Ws2.arrayKeywords) for (var f = 0; f < p.length; f++) ah(e10, t, n, p[f], o + "/" + d + "/" + f, s, o, d, r, f);
        } else if (d in Ws2.propsKeywords) {
          if (p && typeof p == "object") for (var m in p) ah(e10, t, n, p[m], o + "/" + d + "/" + tDe(m), s, o, d, r, m);
        } else if (d in Ws2.keywords || e10.allKeys && !(d in Ws2.skipKeywords)) ah(e10, t, n, p, o + "/" + d, s, o, d, r);
      }
      n(r, o, s, i, a, l, c);
    }
  }
  function tDe(e10) {
    return e10.replace(/~/g, "~0").replace(/\//g, "~1");
  }
});
var tp = X(function(eH) {
  Object.defineProperty(eH, "__esModule", { value: true });
  eH.getSchemaRefs = eH.resolveUrl = eH.normalizeId = eH._getFullPath = eH.getFullPath = eH.inlineRef = void 0;
  var Zz = ze(), nDe = jO(), rDe = Yz(), oDe = /* @__PURE__ */ new Set(["type", "format", "pattern", "maxLength", "minLength", "maxProperties", "minProperties", "maxItems", "minItems", "maximum", "minimum", "uniqueItems", "multipleOf", "required", "enum", "const"]);
  function sDe(e10, t = true) {
    if (typeof e10 == "boolean") return true;
    if (t === true) return !BO(e10);
    if (!t) return false;
    return Jz(e10) <= t;
  }
  eH.inlineRef = sDe;
  var iDe = /* @__PURE__ */ new Set(["$ref", "$recursiveRef", "$recursiveAnchor", "$dynamicRef", "$dynamicAnchor"]);
  function BO(e10) {
    for (let t in e10) {
      if (iDe.has(t)) return true;
      let n = e10[t];
      if (Array.isArray(n) && n.some(BO)) return true;
      if (typeof n == "object" && BO(n)) return true;
    }
    return false;
  }
  function Jz(e10) {
    let t = 0;
    for (let n in e10) {
      if (n === "$ref") return 1 / 0;
      if (t++, oDe.has(n)) continue;
      if (typeof e10[n] == "object") Zz.eachItem(e10[n], (r) => t += Jz(r));
      if (t === 1 / 0) return 1 / 0;
    }
    return t;
  }
  function Xz(e10, t = "", n) {
    if (n !== false) t = Dl(t);
    let r = e10.parse(t);
    return Qz(e10, r);
  }
  eH.getFullPath = Xz;
  function Qz(e10, t) {
    return e10.serialize(t).split("#")[0] + "#";
  }
  eH._getFullPath = Qz;
  var aDe = /#\/?$/;
  function Dl(e10) {
    return e10 ? e10.replace(aDe, "") : "";
  }
  eH.normalizeId = Dl;
  function lDe(e10, t, n) {
    return n = Dl(n), e10.resolve(t, n);
  }
  eH.resolveUrl = lDe;
  var cDe = /^[a-z_][-a-z0-9._]*$/i;
  function uDe(e10, t) {
    if (typeof e10 == "boolean") return {};
    let { schemaId: n, uriResolver: r } = this.opts, o = Dl(e10[n] || t), s = { "": o }, i = Xz(r, o, false), a = {}, l = /* @__PURE__ */ new Set();
    return rDe(e10, { allKeys: true }, (p, f, m, g) => {
      if (g === void 0) return;
      let _ = i + f, y = s[g];
      if (typeof p[n] == "string") y = S.call(this, p[n]);
      E.call(this, p.$anchor), E.call(this, p.$dynamicAnchor), s[f] = y;
      function S(b) {
        let C = this.opts.uriResolver.resolve;
        if (b = Dl(y ? C(y, b) : b), l.has(b)) throw d(b);
        l.add(b);
        let A = this.refs[b];
        if (typeof A == "string") A = this.refs[A];
        if (typeof A == "object") c(p, A.schema, b);
        else if (b !== Dl(_)) if (b[0] === "#") c(p, a[b], b), a[b] = p;
        else this.refs[b] = _;
        return b;
      }
      function E(b) {
        if (typeof b == "string") {
          if (!cDe.test(b)) throw Error(`invalid anchor "${b}"`);
          S.call(this, `#${b}`);
        }
      }
    }), a;
    function c(p, f, m) {
      if (f !== void 0 && !nDe(p, f)) throw d(m);
    }
    function d(p) {
      return Error(`reference "${p}" resolves to more than one schema`);
    }
  }
  eH.getSchemaRefs = uDe;
});
var np = X(function(hH) {
  Object.defineProperty(hH, "__esModule", { value: true });
  hH.getData = hH.KeywordCxt = hH.validateFunctionCode = void 0;
  var ch = fz(), lh = ep(), Ml = NO(), Vs = ep(), sH = Pz(), no = Bz(), Ll = Wz(), M = Pe(), Ce = qo(), iH = tp(), tn = ze(), to = Qd();
  function hDe(e10) {
    if (cH(e10)) {
      if (uH(e10), lH(e10)) {
        SDe(e10);
        return;
      }
    }
    aH(e10, () => ch.topBoolOrEmptySchema(e10));
  }
  hH.validateFunctionCode = hDe;
  function aH({ gen: e10, validateName: t, schema: n, schemaEnv: r, opts: o }, s) {
    if (o.code.es5) e10.func(t, M._`${Ce.default.data}, ${Ce.default.valCxt}`, r.$async, () => {
      e10.code(M._`"use strict"; ${nH(n, o)}`), yDe(e10, o), e10.code(s);
    });
    else e10.func(t, M._`${Ce.default.data}, ${_De(o)}`, r.$async, () => e10.code(nH(n, o)).code(s));
  }
  function _De(e10) {
    return M._`{${Ce.default.instancePath}="", ${Ce.default.parentData}, ${Ce.default.parentDataProperty}, ${Ce.default.rootData}=${Ce.default.data}${e10.dynamicRef ? M._`, ${Ce.default.dynamicAnchors}={}` : M.nil}}={}`;
  }
  function yDe(e10, t) {
    e10.if(Ce.default.valCxt, () => {
      if (e10.var(Ce.default.instancePath, M._`${Ce.default.valCxt}.${Ce.default.instancePath}`), e10.var(Ce.default.parentData, M._`${Ce.default.valCxt}.${Ce.default.parentData}`), e10.var(Ce.default.parentDataProperty, M._`${Ce.default.valCxt}.${Ce.default.parentDataProperty}`), e10.var(Ce.default.rootData, M._`${Ce.default.valCxt}.${Ce.default.rootData}`), t.dynamicRef) e10.var(Ce.default.dynamicAnchors, M._`${Ce.default.valCxt}.${Ce.default.dynamicAnchors}`);
    }, () => {
      if (e10.var(Ce.default.instancePath, M._`""`), e10.var(Ce.default.parentData, M._`undefined`), e10.var(Ce.default.parentDataProperty, M._`undefined`), e10.var(Ce.default.rootData, Ce.default.data), t.dynamicRef) e10.var(Ce.default.dynamicAnchors, M._`{}`);
    });
  }
  function SDe(e10) {
    let { schema: t, opts: n, gen: r } = e10;
    aH(e10, () => {
      if (n.$comment && t.$comment) pH(e10);
      if (RDe(e10), r.let(Ce.default.vErrors, null), r.let(Ce.default.errors, 0), n.unevaluated) EDe(e10);
      dH(e10), wDe(e10);
    });
    return;
  }
  function EDe(e10) {
    let { gen: t, validateName: n } = e10;
    e10.evaluated = t.const("evaluated", M._`${n}.evaluated`), t.if(M._`${e10.evaluated}.dynamicProps`, () => t.assign(M._`${e10.evaluated}.props`, M._`undefined`)), t.if(M._`${e10.evaluated}.dynamicItems`, () => t.assign(M._`${e10.evaluated}.items`, M._`undefined`));
  }
  function nH(e10, t) {
    let n = typeof e10 == "object" && e10[t.schemaId];
    return n && (t.code.source || t.code.process) ? M._`/*# sourceURL=${n} */` : M.nil;
  }
  function bDe(e10, t) {
    if (cH(e10)) {
      if (uH(e10), lH(e10)) {
        CDe(e10, t);
        return;
      }
    }
    ch.boolOrEmptySchema(e10, t);
  }
  function lH({ schema: e10, self: t }) {
    if (typeof e10 == "boolean") return !e10;
    for (let n in e10) if (t.RULES.all[n]) return true;
    return false;
  }
  function cH(e10) {
    return typeof e10.schema != "boolean";
  }
  function CDe(e10, t) {
    let { schema: n, gen: r, opts: o } = e10;
    if (o.$comment && n.$comment) pH(e10);
    ODe(e10), TDe(e10);
    let s = r.const("_errs", Ce.default.errors);
    dH(e10, s), r.var(t, M._`${s} === ${Ce.default.errors}`);
  }
  function uH(e10) {
    tn.checkUnknownRules(e10), ADe(e10);
  }
  function dH(e10, t) {
    if (e10.opts.jtd) return rH(e10, [], false, t);
    let n = lh.getSchemaTypes(e10.schema), r = lh.coerceAndCheckDataType(e10, n);
    rH(e10, n, !r, t);
  }
  function ADe(e10) {
    let { schema: t, errSchemaPath: n, opts: r, self: o } = e10;
    if (t.$ref && r.ignoreKeywordsWithRef && tn.schemaHasRulesButRef(t, o.RULES)) o.logger.warn(`$ref: keywords ignored in schema at path "${n}"`);
  }
  function RDe(e10) {
    let { schema: t, opts: n } = e10;
    if (t.default !== void 0 && n.useDefaults && n.strictSchema) tn.checkStrictMode(e10, "default is ignored in the schema root");
  }
  function ODe(e10) {
    let t = e10.schema[e10.opts.schemaId];
    if (t) e10.baseId = iH.resolveUrl(e10.opts.uriResolver, e10.baseId, t);
  }
  function TDe(e10) {
    if (e10.schema.$async && !e10.schemaEnv.$async) throw Error("async schema in sync schema");
  }
  function pH({ gen: e10, schemaEnv: t, schema: n, errSchemaPath: r, opts: o }) {
    let s = n.$comment;
    if (o.$comment === true) e10.code(M._`${Ce.default.self}.logger.log(${s})`);
    else if (typeof o.$comment == "function") {
      let i = M.str`${r}/$comment`, a = e10.scopeValue("root", { ref: t.root });
      e10.code(M._`${Ce.default.self}.opts.$comment(${s}, ${i}, ${a}.schema)`);
    }
  }
  function wDe(e10) {
    let { gen: t, schemaEnv: n, validateName: r, ValidationError: o, opts: s } = e10;
    if (n.$async) t.if(M._`${Ce.default.errors} === 0`, () => t.return(Ce.default.data), () => t.throw(M._`new ${o}(${Ce.default.vErrors})`));
    else {
      if (t.assign(M._`${r}.errors`, Ce.default.vErrors), s.unevaluated) xDe(e10);
      t.return(M._`${Ce.default.errors} === 0`);
    }
  }
  function xDe({ gen: e10, evaluated: t, props: n, items: r }) {
    if (n instanceof M.Name) e10.assign(M._`${t}.props`, n);
    if (r instanceof M.Name) e10.assign(M._`${t}.items`, r);
  }
  function rH(e10, t, n, r) {
    let { gen: o, schema: s, data: i, allErrors: a, opts: l, self: c } = e10, { RULES: d } = c;
    if (s.$ref && (l.ignoreKeywordsWithRef || !tn.schemaHasRulesButRef(s, d))) {
      o.block(() => mH(e10, "$ref", d.all.$ref.definition));
      return;
    }
    if (!l.jtd) vDe(e10, t);
    o.block(() => {
      for (let f of d.rules) p(f);
      p(d.post);
    });
    function p(f) {
      if (!Ml.shouldUseGroup(s, f)) return;
      if (f.type) {
        if (o.if(Vs.checkDataType(f.type, i, l.strictNumbers)), oH(e10, f), t.length === 1 && t[0] === f.type && n) o.else(), Vs.reportTypeError(e10);
        o.endIf();
      } else oH(e10, f);
      if (!a) o.if(M._`${Ce.default.errors} === ${r || 0}`);
    }
  }
  function oH(e10, t) {
    let { gen: n, schema: r, opts: { useDefaults: o } } = e10;
    if (o) sH.assignDefaults(e10, t.type);
    n.block(() => {
      for (let s of t.rules) if (Ml.shouldUseRule(r, s)) mH(e10, s.keyword, s.definition, t.type);
    });
  }
  function vDe(e10, t) {
    if (e10.schemaEnv.meta || !e10.opts.strictTypes) return;
    if (kDe(e10, t), !e10.opts.allowUnionTypes) PDe(e10, t);
    IDe(e10, e10.dataTypes);
  }
  function kDe(e10, t) {
    if (!t.length) return;
    if (!e10.dataTypes.length) {
      e10.dataTypes = t;
      return;
    }
    t.forEach((n) => {
      if (!fH(e10.dataTypes, n)) KO(e10, `type "${n}" not allowed by context "${e10.dataTypes.join(",")}"`);
    }), LDe(e10, t);
  }
  function PDe(e10, t) {
    if (t.length > 1 && !(t.length === 2 && t.includes("null"))) KO(e10, "use allowUnionTypes to allow union type keyword");
  }
  function IDe(e10, t) {
    let n = e10.self.RULES.all;
    for (let r in n) {
      let o = n[r];
      if (typeof o == "object" && Ml.shouldUseRule(e10.schema, o)) {
        let { type: s } = o.definition;
        if (s.length && !s.some((i) => DDe(t, i))) KO(e10, `missing type "${s.join(",")}" for keyword "${r}"`);
      }
    }
  }
  function DDe(e10, t) {
    return e10.includes(t) || t === "number" && e10.includes("integer");
  }
  function fH(e10, t) {
    return e10.includes(t) || t === "integer" && e10.includes("number");
  }
  function LDe(e10, t) {
    let n = [];
    for (let r of e10.dataTypes) if (fH(t, r)) n.push(r);
    else if (t.includes("integer") && r === "number") n.push("integer");
    e10.dataTypes = n;
  }
  function KO(e10, t) {
    let n = e10.schemaEnv.baseId + e10.errSchemaPath;
    t += ` at "${n}" (strictTypes)`, tn.checkStrictMode(e10, t, e10.opts.strictTypes);
  }
  class GO {
    constructor(e10, t, n) {
      if (no.validateKeywordUsage(e10, t, n), this.gen = e10.gen, this.allErrors = e10.allErrors, this.keyword = n, this.data = e10.data, this.schema = e10.schema[n], this.$data = t.$data && e10.opts.$data && this.schema && this.schema.$data, this.schemaValue = tn.schemaRefOrVal(e10, this.schema, n, this.$data), this.schemaType = t.schemaType, this.parentSchema = e10.schema, this.params = {}, this.it = e10, this.def = t, this.$data) this.schemaCode = e10.gen.const("vSchema", gH(this.$data, e10));
      else if (this.schemaCode = this.schemaValue, !no.validSchemaType(this.schema, t.schemaType, t.allowUndefined)) throw Error(`${n} value must be ${JSON.stringify(t.schemaType)}`);
      if ("code" in t ? t.trackErrors : t.errors !== false) this.errsCount = e10.gen.const("_errs", Ce.default.errors);
    }
    result(e10, t, n) {
      this.failResult(M.not(e10), t, n);
    }
    failResult(e10, t, n) {
      if (this.gen.if(e10), n) n();
      else this.error();
      if (t) {
        if (this.gen.else(), t(), this.allErrors) this.gen.endIf();
      } else if (this.allErrors) this.gen.endIf();
      else this.gen.else();
    }
    pass(e10, t) {
      this.failResult(M.not(e10), void 0, t);
    }
    fail(e10) {
      if (e10 === void 0) {
        if (this.error(), !this.allErrors) this.gen.if(false);
        return;
      }
      if (this.gen.if(e10), this.error(), this.allErrors) this.gen.endIf();
      else this.gen.else();
    }
    fail$data(e10) {
      if (!this.$data) return this.fail(e10);
      let { schemaCode: t } = this;
      this.fail(M._`${t} !== undefined && (${M.or(this.invalid$data(), e10)})`);
    }
    error(e10, t, n) {
      if (t) {
        this.setParams(t), this._error(e10, n), this.setParams({});
        return;
      }
      this._error(e10, n);
    }
    _error(e10, t) {
      (e10 ? to.reportExtraError : to.reportError)(this, this.def.error, t);
    }
    $dataError() {
      to.reportError(this, this.def.$dataError || to.keyword$DataError);
    }
    reset() {
      if (this.errsCount === void 0) throw Error('add "trackErrors" to keyword definition');
      to.resetErrorsCount(this.gen, this.errsCount);
    }
    ok(e10) {
      if (!this.allErrors) this.gen.if(e10);
    }
    setParams(e10, t) {
      if (t) Object.assign(this.params, e10);
      else this.params = e10;
    }
    block$data(e10, t, n = M.nil) {
      this.gen.block(() => {
        this.check$data(e10, n), t();
      });
    }
    check$data(e10 = M.nil, t = M.nil) {
      if (!this.$data) return;
      let { gen: n, schemaCode: r, schemaType: o, def: s } = this;
      if (n.if(M.or(M._`${r} === undefined`, t)), e10 !== M.nil) n.assign(e10, true);
      if (o.length || s.validateSchema) {
        if (n.elseIf(this.invalid$data()), this.$dataError(), e10 !== M.nil) n.assign(e10, false);
      }
      n.else();
    }
    invalid$data() {
      let { gen: e10, schemaCode: t, schemaType: n, def: r, it: o } = this;
      return M.or(s(), i());
      function s() {
        if (n.length) {
          if (!(t instanceof M.Name)) throw Error("ajv implementation error");
          let a = Array.isArray(n) ? n : [n];
          return M._`${Vs.checkDataTypes(a, t, o.opts.strictNumbers, Vs.DataType.Wrong)}`;
        }
        return M.nil;
      }
      function i() {
        if (r.validateSchema) {
          let a = e10.scopeValue("validate$data", { ref: r.validateSchema });
          return M._`!${a}(${t})`;
        }
        return M.nil;
      }
    }
    subschema(e10, t) {
      let n = Ll.getSubschema(this.it, e10);
      Ll.extendSubschemaData(n, this.it, e10), Ll.extendSubschemaMode(n, e10);
      let r = { ...this.it, ...n, items: void 0, props: void 0 };
      return bDe(r, t), r;
    }
    mergeEvaluated(e10, t) {
      let { it: n, gen: r } = this;
      if (!n.opts.unevaluated) return;
      if (n.props !== true && e10.props !== void 0) n.props = tn.mergeEvaluated.props(r, e10.props, n.props, t);
      if (n.items !== true && e10.items !== void 0) n.items = tn.mergeEvaluated.items(r, e10.items, n.items, t);
    }
    mergeValidEvaluated(e10, t) {
      let { it: n, gen: r } = this;
      if (n.opts.unevaluated && (n.props !== true || n.items !== true)) return r.if(t, () => this.mergeEvaluated(e10, M.Name)), true;
    }
  }
  hH.KeywordCxt = GO;
  function mH(e10, t, n, r) {
    let o = new GO(e10, n, t);
    if ("code" in n) n.code(o, r);
    else if (o.$data && n.validate) no.funcKeywordCode(o, n);
    else if ("macro" in n) no.macroKeywordCode(o, n);
    else if (n.compile || n.validate) no.funcKeywordCode(o, n);
  }
  var MDe = /^\/(?:[^~]|~0|~1)*$/, NDe = /^([0-9]+)(#|\/(?:[^~]|~0|~1)*)?$/;
  function gH(e10, { dataLevel: t, dataNames: n, dataPathArr: r }) {
    let o, s;
    if (e10 === "") return Ce.default.rootData;
    if (e10[0] === "/") {
      if (!MDe.test(e10)) throw Error(`Invalid JSON-pointer: ${e10}`);
      o = e10, s = Ce.default.rootData;
    } else {
      let c = NDe.exec(e10);
      if (!c) throw Error(`Invalid JSON-pointer: ${e10}`);
      let d = +c[1];
      if (o = c[2], o === "#") {
        if (d >= t) throw Error(l("property/index", d));
        return r[t - d];
      }
      if (d > t) throw Error(l("data", d));
      if (s = n[t - d], !o) return s;
    }
    let i = s, a = o.split("/");
    for (let c of a) if (c) s = M._`${s}${M.getProperty(tn.unescapeJsonPointer(c))}`, i = M._`${i} && ${s}`;
    return i;
    function l(c, d) {
      return `Cannot access ${c} ${d} levels up, current level is ${t}`;
    }
  }
  hH.getData = gH;
});
var uh = X(function(SH) {
  Object.defineProperty(SH, "__esModule", { value: true });
  class yH extends Error {
    constructor(e10) {
      super("validation failed");
      this.errors = e10, this.ajv = this.validation = true;
    }
  }
  SH.default = yH;
});
var rp = X(function(bH) {
  Object.defineProperty(bH, "__esModule", { value: true });
  var Nl2 = tp();
  class EH extends Error {
    constructor(e10, t, n, r) {
      super(r || `can't resolve reference ${n} from id ${t}`);
      this.missingRef = Nl2.resolveUrl(e10, t, n), this.missingSchema = Nl2.normalizeId(Nl2.getFullPath(e10, this.missingRef));
    }
  }
  bH.default = EH;
});
var fh = X(function(RH) {
  Object.defineProperty(RH, "__esModule", { value: true });
  RH.resolveSchema = RH.getCompilingSchema = RH.resolveRef = RH.compileSchema = RH.SchemaEnv = void 0;
  var Tt = Pe(), HDe = uh(), aa = qo(), wt = tp(), dh = ze(), CH = np();
  class op {
    constructor(e10) {
      var t;
      this.refs = {}, this.dynamicAnchors = {};
      let n;
      if (typeof e10.schema == "object") n = e10.schema;
      this.schema = e10.schema, this.schemaId = e10.schemaId, this.root = e10.root || this, this.baseId = (t = e10.baseId) !== null && t !== void 0 ? t : wt.normalizeId(n === null || n === void 0 ? void 0 : n[e10.schemaId || "$id"]), this.schemaPath = e10.schemaPath, this.localRefs = e10.localRefs, this.meta = e10.meta, this.$async = n === null || n === void 0 ? void 0 : n.$async, this.refs = {};
    }
  }
  RH.SchemaEnv = op;
  function VO(e10) {
    let t = AH.call(this, e10);
    if (t) return t;
    let n = wt.getFullPath(this.opts.uriResolver, e10.root.baseId), { es5: r, lines: o } = this.opts.code, { ownProperties: s } = this.opts, i = new Tt.CodeGen(this.scope, { es5: r, lines: o, ownProperties: s }), a;
    if (e10.$async) a = i.scopeValue("Error", { ref: HDe.default, code: Tt._`require("ajv/dist/runtime/validation_error").default` });
    let l = i.scopeName("validate");
    e10.validateName = l;
    let c = { gen: i, allErrors: this.opts.allErrors, data: aa.default.data, parentData: aa.default.parentData, parentDataProperty: aa.default.parentDataProperty, dataNames: [aa.default.data], dataPathArr: [Tt.nil], dataLevel: 0, dataTypes: [], definedProperties: /* @__PURE__ */ new Set(), topSchemaRef: i.scopeValue("schema", this.opts.code.source === true ? { ref: e10.schema, code: Tt.stringify(e10.schema) } : { ref: e10.schema }), validateName: l, ValidationError: a, schema: e10.schema, schemaEnv: e10, rootId: n, baseId: e10.baseId || n, schemaPath: Tt.nil, errSchemaPath: e10.schemaPath || (this.opts.jtd ? "" : "#"), errorPath: Tt._`""`, opts: this.opts, self: this }, d;
    try {
      this._compilations.add(e10), CH.validateFunctionCode(c), i.optimize(this.opts.code.optimize);
      let p = i.toString();
      if (d = `${i.scopeRefs(aa.default.scope)}return ${p}`, this.opts.code.process) d = this.opts.code.process(d, e10);
      let m = Function(`${aa.default.self}`, `${aa.default.scope}`, d)(this, this.scope.get());
      if (this.scope.value(l, { ref: m }), m.errors = null, m.schema = e10.schema, m.schemaEnv = e10, e10.$async) m.$async = true;
      if (this.opts.code.source === true) m.source = { validateName: l, validateCode: p, scopeValues: i._values };
      if (this.opts.unevaluated) {
        let { props: g, items: _ } = c;
        if (m.evaluated = { props: g instanceof Tt.Name ? void 0 : g, items: _ instanceof Tt.Name ? void 0 : _, dynamicProps: g instanceof Tt.Name, dynamicItems: _ instanceof Tt.Name }, m.source) m.source.evaluated = Tt.stringify(m.evaluated);
      }
      return e10.validate = m, e10;
    } catch (p) {
      if (delete e10.validate, delete e10.validateName, d) this.logger.error("Error compiling schema, function code:", d);
      throw p;
    } finally {
      this._compilations.delete(e10);
    }
  }
  RH.compileSchema = VO;
  function jDe(e10, t, n) {
    var r;
    n = wt.resolveUrl(this.opts.uriResolver, t, n);
    let o = e10.refs[n];
    if (o) return o;
    let s = GDe.call(this, e10, n);
    if (s === void 0) {
      let i = (r = e10.localRefs) === null || r === void 0 ? void 0 : r[n], { schemaId: a } = this.opts;
      if (i) s = new op({ schema: i, schemaId: a, root: e10, baseId: t });
    }
    if (s === void 0) return;
    return e10.refs[n] = BDe.call(this, s);
  }
  RH.resolveRef = jDe;
  function BDe(e10) {
    if (wt.inlineRef(e10.schema, this.opts.inlineRefs)) return e10.schema;
    return e10.validate ? e10 : VO.call(this, e10);
  }
  function AH(e10) {
    for (let t of this._compilations) if (KDe(t, e10)) return t;
  }
  RH.getCompilingSchema = AH;
  function KDe(e10, t) {
    return e10.schema === t.schema && e10.root === t.root && e10.baseId === t.baseId;
  }
  function GDe(e10, t) {
    let n;
    while (typeof (n = this.refs[t]) == "string") t = n;
    return n || this.schemas[t] || ph.call(this, e10, t);
  }
  function ph(e10, t) {
    let n = this.opts.uriResolver.parse(t), r = wt._getFullPath(this.opts.uriResolver, n), o = wt.getFullPath(this.opts.uriResolver, e10.baseId, void 0);
    if (Object.keys(e10.schema).length > 0 && r === o) return WO.call(this, n, e10);
    let s = wt.normalizeId(r), i = this.refs[s] || this.schemas[s];
    if (typeof i == "string") {
      let a = ph.call(this, e10, i);
      if (typeof (a === null || a === void 0 ? void 0 : a.schema) !== "object") return;
      return WO.call(this, n, a);
    }
    if (typeof (i === null || i === void 0 ? void 0 : i.schema) !== "object") return;
    if (!i.validate) VO.call(this, i);
    if (s === wt.normalizeId(t)) {
      let { schema: a } = i, { schemaId: l } = this.opts, c = a[l];
      if (c) o = wt.resolveUrl(this.opts.uriResolver, o, c);
      return new op({ schema: a, schemaId: l, root: e10, baseId: o });
    }
    return WO.call(this, n, i);
  }
  RH.resolveSchema = ph;
  var WDe = /* @__PURE__ */ new Set(["properties", "patternProperties", "enum", "dependencies", "definitions"]);
  function WO(e10, { baseId: t, schema: n, root: r }) {
    var o;
    if (((o = e10.fragment) === null || o === void 0 ? void 0 : o[0]) !== "/") return;
    for (let a of e10.fragment.slice(1).split("/")) {
      if (typeof n === "boolean") return;
      let l = n[dh.unescapeFragment(a)];
      if (l === void 0) return;
      n = l;
      let c = typeof n === "object" && n[this.opts.schemaId];
      if (!WDe.has(a) && c) t = wt.resolveUrl(this.opts.uriResolver, t, c);
    }
    let s;
    if (typeof n != "boolean" && n.$ref && !dh.schemaHasRulesButRef(n, this.RULES)) {
      let a = wt.resolveUrl(this.opts.uriResolver, t, n.$ref);
      s = ph.call(this, r, a);
    }
    let { schemaId: i } = this.opts;
    if (s = s || new op({ schema: n, schemaId: i, root: r, baseId: t }), s.schema !== s.root.schema) return s;
    return;
  }
});
var TH = X(function(Omt, JDe) {
  JDe.exports = { $id: "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#", description: "Meta-schema for $data reference (JSON AnySchema extension proposal)", type: "object", required: ["$data"], properties: { $data: { type: "string", anyOf: [{ format: "relative-json-pointer" }, { format: "json-pointer" }] } }, additionalProperties: false };
});
var ZO = X(function(Tmt, IH) {
  var XDe = RegExp.prototype.test.bind(/^[\da-f]{8}-[\da-f]{4}-[\da-f]{4}-[\da-f]{4}-[\da-f]{12}$/iu), xH = RegExp.prototype.test.bind(/^(?:(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)$/u), qO = RegExp.prototype.test.bind(/^[\da-f]{2}$/iu), vH = RegExp.prototype.test.bind(/^[\da-z\-._~]$/iu), QDe = RegExp.prototype.test.bind(/^[\da-z\-._~!$&'()*+,;=:@/]$/iu);
  function YO(e10) {
    let t = "", n = 0, r = 0;
    for (r = 0; r < e10.length; r++) {
      if (n = e10[r].charCodeAt(0), n === 48) continue;
      if (!(n >= 48 && n <= 57 || n >= 65 && n <= 70 || n >= 97 && n <= 102)) return "";
      t += e10[r];
      break;
    }
    for (r += 1; r < e10.length; r++) {
      if (n = e10[r].charCodeAt(0), !(n >= 48 && n <= 57 || n >= 65 && n <= 70 || n >= 97 && n <= 102)) return "";
      t += e10[r];
    }
    return t;
  }
  var eLe = RegExp.prototype.test.bind(/[^!"$&'()*+,\-.;=_`a-z{}~]/u);
  function wH(e10) {
    return e10.length = 0, true;
  }
  function tLe(e10, t, n) {
    if (e10.length) {
      let r = YO(e10);
      if (r !== "") t.push(r);
      else return n.error = true, false;
      e10.length = 0;
    }
    return true;
  }
  function nLe(e10) {
    let t = 0, n = { error: false, address: "", zone: "" }, r = [], o = [], s = false, i = false, a = tLe;
    for (let l = 0; l < e10.length; l++) {
      let c = e10[l];
      if (c === "[" || c === "]") continue;
      if (c === ":") {
        if (s === true) i = true;
        if (!a(o, r, n)) break;
        if (++t > 7) {
          n.error = true;
          break;
        }
        if (l > 0 && e10[l - 1] === ":") s = true;
        r.push(":");
        continue;
      } else if (c === "%") {
        if (!a(o, r, n)) break;
        a = wH;
      } else {
        o.push(c);
        continue;
      }
    }
    if (o.length) if (a === wH) n.zone = o.join("");
    else if (i) r.push(o.join(""));
    else r.push(YO(o));
    return n.address = r.join(""), n;
  }
  function kH(e10) {
    if (rLe(e10, ":") < 2) return { host: e10, isIPV6: false };
    let t = nLe(e10);
    if (!t.error) {
      let { address: n, address: r } = t;
      if (t.zone) n += "%" + t.zone, r += "%25" + t.zone;
      return { host: n, isIPV6: true, escapedHost: r };
    } else return { host: e10, isIPV6: false };
  }
  function rLe(e10, t) {
    let n = 0;
    for (let r = 0; r < e10.length; r++) if (e10[r] === t) n++;
    return n;
  }
  function oLe(e10) {
    let t = e10, n = [], r = -1, o = 0;
    while (o = t.length) {
      if (o === 1) if (t === ".") break;
      else if (t === "/") {
        n.push("/");
        break;
      } else {
        n.push(t);
        break;
      }
      else if (o === 2) {
        if (t[0] === ".") {
          if (t[1] === ".") break;
          else if (t[1] === "/") {
            t = t.slice(2);
            continue;
          }
        } else if (t[0] === "/") {
          if (t[1] === "." || t[1] === "/") {
            n.push("/");
            break;
          }
        }
      } else if (o === 3) {
        if (t === "/..") {
          if (n.length !== 0) n.pop();
          n.push("/");
          break;
        }
      }
      if (t[0] === ".") {
        if (t[1] === ".") {
          if (t[2] === "/") {
            t = t.slice(3);
            continue;
          }
        } else if (t[1] === "/") {
          t = t.slice(2);
          continue;
        }
      } else if (t[0] === "/") {
        if (t[1] === ".") {
          if (t[2] === "/") {
            t = t.slice(2);
            continue;
          } else if (t[2] === ".") {
            if (t[3] === "/") {
              if (t = t.slice(3), n.length !== 0) n.pop();
              continue;
            }
          }
        }
      }
      if ((r = t.indexOf("/", 1)) === -1) {
        n.push(t);
        break;
      } else n.push(t.slice(0, r)), t = t.slice(r);
    }
    return n.join("");
  }
  var sLe = { "@": "%40", "/": "%2F", "?": "%3F", "#": "%23", ":": "%3A" }, iLe = /[@/?#:]/g, aLe = /[@/?#]/g;
  function PH(e10, t) {
    let n = t ? aLe : iLe;
    return n.lastIndex = 0, e10.replace(n, (r) => sLe[r]);
  }
  function lLe(e10, t = false) {
    if (e10.indexOf("%") === -1) return e10;
    let n = "";
    for (let r = 0; r < e10.length; r++) {
      if (e10[r] === "%" && r + 2 < e10.length) {
        let o = e10.slice(r + 1, r + 3);
        if (qO(o)) {
          let s = o.toUpperCase(), i = String.fromCharCode(parseInt(s, 16));
          if (t && vH(i)) n += i;
          else n += "%" + s;
          r += 2;
          continue;
        }
      }
      n += e10[r];
    }
    return n;
  }
  function cLe(e10) {
    let t = "";
    for (let n = 0; n < e10.length; n++) {
      if (e10[n] === "%" && n + 2 < e10.length) {
        let r = e10.slice(n + 1, n + 3);
        if (qO(r)) {
          let o = r.toUpperCase(), s = String.fromCharCode(parseInt(o, 16));
          if (s !== "." && vH(s)) t += s;
          else t += "%" + o;
          n += 2;
          continue;
        }
      }
      if (QDe(e10[n])) t += e10[n];
      else t += escape(e10[n]);
    }
    return t;
  }
  function uLe(e10) {
    let t = "";
    for (let n = 0; n < e10.length; n++) {
      if (e10[n] === "%" && n + 2 < e10.length) {
        let r = e10.slice(n + 1, n + 3);
        if (qO(r)) {
          t += "%" + r.toUpperCase(), n += 2;
          continue;
        }
      }
      t += escape(e10[n]);
    }
    return t;
  }
  function dLe(e10) {
    let t = [];
    if (e10.userinfo !== void 0) t.push(e10.userinfo), t.push("@");
    if (e10.host !== void 0) {
      let n = unescape(e10.host);
      if (!xH(n)) {
        let r = kH(n);
        if (r.isIPV6 === true) n = `[${r.escapedHost}]`;
        else n = PH(n, false);
      }
      t.push(n);
    }
    if (typeof e10.port === "number" || typeof e10.port === "string") t.push(":"), t.push(String(e10.port));
    return t.length ? t.join("") : void 0;
  }
  IH.exports = { nonSimpleDomain: eLe, recomposeAuthority: dLe, reescapeHostDelimiters: PH, normalizePercentEncoding: lLe, normalizePathEncoding: cLe, escapePreservingEscapes: uLe, removeDotSegments: oLe, isIPv4: xH, isUUID: XDe, normalizeIPv6: kH, stringArrayToHexStripped: YO };
});
var UH = X(function(wmt, NH) {
  var { isUUID: pLe } = ZO(), fLe = /([\da-z][\d\-a-z]{0,31}):((?:[\w!$'()*+,\-.:;=@]|%[\da-f]{2})+)/iu, mLe = ["http", "https", "ws", "wss", "urn", "urn:uuid"];
  function gLe(e10) {
    return mLe.indexOf(e10) !== -1;
  }
  function JO(e10) {
    if (e10.secure === true) return true;
    else if (e10.secure === false) return false;
    else if (e10.scheme) return e10.scheme.length === 3 && (e10.scheme[0] === "w" || e10.scheme[0] === "W") && (e10.scheme[1] === "s" || e10.scheme[1] === "S") && (e10.scheme[2] === "s" || e10.scheme[2] === "S");
    else return false;
  }
  function DH(e10) {
    if (!e10.host) e10.error = e10.error || "HTTP URIs must have a host.";
    return e10;
  }
  function LH(e10) {
    let t = String(e10.scheme).toLowerCase() === "https";
    if (e10.port === (t ? 443 : 80) || e10.port === "") e10.port = void 0;
    if (!e10.path) e10.path = "/";
    return e10;
  }
  function hLe(e10) {
    return e10.secure = JO(e10), e10.resourceName = (e10.path || "/") + (e10.query ? "?" + e10.query : ""), e10.path = void 0, e10.query = void 0, e10;
  }
  function _Le(e10) {
    if (e10.port === (JO(e10) ? 443 : 80) || e10.port === "") e10.port = void 0;
    if (typeof e10.secure === "boolean") e10.scheme = e10.secure ? "wss" : "ws", e10.secure = void 0;
    if (e10.resourceName) {
      let [t, n] = e10.resourceName.split("?");
      e10.path = t && t !== "/" ? t : void 0, e10.query = n, e10.resourceName = void 0;
    }
    return e10.fragment = void 0, e10;
  }
  function yLe(e10, t) {
    if (!e10.path) return e10.error = "URN can not be parsed", e10;
    let n = e10.path.match(fLe);
    if (n) {
      let r = t.scheme || e10.scheme || "urn";
      e10.nid = n[1].toLowerCase(), e10.nss = n[2];
      let o = `${r}:${t.nid || e10.nid}`, s = XO(o);
      if (e10.path = void 0, s) e10 = s.parse(e10, t);
    } else e10.error = e10.error || "URN can not be parsed.";
    return e10;
  }
  function SLe(e10, t) {
    if (e10.nid === void 0) throw Error("URN without nid cannot be serialized");
    let n = t.scheme || e10.scheme || "urn", r = e10.nid.toLowerCase(), o = `${n}:${t.nid || r}`, s = XO(o);
    if (s) e10 = s.serialize(e10, t);
    let i = e10, a = e10.nss;
    return i.path = `${r || t.nid}:${a}`, t.skipEscape = true, i;
  }
  function ELe(e10, t) {
    let n = e10;
    if (n.uuid = n.nss, n.nss = void 0, !t.tolerant && (!n.uuid || !pLe(n.uuid))) n.error = n.error || "UUID is not valid.";
    return n;
  }
  function bLe(e10) {
    let t = e10;
    return t.nss = (e10.uuid || "").toLowerCase(), t;
  }
  var MH = { scheme: "http", domainHost: true, parse: DH, serialize: LH }, CLe = { scheme: "https", domainHost: MH.domainHost, parse: DH, serialize: LH }, mh = { scheme: "ws", domainHost: true, parse: hLe, serialize: _Le }, ALe = { scheme: "wss", domainHost: mh.domainHost, parse: mh.parse, serialize: mh.serialize }, RLe = { scheme: "urn", parse: yLe, serialize: SLe, skipNormalize: true }, OLe = { scheme: "urn:uuid", parse: ELe, serialize: bLe, skipNormalize: true }, gh = { http: MH, https: CLe, ws: mh, wss: ALe, urn: RLe, "urn:uuid": OLe };
  Object.setPrototypeOf(gh, null);
  function XO(e10) {
    return e10 && (gh[e10] || gh[e10.toLowerCase()]) || void 0;
  }
  NH.exports = { wsIsSecure: JO, SCHEMES: gh, isValidSchemeName: gLe, getSchemeHandler: XO };
});
var BH = X(function(xmt, hh) {
  var { normalizeIPv6: TLe, removeDotSegments: sp, recomposeAuthority: wLe, normalizePercentEncoding: xLe, normalizePathEncoding: vLe, escapePreservingEscapes: kLe, reescapeHostDelimiters: PLe, isIPv4: ILe, nonSimpleDomain: DLe } = ZO(), { SCHEMES: LLe, getSchemeHandler: $H } = UH();
  function MLe(e10, t) {
    if (typeof e10 === "string") e10 = zLe(e10, t);
    else if (typeof e10 === "object") e10 = Ul(la(e10, t), t);
    return e10;
  }
  function NLe(e10, t, n) {
    let r = n ? Object.assign({ scheme: "null" }, n) : { scheme: "null" }, o = zH(Ul(e10, r), Ul(t, r), r, true);
    return r.skipEscape = true, la(o, r);
  }
  function zH(e10, t, n, r) {
    let o = {};
    if (!r) e10 = Ul(la(e10, n), n), t = Ul(la(t, n), n);
    if (n = n || {}, !n.tolerant && t.scheme) o.scheme = t.scheme, o.userinfo = t.userinfo, o.host = t.host, o.port = t.port, o.path = sp(t.path || ""), o.query = t.query;
    else {
      if (t.userinfo !== void 0 || t.host !== void 0 || t.port !== void 0) o.userinfo = t.userinfo, o.host = t.host, o.port = t.port, o.path = sp(t.path || ""), o.query = t.query;
      else {
        if (!t.path) if (o.path = e10.path, t.query !== void 0) o.query = t.query;
        else o.query = e10.query;
        else {
          if (t.path[0] === "/") o.path = sp(t.path);
          else {
            if ((e10.userinfo !== void 0 || e10.host !== void 0 || e10.port !== void 0) && !e10.path) o.path = "/" + t.path;
            else if (!e10.path) o.path = t.path;
            else o.path = e10.path.slice(0, e10.path.lastIndexOf("/") + 1) + t.path;
            o.path = sp(o.path);
          }
          o.query = t.query;
        }
        o.userinfo = e10.userinfo, o.host = e10.host, o.port = e10.port;
      }
      o.scheme = e10.scheme;
    }
    return o.fragment = t.fragment, o;
  }
  function ULe(e10, t, n) {
    let r = FH(e10, n), o = FH(t, n);
    return r !== void 0 && o !== void 0 && r.toLowerCase() === o.toLowerCase();
  }
  function la(e10, t) {
    let n = { host: e10.host, scheme: e10.scheme, userinfo: e10.userinfo, port: e10.port, path: e10.path, query: e10.query, nid: e10.nid, nss: e10.nss, uuid: e10.uuid, fragment: e10.fragment, reference: e10.reference, resourceName: e10.resourceName, secure: e10.secure, error: "" }, r = Object.assign({}, t), o = [], s = $H(r.scheme || n.scheme);
    if (s && s.serialize) s.serialize(n, r);
    if (n.path !== void 0) if (!r.skipEscape) {
      if (n.path = kLe(n.path), n.scheme !== void 0) n.path = n.path.split("%3A").join(":");
    } else n.path = xLe(n.path);
    if (r.reference !== "suffix" && n.scheme) o.push(n.scheme, ":");
    let i = wLe(n);
    if (i !== void 0) {
      if (r.reference !== "suffix") o.push("//");
      if (o.push(i), n.path && n.path[0] !== "/") o.push("/");
    }
    if (n.path !== void 0) {
      let a = n.path;
      if (!r.absolutePath && (!s || !s.absolutePath)) a = sp(a);
      if (i === void 0 && a[0] === "/" && a[1] === "/") a = "/%2F" + a.slice(2);
      o.push(a);
    }
    if (n.query !== void 0) o.push("?", n.query);
    if (n.fragment !== void 0) o.push("#", n.fragment);
    return o.join("");
  }
  var FLe = /^(?:([^#/:?]+):)?(?:\/\/((?:([^#/?@]*)@)?(\[[^#/?\]]+\]|[^#/:?]*)(?::(\d*))?))?([^#?]*)(?:\?([^#]*))?(?:#((?:.|[\n\r])*))?/u;
  function $Le(e10, t) {
    if (t[2] !== void 0 && e10.path && e10.path[0] !== "/") return 'URI path must start with "/" when authority is present.';
    if (typeof e10.port === "number" && (e10.port < 0 || e10.port > 65535)) return "URI port is malformed.";
    return;
  }
  function HH(e10, t) {
    let n = Object.assign({}, t), r = { scheme: void 0, userinfo: void 0, host: "", port: void 0, path: "", query: void 0, fragment: void 0 }, o = false, s = false;
    if (n.reference === "suffix") if (n.scheme) e10 = n.scheme + ":" + e10;
    else e10 = "//" + e10;
    let i = e10.match(FLe);
    if (i) {
      if (r.scheme = i[1], r.userinfo = i[3], r.host = i[4], r.port = parseInt(i[5], 10), r.path = i[6] || "", r.query = i[7], r.fragment = i[8], isNaN(r.port)) r.port = i[5];
      let a = $Le(r, i);
      if (a !== void 0) r.error = r.error || a, o = true;
      if (r.host) if (ILe(r.host) === false) {
        let d = TLe(r.host);
        r.host = d.host.toLowerCase(), s = d.isIPV6;
      } else s = true;
      if (r.scheme === void 0 && r.userinfo === void 0 && r.host === void 0 && r.port === void 0 && r.query === void 0 && !r.path) r.reference = "same-document";
      else if (r.scheme === void 0) r.reference = "relative";
      else if (r.fragment === void 0) r.reference = "absolute";
      else r.reference = "uri";
      if (n.reference && n.reference !== "suffix" && n.reference !== r.reference) r.error = r.error || "URI is not a " + n.reference + " reference.";
      let l = $H(n.scheme || r.scheme);
      if (!n.unicodeSupport && (!l || !l.unicodeSupport)) {
        if (r.host && (n.domainHost || l && l.domainHost) && s === false && DLe(r.host)) try {
          r.host = URL.domainToASCII(r.host.toLowerCase());
        } catch (c) {
          r.error = r.error || "Host's domain name can not be converted to ASCII: " + c;
        }
      }
      if (!l || l && !l.skipNormalize) {
        if (e10.indexOf("%") !== -1) {
          if (r.scheme !== void 0) r.scheme = unescape(r.scheme);
          if (r.host !== void 0) r.host = PLe(unescape(r.host), s);
        }
        if (r.path) r.path = vLe(r.path);
        if (r.fragment) try {
          r.fragment = encodeURI(decodeURIComponent(r.fragment));
        } catch {
          r.error = r.error || "URI malformed";
        }
      }
      if (l && l.parse) l.parse(r, n);
    } else r.error = r.error || "URI can not be parsed.";
    return { parsed: r, malformedAuthorityOrPort: o };
  }
  function Ul(e10, t) {
    return HH(e10, t).parsed;
  }
  function zLe(e10, t) {
    return jH(e10, t).normalized;
  }
  function jH(e10, t) {
    let { parsed: n, malformedAuthorityOrPort: r } = HH(e10, t);
    return { normalized: r ? e10 : la(n, t), malformedAuthorityOrPort: r };
  }
  function FH(e10, t) {
    if (typeof e10 === "string") {
      let { normalized: n, malformedAuthorityOrPort: r } = jH(e10, t);
      return r ? void 0 : n;
    }
    if (typeof e10 === "object") return la(e10, t);
  }
  var QO = { SCHEMES: LLe, normalize: MLe, resolve: NLe, resolveComponent: zH, equal: ULe, serialize: la, parse: Ul };
  hh.exports = QO;
  hh.exports.default = QO;
  hh.exports.fastUri = QO;
});
var WH = X(function(GH) {
  Object.defineProperty(GH, "__esModule", { value: true });
  var KH = BH();
  KH.code = 'require("ajv/dist/runtime/uri").default';
  GH.default = KH;
});
var nj = X(function(Yo) {
  Object.defineProperty(Yo, "__esModule", { value: true });
  Yo.CodeGen = Yo.Name = Yo.nil = Yo.stringify = Yo.str = Yo._ = Yo.KeywordCxt = void 0;
  var jLe = np();
  Object.defineProperty(Yo, "KeywordCxt", { enumerable: true, get: function() {
    return jLe.KeywordCxt;
  } });
  var $l = Pe();
  Object.defineProperty(Yo, "_", { enumerable: true, get: function() {
    return $l._;
  } });
  Object.defineProperty(Yo, "str", { enumerable: true, get: function() {
    return $l.str;
  } });
  Object.defineProperty(Yo, "stringify", { enumerable: true, get: function() {
    return $l.stringify;
  } });
  Object.defineProperty(Yo, "nil", { enumerable: true, get: function() {
    return $l.nil;
  } });
  Object.defineProperty(Yo, "Name", { enumerable: true, get: function() {
    return $l.Name;
  } });
  Object.defineProperty(Yo, "CodeGen", { enumerable: true, get: function() {
    return $l.CodeGen;
  } });
  var BLe = uh(), JH = rp(), XH = MO(), ro = fh(), QH = Pe(), oo = tp(), qs = ep(), Fl = ze(), VH = TH(), KLe = WH(), ej = (e10, t) => new RegExp(e10, t);
  ej.code = "new RegExp";
  var GLe = ["removeAdditional", "useDefaults", "coerceTypes"], WLe = /* @__PURE__ */ new Set(["validate", "serialize", "parse", "wrapper", "root", "schema", "keyword", "pattern", "formats", "validate$data", "func", "obj", "Error"]), VLe = { errorDataPath: "", format: "`validateFormats: false` can be used instead.", nullable: '"nullable" keyword is supported by default.', jsonPointers: "Deprecated jsPropertySyntax can be used instead.", extendRefs: "Deprecated ignoreKeywordsWithRef can be used instead.", missingRefs: "Pass empty schema with $id that should be ignored to ajv.addSchema.", processCode: "Use option `code: {process: (code, schemaEnv: object) => string}`", sourceCode: "Use option `code: {source: true}`", strictDefaults: "It is default now, see option `strict`.", strictKeywords: "It is default now, see option `strict`.", uniqueItems: '"uniqueItems" keyword is always validated.', unknownFormats: "Disable strict mode or pass `true` to `ajv.addFormat` (or `formats` option).", cache: "Map is used as cache, schema object as key.", serialize: "Map is used as cache, schema object as key.", ajvErrors: "It is default now." }, qLe = { ignoreKeywordsWithRef: "", jsPropertySyntax: "", unicode: '"minLength"/"maxLength" account for unicode characters by default.' }, qH = 200;
  function YLe(e10) {
    var t, n, r, o, s, i, a, l, c, d, p, f, m, g, _, y, S, E, b, C, A, T, D, U, F;
    let pe = e10.strict, w = (t = e10.code) === null || t === void 0 ? void 0 : t.optimize, R = w === true || w === void 0 ? 1 : w || 0, v = (r = (n = e10.code) === null || n === void 0 ? void 0 : n.regExp) !== null && r !== void 0 ? r : ej, L = (o = e10.uriResolver) !== null && o !== void 0 ? o : KLe.default;
    return { strictSchema: (i = (s = e10.strictSchema) !== null && s !== void 0 ? s : pe) !== null && i !== void 0 ? i : true, strictNumbers: (l = (a = e10.strictNumbers) !== null && a !== void 0 ? a : pe) !== null && l !== void 0 ? l : true, strictTypes: (d = (c = e10.strictTypes) !== null && c !== void 0 ? c : pe) !== null && d !== void 0 ? d : "log", strictTuples: (f = (p = e10.strictTuples) !== null && p !== void 0 ? p : pe) !== null && f !== void 0 ? f : "log", strictRequired: (g = (m = e10.strictRequired) !== null && m !== void 0 ? m : pe) !== null && g !== void 0 ? g : false, code: e10.code ? { ...e10.code, optimize: R, regExp: v } : { optimize: R, regExp: v }, loopRequired: (_ = e10.loopRequired) !== null && _ !== void 0 ? _ : qH, loopEnum: (y = e10.loopEnum) !== null && y !== void 0 ? y : qH, meta: (S = e10.meta) !== null && S !== void 0 ? S : true, messages: (E = e10.messages) !== null && E !== void 0 ? E : true, inlineRefs: (b = e10.inlineRefs) !== null && b !== void 0 ? b : true, schemaId: (C = e10.schemaId) !== null && C !== void 0 ? C : "$id", addUsedSchema: (A = e10.addUsedSchema) !== null && A !== void 0 ? A : true, validateSchema: (T = e10.validateSchema) !== null && T !== void 0 ? T : true, validateFormats: (D = e10.validateFormats) !== null && D !== void 0 ? D : true, unicodeRegExp: (U = e10.unicodeRegExp) !== null && U !== void 0 ? U : true, int32range: (F = e10.int32range) !== null && F !== void 0 ? F : true, uriResolver: L };
  }
  class _h {
    constructor(e10 = {}) {
      this.schemas = {}, this.refs = {}, this.formats = {}, this._compilations = /* @__PURE__ */ new Set(), this._loading = {}, this._cache = /* @__PURE__ */ new Map(), e10 = this.opts = { ...e10, ...YLe(e10) };
      let { es5: t, lines: n } = this.opts.code;
      this.scope = new QH.ValueScope({ scope: {}, prefixes: WLe, es5: t, lines: n }), this.logger = tMe(e10.logger);
      let r = e10.validateFormats;
      if (e10.validateFormats = false, this.RULES = XH.getRules(), YH.call(this, VLe, e10, "NOT SUPPORTED"), YH.call(this, qLe, e10, "DEPRECATED", "warn"), this._metaOpts = QLe.call(this), e10.formats) JLe.call(this);
      if (this._addVocabularies(), this._addDefaultMetaSchema(), e10.keywords) XLe.call(this, e10.keywords);
      if (typeof e10.meta == "object") this.addMetaSchema(e10.meta);
      ZLe.call(this), e10.validateFormats = r;
    }
    _addVocabularies() {
      this.addKeyword("$async");
    }
    _addDefaultMetaSchema() {
      let { $data: e10, meta: t, schemaId: n } = this.opts, r = VH;
      if (n === "id") r = { ...VH }, r.id = r.$id, delete r.$id;
      if (t && e10) this.addMetaSchema(r, r[n], false);
    }
    defaultMeta() {
      let { meta: e10, schemaId: t } = this.opts;
      return this.opts.defaultMeta = typeof e10 == "object" ? e10[t] || e10 : void 0;
    }
    validate(e10, t) {
      let n;
      if (typeof e10 == "string") {
        if (n = this.getSchema(e10), !n) throw Error(`no schema with key or ref "${e10}"`);
      } else n = this.compile(e10);
      let r = n(t);
      if (!("$async" in n)) this.errors = n.errors;
      return r;
    }
    compile(e10, t) {
      let n = this._addSchema(e10, t);
      return n.validate || this._compileSchemaEnv(n);
    }
    compileAsync(e10, t) {
      if (typeof this.opts.loadSchema != "function") throw Error("options.loadSchema should be a function");
      let { loadSchema: n } = this.opts;
      return r.call(this, e10, t);
      async function r(c, d) {
        await o.call(this, c.$schema);
        let p = this._addSchema(c, d);
        return p.validate || s.call(this, p);
      }
      async function o(c) {
        if (c && !this.getSchema(c)) await r.call(this, { $ref: c }, true);
      }
      async function s(c) {
        try {
          return this._compileSchemaEnv(c);
        } catch (d) {
          if (!(d instanceof JH.default)) throw d;
          return i.call(this, d), await a.call(this, d.missingSchema), s.call(this, c);
        }
      }
      function i({ missingSchema: c, missingRef: d }) {
        if (this.refs[c]) throw Error(`AnySchema ${c} is loaded but ${d} cannot be resolved`);
      }
      async function a(c) {
        let d = await l.call(this, c);
        if (!this.refs[c]) await o.call(this, d.$schema);
        if (!this.refs[c]) this.addSchema(d, c, t);
      }
      async function l(c) {
        let d = this._loading[c];
        if (d) return d;
        try {
          return await (this._loading[c] = n(c));
        } finally {
          delete this._loading[c];
        }
      }
    }
    addSchema(e10, t, n, r = this.opts.validateSchema) {
      if (Array.isArray(e10)) {
        for (let s of e10) this.addSchema(s, void 0, n, r);
        return this;
      }
      let o;
      if (typeof e10 === "object") {
        let { schemaId: s } = this.opts;
        if (o = e10[s], o !== void 0 && typeof o != "string") throw Error(`schema ${s} must be string`);
      }
      return t = oo.normalizeId(t || o), this._checkUnique(t), this.schemas[t] = this._addSchema(e10, n, t, r, true), this;
    }
    addMetaSchema(e10, t, n = this.opts.validateSchema) {
      return this.addSchema(e10, t, true, n), this;
    }
    validateSchema(e10, t) {
      if (typeof e10 == "boolean") return true;
      let n;
      if (n = e10.$schema, n !== void 0 && typeof n != "string") throw Error("$schema must be a string");
      if (n = n || this.opts.defaultMeta || this.defaultMeta(), !n) return this.logger.warn("meta-schema not available"), this.errors = null, true;
      let r = this.validate(n, e10);
      if (!r && t) {
        let o = "schema is invalid: " + this.errorsText();
        if (this.opts.validateSchema === "log") this.logger.error(o);
        else throw Error(o);
      }
      return r;
    }
    getSchema(e10) {
      let t;
      while (typeof (t = ZH.call(this, e10)) == "string") e10 = t;
      if (t === void 0) {
        let { schemaId: n } = this.opts, r = new ro.SchemaEnv({ schema: {}, schemaId: n });
        if (t = ro.resolveSchema.call(this, r, e10), !t) return;
        this.refs[e10] = t;
      }
      return t.validate || this._compileSchemaEnv(t);
    }
    removeSchema(e10) {
      if (e10 instanceof RegExp) return this._removeAllSchemas(this.schemas, e10), this._removeAllSchemas(this.refs, e10), this;
      switch (typeof e10) {
        case "undefined":
          return this._removeAllSchemas(this.schemas), this._removeAllSchemas(this.refs), this._cache.clear(), this;
        case "string": {
          let t = ZH.call(this, e10);
          if (typeof t == "object") this._cache.delete(t.schema);
          return delete this.schemas[e10], delete this.refs[e10], this;
        }
        case "object": {
          let t = e10;
          this._cache.delete(t);
          let n = e10[this.opts.schemaId];
          if (n) n = oo.normalizeId(n), delete this.schemas[n], delete this.refs[n];
          return this;
        }
        default:
          throw Error("ajv.removeSchema: invalid parameter");
      }
    }
    addVocabulary(e10) {
      for (let t of e10) this.addKeyword(t);
      return this;
    }
    addKeyword(e10, t) {
      let n;
      if (typeof e10 == "string") {
        if (n = e10, typeof t == "object") this.logger.warn("these parameters are deprecated, see docs for addKeyword"), t.keyword = n;
      } else if (typeof e10 == "object" && t === void 0) {
        if (t = e10, n = t.keyword, Array.isArray(n) && !n.length) throw Error("addKeywords: keyword must be string or non-empty array");
      } else throw Error("invalid addKeywords parameters");
      if (rMe.call(this, n, t), !t) return Fl.eachItem(n, (o) => eT.call(this, o)), this;
      sMe.call(this, t);
      let r = { ...t, type: qs.getJSONTypes(t.type), schemaType: qs.getJSONTypes(t.schemaType) };
      return Fl.eachItem(n, r.type.length === 0 ? (o) => eT.call(this, o, r) : (o) => r.type.forEach((s) => eT.call(this, o, r, s))), this;
    }
    getKeyword(e10) {
      let t = this.RULES.all[e10];
      return typeof t == "object" ? t.definition : !!t;
    }
    removeKeyword(e10) {
      let { RULES: t } = this;
      delete t.keywords[e10], delete t.all[e10];
      for (let n of t.rules) {
        let r = n.rules.findIndex((o) => o.keyword === e10);
        if (r >= 0) n.rules.splice(r, 1);
      }
      return this;
    }
    addFormat(e10, t) {
      if (typeof t == "string") t = new RegExp(t);
      return this.formats[e10] = t, this;
    }
    errorsText(e10 = this.errors, { separator: t = ", ", dataVar: n = "data" } = {}) {
      if (!e10 || e10.length === 0) return "No errors";
      return e10.map((r) => `${n}${r.instancePath} ${r.message}`).reduce((r, o) => r + t + o);
    }
    $dataMetaSchema(e10, t) {
      let n = this.RULES.all;
      e10 = JSON.parse(JSON.stringify(e10));
      for (let r of t) {
        let o = r.split("/").slice(1), s = e10;
        for (let i of o) s = s[i];
        for (let i in n) {
          let a = n[i];
          if (typeof a != "object") continue;
          let { $data: l } = a.definition, c = s[i];
          if (l && c) s[i] = tj(c);
        }
      }
      return e10;
    }
    _removeAllSchemas(e10, t) {
      for (let n in e10) {
        let r = e10[n];
        if (!t || t.test(n)) {
          if (typeof r == "string") delete e10[n];
          else if (r && !r.meta) this._cache.delete(r.schema), delete e10[n];
        }
      }
    }
    _addSchema(e10, t, n, r = this.opts.validateSchema, o = this.opts.addUsedSchema) {
      let s, { schemaId: i } = this.opts;
      if (typeof e10 == "object") s = e10[i];
      else if (this.opts.jtd) throw Error("schema must be object");
      else if (typeof e10 != "boolean") throw Error("schema must be object or boolean");
      let a = this._cache.get(e10);
      if (a !== void 0) return a;
      n = oo.normalizeId(s || n);
      let l = oo.getSchemaRefs.call(this, e10, n);
      if (a = new ro.SchemaEnv({ schema: e10, schemaId: i, meta: t, baseId: n, localRefs: l }), this._cache.set(a.schema, a), o && !n.startsWith("#")) {
        if (n) this._checkUnique(n);
        this.refs[n] = a;
      }
      if (r) this.validateSchema(e10, true);
      return a;
    }
    _checkUnique(e10) {
      if (this.schemas[e10] || this.refs[e10]) throw Error(`schema with key or id "${e10}" already exists`);
    }
    _compileSchemaEnv(e10) {
      if (e10.meta) this._compileMetaSchema(e10);
      else ro.compileSchema.call(this, e10);
      if (!e10.validate) throw Error("ajv implementation error");
      return e10.validate;
    }
    _compileMetaSchema(e10) {
      let t = this.opts;
      this.opts = this._metaOpts;
      try {
        ro.compileSchema.call(this, e10);
      } finally {
        this.opts = t;
      }
    }
  }
  _h.ValidationError = BLe.default;
  _h.MissingRefError = JH.default;
  Yo.default = _h;
  function YH(e10, t, n, r = "error") {
    for (let o in e10) {
      let s = o;
      if (s in t) this.logger[r](`${n}: option ${o}. ${e10[s]}`);
    }
  }
  function ZH(e10) {
    return e10 = oo.normalizeId(e10), this.schemas[e10] || this.refs[e10];
  }
  function ZLe() {
    let e10 = this.opts.schemas;
    if (!e10) return;
    if (Array.isArray(e10)) this.addSchema(e10);
    else for (let t in e10) this.addSchema(e10[t], t);
  }
  function JLe() {
    for (let e10 in this.opts.formats) {
      let t = this.opts.formats[e10];
      if (t) this.addFormat(e10, t);
    }
  }
  function XLe(e10) {
    if (Array.isArray(e10)) {
      this.addVocabulary(e10);
      return;
    }
    this.logger.warn("keywords option as map is deprecated, pass array");
    for (let t in e10) {
      let n = e10[t];
      if (!n.keyword) n.keyword = t;
      this.addKeyword(n);
    }
  }
  function QLe() {
    let e10 = { ...this.opts };
    for (let t of GLe) delete e10[t];
    return e10;
  }
  var eMe = { log() {
  }, warn() {
  }, error() {
  } };
  function tMe(e10) {
    if (e10 === false) return eMe;
    if (e10 === void 0) return console;
    if (e10.log && e10.warn && e10.error) return e10;
    throw Error("logger must implement log, warn and error methods");
  }
  var nMe = /^[a-z_$][a-z0-9_$:-]*$/i;
  function rMe(e10, t) {
    let { RULES: n } = this;
    if (Fl.eachItem(e10, (r) => {
      if (n.keywords[r]) throw Error(`Keyword ${r} is already defined`);
      if (!nMe.test(r)) throw Error(`Keyword ${r} has invalid name`);
    }), !t) return;
    if (t.$data && !("code" in t || "validate" in t)) throw Error('$data keyword must have "code" or "validate" function');
  }
  function eT(e10, t, n) {
    var r;
    let o = t === null || t === void 0 ? void 0 : t.post;
    if (n && o) throw Error('keyword with "post" flag cannot have "type"');
    let { RULES: s } = this, i = o ? s.post : s.rules.find(({ type: l }) => l === n);
    if (!i) i = { type: n, rules: [] }, s.rules.push(i);
    if (s.keywords[e10] = true, !t) return;
    let a = { keyword: e10, definition: { ...t, type: qs.getJSONTypes(t.type), schemaType: qs.getJSONTypes(t.schemaType) } };
    if (t.before) oMe.call(this, i, a, t.before);
    else i.rules.push(a);
    s.all[e10] = a, (r = t.implements) === null || r === void 0 || r.forEach((l) => this.addKeyword(l));
  }
  function oMe(e10, t, n) {
    let r = e10.rules.findIndex((o) => o.keyword === n);
    if (r >= 0) e10.rules.splice(r, 0, t);
    else e10.rules.push(t), this.logger.warn(`rule ${n} is not defined`);
  }
  function sMe(e10) {
    let { metaSchema: t } = e10;
    if (t === void 0) return;
    if (e10.$data && this.opts.$data) t = tj(t);
    e10.validateSchema = this.compile(t, true);
  }
  var iMe = { $ref: "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#" };
  function tj(e10) {
    return { anyOf: [e10, iMe] };
  }
});
var oj = X(function(rj) {
  Object.defineProperty(rj, "__esModule", { value: true });
  var cMe = { keyword: "id", code() {
    throw Error('NOT SUPPORTED: keyword "id", use "$id" for schema ID');
  } };
  rj.default = cMe;
});
var lj = X(function(ij) {
  Object.defineProperty(ij, "__esModule", { value: true });
  ij.callRef = ij.getValidate = void 0;
  var dMe = rp(), Sh = hr(), tt = Pe(), zl = qo(), Eh = fh(), Ys = ze(), pMe = { keyword: "$ref", schemaType: "string", code(e10) {
    let { gen: t, schema: n, it: r } = e10, { baseId: o, schemaEnv: s, validateName: i, opts: a, self: l } = r, { root: c } = s;
    if ((n === "#" || n === "#/") && o === c.baseId) return p();
    let d = Eh.resolveRef.call(l, c, o, n);
    if (d === void 0) throw new dMe.default(r.opts.uriResolver, o, n);
    if (d instanceof Eh.SchemaEnv) return f(d);
    return m(d);
    function p() {
      if (s === c) return yh(e10, i, s, s.$async);
      let g = t.scopeValue("root", { ref: c });
      return yh(e10, tt._`${g}.validate`, c, c.$async);
    }
    function f(g) {
      let _ = sj(e10, g);
      yh(e10, _, g, g.$async);
    }
    function m(g) {
      let _ = t.scopeValue("schema", a.code.source === true ? { ref: g, code: tt.stringify(g) } : { ref: g }), y = t.name("valid"), S = e10.subschema({ schema: g, dataTypes: [], schemaPath: tt.nil, topSchemaRef: _, errSchemaPath: n }, y);
      e10.mergeEvaluated(S), e10.ok(y);
    }
  } };
  function sj(e10, t) {
    let { gen: n } = e10;
    return t.validate ? n.scopeValue("validate", { ref: t.validate }) : tt._`${n.scopeValue("wrapper", { ref: t })}.validate`;
  }
  ij.getValidate = sj;
  function yh(e10, t, n, r) {
    let { gen: o, it: s } = e10, { allErrors: i, schemaEnv: a, opts: l } = s, c = l.passContext ? zl.default.this : tt.nil;
    if (r) d();
    else p();
    function d() {
      if (!a.$async) throw Error("async schema referenced by sync schema");
      let g = o.let("valid");
      o.try(() => {
        if (o.code(tt._`await ${Sh.callValidateCode(e10, t, c)}`), m(t), !i) o.assign(g, true);
      }, (_) => {
        if (o.if(tt._`!(${_} instanceof ${s.ValidationError})`, () => o.throw(_)), f(_), !i) o.assign(g, false);
      }), e10.ok(g);
    }
    function p() {
      e10.result(Sh.callValidateCode(e10, t, c), () => m(t), () => f(t));
    }
    function f(g) {
      let _ = tt._`${g}.errors`;
      o.assign(zl.default.vErrors, tt._`${zl.default.vErrors} === null ? ${_} : ${zl.default.vErrors}.concat(${_})`), o.assign(zl.default.errors, tt._`${zl.default.vErrors}.length`);
    }
    function m(g) {
      var _;
      if (!s.opts.unevaluated) return;
      let y = (_ = n === null || n === void 0 ? void 0 : n.validate) === null || _ === void 0 ? void 0 : _.evaluated;
      if (s.props !== true) if (y && !y.dynamicProps) {
        if (y.props !== void 0) s.props = Ys.mergeEvaluated.props(o, y.props, s.props);
      } else {
        let S = o.var("props", tt._`${g}.evaluated.props`);
        s.props = Ys.mergeEvaluated.props(o, S, s.props, tt.Name);
      }
      if (s.items !== true) if (y && !y.dynamicItems) {
        if (y.items !== void 0) s.items = Ys.mergeEvaluated.items(o, y.items, s.items);
      } else {
        let S = o.var("items", tt._`${g}.evaluated.items`);
        s.items = Ys.mergeEvaluated.items(o, S, s.items, tt.Name);
      }
    }
  }
  ij.callRef = yh;
  ij.default = pMe;
});
var uj = X(function(cj) {
  Object.defineProperty(cj, "__esModule", { value: true });
  var gMe = oj(), hMe = lj(), _Me = ["$schema", "$id", "$defs", "$vocabulary", { keyword: "$comment" }, "definitions", gMe.default, hMe.default];
  cj.default = _Me;
});
var pj = X(function(dj) {
  Object.defineProperty(dj, "__esModule", { value: true });
  var Js = Pe(), Zs = Js.operators, bh = { maximum: { okStr: "<=", ok: Zs.LTE, fail: Zs.GT }, minimum: { okStr: ">=", ok: Zs.GTE, fail: Zs.LT }, exclusiveMaximum: { okStr: "<", ok: Zs.LT, fail: Zs.GTE }, exclusiveMinimum: { okStr: ">", ok: Zs.GT, fail: Zs.LTE } }, SMe = { message: ({ keyword: e10, schemaCode: t }) => Js.str`must be ${bh[e10].okStr} ${t}`, params: ({ keyword: e10, schemaCode: t }) => Js._`{comparison: ${bh[e10].okStr}, limit: ${t}}` }, EMe = { keyword: Object.keys(bh), type: "number", schemaType: "number", $data: true, error: SMe, code(e10) {
    let { keyword: t, data: n, schemaCode: r } = e10;
    e10.fail$data(Js._`${n} ${bh[t].fail} ${r} || isNaN(${n})`);
  } };
  dj.default = EMe;
});
var mj = X(function(fj) {
  Object.defineProperty(fj, "__esModule", { value: true });
  var so = Pe(), CMe = { message: ({ schemaCode: e10 }) => so.str`must be multiple of ${e10}`, params: ({ schemaCode: e10 }) => so._`{multipleOf: ${e10}}` }, AMe = { keyword: "multipleOf", type: "number", schemaType: "number", $data: true, error: CMe, code(e10) {
    let { gen: t, data: n, schemaCode: r, it: o } = e10, s = o.opts.multipleOfPrecision, i = t.let("res"), a = s ? so._`Math.abs(Math.round(${i}) - ${i}) > 1e-${s}` : so._`${i} !== parseInt(${i})`;
    e10.fail$data(so._`(${r} === 0 || (${i} = ${n}/${r}, ${a}))`);
  } };
  fj.default = AMe;
});
var _j = X(function(hj) {
  Object.defineProperty(hj, "__esModule", { value: true });
  function gj(e10) {
    let t = e10.length, n = 0, r = 0, o;
    while (r < t) if (n++, o = e10.charCodeAt(r++), o >= 55296 && o <= 56319 && r < t) {
      if (o = e10.charCodeAt(r), (o & 64512) === 56320) r++;
    }
    return n;
  }
  hj.default = gj;
  gj.code = 'require("ajv/dist/runtime/ucs2length").default';
});
var Ej = X(function(Sj) {
  Object.defineProperty(Sj, "__esModule", { value: true });
  var jn = Pe(), yj = ze(), TMe = _j(), wMe = { message({ keyword: e10, schemaCode: t }) {
    return jn.str`must NOT have ${e10 === "maxLength" ? "more" : "fewer"} than ${t} characters`;
  }, params: ({ schemaCode: e10 }) => jn._`{limit: ${e10}}` }, xMe = { keyword: ["maxLength", "minLength"], type: "string", schemaType: "number", $data: true, error: wMe, code(e10) {
    let { keyword: t, data: n, schemaCode: r, it: o } = e10, s = t === "maxLength" ? jn.operators.GT : jn.operators.LT, i = o.opts.unicode === false ? jn._`${n}.length` : jn._`${yj.useFunc(e10.gen, TMe.default)}(${n})`;
    e10.fail$data(jn._`${i} ${s} ${r}`);
  } };
  Sj.default = xMe;
});
var Rj = X(function(Aj) {
  Object.defineProperty(Aj, "__esModule", { value: true });
  var bj = hr(), Cj = ze(), _r = Pe(), kMe = { message: ({ schemaCode: e10 }) => _r.str`must match pattern "${e10}"`, params: ({ schemaCode: e10 }) => _r._`{pattern: ${e10}}` }, PMe = { keyword: "pattern", type: "string", schemaType: "string", $data: true, error: kMe, code(e10) {
    let { gen: t, data: n, $data: r, schema: o, schemaCode: s, it: i } = e10, a = i.opts.unicodeRegExp ? "u" : "";
    if (r) {
      let { regExp: l } = i.opts.code, c = l.code === "new RegExp" ? _r._`new RegExp` : Cj.useFunc(t, l), d = t.let("valid");
      t.try(() => t.assign(d, _r._`${c}(${s}, ${a}).test(${n})`), () => t.assign(d, false)), e10.fail$data(_r._`!${d}`);
    } else {
      let l = bj.usePattern(e10, o);
      e10.fail$data(_r._`!${l}.test(${n})`);
    }
  } };
  Aj.default = PMe;
});
var Tj = X(function(Oj) {
  Object.defineProperty(Oj, "__esModule", { value: true });
  var io = Pe(), DMe = { message({ keyword: e10, schemaCode: t }) {
    return io.str`must NOT have ${e10 === "maxProperties" ? "more" : "fewer"} than ${t} properties`;
  }, params: ({ schemaCode: e10 }) => io._`{limit: ${e10}}` }, LMe = { keyword: ["maxProperties", "minProperties"], type: "object", schemaType: "number", $data: true, error: DMe, code(e10) {
    let { keyword: t, data: n, schemaCode: r } = e10, o = t === "maxProperties" ? io.operators.GT : io.operators.LT;
    e10.fail$data(io._`Object.keys(${n}).length ${o} ${r}`);
  } };
  Oj.default = LMe;
});
var vj = X(function(xj) {
  Object.defineProperty(xj, "__esModule", { value: true });
  var ao = hr(), lo = Pe(), wj = ze(), NMe = { message: ({ params: { missingProperty: e10 } }) => lo.str`must have required property '${e10}'`, params: ({ params: { missingProperty: e10 } }) => lo._`{missingProperty: ${e10}}` }, UMe = { keyword: "required", type: "object", schemaType: "array", $data: true, error: NMe, code(e10) {
    let { gen: t, schema: n, schemaCode: r, data: o, $data: s, it: i } = e10, { opts: a } = i;
    if (!s && n.length === 0) return;
    let l = n.length >= a.loopRequired;
    if (i.allErrors) c();
    else d();
    if (a.strictRequired) {
      let m = e10.parentSchema.properties, { definedProperties: g } = e10.it;
      for (let _ of n) if ((m === null || m === void 0 ? void 0 : m[_]) === void 0 && !g.has(_)) {
        let y = i.schemaEnv.baseId + i.errSchemaPath, S = `required property "${_}" is not defined at "${y}" (strictRequired)`;
        wj.checkStrictMode(i, S, i.opts.strictRequired);
      }
    }
    function c() {
      if (l || s) e10.block$data(lo.nil, p);
      else for (let m of n) ao.checkReportMissingProp(e10, m);
    }
    function d() {
      let m = t.let("missing");
      if (l || s) {
        let g = t.let("valid", true);
        e10.block$data(g, () => f(m, g)), e10.ok(g);
      } else t.if(ao.checkMissingProp(e10, n, m)), ao.reportMissingProp(e10, m), t.else();
    }
    function p() {
      t.forOf("prop", r, (m) => {
        e10.setParams({ missingProperty: m }), t.if(ao.noPropertyInData(t, o, m, a.ownProperties), () => e10.error());
      });
    }
    function f(m, g) {
      e10.setParams({ missingProperty: m }), t.forOf(m, r, () => {
        t.assign(g, ao.propertyInData(t, o, m, a.ownProperties)), t.if(lo.not(g), () => {
          e10.error(), t.break();
        });
      }, lo.nil);
    }
  } };
  xj.default = UMe;
});
var Pj = X(function(kj) {
  Object.defineProperty(kj, "__esModule", { value: true });
  var co = Pe(), $Me = { message({ keyword: e10, schemaCode: t }) {
    return co.str`must NOT have ${e10 === "maxItems" ? "more" : "fewer"} than ${t} items`;
  }, params: ({ schemaCode: e10 }) => co._`{limit: ${e10}}` }, zMe = { keyword: ["maxItems", "minItems"], type: "array", schemaType: "number", $data: true, error: $Me, code(e10) {
    let { keyword: t, data: n, schemaCode: r } = e10, o = t === "maxItems" ? co.operators.GT : co.operators.LT;
    e10.fail$data(co._`${n}.length ${o} ${r}`);
  } };
  kj.default = zMe;
});
var Ch = X(function(Dj) {
  Object.defineProperty(Dj, "__esModule", { value: true });
  var Ij = jO();
  Ij.code = 'require("ajv/dist/runtime/equal").default';
  Dj.default = Ij;
});
var Nj = X(function(Mj) {
  Object.defineProperty(Mj, "__esModule", { value: true });
  var Hl = ep(), He = Pe(), Lj = ze(), BMe = Ch(), KMe = { message: ({ params: { i: e10, j: t } }) => He.str`must NOT have duplicate items (items ## ${t} and ${e10} are identical)`, params: ({ params: { i: e10, j: t } }) => He._`{i: ${e10}, j: ${t}}` }, GMe = { keyword: "uniqueItems", type: "array", schemaType: "boolean", $data: true, error: KMe, code(e10) {
    let { gen: t, data: n, $data: r, schema: o, parentSchema: s, schemaCode: i, it: a } = e10;
    if (!r && !o) return;
    let l = t.let("valid"), c = s.items ? Hl.getSchemaTypes(s.items) : [];
    e10.block$data(l, d, He._`${i} === false`), e10.ok(l);
    function d() {
      let g = t.let("i", He._`${n}.length`), _ = t.let("j");
      e10.setParams({ i: g, j: _ }), t.assign(l, true), t.if(He._`${g} > 1`, () => (p() ? f : m)(g, _));
    }
    function p() {
      return c.length > 0 && !c.some((g) => g === "object" || g === "array");
    }
    function f(g, _) {
      let y = t.name("item"), S = Hl.checkDataTypes(c, y, a.opts.strictNumbers, Hl.DataType.Wrong), E = t.const("indices", He._`{}`);
      t.for(He._`;${g}--;`, () => {
        if (t.let(y, He._`${n}[${g}]`), t.if(S, He._`continue`), c.length > 1) t.if(He._`typeof ${y} == "string"`, He._`${y} += "_"`);
        t.if(He._`typeof ${E}[${y}] == "number"`, () => {
          t.assign(_, He._`${E}[${y}]`), e10.error(), t.assign(l, false).break();
        }).code(He._`${E}[${y}] = ${g}`);
      });
    }
    function m(g, _) {
      let y = Lj.useFunc(t, BMe.default), S = t.name("outer");
      t.label(S).for(He._`;${g}--;`, () => t.for(He._`${_} = ${g}; ${_}--;`, () => t.if(He._`${y}(${n}[${g}], ${n}[${_}])`, () => {
        e10.error(), t.assign(l, false).break(S);
      })));
    }
  } };
  Mj.default = GMe;
});
var $j = X(function(Fj) {
  Object.defineProperty(Fj, "__esModule", { value: true });
  var jl = Pe(), Uj = ze(), VMe = Ch(), qMe = { message: "must be equal to constant", params: ({ schemaCode: e10 }) => jl._`{allowedValue: ${e10}}` }, YMe = { keyword: "const", $data: true, error: qMe, code(e10) {
    let { gen: t, data: n, $data: r, schemaCode: o, schema: s } = e10;
    if (r || s && typeof s == "object") e10.fail$data(jl._`!${Uj.useFunc(t, VMe.default)}(${n}, ${o})`);
    else e10.fail(jl._`${s} !== ${n}`);
  } };
  Fj.default = YMe;
});
var jj = X(function(Hj) {
  Object.defineProperty(Hj, "__esModule", { value: true });
  var uo = Pe(), zj = ze(), JMe = Ch(), XMe = { message: "must be equal to one of the allowed values", params: ({ schemaCode: e10 }) => uo._`{allowedValues: ${e10}}` }, QMe = { keyword: "enum", schemaType: "array", $data: true, error: XMe, code(e10) {
    let { gen: t, data: n, $data: r, schema: o, schemaCode: s, it: i } = e10;
    if (!r && o.length === 0) throw Error("enum must have non-empty array");
    let a = o.length >= i.opts.loopEnum, l, c = () => l !== null && l !== void 0 ? l : l = zj.useFunc(t, JMe.default), d;
    if (a || r) d = t.let("valid"), e10.block$data(d, p);
    else {
      if (!Array.isArray(o)) throw Error("ajv implementation error");
      let m = t.const("vSchema", s);
      d = uo.or(...o.map((g, _) => f(m, _)));
    }
    e10.pass(d);
    function p() {
      t.assign(d, false), t.forOf("v", s, (m) => t.if(uo._`${c()}(${n}, ${m})`, () => t.assign(d, true).break()));
    }
    function f(m, g) {
      let _ = o[g];
      return typeof _ === "object" && _ !== null ? uo._`${c()}(${n}, ${m}[${g}])` : uo._`${n} === ${_}`;
    }
  } };
  Hj.default = QMe;
});
var Kj = X(function(Bj) {
  Object.defineProperty(Bj, "__esModule", { value: true });
  var tNe = pj(), nNe = mj(), rNe = Ej(), oNe = Rj(), sNe = Tj(), iNe = vj(), aNe = Pj(), lNe = Nj(), cNe = $j(), uNe = jj(), dNe = [tNe.default, nNe.default, rNe.default, oNe.default, sNe.default, iNe.default, aNe.default, lNe.default, { keyword: "type", schemaType: ["string", "array"] }, { keyword: "nullable", schemaType: "boolean" }, cNe.default, uNe.default];
  Bj.default = dNe;
});
var tT = X(function(Wj) {
  Object.defineProperty(Wj, "__esModule", { value: true });
  Wj.validateAdditionalItems = void 0;
  var Bn = Pe(), Bl = ze(), fNe = { message: ({ params: { len: e10 } }) => Bn.str`must NOT have more than ${e10} items`, params: ({ params: { len: e10 } }) => Bn._`{limit: ${e10}}` }, mNe = { keyword: "additionalItems", type: "array", schemaType: ["boolean", "object"], before: "uniqueItems", error: fNe, code(e10) {
    let { parentSchema: t, it: n } = e10, { items: r } = t;
    if (!Array.isArray(r)) {
      Bl.checkStrictMode(n, '"additionalItems" is ignored when "items" is not an array of schemas');
      return;
    }
    Gj(e10, r);
  } };
  function Gj(e10, t) {
    let { gen: n, schema: r, data: o, keyword: s, it: i } = e10;
    i.items = true;
    let a = n.const("len", Bn._`${o}.length`);
    if (r === false) e10.setParams({ len: t.length }), e10.pass(Bn._`${a} <= ${t.length}`);
    else if (typeof r == "object" && !Bl.alwaysValidSchema(i, r)) {
      let c = n.var("valid", Bn._`${a} <= ${t.length}`);
      n.if(Bn.not(c), () => l(c)), e10.ok(c);
    }
    function l(c) {
      n.forRange("i", t.length, a, (d) => {
        if (e10.subschema({ keyword: s, dataProp: d, dataPropType: Bl.Type.Num }, c), !i.allErrors) n.if(Bn.not(c), () => n.break());
      });
    }
  }
  Wj.validateAdditionalItems = Gj;
  Wj.default = mNe;
});
var nT = X(function(Zj) {
  Object.defineProperty(Zj, "__esModule", { value: true });
  Zj.validateTuple = void 0;
  var Ah = Pe(), Xs = ze(), qj = hr(), hNe = { keyword: "items", type: "array", schemaType: ["object", "array", "boolean"], before: "uniqueItems", code(e10) {
    let { schema: t, it: n } = e10;
    if (Array.isArray(t)) return Yj(e10, "additionalItems", t);
    if (n.items = true, Xs.alwaysValidSchema(n, t)) return;
    e10.ok(qj.validateArray(e10));
  } };
  function Yj(e10, t, n = e10.schema) {
    let { gen: r, parentSchema: o, data: s, keyword: i, it: a } = e10;
    if (d(o), a.opts.unevaluated && n.length && a.items !== true) a.items = Xs.mergeEvaluated.items(r, n.length, a.items);
    let l = r.name("valid"), c = r.const("len", Ah._`${s}.length`);
    n.forEach((p, f) => {
      if (Xs.alwaysValidSchema(a, p)) return;
      r.if(Ah._`${c} > ${f}`, () => e10.subschema({ keyword: i, schemaProp: f, dataProp: f }, l)), e10.ok(l);
    });
    function d(p) {
      let { opts: f, errSchemaPath: m } = a, g = n.length, _ = g === p.minItems && (g === p.maxItems || p[t] === false);
      if (f.strictTuples && !_) {
        let y = `"${i}" is ${g}-tuple, but minItems or maxItems/${t} are not specified or different at path "${m}"`;
        Xs.checkStrictMode(a, y, f.strictTuples);
      }
    }
  }
  Zj.validateTuple = Yj;
  Zj.default = hNe;
});
var eB = X(function(Qj) {
  Object.defineProperty(Qj, "__esModule", { value: true });
  var Xj = nT(), yNe = { keyword: "prefixItems", type: "array", schemaType: ["array"], before: "uniqueItems", code: (e10) => Xj.validateTuple(e10, "items") };
  Qj.default = yNe;
});
var sB = X(function(oB) {
  Object.defineProperty(oB, "__esModule", { value: true });
  var Rh = Pe(), tB = ze(), nB = hr(), rB = tT(), ENe = { message: ({ params: { len: e10 } }) => Rh.str`must NOT have more than ${e10} items`, params: ({ params: { len: e10 } }) => Rh._`{limit: ${e10}}` }, bNe = { keyword: "items", type: "array", schemaType: ["object", "boolean"], before: "uniqueItems", error: ENe, code(e10) {
    let { schema: t, parentSchema: n, it: r } = e10, { prefixItems: o } = n;
    if (r.items = true, tB.alwaysValidSchema(r, t)) return;
    if (o) rB.validateAdditionalItems(e10, o);
    else e10.ok(nB.validateArray(e10));
  } };
  oB.default = bNe;
});
var aB = X(function(iB) {
  Object.defineProperty(iB, "__esModule", { value: true });
  var mt = Pe(), Qs = ze(), ANe = { message: ({ params: { min: e10, max: t } }) => t === void 0 ? mt.str`must contain at least ${e10} valid item(s)` : mt.str`must contain at least ${e10} and no more than ${t} valid item(s)`, params: ({ params: { min: e10, max: t } }) => t === void 0 ? mt._`{minContains: ${e10}}` : mt._`{minContains: ${e10}, maxContains: ${t}}` }, RNe = { keyword: "contains", type: "array", schemaType: ["object", "boolean"], before: "uniqueItems", trackErrors: true, error: ANe, code(e10) {
    let { gen: t, schema: n, parentSchema: r, data: o, it: s } = e10, i, a, { minContains: l, maxContains: c } = r;
    if (s.opts.next) i = l === void 0 ? 1 : l, a = c;
    else i = 1;
    let d = t.const("len", mt._`${o}.length`);
    if (e10.setParams({ min: i, max: a }), a === void 0 && i === 0) {
      Qs.checkStrictMode(s, '"minContains" == 0 without "maxContains": "contains" keyword ignored');
      return;
    }
    if (a !== void 0 && i > a) {
      Qs.checkStrictMode(s, '"minContains" > "maxContains" is always invalid'), e10.fail();
      return;
    }
    if (Qs.alwaysValidSchema(s, n)) {
      let _ = mt._`${d} >= ${i}`;
      if (a !== void 0) _ = mt._`${_} && ${d} <= ${a}`;
      e10.pass(_);
      return;
    }
    s.items = true;
    let p = t.name("valid");
    if (a === void 0 && i === 1) m(p, () => t.if(p, () => t.break()));
    else if (i === 0) {
      if (t.let(p, true), a !== void 0) t.if(mt._`${o}.length > 0`, f);
    } else t.let(p, false), f();
    e10.result(p, () => e10.reset());
    function f() {
      let _ = t.name("_valid"), y = t.let("count", 0);
      m(_, () => t.if(_, () => g(y)));
    }
    function m(_, y) {
      t.forRange("i", 0, d, (S) => {
        e10.subschema({ keyword: "contains", dataProp: S, dataPropType: Qs.Type.Num, compositeRule: true }, _), y();
      });
    }
    function g(_) {
      if (t.code(mt._`${_}++`), a === void 0) t.if(mt._`${_} >= ${i}`, () => t.assign(p, true).break());
      else if (t.if(mt._`${_} > ${a}`, () => t.assign(p, false).break()), i === 1) t.assign(p, true);
      else t.if(mt._`${_} >= ${i}`, () => t.assign(p, true));
    }
  } };
  iB.default = RNe;
});
var mB = X(function(dB) {
  Object.defineProperty(dB, "__esModule", { value: true });
  dB.validateSchemaDeps = dB.validatePropertyDeps = dB.error = void 0;
  var Kl = Pe(), lB = ze(), po = hr();
  dB.error = { message: ({ params: { property: e10, depsCount: t, deps: n } }) => Kl.str`must have ${t === 1 ? "property" : "properties"} ${n} when property ${e10} is present`, params: ({ params: { property: e10, depsCount: t, deps: n, missingProperty: r } }) => Kl._`{property: ${e10},
    missingProperty: ${r},
    depsCount: ${t},
    deps: ${n}}` };
  var TNe = { keyword: "dependencies", type: "object", schemaType: "object", error: dB.error, code(e10) {
    let [t, n] = wNe(e10);
    cB(e10, t), uB(e10, n);
  } };
  function wNe({ schema: e10 }) {
    let t = {}, n = {};
    for (let r in e10) {
      if (r === "__proto__") continue;
      let o = Array.isArray(e10[r]) ? t : n;
      o[r] = e10[r];
    }
    return [t, n];
  }
  function cB(e10, t = e10.schema) {
    let { gen: n, data: r, it: o } = e10;
    if (Object.keys(t).length === 0) return;
    let s = n.let("missing");
    for (let i in t) {
      let a = t[i];
      if (a.length === 0) continue;
      let l = po.propertyInData(n, r, i, o.opts.ownProperties);
      if (e10.setParams({ property: i, depsCount: a.length, deps: a.join(", ") }), o.allErrors) n.if(l, () => {
        for (let c of a) po.checkReportMissingProp(e10, c);
      });
      else n.if(Kl._`${l} && (${po.checkMissingProp(e10, a, s)})`), po.reportMissingProp(e10, s), n.else();
    }
  }
  dB.validatePropertyDeps = cB;
  function uB(e10, t = e10.schema) {
    let { gen: n, data: r, keyword: o, it: s } = e10, i = n.name("valid");
    for (let a in t) {
      if (lB.alwaysValidSchema(s, t[a])) continue;
      n.if(po.propertyInData(n, r, a, s.opts.ownProperties), () => {
        let l = e10.subschema({ keyword: o, schemaProp: a }, i);
        e10.mergeValidEvaluated(l, i);
      }, () => n.var(i, true)), e10.ok(i);
    }
  }
  dB.validateSchemaDeps = uB;
  dB.default = TNe;
});
var _B = X(function(hB) {
  Object.defineProperty(hB, "__esModule", { value: true });
  var Oh = Pe(), gB = ze(), kNe = { message: "property name must be valid", params: ({ params: e10 }) => Oh._`{propertyName: ${e10.propertyName}}` }, PNe = { keyword: "propertyNames", type: "object", schemaType: ["object", "boolean"], error: kNe, code(e10) {
    let { gen: t, schema: n, data: r, it: o } = e10;
    if (gB.alwaysValidSchema(o, n)) return;
    let s = t.name("valid");
    t.forIn("key", r, (i) => {
      e10.setParams({ propertyName: i }), e10.subschema({ keyword: "propertyNames", data: i, dataTypes: ["string"], propertyName: i, compositeRule: true }, s), t.if(Oh.not(s), () => {
        if (e10.error(true), !o.allErrors) t.break();
      });
    }), e10.ok(s);
  } };
  hB.default = PNe;
});
var rT = X(function(yB) {
  Object.defineProperty(yB, "__esModule", { value: true });
  var ei = hr(), xt = Pe(), DNe = qo(), ti = ze(), LNe = { message: "must NOT have additional properties", params: ({ params: e10 }) => xt._`{additionalProperty: ${e10.additionalProperty}}` }, MNe = { keyword: "additionalProperties", type: ["object"], schemaType: ["boolean", "object"], allowUndefined: true, trackErrors: true, error: LNe, code(e10) {
    let { gen: t, schema: n, parentSchema: r, data: o, errsCount: s, it: i } = e10;
    if (!s) throw Error("ajv implementation error");
    let { allErrors: a, opts: l } = i;
    if (i.props = true, l.removeAdditional !== "all" && ti.alwaysValidSchema(i, n)) return;
    let c = ei.allSchemaProperties(r.properties), d = ei.allSchemaProperties(r.patternProperties);
    p(), e10.ok(xt._`${s} === ${DNe.default.errors}`);
    function p() {
      t.forIn("key", o, (y) => {
        if (!c.length && !d.length) g(y);
        else t.if(f(y), () => g(y));
      });
    }
    function f(y) {
      let S;
      if (c.length > 8) {
        let E = ti.schemaRefOrVal(i, r.properties, "properties");
        S = ei.isOwnProperty(t, E, y);
      } else if (c.length) S = xt.or(...c.map((E) => xt._`${y} === ${E}`));
      else S = xt.nil;
      if (d.length) S = xt.or(S, ...d.map((E) => xt._`${ei.usePattern(e10, E)}.test(${y})`));
      return xt.not(S);
    }
    function m(y) {
      t.code(xt._`delete ${o}[${y}]`);
    }
    function g(y) {
      if (l.removeAdditional === "all" || l.removeAdditional && n === false) {
        m(y);
        return;
      }
      if (n === false) {
        if (e10.setParams({ additionalProperty: y }), e10.error(), !a) t.break();
        return;
      }
      if (typeof n == "object" && !ti.alwaysValidSchema(i, n)) {
        let S = t.name("valid");
        if (l.removeAdditional === "failing") _(y, S, false), t.if(xt.not(S), () => {
          e10.reset(), m(y);
        });
        else if (_(y, S), !a) t.if(xt.not(S), () => t.break());
      }
    }
    function _(y, S, E) {
      let b = { keyword: "additionalProperties", dataProp: y, dataPropType: ti.Type.Str };
      if (E === false) Object.assign(b, { compositeRule: true, createErrors: false, allErrors: false });
      e10.subschema(b, S);
    }
  } };
  yB.default = MNe;
});
var CB = X(function(bB) {
  Object.defineProperty(bB, "__esModule", { value: true });
  var EB = np(), Th = hr(), Gl = ze(), SB = rT(), UNe = { keyword: "properties", type: "object", schemaType: "object", code(e10) {
    let { gen: t, schema: n, parentSchema: r, data: o, it: s } = e10;
    if (s.opts.removeAdditional === "all" && r.additionalProperties === void 0) SB.default.code(new EB.KeywordCxt(s, SB.default, "additionalProperties"));
    let i = Th.allSchemaProperties(n);
    for (let p of i) s.definedProperties.add(p);
    if (s.opts.unevaluated && i.length && s.props !== true) s.props = Gl.mergeEvaluated.props(t, Gl.toHash(i), s.props);
    let a = i.filter((p) => !Gl.alwaysValidSchema(s, n[p]));
    if (a.length === 0) return;
    let l = t.name("valid");
    for (let p of a) {
      if (c(p)) d(p);
      else {
        if (t.if(Th.propertyInData(t, o, p, s.opts.ownProperties)), d(p), !s.allErrors) t.else().var(l, true);
        t.endIf();
      }
      e10.it.definedProperties.add(p), e10.ok(l);
    }
    function c(p) {
      return s.opts.useDefaults && !s.compositeRule && n[p].default !== void 0;
    }
    function d(p) {
      e10.subschema({ keyword: "properties", schemaProp: p, dataProp: p }, l);
    }
  } };
  bB.default = UNe;
});
var RB = X(function(AB) {
  Object.defineProperty(AB, "__esModule", { value: true });
  var wh = hr(), ni = Pe(), xh = ze(), vh = ze(), $Ne = { keyword: "patternProperties", type: "object", schemaType: "object", code(e10) {
    let { gen: t, schema: n, data: r, parentSchema: o, it: s } = e10, { opts: i } = s, a = wh.allSchemaProperties(n), l = a.filter((_) => xh.alwaysValidSchema(s, n[_]));
    if (a.length === 0 || l.length === a.length && (!s.opts.unevaluated || s.props === true)) return;
    let c = i.strictSchema && !i.allowMatchingProperties && o.properties, d = t.name("valid");
    if (s.props !== true && !(s.props instanceof ni.Name)) s.props = vh.evaluatedPropsToName(t, s.props);
    let { props: p } = s;
    f();
    function f() {
      for (let _ of a) {
        if (c) m(_);
        if (s.allErrors) g(_);
        else t.var(d, true), g(_), t.if(d);
      }
    }
    function m(_) {
      for (let y in c) if (new RegExp(_).test(y)) xh.checkStrictMode(s, `property ${y} matches pattern ${_} (use allowMatchingProperties)`);
    }
    function g(_) {
      t.forIn("key", r, (y) => {
        t.if(ni._`${wh.usePattern(e10, _)}.test(${y})`, () => {
          let S = l.includes(_);
          if (!S) e10.subschema({ keyword: "patternProperties", schemaProp: _, dataProp: y, dataPropType: vh.Type.Str }, d);
          if (s.opts.unevaluated && p !== true) t.assign(ni._`${p}[${y}]`, true);
          else if (!S && !s.allErrors) t.if(ni.not(d), () => t.break());
        });
      });
    }
  } };
  AB.default = $Ne;
});
var wB = X(function(TB) {
  Object.defineProperty(TB, "__esModule", { value: true });
  var OB = ze(), HNe = { keyword: "not", schemaType: ["object", "boolean"], trackErrors: true, code(e10) {
    let { gen: t, schema: n, it: r } = e10;
    if (OB.alwaysValidSchema(r, n)) {
      e10.fail();
      return;
    }
    let o = t.name("valid");
    e10.subschema({ keyword: "not", compositeRule: true, createErrors: false, allErrors: false }, o), e10.failResult(o, () => e10.reset(), () => e10.error());
  }, error: { message: "must NOT be valid" } };
  TB.default = HNe;
});
var kB = X(function(vB) {
  Object.defineProperty(vB, "__esModule", { value: true });
  var xB = hr(), BNe = { keyword: "anyOf", schemaType: "array", trackErrors: true, code: xB.validateUnion, error: { message: "must match a schema in anyOf" } };
  vB.default = BNe;
});
var DB = X(function(IB) {
  Object.defineProperty(IB, "__esModule", { value: true });
  var ri = Pe(), PB = ze(), GNe = { message: "must match exactly one schema in oneOf", params: ({ params: e10 }) => ri._`{passingSchemas: ${e10.passing}}` }, WNe = { keyword: "oneOf", schemaType: "array", trackErrors: true, error: GNe, code(e10) {
    let { gen: t, schema: n, parentSchema: r, it: o } = e10;
    if (!Array.isArray(n)) throw Error("ajv implementation error");
    if (o.opts.discriminator && r.discriminator) return;
    let s = n, i = t.let("valid", false), a = t.let("passing", null), l = t.name("_valid");
    e10.setParams({ passing: a }), t.block(c), e10.result(i, () => e10.reset(), () => e10.error(true));
    function c() {
      s.forEach((d, p) => {
        let f;
        if (PB.alwaysValidSchema(o, d)) t.var(l, true);
        else f = e10.subschema({ keyword: "oneOf", schemaProp: p, compositeRule: true }, l);
        if (p > 0) t.if(ri._`${l} && ${i}`).assign(i, false).assign(a, ri._`[${a}, ${p}]`).else();
        t.if(l, () => {
          if (t.assign(i, true), t.assign(a, p), f) e10.mergeEvaluated(f, ri.Name);
        });
      });
    }
  } };
  IB.default = WNe;
});
var NB = X(function(MB) {
  Object.defineProperty(MB, "__esModule", { value: true });
  var LB = ze(), qNe = { keyword: "allOf", schemaType: "array", code(e10) {
    let { gen: t, schema: n, it: r } = e10;
    if (!Array.isArray(n)) throw Error("ajv implementation error");
    let o = t.name("valid");
    n.forEach((s, i) => {
      if (LB.alwaysValidSchema(r, s)) return;
      let a = e10.subschema({ keyword: "allOf", schemaProp: i }, o);
      e10.ok(o), e10.mergeEvaluated(a);
    });
  } };
  MB.default = qNe;
});
var $B = X(function(FB) {
  Object.defineProperty(FB, "__esModule", { value: true });
  var oi = Pe(), kh = ze(), ZNe = { message: ({ params: e10 }) => oi.str`must match "${e10.ifClause}" schema`, params: ({ params: e10 }) => oi._`{failingKeyword: ${e10.ifClause}}` }, JNe = { keyword: "if", schemaType: ["object", "boolean"], trackErrors: true, error: ZNe, code(e10) {
    let { gen: t, parentSchema: n, it: r } = e10;
    if (n.then === void 0 && n.else === void 0) kh.checkStrictMode(r, '"if" without "then" and "else" is ignored');
    let o = UB(r, "then"), s = UB(r, "else");
    if (!o && !s) return;
    let i = t.let("valid", true), a = t.name("_valid");
    if (l(), e10.reset(), o && s) {
      let d = t.let("ifClause");
      e10.setParams({ ifClause: d }), t.if(a, c("then", d), c("else", d));
    } else if (o) t.if(a, c("then"));
    else t.if(oi.not(a), c("else"));
    e10.pass(i, () => e10.error(true));
    function l() {
      let d = e10.subschema({ keyword: "if", compositeRule: true, createErrors: false, allErrors: false }, a);
      e10.mergeEvaluated(d);
    }
    function c(d, p) {
      return () => {
        let f = e10.subschema({ keyword: d }, a);
        if (t.assign(i, a), e10.mergeValidEvaluated(f, i), p) t.assign(p, oi._`${d}`);
        else e10.setParams({ ifClause: d });
      };
    }
  } };
  function UB(e10, t) {
    let n = e10.schema[t];
    return n !== void 0 && !kh.alwaysValidSchema(e10, n);
  }
  FB.default = JNe;
});
var jB = X(function(HB) {
  Object.defineProperty(HB, "__esModule", { value: true });
  var zB = ze(), QNe = { keyword: ["then", "else"], schemaType: ["object", "boolean"], code({ keyword: e10, parentSchema: t, it: n }) {
    if (t.if === void 0) zB.checkStrictMode(n, `"${e10}" without "if" is ignored`);
  } };
  HB.default = QNe;
});
var KB = X(function(BB) {
  Object.defineProperty(BB, "__esModule", { value: true });
  var tUe = tT(), nUe = eB(), rUe = nT(), oUe = sB(), sUe = aB(), iUe = mB(), aUe = _B(), lUe = rT(), cUe = CB(), uUe = RB(), dUe = wB(), pUe = kB(), fUe = DB(), mUe = NB(), gUe = $B(), hUe = jB();
  function _Ue(e10 = false) {
    let t = [dUe.default, pUe.default, fUe.default, mUe.default, gUe.default, hUe.default, aUe.default, lUe.default, iUe.default, cUe.default, uUe.default];
    if (e10) t.push(nUe.default, oUe.default);
    else t.push(tUe.default, rUe.default);
    return t.push(sUe.default), t;
  }
  BB.default = _Ue;
});
var WB = X(function(GB) {
  Object.defineProperty(GB, "__esModule", { value: true });
  var we = Pe(), SUe = { message: ({ schemaCode: e10 }) => we.str`must match format "${e10}"`, params: ({ schemaCode: e10 }) => we._`{format: ${e10}}` }, EUe = { keyword: "format", type: ["number", "string"], schemaType: "string", $data: true, error: SUe, code(e10, t) {
    let { gen: n, data: r, $data: o, schema: s, schemaCode: i, it: a } = e10, { opts: l, errSchemaPath: c, schemaEnv: d, self: p } = a;
    if (!l.validateFormats) return;
    if (o) f();
    else m();
    function f() {
      let g = n.scopeValue("formats", { ref: p.formats, code: l.code.formats }), _ = n.const("fDef", we._`${g}[${i}]`), y = n.let("fType"), S = n.let("format");
      n.if(we._`typeof ${_} == "object" && !(${_} instanceof RegExp)`, () => n.assign(y, we._`${_}.type || "string"`).assign(S, we._`${_}.validate`), () => n.assign(y, we._`"string"`).assign(S, _)), e10.fail$data(we.or(E(), b()));
      function E() {
        if (l.strictSchema === false) return we.nil;
        return we._`${i} && !${S}`;
      }
      function b() {
        let C = d.$async ? we._`(${_}.async ? await ${S}(${r}) : ${S}(${r}))` : we._`${S}(${r})`, A = we._`(typeof ${S} == "function" ? ${C} : ${S}.test(${r}))`;
        return we._`${S} && ${S} !== true && ${y} === ${t} && !${A}`;
      }
    }
    function m() {
      let g = p.formats[s];
      if (!g) {
        E();
        return;
      }
      if (g === true) return;
      let [_, y, S] = b(g);
      if (_ === t) e10.pass(C());
      function E() {
        if (l.strictSchema === false) {
          p.logger.warn(A());
          return;
        }
        throw Error(A());
        function A() {
          return `unknown format "${s}" ignored in schema at path "${c}"`;
        }
      }
      function b(A) {
        let T = A instanceof RegExp ? we.regexpCode(A) : l.code.formats ? we._`${l.code.formats}${we.getProperty(s)}` : void 0, D = n.scopeValue("formats", { key: s, ref: A, code: T });
        if (typeof A == "object" && !(A instanceof RegExp)) return [A.type || "string", A.validate, we._`${D}.validate`];
        return ["string", A, D];
      }
      function C() {
        if (typeof g == "object" && !(g instanceof RegExp) && g.async) {
          if (!d.$async) throw Error("async format in sync schema");
          return we._`await ${S}(${r})`;
        }
        return typeof y == "function" ? we._`${S}(${r})` : we._`${S}.test(${r})`;
      }
    }
  } };
  GB.default = EUe;
});
var qB = X(function(VB) {
  Object.defineProperty(VB, "__esModule", { value: true });
  var CUe = WB(), AUe = [CUe.default];
  VB.default = AUe;
});
var JB = X(function(YB) {
  Object.defineProperty(YB, "__esModule", { value: true });
  YB.contentVocabulary = YB.metadataVocabulary = void 0;
  YB.metadataVocabulary = ["title", "description", "default", "deprecated", "readOnly", "writeOnly", "examples"];
  YB.contentVocabulary = ["contentMediaType", "contentEncoding", "contentSchema"];
});
var QB = X(function(XB) {
  Object.defineProperty(XB, "__esModule", { value: true });
  var TUe = uj(), wUe = Kj(), xUe = KB(), vUe = qB(), Ph = JB(), kUe = [TUe.default, wUe.default, (0, xUe.default)(), vUe.default, Ph.metadataVocabulary, Ph.contentVocabulary];
  XB.default = kUe;
});
var rK = X(function(tK) {
  Object.defineProperty(tK, "__esModule", { value: true });
  tK.DiscrError = void 0;
  var eK;
  (function(e10) {
    e10.Tag = "tag", e10.Mapping = "mapping";
  })(eK || (tK.DiscrError = eK = {}));
});
var iK = X(function(sK) {
  Object.defineProperty(sK, "__esModule", { value: true });
  var yr = Pe(), Wl = rK(), Ih = fh(), IUe = rp(), oK = ze(), DUe = { message: ({ params: { discrError: e10, tagName: t } }) => e10 === Wl.DiscrError.Tag ? `tag "${t}" must be string` : `value of tag "${t}" must be in oneOf`, params: ({ params: { discrError: e10, tag: t, tagName: n } }) => yr._`{error: ${e10}, tag: ${n}, tagValue: ${t}}` }, LUe = { keyword: "discriminator", type: "object", schemaType: "object", error: DUe, code(e10) {
    let { gen: t, data: n, schema: r, parentSchema: o, it: s } = e10, { oneOf: i } = o;
    if (!s.opts.discriminator) throw Error("discriminator: requires discriminator option");
    let a = r.propertyName;
    if (typeof a != "string") throw Error("discriminator: requires propertyName");
    if (r.mapping) throw Error("discriminator: mapping is not supported");
    if (!i) throw Error("discriminator: requires oneOf keyword");
    let l = t.let("valid", false), c = t.const("tag", yr._`${n}${yr.getProperty(a)}`);
    t.if(yr._`typeof ${c} == "string"`, () => d(), () => e10.error(false, { discrError: Wl.DiscrError.Tag, tag: c, tagName: a })), e10.ok(l);
    function d() {
      let m = f();
      t.if(false);
      for (let g in m) t.elseIf(yr._`${c} === ${g}`), t.assign(l, p(m[g]));
      t.else(), e10.error(false, { discrError: Wl.DiscrError.Mapping, tag: c, tagName: a }), t.endIf();
    }
    function p(m) {
      let g = t.name("valid"), _ = e10.subschema({ keyword: "oneOf", schemaProp: m }, g);
      return e10.mergeEvaluated(_, yr.Name), g;
    }
    function f() {
      var m;
      let g = {}, _ = S(o), y = true;
      for (let C = 0; C < i.length; C++) {
        let A = i[C];
        if ((A === null || A === void 0 ? void 0 : A.$ref) && !oK.schemaHasRulesButRef(A, s.self.RULES)) {
          let D = A.$ref;
          if (A = Ih.resolveRef.call(s.self, s.schemaEnv.root, s.baseId, D), A instanceof Ih.SchemaEnv) A = A.schema;
          if (A === void 0) throw new IUe.default(s.opts.uriResolver, s.baseId, D);
        }
        let T = (m = A === null || A === void 0 ? void 0 : A.properties) === null || m === void 0 ? void 0 : m[a];
        if (typeof T != "object") throw Error(`discriminator: oneOf subschemas (or referenced schemas) must have "properties/${a}"`);
        y = y && (_ || S(A)), E(T, C);
      }
      if (!y) throw Error(`discriminator: "${a}" must be required`);
      return g;
      function S({ required: C }) {
        return Array.isArray(C) && C.includes(a);
      }
      function E(C, A) {
        if (C.const) b(C.const, A);
        else if (C.enum) for (let T of C.enum) b(T, A);
        else throw Error(`discriminator: "properties/${a}" must have "const" or "enum"`);
      }
      function b(C, A) {
        if (typeof C != "string" || C in g) throw Error(`discriminator: "${a}" values must be unique strings`);
        g[C] = A;
      }
    }
  } };
  sK.default = LUe;
});
var aK = X(function(Cgt, NUe) {
  NUe.exports = { $schema: "http://json-schema.org/draft-07/schema#", $id: "http://json-schema.org/draft-07/schema#", title: "Core schema meta-schema", definitions: { schemaArray: { type: "array", minItems: 1, items: { $ref: "#" } }, nonNegativeInteger: { type: "integer", minimum: 0 }, nonNegativeIntegerDefault0: { allOf: [{ $ref: "#/definitions/nonNegativeInteger" }, { default: 0 }] }, simpleTypes: { enum: ["array", "boolean", "integer", "null", "number", "object", "string"] }, stringArray: { type: "array", items: { type: "string" }, uniqueItems: true, default: [] } }, type: ["object", "boolean"], properties: { $id: { type: "string", format: "uri-reference" }, $schema: { type: "string", format: "uri" }, $ref: { type: "string", format: "uri-reference" }, $comment: { type: "string" }, title: { type: "string" }, description: { type: "string" }, default: true, readOnly: { type: "boolean", default: false }, examples: { type: "array", items: true }, multipleOf: { type: "number", exclusiveMinimum: 0 }, maximum: { type: "number" }, exclusiveMaximum: { type: "number" }, minimum: { type: "number" }, exclusiveMinimum: { type: "number" }, maxLength: { $ref: "#/definitions/nonNegativeInteger" }, minLength: { $ref: "#/definitions/nonNegativeIntegerDefault0" }, pattern: { type: "string", format: "regex" }, additionalItems: { $ref: "#" }, items: { anyOf: [{ $ref: "#" }, { $ref: "#/definitions/schemaArray" }], default: true }, maxItems: { $ref: "#/definitions/nonNegativeInteger" }, minItems: { $ref: "#/definitions/nonNegativeIntegerDefault0" }, uniqueItems: { type: "boolean", default: false }, contains: { $ref: "#" }, maxProperties: { $ref: "#/definitions/nonNegativeInteger" }, minProperties: { $ref: "#/definitions/nonNegativeIntegerDefault0" }, required: { $ref: "#/definitions/stringArray" }, additionalProperties: { $ref: "#" }, definitions: { type: "object", additionalProperties: { $ref: "#" }, default: {} }, properties: { type: "object", additionalProperties: { $ref: "#" }, default: {} }, patternProperties: { type: "object", additionalProperties: { $ref: "#" }, propertyNames: { format: "regex" }, default: {} }, dependencies: { type: "object", additionalProperties: { anyOf: [{ $ref: "#" }, { $ref: "#/definitions/stringArray" }] } }, propertyNames: { $ref: "#" }, const: true, enum: { type: "array", items: true, minItems: 1, uniqueItems: true }, type: { anyOf: [{ $ref: "#/definitions/simpleTypes" }, { type: "array", items: { $ref: "#/definitions/simpleTypes" }, minItems: 1, uniqueItems: true }] }, format: { type: "string" }, contentMediaType: { type: "string" }, contentEncoding: { type: "string" }, if: { $ref: "#" }, then: { $ref: "#" }, else: { $ref: "#" }, allOf: { $ref: "#/definitions/schemaArray" }, anyOf: { $ref: "#/definitions/schemaArray" }, oneOf: { $ref: "#/definitions/schemaArray" }, not: { $ref: "#" } }, default: true };
});
var sT = X(function(Kn, oT) {
  Object.defineProperty(Kn, "__esModule", { value: true });
  Kn.MissingRefError = Kn.ValidationError = Kn.CodeGen = Kn.Name = Kn.nil = Kn.stringify = Kn.str = Kn._ = Kn.KeywordCxt = Kn.Ajv = void 0;
  var UUe = nj(), FUe = QB(), $Ue = iK(), lK = aK(), zUe = ["/properties"], Dh = "http://json-schema.org/draft-07/schema";
  class ip extends UUe.default {
    _addVocabularies() {
      if (super._addVocabularies(), FUe.default.forEach((e10) => this.addVocabulary(e10)), this.opts.discriminator) this.addKeyword($Ue.default);
    }
    _addDefaultMetaSchema() {
      if (super._addDefaultMetaSchema(), !this.opts.meta) return;
      let e10 = this.opts.$data ? this.$dataMetaSchema(lK, zUe) : lK;
      this.addMetaSchema(e10, Dh, false), this.refs["http://json-schema.org/schema"] = Dh;
    }
    defaultMeta() {
      return this.opts.defaultMeta = super.defaultMeta() || (this.getSchema(Dh) ? Dh : void 0);
    }
  }
  Kn.Ajv = ip;
  oT.exports = Kn = ip;
  oT.exports.Ajv = ip;
  Object.defineProperty(Kn, "__esModule", { value: true });
  Kn.default = ip;
  var HUe = np();
  Object.defineProperty(Kn, "KeywordCxt", { enumerable: true, get: function() {
    return HUe.KeywordCxt;
  } });
  var Vl = Pe();
  Object.defineProperty(Kn, "_", { enumerable: true, get: function() {
    return Vl._;
  } });
  Object.defineProperty(Kn, "str", { enumerable: true, get: function() {
    return Vl.str;
  } });
  Object.defineProperty(Kn, "stringify", { enumerable: true, get: function() {
    return Vl.stringify;
  } });
  Object.defineProperty(Kn, "nil", { enumerable: true, get: function() {
    return Vl.nil;
  } });
  Object.defineProperty(Kn, "Name", { enumerable: true, get: function() {
    return Vl.Name;
  } });
  Object.defineProperty(Kn, "CodeGen", { enumerable: true, get: function() {
    return Vl.CodeGen;
  } });
  var jUe = uh();
  Object.defineProperty(Kn, "ValidationError", { enumerable: true, get: function() {
    return jUe.default;
  } });
  var BUe = rp();
  Object.defineProperty(Kn, "MissingRefError", { enumerable: true, get: function() {
    return BUe.default;
  } });
});
var yK = X(function(hK) {
  Object.defineProperty(hK, "__esModule", { value: true });
  hK.formatNames = hK.fastFormats = hK.fullFormats = void 0;
  function fo(e10, t) {
    return { validate: e10, compare: t };
  }
  hK.fullFormats = { date: fo(pK, cT), time: fo(aT(true), uT), "date-time": fo(cK(true), mK), "iso-time": fo(aT(), fK), "iso-date-time": fo(cK(), gK), duration: /^P(?!$)((\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+S)?)?|(\d+W)?)$/, uri: JUe, "uri-reference": /^(?:[a-z][a-z0-9+\-.]*:)?(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'"()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*)?(?:\?(?:[a-z0-9\-._~!$&'"()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'"()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i, "uri-template": /^(?:(?:[^\x00-\x20"'<>%\\^`{|}]|%[0-9a-f]{2})|\{[+#./;?&=,!@|]?(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?(?:,(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?)*\})*$/i, url: /^(?:https?|ftp):\/\/(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u{00a1}-\u{ffff}]+-)*[a-z0-9\u{00a1}-\u{ffff}]+)(?:\.(?:[a-z0-9\u{00a1}-\u{ffff}]+-)*[a-z0-9\u{00a1}-\u{ffff}]+)*(?:\.(?:[a-z\u{00a1}-\u{ffff}]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/iu, email: /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i, hostname: /^(?=.{1,253}\.?$)[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[-0-9a-z]{0,61}[0-9a-z])?)*\.?$/i, ipv4: /^(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)$/, ipv6: /^((([0-9a-f]{1,4}:){7}([0-9a-f]{1,4}|:))|(([0-9a-f]{1,4}:){6}(:[0-9a-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){5}(((:[0-9a-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){4}(((:[0-9a-f]{1,4}){1,3})|((:[0-9a-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){3}(((:[0-9a-f]{1,4}){1,4})|((:[0-9a-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){2}(((:[0-9a-f]{1,4}){1,5})|((:[0-9a-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){1}(((:[0-9a-f]{1,4}){1,6})|((:[0-9a-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9a-f]{1,4}){1,7})|((:[0-9a-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))$/i, regex: o0e, uuid: /^(?:urn:uuid:)?[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i, "json-pointer": /^(?:\/(?:[^~/]|~0|~1)*)*$/, "json-pointer-uri-fragment": /^#(?:\/(?:[a-z0-9_\-.!$&'()*+,;:=@]|%[0-9a-f]{2}|~0|~1)*)*$/i, "relative-json-pointer": /^(?:0|[1-9][0-9]*)(?:#|(?:\/(?:[^~/]|~0|~1)*)*)$/, byte: XUe, int32: { type: "number", validate: t0e }, int64: { type: "number", validate: n0e }, float: { type: "number", validate: dK }, double: { type: "number", validate: dK }, password: true, binary: true };
  hK.fastFormats = { ...hK.fullFormats, date: fo(/^\d\d\d\d-[0-1]\d-[0-3]\d$/, cT), time: fo(/^(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)$/i, uT), "date-time": fo(/^\d\d\d\d-[0-1]\d-[0-3]\dt(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)$/i, mK), "iso-time": fo(/^(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)?$/i, fK), "iso-date-time": fo(/^\d\d\d\d-[0-1]\d-[0-3]\d[t\s](?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)?$/i, gK), uri: /^(?:[a-z][a-z0-9+\-.]*:)(?:\/?\/)?[^\s]*$/i, "uri-reference": /^(?:(?:[a-z][a-z0-9+\-.]*:)?\/?\/)?(?:[^\\\s#][^\s#]*)?(?:#[^\\\s]*)?$/i, email: /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)*$/i };
  hK.formatNames = Object.keys(hK.fullFormats);
  function WUe(e10) {
    return e10 % 4 === 0 && (e10 % 100 !== 0 || e10 % 400 === 0);
  }
  var VUe = /^(\d\d\d\d)-(\d\d)-(\d\d)$/, qUe = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  function pK(e10) {
    let t = VUe.exec(e10);
    if (!t) return false;
    let n = +t[1], r = +t[2], o = +t[3];
    return r >= 1 && r <= 12 && o >= 1 && o <= (r === 2 && WUe(n) ? 29 : qUe[r]);
  }
  function cT(e10, t) {
    if (!(e10 && t)) return;
    if (e10 > t) return 1;
    if (e10 < t) return -1;
    return 0;
  }
  var iT = /^(\d\d):(\d\d):(\d\d(?:\.\d+)?)(z|([+-])(\d\d)(?::?(\d\d))?)?$/i;
  function aT(e10) {
    return function(n) {
      let r = iT.exec(n);
      if (!r) return false;
      let o = +r[1], s = +r[2], i = +r[3], a = r[4], l = r[5] === "-" ? -1 : 1, c = +(r[6] || 0), d = +(r[7] || 0);
      if (c > 23 || d > 59 || e10 && !a) return false;
      if (o <= 23 && s <= 59 && i < 60) return true;
      let p = s - d * l, f = o - c * l - (p < 0 ? 1 : 0);
      return (f === 23 || f === -1) && (p === 59 || p === -1) && i < 61;
    };
  }
  function uT(e10, t) {
    if (!(e10 && t)) return;
    let n = (/* @__PURE__ */ new Date("2020-01-01T" + e10)).valueOf(), r = (/* @__PURE__ */ new Date("2020-01-01T" + t)).valueOf();
    if (!(n && r)) return;
    return n - r;
  }
  function fK(e10, t) {
    if (!(e10 && t)) return;
    let n = iT.exec(e10), r = iT.exec(t);
    if (!(n && r)) return;
    if (e10 = n[1] + n[2] + n[3], t = r[1] + r[2] + r[3], e10 > t) return 1;
    if (e10 < t) return -1;
    return 0;
  }
  var lT = /t|\s/i;
  function cK(e10) {
    let t = aT(e10);
    return function(r) {
      let o = r.split(lT);
      return o.length === 2 && pK(o[0]) && t(o[1]);
    };
  }
  function mK(e10, t) {
    if (!(e10 && t)) return;
    let n = new Date(e10).valueOf(), r = new Date(t).valueOf();
    if (!(n && r)) return;
    return n - r;
  }
  function gK(e10, t) {
    if (!(e10 && t)) return;
    let [n, r] = e10.split(lT), [o, s] = t.split(lT), i = cT(n, o);
    if (i === void 0) return;
    return i || uT(r, s);
  }
  var YUe = /\/|:/, ZUe = /^(?:[a-z][a-z0-9+\-.]*:)(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)(?:\?(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i;
  function JUe(e10) {
    return YUe.test(e10) && ZUe.test(e10);
  }
  var uK = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/gm;
  function XUe(e10) {
    return uK.lastIndex = 0, uK.test(e10);
  }
  var QUe = -2147483648, e0e = 2147483647;
  function t0e(e10) {
    return Number.isInteger(e10) && e10 <= e0e && e10 >= QUe;
  }
  function n0e(e10) {
    return Number.isInteger(e10);
  }
  function dK() {
    return true;
  }
  var r0e = /[^\\]\\Z/;
  function o0e(e10) {
    if (r0e.test(e10)) return false;
    try {
      return new RegExp(e10), true;
    } catch (t) {
      return false;
    }
  }
});
var bK = X(function(EK) {
  Object.defineProperty(EK, "__esModule", { value: true });
  EK.formatLimitDefinition = void 0;
  var SK = sT(), vt = Pe(), si = vt.operators, Lh = { formatMaximum: { okStr: "<=", ok: si.LTE, fail: si.GT }, formatMinimum: { okStr: ">=", ok: si.GTE, fail: si.LT }, formatExclusiveMaximum: { okStr: "<", ok: si.LT, fail: si.GTE }, formatExclusiveMinimum: { okStr: ">", ok: si.GT, fail: si.LTE } }, i0e = { message: ({ keyword: e10, schemaCode: t }) => vt.str`should be ${Lh[e10].okStr} ${t}`, params: ({ keyword: e10, schemaCode: t }) => vt._`{comparison: ${Lh[e10].okStr}, limit: ${t}}` };
  EK.formatLimitDefinition = { keyword: Object.keys(Lh), type: "string", schemaType: "string", $data: true, error: i0e, code(e10) {
    let { gen: t, data: n, schemaCode: r, keyword: o, it: s } = e10, { opts: i, self: a } = s;
    if (!i.validateFormats) return;
    let l = new SK.KeywordCxt(s, a.RULES.all.format.definition, "format");
    if (l.$data) c();
    else d();
    function c() {
      let f = t.scopeValue("formats", { ref: a.formats, code: i.code.formats }), m = t.const("fmt", vt._`${f}[${l.schemaCode}]`);
      e10.fail$data(vt.or(vt._`typeof ${m} != "object"`, vt._`${m} instanceof RegExp`, vt._`typeof ${m}.compare != "function"`, p(m)));
    }
    function d() {
      let f = l.schema, m = a.formats[f];
      if (!m || m === true) return;
      if (typeof m != "object" || m instanceof RegExp || typeof m.compare != "function") throw Error(`"${o}": format "${f}" does not define "compare" function`);
      let g = t.scopeValue("formats", { key: f, ref: m, code: i.code.formats ? vt._`${i.code.formats}${vt.getProperty(f)}` : void 0 });
      e10.fail$data(p(g));
    }
    function p(f) {
      return vt._`${f}.compare(${n}, ${r}) ${Lh[o].fail} 0`;
    }
  }, dependencies: ["format"] };
  var a0e = (e10) => (e10.addKeyword(EK.formatLimitDefinition), e10);
  EK.default = a0e;
});
var OK = X(function(ap, RK) {
  Object.defineProperty(ap, "__esModule", { value: true });
  var Sr = yK(), c0e = bK(), ql = Pe(), CK = new ql.Name("fullFormats"), u0e = new ql.Name("fastFormats"), fT = (e10, t = { keywords: true }) => {
    if (Array.isArray(t)) return AK(e10, t, Sr.fullFormats, CK), e10;
    let [n, r] = t.mode === "fast" ? [Sr.fastFormats, u0e] : [Sr.fullFormats, CK], o = t.formats || Sr.formatNames;
    if (AK(e10, o, n, r), t.keywords) (0, c0e.default)(e10);
    return e10;
  };
  fT.get = (e10, t = "full") => {
    let r = (t === "fast" ? Sr.fastFormats : Sr.fullFormats)[e10];
    if (!r) throw Error(`Unknown format "${e10}"`);
    return r;
  };
  function AK(e10, t, n, r) {
    var o, s;
    (o = (s = e10.opts.code).formats) !== null && o !== void 0 || (s.formats = ql._`require("ajv-formats/dist/formats").${r}`);
    for (let i of t) e10.addFormat(i, n[i]);
  }
  RK.exports = ap = fT;
  Object.defineProperty(ap, "__esModule", { value: true });
  ap.default = fT;
});
var tb = {};
Rr(tb, { AGENT_PROXY_AUTH_TOKEN: () => n7, ANTHROPIC_API_KEY: () => B8, ANTHROPIC_AUTH_TOKEN: () => K8, ANTHROPIC_AWS_API_KEY: () => V8, ANTHROPIC_FEDERATION_RULE_ID: () => K7, ANTHROPIC_FOUNDRY_API_KEY: () => q8, ANTHROPIC_FOUNDRY_AUTH_TOKEN: () => Y8, ANTHROPIC_ORGANIZATION_ID: () => W7, ANTHROPIC_PROFILE: () => q7, ANTHROPIC_WORKSPACE_ID: () => V7, AWS_BEARER_TOKEN_BEDROCK: () => W8, AWS_CONTAINER_CREDENTIALS_FULL_URI: () => Q8, AWS_CONTAINER_CREDENTIALS_RELATIVE_URI: () => X8, AWS_ROLE_ARN: () => J8, AWS_WEB_IDENTITY_TOKEN_FILE: () => Z8, CLAUDE_CODE_ACCOUNT_TAGGED_ID: () => Z7, CLAUDE_CODE_ACCOUNT_UUID: () => Y7, CLAUDE_CODE_API_KEY_FILE_DESCRIPTOR: () => i7, CLAUDE_CODE_API_KEY_HELPER_TTL_MS: () => D7, CLAUDE_CODE_AUTH_FAIL_EXIT_MS: () => I7, CLAUDE_CODE_AWS_CHAIN_RESOLVE_TIMEOUT_MS: () => B7, CLAUDE_CODE_CUSTOM_OAUTH_URL: () => g7, CLAUDE_CODE_DESIGN_OAUTH_CLIENT_ID: () => f7, CLAUDE_CODE_DISABLE_LAUNCHER_SIGN_IN: () => S7, CLAUDE_CODE_ENABLE_PROXY_AUTH_HELPER: () => L7, CLAUDE_CODE_FEDERATION_CACHE_DIR: () => G7, CLAUDE_CODE_GATEWAY_TOKEN_FILE_DESCRIPTOR: () => l7, CLAUDE_CODE_HFI_BEARER_TOKEN: () => t7, CLAUDE_CODE_HOST_AUTH_ENV_VAR: () => C7, CLAUDE_CODE_HOST_AUTH_REFRESH_TIMEOUT_MS: () => b7, CLAUDE_CODE_HOST_CREDS_FILE: () => A7, CLAUDE_CODE_OAUTH_401_WAIT_MS: () => P7, CLAUDE_CODE_OAUTH_CLIENT_ID: () => p7, CLAUDE_CODE_OAUTH_REFRESH_TOKEN: () => d7, CLAUDE_CODE_OAUTH_SCOPES: () => m7, CLAUDE_CODE_OAUTH_TOKEN: () => G8, CLAUDE_CODE_OAUTH_TOKEN_FILE_DESCRIPTOR: () => a7, CLAUDE_CODE_ORGANIZATION_UUID: () => J7, CLAUDE_CODE_PROXY_AUTH_HELPER_TTL_MS: () => M7, CLAUDE_CODE_RATE_LIMIT_TIER: () => eQ, CLAUDE_CODE_SDK_HAS_HOST_AUTH_REFRESH: () => E7, CLAUDE_CODE_SDK_HAS_OAUTH_REFRESH: () => h7, CLAUDE_CODE_SDK_HAS_SESSIONS_OAUTH_REFRESH: () => _7, CLAUDE_CODE_SESSIONS_OAUTH_TOKEN: () => y7, CLAUDE_CODE_SESSION_ACCESS_TOKEN: () => R7, CLAUDE_CODE_SKIP_ANTHROPIC_AWS_AUTH: () => $7, CLAUDE_CODE_SKIP_ANTHROPIC_GOOGLE_CLOUD_AUTH: () => z7, CLAUDE_CODE_SKIP_AWS_CRED_CACHE: () => j7, CLAUDE_CODE_SKIP_BEDROCK_AUTH: () => N7, CLAUDE_CODE_SKIP_FOUNDRY_AUTH: () => F7, CLAUDE_CODE_SKIP_MANTLE_AUTH: () => H7, CLAUDE_CODE_SKIP_VERTEX_AUTH: () => U7, CLAUDE_CODE_SUBSCRIPTION_TYPE: () => Q7, CLAUDE_CODE_USER_EMAIL: () => X7, CLAUDE_CODE_WEBSOCKET_AUTH_FILE_DESCRIPTOR: () => c7, CLAUDE_LOCAL_OAUTH_API_BASE: () => x7, CLAUDE_LOCAL_OAUTH_APPS_BASE: () => v7, CLAUDE_LOCAL_OAUTH_CONSOLE_BASE: () => k7, CLAUDE_SESSION_INGRESS_TOKEN_FILE: () => u7, CLAUDE_TRUSTED_DEVICE_TOKEN: () => O7, CLOUDSDK_AUTH_ACCESS_TOKEN: () => e7, ENVIRONMENT_SERVICE_KEY: () => r7, MCP_CLIENT_SECRET: () => o7, MCP_XAA_IDP_CLIENT_SECRET: () => s7, USE_LOCAL_OAUTH: () => T7, USE_STAGING_OAUTH: () => w7 });
var nb = {};
Rr(nb, { ANT_CLAUDE_CODE_METRICS_ENDPOINT: () => uee, ANT_OTEL_EXPORTER_OTLP_ENDPOINT: () => ree, ANT_OTEL_EXPORTER_OTLP_HEADERS: () => oee, ANT_OTEL_EXPORTER_OTLP_PROTOCOL: () => see, ANT_OTEL_LOGS_EXPORTER: () => iee, ANT_OTEL_METRICS_EXPORTER: () => aee, ANT_OTEL_RESOURCE_ATTRIBUTES: () => cee, ANT_OTEL_TRACES_EXPORTER: () => lee, BETA_TRACING_ENDPOINT: () => dee, CLAUDE_CODE_BENCH_LIVE_COUNTS: () => yQ, CLAUDE_CODE_BYOC_ENABLE_DATADOG: () => OQ, CLAUDE_CODE_DATADOG_FLUSH_INTERVAL_MS: () => AQ, CLAUDE_CODE_DD_ERROR_TRACKING_FLUSH_INTERVAL_MS: () => RQ, CLAUDE_CODE_DEBUG_LOGS_DIR: () => oQ, CLAUDE_CODE_DEBUG_LOG_LEVEL: () => rQ, CLAUDE_CODE_DEBUG_REPAINTS: () => sQ, CLAUDE_CODE_DIAGNOSTICS_FILE: () => iQ, CLAUDE_CODE_ENHANCED_TELEMETRY_BETA: () => SQ, CLAUDE_CODE_FRAME_TIMING_LOG: () => pQ, CLAUDE_CODE_FRAME_TIMING_SAMPLE_EVERY: () => fQ, CLAUDE_CODE_OTEL_CONTENT_MAX_LENGTH: () => ZQ, CLAUDE_CODE_OTEL_DIAG_STDERR: () => TQ, CLAUDE_CODE_OTEL_FLUSH_TIMEOUT_MS: () => EQ, CLAUDE_CODE_OTEL_HEADERS_HELPER_DEBOUNCE_MS: () => CQ, CLAUDE_CODE_OTEL_SHUTDOWN_TIMEOUT_MS: () => bQ, CLAUDE_CODE_PERFETTO_TRACE: () => uQ, CLAUDE_CODE_PERFETTO_WRITE_INTERVAL_S: () => dQ, CLAUDE_CODE_PROFILE_STARTUP: () => cQ, CLAUDE_CODE_SESSION_LOG: () => mQ, CLAUDE_CODE_TEE_SDK_STDOUT: () => _Q, CLAUDE_CODE_TERMINAL_RECORDING: () => hQ, CLAUDE_DEBUG: () => tQ, CLAUDE_PTY_RECORD: () => gQ, DEBUG: () => nQ, DEBUG_CLAUDE_AGENT_SDK: () => aQ, DEBUG_SDK: () => lQ, OTEL_ATTRIBUTE_VALUE_LENGTH_LIMIT: () => VQ, OTEL_EXPORTER_OTLP_ENDPOINT: () => kQ, OTEL_EXPORTER_OTLP_HEADERS: () => PQ, OTEL_EXPORTER_OTLP_LOGS_ENDPOINT: () => DQ, OTEL_EXPORTER_OTLP_LOGS_HEADERS: () => LQ, OTEL_EXPORTER_OTLP_LOGS_PROTOCOL: () => MQ, OTEL_EXPORTER_OTLP_METRICS_ENDPOINT: () => NQ, OTEL_EXPORTER_OTLP_METRICS_HEADERS: () => UQ, OTEL_EXPORTER_OTLP_METRICS_PROTOCOL: () => FQ, OTEL_EXPORTER_OTLP_METRICS_TEMPORALITY_PREFERENCE: () => $Q, OTEL_EXPORTER_OTLP_PROTOCOL: () => IQ, OTEL_EXPORTER_OTLP_TRACES_ENDPOINT: () => zQ, OTEL_EXPORTER_OTLP_TRACES_HEADERS: () => HQ, OTEL_EXPORTER_OTLP_TRACES_PROTOCOL: () => jQ, OTEL_LOGRECORD_ATTRIBUTE_VALUE_LENGTH_LIMIT: () => qQ, OTEL_LOGS_EXPORTER: () => xQ, OTEL_LOGS_EXPORT_INTERVAL: () => KQ, OTEL_LOG_ASSISTANT_RESPONSES: () => XQ, OTEL_LOG_MANAGED_SETTINGS: () => tee, OTEL_LOG_RAW_API_BODIES: () => nee, OTEL_LOG_TOOL_CONTENT: () => QQ, OTEL_LOG_TOOL_DETAILS: () => eee, OTEL_LOG_USER_PROMPTS: () => JQ, OTEL_METRICS_EXPORTER: () => wQ, OTEL_METRIC_EXPORT_INTERVAL: () => BQ, OTEL_RESOURCE_ATTRIBUTES: () => WQ, OTEL_SPAN_ATTRIBUTE_VALUE_LENGTH_LIMIT: () => YQ, OTEL_TRACES_EXPORTER: () => vQ, OTEL_TRACES_EXPORT_INTERVAL: () => GQ });
var mb = {};
Rr(mb, { CLAUDE_AX_ANNOUNCEMENT_HOLD_MS: () => Ete, CLAUDE_AX_PREPARK_MS: () => Ste, CLAUDE_AX_REWRITE_HELD_ANNOUNCEMENT: () => bte, CLAUDE_AX_SCREEN_READER: () => _te, CLAUDE_AX_STARTUP_QUIET_MS: () => yte, CLAUDE_CHROME_CLASSIFIER_FLOOR: () => Cte, CLAUDE_CODE_ACCESSIBILITY: () => goe, CLAUDE_CODE_ACT_DONT_REDERIVE: () => hoe, CLAUDE_CODE_ALT_SCREEN_FULL_REPAINT: () => Rte, CLAUDE_CODE_AMBER_ASTROLABE: () => Ure, CLAUDE_CODE_ARTIFACT_ASK_FIRST: () => rse, CLAUDE_CODE_ARTIFACT_ASSETS: () => Goe, CLAUDE_CODE_ARTIFACT_COMMENTS: () => Toe, CLAUDE_CODE_ARTIFACT_COMMENTS_AUTOREACT: () => woe, CLAUDE_CODE_ARTIFACT_COMMENT_FAST_ACK: () => voe, CLAUDE_CODE_ARTIFACT_COMMENT_FAST_ACK_FIXED: () => koe, CLAUDE_CODE_ARTIFACT_COMMENT_RESPONDER: () => xoe, CLAUDE_CODE_ARTIFACT_DB: () => Poe, CLAUDE_CODE_ARTIFACT_DB_STR_REPLACE: () => Ioe, CLAUDE_CODE_ARTIFACT_DELETE: () => Loe, CLAUDE_CODE_ARTIFACT_FRESH_READ: () => ese, CLAUDE_CODE_ARTIFACT_HOT: () => Voe, CLAUDE_CODE_ARTIFACT_MULTI_FILE: () => Woe, CLAUDE_CODE_ARTIFACT_OPENING_PREFETCH: () => tse, CLAUDE_CODE_ARTIFACT_OPEN_ACTION: () => Uoe, CLAUDE_CODE_ARTIFACT_PATH_PIN: () => qoe, CLAUDE_CODE_ARTIFACT_PIN: () => Foe, CLAUDE_CODE_ARTIFACT_PRESENCE: () => Koe, CLAUDE_CODE_ARTIFACT_PREVIEW: () => Moe, CLAUDE_CODE_ARTIFACT_PREVIEW_EMULATOR: () => Noe, CLAUDE_CODE_ARTIFACT_PUBLISH_EDITS: () => Yoe, CLAUDE_CODE_ARTIFACT_QUICKSTART: () => Qoe, CLAUDE_CODE_ARTIFACT_REPL: () => Doe, CLAUDE_CODE_ARTIFACT_ROOM: () => Boe, CLAUDE_CODE_ARTIFACT_SHARE: () => $oe, CLAUDE_CODE_ARTIFACT_SHARE_PROBE_REUSE_MS: () => zoe, CLAUDE_CODE_ARTIFACT_START_KIT: () => nse, CLAUDE_CODE_ARTIFACT_TOOLSET: () => Zoe, CLAUDE_CODE_ARTIFACT_TYPES: () => Joe, CLAUDE_CODE_ARTIFACT_TYPE_CATALOG: () => Xoe, CLAUDE_CODE_ARTIFACT_TYPE_CLOUD_CREATE: () => ose, CLAUDE_CODE_ARTIFACT_VERIFY: () => sse, CLAUDE_CODE_ARTIFACT_VERSIONS: () => joe, CLAUDE_CODE_ATTACHMENTS_IN_USER_DATA: () => Ase, CLAUDE_CODE_ATTRIBUTION_ANNOUNCEMENT: () => _oe, CLAUDE_CODE_AUTOUPDATER_DISABLED_BY_HOST: () => Mae, CLAUDE_CODE_AUTO_CONNECT_IDE: () => ise, CLAUDE_CODE_AUTO_MODE_SERVER: () => ase, CLAUDE_CODE_BASALT_COVE: () => Lte, CLAUDE_CODE_BASH_EDIT_DIFF: () => Pte, CLAUDE_CODE_BASH_OUTPUT_AUDIENCE_NOTE: () => Roe, CLAUDE_CODE_BASH_SANDBOX_SHOW_INDICATOR: () => lse, CLAUDE_CODE_BG_TASKS_REPORT_RUNNING: () => Wte, CLAUDE_CODE_BISON_CAIRN: () => Fre, CLAUDE_CODE_BREEZY_HORIZON: () => Mte, CLAUDE_CODE_BUBBLEWRAP: () => cse, CLAUDE_CODE_CALM_MOCHI: () => loe, CLAUDE_CODE_CCR_EARLY_HYDRATE_PREFETCH: () => use, CLAUDE_CODE_CCR_EARLY_PLUGINS_SYNC: () => _se, CLAUDE_CODE_CCR_EARLY_REMOTE_CONNECT: () => dse, CLAUDE_CODE_CCR_EARLY_SKILLS_SYNC: () => yse, CLAUDE_CODE_CCR_EARLY_SYNC_AFTER_SETTINGS_REFUSAL: () => Sse, CLAUDE_CODE_CCR_FOLD_FIRST_TURN_RESCAN: () => Ese, CLAUDE_CODE_CCR_LONG_POLL: () => mse, CLAUDE_CODE_CCR_OWN_CONNECTION_POOL: () => fse, CLAUDE_CODE_CCR_SKIP_FRESH_MIGRATIONS: () => Cse, CLAUDE_CODE_CCR_WORKER_SOCKET: () => pse, CLAUDE_CODE_CHILD_SESSION: () => Ose, CLAUDE_CODE_CHROME_MCP_ORG_DENIED: () => wse, CLAUDE_CODE_COLD_COMPACT: () => xse, CLAUDE_CODE_CONSENT_POINTERLESS: () => Ote, CLAUDE_CODE_COORDINATOR_FORCE_WORKER_INHERIT_MODEL: () => Vte, CLAUDE_CODE_COWORK_FRAME_ARTIFACTS: () => Zte, CLAUDE_CODE_COZY_TEAPOT: () => Ite, CLAUDE_CODE_CURRIED_TRINKET: () => Dte, CLAUDE_CODE_DAPPER_CUPCAKE: () => Kte, CLAUDE_CODE_DESKTOP_CONNECTOR_NAMES: () => Qte, CLAUDE_CODE_DESKTOP_SKILL_SWITCHES: () => Xte, CLAUDE_CODE_DISABLE_ADAPTIVE_THINKING: () => sne, CLAUDE_CODE_DISABLE_ADMIN_ENV_UNION: () => rne, CLAUDE_CODE_DISABLE_ADVISOR_TOOL: () => ine, CLAUDE_CODE_DISABLE_AGENT_VIEW: () => ane, CLAUDE_CODE_DISABLE_ALTERNATE_SCREEN: () => lne, CLAUDE_CODE_DISABLE_ARTIFACT: () => cne, CLAUDE_CODE_DISABLE_ATTACHMENTS: () => une, CLAUDE_CODE_DISABLE_ATTRIBUTION_CROSS_REPO: () => dne, CLAUDE_CODE_DISABLE_AUTH_REFRESH_LOCK: () => pne, CLAUDE_CODE_DISABLE_AUTO_MEMORY: () => fne, CLAUDE_CODE_DISABLE_AWAITING_USER_IDLE: () => mne, CLAUDE_CODE_DISABLE_BACKGROUND_TASKS: () => gne, CLAUDE_CODE_DISABLE_BEDROCK_CONTENT_TYPE_DEFAULT: () => _ne, CLAUDE_CODE_DISABLE_BEDROCK_CONTENT_TYPE_GUARD: () => yne, CLAUDE_CODE_DISABLE_BG_EXIT_HANDOFF: () => Sne, CLAUDE_CODE_DISABLE_BG_STABLE_PATH: () => Ene, CLAUDE_CODE_DISABLE_BUNDLED_SKILLS: () => bne, CLAUDE_CODE_DISABLE_CFC_PROMPT: () => Cne, CLAUDE_CODE_DISABLE_CLAUDE_API_SKILL: () => Ane, CLAUDE_CODE_DISABLE_CLAUDE_CODE_SKILL: () => Rne, CLAUDE_CODE_DISABLE_CLAUDE_MDS: () => One, CLAUDE_CODE_DISABLE_CRON: () => Tne, CLAUDE_CODE_DISABLE_DANGEROUS_RM_TIMEOUT: () => wne, CLAUDE_CODE_DISABLE_EMPTY_CLASSIC_DISPATCH_SKIP: () => kne, CLAUDE_CODE_DISABLE_EXPERIMENTAL_BETAS: () => xne, CLAUDE_CODE_DISABLE_EXPLORE_PLAN_AGENTS: () => Pne, CLAUDE_CODE_DISABLE_FEEDBACK_SURVEY: () => Ine, CLAUDE_CODE_DISABLE_FILE_CHECKPOINTING: () => Lne, CLAUDE_CODE_DISABLE_FILE_MENTIONS: () => Mne, CLAUDE_CODE_DISABLE_GIT_INSTRUCTIONS: () => Nne, CLAUDE_CODE_DISABLE_INLINE_SHELL_RM_PROMPT: () => dre, CLAUDE_CODE_DISABLE_LAUNCH_COMPOSER: () => Une, CLAUDE_CODE_DISABLE_LONE_SEC_DEFAULT_SHORTCUT: () => Fne, CLAUDE_CODE_DISABLE_MCP_TASK_BACKGROUND: () => hne, CLAUDE_CODE_DISABLE_MEMORY_BULK_INFLATE: () => $ne, CLAUDE_CODE_DISABLE_MEMORY_MASS_DELETE_HOLD: () => zne, CLAUDE_CODE_DISABLE_MEMORY_PERIODIC_RESYNC: () => Hne, CLAUDE_CODE_DISABLE_MEMORY_RO_UNSAVED_NOTICE: () => jne, CLAUDE_CODE_DISABLE_MEMORY_STREAM_LIST: () => Bne, CLAUDE_CODE_DISABLE_MOUNTED_DRIVE_RM_PROMPT: () => fre, CLAUDE_CODE_DISABLE_MOUSE: () => Wne, CLAUDE_CODE_DISABLE_MOUSE_CLICKS: () => Vne, CLAUDE_CODE_DISABLE_NESTED_CHAIN_IDLE: () => qne, CLAUDE_CODE_DISABLE_NESTED_USER_REPAIR: () => Yne, CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC: () => Zne, CLAUDE_CODE_DISABLE_NONSTREAMING_FALLBACK: () => Jne, CLAUDE_CODE_DISABLE_NOTIFICATION_PRESENCE_CHECK: () => Xne, CLAUDE_CODE_DISABLE_OFFICIAL_MARKETPLACE_AUTOINSTALL: () => Qne, CLAUDE_CODE_DISABLE_ORG_MEMORY: () => ere, CLAUDE_CODE_DISABLE_OTEL_EVENT_SKIP: () => tre, CLAUDE_CODE_DISABLE_PERMISSION_PROMPT_NOTIFY_HOOKS: () => Kne, CLAUDE_CODE_DISABLE_POLICY_SKILLS: () => nre, CLAUDE_CODE_DISABLE_POWERSHELL_CMD_RM_DENY: () => rre, CLAUDE_CODE_DISABLE_PRECOMPACT_SKIP: () => ore, CLAUDE_CODE_DISABLE_PROACTIVITY: () => sre, CLAUDE_CODE_DISABLE_REFUSAL_FALLBACK: () => ire, CLAUDE_CODE_DISABLE_REFUSAL_RETRY: () => are, CLAUDE_CODE_DISABLE_RESPONSE_COMPARISON: () => Dne, CLAUDE_CODE_DISABLE_STARTUP_WORK_GATE: () => hre, CLAUDE_CODE_DISABLE_STRUCTURED_OUTPUTS: () => vne, CLAUDE_CODE_DISABLE_SUBSTITUTION_RM_PROMPT: () => ure, CLAUDE_CODE_DISABLE_TERMINAL_TITLE: () => _re, CLAUDE_CODE_DISABLE_THINKING: () => Sre, CLAUDE_CODE_DISABLE_ULTRAREVIEW_TRUST_CHECK: () => gre, CLAUDE_CODE_DISABLE_VIRTUAL_SCROLL: () => Ere, CLAUDE_CODE_DISABLE_WEB_FETCH: () => bre, CLAUDE_CODE_DISABLE_WINDOWS_SHELL_LAUNCHER: () => Nie, CLAUDE_CODE_DISABLE_WORKFLOWS: () => Cre, CLAUDE_CODE_EDITOR_CODELIVERY: () => qte, CLAUDE_CODE_ELEGANT_MEADOW: () => Gte, CLAUDE_CODE_ENABLE_APPEND_SUBAGENT_PROMPT: () => Rre, CLAUDE_CODE_ENABLE_AWAY_SUMMARY: () => Ore, CLAUDE_CODE_ENABLE_BACKGROUND_PLUGIN_REFRESH: () => Tre, CLAUDE_CODE_ENABLE_CFC: () => wre, CLAUDE_CODE_ENABLE_DESIGN_SYNC: () => xre, CLAUDE_CODE_ENABLE_EXPERIMENTAL_ADVISOR_TOOL: () => vre, CLAUDE_CODE_ENABLE_FEEDBACK_SURVEY_FOR_OTEL: () => kre, CLAUDE_CODE_ENABLE_FINE_GRAINED_TOOL_STREAMING: () => Pre, CLAUDE_CODE_ENABLE_LAUNCH_COMPOSER: () => Ire, CLAUDE_CODE_ENABLE_MENU_KIND_LANES: () => Dre, CLAUDE_CODE_ENABLE_PROMPT_SUGGESTION: () => Kre, CLAUDE_CODE_ENABLE_REFRESH_MCP_TOOLS: () => Gre, CLAUDE_CODE_ENABLE_REMOTE_RECAP: () => Wre, CLAUDE_CODE_ENABLE_SDK_FILE_CHECKPOINTING: () => Vre, CLAUDE_CODE_ENABLE_SHARE_BUNDLE: () => qre, CLAUDE_CODE_ENABLE_TASKS: () => Yre, CLAUDE_CODE_ENABLE_TODO_TOOLS: () => Zre, CLAUDE_CODE_ENABLE_TOKEN_USAGE_ATTACHMENT: () => Jre, CLAUDE_CODE_ENABLE_XAA: () => Xre, CLAUDE_CODE_EVAL_INTERVIEW_SESSION: () => Cie, CLAUDE_CODE_EVEN_MORE_DANGEROUSLY_SKIP_PERMISSIONS: () => mre, CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS: () => vse, CLAUDE_CODE_EXPERIMENTAL_OBSERVER_AGENTS: () => kse, CLAUDE_CODE_FLEETVIEW_SIMPLE: () => Lre, CLAUDE_CODE_FORCE_MID_CONVERSATION_SYSTEM: () => Fse, CLAUDE_CODE_FORCE_SESSION_PERSISTENCE: () => Mse, CLAUDE_CODE_FORCE_STRIKETHROUGH: () => Nse, CLAUDE_CODE_FORCE_TERMINAL_IMAGES: () => Use, CLAUDE_CODE_FORCE_WINDOWS_CREDMAN: () => zse, CLAUDE_CODE_FORK_SUBAGENT: () => Pse, CLAUDE_CODE_FORWARD_SUBAGENT_TEXT: () => Hse, CLAUDE_CODE_FORWARD_USER_INTENT: () => Yte, CLAUDE_CODE_GATEWAY_HINT_HEADERS: () => Fie, CLAUDE_CODE_GB_DISK_CACHE_WHEN_TELEMETRY_OFF: () => Mre, CLAUDE_CODE_GENTLE_PARASOL: () => vte, CLAUDE_CODE_GLOB_HIDDEN: () => Ise, CLAUDE_CODE_GLOB_NO_IGNORE: () => Dse, CLAUDE_CODE_GORSE_PLOVER: () => zre, CLAUDE_CODE_GROWTHBOOK_KICK_FROM_INIT: () => gse, CLAUDE_CODE_GROWTHBOOK_KICK_ON_WARM_CACHE: () => hse, CLAUDE_CODE_HARBOR_KITE: () => Qre, CLAUDE_CODE_HARBOR_KITE_CLOUD: () => toe, CLAUDE_CODE_HARBOR_KITE_PACING_OFF: () => eoe, CLAUDE_CODE_HARMONIC_RIDDLE: () => aoe, CLAUDE_CODE_HIDE_CWD: () => Lse, CLAUDE_CODE_HOOKS_SAME_THREAD: () => Hae, CLAUDE_CODE_HOST_GUARDS_ARTIFACTS_MCP: () => Hoe, CLAUDE_CODE_HOST_SCHEDULED_RUN: () => Jte, CLAUDE_CODE_HOVER_REST: () => Nre, CLAUDE_CODE_HUMBLE_HAMMOCK: () => $te, CLAUDE_CODE_IDE_SKIP_AUTO_INSTALL: () => jse, CLAUDE_CODE_IDE_SKIP_VALID_CHECK: () => Bse, CLAUDE_CODE_INCLUDE_PARTIAL_MESSAGES: () => Kse, CLAUDE_CODE_INLINE_TOOLS: () => $se, CLAUDE_CODE_JUNIPER_SUNDIAL: () => Bre, CLAUDE_CODE_KB_COHESION_FIXES: () => moe, CLAUDE_CODE_LANTERN_PRISM: () => noe, CLAUDE_CODE_LARCH_CISTERN: () => $re, CLAUDE_CODE_MANAGED_CONFIG_PREFETCH: () => Rse, CLAUDE_CODE_MCP_REGISTRY_FETCH_AT_STARTUP: () => bse, CLAUDE_CODE_MEMORY_PUSH_DELETE_MODE: () => Gne, CLAUDE_CODE_MESSAGES_PROMPT_CACHE_TTL: () => kae, CLAUDE_CODE_MODEL_CAPABILITIES: () => yoe, CLAUDE_CODE_NANKEEN_KESTREL: () => one, CLAUDE_CODE_NATIVE_CURSOR: () => Gse, CLAUDE_CODE_NEW_INIT: () => Wse, CLAUDE_CODE_NONBLOCKING_STDOUT: () => qse, CLAUDE_CODE_NO_FLICKER: () => Vse, CLAUDE_CODE_PACKAGE_MANAGER_AUTO_UPDATE: () => Yse, CLAUDE_CODE_PARSED_WILLOW: () => jte, CLAUDE_CODE_PEWTER_OWL: () => $ie, CLAUDE_CODE_PEWTER_OWL_TOOL: () => zie, CLAUDE_CODE_PLAN_MODE_REQUIRED: () => Zse, CLAUDE_CODE_PLUGIN_BINARY_ASSETS: () => Iie, CLAUDE_CODE_PLUGIN_DIRS: () => Bae, CLAUDE_CODE_PLUGIN_DIR_WATCH: () => jae, CLAUDE_CODE_PLUGIN_KEEP_MARKETPLACE_ON_FAILURE: () => Pie, CLAUDE_CODE_PLUGIN_PREFER_HTTPS: () => Lie, CLAUDE_CODE_PLUGIN_USE_ZIP_CACHE: () => Die, CLAUDE_CODE_POLISHED_DEWDROP: () => Ute, CLAUDE_CODE_POLL_EVENTS: () => Jse, CLAUDE_CODE_POLL_EVENT_DECLARATIONS: () => Xse, CLAUDE_CODE_POWERSHELL_RESPECT_EXECUTION_POLICY: () => Mie, CLAUDE_CODE_PROACTIVE: () => Qse, CLAUDE_CODE_PROJECTS_SESSION: () => kie, CLAUDE_CODE_PROMPT_CACHE_TTL: () => xae, CLAUDE_CODE_PROPAGATE_TRACEPARENT: () => Uie, CLAUDE_CODE_REFUSAL_FALLBACK_CATCH_ALL: () => lre, CLAUDE_CODE_REMOTE_TOOLS_FORWARD: () => Kae, CLAUDE_CODE_REMOTE_TOOLS_HOST_ALLOWS_UNATTENDED: () => tne, CLAUDE_CODE_REMOTE_TOOLS_HOST_IDLE_RELEASE_MINUTES: () => nne, CLAUDE_CODE_REMOTE_TOOLS_PIN_STORED_LOGIN: () => ene, CLAUDE_CODE_REMOVE_PROMPT_STRINGS: () => Hre, CLAUDE_CODE_REPORT_FINDINGS: () => cre, CLAUDE_CODE_RIPPLING_TULIP: () => ioe, CLAUDE_CODE_RUSTLING_PIXEL: () => Fte, CLAUDE_CODE_SANDBOX_LEAVE_DENIES_TO_SRT_WIN: () => eie, CLAUDE_CODE_SANDBOX_LEAVE_PARENT_FOLDERS_ALONE: () => tie, CLAUDE_CODE_SEND_FEEDBACK: () => yre, CLAUDE_CODE_SESSION_ATTENDED: () => Tse, CLAUDE_CODE_SILENT_TURN_REMINDER: () => Eoe, CLAUDE_CODE_SILENT_TURN_REMINDER_SECONDS: () => Coe, CLAUDE_CODE_SILENT_TURN_REMINDER_TEXT: () => Aoe, CLAUDE_CODE_SILENT_TURN_REMINDER_TURNS: () => boe, CLAUDE_CODE_SKILL_PROPOSALS: () => nie, CLAUDE_CODE_SKIP_PLUGIN_LOCAL_MCP_SERVERS: () => rie, CLAUDE_CODE_SKIP_PLUGIN_MCP_BUNDLES: () => oie, CLAUDE_CODE_SKIP_PLUGIN_MCP_SERVERS: () => sie, CLAUDE_CODE_SKIP_PLUGIN_MCP_SERVERS_EXCEPT: () => iie, CLAUDE_CODE_SKIP_PROJECT_BACKFILL: () => aie, CLAUDE_CODE_SKIP_PROMPT_HISTORY: () => lie, CLAUDE_CODE_SKIP_REPO_UPLOAD: () => cie, CLAUDE_CODE_SNAPPY_PELICAN: () => Nte, CLAUDE_CODE_STELLAR_DRIFT: () => zte, CLAUDE_CODE_STREAMED_BUMBLEBEE: () => coe, CLAUDE_CODE_STREAMED_BUMBLEBEE_TEXT: () => uoe, CLAUDE_CODE_STRICT_INLINE_SHELL_RM_PROMPT: () => pre, CLAUDE_CODE_SUBAGENT_CACHE_EVICT: () => uie, CLAUDE_CODE_SUBAGENT_CONFIG_WARNING: () => doe, CLAUDE_CODE_SUBAGENT_HISTORY: () => poe, CLAUDE_CODE_SUBAGENT_PROMPT_CACHE_TTL: () => vae, CLAUDE_CODE_SUBAGENT_PROMPT_SNAPSHOT: () => die, CLAUDE_CODE_SUPPRESS_SESSION_ATTRIBUTION: () => pie, CLAUDE_CODE_SYNC_PLUGINS: () => mie, CLAUDE_CODE_SYNC_PLUGIN_INSTALL: () => fie, CLAUDE_CODE_SYNC_SKILLS: () => gie, CLAUDE_CODE_TAG_ISMETA_MESSAGES: () => hie, CLAUDE_CODE_THINKING_DISPLAY_UPDATES: () => Ooe, CLAUDE_CODE_THISTLE_GREBE: () => Tte, CLAUDE_CODE_THRIFTY_SONIC: () => kte, CLAUDE_CODE_TOASTY_THIMBLE: () => xte, CLAUDE_CODE_TODO_REMINDER_MODE: () => roe, CLAUDE_CODE_TOTAL_TOKENS_REMINDER: () => ooe, CLAUDE_CODE_TOTAL_TOKENS_REMINDER_AFTER_USER_TURN: () => foe, CLAUDE_CODE_TOTAL_TOKENS_REMINDER_BUDGET: () => soe, CLAUDE_CODE_TRANSCRIPT_LOCAL_GC: () => _ie, CLAUDE_CODE_TURN_UPDATES: () => Soe, CLAUDE_CODE_TWO_STAGE_CLASSIFIER: () => yie, CLAUDE_CODE_USE_COWORK_PLUGINS: () => Sie, CLAUDE_CODE_USE_NATIVE_FILE_SEARCH: () => Eie, CLAUDE_CODE_USE_POWERSHELL_TOOL: () => bie, CLAUDE_CODE_WEBFETCH_CACHE_TTL_MS: () => Rie, CLAUDE_CODE_WEBFETCH_DEADLINE_MS: () => Oie, CLAUDE_CODE_WEBFETCH_USE_CCR_PROXY: () => Tie, CLAUDE_CODE_WEBSEARCH_CITATIONS: () => xie, CLAUDE_CODE_WEBSEARCH_USE_CCR_PROXY: () => wie, CLAUDE_CODE_WEB_FETCH_AGENT: () => Aie, CLAUDE_CODE_WEB_SEARCH_FAST_ARG: () => vie, CLAUDE_CODE_WHIMSICAL_ELEPHANT: () => Bte, CLAUDE_CODE_WILLOW_TERN: () => jre, CLAUDE_CODE_WISE_COMET: () => Hte, CLAUDE_CODE_WITTY_DEWDROP: () => wte, CLAUDE_CODE_WORKFLOWS: () => Are, CLAUDE_CODE_WORKFLOW_MAX_CONCURRENT_AGENTS: () => Yie, CLAUDE_CODE_WORKFLOW_PREFIX_STAGGER_MS: () => qie, CLAUDE_CODE_WORKFLOW_SIZE_WARNING_AGENTS: () => Wie, CLAUDE_CODE_WORKFLOW_SIZE_WARNING_TOKENS: () => Vie, CLAUDE_DISABLE_ADOPT: () => Hie, CLAUDE_IMPORT_CONVERSATIONS: () => jie, CLAUDE_RUNNER_DISABLE_AWAITING_ACTION_OVERRIDE: () => Bie, CLAUDE_RUNNER_DISABLE_TURN_BEGAN_BEFORE_INIT: () => Kie, CLAUDE_WORKFLOW_NAME_ONLY: () => Gie, DISABLE_AUTOUPDATER: () => Jie, DISABLE_AUTO_COMPACT: () => Zie, DISABLE_BRIEF_MODE_STOP_HOOK: () => Xie, DISABLE_BUG_COMMAND: () => Qie, DISABLE_COST_WARNINGS: () => eae, DISABLE_DOCTOR_COMMAND: () => tae, DISABLE_ERROR_REPORTING: () => nae, DISABLE_EXTRA_USAGE_COMMAND: () => rae, DISABLE_FEEDBACK_COMMAND: () => oae, DISABLE_GROWTHBOOK: () => sae, DISABLE_INSTALL_GITHUB_APP_COMMAND: () => iae, DISABLE_INTERLEAVED_THINKING: () => aae, DISABLE_LOGIN_COMMAND: () => lae, DISABLE_LOGOUT_COMMAND: () => cae, DISABLE_PROMPT_CACHING: () => uae, DISABLE_PROMPT_CACHING_FABLE: () => mae, DISABLE_PROMPT_CACHING_HAIKU: () => dae, DISABLE_PROMPT_CACHING_MYTHOS: () => gae, DISABLE_PROMPT_CACHING_OPUS: () => pae, DISABLE_PROMPT_CACHING_SONNET: () => fae, DISABLE_TELEMETRY: () => hae, DISABLE_UPDATES: () => _ae, DISABLE_UPGRADE_COMMAND: () => yae, EMBEDDED_SEARCH_TOOLS: () => $ae, ENABLE_BETA_TRACING_DETAILED: () => Sae, ENABLE_CLAUDEAI_MCP_SERVERS: () => Eae, ENABLE_ENHANCED_TELEMETRY_BETA: () => bae, ENABLE_LOCKLESS_UPDATES: () => Cae, ENABLE_LSP_TOOL: () => Aae, ENABLE_MCP_LARGE_OUTPUT_FILES: () => Rae, ENABLE_PID_BASED_VERSION_LOCKING: () => Oae, ENABLE_PROMPT_CACHING_1H: () => Tae, ENABLE_PROMPT_CACHING_1H_BEDROCK: () => wae, ENABLE_SESSION_BACKGROUNDING: () => Pae, ENABLE_SESSION_PERSISTENCE: () => Iae, ENABLE_TOOL_SEARCH: () => Dae, FORCE_AUTOUPDATE_PLUGINS: () => Lae, FORCE_CODE_TERMINAL: () => Nae, FORCE_PROMPT_CACHING_5M: () => Uae, FORCE_VCR: () => Fae, INK_SCREEN_READER: () => Ate, USE_API_CONTEXT_MANAGEMENT: () => zae });
var gb = {};
Rr(gb, { ALACRITTY_LOG: () => Pce, ALACRITTY_WINDOW_ID: () => Ice, ALLUSERSPROFILE: () => Dle, ANDROID_HOME: () => cce, ANDROID_SDK_ROOT: () => uce, APPDATA: () => Ale, APP_URL: () => dde, AWS_CA_BUNDLE: () => Zle, AWS_EXECUTION_ENV: () => Xue, AWS_LAMBDA_FUNCTION_NAME: () => Jue, AZURE_FUNCTIONS_ENVIRONMENT: () => ude, BAT_THEME: () => hde, BROWSER: () => cle, BUILDKITE: () => Iue, BUN_CHROME_PATH: () => gde, BUN_INSTALL: () => mde, CARGO_HTTP_CAINFO: () => Xle, CDPATH: () => Vae, CF_PAGES: () => Yue, CIRCLECI: () => Pue, CLOUDSDK_ACTIVE_CONFIG_NAME: () => ade, CLOUDSDK_CONFIG: () => ide, CLOUDSDK_CORE_CUSTOM_CA_CERTS_FILE: () => qle, CODER: () => Uue, CODER_WORKSPACE_NAME: () => Fue, CODESPACES: () => Nue, COLORFGBG: () => mce, COLORTERM: () => fce, COMPUTERNAME: () => Ele, COMSPEC: () => ele, CONTAINER_SANDBOX_MOUNT_POINT: () => ble, CURL_CA_BUNDLE: () => Vle, CURSOR_TRACE_ID: () => Jce, ComSpec: () => nle, ConEmuANSI: () => Kce, ConEmuPID: () => Gce, ConEmuTask: () => Wce, DAYTONA_WS_ID: () => Hue, DEMO_VERSION: () => Cde, DENO_CERT: () => Jle, DENO_DEPLOYMENT_ID: () => Zue, DISPLAY: () => ule, DO_NOT_TRACK: () => gce, DYNO: () => que, EDITOR: () => ale, FORCE_COLOR: () => pce, GCLOUD_PROJECT: () => tde, GCM_INTERACTIVE: () => sue, GH_CONFIG_DIR: () => cue, GH_ENTERPRISE_TOKEN: () => gue, GH_HOST: () => fue, GH_REPO: () => mue, GH_TOKEN: () => pue, GITHUB_ACTIONS: () => Eue, GITHUB_ACTION_INPUTS: () => bue, GITHUB_ACTION_PATH: () => Cue, GITHUB_ACTOR: () => Aue, GITHUB_ACTOR_ID: () => Rue, GITHUB_ENTERPRISE_TOKEN: () => _ue, GITHUB_ENV: () => yue, GITHUB_EVENT_NAME: () => Oue, GITHUB_EVENT_PATH: () => Tue, GITHUB_REPOSITORY: () => wue, GITHUB_REPOSITORY_ID: () => xue, GITHUB_REPOSITORY_OWNER: () => vue, GITHUB_REPOSITORY_OWNER_ID: () => kue, GITHUB_TOKEN: () => hue, GITHUB_WORKSPACE: () => Sue, GITLAB_CI: () => Due, GITPOD_WORKSPACE_ID: () => $ue, GIT_ASKPASS: () => oue, GIT_CONFIG_COUNT: () => iue, GIT_CONFIG_GLOBAL: () => aue, GIT_CONFIG_NOSYSTEM: () => oce, GIT_DIR: () => lue, GIT_SSH_COMMAND: () => nue, GIT_SSL_CAINFO: () => rce, GIT_SSL_CAPATH: () => sce, GIT_TERMINAL_PROMPT: () => rue, GNOME_TERMINAL_SERVICE: () => vce, GOOGLE_APPLICATION_CREDENTIALS: () => nde, GOOGLE_CLOUD_PROJECT: () => ede, GOOGLE_CLOUD_WORKSTATIONS: () => zue, GRPC_DEFAULT_SSL_ROOTS_FILE_PATH: () => ece, HEX_CACERTS_PATH: () => nce, HISTFILE: () => zle, HOME: () => Gae, HOMEDRIVE: () => xle, HOMEPATH: () => vle, HOMESHARE: () => kle, HTTPLIB2_CA_CERTS: () => Yle, HUB_CONFIG: () => uue, INTELLIJ_TERMINAL_COMMAND_BLOCKS: () => Vce, INTELLIJ_TERMINAL_COMMAND_BLOCKS_REWORKED: () => qce, IS_DEMO: () => bde, IS_SANDBOX: () => Ede, ITERM_SESSION_ID: () => Oce, JAVA_HOME: () => ace, JAVA_TOOL_OPTIONS: () => lce, KITTY_WINDOW_ID: () => Tce, KONSOLE_VERSION: () => wce, KUBERNETES_SERVICE_HOST: () => fde, K_SERVICE: () => Que, LANG: () => ple, LC_ALL: () => fle, LC_TERMINAL: () => Sce, LC_TIME: () => mle, LOCALAPPDATA: () => Rle, MSYSTEM: () => Bce, NETLIFY: () => Vue, NIX_SSL_CERT_FILE: () => tce, NODE_EXTRA_CA_CERTS: () => Ble, NODE_OPTIONS: () => Hle, NODE_PATH: () => jle, NO_COLOR: () => dce, NoDefaultCurrentDirectoryInExePath: () => ile, OneDrive: () => Ole, OneDriveCommercial: () => wle, OneDriveConsumer: () => Tle, P4PORT: () => _de, PATH: () => Wae, PATHEXT: () => sle, PIP_CERT: () => Qle, PLAYWRIGHT_BROWSERS_PATH: () => yde, PREFIX: () => Yae, PROGRAMDATA: () => Ile, PROJECT_DOMAIN: () => Kue, PWD: () => qae, ProgramData: () => Ple, ProgramFiles: () => ole, RENDER: () => Wue, REPL_ID: () => jue, REPL_SLUG: () => Bue, REQUESTS_CA_BUNDLE: () => Wle, RUNNER_ENVIRONMENT: () => Mue, RUNNER_OS: () => Lue, SAFEUSER: () => Lle, SESSIONNAME: () => Mce, SHELL: () => Qae, SPACE_CREATOR_USER_ID: () => pde, SSH_AUTH_SOCK: () => tue, SSH_CLIENT: () => Xce, SSH_CONNECTION: () => Qce, SSH_TTY: () => eue, SSL_CERT_DIR: () => Gle, SSL_CERT_FILE: () => Kle, STY: () => Nce, SUDO_GID: () => _le, SUDO_UID: () => hle, SUDO_USER: () => yle, SYSTEMROOT: () => tle, SystemRoot: () => rle, TEMP: () => Xae, TERM: () => hce, TERMINAL: () => Ece, TERMINAL_EMULATOR: () => bce, TERMINATOR_UUID: () => Cce, TERMUX_VERSION: () => Ace, TERM_PROGRAM: () => _ce, TERM_PROGRAM_VERSION: () => yce, TILIX_ID: () => Rce, TMP: () => Jae, TMPDIR: () => Zae, TMUX: () => Uce, TMUX_PANE: () => Fce, TRACEPARENT: () => Ade, TRACESTATE: () => Rde, USER: () => gle, USERNAME: () => Sle, USERPROFILE: () => Cle, USE_BUILTIN_RIPGREP: () => Sde, UV_THREADPOOL_SIZE: () => ice, VERCEL: () => Gue, VISUAL: () => lle, VSCODE_GIT_ASKPASS_MAIN: () => Zce, VTE_VERSION: () => kce, WAYLAND_DISPLAY: () => dle, WEBSITE_SITE_NAME: () => lde, WEBSITE_SKU: () => cde, WEZTERM_PANE: () => Dce, WSL_DISTRO_NAME: () => Hce, WSL_INTEROP: () => jce, WT_SESSION: () => Lce, XDG_CACHE_HOME: () => Fle, XDG_CONFIG_HOME: () => Nle, XDG_DATA_HOME: () => Ule, XDG_RUNTIME_DIR: () => Mle, XDG_STATE_HOME: () => $le, XTERM_VERSION: () => xce, ZDOTDIR: () => due, ZED_TERM: () => zce, ZELLIJ: () => $ce, __CFBundleIdentifier: () => Yce, gcloud_project: () => rde, google_application_credentials: () => sde, google_cloud_project: () => ode });
var _b = {};
Rr(_b, { AI_AGENT: () => mge, ALLOW_ANT_COMPUTER_USE_MCP: () => gge, ANTHROPIC_CONFIG_DIR: () => Ode, BASH_MAX_OUTPUT_LENGTH: () => e_e, CCR_BYOC_RESOURCE_WATCHDOG_TELEMETRY: () => U_e, CCR_SESSION_PROFILE: () => hge, CLAUBBIT: () => _ge, CLAUDECODE: () => yge, CLAUDE_AFK_COUNTDOWN_MS: () => t_e, CLAUDE_AFK_TIMEOUT_MS: () => n_e, CLAUDE_AFTER_LAST_COMPACT: () => Tde, CLAUDE_AGENTS_SELECT: () => wde, CLAUDE_AGENT_SDK_CLIENT_APP: () => xde, CLAUDE_AGENT_SDK_DISABLE_BUILTIN_AGENTS: () => Sge, CLAUDE_AGENT_SDK_DISABLE_MCP_MANIFESTS: () => Ege, CLAUDE_AGENT_SDK_MCP_NO_PREFIX: () => bge, CLAUDE_AGENT_SDK_VERSION: () => vde, CLAUDE_ARTIFACT_HOST_GRANT: () => kde, CLAUDE_ASYNC_AGENT_STALL_TIMEOUT_MS: () => r_e, CLAUDE_AUTOCOMPACT_PCT_OVERRIDE: () => Pde, CLAUDE_AUTO_BACKGROUND_TASKS: () => Cge, CLAUDE_BASH_MAINTAIN_PROJECT_WORKING_DIR: () => Age, CLAUDE_BG_AUTH_SNAPSHOT_PATH: () => Ide, CLAUDE_BG_AUTO_MEMORY_OFF: () => zde, CLAUDE_BG_BACKEND: () => Dde, CLAUDE_BG_CARRIED_PROMPTS_SHA256: () => Zde, CLAUDE_BG_CLAIM_AUTH: () => Lde, CLAUDE_BG_DISPATCHER_RATE_LIMIT_TIER: () => Mde, CLAUDE_BG_DISPATCHER_SUBSCRIPTION_TYPE: () => Nde, CLAUDE_BG_GATEWAY_WITHHELD: () => Fde, CLAUDE_BG_ISOLATION: () => Ude, CLAUDE_BG_MEMORY_TOGGLED_OFF: () => $de, CLAUDE_BG_POST_CLEAR_RESPAWN: () => Hde, CLAUDE_BG_PTY_AUTH: () => jde, CLAUDE_BG_RENDEZVOUS_SOCK: () => Bde, CLAUDE_BG_RV_AUTH: () => Kde, CLAUDE_BG_SESSION_PERMISSION_RULES: () => Gde, CLAUDE_BG_SOCKET_TOKENS_PATH: () => Wde, CLAUDE_BG_SOURCE: () => Vde, CLAUDE_BG_STARTUP_WEDGE_MS: () => o_e, CLAUDE_BG_TCC_DISCLAIMED: () => qde, CLAUDE_BG_WORKSPACE_TRUSTED: () => Yde, CLAUDE_BRIDGE_BASE_URL: () => Jde, CLAUDE_BRIDGE_OAUTH_TOKEN: () => Xde, CLAUDE_BRIDGE_REATTACH_GROUPING: () => Qde, CLAUDE_BRIDGE_REATTACH_NO_BACKFILL: () => Rge, CLAUDE_BRIDGE_REATTACH_OUTBOUND_ONLY: () => Oge, CLAUDE_BRIDGE_REATTACH_OWNER_ACCT: () => epe, CLAUDE_BRIDGE_REATTACH_OWNER_ORG: () => tpe, CLAUDE_BRIDGE_REATTACH_SEQ: () => s_e, CLAUDE_BRIDGE_REATTACH_SESSION: () => npe, CLAUDE_BRIDGE_SESSION_INGRESS_URL: () => rpe, CLAUDE_CHROME_PAIRED_DEVICE_ID: () => ope, CLAUDE_CHROME_PERMISSION_MODE: () => spe, CLAUDE_CHROME_TAB_GROUP_KEY: () => ipe, CLAUDE_CLIENT_PRESENCE_FILE: () => ape, CLAUDE_CODE_ACTION: () => lpe, CLAUDE_CODE_ADDITIONAL_DIRECTORIES_CLAUDE_MD: () => cpe, CLAUDE_CODE_ADDITIONAL_PROTECTION: () => Tge, CLAUDE_CODE_AGENT: () => upe, CLAUDE_CODE_AGENT_PROGRESS_SUMMARIES: () => dpe, CLAUDE_CODE_APPEND_PROMPT_HEAD: () => ppe, CLAUDE_CODE_ARTIFACT: () => fpe, CLAUDE_CODE_ARTIFACTS_API_BASE_URL: () => gpe, CLAUDE_CODE_ARTIFACTS_API_TOKEN: () => hpe, CLAUDE_CODE_ARTIFACT_ASSET_BASE_URL: () => _pe, CLAUDE_CODE_ARTIFACT_AUTO_OPEN: () => mpe, CLAUDE_CODE_ARTIFACT_LIVE_BASE_URL: () => ype, CLAUDE_CODE_ARTIFACT_SYNC_BASE_URL: () => Spe, CLAUDE_CODE_ARTIFACT_VIEWER_BASE_URL: () => Epe, CLAUDE_CODE_ATTACHMENTS_BY_PATH: () => bpe, CLAUDE_CODE_ATTRIBUTION_PROJECT: () => Cpe, CLAUDE_CODE_ATTRIBUTION_STATUS_TIMEOUT_MS: () => Ape, CLAUDE_CODE_AUTO_COMPACT_WINDOW: () => Ope, CLAUDE_CODE_AUTO_MODE_EXTERNAL_PERMISSIONS: () => wge, CLAUDE_CODE_AUTO_MODE_TIER: () => xge, CLAUDE_CODE_BASE_REF: () => Tpe, CLAUDE_CODE_BASE_REFS: () => wpe, CLAUDE_CODE_BLOCKING_LIMIT_OVERRIDE: () => xpe, CLAUDE_CODE_BRIDGE_CHILD_ARTIFACT: () => nfe, CLAUDE_CODE_BRIDGE_CHILD_AUTO_DEFAULT: () => tfe, CLAUDE_CODE_BRIDGE_CHILD_CLI_ENTRYPOINT: () => sfe, CLAUDE_CODE_BRIDGE_CHILD_MACHINE_SETTINGS: () => rfe, CLAUDE_CODE_BRIDGE_CHILD_PROJECTS_ENTRYPOINT: () => ofe, CLAUDE_CODE_BRIDGE_MCP_CARRIER: () => vpe, CLAUDE_CODE_BRIDGE_OWNER_ACCOUNT_UUID: () => kpe, CLAUDE_CODE_BRIDGE_OWNER_ORG_UUID: () => Ppe, CLAUDE_CODE_BRIDGE_PROMPT_SHA256: () => Dpe, CLAUDE_CODE_BRIDGE_SESSION_ID: () => Lpe, CLAUDE_CODE_BRIDGE_SOURCE_DIR: () => Ipe, CLAUDE_CODE_BRIEF: () => vge, CLAUDE_CODE_BRIEF_UPLOAD: () => kge, CLAUDE_CODE_CCR_EVENT_FLUSH_POLICY: () => Ahe, CLAUDE_CODE_CCR_SURFACE: () => Rhe, CLAUDE_CODE_CHROME_LATE_MCP_SERVER: () => pye, CLAUDE_CODE_CLASSIFIER_SUMMARY: () => Npe, CLAUDE_CODE_CONFIG_PROBE: () => ife, CLAUDE_CODE_CONFIG_WATCH_EVENTS: () => afe, CLAUDE_CODE_CONTAINER_ID: () => Upe, CLAUDE_CODE_COORDINATOR_SKILL_GUIDANCE: () => Pge, CLAUDE_CODE_DAEMON_COLD_START: () => Ige, CLAUDE_CODE_DECSTBM: () => Fpe, CLAUDE_CODE_DESKTOP_APP_VERSION: () => $pe, CLAUDE_CODE_DESKTOP_SKILLS_PLUGIN_DIR: () => Pfe, CLAUDE_CODE_DEV_RAW_CHANGELOG_URL: () => zpe, CLAUDE_CODE_DIFF_COPY_ROOT: () => Hpe, CLAUDE_CODE_DISABLE_ATTRIBUTION_BASELINE_REUSE: () => Rpe, CLAUDE_CODE_DISABLE_BG_SHELL_PRESSURE_REAP: () => Dge, CLAUDE_CODE_DISABLE_HOOK_FORWARDING: () => Bpe, CLAUDE_CODE_DISABLE_PLUGIN_FORWARDING: () => Kpe, CLAUDE_CODE_DISABLE_POOLED_CONNECTION_IDLE_LIMIT: () => Gpe, CLAUDE_CODE_DISABLE_QUIET_BACKGROUND_WAIT: () => Wpe, CLAUDE_CODE_DISABLE_TURN_HANDOFF: () => Vpe, CLAUDE_CODE_DISABLE_VITALS_EMITTER: () => qpe, CLAUDE_CODE_DISABLE_WORKING_SYNC: () => Ype, CLAUDE_CODE_DISABLE_WORKING_SYNC_WATCH: () => Zpe, CLAUDE_CODE_DONT_INHERIT_ENV: () => Lge, CLAUDE_CODE_DOWNLOAD_DEADLINE_MS_FOR_TESTING: () => Jpe, CLAUDE_CODE_EMIT_SESSION_STATE_EVENTS: () => Mge, CLAUDE_CODE_EMIT_STARTUP_TIMING: () => Fge, CLAUDE_CODE_EMIT_TOOL_USE_SUMMARIES: () => $ge, CLAUDE_CODE_EMIT_USER_PROMPT_SUBMIT_HOOK_EVENTS: () => zge, CLAUDE_CODE_ENTRYPOINT: () => Xpe, CLAUDE_CODE_ENTRYPOINT_ON_REQUESTS: () => Qpe, CLAUDE_CODE_ENVIRONMENT_KIND: () => efe, CLAUDE_CODE_ENVIRONMENT_RUNNER_VERSION: () => lfe, CLAUDE_CODE_EVAL_CONFINED: () => _he, CLAUDE_CODE_EXIT_AFTER_FIRST_RENDER: () => Hge, CLAUDE_CODE_EXIT_AFTER_STOP_DELAY: () => i_e, CLAUDE_CODE_FLAG_FETCH_WAIT_MS: () => jge, CLAUDE_CODE_FOOTER_INDICATOR: () => cfe, CLAUDE_CODE_FORCE_BRIDGE: () => Bge, CLAUDE_CODE_FORCE_EVALUATE_MEMORY: () => Kge, CLAUDE_CODE_FORCE_FULLSCREEN_UPSELL: () => Gge, CLAUDE_CODE_FORCE_MEMORY_SURVEY: () => Wge, CLAUDE_CODE_FORCE_TIP_ID: () => ufe, CLAUDE_CODE_GIT_BASH_PATH: () => dfe, CLAUDE_CODE_GLOB_TIMEOUT_SECONDS: () => a_e, CLAUDE_CODE_GOAL_CHECKIN_MINUTES: () => l_e, CLAUDE_CODE_HIDE_REPLY_SERVER_NAME: () => pfe, CLAUDE_CODE_HIDE_SETTINGS_HINT: () => mfe, CLAUDE_CODE_HOLD_REPORT_PARK_AT_INIT: () => Lhe, CLAUDE_CODE_HOME_SEED_HOLD_TIMEOUT_MS: () => gfe, CLAUDE_CODE_HOME_SEED_VERDICT_TIMEOUT_MS: () => hfe, CLAUDE_CODE_HOSTED_DESKTOP: () => qge, CLAUDE_CODE_HOST_PLATFORM: () => _fe, CLAUDE_CODE_HOST_PROMPT_SUPERSEDES_RECORD: () => Vge, CLAUDE_CODE_HOST_SESSION_ID: () => yfe, CLAUDE_CODE_HOST_SKILL_CATALOG: () => Sfe, CLAUDE_CODE_HOST_WORKTREE: () => Efe, CLAUDE_CODE_HOST_WORKTREE_FENCE: () => bfe, CLAUDE_CODE_IDE_HOST_OVERRIDE: () => Cfe, CLAUDE_CODE_IDLE_COMPACT_MIN_TOKENS: () => Afe, CLAUDE_CODE_IDLE_THRESHOLD_MINUTES: () => c_e, CLAUDE_CODE_IDLE_TOKEN_THRESHOLD: () => u_e, CLAUDE_CODE_IGNORE_PERSISTED_TRUST: () => ffe, CLAUDE_CODE_IS_COWORK: () => Yge, CLAUDE_CODE_JIT_POLICY_AFTER_STARTUP: () => fhe, CLAUDE_CODE_LAZY_ENV_GETTERS: () => hb, CLAUDE_CODE_LEGACY_BUNDLE: () => jpe, CLAUDE_CODE_LOOP_KEEPALIVE: () => Zge, CLAUDE_CODE_LOOP_PERSISTENT: () => Jge, CLAUDE_CODE_MANAGED_SETTINGS_PATH: () => Rfe, CLAUDE_CODE_MAX_CONCURRENT_SUBAGENTS: () => d_e, CLAUDE_CODE_MAX_MCP_DESCRIPTION_LENGTH: () => mye, CLAUDE_CODE_MAX_SUBAGENT_SPAWN_DEPTH: () => p_e, CLAUDE_CODE_MAX_WEB_SEARCHES_PER_SESSION: () => f_e, CLAUDE_CODE_MCP_ALLOWLIST_ENV: () => Ofe, CLAUDE_CODE_MCP_ALWAYS_LOAD_JOIN_BEFORE_INPUT: () => dye, CLAUDE_CODE_MCP_APPS_HOST: () => fye, CLAUDE_CODE_MCP_AUTO_BACKGROUND_MS: () => oye, CLAUDE_CODE_MCP_CONNECTOR_PREWAIT_MS: () => sye, CLAUDE_CODE_MCP_MEMORY_CGROUP: () => Ghe, CLAUDE_CODE_MCP_PREWAIT_SERVERS: () => aye, CLAUDE_CODE_MCP_PREWAIT_SERVERS_MS: () => lye, CLAUDE_CODE_MCP_STARTUP_WAIT_MS: () => iye, CLAUDE_CODE_MCP_TOOL_IDLE_TIMEOUT: () => rye, CLAUDE_CODE_MEMORY_CONTEXT_NO_WAIT: () => cge, CLAUDE_CODE_MEMORY_SUBAGENT_APPEND: () => uge, CLAUDE_CODE_MOCK_REMOTE_SETTINGS: () => Xge, CLAUDE_CODE_MOCK_TRIAL: () => Qge, CLAUDE_CODE_OVERRIDE_DATE: () => Tfe, CLAUDE_CODE_PARKED_PERMISSION_WAIT_MS: () => xhe, CLAUDE_CODE_PARKED_RUN_BEFORE_CLEAR: () => Dhe, CLAUDE_CODE_PARKED_STOP_RETIRES: () => Ihe, CLAUDE_CODE_PERFORCE_MODE: () => xfe, CLAUDE_CODE_PERSONAL_CONFIG_FIX: () => vfe, CLAUDE_CODE_PLAIN_DELTA_FAST_PATH: () => mhe, CLAUDE_CODE_PLAN_V2_AGENT_COUNT: () => g_e, CLAUDE_CODE_PLAN_V2_EXPLORE_AGENT_COUNT: () => h_e, CLAUDE_CODE_PLUGIN_ATTRIBUTION: () => kfe, CLAUDE_CODE_PLUGIN_CACHE_DIR: () => Ife, CLAUDE_CODE_PLUGIN_GIT_TIMEOUT_MS: () => __e, CLAUDE_CODE_PLUGIN_SEED_DIR: () => Dfe, CLAUDE_CODE_POST_TURN_MEMORY: () => ehe, CLAUDE_CODE_POST_TURN_MEMORY_CONFIG: () => Lfe, CLAUDE_CODE_POST_TURN_MEMORY_SYNC: () => the, CLAUDE_CODE_POWERUP_ONBOARDING: () => Mfe, CLAUDE_CODE_PROJECT_DIR_NAME: () => Nfe, CLAUDE_CODE_PWSH_PARSE_TIMEOUT_MS: () => y_e, CLAUDE_CODE_QUESTION_EXTENDED: () => Ffe, CLAUDE_CODE_QUESTION_OPTIONAL_DESCRIPTIONS: () => $fe, CLAUDE_CODE_QUESTION_PREVIEW_FORMAT: () => Ufe, CLAUDE_CODE_RELAUNCH_HOME_TRUST: () => zfe, CLAUDE_CODE_RELAUNCH_PROACTIVITY_BASELINE: () => Hfe, CLAUDE_CODE_RELAUNCH_PROACTIVITY_DECIDED: () => jfe, CLAUDE_CODE_RELAUNCH_PROACTIVITY_EVER_ON: () => Bfe, CLAUDE_CODE_RELAUNCH_PROACTIVITY_LEVEL: () => Kfe, CLAUDE_CODE_RELAUNCH_TERMINAL_SIZE: () => Gfe, CLAUDE_CODE_REMOTE: () => nhe, CLAUDE_CODE_REMOTE_ENVIRONMENT_TYPE: () => Wfe, CLAUDE_CODE_REMOTE_HERMETIC_MODE: () => rhe, CLAUDE_CODE_REMOTE_MCP_CONFIG: () => Vfe, CLAUDE_CODE_REMOTE_MEMORY_DIR: () => qfe, CLAUDE_CODE_REMOTE_RAW_EVENTS_FILE: () => Yfe, CLAUDE_CODE_REMOTE_SDK_URL: () => Zfe, CLAUDE_CODE_REMOTE_SEND_KEEPALIVES: () => ohe, CLAUDE_CODE_REMOTE_SESSION_ID: () => Jfe, CLAUDE_CODE_REMOTE_SESSION_ORIGIN: () => Xfe, CLAUDE_CODE_REMOTE_SETTINGS_PATH: () => Qfe, CLAUDE_CODE_REMOTE_SETTINGS_POLL_MS: () => S_e, CLAUDE_CODE_REPL: () => she, CLAUDE_CODE_REPO_CHECKOUTS: () => eme, CLAUDE_CODE_RESTRICTED: () => ihe, CLAUDE_CODE_RESTRICT_PERSONAL_CONFIG: () => ahe, CLAUDE_CODE_RESULT_NONCE: () => Mpe, CLAUDE_CODE_RESUME_FROM_SESSION: () => tme, CLAUDE_CODE_RESUME_INTERRUPTED_TURN: () => lhe, CLAUDE_CODE_RESUME_INTERRUPTED_TURN_MAX_AGE_MS: () => dhe, CLAUDE_CODE_RESUME_PROMPT: () => nme, CLAUDE_CODE_RESUME_REASON: () => ghe, CLAUDE_CODE_RESUME_SESSIONSTART_HOOKS_WAIT_MS: () => phe, CLAUDE_CODE_RESUME_SHOWS_CUT_OFF_CALLS: () => khe, CLAUDE_CODE_RESUME_SOURCE_ALIVE: () => che, CLAUDE_CODE_RESUME_THRESHOLD_MINUTES: () => E_e, CLAUDE_CODE_RESUME_TOKEN_THRESHOLD: () => b_e, CLAUDE_CODE_RESUME_TOLERATES_CONTEXT_APPENDS: () => vhe, CLAUDE_CODE_RESUME_TOLERATES_CONTEXT_SEEDS: () => Phe, CLAUDE_CODE_SAFE_MODE: () => hhe, CLAUDE_CODE_SANDBOXED: () => yhe, CLAUDE_CODE_SCRIPT_CAPS: () => C_e, CLAUDE_CODE_SCROLL_SPEED: () => rme, CLAUDE_CODE_SDK_READS_SESSION_STATE: () => Nge, CLAUDE_CODE_SDK_READS_STARTUP_MARKS: () => Uge, CLAUDE_CODE_SESSIONEND_HOOKS_TIMEOUT_MS: () => A_e, CLAUDE_CODE_SESSION_ID: () => ome, CLAUDE_CODE_SESSION_KIND: () => sme, CLAUDE_CODE_SESSION_NAME: () => ime, CLAUDE_CODE_SESSION_ORIGIN: () => ame, CLAUDE_CODE_SESSION_START_ANNOUNCEMENTS_BEFORE_PROMPT: () => She, CLAUDE_CODE_SHELL: () => lme, CLAUDE_CODE_SHELL_PREFIX: () => cme, CLAUDE_CODE_SIMPLE: () => Ehe, CLAUDE_CODE_SIMPLE_SYSTEM_PROMPT: () => ume, CLAUDE_CODE_SKILL_ATTRIBUTION: () => dme, CLAUDE_CODE_SKIP_MCP_DEBUG_LOG_FILES: () => uye, CLAUDE_CODE_SLEEP_COMPACT: () => pme, CLAUDE_CODE_SLEEP_COMPACT_AFTER_MS: () => fme, CLAUDE_CODE_SPAWNED_BY_SERVER: () => ege, CLAUDE_CODE_SPAWN_TIMESTAMP_MS: () => R_e, CLAUDE_CODE_SSE_PORT: () => O_e, CLAUDE_CODE_STALL_TIMEOUT_MS_FOR_TESTING: () => mme, CLAUDE_CODE_STARTUP_FAILURE_RESULTS: () => wfe, CLAUDE_CODE_STOP_HOOK_BLOCK_CAP: () => T_e, CLAUDE_CODE_SUBPROCESS_ENV_SCRUB: () => bhe, CLAUDE_CODE_SUPERVISED: () => Che, CLAUDE_CODE_SYNC_PLUGINS_BUFFERED_DOWNLOAD: () => Ohe, CLAUDE_CODE_SYNC_PLUGINS_DOWNLOAD_CONCURRENCY: () => The, CLAUDE_CODE_SYNC_PLUGINS_DOWNLOAD_STALL_MS: () => whe, CLAUDE_CODE_SYNC_PLUGINS_INSTALL_TIMEOUT_MS: () => x_e, CLAUDE_CODE_SYNC_PLUGINS_MCP_TIMEOUT_MS: () => v_e, CLAUDE_CODE_SYNC_PLUGIN_INSTALL_TIMEOUT_MS: () => w_e, CLAUDE_CODE_SYNC_REUSE_WITHIN_MS: () => k_e, CLAUDE_CODE_SYNC_SESSION_REFS: () => Mhe, CLAUDE_CODE_SYNC_SKILLS_INSTALL_TIMEOUT_MS: () => P_e, CLAUDE_CODE_SYNC_SKILLS_WAIT_TIMEOUT_MS: () => I_e, CLAUDE_CODE_SYNTAX_HIGHLIGHT: () => Nhe, CLAUDE_CODE_SYSTEM_PROMPT_GB_FEATURE: () => gme, CLAUDE_CODE_TAGS: () => hme, CLAUDE_CODE_TASK_LIST_ID: () => yme, CLAUDE_CODE_TEAM_TEARDOWN_PARK_TIMEOUT_MS: () => D_e, CLAUDE_CODE_TERMINAL_MCP_TOOLS: () => _me, CLAUDE_CODE_TEST_ALLOW_REAL_NETWORK: () => Uhe, CLAUDE_CODE_TEST_FIXTURES_ROOT: () => Sme, CLAUDE_CODE_TEST_FORCE_DENY: () => Fhe, CLAUDE_CODE_TEST_NO_GIT_BASH: () => $he, CLAUDE_CODE_TEST_NO_PWSH: () => zhe, CLAUDE_CODE_TMPDIR: () => Eme, CLAUDE_CODE_TMUX_PREFIX: () => bme, CLAUDE_CODE_TMUX_PREFIX_CONFLICTS: () => Hhe, CLAUDE_CODE_TMUX_SESSION: () => Cme, CLAUDE_CODE_TMUX_TRUECOLOR: () => jhe, CLAUDE_CODE_TOOL_MEMORY_CGROUP_EXCLUDE: () => Bhe, CLAUDE_CODE_TOOL_MEMORY_LIMIT: () => Khe, CLAUDE_CODE_TRANSCRIPT_SLIM_TOOL_RESULTS: () => uhe, CLAUDE_CODE_TRIGGER_ID: () => Ame, CLAUDE_CODE_TUI_JUST_SWITCHED: () => Whe, CLAUDE_CODE_TUI_TRIAL: () => Vhe, CLAUDE_CODE_ULTRAREVIEW_PREFLIGHT_FIXTURE: () => Rme, CLAUDE_CODE_ULTRAREVIEW_QUOTA_FIXTURE: () => Ome, CLAUDE_CODE_UPFRONT_TOOLS: () => cye, CLAUDE_CODE_USER_DIALOG_TIMEOUT_MS: () => L_e, CLAUDE_CODE_VOICE_FORWARD_INTERIMS_TYPED: () => qhe, CLAUDE_CODE_WARN_DISK_FREE_GIB: () => M_e, CLAUDE_CODE_WARN_MEMORY_FREE_GIB: () => N_e, CLAUDE_CODE_WEB_SEARCH_REFILLS_PER_HOUR: () => m_e, CLAUDE_CODE_WORKER_CHECKIN_SCHEDULE: () => Tme, CLAUDE_CODE_WORKER_EPOCH: () => F_e, CLAUDE_CODE_WORKSPACE_HOST_PATHS: () => wme, CLAUDE_CONFIG_DIR: () => xme, CLAUDE_COWORK_MEMORY_EXTRA_GUIDELINES: () => vme, CLAUDE_COWORK_MEMORY_GUIDELINES: () => kme, CLAUDE_COWORK_MEMORY_INDEX_CONTENT: () => Pme, CLAUDE_COWORK_MEMORY_PATH_OVERRIDE: () => Ime, CLAUDE_ENV_FILE: () => Dme, CLAUDE_FORCE_DISPLAY_SURVEY: () => Yhe, CLAUDE_INTERNAL_ASSISTANT_TEAM_NAME: () => Lme, CLAUDE_INTERNAL_FC_OVERRIDES: () => Mme, CLAUDE_INTERNAL_SESSION_TASK_LIST_ID: () => Nme, CLAUDE_JOB_DIR: () => Ume, CLAUDE_MEMORY_STORES: () => Fme, CLAUDE_PROJECT_UUID: () => $me, CLAUDE_PTY_HEARTBEAT_MS: () => $_e, CLAUDE_PTY_HOST_EXEC: () => zme, CLAUDE_PTY_HOST_NO_STABLE_PATH: () => Hme, CLAUDE_PTY_ORPHAN_CHECK_MS: () => z_e, CLAUDE_RELAUNCH_SESSION_ADD_DIRS: () => jme, CLAUDE_REMOTE_CONTROL_SESSION_NAME_PREFIX: () => Bme, CLAUDE_REMOTE_WORKFLOW_ARGS: () => Kme, CLAUDE_REMOTE_WORKFLOW_SCRIPT: () => Gme, CLAUDE_RUNNER_ACTIVITY_FD: () => H_e, CLAUDE_RUNNER_ALIVE_EVERY_MS: () => j_e, CLAUDE_RUNNER_CLIENT_PLATFORM: () => Wme, CLAUDE_RUNNER_FETCH_DEPTH: () => Vme, CLAUDE_RUNNER_FETCH_SERVER_PROGRESS_CAP_MS: () => qme, CLAUDE_RUNNER_UPDATE_BIN: () => B_e, CLAUDE_SECURESTORAGE_CONFIG_DIR: () => Yme, CLAUDE_SERVE_DRAIN_TIMEOUT_MS: () => K_e, CLAUDE_SNIP: () => Zme, CLAUDE_SSH_DAEMON_CHILD: () => Xme, CLAUDE_SSH_LOCAL_BINARY: () => Jme, CLAUDE_SSH_RUN_DIR: () => Qme, CLAUDE_SSH_VERSION: () => tge, CLAUDE_STAGE_FILE_ROOT: () => nge, CLAUDE_TMPDIR: () => rge, LOCAL_BRIDGE: () => Zhe, MCP_CONNECTION_NONBLOCKING: () => Jhe, MCP_CONNECT_TIMEOUT_MS: () => G_e, MCP_DISCOVERY_CACHE: () => W_e, MCP_DISCOVERY_CACHE_MAX_STALE_S: () => V_e, MCP_DISCOVERY_CACHE_STRIKES: () => q_e, MCP_DISCOVERY_CACHE_TTL_S: () => Y_e, MCP_OAUTH_CALLBACK_PORT: () => Z_e, MCP_OAUTH_CLIENT_METADATA_URL: () => oge, MCP_PROTOCOL_NEGOTIATION: () => J_e, MCP_REMOTE_SERVER_CONNECTION_BATCH_SIZE: () => X_e, MCP_SDK_GENERATION: () => eye, MCP_SERVER_CONNECTION_BATCH_SIZE: () => Q_e, MCP_TIMEOUT: () => tye, MCP_TOOL_TIMEOUT: () => nye, MCP_TRUNCATION_PROMPT_OVERRIDE: () => sge, SDK_NATIVE_BIN: () => ige, SESSION_INGRESS_URL: () => age, SLASH_COMMAND_TOOL_CHAR_BUDGET: () => gye, SYSTEM_REMINDER_MEMORY_CONTEXT: () => lge, TEST_ENABLE_SESSION_PERSISTENCE: () => Xhe, ULTRAPLAN_PROMPT_FILE: () => dge, VCR_RECORD: () => Qhe, VITALS_EMITTER_BIN: () => pge, VOICE_STREAM_BASE_URL: () => fge });
var yb = {};
Rr(yb, { ANTHROPIC_CUSTOM_MODEL_OPTION: () => Uye, ANTHROPIC_CUSTOM_MODEL_OPTION_DESCRIPTION: () => $ye, ANTHROPIC_CUSTOM_MODEL_OPTION_NAME: () => Fye, ANTHROPIC_DEFAULT_FABLE_MODEL: () => Sye, ANTHROPIC_DEFAULT_FABLE_MODEL_DESCRIPTION: () => bye, ANTHROPIC_DEFAULT_FABLE_MODEL_NAME: () => Eye, ANTHROPIC_DEFAULT_HAIKU_MODEL: () => xye, ANTHROPIC_DEFAULT_HAIKU_MODEL_DESCRIPTION: () => kye, ANTHROPIC_DEFAULT_HAIKU_MODEL_NAME: () => vye, ANTHROPIC_DEFAULT_MODEL: () => _ye, ANTHROPIC_DEFAULT_OPUS_MODEL: () => Cye, ANTHROPIC_DEFAULT_OPUS_MODEL_DESCRIPTION: () => Rye, ANTHROPIC_DEFAULT_OPUS_MODEL_NAME: () => Aye, ANTHROPIC_DEFAULT_SONNET_MODEL: () => Oye, ANTHROPIC_DEFAULT_SONNET_MODEL_DESCRIPTION: () => wye, ANTHROPIC_DEFAULT_SONNET_MODEL_NAME: () => Tye, ANTHROPIC_MODEL: () => hye, ANTHROPIC_SMALL_FAST_MODEL: () => yye, CLAUDE_CODE_3P_PROBE_WROTE_HAIKU_DEFAULT: () => Dye, CLAUDE_CODE_3P_PROBE_WROTE_OPUS_DEFAULT: () => Iye, CLAUDE_CODE_3P_PROBE_WROTE_SONNET_DEFAULT: () => Pye, CLAUDE_CODE_3P_SEEDED_OPUS_DEFAULT: () => Mye, CLAUDE_CODE_3P_SEEDED_SONNET_DEFAULT: () => Lye, CLAUDE_CODE_ALLOW_OTHER_MODELS: () => aSe, CLAUDE_CODE_ALWAYS_ENABLE_EFFORT: () => Jye, CLAUDE_CODE_AUTO_MODE_MODEL: () => Bye, CLAUDE_CODE_BG_CLASSIFIER_MODEL: () => Kye, CLAUDE_CODE_CLIENT_DATA_URL: () => iSe, CLAUDE_CODE_DISABLE_1M_CONTEXT: () => nSe, CLAUDE_CODE_DISABLE_EXPLORE_INHERIT_CAP: () => qye, CLAUDE_CODE_DISABLE_FAST_MODE: () => Qye, CLAUDE_CODE_DISABLE_LEGACY_MODEL_REMAP: () => Yye, CLAUDE_CODE_DISABLE_MODEL_ACCESS_FALLBACK: () => Vye, CLAUDE_CODE_DISABLE_UNKNOWN_MODEL_WINDOW_ENFORCEMENT: () => rSe, CLAUDE_CODE_EFFORT_LEVEL: () => Zye, CLAUDE_CODE_MAX_EFFORT_REMINDER: () => Xye, CLAUDE_CODE_MODEL_CATALOG: () => oSe, CLAUDE_CODE_MODEL_CATALOG_URL: () => sSe, CLAUDE_CODE_NO_MODEL_FALLBACK: () => Wye, CLAUDE_CODE_SKIP_FAST_MODE_NETWORK_ERRORS: () => eSe, CLAUDE_CODE_SKIP_FAST_MODE_ORG_CHECK: () => tSe, CLAUDE_CODE_SKIP_MODEL_ACCESS_MEMORY: () => Nye, CLAUDE_CODE_SUBAGENT_MODEL: () => zye, CLAUDE_CODE_SUBAGENT_MODEL_FORCE: () => Hye, CLAUDE_CODE_WORKFLOW_SUBAGENT_MODEL: () => jye, FALLBACK_FOR_ALL_PRIMARY_MODELS: () => Gye });
var Sb = {};
Rr(Sb, { ALL_PROXY: () => mSe, ANTHROPIC_BETAS: () => bSe, ANTHROPIC_CUSTOM_HEADERS: () => CSe, API_FORCE_IDLE_TIMEOUT: () => HSe, API_TIMEOUT_MS: () => USe, CLAUDE_BYTE_STREAM_IDLE_TIMEOUT_MS: () => tEe, CLAUDE_CODE_ATTRIBUTION_HEADER: () => OSe, CLAUDE_CODE_CERT_STORE: () => ESe, CLAUDE_CODE_CLIENT_CERT: () => hSe, CLAUDE_CODE_CLIENT_KEY: () => _Se, CLAUDE_CODE_CLIENT_KEY_PASSPHRASE: () => ySe, CLAUDE_CODE_DISABLE_MTLS_RELOAD_ON_STALE_CONNECTION: () => SSe, CLAUDE_CODE_EAGER_FLUSH: () => cEe, CLAUDE_CODE_EXTRA_BODY: () => ASe, CLAUDE_CODE_EXTRA_METADATA: () => RSe, CLAUDE_CODE_FILE_READ_MAX_OUTPUT_TOKENS: () => vSe, CLAUDE_CODE_FILE_READ_MAX_PDF_PAGES_PER_MESSAGE: () => kSe, CLAUDE_CODE_FILE_READ_MAX_PDF_PAGES_PER_TURN: () => PSe, CLAUDE_CODE_FORCE_SYNC_OUTPUT: () => uEe, CLAUDE_CODE_GZIP_CCR_REQUEST_BODIES: () => WSe, CLAUDE_CODE_GZIP_DATADOG_LOGS: () => VSe, CLAUDE_CODE_GZIP_REQUEST_BODIES: () => GSe, CLAUDE_CODE_GZIP_REQUEST_BODY_BLOCKS: () => YSe, CLAUDE_CODE_GZIP_REQUEST_BODY_LEVEL: () => qSe, CLAUDE_CODE_INCREMENTAL_REQUEST_BODY: () => ZSe, CLAUDE_CODE_MAX_CONTEXT_TOKENS: () => xSe, CLAUDE_CODE_MAX_OUTPUT_TOKENS: () => wSe, CLAUDE_CODE_MAX_RETRIES: () => TSe, CLAUDE_CODE_MAX_TOOL_USE_CONCURRENCY: () => ISe, CLAUDE_CODE_MAX_TURNS: () => DSe, CLAUDE_CODE_NONSTREAMING_TIMEOUT_RETRIES: () => FSe, CLAUDE_CODE_OVERLOADED_RETRY_BASE_DELAY_MS: () => $Se, CLAUDE_CODE_OVERLOADED_RETRY_MAX_DELAY_MS: () => zSe, CLAUDE_CODE_PRINT_BG_WAIT_CEILING_MS: () => fEe, CLAUDE_CODE_RETRY_WATCHDOG: () => oEe, CLAUDE_CODE_RETRY_WATCHDOG_MAX_USAGE_LIMIT_WAIT_MS: () => iEe, CLAUDE_CODE_RETRY_WATCHDOG_MAX_WAIT_MS: () => sEe, CLAUDE_CODE_RETRY_WATCHDOG_SCOPE: () => lEe, CLAUDE_CODE_RETRY_WATCHDOG_USAGE_LIMIT_RECHECK_MS: () => aEe, CLAUDE_CODE_SLOW_OPERATION_THRESHOLD_MS: () => pEe, CLAUDE_CODE_STREAM_EVENT_HOLD_MS: () => XSe, CLAUDE_CODE_STREAM_EVENT_MAX_LINE_BYTES: () => QSe, CLAUDE_CODE_UNWATCHED_REPLY_HOLD_MS: () => JSe, CLAUDE_ENABLE_BYTE_WATCHDOG: () => jSe, CLAUDE_ENABLE_BYTE_WATCHDOG_BEDROCK: () => BSe, CLAUDE_ENABLE_STREAM_WATCHDOG: () => KSe, CLAUDE_MOCK_HEADERLESS_429: () => dEe, CLAUDE_SLOW_FIRST_BYTE_MS: () => rEe, CLAUDE_STREAM_FIRST_BYTE_TIMEOUT_MS: () => nEe, CLAUDE_STREAM_IDLE_TIMEOUT_MS: () => eEe, HTTPS_PROXY: () => cSe, HTTP_PROXY: () => lSe, MAX_MCP_OUTPUT_TOKENS: () => NSe, MAX_STRUCTURED_OUTPUT_RETRIES: () => MSe, MAX_THINKING_TOKENS: () => LSe, NO_PROXY: () => uSe, all_proxy: () => gSe, http_proxy: () => dSe, https_proxy: () => pSe, no_proxy: () => fSe });
var Eb = {};
Rr(Eb, { AGENT_PROXY_URL: () => Lbe, ANTHROPIC_AWS_BASE_URL: () => wEe, ANTHROPIC_AWS_WORKSPACE_ID: () => xEe, ANTHROPIC_BASE_URL: () => EEe, ANTHROPIC_BEDROCK_BASE_URL: () => AEe, ANTHROPIC_BEDROCK_MANTLE_BASE_URL: () => TEe, ANTHROPIC_BEDROCK_REGION_PREFIX: () => REe, ANTHROPIC_BEDROCK_SERVICE_TIER: () => OEe, ANTHROPIC_FOUNDRY_BASE_URL: () => NEe, ANTHROPIC_FOUNDRY_RESOURCE: () => UEe, ANTHROPIC_GOOGLE_CLOUD_BASE_URL: () => IEe, ANTHROPIC_GOOGLE_CLOUD_LOCATION: () => kEe, ANTHROPIC_GOOGLE_CLOUD_PROJECT: () => vEe, ANTHROPIC_GOOGLE_CLOUD_WORKSPACE_ID: () => PEe, ANTHROPIC_SMALL_FAST_MODEL_AWS_REGION: () => JEe, ANTHROPIC_UNIX_SOCKET: () => XEe, ANTHROPIC_VERTEX_BASE_URL: () => DEe, ANTHROPIC_VERTEX_PROJECT_ID: () => LEe, AWS_ACCESS_KEY_ID: () => BEe, AWS_CONFIG_FILE: () => HEe, AWS_DEFAULT_REGION: () => $Ee, AWS_ENDPOINT_URL: () => WEe, AWS_ENDPOINT_URL_BEDROCK: () => VEe, AWS_ENDPOINT_URL_BEDROCK_RUNTIME: () => qEe, AWS_ENDPOINT_URL_STS: () => YEe, AWS_PROFILE: () => zEe, AWS_REGION: () => FEe, AWS_SECRET_ACCESS_KEY: () => KEe, AWS_SESSION_TOKEN: () => GEe, AWS_SHARED_CREDENTIALS_FILE: () => jEe, AWS_USE_FIPS_ENDPOINT: () => ZEe, CACERT_UPDATES: () => Cbe, CCR_AGENT_PROXY_CA_CERT_B64: () => wbe, CCR_AGENT_PROXY_CA_WATCH_ENABLED: () => xbe, CCR_AGENT_PROXY_ENABLED: () => pbe, CCR_AGENT_PROXY_FRAME_HOSTS: () => kbe, CCR_AGENT_PROXY_INCLUDE_HOSTS: () => ybe, CCR_AGENT_PROXY_JAVA_STORE_DIRECT_DISABLED: () => bbe, CCR_AGENT_PROXY_NO_PROXY_LOCAL_ONLY: () => Tbe, CCR_AGENT_PROXY_NSS_RECORDS_DISABLED: () => vbe, CCR_AGENT_PROXY_RECEIVE_GATE_DISABLED: () => Sbe, CCR_AGENT_PROXY_RELAY_MODE: () => hbe, CCR_AGENT_PROXY_UPLOAD_GATE_DISABLED: () => Ebe, CCR_ENABLE_BUNDLE: () => Pbe, CCR_FORCE_BUNDLE: () => Ibe, CCR_ON_BRANCH_DEFAULT_GUARD: () => Dbe, CLAUDE_CODE_AGENT_PROXY_GH_SHIM: () => mbe, CLAUDE_CODE_AGENT_PROXY_GIT_CONFIG: () => fbe, CLAUDE_CODE_AGENT_PROXY_GIT_HOSTS: () => gbe, CLAUDE_CODE_API_BASE_URL: () => CEe, CLAUDE_CODE_ENABLE_GATEWAY_MODEL_DISCOVERY: () => lbe, CLAUDE_CODE_GATEWAY_MODEL_DISCOVERY_TIMEOUT_MS: () => cbe, CLAUDE_CODE_GB_BASE_URL: () => ube, CLAUDE_CODE_GB_REFRESH_INTERVAL_MS: () => dbe, CLAUDE_CODE_HOST_GATEWAY_LINEAGE: () => ebe, CLAUDE_CODE_PROVIDER_MANAGED_BY_HOST: () => QEe, CLAUDE_CODE_PROXY_RESOLVES_HOSTS: () => nbe, CLAUDE_CODE_SIMULATE_PROXY_USAGE: () => tbe, CLAUDE_CODE_SKIP_HFI_VERSION_CHECK: () => Mbe, CLAUDE_CODE_USE_ANTHROPIC_AWS: () => _Ee, CLAUDE_CODE_USE_ANTHROPIC_GOOGLE_CLOUD: () => yEe, CLAUDE_CODE_USE_BEDROCK: () => mEe, CLAUDE_CODE_USE_FOUNDRY: () => hEe, CLAUDE_CODE_USE_GATEWAY: () => rbe, CLAUDE_CODE_USE_MANTLE: () => SEe, CLAUDE_CODE_USE_VERTEX: () => gEe, CLAUDE_GATEWAY_ALLOW_LOOPBACK: () => obe, CLAUDE_GATEWAY_DRAIN_TIMEOUT_MS: () => abe, CLAUDE_GATEWAY_LOG_LEVEL: () => ibe, CLAUDE_GATEWAY_PROXY_IS_EGRESS_BOUNDARY: () => sbe, CLOUD_ML_REGION: () => MEe, DPKG_ADMINDIR: () => Rbe, DPKG_MAINTSCRIPT_PACKAGE: () => Abe, DPKG_ROOT: () => Obe, SELF_HOSTED_RUNNER_AGENT_PROXY_URL: () => _be, _CLAUDE_CODE_ASSUME_FIRST_PARTY_BASE_URL: () => bEe });
var Jh = {};
Rr(Jh, { default: () => _o });
var Qh = {};
Rr(Qh, { default: () => yo });
var R_ = {};
Rr(R_, { default: () => bp });
function _f(e10) {
  return e10;
}
function Xy(e10, t) {
  let n = Buffer.from(t.replace(/-/g, ""), "hex"), r = crypto.createHash("sha1").update(n).update(Buffer.from(e10, "utf8")).digest();
  r[6] = r[6] & 15 | 80, r[8] = r[8] & 63 | 128;
  let o = r.subarray(0, 16).toString("hex");
  return `${o.slice(0, 8)}-${o.slice(8, 12)}-${o.slice(12, 16)}-${o.slice(16, 20)}-${o.slice(20, 32)}`;
}
var uJ = "3ab19d7e-9f35-45c2-926e-75e271cc60b3";
function tk() {
  let e10 = process.env.CLAUDE_CODE_REMOTE_SESSION_ID?.trim();
  return e10 ? Xy(e10, uJ) : null;
}
var dJ;
function be() {
  return dJ === true;
}
class xe {
  #e;
  #t = /* @__PURE__ */ new WeakMap();
  constructor(e10) {
    this.#e = e10;
  }
  of(e10) {
    let t = this.#t.get(e10);
    if (t !== void 0) return t;
    let n = this.#e();
    return this.#t.set(e10, n), n;
  }
}
var ok = globalThis.process?.getBuiltinModule?.("async_hooks"), Mi = ok ? (e10) => ok.AsyncResource.bind(e10) : (e10) => e10;
function Oe(e10) {
  if (!e10) return false;
  if (typeof e10 === "boolean") return e10;
  let t = String(e10).toLowerCase().trim();
  return ["1", "true", "yes", "on"].includes(t);
}
function Wr(e10) {
  if (e10 === void 0) return false;
  if (typeof e10 === "boolean") return !e10;
  let t = String(e10).toLowerCase().trim();
  return ["0", "false", "no", "off"].includes(t);
}
function $e() {
  let e10 = /* @__PURE__ */ new Set();
  return { subscribe(t) {
    let n = Mi(t);
    return e10.add(n), () => {
      e10.delete(n);
    };
  }, emit(...t) {
    let n;
    for (let r of e10) try {
      r(...t);
    } catch (o) {
      (n ??= []).push(o);
    }
    if (n) throw n.length === 1 ? n[0] : AggregateError(n, "Signal listener(s) threw");
  }, clear() {
    e10.clear();
  } };
}
function yf() {
  return { sent: /* @__PURE__ */ new Set(), rejected: /* @__PURE__ */ new Set(), declaredTools: void 0, noChannelTools: void 0, turnDeniedTools: void 0, declaredToolsDecided: false, nameOnlyAnnouncements: /* @__PURE__ */ new Set(), surfacedOnWire: /* @__PURE__ */ new Set(), definedByValue: /* @__PURE__ */ new Set(), inlineToolsRefusal: { rejectedHeader: void 0, announcementsByName: /* @__PURE__ */ new Set() }, advisorHeld: void 0, wireShapeSeed: void 0, webSearchHistoryRejected: false, mediaItemCap: void 0, refusedToolSchemas: /* @__PURE__ */ new Map(), systemMessagesAcceptedBy: /* @__PURE__ */ new Set(), nameOnlyEntries: { held: /* @__PURE__ */ new Set(), refused: false, reported: void 0 } };
}
function hJ(e10, t) {
  for (let n of t.sent) SJ(e10, n);
  for (let n of t.rejected) dk(e10, n);
  e10.wireShapeSeed = t;
}
function iS(e10) {
  let t = yf();
  if (t.declaredTools = e10.declaredTools, t.noChannelTools = e10.noChannelTools, t.turnDeniedTools = e10.turnDeniedTools, t.declaredToolsDecided = e10.declaredToolsDecided, t.advisorHeld = e10.advisorHeld, e10.wireShapeSeed !== void 0) hJ(t, e10.wireShapeSeed);
  let { rejectedHeader: n, announcementsByName: r } = e10.inlineToolsRefusal;
  if (n !== void 0) _J(t, n);
  yJ(t, r), t.webSearchHistoryRejected = e10.webSearchHistoryRejected, t.mediaItemCap = e10.mediaItemCap;
  for (let [o, s] of e10.refusedToolSchemas) t.refusedToolSchemas.set(o, s);
  return t.nameOnlyEntries.refused = e10.nameOnlyEntries.refused, t.nameOnlyEntries.reported = e10.nameOnlyEntries.reported, t;
}
function _J(e10, t) {
  dk(e10, t), e10.inlineToolsRefusal.rejectedHeader = t;
}
function yJ(e10, t) {
  for (let n of t) e10.inlineToolsRefusal.announcementsByName.add(n), e10.nameOnlyAnnouncements.add(n);
}
function SJ(e10, t) {
  if (!e10.rejected.has(t)) e10.sent.add(t);
}
function dk(e10, t) {
  e10.sent.delete(t), e10.rejected.add(t);
}
function aS(e10) {
  return process.platform === "darwin" ? e10.normalize("NFC") : e10;
}
function bJ(e10) {
  if (process.platform === "linux" || e10 === "/") return e10;
  return fs.realpathSync(e10);
}
function cS() {
  let e10 = "";
  if (typeof process < "u" && typeof process.cwd === "function" && typeof fs.realpathSync === "function") try {
    let t = Ws.cwd();
    try {
      e10 = aS(bJ(t));
    } catch {
      e10 = aS(t);
    }
  } catch {
  }
  return e10;
}
var fk = cS();
(() => {
  if (typeof process > "u" || typeof process.cwd !== "function") return null;
  try {
    return process.cwd();
  } catch {
    return null;
  }
})();
class uS {
  spawner = void 0;
  pairings = /* @__PURE__ */ new Map();
  mainEnsureInFlight = false;
  mainSlotBlocked = false;
}
var CJ = /^[A-Za-z0-9_.:-]{1,256}$/;
function AJ(e10) {
  return CJ.test(e10) ? e10 : "unreadable-tools-used-before-summary";
}
class dS {
  #e = /* @__PURE__ */ new Set();
  #t = 0;
  #n = false;
  #o;
  record(e10) {
    let t = false;
    for (let n of e10) {
      if (typeof n !== "string" || n === "") continue;
      let r = AJ(n);
      if (!this.#e.has(r)) this.#e.add(r), t = true;
    }
    if (t) this.#t++;
    return t;
  }
  has(e10) {
    return this.#e.has(e10);
  }
  names() {
    return [...this.#e];
  }
  size() {
    return this.#e.size;
  }
  generation() {
    return this.#t;
  }
  built(e10) {
    if (this.#o?.generation !== this.#t) this.#o = { generation: this.#t, value: e10(this.names()) };
    return this.#o.value;
  }
  reportTruncationOnce() {
    if (this.#n) return false;
    return this.#n = true, true;
  }
  replace(e10) {
    this.clear(), this.record(e10);
  }
  clear() {
    this.#e.clear(), this.#t++, this.#n = false;
  }
}
class pS {
  #e = yf();
  #t = void 0;
  #n;
  toolsUsed = new dS();
  stickyBetas() {
    return this.#e;
  }
  unlatchStickyBetas() {
    this.#e = iS(this.#e);
  }
  atisLatch() {
    return this.#t;
  }
  replaceAtisLatch(e10) {
    this.#t = e10, this.#n?.(e10);
  }
  watchAtisLatch(e10) {
    this.#n = e10;
  }
  reset() {
    this.#e = yf(), this.#t = void 0, this.toolsUsed.clear();
  }
}
var fS = { inputTokens: 0, outputTokens: 0, cacheReadInputTokens: 0, cacheCreationInputTokens: 0 };
function Ma(e10) {
  let t = /* @__PURE__ */ Object.create(null);
  return Object.assign(t, e10);
}
function mk(e10) {
  let t = Ma();
  for (let [n, r] of Object.entries(e10)) t[n] = { ...r };
  return t;
}
class mS {
  #e = 0;
  #t = 0;
  #n = 0;
  #o = 0;
  #a = Date.now();
  #u = void 0;
  #s = 0;
  #d = 0;
  #c = 0;
  #i = fS;
  #r = 0;
  #p = fS;
  #f = false;
  #l = 0;
  #m = Ma();
  #y = void 0;
  #g = null;
  #S = null;
  #_ = null;
  spendRecorded = $e();
  totalCostUSD() {
    return this.#e;
  }
  restoredCostUSD() {
    return this.#c;
  }
  restoredTokens() {
    return this.#i;
  }
  sideQueryCostUSD() {
    return this.#r;
  }
  totalAPIDuration() {
    return this.#t;
  }
  totalAPIDurationWithoutRetries() {
    return this.#n;
  }
  totalToolDuration() {
    return this.#o;
  }
  totalDuration() {
    return Math.max(0, Date.now() - this.#a);
  }
  sessionStartTime() {
    return this.#u ?? this.#a;
  }
  totalLinesAdded() {
    return this.#s;
  }
  totalLinesRemoved() {
    return this.#d;
  }
  hasUnknownModelCost() {
    return this.#f;
  }
  safetyStops() {
    return this.#l;
  }
  modelUsage() {
    return this.#m;
  }
  usageForModel(e10) {
    return this.#m[e10];
  }
  trackUsageSinceLastResult() {
    this.#y ??= Ma();
  }
  usageSinceLastResult() {
    return this.#y;
  }
  takeUsageSinceLastResult() {
    let e10 = this.#y;
    if (e10 !== void 0) this.#y = Ma();
    return e10;
  }
  totalInputTokens() {
    return this.#h("inputTokens");
  }
  totalOutputTokens() {
    return this.#h("outputTokens");
  }
  totalCacheReadInputTokens() {
    return this.#h("cacheReadInputTokens");
  }
  totalCacheCreationInputTokens() {
    return this.#h("cacheCreationInputTokens");
  }
  totalWebSearchRequests() {
    return this.#h("webSearchRequests");
  }
  #h(e10) {
    let t = 0;
    for (let n of Object.values(this.#m)) t += n[e10];
    return t;
  }
  recordApiDuration(e10, t) {
    this.#t += e10, this.#n += t;
  }
  spentTokens() {
    return this.#p;
  }
  recordSpentTokens(e10) {
    let t = this.#p;
    this.#p = { inputTokens: t.inputTokens + e10.inputTokens, outputTokens: t.outputTokens + e10.outputTokens, cacheReadInputTokens: t.cacheReadInputTokens + e10.cacheReadInputTokens, cacheCreationInputTokens: t.cacheCreationInputTokens + e10.cacheCreationInputTokens }, this.spendRecorded.emit();
  }
  recordCost(e10, t, n) {
    this.#m[n] = t, this.#e += e10, this.spendRecorded.emit();
  }
  recordSideQueryCost(e10) {
    if (Number.isFinite(e10) && e10 >= 0) this.#r += e10, this.spendRecorded.emit();
  }
  recordToolDuration(e10) {
    this.#o += e10;
  }
  recordLinesChanged(e10, t) {
    this.#s += e10, this.#d += t;
  }
  markUnknownModelCost() {
    this.#f = true;
  }
  recordSafetyStop() {
    this.#l += 1;
  }
  zeroDurationsAndCostForTests() {
    this.#t = 0, this.#n = 0, this.#e = 0, this.#c = 0;
  }
  restartClock() {
    this.#a = Date.now(), this.anchorLogicalStart(void 0);
  }
  anchorLogicalStart(e10) {
    this.#u = e10 === void 0 ? void 0 : Math.min(e10, this.#a);
  }
  restore({ totalCostUSD: e10, totalAPIDuration: t, totalAPIDurationWithoutRetries: n, totalToolDuration: r, totalLinesAdded: o, totalLinesRemoved: s, lastDuration: i, startTime: a, modelUsage: l, hasUnknownModelCost: c }, d) {
    if (this.#_ = d, this.#e = e10, this.#c = e10, this.#t = t, this.#n = n, this.#o = r, this.#s = o, this.#d = s, this.#f = c ?? false, l) this.#m = Ma(l);
    if (this.#i = { inputTokens: this.totalInputTokens(), outputTokens: this.totalOutputTokens(), cacheReadInputTokens: this.totalCacheReadInputTokens(), cacheCreationInputTokens: this.totalCacheCreationInputTokens() }, i !== void 0) this.#a = Date.now() - i;
    this.anchorLogicalStart(a);
  }
  registerSaver(e10) {
    this.#g = e10;
  }
  runSaver(e10, t) {
    (this.#g ?? (t ? t.#g : null))?.(e10);
  }
  registerTranscriptRecorder(e10) {
    this.#S = e10;
  }
  runTranscriptRecorder(e10, t, n) {
    (this.#S ?? (n ? n.#S : null))?.(e10, t);
  }
  snapshot() {
    return { ownerSessionId: this.#_, totalCostUSD: this.#e, totalAPIDuration: this.#t, totalAPIDurationWithoutRetries: this.#n, totalToolDuration: this.#o, startTime: this.#a, sessionLogicalStartTime: this.#u, totalLinesAdded: this.#s, totalLinesRemoved: this.#d, restoredCostUSD: this.#c, restoredTokens: this.#i, hasUnknownModelCost: this.#f, safetyStops: this.#l, modelUsage: mk(this.#m) };
  }
  restoreSnapshot(e10) {
    this.#_ = e10.ownerSessionId, this.#e = e10.totalCostUSD, this.#t = e10.totalAPIDuration, this.#n = e10.totalAPIDurationWithoutRetries, this.#o = e10.totalToolDuration, this.#a = e10.startTime, this.#u = e10.sessionLogicalStartTime, this.#s = e10.totalLinesAdded, this.#d = e10.totalLinesRemoved, this.#c = e10.restoredCostUSD, this.#i = e10.restoredTokens, this.#f = e10.hasUnknownModelCost, this.#l = e10.safetyStops, this.#m = mk(e10.modelUsage);
  }
  claim(e10) {
    this.#_ ??= e10;
  }
  scopeTo(e10) {
    this.#_ = e10;
  }
  ownerSessionId() {
    return this.#_;
  }
  belongsTo(e10) {
    return this.#_ === e10;
  }
  reset(e10) {
    this.#_ = e10, this.#e = 0, this.#c = 0, this.#i = fS, this.#t = 0, this.#n = 0, this.#o = 0, this.#a = Date.now(), this.anchorLogicalStart(void 0), this.#s = 0, this.#d = 0, this.#f = false, this.#l = 0, this.#m = Ma();
  }
}
class gS {
  #e = /* @__PURE__ */ new Set();
  #t = /* @__PURE__ */ new Map();
  consentSessionFallback(e10) {
    return this.#e.has(e10);
  }
  replaceConsentSessionFallback(e10, t) {
    if (t) this.#e.add(e10);
    else this.#e.delete(e10);
  }
  sessionConsentKey(e10) {
    return this.#t.get(e10) ?? null;
  }
  replaceSessionConsentKey(e10, t) {
    if (t === null) this.#t.delete(e10);
    else this.#t.set(e10, t);
  }
  reset() {
    this.#e.clear(), this.#t.clear();
  }
}
class hS {
  #e = { registeredHooks: null };
  #t = void 0;
  #n = void 0;
  holder() {
    return this.#e;
  }
  mainThreadAgentType() {
    return this.#t;
  }
  replaceMainThreadAgentType(e10) {
    this.#t = e10;
  }
  mainThreadAgentHooks() {
    return this.#n;
  }
  replaceMainThreadAgentHooks(e10) {
    this.#n = e10;
  }
  reset() {
    this.#e = { registeredHooks: null }, this.#t = void 0, this.#n = void 0;
  }
}
class _S {
  #e = /* @__PURE__ */ new Map();
  skills() {
    return this.#e;
  }
  lookup(e10) {
    return this.#e.get(e10);
  }
  record(e10, t) {
    this.#e.set(e10, t);
  }
  forget(e10) {
    this.#e.delete(e10);
  }
  forgetAll() {
    this.#e.clear();
  }
  reset() {
    this.#e = /* @__PURE__ */ new Map();
  }
}
class yS {
  #e = [];
  #t;
  #n;
  #o;
  #a;
  approvedServers() {
    return this.#e;
  }
  approveServers(e10, t) {
    for (let n of t) if (!this.#e.some((r) => r.name === n && r.workspaceKey === e10)) this.#e.push({ name: n, workspaceKey: e10 });
  }
  registerClientsAccessor(e10) {
    this.#t = e10;
  }
  acquireClientsAccessor(e10) {
    if (this.#t) return () => {
    };
    return this.#t = e10, () => {
      if (this.#t === e10) this.#t = void 0;
    };
  }
  clientsFromAccessor() {
    return this.#t?.();
  }
  registerConnectedClientWiring(e10) {
    this.#n = e10;
  }
  connectedClientWiring() {
    return this.#n;
  }
  registerToolsSwapper(e10) {
    this.#o = e10;
  }
  acquireToolsSwapper(e10) {
    if (this.#o) return () => {
    };
    return this.#o = e10, () => {
      if (this.#o === e10) this.#o = void 0;
    };
  }
  swapServerTools(e10, t, n) {
    if (!this.#o) return false;
    return this.#o(e10, t, n);
  }
  registerConnections(e10) {
    this.#a = e10;
  }
  acquireConnections(e10) {
    if (this.#a) return () => {
    };
    return this.#a = e10, () => {
      if (this.#a === e10) this.#a = void 0;
    };
  }
  connections() {
    return this.#a;
  }
  reset() {
    this.#e = [], this.#t = void 0;
  }
}
class SS {
  #e = void 0;
  #t = void 0;
  #n = void 0;
  #o = void 0;
  #a = void 0;
  #u = void 0;
  #s = false;
  #d = false;
  #c = void 0;
  #i = false;
  #r = void 0;
  #p = void 0;
  #f = void 0;
  mainLoopModelOverride() {
    return this.#e;
  }
  overrideMainLoopModel(e10) {
    this.#e = e10;
  }
  mainLoopEffortState() {
    return this.#t;
  }
  replaceMainLoopEffortState(e10) {
    this.#t = e10;
  }
  initialMainLoopModel() {
    return this.#n;
  }
  replaceInitialMainLoopModel(e10) {
    this.#n = e10;
  }
  initialModelSettingLayer() {
    return this.#o;
  }
  replaceInitialModelSettingLayer(e10) {
    this.#o = e10;
  }
  resolvedOrgDefault() {
    return this.#a;
  }
  replaceResolvedOrgDefault(e10) {
    this.#a = e10;
  }
  initialEnvDefaultModel() {
    return this.#u;
  }
  replaceInitialEnvDefaultModel(e10) {
    this.#u = e10;
  }
  refusalFallbackOccurred() {
    return this.#s;
  }
  markRefusalFallbackOccurred(e10) {
    this.#s = true, this.#c ??= e10;
  }
  refusalFallbackHeaderArmed() {
    return this.#d;
  }
  armRefusalFallbackHeader(e10) {
    this.#d = true, this.#c ??= e10;
  }
  refusalFallbackLatchOriginRequestId() {
    return this.#c;
  }
  silentLaneServerArmed() {
    return this.#i;
  }
  armSilentLaneFromServer() {
    this.#i = true;
  }
  forgetRefusalFallbackOccurred() {
    this.#s = false, this.#d = false, this.#i = false, this.#c = void 0;
  }
  refusalFallbackModelLatch() {
    return this.#r;
  }
  replaceRefusalFallbackModelLatch(e10, t = "superseded") {
    if (this.#r?.carriedEffort !== void 0 && e10?.carriedEffort === void 0) this.#p = t;
    this.#r = e10;
  }
  unlatchRefusalFallbackModel(e10) {
    this.replaceRefusalFallbackModelLatch(void 0, e10);
  }
  takeCarriedEffortEnd() {
    let e10 = this.#p;
    return this.#p = void 0, e10;
  }
  availabilityFallbackChain() {
    return this.#f;
  }
  replaceAvailabilityFallbackChain(e10) {
    this.#f = e10;
  }
  reset() {
    this.#e = void 0, this.#t = void 0, this.#n = void 0, this.#o = void 0, this.#a = void 0, this.#u = void 0, this.#s = false, this.#d = false, this.#i = false, this.#c = void 0, this.#r = void 0, this.#p = void 0, this.#f = void 0;
  }
}
class ES {
  #e = /* @__PURE__ */ new Map();
  #t = 0;
  #n = void 0;
  sections() {
    return this.#e;
  }
  recordSection(e10, t) {
    this.#e.set(e10, t);
  }
  forgetAllSections() {
    this.#e.clear();
  }
  noteInvalidation(e10 = "other") {
    this.#t += 1, this.#n = e10;
  }
  epoch() {
    return this.#t;
  }
  lastInvalidationReason() {
    return this.#n;
  }
  reset() {
    this.#e = /* @__PURE__ */ new Map();
  }
}
class bS {
  #e = null;
  #t = null;
  #n = null;
  #o = null;
  #a = null;
  #u = 0;
  #s = null;
  #d = void 0;
  #c = 0;
  #i = void 0;
  #r = null;
  #p = null;
  #f = null;
  #l = null;
  #m = null;
  #y = false;
  #g = null;
  #S = null;
  #_ = false;
  lastAPIRequest() {
    return this.#e;
  }
  replaceLastAPIRequest(e10) {
    this.#e = e10;
  }
  lastCancelledAPIMessageId() {
    return this.#t;
  }
  replaceLastCancelledAPIMessageId(e10) {
    this.#t = e10;
  }
  lastAPIRequestMessages() {
    return this.#n;
  }
  replaceLastAPIRequestMessages(e10) {
    this.#n = e10;
  }
  lastClassifierRequests() {
    return this.#o;
  }
  replaceLastClassifierRequests(e10) {
    this.#o = e10;
  }
  promptId() {
    return this.#a;
  }
  replacePromptId(e10) {
    this.#a = e10;
  }
  promptIndex() {
    return this.#u;
  }
  replacePromptIndex(e10) {
    this.#u = e10;
  }
  incrementPromptIndex() {
    return this.#u++, this.#u;
  }
  lastPersonPrompt() {
    return this.#s;
  }
  replaceLastPersonPrompt(e10) {
    this.#s = e10;
  }
  lastMainRequestId() {
    return this.#d;
  }
  replaceLastMainRequestId(e10, t) {
    if (this.#d = e10, this.#i = t, e10 === void 0) this.#c += 1;
  }
  lastMainResponse() {
    return this.#i;
  }
  mainChainReleaseCount() {
    return this.#c;
  }
  lastMainThreadCacheTtlMs() {
    return this.#r;
  }
  replaceLastMainThreadCacheTtlMs(e10, t, n = false) {
    this.#r = e10, this.#l = Date.now(), this.#f = { ttlMs: e10, model: t, requestAt: this.#l, askedAt: n ? this.#f?.askedAt ?? this.#l : this.#l }, this.#m = this.#l, this.#y = true;
  }
  isLastMainThreadAskLive(e10, t) {
    let n = this.#f;
    return n !== null && n.requestAt === this.#l && n.ttlMs === e10 && n.model === t && Date.now() - n.askedAt < e10;
  }
  adjustLastMainThreadCacheTtlMs(e10) {
    this.#r = e10;
  }
  recordLastMainThreadCacheRenewal(e10) {
    if (this.#l !== null) this.#p = { requestAt: this.#l, at: Math.max(e10, this.lastMainThreadCacheRenewedAt() ?? -1 / 0) };
  }
  lastMainThreadCacheRenewedAt() {
    let e10 = this.#p;
    return e10 !== null && e10.requestAt === this.#l ? e10.at : null;
  }
  lastLiveMainThreadRequestAt() {
    return this.#m;
  }
  lastMainThreadRequestAt() {
    return this.#l;
  }
  mainThreadRequestedInProcess() {
    return this.#y;
  }
  recordMainThreadTurnStart() {
    this.#y = true;
  }
  replaceLastMainThreadRequest(e10, t) {
    this.#l = e10, this.#r = t;
  }
  lastMainThreadContextTokens() {
    return this.#g;
  }
  replaceLastMainThreadContextTokens(e10) {
    this.#g = e10;
  }
  stageResumeSeed(e10) {
    this.#h = e10;
  }
  applyResumeSeed(e10) {
    this.#h = null, this.#r = e10.ttlMs, this.#l = e10.requestAt, this.#g = e10.contextTokens;
  }
  #h = null;
  clearLastMainThreadRequest(e10) {
    let t = e10 !== void 0 && this.#h?.sessionId === e10 ? this.#h : null;
    this.#h = null, this.#r = t?.ttlMs ?? null, this.#l = t?.requestAt ?? null, this.#g = t?.contextTokens ?? null, this.#m = null, this.#y = false;
  }
  lastApiCompletionTimestamp() {
    return this.#S;
  }
  replaceLastApiCompletionTimestamp(e10) {
    this.#S = e10;
  }
  pendingPostCompaction() {
    return this.#_;
  }
  replacePendingPostCompaction(e10) {
    this.#_ = e10;
  }
  reset() {
    this.#e = null, this.#t = null, this.#n = null, this.#o = null, this.#a = null, this.#u = 0, this.#s = null, this.#d = void 0, this.#i = void 0, this.#c += 1, this.#r = null, this.#l = null, this.#m = null, this.#y = false, this.#g = null, this.#h = null, this.#S = null, this.#_ = false;
  }
}
class CS {
  #e = [];
  #t = /* @__PURE__ */ Object.create(null);
  #n = null;
  #o = void 0;
  #a = 0;
  #u = false;
  #s = 0;
  changed = $e();
  pendingLoopWakeup = $e();
  tasks() {
    return this.#e;
  }
  schedule(e10) {
    this.#e.push(e10);
  }
  replaceTasks(e10) {
    this.#e = e10;
  }
  chainStartedAt(e10) {
    return this.#t[e10];
  }
  recordChainStart(e10, t) {
    this.#t[e10] = t;
  }
  forgetChainStart(e10) {
    delete this.#t[e10];
  }
  tickInFlightPrompt() {
    return this.#n;
  }
  tickInFlightPlugin() {
    return this.#o;
  }
  replaceTickInFlightPrompt(e10, t) {
    this.#n = e10, this.#o = e10 === null ? void 0 : t;
  }
  consecutiveKeepalives() {
    return this.#a;
  }
  replaceConsecutiveKeepalives(e10) {
    this.#a = e10;
  }
  ended() {
    return this.#u;
  }
  replaceEnded(e10) {
    this.#u = e10;
  }
  wakeFires() {
    return this.#s;
  }
  recordWakeFire() {
    this.#s++;
  }
  resetWakeFires() {
    this.#s = 0;
  }
  reset() {
    this.#e = [], this.#t = /* @__PURE__ */ Object.create(null), this.#n = null, this.#o = void 0, this.#a = 0, this.#u = false, this.#s = 0;
  }
}
class AS {
  #e = false;
  #t = false;
  #n = false;
  #o = false;
  #a = false;
  #u = false;
  #s = false;
  #d = false;
  #c = false;
  #i = false;
  #r = false;
  #p = void 0;
  #f = false;
  #l = void 0;
  #m = false;
  #y = false;
  #g = null;
  #S = null;
  #_ = null;
  #h = false;
  #E = null;
  #C = false;
  #b = false;
  #w = false;
  #R = false;
  #T = false;
  #v = void 0;
  #O = void 0;
  #I = void 0;
  #k = void 0;
  #x = null;
  #L = null;
  onboardingShownThisSession() {
    return this.#e;
  }
  replaceOnboardingShownThisSession(e10) {
    this.#e = e10;
  }
  lspRecommendationShownThisSession() {
    return this.#t;
  }
  replaceLspRecommendationShownThisSession(e10) {
    this.#t = e10;
  }
  sessionTrustAccepted() {
    return this.#n;
  }
  replaceSessionTrustAccepted(e10) {
    this.#n = e10;
  }
  homeTrustDialogAccepted() {
    return this.#o;
  }
  replaceHomeTrustDialogAccepted(e10) {
    this.#o = e10;
  }
  hasExitedPlanMode() {
    return this.#a;
  }
  replaceHasExitedPlanMode(e10) {
    this.#a = e10;
  }
  needsPlanModeExitAttachment() {
    return this.#u;
  }
  replaceNeedsPlanModeExitAttachment(e10) {
    this.#u = e10;
  }
  needsAutoModeExitAttachment() {
    return this.#s;
  }
  replaceNeedsAutoModeExitAttachment(e10) {
    this.#s = e10;
  }
  memoryToggledOff() {
    return this.#d;
  }
  replaceMemoryToggledOff(e10) {
    this.#d = e10;
  }
  autoMemoryOffThisSession() {
    return this.#c;
  }
  replaceAutoMemoryOffThisSession(e10) {
    this.#c = e10;
  }
  memoryPausedByCommand() {
    return this.#r;
  }
  replaceMemoryPausedByCommand(e10) {
    this.#r = e10;
  }
  accountMemorySessionMode() {
    return this.#p;
  }
  replaceAccountMemorySessionMode(e10, t = false) {
    this.#p = e10, this.#f = t && e10 !== void 0;
  }
  accountMemorySessionModeRestored() {
    return this.#f;
  }
  accountMemoryLaunchMode() {
    return this.#l;
  }
  replaceAccountMemoryLaunchMode(e10) {
    this.#l = e10;
  }
  restoredMemoryPause() {
    return this.#m;
  }
  replaceRestoredMemoryPause(e10) {
    this.#m = e10;
  }
  restoredAutoMemoryOff() {
    return this.#i;
  }
  replaceRestoredAutoMemoryOff(e10) {
    this.#i = e10;
  }
  teardownUnwindRequested() {
    return this.#h;
  }
  replaceTeardownUnwindRequested(e10) {
    this.#h = e10;
  }
  backgroundAutoModeSetupInFlight() {
    return this.#y;
  }
  replaceBackgroundAutoModeSetupInFlight(e10) {
    this.#y = e10;
  }
  deferredToolStubGateLatch() {
    return this.#g;
  }
  replaceDeferredToolStubGateLatch(e10) {
    this.#g = e10;
  }
  verifySkillRolloutGateLatch() {
    return this.#S;
  }
  replaceVerifySkillRolloutGateLatch(e10) {
    this.#S = e10;
  }
  commitSkillRolloutGateLatch() {
    return this.#_;
  }
  replaceCommitSkillRolloutGateLatch(e10) {
    this.#_ = e10;
  }
  memoryToolsShapeLatch() {
    return this.#E;
  }
  replaceMemoryToolsShapeLatch(e10) {
    this.#E = e10;
  }
  proposeGoalAvailabilityLogged() {
    return this.#C;
  }
  markProposeGoalAvailabilityLogged() {
    this.#C = true;
  }
  activeRoutine() {
    return this.#I;
  }
  replaceActiveRoutine(e10) {
    this.#I = e10;
  }
  inheritedTeamName() {
    return this.#k;
  }
  replaceInheritedTeamName(e10) {
    this.#k = e10;
  }
  teleportedSessionInfo() {
    return this.#x;
  }
  replaceTeleportedSessionInfo(e10) {
    this.#x = e10;
  }
  markFirstTeleportMessageLogged() {
    if (this.#x) this.#x.hasLoggedFirstMessage = true;
  }
  cachedClaudeMdContent() {
    return this.#L;
  }
  replaceCachedClaudeMdContent(e10) {
    this.#L = e10;
  }
  accountSkillsSyncEnabled() {
    return this.#b;
  }
  replaceAccountSkillsSyncEnabled(e10) {
    this.#b = e10;
  }
  skillsSyncVetoed() {
    return this.#w;
  }
  replaceSkillsSyncVetoed(e10) {
    this.#w = e10;
  }
  accountPluginsSyncEnabled() {
    return this.#R;
  }
  replaceAccountPluginsSyncEnabled(e10) {
    this.#R = e10;
  }
  pluginsSyncVetoed() {
    return this.#T;
  }
  replacePluginsSyncVetoed(e10) {
    this.#T = e10;
  }
  armPendingContextCompacted(e10, t) {
    this.#v = e10, this.#O = t;
  }
  consumePendingContextCompacted() {
    let e10 = this.#v;
    return this.#v = void 0, e10;
  }
  forgetPendingContextCompacted() {
    this.#v = void 0, this.#O = void 0;
  }
  responseBeforeCompaction() {
    return this.#O;
  }
  forgetResponseBeforeCompaction() {
    this.#O = void 0;
  }
  reset() {
    this.#b = false, this.#w = false, this.#R = false, this.#T = false, this.#e = false, this.#t = false, this.#n = false, this.#o = false, this.#a = false, this.#u = false, this.#s = false, this.#d = false, this.#c = false, this.#r = false, this.#p = void 0, this.#f = false, this.#l = void 0, this.#m = false, this.#i = false, this.#h = false, this.#y = false, this.#g = null, this.#S = null, this.#_ = null, this.#E = null, this.#C = false, this.#I = void 0, this.#k = void 0, this.#x = null, this.#L = null, this.#v = void 0, this.#O = void 0;
  }
}
function gk() {
  return { messagesArriving: 0, lastInLine: Promise.resolve(), gaveUpOn: void 0, besideLine: 0, lastBesideLine: Promise.resolve(), gaveUpOnBeside: void 0, pathsArrivingBeside: /* @__PURE__ */ new Map(), toolCallsWaiting: 0, pathsArriving: /* @__PURE__ */ new Map() };
}
class RS {
  #e = /* @__PURE__ */ new Map();
  #t = /* @__PURE__ */ new Map();
  #n = null;
  #o = /* @__PURE__ */ new Map();
  #a = /* @__PURE__ */ new Set();
  #u = /* @__PURE__ */ new Set();
  #s = /* @__PURE__ */ new Set();
  #d = /* @__PURE__ */ new Set();
  #c = /* @__PURE__ */ new Set();
  #i = /* @__PURE__ */ new Set();
  #r = /* @__PURE__ */ new Set();
  #p = /* @__PURE__ */ new Set();
  #f = /* @__PURE__ */ new Set();
  #l = /* @__PURE__ */ new Set();
  #m = /* @__PURE__ */ new Map();
  #y = /* @__PURE__ */ new Map();
  #g = /* @__PURE__ */ new Map();
  #S;
  #_ = { byFileUuid: /* @__PURE__ */ new Map(), recentPrefetchStarts: [] };
  #h = gk();
  #E = /* @__PURE__ */ new Set();
  #C = void 0;
  #b = void 0;
  #w = void 0;
  #R = void 0;
  #T = void 0;
  planSlugCache() {
    return this.#e;
  }
  forgetPlanSlug(e10) {
    this.#e.delete(e10);
  }
  pendingBranchLinks() {
    return this.#t;
  }
  replacePendingBranchLinks() {
    this.#t = /* @__PURE__ */ new Map();
  }
  vimSharedState() {
    return this.#n;
  }
  replaceVimSharedState(e10) {
    this.#n = e10;
  }
  agentColorMap() {
    return this.#o;
  }
  sessionCreatedTeams() {
    return this.#a;
  }
  sessionSpawnedTeammatePanes() {
    return this.#u;
  }
  surfacedHookSpawnFailures() {
    return this.#s;
  }
  bareMcpServerMatchersWarned() {
    return this.#d;
  }
  pendingConversationEditKinds() {
    return this.#c;
  }
  clientTruncatedAssistantIds() {
    return this.#i;
  }
  heldStatelessReplyIds() {
    return this.#r;
  }
  unsupportedThreadKeys() {
    return this.#p;
  }
  pendingPrLinks() {
    return this.#f;
  }
  policyPredicateTelemetryEmitted() {
    return this.#l;
  }
  humanAttachmentDigests() {
    return this.#m;
  }
  inboundAttachmentFiles() {
    return this.#y;
  }
  filesPlacedByName() {
    return this.#g;
  }
  filesPlacedByNameRead() {
    return this.#S;
  }
  setFilesPlacedByNameRead(e10) {
    this.#S = e10;
  }
  inboundAttachmentDownloads() {
    return this.#_;
  }
  arrivingInboundFiles() {
    return this.#h;
  }
  chromeAvailabilityStagesLogged() {
    return this.#E;
  }
  replaceChromeAvailabilityStagesLogged(e10) {
    if (this.#E = /* @__PURE__ */ new Set(), e10) this.#C = Date.now();
  }
  chromeAvailabilityAnchorMs() {
    return this.#C;
  }
  pendingGoalIdleCheckin() {
    return this.#b;
  }
  replacePendingGoalIdleCheckin(e10) {
    this.#b = e10;
  }
  pendingGoalReprompt() {
    return this.#w;
  }
  replacePendingGoalReprompt(e10) {
    this.#w = e10;
  }
  goalInterruptionStreak() {
    return this.#R;
  }
  replaceGoalInterruptionStreak(e10) {
    this.#R = e10;
  }
  workerCheckin() {
    return this.#T;
  }
  replaceWorkerCheckin(e10) {
    this.#T = e10;
  }
  reset() {
    this.#e = /* @__PURE__ */ new Map(), this.#t = /* @__PURE__ */ new Map(), this.#n = null, this.#o = /* @__PURE__ */ new Map(), this.#a = /* @__PURE__ */ new Set(), this.#u = /* @__PURE__ */ new Set(), this.#s = /* @__PURE__ */ new Set(), this.#d = /* @__PURE__ */ new Set(), this.#c = /* @__PURE__ */ new Set(), this.#i = /* @__PURE__ */ new Set(), this.#r = /* @__PURE__ */ new Set(), this.#p = /* @__PURE__ */ new Set(), this.#f = /* @__PURE__ */ new Set(), this.#l = /* @__PURE__ */ new Set(), this.#m = /* @__PURE__ */ new Map(), this.#y = /* @__PURE__ */ new Map(), this.#g = /* @__PURE__ */ new Map(), this.#S = void 0;
    for (let e10 of this.#_.byFileUuid.values()) clearTimeout(e10.expiry), e10.abort.abort();
    this.#_ = { byFileUuid: /* @__PURE__ */ new Map(), recentPrefetchStarts: [] }, this.#h = gk(), this.#E = /* @__PURE__ */ new Set(), this.#C = void 0, clearTimeout(this.#b), this.#b = void 0, clearTimeout(this.#w), this.#w = void 0, this.#R = void 0, clearInterval(this.#T?.timer), this.#T = void 0;
  }
}
var hk = { renderTarget: "ink", workspace: "local", canDrive: true, transcriptSource: "local-jsonl", remote: null };
class OS {
  #e = false;
  #t = void 0;
  #n = void 0;
  #o = void 0;
  #a = void 0;
  #u = void 0;
  #s = void 0;
  #d = null;
  #c = false;
  #i = void 0;
  #r = hk;
  #p = false;
  #f = "idle";
  #l = null;
  attacherCapsChanged = $e();
  rvSupervisorLinkChanged = $e();
  cloudCwdChanged = $e();
  sdkDialogHostActive() {
    return this.#e;
  }
  markSdkDialogHostActive(e10) {
    this.#e = e10;
  }
  sdkSupportedDialogKinds() {
    return this.#t;
  }
  sdkSupportedDialogKindsSource() {
    return this.#n;
  }
  declareDialogKinds(e10, t) {
    this.#t = e10, this.#n = e10 === void 0 ? void 0 : t;
  }
  sdkPerTaskStopAffordance() {
    return this.#o;
  }
  declarePerTaskStopAffordance(e10) {
    this.#o = e10;
  }
  sdkRapidFollowupPreempt() {
    return this.#a;
  }
  declareRapidFollowupPreempt(e10) {
    this.#a = e10;
  }
  sdkForwardNestedSubagentToolCalls() {
    return this.#u;
  }
  declareForwardNestedSubagentToolCalls(e10) {
    this.#u = e10;
  }
  hostRendersChromeSetupOffer() {
    return this.#s;
  }
  declareHostRendersChromeSetupOffer(e10) {
    this.#s = e10;
  }
  attacherCaps() {
    return this.#d;
  }
  replaceAttacherCaps(e10) {
    this.#d = e10, this.attacherCapsChanged.emit();
  }
  rvSupervisorLinkLive() {
    return this.#c;
  }
  replaceRvSupervisorLinkLive(e10) {
    if (this.#c === e10) return;
    this.#c = e10, this.rvSupervisorLinkChanged.emit();
  }
  sdkBetas() {
    return this.#i;
  }
  replaceSdkBetas(e10) {
    this.#i = e10;
  }
  caps() {
    return this.#r;
  }
  replaceCaps(e10) {
    this.#r = e10;
  }
  markRemote(e10) {
    this.#r = { ...this.#r, workspace: e10 ? "remote" : "local" };
  }
  cloudCwdOfSession(e10) {
    return this.#r.workspace === "remote" && this.#l?.sessionId === e10 ? this.#l.cwd : null;
  }
  replaceCloudCwd(e10) {
    this.#l = e10, this.cloudCwdChanged.emit();
  }
  replBridgeActive() {
    return this.#p;
  }
  replaceReplBridgeActive(e10) {
    if (this.#p === e10) return;
    this.#p = e10;
  }
  mainLoopBusy() {
    return this.#f !== "idle";
  }
  mainQueryRunning() {
    return this.#f === "running";
  }
  replaceMainLoopStatus(e10) {
    this.#f = e10;
  }
  reset() {
    this.#e = false, this.#t = void 0, this.#n = void 0, this.#o = void 0, this.#a = void 0, this.#u = void 0, this.#s = void 0, this.#d = null, this.#i = void 0, this.#r = hk, this.#p = false, this.#f = "idle", this.#c = false, this.#l = null, this.attacherCapsChanged.clear(), this.rvSupervisorLinkChanged.clear(), this.cloudCwdChanged.clear();
  }
}
var _k = 150;
class TS {
  #e = Date.now();
  #t = false;
  #n = 0;
  #o = -1 / 0;
  interactionFired = $e();
  #a = void 0;
  terminalFocusFired = $e();
  #u = false;
  #s;
  lastInteractionTime() {
    return this.#e;
  }
  lastSubmitTime() {
    return this.#n;
  }
  recordSubmit() {
    this.#n = Date.now();
  }
  personWroteAt() {
    return this.#o;
  }
  notePersonWrote() {
    this.#o = performance.now();
  }
  recordInteraction(e10) {
    if (e10) this.#d();
    else this.#t = true;
  }
  flushIfDirty() {
    if (this.#t) this.#d();
  }
  #d() {
    this.#e = Date.now(), this.#t = false, this.interactionFired.emit();
  }
  resetBaseline() {
    this.#e = Date.now(), this.#t = false;
  }
  terminalFocus() {
    return this.#a;
  }
  updateTerminalFocus(e10) {
    this.#a = e10, this.terminalFocusFired.emit();
  }
  scrollDraining() {
    return this.#u;
  }
  markScrollActivity() {
    if (this.#u = true, this.#s) clearTimeout(this.#s);
    this.#s = setTimeout(() => {
      this.#u = false, this.#s = void 0;
    }, _k), this.#s.unref?.();
  }
  async waitForScrollIdle() {
    while (this.#u) await new Promise((e10) => setTimeout(e10, _k));
  }
  reset() {
    this.#e = Date.now(), this.#n = 0, this.#o = -1 / 0, this.#a = void 0, this.interactionFired.clear(), this.terminalFocusFired.clear();
  }
}
function Na(e10, t) {
  let n = 0;
  for (let r of e10) n += +!!t(r);
  return n;
}
function Lt(e10) {
  return [...new Set(e10)];
}
var RJ = ["sdk_single_prompt_gate", "subagent_estimate", "subagent_final_turn", "rows_unreadable"], OJ = 8;
class wS {
  byAgent = /* @__PURE__ */ new Map();
  attemptsByAgent = /* @__PURE__ */ new Map();
  cappedFailuresByAgent = /* @__PURE__ */ new Map();
  armGateEventEmitted = /* @__PURE__ */ new Set();
  vetoedUnderPrompt = /* @__PURE__ */ new Map();
  sidecarIo = Promise.resolve();
  rehydrateAttemptedSessions = /* @__PURE__ */ new Set();
  sidecarReadsAhead = /* @__PURE__ */ new Map();
  get(e10) {
    return this.byAgent.get(e10);
  }
  has(e10) {
    return this.byAgent.has(e10);
  }
  put(e10, t) {
    this.byAgent.set(e10, t);
  }
  remove(e10) {
    this.byAgent.delete(e10);
  }
  nextAttemptNumber(e10) {
    let t = (this.attemptsByAgent.get(e10) ?? 0) + 1;
    return this.attemptsByAgent.set(e10, t), t;
  }
  consecutiveCountedFailures(e10) {
    return this.cappedFailuresByAgent.get(e10) ?? 0;
  }
  recordCountedFailure(e10) {
    let t = (this.cappedFailuresByAgent.get(e10) ?? 0) + 1;
    return this.cappedFailuresByAgent.set(e10, t), t;
  }
  clearCountedFailures(e10) {
    this.cappedFailuresByAgent.delete(e10);
  }
  recordVeto(e10, t) {
    this.vetoedUnderPrompt.set(e10, t);
  }
  isVetoedUnder(e10, t) {
    return this.vetoedUnderPrompt.get(e10) === t;
  }
  latchArmGateEvent(e10) {
    if (this.armGateEventEmitted.has(e10)) return false;
    return this.armGateEventEmitted.add(e10), true;
  }
  enqueueSidecarIo(e10, t) {
    return this.sidecarIo = this.sidecarIo.then(e10, e10).catch(t), this.sidecarIo;
  }
  sidecarIoSettled() {
    return this.sidecarIo;
  }
  hasAttemptedRehydrate(e10) {
    return this.rehydrateAttemptedSessions.has(e10);
  }
  markRehydrateAttempted(e10) {
    this.rehydrateAttemptedSessions.add(e10);
  }
  keepSidecarReadAhead(e10, t) {
    this.sidecarReadsAhead.delete(e10);
    while (this.sidecarReadsAhead.size >= OJ) {
      let n = this.sidecarReadsAhead.keys().next().value;
      if (n === void 0) break;
      this.sidecarReadsAhead.delete(n);
    }
    this.sidecarReadsAhead.set(e10, t);
  }
  takeSidecarReadAhead(e10) {
    let t = this.sidecarReadsAhead.get(e10);
    return this.sidecarReadsAhead.delete(e10), t;
  }
  dropSidecarReadAhead(e10) {
    this.sidecarReadsAhead.delete(e10);
  }
  forgetSubagentTelemetry(e10) {
    this.attemptsByAgent.delete(e10), this.cappedFailuresByAgent.delete(e10), this.vetoedUnderPrompt.delete(e10);
    for (let t of RJ) this.armGateEventEmitted.delete(`${e10}:${t}`);
  }
}
class xS {
  #e = void 0;
  get current() {
    return this.#e;
  }
  adopt(e10) {
    this.#e = e10;
  }
}
class vS {
  #e = null;
  #t = null;
  mainAgentId(e10) {
    return this.#e ??= _f(e10), this.#e;
  }
  projectDir() {
    return this.#t;
  }
  replaceProjectDir(e10) {
    this.#t = e10;
  }
}
class kS {
  openToolUseId;
  answeredThisSession = false;
  get answered() {
    return this.answeredThisSession;
  }
  markAnswered() {
    this.answeredThisSession = true;
  }
  isOpenElsewhere(e10) {
    return this.openToolUseId !== void 0 && this.openToolUseId !== e10;
  }
  open(e10) {
    this.openToolUseId = e10;
  }
  closeFor(e10) {
    if (e10 !== void 0 && this.openToolUseId === e10) this.openToolUseId = void 0;
  }
}
class PS {
  granted = false;
  isGranted() {
    return this.granted;
  }
  grant() {
    this.granted = true;
  }
}
class IS {
  inFlight = null;
  startedForTurnEnd = false;
  reset() {
    this.inFlight?.abort(), this.inFlight = null, this.startedForTurnEnd = false;
  }
}
class DS {
  firstSyncPromise = null;
  accountListing = "pending";
  syncErrors = [];
  lastRoundListed = false;
  listedStamp = null;
  changesLanded = 0;
  changesReloaded = 0;
  reloadsCompleted = 0;
  holdsSet = 0;
  reloadHeld = false;
  lastCompleteList = null;
  lastSyncedLaneLoad = null;
  syncedLaneOpened = false;
  syncedDirsLoadedHere = /* @__PURE__ */ new Set();
  dirsNewHere = /* @__PURE__ */ new Set();
  awaitsFirstRun = false;
  removalsDeferredHere = /* @__PURE__ */ new Set();
  pendingTrashRemovals = [];
  ensureBucketRoot = null;
  deferredRelist = null;
  missingEntry = { resync: null, resyncAt: -1 / 0, swept: false };
  settingsInstall = { current: null, next: null, loaded: null };
  holdReload() {
    this.reloadHeld = true, this.holdsSet++;
  }
  endHoldSetBefore(e10) {
    this.reloadHeld &&= this.holdsSet !== e10;
  }
  reloaded(e10) {
    this.changesReloaded = Math.max(this.changesReloaded, e10), this.reloadsCompleted++;
  }
}
class LS {
  abortController = null;
  eligibleTurns = 0;
  unusedInARow = 0;
  askOnNextTurn() {
    this.eligibleTurns = 0;
  }
  reset() {
    this.abortController?.abort(), this.abortController = null;
  }
  arm() {
    let e10 = new AbortController();
    return this.abortController = e10, e10;
  }
}
class MS {
  #e = void 0;
  #t = void 0;
  ccrSessionID() {
    return this.#e;
  }
  latchCcrSessionID(e10) {
    this.#e = e10;
  }
  syncEnabled() {
    return this.#t;
  }
  latchSyncEnabled(e10) {
    return this.#t = e10, e10;
  }
}
class NS {
  autonomousPreambleDelivered = false;
  lastLoopFileDelivered = null;
  reset() {
    this.autonomousPreambleDelivered = false, this.lastLoopFileDelivered = null;
  }
}
class US {
  exchanges = [];
  replace(e10) {
    this.exchanges = e10;
  }
  append(e10, t, n, r) {
    this.exchanges = [...this.exchanges, { question: e10, response: t, ...n && { fallbackNotice: n }, ...r && { agentId: r } }].slice(-20);
  }
  pendingReopen = null;
  reopenAway = false;
  get reopenPending() {
    return this.pendingReopen !== null;
  }
  armReopen(e10, t) {
    if (this.pendingReopen) {
      this.pendingReopen.owners.add(e10);
      return;
    }
    this.pendingReopen = { owners: /* @__PURE__ */ new Set([e10]), cancel: t() };
  }
  clearPendingReopen(e10) {
    let t = this.pendingReopen;
    if (!t) {
      this.reopenAway = false;
      return;
    }
    if (e10 !== void 0) {
      if (t.owners.delete(e10), t.owners.size > 0) return;
    }
    t.cancel(), this.pendingReopen = null, this.reopenAway = false;
  }
  reopener = null;
  setReopener(e10) {
    this.reopener = e10;
  }
  get hasReopener() {
    return this.reopener !== null;
  }
  reopenNow() {
    return this.reopener?.() ?? false;
  }
  inFlightQuestions = [];
  get inFlight() {
    return this.inFlightQuestions.at(-1) ?? null;
  }
  pendingBesidesTop() {
    return this.inFlightQuestions.slice(0, -1);
  }
  setInFlight(e10) {
    if (!this.inFlightQuestions.includes(e10)) this.inFlightQuestions = [...this.inFlightQuestions, e10];
  }
  clearInFlight(e10) {
    if (this.inFlightQuestions.includes(e10)) this.inFlightQuestions = this.inFlightQuestions.filter((t) => t !== e10);
  }
}
function it(e10, t) {
  return e10;
}
var yk = (e10, t) => {
  try {
    if (e10 !== null && typeof e10 === "object" && !("telemetryMessage" in e10) && Object.isExtensible(e10)) Object.assign(e10, { telemetryMessage: t });
  } catch {
  }
  return e10;
}, TJ = ["AggregateError", "Error", "EvalError", "RangeError", "ReferenceError", "SuppressedError", "SyntaxError", "TypeError", "URIError"];
new Set(TJ);
function Vn(e10) {
  return e10 instanceof Error ? e10 : Error(String(e10));
}
function dt(e10) {
  return e10 instanceof Error ? e10.message : String(e10);
}
function me(e10) {
  if (e10 && typeof e10 === "object" && "code" in e10 && typeof e10.code === "string") return e10.code;
  return;
}
function at(e10) {
  return me(e10) === "ENOENT";
}
function zS(e10) {
  return me(e10) === "EISDIR";
}
function Ek(e10) {
  let t = e10.message ? `${e10.name}: ${e10.message}` : e10.name, n = e10.stack;
  if (!n) return t;
  if (n.startsWith(t)) return n;
  let r = n.split(`
`), o = r[0] ?? "", s = o === e10.name || o.startsWith(`${e10.name}:`) ? r.slice(1) : r;
  return [t, ...s].join(`
`);
}
class bf {
  now() {
    return Date.now();
  }
  monotonicNow() {
    return performance.now();
  }
  setTimeout(e10, t, n) {
    let r = setTimeout(e10, t);
    if (n?.unref) r.unref();
    return () => clearTimeout(r);
  }
}
function PJ(e10, t) {
  e10(Error(t));
}
function Or(e10, t, n) {
  let r, o = new Promise((s, i) => {
    r = setTimeout(PJ, t, i, n);
  });
  return Promise.race([e10, o]).finally(() => {
    if (r !== void 0) clearTimeout(r);
  });
}
var IJ = (e10, t) => {
  let n = setTimeout(e10, t);
  return () => clearTimeout(n);
};
function Cf(e10, t, n = IJ) {
  let r = () => {
  }, o = new Promise((s) => {
    r = n(() => s(void 0), t);
  });
  return Promise.race([e10, o]).finally(r);
}
function Ye(e10) {
  return process.platform === "darwin" ? e10.normalize("NFC") : e10;
}
function Dn(e10) {
  return /^[\\/]{2}/.test(e10) || kf(e10);
}
function $a(e10) {
  return /(^|[\\/])\.\.([\\/]|$)/.test(e10);
}
function Ak(e10) {
  if (/^[\\/]{2}[?.][\\/](?!unc[\\/])/i.test(e10)) return null;
  return e10.match(/^[\\/]{2}(?:[?.][\\/]unc[\\/])?([^\\/]+)/i)?.[1]?.replace(/[A-Z]/g, (t) => t.toLowerCase()) ?? null;
}
function Ni(e10) {
  return /(^|[\\/])\.{1,2}[. ]*([\\/]|$)/.test(e10);
}
function xo(e10) {
  return /^[\\/]{2}[?.][\\/]/.test(e10);
}
function Ss(e10) {
  if (!/\/\.(?:vol|file|nofollow|resolve)(?:\/|$)/i.test(e10)) return false;
  if (!e10.startsWith("/")) return false;
  let t = [];
  for (let n of e10.split("/")) {
    if (n === "" || n === ".") continue;
    if (n === "..") {
      t.pop();
      continue;
    }
    if (t.push(n), t.length === 1 && /^\.(?:vol|file|nofollow|resolve)$/i.test(n)) return true;
  }
  return false;
}
function LJ(e10) {
  return /^[\\/](GLOBAL\?\?|GLOBALROOT|DosDevices|Device)[\\/]/i.test(e10);
}
function Mk(e10, t) {
  if (!Dn(e10)) return false;
  if (xo(e10) || kf(e10)) return true;
  if (Ni(e10)) return true;
  let n = Ak(e10);
  return n === null || n !== Ak(t);
}
function Nk(e10) {
  return e10.length === 2 && jS(e10[0]) === "net" || e10.length === 3 && jS(e10[0]) === "network" && jS(e10[1]) === "servers";
}
function cu(e10) {
  if (process.platform === "win32" || !e10.startsWith("/")) return null;
  let t = [];
  for (let n of e10.split("/")) {
    if (n === "" || n === ".") continue;
    if (n === "..") {
      t.pop();
      continue;
    }
    if (t.push(n), Nk(t)) return Of(n);
  }
  return null;
}
function Of(e10) {
  return e10.replace(/[A-Z]/g, (t) => t.toLowerCase());
}
function jS(e10) {
  return e10.replace(/[\u200c-\u200f\u202a-\u202e\u206a-\u206f\ufeff]/g, "").toUpperCase().toLowerCase();
}
function YS(e10, t) {
  if (Ss(e10)) return true;
  if (lr(e10)) {
    let n = cu(e10);
    if (n === null || n !== cu(t)) return true;
  }
  return MJ(e10, t);
}
function MJ(e10, t, n = process.platform, r = n === "darwin" && (process.platform !== "darwin" || Uk())) {
  if (n !== "darwin" || !UJ(e10, n, r)) return false;
  let o = VS(t, n, r).complete[0] ?? null, { complete: s, partial: i } = VS(e10, n, r);
  if (s.length === 0 && i.length === 0) return true;
  if (o === null) return true;
  return s.some((a) => a !== o) || i.some((a) => !o.startsWith(a));
}
var BS = it({ value: void 0 });
function Uk(e10 = Rk) {
  let t = e10 === Rk;
  if (t && BS.value !== void 0) return BS.value;
  let n;
  try {
    let r = false;
    try {
      r = e10.readAutoMaster().split(`
`).some((o) => {
        let s = o.replace(/#.*$/, "").trim().split(/\s+/);
        return s.length >= 2 && s[0].toLowerCase() === "/home";
      });
    } catch (o) {
      if (!at(o)) throw o;
    }
    n = r || e10.homeIsOwnMount();
  } catch {
    return true;
  }
  if (t) BS.value = n;
  return n;
}
var Rk = { readAutoMaster: () => un$1.readFileSync("/etc/auto_master", "utf8"), homeIsOwnMount: () => {
  let e10;
  try {
    e10 = un$1.statSync("/home");
  } catch (t) {
    if (at(t)) return true;
    throw t;
  }
  return e10.dev !== un$1.statSync("/Users").dev;
} }, NJ = 6;
function VS(e10, t, n) {
  let r = [], o = [];
  if (!e10.startsWith("/")) return { complete: r, partial: o };
  let s = [];
  for (let i of e10.split("/")) {
    if (i === "" || i === ".") continue;
    if (i === "..") {
      s.pop();
      continue;
    }
    if (s.push(i), s.length > NJ) continue;
    let a = "/" + s.join("/"), c = (t === "darwin" ? Bk(a) : a).split("/").filter((p) => p !== ""), d = c[0]?.toLowerCase();
    if (d === "network") {
      if (c.length === 1) o.push("/network/");
      else if (c.length === 2) o.push(`/network/${Of(c[1])}/`);
      else if (c.length === 3) r.push(`/network/${Of(c[1])}/${Of(c[2])}`);
    } else if (n && d === "home" && c.length === 2) r.push(`/home/${c[1]}`);
  }
  return { complete: r, partial: o };
}
function lr(e10) {
  if (process.platform === "win32") return false;
  return vo(e10);
}
function vo(e10) {
  return uu(e10) !== null;
}
var $k = 1024, zk = 4096, Af = /* @__PURE__ */ new Map(), Rf = /* @__PURE__ */ new Map();
function uu(e10) {
  if (!e10.startsWith("/")) return null;
  if (e10.length > zk) return Ok(e10);
  let t = Af.get(e10);
  if (t === void 0) {
    if (t = Ok(e10), Af.size >= $k) Af.clear();
    Af.set(e10, t);
  }
  return t;
}
function Ok(e10) {
  let t = [];
  for (let n of e10.split("/")) {
    if (n === "" || n === ".") continue;
    if (n === "..") {
      t.pop();
      continue;
    }
    if (t.push(n), Nk(t)) return "/" + t.join("/");
  }
  return null;
}
function Es(e10) {
  if (!e10.startsWith("/")) return false;
  let t = [];
  for (let n of e10.split("/")) {
    if (n === "" || n === ".") continue;
    if (n === "..") {
      t.pop();
      continue;
    }
    t.push(n);
  }
  return t.length === 1 && t[0].toLowerCase() === "net";
}
function ko(e10) {
  if (!e10.startsWith("/")) return false;
  if (e10.length > zk) return Tk(e10);
  let t = Rf.get(e10);
  if (t === void 0) {
    if (t = Tk(e10), Rf.size >= $k) Rf.clear();
    Rf.set(e10, t);
  }
  return t;
}
function Tk(e10) {
  let t = [];
  for (let n of e10.split("/")) {
    if (n === "" || n === ".") continue;
    if (n === "..") {
      t.pop();
      continue;
    }
    if (t.push(n), t.length === 1 && t[0].toLowerCase() === "network") return true;
  }
  return false;
}
function UJ(e10, t = process.platform, n = t === "darwin" && (process.platform !== "darwin" || Uk())) {
  if (t !== "darwin") return false;
  if (ko(e10) || Ss(e10)) return true;
  if (!e10.startsWith("/")) return false;
  let { complete: r, partial: o } = VS(e10, t, n);
  if (o.length > 0) return true;
  if (r.some((i) => i.startsWith("/network/"))) return true;
  let s = r.filter((i) => i.startsWith("/home/"));
  if (s.length > 0) {
    let i = FJ();
    if (s.some((a) => a !== i)) return true;
  }
  return false;
}
function FJ() {
  let e10;
  try {
    e10 = require$$0$1.homedir();
  } catch {
    return null;
  }
  let t = /^\/home\/([^/]+)/.exec(Bk(e10));
  return t ? `/home/${t[1]}` : null;
}
function du(e10) {
  return $J(e10) || ko(e10);
}
function $J(e10) {
  return pu(e10) || vo(e10) || Es(e10) || xo(e10) || kf(e10) || LJ(e10) || Ss(e10);
}
function Tr(e10) {
  let t = /^[\\/]{2}wsl(?:\$|\.localhost)[\\/]([^\\/]*)/i.exec(e10);
  return t !== null && !/^\.{0,2}[. ]*$/.test(t[1] ?? "");
}
function pu(e10) {
  return Dn(e10) && !Tr(e10);
}
function Po(e10) {
  if (e10.startsWith("\\\\?\\UNC\\")) return "\\\\" + e10.slice(8);
  if (e10.startsWith("\\\\?\\") && e10.length >= 7 && e10[5] === ":") return e10.slice(4);
  return e10;
}
function JS(e10) {
  if (/^\\\\\?\\volume\{/i.test(e10)) return wk(e10);
  if (kf(e10)) return true;
  let t = Po(e10);
  if (t !== e10 && wk(t)) return true;
  return Dn(t) && !Tr(t);
}
function wk(e10) {
  return Ni(e10) || e10.includes("/");
}
var zJ = /* @__PURE__ */ new Set(["EPERM", "EBUSY", "EACCES"]), Hk = 4, jk = 50, xk;
function Tf(e10) {
  return KJ(e10).real ?? null;
}
function vf(e10, t) {
  let n = pn.resolve(t).toLowerCase(), r = pn.dirname(pn.resolve(e10)).toLowerCase();
  if (r === n || vk(r, n) || kk(r, n, "lexical")) return true;
  let o = Tf(t)?.toLowerCase();
  if (o == null) return false;
  let s = Tf(pn.dirname(pn.resolve(e10)))?.toLowerCase();
  if (s == null) return true;
  return s === o || vk(s, o) || kk(s, o, "canonical");
}
var HJ = /* @__PURE__ */ new Set(["node_modules", ".venv", "venv", "env", ".env", "virtualenv", ".tox", ".nox", ".direnv", "__pypackages__"]);
function vk(e10, t) {
  if (!e10.startsWith(wf(t) + pn.sep)) return false;
  return e10.split(pn.sep).some((n) => HJ.has(n));
}
function wf(e10) {
  return e10.endsWith(pn.sep) ? e10.slice(0, -1) : e10;
}
var KS;
function kk(e10, t, n) {
  let r = require$$0$1.homedir(), o = (process.env.LOCALAPPDATA ?? "").trim();
  if (n === "lexical") return GS(Pk(r, o, (l) => pn.resolve(l).toLowerCase()), e10, t);
  let s = r + "\0" + o;
  if (KS?.key === s) return GS(KS.aliasDirs, e10, t);
  let i = true, a = Pk(r, o, (l) => {
    if (!jJ(l)) return pn.resolve(l).toLowerCase();
    let c = Tf(l)?.toLowerCase();
    if (c == null) return i = false, pn.resolve(l).toLowerCase();
    return c;
  });
  if (i) KS = { key: s, aliasDirs: a };
  return GS(a, e10, t);
}
function Pk(e10, t, n) {
  let r = [];
  if (e10) r.push(wf(n(e10)) + pn.sep + ["appdata", "local", "microsoft", "windowsapps"].join(pn.sep));
  if (t) {
    let o = wf(n(t)) + pn.sep + ["microsoft", "windowsapps"].join(pn.sep);
    if (!r.includes(o)) r.push(o);
  }
  return r;
}
function jJ(e10) {
  return process.platform === "win32" ? /^[A-Za-z]:[\\/](?![\\/])/.test(e10) : e10.startsWith("/") && !Dn(e10);
}
function GS(e10, t, n) {
  let r = wf(n);
  for (let o of e10) {
    if (!(o === r || o.startsWith(r + pn.sep))) continue;
    if (t === o || t.startsWith(o + pn.sep)) return true;
  }
  return false;
}
var BJ = ["usr/local", "usr/libexec/cups", "usr/share/snmp", "AppleInternal", "Applications", "Library", "Users", "Volumes", "cores", "home", "media", "mnt", "opt", "pkg", "private", "sw"];
function Bk(e10) {
  let t = e10.split("/");
  if (t.length < 5 || t[0] !== "" || lu(t[1] ?? "") !== "system" || lu(t[2] ?? "") !== "volumes" || lu(t[3] ?? "") !== "data") return e10;
  let n = t.slice(4);
  for (let r of BJ) {
    let o = r.split("/");
    if (n.length < o.length) continue;
    if (o.every((s, i) => lu(n[i] ?? "") === lu(s))) return "/" + n.join("/");
  }
  return e10;
}
function lu(e10) {
  return e10.toUpperCase().toLowerCase();
}
function KJ(e10) {
  let t = GJ(() => Po(un$1.realpathSync.native(e10)));
  return { real: t.value, code: t.code };
}
function Kk(e10) {
  return e10 != null && typeof e10 === "object" && "code" in e10 && typeof e10.code === "string" ? e10.code : void 0;
}
function GJ(e10) {
  try {
    return { value: WJ(e10) };
  } catch (t) {
    return { code: Kk(t) };
  }
}
function WJ(e10) {
  return VJ(e10, () => true);
}
function VJ(e10, t) {
  for (let n = 0; ; n++) try {
    return e10();
  } catch (r) {
    let o = Kk(r);
    if (o === void 0 || process.platform !== "win32" || !zJ.has(o) || n >= Hk - 1 || !t()) throw r;
    xk ??= new Int32Array(new SharedArrayBuffer(4)), Atomics.wait(xk, 0, 0, jk);
  }
}
function kf(e10) {
  return Ik.test(e10) || e10.includes("??") && Ik.test(qJ(e10));
}
var Ik = /^[\\/]\?\?[\\/]/;
function qJ(e10) {
  return pn__namespace.win32 ? pn__namespace.win32.normalize(e10) : e10;
}
var YJ = 16;
class XS {
  pending = null;
  shownThisSession = false;
  changed = $e();
  submitted = [];
  submittedChanged = $e();
  subscribe = this.changed.subscribe;
  getSnapshot = () => this.pending;
  subscribeSubmitted = this.submittedChanged.subscribe;
  submit(e10) {
    if (this.shownThisSession) return;
    if (this.submitted.length >= YJ) this.submitted.shift();
    this.submitted.push(e10), this.submittedChanged.emit();
  }
  takeSubmitted() {
    let e10 = this.submitted;
    return this.submitted = [], e10;
  }
  offer(e10) {
    if (this.shownThisSession) return;
    this.pending = e10, this.changed.emit();
  }
  dismiss() {
    if (this.pending !== null) this.pending = null, this.changed.emit();
  }
  markShown() {
    this.shownThisSession = true;
  }
}
var ZJ = /* @__PURE__ */ Symbol("permission-stash-evicted");
class eE {
  entriesCap;
  evictedKeysCap;
  lanes = { write: /* @__PURE__ */ new Map(), read: /* @__PURE__ */ new Map() };
  evicted = { write: /* @__PURE__ */ new Set(), read: /* @__PURE__ */ new Set() };
  poisoned = { write: false, read: false };
  identities = /* @__PURE__ */ new Map();
  identitiesEvicted = /* @__PURE__ */ new Set();
  identitiesPoisoned = false;
  constructor(e10 = 256, t = 1048576) {
    this.entriesCap = e10;
    this.evictedKeysCap = t;
  }
  stash(e10, t, n, r = "write") {
    if (e10 === void 0) return;
    let o = this.lanes[r], s = this.evicted[r], i = QS(e10, t);
    if (s.has(i)) return;
    let a = o.get(i);
    if (a !== void 0) {
      let l = new Set(n);
      o.set(i, a.filter((c) => l.has(c)));
      return;
    }
    if (o.size >= this.entriesCap) {
      let l = o.keys().next().value;
      if (l !== void 0) {
        if (o.delete(l), s.add(l), s.size > this.evictedKeysCap) {
          this.poisoned[r] = true;
          let c = s.values().next().value;
          if (c !== void 0) s.delete(c);
        }
      }
    }
    o.set(i, n);
  }
  holds(e10, t, n = "write") {
    return e10 !== void 0 && this.lanes[n].has(QS(e10, t));
  }
  stashIdentity(e10, t, n) {
    if (e10 === void 0) return;
    let r = this.identities.get(e10), o = r?.get(t);
    if (r !== void 0 && o !== void 0) {
      if (o === null || n === null || o.dev !== n.dev || o.ino !== n.ino) r.set(t, null);
      return;
    }
    let s = this.identitiesEvicted.has(e10) || this.identitiesPoisoned;
    if (r === void 0) {
      if (!s && this.identities.size >= this.entriesCap) {
        let i = this.identities.keys().next().value;
        if (i !== void 0) {
          if (this.identities.delete(i), this.identitiesEvicted.add(i), this.identitiesEvicted.size > this.evictedKeysCap) {
            this.identitiesPoisoned = true;
            let a = this.identitiesEvicted.values().next().value;
            if (a !== void 0) this.identitiesEvicted.delete(a);
          }
        }
      }
      r = /* @__PURE__ */ new Map(), this.identities.set(e10, r);
    }
    r.set(t, s ? null : n);
  }
  takeIdentity(e10, t) {
    if (e10 === void 0) return;
    let n = this.identities.get(e10), r = n?.get(t);
    if (n?.delete(t) && n.size === 0) this.identities.delete(e10);
    return r;
  }
  consume(e10, t, n = "write") {
    if (e10 === void 0) return;
    let r = this.lanes[n], o = QS(e10, t), s = r.get(o), i = s === void 0 && (this.evicted[n].delete(o) || this.poisoned[n]), a = `${e10}\0`;
    for (let l of r.keys()) if (l.startsWith(a)) r.delete(l);
    if (n === "read") this.identities.delete(e10), this.identitiesEvicted.delete(e10);
    if (i) return ZJ;
    return s;
  }
}
function QS(e10, t) {
  return `${e10}\0${t}`;
}
var JJ = "NoProjectDirectoryError", Gk = new xe(() => ({}));
var Wk = () => {
};
function Vk(e10) {
  Wk = e10;
}
class fu extends Error {
  name = JJ;
  constructor() {
    super("This session has no working directory.");
    try {
      Wk(this);
    } catch {
    }
  }
}
function Pf(e10) {
  let { project: t } = e10;
  if (t === null) throw new fu();
  return t;
}
function qk(e10) {
  return Yk({ kind: "root", host: e10.host, id: e10.id, parentId: e10.parentId }, e10.project, e10.project?.isolationRoot);
}
function If(e10, t) {
  let n = t.originalCwd ?? e10?.originalCwd, r = t.projectRoot ?? e10?.projectRoot, o = t.cwd ?? e10?.cwd;
  if (n === void 0 && r === void 0 && o === void 0) return null;
  if (n === void 0 || r === void 0 || o === void 0) throw new fu();
  return { originalCwd: Ye(n), projectRoot: Ye(r), cwd: Ye(o) };
}
function Yk(e10, t, n) {
  let r = { project: t === null ? null : If(null, t) }, o = n, s = $e(), i = e10.kind === "fork" ? e10.root.observers : new uS(), a = e10.kind === "fork" ? e10.root.autonomousLoopPreamble : new NS(), l = e10.kind === "fork" ? e10.root.precompute : new wS(), c = { get originalCwd() {
    return Pf(r).originalCwd;
  }, get projectRoot() {
    return Pf(r).projectRoot;
  }, get cwd() {
    return Pf(r).cwd;
  }, get isolationRoot() {
    return o;
  } }, d = { host: e10.kind === "fork" ? e10.root.host : e10.host, get id() {
    return e10.kind === "fork" ? e10.root.id : e10.id;
  }, get parentId() {
    return e10.kind === "fork" ? e10.root.parentId : e10.parentId;
  }, get root() {
    return e10.kind === "fork" ? e10.root : d;
  }, get project() {
    return r.project === null ? null : c;
  }, observers: i, autonomousLoopPreamble: a, btwHistory: e10.kind === "fork" ? e10.root.btwHistory : new US(), ccrRecap: e10.kind === "fork" ? e10.root.ccrRecap : new IS(), conversationLatches: e10.kind === "fork" ? e10.root.conversationLatches : new pS(), costLedger: e10.kind === "fork" ? e10.root.costLedger : new mS(), engineStore: e10.kind === "fork" ? e10.root.engineStore : new xS(), usageCreditsOnlyModelConsentSlots: e10.kind === "fork" ? e10.root.usageCreditsOnlyModelConsentSlots : new gS(), hookRegistry: e10.kind === "fork" ? e10.root.hookRegistry : new hS(), identity: e10.kind === "fork" ? e10.root.identity : new vS(), invokedSkills: e10.kind === "fork" ? e10.root.invokedSkills : new _S(), mcpSessionWiring: e10.kind === "fork" ? e10.root.mcpSessionWiring : new yS(), modelSelection: e10.kind === "fork" ? e10.root.modelSelection : new SS(), promptAssembly: e10.kind === "fork" ? e10.root.promptAssembly : new ES(), promptSuggestion: e10.kind === "fork" ? e10.root.promptSuggestion : new LS(), pendingHint: e10.kind === "fork" ? e10.root.pendingHint : new XS(), pluginsSync: e10.kind === "fork" ? e10.root.pluginsSync : new DS(), precompute: l, requestJournal: e10.kind === "fork" ? e10.root.requestJournal : new bS(), sessionCron: e10.kind === "fork" ? e10.root.sessionCron : new CS(), sessionFlags: e10.kind === "fork" ? e10.root.sessionFlags : new AS(), sessionRefsGate: e10.kind === "fork" ? e10.root.sessionRefsGate : new MS(), sessionScratch: e10.kind === "fork" ? e10.root.sessionScratch : new RS(), surfaceCapabilities: e10.kind === "fork" ? e10.root.surfaceCapabilities : new OS(), userPresence: e10.kind === "fork" ? e10.root.userPresence : new TS(), workflowUsageConsent: e10.kind === "fork" ? e10.root.workflowUsageConsent : new PS(), outsideReadPrompt: e10.kind === "fork" ? e10.root.outsideReadPrompt : new kS(), writePermissionStash: e10.kind === "fork" ? e10.root.writePermissionStash : new eE(), subscribe(p) {
    let f = s.subscribe(p);
    if (e10.kind !== "fork") return f;
    let m = e10.root, { id: g, parentId: _ } = m, y = m.subscribe(() => {
      if (m.id === g && m.parentId === _) return;
      g = m.id, _ = m.parentId, p();
    });
    return () => {
      f(), y();
    };
  }, setCwd(p) {
    d.update({ project: { cwd: p } });
  }, setIsolationRoot(p) {
    if (p !== o) o = p, s.emit();
  }, withProject(p) {
    return Yk({ kind: "fork", root: d.root }, If(r.project, p), p.isolationRoot ?? o);
  }, update(p) {
    let f = p.project === void 0 ? r.project : p.project === null ? null : If(r.project, p.project), m = false;
    if (p.id !== void 0 || "parentId" in p) {
      if (e10.kind === "fork") throw Error("A withProject fork cannot re-identify the session — update the root session instead");
      if (p.id !== void 0 && p.id !== e10.id) e10.id = p.id, m = true;
      if ("parentId" in p && p.parentId !== e10.parentId) e10.parentId = p.parentId, m = true;
    }
    if (f?.originalCwd !== r.project?.originalCwd || f?.projectRoot !== r.project?.projectRoot || f?.cwd !== r.project?.cwd) r.project = f, m = true;
    let g = p.project?.isolationRoot;
    if (g !== void 0 && g !== o) o = g, m = true;
    if (m) s.emit();
  } };
  return d;
}
var Zk = { isDiskless: () => false, isDisklessProcess: () => false, reportBuilt: () => {
} };
function Jk(e10) {
  Zk = e10;
}
function Df() {
  return Zk.isDiskless();
}
var Xk = new xe(() => ({}));
class tE {
  #e = false;
  #t = false;
  #n = false;
  #o = null;
  #a = false;
  #u = void 0;
  #s = false;
  #d = false;
  #c = false;
  #i = false;
  #r = void 0;
  #p = false;
  #f = false;
  #l = null;
  #m = null;
  #y = /* @__PURE__ */ new Map();
  #g = "cli";
  #S = "fresh";
  #_ = void 0;
  #h = false;
  #E = false;
  #C = [];
  #b = false;
  #w = false;
  #R = false;
  #T = /* @__PURE__ */ new Set();
  #v = false;
  #O = false;
  #I = false;
  #k = false;
  #x = "none";
  #L = false;
  #P = false;
  #D = false;
  #N = false;
  #F = false;
  #$ = void 0;
  #A = void 0;
  #z = void 0;
  #U = void 0;
  #M = void 0;
  #H = void 0;
  #B = false;
  #K = false;
  #G = false;
  #W = null;
  #V = null;
  #q = true;
  #Y = null;
  #j = false;
  #re = $e();
  #Z = null;
  #J = false;
  #X = false;
  #Q = {};
  #ee = null;
  #te = "none";
  #ne = void 0;
  isInteractive() {
    return this.#e;
  }
  isInteractivityDecided() {
    return this.#t;
  }
  isNoDialogLaunch() {
    return this.#n;
  }
  markNoDialogLaunch() {
    this.#n = true;
  }
  replaceIsInteractive(e10) {
    this.#e = e10, this.#t = true;
  }
  printOutputFormat() {
    return this.#o;
  }
  replacePrintOutputFormat(e10) {
    this.#o = e10;
  }
  thinkingDisplayExplicit() {
    return this.#a;
  }
  replaceThinkingDisplayExplicit(e10) {
    this.#a = e10;
  }
  permissionPromptToolName() {
    return this.#u;
  }
  replacePermissionPromptToolName(e10) {
    this.#u = e10;
  }
  hasStreamingInput() {
    return this.#s;
  }
  replaceHasStreamingInput(e10) {
    this.#s = e10;
  }
  singleShotPrintSession() {
    return this.#d;
  }
  replaceSingleShotPrintSession(e10) {
    this.#d = e10;
  }
  printInputClosed() {
    return this.#c;
  }
  markPrintInputClosed() {
    this.#c = true;
  }
  modelOverrideOptOutForSession() {
    return this.#i;
  }
  replaceModelOverrideOptOutForSession(e10) {
    this.#i = e10;
  }
  rendererMode() {
    return this.#r;
  }
  replaceRendererMode(e10) {
    this.#r = e10;
  }
  strictToolResultPairing() {
    return this.#p;
  }
  replaceStrictToolResultPairing(e10) {
    this.#p = e10;
  }
  restrictedSession() {
    return this.#f;
  }
  replaceRestrictedSession(e10) {
    this.#f = e10;
  }
  workspaceRestrictionState() {
    return this.#l;
  }
  replaceWorkspaceRestrictionState(e10) {
    this.#l = e10;
  }
  replaceWorkspaceRestrictionUnsubscribe(e10) {
    this.#m?.(), this.#m = e10;
  }
  restrictedWorkspaceRoots() {
    return this.#y;
  }
  addRestrictedWorkspaceRoot(e10, t) {
    this.#y.set(e10, t);
  }
  clearRestrictedWorkspaceRoots() {
    this.#y = /* @__PURE__ */ new Map();
  }
  clientType() {
    return this.#g;
  }
  replaceClientType(e10) {
    this.#g = e10;
  }
  sessionStartType() {
    return this.#S;
  }
  replaceSessionStartType(e10) {
    this.#S = e10;
  }
  questionPreviewFormat() {
    return this.#_;
  }
  replaceQuestionPreviewFormat(e10) {
    this.#_ = e10;
  }
  extendedQuestionsEnabled() {
    return this.#h;
  }
  replaceExtendedQuestionsEnabled(e10) {
    this.#h = e10;
  }
  questionOptionDescriptionsOptional() {
    return this.#E;
  }
  replaceQuestionOptionDescriptionsOptional(e10) {
    this.#E = e10;
  }
  replConfigArgv() {
    return this.#C;
  }
  replaceReplConfigArgv(e10) {
    this.#C = e10;
  }
  userMsgOptIn() {
    return this.#b;
  }
  replaceUserMsgOptIn(e10) {
    this.#b = e10;
  }
  searchToolsOptIn() {
    return this.#w;
  }
  replaceSearchToolsOptIn(e10) {
    this.#w = e10;
  }
  todoToolsOptIn() {
    return this.#R;
  }
  replaceTodoToolsOptIn(e10) {
    this.#R = e10;
  }
  toolsOmittedByLaunchList() {
    return this.#T;
  }
  replaceToolsOmittedByLaunchList(e10) {
    this.#T = e10;
  }
  wizardOperatorToolsEnabled() {
    return this.#v;
  }
  replaceWizardOperatorToolsEnabled(e10) {
    this.#v = e10;
  }
  runnerDeclaredNestedRepositoryDiff() {
    return this.#O;
  }
  replaceRunnerDeclaredNestedRepositoryDiff(e10) {
    this.#O = e10;
  }
  runnerDeclaredNoRepositoryCheckedOut() {
    return this.#I;
  }
  replaceRunnerDeclaredNoRepositoryCheckedOut(e10) {
    this.#I = e10;
  }
  runnerDeclaredFreshMachinePerSession() {
    return this.#k;
  }
  replaceRunnerDeclaredFreshMachinePerSession(e10) {
    this.#k = e10;
  }
  pollEventIngress() {
    return this.#x;
  }
  markPollEventIngress(e10) {
    this.#x = e10;
  }
  ownEventDeliveryRequested() {
    return this.#L && !this.#P;
  }
  replaceOwnEventDeliveryHeld(e10) {
    this.#P = e10;
  }
  markOwnEventDeliveryRequested() {
    this.#L = true;
  }
  sdkAgentProgressSummariesEnabled() {
    return this.#D;
  }
  replaceSdkAgentProgressSummariesEnabled(e10) {
    this.#D = e10;
  }
  sessionPersistenceDisabled() {
    return this.#N;
  }
  replaceSessionPersistenceDisabled(e10) {
    this.#N = e10;
  }
  diskless() {
    return this.#F;
  }
  replaceDiskless(e10) {
    this.#F = e10;
  }
  ccrSessionUrl() {
    return this.#$;
  }
  replaceCcrSessionUrl(e10) {
    this.#$ = e10;
  }
  ccrDerivedSurface() {
    return this.#A;
  }
  replaceCcrDerivedSurface(e10) {
    this.#A = e10;
  }
  autoCompactWindowSurface() {
    return this.#U;
  }
  replaceAutoCompactWindowSurface(e10) {
    this.#U = e10;
  }
  entrypointOnRequests() {
    return this.#z;
  }
  replaceEntrypointOnRequests(e10) {
    this.#z = e10;
  }
  coworkEnrollment() {
    return this.#M;
  }
  replaceCoworkEnrollment(e10) {
    this.#M = e10;
  }
  toolsMachine() {
    return this.#H;
  }
  replaceToolsMachine(e10) {
    this.#H = e10;
  }
  sessionBypassPermissionsMode() {
    return this.#B;
  }
  replaceSessionBypassPermissionsMode(e10) {
    this.#B = e10;
  }
  disableSlashCommands() {
    return this.#K;
  }
  replaceDisableSlashCommands(e10) {
    this.#K = e10;
  }
  disableFileMentions() {
    return this.#G;
  }
  replaceDisableFileMentions(e10) {
    this.#G = e10;
  }
  sessionUploadsDir() {
    return this.#W;
  }
  replaceSessionUploadsDir(e10) {
    this.#W = e10;
  }
  localUploadsRoot() {
    return this.#V;
  }
  replaceLocalUploadsRoot(e10) {
    this.#V = e10;
  }
  mayForwardHomeSettings() {
    return this.#q;
  }
  replaceMayForwardHomeSettings(e10) {
    this.#q = e10;
  }
  homeSettingsHostConsent() {
    return this.#Y;
  }
  replaceHomeSettingsHostConsent(e10) {
    this.#Y = e10;
  }
  scheduledTasksEnabled() {
    return this.#j;
  }
  replaceScheduledTasksEnabled(e10) {
    let t = e10 && !this.#j;
    if (this.#j = e10, t) this.#re.emit();
  }
  onScheduledTasksEnabled(e10) {
    return this.#re.subscribe(e10);
  }
  initJsonSchema() {
    return this.#Z;
  }
  replaceInitJsonSchema(e10) {
    this.#Z = e10;
  }
  cliSessionConfigCarried() {
    return this.#J;
  }
  replaceCliSessionConfigCarried(e10) {
    this.#J = e10;
  }
  forkRestrictedLaunchConfig() {
    return this.#X;
  }
  replaceForkRestrictedLaunchConfig(e10) {
    this.#X = e10;
  }
  forkReplayLaunchConfig() {
    return this.#Q;
  }
  spareClaimState() {
    return this.#te;
  }
  replaceSpareClaimState(e10) {
    this.#te = e10;
  }
  spareParkedAtMs() {
    return this.#ne;
  }
  replaceSpareParkedAtMs(e10) {
    this.#ne = e10;
  }
  replaceForkReplayLaunchConfig(e10) {
    this.#Q = e10;
  }
  projectConfigRoot() {
    return this.#ee;
  }
  replaceProjectConfigRoot(e10) {
    this.#ee = e10;
  }
  reset() {
    this.#e = false, this.#t = false, this.#n = false, this.#o = null, this.#te = "none", this.#ne = void 0, this.#a = false, this.#u = void 0, this.#s = false, this.#d = false, this.#c = false, this.#i = false, this.#r = void 0, this.#p = false, this.#f = false, this.#l = null, this.replaceWorkspaceRestrictionUnsubscribe(null), this.#y = /* @__PURE__ */ new Map(), this.#g = "cli", this.#S = "fresh", this.#_ = void 0, this.#h = false, this.#E = false, this.#C = [], this.#b = false, this.#w = false, this.#R = false, this.#T = /* @__PURE__ */ new Set(), this.#v = false, this.#O = false, this.#I = false, this.#k = false, this.#x = "none", this.#L = false, this.#P = false, this.#D = false, this.#N = false, this.#F = false, this.#$ = void 0, this.#A = void 0, this.#U = void 0, this.#z = void 0, this.#M = void 0, this.#H = void 0, this.#B = false, this.#K = false, this.#G = false, this.#W = null, this.#V = null, this.#q = true, this.#Y = null, this.#j = false, this.#Z = null, this.#J = false, this.#X = false, this.#Q = {}, this.#ee = null;
  }
}
class nE {
  #e = void 0;
  #t = [];
  #n = [];
  #o = void 0;
  #a = void 0;
  #u = null;
  #s = null;
  #d = false;
  #c = null;
  #i = eP();
  #r = null;
  #p = false;
  flagSettingsPath() {
    return this.#e;
  }
  replaceFlagSettingsPath(e10) {
    this.#e = e10;
  }
  flagAgentsFilePaths() {
    return this.#t;
  }
  replaceFlagAgentsFilePaths(e10) {
    this.#t = e10;
  }
  flagMcpConfigFilePaths() {
    return this.#n;
  }
  replaceFlagMcpConfigFilePaths(e10) {
    this.#n = e10;
  }
  flagSettingsExpectedContent() {
    return this.#o;
  }
  replaceFlagSettingsExpectedContent(e10) {
    this.#o = e10;
  }
  flagSettingsFilePinnedContent() {
    return this.#a;
  }
  replaceFlagSettingsFilePinnedContent(e10) {
    this.#a = e10;
  }
  flagSettingsInline() {
    return this.#u;
  }
  replaceFlagSettingsInline(e10) {
    this.#u = e10;
  }
  parentManagedSettings() {
    return this.#s;
  }
  replaceParentManagedSettings(e10, t = null) {
    this.#s = e10, this.#c = t;
  }
  parentManagedSettingsInvalid() {
    return this.#d;
  }
  replaceParentManagedSettingsInvalid(e10) {
    this.#d = e10;
  }
  parentOrganizationSettings() {
    return this.#c;
  }
  allowedSettingSources() {
    return this.#i;
  }
  replaceAllowedSettingSources(e10) {
    this.#i = e10;
  }
  allowedSettingSourcesWithoutRepoDirSources() {
    let e10 = this.#i;
    if (this.#r?.of !== e10) this.#r = { of: e10, result: e10.filter((t) => t !== "projectSettings" && t !== "localSettings") };
    return this.#r.result;
  }
  useCoworkPlugins() {
    return this.#p;
  }
  replaceUseCoworkPlugins(e10) {
    this.#p = e10;
  }
  reset() {
    this.#e = void 0, this.#t = [], this.#n = [], this.#o = void 0, this.#a = void 0, this.#u = null, this.#s = null, this.#d = false, this.#c = null, this.#i = eP(), this.#r = null, this.#p = false;
  }
}
function eP() {
  return ["userSettings", "projectSettings", "localSettings", "flagSettings", "policySettings"];
}
class rE {
  #e = [];
  #t = [];
  #n = [];
  #o = void 0;
  #a = /* @__PURE__ */ new Map();
  #u = /* @__PURE__ */ new Map();
  #s = /* @__PURE__ */ new Map();
  #d = [];
  #c = void 0;
  #i = [];
  #r = false;
  #p = void 0;
  #f = void 0;
  #l = void 0;
  inlinePlugins() {
    return this.#e;
  }
  replaceInlinePlugins(e10) {
    this.#e = e10;
  }
  inlinePluginsNoMcp() {
    return this.#t;
  }
  replaceInlinePluginsNoMcp(e10) {
    this.#t = e10;
  }
  inlinePluginUrls() {
    return this.#n;
  }
  replaceInlinePluginUrls(e10) {
    this.#n = e10;
  }
  syncedPluginDirs() {
    return this.#o ?? [];
  }
  syncedPluginDirsRegistered() {
    return this.#o !== void 0;
  }
  syncedPluginAttestation(e10) {
    return this.#a.get(e10);
  }
  syncedPluginRowId(e10) {
    return this.#u.get(e10);
  }
  replaceSyncedPluginDirs(e10, t = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Map()) {
    this.#o = e10, this.#a = t, this.#u = n, this.#s = this.#m(this.#s);
  }
  clearSyncedPluginDirs() {
    this.#o = void 0, this.#a = /* @__PURE__ */ new Map(), this.#u = /* @__PURE__ */ new Map(), this.#s = /* @__PURE__ */ new Map();
  }
  attestedOfficialPluginMarketplace(e10) {
    return this.#s.get(e10);
  }
  replaceAttestedOfficialPluginIds(e10) {
    this.#s = this.#m(e10);
  }
  #m(e10) {
    let t = new Set([...this.#a.values()].map((n) => `${n.pluginName}@${n.marketplace}`));
    return new Map([...e10].filter(([n, r]) => t.has(`${n.slice(0, n.lastIndexOf("@"))}@${r}`)));
  }
  additionalDirectoriesForClaudeMd() {
    return this.#d;
  }
  replaceAdditionalDirectoriesForClaudeMd(e10) {
    this.#d = e10;
  }
  claudeMdAdditionalDirectoriesAsked() {
    return this.#c;
  }
  askClaudeMdAdditionalDirectories(e10) {
    this.#c = e10;
  }
  allowedChannels() {
    return this.#i;
  }
  replaceAllowedChannels(e10) {
    this.#i = e10;
  }
  hasDevChannels() {
    return this.#r;
  }
  replaceHasDevChannels(e10) {
    this.#r = e10;
  }
  sessionSkillAllowlist() {
    return this.#p;
  }
  replaceSessionSkillAllowlist(e10) {
    this.#p = e10;
  }
  chromeFlagOverride() {
    return this.#f;
  }
  replaceChromeFlagOverride(e10) {
    this.#f = e10;
  }
  teammateAgentId() {
    return this.#l;
  }
  replaceTeammateAgentId(e10) {
    this.#l = e10;
  }
  reset() {
    this.#e = [], this.#t = [], this.#n = [], this.clearSyncedPluginDirs(), this.#d = [], this.#c = void 0, this.#i = [], this.#r = false, this.#p = void 0, this.#f = void 0, this.#l = void 0;
  }
}
class oE {
  #e = null;
  #t = null;
  #n = /* @__PURE__ */ new Set();
  modelStrings() {
    return this.#e;
  }
  replaceModelStrings(e10) {
    this.#e = e10;
  }
  invalidate() {
    this.#e = null, this.#n = /* @__PURE__ */ new Set();
  }
  admin3PSteeringSnapshot() {
    return this.#t;
  }
  recordAdmin3PSteeringSnapshot(e10) {
    this.#t = e10;
  }
  probeRefutedDocumentDefaults() {
    return this.#n;
  }
  recordProbeRefutedDocumentDefault(e10) {
    this.#n.add(e10);
  }
  reset() {
    this.#e = null, this.#t = null, this.#n = /* @__PURE__ */ new Set();
  }
}
var tP = [];
class sE {
  #e = [];
  #t = [];
  #n = void 0;
  errorLog() {
    return this.#e;
  }
  recordError(e10) {
    if (this.#e.length >= 100) this.#e.shift();
    this.#e.push(e10);
  }
  recordSlowOperation(e10, t) {
    return;
  }
  slowOperations() {
    if (this.#t.length === 0) return tP;
    let e10 = Date.now();
    if (this.#t.some((t) => e10 - t.timestamp >= 1e4)) {
      if (this.#t = this.#t.filter((t) => e10 - t.timestamp < 1e4), this.#t.length === 0) return tP;
    }
    return this.#t;
  }
  recordDevBarAlert(e10) {
    return;
  }
  devBarAlert() {
    let e10 = this.#n;
    if (e10 && Date.now() - e10.timestamp >= 6e4) {
      this.#n = void 0;
      return;
    }
    return e10;
  }
  reset() {
    this.#e = [], this.#t = [], this.#n = void 0;
  }
}
function nP() {
  return { direct: { strict: null, customer: null }, proxied: { strict: null, customer: null } };
}
function rP() {
  return { rateTokens: null, rateLastRefillMs: null, featureOkLogged: false, reportedDropReasons: /* @__PURE__ */ new Set() };
}
class iE {
  #e = null;
  #t = null;
  #n = null;
  #o = null;
  #a = null;
  #u = null;
  #s = null;
  #d = null;
  #c = null;
  #i = null;
  #r = null;
  #p = null;
  #f = null;
  #l = [];
  #m = null;
  #y = rP();
  #g = null;
  #S = null;
  #_ = null;
  #h = nP();
  #E = null;
  #C = null;
  installMeter(e10, t, { omitUnits: n = false } = {}) {
    this.#e = e10;
    let r = (o) => n ? void 0 : o;
    this.#t = t("claude_code.session.count", { description: "Count of CLI sessions started" }), this.#n = t("claude_code.lines_of_code.count", { description: "Count of lines of code modified, with the 'type' attribute indicating whether lines were added or removed and the 'model' attribute indicating which model made the change" }), this.#o = t("claude_code.pull_request.count", { description: "Number of pull requests created" }), this.#a = t("claude_code.commit.count", { description: "Number of git commits created" }), this.#u = t("claude_code.cost.usage", { description: "Cost of the Claude Code session", unit: r("USD") }), this.#s = t("claude_code.token.usage", { description: "Number of tokens used", unit: r("tokens") }), this.#d = t("claude_code.code_edit_tool.decision", { description: "Count of code editing tool permission decisions (accept/reject) for Edit, Write, and NotebookEdit tools" }), this.#c = t("claude_code.active_time.total", { description: "Total active time in seconds", unit: r("s") });
  }
  meter() {
    return this.#e;
  }
  sessionCounter() {
    return this.#t;
  }
  locCounter() {
    return this.#n;
  }
  prCounter() {
    return this.#o;
  }
  commitCounter() {
    return this.#a;
  }
  costCounter() {
    return this.#u;
  }
  tokenCounter() {
    return this.#s;
  }
  codeEditToolDecisionCounter() {
    return this.#d;
  }
  activeTimeCounter() {
    return this.#c;
  }
  statsStore() {
    return this.#i;
  }
  replaceStatsStore(e10) {
    this.#i = e10;
  }
  loggerProvider() {
    return this.#r;
  }
  replaceLoggerProvider(e10) {
    this.#r = e10;
  }
  eventLogger() {
    return this.#p;
  }
  eventLoggerOwner() {
    return this.#f;
  }
  attachEventLogger(e10, t) {
    if (this.#p = e10, this.#f = e10 ? t : null, !e10) return;
    let n = this.#l;
    if (this.#l = null, n) for (let r of n) e10.emit(r);
  }
  bufferPendingEvent(e10) {
    if (this.#l === null || this.#l.length >= 100) return false;
    return this.#l.push(e10), true;
  }
  closeWindow(e10) {
    this.#l = null, this.#m = e10;
  }
  windowCloseCause() {
    return this.#m;
  }
  isWindowOpen() {
    return this.#l !== null;
  }
  hostOtel() {
    return this.#y;
  }
  meterProvider() {
    return this.#g;
  }
  replaceMeterProvider(e10) {
    this.#g = e10;
  }
  tracerProvider() {
    return this.#S;
  }
  replaceTracerProvider(e10) {
    this.#S = e10;
  }
  cachedTelemetryResource() {
    return this.#_;
  }
  replaceCachedTelemetryResource(e10) {
    this.#_ = e10;
  }
  cachedOtlpHttpAgentFactory(e10, t) {
    return this.#h[e10 ? "proxied" : "direct"][t];
  }
  replaceCachedOtlpHttpAgentFactory(e10, t, n) {
    this.#h[e10 ? "proxied" : "direct"][t] = n;
  }
  inClusterOtlpTrustRoots() {
    return this.#E;
  }
  replaceInClusterOtlpTrustRoots(e10) {
    this.#E = e10;
  }
  inClusterOtlpAgentFactory() {
    return this.#C;
  }
  replaceInClusterOtlpAgentFactory(e10) {
    this.#C = e10;
  }
  reset() {
    this.#e = null, this.#t = null, this.#n = null, this.#o = null, this.#a = null, this.#u = null, this.#s = null, this.#d = null, this.#c = null, this.#i = null, this.#r = null, this.#p = null, this.#f = null, this.#l = [], this.#m = null, this.#y = rP(), this.#g = null, this.#S = null, this.#_ = null, this.#h = nP(), this.#E = null, this.#C = null;
  }
}
class aE {
  #e = void 0;
  #t = null;
  #n = void 0;
  #o = false;
  #a = null;
  #u = null;
  #s = void 0;
  #d = void 0;
  #c = /* @__PURE__ */ new Set();
  #i = /* @__PURE__ */ new Map();
  #r = void 0;
  #p = null;
  #f = /* @__PURE__ */ new Set();
  #l = null;
  #m = 0;
  #y = null;
  #g = false;
  #S = () => false;
  #_ = null;
  #h = void 0;
  #E = null;
  #C = null;
  sessionIngressToken() {
    return this.#e;
  }
  replaceSessionIngressToken(e10) {
    this.#e = e10;
  }
  inferenceRequestToken() {
    return this.#t;
  }
  replaceInferenceRequestToken(e10) {
    this.#t = e10;
  }
  oauthTokenFromFd() {
    return this.#n;
  }
  replaceOauthTokenFromFd(e10) {
    this.#n = e10;
  }
  oauthTokenFromBgSnapshot() {
    return this.#o;
  }
  replaceOauthTokenFromBgSnapshot(e10) {
    this.#o = e10;
  }
  loginStashedInTokenSlot() {
    return this.#a;
  }
  replaceLoginStashedInTokenSlot(e10) {
    this.#a = e10;
  }
  oauthOrgFromBgSnapshot() {
    return this.#u;
  }
  replaceOauthOrgFromBgSnapshot(e10) {
    this.#u = e10;
  }
  oauthScopesFromFd() {
    return this.#s;
  }
  replaceOauthScopesFromFd(e10) {
    this.#s = e10;
  }
  apiKeyFromFd() {
    return this.#d;
  }
  replaceApiKeyFromFd(e10) {
    this.#d = e10;
  }
  descriptorAnnouncementConsumed(e10) {
    return this.#c.has(e10);
  }
  markDescriptorAnnouncementConsumed(e10) {
    this.#c.add(e10);
  }
  credentialRoad(e10) {
    return this.#i.get(e10);
  }
  noteCredentialRoad(e10, t, n) {
    if (n !== null && !this.#i.has(e10)) this.#i.set(e10, t);
  }
  gatewayTokenFromDescriptor() {
    return this.#r;
  }
  replaceGatewayTokenFromDescriptor(e10) {
    this.#r = e10;
  }
  resetFdCredentialState() {
    this.#e = void 0, this.#n = void 0, this.#o = false, this.#a = null, this.#u = null, this.#s = void 0, this.#d = void 0;
  }
  gatewayAuth() {
    return this.#p;
  }
  replaceGatewayAuth(e10) {
    this.#p = e10;
  }
  isGatewayHostHeldStrict(e10) {
    return this.#f.has(e10);
  }
  holdGatewayHostStrict(e10) {
    this.#f.add(e10);
  }
  releaseGatewayHost(e10) {
    this.#f.delete(e10);
  }
  gatewayServerProcess() {
    return this.#g;
  }
  replaceGatewayServerProcess(e10) {
    this.#g = e10;
  }
  gatewayRequiredByHostPolicy() {
    return this.#S();
  }
  replaceGatewayRequiredByHostPolicyReader(e10) {
    this.#S = e10;
  }
  authenticatedAccount() {
    return this.#l;
  }
  authenticatedAccountEpoch() {
    return this.#m;
  }
  stampAuthenticatedAccount(e10) {
    let t = this.#l;
    if (e10 !== null && t !== null && e10.accountUuid === t.accountUuid && e10.emailAddress === t.emailAddress && e10.organizationUuid === t.organizationUuid) return;
    this.#m += 1, this.#l = e10, this.#y = null;
  }
  bearerPlan() {
    return this.#y;
  }
  replaceBearerPlan(e10) {
    this.#y = e10;
  }
  startupPolicySnapshot() {
    return this.#h;
  }
  replaceStartupPolicySnapshot(e10) {
    this.#h = e10;
  }
  gatewayRefreshInFlight() {
    return this.#_;
  }
  replaceGatewayRefreshInFlight(e10) {
    this.#_ = e10;
  }
  sdkOAuthTokenRefreshCallback() {
    return this.#E;
  }
  replaceSdkOAuthTokenRefreshCallback(e10) {
    this.#E = e10;
  }
  hostAuthTokenRefreshCallback() {
    return this.#C;
  }
  replaceHostAuthTokenRefreshCallback(e10) {
    this.#C = e10;
  }
  resetForTests() {
    this.#e = null, this.#t = null, this.#n = null, this.#o = false, this.#a = null, this.#s = void 0, this.#d = null, this.#c.clear(), this.#i.clear(), this.#r = void 0, this.#p = null, this.#f.clear(), this.#l = null, this.#m = 0, this.#y = null, this.#g = false, this.#S = () => false, this.#_ = null, this.#h = void 0, this.#E = null, this.#C = null;
  }
}
class lE {
  #e = void 0;
  #t = false;
  #n = false;
  #o;
  directConnectServerUrl() {
    return this.#e;
  }
  replaceDirectConnectServerUrl(e10) {
    this.#e = e10;
  }
  connectNonBlocking() {
    return this.#t;
  }
  replaceConnectNonBlocking(e10) {
    this.#t = e10;
  }
  strictConfig() {
    return this.#n;
  }
  replaceStrictConfig(e10) {
    this.#n = e10;
  }
  registerEnsureConnectedClient(e10) {
    this.#o = e10;
  }
  ensureConnectedClient() {
    return this.#o;
  }
  reset() {
    this.#e = void 0, this.#t = false, this.#n = false;
  }
}
class cE {
  #e = null;
  #t = /* @__PURE__ */ new Map();
  #n = /* @__PURE__ */ new Map();
  #o = /* @__PURE__ */ new Set();
  #a = /* @__PURE__ */ new Set();
  #u = /* @__PURE__ */ new Set();
  #s = /* @__PURE__ */ new Map();
  #d = /* @__PURE__ */ new Map();
  #c = false;
  #i = false;
  #r = false;
  #p = false;
  #f = false;
  #l = false;
  #m = false;
  #y = false;
  #g = false;
  #S = /* @__PURE__ */ new Set();
  #_ = false;
  #h = /* @__PURE__ */ new Set();
  #E = false;
  #C = false;
  #b = false;
  #w = false;
  #R = /* @__PURE__ */ new Map();
  #T = void 0;
  #v = void 0;
  #O = false;
  #I = void 0;
  #k = false;
  #x = false;
  #L = void 0;
  #P = void 0;
  #D = /* @__PURE__ */ new Map();
  #N = /* @__PURE__ */ new Map();
  promptCache1hAllowlist() {
    return this.#e;
  }
  replacePromptCache1hAllowlist(e10) {
    this.#e = e10;
  }
  thinkingTypeOverrides() {
    return this.#t;
  }
  recordThinkingTypeOverride(e10, t) {
    this.#t.set(e10, t);
  }
  servedModelsByRequestedModel() {
    return this.#n;
  }
  recordServedModels(e10, t) {
    this.#n.set(e10, t);
  }
  effortUnsupportedModels() {
    return this.#o;
  }
  markEffortUnsupported(e10) {
    this.#o.add(e10);
  }
  structuredOutputsUnsupportedModels() {
    return this.#a;
  }
  markStructuredOutputsUnsupported(e10) {
    this.#a.add(e10);
  }
  clearStructuredOutputsUnsupported() {
    this.#a = /* @__PURE__ */ new Set();
  }
  context1mRefusedModels() {
    return this.#u;
  }
  markContext1mRefused(e10) {
    this.#u.add(e10);
  }
  clearContext1mRefused() {
    this.#u = /* @__PURE__ */ new Set();
  }
  refusedBetas(e10) {
    return this.#s.get(e10) ?? [];
  }
  markBetaRefused(e10, t) {
    let n = this.#s.get(e10);
    if (n) n.add(t);
    else this.#s.set(e10, /* @__PURE__ */ new Set([t]));
  }
  learnedEffortCaps() {
    return this.#d;
  }
  midConvCachePromotionRejected() {
    return this.#c;
  }
  markMidConvCachePromotionRejected() {
    this.#c = true;
  }
  perTurnEffortOkEmitted() {
    return this.#i;
  }
  markPerTurnEffortOkEmitted() {
    this.#i = true;
  }
  lateToolAdditionsOkEmitted() {
    return this.#r;
  }
  markLateToolAdditionsOkEmitted() {
    this.#r = true;
  }
  toolResultScreeningOkEmitted() {
    return this.#p;
  }
  markToolResultScreeningOkEmitted() {
    this.#p = true;
  }
  toolChangeHeaderRefused() {
    return this.#f;
  }
  markToolChangeHeaderRefused() {
    this.#f = true;
  }
  promptEndMarkRefused() {
    return this.#l;
  }
  markPromptEndMarkRefused() {
    this.#l = true;
  }
  inlineToolsRefused() {
    return this.#m;
  }
  markInlineToolsRefused() {
    this.#m = true;
  }
  inlineToolsOkEmitted() {
    return this.#y;
  }
  markInlineToolsOkEmitted() {
    this.#y = true;
  }
  thinkingResumptionRefused() {
    return this.#g;
  }
  markThinkingResumptionRefused() {
    this.#g = true;
  }
  refusedBetaHeaders() {
    return this.#S;
  }
  markBetaHeaderRefused(e10) {
    this.#S.add(e10);
  }
  thinkingHighlightsRefused() {
    return this.#_;
  }
  markThinkingHighlightsRefused() {
    this.#_ = true;
  }
  toolChangeUnsupportedModels() {
    return this.#h;
  }
  markToolChangeUnsupportedModel(e10) {
    this.#h.add(e10);
  }
  internalModelFieldsRefused() {
    return this.#E;
  }
  markInternalModelFieldsRefused() {
    this.#E = true;
  }
  internalModelFieldsRefusalAnnounced() {
    return this.#C;
  }
  markInternalModelFieldsRefusalAnnounced() {
    this.#C = true;
  }
  thirdPartyServerClassifierRefused() {
    return this.#b;
  }
  markThirdPartyServerClassifierRefused() {
    this.#b = true;
  }
  releaseThirdPartyServerClassifierRefusal() {
    this.#b = false;
  }
  threadsHeldForServerClassifier() {
    return this.#w;
  }
  markThreadsHeldForServerClassifier() {
    this.#w = true;
  }
  autoModeUnavailableResponse(e10) {
    return this.#R.get(e10);
  }
  autoModeUnavailableResponsesInARow(e10) {
    let t = 0;
    for (let n of this.#R.values()) if (n.runKey === e10) t++;
    return t;
  }
  dropAutoModeUnavailableResponsesOfOtherTurns(e10, t) {
    for (let [n, r] of this.#R) if (r.runKey === e10 && r.turn !== void 0 && r.turn !== t) this.#R.delete(n);
  }
  noteAutoModeUnavailableResponse(e10, t) {
    this.#R.set(e10, t);
  }
  clearAutoModeUnavailableResponses(e10) {
    for (let [t, n] of this.#R) if (n.runKey === e10) this.#R.delete(t);
  }
  setAutoModeUnavailableStopNotice(e10) {
    this.#T = e10;
  }
  autoModeUnavailableStopNotice() {
    return this.#T;
  }
  setLocalCommandExitCode(e10) {
    this.#v = e10;
  }
  localCommandExitCode() {
    return this.#v;
  }
  observedGateway() {
    return this.#L;
  }
  serverClassifierFallbackChoice() {
    return this.#P;
  }
  setServerClassifierFallbackChoice(e10) {
    this.#P = e10;
  }
  clearServerClassifierFallbackChoice() {
    this.#P = void 0;
  }
  noteObservedGateway(e10) {
    this.#L ??= e10;
  }
  takeServerClassifierFallbackAnnouncement() {
    if (!this.#b || this.#O) return false;
    return this.#O = true, true;
  }
  noteNoServerCheck(e10) {
    if (this.#I !== void 0) return false;
    return this.#I = e10, true;
  }
  noteNoServerCheckStoppedTurn() {
    this.#x = true;
  }
  takeNoServerCheckStoppedTurn() {
    let e10 = this.#x;
    return this.#x = false, e10;
  }
  takeNoServerCheckAnnouncement() {
    if (this.#k || this.#I === void 0) return;
    return this.#k = true, this.#I;
  }
  inferenceProfileBackingModels() {
    return this.#D;
  }
  recordInferenceProfileBackingModel(e10, t) {
    this.#D.set(e10, t);
  }
  foundryDeploymentCapabilities() {
    return this.#N;
  }
  reset() {
    this.#e = null, this.#t = /* @__PURE__ */ new Map(), this.#n = /* @__PURE__ */ new Map(), this.#o = /* @__PURE__ */ new Set(), this.#a = /* @__PURE__ */ new Set(), this.#u = /* @__PURE__ */ new Set(), this.#s = /* @__PURE__ */ new Map(), this.#d = /* @__PURE__ */ new Map(), this.#c = false, this.#i = false, this.#r = false, this.#p = false, this.#f = false, this.#l = false, this.#m = false, this.#y = false, this.#g = false, this.#S = /* @__PURE__ */ new Set(), this.#_ = false, this.#h = /* @__PURE__ */ new Set(), this.#E = false, this.#C = false, this.#b = false, this.#w = false, this.#R.clear(), this.#T = void 0, this.#v = void 0, this.#O = false, this.#I = void 0, this.#k = false, this.#x = false, this.#L = void 0, this.#P = void 0, this.#D = /* @__PURE__ */ new Map(), this.#N = /* @__PURE__ */ new Map();
  }
}
class uE {
  #e = false;
  #t = false;
  longContext1mCreditsBlocked() {
    return this.#e;
  }
  replaceLongContext1mCreditsBlocked(e10) {
    this.#e = e10;
  }
  usageCreditsRequired() {
    return this.#t;
  }
  replaceUsageCreditsRequired(e10) {
    this.#t = e10;
  }
  reset() {
    this.#e = false, this.#t = false;
  }
}
class dE {
  #e = false;
  #t = false;
  #n = oP;
  #o = $e();
  selectorGate() {
    return this.#e;
  }
  selectorGateEverOn() {
    return this.#t;
  }
  replaceSelectorGate(e10) {
    this.#e = e10, this.#t ||= e10;
  }
  inheritSelectorGateEverOn() {
    this.#t = true;
  }
  resampleSelectorGate(e10) {
    let t = this.#e;
    if (this.#e = e10, this.#t ||= e10, t !== e10) this.#o.emit(e10);
  }
  subscribeSelectorGateChanged(e10) {
    return this.#o.subscribe(e10);
  }
  replaceHostGateSubscription(e10) {
    let t = this.#n;
    this.#n = e10, t();
  }
  dropHostGateSubscription() {
    this.replaceHostGateSubscription(oP);
  }
}
function oP() {
}
class pE {
  started = false;
  stagingReaped = false;
  claim() {
    if (this.started) return false;
    return this.started = true, true;
  }
  claimStagingReap() {
    if (this.stagingReaped) return false;
    return this.stagingReaped = true, true;
  }
}
class fE {
  clock;
  backgroundHousekeeping;
  launchOptions;
  settingsSource;
  extensionsConfig;
  modelStringsCache;
  diagnostics;
  telemetryHandles;
  credentialSlots;
  mcpProcessWiring;
  requestLatches;
  accountCreditLatches;
  proactivity;
  constructor(e10) {
    this.clock = e10.clock, this.backgroundHousekeeping = e10.backgroundHousekeeping, this.launchOptions = e10.launchOptions, this.settingsSource = e10.settingsSource, this.extensionsConfig = e10.extensionsConfig, this.modelStringsCache = e10.modelStringsCache, this.diagnostics = e10.diagnostics, this.telemetryHandles = e10.telemetryHandles, this.credentialSlots = e10.credentialSlots, this.mcpProcessWiring = e10.mcpProcessWiring, this.requestLatches = e10.requestLatches, this.accountCreditLatches = e10.accountCreditLatches, this.proactivity = e10.proactivity;
  }
}
function sP() {
  return new fE({ clock: new bf(), backgroundHousekeeping: new pE(), launchOptions: new tE(), settingsSource: new nE(), extensionsConfig: new rE(), modelStringsCache: new oE(), diagnostics: new sE(), telemetryHandles: new iE(), credentialSlots: new aE(), mcpProcessWiring: new lE(), requestLatches: new cE(), accountCreditLatches: new uE(), proactivity: new dE() });
}
function QJ(e10 = cS()) {
  return qk({ host: sP(), id: tk() ?? crypto.randomUUID(), project: { originalCwd: e10, projectRoot: e10, cwd: e10 } });
}
var mE = QJ(fk);
function Jt() {
  return Io();
}
function Io() {
  return iP()?.session ?? mE;
}
function Vr(e10) {
  return e10.of(mE.host);
}
function e5() {
  let e10 = iP();
  return e10?.session ? void 0 : e10;
}
var iP = () => {
  return;
};
Vk((e10) => Gk.of(Io().host).reporter?.(e10));
Jk({ isDiskless: () => Qe(), isDisklessProcess: () => hE(), reportBuilt: (e10) => Xk.of(Io().host).reporter?.(e10) });
function gE() {
  return e5()?.sessionId ?? Io().id;
}
function Qe() {
  return dP();
}
function dP() {
  return Io().host.launchOptions.diskless();
}
function hE() {
  return mE.host.launchOptions.diskless();
}
var Lf = { home: (e10) => ({ space: "home", path: e10 }), workspace: (e10) => ({ space: "workspace", path: e10 }), system: (e10) => ({ space: "system", path: e10 }), userNamed: (e10) => ({ space: "userNamed", path: e10 }) };
var _E = globalThis.process?.getBuiltinModule?.("async_hooks"), mP = _E !== void 0, yE = _E ? new _E.AsyncLocalStorage() : { run: (e10, t) => t(), getStore: () => {
  return;
} };
function gP({ writeBatch: e10, sizeOf: t, flushIntervalMs: n = 1e3, maxBufferSize: r = 100, maxBufferBytes: o = 1 / 0, immediateMode: s = false }) {
  let i = [], a = 0, l = null, c = null;
  function d() {
    if (l) clearTimeout(l), l = null;
  }
  function p(_) {
    try {
      e10(_);
    } catch {
    }
  }
  function f() {
    if (c) p(c), c = null;
    if (i.length === 0) return;
    p(i), i = [], a = 0, d();
  }
  function m() {
    if (!l) l = setTimeout(f, n);
  }
  function g() {
    if (c) {
      c.push(...i), i = [], a = 0, d();
      return;
    }
    let _ = i;
    i = [], a = 0, d(), c = _, setImmediate(() => {
      let y = c;
      if (c = null, y) p(y);
    });
  }
  return { write(_) {
    if (s) {
      p([_]);
      return;
    }
    if (i.push(_), a += t(_), m(), i.length >= r || a >= o) g();
  }, flush: f, dispose() {
    f();
  } };
}
function r5(e10) {
  if (typeof e10 === "function") return e10;
  if (Symbol.asyncDispose in e10) return () => e10[Symbol.asyncDispose]();
  return () => e10[Symbol.dispose]();
}
class SE {
  #e = /* @__PURE__ */ new Set();
  #t = false;
  get drainStarted() {
    return this.#t;
  }
  register(e10) {
    let t = r5(e10);
    this.#e.add(t);
    let n = () => {
      this.#e.delete(t);
    };
    return Object.assign(n, { [Symbol.dispose]: n });
  }
  async drain() {
    this.#t = true;
    let e10 = Array.from(this.#e);
    this.#e.clear();
    let n = (await Promise.allSettled(e10.map(async (r) => r()))).find((r) => r.status === "rejected");
    if (n !== void 0) throw n.reason;
  }
  async [Symbol.asyncDispose]() {
    await this.drain();
  }
  get sizeForTesting() {
    return this.#e.size;
  }
}
class hP {
  cleanup = new SE();
  preExitFlush = new SE();
  preExitFlushWaits = /* @__PURE__ */ new Map();
}
var o5 = new xe(() => new hP());
function s5() {
  return Vr(o5);
}
function Mf(e10) {
  return s5().cleanup.register(e10);
}
var i5 = it({ read: void 0 });
function _P() {
  return i5.read;
}
class SP {
  parsed = /* @__PURE__ */ new Map();
  lookup(e10) {
    return this.parsed.get(e10);
  }
  remember(e10, t) {
    this.parsed.set(e10, t);
  }
  reset() {
    this.parsed.clear();
  }
}
var yP = new SP();
function EP(e10) {
  let t = yP.lookup(e10);
  if (t !== void 0) return t;
  let n = a5(e10);
  return yP.remember(e10, n), n;
}
function a5(e10) {
  if (!e10 || e10.trim() === "") return null;
  let t = e10.split(",").map((s) => s.trim()).filter(Boolean);
  if (t.length === 0) return null;
  let n = t.some((s) => s.startsWith("!")), r = t.some((s) => !s.startsWith("!"));
  if (n && r) return null;
  let o = t.map((s) => s.replace(/^!/, "").toLowerCase());
  return { include: n ? [] : o, exclude: n ? o : [], isExclusive: n };
}
function l5(e10) {
  let t = [], n = e10.match(/^MCP server ["']([^"']+)["']/);
  if (n && n[1]) t.push("mcp"), t.push(n[1].toLowerCase());
  else {
    let s = e10.match(/^([^:[]+):/);
    if (s && s[1]) t.push(s[1].trim().toLowerCase());
  }
  let r = e10.match(/^\[([^\]]+)]/);
  if (r && r[1]) t.push(r[1].trim().toLowerCase());
  if (e10.toLowerCase().includes("1p event:")) t.push("1p");
  let o = e10.match(/:\s*([^:]+?)(?:\s+(?:type|mode|status|event))?:/);
  if (o && o[1]) {
    let s = o[1].trim().toLowerCase();
    if (s.length < 30 && !s.includes(" ")) t.push(s);
  }
  return Array.from(new Set(t));
}
function c5(e10, t) {
  if (!t) return true;
  if (e10.length === 0) return false;
  if (t.isExclusive) return !e10.some((n) => t.exclude.includes(n));
  else return e10.some((n) => t.include.includes(n));
}
function bP(e10, t) {
  if (!t) return true;
  let n = l5(e10);
  return c5(n, t);
}
var u5 = /^[+-]?(\d+(\.\d*)?|\.\d+)[eE][+-]?\d+$/, d5 = /^[+-]?\d{1,3}([_,\u00A0\u202F ])\d{3}(?:\1\d{3})*$/, p5 = /[_,\u00A0\u202F ]/g;
function EE(e10) {
  if (e10.length <= 32) {
    if (u5.test(e10)) {
      let t = Number(e10);
      return Number.isInteger(t) ? t : NaN;
    }
    if (d5.test(e10)) return parseInt(e10.replace(p5, ""), 10);
  }
  return;
}
function mu(e10) {
  let t = String(e10).trim();
  return EE(t) ?? parseInt(t, 10);
}
function gu() {
  return process.env.CLAUDE_CONFIG_DIR;
}
function Nf(e10) {
  let t = process.env[e10];
  if (t === void 0) return;
  let n = String(t).trim();
  return n ? n : void 0;
}
function AP(e10, t) {
  let n = it(/* @__PURE__ */ new Map());
  function r() {
    let o = t(), s = n.get(o);
    if (s) return s.value;
    let i = e10();
    return n.set(o, { value: i }), i;
  }
  return Object.assign(r, { cache: n });
}
var Mt = AP(() => (gu() ?? pn.join(require$$0$1.homedir(), ".claude")).normalize("NFC"), gu);
function za() {
  return Df() ? null : Mt();
}
function OP() {
  return process.env.CLAUDE_CODE_PROJECT_DIR_NAME;
}
var g5 = /^[A-Za-z0-9_-]{1,64}$/, h5 = /^(?:con|prn|aux|nul|com[0-9]|lpt[0-9])$/i;
function bE(e10) {
  if (!e10 || !g5.test(e10) || h5.test(e10)) return;
  return e10;
}
function _5() {
  return `${Df()}\0${gu() ?? ""}\0${OP() ?? ""}`;
}
var TP = AP(() => gu() || Df() ? bE(OP()) : void 0, _5);
(() => {
  let e10 = process.env.CLAUDE_CODE_SLOW_OPERATION_THRESHOLD_MS;
  if (e10 !== void 0) {
    let t = Number(e10);
    if (!Number.isNaN(t) && t >= 0) return t;
  }
  return 1 / 0;
})();
var y5 = { [Symbol.dispose]() {
} };
function S5() {
  return y5;
}
var jt = S5;
function ae(e10, t, n) {
  let o = [];
  try {
    const r = ht(o, jt`JSON.stringify(${CE(e10)})`, 0);
    return JSON.stringify(e10, t, n);
  } catch (s) {
    var i = s, a = 1;
  } finally {
    _t(o, i, a);
  }
}
var je = (e10, t) => {
  let r = [];
  try {
    const n = ht(r, jt`JSON.parse(${CE(e10)})`, 0);
    return typeof t > "u" ? JSON.parse(e10) : JSON.parse(e10, t);
  } catch (o) {
    var s = o, i = 1;
  } finally {
    _t(r, s, i);
  }
};
function CE(e10) {
  return typeof e10 === "string" ? e10.length : e10;
}
var L5 = "→";
function M5() {
  return process.platform === "win32" ? 0 : un__namespace.constants.O_NOFOLLOW | un__namespace.constants.O_NONBLOCK;
}
function OE() {
  return process.platform === "win32" ? "r" : un__namespace.constants.O_RDONLY | un__namespace.constants.O_NONBLOCK | un__namespace.constants.O_NOCTTY;
}
var Ha = process.platform === "win32" ? /[\\/]+/ : /\/+/;
function TE(e10, t) {
  let n = (a) => a.split(Ha).filter(Boolean), r = pn__namespace.resolve(e10), o = pn__namespace.resolve(t), s = n(r), i = n(o);
  return pn__namespace.parse(r).root === pn__namespace.parse(o).root && s.length < i.length && s.every((a, l) => a === i[l]);
}
function RE(e10) {
  let t = "";
  for (let r of e10.split(/([\\/]+)/)) {
    if (r === "." || r === "..") break;
    t += r;
  }
  let n = t.replace(/(?<=[^\\/])[\\/]+$/, "");
  return n === "" ? e10 : n;
}
function N5(e10) {
  let t = pn__namespace.join(e10).replace(/(?<=[^\\/])[\\/]+$/, "");
  if (Dn(t) && !Tr(t)) return t;
  return RE(e10);
}
function U5(e10) {
  if (e10.startsWith("\\\\")) return RE(e10);
  let t = e10.replace(/^\/+/, "/"), n = uu(t);
  if (n !== null) return n;
  return RE(e10);
}
var F5 = process.platform === "win32" ? N5 : U5;
function zf(e10, t, n) {
  let r = Ni(e10);
  if (t.length === 0 || r || t.some((o) => o === "." || o === "..")) {
    if (n !== void 0 && (t.length > 0 || r)) n(pn__namespace.join(e10, ...t));
    return r ? F5(e10) : e10;
  }
  return pn__namespace.join(e10, ...t);
}
var wr = "\0unverified-ancestry", jf = "\0opaque-link-text";
function $5(e10) {
  return $a(pn__namespace.isAbsolute(e10) ? e10 : e10.replace(/^(?:\.\.(?:[\\/]+|$))+/, ""));
}
function z5(e10, t = process.platform === "win32") {
  return e10.includes("�") || $5(e10) || t && (/^(?:[A-Za-z]:(?![\\/])|[\\/](?![\\/]))/.test(e10) || /^[\\/]{2}\?[\\/]/.test(e10) && !/^[\\/]{2}\?[\\/](?:[A-Za-z]:[\\/]|UNC[\\/])/i.test(e10) || e10.split(/[\\/]/).some((n) => n !== "." && n !== ".." && /[. ]$/.test(n)));
}
function PP(e10, t, n = false, r = false, o = false) {
  if (t?.unreadableAncestry !== "unverified") return;
  let s = e10 !== void 0 && typeof e10 === "object" && "errno" in e10 ? e10.errno : void 0;
  if (s === "ENOENT" || s === "ENOTDIR") return;
  if (s === "ENAMETOOLONG" && !n && !r && !o) return;
  return wr;
}
function Ui(e10) {
  return ko(e10);
}
function $f(e10, t) {
  return t !== void 0 && t.some((n) => ko(n) && !YS(e10, n) && (wE(e10, n) || lr(e10)));
}
function IP(e10, t) {
  return t !== void 0 && t.some((n) => ko(n) && wE(n, e10));
}
function wE(e10, t) {
  let n = (s) => s.length > 1 ? s.replace(/\/+$/, "") : s, [r, o] = [n(e10), n(t)];
  return r === o || r.startsWith(o === "/" ? o : o + "/");
}
function Hf(e10, t) {
  return t === void 0 || t.every((n) => YS(e10, n));
}
function DP(e10, t) {
  return t === void 0 || t.every((n) => Mk(e10, n));
}
function LP(e10, t, n) {
  let r = lr(e10) ? uu(e10) : null;
  if (r === null || !Hf(r, t)) return;
  let o = pn__namespace.join(e10);
  if (lr(o) && cu(o) === cu(r)) return o;
  return zf(e10, [], n);
}
function H5(e10) {
  if (e10?.anchors !== void 0 && e10.anchors.length > 0) return e10.anchors;
  return e10?.anchor !== void 0 ? [e10.anchor] : void 0;
}
async function xE(e10, t = vE) {
  return $a(e10) || pu(e10) || vo(e10) || Es(e10) || await hu(t, e10, { surfaceNetworkRaw: true, unreadableAncestry: "unverified" }) !== void 0;
}
function hu(e10, t, n, r, o) {
  return B5(NP(t, n), r, async (s) => {
    if (s.kind === "lstat") {
      if (o === void 0) return e10.lstat(s.path);
      let i;
      try {
        i = await e10.lstatBigint(s.path);
      } catch (a) {
        throw o(s.path, void 0), a;
      }
      return o(s.path, i), i;
    }
    if (s.kind === "opendirNofollow") return await e10.openDirNoFollow(s.path), "ok";
    return e10.readlink(s.path);
  });
}
async function B5(e10, t, n) {
  let r;
  for (; ; ) {
    let o = e10.next(r);
    if (o.done) return o.value;
    try {
      r = await n(o.value);
    } catch (s) {
      r = { errno: me(s) };
    }
  }
}
function* NP(e10, t) {
  let n = H5(t);
  if (Ui(e10) && !$f(e10, n)) return e10;
  if (Dn(e10) && !Tr(e10) && DP(e10, n) || lr(e10) && Hf(e10, n)) return;
  let r = pn__namespace.resolve(e10), o = pn__namespace.parse(r).root, s = o, i = r.slice(o.length).split(Ha).filter(Boolean), a = 0, l = i.length, c = false, d = false, p, f = 64, m = () => i.some((_) => Ni(_)), g = () => /[. ]$/.test(i[0]);
  while (i.length > 0 && a < f) {
    if (c && Ni(i[0])) return wr;
    let _ = pn__namespace.join(s, i[0]);
    if (lr(_) && Hf(_, n) || Ui(_) && !($f(_, n) || IP(_, n))) return zf(_, i.slice(1), t?.onCollapsedLanding);
    if (Ss(_)) {
      if (t?.surfaceNetworkRaw === true || t?.unreadableAncestry === "unverified") return wr;
      return zf(_, i.slice(1), t?.onCollapsedLanding);
    }
    let y = process.platform === "darwin" && _ !== "/dev/fd" && wE(_, "/dev/fd");
    if (y && pn__namespace.dirname(_) === "/dev/fd" && i.some((R, v) => v > 0 && (R === ".." || R === "."))) {
      i.shift();
      while (i[0] === "." && i.length > 1) i.shift();
      s = _;
      continue;
    }
    let S = y ? { errno: "ENOENT" } : yield { kind: "lstat", path: _ };
    if (S === void 0 || typeof S === "string" || "errno" in S) {
      if (process.platform !== "win32" && typeof S === "object" && "errno" in S && S.errno !== void 0 && S.errno !== "ENOENT" && S.errno !== "ENOTDIR" && S.errno !== "ENAMETOOLONG") {
        if (typeof (yield { kind: "opendirNofollow", path: _ }) === "string") {
          d = true, i.shift(), s = _;
          continue;
        }
      }
      if (t?.launchAncestry && !d && typeof S === "object" && "errno" in S && (S.errno === "EPERM" || S.errno === "EACCES") && TE(_, t.launchAncestry)) {
        c = true, i.shift(), s = _;
        continue;
      }
      if (typeof S === "object" && "errno" in S && (S.errno === "ENOENT" || S.errno === "ENOTDIR")) t?.onOutcome?.({ kind: "absent", at: s, remaining: [...i], fromLinkTarget: i.length > l, ...S.errno === "ENOTDIR" && { notAFolder: true } });
      return PP(S, t, a > 0, m(), g());
    }
    let E = S;
    if (d = true, !E.isSymbolicLink()) {
      i.shift(), s = _;
      continue;
    }
    a++;
    let b = _ + "\0" + i.join("\0");
    if ((p ??= /* @__PURE__ */ new Set()).has(b)) return;
    p.add(b);
    let C = yield { kind: "readlink", path: _ };
    if (typeof C !== "string") return PP(C, t, a > 0, m(), g());
    let A = C;
    if (t?.literalLinkText === "opaque" && z5(A)) return jf;
    if (!pn__namespace.isAbsolute(A)) {
      let R = A.split(Ha).filter(Boolean);
      if (t?.surfaceNetworkRaw === true) {
        let v = LP((s.endsWith(pn__namespace.sep) ? s : s + pn__namespace.sep) + [...R, ...i.slice(1)].join(pn__namespace.sep), n, t?.onCollapsedLanding);
        if (v !== void 0) return v;
      }
      i.shift(), t?.onHop?.({ composed: pn__namespace.resolve(s, A, ...i), leaf: i.length === 0, text: A }), l = Math.min(l, i.length), i = [...R, ...i];
      continue;
    }
    let T = A;
    if (t?.surfaceNetworkRaw === true && i.length > 1 && Es(T)) {
      let R = LP([T, ...i.slice(1)].join(pn__namespace.sep), n, t?.onCollapsedLanding);
      if (R !== void 0) return R;
    }
    if (Dn(T) && !Tr(T) && DP(T, n) || lr(T) && Hf(T, n) || Ui(T) && !($f(T, n) || i.length > 1 && IP(T, n))) return i.shift(), zf(T, i, t?.onCollapsedLanding);
    if (t?.surfaceNetworkRaw === true && Ni(T) && (Dn(T) || vo(T) || ko(T) || Es(T))) return i.shift(), i.length === 0 ? T : T + pn__namespace.sep + i.join(pn__namespace.sep);
    i.shift();
    let U = pn__namespace.parse(T).root || pn__namespace.sep, F = pn__namespace.parse(_).root, pe = /^[\\/]$/.test(U) && F !== "" && !/^[\\/]$/.test(F);
    if (pe && (t?.surfaceNetworkRaw === true || t?.unreadableAncestry === "unverified")) return wr;
    t?.onHop?.({ composed: i.length === 0 ? T : pn__namespace.resolve(T, ...i), leaf: i.length === 0, text: A }), s = pe ? F : U, d = false, l = Math.min(l, i.length), i = [...T.slice(U.length).split(Ha).filter(Boolean), ...i];
  }
  if (i.length > 0 && t?.literalLinkText === "opaque") return jf;
  if (i.length > 0) return wr;
  if (a > 0 && Es(s)) return s;
  if (Ui(s) && !$f(s, n)) return s;
  if (i.length === 0) t?.onOutcome?.({ kind: "resolved", path: s });
  return;
}
var vE = { cwd() {
  return process.cwd();
}, existsSync(e10) {
  let n = [];
  try {
    const t = ht(n, jt`fs.existsSync(${e10})`, 0);
    return un__namespace.existsSync(e10);
  } catch (r) {
    var o = r, s = 1;
  } finally {
    _t(n, o, s);
  }
}, async stat(e10) {
  return promises.stat(e10);
}, async lstat(e10) {
  return promises.lstat(e10);
}, async openDirNoFollow(e10) {
  if (process.platform === "win32") throw Error("openDirNoFollow is a POSIX-only examination probe");
  await (await promises.open(e10, un__namespace.constants.O_DIRECTORY | un__namespace.constants.O_NOFOLLOW)).close();
}, openDirNoFollowSync(e10) {
  if (process.platform === "win32") throw Error("openDirNoFollowSync is a POSIX-only examination probe");
  let t = un__namespace.openSync(e10, un__namespace.constants.O_DIRECTORY | un__namespace.constants.O_NOFOLLOW);
  un__namespace.closeSync(t);
}, async lstatBigint(e10) {
  return promises.lstat(e10, { bigint: true });
}, async statBigint(e10) {
  return promises.stat(e10, { bigint: true });
}, async readdir(e10) {
  return promises.readdir(e10, { withFileTypes: true });
}, async unlink(e10) {
  return promises.unlink(e10);
}, async rmdir(e10) {
  return promises.rmdir(e10);
}, async rm(e10, t) {
  return promises.rm(e10, t);
}, async mkdir(e10, t) {
  try {
    await promises.mkdir(e10, { recursive: true, ...t });
  } catch (n) {
    if (me(n) !== "EEXIST") throw n;
  }
}, async readFile(e10, t) {
  return promises.readFile(e10, { encoding: t.encoding });
}, async rename(e10, t) {
  return promises.rename(e10, t);
}, async realpath(e10) {
  return Ye(await promises.realpath(e10));
}, async readlink(e10) {
  return promises.readlink(e10);
}, async copyFile(e10, t) {
  return promises.copyFile(e10, t);
}, async appendFile(e10, t, n) {
  if (n?.mode !== void 0) try {
    let r = await promises.open(e10, "ax", n.mode);
    try {
      await r.appendFile(t);
    } finally {
      await r.close();
    }
    return;
  } catch (r) {
    if (me(r) !== "EEXIST") throw r;
  }
  return promises.appendFile(e10, t);
}, async symlink(e10, t, n) {
  return promises.symlink(e10, t, n);
}, async link(e10, t) {
  return promises.link(e10, t);
}, async chmod(e10, t) {
  return promises.chmod(e10, t);
}, statSync(e10) {
  let n = [];
  try {
    const t = ht(n, jt`fs.statSync(${e10})`, 0);
    return un__namespace.statSync(e10);
  } catch (r) {
    var o = r, s = 1;
  } finally {
    _t(n, o, s);
  }
}, lstatSync(e10) {
  let n = [];
  try {
    const t = ht(n, jt`fs.lstatSync(${e10})`, 0);
    return un__namespace.lstatSync(e10);
  } catch (r) {
    var o = r, s = 1;
  } finally {
    _t(n, o, s);
  }
}, readFileSync(e10, t) {
  let r = [];
  try {
    const n = ht(r, jt`fs.readFileSync(${e10})`, 0);
    return un__namespace.readFileSync(e10, { encoding: t.encoding });
  } catch (o) {
    var s = o, i = 1;
  } finally {
    _t(r, s, i);
  }
}, readSync(e10, t) {
  let o = [];
  try {
    const n = ht(o, jt`fs.readSync(${e10}, ${t.length} bytes)`, 0);
    let r = void 0;
    try {
      r = un__namespace.openSync(e10, "r");
      let l = [], c = 0;
      while (c < t.length) {
        let p = Buffer.allocUnsafe(Math.min(65536, t.length - c)), f = un__namespace.readSync(r, p, 0, p.length, c);
        if (f === 0) break;
        l.push(p.subarray(0, f)), c += f;
      }
      return { buffer: Buffer.concat(l, c), bytesRead: c };
    } finally {
      if (r !== void 0) un__namespace.closeSync(r);
    }
  } catch (s) {
    var i = s, a = 1;
  } finally {
    _t(o, i, a);
  }
}, appendFileSync(e10, t, n) {
  let o = [];
  try {
    const r = ht(o, jt`fs.appendFileSync(${e10}, ${t.length} chars)`, 0);
    if (n?.mode !== void 0) try {
      let l = un__namespace.openSync(e10, "ax", n.mode);
      try {
        un__namespace.appendFileSync(l, t);
      } finally {
        un__namespace.closeSync(l);
      }
      return;
    } catch (l) {
      if (me(l) !== "EEXIST") throw l;
    }
    un__namespace.appendFileSync(e10, t);
  } catch (s) {
    var i = s, a = 1;
  } finally {
    _t(o, i, a);
  }
}, unlinkSync(e10) {
  let n = [];
  try {
    const t = ht(n, jt`fs.unlinkSync(${e10})`, 0);
    un__namespace.unlinkSync(e10);
  } catch (r) {
    var o = r, s = 1;
  } finally {
    _t(n, o, s);
  }
}, renameSync(e10, t) {
  let r = [];
  try {
    const n = ht(r, jt`fs.renameSync(${e10} ${L5} ${t})`, 0);
    un__namespace.renameSync(e10, t);
  } catch (o) {
    var s = o, i = 1;
  } finally {
    _t(r, s, i);
  }
}, readlinkSync(e10) {
  let n = [];
  try {
    const t = ht(n, jt`fs.readlinkSync(${e10})`, 0);
    return un__namespace.readlinkSync(e10);
  } catch (r) {
    var o = r, s = 1;
  } finally {
    _t(n, o, s);
  }
}, realpathSync(e10) {
  let n = [];
  try {
    const t = ht(n, jt`fs.realpathSync(${e10})`, 0);
    return Ye(un__namespace.realpathSync(e10));
  } catch (r) {
    var o = r, s = 1;
  } finally {
    _t(n, o, s);
  }
}, mkdirSync(e10, t) {
  let o = [];
  try {
    const n = ht(o, jt`fs.mkdirSync(${e10})`, 0);
    let r = { recursive: true };
    if (t?.mode !== void 0) r.mode = t.mode;
    try {
      un__namespace.mkdirSync(e10, r);
    } catch (l) {
      if (me(l) !== "EEXIST") throw l;
    }
  } catch (s) {
    var i = s, a = 1;
  } finally {
    _t(o, i, a);
  }
}, readdirSync(e10) {
  let n = [];
  try {
    const t = ht(n, jt`fs.readdirSync(${e10})`, 0);
    return un__namespace.readdirSync(e10, { withFileTypes: true });
  } catch (r) {
    var o = r, s = 1;
  } finally {
    _t(n, o, s);
  }
}, rmSync(e10, t) {
  let r = [];
  try {
    const n = ht(r, jt`fs.rmSync(${e10})`, 0);
    un__namespace.rmSync(e10, t);
  } catch (o) {
    var s = o, i = 1;
  } finally {
    _t(r, s, i);
  }
}, createWriteStream(e10) {
  return un__namespace.createWriteStream(e10);
}, async readFileBytes(e10, t) {
  if (t === void 0) return promises.readFile(e10);
  let n = await promises.open(e10, OE());
  try {
    if (!(await n.stat()).isFile()) return Buffer.alloc(0);
    return await kE(n, t, "file");
  } finally {
    await n.close();
  }
}, async readFileFdGated(e10, t) {
  try {
    let n = M5();
    if (n === 0) {
      if (!(await promises.lstat(e10)).isFile()) return null;
    }
    let r = await promises.open(e10, un__namespace.constants.O_RDONLY | n);
    try {
      let o = await r.stat();
      if (!o.isFile() || o.size > t) return null;
      let s = Number(o.size), i = Buffer.allocUnsafe(s), a = 0;
      while (a < s) {
        let { bytesRead: l } = await r.read(i, a, s - a, a);
        if (l === 0) break;
        a += l;
      }
      return { content: (a < s ? i.subarray(0, a) : i).toString("utf8"), stats: o };
    } finally {
      await r.close();
    }
  } catch {
    return null;
  }
} };
function ke() {
  return vE;
}
async function kE(e10, t, n) {
  let o = [], s = 0;
  while (s < t) {
    let i = Buffer.allocUnsafe(Math.min(65536, t - s)), { bytesRead: a } = await e10.read(i, 0, i.length, s);
    if (a === 0) break;
    o.push(i.subarray(0, a)), s += a;
  }
  return Buffer.concat(o, s);
}
function Z5(e10, t, n) {
  if (e10.destroyed || e10.writableEnded) return "dropped";
  return e10.write(t, n) === false ? "backed-up" : "accepted";
}
var FP = 1048576, J5 = 1e4, X5 = Mi((e10) => e10());
class IE {
  unflushed = { length: 0, since: 0 };
  droppedCount = 0;
  droppedTotal = 0;
  write(e10, t) {
    let n = this.unflushed;
    if (t && n.length >= FP && (this.droppedCount > 0 || Date.now() - n.since >= J5)) {
      this.droppedCount++, this.droppedTotal++;
      return;
    }
    let r = "writing", o = () => {
      let i = r === "unflushed";
      if (r = "flushed", i) n.length -= e10.length, this.reportDropped();
    };
    if (X5(() => Z5(process.stderr, e10, o)) === "backed-up" && r === "writing") {
      if (r = "unflushed", n.length === 0) n.since = Date.now();
      n.length += e10.length;
    }
  }
  giveUpOnUnflushed() {
    this.unflushed = { length: 0, since: 0 }, this.reportDropped();
  }
  getDroppedTotal() {
    return this.droppedTotal;
  }
  reset() {
    Object.assign(this, new IE());
  }
  reportDropped() {
    if (this.droppedCount > 0 && this.unflushed.length < FP) {
      let e10 = this.droppedCount;
      this.droppedCount = 0, this.write(`[stderr messages dropped before this line: ${e10}. Whatever reads this stderr had not caught up for over 10 s and 1 MiB of output.]
`, false);
    }
  }
}
var Q5 = it(new IE());
function $P(e10, { mayDrop: t = false } = {}) {
  Q5.write(e10, t);
}
function _u(e10) {
  return e10.charAt(0).toUpperCase() + e10.slice(1);
}
function As(e10, t) {
  if (t <= 0) return "";
  if (e10.length <= t) return e10;
  let n = e10.slice(0, t), r = n.charCodeAt(t - 1);
  return VP(r >= 55296 && r <= 56319 ? n.slice(0, -1) : n);
}
function VP(e10) {
  if (typeof Buffer < "u") return Buffer.from(e10, "utf16le").toString("utf16le");
  return lX(e10);
}
function lX(e10) {
  let n = [];
  for (let r = 0; r < e10.length; r += 8192) {
    let o = Math.min(r + 8192, e10.length), s = new Uint16Array(o - r);
    for (let i = r; i < o; i++) s[i - r] = e10.charCodeAt(i);
    n.push(String.fromCharCode(...s));
  }
  return n.join("");
}
var cX = /[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?<![\uD800-\uDBFF])[\uDC00-\uDFFF]/, qP = /[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?<![\uD800-\uDBFF])[\uDC00-\uDFFF]/g, Wf = typeof String.prototype.isWellFormed === "function" ? Function.prototype.call.bind(String.prototype.isWellFormed) : void 0;
typeof String.prototype.toWellFormed === "function" ? Function.prototype.call.bind(String.prototype.toWellFormed) : void 0;
function yu(e10) {
  if (Wf) return Wf(e10);
  return !cX.test(e10);
}
function Su(e10) {
  if (Wf && Wf(e10)) return e10;
  return e10.replace(qP, "");
}
var eI = "\\p{Default_Ignorable_Code_Point}\\u2800", xr = `\\p{Cc}\\p{Cf}\\p{Cs}\\p{Co}\\p{Cn}\\u2028\\u2029${eI}`, bu = String.raw`\u00ad\u034f\u061c\u115f\u1160\u17b4\u17b5\u180b-\u180f\u200b-\u200f\u202a-\u202e\u2060-\u206f\u2800\u3164\ufe00-\ufe0f\uffa0\ufff0-\ufffb\uDC00-\uDFFF\uDB40-\uDB43`, tI = String.raw`\u0600-\u0605\u06dd\u070f\u0890\u0891\u08e2`, Ga = `[${bu}${tI}\\ufeff]*`;
function Cu(e10) {
  return e10.replace(/([a-z)])(?=[a-z(\[])/gi, `$1${Ga}`).replace(/\[_-\]\?/g, `(?:[_-]${Ga})?`);
}
[2304, 2432, 2688, 2816, 3072, 3200, 3328].map(yX);
function yX(e10) {
  let t = `[${Zf(e10 + 21)}-${Zf(e10 + 57)}]`, n = e10 === 3328 ? "" : `${Zf(e10 + 60)}?`;
  return `[\\u200C\\u200D](?<=${t}${n}${Zf(e10 + 77)}.)(?=${t})`;
}
function Zf(e10) {
  return `\\u{${e10.toString(16)}}`;
}
var SX = new RegExp(`[\\p{Cf}\\p{Co}\\p{Cn}\\u2028\\u2029\\u007F-\\u009F${eI}]`, "gu");
function Jf(e10) {
  return e10.replace(/[\p{Cc}\p{Cf}\u2028\u2029]+/gu, " ");
}
function nI(e10) {
  return e10.replace(SX, (t) => Array.from({ length: t.length }, (n, r) => `\\u${t.charCodeAt(r).toString(16).padStart(4, "0")}`).join(""));
}
function rI(e10) {
  return e10.split("").map((t) => "\\u" + t.charCodeAt(0).toString(16).padStart(4, "0")).join("");
}
function oI(e10) {
  let t = new Int32Array(e10.length);
  for (let n = 0; n < e10.length; n++) t[n] = n;
  return { text: e10, origin: t };
}
function sI(e10, t, n) {
  let r = [];
  for (let o of e10.text.matchAll(t)) {
    let { keep: s, insert: i, keepEnd: a = 0 } = n(o), l = o.index ?? 0, c = o[0].length, d = Math.min(Math.max(s | 0, 0), c), p = Math.min(Math.max(a | 0, 0), c - d);
    r.push([l + d, l + c - p, i]);
  }
  return Xf(e10, r);
}
function Xf(e10, t) {
  if (t.length === 0) return e10;
  let { text: n, origin: r } = e10, o = n.length;
  for (let [c, d, p] of t) o += p.length - (d - c);
  let s = new Int32Array(o), i = [], a = 0, l = 0;
  for (let [c, d, p] of t) i.push(n.slice(a, c)), s.set(r.subarray(a, c), l), l += c - a, i.push(p), s.fill(-1, l, l + p.length), l += p.length, a = d;
  return i.push(n.slice(a)), s.set(r.subarray(a), l), { text: i.join(""), origin: s };
}
function Au(e10) {
  return e10.replace(/%([0-9A-Fa-f]{2})/g, (t, n) => {
    let r = parseInt(n, 16);
    return r === 0 ? t : String.fromCharCode(r);
  });
}
function lI(e10, t) {
  let n = e10.indexOf("@["), r = n === -1 ? 0 : n + 1, o = e10[r] === "[" ? r : -1, s = o === -1 ? -1 : e10.indexOf("]", o + 1), i = e10.indexOf(t, s === -1 ? 0 : s + 1);
  return { open: o, close: s, cut: i };
}
function cI(e10) {
  let { text: t, from: n } = RX(e10), { close: r, cut: o } = lI(t, "/"), s = o === -1 ? t.length : o, i = [], a = (l, c) => {
    let d = t.lastIndexOf("@", c - 1);
    if (d >= l) i.push([n(l), n(d)]);
  };
  if (r === -1) a(0, s);
  else a(0, r), a(r + 1, s);
  return i;
}
function RX(e10) {
  if (!e10.includes("%")) return { text: e10, from: (o) => o };
  let t = [], n = "", r = 0;
  for (let o of e10.matchAll(/(?:%(?!00)[0-9A-Fa-f]{2})+/g)) {
    for (let c = r; c < o.index; c++) t.push(c);
    n += e10.slice(r, o.index);
    let s, i;
    try {
      s = decodeURIComponent(o[0]), i = Array.from(s, (c) => {
        let d = c.codePointAt(0);
        return d < 128 ? 1 : d < 2048 ? 2 : d < 65536 ? 3 : 4;
      });
    } catch {
      s = Au(o[0]), i = Array.from(s, () => 1);
    }
    let a = o.index, l = 0;
    for (let c of i) {
      let d = s.codePointAt(l) > 65535 ? 2 : 1;
      for (let p = 0; p < d; p++) t.push(a);
      l += d, a += 3 * c;
    }
    n += s, r = o.index + o[0].length;
  }
  for (let o = r; o <= e10.length; o++) t.push(o);
  return { text: n + e10.slice(r), from: (o) => t[o] };
}
var OX = /\s/g, TX = /[\n\r\u2028\u2029]/g, wX = /(?:@|%40)(?:\[|%5B)/gi, xX = /^(?:\[|%5B)/i, vX = /\]|%5D/gi, kX = /(?:^|[^A-Za-z0-9+.-])(?:https?|wss?|ftps?)$/i, fI = /(?:^|[^A-Za-z0-9+.-])(?:ssh|git|git\+ssh|ssh\+git)$/i, PX = /[,;|&]/g, IX = /(?:^|[^A-Za-z0-9+.-])[A-Za-z][A-Za-z0-9+.-]{0,31}$/, DX = /["'`|,;&<>()[\]\\@/?#]|%40|%5B/i, LX = /["'`]/, MX = /[;|&\n]/g, NX = 64, UX = 2048, FX = /[\s"'`]/g;
function mI(e10) {
  let t = [], n = Xt(e10, FX), r = 0;
  for (let o = e10.indexOf("://"); o !== -1; ) {
    let s = o + 3;
    if (o >= r && fI.test(e10.slice(Math.max(0, o - 8), o))) {
      r = Math.min(n(s), s + UX);
      for (let [i, a] of cI(e10.slice(s, r))) t.push([s + i, s + a]);
    }
    o = e10.indexOf("://", s);
  }
  return t;
}
function $X(e10) {
  let t = [], n = [], r = Xt(e10, OX), o = Xt(e10, /\//g), s = $E(e10, wX), i = Xt(e10, vX), a = Xt(e10, /\//g), l = Xt(e10, MX), c = Xt(e10, /[/?#]/g), d = Xt(e10, PX), p = Xt(e10, /@/g), f = Xt(e10, /%40/gi), m = Xt(e10, /\[REDACTED|\*\*\*:\*\*\*/g), g = Xt(e10, /[:%]/g), _ = Xt(e10, /["'`,;|&<>{}()]/g), y = pI(e10, false), S = pI(e10, true);
  for (let E = e10.indexOf("://"); E !== -1; ) {
    let b = E + 3, C, A = e10.indexOf("://", b), T = r(b), D = p(b), U;
    if (kX.test(e10.slice(Math.max(0, E - 8), E))) {
      let F = Math.min(c(b), T), pe = Math.min(d(b), F);
      if (U = D < F ? Math.max(y(b, F), S(D, F)) : Math.max(y(b, Math.min(o(b), T)), S(b, pe)), U <= b) {
        let w = Math.min(F, l(b));
        n.push({ start: b, fieldEnd: Math.min(pe, w), lastEncodedAt: S(b, w) });
      }
    } else {
      let F = Math.min(o(b), T), pe = Math.min(T, A === -1 ? e10.length : A), w = fI.test(e10.slice(Math.max(0, E - 8), E)), R = w ? s(b) : null, v = w ? xX.exec(e10.slice(b, b + 3)) : null, L = [[v !== null ? b + v[0].length : -1, pe], [R !== null && R.index < pe ? R.index + R[0].length : -1, T]];
      for (let [H, Q] of L) {
        let J = H === -1 ? T : i(H);
        if (J < Q) C = Math.max(C ?? J, J), F = Math.max(F, Math.min(a(J), T));
      }
      U = Math.max(y(b, F), S(b, F));
    }
    if (U > b) t.push({ start: b, end: U, separatorEnd: U + (e10[U] === "@" ? 1 : 3), loginEnd: D <= U ? D : Math.min(f(b), U), bracketClose: C });
    else {
      let F = m(b);
      if (F > b && F < Math.min(T, o(b), _(b)) && g(b) < F) t.push({ start: b, end: F, separatorEnd: F, loginEnd: F });
    }
    E = A;
  }
  return { spans: t, hostParts: n };
}
function gI(e10, t) {
  let { spans: n, hostParts: r } = $X(e10);
  if (n.length === 0 && r.length === 0) return [];
  let o = Xt(e10, /[\s"'>}|,;&`)\]]/g), s = Xt(e10, /\s/g), i = [], a = [];
  for (let m of n) i.push({ start: m.start, end: m.end, loginEnd: m.loginEnd }), a.push({ ...m, userinfo: m });
  let l = Qf(e10, t);
  for (let m of r) {
    let g = l(m.start)[0];
    if (g && g.keyStart < m.fieldEnd && e10.slice(m.start, g.keyStart).includes("%")) {
      let _ = m.lastEncodedAt > g.keyStart ? m.lastEncodedAt : g.valueStart;
      i.push({ start: m.start, end: _, loginEnd: _ }), a.push(_ > g.valueStart ? { start: m.start, end: _, userinfo: { start: m.start, end: _, separatorEnd: _ + 3, loginEnd: _ } } : { start: m.start, end: _ });
    }
  }
  if (a.length === 0) return [];
  i.sort((m, g) => m.start - g.start);
  let c = Qf(e10, t), d = 0;
  for (let m = 0, g = c(m); g[0] !== void 0; ) {
    let _, y = null;
    for (let E of g) if (y = E.valueEnd(), y !== null) {
      _ = E;
      break;
    }
    if (_ === void 0 || y === null) {
      m = g[0].keyStart + 1, g = c(m);
      continue;
    }
    while (d < i.length && i[d].start <= _.keyStart) d++;
    let S = i[d];
    if (S !== void 0 && S.start < y) {
      let E = e10[_.valueStart] ?? "", C = (E === '"' || E === "'") && y - 1 > _.valueStart && e10[y - 1] === E ? Math.max(y, S.end) : s(Math.max(y, S.end, o(S.loginEnd + 1)));
      a.push({ start: _.valueStart, end: C });
    }
    m = y, g = c(m);
  }
  let p = { nextKey: Qf(e10, t), plainKeys: Qf(e10, t), nextLineEnd: Xt(e10, TX), span: 0, lineEnd: -1, resumeAt: 0, overflowEnd: jX(e10, () => p.lineEnd) }, f = [];
  for (let m of KX(a)) {
    let g = f.at(-1);
    f.push(g !== void 0 && m.start < g.end ? dI(e10, { start: f.pop().start, end: Math.max(g.end, m.end) }, p) : dI(e10, m, p));
  }
  return f.map((m) => m.userinfo ? m : BX(e10, m));
}
var uI = /* @__PURE__ */ new WeakMap();
function zX(e10) {
  let t = uI.get(e10);
  if (!t) t = { word: new RegExp(e10.word, "gi"), notTail: new RegExp(`(?!${e10.tail})[^]`, "gi"), separator: new RegExp(e10.separator, "iy"), value: new RegExp(e10.value, "iy") }, uI.set(e10, t);
  return t;
}
function Qf(e10, t) {
  let n = t.map((r) => {
    let { word: o, notTail: s, separator: i, value: a } = zX(r), l = $E(e10, o), c = Xt(e10, s), d = -1, p = -1, f = -1, m = null, g = (E) => {
      if (E !== f) f = E, a.lastIndex = E, m = a.test(e10) ? a.lastIndex : null;
      return m;
    }, _ = (E) => {
      if (E !== d) d = E, i.lastIndex = E, p = i.test(e10) ? i.lastIndex : -1;
      return p;
    }, y = -1, S = null;
    return (E) => {
      if (y !== -1 && E >= y && (S === null || E <= S.keyStart)) return S;
      y = E, S = null;
      for (let b = l(E); b !== null; ) {
        let C = b.index + b[0].length, A = _(r.tail ? c(C) : C);
        if (A !== -1) {
          S = { keyStart: b.index, valueStart: A, valueEnd: () => g(A) };
          break;
        }
        b = l(b.index + 1);
      }
      return S;
    };
  });
  return (r) => {
    let o = [];
    for (let s of n) {
      let i = s(r);
      if (i && (!o[0] || i.keyStart <= o[0].keyStart)) o = o[0] && i.keyStart === o[0].keyStart ? [...o, i] : [i];
    }
    return o;
  };
}
function dI(e10, t, n) {
  if (t.userinfo && HX(e10, t.userinfo, n)) return t;
  let r = t.end;
  n.resumeAt = Math.max(n.resumeAt, t.start);
  for (let o = n.nextKey(n.resumeAt); o[0] !== void 0 && o[0].keyStart < r; ) {
    let s = o[0].keyStart;
    if (s > n.lineEnd) {
      let c = n.nextLineEnd(s);
      n.span = NX * (c - n.lineEnd), n.lineEnd = c;
    }
    let i = null, a = o[0];
    for (let c of o) if (i = c.valueEnd(), i !== null) {
      a = c;
      break;
    }
    let l = i ?? a.valueStart;
    if (n.span -= l - s, n.span < 0) return { start: t.start, end: Math.max(r, n.overflowEnd(t.start)) };
    r = Math.max(r, l), n.resumeAt = a.valueStart, o = n.nextKey(n.resumeAt);
  }
  return r === t.end ? t : { start: t.start, end: r };
}
function HX(e10, t, n) {
  if (e10[t.end] !== "@" || DX.test(e10.slice(t.start, t.end)) || !IX.test(e10.slice(Math.max(0, t.start - 36), t.start - 3))) return false;
  for (let r = n.plainKeys(t.start); r[0] !== void 0 && r[0].keyStart < t.end; r = n.plainKeys(r[0].keyStart + 1)) if (r.some((o) => o.valueStart === t.end)) return false;
  return true;
}
function jX(e10, t) {
  let n = Xt(e10, /["'`]/g), r = -1, o = e10.length;
  return (s) => {
    if (t() !== r) r = t(), o = n(s) < r ? e10.length : r;
    return o;
  };
}
function BX(e10, t) {
  let n = e10[t.end - 1];
  if (n === void 0 || !LX.test(n)) return t;
  return (e10.slice(t.start, t.end).split(n).length - 1) % 2 === 1 ? { start: t.start, end: t.end - 1 } : t;
}
function KX(e10) {
  e10.sort((n, r) => n.start - r.start || r.end - n.end);
  let t = [];
  for (let n of e10) {
    let r = t.at(-1);
    if (r === void 0 || n.start >= r.end) t.push(n);
    else t[t.length - 1] = { start: r.start, end: Math.max(r.end, n.end) };
  }
  return t;
}
function Xt(e10, t) {
  let n = $E(e10, t);
  return (r) => n(r)?.index ?? e10.length;
}
function $E(e10, t) {
  let n = -1, r = null;
  return (o) => {
    if (n === -1 || o < n || r !== null && o > r.index) t.lastIndex = o, r = t.exec(e10), n = o;
    return r;
  };
}
function pI(e10, t) {
  let n = null;
  return (r, o) => {
    if (n === null) {
      n = new Int32Array(e10.length + 1);
      let i = -1;
      for (let a = 0; a <= e10.length; a++) {
        if (t) {
          if (a >= 3 && e10.startsWith("%40", a - 3)) i = a - 3;
        } else if (a >= 1 && e10[a - 1] === "@") i = a - 1;
        n[a] = i;
      }
    }
    let s = n[Math.min(o, e10.length)];
    return s >= r ? s : -1;
  };
}
var RI = new RegExp(Cu(String.raw`api[_-]?key|secret|token|password|passwd|credential|bearer|authorization|auth[_-]?header|memory[_-]?request[_-]?mac|cookie|session[_-]?(?:id|key)|connection[_-]?string|(?:private|ssh|encryption|signing|access|deploy|master|license)[_-]?key|client[_-]?secret`), "i"), qa = `[\\s\\u0085${bu}]`, $i = `(?:${Cu("Bearer|Basic")})[${bu}]*[\\s\\u0085]+`, hI = "[^\\s\\u0085,;&}\\])]+", _I = "(?![\\w\\[({$/+=~!@%^?\\\\-])", tm = "\\n\\r\\x0b\\x0c\\u0085\\u2028\\u2029", Os = "[\\s\\u0085]";
new RegExp(`(?:[=:]|["']|\\b(?:${Cu("bearer|basic")}))$`, "i");
var GX = `\\\\+(?:"[^"${tm}]*(?<!\\\\)(?=\\\\+")|'[^'${tm}]*(?<!\\\\)(?=\\\\+'))`, yI = `[^\\s\\u0085,;&})"'\\\\]+`, rm = `"[^"${tm}]*"|'[^'${tm}]*'|"[^"]*"${_I}|'[^']*'${_I}|[^\\s-]{0,4}\\[REDACTED\\]['"\`]?|${$i}(?:\\[REDACTED\\]|${hI})|${hI}`, WX = { word: "\\b(?:Bearer|Basic)", tail: "", separator: `${Os}+`, value: "[A-Za-z0-9+/=._~-]{20,}" }, VX = { word: `(?:${RI.source})`, tail: "[\\w.-]", separator: `["']?${Os}*[=:]${Os}*`, value: rm }, qX = { word: "\\b(?:AWS|GOOGLE|GCP|GCLOUD|AZURE)_\\w", tail: "\\w", separator: `${Os}*[=:]${Os}*`, value: rm }, YX = [VX, qX, WX], ur = "[\\w=-]", vr = `${ur}{20,}(?:\\.[0-9a-z]{9})?`, ZX = "[\\w.-]{0,256}(?![\\w.-])", OI = `${Os}*(?!${Os})`, qE = `(?:${RI.source})${ZX}`, TI = `\\b(?:${Cu("AWS|GOOGLE|GCP|GCLOUD|AZURE")})${Ga}_\\w+`, BE = `${qE}(?:${Ga}["'])?${qa}*[=:]${OI}(${rm})`, KE = `${TI}${qa}*[=:]${Os}*(${rm})`, wI = /\\["']/, xI = `${qE}${Ga}\\\\+["']${qa}*[=:]${OI}(${GX}|${$i}${yI}|${yI}|\\\\+["'][^\\s\\u0085,;&})"'\\\\]*)`, Rs = `[^\\s\\u0085,;&}\\])"']{0,64}?(?:${qE}|${TI})`, JX = `(?:${$i})?(?:[{[(]{0,8}(?:"${Rs}"|'${Rs}')|${Rs})${qa}*[=:]`, XX = `(?:${$i})?(?:[{[(]{0,8}(?:"${Rs}"|'${Rs}'|\\\\+"${Rs}\\\\+"|\\\\+'${Rs}\\\\+')|${Rs})${qa}*[=:]`, vI = "\\][^\\s\"'>}|,;&`)\\]]*", Tu = "[A-Za-z0-9_-]", GE = `${Tu}{10}${Tu}*`, SI = `\\.${GE}\\.${GE}`, YE = `(?<!${Tu})(?=${Tu}+${SI})(?:${Tu}*?-)??(eyJ${GE}${SI})`, kI = [{ id: "url-userinfo", source: `:\\/\\/((["'])[^/@\\s]*\\2(?=@)|(?:[^/@\\s"'|,;&\`]+(?=@))|[^/@\\s"'|,;&\`]*["'|,;&\`][^/@\\s]*@)@?`, confidence: "low" }, { id: "gcp-service-account", source: "\\b([a-z0-9-]{1,64}@[a-z0-9-]+\\.iam\\.gserviceaccount\\.com)\\b", flags: "i", confidence: "low" }, { id: "loose-anthropic-key", source: "\\b(sk-ant-?[\\w-]{10,})", confidence: "low" }, { id: "http-auth-scheme", source: `\\b${$i}([A-Za-z0-9+/=._~-]{20,})`, flags: "i", confidence: "low" }, { id: "loose-jwt", prefilter: /eyJ/, source: YE, confidence: "low" }, { id: "sensitive-assign", source: BE, flags: "i", confidence: "low" }, { id: "cloud-env-var", source: KE, flags: "i", confidence: "low" }, { id: "url-userinfo-tail", source: ":\\/\\/(\\[REDACTED\\](?!@|%40[^\\s\"'>}|,;&`)\\]@/]*(?:[\\s\"'>}|,;&`)\\]/]|$))[^\\s\"'>}|,;&`)\\]]*?(?=[\\s\"'>}|,;&`)\\]]|:\\/\\/|$))", confidence: "low" }, { id: "url-userinfo-later-at", source: ":\\/\\/(\\[REDACTED\\]@(?:[^\\s:/?#\"'>}|,;&`)\\]]|:(?!\\/\\/)){0,256})(?=@|%40)", confidence: "low" }, { id: "url-userinfo-encoded", source: ":\\/\\/((?:\\[REDACTED\\]@)?(?:(?:[^/?#@\\s\"',;&<>|)\\]{}`[]*[\"'`<>{}[\\]][^/?#@\\s,;&|{}\"'`<>[\\]()]*(?=%40))|[^/?#@\\s\"',;&<>|)\\]}`[]+(?=%40)|(?=[^/?#@\\s\"',;&<>|)\\]}`[]*?(?:%|:[^/?#@\\s\"',;&<>|)\\]}`[]))[^/?#@\\s\"',;&<>|)\\]}`[]+(?=\\[REDACTED\\])))", confidence: "low" }, { id: "masked-value-rest", source: `\\[REDACTED\\](${vI})`, confidence: "low" }, { id: "anthropic-signed-key-rest", redactOnly: true, prefilter: /\[REDACTED\]\.eyJ/, source: "\\[REDACTED\\]\\.(eyJ[\\w-]+\\.[\\w-]+)", confidence: "low" }, { id: "sensitive-assign-escaped", redactOnly: true, prefilter: wI, source: xI, flags: "i", confidence: "low" }, { id: "aws-access-token", source: "\\b((?:A3T[A-Z0-9]|AKIA|ASIA|ABIA|ACCA)[A-Z2-7]{16})\\b", confidence: "high" }, { id: "gcp-api-key", source: "\\b(AIza[\\w-]{35})(?![\\w-])", confidence: "high" }, { id: "google-oauth-client-secret", source: "\\bGOCSPX-[\\w-]{28}(?![\\w-])", confidence: "high" }, { id: "azure-ad-client-secret", source: `(?:^|[\\\\'"\\x60\\s>=:(,)])([a-zA-Z0-9_~.]{3}\\dQ~[a-zA-Z0-9_~.-]{31,34})(?:$|[\\\\'"\\x60\\s<),])`, confidence: "high" }, { id: "digitalocean-pat", source: `\\b(dop_v1_[a-f0-9]{64})(?:[\\x60'"\\s;]|\\\\[nr]|$)`, confidence: "high" }, { id: "digitalocean-access-token", source: `\\b(doo_v1_[a-f0-9]{64})(?:[\\x60'"\\s;]|\\\\[nr]|$)`, confidence: "high" }, { id: "anthropic-api-key", source: `\\b(sk[-]ant[-]api03-[a-zA-Z0-9_\\-]{93}AA)(?:[\\x60'"\\s;]|\\\\[nr]|$)`, confidence: "high" }, { id: "anthropic-admin-api-key", source: `\\b(sk-ant-admin01-[a-zA-Z0-9_\\-]{93}AA)(?:[\\x60'"\\s;]|\\\\[nr]|$)`, confidence: "high" }, { id: "anthropic-oauth-token", source: `\\b(sk-ant-(?:oat|ort)\\d{2}-[\\w-]{20,})(?:[\\x60'"\\s;]|\\\\[nr]|$)`, run: "[\\w-]", confidence: "high" }, { id: "openai-api-key", source: "sk-[A-Za-z0-9_-]{8,200}T3BlbkFJ[A-Za-z0-9_-]{8,200}", confidence: "high" }, { id: "openai-legacy-api-key", source: "\\bsk-[a-zA-Z0-9]{48}(?![a-zA-Z0-9])", confidence: "high" }, { id: "huggingface-access-token", source: `\\b(hf_[a-zA-Z]{34})(?:[\\x60'"\\s;]|\\\\[nr]|$)`, confidence: "high" }, { id: "supabase-secret-key", source: "\\bsb_secret_[A-Za-z0-9_-]{20,}", confidence: "high" }, { id: "supabase-access-token", source: "\\bsbp_[a-z0-9]{40,}", confidence: "high" }, { id: "github-pat", source: "ghp_[0-9a-zA-Z]{36}", confidence: "high" }, { id: "github-fine-grained-pat", source: "github_pat_\\w{82}", confidence: "high" }, { id: "github-app-token", source: "(?:ghu|ghs)_[0-9a-zA-Z]{36}", confidence: "high" }, { id: "github-oauth", source: "gho_[0-9a-zA-Z]{36}", confidence: "high" }, { id: "github-refresh-token", source: "ghr_[0-9a-zA-Z]{36}", confidence: "high" }, { id: "gitlab-pat", source: `glpat-${vr}`, displayRun: ur, confidence: "high" }, { id: "gitlab-deploy-token", source: `gldt-${vr}`, displayRun: ur, confidence: "high" }, { id: "gitlab-runner-authentication-token", source: `glrt-${vr}`, displayRun: ur, confidence: "high" }, { id: "gitlab-oauth-app-secret", source: `gloas-${vr}`, displayRun: ur, confidence: "high" }, { id: "gitlab-pipeline-trigger-token", source: `glptt-${vr}`, displayRun: ur, confidence: "high" }, { id: "gitlab-kubernetes-agent-token", source: `glagent-${vr}`, displayRun: ur, confidence: "high" }, { id: "gitlab-incoming-mail-token", source: `glimt-${vr}`, displayRun: ur, confidence: "high" }, { id: "gitlab-scim-oauth-token", source: `glsoat-${vr}`, displayRun: ur, confidence: "high" }, { id: "gitlab-ci-build-token", source: `glcbt-${vr}`, displayRun: ur, confidence: "high" }, { id: "gitlab-feed-token", source: `glft-${vr}`, displayRun: ur, confidence: "high" }, { id: "gitlab-feature-flag-client-token", source: `glffct-${vr}`, displayRun: ur, confidence: "high" }, { id: "slack-bot-token", source: "xoxb-[0-9]{10,13}-[0-9]{10,13}[a-zA-Z0-9-]*", confidence: "high" }, { id: "slack-user-token", source: "xox[a-z](?:-[0-9]{10,13}){3}-[a-zA-Z0-9-]{28,34}", confidence: "high" }, { id: "slack-rotation-token", source: "xoxe(?:\\.xox[a-z])?-[0-9]-[A-Za-z0-9-]{28,}", confidence: "high" }, { id: "slack-app-token", source: "xapp-\\d-[A-Z0-9]+-\\d+-[a-z0-9]+", flags: "i", confidence: "high" }, { id: "slack-workflow-token", source: "\\bxwfp-[a-zA-Z0-9-]{20,}", confidence: "high" }, { id: "slack-webhook-url", source: "(?:https?://)?hooks\\.slack\\.com/(?:services|workflows|triggers)/[A-Za-z0-9+/_-]{40,}", flags: "i", confidence: "high" }, { id: "twilio-api-key", source: "SK[0-9a-fA-F]{32}", confidence: "high" }, { id: "sendgrid-api-token", source: `\\b(SG\\.[a-zA-Z0-9=_\\-.]{66})(?:[\\x60'"\\s;]|\\\\[nr]|$)`, confidence: "high" }, { id: "npm-access-token", source: `\\b(npm_[a-zA-Z0-9]{36})(?:[\\x60'"\\s;]|\\\\[nr]|$)`, confidence: "high" }, { id: "pypi-upload-token", source: "pypi-AgEIcHlwaS5vcmc[\\w-]{50,1000}", confidence: "high" }, { id: "databricks-api-token", source: `\\b(dapi[a-f0-9]{32}(?:-\\d)?)(?:[\\x60'"\\s;]|\\\\[nr]|$)`, confidence: "high" }, { id: "hashicorp-tf-api-token", source: "[a-zA-Z0-9]{14}\\.atlasv1\\.[a-zA-Z0-9\\-_=]{60,70}", confidence: "high" }, { id: "pulumi-api-token", source: `\\b(pul-[a-f0-9]{40})(?:[\\x60'"\\s;]|\\\\[nr]|$)`, confidence: "high" }, { id: "postman-api-token", source: `\\b(PMAK-[a-fA-F0-9]{24}-[a-fA-F0-9]{34})(?:[\\x60'"\\s;]|\\\\[nr]|$)`, confidence: "high" }, { id: "grafana-api-key", source: `\\b(eyJrIjoi[A-Za-z0-9+/]{70,400}={0,3})(?:[\\x60'"\\s;]|\\\\[nr]|$)`, confidence: "high" }, { id: "grafana-cloud-api-token", source: `\\b(glc_[A-Za-z0-9+/]{32,400}={0,3})(?:[\\x60'"\\s;]|\\\\[nr]|$)`, confidence: "high" }, { id: "grafana-service-account-token", source: `\\b(glsa_[A-Za-z0-9]{32}_[A-Fa-f0-9]{8})(?:[\\x60'"\\s;]|\\\\[nr]|$)`, confidence: "high" }, { id: "sentry-user-token", source: `\\b(sntryu_[a-f0-9]{64})(?:[\\x60'"\\s;]|\\\\[nr]|$)`, confidence: "high" }, { id: "sentry-org-token", source: "\\bsntrys_eyJpYXQiO[a-zA-Z0-9+/]{10,200}(?:LCJyZWdpb25fdXJs|InJlZ2lvbl91cmwi|cmVnaW9uX3VybCI6)[a-zA-Z0-9+/]{10,200}={0,2}_[a-zA-Z0-9+/]{43}", confidence: "high" }, { id: "stripe-access-token", source: `\\b((?:sk|rk)_(?:test|live|prod)_[a-zA-Z0-9]{10,99})(?:[\\x60'"\\s;]|\\\\[nr]|$)`, confidence: "high" }, { id: "shopify-access-token", source: "shpat_[a-fA-F0-9]{32}", confidence: "high" }, { id: "shopify-shared-secret", source: "shpss_[a-fA-F0-9]{32}", confidence: "high" }], QX = 64;
function WE(e10, t) {
  let n = /-----BEGIN[ A-Z0-9_-]{0,100}?PRIVATE KEY(?: BLOCK)?-----/gi, r = /-----END[ A-Z0-9_-]{0,100}?PRIVATE KEY(?: BLOCK)?-----/gi;
  n.lastIndex = t;
  let o = n.exec(e10);
  if (!o) return null;
  r.lastIndex = o.index + o[0].length + QX;
  let s = r.exec(e10);
  if (!s) return null;
  return { start: o.index, end: s.index + s[0].length };
}
function e8(e10) {
  return WE(e10, 0) !== null;
}
function t8(e10) {
  let t = PI(e10);
  if (t.length === 0) return e10;
  let n = "", r = 0;
  for (let o of t) n += e10.slice(r, o.start) + "[REDACTED]", r = o.end;
  return n + e10.slice(r);
}
function PI(e10) {
  let t = e10.indexOf("-----");
  while (t !== -1) {
    while (e10.charCodeAt(t + 5) === 45) t++;
    if ((e10.charCodeAt(t + 5) | 32) === 98 && (e10.charCodeAt(t + 6) | 32) === 101 && (e10.charCodeAt(t + 7) | 32) === 103 && (e10.charCodeAt(t + 8) | 32) === 105 && (e10.charCodeAt(t + 9) | 32) === 110) break;
    t = e10.indexOf("-----", t + 5);
  }
  let n = [];
  if (t === -1) return n;
  for (let r = WE(e10, t); r; r = WE(e10, r.end)) n.push(r);
  return n;
}
var VE = `(?:[\\x60'"\\s;]|\\\\[nr]|$)`, zE = "(?=[^a-zA-Z0-9_\\-+=]|$)", EI = "(?<![a-zA-Z0-9_\\-])";
function n8() {
  return kI.map(({ id: e10, confidence: t, source: n, flags: r = "", displayRun: o }) => {
    let s = { id: e10, confidence: t }, i = r.replace("g", "") + "g";
    if (t !== "high") return { ...s, re: new RegExp(n, i) };
    let a = II(n);
    if (o === void 0) return { ...s, re: new RegExp(EI + a + zE, i) };
    return { ...s, prefilter: new RegExp(a, r.replace("g", "")), re: new RegExp(`(?<!${o})(?=${o}+${zE})${o}*?${EI}(${a})${zE}`, i) };
  });
}
function Ou(e10) {
  return kI.map((t) => {
    let n = (t.flags ?? "").replace("g", ""), r = { id: t.id, confidence: t.confidence, ...t.redactOnly === true && { redactOnly: t.redactOnly }, ...t.prefilter !== void 0 && { prefilter: t.prefilter } };
    if (t.run === void 0) return { ...r, re: new RegExp(t.source, e10 ? n + "g" : t.flags ?? "") };
    return { ...r, prefilter: new RegExp(II(t.source), n), re: new RegExp(`(?:(?<!${t.run})|(?<=\\\\[nr]))(?=${t.run}+${VE})${t.run}*?${t.source}`, e10 ? n + "g" : n) };
  });
}
function II(e10) {
  return e10.endsWith(VE) ? e10.slice(0, -VE.length) : e10;
}
function em(e10, t) {
  if (typeof t !== "string") return "[REDACTED]";
  let n = t.length >= 2 && (t[0] === '"' || t[0] === "'") && t.at(-1) === t[0] ? t[0] : "", r = e10.lastIndexOf(t);
  return `${e10.slice(0, r)}${n}[REDACTED]${n}${e10.slice(r + t.length)}`;
}
function r8(e10) {
  let t = e10[1];
  if (typeof t !== "string") return { keep: 0, insert: "[REDACTED]" };
  let n = t.length >= 2 && (t[0] === '"' || t[0] === "'") && t.at(-1) === t[0] ? 1 : 0, r = e10[0].lastIndexOf(t);
  return { keep: r + n, insert: "[REDACTED]", keepEnd: e10[0].length - r - t.length + n };
}
function bI(e10) {
  let t = gI(e10, YX).map(({ start: o, end: s }) => {
    let i = /^(["'])[^]*\1$/.test(e10.slice(o, s)) ? 1 : 0;
    return [o + i, s - i];
  }), n = mI(e10), r = i8(e10);
  return n.length === 0 && r.length === 0 ? t : a8([...t, ...n, ...r]);
}
var HE, o8 = new RegExp(vI, "y"), s8 = 512;
function i8(e10) {
  HE ??= { plain: { assign: new RegExp(`${BE}|${KE}`, "gi"), nextKey: new RegExp(JX, "iy"), valueWithWhitespace: new RegExp(`["']|${$i}`, "iy"), skipsStrays: false }, escaped: { assign: new RegExp(`${BE}|${KE}|${xI}`, "gi"), nextKey: new RegExp(XX, "iy"), valueWithWhitespace: new RegExp(`\\\\*["']|${$i}`, "iy"), skipsStrays: true } };
  let t = CI(e10, HE.plain);
  return wI.test(e10) ? [...t, ...CI(e10, HE.escaped)] : t;
}
function CI(e10, { assign: t, nextKey: n, valueWithWhitespace: r, skipsStrays: o }) {
  let s = [], i, a = 0, l = o8;
  t.lastIndex = 0;
  for (let c = t.exec(e10); c !== null; c = t.exec(e10)) {
    let d = c[1] ?? c[2] ?? c[3], p = c.index + c[0].length, f = p - d.length;
    n.lastIndex = f;
    let m = d.length <= s8 && n.test(e10) ? n.lastIndex : void 0;
    if (m !== void 0 && m < p) {
      if (r.lastIndex = m, !r.test(e10)) m = void 0;
    }
    if (o && i !== void 0 && c.index >= i && c.index < a && m === void 0) {
      i = void 0, t.lastIndex = a;
      continue;
    }
    if (i !== void 0 && c.index < i) {
      let g = /^(["'])[^]*\1$/.test(d), _ = g && a <= f ? 1 : 0;
      l.lastIndex = p, s.push([f + _, !g && l.test(e10) ? l.lastIndex : p - _]);
    }
    if (a = p, i = m, i !== void 0) t.lastIndex = f;
  }
  return s;
}
function a8(e10) {
  let t = e10.filter(([r, o]) => o > r).sort((r, o) => r[0] - o[0]), n = [];
  for (let [r, o] of t) {
    let s = n.at(-1);
    if (s !== void 0 && r <= s[1]) s[1] = Math.max(s[1], o);
    else n.push([r, o]);
  }
  return n;
}
function AI(e10, t) {
  let { text: n, origin: r } = e10, o = [], s = 0;
  for (let i = 0; i < n.length; ) {
    let a = r[i];
    while (s < t.length && t[s][1] <= a) s++;
    let l = t[s];
    if (a < 0 || l === void 0 || a < l[0]) {
      i++;
      continue;
    }
    let c = i;
    while (c > 0 && r[c - 1] < 0) c--;
    while (i < n.length && (r[i] < 0 || r[i] >= l[0] && r[i] < l[1])) i++;
    let d = o.at(-1);
    if (d !== void 0 && d[1] >= c) d[1] = i;
    else o.push([c, i, "[REDACTED]"]);
  }
  return Xf(e10, o);
}
var l8 = 512, c8 = 512;
class DI {
  testRules = null;
  redactRules = null;
  displayRules = null;
  resultCache = /* @__PURE__ */ new Map();
  scan(e10) {
    this.testRules ??= Ou(false);
    let t = [];
    for (let n of this.testRules) if (n.confidence === "high" && n.prefilter?.test(e10) !== false && n.re.test(e10)) t.push({ ruleId: n.id, label: n.id.split("-").map((r) => g8[r] ?? _u(r)).join(" ") });
    if (e8(e10)) t.push({ ruleId: "private-key", label: "Private Key" });
    return t;
  }
  redactContext(e10, t = false) {
    this.redactRules ??= Ou(true);
    let n = t8(e10);
    for (let r of this.redactRules) if (r.confidence === "low" && jE(r, t, n)) n = n.replace(r.re, em);
    return n;
  }
  redactTokens(e10) {
    this.redactRules ??= Ou(true);
    let t = e10;
    for (let n of this.redactRules) if (n.confidence === "high" && n.prefilter?.test(t) !== false) t = t.replace(n.re, em);
    return t;
  }
  trackedByRules(e10, t = false) {
    return this.trackedTokens(this.trackedContext(e10, t));
  }
  trackedContext(e10, t = false) {
    let n = Xf(oI(e10), PI(e10).map(({ start: r, end: o }) => [r, o, "[REDACTED]"]));
    return this.trackedRules(n, "low", t);
  }
  redactOnlyRules(e10) {
    this.redactRules ??= Ou(true);
    let t = e10;
    for (let n of this.redactRules) if (n.redactOnly === true && jE(n, true, t)) t = t.replace(n.re, em);
    return t;
  }
  trackedTokens(e10) {
    return this.trackedRules(e10, "high");
  }
  trackedRules(e10, t, n = false) {
    this.redactRules ??= Ou(true);
    let r = e10;
    for (let o of this.redactRules) if (o.confidence === t && jE(o, n, r.text)) o.re.lastIndex = 0, r = sI(r, o.re, r8);
    return r;
  }
  redactWithUrlRanges(e10) {
    let t = bI(e10);
    return t.length === 0 ? this.redactTokens(this.redactContext(e10, true)) : AI(this.trackedByRules(e10, true), t).text;
  }
  redactTracked(e10) {
    return AI(this.trackedByRules(e10, true), bI(e10));
  }
  redact(e10) {
    let t = e10.length <= l8;
    if (t) {
      let r = this.resultCache.get(e10);
      if (r !== void 0) return r;
    }
    let n = this.redactWithUrlRanges(e10);
    if (t) {
      if (this.resultCache.size >= c8) this.resultCache.delete(this.resultCache.keys().next().value);
      this.resultCache.set(e10, n);
    }
    return n;
  }
  redactForDisplay(e10) {
    this.displayRules ??= n8();
    let t = e10;
    for (let n of this.displayRules) {
      if (n.confidence !== "high" || n.prefilter?.test(t) === false) continue;
      t = t.replace(n.re, f8);
    }
    return t;
  }
}
var u8 = new DI();
function LI(e10) {
  return u8.redact(e10);
}
var d8 = /[$\x60|;&<>()\s]/, p8 = /[/.@:~*?\\]/;
function f8(e10, t) {
  let n = typeof t === "string" ? t : e10;
  if (d8.test(n) || p8.test(n)) return e10;
  return em(e10, t);
}
function jE(e10, t, n) {
  return (t || e10.redactOnly !== true) && (e10.prefilter === void 0 || e10.prefilter.test(n));
}
var g8 = { aws: "AWS", gcp: "GCP", api: "API", pat: "PAT", ad: "AD", tf: "TF", oauth: "OAuth", npm: "NPM", pypi: "PyPI", jwt: "JWT", ci: "CI", scim: "SCIM", github: "GitHub", gitlab: "GitLab", openai: "OpenAI", digitalocean: "DigitalOcean", huggingface: "HuggingFace", hashicorp: "HashiCorp", sendgrid: "SendGrid" };
var QE = { verbose: 0, debug: 1, info: 2, warn: 3, error: 4 }, S8 = new RegExp(`(?!\\t)[${xr}]`, "gu"), E8 = 10485760, FI = 1048576, b8 = 1e4, C8 = 262144, A8 = 5e3, $I = 100, R8 = Mi((e10) => e10());
function O8(e10) {
  return Object.hasOwn(QE, e10);
}
function zI(e10) {
  return JS(e10) ? null : pn.resolve(e10);
}
function HI() {
}
var T8 = { arm: "v5", target: null };
function w8(e10, t) {
  e10.stuck = e10.appendSince === t ? "yes" : "no";
}
var x8 = { sessionId: "", fromBackend: false };
function jI(e10, t, n, r) {
  let o = pn.join(t, "debug"), s = pn.join(o, `${e10.sessionId}.txt`), i;
  if (n === null) i = s;
  else if (r !== null && n === r) i = pn.join(r, `${e10.sessionId}.txt`);
  else i = n;
  let a = !e10.fromBackend && i === s ? "v5" : "raw";
  return { target: i, arm: a, configHome: t, rotate: a === "raw" && !(pn.dirname(i) === o && i.endsWith(".txt")), pointLatest: a === "raw" && i !== s };
}
function XE(e10) {
  return Lf.userNamed(pn.isAbsolute(e10) ? e10 : pn.resolve(e10));
}
function v8(e10) {
  return e10.code === "Failed" && e10.telemetryCode === "ENOENT";
}
function k8(e10, t = mP) {
  return t ? e10 : void 0;
}
async function BI(e10, t, n, r) {
  let o = { namespace: "log", sessionId: t, channel: "debug" }, s = await yE.run(true, () => e10.append(o, [{ data: n }], void 0));
  if (s.ok) return "landed";
  return r && s.error.code === "InvalidArgument" && s.error.argument === "opts.markLatest" ? "refused" : "dropped";
}
class GI {
  deps;
  minLevel;
  filter;
  toStderr;
  filePath;
  runtimeDebugEnabled = false;
  hasFormattedOutput = false;
  debugFromLaunch;
  storageV5;
  writer = null;
  redirect = null;
  unflushedChunks = [];
  backlog = { chain: Promise.resolve(), length: 0, appendSince: 0, stuck: "no", droppedCount: 0, droppedTotal: 0 };
  appendOldest = this.appendOldestChunks.bind(this);
  backendLinesLogged = 0;
  exiting = false;
  exitHandlerRegistered = false;
  successor = null;
  writtenBytes = -1;
  rotating = false;
  resolvedLogPath = null;
  overrideDirectory = null;
  rotationTarget = null;
  latestMarked = false;
  latestRefused = false;
  constructor(e10) {
    this.deps = e10;
    if (this.storageV5 = k8(e10.storageV5), e10.launchIdentity !== void 0) {
      this.minLevel = e10.launchIdentity.minLevel, this.filter = e10.launchIdentity.filter, this.toStderr = e10.launchIdentity.toStderr, this.filePath = e10.launchIdentity.filePath, this.debugFromLaunch = e10.launchIdentity.debugFromLaunch;
      return;
    }
    let t = Array.isArray(e10.argv) ? e10.argv : [], n = _P(), r;
    if (n !== void 0) r = n(t);
    else {
      let a = t.indexOf("--");
      r = a === -1 ? t : t.slice(0, a);
    }
    let o = e10.env.CLAUDE_CODE_DEBUG_LOG_LEVEL?.toLowerCase().trim();
    this.minLevel = o && O8(o) ? o : "debug";
    let s = r.find((a) => a.startsWith("--debug="));
    this.filter = s ? EP(s.substring(8)) : null, this.toStderr = r.includes("--debug-to-stderr") || r.includes("-d2e");
    let i = null;
    for (let a = 0; a < r.length; a++) {
      let l = r[a];
      if (l.startsWith("--debug-file=")) {
        i = zI(l.substring(13));
        break;
      }
      if (l === "--debug-file" && a + 1 < r.length) {
        i = zI(r[a + 1]);
        break;
      }
    }
    this.filePath = i, this.debugFromLaunch = Oe(e10.env.DEBUG) || Oe(e10.env.DEBUG_SDK) || r.includes("--debug") || r.includes("-d") || this.toStderr || s !== void 0 || this.filePath !== null;
  }
  isDebugMode() {
    return this.runtimeDebugEnabled || this.debugFromLaunch;
  }
  drainsSyncAtExit() {
    return true;
  }
  launchIdentity() {
    return { minLevel: this.minLevel, filter: this.filter, toStderr: this.toStderr, filePath: this.filePath, debugFromLaunch: this.debugFromLaunch, isAnt: this.deps.isAnt, isTestEnvironment: this.deps.isTestEnvironment };
  }
  enableDebugLogging() {
    let e10 = this.isDebugMode() || this.deps.isAnt;
    return this.runtimeDebugEnabled = true, e10;
  }
  logPath() {
    return this.filePath ?? (this.overrideDirectory !== null && this.overrideDirectory === this.deps.env.CLAUDE_CODE_DEBUG_LOGS_DIR ? pn.join(this.overrideDirectory, `${this.deps.sessionId()}.txt`) : null) ?? this.resolvedLogPath ?? this.deps.env.CLAUDE_CODE_DEBUG_LOGS_DIR ?? this.defaultLogPath();
  }
  defaultLogPath(e10 = this.deps.sessionId()) {
    return pn.join(this.deps.configHomeDir(), "debug", `${e10}.txt`);
  }
  learnedOverrideDirectory() {
    return this.overrideDirectory;
  }
  isArmed() {
    return this.storageV5 !== void 0;
  }
  log(e10, { level: t } = { level: "debug" }) {
    if (QE[t] < QE[this.minLevel]) return;
    let n = this.deps.limits?.();
    if (n === void 0) {
      this.emit(e10, t);
      return;
    }
    let r = e10.length > n.maxMessageLength ? `debug message not logged: it has ${e10.length} characters, over this log's fixed limit of ${n.maxMessageLength} per message` : e10, { admitted: o, leftOutBefore: s } = n.admit(r.length);
    if (!o) return;
    n.timed(() => {
      if (s > 0) this.emit(`debug messages not logged: ${s} since this log's last line, over its fixed limit on how much it logs at a time`, t);
      this.emit(r, t);
    });
  }
  emit(e10, t) {
    if (!this.shouldLog(e10)) return;
    let n = LI(e10.trim());
    n = n.includes(`
`) ? nI(ae(n)) : n.replace(S8, rI);
    let o = `${(/* @__PURE__ */ new Date()).toISOString()} [${t.toUpperCase()}] ${n}
`;
    if (this.toStderr) {
      this.deps.writeToStderr(o);
      return;
    }
    this.write(o);
  }
  write(e10) {
    let t = this.getWriter(), n = x8;
    if (this.storageV5 !== void 0) {
      if (n = { sessionId: this.deps.sessionId(), fromBackend: yE.getStore() === true }, n.fromBackend) this.backendLinesLogged++;
    }
    if (t.write({ origin: n, content: e10 }), this.exiting) t.flush();
  }
  async flush() {
    let e10 = this.backendLinesLogged;
    if (this.writer?.flush(), await this.drained(), this.storageV5 !== void 0 && this.successor) return this.successor.flush();
    for (let t = 0; this.backendLinesLogged !== e10 && t < 3; t++) e10 = this.backendLinesLogged, this.writer?.flush(), await this.drained();
    if (this.backlog.droppedCount > 0 && this.backlog.length === 0 && !this.successor) this.write(""), this.writer?.flush(), await this.drained();
  }
  async drained() {
    if (this.isAppendStuck()) return;
    let e10 = this.backlog.chain.then(() => true);
    do
      if (await Cf(e10, $I)) return;
    while (!this.isAppendStuck());
  }
  isAppendStuck() {
    let e10 = this.backlog, { appendSince: t } = e10;
    if (e10.stuck === "no" && t !== 0 && Date.now() - t >= A8) e10.stuck = "suspected", setTimeout(w8, $I, e10, t).unref();
    return e10.stuck === "yes";
  }
  dispose(e10) {
    this.redirect = e10;
    try {
      this.writer?.dispose();
    } finally {
      this.redirect = null, this.writer = null;
    }
  }
  succeed(e10) {
    this.runtimeDebugEnabled = e10.runtimeDebugEnabled, this.hasFormattedOutput = e10.hasFormattedOutput, this.unflushedChunks = e10.unflushedChunks, this.backlog = e10.backlog, this.exitHandlerRegistered = e10.exitHandlerRegistered, e10.successor = this, e10.dispose((t) => {
      this.write(t);
    });
  }
  handleExit() {
    if (this.successor) {
      this.successor.handleExit();
      return;
    }
    if (this.exiting = true, this.backlog.droppedCount > 0) try {
      this.write("");
    } catch {
    }
    this.writer?.flush(), this.drainSync();
  }
  async maybeRotate(e10, t, n = E8) {
    let r = void 0;
    if (this.writtenBytes < 0) this.writtenBytes = await promises.stat(e10).then((o) => o.size).catch(() => 0);
    else this.writtenBytes += t;
    if (this.writtenBytes <= n || this.rotating) return;
    this.rotating = true;
    try {
      let o = e10.endsWith(".txt") ? `${e10.slice(0, -4)}.1.txt` : `${e10}.1`;
      if (r) ;
      else try {
        await promises.rename(e10, o);
      } catch (s) {
        if (!at(s)) await promises.unlink(o).catch(() => {
        }), await promises.rename(e10, o).catch(() => promises.unlink(e10).catch(() => {
        }));
      }
      this.writtenBytes = 0;
    } finally {
      this.rotating = false;
    }
  }
  shouldLog(e10) {
    if (this.deps.isTestEnvironment && !this.toStderr && this.filePath === null) return false;
    if (!this.deps.isAnt && !this.isDebugMode()) return false;
    if (typeof process > "u" || typeof process.versions > "u" || typeof process.versions.node > "u") return false;
    return bP(e10, this.filter);
  }
  resolveDirToFile(e10) {
    return this.resolvedLogPath = pn.join(e10, `${this.deps.sessionId()}.txt`), this.resolvedLogPath;
  }
  async appendGroup(e10, t, n, r) {
    if (this.storageV5 !== void 0 && e10.arm === "v5") {
      await this.appendV5AndMark(this.storageV5, t, n);
      return;
    }
    if (e10.target === null || !this.writesFiles()) return;
    if (r) await promises.mkdir(pn.dirname(e10.target), { recursive: true }).catch(() => {
    });
    let o = e10;
    try {
      await promises.appendFile(e10.target, n);
    } catch (s) {
      if (!zS(s)) throw s;
      if (this.storageV5 === void 0) o = { ...e10, target: this.resolveDirToFile(e10.target) }, await promises.appendFile(o.target, n);
      else {
        if (this.overrideDirectory = e10.target, o = jI(t, e10.configHome, e10.target, e10.target), o.arm === "v5") {
          await this.appendV5AndMark(this.storageV5, t, n);
          return;
        }
        await promises.mkdir(pn.dirname(o.target), { recursive: true }).catch(() => {
        });
        try {
          await promises.appendFile(o.target, n);
        } catch {
          return;
        }
      }
    }
    if (o.rotate) {
      if (this.storageV5 !== void 0 && o.target !== this.rotationTarget) this.rotationTarget = o.target, this.writtenBytes = -1;
      await this.maybeRotate(o.target, Buffer.byteLength(n)).catch(HI);
    }
    if (o.pointLatest) this.markLatestSymlink();
  }
  async appendV5AndMark(e10, t, n) {
    let r = be(), o = r, s = await BI(e10, t.sessionId, n, o);
    if (s === "refused") this.latestRefused = true, s = await BI(e10, t.sessionId, n, false), this.log("debug log: the storage backend refused markLatest; <debug folder>/latest is not pointed in this process", { level: "warn" });
    if (s !== "landed") return;
    this.markLatestSymlink();
  }
  markLatestSymlink() {
    if (!this.latestMarked && this.writesFiles()) this.latestMarked = true, this.updateLatestSymlink();
  }
  isSessionDiskless() {
    try {
      return this.deps.diskless?.() === true;
    } catch {
      return true;
    }
  }
  writesFiles() {
    if (this.isSessionDiskless()) return false;
    try {
      return this.deps.defaultFile?.() !== false || this.filePath !== null || this.deps.env.CLAUDE_CODE_DEBUG_LOGS_DIR !== void 0;
    } catch {
      return false;
    }
  }
  async appendOldestChunks() {
    let e10 = this.backlog, t = this.unflushedChunks[0], n = t?.queued;
    if (n === void 0) return;
    let r = 0, o = 0, s = false;
    for (let { content: i, queued: a } of this.unflushedChunks) {
      if (a === void 0 || a.owner !== n.owner || a.decision.arm !== n.decision.arm || a.decision.target !== n.decision.target || a.origin.sessionId !== n.origin.sessionId || a.origin.fromBackend !== n.origin.fromBackend || r > 0 && o + i.length > C8) break;
      r++, o += i.length, s ||= a.needMkdir;
    }
    if (e10.appendSince = Date.now(), await n.owner.appendGroup(n.decision, n.origin, this.unflushedChunks.slice(0, r).map((i) => i.content).join(""), s).catch(HI), e10.appendSince = 0, e10.stuck = "no", this.unflushedChunks[0] === t) this.unflushedChunks.splice(0, r), e10.length -= o;
  }
  drainSync() {
    if (this.unflushedChunks.length === 0) return;
    if (this.backlog.length = 0, !this.drainsSyncAtExit() || !this.writesFiles() || this.isAppendStuck()) {
      this.unflushedChunks.length = 0;
      return;
    }
    let e10 = [];
    for (let t of this.unflushedChunks.splice(0)) {
      if (t.target === null) continue;
      let n = e10.at(-1);
      if (n !== void 0 && n.armed === t.armed && (!t.armed || n.target === t.target)) n.parts.push(t);
      else e10.push({ target: t.target, armed: t.armed, parts: [t] });
    }
    for (let { target: t, armed: n, parts: r } of e10) {
      let o = n ? t : this.logPath(), s = r.map((i) => i.content).join("");
      try {
        ke().mkdirSync(pn.dirname(o));
      } catch {
      }
      try {
        ke().appendFileSync(o, s);
      } catch (i) {
        if (zS(i)) try {
          if (!n) ke().appendFileSync(this.resolveDirToFile(o), s);
          else {
            let a = (d, p) => {
              try {
                ke().appendFileSync(pn.join(o, `${d}.txt`), p);
              } catch {
              }
            }, l = r[0]?.sessionId, c = "";
            for (let d of r) {
              if (d.sessionId !== l) a(l, c), l = d.sessionId, c = "";
              c += d.content;
            }
            a(l, c);
          }
        } catch {
        }
      }
    }
  }
  droppedLineTotal() {
    return this.backlog.droppedTotal;
  }
  takeDroppedNote() {
    let { droppedCount: e10 } = this.backlog;
    if (e10 === 0) return "";
    return this.backlog.droppedCount = 0, `${(/* @__PURE__ */ new Date()).toISOString()} [WARN] debug messages not logged: ${e10} since the line above, because writes to this log were over 10 s behind, with over 1 MiB waiting
`;
  }
  groupLines(e10) {
    let t = e10[0];
    if (t === void 0) return [];
    let n = this.filePath ?? this.deps.env.CLAUDE_CODE_DEBUG_LOGS_DIR ?? null, r = this.isSessionDiskless();
    if (r && (this.storageV5 === void 0 || n !== null)) return [];
    if (this.storageV5 === void 0) return [{ decision: { target: this.logPath(), arm: "raw", configHome: "", rotate: true, pointLatest: true }, origin: t.origin, lines: e10 }];
    let o = [];
    for (let s of e10) {
      if (r && s.origin.fromBackend) continue;
      let i = o.at(-1);
      if (i !== void 0 && i.origin.sessionId === s.origin.sessionId && i.origin.fromBackend === s.origin.fromBackend) i.lines.push(s);
      else o.push({ decision: r ? T8 : jI(s.origin, this.deps.configHomeDir(), n, this.overrideDirectory), origin: s.origin, lines: [s] });
    }
    return o;
  }
  getWriter() {
    if (this.writer) return this.writer;
    let e10 = null, t = this.storageV5 !== void 0;
    if (this.writer = gP({ writeBatch: (n) => {
      if (this.redirect) {
        this.redirect(n.map((s) => s.content).join(""));
        return;
      }
      if (this.exiting) {
        for (let s of this.groupLines(n)) this.unflushedChunks.push({ target: s.decision.target, sessionId: s.origin.sessionId, armed: t, content: this.takeDroppedNote() + s.lines.map((i) => i.content).join("") });
        this.drainSync();
        return;
      }
      let r = this.writesFiles(), o = this.backlog;
      this.isAppendStuck();
      for (let s of this.groupLines(n)) {
        if (s.decision.arm === "raw" && !r) continue;
        if (o.droppedCount > 0 ? o.length >= FI / 2 : o.length >= FI && Date.now() - (this.unflushedChunks[0]?.queued?.at ?? 1 / 0) >= b8) {
          o.droppedCount += s.lines.length, o.droppedTotal += s.lines.length;
          continue;
        }
        let i = this.takeDroppedNote() + s.lines.map((c) => c.content).join("");
        if (i === "") continue;
        let a = s.decision.arm === "raw" ? pn.dirname(s.decision.target) : null, l = a !== null && (s.origin.fromBackend || e10 !== a);
        if (a !== null) e10 = a;
        this.unflushedChunks.push({ target: s.decision.target, sessionId: s.origin.sessionId, armed: t, content: i, queued: { at: Date.now(), owner: this, decision: s.decision, origin: s.origin, needMkdir: l } }), o.length += i.length, o.chain = R8(() => o.chain.then(this.appendOldest));
      }
    }, sizeOf: (n) => n.content.length, flushIntervalMs: 1e3, maxBufferSize: 100, immediateMode: this.isDebugMode() }), this.deps.registerCleanup(async () => {
      this.writer?.dispose(), await this.drained();
    }), !this.exitHandlerRegistered) this.exitHandlerRegistered = true, this.deps.onExit(this.handleExit.bind(this));
    return this.writer;
  }
  async updateLatestSymlink() {
    try {
      let e10 = this.logPath(), t = pn.join(pn.dirname(e10), "latest");
      await promises.unlink(t).catch(() => {
      }), await promises.symlink(e10, t);
    } catch {
    }
  }
}
class WI {
  instance = void 0;
  init = {};
  defaultFile = true;
  limits = void 0;
  setInstance(e10) {
    this.instance = e10;
  }
  setInit(e10) {
    this.init = e10;
  }
  disableDefaultFile() {
    this.defaultFile = false;
  }
  setLimits(e10) {
    this.limits = e10;
  }
}
var P8 = new xe(() => new WI());
function I8() {
  return Vr(P8);
}
function D8(e10, t) {
  return new GI({ argv: process.argv, env: process.env, sessionId: () => gE(), configHomeDir: () => Mt(), onExit: (n) => {
    process.on("exit", n);
  }, registerCleanup: (n) => {
    Mf(n);
  }, writeToStderr: (n) => {
    $P(n, { mayDrop: true });
  }, isAnt: false, isTestEnvironment: false, launchIdentity: t, storageV5: e10.init.storageV5 !== void 0 && e10.init.configHome === za() ? e10.init.storageV5 : void 0, syncExitDrain: e10.init.syncExitDrain, diskless: () => Qe(), defaultFile: () => e10.defaultFile, limits: () => e10.limits });
}
function L8() {
  let e10 = I8(), t = e10.instance;
  if (t) return t;
  let n = D8(e10);
  return e10.setInstance(n), n;
}
function K(e10, t = { level: "debug" }) {
  L8().log(e10, t);
}
function Hi(e10) {
  return { parse: (t) => e10(U8(t)) };
}
function N8(e10) {
  let t = e10?.trim();
  return t ? t : void 0;
}
function U8(e10) {
  return e10 === void 0 ? void 0 : String(e10);
}
var F8 = Hi(N8), $8 = Hi((e10) => e10), z8 = Hi((e10) => Oe(e10)), H8 = Hi((e10) => {
  if (Oe(e10)) return true;
  if (Wr(e10)) return false;
  return;
}), j8 = ZI();
function YI(e10) {
  if (typeof e10 === "boolean") return e10 ? "1" : "0";
  return String(e10);
}
var u = { str: () => F8, rawStr: () => $8, bool: () => z8, triBool: () => H8, int: (e10) => e10 ? ZI(e10) : j8, names: (e10) => Hi((t) => {
  let n = /* @__PURE__ */ new Set();
  for (let r of t?.split(",") ?? []) {
    let o = r.trim();
    if (o.length > 0) n.add(o);
    if (n.size === e10) break;
  }
  return n.size > 0 ? Object.freeze([...n]) : void 0;
}), enum: (e10) => Hi((t) => t !== void 0 && e10.includes(t.trim()) ? t.trim() : void 0) };
function ZI(e10) {
  return Hi((t) => {
    if (t === void 0) return;
    if (e10?.digitsOnly && !/^[+-]?\d+$/.test(t.trim())) return;
    if (e10?.wholeValue && !/^[+-]?\d+$/.test(t.trim()) && EE(t.trim()) === void 0) return;
    let n = mu(t);
    if (!Number.isFinite(n)) return;
    if (e10?.min !== void 0 && n < e10.min) return;
    if (e10?.max !== void 0 && n > e10.max) return;
    return n;
  });
}
var B8 = u.str(), K8 = u.str(), G8 = u.str(), W8 = u.str(), V8 = u.str(), q8 = u.str(), Y8 = u.str(), Z8 = u.str(), J8 = u.str(), X8 = u.str(), Q8 = u.str(), e7 = u.str(), t7 = u.str(), n7 = u.str(), r7 = u.str(), o7 = u.str(), s7 = u.str(), i7 = u.str(), a7 = u.str(), l7 = u.str(), c7 = u.str(), u7 = u.str(), d7 = u.str(), p7 = u.str(), f7 = u.str(), m7 = u.str(), g7 = u.str(), h7 = u.bool(), _7 = u.bool(), y7 = u.str(), S7 = u.bool(), E7 = u.bool(), b7 = u.int({ min: 1 }), C7 = u.str(), A7 = u.str(), R7 = u.str(), O7 = u.str(), T7 = u.bool(), w7 = u.bool(), x7 = u.str(), v7 = u.str(), k7 = u.str(), P7 = u.int({ min: 0 }), I7 = u.int({ min: 0 }), D7 = u.int(), L7 = u.bool(), M7 = u.int(), N7 = u.bool(), U7 = u.bool(), F7 = u.bool(), $7 = u.bool(), z7 = u.bool(), H7 = u.bool(), j7 = u.bool(), B7 = u.int({ min: 1, max: 2147483647 }), K7 = u.str(), G7 = u.str(), W7 = u.str(), V7 = u.str(), q7 = u.str(), Y7 = u.str(), Z7 = u.str(), J7 = u.str(), X7 = u.str(), Q7 = u.str(), eQ = u.str();
var tQ = u.bool(), nQ = u.str(), rQ = u.str(), oQ = u.str(), sQ = u.bool(), iQ = u.str(), aQ = u.bool(), lQ = u.bool(), cQ = u.bool(), uQ = u.str(), dQ = u.int(), pQ = u.str(), fQ = u.int(), mQ = u.str(), gQ = u.str(), hQ = u.str(), _Q = u.bool(), yQ = u.bool(), SQ = u.bool(), EQ = u.int(), bQ = u.int(), CQ = u.int(), AQ = u.int({ min: 1 }), RQ = u.int({ min: 1 }), OQ = u.bool(), TQ = u.bool(), wQ = u.str(), xQ = u.str(), vQ = u.str(), kQ = u.str(), PQ = u.str(), IQ = u.str(), DQ = u.str(), LQ = u.str(), MQ = u.str(), NQ = u.str(), UQ = u.str(), FQ = u.str(), $Q = u.str(), zQ = u.str(), HQ = u.str(), jQ = u.str(), BQ = u.int(), KQ = u.int(), GQ = u.int(), WQ = u.str(), VQ = u.int({ min: 0 }), qQ = u.int({ min: 0 }), YQ = u.int({ min: 0 }), ZQ = u.int({ min: 1, digitsOnly: true }), JQ = u.bool(), XQ = u.triBool(), QQ = u.bool(), eee = u.bool(), tee = u.bool(), nee = u.bool(), ree = u.str(), oee = u.str(), see = u.str(), iee = u.str(), aee = u.str(), lee = u.str(), cee = u.str(), uee = u.str(), dee = u.str();
function XI() {
  return "prod";
}
function rb() {
  if (process.env.CLAUDE_CODE_CUSTOM_OAUTH_URL) return "-custom-oauth";
  switch (XI()) {
    case "local":
      return "-local-oauth";
    case "staging":
      return "-staging-oauth";
    case "prod":
      return "";
  }
}
function Za() {
  return process.versions.bun !== void 0;
}
var ws = Nl.homedir(), cb = Nl.tmpdir(), { env: Xa } = Ws, Iee = (e10) => {
  let t = _n.join(ws, "Library");
  return { data: _n.join(t, "Application Support", e10), config: _n.join(t, "Preferences", e10), cache: _n.join(t, "Caches", e10), log: _n.join(t, "Logs", e10), temp: _n.join(cb, e10) };
}, Dee = (e10) => {
  let t = Xa.APPDATA || _n.join(ws, "AppData", "Roaming"), n = Xa.LOCALAPPDATA || _n.join(ws, "AppData", "Local");
  return { data: _n.join(n, e10, "Data"), config: _n.join(t, e10, "Config"), cache: _n.join(n, e10, "Cache"), log: _n.join(n, e10, "Log"), temp: _n.join(cb, e10) };
}, Lee = (e10) => {
  let t = _n.basename(ws);
  return { data: _n.join(Xa.XDG_DATA_HOME || _n.join(ws, ".local", "share"), e10), config: _n.join(Xa.XDG_CONFIG_HOME || _n.join(ws, ".config"), e10), cache: _n.join(Xa.XDG_CACHE_HOME || _n.join(ws, ".cache"), e10), log: _n.join(Xa.XDG_STATE_HOME || _n.join(ws, ".local", "state"), e10), temp: _n.join(cb, t, e10) };
};
function ub(e10, { suffix: t = "nodejs" } = {}) {
  if (typeof e10 !== "string") throw TypeError(`Expected a string, got ${typeof e10}`);
  if (t) e10 += `-${t}`;
  if (Ws.platform === "darwin") return Iee(e10);
  if (Ws.platform === "win32") return Dee(e10);
  return Lee(e10);
}
function db(e10) {
  let t = 0;
  for (let n = 0; n < e10.length; n++) t = (t << 5) - t + e10.charCodeAt(n) | 0;
  return t;
}
ub("claude-cli");
function Nee(e10) {
  return `</pasted_content id="${e10}">
`;
}
function Uee(e10) {
  if (e10.length !== 4) return false;
  for (let t = 0; t < e10.length; t++) {
    let n = e10.charCodeAt(t);
    if (!(n >= 48 && n <= 57 || n >= 97 && n <= 102)) return false;
  }
  return true;
}
function Fee(e10) {
  let t = [], n = 0, r = 0;
  for (; ; ) {
    let o = e10.indexOf('<pasted_content id="', r);
    if (o === -1) break;
    let s = o + 20, i = e10.slice(s, s + 4);
    if (!Uee(i) || !e10.startsWith(`">
`, s + 4)) {
      r = s;
      continue;
    }
    let a = s + 4 + 3, c = Nee(i).slice(0, -1), d = e10.indexOf(`
${c}`, a - 1) + 1;
    if (d === 0) break;
    let p = o;
    for (let f = 0; f < 2 && p > n && e10[p - 1] === `
`; f++) p--;
    if (p > n) t.push({ kind: "text", text: e10.slice(n, p) });
    n = d + c.length;
    for (let f = 0; f < 2 && e10[n] === `
`; f++) n++;
    t.push({ kind: "block", id: i, body: e10.slice(a, d - 1), raw: e10.slice(p, n) }), r = n;
  }
  if (n < e10.length) t.push({ kind: "text", text: e10.slice(n) });
  return t;
}
function pb(e10) {
  let t = Fee(e10);
  if (t.length === 1 && t[0].kind === "text") return e10;
  return t.map((n) => n.kind === "text" ? n.text : n.body).join("");
}
function zee() {
  if (process.env.CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC) return "essential-traffic";
  if (process.env.DISABLE_TELEMETRY) return "no-telemetry";
  if (Oe(process.env.DO_NOT_TRACK)) return "no-telemetry";
  return "default";
}
function fD() {
  return zee() === "essential-traffic";
}
var Hee = 100, jee = 1e3;
class gD {
  recentErrors = [];
  queue = [];
  droppedBeforeSink = 0;
  sink = null;
  hardFailMode = void 0;
  maxRememberedChars = void 0;
  remember(e10) {
    if (this.recentErrors.length >= Hee) this.recentErrors.shift();
    let t = this.maxRememberedChars;
    this.recentErrors.push(t === void 0 || e10.error.length <= t ? e10 : { ...e10, error: `error text not remembered: it has ${e10.error.length} characters, over this process's fixed limit of ${t} per error` });
  }
  dispatch(e10) {
    if (this.sink === null) {
      if (this.queue.length >= jee) {
        this.droppedBeforeSink++;
        return;
      }
      this.queue.push(e10);
      return;
    }
    switch (e10.type) {
      case "error":
        this.sink.logError(e10.error);
        break;
      case "mcpError":
        this.sink.logMCPError(e10.serverName, e10.error);
        break;
      case "mcpDebug":
        this.sink.logMCPDebug(e10.serverName, e10.message);
        break;
    }
  }
  attachSink(e10) {
    if (this.sink !== null) return;
    this.sink = e10;
    let t = this.queue;
    this.queue = [];
    for (let n of t) this.dispatch(n);
  }
  isHardFailMode() {
    return this.hardFailMode ??= process.argv.includes("--hard-fail"), this.hardFailMode;
  }
  reset() {
    this.recentErrors = [], this.queue = [], this.droppedBeforeSink = 0, this.sink = null, this.hardFailMode = void 0, this.maxRememberedChars = void 0;
  }
}
var mD = new gD();
function ji(e10) {
  let t = Vn(e10);
  try {
    if (Oe(process.env.CLAUDE_CODE_USE_BEDROCK) || Oe(process.env.CLAUDE_CODE_USE_VERTEX) || Oe(process.env.CLAUDE_CODE_USE_FOUNDRY) || Oe(process.env.CLAUDE_CODE_USE_ANTHROPIC_AWS) || Oe(process.env.CLAUDE_CODE_USE_ANTHROPIC_GOOGLE_CLOUD) || Oe(process.env.CLAUDE_CODE_USE_MANTLE) || process.env.DISABLE_ERROR_REPORTING || fD()) return;
    let r = { error: Ek(t), timestamp: (/* @__PURE__ */ new Date()).toISOString() };
    mD.remember(r), mD.dispatch({ type: "error", error: t });
  } catch {
  }
}
var Bee = it({ value: false });
function hD() {
  return Bee.value;
}
function sm() {
  if (hD()) return;
  try {
    return ke().readFileSync("/proc/version", { encoding: "utf8" }).toLowerCase();
  } catch {
    return;
  }
}
function Qa(e10) {
  return e10.includes("microsoft") || e10.includes("wsl");
}
class yD {
  sources;
  primedProcVersion;
  fallbackProcVersion;
  fallbackProcVersionRead = false;
  platform;
  wslVersion = null;
  macOSMajorVersion = null;
  linuxDistroInfo;
  constructor(e10) {
    this.sources = e10;
  }
  kernelString() {
    if (this.primedProcVersion !== void 0) return this.primedProcVersion;
    if (!this.fallbackProcVersionRead) this.fallbackProcVersion = this.sources.readProcVersionSync(), this.fallbackProcVersionRead = true;
    return this.fallbackProcVersion;
  }
  getPlatform() {
    if (this.platform !== void 0) return this.platform;
    try {
      if (this.sources.platform === "darwin") this.platform = "macos";
      else if (this.sources.platform === "win32") this.platform = "windows";
      else if (this.sources.platform === "linux") if (this.sources.env.WSL_DISTRO_NAME || this.sources.env.WSL_INTEROP) this.platform = "wsl";
      else {
        let e10 = this.kernelString();
        this.platform = e10 !== void 0 && Qa(e10) ? "wsl" : "linux";
      }
      else this.platform = "unknown";
    } catch (e10) {
      ji(e10), this.platform = "unknown";
    }
    return this.platform;
  }
  getWslVersion() {
    if (this.wslVersion !== null) return this.wslVersion;
    if (this.sources.platform !== "linux") {
      this.wslVersion = void 0;
      return;
    }
    let e10 = this.kernelString();
    if (e10 === void 0) {
      this.wslVersion = void 0;
      return;
    }
    let t = e10.match(/wsl(\d+)/);
    if (t && t[1]) this.wslVersion = t[1];
    else if (e10.includes("microsoft")) this.wslVersion = "1";
    else this.wslVersion = void 0;
    return this.wslVersion;
  }
  getMacOSMajorVersion() {
    if (this.macOSMajorVersion !== null) return this.macOSMajorVersion;
    if (this.sources.platform !== "darwin") {
      this.macOSMajorVersion = void 0;
      return;
    }
    let e10 = this.sources.osRelease().match(/^(\d+)\./);
    return this.macOSMajorVersion = e10 && e10[1] ? parseInt(e10[1], 10) - 9 : void 0, this.macOSMajorVersion;
  }
  getLinuxDistroInfo() {
    return this.linuxDistroInfo ??= this.readLinuxDistroInfo();
  }
  async readLinuxDistroInfo() {
    if (this.sources.platform !== "linux") return;
    let e10 = { linuxKernel: this.sources.osRelease() };
    try {
      let t = await this.sources.readOsRelease();
      for (let n of t.split(`
`)) {
        let r = n.match(/^(ID|VERSION_ID)=(.*)$/);
        if (r && r[1] && r[2]) {
          let o = r[2].replace(/^"|"$/g, "");
          if (r[1] === "ID") e10.linuxDistroId = o;
          else e10.linuxDistroVersion = o;
        }
      }
    } catch {
    }
    return e10;
  }
  async prime() {
    if (this.primedProcVersion !== void 0 || this.sources.platform !== "linux") return;
    try {
      let e10 = await this.sources.readProcVersion();
      this.primedProcVersion = e10.toLowerCase();
    } catch (e10) {
      K(`Failed to read /proc/version for WSL detection: ${e10}`, { level: "error" });
      return;
    }
    this.platform = void 0, this.wslVersion = null;
  }
}
var Gee;
function Wee() {
  return Gee ??= new yD({ platform: process.platform, env: process.env, readProcVersionSync: sm, readProcVersion: () => promises.readFile("/proc/version", { encoding: "utf8" }), osRelease: require$$0$1.release, readOsRelease: () => promises.readFile("/etc/os-release", "utf8") });
}
function kt() {
  return Wee().getPlatform();
}
function SD(e10) {
  return !e10.isDirectory() && !e10.isFile() && !e10.isSymbolicLink() && !e10.isFIFO() && !e10.isSocket() && !e10.isBlockDevice() && !e10.isCharacterDevice();
}
function qee(e10) {
  let t = process.cwd();
  return e10.filter((n) => !vf(n, t));
}
function ED(e10) {
  return Yee(e10, Bun.which(e10));
}
function Yee(e10, t) {
  if (!t || process.platform !== "win32" || pn.isAbsolute(e10)) return t;
  return qee([t])[0] ?? null;
}
var bD = async (e10) => ED(e10), CD = ED;
function xu() {
  return process.platform !== "linux" || Qe();
}
function AD() {
  if (xu()) return false;
  return ke().existsSync("/proc/sys/fs/binfmt_misc/WSLInterop");
}
function RD() {
  if (xu()) return;
  try {
    return ke().readFileSync("/sys/hypervisor/uuid", { encoding: "utf8" }).trim().toLowerCase();
  } catch {
    return;
  }
}
function OD() {
  if (xu()) return false;
  return ke().existsSync("/.dockerenv");
}
function nte() {
  if (Qe()) return TD();
  let e10 = pn.join(Mt(), ".config.json"), t = TD();
  try {
    let n = ke().statSync(e10);
    if (n.isFile() && (n.size > 0 || (n.mode & 146) !== 0 && !ke().existsSync(t))) return e10;
  } catch {
  }
  return t;
}
function TD() {
  let e10 = `.claude${rb()}.json`;
  return pn.join(process.env.CLAUDE_CONFIG_DIR || require$$0$1.homedir(), e10);
}
async function rte() {
  return null;
}
async function el(e10) {
  try {
    return !!await bD(e10);
  } catch {
    return false;
  }
}
async function ote() {
  let e10 = [];
  if (await el("npm")) e10.push("npm");
  if (await el("yarn")) e10.push("yarn");
  if (await el("pnpm")) e10.push("pnpm");
  return e10;
}
async function ste() {
  let e10 = [];
  if (await el("bun")) e10.push("bun");
  if (await el("deno")) e10.push("deno");
  if (await el("node")) e10.push("node");
  return e10;
}
var wD = ["git", "node", "npm", "npx", "yarn", "pnpm", "bun", "deno", "tsc", "python", "python3", "py", "pip", "uv", "poetry", "ruby", "gem", "bundle", "rake", "dotnet", "msbuild", "nuget", "cl", "nmake", "cmake", "ninja", "make", "gcc", "g++", "clang", "cargo", "rustc", "go", "java", "javac", "mvn", "gradle", "docker"], ite = 1e3;
async function ate(e10) {
  try {
    return /appinstaller/i.test(await promises.readlink(e10));
  } catch {
    return false;
  }
}
async function lte(e10) {
  if (e10 === "" || du(e10) || $a(e10)) return false;
  return !await xE(pn.resolve(e10));
}
async function cte(e10, t) {
  let n = kt() === "windows", r = new Set(e10), o = n ? (process.env.PATHEXT ?? ".COM;.EXE;.BAT;.CMD").toLowerCase().split(";").filter(Boolean) : [], s = Lt((process.env.PATH ?? "").split(pn.delimiter).map((i) => i.replace(/^"|"$/g, "")).filter(Boolean));
  await Promise.all(s.map(async (i) => {
    if (!await lte(i)) return;
    let a;
    try {
      a = await promises.readdir(i, { withFileTypes: true });
    } catch {
      return;
    }
    let l = n && /[\\/]microsoft[\\/]windowsapps[\\/]?$/i.test(i);
    for (let c of a) {
      if (c.isDirectory()) continue;
      let d = c.name;
      if (n) {
        let p = d.toLowerCase(), f = p.lastIndexOf(".");
        if (f <= 0 || !o.includes(p.slice(f))) continue;
        d = p.slice(0, f);
      }
      if (!r.has(d) || t.has(d)) continue;
      if (n) {
        if (l && await ate(pn.join(i, c.name))) continue;
      } else {
        let p = pn.join(i, c.name);
        if ((c.isSymbolicLink() || SD(c)) && await xE(pn.resolve(p))) continue;
        try {
          await promises.access(p, un$1.constants.X_OK);
        } catch {
          continue;
        }
      }
      t.add(d);
    }
  }));
}
async function ute() {
  let e10 = /* @__PURE__ */ new Set();
  try {
    await Or(cte(wD, e10), ite, "build tool PATH scan timed out");
  } catch {
  }
  return wD.filter((t) => e10.has(t));
}
function dte(e10) {
  try {
    if (!e10.isWslEnvironment()) return false;
    let t = CD("npm");
    if (t === null) return false;
    return t.startsWith("/mnt/c/");
  } catch (t) {
    return false;
  }
}
function pte() {
  return process.env.__CFBundleIdentifier === "com.conductor.app";
}
var vD = ["pycharm", "intellij", "webstorm", "phpstorm", "rubymine", "clion", "goland", "rider", "datagrip", "appcode", "dataspell", "aqua", "gateway", "fleet", "jetbrains", "androidstudio"];
function fte(e10) {
  let t = e10.toLowerCase();
  return t.includes("windsurf") || t.includes("devin.app") || t.includes("devin desktop") || t.includes("devin-desktop") || /appdata[\\/]local[\\/](programs[\\/])?devin[\\/]/.test(t);
}
function mte() {
  if (process.env.CURSOR_TRACE_ID) return "cursor";
  let e10 = process.env.VSCODE_GIT_ASKPASS_MAIN?.toLowerCase() ?? "";
  if (e10.includes("cursor")) return "cursor";
  if (fte(e10)) return "windsurf";
  if (e10.includes("antigravity")) return "antigravity";
  let t = process.env.__CFBundleIdentifier?.toLowerCase();
  if (t?.includes("vscodium")) return "codium";
  if (t?.includes("windsurf") || t?.includes("devin")) return "windsurf";
  if (t?.includes("com.google.android.studio")) return "androidstudio";
  if (t) {
    for (let n of vD) if (t.includes(n)) return n;
  }
  if (process.env.VisualStudioVersion) return "visualstudio";
  if (process.env.TERMINAL_EMULATOR === "JetBrains-JediTerm") return "pycharm";
  if (process.env.TERM === "xterm-ghostty") return "ghostty";
  if (process.env.TERM?.includes("kitty")) return "kitty";
  if (process.env.TERM_PROGRAM) {
    if (/^devin([ -]desktop)?$/i.test(process.env.TERM_PROGRAM)) return "windsurf";
    return process.env.TERM_PROGRAM;
  }
  if (process.env.TMUX) return "tmux";
  if (process.env.STY) return "screen";
  if (process.env.KONSOLE_VERSION) return "konsole";
  if (process.env.GNOME_TERMINAL_SERVICE) return "gnome-terminal";
  if (process.env.XTERM_VERSION) return "xterm";
  if (process.env.VTE_VERSION) return "vte-based";
  if (process.env.TERMINATOR_UUID) return "terminator";
  if (process.env.KITTY_WINDOW_ID) return "kitty";
  if (process.env.ALACRITTY_LOG) return "alacritty";
  if (process.env.TILIX_ID) return "tilix";
  if (process.env.WT_SESSION) return "windows-terminal";
  if (process.env.SESSIONNAME && process.env.TERM === "cygwin") return "cygwin";
  if (process.env.MSYSTEM) return process.env.MSYSTEM.toLowerCase();
  if (process.env.ConEmuANSI || process.env.ConEmuPID || process.env.ConEmuTask) return "conemu";
  if (process.env.WSL_DISTRO_NAME) return `wsl-${process.env.WSL_DISTRO_NAME}`;
  if (ID()) return "ssh-session";
  if (process.env.TERM) {
    let n = process.env.TERM;
    if (n.includes("alacritty")) return "alacritty";
    if (n.includes("rxvt")) return "rxvt";
    if (n.includes("termite")) return "termite";
    return process.env.TERM;
  }
  if (!process.stdout.isTTY) return "non-interactive";
  return null;
}
class kD {
  sources;
  globalClaudeFile;
  packageManagers;
  runtimes;
  detectedBuildTools;
  wslEnvironment;
  npmFromWindowsPath;
  deploymentEnvironment;
  primedWslInteropExists;
  primedHypervisorUuid;
  primedDockerenvExists;
  fallbackWslInteropExists;
  fallbackHypervisorUuid;
  fallbackDockerenvExists;
  constructor(e10) {
    this.sources = e10;
  }
  getGlobalClaudeFile() {
    return this.globalClaudeFile ??= nte();
  }
  seedGlobalClaudeFile(e10) {
    if (this.globalClaudeFile === void 0) return this.globalClaudeFile = e10, "seeded";
    return this.globalClaudeFile === e10 ? "unchanged" : "conflict";
  }
  getPackageManagers() {
    return this.packageManagers ??= ote();
  }
  getRuntimes() {
    return this.runtimes ??= ste();
  }
  getDetectedBuildTools() {
    return this.detectedBuildTools ??= ute();
  }
  isWslEnvironment() {
    return this.wslEnvironment ??= this.primedWslInteropExists ?? (process.platform === "linux" ? this.fallbackWslInteropExists ??= this.sources.wslInteropExistsSync() : false);
  }
  isNpmFromWindowsPath() {
    return this.npmFromWindowsPath ??= dte(this);
  }
  hypervisorUuid() {
    return this.primedHypervisorUuid ?? (this.fallbackHypervisorUuid ??= this.sources.readHypervisorUuidSync() ?? "");
  }
  isDockerenvPresent() {
    return this.primedDockerenvExists ?? (this.fallbackDockerenvExists ??= this.sources.dockerenvExistsSync());
  }
  detectDeploymentEnvironment() {
    return this.deploymentEnvironment ??= hte(this);
  }
  async prime() {
    if (this.primedWslInteropExists !== void 0 || xu()) return;
    let [e10, t, n] = await Promise.all([promises.access("/proc/sys/fs/binfmt_misc/WSLInterop").then(() => true, () => false), promises.readFile("/sys/hypervisor/uuid", { encoding: "utf8" }).then((r) => r.trim().toLowerCase(), () => {
      return;
    }), promises.access("/.dockerenv").then(() => true, () => false)]);
    this.primedWslInteropExists = e10, this.primedHypervisorUuid = t ?? "", this.primedDockerenvExists = n, this.wslEnvironment = void 0, this.npmFromWindowsPath = void 0, this.deploymentEnvironment = void 0;
  }
}
var gte = new xe(() => new kD({ wslInteropExistsSync: AD, readHypervisorUuidSync: RD, dockerenvExistsSync: OD }));
function vu() {
  return gte.of(Jt().host);
}
function PD() {
  return vu().detectDeploymentEnvironment();
}
function hte(e10) {
  if (Oe(process.env.CODESPACES)) return "codespaces";
  if (process.env.GITPOD_WORKSPACE_ID) return "gitpod";
  if (Oe(process.env.CODER) || process.env.CODER_WORKSPACE_NAME) return "coder";
  if (Oe(process.env.DEVPOD) || process.env.DEVPOD_WORKSPACE_UID) return "devpod";
  if (process.env.DAYTONA_WS_ID) return "daytona";
  if (Oe(process.env.GOOGLE_CLOUD_WORKSTATIONS)) return "gcp-cloud-workstations";
  if (process.env.C9_PID || process.env.C9_USER) return "aws-cloud9";
  if (process.env.REPL_ID || process.env.REPL_SLUG) return "replit";
  if (process.env.PROJECT_DOMAIN) return "glitch";
  if (Oe(process.env.VERCEL)) return "vercel";
  if (process.env.RAILWAY_ENVIRONMENT_NAME || process.env.RAILWAY_SERVICE_NAME) return "railway";
  if (Oe(process.env.RENDER)) return "render";
  if (Oe(process.env.NETLIFY)) return "netlify";
  if (process.env.DYNO) return "heroku";
  if (process.env.FLY_APP_NAME || process.env.FLY_MACHINE_ID) return "fly.io";
  if (Oe(process.env.CF_PAGES)) return "cloudflare-pages";
  if (process.env.DENO_DEPLOYMENT_ID) return "deno-deploy";
  if (process.env.AWS_LAMBDA_FUNCTION_NAME) return "aws-lambda";
  if (process.env.AWS_EXECUTION_ENV === "AWS_ECS_FARGATE") return "aws-fargate";
  if (process.env.AWS_EXECUTION_ENV === "AWS_ECS_EC2") return "aws-ecs";
  if (e10.hypervisorUuid().startsWith("ec2")) return "aws-ec2";
  if (process.env.K_SERVICE) return "gcp-cloud-run";
  if (process.env.GOOGLE_CLOUD_PROJECT) return "gcp";
  if (process.env.WEBSITE_SITE_NAME || process.env.WEBSITE_SKU) return "azure-app-service";
  if (process.env.AZURE_FUNCTIONS_ENVIRONMENT) return "azure-functions";
  if (process.env.APP_URL?.includes("ondigitalocean.app")) return "digitalocean-app-platform";
  if (process.env.SPACE_CREATOR_USER_ID) return "huggingface-spaces";
  if (Oe(process.env.GITHUB_ACTIONS)) return "github-actions";
  if (Oe(process.env.GITLAB_CI)) return "gitlab-ci";
  if (process.env.CIRCLECI) return "circleci";
  if (process.env.BUILDKITE) return "buildkite";
  if (Oe(false)) return "ci";
  if (process.env.KUBERNETES_SERVICE_HOST) return "kubernetes";
  if (e10.isDockerenvPresent()) return "docker";
  if (ku.platform === "darwin") return "unknown-darwin";
  if (ku.platform === "linux") return "unknown-linux";
  if (ku.platform === "win32") return "unknown-win32";
  return "unknown";
}
function ID() {
  return !!(process.env.SSH_CONNECTION || process.env.SSH_CLIENT || process.env.SSH_TTY);
}
var ku = { probeInternalNetworkAccess: rte, isCI: Oe(false), platform: ["win32", "darwin"].includes(process.platform) ? process.platform : "linux", arch: process.arch, nodeVersion: process.version, terminal: mte(), isSSH: ID, getPackageManagers() {
  return vu().getPackageManagers();
}, getRuntimes() {
  return vu().getRuntimes();
}, isRunningWithBun: Za, isWslEnvironment() {
  return vu().isWslEnvironment();
}, isNpmFromWindowsPath() {
  return vu().isNpmFromWindowsPath();
}, isConductor: pte, detectDeploymentEnvironment: PD };
var tl = ["5m", "1h"];
var _te = u.triBool(), yte = u.int({ min: 0 }), Ste = u.int({ min: 0 }), Ete = u.int({ min: 0 }), bte = u.triBool(), Cte = u.triBool(), Ate = u.bool(), Rte = u.bool(), Ote = u.bool(), Tte = u.str(), wte = u.bool(), xte = u.str(), vte = u.str(), kte = u.triBool(), Pte = u.triBool(), Ite = u.enum(["strict", "relaxed"]), Dte = u.enum(["control", "no_scratchpad", "no_scratchpad_capped", "no_scratchpad_keep_asks", "lean", "short", "short_v2", "capped"]), Lte = u.bool(), Mte = u.str(), Nte = u.triBool(), Ute = u.enum(["drop", "block", "off"]), Fte = u.str(), $te = u.triBool(), zte = u.triBool(), Hte = u.triBool(), jte = u.triBool(), Bte = u.triBool(), Kte = u.triBool(), Gte = u.triBool(), Wte = u.triBool(), Vte = u.bool(), qte = u.bool(), Yte = u.bool(), Zte = u.bool(), Jte = u.bool(), Xte = u.bool(), Qte = u.bool(), ene = u.bool(), tne = u.str(), nne = u.int({ min: 1, max: 10080, digitsOnly: true }), rne = u.bool(), one = u.bool(), sne = u.bool(), ine = u.bool(), ane = u.bool(), lne = u.bool(), cne = u.bool(), une = u.bool(), dne = u.bool(), pne = u.bool(), fne = u.bool(), mne = u.bool(), gne = u.bool(), hne = u.bool(), _ne = u.bool(), yne = u.bool(), Sne = u.bool(), Ene = u.bool(), bne = u.bool(), Cne = u.bool(), Ane = u.bool(), Rne = u.bool(), One = u.bool(), Tne = u.bool(), wne = u.bool(), xne = u.bool(), vne = u.bool(), kne = u.bool(), Pne = u.bool(), Ine = u.bool(), Dne = u.bool(), Lne = u.bool(), Mne = u.bool(), Nne = u.triBool(), Une = u.bool(), Fne = u.bool(), $ne = u.bool(), zne = u.bool(), Hne = u.bool(), jne = u.bool(), Bne = u.bool(), Kne = u.bool(), Gne = u.enum(["corroborate", "immediate", "never"]), Wne = u.triBool(), Vne = u.triBool(), qne = u.bool(), Yne = u.bool(), Zne = u.bool(), Jne = u.bool(), Xne = u.bool(), Qne = u.bool(), ere = u.bool(), tre = u.bool(), nre = u.bool(), rre = u.bool(), ore = u.bool(), sre = u.bool(), ire = u.bool(), are = u.bool(), lre = u.triBool(), cre = u.bool(), ure = u.bool(), dre = u.bool(), pre = u.bool(), fre = u.bool(), mre = u.bool(), gre = u.bool(), hre = u.bool(), _re = u.bool(), yre = u.triBool(), Sre = u.bool(), Ere = u.bool(), bre = u.bool(), Cre = u.bool(), Are = u.triBool(), Rre = u.bool(), Ore = u.bool(), Tre = u.bool(), wre = u.triBool(), xre = u.bool(), vre = u.bool(), kre = u.bool(), Pre = u.triBool(), Ire = u.bool(), Dre = u.bool(), Lre = u.bool(), Mre = u.bool(), Nre = u.triBool(), Ure = u.bool(), Fre = u.triBool(), $re = u.bool(), zre = u.bool(), Hre = u.str(), jre = u.bool(), Bre = u.int({ min: 1, digitsOnly: true }), Kre = u.triBool(), Gre = u.bool(), Wre = u.triBool(), Vre = u.bool(), qre = u.bool(), Yre = u.triBool(), Zre = u.bool(), Jre = u.bool(), Xre = u.bool(), Qre = u.str(), eoe = u.bool(), toe = u.bool(), noe = u.bool(), roe = u.enum(["baseline", "off"]), ooe = u.str(), soe = u.int(), ioe = u.str(), aoe = u.str(), loe = u.str(), coe = u.triBool(), uoe = u.str(), doe = u.triBool(), poe = u.triBool(), foe = u.triBool(), moe = u.bool(), goe = u.bool(), hoe = u.triBool(), _oe = u.triBool(), yoe = u.str(), Soe = u.triBool(), Eoe = u.triBool(), boe = u.int({ min: 1 }), Coe = u.int({ min: 1, wholeValue: true }), Aoe = u.str(), Roe = u.triBool(), Ooe = u.triBool(), Toe = u.triBool(), woe = u.triBool(), xoe = u.triBool(), voe = u.triBool(), koe = u.triBool(), Poe = u.triBool(), Ioe = u.triBool(), Doe = u.triBool(), Loe = u.triBool(), Moe = u.triBool(), Noe = u.triBool(), Uoe = u.triBool(), Foe = u.triBool(), $oe = u.triBool(), zoe = u.int({ min: 0 }), Hoe = u.bool(), joe = u.bool(), Boe = u.triBool(), Koe = u.triBool(), Goe = u.triBool(), Woe = u.triBool(), Voe = u.triBool(), qoe = u.triBool(), Yoe = u.triBool(), Zoe = u.triBool(), Joe = u.triBool(), Xoe = u.triBool(), Qoe = u.triBool(), ese = u.triBool(), tse = u.triBool(), nse = u.triBool(), rse = u.triBool(), ose = u.triBool(), sse = u.triBool(), ise = u.triBool(), ase = u.str(), lse = u.bool(), cse = u.bool(), use = u.bool(), dse = u.bool(), pse = u.str(), fse = u.bool(), mse = u.triBool(), gse = u.bool(), hse = u.bool(), _se = u.bool(), yse = u.bool(), Sse = u.bool(), Ese = u.bool(), bse = u.bool(), Cse = u.bool(), Ase = u.bool(), Rse = u.triBool(), Ose = u.bool(), Tse = u.triBool(), wse = u.bool(), xse = u.bool(), vse = u.bool(), kse = u.bool(), Pse = u.triBool(), Ise = u.bool(), Dse = u.bool(), Lse = u.bool(), Mse = u.bool(), Nse = u.bool(), Use = u.bool(), Fse = u.bool(), $se = u.triBool(), zse = u.str(), Hse = u.bool(), jse = u.bool(), Bse = u.bool(), Kse = u.bool(), Gse = u.bool(), Wse = u.bool(), Vse = u.triBool(), qse = u.triBool(), Yse = u.bool(), Zse = u.bool(), Jse = u.bool(), Xse = u.str(), Qse = u.bool(), eie = u.bool(), tie = u.bool(), nie = u.bool(), rie = u.bool(), oie = u.bool(), sie = u.bool(), iie = u.str(), aie = u.bool(), lie = u.bool(), cie = u.bool(), uie = u.bool(), die = u.bool(), pie = u.bool(), fie = u.bool(), mie = u.bool(), gie = u.bool(), hie = u.bool(), _ie = u.triBool(), yie = u.bool(), Sie = u.bool(), Eie = u.bool(), bie = u.triBool(), Cie = u.bool(), Aie = u.triBool(), Rie = u.int({ min: 1, digitsOnly: true }), Oie = u.int({ min: 0, digitsOnly: true }), Tie = u.bool(), wie = u.bool(), xie = u.bool(), vie = u.triBool(), kie = u.bool(), Pie = u.bool(), Iie = u.bool(), Die = u.bool(), Lie = u.bool(), Mie = u.bool(), Nie = u.bool(), Uie = u.bool(), Fie = u.triBool(), $ie = u.triBool(), zie = u.triBool(), Hie = u.bool(), jie = u.bool(), Bie = u.bool(), Kie = u.bool(), Gie = u.bool(), Wie = u.int({ min: 1 }), Vie = u.int({ min: 1 }), qie = u.int({ min: 0 }), Yie = u.int({ min: 1, max: 256, digitsOnly: true }), Zie = u.bool(), Jie = u.bool(), Xie = u.bool(), Qie = u.bool(), eae = u.bool(), tae = u.bool(), nae = u.bool(), rae = u.bool(), oae = u.bool(), sae = u.bool(), iae = u.bool(), aae = u.bool(), lae = u.bool(), cae = u.bool(), uae = u.bool(), dae = u.bool(), pae = u.bool(), fae = u.bool(), mae = u.bool(), gae = u.bool(), hae = u.bool(), _ae = u.bool(), yae = u.bool(), Sae = u.bool(), Eae = u.triBool(), bae = u.bool(), Cae = u.bool(), Aae = u.bool(), Rae = u.triBool(), Oae = u.triBool(), Tae = u.bool(), wae = u.bool(), xae = u.enum(tl), vae = u.enum(tl), kae = u.enum(["5m"]), Pae = u.bool(), Iae = u.bool(), Dae = u.str(), Lae = u.bool(), Mae = u.bool(), Nae = u.bool(), Uae = u.bool(), Fae = u.bool(), $ae = u.bool(), zae = u.bool(), Hae = u.bool(), jae = u.triBool(), Bae = u.str(), Kae = u.bool();
var Gae = u.str(), Wae = u.str(), Vae = u.str(), qae = u.str(), Yae = u.str(), Zae = u.str(), Jae = u.str(), Xae = u.str(), Qae = u.str(), ele = u.str(), tle = u.str(), nle = u.str(), rle = u.str(), ole = u.str(), sle = u.str(), ile = u.str(), ale = u.str(), lle = u.str(), cle = u.str(), ule = u.str(), dle = u.str(), ple = u.str(), fle = u.str(), mle = u.str(), gle = u.str(), hle = u.int({ min: 0, digitsOnly: true }), _le = u.int({ min: 0, digitsOnly: true }), yle = u.str(), Sle = u.str(), Ele = u.str(), ble = u.str(), Cle = u.str(), Ale = u.str(), Rle = u.str(), Ole = u.str(), Tle = u.str(), wle = u.str(), xle = u.str(), vle = u.str(), kle = u.str(), Ple = u.str(), Ile = u.str(), Dle = u.str(), Lle = u.str(), Mle = u.str(), Nle = u.str(), Ule = u.str(), Fle = u.str(), $le = u.str(), zle = u.str(), Hle = u.str(), jle = u.str(), Ble = u.str(), Kle = u.str(), Gle = u.str(), Wle = u.str(), Vle = u.str(), qle = u.str(), Yle = u.str(), Zle = u.str(), Jle = u.str(), Xle = u.str(), Qle = u.str(), ece = u.str(), tce = u.str(), nce = u.str(), rce = u.str(), oce = u.str(), sce = u.str(), ice = u.str(), ace = u.str(), lce = u.str(), cce = u.str(), uce = u.str(), dce = u.rawStr(), pce = u.rawStr(), fce = u.str(), mce = u.str(), gce = u.str(), hce = u.str(), _ce = u.str(), yce = u.str(), Sce = u.str(), Ece = u.str(), bce = u.str(), Cce = u.str(), Ace = u.str(), Rce = u.str(), Oce = u.str(), Tce = u.str(), wce = u.str(), xce = u.str(), vce = u.str(), kce = u.str(), Pce = u.str(), Ice = u.str(), Dce = u.str(), Lce = u.str(), Mce = u.str(), Nce = u.str(), Uce = u.str(), Fce = u.str(), $ce = u.str(), zce = u.str(), Hce = u.str(), jce = u.str(), Bce = u.str(), Kce = u.str(), Gce = u.str(), Wce = u.str(), Vce = u.str(), qce = u.str(), Yce = u.str(), Zce = u.str(), Jce = u.rawStr(), Xce = u.str(), Qce = u.str(), eue = u.str(), tue = u.str(), nue = u.str(), rue = u.str(), oue = u.str(), sue = u.str(), iue = u.str(), aue = u.str(), lue = u.str(), cue = u.str(), uue = u.str(), due = u.str(), pue = u.str(), fue = u.str(), mue = u.str(), gue = u.str(), hue = u.str(), _ue = u.str(), yue = u.str(), Sue = u.str(), Eue = u.str(), bue = u.rawStr(), Cue = u.str(), Aue = u.str(), Rue = u.str(), Oue = u.str(), Tue = u.str(), wue = u.str(), xue = u.str(), vue = u.str(), kue = u.str(), Pue = u.str(), Iue = u.str(), Due = u.str(), Lue = u.str(), Mue = u.str(), Nue = u.str(), Uue = u.str(), Fue = u.str(), $ue = u.str(), zue = u.str(), Hue = u.str(), jue = u.str(), Bue = u.str(), Kue = u.str(), Gue = u.str(), Wue = u.str(), Vue = u.str(), que = u.str(), Yue = u.str(), Zue = u.str(), Jue = u.str(), Xue = u.str(), Que = u.str(), ede = u.str(), tde = u.str(), nde = u.str(), rde = u.str(), ode = u.str(), sde = u.str(), ide = u.str(), ade = u.str(), lde = u.str(), cde = u.str(), ude = u.str(), dde = u.str(), pde = u.str(), fde = u.str(), mde = u.str(), gde = u.str(), hde = u.str(), _de = u.str(), yde = u.str(), Sde = u.str(), Ede = u.str(), bde = u.str(), Cde = u.str(), Ade = u.str(), Rde = u.str();
var Ode = u.str(), Tde = u.str(), wde = u.str(), xde = u.str(), vde = u.str(), kde = u.rawStr(), Pde = u.str(), Ide = u.str(), Dde = u.str(), Lde = u.str(), Mde = u.str(), Nde = u.str(), Ude = u.str(), Fde = u.str(), $de = u.str(), zde = u.str(), Hde = u.bool(), jde = u.str(), Bde = u.str(), Kde = u.str(), Gde = u.str(), Wde = u.str(), Vde = u.str(), qde = u.str(), Yde = u.bool(), Zde = u.str(), Jde = u.str(), Xde = u.str(), Qde = u.str(), epe = u.str(), tpe = u.str(), npe = u.str(), rpe = u.str(), ope = u.str(), spe = u.str(), ipe = u.str(), ape = u.str(), lpe = u.str(), cpe = u.str(), upe = u.str(), dpe = u.bool(), ppe = u.str(), fpe = u.str(), mpe = u.str(), gpe = u.str(), hpe = u.str(), _pe = u.str(), ype = u.str(), Spe = u.str(), Epe = u.str(), bpe = u.bool(), Cpe = u.str(), Ape = u.int({ min: 0 }), Rpe = u.bool(), Ope = u.str(), Tpe = u.str(), wpe = u.str(), xpe = u.str(), vpe = u.enum(["1", "spent"]), kpe = u.str(), Ppe = u.str(), Ipe = u.str(), Dpe = u.str(), Lpe = u.str(), Mpe = u.str(), Npe = u.str(), Upe = u.str(), Fpe = u.str(), $pe = u.str(), zpe = u.str(), Hpe = u.str(), jpe = u.bool(), hb = u.bool(), Bpe = u.bool(), Kpe = u.bool(), Gpe = u.bool(), Wpe = u.bool(), Vpe = u.bool(), qpe = u.bool(), Ype = u.bool(), Zpe = u.bool(), Jpe = u.str(), Xpe = u.str(), Qpe = u.str(), efe = u.str(), tfe = u.bool(), nfe = u.bool(), rfe = u.bool(), ofe = u.bool(), sfe = u.bool(), ife = u.bool(), afe = u.bool(), lfe = u.str(), cfe = u.str(), ufe = u.str(), dfe = u.str(), pfe = u.bool(), ffe = u.bool(), mfe = u.str(), gfe = u.int({ min: 0 }), hfe = u.int({ min: 0 }), _fe = u.str(), yfe = u.str(), Sfe = u.str(), Efe = u.str(), bfe = u.str(), Cfe = u.str(), Afe = u.int({ min: 1, wholeValue: true }), Rfe = u.str(), Ofe = u.str(), Tfe = u.str(), wfe = u.bool(), xfe = u.str(), vfe = u.str(), kfe = u.str(), Pfe = u.str(), Ife = u.str(), Dfe = u.str(), Lfe = u.str(), Mfe = u.str(), Nfe = u.str(), Ufe = u.str(), Ffe = u.bool(), $fe = u.bool(), zfe = u.str(), Hfe = u.str(), jfe = u.str(), Bfe = u.str(), Kfe = u.str(), Gfe = u.str(), Wfe = u.str(), Vfe = u.str(), qfe = u.str(), Yfe = u.str(), Zfe = u.str(), Jfe = u.str(), Xfe = u.str(), Qfe = u.str(), eme = u.str(), tme = u.str(), nme = u.str(), rme = u.str(), ome = u.str(), sme = u.str(), ime = u.str(), ame = u.enum(["claude_ai_chat"]), lme = u.str(), cme = u.str(), ume = u.str(), dme = u.str(), pme = u.bool(), fme = u.int({ min: 1, wholeValue: true }), mme = u.str(), gme = u.str(), hme = u.str(), _me = u.str(), yme = u.str(), Sme = u.str(), Eme = u.str(), bme = u.str(), Cme = u.str(), Ame = u.str(), Rme = u.str(), Ome = u.str(), Tme = u.str(), wme = u.str(), xme = u.str(), vme = u.str(), kme = u.str(), Pme = u.str(), Ime = u.str(), Dme = u.str(), Lme = u.str(), Mme = u.str(), Nme = u.str(), Ume = u.str(), Fme = u.str(), $me = u.str(), zme = u.str(), Hme = u.str(), jme = u.str(), Bme = u.str(), Kme = u.str(), Gme = u.str(), Wme = u.str(), Vme = u.str(), qme = u.str(), Yme = u.str(), Zme = u.str(), Jme = u.str(), Xme = u.str(), Qme = u.str(), ege = u.rawStr(), tge = u.str(), nge = u.str(), rge = u.str(), oge = u.str(), sge = u.str(), ige = u.str(), age = u.str(), lge = u.bool(), cge = u.bool(), uge = u.bool(), dge = u.str(), pge = u.str(), fge = u.str(), mge = u.bool(), gge = u.bool(), hge = u.bool(), _ge = u.bool(), yge = u.bool(), Sge = u.bool(), Ege = u.bool(), bge = u.bool(), Cge = u.bool(), Age = u.bool(), Rge = u.bool(), Oge = u.bool(), Tge = u.bool(), wge = u.bool(), xge = u.rawStr(), vge = u.bool(), kge = u.bool(), Pge = u.bool(), Ige = u.bool(), Dge = u.bool(), Lge = u.bool(), Mge = u.bool(), Nge = u.bool(), Uge = u.bool(), Fge = u.bool(), $ge = u.bool(), zge = u.bool(), Hge = u.bool(), jge = u.int({ min: 0 }), Bge = u.bool(), Kge = u.bool(), Gge = u.bool(), Wge = u.bool(), Vge = u.bool(), qge = u.bool(), Yge = u.bool(), Zge = u.triBool(), Jge = u.bool(), Xge = u.str(), Qge = u.bool(), ehe = u.bool(), the = u.bool(), nhe = u.bool(), rhe = u.bool(), ohe = u.bool(), she = u.triBool(), ihe = u.bool(), ahe = u.bool(), lhe = u.bool(), che = u.str(), uhe = u.bool(), dhe = u.str(), phe = u.int({ min: 1, max: 2147483647, wholeValue: true }), fhe = u.int({ min: 1, max: 100, digitsOnly: true }), mhe = u.bool(), ghe = u.str(), hhe = u.bool(), _he = u.bool(), yhe = u.bool(), She = u.bool(), Ehe = u.bool(), bhe = u.triBool(), Che = u.bool(), Ahe = u.str(), Rhe = u.str(), Ohe = u.bool(), The = u.int({ min: 1, max: 32, digitsOnly: true }), whe = u.int({ min: 1 }), xhe = u.int({ min: 0 }), vhe = u.bool(), khe = u.triBool(), Phe = u.bool(), Ihe = u.bool(), Dhe = u.bool(), Lhe = u.bool(), Mhe = u.bool(), Nhe = u.str(), Uhe = u.bool(), Fhe = u.rawStr(), $he = u.str(), zhe = u.str(), Hhe = u.bool(), jhe = u.rawStr(), Bhe = u.str(), Khe = u.str(), Ghe = u.str(), Whe = u.str(), Vhe = u.str(), qhe = u.bool(), Yhe = u.bool(), Zhe = u.bool(), Jhe = u.triBool(), Xhe = u.bool(), Qhe = u.bool(), e_e = u.int(), t_e = u.int(), n_e = u.int(), r_e = u.int({ min: 1, max: 2147483647, digitsOnly: true }), o_e = u.int(), s_e = u.int(), i_e = u.int(), a_e = u.int({ min: 1 }), l_e = u.int({ min: 0, max: 10080, digitsOnly: true }), c_e = u.int(), u_e = u.int(), d_e = u.int({ min: 1, digitsOnly: true }), p_e = u.int({ min: 1, digitsOnly: true }), f_e = u.int({ min: 1, digitsOnly: true }), m_e = u.int({ min: 0, digitsOnly: true }), g_e = u.int(), h_e = u.int(), __e = u.int(), y_e = u.int(), S_e = u.int(), E_e = u.int(), b_e = u.int(), C_e = u.int(), A_e = u.int({ min: 1 }), R_e = u.int(), O_e = u.int(), T_e = u.int(), w_e = u.int({ min: 1 }), x_e = u.int({ min: 1 }), v_e = u.int({ min: 0 }), k_e = u.int({ min: 0, max: 864e5 }), P_e = u.int(), I_e = u.int(), D_e = u.int({ min: 1e3, max: 6e4 }), L_e = u.int({ wholeValue: true }), M_e = u.int({ min: 0, digitsOnly: true }), N_e = u.int({ min: 0, digitsOnly: true }), U_e = u.bool(), F_e = u.int(), $_e = u.int({ min: 1 }), z_e = u.int({ min: 1 }), H_e = u.int({ min: 3 }), j_e = u.int({ min: 1, max: 2147483647, digitsOnly: true }), B_e = u.str(), K_e = u.int({ min: 1 }), G_e = u.int(), W_e = u.triBool(), V_e = u.int({ min: 1 }), q_e = u.int({ min: 1 }), Y_e = u.int({ min: 1 }), Z_e = u.int({ min: 1 }), J_e = u.str(), X_e = u.int({ min: 1 }), Q_e = u.int({ min: 1 }), eye = u.str(), tye = u.int(), nye = u.int({ min: 1 }), rye = u.int(), oye = u.int(), sye = u.int({ min: 1 }), iye = u.int({ min: 0 }), aye = u.str(), lye = u.int({ min: 0, digitsOnly: true }), cye = u.names(16), uye = u.bool(), dye = u.bool(), pye = u.bool(), fye = u.bool(), mye = u.int({ min: 1, digitsOnly: true }), gye = u.int({ min: 1 });
var hye = u.str(), _ye = u.str(), yye = u.str(), Sye = u.str(), Eye = u.str(), bye = u.str(), Cye = u.str(), Aye = u.str(), Rye = u.str(), Oye = u.str(), Tye = u.str(), wye = u.str(), xye = u.str(), vye = u.str(), kye = u.str(), Pye = u.str(), Iye = u.str(), Dye = u.str(), Lye = u.str(), Mye = u.str(), Nye = u.bool(), Uye = u.str(), Fye = u.str(), $ye = u.str(), zye = u.str(), Hye = u.bool(), jye = u.str(), Bye = u.str(), Kye = u.str(), Gye = u.str(), Wye = u.bool(), Vye = u.bool(), qye = u.bool(), Yye = u.bool(), Zye = u.str(), Jye = u.bool(), Xye = u.triBool(), Qye = u.bool(), eSe = u.bool(), tSe = u.bool(), nSe = u.bool(), rSe = u.bool(), oSe = u.str(), sSe = u.str(), iSe = u.str(), aSe = u.bool();
var lSe = u.str(), cSe = u.str(), uSe = u.str(), dSe = u.str(), pSe = u.str(), fSe = u.str(), mSe = u.str(), gSe = u.str(), hSe = u.str(), _Se = u.str(), ySe = u.str(), SSe = u.bool(), ESe = u.str(), bSe = u.str(), CSe = u.str(), ASe = u.str(), RSe = u.str(), OSe = u.str(), TSe = u.int(), wSe = u.int(), xSe = u.int(), vSe = u.int(), kSe = u.int({ min: 1, digitsOnly: true }), PSe = u.int({ min: 1, digitsOnly: true }), ISe = u.int({ min: 1 }), DSe = u.str(), LSe = u.int(), MSe = u.int(), NSe = u.int(), USe = u.int(), FSe = u.int({ min: 0, digitsOnly: true }), $Se = u.int({ min: 500, max: 32e3, digitsOnly: true }), zSe = u.int({ min: 32e3, max: 64e3, digitsOnly: true }), HSe = u.int(), jSe = u.triBool(), BSe = u.bool(), KSe = u.triBool(), GSe = u.triBool(), WSe = u.triBool(), VSe = u.triBool(), qSe = u.int({ min: 0, max: 9, digitsOnly: true }), YSe = u.int({ min: 0, max: 2, digitsOnly: true }), ZSe = u.int({ min: 0, max: 2, digitsOnly: true }), JSe = u.int({ min: 1, max: 2e3, digitsOnly: true }), XSe = u.int({ min: 1, max: 2e3, digitsOnly: true }), QSe = u.rawStr(), eEe = u.int({ min: 1 }), tEe = u.int({ min: 1 }), nEe = u.int({ min: 1 }), rEe = u.int({ min: 1 }), oEe = u.bool(), sEe = u.int({ min: 1, digitsOnly: true }), iEe = u.int({ min: 1, digitsOnly: true }), aEe = u.int({ min: 6e4, max: 108e5, digitsOnly: true }), lEe = u.enum(["capacity"]), cEe = u.bool(), uEe = u.bool(), dEe = u.bool(), pEe = u.int(), fEe = u.int({ min: 0 });
var LD = ["us", "eu", "apac", "jp", "au", "global"];
var mEe = u.bool(), gEe = u.bool(), hEe = u.bool(), _Ee = u.bool(), yEe = u.bool(), SEe = u.bool(), EEe = u.str(), bEe = u.triBool(), CEe = u.str(), AEe = u.str(), REe = u.enum(LD), OEe = u.str(), TEe = u.str(), wEe = u.str(), xEe = u.str(), vEe = u.str(), kEe = u.str(), PEe = u.str(), IEe = u.str(), DEe = u.str(), LEe = u.str(), MEe = u.str(), NEe = u.str(), UEe = u.str(), FEe = u.str(), $Ee = u.str(), zEe = u.str(), HEe = u.str(), jEe = u.str(), BEe = u.str(), KEe = u.str(), GEe = u.str(), WEe = u.str(), VEe = u.str(), qEe = u.str(), YEe = u.str(), ZEe = u.str(), JEe = u.str(), XEe = u.str(), QEe = u.bool(), ebe = u.bool(), tbe = u.bool(), nbe = u.bool(), rbe = u.bool(), obe = u.bool(), sbe = u.bool(), ibe = u.str(), abe = u.int({ min: 1, max: 2147e6, digitsOnly: true }), lbe = u.bool(), cbe = u.int({ min: 1, max: 2147483647, digitsOnly: true }), ube = u.str(), dbe = u.int(), pbe = u.bool(), fbe = u.bool(), mbe = u.bool(), gbe = u.str(), hbe = u.str(), _be = u.str(), ybe = u.str(), Sbe = u.bool(), Ebe = u.bool(), bbe = u.bool(), Cbe = u.str(), Abe = u.rawStr(), Rbe = u.rawStr(), Obe = u.rawStr(), Tbe = u.bool(), wbe = u.str(), xbe = u.bool(), vbe = u.bool(), kbe = u.str(), Pbe = u.bool(), Ibe = u.bool(), Dbe = u.enum(["enforce", "observe", "off"]), Lbe = u.str(), Mbe = u.bool();
var Ube = { ...tb, ...Eb, ...yb, ...mb, ...Sb, ...gb, ...nb, ..._b }, Fbe = /* @__PURE__ */ new WeakMap(), $be = "CLAUDE_CODE_LAZY_ENV_GETTERS";
function bb(e10, t, n = hb.parse(process.env[$be]) === true) {
  let r = n ? zbe(e10, t) : Object.create(t);
  for (let [o, s] of n ? [] : Object.entries(e10)) Object.defineProperty(r, o, { get: MD(o, s, r), enumerable: true, configurable: true });
  return Fbe.set(r, n ? e10 : null), Object.defineProperties(r, { set: { value: (o, s) => {
    process.env[o] = YI(s);
  } }, unset: { value: (o) => {
    delete process.env[o];
  } } }), r;
}
function MD(e10, t, n) {
  let r = n, o;
  return () => {
    let s = process.env[e10];
    if (s !== r) o = t.parse(s), r = s;
    return o;
  };
}
function am(e10, t) {
  return typeof t === "string" && Object.hasOwn(e10, t);
}
function zbe(e10, t) {
  let n = new Proxy(Object.create(t && Object.getPrototypeOf(t)), { get: (i, a, l) => {
    if (!am(e10, a)) return Reflect.get(i, a, l);
    let c = MD(a, e10[a], s);
    if (l === s) Object.defineProperty(s, a, { get: c, configurable: true });
    return c();
  }, set: (i, a, l, c) => !am(e10, a) && Reflect.set(i, a, l, c), has: (i, a) => am(e10, a) || Reflect.has(i, a) }), r = Object.create(n), o = t === null ? {} : Object.getOwnPropertyDescriptors(t);
  for (let [i, a] of Object.entries(o)) {
    if (am(e10, i)) continue;
    Object.defineProperty(r, i, typeof a.value === "function" ? { ...a, value: { [i](...l) {
      return Reflect.apply(Reflect.get(t, i), this, l);
    } }[i] } : a);
  }
  let s = Object.create(r);
  return s;
}
var Pt = bb(Ube, ku), Hbe = {};
bb(Hbe, null);
var jbe = {};
bb(jbe, null);
var Kbe = /^(?:\s*<[a-z][\w-]*[\s>]|\[Request interrupted by user[^\]]*\])/, Gbe = /<command-name>(.*?)<\/command-name>/;
function Bi(e10, t) {
  if (e10.type !== "user") return;
  if (e10.isMeta === true || e10.isCompactSummary === true) return;
  let n = e10.message;
  if (!n) return;
  let r = n.content, o = [];
  if (typeof r === "string") o.push(r);
  else if (Array.isArray(r)) for (let s of r) {
    if (!s || typeof s !== "object") continue;
    if (s.type === "tool_result") return;
    if (s.type === "text" && typeof s.text === "string") o.push(s.text);
  }
  for (let s of o) {
    let i = pb(s).replaceAll(`
`, " ").trim();
    if (!i) continue;
    let a = Gbe.exec(i);
    if (a) {
      if (!t.commandFallback) t.commandFallback = a[1];
      continue;
    }
    let l = /<bash-input>([\s\S]*?)<\/bash-input>/.exec(i);
    if (l) return `! ${l[1].trim()}`;
    if (Kbe.test(i)) continue;
    if (i.length > 200) i = As(i, 200).trim() + "…";
    return i;
  }
  return;
}
function FD(e10, t) {
  if (process.platform !== "darwin" || Boolean(t.DEVELOPER_DIR)) return false;
  try {
    return (e10.includes("/") ? e10 : (t.PATH ?? "").split(":").filter((r) => pn.isAbsolute(r)).map((r) => pn.join(r, e10)).find((r) => un$1.existsSync(r))) === "/usr/bin/git" && un$1.statSync("/Library/Developer/CommandLineTools", { throwIfNoEntry: false }) === void 0 && un$1.lstatSync("/var/db/xcode_select_link", { throwIfNoEntry: false }) === void 0 && !un$1.readdirSync("/Applications").some((r) => /^Xcode.*\.app$/i.test(r));
  } catch {
    return false;
  }
}
function tCe() {
  return process.platform === "win32";
}
class zD {
  resolved = /* @__PURE__ */ new Map();
  lookup(e10) {
    return this.resolved.get(e10);
  }
  remember(e10, t) {
    this.resolved.set(e10, t);
  }
  forget(e10) {
    this.resolved.delete(e10);
  }
}
var nCe = new xe(() => new zD()), rCe = 5e3;
function $D(e10) {
  try {
    return un$1.lstatSync(e10, { throwIfNoEntry: false }) === void 0;
  } catch {
    return false;
  }
}
var oCe = /* @__PURE__ */ new Set([".com", ".exe", ".bat", ".cmd"]);
function sCe(e10) {
  let t = e10.toLowerCase().replace(/.*[\\/]/, "").replace(/[. ]+$/, ""), n = t.lastIndexOf(".");
  return n > 0 && oCe.has(t.slice(n));
}
function iCe(e10, t = false) {
  let n = nCe.of(Jt().host), r = n.lookup(e10);
  if (r !== void 0) if (r !== null) {
    if (!$D(r)) return r;
    n.forget(e10);
  } else {
    if (!t) return r;
    n.forget(e10);
  }
  let o = Nf("SYSTEMROOT") || "C:\\Windows", s = pn.join(o, "System32", "where.exe");
  try {
    let a = require$$0.execFileSync(s, [e10], { stdio: "pipe", encoding: "utf8", timeout: rCe, windowsHide: true, env: process.env }).trim().split(/\r?\n/).filter(Boolean), l = process.cwd(), c = false;
    for (let d of a) {
      if ($D(d)) continue;
      if (vf(d, l)) {
        c = true;
        continue;
      }
      if (!sCe(d)) continue;
      return n.remember(e10, d), d;
    }
    if (a.length > 0 && !c) n.remember(e10, null);
    return null;
  } catch (i) {
    if (aCe(i)) n.remember(e10, null);
    return null;
  }
}
function aCe(e10) {
  if (e10 === null || typeof e10 !== "object") return false;
  let t = "status" in e10 ? e10.status : void 0, n = "signal" in e10 ? e10.signal : void 0, r = "code" in e10 ? e10.code : void 0;
  return t === 1 && !n && !r;
}
function HD(e10, t = false) {
  if (!tCe()) return e10;
  if (e10.includes("/") || e10.includes("\\")) return e10;
  return iCe(e10, t);
}
var uCe = require$$2.promisify(require$$0.execFile);
async function Lo(e10) {
  let t = HD("git");
  if (t === null || FD(t, process.env)) return [];
  try {
    let { stdout: n } = await uCe(t, ["-c", "core.hooksPath=/dev/null", "-c", "core.fsmonitor=", "worktree", "list", "--porcelain"], { cwd: e10, timeout: 5e3, windowsHide: true });
    if (!n) return [];
    return n.split(`
`).filter((r) => r.startsWith("worktree ")).map((r) => Ye(r.slice(9)));
  } catch {
    return [];
  }
}
var En = 65536;
var _Ce = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
function Ve(e10) {
  if (typeof e10 !== "string") return null;
  return _Ce.test(e10) ? e10 : null;
}
function eL(e10) {
  if (!e10.includes("\\")) return e10;
  try {
    return JSON.parse(`"${e10}"`);
  } catch {
    return e10;
  }
}
function nl(e10, t) {
  let n = [`"${t}":"`, `"${t}": "`];
  for (let r of n) {
    let o = e10.indexOf(r);
    if (o < 0) continue;
    let s = o + r.length, i = s;
    while (i < e10.length) {
      if (e10[i] === "\\") {
        i += 2;
        continue;
      }
      if (e10[i] === '"') return eL(e10.slice(s, i));
      i++;
    }
  }
  return;
}
function Qt(e10, t) {
  let n = [`"${t}":"`, `"${t}": "`], r, o = -1;
  for (let s of n) {
    let i = 0;
    while (true) {
      let a = e10.indexOf(s, i);
      if (a < 0) break;
      let l = a + s.length, c = l;
      while (c < e10.length) {
        if (e10[c] === "\\") {
          c += 2;
          continue;
        }
        if (e10[c] === '"') {
          if (a > o) r = eL(e10.slice(l, c)), o = a;
          break;
        }
        c++;
      }
      i = c + 1;
    }
  }
  return r;
}
function dm(e10, t, n) {
  return yCe(e10, n, t);
}
function yCe(e10, t, n) {
  let r = `"type":"${n}"`, o = `"${t}":`, s = e10.length;
  while (s > 0) {
    let i = e10.lastIndexOf(`
`, s - 1), a = e10.slice(i + 1, s);
    if (s = i, a.includes(o) && (r === void 0 || a.includes(r))) try {
      let l = JSON.parse(a);
      if (typeof l === "object" && l !== null && (n === void 0 || l.type === n)) {
        let c = l[t];
        if (typeof c === "string") return c;
      }
    } catch {
    }
    if (i < 0) break;
  }
  return;
}
function Ab(e10, t) {
  let n = `"${t}":`, r = 0;
  while (r < e10.length) {
    let o = e10.indexOf(`
`, r), s = o < 0 ? e10.slice(r) : e10.slice(r, o);
    if (r = o < 0 ? e10.length : o + 1, s.includes(n)) try {
      let i = JSON.parse(s);
      if (typeof i === "object" && i !== null) {
        let a = i[t];
        if (typeof a === "string") return a;
      }
    } catch {
    }
  }
  return;
}
function pm(e10, t) {
  return e10?.realWorkspacePath === void 0 ? void 0 : { hoverRestOn: t, realPath: e10.realWorkspacePath };
}
function fm(e10) {
  let t = 0, n = { commandFallback: "" };
  while (t < e10.length) {
    let r = e10.indexOf(`
`, t), o = r >= 0 ? e10.slice(t, r) : e10.slice(t);
    if (t = r >= 0 ? r + 1 : e10.length, !o.includes('"type":"user"') && !o.includes('"type": "user"')) continue;
    if (o.includes('"tool_result"')) continue;
    if (o.includes('"isMeta":true') || o.includes('"isMeta": true')) continue;
    if (o.includes('"isCompactSummary":true') || o.includes('"isCompactSummary": true')) continue;
    try {
      let s = JSON.parse(o), i = Bi(s, n);
      if (i !== void 0) return i;
    } catch {
      continue;
    }
  }
  return n.commandFallback;
}
function tL(e10) {
  let t = 0;
  while (t < e10.length) {
    let n = e10.indexOf(`
`, t), r = n >= 0 ? e10.slice(t, n) : e10.slice(t);
    if (t = n >= 0 ? n + 1 : e10.length, !r.includes('"type":"user"') && !r.includes('"type": "user"')) continue;
    if (r.includes('"tool_result"')) continue;
    if (r.includes('"isMeta":true') || r.includes('"isMeta": true')) continue;
    if (r.includes('"type":"image"') || r.includes('"type": "image"')) return "Image";
    if (r.includes('"type":"document"') || r.includes('"type": "document"')) return "Document";
  }
  return "";
}
var BD = process.platform === "win32" ? un$1.constants.O_RDONLY : un$1.constants.O_RDONLY | un$1.constants.O_NOFOLLOW | un$1.constants.O_NONBLOCK;
async function bCe(e10) {
  let { backend: t, key: n } = e10;
  try {
    let r = await t.read([{ key: n, offset: 0, length: En }, { key: n, tail: En }]);
    if (!r.ok) return null;
    let [o, s] = r.value.items;
    if (!o.found || o.value.length === 0) return null;
    let i = KD(o.value), a = s.found && s.value.length > 0 ? KD(s.value) : i;
    return { head: i, tail: a, mtimeMs: o.mtimeMs, totalBytes: o.totalBytes };
  } catch {
    return null;
  }
}
function KD(e10) {
  return Buffer.from(e10.buffer, e10.byteOffset, e10.byteLength).toString("utf8");
}
Buffer.from('"type":"user"');
Buffer.from('"type":"assistant"');
async function Gi(e10, t) {
  if (t !== void 0 && t.hoverRestOn) return oL(t.source);
  try {
    if (BD === un$1.constants.O_RDONLY) {
      if (!(await promises.lstat(e10)).isFile()) return null;
    }
    let n = await promises.open(e10, BD);
    try {
      let r = await n.stat();
      if (!r.isFile()) return null;
      let o = Buffer.allocUnsafe(En), s = await n.read(o, 0, En, 0);
      if (s.bytesRead === 0) return null;
      let i = o.toString("utf8", 0, s.bytesRead), a = Math.max(0, r.size - En), l = i;
      if (a > 0) {
        let c = await n.read(o, 0, En, a);
        l = o.toString("utf8", 0, c.bytesRead);
      }
      return { mtime: r.mtime.getTime(), size: r.size, head: i, tail: l };
    } finally {
      await n.close();
    }
  } catch {
    return null;
  }
}
async function oL(e10) {
  let t = await bCe(e10);
  if (t === null) return null;
  return { mtime: Math.trunc(t.mtimeMs), size: t.totalBytes, head: t.head, tail: t.tail };
}
var Mo = 200;
function CCe(e10) {
  return Math.abs(db(e10)).toString(36);
}
function rl(e10) {
  return e10.replace(/[^a-zA-Z0-9]/g, "-");
}
function Nu(e10) {
  let t = rl(e10);
  if (t.length <= Mo) return t;
  return `${t.slice(0, Mo)}-${CCe(e10)}`;
}
function St() {
  return pn.join(Mt(), "projects");
}
function qr(e10) {
  return TP() ?? Nu(e10);
}
function Tb(e10) {
  let t = Nu(e10);
  return t === qr(e10) ? void 0 : t;
}
function ol(e10, t = St()) {
  return pn.join(t, qr(e10));
}
async function No(e10, t) {
  try {
    if (t !== void 0 && t.hoverRestOn) {
      let n = await t.realPath(e10);
      return Ye(n.ok && n.value.found ? n.value.path : e10);
    }
    return Ye(await promises.realpath(e10));
  } catch {
    return Ye(e10);
  }
}
function wb(e10, t) {
  if (process.platform !== "win32") return [t];
  let n = /^([A-Za-z]):[\\/]+(.*)$/s.exec(e10);
  if (n === null) return [t];
  let [, r = "", o = ""] = n, s = o.replace(/[\\/]+$/, ""), i = s === "" ? [] : s.split(/[\\/]+/), a = t.replace(/[\\/]+$/, "").split(/[\\/]+/), l = a.length - i.length, c = (d, p) => d !== void 0 && p !== void 0 && d.length === p.length && d.toLowerCase() === p.toLowerCase();
  if (l < 1 || !i.every((d, p) => c(d, a[l + p])) || l === 1 && c(a[0], `${r}:`)) return [t];
  return [t, `${r}:\\${i.join("\\")}`];
}
async function sl(e10, t, n, r) {
  if (Qe()) return false;
  let i = rl(t), a;
  try {
    a = await promises.readdir(e10, { withFileTypes: true });
  } catch {
    return false;
  }
  for (let l of a) {
    if (!l.isFile() || !l.name.endsWith(".jsonl")) continue;
    let c = await Gi(pn.join(e10, l.name));
    if (c === null) continue;
    if (aL(c, i, n)) return true;
  }
  return false;
}
function aL(e10, t, n) {
  let r = dm(e10.tail, "relocated", "relocatedCwd") ?? Ab(e10.head, "cwd");
  if (r === void 0) return false;
  let o = rl(Ye(r));
  return n ? o.toLowerCase() === t.toLowerCase() : o === t;
}
async function qn(e10, t, n = St()) {
  if (Qe()) return [];
  let r = ol(e10, n), o = [];
  try {
    await promises.readdir(r), o.push(r);
  } catch {
  }
  let s = Tb(e10);
  if (s !== void 0) {
    let p = pn.join(n, s);
    try {
      await promises.readdir(p), o.push(p);
    } catch {
    }
    return o;
  }
  let i = Nu(e10);
  if (i.length <= Mo) return o;
  let a = process.platform === "win32", l = (p) => a ? p.toLowerCase() : p, c = l(i.slice(0, Mo) + "-"), d = l(r);
  try {
    for (let p of await promises.readdir(n, { withFileTypes: true })) {
      if (!p.isDirectory() || !l(p.name).startsWith(c)) continue;
      let f = pn.join(n, p.name);
      if (l(f) !== d && await sl(f, e10, a)) o.push(f);
    }
  } catch {
  }
  return o;
}
async function OCe(e10, t, n = St()) {
  let r = [];
  for (let o of await Lo(e10)) {
    if (o === e10) continue;
    let s = await qn(o, t, n);
    for (let i of s) r.push({ worktreePath: o, projectDir: i });
  }
  return r;
}
async function xs(e10, t, n, r, o = St()) {
  let s = `${e10}.jsonl`, a = void 0;
  async function l(d, p) {
    let f = pn.join(d, s);
    try {
      let m = await promises.stat(f);
      if (m.size > 0) return { filePath: f, projectPath: p, fileSize: m.size };
    } catch {
    }
    return;
  }
  if (t) {
    let d = await No(t, pm(n, r)), p = /* @__PURE__ */ new Set();
    for (let f of wb(t, d)) for (let m of await qn(f, a, o)) {
      let g = process.platform === "win32" ? m.toLowerCase() : m;
      if (p.has(g)) continue;
      p.add(g);
      let _ = await l(m, f);
      if (_) return _;
    }
    for (let { worktreePath: f, projectDir: m } of await OCe(d, a, o)) {
      let g = await l(m, f);
      if (g) return g;
    }
    return;
  }
  let c;
  try {
    c = await promises.readdir(o);
  } catch {
    return;
  }
  for (let d of c) {
    let p = await l(pn.join(o, d), void 0);
    if (p) return p;
  }
  return;
}
Buffer.from('"compact_boundary"');
Buffer.from('{"type":"attribution-snapshot"');
Buffer.from('{"type":"system"');
var Lu = 10;
Buffer.from([Lu]);
function Fu(e10) {
  let t = Object.values(e10).filter((r) => typeof r === "number");
  return Object.entries(e10).filter(([r, o]) => t.indexOf(+r) === -1).map(([r, o]) => o);
}
function Pb(e10, t = "|") {
  return e10.map((n) => Db(n)).join(t);
}
function $u(e10, t) {
  if (typeof t === "bigint") return t.toString();
  return t;
}
class SL {
  constructor(e10) {
    this._getter = e10, this._value = void 0;
  }
  get value() {
    let e10 = this._getter;
    if (e10 !== void 0) this._value = e10(), this._getter = void 0;
    return this._value;
  }
}
function zu(e10) {
  return new SL(e10);
}
function EL(e10) {
  return e10 === null || e10 === void 0;
}
function Hu(e10) {
  let t = e10.startsWith("^") ? 1 : 0, n = e10.endsWith("$") ? e10.length - 1 : e10.length;
  return e10.slice(t, n);
}
function bL(e10, t) {
  let n = e10 / t, r = Math.round(n), o = 4 * Number.EPSILON * Math.max(Math.abs(n), 1);
  if (Math.abs(n - r) < o) return 0;
  return n - r;
}
var _L = /* @__PURE__ */ Symbol("evaluating");
function ju(e10, t, n) {
  let r = void 0;
  Object.defineProperty(e10, t, { get() {
    if (r === _L) return;
    if (r === void 0) r = _L, r = n();
    return r;
  }, set(o) {
    Object.defineProperty(e10, t, { value: o });
  }, configurable: true });
}
function Ln(e10, t, n) {
  Object.defineProperty(e10, t, { value: n, writable: true, enumerable: true, configurable: true });
}
function Bu(e10) {
  let t = Object.getOwnPropertyDescriptor(e10, "shape");
  return t?.get ? t.get.raw : t?.value;
}
function Uo(e10) {
  return Bu(e10._zod.def) ?? e10._zod.def.shape;
}
function CL(e10, t, n) {
  Object.defineProperty(e10, t, { get() {
    let r = n();
    return Ln(this, t, r), r;
  }, enumerable: true, configurable: true });
}
function AL(e10, t, n) {
  if (t in e10) Ln(e10, t, n);
  else e10[t] = n;
}
function Vi(e10, t, n, r) {
  let o = Uo(t);
  for (let s of n) {
    let i = Object.getOwnPropertyDescriptor(o, s);
    if (!i.enumerable) continue;
    if (i.get) CL(e10, s, () => {
      let a = t._zod.def.shape[s];
      return r ? r(a, s) : a;
    });
    else AL(e10, s, r ? r(i.value, s) : i.value);
  }
}
function LCe(e10, t) {
  for (let n of Reflect.ownKeys(t)) {
    let r = Object.getOwnPropertyDescriptor(t, n);
    if (!r.enumerable) continue;
    if (r.get) CL(e10, n, () => t[n]);
    else AL(e10, n, r.value);
  }
}
function Mn(...e10) {
  let t = {};
  for (let n of e10) {
    let r = Object.getOwnPropertyDescriptors(n);
    Object.assign(t, r);
  }
  return Object.defineProperties({}, t);
}
function RL(e10) {
  return JSON.stringify(e10);
}
function OL(e10) {
  return e10.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-").replace(/^-+|-+$/g, "");
}
var Ib = "captureStackTrace" in Error ? Error.captureStackTrace : (...e10) => {
};
function al(e10) {
  return typeof e10 === "object" && e10 !== null && !Array.isArray(e10);
}
var TL = zu(() => {
  if (Cn.jitless) return false;
  if (typeof navigator < "u" && navigator?.userAgent?.includes("Cloudflare")) return false;
  try {
    return new Function(""), true;
  } catch (e10) {
    return false;
  }
});
function qi(e10) {
  if (al(e10) === false) return false;
  let t = e10.constructor;
  if (t === void 0) return true;
  if (typeof t !== "function") return true;
  let n = t.prototype;
  if (al(n) === false) return false;
  if (Object.prototype.hasOwnProperty.call(n, "isPrototypeOf") === false) return false;
  return true;
}
function gm(e10) {
  if (qi(e10)) return { ...e10 };
  if (Array.isArray(e10)) return [...e10];
  if (e10 instanceof Map) return new Map(e10);
  if (e10 instanceof Set) return new Set(e10);
  return e10;
}
var wL = /* @__PURE__ */ new Set(["string", "number", "symbol"]);
function ks(e10) {
  return e10.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function Nn(e10, t, n) {
  let r = new e10._zod.constr(t ?? e10._zod.def);
  if (!t || n?.parent) r._zod.parent = e10;
  return r;
}
function ne(e10) {
  let t = e10;
  if (!t) return {};
  if (typeof t === "string") return { error: () => t };
  if (t?.message !== void 0) {
    if (t?.error !== void 0) throw Error("Cannot specify both `message` and `error` params");
    t.error = t.message;
  }
  if (delete t.message, typeof t.error === "string") return { ...t, error: () => t.error };
  return t;
}
function Db(e10) {
  if (typeof e10 === "bigint") return e10.toString() + "n";
  if (typeof e10 === "string") return `"${e10}"`;
  return `${e10}`;
}
function xL(e10) {
  return Object.keys(e10).filter((t) => e10[t]._zod.optin !== void 0 && e10[t]._zod.optout === "optional");
}
var hm = (() => ({ safeint: [Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER], int32: [-2147483648, 2147483647], uint32: [0, 4294967295], float32: [-34028234663852886e22, 34028234663852886e22], float64: [-Number.MAX_VALUE, Number.MAX_VALUE] }))(), Lb = { int64: [BigInt("-9223372036854775808"), BigInt("9223372036854775807")], uint64: [BigInt(0), BigInt("18446744073709551615")] };
function vL(e10, t) {
  let n = e10._zod.def, r = n.checks;
  if (r && r.length > 0) throw Error(".pick() cannot be used on object schemas containing refinements");
  let s = {};
  return Vi(s, e10, _m(e10, t)), Nn(e10, Mn(n, { shape: s, checks: [] }));
}
function _m(e10, t) {
  let n = Uo(e10), r = [];
  for (let o of Reflect.ownKeys(t)) {
    if (!Object.getOwnPropertyDescriptor(n, o)?.enumerable) throw Error(`Unrecognized key: "${String(o)}"`);
    if (t[o]) r.push(o);
  }
  return r;
}
function kL(e10, t) {
  let n = e10._zod.def, r = n.checks;
  if (r && r.length > 0) throw Error(".omit() cannot be used on object schemas containing refinements");
  let s = new Set(_m(e10, t)), i = {};
  return Vi(i, e10, Reflect.ownKeys(Uo(e10)).filter((a) => !s.has(a))), Nn(e10, Mn(n, { shape: i, checks: [] }));
}
function PL(e10, t) {
  if (!qi(t)) throw Error("Invalid input to extend: expected a plain object");
  let n = e10._zod.def.checks;
  if (n && n.length > 0) {
    let o = Uo(e10);
    for (let s of Reflect.ownKeys(t)) if (Object.getOwnPropertyDescriptor(o, s) !== void 0) throw Error("Cannot overwrite keys on object schemas containing refinements. Use `.safeExtend()` instead.");
  }
  return Nn(e10, Mn(e10._zod.def, { shape: IL(e10, t) }));
}
function IL(e10, t) {
  let n = {};
  return Vi(n, e10, Reflect.ownKeys(Uo(e10))), LCe(n, t), n;
}
function DL(e10, t) {
  if (!qi(t)) throw Error("Invalid input to safeExtend: expected a plain object");
  return Nn(e10, Mn(e10._zod.def, { shape: IL(e10, t) }));
}
function LL(e10, t) {
  if (!t?._zod?.def) throw Error("Invalid input to merge: expected an object schema. To merge a plain shape, use `.extend()`.");
  if (e10._zod.def.checks?.length) throw Error(".merge() cannot be used on object schemas containing refinements. Use .safeExtend() instead.");
  let n = {};
  Vi(n, e10, Reflect.ownKeys(Uo(e10))), Vi(n, t, Reflect.ownKeys(Uo(t)));
  let r = Mn(e10._zod.def, { shape: n, get catchall() {
    return t._zod.def.catchall;
  }, checks: t._zod.def.checks ?? [] });
  return Nn(e10, r);
}
function Mb(e10, t, n, r = "partial") {
  let s = t._zod.def.checks;
  if (s && s.length > 0) throw Error(`.${r}() cannot be used on object schemas containing refinements`);
  let a = n ? new Set(_m(t, n)) : void 0, l = {};
  return Vi(l, t, Reflect.ownKeys(Uo(t)), e10 && ((c, d) => a && !a.has(d) ? c : new e10({ type: "optional", innerType: c }))), Nn(t, Mn(t._zod.def, { shape: l, checks: [] }));
}
function ML(e10, t, n) {
  let r = n ? new Set(_m(t, n)) : void 0, o = {};
  return Vi(o, t, Reflect.ownKeys(Uo(t)), (s, i) => r && !r.has(i) ? s : new e10({ type: "nonoptional", innerType: s })), Nn(t, Mn(t._zod.def, { shape: o }));
}
function Yr(e10, t = 0) {
  if (e10.aborted === true) return true;
  for (let n = t; n < e10.issues.length; n++) if (e10.issues[n]?.continue !== true) return true;
  return false;
}
function NL(e10, t = 0) {
  if (e10.aborted === true) return true;
  for (let n = t; n < e10.issues.length; n++) if (e10.issues[n]?.continue === false) return true;
  return false;
}
function Fo(e10, t) {
  return t.map((n) => {
    var r;
    return (r = n).path ?? (r.path = []), n.path.unshift(e10), n;
  });
}
function Uu(e10) {
  return typeof e10 === "string" ? e10 : e10?.message;
}
function Nb(e10, t, n) {
  var r;
  for (let o = t; o < e10.length; o++) (r = e10[o]).schema ?? (r.schema = n);
}
function Zr(e10, t, n) {
  var r;
  let o = e10.inst?._zod?.traits;
  if (o?.has("$ZodType")) if (o.has("$ZodCheck")) (r = e10).schema ?? (r.schema = e10.inst);
  else e10.schema = e10.inst;
  let s = e10.schema !== e10.inst ? e10.schema?._zod.def?.error : void 0, i = e10.message ? e10.message : Uu(e10.inst?._zod.def?.error?.(e10)) ?? Uu(s?.(e10)) ?? Uu(t?.error?.(e10)) ?? Uu(n.customError?.(e10)) ?? Uu(n.localeError?.(e10)) ?? "Invalid input", a = {};
  for (let l of Object.keys(e10)) {
    if (l === "inst" || l === "schema" || l === "continue" || l === "input" || l === "__proto__") continue;
    a[l] = e10[l];
  }
  if (a.path ?? (a.path = []), a.message = i, t?.reportInput) a.input = e10.input;
  return a;
}
var MCe = /[\uD800-\uDBFF]/;
function ym(e10) {
  let t = e10.length;
  if (!MCe.test(e10)) return t;
  let n = t;
  for (let r = 0; r < t - 1; r++) if ((e10.charCodeAt(r) & 64512) === 55296 && (e10.charCodeAt(r + 1) & 64512) === 56320) n--, r++;
  return n;
}
function Sm(e10) {
  if (Array.isArray(e10)) return "array";
  if (typeof e10 === "string") return "string";
  return "unknown";
}
function UL(e10) {
  let t = typeof e10;
  switch (t) {
    case "number":
      return Number.isNaN(e10) ? "nan" : "number";
    case "object": {
      if (e10 === null) return "null";
      if (Array.isArray(e10)) return "array";
      let n = e10;
      if (n && Object.getPrototypeOf(n) !== Object.prototype && "constructor" in n && n.constructor) return n.constructor.name;
    }
  }
  return t;
}
function Yi(...e10) {
  let [t, n, r] = e10;
  if (typeof t === "string") return { message: t, code: "custom", input: n, inst: r };
  return { ...t };
}
function FL(e10, t) {
  for (let n in t) {
    let r = Object.getOwnPropertyDescriptor(t, n);
    if (r.get) Object.defineProperty(e10, n, { ...r, enumerable: false });
    else yL(e10, n, r.value);
  }
  for (let n of Object.getOwnPropertySymbols(t)) yL(e10, n, t[n]);
}
function Ir(e10, t, n, r = true) {
  return Object.defineProperty(e10, t, { configurable: true, writable: true, enumerable: r, value: n }), n;
}
function Ub(e10, t, n) {
  return Ir(e10, t, n, false);
}
function $L(e10, t) {
  for (let n in e10) {
    let r = e10[n];
    Object.defineProperty(t, n, { configurable: true, enumerable: true, get() {
      return Ir(this, n, r(this));
    }, set(o) {
      Ir(this, n, o);
    } });
  }
  return t;
}
function yL(e10, t, n) {
  Object.defineProperty(e10, t, { configurable: true, get() {
    return this == null ? n : Ir(this, t, n.bind(this));
  }, set(r) {
    Ir(this, t, r);
  } });
}
function NCe(e10, t) {
  let n = Object.getPrototypeOf(e10);
  return t in n ? void 0 : n;
}
var kb, vs = false, UCe = { configurable: true, get() {
  vs = true;
  return;
} };
function Me(e10, t, n) {
  let r = Object.getPrototypeOf(e10._zod);
  if (t in r && kb !== e10._zod) {
    kb = void 0;
    return;
  }
  kb = e10._zod, Object.defineProperty(r, t, { configurable: true, get() {
    Object.defineProperty(this, t, UCe);
    let o = vs;
    vs = false;
    try {
      let s = n(this);
      if (vs) delete this[t];
      else Object.defineProperty(this, t, { configurable: true, writable: true, value: s });
      return vs = vs || o, s;
    } catch (s) {
      throw delete this[t], vs = vs || o, s;
    }
  }, set(o) {
    Object.defineProperty(this, t, { configurable: true, writable: true, value: o });
  } });
}
function Fb(e10, t, n, r) {
  let o = NCe(e10, t);
  if (!o) return;
  Object.defineProperty(o, t, { configurable: true, get() {
    let s = { configurable: true, writable: true, enumerable: r, value: void 0 };
    return Object.defineProperty(this, t, s), s.value = n(this), Object.defineProperty(this, t, s), s.value;
  }, set(s) {
    Object.defineProperty(this, t, { configurable: true, writable: true, enumerable: r, value: s });
  } });
}
var FCe = "~constantCatch";
function zL(e10) {
  let t = () => e10;
  return t[FCe] = true, t;
}
var HL;
var $b = { value: void 0, enumerable: false }, jL = "captureStackTrace" in Error ? Error : null;
function $Ce(e10) {
  let t = jL;
  if (t) {
    let n = t.stackTraceLimit;
    if (typeof n === "number") {
      try {
        t.stackTraceLimit = 0;
      } catch {
        return jL = null, new e10();
      }
      try {
        return new e10();
      } finally {
        t.stackTraceLimit = n;
      }
    }
  }
  return new e10();
}
function I(e10, t, n, r) {
  let o = {};
  function s(f) {
    this.def = f, this.constr = p, this.traits = /* @__PURE__ */ new Set();
  }
  s.prototype = o;
  let i = n, a = i && /* @__PURE__ */ new WeakSet();
  function l(f, m) {
    if (!f._zod) {
      $b.value = new s(m);
      try {
        Object.defineProperty(f, "_zod", $b);
      } finally {
        $b.value = void 0;
      }
    }
    if (f._zod.traits.has(e10)) return;
    if (f._zod.traits.add(e10), t(f, m), a) {
      let _ = Object.getPrototypeOf(f), y = f._zod.constr.prototype, S = _;
      while (S && S !== y) S = Object.getPrototypeOf(S);
      let E = S ?? _;
      if (!a.has(E)) a.add(E), FL(E, i);
    }
    let g = p.prototype;
    for (let _ in g) {
      if (!Object.prototype.hasOwnProperty.call(g, _)) continue;
      if (!(_ in f)) f[_] = g[_].bind(f);
    }
  }
  let c = r?.Parent ?? Object;
  class d extends c {
  }
  Object.defineProperty(d, "name", { value: e10 });
  function p(f) {
    let m = r?.Parent ? $Ce(d) : this;
    l(m, f);
    let g = m._zod.deferred;
    if (g) {
      for (let y of g) y();
      m._zod.deferred = void 0;
    }
    let _ = globalThis.__zod_globalConfig?.postProcessor;
    if (_) _(m);
    return m;
  }
  return Object.defineProperty(p, "init", { value: l }), Object.defineProperty(p, Symbol.hasInstance, { value: (f) => {
    if (r?.Parent && f instanceof r.Parent) return true;
    return f?._zod?.traits?.has(e10);
  } }), Object.defineProperty(p, "name", { value: e10 }), p;
}
class Jr extends Error {
  constructor() {
    super("Encountered Promise during synchronous parse. Use .parseAsync() instead.");
  }
}
class Ku extends Error {
  constructor(e10) {
    super(`Encountered unidirectional transform during encode: ${e10}`);
    this.name = "ZodEncodeError";
  }
}
(HL = globalThis).__zod_globalConfig ?? (HL.__zod_globalConfig = {});
var Cn = globalThis.__zod_globalConfig;
function Un(e10) {
  if (e10) Object.assign(Cn, e10);
  return Cn;
}
function zCe() {
  let e10 = this._zod;
  return e10.message ?? (e10.message = JSON.stringify(e10.def, $u, 2)), e10.message;
}
function HCe(e10) {
  this._zod.message = e10;
}
var jCe = { get: zCe, set: HCe, enumerable: true, configurable: true }, Hb = { value: void 0, enumerable: false }, BL = new WeakSet([Object.prototype, Error.prototype]), KL = (e10, t) => {
  e10.name = "$ZodError", Hb.value = t, Object.defineProperty(e10, "issues", Hb), Hb.value = void 0, Object.defineProperty(e10, "message", jCe);
  let n = Object.getPrototypeOf(e10);
  if (!BL.has(n)) BL.add(n), Object.defineProperty(n, "toString", { configurable: true, enumerable: false, get() {
    let r = () => this.message;
    return Object.defineProperty(this, "toString", { value: r, configurable: true, writable: true }), r;
  }, set(r) {
    Object.defineProperty(this, "toString", { value: r, configurable: true, writable: true });
  } });
}, GL = I("$ZodError", KL), Gu = I("$ZodError", KL, void 0, { Parent: Error });
function BCe(e10, t, n) {
  if (!Object.prototype.hasOwnProperty.call(e10, t)) if (t === "__proto__") Object.defineProperty(e10, t, { value: n(), writable: true, enumerable: true, configurable: true });
  else e10[t] = n();
  return e10[t];
}
function jb(e10, t = (n) => n.message) {
  let n = {}, r = [];
  for (let o of e10.issues) if (o.path.length > 0) BCe(n, o.path[0], () => []).push(t(o));
  else r.push(t(o));
  return { formErrors: r, fieldErrors: n };
}
function Bb(e10, t = (n) => n.message) {
  let n = { _errors: [] }, r = (o, s = []) => {
    for (let i of o.issues) if (i.code === "invalid_union" && i.errors.length) i.errors.map((a) => r({ issues: a }, [...s, ...i.path]));
    else if (i.code === "invalid_key") r({ issues: i.issues }, [...s, ...i.path]);
    else if (i.code === "invalid_element") r({ issues: i.issues }, [...s, ...i.path]);
    else {
      let a = [...s, ...i.path];
      if (a.length === 0) n._errors.push(t(i));
      else {
        let l = n, c = 0;
        while (c < a.length) {
          let d = a[c], p = c === a.length - 1;
          if (d === "_errors") {
            if (p) l._errors.push(t(i));
            c++;
            continue;
          }
          if (!Object.prototype.hasOwnProperty.call(l, d)) Object.defineProperty(l, d, { value: { _errors: [] }, enumerable: true, writable: true, configurable: true });
          let f = l[d];
          if (p) f._errors.push(t(i));
          l = f, c++;
        }
      }
    }
  };
  return r(e10), n;
}
function Em(e10, t) {
  return { callee: t?.callee ?? e10, Err: t?.Err };
}
var Wu = (e10) => {
  let t = (n, r, o, s) => {
    let i = o ? { ...o, async: false } : { async: false }, a = n._zod.run({ value: r, issues: [] }, i);
    if (a instanceof Promise) throw new Jr();
    if (a.issues.length) {
      let l = new (s?.Err ?? e10)(a.issues.map((c) => Zr(c, i, Un())));
      throw Ib(l, s?.callee ?? t), l;
    }
    return a.value;
  };
  return t;
}, Kb = Wu(Gu), Vu = (e10) => {
  let t = async (n, r, o, s) => {
    let i = o ? { ...o, async: true } : { async: true }, a = n._zod.run({ value: r, issues: [] }, i);
    if (a instanceof Promise) a = await a;
    if (a.issues.length) {
      let l = new (s?.Err ?? e10)(a.issues.map((c) => Zr(c, i, Un())));
      throw Ib(l, s?.callee ?? t), l;
    }
    return a.value;
  };
  return t;
}, Gb = Vu(Gu), qu = (e10) => (t, n, r) => {
  let o = r ? { ...r, async: false } : { async: false }, s = t._zod.run({ value: n, issues: [] }, o);
  if (s instanceof Promise) throw new Jr();
  return s.issues.length ? WL(e10, s.issues, o) : { success: true, data: s.value };
}, Yu = qu(Gu);
function WL(e10, t, n) {
  let r;
  return { success: false, get error() {
    if (!r) r = new e10(t.map((o) => Zr(o, n, Un()))), t = void 0, n = void 0;
    return r;
  }, set error(o) {
    r = o, t = void 0, n = void 0;
  } };
}
var Zu = (e10) => async (t, n, r) => {
  let o = r ? { ...r, async: true } : { async: true }, s = t._zod.run({ value: n, issues: [] }, o);
  if (s instanceof Promise) s = await s;
  return s.issues.length ? WL(e10, s.issues, o) : { success: true, data: s.value };
}, Ju = Zu(Gu), GCe = /* @__PURE__ */ Symbol.for("zod.compile.invalid"), WCe = /* @__PURE__ */ Symbol.for("zod.compile.fallback"), bm = (e10, t, n) => {
  let r = e10._zod.bag.validator;
  if (r !== void 0) {
    if (r(t) !== GCe) return true;
    if (r.definite === true && n === void 0) return false;
  }
  return VCe(e10, t, n);
};
function VCe(e10, t, n) {
  let r = n ? { ...n, async: false, abortEarly: true } : { async: false, abortEarly: true }, o = e10._zod.bag.fallbackRun, s;
  if (o) r[WCe] = true, s = o({ value: t, issues: [] }, r);
  else s = e10._zod.run({ value: t, issues: [] }, r);
  if (s instanceof Promise) throw new Jr();
  return s.issues.length === 0;
}
var Cm = async (e10, t, n) => {
  let r = n ? { ...n, async: true, abortEarly: true } : { async: true, abortEarly: true }, o = e10._zod.run({ value: t, issues: [] }, r);
  if (o instanceof Promise) o = await o;
  return o.issues.length === 0;
}, VL = (e10) => {
  let t = Wu(e10), n = (r, o, s, i) => {
    let a = s ? { ...s, direction: "backward" } : { direction: "backward" };
    return t(r, o, a, Em(n, i));
  };
  return n;
};
var qL = (e10) => {
  let t = Wu(e10), n = (r, o, s, i) => t(r, o, s, Em(n, i));
  return n;
};
var YL = (e10) => {
  let t = Vu(e10), n = async (r, o, s, i) => {
    let a = s ? { ...s, direction: "backward" } : { direction: "backward" };
    return await t(r, o, a, Em(n, i));
  };
  return n;
};
var ZL = (e10) => {
  let t = Vu(e10), n = async (r, o, s, i) => await t(r, o, s, Em(n, i));
  return n;
};
var JL = (e10) => (t, n, r) => {
  let o = r ? { ...r, direction: "backward" } : { direction: "backward" };
  return qu(e10)(t, n, o);
};
var XL = (e10) => (t, n, r) => qu(e10)(t, n, r);
var QL = (e10) => async (t, n, r) => {
  let o = r ? { ...r, direction: "backward" } : { direction: "backward" };
  return Zu(e10)(t, n, o);
};
var eM = (e10) => async (t, n, r) => Zu(e10)(t, n, r);
var tM = /^[cC][0-9a-z]{6,}$/, nM = /^[0-9a-z]+$/, rM = /^[0-7][0-9A-HJKMNP-TV-Za-hjkmnp-tv-z]{25}$/, oM = /^[0-9a-vA-V]{20}$/, sM = /^[A-Za-z0-9]{27}$/, iM = /^[a-zA-Z0-9_-]{21}$/;
function aM(e10) {
  return new RegExp(`^[a-zA-Z0-9_-]{${e10}}$`);
}
var lM = /^P(?:(\d+W)|(?!.*W)(?=\d|T\d)(\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+([.,]\d+)?S)?)?)$/;
var cM = /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/, Vb = (e10) => {
  if (!e10) return /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/;
  return new RegExp(`^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-${e10}[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$`);
};
var uM = /^(?:[A-Za-z0-9_'+\-]+\.)*[A-Za-z0-9_'+\-]*[A-Za-z0-9_+-]@(?:[A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/;
var qCe = "^(?=[\\s\\S]*[\\p{Extended_Pictographic}\\p{Regional_Indicator}\\u20E3])[\\p{Extended_Pictographic}\\p{Emoji_Component}]+$";
function dM() {
  return new RegExp(qCe, "u");
}
var pM = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/, fM = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))$/;
var mM = /^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/([0-9]|[1-2][0-9]|3[0-2])$/, gM = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/, hM = /^$|^(?:[0-9a-zA-Z+/]{4})*(?:(?:[0-9a-zA-Z+/]{2}==)|(?:[0-9a-zA-Z+/]{3}=))?$/, _M = /^(?:[A-Za-z0-9_-]{4})*(?:[A-Za-z0-9_-]{2,3})?$/;
var yM = /^https?$/, SM = /^\+[1-9]\d{6,14}$/;
var EM = "(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))";
function YCe(e10) {
  return new RegExp(`^${e10}$`);
}
var bM = YCe(EM);
function Wb(e10) {
  return typeof e10.precision === "number" ? e10.precision === -1 ? "(?:[01]\\d|2[0-3]):[0-5]\\d" : e10.precision === 0 ? "(?:[01]\\d|2[0-3]):[0-5]\\d:[0-5]\\d" : `(?:[01]\\d|2[0-3]):[0-5]\\d:[0-5]\\d\\.\\d{${e10.precision}}` : e10.seconds ? "(?:[01]\\d|2[0-3]):[0-5]\\d:[0-5]\\d(?:\\.\\d+)?" : "(?:[01]\\d|2[0-3]):[0-5]\\d(?::[0-5]\\d(?:\\.\\d+)?)?";
}
function CM(e10) {
  return new RegExp(`^${Wb(e10)}$`);
}
function AM(e10) {
  let t = ["Z"];
  if (e10.offset) t.push("([+-](?:[01]\\d|2[0-3]):[0-5]\\d)");
  let n = `${Wb({ precision: e10.precision, seconds: true })}(?:${t.join("|")})`, r = e10.local ? `${n}|${Wb({ precision: e10.precision })}` : n;
  return new RegExp(`^${EM}T(?:${r})$`);
}
var RM = /^[\s\S]{0,}$/;
var qb = /^-?\d+$/, Xu = /^-?\d+(?:\.\d+)?$/, OM = /^(?:true|false)$/i, TM = /^null$/i;
var wM = /^undefined$/i;
var xM = /^[^A-Z]*$/, vM = /^[^a-z]*$/;
var Bt = I("$ZodCheck", (e10, t) => {
  var n;
  e10._zod ?? (e10._zod = {}), e10._zod.def = t, (n = e10._zod).onattach ?? (n.onattach = []);
});
var Yb = (e10) => {
  let t = e10.value;
  return !EL(t) && t.length !== void 0;
}, Am = { number: "number", bigint: "bigint", object: "date" }, Zb = I("$ZodCheckLessThan", (e10, t) => {
  Bt.init(e10, t);
  let n = Am[typeof t.value];
  e10._zod.check = (r) => {
    if (t.inclusive ? r.value <= t.value : r.value < t.value) return;
    r.issues.push({ origin: Am[typeof r.value] ?? n, code: "too_big", maximum: typeof t.value === "object" ? t.value.getTime() : t.value, input: r.value, inclusive: t.inclusive, inst: e10, continue: !t.abort });
  };
}), Jb = I("$ZodCheckGreaterThan", (e10, t) => {
  Bt.init(e10, t);
  let n = Am[typeof t.value];
  e10._zod.check = (r) => {
    if (t.inclusive ? r.value >= t.value : r.value > t.value) return;
    r.issues.push({ origin: Am[typeof r.value] ?? n, code: "too_small", minimum: typeof t.value === "object" ? t.value.getTime() : t.value, input: r.value, inclusive: t.inclusive, inst: e10, continue: !t.abort });
  };
}), kM = I("$ZodCheckMultipleOf", (e10, t) => {
  Bt.init(e10, t), e10._zod.check = (n) => {
    if (typeof n.value !== typeof t.value) throw Error("Cannot mix number and bigint in multiple_of check.");
    if (typeof n.value === "bigint" ? t.value !== BigInt(0) && n.value % t.value === BigInt(0) : bL(n.value, t.value) === 0) return;
    n.issues.push({ origin: typeof n.value, code: "not_multiple_of", divisor: t.value, input: n.value, inst: e10, continue: !t.abort });
  };
}), PM = I("$ZodCheckNumberFormat", (e10, t) => {
  Bt.init(e10, t), t.format = t.format || "float64";
  let n = t.format?.includes("int"), r = n ? "int" : "number", [o, s] = hm[t.format];
  e10._zod.check = (i) => {
    let a = i.value;
    if (n) {
      if (!Number.isInteger(a)) {
        i.issues.push({ expected: r, format: t.format, code: "invalid_type", continue: false, input: a, inst: e10 });
        return;
      }
      if (!Number.isSafeInteger(a)) {
        if (a > 0) i.issues.push({ input: a, code: "too_big", maximum: Number.MAX_SAFE_INTEGER, note: "Integers must be within the safe integer range.", inst: e10, origin: r, inclusive: true, continue: !t.abort });
        else i.issues.push({ input: a, code: "too_small", minimum: Number.MIN_SAFE_INTEGER, note: "Integers must be within the safe integer range.", inst: e10, origin: r, inclusive: true, continue: !t.abort });
        return;
      }
    }
    if (a < o) i.issues.push({ origin: "number", input: a, code: "too_small", minimum: o, inclusive: true, inst: e10, continue: !t.abort });
    if (a > s) i.issues.push({ origin: "number", input: a, code: "too_big", maximum: s, inclusive: true, inst: e10, continue: !t.abort });
  };
});
var IM = I("$ZodCheckMaxLength", (e10, t) => {
  var n;
  Bt.init(e10, t), (n = e10._zod.def).when ?? (n.when = Yb), e10._zod.check = (r) => {
    let o = r.value, s = o.length;
    if ((typeof o === "string" && s > t.maximum ? ym(o) : s) <= t.maximum) return;
    let a = Sm(o);
    r.issues.push({ origin: a, code: "too_big", maximum: t.maximum, inclusive: true, input: o, inst: e10, continue: !t.abort });
  };
}), DM = I("$ZodCheckMinLength", (e10, t) => {
  var n;
  Bt.init(e10, t), (n = e10._zod.def).when ?? (n.when = Yb), e10._zod.check = (r) => {
    let o = r.value, s = o.length;
    if ((typeof o === "string" && s >= t.minimum && s < t.minimum * 2 ? ym(o) : s) >= t.minimum) return;
    let a = Sm(o);
    r.issues.push({ origin: a, code: "too_small", minimum: t.minimum, inclusive: true, input: o, inst: e10, continue: !t.abort });
  };
}), LM = I("$ZodCheckLengthEquals", (e10, t) => {
  var n;
  Bt.init(e10, t), (n = e10._zod.def).when ?? (n.when = Yb), e10._zod.check = (r) => {
    let o = r.value, s = o.length, i = typeof o === "string" && s >= t.length && s <= t.length * 2 ? ym(o) : s;
    if (i === t.length) return;
    let a = Sm(o), l = i > t.length;
    r.issues.push({ origin: a, ...l ? { code: "too_big", maximum: t.length } : { code: "too_small", minimum: t.length }, inclusive: true, exact: true, input: r.value, inst: e10, continue: !t.abort });
  };
}), Qu = I("$ZodCheckStringFormat", (e10, t) => {
  var n, r;
  if (Bt.init(e10, t), t.pattern) (n = e10._zod).check ?? (n.check = (o) => {
    if (t.pattern.lastIndex = 0, t.pattern.test(o.value)) return;
    o.issues.push({ origin: "string", code: "invalid_format", format: t.format, input: o.value, ...t.pattern ? { pattern: t.pattern.toString() } : {}, inst: e10, continue: !t.abort });
  });
  else (r = e10._zod).check ?? (r.check = () => {
  });
}), MM = I("$ZodCheckRegex", (e10, t) => {
  Qu.init(e10, t), e10._zod.check = (n) => {
    if (t.pattern.lastIndex = 0, t.pattern.test(n.value)) return;
    n.issues.push({ origin: "string", code: "invalid_format", format: "regex", input: n.value, pattern: t.pattern.toString(), inst: e10, continue: !t.abort });
  };
}), NM = I("$ZodCheckLowerCase", (e10, t) => {
  t.pattern ?? (t.pattern = xM), Qu.init(e10, t);
}), UM = I("$ZodCheckUpperCase", (e10, t) => {
  t.pattern ?? (t.pattern = vM), Qu.init(e10, t);
}), FM = I("$ZodCheckIncludes", (e10, t) => {
  Bt.init(e10, t);
  let n = ks(t.includes), r = new RegExp(typeof t.position === "number" ? `^.{${t.position},}${n}` : n);
  t.pattern = r, e10._zod.check = (o) => {
    if (o.value.includes(t.includes, t.position)) return;
    o.issues.push({ origin: "string", code: "invalid_format", format: "includes", includes: t.includes, input: o.value, inst: e10, continue: !t.abort });
  };
}), $M = I("$ZodCheckStartsWith", (e10, t) => {
  Bt.init(e10, t);
  let n = new RegExp(`^${ks(t.prefix)}.*`);
  t.pattern ?? (t.pattern = n), e10._zod.check = (r) => {
    if (r.value.startsWith(t.prefix)) return;
    r.issues.push({ origin: "string", code: "invalid_format", format: "starts_with", prefix: t.prefix, input: r.value, inst: e10, continue: !t.abort });
  };
}), zM = I("$ZodCheckEndsWith", (e10, t) => {
  Bt.init(e10, t);
  let n = new RegExp(`.*${ks(t.suffix)}$`);
  t.pattern ?? (t.pattern = n), e10._zod.check = (r) => {
    if (r.value.endsWith(t.suffix)) return;
    r.issues.push({ origin: "string", code: "invalid_format", format: "ends_with", suffix: t.suffix, input: r.value, inst: e10, continue: !t.abort });
  };
});
var HM = I("$ZodCheckOverwrite", (e10, t) => {
  Bt.init(e10, t), e10._zod.check = (n) => {
    n.value = t.tx(n.value);
  };
});
class Xb {
  constructor(e10 = [], t = {}) {
    this.content = [], this.indent = 0, this.args = e10, this.closed = t;
  }
  indented(e10) {
    this.indent += 1;
    try {
      e10(this);
    } finally {
      this.indent -= 1;
    }
  }
  write(e10) {
    if (typeof e10 === "function") {
      e10(this, { execution: "sync" }), e10(this, { execution: "async" });
      return;
    }
    let n = e10.split(`
`).filter((s) => s), r = Math.min(...n.map((s) => s.length - s.trimStart().length)), o = n.map((s) => s.slice(r)).map((s) => " ".repeat(this.indent * 2) + s);
    for (let s of o) this.content.push(s);
  }
  compile() {
    let e10 = Function, t = this?.content ?? [""];
    return new e10(...Object.keys(this.closed), `return function (${this.args.join(", ")}) {
${t.join(`
`)}
};`)(...Object.values(this.closed));
  }
}
var Dr = { major: 4, minor: 6, patch: 2 };
var Ke = I("$ZodType", (e10, t) => {
  var n;
  e10 ?? (e10 = {}), e10._zod.def = t, e10._zod.bag = e10._zod.bag || {}, e10._zod.version = Dr;
  let r = e10._zod.def.checks, o = e10._zod.traits.has("$ZodCheck") ? [e10, ...r ?? []] : r?.length ? [...r] : [];
  for (let s of o) for (let i of s._zod.onattach) i(e10);
  if (o.length === 0) (n = e10._zod).deferred ?? (n.deferred = []), e10._zod.deferred?.push(() => {
    e10._zod.run = e10._zod.parse;
  });
  else {
    let s = (a, l, c) => {
      if (a.memo) return a;
      let d = Yr(a), p;
      for (let f of l) {
        if (f._zod.def.when) {
          if (NL(a)) continue;
          if (!f._zod.def.when(a)) continue;
        } else if (d) continue;
        let m = a.issues.length, g = f._zod.check(a);
        if (g instanceof Promise && c?.async === false) throw new Jr();
        if (p || g instanceof Promise) p = (p ?? Promise.resolve()).then(async () => {
          if (await g, a.issues.length === m) return;
          if (Nb(a.issues, m, e10), !d) d = Yr(a, m);
        });
        else {
          if (a.issues.length === m) continue;
          if (Nb(a.issues, m, e10), !d) d = Yr(a, m);
        }
      }
      if (p) return p.then(() => a);
      return a;
    }, i = (a, l, c) => {
      if (Yr(a)) return a.aborted = true, a;
      let d = s(l, o, c);
      if (d instanceof Promise) {
        if (c.async === false) throw new Jr();
        return d.then((p) => e10._zod.parse(p, c));
      }
      return e10._zod.parse(d, c);
    };
    e10._zod.run = (a, l) => {
      if (l.skipChecks) return e10._zod.parse(a, l);
      if (l.direction === "backward") {
        let d = e10._zod.parse({ value: a.value, issues: [] }, { ...l, skipChecks: true });
        if (d instanceof Promise) return d.then((p) => i(p, a, l));
        return i(d, a, l);
      }
      let c = e10._zod.parse(a, l);
      if (c instanceof Promise) {
        if (l.async === false) throw new Jr();
        return c.then((d) => s(d, o, l));
      }
      return s(c, o, l);
    };
  }
}, { get "~standard"() {
  return Ub(this, "~standard", eC(this));
}, set "~standard"(e10) {
  Ir(this, "~standard", e10);
} }), QM = (e10, t) => e10.issues.length ? { issues: e10.issues.map((n) => Zr(n, t, Un())) } : { value: e10.value };
async function ZCe(e10, t) {
  let n = { async: true };
  return QM(await e10._zod.run({ value: t, issues: [] }, n), n);
}
function eC(e10) {
  return { validate: (t) => {
    let n = { async: false };
    try {
      let r = e10._zod.run({ value: t, issues: [] }, n);
      if (!(r instanceof Promise)) return QM(r, n);
    } catch (r) {
    }
    return ZCe(e10, t);
  }, vendor: "zod", version: 1 };
}
var ed = I("$ZodString", (e10, t) => {
  Ke.init(e10, t), e10._zod.pattern = t.pattern ?? RM, e10._zod.parse = (n, r) => {
    if (t.coerce) try {
      n.value = String(n.value);
    } catch (o) {
    }
    if (typeof n.value === "string") return n;
    return n.issues.push({ expected: "string", code: "invalid_type", input: n.value, inst: e10 }), n;
  };
}), rt = I("$ZodStringFormat", (e10, t) => {
  Qu.init(e10, t), ed.init(e10, t);
}), tC = I("$ZodGUID", (e10, t) => {
  t.pattern ?? (t.pattern = cM), rt.init(e10, t);
}), nC = I("$ZodUUID", (e10, t) => {
  if (t.version) {
    let r = { v1: 1, v2: 2, v3: 3, v4: 4, v5: 5, v6: 6, v7: 7, v8: 8 }[t.version];
    if (r === void 0) throw Error(`Invalid UUID version: "${t.version}"`);
    t.pattern ?? (t.pattern = Vb(r));
  } else t.pattern ?? (t.pattern = Vb());
  rt.init(e10, t);
}), rC = I("$ZodEmail", (e10, t) => {
  t.pattern ?? (t.pattern = uM), rt.init(e10, t);
}), eN = 1, tN = 2;
function JCe(e10, t) {
  if (!t.normalize && t.protocol?.source === yM.source && !/^https?:\/\//i.test(e10)) return eN;
  try {
    return new URL(e10);
  } catch {
    return tN;
  }
}
var XCe = /[\t\n\r]/g;
function QCe(e10) {
  return e10.replace(XCe, "");
}
function eAe(e10, t) {
  return t.lastIndex = 0, t.test(e10.hostname);
}
function tAe(e10, t) {
  return t.lastIndex = 0, t.test(e10.protocol.endsWith(":") ? e10.protocol.slice(0, -1) : e10.protocol);
}
var oC = I("$ZodURL", (e10, t) => {
  rt.init(e10, t), e10._zod.check = (n) => {
    try {
      let r = n.value.trim(), o = JCe(r, t);
      if (o === eN) {
        n.issues.push({ code: "invalid_format", format: "url", note: "Invalid URL format", input: n.value, inst: e10, continue: !t.abort });
        return;
      }
      if (o === tN) {
        n.issues.push({ code: "invalid_format", format: "url", input: n.value, inst: e10, continue: !t.abort });
        return;
      }
      if (t.hostname && !eAe(o, t.hostname)) n.issues.push({ code: "invalid_format", format: "url", note: "Invalid hostname", pattern: t.hostname.source, input: n.value, inst: e10, continue: !t.abort });
      if (t.protocol && !tAe(o, t.protocol)) n.issues.push({ code: "invalid_format", format: "url", note: "Invalid protocol", pattern: t.protocol.source, input: n.value, inst: e10, continue: !t.abort });
      n.value = t.normalize ? o.href : QCe(r);
      return;
    } catch (r) {
      n.issues.push({ code: "invalid_format", format: "url", input: n.value, inst: e10, continue: !t.abort });
    }
  };
}), sC = I("$ZodEmoji", (e10, t) => {
  t.pattern ?? (t.pattern = dM()), rt.init(e10, t);
}), iC = I("$ZodNanoID", (e10, t) => {
  if (t.length !== void 0 && (!Number.isInteger(t.length) || t.length < 1)) throw Error(`Invalid nanoid length: ${t.length}`);
  t.pattern ?? (t.pattern = t.length === void 0 ? iM : aM(t.length)), rt.init(e10, t);
}), aC = I("$ZodCUID", (e10, t) => {
  t.pattern ?? (t.pattern = tM), rt.init(e10, t);
}), lC = I("$ZodCUID2", (e10, t) => {
  t.pattern ?? (t.pattern = nM), rt.init(e10, t);
}), cC = I("$ZodULID", (e10, t) => {
  t.pattern ?? (t.pattern = rM), rt.init(e10, t);
}), uC = I("$ZodXID", (e10, t) => {
  t.pattern ?? (t.pattern = oM), rt.init(e10, t);
}), dC = I("$ZodKSUID", (e10, t) => {
  t.pattern ?? (t.pattern = sM), rt.init(e10, t);
}), nN = I("$ZodISODateTime", (e10, t) => {
  t.pattern ?? (t.pattern = AM(t)), rt.init(e10, t);
}), rN = I("$ZodISODate", (e10, t) => {
  t.pattern ?? (t.pattern = bM), rt.init(e10, t);
}), oN = I("$ZodISOTime", (e10, t) => {
  t.pattern ?? (t.pattern = CM(t)), rt.init(e10, t);
}), sN = I("$ZodISODuration", (e10, t) => {
  t.pattern ?? (t.pattern = lM), rt.init(e10, t);
}), pC = I("$ZodIPv4", (e10, t) => {
  t.pattern ?? (t.pattern = pM), rt.init(e10, t);
}), nAe = /^[0-9a-fA-F:.]+$/;
function iN(e10) {
  if (!nAe.test(e10)) return false;
  try {
    return new URL(`http://[${e10}]`), true;
  } catch {
    return false;
  }
}
var fC = I("$ZodIPv6", (e10, t) => {
  t.pattern ?? (t.pattern = fM), rt.init(e10, t), e10._zod.check = (n) => {
    if (!iN(n.value)) n.issues.push({ code: "invalid_format", format: "ipv6", input: n.value, inst: e10, continue: !t.abort });
  };
});
var mC = I("$ZodCIDRv4", (e10, t) => {
  t.pattern ?? (t.pattern = mM), rt.init(e10, t);
});
function rAe(e10) {
  let t = e10.split("/");
  if (t.length !== 2) return false;
  let [n, r] = t;
  if (!r) return false;
  let o = Number(r);
  if (`${o}` !== r) return false;
  if (o < 0 || o > 128) return false;
  return iN(n);
}
var gC = I("$ZodCIDRv6", (e10, t) => {
  t.pattern ?? (t.pattern = gM), rt.init(e10, t), e10._zod.check = (n) => {
    if (!rAe(n.value)) n.issues.push({ code: "invalid_format", format: "cidrv6", input: n.value, inst: e10, continue: !t.abort });
  };
});
function aN(e10) {
  if (e10 === "") return true;
  if (/\s/.test(e10)) return false;
  if (e10.length % 4 !== 0) return false;
  try {
    return atob(e10), true;
  } catch {
    return false;
  }
}
var hC = /^[0-9a-zA-Z+/]*={0,2}$/, _C = I("$ZodBase64", (e10, t) => {
  t.pattern ?? (t.pattern = hC), rt.init(e10, t), e10._zod.check = (n) => {
    if (aN(n.value)) return;
    n.issues.push({ code: "invalid_format", format: "base64", input: n.value, inst: e10, continue: !t.abort });
  };
}), Tm = /^[A-Za-z0-9_-]*$/;
function oAe(e10) {
  if (!Tm.test(e10)) return false;
  let t = e10.replace(/[-_]/g, (r) => r === "-" ? "+" : "/"), n = t.padEnd(Math.ceil(t.length / 4) * 4, "=");
  return aN(n);
}
var yC = I("$ZodBase64URL", (e10, t) => {
  t.pattern ?? (t.pattern = Tm), rt.init(e10, t), e10._zod.check = (n) => {
    if (oAe(n.value)) return;
    n.issues.push({ code: "invalid_format", format: "base64url", input: n.value, inst: e10, continue: !t.abort });
  };
}), SC = I("$ZodE164", (e10, t) => {
  t.pattern ?? (t.pattern = SM), rt.init(e10, t);
});
function sAe(e10, t = null) {
  try {
    let n = e10.split(".");
    if (n.length !== 3) return false;
    let [r] = n;
    if (!r) return false;
    let o = JSON.parse(atob(r));
    if ("typ" in o && o?.typ !== "JWT") return false;
    if (!o.alg) return false;
    if (t && (!("alg" in o) || o.alg !== t)) return false;
    return true;
  } catch {
    return false;
  }
}
var EC = I("$ZodJWT", (e10, t) => {
  rt.init(e10, t), e10._zod.check = (n) => {
    if (sAe(n.value, t.alg)) return;
    n.issues.push({ code: "invalid_format", format: "jwt", input: n.value, inst: e10, continue: !t.abort });
  };
});
var wm = I("$ZodNumber", (e10, t) => {
  Ke.init(e10, t), e10._zod.pattern = Xu, e10._zod.parse = (n, r) => {
    if (t.coerce) try {
      n.value = Number(n.value);
    } catch (i) {
    }
    let o = n.value;
    if (typeof o === "number" && !Number.isNaN(o) && Number.isFinite(o)) return n;
    let s = typeof o === "number" ? Number.isNaN(o) ? "NaN" : !Number.isFinite(o) ? String(o) : void 0 : void 0;
    return n.issues.push({ expected: "number", code: "invalid_type", input: o, inst: e10, ...s ? { received: s } : {} }), n;
  };
}), bC = I("$ZodNumberFormat", (e10, t) => {
  PM.init(e10, t), wm.init(e10, t);
}), CC = I("$ZodBoolean", (e10, t) => {
  Ke.init(e10, t), e10._zod.pattern = OM, e10._zod.parse = (n, r) => {
    if (t.coerce) try {
      n.value = Boolean(n.value);
    } catch (s) {
    }
    let o = n.value;
    if (typeof o === "boolean") return n;
    return n.issues.push({ expected: "boolean", code: "invalid_type", input: o, inst: e10 }), n;
  };
});
var AC = I("$ZodUndefined", (e10, t) => {
  Ke.init(e10, t), e10._zod.pattern = wM, e10._zod.values = /* @__PURE__ */ new Set([void 0]), e10._zod.parse = (n, r) => {
    let o = n.value;
    if (typeof o > "u") return n;
    return n.issues.push({ expected: "undefined", code: "invalid_type", input: o, inst: e10 }), n;
  };
}), RC = I("$ZodNull", (e10, t) => {
  Ke.init(e10, t), e10._zod.pattern = TM, e10._zod.values = /* @__PURE__ */ new Set([null]), e10._zod.parse = (n, r) => {
    let o = n.value;
    if (o === null) return n;
    return n.issues.push({ expected: "null", code: "invalid_type", input: o, inst: e10 }), n;
  };
});
var OC = I("$ZodUnknown", (e10, t) => {
  Ke.init(e10, t), e10._zod.parse = (n) => n;
}), TC = I("$ZodNever", (e10, t) => {
  Ke.init(e10, t), e10._zod.parse = (n, r) => (n.issues.push({ expected: "never", code: "invalid_type", input: n.value, inst: e10 }), n);
});
function BM(e10, t, n) {
  if (e10.issues.length) t.issues.push(...Fo(n, e10.issues));
  t.value[n] = e10.value;
}
var wC = I("$ZodArray", (e10, t) => {
  Ke.init(e10, t);
  let n = Cn.memoizer;
  n?.attach(e10), e10._zod.parse = (r, o) => {
    let s = r.value;
    if (!Array.isArray(s)) return r.issues.push({ expected: "array", code: "invalid_type", input: s, inst: e10 }), r;
    r.value = n ? n.alloc(e10, r, Array(s.length), o) : Array(s.length);
    let i = [], a = o?.abortEarly;
    for (let l = 0; l < s.length; l++) {
      let c = s[l], d = t.element._zod.run({ value: c, issues: [] }, o);
      if (d instanceof Promise) i.push(d.then((p) => BM(p, r, l)));
      else if (BM(d, r, l), a && d.issues.length !== 0 && Yr(d)) break;
    }
    if (i.length) return Promise.all(i).then(() => r);
    return r;
  };
});
function Om(e10, t, n, r, o, s) {
  let i = n in r, a = s === "optional";
  if (!i && a && o === "optional") return;
  if (e10.issues.length) {
    if (o !== void 0 && a && !i) return;
    t.issues.push(...Fo(n, e10.issues));
  }
  if (!i && o === void 0) {
    if (!e10.issues.length) t.issues.push({ code: "invalid_type", expected: "nonoptional", input: void 0, path: [n] });
    return;
  }
  if (e10.value === void 0) {
    if (i || o === "defaulted" && !a) t.value[n] = void 0;
  } else t.value[n] = e10.value;
}
var iAe = [];
function lN(e10) {
  let t = Object.keys(e10.shape), n = Object.getOwnPropertySymbols(e10.shape), r = n.length ? n : iAe, o = r.length ? [...t, ...r] : t;
  for (let i of o) if (!e10.shape?.[i]?._zod?.traits?.has("$ZodType")) throw Error(`Invalid element at key "${String(i)}": expected a Zod schema`);
  let s = xL(e10.shape);
  return { ...e10, allKeys: o, symbolKeys: r, keySet: new Set(t), numKeys: t.length, optionalKeys: new Set(s) };
}
function cN(e10, t, n, r, o, s, i) {
  let a = [], l = o.keySet, c = o.catchall._zod, d = c.def.type, { optin: p, optout: f } = c, m = 0;
  for (let g in t) {
    if (i && n.issues.length !== m) {
      if (Yr(n, m)) break;
      m = n.issues.length;
    }
    if (l.has(g)) continue;
    if (g === "__proto__") {
      if (d === "never") a.push(g);
      continue;
    }
    if (d === "never") {
      a.push(g);
      continue;
    }
    let _ = c.run({ value: t[g], issues: [] }, r);
    if (_ instanceof Promise) e10.push(_.then((y) => Om(y, n, g, t, p, f)));
    else Om(_, n, g, t, p, f);
  }
  if (a.length) n.issues.push({ code: "unrecognized_keys", keys: a, input: t, inst: s, continue: true });
  if (!e10.length) return n;
  return Promise.all(e10).then(() => n);
}
var xC = I("$ZodObject", (e10, t) => {
  Ke.init(e10, t);
  let n = Object.getOwnPropertyDescriptor(t, "shape"), r = n?.get ? n.get.raw : t.shape ?? {};
  if (r) {
    let c = () => {
      let d = { ...r };
      return Object.defineProperty(t, "shape", { value: d }), c.raw = d, d;
    };
    c.raw = r, Object.defineProperty(t, "shape", { get: c });
  }
  let o = zu(() => lN(t));
  Me(e10, "propValues", (c) => {
    let d = c.def.shape, p = {};
    for (let f in d) {
      let m = d[f]._zod;
      if (m.values) {
        if (!Object.prototype.hasOwnProperty.call(p, f)) Ln(p, f, /* @__PURE__ */ new Set());
        for (let g of m.values) p[f].add(g);
        if (m.optin !== void 0) p[f].add(void 0);
      }
    }
    return p;
  });
  let s = al, i = t.catchall, a, l = Cn.memoizer;
  l?.attach(e10), e10._zod.parse = (c, d) => {
    a ?? (a = o.value);
    let p = c.value;
    if (!s(p)) return c.issues.push({ expected: "object", code: "invalid_type", input: p, inst: e10 }), c;
    c.value = l ? l.alloc(e10, c, {}, d) : {};
    let f = [], m = a.shape, g = d?.abortEarly, _ = c.issues.length;
    for (let y of a.allKeys) {
      if (g && c.issues.length !== _) {
        if (Yr(c, _)) break;
        _ = c.issues.length;
      }
      if (y === "__proto__") continue;
      let S = m[y], E = S._zod.optin, b = S._zod.optout, C = S._zod.run({ value: p[y], issues: [] }, d);
      if (C instanceof Promise) f.push(C.then((A) => Om(A, c, y, p, E, b)));
      else Om(C, c, y, p, E, b);
    }
    if (!i) return f.length ? Promise.all(f).then(() => c) : c;
    return cN(f, p, c, d, o.value, e10, g === true);
  };
}), uN = I("$ZodObjectJIT", (e10, t) => {
  xC.init(e10, t);
  let n = e10._zod.parse, r = zu(() => lN(t)), o = Cn.memoizer, s = (m) => {
    let g = r.value, _ = g.symbolKeys, y = new Xb(["payload", "ctx"], { shape: m, inst: e10, memo: o, syms: _ }), S = (A) => `shape[${A}]._zod.run({ value: input[${A}], issues: [] }, ctx)`, E = (A, T) => `
          let ${A}_ab = false;
          for (let i = 0; i < ${A}.issues.length; i++) {
            const iss = ${A}.issues[i];
            iss.path = iss.path ? [${T}, ...iss.path] : [${T}];
            payload.issues.push(iss);
            if (iss.continue !== true) ${A}_ab = true;
          }
          if (${A}_ab && ctx && ctx.abortEarly) {
            payload.value = newResult;
            return payload;
          }`;
    y.write("const input = payload.value;");
    let b = /* @__PURE__ */ Object.create(null), C = 0;
    for (let A of g.allKeys) b[A] = `key_${C++}`;
    y.write(o ? "const newResult = memo.alloc(inst, payload, {}, ctx);" : "const newResult = {};");
    for (let A of g.allKeys) {
      if (A === "__proto__") continue;
      let T = b[A], D = typeof A === "symbol" ? `syms[${_.indexOf(A)}]` : RL(A), U = `${D} in input`, F = m[A], pe = F?._zod?.optin, w = pe !== void 0, R = F?._zod?.optout === "optional";
      if (y.write(`const ${T} = ${S(D)};`), w && R) {
        let v = pe === "optional" ? `${T}_present` : `${T}.value !== undefined || ${T}_present`;
        y.write(`
        const ${T}_present = ${U};
        if (!${T}.issues.length || ${T}_present) {
          if (${T}.issues.length) {${E(T, D)}
          }

          if (${v}) {
            newResult[${D}] = ${T}.value;
          }
        }

      `);
      } else if (!w) y.write(`
        const ${T}_present = ${U};
        if (${T}.issues.length) {${E(T, D)}
        }
        if (!${T}_present && !${T}.issues.length) {
          payload.issues.push({
            code: "invalid_type",
            expected: "nonoptional",
            input: undefined,
            path: [${D}]
          });
          if (ctx && ctx.abortEarly) {
            payload.value = newResult;
            return payload;
          }
        }

        if (${T}_present) {
          newResult[${D}] = ${T}.value;
        }

      `);
      else if (y.write(`
        if (${T}.issues.length) {${E(T, D)}
        }
      `), pe === "defaulted") y.write(`newResult[${D}] = ${T}.value;`);
      else y.write(`
        if (${T}.value !== undefined || ${U}) {
          newResult[${D}] = ${T}.value;
        }
      `);
    }
    return y.write("payload.value = newResult;"), y.write("return payload;"), y.compile();
  }, i, a = al, l = !Cn.jitless, d = l && TL.value, p = t.catchall, f;
  e10._zod.parse = (m, g) => {
    f ?? (f = r.value);
    let _ = m.value;
    if (!a(_)) return m.issues.push({ expected: "object", code: "invalid_type", input: _, inst: e10 }), m;
    if (l && d && g?.async === false && g.jitless !== true) {
      if (!i) i = s(t.shape);
      if (m = i(m, g), !p) return m;
      return cN([], _, m, g, f, e10, g?.abortEarly === true);
    }
    return n(m, g);
  };
});
function KM(e10, t, n, r) {
  for (let s of e10) if (s.issues.length === 0) return t.value = s.value, t;
  let o = e10.filter((s) => !Yr(s));
  if (o.length === 1) return t.value = o[0].value, o[0];
  return t.issues.push({ code: "invalid_union", input: t.value, inst: n, errors: e10.map((s) => s.issues.map((i) => Zr(i, r, Un()))) }), t;
}
var xm = I("$ZodUnion", (e10, t) => {
  Ke.init(e10, t), Me(e10, "optin", (r) => r.def.options.some((o) => o._zod.optin === "defaulted") ? "defaulted" : r.def.options.some((o) => o._zod.optin !== void 0) ? "optional" : void 0), Me(e10, "optout", (r) => r.def.options.some((o) => o._zod.optout === "optional") ? "optional" : void 0), Me(e10, "values", (r) => {
    if (r.def.options.every((o) => o._zod.values)) return new Set(r.def.options.flatMap((o) => Array.from(o._zod.values)));
    return;
  }), Me(e10, "pattern", (r) => {
    if (r.def.options.every((o) => o._zod.pattern)) {
      let o = r.def.options.map((s) => s._zod.pattern);
      return new RegExp(`^(${o.map((s) => Hu(s.source)).join("|")})$`);
    }
    return;
  });
  let n = t.options.length === 1 ? t.options[0]._zod.run : null;
  e10._zod.parse = (r, o) => {
    if (n) return n(r, o);
    let s = false, i = [];
    for (let a of t.options) {
      let l = a._zod.run({ value: r.value, issues: [] }, o);
      if (l instanceof Promise) i.push(l), s = true;
      else {
        if (l.issues.length === 0) return l;
        i.push(l);
      }
    }
    if (!s) return KM(i, r, e10, o);
    return Promise.all(i).then((a) => KM(a, r, e10, o));
  };
});
function aAe(e10) {
  let t = /* @__PURE__ */ new Map();
  for (let n of e10.options) {
    let r = n._zod.propValues?.[e10.discriminator];
    if (!r || r.size === 0) throw Error(`Invalid discriminated union option at index "${e10.options.indexOf(n)}"`);
    for (let o of r) if (t.has(o)) {
      if (o !== void 0) throw Error(`Duplicate discriminator value "${String(o)}"`);
      t.set(o, null);
    } else t.set(o, n);
  }
  return t;
}
var vC = I("$ZodDiscriminatedUnion", (e10, t) => {
  t.inclusive = false, xm.init(e10, t);
  let n = e10._zod.parse;
  Me(e10, "propValues", (o) => {
    let s = {}, i = 0;
    for (let a of o.def.options) {
      let l = a._zod.propValues;
      if (!l || Object.keys(l).length === 0) throw Error(`Invalid discriminated union option at index "${o.def.options.indexOf(a)}"`);
      if (l[o.def.discriminator]?.has(void 0)) i++;
      for (let [c, d] of Object.entries(l)) {
        if (!Object.prototype.hasOwnProperty.call(s, c)) Ln(s, c, /* @__PURE__ */ new Set());
        for (let p of d) s[c].add(p);
      }
    }
    if (!o.def.unionFallback && i > 1) s[o.def.discriminator]?.delete(void 0);
    return s;
  }), t.options.forEach((o, s) => {
    let i = Bu(o._zod.def);
    if (i && !Object.prototype.hasOwnProperty.call(i, t.discriminator)) throw Error(`Invalid discriminated union option at index "${s}"`);
  });
  let r = zu(() => aAe(t));
  e10._zod.parse = (o, s) => {
    let i = o.value;
    if (!al(i)) return o.issues.push({ code: "invalid_type", expected: "object", input: i, inst: e10 }), o;
    let a = i?.[t.discriminator], l = r.value.get(a);
    if (l && (a !== void 0 || s.direction !== "backward")) return l._zod.run(o, s);
    if (t.unionFallback || s.direction === "backward") return n(o, s);
    return o.issues.push({ code: "invalid_union", errors: [], note: "No matching discriminator", discriminator: t.discriminator, options: Array.from(r.value.keys()).filter((c) => r.value.get(c) !== null), input: i, path: [t.discriminator], inst: e10 }), o;
  };
}), kC = I("$ZodIntersection", (e10, t) => {
  Ke.init(e10, t), e10._zod.parse = (n, r) => {
    let o = n.value, s = t.left._zod.run({ value: o, issues: [] }, r), i = t.right._zod.run({ value: o, issues: [] }, r);
    if (s instanceof Promise || i instanceof Promise) return Promise.all([s, i]).then(([l, c]) => GM(n, l, c));
    return GM(n, s, i);
  };
});
function Qb(e10, t) {
  if (e10 === t) return { valid: true, data: e10 };
  if (e10 instanceof Date && t instanceof Date && +e10 === +t) return { valid: true, data: e10 };
  if (qi(e10) && qi(t)) {
    let n = Object.keys(t), r = Object.keys(e10).filter((s) => n.indexOf(s) !== -1), o = { ...e10, ...t };
    if (Object.prototype.hasOwnProperty.call(o, "__proto__")) delete o.__proto__;
    for (let s of r) {
      if (s === "__proto__") continue;
      let i = Qb(e10[s], t[s]);
      if (!i.valid) return { valid: false, mergeErrorPath: [s, ...i.mergeErrorPath] };
      o[s] = i.data;
    }
    return { valid: true, data: o };
  }
  if (Array.isArray(e10) && Array.isArray(t)) {
    if (e10.length !== t.length) return { valid: false, mergeErrorPath: [] };
    let n = [];
    for (let r = 0; r < e10.length; r++) {
      let o = e10[r], s = t[r], i = Qb(o, s);
      if (!i.valid) return { valid: false, mergeErrorPath: [r, ...i.mergeErrorPath] };
      n.push(i.data);
    }
    return { valid: true, data: n };
  }
  return { valid: false, mergeErrorPath: [] };
}
function GM(e10, t, n) {
  let r = /* @__PURE__ */ new Map(), o, s = /* @__PURE__ */ new Map(), i = (c, d) => {
    let p;
    if (c.code === "unrecognized_keys" && !c.path?.length) o ?? (o = c), p = c.keys;
    else if (c.code === "invalid_key" && c.origin === "record" && c.path?.length === 1) {
      let f = String(c.path[0]);
      if (!s.has(f)) s.set(f, c);
      p = [f];
    } else return false;
    for (let f of p) {
      if (!r.has(f)) r.set(f, {});
      r.get(f)[d] = true;
    }
    return true;
  };
  for (let c of t.issues) if (!i(c, "l")) e10.issues.push(c);
  for (let c of n.issues) if (!i(c, "r")) e10.issues.push(c);
  let a = [...r].filter(([, c]) => c.l && c.r).map(([c]) => c);
  if (a.length) {
    let c = o ? a.filter((d) => o.keys.includes(d)) : [];
    if (c.length) e10.issues.push({ ...o, keys: c });
    for (let d of a) if (!c.includes(d) && s.has(d)) e10.issues.push(s.get(d));
  }
  let l = Qb(t.value, n.value);
  if (!l.valid) {
    if (Yr(e10)) return e10;
    throw Error(`Unmergable intersection. Error path: ${JSON.stringify(l.mergeErrorPath)}`);
  }
  return e10.value = l.data, e10;
}
var PC = I("$ZodRecord", (e10, t) => {
  Ke.init(e10, t);
  let n = Cn.memoizer;
  n?.attach(e10), e10._zod.parse = (r, o) => {
    let s = r.value;
    if (!qi(s)) return r.issues.push({ expected: "record", code: "invalid_type", input: s, inst: e10 }), r;
    let i = [], a = t.keyType._zod.values;
    if (a && !t.partial) {
      r.value = n ? n.alloc(e10, r, {}, o) : {};
      let l = /* @__PURE__ */ new Set();
      for (let d of a) if (typeof d === "string" || typeof d === "number" || typeof d === "symbol") {
        if (l.add(typeof d === "number" ? d.toString() : d), d === "__proto__") continue;
        let p = t.keyType._zod.run({ value: d, issues: [] }, o);
        if (p instanceof Promise) throw Error("Async schemas not supported in object keys currently");
        if (p.issues.length) {
          r.issues.push({ code: "invalid_key", origin: "record", issues: p.issues.map((g) => Zr(g, o, Un())), input: d, path: [d], inst: e10 });
          continue;
        }
        let f = p.value;
        if (f === "__proto__") continue;
        let m = t.valueType._zod.run({ value: s[d], issues: [] }, o);
        if (m instanceof Promise) i.push(m.then((g) => {
          if (g.issues.length) r.issues.push(...Fo(d, g.issues));
          r.value[f] = g.value;
        }));
        else {
          if (m.issues.length) r.issues.push(...Fo(d, m.issues));
          r.value[f] = m.value;
        }
      }
      let c;
      for (let d in s) if (!l.has(d)) if (t.mode === "loose") {
        if (d === "__proto__") continue;
        r.value[d] = s[d];
      } else c = c ?? [], c.push(d);
      if (c && c.length > 0) r.issues.push({ code: "unrecognized_keys", input: s, inst: e10, keys: c, continue: true });
    } else {
      r.value = n ? n.alloc(e10, r, {}, o) : {};
      let l;
      for (let c of Reflect.ownKeys(s)) {
        if (c === "__proto__") continue;
        if (!Object.prototype.propertyIsEnumerable.call(s, c)) continue;
        let d = t.keyType._zod.run({ value: c, issues: [] }, o);
        if (d instanceof Promise) throw Error("Async schemas not supported in object keys currently");
        if (typeof c === "string" && Xu.test(c) && d.issues.length) {
          let g = t.keyType._zod.run({ value: Number(c), issues: [] }, o);
          if (g instanceof Promise) throw Error("Async schemas not supported in object keys currently");
          if (g.issues.length === 0) d = g;
        }
        if (d.issues.length) {
          if (t.mode === "loose") r.value[c] = s[c];
          else if (a) l = l ?? [], l.push(c);
          else r.issues.push({ code: "invalid_key", origin: "record", issues: d.issues.map((g) => Zr(g, o, Un())), input: c, path: [c], inst: e10 });
          continue;
        }
        let f = d.value;
        if (f === "__proto__") continue;
        let m = t.valueType._zod.run({ value: s[c], issues: [] }, o);
        if (m instanceof Promise) i.push(m.then((g) => {
          if (g.issues.length) r.issues.push(...Fo(c, g.issues));
          r.value[f] = g.value;
        }));
        else {
          if (m.issues.length) r.issues.push(...Fo(c, m.issues));
          r.value[f] = m.value;
        }
      }
      if (l && l.length > 0) r.issues.push({ code: "unrecognized_keys", input: s, inst: e10, keys: l, continue: true });
    }
    if (i.length) return Promise.all(i).then(() => r);
    return r;
  };
});
var IC = I("$ZodEnum", (e10, t) => {
  Ke.init(e10, t);
  let n = Fu(t.entries), r = new Set(n);
  e10._zod.values = r, Me(e10, "pattern", (o) => {
    let s = Fu(o.def.entries).filter((i) => wL.has(typeof i));
    return new RegExp(s.length ? `^(${s.map((i) => ks(i.toString())).join("|")})$` : "^[^\\s\\S]$");
  }), e10._zod.parse = (o, s) => {
    let i = o.value;
    if (r.has(i)) return o;
    return o.issues.push({ code: "invalid_value", values: n, input: i, inst: e10 }), o;
  };
}), DC = I("$ZodLiteral", (e10, t) => {
  Ke.init(e10, t);
  let n = new Set(t.values);
  e10._zod.values = n, Me(e10, "pattern", (r) => {
    let o = r.def.values;
    return new RegExp(o.length ? `^(${o.map((s) => typeof s === "string" ? ks(s) : s ? ks(s.toString()) : String(s)).join("|")})$` : "^[^\\s\\S]$");
  }), e10._zod.parse = (r, o) => {
    let s = r.value;
    if (n.has(s)) return r;
    return r.issues.push({ code: "invalid_value", values: t.values, input: s, inst: e10 }), r;
  };
});
var LC = I("$ZodTransform", (e10, t) => {
  Ke.init(e10, t), e10._zod.optin = "optional", Cn.memoizer?.guard(e10), e10._zod.parse = (n, r) => {
    if (r.direction === "backward") throw new Ku(e10.constructor.name);
    let o = t.transform(n.value, n);
    if (r.async) return (o instanceof Promise ? o : Promise.resolve(o)).then((i) => (n.value = i, n));
    if (o instanceof Promise) throw new Jr();
    return n.value = o, n;
  };
});
function WM(e10, t) {
  return e10.value = t.issues.length ? void 0 : t.value, e10;
}
var vm = I("$ZodOptional", (e10, t) => {
  Ke.init(e10, t), Me(e10, "optin", (n) => n.def.innerType._zod.optin === "defaulted" ? "defaulted" : "optional"), e10._zod.optout = "optional", Me(e10, "values", (n) => {
    let r = n.def.innerType._zod.values;
    return r ? /* @__PURE__ */ new Set([...r, void 0]) : void 0;
  }), Me(e10, "pattern", (n) => {
    let r = n.def.innerType._zod.pattern;
    return r ? new RegExp(`^(${Hu(r.source)})?$`) : void 0;
  }), e10._zod.parse = (n, r) => {
    if (n.value === void 0) {
      if (t.innerType._zod.optin !== "defaulted") return n;
      let o = t.innerType._zod.run({ value: n.value, issues: [] }, r);
      if (o instanceof Promise) return o.then((s) => WM(n, s));
      return WM(n, o);
    }
    return t.innerType._zod.run(n, r);
  };
}), MC = I("$ZodExactOptional", (e10, t) => {
  vm.init(e10, t), Me(e10, "values", (n) => n.def.innerType._zod.values), Me(e10, "pattern", (n) => n.def.innerType._zod.pattern), e10._zod.parse = (n, r) => t.innerType._zod.run(n, r);
}), NC = I("$ZodNullable", (e10, t) => {
  Ke.init(e10, t), Me(e10, "optin", (n) => n.def.innerType._zod.optin), Me(e10, "optout", (n) => n.def.innerType._zod.optout), Me(e10, "pattern", (n) => {
    let r = n.def.innerType._zod.pattern;
    return r ? new RegExp(`^(${Hu(r.source)}|null)$`) : void 0;
  }), Me(e10, "values", (n) => n.def.innerType._zod.values ? /* @__PURE__ */ new Set([...n.def.innerType._zod.values, null]) : void 0), e10._zod.parse = (n, r) => {
    if (n.value === null) return n;
    return t.innerType._zod.run(n, r);
  };
}), UC = I("$ZodDefault", (e10, t) => {
  Ke.init(e10, t), e10._zod.optin = "defaulted", Me(e10, "values", (n) => n.def.innerType._zod.values), e10._zod.parse = (n, r) => {
    if (r.direction === "backward") return t.innerType._zod.run(n, r);
    if (n.value === void 0) return n.value = t.defaultValue, n;
    let o = t.innerType._zod.run(n, r);
    if (o instanceof Promise) return o.then((s) => VM(s, t));
    return VM(o, t);
  };
});
function VM(e10, t) {
  if (e10.value === void 0) e10.value = t.defaultValue;
  return e10;
}
var FC = I("$ZodPrefault", (e10, t) => {
  Ke.init(e10, t), e10._zod.optin = "defaulted", Me(e10, "values", (n) => n.def.innerType._zod.values), e10._zod.parse = (n, r) => {
    if (r.direction === "backward") return t.innerType._zod.run(n, r);
    if (n.value === void 0) n.value = t.defaultValue;
    return t.innerType._zod.run(n, r);
  };
}), $C = I("$ZodNonOptional", (e10, t) => {
  Ke.init(e10, t), Me(e10, "values", (n) => {
    let r = n.def.innerType._zod.values;
    return r ? new Set([...r].filter((o) => o !== void 0)) : void 0;
  }), e10._zod.parse = (n, r) => {
    let o = t.innerType._zod.run(n, r);
    if (o instanceof Promise) return o.then((s) => qM(s, e10));
    return qM(o, e10);
  };
});
function qM(e10, t) {
  if (!e10.issues.length && e10.value === void 0) e10.issues.push({ code: "invalid_type", expected: "nonoptional", input: e10.value, inst: t });
  return e10;
}
function YM(e10, t, n, r) {
  if (!t.issues.length) {
    if (e10.value = t.value, t.memo) e10.memo = true;
    return e10;
  }
  return e10.value = n.catchValue({ ...t, value: e10.value, error: { issues: t.issues.map((o) => Zr(o, r, Un())) }, input: e10.value }), e10;
}
var zC = I("$ZodCatch", (e10, t) => {
  Ke.init(e10, t), Me(e10, "optin", (n) => n.def.innerType._zod.optin === "defaulted" ? "defaulted" : "optional"), Me(e10, "optout", (n) => n.def.innerType._zod.optout), Me(e10, "values", (n) => n.def.innerType._zod.values), e10._zod.parse = (n, r) => {
    if (r.direction === "backward") return t.innerType._zod.run(n, r);
    let o = t.innerType._zod.run({ value: n.value, issues: [] }, r);
    if (o instanceof Promise) return o.then((s) => YM(n, s, t, r));
    return YM(n, o, t, r);
  };
});
var km = I("$ZodPipe", (e10, t) => {
  Ke.init(e10, t), Me(e10, "values", (n) => n.def.in._zod.values), Me(e10, "optin", (n) => n.def.in._zod.optin), Me(e10, "optout", (n) => n.def.out._zod.optout), Me(e10, "propValues", (n) => n.def.in._zod.propValues), e10._zod.parse = (n, r) => {
    if (r.direction === "backward") {
      let s = t.out._zod.run(n, r);
      if (s instanceof Promise) return s.then((i) => Rm(i, t.in, r));
      return Rm(s, t.in, r);
    }
    let o = t.in._zod.run(n, r);
    if (o instanceof Promise) return o.then((s) => Rm(s, t.out, r));
    return Rm(o, t.out, r);
  };
});
function Rm(e10, t, n) {
  if (e10.issues.some((r) => r.code !== "unrecognized_keys")) return e10.aborted = true, e10;
  return t._zod.run({ value: e10.value, issues: e10.issues }, n);
}
var dN = I("$ZodPreprocess", (e10, t) => {
  km.init(e10, t);
}), HC = I("$ZodReadonly", (e10, t) => {
  Ke.init(e10, t), Me(e10, "propValues", (n) => n.def.innerType._zod.propValues), Me(e10, "values", (n) => n.def.innerType._zod.values), Me(e10, "optin", (n) => n.def.innerType?._zod?.optin), Me(e10, "optout", (n) => n.def.innerType?._zod?.optout), e10._zod.parse = (n, r) => {
    if (r.direction === "backward") return t.innerType._zod.run(n, r);
    let o = t.innerType._zod.run(n, r);
    if (o instanceof Promise) return o.then(ZM);
    return ZM(o);
  };
});
function ZM(e10) {
  if (!e10.memo) e10.value = Object.freeze(e10.value);
  return e10;
}
var jC = I("$ZodLazy", (e10, t) => {
  Ke.init(e10, t), ju(e10._zod, "innerType", () => {
    let n = t;
    if (!n._cachedInner) n._cachedInner = t.getter();
    return n._cachedInner;
  }), Me(e10, "pattern", (n) => n.innerType?._zod?.pattern), Me(e10, "propValues", (n) => n.innerType?._zod?.propValues), Me(e10, "optin", (n) => n.innerType?._zod?.optin ?? void 0), Me(e10, "optout", (n) => n.innerType?._zod?.optout ?? void 0), e10._zod.parse = (n, r) => e10._zod.innerType._zod.run(n, r);
}), BC = I("$ZodCustom", (e10, t) => {
  Bt.init(e10, t), Ke.init(e10, t), e10._zod.parse = (n, r) => n, e10._zod.check = (n) => {
    let r = n.value, o = t.fn(r);
    if (o instanceof Promise) return o.then((s) => JM(s, n, r, e10));
    JM(o, n, r, e10);
    return;
  };
});
function JM(e10, t, n, r) {
  if (!e10) {
    let o = { code: "custom", input: n, inst: r, path: [...r._zod.def.path ?? []], continue: !r._zod.def.abort };
    if (r._zod.def.params) o.params = r._zod.def.params;
    t.issues.push(Yi(o));
  }
}
function XM(e10, t, n) {
  if (e10.issues.length) t.issues.push(...Fo(n, e10.issues));
}
I("$ZodProperties", (e10, t) => {
  Ke.init(e10, t), Bt.init(e10, t);
  let n = Cn.memoizer;
  n?.attach(e10);
  let r, o = (s, i) => {
    r ?? (r = Reflect.ownKeys(t.shape).map((c) => [c, t.shape[c]]));
    let a = s.value, l;
    for (let [c, d] of r) {
      let p = d._zod.run({ value: a[c], issues: [] }, i);
      if (p instanceof Promise) l ?? (l = []), l.push(p.then((f) => XM(f, s, c)));
      else XM(p, s, c);
    }
    if (l) return Promise.all(l).then(() => {
      return;
    });
    return;
  };
  e10._zod.parse = (s, i) => {
    let a = s.value;
    if (a === null || typeof a !== "object" && typeof a !== "function") return s.issues.push({ expected: "object", code: "invalid_type", input: a, inst: e10 }), s;
    if (i.direction === "backward") i = { ...i, direction: "forward" };
    if (n) n.alloc(e10, s, a, i);
    let l = o(s, i);
    return l instanceof Promise ? l.then(() => s) : s;
  }, e10._zod.check = (s) => {
    if (s.value == null) {
      s.issues.push({ expected: "object", code: "invalid_type", input: s.value, inst: e10 });
      return;
    }
    return o(s, {});
  };
}, { *[Symbol.iterator]() {
  yield this;
} });
class mN extends Error {
  constructor() {
    super("Cannot parse a reference cycle that closes through a transform");
    this.name = "ZodCyclicError";
  }
}
var GC = "~memo", fN = [];
function gN(e10) {
  return e10 !== null && (typeof e10 === "object" || typeof e10 === "function");
}
function KC(e10) {
  return e10.map((t) => t.path ? { ...t, path: t.path.slice() } : { ...t });
}
var hN = /* @__PURE__ */ new WeakMap(), td = 0, Dm = 1, nd = 2;
function Lm(e10, t, n) {
  let r = hN.get(e10);
  if (r !== void 0) return r ? nd : td;
  if (t.has(e10)) return nd;
  t.add(e10);
  let o = td, s = (d) => {
    if (o !== nd && d?._zod) {
      let p = Lm(d, t);
      if (p > o) o = p;
    }
  }, i = (d, p) => {
    let f = td;
    for (let m of Reflect.ownKeys(d)) {
      let g = Object.getOwnPropertyDescriptor(d, m);
      if (p && !g.enumerable) continue;
      let _ = g.get ? Dm : g.value?._zod ? Lm(g.value, t) : td;
      if (_ > f) f = _;
    }
    return f;
  }, a = (d) => {
    if (d > o) o = d;
  }, l = e10._zod.def, c = l.type;
  switch (c) {
    case "object": {
      let d = Bu(l);
      a(d ? i(d, true) : Dm), s(l.catchall);
      break;
    }
    case "properties":
      a(i(l.shape, false));
      break;
    case "array":
      s(l.element);
      break;
    case "tuple":
      for (let d of l.items) s(d);
      s(l.rest);
      break;
    case "record":
    case "map":
      s(l.keyType), s(l.valueType);
      break;
    case "set":
      s(l.valueType);
      break;
    case "union":
      for (let d of l.options) s(d);
      break;
    case "intersection":
      s(l.left), s(l.right);
      break;
    case "optional":
    case "nullable":
    case "default":
    case "prefault":
    case "catch":
    case "readonly":
    case "nonoptional":
    case "promise":
    case "success":
      s(l.innerType);
      break;
    case "pipe":
      s(l.in), s(l.out);
      break;
    case "function":
      s(l.input), s(l.output);
      break;
    case "lazy": {
      let d = l._cachedInner ?? void 0;
      a(d ? Lm(d, t) : Dm);
      break;
    }
    case "template_literal":
    case "string":
    case "number":
    case "int":
    case "boolean":
    case "bigint":
    case "symbol":
    case "undefined":
    case "null":
    case "void":
    case "never":
    case "any":
    case "unknown":
    case "date":
    case "nan":
    case "enum":
    case "literal":
    case "file":
    case "transform":
    case "custom":
      break;
    default:
      for (let d in l) {
        let p = Object.getOwnPropertyDescriptor(l, d);
        if (!p || p.get) continue;
        let f = p.value;
        if (!f || typeof f !== "object") continue;
        if (f._zod) s(f);
        else if (Array.isArray(f)) for (let m of f) s(m);
      }
  }
  return t.delete(e10), lAe(e10, o);
}
function lAe(e10, t) {
  if (t !== Dm) hN.set(e10, t === nd);
  return t;
}
function cAe(e10, t) {
  let n = e10.buckets.get(t);
  if (!n) n = /* @__PURE__ */ new WeakMap(), e10.buckets.set(t, n);
  return n;
}
var Pm, Im = [], uAe = { alloc(e10, t, n) {
  let r = Pm;
  if (!r) return n;
  Pm = void 0;
  let o = { value: n, issues: null };
  return r.set(t.value, o), Im.push(o), n;
}, guard(e10) {
  var t;
  (t = e10._zod).deferred ?? (t.deferred = []), e10._zod.deferred.push(() => {
    let n = e10._zod.parse, r = (o, s) => {
      if (s.direction !== "backward" && dAe(s, o.value)) throw new mN();
      return n(o, s);
    };
    if (e10._zod.parse = r, e10._zod.run === n) e10._zod.run = r;
  });
}, attach(e10) {
  var t;
  let n, r = false, o, s;
  (t = e10._zod).deferred ?? (t.deferred = []), e10._zod.deferred.push(() => {
    let i = e10._zod.parse, a = (l, c) => {
      if (n === void 0) {
        let S = Lm(e10, /* @__PURE__ */ new Set());
        if (S === td) {
          if (e10._zod.parse = i, e10._zod.run === a) e10._zod.run = i;
          return i(l, c);
        }
        if (S === nd || r) n = true;
        else r = true;
      }
      let d = l.value;
      if (!gN(d)) return i(l, c);
      let p = c[GC];
      if (!p) p = { buckets: /* @__PURE__ */ new WeakMap(), backEdges: void 0 }, c[GC] = p;
      let f;
      if (o === c) f = s;
      else f = cAe(p, e10), o = c, s = f;
      let m = f.get(d);
      if (m) {
        if (l.value = m.value, m.issues) {
          if (m.issues.length) l.issues.push(...KC(m.issues));
        } else l.memo = true, p.backEdges ?? (p.backEdges = /* @__PURE__ */ new WeakSet()), p.backEdges.add(m.value);
        return l;
      }
      Pm = f;
      let g = Im.length, _ = i(l, c);
      Pm = void 0;
      let y = Im.length > g ? Im.pop() : void 0;
      if (_ instanceof Promise) return _.then((S) => {
        if (y) y.issues = S.issues.length ? KC(S.issues) : fN;
        return S;
      });
      if (y) y.issues = _.issues.length ? KC(_.issues) : fN;
      return _;
    };
    if (e10._zod.parse = a, e10._zod.run === i) e10._zod.run = a;
  });
} };
function WC() {
  return uAe;
}
function dAe(e10, t) {
  let n = e10[GC]?.backEdges;
  return n !== void 0 && gN(t) && n.has(t);
}
var pAe = () => {
  let e10 = { string: { unit: "characters", verb: "to have" }, file: { unit: "bytes", verb: "to have" }, array: { unit: "items", verb: "to have" }, set: { unit: "items", verb: "to have" }, map: { unit: "entries", verb: "to have" } };
  function t(s) {
    return e10[s] ?? null;
  }
  let n = { regex: "input", email: "email address", url: "URL", emoji: "emoji", uuid: "UUID", uuidv4: "UUIDv4", uuidv6: "UUIDv6", nanoid: "nanoid", guid: "GUID", cuid: "cuid", cuid2: "cuid2", ulid: "ULID", xid: "XID", ksuid: "KSUID", datetime: "ISO datetime", date: "ISO date", time: "ISO time", duration: "ISO duration", ipv4: "IPv4 address", ipv6: "IPv6 address", mac: "MAC address", cidrv4: "IPv4 range", cidrv6: "IPv6 range", base64: "base64-encoded string", base64url: "base64url-encoded string", json_string: "JSON string", e164: "E.164 number", credit_card: "credit card number", iban: "IBAN", jwt: "JWT", template_literal: "input" }, r = { nan: "NaN" };
  function o(s, i) {
    if (s === "number" && typeof i === "number" && !Number.isFinite(i)) return String(i);
    return r[s] ?? s;
  }
  return (s) => {
    switch (s.code) {
      case "invalid_type": {
        let i = o(s.expected), a = UL(s.input), l = o(a, s.input);
        return `Invalid input: expected ${i}, received ${l}`;
      }
      case "invalid_value":
        if (s.values.length === 1) return `Invalid input: expected ${Db(s.values[0])}`;
        return `Invalid option: expected one of ${Pb(s.values, "|")}`;
      case "too_big": {
        let i = s.exact ? "exactly " : s.inclusive ? "<=" : "<", a = t(s.origin);
        if (a) return `Too big: expected ${s.origin ?? "value"} to have ${i}${s.maximum.toString()} ${a.unit ?? "elements"}`;
        return `Too big: expected ${s.origin ?? "value"} to be ${i}${s.maximum.toString()}`;
      }
      case "too_small": {
        let i = s.exact ? "exactly " : s.inclusive ? ">=" : ">", a = t(s.origin);
        if (a) return `Too small: expected ${s.origin} to have ${i}${s.minimum.toString()} ${a.unit}`;
        return `Too small: expected ${s.origin} to be ${i}${s.minimum.toString()}`;
      }
      case "invalid_format": {
        let i = s;
        if (i.format === "starts_with") return `Invalid string: must start with "${i.prefix}"`;
        if (i.format === "ends_with") return `Invalid string: must end with "${i.suffix}"`;
        if (i.format === "includes") return `Invalid string: must include "${i.includes}"`;
        if (i.format === "regex") return `Invalid string: must match pattern ${i.pattern}`;
        return `Invalid ${n[i.format] ?? s.format}`;
      }
      case "not_multiple_of":
        return `Invalid number: must be a multiple of ${s.divisor}`;
      case "unrecognized_keys":
        return `Unrecognized key${s.keys.length > 1 ? "s" : ""}: ${Pb(s.keys, ", ")}`;
      case "invalid_key":
        return `Invalid key in ${s.origin}`;
      case "invalid_union":
        if (s.options && Array.isArray(s.options) && s.options.length > 0) return `Invalid discriminator value. Expected ${s.options.map((a) => `'${a}'`).join(" | ")}`;
        if (s.inclusive === false) return "Invalid input: more than one option matched";
        return "Invalid input";
      case "invalid_element":
        return `Invalid value in ${s.origin}`;
      default:
        return "Invalid input";
    }
  };
};
function VC() {
  return { localeError: pAe() };
}
var _N;
class yN {
  constructor() {
    this._map = /* @__PURE__ */ new WeakMap(), this._idmap = /* @__PURE__ */ new Map();
  }
  add(e10, ...t) {
    let n = t[0];
    if (this._map.set(e10, n), n && typeof n === "object" && "id" in n) this._idmap.set(n.id, e10);
    return this;
  }
  clear() {
    return this._map = /* @__PURE__ */ new WeakMap(), this._idmap = /* @__PURE__ */ new Map(), this;
  }
  remove(e10) {
    let t = this._map.get(e10);
    if (t && typeof t === "object" && "id" in t) this._idmap.delete(t.id);
    return this._map.delete(e10), this;
  }
  get(e10) {
    let t = e10._zod.parent;
    if (t) {
      let n = { ...this.get(t) ?? {} };
      delete n.id;
      let r = { ...n, ...this._map.get(e10) };
      return Object.keys(r).length ? r : void 0;
    }
    return this._map.get(e10);
  }
  has(e10) {
    return this._map.has(e10);
  }
}
function SN() {
  return new yN();
}
(_N = globalThis).__zod_globalRegistry ?? (_N.__zod_globalRegistry = SN());
var Lr = globalThis.__zod_globalRegistry;
function qC(e10, t) {
  return new e10({ type: "string", ...ne(t) });
}
function EN(e10, t) {
  return new e10({ type: "string", coerce: true, ...ne(t) });
}
function YC(e10, t) {
  return new e10({ type: "string", format: "email", check: "string_format", abort: false, ...ne(t) });
}
function ZC(e10, t) {
  return new e10({ type: "string", format: "guid", check: "string_format", abort: false, ...ne(t) });
}
function JC(e10, t) {
  return new e10({ type: "string", format: "uuid", check: "string_format", abort: false, ...ne(t) });
}
function XC(e10, t) {
  return new e10({ type: "string", format: "uuid", check: "string_format", abort: false, version: "v4", ...ne(t) });
}
function QC(e10, t) {
  return new e10({ type: "string", format: "uuid", check: "string_format", abort: false, version: "v6", ...ne(t) });
}
function eA(e10, t) {
  return new e10({ type: "string", format: "uuid", check: "string_format", abort: false, version: "v7", ...ne(t) });
}
function tA(e10, t) {
  return new e10({ type: "string", format: "url", check: "string_format", abort: false, ...ne(t) });
}
function nA(e10, t) {
  return new e10({ type: "string", format: "emoji", check: "string_format", abort: false, ...ne(t) });
}
function rA(e10, t) {
  return new e10({ type: "string", format: "nanoid", check: "string_format", abort: false, ...ne(t) });
}
function oA(e10, t) {
  return new e10({ type: "string", format: "cuid", check: "string_format", abort: false, ...ne(t) });
}
function sA(e10, t) {
  return new e10({ type: "string", format: "cuid2", check: "string_format", abort: false, ...ne(t) });
}
function iA(e10, t) {
  return new e10({ type: "string", format: "ulid", check: "string_format", abort: false, ...ne(t) });
}
function aA(e10, t) {
  return new e10({ type: "string", format: "xid", check: "string_format", abort: false, ...ne(t) });
}
function lA(e10, t) {
  return new e10({ type: "string", format: "ksuid", check: "string_format", abort: false, ...ne(t) });
}
function cA(e10, t) {
  return new e10({ type: "string", format: "ipv4", check: "string_format", abort: false, ...ne(t) });
}
function uA(e10, t) {
  return new e10({ type: "string", format: "ipv6", check: "string_format", abort: false, ...ne(t) });
}
function dA(e10, t) {
  return new e10({ type: "string", format: "cidrv4", check: "string_format", abort: false, ...ne(t) });
}
function pA(e10, t) {
  return new e10({ type: "string", format: "cidrv6", check: "string_format", abort: false, ...ne(t) });
}
function fA(e10, t) {
  return new e10({ type: "string", format: "base64", check: "string_format", abort: false, ...ne(t) });
}
function mA(e10, t) {
  return new e10({ type: "string", format: "base64url", check: "string_format", abort: false, ...ne(t) });
}
function gA(e10, t) {
  return new e10({ type: "string", format: "e164", check: "string_format", abort: false, ...ne(t) });
}
function hA(e10, t) {
  return new e10({ type: "string", format: "jwt", check: "string_format", abort: false, ...ne(t) });
}
function Mm(e10, t) {
  return new e10({ type: "string", format: "datetime", check: "string_format", offset: false, local: false, precision: null, ...ne(t) });
}
function _A(e10, t) {
  return new e10({ type: "string", format: "date", check: "string_format", ...ne(t) });
}
function yA(e10, t) {
  return new e10({ type: "string", format: "time", check: "string_format", precision: null, ...ne(t) });
}
function SA(e10, t) {
  return new e10({ type: "string", format: "duration", check: "string_format", ...ne(t) });
}
function EA(e10, t) {
  return new e10({ type: "number", checks: [], ...ne(t) });
}
function bA(e10, t) {
  return new e10({ type: "number", check: "number_format", abort: false, format: "safeint", ...ne(t) });
}
function CA(e10, t) {
  return new e10({ type: "boolean", ...ne(t) });
}
function AA(e10, t) {
  return new e10({ type: "undefined", ...ne(t) });
}
function RA(e10, t) {
  return new e10({ type: "null", ...ne(t) });
}
function OA(e10) {
  return new e10({ type: "unknown" });
}
function TA(e10, t) {
  return new e10({ type: "never", ...ne(t) });
}
function Nm(e10, t) {
  return new Zb({ check: "less_than", ...ne(t), value: e10, inclusive: false });
}
function rd(e10, t) {
  return new Zb({ check: "less_than", ...ne(t), value: e10, inclusive: true });
}
function Um(e10, t) {
  return new Jb({ check: "greater_than", ...ne(t), value: e10, inclusive: false });
}
function od(e10, t) {
  return new Jb({ check: "greater_than", ...ne(t), value: e10, inclusive: true });
}
function Fm(e10, t) {
  return new kM({ check: "multiple_of", ...ne(t), value: e10 });
}
function $m(e10, t) {
  return new IM({ check: "max_length", ...ne(t), maximum: e10 });
}
function ll(e10, t) {
  return new DM({ check: "min_length", ...ne(t), minimum: e10 });
}
function zm(e10, t) {
  return new LM({ check: "length_equals", ...ne(t), length: e10 });
}
function wA(e10, t) {
  return new MM({ check: "string_format", format: "regex", ...ne(t), pattern: e10 });
}
function xA(e10) {
  return new NM({ check: "string_format", format: "lowercase", ...ne(e10) });
}
function vA(e10) {
  return new UM({ check: "string_format", format: "uppercase", ...ne(e10) });
}
function kA(e10, t) {
  return new FM({ check: "string_format", format: "includes", ...ne(t), includes: e10 });
}
function PA(e10, t) {
  return new $M({ check: "string_format", format: "starts_with", ...ne(t), prefix: e10 });
}
function IA(e10, t) {
  return new zM({ check: "string_format", format: "ends_with", ...ne(t), suffix: e10 });
}
function Ps(e10) {
  return new HM({ check: "overwrite", tx: e10 });
}
function DA(e10) {
  return Ps((t) => t.normalize(e10));
}
function LA() {
  return Ps((e10) => e10.trim());
}
function MA() {
  return Ps((e10) => e10.toLowerCase());
}
function NA() {
  return Ps((e10) => e10.toUpperCase());
}
function UA() {
  return Ps((e10) => OL(e10));
}
function bN(e10, t, n) {
  return new e10({ type: "array", element: t, ...ne(n) });
}
function FA(e10, t, n) {
  let r = ne(n);
  return r.abort ?? (r.abort = true), new e10({ type: "custom", check: "custom", fn: t, ...r });
}
function $A(e10, t, n) {
  return new e10({ type: "custom", check: "custom", fn: t, ...ne(n) });
}
function zA(e10, t) {
  let n = fAe((r) => (r.addIssue = (o) => {
    if (typeof o === "string") r.issues.push(Yi(o, r.value, n._zod.def));
    else {
      let s = o;
      if (s.fatal) s.continue = false;
      if (s.code ?? (s.code = "custom"), !("input" in s)) s.input = r.value;
      s.inst ?? (s.inst = n), s.continue ?? (s.continue = !n._zod.def.abort), r.issues.push(Yi(s));
    }
  }, e10(r.value, r)), t);
  return n;
}
function fAe(e10, t) {
  let n = new Bt({ check: "custom", ...ne(t) });
  return n._zod.check = e10, n;
}
function sd(e10, ...t) {
  for (let n of t) for (let r of Reflect.ownKeys(n)) if (Object.prototype.propertyIsEnumerable.call(n, r)) Ln(e10, r, n[r]);
  return e10;
}
function ad(e10) {
  let t = e10?.target ?? "draft-2020-12";
  if (t === "draft-4") t = "draft-04";
  if (t === "draft-7") t = "draft-07";
  return { processors: e10.processors ?? {}, metadataRegistry: e10?.metadata ?? Lr, target: t, unrepresentable: e10?.unrepresentable ?? "throw", override: e10?.override ?? (() => {
  }), io: e10?.io ?? "output", counter: 0, seen: /* @__PURE__ */ new Map(), sharedDefsExtractedFor: void 0, sharedEmitDoneFor: void 0, cycles: e10?.cycles ?? "ref", reused: e10?.reused ?? "inline", intersections: [], deferred: [], external: e10?.external ?? void 0 };
}
function Nt(e10, t, n, r, o) {
  let s = typeof t.unrepresentable === "function" ? t.unrepresentable({ zodSchema: e10, path: r.path, message: o }) : t.unrepresentable;
  if (s === "any") return false;
  if (s === void 0 || s === "throw") throw Error(o);
  return Object.assign(n, s), true;
}
function Ze(e10, t, n = { path: [], schemaPath: [] }) {
  var r;
  let o = e10._zod.def, s = t.seen.get(e10);
  if (s) {
    if (s.count++, n.schemaPath.includes(e10)) s.cycle = n.path;
    return s.schema;
  }
  let i = { schema: {}, count: 1, cycle: void 0, path: n.path };
  t.seen.set(e10, i), t.sharedDefsExtractedFor = void 0, t.sharedEmitDoneFor = void 0;
  let a = e10._zod.toJSONSchema?.();
  if (a) i.schema = a;
  else {
    let d = { ...n, schemaPath: [...n.schemaPath, e10], path: n.path };
    if (e10._zod.processJSONSchema) e10._zod.processJSONSchema(t, i.schema, d);
    else {
      let f = i.schema, m = t.processors[o.type];
      if (!m) throw Error(`[toJSONSchema]: Non-representable type encountered: ${o.type}`);
      m(e10, t, f, d);
    }
    let p = e10._zod.parent;
    if (p) {
      if (!i.ref) i.ref = p;
      Ze(p, t, d), t.seen.get(p).isParent = true;
    }
  }
  let l = t.metadataRegistry.get(e10);
  if (l) sd(i.schema, l);
  if (t.io === "input" && ln(e10)) delete i.schema.examples, delete i.schema.default;
  if (t.io === "input" && "_prefault" in i.schema) (r = i.schema).default ?? (r.default = i.schema._prefault);
  return delete i.schema._prefault, t.seen.get(e10).schema;
}
function CN(e10) {
  return e10.replace(/~/g, "~0").replace(/\//g, "~1");
}
function ld(e10, t) {
  let n = e10.seen.get(t);
  if (!n) throw Error("Unprocessed schema. This is a bug in Zod.");
  if (e10.external && e10.sharedDefsExtractedFor === e10.external) return;
  let r = /* @__PURE__ */ new Map();
  for (let i of e10.seen.entries()) {
    let a = e10.metadataRegistry.get(i[0])?.id;
    if (a) {
      let l = r.get(a);
      if (l && l !== i[0]) throw Error(`Duplicate schema id "${a}" detected during JSON Schema conversion. Two different schemas cannot share the same id when converted together.`);
      r.set(a, i[0]);
    }
  }
  let o = (i) => {
    let a = e10.target === "draft-2020-12" ? "$defs" : "definitions";
    if (e10.external) {
      let p = e10.external.registry.get(i[0])?.id, f = e10.external.uri ?? ((g) => g);
      if (p) return { ref: f(p) };
      let m = i[1].defId ?? i[1].schema.id ?? `schema${e10.counter++}`;
      return i[1].defId = m, { defId: m, ref: `${f("__shared")}#/${a}/${CN(m)}` };
    }
    let l = "#", c = `${l}/${a}/`;
    if (i[1] === n && !i[1].schema.id) return { ref: l };
    let d = i[1].schema.id ?? `__schema${e10.counter++}`;
    return { defId: d, ref: c + CN(d) };
  }, s = (i) => {
    if (i[1].schema.$ref) return;
    let a = i[1], { ref: l, defId: c } = o(i);
    if (a.def = { ...a.schema }, c) a.defId = c;
    let d = a.schema;
    for (let p in d) delete d[p];
    d.$ref = l;
  };
  if (e10.cycles === "throw") for (let i of e10.seen.entries()) {
    let a = i[1];
    if (a.cycle) throw Error(`Cycle detected: #/${a.cycle?.join("/")}/<root>

Set the \`cycles\` parameter to \`"ref"\` to resolve cyclical schemas with defs.`);
  }
  for (let i of e10.seen.entries()) {
    let a = i[1];
    if (t === i[0]) {
      s(i);
      continue;
    }
    if (e10.external) {
      let c = e10.external.registry.get(i[0])?.id;
      if (t !== i[0] && c) {
        s(i);
        continue;
      }
    }
    if (e10.metadataRegistry.get(i[0])?.id) {
      s(i);
      continue;
    }
    if (a.cycle) {
      s(i);
      continue;
    }
    if (a.count > 1) {
      if (e10.reused === "ref") s(i);
    }
  }
  if (e10.external) e10.sharedDefsExtractedFor = e10.external;
}
function ON(e10) {
  let t = e10.anyOf;
  if (!Array.isArray(t) || t.length === 0 || e10.type !== void 0) return;
  let n = [];
  for (let r of t) {
    if (!r || typeof r !== "object") return;
    ON(r);
    let o = Object.keys(r);
    if (o.length !== 1 || o[0] !== "type") return;
    let s = r.type;
    for (let i of Array.isArray(s) ? s : [s]) {
      if (typeof i !== "string") return;
      if (!n.includes(i)) n.push(i);
    }
  }
  delete e10.anyOf, e10.type = n.length === 1 ? n[0] : n;
}
var TN = /* @__PURE__ */ new Set(["type", "properties", "required", "additionalProperties"]), AN = ["oneOf", "anyOf"];
function RN(e10) {
  let t = e10.additionalProperties;
  if (t === void 0 || t === false || typeof t !== "object" || t === null) return null;
  return Object.keys(t).length ? t : null;
}
function HA(e10) {
  let t = [];
  for (let s of e10) {
    if (typeof s !== "object" || s.type !== "object") return null;
    for (let i in s) if (!TN.has(i)) return null;
    t.push(s);
  }
  let n = {}, r = /* @__PURE__ */ new Set();
  for (let s of t) {
    for (let i in s.properties) {
      if (Object.prototype.hasOwnProperty.call(n, i)) continue;
      let a = [];
      for (let c of t) {
        let d = c.properties?.[i] ?? RN(c);
        if (d === null || d === void 0) continue;
        if (!a.some((p) => JSON.stringify(p) === JSON.stringify(d))) a.push(d);
      }
      let l = a.length === 1 ? a[0] : HA(a) ?? { allOf: a };
      Ln(n, i, l);
    }
    for (let i of s.required ?? []) r.add(i);
  }
  let o = { type: "object", properties: n };
  if (r.size) o.required = [...r];
  if (t.every((s) => s.additionalProperties === false)) o.additionalProperties = false;
  else {
    let s = [];
    for (let i of t) {
      let a = RN(i);
      if (a && !s.some((l) => JSON.stringify(l) === JSON.stringify(a))) s.push(a);
    }
    if (s.length === 1) o.additionalProperties = s[0];
    else if (s.length > 1) o.additionalProperties = { allOf: s };
  }
  return o;
}
function mAe(e10) {
  let t = e10.allOf;
  if (!Array.isArray(t) || t.length < 2) return;
  for (let o of TN) if (o in e10) return;
  let n = t.filter((o) => AN.some((s) => Array.isArray(o[s]))), r = null;
  if (!n.length) r = HA(t);
  else {
    let o = n[0], s = AN.find((l) => Array.isArray(o[l]));
    if (Object.keys(o).length !== 1) return;
    let i = t.filter((l) => l !== o), a = o[s].map((l) => HA([...i, l]));
    if (a.some((l) => !l)) return;
    r = { [s]: a };
  }
  if (!r) return;
  delete e10.allOf, sd(e10, r);
}
function cd(e10, t) {
  let n = e10.seen.get(t);
  if (!n) throw Error("Unprocessed schema. This is a bug in Zod.");
  let r = (a) => {
    let l = e10.seen.get(a);
    if (l.ref === null) return;
    let c = l.def ?? l.schema, d = { ...c }, p = l.ref;
    if (l.ref = null, p) {
      r(p);
      let m = e10.seen.get(p), g = m.schema;
      if (g.$ref && (e10.target === "draft-07" || e10.target === "draft-04" || e10.target === "openapi-3.0")) c.allOf = c.allOf ?? [], c.allOf.push(g);
      else sd(c, g);
      if (sd(c, d), a._zod.parent === p) for (let y in c) {
        if (y === "$ref" || y === "allOf") continue;
        if (!(y in d)) delete c[y];
      }
      if (g.$ref && m.def) for (let y in c) {
        if (y === "$ref" || y === "allOf") continue;
        if (y in m.def && JSON.stringify(c[y]) === JSON.stringify(m.def[y])) delete c[y];
      }
    }
    let f = a._zod.parent;
    if (f && f !== p) {
      r(f);
      let m = e10.seen.get(f);
      if (m?.schema.$ref) {
        if (c.$ref = m.schema.$ref, m.def) for (let g in c) {
          if (g === "$ref" || g === "allOf") continue;
          if (g in m.def && JSON.stringify(c[g]) === JSON.stringify(m.def[g])) delete c[g];
        }
      }
    }
    e10.override({ zodSchema: a, jsonSchema: c, path: l.path ?? [] });
  };
  if (!e10.external || e10.sharedEmitDoneFor !== e10.external) {
    for (let a of [...e10.seen.entries()].reverse()) r(a[0]);
    if (e10.target !== "openapi-3.0") for (let a of e10.seen.entries()) ON(a[1].def ?? a[1].schema);
    for (let a of e10.deferred) a();
    if (e10.intersections.length) {
      let a = /* @__PURE__ */ new Map();
      for (let l of e10.seen.values()) for (let c of [l.schema, l.def]) {
        let d = c?.allOf;
        if (!Array.isArray(d)) continue;
        let p = a.get(d);
        if (p) p.push(c);
        else a.set(d, [c]);
      }
      for (let l of e10.intersections) for (let c of a.get(l) ?? []) mAe(c);
    }
  }
  let o = {};
  if (e10.target === "draft-2020-12") o.$schema = "https://json-schema.org/draft/2020-12/schema";
  else if (e10.target === "draft-07") o.$schema = "http://json-schema.org/draft-07/schema#";
  else if (e10.target === "draft-04") o.$schema = "http://json-schema.org/draft-04/schema#";
  else if (e10.target === "openapi-3.0") ;
  if (e10.external?.uri) {
    let a = e10.external.registry.get(t)?.id;
    if (!a) throw Error("Schema is missing an `id` property");
    o.$id = e10.external.uri(a);
  }
  sd(o, n.defId ? n.schema : n.def ?? n.schema);
  let s = e10.metadataRegistry.get(t)?.id;
  if (s !== void 0 && o.id === s) delete o.id;
  let i = e10.external?.defs ?? {};
  if (!e10.external || e10.sharedEmitDoneFor !== e10.external) for (let a of e10.seen.entries()) {
    let l = a[1];
    if (l.def && l.defId) {
      if (l.def.id === l.defId) delete l.def.id;
      Ln(i, l.defId, l.def);
    }
  }
  if (e10.external) e10.sharedEmitDoneFor = e10.external;
  if (e10.external) ;
  else if (Object.keys(i).length > 0) if (e10.target === "draft-2020-12") o.$defs = i;
  else o.definitions = i;
  try {
    let a = JSON.parse(JSON.stringify(o));
    return Object.defineProperty(a, "~standard", { value: { ...t["~standard"], jsonSchema: { input: id(t, "input", e10.processors), output: id(t, "output", e10.processors) } }, enumerable: false, writable: false }), a;
  } catch (a) {
    throw Error("Error converting schema to JSON.");
  }
}
function ln(e10, t) {
  let n = t ?? { seen: /* @__PURE__ */ new Set() };
  if (n.seen.has(e10)) return false;
  n.seen.add(e10);
  let r = e10._zod.def;
  if (r.type === "transform") return true;
  if (r.type === "array") return ln(r.element, n);
  if (r.type === "set") return ln(r.valueType, n);
  if (r.type === "lazy") return ln(r.getter(), n);
  if (r.type === "promise" || r.type === "optional" || r.type === "nonoptional" || r.type === "nullable" || r.type === "readonly" || r.type === "default" || r.type === "prefault" || r.type === "catch") return ln(r.innerType, n);
  if (r.type === "intersection") return ln(r.left, n) || ln(r.right, n);
  if (r.type === "record" || r.type === "map") return ln(r.keyType, n) || ln(r.valueType, n);
  if (r.type === "pipe") {
    if (e10._zod.traits.has("$ZodCodec")) return true;
    return ln(r.in, n) || ln(r.out, n);
  }
  if (r.type === "object") {
    for (let o in r.shape) if (ln(r.shape[o], n)) return true;
    return false;
  }
  if (r.type === "union") {
    for (let o of r.options) if (ln(o, n)) return true;
    return false;
  }
  if (r.type === "tuple") {
    for (let o of r.items) if (ln(o, n)) return true;
    if (r.rest && ln(r.rest, n)) return true;
    return false;
  }
  return false;
}
var wN = (e10, t = {}) => (n) => {
  let r = ad({ ...n, processors: t });
  return Ze(e10, r), ld(r, e10), cd(r, e10);
}, id = (e10, t, n = {}) => (r) => {
  let { libraryOptions: o, target: s } = r ?? {}, i = ad({ ...o ?? {}, target: s, io: t, processors: n });
  return Ze(e10, i), ld(i, e10), cd(i, e10);
};
var cl = (e10, t, n) => {
  if (e10[t] === void 0 || n > e10[t]) e10[t] = n;
}, ul = (e10, t, n) => {
  if (e10[t] === void 0 || n < e10[t]) e10[t] = n;
}, xN = (e10, t) => {
  cl(e10, "minimum", t), ul(e10, "maximum", t);
}, DN = (e10, t) => {
  if (e10.multipleOf ?? (e10.multipleOf = []), !e10.multipleOf.includes(t)) e10.multipleOf.push(t);
}, LN = (e10, t) => {
  e10.patterns ?? (e10.patterns = /* @__PURE__ */ new Set()), e10.patterns.add(t);
}, MN = (e10, t) => {
  e10.mime = e10.mime ? e10.mime.filter((n) => t.includes(n)) : [...t];
}, NN = (e10, t) => {
  if (e10.format = t, t.includes("int")) e10.isInt = true;
}, vN = (e10, t) => cl(e10, "minimum", t.minimum), kN = (e10, t) => ul(e10, "maximum", t.maximum), PN = (e10) => (t, n) => {
  NN(t, n.format);
  let [r, o] = e10[n.format];
  cl(t, "minimum", r), ul(t, "maximum", o);
}, gAe = { greater_than: (e10, t) => cl(e10, t.inclusive ? "minimum" : "exclusiveMinimum", t.value), less_than: (e10, t) => ul(e10, t.inclusive ? "maximum" : "exclusiveMaximum", t.value), multiple_of: (e10, t) => DN(e10, t.value), number_format: PN(hm), bigint_format: PN(Lb), min_length: vN, max_length: kN, length_equals: (e10, t) => xN(e10, t.length), min_size: vN, max_size: kN, size_equals: (e10, t) => xN(e10, t.size), string_format: (e10, t) => {
  if (NN(e10, t.format), t.pattern) LN(e10, t.pattern);
  if (t.format === "base64" || t.format === "base64url") e10.contentEncoding = t.format;
  if (t.local || t.precision === -1) e10.laxFormat = true;
}, mime_type: (e10, t) => MN(e10, t.mime) };
function Fn(e10) {
  let t = {}, n = e10._zod.def, r = e10._zod.traits.has("$ZodCheck") ? [e10, ...n.checks ?? []] : n.checks ?? [];
  for (let s of r) gAe[s._zod.def.check]?.(t, s._zod.def);
  let o = e10._zod.bag;
  if (o.minimum !== void 0) cl(t, "minimum", o.minimum);
  if (o.exclusiveMinimum !== void 0) cl(t, "exclusiveMinimum", o.exclusiveMinimum);
  if (o.maximum !== void 0) ul(t, "maximum", o.maximum);
  if (o.exclusiveMaximum !== void 0) ul(t, "exclusiveMaximum", o.exclusiveMaximum);
  if (o.multipleOf !== void 0) DN(t, o.multipleOf);
  if (o.format !== void 0) {
    if (t.format ?? (t.format = o.format), o.format.includes("int")) t.isInt = true;
  }
  if (o.mime) MN(t, o.mime);
  for (let s of o.patterns ?? []) LN(t, s);
  return t;
}
var hAe = { guid: "uuid", url: "uri", datetime: "date-time", json_string: "json-string", regex: "" }, _Ae = /* @__PURE__ */ new Map([[hC, hM], [Tm, _M]]), UN = (e10) => _Ae.get(e10) ?? e10, KA = (e10, t, n, r) => {
  let o = n;
  o.type = "string";
  let { minimum: s, maximum: i, format: a, patterns: l, contentEncoding: c, laxFormat: d } = Fn(e10);
  if (typeof s === "number") o.minLength = s;
  if (typeof i === "number") o.maxLength = i;
  if (a) {
    if (o.format = hAe[a] ?? a, o.format === "") delete o.format;
    if (a === "time" || d) delete o.format;
  }
  if (c) o.contentEncoding = c;
  if (l && l.size > 0) {
    let p = [...l].map(UN);
    if (p.length === 1) o.pattern = p[0].source;
    else if (p.length > 1) o.allOf = [...p.map((f) => ({ ...t.target === "draft-07" || t.target === "draft-04" || t.target === "openapi-3.0" ? { type: "string" } : {}, pattern: f.source }))];
  }
}, GA = (e10, t, n, r) => {
  let o = n, { minimum: s, maximum: i, multipleOf: a, exclusiveMaximum: l, exclusiveMinimum: c, isInt: d } = Fn(e10);
  o.type = d ? "integer" : "number";
  let p = typeof c === "number" && c >= (s ?? Number.NEGATIVE_INFINITY), f = typeof l === "number" && l <= (i ?? Number.POSITIVE_INFINITY), m = t.target === "draft-04" || t.target === "openapi-3.0";
  if (p) if (m) o.minimum = c, o.exclusiveMinimum = true;
  else o.exclusiveMinimum = c;
  else if (typeof s === "number") o.minimum = s;
  if (f) if (m) o.maximum = l, o.exclusiveMaximum = true;
  else o.exclusiveMaximum = l;
  else if (typeof i === "number") o.maximum = i;
  if (a) {
    let g = /* @__PURE__ */ new Set();
    for (let S of a) if (Number.isFinite(S) && S !== 0) g.add(Math.abs(S));
    else Nt(e10, t, o, r, `A multipleOf divisor of ${S} cannot be represented in JSON Schema`);
    let [_, ...y] = g;
    if (_ !== void 0) o.multipleOf = _;
    if (y.length) o.allOf = [...o.allOf ?? [], ...y.map((S) => ({ multipleOf: S }))];
  }
}, WA = (e10, t, n, r) => {
  n.type = "boolean";
}, VA = (e10, t, n, r) => {
  if (t.target === "openapi-3.0") n.type = "string", n.nullable = true, n.enum = [null];
  else n.type = "null";
}, qA = (e10, t, n, r) => {
  Nt(e10, t, n, r, "Undefined cannot be represented in JSON Schema");
}, YA = (e10, t, n, r) => {
  n.not = {};
}, ZA = (e10, t, n, r) => {
}, JA = (e10, t, n, r) => {
  let o = e10._zod.def, s = Fu(o.entries);
  if (s.length === 0) {
    n.not = {};
    return;
  }
  if (s.every((i) => typeof i === "number")) n.type = "number";
  if (s.every((i) => typeof i === "string")) n.type = "string";
  n.enum = s;
}, XA = (e10, t, n, r) => {
  let o = e10._zod.def;
  if (o.values.length === 0) {
    n.not = {};
    return;
  }
  let s = [];
  for (let i of o.values) if (i === void 0) {
    if (Nt(e10, t, n, r, "Literal `undefined` cannot be represented in JSON Schema")) return;
  } else if (typeof i === "bigint") {
    if (Nt(e10, t, n, r, "BigInt literals cannot be represented in JSON Schema")) return;
    s.push(Number(i));
  } else s.push(i);
  if (s.length === 0) ;
  else if (s.length === 1) {
    let i = s[0];
    if (n.type = i === null ? "null" : typeof i, t.target === "draft-04" || t.target === "openapi-3.0") n.enum = [i];
    else n.const = i;
  } else {
    if (s.every((i) => typeof i === "number")) n.type = "number";
    if (s.every((i) => typeof i === "string")) n.type = "string";
    if (s.every((i) => typeof i === "boolean")) n.type = "boolean";
    if (s.every((i) => i === null)) n.type = "null";
    n.enum = s;
  }
}, QA = (e10, t, n, r) => {
  Nt(e10, t, n, r, "Custom types cannot be represented in JSON Schema");
}, eR = (e10, t, n, r) => {
  Nt(e10, t, n, r, "Transforms cannot be represented in JSON Schema");
}, tR = (e10, t, n, r) => {
  let o = n, s = e10._zod.def, { minimum: i, maximum: a } = Fn(e10);
  if (typeof i === "number") o.minItems = i;
  if (typeof a === "number") o.maxItems = a;
  o.type = "array", o.items = Ze(s.element, t, { ...r, path: [...r.path, "items"] });
};
function dl(e10) {
  let t = e10._zod.def;
  if (t.type === "pipe" && t.in._zod.traits.has("$ZodTransform")) return dl(t.out);
  if (t.type === "catch") return dl(t.innerType);
  return e10._zod.optin;
}
var nR = (e10, t, n, r) => {
  let o = n, s = e10._zod.def, i = s.shape;
  if (Object.getOwnPropertySymbols(i).length && Nt(e10, t, o, r, "Symbol keys cannot be represented in JSON Schema")) return;
  o.type = "object", o.properties = {};
  for (let d in i) Ln(o.properties, d, Ze(i[d], t, { ...r, path: [...r.path, "properties", d] }));
  let l = new Set(Object.keys(i)), c = new Set([...l].filter((d) => {
    let p = s.shape[d];
    if (t.io === "input") return dl(p) === void 0;
    else return p._zod.optout === void 0;
  }));
  if (c.size > 0) o.required = Array.from(c);
  if (s.catchall?._zod.def.type === "never") o.additionalProperties = false;
  else if (!s.catchall) {
    if (t.io === "output") o.additionalProperties = false;
  } else if (s.catchall) o.additionalProperties = Ze(s.catchall, t, { ...r, path: [...r.path, "additionalProperties"] });
}, rR = (e10, t, n, r) => {
  let o = e10._zod.def, s = o.inclusive === false, i = o.options.map((a, l) => Ze(a, t, { ...r, path: [...r.path, s ? "oneOf" : "anyOf", l] }));
  if (s) n.oneOf = i;
  else n.anyOf = i;
}, oR = (e10, t, n, r) => {
  let o = e10._zod.def, s = Ze(o.left, t, { ...r, path: [...r.path, "allOf", 0] }), i = Ze(o.right, t, { ...r, path: [...r.path, "allOf", 1] }), a = (c) => "allOf" in c && Object.keys(c).length === 1, l = [...a(s) ? s.allOf : [s], ...a(i) ? i.allOf : [i]];
  n.allOf = l, t.intersections.push(l);
};
function jA(e10, t, n) {
  if (t.$ref) {
    if (n.has(t)) return t;
    n.add(t);
    let g = e10.get(t)?.def;
    if (!g) return t;
    let _ = jA(e10, g, n);
    return _ === g ? t : _;
  }
  for (let g of ["anyOf", "oneOf"]) {
    let _ = t[g];
    if (!Array.isArray(_)) continue;
    let y = _.map((S) => jA(e10, S, n));
    if (y.some((S, E) => S !== _[E])) t = { ...t, [g]: y };
  }
  let r = Array.isArray(t.type) ? t.type : [t.type], o = !r.includes("string") && r.some((g) => g === "number" || g === "integer"), s = t.enum ?? (t.const !== void 0 ? [t.const] : void 0);
  if (!o && !s?.some((g) => typeof g === "number")) return t;
  let { minimum: i, maximum: a, exclusiveMinimum: l, exclusiveMaximum: c, multipleOf: d, format: p, id: f, ...m } = t;
  if (m.enum) m.enum = m.enum.map((g) => typeof g === "number" ? String(g) : g);
  else if (typeof m.const === "number") m.const = String(m.const);
  if (!o) return m;
  if (m.type = "string", !s) m.pattern = (r.includes("number") ? Xu : qb).source;
  return m;
}
var BA = /* @__PURE__ */ new WeakMap();
function SAe(e10) {
  let t = /* @__PURE__ */ new Map();
  for (let r of e10.seen.values()) if (r.def && !t.has(r.schema)) t.set(r.schema, r);
  let n = /* @__PURE__ */ new Map();
  for (let r of BA.get(e10) ?? []) {
    let o = e10.seen.get(r), s = (o?.def ?? o?.schema)?.propertyNames;
    if (!s || s === true || n.has(s)) continue;
    let i = jA(t, s, /* @__PURE__ */ new Set());
    if (i !== s) n.set(s, i);
  }
  if (!n.size) return;
  for (let r of e10.seen.values()) for (let o of [r.schema, r.def]) {
    let s = o && n.get(o.propertyNames);
    if (s) o.propertyNames = s;
  }
}
var sR = (e10, t, n, r) => {
  let o = n, s = e10._zod.def;
  o.type = "object";
  let i = s.keyType, a = Fn(i).patterns;
  if (s.mode === "loose" && a && a.size > 0) {
    let d = Ze(s.valueType, t, { ...r, path: [...r.path, "patternProperties", "*"] });
    o.patternProperties = {};
    for (let p of a) Ln(o.patternProperties, UN(p).source, d);
  } else {
    if (t.target === "draft-07" || t.target === "draft-2020-12") {
      o.propertyNames = Ze(s.keyType, t, { ...r, path: [...r.path, "propertyNames"] });
      let d = BA.get(t);
      if (!d) d = [], BA.set(t, d), t.deferred.push(() => SAe(t));
      d.push(e10);
    }
    o.additionalProperties = Ze(s.valueType, t, { ...r, path: [...r.path, "additionalProperties"] });
  }
  let l = i._zod.values, c = t.io === "input" && dl(s.valueType) !== void 0;
  if (l && !s.partial && !c) {
    let d = [...l].filter((p) => typeof p === "string" || typeof p === "number");
    if (d.length > 0) o.required = d.map(String);
  }
}, iR = (e10, t, n, r) => {
  let o = e10._zod.def, s = Ze(o.innerType, t, r), i = t.seen.get(e10);
  if (t.target === "openapi-3.0") i.ref = o.innerType, n.nullable = true;
  else n.anyOf = [s, { type: "null" }];
}, aR = (e10, t, n, r) => {
  let o = e10._zod.def;
  Ze(o.innerType, t, r);
  let s = t.seen.get(e10);
  s.ref = o.innerType;
}, lR = /* @__PURE__ */ Symbol();
function JN(e10, t, n, r, o) {
  let s = false, i = JSON.stringify(e10, (a, l) => {
    if (typeof l !== "bigint") return l;
    return s = true, null;
  });
  if (!s) return JSON.parse(i);
  return Nt(t, n, r, o, "BigInt defaults cannot be represented in JSON Schema"), lR;
}
var cR = (e10, t, n, r) => {
  let o = e10._zod.def;
  Ze(o.innerType, t, r);
  let s = t.seen.get(e10);
  s.ref = o.innerType;
  let i = JN(o.defaultValue, e10, t, n, r);
  if (i !== lR) n.default = i;
}, uR = (e10, t, n, r) => {
  let o = e10._zod.def;
  Ze(o.innerType, t, r);
  let s = t.seen.get(e10);
  if (s.ref = o.innerType, t.io !== "input") return;
  let i = JN(o.defaultValue, e10, t, n, r);
  if (i !== lR) n._prefault = i;
}, dR = (e10, t, n, r) => {
  let o = e10._zod.def;
  Ze(o.innerType, t, r);
  let s = t.seen.get(e10);
  s.ref = o.innerType;
  let i;
  try {
    i = o.catchValue(void 0);
  } catch {
    Nt(e10, t, n, r, "Dynamic catch values are not supported in JSON Schema");
    return;
  }
  n.default = i;
}, pR = (e10, t, n, r) => {
  let o = e10._zod.def, s = o.in._zod.traits.has("$ZodTransform"), i = t.io === "input" ? s ? o.out : o.in : o.out;
  Ze(i, t, r);
  let a = t.seen.get(e10);
  a.ref = i;
}, fR = (e10, t, n, r) => {
  let o = e10._zod.def;
  Ze(o.innerType, t, r);
  let s = t.seen.get(e10);
  s.ref = o.innerType, n.readOnly = true;
}, Hm = (e10, t, n, r) => {
  let o = e10._zod.def;
  Ze(o.innerType, t, r);
  let s = t.seen.get(e10);
  s.ref = o.innerType;
}, mR = (e10, t, n, r) => {
  let o = e10._zod.innerType;
  Ze(o, t, r);
  let s = t.seen.get(e10);
  s.ref = o;
};
var eU = new WeakSet([Object.prototype, Error.prototype]);
function jm(e10, t, n) {
  Object.defineProperty(e10, t, { configurable: true, enumerable: false, get() {
    let r = n(this);
    return Object.defineProperty(this, t, { value: r, configurable: true, writable: true }), r;
  }, set(r) {
    Object.defineProperty(this, t, { value: r, configurable: true, writable: true });
  } });
}
var TAe = (e10, t) => {
  GL.init(e10, t), e10.name = "ZodError";
  let n = Object.getPrototypeOf(e10);
  if (eU.has(n)) return;
  eU.add(n), jm(n, "format", (r) => (o) => Bb(r, o)), jm(n, "flatten", (r) => (o) => jb(r, o)), jm(n, "addIssue", (r) => (o) => {
    r.issues.push(o), r.message = JSON.stringify(r.issues, $u, 2);
  }), jm(n, "addIssues", (r) => (o) => {
    r.issues.push(...o), r.message = JSON.stringify(r.issues, $u, 2);
  }), Object.defineProperty(n, "isEmpty", { configurable: true, enumerable: false, get() {
    return this.issues.length === 0;
  } });
};
var Yn = I("ZodError", TAe, void 0, { Parent: Error });
var tU = Wu(Yn), nU = Vu(Yn), rU = qu(Yn), oU = Zu(Yn), sU = VL(Yn), iU = qL(Yn), aU = YL(Yn), lU = ZL(Yn), cU = JL(Yn), uU = XL(Yn), dU = QL(Yn), pU = eM(Yn);
function hRe() {
  if (!Cn.localeError) Un(VC());
}
function Km() {
  if (!Cn.memoizer) Un({ memoizer: WC() });
}
var Je = I("ZodType", (e10, t) => (hRe(), Ke.init(e10, t), e10.def = t, e10.type = t.type, e10), { check(...e10) {
  let t = this.def;
  return this.clone(Mn(t, { checks: [...t.checks ?? [], ...e10.map((n) => typeof n === "function" ? { _zod: { check: n, def: { check: "custom" }, onattach: [] } } : n)] }), { parent: true });
}, with(...e10) {
  return this.check(...e10);
}, clone(e10, t) {
  return Nn(this, e10, t);
}, brand() {
  return this;
}, register(e10, t) {
  return e10.add(this, t), this;
}, refine(e10, t) {
  return this.check(rOe(e10, t));
}, superRefine(e10, t) {
  return this.check(oOe(e10, t));
}, overwrite(e10) {
  return this.check(Ps(e10));
}, optional() {
  return pt(this);
}, exactOptional() {
  return GRe(this);
}, nullable() {
  return fU(this);
}, nullish() {
  return pt(fU(this));
}, nonoptional(e10) {
  return JRe(this, e10);
}, array() {
  return k(this);
}, or(e10) {
  return re([this, e10]);
}, and(e10) {
  return Wm(this, e10);
}, transform(e10) {
  return mU(this, CU(e10));
}, default(e10) {
  return qRe(this, e10);
}, prefault(e10) {
  return ZRe(this, e10);
}, catch(e10) {
  return XRe(this, e10);
}, pipe(e10) {
  return mU(this, e10);
}, readonly() {
  return tOe(this);
}, describe(e10) {
  let t = this.clone();
  return Lr.add(t, { description: e10 }), t;
}, meta(...e10) {
  if (e10.length === 0) return Lr.get(this);
  let t = this.clone();
  return Lr.add(t, e10[0]), t;
}, isOptional() {
  return this.safeParse(void 0).success;
}, isNullable() {
  return this.safeParse(null).success;
}, apply(e10, ...t) {
  return t.length === 0 ? e10(this) : e10(this, ...t);
}, get "~standard"() {
  return Ub(this, "~standard", { ...eC(this), jsonSchema: { input: id(this, "input"), output: id(this, "output") } });
}, set "~standard"(e10) {
  Ir(this, "~standard", e10);
}, parse: function e(t, n) {
  return tU(this, t, n, { callee: e });
}, parseAsync: async function e2(t, n) {
  return await nU(this, t, n, { callee: e2 });
}, safeParse(e10, t) {
  return rU(this, e10, t);
}, async safeParseAsync(e10, t) {
  return oU(this, e10, t);
}, get spa() {
  return this?.safeParseAsync;
}, set spa(e10) {
  Ir(this, "spa", e10);
}, validate(e10, t) {
  return bm(this, e10, t);
}, validateAsync(e10, t) {
  return Cm(this, e10, t);
}, encode: function e3(t, n) {
  return sU(this, t, n, { callee: e3 });
}, decode: function e4(t, n) {
  return iU(this, t, n, { callee: e4 });
}, encodeAsync: async function e6(t, n) {
  return await aU(this, t, n, { callee: e6 });
}, decodeAsync: async function e9(t, n) {
  return await lU(this, t, n, { callee: e9 });
}, safeEncode(e10, t) {
  return cU(this, e10, t);
}, safeDecode(e10, t) {
  return uU(this, e10, t);
}, async safeEncodeAsync(e10, t) {
  return dU(this, e10, t);
}, async safeDecodeAsync(e10, t) {
  return pU(this, e10, t);
}, toJSONSchema(e10) {
  return wN(this, {})(e10);
}, get description() {
  return Lr.get(this)?.description;
}, get _def() {
  return this._zod.def;
} }), gU = I("_ZodString", (e10, t) => {
  ed.init(e10, t), Je.init(e10, t), e10._zod.processJSONSchema = (n, r, o) => KA(e10, n, r);
}, $L({ format: (e10) => Fn(e10).format ?? null, minLength: (e10) => Fn(e10).minimum ?? null, maxLength: (e10) => Fn(e10).maximum ?? null }, { regex(...e10) {
  return this.check(wA(...e10));
}, includes(...e10) {
  return this.check(kA(...e10));
}, startsWith(...e10) {
  return this.check(PA(...e10));
}, endsWith(...e10) {
  return this.check(IA(...e10));
}, min(...e10) {
  return this.check(ll(...e10));
}, max(...e10) {
  return this.check($m(...e10));
}, length(...e10) {
  return this.check(zm(...e10));
}, nonempty(...e10) {
  return this.check(ll(1, ...e10));
}, lowercase(e10) {
  return this.check(xA(e10));
}, uppercase(e10) {
  return this.check(vA(e10));
}, trim() {
  return this.check(LA());
}, normalize(...e10) {
  return this.check(DA(...e10));
}, toLowerCase() {
  return this.check(MA());
}, toUpperCase() {
  return this.check(NA());
}, slugify() {
  return this.check(UA());
} })), yR = I("ZodString", (e10, t) => {
  ed.init(e10, t), gU.init(e10, t);
}, { email(e10) {
  return this.check(YC(_Re, e10));
}, url(e10) {
  return this.check(tA(SRe, e10));
}, jwt(e10) {
  return this.check(hA(LRe, e10));
}, emoji(e10) {
  return this.check(nA(ERe, e10));
}, guid(e10) {
  return this.check(ZC(yRe, e10));
}, uuid(e10) {
  return this.check(JC(Bm, e10));
}, uuidv4(e10) {
  return this.check(XC(Bm, e10));
}, uuidv6(e10) {
  return this.check(QC(Bm, e10));
}, uuidv7(e10) {
  return this.check(eA(Bm, e10));
}, nanoid(e10) {
  return this.check(rA(bRe, e10));
}, cuid(e10) {
  return this.check(oA(CRe, e10));
}, cuid2(e10) {
  return this.check(sA(ARe, e10));
}, ulid(e10) {
  return this.check(iA(RRe, e10));
}, base64(e10) {
  return this.check(fA(PRe, e10));
}, base64url(e10) {
  return this.check(mA(IRe, e10));
}, xid(e10) {
  return this.check(aA(ORe, e10));
}, ksuid(e10) {
  return this.check(lA(TRe, e10));
}, ipv4(e10) {
  return this.check(cA(wRe, e10));
}, ipv6(e10) {
  return this.check(uA(xRe, e10));
}, cidrv4(e10) {
  return this.check(dA(vRe, e10));
}, cidrv6(e10) {
  return this.check(pA(kRe, e10));
}, e164(e10) {
  return this.check(gA(DRe, e10));
}, datetime(e10) {
  return this.check(Mm(SR, e10));
}, date(e10) {
  return this.check(_A(hU, e10));
}, time(e10) {
  return this.check(yA(_U, e10));
}, duration(e10) {
  return this.check(SA(yU, e10));
} });
function h(e10) {
  return qC(yR, e10);
}
var Et = I("ZodStringFormat", (e10, t) => {
  rt.init(e10, t), gU.init(e10, t);
}), SR = I("ZodISODateTime", (e10, t) => {
  nN.init(e10, t), Et.init(e10, t);
}), hU = I("ZodISODate", (e10, t) => {
  rN.init(e10, t), Et.init(e10, t);
}), _U = I("ZodISOTime", (e10, t) => {
  oN.init(e10, t), Et.init(e10, t);
}), yU = I("ZodISODuration", (e10, t) => {
  sN.init(e10, t), Et.init(e10, t);
}), _Re = I("ZodEmail", (e10, t) => {
  rC.init(e10, t), Et.init(e10, t);
});
var yRe = I("ZodGUID", (e10, t) => {
  tC.init(e10, t), Et.init(e10, t);
});
var Bm = I("ZodUUID", (e10, t) => {
  nC.init(e10, t), Et.init(e10, t);
});
var SRe = I("ZodURL", (e10, t) => {
  oC.init(e10, t), Et.init(e10, t);
});
var ERe = I("ZodEmoji", (e10, t) => {
  sC.init(e10, t), Et.init(e10, t);
});
var bRe = I("ZodNanoID", (e10, t) => {
  iC.init(e10, t), Et.init(e10, t);
});
var CRe = I("ZodCUID", (e10, t) => {
  aC.init(e10, t), Et.init(e10, t);
});
var ARe = I("ZodCUID2", (e10, t) => {
  lC.init(e10, t), Et.init(e10, t);
});
var RRe = I("ZodULID", (e10, t) => {
  cC.init(e10, t), Et.init(e10, t);
});
var ORe = I("ZodXID", (e10, t) => {
  uC.init(e10, t), Et.init(e10, t);
});
var TRe = I("ZodKSUID", (e10, t) => {
  dC.init(e10, t), Et.init(e10, t);
});
var wRe = I("ZodIPv4", (e10, t) => {
  pC.init(e10, t), Et.init(e10, t);
});
var xRe = I("ZodIPv6", (e10, t) => {
  fC.init(e10, t), Et.init(e10, t);
});
var vRe = I("ZodCIDRv4", (e10, t) => {
  mC.init(e10, t), Et.init(e10, t);
});
var kRe = I("ZodCIDRv6", (e10, t) => {
  gC.init(e10, t), Et.init(e10, t);
});
var PRe = I("ZodBase64", (e10, t) => {
  _C.init(e10, t), Et.init(e10, t);
});
var IRe = I("ZodBase64URL", (e10, t) => {
  yC.init(e10, t), Et.init(e10, t);
});
var DRe = I("ZodE164", (e10, t) => {
  SC.init(e10, t), Et.init(e10, t);
});
var LRe = I("ZodJWT", (e10, t) => {
  EC.init(e10, t), Et.init(e10, t);
});
var ER = I("ZodNumber", (e10, t) => {
  wm.init(e10, t), Je.init(e10, t), e10._zod.processJSONSchema = (n, r, o) => GA(e10, n, r, o), e10.isFinite = true;
}, $L({ minValue: (e10) => {
  let { minimum: t, exclusiveMinimum: n } = Fn(e10);
  return Math.max(t ?? Number.NEGATIVE_INFINITY, n ?? Number.NEGATIVE_INFINITY);
}, maxValue: (e10) => {
  let { maximum: t, exclusiveMaximum: n } = Fn(e10);
  return Math.min(t ?? Number.POSITIVE_INFINITY, n ?? Number.POSITIVE_INFINITY);
}, isInt: (e10) => {
  let { isInt: t, multipleOf: n } = Fn(e10);
  return !!t || !!n?.some(Number.isSafeInteger);
}, format: (e10) => Fn(e10).format ?? null }, { gt(e10, t) {
  return this.check(Um(e10, t));
}, gte(e10, t) {
  return this.check(od(e10, t));
}, min(e10, t) {
  return this.check(od(e10, t));
}, lt(e10, t) {
  return this.check(Nm(e10, t));
}, lte(e10, t) {
  return this.check(rd(e10, t));
}, max(e10, t) {
  return this.check(rd(e10, t));
}, int(e10) {
  return this.check(ud(e10));
}, safe(e10) {
  return this.check(ud(e10));
}, positive(e10) {
  return this.check(Um(0, e10));
}, nonnegative(e10) {
  return this.check(od(0, e10));
}, negative(e10) {
  return this.check(Nm(0, e10));
}, nonpositive(e10) {
  return this.check(rd(0, e10));
}, multipleOf(e10, t) {
  return this.check(Fm(e10, t));
}, step(e10, t) {
  return this.check(Fm(e10, t));
}, finite() {
  return this;
} }));
function q(e10) {
  return EA(ER, e10);
}
var MRe = I("ZodNumberFormat", (e10, t) => {
  bC.init(e10, t), ER.init(e10, t);
});
function ud(e10) {
  return bA(MRe, e10);
}
var SU = I("ZodBoolean", (e10, t) => {
  CC.init(e10, t), Je.init(e10, t), e10._zod.processJSONSchema = (n, r, o) => WA(e10, n, r);
});
function x(e10) {
  return CA(SU, e10);
}
var NRe = I("ZodUndefined", (e10, t) => {
  AC.init(e10, t), Je.init(e10, t), e10._zod.processJSONSchema = (n, r, o) => qA(e10, n, r, o);
});
function bR(e10) {
  return AA(NRe, e10);
}
var URe = I("ZodNull", (e10, t) => {
  RC.init(e10, t), Je.init(e10, t), e10._zod.processJSONSchema = (n, r, o) => VA(e10, n, r);
});
function Ji(e10) {
  return RA(URe, e10);
}
var FRe = I("ZodUnknown", (e10, t) => {
  OC.init(e10, t), Je.init(e10, t), e10._zod.processJSONSchema = (n, r, o) => ZA();
});
function fe() {
  return OA(FRe);
}
var $Re = I("ZodNever", (e10, t) => {
  TC.init(e10, t), Je.init(e10, t), e10._zod.processJSONSchema = (n, r, o) => YA(e10, n, r);
});
function Gm(e10) {
  return TA($Re, e10);
}
var zRe = I("ZodArray", (e10, t) => {
  Km(), wC.init(e10, t), Je.init(e10, t), e10._zod.processJSONSchema = (n, r, o) => tR(e10, n, r, o), e10.element = t.element;
}, { min(e10, t) {
  return this.check(ll(e10, t));
}, nonempty(e10) {
  return this.check(ll(1, e10));
}, max(e10, t) {
  return this.check($m(e10, t));
}, length(e10, t) {
  return this.check(zm(e10, t));
}, unwrap() {
  return this.element;
} });
function k(e10, t) {
  return bN(zRe, e10, t);
}
var dd = I("ZodObject", (e10, t) => {
  Km(), uN.init(e10, t), Je.init(e10, t), e10._zod.processJSONSchema = (n, r, o) => nR(e10, n, r, o), Fb(e10, "shape", (n) => n._zod.def.shape, false);
}, { keyof() {
  return B(Object.keys(this._zod.def.shape));
}, catchall(e10) {
  return this.clone(Mn(this._zod.def, { catchall: e10 }));
}, passthrough() {
  return this.clone(Mn(this._zod.def, { catchall: fe() }));
}, loose() {
  return this.clone(Mn(this._zod.def, { catchall: fe() }));
}, strict() {
  return this.clone(Mn(this._zod.def, { catchall: Gm() }));
}, strip() {
  return this.clone(Mn(this._zod.def, { catchall: void 0 }));
}, extend(e10) {
  return PL(this, e10);
}, safeExtend(e10) {
  return DL(this, e10);
}, merge(e10) {
  return LL(this, e10);
}, pick(e10) {
  return vL(this, e10);
}, omit(e10) {
  return kL(this, e10);
}, partial(...e10) {
  return Mb(pl, this, e10[0]);
}, exactPartial(...e10) {
  return Mb(AU, this, e10[0], "exactPartial");
}, required(...e10) {
  return ML(RU, this, e10[0]);
} });
function O(e10, t) {
  let n = { type: "object", shape: e10 ?? {}, ...ne(t) };
  return new dd(n);
}
function CR(e10, t) {
  return new dd({ type: "object", shape: e10, catchall: Gm(), ...ne(t) });
}
function Kt(e10, t) {
  return new dd({ type: "object", shape: e10, catchall: fe(), ...ne(t) });
}
var EU = I("ZodUnion", (e10, t) => {
  xm.init(e10, t), Je.init(e10, t), e10._zod.processJSONSchema = (n, r, o) => rR(e10, n, r, o), e10.options = t.options;
});
function re(e10, t) {
  return new EU({ type: "union", options: e10, ...ne(t) });
}
var HRe = I("ZodDiscriminatedUnion", (e10, t) => {
  EU.init(e10, t), vC.init(e10, t);
});
function Xi(e10, t, n) {
  return new HRe({ type: "union", options: t, discriminator: e10, ...ne(n) });
}
var jRe = I("ZodIntersection", (e10, t) => {
  kC.init(e10, t), Je.init(e10, t), e10._zod.processJSONSchema = (n, r, o) => oR(e10, n, r, o);
});
function Wm(e10, t) {
  return new jRe({ type: "intersection", left: e10, right: t });
}
var hR = I("ZodRecord", (e10, t) => {
  Km(), PC.init(e10, t), Je.init(e10, t), e10._zod.processJSONSchema = (n, r, o) => sR(e10, n, r, o), e10.keyType = t.keyType, e10.valueType = t.valueType;
});
function W(e10, t, n) {
  if (!t || !t._zod) return new hR({ type: "record", keyType: h(), valueType: e10, ...ne(t) });
  return new hR({ type: "record", keyType: e10, valueType: t, ...ne(n) });
}
function bU(e10, t, n) {
  return new hR({ type: "record", keyType: e10, valueType: t, ...ne(n), partial: true });
}
var _R = I("ZodEnum", (e10, t) => {
  IC.init(e10, t), Je.init(e10, t), e10._zod.processJSONSchema = (r, o, s) => JA(e10, r, o), e10.enum = t.entries, e10.options = [...e10._zod.values];
  let n = new Set(Object.keys(t.entries));
  e10.extract = (r, o) => {
    let s = {};
    for (let i of r) if (n.has(i)) s[i] = t.entries[i];
    else throw Error(`Key ${i} not found in enum`);
    return new _R({ ...t, checks: [], ...ne(o), entries: s });
  }, e10.exclude = (r, o) => {
    let s = { ...t.entries };
    for (let i of r) if (n.has(i)) delete s[i];
    else throw Error(`Key ${i} not found in enum`);
    return new _R({ ...t, checks: [], ...ne(o), entries: s });
  };
});
function B(e10, t) {
  let n = Array.isArray(e10) ? Object.fromEntries(e10.map((r) => [r, r])) : e10;
  return new _R({ type: "enum", entries: n, ...ne(t) });
}
var BRe = I("ZodLiteral", (e10, t) => {
  DC.init(e10, t), Je.init(e10, t), e10._zod.processJSONSchema = (n, r, o) => XA(e10, n, r, o), e10.values = new Set(t.values), Object.defineProperty(e10, "value", { get() {
    if (t.values.length > 1) throw Error("This schema contains multiple valid literal values. Use `.values` instead.");
    return t.values[0];
  } });
});
function N(e10, t) {
  return new BRe({ type: "literal", values: Array.isArray(e10) ? e10 : [e10], ...ne(t) });
}
var KRe = I("ZodTransform", (e10, t) => {
  Km(), LC.init(e10, t), Je.init(e10, t), e10._zod.processJSONSchema = (n, r, o) => eR(e10, n, r, o), e10._zod.parse = (n, r) => {
    if (r.direction === "backward") throw new Ku(e10.constructor.name);
    n.addIssue = (s) => {
      if (typeof s === "string") n.issues.push(Yi(s, n.value, t));
      else {
        let i = s;
        if (i.fatal) i.continue = false;
        if (i.code ?? (i.code = "custom"), !("input" in i)) i.input = n.value;
        i.inst ?? (i.inst = e10), n.issues.push(Yi(i));
      }
    };
    let o = t.transform(n.value, n);
    if (o instanceof Promise) return o.then((s) => (n.value = s, n));
    return n.value = o, n;
  };
});
function CU(e10) {
  return new KRe({ type: "transform", transform: e10 });
}
var pl = I("ZodOptional", (e10, t) => {
  vm.init(e10, t), Je.init(e10, t), e10._zod.processJSONSchema = (n, r, o) => Hm(e10, n, r, o), e10.unwrap = () => e10._zod.def.innerType;
});
function pt(e10) {
  return new pl({ type: "optional", innerType: e10 });
}
var AU = I("ZodExactOptional", (e10, t) => {
  MC.init(e10, t), Je.init(e10, t), e10._zod.processJSONSchema = (n, r, o) => Hm(e10, n, r, o), e10.unwrap = () => e10._zod.def.innerType;
});
function GRe(e10) {
  return new AU({ type: "optional", innerType: e10 });
}
var WRe = I("ZodNullable", (e10, t) => {
  NC.init(e10, t), Je.init(e10, t), e10._zod.processJSONSchema = (n, r, o) => iR(e10, n, r, o), e10.unwrap = () => e10._zod.def.innerType;
});
function fU(e10) {
  return new WRe({ type: "nullable", innerType: e10 });
}
var VRe = I("ZodDefault", (e10, t) => {
  UC.init(e10, t), Je.init(e10, t), e10._zod.processJSONSchema = (n, r, o) => cR(e10, n, r, o), e10.unwrap = () => e10._zod.def.innerType, e10.removeDefault = e10.unwrap;
});
function qRe(e10, t) {
  return new VRe({ type: "default", innerType: e10, get defaultValue() {
    return typeof t === "function" ? t() : gm(t);
  } });
}
var YRe = I("ZodPrefault", (e10, t) => {
  FC.init(e10, t), Je.init(e10, t), e10._zod.processJSONSchema = (n, r, o) => uR(e10, n, r, o), e10.unwrap = () => e10._zod.def.innerType;
});
function ZRe(e10, t) {
  return new YRe({ type: "prefault", innerType: e10, get defaultValue() {
    return typeof t === "function" ? t() : gm(t);
  } });
}
var RU = I("ZodNonOptional", (e10, t) => {
  $C.init(e10, t), Je.init(e10, t), e10._zod.processJSONSchema = (n, r, o) => aR(e10, n, r, o), e10.unwrap = () => e10._zod.def.innerType;
});
function JRe(e10, t) {
  return new RU({ type: "nonoptional", innerType: e10, ...ne(t) });
}
var Vm = I("ZodCatch", (e10, t) => {
  zC.init(e10, t), Je.init(e10, t), e10._zod.processJSONSchema = (n, r, o) => dR(e10, n, r, o), e10.unwrap = () => e10._zod.def.innerType, e10.removeCatch = e10.unwrap;
});
function XRe(e10, t) {
  return new Vm({ type: "catch", innerType: e10, catchValue: typeof t === "function" ? t : zL(t) });
}
var pd = I("ZodPipe", (e10, t) => {
  km.init(e10, t), Je.init(e10, t), e10._zod.processJSONSchema = (n, r, o) => pR(e10, n, r, o), e10.in = t.in, e10.out = t.out;
});
function mU(e10, t) {
  return new pd({ type: "pipe", in: e10, out: t });
}
var QRe = I("ZodPreprocess", (e10, t) => {
  pd.init(e10, t), dN.init(e10, t);
}), eOe = I("ZodReadonly", (e10, t) => {
  HC.init(e10, t), Je.init(e10, t), e10._zod.processJSONSchema = (n, r, o) => fR(e10, n, r, o), e10.unwrap = () => e10._zod.def.innerType;
});
function tOe(e10) {
  return new eOe({ type: "readonly", innerType: e10 });
}
var nOe = I("ZodLazy", (e10, t) => {
  jC.init(e10, t), Je.init(e10, t), e10._zod.processJSONSchema = (n, r, o) => mR(e10, n, r, o), e10.unwrap = () => e10._zod.def.getter();
});
function qm(e10) {
  return new nOe({ type: "lazy", getter: e10 });
}
var OU = I("ZodCustom", (e10, t) => {
  BC.init(e10, t), Je.init(e10, t), e10._zod.processJSONSchema = (n, r, o) => QA(e10, n, r, o);
});
function Ym(e10, t) {
  return FA(OU, e10 ?? (() => true), t);
}
function rOe(e10, t = {}) {
  return $A(OU, e10, t);
}
function oOe(e10, t) {
  return zA(e10, t);
}
function Le(e10, t) {
  return new QRe({ type: "pipe", in: CU(e10), out: t });
}
var dr = { custom: "custom" };
function wU(e10) {
  return Mm(SR, e10);
}
function iOe(e10) {
  return EN(yR, e10);
}
class kU {
  resetters = [];
  built = [];
  lazy(e10) {
    let t, n = () => {
      t = void 0;
    };
    return this.resetters.push(n), () => {
      if (t === void 0) t = e10(), this.built.push(n);
      return t;
    };
  }
  builtCount() {
    return this.built.length;
  }
  releaseBuiltSince(e10) {
    for (let t of this.built.splice(e10)) t();
  }
  reset() {
    for (let e10 of this.resetters) e10();
    this.built.length = 0;
  }
}
var aOe = new kU();
function P(e10) {
  return aOe.lazy(e10);
}
P(() => O({ lineage: h().min(1), source: fe().optional() }));
var bOe = process.platform === "win32" ? 0 : un$1.constants.O_NONBLOCK;
process.platform === "win32" ? 0 : un$1.constants.O_NOFOLLOW | bOe;
var jU = ["commands", "agents", "output-styles", "skills", "workflows", "routines", "themes", "rules", "session-env", "uploads", "mcp-skill-archives", "usage-data", "mcp-discovery-cache"];
new Set(jU);
var GU = ["installed", "marketplaces", "flagged", "catalog", "inUseSweep"];
new Set(GU);
var WU = ["manifest", "catalog"];
new Set(WU);
var VU = ["world"];
new Set(VU);
var YU = ["backup", "corrupted"];
new Set(YU);
var $Oe = "cloud-snapshots";
var XU = /* @__PURE__ */ new Set(["memory", "tiny_memory", "bagel", $Oe, "bridge-pointer.json", ".session-aliases"]);
`${[...XU].join(", ")} are reserved: they name project-level entries, not sessions`;
function Mr(e10, t) {
  return;
}
function zn(e10) {
  return;
}
function cn(e10) {
  return e10 === void 0 ? void 0 : { source: e10, hoverRestOn: be() };
}
var O0 = 200;
function LTe(e10) {
  return [...e10.replace(/[\x00-\x1f\x7f-\x9f]/g, "")].slice(0, O0).join("");
}
function T0(e10) {
  return LTe(Jf(e10.trim())).trim();
}
var $Te = P(() => O({ customTitle: h() }));
function zTe(e10, t) {
  return pn.join(pn.dirname(e10), t, "custom-title.json");
}
async function ml(e10, t, n) {
  let r = await HTe(zTe(e10, t));
  if (r === void 0) return;
  let o;
  try {
    o = JSON.parse(r);
  } catch {
    return;
  }
  let s = $Te().safeParse(o);
  if (!s.success) return;
  return T0(s.data.customTitle) || void 0;
}
async function HTe(e10, t) {
  if (Qe()) return;
  try {
    return await promises.readFile(e10, "utf8");
  } catch {
    return;
  }
}
function se(e10) {
  return typeof e10 === "object" && e10 !== null && !Array.isArray(e10);
}
P(() => Kt({ type: N("continued-in"), continuedInSessionId: h() }));
P(() => Kt({ type: N("assistant"), isApiErrorMessage: x().optional(), message: Kt({ stop_reason: h().nullish() }).optional() }));
function gl(e10, t, n, r) {
  let { head: o, tail: s, mtime: i, size: a } = t, l = o.indexOf(`
`), c = l >= 0 ? o.slice(0, l) : o;
  if (c.includes('"isSidechain":true') || c.includes('"isSidechain": true')) return null;
  let d = Qt(s, "customTitle") || r || Qt(o, "customTitle") || Qt(s, "aiTitle") || Qt(o, "aiTitle") || void 0, p = fm(o) || void 0, f = nl(o, "timestamp"), m;
  if (f) {
    let b = Date.parse(f);
    if (!Number.isNaN(b)) m = b;
  }
  let g = d || Qt(s, "lastPrompt") || Qt(s, "summary") || p || tL(o);
  if (!g) return null;
  let _ = Qt(s, "gitBranch") || nl(o, "gitBranch") || void 0, y = dm(s, "relocated", "relocatedCwd") || nl(o, "cwd") || n || void 0, S = s.split(`
`).findLast((b) => b.includes('"type":"tag"') && b.includes('"tag":"')), E = S ? Qt(S, "tag") || void 0 : void 0;
  return { sessionId: e10, summary: g, lastModified: i, fileSize: a, customTitle: d, firstPrompt: p, gitBranch: _, cwd: y, tag: E, createdAt: m };
}
async function F0(e10, t = {}, n, r) {
  let o = Ve(e10);
  if (!o) return;
  let s = be(), a = await xs(o, t.dir, zn(), s, r);
  if (!a) return;
  let l = await Gi(a.filePath, cn(Mr(a.filePath)));
  if (!l) return;
  let c = Qt(l.tail, "customTitle") === void 0 ? await ml(a.filePath, o) : void 0;
  return gl(o, l, a.projectPath, c) ?? void 0;
}
var B0 = 4, ywe = 50;
Array.from({ length: B0 - 1 }, () => ywe);
new Int32Array(new SharedArrayBuffer(4));
process.platform === "win32" ? 0 : un$1.constants.O_NONBLOCK;
new async_hooks.AsyncLocalStorage();
var Ne;
(function(e10) {
  e10.assertEqual = (o) => {
  };
  function t(o) {
  }
  e10.assertIs = t;
  function n(o) {
    throw Error();
  }
  e10.assertNever = n, e10.arrayToEnum = (o) => {
    let s = {};
    for (let i of o) s[i] = i;
    return s;
  }, e10.getValidEnumValues = (o) => {
    let s = e10.objectKeys(o).filter((a) => typeof o[o[a]] !== "number"), i = {};
    for (let a of s) i[a] = o[a];
    return e10.objectValues(i);
  }, e10.objectValues = (o) => e10.objectKeys(o).map(function(s) {
    return o[s];
  }), e10.objectKeys = typeof Object.keys === "function" ? (o) => Object.keys(o) : (o) => {
    let s = [];
    for (let i in o) if (Object.prototype.hasOwnProperty.call(o, i)) s.push(i);
    return s;
  }, e10.find = (o, s) => {
    for (let i of o) if (s(i)) return i;
    return;
  }, e10.isInteger = typeof Number.isInteger === "function" ? (o) => Number.isInteger(o) : (o) => typeof o === "number" && Number.isFinite(o) && Math.floor(o) === o;
  function r(o, s = " | ") {
    return o.map((i) => typeof i === "string" ? `'${i}'` : i).join(s);
  }
  e10.joinValues = r, e10.jsonStringifyReplacer = (o, s) => {
    if (typeof s === "bigint") return s.toString();
    return s;
  };
})(Ne || (Ne = {}));
var yF;
(function(e10) {
  e10.mergeShapes = (t, n) => ({ ...t, ...n });
})(yF || (yF = {}));
Ne.arrayToEnum(["string", "nan", "number", "integer", "float", "boolean", "date", "bigint", "symbol", "function", "undefined", "null", "array", "object", "unknown", "promise", "void", "never", "map", "set"]);
Ne.arrayToEnum(["invalid_type", "invalid_literal", "custom", "invalid_union", "invalid_union_discriminator", "invalid_enum_value", "unrecognized_keys", "invalid_arguments", "invalid_return_type", "invalid_date", "invalid_string", "too_small", "too_big", "invalid_intersection_types", "not_multiple_of", "not_finite"]);
class Zn extends Error {
  get errors() {
    return this.issues;
  }
  constructor(e10) {
    super();
    this.issues = [], this.addIssue = (n) => {
      this.issues = [...this.issues, n];
    }, this.addIssues = (n = []) => {
      this.issues = [...this.issues, ...n];
    };
    let t = new.target.prototype;
    if (Object.setPrototypeOf) Object.setPrototypeOf(this, t);
    else this.__proto__ = t;
    this.name = "ZodError", this.issues = e10;
  }
  format(e10) {
    let t = e10 || function(o) {
      return o.message;
    }, n = { _errors: [] }, r = (o) => {
      for (let s of o.issues) if (s.code === "invalid_union") s.unionErrors.map(r);
      else if (s.code === "invalid_return_type") r(s.returnTypeError);
      else if (s.code === "invalid_arguments") r(s.argumentsError);
      else if (s.path.length === 0) n._errors.push(t(s));
      else {
        let i = n, a = 0;
        while (a < s.path.length) {
          let l = s.path[a], c = a === s.path.length - 1;
          if (l === "_errors") {
            if (c) i._errors.push(t(s));
            a++;
            continue;
          }
          if (!Object.prototype.hasOwnProperty.call(i, l)) if (l === "__proto__") Object.defineProperty(i, l, { value: { _errors: [] }, writable: true, enumerable: true, configurable: true });
          else i[l] = { _errors: [] };
          if (i = i[l], c) i._errors.push(t(s));
          a++;
        }
      }
    };
    return r(this), n;
  }
  static assert(e10) {
    if (!(e10 instanceof Zn)) throw Error(`Not a ZodError: ${e10}`);
  }
  toString() {
    return this.message;
  }
  get message() {
    return JSON.stringify(this.issues, Ne.jsonStringifyReplacer, 2);
  }
  get isEmpty() {
    return this.issues.length === 0;
  }
  flatten(e10 = (t) => t.message) {
    let t = /* @__PURE__ */ Object.create(null), n = [];
    for (let r of this.issues) if (r.path.length > 0) {
      let o = r.path[0];
      t[o] = t[o] || [], t[o].push(e10(r));
    } else n.push(e10(r));
    return { formErrors: n, fieldErrors: t };
  }
  get formErrors() {
    return this.flatten();
  }
}
Zn.create = (e10) => new Zn(e10);
var le;
(function(e10) {
  e10.errToObj = (t) => typeof t === "string" ? { message: t } : t || {}, e10.toString = (t) => typeof t === "string" ? t : t?.message;
})(le || (le = {}));
var j;
(function(e10) {
  e10.ZodString = "ZodString", e10.ZodNumber = "ZodNumber", e10.ZodNaN = "ZodNaN", e10.ZodBigInt = "ZodBigInt", e10.ZodBoolean = "ZodBoolean", e10.ZodDate = "ZodDate", e10.ZodSymbol = "ZodSymbol", e10.ZodUndefined = "ZodUndefined", e10.ZodNull = "ZodNull", e10.ZodAny = "ZodAny", e10.ZodUnknown = "ZodUnknown", e10.ZodNever = "ZodNever", e10.ZodVoid = "ZodVoid", e10.ZodArray = "ZodArray", e10.ZodObject = "ZodObject", e10.ZodUnion = "ZodUnion", e10.ZodDiscriminatedUnion = "ZodDiscriminatedUnion", e10.ZodIntersection = "ZodIntersection", e10.ZodTuple = "ZodTuple", e10.ZodRecord = "ZodRecord", e10.ZodMap = "ZodMap", e10.ZodSet = "ZodSet", e10.ZodFunction = "ZodFunction", e10.ZodLazy = "ZodLazy", e10.ZodLiteral = "ZodLiteral", e10.ZodEnum = "ZodEnum", e10.ZodEffects = "ZodEffects", e10.ZodNativeEnum = "ZodNativeEnum", e10.ZodOptional = "ZodOptional", e10.ZodNullable = "ZodNullable", e10.ZodDefault = "ZodDefault", e10.ZodCatch = "ZodCatch", e10.ZodPromise = "ZodPromise", e10.ZodBranded = "ZodBranded", e10.ZodPipeline = "ZodPipeline", e10.ZodReadonly = "ZodReadonly";
})(j || (j = {}));
var Bxe = I("ZodMiniType", (e10, t) => {
  if (!e10._zod) throw Error("Uninitialized schema in ZodMiniType.");
  Ke.init(e10, t), e10.def = t, e10.type = t.type;
}, { get with() {
  return this.check;
}, set with(e10) {
  Ir(this, "with", e10);
}, parse(e10, t) {
  return Kb(this, e10, t, { callee: this.parse });
}, parseAsync(e10, t) {
  return Gb(this, e10, t, { callee: this.parseAsync });
}, safeParse(e10, t) {
  return Yu(this, e10, t);
}, safeParseAsync(e10, t) {
  return Ju(this, e10, t);
}, check(...e10) {
  let t = this.def;
  return this.clone({ ...t, checks: [...t.checks ?? [], ...e10.map((n) => typeof n === "function" ? { _zod: { check: n, def: { check: "custom" }, onattach: [] } } : n)] }, { parent: true });
}, clone(e10, t) {
  return Nn(this, e10, t);
}, brand() {
  return this;
}, register(e10, t) {
  return e10.add(this, t), this;
}, apply(e10, ...t) {
  return t.length === 0 ? e10(this) : e10(this, ...t);
} });
I("ZodMiniObject", (e10, t) => {
  xC.init(e10, t), Bxe.init(e10, t), Fb(e10, "shape", (n) => n._zod.def.shape, false);
});
var $s = "io.modelcontextprotocol/related-task", Rg = "2.0", Wt = Ym((e10) => e10 !== null && (typeof e10 === "object" || typeof e10 === "function")), wF = re([h(), q().int()]), xF = h();
Kt({ ttl: q().optional(), pollInterval: q().optional() });
var Wxe = O({ ttl: q().optional() }), Vxe = O({ taskId: h() }), QR = Kt({ progressToken: wF.optional(), [$s]: Vxe.optional() }), Jn = O({ _meta: QR.optional() }), Fd = Jn.extend({ task: Wxe.optional() }), un = O({ method: h(), params: Jn.loose().optional() }), fr = O({ _meta: QR.optional() }), mr = O({ method: h(), params: fr.loose().optional() }), dn = Kt({ _meta: QR.optional() }), Og = re([h(), q().int()]), kF = O({ jsonrpc: N(Rg), id: Og, ...un.shape }).strict(), PF = O({ jsonrpc: N(Rg), ...mr.shape }).strict(), tO = O({ jsonrpc: N(Rg), id: Og, result: dn }).strict();
var ue;
(function(e10) {
  e10[e10.ConnectionClosed = -32e3] = "ConnectionClosed", e10[e10.RequestTimeout = -32001] = "RequestTimeout", e10[e10.ParseError = -32700] = "ParseError", e10[e10.InvalidRequest = -32600] = "InvalidRequest", e10[e10.MethodNotFound = -32601] = "MethodNotFound", e10[e10.InvalidParams = -32602] = "InvalidParams", e10[e10.InternalError = -32603] = "InternalError", e10[e10.UrlElicitationRequired = -32042] = "UrlElicitationRequired";
})(ue || (ue = {}));
var nO = O({ jsonrpc: N(Rg), id: Og.optional(), error: O({ code: q().int(), message: h(), data: fe().optional() }) }).strict();
re([kF, PF, tO, nO]);
re([tO, nO]);
var Tg = dn.strict(), qxe = fr.extend({ requestId: Og.optional(), reason: h().optional() }), wg = mr.extend({ method: N("notifications/cancelled"), params: qxe }), Yxe = O({ src: h(), mimeType: h().optional(), sizes: k(h()).optional(), theme: B(["light", "dark"]).optional() }), zd = O({ icons: k(Yxe).optional() }), Al = O({ name: h(), title: h().optional() }), LF = Al.extend({ ...Al.shape, ...zd.shape, version: h(), websiteUrl: h().optional(), description: h().optional() }), Zxe = Wm(O({ applyDefaults: x().optional() }), W(h(), fe())), Jxe = Le((e10) => {
  if (e10 && typeof e10 === "object" && !Array.isArray(e10)) {
    if (Object.keys(e10).length === 0) return { form: {} };
  }
  return e10;
}, Wm(O({ form: Zxe.optional(), url: Wt.optional() }), W(h(), fe()).optional())), Xxe = Kt({ list: Wt.optional(), cancel: Wt.optional(), requests: Kt({ sampling: Kt({ createMessage: Wt.optional() }).optional(), elicitation: Kt({ create: Wt.optional() }).optional() }).optional() }), Qxe = Kt({ list: Wt.optional(), cancel: Wt.optional(), requests: Kt({ tools: Kt({ call: Wt.optional() }).optional() }).optional() }), eve = O({ experimental: W(h(), Wt).optional(), sampling: O({ context: Wt.optional(), tools: Wt.optional() }).optional(), elicitation: Jxe.optional(), roots: O({ listChanged: x().optional() }).optional(), tasks: Xxe.optional(), extensions: W(h(), Wt).optional() }), tve = Jn.extend({ protocolVersion: h(), capabilities: eve, clientInfo: LF }), rO = un.extend({ method: N("initialize"), params: tve });
var nve = O({ experimental: W(h(), Wt).optional(), logging: Wt.optional(), completions: Wt.optional(), prompts: O({ listChanged: x().optional() }).optional(), resources: O({ subscribe: x().optional(), listChanged: x().optional() }).optional(), tools: O({ listChanged: x().optional() }).optional(), tasks: Qxe.optional(), extensions: W(h(), Wt).optional() }), rve = dn.extend({ protocolVersion: h(), capabilities: nve, serverInfo: LF, instructions: h().optional() }), oO = mr.extend({ method: N("notifications/initialized"), params: fr.optional() });
var xg = un.extend({ method: N("ping"), params: Jn.optional() }), ove = O({ progress: q(), total: pt(q()), message: pt(h()) }), sve = O({ ...fr.shape, ...ove.shape, progressToken: wF }), vg = mr.extend({ method: N("notifications/progress"), params: sve }), ive = Jn.extend({ cursor: xF.optional() }), Hd = un.extend({ params: ive.optional() }), jd = dn.extend({ nextCursor: xF.optional() }), ave = B(["working", "input_required", "completed", "failed", "cancelled"]), Bd = O({ taskId: h(), status: ave, ttl: re([q(), Ji()]), createdAt: h(), lastUpdatedAt: h(), pollInterval: pt(q()), statusMessage: pt(h()) }), Rl = dn.extend({ task: Bd }), lve = fr.merge(Bd), Kd = mr.extend({ method: N("notifications/tasks/status"), params: lve }), kg = un.extend({ method: N("tasks/get"), params: Jn.extend({ taskId: h() }) }), Pg = dn.merge(Bd), Ig = un.extend({ method: N("tasks/result"), params: Jn.extend({ taskId: h() }) });
dn.loose();
var Dg = Hd.extend({ method: N("tasks/list") }), Lg = jd.extend({ tasks: k(Bd) }), Mg = un.extend({ method: N("tasks/cancel"), params: Jn.extend({ taskId: h() }) });
dn.merge(Bd);
var NF = O({ uri: h(), mimeType: pt(h()), _meta: W(h(), fe()).optional() }), UF = NF.extend({ text: h() }), sO = h().refine((e10) => {
  try {
    return atob(e10), true;
  } catch {
    return false;
  }
}, { message: "Invalid Base64 string" }), FF = NF.extend({ blob: sO }), Gd = B(["user", "assistant"]), Ol = O({ audience: k(Gd).optional(), priority: q().min(0).max(1).optional(), lastModified: re([wU({ offset: true }), wU({ offset: true, precision: -1 })]).optional() }), $F = O({ ...Al.shape, ...zd.shape, uri: h(), description: pt(h()), mimeType: pt(h()), size: pt(q()), annotations: Ol.optional(), _meta: pt(Kt({})) }), cve = O({ ...Al.shape, ...zd.shape, uriTemplate: h(), description: pt(h()), mimeType: pt(h()), annotations: Ol.optional(), _meta: pt(Kt({})) }), Ng = Hd.extend({ method: N("resources/list") }), uve = jd.extend({ resources: k($F) }), Ug = Hd.extend({ method: N("resources/templates/list") }), dve = jd.extend({ resourceTemplates: k(cve) }), iO = Jn.extend({ uri: h() }), pve = iO, Fg = un.extend({ method: N("resources/read"), params: pve }), fve = dn.extend({ contents: k(re([UF, FF])) }), mve = mr.extend({ method: N("notifications/resources/list_changed"), params: fr.optional() }), gve = iO, hve = un.extend({ method: N("resources/subscribe"), params: gve }), _ve = iO, yve = un.extend({ method: N("resources/unsubscribe"), params: _ve }), Sve = fr.extend({ uri: h() }), Eve = mr.extend({ method: N("notifications/resources/updated"), params: Sve }), bve = O({ name: h(), description: pt(h()), required: pt(x()) }), Cve = O({ ...Al.shape, ...zd.shape, description: pt(h()), arguments: pt(k(bve)), _meta: pt(Kt({})) }), $g = Hd.extend({ method: N("prompts/list") }), Ave = jd.extend({ prompts: k(Cve) }), Rve = Jn.extend({ name: h(), arguments: W(h(), h()).optional() }), zg = un.extend({ method: N("prompts/get"), params: Rve }), aO = O({ type: N("text"), text: h(), annotations: Ol.optional(), _meta: W(h(), fe()).optional() }), lO = O({ type: N("image"), data: sO, mimeType: h(), annotations: Ol.optional(), _meta: W(h(), fe()).optional() }), cO = O({ type: N("audio"), data: sO, mimeType: h(), annotations: Ol.optional(), _meta: W(h(), fe()).optional() }), Ove = O({ type: N("tool_use"), name: h(), id: h(), input: W(h(), fe()), _meta: W(h(), fe()).optional() }), Tve = O({ type: N("resource"), resource: re([UF, FF]), annotations: Ol.optional(), _meta: W(h(), fe()).optional() }), wve = $F.extend({ type: N("resource_link") }), uO = re([aO, lO, cO, wve, Tve]), xve = O({ role: Gd, content: uO }), vve = dn.extend({ description: h().optional(), messages: k(xve) }), kve = mr.extend({ method: N("notifications/prompts/list_changed"), params: fr.optional() }), Pve = O({ title: h().optional(), readOnlyHint: x().optional(), destructiveHint: x().optional(), idempotentHint: x().optional(), openWorldHint: x().optional() }), Ive = O({ taskSupport: B(["required", "optional", "forbidden"]).optional() }), zF = O({ ...Al.shape, ...zd.shape, description: h().optional(), inputSchema: O({ type: N("object"), properties: W(h(), Wt).optional(), required: k(h()).optional() }).catchall(fe()), outputSchema: O({ type: N("object"), properties: W(h(), Wt).optional(), required: k(h()).optional() }).catchall(fe()).optional(), annotations: Pve.optional(), execution: Ive.optional(), _meta: W(h(), fe()).optional() }), Hg = Hd.extend({ method: N("tools/list") }), Dve = jd.extend({ tools: k(zF) }), jg = dn.extend({ content: k(uO).default([]), structuredContent: W(h(), fe()).optional(), isError: x().optional() });
jg.or(dn.extend({ toolResult: fe() }));
var Lve = Fd.extend({ name: h(), arguments: W(h(), fe()).optional() }), Tl = un.extend({ method: N("tools/call"), params: Lve }), Mve = mr.extend({ method: N("notifications/tools/list_changed"), params: fr.optional() });
O({ autoRefresh: x().default(true), debounceMs: q().int().nonnegative().default(300) });
var Wd = B(["debug", "info", "notice", "warning", "error", "critical", "alert", "emergency"]), Nve = Jn.extend({ level: Wd }), dO = un.extend({ method: N("logging/setLevel"), params: Nve }), Uve = fr.extend({ level: Wd, logger: h().optional(), data: fe() }), Fve = mr.extend({ method: N("notifications/message"), params: Uve }), $ve = O({ name: h().optional() }), zve = O({ hints: k($ve).optional(), costPriority: q().min(0).max(1).optional(), speedPriority: q().min(0).max(1).optional(), intelligencePriority: q().min(0).max(1).optional() }), Hve = O({ mode: B(["auto", "required", "none"]).optional() }), jve = O({ type: N("tool_result"), toolUseId: h().describe("The unique identifier for the corresponding tool call."), content: k(uO).default([]), structuredContent: O({}).loose().optional(), isError: x().optional(), _meta: W(h(), fe()).optional() }), Bve = Xi("type", [aO, lO, cO]), Ag = Xi("type", [aO, lO, cO, Ove, jve]), Kve = O({ role: Gd, content: re([Ag, k(Ag)]), _meta: W(h(), fe()).optional() }), Gve = Fd.extend({ messages: k(Kve), modelPreferences: zve.optional(), systemPrompt: h().optional(), includeContext: B(["none", "thisServer", "allServers"]).optional(), temperature: q().optional(), maxTokens: q().int(), stopSequences: k(h()).optional(), metadata: Wt.optional(), tools: k(zF).optional(), toolChoice: Hve.optional() }), Wve = un.extend({ method: N("sampling/createMessage"), params: Gve }), Vd = dn.extend({ model: h(), stopReason: pt(B(["endTurn", "stopSequence", "maxTokens"]).or(h())), role: Gd, content: Bve }), pO = dn.extend({ model: h(), stopReason: pt(B(["endTurn", "stopSequence", "maxTokens", "toolUse"]).or(h())), role: Gd, content: re([Ag, k(Ag)]) }), Vve = O({ type: N("boolean"), title: h().optional(), description: h().optional(), default: x().optional() }), qve = O({ type: N("string"), title: h().optional(), description: h().optional(), minLength: q().optional(), maxLength: q().optional(), format: B(["email", "uri", "date", "date-time"]).optional(), default: h().optional() }), Yve = O({ type: B(["number", "integer"]), title: h().optional(), description: h().optional(), minimum: q().optional(), maximum: q().optional(), default: q().optional() }), Zve = O({ type: N("string"), title: h().optional(), description: h().optional(), enum: k(h()), default: h().optional() }), Jve = O({ type: N("string"), title: h().optional(), description: h().optional(), oneOf: k(O({ const: h(), title: h() })), default: h().optional() }), Xve = O({ type: N("string"), title: h().optional(), description: h().optional(), enum: k(h()), enumNames: k(h()).optional(), default: h().optional() }), Qve = re([Zve, Jve]), eke = O({ type: N("array"), title: h().optional(), description: h().optional(), minItems: q().optional(), maxItems: q().optional(), items: O({ type: N("string"), enum: k(h()) }), default: k(h()).optional() }), tke = O({ type: N("array"), title: h().optional(), description: h().optional(), minItems: q().optional(), maxItems: q().optional(), items: O({ anyOf: k(O({ const: h(), title: h() })) }), default: k(h()).optional() }), nke = re([eke, tke]), rke = re([Xve, Qve, nke]), oke = re([rke, Vve, qve, Yve]), ske = Fd.extend({ mode: N("form").optional(), message: h(), requestedSchema: O({ type: N("object"), properties: W(h(), oke), required: k(h()).optional() }) }), ike = Fd.extend({ mode: N("url"), message: h(), elicitationId: h(), url: h().url() }), ake = re([ske, ike]), lke = un.extend({ method: N("elicitation/create"), params: ake }), cke = fr.extend({ elicitationId: h() }), uke = mr.extend({ method: N("notifications/elicitation/complete"), params: cke }), wl = dn.extend({ action: B(["accept", "decline", "cancel"]), content: Le((e10) => e10 === null ? void 0 : e10, W(h(), re([h(), q(), x(), k(h())])).optional()) }), dke = O({ type: N("ref/resource"), uri: h() });
var pke = O({ type: N("ref/prompt"), name: h() }), fke = Jn.extend({ ref: re([pke, dke]), argument: O({ name: h(), value: h() }), context: O({ arguments: W(h(), h()).optional() }).optional() }), Bg = un.extend({ method: N("completion/complete"), params: fke });
var mke = dn.extend({ completion: Kt({ values: k(h()).max(100), total: pt(q().int()), hasMore: pt(x()) }) }), gke = O({ uri: h().startsWith("file://"), name: h().optional(), _meta: W(h(), fe()).optional() }), hke = un.extend({ method: N("roots/list"), params: Jn.optional() }), fO = dn.extend({ roots: k(gke) }), _ke = mr.extend({ method: N("notifications/roots/list_changed"), params: fr.optional() });
re([xg, rO, Bg, dO, zg, $g, Ng, Ug, Fg, hve, yve, Tl, Hg, kg, Ig, Dg, Mg]);
re([wg, vg, oO, _ke, Kd]);
re([Tg, Vd, pO, wl, fO, Pg, Lg, Rl]);
re([xg, Wve, lke, hke, kg, Ig, Dg, Mg]);
re([wg, vg, Fve, Eve, mve, Mve, kve, Kd, uke]);
re([Tg, rve, mke, vve, Ave, uve, dve, fve, jg, Dve, Pg, Lg, Rl]);
new Set("ABCDEFGHIJKLMNOPQRSTUVXYZabcdefghijklmnopqrstuvxyz0123456789");
Jv(sT());
Jv(OK());
var kK;
(function(e10) {
  e10.Completable = "McpCompletable";
})(kK || (kK = {}));
var Zo = ["PreToolUse", "PostToolUse", "PostToolUseFailure", "PostToolBatch", "Notification", "UserPromptSubmit", "UserPromptExpansion", "SessionStart", "SessionEnd", "Stop", "StopFailure", "SubagentStart", "SubagentStop", "PreCompact", "PostCompact", "PreModelSwitch", "PostModelSwitch", "PermissionRequest", "PermissionDenied", "Setup", "TeammateIdle", "TaskCreated", "TaskCompleted", "Elicitation", "ElicitationResult", "ConfigChange", "WorktreeCreate", "WorktreeRemove", "InstructionsLoaded", "CwdChanged", "FileChanged", "DirectoryAdded", "MessageDisplay"];
function Jo(e10) {
  return !Array.isArray ? KK(e10) === "[object Array]" : Array.isArray(e10);
}
function w0e(e10) {
  if (typeof e10 == "string") return e10;
  let t = e10 + "";
  return t == "0" && 1 / e10 == -Infinity ? "-0" : t;
}
function x0e(e10) {
  return e10 == null ? "" : w0e(e10);
}
function mo(e10) {
  return typeof e10 === "string";
}
function jK(e10) {
  return typeof e10 === "number";
}
function v0e(e10) {
  return e10 === true || e10 === false || k0e(e10) && KK(e10) == "[object Boolean]";
}
function BK(e10) {
  return typeof e10 === "object";
}
function k0e(e10) {
  return BK(e10) && e10 !== null;
}
function Xn(e10) {
  return e10 !== void 0 && e10 !== null;
}
function KK(e10) {
  return e10 == null ? e10 === void 0 ? "[object Undefined]" : "[object Null]" : Object.prototype.toString.call(e10);
}
var D0e = (e10) => `Pattern length exceeds max of ${e10}.`;
function N0e(e10, t) {
  let n = [], r = false, o = (s, i, a) => {
    if (!Xn(s)) return;
    if (!i[a]) n.push(s);
    else {
      let l = i[a], c = s[l];
      if (!Xn(c)) return;
      if (a === i.length - 1 && (mo(c) || jK(c) || v0e(c))) n.push(x0e(c));
      else if (Jo(c)) {
        r = true;
        for (let d = 0, p = c.length; d < p; d += 1) o(c[d], i, a + 1);
      } else if (i.length) o(c, i, a + 1);
    }
  };
  return o(e10, mo(t) ? t.split(".") : t, 0), r ? n : n[0];
}
var U0e = { includeMatches: false, findAllMatches: false, minMatchCharLength: 1 }, F0e = { isCaseSensitive: false, includeScore: false, keys: [], shouldSort: true, sortFn: (e10, t) => e10.score === t.score ? e10.idx < t.idx ? -1 : 1 : e10.score < t.score ? -1 : 1 }, $0e = { location: 0, threshold: 0.6, distance: 100 }, z0e = { useExtendedSearch: false, getFn: N0e, ignoreLocation: false, ignoreFieldNorm: false, fieldNormWeight: 1 }, Ae = { ...F0e, ...U0e, ...$0e, ...z0e };
function Fh(e10, { errors: t = 0, currentLocation: n = 0, expectedLocation: r = 0, distance: o = Ae.distance, ignoreLocation: s = Ae.ignoreLocation } = {}) {
  let i = t / e10.length;
  if (s) return i;
  let a = Math.abs(r - n);
  if (!o) return a ? 1 : i;
  return i + a / o;
}
function K0e(e10 = [], t = Ae.minMatchCharLength) {
  let n = [], r = -1, o = -1, s = 0;
  for (let i = e10.length; s < i; s += 1) {
    let a = e10[s];
    if (a && r === -1) r = s;
    else if (!a && r !== -1) {
      if (o = s - 1, o - r + 1 >= t) n.push([r, o]);
      r = -1;
    }
  }
  if (e10[s - 1] && s - r >= t) n.push([r, s - 1]);
  return n;
}
var ua = 32;
function G0e(e10, t, n, { location: r = Ae.location, distance: o = Ae.distance, threshold: s = Ae.threshold, findAllMatches: i = Ae.findAllMatches, minMatchCharLength: a = Ae.minMatchCharLength, includeMatches: l = Ae.includeMatches, ignoreLocation: c = Ae.ignoreLocation } = {}) {
  if (t.length > ua) throw Error(D0e(ua));
  let d = t.length, p = e10.length, f = Math.max(0, Math.min(r, p)), m = s, g = f, _ = a > 1 || l, y = _ ? Array(p) : [], S;
  while ((S = e10.indexOf(t, g)) > -1) {
    let D = Fh(t, { currentLocation: S, expectedLocation: f, distance: o, ignoreLocation: c });
    if (m = Math.min(D, m), g = S + d, _) {
      let U = 0;
      while (U < d) y[S + U] = 1, U += 1;
    }
  }
  g = -1;
  let E = [], b = 1, C = d + p, A = 1 << d - 1;
  for (let D = 0; D < d; D += 1) {
    let U = 0, F = C;
    while (U < F) {
      if (Fh(t, { errors: D, currentLocation: f + F, expectedLocation: f, distance: o, ignoreLocation: c }) <= m) U = F;
      else C = F;
      F = Math.floor((C - U) / 2 + U);
    }
    C = F;
    let pe = Math.max(1, f - F + 1), w = i ? p : Math.min(f + F, p) + d, R = Array(w + 2);
    R[w + 1] = (1 << D) - 1;
    for (let L = w; L >= pe; L -= 1) {
      let H = L - 1, Q = n[e10.charAt(H)];
      if (_) y[H] = +!!Q;
      if (R[L] = (R[L + 1] << 1 | 1) & Q, D) R[L] |= (E[L + 1] | E[L]) << 1 | 1 | E[L + 1];
      if (R[L] & A) {
        if (b = Fh(t, { errors: D, currentLocation: H, expectedLocation: f, distance: o, ignoreLocation: c }), b <= m) {
          if (m = b, g = H, g <= f) break;
          pe = Math.max(1, 2 * f - g);
        }
      }
    }
    if (Fh(t, { errors: D + 1, currentLocation: f, expectedLocation: f, distance: o, ignoreLocation: c }) > m) break;
    E = R;
  }
  let T = { isMatch: g >= 0, score: Math.max(1e-3, b) };
  if (_) {
    let D = K0e(y, a);
    if (!D.length) T.isMatch = false;
    else if (l) T.indices = D;
  }
  return T;
}
function W0e(e10) {
  let t = {};
  for (let n = 0, r = e10.length; n < r; n += 1) {
    let o = e10.charAt(n);
    t[o] = (t[o] || 0) | 1 << r - n - 1;
  }
  return t;
}
class kT {
  constructor(e10, { location: t = Ae.location, threshold: n = Ae.threshold, distance: r = Ae.distance, includeMatches: o = Ae.includeMatches, findAllMatches: s = Ae.findAllMatches, minMatchCharLength: i = Ae.minMatchCharLength, isCaseSensitive: a = Ae.isCaseSensitive, ignoreLocation: l = Ae.ignoreLocation } = {}) {
    if (this.options = { location: t, threshold: n, distance: r, includeMatches: o, findAllMatches: s, minMatchCharLength: i, isCaseSensitive: a, ignoreLocation: l }, this.pattern = a ? e10 : e10.toLowerCase(), this.chunks = [], !this.pattern.length) return;
    let c = (p, f) => {
      this.chunks.push({ pattern: p, alphabet: W0e(p), startIndex: f });
    }, d = this.pattern.length;
    if (d > ua) {
      let p = 0, f = d % ua, m = d - f;
      while (p < m) c(this.pattern.substr(p, ua), p), p += ua;
      if (f) {
        let g = d - ua;
        c(this.pattern.substr(g), g);
      }
    } else c(this.pattern, 0);
  }
  searchIn(e10) {
    let { isCaseSensitive: t, includeMatches: n } = this.options;
    if (!t) e10 = e10.toLowerCase();
    if (this.pattern === e10) {
      let m = { isMatch: true, score: 0 };
      if (n) m.indices = [[0, e10.length - 1]];
      return m;
    }
    let { location: r, distance: o, threshold: s, findAllMatches: i, minMatchCharLength: a, ignoreLocation: l } = this.options, c = [], d = 0, p = false;
    this.chunks.forEach(({ pattern: m, alphabet: g, startIndex: _ }) => {
      let { isMatch: y, score: S, indices: E } = G0e(e10, m, g, { location: r + _, distance: o, threshold: s, findAllMatches: i, minMatchCharLength: a, includeMatches: n, ignoreLocation: l });
      if (y) p = true;
      if (d += S, y && E) c = [...c, ...E];
    });
    let f = { isMatch: p, score: p ? d / this.chunks.length : 1 };
    if (p && n) f.indices = c;
    return f;
  }
}
class Xo {
  constructor(e10) {
    this.pattern = e10;
  }
  static isMultiMatch(e10) {
    return $K(e10, this.multiRegex);
  }
  static isSingleMatch(e10) {
    return $K(e10, this.singleRegex);
  }
  search() {
  }
}
function $K(e10, t) {
  let n = e10.match(t);
  return n ? n[1] : null;
}
class qK extends Xo {
  constructor(e10) {
    super(e10);
  }
  static get type() {
    return "exact";
  }
  static get multiRegex() {
    return /^="(.*)"$/;
  }
  static get singleRegex() {
    return /^=(.*)$/;
  }
  search(e10) {
    let t = e10 === this.pattern;
    return { isMatch: t, score: t ? 0 : 1, indices: [0, this.pattern.length - 1] };
  }
}
class YK extends Xo {
  constructor(e10) {
    super(e10);
  }
  static get type() {
    return "inverse-exact";
  }
  static get multiRegex() {
    return /^!"(.*)"$/;
  }
  static get singleRegex() {
    return /^!(.*)$/;
  }
  search(e10) {
    let n = e10.indexOf(this.pattern) === -1;
    return { isMatch: n, score: n ? 0 : 1, indices: [0, e10.length - 1] };
  }
}
class ZK extends Xo {
  constructor(e10) {
    super(e10);
  }
  static get type() {
    return "prefix-exact";
  }
  static get multiRegex() {
    return /^\^"(.*)"$/;
  }
  static get singleRegex() {
    return /^\^(.*)$/;
  }
  search(e10) {
    let t = e10.startsWith(this.pattern);
    return { isMatch: t, score: t ? 0 : 1, indices: [0, this.pattern.length - 1] };
  }
}
class JK extends Xo {
  constructor(e10) {
    super(e10);
  }
  static get type() {
    return "inverse-prefix-exact";
  }
  static get multiRegex() {
    return /^!\^"(.*)"$/;
  }
  static get singleRegex() {
    return /^!\^(.*)$/;
  }
  search(e10) {
    let t = !e10.startsWith(this.pattern);
    return { isMatch: t, score: t ? 0 : 1, indices: [0, e10.length - 1] };
  }
}
class XK extends Xo {
  constructor(e10) {
    super(e10);
  }
  static get type() {
    return "suffix-exact";
  }
  static get multiRegex() {
    return /^"(.*)"\$$/;
  }
  static get singleRegex() {
    return /^(.*)\$$/;
  }
  search(e10) {
    let t = e10.endsWith(this.pattern);
    return { isMatch: t, score: t ? 0 : 1, indices: [e10.length - this.pattern.length, e10.length - 1] };
  }
}
class QK extends Xo {
  constructor(e10) {
    super(e10);
  }
  static get type() {
    return "inverse-suffix-exact";
  }
  static get multiRegex() {
    return /^!"(.*)"\$$/;
  }
  static get singleRegex() {
    return /^!(.*)\$$/;
  }
  search(e10) {
    let t = !e10.endsWith(this.pattern);
    return { isMatch: t, score: t ? 0 : 1, indices: [0, e10.length - 1] };
  }
}
class PT extends Xo {
  constructor(e10, { location: t = Ae.location, threshold: n = Ae.threshold, distance: r = Ae.distance, includeMatches: o = Ae.includeMatches, findAllMatches: s = Ae.findAllMatches, minMatchCharLength: i = Ae.minMatchCharLength, isCaseSensitive: a = Ae.isCaseSensitive, ignoreLocation: l = Ae.ignoreLocation } = {}) {
    super(e10);
    this._bitapSearch = new kT(e10, { location: t, threshold: n, distance: r, includeMatches: o, findAllMatches: s, minMatchCharLength: i, isCaseSensitive: a, ignoreLocation: l });
  }
  static get type() {
    return "fuzzy";
  }
  static get multiRegex() {
    return /^"(.*)"$/;
  }
  static get singleRegex() {
    return /^(.*)$/;
  }
  search(e10) {
    return this._bitapSearch.searchIn(e10);
  }
}
class IT extends Xo {
  constructor(e10) {
    super(e10);
  }
  static get type() {
    return "include";
  }
  static get multiRegex() {
    return /^'"(.*)"$/;
  }
  static get singleRegex() {
    return /^'(.*)$/;
  }
  search(e10) {
    let t = 0, n, r = [], o = this.pattern.length;
    while ((n = e10.indexOf(this.pattern, t)) > -1) t = n + o, r.push([n, t - 1]);
    let s = !!r.length;
    return { isMatch: s, score: s ? 0 : 1, indices: r };
  }
}
var OT = [qK, IT, ZK, JK, QK, XK, YK, PT], zK = OT.length, V0e = / +(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)/, q0e = "|";
function Y0e(e10, t = {}) {
  return e10.split(q0e).map((n) => {
    let r = n.trim().split(V0e).filter((s) => s && !!s.trim()), o = [];
    for (let s = 0, i = r.length; s < i; s += 1) {
      let a = r[s], l = false, c = -1;
      while (!l && ++c < zK) {
        let d = OT[c], p = d.isMultiMatch(a);
        if (p) o.push(new d(p, t)), l = true;
      }
      if (l) continue;
      c = -1;
      while (++c < zK) {
        let d = OT[c], p = d.isSingleMatch(a);
        if (p) {
          o.push(new d(p, t));
          break;
        }
      }
    }
    return o;
  });
}
var Z0e = /* @__PURE__ */ new Set([PT.type, IT.type]);
class e1 {
  constructor(e10, { isCaseSensitive: t = Ae.isCaseSensitive, includeMatches: n = Ae.includeMatches, minMatchCharLength: r = Ae.minMatchCharLength, ignoreLocation: o = Ae.ignoreLocation, findAllMatches: s = Ae.findAllMatches, location: i = Ae.location, threshold: a = Ae.threshold, distance: l = Ae.distance } = {}) {
    this.query = null, this.options = { isCaseSensitive: t, includeMatches: n, minMatchCharLength: r, findAllMatches: s, ignoreLocation: o, location: i, threshold: a, distance: l }, this.pattern = t ? e10 : e10.toLowerCase(), this.query = Y0e(this.pattern, this.options);
  }
  static condition(e10, t) {
    return t.useExtendedSearch;
  }
  searchIn(e10) {
    let t = this.query;
    if (!t) return { isMatch: false, score: 1 };
    let { includeMatches: n, isCaseSensitive: r } = this.options;
    e10 = r ? e10 : e10.toLowerCase();
    let o = 0, s = [], i = 0;
    for (let a = 0, l = t.length; a < l; a += 1) {
      let c = t[a];
      s.length = 0, o = 0;
      for (let d = 0, p = c.length; d < p; d += 1) {
        let f = c[d], { isMatch: m, indices: g, score: _ } = f.search(e10);
        if (m) {
          if (o += 1, i += _, n) {
            let y = f.constructor.type;
            if (Z0e.has(y)) s = [...s, ...g];
            else s.push(g);
          }
        } else {
          i = 0, o = 0, s.length = 0;
          break;
        }
      }
      if (o) {
        let d = { isMatch: true, score: i / o };
        if (n) d.indices = s;
        return d;
      }
    }
    return { isMatch: false, score: 1 };
  }
}
var TT = [];
function J0e(...e10) {
  TT.push(...e10);
}
J0e(e1);
var Hh = { Task: "Agent", KillShell: "TaskStop", KillBash: "TaskStop", ListPeers: "ListAgents", Brief: "SendUserMessage", ListMcpResources: "ListMcpResourcesTool", ReadMcpResource: "ReadMcpResourceTool", ReadMcpResourceDir: "ReadMcpResourceDirTool" };
var fFe = typeof global == "object" && global && global.Object === Object && global, jh = fFe;
var mFe = typeof self == "object" && self && self.Object === Object && self, gFe = jh || mFe || Function("return this")(), $t = gFe;
var hFe = $t.Symbol, nn = hFe;
function _Fe(e10, t) {
  var n = -1, r = e10 == null ? 0 : e10.length, o = Array(r);
  while (++n < r) o[n] = t(e10[n], n, e10);
  return o;
}
var Yl = _Fe;
var yFe = Array.isArray, ot = yFe;
var _1 = Object.prototype, { hasOwnProperty: SFe, toString: EFe } = _1, cp = nn ? nn.toStringTag : void 0;
function bFe(e10) {
  var t = SFe.call(e10, cp), n = e10[cp];
  try {
    e10[cp] = void 0;
    var r = true;
  } catch (s) {
  }
  var o = EFe.call(e10);
  if (r) if (t) e10[cp] = n;
  else delete e10[cp];
  return o;
}
var y1 = bFe;
var CFe = Object.prototype, AFe = CFe.toString;
function RFe(e10) {
  return AFe.call(e10);
}
var S1 = RFe;
var OFe = "[object Null]", TFe = "[object Undefined]", E1 = nn ? nn.toStringTag : void 0;
function wFe(e10) {
  if (e10 == null) return e10 === void 0 ? TFe : OFe;
  return E1 && E1 in Object(e10) ? y1(e10) : S1(e10);
}
var er = wFe;
function xFe(e10) {
  return e10 != null && typeof e10 == "object";
}
var Vt = xFe;
var vFe = "[object Symbol]";
function kFe(e10) {
  return typeof e10 == "symbol" || Vt(e10) && er(e10) == vFe;
}
var Zl = kFe;
var b1 = nn ? nn.prototype : void 0, C1 = b1 ? b1.toString : void 0;
function A1(e10) {
  if (typeof e10 == "string") return e10;
  if (ot(e10)) return Yl(e10, A1) + "";
  if (Zl(e10)) return C1 ? C1.call(e10) : "";
  var t = e10 + "";
  return t == "0" && 1 / e10 == -Infinity ? "-0" : t;
}
var R1 = A1;
function IFe(e10) {
  return e10 == null ? "" : R1(e10);
}
var O1 = IFe;
P(() => O({ session_id: h(), ws_url: h(), work_dir: h().optional(), session_key: h().optional() }));
function KFe() {
  this.__data__ = [], this.size = 0;
}
var M1 = KFe;
function GFe(e10, t) {
  return e10 === t || e10 !== e10 && t !== t;
}
var go = GFe;
function WFe(e10, t) {
  var n = e10.length;
  while (n--) if (go(e10[n][0], t)) return n;
  return -1;
}
var ci = WFe;
var VFe = Array.prototype, qFe = VFe.splice;
function YFe(e10) {
  var t = this.__data__, n = ci(t, e10);
  if (n < 0) return false;
  var r = t.length - 1;
  if (n == r) t.pop();
  else qFe.call(t, n, 1);
  return --this.size, true;
}
var N1 = YFe;
function ZFe(e10) {
  var t = this.__data__, n = ci(t, e10);
  return n < 0 ? void 0 : t[n][1];
}
var U1 = ZFe;
function JFe(e10) {
  return ci(this.__data__, e10) > -1;
}
var F1 = JFe;
function XFe(e10, t) {
  var n = this.__data__, r = ci(n, e10);
  if (r < 0) ++this.size, n.push([e10, t]);
  else n[r][1] = t;
  return this;
}
var $1 = XFe;
function Xl(e10) {
  var t = -1, n = e10 == null ? 0 : e10.length;
  this.clear();
  while (++t < n) {
    var r = e10[t];
    this.set(r[0], r[1]);
  }
}
Xl.prototype.clear = M1;
Xl.prototype.delete = N1;
Xl.prototype.get = U1;
Xl.prototype.has = F1;
Xl.prototype.set = $1;
var ui = Xl;
function QFe() {
  this.__data__ = new ui(), this.size = 0;
}
var z1 = QFe;
function e$e(e10) {
  var t = this.__data__, n = t.delete(e10);
  return this.size = t.size, n;
}
var H1 = e$e;
function t$e(e10) {
  return this.__data__.get(e10);
}
var j1 = t$e;
function n$e(e10) {
  return this.__data__.has(e10);
}
var B1 = n$e;
function r$e(e10) {
  var t = typeof e10;
  return e10 != null && (t == "object" || t == "function");
}
var It = r$e;
var o$e = "[object AsyncFunction]", s$e = "[object Function]", i$e = "[object GeneratorFunction]", a$e = "[object Proxy]";
function l$e(e10) {
  if (!It(e10)) return false;
  var t = er(e10);
  return t == s$e || t == i$e || t == o$e || t == a$e;
}
var Ql = l$e;
var c$e = $t["__core-js_shared__"], Bh = c$e;
var K1 = (function() {
  var e10 = /[^.]+$/.exec(Bh && Bh.keys && Bh.keys.IE_PROTO || "");
  return e10 ? "Symbol(src)_1." + e10 : "";
})();
function u$e(e10) {
  return !!K1 && K1 in e10;
}
var G1 = u$e;
var d$e = Function.prototype, p$e = d$e.toString;
function f$e(e10) {
  if (e10 != null) {
    try {
      return p$e.call(e10);
    } catch (t) {
    }
    try {
      return e10 + "";
    } catch (t) {
    }
  }
  return "";
}
var Qo = f$e;
var m$e = /[\\^$.*+?()[\]{}|]/g, g$e = /^\[object .+?Constructor\]$/, h$e = Function.prototype, _$e = Object.prototype, y$e = h$e.toString, S$e = _$e.hasOwnProperty, E$e = RegExp("^" + y$e.call(S$e).replace(m$e, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
function b$e(e10) {
  if (!It(e10) || G1(e10)) return false;
  var t = Ql(e10) ? E$e : g$e;
  return t.test(Qo(e10));
}
var W1 = b$e;
function C$e(e10, t) {
  return e10 == null ? void 0 : e10[t];
}
var V1 = C$e;
function A$e(e10, t) {
  var n = V1(e10, t);
  return W1(n) ? n : void 0;
}
var Gn = A$e;
var R$e = Gn($t, "Map"), di = R$e;
var O$e = Gn(Object, "create"), es = O$e;
function T$e() {
  this.__data__ = es ? es(null) : {}, this.size = 0;
}
var q1 = T$e;
function w$e(e10) {
  var t = this.has(e10) && delete this.__data__[e10];
  return this.size -= t ? 1 : 0, t;
}
var Y1 = w$e;
var x$e = "__lodash_hash_undefined__", v$e = Object.prototype, k$e = v$e.hasOwnProperty;
function P$e(e10) {
  var t = this.__data__;
  if (es) {
    var n = t[e10];
    return n === x$e ? void 0 : n;
  }
  return k$e.call(t, e10) ? t[e10] : void 0;
}
var Z1 = P$e;
var I$e = Object.prototype, D$e = I$e.hasOwnProperty;
function L$e(e10) {
  var t = this.__data__;
  return es ? t[e10] !== void 0 : D$e.call(t, e10);
}
var J1 = L$e;
var M$e = "__lodash_hash_undefined__";
function N$e(e10, t) {
  var n = this.__data__;
  return this.size += this.has(e10) ? 0 : 1, n[e10] = es && t === void 0 ? M$e : t, this;
}
var X1 = N$e;
function ec(e10) {
  var t = -1, n = e10 == null ? 0 : e10.length;
  this.clear();
  while (++t < n) {
    var r = e10[t];
    this.set(r[0], r[1]);
  }
}
ec.prototype.clear = q1;
ec.prototype.delete = Y1;
ec.prototype.get = Z1;
ec.prototype.has = J1;
ec.prototype.set = X1;
var FT = ec;
function U$e() {
  this.size = 0, this.__data__ = { hash: new FT(), map: new (di || ui)(), string: new FT() };
}
var Q1 = U$e;
function F$e(e10) {
  var t = typeof e10;
  return t == "string" || t == "number" || t == "symbol" || t == "boolean" ? e10 !== "__proto__" : e10 === null;
}
var eG = F$e;
function $$e(e10, t) {
  var n = e10.__data__;
  return eG(t) ? n[typeof t == "string" ? "string" : "hash"] : n.map;
}
var pi = $$e;
function z$e(e10) {
  var t = pi(this, e10).delete(e10);
  return this.size -= t ? 1 : 0, t;
}
var tG = z$e;
function H$e(e10) {
  return pi(this, e10).get(e10);
}
var nG = H$e;
function j$e(e10) {
  return pi(this, e10).has(e10);
}
var rG = j$e;
function B$e(e10, t) {
  var n = pi(this, e10), r = n.size;
  return n.set(e10, t), this.size += n.size == r ? 0 : 1, this;
}
var oG = B$e;
function tc(e10) {
  var t = -1, n = e10 == null ? 0 : e10.length;
  this.clear();
  while (++t < n) {
    var r = e10[t];
    this.set(r[0], r[1]);
  }
}
tc.prototype.clear = Q1;
tc.prototype.delete = tG;
tc.prototype.get = nG;
tc.prototype.has = rG;
tc.prototype.set = oG;
var da = tc;
var K$e = 200;
function G$e(e10, t) {
  var n = this.__data__;
  if (n instanceof ui) {
    var r = n.__data__;
    if (!di || r.length < K$e - 1) return r.push([e10, t]), this.size = ++n.size, this;
    n = this.__data__ = new da(r);
  }
  return n.set(e10, t), this.size = n.size, this;
}
var sG = G$e;
function nc(e10) {
  var t = this.__data__ = new ui(e10);
  this.size = t.size;
}
nc.prototype.clear = z1;
nc.prototype.delete = H1;
nc.prototype.get = j1;
nc.prototype.has = B1;
nc.prototype.set = sG;
var ho = nc;
var W$e = "__lodash_hash_undefined__";
function V$e(e10) {
  return this.__data__.set(e10, W$e), this;
}
var iG = V$e;
function q$e(e10) {
  return this.__data__.has(e10);
}
var aG = q$e;
function Kh(e10) {
  var t = -1, n = e10 == null ? 0 : e10.length;
  this.__data__ = new da();
  while (++t < n) this.add(e10[t]);
}
Kh.prototype.add = Kh.prototype.push = iG;
Kh.prototype.has = aG;
var Gh = Kh;
function Y$e(e10, t) {
  var n = -1, r = e10 == null ? 0 : e10.length;
  while (++n < r) if (t(e10[n], n, e10)) return true;
  return false;
}
var lG = Y$e;
function Z$e(e10, t) {
  return e10.has(t);
}
var Wh = Z$e;
var J$e = 1, X$e = 2;
function Q$e(e10, t, n, r, o, s) {
  var i = n & J$e, a = e10.length, l = t.length;
  if (a != l && !(i && l > a)) return false;
  var c = s.get(e10), d = s.get(t);
  if (c && d) return c == t && d == e10;
  var p = -1, f = true, m = n & X$e ? new Gh() : void 0;
  s.set(e10, t), s.set(t, e10);
  while (++p < a) {
    var g = e10[p], _ = t[p];
    if (r) var y = i ? r(_, g, p, t, e10, s) : r(g, _, p, e10, t, s);
    if (y !== void 0) {
      if (y) continue;
      f = false;
      break;
    }
    if (m) {
      if (!lG(t, function(S, E) {
        if (!Wh(m, E) && (g === S || o(g, S, n, r, s))) return m.push(E);
      })) {
        f = false;
        break;
      }
    } else if (!(g === _ || o(g, _, n, r, s))) {
      f = false;
      break;
    }
  }
  return s.delete(e10), s.delete(t), f;
}
var Vh = Q$e;
var eze = $t.Uint8Array, rc = eze;
function tze(e10) {
  var t = -1, n = Array(e10.size);
  return e10.forEach(function(r, o) {
    n[++t] = [o, r];
  }), n;
}
var cG = tze;
function nze(e10) {
  var t = -1, n = Array(e10.size);
  return e10.forEach(function(r) {
    n[++t] = r;
  }), n;
}
var oc = nze;
var rze = 1, oze = 2, sze = "[object Boolean]", ize = "[object Date]", aze = "[object Error]", lze = "[object Map]", cze = "[object Number]", uze = "[object RegExp]", dze = "[object Set]", pze = "[object String]", fze = "[object Symbol]", mze = "[object ArrayBuffer]", gze = "[object DataView]", uG = nn ? nn.prototype : void 0, $T = uG ? uG.valueOf : void 0;
function hze(e10, t, n, r, o, s, i) {
  switch (n) {
    case gze:
      if (e10.byteLength != t.byteLength || e10.byteOffset != t.byteOffset) return false;
      e10 = e10.buffer, t = t.buffer;
    case mze:
      if (e10.byteLength != t.byteLength || !s(new rc(e10), new rc(t))) return false;
      return true;
    case sze:
    case ize:
    case cze:
      return go(+e10, +t);
    case aze:
      return e10.name == t.name && e10.message == t.message;
    case uze:
    case pze:
      return e10 == t + "";
    case lze:
      var a = cG;
    case dze:
      var l = r & rze;
      if (a || (a = oc), e10.size != t.size && !l) return false;
      var c = i.get(e10);
      if (c) return c == t;
      r |= oze, i.set(e10, t);
      var d = Vh(a(e10), a(t), r, o, s, i);
      return i.delete(e10), d;
    case fze:
      if ($T) return $T.call(e10) == $T.call(t);
  }
  return false;
}
var dG = hze;
function _ze(e10, t) {
  var n = -1, r = t.length, o = e10.length;
  while (++n < r) e10[o + n] = t[n];
  return e10;
}
var sc = _ze;
function yze(e10, t, n) {
  var r = t(e10);
  return ot(e10) ? r : sc(r, n(e10));
}
var qh = yze;
function Sze(e10, t) {
  var n = -1, r = e10 == null ? 0 : e10.length, o = 0, s = [];
  while (++n < r) {
    var i = e10[n];
    if (t(i, n, e10)) s[o++] = i;
  }
  return s;
}
var pG = Sze;
function Eze() {
  return [];
}
var Yh = Eze;
var bze = Object.prototype, Cze = bze.propertyIsEnumerable, fG = Object.getOwnPropertySymbols, Aze = !fG ? Yh : function(e10) {
  if (e10 == null) return [];
  return e10 = Object(e10), pG(fG(e10), function(t) {
    return Cze.call(e10, t);
  });
}, ic = Aze;
function Rze(e10, t) {
  var n = -1, r = Array(e10);
  while (++n < e10) r[n] = t(n);
  return r;
}
var mG = Rze;
var Oze = "[object Arguments]";
function Tze(e10) {
  return Vt(e10) && er(e10) == Oze;
}
var zT = Tze;
var gG = Object.prototype, { hasOwnProperty: wze, propertyIsEnumerable: xze } = gG, vze = zT(/* @__PURE__ */ (function() {
  return arguments;
})()) ? zT : function(e10) {
  return Vt(e10) && wze.call(e10, "callee") && !xze.call(e10, "callee");
}, ts = vze;
function kze() {
  return false;
}
var hG = kze;
var SG = typeof Jh == "object" && Jh && !Jh.nodeType && Jh, _G = SG && typeof Zh == "object" && Zh && !Zh.nodeType && Zh, Pze = _G && _G.exports === SG, yG = Pze ? $t.Buffer : void 0, Ize = yG ? yG.isBuffer : void 0, Dze = Ize || hG, _o = Dze;
var Lze = 9007199254740991, Mze = /^(?:0|[1-9]\d*)$/;
function Nze(e10, t) {
  var n = typeof e10;
  return t = t == null ? Lze : t, !!t && (n == "number" || n != "symbol" && Mze.test(e10)) && (e10 > -1 && e10 % 1 == 0 && e10 < t);
}
var fi = Nze;
var Uze = 9007199254740991;
function Fze(e10) {
  return typeof e10 == "number" && e10 > -1 && e10 % 1 == 0 && e10 <= Uze;
}
var ac = Fze;
var $ze = "[object Arguments]", zze = "[object Array]", Hze = "[object Boolean]", jze = "[object Date]", Bze = "[object Error]", Kze = "[object Function]", Gze = "[object Map]", Wze = "[object Number]", Vze = "[object Object]", qze = "[object RegExp]", Yze = "[object Set]", Zze = "[object String]", Jze = "[object WeakMap]", Xze = "[object ArrayBuffer]", Qze = "[object DataView]", eHe = "[object Float32Array]", tHe = "[object Float64Array]", nHe = "[object Int8Array]", rHe = "[object Int16Array]", oHe = "[object Int32Array]", sHe = "[object Uint8Array]", iHe = "[object Uint8ClampedArray]", aHe = "[object Uint16Array]", lHe = "[object Uint32Array]", lt = {};
lt[eHe] = lt[tHe] = lt[nHe] = lt[rHe] = lt[oHe] = lt[sHe] = lt[iHe] = lt[aHe] = lt[lHe] = true;
lt[$ze] = lt[zze] = lt[Xze] = lt[Hze] = lt[Qze] = lt[jze] = lt[Bze] = lt[Kze] = lt[Gze] = lt[Wze] = lt[Vze] = lt[qze] = lt[Yze] = lt[Zze] = lt[Jze] = false;
function cHe(e10) {
  return Vt(e10) && ac(e10.length) && !!lt[er(e10)];
}
var EG = cHe;
function uHe(e10) {
  return function(t) {
    return e10(t);
  };
}
var lc = uHe;
var bG = typeof Qh == "object" && Qh && !Qh.nodeType && Qh, pp = bG && typeof Xh == "object" && Xh && !Xh.nodeType && Xh, dHe = pp && pp.exports === bG, HT = dHe && jh.process, pHe = (function() {
  try {
    var e10 = pp && pp.require && pp.require("util").types;
    if (e10) return e10;
    return HT && HT.binding && HT.binding("util");
  } catch (t) {
  }
})(), yo = pHe;
var CG = yo && yo.isTypedArray, fHe = CG ? lc(CG) : EG, cc = fHe;
var mHe = Object.prototype, gHe = mHe.hasOwnProperty;
function hHe(e10, t) {
  var n = ot(e10), r = !n && ts(e10), o = !n && !r && _o(e10), s = !n && !r && !o && cc(e10), i = n || r || o || s, a = i ? mG(e10.length, String) : [], l = a.length;
  for (var c in e10) if ((t || gHe.call(e10, c)) && !(i && (c == "length" || o && (c == "offset" || c == "parent") || s && (c == "buffer" || c == "byteLength" || c == "byteOffset") || fi(c, l)))) a.push(c);
  return a;
}
var e_ = hHe;
var _He = Object.prototype;
function yHe(e10) {
  var t = e10 && e10.constructor, n = typeof t == "function" && t.prototype || _He;
  return e10 === n;
}
var uc = yHe;
function SHe(e10, t) {
  return function(n) {
    return e10(t(n));
  };
}
var t_ = SHe;
var EHe = t_(Object.keys, Object), AG = EHe;
var bHe = Object.prototype, CHe = bHe.hasOwnProperty;
function AHe(e10) {
  if (!uc(e10)) return AG(e10);
  var t = [];
  for (var n in Object(e10)) if (CHe.call(e10, n) && n != "constructor") t.push(n);
  return t;
}
var RG = AHe;
function RHe(e10) {
  return e10 != null && ac(e10.length) && !Ql(e10);
}
var So = RHe;
function OHe(e10) {
  return So(e10) ? e_(e10) : RG(e10);
}
var Eo = OHe;
function THe(e10) {
  return qh(e10, Eo, ic);
}
var fp = THe;
var wHe = 1, xHe = Object.prototype, vHe = xHe.hasOwnProperty;
function kHe(e10, t, n, r, o, s) {
  var i = n & wHe, a = fp(e10), l = a.length, c = fp(t), d = c.length;
  if (l != d && !i) return false;
  var p = l;
  while (p--) {
    var f = a[p];
    if (!(i ? f in t : vHe.call(t, f))) return false;
  }
  var m = s.get(e10), g = s.get(t);
  if (m && g) return m == t && g == e10;
  var _ = true;
  s.set(e10, t), s.set(t, e10);
  var y = i;
  while (++p < l) {
    f = a[p];
    var S = e10[f], E = t[f];
    if (r) var b = i ? r(E, S, f, t, e10, s) : r(S, E, f, e10, t, s);
    if (!(b === void 0 ? S === E || o(S, E, n, r, s) : b)) {
      _ = false;
      break;
    }
    y || (y = f == "constructor");
  }
  if (_ && !y) {
    var C = e10.constructor, A = t.constructor;
    if (C != A && ("constructor" in e10 && "constructor" in t) && !(typeof C == "function" && C instanceof C && typeof A == "function" && A instanceof A)) _ = false;
  }
  return s.delete(e10), s.delete(t), _;
}
var OG = kHe;
var PHe = Gn($t, "DataView"), n_ = PHe;
var IHe = Gn($t, "Promise"), r_ = IHe;
var DHe = Gn($t, "Set"), mi = DHe;
var LHe = Gn($t, "WeakMap"), o_ = LHe;
var TG = "[object Map]", MHe = "[object Object]", wG = "[object Promise]", xG = "[object Set]", vG = "[object WeakMap]", kG = "[object DataView]", NHe = Qo(n_), UHe = Qo(di), FHe = Qo(r_), $He = Qo(mi), zHe = Qo(o_), pa = er;
if (n_ && pa(new n_(new ArrayBuffer(1))) != kG || di && pa(new di()) != TG || r_ && pa(r_.resolve()) != wG || mi && pa(new mi()) != xG || o_ && pa(new o_()) != vG) pa = function(e10) {
  var t = er(e10), n = t == MHe ? e10.constructor : void 0, r = n ? Qo(n) : "";
  if (r) switch (r) {
    case NHe:
      return kG;
    case UHe:
      return TG;
    case FHe:
      return wG;
    case $He:
      return xG;
    case zHe:
      return vG;
  }
  return t;
};
var ns = pa;
var HHe = 1, PG = "[object Arguments]", IG = "[object Array]", s_ = "[object Object]", jHe = Object.prototype, DG = jHe.hasOwnProperty;
function BHe(e10, t, n, r, o, s) {
  var i = ot(e10), a = ot(t), l = i ? IG : ns(e10), c = a ? IG : ns(t);
  l = l == PG ? s_ : l, c = c == PG ? s_ : c;
  var d = l == s_, p = c == s_, f = l == c;
  if (f && _o(e10)) {
    if (!_o(t)) return false;
    i = true, d = false;
  }
  if (f && !d) return s || (s = new ho()), i || cc(e10) ? Vh(e10, t, n, r, o, s) : dG(e10, t, l, n, r, o, s);
  if (!(n & HHe)) {
    var m = d && DG.call(e10, "__wrapped__"), g = p && DG.call(t, "__wrapped__");
    if (m || g) {
      var _ = m ? e10.value() : e10, y = g ? t.value() : t;
      return s || (s = new ho()), o(_, y, n, r, s);
    }
  }
  if (!f) return false;
  return s || (s = new ho()), OG(e10, t, n, r, o, s);
}
var LG = BHe;
function MG(e10, t, n, r, o) {
  if (e10 === t) return true;
  if (e10 == null || t == null || !Vt(e10) && !Vt(t)) return e10 !== e10 && t !== t;
  return LG(e10, t, n, r, MG, o);
}
var dc = MG;
var KHe = 1, GHe = 2;
function WHe(e10, t, n, r) {
  var o = n.length, s = o, i = !r;
  if (e10 == null) return !s;
  e10 = Object(e10);
  while (o--) {
    var a = n[o];
    if (i && a[2] ? a[1] !== e10[a[0]] : !(a[0] in e10)) return false;
  }
  while (++o < s) {
    a = n[o];
    var l = a[0], c = e10[l], d = a[1];
    if (i && a[2]) {
      if (c === void 0 && !(l in e10)) return false;
    } else {
      var p = new ho();
      if (r) var f = r(c, d, l, e10, t, p);
      if (!(f === void 0 ? dc(d, c, KHe | GHe, r, p) : f)) return false;
    }
  }
  return true;
}
var NG = WHe;
function VHe(e10) {
  return e10 === e10 && !It(e10);
}
var i_ = VHe;
function qHe(e10) {
  var t = Eo(e10), n = t.length;
  while (n--) {
    var r = t[n], o = e10[r];
    t[n] = [r, o, i_(o)];
  }
  return t;
}
var UG = qHe;
function YHe(e10, t) {
  return function(n) {
    if (n == null) return false;
    return n[e10] === t && (t !== void 0 || e10 in Object(n));
  };
}
var a_ = YHe;
function ZHe(e10) {
  var t = UG(e10);
  if (t.length == 1 && t[0][2]) return a_(t[0][0], t[0][1]);
  return function(n) {
    return n === e10 || NG(n, e10, t);
  };
}
var FG = ZHe;
var JHe = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, XHe = /^\w*$/;
function QHe(e10, t) {
  if (ot(e10)) return false;
  var n = typeof e10;
  if (n == "number" || n == "symbol" || n == "boolean" || e10 == null || Zl(e10)) return true;
  return XHe.test(e10) || !JHe.test(e10) || t != null && e10 in Object(t);
}
var pc = QHe;
var eje = "Expected a function";
function jT(e10, t) {
  if (typeof e10 != "function" || t != null && typeof t != "function") throw TypeError(eje);
  var n = function() {
    var r = arguments, o = t ? t.apply(this, r) : r[0], s = n.cache;
    if (s.has(o)) return s.get(o);
    var i = e10.apply(this, r);
    return n.cache = s.set(o, i) || s, i;
  };
  return n.cache = new (jT.Cache || da)(), n;
}
jT.Cache = da;
var $G = jT;
var tje = 500;
function nje(e10) {
  var t = $G(e10, function(r) {
    if (n.size === tje) n.clear();
    return r;
  }), n = t.cache;
  return t;
}
var zG = nje;
var rje = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, oje = /\\(\\)?/g, sje = zG(function(e10) {
  var t = [];
  if (e10.charCodeAt(0) === 46) t.push("");
  return e10.replace(rje, function(n, r, o, s) {
    t.push(o ? s.replace(oje, "$1") : r || n);
  }), t;
}), HG = sje;
function ije(e10, t) {
  if (ot(e10)) return e10;
  return pc(e10, t) ? [e10] : HG(O1(e10));
}
var Er = ije;
function lje(e10) {
  if (typeof e10 == "string" || Zl(e10)) return e10;
  var t = e10 + "";
  return t == "0" && 1 / e10 == -Infinity ? "-0" : t;
}
var tr = lje;
function cje(e10, t) {
  t = Er(t, e10);
  var n = 0, r = t.length;
  while (e10 != null && n < r) e10 = e10[tr(t[n++])];
  return n && n == r ? e10 : void 0;
}
var gi = cje;
function uje(e10, t, n) {
  var r = e10 == null ? void 0 : gi(e10, t);
  return r === void 0 ? n : r;
}
var jG = uje;
function dje(e10, t) {
  return e10 != null && t in Object(e10);
}
var BG = dje;
function pje(e10, t, n) {
  t = Er(t, e10);
  var r = -1, o = t.length, s = false;
  while (++r < o) {
    var i = tr(t[r]);
    if (!(s = e10 != null && n(e10, i))) break;
    e10 = e10[i];
  }
  if (s || ++r != o) return s;
  return o = e10 == null ? 0 : e10.length, !!o && ac(o) && fi(i, o) && (ot(e10) || ts(e10));
}
var KG = pje;
function fje(e10, t) {
  return e10 != null && KG(e10, t, BG);
}
var l_ = fje;
var mje = 1, gje = 2;
function hje(e10, t) {
  if (pc(e10) && i_(t)) return a_(tr(e10), t);
  return function(n) {
    var r = jG(n, e10);
    return r === void 0 && r === t ? l_(n, e10) : dc(t, r, mje | gje);
  };
}
var GG = hje;
function _je(e10) {
  return e10;
}
var fc = _je;
function yje(e10) {
  return function(t) {
    return t == null ? void 0 : t[e10];
  };
}
var WG = yje;
function Sje(e10) {
  return function(t) {
    return gi(t, e10);
  };
}
var VG = Sje;
function Eje(e10) {
  return pc(e10) ? WG(tr(e10)) : VG(e10);
}
var qG = Eje;
function bje(e10) {
  if (typeof e10 == "function") return e10;
  if (e10 == null) return fc;
  if (typeof e10 == "object") return ot(e10) ? GG(e10[0], e10[1]) : FG(e10);
  return qG(e10);
}
var bo = bje;
var Cje = (function() {
  try {
    var e10 = Gn(Object, "defineProperty");
    return e10({}, "", {}), e10;
  } catch (t) {
  }
})(), mc = Cje;
function Aje(e10, t, n) {
  if (t == "__proto__" && mc) mc(e10, t, { configurable: true, enumerable: true, value: n, writable: true });
  else e10[t] = n;
}
var hi = Aje;
var Rje = Object.prototype, Oje = Rje.hasOwnProperty;
function Tje(e10, t, n) {
  var r = e10[t];
  if (!(Oje.call(e10, t) && go(r, n)) || n === void 0 && !(t in e10)) hi(e10, t, n);
}
var gc = Tje;
function wje(e10, t, n, r) {
  if (!It(e10)) return e10;
  t = Er(t, e10);
  var o = -1, s = t.length, i = s - 1, a = e10;
  while (a != null && ++o < s) {
    var l = tr(t[o]), c = n;
    if (l === "__proto__" || l === "constructor" || l === "prototype") return e10;
    if (o != i) {
      var d = a[l];
      if (c = r ? r(d, l, a) : void 0, c === void 0) c = It(d) ? d : fi(t[o + 1]) ? [] : {};
    }
    gc(a, l, c), a = a[l];
  }
  return e10;
}
var YG = wje;
function xje(e10, t, n) {
  var r = -1, o = t.length, s = {};
  while (++r < o) {
    var i = t[r], a = gi(e10, i);
    if (n(a, i)) YG(s, Er(i, e10), a);
  }
  return s;
}
var c_ = xje;
var vje = t_(Object.getPrototypeOf, Object), hc = vje;
var kje = Object.getOwnPropertySymbols, Pje = !kje ? Yh : function(e10) {
  var t = [];
  while (e10) sc(t, ic(e10)), e10 = hc(e10);
  return t;
}, u_ = Pje;
function Ije(e10) {
  var t = [];
  if (e10 != null) for (var n in Object(e10)) t.push(n);
  return t;
}
var ZG = Ije;
var Dje = Object.prototype, Lje = Dje.hasOwnProperty;
function Mje(e10) {
  if (!It(e10)) return ZG(e10);
  var t = uc(e10), n = [];
  for (var r in e10) if (!(r == "constructor" && (t || !Lje.call(e10, r)))) n.push(r);
  return n;
}
var JG = Mje;
function Nje(e10) {
  return So(e10) ? e_(e10, true) : JG(e10);
}
var Co = Nje;
function Uje(e10) {
  return qh(e10, Co, u_);
}
var _c = Uje;
function Fje(e10, t) {
  if (e10 == null) return {};
  var n = Yl(_c(e10), function(r) {
    return [r];
  });
  return t = bo(t), c_(e10, n, function(r, o) {
    return t(r, o[0]);
  });
}
var d_ = Fje;
new async_hooks.AsyncLocalStorage();
var aW;
(function(e10) {
  e10[e10.lineFeed = 10] = "lineFeed", e10[e10.carriageReturn = 13] = "carriageReturn", e10[e10.space = 32] = "space", e10[e10._0 = 48] = "_0", e10[e10._1 = 49] = "_1", e10[e10._2 = 50] = "_2", e10[e10._3 = 51] = "_3", e10[e10._4 = 52] = "_4", e10[e10._5 = 53] = "_5", e10[e10._6 = 54] = "_6", e10[e10._7 = 55] = "_7", e10[e10._8 = 56] = "_8", e10[e10._9 = 57] = "_9", e10[e10.a = 97] = "a", e10[e10.b = 98] = "b", e10[e10.c = 99] = "c", e10[e10.d = 100] = "d", e10[e10.e = 101] = "e", e10[e10.f = 102] = "f", e10[e10.g = 103] = "g", e10[e10.h = 104] = "h", e10[e10.i = 105] = "i", e10[e10.j = 106] = "j", e10[e10.k = 107] = "k", e10[e10.l = 108] = "l", e10[e10.m = 109] = "m", e10[e10.n = 110] = "n", e10[e10.o = 111] = "o", e10[e10.p = 112] = "p", e10[e10.q = 113] = "q", e10[e10.r = 114] = "r", e10[e10.s = 115] = "s", e10[e10.t = 116] = "t", e10[e10.u = 117] = "u", e10[e10.v = 118] = "v", e10[e10.w = 119] = "w", e10[e10.x = 120] = "x", e10[e10.y = 121] = "y", e10[e10.z = 122] = "z", e10[e10.A = 65] = "A", e10[e10.B = 66] = "B", e10[e10.C = 67] = "C", e10[e10.D = 68] = "D", e10[e10.E = 69] = "E", e10[e10.F = 70] = "F", e10[e10.G = 71] = "G", e10[e10.H = 72] = "H", e10[e10.I = 73] = "I", e10[e10.J = 74] = "J", e10[e10.K = 75] = "K", e10[e10.L = 76] = "L", e10[e10.M = 77] = "M", e10[e10.N = 78] = "N", e10[e10.O = 79] = "O", e10[e10.P = 80] = "P", e10[e10.Q = 81] = "Q", e10[e10.R = 82] = "R", e10[e10.S = 83] = "S", e10[e10.T = 84] = "T", e10[e10.U = 85] = "U", e10[e10.V = 86] = "V", e10[e10.W = 87] = "W", e10[e10.X = 88] = "X", e10[e10.Y = 89] = "Y", e10[e10.Z = 90] = "Z", e10[e10.asterisk = 42] = "asterisk", e10[e10.backslash = 92] = "backslash", e10[e10.closeBrace = 125] = "closeBrace", e10[e10.closeBracket = 93] = "closeBracket", e10[e10.colon = 58] = "colon", e10[e10.comma = 44] = "comma", e10[e10.dot = 46] = "dot", e10[e10.doubleQuote = 34] = "doubleQuote", e10[e10.minus = 45] = "minus", e10[e10.openBrace = 123] = "openBrace", e10[e10.openBracket = 91] = "openBracket", e10[e10.plus = 43] = "plus", e10[e10.slash = 47] = "slash", e10[e10.formFeed = 12] = "formFeed", e10[e10.tab = 9] = "tab";
})(aW || (aW = {}));
Array(20).fill(0).map((e10, t) => " ".repeat(t));
({ " ": { "\n": Array(200).fill(0).map((e10, t) => `
` + " ".repeat(t)), "\r": Array(200).fill(0).map((e10, t) => "\r" + " ".repeat(t)), "\r\n": Array(200).fill(0).map((e10, t) => `\r
` + " ".repeat(t)) }, "	": { "\n": Array(200).fill(0).map((e10, t) => `
` + "	".repeat(t)), "\r": Array(200).fill(0).map((e10, t) => "\r" + "	".repeat(t)), "\r\n": Array(200).fill(0).map((e10, t) => `\r
` + "	".repeat(t)) } });
var cW;
(function(e10) {
  e10.DEFAULT = { allowTrailingComma: false };
})(cW || (cW = {}));
var uW;
(function(e10) {
  e10[e10.None = 0] = "None", e10[e10.UnexpectedEndOfComment = 1] = "UnexpectedEndOfComment", e10[e10.UnexpectedEndOfString = 2] = "UnexpectedEndOfString", e10[e10.UnexpectedEndOfNumber = 3] = "UnexpectedEndOfNumber", e10[e10.InvalidUnicode = 4] = "InvalidUnicode", e10[e10.InvalidEscapeCharacter = 5] = "InvalidEscapeCharacter", e10[e10.InvalidCharacter = 6] = "InvalidCharacter";
})(uW || (uW = {}));
var dW;
(function(e10) {
  e10[e10.OpenBraceToken = 1] = "OpenBraceToken", e10[e10.CloseBraceToken = 2] = "CloseBraceToken", e10[e10.OpenBracketToken = 3] = "OpenBracketToken", e10[e10.CloseBracketToken = 4] = "CloseBracketToken", e10[e10.CommaToken = 5] = "CommaToken", e10[e10.ColonToken = 6] = "ColonToken", e10[e10.NullKeyword = 7] = "NullKeyword", e10[e10.TrueKeyword = 8] = "TrueKeyword", e10[e10.FalseKeyword = 9] = "FalseKeyword", e10[e10.StringLiteral = 10] = "StringLiteral", e10[e10.NumericLiteral = 11] = "NumericLiteral", e10[e10.LineCommentTrivia = 12] = "LineCommentTrivia", e10[e10.BlockCommentTrivia = 13] = "BlockCommentTrivia", e10[e10.LineBreakTrivia = 14] = "LineBreakTrivia", e10[e10.Trivia = 15] = "Trivia", e10[e10.Unknown = 16] = "Unknown", e10[e10.EOF = 17] = "EOF";
})(dW || (dW = {}));
var pW;
(function(e10) {
  e10[e10.InvalidSymbol = 1] = "InvalidSymbol", e10[e10.InvalidNumberFormat = 2] = "InvalidNumberFormat", e10[e10.PropertyNameExpected = 3] = "PropertyNameExpected", e10[e10.ValueExpected = 4] = "ValueExpected", e10[e10.ColonExpected = 5] = "ColonExpected", e10[e10.CommaExpected = 6] = "CommaExpected", e10[e10.CloseBraceExpected = 7] = "CloseBraceExpected", e10[e10.CloseBracketExpected = 8] = "CloseBracketExpected", e10[e10.EndOfFileExpected = 9] = "EndOfFileExpected", e10[e10.InvalidCommentToken = 10] = "InvalidCommentToken", e10[e10.UnexpectedEndOfComment = 11] = "UnexpectedEndOfComment", e10[e10.UnexpectedEndOfString = 12] = "UnexpectedEndOfString", e10[e10.UnexpectedEndOfNumber = 13] = "UnexpectedEndOfNumber", e10[e10.InvalidUnicode = 14] = "InvalidUnicode", e10[e10.InvalidEscapeCharacter = 15] = "InvalidEscapeCharacter", e10[e10.InvalidCharacter = 16] = "InvalidCharacter";
})(pW || (pW = {}));
function yc(e10) {
  return e10.startsWith("\uFEFF") ? e10.slice(1) : e10;
}
var Sc = typeof performance === "object" && performance && typeof performance.now === "function" ? performance : Date, mW = /* @__PURE__ */ new Set(), KT = typeof process === "object" && !!process ? process : {}, gW = (e10, t, n, r) => {
  typeof KT.emitWarning === "function" ? KT.emitWarning(e10, t, n, r) : console.error(`[${n}] ${t}: ${e10}`);
}, { AbortController: f_, AbortSignal: fW } = globalThis;
if (typeof f_ > "u") {
  fW = class {
    onabort;
    _onabort = [];
    reason;
    aborted = false;
    addEventListener(r, o) {
      this._onabort.push(o);
    }
  }, f_ = class {
    constructor() {
      t();
    }
    signal = new fW();
    abort(r) {
      if (this.signal.aborted) return;
      this.signal.reason = r, this.signal.aborted = true;
      for (let o of this.signal._onabort) o(r);
      this.signal.onabort?.(r);
    }
  };
  let e10 = KT.env?.LRU_CACHE_IGNORE_AC_WARNING !== "1", t = () => {
    if (!e10) return;
    e10 = false, gW("AbortController is not defined. If using lru-cache in node 14, load an AbortController polyfill from the `node-abort-controller` package. A minimal polyfill is provided for use by LRUCache.fetch(), but it should not be relied upon in other contexts (eg, passing it to other APIs that use AbortController/AbortSignal might have undesirable effects). You may disable this with LRU_CACHE_IGNORE_AC_WARNING=1 in the env.", "NO_ABORT_CONTROLLER", "ENOTSUP", t);
  };
}
var dBe = (e10) => !mW.has(e10), yi = (e10) => e10 && e10 === Math.floor(e10) && e10 > 0 && isFinite(e10), hW = (e10) => !yi(e10) ? null : e10 <= Math.pow(2, 8) ? Uint8Array : e10 <= Math.pow(2, 16) ? Uint16Array : e10 <= Math.pow(2, 32) ? Uint32Array : e10 <= Number.MAX_SAFE_INTEGER ? gp : null;
class gp extends Array {
  constructor(e10) {
    super(e10);
    this.fill(0);
  }
}
class Ec {
  heap;
  length;
  static #e = false;
  static create(e10) {
    let t = hW(e10);
    if (!t) return [];
    Ec.#e = true;
    let n = new Ec(e10, t);
    return Ec.#e = false, n;
  }
  constructor(e10, t) {
    if (!Ec.#e) throw TypeError("instantiate Stack using Stack.create(n)");
    this.heap = new t(e10), this.length = 0;
  }
  push(e10) {
    this.heap[this.length++] = e10;
  }
  pop() {
    return this.heap[--this.length];
  }
}
class m_ {
  #e;
  #t;
  #n;
  #o;
  #a;
  #u;
  ttl;
  ttlResolution;
  ttlAutopurge;
  updateAgeOnGet;
  updateAgeOnHas;
  allowStale;
  noDisposeOnSet;
  noUpdateTTL;
  maxEntrySize;
  sizeCalculation;
  noDeleteOnFetchRejection;
  noDeleteOnStaleGet;
  allowStaleOnFetchAbort;
  allowStaleOnFetchRejection;
  ignoreFetchAbort;
  #s;
  #d;
  #c;
  #i;
  #r;
  #p;
  #f;
  #l;
  #m;
  #y;
  #g;
  #S;
  #_;
  #h;
  #E;
  #C;
  #b;
  static unsafeExposeInternals(e10) {
    return { starts: e10.#_, ttls: e10.#h, sizes: e10.#S, keyMap: e10.#c, keyList: e10.#i, valList: e10.#r, next: e10.#p, prev: e10.#f, get head() {
      return e10.#l;
    }, get tail() {
      return e10.#m;
    }, free: e10.#y, isBackgroundFetch: (t) => e10.#A(t), backgroundFetch: (t, n, r, o) => e10.#$(t, n, r, o), moveToTail: (t) => e10.#U(t), indexes: (t) => e10.#P(t), rindexes: (t) => e10.#D(t), isStale: (t) => e10.#O(t) };
  }
  get max() {
    return this.#e;
  }
  get maxSize() {
    return this.#t;
  }
  get calculatedSize() {
    return this.#d;
  }
  get size() {
    return this.#s;
  }
  get fetchMethod() {
    return this.#a;
  }
  get memoMethod() {
    return this.#u;
  }
  get dispose() {
    return this.#n;
  }
  get disposeAfter() {
    return this.#o;
  }
  constructor(e10) {
    let { max: t = 0, ttl: n, ttlResolution: r = 1, ttlAutopurge: o, updateAgeOnGet: s, updateAgeOnHas: i, allowStale: a, dispose: l, disposeAfter: c, noDisposeOnSet: d, noUpdateTTL: p, maxSize: f = 0, maxEntrySize: m = 0, sizeCalculation: g, fetchMethod: _, memoMethod: y, noDeleteOnFetchRejection: S, noDeleteOnStaleGet: E, allowStaleOnFetchRejection: b, allowStaleOnFetchAbort: C, ignoreFetchAbort: A } = e10;
    if (t !== 0 && !yi(t)) throw TypeError("max option must be a nonnegative integer");
    let T = t ? hW(t) : Array;
    if (!T) throw Error("invalid max value: " + t);
    if (this.#e = t, this.#t = f, this.maxEntrySize = m || this.#t, this.sizeCalculation = g, this.sizeCalculation) {
      if (!this.#t && !this.maxEntrySize) throw TypeError("cannot set sizeCalculation without setting maxSize or maxEntrySize");
      if (typeof this.sizeCalculation !== "function") throw TypeError("sizeCalculation set to non-function");
    }
    if (y !== void 0 && typeof y !== "function") throw TypeError("memoMethod must be a function if defined");
    if (this.#u = y, _ !== void 0 && typeof _ !== "function") throw TypeError("fetchMethod must be a function if specified");
    if (this.#a = _, this.#C = !!_, this.#c = /* @__PURE__ */ new Map(), this.#i = Array(t).fill(void 0), this.#r = Array(t).fill(void 0), this.#p = new T(t), this.#f = new T(t), this.#l = 0, this.#m = 0, this.#y = Ec.create(t), this.#s = 0, this.#d = 0, typeof l === "function") this.#n = l;
    if (typeof c === "function") this.#o = c, this.#g = [];
    else this.#o = void 0, this.#g = void 0;
    if (this.#E = !!this.#n, this.#b = !!this.#o, this.noDisposeOnSet = !!d, this.noUpdateTTL = !!p, this.noDeleteOnFetchRejection = !!S, this.allowStaleOnFetchRejection = !!b, this.allowStaleOnFetchAbort = !!C, this.ignoreFetchAbort = !!A, this.maxEntrySize !== 0) {
      if (this.#t !== 0) {
        if (!yi(this.#t)) throw TypeError("maxSize must be a positive integer if specified");
      }
      if (!yi(this.maxEntrySize)) throw TypeError("maxEntrySize must be a positive integer if specified");
      this.#I();
    }
    if (this.allowStale = !!a, this.noDeleteOnStaleGet = !!E, this.updateAgeOnGet = !!s, this.updateAgeOnHas = !!i, this.ttlResolution = yi(r) || r === 0 ? r : 1, this.ttlAutopurge = !!o, this.ttl = n || 0, this.ttl) {
      if (!yi(this.ttl)) throw TypeError("ttl must be a positive integer if specified");
      this.#w();
    }
    if (this.#e === 0 && this.ttl === 0 && this.#t === 0) throw TypeError("At least one of max, maxSize, or ttl is required");
    if (!this.ttlAutopurge && !this.#e && !this.#t) {
      if (dBe("LRU_CACHE_UNBOUNDED")) mW.add("LRU_CACHE_UNBOUNDED"), gW("TTL caching without ttlAutopurge, max, or maxSize can result in unbounded memory consumption.", "UnboundedCacheWarning", "LRU_CACHE_UNBOUNDED", m_);
    }
  }
  getRemainingTTL(e10) {
    return this.#c.has(e10) ? 1 / 0 : 0;
  }
  #w() {
    let e10 = new gp(this.#e), t = new gp(this.#e);
    this.#h = e10, this.#_ = t, this.#v = (o, s, i = Sc.now()) => {
      if (t[o] = s !== 0 ? i : 0, e10[o] = s, s !== 0 && this.ttlAutopurge) {
        let a = setTimeout(() => {
          if (this.#O(o)) this.#M(this.#i[o], "expire");
        }, s + 1);
        if (a.unref) a.unref();
      }
    }, this.#R = (o) => {
      t[o] = e10[o] !== 0 ? Sc.now() : 0;
    }, this.#T = (o, s) => {
      if (e10[s]) {
        let i = e10[s], a = t[s];
        if (!i || !a) return;
        o.ttl = i, o.start = a, o.now = n || r();
        let l = o.now - a;
        o.remainingTTL = i - l;
      }
    };
    let n = 0, r = () => {
      let o = Sc.now();
      if (this.ttlResolution > 0) {
        n = o;
        let s = setTimeout(() => n = 0, this.ttlResolution);
        if (s.unref) s.unref();
      }
      return o;
    };
    this.getRemainingTTL = (o) => {
      let s = this.#c.get(o);
      if (s === void 0) return 0;
      let i = e10[s], a = t[s];
      if (!i || !a) return 1 / 0;
      let l = (n || r()) - a;
      return i - l;
    }, this.#O = (o) => {
      let s = t[o], i = e10[o];
      return !!i && !!s && (n || r()) - s > i;
    };
  }
  #R = () => {
  };
  #T = () => {
  };
  #v = () => {
  };
  #O = () => false;
  #I() {
    let e10 = new gp(this.#e);
    this.#d = 0, this.#S = e10, this.#k = (t) => {
      this.#d -= e10[t], e10[t] = 0;
    }, this.#L = (t, n, r, o) => {
      if (this.#A(n)) return 0;
      if (!yi(r)) if (o) {
        if (typeof o !== "function") throw TypeError("sizeCalculation must be a function");
        if (r = o(n, t), !yi(r)) throw TypeError("sizeCalculation return invalid (expect positive integer)");
      } else throw TypeError("invalid size value (must be positive integer). When maxSize or maxEntrySize is used, sizeCalculation or size must be set.");
      return r;
    }, this.#x = (t, n, r) => {
      if (e10[t] = n, this.#t) {
        let o = this.#t - e10[t];
        while (this.#d > o) this.#F(true);
      }
      if (this.#d += e10[t], r) r.entrySize = n, r.totalCalculatedSize = this.#d;
    };
  }
  #k = (e10) => {
  };
  #x = (e10, t, n) => {
  };
  #L = (e10, t, n, r) => {
    if (n || r) throw TypeError("cannot set size without setting maxSize or maxEntrySize on cache");
    return 0;
  };
  *#P({ allowStale: e10 = this.allowStale } = {}) {
    if (this.#s) for (let t = this.#m; ; ) {
      if (!this.#N(t)) break;
      if (e10 || !this.#O(t)) yield t;
      if (t === this.#l) break;
      else t = this.#f[t];
    }
  }
  *#D({ allowStale: e10 = this.allowStale } = {}) {
    if (this.#s) for (let t = this.#l; ; ) {
      if (!this.#N(t)) break;
      if (e10 || !this.#O(t)) yield t;
      if (t === this.#m) break;
      else t = this.#p[t];
    }
  }
  #N(e10) {
    return e10 !== void 0 && this.#c.get(this.#i[e10]) === e10;
  }
  *entries() {
    for (let e10 of this.#P()) if (this.#r[e10] !== void 0 && this.#i[e10] !== void 0 && !this.#A(this.#r[e10])) yield [this.#i[e10], this.#r[e10]];
  }
  *rentries() {
    for (let e10 of this.#D()) if (this.#r[e10] !== void 0 && this.#i[e10] !== void 0 && !this.#A(this.#r[e10])) yield [this.#i[e10], this.#r[e10]];
  }
  *keys() {
    for (let e10 of this.#P()) {
      let t = this.#i[e10];
      if (t !== void 0 && !this.#A(this.#r[e10])) yield t;
    }
  }
  *rkeys() {
    for (let e10 of this.#D()) {
      let t = this.#i[e10];
      if (t !== void 0 && !this.#A(this.#r[e10])) yield t;
    }
  }
  *values() {
    for (let e10 of this.#P()) if (this.#r[e10] !== void 0 && !this.#A(this.#r[e10])) yield this.#r[e10];
  }
  *rvalues() {
    for (let e10 of this.#D()) if (this.#r[e10] !== void 0 && !this.#A(this.#r[e10])) yield this.#r[e10];
  }
  [Symbol.iterator]() {
    return this.entries();
  }
  [Symbol.toStringTag] = "LRUCache";
  find(e10, t = {}) {
    for (let n of this.#P()) {
      let r = this.#r[n], o = this.#A(r) ? r.__staleWhileFetching : r;
      if (o === void 0) continue;
      if (e10(o, this.#i[n], this)) return this.get(this.#i[n], t);
    }
  }
  forEach(e10, t = this) {
    for (let n of this.#P()) {
      let r = this.#r[n], o = this.#A(r) ? r.__staleWhileFetching : r;
      if (o === void 0) continue;
      e10.call(t, o, this.#i[n], this);
    }
  }
  rforEach(e10, t = this) {
    for (let n of this.#D()) {
      let r = this.#r[n], o = this.#A(r) ? r.__staleWhileFetching : r;
      if (o === void 0) continue;
      e10.call(t, o, this.#i[n], this);
    }
  }
  purgeStale() {
    let e10 = false;
    for (let t of this.#D({ allowStale: true })) if (this.#O(t)) this.#M(this.#i[t], "expire"), e10 = true;
    return e10;
  }
  info(e10) {
    let t = this.#c.get(e10);
    if (t === void 0) return;
    let n = this.#r[t], r = this.#A(n) ? n.__staleWhileFetching : n;
    if (r === void 0) return;
    let o = { value: r };
    if (this.#h && this.#_) {
      let s = this.#h[t], i = this.#_[t];
      if (s && i) {
        let a = s - (Sc.now() - i);
        o.ttl = a, o.start = Date.now();
      }
    }
    if (this.#S) o.size = this.#S[t];
    return o;
  }
  dump() {
    let e10 = [];
    for (let t of this.#P({ allowStale: true })) {
      let n = this.#i[t], r = this.#r[t], o = this.#A(r) ? r.__staleWhileFetching : r;
      if (o === void 0 || n === void 0) continue;
      let s = { value: o };
      if (this.#h && this.#_) {
        s.ttl = this.#h[t];
        let i = Sc.now() - this.#_[t];
        s.start = Math.floor(Date.now() - i);
      }
      if (this.#S) s.size = this.#S[t];
      e10.unshift([n, s]);
    }
    return e10;
  }
  load(e10) {
    this.clear();
    for (let [t, n] of e10) {
      if (n.start) {
        let r = Date.now() - n.start;
        n.start = Sc.now() - r;
      }
      this.set(t, n.value, n);
    }
  }
  set(e10, t, n = {}) {
    if (t === void 0) return this.delete(e10), this;
    let { ttl: r = this.ttl, start: o, noDisposeOnSet: s = this.noDisposeOnSet, sizeCalculation: i = this.sizeCalculation, status: a } = n, { noUpdateTTL: l = this.noUpdateTTL } = n, c = this.#L(e10, t, n.size || 0, i);
    if (this.maxEntrySize && c > this.maxEntrySize) {
      if (a) a.set = "miss", a.maxEntrySizeExceeded = true;
      return this.#M(e10, "set"), this;
    }
    let d = this.#s === 0 ? void 0 : this.#c.get(e10);
    if (d === void 0) {
      if (d = this.#s === 0 ? this.#m : this.#y.length !== 0 ? this.#y.pop() : this.#s === this.#e ? this.#F(false) : this.#s, this.#i[d] = e10, this.#r[d] = t, this.#c.set(e10, d), this.#p[this.#m] = d, this.#f[d] = this.#m, this.#m = d, this.#s++, this.#x(d, c, a), a) a.set = "add";
      l = false;
    } else {
      this.#U(d);
      let p = this.#r[d];
      if (t !== p) {
        if (this.#C && this.#A(p)) {
          p.__abortController.abort(Error("replaced"));
          let { __staleWhileFetching: f } = p;
          if (f !== void 0 && !s) {
            if (this.#E) this.#n?.(f, e10, "set");
            if (this.#b) this.#g?.push([f, e10, "set"]);
          }
        } else if (!s) {
          if (this.#E) this.#n?.(p, e10, "set");
          if (this.#b) this.#g?.push([p, e10, "set"]);
        }
        if (this.#k(d), this.#x(d, c, a), this.#r[d] = t, a) {
          a.set = "replace";
          let f = p && this.#A(p) ? p.__staleWhileFetching : p;
          if (f !== void 0) a.oldValue = f;
        }
      } else if (a) a.set = "update";
    }
    if (r !== 0 && !this.#h) this.#w();
    if (this.#h) {
      if (!l) this.#v(d, r, o);
      if (a) this.#T(a, d);
    }
    if (!s && this.#b && this.#g) {
      let p = this.#g, f;
      while (f = p?.shift()) this.#o?.(...f);
    }
    return this;
  }
  pop() {
    try {
      while (this.#s) {
        let e10 = this.#r[this.#l];
        if (this.#F(true), this.#A(e10)) {
          if (e10.__staleWhileFetching) return e10.__staleWhileFetching;
        } else if (e10 !== void 0) return e10;
      }
    } finally {
      if (this.#b && this.#g) {
        let e10 = this.#g, t;
        while (t = e10?.shift()) this.#o?.(...t);
      }
    }
  }
  #F(e10) {
    let t = this.#l, n = this.#i[t], r = this.#r[t];
    if (this.#C && this.#A(r)) r.__abortController.abort(Error("evicted"));
    else if (this.#E || this.#b) {
      if (this.#E) this.#n?.(r, n, "evict");
      if (this.#b) this.#g?.push([r, n, "evict"]);
    }
    if (this.#k(t), e10) this.#i[t] = void 0, this.#r[t] = void 0, this.#y.push(t);
    if (this.#s === 1) this.#l = this.#m = 0, this.#y.length = 0;
    else this.#l = this.#p[t];
    return this.#c.delete(n), this.#s--, t;
  }
  has(e10, t = {}) {
    let { updateAgeOnHas: n = this.updateAgeOnHas, status: r } = t, o = this.#c.get(e10);
    if (o !== void 0) {
      let s = this.#r[o];
      if (this.#A(s) && s.__staleWhileFetching === void 0) return false;
      if (!this.#O(o)) {
        if (n) this.#R(o);
        if (r) r.has = "hit", this.#T(r, o);
        return true;
      } else if (r) r.has = "stale", this.#T(r, o);
    } else if (r) r.has = "miss";
    return false;
  }
  peek(e10, t = {}) {
    let { allowStale: n = this.allowStale } = t, r = this.#c.get(e10);
    if (r === void 0 || !n && this.#O(r)) return;
    let o = this.#r[r];
    return this.#A(o) ? o.__staleWhileFetching : o;
  }
  #$(e10, t, n, r) {
    let o = t === void 0 ? void 0 : this.#r[t];
    if (this.#A(o)) return o;
    let s = new f_(), { signal: i } = n;
    i?.addEventListener("abort", () => s.abort(i.reason), { signal: s.signal });
    let a = { signal: s.signal, options: n, context: r }, l = (g, _ = false) => {
      let { aborted: y } = s.signal, S = n.ignoreFetchAbort && g !== void 0;
      if (n.status) if (y && !_) {
        if (n.status.fetchAborted = true, n.status.fetchError = s.signal.reason, S) n.status.fetchAbortIgnored = true;
      } else n.status.fetchResolved = true;
      if (y && !S && !_) return d(s.signal.reason);
      let E = f;
      if (this.#r[t] === f) if (g === void 0) if (E.__staleWhileFetching) this.#r[t] = E.__staleWhileFetching;
      else this.#M(e10, "fetch");
      else {
        if (n.status) n.status.fetchUpdated = true;
        this.set(e10, g, a.options);
      }
      return g;
    }, c = (g) => {
      if (n.status) n.status.fetchRejected = true, n.status.fetchError = g;
      return d(g);
    }, d = (g) => {
      let { aborted: _ } = s.signal, y = _ && n.allowStaleOnFetchAbort, S = y || n.allowStaleOnFetchRejection, E = S || n.noDeleteOnFetchRejection, b = f;
      if (this.#r[t] === f) {
        if (!E || b.__staleWhileFetching === void 0) this.#M(e10, "fetch");
        else if (!y) this.#r[t] = b.__staleWhileFetching;
      }
      if (S) {
        if (n.status && b.__staleWhileFetching !== void 0) n.status.returnedStale = true;
        return b.__staleWhileFetching;
      } else if (b.__returned === b) throw g;
    }, p = (g, _) => {
      let y = this.#a?.(e10, o, a);
      if (y && y instanceof Promise) y.then((S) => g(S === void 0 ? void 0 : S), _);
      s.signal.addEventListener("abort", () => {
        if (!n.ignoreFetchAbort || n.allowStaleOnFetchAbort) {
          if (g(void 0), n.allowStaleOnFetchAbort) g = (S) => l(S, true);
        }
      });
    };
    if (n.status) n.status.fetchDispatched = true;
    let f = new Promise(p).then(l, c), m = Object.assign(f, { __abortController: s, __staleWhileFetching: o, __returned: void 0 });
    if (t === void 0) this.set(e10, m, { ...a.options, status: void 0 }), t = this.#c.get(e10);
    else this.#r[t] = m;
    return m;
  }
  #A(e10) {
    if (!this.#C) return false;
    let t = e10;
    return !!t && t instanceof Promise && t.hasOwnProperty("__staleWhileFetching") && t.__abortController instanceof f_;
  }
  async fetch(e10, t = {}) {
    let { allowStale: n = this.allowStale, updateAgeOnGet: r = this.updateAgeOnGet, noDeleteOnStaleGet: o = this.noDeleteOnStaleGet, ttl: s = this.ttl, noDisposeOnSet: i = this.noDisposeOnSet, size: a = 0, sizeCalculation: l = this.sizeCalculation, noUpdateTTL: c = this.noUpdateTTL, noDeleteOnFetchRejection: d = this.noDeleteOnFetchRejection, allowStaleOnFetchRejection: p = this.allowStaleOnFetchRejection, ignoreFetchAbort: f = this.ignoreFetchAbort, allowStaleOnFetchAbort: m = this.allowStaleOnFetchAbort, context: g, forceRefresh: _ = false, status: y, signal: S } = t;
    if (!this.#C) {
      if (y) y.fetch = "get";
      return this.get(e10, { allowStale: n, updateAgeOnGet: r, noDeleteOnStaleGet: o, status: y });
    }
    let E = { allowStale: n, updateAgeOnGet: r, noDeleteOnStaleGet: o, ttl: s, noDisposeOnSet: i, size: a, sizeCalculation: l, noUpdateTTL: c, noDeleteOnFetchRejection: d, allowStaleOnFetchRejection: p, allowStaleOnFetchAbort: m, ignoreFetchAbort: f, status: y, signal: S }, b = this.#c.get(e10);
    if (b === void 0) {
      if (y) y.fetch = "miss";
      let C = this.#$(e10, b, E, g);
      return C.__returned = C;
    } else {
      let C = this.#r[b];
      if (this.#A(C)) {
        let F = n && C.__staleWhileFetching !== void 0;
        if (y) {
          if (y.fetch = "inflight", F) y.returnedStale = true;
        }
        return F ? C.__staleWhileFetching : C.__returned = C;
      }
      let A = this.#O(b);
      if (!_ && !A) {
        if (y) y.fetch = "hit";
        if (this.#U(b), r) this.#R(b);
        if (y) this.#T(y, b);
        return C;
      }
      let T = this.#$(e10, b, E, g), U = T.__staleWhileFetching !== void 0 && n;
      if (y) {
        if (y.fetch = A ? "stale" : "refresh", U && A) y.returnedStale = true;
      }
      return U ? T.__staleWhileFetching : T.__returned = T;
    }
  }
  async forceFetch(e10, t = {}) {
    let n = await this.fetch(e10, t);
    if (n === void 0) throw Error("fetch() returned undefined");
    return n;
  }
  memo(e10, t = {}) {
    let n = this.#u;
    if (!n) throw Error("no memoMethod provided to constructor");
    let { context: r, forceRefresh: o, ...s } = t, i = this.get(e10, s);
    if (!o && i !== void 0) return i;
    let a = n(e10, i, { options: s, context: r });
    return this.set(e10, a, s), a;
  }
  get(e10, t = {}) {
    let { allowStale: n = this.allowStale, updateAgeOnGet: r = this.updateAgeOnGet, noDeleteOnStaleGet: o = this.noDeleteOnStaleGet, status: s } = t, i = this.#c.get(e10);
    if (i !== void 0) {
      let a = this.#r[i], l = this.#A(a);
      if (s) this.#T(s, i);
      if (this.#O(i)) {
        if (s) s.get = "stale";
        if (!l) {
          if (!o) this.#M(e10, "expire");
          if (s && n) s.returnedStale = true;
          return n ? a : void 0;
        } else {
          if (s && n && a.__staleWhileFetching !== void 0) s.returnedStale = true;
          return n ? a.__staleWhileFetching : void 0;
        }
      } else {
        if (s) s.get = "hit";
        if (l) return a.__staleWhileFetching;
        if (this.#U(i), r) this.#R(i);
        return a;
      }
    } else if (s) s.get = "miss";
  }
  #z(e10, t) {
    this.#f[t] = e10, this.#p[e10] = t;
  }
  #U(e10) {
    if (e10 !== this.#m) {
      if (e10 === this.#l) this.#l = this.#p[e10];
      else this.#z(this.#f[e10], this.#p[e10]);
      this.#z(this.#m, e10), this.#m = e10;
    }
  }
  delete(e10) {
    return this.#M(e10, "delete");
  }
  #M(e10, t) {
    let n = false;
    if (this.#s !== 0) {
      let r = this.#c.get(e10);
      if (r !== void 0) if (n = true, this.#s === 1) this.#H(t);
      else {
        this.#k(r);
        let o = this.#r[r];
        if (this.#A(o)) o.__abortController.abort(Error("deleted"));
        else if (this.#E || this.#b) {
          if (this.#E) this.#n?.(o, e10, t);
          if (this.#b) this.#g?.push([o, e10, t]);
        }
        if (this.#c.delete(e10), this.#i[r] = void 0, this.#r[r] = void 0, r === this.#m) this.#m = this.#f[r];
        else if (r === this.#l) this.#l = this.#p[r];
        else {
          let s = this.#f[r];
          this.#p[s] = this.#p[r];
          let i = this.#p[r];
          this.#f[i] = this.#f[r];
        }
        this.#s--, this.#y.push(r);
      }
    }
    if (this.#b && this.#g?.length) {
      let r = this.#g, o;
      while (o = r?.shift()) this.#o?.(...o);
    }
    return n;
  }
  clear() {
    return this.#H("delete");
  }
  #H(e10) {
    for (let t of this.#D({ allowStale: true })) {
      let n = this.#r[t];
      if (this.#A(n)) n.__abortController.abort(Error("deleted"));
      else {
        let r = this.#i[t];
        if (this.#E) this.#n?.(n, r, e10);
        if (this.#b) this.#g?.push([n, r, e10]);
      }
    }
    if (this.#c.clear(), this.#r.fill(void 0), this.#i.fill(void 0), this.#h && this.#_) this.#h.fill(0), this.#_.fill(0);
    if (this.#S) this.#S.fill(0);
    if (this.#l = 0, this.#m = 0, this.#y.length = 0, this.#d = 0, this.#s = 0, this.#b && this.#g) {
      let t = this.#g, n;
      while (n = t?.shift()) this.#o?.(...n);
    }
  }
}
function g_(e10, t, n = 100) {
  let r = new m_({ max: n }), o = (...s) => {
    let i = t(...s), a = r.get(i);
    if (a !== void 0) return a;
    let l = e10(...s);
    return r.set(i, l), l;
  };
  return o.cache = { clear: () => r.clear(), size: () => r.size, delete: (s) => r.delete(s), get: (s) => r.peek(s), has: (s) => r.has(s), set: (s, i) => void r.set(s, i) }, o;
}
var pBe = 8192;
function yW(e10, t) {
  try {
    return { ok: true, value: JSON.parse(yc(e10)) };
  } catch (n) {
    if (t) ji(yk(n, `safeParseJSON: invalid JSON (${n instanceof Error ? n.constructor.name : typeof n}, ${e10.length} bytes)`));
    return { ok: false };
  }
}
class SW {
  cached = g_(yW, (e10) => e10, 50);
  cache = this.cached.cache;
  parse(e10, t) {
    return this.cached(e10, t);
  }
}
var _W = new SW();
Object.assign(function(t, n = true) {
  if (!t) return null;
  let r = t.length > pBe ? yW(t, n) : _W.parse(t, n);
  return r.ok ? r.value : null;
}, { cache: _W.cache });
var DW = "cc-plugin-sec-default";
var hp = ["remote_cowork", "remote_cowork_trigger"];
var LW = { cli: true, mcp: true, "sdk-cli": true, "sdk-ts": true, "sdk-py": true, bench: true, "claude-vscode": true, "claude-code-github-action": true, "local-agent": true, local_agent: true, "claude-desktop": true, remote: true, remote_baku: true, remote_cowork: true, remote_trigger: true, remote_cowork_trigger: true, remote_desktop: true, remote_mobile: true, remote_projects: true, claude_in_slack: true, "claude-in-slack": true, "claude-in-teams": true, "claude-desktop-3p": true, "claude-security": true, "ssh-remote": true, "claude-coworker": true, "claude-coworker-terminal": true };
new Set(Object.keys(LW));
new Set(hp);
function PBe(e10) {
  return e10?.startsWith("remote") === true;
}
var LBe = /* @__PURE__ */ new Set(["claude-vscode", "claude-desktop", "claude-desktop-3p", "local-agent", "local_agent", "remote", "remote_desktop", "remote_mobile", "remote_projects", "remote_cowork", "ssh-remote", "claude-in-slack", "claude_in_slack", "claude-in-teams", "claude-coworker", "claude-coworker-terminal"]);
new Set([...LBe].filter(PBe));
var yp = ["low", "medium", "high", "xhigh", "max"];
var Ao = P(() => [{ path: ["allowManagedPermissionRulesOnly"], restrictive: true }, { path: ["allowManagedHooksOnly"], restrictive: true }, { path: ["allowManagedMcpServersOnly"], restrictive: true }, { path: ["enforceAvailableModels"], restrictive: true }, { path: ["disableAllHooks"], restrictive: true }, { path: ["disableClaudeAiConnectors"], restrictive: true }, { path: ["disableCommandPluginSources"], restrictive: true }, { path: ["disableSideloadFlags"], restrictive: true }, { path: ["disableSkillShellExecution"], restrictive: true }, { path: ["disableRemoteControl"], restrictive: true }, { path: ["disableAgentView"], restrictive: true }, { path: ["disableWorkflows"], restrictive: true }, { path: ["disableArtifact"], restrictive: true }, { path: ["disableBundledSkills"], restrictive: true }, { path: ["fastModePerSessionOptIn"], restrictive: true }, { path: ["isolatePeerMachines"], restrictive: true }, { path: ["strictPluginOnlyCustomization"], restrictive: true }, { path: ["disableAutoMode"], restrictive: "disable" }, { path: ["disableDeepLinkRegistration"], restrictive: "disable" }, { path: ["permissions", "disableBypassPermissionsMode"], restrictive: "disable" }, { path: ["permissions", "disableAutoMode"], restrictive: "disable" }, { path: ["permissions", "blockReadsOutsideWorkingDirectories"], restrictive: true }, { path: ["permissions", "blockWritesOutsideWorkingDirectories"], restrictive: true }, { path: ["autoMode", "classifyAllShell"], restrictive: true }, ...[], { path: ["worktree", "bgIsolation"], restrictive: "worktree" }, { path: ["enableArtifact"], restrictive: false }, { path: ["enableWorkflows"], restrictive: false }, { path: ["syncClaudeAiSkills"], restrictive: false }, { path: ["syncClaudeAiPlugins"], restrictive: false }, { path: ["useAutoModeDuringPlan"], restrictive: false }, { path: ["skipDangerousModePermissionPrompt"], restrictive: false }, { path: ["skipAutoPermissionPrompt"], restrictive: false }, { path: ["enableAllProjectMcpServers"], restrictive: false }, { path: ["channelsEnabled"], restrictive: false }, { path: ["skipWebFetchPreflight"], restrictive: false }, { path: ["skipWorkflowUsageWarning"], restrictive: false }, { path: ["autoUploadSessions"], restrictive: false }, { path: ["remoteControlAtStartup"], restrictive: false }, { path: ["remoteTools", "allowUnattendedServing"], restrictive: false }, { path: ["autoContinueAtUsageLimit"], restrictive: false }, { path: ["responseComparisonEnabled"], restrictive: false }, ...[], ...[], { path: ["attribution", "sessionUrl"], restrictive: false }, { path: ["crossSessionInbound"], restrictive: ["refuse", "hold"] }, { path: ["remoteControl", "shareHostProfile"], restrictive: ["off", "basic"] }, { path: ["modelProposedGoals"], restrictive: ["disabled", "alwaysAsk"] }, { path: ["maxEffortLevel"], restrictive: yp }, { path: ["feedbackDrafts"], restrictive: "off" }, { path: ["availableModelsMatch"], restrictive: "exact" }, { path: ["askUserQuestionTimeout"], restrictive: "never" }, { path: ["dialogExpiry"], restrictive: "never" }, { path: ["sandbox", "enabled"], restrictive: true }, { path: ["sandbox", "failIfUnavailable"], restrictive: true }, { path: ["sandbox", "autoAllowBashIfSandboxed"], restrictive: false }, { path: ["sandbox", "allowUnsandboxedCommands"], restrictive: false }, { path: ["sandbox", "enableWeakerNestedSandbox"], restrictive: false }, { path: ["sandbox", "enableWeakerNetworkIsolation"], restrictive: false }, { path: ["sandbox", "allowAppleEvents"], restrictive: false }, { path: ["sandbox", "allowNestedUserNamespaces"], restrictive: false }, { path: ["sandbox", "network", "allowManagedDomainsOnly"], restrictive: true }, { path: ["sandbox", "network", "strictAllowlist"], restrictive: true }, { path: ["sandbox", "network", "allowAllUnixSockets"], restrictive: false }, { path: ["sandbox", "network", "allowLocalBinding"], restrictive: false }, { path: ["sandbox", "filesystem", "allowManagedReadPathsOnly"], restrictive: true }, { path: ["sandbox", "filesystem", "disabled"], restrictive: false }, { path: ["sandbox", "credentials", "allowPlaintextInject"], restrictive: false }, { path: ["sandbox", "credentials", "sigv4", "streaming"], restrictive: "deny" }, { path: ["sandbox", "credentials", "sigv4", "presigned"], restrictive: "deny" }, { path: ["sandbox", "credentials", "sigv4", "sigv4a"], restrictive: "deny" }, { path: ["isolation", "required"], restrictive: true }, { path: ["isolation", "persistHome"], restrictive: false }]);
function ma(e10) {
  return Array.isArray(e10) ? e10 : [e10];
}
var bc = `${DW}@builtin`, __ = Object.freeze({ settings: Object.freeze(["allowManagedHooksOnly", "disableAllHooks", "disableCommandPluginSources"]), policyModOptions: Object.freeze(["allowManagedModsOnly"]), setAside: Object.freeze(["allowModsToOverrideDenyRules"]) });
function jW(e10) {
  return e10 === true;
}
function BW(e10) {
  return e10 !== false && (["string", "number", "boolean"].includes(typeof e10) || Array.isArray(e10) && e10.every((t) => typeof t === "string"));
}
[...__.settings.map((e10) => ({ path: [e10], holds: jW })), ...__.policyModOptions.map((e10) => ({ path: ["pluginConfigs", bc, "options", e10], holds: BW }))];
function zBe(e10) {
  return function(t, n, r) {
    var o = -1, s = Object(t), i = r(t), a = i.length;
    while (a--) {
      var l = i[e10 ? a : ++o];
      if (n(s[l], l, s) === false) break;
    }
    return t;
  };
}
var KW = zBe;
var HBe = KW(), E_ = HBe;
function jBe(e10, t) {
  return e10 && E_(e10, t, Eo);
}
var b_ = jBe;
function BBe(e10, t) {
  var n = {};
  return t = bo(t), b_(e10, function(r, o, s) {
    hi(n, o, t(r, o, s));
  }), n;
}
var C_ = BBe;
function KBe(e10, t, n) {
  if (n !== void 0 && !go(e10[t], n) || n === void 0 && !(t in e10)) hi(e10, t, n);
}
var Ep = KBe;
var qW = typeof R_ == "object" && R_ && !R_.nodeType && R_, GW = qW && typeof A_ == "object" && A_ && !A_.nodeType && A_, GBe = GW && GW.exports === qW, WW = GBe ? $t.Buffer : void 0, VW = WW ? WW.allocUnsafe : void 0;
function WBe(e10, t) {
  if (t) return e10.slice();
  var n = e10.length, r = VW ? VW(n) : new e10.constructor(n);
  return e10.copy(r), r;
}
var bp = WBe;
function VBe(e10) {
  var t = new e10.constructor(e10.byteLength);
  return new rc(t).set(new rc(e10)), t;
}
var Cc = VBe;
function qBe(e10, t) {
  var n = t ? Cc(e10.buffer) : e10.buffer;
  return new e10.constructor(n, e10.byteOffset, e10.length);
}
var O_ = qBe;
function YBe(e10, t) {
  var n = -1, r = e10.length;
  t || (t = Array(r));
  while (++n < r) t[n] = e10[n];
  return t;
}
var T_ = YBe;
var YW = Object.create, ZBe = /* @__PURE__ */ (function() {
  function e10() {
  }
  return function(t) {
    if (!It(t)) return {};
    if (YW) return YW(t);
    e10.prototype = t;
    var n = new e10();
    return e10.prototype = void 0, n;
  };
})(), ZW = ZBe;
function JBe(e10) {
  return typeof e10.constructor == "function" && !uc(e10) ? ZW(hc(e10)) : {};
}
var w_ = JBe;
function XBe(e10) {
  return Vt(e10) && So(e10);
}
var JW = XBe;
var QBe = "[object Object]", eKe = Function.prototype, tKe = Object.prototype, XW = eKe.toString, nKe = tKe.hasOwnProperty, rKe = XW.call(Object);
function oKe(e10) {
  if (!Vt(e10) || er(e10) != QBe) return false;
  var t = hc(e10);
  if (t === null) return true;
  var n = nKe.call(t, "constructor") && t.constructor;
  return typeof n == "function" && n instanceof n && XW.call(n) == rKe;
}
var x_ = oKe;
function sKe(e10, t) {
  if (t === "constructor" && typeof e10[t] === "function") return;
  if (t == "__proto__") return;
  return e10[t];
}
var Cp = sKe;
function iKe(e10, t, n, r) {
  var o = !n;
  n || (n = {});
  var s = -1, i = t.length;
  while (++s < i) {
    var a = t[s], l = r ? r(n[a], e10[a], a, n, e10) : void 0;
    if (l === void 0) l = e10[a];
    if (o) hi(n, a, l);
    else gc(n, a, l);
  }
  return n;
}
var br = iKe;
function aKe(e10) {
  return br(e10, Co(e10));
}
var QW = aKe;
function lKe(e10, t, n, r, o, s, i) {
  var a = Cp(e10, n), l = Cp(t, n), c = i.get(l);
  if (c) {
    Ep(e10, n, c);
    return;
  }
  var d = s ? s(a, l, n + "", e10, t, i) : void 0, p = d === void 0;
  if (p) {
    var f = ot(l), m = !f && _o(l), g = !f && !m && cc(l);
    if (d = l, f || m || g) if (ot(a)) d = a;
    else if (JW(a)) d = T_(a);
    else if (m) p = false, d = bp(l, true);
    else if (g) p = false, d = O_(l, true);
    else d = [];
    else if (x_(l) || ts(l)) {
      if (d = a, ts(a)) d = QW(a);
      else if (!It(a) || Ql(a)) d = w_(l);
    } else p = false;
  }
  if (p) i.set(l, d), o(d, l, r, s, i), i.delete(l);
  Ep(e10, n, d);
}
var eV = lKe;
function tV(e10, t, n, r, o) {
  if (e10 === t) return;
  E_(t, function(s, i) {
    if (o || (o = new ho()), It(s)) eV(e10, t, i, n, tV, r, o);
    else {
      var a = r ? r(Cp(e10, i), s, i + "", e10, t, o) : void 0;
      if (a === void 0) a = s;
      Ep(e10, i, a);
    }
  }, Co);
}
var nV = tV;
function cKe(e10, t, n) {
  switch (n.length) {
    case 0:
      return e10.call(t);
    case 1:
      return e10.call(t, n[0]);
    case 2:
      return e10.call(t, n[0], n[1]);
    case 3:
      return e10.call(t, n[0], n[1], n[2]);
  }
  return e10.apply(t, n);
}
var rV = cKe;
var oV = Math.max;
function uKe(e10, t, n) {
  return t = oV(t === void 0 ? e10.length - 1 : t, 0), function() {
    var r = arguments, o = -1, s = oV(r.length - t, 0), i = Array(s);
    while (++o < s) i[o] = r[t + o];
    o = -1;
    var a = Array(t + 1);
    while (++o < t) a[o] = r[o];
    return a[t] = n(i), rV(e10, this, a);
  };
}
var v_ = uKe;
function dKe(e10) {
  return function() {
    return e10;
  };
}
var sV = dKe;
var pKe = !mc ? fc : function(e10, t) {
  return mc(e10, "toString", { configurable: true, enumerable: false, value: sV(t), writable: true });
}, iV = pKe;
var fKe = 800, mKe = 16, gKe = Date.now;
function hKe(e10) {
  var t = 0, n = 0;
  return function() {
    var r = gKe(), o = mKe - (r - n);
    if (n = r, o > 0) {
      if (++t >= fKe) return arguments[0];
    } else t = 0;
    return e10.apply(void 0, arguments);
  };
}
var aV = hKe;
var _Ke = aV(iV), k_ = _Ke;
function yKe(e10, t) {
  return k_(v_(e10, t, fc), e10 + "");
}
var lV = yKe;
function SKe(e10, t, n) {
  if (!It(n)) return false;
  var r = typeof t;
  if (r == "number" ? So(n) && fi(t, n.length) : r == "string" && t in n) return go(n[t], e10);
  return false;
}
var cV = SKe;
function EKe(e10) {
  return lV(function(t, n) {
    var r = -1, o = n.length, s = o > 1 ? n[o - 1] : void 0, i = o > 2 ? n[2] : void 0;
    if (s = e10.length > 3 && typeof s == "function" ? (o--, s) : void 0, i && cV(n[0], n[1], i)) s = o < 3 ? void 0 : s, o = 1;
    t = Object(t);
    while (++r < o) {
      var a = n[r];
      if (a) e10(t, a, r, s);
    }
    return t;
  });
}
var uV = EKe;
uV(function(e10, t, n, r) {
  nV(e10, t, n, r);
});
function CKe(e10, t) {
  var n = -1, r = e10 == null ? 0 : e10.length;
  while (++n < r) if (t(e10[n], n, e10) === false) break;
  return e10;
}
var dV = CKe;
function AKe(e10, t) {
  return e10 && br(t, Eo(t), e10);
}
var pV = AKe;
function RKe(e10, t) {
  return e10 && br(t, Co(t), e10);
}
var fV = RKe;
function OKe(e10, t) {
  return br(e10, ic(e10), t);
}
var mV = OKe;
function TKe(e10, t) {
  return br(e10, u_(e10), t);
}
var gV = TKe;
var wKe = Object.prototype, xKe = wKe.hasOwnProperty;
function vKe(e10) {
  var t = e10.length, n = new e10.constructor(t);
  if (t && typeof e10[0] == "string" && xKe.call(e10, "index")) n.index = e10.index, n.input = e10.input;
  return n;
}
var hV = vKe;
function kKe(e10, t) {
  var n = t ? Cc(e10.buffer) : e10.buffer;
  return new e10.constructor(n, e10.byteOffset, e10.byteLength);
}
var _V = kKe;
var PKe = /\w*$/;
function IKe(e10) {
  var t = new e10.constructor(e10.source, PKe.exec(e10));
  return t.lastIndex = e10.lastIndex, t;
}
var yV = IKe;
var SV = nn ? nn.prototype : void 0, EV = SV ? SV.valueOf : void 0;
function DKe(e10) {
  return EV ? Object(EV.call(e10)) : {};
}
var bV = DKe;
var LKe = "[object Boolean]", MKe = "[object Date]", NKe = "[object Map]", UKe = "[object Number]", FKe = "[object RegExp]", $Ke = "[object Set]", zKe = "[object String]", HKe = "[object Symbol]", jKe = "[object ArrayBuffer]", BKe = "[object DataView]", KKe = "[object Float32Array]", GKe = "[object Float64Array]", WKe = "[object Int8Array]", VKe = "[object Int16Array]", qKe = "[object Int32Array]", YKe = "[object Uint8Array]", ZKe = "[object Uint8ClampedArray]", JKe = "[object Uint16Array]", XKe = "[object Uint32Array]";
function QKe(e10, t, n) {
  var r = e10.constructor;
  switch (t) {
    case jKe:
      return Cc(e10);
    case LKe:
    case MKe:
      return new r(+e10);
    case BKe:
      return _V(e10, n);
    case KKe:
    case GKe:
    case WKe:
    case VKe:
    case qKe:
    case YKe:
    case ZKe:
    case JKe:
    case XKe:
      return O_(e10, n);
    case NKe:
      return new r();
    case UKe:
    case zKe:
      return new r(e10);
    case FKe:
      return yV(e10);
    case $Ke:
      return new r();
    case HKe:
      return bV(e10);
  }
}
var CV = QKe;
var e1e = "[object Map]";
function t1e(e10) {
  return Vt(e10) && ns(e10) == e1e;
}
var AV = t1e;
var RV = yo && yo.isMap, n1e = RV ? lc(RV) : AV, OV = n1e;
var r1e = "[object Set]";
function o1e(e10) {
  return Vt(e10) && ns(e10) == r1e;
}
var TV = o1e;
var wV = yo && yo.isSet, s1e = wV ? lc(wV) : TV, xV = s1e;
var i1e = 1, a1e = 2, l1e = 4, vV = "[object Arguments]", c1e = "[object Array]", u1e = "[object Boolean]", d1e = "[object Date]", p1e = "[object Error]", kV = "[object Function]", f1e = "[object GeneratorFunction]", m1e = "[object Map]", g1e = "[object Number]", PV = "[object Object]", h1e = "[object RegExp]", _1e = "[object Set]", y1e = "[object String]", S1e = "[object Symbol]", E1e = "[object WeakMap]", b1e = "[object ArrayBuffer]", C1e = "[object DataView]", A1e = "[object Float32Array]", R1e = "[object Float64Array]", O1e = "[object Int8Array]", T1e = "[object Int16Array]", w1e = "[object Int32Array]", x1e = "[object Uint8Array]", v1e = "[object Uint8ClampedArray]", k1e = "[object Uint16Array]", P1e = "[object Uint32Array]", st = {};
st[vV] = st[c1e] = st[b1e] = st[C1e] = st[u1e] = st[d1e] = st[A1e] = st[R1e] = st[O1e] = st[T1e] = st[w1e] = st[m1e] = st[g1e] = st[PV] = st[h1e] = st[_1e] = st[y1e] = st[S1e] = st[x1e] = st[v1e] = st[k1e] = st[P1e] = true;
st[p1e] = st[kV] = st[E1e] = false;
function P_(e10, t, n, r, o, s) {
  var i, a = t & i1e, l = t & a1e, c = t & l1e;
  if (n) i = o ? n(e10, r, o, s) : n(e10);
  if (i !== void 0) return i;
  if (!It(e10)) return e10;
  var d = ot(e10);
  if (d) {
    if (i = hV(e10), !a) return T_(e10, i);
  } else {
    var p = ns(e10), f = p == kV || p == f1e;
    if (_o(e10)) return bp(e10, a);
    if (p == PV || p == vV || f && !o) {
      if (i = l || f ? {} : w_(e10), !a) return l ? gV(e10, fV(i, e10)) : mV(e10, pV(i, e10));
    } else {
      if (!st[p]) return o ? e10 : {};
      i = CV(e10, p, a);
    }
  }
  s || (s = new ho());
  var m = s.get(e10);
  if (m) return m;
  if (s.set(e10, i), xV(e10)) e10.forEach(function(y) {
    i.add(P_(y, t, n, y, e10, s));
  });
  else if (OV(e10)) e10.forEach(function(y, S) {
    i.set(S, P_(y, t, n, S, e10, s));
  });
  var g = c ? l ? _c : fp : l ? Co : Eo, _ = d ? void 0 : g(e10);
  return dV(_ || e10, function(y, S) {
    if (_) S = y, y = e10[S];
    gc(i, S, P_(y, t, n, S, e10, s));
  }), i;
}
var IV = P_;
function I1e(e10) {
  var t = e10 == null ? 0 : e10.length;
  return t ? e10[t - 1] : void 0;
}
var DV = I1e;
function D1e(e10, t, n) {
  var r = -1, o = e10.length;
  if (t < 0) t = -t > o ? 0 : o + t;
  if (n = n > o ? o : n, n < 0) n += o;
  o = t > n ? 0 : n - t >>> 0, t >>>= 0;
  var s = Array(o);
  while (++r < o) s[r] = e10[r + t];
  return s;
}
var LV = D1e;
function L1e(e10, t) {
  return t.length < 2 ? e10 : gi(e10, LV(t, 0, -1));
}
var MV = L1e;
var M1e = Object.prototype, N1e = M1e.hasOwnProperty;
function U1e(e10, t) {
  t = Er(t, e10);
  var n = -1, r = t.length;
  if (!r) return true;
  while (++n < r) {
    var o = tr(t[n]);
    if (o === "__proto__" && !N1e.call(e10, "__proto__")) return false;
    if ((o === "constructor" || o === "prototype") && n < r - 1) return false;
  }
  var s = MV(e10, t);
  return s == null || delete s[tr(DV(t))];
}
var I_ = U1e;
function F1e(e10) {
  return x_(e10) ? void 0 : e10;
}
var NV = F1e;
var UV = nn ? nn.isConcatSpreadable : void 0;
function $1e(e10) {
  return ot(e10) || ts(e10) || !!(UV && e10 && e10[UV]);
}
var FV = $1e;
function $V(e10, t, n, r, o) {
  var s = -1, i = e10.length;
  n || (n = FV), o || (o = []);
  while (++s < i) {
    var a = e10[s];
    if (t > 0 && n(a)) if (t > 1) $V(a, t - 1, n, r, o);
    else sc(o, a);
    else if (!r) o[o.length] = a;
  }
  return o;
}
var zV = $V;
function z1e(e10) {
  var t = e10 == null ? 0 : e10.length;
  return t ? zV(e10, 1) : [];
}
var HV = z1e;
function H1e(e10) {
  return k_(v_(e10, void 0, HV), e10 + "");
}
var D_ = H1e;
var j1e = 1, B1e = 2, K1e = 4;
D_(function(e10, t) {
  var n = {};
  if (e10 == null) return n;
  var r = false;
  if (t = Yl(t, function(s) {
    return s = Er(s, e10), r || (r = s.length > 1), s;
  }), br(e10, _c(e10), n), r) n = IV(n, j1e | B1e | K1e, NV);
  var o = t.length;
  while (o--) I_(n, t[o]);
  return n;
});
function X1e(e10, t) {
  return c_(e10, t, function(n, r) {
    return l_(e10, r);
  });
}
var qV = X1e;
D_(function(e10, t) {
  return e10 == null ? {} : qV(e10, t);
});
var tGe = "Expected a function";
function nGe(e10) {
  if (typeof e10 != "function") throw TypeError(tGe);
  return function() {
    var t = arguments;
    switch (t.length) {
      case 0:
        return !e10.call(this);
      case 1:
        return !e10.call(this, t[0]);
      case 2:
        return !e10.call(this, t[0], t[1]);
      case 3:
        return !e10.call(this, t[0], t[1], t[2]);
    }
    return !e10.apply(this, t);
  };
}
var ZV = nGe;
function rGe(e10, t) {
  return d_(e10, ZV(bo(t)));
}
var ga = rGe;
function uGe() {
}
var r2 = uGe;
var dGe = 1 / 0;
!(mi && 1 / oc(new mi([, -0]))[1] == dGe) ? r2 : function(e10) {
  return new mi(e10);
};
var MGe = 3, FGe = /^[A-Za-z0-9+/]+={0,2}$/;
P(() => O({ alg: N("ES256"), typ: N("cc-signed-cache+jws"), kid: h(), x5c: k(h().regex(FGe)).min(1).max(MGe) }));
P(() => O({ v: N(1), typ: h(), aud: h(), iat: q(), sha: h(), sub: h().optional(), ws: h().optional(), exp: ud().optional(), abs: N(true).optional(), doc: h().optional(), plan: h().optional() }));
P(() => O({ v: ud().min(2) }));
P(() => O({ jws: h().min(1), receivedAt: q() }));
var XGe = { roots: [{ pem: `-----BEGIN CERTIFICATE-----
MIIB3TCCAYKgAwIBAgIUANUYY/tuc08yPd9Nsh7rY/zDEiwwCgYIKoZIzj0EAwIw
OjESMBAGA1UEChMJQW50aHJvcGljMSQwIgYDVQQDExtBbnRocm9waWMgQXBwcyBT
aWduaW5nIFJvb3QwHhcNMjYwOTAyMjMzNDMwWhcNNDEwODI5MjMzNDI5WjA6MRIw
EAYDVQQKEwlBbnRocm9waWMxJDAiBgNVBAMTG0FudGhyb3BpYyBBcHBzIFNpZ25p
bmcgUm9vdDBZMBMGByqGSM49AgEGCCqGSM49AwEHA0IABAsUtD9z65VTC61W8M40
B+bGEhcvb+8mLm/9aTh39H4lwLH0agHzBBqkt4dvqqGzo1J2pJN7L7UoX9nEEVbO
7rmjZjBkMA4GA1UdDwEB/wQEAwIBBjASBgNVHRMBAf8ECDAGAQH/AgEBMB0GA1Ud
DgQWBBQW+2L0kdDEOi+A6fBK5jpwNdtoCzAfBgNVHSMEGDAWgBQW+2L0kdDEOi+A
6fBK5jpwNdtoCzAKBggqhkjOPQQDAgNJADBGAiEA+vhhLCvaUT2ccO0ND0YZaUy0
e+zhUoJOBhE9hXPs+SkCIQCHdbMcFo/ZQEq/rVnaS8qv/BZvRfYoEm318TY0WBU4
XA==
-----END CERTIFICATE-----`, marker: "urn:anthropic:claude-code:signed-cache:production" }] }, R2 = XGe.roots;
var O2 = { issuingCommonName: "Claude Code Signed Cache Issuing CA" };
Object.freeze(R2.map((e10) => Object.freeze({ ...e10, issuingCommonName: O2.issuingCommonName })));
var sWe = /* @__PURE__ */ new Map([["˂", "<"], ["˃", ">"], ["ᐳ", ">"], ["ᐸ", "<"], ["ᚲ", "<"], ["‹", "<"], ["›", ">"], ["≮", "<"], ["≯", ">"], ["≺", "<"], ["≻", ">"], ["⊀", "<"], ["⊁", ">"], ["⋖", "<"], ["⋗", ">"], ["〈", "<"], ["〉", ">"], ["❬", "<"], ["❭", ">"], ["❮", "<"], ["❯", ">"], ["❰", "<"], ["❱", ">"], ["⟨", "<"], ["⟩", ">"], ["⦑", "<"], ["⦒", ">"], ["⦓", "<"], ["⦔", ">"], ["⧼", "<"], ["⧽", ">"], ["⩹", "<"], ["⩺", ">"], ["⪦", "<"], ["⪧", ">"], ["〈", "<"], ["〉", ">"], ["︿", "<"], ["﹀", ">"], ["﹤", "<"], ["﹥", ">"], ["＜", "<"], ["＞", ">"], ["𖼿", ">"], ["𝈶", "<"], ["𝈷", ">"]]);
var iWe = new Map([...sWe, ...Array.from("≪⋘⪡⫷⟪︽", (e10) => [e10, "<"]), ...Array.from("≫⋙⪢⫸⟫︾", (e10) => [e10, ">"])]), aWe = new Map([...iWe, ["《", "<"], ["》", ">"]]);
new Set(`⦒⦔⩺⪧${"≫⋙⪢⫸⟫︾"}`);
function k2(e10) {
  let t = e10;
  for (let [n, r] of aWe) if (r === e10) t += n;
  return t;
}
var cWe = ["account_standing_rule_changes", "auto_mode_bypass", "blind_apply", "browser_file_upload_exfil", "browser_input_exfil", "browser_js_exfil", "browser_navigate_exfil", "browser_shortcut_execution", "chatops_trigger_comments", "ci_bypass", "cloud_storage_mass_delete", "cluster_wide_workload_creation", "code_from_external", "code_that_leaks_when_run", "command_network_lists", "containment_escape", "create_public_surface", "create_rce_surface", "create_unsafe_agents", "credential_exploration", "credential_leakage", "credential_materialization", "data_exfiltration", "dns_domain_cert_changes", "excess_sensitive_detail", "exfil_scouting", "expose_local_services", "external_ingress_tunnel", "external_system_writes", "feature_flag_writes", "git_destructive", "instruction_poisoning", "interfere_with_workloads", "irreversible_deletion_general", "irreversible_local_destruction", "live_shared_artifact_sensitive_delta", "logging_audit_tampering", "merge_without_review", "modify_shared_resources", "node_lifecycle_operations", "out_of_place_publication", "package_registry_bypass", "permission_grant", "pii_data_handling", "production_deploy", "production_reads", "protected_scope_iac_apply", "public_data_sharing_upload", "real_world_transactions", "remote_repoint", "remote_shell_writes", "safety_bypass_flag", "sandbox_network_callback", "secret_store_writes", "security_test_removal", "security_weaken", "self_approval", "self_modification", "sensitive_remote_exec", "sensitive_source_provenance", "session_transcript_tampering", "shared_cluster_mutation", "shared_scratch_sweep", "third_party_attack", "tls_auth_weaken", "tmux_self_drive", "traffic_redirection", "unauthorized_persistence", "unrequested_artifact_publish", "unrequested_commit_in_a_connected_app", "untrusted_code_integration", "unverifiable_deletion_scope", "unverifiable_deletion_target"], uWe = ["cowork_delete_grant", "cowork_folder_access", "cowork_run_routine_now", "cowork_scheduled_task_delete", "cowork_scheduled_task_write", "cowork_skill_persistence"], dWe = ["access_added_as_a_means", "bot_check_circumvention", "consent_given_for_the_user", "identity_not_given", "notes_for_later_sessions", "save_over_an_occupied_name", "stated_interface_sidestepped", "walled_content_from_a_copy", "website_access_circumvention"];
var pWe = [], P2 = /* @__PURE__ */ new Set([...cWe, ...pWe]);
/* @__PURE__ */ new Set([...P2, ...dWe]);
/* @__PURE__ */ new Set([...P2, ...uWe]);
var aw = "When managed settings or a --settings file set allowUnsandboxedCommands: false, or managed settings set network.allowManagedDomainsOnly: true", mWe = "When managed settings or a --settings file set allowUnsandboxedCommands: false, network.deniedDomains or a WebFetch(domain:…) deny rule, when managed settings set network.allowManagedDomainsOnly: true, or when managed, --settings or user settings set network.strictAllowlist: true", gWe = "When managed settings or a --settings file set allowUnsandboxedCommands: false, filesystem.denyRead, a Read(…) deny rule or a credentials.files entry (deny or mask), or managed settings set network.allowManagedDomainsOnly: true", hWe = "When managed settings or a --settings file set filesystem.denyRead, a Read(…) deny rule or a credentials.files entry (deny or mask)", is = "project settings (.claude/settings.json and .claude/settings.local.json)", Rc = `${aw}, values from ${is} are ignored.`, $_ = `${aw}, true from ${is} is ignored (false there still applies).`, M2 = `${aw}, and managed, --settings or user settings set true, false from ${is} is ignored (true there still applies).`, N2 = `${mWe}, values from ${is} are ignored. With network.allowManagedDomainsOnly, only managed settings may set it.`, _We = `${gWe}, a value from ${is} that would re-open a path managed, --settings or user settings deny reading is ignored, as is one spelled as a glob or a network path (UNC or automount); one carving out of the project's own denyRead still applies. A value inside a directory sandboxed commands can write is re-checked before every command and dropped once it has been re-pointed into a denied path.`, yWe = `${Rc} ${hWe}, a value from ${is} under or equal to a denied path, or spelled as a glob or a network path (UNC or automount), is ignored. A value inside a directory sandboxed commands can already write is re-checked before every command and dropped once it has been re-pointed into a denied read path.`, SWe = P(() => O({ allowedDomains: k(h()).optional().describe("Domains sandboxed commands may reach without a prompt (wildcards such as *.example.com supported). Merged with WebFetch(domain:…) allow rules and across settings sources. " + Rc + " With network.allowManagedDomainsOnly, only managed settings supply it."), deniedDomains: k(h()).optional().describe("Domains that are always blocked, even if matched by allowedDomains. Supports the same wildcard syntax as allowedDomains. Merged from all settings sources regardless of allowManagedDomainsOnly."), strictAllowlist: x().optional().describe(`When true, the sandbox runtime deterministically denies hosts not in allowedDomains instead of prompting. Enforced for sandboxed commands only — in-process tools such as WebFetch are not gated by this setting. Only honored from user, managed/policy, or CLI (--settings) settings — ${is} are ignored, and while it is on their allowedDomains and WebFetch(domain:…) allow rules are left out of the allowlist.`), allowManagedDomainsOnly: x().optional().describe("When true (and set in managed settings), only allowedDomains and WebFetch(domain:...) allow rules from managed settings are respected. User, project, local, and flag settings domains are ignored. Denied domains are still respected from all sources."), allowUnixSockets: k(h()).optional().describe("macOS only: Unix socket paths to allow. Ignored on Linux (seccomp cannot filter by path). Merged across settings sources. " + Rc), allowAllUnixSockets: x().optional().describe("If true, allow all Unix sockets (disables blocking on both platforms). " + $_), allowLocalBinding: x().optional().describe("macOS only: If true, sandboxed commands can bind to localhost ports. " + $_), allowMachLookup: k(h().refine((e10) => !(e10.endsWith("*") ? e10.slice(0, -1) : e10).includes("*"), { message: 'Wildcards are only allowed as a single trailing "*" (e.g., "com.example.*" or "*" for all services).' })).optional().describe('macOS only: Additional XPC/Mach service names to allow looking up. Supports trailing-wildcard prefix matching (e.g., "com.apple.CoreSimulator.*"). Needed for tools that communicate via XPC such as the iOS Simulator or Playwright. Each entry lets sandboxed commands reach services outside the sandbox, and the sandbox does not confine what those services do for them. Merged across settings sources. ' + Rc), httpProxyPort: q().optional().describe("Local TCP port of your own HTTP proxy for sandboxed traffic, used instead of the proxy Claude Code runs. " + N2), socksProxyPort: q().optional().describe("Local TCP port of your own SOCKS5 proxy for sandboxed traffic, used instead of the proxy Claude Code runs. " + N2), tlsTerminate: O({ caCertPath: h().min(1).optional(), caKeyPath: h().min(1).optional() }).optional().describe("[EXPERIMENTAL] Enable in-process TLS termination so the per-request filter can see HTTPS request bodies. Provide a CA cert+key, or omit both to have sandbox-runtime generate an ephemeral one for the session. On native Windows an ephemeral CA cannot pass the sandbox trust check, so omitting the paths uses a persistent CA managed by the sandbox runtime (set up and trusted via /sandbox install); configured paths are passed to the sandbox runtime verbatim, which rejects a bad or incomplete pair at sandbox initialization. Only honored from user, managed/policy, or CLI (`--settings`) settings — project settings (.claude/settings.json and .claude/settings.local.json) are ignored.") }).optional()), EWe = P(() => O({ allowWrite: k(h()).optional().describe("Additional paths to allow writing within the sandbox. Merged with paths from Edit(...) allow permission rules. " + yWe), denyWrite: k(h()).optional().describe("Additional paths to deny writing within the sandbox. Merged with paths from Edit(...) deny permission rules."), denyRead: k(h()).optional().describe("Additional paths to deny reading within the sandbox. Merged with paths from Read(...) deny permission rules."), allowRead: k(h()).optional().describe("Paths to re-allow reading within denyRead regions. Takes precedence over denyRead for matching paths. " + _We), allowManagedReadPathsOnly: x().optional().describe("When true (set in managed settings), only allowRead paths from policySettings are used."), disabled: x().optional().describe("macOS and Linux/WSL only: skip filesystem isolation entirely while keeping network and seccomp isolation. Ignored on native Windows, where the sandboxed process runs as a separate user with no inherent rights, so skipping the filesystem rules would withhold every access grant rather than loosen them — filesystem isolation stays on there. Sandboxed commands get unrestricted read/write access to the host filesystem; network egress is still confined to network.allowedDomains. Intended for deployments whose goal is egress control rather than filesystem containment. Does not change Bash prompting: sandbox.autoAllowBashIfSandboxed is independent and still defaults to true, so set it to false to keep prompting for sandboxed commands. Drops the read protection from filesystem.denyRead and credentials.files deny entries for sandboxed commands, since both are enforced by the filesystem layer this turns off; credentials.files mask entries (sentinel binds) and credentials.envVars deny/mask are unaffected. Only honored from user, managed/policy, or CLI (`--settings`) settings — project settings (.claude/settings.json and .claude/settings.local.json) are ignored. If managed settings configure sandbox.filesystem at all, or list any sandbox.credentials.files deny entry, only managed settings can set this: an admin who deployed filesystem restrictions must not have them switched off by a user-writable file. (sandbox.credentials.envVars and credentials.files mask entries do not pin it — env scrubbing and sentinel binds are independent of the filesystem layer and survive this setting.) When unset, filesystem isolation stays on.") }).optional());
function U2(e10, t, n) {
  if (e10.length === 0 || e10.some((r) => r.length === 0)) n.addIssue({ code: dr.custom, path: ["maskClaims"], message: "maskClaims must name at least one non-empty claim — omit maskClaims for whole-token masking." });
  if (t === void 0) n.addIssue({ code: dr.custom, path: ["maskClaims"], message: "maskClaims requires decode — without a decode format there is no token to read claims from. Set decode, or omit maskClaims." });
}
function F2(e10, t) {
  let n;
  try {
    n = new RegExp(e10);
  } catch (o) {
    t.addIssue({ code: dr.custom, path: ["extract"], message: `extract is not a valid regular expression: ${dt(o)}` });
    return;
  }
  if (new RegExp(n.source + "|").exec("").length - 1 < 1) t.addIssue({ code: dr.custom, path: ["extract"], message: 'extract must contain at least one capturing group — group 1 is the credential value to mask (e.g. "token:\\s*(\\S+)").' });
}
function $2(e10) {
  if (typeof e10 !== "object" || e10 === null) return e10;
  let t = e10;
  if (t.mode !== "deny") return e10;
  let n = { ...t };
  if ("extract" in n && typeof n.extract !== "string") delete n.extract;
  if ("onExtractNoMatch" in n && n.onExtractNoMatch !== "warn" && n.onExtractNoMatch !== "deny" && n.onExtractNoMatch !== "error") delete n.onExtractNoMatch;
  if ("decode" in n && n.decode !== "jwt") delete n.decode;
  if ("maskClaims" in n && !(Array.isArray(n.maskClaims) && n.maskClaims.every((r) => typeof r === "string"))) delete n.maskClaims;
  if ("maskDuplicates" in n && typeof n.maskDuplicates !== "boolean") delete n.maskDuplicates;
  if ("injectHosts" in n && !(Array.isArray(n.injectHosts) && n.injectHosts.every((r) => typeof r === "string"))) delete n.injectHosts;
  return n;
}
var z_ = P(() => Le($2, O({ path: h().min(1).describe("Path to a credential file or directory. Same resolution as sandbox.filesystem.* paths: absolute, ~ expanded, or relative to the settings file root (project root for project settings, ~/.claude for user settings)."), mode: B(["deny", "mask"]).describe("Access mode for this path. `deny` blocks reads inside the sandbox; `mask` shows sandboxed commands a sentinel-substituted copy (whole-file, or only the spans captured by `extract`) and the host proxy swaps sentinel→real on egress to `injectHosts`. On macOS and Windows `mask` currently degrades to `deny`."), extract: h().optional().describe("Optional regex for structured masking when mode is `mask`. Applied globally to the file; capture group 1 of each match is a credential value, and only those captured spans are replaced with sentinels — the rest of the file is preserved so a tool that parses it (.netrc, JSON, YAML) still succeeds. Without `extract`, the entire file content is replaced with one sentinel (whole-file masking, suited to single-secret files). If the regex matches nothing, behavior is governed by `onExtractNoMatch` (default `warn`). Accepted but ignored for `deny`."), onExtractNoMatch: B(["warn", "deny", "error"]).optional().describe("What to do when `extract` matches nothing in the file — or, with `decode`, when no candidate survives verification. `warn` (default) emits a stderr warning and leaves the file readable as-is inside the sandbox (fail-open, for credentials that may be legitimately absent); `deny` degrades the entry to mode `deny` so the file is unreadable (fail-closed) — under `sandbox.filesystem.disabled` it is treated as `error`, since read-denies are dropped in that mode; `error` aborts at sandbox setup so nothing runs until the config is fixed. Only meaningful when mode is `mask` and `extract` or `decode` is set; accepted but ignored otherwise."), decode: B(["jwt"]).optional().describe("Optional encoded-credential format for `mask` mode. `jwt`: candidates are located with a built-in JWT regex (or the explicit `extract` pattern, if set), verified to actually be JWTs before masking, and replaced with a structurally valid fake JWT so client-side token parsing inside the sandbox keeps working. If no candidate verifies, behavior is governed by `onExtractNoMatch` (default `warn`). Accepted but ignored for `deny`."), maskClaims: k(h()).optional().describe("Names of top-level payload claims to mask inside each decoded value, instead of replacing the whole token. Each named claim present with a string value gets its own sentinel and the token is rebuilt around the modified payload; all other claims are preserved so a tool that decodes the token and reads a non-secret claim keeps working. Requires `decode`. If no named claim matches in any verified token, behavior is governed by `onExtractNoMatch` (default `warn`). Only meaningful when mode is `mask`; accepted but ignored for `deny`."), maskDuplicates: x().optional().describe("If true, verbatim occurrences of each captured credential value outside the regex-matched spans are also replaced with the corresponding sentinel — for a secret repeated where the regex does not reach (e.g. pasted into a comment). Matches raw substrings, so short or common values may corrupt unrelated content; intended for long, high-entropy secrets. Defaults to false. Only meaningful when mode is `mask` and `extract` or `decode` is set; accepted but ignored otherwise."), injectHosts: k(h()).optional().describe("Optional narrowing of where the proxy substitutes this credential. Only meaningful when mode is `mask`; accepted but ignored for `deny`. If unset, defaults to `network.allowedDomains` — the credential is injected at every reachable host. Each entry must be reachable via `network.allowedDomains` (sandbox-runtime validates this).") }).superRefine((e10, t) => {
  if (e10.mode === "mask" && e10.path.endsWith("/")) t.addIssue({ code: dr.custom, path: ["path"], message: 'Credential mode "mask" applies to a single file, not a directory. List the specific credential file(s), or use "deny" for the directory.' });
  if (e10.mode === "mask" && e10.extract !== void 0) F2(e10.extract, t);
  if (e10.mode === "mask" && e10.maskClaims !== void 0) U2(e10.maskClaims, e10.decode, t);
}))), Oc = () => h().regex(/^[A-Za-z_][A-Za-z0-9_]*$/, "Environment variable name must start with a letter or underscore and contain only letters, digits, and underscores"), H_ = P(() => Le($2, O({ name: Oc().describe("Environment variable name."), mode: B(["deny", "mask"]).describe("Access mode for this environment variable. `deny` unsets the variable for sandboxed commands; `mask` shows sandboxed commands a sentinel value and the host proxy swaps sentinel→real on egress to `injectHosts`."), extract: h().optional().describe("Optional regex for structured masking when mode is `mask`. Applied globally to the value; capture group 1 of each match is a credential value, and only those captured spans are replaced with sentinels — the rest of the value is preserved so a tool that parses it (a `DATABASE_URL` connection string, a composite `KEY:SECRET` pair) still succeeds inside the sandbox. Without `extract`, the entire value is replaced with one sentinel (whole-value masking, suited to bare tokens). If the regex matches nothing, behavior is governed by `onExtractNoMatch` (default `warn`). Cannot be combined with `decode` (the decode path never consults it). Accepted but ignored for `deny`."), onExtractNoMatch: B(["warn", "deny", "error"]).optional().describe("What to do when `extract` matches nothing in the value. `warn` (default) emits a stderr warning and lets the variable pass through unmasked (fail-open, for credentials that may be legitimately absent); `deny` unsets the variable inside the sandbox (fail-closed); `error` aborts at sandbox setup so nothing runs until the config is fixed. Only meaningful when mode is `mask` and `extract` is set without `decode`. On a mask entry with `decode`, the runtime takes the decode path and never consults this field, so a fail-closed setting cannot be honored — `deny` and `error` are rejected there; only `warn` is accepted. In all other shapes the field is accepted but ignored."), decode: B(["jwt"]).optional().describe("Optional encoded-credential format for `mask` mode. `jwt`: the variable's whole value is verified to actually be a JWT and replaced with a structurally valid fake JWT so client-side token parsing inside the sandbox keeps working; the proxy swaps the whole fake token on egress. If the value does not verify, the variable is left unmasked with a stderr warning (fail-open). Cannot be combined with `extract` — the decode path never consults it. Accepted but ignored for `deny`."), maskClaims: k(h()).optional().describe("Names of top-level payload claims to mask inside the decoded value, instead of replacing the whole token. Each named claim present with a string value gets its own sentinel and the token is rebuilt around the modified payload; all other claims are preserved so claim-reading clients keep working. Requires `decode`. If no named claim matches, the variable is left unmasked with a stderr warning (fail-open). Only meaningful when mode is `mask`; accepted but ignored for `deny`."), injectHosts: k(h()).optional().describe("Optional narrowing of where the proxy substitutes this credential. Only meaningful when mode is `mask`; accepted but ignored for `deny`. If unset, defaults to `network.allowedDomains` — the credential is injected at every reachable host. Each entry must be reachable via `network.allowedDomains` (sandbox-runtime validates this).") }).superRefine((e10, t) => {
  if (e10.mode === "mask" && e10.extract !== void 0) F2(e10.extract, t);
  if (e10.mode === "mask" && e10.maskClaims !== void 0) U2(e10.maskClaims, e10.decode, t);
  if (e10.mode === "mask" && e10.decode !== void 0 && e10.extract !== void 0) t.addIssue({ code: dr.custom, path: ["extract"], message: "extract cannot be combined with decode on an env entry — the runtime takes the decode path (whole-value JWT verification) and never consults extract, silently disabling the structured masking. Remove one of the two." });
  if (e10.mode === "mask" && e10.decode !== void 0 && (e10.onExtractNoMatch === "deny" || e10.onExtractNoMatch === "error")) t.addIssue({ code: dr.custom, path: ["onExtractNoMatch"], message: "onExtractNoMatch cannot be honored on an env entry with decode — the runtime takes the decode path (which is unconditionally fail-open on verify failure) and never consults extract or onExtractNoMatch. Remove onExtractNoMatch, or drop decode to use extract-based masking (whose no-match handling does honor it)." });
})));
var B_ = P(() => O({ accessKeyIdVar: Oc().describe("Name of the masked env var holding the AWS access key id."), secretAccessKeyVar: Oc().describe("Name of the masked env var holding the AWS secret access key."), sessionTokenVar: Oc().optional().describe("Optional name of the masked env var holding the AWS session token (temporary credentials). When set, the proxy sends the real token as x-amz-security-token on re-signed requests and adds it to the signed header set if the client did not.") }).superRefine((e10, t) => {
  let n = /* @__PURE__ */ new Map();
  for (let [r, o] of [["accessKeyIdVar", e10.accessKeyIdVar], ["secretAccessKeyVar", e10.secretAccessKeyVar], ["sessionTokenVar", e10.sessionTokenVar]]) {
    if (o === void 0) continue;
    let s = n.get(o);
    if (s !== void 0) t.addIssue({ code: dr.custom, path: [r], message: `${r} names the same env var ('${o}') as ${s} — each pair member must be a distinct variable.` });
    else n.set(o, r);
  }
})), bWe = P(() => {
  let e10 = B(["deny", "passthrough"]);
  return O({ streaming: e10.optional().describe("Policy for aws-chunked streaming uploads (x-amz-content-sha256: STREAMING-*): per-chunk signatures chain off the seed signature, so re-signing would require rewriting the body. `deny` (default) fails closed with a 403; `passthrough` forwards the request unre-signed (the upstream will reject its signature)."), presigned: e10.optional().describe("Policy for presigned URLs (X-Amz-Algorithm/X-Amz-Signature in the query, no Authorization header): the signature lives in the URL itself. `deny` (default) or `passthrough`."), sigv4a: e10.optional().describe("Policy for SigV4A (AWS4-ECDSA-P256-SHA256) asymmetric signatures: there is no shared-key HMAC to recompute. `deny` (default) or `passthrough`.") });
}), CWe = P(() => O({ files: k(z_()).optional().describe("Credential files or directories to protect. `deny` blocks reads inside the sandbox; `mask` substitutes a sentinel inside the sandbox (whole-file, or per-`extract` capture) and injects the real value at the proxy. On macOS and Windows `mask` degrades to `deny`."), envVars: k(H_()).optional().describe("Environment variables to protect. `deny` unsets the variable for sandboxed commands; `mask` substitutes a sentinel inside the sandbox and injects the real value at the proxy."), allowPlaintextInject: x().optional().describe("Allow sentinel→real substitution on the plain-HTTP proxy path. Defaults to false: without TLS termination the upstream identity is unverified and the credential travels in cleartext. Set only for trusted-network test fixtures. Only honored from user, managed/policy, or CLI (`--settings`) settings — project settings (.claude/settings.json and .claude/settings.local.json) are ignored."), awsPairs: k(B_()).optional().describe("Explicit groupings of masked env vars into AWS credential pairs for SigV4 re-signing, for non-standard variable names. The conventional AWS_ACCESS_KEY_ID / AWS_SECRET_ACCESS_KEY / AWS_SESSION_TOKEN trio is paired automatically when masked. Only honored from user, managed/policy, or CLI (`--settings`) settings — project settings (.claude/settings.json and .claude/settings.local.json) are ignored. A member is only usable when its env var is forwarded as a whole-value `mask` entry (an entry carrying `extract` or `decode` does not qualify — re-signing needs the whole real value). A pair whose key id or secret member is unusable never re-signs: it is dropped, unless it names a conventional AWS variable, in which case it is forwarded as an inert suppressor so implicit auto-pairing stays overridden. A pair whose ONLY unusable member is the session token still re-signs, without an x-amz-security-token (temporary-credential requests fail upstream until the entry is fixed)."), sigv4: bWe().optional().describe("Policies for AWS SigV4 request shapes the proxy cannot re-sign (streaming, presigned, sigv4a) when they reference a masked credential pair: `deny` (default) or `passthrough`. Only honored from user, managed/policy, or CLI (`--settings`) settings — project settings (.claude/settings.json and .claude/settings.local.json) are ignored.") }).superRefine((e10, t) => {
  let n = /* @__PURE__ */ new Set();
  for (let [r, o] of (e10?.awsPairs ?? []).entries()) {
    let s = [["accessKeyIdVar", o.accessKeyIdVar], ["secretAccessKeyVar", o.secretAccessKeyVar], ["sessionTokenVar", o.sessionTokenVar]], i = /* @__PURE__ */ new Set();
    for (let [a, l] of s) {
      if (l === void 0) continue;
      if (n.has(l)) t.addIssue({ code: dr.custom, path: ["awsPairs", r, a], message: `"${l}" appears in more than one awsPairs slot (within or across pairs) — each variable can fill exactly one slot.` });
      i.add(l);
    }
    for (let a of i) n.add(a);
  }
}).optional()), cw = P(() => O({ enabled: x().optional().describe("Run Bash commands inside the sandbox. Default: false. " + M2), failIfUnavailable: x().optional().describe("Exit with an error at startup if sandbox.enabled is true but the sandbox cannot start (missing dependencies or unsupported platform). When false (default), a warning is shown and commands run unsandboxed. Intended for managed-settings deployments that require sandboxing as a hard gate. " + M2), autoAllowBashIfSandboxed: x().optional(), allowUnsandboxedCommands: x().optional().describe(`Allow commands to run outside the sandbox via the dangerouslyDisableSandbox parameter. When false, the dangerouslyDisableSandbox parameter is completely ignored and all commands must run sandboxed. Default: true. A false in managed, --settings or user settings holds whatever ${is} say (false there still applies).`), network: SWe(), filesystem: EWe(), credentials: CWe(), ignoreViolations: W(h(), k(h())).optional().describe('Sandbox violations to leave unreported: a map of command patterns ("*" for every command) to the filesystem paths whose violations are ignored. Merged across settings sources. ' + Rc), enableWeakerNestedSandbox: x().optional().describe("Linux only: Run without the fresh /proc mount, for hosts such as unprivileged Docker containers that cannot create one. **Reduces security** — the host /proc stays readable by sandboxed commands. Default: false. " + $_), allowNestedUserNamespaces: x().optional().describe(`Linux/WSL only: Let sandboxed commands create user namespaces of their own, which the sandbox refuses by default. Needed by tools that sandbox themselves that way, such as Chromium's and Electron's sandbox, a nested bubblewrap, and \`unshare\`. **Removes code-execution isolation** — in any folder a hostile command may write, it can then bypass filesystem.denyWrite, filesystem.denyRead, credentials.files entries and the paths the sandbox always write-protects (such as .claude/settings.json, git hooks and git config), and so plant code that later runs outside the sandbox; while autoAllowBashIfSandboxed is on, the command that plants it needs no approval. Default: false. Only honored from user, managed/policy, or CLI (--settings) settings — true from ${is} is ignored (false there still applies).`), enableWeakerNetworkIsolation: x().optional().describe("macOS only: Allow access to com.apple.trustd.agent in the sandbox. Needed for Go-based CLI tools (gh, gcloud, terraform, etc.) to verify TLS certificates when using httpProxyPort with a MITM proxy and custom CA. **Reduces security** — opens a potential data exfiltration vector through the trustd service. Default: false. " + $_), allowAppleEvents: x().optional().describe("macOS only: Allow sandboxed commands to send Apple Events (and look up the appleeventsd Mach service). Needed for `open`, `osascript`, and browser-based auth flows that open URLs. **Removes code-execution isolation** — sandboxed commands can launch other applications unsandboxed with no user prompt, and can script running apps (e.g. Terminal) subject to the user's per-app TCC automation consent. Only honored from user, managed/policy, or CLI (--settings) settings — project settings (.claude/settings.json and .claude/settings.local.json) are ignored. Default: false"), excludedCommands: k(h()).optional().describe("Command patterns (Bash permission-rule syntax) for commands to run outside the sandbox. An entry takes a call out of the sandbox only when every command in the call matches an entry: in a Bash pipe or a chain such as `a && b`, each part needs its own match. Some calls stay sandboxed whatever the entries, such as one with a `cd`, a command substitution, or a redirect other than a file-descriptor duplication like `2>&1`, a heredoc included. A convenience, not a security boundary: excluded commands still go through the permission flow. Merged across settings sources. " + Rc), ripgrep: O({ command: h(), args: k(h()).optional() }).optional().describe("Custom ripgrep configuration for bundled ripgrep support. Only honored from user, managed/policy, or CLI (--settings) settings — project settings (.claude/settings.json and .claude/settings.local.json) are ignored."), bwrapPath: Le((e10) => typeof e10 === "string" && pn.isAbsolute(e10) ? e10 : void 0, h()).optional().catch(void 0).describe("Linux/WSL only: Absolute path to the bwrap (bubblewrap) binary. Overrides auto-detection via PATH. Only honored from admin-controlled managed settings."), socatPath: Le((e10) => typeof e10 === "string" && pn.isAbsolute(e10) ? e10 : void 0, h()).optional().catch(void 0).describe("Linux/WSL only: Absolute path to the socat binary used for the sandbox network proxy. Overrides auto-detection via PATH. Only honored from admin-controlled managed settings.") }).passthrough());
var ha = ["acceptEdits", "auto", "bypassPermissions", "default", "dontAsk", "plan"], RWe = [...ha], z2 = RWe;
function Tc(e10) {
  return e10 === "manual" ? "default" : e10;
}
`Cannot set permission mode: must be one of ${ha.join(", ")}`;
var H2 = ["auto", "iterm2", "terminal_bell", "iterm2_with_bell", "kitty", "ghostty", "notifications_disabled"];
var j2 = ["normal", "vim"];
var B2 = ["auto", "12-hour", "24-hour", "24-hour-utc"], K2 = ["auto", "tmux", "iterm2", "in-process"], OWe = ["dark", "light", "light-daltonized", "dark-daltonized", "light-ansi", "dark-ansi"], G2 = ["auto", ...OWe], W2 = ["auto", "alwaysAsk", "disabled"], V2 = 1e5, q2 = 1e6;
var TWe = Ke, wWe = Je, uw = I("ZodDeferredOptional", (e10, t) => {
  TWe.init(e10, t), wWe.init(e10, t), e10._zod.optin = "optional", e10._zod.optout = "optional", Object.defineProperty(e10._zod, "innerType", { get: t.built, configurable: true }), e10._zod.processJSONSchema = (n, r, o) => {
    let s = t.getter();
    Ze(s, n, o), n.seen.get(e10).ref = s;
  }, ju(e10._zod, "values", () => {
    let n = t.getter()._zod.values;
    return n ? /* @__PURE__ */ new Set([...n, void 0]) : void 0;
  }), ju(e10._zod, "pattern", () => {
    let n = t.getter()._zod.pattern;
    return n ? new RegExp(`^(${Hu(n.source)})?$`) : void 0;
  }), ju(e10._zod, "propValues", () => t.getter()._zod.propValues), e10._zod.parse = (n, r) => {
    if (n.value === void 0) return n;
    return t.getter()._zod.run(n, r);
  }, e10.unwrap = t.getter;
});
function nr(e10) {
  let t;
  return new uw({ type: "lazy", getter: () => {
    if (t === void 0) {
      let r = e10();
      if (r._zod.optin !== void 0) throw Error("deferredOptional(): the schema the build callback returned already handles a missing key itself (.optional(), .catch(), .default(), .prefault(), z.preprocess(), or a union or wrapper holding one). Return the plain schema and let deferredOptional() make it optional, or use that schema with .optional() without deferring it.");
      t = r;
    }
    return t;
  }, built: () => t });
}
var xWe = String.raw`\$\{([A-Za-z_][A-Za-z0-9_]*)(?::-[^}]*)?\}`;
function Y2(e10) {
  return new RegExp(xWe).test(e10);
}
var Z2 = new RegExp("(?<![^\\s\\p{P}])\\p{M}+", "gu");
function vWe(e10) {
  return Jf(IWe(Su(e10))).replace(/ {2,}/g, " ").trim();
}
var kWe = /\x1b\[[\x30-\x3f]*[\x20-\x2f]*[\x40-\x7e]|\x1b[\]PX^_][^\x1b\x07]*(?:\x07|\x1b\\)/g, PWe = 4;
function IWe(e10) {
  let t = e10;
  for (let n = 0; n < PWe; n++) {
    let r = t.replace(kWe, "");
    if (r === t) break;
    t = r;
  }
  return t;
}
function dw(e10, t = 160) {
  return DWe(vWe(LWe(e10, t)).normalize("NFC").replace(/[`\uff40\u02cb\u1fef\u2035]/g, "'").replace(Z2, ""), t);
}
function DWe(e10, t = 2e3) {
  return e10.length > t ? `${As(e10, t)}…` : e10;
}
function LWe(e10, t) {
  let n = As(e10, t * 8);
  if (n.length === e10.length) return n;
  let r = /\x1b(?:[\]PX^_][^\x1b\x07]*\x1b?|\[[\x30-\x3f]*[\x20-\x2f]*)$/.exec(n);
  if (r === null) return n;
  let o = e10.slice(r.index);
  return (o[1] === "[" ? /^\x1b\[[\x30-\x3f]*[\x20-\x2f]*[\x40-\x7e]/.test(o) : /^\x1b[\]PX^_][^\x1b\x07]*(?:\x07|\x1b\\)/.test(o)) ? n.slice(0, r.index) : n;
}
var J2 = Hh;
function pw(e10) {
  return Object.hasOwn(J2, e10) ? J2[e10] : e10;
}
function wp(e10) {
  return e10.includes("*");
}
function NWe(e10) {
  return e10.replaceAll("\\", "\\\\").replaceAll("(", "\\(").replaceAll(")", "\\)");
}
function UWe(e10) {
  return FWe(e10).replaceAll("\\\\", "\\");
}
function FWe(e10) {
  return e10.replaceAll("\\(", "(").replaceAll("\\)", ")");
}
function fw(e10) {
  if (typeof e10 === "string" && !e10.includes("(") && !e10.includes(")")) return { kind: "bare" };
  let t = $We(e10, "("), n = zWe(e10, ")");
  if (t === -1 && n === -1) return { kind: "bare" };
  let r = e10.substring(0, t);
  if (t === -1 || n <= t || n !== e10.length - 1 || /[()]/.test(r)) return { kind: "malformed" };
  return { kind: "call", toolName: r, rawContent: e10.substring(t + 1, n) };
}
function Q2(e10) {
  let t = fw(e10);
  if (t.kind !== "call" || !t.toolName) return { toolName: pw(e10) };
  if (t.rawContent === "" || t.rawContent === "*") return { toolName: pw(t.toolName) };
  let n = UWe(t.rawContent);
  return { toolName: pw(t.toolName), ruleContent: n };
}
function rr(e10) {
  if (!e10.ruleContent) return e10.toolName;
  let t = NWe(e10.ruleContent);
  return `${e10.toolName}(${t})`;
}
function $We(e10, t) {
  for (let n = 0; n < e10.length; n++) if (e10[n] === t) {
    let r = 0, o = n - 1;
    while (o >= 0 && e10[o] === "\\") r++, o--;
    if (r % 2 === 0) return n;
  }
  return -1;
}
function zWe(e10, t) {
  for (let n = e10.length - 1; n >= 0; n--) if (e10[n] === t) {
    let r = 0, o = n - 1;
    while (o >= 0 && e10[o] === "\\") r++, o--;
    if (r % 2 === 0) return n;
  }
  return -1;
}
function xp(e10) {
  let t = e10.replace(/[^a-zA-Z0-9_-]/g, "_");
  if (e10.startsWith("claude.ai ")) t = t.replace(/_+/g, "_").replace(/^_|_$/g, "");
  return t;
}
var KWe = "mcp__";
function wc(e10) {
  let t = e10.split("__"), [n, r, ...o] = t;
  if (n !== "mcp" || !r) return null;
  let s = o.length > 0 ? o.join("__") : void 0;
  return { serverName: r, toolName: s };
}
function _w(e10) {
  return `${KWe}${xp(e10)}__`;
}
function rq(e10) {
  return wc(`${_w(e10)}t`) === null;
}
function oq(e10) {
  return e10 in Object.prototype && rq(e10);
}
var K_ = "server names may only contain letters, numbers, hyphens and underscores, and may not be constructor, prototype, __proto__, __defineGetter__, __defineSetter__, __lookupGetter__ or __lookupSetter__";
P(() => B(["local", "user", "project", "dynamic", "enterprise", "claudeai", "managed", "agent"]));
P(() => B(["stdio", "sse", "sse-ide", "http", "ws", "sdk"]));
var GWe = /^[A-Za-z0-9_-]+$/;
var xc = P(() => N("comms").optional().catch(void 0)), Ci = P(() => q().int().positive()), WWe = 3e5, sq = P(() => q().int().positive().optional().catch(void 0).describe("@internal CCR backend wire hint; folded into timeout at parse."));
function iq({ request_timeout_ms: e10, ...t }) {
  return { ...t, ...t.timeout === void 0 && e10 !== void 0 && { timeout: Math.min(e10, WWe) } };
}
var VWe = P(() => O({ type: N("stdio").optional(), command: h().min(1, "Command cannot be empty"), args: k(h()).default([]), env: W(h(), h()).optional(), timeout: Ci().optional(), alwaysLoad: x().optional(), bareElicitationCapability: x().optional(), role: xc() })), qWe = P(() => x()), aq = P(() => O({ clientId: h().optional(), callbackPort: q().int().positive().optional(), authServerMetadataUrl: h().url().startsWith("https://", { message: "authServerMetadataUrl must use https://" }).optional(), scopes: h().min(1).optional(), xaa: qWe().optional() })), yw = P(() => O({ name: h(), permission_policy: B(["always_allow", "always_ask", "always_deny"]).optional() })), lq = P(() => O({ type: N("sse"), url: h(), headers: W(h(), h()).optional(), headersHelper: h().optional(), oauth: aq().optional(), timeout: Ci().optional(), request_timeout_ms: sq(), tools: k(yw()).optional(), alwaysLoad: x().optional(), bareElicitationCapability: x().optional(), discoveryCache: x().optional(), role: xc(), toolPermissions: W(h(), Cw()).optional() }).transform(iq)), YWe = P(() => O({ type: N("sse-ide"), url: h(), ideName: h(), ideRunningInWindows: x().optional(), timeout: Ci().optional(), alwaysLoad: x().optional(), role: xc() })), ZWe = P(() => O({ type: N("ws-ide"), url: h(), ideName: h(), authToken: h().optional(), ideRunningInWindows: x().optional(), timeout: Ci().optional(), alwaysLoad: x().optional(), role: xc() })), cq = P(() => O({ type: B(["http", "streamable-http"]).transform(() => "http"), url: h(), headers: W(h(), h()).optional(), headersHelper: h().optional(), oauth: aq().optional(), timeout: Ci().optional(), request_timeout_ms: sq(), tools: k(yw()).optional(), alwaysLoad: x().optional(), bareElicitationCapability: x().optional(), discoveryCache: x().optional(), role: xc(), toolPermissions: W(h(), Cw()).optional() }).transform(iq)), JWe = ["command", "args", "env", "headersHelper"], XWe = /* @__PURE__ */ new Set(["http", "streamable-http", "sse"]), QWe = /[\p{Cc}\p{Cf}\u2028\u2029]/u, eVe = /[\p{Cc}\p{Cf}\u2028\u2029]/gu;
function Sw(e10) {
  return /^[A-Za-z0-9_-]+$/.test(e10) && !oq(e10) && e10 !== "constructor" && e10 !== "prototype";
}
function tVe(e10) {
  try {
    let t = new URL(e10);
    return t.protocol === "https:" && t.hostname !== "";
  } catch {
    return false;
  }
}
function uq(e10, t = "", n = 0) {
  if (typeof e10 === "string") return [[t, e10, false]];
  if (n > 4 || e10 === null || typeof e10 !== "object") return [];
  return Object.entries(e10).flatMap(([r, o]) => {
    let s = r.replace(eVe, (a) => `\\u${a.codePointAt(0).toString(16).padStart(4, "0")}`), i = t ? `${t}.${s}` : s;
    return [[i, r, true], ...uq(o, i, n + 1)];
  });
}
var Ew = P(() => W(h(), fe()).check((e10) => {
  let t = (r, o) => {
    e10.issues.push({ code: "custom", path: r, message: o, input: e10.value });
  };
  for (let r of JWe) if (Object.hasOwn(e10.value, r)) t([r], `"${r}" is not allowed in managed settings: only http/sse URL servers can be delivered this way, and a managed settings document must not name a program to run`);
  if (!XWe.has(e10.value.type)) t(["type"], 'managed settings can only deliver "http" or "sse" servers');
  let n = e10.value.url;
  if (typeof n === "string" && !tVe(n)) t(["url"], "managed settings servers must use a valid https:// url");
  for (let [r, o, s] of uq(e10.value)) if (QWe.test(o)) t(r.split("."), "contains control or invisible format characters (in a key or a value); a managed settings document must not be able to print escape sequences");
  else if (!s && Y2(o)) t(r.split("."), "${VAR} references are not expanded in managed settings; use a literal value (a managed settings document must not read the user's environment)");
}).pipe(re([cq(), lq()]))), bw = `"managedMcpServers" must be an object keyed by server name (the .mcp.json mcpServers shape; Claude Desktop's array form of its same-named key is not accepted here: use the server name as the key and "type" instead of "transport"). No managed MCP servers are installed from it until it is fixed.`;
var nVe = P(() => O({ type: N("ws"), url: h(), headers: W(h(), h()).optional(), headersHelper: h().optional(), timeout: Ci().optional(), alwaysLoad: x().optional(), bareElicitationCapability: x().optional(), role: xc() })), rVe = P(() => O({ type: N("sdk"), name: h(), timeout: Ci().optional(), alwaysLoad: x().optional(), disableAutoBackground: x().optional().catch(void 0), tools: k(yw()).optional().catch(void 0), connectorId: h().min(1).optional().catch(void 0) })), Cw = P(() => B(["allow", "ask", "blocked"])), oVe = P(() => O({ type: N("claudeai-proxy"), url: h(), id: h().regex(GWe), displayName: h().optional(), iconUrl: h().optional(), timeout: Ci().optional(), alwaysLoad: x().optional(), toolPermissions: W(h(), Cw()).optional(), stateless: x().optional(), cachedInitResponse: W(h(), fe()).nullish(), discoverSupport: B(["supported", "legacy", "unknown"]).optional().catch(void 0), cachedDiscoverResponse: W(h(), fe()).nullish(), eligible: x().nullish(), ineligibleReason: h().nullish(), enterpriseManaged: x().optional() })), W_ = P(() => re([VWe(), lq(), YWe(), ZWe(), cq(), nVe(), rVe(), oVe()]));
P(() => O({ mcpServers: W(h(), W_()) }));
var vp = ["anthropic", "customEndpoint", "bedrock", "vertex", "foundry", "anthropicAws", "mantle", "gateway"], iVe = new Set(vp);
function Aw(e10) {
  return typeof e10 === "string" && iVe.has(e10);
}
kt() === "macos" ? "⏺" : "●";
var aVe = /* @__PURE__ */ new Set(["Claude Preview", "Claude Browser"]), lVe = /* @__PURE__ */ new Set(["claude-in-chrome", "Claude in Chrome"]);
/* @__PURE__ */ new Set([...lVe, ...aVe]);
P(() => Le(Tc, B(z2)));
P(() => Le(Tc, B(ha)));
var dq = { ".ts": "ts", ".tsx": "tsx", ".jsx": "jsx", ".js": "js", ".mjs": "js", ".cjs": "js", ".mts": "ts", ".cts": "ts" };
var Ow = Object.keys(dq);
var fVe = `${Ow.slice(0, -1).join(", ")} or ` + String(Ow.at(-1));
var hVe = /* @__PURE__ */ new Set(["metadata.google.internal", "metadata.goog", "metadata", "instance-data", "instance-data.ec2.internal", "ip6-localhost", "ip6-loopback", "localhost.localdomain", "localhost4", "localhost4.localdomain4", "localhost6", "localhost6.localdomain6"]), fq = /* @__PURE__ */ new Set(["100.100.100.200", "168.63.129.16", "192.0.0.192"]);
function mq(e10, t, n, r) {
  return e10 === 127 || e10 === 169 && t === 254 || e10 === 0;
}
function _Ve(e10) {
  let t = e10.indexOf("%"), r = (t >= 0 ? e10.slice(0, t) : e10).toLowerCase().split("::");
  if (r.length > 2) return;
  let o = r[0] ? r[0].split(":") : [], s = r.length === 2 && r[1] ? r[1].split(":") : [], i = r.length === 2 ? s : o, a = [], l = i.at(-1);
  if (l !== void 0 && l.includes(".")) {
    let m = l.split(".").map(Number);
    if (m.length !== 4 || m.some((g) => !Number.isInteger(g) || g < 0 || g > 255)) return;
    a = m, i.pop();
  }
  let c = (m) => {
    let g = [];
    for (let _ of m) {
      if (!/^[0-9a-f]{1,4}$/.test(_)) return;
      let y = parseInt(_, 16);
      g.push(y >> 8, y & 255);
    }
    return g;
  }, d = c(r.length === 2 ? o : []), p = c(i);
  if (d === void 0 || p === void 0) return;
  let f = d.length + p.length + a.length;
  if (f > 16 || r.length === 1 && f !== 16) return;
  return [...d, ...Array(16 - f).fill(0), ...p, ...a];
}
function yVe(e10) {
  return gq(e10) && e10[4] === 0 && e10[5] === 1;
}
function gq(e10) {
  return e10[0] === 0 && e10[1] === 100 && e10[2] === 255 && e10[3] === 155;
}
function SVe(e10) {
  let t = [];
  if (e10[0] === 32 && e10[1] === 2) t.push(e10.slice(2, 6));
  let n = e10.slice(0, 10).every((a) => a === 0), r = n && e10[10] === 255 && e10[11] === 255, o = n && e10[10] === 0 && e10[11] === 0, s = gq(e10) && e10.slice(4, 12).every((a) => a === 0), i = (e10[8] === 0 || e10[8] === 2) && e10[9] === 0 && e10[10] === 94 && e10[11] === 254;
  if (r || o || s || i) t.push(e10.slice(12, 16));
  return t;
}
function hq(e10) {
  let t = e10.toLowerCase().replace(/^\[|\]$/g, "");
  if (t.endsWith(".")) t = t.slice(0, -1);
  if (t === "" || t === "localhost" || t.endsWith(".localhost")) return true;
  if (hVe.has(t)) return true;
  if (t.startsWith("instance-data.") && t.endsWith(".compute.internal")) return true;
  if (net.isIPv4(t)) {
    if (fq.has(t)) return true;
    let [r = 0, o = 0, s = 0, i = 0] = t.split(".").map(Number);
    return mq(r, o);
  }
  if (!net.isIPv6(t)) return false;
  let n = _Ve(t);
  if (n === void 0) return true;
  if (yVe(n)) return true;
  if (n.every((r) => r === 0)) return true;
  if (n.slice(0, 15).every((r) => r === 0) && n[15] === 1) return true;
  if (t === "fd00:ec2::254") return true;
  if (n[0] === 254 && (n[1] ?? 0) >= 128 && (n[1] ?? 0) <= 191) return true;
  return SVe(n).some((r) => {
    let [o = 0, s = 0, i = 0, a = 0] = r;
    return mq(o, s) || fq.has(`${o}.${s}.${i}.${a}`);
  });
}
var EVe = /[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF]|[\uDC00-\uDFFF]/g;
function bVe(e10) {
  return e10.replace(EVe, (t) => t.length === 2 ? t : "");
}
var CVe = new RegExp("[\\p{Cc}\\p{Cf}\\p{Zl}\\p{Zp}\\p{Default_Ignorable_Code_Point}\\u2800]|(?!\\u0020)\\p{Zs}", "gu");
function _q(e10) {
  if (typeof e10 !== "string") return "";
  let t = e10;
  for (let n = 0; n < 64; n++) {
    let r = bVe(t).replace(CVe, "");
    if (r === t) return r;
    t = r;
  }
  return "";
}
var yq = ["bash", "powershell"];
var kp = P(() => h().optional().describe('Permission rule syntax to filter when this hook runs (e.g., "Bash(git *)"). Only runs if the tool call matches the pattern. Avoids spawning hooks for non-matching commands.')), Sq = P(() => B(["continue", "block"]).optional().describe("What a failure of this hook does: it could not start (a missing script or plugin directory), timed out, exited with a code other than 0 or 2, or printed JSON that is invalid or fails validation. 'continue' (default): the failure is reported and the action goes ahead. 'block': the failure counts as exit code 2, so the action the event guards (a tool call, a permission request, a prompt) is blocked. Ignored for async hooks and on Stop, SubagentStop, TaskCompleted and TeammateIdle."));
function AVe() {
  let e10 = O({ type: N("command").describe("Shell command hook type"), command: h().describe("Shell command to execute"), args: k(h()).optional().describe("Argument list for exec form. When present, `command` is resolved as an executable and spawned directly with these arguments — no shell. Path placeholders like ${CLAUDE_PLUGIN_ROOT} are substituted per-element as plain strings, so paths with quotes, $, or backticks never reach a shell parser. When absent, `command` runs through a shell (bash on POSIX, PowerShell on Windows without Git Bash)."), if: kp(), shell: B(yq).optional().describe("Shell interpreter. 'bash' uses your $SHELL (bash/zsh/sh); 'powershell' uses pwsh. Defaults to bash (powershell on Windows without Git Bash)."), timeout: q().positive().optional().describe("Timeout in seconds for this specific command"), onFailure: Sq(), statusMessage: h().optional().describe("Custom status message to display in spinner while hook runs"), once: x().optional().describe("If true, hook runs once and is removed after execution"), async: x().optional().describe("If true, hook runs in background without blocking"), asyncRewake: x().optional().describe("If true, hook runs in background and wakes the model on exit code 2 (blocking error). Implies async."), rewakeMessage: h().min(1).optional().describe("@internal Custom prefix for the system-reminder shown to the model when an asyncRewake hook exits with code 2. The hook output is appended after this prefix."), rewakeSummary: h().min(1).optional().describe('@internal One-line summary shown to the user in the terminal when an asyncRewake hook exits with code 2. Defaults to "Stop hook feedback".'), cloud: B(["device", "skip"]).optional().catch("skip").describe("@internal Where this hook may run when a cloud session is driven from this machine. 'device': offer it to the cloud session and run it here even when its script sits where the cloud session can write on this machine or cannot be pinned — the author accepts that the session may have changed files this hook executes. 'skip': never offer it to cloud sessions. Omit for the default: a command hook whose script could be read and pinned and lies outside everything the cloud session can write here is offered; other command hooks are not. Applies to this entry only: the same hook written in another settings scope keeps its own setting. An unrecognised value reads as 'skip' (the file still loads; the hook stays on this machine).") }), t = O({ type: N("prompt").describe("LLM prompt hook type"), prompt: h().describe("Prompt to evaluate with LLM. Use $ARGUMENTS placeholder for hook input JSON."), if: kp(), timeout: q().positive().optional().describe("Timeout in seconds for this specific prompt evaluation"), model: h().optional().describe('Model to use for this prompt hook (e.g., "claude-sonnet-5"). If not specified, uses the default small fast model.'), continueOnBlock: x().optional().describe(`Sets the continue value for the decision:"block" produced when ok is false. Default false (turn ends). Whether continue:true lets the turn proceed depends on the event's decision:"block" semantics. On PostToolUse, the reason is fed back to Claude and the turn continues.`), statusMessage: h().optional().describe("Custom status message to display in spinner while hook runs"), once: x().optional().describe("If true, hook runs once and is removed after execution") }), n = O({ type: N("mcp_tool").describe("MCP tool hook type"), server: h().describe("Name of an already-configured MCP server to invoke"), tool: h().describe("Name of the tool on that server to call"), input: W(h(), fe()).optional().describe('Arguments passed to the MCP tool. String values support ${path} interpolation from the hook input JSON (e.g. "${tool_input.file_path}").'), if: kp(), timeout: q().positive().optional().describe("Timeout in seconds for this specific tool call"), statusMessage: h().optional().describe("Custom status message to display in spinner while hook runs"), once: x().optional().describe("If true, hook runs once and is removed after execution") }), r = O({ type: N("http").describe("HTTP hook type"), url: h().url().describe("URL to POST the hook input JSON to"), if: kp(), timeout: q().positive().optional().describe("Timeout in seconds for this specific request"), onFailure: Sq(), headers: W(h(), h()).optional().describe('Additional headers to include in the request. Values may reference environment variables using $VAR_NAME or ${VAR_NAME} syntax (e.g., "Authorization": "Bearer $MY_TOKEN"). Only variables listed in allowedEnvVars will be interpolated.'), allowedEnvVars: k(h()).optional().describe("Explicit list of environment variable names that may be interpolated in header values. Only variables listed here will be resolved; all other $VAR references are left as empty strings. Required for env var interpolation to work."), statusMessage: h().optional().describe("Custom status message to display in spinner while hook runs"), once: x().optional().describe("If true, hook runs once and is removed after execution"), cloud: B(["device", "skip"]).optional().catch("skip").describe("@internal Where this hook may run when a cloud session is driven from this machine. 'skip': never offer it to cloud sessions; 'device' or omitted: offered (an HTTP hook has no script to pin). Applies to this entry only. An unrecognised value reads as 'skip' (the file still loads).") }), o = O({ type: N("agent").describe("Agentic verifier hook type"), prompt: h().describe('Prompt describing what to verify (e.g. "Verify that unit tests ran and passed."). Use $ARGUMENTS placeholder for hook input JSON.'), if: kp(), timeout: q().positive().optional().describe("Timeout in seconds for agent execution (default 60)"), model: h().optional().describe('Model to use for this agent hook (e.g., "claude-sonnet-5"). If not specified, uses Haiku.'), statusMessage: h().optional().describe("Custom status message to display in spinner while hook runs"), once: x().optional().describe("If true, hook runs once and is removed after execution") });
  return { BashCommandHookSchema: e10, PromptHookSchema: t, HttpHookSchema: r, AgentHookSchema: o, McpToolHookSchema: n };
}
var V_ = P(() => {
  let { BashCommandHookSchema: e10, PromptHookSchema: t, AgentHookSchema: n, HttpHookSchema: r, McpToolHookSchema: o } = AVe();
  return Xi("type", [...[e10, t, n, r, o]]);
}), Tw = P(() => O({ matcher: h().optional().describe('String pattern to match (e.g. tool names like "Write")'), hooks: k(V_()).describe("List of hooks to execute when the matcher matches") })), Sa = P(() => bU(B(Zo), k(Tw())));
var TVe = /* @__PURE__ */ new Set(["metadata", "mcpServers", "lspServers"]);
/* @__PURE__ */ new Set([...TVe, "experimental"]);
var wVe = /[:/\\?#@\s]/;
function Ip(e10) {
  let t = wq(e10.replace(/[\t\n\r]/g, "").toLowerCase());
  if (t === "" || wVe.test(t)) return t;
  try {
    let n = new URL(`https://${t}`);
    if (n.username !== "" || n.password !== "" || n.port !== "" || n.pathname !== "/" || n.search !== "" || n.hash !== "") return t;
    return wq(n.hostname);
  } catch {
    return t;
  }
}
g_(function(t) {
  let n = Ip(t);
  while (n.startsWith("www.")) n = n.slice(4);
  return n;
}, (e10) => e10, 50);
function wq(e10) {
  let t = e10.length;
  while (t > 0 && e10[t - 1] === ".") t--;
  return e10.slice(0, t);
}
var vVe = 64;
class vc {
  fields;
  activeWhenAbsent;
  keys;
  built = /* @__PURE__ */ new Map();
  byPresentKeys = /* @__PURE__ */ new Map();
  wholeSchema;
  constructor(e10, t = /* @__PURE__ */ new Set()) {
    this.fields = e10;
    this.activeWhenAbsent = t;
    this.keys = Object.keys(e10).filter((n) => e10[n] !== void 0);
  }
  has(e10) {
    return Object.hasOwn(this.fields, e10) && this.fields[e10] !== void 0;
  }
  field(e10) {
    let t = this.built.get(e10);
    if (t) return t;
    let n = this.has(e10) ? this.fields[e10] : void 0;
    if (!n) return;
    let r = n();
    return this.built.set(e10, r), r;
  }
  carries(e10, t) {
    return this.activeWhenAbsent.has(t) || typeof e10 === "object" && e10 !== null && t in e10;
  }
  whole() {
    return this.wholeSchema ??= O(this.shapeOf(this.keys)).passthrough(), this.wholeSchema;
  }
  forDocument(e10, t = "passthrough") {
    let n = this.keys.filter((a) => this.carries(e10, a));
    if (n.length === this.keys.length && t === "passthrough") return this.whole();
    let r = `${t}
${n.join(`
`)}`, o = this.byPresentKeys.get(r);
    if (o) return this.byPresentKeys.delete(r), this.byPresentKeys.set(r, o), o;
    let s = this.shapeOf(n), i = t === "strip" ? Le((a, l) => {
      for (let c of this.wrongDocumentIssues(a, s)) l.addIssue(c);
      return a;
    }, O(s)) : O(s).passthrough().check((a) => {
      a.issues.push(...this.wrongDocumentIssues(a.value, s));
    });
    if (this.byPresentKeys.size >= vVe) for (let a of this.byPresentKeys.keys()) {
      this.byPresentKeys.delete(a);
      break;
    }
    return this.byPresentKeys.set(r, i), i;
  }
  wrongDocumentIssues(e10, t) {
    if (typeof e10 !== "object" || e10 === null) return [];
    let n = [];
    for (let r of Object.keys(e10)) if (!Object.hasOwn(t, r) && this.has(r)) n.push({ code: "custom", input: e10[r], path: [r], message: "This settings schema was built for a document without this key" });
    return n;
  }
  shapeOf(e10) {
    let t = {};
    for (let n of e10) {
      let r = this.field(n);
      if (r) t[n] = r;
    }
    return t;
  }
}
var Iq = 600;
var Nw = 500;
function zq() {
  return { claudeaiPluginId: h().max(128).optional().catch(void 0), archiveSha256: EY().optional().catch(void 0) };
}
function Hq() {
  return { directoryRepositoryKey: h().max(4096).optional().catch(void 0) };
}
function Uw(e10) {
  if (!/^https?:\/\/[^/\\]/i.test(e10)) return false;
  try {
    let { protocol: t } = new URL(e10);
    return t === "https:" || t === "http:";
  } catch {
    return false;
  }
}
function jq() {
  return { npmVersionSpec: h().max(256).optional().catch(void 0), npmResolved: h().max(2048).optional().catch(void 0), npmIntegrity: h().max(256).optional().catch(void 0), npmRegistry: h().max(2048).refine(Uw).optional().catch(void 0) };
}
function Bq() {
  return { sourceCommand: h().max(Nw + 20).optional().catch(void 0).describe("The `command`-source command the user accepted at explicit install/update. The once-per-session background re-resolve only runs while the marketplace entry still declares this exact command; a changed command (or an entry that became command-sourced later) is skipped with a warning until the user runs an explicit update."), sourceProducerPath: h().max(4096).refine(Dq, { message: "must be an absolute path" }).optional().catch(void 0).describe("The directory a `command`-source plugin was last resolved to (what its command printed). Served in place in link mode and re-copied every session in copy mode, so the sandbox write-denies it; refreshed on every install/update, including no-op updates that resolve to a new location."), previousProducerPaths: k(fe()).transform((e10) => e10.filter((t) => typeof t === "string" && t.length <= 4096 && Dq(t)).slice(-32)).optional().catch(void 0).describe("Producer directories this installation was resolved to before the current one (most recent last, bounded). A concurrent older session may still serve one of them, so the sandbox keeps write-denying them too.") };
}
function Dq(e10) {
  return pn.posix.isAbsolute(e10) || pn.win32.isAbsolute(e10);
}
var Kq = /[^\x20-\x7E]| {4,}/;
function Fw() {
  return h().max(Nw, { message: "headersHelper must not be longer than the install consent UI can display" }).refine((e10) => !Kq.test(e10), { message: "headersHelper must be printable ASCII (letters, digits, punctuation, single spaces) with no runs of 4 or more spaces" });
}
var DVe = "anthropic-plugin-directory", LVe = ["healthcare"], Gq = /* @__PURE__ */ new Set(["claude-community", "claude-plugins-community", ...LVe]), Wq = /* @__PURE__ */ new Set(["claude-code-marketplace", "claude-code-plugins", "claude-plugins-official", "anthropic-marketplace", "anthropic-plugins", "agent-skills", "anthropic-agent-skills", "life-sciences", "knowledge-work-plugins", "claude-for-legal", "claude-for-financial-services", "financial-services-plugins", "first-party-plugins", "claude-tag-plugins"]), MVe = /* @__PURE__ */ new Set([DVe, "claude-plugin-directory"]), $w = /* @__PURE__ */ new Set([...Wq, ...Gq, ...MVe]);
var Vq = ["marketplace", "plugins", "official"];
function NVe() {
  return Vq;
}
var qq = "official[^a-z0-9]*(anthropic|claude)|(?:anthropic|claude)[^a-z0-9]*official";
function Yq(e10) {
  return new RegExp(`(?:${qq}|^(?:anthropic|claude)[^a-z0-9]*(${e10.join("|")}))`, "i");
}
var UVe = Yq(NVe()), FVe = Yq(Vq), $Ve = /[^\u0020-\u007E]/;
function Zq(e10) {
  if ($w.has(e10.toLowerCase())) return false;
  if (zVe(e10)) return true;
  if (UVe.test(e10)) return true;
  return false;
}
function zVe(e10) {
  return !$w.has(e10.toLowerCase()) && ($Ve.test(e10) || FVe.test(e10));
}
var or = P(() => h().startsWith("./")), ba = P(() => or().endsWith(".json")), Lq = P(() => re([N("."), or()])), Mq = P(() => re([or().refine((e10) => e10.endsWith(".mcpb") || e10.endsWith(".dxt"), { message: "MCPB file path must end with .mcpb or .dxt" }).describe("Path to MCPB file relative to plugin root"), h().url().refine((e10) => e10.endsWith(".mcpb") || e10.endsWith(".dxt"), { message: "MCPB URL must end with .mcpb or .dxt" }).describe("URL to MCPB file")])), Iw = P(() => or().endsWith(".md")), Dw = P(() => re([Iw(), or()])), zw = { inline: "--plugin-dir session plugins", builtin: "built-in plugins", "skills-dir": "plugins auto-loaded from .claude/skills/", synced: "plugins synced from your claude.ai account", "claude-plugin-test": "plugins loaded by claude plugin test", npm: "plugins installed from an npm registry (`<package>@npm`); remove this marketplace and add it again under another name", pip: "plugins installed from a Python package index (reserved; not yet available)", uv: "plugins installed from a Python package index through uv (reserved; not yet available)", cargo: "plugins installed from a Rust crate registry (reserved; not yet available)", github: "plugins installed straight from a GitHub repository (`<owner>/<repo>@github`; reserved; not yet available)", gh: "plugins installed straight from a GitHub repository (reserved; not yet available)" }, Hw = "npm", HVe = ["pip", "uv", "cargo", "github", "gh"];
function Z_(e10) {
  return Object.hasOwn(zw, e10);
}
var jVe = [Hw, ...HVe];
function Jq(e10) {
  return jVe.includes(e10.toLowerCase());
}
function BVe(e10, t) {
  let n = e10.toLowerCase();
  if (Jq(n) && Z_(n)) t.addIssue({ code: "custom", message: `Marketplace name "${n}" is reserved for ${zw[n]}` });
}
var KVe = "Marketplace name impersonates an official Anthropic/Claude marketplace", jw = (e10) => h().min(1, "Marketplace must have a name").refine((t) => !t.includes(" "), { message: 'Marketplace name cannot contain spaces. Use kebab-case (e.g., "my-marketplace")' }).refine((t) => !RY.test(t), { message: "Marketplace name cannot contain control or bidirectional-formatting characters" }).refine((t) => !t.includes("/") && !t.includes("\\") && !t.includes("..") && t !== ".", { message: 'Marketplace name cannot contain path separators (/ or \\), ".." sequences, or be "."' }).refine((t) => !e10(t), { message: KVe }).superRefine((t, n) => {
  let r = t.toLowerCase();
  if (!Z_(r) || Jq(r)) return;
  n.addIssue({ code: "custom", message: `Marketplace name "${r}" is reserved for ${zw[r]}` });
}), GVe = P(() => jw(Zq)), WVe = P(() => jw(() => false));
function VVe(e10) {
  return jw(e10).superRefine(BVe);
}
var J_ = P(() => h().min(1, "Plugin name cannot be empty").refine((e10) => !e10.includes(" "), { message: 'Plugin name cannot contain spaces. Use kebab-case (e.g., "my-plugin")' }).refine((e10) => !RY.test(e10), { message: "Plugin name cannot contain control or bidirectional-formatting characters" })), Bw = P(() => O({ name: h().min(1, "Author name cannot be empty").describe("Display name of the plugin author or organization"), email: h().optional().describe("Contact email for support or feedback"), url: h().optional().describe("Website, GitHub profile, or organization URL") })), Wn = P(() => O({ $schema: h().optional().describe("JSON Schema reference for editor autocomplete/validation; ignored at load time"), name: J_().describe("Unique identifier for the plugin, used for namespacing (prefer kebab-case)"), displayName: h().optional().describe('Human-readable name shown in UI (e.g., "GitHub Utils"). Falls back to `name` when omitted. Unlike `name`, may contain spaces and any casing; not used for namespacing or lookup.'), version: h().optional().describe("Semantic version (e.g., 1.2.3) following semver.org specification"), description: h().optional().describe("Brief, user-facing explanation of what the plugin provides"), author: Bw().optional().describe("Information about the plugin creator or maintainer"), homepage: h().url().optional().describe("Plugin homepage or documentation URL"), repository: h().optional().describe("Source code repository URL"), license: h().optional().describe("SPDX license identifier (e.g., MIT, Apache-2.0)"), keywords: k(h()).optional().describe("Tags for plugin discovery and categorization"), defaultEnabled: x().optional().describe("Whether the plugin starts enabled when the user has no explicit enabled/disabled setting for it (default: true). Explicit enabledPlugins values always win, and a plugin required by an enabled dependent is enabled regardless of this value."), dependencies: k(K2e()).optional().describe(`Plugins that must be enabled for this plugin to function. Bare names (no "@marketplace") are resolved against the declaring plugin's own marketplace.`), metadata: Le((e10) => se(e10) ? e10 : void 0, W(h(), fe()).optional()).describe("Free-form metadata for the plugin author's own use (e.g. entitlement or catalog fields). Preserved on the parsed manifest but not read by Claude Code.") })), qVe = 1;
P(() => O({ $schema: h().optional().catch(void 0).describe("JSON Schema reference for editor autocomplete/validation; ignored at load time"), description: h().optional().describe("Brief, user-facing explanation of what these hooks provide"), hooks: qm(() => Sa()).optional().describe("The hooks provided by the plugin, in the same format as the one used for settings"), modules: k(h()).max(qVe, { message: "hooks.json `modules` names one hooks module per plugin; a second entry is refused" }).optional().describe(`The hooks module: one path, relative to this hooks.json, of a module exporting register(on). The module, and every file it imports from the plugin, is named like code (${fVe}; a file named otherwise is not loaded) and is an ES module whatever its suffix. What it hooks and calls is read from its source before it loads; \`claude plugin validate\` shows the result.`), surface: Gm({ error: 'hooks.json `surface` is gone: name the module in the Client element, `Client({ module: "./board.tsx", key })`, a path relative to the file that builds it' }).optional() }).refine((e10) => e10.hooks !== void 0 || (e10.modules?.length ?? 0) > 0, { message: "hooks.json must have `hooks` (the hook matchers) or `modules` (hooks modules), or both" }));
var Xq = P(() => O({ hooks: re([ba().describe("Path to file with additional hooks (in addition to those in hooks/hooks.json, if it exists), relative to the plugin root"), qm(() => Sa()).describe("Additional hooks (in addition to those in hooks/hooks.json, if it exists)"), k(re([ba().describe("Path to file with additional hooks (in addition to those in hooks/hooks.json, if it exists), relative to the plugin root"), qm(() => Sa()).describe("Additional hooks (in addition to those in hooks/hooks.json, if it exists)")]))]) })), YVe = P(() => O({ source: Dw().optional().describe("Path to command markdown file, relative to plugin root"), content: h().optional().describe("Inline markdown content for the command"), description: h().optional().describe("Command description override"), argumentHint: h().optional().describe('Hint for command arguments (e.g., "[file]")'), model: h().optional().describe("Default model for this command"), allowedTools: k(h()).optional().describe("Tools allowed when command runs") }).refine((e10) => e10.source && !e10.content || !e10.source && e10.content, { message: 'Command must have either "source" (file path) or "content" (inline markdown), but not both' })), Qq = P(() => O({ commands: re([Dw().describe("Path to a command file or skill directory, relative to the plugin root. When set, the commands/ directory is not auto-loaded — list its files here if you want both."), k(Dw().describe("Path to a command file or skill directory, relative to the plugin root. When set, the commands/ directory is not auto-loaded — list its files here if you want both.")).describe("List of command file or skill directory paths. When set, the commands/ directory is not auto-loaded."), W(h(), YVe()).describe('Object mapping of command names to their metadata and source files. Command name becomes the slash command name (e.g., "about" → "/plugin:about")')]) })), eY = P(() => O({ agents: re([Iw().describe("Path to an agent file, relative to the plugin root. When set, the agents/ directory is not auto-loaded — list its files here if you want both."), k(Iw().describe("Path to an agent file, relative to the plugin root. When set, the agents/ directory is not auto-loaded — list its files here if you want both.")).describe("List of agent file paths. When set, the agents/ directory is not auto-loaded.")]) })), tY = P(() => O({ skills: re([Lq().describe('Path to a skill directory, relative to the plugin root ("." / "./" denote the plugin root itself). Loaded in addition to the skills/ directory (except: for a marketplace entry whose source resolves to the marketplace root, declaring a specific subdirectory replaces the skills/ scan).'), k(Lq().describe('Path to a skill directory, relative to the plugin root ("." / "./" denote the plugin root itself).')).describe("List of skill directory paths, loaded in addition to the skills/ directory (except: for a marketplace entry whose source resolves to the marketplace root, declaring specific subdirectories replaces the skills/ scan).")]) })), ZVe = P(() => re([h(), k(h())])), Kw = P(() => O({ outputStyles: re([or().describe("Path to an output-styles directory or file, relative to the plugin root. When set, the output-styles/ directory is not auto-loaded — list its files here if you want both."), k(or().describe("Path to an output-styles directory or file, relative to the plugin root. When set, the output-styles/ directory is not auto-loaded — list its files here if you want both.")).describe("List of output-style directory or file paths. When set, the output-styles/ directory is not auto-loaded.")]) })), JVe = P(() => h().max(64).regex(/^[a-z][a-z0-9_-]*$/, "must match ^[a-z][a-z0-9_-]*$")), XVe = 16, QVe = P(() => O({ id: JVe(), remote: h().max(256).regex(/^(npm:[@a-z0-9/._-]+(@[a-z0-9._+-]+)?|github:[\w.-]+\/[\w.-]+@[\w./-]+#.+\.js)$/, "must be npm:<pkg>[@ver] or github:<owner>/<repo>@<ref>#<path>.js").optional(), integrity: h().max(512).regex(/^sha(256|384|512)-[A-Za-z0-9+/=]+$/, "must be SRI form: sha256-, sha384-, or sha512-<base64>").optional() }).strict()), e2e = P(() => O({ syntaxHighlighting: O({ hljsLanguages: k(QVe()).max(XVe) }).strict() })), Gw = P(() => O({ themes: re([or().describe("Path to a themes directory or file, relative to the plugin root. When set, the themes/ directory is not auto-loaded — list its files here if you want both."), k(or().describe("Path to a themes directory or file, relative to the plugin root. When set, the themes/ directory is not auto-loaded — list its files here if you want both.")).describe("List of theme directory or file paths. When set, the themes/ directory is not auto-loaded.")]) })), nY = P(() => O({ workflows: re([or().describe("Path to a workflows directory or .js file, relative to the plugin root. When set, the workflows/ directory is not auto-loaded — list its files here if you want both."), k(or().describe("Path to a workflows directory or .js file, relative to the plugin root. When set, the workflows/ directory is not auto-loaded — list its files here if you want both.")).describe("List of workflow directory or .js file paths. When set, the workflows/ directory is not auto-loaded.")]).optional() })), Nq = P(() => h().min(1)), t2e = P(() => h().min(2).refine((e10) => e10.startsWith("."), { message: 'File extensions must start with dot (e.g., ".ts", not "ts")' })), rY = P(() => O({ mcpServers: re([ba().describe("MCP servers to include in the plugin (in addition to those in the .mcp.json file, if it exists)"), Mq().describe("Path or URL to MCPB file containing MCP server configuration"), W(h(), W_()).describe("MCP server configurations keyed by server name"), k(re([ba().describe("Path to MCP servers configuration file"), Mq().describe("Path or URL to MCPB file"), W(h(), W_()).describe("Inline MCP server configurations")])).describe("Array of MCP server configurations (paths, MCPB files, or inline definitions)")]) })), oY = P(() => O({ type: B(["string", "number", "boolean", "directory", "file"]).describe("Type of the configuration value"), title: h().describe("Human-readable label shown in the config dialog"), description: h().describe("Help text shown beneath the field in the config dialog"), required: x().optional().describe("If true, validation fails when this field is empty"), default: re([h(), q(), x(), k(h())]).optional().describe("Default value used when the user provides nothing"), multiple: x().optional().describe("For string type: allow an array of strings"), sensitive: x().optional().describe("If true, masks dialog input and stores value in secure storage (keychain/credentials file) instead of settings.json"), min: q().optional().describe("Minimum value (number type only)"), max: q().optional().describe("Maximum value (number type only)"), options: k(h().min(1, "An option cannot be empty").max(64, "An option can be at most 64 characters").refine((e10) => _q(e10) === e10, { message: "An option cannot contain control, invisible or bidirectional-formatting characters" }).refine((e10) => e10.trim() === e10, { message: "An option cannot start or end with a space" })).min(1, "options needs at least one value").refine((e10) => new Set(e10.map((t) => t.toLowerCase())).size === e10.length, { message: "options cannot repeat a value (in any letter case)" }).readonly().optional().describe("For string type: the only values the field takes. /config shows the field as a picker over them, and a stored value outside them counts as unset") }).strict().superRefine((e10, t) => {
  if (e10.options === void 0) return;
  if (e10.type !== "string" || e10.multiple === true || e10.sensitive === true) {
    t.addIssue({ code: "custom", path: ["options"], message: 'options is only for a field of type "string" that is neither multiple nor sensitive' });
    return;
  }
  if (e10.default === void 0) {
    if (e10.required !== true) t.addIssue({ code: "custom", path: ["default"], message: "a field with options needs a default among them, or required: true" });
    return;
  }
  if (typeof e10.default !== "string" || !e10.options.includes(e10.default)) t.addIssue({ code: "custom", path: ["default"], message: `default must be one of the options: ${e10.options.join(", ")}` });
})), sY = P(() => O({ userConfig: W(h().regex(/^[A-Za-z_]\w*$/, "Option keys must be valid identifiers (letters, digits, underscore; no leading digit) — they become CLAUDE_PLUGIN_OPTION_<KEY> env vars in hooks"), oY()).optional().describe("User-configurable values this plugin needs. Prompted at enable time. Non-sensitive values saved to settings.json; sensitive values to secure storage. Available as ${user_config.KEY} in MCP/LSP server config, hook commands, and (non-sensitive only) skill/agent content. Keep sensitive value counts small.") })), iY = P(() => O({ channels: k(O({ server: h().min(1).describe("Name of the MCP server this channel binds to. Must match a key in this plugin's mcpServers."), displayName: h().optional().describe('Human-readable name shown in the config dialog title (e.g., "Telegram"). Defaults to the server name.'), userConfig: W(h(), oY()).optional().describe("Fields to prompt the user for when enabling this plugin in assistant mode. Saved values are substituted into ${user_config.KEY} references in the mcpServers env.") }).strict()).describe("Channels this plugin provides. Each entry declares an MCP server as a message channel and optionally specifies user configuration to prompt for at enable time.") })), Uq = P(() => CR({ command: h().min(1).refine((e10) => {
  if (e10.includes(" ") && !e10.startsWith("/")) return false;
  return true;
}, { message: "Command should not contain spaces. Use args array for arguments." }).describe('Command to execute the LSP server (e.g., "typescript-language-server")'), args: k(Nq()).optional().describe("Command-line arguments to pass to the server"), extensionToLanguage: W(t2e(), Nq()).refine((e10) => Object.keys(e10).length > 0, { message: "extensionToLanguage must have at least one mapping" }).describe("Mapping from file extension to LSP language ID. File extensions and languages are derived from this mapping."), transport: B(["stdio", "socket"]).default("stdio").describe("Communication transport mechanism"), env: W(h(), h()).optional().describe("Environment variables to set when starting the server"), initializationOptions: fe().optional().describe("Initialization options passed to the server during initialization"), settings: fe().optional().describe("Settings passed to the server via workspace/didChangeConfiguration"), workspaceFolder: h().optional().describe("Workspace folder path to use for the server"), startupTimeout: q().int().positive().optional().describe("Maximum time to wait for server startup (milliseconds)"), shutdownTimeout: q().int().positive().optional().describe("Maximum time to wait for graceful shutdown (milliseconds)"), requestTimeout: q().int().positive().max(2147483647).optional().describe("Maximum time to wait for the server to answer a request (milliseconds). Defaults to 60000."), restartOnCrash: x().optional().describe("Whether to restart the server if it crashes"), maxRestarts: q().int().nonnegative().optional().describe("Maximum number of restart attempts before giving up"), diagnostics: x().optional().describe("Whether to push publishDiagnostics into the agent context after edits. Set to false to keep LSP navigation (goToDefinition, hover, etc.) but suppress automatic diagnostic injection. Defaults to true.") })), n2e = P(() => CR({ name: h().min(1).describe("Identifier for this monitor, unique within the plugin. Used to dedupe so re-arming (plugin reload, repeat skill invoke) does not spawn duplicates."), command: h().min(1).describe('Shell command to run as a persistent background monitor. Each stdout line is delivered to the model as a <task_notification> event; the process runs for the session lifetime. ${CLAUDE_PLUGIN_ROOT}, ${CLAUDE_PLUGIN_DATA}, ${CLAUDE_PROJECT_DIR}, ${user_config.*}, and ${ENV_VAR} are substituted. Runs in the session cwd (the named --project-config-root when a host set one) — prefix with `cd "${CLAUDE_PLUGIN_ROOT}" && ` if the script needs its own directory.'), description: h().min(1).describe("Short human-readable description of what is being monitored (shown in task panel and notification summary)."), when: re([N("always"), h().startsWith("on-skill-invoke:").refine((e10) => e10.length > 16, { message: "on-skill-invoke: must specify a skill name" })]).default("always").describe('Arm trigger. "always" arms at session start and on plugin reload. "on-skill-invoke:<skill>" arms the first time that skill is dispatched (via Skill tool or slash command).') })), r2e = P(() => k(n2e()).refine((e10) => new Set(e10.map((t) => t.name)).size === e10.length, { message: "Monitor names must be unique within a plugin" })), Ww = P(() => O({ monitors: re([ba().describe("Path to a JSON file containing the monitors array, relative to the plugin root"), r2e()]).describe("Background watch scripts the host arms as persistent Monitor tasks (unsandboxed, same trust tier as hooks) so plugins need not instruct the model to arm them. When omitted, monitors/monitors.json at the plugin root is loaded if present.") })), aY = P(() => O({ lspServers: re([ba().describe("Path to .lsp.json configuration file relative to plugin root"), W(h(), Uq()).describe("LSP server configurations keyed by server name"), k(re([ba().describe("Path to LSP configuration file"), W(h(), Uq()).describe("Inline LSP server configurations")])).describe("Array of LSP server configurations (paths or inline definitions)")]) })), o2e = /^@[a-z0-9][a-z0-9-._]*\/[a-z0-9][a-z0-9-._]*$/, s2e = /^[a-z0-9][a-z0-9-._]*$/, i2e = /^@[a-z0-9][a-z0-9-._]*\/\*$/;
function Vw(e10) {
  return !e10.includes("..") && !e10.includes("//") && (o2e.test(e10) || s2e.test(e10));
}
var lY = P(() => h().refine((e10) => !e10.includes("..") && !e10.includes("//"), "Package name cannot contain path traversal patterns").refine((e10) => Vw(e10), "Invalid npm package name format")), a2e = /^[a-z0-9](?:[a-z0-9._-]*[a-z0-9_-])?$/, l2e = /^[0-9a-f]{64}$/;
var c2e = 64;
var u2e = P(() => O({ sha256: h().regex(l2e) }));
function d2e(e10) {
  let t = W(h(), fe()).safeParse(e10);
  if (!t.success) return;
  let n = /* @__PURE__ */ Object.create(null), r = 0;
  for (let [o, s] of Object.entries(t.data)) {
    if (r >= c2e) break;
    let i = u2e().safeParse(s);
    if (a2e.test(o) && i.success) n[o] = i.data, r++;
  }
  return r > 0 ? n : void 0;
}
var cY = P(() => O({ binaries: fe().transform(d2e).describe("sha256-pinned files to fetch into bin/ at install time, keyed by basename (target triple encoded in the name)") })), uY = P(() => O({ settings: W(h(), fe()).optional().describe("Settings to merge into the user settings while this plugin is enabled. Only the documented allowlisted keys are applied.") })), dY = P(() => O({ types: or().refine((e10) => e10.endsWith(".d.ts"), { message: "types must name a TypeScript declaration file ending in '.d.ts'" }).refine((e10) => !e10.split(/[\\/]/).includes(".."), { message: "types must stay inside the plugin directory (no '..' segment)" }).optional().describe("Path to the plugin's type contract, relative to the plugin root and starting with ./: a self-contained .d.ts (no import, export-from, require or reference) that exports the types of the noun the plugin's hooks module adds in engine.create at its top level and declares the noun in a `declare module 'claude-code' { interface EngineInterface { ... } }` block, nothing else. A mod that lists this plugin under dependencies gets the contract laid at .claude-plugin/types/<plugin>/index.d.ts each time the engine loads it from a folder the person owns, so it types against the noun with nothing copied; claude plugin validate checks the file.") })), pY = P(() => O({ experimental: Le((e10) => se(e10) ? e10 : void 0, O({ ...Gw().partial().shape, ...e2e().partial().shape, ...Ww().partial().shape, ...Kw().partial().shape, evals: ZVe().optional().describe("Directory of eval cases for the plugin evaluation harness, relative to the plugin root (default: evals/). A list is accepted; its first entry is the case directory.") }).passthrough().optional().describe("Components whose manifest shape may change without a deprecation cycle. Move a key out of here once it is promoted to stable.")) }));
var p2e = P(() => O({ ...Wn().shape, ...Xq().partial().shape, ...Qq().partial().shape, ...eY().partial().shape, ...tY().partial().shape, ...Kw().partial().shape, ...Gw().partial().shape, ...nY().shape, ...iY().partial().shape, ...rY().partial().shape, ...aY().partial().shape, ...Ww().partial().shape, ...uY().partial().shape, ...dY().partial().shape, ...sY().partial().shape, ...cY().partial().shape, ...pY().partial().shape }));
P(() => new vc({ $schema: () => Wn().shape.$schema, name: () => Wn().shape.name, displayName: () => Wn().shape.displayName, version: () => Wn().shape.version, description: () => Wn().shape.description, author: () => Wn().shape.author, homepage: () => Wn().shape.homepage, repository: () => Wn().shape.repository, license: () => Wn().shape.license, keywords: () => Wn().shape.keywords, defaultEnabled: () => Wn().shape.defaultEnabled, dependencies: () => Wn().shape.dependencies, metadata: () => Wn().shape.metadata, hooks: () => Xq().partial().shape.hooks, commands: () => Qq().partial().shape.commands, agents: () => eY().partial().shape.agents, skills: () => tY().partial().shape.skills, outputStyles: () => Kw().partial().shape.outputStyles, themes: () => Gw().partial().shape.themes, workflows: () => nY().shape.workflows, channels: () => iY().partial().shape.channels, mcpServers: () => rY().partial().shape.mcpServers, lspServers: () => aY().partial().shape.lspServers, monitors: () => Ww().partial().shape.monitors, settings: () => uY().partial().shape.settings, types: () => dY().partial().shape.types, userConfig: () => sY().partial().shape.userConfig, binaries: () => cY().partial().shape.binaries, experimental: () => pY().partial().shape.experimental }, /* @__PURE__ */ new Set(["name"])));
function yY(e10) {
  return Xi("source", [O({ source: N("url"), url: h().url().describe("Direct URL to marketplace.json file"), headers: W(h(), h()).optional().describe("Custom HTTP headers (e.g., for authentication)"), headersHelper: Fw().optional().describe("Command that prints a JSON object of HTTP headers (e.g. a short-lived auth token). Its output overrides `headers` and, like `headers`, is inherited by same-origin archive downloads from this marketplace. Runs from a fixed directory (the Claude config home, never the session's), so give a bare command found via PATH or an absolute path; it is re-run on later refreshes of this marketplace.") }), O({ source: N("github"), repo: h().describe('GitHub repository in owner/repo format. ONLY in the managed-settings policy lists (strictKnownMarketplaces / blockedMarketplaces) the owner-wildcard form "owner/*" matches every repository under exactly that owner. Everywhere else (marketplace add, extraKnownMarketplaces, known_marketplaces.json) the value must name a single repository — a wildcard is taken literally and fails to clone.'), ref: h().optional().describe('Git branch or tag to use (e.g., "main", "v1.0.0"). Defaults to repository default branch.'), path: h().optional().describe("Path to marketplace.json within repo (defaults to .claude-plugin/marketplace.json)"), sparsePaths: k(h()).optional().describe('Directories to include via git sparse-checkout (cone mode). Use for monorepos where the marketplace lives in a subdirectory. Example: [".claude-plugin", "plugins"]. If omitted, the full repository is cloned.'), skipLfs: x().optional().describe("Has no effect; accepted so existing settings keep working. Claude Code's own git never downloads Git LFS content: LFS-tracked files in the marketplace repository are checked out as pointer files whether or not this is set, and adding or updating the marketplace says how many were. To fetch their content, run `git lfs pull` in the marketplace's checkout under ~/.claude/plugins/marketplaces/.") }), O({ source: N("git"), url: h().describe("Full git repository URL"), ref: h().optional().describe('Git branch or tag to use (e.g., "main", "v1.0.0"). Defaults to repository default branch.'), path: h().optional().describe("Path to marketplace.json within repo (defaults to .claude-plugin/marketplace.json)"), sparsePaths: k(h()).optional().describe('Directories to include via git sparse-checkout (cone mode). Use for monorepos where the marketplace lives in a subdirectory. Example: [".claude-plugin", "plugins"]. If omitted, the full repository is cloned.'), skipLfs: x().optional().describe("Has no effect; accepted so existing settings keep working. Claude Code's own git never downloads Git LFS content: LFS-tracked files in the marketplace repository are checked out as pointer files whether or not this is set, and adding or updating the marketplace says how many were. To fetch their content, run `git lfs pull` in the marketplace's checkout under ~/.claude/plugins/marketplaces/.") }), O({ source: N("npm"), package: lY().or(h().regex(i2e, "Invalid npm package name format")).describe('npm package containing marketplace.json (e.g. "@acme/claude-marketplace"). In strictKnownMarketplaces / blockedMarketplaces an entry also governs plugins installed straight from the npm marketplace (`<package>@npm`): an exact package name matches that package, and "@acme/*" matches every package under the scope.'), version: h().optional().describe('Version or range to fetch (e.g. "1.4.0", "^1.4"); defaults to the latest dist-tag'), registry: h().url().refine(Uw, "Registry must be an http(s) URL").optional().describe(`Registry URL. When adding a marketplace: a one-off registry override (otherwise your npm configuration decides). In a policy entry: the origin and path prefix the package's RESOLVED tarball URL must fall under (e.g. "https://npm.example.com/api/npm/internal/"); under allowManagedPermissionRulesOnly, an npm marketplace keeps plugin allowed-tools only when both the entry and the registration pin this same registry.`) }), O({ source: N("file"), path: h().describe("Local file path to marketplace.json") }), O({ source: N("directory"), path: h().describe("Local directory containing .claude-plugin/marketplace.json") }), O({ source: N("skills-dir") }).describe("Policy-list sentinel for the ~/.claude/skills/ auto-load (@skills-dir plugins). In strictKnownMarketplaces: opt the scan back IN (by default any allowlist blocks it). In blockedMarketplaces: turn the scan OFF without otherwise restricting marketplaces. Only meaningful in those two managed-settings lists (areLocalPluginDirsAllowedByPolicy); known_marketplaces.json / marketplace add etc. ignore it."), O({ source: N("hostPattern"), hostPattern: h().describe('Regex pattern to match the host/domain extracted from any marketplace source type. For github sources, matches against github.com. For git sources (SSH or HTTPS), extracts the hostname from the URL. Use in strictKnownMarketplaces to allow all marketplaces from a specific host (e.g., "^github\\.mycompany\\.com$").') }), O({ source: N("pathPattern"), pathPattern: h().describe('Regex pattern matched against the .path field of file and directory sources. Use in strictKnownMarketplaces to allow filesystem-based marketplaces alongside hostPattern restrictions for network sources. Use ".*" to allow all filesystem paths, or a narrower pattern (e.g., "^/opt/approved/") to restrict to specific directories.') }), O({ source: N("settings"), name: e10 ? WVe().describe("Marketplace name, as stored in known_marketplaces.json. A reserved name is refused per entry at load (revalidateReservedNameEntry); a look-alike name is judged when that marketplace's own catalog is parsed (catalogNameSchemaFor).") : GVe().refine((t) => !$w.has(t.toLowerCase()), { message: "Reserved marketplace names cannot be used with settings sources. validateOfficialNameSource only accepts github/git sources from anthropics/* for these names; a settings source would be rejected after loadAndCacheMarketplace has already written to disk with cleanupNeeded=false." }).describe("Marketplace name. Must match the extraKnownMarketplaces key (enforced); the synthetic manifest is written under this name. Same validation as PluginMarketplaceSchema plus reserved-name rejection — validateOfficialNameSource runs after the disk write, too late to clean up."), plugins: k(O2e()).describe("Plugin entries declared inline in settings.json"), owner: Bw().optional() }).describe("Inline marketplace manifest defined directly in settings.json. The reconciler writes a synthetic marketplace.json to the cache; diffMarketplaces detects edits via isEqual on the stored source (the plugins array is inside this object, so edits surface as sourceChanged).")]);
}
var Dp = P(() => yY(false));
var b2e = P(() => yY(true));
function SY() {
  return Dp();
}
var Yw = P(() => SY()), X_ = P(() => SY()), Pw = P(() => h().length(40).regex(/^[a-f0-9]{40}$/, "Must be a full 40-character lowercase git commit SHA")), EY = P(() => h().regex(/^[0-9a-fA-F]{64}$/, "Must be a 64-character hex SHA-256 digest")), C2e = "Archive URLs must use https:// and must not point at a loopback, link-local, or cloud-metadata host";
function A2e(e10) {
  try {
    let t = new URL(e10);
    return t.protocol === "https:" && !hq(t.hostname);
  } catch {
    return false;
  }
}
var R2e = P(() => O({ source: N("archive"), url: h().url().refine(A2e, { message: C2e }).describe("HTTPS URL of a zip archive containing the plugin. The plugin root (the directory holding .claude-plugin/) may be at the top of the archive or nested one directory deep — a single wrapping directory is stripped."), sha256: EY().optional().describe("SHA-256 digest of the archive. When set, every download is verified against it and the install is refused on mismatch. It also serves as the version identity when neither plugin.json nor the marketplace entry declares a `version`. Recommended. Note the update signal is the version string (plugin.json version, else the entry version, else this digest) — changing only the digest while a version is declared does not trigger an update.") }).describe("Plugin distributed as a zip archive fetched over HTTPS — for hosting on any static file server or artifact repository (S3, GitLab, nginx) with no git or npm on the client. Authentication: the entry's own `headers` / `headersHelper` (bound to this URL), overlaid on the enclosing url-source marketplace's headers (static or `headersHelper`-minted) when the archive shares its origin.")), bY = P(() => re([Le((e10) => e10 === "." ? "./" : e10, or()).describe("Path to the plugin root, relative to the marketplace root (the directory containing .claude-plugin/, not .claude-plugin/ itself)"), O({ source: N("npm"), package: lY().or(h().refine((e10) => /^(?:file|https?|git(?:\+https?|\+ssh)?|ssh|github|gitlab|bitbucket):/i.test(e10) || !e10.includes(".."), 'Package reference cannot contain ".." path segments')).describe("Package name (or url, or local path, or anything else that can be passed to `npm` as a package)"), version: h().optional().describe("Specific version or version range (e.g., ^1.0.0, ~2.1.0)"), registry: h().url().refine(Uw, "Registry must be an http(s) URL").optional().describe("Custom NPM registry URL (defaults to using system default, likely npmjs.org)") }).describe("NPM package as plugin source"), O({ source: N("url"), url: h().describe("Full git repository URL (https:// or git@)"), ref: h().optional().describe('Git branch or tag to use (e.g., "main", "v1.0.0"). Defaults to repository default branch.'), sha: Pw().optional().describe("Specific commit SHA to use") }), O({ source: N("github"), repo: h().describe("GitHub repository in owner/repo format"), ref: h().optional().describe('Git branch or tag to use (e.g., "main", "v1.0.0"). Defaults to repository default branch.'), sha: Pw().optional().describe("Specific commit SHA to use") }), O({ source: N("git-subdir"), url: h().describe("Git repository: GitHub owner/repo shorthand, https://, or git@ URL"), path: h().min(1).describe('Subdirectory within the repo containing the plugin (e.g., "tools/claude-plugin"). Checked out sparsely — over https or ssh as a partial clone (--filter=tree:0) — to minimize bandwidth for monorepos.'), ref: h().optional().describe('Git branch or tag to use (e.g., "main", "v1.0.0"). Defaults to repository default branch.'), sha: Pw().optional().describe("Specific commit SHA to use") }).describe("Plugin located in a subdirectory of a larger repository (monorepo). Only the specified subdirectory is materialized; the rest of the repo is not downloaded."), R2e(), O({ source: N("command"), command: h().min(1).max(Nw, { message: "command must not be longer than the install consent UI can display" }).refine((e10) => !Kq.test(e10), { message: "command must be printable ASCII (letters, digits, punctuation, single spaces) with no runs of 4 or more spaces" }).describe("Shell command that prints the absolute path of the plugin directory on stdout (exactly one line) and exits 0. It must leave a complete plugin in that directory before exiting; the directory is copied into the plugin cache, so the printed path may change between runs (it is re-resolved on every install and update, and once per session in the background). Runs through the platform shell (sh on macOS/Linux, cmd.exe on Windows) from the user's home directory with Claude Code's subprocess environment."), timeout: q().int().positive().max(Iq).optional().describe("Seconds to wait for the command before giving up (default: 60)"), mode: B(["copy", "link"]).optional().describe("copy (default): the printed directory is copied into the plugin cache and content-hashed, so it may be deleted afterwards. link: the cache entry links to the printed directory in place (no copy, no size limit; macOS/Linux) — for large exports; the directory must then stay valid while Claude Code runs, and a different printed path is what signals new content.") }).describe("Plugin directory produced by a locally installed tool (e.g. an IDE that renders its plugin for the currently selected SDK). Claude Code runs the command, copies the directory it prints, and re-runs it in the background at startup to pick up changes."), O({ source: N("unsupported"), error: h().optional() }).describe("Placeholder for source types this Claude Code version does not recognize, or a known type whose fields failed validation (then `error` holds the reason). Never authored by hand — PluginMarketplaceSchema rewrites unparseable sources to this so the entry remains in marketplace.plugins (detectDelistedPlugins must not see it as removed). Install attempts fail at cachePlugin with an actionable message.")])), O2e = P(() => O({ name: J_().describe("Plugin name as it appears in the target repository"), source: bY().describe("Where to fetch the plugin from. Must be a remote source — relative paths have no marketplace repository to resolve against. Under allowManagedPermissionRulesOnly, a settings marketplace keeps its plugins' allowed-tools only when every npm entry here pins a `registry` on a bare package name; unpinned, the package resolves through the member's own npm config, and a non-bare spelling (an `npm:` alias, a `name@range`, a URL or git spec) packs as an exotic spec the pin does not bind — either way the marketplace vouches no tool grants."), description: h().optional(), version: h().optional(), strict: x().optional(), headers: W(h(), h()).optional().describe("HTTP headers sent when downloading this entry's `archive` source."), headersHelper: Fw().optional().describe("Command that prints a JSON object of HTTP headers for downloading this entry's `archive` source. Runs only when a user explicitly installs or updates this plugin. Unlike a catalog entry, an entry written here does not need `strict: false`: it is declared in a settings file, which has no manifest fields to inline. A declaration in project settings is not operator-authored, so request-routing and client-identity header names are still filtered there. Use an absolute path.") }).refine((e10) => typeof e10.source !== "string", { message: 'Plugins in a settings-sourced marketplace must use remote sources (github, git-subdir, npm, url, archive, command). Relative-path sources like "./foo" have no marketplace repository to resolve against.' }).refine((e10) => typeof e10.source === "string" || e10.source.source !== "unsupported", { message: "source.source: 'unsupported' is a parse-time placeholder and cannot be authored. Use a remote source (github, git-subdir, npm, url, archive, command)." }));
var T2e = P(() => O({ cli: k(h().max(64)).max(10).optional().describe('First command tokens (e.g. ["stripe"]) — exact match against commands run this session.'), hosts: k(h().max(128)).max(20).optional().describe('Hostnames (e.g. ["api.stripe.com"]) — exact, case-insensitive match against hostnames seen in https?:// URLs in bash commands run this session. Bare hostname only: lowercase, no scheme, no port, no path.'), filesRead: k(h().max(256)).max(10).optional().describe('Glob patterns (e.g. ["**/*.tf"]) — the plugin is relevant when a file Claude has read this session matches any pattern. Matched against read-file paths, forward-slash normalized, case-insensitive.'), manifestDeps: k(O({ file: h().max(256), pattern: h().max(256) })).max(10).optional().describe("Dependency declared in a package manifest. Each {file, pattern} is a pair of RegExp sources: `file` matches the manifest filename (package.json, go.mod, requirements.txt, …); `pattern` matches the dependency declaration inside that file. Evaluated against files read this session."), cwd: k(h().max(256)).max(10).optional().describe(`Glob patterns (e.g. ["Engine/Source/Runtime/Renderer/**"]) — the plugin is relevant when the session's working directory is at or under a directory matching the pattern. Matched against the cwd both relative to the enclosing git repo root and as an absolute path, forward-slash normalized, case-insensitive. A bare directory (no glob characters) means "cwd is at or under this directory". Known at session start, so this signal can surface a suggestion before the first turn.`) })), w2e = P(() => O({ topic: h().max(64).optional().describe('What the user is working with when this plugin is relevant — fills "Working with {topic}?". Often the product name (e.g. "Stripe"); use a domain (e.g. "design") when the plugin name does not read naturally as a topic. Defaults to the plugin name with each hyphen-segment capitalized.'), signals: T2e().optional().describe("Matchers that determine when the plugin is relevant.") })), x2e = P(() => p2e().partial().extend({ name: J_().describe("Unique identifier matching the plugin name"), source: bY().describe("Where to fetch the plugin from"), headers: W(h(), h()).optional().describe("Custom HTTP headers for fetching this plugin's archive; overrides the marketplace's"), headersHelper: Fw().optional().describe("Command that prints a JSON object of HTTP headers for fetching this plugin's archive (e.g. a short-lived auth token); overrides this entry's `headers` and the marketplace's. Runs only when the user installs or updates this plugin, never during catalog browse. An entry that sets it must be `strict: false` with its manifest inlined here, so consent is informed from the entry alone before the command runs."), category: h().optional().describe('Category for organizing plugins (e.g., "productivity", "development")'), tags: k(h()).optional().describe("Tags for searchability and discovery"), strict: x().optional().default(true).describe("Require the plugin manifest to be present in the plugin folder. If false, the marketplace entry provides the manifest."), relevance: Le((e10) => se(e10) ? e10 : void 0, w2e().optional()).describe(`Declares when this plugin is relevant to the user's work. Consumed by the spinner tip ("Working with {topic}?"), session-start auto-suggest, and marketplace browse ranking.`) })), v2e = P(() => O({ name: J_() }));
function k2e(e10) {
  let t = x2e();
  return e10.flatMap((n, r) => {
    let o = t.safeParse(n);
    if (o.success) {
      let a = o.data.source;
      if (typeof a === "object" && a.source === "unsupported" && a.error !== void 0) return [{ ...o.data, source: { source: "unsupported" } }];
      return [o.data];
    }
    let s = v2e().safeParse(n).data?.name, i = o.error.issues.map((a) => `${a.path.join(".")}: ${a.message}`).join(", ");
    if (s) {
      K(`Stubbing unparseable marketplace plugin entry (${s}): ${i}`, { level: "warn" });
      let a = CY(se(n) ? n.source : void 0) ? U2e : Zw(n) ? void 0 : I2e(o.error.issues) ?? Q_(o.error.issues);
      return [{ name: s, source: { source: "unsupported", ...a && { error: a } }, strict: true }];
    }
    return K(`Dropping unparseable marketplace plugin entry (index ${r}): ${i}`, { level: "warn" }), [];
  });
}
var P2e = /* @__PURE__ */ new Set(["npm", "url", "github", "git-subdir", "archive", "command", "unsupported"]);
function Zw(e10) {
  if (!e10 || typeof e10 !== "object") return false;
  let t = e10.source;
  if (!t || typeof t !== "object") return false;
  let n = t.source;
  return typeof n === "string" && !P2e.has(n);
}
function I2e(e10) {
  let t = e10.find((r) => r.path.length === 1 && r.path[0] === "source");
  if (!t || t.code !== "invalid_union") return;
  let n = t.errors.find((r) => !r.some((o) => o.path.length === 0 || o.code === "invalid_value" && o.path[0] === "source"));
  if (!n || n.length === 0) return;
  return Q_(n.map((r) => ({ ...r, path: ["source", ...r.path] })));
}
var D2e = /^[A-Za-z0-9_$.-]{1,40}$/;
function Ro(e10) {
  return D2e.test(e10) ? e10 : "<key>";
}
var L2e = 3, M2e = 160;
function Q_(e10) {
  let t = e10.slice(0, L2e).map((r) => {
    let o = r.path.map(String).map((i) => Ro(i)).join("."), s = r.code === "unrecognized_keys" ? `Unrecognized ${r.keys.length === 1 ? "field" : "fields"}: ${r.keys.map(Ro).join(", ")}` : dw(r.message, M2e);
    return o ? `${o}: ${s}` : s;
  }), n = e10.length - t.length;
  return n > 0 ? `${t.join(", ")} (+${n} more)` : t.join(", ");
}
var N2e = /^[A-Za-z0-9][-A-Za-z0-9._]*$/, U2e = 'Bare source names resolve under metadata.pluginRoot, which this marketplace does not set (or sets to a path outside the marketplace root). Use a "./relative/path" source, or set metadata.pluginRoot to allow bare names.';
function CY(e10) {
  return typeof e10 === "string" && N2e.test(e10) && !e10.includes("..");
}
function F2e(e10) {
  if (typeof e10 !== "string" || e10 === "" || e10.startsWith("/") || e10.includes("\\") || e10.includes(":")) return;
  let t = e10.replace(/^\.\//, "").replace(/\/+$/, "");
  if (t === "" || t === ".") return ".";
  if (t.split("/").some((n) => n === "" || n === "." || n === "..")) return;
  return t;
}
function $2e(e10, t) {
  if (t === void 0 || !se(e10) || !CY(e10.source)) return e10;
  let n = t === "." ? `./${e10.source}` : `./${t}/${e10.source}`;
  return { ...e10, source: n };
}
function z2e(e10) {
  if (!se(e10) || !Array.isArray(e10.plugins)) return e10;
  let t = se(e10.metadata) ? F2e(e10.metadata.pluginRoot) : void 0;
  if (t === void 0) return e10;
  return { ...e10, plugins: e10.plugins.map((n) => $2e(n, t)) };
}
var H2e = P(() => O({ $schema: h().optional().describe("JSON Schema reference for editor autocomplete/validation; ignored at load time"), name: VVe(Zq), version: h().optional().describe("Marketplace manifest version"), description: h().optional().describe("Human-readable description of this marketplace"), owner: Bw().describe("Marketplace maintainer or curator information"), plugins: k(fe()).transform(k2e).describe("Collection of available plugins in this marketplace"), forceRemoveDeletedPlugins: x().optional().describe("When true, plugins removed from this marketplace will be automatically uninstalled and flagged for users"), metadata: O({ pluginRoot: h().optional().describe('Base directory for bare plugin source names, relative to the marketplace root (e.g. "./plugins" resolves "source": "formatter" as ./plugins/formatter). Sources that already start with "./" are unaffected.'), version: h().optional().describe("Marketplace version"), description: h().optional().describe("Marketplace description") }).optional().describe("Optional marketplace metadata"), allowCrossMarketplaceDependenciesOn: k(h()).optional().describe("Marketplace names whose plugins may be auto-installed as dependencies. Only the root marketplace's allowlist applies — no transitive trust."), renames: W(h(), h().nullable()).optional().catch(void 0).describe("Append-only map of old plugin name → current name (or null when removed). The loader follows this on plugin-not-found and migrates user settings to the new name.") }));
P(() => Le(z2e, H2e()));
var Lw = "[A-Za-z0-9][-A-Za-z0-9._]*";
var j2e = new RegExp(`^${Lw}@${Lw}$`), $q = `@${Hw}`;
function AY(e10) {
  return e10.endsWith($q) && Vw(e10.slice(0, -$q.length));
}
var kc = P(() => h().refine((e10) => j2e.test(e10) || AY(e10), "Plugin ID must be in format: plugin@marketplace")), RY = /[\p{Cc}\u200E\u200F\u202A-\u202E\u2066-\u2069]/u, B2e = /^[A-Za-z0-9][-A-Za-z0-9._]*(@[A-Za-z0-9][-A-Za-z0-9._]*)?(@\^[^@]*)?$/, K2e = P(() => re([h().regex(B2e, "Dependency must be a plugin name, optionally qualified with @marketplace").transform((e10) => e10.replace(/@\^[^@]*$/, "")), O({ name: h().min(1).regex(/^[A-Za-z0-9][-A-Za-z0-9._]*$/), marketplace: h().min(1).regex(/^[A-Za-z0-9][-A-Za-z0-9._]*$/).optional() }).loose().transform((e10) => e10.marketplace ? `${e10.name}@${e10.marketplace}` : e10.name)])), G2e = P(() => O({ version: h().describe("Currently installed version"), installedAt: h().describe("ISO 8601 timestamp of installation"), lastUpdated: h().optional().describe("ISO 8601 timestamp of last update"), installPath: h().describe("Absolute path to the installed plugin directory"), gitCommitSha: h().optional().describe("Git commit SHA for git-based plugins (for version tracking)"), resolvedVersion: h().optional().describe("Tag-derived semver this install resolved to (when fetched via a version constraint). Used by verifyAndDemote in preference to manifest.version, since the upstream may have forgotten to bump plugin.json."), auto: x().optional().describe("True when this plugin was pulled in as a dependency rather than installed explicitly. Auto-installed plugins are eligible for removal by the orphan sweep when nothing depends on them. Absent = manual (preserves pre-flag installs)."), ...zq(), ...Hq(), ...Bq(), ...jq() }));
P(() => O({ version: N(1).describe("Schema version 1"), plugins: W(kc(), G2e()).describe("Map of plugin IDs to their installation metadata") }));
var W2e = P(() => B(["managed", "user", "project", "local"])), V2e = P(() => O({ scope: W2e().describe("Installation scope"), projectPath: h().optional().describe("Project path (required for project/local scopes)"), installPath: h().describe("Absolute path to the versioned plugin directory"), version: h().optional().describe("Currently installed version"), installedAt: h().optional().describe("ISO 8601 timestamp of installation"), lastUpdated: h().optional().describe("ISO 8601 timestamp of last update"), gitCommitSha: h().optional().describe("Git commit SHA for git-based plugins"), resolvedVersion: h().optional().describe("Tag-derived semver this install resolved to"), auto: x().optional().describe("True when pulled in as a dependency. Eligible for orphan sweep."), ...zq(), ...Hq(), ...Bq(), ...jq() }));
P(() => O({ version: N(2).describe("Schema version 2"), plugins: W(kc(), k(V2e())).describe("Map of plugin IDs to arrays of installation entries") }));
P(() => O({ version: N(2), plugins: W(h(), fe()) }));
var q2e = P(() => O({ source: b2e().describe("Where to fetch the marketplace from"), installLocation: h().describe("Local cache path where marketplace manifest is stored"), lastUpdated: h().describe("ISO 8601 timestamp of last marketplace refresh"), autoUpdate: x().optional().describe("Whether to automatically update this marketplace and its installed plugins on startup") }));
P(() => W(h(), q2e()));
var ey = ["aspell", "hunspell", "ispell"];
var Ic = 2147483647;
var Y2e = ["autoMode", "deepLink", "voice", "briefView", "screenReader"], Z2e = {}, Xw = { autoMode: { buildGate: () => true, shape: () => ({ skipAutoPermissionPrompt: x().optional().describe("Whether the user has accepted the auto mode opt-in dialog"), useAutoModeDuringPlan: x().optional().describe("Whether plan mode uses auto mode semantics when auto mode is available (default: true)"), autoMode: O({ allow: k(h()).optional().describe('Rules for the auto mode classifier allow section. Include the literal string "$defaults" to inherit the built-in rules at that position.'), soft_deny: k(h()).optional().describe('Rules for the auto mode classifier SOFT BLOCK section — destructive/irreversible actions that user intent can clear. Include the literal string "$defaults" to inherit the built-in rules at that position.'), hard_deny: k(h()).optional().describe('Rules for the auto mode classifier HARD BLOCK section — security boundaries that user intent does NOT clear. Include the literal string "$defaults" to inherit the built-in rules at that position.'), ...false, ...{}, environment: k(h()).optional().describe('Entries for the auto mode classifier environment section. Include the literal string "$defaults" to inherit the built-in entries at that position.'), classifyAllShell: x().optional().describe("When true, every Bash/PowerShell allow rule is suspended while auto mode is active so all shell commands are routed through the classifier (higher safety, more classifier calls). Default: false.") }).optional().describe("Auto mode classifier prompt customization") }), permissionModes: () => [] }, deepLink: { buildGate: () => true, shape: () => ({ disableDeepLinkRegistration: B(["disable"]).optional().describe("Prevent claude-cli:// protocol handler registration with the OS") }) }, voice: { buildGate: () => true, shape: () => ({ voiceEnabled: x().optional().describe("Enable voice mode (hold-to-talk dictation)") }) }, briefView: { buildGate: () => true, shape: () => ({ defaultView: B(["chat", "transcript"]).optional().describe("Default transcript view: chat (SendUserMessage checkpoints only) or transcript (full)") }) }, screenReader: { buildGate: () => false, shape: () => Z2e } };
function Dc() {
  return Y2e.filter((e10) => Xw[e10].buildGate());
}
function OY(e10) {
  let t = {};
  for (let n of e10) t = { ...t, ...Xw[n].shape() };
  return t;
}
function Qw(e10) {
  let t = [];
  for (let n of e10) t.push(...Xw[n].permissionModes?.() ?? []);
  return t;
}
function TY(e10) {
  return e10.match(/^(.+):\*$/)?.[1] ?? null;
}
function wY(e10) {
  let t = e10.trimEnd();
  if (!t.endsWith("*")) return false;
  let n = 0, r = t.length - 2;
  while (r >= 0 && t[r] === "\\") n++, r--;
  return n % 2 === 0;
}
var ty = { filePatternTools: ["Read", "Write", "Edit", "Glob", "NotebookRead", "NotebookEdit", "Cd"], bashPrefixTools: ["Bash"], customValidation: { WebSearch: (e10) => {
  if (e10.includes("*") || e10.includes("?")) return { valid: false, error: "WebSearch does not support wildcards", suggestion: "Use exact search terms without * or ?", examples: ["WebSearch(claude ai)", "WebSearch(typescript tutorial)"] };
  return { valid: true };
}, WebFetch: (e10) => {
  if (e10.includes("://") || e10.startsWith("http")) return { valid: false, error: "WebFetch permissions use domain format, not URLs", suggestion: 'Use "domain:hostname" format', examples: ["WebFetch(domain:example.com)", "WebFetch(domain:github.com)"] };
  if (!e10.startsWith("domain:")) return { valid: false, error: 'WebFetch permissions must use "domain:" prefix', suggestion: 'Use "domain:hostname" format', examples: ["WebFetch(domain:example.com)", "WebFetch(domain:*.google.com)"] };
  return { valid: true };
} } };
function ex(e10) {
  return ty.filePatternTools.includes(e10);
}
function xY(e10) {
  return ty.bashPrefixTools.includes(e10);
}
function vY(e10) {
  return Object.hasOwn(ty.customValidation, e10) ? ty.customValidation[e10] : void 0;
}
function IY(e10, t) {
  let n = 0, r = t - 1;
  while (r >= 0 && e10[r] === "\\") n++, r--;
  return n % 2 !== 0;
}
function kY(e10, t) {
  let n = 0;
  for (let r = 0; r < e10.length; r++) if (e10[r] === t && !IY(e10, r)) n++;
  return n;
}
var J2e = /(?:^|[^\\])\\[()]/;
function X2e(e10) {
  return J2e.test(e10) && kY(e10, "(") !== kY(e10, ")");
}
var Q2e = /^(?:[|&;<>]|\d+[<>])/;
function eqe(e10) {
  return Q2e.test(e10);
}
function tx(e10) {
  for (let t = 0; t < e10.length; t++) if (e10[t] === "*" && !IY(e10, t)) return true;
  return false;
}
function tqe(e10) {
  if (e10.endsWith(":*")) return;
  let t = e10.trim().split(/\s+/).filter(Boolean), n = t[0];
  if (t.length < 3 || n === void 0 || tx(n)) return;
  let r = false;
  for (let o of t.slice(1)) {
    if (eqe(o)) return;
    if (tx(o)) {
      r = true;
      continue;
    }
    if (o.startsWith("-")) continue;
    return r ? n : void 0;
  }
  return;
}
function PY(e10) {
  if (!wp(e10)) return null;
  let t = wc(e10);
  if (t && !wp(t.serverName)) return null;
  return { valid: false, error: `Wildcard tool name "${e10}" is not supported in allow rules`, suggestion: "An allow pattern must name the scope it widens — globs are permitted only in the tool position after a literal mcp__<server>__ prefix. Deny and ask rules accept wildcards anywhere", examples: ["mcp__puppeteer__*", "mcp__github__get_*"] };
}
function nx(e10, t) {
  if (!e10 || e10.trim() === "") return { valid: false, error: "Permission rule cannot be empty" };
  let n = fw(e10);
  if (n.kind === "malformed") return { valid: false, error: "Malformed Tool(content) rule", suggestion: 'Rules take the form Tool or Tool(content) and must end at the closing ")"; parentheses inside the content are literal' };
  if (n.kind === "call" && n.rawContent === "") {
    if (!n.toolName) return { valid: false, error: "Empty parentheses with no tool name", suggestion: "Specify a tool name before the parentheses" };
    return { valid: false, error: "Empty parentheses", suggestion: `Either specify a pattern or use just "${n.toolName}" without parentheses`, examples: [`${n.toolName}`, `${n.toolName}(some-pattern)`] };
  }
  let r = Q2(e10), o = wc(r.toolName);
  if (o) {
    if (n.kind === "call") {
      let i = o.toolName && !wp(o.toolName) ? `${r.toolName}__*` : void 0;
      return { valid: false, error: "MCP rules do not support patterns in parentheses", suggestion: i === void 0 ? `Use "${r.toolName}" without parentheses, or use "mcp__${o.serverName}__*" for all tools` : `Use "${r.toolName}" without parentheses. For all tools of a server, use "mcp__${o.serverName}__*" for the server "${o.serverName}", or "${i}" for a server named "${o.serverName}__${o.toolName}"`, examples: [`mcp__${o.serverName}`, `mcp__${o.serverName}__*`, o.toolName && o.toolName !== "*" ? `mcp__${o.serverName}__${o.toolName}` : void 0, i].filter(Boolean) };
    }
    if (t === "allow") {
      let i = PY(r.toolName);
      if (i) return i;
    }
    return { valid: true };
  }
  if (!r.toolName || r.toolName.length === 0) return { valid: false, error: "Tool name cannot be empty" };
  if (t === "allow") {
    let i = PY(r.toolName);
    if (i) return i;
  }
  if (!r.toolName.includes("_") && r.toolName[0] !== r.toolName[0]?.toUpperCase()) return { valid: false, error: "Tool names must start with uppercase", suggestion: `Use "${_u(String(r.toolName))}"` };
  if (n.kind === "call" && X2e(n.rawContent)) {
    let i = ex(r.toolName);
    return { valid: false, error: 'Ambiguous "\\(" or "\\)" beside an unescaped parenthesis', suggestion: i ? "Write a Windows path with forward slashes, or spell a literal parenthesis as [(] or [)]" : 'Double a backslash that is a path separator ("\\\\("), and escape literal parentheses in pairs', examples: i ? [`${r.toolName}(C:/Projects/(drafts)/**)`, `${r.toolName}(C:\\Projects\\[(]drafts)\\**)`] : [`${r.toolName}(C:\\tools\\\\(x86)\\run.exe *)`] };
  }
  let s = vY(r.toolName);
  if (s && r.ruleContent !== void 0) {
    let i = s(r.ruleContent);
    if (!i.valid) return i;
  }
  if (xY(r.toolName) && r.ruleContent !== void 0) {
    let i = r.ruleContent;
    if (i === ":*") return { valid: false, error: "Prefix cannot be empty before :*", suggestion: "Specify a command prefix before :*", examples: ["Bash(npm *)", "Bash(git *)"] };
    if (t === "allow") {
      let l = tqe(i);
      if (l !== void 0) {
        let c = l === "git", d = c ? " For git, options such as -c and --exec-path can run arbitrary commands." : "", p = c ? " (for example Bash(git status *))" : "";
        return { valid: true, warning: `${rr(r)} has a wildcard before the rest of the command, so it also matches any options inserted at that position and approves them without a prompt.${d} Replace that * with the exact value you mean, or only use * after the subcommand${p}.`, securityNotice: `${rr(r)} allows any option at its * · use an exact value` };
      }
    }
    let a = TY(i)?.trimEnd();
    if (a !== void 0) {
      if (tx(a)) {
        let l = wY(a), c = l ? "matches only commands containing a literal * at that position" : "will likely never match", d = l ? a : `${a}*`, p = t === "allow" ? " Replace that * with the exact value you mean." : d.endsWith(":*") ? "" : ` Use ${rr({ toolName: r.toolName, ruleContent: d })} for wildcard matching.`;
        return { valid: true, warning: `${rr(r)} mixes * with the trailing :* prefix syntax, so it is matched as a literal prefix (the * is not expanded) and ${c}.${p}`, ...t !== "allow" && { securityNotice: `${rr(r)} reads its * literally${d.endsWith(":*") ? "" : ` · use ${rr({ toolName: r.toolName, ruleContent: d })}`}` } };
      }
    } else if (i.includes(":*") && !i.endsWith(":*")) {
      let l = t === "allow" ? "Replace that :* with the exact value you mean." : "It already matches as a * wildcard; moving :* to the end would make it a literal prefix and change which commands match.";
      return { valid: true, warning: `${rr(r)} has a :* that is not at the end, so it is matched as a * wildcard (the : is literal), not as the trailing :* prefix syntax. ${l}`, ...t === "allow" && { securityNotice: `${rr(r)} reads its :* as a wildcard · use an exact value` } };
    }
  }
  if (ex(r.toolName) && r.ruleContent !== void 0) {
    if (r.ruleContent.includes(":*")) return { valid: false, error: 'The ":*" syntax is only for Bash prefix rules', suggestion: 'Use glob patterns like "*" or "**" for file matching', examples: [`${r.toolName}(*.ts) - matches .ts files`, `${r.toolName}(src/**) - matches all files in src`, `${r.toolName}(**/*.test.ts) - matches test files`] };
  }
  if (r.ruleContent !== void 0) {
    let i = r.toolName === "Write" || r.toolName === "NotebookEdit" || r.toolName === "MultiEdit" ? "Edit" : r.toolName === "Glob" ? "Read" : void 0;
    if (i !== void 0 && !r.ruleContent.includes(":*")) return { valid: true, warning: `${rr(r)} is not matched by file permission checks — only ${i}(path) rules are. Use ${rr({ toolName: i, ruleContent: r.ruleContent })} instead (${i} rules cover all file-${i === "Edit" ? "editing" : "reading"} tools).`, ...t !== "allow" && { securityNotice: `${rr(r)} never matches · use ${rr({ toolName: i, ruleContent: r.ruleContent })}` } };
  }
  return { valid: true };
}
var rx = P(() => LY()), DY = P(() => LY("allow"));
function LY(e10) {
  return h().superRefine((t, n) => {
    let r = nx(t, e10);
    if (!r.valid) {
      let o = r.error;
      if (r.suggestion) o += `. ${r.suggestion}`;
      if (r.examples && r.examples.length > 0) o += `. Examples: ${r.examples.join(", ")}`;
      n.addIssue({ code: dr.custom, message: o, params: { received: t } });
    }
  });
}
var Up = ["accept", "hold", "refuse"], iy = ["off", "basic", "full"], nqe = P(() => W(h(), iOe()));
function VY(e10) {
  return O({ allow: k(DY()).optional().describe("List of permission rules for allowed operations"), deny: k(rx()).optional().describe("List of permission rules for denied operations"), ask: k(rx()).optional().describe("List of permission rules that should always prompt for confirmation"), defaultMode: Le(Tc, B([...ha, ...Qw(e10)])).optional().describe("Default permission mode when Claude Code needs access ('manual' is accepted as an alias for 'default')"), disableBypassPermissionsMode: B(["disable"]).optional().describe("Disable the ability to bypass permission prompts"), blockReadsOutsideWorkingDirectories: x().optional().describe('Refuse file-tool reads (Read, Grep, Glob, LSP) outside the working directories in every permission mode; true in any settings source wins. No allow rule lifts it. Also set when the user picks "block" on the one-time auto-mode prompt for a read outside the working directories.'), blockWritesOutsideWorkingDirectories: x().optional().describe("Refuse file-tool writes (Write, Edit, NotebookEdit) outside the working directories in every permission mode; true in any settings source wins. No allow rule lifts it. Files that Claude Code keeps for the session are not refused: its plan files, scratchpad and background job folder, and the auto-memory of this project, unless the CLAUDE_COWORK_MEMORY_PATH_OVERRIDE environment variable or a repository settings file points it elsewhere. Nothing runs them unless the model asks. Also refuses file-tool writes to Claude Code settings files, inside the working directories too, and takes EnterWorktree and ExitWorktree, which move the working directory, out of the tools on offer. Does not limit shell commands, MCP tools, the programs that hooks run, or the memory tools. Cloud sessions (Claude Code on the web), whose file tools run in a container that is itself the boundary, may not apply it."), disableAutoMode: B(["disable"]).optional().describe("Disable auto mode"), additionalDirectories: k(h()).optional().describe("Additional directories to include in the permission scope") }).passthrough();
}
P(() => VY(Dc()));
var rqe = P(() => re([h(), O({}).passthrough().describe('{ id: stable id (letters, digits, ".", "_", "-"; max 64), text: the tip (max 500 characters, one line), cooldownSessions?: sessions to wait before showing it again (default 0), priority?: tie-break weight among never-shown tips (default 0) }')])), oqe = P(() => Le((e10) => Array.isArray(e10) ? e10.filter((t) => typeof t === "string" || !!t && typeof t === "object" && !Array.isArray(t)) : [], k(rqe()))), lx = P(() => O({ source: Dp().describe("Where to fetch the marketplace from"), installLocation: h().optional().describe("Local cache path where marketplace manifest is stored (auto-generated if not provided)"), autoUpdate: x().optional().describe("Whether to automatically update this marketplace and its installed plugins on startup"), pluginDigests: W(h(), k(h()).catch([])).optional().catch(void 0).describe('Managed settings only: the plugins of this marketplace that an organization delivers with its own tier, by plugin name, each with the digests of its releases. A plugin also enabled and listed in prependPlugins or appendPlugins by managed settings the session vouches for loads its hooks module only from a folder that proves one of them, and is then seated in that tier; any other copy does not load. A digest is sha256- and the base64 SHA-256 of, for every regular file in the folder in UTF-16 code unit order of its path, not normalized, "f PATH" NUL BYTE-LENGTH NUL BYTES, with / in paths; .git, .in_use, .orphaned_at, .claude-plugin-link and .links_materialized at the root are left out. The plugin keeps its manifest at .claude-plugin/plugin.json and names one module in hooks/hooks.json. A string of any other form, or a list that is empty or of any other shape, matches no folder. A symbolic link, or a surface module, proves nothing. A proved plugin ships bundled with no install step: the digest covers the whole folder, node_modules included. A checkout whose line endings were converted proves nothing.') })), cx = P(() => {
  let e10 = () => q().min(0).max(1e4);
  return O({ input: e10(), output: e10(), cacheRead: e10(), cacheWrite: e10() });
}), ux = P(() => q().gt(0).lte(10).optional()), dx = P(() => O({ model: h().describe('Model to select, taken verbatim: an alias ("opus"), an Anthropic model ID, or a provider-format ID (Vertex, Bedrock, gateway). Same values --model accepts.'), label: h().optional().describe("Row title. Defaults to the model name."), description: h().optional().describe("Row subtitle. Defaults to a generic description."), behavesAs: h().optional().describe(`For a model this version of Claude Code does not know: the ID of a model it does know (e.g. "claude-opus-4-8") whose client-side handling — prompt profile, capability and effort defaults — applies to it. Changes neither the row's label nor the model ID sent. Without it, a model-catalog row for a model this version does not know is not offered until Claude Code is updated.`) })), ay = P(() => O({ serverName: h().regex(/^[a-zA-Z0-9_-]+$/, "Server name can only contain letters, numbers, hyphens, and underscores").optional().describe("Name of the MCP server that users are allowed to configure"), serverCommand: k(h()).min(1, "Server command must have at least one element (the command)").optional().describe("Command array [command, ...args] to match exactly for allowed stdio servers"), serverUrl: h().optional().describe('URL pattern with wildcard support (e.g., "https://*.example.com/*") for allowed remote MCP servers') }).refine((e10) => Na([e10.serverName !== void 0, e10.serverCommand !== void 0, e10.serverUrl !== void 0], Boolean) === 1, { message: 'Entry must have exactly one of "serverName", "serverCommand", or "serverUrl"' })), ly = P(() => O({ serverName: h().min(1, "Server name must be non-empty").refine((e10) => e10.trim().length > 0, { message: "Server name must not be whitespace-only" }).refine((e10) => e10 === e10.trim(), { message: "Server name has leading or trailing whitespace and will never match (names are compared verbatim)" }).optional().describe("Name of the MCP server that is explicitly blocked"), serverCommand: k(h()).min(1, "Server command must have at least one element (the command)").optional().describe("Command array [command, ...args] to match exactly for blocked stdio servers"), serverUrl: h().optional().describe('URL pattern with wildcard support (e.g., "https://*.example.com/*") for blocked remote MCP servers') }).refine((e10) => Na([e10.serverName !== void 0, e10.serverCommand !== void 0, e10.serverUrl !== void 0], Boolean) === 1, { message: 'Entry must have exactly one of "serverName", "serverCommand", or "serverUrl"' })), qY = P(() => O({ marketplace: h(), plugin: h() }));
P(() => Le((e10) => {
  if (typeof e10 !== "string" || !kc().safeParse(e10).success) return e10;
  let t = e10.indexOf("@");
  return { marketplace: e10.slice(t + 1), plugin: e10.slice(0, t) };
}, qY()));
var iqe = new RegExp("[\\x00-\\x1f\\x7f-\\x9f\\u2028\\u2029]|\\p{DI}", "u");
function aqe(e10) {
  let t = e10.replaceAll("/", "\\");
  if (xo(t)) return false;
  return /^\\{2}[^\\]/.test(t);
}
function lqe(e10) {
  return vo(e10) || /^\/network\/servers(\/|$)/i.test(e10) || Ss(e10);
}
function cqe(e10) {
  return /^\/(proc|dev\/(fd|stdin|stdout|stderr))(\/|$)/i.test(e10);
}
function uqe(e10, t, n = {}) {
  if (t === "win32") {
    let r = e10.replaceAll("/", "\\");
    if (xo(r)) return false;
    let o = aqe(r);
    if (n.rejectUnc && o) return false;
    if (n.rejectDriveRelative) {
      if (!/^[A-Za-z]:\\/.test(r) && !o && /^(\\|[A-Za-z]:)/.test(r)) return false;
    }
    if (pn.win32.normalize(r) !== r) return false;
    let s = r.split("\\");
    if (s.some((a) => a === "." || a === "..")) return false;
    if (s.some((a, l) => /[. ]$/.test(a) || a.includes(":") && !(l === 0 && /^[A-Za-z]:$/.test(a)))) return false;
    let i = r.startsWith("\\\\") ? r.slice(2) : r;
    if (/\\{2}/.test(i)) return false;
    return !r.endsWith("\\") || /^([A-Za-z]:)?\\$/.test(r);
  }
  if (n.rejectNetworkRoot && lqe(e10)) return false;
  if (n.rejectMagicLinkRoot && cqe(e10)) return false;
  if (pn.posix.normalize(e10) !== e10) return false;
  if (e10.split("/").some((r) => r === "." || r === "..")) return false;
  if (/\/{2}/.test(e10)) return false;
  return !e10.endsWith("/") || e10 === "/";
}
var dqe = /\.(exe|ps1)$/i;
function pqe(e10) {
  return /\.ps1$/i.test(e10);
}
function fqe(e10) {
  return pqe(e10) && /[[\]`*?]/.test(e10);
}
var mqe = 'a .ps1 path must not contain "[", "]", "`", "*", or "?" on Windows (PowerShell resolves them as wildcard syntax)', gqe = () => h().describe("Absolute path to the helper executable"), Ri = (e10) => Le((t) => t === null ? void 0 : t, e10.optional()).optional(), hqe = Ic, MY = (e10) => q().int().min(e10).transform((t) => Math.min(t, hqe)), NY = ["path", "script", "defaultSettings"];
function YY(e10) {
  if (!e10 || typeof e10 !== "object" || Array.isArray(e10)) return false;
  let t = e10;
  return NY.some((n) => t[n] === null) && NY.every((n) => t[n] === null || t[n] === void 0);
}
var oy = P(() => O({ path: gqe(), timeoutMs: Ri(MY(1e3)), refreshIntervalMs: Ri(re([N(0), MY(6e4)])) })), ZY = () => B(["replace", "merge"]).describe("How the helper's managedSettings compose with the settings of the source that delivered this entry: 'replace' (default) — the output is the policy; 'merge' — the output is deep-merged over that source's own settings the way merged managed sources compose (helper scalars win, arrays union, objects merge — except fallbackModel, forceLoginOrgUUID, gatewayInternalNetworks, sandbox.filesystem.allowRead, sandbox.credentials.awsPairs, sandbox.ripgrep and the restriction allowlists such as allowedMcpServers, allowedProviders, availableModels and allowedHttpHookUrls, which are the helper's whole value when it emits one; tighten a permission with a deny), so a failed helper costs only the delta");
function JY(e10) {
  return e10 === "continue" || e10 === "refuse";
}
var _qe = () => Le((e10) => e10 === void 0 || JY(e10) ? e10 : "refuse", B(["continue", "refuse"]).describe(`What happens when this entry's helper fails at startup (bad path, missing file or interpreter, non-zero exit, timeout, oversize or invalid output) and no static settings payload (this entry's own, the linux entry's on WSL, or the map's "default") applies in its place: 'refuse' — Claude Code does not start, naming the failure; 'continue' — Claude Code starts without the helper's output, on the delivering source's own settings, with a /status notice. Default: 'refuse' when the entry comes from MDM or the managed settings file, 'continue' when it comes from remote managed settings. Any other value is treated as 'refuse', with a /status notice. The install and update commands start no session and are never refused over a remote entry: they report the refusal in /status. An entry whose other fields fail validation runs no helper; from MDM or the managed settings file, any value but 'continue' on it then refuses to start Claude Code until the entry is fixed, unless a static settings payload (the entry's own, kept when it validates, the linux entry's for a wsl one, or the map's "default") serves in its place. From remote, a non-interactive session runs the helper off settings verified this session without the interactive approval, so 'refuse' there too means the helper ran and failed; a launch whose remote settings could not be verified this session (offline, fetch failed) starts without the helper regardless; and a failure first reached after the session has started (settings verified or approved mid-session, which on a machine that only ever runs non-interactively is every launch) ends a session no person watches (non-interactive, a background session no client is attached to, or a teammate session) as the refused start would have, and leaves a watched interactive one (a terminal, with or without remote control, or an attached background session) running under a /status notice with its next start refused. Background refresh failures always keep the last good output whatever this says`)), yqe = 5, Sqe = () => q().int().min(0).transform((e10) => Math.min(e10, yqe)).describe("How many more times to run this entry's helper when a run fails to execute — it could not be launched, exited non-zero, or was stopped at timeoutMs — before that counts as a failure (a non-negative integer; default 0, a single attempt; above 5 is treated as 5). Attempts are separated by a short randomized backoff (from 250 ms, doubling per attempt, at most 4 s each) and each attempt gets the full timeoutMs, so a start that waits on the helper can wait up to (retries + 1) × timeoutMs plus the backoff. Output the helper did produce and that was refused — oversized, not a JSON object, an invalid envelope, or settings that fail validation — is not retried, and neither is an invalid path. Applies alike at startup and on each background refresh; only once the attempts are used up do the entry's failure rules (a static settings payload in its place, onFailure, the refresh notice) apply, naming the last attempt's failure"), Eqe = (e10) => (e10 === "windows" ? N("pwsh", { message: "interpreter must be 'pwsh' on windows ('sh' is not supported there)" }) : N("sh", { message: "interpreter must be 'sh' on macos/linux/wsl" })).describe("Fixed interpreter for `script`: 'sh' (/bin/sh) on macos/linux/wsl entries; 'pwsh' (PowerShell at its fixed install locations, never PATH) on the windows entry"), bqe = "exactly one of path/script must be configured", Cqe = '"script" and "interpreter" must be configured together', Aqe = "script must be ASCII-only on Windows (PowerShell decodes stdin with the console OEM code page); spell non-ASCII characters as escapes, e.g. [char]0x00E9", Rqe = (e10) => h({ message: "script must be a string" }).min(1, { message: "script must not be empty" }).max(65536, { message: "script must be at most 65536 characters" }).refine((t) => !t.includes("\0"), { message: "script must not contain NUL bytes" }).refine((t) => yu(t), { message: "script must be valid UTF-8 (no lone surrogates)" }).refine((t) => e10 !== "windows" || !/[\u0080-\uffff]/.test(t), { message: Aqe }).describe("Inline helper script, delivered to the fixed interpreter over stdin (never written to disk)");
var yn = ["macos", "linux", "windows", "wsl"];
function Oqe(e10) {
  return e10 === "windows" ? "win32" : "posix";
}
function Tqe(e10) {
  return { rejectDriveRelative: e10 === "windows", rejectUnc: e10 === "windows", rejectNetworkRoot: e10 !== "windows", rejectMagicLinkRoot: e10 !== "windows", requireWin32ExecutableSuffix: e10 === "windows" };
}
function wqe(e10) {
  let t = Oqe(e10), n = Tqe(e10);
  return h().max(1024, { message: "path must be at most 1024 characters" }).refine((r) => !iqe.test(r), { message: "path must not contain control, line/paragraph-separator, or invisible (default-ignorable) characters" }).refine((r) => (t === "win32" ? pn.win32 : pn.posix).isAbsolute(r), { message: "path must be absolute" }).refine((r) => !(t === "win32" && n.requireWin32ExecutableSuffix) || dqe.test(r), { message: "path must end in .exe or .ps1 on Windows" }).refine((r) => t !== "win32" || !fqe(r), { message: mqe }).refine((r) => uqe(r, t, n), { message: t === "win32" ? 'path must be in normalized form: no "." or ".." segments, no doubled or trailing separators, no component ending in "." or a space, no ":" outside the drive letter, no device-namespace (\\\\?\\) prefix, no drive-relative (\\dir or C:name) or UNC (\\\\server\\share) form' : 'path must be in normalized form: no "." or ".." segments, no doubled or trailing separators, and not under a network automount root (/net/<host>, /Network/Servers, or macOS /.vol /.file /.nofollow /.resolve) or a kernel magic-link root (/proc, /dev/fd)' }).describe("Absolute path to the helper executable");
}
var fx = [...yn, "default"], ox = ["path", "script", "interpreter", "outputBehavior", "onFailure", "retries", "timeoutMs", "refreshIntervalMs", "defaultSettings"], ry = ["managedSettings", "appendSystemPrompt"], Ca = P(() => W(h(), fe()).superRefine((e10, t) => {
  for (let n of ["policyHelper", "policyHelpers"]) if (e10[n] !== void 0 && e10[n] !== null) t.addIssue({ code: "custom", message: `must not contain "${n}" — the default payload is applied as managed settings and cannot configure further policy helpers` });
  for (let n of ox) if (e10[n] !== void 0 && e10[n] !== null) t.addIssue({ code: "custom", message: `must not contain "${n}" — a static payload is a managed-settings object, not a policyHelpers entry; entry fields (${ox.join("/")}) belong on the per-OS entries (policyHelpers.${yn.join("/")})` });
  for (let n of ry) if (e10[n] !== void 0 && e10[n] !== null) t.addIssue({ code: "custom", message: `must not contain "${n}" — a static payload is the managedSettings SUBTREE, not the helper's stdout envelope; paste the object your helper emits UNDER "managedSettings", not the envelope around it` });
  for (let n of fx) if (e10[n] !== void 0 && e10[n] !== null) t.addIssue({ code: "custom", message: `must not contain "${n}" — a static payload is the VALUE of a policyHelpers key (a managed-settings object), never another policyHelpers map; don't paste the map or its "${n}" line inside the slot` });
})), xqe = 'Entry must carry "path" (a helper executable) or "script" + "interpreter" (an inline helper), and/or "defaultSettings" (a static settings payload)';
function vqe(e10) {
  let { path: t, script: n, interpreter: r, defaultSettings: o } = e10;
  if (t !== void 0 && n !== void 0) return bqe;
  if (n === void 0 !== (r === void 0)) return Cqe;
  if (t === void 0 && n === void 0 && o === void 0) return xqe;
  return null;
}
function XY(e10, t) {
  return oy().omit({ path: true }).extend({ path: Ri(wqe(e10)), script: Ri(Rqe(e10)), interpreter: Ri(Eqe(e10)), outputBehavior: Ri(ZY()), onFailure: Ri(_qe()), retries: Ri(Sqe()), defaultSettings: Le((n) => n === null ? void 0 : n, t.optional()).optional() }).check((n) => {
    if (n.issues.length > 0) return;
    let r = vqe(n.value);
    if (r !== null) n.issues.push({ code: "custom", message: r, input: n.value });
  });
}
P(() => XY("linux", Ca()));
function sx(e10, t = Ca()) {
  return e10 === "default" ? Ca() : XY(e10, t);
}
var kqe = P(() => O(Object.fromEntries(fx.map((e10) => [e10, Le((t) => {
  if (t === null) return;
  if (e10 !== "default" && YY(t)) return;
  return t;
}, sx(e10).optional()).optional()])))), Np = ["skills", "agents", "hooks", "mcp"];
function QY(e10) {
  return Le((t) => {
    if (!Array.isArray(t)) return t;
    let n = t.filter((r) => Np.includes(r));
    if (n.length < t.length) ;
    return n;
  }, re([x(), k(B(Np))]));
}
function eZ() {
  return re([k(h()), x(), bR()]);
}
var FY = Object.freeze({ type: "invalid-entry-stripped" }), Pqe = P(() => re([O({ type: N("regex").describe('Config variant. This client understands "regex": matches turn output and builds a URL from named capture groups. Entries with other variants are preserved but skipped at runtime.'), pattern: h().describe("Regex matched against turn output (tool results and assistant text)"), url: h().describe("Link target. {name} placeholders are filled from named regex capture groups, e.g. (?<id>...) -> {id}. Values are URL-encoded; the origin must be literal in the template. The scheme must be https, http, or a recognized editor or workspace deep-link scheme: vscode, vscode-insiders, cursor, windsurf, zed, jetbrains, idea, slack, linear, notion, figma."), label: h().optional().describe("Badge text. {name} placeholders filled from named capture groups; defaults to the full match.") }).passthrough(), O({ type: h().describe("Config variant discriminator for entries this client does not understand; the entry is preserved as-is and skipped at runtime.") }).passthrough()])), $Y = () => q().int().min(V2).max(q2).optional().catch(void 0);
function tZ(e10, { strictPolicyHelperKeys: t = false } = {}) {
  function n(o) {
    return W(h(), lx()).check((s) => {
      for (let [i, a] of Object.entries(s.value)) if (a.source.source === "settings" && a.source.name !== i) s.issues.push({ code: "custom", input: a.source.name, path: [i, "source", "name"], message: `Settings-sourced marketplace name must match its ${o} key (got key "${i}" but source.name "${a.source.name}")` });
    });
  }
  let r = (o, s) => t ? Le((i) => {
    if (i === null) return;
    return s ? s(i) : i;
  }, o) : o.catch(void 0);
  return { $schema: () => h().optional().describe("JSON Schema reference for Claude Code settings"), apiKeyHelper: () => h().optional().describe("Path to a script that outputs authentication values"), proxyAuthHelper: () => h().optional().describe("Shell command that outputs a Proxy-Authorization header value (EAP)"), awsCredentialExport: () => h().optional().describe("Path to a script that exports AWS credentials"), awsAuthRefresh: () => h().optional().describe("Path to a script that refreshes AWS authentication"), gcpAuthRefresh: () => h().optional().describe("Command to refresh GCP authentication (e.g., gcloud auth application-default login)"), processWrapper: () => h().optional().describe("Corporate launcher argv prefix for the background-agent supervisor, the sessions and workers it hosts, and the other covered background processes listed in the Claude Code corporate-launcher documentation. Equivalent to the CLAUDE_CODE_PROCESS_WRAPPER environment variable, which takes precedence when set. Honored from managed settings, a --settings/SDK-supplied settings file, and user settings, in that precedence order; project and local settings are ignored."), policyHelper: () => r(oy().optional(), (o) => o && typeof o === "object" && !Array.isArray(o) && o.path === null ? void 0 : o).describe("Executable that computes managed settings at startup. Honored only from admin-controlled policy sources."), policyHelpers: () => r(kqe().optional()).describe(`@internal Per-OS variant of policyHelper, keyed by platform: macos, linux, windows, wsl, plus an optional "default" entry that is a STATIC settings payload (a JSON object of managed settings, not a helper). Each per-OS entry carries a helper — a "path", or an inline "script" + "interpreter" delivered to a fixed interpreter over stdin, either with timeoutMs/refreshIntervalMs — its own static "defaultSettings" payload, or both; an entry may be payload-only. Selection for a platform walks its chain (the platform's own entry; on wsl the linux entry next): the first helper on the chain wins over policyHelper; if no helper is configured — or the selected helper fails at startup or refresh — the first payload applies (the chain's "defaultSettings" in platform-specific-first order, then the top-level "default", applied with no process spawned; unrecognized platforms reach only "default"); with no payload either, policyHelper. Honored from admin-controlled policy sources, and from remote managed settings — a payload of plain policy as delivered, like any other remote key; a helper, or a payload carrying anything the managed-settings approval dialog lists, only once the settings are verified this session and approved there (policyHelper itself is never honored from remote).`), ...Pt.CLAUDE_CODE_ENABLE_XAA && { xaaIdp: () => O({ issuer: h().url().describe("IdP issuer URL for OIDC discovery"), clientId: h().describe("Claude Code's client_id registered at the IdP"), callbackPort: q().int().positive().optional().describe("Fixed loopback callback port for the IdP OIDC login. Only needed if the IdP does not honor RFC 8252 port-any matching.") }).optional().describe("XAA (SEP-990) IdP connection. Configure once; all XAA-enabled MCP servers reuse this.") }, fileSuggestion: () => O({ type: N("command"), command: h() }).optional().describe("Custom file suggestion configuration for @ mentions"), respectGitignore: () => x().optional().describe("Whether file picker should respect .gitignore files (default: true). Note: .ignore files are always respected."), breakReminder: () => O({ enabled: x().optional().describe("Show a friendly nudge after sustained continuous use (default false). Must be true for the reminder to fire."), intervalMinutes: q().int().positive().optional().describe("Minutes of continuous use before the reminder fires (default 30). Re-fires every interval until you take a break."), breakThresholdMinutes: q().int().positive().optional().describe("Minutes of inactivity that count as a break and reset the timer (default 10)"), message: h().optional().describe("Custom reminder text. Leave unset for a rotating set of friendly nudges.") }).optional().describe("@internal Opt-in break reminder. When enabled, shows a dismissible nudge after sustained continuous use. Never blocks — just a friendly heads-up."), quietHours: () => O({ enabled: x().optional().describe("Show a one-time nudge when you start or keep using the CLI inside your quiet-hours window (default false)."), start: h().regex(/^([01]?\d|2[0-3]):[0-5]\d$/, 'Expected 24-hour local time "HH:MM" (e.g. "22:00")').optional().describe('Start of the quiet-hours window, 24-hour local time "HH:MM".'), end: h().regex(/^([01]?\d|2[0-3]):[0-5]\d$/, 'Expected 24-hour local time "HH:MM" (e.g. "07:00")').optional().describe('End of the quiet-hours window, 24-hour local time "HH:MM". May be earlier than start for an overnight range.') }).optional().describe("@internal Opt-in quiet hours. When enabled, shows a single soft nudge per session while inside the configured local-time window. Never blocks."), cleanupPeriodDays: () => q().int().positive().optional().describe("Number of days to retain chat transcripts before automatic cleanup (default: 30). Minimum 1. Use a large value for long retention; use --no-session-persistence to disable transcript writes entirely."), desktopSessionCleanupPeriodDays: () => q().int().nonnegative().optional().describe("Retention ceiling in days for session transcripts created or last written by a desktop-host surface (Claude Desktop, Cowork), which are otherwise exempt from the cleanupPeriodDays sweep. 0 (the default) means no ceiling: such transcripts are kept until deleted another way. Unlike cleanupPeriodDays, 0 is allowed because this setting never disables writes — it only bounds an exemption from deletion. The ceiling is a hard cap: it also bounds an active archive grace, so the grace window of a release marker never keeps files past the ceiling. Ignored when cleanupPeriodDays is managed by org policy. A ceiling at or below cleanupPeriodDays effectively disables the exemption: those transcripts age out on the regular cleanupPeriodDays schedule, so the effective retention is whichever of the two periods is longer."), syncClaudeAiSkills: () => x().optional().describe("Set to false to turn off syncing of the skills you have enabled on claude.ai. In your user settings (or managed settings): nothing more is downloaded, previously synced skills (~/.claude/skills/synced) can no longer be run, are hidden from every session started afterwards, and are moved to ~/.claude/skills/.trash at the next launch (deleted after cleanupPeriodDays; re-downloaded, not restored, if you re-enable). In .claude/settings.local.json or --settings: downloads stop and synced skills are blocked and hidden for sessions in that workspace or invocation only (nothing is moved). Not read from project settings (.claude/settings.json). Only false is honored — the feature is enabled server-side for your account, so setting true does not turn it on early. While it is on, synced skills are available in every session, re-synced about every 10 minutes while a session is in use and a quarter as often otherwise, and removed when you disable them on claude.ai. Only applies when signed in with your Claude account."), syncClaudeAiPlugins: () => x().optional().describe("Set to false to turn off syncing of the plugins you have enabled on claude.ai. In your user settings (or managed settings): nothing more is downloaded, previously synced plugins (~/.claude/plugins/synced) are hidden from every session started afterwards and moved to ~/.claude/plugins/.trash at the next launch (deleted after cleanupPeriodDays; re-downloaded, not restored, if you re-enable). In .claude/settings.local.json or --settings: downloads stop and synced plugins are hidden for sessions in that workspace or invocation only (nothing is moved). Not read from project settings (.claude/settings.json). Only false is honored — the feature is enabled server-side for your account, so setting true does not turn it on early. While it is on, synced plugins load in every session like plugins you installed yourself (a plugin you installed with the same name takes precedence), are re-synced at each launch, and are removed when you disable them on claude.ai. Only applies when signed in with your Claude account."), skillListingMaxDescChars: () => q().int().positive().optional().describe("Per-skill description character cap in the skill listing sent to Claude (default: 1536). Descriptions longer than this are truncated. Raise to opt in to higher per-turn context cost."), skillListingBudgetFraction: () => q().gt(0).lte(1).optional().describe("Fraction of the context window (in characters) reserved for the skill listing sent to Claude (default: 0.01 = 1%). When the listing exceeds this, descriptions are shortened to fit. Raise to opt in to higher per-turn context cost."), wslInheritsWindowsSettings: () => x().optional().describe("When set to true in either admin-only Windows source — the HKLM SOFTWARE/Policies/ClaudeCode registry key or C:/Program Files/ClaudeCode/managed-settings.json — WSL reads managed settings from the full Windows policy chain (HKLM, C:/Program Files/ClaudeCode via DrvFs, HKCU) in addition to /etc/claude-code. Windows sources take priority. The flag is also required in HKCU itself for HKCU policy to apply on WSL (double opt-in: admin enables the chain, user confirms HKCU). On native Windows the flag has no effect."), env: () => nr(() => nqe()).describe("Environment variables to set for Claude Code sessions"), attribution: () => {
    let o = O({ commit: h().optional().describe("Attribution text for git commits, including any trailers. Empty string hides attribution."), pr: h().optional().describe("Attribution text for pull request descriptions. Empty string hides attribution."), sessionUrl: x().optional().describe("Whether to append the claude.ai session link to commits and PRs created from web or Remote Control sessions (default: true). Set to false to omit the Claude-Session trailer and PR-body link."), ...false }).passthrough();
    return re([x(), o], { error: (s) => {
      let i = (s.errors ?? []).flat().filter((l) => l.path.length > 0);
      if (i.length > 0) return i.map((l) => `${l.path.join(".")}: ${l.message.replace(/^Invalid input: /, "")}`).join("; ");
      return `Expected false, true, or an object such as { "commit": "", "pr": "" }, but received ${Array.isArray(s.input) ? "array" : s.input === null ? "null" : typeof s.input}`;
    } }).transform((s) => {
      if (typeof s !== "boolean") return s;
      return s ? {} : { commit: "", pr: "", sessionUrl: false };
    }).pipe(o).optional().describe('Customize attribution text for commits and PRs. Each field defaults to the standard Claude Code attribution if not set. Set to false to hide all attribution, the same as { "commit": "", "pr": "", "sessionUrl": false }. Setting it to true is the same as leaving it out. Older Claude Code versions reject true or false here, so use the object form in settings files shared across versions.');
  }, attributionProject: () => h().optional().describe(`The claude.ai Project this session names for your organization's usage reports: the Project's UUID, or its ID starting with "claude_proj_". An empty string names none and stops lower-precedence files from naming one; the organization default still applies. Sent only when Claude Code uses your claude.ai login, connects directly to the Anthropic API, is not in a cloud session, and CLAUDE_CODE_ATTRIBUTION_HEADER is not 0. CLAUDE_CODE_ATTRIBUTION_PROJECT takes precedence over it. Set in managed settings, it overrides people's own settings files. A project's .claude/settings.json and settings.local.json count only once the folder is trusted; for runs in a folder nobody has trusted, such as CI, use CLAUDE_CODE_ATTRIBUTION_PROJECT.`), attributionProjectPolicy: () => O({ default: h().optional().describe('The Project used when neither CLAUDE_CODE_ATTRIBUTION_PROJECT nor attributionProject names one: its UUID, or its ID starting with "claude_proj_".') }).optional().describe("Your organization's default for attributionProject. Only honored from managed settings (server-managed, MDM / OS policy, or managed-settings.json); ignored in user, project, local and --settings sources."), includeCoAuthoredBy: () => x().optional().describe("Deprecated: Use attribution instead. Whether to include Claude's co-authored by attribution in commits and PRs (defaults to true)"), ...false, ...false, includeGitInstructions: () => x().optional().describe("Include built-in commit and PR workflow instructions in Claude's system prompt (default: true)"), permissions: () => nr(() => VY(e10)).describe("Tool usage permissions configuration"), model: () => h().optional().describe("Override the default model used by Claude Code"), fallbackModel: () => k(h()).optional().describe('Fallback model(s) tried in order when the primary model is overloaded or unavailable. Each element accepts a model name or alias; "default" expands to the default model. CLI --fallback-model takes precedence.'), availableModels: () => k(h()).optional().describe('Allowlist of models that users can select. Accepts family aliases ("opus" allows any opus version), version prefixes ("opus-4-5" allows that version and any model ID that extends it, so "claude-opus-5" also allows "claude-opus-5-5"), and full model IDs. If undefined, all models are available. If empty array, only the default model is available. Typically set in managed settings by enterprise administrators.'), enforceAvailableModels: () => x().optional().describe("When true and availableModels is a non-empty array, the Default model selection is also constrained: if the default model for the user tier is not in availableModels, Default resolves to the first allowed availableModels entry instead. Has no effect when availableModels is unset or an empty array. Typically set in managed settings by enterprise administrators."), availableModelsMatch: () => B(["prefix", "exact"]).optional().describe('How availableModels entries match model IDs. "prefix" (the default) lets an entry also allow any model ID that extends it, so "claude-opus-5" allows "claude-opus-5-5". "exact" keeps that matching but stops a model ID entry from allowing other versions: "claude-opus-5" allows Opus 5 and its dated and -fast IDs, but not Opus 5.5 or a later release until it is listed, and a -latest ID needs a -latest entry. Family aliases ("opus") still allow the whole family; aliases whose model depends on the release or settings (best, opusplan, default) are ignored. With "exact" and a list that names at least one model, the Default option also uses only a listed model; if none can be used, Claude Code will not start. Haiku background models, and hooks and other helper requests that pick their own model, are not restricted (deniedModels covers them; allowManagedHooksOnly limits hooks). Read from managed settings only.'), deniedModels: () => k(h()).optional().describe('Models users cannot select, even when availableModels allows them. A family alias ("opus") blocks that family. A model ID blocks that version in every spelling: dates, -fast and provider prefixes are ignored, so "claude-opus-5-5" blocks every Opus 5.5 ID but not Opus 5. An ID with no minor version ("claude-opus-5") also blocks later minor versions, as it allows them in availableModels. Aliases whose model depends on the release or settings (best, opusplan, default) are ignored. The Default option steps down past a blocked model; if the Default has no allowed model to step down to, Claude Code will not start. Read from managed settings only.'), modelOverrides: () => W(h(), h()).optional().describe('Override mapping from Anthropic model ID (e.g. "claude-opus-4-6") to provider-specific model ID (e.g. a Bedrock inference profile ARN). Typically set in managed settings by enterprise administrators.'), modelPicker: () => O({ options: k(dx()).describe("Rows to show in the /model picker, in order."), replaceBuiltInOptions: x().optional().describe("When true, the picker shows only the Default row and these options — the built-in lineup, gateway-discovered models and ANTHROPIC_CUSTOM_MODEL_OPTION are hidden. When false or unset, these options are added after the built-in lineup.") }).optional().describe("Curate the /model picker: an ordered list of models with your own labels, independent of the built-in lineup and of Claude Code releases. availableModels still applies to these rows. Honored from managed, --settings/SDK, and user settings only (not from a project checkout); the highest-precedence of those that defines modelPicker wins outright (no merging across sources). Typically set in managed settings by enterprise administrators."), modelPricing: () => O({ multiplier: ux(), overrides: W(h(), cx()).optional() }).optional().describe(`Price usage at your organization's contracted rates instead of list price. Affects every spend figure Claude Code reports — /cost, the status line, the SDK total_cost_usd, --max-budget-usd, and the OpenTelemetry cost metric and events — which remain USD estimates, not an invoice (the per-Mtok price labels in /model stay at list). "overrides" maps a model ID to its USD-per-million-token rates (input, output, cacheRead, cacheWrite — all four required, each 0 to 10000; cacheWrite prices both 5-minute and 1-hour cache writes). A matching row is charged exactly as written; fast-mode and US-data-residency surcharges are not added on top. A key Claude Code itself uses for a built-in model — its ID such as "claude-sonnet-4-6", or its first-party, Bedrock (any or no region prefix), Vertex or Foundry ID — covers every dated and provider form of that model; any other key — a gateway model alias, or a spelling Claude Code does not itself use — matches that model ID only (case-insensitive), and such an exact match wins over a built-in row. On Bedrock an application inference profile is matched by its backing model. An invalid row or multiplier is reported and skipped; the rest still apply. "multiplier" in (0, 10] scales every computed cost, overridden or not (0.85 = 85% of the price, 1.2 = 120%). Only honored from managed settings (server-managed, MDM / OS policy, or managed-settings.json), or — when none of those sets it — when supplied by a host application that manages the model provider; ignored in user, project, local and --settings sources.`), ...false, enableAllProjectMcpServers: () => x().optional().describe("Whether to automatically approve all MCP servers in the project"), enabledMcpjsonServers: () => k(h()).optional().describe("List of approved MCP servers from .mcp.json"), disabledMcpjsonServers: () => k(h()).optional().describe("List of rejected MCP servers from .mcp.json"), disableClaudeAiConnectors: () => x().optional().describe("When true in any settings source, claude.ai MCP cloud connectors are not auto-fetched or connected, and a claudeai-proxy server passed explicitly (e.g. via --mcp-config or the SDK mcpServers option) does not connect either. Any-source-true wins: a project can opt out, but a project-level false cannot override a user-level true."), skillOverrides: () => W(h(), B(["on", "name-only", "user-invocable-only", "off"])).optional().describe('Per-skill listing overrides keyed by skill name. "name-only" lists the skill without its description; "user-invocable-only" hides it from the model but keeps /name; "off" hides it from both. Absent = on.'), disableBundledSkills: () => x().optional().describe("Disable the skills and workflows that ship with Claude Code: bundled skills and workflows are removed entirely; built-in slash commands stay typable but are hidden from the model. Plugins, .claude/skills/, and .claude/commands/ are unaffected. Equivalent to CLAUDE_CODE_DISABLE_BUNDLED_SKILLS=1."), managedMcpServers: () => nr(() => W(h().refine(Sw, { error: K_ }), Ew(), { error: bw })).describe(`MCP servers the organization provides to every user, keyed by server name, each with the .mcp.json entry shape; only "http" and "sse" servers are accepted (nothing that names a program to run, no \${VAR} references). Honored from managed settings only; users cannot remove them, deniedMcpServers still applies, and they need no allowedMcpServers entry. Not read in Claude Desktop's Code tab on a third-party deployment or in Cowork sessions, where Claude Desktop supplies and locks the session's MCP servers itself.`), allowedMcpServers: () => nr(() => k(ay())).describe("Enterprise allowlist of the MCP servers users may use. Governs servers users add (user, project and local config, --mcp-config, agent frontmatter, plugins, claude.ai connectors); servers the organization itself delivers (managedMcpServers, and managed-mcp.json entries with no ${VAR} in their command, args, url or header values) are allowed without being listed; a managed-mcp.json entry with ${VAR} in any of those must match this list. If undefined, all servers are allowed. If empty array, users can use no servers of their own. Denylist takes precedence - if a server is on both lists, it is denied."), deniedMcpServers: () => nr(() => k(ly())).describe("Enterprise denylist of MCP servers that are explicitly blocked. If a server is on the denylist, it will be blocked across all scopes including enterprise. Denylist takes precedence over allowlist - if a server is on both lists, it is denied."), hooks: () => nr(() => Sa()).describe("Custom commands to run before/after tool executions"), worktree: () => O({ symlinkDirectories: k(h()).optional().describe('Directories to symlink from main repository to worktrees to avoid disk bloat. Must be explicitly configured - no directories are symlinked by default. Common examples: "node_modules", ".cache", ".bin"'), sparsePaths: k(h()).optional().describe("Directories to include when creating worktrees, via git sparse-checkout (cone mode). Dramatically faster in large monorepos — only the listed paths are written to disk."), baseRef: B(["fresh", "head"]).optional().describe("Which ref new worktrees branch from. 'fresh' (default) branches from origin/<default-branch> for a clean tree. 'head' branches from your current local HEAD so unpushed commits and feature-branch state are present. Applies to --worktree, EnterWorktree, and agent isolation."), bgIsolation: B(["worktree", "none"]).optional().catch(void 0).describe("Isolation mode for background sessions in this repo. 'worktree' (default) blocks Edit/Write in the main checkout until EnterWorktree is called. 'none' lets background jobs edit the working copy directly."), location: h().optional().catch(void 0).describe("Directory under which Claude Code Desktop creates the worktrees of SSH sessions that run on this machine (an absolute path or one starting with ~/), instead of <project>/.claude/worktrees. Read by the desktop app from the SSH host user settings; a location chosen in the desktop app's SSH connection settings takes precedence. The CLI (--worktree, EnterWorktree, agent isolation) does not read it yet.") }).optional().describe("Git worktree configuration: the CLI --worktree flag, EnterWorktree and agent isolation, plus the location Claude Code Desktop uses for SSH-session worktrees on this machine."), disableAllHooks: () => x().optional().describe("Disable all hooks and statusLine execution: the hooks defined in settings files and by installed plugins. Features built into Claude Code are not hooks in this sense and keep working; each has its own switch."), disableAgentView: () => x().optional().describe("Disable agent view (`claude agents`, `--bg`, /background, the on-demand daemon). Typically set in managed settings. Equivalent to CLAUDE_CODE_DISABLE_AGENT_VIEW=1."), disableRemoteControl: () => x().optional().describe("Disable Remote Control (claude.ai/code, `claude remote-control`, `--remote-control`/`--rc`, auto-start, and the in-session toggle). Typically set in managed settings."), disableWorkflows: () => x().optional().describe("Disable the Workflows feature. Code Review on pull requests and /ultrareview run in Anthropic's cloud and are not stopped by this setting, except an /ultrareview that has to restart partway through. A machine that runs a review itself refuses it when that machine's own administrator set this, or CLAUDE_CODE_DISABLE_WORKFLOWS in an `env` block, in its managed settings (MDM, the managed-settings file or an administrator's policy helper). Set in the environment before Claude Code starts, CLAUDE_CODE_DISABLE_WORKFLOWS disables Workflows. Beyond the cases above it stops a review only when the review's own session starts with it set."), disableArtifact: () => x().optional().describe("Deprecated: use enableArtifact: false. Still honored — true disables the Artifact tool; false is ignored."), enableArtifact: () => x().optional().describe("Turn the Artifact tool on or off. Off in any of managed, --settings, or user settings wins; project and local settings can only turn it off. Unset defaults to on once the feature is available."), enableWorkflows: () => x().optional().describe("Enable or disable the Workflows feature for this user. Unset = default by plan once the feature is available."), workflowSizeGuideline: () => B(["unrestricted", "small", "medium", "large"]).optional().describe('Advisory size guideline for the dynamic workflows Claude writes: "small" aims for fewer than 5 agents, "medium" fewer than 10, "large" fewer than 50, and "unrestricted" sends no guideline. Unset defaults to "medium", or "small" on Pro plans. A value here — including from managed settings — takes precedence over the "Dynamic workflow size" choice in /config, and that /config row is hidden while a settings file provides the key. This is a guideline, not an enforced limit.'), workflowKeywordTriggerEnabled: () => x().optional().describe('Enable the "ultracode" keyword trigger: including the keyword in a prompt opts that turn into the Workflow tool. Set to false to disable the trigger. Default: true.'), disableSkillShellExecution: () => x().optional().describe("Disable inline shell execution in skills and custom slash commands from user, project, or plugin sources. Commands are replaced with a placeholder instead of being run."), defaultShell: () => B(["bash", "powershell"]).optional().describe("Default shell for input-box ! commands. Defaults to 'bash' on all platforms (no Windows auto-flip)."), bashEditDiffEnabled: () => x().optional().describe("Whether the Bash tool shows a diff of the files a Bash command changed (PostToolUse Bash hooks get the changed-file list in tool_response). Set to false to turn that off. Default: on when the Bash tool handles file edits. Only user, flag or policy settings can turn it on outside auto and bypassPermissions modes."), bashOutputMaxChars: () => q().int().positive().optional().catch(void 0).describe("How many characters of a successful Bash or PowerShell command's output Claude receives inline (default 30000; values clamp to 4000-128000). Output past this is saved to a file and Claude receives a short preview plus the path. When set, this also replaces BASH_MAX_OUTPUT_LENGTH, which on its own only sizes the read-back window."), taskOutputMaxChars: () => q().int().positive().optional().catch(void 0).describe("Deprecated: no longer has any effect (the TaskOutput tool was removed). Read a background task's output file with the Read tool instead."), respondToBashCommands: () => x().optional().describe("Whether Claude responds after an input-box ! bash command runs. Set to false to add the command output to context without a response. Default: true."), allowManagedHooksOnly: () => x().optional().describe("When true (and set in managed settings), only hooks from managed settings and from plugins that managed settings enable run. User, project, and local hooks and the hooks of plugins the user installed are ignored. Features built into Claude Code are not hooks in this sense and keep working."), allowedHttpHookUrls: () => k(h()).optional().describe('Allowlist of URL patterns that HTTP hooks may target. Supports * as a wildcard (e.g. "https://hooks.example.com/*"). When set, HTTP hooks with non-matching URLs are blocked. If undefined, all URLs are allowed. If empty array, no HTTP hooks are allowed. Arrays merge across settings sources (same semantics as allowedMcpServers).'), httpHookAllowedEnvVars: () => k(h()).optional().describe("Allowlist of environment variable names HTTP hooks may interpolate into headers. When set, each hook's effective allowedEnvVars is the intersection with this list. If undefined, no restriction is applied. Arrays merge across settings sources (same semantics as allowedMcpServers)."), allowManagedPermissionRulesOnly: () => x().optional().describe("When true (and set in managed settings), permission rules from user, project, local, and --settings files and allow rules from --allowedTools are ignored; only managed settings can add allow rules through settings. The allowed-tools frontmatter of skills and custom commands from user, project, and --add-dir sources, and of plugins no managed setting vouches for, is ignored too. Plugins keep theirs only on an admin-backed channel: host-delivered --plugin-dir plugins (in Claude Desktop, only while this is not set by the organization's own managed settings), the official marketplace registered from its unpinned anthropics source, claude.ai-synced plugins Anthropic attests, the saved login organization's claude.ai-hosted marketplaces, marketplaces whose registered source managed extraKnownMarketplaces declares or an exact or owner-pinned (owner/*) strictKnownMarketplaces entry names at the path it pins (an npm marketplace source only when the registration and the declared entry pin the same registry, and a settings marketplace source only when every nested npm plugin entry pins one on a bare package name — unpinned, the package resolves through the member's own npm config, and a non-bare spelling packs as an exotic spec the pin does not bind, so nothing an entry names is what was fetched), and npm-direct (package@npm) plugins whose recorded resolution a registry-pinned managed npm strictKnownMarketplaces entry names (host and path patterns and enabledPlugins ids do not vouch); managed and bundled skills keep theirs. --disallowedTools, skill disallowed-tools, and other deny and ask rules from the command line or the current session still apply."), allowManagedMcpServersOnly: () => x().optional().describe("When true (and set in managed settings), allowedMcpServers is only read from managed settings. deniedMcpServers still merges from all sources, so users can deny servers for themselves. Users can still add their own MCP servers, but only the admin-defined allowlist applies."), allowAllClaudeAiMcps: () => x().optional().describe("When true (and set in managed settings), claude.ai cloud MCP connectors load alongside managed-mcp.json instead of being suppressed by its exclusive-control lockdown. Default off preserves the lockdown. Read from managed settings only."), allowClaudeInChromeWithManagedMcp: () => x().optional().describe("When true (and set in device managed settings: MDM, the managed-settings.json file, or a policy helper those configure), the built-in Claude in Chrome MCP server can run alongside managed-mcp.json instead of being blocked by its exclusive-control lockdown. deniedMcpServers and the organization's Claude in Chrome setting still block it. Default off preserves the lockdown."), strictPluginOnlyCustomization: () => QY().optional().catch(void 0).describe('When set in managed settings, blocks non-plugin customization sources for the listed surfaces. Array form locks specific surfaces (e.g. ["skills", "hooks"]); `true` locks all four; `false` is an explicit no-op. Blocked: ~/.claude/{surface}/, .claude/{surface}/ (project), settings.json hooks, .mcp.json. NOT blocked: managed (policySettings) sources, plugin-provided customizations. Composes with strictKnownMarketplaces for end-to-end admin control — plugins gated by marketplace allowlist, everything else blocked here.'), statusLine: () => O({ type: N("command"), command: h(), padding: q().optional(), refreshInterval: q().min(1).optional().catch(void 0).describe("Re-run the status line command every N seconds in addition to event-driven updates"), hideVimModeIndicator: x().optional().describe("Hide the built-in `-- INSERT --` / `-- VISUAL --` indicator below the prompt. Use this when your status line script renders `vim.mode` itself.") }).optional().describe("Custom status line display configuration"), prUrlTemplate: () => h().optional().describe('URL template for PR links in the footer link badges and inline messages. The detected git PR is rendered as the first footer-link badge. Placeholders: {host} {owner} {repo} {number} {url}. Example: "https://reviews.example.com/{owner}/{repo}/pull/{number}"'), footerLinksRegexes: () => k(Pqe().catch(FY)).transform((o) => o.filter((s) => s !== FY)).optional().catch(void 0).describe("Extra clickable footer badges that appear when a regex matches turn output (tool results and assistant responses). Read from user, flag, and managed settings only; ignored in project .claude/settings.json and local .claude/settings.local.json. At most 5 badges render; the oldest is displaced by newer matches and /clear removes them. Use to surface IDs printed by project CLIs as session links."), subagentStatusLine: () => O({ type: N("command"), command: h() }).optional().describe("Custom per-subagent status line shown in the agent panel; receives row context as JSON on stdin"), enabledPlugins: () => W(h(), eZ()).optional().describe('Enabled plugins using plugin-id@marketplace-id format. Example: { "formatter@anthropic-tools": true }. Also supports extended format with version constraints. Settings precedence is user < project < local < flag < policy, so to disable a plugin that project settings enable, set it to false in .claude/settings.local.json — setting false in ~/.claude/settings.json is overridden by the project.'), prependPlugins: () => k(h()).optional().catch(void 0).describe("Managed plugins (plugin@marketplace ids that managed enabledPlugins sets true) whose hooks run first, outermost, in the listed order: the first id listed sees every event before any other plugin and every result after it. Managed plugins not listed here or in appendPlugins follow the listed ones; user, project and marketplace plugins come after those; then appendPlugins; then the built-in plugins. The bundled cc-plugin-sec-default@builtin seats itself outermost (on a machine with managed settings and for Team and Enterprise organizations) unless this list is set, in which case list it where it should sit or leave it out. Name it there as sec-default@builtin, the id every release reads, for as long as any machine in the organization may run a release from before its rename; a release that knows the new id reads either. Any other id that is not an enabled managed plugin is skipped; an id listed in both keys is prepended. Only honored from managed settings (or, on a machine with none, from user settings for your own plugins); ignored in project, local and --settings sources."), appendPlugins: () => k(h()).optional().catch(void 0).describe("Managed plugins (plugin@marketplace ids that managed enabledPlugins sets true) whose hooks run last among plugins, innermost, in the listed order: the last id listed sits just above the built-in plugins and sees each event as every other plugin left it. Only honored from managed settings (or, on a machine with none, from user settings for your own plugins); ignored in project, local and --settings sources."), extraKnownMarketplaces: () => nr(() => n("extraKnownMarketplaces")).describe("Additional marketplaces to make available for this repository. Typically used in repository .claude/settings.json to ensure team members have required plugin sources."), additionalMarketplaces: () => nr(() => n("additionalMarketplaces")).describe("Alias for extraKnownMarketplaces: this key is read exactly as if it were spelled extraKnownMarketplaces. Do not set both in one file — if both appear, this key is ignored with a warning. Claude Code may rewrite this key as extraKnownMarketplaces when it updates the file. Clients older than this alias ignore it, so prefer extraKnownMarketplaces while older Claude Code versions still share the same settings."), strictKnownMarketplaces: () => nr(() => k(X_())).describe('Enterprise strict list of allowed marketplace sources. When set in managed settings, ONLY these sources can be added as marketplaces. Entries match exactly, except that a github entry may use the owner-wildcard form {"source":"github","repo":"owner/*"} to allow every repository under that owner. The check happens BEFORE downloading, so blocked sources never touch the filesystem. Note: this is a policy gate only — it does NOT register marketplaces. To pre-register allowed marketplaces for users, also set extraKnownMarketplaces.'), allowedMarketplaces: () => nr(() => k(X_())).describe("Alias for strictKnownMarketplaces (managed settings only): this key is read exactly as if it were spelled strictKnownMarketplaces. Do not set both in one file — if both appear, this key is ignored with a warning. Clients older than this alias ignore it, so keep using strictKnownMarketplaces when the allowlist must also bind older Claude Code versions."), blockedMarketplaces: () => nr(() => k(Yw())).describe('Enterprise blocklist of marketplace sources. When set in managed settings, these sources are blocked from being added as marketplaces. Entries match exactly, except that a github entry may use the owner-wildcard form {"source":"github","repo":"owner/*"} to block every repository under that owner. The check happens BEFORE downloading, so blocked sources never touch the filesystem.'), disableCommandPluginSources: () => x().optional().describe("Controls the `command` plugin source, whose plugin directory is produced by running a marketplace-declared command on this machine. true: command-sourced plugins are never installed, updated, or re-resolved (the command never runs). false: explicitly allowed. Unset: follows allowManagedHooksOnly — an org that restricts hook execution to managed settings gets command sources disabled too. Only honored from managed settings."), ...false, disableSideloadFlags: () => x().optional().describe("When true (and set in managed settings), rejects the --plugin-dir, --plugin-url, --agents, and non-sdk --mcp-config CLI flags at startup. Closes the CLI-flag bypass of strictKnownMarketplaces. Pair with allowedMcpServers for per-server MCP control; this setting does not gate other MCP entry points (SDK setMcpServers, claude mcp add, .mcp.json). Also blocks surfaces that spawn the CLI with these flags internally (see settings documentation). Only honored from managed settings; ignored in user/project/local settings."), pluginSuggestionMarketplaces: () => k(h()).optional().describe("Marketplace names whose plugins may surface as contextual install suggestions (relevance-based tips). No marketplace-declared suggestions surface without this allowlist; the built-in first-party frontend-design tip is unaffected. Only honored when set in managed settings (policy scope); the key is ignored in user, project, and local settings. A name only takes effect when the marketplace is registered on the machine AND its registered source is also declared in managed settings, either as the extraKnownMarketplaces entry for that name or as an entry of strictKnownMarketplaces. A marketplace registered from a different source under an allowlisted name is ignored. The official marketplace is exempt from the source requirement: allowlisting its name alone suffices, since that name can only register from the official Anthropic source."), forceLoginMethod: () => B(["claudeai", "console", "gateway"]).optional().catch(void 0).describe('Force a specific login method: "claudeai" for Claude Pro/Max, "console" for Console billing, "gateway" for the Cloud gateway OIDC device flow'), forceLoginGatewayUrl: () => h().min(1).optional().catch(void 0).describe('Cloud gateway URL to pre-fill during login, alongside forceLoginMethod: "gateway". Honored from admin-controlled managed settings (MDM / managed-settings.json / policy helper) and, on a machine with none of those, from your own user settings; ignored in project, local, flag, and remote-delivered settings.'), gatewayInternalNetworks: () => k(h()).optional().catch([rZ]).meta({ default: void 0 }).describe("IPv4 CIDR blocks (at most 4, each /8 to /32, not overlapping) your Cloud gateway sits in: the public block your organization numbers its internal network from, which lets /login reach a gateway there. A block must lie entirely outside private space, where /login accepts a gateway without this key. /login accepts a gateway inside a listed block over a direct connection only, and only when this machine's own address on that connection is inside the same block, so /login must happen from a machine whose own address is inside the block (not through a proxy, VPN pool, container or NAT segment outside it). A bar against copied settings files, not proof of location. Honored only from admin-controlled managed settings (MDM / managed-settings.json / policy helper); ignored in user, project, and remote-delivered settings."), parentSettingsBehavior: () => B(["first-wins", "merge"]).optional().describe(`Controls whether the SDK parent tier (Options.managedSettings / --managed-settings) layers under this admin tier. "first-wins" (the default, except in a gateway session Claude Desktop's Code tab launched, where "merge" is): parent is dropped — admin tiers are the only policy source. "merge": parent's restrictive-only-filtered settings union under the admin winner. Has no effect when no admin tier exists (parent applies as the sole policy tier, still filtered restrictive-only).`), managedSourcesBehavior: () => B(["first-wins", "merge"]).optional().describe(`Controls how the managed settings sources compose. "first-wins" (default): the highest-priority source present (server-managed > MDM (managed plist / HKLM) > managed-settings.json) is the managed tier alone. "merge": every present source deep-merges with fixed precedence server-managed > MDM > managed-settings.json — scalars take the highest source's value (a restrictive boolean or enum — the allowManaged*Only locks, the disable* switches, the sandbox lock family — takes the strictest value any source sets) and arrays union, except fallbackModel, the restriction allowlists allowedMcpServers, allowedProviders, availableModels, strictKnownMarketplaces and allowedChannelPlugins, and sandbox.credentials.awsPairs and sandbox.ripgrep (the highest source that sets one owns it whole), modelOverrides (the whole map of the highest source that sets it, dropped when that source sits below the one that sets availableModels), managedMcpServers (server names union; a name set by two sources takes the higher source's whole entry), and the keys taken from the highest source only: the auth pins forceLoginOrgUUID, forceLoginMethod, forceLoginGatewayUrl and gatewayInternalNetworks, the credential helpers apiKeyHelper, awsAuthRefresh, awsCredentialExport, gcpAuthRefresh, otelHeadersHelper and proxyAuthHelper, modelPicker, permissions.defaultMode, parentSettingsBehavior and the policyHelper configuration (env keeps its own per-key union). In both modes, a forceLoginOrgUUID, or a forceLoginMethod of claudeai or console, that this machine's own MDM policy or managed settings file sets applies ahead of server-managed settings. Honored only from the highest-priority source present; enable it only when every lower source is admin-controlled, since lower sources then contribute entries such as permissions.allow. HKCU and --managed-settings never take part in the merge.`), forceLoginOrgUUID: () => re([h(), k(h())]).optional().describe("Organization UUID to require for OAuth login. Accepts a single UUID string or an array of UUIDs (any one is permitted). When set in managed settings, login fails if the authenticated account does not belong to a listed organization."), allowedProviders: () => Le((o) => Array.isArray(o) ? o.filter(Aw) : o, k(B(vp))).optional().catch(void 0).describe(`Managed settings only (managed-settings.json, MDM, or server-managed). The API providers Claude Code may use on this machine: "anthropic" (the Anthropic API on Anthropic's own host, via a claude.ai or Console sign-in or an API key; pair it with forceLoginMethod / forceLoginOrgUUID to require a sign-in), "bedrock", "vertex", "foundry", "anthropicAws", "mantle" (each meaning that provider's own service: its regional, FIPS, private-endpoint and sovereign-cloud hosts), "customEndpoint" (the Anthropic API or a cloud provider's API sent to some other host — ANTHROPIC_BASE_URL, that provider's ANTHROPIC_*_BASE_URL, a Foundry resource name that is not a bare name, or for Bedrock the AWS SDK's AWS_ENDPOINT_URL[_BEDROCK[_RUNTIME]] — such as an LLM gateway; admitted only for the value pinned in the "env" block of the same managed source), or "gateway" (the Cloud gateway sign-in). A session on a provider that is not listed is refused at startup, at login, and when it next contacts the API, with a message naming what selected the provider and the entry that would allow it. Under a list, where first-party traffic goes (ANTHROPIC_BASE_URL, a gateway sign-in) is honored only when the same managed source pins it in "env" (or forceLoginGatewayUrl), and a claude ssh tunnel into the machine is refused. A cloud provider's credential and tenancy variables, and the network path and TLS trust (HTTPS_PROXY, NODE_EXTRA_CA_CERTS, CLAUDE_CODE_CERT_STORE), are not judged by this list; set those for the fleet in the managed "env" block, whose values replace the user's. To route Bedrock through a gateway for a fleet, pin ANTHROPIC_BEDROCK_BASE_URL there (it is what the clients use, ahead of an endpoint_url in ~/.aws/config, which this list does not judge); the AWS SDK's AWS_ENDPOINT_URL* pins only sanction where the SDK's own clients go and never stand in for the "bedrock" entry. Unset allows every provider; an empty array allows none. Only a list in managed-settings.json or MDM is enforcement on the machine: it cannot be widened or hidden by server-managed settings and reaches every session. A list set only in the admin console reaches only sessions that fetch your server-managed settings — not a session on a cloud provider, another organization or a non-Anthropic ANTHROPIC_BASE_URL, one authenticating only with apiKeyHelper or ANTHROPIC_AUTH_TOKEN, a Pro/Max login, --bare without an API key, or a first launch before the fetch lands — all conditions the user controls. Versions that predate this setting ignore it; pair it with a minimum-version policy on a mixed fleet. 'claude auth status' reports the Anthropic API as apiProvider "firstParty".`), ...false, forceRemoteSettingsRefresh: () => x().optional().describe("When set in managed settings, the CLI blocks startup until remote managed settings are freshly fetched, and exits if the fetch fails"), otelHeadersHelper: () => h().optional().describe("Path to a script that outputs OpenTelemetry headers"), outputStyle: () => h().optional().describe("Controls the output style for assistant responses"), viewMode: () => B(["default", "verbose", "focus"]).optional().catch(void 0).describe("Default transcript view mode on startup"), language: () => h().optional().describe('Preferred language for Claude responses and voice dictation (e.g., "japanese", "spanish")'), skipWebFetchPreflight: () => x().optional().describe("Skip the WebFetch blocklist check for enterprise environments with restrictive security policies"), sandbox: () => nr(() => cw()), ...false, feedbackSurveyRate: () => q().min(0).max(1).optional().describe("Probability (0–1) that the session quality survey appears when eligible. 0.05 is a reasonable starting point."), feedbackDrafts: () => B(["notify", "quiet", "off"]).optional().describe('Model-drafted feedback (the SendFeedback tool). "notify" (default) shows a one-line notice when a draft is queued; "quiet" shows only the footer counter; "off" disables the tool entirely so drafts are never queued.'), spinnerTipsEnabled: () => x().optional().describe("Whether to show tips in the spinner"), spinnerVerbs: () => O({ mode: B(["append", "replace"]), verbs: k(h()) }).optional().describe('Customize spinner verbs. mode: "append" adds verbs to defaults, "replace" uses only your verbs.'), spinnerTipsOverride: () => O({ excludeDefault: x().optional().catch(void 0), tips: oqe().optional(), tipsFile: h().optional().catch(void 0).describe("Absolute or ~/ local path to a JSON file holding an array of tips (same shapes as `tips`); honored from user, --settings and on-disk managed settings only. Read once per CLI process (restart to pick up edits)."), label: h().optional().catch(void 0).describe('Prefix shown before your tips in the spinner (default "Tip")') }).passthrough().optional().catch(void 0).describe("Add your organization's own tips to the spinner tip rotation. tips: strings or {id, text, cooldownSessions?, priority?} objects; tipsFile: a JSON file of the same; label: prefix shown before your tips; excludeDefault: if true, only show your tips (default: false)."), syntaxHighlightingDisabled: () => x().optional().describe("Whether to disable syntax highlighting in diffs"), maxProseWidth: () => q().int().min(40).optional().catch(void 0).describe("Maximum width, in terminal columns, of the prose in Claude's responses (paragraphs, headings, lists, blockquotes). In a wider terminal the prose wraps at this width while tables and code blocks keep the full width; only the display wraps, the response text itself gains no line breaks. Minimum 40. Unset (the default) uses the full terminal width."), spellcheck: () => O({ enabled: x().optional().catch(void 0).describe("Turn on spell checking of the prompt input (default: false)"), checker: h().optional().catch(void 0).describe(`Which spell checker to run: ${ey.map((o) => `"${o}"`).join(", ")}, or "auto" (default) for the first of those found on PATH`), language: h().optional().catch(void 0).describe(`Dictionary to use, passed to the checker as-is (aspell --lang, hunspell -d, ispell -d), e.g. "en_GB"; names are checker-specific (letters, digits and _ - . , only). Default: the checker's own default`), color: h().optional().catch(void 0).describe(`Color of misspelled words (they are also underlined): a terminal color name such as "red" or "magenta", "#rrggbb", "rgb(r,g,b)", "ansi256(n)" or "ansi:<name>". Default: the theme's error color`) }).passthrough().optional().catch(void 0).describe(`Underline misspelled words in the prompt input as you type, using an installed ${ey.slice(0, -1).join(", ")} or ${ey.at(-1)} (off unless "enabled" is true; does nothing if none is installed). Read from user, flag and managed settings only (the whole block from the highest-precedence of those applies); ignored in project .claude/settings.json and .claude/settings.local.json.`), terminalTitleFromRename: () => x().optional().describe("Whether /rename updates the terminal tab title (defaults to true). Set to false to keep auto-generated topic titles."), promptCacheTtl: () => B(tl).optional().catch(void 0).describe('Prompt cache TTL for the main conversation (interactive, -p and SDK turns, plus the helpers that run inline with it): "5m" or "1h". Unset = automatic: 1 hour on a Claude subscription within its usage limits, 5 minutes on an API key, Bedrock, Vertex or Foundry. 1-hour cache writes are billed at a higher rate; the cache stays warm across longer breaks. The CLAUDE_CODE_PROMPT_CACHE_TTL environment variable takes precedence.'), subagentPromptCacheTtl: () => B(tl).optional().catch(void 0).describe('Prompt cache TTL for everything outside the main conversation — subagents, workflows, background and helper requests: "5m" or "1h". Unset = automatic (5 minutes unless ENABLE_PROMPT_CACHING_1H=1). The CLAUDE_CODE_SUBAGENT_PROMPT_CACHE_TTL environment variable takes precedence.'), alwaysThinkingEnabled: () => x().optional().describe("When false, thinking is disabled. When absent or true, thinking is enabled automatically for supported models."), effortLevel: () => B(["low", "medium", "high", "xhigh"]).optional().catch(void 0).describe("Persisted effort level for supported models."), maxEffortLevel: () => B(yp).optional().catch(void 0).describe("Maximum effort level. Anything above it (an /effort or /model pick, --effort, CLAUDE_CODE_EFFORT_LEVEL, a model default) is clamped to it, on every provider including Bedrock, Vertex and Foundry. Combines with an organization's per-model effort cap by taking the lower of the two; across settings files the lowest value wins, and modelSettings.<model>.maxEffortLevel replaces it per model. Enforced client-side: an effort supplied through CLAUDE_CODE_EXTRA_BODY is not clamped."), modelSettings: () => Le((o) => typeof o === "object" && o !== null && !Array.isArray(o) ? ga(o, (s, i) => Object.hasOwn(Object.prototype, i)) : o, W(h(), O({ effortLevel: B(["low", "medium", "high", "xhigh"]).optional().catch(void 0).describe("Persisted effort level for this model."), maxEffortLevel: B(yp).optional().catch(void 0).describe('Maximum effort level for this model. Within one settings file it replaces the top-level maxEffortLevel for the model ("max" exempts it); across settings files the lowest applicable value wins. Keyed like effortLevel: the canonical model name also matches its dated, [1m], Bedrock and Vertex spellings.'), autoCompactWindow: re([N("auto"), $Y()]).describe('Auto-compact window for this model, in tokens (100000 to 1000000), or "auto" for the window tuned for the model. Within one settings file it replaces the top-level autoCompactWindow for the model. /autocompact saves here. The canonical model name as key also matches its dated, [1m], Bedrock and Vertex spellings.') }).passthrough().optional().catch(void 0))).optional().catch(void 0).describe("Per-model settings keyed by canonical model name."), ultracode: () => x().optional().catch(void 0).describe("Enable ultracode for the session: standing dynamic-workflow orchestration at any effort level. Session-scoped — typically provided via --settings or the apply_flag_settings control request; interactive toggles never persist it. Requires workflows to be enabled and a model that supports ultracode."), autoCompactWindow: () => $Y().describe("Auto-compact window size"), ...false, advisorModel: () => h().optional().describe("Advisor model for the server-side advisor tool."), fastMode: () => x().optional().describe("When true, fast mode is enabled. When absent or false, fast mode is off."), fastModePerSessionOptIn: () => x().optional().describe("When true, fast mode does not persist across sessions. Each session starts with fast mode off."), promptSuggestionEnabled: () => x().optional().describe("When false, prompt suggestions are disabled. When absent or true, prompt suggestions are enabled."), emojiCompletionEnabled: () => x().optional().describe("When false, the :emoji: shortcode typeahead (the suggestion popup and the :name: inline replacement) is disabled. When absent or true, it is enabled."), awaySummaryEnabled: () => x().optional().describe("@internal When false, the session recap (shown when you return after being away for 5+ minutes) is disabled. When absent or true, recap is enabled. Hidden from public SDK types until external launch."), responseComparisonEnabled: () => x().optional().describe("@internal Set to false to stop Claude Code from showing two answers to one message and asking which is better. When absent or true, it may do so on some turns. Hidden from public SDK types until external launch."), showClearContextOnPlanAccept: () => x().optional().describe('When true, the plan-approval dialog offers a "clear context" option. Defaults to false.'), askUserQuestionTimeout: () => B(["60s", "5m", "10m", "never"]).optional().catch(void 0).describe("Idle time before Claude's questions auto-continue with any answers selected so far. Defaults to never — auto-continue only runs when explicitly set to 60s/5m/10m."), dialogExpiry: () => B(["60s", "5m", "10m", "never"]).optional().catch(void 0).describe('Max time a permission/user dialog forwarded to a remote client stays parked awaiting an answer, and how long a HELD cross-session message awaits approval, before either resolves to its safe no-action default (cancelled / dropped-with-denial). Defaults to 5m to match the long-standing remote-dialog deadline; "never" disables the deadline. Local-only permission prompts (no remote client) are unaffected. The CLAUDE_CODE_USER_DIALOG_TIMEOUT_MS env var, when set, overrides this. Read from trusted sources only (never a checked-in repo settings file).'), agent: () => h().optional().describe("Name of an agent (built-in or custom) to use for the main thread. Applies the agent's system prompt, tool restrictions, and model."), modelProposedGoals: () => B(W2).optional().catch(void 0).describe("@internal Controls the ProposeGoal tool (model-proposed session goals). 'auto' (the default when absent) lets the model choose per proposal whether to ask for approval via its ask_user parameter; 'alwaysAsk' routes every model-proposed goal through the approval dialog; 'disabled' turns the tool off. A typed /goal is unaffected. Consent-affecting, so it is read from trusted sources only (user/policy/flag) — workspace-resident project and local settings are ignored."), companyAnnouncements: () => k(h()).optional().describe("Company announcements to display at startup (one will be randomly selected if multiple are provided)"), pluginConfigs: () => W(h(), O({ mcpServers: W(h(), W(h(), re([h(), q(), x(), k(h())]))).optional().describe("User configuration values for MCP servers keyed by server name"), options: W(h(), re([h(), q(), x(), k(h())])).optional().describe("Non-sensitive option values from plugin manifest userConfig, keyed by option name. Sensitive values go to secure storage instead.") }).or(bR())).optional().describe("Per-plugin configuration including MCP server user configs, keyed by plugin ID (plugin@marketplace format)"), remote: () => O({ defaultEnvironmentId: h().optional().describe("Default environment ID to use for cloud sessions") }).optional().describe("Cloud session configuration"), autoUpdatesChannel: () => B(["latest", "stable", "rc"]).optional().describe("Release channel for auto-updates (latest or stable)"), minimumVersion: () => h().optional().describe("Minimum version to stay on - prevents downgrades when switching to stable channel"), requiredMinimumVersion: () => h().optional().describe("Minimum Claude Code version required to start. If the running version is older, Claude Code exits at startup with instructions to update. Only enforced from managed (policy) settings."), requiredMaximumVersion: () => h().optional().describe("Maximum Claude Code version allowed to start. If the running version is newer, Claude Code exits at startup with instructions to install an approved version. Only enforced from managed (policy) settings."), plansDirectory: () => h().optional().describe("Custom directory for plan files, relative to project root. If not set, defaults to ~/.claude/plans/"), tui: () => B(["default", "fullscreen"]).optional().describe('Terminal UI renderer. "fullscreen" uses the flicker-free alt-screen renderer with virtualized scrollback (equivalent to CLAUDE_CODE_NO_FLICKER=1). "default" uses the classic main-screen renderer.'), ...false, voice: () => O({ enabled: x().optional(), mode: B(["hold", "tap"]).optional().describe("'hold' (default): hold to talk. 'tap': tap to start, tap to stop+submit."), autoSubmit: x().optional().describe("Submit the prompt when hold-to-talk is released (hold mode only)") }).optional().describe("Voice mode settings (hold-to-talk / tap-to-toggle dictation)"), channelsEnabled: () => x().optional().describe("Managed-org opt-in for channel notifications (MCP servers with the claude/channel capability pushing inbound messages). claude.ai Teams/Enterprise: default off. Console: default on unless managed settings exist. Set true to allow; users then select servers via --channels."), allowedChannelPlugins: () => k(qY()).optional().describe("Managed-org allowlist of channel plugins. When set, replaces the default Anthropic allowlist — admins decide which plugins may push inbound messages. Undefined falls back to the default. Requires channelsEnabled: true."), prefersReducedMotion: () => x().optional().describe("Reduce or disable animations for accessibility (spinner shimmer, flash effects, etc.)"), timeFormat: () => re([B(B2), h()]).optional().describe('Clock format for times shown in the UI: "auto" (default, follows the locale), "12-hour", "24-hour", "24-hour-utc" ("18:05Z"), or a strftime pattern such as "%H:%M" (any value containing "%"; other values read as "auto"). A pattern replaces the time everywhere; message timestamps show only the pattern, so include %Y-%m-%d for the date. /config offers the presets; a pattern is set here.'), timeZone: () => h().optional().describe('IANA time zone for times shown in the UI, e.g. "UTC" or "Europe/Dublin". Default: the system time zone. An unknown name falls back to the system time zone.'), doneMeansMerged: () => x().optional().describe("@internal When true, Claude keeps working until the PR is ready for you to merge, a cron/Monitor is armed to resume later, or it hands you a self-contained next step."), totalTokensReminder: () => B(["off", "infinite", "fixed", "countdown", "padded-countdown"]).optional().describe("@internal Emit a <total_tokens>N tokens left</total_tokens> block in the system prompt, after each tool result, and (when totalTokensReminderAfterUserTurn is on) after each regular user prompt. 'infinite' uses the literal value Infinite, 'fixed' uses 5000000, 'countdown' uses the live remaining context-window tokens, 'padded-countdown' counts down from totalTokensReminderBudget (re-anchoring to the full budget on each regular user prompt when totalTokensReminderAfterUserTurn is on — task-budget semantics). Defaults to padded-countdown for a model with the total_tokens_reminder capability, else off. Env var CLAUDE_CODE_TOTAL_TOKENS_REMINDER overrides."), totalTokensReminderBudget: () => q().int().positive().optional().describe("@internal Starting budget (tokens) for totalTokensReminder 'padded-countdown' mode. Defaults to 15000000. Server-controlled via GrowthBook; env var CLAUDE_CODE_TOTAL_TOKENS_REMINDER_BUDGET overrides."), totalTokensReminderAfterUserTurn: () => x().optional().describe("@internal When true, emit the totalTokensReminder block after each regular user prompt and (for 'padded-countdown') re-anchor the task budget to the full configured value at the start of each user turn. When false, the reminder appears only in the system prompt and after each tool-result batch, and 'padded-countdown' counts down over the whole session. Defaults to on. Env var CLAUDE_CODE_TOTAL_TOKENS_REMINDER_AFTER_USER_TURN overrides; server-controlled via GrowthBook tengu_lapis_anchor_user_turn."), autoMemoryEnabled: () => x().optional().describe("Enable auto-memory for this project. When false, Claude will not read from or write to the auto-memory directory."), autoMemoryDirectory: () => h().optional().describe("Custom directory path for auto-memory storage. Supports ~/ prefix for home directory expansion. Ignored if set in projectSettings (checked-in .claude/settings.json) for security. When unset, defaults to ~/.claude/projects/<sanitized-cwd>/memory/."), ...false, autoDreamEnabled: () => x().optional().describe("Enable background memory consolidation (auto-dream). When set, overrides the server-side default."), showThinkingSummaries: () => x().optional().describe("Request API-side thinking summaries and show them in the conversation and in the transcript view (ctrl+o). Set explicitly to override the default for your install."), skipDangerousModePermissionPrompt: () => x().optional().describe("Whether the user has accepted the bypass permissions mode dialog"), skipWorkflowUsageWarning: () => x().optional().describe("@internal Whether the user has accepted the multi-agent workflow usage warning. Until set, auto permission mode prompts before running a workflow."), disableAutoMode: () => B(["disable"]).optional().describe("Disable auto mode"), remoteTools: () => O({ allowUnattendedServing: x().optional().describe("@internal When false in managed or user settings, a cloud session in auto mode may not run commands on this computer without a person approving each one, whatever consent the computer has given; a project, local or --settings value is ignored. Default: true.") }).optional().describe("@internal How this computer serves tool calls to cloud sessions"), sshConfigs: () => k(O({ id: h().describe("Unique identifier for this SSH config. Used to match configs across settings sources."), name: h().describe("Display name for the SSH connection"), sshHost: h().describe('SSH host in format "user@hostname" or "hostname", or a host alias from ~/.ssh/config'), sshPort: q().int().optional().describe("SSH port (default: 22)"), sshIdentityFile: h().optional().describe("Path to SSH identity file (private key)"), startDirectory: h().optional().describe("Default working directory on the remote host. Supports tilde expansion (e.g. ~/projects). If not specified, defaults to the remote user home directory. Can be overridden by the [dir] positional argument in `claude ssh <config> [dir]`.") })).optional().describe("SSH connection configurations for remote environments. Typically set in managed settings by enterprise administrators to pre-configure SSH connections for team members."), sshHostCommands: () => fe().meta({ type: "array" }).optional().describe("SSH connections in Claude Desktop on macOS and Linux whose host comes from a command. A list of entries, each with `id`, `name` and `command`, and optionally `sshIdentityFile` and `startDirectory`. When you ask Desktop to create or replace an entry's host, it runs `command` on this computer: a program name or absolute path, followed by plain arguments. There is no shell, so quotes, pipes, variables and a leading `~` do not work. The command must print only the host on standard output: `host` or `user@host` on one line, or a JSON object with `sshHost` and, optionally, `sshPort` and `startDirectory`. Desktop reads this key only from user settings and from this computer's managed settings. Claude Code itself does not use it."), claudeMd: () => h().optional().describe("CLAUDE.md-style instructions injected as organization-managed memory. Only honored from managed/policy settings."), claudeMdExcludes: () => k(h()).optional().describe('Glob patterns or absolute paths of CLAUDE.md files to exclude from loading. Patterns are matched against absolute file paths using picomatch. Only applies to User, Project, and Local memory types (Managed/policy files cannot be excluded). Examples: "/home/user/monorepo/CLAUDE.md", "**/code/CLAUDE.md", "**/some-dir/.claude/rules/**"'), pluginTrustMessage: () => h().optional().describe('Custom message to append to the plugin trust warning shown before installation. Only read from policy settings (managed-settings.json / MDM). Useful for enterprise administrators to add organization-specific context (e.g., "All plugins from our internal marketplace are vetted and approved.").'), theme: () => re([B(G2), h().startsWith("custom:").transform((o) => o)]).optional().catch(void 0).describe("Color theme for the UI"), editorMode: () => B(j2).optional().catch(void 0).describe("Key binding mode for the prompt input"), keybindingFlavor: () => B(["classic", "readline"]).optional().catch(void 0).describe("Deprecated: no longer has any effect. The prompt's word-editing keys always follow Bash (readline) conventions."), vimInsertModeRemaps: () => W(h(), fe()).optional().catch(void 0).describe('Vim INSERT-mode key-sequence remaps, e.g. {"jj": "<Esc>"}. Each key is exactly two printable characters typed in sequence; "<Esc>" (return to NORMAL mode) is the only supported target. Applies when editorMode is "vim".'), verbose: () => x().optional().describe("Show full tool output instead of truncated summaries"), preferredNotifChannel: () => B(H2).optional().catch(void 0).describe("Preferred OS notification channel"), autoCompactEnabled: () => x().optional().describe("Automatically compact conversation when context fills"), precomputeCompactionEnabled: () => x().optional().describe("Precompute the compaction summary in the background before it is needed. Only applies when auto-compact is on."), idleCompaction: () => x().optional().describe("Set to false to stop Claude Code from compacting a long conversation while the session is idle. Defaults to true."), switchModelsOnFlag: () => x().optional().describe("When safeguards flag a message, automatically switch to a different model to keep chatting. When off, your session will pause instead."), autoContinueAtUsageLimit: () => x().optional().describe("When a claude.ai usage limit stops your session, wait for the limit to reset and continue the task automatically. When off, the limit dialog offers the wait as a choice instead."), autoScrollEnabled: () => x().optional().describe("Auto-scroll the conversation view to bottom (fullscreen mode only)"), wheelScrollAccelerationEnabled: () => x().optional().describe("Ramp mouse-wheel scroll speed during fast scrolls (fullscreen mode only)"), fileCheckpointingEnabled: () => x().optional().describe("Snapshot files before edits so /rewind can restore them"), showTurnDuration: () => x().optional().describe('Show "Cooked for Nm Ns" after each assistant turn'), showMessageTimestamps: () => x().optional().describe("Stamp each message with its arrival time"), terminalProgressBarEnabled: () => x().optional().describe("Emit OSC 9;4 progress sequences during long operations"), todoFeatureEnabled: () => x().optional().describe("Enable the todo / task tracking panel"), teammateMode: () => B(K2).optional().catch(void 0).describe("How spawned teammates execute (tmux, iterm2, in-process, auto)"), remoteControlAtStartup: () => x().optional().describe("Start Remote Control bridge automatically each session"), remoteControl: () => O({ shareHostProfile: B(iy).optional().catch(void 0).describe("@internal What a Remote Control environment reports about this machine when it registers: 'off' reports nothing, 'basic' the OS, architecture and detected developer tools, 'full' also the names of MCP servers configured on this machine (never a repository's .mcp.json). When unset, the level comes from the feature rollout, which may be any of the three. Managed, --settings and user settings choose the level (the most restrictive wins); project and local settings can only lower it, never raise it. Read when Remote Control starts; lowering it later applies from the next registration, raising it from the next start.") }).optional().describe("@internal Remote Control (`claude remote-control`) options"), isolatePeerMachines: () => x().optional().describe("Require explicit approval before SendMessage can reach a peer session on another machine via Remote Control"), daemonColdStart: () => B(["transient", "ask"]).optional().describe("When no background service is running: 'transient' spawns one for this login session; 'ask' offers to install it persistently"), crossSessionInbound: () => B(Up).optional().catch(void 0).describe("Inbound cross-session peer messages (SendMessage from your other sessions): 'accept' delivers them, 'hold' parks them for your review without letting Claude act, 'refuse' opts this session out. An explicit value always wins. Unset (mode parity): a message auto-delivers only when the sending session's permission-mode class matches yours (bypass↔bypass or prompting↔prompting); a mismatched sender's message is held for your approval; a sender that asserts no class is held only while this session bypasses permission prompts."), autoUploadSessions: () => x().optional().describe("Mirror local sessions to claude.ai as view-only (no remote control)"), inputNeededNotifEnabled: () => x().optional().describe("Push to mobile when a permission prompt or question is waiting"), agentPushNotifEnabled: () => x().optional().describe("Allow Claude to push proactive mobile notifications"), ...C_(OY(e10), (o) => () => o) };
}
function mx(e10, t = {}) {
  let n = tZ(e10, t);
  return new vc(n).whole();
}
var Iqe = /* @__PURE__ */ new Set(), cy = P(() => new vc(tZ(Dc()), Iqe));
P(() => cy().whole());
var gx = P(() => {
  let e10 = cy();
  return Ao().flatMap(({ path: t, restrictive: n }) => {
    if (t.length !== 1 || t[0] === "strictPluginOnlyCustomization" || t[0] === "disableAllHooks" || typeof n !== "boolean" && typeof n !== "string") return [];
    let r = t[0], o = e10.field(r);
    if (o === void 0 || o instanceof Vm) return [];
    return [{ key: r, restrictive: n, field: o }];
  });
});
P(() => ["strictKnownMarketplaces", "blockedMarketplaces", "strictPluginOnlyCustomization", ...gx().map((e10) => e10.key)]);
var rZ = "(unreadable)";
P(() => new Map(Ao().flatMap(({ path: e10, restrictive: t }) => e10.length > 1 ? [[e10.join("."), ma(t)[0]]] : [])));
new RegExp(`[${k2("<")}]`, "gu");
var zqe = ["SSL_CERT_FILE", "NODE_EXTRA_CA_CERTS", "REQUESTS_CA_BUNDLE", "CURL_CA_BUNDLE", "CLOUDSDK_CORE_CUSTOM_CA_CERTS_FILE", "HTTPLIB2_CA_CERTS"], Hqe = ["AWS_CA_BUNDLE", "DENO_CERT", "CARGO_HTTP_CAINFO", "PIP_CERT", "GIT_SSL_CAINFO", "GRPC_DEFAULT_SSL_ROOTS_FILE_PATH", "NIX_SSL_CERT_FILE", "HEX_CACERTS_PATH"], dZ = [...zqe, ...Hqe], pZ = { UV_NATIVE_TLS: "true", DENO_TLS_CA_STORE: "system,mozilla" };
var jqe = Object.freeze(["-c", "core.hooksPath=/dev/null", "-c", "core.fsmonitor="]);
var Bqe = Object.freeze({ GIT_LFS_SKIP_SMUDGE: "1" });
var Kqe = ["'alias.remote-none=version'", "'alias.remote-none.command=version'", "'alias.remote-/.command=version'", "'fetch.bundleURI='", "'help.autocorrect=0'"], Gqe = Kqe.join(" ");
Object.freeze({ GIT_ALLOW_PROTOCOL: "/", GIT_CONFIG_PARAMETERS: Gqe, GIT_NO_LAZY_FETCH: "1", GIT_NO_REPLACE_OBJECTS: "1", GIT_TERMINAL_PROMPT: "0", ...Bqe });
Object.freeze([...jqe, "-c", "safe.bareRepository=explicit", "-c", "protocol.file.allow=never"]);
var Ax = ["GIT_DIR", "GIT_WORK_TREE", "GIT_COMMON_DIR", "GIT_INDEX_FILE", "GIT_CEILING_DIRECTORIES", "GIT_DISCOVERY_ACROSS_FILESYSTEM", "GIT_OBJECT_DIRECTORY", "GIT_ALTERNATE_OBJECT_DIRECTORIES", "GIT_SHALLOW_FILE", "GIT_NAMESPACE", "GIT_IMPLICIT_WORK_TREE", "GIT_REFERENCE_BACKEND"], Rx = [...Ax, "GIT_CONFIG_COUNT", "GIT_CONFIG_PARAMETERS", "GIT_CONFIG_GLOBAL", "GIT_CONFIG_SYSTEM", "GIT_CONFIG"];
new Set(Rx);
var Tx = ["NODE_TLS_REJECT_UNAUTHORIZED", "BUN_TLS_REFUSE_DISTRUSTED_KEYS"];
var gZ = ["YARN_HTTP_PROXY", "YARN_HTTPS_PROXY", "npm_config_proxy", "npm_config_https_proxy", "npm_config_noproxy", "GLOBAL_AGENT_HTTP_PROXY", "GLOBAL_AGENT_HTTPS_PROXY", "GLOBAL_AGENT_NO_PROXY", "DOCKER_HTTP_PROXY", "DOCKER_HTTPS_PROXY", "ELECTRON_GET_USE_PROXY", "CLOUDSDK_PROXY_TYPE", "CLOUDSDK_PROXY_ADDRESS", "CLOUDSDK_PROXY_PORT", "CLOUDSDK_PROXY_USERNAME", "CLOUDSDK_PROXY_PASSWORD", "FSSPEC_GCS", "JAVA_TOOL_OPTIONS"];
var wx = ["CLAUDE_CODE_USE_BEDROCK", "CLAUDE_CODE_USE_VERTEX", "CLAUDE_CODE_USE_FOUNDRY", "CLAUDE_CODE_USE_ANTHROPIC_AWS", "CLAUDE_CODE_USE_ANTHROPIC_GOOGLE_CLOUD", "CLAUDE_CODE_USE_MANTLE", "CLAUDE_CODE_USE_GATEWAY", "ANTHROPIC_FOUNDRY_RESOURCE", "ANTHROPIC_VERTEX_PROJECT_ID", "ANTHROPIC_AWS_WORKSPACE_ID", "ANTHROPIC_GOOGLE_CLOUD_PROJECT", "ANTHROPIC_GOOGLE_CLOUD_LOCATION", "ANTHROPIC_GOOGLE_CLOUD_WORKSPACE_ID", "CLOUD_ML_REGION"];
var EZ = ["CLAUDE_CODE_MEMORY_API_BASE_URL", "CLAUDE_CODE_MEMORY_API_TOKEN"];
var bZ = ["CLAUDE_CODE_ARTIFACTS_API_BASE_URL", "CLAUDE_CODE_ARTIFACTS_API_TOKEN", "CLAUDE_CODE_ARTIFACT_ASSET_BASE_URL", "CLAUDE_CODE_ARTIFACT_LIVE_BASE_URL", "CLAUDE_CODE_ARTIFACT_SYNC_BASE_URL", "CLAUDE_CODE_ARTIFACT_VIEWER_BASE_URL"], vx = ["ANTHROPIC_BASE_URL", "_CLAUDE_CODE_ASSUME_FIRST_PARTY_BASE_URL", "ANTHROPIC_BEDROCK_BASE_URL", "ANTHROPIC_VERTEX_BASE_URL", "ANTHROPIC_FOUNDRY_BASE_URL", "ANTHROPIC_AWS_BASE_URL", "ANTHROPIC_GOOGLE_CLOUD_BASE_URL", "ANTHROPIC_BEDROCK_MANTLE_BASE_URL", ...bZ, ...EZ], Zqe = [{ endpoint: "ANTHROPIC_BASE_URL", companions: ["_CLAUDE_CODE_ASSUME_FIRST_PARTY_BASE_URL", "ANTHROPIC_CUSTOM_HEADERS"] }, { endpoint: "ANTHROPIC_BEDROCK_BASE_URL", selection: "CLAUDE_CODE_USE_BEDROCK", companions: ["CLAUDE_CODE_SKIP_BEDROCK_AUTH", "ANTHROPIC_CUSTOM_HEADERS"] }, { endpoint: "ANTHROPIC_VERTEX_BASE_URL", selection: "CLAUDE_CODE_USE_VERTEX", companions: ["CLAUDE_CODE_SKIP_VERTEX_AUTH", "ANTHROPIC_CUSTOM_HEADERS"] }, { endpoint: "ANTHROPIC_FOUNDRY_BASE_URL", selection: "CLAUDE_CODE_USE_FOUNDRY", companions: ["CLAUDE_CODE_SKIP_FOUNDRY_AUTH", "ANTHROPIC_CUSTOM_HEADERS"] }, { endpoint: "ANTHROPIC_AWS_BASE_URL", selection: "CLAUDE_CODE_USE_ANTHROPIC_AWS", companions: ["CLAUDE_CODE_SKIP_ANTHROPIC_AWS_AUTH", "ANTHROPIC_CUSTOM_HEADERS"] }, { endpoint: "ANTHROPIC_GOOGLE_CLOUD_BASE_URL", selection: "CLAUDE_CODE_USE_ANTHROPIC_GOOGLE_CLOUD", companions: ["CLAUDE_CODE_SKIP_ANTHROPIC_GOOGLE_CLOUD_AUTH", "ANTHROPIC_CUSTOM_HEADERS"] }, { endpoint: "ANTHROPIC_BEDROCK_MANTLE_BASE_URL", selection: "CLAUDE_CODE_USE_MANTLE", companions: ["CLAUDE_CODE_SKIP_MANTLE_AUTH", "ANTHROPIC_CUSTOM_HEADERS"] }];
Lt(Zqe.flatMap((e10) => [e10.endpoint, ...e10.companions]));
var kx = ["ANTHROPIC_API_KEY", "ANTHROPIC_AUTH_TOKEN", "CLAUDE_CODE_OAUTH_TOKEN", "AWS_BEARER_TOKEN_BEDROCK", "ANTHROPIC_FOUNDRY_API_KEY", "ANTHROPIC_FOUNDRY_AUTH_TOKEN", "ANTHROPIC_AWS_API_KEY"];
var Px = ["CLAUDE_CODE_SKIP_BEDROCK_AUTH", "CLAUDE_CODE_SKIP_VERTEX_AUTH", "CLAUDE_CODE_SKIP_FOUNDRY_AUTH", "CLAUDE_CODE_SKIP_ANTHROPIC_AWS_AUTH", "CLAUDE_CODE_SKIP_ANTHROPIC_GOOGLE_CLOUD_AUTH", "CLAUDE_CODE_SKIP_MANTLE_AUTH"], Xqe = ["AWS_ACCESS_KEY_ID", "AWS_SECRET_ACCESS_KEY", "AWS_SESSION_TOKEN"], Lx = [...Xqe, "AWS_PROFILE", "AWS_CONFIG_FILE", "AWS_SHARED_CREDENTIALS_FILE", "GOOGLE_APPLICATION_CREDENTIALS", "GOOGLE_CLOUD_PROJECT"];
var $p = ["AWS_CONTAINER_CREDENTIALS_FULL_URI", "AWS_CONTAINER_CREDENTIALS_RELATIVE_URI", "AWS_CONTAINER_AUTHORIZATION_TOKEN", "AWS_CONTAINER_AUTHORIZATION_TOKEN_FILE", "AWS_EC2_METADATA_SERVICE_ENDPOINT", "AWS_EC2_METADATA_SERVICE_ENDPOINT_MODE", "AWS_WEB_IDENTITY_TOKEN_FILE", "AWS_ROLE_ARN"], Mx = ["GCE_METADATA_HOST", "GCE_METADATA_ROOT", "GCE_METADATA_IP", "METADATA_SERVER_DETECTION"];
var CZ = ["SSL_CERT_FILE", "SSL_CERT_DIR", "ALL_PROXY"], Qqe = ["NPM_CONFIG_HTTPS_PROXY", "NPM_CONFIG_HTTP_PROXY", "NPM_CONFIG_PROXY"], eYe = new Set(Ax), tYe = /* @__PURE__ */ new Set(["HTTP_PROXY", "HTTPS_PROXY", "ALL_PROXY", "NO_PROXY", "CLAUDE_CODE_HTTP_PROXY", "CLAUDE_CODE_HTTPS_PROXY", "NPM_CONFIG_PROXY", "NPM_CONFIG_HTTP_PROXY", "NPM_CONFIG_HTTPS_PROXY"]);
Lt([...dZ, ...Object.keys(pZ), ...gZ.map((e10) => e10.toUpperCase()), ...CZ, ...Rx.filter((e10) => !eYe.has(e10))]).filter((e10) => e10 !== "NODE_EXTRA_CA_CERTS" && e10 !== "JAVA_TOOL_OPTIONS" && !tYe.has(e10));
var AZ = ["HTTPS_PROXY", "HTTP_PROXY", "NO_PROXY", ...CZ, ...Qqe, "NODE_EXTRA_CA_CERTS", "CLAUDE_CODE_CERT_STORE", "CLAUDE_CODE_CLIENT_CERT", "CLAUDE_CODE_CLIENT_KEY", "CLAUDE_CODE_CLIENT_KEY_PASSPHRASE", ...Tx];
var LYe = /* @__PURE__ */ new Set(["dns", "unix", "ipv4", "ipv6"]);
/* @__PURE__ */ new Set([...LYe, "http", "https", "ws", "wss", "ftp", "file", "grpc", "grpcs", "otlp", "xds", "tcp", "udp", "tls", "h2", "h2c", "http2"]);
new Set([...AZ, "CLAUDE_CODE_PROXY_RESOLVES_HOSTS", "CLAUDE_CODE_ENABLE_PROXY_AUTH_HELPER", "CLAUDE_CODE_PROXY_AUTH_HELPER_TTL_MS", "API_FORCE_IDLE_TIMEOUT", "ANTHROPIC_UNIX_SOCKET", "NODE_OPTIONS", ...wx, ...vx, "AWS_ENDPOINT_URL_STS", "AWS_ENDPOINT_URL", "AWS_ENDPOINT_URL_SSO", "AWS_ENDPOINT_URL_SSO_OIDC", "AWS_ENDPOINT_URL_BEDROCK", "AWS_ENDPOINT_URL_BEDROCK_RUNTIME", ...Lx, ...$p, ...Mx, "CLOUDSDK_CONFIG", "GOOGLE_EXTERNAL_ACCOUNT_ALLOW_EXECUTABLES", "GCLOUD_PROJECT", "CLAUDE_CODE_CUSTOM_OAUTH_URL", ...kx, "CLAUDE_CODE_API_BASE_URL", "CLAUDE_CODE_OAUTH_REFRESH_TOKEN", "CLAUDE_CODE_OAUTH_SCOPES", "CLAUDE_CODE_OAUTH_CLIENT_ID", "CLAUDE_CODE_SESSION_ACCESS_TOKEN", "CLAUDE_SESSION_INGRESS_TOKEN_FILE", "CLAUDE_CODE_ENVIRONMENT_KIND", "CLAUDE_CODE_REMOTE_SESSION_ID", "ANTHROPIC_FEDERATION_RULE_ID", "ANTHROPIC_ORGANIZATION_ID", "ANTHROPIC_WORKSPACE_ID", "ANTHROPIC_SERVICE_ACCOUNT_ID", "ANTHROPIC_IDENTITY_TOKEN", "ANTHROPIC_IDENTITY_TOKEN_FILE", "ANTHROPIC_SCOPE", "ANTHROPIC_PROFILE", "ANTHROPIC_CONFIG_DIR", "CLAUDE_CODE_FEDERATION_CACHE_DIR", "HOME", "XDG_CONFIG_HOME", "APPDATA", "USERPROFILE", "HOMEDRIVE", "HOMEPATH", "PROGRAMDATA", "ALLUSERSPROFILE", "ANTHROPIC_CUSTOM_HEADERS", "CLAUDE_CODE_HOST_CREDS_FILE", "CLAUDE_CODE_PROVIDER_MANAGED_BY_HOST", "CLAUDE_CODE_HOST_AUTH_ENV_VAR", "CLAUDE_CONFIG_DIR", "CLAUDE_SECURESTORAGE_CONFIG_DIR", "CLAUDE_CODE_REMOTE_SETTINGS_PATH", "CLAUDE_CODE_MANAGED_SETTINGS_PATH", "CLAUDE_CODE_DISABLE_ADMIN_ENV_UNION", "CLAUDE_CODE_MOCK_REMOTE_SETTINGS", "USE_LOCAL_OAUTH", "USE_STAGING_OAUTH", "CLAUDE_LOCAL_OAUTH_API_BASE", "CLAUDE_LOCAL_OAUTH_APPS_BASE", "CLAUDE_LOCAL_OAUTH_CONSOLE_BASE", "CLAUDE_BRIDGE_BASE_URL", "CLAUDE_BRIDGE_OAUTH_TOKEN", "CLAUDE_BRIDGE_SESSION_INGRESS_URL", "CLAUDE_REMOTE_TOOLS_BRIDGE_URL", "CLAUDE_CODE_GB_BASE_URL"].map((e10) => e10.toUpperCase()));
process.platform === "darwin" ? 16777216 : process.platform === "linux" || process.platform === "android" ? 524288 : 0;
process.platform === "darwin" ? 536870912 : 0;
process.platform === "linux" || process.platform === "android" ? 2097152 : 0;
process.platform === "linux" || process.platform === "android" ? un$1.constants.O_NOATIME ?? 0 : 0;
var Fc = ["CLAUDE_CODE_USE_BEDROCK", "CLAUDE_CODE_USE_FOUNDRY", "CLAUDE_CODE_USE_ANTHROPIC_AWS", "CLAUDE_CODE_USE_ANTHROPIC_GOOGLE_CLOUD", "CLAUDE_CODE_USE_MANTLE", "CLAUDE_CODE_USE_VERTEX"];
var iZe = { opus: "ANTHROPIC_DEFAULT_OPUS_MODEL", sonnet: "ANTHROPIC_DEFAULT_SONNET_MODEL", haiku: "ANTHROPIC_DEFAULT_HAIKU_MODEL", fable: "ANTHROPIC_DEFAULT_FABLE_MODEL" }, aZe = ["ANTHROPIC_BEDROCK_BASE_URL", "ANTHROPIC_BEDROCK_MANTLE_BASE_URL", "ANTHROPIC_VERTEX_BASE_URL", "ANTHROPIC_FOUNDRY_BASE_URL"], E4 = [...Fc, "AWS_REGION", "AWS_PROFILE", ...aZe, "AWS_BEARER_TOKEN_BEDROCK", ...Px, "ANTHROPIC_VERTEX_PROJECT_ID", "CLOUD_ML_REGION", "ANTHROPIC_FOUNDRY_RESOURCE"];
[...E4, "ANTHROPIC_BEDROCK_SERVICE_TIER", ...Object.values(iZe), "ANTHROPIC_SMALL_FAST_MODEL", "ANTHROPIC_SMALL_FAST_MODEL_AWS_REGION", "ANTHROPIC_CUSTOM_HEADERS"];
var dZe = ["projectSettings", "localSettings"];
new Set(dZe);
P(() => mx(Dc(), { strictPolicyHelperKeys: true }).strict());
new Set(Zo);
var H9 = [["allowManagedMcpServersOnly", "allowedMcpServers"], ["enforceAvailableModels", "availableModels"]];
[...H9.map(([e10]) => e10), "allowManagedPermissionRulesOnly", "allowManagedHooksOnly", "disableAllHooks", "allowedHttpHookUrls", "httpHookAllowedEnvVars", "strictPluginOnlyCustomization", "sandbox.network.allowManagedDomainsOnly", "sandbox.filesystem.allowManagedReadPathsOnly", "sandbox.enabled"];
new FinalizationRegistry(({ parentSignalRef: e10, handler: t }) => {
  e10.deref()?.removeEventListener("abort", t);
});
var V9e = "ask-withdrawn-by-asker";
new DOMException(V9e, "AbortError");
({ "user-cancel": new DOMException("user-cancel", "AbortError"), "remote-cancel": new DOMException("remote-cancel", "AbortError"), shutdown: new DOMException("shutdown", "AbortError"), interrupt: new DOMException("interrupt", "AbortError"), "turn-abort": new DOMException("turn-abort", "AbortError"), background: new DOMException("background", "AbortError"), "refusal-fallback-edit": new DOMException("refusal-fallback-edit", "AbortError"), "recovery-timeout": new DOMException("recovery-timeout", "AbortError"), "permission-stop": new DOMException("permission-stop", "AbortError") });
var q9e = "server-fallback-tombstone";
new DOMException(q9e, "AbortError");
var Y9e = "subagent-park";
new DOMException(Y9e, "AbortError");
var Z9e = /hooks\.slack\.com\/(?:services|workflows|triggers)\/[A-Za-z0-9/_-]+/gi;
var J9e = [/\bBearer\s{1,512}(?=[A-Za-z0-9._~+/=-](?:[A-Za-z0-9._~+/=-]|%(?!20)[0-9A-Fa-f]{2}){15})(?:eyJ|(?=(?:[A-Za-z0-9._~+/=-]|%(?!20)[0-9A-Fa-f]{2}){0,64}[0-9=]))/i, /:\s{0,512}Basic\s{1,512}(?=[A-Za-z0-9+/=]{16})(?=[A-Za-z0-9+/=]{0,64}[0-9=])/i, /\bsk-(?=[A-Za-z0-9_-]{20})(?=[A-Za-z0-9_-]{0,64}[0-9])/];
var h6 = [[nf("sk-ant-", "[A-Za-z0-9_-]", 8, Ev(8)), "<token>"], [nf("sk-(?:proj|svcacct|admin)-", "[A-Za-z0-9_-]", 20, Ev(20)), "<token>"]], _6 = ["AKIA", "ASIA", "ABIA", "ACCA", "A3T[A-Z0-9]"], X9e = `(?:${_6.join("|")})`, y6 = [[new RegExp(`(^|[^A-Za-z0-9+])${X9e}[A-Z0-9]{16}(?![A-Za-z0-9+=])`, "g"), "$1<token>"]], S6 = [[nf("gh[opusr]_", "[A-Za-z0-9]", 20, qc("[A-Za-z0-9]")), "<token>"], [/github_pat_[A-Za-z0-9_]{82,}/g, "<token>"], [/sq0(?:atp|csp)-[A-Za-z0-9_-]{22,}/g, "<token>"], [/(^|[^A-Za-z0-9+/])EAAA[A-Za-z0-9+/=%_-]{56,}/g, "$1<token>"], [nf("gl(?:pat|dt|rt|ft|soat|oas|agent|ptt|cbt|imt|ffct)-", "[A-Za-z0-9_=-]", 20, qc("[A-Za-z0-9_=-]"), "(?:\\.[0-9a-z]{9})?"), "<token>"], [nf("(?:xox[abe-z](?:\\.xox[a-z])?|xapp|xwfp)-", "[A-Za-z0-9+/=%_-]", 10, "(?=[0-9])", "", qc("[A-Za-z0-9+/=%_-]"), "gi"), "<token>"], [new RegExp(`(?:\\bxox[cd]-[A-Za-z0-9+/=%_-]{10,}|xox[cd]-${qc("[A-Za-z0-9+/=%_-]")}[A-Za-z0-9+/=%_-]{16,})`, "gi"), "<token>"], [Z9e, "hooks.slack.com/<redacted>"]];
var e6e = /\beyJ(?:[A-Za-z0-9_-]{256}|[A-Za-z0-9_-]{8,2048}\.[A-Za-z0-9_-]{10})/, E6 = [[/(^|[^A-Za-z0-9+_-])AIza[A-Za-z0-9_-]{35}(?![A-Za-z0-9+=_-])/g, "$1<token>"], [/(^|[^A-Za-z0-9+_-])GOCSPX-[A-Za-z0-9_-]{28}(?![A-Za-z0-9+=_-])/g, "$1<token>"]], b6 = [[/(^|[^A-Za-z0-9+_-])[sr]k_(?:live|test|prod)_(?=[A-Za-z0-9]{0,64}[0-9])[A-Za-z0-9]{24,}(?![A-Za-z0-9+=_-])/g, "$1<token>"]];
[...J9e, ...[...h6, ...y6, ...S6, ...E6, ...b6].map(([e10]) => new RegExp(e10.source, e10.flags.replaceAll("g", ""))), e6e];
function nf(e10, t, n, r, o = "", s = "", i = "g") {
  let a = `${t}{${n},}${o}`;
  return new RegExp(`(?:\\b${e10}${s}${a}|${e10}${r}${a})`, i);
}
function qc(e10) {
  return `(?=${e10}{0,64}[0-9])`;
}
function Ev(e10) {
  return `(?=[A-Za-z0-9_-]{0,64}?(?=[A-Za-z0-9]{${e10}})(?=[A-Za-z0-9]{0,64}[0-9])(?=[A-Za-z0-9]{0,64}[A-Za-z]))`;
}
var K6 = typeof globalThis === "object" ? globalThis : global;
var ds = "1.9.0";
var G6 = /^(\d+)\.(\d+)\.(\d+)(-(.+))?$/;
function T6e(e10) {
  var t = /* @__PURE__ */ new Set([e10]), n = /* @__PURE__ */ new Set(), r = e10.match(G6);
  if (!r) return function() {
    return false;
  };
  var o = { major: +r[1], minor: +r[2], patch: +r[3], prerelease: r[4] };
  if (o.prerelease != null) return function(l) {
    return l === e10;
  };
  function s(a) {
    return n.add(a), false;
  }
  function i(a) {
    return t.add(a), true;
  }
  return function(l) {
    if (t.has(l)) return true;
    if (n.has(l)) return false;
    var c = l.match(G6);
    if (!c) return s(l);
    var d = { major: +c[1], minor: +c[2], patch: +c[3], prerelease: c[4] };
    if (d.prerelease != null) return s(l);
    if (o.major !== d.major) return s(l);
    if (o.major === 0) {
      if (o.minor === d.minor && o.patch <= d.patch) return i(l);
      return s(l);
    }
    if (o.minor <= d.minor) return i(l);
    return s(l);
  };
}
var W6 = T6e(ds);
var w6e = ds.split(".")[0], of = /* @__PURE__ */ Symbol.for("opentelemetry.js.api." + w6e), sf = K6;
function Jc(e10, t, n, r) {
  var o;
  if (r === void 0) r = false;
  var s = sf[of] = (o = sf[of]) !== null && o !== void 0 ? o : { version: ds };
  if (!r && s[e10]) {
    var i = Error("@opentelemetry/api: Attempted duplicate registration of API: " + e10);
    return n.error(i.stack || i.message), false;
  }
  if (s.version !== ds) {
    var i = Error("@opentelemetry/api: Registration of version v" + s.version + " for " + e10 + " does not match previously registered API v" + ds);
    return n.error(i.stack || i.message), false;
  }
  return s[e10] = t, n.debug("@opentelemetry/api: Registered a global for " + e10 + " v" + ds + "."), true;
}
function ps(e10) {
  var t, n, r = (t = sf[of]) === null || t === void 0 ? void 0 : t.version;
  if (!r || !W6(r)) return;
  return (n = sf[of]) === null || n === void 0 ? void 0 : n[e10];
}
function Xc(e10, t) {
  t.debug("@opentelemetry/api: Unregistering a global for " + e10 + " v" + ds + ".");
  var n = sf[of];
  if (n) delete n[e10];
}
var x6e = function(e10, t) {
  var n = typeof Symbol === "function" && e10[Symbol.iterator];
  if (!n) return e10;
  var r = n.call(e10), o, s = [], i;
  try {
    while ((t === void 0 || t-- > 0) && !(o = r.next()).done) s.push(o.value);
  } catch (a) {
    i = { error: a };
  } finally {
    try {
      if (o && !o.done && (n = r.return)) n.call(r);
    } finally {
      if (i) throw i.error;
    }
  }
  return s;
}, v6e = function(e10, t, n) {
  if (arguments.length === 2) {
    for (var r = 0, o = t.length, s; r < o; r++) if (s || !(r in t)) {
      if (!s) s = Array.prototype.slice.call(t, 0, r);
      s[r] = t[r];
    }
  }
  return e10.concat(s || Array.prototype.slice.call(t));
}, V6 = (function() {
  function e10(t) {
    this._namespace = t.namespace || "DiagComponentLogger";
  }
  return e10.prototype.debug = function() {
    var t = [];
    for (var n = 0; n < arguments.length; n++) t[n] = arguments[n];
    return af("debug", this._namespace, t);
  }, e10.prototype.error = function() {
    var t = [];
    for (var n = 0; n < arguments.length; n++) t[n] = arguments[n];
    return af("error", this._namespace, t);
  }, e10.prototype.info = function() {
    var t = [];
    for (var n = 0; n < arguments.length; n++) t[n] = arguments[n];
    return af("info", this._namespace, t);
  }, e10.prototype.warn = function() {
    var t = [];
    for (var n = 0; n < arguments.length; n++) t[n] = arguments[n];
    return af("warn", this._namespace, t);
  }, e10.prototype.verbose = function() {
    var t = [];
    for (var n = 0; n < arguments.length; n++) t[n] = arguments[n];
    return af("verbose", this._namespace, t);
  }, e10;
})();
function af(e10, t, n) {
  var r = ps("diag");
  if (!r) return;
  return n.unshift(t), r[e10].apply(r, v6e([], x6e(n), false));
}
var kn;
(function(e10) {
  e10[e10.NONE = 0] = "NONE", e10[e10.ERROR = 30] = "ERROR", e10[e10.WARN = 50] = "WARN", e10[e10.INFO = 60] = "INFO", e10[e10.DEBUG = 70] = "DEBUG", e10[e10.VERBOSE = 80] = "VERBOSE", e10[e10.ALL = 9999] = "ALL";
})(kn || (kn = {}));
function q6(e10, t) {
  if (e10 < kn.NONE) e10 = kn.NONE;
  else if (e10 > kn.ALL) e10 = kn.ALL;
  t = t || {};
  function n(r, o) {
    var s = t[r];
    if (typeof s === "function" && e10 >= o) return s.bind(t);
    return function() {
    };
  }
  return { error: n("error", kn.ERROR), warn: n("warn", kn.WARN), info: n("info", kn.INFO), debug: n("debug", kn.DEBUG), verbose: n("verbose", kn.VERBOSE) };
}
var k6e = function(e10, t) {
  var n = typeof Symbol === "function" && e10[Symbol.iterator];
  if (!n) return e10;
  var r = n.call(e10), o, s = [], i;
  try {
    while ((t === void 0 || t-- > 0) && !(o = r.next()).done) s.push(o.value);
  } catch (a) {
    i = { error: a };
  } finally {
    try {
      if (o && !o.done && (n = r.return)) n.call(r);
    } finally {
      if (i) throw i.error;
    }
  }
  return s;
}, P6e = function(e10, t, n) {
  if (arguments.length === 2) {
    for (var r = 0, o = t.length, s; r < o; r++) if (s || !(r in t)) {
      if (!s) s = Array.prototype.slice.call(t, 0, r);
      s[r] = t[r];
    }
  }
  return e10.concat(s || Array.prototype.slice.call(t));
}, I6e = "diag", ki = (function() {
  function e10() {
    function t(o) {
      return function() {
        var s = [];
        for (var i = 0; i < arguments.length; i++) s[i] = arguments[i];
        var a = ps("diag");
        if (!a) return;
        return a[o].apply(a, P6e([], k6e(s), false));
      };
    }
    var n = this, r = function(o, s) {
      var i, a, l;
      if (s === void 0) s = { logLevel: kn.INFO };
      if (o === n) {
        var c = Error("Cannot use diag as the logger for itself. Please use a DiagLogger implementation like ConsoleDiagLogger or a custom implementation");
        return n.error((i = c.stack) !== null && i !== void 0 ? i : c.message), false;
      }
      if (typeof s === "number") s = { logLevel: s };
      var d = ps("diag"), p = q6((a = s.logLevel) !== null && a !== void 0 ? a : kn.INFO, o);
      if (d && !s.suppressOverrideMessage) {
        var f = (l = Error().stack) !== null && l !== void 0 ? l : "<failed to generate stacktrace>";
        d.warn("Current logger will be overwritten from " + f), p.warn("Current logger will overwrite one already registered from " + f);
      }
      return Jc("diag", p, n, true);
    };
    n.setLogger = r, n.disable = function() {
      Xc(I6e, n);
    }, n.createComponentLogger = function(o) {
      return new V6(o);
    }, n.verbose = t("verbose"), n.debug = t("debug"), n.info = t("info"), n.warn = t("warn"), n.error = t("error");
  }
  return e10.instance = function() {
    if (!this._instance) this._instance = new e10();
    return this._instance;
  }, e10;
})();
var D6e = function(e10, t) {
  var n = typeof Symbol === "function" && e10[Symbol.iterator];
  if (!n) return e10;
  var r = n.call(e10), o, s = [], i;
  try {
    while ((t === void 0 || t-- > 0) && !(o = r.next()).done) s.push(o.value);
  } catch (a) {
    i = { error: a };
  } finally {
    try {
      if (o && !o.done && (n = r.return)) n.call(r);
    } finally {
      if (i) throw i.error;
    }
  }
  return s;
}, L6e = function(e10) {
  var t = typeof Symbol === "function" && Symbol.iterator, n = t && e10[t], r = 0;
  if (n) return n.call(e10);
  if (e10 && typeof e10.length === "number") return { next: function() {
    if (e10 && r >= e10.length) e10 = void 0;
    return { value: e10 && e10[r++], done: !e10 };
  } };
  throw TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.");
}, Y6 = (function() {
  function e10(t) {
    this._entries = t ? new Map(t) : /* @__PURE__ */ new Map();
  }
  return e10.prototype.getEntry = function(t) {
    var n = this._entries.get(t);
    if (!n) return;
    return Object.assign({}, n);
  }, e10.prototype.getAllEntries = function() {
    return Array.from(this._entries.entries()).map(function(t) {
      var n = D6e(t, 2), r = n[0], o = n[1];
      return [r, o];
    });
  }, e10.prototype.setEntry = function(t, n) {
    var r = new e10(this._entries);
    return r._entries.set(t, n), r;
  }, e10.prototype.removeEntry = function(t) {
    var n = new e10(this._entries);
    return n._entries.delete(t), n;
  }, e10.prototype.removeEntries = function() {
    var t, n, r = [];
    for (var o = 0; o < arguments.length; o++) r[o] = arguments[o];
    var s = new e10(this._entries);
    try {
      for (var i = L6e(r), a = i.next(); !a.done; a = i.next()) {
        var l = a.value;
        s._entries.delete(l);
      }
    } catch (c) {
      t = { error: c };
    } finally {
      try {
        if (a && !a.done && (n = i.return)) n.call(i);
      } finally {
        if (t) throw t.error;
      }
    }
    return s;
  }, e10.prototype.clear = function() {
    return new e10();
  }, e10;
})();
ki.instance();
function Z6(e10) {
  if (e10 === void 0) e10 = {};
  return new Y6(new Map(Object.entries(e10)));
}
function J6(e10) {
  return Symbol.for(e10);
}
var M6e = /* @__PURE__ */ (function() {
  function e10(t) {
    var n = this;
    n._currentContext = t ? new Map(t) : /* @__PURE__ */ new Map(), n.getValue = function(r) {
      return n._currentContext.get(r);
    }, n.setValue = function(r, o) {
      var s = new e10(n._currentContext);
      return s._currentContext.set(r, o), s;
    }, n.deleteValue = function(r) {
      var o = new e10(n._currentContext);
      return o._currentContext.delete(r), o;
    };
  }
  return e10;
})(), X6 = new M6e();
var Q6 = { get: function(e10, t) {
  if (e10 == null) return;
  return e10[t];
}, keys: function(e10) {
  if (e10 == null) return [];
  return Object.keys(e10);
} }, e32 = { set: function(e10, t, n) {
  if (e10 == null) return;
  e10[t] = n;
} };
var N6e = function(e10, t) {
  var n = typeof Symbol === "function" && e10[Symbol.iterator];
  if (!n) return e10;
  var r = n.call(e10), o, s = [], i;
  try {
    while ((t === void 0 || t-- > 0) && !(o = r.next()).done) s.push(o.value);
  } catch (a) {
    i = { error: a };
  } finally {
    try {
      if (o && !o.done && (n = r.return)) n.call(r);
    } finally {
      if (i) throw i.error;
    }
  }
  return s;
}, U6e = function(e10, t, n) {
  if (arguments.length === 2) {
    for (var r = 0, o = t.length, s; r < o; r++) if (s || !(r in t)) {
      if (!s) s = Array.prototype.slice.call(t, 0, r);
      s[r] = t[r];
    }
  }
  return e10.concat(s || Array.prototype.slice.call(t));
}, t3 = (function() {
  function e10() {
  }
  return e10.prototype.active = function() {
    return X6;
  }, e10.prototype.with = function(t, n, r) {
    var o = [];
    for (var s = 3; s < arguments.length; s++) o[s - 3] = arguments[s];
    return n.call.apply(n, U6e([r], N6e(o), false));
  }, e10.prototype.bind = function(t, n) {
    return n;
  }, e10.prototype.enable = function() {
    return this;
  }, e10.prototype.disable = function() {
    return this;
  }, e10;
})();
var F6e = function(e10, t) {
  var n = typeof Symbol === "function" && e10[Symbol.iterator];
  if (!n) return e10;
  var r = n.call(e10), o, s = [], i;
  try {
    while ((t === void 0 || t-- > 0) && !(o = r.next()).done) s.push(o.value);
  } catch (a) {
    i = { error: a };
  } finally {
    try {
      if (o && !o.done && (n = r.return)) n.call(r);
    } finally {
      if (i) throw i.error;
    }
  }
  return s;
}, $6e = function(e10, t, n) {
  if (arguments.length === 2) {
    for (var r = 0, o = t.length, s; r < o; r++) if (s || !(r in t)) {
      if (!s) s = Array.prototype.slice.call(t, 0, r);
      s[r] = t[r];
    }
  }
  return e10.concat(s || Array.prototype.slice.call(t));
}, xv = "context", z6e = new t3(), $y = (function() {
  function e10() {
  }
  return e10.getInstance = function() {
    if (!this._instance) this._instance = new e10();
    return this._instance;
  }, e10.prototype.setGlobalContextManager = function(t) {
    return Jc(xv, t, ki.instance());
  }, e10.prototype.active = function() {
    return this._getContextManager().active();
  }, e10.prototype.with = function(t, n, r) {
    var o, s = [];
    for (var i = 3; i < arguments.length; i++) s[i - 3] = arguments[i];
    return (o = this._getContextManager()).with.apply(o, $6e([t, n, r], F6e(s), false));
  }, e10.prototype.bind = function(t, n) {
    return this._getContextManager().bind(t, n);
  }, e10.prototype._getContextManager = function() {
    return ps(xv) || z6e;
  }, e10.prototype.disable = function() {
    this._getContextManager().disable(), Xc(xv, ki.instance());
  }, e10;
})();
$y.getInstance();
var n3 = (function() {
  function e10() {
  }
  return e10.prototype.inject = function(t, n) {
  }, e10.prototype.extract = function(t, n) {
    return t;
  }, e10.prototype.fields = function() {
    return [];
  }, e10;
})();
var kv = J6("OpenTelemetry Baggage Key");
function Pv(e10) {
  return e10.getValue(kv) || void 0;
}
function r3() {
  return Pv($y.getInstance().active());
}
function o3(e10, t) {
  return e10.setValue(kv, t);
}
function s3(e10) {
  return e10.deleteValue(kv);
}
var Iv = "propagation", H6e = new n3(), i3 = (function() {
  function e10() {
    this.createBaggage = Z6, this.getBaggage = Pv, this.getActiveBaggage = r3, this.setBaggage = o3, this.deleteBaggage = s3;
  }
  return e10.getInstance = function() {
    if (!this._instance) this._instance = new e10();
    return this._instance;
  }, e10.prototype.setGlobalPropagator = function(t) {
    return Jc(Iv, t, ki.instance());
  }, e10.prototype.inject = function(t, n, r) {
    if (r === void 0) r = e32;
    return this._getGlobalPropagator().inject(t, n, r);
  }, e10.prototype.extract = function(t, n, r) {
    if (r === void 0) r = Q6;
    return this._getGlobalPropagator().extract(t, n, r);
  }, e10.prototype.fields = function() {
    return this._getGlobalPropagator().fields();
  }, e10.prototype.disable = function() {
    Xc(Iv, ki.instance());
  }, e10.prototype._getGlobalPropagator = function() {
    return ps(Iv) || H6e;
  }, e10;
})();
i3.getInstance();
function Uv(e10) {
  let t = pn.resolve(e10 ?? "."), n;
  try {
    n = un$1.realpathSync(t);
  } catch {
    n = t;
  }
  return Ye(n);
}
function Pn(e10, t) {
  let n = Uv(e10);
  return qr(n);
}
process.env.NoDefaultCurrentDirectoryInExePath = "1";
async function zGt(e10, t) {
  if (t?.sessionStore) return B3e(t.sessionStore, e10, t);
  return F0(e10, t);
}
function z3(e10) {
  return e10.map((t) => ae(t)).join(`
`) + `
`;
}
function B3(e10, t) {
  let n = Buffer.from(e10, "utf-8"), r = n.length, o = n.subarray(0, En).toString("utf-8"), s = r > En ? n.subarray(r - En).toString("utf-8") : o;
  return { mtime: t, size: r, head: o, tail: s };
}
function H3e(e10) {
  let t = e10.trimEnd(), n = t.slice(t.lastIndexOf(`
`) + 1);
  try {
    let r = je(n);
    if (typeof r === "object" && r !== null && "timestamp" in r && typeof r.timestamp === "string") {
      let o = Date.parse(r.timestamp);
      if (!Number.isNaN(o)) return o;
    }
  } catch {
  }
  return Date.now();
}
async function K3(e10, t, n) {
  let r = Pn(n), o = await e10.load({ projectKey: r, sessionId: t });
  if (!o || o.length === 0) return null;
  return z3(o);
}
async function B3e(e10, t, n) {
  if (!Ve(t)) return;
  let r = await K3(e10, t, n.dir);
  if (!r) return;
  let o = B3(r, H3e(r));
  return gl(t, o) ?? void 0;
}
require$$2$1.parentPort.on(
  "message",
  async ({ id: id2, threadId, cwd }) => {
    try {
      const info = await zGt(threadId, { dir: cwd });
      require$$2$1.parentPort.postMessage({
        id: id2,
        name: info?.sessionId === threadId ? info.customTitle : void 0
      });
    } catch {
      require$$2$1.parentPort.postMessage({ id: id2 });
    }
  }
);
//# sourceMappingURL=claudeMetadataWorker.js.map

//# debugId=05ff3219-27dd-54f7-b019-28983a2648a3
