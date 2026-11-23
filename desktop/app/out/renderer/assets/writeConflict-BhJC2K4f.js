
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="edb193af-aa47-5da8-b8e2-d9e1c694c4af")}catch(e){}}();
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
function isSetupWriteConflict(error) {
  if (error instanceof SetupWriteConflictError) return true;
  if (typeof error === "object" && error !== null) {
    const code = error.code;
    if (code === SETUP_WRITE_CONFLICT_CODE) return true;
    const message = error.message;
    if (typeof message === "string" && message.includes(SETUP_WRITE_CONFLICT_CODE)) return true;
  }
  return typeof error === "string" && error.includes(SETUP_WRITE_CONFLICT_CODE);
}
export {
  SetupWriteConflictError as S,
  isSetupWriteConflict as i
};
//# sourceMappingURL=writeConflict-BhJC2K4f.js.map

//# debugId=edb193af-aa47-5da8-b8e2-d9e1c694c4af
