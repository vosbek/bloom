
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="6195a550-eca2-57bc-8a0f-bda30fe06bc5")}catch(e){}}();
import { gP as jsxRuntimeExports } from "./index-nrW_ocxo.js";
import { a as SetupView } from "./SetupView-CUJajtTh.js";
import "./ExplanationPageHeader-C2XeRG4B.js";
import "./hash-DXS7Ca7H.js";
import "./SuggestionDiff-D6FifeP0.js";
import "./FileDiff-CNuZdHKn.js";
import "./FileViewer-DHqmfXyV.js";
import "./writeConflict-BhJC2K4f.js";
function SetupRoute({ app }) {
  const { onOpenSetup, artifactSyncEnabled } = app;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    SetupView,
    {
      contentOnly: true,
      artifactSyncEnabled,
      deepLink: app.setupDeepLink,
      onOpenGlobalEntry: (source, entryName) => onOpenSetup({ source, entryName }),
      onOpenConversation: app.onSelectedConversationRefChange,
      sharePromotionVariant: app.sharePromotionVariant,
      onOpenSharePage: () => app.onSettingsSectionChange("share")
    }
  );
}
export {
  SetupRoute
};
//# sourceMappingURL=SetupRoute-CL6W8htO.js.map

//# debugId=6195a550-eca2-57bc-8a0f-bda30fe06bc5
