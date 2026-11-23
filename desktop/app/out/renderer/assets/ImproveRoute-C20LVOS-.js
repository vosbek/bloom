
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="9d06466c-d6cd-56c0-b8b9-4939365e981e")}catch(e){}}();
import { iX as useHostedData, iY as useHostedNavigation, gP as jsxRuntimeExports, bU as HostedPage } from "./index-nrW_ocxo.js";
import { I as ImprovePage } from "./ImprovePage-DSaRYyc7.js";
function ImproveRoute() {
  const { host, state, loaded, pending, act } = useHostedData();
  const { setPage, setSelected, openProject } = useHostedNavigation();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(HostedPage, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    ImprovePage,
    {
      host,
      state,
      loaded,
      pending,
      act,
      onOpenProject: openProject,
      onOpenDelivery: (deliveryId) => {
        setPage("deliveries");
        setSelected(deliveryId);
      }
    }
  ) });
}
export {
  ImproveRoute
};
//# sourceMappingURL=ImproveRoute-C20LVOS-.js.map

//# debugId=9d06466c-d6cd-56c0-b8b9-4939365e981e
