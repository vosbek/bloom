
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="ed93aefe-ee9d-54c5-92e4-68b39c925a1c")}catch(e){}}();
import { C as CUSTOM_HEADER_SLOT_ID, $ as getLineAnnotationName, G as GutterUtilitySlotStyles, ax as themeResolver, r as areThemesEqual, X as getFiletypeFromFileName, O as createTransformerWithState, a as DEFAULT_THEMES, _ as getHighlighterThemeStyles, a0 as getLineNodes, ag as linesFromFileContents, U as formatCSSVariablePrefix, q as areThemesAttached, Y as getHighlighterIfLoaded, k as areFilesEqual, j as applyLineTextWithNewline, D as DEFAULT_RENDER_RANGE, p as areRenderRangesEqual, l as areLanguagesAttached, a4 as getThemes, at as shouldRenderFileAnnotations, V as getFileAnnotations, B as createGutterGap, x as createAnnotationElement, J as createGutterItem, A as createFileHeaderElement, ay as toHtml, M as createHastElement, z as createContentColumn, a3 as getSharedHighlighter, Z as getHighlighterOptions, N as createPreElement, L as createGutterWrapper, au as shouldUseTokenTransformer, R as ResizeManager, i as InteractionManager, am as pluckInteractionOptions, ao as prerenderHTMLIfNecessary, E as EMPTY_RENDER_RANGE, y as createAnnotationWrapperNode, K as createGutterUtilityContentNode, P as createUnsafeCSSStyleNode, aF as wrapUnsafeCSS, a1 as getMeasuredScrollbarGutter, az as upsertHostThemeStyle, ak as patchScrollbarGutterSize, ae as isSafari, a2 as getOrCreateCodeNode, a7 as guardWebKitScrollDuringRebuild, h as HEADER_PREFIX_SLOT_ID, H as HEADER_FILENAME_SUFFIX_SLOT_ID, g as HEADER_METADATA_SLOT_ID, af as isStyleNode, S as SVGSpriteSheet, o as arePrePropertiesEqual, as as setPreNodeProperties, aE as wrapThemeCSS, b as DEFAULT_VIRTUAL_FILE_METRICS, u as computeVirtualFileMetrics, m as areObjectsEqual, n as areOptionsEqual, a9 as includesFileAnnotations, a5 as getVirtualFileHeaderRegion, a6 as getVirtualFilePaddingBottom, F as FILE_ANNOTATION_DOM_KEY, aD as useVirtualizer, W as WorkerPoolContext, aA as useCreateEditor, aC as useStableCallback, ah as noopRender, c as DIFFS_TAG_NAME, aw as templateRender } from "./FileDiff-CNuZdHKn.js";
import { f, aj, an } from "./FileDiff-CNuZdHKn.js";
import { gP as jsxRuntimeExports, hx as reactExports } from "./index-nrW_ocxo.js";
function renderFileChildren({ file, renderCustomHeader, renderHeaderPrefix, renderHeaderFilenameSuffix, renderHeaderMetadata, renderAnnotation, lineAnnotations, renderGutterUtility, getHoveredLine }) {
  const customHeader = renderCustomHeader?.(file);
  const prefix = renderHeaderPrefix?.(file);
  const suffix = renderHeaderFilenameSuffix?.(file);
  const metadata = renderHeaderMetadata?.(file);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    customHeader != null ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", {
      slot: CUSTOM_HEADER_SLOT_ID,
      children: customHeader
    }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      prefix != null && /* @__PURE__ */ jsxRuntimeExports.jsx("div", {
        slot: "header-prefix",
        children: prefix
      }),
      suffix != null && /* @__PURE__ */ jsxRuntimeExports.jsx("div", {
        slot: "header-filename-suffix",
        children: suffix
      }),
      metadata != null && /* @__PURE__ */ jsxRuntimeExports.jsx("div", {
        slot: "header-metadata",
        children: metadata
      })
    ] }),
    renderAnnotation != null && lineAnnotations?.map((annotation, index) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", {
      slot: getLineAnnotationName(annotation),
      children: renderAnnotation(annotation)
    }, index)),
    renderGutterUtility != null && /* @__PURE__ */ jsxRuntimeExports.jsx("div", {
      slot: "gutter-utility-slot",
      style: GutterUtilitySlotStyles,
      children: renderGutterUtility(getHoveredLine)
    })
  ] });
}
function hasResolvedThemes(themeNames) {
  return themeResolver.hasResolvedThemes(themeNames);
}
function areFileRenderOptionsEqual(optionsA, optionsB) {
  return areThemesEqual(optionsA.theme, optionsB.theme) && optionsA.useTokenTransformer === optionsB.useTokenTransformer && optionsA.tokenizeMaxLineLength === optionsB.tokenizeMaxLineLength;
}
function isFilePlainText(file) {
  return (file.lang ?? getFiletypeFromFileName(file.name)) === "text";
}
const DEFAULT_PLAIN_TEXT_OPTIONS = { forcePlainText: false };
function renderFileWithHighlighter(file, highlighter, { theme = DEFAULT_THEMES, tokenizeMaxLineLength, useTokenTransformer }, { forcePlainText, startingLine, totalLines, lines } = DEFAULT_PLAIN_TEXT_OPTIONS) {
  if (forcePlainText) {
    startingLine ??= 0;
    totalLines ??= Infinity;
  } else {
    startingLine = 0;
    totalLines = Infinity;
  }
  const isWindowedHighlight = startingLine > 0 || totalLines < Infinity;
  const { state, transformers } = createTransformerWithState(useTokenTransformer);
  const lang = forcePlainText ? "text" : file.lang ?? getFiletypeFromFileName(file.name);
  const baseThemeType = typeof theme === "string" ? highlighter.getTheme(theme).type : void 0;
  const themeStyles = getHighlighterThemeStyles({
    theme,
    highlighter
  });
  state.lineInfo = (shikiLineNumber) => ({
    type: "context",
    lineIndex: shikiLineNumber - 1 + startingLine,
    lineNumber: shikiLineNumber + startingLine
  });
  const hastConfig = (() => {
    if (typeof theme === "string") return {
      lang,
      theme,
      transformers,
      defaultColor: false,
      cssVariablePrefix: formatCSSVariablePrefix("token"),
      tokenizeMaxLineLength,
      tokenizeTimeLimit: 0
    };
    return {
      lang,
      themes: theme,
      transformers,
      defaultColor: false,
      cssVariablePrefix: formatCSSVariablePrefix("token"),
      tokenizeMaxLineLength,
      tokenizeTimeLimit: 0
    };
  })();
  const highlightedLines = getLineNodes(highlighter.codeToHast(isWindowedHighlight ? extractWindowedFileContent(lines ?? linesFromFileContents(file.contents), startingLine, totalLines) : file.contents, hastConfig));
  const code = isWindowedHighlight ? new Array(startingLine) : highlightedLines;
  if (isWindowedHighlight) code.push(...highlightedLines);
  return {
    code,
    themeStyles,
    baseThemeType
  };
}
function extractWindowedFileContent(lines, startingLine, totalLines) {
  if (lines.length === 0) return "";
  const endLine = Math.min(startingLine + totalLines, lines.length);
  return lines.slice(startingLine, endLine).join("");
}
function isLineCacheForFile(lineCache, file) {
  return file.cacheKey == null ? lineCache.file === file && lineCache.sourceContents === file.contents : lineCache.cacheKey === file.cacheKey;
}
let instanceId$2 = -1;
var FileRenderer = class {
  options;
  onRenderUpdate;
  workerManager;
  __id = `file-renderer:${++instanceId$2}`;
  highlighter;
  renderCache;
  computedLang = "text";
  lineAnnotations = {};
  lineCache;
  pendingStructuralRows;
  textDocumentCache = /* @__PURE__ */ new WeakMap();
  editSessionActive = false;
  constructor(options = { theme: DEFAULT_THEMES }, onRenderUpdate, workerManager) {
    this.options = options;
    this.onRenderUpdate = onRenderUpdate;
    this.workerManager = workerManager;
    if (workerManager?.isWorkingPool() !== true) this.highlighter = areThemesAttached(options.theme ?? DEFAULT_THEMES) ? getHighlighterIfLoaded() : void 0;
  }
  setOptions(options) {
    this.options = options;
  }
  mergeOptions(options) {
    this.options = {
      ...this.options,
      ...options
    };
  }
  setLineAnnotations(lineAnnotations) {
    this.lineAnnotations = {};
    for (const annotation of lineAnnotations) {
      const arr = this.lineAnnotations[annotation.lineNumber] ?? [];
      this.lineAnnotations[annotation.lineNumber] = arr;
      arr.push(annotation);
    }
  }
  cleanUp() {
    this.recycle();
    this.workerManager = void 0;
    this.onRenderUpdate = void 0;
  }
  /**
  * Enter edit-session mode: rendering happens locally with the token
  * transformer forced on, and worker-pool requests/results are suspended
  * for this renderer. Called on every editor attach, including a re-attach
  * after recycle.
  */
  beginEditSession() {
    this.editSessionActive = true;
  }
  /** Leave edit-session mode. Rendering returns to the pool when one works. */
  endEditSession() {
    this.editSessionActive = false;
  }
  /**
  * Ensures that the DOM is compatible with editor render updates
  */
  editorRenderReady() {
    return this.renderCache?.options.useTokenTransformer === true && this.renderCache.highlighted && this.renderCache.result != null;
  }
  recycle() {
    this.clearRenderCache();
    this.highlighter = void 0;
    this.workerManager?.cleanUpTasks(this);
    this.lineCache = void 0;
    this.endEditSession();
    this.textDocumentCache = /* @__PURE__ */ new WeakMap();
  }
  syncEditedContentsToFile() {
    const { renderCache, lineCache } = this;
    if (renderCache?.isDirty !== true || lineCache == null || !isLineCacheForFile(lineCache, renderCache.file)) return;
    renderCache.file.contents = lineCache.lines.join("");
  }
  hasUnkeyedFileContentsChanged(file) {
    const { lineCache } = this;
    return file.cacheKey == null && lineCache != null && lineCache.file === file && lineCache.sourceContents !== file.contents;
  }
  invalidateChangedUnkeyedFile(file) {
    if (!this.hasUnkeyedFileContentsChanged(file)) return;
    this.workerManager?.cleanUpTasks(this);
    this.clearRenderCache();
    this.lineCache = void 0;
    this.textDocumentCache = /* @__PURE__ */ new WeakMap();
  }
  clearRenderCache() {
    this.syncEditedContentsToFile();
    this.pendingStructuralRows = void 0;
    const renderCache = this.renderCache;
    this.renderCache = void 0;
    if (renderCache != null && renderCache.isDirty === true && renderCache.file.cacheKey != null) this.workerManager?.evictFileFromCache(renderCache.file.cacheKey);
  }
  hydrate(file) {
    const { options } = this.getRenderOptions(file);
    const massiveFile = isFileMassive(this.getOrCreateLineCache(file).length, this.getTokenizeMaxLength());
    let cache = this.workerManager?.getFileResultCache(file);
    if (cache != null && !areFileRenderOptionsEqual(options, cache.options)) cache = void 0;
    this.renderCache ??= {
      file,
      options,
      highlighted: !massiveFile && !isFilePlainText(file),
      result: massiveFile ? void 0 : cache?.result,
      renderRange: void 0
    };
    if (!this.editSessionActive && this.workerManager?.isWorkingPool() === true) {
      if (this.renderCache.result == null && !massiveFile) this.workerManager.highlightFileAST(this, file);
    } else if (this.highlighter == null) {
      this.computedLang = file.lang ?? getFiletypeFromFileName(file.name);
      this.initializeHighlighter();
    }
  }
  getLocalHighlightTheme() {
    return this.workerManager?.getFileRenderOptions().theme ?? this.options.theme ?? DEFAULT_THEMES;
  }
  getEffectiveCodeOptions() {
    const poolOptions = this.workerManager?.isWorkingPool() === true ? this.workerManager.getFileRenderOptions() : void 0;
    return {
      theme: this.getLocalHighlightTheme(),
      tokenizeMaxLineLength: poolOptions?.tokenizeMaxLineLength ?? this.options.tokenizeMaxLineLength
    };
  }
  getRenderOptions(file) {
    const options = (() => {
      if (this.workerManager?.isWorkingPool() === true) {
        const poolOptions = this.workerManager.getFileRenderOptions();
        if (this.editSessionActive && poolOptions.useTokenTransformer !== true) return {
          ...poolOptions,
          useTokenTransformer: true
        };
        return poolOptions;
      }
      const { tokenizeMaxLineLength = 1e3 } = this.options;
      return {
        theme: this.getLocalHighlightTheme(),
        useTokenTransformer: this.editSessionActive || this.options.useTokenTransformer === true,
        tokenizeMaxLineLength
      };
    })();
    const { renderCache } = this;
    if (renderCache?.result == null) return {
      options,
      forceHighlight: true
    };
    if (!areFilesEqual(file, renderCache.file) || !areFileRenderOptionsEqual(options, renderCache.options)) return {
      options,
      forceHighlight: true
    };
    return {
      options,
      forceHighlight: false
    };
  }
  getOrCreateLineCache(file) {
    this.invalidateChangedUnkeyedFile(file);
    let { lineCache } = this;
    if (lineCache == null || !isLineCacheForFile(lineCache, file)) lineCache = {
      cacheKey: file.cacheKey,
      file,
      sourceContents: file.contents,
      lines: linesFromFileContents(file.contents)
    };
    this.lineCache = lineCache;
    return lineCache.lines;
  }
  getLineCount(file) {
    const lines = this.getOrCreateLineCache(file);
    return this.textDocumentCache.get(file)?.lineCount ?? lines.length;
  }
  updateRenderCache(dirtyLines, themeType, lineCountChangeInFlight = false) {
    this.pendingStructuralRows = void 0;
    if (this.renderCache == null) return;
    const { file, result } = this.renderCache;
    if (result == null) return;
    const pendingStructuralRows = lineCountChangeInFlight ? /* @__PURE__ */ new Map() : void 0;
    this.pendingStructuralRows = pendingStructuralRows;
    const lineCache = this.lineCache != null && isLineCacheForFile(this.lineCache, file) ? this.lineCache : void 0;
    for (const [line, tokens] of dirtyLines) {
      if (pendingStructuralRows === void 0 && lineCache != null && line < lineCache.lines.length) {
        const lineText = tokens.map((token) => token[2]).join("");
        lineCache.lines[line] = applyLineTextWithNewline(lineCache.lines[line] ?? "", lineText);
      }
      const row = {
        type: "element",
        tagName: "div",
        properties: {
          "data-line": line + 1,
          "data-line-type": "context",
          "data-line-index": line
        },
        children: tokens.map(([char, fg, text]) => {
          if (char === 0 && fg === "") {
            if (text === "") return {
              type: "element",
              tagName: "br",
              properties: {},
              children: []
            };
            return {
              type: "text",
              value: text
            };
          }
          return {
            type: "element",
            tagName: "span",
            properties: {
              "data-char": char,
              style: `color:${fg};`
            },
            children: [{
              type: "text",
              value: text
            }]
          };
        })
      };
      if (pendingStructuralRows !== void 0) pendingStructuralRows.set(line, row);
      else result.code[line] = row;
    }
    result.baseThemeType = themeType;
    this.renderCache.isDirty = true;
  }
  applyDocumentChange(textDocument) {
    const pendingStructuralRows = this.pendingStructuralRows;
    this.pendingStructuralRows = void 0;
    if (this.renderCache == null) return;
    const { file, result } = this.renderCache;
    if (result == null) return;
    const previousLines = this.lineCache != null && isLineCacheForFile(this.lineCache, file) ? this.lineCache.lines : linesFromFileContents(file.contents);
    const nextLines = linesFromFileContents(textDocument.getText());
    if (previousLines.length !== nextLines.length) {
      const maxShared = Math.min(previousLines.length, nextLines.length);
      let prefix = 0;
      while (prefix < maxShared && previousLines[prefix] === nextLines[prefix]) prefix++;
      let suffix = 0;
      while (suffix < maxShared - prefix && previousLines[previousLines.length - 1 - suffix] === nextLines[nextLines.length - 1 - suffix]) suffix++;
      const previousCode = result.code;
      result.code = new Array(nextLines.length);
      for (let i = 0; i < prefix; i++) result.code[i] = previousCode[i];
      for (let i = 0; i < suffix; i++) result.code[nextLines.length - 1 - i] = previousCode[previousLines.length - 1 - i];
      if (pendingStructuralRows !== void 0) {
        for (const [line, row] of pendingStructuralRows) if (line < nextLines.length) result.code[line] = row;
      }
      for (let i = prefix; i < nextLines.length - suffix; i++) result.code[i] ??= {
        type: "element",
        tagName: "div",
        properties: {
          "data-line": i + 1,
          "data-line-type": "context",
          "data-line-index": i
        },
        children: [{
          type: "element",
          tagName: "span",
          properties: { "data-char": 0 },
          children: [{
            type: "text",
            value: textDocument.getLineText(i)
          }]
        }]
      };
      for (let i = 0; i < result.code.length; i++) {
        const line = result.code[i];
        if (line?.type === "element") {
          line.properties["data-line"] = i + 1;
          line.properties["data-line-index"] = i;
        }
      }
      this.renderCache.isDirty = true;
    }
    this.lineCache = {
      cacheKey: file.cacheKey,
      file,
      sourceContents: file.contents,
      lines: nextLines
    };
    this.textDocumentCache.set(file, textDocument);
  }
  renderFile(file = this.renderCache?.file, renderRange = DEFAULT_RENDER_RANGE) {
    if (file == null) return;
    this.invalidateChangedUnkeyedFile(file);
    if (this.renderCache?.isDirty === true && !areFilesEqual(file, this.renderCache.file)) {
      this.clearRenderCache();
      this.lineCache = void 0;
      this.textDocumentCache = /* @__PURE__ */ new WeakMap();
    }
    let { options, forceHighlight } = this.getRenderOptions(file);
    if (this.renderCache?.isDirty === true && !areFileRenderOptionsEqual(options, this.renderCache.options)) this.clearRenderCache();
    const cache = this.getMatchingWorkerResultCache(file, options);
    if (cache != null && !this.hasHighlightedRenderCache(file, options)) {
      this.renderCache = {
        file,
        highlighted: true,
        renderRange: void 0,
        ...cache
      };
      forceHighlight = false;
    }
    this.renderCache ??= {
      file,
      highlighted: false,
      options,
      result: void 0,
      renderRange: void 0
    };
    const lines = this.getOrCreateLineCache(file);
    const hasContent = file.contents.length > 0;
    const forcePlainText = !hasContent || isFilePlainText(file) || isFileMassive(lines.length, this.getTokenizeMaxLength());
    const newContent = !areFilesEqual(file, this.renderCache.file);
    const newRenderRange = !areRenderRangesEqual(this.renderCache.renderRange, renderRange);
    if (!this.editSessionActive && this.workerManager?.isWorkingPool() === true) {
      if (forcePlainText || this.renderCache.result == null || !this.renderCache.highlighted && (newContent || newRenderRange)) {
        this.renderCache.file = file;
        this.renderCache.options = options;
        this.renderCache.highlighted = false;
        if (this.renderCache.result == null || newContent || newRenderRange || forceHighlight) this.renderCache.result = this.workerManager.getPlainFileAST(file, renderRange.startingLine, renderRange.totalLines, lines);
        this.renderCache.renderRange = renderRange;
      }
      if (!forcePlainText && hasContent && (!this.renderCache.highlighted || forceHighlight)) this.workerManager.highlightFileAST(this, file);
    } else {
      this.computedLang = file.lang ?? getFiletypeFromFileName(file.name);
      const hasThemes = this.highlighter != null && areThemesAttached(options.theme);
      const hasLangs = this.highlighter != null && areLanguagesAttached(this.computedLang);
      const canHighlight = !forcePlainText && hasLangs;
      if (this.highlighter != null && hasThemes && (forceHighlight || forcePlainText || !this.renderCache.highlighted && canHighlight || this.renderCache.result == null)) {
        const { result, options: options2 } = this.renderFileWithHighlighter(file, this.highlighter, forcePlainText || !hasLangs);
        this.renderCache = {
          file,
          options: options2,
          highlighted: canHighlight,
          result,
          renderRange: void 0
        };
      }
      if (!hasThemes || !forcePlainText && !hasLangs) this.asyncHighlight(file).then(({ result, options: options2 }) => {
        if (this.renderCache != null) this.renderCache.highlighted = false;
        this.applyHighlightResult(file, result, options2, !forcePlainText);
      });
    }
    return this.renderCache.result != null ? this.processFileResult(this.renderCache.file, renderRange, this.renderCache.result) : void 0;
  }
  async asyncRender(file, renderRange = DEFAULT_RENDER_RANGE) {
    const { result } = await this.asyncHighlight(file);
    return this.processFileResult(file, renderRange, result);
  }
  async asyncHighlight(file) {
    const forcePlainText = isFileMassive(this.getOrCreateLineCache(file).length, this.getTokenizeMaxLength());
    this.computedLang = forcePlainText ? "text" : file.lang ?? getFiletypeFromFileName(file.name);
    const hasThemes = this.highlighter != null && hasResolvedThemes(getThemes(this.getLocalHighlightTheme()));
    const hasLangs = forcePlainText || this.highlighter != null && areLanguagesAttached(this.computedLang);
    if (this.highlighter == null || !hasThemes || !hasLangs) this.highlighter = await this.initializeHighlighter();
    return this.renderFileWithHighlighter(file, this.highlighter, forcePlainText);
  }
  renderFileWithHighlighter(file, highlighter, forcePlainText = false) {
    const { options } = this.getRenderOptions(file);
    return {
      result: renderFileWithHighlighter(file, highlighter, options, { forcePlainText }),
      options
    };
  }
  processFileResult(file, renderRange, { code, themeStyles, baseThemeType }) {
    const totalLines = this.getLineCount(file);
    const { disableFileHeader = false } = this.options;
    const contentArray = [];
    const gutter = createGutterWrapper();
    const endLine = Math.min(renderRange.startingLine + renderRange.totalLines, totalLines);
    let rowCount = 0;
    const fileLevelAnnotations = shouldRenderFileAnnotations(renderRange) ? getFileAnnotations(this.lineAnnotations) : void 0;
    if (fileLevelAnnotations != null) {
      gutter.children.push(createGutterGap("context", "annotation", 1));
      contentArray.push(createAnnotationElement({
        hunkIndex: -1,
        lineIndex: -1,
        annotations: fileLevelAnnotations.map((annotation) => getLineAnnotationName(annotation))
      }));
      rowCount++;
    }
    for (let lineIndex = renderRange.startingLine; lineIndex < endLine; lineIndex++) {
      const lineNumber = lineIndex + 1;
      const line = code[lineIndex];
      if (line == null) {
        const message = "FileRenderer.processFileResult: Line doesnt exist";
        console.error(message, {
          name: file.name,
          lineIndex,
          lineNumber
        });
        throw new Error(message);
      }
      gutter.children.push(createGutterItem("context", lineNumber, `${lineIndex}`));
      contentArray.push(line);
      rowCount++;
      const annotations = this.lineAnnotations[lineNumber];
      if (annotations != null) {
        gutter.children.push(createGutterGap("context", "annotation", 1));
        contentArray.push(createAnnotationElement({
          hunkIndex: 0,
          lineIndex: lineNumber,
          annotations: annotations.map((annotation) => getLineAnnotationName(annotation))
        }));
        rowCount++;
      }
    }
    gutter.properties.style = `grid-row: span ${rowCount}`;
    return {
      gutterAST: gutter.children ?? [],
      contentAST: contentArray,
      preAST: this.createPreElement(totalLines),
      headerAST: !disableFileHeader ? this.renderHeader(file) : void 0,
      totalLines,
      rowCount,
      themeStyles,
      baseThemeType,
      bufferBefore: renderRange.bufferBefore,
      bufferAfter: renderRange.bufferAfter,
      css: ""
    };
  }
  renderHeader(file) {
    const { headerRenderMode = "default", stickyHeader = false } = this.options;
    return createFileHeaderElement({
      fileOrDiff: file,
      mode: headerRenderMode,
      stickyHeader
    });
  }
  renderFullHTML(result) {
    return toHtml(this.renderFullAST(result));
  }
  renderFullAST(result, children = []) {
    children.push(createHastElement({
      tagName: "code",
      children: this.renderCodeAST(result),
      properties: { "data-code": "" }
    }));
    return {
      ...result.preAST,
      children
    };
  }
  renderCodeAST(result) {
    const gutter = createGutterWrapper();
    gutter.children = result.gutterAST;
    gutter.properties.style = `grid-row: span ${result.rowCount}`;
    return [gutter, createContentColumn(result.contentAST, result.rowCount)];
  }
  renderPartialHTML(children, includeCodeNode = false) {
    if (!includeCodeNode) return toHtml(children);
    return toHtml(createHastElement({
      tagName: "code",
      children,
      properties: { "data-code": "" }
    }));
  }
  async initializeHighlighter() {
    this.highlighter = await getSharedHighlighter(getHighlighterOptions(this.computedLang, {
      theme: this.getLocalHighlightTheme(),
      preferredHighlighter: this.workerManager?.getPreferredHighlighter() ?? this.options.preferredHighlighter
    }));
    return this.highlighter;
  }
  onHighlightSuccess(file, result, options, highlighted = true) {
    if (this.editSessionActive) return;
    this.applyHighlightResult(file, result, options, highlighted);
  }
  applyHighlightResult(file, result, options, highlighted = true) {
    if (this.renderCache == null) return;
    const triggerRenderUpdate = !areFilesEqual(file, this.renderCache.file) || !this.renderCache.highlighted || !areFileRenderOptionsEqual(options, this.renderCache.options);
    this.renderCache = {
      file,
      options,
      highlighted,
      result,
      renderRange: void 0
    };
    if (triggerRenderUpdate) this.onRenderUpdate?.();
  }
  getMatchingWorkerResultCache(file, options) {
    if (this.editSessionActive) return;
    const cache = this.workerManager?.getFileResultCache(file);
    if (cache == null || !areFileRenderOptionsEqual(options, cache.options)) return;
    return cache;
  }
  hasHighlightedRenderCache(file, options) {
    const { renderCache } = this;
    return renderCache?.result != null && renderCache.highlighted && areFilesEqual(file, renderCache.file) && areFileRenderOptionsEqual(options, renderCache.options);
  }
  onHighlightError(error) {
    console.error(error);
  }
  getTokenizeMaxLength() {
    return this.options.tokenizeMaxLength ?? 1e5;
  }
  createPreElement(totalLines) {
    const { disableLineNumbers = false, overflow = "scroll" } = this.options;
    return createPreElement({
      type: "file",
      diffIndicators: "none",
      disableBackground: true,
      disableLineNumbers,
      overflow,
      split: false,
      totalLines
    });
  }
};
function isFileMassive(lineCount, tokenizeMaxLength) {
  return lineCount > tokenizeMaxLength;
}
function areLineAnnotationsEqual(annotationA, annotationB) {
  return annotationA.lineNumber === annotationB.lineNumber && annotationA.metadata === annotationB.metadata;
}
function getFileRendererOptions(options) {
  return {
    theme: options?.theme,
    disableLineNumbers: options?.disableLineNumbers,
    overflow: options?.overflow,
    themeType: options?.themeType,
    collapsed: options?.collapsed,
    disableFileHeader: options?.disableFileHeader,
    disableVirtualizationBuffers: options?.disableVirtualizationBuffers,
    stickyHeader: options?.stickyHeader,
    preferredHighlighter: options?.preferredHighlighter,
    useCSSClasses: options?.useCSSClasses,
    useTokenTransformer: shouldUseTokenTransformer(options),
    tokenizeMaxLineLength: options?.tokenizeMaxLineLength,
    tokenizeMaxLength: options?.tokenizeMaxLength,
    unsafeCSS: options?.unsafeCSS,
    headerRenderMode: options?.renderCustomHeader != null ? "custom" : "default"
  };
}
const EMPTY_STRINGS = [""];
let instanceId$1 = -1;
var File$1 = class File {
  options;
  workerManager;
  isContainerManaged;
  static LoadedCustomComponent = true;
  __id = `file:${++instanceId$1}`;
  type = "file";
  fileContainer;
  spriteSVG;
  pre;
  code;
  bufferBefore;
  bufferAfter;
  themeCSSStyle;
  appliedThemeCSS;
  hasAdoptedThemeCSS = false;
  unsafeCSSStyle;
  appliedUnsafeCSS;
  gutterUtilityContent;
  errorWrapper;
  placeHolder;
  lastRenderedHeaderHTML;
  cachedHeaderHTML;
  appliedPreAttributes;
  lastRowCount;
  mounted = false;
  headerElement;
  headerCustom;
  headerPrefix;
  headerFilenameSuffix;
  headerMetadata;
  fileRenderer;
  resizeManager;
  interactionManager;
  annotationCache = /* @__PURE__ */ new Map();
  lineAnnotations = [];
  managersDirty = false;
  file;
  renderRange;
  enabled = true;
  editor;
  constructor(options = { theme: DEFAULT_THEMES }, workerManager, isContainerManaged = false) {
    this.options = options;
    this.workerManager = workerManager;
    this.isContainerManaged = isContainerManaged;
    this.fileRenderer = new FileRenderer(options, this.handleHighlightRender, this.workerManager);
    this.resizeManager = new ResizeManager();
    this.interactionManager = new InteractionManager("file", pluckInteractionOptions(options));
    this.workerManager?.subscribeToThemeChanges(this);
  }
  handleHighlightRender = () => {
    this.rerender();
  };
  rerender() {
    if (!this.enabled || this.file == null) return;
    this.render({
      file: this.file,
      forceRender: true,
      renderRange: this.renderRange
    });
  }
  __getCurrentFile() {
    return this.file;
  }
  onThemeChange() {
    this.fileRenderer.clearRenderCache();
    this.rerender();
  }
  setOptions(options) {
    if (options == null) return;
    this.options = options;
    this.cachedHeaderHTML = void 0;
    this.syncInteractionOptions();
  }
  syncInteractionOptions() {
    this.interactionManager.setOptions(pluckInteractionOptions(this.options));
  }
  mergeOptions(options) {
    this.options = {
      ...this.options,
      ...options
    };
  }
  setThemeType(themeType) {
    if ((this.options.themeType ?? "system") === themeType) return;
    this.mergeOptions({ themeType });
    this.applyCachedThemeState(themeType);
  }
  applyCachedThemeState(themeType) {
    if (typeof this.options.theme === "string" || this.fileContainer == null || this.appliedThemeCSS == null) return false;
    const effectiveThemeType = this.appliedThemeCSS.baseThemeType ?? themeType;
    if (this.appliedThemeCSS.themeType === effectiveThemeType) return false;
    this.applyThemeState(this.fileContainer, this.appliedThemeCSS.themeStyles, themeType, this.appliedThemeCSS.baseThemeType);
    return true;
  }
  hasThemeChanged() {
    return this.appliedThemeCSS != null && !areThemesEqual(this.appliedThemeCSS.theme, this.options.theme ?? DEFAULT_THEMES);
  }
  getHoveredLine = () => {
    return this.interactionManager.getHoveredLine();
  };
  setLineAnnotations(lineAnnotations) {
    this.lineAnnotations = lineAnnotations;
  }
  setSelectedLines(range, options) {
    this.interactionManager.setSelection(range, options);
  }
  setEditorActiveLine(lineNumber, options) {
    this.interactionManager.setEditorActiveLine(lineNumber, {
      lineNumberOnly: options?.lineNumberOnly,
      side: options?.side ?? "additions"
    });
  }
  getCodeScrollLeft() {
    return this.code?.scrollLeft ?? 0;
  }
  setCodeScrollLeft(position) {
    if (this.code != null) this.code.scrollLeft = position;
  }
  __getEffectiveCodeOptions() {
    return {
      ...this.options,
      ...this.fileRenderer.getEffectiveCodeOptions()
    };
  }
  flushManagers() {
    if (!this.managersDirty || this.pre == null) {
      this.managersDirty = false;
      return;
    }
    const { overflow = "scroll" } = this.options;
    this.interactionManager.setup(this.pre);
    this.resizeManager.setup(this.pre, {
      disableAnnotations: overflow === "wrap",
      columnVariables: this.shouldApplyColumnVariables(overflow) ? "apply" : "measure"
    });
    this.managersDirty = false;
  }
  shouldApplyColumnVariables(overflow) {
    return overflow === "scroll" && this.lineAnnotations.length > 0;
  }
  cleanUp(recycle = false) {
    this.emitPostRender(true);
    this.editor?.cleanUp(recycle);
    this.editor = void 0;
    this.resizeManager.cleanUp();
    this.interactionManager.cleanUp();
    this.managersDirty = false;
    this.workerManager?.unsubscribeToThemeChanges(this);
    this.renderRange = void 0;
    if (!this.isContainerManaged) this.fileContainer?.remove();
    this.fileContainer = void 0;
    this.mounted = false;
    if (!recycle) this.lineAnnotations = [];
    this.clearAuxiliaryNodes();
    this.pre = void 0;
    this.code = void 0;
    this.bufferBefore?.remove();
    this.bufferBefore = void 0;
    this.bufferAfter?.remove();
    this.bufferAfter = void 0;
    this.appliedPreAttributes = void 0;
    this.lastRowCount = void 0;
    this.headerElement = void 0;
    this.headerPrefix = void 0;
    this.headerFilenameSuffix = void 0;
    this.headerMetadata = void 0;
    this.headerCustom = void 0;
    this.lastRenderedHeaderHTML = void 0;
    if (!recycle) this.cachedHeaderHTML = void 0;
    this.errorWrapper?.remove();
    this.errorWrapper = void 0;
    this.spriteSVG = void 0;
    this.themeCSSStyle = void 0;
    this.appliedThemeCSS = void 0;
    this.hasAdoptedThemeCSS = false;
    this.unsafeCSSStyle = void 0;
    this.appliedUnsafeCSS = void 0;
    this.placeHolder?.remove();
    this.placeHolder = void 0;
    if (recycle) this.fileRenderer.recycle();
    else {
      this.fileRenderer.cleanUp();
      this.workerManager = void 0;
      this.file = void 0;
    }
    this.enabled = false;
  }
  virtualizedSetup() {
    this.enabled = true;
    this.workerManager?.subscribeToThemeChanges(this);
  }
  hydrate(props) {
    const { fileContainer, prerenderedHTML, preventEmit = false, file, lineAnnotations } = props;
    if (!this.enabled) throw new Error("File.hydrate: attempting to call hydrate after cleaned up");
    if (this.fileContainer != null) throw new Error("File.hydrate: hydrate can only be called before the instance has rendered or hydrated");
    this.hydrateElements(fileContainer, prerenderedHTML);
    if (shouldRenderCode(this.pre, file, this.options.collapsed) || shouldRenderHeader(this.headerElement, file, this.options.disableFileHeader)) this.render({
      ...props,
      preventEmit: true
    });
    else this.hydrationSetup({
      file,
      lineAnnotations
    });
    if (!preventEmit) this.emitPostRender();
  }
  hydrateElements(fileContainer, prerenderedHTML) {
    if (this.fileContainer !== fileContainer) this.emitPostRender(true);
    prerenderHTMLIfNecessary(fileContainer, prerenderedHTML);
    for (const element of Array.from(fileContainer.shadowRoot?.children ?? [])) {
      if (element instanceof SVGElement) {
        this.spriteSVG = element;
        continue;
      }
      if (!(element instanceof HTMLElement)) continue;
      if (element instanceof HTMLPreElement) {
        this.pre = element;
        this.appliedPreAttributes = void 0;
        continue;
      }
      if (element instanceof HTMLStyleElement && element.hasAttribute("data-theme-css")) {
        this.themeCSSStyle = element;
        continue;
      }
      if (element instanceof HTMLStyleElement && element.hasAttribute("data-unsafe-css")) {
        this.unsafeCSSStyle = element;
        this.appliedUnsafeCSS = element.textContent;
        continue;
      }
      if ("diffsHeader" in element.dataset) {
        this.headerElement = element;
        this.lastRenderedHeaderHTML = void 0;
        continue;
      }
    }
    if (this.pre != null) {
      this.syncCodeNodeFromPre(this.pre);
      this.pre.removeAttribute("data-dehydrated");
    }
    this.fileContainer = fileContainer;
    this.hydrateMeasuredScrollbar();
  }
  hydrationSetup({ file, lineAnnotations }) {
    this.lineAnnotations = lineAnnotations ?? this.lineAnnotations;
    this.file = file;
    this.fileRenderer.setOptions(getFileRendererOptions(this.options));
    this.syncInteractionOptions();
    if (this.pre == null) return;
    this.fileRenderer.hydrate(file);
    this.renderAnnotations();
    this.renderGutterUtility();
    this.injectUnsafeCSS();
    this.managersDirty = true;
    this.flushManagers();
  }
  getOrCreateLineCache(file = this.file) {
    return file != null ? this.fileRenderer.getOrCreateLineCache(file) : EMPTY_STRINGS;
  }
  updateBuffers(renderRange) {
    if (this.pre != null) this.applyBuffers(this.pre, renderRange);
  }
  syncRenderViewToEditor() {
    const editor = this.editor;
    const fileContainer = this.fileContainer;
    const file = this.file;
    const lineAnnotations = this.lineAnnotations;
    const renderRange = this.renderRange;
    if (editor != null && fileContainer != null && file != null) this.fileRenderer.initializeHighlighter().then((highlighter) => {
      if (!this.enabled || this.editor !== editor || this.fileContainer !== fileContainer || this.file !== file) return;
      editor.__syncRenderView(highlighter, fileContainer, file, lineAnnotations, renderRange);
    });
  }
  attachEditor(editor) {
    this.editor?.cleanUp();
    this.editor = editor;
    this.fileRenderer.beginEditSession();
    const preparedFile = this.file == null ? void 0 : editor.__prepareFile?.(this.file);
    if (preparedFile !== void 0 && preparedFile !== this.file) this.renderPreparedFile({
      file: preparedFile,
      forceRender: true,
      preventEmit: true,
      renderRange: this.renderRange
    });
    else if (this.fileRenderer.editorRenderReady()) this.syncRenderViewToEditor();
    else this.rerender();
    return () => {
      this.editor = void 0;
      this.fileRenderer.endEditSession();
    };
  }
  applyDocumentChange(textDocument, newLineAnnotations) {
    this.fileRenderer.applyDocumentChange(textDocument);
    if (newLineAnnotations != null && newLineAnnotations !== this.lineAnnotations && this.file != null) {
      this.setLineAnnotations(newLineAnnotations);
      this.fileRenderer.setLineAnnotations(this.lineAnnotations);
      this.renderAnnotations();
    }
  }
  updateRenderCache(dirtyLines, themeType, options) {
    this.fileRenderer.updateRenderCache(dirtyLines, themeType, options?.lineCountChangeInFlight);
  }
  render(props) {
    if (!this.enabled) throw new Error("File.render: attempting to call render after cleaned up");
    const file = this.editor?.__prepareFile?.(props.file) ?? props.file;
    return this.renderPreparedFile(file === props.file ? props : {
      ...props,
      file
    });
  }
  renderPreparedFile({ file, fileContainer, forceRender = false, preventEmit = false, containerWrapper, deferManagers = false, lineAnnotations, renderRange }) {
    this.editor?.__postponeBgTokenizeToNextFrame();
    const { collapsed = false, themeType = "system" } = this.options;
    const nextRenderRange = collapsed ? void 0 : renderRange;
    const previousRenderRange = this.renderRange;
    const themeChanged = this.hasThemeChanged();
    const annotationsChanged = lineAnnotations != null && (lineAnnotations.length > 0 || this.lineAnnotations.length > 0) ? lineAnnotations !== this.lineAnnotations : false;
    const didFileChange = !areFilesEqual(this.file, file) || this.fileRenderer.hasUnkeyedFileContentsChanged(file);
    if (!collapsed && !forceRender && areRenderRangesEqual(nextRenderRange, this.renderRange) && !didFileChange && !annotationsChanged && !themeChanged) return this.applyCachedThemeState(themeType);
    this.renderRange = nextRenderRange;
    if (didFileChange) this.cachedHeaderHTML = void 0;
    this.file = file;
    this.fileRenderer.setOptions(getFileRendererOptions(this.options));
    this.syncInteractionOptions();
    if (lineAnnotations != null) this.setLineAnnotations(lineAnnotations);
    this.fileRenderer.setLineAnnotations(this.lineAnnotations);
    const { disableErrorHandling = false, disableFileHeader = false } = this.options;
    if (disableFileHeader) {
      if (this.headerElement != null) {
        this.headerElement.remove();
        this.headerElement = void 0;
        this.lastRenderedHeaderHTML = void 0;
      }
      this.clearHeaderSlots();
    }
    fileContainer = this.getOrCreateFileContainerNode(fileContainer, containerWrapper);
    this.applyCachedThemeState(themeType);
    if (collapsed) {
      this.removeRenderedCode();
      this.clearAuxiliaryNodes();
      try {
        const fileResult = this.fileRenderer.renderFile(file, EMPTY_RENDER_RANGE);
        if (fileResult != null) this.applyThemeState(fileContainer, fileResult.themeStyles, themeType, fileResult.baseThemeType);
        if (fileResult?.headerAST != null) this.applyHeaderToDOM(fileResult.headerAST, fileContainer);
        this.injectUnsafeCSS();
      } catch (error) {
        if (disableErrorHandling) throw error;
        console.error(error);
        if (error instanceof Error) this.applyErrorToDOM(error, fileContainer);
      }
      if (!preventEmit) this.emitPostRender();
      return true;
    }
    try {
      const pre = this.getOrCreatePreNode(fileContainer);
      if (!this.canPartiallyRender(forceRender, annotationsChanged, didFileChange || themeChanged) || !this.applyPartialRender(previousRenderRange, nextRenderRange)) {
        const fileResult = this.fileRenderer.renderFile(file, nextRenderRange);
        if (fileResult == null) {
          if (this.workerManager?.isInitialized() === false) this.workerManager.initialize().then(() => this.rerender());
          return false;
        }
        this.applyThemeState(fileContainer, fileResult.themeStyles, themeType, fileResult.baseThemeType);
        if (fileResult.headerAST != null) this.applyHeaderToDOM(fileResult.headerAST, fileContainer);
        this.applyFullRender(fileResult, pre);
      }
      this.applyBuffers(pre, nextRenderRange);
      this.injectUnsafeCSS();
      this.renderAnnotations();
      this.renderGutterUtility();
      this.managersDirty = true;
      if (!deferManagers) this.flushManagers();
      if (this.editor != null) this.syncRenderViewToEditor();
    } catch (error) {
      if (disableErrorHandling) throw error;
      console.error(error);
      if (error instanceof Error) this.applyErrorToDOM(error, fileContainer);
    }
    if (!preventEmit) this.emitPostRender();
    return true;
  }
  emitPostRender(unmount = false) {
    const { fileContainer, options: { onPostRender } } = this;
    if (unmount) {
      if (!this.mounted) return;
      this.mounted = false;
      if (fileContainer == null) return;
      onPostRender?.(fileContainer, this, "unmount");
      return;
    }
    if (fileContainer == null) return;
    const phase = this.mounted ? "update" : "mount";
    this.mounted = true;
    onPostRender?.(fileContainer, this, phase);
  }
  removeRenderedCode() {
    this.resizeManager.cleanUp();
    this.interactionManager.cleanUp();
    this.bufferBefore?.remove();
    this.bufferBefore = void 0;
    this.bufferAfter?.remove();
    this.bufferAfter = void 0;
    this.code?.remove();
    this.code = void 0;
    this.pre?.remove();
    this.pre = void 0;
    this.appliedPreAttributes = void 0;
    this.lastRowCount = void 0;
  }
  clearAuxiliaryNodes() {
    for (const { element } of this.annotationCache.values()) element.remove();
    this.annotationCache.clear();
    this.gutterUtilityContent?.remove();
    this.gutterUtilityContent = void 0;
  }
  canPartiallyRender(forceRender, annotationsChanged, didContentChange) {
    if (forceRender || annotationsChanged || didContentChange) return false;
    return true;
  }
  renderPlaceholder(height) {
    if (this.fileContainer == null) return false;
    this.emitPostRender(true);
    this.cleanChildNodes();
    if (this.placeHolder == null) {
      const shadowRoot = this.fileContainer.shadowRoot ?? this.fileContainer.attachShadow({ mode: "open" });
      this.placeHolder = document.createElement("div");
      this.placeHolder.dataset.placeholder = "";
      shadowRoot.appendChild(this.placeHolder);
    }
    this.placeHolder.style.setProperty("height", `${height}px`);
    return true;
  }
  async primeHighlightCache(file = this.file) {
    const { workerManager } = this;
    if (file == null || workerManager == null || !workerManager.isWorkingPool() || file.cacheKey == null || isFilePlainText(file)) return;
    const tokenizeMaxLength = this.options.tokenizeMaxLength ?? 1e5;
    if (this.fileRenderer.getOrCreateLineCache(file).length > tokenizeMaxLength) return;
    await workerManager.primeFileHighlightCache(file).catch((error) => {
      console.error(error);
    });
  }
  cleanChildNodes() {
    this.resizeManager.cleanUp();
    this.interactionManager.cleanUp();
    this.clearAuxiliaryNodes();
    this.bufferAfter?.remove();
    this.bufferBefore?.remove();
    this.code?.remove();
    this.errorWrapper?.remove();
    this.headerElement?.remove();
    this.headerPrefix?.remove();
    this.headerFilenameSuffix?.remove();
    this.headerMetadata?.remove();
    this.headerCustom?.remove();
    this.pre?.remove();
    this.spriteSVG?.remove();
    this.themeCSSStyle?.remove();
    this.unsafeCSSStyle?.remove();
    this.bufferAfter = void 0;
    this.bufferBefore = void 0;
    this.code = void 0;
    this.errorWrapper = void 0;
    this.headerElement = void 0;
    this.headerPrefix = void 0;
    this.headerFilenameSuffix = void 0;
    this.headerMetadata = void 0;
    this.headerCustom = void 0;
    this.pre = void 0;
    this.spriteSVG = void 0;
    this.themeCSSStyle = void 0;
    this.appliedThemeCSS = void 0;
    this.hasAdoptedThemeCSS = false;
    this.unsafeCSSStyle = void 0;
    this.appliedUnsafeCSS = void 0;
    this.lastRenderedHeaderHTML = void 0;
    this.lastRowCount = void 0;
    this.mounted = false;
  }
  renderAnnotations() {
    if (this.isContainerManaged || this.fileContainer == null) {
      for (const { element } of this.annotationCache.values()) element.remove();
      this.annotationCache.clear();
      return;
    }
    const staleAnnotations = new Map(this.annotationCache);
    const { renderAnnotation } = this.options;
    if (renderAnnotation != null && this.lineAnnotations.length > 0) for (const [index, annotation] of this.lineAnnotations.entries()) {
      const id = `${index}-${getLineAnnotationName(annotation)}`;
      let cache = this.annotationCache.get(id);
      if (cache == null || !areLineAnnotationsEqual(annotation, cache.annotation)) {
        cache?.element.remove();
        const content = renderAnnotation(annotation);
        if (content == null) continue;
        cache = {
          element: createAnnotationWrapperNode(getLineAnnotationName(annotation)),
          annotation
        };
        cache.element.appendChild(content);
        this.fileContainer.appendChild(cache.element);
        this.annotationCache.set(id, cache);
      }
      staleAnnotations.delete(id);
    }
    for (const [id, { element }] of staleAnnotations.entries()) {
      this.annotationCache.delete(id);
      element.remove();
    }
  }
  renderGutterUtility() {
    const { renderGutterUtility } = this.options;
    if (this.fileContainer == null || renderGutterUtility == null) {
      this.gutterUtilityContent?.remove();
      this.gutterUtilityContent = void 0;
      return;
    }
    const element = renderGutterUtility(this.interactionManager.getHoveredLine);
    if (element != null && this.gutterUtilityContent != null) return;
    else if (element == null) {
      this.gutterUtilityContent?.remove();
      this.gutterUtilityContent = void 0;
      return;
    }
    const gutterUtilityContent = createGutterUtilityContentNode();
    gutterUtilityContent.appendChild(element);
    this.fileContainer.appendChild(gutterUtilityContent);
    this.gutterUtilityContent = gutterUtilityContent;
  }
  injectUnsafeCSS() {
    const { unsafeCSS } = this.options;
    const shadowRoot = this.fileContainer?.shadowRoot;
    if (shadowRoot == null) return;
    if (unsafeCSS == null || unsafeCSS === "") {
      if (this.unsafeCSSStyle != null) {
        this.unsafeCSSStyle.remove();
        this.unsafeCSSStyle = void 0;
      }
      this.appliedUnsafeCSS = void 0;
      return;
    }
    if (this.unsafeCSSStyle?.parentNode === shadowRoot && this.appliedUnsafeCSS === unsafeCSS) return;
    this.unsafeCSSStyle ??= createUnsafeCSSStyleNode();
    if (this.unsafeCSSStyle.parentNode !== shadowRoot) shadowRoot.appendChild(this.unsafeCSSStyle);
    this.unsafeCSSStyle.textContent = wrapUnsafeCSS(unsafeCSS);
    this.appliedUnsafeCSS = unsafeCSS;
  }
  applyThemeState(container, themeStyles, themeType, baseThemeType) {
    const shadowRoot = container.shadowRoot ?? container.attachShadow({ mode: "open" });
    const effectiveThemeType = baseThemeType ?? themeType;
    const currentTheme = this.options.theme ?? DEFAULT_THEMES;
    const theme = typeof currentTheme === "string" ? currentTheme : { ...currentTheme };
    const scrollbarGutter = getMeasuredScrollbarGutter(shadowRoot);
    if (this.themeCSSStyle?.parentNode === shadowRoot && this.appliedThemeCSS?.themeStyles === themeStyles && this.appliedThemeCSS.themeType === effectiveThemeType && this.appliedThemeCSS.scrollbarGutter === scrollbarGutter) {
      this.appliedThemeCSS.theme = theme;
      return;
    }
    if (this.hasAdoptedThemeCSS && this.themeCSSStyle?.parentNode === shadowRoot) {
      this.hasAdoptedThemeCSS = false;
      this.appliedThemeCSS = {
        theme,
        themeStyles,
        themeType: effectiveThemeType,
        baseThemeType,
        scrollbarGutter
      };
      return;
    }
    this.themeCSSStyle = upsertHostThemeStyle({
      shadowRoot,
      currentNode: this.themeCSSStyle,
      themeCSS: wrapThemeCSS(themeStyles, effectiveThemeType, scrollbarGutter)
    });
    this.appliedThemeCSS = this.themeCSSStyle != null ? {
      theme,
      themeStyles,
      themeType: effectiveThemeType,
      baseThemeType,
      scrollbarGutter
    } : void 0;
  }
  hydrateMeasuredScrollbar() {
    const shadowRoot = this.fileContainer?.shadowRoot;
    if (shadowRoot == null || this.themeCSSStyle == null) return;
    this.themeCSSStyle.textContent = patchScrollbarGutterSize(this.themeCSSStyle.textContent ?? "", getMeasuredScrollbarGutter(shadowRoot));
  }
  shouldGuardRebuildScroll() {
    return this.editor != null && isSafari();
  }
  applyFullRender(result, pre) {
    this.cleanupErrorWrapper();
    this.applyPreNodeAttributes(pre, result);
    const code = this.code = getOrCreateCodeNode({ code: this.code });
    const codeAst = this.fileRenderer.renderCodeAST(result);
    this.editor?.__captureFocusForDOMReplacement();
    const applyColumns = () => {
      if (code.childElementCount >= 2) for (let i = 0; i < 2; i++) {
        const domEl = code.children[i];
        const astEl = codeAst[i];
        domEl.innerHTML = toHtml(astEl.children);
        domEl.style.cssText = astEl.properties.style;
      }
      else code.innerHTML = toHtml(codeAst);
      if (!pre.contains(code)) pre.replaceChildren(code);
    };
    if (this.shouldGuardRebuildScroll()) guardWebKitScrollDuringRebuild(pre, applyColumns);
    else applyColumns();
    this.lastRowCount = result.rowCount;
  }
  applyPartialRender(previousRenderRange, renderRange) {
    if (previousRenderRange == null || renderRange == null) return false;
    const { file, code } = this;
    const columns = code != null ? this.getColumns(code) : void 0;
    if (file == null || code == null || columns == null) return false;
    const previousStart = previousRenderRange.startingLine;
    const nextStart = renderRange.startingLine;
    const previousEnd = previousRenderRange.totalLines === Infinity ? Number.POSITIVE_INFINITY : previousStart + previousRenderRange.totalLines;
    const nextEnd = renderRange.totalLines === Infinity ? Number.POSITIVE_INFINITY : nextStart + renderRange.totalLines;
    const overlapStart = Math.max(previousStart, nextStart);
    const overlapEnd = Math.min(previousEnd, nextEnd);
    if (overlapEnd <= overlapStart) return false;
    if (!this.trimDOMToOverlap(columns.gutter, overlapStart, overlapEnd) || !this.trimDOMToOverlap(columns.content, overlapStart, overlapEnd)) throw new Error("File.applyPartialRender: failed to trim to overlap");
    let { length: rowCount } = columns.content.children;
    const renderChunk = (startingLine, totalLines) => {
      if (totalLines <= 0) return;
      return this.fileRenderer.renderFile(file, {
        startingLine,
        totalLines,
        bufferBefore: 0,
        bufferAfter: 0
      });
    };
    const prependResult = nextStart < overlapStart ? renderChunk(nextStart, overlapStart - nextStart) : void 0;
    if (prependResult === void 0 && nextStart < overlapStart) return false;
    const appendTotalLines = nextEnd === Number.POSITIVE_INFINITY ? Number.POSITIVE_INFINITY : Math.max(0, nextEnd - overlapEnd);
    const appendResult = nextEnd > overlapEnd ? renderChunk(overlapEnd, appendTotalLines) : void 0;
    if (appendResult === void 0 && nextEnd > overlapEnd) return false;
    this.cleanupErrorWrapper();
    if (prependResult != null) {
      columns.gutter.insertAdjacentHTML("afterbegin", this.fileRenderer.renderPartialHTML(prependResult.gutterAST));
      columns.content.insertAdjacentHTML("afterbegin", this.fileRenderer.renderPartialHTML(prependResult.contentAST));
      rowCount += prependResult.rowCount;
    }
    if (appendResult != null) {
      columns.gutter.insertAdjacentHTML("beforeend", this.fileRenderer.renderPartialHTML(appendResult.gutterAST));
      columns.content.insertAdjacentHTML("beforeend", this.fileRenderer.renderPartialHTML(appendResult.contentAST));
      rowCount += appendResult.rowCount;
    }
    if (this.lastRowCount !== rowCount) {
      columns.gutter.style.setProperty("grid-row", `span ${rowCount}`);
      columns.content.style.setProperty("grid-row", `span ${rowCount}`);
      this.lastRowCount = rowCount;
    }
    return true;
  }
  getColumns(code) {
    const gutter = code.children[0];
    const content = code.children[1];
    if (!(gutter instanceof HTMLElement) || !(content instanceof HTMLElement) || gutter.dataset.gutter == null || content.dataset.content == null) return;
    return {
      gutter,
      content
    };
  }
  trimDOMToOverlap(container, overlapStart, overlapEnd) {
    const boundaryIndices = this.getDOMBoundaryIndices(container, [overlapStart, overlapEnd]);
    const startIndex = boundaryIndices.get(overlapStart) ?? container.children.length;
    const endIndex = boundaryIndices.get(overlapEnd) ?? container.children.length;
    if (startIndex > endIndex) return false;
    for (let i = container.children.length - 1; i >= endIndex; i -= 1) container.children[i]?.remove();
    for (let i = startIndex - 1; i >= 0; i -= 1) container.children[i]?.remove();
    return true;
  }
  getDOMBoundaryIndices(container, boundaries) {
    const sortedBoundaries = [...new Set(boundaries)].sort((a, b) => a - b);
    const boundaryIndices = /* @__PURE__ */ new Map();
    if (sortedBoundaries.length === 0) return boundaryIndices;
    let boundaryIndex = 0;
    let nextBoundary = sortedBoundaries[boundaryIndex];
    const { children } = container;
    if (nextBoundary === 0) {
      boundaryIndices.set(0, 0);
      boundaryIndex += 1;
      nextBoundary = sortedBoundaries[boundaryIndex];
    }
    for (let i = 0; i < children.length; i += 1) {
      const child = children[i];
      if (!(child instanceof HTMLElement)) continue;
      const lineIndex = this.getLineIndexFromDOMNode(child);
      if (lineIndex == null) continue;
      while (nextBoundary != null && lineIndex >= nextBoundary) {
        boundaryIndices.set(nextBoundary, i);
        boundaryIndex += 1;
        nextBoundary = sortedBoundaries[boundaryIndex];
      }
      if (boundaryIndex >= sortedBoundaries.length) break;
    }
    for (const boundary of sortedBoundaries) if (!boundaryIndices.has(boundary)) boundaryIndices.set(boundary, children.length);
    return boundaryIndices;
  }
  getLineIndexFromDOMNode(node) {
    const lineIndexAttr = node.dataset.lineIndex;
    if (lineIndexAttr == null) return;
    const parsed = Number(lineIndexAttr);
    return Number.isNaN(parsed) ? void 0 : parsed;
  }
  applyBuffers(pre, renderRange) {
    if (renderRange == null || this.shouldDisableVirtualizationBuffers()) {
      if (this.bufferBefore != null) {
        this.bufferBefore.remove();
        this.bufferBefore = void 0;
      }
      if (this.bufferAfter != null) {
        this.bufferAfter.remove();
        this.bufferAfter = void 0;
      }
      return;
    }
    if (renderRange.bufferBefore > 0) {
      if (this.bufferBefore == null) {
        this.bufferBefore = document.createElement("div");
        this.bufferBefore.dataset.virtualizerBuffer = "before";
        pre.before(this.bufferBefore);
      }
      this.bufferBefore.style.setProperty("height", `${renderRange.bufferBefore}px`);
      this.bufferBefore.style.setProperty("contain", "strict");
    } else if (this.bufferBefore != null) {
      this.bufferBefore.remove();
      this.bufferBefore = void 0;
    }
    if (renderRange.bufferAfter > 0) {
      if (this.bufferAfter == null) {
        this.bufferAfter = document.createElement("div");
        this.bufferAfter.dataset.virtualizerBuffer = "after";
        pre.after(this.bufferAfter);
      }
      this.bufferAfter.style.setProperty("height", `${renderRange.bufferAfter}px`);
      this.bufferAfter.style.setProperty("contain", "strict");
    } else if (this.bufferAfter != null) {
      this.bufferAfter.remove();
      this.bufferAfter = void 0;
    }
  }
  shouldDisableVirtualizationBuffers() {
    return this.options.disableVirtualizationBuffers ?? false;
  }
  applyHeaderToDOM(headerAST, container) {
    const { file } = this;
    if (file == null) return;
    this.cleanupErrorWrapper();
    this.placeHolder?.remove();
    this.placeHolder = void 0;
    const headerHTML = this.cachedHeaderHTML ?? toHtml(headerAST);
    this.cachedHeaderHTML = headerHTML;
    if (headerHTML !== this.lastRenderedHeaderHTML) {
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = headerHTML;
      const newHeader = tempDiv.firstElementChild;
      if (!(newHeader instanceof HTMLElement)) return;
      if (this.headerElement != null) container.shadowRoot?.replaceChild(newHeader, this.headerElement);
      else container.shadowRoot?.prepend(newHeader);
      this.headerElement = newHeader;
      this.lastRenderedHeaderHTML = headerHTML;
    }
    if (this.isContainerManaged) return;
    const { renderHeaderPrefix, renderHeaderFilenameSuffix, renderCustomHeader, renderHeaderMetadata } = this.options;
    if (renderCustomHeader != null) {
      const content = renderCustomHeader(file) ?? void 0;
      this.headerCustom = this.upsertHeaderSlotElement(container, this.headerCustom, CUSTOM_HEADER_SLOT_ID, content);
      this.headerPrefix?.remove();
      this.headerFilenameSuffix?.remove();
      this.headerMetadata?.remove();
      this.headerPrefix = void 0;
      this.headerFilenameSuffix = void 0;
      this.headerMetadata = void 0;
    } else {
      const prefix = renderHeaderPrefix?.(file) ?? void 0;
      const suffix = renderHeaderFilenameSuffix?.(file) ?? void 0;
      const content = renderHeaderMetadata?.(file) ?? void 0;
      this.headerPrefix = this.upsertHeaderSlotElement(container, this.headerPrefix, HEADER_PREFIX_SLOT_ID, prefix);
      this.headerFilenameSuffix = this.upsertHeaderSlotElement(container, this.headerFilenameSuffix, HEADER_FILENAME_SUFFIX_SLOT_ID, suffix);
      this.headerMetadata = this.upsertHeaderSlotElement(container, this.headerMetadata, HEADER_METADATA_SLOT_ID, content);
      this.headerCustom?.remove();
      this.headerCustom = void 0;
    }
  }
  clearHeaderSlots() {
    this.headerPrefix?.remove();
    this.headerFilenameSuffix?.remove();
    this.headerMetadata?.remove();
    this.headerCustom?.remove();
    this.headerPrefix = void 0;
    this.headerFilenameSuffix = void 0;
    this.headerMetadata = void 0;
    this.headerCustom = void 0;
  }
  upsertHeaderSlotElement(container, current, slot, content) {
    if (content == null) {
      current?.remove();
      return;
    }
    const element = current ?? this.createHeaderSlotElement(slot);
    if (current == null) container.appendChild(element);
    this.replaceHeaderSlotContent(element, content);
    return element;
  }
  replaceHeaderSlotContent(element, content) {
    element.replaceChildren();
    if (content instanceof Element) element.appendChild(content);
    else element.innerText = `${content}`;
  }
  createHeaderSlotElement(slot) {
    const element = document.createElement("div");
    element.slot = slot;
    return element;
  }
  getOrCreateFileContainerNode(fileContainer, parentNode) {
    const { fileContainer: previousContainer } = this;
    const nextContainer = fileContainer ?? previousContainer ?? document.createElement("diffs-container");
    const containerChanged = previousContainer !== nextContainer;
    if (previousContainer != null && containerChanged) this.editor?.__captureFocusForDOMReplacement();
    if (containerChanged) this.emitPostRender(true);
    this.fileContainer = nextContainer;
    if (previousContainer != null && containerChanged) {
      this.lastRenderedHeaderHTML = void 0;
      this.headerElement = void 0;
    }
    if (parentNode != null && this.fileContainer.parentNode !== parentNode) parentNode.appendChild(this.fileContainer);
    if (containerChanged) this.adoptReusableShellElements(this.fileContainer);
    this.ensureSpriteSVG(this.fileContainer);
    return this.fileContainer;
  }
  adoptReusableShellElements(fileContainer) {
    const { shadowRoot } = fileContainer;
    if (shadowRoot == null) return;
    for (const element of shadowRoot.children) if (element instanceof SVGElement) this.spriteSVG ??= element;
    else if (isStyleNode(element) && element.hasAttribute("data-theme-css")) {
      this.themeCSSStyle ??= element;
      this.hasAdoptedThemeCSS = true;
    } else if (isStyleNode(element) && element.hasAttribute("data-unsafe-css")) {
      this.unsafeCSSStyle ??= element;
      this.appliedUnsafeCSS ??= this.options.unsafeCSS ?? void 0;
    }
  }
  ensureSpriteSVG(fileContainer) {
    const shadowRoot = fileContainer.shadowRoot ?? fileContainer.attachShadow({ mode: "open" });
    if (this.spriteSVG == null) {
      const fragment = document.createElement("div");
      fragment.innerHTML = SVGSpriteSheet;
      const firstChild = fragment.firstChild;
      if (firstChild instanceof SVGElement) this.spriteSVG = firstChild;
    }
    if (this.spriteSVG != null && this.spriteSVG.parentNode !== shadowRoot) shadowRoot.appendChild(this.spriteSVG);
  }
  getOrCreatePreNode(container) {
    const shadowRoot = container.shadowRoot ?? container.attachShadow({ mode: "open" });
    if (this.pre == null) {
      this.pre = document.createElement("pre");
      this.appliedPreAttributes = void 0;
      this.code = void 0;
      shadowRoot.appendChild(this.pre);
    } else if (this.pre.parentNode !== shadowRoot) {
      this.editor?.__captureFocusForDOMReplacement();
      container.shadowRoot?.appendChild(this.pre);
      this.appliedPreAttributes = void 0;
    }
    this.placeHolder?.remove();
    this.placeHolder = void 0;
    return this.pre;
  }
  syncCodeNodeFromPre(pre) {
    this.code = void 0;
    for (const child of Array.from(pre.children)) {
      if (!(child instanceof HTMLElement)) continue;
      if (child.hasAttribute("data-code")) {
        this.code = child;
        return;
      }
    }
  }
  applyPreNodeAttributes(pre, { totalLines }) {
    const { overflow = "scroll", disableLineNumbers = false } = this.options;
    const preProperties = {
      type: "file",
      split: false,
      overflow,
      disableLineNumbers,
      diffIndicators: "none",
      disableBackground: true,
      totalLines
    };
    if (arePrePropertiesEqual(preProperties, this.appliedPreAttributes)) return;
    setPreNodeProperties(pre, preProperties);
    this.appliedPreAttributes = preProperties;
  }
  applyErrorToDOM(error, container) {
    this.cleanupErrorWrapper();
    this.pre?.remove();
    this.pre = void 0;
    this.appliedPreAttributes = void 0;
    const shadowRoot = container.shadowRoot ?? container.attachShadow({ mode: "open" });
    this.errorWrapper ??= document.createElement("div");
    this.errorWrapper.dataset.errorWrapper = "";
    this.errorWrapper.textContent = "";
    shadowRoot.appendChild(this.errorWrapper);
    const errorMessage = document.createElement("div");
    errorMessage.dataset.errorMessage = "";
    errorMessage.innerText = error.message;
    this.errorWrapper.appendChild(errorMessage);
    const errorStack = document.createElement("pre");
    errorStack.dataset.errorStack = "";
    errorStack.innerText = error.stack ?? "No Error Stack";
    this.errorWrapper.appendChild(errorStack);
  }
  cleanupErrorWrapper() {
    this.errorWrapper?.remove();
    this.errorWrapper = void 0;
  }
};
function shouldRenderCode(pre, file, collapsed = false) {
  return !collapsed && pre == null && file != null;
}
function shouldRenderHeader(headerElement, file, disableFileHeader = false) {
  return headerElement == null && file != null && !disableFileHeader;
}
const LAYOUT_CHECKPOINT_INTERVAL = 5e3;
let instanceId = -1;
function hasFileLayoutOptionChanged(previousOptions, nextOptions) {
  return (previousOptions.overflow ?? "scroll") !== (nextOptions.overflow ?? "scroll") || (previousOptions.collapsed ?? false) !== (nextOptions.collapsed ?? false) || (previousOptions.disableLineNumbers ?? false) !== (nextOptions.disableLineNumbers ?? false) || (previousOptions.disableFileHeader ?? false) !== (nextOptions.disableFileHeader ?? false) || previousOptions.unsafeCSS !== nextOptions.unsafeCSS;
}
var VirtualizedFile = class extends File$1 {
  virtualizer;
  metrics;
  __id = `virtualized-file:${++instanceId}`;
  top;
  height = 0;
  cache = {
    heights: /* @__PURE__ */ new Map(),
    checkpoints: [],
    fileAnnotationHeight: 0
  };
  isVisible = false;
  isSetup = false;
  layoutDirty = true;
  forceRenderOverride;
  currentCollapsed;
  constructor(options, virtualizer, metrics = DEFAULT_VIRTUAL_FILE_METRICS, workerManager, isContainerManaged = false) {
    super(options, workerManager, isContainerManaged);
    this.virtualizer = virtualizer;
    this.metrics = metrics;
  }
  setMetrics(metrics, force = false) {
    const nextMetrics = computeVirtualFileMetrics(metrics);
    if (!force && areObjectsEqual(this.metrics, nextMetrics)) return;
    this.metrics = nextMetrics;
    this.resetLayoutCache();
  }
  setLineAnnotations(lineAnnotations) {
    if (this.syncLineAnnotations(lineAnnotations)) this.resetLayoutCache();
  }
  syncLineAnnotations(lineAnnotations) {
    if (lineAnnotations == null || lineAnnotations === this.lineAnnotations) return false;
    if (lineAnnotations.length === 0 && this.lineAnnotations.length === 0) return false;
    super.setLineAnnotations(lineAnnotations);
    return true;
  }
  hasLineAnnotations() {
    return this.lineAnnotations.some((annotation) => annotation.lineNumber > 0);
  }
  getLineHeight(lineIndex, hasMetadataLine = false) {
    const cached = this.cache.heights.get(lineIndex);
    if (cached != null) return cached;
    const multiplier = hasMetadataLine ? 2 : 1;
    return this.metrics.lineHeight * multiplier;
  }
  setOptions(options) {
    if (this.isAdvancedMode()) throw new Error("VirtualizedFile.setOptions cannot be used inside CodeView. Update CodeView options instead.");
    if (options == null) return;
    const { options: previousOptions } = this;
    const optionsChanged = !areOptionsEqual(previousOptions, options);
    const layoutChanged = hasFileLayoutOptionChanged(previousOptions, options);
    super.setOptions(options);
    if (layoutChanged) this.resetLayoutCache(true);
    if (optionsChanged) this.forceRenderOverride = true;
    if (optionsChanged) this.virtualizer.instanceChanged(this, layoutChanged);
  }
  setThemeType(themeType) {
    if (this.isAdvancedMode()) throw new Error("VirtualizedFile.setThemeType cannot be used inside CodeView. Update CodeView options instead.");
    super.setThemeType(themeType);
  }
  resetLayoutCache(recompute = false, resetRenderRange = true) {
    this.layoutDirty = true;
    this.cache.fileAnnotationHeight = 0;
    if (this.cache.heights.size > 0) this.cache.heights.clear();
    if (this.cache.checkpoints.length > 0) this.cache.checkpoints.length = 0;
    if (this.renderRange != null && resetRenderRange) this.renderRange = void 0;
    if (recompute && this.isSimpleMode()) this.computeApproximateSize();
  }
  reconcileHeights() {
    let hasHeightChange = false;
    if (this.fileContainer == null || this.file == null) {
      if (this.height !== 0) hasHeightChange = true;
      this.height = 0;
      return hasHeightChange;
    }
    const { overflow = "scroll" } = this.options;
    this.top = this.getVirtualizedTop();
    if (overflow === "scroll" && this.lineAnnotations.length === 0 && !this.isResizeDebuggingEnabled()) return hasHeightChange;
    if (this.code == null) return hasHeightChange;
    const content = this.code.children[1];
    if (!(content instanceof HTMLElement)) return hasHeightChange;
    const hasFileAnnotations = includesFileAnnotations(this.lineAnnotations);
    if (this.renderRange != null && hasFileAnnotations && shouldRenderFileAnnotations(this.renderRange)) {
      const nextFileAnnotationHeight = measureFileAnnotationHeight(content) ?? 0;
      if (nextFileAnnotationHeight !== this.cache.fileAnnotationHeight) {
        this.cache.fileAnnotationHeight = nextFileAnnotationHeight;
        hasHeightChange = true;
      }
    } else if (!hasFileAnnotations && this.cache.fileAnnotationHeight !== 0) {
      this.cache.fileAnnotationHeight = 0;
      hasHeightChange = true;
    }
    for (const line of content.children) {
      if (!(line instanceof HTMLElement)) continue;
      const lineIndexAttr = line.dataset.lineIndex;
      if (lineIndexAttr == null) continue;
      const lineIndex = Number(lineIndexAttr);
      let measuredHeight = line.getBoundingClientRect().height;
      let hasMetadata = false;
      if (line.nextElementSibling instanceof HTMLElement && ("lineAnnotation" in line.nextElementSibling.dataset || "noNewline" in line.nextElementSibling.dataset)) {
        if ("noNewline" in line.nextElementSibling.dataset) hasMetadata = true;
        measuredHeight += line.nextElementSibling.getBoundingClientRect().height;
      }
      const expectedHeight = this.getLineHeight(lineIndex, hasMetadata);
      if (measuredHeight === expectedHeight) continue;
      hasHeightChange = true;
      if (measuredHeight === this.metrics.lineHeight * (hasMetadata ? 2 : 1)) this.cache.heights.delete(lineIndex);
      else this.cache.heights.set(lineIndex, measuredHeight);
    }
    if (hasHeightChange || this.isResizeDebuggingEnabled()) this.computeApproximateSize(true);
    return hasHeightChange;
  }
  onRender = (dirty) => {
    if (this.fileContainer == null || this.file == null) return false;
    if (dirty) this.top = this.getVirtualizedTop();
    return this.render({ file: this.file });
  };
  prepareCodeViewItem(file, top, reset, lineAnnotations) {
    const annotationsChanged = this.syncLineAnnotations(lineAnnotations);
    const targetChanged = !areFilesEqual(this.file, file) || this.fileRenderer.hasUnkeyedFileContentsChanged(file);
    let shouldResetLayoutCache = reset?.resetFileLayoutCache === true || targetChanged || annotationsChanged;
    if (reset?.metrics != null) {
      this.metrics = reset.metrics;
      shouldResetLayoutCache = true;
    }
    const { collapsed = false } = this.options;
    if (this.currentCollapsed !== collapsed) {
      this.currentCollapsed = collapsed;
      shouldResetLayoutCache = true;
    }
    if (shouldResetLayoutCache) this.resetLayoutCache();
    if (this.file !== file) this.layoutDirty = true;
    this.file = file;
    this.top = top;
    this.computeApproximateSize();
    return this.height;
  }
  getLinePosition(lineNumber) {
    if (this.file == null || lineNumber < 1) return;
    const { disableFileHeader = false, collapsed = false } = this.options;
    const lastLineIndex = this.fileRenderer.getLineCount(this.file) - 1;
    let top = getVirtualFileHeaderRegion(this.metrics, disableFileHeader);
    if (collapsed || lastLineIndex < 0) return {
      top,
      height: 0
    };
    const clampedLineIndex = Math.min(Math.max(lineNumber - 1, 0), lastLineIndex);
    const { overflow = "scroll" } = this.options;
    const { lineHeight } = this.metrics;
    top += this.cache.fileAnnotationHeight;
    if (overflow === "scroll" && !this.hasLineAnnotations()) return {
      top: top + clampedLineIndex * lineHeight,
      height: lineHeight
    };
    const checkpoint = this.getLayoutCheckpointBeforeLineIndex(clampedLineIndex);
    top = checkpoint?.top ?? top;
    for (let lineIndex = checkpoint?.lineIndex ?? 0; lineIndex < clampedLineIndex; lineIndex++) top += this.getLineHeight(lineIndex, false);
    return {
      top,
      height: this.getLineHeight(clampedLineIndex, false)
    };
  }
  getEditorViewport() {
    return this.virtualizer.type === "simple" ? this.virtualizer.getRoot() : this.virtualizer.getContainerElement();
  }
  getNumericScrollAnchor(localViewportTop) {
    if (this.file == null || this.renderRange == null) return;
    const { disableFileHeader = false, collapsed = false, overflow = "scroll" } = this.options;
    if (collapsed || this.renderRange.totalLines <= 0) return;
    const lastLineIndex = this.fileRenderer.getLineCount(this.file) - 1;
    if (lastLineIndex < 0) return;
    const headerRegion = getVirtualFileHeaderRegion(this.metrics, disableFileHeader);
    const firstRenderedLineIndex = Math.min(this.renderRange.startingLine, lastLineIndex);
    const lastRenderedLineIndex = Math.min(firstRenderedLineIndex + this.renderRange.totalLines - 1, lastLineIndex);
    if (lastRenderedLineIndex < firstRenderedLineIndex) return;
    const { fileAnnotationHeight } = this.cache;
    if (overflow === "scroll" && !this.hasLineAnnotations()) {
      const { lineHeight } = this.metrics;
      const firstRenderedLineTop = headerRegion + (firstRenderedLineIndex === 0 ? fileAnnotationHeight : this.renderRange.bufferBefore);
      const lineIndex = firstRenderedLineIndex + Math.max(Math.ceil((localViewportTop - firstRenderedLineTop) / lineHeight), 0);
      if (lineIndex > lastRenderedLineIndex) return;
      return {
        lineNumber: lineIndex + 1,
        top: headerRegion + fileAnnotationHeight + lineIndex * lineHeight
      };
    }
    let top = headerRegion + (firstRenderedLineIndex === 0 ? fileAnnotationHeight : this.renderRange.bufferBefore);
    for (let lineIndex = firstRenderedLineIndex; lineIndex <= lastRenderedLineIndex; lineIndex++) {
      if (top >= localViewportTop) return {
        lineNumber: lineIndex + 1,
        top
      };
      top += this.getLineHeight(lineIndex);
    }
  }
  getVirtualizedHeight() {
    return this.height;
  }
  getAdvancedStickySpecs(windowSpecs) {
    if (this.top == null || this.file == null) return;
    if (this.options.collapsed === true) return {
      topOffset: this.top,
      height: this.height
    };
    const renderRange = windowSpecs != null ? this.computeRenderRangeFromWindow(this.file, this.top, windowSpecs) : this.renderRange;
    if (renderRange == null) return;
    const { bufferBefore, bufferAfter, totalLines } = renderRange;
    let headerOnlyOffset = 0;
    if (totalLines === 0) {
      const activeWindow = windowSpecs ?? this.virtualizer.getWindowSpecs();
      if (this.top < activeWindow.top) headerOnlyOffset = bufferAfter;
    }
    return {
      topOffset: this.top + bufferBefore + headerOnlyOffset,
      height: this.height - (bufferBefore + bufferAfter)
    };
  }
  cleanUp(recycle = false) {
    if (this.fileContainer != null && this.isSimpleMode()) this.getSimpleVirtualizer()?.disconnect(this.fileContainer);
    if (!recycle) this.resetLayoutCache();
    this.isSetup = false;
    super.cleanUp(recycle);
  }
  computeApproximateSize(force = false, file = this.file) {
    const shouldValidateSize = this.isResizeDebuggingEnabled();
    if (!force && !this.layoutDirty && !shouldValidateSize) return;
    const isFirstCompute = this.height === 0;
    this.height = 0;
    this.cache.checkpoints = [];
    if (file == null) {
      this.layoutDirty = false;
      return;
    }
    const { disableFileHeader = false, collapsed = false, overflow = "scroll" } = this.options;
    const { lineHeight } = this.metrics;
    const lineCount = this.fileRenderer.getLineCount(file);
    const headerRegion = getVirtualFileHeaderRegion(this.metrics, disableFileHeader);
    const paddingBottom = getVirtualFilePaddingBottom(this.metrics);
    this.height += headerRegion;
    if (collapsed) {
      this.layoutDirty = false;
      return;
    }
    this.height += this.cache.fileAnnotationHeight;
    if (overflow === "scroll" && !this.hasLineAnnotations()) this.height += lineCount * lineHeight;
    else for (let lineIndex = 0; lineIndex < lineCount; lineIndex++) {
      this.addLayoutCheckpoint(lineIndex, this.height);
      this.height += this.getLineHeight(lineIndex, false);
    }
    if (lineCount > 0) this.height += paddingBottom;
    if (this.fileContainer != null && shouldValidateSize && !isFirstCompute) {
      const rect = this.fileContainer.getBoundingClientRect();
      if (rect.height !== this.height) console.log("VirtualizedFile.computeApproximateSize: computed height doesnt match", {
        name: file.name,
        elementHeight: rect.height,
        computedHeight: this.height
      });
      else console.log("VirtualizedFile.computeApproximateSize: computed height IS CORRECT");
    }
    this.layoutDirty = false;
  }
  setVisibility(visible) {
    if (this.isAdvancedMode() || this.fileContainer == null) return;
    this.renderRange = void 0;
    if (visible && !this.isVisible) {
      this.top = this.getVirtualizedTop();
      this.isVisible = true;
    } else if (!visible && this.isVisible) {
      this.isVisible = false;
      this.rerender();
    }
  }
  rerender() {
    if (!this.enabled || this.file == null) return;
    this.forceRenderOverride = true;
    this.virtualizer.instanceChanged(this, false);
  }
  applyDocumentChange(textDocument, newLineAnnotations, shouldUpdateBuffer = false) {
    const { renderRange: previousRenderRange } = this;
    this.getAdvancedVirtualizer()?.capturePendingLayoutAnchor();
    super.applyDocumentChange(textDocument, newLineAnnotations);
    this.getSimpleVirtualizer()?.markDOMDirty();
    this.resetLayoutCache(this.isSimpleMode(), false);
    if (!this.isSimpleMode()) this.computeApproximateSize(true);
    else if (shouldUpdateBuffer && previousRenderRange !== void 0 && this.file !== void 0) {
      const windowSpecs = this.virtualizer.getWindowSpecs();
      const renderRange = this.computeRenderRangeFromWindow(this.file, this.top ?? 0, windowSpecs);
      if (renderRange.bufferAfter !== previousRenderRange.bufferAfter) this.updateBuffers(renderRange);
    }
    this.forceRenderOverride = true;
    this.virtualizer.instanceChanged(this, true);
  }
  renderPreparedFile({ fileContainer, file, forceRender = false, lineAnnotations, ...props }) {
    const didFileChange = this.file == null || !areFilesEqual(this.file, file) || this.fileRenderer.hasUnkeyedFileContentsChanged(file);
    const { forceRenderOverride, isSetup } = this;
    this.forceRenderOverride = void 0;
    const annotationsChanged = this.syncLineAnnotations(lineAnnotations);
    if (annotationsChanged) this.resetLayoutCache();
    fileContainer = this.getOrCreateFileContainerNode(fileContainer);
    if (file == null) {
      console.error("VirtualizedFile.render: attempting to virtually render when we dont have file");
      return false;
    }
    if (!isSetup) {
      this.computeApproximateSize(false, file);
      const virtualizer = this.getSimpleVirtualizer();
      this.top ??= this.getVirtualizedTop();
      if (this.isAdvancedMode()) this.isVisible = true;
      else {
        if (virtualizer == null) throw new Error("VirtualizedFile.render: simple virtualizer is not available");
        virtualizer.connect(fileContainer, this);
        this.isVisible = virtualizer.isInstanceVisible(this.top ?? 0, this.height);
      }
      this.isSetup = true;
    } else {
      this.top ??= this.getVirtualizedTop();
      if (didFileChange && this.isSimpleMode()) {
        this.getSimpleVirtualizer()?.markDOMDirty();
        this.resetLayoutCache(false);
        this.computeApproximateSize(false, file);
      }
    }
    if (!this.isVisible && this.isSimpleMode() && (!didFileChange || !isSetup)) {
      this.file = file;
      if (didFileChange) this.cachedHeaderHTML = void 0;
      return this.renderPlaceholder(this.height);
    }
    const windowSpecs = this.virtualizer.getWindowSpecs();
    const fileTop = this.top ?? 0;
    const renderRange = this.computeRenderRangeFromWindow(file, fileTop, windowSpecs);
    const rendered = super.renderPreparedFile({
      file,
      fileContainer,
      renderRange,
      lineAnnotations,
      forceRender: (forceRenderOverride ?? forceRender) || annotationsChanged || didFileChange,
      ...props
    });
    if (this.isSimpleMode() && rendered) this.getSimpleVirtualizer()?.requestHeightReconcile(this);
    return rendered;
  }
  syncVirtualizedTop() {
    this.top = this.getVirtualizedTop();
  }
  shouldDisableVirtualizationBuffers() {
    return this.isAdvancedMode() || super.shouldDisableVirtualizationBuffers();
  }
  shouldGuardRebuildScroll() {
    return false;
  }
  isSimpleMode() {
    return this.virtualizer.type === "simple";
  }
  isAdvancedMode() {
    return this.virtualizer.type === "advanced";
  }
  addLayoutCheckpoint(lineIndex, top) {
    if (lineIndex % LAYOUT_CHECKPOINT_INTERVAL !== 0) return;
    this.cache.checkpoints.push({
      lineIndex,
      top
    });
  }
  getLayoutCheckpointBeforeLineIndex(lineIndex) {
    if (lineIndex <= 0 || this.cache.checkpoints.length === 0) return;
    let low = 0;
    let high = this.cache.checkpoints.length - 1;
    let result;
    while (low <= high) {
      const mid = low + high >> 1;
      const checkpoint = this.cache.checkpoints[mid];
      if (checkpoint == null) throw new Error("VirtualizedFile: invalid checkpoint index");
      if (checkpoint.lineIndex <= lineIndex) {
        result = checkpoint;
        low = mid + 1;
      } else high = mid - 1;
    }
    return result;
  }
  getLayoutCheckpointBeforeTop(top, hunkLineCount) {
    let low = 0;
    let high = this.cache.checkpoints.length - 1;
    let resultIndex = -1;
    while (low <= high) {
      const mid = low + high >> 1;
      const checkpoint = this.cache.checkpoints[mid];
      if (checkpoint == null) throw new Error("VirtualizedFile: invalid checkpoint index");
      if (checkpoint.top <= top) {
        resultIndex = mid;
        low = mid + 1;
      } else high = mid - 1;
    }
    if (hunkLineCount == null) return resultIndex >= 0 ? this.cache.checkpoints[resultIndex] : void 0;
    for (let index = resultIndex; index >= 0; index--) {
      const checkpoint = this.cache.checkpoints[index];
      if (checkpoint == null) throw new Error("VirtualizedFile: invalid checkpoint index");
      if (checkpoint.lineIndex % hunkLineCount === 0) return checkpoint;
    }
  }
  getVirtualizedTop() {
    if (this.virtualizer.type === "advanced") return this.virtualizer.getLocalTopForInstance(this);
    return this.fileContainer != null ? this.virtualizer.getOffsetInScrollContainer(this.fileContainer) : 0;
  }
  getSimpleVirtualizer() {
    return this.virtualizer.type === "simple" ? this.virtualizer : void 0;
  }
  getAdvancedVirtualizer() {
    return this.virtualizer.type === "advanced" ? this.virtualizer : void 0;
  }
  isResizeDebuggingEnabled() {
    return this.getSimpleVirtualizer()?.config.resizeDebugging ?? false;
  }
  computeRenderRangeFromWindow(file, fileTop, { top, bottom }) {
    const { disableFileHeader = false, overflow = "scroll" } = this.options;
    const { hunkLineCount, lineHeight } = this.metrics;
    const lineCount = this.fileRenderer.getLineCount(file);
    const fileHeight = this.height;
    const headerRegion = getVirtualFileHeaderRegion(this.metrics, disableFileHeader);
    const paddingBottom = lineCount > 0 ? getVirtualFilePaddingBottom(this.metrics) : 0;
    const { fileAnnotationHeight } = this.cache;
    const codeRegionTop = headerRegion + fileAnnotationHeight;
    const codeRowsHeight = Math.max(0, fileHeight - headerRegion - fileAnnotationHeight - paddingBottom);
    const hasFileAnnotations = includesFileAnnotations(this.lineAnnotations);
    const fileAnnotationTop = fileTop + headerRegion;
    const measuredFileAnnotationVisible = fileAnnotationHeight > 0 && hasFileAnnotations && fileAnnotationTop < bottom && fileAnnotationTop + fileAnnotationHeight > top;
    if (fileTop < top - fileHeight || fileTop > bottom) return {
      startingLine: 0,
      totalLines: 0,
      bufferBefore: 0,
      bufferAfter: fileHeight - headerRegion - paddingBottom
    };
    if (lineCount <= hunkLineCount) return {
      startingLine: 0,
      totalLines: hunkLineCount,
      bufferBefore: 0,
      bufferAfter: 0
    };
    const estimatedTargetLines = Math.ceil(Math.max(bottom - top, 0) / lineHeight);
    const totalLines = Math.ceil(estimatedTargetLines / hunkLineCount) * hunkLineCount + hunkLineCount;
    const totalHunks = totalLines / hunkLineCount;
    const viewportCenter = (top + bottom) / 2;
    if (overflow === "scroll" && !this.hasLineAnnotations()) {
      const sourceRowsTop = fileTop + codeRegionTop;
      const sourceRowsBottom = sourceRowsTop + codeRowsHeight;
      if (!measuredFileAnnotationVisible && !(sourceRowsTop < bottom && sourceRowsBottom > top)) return {
        startingLine: 0,
        totalLines: 0,
        bufferBefore: 0,
        bufferAfter: fileHeight - headerRegion - paddingBottom
      };
      const centerLine = Math.floor(measuredFileAnnotationVisible && viewportCenter < fileTop + codeRegionTop ? 0 : (viewportCenter - (fileTop + codeRegionTop)) / lineHeight);
      const idealStartHunk2 = Math.floor(centerLine / hunkLineCount) - Math.floor(totalHunks / 2);
      const totalHunksInFile = Math.ceil(lineCount / hunkLineCount);
      const startingLine2 = Math.max(0, Math.min(idealStartHunk2, totalHunksInFile)) * hunkLineCount;
      const clampedTotalLines2 = idealStartHunk2 < 0 ? totalLines + idealStartHunk2 * hunkLineCount : totalLines;
      const bufferBefore2 = startingLine2 === 0 ? 0 : fileAnnotationHeight + startingLine2 * lineHeight;
      const renderedLines = Math.min(clampedTotalLines2, lineCount - startingLine2);
      return {
        startingLine: startingLine2,
        totalLines: clampedTotalLines2,
        bufferBefore: bufferBefore2,
        bufferAfter: Math.max(0, (lineCount - startingLine2 - renderedLines) * lineHeight)
      };
    }
    const overflowHunks = totalHunks;
    const hunkOffsets = [];
    const checkpoint = this.getLayoutCheckpointBeforeTop(Math.max(0, top - fileTop - totalLines * lineHeight * 2), hunkLineCount);
    let absoluteLineTop = fileTop + (checkpoint?.top ?? codeRegionTop);
    let currentLine = checkpoint?.lineIndex ?? 0;
    let firstVisibleHunk;
    let centerHunk;
    let overflowCounter;
    const startingLineIndex = checkpoint?.lineIndex ?? 0;
    for (let lineIndex = startingLineIndex; lineIndex < lineCount; lineIndex++) {
      const isAtHunkBoundary = currentLine % hunkLineCount === 0;
      const currentHunk = Math.floor(currentLine / hunkLineCount);
      if (isAtHunkBoundary) {
        hunkOffsets[currentHunk] = absoluteLineTop - (fileTop + codeRegionTop);
        if (overflowCounter != null) {
          if (overflowCounter <= 0) break;
          overflowCounter--;
        }
      }
      const lineHeight2 = this.getLineHeight(lineIndex, false);
      if (absoluteLineTop > top - lineHeight2 && absoluteLineTop < bottom) firstVisibleHunk ??= currentHunk;
      if (absoluteLineTop + lineHeight2 > viewportCenter) centerHunk ??= currentHunk;
      if (overflowCounter == null && absoluteLineTop >= bottom && isAtHunkBoundary) overflowCounter = overflowHunks;
      currentLine++;
      absoluteLineTop += lineHeight2;
    }
    if (firstVisibleHunk == null) if (measuredFileAnnotationVisible) {
      firstVisibleHunk = 0;
      centerHunk = 0;
    } else return {
      startingLine: 0,
      totalLines: 0,
      bufferBefore: 0,
      bufferAfter: fileHeight - headerRegion - paddingBottom
    };
    centerHunk ??= firstVisibleHunk;
    const idealStartHunk = Math.round(centerHunk - totalHunks / 2);
    const maxStartHunk = Math.max(0, Math.ceil(lineCount / hunkLineCount) - totalHunks);
    const startHunk = Math.max(0, Math.min(idealStartHunk, maxStartHunk));
    const startingLine = startHunk * hunkLineCount;
    const clampedTotalLines = idealStartHunk < 0 ? totalLines + idealStartHunk * hunkLineCount : totalLines;
    const codeBufferBefore = hunkOffsets[startHunk] ?? 0;
    const bufferBefore = startingLine === 0 ? 0 : fileAnnotationHeight + codeBufferBefore;
    const finalHunkIndex = startHunk + clampedTotalLines / hunkLineCount;
    const bufferAfter = finalHunkIndex < hunkOffsets.length ? codeRowsHeight - hunkOffsets[finalHunkIndex] : codeRowsHeight - (absoluteLineTop - fileTop - codeRegionTop);
    return {
      startingLine,
      totalLines: clampedTotalLines,
      bufferBefore,
      bufferAfter: Math.max(0, bufferAfter)
    };
  }
};
function measureFileAnnotationHeight(content) {
  let height;
  for (const child of content.children) {
    if (!(child instanceof HTMLElement)) continue;
    if (child.dataset.lineAnnotation !== FILE_ANNOTATION_DOM_KEY) continue;
    height = Math.max(height ?? 0, child.getBoundingClientRect().height);
  }
  return height;
}
const useIsomorphicLayoutEffect = typeof window === "undefined" ? reactExports.useEffect : reactExports.useLayoutEffect;
function useFileInstance({ file, options, editorOptions, lineAnnotations, selectedLines, prerenderedHTML, metrics, hasGutterRenderUtility, hasCustomHeader, disableWorkerPool, edit }) {
  const simpleVirtualizer = useVirtualizer();
  const controlledSelection = selectedLines !== void 0;
  const poolManager = reactExports.useContext(WorkerPoolContext);
  const createEditor = useCreateEditor();
  const instanceRef = reactExports.useRef(null);
  const ref = useStableCallback((node) => {
    if (node != null) {
      if (instanceRef.current != null) throw new Error("File: An instance should not already exist when a node is created");
      if (simpleVirtualizer != null) instanceRef.current = new VirtualizedFile(mergeFileOptions({
        controlledSelection,
        hasCustomHeader,
        hasGutterRenderUtility,
        options
      }), simpleVirtualizer, metrics, !disableWorkerPool ? poolManager : void 0, true);
      else instanceRef.current = new File$1(mergeFileOptions({
        controlledSelection,
        hasCustomHeader,
        hasGutterRenderUtility,
        options
      }), !disableWorkerPool ? poolManager : void 0, true);
      instanceRef.current.hydrate({
        file,
        fileContainer: node,
        lineAnnotations,
        prerenderedHTML
      });
    } else {
      if (instanceRef.current == null) throw new Error("File: A File instance should exist when unmounting");
      instanceRef.current.cleanUp();
      instanceRef.current = null;
    }
  });
  useIsomorphicLayoutEffect(() => {
    if (instanceRef.current == null) return;
    const newOptions = mergeFileOptions({
      controlledSelection,
      hasCustomHeader,
      hasGutterRenderUtility,
      options
    });
    const forceRender = newOptions !== void 0 && !areOptionsEqual(instanceRef.current.options, newOptions);
    instanceRef.current.setOptions(newOptions);
    instanceRef.current.render({
      file,
      lineAnnotations,
      forceRender
    });
    if (selectedLines !== void 0) instanceRef.current.setSelectedLines(selectedLines);
  });
  useIsomorphicLayoutEffect(() => {
    if (edit && instanceRef.current != null) {
      if (createEditor === void 0) throw new Error("File: EditContext is not attached");
      const editor = createEditor(editorOptions ?? {});
      if (editor == null) throw new Error("File: EditProvider.createEditor must return an editor instance");
      try {
        return editor.edit(instanceRef.current);
      } catch (error) {
        editor.cleanUp();
        throw error;
      }
    }
  }, [edit]);
  return {
    ref,
    getHoveredLine: reactExports.useCallback(() => {
      return instanceRef.current?.getHoveredLine();
    }, [])
  };
}
function mergeFileOptions({ options, controlledSelection, hasCustomHeader, hasGutterRenderUtility }) {
  if (!(controlledSelection || hasGutterRenderUtility || hasCustomHeader)) return options;
  return {
    ...options,
    controlledSelection,
    renderCustomHeader: hasCustomHeader ? noopRender : options?.renderCustomHeader,
    renderGutterUtility: hasGutterRenderUtility ? noopRender : options?.renderGutterUtility
  };
}
function File2({ file, lineAnnotations, selectedLines, options, editorOptions, metrics, className, style, renderAnnotation, renderCustomHeader, renderHeaderPrefix, renderHeaderFilenameSuffix, renderHeaderMetadata, prerenderedHTML, renderGutterUtility, disableWorkerPool = false, edit = false }) {
  const { ref, getHoveredLine } = useFileInstance({
    file,
    options,
    editorOptions,
    metrics,
    lineAnnotations,
    selectedLines,
    prerenderedHTML,
    hasGutterRenderUtility: renderGutterUtility != null,
    hasCustomHeader: renderCustomHeader != null,
    disableWorkerPool,
    edit
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(DIFFS_TAG_NAME, {
    ref,
    className,
    style,
    children: templateRender(renderFileChildren({
      file,
      renderAnnotation,
      renderCustomHeader,
      renderHeaderPrefix,
      renderHeaderFilenameSuffix,
      renderHeaderMetadata,
      renderGutterUtility,
      lineAnnotations,
      getHoveredLine
    }), prerenderedHTML)
  });
}
export {
  f as FileDiff,
  File2 as PierreFile,
  areThemesAttached,
  getHighlighterIfLoaded,
  getHighlighterOptions,
  aj as parsePatchFiles,
  an as preloadHighlighter
};
//# sourceMappingURL=codePreviewPierre-BVmpjjnG.js.map

//# debugId=ed93aefe-ee9d-54c5-92e4-68b39c925a1c
