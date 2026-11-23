"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="594a6466-3ad2-5a3e-bf2f-c6e7d54b6fa4")}catch(e){}}();

Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const legacyExclusions = require("./legacyExclusions-DC3wHYCy.js");
const _n = require("node:path");
const fs = require("node:fs");
const Nl = require("node:os");
const index = require("./index-DaMMxjo0.js");
const pn = require("path");
const require$$0 = require("os");
const promises = require("node:timers/promises");
const require$$0$1 = require("node:fs/promises");
require("./identity-C50QOXIb.js");
require("./deliveryBriefs-CbTihYeZ.js");
require("./flowerUnlocks-C4stZB4n.js");
require("./repositoryKey-CSvrvo7G.js");
require("./desktopSearch-UUzZxN96.js");
require("node:assert");
require("node:net");
require("node:http");
require("node:stream");
require("node:querystring");
require("node:events");
require("node:diagnostics_channel");
require("node:util");
require("node:tls");
require("node:buffer");
require("node:zlib");
require("node:perf_hooks");
require("node:util/types");
require("node:crypto");
require("node:sqlite");
require("node:worker_threads");
require("node:url");
require("node:async_hooks");
require("node:console");
require("node:timers");
require("node:dns");
require("zlib");
require("events");
require("stream");
require("node:https");
require("fs");
require("child_process");
require("assert");
require("buffer");
require("util");
require("node:string_decoder");
require("stream/promises");
require("fs/promises");
require("node:constants");
function _interopNamespaceDefault(e) {
  const n = Object.create(null, { [Symbol.toStringTag]: { value: "Module" } });
  if (e) {
    for (const k in e) {
      if (k !== "default") {
        const d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: () => e[k]
        });
      }
    }
  }
  n.default = e;
  return Object.freeze(n);
}
const _n__namespace = /* @__PURE__ */ _interopNamespaceDefault(_n);
const require$$0__namespace = /* @__PURE__ */ _interopNamespaceDefault(require$$0$1);
const ZodIssueCode = {
  custom: "custom"
};
const json = legacyExclusions.string().transform((jsonString, ctx) => {
  try {
    return JSON.parse(jsonString);
  } catch (err) {
    ctx.addIssue({
      code: ZodIssueCode.custom,
      message: `Invalid JSON: ${err.message}`
    });
    return legacyExclusions.NEVER;
  }
});
var lib$1;
var hasRequiredLib$1;
function requireLib$1() {
  if (hasRequiredLib$1) return lib$1;
  hasRequiredLib$1 = 1;
  const os = require$$0;
  const paths = pn;
  const isWinOS = /^win/i.test(process.platform);
  function normalize_path(path) {
    return paths.normalize(paths.join(path, "."));
  }
  const base = () => {
    const { env } = process;
    const object = {};
    object.home = () => normalize_path(os.homedir ? os.homedir() : env.HOME);
    object.temp = () => normalize_path(os.tmpdir ? os.tmpdir() : env.TMPDIR || env.TEMP || env.TMP);
    return object;
  };
  const windows = () => {
    const { env } = process;
    const object = {};
    object.home = () => normalize_path(
      os.homedir ? os.homedir() : env.USERPROFILE || paths.join(env.HOMEDRIVE, env.HOMEPATH) || env.HOME
    );
    object.temp = () => normalize_path(
      os.tmpdir ? os.tmpdir() : env.TEMP || env.TMP || paths.join(env.LOCALAPPDATA || env.SystemRoot || env.windir, "Temp")
    );
    return object;
  };
  class _OSPaths {
    constructor() {
      const OSPaths = function() {
        return new _OSPaths();
      };
      this._fn = OSPaths;
      const extension = isWinOS ? windows() : base();
      Object.keys(extension).forEach((key) => {
        this._fn[key] = extension[key];
      });
      return this._fn;
    }
  }
  lib$1 = new _OSPaths();
  return lib$1;
}
var lib;
var hasRequiredLib;
function requireLib() {
  if (hasRequiredLib) return lib;
  hasRequiredLib = 1;
  const path = pn;
  const osPaths = requireLib$1();
  const linux = () => {
    const object = {};
    object.cache = () => process.env.XDG_CACHE_HOME || path.join(osPaths.home() || osPaths.temp(), ".cache");
    object.config = () => process.env.XDG_CONFIG_HOME || path.join(osPaths.home() || osPaths.temp(), ".config");
    object.data = () => process.env.XDG_DATA_HOME || path.join(osPaths.home() || osPaths.temp(), ".local", "share");
    object.runtime = () => process.env.XDG_RUNTIME_DIR || void 0;
    object.state = () => process.env.XDG_STATE_HOME || path.join(osPaths.home() || osPaths.temp(), ".local", "state");
    return object;
  };
  const macos = () => {
    const object = {};
    object.cache = () => process.env.XDG_CACHE_HOME || path.join(path.join(osPaths.home() || osPaths.temp(), "Library"), "Caches");
    object.config = () => process.env.XDG_CONFIG_HOME || path.join(path.join(osPaths.home() || osPaths.temp(), "Library"), "Preferences");
    object.data = () => process.env.XDG_DATA_HOME || path.join(path.join(osPaths.home() || osPaths.temp(), "Library"), "Application Support");
    object.runtime = () => process.env.XDG_RUNTIME_DIR || void 0;
    object.state = () => process.env.XDG_STATE_HOME || path.join(path.join(osPaths.home() || osPaths.temp(), "Library"), "State");
    return object;
  };
  const windows = () => {
    const object = {};
    object.cache = () => {
      const localAppData = process.env.LOCALAPPDATA || path.join(osPaths.home() || osPaths.temp(), "AppData", "Local");
      return process.env.XDG_CACHE_HOME || path.join(localAppData, "xdg.cache");
    };
    object.config = () => {
      const appData = process.env.APPDATA || path.join(osPaths.home() || osPaths.temp(), "AppData", "Roaming");
      return process.env.XDG_CONFIG_HOME || path.join(appData, "xdg.config");
    };
    object.data = () => {
      const appData = process.env.APPDATA || path.join(osPaths.home() || osPaths.temp(), "AppData", "Roaming");
      return process.env.XDG_DATA_HOME || path.join(appData, "xdg.data");
    };
    object.runtime = () => process.env.XDG_RUNTIME_DIR || void 0;
    object.state = () => {
      const localAppData = process.env.LOCALAPPDATA || path.join(osPaths.home() || osPaths.temp(), "AppData", "Local");
      return process.env.XDG_STATE_HOME || path.join(localAppData, "xdg.state");
    };
    return object;
  };
  const _XDGPortable = () => {
    const XDGPortable = function() {
      return _XDGPortable();
    };
    let extension = {};
    if (/^darwin$/i.test(process.platform)) {
      extension = macos();
    } else if (/^win/i.test(process.platform)) {
      extension = windows();
    } else {
      extension = linux();
    }
    extension.configDirs = () => {
      const dirs = [];
      dirs.push(extension.config());
      if (process.env.XDG_CONFIG_DIRS) {
        dirs.push(...process.env.XDG_CONFIG_DIRS.split(path.delimiter));
      }
      return dirs;
    };
    extension.dataDirs = () => {
      const dirs = [];
      dirs.push(extension.data());
      if (process.env.XDG_DATA_DIRS) {
        dirs.push(...process.env.XDG_DATA_DIRS.split(path.delimiter));
      }
      return dirs;
    };
    Object.keys(extension).forEach((key) => {
      XDGPortable[key] = extension[key];
    });
    return XDGPortable;
  };
  lib = _XDGPortable();
  return lib;
}
var xdgAppPaths;
var hasRequiredXdgAppPaths;
function requireXdgAppPaths() {
  if (hasRequiredXdgAppPaths) return xdgAppPaths;
  hasRequiredXdgAppPaths = 1;
  const path = pn;
  const os = require$$0;
  const xdg = requireLib();
  const isWinOS = /^win/i.test(process.platform);
  function _normalizeOptions(options, isolated) {
    options = options || {};
    if (typeof options !== "object") {
      options = { isolated: options };
    }
    options.isolated = options.isolated === void 0 || options.isolated === null ? isolated : options.isolated;
    if (typeof options.isolated !== "boolean") {
      throw new TypeError(`Expected boolean for "isolated" argument, got ${typeof options.isolated}`);
    }
    return options;
  }
  const base = (name, isolated) => {
    const object = {};
    object.cache = (options = { isolated: null }) => {
      options = _normalizeOptions(options, isolated);
      return path.join(xdg.cache(), options.isolated ? name : "");
    };
    object.config = (options = { isolated: null }) => {
      options = _normalizeOptions(options, isolated);
      return path.join(xdg.config(), options.isolated ? name : "");
    };
    object.data = (options = { isolated: null }) => {
      options = _normalizeOptions(options, isolated);
      return path.join(xdg.data(), options.isolated ? name : "");
    };
    object.runtime = (options = { isolated: null }) => {
      options = _normalizeOptions(options, isolated);
      return xdg.runtime() ? path.join(xdg.runtime(), options.isolated ? name : "") : void 0;
    };
    object.state = (options = { isolated: null }) => {
      options = _normalizeOptions(options, isolated);
      return path.join(xdg.state(), options.isolated ? name : "");
    };
    object.configDirs = (options = { isolated: null }) => {
      options = _normalizeOptions(options, isolated);
      return xdg.configDirs().map((s) => path.join(s, options.isolated ? name : ""));
    };
    object.dataDirs = (options = { isolated: null }) => {
      options = _normalizeOptions(options, isolated);
      return xdg.dataDirs().map((s) => path.join(s, options.isolated ? name : ""));
    };
    return object;
  };
  const windows = (name, isolated) => {
    const { env } = process;
    const homedir = os.homedir();
    const tmpdir = os.tmpdir();
    const appData = env.APPDATA || path.join(homedir || tmpdir, "AppData", "Roaming");
    const localAppData = env.LOCALAPPDATA || path.join(homedir || tmpdir, "AppData", "Local");
    const object = {};
    object.cache = (options = { isolated: null }) => {
      options = _normalizeOptions(options, isolated);
      return !options.isolated || env.XDG_CACHE_HOME ? path.join(xdg.cache(), options.isolated ? name : "") : path.join(localAppData, options.isolated ? name : "", "Cache");
    };
    object.config = (options = { isolated: null }) => {
      options = _normalizeOptions(options, isolated);
      const config = !options.isolated || env.XDG_CONFIG_HOME ? path.join(xdg.config(), options.isolated ? name : "") : path.join(appData, options.isolated ? name : "", "Config");
      return config;
    };
    object.data = (options = { isolated: null }) => {
      options = _normalizeOptions(options, isolated);
      const data = !options.isolated || env.XDG_DATA_HOME ? path.join(xdg.data(), options.isolated ? name : "") : path.join(appData, options.isolated ? name : "", "Data");
      return data;
    };
    object.runtime = (options = { isolated: null }) => {
      options = _normalizeOptions(options, isolated);
      return xdg.runtime() ? path.join(xdg.runtime(), options.isolated ? name : "") : void 0;
    };
    object.state = (options = { isolated: null }) => {
      options = _normalizeOptions(options, isolated);
      return !options.isolated || env.XDG_STATE_HOME ? path.join(xdg.state(), options.isolated ? name : "") : path.join(localAppData, options.isolated ? name : "", "State");
    };
    object.configDirs = (options = { isolated: null }) => {
      options = _normalizeOptions(options, isolated);
      const dirs = [object.config(options)];
      if (env.XDG_CONFIG_DIRS) {
        dirs.push(...env.XDG_CONFIG_DIRS.split(path.delimiter).map((s) => path.join(s, options.isolated ? name : "")));
      }
      return dirs;
    };
    object.dataDirs = (options = { isolated: null }) => {
      options = _normalizeOptions(options, isolated);
      const dirs = [object.data(options)];
      if (env.XDG_DATA_DIRS) {
        dirs.push(...env.XDG_DATA_DIRS.split(path.delimiter).map((s) => path.join(s, options.isolated ? name : "")));
      }
      return dirs;
    };
    return object;
  };
  class _XDGAppPaths {
    constructor(options = { name: null, suffix: null, isolated: true }) {
      const XDGAppPaths2 = function(options2 = { name: null, suffix: null, isolated: true }) {
        return new _XDGAppPaths(options2);
      };
      this._fn = XDGAppPaths2;
      options = options || {};
      if (typeof options !== "object") {
        options = { name: options };
      }
      let name = options.name || "";
      if (typeof name !== "string") {
        throw new TypeError(`Expected string for "name" argument, got ${typeof name}`);
      }
      const suffix = options.suffix || "";
      if (typeof suffix !== "string") {
        throw new TypeError(`Expected string for "suffix" argument, got ${typeof suffix}`);
      }
      const isolated = options.isolated === void 0 || options.isolated === null ? true : options.isolated;
      if (typeof isolated !== "boolean") {
        throw new TypeError(`Expected boolean for "isolated" argument, got ${typeof isolated}`);
      }
      if (!name) {
        name = path.parse(process.pkg ? process.execPath : require.main ? require.main.filename : process.argv[0]).name;
      }
      if (suffix) {
        name += suffix;
      }
      this._fn.$name = () => name;
      this._fn.$isolated = () => isolated;
      const extension = isWinOS ? windows(name, isolated) : base(name, isolated);
      Object.keys(extension).forEach((key) => {
        this._fn[key] = extension[key];
      });
      return this._fn;
    }
  }
  xdgAppPaths = new _XDGAppPaths();
  return xdgAppPaths;
}
var xdgAppPathsExports = requireXdgAppPaths();
const XDGAppPaths = /* @__PURE__ */ index.getDefaultExportFromCjs(xdgAppPathsExports);
const ZodDate = legacyExclusions.number().transform((seconds) => /* @__PURE__ */ new Date(seconds * 1e3));
const AuthFile = legacyExclusions.object({
  token: legacyExclusions.string().min(1).optional(),
  refreshToken: legacyExclusions.string().min(1).optional(),
  expiresAt: ZodDate.optional()
});
const StoredAuthFile = json.pipe(AuthFile);
const isDirectory = (path$1) => {
  try {
    return fs.lstatSync(path$1).isDirectory();
  } catch (_) {
    return false;
  }
};
const getGlobalPathConfig = () => {
  if (process.env.VERCEL_AUTH_CONFIG_DIR) return process.env.VERCEL_AUTH_CONFIG_DIR;
  const vercelDirectories = XDGAppPaths("com.vercel.cli").dataDirs();
  return [
    ...vercelDirectories,
    _n.join(Nl.homedir(), ".now"),
    ...XDGAppPaths("now").dataDirs()
  ].find((configPath) => isDirectory(configPath)) || vercelDirectories[0];
};
const getAuth = () => {
  try {
    const pathname = _n.join(getGlobalPathConfig(), "auth.json");
    return StoredAuthFile.parse(fs.readFileSync(pathname, "utf8"));
  } catch {
    return null;
  }
};
function updateAuthConfig(config) {
  const pathname = _n.join(getGlobalPathConfig(), "auth.json");
  fs.mkdirSync(_n.dirname(pathname), { recursive: true });
  const content = {
    token: config.token,
    expiresAt: config.expiresAt && Math.round(config.expiresAt.getTime() / 1e3),
    refreshToken: config.refreshToken
  };
  fs.writeFileSync(pathname, JSON.stringify(content) + "\n");
}
const USER_AGENT = `${require$$0.hostname()} @ vercel/sandbox/${index.VERSION} node-${process.version} ${require$$0.platform()} (${require$$0.arch()})`;
const ISSUER = new URL("https://vercel.com");
const CLIENT_ID = "cl_HYyOPBNtFMfHhaUn9L4QPfTZz6TP47bp";
const AuthorizationServerMetadata = legacyExclusions.object({
  issuer: legacyExclusions.string().url(),
  device_authorization_endpoint: legacyExclusions.string().url(),
  token_endpoint: legacyExclusions.string().url(),
  revocation_endpoint: legacyExclusions.string().url(),
  jwks_uri: legacyExclusions.string().url(),
  introspection_endpoint: legacyExclusions.string().url()
});
let _as;
const DeviceAuthorization = legacyExclusions.object({
  device_code: legacyExclusions.string(),
  user_code: legacyExclusions.string(),
  verification_uri: legacyExclusions.string().url(),
  verification_uri_complete: legacyExclusions.string().url(),
  expires_in: legacyExclusions.number(),
  interval: legacyExclusions.number()
});
const IntrospectionResponse = legacyExclusions.object({
  active: legacyExclusions.literal(true),
  client_id: legacyExclusions.string(),
  session_id: legacyExclusions.string()
}).or(legacyExclusions.object({ active: legacyExclusions.literal(false) }));
async function authorizationServerMetadata() {
  if (_as) return _as;
  const response = await fetch(new URL(".well-known/openid-configuration", ISSUER), { headers: {
    "Content-Type": "application/json",
    "user-agent": USER_AGENT
  } });
  _as = AuthorizationServerMetadata.parse(await response.json());
  return _as;
}
async function OAuth() {
  const as = await authorizationServerMetadata();
  return {
    async deviceAuthorizationRequest() {
      const json2 = await (await fetch(as.device_authorization_endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "user-agent": USER_AGENT
        },
        body: new URLSearchParams({
          client_id: CLIENT_ID,
          scope: "openid offline_access"
        })
      })).json();
      const parsed = DeviceAuthorization.safeParse(json2);
      if (!parsed.success) throw new OAuthError("Failed to parse device authorization response from the Vercel authorization server.", json2);
      return {
        device_code: parsed.data.device_code,
        user_code: parsed.data.user_code,
        verification_uri: parsed.data.verification_uri,
        verification_uri_complete: parsed.data.verification_uri_complete,
        expiresAt: Date.now() + parsed.data.expires_in * 1e3,
        interval: parsed.data.interval
      };
    },
    async deviceAccessTokenRequest(device_code) {
      try {
        return [null, await fetch(as.token_endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "user-agent": USER_AGENT
          },
          body: new URLSearchParams({
            client_id: CLIENT_ID,
            grant_type: "urn:ietf:params:oauth:grant-type:device_code",
            device_code
          }),
          signal: AbortSignal.timeout(10 * 1e3)
        })];
      } catch (error) {
        if (error instanceof Error) return [error];
        return [new Error("An unknown error occurred. See the logs for details.", { cause: error })];
      }
    },
    async processTokenResponse(response) {
      const json2 = await response.json();
      const processed = TokenSet.safeParse(json2);
      if (!processed.success) return [new OAuthError("Failed to parse token response from the Vercel authorization server.", json2)];
      return [null, processed.data];
    },
    async revokeToken(token) {
      const response = await fetch(as.revocation_endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "user-agent": USER_AGENT
        },
        body: new URLSearchParams({
          token,
          client_id: CLIENT_ID
        })
      });
      if (response.ok) return;
      return new OAuthError("Revocation request failed", await response.json());
    },
    async refreshToken(token) {
      const response = await fetch(as.token_endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "user-agent": USER_AGENT
        },
        body: new URLSearchParams({
          client_id: CLIENT_ID,
          grant_type: "refresh_token",
          refresh_token: token
        })
      });
      const [tokensError, tokenSet] = await this.processTokenResponse(response);
      if (tokensError) throw tokensError;
      return tokenSet;
    },
    async introspectToken(token) {
      const json2 = await (await fetch(as.introspection_endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "user-agent": USER_AGENT
        },
        body: new URLSearchParams({ token })
      })).json();
      const processed = IntrospectionResponse.safeParse(json2);
      if (!processed.success) throw new OAuthError("Failed to parse introspection response from the Vercel authorization server.", json2);
      return processed.data;
    }
  };
}
const TokenSet = legacyExclusions.object({
  access_token: legacyExclusions.string(),
  token_type: legacyExclusions.literal("Bearer"),
  expires_in: legacyExclusions.number(),
  refresh_token: legacyExclusions.string().optional(),
  scope: legacyExclusions.string().optional()
});
const OAuthErrorResponse = legacyExclusions.object({
  error: legacyExclusions._enum([
    "invalid_request",
    "invalid_client",
    "invalid_grant",
    "unauthorized_client",
    "unsupported_grant_type",
    "invalid_scope",
    "server_error",
    "authorization_pending",
    "slow_down",
    "access_denied",
    "expired_token",
    "unsupported_token_type"
  ]),
  error_description: legacyExclusions.string().optional(),
  error_uri: legacyExclusions.string().optional()
});
function processOAuthErrorResponse(json2) {
  try {
    return OAuthErrorResponse.parse(json2);
  } catch (error) {
    if (error instanceof legacyExclusions.ZodError) return /* @__PURE__ */ new TypeError(`Invalid OAuth error response: ${error.message}`);
    return /* @__PURE__ */ new TypeError("Failed to parse OAuth error response");
  }
}
var OAuthError = class extends Error {
  constructor(message, response) {
    super(message);
    this.name = "OAuthError";
    const error = processOAuthErrorResponse(response);
    if (error instanceof TypeError) {
      this.cause = /* @__PURE__ */ new Error("Unexpected response from the Vercel authorization server.");
      this.code = "server_error";
      return;
    }
    let cause = error.error;
    if (error.error_description) cause += `: ${error.error_description}`;
    if (error.error_uri) cause += ` (${error.error_uri})`;
    this.cause = new Error(cause);
    this.code = error.error;
  }
};
function isOAuthError(error) {
  return error instanceof OAuthError;
}
async function* pollForToken({ request, oauth }) {
  const controller = new AbortController();
  try {
    let intervalMs = request.interval * 1e3;
    while (Date.now() < request.expiresAt) {
      const [tokenResponseError, tokenResponse] = await oauth.deviceAccessTokenRequest(request.device_code);
      if (tokenResponseError) {
        if (tokenResponseError.message.includes("timeout")) {
          intervalMs *= 2;
          yield {
            _tag: "Timeout",
            newInterval: intervalMs
          };
          await promises.setTimeout(intervalMs, { signal: controller.signal });
          continue;
        }
        yield {
          _tag: "Error",
          error: tokenResponseError
        };
        return;
      }
      yield {
        _tag: "Response",
        response: tokenResponse.clone()
      };
      const [tokensError, tokens] = await oauth.processTokenResponse(tokenResponse);
      if (isOAuthError(tokensError)) {
        const { code } = tokensError;
        switch (code) {
          case "authorization_pending":
            await promises.setTimeout(intervalMs, { signal: controller.signal });
            continue;
          case "slow_down":
            intervalMs += 5 * 1e3;
            yield {
              _tag: "SlowDown",
              newInterval: intervalMs
            };
            await promises.setTimeout(intervalMs, { signal: controller.signal });
            continue;
          default:
            yield {
              _tag: "Error",
              error: tokensError.cause
            };
            return;
        }
      }
      if (tokensError) {
        yield {
          _tag: "Error",
          error: tokensError
        };
        return;
      }
      updateAuthConfig({
        token: tokens.access_token,
        expiresAt: new Date(Date.now() + tokens.expires_in * 1e3),
        refreshToken: tokens.refresh_token
      });
      return;
    }
    yield {
      _tag: "Error",
      error: /* @__PURE__ */ new Error("Timed out waiting for authentication. Please try again.")
    };
    return;
  } finally {
    controller.abort();
  }
}
var NotOk = class extends Error {
  constructor(response) {
    super(`HTTP ${response.statusCode}: ${response.responseText}`);
    this.name = "NotOk";
    this.response = response;
  }
};
async function fetchApi(opts) {
  const x = await fetch(`https://vercel.com/api${opts.endpoint}`, {
    method: opts.method,
    body: opts.body,
    headers: {
      Authorization: `Bearer ${opts.token}`,
      "Content-Type": "application/json"
    }
  });
  if (!x.ok) {
    let message = await x.text();
    try {
      const { error } = JSON.parse(message);
      message = `${error.code.toUpperCase()}: ${error.message}`;
    } catch {
    }
    throw new NotOk({
      responseText: message,
      statusCode: x.status
    });
  }
  return await x.json();
}
const LinkedProjectSchema = json.pipe(legacyExclusions.object({
  projectId: legacyExclusions.string(),
  orgId: legacyExclusions.string()
}));
async function readLinkedProject(cwd) {
  const projectJsonPath = _n__namespace.join(cwd, ".vercel", "project.json");
  let content;
  try {
    content = await require$$0__namespace.readFile(projectJsonPath, "utf-8");
  } catch {
    return null;
  }
  const parsed = LinkedProjectSchema.safeParse(content);
  if (!parsed.success) return null;
  return {
    projectId: parsed.data.projectId,
    teamId: parsed.data.orgId
  };
}
const UserSchema = legacyExclusions.object({ user: legacyExclusions.object({
  defaultTeamId: legacyExclusions.string().nullable(),
  username: legacyExclusions.string()
}) });
const TeamSchema = legacyExclusions.object({
  id: legacyExclusions.string(),
  slug: legacyExclusions.string(),
  updatedAt: legacyExclusions.number().optional(),
  membership: legacyExclusions.object({ role: legacyExclusions.string() }),
  billing: legacyExclusions.object({ plan: legacyExclusions.string() })
});
const TeamsSchema = legacyExclusions.object({
  teams: legacyExclusions.array(legacyExclusions.unknown()).transform((entries) => entries.flatMap((entry) => {
    const parsed = TeamSchema.safeParse(entry);
    return parsed.success ? [parsed.data] : [];
  })),
  pagination: legacyExclusions.object({
    count: legacyExclusions.number(),
    next: legacyExclusions.number().nullable()
  })
});
const DEFAULT_PROJECT_NAME = "vercel-sandbox-default-project";
function isSkippableTeamError(e) {
  return e instanceof NotOk && (e.response.statusCode === 402 || e.response.statusCode === 403);
}
async function inferScope(opts) {
  const linkedProject = await readLinkedProject(opts.cwd ?? process.cwd());
  if (linkedProject) {
    const slugs = await resolveLinkedProjectSlugs(opts.token, linkedProject.teamId, linkedProject.projectId);
    return {
      ...linkedProject,
      created: false,
      ...slugs
    };
  }
  if (opts.teamId) return tryTeam(opts.token, opts.teamId);
  const { defaultTeamId, username } = (await fetchApi({
    token: opts.token,
    endpoint: "/v2/user"
  }).then(UserSchema.parse)).user;
  if (defaultTeamId) try {
    const result = await tryTeam(opts.token, defaultTeamId);
    try {
      const team = await fetchApi({
        token: opts.token,
        endpoint: `/v2/teams/${encodeURIComponent(defaultTeamId)}`
      }).then(legacyExclusions.object({ slug: legacyExclusions.string() }).parse);
      return {
        ...result,
        teamSlug: team.slug
      };
    } catch {
      return result;
    }
  } catch (e) {
    if (!isSkippableTeamError(e)) throw e;
  }
  let next = null;
  do {
    const endpoint = next === null ? "/v2/teams?limit=20" : `/v2/teams?limit=20&until=${next}`;
    const page = await fetchApi({
      token: opts.token,
      endpoint
    }).then(TeamsSchema.parse);
    next = page.pagination.next;
    const hobbyOwnerTeams = page.teams.filter((t) => t.membership.role === "OWNER" && t.billing.plan === "hobby");
    if (hobbyOwnerTeams.length === 0) continue;
    const bestHobbyTeam = hobbyOwnerTeams.find((t) => t.slug === username) ?? hobbyOwnerTeams.sort((a, b) => (b.updatedAt ?? 0) - (a.updatedAt ?? 0))[0];
    if (bestHobbyTeam && bestHobbyTeam.id !== defaultTeamId) try {
      return {
        ...await tryTeam(opts.token, bestHobbyTeam.id),
        teamSlug: bestHobbyTeam.slug
      };
    } catch (e) {
      if (!isSkippableTeamError(e)) throw e;
    }
  } while (next !== null);
  try {
    return {
      ...await tryTeam(opts.token, username),
      teamSlug: username
    };
  } catch (e) {
    if (!isSkippableTeamError(e)) throw e;
  }
  throw new NotOk({
    statusCode: 403,
    responseText: `Authenticated as "${username}" but none of the available teams allow sandbox creation.`
  });
}
async function tryTeam(token, teamId) {
  const teamParam = teamId.startsWith("team_") ? `teamId=${encodeURIComponent(teamId)}` : `slug=${encodeURIComponent(teamId)}`;
  let created = false;
  try {
    await fetchApi({
      token,
      endpoint: `/v2/projects/${encodeURIComponent(DEFAULT_PROJECT_NAME)}?${teamParam}`
    });
  } catch (e) {
    if (!(e instanceof NotOk) || e.response.statusCode !== 404) throw e;
    await fetchApi({
      token,
      endpoint: `/v11/projects?${teamParam}`,
      method: "POST",
      body: JSON.stringify({ name: DEFAULT_PROJECT_NAME })
    });
    created = true;
  }
  return {
    projectId: DEFAULT_PROJECT_NAME,
    teamId,
    created
  };
}
async function resolveLinkedProjectSlugs(token, teamId, projectId) {
  try {
    const teamParam = teamId.startsWith("team_") ? `teamId=${encodeURIComponent(teamId)}` : `slug=${encodeURIComponent(teamId)}`;
    const [teamData, projectData] = await Promise.all([fetchApi({
      token,
      endpoint: `/v2/teams/${encodeURIComponent(teamId)}`
    }).then(legacyExclusions.object({ slug: legacyExclusions.string() }).parse), fetchApi({
      token,
      endpoint: `/v2/projects/${encodeURIComponent(projectId)}?${teamParam}`
    }).then(legacyExclusions.object({ name: legacyExclusions.string() }).parse)]);
    return {
      teamSlug: teamData.slug,
      projectSlug: projectData.name
    };
  } catch {
    return {};
  }
}
exports.NotOk = NotOk;
exports.OAuth = OAuth;
exports.getAuth = getAuth;
exports.inferScope = inferScope;
exports.isOAuthError = isOAuthError;
exports.pollForToken = pollForToken;
exports.updateAuthConfig = updateAuthConfig;
//# sourceMappingURL=index-D27kzmbp.js.map

//# debugId=594a6466-3ad2-5a3e-bf2f-c6e7d54b6fa4
