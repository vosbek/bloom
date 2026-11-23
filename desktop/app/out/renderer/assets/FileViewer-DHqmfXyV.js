
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="a0376c1a-18d1-5bbc-8b26-525e673c143e")}catch(e){}}();
import { fR as createLucideIcon, hx as reactExports, gP as jsxRuntimeExports, ev as SubHeader, cv as Markdown, hD as remarkGfm, bR as HeadingText, bs as FilePreview, eR as Textarea } from "./index-nrW_ocxo.js";
import { i as isSetupWriteConflict } from "./writeConflict-BhJC2K4f.js";
const __iconNode = [
  [
    "path",
    {
      d: "M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915",
      key: "1i5ecw"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
];
const Settings = createLucideIcon("settings", __iconNode);
function languageFromPath(path) {
  const ext = path.split(".").pop()?.toLowerCase() ?? "";
  const map = {
    md: "markdown",
    mdc: "markdown",
    markdown: "markdown",
    ts: "tsx",
    tsx: "tsx",
    js: "jsx",
    jsx: "jsx",
    json: "json",
    yml: "yaml",
    yaml: "yaml",
    toml: "toml",
    sh: "bash",
    bash: "bash",
    py: "python",
    rs: "rust",
    go: "go",
    css: "css",
    html: "markup",
    xml: "markup"
  };
  return map[ext] ?? "tsx";
}
function basename(path) {
  return path.split("/").pop() || path;
}
function isMarkdown(path, lang) {
  if (lang === "markdown") return true;
  return /\.(md|mdc|markdown)$/i.test(path);
}
function FileViewer({
  path,
  title,
  content: preloadedContent,
  onBack,
  language,
  embedded = false,
  reader,
  writer,
  collapsible = false,
  bare = false,
  editing = false,
  onValidationErrorChange,
  onRequestEditing
}) {
  const readFile = reader ?? (() => Promise.reject(new Error("FileViewer: no reader provided")));
  const writeFile = writer ?? null;
  const [content, setContent] = reactExports.useState(preloadedContent ?? null);
  const [loading, setLoading] = reactExports.useState(preloadedContent === void 0);
  const [error, setError] = reactExports.useState(null);
  const [saveError, setSaveError] = reactExports.useState(null);
  const [draft, setDraft] = reactExports.useState(null);
  const [draftError, setDraftError] = reactExports.useState(null);
  const [contentPath, setContentPath] = reactExports.useState(
    preloadedContent === void 0 ? null : path
  );
  const saveSeqRef = reactExports.useRef(0);
  const saveChainRef = reactExports.useRef(Promise.resolve());
  const fileVersionRef = reactExports.useRef(0);
  const lastPersistedRef = reactExports.useRef(preloadedContent ?? null);
  reactExports.useEffect(() => {
    saveSeqRef.current += 1;
    fileVersionRef.current += 1;
    saveChainRef.current = Promise.resolve();
    let cancelled = false;
    if (preloadedContent !== void 0) {
      lastPersistedRef.current = preloadedContent;
      window.queueMicrotask(() => {
        if (cancelled) return;
        setError(null);
        setSaveError(null);
        setContent(preloadedContent);
        setContentPath(path);
        setLoading(false);
      });
      return () => {
        cancelled = true;
      };
    }
    window.queueMicrotask(() => {
      if (cancelled) return;
      setLoading(true);
      setError(null);
      setContentPath(null);
    });
    lastPersistedRef.current = null;
    const fileVersion = fileVersionRef.current;
    readFile(path).then((text) => {
      if (!cancelled) {
        if (fileVersionRef.current === fileVersion) lastPersistedRef.current = text;
        setContent(text);
        setContentPath(path);
        setSaveError(null);
        setLoading(false);
      }
    }).catch((err) => {
      if (cancelled) return;
      const msg = err instanceof Error ? err.message : String(err);
      setError(msg.replace(/^Error invoking remote method '[^']+': */, ""));
      setLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, [path, preloadedContent]);
  const displayTitle = title ?? basename(path);
  const lang = language ?? languageFromPath(path);
  const md = isMarkdown(path, lang);
  const editable = preloadedContent === void 0 && writeFile != null;
  const contentRef = reactExports.useRef(content);
  const editableRef = reactExports.useRef(editable);
  const writeFileRef = reactExports.useRef(writeFile);
  const pathRef = reactExports.useRef(path);
  reactExports.useEffect(() => {
    contentRef.current = content;
    editableRef.current = editable;
    writeFileRef.current = writeFile;
    pathRef.current = path;
  });
  const patchMarkdownRange = reactExports.useCallback(
    async (start, end, nextText) => {
      const currentContent = contentRef.current;
      const currentWriteFile = writeFileRef.current;
      const currentPath = pathRef.current;
      if (currentContent === null || !editableRef.current || currentWriteFile == null) return;
      const nextContent = currentContent.slice(0, start) + nextText + currentContent.slice(end);
      const saveId = saveSeqRef.current + 1;
      const fileVersion = fileVersionRef.current;
      saveSeqRef.current = saveId;
      setSaveError(null);
      setContent(nextContent);
      const write = saveChainRef.current.then(
        () => currentWriteFile(currentPath, nextContent, { expectedContent: currentContent })
      );
      saveChainRef.current = write.catch(() => {
      });
      try {
        await write;
        if (fileVersionRef.current === fileVersion) lastPersistedRef.current = nextContent;
        if (saveSeqRef.current === saveId) setSaveError(null);
      } catch (err) {
        if (saveSeqRef.current !== saveId) return;
        setContent(lastPersistedRef.current);
        const msg = err instanceof Error ? err.message : String(err);
        setSaveError(msg.replace(/^Error invoking remote method '[^']+': */, ""));
      }
    },
    []
  );
  const writeFullContent = reactExports.useCallback(async (nextContent) => {
    const currentWriteFile = writeFileRef.current;
    const currentPath = pathRef.current;
    if (!editableRef.current || currentWriteFile == null) return;
    const saveId = saveSeqRef.current + 1;
    const fileVersion = fileVersionRef.current;
    const loaded = lastPersistedRef.current;
    if (loaded === null) {
      setSaveError("This file is still loading. Reopen it and try again.");
      return;
    }
    saveSeqRef.current = saveId;
    setSaveError(null);
    setContent(nextContent);
    const write = saveChainRef.current.then(
      () => currentWriteFile(currentPath, nextContent, { expectedContent: loaded })
    );
    saveChainRef.current = write.catch(() => {
    });
    try {
      await write;
      if (fileVersionRef.current === fileVersion) lastPersistedRef.current = nextContent;
      if (saveSeqRef.current === saveId) setSaveError(null);
    } catch (err) {
      if (saveSeqRef.current !== saveId) return;
      setContent(lastPersistedRef.current);
      if (isSetupWriteConflict(err)) {
        setSaveError(
          "This file changed on disk while you were editing, so your edit was not saved. Reopen it to start from the current contents."
        );
        return;
      }
      const msg = err instanceof Error ? err.message : String(err);
      setSaveError(msg.replace(/^Error invoking remote method '[^']+': */, ""));
    }
  }, []);
  const validateDraft = reactExports.useCallback((text) => {
    if (!/\.json$/i.test(pathRef.current)) return null;
    try {
      JSON.parse(text);
      return null;
    } catch (err) {
      return err instanceof Error ? err.message : "Invalid JSON";
    }
  }, []);
  const draftRef = reactExports.useRef(draft);
  reactExports.useEffect(() => {
    draftRef.current = draft;
  });
  reactExports.useEffect(() => {
    if (!editing || draft !== null || content === null || contentPath !== path) return;
    setDraft(content);
  }, [editing, draft, content, contentPath, path]);
  const editSessionRef = reactExports.useRef({ editing, path });
  reactExports.useEffect(() => {
    const previous = editSessionRef.current;
    editSessionRef.current = { editing, path };
    if (previous.path !== path) {
      setDraft(null);
      setDraftError(null);
      onValidationErrorChange?.(null);
      return;
    }
    if (previous.editing === editing) return;
    if (editing) {
      setDraftError(null);
      onValidationErrorChange?.(null);
      return;
    }
    const next = draftRef.current;
    setDraft(null);
    setDraftError(null);
    onValidationErrorChange?.(null);
    if (next !== null && next !== contentRef.current) void writeFullContent(next);
  }, [editing, path, onValidationErrorChange, writeFullContent]);
  const changeDraft = (next) => {
    setDraft(next);
    const error2 = validateDraft(next);
    setDraftError(error2);
    onValidationErrorChange?.(error2);
  };
  const contentNode = content === null ? null : md ? /* @__PURE__ */ jsxRuntimeExports.jsx(
    MarkdownView,
    {
      source: content,
      editable,
      flush: bare,
      onParagraphChange: patchMarkdownRange
    }
  ) : editing && draft !== null ? /* @__PURE__ */ jsxRuntimeExports.jsx(CodeEditor, { value: draft, onChange: changeDraft, error: draftError, bare }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
    CodeView,
    {
      source: content,
      path,
      language,
      collapsible,
      bare,
      onRequestEdit: editable ? onRequestEditing : void 0
    }
  );
  if (embedded) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: bare ? md ? "px-3.5 py-3" : void 0 : "px-4 py-4", children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[12px] text-[var(--text-muted)] py-6 text-center", children: "Loading…" }) : error ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[12px] text-[var(--danger)] py-6 text-center", children: error }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      saveError && /* @__PURE__ */ jsxRuntimeExports.jsx(SaveError, { message: saveError }),
      contentNode
    ] }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col h-full min-h-0", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SubHeader, { onBack, title: displayTitle }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 overflow-y-auto overflow-x-hidden px-4 py-4 min-h-0", children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[12px] text-[var(--text-muted)] py-6 text-center", children: "Loading…" }) : error ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[12px] text-[var(--danger)] py-6 text-center", children: error }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      saveError && /* @__PURE__ */ jsxRuntimeExports.jsx(SaveError, { message: saveError }),
      contentNode
    ] }) })
  ] });
}
function SaveError({ message }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3 rounded-md border border-[var(--danger)]/25 bg-[var(--danger)]/5 px-2 py-1.5 text-[11px] text-[var(--danger)]", children: [
    "Could not save: ",
    message
  ] });
}
function CodeEditor({
  value,
  onChange,
  error,
  bare
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "textarea",
      {
        value,
        spellCheck: false,
        onChange: (event) => onChange(event.target.value),
        "aria-label": "Edit file contents",
        className: "block w-full resize-y bg-[var(--bg-inner)] p-3 font-mono text-[11px] leading-[16px] text-[var(--text-strong)] outline-none min-h-[220px] field-sizing-content" + (bare ? "" : " rounded-lg border border-[var(--border-subtle)]")
      }
    ),
    error ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      "p",
      {
        role: "alert",
        className: "m-0 border-t border-[var(--border-subtle)] px-3 py-1.5 text-[10px] text-[var(--danger)]",
        children: error
      }
    ) : null
  ] });
}
const CODE_CAP_LINES = 16;
function CodeView({
  source,
  path,
  language,
  collapsible = false,
  bare = false,
  onRequestEdit
}) {
  const requestEditFromClick = (event) => {
    if (!onRequestEdit) return;
    if (event.target instanceof Element && event.target.closest("button")) return;
    const selection = typeof window === "undefined" ? null : window.getSelection();
    if (selection && !selection.isCollapsed) return;
    onRequestEdit();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      onClick: onRequestEdit ? requestEditFromClick : void 0,
      title: onRequestEdit ? "Click to edit" : void 0,
      className: onRequestEdit ? "min-w-0 cursor-text" : "min-w-0",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        FilePreview,
        {
          code: source,
          path,
          language,
          capLines: collapsible ? CODE_CAP_LINES : void 0,
          bordered: !bare
        }
      )
    }
  );
}
function parseFrontMatter(source) {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!match) return { fields: [], raw: "", end: 0, body: source };
  const raw = match[1];
  const body = source.slice(match[0].length);
  const fields = [];
  for (const rawLine of raw.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;
    const colon = line.indexOf(":");
    if (colon === -1) {
      if (fields.length > 0) {
        fields[fields.length - 1].value += " " + line;
      }
      continue;
    }
    const key = line.slice(0, colon).trim();
    let value = line.slice(colon + 1).trim();
    if (value.startsWith('"') && value.endsWith('"') || value.startsWith("'") && value.endsWith("'")) {
      value = value.slice(1, -1);
    }
    fields.push({ key, value });
  }
  return { fields, raw: match[0], end: match[0].length, body };
}
function FrontMatterBlock({
  fields,
  raw,
  end,
  editable,
  flush = false,
  onChange
}) {
  if (fields.length === 0) return null;
  if (flush)
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      EditableSourceBlock,
      {
        rawText: raw,
        sourceStart: 0,
        sourceEnd: end,
        editable,
        onChange,
        textareaClassName: "font-mono text-[11px] leading-[16px]",
        renderView: ({ className, onClick }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: `mb-4 border-b border-[var(--border-subtle)] pb-2 ${className}`,
            onClick,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-1 text-[10px] font-semibold uppercase tracking-[0.06em] text-[var(--text-muted)]", children: "Front matter" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("dl", { className: "m-0", children: fields.map(({ key, value }, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-[90px_1fr] gap-2 py-0.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "truncate font-mono text-[11px] text-[var(--text-muted)]", children: key }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "m-0 break-words text-[12px] text-[var(--text-strong)]", children: value })
              ] }, i)) })
            ]
          }
        )
      }
    );
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    EditableSourceBlock,
    {
      rawText: raw,
      sourceStart: 0,
      sourceEnd: end,
      editable,
      onChange,
      textareaClassName: "font-mono text-[11px] leading-[16px]",
      renderView: ({ className, onClick }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: `mb-4 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card-soft)]/60 overflow-hidden ${className}`,
          onClick,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-3 py-1.5 text-[10px] uppercase tracking-[0.06em] font-semibold text-[var(--text-muted)] border-b border-[var(--border-subtle)] bg-[var(--bg-subtle)]/50", children: "Front matter" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("dl", { className: "divide-y divide-[var(--border-subtle)]", children: fields.map(({ key, value }, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-[90px_1fr] gap-2 px-3 py-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-[11px] font-mono text-[var(--text-muted)] truncate", children: key }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "text-[12px] text-[var(--text-strong)] break-words", children: value })
            ] }, i)) })
          ]
        }
      )
    }
  );
}
function offsetFromPosition(source, position) {
  let offset = 0;
  let line = 1;
  while (line < position.line && offset < source.length) {
    const newline = source.indexOf("\n", offset);
    if (newline === -1) return source.length;
    offset = newline + 1;
    line += 1;
  }
  return Math.min(offset + position.column - 1, source.length);
}
const MarkdownView = reactExports.memo(function MarkdownView2({
  source,
  editable,
  flush = false,
  onParagraphChange
}) {
  const { fields, raw, end, body } = parseFrontMatter(source);
  const bodyOffset = source.length - body.length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "markdown-body text-[12.5px] leading-[1.6] text-[var(--text-body)]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      FrontMatterBlock,
      {
        fields,
        raw,
        end,
        editable,
        flush,
        onChange: onParagraphChange
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Markdown,
      {
        remarkPlugins: [remarkGfm],
        components: {
          h1: ({ children, node }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            EditableMarkdownBlock,
            {
              node,
              body,
              bodyOffset,
              editable,
              onChange: onParagraphChange,
              renderView: ({ children: children2, className, onClick }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                HeadingText,
                {
                  as: "h1",
                  size: "lg",
                  className: `mt-4 mb-2 text-[var(--text-strong)] ${className}`,
                  onClick,
                  children: children2
                }
              ),
              children
            }
          ),
          h2: ({ children, node }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            EditableMarkdownBlock,
            {
              node,
              body,
              bodyOffset,
              editable,
              onChange: onParagraphChange,
              renderView: ({ children: children2, className, onClick }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                HeadingText,
                {
                  as: "h2",
                  size: "md",
                  className: `mt-4 mb-1.5 text-[var(--text-strong)] ${className}`,
                  onClick,
                  children: children2
                }
              ),
              children
            }
          ),
          h3: ({ children, node }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            EditableMarkdownBlock,
            {
              node,
              body,
              bodyOffset,
              editable,
              onChange: onParagraphChange,
              renderView: ({ children: children2, className, onClick }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                HeadingText,
                {
                  as: "h3",
                  size: "sm",
                  className: `mt-3 mb-1 text-[var(--text-strong)] ${className}`,
                  onClick,
                  children: children2
                }
              ),
              children
            }
          ),
          h4: ({ children, node }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            EditableMarkdownBlock,
            {
              node,
              body,
              bodyOffset,
              editable,
              onChange: onParagraphChange,
              renderView: ({ children: children2, className, onClick }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "h4",
                {
                  className: `text-[12.5px] font-semibold text-[var(--text-strong)] mt-3 mb-1 ${className}`,
                  onClick,
                  children: children2
                }
              ),
              children
            }
          ),
          h5: ({ children, node }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            EditableMarkdownBlock,
            {
              node,
              body,
              bodyOffset,
              editable,
              onChange: onParagraphChange,
              renderView: ({ children: children2, className, onClick }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "h5",
                {
                  className: `text-[12px] font-semibold text-[var(--text-strong)] mt-2.5 mb-1 ${className}`,
                  onClick,
                  children: children2
                }
              ),
              children
            }
          ),
          h6: ({ children, node }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            EditableMarkdownBlock,
            {
              node,
              body,
              bodyOffset,
              editable,
              onChange: onParagraphChange,
              renderView: ({ children: children2, className, onClick }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "h6",
                {
                  className: `text-[11.5px] font-semibold uppercase text-[var(--text-muted)] mt-2.5 mb-1 ${className}`,
                  onClick,
                  children: children2
                }
              ),
              children
            }
          ),
          p: ({ children, node }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            EditableMarkdownBlock,
            {
              node,
              body,
              bodyOffset,
              editable,
              onChange: onParagraphChange,
              renderView: ({ children: children2, className, onClick }) => /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `my-2 ${className}`, onClick, children: children2 }),
              children
            }
          ),
          ul: ({ children, node }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            EditableMarkdownBlock,
            {
              node,
              body,
              bodyOffset,
              editable,
              onChange: onParagraphChange,
              renderView: ({ children: children2, className, onClick }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "ul",
                {
                  className: `list-disc pl-5 my-2 marker:text-[var(--text-muted)] ${className}`,
                  onClick,
                  children: children2
                }
              ),
              children
            }
          ),
          ol: ({ children, node }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            EditableMarkdownBlock,
            {
              node,
              body,
              bodyOffset,
              editable,
              onChange: onParagraphChange,
              renderView: ({ children: children2, className, onClick }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "ol",
                {
                  className: `list-decimal pl-5 my-2 marker:text-[var(--text-muted)] ${className}`,
                  onClick,
                  children: children2
                }
              ),
              children
            }
          ),
          li: ({ children }) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "my-0.5", children }),
          strong: ({ children }) => /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "font-semibold text-[var(--text-strong)]", children }),
          em: ({ children }) => /* @__PURE__ */ jsxRuntimeExports.jsx("em", { className: "italic", children }),
          a: ({ children, href }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "a",
            {
              href,
              className: "text-[var(--accent)] hover:underline",
              onClick: (e) => {
                e.preventDefault();
                e.stopPropagation();
                if (href) window.open(href, "_blank", "noopener,noreferrer");
              },
              children
            }
          ),
          blockquote: ({ children, node }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            EditableMarkdownBlock,
            {
              node,
              body,
              bodyOffset,
              editable,
              onChange: onParagraphChange,
              renderView: ({ children: children2, className, onClick }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "blockquote",
                {
                  className: `border-l-2 border-[var(--accent)]/50 pl-3 my-2 text-[var(--text-muted)] italic ${className}`,
                  onClick,
                  children: children2
                }
              ),
              children
            }
          ),
          hr: ({ node }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            EditableMarkdownBlock,
            {
              node,
              body,
              bodyOffset,
              editable,
              onChange: onParagraphChange,
              renderView: ({ className, onClick }) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `my-4 ${className}`, onClick, children: /* @__PURE__ */ jsxRuntimeExports.jsx("hr", { className: "border-[var(--border-subtle)]" }) })
            }
          ),
          table: ({ children, node }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            EditableMarkdownBlock,
            {
              node,
              body,
              bodyOffset,
              editable,
              onChange: onParagraphChange,
              textareaClassName: "font-mono text-[11px] leading-[16px]",
              renderView: ({ children: children2, className, onClick }) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `my-3 overflow-x-auto ${className}`, onClick, children: /* @__PURE__ */ jsxRuntimeExports.jsx("table", { className: "min-w-full text-[11px] border border-[var(--border-subtle)] rounded", children: children2 }) }),
              children
            }
          ),
          th: ({ children }) => /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left font-semibold text-[var(--text-strong)] border-b border-[var(--border-subtle)] px-2 py-1 bg-[var(--bg-subtle)]/60", children }),
          td: ({ children }) => /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "border-b border-[var(--border-subtle)] px-2 py-1", children }),
          code: ({ className, children, node, ...rest }) => {
            const text = String(children ?? "").replace(/\n$/, "");
            const m = /language-(\w+)/.exec(className ?? "");
            const isInline = !m && !text.includes("\n");
            if (isInline) {
              return /* @__PURE__ */ jsxRuntimeExports.jsx(
                "code",
                {
                  className: "font-mono text-[11px] bg-[var(--bg-subtle)] border border-[var(--border-subtle)] rounded px-1 py-[1px]",
                  ...rest,
                  children
                }
              );
            }
            const lang = m?.[1];
            return /* @__PURE__ */ jsxRuntimeExports.jsx(
              EditableMarkdownBlock,
              {
                node,
                body,
                bodyOffset,
                editable,
                onChange: onParagraphChange,
                textareaClassName: "font-mono text-[11px] leading-[16px]",
                renderView: ({ className: className2, onClick }) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `my-2 ${className2}`, onClick, children: /* @__PURE__ */ jsxRuntimeExports.jsx(CodeView, { source: text, language: lang }) })
              }
            );
          },
          pre: ({ children }) => /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children })
        },
        children: body
      }
    )
  ] });
});
function EditableMarkdownBlock({
  children,
  node,
  body,
  bodyOffset,
  editable,
  onChange,
  renderView,
  textareaClassName
}) {
  const position = node?.position;
  const localStart = position ? offsetFromPosition(body, position.start) : 0;
  const localEnd = position ? offsetFromPosition(body, position.end) : 0;
  const sourceStart = bodyOffset + localStart;
  const sourceEnd = bodyOffset + localEnd;
  const rawText = position ? body.slice(localStart, localEnd) : "";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    EditableSourceBlock,
    {
      rawText,
      sourceStart,
      sourceEnd,
      editable: editable && !!position,
      onChange,
      renderView,
      textareaClassName,
      children
    }
  );
}
function EditableSourceBlock({
  children,
  rawText,
  sourceStart,
  sourceEnd,
  editable,
  onChange,
  renderView,
  textareaClassName
}) {
  const textareaRef = reactExports.useRef(null);
  const openTimerRef = reactExports.useRef(null);
  const [editing, setEditing] = reactExports.useState(false);
  const [fadingOut, setFadingOut] = reactExports.useState(false);
  const [editBox, setEditBox] = reactExports.useState(null);
  const [editHeight, setEditHeight] = reactExports.useState(null);
  const [openingAnimated, setOpeningAnimated] = reactExports.useState(false);
  const [editVisible, setEditVisible] = reactExports.useState(false);
  const [value, setValue] = reactExports.useState(rawText);
  reactExports.useEffect(() => {
    return () => {
      if (openTimerRef.current !== null) window.clearTimeout(openTimerRef.current);
    };
  }, []);
  reactExports.useEffect(() => {
    if (!editing || !textareaRef.current) return;
    const textarea = textareaRef.current;
    textarea.focus();
    textarea.select();
  }, [editing]);
  reactExports.useEffect(() => {
    if (!editing || !textareaRef.current) return;
    const textarea = textareaRef.current;
    const frame = window.requestAnimationFrame(() => {
      const nextHeight = textarea.scrollHeight;
      setEditHeight((currentHeight) => {
        if (currentHeight !== null && Math.abs(currentHeight - nextHeight) < 2) {
          setOpeningAnimated(false);
          setEditVisible(true);
          return currentHeight;
        }
        return nextHeight;
      });
      setEditVisible(true);
    });
    const timer = window.setTimeout(() => {
      setOpeningAnimated(false);
    }, 160);
    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(timer);
    };
  }, [editing]);
  reactExports.useEffect(() => {
    if (!editing || openingAnimated || !textareaRef.current) return;
    setEditHeight(textareaRef.current.scrollHeight);
  }, [editing, openingAnimated, value]);
  const commit = async () => {
    if (!editing) return;
    setEditing(false);
    setEditVisible(false);
    if (value === rawText) return;
    await onChange(sourceStart, sourceEnd, value);
  };
  if (editing) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Textarea,
      {
        ref: textareaRef,
        className: `block w-full resize-none overflow-hidden rounded-md border bg-[var(--bg-card-soft)]/45 px-1.5 py-1 text-[12.5px] leading-[1.6] text-[var(--text-strong)] outline-none ring-1 ${openingAnimated ? "border-transparent ring-transparent focus-visible:ring-transparent transition-[height,opacity] duration-150 ease-out" : "border-[var(--border-subtle)] ring-[var(--accent-soft)]/50 focus-visible:ring-1 focus-visible:ring-[var(--accent-soft)]/50"} ${editVisible ? "opacity-100" : "opacity-0"} ${textareaClassName ?? ""}`,
        style: editBox ? {
          height: `${editHeight ?? editBox.height}px`,
          marginTop: editBox.marginTop,
          marginBottom: editBox.marginBottom
        } : void 0,
        value,
        onChange: (event) => setValue(event.target.value),
        onBlur: () => {
          void commit();
        },
        onKeyDown: (event) => {
          if (event.key === "Escape") {
            setValue(rawText);
            setEditing(false);
            setEditVisible(false);
            return;
          }
          if (event.key === "Enter" && (event.metaKey || event.ctrlKey)) {
            event.preventDefault();
            void commit();
          }
        }
      }
    );
  }
  const startEdit = (target) => {
    if (!editable) return;
    setValue(rawText);
    const rect = target.getBoundingClientRect();
    const styles = window.getComputedStyle(target);
    setEditBox({
      height: rect.height,
      marginTop: styles.marginTop,
      marginBottom: styles.marginBottom
    });
    setEditHeight(rect.height);
    setOpeningAnimated(true);
    setEditVisible(false);
    setFadingOut(true);
    if (openTimerRef.current !== null) window.clearTimeout(openTimerRef.current);
    openTimerRef.current = window.setTimeout(() => {
      openTimerRef.current = null;
      setFadingOut(false);
      setEditing(true);
    }, 90);
  };
  const activateEdit = (event) => {
    event.stopPropagation();
    startEdit(event.currentTarget);
  };
  const activateTrigger = (event) => {
    event.stopPropagation();
    const target = event.currentTarget.previousElementSibling;
    if (target instanceof HTMLElement) startEdit(target);
  };
  const view = renderView({
    children,
    className: "-mx-1 rounded-md px-1 transition-[background-color,opacity] duration-100 " + (fadingOut ? "opacity-0 " : "opacity-100 ") + (editable ? "cursor-text hover:bg-[var(--bg-subtle)]/60" : ""),
    onClick: activateEdit
  });
  if (!editable) return view;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    view,
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        className: "sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-50 focus:rounded-md focus:border focus:border-[var(--border-subtle)] focus:bg-[var(--bg-card)] focus:px-2 focus:py-1 focus:text-[11px] focus:text-[var(--text-strong)] focus:shadow-sm",
        onClick: activateTrigger,
        onKeyDown: (event) => {
          if (event.key !== "Enter" && event.key !== " ") return;
          event.preventDefault();
          activateTrigger(event);
        },
        children: "Edit block"
      }
    )
  ] });
}
export {
  FileViewer as F,
  Settings as S
};
//# sourceMappingURL=FileViewer-DHqmfXyV.js.map

//# debugId=a0376c1a-18d1-5bbc-8b26-525e673c143e
