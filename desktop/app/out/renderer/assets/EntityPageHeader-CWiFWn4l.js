
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="5990a1be-5895-517d-8a5b-19c5dc26c188")}catch(e){}}();
import { gP as jsxRuntimeExports, bQ as HeaderConceptColors, fE as cn } from "./index-nrW_ocxo.js";
function EntityPageHeader({
  title,
  layout = "standard",
  leading,
  subtitle,
  metadata,
  description,
  trailing,
  className
}) {
  const isConversation = layout === "conversation";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(HeaderConceptColors.Provider, { value: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: cn("min-w-0 py-1", className), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        "data-figma-layer": "Identity",
        className: cn(
          "flex min-w-0",
          leading && !isConversation ? "items-center" : "items-start",
          isConversation ? "gap-2.5" : "gap-3"
        ),
        children: [
          leading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              "data-figma-layer": "Leading",
              className: cn(
                "flex shrink-0 items-center justify-center",
                isConversation ? "size-9" : "min-h-10"
              ),
              children: leading
            }
          ) : null,
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              "data-figma-layer": "Content",
              className: cn("min-w-0 flex-1", isConversation || leading ? null : "pt-0.5"),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-figma-layer": "Title", className: "flex min-w-0 flex-wrap items-start gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-w-0 flex-1 basis-60", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "h1",
                    {
                      className: cn(
                        "min-w-0 font-medium tracking-[-0.02em] text-[var(--text-strong)] [font-family:var(--font-heading)]",
                        isConversation ? "truncate whitespace-nowrap text-[15px] leading-[18px]" : "text-[28px] leading-[1.4] [overflow-wrap:anywhere]"
                      ),
                      children: title
                    }
                  ) }),
                  trailing ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "data-figma-layer": "Trailing", className: "shrink-0 pt-0.5", children: trailing }) : null
                ] }),
                subtitle ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: cn(
                      "select-text min-w-0 text-[10.5px] leading-4 text-[var(--text-muted)]",
                      isConversation ? "mt-0.5" : "mt-1"
                    ),
                    children: subtitle
                  }
                ) : null
              ]
            }
          )
        ]
      }
    ),
    metadata ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        "data-figma-layer": "Metadata",
        className: "mt-3 flex flex-wrap items-center gap-x-3 gap-y-1.5 border-y border-[var(--border-subtle)] py-2 text-[10.5px] text-[var(--text-muted)]",
        children: metadata
      }
    ) : null,
    description ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2.5 text-[12px] leading-[1.55] text-[var(--text-body)]", children: description }) : null
  ] }) });
}
export {
  EntityPageHeader as E
};
//# sourceMappingURL=EntityPageHeader-CWiFWn4l.js.map

//# debugId=5990a1be-5895-517d-8a5b-19c5dc26c188
