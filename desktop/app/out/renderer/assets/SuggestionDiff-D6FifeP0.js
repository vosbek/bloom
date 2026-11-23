
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="2e31a34a-0319-5cec-823d-0e319caaff7f")}catch(e){}}();
import { fR as createLucideIcon, gP as jsxRuntimeExports, hx as reactExports, iG as useAvatarTheme, a1 as ChevronDown, bt as FileText, f4 as Webhook, eo as Sparkles, dt as ScrollText, eV as TooltipLabel, dv as SearchHighlightText, be as ExpandableCard, cZ as PathHovercard, eX as TriangleAlert, _ as Check, c_ as Pencil, aR as DropdownMenu, b1 as DropdownMenuTrigger, aW as DropdownMenuMoreIcon, aT as DropdownMenuContent, aU as DropdownMenuItem, n as AppIcon, a_ as DropdownMenuSub, b0 as DropdownMenuSubTrigger, bB as FolderOpen, a$ as DropdownMenuSubContent } from "./index-nrW_ocxo.js";
import { t as computeLineOffsets, w as countLineBreaks, ad as isMacLike, $ as getLineAnnotationName, ab as isFullyTransparent, av as surfacesMatch, aq as relativeLuminance, al as pickReadableForeground, aa as isDarkSurface, a8 as hoverWouldEraseText, T as deriveMutedFg, v as contrastRatio, s as compositeOverBg, I as INITIAL, a as DEFAULT_THEMES, e as EncodedTokenMetadata, Q as dequeueRender, X as getFiletypeFromFileName, ap as queueRender, ae as isSafari, ac as isGutterUtilityPath, aj as parsePatchFiles, aB as useFileDiffInstance, c as DIFFS_TAG_NAME, aw as templateRender, ar as renderDiffChildren, ai as parseDiffFromFile, d as EditProvider, f as FileDiff } from "./FileDiff-CNuZdHKn.js";
const __iconNode = [
  [
    "path",
    {
      d: "M10.7 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v4.1",
      key: "1bw5m7"
    }
  ],
  ["path", { d: "m21 21-1.9-1.9", key: "1g2n9r" }],
  ["circle", { cx: "17", cy: "17", r: "3", key: "18b49y" }]
];
const FolderSearch = createLucideIcon("folder-search", __iconNode);
const DEFAULT_EDIT_STACK_MAX_ENTRIES = 100;
const COALESCING_MODE_INSERT = 1;
const COALESCING_MODE_BACKSPACE = 2;
const COALESCING_MODE_DELETE = 3;
var EditStack = class {
  #undoStack = [];
  #redoStack = [];
  #maxEntries;
  #canCoalesce = false;
  constructor(options) {
    this.#maxEntries = Math.max(1, options?.maxEntries ?? DEFAULT_EDIT_STACK_MAX_ENTRIES);
  }
  get canUndo() {
    return this.#undoStack.length > 0;
  }
  get canRedo() {
    return this.#redoStack.length > 0;
  }
  /** Clears both the undo and redo stacks. */
  clear() {
    this.#undoStack.length = 0;
    this.#redoStack.length = 0;
    this.#canCoalesce = false;
  }
  /** Clears the redo stack. */
  clearRedo() {
    this.#redoStack.length = 0;
  }
  /** Pushes a new entry onto the undo stack. */
  push(entry) {
    this.#undoStack.push(entry);
    this.clearRedo();
    this.#canCoalesce = true;
    if (this.#undoStack.length > this.#maxEntries) this.#undoStack.shift();
  }
  /** Sets the selections after the last undo entry. */
  setLastUndoSelectionsAfter(selections) {
    const lastEntry = this.#undoStack[this.#undoStack.length - 1];
    if (lastEntry !== void 0) lastEntry.selectionsAfter = selections.map((selection) => ({ ...selection }));
  }
  /** Sets the line annotations after the last undo entry. */
  setLastUndoLineAnnotations(lineAnnotationsBefore, lineAnnotationsAfter) {
    const lastEntry = this.#undoStack[this.#undoStack.length - 1];
    if (lastEntry !== void 0) {
      lastEntry.lineAnnotationsBefore = lineAnnotationsBefore.slice();
      lastEntry.lineAnnotationsAfter = lineAnnotationsAfter.slice();
    }
  }
  /** Returns the last undo entry, or `undefined` if empty. */
  peekUndo() {
    return this.#undoStack[this.#undoStack.length - 1];
  }
  /** Returns the last undo entry only while its coalescing group is open. */
  peekUndoForCoalescing() {
    return this.#canCoalesce ? this.peekUndo() : void 0;
  }
  /** Replaces the last undo entry with the given entry. */
  replaceLastUndo(entry) {
    if (this.#undoStack.length === 0) {
      this.push(entry);
      return;
    }
    this.#undoStack[this.#undoStack.length - 1] = entry;
    this.clearRedo();
    this.#canCoalesce = true;
  }
  /** Moves the latest undo entry to the redo stack and returns it, or `undefined` if empty. */
  popUndoToRedo() {
    const entry = this.#undoStack.pop();
    if (entry !== void 0) {
      this.#redoStack.push(entry);
      this.#canCoalesce = false;
      return entry;
    }
  }
  /** Moves the latest redo entry back to the undo stack and returns it, or `undefined` if empty. */
  popRedoToUndo() {
    const entry = this.#redoStack.pop();
    if (entry !== void 0) {
      this.#undoStack.push(entry);
      this.#canCoalesce = false;
      return entry;
    }
  }
};
function createEditStackEntry(textDocument, resolvedEdits, versionBefore, versionAfter, selectionsBefore, selectionsAfter, lineAnnotationsBefore, lineAnnotationsAfter) {
  const forwardEdits = [...resolvedEdits].sort((a, b) => a.start - b.start);
  const inverseEdits = [];
  let coalescingMode;
  if (selectionsBefore?.length === forwardEdits.length) {
    const caretOffsets = [];
    for (const selection of selectionsBefore) {
      if (selection.start.line !== selection.end.line || selection.start.character !== selection.end.character) break;
      caretOffsets.push(textDocument.offsetAt(selection.start));
    }
    if (caretOffsets.length === forwardEdits.length) {
      caretOffsets.sort((a, b) => a - b);
      let isBackspace = true;
      let isDelete = true;
      for (let i = 0; i < forwardEdits.length; i++) {
        const edit = forwardEdits[i];
        if (edit.text.length > 0 || edit.start === edit.end) {
          isBackspace = false;
          isDelete = false;
          break;
        }
        isBackspace &&= caretOffsets[i] === edit.end;
        isDelete &&= caretOffsets[i] === edit.start;
      }
      coalescingMode = isBackspace ? COALESCING_MODE_BACKSPACE : isDelete ? COALESCING_MODE_DELETE : void 0;
    }
  }
  for (let i = 0, offsetDelta = 0; i < forwardEdits.length; i++) {
    const edit = forwardEdits[i];
    const replacedText = textDocument.getTextSlice(edit.start, edit.end);
    const startAfterEdit = edit.start + offsetDelta;
    inverseEdits.push({
      start: startAfterEdit,
      end: startAfterEdit + edit.text.length,
      text: replacedText
    });
    offsetDelta += edit.text.length - (edit.end - edit.start);
  }
  return {
    forwardEdits: forwardEdits.map((edit) => ({ ...edit })),
    inverseEdits,
    versionBefore,
    versionAfter,
    selectionsBefore: selectionsBefore?.map((selection) => ({ ...selection })),
    selectionsAfter: selectionsAfter?.map((selection) => ({ ...selection })),
    lineAnnotationsBefore: lineAnnotationsBefore?.slice(),
    lineAnnotationsAfter: lineAnnotationsAfter?.slice(),
    coalescingMode
  };
}
function shouldCoalesceEditStackEntry(previousEntry, nextEntry) {
  if (previousEntry === void 0 || previousEntry.undoBoundary === true || nextEntry.undoBoundary === true || previousEntry.forwardEdits.length === 0 || previousEntry.forwardEdits.length !== previousEntry.inverseEdits.length || previousEntry.forwardEdits.length !== nextEntry.forwardEdits.length || nextEntry.forwardEdits.length !== nextEntry.inverseEdits.length) return false;
  let mode;
  for (let i = 0; i < previousEntry.forwardEdits.length; i++) {
    const previousForward = previousEntry.forwardEdits[i];
    const previousInverse = previousEntry.inverseEdits[i];
    const nextForward = nextEntry.forwardEdits[i];
    const nextInverse = nextEntry.inverseEdits[i];
    const mappedNextStart = mapOffsetAfterForwardBatchToBefore(nextForward.start, previousEntry.forwardEdits);
    const previousWasInsert = previousForward.start <= previousForward.end && previousForward.text.length > 0 && !previousForward.text.includes("\n") && !previousInverse.text.includes("\n");
    const nextIsInsert = nextForward.start === nextForward.end && nextForward.text.length > 0 && !nextForward.text.includes("\n") && nextInverse.text.length === 0;
    if (previousWasInsert && nextIsInsert) {
      if (nextForward.start !== previousInverse.end) return false;
      mode ??= COALESCING_MODE_INSERT;
      if (mode !== COALESCING_MODE_INSERT || previousEntry.coalescingMode !== void 0 && previousEntry.coalescingMode !== COALESCING_MODE_INSERT || nextEntry.coalescingMode !== void 0 && nextEntry.coalescingMode !== COALESCING_MODE_INSERT) return false;
      continue;
    }
    const previousWasDelete = previousForward.text.length === 0 && previousForward.end > previousForward.start && previousInverse.text.length > 0;
    const nextIsDelete = nextForward.text.length === 0 && nextForward.end > nextForward.start && nextInverse.text.length > 0;
    if (previousWasDelete && nextIsDelete) {
      let nextMode;
      if (mappedNextStart === previousForward.end) nextMode = COALESCING_MODE_DELETE;
      else if (mappedNextStart + (nextForward.end - nextForward.start) !== previousForward.start) return false;
      else nextMode = COALESCING_MODE_BACKSPACE;
      mode ??= nextMode;
      if (mode !== nextMode || previousEntry.coalescingMode !== void 0 && previousEntry.coalescingMode !== nextMode || nextEntry.coalescingMode !== void 0 && nextEntry.coalescingMode !== nextMode) return false;
      continue;
    }
    return false;
  }
  return mode !== void 0;
}
function coalesceEditStackEntries(previousEntry, nextEntry) {
  const forwardEdits = [];
  const replacedTexts = [];
  let coalescingMode;
  for (let i = 0; i < previousEntry.forwardEdits.length; i++) {
    const previousForward = previousEntry.forwardEdits[i];
    const previousInverse = previousEntry.inverseEdits[i];
    const nextForward = nextEntry.forwardEdits[i];
    const nextInverse = nextEntry.inverseEdits[i];
    const mappedNextStart = mapOffsetAfterForwardBatchToBefore(nextForward.start, previousEntry.forwardEdits);
    if (previousForward.text.length > 0) {
      coalescingMode ??= COALESCING_MODE_INSERT;
      forwardEdits.push({
        start: previousForward.start,
        end: previousForward.end,
        text: previousForward.text + nextForward.text
      });
      replacedTexts.push(previousInverse.text);
      continue;
    }
    if (mappedNextStart === previousForward.end) {
      coalescingMode ??= COALESCING_MODE_DELETE;
      forwardEdits.push({
        start: previousForward.start,
        end: mappedNextStart + (nextForward.end - nextForward.start),
        text: ""
      });
      replacedTexts.push(previousInverse.text + nextInverse.text);
      continue;
    }
    coalescingMode ??= COALESCING_MODE_BACKSPACE;
    forwardEdits.push({
      start: Math.min(previousForward.start, mappedNextStart),
      end: previousForward.end,
      text: ""
    });
    replacedTexts.push(nextInverse.text + previousInverse.text);
  }
  return {
    forwardEdits,
    inverseEdits: buildInverseEditsFromReplacedTexts(forwardEdits, replacedTexts),
    versionBefore: previousEntry.versionBefore,
    versionAfter: nextEntry.versionAfter,
    selectionsBefore: previousEntry.selectionsBefore?.slice(),
    selectionsAfter: nextEntry.selectionsAfter?.slice(),
    lineAnnotationsBefore: previousEntry.lineAnnotationsBefore?.slice(),
    lineAnnotationsAfter: nextEntry.lineAnnotationsAfter?.slice(),
    coalescingMode
  };
}
function buildInverseEditsFromReplacedTexts(forwardEdits, replacedTexts) {
  const inverseEdits = [];
  for (let i = 0, offsetDelta = 0; i < forwardEdits.length; i++) {
    const edit = forwardEdits[i];
    const startAfterEdit = edit.start + offsetDelta;
    inverseEdits.push({
      start: startAfterEdit,
      end: startAfterEdit + edit.text.length,
      text: replacedTexts[i]
    });
    offsetDelta += edit.text.length - (edit.end - edit.start);
  }
  return inverseEdits;
}
function mapOffsetAfterForwardBatchToBefore(offsetAfter, forwardEdits) {
  let offset = offsetAfter;
  for (const edit of forwardEdits) {
    const oldLength = edit.end - edit.start;
    const newLength = edit.text.length;
    const delta = newLength - oldLength;
    if (offset < edit.start) continue;
    if (offset >= edit.start + newLength) {
      offset -= delta;
      continue;
    }
    offset = edit.start + Math.min(offset - edit.start, oldLength);
  }
  return offset;
}
const MAX_FIND_MATCHES = 1e5;
const LINE_FEED = 10;
const CARRIAGE_RETURN = 13;
const WORD_SEPARATORS = "`~!@#$%^&*()-=+[{]}\\|;:'\",.<>/?";
var Piece = class {
  source;
  offset;
  length;
  lineOffsetStart;
  lineOffsetEnd;
  hasVirtualTrailingCRBreak;
  firstCharCode;
  lastCharCode;
  static Original = 0;
  static Added = 1;
  constructor(source, offset, length, lineOffsetStart, lineOffsetEnd, hasVirtualTrailingCRBreak, firstCharCode, lastCharCode) {
    this.source = source;
    this.offset = offset;
    this.length = length;
    this.lineOffsetStart = lineOffsetStart;
    this.lineOffsetEnd = lineOffsetEnd;
    this.hasVirtualTrailingCRBreak = hasVirtualTrailingCRBreak;
    this.firstCharCode = firstCharCode;
    this.lastCharCode = lastCharCode;
  }
  get lineBreakCount() {
    return this.lineOffsetEnd - this.lineOffsetStart + (this.hasVirtualTrailingCRBreak ? 1 : 0);
  }
};
var TextBuffer = class {
  text;
  lineOffsets;
  constructor(text) {
    this.text = text;
    this.lineOffsets = computeLineOffsets(text);
  }
  append(text) {
    const offset = this.text.length;
    for (let i = 0; i < text.length; i++) {
      const charCode = text.charCodeAt(i);
      if (charCode !== LINE_FEED && charCode !== CARRIAGE_RETURN) continue;
      if (charCode === CARRIAGE_RETURN && text.charCodeAt(i + 1) === LINE_FEED) i++;
      this.lineOffsets.push(offset + i + 1);
    }
    this.text += text;
    return offset;
  }
};
var PieceNode = class {
  piece;
  subtreeLength;
  subtreeLineBreakCount;
  subtreeFirstCharCode;
  subtreeLastCharCode;
  left = null;
  right = null;
  parent = null;
  priority = 0;
  constructor(piece, subtreeLength = piece.length, subtreeLineBreakCount = piece.lineBreakCount, subtreeFirstCharCode = piece.firstCharCode, subtreeLastCharCode = piece.lastCharCode) {
    this.piece = piece;
    this.subtreeLength = subtreeLength;
    this.subtreeLineBreakCount = subtreeLineBreakCount;
    this.subtreeFirstCharCode = subtreeFirstCharCode;
    this.subtreeLastCharCode = subtreeLastCharCode;
  }
  updateSubtreeLength() {
    this.subtreeLength = (this.left?.subtreeLength ?? 0) + this.piece.length + (this.right?.subtreeLength ?? 0);
    this.subtreeLineBreakCount = (this.left?.subtreeLineBreakCount ?? 0) + this.piece.lineBreakCount + (this.right?.subtreeLineBreakCount ?? 0) - (formsCRLF(this.left?.subtreeLastCharCode, this.piece.firstCharCode) ? 1 : 0) - (formsCRLF(this.piece.lastCharCode, this.right?.subtreeFirstCharCode) ? 1 : 0);
    this.subtreeFirstCharCode = this.left?.subtreeFirstCharCode ?? this.piece.firstCharCode;
    this.subtreeLastCharCode = this.right?.subtreeLastCharCode ?? this.piece.lastCharCode;
  }
};
var PieceTable = class {
  #original;
  #add = new TextBuffer("");
  #root = null;
  #length = 0;
  #lineCount = 0;
  #lastVisitedLine = null;
  #lastVisitedLineLength = null;
  #lastPosition = null;
  #priorityState = 2654435769;
  constructor(originalText) {
    this.#original = new TextBuffer(originalText);
    const piece = this.#createPiece(Piece.Original, 0, originalText.length);
    this.#root = piece.length > 0 ? this.#createNode(piece) : null;
    this.#length = this.#root?.subtreeLength ?? 0;
    this.#lineCount = (this.#root?.subtreeLineBreakCount ?? 0) + 1;
  }
  get lineCount() {
    return this.#lineCount;
  }
  getText(range) {
    if (range === void 0) return this.#textFromPieces();
    const start = this.offsetAt(range.start);
    const end = this.offsetAt(range.end);
    return this.getTextSlice(start, end);
  }
  getLineText(line, includeLineBreak = false) {
    if (this.#lastVisitedLine !== null && this.#lastVisitedLine[0] === line && this.#lastVisitedLine[1] === includeLineBreak) return this.#lastVisitedLine[2];
    const offset = this.#getLineOffset(line);
    if (offset === void 0) throw new Error(`Line index out of range: ${line}`);
    const text = this.getTextSlice(offset[0], offset[1], !includeLineBreak);
    this.#lastVisitedLine = [
      line,
      includeLineBreak,
      text
    ];
    this.#lastVisitedLineLength = [
      line,
      includeLineBreak,
      text.length
    ];
    return text;
  }
  getLineLength(line, includeLineBreak = false) {
    const lastVisitedLineLength = this.#lastVisitedLineLength;
    const lastVisitedLine = this.#lastVisitedLine;
    if (lastVisitedLineLength !== null && lastVisitedLineLength[0] === line && lastVisitedLineLength[1] === includeLineBreak) return lastVisitedLineLength[2];
    if (lastVisitedLine !== null && lastVisitedLine[0] === line && lastVisitedLine[1] === includeLineBreak) {
      const length2 = lastVisitedLine[2].length;
      this.#lastVisitedLineLength = [
        line,
        includeLineBreak,
        length2
      ];
      return length2;
    }
    const offset = this.#getLineOffset(line);
    if (offset === void 0) throw new Error(`Line index out of range: ${line}`);
    const [start, end] = offset;
    let length = end - start;
    if (!includeLineBreak) while (length > 0 && isEOL(this.charAt(start + length - 1).charCodeAt(0))) length--;
    this.#lastVisitedLineLength = [
      line,
      includeLineBreak,
      length
    ];
    return length;
  }
  getTextSlice(start, end, trimEOF = false) {
    if (start >= end) return "";
    const sliceStart = clamp(start, 0, this.#length);
    const sliceEnd = clamp(end, sliceStart, this.#length);
    if (sliceStart >= sliceEnd) return "";
    const location2 = this.#findPieceAtOffset(sliceStart);
    if (location2 === void 0) return "";
    const chunks = [];
    let [node, offsetInPiece] = location2;
    let remaining = sliceEnd - sliceStart;
    while (node !== null && remaining > 0) {
      const takeLength = Math.min(node.piece.length - offsetInPiece, remaining);
      const buffer = this.#bufferFor(node.piece.source);
      const start2 = node.piece.offset + offsetInPiece;
      let end2 = start2 + takeLength;
      if (trimEOF) while (end2 > start2 && isEOL(buffer.text.charCodeAt(end2 - 1))) end2--;
      chunks.push(buffer.text.slice(start2, end2));
      remaining -= takeLength;
      offsetInPiece = 0;
      node = this.#nextNode(node);
    }
    return chunks.join("");
  }
  charAt(offset) {
    const location2 = this.#findPieceAtOffset(offset);
    if (location2 === void 0) return "";
    const [node, offsetInPiece] = location2;
    return this.#bufferFor(node.piece.source).text.charAt(node.piece.offset + offsetInPiece);
  }
  includes(needle) {
    if (needle.length === 0) return true;
    const prefixTable = createPrefixTable(needle);
    let matched = 0;
    let found = false;
    this.#forEachPieceSegment((segment) => {
      for (let offset = segment.start; offset < segment.end; offset++) {
        const charCode = segment.text.charCodeAt(offset);
        while (matched > 0 && charCode !== needle.charCodeAt(matched)) matched = prefixTable[matched - 1];
        if (charCode === needle.charCodeAt(matched)) matched++;
        if (matched === needle.length) {
          found = true;
          return false;
        }
      }
      return true;
    });
    return found;
  }
  findNextNonOverlappingSubstring(needle, occupied) {
    if (needle.length === 0 || needle.length > this.#length) return;
    const ranges = normalizeRanges(occupied, this.#length);
    const pivot = ranges.reduce((max, [, end]) => Math.max(max, end), 0);
    const prefixTable = createPrefixTable(needle);
    let matched = 0;
    let documentOffset = 0;
    let wrappedOffset;
    let foundOffset;
    this.#forEachPieceSegment((segment) => {
      for (let offset = segment.start; offset < segment.end; offset++) {
        const charCode = segment.text.charCodeAt(offset);
        while (matched > 0 && charCode !== needle.charCodeAt(matched)) matched = prefixTable[matched - 1];
        if (charCode === needle.charCodeAt(matched)) matched++;
        if (matched === needle.length) {
          const start = documentOffset - needle.length + 1;
          if (!rangeOverlaps(ranges, start, start + needle.length)) {
            if (start >= pivot) {
              foundOffset = start;
              return false;
            }
            wrappedOffset ??= start;
          }
          matched = prefixTable[matched - 1];
        }
        documentOffset++;
      }
      return true;
    });
    return foundOffset ?? wrappedOffset;
  }
  search(searchParams) {
    if (searchParams.text.length === 0 || this.#length === 0) return [];
    if (searchParams.text.includes("\n") || searchParams.text.includes("\r") || searchParams.regex && (searchParams.text.includes("\\n") || searchParams.text.includes("\\r"))) return [];
    let pattern;
    try {
      pattern = compileSearchRegExp(searchParams.text, searchParams.regex, searchParams.caseSensitive);
    } catch {
      return [];
    }
    return this.#collectSearchMatchesLineByLine(pattern, searchParams.wholeWord, MAX_FIND_MATCHES);
  }
  #collectSearchMatchesLineByLine(pattern, wholeWord, limit) {
    const out = [];
    const documentText = this.#textFromPieces();
    const docLength = documentText.length;
    const lineOffsets = computeLineOffsets(documentText);
    for (let line = 0; line < lineOffsets.length; line++) {
      const lineStart = lineOffsets[line];
      let lineEnd = lineOffsets[line + 1] ?? docLength;
      while (lineEnd > lineStart && isEOL(documentText.charCodeAt(lineEnd - 1))) lineEnd--;
      const lineText = documentText.slice(lineStart, lineEnd);
      pattern.lastIndex = 0;
      let match;
      while ((match = pattern.exec(lineText)) !== null) {
        const rel = match.index;
        const fragment = match[0];
        if (fragment.length === 0) {
          pattern.lastIndex = advancePastEmptyMatch(lineText, rel);
          continue;
        }
        const docStart = lineStart + rel;
        if (!wholeWord || isWholeWordAtDocOffsets(documentText, docStart, fragment.length)) {
          out.push([docStart, docStart + fragment.length]);
          if (out.length >= limit) return out;
        }
        if (rel === pattern.lastIndex) pattern.lastIndex = advancePastEmptyMatch(lineText, rel);
      }
    }
    return out;
  }
  insert(text, offset) {
    if (text.length === 0) return;
    const start = clamp(offset, 0, this.#length);
    this.#replaceRangeIncremental(start, start, text);
    this.#invalidateCaches();
  }
  delete(offset, length) {
    if (length <= 0 || this.#length === 0) return;
    const start = clamp(offset, 0, this.#length);
    const end = clamp(start + length, start, this.#length);
    if (start === end) return;
    this.#replaceRangeIncremental(start, end, "");
    this.#invalidateCaches();
  }
  applyEdits(edits) {
    if (edits.length === 0) return;
    for (let i = edits.length - 1; i >= 0; i--) {
      const edit = edits[i];
      const start = clamp(edit.start, 0, this.#length);
      const end = clamp(edit.end, start, this.#length);
      this.#replaceRangeIncremental(start, end, edit.text);
    }
    this.#invalidateCaches();
  }
  positionAt(offset) {
    const clampedOffset = clamp(offset, 0, this.#length);
    if (this.#length === 0) return {
      line: 0,
      character: 0
    };
    const line = this.#lineAtOffset(clampedOffset);
    const character = clampedOffset - (line === 0 ? 0 : this.#lineBreakOffset(line - 1));
    this.#lastPosition = [
      line,
      character,
      clampedOffset
    ];
    return {
      line,
      character
    };
  }
  positionsAt(offsets) {
    const positions = Array.from({ length: offsets.length });
    if (offsets.length === 0) return positions;
    if (this.#length === 0) return positions.fill({
      line: 0,
      character: 0
    });
    for (let i = 0; i < offsets.length; i++) positions[i] = this.positionAt(offsets[i]);
    return positions;
  }
  offsetAt(position) {
    if (position.line < 0 || this.#length === 0) return 0;
    if (position.line >= this.#lineCount) throw new Error(`Line index out of range: ${position.line}`);
    const lastPosition = this.#lastPosition;
    if (lastPosition !== null && lastPosition[0] === position.line && lastPosition[1] === position.character) return lastPosition[2];
    const offset = this.#getLineOffset(position.line);
    if (offset === void 0) throw new Error(`Line index out of range: ${position.line}`);
    const character = clamp(position.character, 0, offset[1] - offset[0]);
    return offset[0] + character;
  }
  #findPieceAtOffset(offset) {
    if (offset < 0 || offset >= this.#length) return;
    let node = this.#root;
    let remaining = offset;
    while (node !== null) {
      const leftLength = node.left?.subtreeLength ?? 0;
      if (remaining < leftLength) {
        node = node.left;
        continue;
      }
      remaining -= leftLength;
      if (remaining < node.piece.length) return [node, remaining];
      remaining -= node.piece.length;
      node = node.right;
    }
  }
  #nextNode(node) {
    if (node.right !== null) {
      let next = node.right;
      while (next.left !== null) next = next.left;
      return next;
    }
    let current = node;
    while (current.parent !== null && current === current.parent.right) current = current.parent;
    return current.parent;
  }
  #getLineOffset(line) {
    if (line < 0) throw new Error(`Line index out of range: ${line}`);
    if (this.#length === 0) {
      if (line === 0) return [0, 0];
      throw new Error(`Line index out of range: ${line}`);
    }
    if (line >= this.#lineCount) throw new Error(`Line index out of range: ${line}`);
    return [line === 0 ? 0 : this.#lineBreakOffset(line - 1), line < this.#lineCount - 1 ? this.#lineBreakOffset(line) : this.#length];
  }
  #lineAtOffset(offset) {
    let node = this.#root;
    let remaining = clamp(offset, 0, this.#length);
    let line = 0;
    while (node !== null) {
      const leftLength = node.left?.subtreeLength ?? 0;
      if (remaining < leftLength) {
        node = node.left;
        continue;
      }
      line += (node.left?.subtreeLineBreakCount ?? 0) - (formsCRLF(node.left?.subtreeLastCharCode, node.piece.firstCharCode) ? 1 : 0);
      remaining -= leftLength;
      if (remaining <= node.piece.length) {
        const buffer = this.#bufferFor(node.piece.source);
        const lineOffsetEnd = Math.min(upperBound(buffer.lineOffsets, node.piece.offset + remaining), node.piece.lineOffsetEnd);
        line += lineOffsetEnd - node.piece.lineOffsetStart;
        if (remaining === node.piece.length && node.piece.hasVirtualTrailingCRBreak) line++;
        if (remaining === node.piece.length && formsCRLF(node.piece.lastCharCode, this.#nextNode(node)?.piece.firstCharCode)) line--;
        return line;
      }
      line += node.piece.lineBreakCount - (formsCRLF(node.piece.lastCharCode, node.right?.subtreeFirstCharCode) ? 1 : 0);
      remaining -= node.piece.length;
      node = node.right;
    }
    return this.#lineCount - 1;
  }
  #lineBreakOffset(lineBreakIndex) {
    let node = this.#root;
    let remaining = lineBreakIndex;
    let documentOffset = 0;
    let followingCharCode;
    while (node !== null) {
      const leftLineBreakCount = (node.left?.subtreeLineBreakCount ?? 0) - (formsCRLF(node.left?.subtreeLastCharCode, node.piece.firstCharCode) ? 1 : 0);
      if (remaining < leftLineBreakCount) {
        followingCharCode = node.piece.firstCharCode;
        node = node.left;
        continue;
      }
      const leftLength = node.left?.subtreeLength ?? 0;
      documentOffset += leftLength;
      remaining -= leftLineBreakCount;
      const nextCharCode = node.right?.subtreeFirstCharCode ?? followingCharCode;
      const pieceLineBreakCount = node.piece.lineBreakCount - (formsCRLF(node.piece.lastCharCode, nextCharCode) ? 1 : 0);
      if (remaining < pieceLineBreakCount) return documentOffset + this.#pieceLineBreakOffset(node.piece, remaining);
      documentOffset += node.piece.length;
      remaining -= pieceLineBreakCount;
      node = node.right;
    }
    return this.#length;
  }
  #pieceLineBreakOffset(piece, lineBreakIndex) {
    if (lineBreakIndex < piece.lineOffsetEnd - piece.lineOffsetStart) return this.#bufferFor(piece.source).lineOffsets[piece.lineOffsetStart + lineBreakIndex] - piece.offset;
    return piece.length;
  }
  #textFromPieces() {
    const chunks = [];
    this.#forEachPieceSegment((segment) => {
      chunks.push(segment.text.slice(segment.start, segment.end));
    });
    return chunks.join("");
  }
  #forEachPieceSegment(callback) {
    this.#walk(this.#root, (node) => {
      const buffer = this.#bufferFor(node.piece.source);
      return callback({
        text: buffer.text,
        lineOffsets: buffer.lineOffsets,
        lineOffsetStart: node.piece.lineOffsetStart,
        lineOffsetEnd: node.piece.lineOffsetEnd,
        start: node.piece.offset,
        end: node.piece.offset + node.piece.length
      });
    });
  }
  #bufferFor(source) {
    return source === Piece.Original ? this.#original : this.#add;
  }
  #createPiece(source, offset, length) {
    const buffer = this.#bufferFor(source);
    const end = offset + length;
    const lineOffsetStart = upperBound(buffer.lineOffsets, offset);
    const lineOffsetEnd = upperBound(buffer.lineOffsets, end);
    const lastCharCode = buffer.text.charCodeAt(end - 1);
    return new Piece(source, offset, length, lineOffsetStart, lineOffsetEnd, lastCharCode === CARRIAGE_RETURN && buffer.lineOffsets[lineOffsetEnd - 1] !== end, buffer.text.charCodeAt(offset), lastCharCode);
  }
  #replaceRangeIncremental(start, end, text) {
    if (start === end && text.length === 0) return;
    const [left, rest] = this.#split(this.#root, start);
    const right = this.#dropPrefix(rest, end - start);
    let root;
    if (text.length > 0) {
      const insertedPiece = this.#createPiece(Piece.Added, this.#add.append(text), text.length);
      root = this.#mergeNodes(this.#appendCoalescing(left, insertedPiece), right);
    } else {
      const [seamPiece, restRight] = this.#popLeftmost(right);
      root = seamPiece === void 0 ? left : this.#mergeNodes(this.#appendCoalescing(left, seamPiece), restRight);
    }
    if (root !== null) root.parent = null;
    this.#root = root;
    this.#length = root?.subtreeLength ?? 0;
    this.#lineCount = (root?.subtreeLineBreakCount ?? 0) + 1;
  }
  #invalidateCaches() {
    this.#lastVisitedLine = null;
    this.#lastVisitedLineLength = null;
    this.#lastPosition = null;
  }
  #nextPriority() {
    this.#priorityState = Math.imul(this.#priorityState, 1664525) + 1013904223 >>> 0;
    return this.#priorityState;
  }
  #createNode(piece) {
    const node = new PieceNode(piece);
    node.priority = this.#nextPriority();
    return node;
  }
  #setLeft(node, child) {
    node.left = child;
    if (child !== null) child.parent = node;
  }
  #setRight(node, child) {
    node.right = child;
    if (child !== null) child.parent = node;
  }
  #split(node, offset) {
    if (node === null) return [null, null];
    if (offset <= 0) return [null, node];
    if (offset >= node.subtreeLength) return [node, null];
    const leftLength = node.left?.subtreeLength ?? 0;
    if (offset <= leftLength) {
      const [left, right] = this.#split(node.left, offset);
      this.#setLeft(node, right);
      node.updateSubtreeLength();
      return [left, node];
    }
    const pieceLength = node.piece.length;
    if (offset >= leftLength + pieceLength) {
      const [left, right] = this.#split(node.right, offset - leftLength - pieceLength);
      this.#setRight(node, left);
      node.updateSubtreeLength();
      return [node, right];
    }
    const inPiece = offset - leftLength;
    const leftNode = new PieceNode(this.#createPiece(node.piece.source, node.piece.offset, inPiece));
    const rightNode = new PieceNode(this.#createPiece(node.piece.source, node.piece.offset + inPiece, pieceLength - inPiece));
    leftNode.priority = node.priority;
    rightNode.priority = node.priority;
    this.#setLeft(leftNode, node.left);
    this.#setRight(rightNode, node.right);
    leftNode.updateSubtreeLength();
    rightNode.updateSubtreeLength();
    return [leftNode, rightNode];
  }
  #dropPrefix(node, offset) {
    if (node === null || offset >= node.subtreeLength) return null;
    if (offset <= 0) return node;
    const leftLength = node.left?.subtreeLength ?? 0;
    if (offset <= leftLength) {
      this.#setLeft(node, this.#dropPrefix(node.left, offset));
      node.updateSubtreeLength();
      return node;
    }
    const pieceEnd = leftLength + node.piece.length;
    if (offset >= pieceEnd) return this.#dropPrefix(node.right, offset - pieceEnd);
    const inPiece = offset - leftLength;
    const rightNode = new PieceNode(this.#createPiece(node.piece.source, node.piece.offset + inPiece, node.piece.length - inPiece));
    rightNode.priority = node.priority;
    this.#setRight(rightNode, node.right);
    rightNode.updateSubtreeLength();
    return rightNode;
  }
  #mergeNodes(left, right) {
    if (left === null) return right;
    if (right === null) return left;
    if (left.priority >= right.priority) {
      this.#setRight(left, this.#mergeNodes(left.right, right));
      left.updateSubtreeLength();
      return left;
    }
    this.#setLeft(right, this.#mergeNodes(left, right.left));
    right.updateSubtreeLength();
    return right;
  }
  #appendCoalescing(tree, piece) {
    if (tree === null) return this.#createNode(piece);
    let last = tree;
    while (last.right !== null) last = last.right;
    if (canCoalescePieces(last.piece, piece)) {
      last.piece = coalesceTwoPieces(last.piece, piece);
      for (let node = last; node !== null; ) {
        node.updateSubtreeLength();
        if (node === tree) break;
        node = node.parent;
      }
      return tree;
    }
    return this.#mergeNodes(tree, this.#createNode(piece));
  }
  #popLeftmost(tree) {
    if (tree === null) return [void 0, null];
    if (tree.left === null) return [tree.piece, tree.right];
    const [piece, newLeft] = this.#popLeftmost(tree.left);
    this.#setLeft(tree, newLeft);
    tree.updateSubtreeLength();
    return [piece, tree];
  }
  #walk(node, visit) {
    if (node === null) return true;
    if (!this.#walk(node.left, visit)) return false;
    if (visit(node) === false) return false;
    return this.#walk(node.right, visit);
  }
};
function isEOL(charCode) {
  return charCode === 10 || charCode === 13;
}
function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}
function createPrefixTable(text) {
  const table = Array.from({ length: text.length }).fill(0);
  let matched = 0;
  for (let i = 1; i < text.length; i++) {
    const charCode = text.charCodeAt(i);
    while (matched > 0 && charCode !== text.charCodeAt(matched)) matched = table[matched - 1];
    if (charCode === text.charCodeAt(matched)) matched++;
    table[i] = matched;
  }
  return table;
}
function normalizeRanges(ranges, length) {
  const normalized = [];
  for (const [rawStart, rawEnd] of ranges) {
    const start = clamp(rawStart, 0, length);
    const end = clamp(rawEnd, start, length);
    if (start < end) normalized.push([start, end]);
  }
  normalized.sort((a, b) => a[0] - b[0]);
  const merged = [];
  for (const range of normalized) {
    const previous = merged[merged.length - 1];
    if (previous !== void 0 && range[0] <= previous[1]) {
      previous[1] = Math.max(previous[1], range[1]);
      continue;
    }
    merged.push(range);
  }
  return merged;
}
function rangeOverlaps(ranges, start, end) {
  let low = 0;
  let high = ranges.length;
  while (low < high) {
    const mid = low + Math.floor((high - low) / 2);
    if (ranges[mid][1] <= start) low = mid + 1;
    else high = mid;
  }
  const range = ranges[low];
  return range !== void 0 && range[0] < end;
}
function canCoalescePieces(prev, next) {
  return prev.source === next.source && prev.offset + prev.length === next.offset && !formsCRLF(prev.lastCharCode, next.firstCharCode);
}
function coalesceTwoPieces(prev, next) {
  return new Piece(prev.source, prev.offset, prev.length + next.length, prev.lineOffsetStart, next.lineOffsetEnd, next.hasVirtualTrailingCRBreak, prev.firstCharCode, next.lastCharCode);
}
function formsCRLF(leftCharCode, rightCharCode) {
  return leftCharCode === CARRIAGE_RETURN && rightCharCode === LINE_FEED;
}
function upperBound(values, target) {
  let lo = 0;
  let hi = values.length;
  while (lo < hi) {
    const mid = lo + Math.floor((hi - lo) / 2);
    if (values[mid] <= target) lo = mid + 1;
    else hi = mid;
  }
  return lo;
}
function escapeRegExp(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function isWordSeparatorCharCode(charCode) {
  if (charCode <= 32 || charCode === 127) return true;
  const ch = String.fromCharCode(charCode);
  return WORD_SEPARATORS.includes(ch);
}
function isWholeWordAtDocOffsets(text, docStart, length) {
  const beforeOk = docStart <= 0 || isWordSeparatorCharCode(text.charCodeAt(docStart - 1));
  const afterOk = docStart + length >= text.length || isWordSeparatorCharCode(text.charCodeAt(docStart + length));
  return beforeOk && afterOk;
}
function compileSearchRegExp(source, isRegex, caseSensitive) {
  const body = isRegex ? source : escapeRegExp(source);
  return new RegExp(body, `g${caseSensitive ? "" : "i"}${isRegex ? "m" : ""}`);
}
function expandReplaceString(replacement, match) {
  return replacement.replace(/\$([$&]|\d+)/g, (_token, group) => {
    if (group === "$") return "$";
    if (group === "&") return match[0] ?? "";
    return match[Number(group)] ?? "";
  });
}
function buildSearchReplacementText(positionAt, offsetAt, getLineText, searchParams, matchStart, matchEnd) {
  if (!searchParams.regex) return searchParams.replaceText;
  const position = positionAt(matchStart);
  const lineText = getLineText(position.line);
  const relStart = matchStart - offsetAt({
    line: position.line,
    character: 0
  });
  let pattern;
  try {
    pattern = compileSearchRegExp(searchParams.text, true, searchParams.caseSensitive);
  } catch {
    return searchParams.replaceText;
  }
  pattern.lastIndex = relStart;
  const match = pattern.exec(lineText);
  if (match === null || match.index !== relStart || match[0].length !== matchEnd - matchStart) return searchParams.replaceText;
  return expandReplaceString(searchParams.replaceText, match);
}
function advancePastEmptyMatch(text, index) {
  if (index + 1 < text.length) {
    const first = text.charCodeAt(index);
    const second = text.charCodeAt(index + 1);
    if (first >= 55296 && first <= 56319 && second >= 56320 && second <= 57343) return index + 2;
  }
  return index + 1;
}
var TextDocument = class TextDocument2 {
  #uri;
  #languageId;
  #version;
  #pieceTable;
  #editStack;
  #eol;
  constructor(uri, text, languageId = "text", version = 0, editStack = new EditStack()) {
    this.#uri = new URL(uri, "file://").toString();
    this.#languageId = languageId;
    this.#version = version;
    this.#pieceTable = new PieceTable(text);
    this.#editStack = editStack;
    const firstLineBreak = this.#pieceTable.getLineText(0, true);
    if (firstLineBreak.endsWith("\r\n")) this.#eol = "\r\n";
    else if (firstLineBreak.endsWith("\r")) this.#eol = "\r";
    else this.#eol = "\n";
  }
  get uri() {
    return this.#uri;
  }
  get languageId() {
    return this.#languageId;
  }
  get version() {
    return this.#version;
  }
  get lineCount() {
    return this.#pieceTable.lineCount;
  }
  get eol() {
    return this.#eol;
  }
  get canUndo() {
    return this.#editStack.canUndo;
  }
  get canRedo() {
    return this.#editStack.canRedo;
  }
  positionAt(offset) {
    return this.normalizePosition(this.#pieceTable.positionAt(offset));
  }
  positionsAt(offsets) {
    const positions = this.#pieceTable.positionsAt(offsets);
    for (let i = 0; i < positions.length; i++) positions[i] = this.normalizePosition(positions[i]);
    return positions;
  }
  offsetAt(position) {
    return this.#pieceTable.offsetAt(this.normalizePosition(position));
  }
  getText(range) {
    if (range === void 0) return this.#pieceTable.getText();
    return this.#pieceTable.getText({
      start: this.normalizePosition(range.start),
      end: this.normalizePosition(range.end)
    });
  }
  getLineText(line, includeLineBreak) {
    return this.#pieceTable.getLineText(line, includeLineBreak);
  }
  normalizeEol(text) {
    return text.replace(/\r\n|\r|\n/g, this.eol);
  }
  getLineLength(line, includeLineBreak) {
    return this.#pieceTable.getLineLength(line, includeLineBreak);
  }
  charAt(positionOrOffset) {
    if (typeof positionOrOffset === "number") return this.#pieceTable.charAt(positionOrOffset);
    return this.#pieceTable.charAt(this.offsetAt(positionOrOffset));
  }
  getTextSlice(start, end) {
    return this.#pieceTable.getTextSlice(start, end);
  }
  findNextNonOverlappingSubstring(needle, occupied) {
    return this.#pieceTable.findNextNonOverlappingSubstring(needle, occupied);
  }
  search(searchParams) {
    return this.#pieceTable.search(searchParams);
  }
  applyEdits(edits, updateHistory = true, selectionsBefore, selectionsAfter, undoBoundary = false) {
    if (edits.length === 0) return;
    return this.#applyResolvedEdits(this.#sortAndValidateResolvedEdits(this.resolveEdits(edits)), updateHistory, selectionsBefore, selectionsAfter, undoBoundary);
  }
  resolveEdits(edits) {
    return edits.map((edit) => this.#resolveEdit(edit));
  }
  applyResolvedEdits(edits, updateHistory = true, selectionsBefore, selectionsAfter, undoBoundary = false) {
    if (edits.length === 0) return;
    return this.#applyResolvedEdits(this.#sortAndValidateResolvedEdits(edits.map((edit) => this.#normalizeResolvedEdit(edit))), updateHistory, selectionsBefore, selectionsAfter, undoBoundary);
  }
  #applyResolvedEdits(resolvedEdits, updateHistory, selectionsBefore, selectionsAfter, undoBoundary) {
    const entry = createEditStackEntry(this, resolvedEdits, this.#version, this.#version + 1, updateHistory ? selectionsBefore : void 0, updateHistory ? selectionsAfter : void 0);
    if (updateHistory && undoBoundary) entry.undoBoundary = true;
    const previousEntry = this.#editStack.peekUndoForCoalescing();
    const change = this.#applyResolvedEditsToBuffer(resolvedEdits);
    this.#version++;
    if (change.lineDelta === 0 && shouldCoalesceEditStackEntry(previousEntry, entry)) this.#editStack.replaceLastUndo(coalesceEditStackEntries(previousEntry, entry));
    else this.#editStack.push(entry);
    return change;
  }
  setLastUndoSelectionsAfter(selections) {
    this.#editStack.setLastUndoSelectionsAfter(selections);
  }
  setLastUndoLineAnnotations(lineAnnotationsBefore, lineAnnotationsAfter) {
    this.#editStack.setLastUndoLineAnnotations(lineAnnotationsBefore, lineAnnotationsAfter);
  }
  undo() {
    const entry = this.#editStack.popUndoToRedo();
    if (entry === void 0) return;
    const change = this.#applyResolvedEditsToBuffer(entry.inverseEdits);
    if (change === void 0) return;
    this.#version = entry.versionBefore;
    const selections = entry.selectionsBefore?.slice();
    return [
      change,
      selections,
      entry.lineAnnotationsBefore?.slice(),
      selections === void 0 ? entry.inverseEdits.map((edit) => ({ ...edit })) : void 0
    ];
  }
  redo() {
    const entry = this.#editStack.popRedoToUndo();
    if (entry === void 0) return;
    const change = this.#applyResolvedEditsToBuffer(entry.forwardEdits);
    if (change === void 0) return;
    this.#version = entry.versionAfter;
    const selections = entry.selectionsAfter?.slice();
    return [
      change,
      selections,
      entry.lineAnnotationsAfter?.slice(),
      selections === void 0 ? entry.forwardEdits.map((edit) => ({ ...edit })) : void 0
    ];
  }
  normalizePosition(position) {
    const line = TextDocument2.#clampIndex(position.line, this.lineCount - 1);
    return {
      line,
      character: TextDocument2.#clampIndex(position.character, this.getLineLength(line))
    };
  }
  static #clampIndex(value, max) {
    if (Number.isNaN(value)) return 0;
    return Math.max(0, Math.min(Math.floor(value), max));
  }
  #resolveEdit(edit) {
    let start = this.offsetAt(edit.range.start);
    let end = this.offsetAt(edit.range.end);
    if (start > end) {
      const t = start;
      start = end;
      end = t;
    }
    return this.#normalizeResolvedEdit({
      start,
      end,
      text: edit.newText
    });
  }
  #normalizeResolvedEdit(edit) {
    let { start, end } = edit;
    const isInsertion = start === end;
    if (this.#isInsideSurrogatePair(start)) start--;
    if (isInsertion) end = start;
    else if (this.#isInsideSurrogatePair(end)) end++;
    return {
      start,
      end,
      text: edit.text
    };
  }
  #isInsideSurrogatePair(offset) {
    const previous = this.#pieceTable.charAt(offset - 1).charCodeAt(0);
    const next = this.#pieceTable.charAt(offset).charCodeAt(0);
    return previous >= 55296 && previous <= 56319 && next >= 56320 && next <= 57343;
  }
  #sortAndValidateResolvedEdits(edits) {
    const sortedEdits = [...edits].sort((a, b) => {
      const startDelta = a.start - b.start;
      return startDelta === 0 ? a.end - b.end : startDelta;
    });
    for (let i = 0; i < sortedEdits.length - 1; i++) if (sortedEdits[i].end > sortedEdits[i + 1].start) throw new Error("Overlapping text edits are not supported");
    return sortedEdits;
  }
  #applyResolvedEditsToBuffer(edits) {
    const previousLineCount = this.#pieceTable.lineCount;
    const editPositions = this.positionsAt(edits.flatMap((edit) => [edit.start, edit.end]));
    const changedLineRange = this.#computeChangedLineRange(edits, editPositions);
    const startPosition = editPositions[0];
    const endPosition = editPositions[editPositions.length - 1];
    const endedAtDocumentEnd = endPosition.line === previousLineCount - 1 && endPosition.character === this.#pieceTable.getLineLength(endPosition.line);
    this.#pieceTable.applyEdits(edits);
    const lineCount = this.#pieceTable.lineCount;
    return {
      changes: edits.map((edit, index) => ({
        ...edit,
        range: {
          start: editPositions[index * 2],
          end: editPositions[index * 2 + 1]
        }
      })),
      startLine: changedLineRange.startLine,
      startCharacter: startPosition.character,
      endCharacter: endPosition.character,
      endLine: Math.min(changedLineRange.endLine, Math.max(0, lineCount - 1)),
      endedAtDocumentEnd,
      previousLineCount,
      lineCount,
      lineDelta: lineCount - previousLineCount,
      changedLineRanges: changedLineRange.ranges,
      changedLineChanges: changedLineRange.changes
    };
  }
  #computeChangedLineRange(edits, editPositions) {
    let startLine = Infinity;
    let endLine = 0;
    let lineDeltaBeforeEdit = 0;
    const ranges = [];
    const changes = [];
    const previousLastLine = this.#pieceTable.lineCount - 1;
    const previousLastLineLength = this.#pieceTable.getLineLength(previousLastLine);
    for (let i = 0; i < edits.length; i++) {
      const edit = edits[i];
      const editStart = editPositions[i * 2];
      const editEnd = editPositions[i * 2 + 1];
      const editStartLine = editStart.line;
      const editEndLine = editEnd.line;
      const insertedLineSpan = countLineBreaks(edit.text);
      const changedStartLine = editStartLine + lineDeltaBeforeEdit;
      const changedEndLine = changedStartLine + insertedLineSpan;
      const lineDelta = insertedLineSpan - (editEndLine - editStartLine);
      startLine = Math.min(startLine, editStartLine);
      endLine = Math.max(endLine, changedEndLine);
      const lastRange = ranges[ranges.length - 1];
      if (lastRange !== void 0 && changedStartLine <= lastRange[1] + 1) ranges[ranges.length - 1] = [lastRange[0], Math.max(lastRange[1], changedEndLine)];
      else ranges.push([changedStartLine, changedEndLine]);
      changes.push([
        changedStartLine,
        changedEndLine,
        lineDelta,
        editStart.character,
        editEnd.character,
        editEndLine === previousLastLine && editEnd.character === previousLastLineLength
      ]);
      lineDeltaBeforeEdit += lineDelta;
    }
    if (startLine === Infinity) return {
      startLine: 0,
      endLine: 0,
      ranges: [[0, 0]],
      changes: [[
        0,
        0,
        0,
        0,
        0,
        false
      ]]
    };
    return {
      startLine,
      endLine,
      ranges,
      changes
    };
  }
};
function isPrimaryModifier({ metaKey, ctrlKey }, isMac = isMacLike()) {
  return isMac ? metaKey && !ctrlKey : ctrlKey && !metaKey;
}
function isMoveCursorShortcut(e) {
  if (isMacLike() && e.ctrlKey && !e.altKey && !e.metaKey) switch (e.key) {
    case "a":
      return "start";
    case "e":
      return "end";
    case "p":
      return "up";
    case "n":
      return "down";
    case "f":
      return "right";
    case "b":
      return "left";
  }
  if (!e.altKey && !e.ctrlKey && !e.metaKey) {
    if (e.key === "ArrowUp") return "up";
    else if (e.key === "ArrowDown") return "down";
    else if (e.key === "ArrowLeft") return "left";
    else if (e.key === "ArrowRight") return "right";
    else if (e.key === "Home") return "start";
    else if (e.key === "End") return "end";
  }
  if (isPrimaryModifier(e)) {
    if (e.key === "ArrowLeft") return "textStart";
    else if (e.key === "ArrowRight") return "end";
  }
}
const compiledEditorKeymaps = /* @__PURE__ */ new WeakMap();
const compiledDefaultKeymap = getCompiledEditorKeymap([
  { bindings: {
    Tab: "indent",
    "shift+Tab": "outdent",
    "cmdOrCtrl+[": "indentLess",
    "cmdOrCtrl+]": "indentMore",
    "cmdOrCtrl+z": "undo",
    "cmdOrCtrl+shift+z": "redo",
    "cmdOrCtrl+a": "selectAll",
    "cmdOrCtrl+d": "findNextMatch",
    "cmdOrCtrl+f": "openSearchPanel",
    "cmdOrCtrl+alt+f": "openSearchReplacePanel",
    "alt+ArrowUp": "moveLineUp",
    "alt+ArrowDown": "moveLineDown",
    "shift+alt+ArrowUp": "copyLineUp",
    "shift+alt+ArrowDown": "copyLineDown",
    Escape: "simplifySelection",
    "cmdOrCtrl+Enter": "insertBlankLine",
    "cmdOrCtrl+/": "toggleComment",
    "shift+alt+a": "toggleBlockComment",
    "cmdOrCtrl+Home": "moveCursorToDocStart",
    "cmdOrCtrl+End": "moveCursorToDocEnd",
    "cmdOrCtrl+shift+Home": "expandSelectionDocStart",
    "cmdOrCtrl+shift+End": "expandSelectionDocEnd"
  } },
  {
    platform: "mac",
    bindings: {
      "ctrl+k": "deleteHardLineForward",
      "ctrl+alt+p": "moveLineUp",
      "ctrl+alt+n": "moveLineDown",
      "cmd+ArrowUp": "moveCursorToDocStart",
      "cmd+ArrowDown": "moveCursorToDocEnd",
      "cmd+shift+ArrowUp": "expandSelectionDocStart",
      "cmd+shift+ArrowDown": "expandSelectionDocEnd"
    }
  },
  {
    platform: "windows",
    bindings: { "ctrl+y": "redo" }
  },
  {
    platform: "linux",
    bindings: {
      "ctrl+y": "redo",
      "ctrl+alt+p": "moveLineUp",
      "ctrl+alt+n": "moveLineDown"
    }
  }
]);
const keyboardCodeKeys = {
  Backquote: "`",
  Minus: "-",
  Equal: "=",
  Comma: ",",
  Period: ".",
  Slash: "/",
  Semicolon: ";",
  Quote: "'",
  BracketLeft: "[",
  BracketRight: "]",
  Backslash: "\\",
  Space: "Space"
};
function getCompiledEditorKeymap(keymap) {
  let compiledKeymap = compiledEditorKeymaps.get(keymap);
  if (compiledKeymap === void 0) {
    compiledKeymap = {
      mac: /* @__PURE__ */ new Map(),
      windows: /* @__PURE__ */ new Map(),
      linux: /* @__PURE__ */ new Map()
    };
    for (const entry of keymap) for (const shortcut of Object.keys(entry.bindings)) {
      const command = entry.bindings[shortcut];
      if (command === void 0) continue;
      const parts = shortcut.split("+");
      const shortcutKey = parts.pop();
      for (const platform of [
        "mac",
        "windows",
        "linux"
      ]) {
        if (entry.platform !== void 0 && entry.platform !== platform) continue;
        let modifiers = 0;
        for (const modifier of parts) if (modifier === "alt") modifiers |= 1;
        else if (modifier === "ctrl") modifiers |= 2;
        else if (modifier === "cmd") modifiers |= 4;
        else if (modifier === "shift") modifiers |= 8;
        else if (modifier === "cmdOrCtrl") modifiers |= platform === "mac" ? 4 : 2;
        let bindings = compiledKeymap[platform].get(modifiers);
        if (bindings === void 0) {
          bindings = /* @__PURE__ */ new Map();
          compiledKeymap[platform].set(modifiers, bindings);
        }
        bindings.set(shortcutKey, command);
      }
    }
    compiledEditorKeymaps.set(keymap, compiledKeymap);
  }
  return compiledKeymap;
}
function resolveEditorCommandFromKeyboardEvent(event, keymap, isMac = isMacLike()) {
  const eventKey = event.key === " " ? "Space" : event.key.length === 1 ? event.key.toLowerCase() : event.key;
  const code = event.code ?? "";
  const codeKey = code.startsWith("Key") && code.length === 4 ? code.slice(3).toLowerCase() : code.startsWith("Digit") && code.length === 6 ? code.slice(5) : keyboardCodeKeys[code];
  const platform = isMac ? "mac" : globalThis.navigator?.platform.includes("Linux") === true ? "linux" : "windows";
  const modifiers = (event.altKey ? 1 : 0) | (event.ctrlKey ? 2 : 0) | (event.metaKey ? 4 : 0) | (event.shiftKey ? 8 : 0);
  if (keymap !== void 0) {
    const bindings2 = getCompiledEditorKeymap(keymap)[platform].get(modifiers);
    const command = bindings2?.get(eventKey) ?? (codeKey === void 0 ? void 0 : bindings2?.get(codeKey));
    if (command !== void 0) return command;
  }
  const bindings = compiledDefaultKeymap[platform].get(modifiers);
  return bindings?.get(eventKey) ?? (codeKey === void 0 ? void 0 : bindings?.get(codeKey));
}
function resolveFindAgainShortcut(event, isMac = isMacLike()) {
  if (event.altKey) return;
  if (!isPrimaryModifier(event, isMac)) return;
  if ((event.key.length === 1 ? event.key.toLowerCase() : event.key) === "g" || event.code === "KeyG") return event.shiftKey ? "previous" : "next";
}
var editor_default = '::selection {\n  background-color: #0000;\n}\n\n[data-deleted-text-selection] [data-deletions] ::selection, [data-deleted-text-selection] [data-line-type="change-deletion"] ::selection {\n  background-color: var(--diffs-editor-selection-bg);\n}\n\n@keyframes blinking {\n  0% {\n    opacity: 1;\n  }\n\n  50% {\n    opacity: 0;\n  }\n\n  100% {\n    opacity: 1;\n  }\n}\n\n:host, [data-code], [data-content], [data-diff-type="split"][data-overflow="wrap"] {\n  position: relative;\n}\n\n[data-code] {\n  container-type: inline-size;\n}\n\n[data-content] {\n  cursor: text;\n  caret-color: var(--diffs-bg-caret);\n  background-color: #0000;\n  outline: none;\n}\n\n[data-line] {\n  cursor: text;\n  background-color: #0000;\n}\n\n[data-line]:after {\n  content: "";\n  z-index: -20;\n  background-color: var(--diffs-line-bg);\n  pointer-events: none;\n  position: absolute;\n  inset: 0;\n}\n\n[data-line][data-editor-active-line]:after {\n  box-shadow: inset 0 0 0 1px var(--diffs-editor-line-highlight-border);\n}\n\n[data-editor-overlay] {\n  display: contents;\n}\n\n[data-caret], [data-selection-range], [data-match-range], [data-bracket-match-range], [data-marker-range] {\n  height: 1lh;\n  line-height: var(--diffs-line-height);\n  pointer-events: none;\n  position: absolute;\n  top: 0;\n  left: 0;\n}\n\n[data-caret] {\n  background-color: var(--diffs-bg-caret-override, var(--diffs-editor-cursor-fg, light-dark(color-mix(in lab, var(--diffs-fg) 50%, var(--diffs-bg)), color-mix(in lab, var(--diffs-fg) 75%, var(--diffs-bg)))));\n  visibility: hidden;\n  width: 2px;\n}\n\n@media (prefers-reduced-motion: no-preference) {\n  [data-caret] {\n    animation: 1.2s .8s infinite blinking;\n  }\n}\n\n[data-selection-range] {\n  z-index: -10;\n  background-color: var(--diffs-editor-selection-bg);\n}\n\n[data-selection-corner] {\n  background-color: var(--diffs-selection-corner-bg, var(--diffs-bg));\n  width: 100%;\n  height: 100%;\n}\n\n[data-match-range] {\n  z-index: -10;\n  background-color: var(--diffs-editor-match-bg, var(--diffs-editor-selection-bg));\n}\n\n[data-match-range]:not([data-focus]) {\n  background-color: var(--diffs-editor-match-highlight-bg, light-dark(#ff963288, #ff963266));\n}\n\n[data-bracket-match-range] {\n  z-index: -9;\n  box-sizing: border-box;\n  border-bottom: 1px solid\n    var(--diffs-editor-bracket-match-border, color-mix(in lab, var(--diffs-fg) 60%, transparent));\n  background-color: var(--diffs-editor-bracket-match-bg, color-mix(in lab, var(--diffs-fg) 5%, transparent));\n}\n\n[data-rtl] {\n  border-top-left-radius: 3px;\n}\n\n[data-rtr] {\n  border-top-right-radius: 3px;\n}\n\n[data-rbl] {\n  border-bottom-left-radius: 3px;\n}\n\n[data-rbr] {\n  border-bottom-right-radius: 3px;\n}\n\n[data-marker-range] {\n  z-index: 1;\n  background-color: var(--diffs-marker-bg);\n  mask-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2IiBoZWlnaHQ9IjMiPjxwYXRoIGQ9Im0wIDIuNSBsMiAtMS41IGwxIDAgbDIgMS41IGwxIDAiIHN0cm9rZT0iI2ZmZiIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9zdmc+");\n  mask-position: 0 100%;\n  mask-size: 6px 3px;\n  mask-repeat: repeat-x;\n}\n\n[data-marker-error] {\n  --diffs-marker-contrast: light-dark(#fff, #000);\n  --diffs-marker-bg: var(--diffs-editor-error-fg, var(--diffs-deletion-base));\n}\n\n[data-marker-warning] {\n  --diffs-marker-contrast: #000;\n  --diffs-marker-bg: var(--diffs-editor-warning-fg, light-dark(var(--diffs-warning-light), var(--diffs-warning-dark)));\n}\n\n[data-marker-info] {\n  --diffs-marker-contrast: #000;\n  --diffs-marker-bg: var(--diffs-editor-info-fg, var(--diffs-modified-base));\n}\n\n[data-marker-hint] {\n  --diffs-marker-contrast: light-dark(#fff, #000);\n  --diffs-marker-bg: var(--diffs-editor-hint-fg, var(--diffs-fg-number));\n}\n\n@media (width >= 480px) {\n  [data-content] {\n    caret-color: #0000;\n  }\n\n  [data-content]:focus ~ [data-editor-overlay] [data-caret] {\n    visibility: visible;\n  }\n}\n\n[data-editor-widget] {\n  --diffs-widget-fg: var(--diffs-fg);\n  --diffs-widget-bg: color-mix(in lab, var(--diffs-fg) 4%, var(--diffs-bg));\n  --diffs-widget-border: color-mix(in lab, var(--diffs-fg) 20%, transparent);\n  --diffs-widget-shadow: inset 0 0 0 1px var(--diffs-bg), 0 4px 8px #00000013,\n    0 6px 18px #00000013;\n  z-index: 100;\n  width: fit-content;\n  max-width: calc(100% - 24px);\n  font: 14px/20px var(--diffs-header-font-fallback);\n  border: 1px solid var(--diffs-widget-border);\n  background-color: var(--diffs-widget-bg);\n  box-shadow: var(--diffs-widget-shadow);\n  background-clip: padding-box;\n  border-radius: 9px;\n  position: absolute;\n  top: 0;\n  left: 0;\n}\n\n[data-marker-popover], [data-selection-action-popover] {\n  --popover-gap: var(--diffs-popover-gap, var(--diffs-gap-fallback, 8px));\n  --popover-viewport-left: 0px;\n  --popover-viewport-right: 100cqw;\n  --popover-viewport-top: -99999px;\n  --popover-viewport-bottom: 99999px;\n  --popover-min-left: calc(var(--popover-viewport-left) + var(--gutter-width, 0px) + var(--popover-gap));\n  --popover-available-width: max(0px,\n    calc(var(--popover-viewport-right) - var(--popover-min-left) -\n        var(--popover-gap)));\n  max-width: min(640px, var(--popover-available-width));\n  translate: clamp(var(--popover-min-left),\n      var(--popover-x, var(--popover-min-left)),\n      calc(var(--popover-viewport-right) - var(--popover-gap) - 100%))\n    /* Clamp into the scrollport so a popover with no fitting side stays in view. */\n    clamp(var(--popover-viewport-top),\n      calc(var(--popover-y, 0px) + var(--popover-y-shift, 0px)),\n      calc(var(--popover-viewport-bottom) - var(--popover-gap) - 100%));\n}\n\n[data-marker-popover] {\n  --diffs-widget-bg: var(--diffs-marker-bg);\n  --diffs-widget-shadow: 0 4px 8px #00000026, 0 6px 18px #00000026;\n  min-width: min(180px, var(--popover-available-width));\n  overflow-wrap: anywhere;\n  color: var(--diffs-marker-contrast);\n  white-space: normal;\n  pointer-events: auto;\n  border: 0;\n  padding: 8px 12px;\n\n  @supports (color: contrast-color(red)) {\n    color: contrast-color(var(--diffs-marker-bg), var(--diffs-bg));\n  }\n\n  & [data-marker-message] {\n    white-space: normal;\n    overflow-wrap: anywhere;\n\n    & code {\n      white-space: normal;\n      color: inherit;\n      background-color: #0000;\n      display: inline;\n    }\n  }\n}\n\n[data-selection-action-popover] {\n  pointer-events: auto;\n  flex-wrap: wrap;\n  align-items: center;\n  gap: 4px;\n  width: max-content;\n  padding: 4px;\n  display: flex;\n}\n\n[data-search-panel] {\n  z-index: 100;\n  flex-direction: column;\n  justify-content: right;\n  width: 100%;\n  height: 0;\n  display: flex;\n  position: sticky;\n  top: 16px;\n  right: 16px;\n  container: search-panel / inline-size;\n\n  & [data-editor-widget] {\n    z-index: 100;\n    flex-shrink: 0;\n    align-items: stretch;\n    gap: 8px;\n    min-width: 260px;\n    max-width: 100%;\n    margin-inline: auto 16px;\n    padding: 4px;\n    display: flex;\n    position: relative;\n  }\n\n  & svg {\n    fill: currentColor;\n    width: 12px;\n    height: 12px;\n    display: block;\n  }\n}\n\n[data-search-grid] {\n  grid-template-columns: auto auto auto;\n  grid-template-areas: "find matches nav"\n                       "replace actions .";\n  align-items: center;\n  gap: 4px 6px;\n  width: 100%;\n  display: grid;\n}\n\n[data-input-box][data-find] {\n  grid-area: find;\n}\n\n[data-search-nav] {\n  grid-area: nav;\n}\n\n[data-input-box][data-replace] {\n  grid-area: replace;\n}\n\n[data-replace-actions] {\n  grid-area: actions;\n}\n\n[data-search-grid][data-mode="find"] {\n  grid-template-areas: "find matches nav";\n}\n\n[data-search-grid][data-mode="find"] [data-replace-cell] {\n  display: none;\n}\n\n@container search-panel (width < 400px) {\n  [data-search-panel] [data-editor-widget] {\n    padding: 10px;\n  }\n\n  [data-search-grid][data-mode="replace"] {\n    grid-template-columns: auto 1fr auto;\n    grid-template-areas: "find find find"\n                         "replace replace replace"\n                         "nav matches actions";\n  }\n\n  [data-search-grid][data-mode="find"] {\n    grid-template-columns: auto 1fr auto;\n    grid-template-areas: "find find find"\n                         "nav matches matches";\n  }\n\n  [data-replace-actions] {\n    justify-self: end;\n  }\n\n  [data-search-grid] [data-input-box] {\n    width: auto;\n  }\n}\n\n[data-input-box] {\n  align-items: center;\n  width: 200px;\n  display: flex;\n  position: relative;\n\n  & input {\n    width: 100%;\n    min-width: 0;\n    color: var(--diffs-fg);\n    background-color: var(--diffs-bg);\n    border: 1px solid color-mix(in lab, var(--diffs-fg) 12%, var(--diffs-bg));\n    border-radius: 6px;\n    outline: none;\n    flex-grow: 1;\n    padding-inline: 6px;\n    font-size: 13px;\n    line-height: 24px;\n\n    &::selection {\n      background-color: color-mix(in lab, var(--diffs-fg) 8%, var(--diffs-bg));\n    }\n\n    &:focus-visible {\n      outline: 1px solid var(--diffs-modified-base);\n    }\n  }\n\n  &[data-find] input {\n    padding-inline-end: 72px;\n  }\n\n  & [data-search-icon] {\n    --diffs-search-icon-size: 20px;\n  }\n}\n\n[data-search-toggles] {\n  align-items: center;\n  gap: 1px;\n  display: flex;\n  position: absolute;\n  top: 50%;\n  right: 4px;\n  transform: translateY(-50%);\n}\n\n[data-matches] {\n  white-space: nowrap;\n  min-width: 50px;\n  color: color-mix(in lab, var(--diffs-fg) 50%, var(--diffs-bg));\n  flex-shrink: 0;\n  grid-area: matches;\n  font-size: 12px;\n  font-weight: 500;\n  line-height: 20px;\n\n  &[data-no-matches] {\n    color: color-mix(in lab, var(--diffs-fg) 35%, var(--diffs-bg));\n  }\n}\n\n[data-replace-actions], [data-search-nav] {\n  align-items: center;\n  display: flex;\n}\n\n[data-search-icon] {\n  appearance: none;\n  width: var(--diffs-search-icon-size, 24px);\n  height: var(--diffs-search-icon-size, 24px);\n  color: color-mix(in lab, var(--diffs-fg) 65%, var(--diffs-bg));\n  border-radius: var(--diffs-search-icon-radius, 4px);\n  cursor: pointer;\n  background: none;\n  border: 0;\n  flex-shrink: 0;\n  justify-content: center;\n  align-items: center;\n  margin: 0;\n  padding: 0;\n  transition: background-color .1s ease-in-out, color .1s ease-in-out;\n  display: flex;\n\n  &:disabled {\n    opacity: .25;\n    cursor: default;\n  }\n\n  &:not(:disabled):hover {\n    color: var(--diffs-fg);\n  }\n\n  &:focus-visible {\n    outline: 1px solid var(--diffs-modified-base);\n  }\n\n  &[aria-pressed="true"] {\n    color: var(--diffs-modified-base);\n  }\n}\n\n[data-search-close] {\n  --diffs-search-icon-size: 20px;\n  --diffs-search-icon-radius: 50%;\n  color: var(--diffs-widget-bg);\n  background-color: color-mix(in lab,\n    var(--diffs-widget-fg) 50%,\n    var(--diffs-bg));\n  position: absolute;\n  top: 0;\n  right: 0;\n  transform: translate(50%, -50%);\n\n  &:not(:disabled):hover {\n    opacity: 1;\n    color: var(--diffs-widget-bg);\n    background-color: var(--diffs-widget-fg);\n  }\n}\n';
const DEFAULT_LINE_COMMENT = "//";
const DEFAULT_BLOCK_COMMENT = ["/*", "*/"];
const LANGUAGE_COMMENT_CONFIGS = {
  sql: { lineComment: "--" },
  ruby: {
    lineComment: "#",
    blockComment: ["=begin", "=end"]
  },
  rst: { lineComment: ".." },
  coffeescript: {
    lineComment: "#",
    blockComment: ["###", "###"]
  },
  cmd: { lineComment: "@REM" },
  julia: {
    lineComment: "#",
    blockComment: ["#=", "=#"]
  },
  yaml: { lineComment: "#" },
  yml: { lineComment: "#" },
  markdown: {
    lineComment: null,
    blockComment: ["<!--", "-->"]
  },
  zsh: { lineComment: "#" },
  makefile: { lineComment: "#" },
  handlebars: {
    lineComment: null,
    blockComment: ["{{!--", "--}}"]
  },
  ini: {
    lineComment: ";",
    blockComment: [";", " "]
  },
  powershell: {
    lineComment: "#",
    blockComment: ["<#", "#>"]
  },
  vb: { lineComment: "'" },
  xml: {
    lineComment: null,
    blockComment: ["<!--", "-->"]
  },
  lua: {
    lineComment: "--",
    blockComment: ["--[[", "]]"]
  },
  html: {
    lineComment: null,
    blockComment: ["<!--", "-->"]
  },
  diff: {
    lineComment: "#",
    blockComment: ["#", " "]
  },
  r: { lineComment: "#" },
  fsharp: { blockComment: ["(*", "*)"] },
  pug: { lineComment: "//-" },
  perl: { lineComment: "#" },
  tex: { lineComment: "%" },
  clojure: { lineComment: ";;" },
  css: { lineComment: null },
  python: {
    lineComment: "#",
    blockComment: ['"""', '"""']
  },
  dotenv: { lineComment: "#" },
  dockerfile: { lineComment: "#" },
  razor: {
    lineComment: null,
    blockComment: ["<!--", "-->"]
  },
  prompt: {
    lineComment: null,
    blockComment: ["<!--", "-->"]
  }
};
function resolveCommentConfig(languageId, overrides) {
  const config = {
    ...LANGUAGE_COMMENT_CONFIGS[languageId],
    ...overrides?.[languageId]
  };
  return {
    lineComment: config.lineComment === void 0 ? DEFAULT_LINE_COMMENT : config.lineComment,
    blockComment: config.blockComment ?? DEFAULT_BLOCK_COMMENT
  };
}
function resolveLineCommentEdits(textDocument, selections, token) {
  const lines = [];
  const seenLines = /* @__PURE__ */ new Set();
  for (const selection of selections) {
    let endLine = selection.end.line;
    if (selection.start.line < endLine && selection.end.character === 0) endLine--;
    const startIndex = lines.length;
    let minIndent = Infinity;
    for (let line = selection.start.line; line <= endLine; line++) {
      if (seenLines.has(line)) continue;
      seenLines.add(line);
      const text = textDocument.getLineText(line);
      const indent = text.length - text.trimStart().length;
      const empty = indent === text.length;
      if (!empty) minIndent = Math.min(minIndent, indent);
      lines.push({
        line,
        comment: text.slice(indent, indent + token.length) === token ? indent : -1,
        empty,
        indent,
        single: false
      });
    }
    if (minIndent !== Infinity) {
      for (let index = startIndex; index < lines.length; index++) if (!lines[index].empty) lines[index].indent = minIndent;
    }
    if (lines.length === startIndex + 1) lines[startIndex].single = true;
  }
  const shouldComment = lines.some((line) => line.comment < 0 && (!line.empty || line.single));
  const edits = [];
  if (shouldComment) {
    for (const line of lines) {
      if (line.empty && !line.single) continue;
      const position = {
        line: line.line,
        character: line.indent
      };
      edits.push({
        range: {
          start: position,
          end: position
        },
        newText: token + " "
      });
    }
    return edits;
  }
  for (const line of lines) {
    if (line.comment < 0) continue;
    const text = textDocument.getLineText(line.line);
    const start = line.comment;
    const end = start + token.length + (text[start + token.length] === " " ? 1 : 0);
    edits.push({
      range: {
        start: {
          line: line.line,
          character: start
        },
        end: {
          line: line.line,
          character: end
        }
      },
      newText: ""
    });
  }
  return edits;
}
const BLOCK_COMMENT_SEARCH_MARGIN = 50;
function findBlockComment(textDocument, open, close, from, to) {
  const beforeStart = Math.max(0, from - BLOCK_COMMENT_SEARCH_MARGIN);
  const textBefore = textDocument.getTextSlice(beforeStart, from);
  const textAfter = textDocument.getTextSlice(to, to + BLOCK_COMMENT_SEARCH_MARGIN);
  const spaceBefore = textBefore.length - textBefore.trimEnd().length;
  const spaceAfter = textAfter.length - textAfter.trimStart().length;
  const beforeOffset = textBefore.length - spaceBefore;
  if (textBefore.slice(beforeOffset - open.length, beforeOffset) === open && textAfter.slice(spaceAfter, spaceAfter + close.length) === close) return {
    open: {
      start: from - spaceBefore - open.length,
      end: from - spaceBefore + (spaceBefore > 0 ? 1 : 0),
      text: ""
    },
    close: {
      start: to + spaceAfter - (spaceAfter > 0 ? 1 : 0),
      end: to + spaceAfter + close.length,
      text: ""
    },
    contentStart: from,
    contentEnd: to
  };
  const shortText = to - from <= BLOCK_COMMENT_SEARCH_MARGIN * 2 ? textDocument.getTextSlice(from, to) : void 0;
  const startText = shortText ?? textDocument.getTextSlice(from, from + BLOCK_COMMENT_SEARCH_MARGIN);
  const endText = shortText ?? textDocument.getTextSlice(to - BLOCK_COMMENT_SEARCH_MARGIN, to);
  const startSpace = startText.length - startText.trimStart().length;
  const closeStart = to - (endText.length - endText.trimEnd().length) - close.length;
  if (startText.slice(startSpace, startSpace + open.length) !== open || textDocument.getTextSlice(closeStart, closeStart + close.length) !== close) return;
  const openStart = from + startSpace;
  const openEnd = openStart + open.length + (/\s/.test(startText[open.length + startSpace] ?? "") ? 1 : 0);
  const closeDeleteStart = closeStart - (/\s/.test(textDocument.getTextSlice(closeStart - 1, closeStart)) ? 1 : 0);
  return {
    open: {
      start: openStart,
      end: openEnd,
      text: ""
    },
    close: {
      start: closeDeleteStart,
      end: closeStart + close.length,
      text: ""
    },
    contentStart: openEnd,
    contentEnd: closeDeleteStart
  };
}
function mapOffset(offset, edits, cumulativeDeltas, association) {
  let low = 0;
  let high = edits.length;
  while (low < high) {
    const middle = low + high >>> 1;
    if (edits[middle].end < offset) low = middle + 1;
    else high = middle;
  }
  let delta = cumulativeDeltas[low];
  for (let index = low; index < edits.length; index++) {
    const edit = edits[index];
    if (offset < edit.start) break;
    if (edit.start === edit.end && offset === edit.start) {
      if (association < 0) break;
      delta += edit.text.length;
      continue;
    }
    if (offset > edit.end) {
      delta += edit.text.length - (edit.end - edit.start);
      continue;
    }
    if (offset === edit.end) return edit.start + delta + edit.text.length;
    return edit.start + delta + (association > 0 ? edit.text.length : 0);
  }
  return offset + delta;
}
function resolveBlockCommentEdits(textDocument, selections, [open, close], linewise = false) {
  const ranges = selections.map((selection) => {
    let { start, end } = selection;
    if (linewise) {
      let endLine = end.line;
      if (start.line < endLine && end.character === 0) endLine--;
      const firstLine = textDocument.getLineText(start.line);
      const indent = firstLine.length - firstLine.trimStart().length;
      start = {
        line: start.line,
        character: indent
      };
      end = {
        line: endLine,
        character: textDocument.getLineLength(endLine)
      };
    }
    return {
      from: textDocument.offsetAt(start),
      to: textDocument.offsetAt(end),
      direction: selection.direction,
      comment: void 0
    };
  });
  if (linewise && ranges.length > 1) {
    ranges.sort((a, b) => {
      const startOrder = a.from - b.from;
      return startOrder !== 0 ? startOrder : a.to - b.to;
    });
    let lastRangeIndex = 0;
    for (let index = 1; index < ranges.length; index++) {
      const previous = ranges[lastRangeIndex];
      const current = ranges[index];
      if (current.from <= previous.to) previous.to = Math.max(previous.to, current.to);
      else ranges[++lastRangeIndex] = current;
    }
    ranges.length = lastRangeIndex + 1;
  }
  for (const range of ranges) range.comment = findBlockComment(textDocument, open, close, range.from, range.to);
  const shouldUncomment = ranges.every((range) => range.comment !== void 0);
  const offsetEdits = [];
  for (const range of ranges) {
    const comment = range.comment;
    if (shouldUncomment && comment !== void 0) {
      offsetEdits.push(comment.open, comment.close);
      continue;
    }
    if (comment !== void 0) continue;
    if (range.from === range.to) {
      offsetEdits.push({
        start: range.from,
        end: range.to,
        text: open + "  " + close
      });
      continue;
    }
    offsetEdits.push({
      start: range.from,
      end: range.from,
      text: open + " "
    }, {
      start: range.to,
      end: range.to,
      text: " " + close
    });
  }
  if (offsetEdits.length === 0) return;
  offsetEdits.sort((a, b) => {
    const startOrder = a.start - b.start;
    return startOrder !== 0 ? startOrder : a.end - b.end;
  });
  const edits = offsetEdits.map((edit) => ({
    range: {
      start: textDocument.positionAt(edit.start),
      end: textDocument.positionAt(edit.end)
    },
    newText: edit.text
  }));
  if (linewise) return {
    edits,
    nextSelectionOffsets: []
  };
  const logicalRanges = ranges.map((range) => {
    const comment = range.comment;
    if (shouldUncomment && comment !== void 0) return {
      start: comment.contentStart,
      end: comment.contentEnd,
      startAssociation: 1,
      endAssociation: -1
    };
    if (comment !== void 0) return {
      start: range.from,
      end: range.to,
      startAssociation: 1,
      endAssociation: 1
    };
    if (range.from === range.to) return {
      start: range.from,
      end: range.to,
      startAssociation: -1,
      endAssociation: -1,
      collapsedInset: open.length + 1
    };
    return {
      start: range.from,
      end: range.to,
      startAssociation: 1,
      endAssociation: -1
    };
  });
  const cumulativeDeltas = new Array(offsetEdits.length + 1);
  cumulativeDeltas[0] = 0;
  for (let index = 0; index < offsetEdits.length; index++) {
    const edit = offsetEdits[index];
    cumulativeDeltas[index + 1] = cumulativeDeltas[index] + edit.text.length - (edit.end - edit.start);
  }
  return {
    edits,
    nextSelectionOffsets: logicalRanges.map((range, index) => {
      const start = mapOffset(range.start, offsetEdits, cumulativeDeltas, range.startAssociation) + (range.collapsedInset ?? 0);
      return [
        start,
        range.collapsedInset === void 0 ? mapOffset(range.end, offsetEdits, cumulativeDeltas, range.endAssociation) : start,
        ranges[index].direction
      ];
    })
  };
}
function h(tagName, props, parent) {
  const { style, dataset, children, ...attrs } = props ?? {};
  const el = document.createElement(tagName);
  Object.assign(el, attrs);
  if (style !== void 0) if (typeof style === "string") el.style.cssText = style;
  else Object.assign(el.style, style);
  if (dataset !== void 0) if (typeof dataset === "string") el.dataset[dataset] = "";
  else if (Array.isArray(dataset)) dataset.forEach((key) => {
    el.dataset[key] = "";
  });
  else Object.assign(el.dataset, dataset);
  if (children !== void 0) el.replaceChildren(...children);
  if (parent !== void 0) parent.appendChild(el);
  return el;
}
function addEventListener(el, event, listener, options) {
  el.addEventListener(event, listener, options);
  return () => el.removeEventListener(event, listener, options);
}
function getLineNumberAttr(el, key = "line") {
  const value = el.dataset[key];
  if (value === void 0) return;
  const lineNumber = parseInt(value, 10);
  if (Number.isNaN(lineNumber)) return;
  return lineNumber;
}
function clampDomOffset(node, offset) {
  if (node.nodeType === 3) {
    const length = node.textContent?.length ?? 0;
    return Math.max(0, Math.min(offset, length));
  }
  if (node.nodeType === 1) return Math.max(0, Math.min(offset, node.childNodes.length));
  return 0;
}
function extend(obj, attrs) {
  return Object.assign(obj, attrs);
}
function debounce(func, wait) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}
function round(value, precision = 1e3) {
  return Math.round(value * precision) / precision;
}
function endsWithLineBreak(text) {
  return text.endsWith("\n") || text.endsWith("\r");
}
function createSegmenter(options) {
  if (typeof Intl === "undefined" || typeof Intl.Segmenter !== "function") return;
  return new Intl.Segmenter(void 0, options);
}
let graphemeSegmenter;
let graphemeSegmenterInit = false;
function getGraphemeSegmenter() {
  if (!graphemeSegmenterInit) {
    graphemeSegmenter = createSegmenter({ granularity: "grapheme" });
    graphemeSegmenterInit = true;
  }
  return graphemeSegmenter;
}
function applyDocumentChangeToLineAnnotations(change, lineAnnotations) {
  const annotationChanges = getLineAnnotationChanges(change);
  if (annotationChanges.length === 0) return;
  const nextLineAnnotations = [];
  let changed = false;
  for (const annotation of lineAnnotations) {
    if (annotation.side === "deletions" || annotation.lineNumber <= 0) {
      nextLineAnnotations.push(annotation);
      continue;
    }
    let line = annotation.lineNumber - 1;
    let lineCount = change.previousLineCount;
    let annotationChanged = false;
    for (const lineChange of annotationChanges) {
      const nextLineCount = Math.max(1, lineCount + lineChange.lineDelta);
      const nextLine = mapLineThroughLineChange(line, lineChange, nextLineCount);
      if (nextLine === void 0) {
        annotationChanged = true;
        line = void 0;
        break;
      }
      if (nextLine !== line || lineChangeTouchesAnnotationLine(line, lineChange)) annotationChanged = true;
      line = nextLine;
      lineCount = nextLineCount;
    }
    if (line === void 0) {
      changed = true;
      continue;
    }
    const lineNumber = line + 1;
    if (annotationChanged) {
      nextLineAnnotations.push(lineNumber === annotation.lineNumber ? annotation : {
        ...annotation,
        lineNumber
      });
      changed = true;
      continue;
    }
    nextLineAnnotations.push(annotation);
  }
  return changed ? nextLineAnnotations : void 0;
}
function getLineAnnotationChanges(change) {
  if (change.changedLineChanges !== void 0) return change.changedLineChanges.flatMap(([startLine, changedEndLine, lineDelta, startCharacter = 0, _endCharacter = 0, endedAtDocumentEnd = false]) => {
    if (lineDelta === 0) return [];
    const insertedLineBreaks = Math.max(0, changedEndLine - startLine);
    return [{
      startLine,
      startCharacter,
      endLine: startLine + Math.max(0, insertedLineBreaks - lineDelta),
      deletesEndLine: lineDelta < 0 && endedAtDocumentEnd,
      insertedLineBreaks,
      lineDelta
    }];
  });
  if (change.lineDelta === 0) return change.changedLineRanges.flatMap(([startLine, endLine]) => {
    const insertedLineBreaks = endLine - startLine;
    if (insertedLineBreaks <= 0) return [];
    return [{
      startLine,
      startCharacter: 0,
      endLine: startLine,
      deletesEndLine: false,
      insertedLineBreaks,
      lineDelta: insertedLineBreaks
    }];
  });
  const removedLineCount = Math.max(0, -change.lineDelta);
  const deletedToDocumentEnd = change.endedAtDocumentEnd && change.startLine + removedLineCount === change.previousLineCount - 1;
  return [{
    startLine: change.startLine,
    startCharacter: change.startCharacter,
    endLine: change.startLine + removedLineCount,
    deletesEndLine: deletedToDocumentEnd,
    insertedLineBreaks: Math.max(0, change.lineDelta),
    lineDelta: change.lineDelta
  }];
}
function mapLineThroughLineChange(line, lineChange, nextLineCount) {
  if (line < lineChange.startLine) return line;
  if (line > lineChange.endLine || lineChange.endLine > lineChange.startLine && line === lineChange.endLine && !lineChange.deletesEndLine) return line + lineChange.lineDelta;
  if (lineChange.startLine === lineChange.endLine) {
    if (lineChange.startCharacter === 0) return line + lineChange.insertedLineBreaks;
    return line;
  }
  if (lineChangeDeletesAnnotationLine(line, lineChange)) return;
  const replacementLineOffset = Math.min(Math.max(0, line - lineChange.startLine), lineChange.insertedLineBreaks);
  return clampLine(lineChange.startLine + replacementLineOffset, nextLineCount);
}
function lineChangeDeletesAnnotationLine(line, lineChange) {
  if (lineChange.lineDelta >= 0 || line < lineChange.startLine || line > lineChange.endLine) return false;
  if (line === lineChange.startLine && lineChange.startCharacter > 0) return false;
  if (line === lineChange.endLine && !lineChange.deletesEndLine) return false;
  return true;
}
function lineChangeTouchesAnnotationLine(line, lineChange) {
  if (lineChange.lineDelta === 0 || line < lineChange.startLine || line > lineChange.endLine) return false;
  return !(lineChange.endLine > lineChange.startLine && line === lineChange.endLine && !lineChange.deletesEndLine);
}
function clampLine(line, lineCount) {
  return Math.max(0, Math.min(line, Math.max(0, lineCount - 1)));
}
function renderLineAnnotations(lineAnnotations, contentEl, gutterEl) {
  const additionAnnotations = /* @__PURE__ */ new Map();
  const deletionAnnotations = /* @__PURE__ */ new Map();
  for (const annotation of lineAnnotations) {
    const lineNumber = annotation.lineNumber;
    if (!additionAnnotations.has(lineNumber)) additionAnnotations.set(lineNumber, []);
    if (!deletionAnnotations.has(lineNumber)) deletionAnnotations.set(lineNumber, []);
    (annotation.side === "deletions" ? deletionAnnotations : additionAnnotations).get(lineNumber).push(getLineAnnotationName(annotation));
  }
  const leftCodeElement = contentEl.parentElement?.previousElementSibling;
  let leftGutterElement;
  let leftContentElement;
  if (leftCodeElement != null && leftCodeElement instanceof HTMLElement && leftCodeElement.dataset.deletions !== void 0) for (const child of leftCodeElement.children) {
    const el = child;
    const { gutter, content } = el.dataset;
    if (gutter !== void 0) leftGutterElement = el;
    else if (content !== void 0) leftContentElement = el;
  }
  cleanLineAnnotationElements(contentEl, gutterEl);
  if (leftContentElement !== void 0) cleanLineAnnotationElements(leftContentElement, leftGutterElement);
  const additionsAnnotationElements = createLineAnnotationElements(additionAnnotations, contentEl, gutterEl);
  if (leftContentElement === void 0) return;
  const deletionsAnnotationElements = createLineAnnotationElements(deletionAnnotations, leftContentElement, leftGutterElement);
  requestAnimationFrame(() => {
    syncPairedLineAnnotationHeights(additionAnnotations, deletionAnnotations, additionsAnnotationElements, deletionsAnnotationElements);
  });
}
function cleanLineAnnotationElements(contentEl, gutterEl) {
  const staleElements = [];
  for (let i = 1; i < contentEl.childElementCount; i++) {
    const el = contentEl.children[i];
    if (el.dataset.lineAnnotation !== void 0) {
      staleElements.push(el);
      if (gutterEl !== void 0) staleElements.push(gutterEl.children[i]);
    }
  }
  for (const el of staleElements) el.remove();
}
function createLineAnnotationElements(lineAnnotations, contentEl, gutterEl) {
  const annotationElements = /* @__PURE__ */ new Map();
  for (const el of contentEl.children) {
    const lineNumber = getLineNumberAttr(el);
    if (lineNumber !== void 0) {
      const annotations = lineAnnotations.get(lineNumber);
      if (annotations !== void 0) {
        const annotationElement = h("div", {
          dataset: { lineAnnotation: "0," + (lineNumber - 1) },
          children: [h("div", {
            dataset: "annotationContent",
            children: annotations.map((name) => h("slot", { name }))
          })]
        });
        el.after(annotationElement);
        annotationElements.set(lineNumber, annotationElement);
      }
    }
  }
  if (gutterEl !== void 0) for (const el of gutterEl.children) {
    const lineNumber = getLineNumberAttr(el, "columnNumber");
    if (lineNumber !== void 0 && lineAnnotations.has(lineNumber)) {
      const bufferEl = h("div", {
        dataset: {
          gutterBuffer: "annotation",
          bufferSize: "1"
        },
        style: { gridRow: "span 1" }
      });
      el.after(bufferEl);
    }
  }
  return annotationElements;
}
function syncPairedLineAnnotationHeights(additionAnnotations, deletionAnnotations, additionAnnotationElements, deletionAnnotationElements) {
  const offsetHeights = /* @__PURE__ */ new Map();
  for (const [lineNumber, annotations] of additionAnnotations.entries()) {
    const annotationElement = deletionAnnotationElements.get(lineNumber);
    if (annotations.length === 0 && annotationElement !== void 0) {
      const height = measureAnnotationContentHeight(annotationElement);
      if (height > 0) offsetHeights.set(lineNumber, height);
    }
  }
  for (const [lineNumber, annotations] of deletionAnnotations.entries()) {
    const annotationElement = additionAnnotationElements.get(lineNumber);
    if (annotations.length === 0 && annotationElement !== void 0) {
      const height = measureAnnotationContentHeight(annotationElement);
      if (height > 0) offsetHeights.set(lineNumber, height);
    }
  }
  applyLineAnnotationMinHeights(additionAnnotations, additionAnnotationElements, offsetHeights);
  applyLineAnnotationMinHeights(deletionAnnotations, deletionAnnotationElements, offsetHeights);
}
function measureAnnotationContentHeight(lineAnnotationEl) {
  const content = lineAnnotationEl.firstElementChild;
  if (!(content instanceof HTMLElement)) return 0;
  return content.getBoundingClientRect().height;
}
function applyLineAnnotationMinHeights(lineAnnotations, annotationElements, offsetHeights) {
  for (const [lineNumber, annotationElement] of annotationElements.entries()) {
    const annotations = lineAnnotations.get(lineNumber);
    const offsetHeight = offsetHeights.get(lineNumber);
    if (annotations?.length === 0 && offsetHeight !== void 0) annotationElement.style.setProperty("--diffs-annotation-min-height", `${offsetHeight}px`);
  }
}
var PopoverManager = class {
  #fileContainer;
  #codeElement;
  #scrollContainer;
  #scrollContainerSource;
  #cachedCodeRect;
  #cachedScrollContainerRect;
  #cachedCodeScrollLeft = 0;
  #cachedCodeScrollTop = 0;
  #cachedCodeClientWidth = 0;
  #viewportRectsDirty = true;
  #viewportRectListenersDisposes;
  #placements = /* @__PURE__ */ new Map();
  #hasActivePopover;
  #updateActivePopover;
  constructor(options) {
    this.#hasActivePopover = options.hasActivePopover;
    this.#updateActivePopover = options.updateActivePopover;
  }
  setViewportElements(fileContainer, codeElement) {
    const viewportElementChanged = this.#fileContainer !== fileContainer || this.#codeElement !== codeElement;
    this.#fileContainer = fileContainer;
    if (!viewportElementChanged) return;
    this.#codeElement = codeElement;
    this.#viewportRectsDirty = true;
    this.#viewportRectListenersDisposes?.forEach((dispose) => dispose());
    this.#viewportRectListenersDisposes = void 0;
  }
  cleanUp() {
    this.#codeElement = void 0;
    this.#fileContainer = void 0;
    this.#scrollContainer = void 0;
    this.#scrollContainerSource = void 0;
    this.#cachedCodeRect = void 0;
    this.#cachedScrollContainerRect = void 0;
    this.#cachedCodeScrollLeft = 0;
    this.#cachedCodeScrollTop = 0;
    this.#cachedCodeClientWidth = 0;
    this.#viewportRectsDirty = true;
    this.#viewportRectListenersDisposes?.forEach((dispose) => dispose());
    this.#viewportRectListenersDisposes = void 0;
    this.#placements.clear();
  }
  resetPlacement(placementKey = "default") {
    this.#placements.delete(placementKey);
  }
  setPlacement(placement, placementKey = "default") {
    this.#placements.set(placementKey, placement);
  }
  choosePlacement(input) {
    const { preferred, fallback, viewport, popoverHeight, atDocumentEdge, placementKey = "default" } = input;
    const previousPlacement = this.#placements.get(placementKey);
    let placement;
    if (viewport !== void 0 && popoverHeight > 0) {
      const fits = (bounds, margin = 0) => bounds.top >= viewport.top + margin && bounds.bottom <= viewport.bottom - margin;
      if (previousPlacement === "fallback" && fits(fallback) && !fits(preferred, 4)) placement = "fallback";
      else if (!fits(preferred) && fits(fallback)) placement = "fallback";
      else placement = "preferred";
    } else placement = atDocumentEdge ? "fallback" : "preferred";
    this.#placements.set(placementKey, placement);
    return placement;
  }
  /**
  * Returns the bounds of the popover in overlay coordinate space.
  */
  getPlacementBounds() {
    const codeRect = this.#getCodeRect();
    if (codeRect === void 0) return;
    const scrollContainerRect = this.#getScrollContainerRect();
    let topScreen;
    let bottomScreen;
    if (scrollContainerRect !== void 0) {
      topScreen = scrollContainerRect.top;
      bottomScreen = scrollContainerRect.bottom;
    } else {
      topScreen = 0;
      bottomScreen = window.innerHeight;
    }
    topScreen = Math.max(topScreen, codeRect.top);
    bottomScreen = Math.min(bottomScreen, codeRect.bottom);
    if (bottomScreen <= topScreen) return;
    const codeScrollLeft = this.#cachedCodeScrollLeft;
    const codeScrollTop = this.#cachedCodeScrollTop;
    const codeViewportWidth = this.#cachedCodeClientWidth > 0 ? this.#cachedCodeClientWidth : codeRect.width;
    const leftScreen = scrollContainerRect !== void 0 ? scrollContainerRect.left : 0;
    const rightScreen = scrollContainerRect !== void 0 ? scrollContainerRect.right : window.innerWidth;
    const codeViewportLeft = codeScrollLeft;
    const codeViewportRight = codeScrollLeft + codeViewportWidth;
    const visibleLeft = Math.max(codeViewportLeft, leftScreen - codeRect.left + codeScrollLeft);
    const visibleRight = Math.min(codeViewportRight, rightScreen - codeRect.left + codeScrollLeft);
    return {
      top: topScreen - codeRect.top + codeScrollTop,
      bottom: bottomScreen - codeRect.top + codeScrollTop,
      left: visibleLeft,
      right: Math.max(visibleLeft, visibleRight)
    };
  }
  #getScrollContainer() {
    const fileContainer = this.#fileContainer;
    if (fileContainer === void 0) return;
    if (this.#scrollContainerSource === fileContainer) {
      if (this.#scrollContainer === void 0 || this.#scrollContainer.isConnected) return this.#scrollContainer;
    }
    let element = fileContainer.parentElement;
    while (element !== null) {
      const overflowY = getComputedStyle(element).overflowY;
      if (overflowY === "auto" || overflowY === "scroll" || overflowY === "overlay") {
        this.#scrollContainer = element;
        this.#scrollContainerSource = fileContainer;
        return element;
      }
      element = element.parentElement;
    }
    this.#scrollContainer = void 0;
    this.#scrollContainerSource = fileContainer;
  }
  #refreshViewportRectsIfNeeded() {
    if (!this.#viewportRectsDirty) return;
    this.#ensureViewportRectListeners();
    const codeElement = this.#codeElement;
    this.#cachedCodeRect = codeElement?.getBoundingClientRect();
    this.#cachedCodeScrollLeft = codeElement?.scrollLeft ?? 0;
    this.#cachedCodeScrollTop = codeElement?.scrollTop ?? 0;
    this.#cachedCodeClientWidth = codeElement?.clientWidth ?? 0;
    this.#cachedScrollContainerRect = this.#getScrollContainer()?.getBoundingClientRect();
    this.#viewportRectsDirty = false;
  }
  #getCodeRect() {
    this.#refreshViewportRectsIfNeeded();
    return this.#cachedCodeRect;
  }
  #getScrollContainerRect() {
    this.#refreshViewportRectsIfNeeded();
    return this.#cachedScrollContainerRect;
  }
  #ensureViewportRectListeners() {
    if (this.#viewportRectListenersDisposes !== void 0) return;
    let repositionRafId;
    const markDirty = () => {
      this.#viewportRectsDirty = true;
      if (!this.#hasActivePopover() || repositionRafId !== void 0) return;
      repositionRafId = requestAnimationFrame(() => {
        repositionRafId = void 0;
        this.#updateActivePopover();
      });
    };
    const scroller = this.#getScrollContainer();
    const codeElement = this.#codeElement;
    this.#viewportRectListenersDisposes = [
      scroller !== void 0 ? addEventListener(scroller, "scroll", markDirty, { passive: true }) : addEventListener(window, "scroll", markDirty, { passive: true }),
      ...codeElement !== void 0 ? [addEventListener(codeElement, "scroll", markDirty, { passive: true })] : [],
      addEventListener(window, "resize", markDirty, { passive: true }),
      () => {
        if (repositionRafId !== void 0) {
          cancelAnimationFrame(repositionRafId);
          repositionRafId = void 0;
        }
      }
    ];
  }
};
function setPopoverPositionStyles(popover, { gutterWidth, placeAbove, viewport, x, y }) {
  popover.style.setProperty("--gutter-width", gutterWidth + "px");
  popover.style.setProperty("--popover-x", x + "px");
  popover.style.setProperty("--popover-y", y + "px");
  popover.style.setProperty("--popover-y-shift", placeAbove ? "-100%" : "0px");
  if (viewport === void 0) {
    popover.style.removeProperty("--popover-viewport-left");
    popover.style.removeProperty("--popover-viewport-right");
    popover.style.removeProperty("--popover-viewport-top");
    popover.style.removeProperty("--popover-viewport-bottom");
    return;
  }
  popover.style.setProperty("--popover-viewport-left", viewport.left + "px");
  popover.style.setProperty("--popover-viewport-right", viewport.right + "px");
  popover.style.setProperty("--popover-viewport-top", viewport.top + "px");
  popover.style.setProperty("--popover-viewport-bottom", viewport.bottom + "px");
}
const AUTO_SURROUND_CLOSE_CHARS = /* @__PURE__ */ new Map([
  ["'", "'"],
  ['"', '"'],
  ["`", "`"],
  ["{", "}"],
  ["[", "]"],
  ["<", ">"],
  ["(", ")"]
]);
const AUTO_SURROUND_QUOTE_CHARS = /* @__PURE__ */ new Set([
  "'",
  '"',
  "`"
]);
const AUTO_SURROUND_BRACKET_CHARS = /* @__PURE__ */ new Set([
  "{",
  "[",
  "(",
  "<"
]);
function convertSelection(range, direction = 0) {
  const start = boundaryToPosition(range.startContainer, range.startOffset);
  const end = boundaryToPosition(range.endContainer, range.endOffset);
  if (start === null || end === null) return;
  return {
    start,
    end,
    direction
  };
}
function resolveIndentEdits(textDocument, selection, tabSize, outdent) {
  if (textDocument === void 0) return [[], selection];
  const { start, end } = selection;
  const edits = [];
  let newSelection = { ...selection };
  const blockIndent = start.line !== end.line;
  let endLine = end.line;
  if (start.line < end.line && end.character === 0) endLine--;
  for (let line = start.line; line <= endLine; line++) {
    const lineText = textDocument.getLineText(line);
    if (lineText === void 0) continue;
    if (blockIndent && lineText.trim().length === 0) continue;
    const indentUnit = lineText.startsWith("	") ? "	" : " ".repeat(tabSize);
    let deleteLength = 0;
    let newText = indentUnit;
    if (outdent) {
      if (lineText.startsWith("	")) deleteLength = 1;
      else if (lineText.startsWith(" ")) {
        const leadingSpacesLength = lineText.length - lineText.trimStart().length;
        deleteLength = Math.min(indentUnit.length, leadingSpacesLength);
      }
      if (deleteLength === 0) continue;
      newText = "";
    }
    edits.push({
      range: {
        start: {
          line,
          character: 0
        },
        end: {
          line,
          character: deleteLength
        }
      },
      newText
    });
    const delta = newText.length - deleteLength;
    if (line === start.line) newSelection = {
      ...newSelection,
      start: {
        ...start,
        character: Math.max(0, start.character + delta)
      }
    };
    if (line === end.line) newSelection = {
      ...newSelection,
      end: {
        ...end,
        character: Math.max(0, end.character + delta)
      }
    };
  }
  return [edits, newSelection];
}
function mapCursorMove(textDocument, selections, shortcut, options = {}) {
  const lineCount = textDocument.lineCount;
  return selections.map((selection) => {
    let { line, character } = shortcut === "up" || shortcut === "left" ? selection.start : selection.end;
    if (shortcut === "textStart" || shortcut === "start" || shortcut === "end") {
      const caret = getCaretPosition(selection);
      line = caret.line;
      character = caret.character;
      const softLine = getSoftLineInfo(textDocument, line, character, options);
      if (shortcut === "textStart") {
        const softLineText = textDocument.getLineText(line).slice(softLine.start, softLine.end);
        const indent = softLine.start + getLeadingSpaces(softLineText);
        character = character === indent ? softLine.start : indent;
      } else character = shortcut === "start" ? softLine.start : softLine.end;
    } else if (shortcut === "up") {
      const moved = moveBySoftLine(textDocument, line, character, -1, options);
      if (moved !== void 0) {
        line = moved.line;
        character = moved.character;
      } else if (line > 0) line = options.resolveRenderableLine == null ? line - 1 : options.resolveRenderableLine(line - 1, "up") ?? line;
    } else if (shortcut === "down") {
      const moved = moveBySoftLine(textDocument, line, character, 1, options);
      if (moved !== void 0) {
        line = moved.line;
        character = moved.character;
      } else {
        const maxLine = Math.max(lineCount - 1, 0);
        if (line < maxLine) line = options.resolveRenderableLine == null ? line + 1 : Math.min(options.resolveRenderableLine(line + 1, "down") ?? line, maxLine);
      }
    } else if (isCollapsedSelection(selection)) {
      const lineLength = textDocument.getLineLength(line);
      character = Math.min(character, lineLength);
      if (shortcut === "left") {
        if (character > 0) character = stepCharacterByGrapheme(textDocument, line, character, false);
        else if (line > 0) {
          const targetLine = options.resolveRenderableLine == null ? line - 1 : options.resolveRenderableLine(line - 1, "up");
          if (targetLine !== void 0) {
            line = targetLine;
            character = textDocument.getLineLength(line);
          }
        }
      } else if (character < lineLength) character = stepCharacterByGrapheme(textDocument, line, character, true);
      else if (line < lineCount - 1) {
        const targetLine = options.resolveRenderableLine == null ? line + 1 : options.resolveRenderableLine(line + 1, "down");
        if (targetLine !== void 0) {
          line = Math.min(targetLine, lineCount - 1);
          character = 0;
        }
      }
    }
    const pos = {
      line,
      character
    };
    return {
      start: pos,
      end: pos,
      direction: 0
    };
  });
}
function moveBySoftLine(textDocument, line, character, direction, options) {
  if (options.getSoftLineOffsets === void 0) return;
  const current = getSoftLineInfo(textDocument, line, character, options);
  const targetIndex = current.index + direction;
  let targetLine = line;
  let target;
  if (targetIndex >= 0 && targetIndex < current.count) target = getSoftLineInfoAtIndex(textDocument, targetLine, targetIndex, options);
  else {
    const nextLine = line + direction;
    if (nextLine < 0 || nextLine >= textDocument.lineCount) return {
      line,
      character
    };
    const resolvedLine = options.resolveRenderableLine == null ? nextLine : options.resolveRenderableLine(nextLine, direction < 0 ? "up" : "down");
    if (resolvedLine === void 0) return {
      line,
      character
    };
    targetLine = Math.min(resolvedLine, textDocument.lineCount - 1);
    const targetCount = getSoftLineCount(textDocument, targetLine, options);
    target = getSoftLineInfoAtIndex(textDocument, targetLine, direction < 0 ? targetCount - 1 : 0, options);
  }
  const column = Math.max(0, character - current.start);
  const targetCharacter = target.start + column;
  const landedCharacter = target.index === target.count - 1 ? targetCharacter : Math.min(targetCharacter, target.end);
  const targetLineText = textDocument.getLineText(targetLine);
  return {
    line: targetLine,
    character: landedCharacter > targetLineText.length ? landedCharacter : snapCharacterToGraphemeBoundary(targetLineText, landedCharacter)
  };
}
function snapCharacterToGraphemeBoundary(lineText, character) {
  if (character <= 0 || character >= lineText.length) return character;
  const segmenter = getGraphemeSegmenter();
  if (segmenter !== void 0) {
    for (const segment of segmenter.segment(lineText)) {
      if (character <= segment.index) return character;
      const segmentEnd = segment.index + segment.segment.length;
      if (character < segmentEnd) return segmentEnd;
    }
    return character;
  }
  let segmentStart = 0;
  for (const codePoint of lineText) {
    if (character <= segmentStart) return character;
    const segmentEnd = segmentStart + codePoint.length;
    if (character < segmentEnd) return segmentEnd;
    segmentStart = segmentEnd;
  }
  return character;
}
function getSoftLineInfo(textDocument, line, character, options) {
  const lineLength = textDocument.getLineLength(line);
  const offsets = options.getSoftLineOffsets?.(line);
  if (offsets === void 0 || offsets.length < 2) return {
    start: 0,
    end: lineLength,
    index: 0,
    count: 1
  };
  for (let index = 0; index + 1 < offsets.length; index++) {
    const softLine = getSoftLineInfoAtIndex(textDocument, line, index, options);
    if (character >= softLine.start && character <= softLine.end) return softLine;
  }
  return getSoftLineInfoAtIndex(textDocument, line, character < (offsets[0] ?? 0) ? 0 : offsets.length - 2, options);
}
function getSoftLineCount(textDocument, line, options) {
  const offsets = options.getSoftLineOffsets?.(line);
  return offsets === void 0 || offsets.length < 2 ? 1 : offsets.length - 1;
}
function getSoftLineInfoAtIndex(textDocument, line, index, options) {
  const lineLength = textDocument.getLineLength(line);
  const offsets = options.getSoftLineOffsets?.(line);
  if (offsets === void 0 || offsets.length < 2) return {
    start: 0,
    end: lineLength,
    index: 0,
    count: 1
  };
  const count = offsets.length - 1;
  const boundedIndex = Math.max(0, Math.min(index, count - 1));
  const start = Math.max(0, Math.min(lineLength, offsets[boundedIndex] ?? 0));
  return {
    start,
    end: Math.max(start, Math.min(lineLength, offsets[boundedIndex + 1] ?? lineLength)),
    index: boundedIndex,
    count
  };
}
function mapSelectionShift(textDocument, selections, shortcut, options = {}) {
  return selections.map((selection) => {
    const focusPosition = selection.direction === -1 ? selection.start : selection.end;
    const [movedFocusSelection] = mapCursorMove(textDocument, [{
      start: focusPosition,
      end: focusPosition,
      direction: 0
    }], shortcut, options);
    return createSelectionFrom(selection, movedFocusSelection);
  });
}
function applyTextChangeToSelections(textDocument, selections, edit, lineAnnotations, tabSize = 2, undoBoundary = false) {
  if (selections[selections.length - 1] === void 0) return { nextSelections: [] };
  const selectionPositions = [];
  for (const selection of selections) selectionPositions.push(selection.start, selection.end);
  const selectionOffsets = selectionPositions.map((position) => textDocument.offsetAt(position));
  const primaryStartOffset = selectionOffsets[(selections.length - 1) * 2];
  const primaryEndOffset = selectionOffsets[(selections.length - 1) * 2 + 1];
  const ordered = [];
  let isAlreadyOrdered = true;
  for (let index = 0; index < selections.length; index++) {
    const entry = {
      index,
      start: selectionOffsets[index * 2],
      end: selectionOffsets[index * 2 + 1]
    };
    const previous = ordered[ordered.length - 1];
    if (previous !== void 0 && (entry.start < previous.start || entry.start === previous.start && entry.end < previous.end)) isAlreadyOrdered = false;
    ordered.push(entry);
  }
  if (!isAlreadyOrdered) ordered.sort((a, b) => {
    const startOrder = a.start - b.start;
    if (startOrder !== 0) return startOrder;
    const endOrder = a.end - b.end;
    if (endOrder !== 0) return endOrder;
    return a.index - b.index;
  });
  const adjustedChange = normalizeLeadingIndentForChange(textDocument, edit, tabSize);
  const edits = [];
  const nextSelectionOffsets = Array.from({ length: selections.length });
  let offsetDelta = 0;
  let mergedGroup;
  const finalizeMergedGroup = () => {
    if (mergedGroup === void 0) return;
    const perGroupChange = normalizeLeadingIndentForChange(textDocument, {
      start: mergedGroup.start,
      end: mergedGroup.end,
      text: adjustedChange.text
    }, tabSize);
    const newText = expandSingleNewlineInsert(textDocument, perGroupChange.text, perGroupChange.start);
    edits.push({
      start: perGroupChange.start,
      end: perGroupChange.end,
      text: newText
    });
    const nextOffsets = [mergedGroup.start + offsetDelta + newText.length, mergedGroup.start + offsetDelta + newText.length];
    for (const index of mergedGroup.indices) nextSelectionOffsets[index] = nextOffsets;
    offsetDelta += newText.length - (perGroupChange.end - perGroupChange.start);
    mergedGroup = void 0;
  };
  for (const entry of ordered) {
    const startOffset = Math.max(0, entry.start + (adjustedChange.start - primaryStartOffset));
    const endOffset = Math.max(startOffset, entry.end + (adjustedChange.end - primaryEndOffset));
    if (mergedGroup !== void 0 && startOffset < mergedGroup.end) {
      mergedGroup.end = Math.max(mergedGroup.end, endOffset);
      mergedGroup.indices.push(entry.index);
      continue;
    }
    finalizeMergedGroup();
    mergedGroup = {
      start: startOffset,
      end: endOffset,
      indices: [entry.index]
    };
  }
  finalizeMergedGroup();
  const change = textDocument.applyResolvedEdits(edits, true, selections, void 0, undoBoundary);
  const nextSelections = createSelectionsFromOffsetPairs(textDocument, nextSelectionOffsets.map((offsets) => {
    if (offsets === void 0) throw new Error("Missing next selection offsets");
    return offsets;
  }));
  textDocument.setLastUndoSelectionsAfter(nextSelections);
  if (change !== void 0 && lineAnnotations !== void 0) {
    const nextLineAnnotations = applyDocumentChangeToLineAnnotations(change, lineAnnotations);
    if (nextLineAnnotations !== void 0) textDocument.setLastUndoLineAnnotations(lineAnnotations, nextLineAnnotations);
  }
  return {
    nextSelections,
    change
  };
}
function getAutoSurroundPreservedOffset(originalText, newText) {
  if (newText.length !== originalText.length + 2) return;
  const closeChar = AUTO_SURROUND_CLOSE_CHARS.get(newText[0]);
  if (closeChar === void 0 || newText[newText.length - 1] !== closeChar || newText.slice(1, -1) !== originalText) return;
  return 1;
}
function getNextSelectionOffsetPairAfterReplace(textDocument, entry, offsetDelta, newText) {
  const insertStart = entry.start + offsetDelta;
  const insertEnd = insertStart + newText.length;
  if (entry.end - entry.start > 0) {
    const originalText = textDocument.getTextSlice(entry.start, entry.end);
    const preservedOffset = getAutoSurroundPreservedOffset(originalText, newText) ?? newText.indexOf(originalText);
    if (preservedOffset !== -1 && preservedOffset + originalText.length <= newText.length) {
      const rangeStart = insertStart + preservedOffset;
      return [rangeStart, rangeStart + originalText.length];
    }
  }
  return [insertEnd, insertEnd];
}
function applyTextReplaceToSelections(textDocument, selections, texts, lineAnnotations, undoBoundary = false, textOrder = "selection") {
  if (selections.length !== texts.length) throw new Error("Selection text replacements must match the selection count");
  const selectionPositions = [];
  for (const selection of selections) selectionPositions.push(selection.start, selection.end);
  const selectionOffsets = selectionPositions.map((position) => textDocument.offsetAt(position));
  const ordered = [];
  let isAlreadyOrdered = true;
  for (let index = 0; index < selections.length; index++) {
    const entry = {
      index,
      start: selectionOffsets[index * 2],
      end: selectionOffsets[index * 2 + 1]
    };
    const previous = ordered[ordered.length - 1];
    if (previous !== void 0 && (entry.start < previous.start || entry.start === previous.start && entry.end < previous.end)) isAlreadyOrdered = false;
    ordered.push(entry);
  }
  if (!isAlreadyOrdered) ordered.sort((a, b) => {
    const startOrder = a.start - b.start;
    if (startOrder !== 0) return startOrder;
    const endOrder = a.end - b.end;
    if (endOrder !== 0) return endOrder;
    return a.index - b.index;
  });
  const allDeletes = texts.every((text) => text === "");
  let edits;
  const nextSelectionOffsetPairs = Array.from({ length: selections.length });
  if (allDeletes) {
    edits = [];
    let hasEffect = false;
    for (const entry of ordered) {
      nextSelectionOffsetPairs[entry.index] = [entry.end, entry.end];
      if (entry.start >= entry.end) continue;
      hasEffect = true;
      const last = edits[edits.length - 1];
      if (last !== void 0 && entry.start < last.end) edits[edits.length - 1] = {
        start: last.start,
        end: Math.max(last.end, entry.end),
        text: ""
      };
      else edits.push({
        start: entry.start,
        end: entry.end,
        text: ""
      });
    }
    if (!hasEffect) return { nextSelections: selections };
    for (const entry of ordered) {
      const caret = entry.end;
      let delta = 0;
      let next = caret;
      for (const edit of edits) {
        if (caret <= edit.start) break;
        if (caret >= edit.end) {
          delta -= edit.end - edit.start;
          continue;
        }
        next = edit.start + delta;
        break;
      }
      if (next === caret) next += delta;
      nextSelectionOffsetPairs[entry.index] = [next, next];
    }
  } else {
    edits = [];
    let offsetDelta = 0;
    let previousEditEnd = -1;
    for (let index = 0; index < ordered.length; index++) {
      const entry = ordered[index];
      if (entry.start < previousEditEnd) throw new Error("Overlapping multi-selection edits are not supported");
      previousEditEnd = entry.end;
      const newText = expandSingleNewlineInsert(textDocument, texts[textOrder === "document" ? index : entry.index], entry.start);
      edits.push({
        start: entry.start,
        end: entry.end,
        text: newText
      });
      nextSelectionOffsetPairs[entry.index] = getNextSelectionOffsetPairAfterReplace(textDocument, entry, offsetDelta, newText);
      offsetDelta += newText.length - (entry.end - entry.start);
    }
  }
  const change = textDocument.applyResolvedEdits(edits, true, selections, void 0, undoBoundary);
  const nextSelections = createSelectionsFromOffsetPairs(textDocument, nextSelectionOffsetPairs.map((offsets) => {
    if (offsets === void 0) throw new Error("Missing next selection offsets");
    return offsets;
  }));
  textDocument.setLastUndoSelectionsAfter(nextSelections);
  if (change !== void 0 && lineAnnotations !== void 0) {
    const nextLineAnnotations = applyDocumentChangeToLineAnnotations(change, lineAnnotations);
    if (nextLineAnnotations !== void 0) textDocument.setLastUndoLineAnnotations(lineAnnotations, nextLineAnnotations);
  }
  return {
    nextSelections,
    change
  };
}
function shouldAutoSurroundChar(autoSurround, char) {
  if (autoSurround === "never") return false;
  if (autoSurround === "brackets") return AUTO_SURROUND_BRACKET_CHARS.has(char);
  if (autoSurround === "quotes") return AUTO_SURROUND_QUOTE_CHARS.has(char);
  return true;
}
function getAutoSurroundReplacementTexts(textDocument, selections, char, autoSurround) {
  if (char.length !== 1 || selections.length === 0) return;
  const closeChar = AUTO_SURROUND_CLOSE_CHARS.get(char);
  if (closeChar === void 0 || !shouldAutoSurroundChar(autoSurround, char)) return;
  const replacements = [];
  for (const selection of selections) {
    if (isCollapsedSelection(selection)) return;
    replacements.push(char + textDocument.getText(selection) + closeChar);
  }
  return replacements;
}
function applyTransposeToSelections(textDocument, selections, lineAnnotations) {
  const edits = [];
  const nextOffsetPairs = [];
  for (const selection of selections) {
    const [anchor, focus] = getSelectionAnchorAndFocusOffsets(textDocument, selection);
    if (!isCollapsedSelection(selection)) {
      nextOffsetPairs.push([anchor, focus]);
      continue;
    }
    const { line, character } = selection.start;
    const offset = anchor;
    const lineText = textDocument.getLineText(line);
    const lineLength = lineText.length;
    const lineStart = offset - character;
    const graphemeStarts = getLineGraphemeStarts(lineText);
    let edit;
    if (character > 0 && character < lineLength) {
      const before = findClusterBreak(lineText, character, false, graphemeStarts);
      const after = findClusterBreak(lineText, character, true, graphemeStarts);
      edit = {
        start: lineStart + before,
        end: lineStart + after,
        text: lineText.slice(character, after) + lineText.slice(before, character)
      };
      nextOffsetPairs.push([lineStart + after, lineStart + after]);
    } else if (character === lineLength && graphemeStarts.length >= 2) {
      const lastStart = graphemeStarts[graphemeStarts.length - 1];
      const secondLastStart = graphemeStarts[graphemeStarts.length - 2];
      edit = {
        start: lineStart + secondLastStart,
        end: offset,
        text: lineText.slice(lastStart, lineLength) + lineText.slice(secondLastStart, lastStart)
      };
      nextOffsetPairs.push([offset, offset]);
    } else if (character === 0 && line > 0 && lineLength > 0) {
      const prevLine = line - 1;
      const prevLineText = textDocument.getLineText(prevLine);
      const prevLength = prevLineText.length;
      const prevEnd = textDocument.offsetAt({
        line: prevLine,
        character: prevLength
      });
      const prevGraphemeStart = prevLength > 0 ? findClusterBreak(prevLineText, prevLength, false, getLineGraphemeStarts(prevLineText)) : prevLength;
      const firstEnd = findClusterBreak(lineText, 0, true, graphemeStarts);
      const prevStart = prevEnd - (prevLength - prevGraphemeStart);
      const newText = lineText.slice(0, firstEnd) + textDocument.getTextSlice(prevEnd, offset) + prevLineText.slice(prevGraphemeStart, prevLength);
      edit = {
        start: prevStart,
        end: offset + firstEnd,
        text: newText
      };
      const caret = prevStart + newText.length;
      nextOffsetPairs.push([caret, caret]);
    } else {
      nextOffsetPairs.push([anchor, focus]);
      continue;
    }
    edits.push(edit);
  }
  if (edits.length === 0) return { nextSelections: selections };
  edits.sort((a, b) => a.start - b.start);
  for (let index = 1; index < edits.length; index++) if (edits[index].start < edits[index - 1].end) throw new Error("Overlapping multi-selection edits are not supported");
  const change = textDocument.applyResolvedEdits(edits, true, selections);
  const nextSelections = createSelectionsFromOffsetPairs(textDocument, nextOffsetPairs);
  textDocument.setLastUndoSelectionsAfter(nextSelections);
  if (change !== void 0 && lineAnnotations !== void 0) {
    const nextLineAnnotations = applyDocumentChangeToLineAnnotations(change, lineAnnotations);
    if (nextLineAnnotations !== void 0) textDocument.setLastUndoLineAnnotations(lineAnnotations, nextLineAnnotations);
  }
  return {
    nextSelections,
    change
  };
}
function applyDeleteHardLineForwardToSelections(textDocument, selections, lineAnnotations) {
  const deleteSelections = selections.map((selection) => {
    const range = resolveDeleteHardLineForwardRange(textDocument, selection);
    return {
      start: range.start,
      end: range.end,
      direction: 0
    };
  });
  return applyTextReplaceToSelections(textDocument, deleteSelections, deleteSelections.map(() => ""), lineAnnotations);
}
function applyDeleteSoftLineBackwardToSelections(textDocument, selections, getSoftLineStart, lineAnnotations) {
  const deleteSelections = selections.map((selection) => {
    if (!isCollapsedSelection(selection)) return {
      start: selection.start,
      end: selection.end,
      direction: 0
    };
    const caret = getCaretPosition(selection);
    const { line, character } = caret;
    const softLineStart = getSoftLineStart?.(line, character) ?? 0;
    if (character > softLineStart) return {
      start: {
        line,
        character: softLineStart
      },
      end: {
        line,
        character
      },
      direction: 0
    };
    if (line === 0) return {
      start: caret,
      end: caret,
      direction: 0
    };
    const prevLineLength = textDocument.getLineLength(line - 1);
    return {
      start: {
        line: line - 1,
        character: prevLineLength
      },
      end: {
        line,
        character: 0
      },
      direction: 0
    };
  });
  return applyTextReplaceToSelections(textDocument, deleteSelections, deleteSelections.map(() => ""), lineAnnotations);
}
function applyDeleteWordBackwardToSelections(textDocument, selections, lineAnnotations) {
  const deleteSelections = selections.map((selection) => {
    const [start, end] = resolveDeleteWordBackwardRange(textDocument, selection);
    return {
      start,
      end,
      direction: 0
    };
  });
  return applyTextReplaceToSelections(textDocument, deleteSelections, deleteSelections.map(() => ""), lineAnnotations);
}
function resolveDeleteCharacterRange(textDocument, selection, forward) {
  if (!isCollapsedSelection(selection)) return [selection.start, selection.end];
  const caret = getCaretPosition(selection);
  let { line, character } = caret;
  const lineLength = textDocument.getLineLength(line);
  const lineCount = textDocument.lineCount;
  character = Math.min(character, lineLength);
  if (forward) {
    if (character < lineLength) return [{
      line,
      character
    }, {
      line,
      character: stepCharacterByGrapheme(textDocument, line, character, true)
    }];
    if (line < lineCount - 1) return [{
      line,
      character: lineLength
    }, {
      line: line + 1,
      character: 0
    }];
    return [caret, caret];
  }
  if (character > 0) return [{
    line,
    character: stepCharacterByGrapheme(textDocument, line, character, false)
  }, {
    line,
    character
  }];
  if (line > 0) {
    const prevLineLength = textDocument.getLineLength(line - 1);
    return [{
      line: line - 1,
      character: prevLineLength
    }, {
      line,
      character: 0
    }];
  }
  return [caret, caret];
}
function applyDeleteCharacterToSelections(textDocument, selections, forward, lineAnnotations, tabSize = 2) {
  const deleteSelections = selections.map((selection) => {
    let [start, end] = resolveDeleteCharacterRange(textDocument, selection, forward);
    if (!forward && isCollapsedSelection(selection)) {
      const normalized = normalizeLeadingIndentForChange(textDocument, {
        start: textDocument.offsetAt(start),
        end: textDocument.offsetAt(end),
        text: ""
      }, tabSize);
      start = textDocument.positionAt(normalized.start);
      end = textDocument.positionAt(normalized.end);
    }
    return {
      start,
      end,
      direction: 0
    };
  });
  return applyTextReplaceToSelections(textDocument, deleteSelections, deleteSelections.map(() => ""), lineAnnotations);
}
function isCollapsedSelection(selection) {
  return selection.start.line === selection.end.line && selection.start.character === selection.end.character;
}
function getCaretPosition(selection) {
  const { start, end, direction } = selection;
  return direction === -1 ? start : end;
}
function isLineEditable(lineType) {
  return lineType === "context" || lineType === "context-expanded" || lineType === "change-addition";
}
function selectionIntersects(a, b) {
  const aCollapsed = isCollapsedSelection(a);
  const bCollapsed = isCollapsedSelection(b);
  if (aCollapsed && bCollapsed) return comparePosition(a.start, b.start) === 0;
  if (aCollapsed) return comparePosition(b.start, a.start) <= 0 && comparePosition(a.start, b.end) <= 0;
  if (bCollapsed) return comparePosition(a.start, b.start) <= 0 && comparePosition(b.start, a.end) <= 0;
  return comparePosition(a.start, b.end) < 0 && comparePosition(b.start, a.end) < 0;
}
function comparePosition(a, b) {
  if (a.line !== b.line) return a.line - b.line;
  return a.character - b.character;
}
function createSelectionFromAnchorAndFocusOffsets(textDocument, anchorOffset, focusOffset) {
  const direction = anchorOffset === focusOffset ? 0 : anchorOffset < focusOffset ? 1 : -1;
  const start = Math.min(anchorOffset, focusOffset);
  const end = Math.max(anchorOffset, focusOffset);
  return {
    start: textDocument.positionAt(start),
    end: textDocument.positionAt(end),
    direction
  };
}
function remapOffsetThroughEdits(offset, edits) {
  let delta = 0;
  for (const edit of edits) {
    if (offset < edit.start) break;
    if (offset >= edit.end) delta += edit.text.length - (edit.end - edit.start);
    else return edit.start + delta + edit.text.length;
  }
  return offset + delta;
}
function remapSelectionsAfterEdits(textDocument, selections, selectionOffsets, edits) {
  return selections.map((selection, index) => {
    const [startOffset, endOffset] = selectionOffsets[index];
    const nextStart = remapOffsetThroughEdits(startOffset, edits);
    const nextEnd = remapOffsetThroughEdits(endOffset, edits);
    return createSelectionFromAnchorAndFocusOffsets(textDocument, selection.direction === -1 ? nextEnd : nextStart, selection.direction === -1 ? nextStart : nextEnd);
  });
}
function createSelectionFrom(anchorSelection, focusSelection) {
  const anchor = anchorSelection.direction === -1 ? anchorSelection.end : anchorSelection.start;
  const currentStartOrder = comparePosition(anchor, focusSelection.start);
  const currentEndOrder = comparePosition(anchor, focusSelection.end);
  let focus = focusSelection.end;
  if (currentStartOrder <= 0) focus = focusSelection.end;
  else if (currentEndOrder >= 0) focus = focusSelection.start;
  else focus = currentStartOrder === 0 ? focusSelection.end : focusSelection.start;
  const anchorVsFocus = comparePosition(anchor, focus);
  return {
    start: anchorVsFocus <= 0 ? anchor : focus,
    end: anchorVsFocus <= 0 ? focus : anchor,
    direction: anchorVsFocus === 0 ? 0 : anchorVsFocus < 0 ? 1 : -1
  };
}
function extendSelection(original, target) {
  const leftExtended = comparePosition(target.start, original.start) < 0;
  const rightExtended = comparePosition(target.end, original.end) > 0;
  if (leftExtended && !rightExtended) return {
    start: target.start,
    end: original.end,
    direction: -1
  };
  if (rightExtended && !leftExtended) return {
    start: original.start,
    end: target.end,
    direction: 1
  };
  if (original.direction === -1) return {
    start: target.start,
    end: original.end,
    direction: comparePosition(target.start, original.end) === 0 ? 0 : -1
  };
  return {
    start: original.start,
    end: target.end,
    direction: comparePosition(original.start, target.end) === 0 ? 0 : 1
  };
}
function extendSelections(selections, target) {
  return mergeOverlappingSelections(selections.map((selection) => {
    return extendSelection(selection, target);
  }));
}
function mergeOverlappingSelections(selections) {
  if (selections.length <= 1) return selections;
  const ordered = selections.map((selection, index) => ({
    index,
    selection
  })).sort((a, b) => {
    const startOrder = comparePosition(a.selection.start, b.selection.start);
    if (startOrder !== 0) return startOrder;
    const endOrder = comparePosition(a.selection.end, b.selection.end);
    return endOrder !== 0 ? endOrder : a.index - b.index;
  });
  const merged = [];
  let current = ordered[0];
  for (const entry of ordered.slice(1)) {
    if (selectionIntersects(current.selection, entry.selection)) {
      const latest = entry.index > current.index ? entry : current;
      const start = comparePosition(entry.selection.start, current.selection.start) < 0 ? entry.selection.start : current.selection.start;
      const end = comparePosition(entry.selection.end, current.selection.end) > 0 ? entry.selection.end : current.selection.end;
      let direction = latest.selection.direction;
      if (direction === 0 && comparePosition(start, end) !== 0) direction = comparePosition(latest.selection.start, start) === 0 ? -1 : 1;
      current = {
        index: latest.index,
        selection: {
          direction,
          end,
          start
        }
      };
      continue;
    }
    merged.push(current);
    current = entry;
  }
  merged.push(current);
  return merged.sort((a, b) => a.index - b.index).map(({ selection }) => selection);
}
function getSelectedLineBlocks(selections) {
  const blocks = selections.map((selection) => {
    let endLine = selection.end.line;
    if (selection.end.character === 0 && comparePosition(selection.start, selection.end) !== 0) endLine--;
    return {
      startLine: selection.start.line,
      endLine: Math.max(selection.start.line, endLine)
    };
  }).sort((a, b) => {
    const startOrder = a.startLine - b.startLine;
    return startOrder !== 0 ? startOrder : a.endLine - b.endLine;
  });
  const merged = [];
  for (const block of blocks) {
    const previous = merged.at(-1);
    if (previous !== void 0 && block.startLine <= previous.endLine + 1) previous.endLine = Math.max(previous.endLine, block.endLine);
    else merged.push({ ...block });
  }
  return merged;
}
function shiftSelectionLines(selection, direction, lineCount, getLineLength) {
  const shiftPosition = (position) => {
    const line = position.line + direction;
    if (line >= lineCount) {
      const lastLine = Math.max(0, lineCount - 1);
      return {
        line: lastLine,
        character: getLineLength(lastLine)
      };
    }
    if (line < 0) return {
      line: 0,
      character: 0
    };
    return {
      line,
      character: position.character
    };
  };
  return {
    start: shiftPosition(selection.start),
    end: shiftPosition(selection.end),
    direction: selection.direction
  };
}
function findNextMatch(textDocument, selections) {
  if (selections.length === 0) return;
  const normalizedSelections = selections.map((selection) => isCollapsedSelection(selection) ? expandCollapsedSelectionToWord(textDocument, selection) : selection);
  const texts = normalizedSelections.map((s) => textDocument.getText(s));
  const needle = texts[0];
  if (needle.length === 0 || texts.some((t) => t !== needle)) return;
  const occupied = normalizedSelections.map((s) => [textDocument.offsetAt(s.start), textDocument.offsetAt(s.end)]);
  const nextOffset = textDocument.findNextNonOverlappingSubstring(needle, occupied);
  if (nextOffset === void 0) return normalizedSelections.some((selection, index) => {
    const original = selections[index];
    return comparePosition(selection.start, original.start) !== 0 || comparePosition(selection.end, original.end) !== 0 || selection.direction !== original.direction;
  }) ? normalizedSelections : void 0;
  const added = createSelectionFromAnchorAndFocusOffsets(textDocument, nextOffset, nextOffset + needle.length);
  return [...normalizedSelections, added];
}
function getDocumentFullSelection(textDocument) {
  const lastLine = textDocument.lineCount - 1;
  return {
    start: {
      line: 0,
      character: 0
    },
    end: {
      line: lastLine,
      character: textDocument.getLineLength(lastLine)
    },
    direction: 1
  };
}
function getDocumentBoundarySelection(textDocument, atEnd, trimmedEndNewLine) {
  let line = 0;
  if (atEnd) {
    const lastLine = textDocument.lineCount - 1;
    line = trimmedEndNewLine === true && lastLine > 0 && textDocument.getLineLength(lastLine) === 0 ? lastLine - 1 : lastLine;
  }
  const character = atEnd ? textDocument.getLineLength(line) : 0;
  const start = {
    line,
    character
  };
  return {
    start,
    end: start,
    direction: 1
  };
}
function resolveClipboardRegion(textDocument, selection) {
  if (isCollapsedSelection(selection)) {
    const line = selection.start.line;
    return {
      start: textDocument.offsetAt({
        line,
        character: 0
      }),
      end: line < textDocument.lineCount - 1 ? textDocument.offsetAt({
        line: line + 1,
        character: 0
      }) : textDocument.offsetAt({
        line,
        character: textDocument.getLineLength(line)
      })
    };
  }
  const start = textDocument.offsetAt(selection.start);
  const end = textDocument.offsetAt(selection.end);
  return start <= end ? {
    start,
    end
  } : {
    start: end,
    end: start
  };
}
function resolveClipboardRegions(textDocument, selections) {
  return selections.map((selection) => resolveClipboardRegion(textDocument, selection)).sort((a, b) => {
    const startOrder = a.start - b.start;
    return startOrder !== 0 ? startOrder : a.end - b.end;
  });
}
function getSelectionClipboardTexts(textDocument, selections) {
  return resolveClipboardRegions(textDocument, selections).map(({ start, end }) => textDocument.getTextSlice(start, end));
}
function getSelectionText(textDocument, selections) {
  const regions = resolveClipboardRegions(textDocument, selections);
  const eol = textDocument.eol;
  let result = "";
  let prevEnd = -1;
  for (const region of regions) {
    if (region.end <= region.start) continue;
    if (region.start <= prevEnd) {
      if (region.end > prevEnd) {
        result += textDocument.getTextSlice(prevEnd, region.end);
        prevEnd = region.end;
      }
      continue;
    }
    if (result.length > 0 && !endsWithLineBreak(result)) result += eol;
    result += textDocument.getTextSlice(region.start, region.end);
    prevEnd = region.end;
  }
  return result;
}
function resolveSelectionCutEdit(textDocument, selection) {
  if (isCollapsedSelection(selection)) return resolveCollapsedSelectionCutEdit(textDocument, selection);
  const [start, end] = comparePosition(selection.start, selection.end) <= 0 ? [selection.start, selection.end] : [selection.end, selection.start];
  return {
    start: textDocument.offsetAt(start),
    end: textDocument.offsetAt(end),
    text: ""
  };
}
function resolveCollapsedSelectionCutEdit(textDocument, selection) {
  const line = selection.start.line;
  const lineStart = textDocument.offsetAt({
    line,
    character: 0
  });
  const lineEnd = textDocument.offsetAt({
    line,
    character: textDocument.getLineLength(line)
  });
  if (line < textDocument.lineCount - 1) return {
    start: lineStart,
    end: textDocument.offsetAt({
      line: line + 1,
      character: 0
    }),
    text: ""
  };
  if (line > 0) return {
    start: textDocument.offsetAt({
      line: line - 1,
      character: textDocument.getLineLength(line - 1)
    }),
    end: lineEnd,
    text: ""
  };
  return {
    start: lineStart,
    end: lineEnd,
    text: ""
  };
}
function mergeCutEdits(orderedCuts) {
  const edits = [];
  for (const { edit } of orderedCuts) {
    if (edit.start >= edit.end) continue;
    const last = edits.at(-1);
    if (last !== void 0 && edit.start <= last.end) edits[edits.length - 1] = {
      start: last.start,
      end: Math.max(last.end, edit.end),
      text: ""
    };
    else edits.push(edit);
  }
  return edits;
}
function mapCutSelectionOffsets(orderedCuts, edits) {
  const nextOffsets = Array.from({ length: orderedCuts.length });
  let editIndex = 0;
  let offsetDelta = 0;
  for (const cut of orderedCuts) {
    while (editIndex < edits.length && cut.edit.start > edits[editIndex].end) {
      const edit2 = edits[editIndex];
      offsetDelta -= edit2.end - edit2.start;
      editIndex++;
    }
    const edit = edits[editIndex];
    if (edit !== void 0 && cut.edit.start >= edit.start && cut.edit.start <= edit.end) nextOffsets[cut.index] = edit.start + offsetDelta;
    else nextOffsets[cut.index] = cut.edit.start + offsetDelta;
  }
  return nextOffsets;
}
function resolveSelectionCut(textDocument, selections) {
  const orderedCuts = [...selections.map((selection, index) => ({
    index,
    edit: resolveSelectionCutEdit(textDocument, selection)
  }))].sort((a, b) => {
    const startOrder = a.edit.start - b.edit.start;
    if (startOrder !== 0) return startOrder;
    const endOrder = a.edit.end - b.edit.end;
    if (endOrder !== 0) return endOrder;
    return a.index - b.index;
  });
  const edits = mergeCutEdits(orderedCuts);
  return {
    text: getSelectionText(textDocument, selections),
    edits,
    nextSelectionOffsets: mapCutSelectionOffsets(orderedCuts, edits)
  };
}
function getSelectionAnchor(lineElement, character) {
  const ch = Math.max(0, character);
  const tokens = collectTokens(lineElement);
  let last = null;
  for (const token of tokens) {
    last = token;
    const base = getCharacterIndex(token);
    if (ch <= base + (token.textContent?.length ?? 0)) {
      const anchor = textAt(token, ch < base ? 0 : ch - base);
      if (anchor !== null) return anchor;
    }
  }
  if (last !== null) {
    const anchor = textAt(last, last.textContent?.length ?? 0);
    if (anchor !== null) return anchor;
    return [last, 0];
  }
  let textOffset = 0;
  let lastTextNode = null;
  for (const child of lineElement.childNodes) {
    if (child.nodeType === 1 && child.tagName === "BR") return [child, 0];
    if (child.nodeType !== 3) continue;
    lastTextNode = child;
    const len = getTextOffset(lastTextNode.textContent, lastTextNode.textContent?.length ?? 0);
    if (ch <= textOffset + len) return [lastTextNode, getTextOffset(lastTextNode.textContent, ch - textOffset)];
    textOffset += len;
  }
  if (lastTextNode !== null) return [lastTextNode, getTextOffset(lastTextNode.textContent, lastTextNode.textContent?.length ?? 0)];
  return [lineElement, 0];
}
function expandCollapsedSelectionToWord(textDocument, selection) {
  const { line, character } = selection.start;
  const lineText = textDocument.getLineText(line);
  const span = expandCollapsedLineWord(lineText, Math.max(0, Math.min(character, lineText.length)));
  if (span === void 0) return selection;
  return {
    start: {
      line,
      character: span.start
    },
    end: {
      line,
      character: span.end
    },
    direction: 1
  };
}
function expandCollapsedLineWord(lineText, character) {
  const segmenter = createSegmenter({ granularity: "word" });
  if (segmenter !== void 0) {
    for (const seg of segmenter.segment(lineText)) {
      if (seg.isWordLike !== true) continue;
      const lo = seg.index;
      const hi = lo + seg.segment.length;
      if (character >= lo && character <= hi) return {
        start: lo,
        end: hi
      };
    }
    return;
  }
  const wordRe = /[\p{Alphabetic}\p{Number}_]+/gu;
  let match;
  while ((match = wordRe.exec(lineText)) !== null) {
    const lo = match.index;
    const hi = lo + match[0].length;
    if (character >= lo && character <= hi) return {
      start: lo,
      end: hi
    };
  }
}
function resolveDeleteWordBackwardRange(textDocument, selection) {
  if (!isCollapsedSelection(selection)) return [selection.start, selection.end];
  const caret = getCaretPosition(selection);
  const { line, character: head } = caret;
  if (head === 0) {
    if (line === 0) return [caret, caret];
    const prevLineLength = textDocument.getLineLength(line - 1);
    return [{
      line: line - 1,
      character: prevLineLength
    }, {
      line,
      character: 0
    }];
  }
  const lineText = textDocument.getLineText(line);
  const graphemeStarts = getLineGraphemeStarts(lineText);
  let pos = head;
  let match;
  while (pos > 0) {
    const prev = findClusterBreak(lineText, pos, false, graphemeStarts);
    const nextChar = lineText.slice(prev, pos);
    const nextMatch = !/\S/.test(nextChar) ? 0 : new RegExp("\\p{Alphabetic}|\\p{Number}|_", "u").test(nextChar) ? 1 : 2;
    if (match !== void 0 && nextMatch !== match) break;
    if (nextMatch !== 0 || pos !== head) match = nextMatch;
    pos = prev;
  }
  return [{
    line,
    character: pos
  }, {
    line,
    character: head
  }];
}
function findClusterBreak(text, pos, forward, graphemeStarts) {
  if (forward) {
    for (const start of graphemeStarts) if (start > pos) return start;
    return text.length;
  }
  for (let i = graphemeStarts.length - 1; i >= 0; i--) {
    const start = graphemeStarts[i];
    if (start < pos) return start;
  }
  return 0;
}
function getLineGraphemeStarts(lineText) {
  const graphemeStarts = [0];
  const segmenter = getGraphemeSegmenter();
  if (segmenter !== void 0) {
    for (const segment of segmenter.segment(lineText)) if (segment.index > 0) graphemeStarts.push(segment.index);
    return graphemeStarts;
  }
  let index = 0;
  for (const codePoint of lineText) {
    if (index > 0) graphemeStarts.push(index);
    index += codePoint.length;
  }
  return graphemeStarts;
}
function stepCharacterByGrapheme(textDocument, line, character, forward) {
  const lineLength = textDocument.getLineLength(line);
  if (forward) {
    if (character >= lineLength) return lineLength;
    const lineStart2 = textDocument.offsetAt({
      line,
      character: 0
    });
    const suffix = textDocument.getTextSlice(lineStart2 + character, lineStart2 + lineLength);
    const segmenter2 = getGraphemeSegmenter();
    if (segmenter2 !== void 0) {
      for (const segment of segmenter2.segment(suffix)) return character + segment.segment.length;
      return lineLength;
    }
    for (const codePoint of suffix) return character + codePoint.length;
    return lineLength;
  }
  if (character <= 0) return 0;
  const lineStart = textDocument.offsetAt({
    line,
    character: 0
  });
  const prefix = textDocument.getTextSlice(lineStart, lineStart + character);
  let prevStart = 0;
  const segmenter = getGraphemeSegmenter();
  if (segmenter !== void 0) {
    for (const segment of segmenter.segment(prefix)) prevStart = segment.index;
    return prevStart;
  }
  let index = 0;
  for (const codePoint of prefix) {
    prevStart = index;
    index += codePoint.length;
  }
  return prevStart;
}
function getSelectionAnchorAndFocusOffsets(textDocument, selection) {
  const isBackward = selection.direction === -1;
  return [textDocument.offsetAt(isBackward ? selection.end : selection.start), textDocument.offsetAt(getCaretPosition(selection))];
}
function resolveDeleteHardLineForwardRange(textDocument, selection) {
  if (!isCollapsedSelection(selection)) return {
    start: selection.start,
    end: selection.end
  };
  const { line, character } = selection.start;
  const lineLength = textDocument.getLineText(line).length;
  if (character < lineLength) return {
    start: {
      line,
      character
    },
    end: {
      line,
      character: lineLength
    }
  };
  if (line < textDocument.lineCount - 1) return {
    start: {
      line,
      character
    },
    end: {
      line: line + 1,
      character: 0
    }
  };
  return {
    start: {
      line,
      character
    },
    end: {
      line,
      character
    }
  };
}
function expandSingleNewlineInsert(textDocument, insertText, insertStartOffset) {
  if (insertText !== "\n" && insertText !== "\r" && insertText !== "\r\n") return insertText;
  const line = textDocument.positionAt(insertStartOffset).line;
  const lineText = textDocument.getLineText(line);
  const indentLen = getLeadingSpaces(lineText);
  if (indentLen === 0) return insertText;
  return insertText + lineText.slice(0, indentLen);
}
function getLeadingSpaces(text) {
  let indent = 0;
  for (; indent < text.length; indent++) {
    const c = text.charCodeAt(indent);
    if (c !== 32 && c !== 9) break;
  }
  return indent;
}
function createSelectionsFromOffsetPairs(textDocument, offsetPairs) {
  const normalizedOffsets = [];
  for (const [anchorOffset, focusOffset] of offsetPairs) normalizedOffsets.push(Math.min(anchorOffset, focusOffset), Math.max(anchorOffset, focusOffset));
  const positions = textDocument.positionsAt(normalizedOffsets);
  return offsetPairs.map(([anchorOffset, focusOffset], index) => {
    const direction = anchorOffset === focusOffset ? 0 : anchorOffset < focusOffset ? 1 : -1;
    return {
      start: positions[index * 2],
      end: positions[index * 2 + 1],
      direction
    };
  });
}
function normalizeLeadingIndentForChange(textDocument, change, tabSize) {
  if (change.text !== "" || change.start !== change.end - 1) return change;
  const caretPosition = textDocument.positionAt(change.end);
  if (caretPosition.character === 0) return change;
  const lineText = textDocument.getLineText(caretPosition.line);
  const leadingText = lineText.slice(0, caretPosition.character);
  if (/[^ \t]/.test(leadingText)) return change;
  if (lineText[caretPosition.character - 1] === "	") return change;
  const softTabStart = Math.max(0, caretPosition.character - tabSize);
  const softTabText = lineText.slice(softTabStart, caretPosition.character);
  if (softTabText.length === tabSize && /^ +$/.test(softTabText)) return {
    ...change,
    start: change.end - softTabText.length
  };
  return change;
}
function boundaryToPosition(node, offset) {
  let lineEl = node.nodeType === 1 ? node : node.parentElement;
  while (lineEl !== null && getLineIndex(lineEl) === void 0) lineEl = lineEl.parentElement;
  if (lineEl === null) return null;
  const line = getLineIndex(lineEl);
  if (line === void 0) return null;
  if (node.nodeType === 3) {
    if (node.parentElement === null) return null;
    if (findTokenSpan(node.parentElement) !== null) return {
      line,
      character: getLineChildEnd(node, offset)
    };
    return {
      line,
      character: offsetBefore(lineEl, node) + getTextOffset(node.textContent, offset)
    };
  }
  if (node.nodeType === 1) {
    const el = node;
    if (el.tagName === "DIV") {
      let character = 0;
      for (let i = 0; i < offset; i++) character = getLineChildEnd(el.childNodes[i]);
      return {
        line,
        character
      };
    }
    if (el.tagName === "BR") return {
      line,
      character: 0
    };
    if (el.tagName === "SPAN") {
      if (offset < el.childNodes.length) {
        const next = el.childNodes[offset];
        if (next?.nodeType === 1) {
          const nextBase = getCharacterIndex(next);
          if (nextBase !== void 0) return {
            line,
            character: nextBase
          };
          const token = findTokenSpan(next);
          const tokenBase = token === null ? void 0 : getCharacterIndex(token);
          if (tokenBase !== void 0) return {
            line,
            character: tokenBase
          };
        }
      }
      return {
        line,
        character: offset > 0 ? getLineChildEnd(el.childNodes[offset - 1]) : offsetBefore(lineEl, el)
      };
    }
    return {
      line,
      character: offsetBefore(lineEl, el)
    };
  }
  return null;
}
function collectTokens(line) {
  const tokens = [];
  for (const child of line.childNodes) {
    if (child.nodeType !== 1) continue;
    const el = child;
    if (el.tagName !== "SPAN") continue;
    if (getCharacterIndex(el) !== void 0) {
      tokens.push(el);
      continue;
    }
    for (const nested of el.childNodes) if (nested.nodeType === 1 && getCharacterIndex(nested) !== void 0) tokens.push(nested);
  }
  return tokens;
}
function textAt(token, offset) {
  let remaining = Math.max(0, offset);
  const stack = [{
    container: token,
    index: 0
  }];
  while (stack.length > 0) {
    const frame = stack[stack.length - 1];
    if (frame.index >= frame.container.childNodes.length) {
      stack.pop();
      continue;
    }
    const walkNode = frame.container.childNodes[frame.index];
    frame.index++;
    if (walkNode.nodeType === 3) {
      const len = getTextOffset(walkNode.textContent, walkNode.textContent?.length ?? 0);
      if (remaining <= len) return [walkNode, remaining];
      remaining -= len;
    } else if (walkNode.nodeType === 1) stack.push({
      container: walkNode,
      index: 0
    });
  }
  return null;
}
function textLengthBefore(root, target) {
  let before = 0;
  const stack = [{
    container: root,
    index: 0
  }];
  while (stack.length > 0) {
    const frame = stack[stack.length - 1];
    if (frame.index >= frame.container.childNodes.length) {
      stack.pop();
      continue;
    }
    const walkNode = frame.container.childNodes[frame.index];
    if (walkNode === target) return before;
    frame.index++;
    if (walkNode.nodeType === 3) before += getTextOffset(walkNode.textContent, walkNode.textContent?.length ?? 0);
    else if (walkNode.nodeType === 1) stack.push({
      container: walkNode,
      index: 0
    });
  }
  return before;
}
function isInside(token, node) {
  let current = node;
  while (current !== null) {
    if (current === token) return true;
    current = current.parentElement;
  }
  return false;
}
function offsetBefore(line, node) {
  if (node.parentElement === line) {
    let offset2 = 0;
    const index = Array.prototype.indexOf.call(line.childNodes, node);
    for (let i = 0; i < index; i++) offset2 = getLineChildEnd(line.childNodes[i]);
    return offset2;
  }
  for (const token of collectTokens(line)) if (isInside(token, node)) return getCharacterIndex(token) + (node.nodeType === 3 ? textLengthBefore(token, node) : 0);
  let offset = 0;
  let target = node.nodeType === 1 ? node : node.parentElement;
  while (target !== null && target.parentElement !== null) {
    if (getLineIndex(target.parentElement) !== void 0) break;
    const parent = target.parentElement;
    const index = Array.prototype.indexOf.call(parent.childNodes, target);
    for (let i = 0; i < index; i++) offset = getLineChildEnd(parent.childNodes[i]);
    target = parent;
  }
  return offset;
}
function findTokenSpan(el) {
  let current = el;
  while (current !== null) {
    if (getLineIndex(current) !== void 0) return null;
    if (getCharacterIndex(current) !== void 0) return current;
    current = current.parentElement;
  }
  return null;
}
function getLineChildEnd(child, textOffsetInChild) {
  if (child === void 0) return 0;
  if (child.nodeType === 3) {
    const parent = child.parentElement;
    if (parent === null) return 0;
    const token = findTokenSpan(parent);
    if (token === null) return 0;
    const base2 = getCharacterIndex(token);
    if (base2 === void 0) return 0;
    const length = textOffsetInChild === void 0 ? getTextOffset(child.textContent, child.textContent?.length ?? 0) : getTextOffset(child.textContent, textOffsetInChild);
    return base2 + textLengthBefore(token, child) + length;
  }
  if (child.nodeType !== 1) return 0;
  const el = child;
  if (el.tagName !== "SPAN" && el.tagName !== "BR") return 0;
  const base = getCharacterIndex(el);
  if (base !== void 0) return base + (el.textContent?.length ?? 0);
  let end = 0;
  for (const token of el.childNodes) end = Math.max(end, getLineChildEnd(token));
  return end;
}
function getLineIndex(el) {
  const { line, lineType } = el.dataset;
  if (line !== void 0 && lineType !== "change-deletion") {
    const lineNumber = parseInt(line, 10);
    if (!Number.isNaN(lineNumber)) return lineNumber - 1;
  }
}
function getCharacterIndex(el) {
  const { char } = el.dataset;
  if (char !== void 0) {
    const charIndex = parseInt(char, 10);
    if (!Number.isNaN(charIndex)) return charIndex;
  }
}
function getTextOffset(text, offset) {
  const value = text ?? "";
  const lineBreakIndex = value.search(/[\r\n]/);
  return Math.min(offset, lineBreakIndex === -1 ? value.length : lineBreakIndex);
}
const MARKER_POPOVER_SHOW_DELAY_MS = 300;
const MARKER_POPOVER_HIDE_DELAY_MS = 100;
const MARKER_POPOVER_PLACEMENT_KEY = "marker-popover";
var MarkerRenderer = class {
  #options;
  #markers = [];
  #lineCount = 0;
  #markerPopoverElement;
  #markerPopoverEventDisposes;
  #markerEventDisposes;
  #markerPopoverShowTimeout;
  #markerPopoverHideTimeout;
  #pendingMarkerPopoverIndex;
  #hoveredMarkerIndex;
  #isMarkerPopoverHovered = false;
  constructor(editor) {
    this.#options = editor;
  }
  get markers() {
    return this.#markers;
  }
  isPopoverVisible() {
    return this.#hoveredMarkerIndex !== void 0;
  }
  updatePopoverPosition() {
    const hoveredMarkerIndex = this.#hoveredMarkerIndex;
    const popover = this.#markerPopoverElement;
    if (hoveredMarkerIndex === void 0 || popover === void 0) return;
    const marker = this.#markers[hoveredMarkerIndex];
    if (marker === void 0) {
      this.removePopover();
      return;
    }
    this.#positionMarkerPopover(popover, marker.start.line, marker.start.character);
  }
  setMarkers(markers, textDocument) {
    this.#lineCount = textDocument.lineCount;
    this.#markers = markers.map((marker) => ({
      ...marker,
      start: textDocument.normalizePosition(marker.start),
      end: textDocument.normalizePosition(marker.end)
    }));
    this.removePopover();
  }
  listenHover(contentEl) {
    this.#markerEventDisposes?.forEach((dispose) => dispose());
    this.#markerEventDisposes = void 0;
    if (this.#markers.length === 0) return;
    this.#markerEventDisposes = [addEventListener(contentEl, "mouseover", (e) => {
      if (this.#options.isMouseDown()) return;
      const target = e.composedPath()[0];
      if (target === void 0) return;
      const hoverMarkerIndex = this.#findHoveredMarkerIndex(target);
      if (hoverMarkerIndex !== void 0) this.#scheduleMarkerPopover(hoverMarkerIndex);
      else {
        this.#cancelMarkerPopoverShow();
        this.#scheduleMarkerPopoverHide();
      }
    }), addEventListener(contentEl, "mouseleave", () => {
      this.#cancelMarkerPopoverShow();
      this.#scheduleMarkerPopoverHide();
    })];
  }
  removePopover() {
    this.#cancelMarkerPopoverShow();
    this.#cancelMarkerPopoverHide();
    this.#dismissMarkerPopover();
  }
  cleanup() {
    this.#markerEventDisposes?.forEach((dispose) => dispose());
    this.#markerEventDisposes = void 0;
    this.removePopover();
    this.#markers = [];
  }
  #findHoveredMarkerIndex(target) {
    const lineElement = target.closest("[data-line]");
    if (lineElement == null) return;
    const lineNumber = getLineNumberAttr(lineElement);
    if (lineNumber === void 0) return;
    let character;
    if (target.tagName === "SPAN") {
      const char = target.dataset.char;
      if (char === void 0) return;
      character = parseInt(char, 10);
      if (Number.isNaN(character)) return;
    } else if (target.tagName === "BR") character = 0;
    else return;
    const position = {
      line: lineNumber - 1,
      character
    };
    for (let i = this.#markers.length - 1; i >= 0; i--) if (selectionIntersects({
      start: position,
      end: position
    }, this.#markers[i])) return i;
  }
  #cancelMarkerPopoverShow() {
    if (this.#markerPopoverShowTimeout !== void 0) {
      clearTimeout(this.#markerPopoverShowTimeout);
      this.#markerPopoverShowTimeout = void 0;
    }
    this.#pendingMarkerPopoverIndex = void 0;
  }
  #cancelMarkerPopoverHide() {
    if (this.#markerPopoverHideTimeout !== void 0) {
      clearTimeout(this.#markerPopoverHideTimeout);
      this.#markerPopoverHideTimeout = void 0;
    }
  }
  #scheduleMarkerPopover(markerIndex) {
    if (markerIndex === this.#hoveredMarkerIndex || markerIndex === this.#pendingMarkerPopoverIndex) {
      this.#cancelMarkerPopoverHide();
      return;
    }
    this.#cancelMarkerPopoverShow();
    this.#cancelMarkerPopoverHide();
    if (this.#markerPopoverElement !== void 0) {
      this.#renderMarkerPopover(markerIndex);
      return;
    }
    this.#pendingMarkerPopoverIndex = markerIndex;
    this.#markerPopoverShowTimeout = setTimeout(() => {
      this.#markerPopoverShowTimeout = void 0;
      this.#pendingMarkerPopoverIndex = void 0;
      this.#renderMarkerPopover(markerIndex);
    }, MARKER_POPOVER_SHOW_DELAY_MS);
  }
  #scheduleMarkerPopoverHide() {
    if (this.#isMarkerPopoverHovered) return;
    this.#cancelMarkerPopoverHide();
    this.#markerPopoverHideTimeout = setTimeout(() => {
      this.#markerPopoverHideTimeout = void 0;
      if (!this.#isMarkerPopoverHovered) this.removePopover();
    }, MARKER_POPOVER_HIDE_DELAY_MS);
  }
  #setMarkerPopoverPosition(popover, x, y, placeAbove, viewport = this.#options.popoverManager.getPlacementBounds()) {
    setPopoverPositionStyles(popover, {
      gutterWidth: this.#options.getGutterWidth(),
      placeAbove,
      viewport,
      x,
      y
    });
  }
  #positionMarkerPopover(popover, line, character) {
    const { getCharX, getLineY, getLineHeight, popoverManager } = this.#options;
    const [left, wrapLine] = getCharX(line, character);
    const lineHeight = getLineHeight();
    const rowTop = getLineY(line) + wrapLine * lineHeight;
    const popoverHeight = popover.offsetHeight;
    const preferred = {
      top: rowTop + lineHeight,
      bottom: rowTop + lineHeight + popoverHeight
    };
    const fallback = {
      top: rowTop - popoverHeight,
      bottom: rowTop
    };
    const atDocumentEdge = line >= this.#lineCount - 3;
    const viewport = popoverManager.getPlacementBounds();
    const placeAbove = popoverManager.choosePlacement({
      preferred,
      fallback,
      viewport,
      popoverHeight,
      atDocumentEdge,
      placementKey: MARKER_POPOVER_PLACEMENT_KEY
    }) === "fallback";
    this.#setMarkerPopoverPosition(popover, left, placeAbove ? rowTop : rowTop + lineHeight, placeAbove, viewport);
  }
  #dismissMarkerPopover() {
    this.#markerPopoverEventDisposes?.forEach((dispose) => dispose());
    this.#markerPopoverEventDisposes = void 0;
    this.#markerPopoverElement?.remove();
    this.#markerPopoverElement = void 0;
    this.#hoveredMarkerIndex = void 0;
    this.#isMarkerPopoverHovered = false;
    this.#options.popoverManager.resetPlacement(MARKER_POPOVER_PLACEMENT_KEY);
  }
  #renderMarkerPopover(hoveredMarkerIndex) {
    if (hoveredMarkerIndex === this.#hoveredMarkerIndex) return;
    const overlayElement = this.#options.getOverlayElement();
    if (hoveredMarkerIndex >= this.#markers.length || overlayElement == null) return;
    const { start, message, severity } = this.#markers[hoveredMarkerIndex];
    const { line, character } = start;
    const popover = this.#markerPopoverElement;
    this.#options.popoverManager.resetPlacement(MARKER_POPOVER_PLACEMENT_KEY);
    if (popover !== void 0) {
      setMarkerPopoverSeverity(popover, severity);
      const content = popover.firstElementChild;
      if (content?.dataset.markerMessage !== void 0) if (typeof message === "string") content.textContent = message;
      else if (message instanceof HTMLElement) content.replaceChildren(message);
      else content.innerHTML = message.html;
      this.#positionMarkerPopover(popover, line, character);
      this.#hoveredMarkerIndex = hoveredMarkerIndex;
      return;
    }
    this.#markerPopoverElement = h("div", {
      dataset: {
        editorWidget: "",
        markerPopover: "",
        [markerSeverityDatasetKey(severity)]: ""
      },
      children: [h("div", {
        dataset: "markerMessage",
        ...typeof message === "string" ? { textContent: message } : message instanceof HTMLElement ? { children: [message] } : { innerHTML: message.html }
      })]
    }, overlayElement);
    this.#positionMarkerPopover(this.#markerPopoverElement, line, character);
    this.#hoveredMarkerIndex = hoveredMarkerIndex;
    this.#markerPopoverEventDisposes = [addEventListener(this.#markerPopoverElement, "mouseenter", () => {
      this.#isMarkerPopoverHovered = true;
      this.#cancelMarkerPopoverHide();
    }), addEventListener(this.#markerPopoverElement, "mouseleave", () => {
      this.#isMarkerPopoverHovered = false;
      this.#scheduleMarkerPopoverHide();
    })];
  }
};
const MARKER_SEVERITIES = [
  "error",
  "warning",
  "info",
  "hint"
];
function setMarkerPopoverSeverity(popover, severity) {
  for (const candidate of MARKER_SEVERITIES) delete popover.dataset[markerSeverityDatasetKey(candidate)];
  popover.dataset[markerSeverityDatasetKey(severity)] = "";
}
function markerSeverityDatasetKey(severity) {
  switch (severity) {
    case "error":
      return "markerError";
    case "warning":
      return "markerWarning";
    case "info":
      return "markerInfo";
    case "hint":
      return "markerHint";
  }
}
const OPEN_BRACKETS = /* @__PURE__ */ new Map([
  ["(", ")"],
  ["[", "]"],
  ["{", "}"]
]);
const CLOSE_BRACKETS = new Map([...OPEN_BRACKETS].map(([open, close]) => [close, open]));
const MAX_BRACKET_SCAN_LINES = 1e3;
const MAX_BRACKET_SCAN_CHARACTERS = 5e4;
function findBracketMatchRanges(textDocument, tokenizer, position) {
  const bracketPosition = findAdjacentBracket(textDocument, tokenizer, textDocument.normalizePosition(position));
  if (bracketPosition === void 0) return;
  const closingBracket = OPEN_BRACKETS.get(bracketPosition.char);
  const openingBracket = CLOSE_BRACKETS.get(bracketPosition.char);
  if (closingBracket !== void 0) return createBracketMatchRanges(bracketPosition, findClosingBracket(textDocument, tokenizer, bracketPosition, closingBracket));
  if (openingBracket !== void 0) return createBracketMatchRanges(findOpeningBracket(textDocument, tokenizer, bracketPosition, openingBracket), bracketPosition);
}
function findAdjacentBracket(textDocument, tokenizer, position) {
  const previousPosition = getPreviousCharacterPosition(position);
  if (previousPosition !== void 0) {
    const previousBracket = getBracketAtPosition(textDocument, tokenizer, previousPosition);
    if (previousBracket !== void 0) return previousBracket;
  }
  return getBracketAtPosition(textDocument, tokenizer, position);
}
function getPreviousCharacterPosition(position) {
  if (position.character > 0) return {
    line: position.line,
    character: position.character - 1
  };
}
function getBracketAtPosition(textDocument, tokenizer, position) {
  const char = textDocument.getLineText(position.line)[position.character];
  if (char === void 0 || !OPEN_BRACKETS.has(char) && !CLOSE_BRACKETS.has(char) || isInIgnoredTokenRange(tokenizer, position)) return;
  return {
    ...position,
    char
  };
}
function findClosingBracket(textDocument, tokenizer, bracketPosition, closingBracket) {
  let depth = 0;
  let scannedLines = 0;
  let scannedCharacters = 0;
  for (let line = bracketPosition.line; line < textDocument.lineCount; line++) {
    if (scannedLines >= MAX_BRACKET_SCAN_LINES) return;
    scannedLines++;
    const lineText = textDocument.getLineText(line);
    const ignoredRanges = tokenizer.getStringCommentRegexpRangesInLine(line);
    const ignoredRangeCursor = { index: 0 };
    const startCharacter = line === bracketPosition.line ? bracketPosition.character : 0;
    for (let character = startCharacter; character < lineText.length; character++) {
      if (scannedCharacters >= MAX_BRACKET_SCAN_CHARACTERS) return;
      scannedCharacters++;
      if (isCharacterIgnoredForward(ignoredRanges, character, ignoredRangeCursor)) continue;
      const char = lineText[character];
      if (char === bracketPosition.char) depth++;
      else if (char === closingBracket) {
        depth--;
        if (depth === 0) return {
          line,
          character,
          char
        };
      }
    }
  }
}
function findOpeningBracket(textDocument, tokenizer, bracketPosition, openingBracket) {
  let depth = 0;
  let scannedLines = 0;
  let scannedCharacters = 0;
  for (let line = bracketPosition.line; line >= 0; line--) {
    if (scannedLines >= MAX_BRACKET_SCAN_LINES) return;
    scannedLines++;
    const lineText = textDocument.getLineText(line);
    const ignoredRanges = tokenizer.getStringCommentRegexpRangesInLine(line);
    const ignoredRangeCursor = { index: ignoredRanges === null ? -1 : ignoredRanges.length - 1 };
    const startCharacter = line === bracketPosition.line ? bracketPosition.character : lineText.length - 1;
    for (let character = startCharacter; character >= 0; character--) {
      if (scannedCharacters >= MAX_BRACKET_SCAN_CHARACTERS) return;
      scannedCharacters++;
      if (isCharacterIgnoredBackward(ignoredRanges, character, ignoredRangeCursor)) continue;
      const char = lineText[character];
      if (char === bracketPosition.char) depth++;
      else if (char === openingBracket) {
        depth--;
        if (depth === 0) return {
          line,
          character,
          char
        };
      }
    }
  }
}
function isInIgnoredTokenRange(tokenizer, position) {
  return isCharacterInIgnoredRanges(tokenizer.getStringCommentRegexpRangesInLine(position.line), position.character);
}
function isCharacterInIgnoredRanges(ranges, character) {
  if (ranges === null) return false;
  for (const [start, end] of ranges) {
    if (character < start) return false;
    if (character < end) return true;
  }
  return false;
}
function isCharacterIgnoredForward(ranges, character, cursor) {
  if (ranges === null) return false;
  while (cursor.index < ranges.length && character >= ranges[cursor.index][1]) cursor.index++;
  const range = ranges[cursor.index];
  return range !== void 0 && character >= range[0];
}
function isCharacterIgnoredBackward(ranges, character, cursor) {
  if (ranges === null) return false;
  while (cursor.index >= 0 && character < ranges[cursor.index][0]) cursor.index--;
  const range = ranges[cursor.index];
  return range !== void 0 && character < range[1];
}
function createBracketMatchRanges(firstPosition, secondPosition) {
  if (firstPosition === void 0 || secondPosition === void 0) return;
  return [createCharacterRange(firstPosition), createCharacterRange(secondPosition)];
}
function createCharacterRange(position) {
  return {
    start: {
      line: position.line,
      character: position.character
    },
    end: {
      line: position.line,
      character: position.character + 1
    }
  };
}
const SVGSpriteSheet = `<svg data-icon-sprite aria-hidden="true" width="0" height="0">
  <symbol id="diffs-editor-icon-close" viewBox="0 0 16 16">
    <path fill="currentColor" d="M3.21967 3.21967C3.51256 2.92678 3.98744 2.92678 4.28033 3.21967L8 6.93934L11.7197 3.21967C12.0126 2.92678 12.4874 2.92678 12.7803 3.21967C13.0732 3.51256 13.0732 3.98744 12.7803 4.28033L9.06066 8L12.7803 11.7197C13.0732 12.0126 13.0732 12.4874 12.7803 12.7803C12.4874 13.0732 12.0126 13.0732 11.7197 12.7803L8 9.06066L4.28033 12.7803C3.98744 13.0732 3.51256 13.0732 3.21967 12.7803C2.92678 12.4874 2.92678 12.0126 3.21967 11.7197L6.93934 8L3.21967 4.28033C2.92678 3.98744 2.92678 3.51256 3.21967 3.21967Z"></path>
  </symbol>
  <symbol id="diffs-editor-icon-arrow-up" viewBox="0 0 16 16">
    <path fill="currentColor" transform="rotate(-90 8 8)" d="M8.46967 2.21967C8.17678 2.51256 8.17678 2.98744 8.46967 3.28033L12.4393 7.25H1.75C1.33579 7.25 1 7.58579 1 8C1 8.41421 1.33579 8.75 1.75 8.75H12.4393L8.46967 12.7197C8.17678 13.0126 8.17678 13.4874 8.46967 13.7803C8.76256 14.0732 9.23744 14.0732 9.53033 13.7803L14.7803 8.53033C15.0732 8.23744 15.0732 7.76256 14.7803 7.46967L9.53033 2.21967C9.23744 1.92678 8.76256 1.92678 8.46967 2.21967Z"></path>
  </symbol>
  <symbol id="diffs-editor-icon-arrow-down" viewBox="0 0 16 16">
    <path fill="currentColor" transform="rotate(90 8 8)" d="M8.46967 2.21967C8.17678 2.51256 8.17678 2.98744 8.46967 3.28033L12.4393 7.25H1.75C1.33579 7.25 1 7.58579 1 8C1 8.41421 1.33579 8.75 1.75 8.75H12.4393L8.46967 12.7197C8.17678 13.0126 8.17678 13.4874 8.46967 13.7803C8.76256 14.0732 9.23744 14.0732 9.53033 13.7803L14.7803 8.53033C15.0732 8.23744 15.0732 7.76256 14.7803 7.46967L9.53033 2.21967C9.23744 1.92678 8.76256 1.92678 8.46967 2.21967Z"></path>
  </symbol>
  <symbol id="diffs-editor-icon-case" viewBox="0 0 16 16">
    <path fill="currentColor" d="M12.2969 12.9969C10.7109 12.9969 9.61719 12.0125 9.61719 10.5047C9.61719 9.06719 10.6172 8.16094 12.5 8.15312H14.6641V7.31719C14.6641 6.23906 14.0391 5.64531 12.9297 5.64531C11.875 5.64531 11.2734 6.18437 11.1953 7.00469H9.92969C10.0156 5.56719 10.9922 4.52031 12.9766 4.52031C14.7266 4.52031 16 5.47344 16 7.2V12.8641H14.7109V11.8406H14.6719C14.2578 12.5047 13.5078 12.9969 12.2969 12.9969ZM12.6562 11.8797C13.8047 11.8797 14.6641 11.1609 14.6641 10.1375V9.18437H12.6016C11.4766 9.18437 10.9922 9.71562 10.9922 10.4578C10.9922 11.4266 11.7969 11.8797 12.6562 11.8797Z"></path>
    <path fill="currentColor" d="M1.42188 12.8641H0L3.79688 2H5.1875L8.98438 12.8641H7.54688L6.46875 9.66094H2.5L1.42188 12.8641ZM4.50781 3.60938H4.46875L2.86719 8.55937H6.10156L4.50781 3.60938Z"></path>
  </symbol>
  <symbol id="diffs-editor-icon-whole-word" viewBox="0 0 16 16">
    <path fill="currentColor" d="M11.4089 9.99449C11.1417 9.99449 10.8961 9.95595 10.6722 9.87887C10.4519 9.80179 10.2605 9.69167 10.098 9.54852C9.93551 9.40537 9.81453 9.23469 9.73508 9.03648H9.67007V9.91191H8.5V2H9.70258V5.01721H9.76758C9.81092 4.86671 9.88314 4.7309 9.98426 4.60977C10.089 4.48497 10.2136 4.37853 10.358 4.29043C10.5025 4.19867 10.6668 4.13076 10.851 4.08672C11.0352 4.039 11.2302 4.01514 11.436 4.01514C11.8802 4.01514 12.2648 4.11792 12.5898 4.32347C12.9149 4.52535 13.164 4.81532 13.3374 5.19339C13.5107 5.57146 13.5974 6.02478 13.5974 6.55334V7.45079C13.5974 7.97568 13.5089 8.429 13.332 8.81074C13.1586 9.1888 12.9076 9.48061 12.579 9.68617C12.2504 9.89172 11.8604 9.99449 11.4089 9.99449ZM11.0785 8.99243C11.353 8.99243 11.5859 8.92636 11.7773 8.79422C11.9723 8.66208 12.1204 8.46937 12.2215 8.2161C12.3226 7.95916 12.3732 7.65267 12.3732 7.29663V6.73503C12.3732 6.37164 12.3208 6.06332 12.2161 5.81005C12.115 5.55311 11.9669 5.35673 11.7719 5.22092C11.5769 5.08511 11.3385 5.01721 11.0568 5.01721C10.7824 5.01721 10.5422 5.08328 10.3364 5.21542C10.1341 5.34389 9.97704 5.52925 9.86509 5.77151C9.75675 6.01009 9.70258 6.2964 9.70258 6.63042V7.47281C9.70258 7.77013 9.76036 8.03441 9.87592 8.26566C9.99509 8.49323 10.1576 8.67125 10.3635 8.79972C10.5729 8.92819 10.8113 8.99243 11.0785 8.99243Z"></path>
    <path fill="currentColor" d="M4.70482 9.99449C4.15229 9.99449 3.70087 9.83482 3.35057 9.51548C3.00388 9.19247 2.83054 8.75935 2.83054 8.2161C2.83054 7.70223 3.00207 7.28745 3.34515 6.97178C3.69184 6.65244 4.19562 6.49277 4.8565 6.49277H6.30284V5.94769C6.30284 5.61367 6.20533 5.36774 6.01032 5.20991C5.81531 5.04841 5.55349 4.96765 5.22485 4.96765C5.00817 4.96765 4.82941 4.99702 4.68857 5.05575C4.54773 5.11081 4.43758 5.18789 4.35813 5.28699C4.27868 5.38243 4.22271 5.49621 4.19021 5.62835H3.04722C3.06527 5.3861 3.12305 5.16586 3.22056 4.96765C3.32168 4.76577 3.46252 4.59326 3.64309 4.4501C3.82727 4.30328 4.05297 4.19133 4.32021 4.11425C4.59106 4.03716 4.90525 3.99862 5.26277 3.99862C5.67086 3.99862 6.04463 4.06286 6.38409 4.19133C6.72356 4.31613 6.99441 4.52168 7.19665 4.80798C7.39888 5.09429 7.5 5.4797 7.5 5.96421V9.9064H6.35701V9.1521H6.30284C6.21978 9.29892 6.10783 9.43657 5.96698 9.56504C5.82614 9.69351 5.65099 9.79812 5.44153 9.87887C5.23569 9.95595 4.99012 9.99449 4.70482 9.99449ZM5.07318 9.04749C5.3043 9.04749 5.51196 8.99977 5.69613 8.90434C5.88031 8.80523 6.02657 8.67309 6.13491 8.50791C6.24686 8.34274 6.30284 8.1537 6.30284 7.94081V7.31314H5.04609C4.69579 7.31314 4.43939 7.39206 4.27688 7.5499C4.11798 7.70773 4.03853 7.90961 4.03853 8.15554C4.03853 8.4602 4.14326 8.68594 4.35272 8.83276C4.56578 8.97591 4.80594 9.04749 5.07318 9.04749Z"></path>
    <path fill="currentColor" d="M2.5 12.5L13.5 12.5C14.3284 12.5 15 11.8284 15 11V9.5C15 9.22386 15.2239 9 15.5 9C15.7761 9 16 9.22386 16 9.5V11C16 12.3807 14.8807 13.5 13.5 13.5L2.5 13.5C1.11929 13.5 -7.56324e-07 12.3807 0 11L6.55675e-08 9.5C3.58362e-07 9.22386 0.223858 9 0.5 9C0.776142 9 1 9.22386 1 9.5L1 11C0.999999 11.8284 1.67157 12.5 2.5 12.5Z"></path>
  </symbol>
  <symbol id="diffs-editor-icon-regex" viewBox="0 0 16 16">
    <path fill="currentColor" d="M8.60788 6.59074C8.78227 6.46701 9.02141 6.60508 9.00146 6.81797L8.77564 9.22666C8.76189 9.37331 8.87726 9.5 9.02455 9.5H9.97548C10.1228 9.5 10.2381 9.37331 10.2244 9.22667L9.99858 6.81801C9.97862 6.60513 10.2178 6.46706 10.3922 6.59079L12.3652 7.99066C12.4853 8.07589 12.6527 8.03932 12.7264 7.91177L13.2018 7.08823C13.2755 6.96068 13.2234 6.79742 13.0896 6.73601L10.8907 5.72723C10.6963 5.63807 10.6963 5.36193 10.8907 5.27277L13.0896 4.264C13.2234 4.20258 13.2755 4.03932 13.2018 3.91177L12.7263 3.08824C12.6527 2.96068 12.4853 2.92411 12.3652 3.00934L10.3922 4.40921C10.2178 4.53294 9.97862 4.39486 9.99858 4.18198L10.2244 1.77334C10.2381 1.62669 10.1228 1.5 9.97548 1.5H9.02455C8.87726 1.5 8.76189 1.62669 8.77564 1.77334L9.00146 4.18203C9.02141 4.39491 8.78227 4.53298 8.60788 4.40926L6.63479 3.00934C6.51466 2.92411 6.34726 2.96068 6.27362 3.08823L5.79815 3.91177C5.72451 4.03932 5.77654 4.20258 5.91041 4.26399L8.10929 5.27277C8.30363 5.36193 8.30363 5.63807 8.10929 5.72723L5.91041 6.73601C5.77653 6.79742 5.7245 6.96068 5.79814 7.08824L6.27361 7.91177C6.34725 8.03932 6.51466 8.07589 6.63478 7.99066L8.60788 6.59074Z"></path>
    <path fill="currentColor" d="M4 11C3.44772 11 3 11.4477 3 12V13C3 13.5523 3.44772 14 4 14H5C5.55228 14 6 13.5523 6 13V12C6 11.4477 5.55228 11 5 11H4Z"></path>
  </symbol>
  <symbol id="diffs-editor-icon-replace" viewBox="0 0 16 16">
    <path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" d="M5.28033 5.71967C5.57322 6.01256 5.57322 6.48744 5.28033 6.78033L3.56066 8.5H11.75C12.7165 8.5 13.5 7.7165 13.5 6.75V2.75C13.5 2.33579 13.8358 2 14.25 2C14.6642 2 15 2.33579 15 2.75V6.75C15 8.54493 13.5449 10 11.75 10H3.56066L5.28033 11.7197C5.57322 12.0126 5.57322 12.4874 5.28033 12.7803C4.98744 13.0732 4.51256 13.0732 4.21967 12.7803L1.21967 9.78033C0.926777 9.48744 0.926777 9.01256 1.21967 8.71967L4.21967 5.71967C4.51256 5.42678 4.98744 5.42678 5.28033 5.71967Z"></path>
  </symbol>
  <symbol id="diffs-editor-icon-replace-all" viewBox="0 0 16 16">
    <path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" d="M10.7197 0.21967C11.0126 -0.0732233 11.4874 -0.0732233 11.7803 0.21967L14.7803 3.21967C15.0732 3.51256 15.0732 3.98744 14.7803 4.28033L11.7803 7.28033C11.4874 7.57322 11.0126 7.57322 10.7197 7.28033C10.4268 6.98744 10.4268 6.51256 10.7197 6.21967L12.4393 4.5H4.25C3.2835 4.5 2.5 5.2835 2.5 6.25V6.875C2.5 7.28921 2.16421 7.625 1.75 7.625C1.33579 7.625 1 7.28921 1 6.875V6.25C1 4.45507 2.45508 3 4.25 3H12.4393L10.7197 1.28033C10.4268 0.987437 10.4268 0.512563 10.7197 0.21967ZM5.28033 8.71967C5.57322 9.01256 5.57322 9.48744 5.28033 9.78033L3.56066 11.5H11.75C12.7165 11.5 13.5 10.7165 13.5 9.75V9.125C13.5 8.71079 13.8358 8.375 14.25 8.375C14.6642 8.375 15 8.71079 15 9.125V9.75C15 11.5449 13.5449 13 11.75 13H3.56066L5.28033 14.7197C5.57322 15.0126 5.57322 15.4874 5.28033 15.7803C4.98744 16.0732 4.51256 16.0732 4.21967 15.7803L1.21967 12.7803C0.926777 12.4874 0.926777 12.0126 1.21967 11.7197L4.21967 8.71967C4.51256 8.42678 4.98744 8.42678 5.28033 8.71967Z"></path>
  </symbol>
</svg>`;
const createSpriteElement = () => {
  const fragment = document.createElement("div");
  fragment.innerHTML = SVGSpriteSheet;
  const sprite = fragment.firstElementChild;
  if (sprite === null || !(sprite instanceof SVGSVGElement)) throw new Error("Failed to create sprite element");
  return sprite;
};
const getEditorIconSvg = (name, size = 16) => `<svg width="${size}" height="${size}" aria-hidden="true" focusable="false">
<use href="#diffs-editor-icon-${name}"></use>
</svg>`;
var SearchPanelWidget = class {
  #container;
  #inputElement;
  #updateMatches;
  #applyMode;
  #navigate;
  #close;
  constructor(options) {
    const { textDocument, containerElement, defaultQuery, mode = "find", initialMatch, scrollToMatch, applyReplace, onUpdate, onClose } = options;
    const searchParams = {
      text: defaultQuery,
      replaceText: "",
      caseSensitive: false,
      wholeWord: false,
      regex: false
    };
    const matches = {
      all: [],
      current: void 0
    };
    const matchResultElement = h("div", {
      dataset: {
        matches: "",
        noMatches: ""
      },
      textContent: "No results"
    });
    const updateMatches = (options2) => {
      matches.all = searchParams.text !== "" ? textDocument.search(searchParams) : [];
      const noMatches = matches.all.length === 0;
      prevButton.disabled = noMatches;
      nextButton.disabled = noMatches;
      if (noMatches) {
        matchResultElement.textContent = "No results";
        matchResultElement.dataset.noMatches = "";
        matches.current = void 0;
        onUpdate([]);
        return;
      }
      delete matchResultElement.dataset.noMatches;
      if (options2?.syncSelection === false) {
        updateCurrentMatch(onUpdate(matches.all, { syncSelection: false }));
        return;
      }
      updateCurrentMatch(onUpdate(matches.all));
    };
    this.#updateMatches = updateMatches;
    const updateCurrentMatch = (currentMatch) => {
      if (currentMatch === void 0) matchResultElement.textContent = `${matches.all.length} results`;
      else {
        const [start, end] = currentMatch;
        matchResultElement.textContent = `${matches.all.findIndex((m) => m[0] === start && m[1] === end) + 1} of ${matches.all.length}`;
      }
      matches.current = currentMatch;
    };
    const updateSearchParam = (key, value) => {
      searchParams[key] = value;
      updateMatches();
    };
    const findNextMatch2 = (findPrevious = false, retainFocus = false) => {
      const allMatches = matches.all;
      let nextMatch = allMatches[0];
      if (allMatches.length > 0) if (findPrevious) {
        const searchOffset = matches.current?.[0] ?? 0;
        nextMatch = allMatches.at(-1);
        for (const m of allMatches) if (m[1] <= searchOffset) nextMatch = m;
        else break;
      } else {
        const searchOffset = matches.current?.[1] ?? 0;
        for (const m of allMatches) if (m[0] >= searchOffset) {
          nextMatch = m;
          break;
        }
      }
      if (nextMatch !== void 0) {
        updateCurrentMatch(nextMatch);
        scrollToMatch(nextMatch, retainFocus);
      }
      matches.current = nextMatch;
    };
    this.#navigate = (findPrevious) => findNextMatch2(findPrevious, true);
    const buildReplacementEdit = (matchStart, matchEnd) => ({
      start: matchStart,
      end: matchEnd,
      text: buildSearchReplacementText((offset) => textDocument.positionAt(offset), (position) => textDocument.offsetAt(position), (line) => textDocument.getLineText(line), searchParams, matchStart, matchEnd)
    });
    const replace = () => {
      if (searchParams.text === "" || matches.all.length === 0) return;
      let currentMatch = matches.current;
      if (currentMatch === void 0) {
        findNextMatch2(false, true);
        currentMatch = matches.current;
        if (currentMatch === void 0) return;
      }
      const [start, end] = currentMatch;
      const edit = buildReplacementEdit(start, end);
      applyReplace([edit]);
      scrollToMatch([start + edit.text.length, start + edit.text.length], true);
      matches.current = void 0;
      updateMatches();
    };
    const replaceAll = () => {
      if (searchParams.text === "" || matches.all.length === 0) return;
      applyReplace(matches.all.map(([start, end]) => buildReplacementEdit(start, end)));
      matches.current = void 0;
      updateMatches();
    };
    const close = () => {
      this.cleanup();
      onClose();
    };
    this.#close = close;
    const iconButton = (opts) => h("button", {
      type: "button",
      title: opts.label,
      ariaLabel: opts.label,
      dataset: {
        searchIcon: "",
        ...opts.dataset
      },
      innerHTML: getEditorIconSvg(opts.icon, opts.size ?? 16),
      onclick: opts.onClick
    });
    const makeToggle = (icon, title, key) => {
      const button = iconButton({
        icon,
        label: title,
        size: 14,
        onClick: () => {
          const next = !searchParams[key];
          button.ariaPressed = String(next);
          updateSearchParam(key, next);
        }
      });
      button.ariaPressed = String(searchParams[key]);
      return button;
    };
    const caseSensitiveToggle = makeToggle("case", "Match Case", "caseSensitive");
    const wholeWordToggle = makeToggle("whole-word", "Whole Word", "wholeWord");
    const regexToggle = makeToggle("regex", "Regexp", "regex");
    const replaceInputElement = h("input", {
      type: "text",
      placeholder: "Replace",
      dataset: "replace",
      value: "",
      oninput: (e) => {
        searchParams.replaceText = e.target.value;
      },
      onkeydown: (e) => {
        if (e.isComposing) return;
        const findAgain = resolveFindAgainShortcut(e);
        if (e.key === "Escape") {
          e.preventDefault();
          close();
        } else if (e.key === "Enter") {
          e.preventDefault();
          replace();
        } else if (findAgain !== void 0) {
          e.preventDefault();
          findNextMatch2(findAgain === "previous", true);
        }
      }
    });
    this.#inputElement = h("input", {
      type: "text",
      placeholder: "Search",
      dataset: "search",
      value: defaultQuery,
      oninput: (e) => {
        searchParams.text = e.target.value;
        matches.current = void 0;
        updateMatches();
      },
      onkeydown: (e) => {
        const findAgain = resolveFindAgainShortcut(e);
        if (e.key === "Escape") {
          e.preventDefault();
          close();
        } else if (e.key === "Enter") {
          e.preventDefault();
          findNextMatch2(e.shiftKey, true);
        } else if (findAgain !== void 0) {
          e.preventDefault();
          findNextMatch2(findAgain === "previous", true);
        } else if (isPrimaryModifier(e) && (e.key === "f" || e.code === "KeyF")) {
          e.preventDefault();
          applyMode(e.altKey ? "replace" : "find");
        }
      }
    });
    const searchTogglesElement = h("div", {
      dataset: "searchToggles",
      children: [
        caseSensitiveToggle,
        wholeWordToggle,
        regexToggle
      ]
    });
    const findInputBox = h("div", {
      dataset: {
        inputBox: "",
        find: ""
      },
      children: [this.#inputElement, searchTogglesElement]
    });
    const replaceInputBox = h("div", {
      dataset: {
        inputBox: "",
        replace: "",
        replaceCell: ""
      },
      children: [replaceInputElement]
    });
    const replaceActionsElement = h("div", {
      dataset: {
        replaceActions: "",
        replaceCell: ""
      },
      children: [iconButton({
        icon: "replace",
        label: "Replace",
        onClick: replace
      }), iconButton({
        icon: "replace-all",
        label: "Replace All",
        onClick: replaceAll
      })]
    });
    const prevButton = iconButton({
      icon: "arrow-up",
      label: "Previous",
      onClick: () => {
        findNextMatch2(true);
      }
    });
    const nextButton = iconButton({
      icon: "arrow-down",
      label: "Next",
      onClick: () => {
        findNextMatch2();
      }
    });
    prevButton.disabled = true;
    nextButton.disabled = true;
    const navElement = h("div", {
      dataset: "searchNav",
      children: [prevButton, nextButton]
    });
    const closeElement = iconButton({
      icon: "close",
      label: "Close",
      onClick: close,
      dataset: { searchClose: "" }
    });
    const gridElement = h("div", {
      dataset: {
        searchGrid: "",
        mode
      },
      children: [
        findInputBox,
        replaceInputBox,
        replaceActionsElement,
        matchResultElement,
        navElement,
        closeElement
      ]
    });
    const applyMode = (next) => {
      gridElement.dataset.mode = next;
      this.#inputElement.focus();
      this.#inputElement.select();
    };
    this.#applyMode = applyMode;
    this.#container = h("div", {
      dataset: "searchPanel",
      children: [h("div", {
        dataset: "editorWidget",
        children: [gridElement]
      })]
    });
    matches.current = initialMatch;
    containerElement.before(this.#container);
    requestAnimationFrame(() => {
      if (initialMatch !== void 0) updateMatches();
      else onUpdate([]);
      this.#inputElement.select();
    });
  }
  focus() {
    this.#inputElement.focus();
  }
  navigate(findPrevious) {
    this.#navigate?.(findPrevious);
  }
  updateMatches(options) {
    this.#updateMatches?.(options);
  }
  setMode(mode) {
    this.#applyMode?.(mode);
  }
  close() {
    this.#close?.();
  }
  cleanup() {
    this.#container.remove();
  }
};
var SelectionActionWidget = class {
  #root;
  #height;
  #resizeObserver;
  constructor(selectionActionElement, overlayElement, onHeightChange) {
    this.#root = h("div", {
      dataset: {
        editorWidget: "",
        selectionActionPopover: ""
      },
      contentEditable: "false",
      children: [selectionActionElement]
    }, overlayElement);
    this.#height = this.#root.offsetHeight;
    this.#resizeObserver = new ResizeObserver(() => {
      const height = this.#root.offsetHeight;
      if (height !== this.#height) {
        this.#height = height;
        onHeightChange();
      }
    });
    this.#resizeObserver.observe(this.#root);
  }
  /**
  * Repositions the selection action widget.
  * @param left - The left position of the selection action widget.
  * @param top - The top position of the selection action widget.
  * @param gutterWidth - The width of the gutter.
  * @param placeAbove - Whether the selection action widget should be placed above the anchor.
  * @param visible - Whether the selection intersects the viewport.
  */
  reposition(left, top, gutterWidth, placeAbove, visible, viewport) {
    this.#root.style.visibility = visible ? "" : "hidden";
    setPopoverPositionStyles(this.#root, {
      gutterWidth,
      placeAbove,
      viewport,
      x: left,
      y: top
    });
  }
  /**
  * Gets the height of the selection action widget.
  * @returns The height of the selection action widget.
  */
  get height() {
    return this.#height;
  }
  /**
  * Cleans up the selection action widget.
  */
  cleanup() {
    this.#resizeObserver.disconnect();
    this.#root.remove();
  }
};
function cloneEditorState(state) {
  return {
    selections: state.selections?.map((selection) => ({
      start: { ...selection.start },
      end: { ...selection.end },
      direction: selection.direction
    })),
    view: state.view === void 0 ? void 0 : { ...state.view }
  };
}
function createStateStorage(storage) {
  return typeof storage === "object" ? storage : storage === "indexedDB" ? new IndexedDBStateStorage() : new InMemoryStateStorage();
}
var InMemoryStateStorage = class {
  #states = /* @__PURE__ */ new Map();
  get(cacheKey) {
    const state = this.#states.get(cacheKey);
    return state === void 0 ? void 0 : cloneEditorState(state);
  }
  set(cacheKey, state) {
    this.#states.set(cacheKey, cloneEditorState(state));
  }
};
const DATABASE_NAME = "pierre-diffs-editor-state";
const DATABASE_VERSION = 1;
const STORE_NAME = "states";
var IndexedDBStateStorage = class {
  #database = openDatabase();
  async get(cacheKey) {
    const database = await this.#database;
    if (database === void 0) return;
    const state = await requestToPromise(database.transaction(STORE_NAME, "readonly").objectStore(STORE_NAME).get(cacheKey));
    return state === void 0 ? void 0 : cloneEditorState(state);
  }
  async set(cacheKey, state) {
    const database = await this.#database;
    if (database === void 0) return;
    await requestToPromise(database.transaction(STORE_NAME, "readwrite").objectStore(STORE_NAME).put(cloneEditorState(state), cacheKey));
  }
};
function openDatabase() {
  try {
    const factory = globalThis.indexedDB;
    if (factory === void 0) return Promise.resolve(void 0);
    const request = factory.open(DATABASE_NAME, DATABASE_VERSION);
    request.onupgradeneeded = () => {
      const database = request.result;
      if (!database.objectStoreNames.contains(STORE_NAME)) database.createObjectStore(STORE_NAME);
    };
    return requestToPromise(request);
  } catch {
    return Promise.resolve(void 0);
  }
}
function requestToPromise(request) {
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}
const TEXT_WIDTH_CACHE_LIMIT = 4096;
const COMBINING_MARK_PATTERN = new RegExp("\\p{Mark}", "u");
var Metrics = class {
  #root;
  #canvasCtx;
  #font;
  #textWidthCache = /* @__PURE__ */ new Map();
  /** Width of the '0' character. */
  ch = -1;
  /** Size of a tab(\t) character. */
  tabSize = 2;
  /** Height of the code line. */
  lineHeight = 20;
  /** Padding top of the root element. */
  paddingTop = 0;
  /** initialize the metrics */
  init(root) {
    if (this.#root === root && this.#canvasCtx !== void 0 && this.ch !== -1) return;
    this.#root = root;
    this.#canvasCtx ??= document.createElement("canvas").getContext("2d") ?? void 0;
    if (this.#canvasCtx === void 0) throw new Error("Could not get canvas context");
    const parent = root.parentElement;
    if (parent !== null) {
      const { paddingTop } = getComputedStyle(parent);
      if (paddingTop.endsWith("px")) this.paddingTop = parseFloat(paddingTop.slice(0, -2));
    }
    const { fontSize, fontFamily, tabSize, lineHeight } = getComputedStyle(root);
    if (lineHeight.endsWith("px")) this.lineHeight = parseFloat(lineHeight.slice(0, -2));
    else if (fontSize.endsWith("px")) this.lineHeight = round(parseFloat(fontSize.slice(0, -2)) * parseFloat(lineHeight));
    const font = fontSize + " " + fontFamily;
    if (this.#font !== font || this.ch === -1) {
      this.#font = font;
      this.#canvasCtx.font = font;
      this.ch = this.canvasMeasureTextWidth("0");
      this.clearTextWidthCache();
    }
    const nextTabSize = parseInt(tabSize, 10);
    if (!Number.isNaN(nextTabSize)) this.tabSize = nextTabSize;
  }
  /**
  * Re-measure the '0' character width against the font that is loaded right
  * now, returning true when measurement-dependent UI should refresh.
  *
  * A custom web font can finish loading after the editor first renders.
  * Until then canvas measureText reports the fallback font's width, and
  * getComputedStyle returns the same font-family string before and after the
  * file arrives, so init()'s font guard never re-measures on its own. Call
  * this once fonts have settled (e.g. on document.fonts.ready) to replace a
  * width measured against the fallback font with the real glyph width. Font
  * completion can also change DOM-measured emoji/ZWJ widths while leaving the
  * ASCII width unchanged, and the computed font string stays the same in both
  * cases. The boolean return lets the caller skip re-rendering when there is no
  * measured state to refresh.
  */
  remeasureCharacterWidth() {
    if (this.#canvasCtx === void 0 || this.#font === void 0) return false;
    this.#canvasCtx.font = this.#font;
    const ch = this.canvasMeasureTextWidth("0");
    const characterWidthChanged = ch !== this.ch;
    if (characterWidthChanged) this.ch = ch;
    const textWidthCacheCleared = this.#clearTextWidthCache();
    return characterWidthChanged || textWidthCacheCleared;
  }
  /** measure the width of the text */
  measureTextWidth(text) {
    if (!text.includes("	")) return this.#measureTextWidthWithoutTabs(text);
    if (this.#canvasCtx === void 0) throw new Error("Metrics not initialized");
    const asciiColumns = getExpandedAsciiTextColumns(text, this.tabSize);
    if (asciiColumns !== -1) return asciiColumns * this.ch;
    let width = 0;
    let runStart = 0;
    const tabStopWidth = this.tabSize * this.ch;
    for (let i = 0; i < text.length; i++) {
      if (text.charCodeAt(i) !== 9) continue;
      if (i > runStart) width += this.#measureTextWidthWithoutTabs(text.slice(runStart, i));
      if (tabStopWidth > 0) {
        const remainder = width % tabStopWidth;
        width += remainder === 0 ? tabStopWidth : tabStopWidth - remainder;
      }
      runStart = i + 1;
    }
    if (runStart < text.length) width += this.#measureTextWidthWithoutTabs(text.slice(runStart));
    return round(width);
  }
  #measureTextWidthWithoutTabs(text) {
    if (needsDomTextMeasurement(text)) return this.domMeasureTextWidth(text);
    return this.canvasMeasureTextWidth(text);
  }
  /** measure the width of the text using the canvas measureText API */
  canvasMeasureTextWidth(text) {
    if (this.#canvasCtx === void 0) throw new Error("Metrics not initialized");
    return round(this.#canvasCtx.measureText(text).width);
  }
  /**
  * measure the width of the text using the DOM
  * this is slow because it cause a reflow, use it for non-ascii text;
  * results are memoized per text so repeated measurements skip the reflow
  */
  domMeasureTextWidth(text) {
    if (this.#root === void 0) throw new Error("Metrics not initialized");
    const cacheKey = text + "|" + this.#font;
    const cached = this.#textWidthCache.get(cacheKey);
    if (cached !== void 0) return cached;
    const measureEl = h("span", {
      style: {
        position: "absolute",
        top: "0",
        left: "0",
        visibility: "hidden",
        pointerEvents: "none",
        whiteSpace: "pre",
        font: "inherit"
      },
      textContent: text
    }, this.#root);
    let width;
    try {
      width = round(measureEl.getBoundingClientRect().width);
    } finally {
      measureEl.remove();
    }
    if (this.#textWidthCache.size >= TEXT_WIDTH_CACHE_LIMIT) {
      const oldestKey = this.#textWidthCache.keys().next().value;
      if (oldestKey !== void 0) this.#textWidthCache.delete(oldestKey);
    }
    this.#textWidthCache.set(cacheKey, width);
    return width;
  }
  /**
  * discard memoized DOM text widths
  * call this when the inherited font may have changed without re-running
  * init(), e.g. on a layout reflow, so stale widths are not reused
  */
  clearTextWidthCache() {
    this.#clearTextWidthCache();
  }
  #clearTextWidthCache() {
    const hadCachedTextWidths = this.#textWidthCache.size > 0;
    this.#textWidthCache.clear();
    return hadCachedTextWidths;
  }
};
function needsDomTextMeasurement(text) {
  for (let i = 0; i < text.length; i++) {
    const code = text.charCodeAt(i);
    if (code >= 55296 && code <= 57343 || code === 8205 || code === 65038 || code === 65039 || code > 127 && COMBINING_MARK_PATTERN.test(text.charAt(i))) return true;
  }
  return false;
}
function snapTextOffsetToUnicodeBoundary(text, offset) {
  const boundedOffset = Math.max(0, Math.min(offset, text.length));
  if (boundedOffset === 0 || boundedOffset === text.length || !needsDomTextMeasurement(text)) return boundedOffset;
  const segmenter = getGraphemeSegmenter();
  if (segmenter !== void 0) {
    for (const segment of segmenter.segment(text)) {
      const segmentStart2 = segment.index;
      const segmentEnd = segmentStart2 + segment.segment.length;
      if (boundedOffset > segmentStart2 && boundedOffset < segmentEnd) return segmentEnd;
      if (boundedOffset <= segmentStart2) break;
    }
    return boundedOffset;
  }
  let segmentStart = 0;
  for (const codePoint of text) {
    const segmentEnd = segmentStart + codePoint.length;
    if (boundedOffset > segmentStart && boundedOffset < segmentEnd) return segmentEnd;
    if (boundedOffset <= segmentStart) break;
    segmentStart = segmentEnd;
  }
  return boundedOffset;
}
function getUnicodeMeasurementOffsets(text) {
  if (!needsDomTextMeasurement(text)) return;
  const offsets = [0];
  const segmenter = getGraphemeSegmenter();
  if (segmenter !== void 0) {
    for (const segment of segmenter.segment(text)) offsets.push(segment.index + segment.segment.length);
    return offsets;
  }
  let offset = 0;
  for (const codePoint of text) {
    offset += codePoint.length;
    offsets.push(offset);
  }
  return offsets;
}
function getExpandedAsciiTextColumns(text, tabSize) {
  let columns = 0;
  for (let i = 0; i < text.length; i++) {
    const code = text.charCodeAt(i);
    if (code > 127) return -1;
    columns += code === 9 ? tabSize - columns % tabSize : 1;
  }
  return columns;
}
const colorUtils = {
  compositeOverBg,
  contrastRatio,
  deriveMutedFg,
  hoverWouldEraseText,
  isDarkSurface,
  isFullyTransparent,
  pickReadableForeground,
  relativeLuminance,
  surfacesMatch
};
const TOKENIZE_TIME_LIMIT = 500;
let nextTokenizerId = 0;
var EditorTokenizer = class {
  #highlighter;
  #grammar;
  #mediaQueryList;
  #themeType = "dark";
  #themeName = "";
  #colorMap;
  #textDocument;
  #tokenizeMaxLineLength;
  #setStyle;
  #onDeferTokenize;
  #onThemeChange;
  #matchBrackets;
  #debug;
  #disposes;
  #isCleanedUp = false;
  #stateStack = [INITIAL];
  #comparisonStateStack = [];
  #comparisonStateStackStart = 0;
  #comparisonLineChanges = [];
  #lastLine = -1;
  #isStopped = true;
  #isPaused = false;
  #backgroundJobId = 0;
  #tokenizerId = ++nextTokenizerId;
  #backgroundPrebuildEndLine = -1;
  #pendingPrebuildEndLine = -1;
  #backgroundChangedLineRanges;
  #backgroundChangedRangeIndex = 0;
  #bracketIgnoredRanges = [];
  #isMessageListenerAttached = false;
  #prebuildStateStack = debounce(async (renderRange) => {
    if (this.#isCleanedUp) return;
    const { startingLine = 0, totalLines = Infinity } = renderRange ?? {};
    const endLine = Math.min(totalLines === Infinity ? Infinity : startingLine + totalLines, this.#textDocument.lineCount);
    if (this.#grammar === void 0 && !isGrammarlessLanguage(this.#textDocument.languageId)) {
      await this.#highlighter.loadLanguage(this.#textDocument.languageId);
      if (this.#isCleanedUp) return;
      this.#grammar = this.#highlighter.getLanguage(this.#textDocument.languageId);
    }
    this.#ensureActiveTheme();
    this.#scheduleStatePrebuild(endLine);
  }, 500);
  #onMessage = ({ data }) => {
    if (typeof data !== "object" || data === null) return;
    const { type, tokenizerId, jobId } = data;
    if (type === "tokenize" && tokenizerId === this.#tokenizerId && typeof jobId === "number" && jobId === this.#backgroundJobId) if (this.#backgroundPrebuildEndLine >= 0) this.#backgroundPrebuild(jobId);
    else this.#backgroundTokenize(jobId);
  };
  get themeType() {
    return this.#themeType;
  }
  getStringCommentRegexpRangesInLine(lineIndex) {
    if (!this.#matchBrackets || lineIndex < 0 || lineIndex >= this.#textDocument.lineCount) return null;
    this.#ensureGrammar();
    if (this.#grammar === void 0) return null;
    if (this.#bracketIgnoredRanges[lineIndex] === void 0) {
      this.#buildStateStack(lineIndex);
      const state = this.#stateStack[lineIndex] ?? INITIAL;
      const result = this.#tokenizeLineAt(lineIndex, state);
      this.#stateStack[lineIndex + 1] = result.state;
    }
    return this.#bracketIgnoredRanges[lineIndex] ?? null;
  }
  constructor({ codeOptions, highlighter, textDocument, matchBrackets, setStyle, onDeferTokenize, onThemeChange, __debug }) {
    const { themeType: themeTypeOption = "system", theme = DEFAULT_THEMES, tokenizeMaxLineLength = 1e3 } = codeOptions;
    this.#mediaQueryList = window.matchMedia("(prefers-color-scheme: dark)");
    let themeType;
    if (themeTypeOption === "system") themeType = this.#resolveSystemThemeType();
    else themeType = themeTypeOption;
    if (typeof theme !== "string" && themeTypeOption === "system") {
      const observer = new MutationObserver((mutations) => {
        for (const { type, attributeName } of mutations) if (type === "attributes" && attributeName !== null && (attributeName === "class" || attributeName.startsWith("data-"))) {
          const themeType2 = this.#resolveSystemThemeType();
          this.#emitThemeChange(theme[themeType2], themeType2);
          break;
        }
      });
      observer.observe(document.documentElement, { attributes: true });
      observer.observe(document.body, { attributes: true });
      this.#disposes = [addEventListener(this.#mediaQueryList, "change", () => {
        const themeType2 = this.#resolveSystemThemeType();
        this.#emitThemeChange(theme[themeType2], themeType2);
      }), () => observer.disconnect()];
    }
    this.#highlighter = highlighter;
    this.#textDocument = textDocument;
    this.#tokenizeMaxLineLength = tokenizeMaxLineLength;
    this.#setStyle = setStyle;
    this.#onDeferTokenize = onDeferTokenize;
    this.#onThemeChange = onThemeChange;
    this.#matchBrackets = matchBrackets !== false;
    this.#debug = __debug ?? false;
    this.#ensureGrammar();
    this.#colorMap = [];
    this.#setTheme(typeof theme === "string" ? theme : theme[themeType], typeof theme === "string" ? void 0 : themeType);
  }
  #emitThemeChange(themeName, themeType) {
    if (themeName === this.#themeName && themeType === this.#themeType) return;
    this.#setTheme(themeName, themeType);
    this.stopBackgroundTokenize();
    this.#stateStack = [INITIAL];
    this.#comparisonStateStack = [];
    this.#comparisonStateStackStart = 0;
    this.#comparisonLineChanges = [];
    if (this.#grammar !== void 0 && this.#textDocument.lineCount > 0) this.#scheduleBackgroundTokenize(0);
    this.#onThemeChange?.();
  }
  #resolveSystemThemeType() {
    try {
      if (typeof document !== "undefined" && typeof getComputedStyle === "function" && document.body != null) {
        const colorSchemes = getComputedStyle(document.body).colorScheme.split(/\s+/);
        const supportsDark = colorSchemes.includes("dark");
        if (supportsDark !== colorSchemes.includes("light")) return supportsDark ? "dark" : "light";
      }
    } catch {
    }
    return this.#mediaQueryList.matches ? "dark" : "light";
  }
  syncTheme(codeOptions) {
    const { themeType = "system", theme = DEFAULT_THEMES } = codeOptions;
    if (typeof theme === "string") {
      const pinnedThemeType = this.#highlighter.getTheme(theme).type;
      if (theme === this.#themeName && pinnedThemeType === this.#themeType) return;
      this.#emitThemeChange(theme, pinnedThemeType);
      return;
    }
    const nextThemeType = themeType === "system" ? this.#resolveSystemThemeType() : themeType;
    const nextThemeName = theme[nextThemeType];
    if (nextThemeType === this.#themeType && nextThemeName === this.#themeName) return;
    this.#emitThemeChange(nextThemeName, nextThemeType);
  }
  #setTheme(themeName, themeType) {
    const { theme, colorMap } = this.#highlighter.setTheme(themeName);
    const { colors = {} } = this.#highlighter.getTheme(themeName);
    const selectionBackground = colors["editor.selectionBackground"];
    const themeLineHighlightBackground = colors["editor.lineHighlightBackground"];
    const lineHighlightBackground = themeLineHighlightBackground != null && themeLineHighlightBackground.trim() !== "" && !colorUtils.isFullyTransparent(themeLineHighlightBackground) ? themeLineHighlightBackground : void 0;
    const lineHighlightBorder = colors["editor.lineHighlightBorder"] ?? (lineHighlightBackground == null ? "color-mix(in lab, var(--diffs-bg) 70%, var(--diffs-fg))" : "transparent");
    const activeLineSourceMix = lineHighlightBackground == null ? "100%" : "85%";
    const cursorForeground = colors["editorCursor.foreground"];
    const findMatchBackground = colors["editor.findMatchBackground"];
    const findMatchHighlightBackground = colors["editor.findMatchHighlightBackground"];
    const bracketMatchBackground = colors["editorBracketMatch.background"];
    const bracketMatchBorder = colors["editorBracketMatch.border"];
    const hintForeground = colors["editorHint.foreground"];
    const infoForeground = colors["editorInfo.foreground"];
    const warningForeground = colors["editorWarning.foreground"];
    const errorForeground = colors["editorError.foreground"];
    this.#setStyle(`:host {
      --diffs-editor-selection-bg: ${selectionBackground ?? "var(--diffs-line-bg)"};
      --diffs-editor-line-highlight-border: ${lineHighlightBorder};
      --diffs-editor-active-line-source-mix: ${activeLineSourceMix};
      --diffs-editor-match-bg: ${findMatchBackground ?? "initial"};
      --diffs-editor-match-highlight-bg: ${findMatchHighlightBackground ?? "initial"};
      --diffs-editor-bracket-match-bg: ${bracketMatchBackground ?? "initial"};
      --diffs-editor-bracket-match-border: ${bracketMatchBorder ?? "initial"};
      --diffs-editor-cursor-fg: ${cursorForeground ?? "initial"};
      --diffs-editor-hint-fg: ${hintForeground ?? "initial"};
      --diffs-editor-info-fg: ${infoForeground ?? "initial"};
      --diffs-editor-warning-fg: ${warningForeground ?? "initial"};
      --diffs-editor-error-fg: ${errorForeground ?? "initial"};
    }`);
    this.#themeName = themeName;
    this.#themeType = themeType ?? theme.type;
    this.#colorMap = colorMap;
  }
  #ensureActiveTheme() {
    if (this.#themeName === "") return;
    const { colorMap } = this.#highlighter.setTheme(this.#themeName);
    this.#colorMap = colorMap;
  }
  cleanUp() {
    this.#isCleanedUp = true;
    this.stopBackgroundTokenize();
    this.#detachMessageListener();
    this.#disposes?.forEach((dispose) => dispose());
    this.#disposes = void 0;
  }
  tokenize(change, renderRange) {
    this.#ensureGrammar();
    this.#ensureActiveTheme();
    if (this.#grammar === void 0 && !isGrammarlessLanguage(this.#textDocument.languageId)) throw new Error(`Grammar for language "${this.#textDocument.languageId}" not loaded`);
    if (this.#matchBrackets) this.#bracketIgnoredRanges.length = Math.min(this.#bracketIgnoredRanges.length, change.startLine);
    const { lineCount } = this.#textDocument;
    const { startingLine = 0, totalLines = Infinity } = renderRange ?? {};
    const renderRangeEndLine = totalLines === Infinity ? lineCount : Math.min(startingLine + totalLines, lineCount);
    const dirtyStart = change.startLine;
    const viewStart = Math.max(startingLine, dirtyStart);
    const crossesRenderRangeEnd = renderRange !== void 0 && totalLines !== Infinity && change.lineDelta > 0 && dirtyStart < renderRangeEndLine && change.endLine >= renderRangeEndLine;
    const canReuseCachedStates = change.lineDelta === 0 && (change.changedLineChanges?.every(([, , lineDelta]) => lineDelta === 0) ?? true);
    const canCacheTokenizedStates = canReuseCachedStates || renderRange === void 0 || dirtyStart >= viewStart;
    const changedLineRanges = change.changedLineRanges ?? [[dirtyStart, change.endLine]];
    this.#comparisonStateStack = [];
    this.#comparisonStateStackStart = 0;
    this.#comparisonLineChanges = [];
    let offscreenSyncEnd = -1;
    if (dirtyStart < viewStart) {
      for (const [rangeStart, rangeEnd] of changedLineRanges) if (rangeStart < viewStart) offscreenSyncEnd = Math.max(offscreenSyncEnd, Math.min(rangeEnd, viewStart - 1));
    }
    const shouldFlushOffscreenLines = offscreenSyncEnd >= dirtyStart && (canReuseCachedStates || change.lineDelta < 0);
    if (canReuseCachedStates) this.#buildStateStack(dirtyStart);
    else {
      this.#shiftComparisonStateStack(change);
      if (renderRange === void 0 || dirtyStart >= viewStart) this.#buildStateStack(viewStart);
    }
    let changedRangeIndex = 0;
    let currentChangedRangeEnd = changedLineRanges[changedRangeIndex][1];
    let backgroundStartLine;
    let backgroundChangedRangeIndex = 0;
    let line = canReuseCachedStates ? changedLineRanges[changedRangeIndex][0] : viewStart;
    let settled = false;
    const dirtyLines = /* @__PURE__ */ new Map();
    const offscreenDirtyLines = shouldFlushOffscreenLines ? /* @__PURE__ */ new Map() : void 0;
    if (offscreenDirtyLines !== void 0 && !canReuseCachedStates) {
      const offscreenEnd = Math.min(offscreenSyncEnd + 1, viewStart, renderRangeEndLine);
      if (offscreenEnd > dirtyStart) {
        this.#buildStateStack(offscreenEnd);
        let offscreenLine = dirtyStart;
        let offscreenState = this.#stateStack[offscreenLine] ?? INITIAL;
        for (; offscreenLine < offscreenEnd; offscreenLine++) {
          const resolved = this.#tokenizeLineAt(offscreenLine, offscreenState);
          offscreenState = resolved.state;
          offscreenDirtyLines.set(offscreenLine, resolved.resolvedTokens);
        }
        this.#stateStack[offscreenEnd] = offscreenState;
      }
    }
    let state = this.#stateStack[line] ?? INITIAL;
    for (; line < renderRangeEndLine; ) {
      const previousNextState = canReuseCachedStates ? this.#stateStack[line + 1] : void 0;
      if (canCacheTokenizedStates) this.#stateStack[line] = state;
      const { resolvedTokens, state: nextState } = this.#tokenizeLineAt(line, state);
      state = nextState;
      if (line >= viewStart) dirtyLines.set(line, resolvedTokens);
      else offscreenDirtyLines?.set(line, resolvedTokens);
      if (canCacheTokenizedStates) this.#stateStack[line + 1] = state;
      settled = line >= currentChangedRangeEnd && canReuseCachedStates && previousNextState !== void 0 && state.equals(previousNextState);
      if (settled) {
        changedRangeIndex++;
        const nextRange = changedLineRanges[changedRangeIndex];
        if (nextRange === void 0) break;
        if (nextRange[0] >= renderRangeEndLine) {
          backgroundStartLine = nextRange[0];
          backgroundChangedRangeIndex = changedRangeIndex;
          break;
        }
        if (this.#stateStack[nextRange[0]] === void 0) {
          currentChangedRangeEnd = nextRange[1];
          line++;
        } else {
          line = nextRange[0];
          state = this.#stateStack[line] ?? state;
          currentChangedRangeEnd = nextRange[1];
        }
        settled = false;
        continue;
      }
      line++;
    }
    if (canCacheTokenizedStates) if (line < renderRangeEndLine) this.#stateStack[line + 1] = state;
    else this.#stateStack[line] = state;
    if (offscreenDirtyLines !== void 0 && offscreenDirtyLines.size > 0) this.#onDeferTokenize(offscreenDirtyLines, this.#themeType);
    if (backgroundStartLine !== void 0) this.#scheduleBackgroundTokenize(backgroundStartLine, changedLineRanges, backgroundChangedRangeIndex);
    else if (!settled && line < lineCount) {
      const backgroundLine = crossesRenderRangeEnd && dirtyStart >= viewStart ? renderRangeEndLine : dirtyStart < viewStart && !canReuseCachedStates ? dirtyStart : line;
      this.#scheduleBackgroundTokenize(backgroundLine, changedLineRanges, changedRangeIndex);
    }
    return dirtyLines;
  }
  prebuildStateStack(renderRange) {
    this.#ensureGrammar();
    this.#prebuildStateStack(renderRange);
  }
  stopBackgroundTokenize() {
    this.#pendingPrebuildEndLine = -1;
    if (this.#isStopped) return;
    this.#isStopped = true;
    this.#isPaused = false;
    this.#lastLine = -1;
    this.#backgroundPrebuildEndLine = -1;
    this.#backgroundChangedLineRanges = void 0;
    this.#backgroundChangedRangeIndex = 0;
    this.#comparisonStateStack = [];
    this.#comparisonStateStackStart = 0;
    this.#comparisonLineChanges = [];
    this.#detachMessageListener();
  }
  pauseBackgroundTokenize() {
    if (this.#isStopped || this.#isPaused) return;
    if (this.#debug) console.log("[diffs/editor] background tokenization paused", { jobId: this.#backgroundJobId });
    this.#isPaused = true;
  }
  resumeBackgroundTokenize() {
    if (this.#isStopped || !this.#isPaused || this.#grammar === void 0 || this.#lastLine < 0) return;
    if (this.#debug) console.log("[diffs/editor] background tokenization resumed", { jobId: this.#backgroundJobId });
    this.#isPaused = false;
    this.#postTokenizeMessage(this.#backgroundJobId);
  }
  #ensureGrammar() {
    if (this.#grammar === void 0 && !isGrammarlessLanguage(this.#textDocument.languageId) && this.#highlighter.getLoadedLanguages().includes(this.#textDocument.languageId)) this.#grammar = this.#highlighter.getLanguage(this.#textDocument.languageId);
  }
  #attachMessageListener() {
    if (this.#isMessageListenerAttached) return;
    globalThis.addEventListener("message", this.#onMessage);
    this.#isMessageListenerAttached = true;
  }
  #detachMessageListener() {
    if (!this.#isMessageListenerAttached) return;
    globalThis.removeEventListener("message", this.#onMessage);
    this.#isMessageListenerAttached = false;
  }
  #postTokenizeMessage(jobId) {
    globalThis.postMessage({
      type: "tokenize",
      tokenizerId: this.#tokenizerId,
      jobId
    });
  }
  #scheduleBackgroundTokenize(startLine, changedLineRanges, changedRangeIndex = 0) {
    if (isGrammarlessLanguage(this.#textDocument.languageId)) return;
    const jobId = ++this.#backgroundJobId;
    if (this.#debug) console.log("[diffs/editor] background tokenization scheduled", {
      jobId,
      startLine,
      changedLineRanges,
      changedRangeIndex
    });
    this.#isStopped = false;
    this.#isPaused = false;
    this.#lastLine = startLine;
    if (this.#backgroundPrebuildEndLine >= 0) this.#pendingPrebuildEndLine = Math.max(this.#pendingPrebuildEndLine, this.#backgroundPrebuildEndLine);
    this.#backgroundPrebuildEndLine = -1;
    this.#backgroundChangedLineRanges = changedLineRanges;
    this.#backgroundChangedRangeIndex = changedRangeIndex;
    this.#attachMessageListener();
    this.#postTokenizeMessage(jobId);
  }
  #scheduleStatePrebuild(endLine) {
    if (this.#grammar === void 0 || this.#stateStack.length > endLine) return;
    if (!this.#isStopped) {
      if (this.#backgroundPrebuildEndLine >= 0) this.#backgroundPrebuildEndLine = Math.max(this.#backgroundPrebuildEndLine, endLine);
      else this.#pendingPrebuildEndLine = Math.max(this.#pendingPrebuildEndLine, endLine);
      return;
    }
    const jobId = ++this.#backgroundJobId;
    this.#isStopped = false;
    this.#isPaused = false;
    this.#lastLine = this.#stateStack.length - 1;
    this.#backgroundPrebuildEndLine = endLine;
    this.#pendingPrebuildEndLine = -1;
    this.#backgroundChangedLineRanges = void 0;
    this.#backgroundChangedRangeIndex = 0;
    this.#attachMessageListener();
    this.#postTokenizeMessage(jobId);
  }
  #tokenizeLineAt(line, state) {
    const lineText = this.#textDocument.getLineText(line);
    if (lineText.length > this.#tokenizeMaxLineLength) {
      console.warn(`[diffs] Line(${line}) too long to tokenize: ${lineText.length}`);
      this.#cacheBracketIgnoredRanges(line, null);
      return {
        resolvedTokens: [[
          0,
          "",
          lineText
        ]],
        state
      };
    }
    if (this.#grammar === void 0 || lineText === "" || lineText.trim() === "") {
      this.#cacheBracketIgnoredRanges(line, null);
      return {
        resolvedTokens: [[
          0,
          "",
          lineText
        ]],
        state
      };
    }
    const result = tokenizeLine(this.#grammar, this.#colorMap, lineText, state, TOKENIZE_TIME_LIMIT, this.#matchBrackets);
    this.#cacheBracketIgnoredRanges(line, result.bracketIgnoredRanges);
    return {
      resolvedTokens: result.resolvedTokens,
      state: result.ruleStack
    };
  }
  #cacheBracketIgnoredRanges(line, ranges) {
    if (this.#matchBrackets) this.#bracketIgnoredRanges[line] = ranges;
  }
  #shiftComparisonStateStack(change) {
    const lineChanges = change.changedLineChanges ?? [[
      change.startLine,
      change.endLine,
      change.lineDelta
    ]];
    const comparisonStart = change.startLine + 1;
    if (comparisonStart <= this.#stateStack.length - comparisonStart) {
      this.#comparisonStateStack = this.#stateStack;
      this.#comparisonStateStackStart = 0;
      this.#stateStack = this.#stateStack.slice(0, comparisonStart);
    } else {
      this.#comparisonStateStackStart = comparisonStart;
      this.#comparisonStateStack = this.#stateStack.slice(comparisonStart);
      this.#stateStack.length = Math.min(this.#stateStack.length, comparisonStart);
    }
    this.#comparisonLineChanges = lineChanges;
  }
  #getPreviousEndState(line) {
    let previousLine = line;
    for (let index = this.#comparisonLineChanges.length - 1; index >= 0; index--) {
      const [startLine, endLine, lineDelta] = this.#comparisonLineChanges[index];
      if (lineDelta === 0) continue;
      if (previousLine > endLine) previousLine -= lineDelta;
      else if (previousLine > startLine) return this.#stateStack[line];
    }
    return this.#comparisonStateStack[previousLine - this.#comparisonStateStackStart] ?? this.#stateStack[line];
  }
  #buildStateStack(endAt, timeBudget) {
    const boundedEndAt = Math.min(Math.max(0, endAt), this.#textDocument.lineCount);
    if (this.#stateStack.length > boundedEndAt || this.#grammar === void 0) return true;
    const startedAt = timeBudget === void 0 ? 0 : performance.now();
    let line = this.#stateStack.length - 1;
    let state = this.#stateStack[line] ?? INITIAL;
    while (line < boundedEndAt) {
      this.#stateStack[line] = state;
      const lineText = this.#textDocument.getLineText(line);
      if (lineText.length <= this.#tokenizeMaxLineLength && lineText !== "" && lineText.trim() !== "") {
        const result = tokenizeLine(this.#grammar, this.#colorMap, lineText, state, TOKENIZE_TIME_LIMIT, this.#matchBrackets, false);
        this.#cacheBracketIgnoredRanges(line, result.bracketIgnoredRanges);
        state = result.ruleStack;
      } else this.#cacheBracketIgnoredRanges(line, null);
      line++;
      this.#stateStack[line] = state;
      if (timeBudget !== void 0 && performance.now() - startedAt > timeBudget) break;
    }
    return line >= boundedEndAt;
  }
  #backgroundPrebuild(jobId) {
    if (this.#isStopped || this.#isPaused || this.#grammar === void 0 || jobId !== this.#backgroundJobId) return;
    this.#ensureActiveTheme();
    const complete = this.#buildStateStack(this.#backgroundPrebuildEndLine, 1);
    if (this.#isStopped || this.#isPaused || jobId !== this.#backgroundJobId) return;
    if (complete) {
      this.stopBackgroundTokenize();
      return;
    }
    this.#lastLine = this.#stateStack.length - 1;
    this.#postTokenizeMessage(jobId);
  }
  #backgroundTokenize(jobId) {
    if (this.#isStopped || this.#isPaused || this.#grammar === void 0 || jobId !== this.#backgroundJobId) return;
    this.#ensureActiveTheme();
    const t = performance.now();
    const lines = /* @__PURE__ */ new Map();
    const totalLines = this.#textDocument.lineCount;
    const changedLineRanges = this.#backgroundChangedLineRanges;
    let line = this.#lastLine;
    let state = this.#stateStack[line] ?? INITIAL;
    let settled = false;
    let changedRangeIndex = this.#backgroundChangedRangeIndex;
    let currentChangedRangeEnd = changedLineRanges?.[changedRangeIndex]?.[1];
    for (; line < totalLines; ) {
      this.#stateStack[line] = state;
      const previousNextState = currentChangedRangeEnd !== void 0 ? this.#getPreviousEndState(line + 1) : void 0;
      const lineText = this.#textDocument.getLineText(line);
      if (lineText.length > this.#tokenizeMaxLineLength) {
        console.warn(`[diffs] Line(${line}) too long to tokenize: ${lineText.length}`);
        lines.set(line, [[
          0,
          "",
          lineText
        ]]);
        this.#cacheBracketIgnoredRanges(line, null);
      } else if (lineText === "" || lineText.trim() === "") {
        lines.set(line, [[
          0,
          "",
          lineText
        ]]);
        this.#cacheBracketIgnoredRanges(line, null);
      } else {
        const ret = tokenizeLine(this.#grammar, this.#colorMap, lineText, state, TOKENIZE_TIME_LIMIT, this.#matchBrackets);
        lines.set(line, ret.resolvedTokens);
        this.#cacheBracketIgnoredRanges(line, ret.bracketIgnoredRanges);
        state = ret.ruleStack;
      }
      this.#stateStack[line + 1] = state;
      settled = currentChangedRangeEnd !== void 0 && line >= currentChangedRangeEnd && previousNextState !== void 0 && state.equals(previousNextState);
      line++;
      if (settled) {
        changedRangeIndex++;
        const nextRange = changedLineRanges?.[changedRangeIndex];
        if (nextRange === void 0) break;
        currentChangedRangeEnd = nextRange[1];
        if (this.#stateStack[nextRange[0]] === void 0) settled = false;
        else {
          line = nextRange[0];
          state = this.#stateStack[line] ?? state;
          settled = false;
          continue;
        }
      }
      if (performance.now() - t > 1) break;
    }
    this.#onDeferTokenize(lines, this.#themeType);
    if (this.#isStopped || this.#isPaused || jobId !== this.#backgroundJobId) return;
    if (settled || line >= totalLines) {
      const pendingPrebuildEndLine = this.#pendingPrebuildEndLine;
      this.stopBackgroundTokenize();
      if (pendingPrebuildEndLine >= 0) this.#scheduleStatePrebuild(pendingPrebuildEndLine);
      return;
    }
    this.#lastLine = line;
    this.#backgroundChangedRangeIndex = changedRangeIndex;
    this.#postTokenizeMessage(jobId);
  }
};
function tokenizeLine(grammar, colorMap, lineText, stateStack, timeLimit, collectBracketIgnoredRanges = true, resolveTokens = true) {
  const result = grammar.tokenizeLine2(lineText, stateStack, timeLimit);
  if (result.stoppedEarly) console.warn(`[diffs] Time limit reached when tokenizing line: ${lineText.substring(0, 100)}`);
  const rawTokens = result.tokens;
  const tokensLength = rawTokens.length / 2;
  const resolvedTokens = [];
  const bracketIgnoredRanges = [];
  if (!resolveTokens && !collectBracketIgnoredRanges) return {
    ruleStack: result.ruleStack,
    resolvedTokens,
    bracketIgnoredRanges
  };
  for (let j = 0; j < tokensLength; j++) {
    const offset = rawTokens[2 * j];
    const nextOffset = j + 1 < tokensLength ? rawTokens[2 * j + 2] : lineText.length;
    if (offset === nextOffset) continue;
    const metadata = rawTokens[2 * j + 1];
    if (resolveTokens) {
      const fg = EncodedTokenMetadata.getForeground(metadata);
      resolvedTokens.push([
        offset,
        colorMap[fg],
        lineText.slice(offset, nextOffset)
      ]);
    }
    if (collectBracketIgnoredRanges && EncodedTokenMetadata.getTokenType(metadata) > 0) bracketIgnoredRanges.push([offset, nextOffset]);
  }
  return {
    ruleStack: result.ruleStack,
    resolvedTokens,
    bracketIgnoredRanges
  };
}
function renderLineTokens(tokens) {
  return tokens.map(([char, fg, textContent]) => {
    if (char === 0 && fg === "") {
      if (textContent === "") return h("br");
      return textContent;
    }
    return h("span", {
      dataset: { char: char.toString() },
      style: `color:${fg};`,
      textContent
    });
  });
}
function isGrammarlessLanguage(languageId) {
  return languageId === "text" || languageId === "ansi";
}
function getShadowRootRange(shadowRoot) {
  const selection = shadowRoot.getSelection?.();
  if (selection == null || selection.rangeCount === 0) return;
  const range = selection.getRangeAt(0);
  return {
    collapsed: range.collapsed,
    startContainer: range.startContainer,
    startOffset: range.startOffset,
    endContainer: range.endContainer,
    endOffset: range.endOffset
  };
}
function requirePersistedCacheKey(file) {
  if (typeof file.cacheKey !== "string" || file.cacheKey.length === 0) throw new Error(`Editor persistState requires a non-empty file.cacheKey for "${file.name}". Provide a unique, stable cacheKey for every editable file.`);
  return file.cacheKey;
}
function isPromise(value) {
  return typeof value === "object" && value !== null && "then" in value && typeof value.then === "function";
}
const MAX_EDIT_WIDEN_WINDOW_MULTIPLE = 2;
const MAX_WRAP_OFFSETS_CACHE_LINES = 1e4;
const SELECTION_ACTION_POPOVER_PLACEMENT_KEY = "selection-action";
const MULTI_SELECTION_CLIPBOARD_TYPE = "application/vnd.pierre.diffs-selections+json";
var Editor = class {
  #options;
  #metrics = new Metrics();
  #tokenizer;
  #popoverManager;
  #textDocumentCache = /* @__PURE__ */ new Map();
  #stateStorage;
  #stateStorageOption;
  #pendingStateWrites = /* @__PURE__ */ new Map();
  #pendingStateRestore;
  #stateRestoreGeneration = 0;
  #restoreStateOnNextSync = false;
  #editorEventDisposes;
  #globalEventDisposes;
  #selectEventDisposes;
  #detach;
  #attachState = {
    generation: 0,
    callback: void 0,
    delivered: false
  };
  #contentOffset;
  #gutterWidthCache;
  #contentWidthCache;
  #lineYCache = /* @__PURE__ */ new Map();
  #wrapLineOffsetsCache = /* @__PURE__ */ new Map();
  #lineElementsCache = /* @__PURE__ */ new Map();
  #lastAccessedCharX;
  #globalStyleElement;
  #editorStyleElement;
  #themeStyleElement;
  #spriteElement;
  #fileContainer;
  #gutterElement;
  #contentElement;
  #overlayElement;
  #overlayElements;
  #primaryCaretElement;
  #resizeObserver;
  #fileInstance;
  #fileInfo;
  #lineAnnotations;
  #textDocument;
  #renderRange;
  #viewportWindowLines;
  #markerRenderer;
  #searchPanel;
  #selectionAction;
  #canMountSelectionAction = true;
  #shouldIgnoreSelectionChange = false;
  #suppressNativeSelectionSync = false;
  #contentHasFocus = false;
  #replacementFocusRequest;
  #isComposing = false;
  #isGutterMouseDown = false;
  #isContentMouseDown = false;
  #shiftKeyPressed = false;
  #selectionStart;
  #deletedSelectionText = "";
  #reservedSelections;
  #initSelections;
  #selections;
  #matches;
  #scrollingToLine;
  #scrollingToLineChar;
  #scrollingToLineFixed = false;
  #scrollingToLineNoFocus = false;
  #retainSearchPanelFocus = false;
  #fontRemeasureScheduled = false;
  #themeSelectionRefreshFrame;
  #onDeferTokenize = (lines, themeType) => {
    this.#fileInstance?.updateRenderCache(lines, themeType);
    if (this.#renderRange !== void 0 && this.#renderRange.totalLines !== Infinity) {
      const { startingLine, totalLines } = this.#renderRange;
      const endLine = Math.min(startingLine + totalLines, this.#textDocument?.lineCount ?? 0);
      for (const [line, tokens] of lines) if (line >= startingLine && line < endLine) {
        const lineElement = this.#getLineElement(line);
        if (lineElement !== void 0) lineElement.replaceChildren(...renderLineTokens(tokens));
      }
    }
  };
  constructor(options = {}) {
    this.#options = options;
  }
  setOptions(options) {
    const previousStorageOption = this.#options.persistStateStorage ?? "inMemory";
    const nextOptions = {
      ...this.#options,
      ...options
    };
    if (nextOptions.persistState === true && this.#fileInstance?.type === "file") {
      const file = this.#fileInstance.__getCurrentFile?.() ?? this.#fileInfo;
      if (file !== void 0) requirePersistedCacheKey(file);
    }
    this.#options = nextOptions;
    if (this.#options.persistState !== true) {
      this.#textDocumentCache.clear();
      this.#stateRestoreGeneration++;
      this.#restoreStateOnNextSync = false;
    }
    if ((this.#options.persistStateStorage ?? "inMemory") !== previousStorageOption) {
      this.#stateRestoreGeneration++;
      this.#stateStorage = void 0;
      this.#stateStorageOption = void 0;
      this.#pendingStateWrites.clear();
    }
  }
  edit(fileInstance) {
    if (this.#options.persistState === true && fileInstance.type === "file") {
      const file = fileInstance.__getCurrentFile?.();
      if (file !== void 0) requirePersistedCacheKey(file);
    }
    this.#invalidateOnAttach();
    this.#fileInstance = fileInstance;
    this.#initialize();
    this.#detach = fileInstance.attachEditor(this);
    return () => this.cleanUp();
  }
  /**
  * Apply edits to current attached file. Every edit joins the undo timeline:
  * a programmatic edit must leave the document and its history exactly as
  * the same edit typed by the user would (history equivalence — see
  * TextDocument.applyResolvedEdits), so it is undoable like any other edit.
  *
  * @param updateHistory Whether to record caller selection snapshots for
  * exact undo/redo restoration. Defaults to true. When false, live selections
  * are remapped during replay and the text edit still joins the undo timeline.
  */
  applyEdits(edits, updateHistory = true) {
    const textDocument = this.#textDocument;
    if (textDocument == null) throw new Error("Editor is not attached");
    const wasFocused = this.#contentHasFocus;
    const selectionsBefore = this.#selections;
    const selectionOffsetsBefore = selectionsBefore?.map((selection) => [textDocument.offsetAt(selection.start), textDocument.offsetAt(selection.end)]);
    const resolvedEditOffsets = selectionsBefore === void 0 ? void 0 : textDocument.resolveEdits(edits).sort((a, b) => a.start - b.start);
    const change = textDocument.applyEdits(edits, updateHistory, selectionsBefore);
    if (change === void 0) return;
    let nextSelections;
    if (selectionsBefore !== void 0 && selectionOffsetsBefore !== void 0 && resolvedEditOffsets !== void 0) {
      nextSelections = remapSelectionsAfterEdits(textDocument, selectionsBefore, selectionOffsetsBefore, resolvedEditOffsets);
      if (updateHistory) textDocument.setLastUndoSelectionsAfter(nextSelections);
    }
    this.#applyChange(change, nextSelections, this.#applyChangeToLineAnnotations(change), { skipFocus: !wasFocused });
  }
  /** Whether there is an edit to undo. */
  get canUndo() {
    return this.#textDocument?.canUndo ?? false;
  }
  /** Whether there is an undone edit to redo. */
  get canRedo() {
    return this.#textDocument?.canRedo ?? false;
  }
  /** Undo the last edit. Does nothing when there is nothing to undo. */
  undo() {
    this.#runCommand("undo");
  }
  /** Redo the last undone edit. Does nothing when there is nothing to redo. */
  redo() {
    this.#runCommand("redo");
  }
  getFile() {
    const fileInfo = this.#fileInfo;
    const textDocument = this.#textDocument;
    if (fileInfo === void 0 || textDocument === void 0) return;
    const file = { ...fileInfo };
    Object.defineProperty(file, "contents", {
      enumerable: true,
      get: () => textDocument.getText()
    });
    return file;
  }
  getText() {
    return this.#textDocument?.getText() ?? "";
  }
  getState() {
    const fileInstance = this.#fileInstance;
    return {
      selections: this.#selections,
      view: fileInstance != null ? { scrollLeft: fileInstance.getCodeScrollLeft() } : void 0
    };
  }
  setState({ selections, view }) {
    if (this.#fileInstance === void 0 || this.#textDocument === void 0) throw new Error("Editor is not attached");
    this.#canMountSelectionAction = false;
    this.#updateSelections(selections ?? []);
    if (view != null) {
      this.#fileInstance.setCodeScrollLeft(view.scrollLeft);
      return;
    }
    this.#scrollToPrimaryCaret();
  }
  setSelections(selections) {
    const textDocument = this.#textDocument;
    if (textDocument === void 0) throw new Error("Text document is not initialized");
    const resolvedSelections = selections.map((selection) => {
      let start = textDocument.normalizePosition(selection.start);
      let end = textDocument.normalizePosition(selection.end);
      let direction = selection.direction === "none" ? 0 : selection.direction === "backward" ? -1 : 1;
      if (comparePosition(start, end) > 0) {
        [start, end] = [end, start];
        if (direction !== 0) direction = direction === 1 ? -1 : 1;
      }
      return {
        direction,
        start,
        end
      };
    });
    this.#canMountSelectionAction = false;
    this.#updateSelections(resolvedSelections);
    const primarySelection = resolvedSelections.at(-1);
    if (primarySelection !== void 0) this.#revealLineIfCollapsed(getCaretPosition(primarySelection).line);
    this.#scrollToPrimaryCaret();
  }
  setMarkers(markers) {
    const textDocument = this.#textDocument;
    if (textDocument === void 0) throw new Error("Text document is not initialized");
    if (markers.length === 0) {
      this.#markerRenderer?.cleanup();
      this.#markerRenderer = void 0;
      this.#updateSelections(this.#selections ?? []);
      return;
    }
    this.#markerRenderer ??= new MarkerRenderer({
      popoverManager: this.#getPopoverManager(),
      getLineHeight: () => this.#metrics.lineHeight,
      getOverlayElement: () => this.#overlayElement,
      getGutterWidth: () => this.#getGutterWidth(),
      getCharX: (line, character) => this.#getCharX(line, character),
      getLineY: (line) => this.#getLineY(line),
      isMouseDown: () => this.#isContentMouseDown || this.#isGutterMouseDown
    });
    this.#markerRenderer.setMarkers(markers, textDocument);
    if (this.#contentElement !== void 0) this.#markerRenderer.listenHover(this.#contentElement);
    this.#updateSelections(this.#selections ?? []);
  }
  focus(options) {
    const preventScroll = options?.preventScroll ?? false;
    const lineNumber = options?.lineNumber;
    if (lineNumber === "first-visible" || typeof lineNumber === "number") {
      const textDocument = this.#textDocument;
      if (textDocument == null || this.#fileInstance == null) return;
      const targetLineNumber = lineNumber === "first-visible" ? this.#getFirstVisibleLineNumber(options?.offset) : lineNumber;
      if (targetLineNumber == null) return;
      const position = textDocument.normalizePosition({
        line: targetLineNumber - 1,
        character: lineNumber === "first-visible" ? 0 : options?.character ?? 0
      });
      this.#focusAtPosition(position, preventScroll);
      return;
    }
    const primarySelection = this.#selections?.at(-1);
    if (primarySelection !== void 0) {
      const pos = primarySelection.direction === -1 ? primarySelection.end : primarySelection.start;
      this.#focus(pos, preventScroll);
    } else this.#focus(void 0, preventScroll);
  }
  blur() {
    this.#replacementFocusRequest = void 0;
    this.#contentHasFocus = false;
    this.#shouldIgnoreSelectionChange = false;
    this.#contentElement?.blur();
  }
  cleanUp(recycle = false) {
    this.#invalidateOnAttach();
    if (!recycle) this.#attachState.delivered = false;
    const hadFileInstance = this.#fileInstance != null;
    const shouldRestoreState = this.#isStatePersistenceEnabled;
    this.#stateRestoreGeneration++;
    this.#persistCurrentState();
    if (hadFileInstance) this.#restoreStateOnNextSync = shouldRestoreState;
    dequeueRender(this.#handleCustomPasteEvent);
    this.#tokenizer?.cleanUp();
    this.#tokenizer = void 0;
    if (!recycle) {
      this.#textDocument = void 0;
      this.#fileInfo = void 0;
    }
    this.#globalEventDisposes?.forEach((dispose) => dispose());
    this.#globalEventDisposes = void 0;
    this.#editorEventDisposes?.forEach((dispose) => dispose());
    this.#editorEventDisposes = void 0;
    this.#selectEventDisposes?.forEach((dispose) => dispose());
    this.#selectEventDisposes = void 0;
    this.#detach?.(recycle);
    this.#detach = void 0;
    this.#gutterWidthCache = void 0;
    this.#contentWidthCache = void 0;
    this.#lineYCache.clear();
    this.#wrapLineOffsetsCache.clear();
    this.#lineElementsCache.clear();
    this.#lastAccessedCharX = void 0;
    this.#globalStyleElement?.remove();
    this.#globalStyleElement = void 0;
    this.#editorStyleElement?.remove();
    this.#editorStyleElement = void 0;
    this.#themeStyleElement?.remove();
    this.#themeStyleElement = void 0;
    this.#spriteElement?.remove();
    this.#spriteElement = void 0;
    this.#fileContainer = void 0;
    this.#popoverManager?.cleanUp();
    this.#popoverManager = void 0;
    this.#gutterElement = void 0;
    this.#contentElement?.removeAttribute("contentEditable");
    this.#contentElement = void 0;
    this.#replacementFocusRequest = void 0;
    this.#contentHasFocus = false;
    this.#overlayElement?.remove();
    this.#overlayElement = void 0;
    this.#resizeObserver?.disconnect();
    this.#resizeObserver = void 0;
    this.#fontRemeasureScheduled = false;
    if (this.#themeSelectionRefreshFrame !== void 0) {
      cancelAnimationFrame(this.#themeSelectionRefreshFrame);
      this.#themeSelectionRefreshFrame = void 0;
    }
    this.#resetState();
    this.#fileInstance = void 0;
  }
  /** @internal Capture outgoing state and substitute cached text before render. */
  __prepareFile(file) {
    if (this.#options.persistState !== true) return file;
    const cacheKey = requirePersistedCacheKey(file);
    const fileInfo = this.#fileInfo;
    const languageId = file.lang ?? getFiletypeFromFileName(file.name);
    if (fileInfo !== void 0 && (requirePersistedCacheKey(fileInfo) !== cacheKey || fileInfo.name !== file.name || this.#textDocument?.languageId !== languageId)) {
      this.#stateRestoreGeneration++;
      this.#persistCurrentState();
    }
    const textDocument = this.#getCachedTextDocument(file, cacheKey);
    if (textDocument === void 0 || textDocument.getText() === file.contents) return file;
    return {
      ...file,
      contents: textDocument.getText()
    };
  }
  /** @internal */
  __postponeBgTokenizeToNextFrame() {
    const tokenizer = this.#tokenizer;
    if (tokenizer !== void 0) {
      tokenizer.pauseBackgroundTokenize();
      requestAnimationFrame(() => {
        tokenizer.resumeBackgroundTokenize();
      });
    }
  }
  /** @internal */
  __captureFocusForDOMReplacement() {
    const contentElement = this.#contentElement;
    const shadowActiveElement = this.#fileContainer?.shadowRoot?.activeElement;
    if (contentElement != null && (this.#contentHasFocus || shadowActiveElement === contentElement || shadowActiveElement != null && contentElement.contains(shadowActiveElement))) this.#replacementFocusRequest = {};
  }
  /** @internal */
  __syncRenderView = (highlighter, fileContainer, fileOrDiff, lineAnnotations, renderRange) => {
    const fileInstance = this.#fileInstance;
    if (fileInstance == null) return;
    const shadowRoot = fileContainer.shadowRoot;
    if (shadowRoot == null) {
      console.error("[editor] Could not find the shadow root.");
      return;
    }
    let codeElement;
    let gutterEl;
    let contentEl;
    for (const el of shadowRoot.querySelectorAll("[data-code]")) if (el.dataset.deletions === void 0) {
      codeElement = el;
      for (const child of el.children) {
        const el2 = child;
        const { gutter, content } = el2.dataset;
        if (gutter !== void 0) gutterEl = el2;
        else if (content !== void 0) contentEl = el2;
      }
      break;
    }
    if (codeElement === void 0 || contentEl === void 0) {
      this.#replacementFocusRequest = void 0;
      return;
    }
    this.#getPopoverManager().setViewportElements(fileContainer, codeElement);
    if (this.#fileContainer !== fileContainer) {
      this.#fileContainer = fileContainer;
      if (this.#globalStyleElement !== void 0) fileContainer.appendChild(this.#globalStyleElement);
      if (this.#editorStyleElement !== void 0) shadowRoot.appendChild(this.#editorStyleElement);
      if (this.#themeStyleElement !== void 0) shadowRoot.appendChild(this.#themeStyleElement);
      if (this.#spriteElement !== void 0) shadowRoot.prepend(this.#spriteElement);
    }
    const shouldRebuildDocument = this.#textDocument === void 0 || this.#fileInfo === void 0 || this.#fileInfo.name !== fileOrDiff.name || this.#fileInfo.lang !== fileOrDiff.lang || this.#fileInfo.cacheKey !== fileOrDiff.cacheKey;
    const persistedCacheKey = this.#isStatePersistenceEnabled ? requirePersistedCacheKey(fileOrDiff) : void 0;
    let persistedStateTarget;
    if (shouldRebuildDocument) {
      this.#invalidateOnAttach();
      let contents = "";
      if ("contents" in fileOrDiff) contents = fileOrDiff.contents;
      else contents = fileOrDiff.additionLines.join("");
      const editStack = new EditStack({ maxEntries: this.#options.historyMaxEntries });
      const { name, lang, cacheKey } = fileOrDiff;
      const languageId = lang ?? getFiletypeFromFileName(fileOrDiff.name);
      const textDocument2 = (persistedCacheKey !== void 0 ? this.#getCachedTextDocument(fileOrDiff, persistedCacheKey) : void 0) ?? new TextDocument(fileOrDiff.name, contents, languageId, 0, editStack);
      this.#fileInfo = {
        name,
        lang,
        cacheKey
      };
      this.#textDocument = textDocument2;
      if (persistedCacheKey !== void 0) {
        this.#textDocumentCache.set(persistedCacheKey, textDocument2);
        persistedStateTarget = {
          cacheKey: persistedCacheKey,
          textDocument: textDocument2
        };
      }
      this.#tokenizer?.cleanUp();
      this.#tokenizer = void 0;
      this.#resetState();
      this.#wrapLineOffsetsCache.clear();
      this.#selections = this.#initSelections;
      if (this.#textDocument !== void 0 && this.#options.__debug === true) console.log("[diffs/editor] text document rebuilt from", fileOrDiff.name);
    }
    if (persistedStateTarget === void 0 && this.#restoreStateOnNextSync && persistedCacheKey !== void 0 && this.#textDocument !== void 0) persistedStateTarget = {
      cacheKey: persistedCacheKey,
      textDocument: this.#textDocument
    };
    const textDocument = this.#textDocument;
    if (this.#tokenizer == null && textDocument != null) this.#tokenizer = new EditorTokenizer({
      highlighter,
      textDocument,
      codeOptions: this.#fileInstance?.__getEffectiveCodeOptions() ?? {},
      matchBrackets: this.#options.matchBrackets,
      onDeferTokenize: this.#onDeferTokenize,
      onThemeChange: () => this.#scheduleThemeSelectionRefresh(),
      setStyle: (css) => {
        this.#themeStyleElement.textContent = css;
      },
      __debug: this.#options.__debug
    });
    if (this.#contentElement !== contentEl) {
      this.#gutterElement = gutterEl;
      this.#contentElement = extend(contentEl, {
        contentEditable: "true",
        role: "textbox",
        ariaMultiLine: "true",
        autocapitalize: "off",
        writingSuggestions: "off",
        autocorrect: false,
        spellcheck: false,
        translate: false
      });
      if (this.#overlayElement !== void 0) contentEl.after(this.#overlayElement);
      this.#metrics.init(contentEl);
      this.#remeasureMetricsOnFontLoad();
      this.#listenContentElement(contentEl, gutterEl);
      if (this.#contentElement !== void 0 && this.#options.__debug === true) console.log("[diffs/editor] full re-render triggered !!!");
    }
    if (this.#replacementFocusRequest != null) this.#replacementFocusRequest.target = contentEl;
    if (contentEl.ariaLabel !== fileOrDiff.name) contentEl.ariaLabel = fileOrDiff.name;
    if (lineAnnotations !== void 0 && lineAnnotations.length > 0 || this.#isDiff) for (const child of this.#contentElement.children) {
      const el = child;
      const { lineAnnotation, lineType, separator } = el.dataset;
      if (lineAnnotation !== void 0 || separator !== void 0 || lineType === "change-deletion") el.setAttribute("contenteditable", "false");
    }
    this.#resetCache();
    this.#tokenizer?.syncTheme(this.#fileInstance?.__getEffectiveCodeOptions() ?? {});
    this.#lineAnnotations = lineAnnotations;
    this.#renderRange = renderRange;
    this.#viewportWindowLines = renderRange?.totalLines;
    this.#tokenizer?.prebuildStateStack(renderRange);
    this.#markerRenderer?.removePopover();
    if (this.#selections !== void 0 || this.#matches !== void 0 || this.#markerRenderer !== void 0) this.#updateSelections(this.#selections ?? []);
    if (this.#initSelections !== void 0 && this.#primaryCaretElement !== void 0) {
      this.#initSelections = void 0;
      this.#scrollToPrimaryCaret(false, "center");
    } else if (this.#scrollingToLine !== void 0) this.#scrollToLine(this.#scrollingToLine, this.#scrollingToLineChar, this.#scrollingToLineNoFocus);
    else if (this.#replacementFocusRequest !== void 0) this.#restoreReplacementFocus();
    else if (this.#selections !== void 0 && this.#selections.length > 0 && this.#contentHasFocus && !this.#retainSearchPanelFocus) this.focus({ preventScroll: true });
    if (this.#retainSearchPanelFocus) this.#searchPanel?.focus();
    if (this.#options.__debug === true && renderRange !== void 0) {
      const { startingLine, totalLines } = renderRange;
      console.log("[diffs/editor] render file:", fileOrDiff.name, "RenderRange:", startingLine + "-" + (startingLine + totalLines), "of", this.#textDocument?.lineCount, "lines");
    }
    if (persistedStateTarget !== void 0) {
      this.#restoreStateOnNextSync = false;
      this.#restorePersistedState(persistedStateTarget.cacheKey, persistedStateTarget.textDocument);
    }
    this.#scheduleOnAttach(fileInstance);
  };
  get #isStatePersistenceEnabled() {
    return this.#options.persistState === true && this.#fileInstance?.type === "file";
  }
  #getCachedTextDocument(file, cacheKey) {
    const textDocument = this.#textDocumentCache.get(cacheKey);
    const languageId = file.lang ?? getFiletypeFromFileName(file.name);
    return textDocument?.languageId === languageId ? textDocument : void 0;
  }
  #getStateStorage() {
    const option = this.#options.persistStateStorage ?? "inMemory";
    if (this.#stateStorage === void 0 || this.#stateStorageOption !== option) {
      this.#stateStorage = createStateStorage(option);
      this.#stateStorageOption = option;
    }
    return this.#stateStorage;
  }
  #persistCurrentState() {
    const fileInfo = this.#fileInfo;
    const textDocument = this.#textDocument;
    if (!this.#isStatePersistenceEnabled || fileInfo === void 0 || textDocument === void 0) return;
    const cacheKey = requirePersistedCacheKey(fileInfo);
    this.#textDocumentCache.set(cacheKey, textDocument);
    let storage;
    try {
      storage = this.#getStateStorage();
    } catch {
      return;
    }
    const state = cloneEditorState(this.getState());
    const pendingRestore = this.#pendingStateRestore;
    if (pendingRestore?.cacheKey === cacheKey && pendingRestore.textDocument === textDocument) {
      this.#pendingStateRestore = void 0;
      if (textDocument.version === pendingRestore.documentVersion && this.#selections === pendingRestore.selections && state.view?.scrollLeft === pendingRestore.view?.scrollLeft) return;
      this.#writeState(storage, cacheKey, state, pendingRestore.completion);
      return;
    }
    this.#writeState(storage, cacheKey, state);
  }
  #writeState(storage, cacheKey, state, waitFor) {
    const previousWrite = this.#pendingStateWrites.get(cacheKey);
    if (waitFor !== void 0 || previousWrite !== void 0) {
      let pending = waitFor ?? Promise.resolve();
      if (previousWrite !== void 0) pending = pending.then(() => previousWrite);
      this.#trackStateWrite(cacheKey, pending.then(() => storage.set(cacheKey, state)));
      return;
    }
    let result;
    try {
      result = storage.set(cacheKey, state);
    } catch {
      return;
    }
    if (!isPromise(result)) return;
    this.#trackStateWrite(cacheKey, result);
  }
  #trackStateWrite(cacheKey, result) {
    const pending = result.catch(() => {
    });
    this.#pendingStateWrites.set(cacheKey, pending);
    pending.finally(() => {
      if (this.#pendingStateWrites.get(cacheKey) === pending) this.#pendingStateWrites.delete(cacheKey);
    });
  }
  #restorePersistedState(cacheKey, textDocument) {
    const generation = ++this.#stateRestoreGeneration;
    const documentVersion = textDocument.version;
    const selections = this.#selections;
    const view = this.getState().view;
    const applyState = (state) => {
      const currentView = this.getState().view;
      if (state === void 0 || generation !== this.#stateRestoreGeneration || this.#textDocument !== textDocument || textDocument.version !== documentVersion || this.#selections !== selections || currentView?.scrollLeft !== view?.scrollLeft || this.#fileInfo === void 0 || requirePersistedCacheKey(this.#fileInfo) !== cacheKey) return;
      this.setState(cloneEditorState(state));
    };
    const readState = () => {
      let result2;
      try {
        result2 = this.#getStateStorage().get(cacheKey);
      } catch {
        return;
      }
      if (isPromise(result2)) return result2.then(applyState).catch(() => {
      });
      else try {
        applyState(result2);
      } catch {
      }
    };
    const pendingWrite = this.#pendingStateWrites.get(cacheKey);
    const result = pendingWrite === void 0 ? readState() : pendingWrite.then(readState);
    if (isPromise(result)) {
      const pendingRestore = {
        cacheKey,
        textDocument,
        documentVersion,
        selections,
        view,
        completion: result.catch(() => {
        })
      };
      this.#pendingStateRestore = pendingRestore;
      pendingRestore.completion.finally(() => {
        if (this.#pendingStateRestore === pendingRestore) this.#pendingStateRestore = void 0;
      });
    }
  }
  #isLineRenderable(line) {
    return this.#fileInstance?.isLineRenderable?.(line + 1) ?? true;
  }
  get #resolveRenderableLine() {
    const fileInstance = this.#fileInstance;
    if (fileInstance?.getNearestRenderableLine == null) return;
    return (line, direction) => {
      const nearest = fileInstance.getNearestRenderableLine(line + 1, direction);
      return nearest == null ? void 0 : nearest - 1;
    };
  }
  #revealLineIfCollapsed(line) {
    if (!this.#isLineRenderable(line)) this.#fileInstance?.revealLine?.(line + 1);
  }
  get #diffSyle() {
    return this.#fileInstance?.options.diffStyle ?? "split";
  }
  get #isDiff() {
    return this.#fileInstance?.type === "file-diff";
  }
  get #isWrap() {
    return this.#fileInstance?.options.overflow === "wrap";
  }
  #getPopoverManager() {
    return this.#popoverManager ??= new PopoverManager({
      hasActivePopover: () => this.#selectionAction !== void 0 || this.#markerRenderer?.isPopoverVisible() === true,
      updateActivePopover: () => {
        this.#updateSelectionActionPopover();
        this.#markerRenderer?.updatePopoverPosition();
      }
    });
  }
  #resetCache() {
    this.#lineYCache.clear();
    this.#lineElementsCache.clear();
    this.#lastAccessedCharX = void 0;
  }
  #resetState() {
    this.#setEditorActiveLineSafe(null);
    this.#gutterWidthCache = void 0;
    this.#contentWidthCache = void 0;
    this.#shouldIgnoreSelectionChange = false;
    this.#suppressNativeSelectionSync = false;
    this.#overlayElements?.forEach((el) => el.remove());
    this.#overlayElements = void 0;
    this.#selections = void 0;
    this.#reservedSelections = void 0;
    this.#scrollingToLine = void 0;
    this.#markerRenderer?.cleanup();
    this.#markerRenderer = void 0;
    this.#searchPanel?.cleanup();
    this.#searchPanel = void 0;
    this.#selectionAction?.cleanup();
    this.#selectionAction = void 0;
    this.#canMountSelectionAction = true;
  }
  #invalidateOnAttach() {
    const attachState = this.#attachState;
    attachState.generation++;
    if (attachState.callback != null) {
      dequeueRender(attachState.callback);
      attachState.callback = void 0;
    }
  }
  #scheduleOnAttach(fileInstance) {
    const attachState = this.#attachState;
    const textDocument = this.#textDocument;
    if (attachState.delivered || attachState.callback != null || textDocument == null) return;
    const { generation } = attachState;
    const callback = () => {
      if (attachState.callback !== callback) return;
      attachState.callback = void 0;
      if (generation !== attachState.generation || this.#fileInstance !== fileInstance || this.#textDocument !== textDocument) return;
      const contentElement = this.#contentElement;
      const shadowRoot = this.#fileContainer?.shadowRoot;
      if (contentElement == null || shadowRoot == null || !shadowRoot.contains(contentElement)) return;
      attachState.delivered = true;
      this.#options.onAttach?.(this, fileInstance);
    };
    attachState.callback = callback;
    queueRender(callback);
  }
  #initialize() {
    this.#globalStyleElement = h("style", {
      dataset: "editorGlobalCss",
      textContent: `
        [data-annotation-slot] {
          user-select: none;
          -webkit-user-select: none;
        }
      `
    });
    this.#editorStyleElement = h("style", {
      dataset: "editorCss",
      textContent: editor_default
    });
    this.#themeStyleElement = h("style", { dataset: "editorThemeCss" });
    this.#spriteElement = createSpriteElement();
    this.#overlayElement = h("div", { dataset: "editorOverlay" });
    const replacementFocusTargetIsContent = (event) => {
      const target = event.composedPath()[0];
      return target instanceof Node && this.#contentElement?.contains(target) === true;
    };
    const cancelReplacementFocus = () => {
      if (this.#replacementFocusRequest == null) return;
      this.#replacementFocusRequest = void 0;
      this.#contentHasFocus = false;
      this.#shouldIgnoreSelectionChange = false;
    };
    this.#globalEventDisposes = [
      addEventListener(document, "focusin", (event) => {
        if (!replacementFocusTargetIsContent(event)) cancelReplacementFocus();
      }, { passive: true }),
      addEventListener(document, "pointerdown", (event) => {
        if (!replacementFocusTargetIsContent(event)) queueMicrotask(cancelReplacementFocus);
      }, {
        capture: true,
        passive: true
      }),
      addEventListener(document, "selectionchange", () => {
        const shadowRoot = this.#fileContainer?.shadowRoot;
        if (this.#shouldIgnoreSelectionChange || this.#suppressNativeSelectionSync || shadowRoot == null || !this.#contentHasFocus) return;
        if (this.#selections !== void 0 && this.#selections.length > 1 && !this.#isContentMouseDown) return;
        const selectionRaw = document.getSelection();
        if (selectionRaw == null) return;
        const composedRange = typeof selectionRaw.getComposedRanges === "function" ? selectionRaw.getComposedRanges({ shadowRoots: [shadowRoot] })?.[0] : getShadowRootRange(shadowRoot);
        if (composedRange === void 0 || !this.#rangeBelongsToEditor(composedRange)) return;
        let selection = convertSelection(composedRange, 0);
        if (selection === void 0) return;
        if (this.#isContentMouseDown && this.#shiftKeyPressed && this.#selections !== void 0 && this.#selections.length > 0) {
          const primarySelection = this.#selections.at(-1);
          this.#updateSelections([extendSelection(primarySelection, selection)]);
          return;
        }
        if (this.#isContentMouseDown) if (this.#selectionStart !== void 0) selection = createSelectionFrom(this.#selectionStart, selection);
        else this.#selectionStart = selection;
        else if (this.#selectionStart !== void 0) selection.direction = createSelectionFrom(this.#selectionStart, selection).direction;
        else if (this.#selections !== void 0 && this.#selections.length === 1) {
          const previous = this.#selections[0];
          if (comparePosition(previous.start, selection.start) === 0 && comparePosition(previous.end, selection.end) === 0) selection.direction = previous.direction;
        }
        if (this.#reservedSelections !== void 0) this.#updateSelections([...this.#reservedSelections.filter((reservedSelection) => !selectionIntersects(reservedSelection, selection)), selection]);
        else this.#updateSelections([selection]);
      }, { passive: true }),
      addEventListener(document, "pointerup", (e) => {
        if (e.pointerType !== "mouse") return;
        this.#selectEventDisposes?.forEach((dispose) => dispose());
        this.#selectEventDisposes = void 0;
        if (this.#isGutterMouseDown) {
          this.#isGutterMouseDown = false;
          this.#focus();
        }
        this.#shouldIgnoreSelectionChange = false;
        this.#isContentMouseDown = false;
        this.#shiftKeyPressed = false;
        this.#selectionStart = void 0;
        this.#reservedSelections = void 0;
        if (this.#options.enabledSelectionAction === true && this.#selections !== void 0 && this.#selections.length > 0 && !isCollapsedSelection(this.#selections.at(-1))) this.#updateSelections(this.#selections);
      }, { passive: true }),
      addEventListener(document, "keydown", (e) => {
        if (e.key === "Shift") this.#selectionStart = this.#selections?.at(-1);
      }, { passive: true }),
      addEventListener(document, "keyup", (e) => {
        if (e.key === "Shift") this.#selectionStart = void 0;
      }, { passive: true })
    ];
  }
  #replaceSelectEventListeners(disposes) {
    this.#selectEventDisposes?.forEach((dispose) => dispose());
    this.#selectEventDisposes = disposes;
  }
  #isLineSelectionEnabled() {
    return this.#fileInstance?.options.enableLineSelection === true;
  }
  #preserveEditorSelectionsForGutterGesture() {
    this.#suppressNativeSelectionSync = this.#selections !== void 0;
  }
  #listenContentElement(contentEl, gutterEl) {
    const { onFocus, onBlur } = this.#options;
    const targetIsContentElement = (e) => {
      const target = e.composedPath()[0];
      return target !== void 0 && (target === contentEl || contentEl.contains(target));
    };
    this.#editorEventDisposes?.forEach((dispose) => dispose());
    this.#editorEventDisposes = [
      addEventListener(contentEl, "focus", () => {
        this.#contentHasFocus = true;
        onFocus?.();
        if (!this.#isContentMouseDown && !this.#shouldIgnoreSelectionChange && this.#selections !== void 0 && this.#selections.length > 0) this.#setWindowSelection(this.#selections.at(-1));
      }, { passive: true }),
      addEventListener(contentEl, "blur", () => {
        if (this.#replacementFocusRequest?.target === contentEl) {
          this.#replacementFocusRequest = void 0;
          this.#shouldIgnoreSelectionChange = false;
        }
        this.#contentHasFocus = false;
        onBlur?.();
      }, { passive: true }),
      addEventListener(contentEl, "pointerdown", (e) => {
        this.#canMountSelectionAction = true;
        this.#suppressNativeSelectionSync = false;
        if (e.pointerType !== "mouse") return;
        if (this.#isDeletedLineTarget(e)) {
          this.#setDeletedTextSelectionActive(true);
          if (this.#selections !== void 0) this.#updateSelections([]);
          return;
        }
        this.#setDeletedTextSelectionActive(false);
        this.#markerRenderer?.removePopover();
        if (isSafari() && this.#lineAnnotations !== void 0 && this.#lineAnnotations.length > 0) {
          const annotationDisposes = [...contentEl.querySelectorAll("[data-line-annotation]")].map((el) => [addEventListener(el, "mouseenter", () => {
            this.#shouldIgnoreSelectionChange = true;
          }), addEventListener(el, "mouseleave", () => {
            this.#shouldIgnoreSelectionChange = false;
          })]).flat();
          this.#replaceSelectEventListeners(annotationDisposes);
        }
        this.#isContentMouseDown = true;
        this.#selectionStart = void 0;
        if (e.button === 0 && isPrimaryModifier(e)) this.#reservedSelections = this.#selections?.map((selection) => ({ ...selection }));
        if (e.shiftKey) {
          const primarySelection = this.#selections?.at(-1);
          if (primarySelection !== void 0) {
            const pos = primarySelection.direction === -1 ? primarySelection.end : primarySelection.start;
            this.#setWindowSelection({
              start: pos,
              end: pos,
              direction: 0
            });
          }
          this.#shiftKeyPressed = true;
        }
      }, { passive: true }),
      addEventListener(contentEl, "keydown", (e) => {
        if (!targetIsContentElement(e)) return;
        this.#canMountSelectionAction = true;
        this.#suppressNativeSelectionSync = false;
        const command = resolveEditorCommandFromKeyboardEvent(e, this.#options.keymap);
        if (command !== void 0) {
          e.preventDefault();
          if (command === "simplifySelection") {
            this.#searchPanel?.close();
            this.#searchPanel = void 0;
            this.#retainSearchPanelFocus = false;
            this.#selectionAction?.cleanup();
            this.#selectionAction = void 0;
          }
          this.#runCommand(command);
          return;
        }
        const mvShortcut = isMoveCursorShortcut(e);
        const textDocument = this.#textDocument;
        if (this.#selections !== void 0 && this.#selections.length > 0 && mvShortcut !== void 0 && textDocument !== void 0) {
          const cursorMoveOptions = {
            getSoftLineOffsets: this.#isWrap ? (line) => this.#wrapLineTextOrWholeLine(line) : void 0,
            resolveRenderableLine: this.#resolveRenderableLine
          };
          if (e.shiftKey) this.#updateSelections(mapSelectionShift(textDocument, this.#selections, mvShortcut, cursorMoveOptions));
          else this.#updateSelections(mapCursorMove(textDocument, this.#selections, mvShortcut, cursorMoveOptions));
          this.#scrollToPrimaryCaret();
          e.preventDefault();
          return;
        }
        if ((e.key.length === 1 ? e.key.toLowerCase() : e.key) === "v" && isPrimaryModifier(e)) {
          if (e.repeat && this.#isDiff) {
            e.preventDefault();
            return;
          }
          if (this.#options.clipboard !== void 0) {
            e.preventDefault();
            queueRender(this.#handleCustomPasteEvent);
            return;
          }
        }
        if (this.#searchPanel !== void 0) {
          const findAgain = resolveFindAgainShortcut(e);
          if (findAgain !== void 0) {
            e.preventDefault();
            this.#searchPanel.navigate(findAgain === "previous");
            return;
          }
        }
      }),
      addEventListener(contentEl, "copy", (e) => {
        if (!targetIsContentElement(e)) return;
        e.preventDefault();
        if (this.#isDeletedTextSelectionActive()) e.clipboardData?.setData("text", this.#deletedTextForClipboard());
        else this.#writeSelectionClipboardData(e.clipboardData, this.#getSelectionText(), this.#getSelectionClipboardTexts());
      }),
      addEventListener(contentEl, "cut", (e) => {
        if (!targetIsContentElement(e)) return;
        e.preventDefault();
        if (this.#isDeletedTextSelectionActive()) e.clipboardData?.setData("text", this.#deletedTextForClipboard());
        else {
          const selectionTexts = this.#getSelectionClipboardTexts();
          this.#writeSelectionClipboardData(e.clipboardData, this.#cutSelectionText(), selectionTexts);
        }
      }),
      addEventListener(contentEl, "paste", (e) => {
        if (!targetIsContentElement(e)) return;
        e.preventDefault();
        const clipboardData = e.clipboardData;
        const textDocument = this.#textDocument;
        if (clipboardData === null || textDocument === void 0) return;
        let text = clipboardData.getData("text");
        const selectionCount = this.#selections?.length ?? 0;
        if (selectionCount > 1) {
          const multiSelectionText = clipboardData.getData(MULTI_SELECTION_CLIPBOARD_TYPE);
          if (multiSelectionText !== void 0) try {
            const selectionTexts = JSON.parse(multiSelectionText);
            if (Array.isArray(selectionTexts) && selectionTexts.length === selectionCount) text = selectionTexts;
          } catch {
          }
        }
        this.#replaceSelectionText(Array.isArray(text) ? text.map((t) => textDocument.normalizeEol(t)) : textDocument.normalizeEol(text), void 0, true, "document");
      }),
      addEventListener(contentEl, "beforeinput", (e) => {
        if (!targetIsContentElement(e)) return;
        if (e.inputType === "insertCompositionText") return;
        e.preventDefault();
        this.#handleInput(e.inputType, e.data);
      }),
      addEventListener(contentEl, "drop", (e) => {
        if (!targetIsContentElement(e)) return;
        e.preventDefault();
      }),
      addEventListener(contentEl, "compositionstart", (e) => {
        if (!targetIsContentElement(e)) return;
        this.#isComposing = true;
        this.#shouldIgnoreSelectionChange = true;
      }, { passive: true }),
      addEventListener(contentEl, "compositionend", (e) => {
        if (!targetIsContentElement(e)) return;
        this.#shouldIgnoreSelectionChange = false;
        const wasComposing = this.#isComposing;
        this.#isComposing = false;
        if (e.data !== "" || !wasComposing) this.#handleInput("insertText", e.data);
      }, { passive: true })
    ];
    const deletionsCode = this.#fileContainer?.shadowRoot?.querySelector("[data-deletions]");
    if (deletionsCode != null) this.#editorEventDisposes.push(addEventListener(deletionsCode, "pointerdown", (e) => {
      const path = e.composedPath();
      if (isGutterUtilityPath(path)) {
        this.#preserveEditorSelectionsForGutterGesture();
        return;
      }
      const target = path[0];
      const gutterRow = target instanceof HTMLElement ? target.closest("[data-column-number]") : null;
      if (gutterRow instanceof HTMLElement) {
        if (this.#isLineSelectionEnabled()) {
          this.#preserveEditorSelectionsForGutterGesture();
          return;
        }
        if (this.#beginDeletionGutterSelection(gutterRow, deletionsCode, e.pointerType === "mouse")) return;
      }
      this.#setDeletedTextSelectionActive(true);
      if (this.#selections !== void 0) this.#updateSelections([]);
    }, { passive: true }));
    if (gutterEl !== void 0) {
      const resolveGutterTarget = (eventTarget, includeContentLine = false) => {
        let target = eventTarget;
        if (target?.dataset.lineNumberContent !== void 0) target = target.parentElement ?? void 0;
        else if (includeContentLine && target?.tagName === "SPAN") target = target.closest("[data-line]");
        return target;
      };
      const resolveEditableLine = (target) => {
        if (target === void 0) return;
        const lineType = target.dataset.lineType;
        const lineNumber = getLineNumberAttr(target) ?? getLineNumberAttr(target, "columnNumber");
        if (lineNumber === void 0 || lineType === void 0 || !isLineEditable(lineType)) return;
        return lineNumber - 1;
      };
      this.#editorEventDisposes.push(addEventListener(gutterEl, "pointerdown", (e) => {
        const path = e.composedPath();
        if (isGutterUtilityPath(path)) {
          this.#preserveEditorSelectionsForGutterGesture();
          return;
        }
        const gutterRow = resolveGutterTarget(path[0]);
        if (gutterRow !== void 0 && this.#isLineSelectionEnabled()) {
          this.#preserveEditorSelectionsForGutterGesture();
          return;
        }
        if (gutterRow?.dataset.lineType === "change-deletion") {
          const code = gutterRow.closest("[data-code]");
          if (code != null) this.#beginDeletionGutterSelection(gutterRow, code, e.pointerType === "mouse");
          return;
        }
        if (e.pointerType !== "mouse") return;
        const textDocument = this.#textDocument;
        const lineIndex = resolveEditableLine(gutterRow);
        if (lineIndex === void 0 || textDocument === void 0) return;
        this.#canMountSelectionAction = true;
        this.#markerRenderer?.removePopover();
        const selection = this.#spanLineSelection(lineIndex, lineIndex, textDocument);
        this.#isGutterMouseDown = true;
        this.#selectionStart = selection;
        this.#updateSelections([selection]);
        this.#setWindowSelection(selection);
        this.#focus();
        this.#replaceSelectEventListeners([addEventListener(document, "mousemove", (e2) => {
          if (!this.#isGutterMouseDown) return;
          const textDocument2 = this.#textDocument;
          const lineIndex2 = resolveEditableLine(resolveGutterTarget(e2.composedPath()[0], true));
          if (lineIndex2 === void 0 || textDocument2 === void 0) return;
          const anchorLine = this.#selectionStart?.start.line ?? lineIndex2;
          const selection2 = this.#spanLineSelection(anchorLine, lineIndex2, textDocument2);
          this.#selectionStart ??= selection2;
          this.#updateSelections([selection2]);
          this.#focus(selection2.direction === -1 ? selection2.start : selection2.end);
        }, { passive: true })]);
      }, { passive: true }));
    }
    this.#markerRenderer?.listenHover(contentEl);
    this.#resizeObserver?.disconnect();
    this.#resizeObserver = new ResizeObserver(this.#handleLayoutResize);
    this.#resizeObserver.observe(contentEl);
    this.#resizeObserver.observe(contentEl.parentElement);
    this.#computeContentOffset(contentEl);
  }
  #handleCustomPasteEvent = async () => {
    const clipboard = this.#options.clipboard;
    if (clipboard !== void 0) {
      let text = await clipboard.readText();
      const selectionCount = this.#selections?.length ?? 0;
      if (selectionCount > 1) {
        const multiSelectionText = await clipboard.readText(MULTI_SELECTION_CLIPBOARD_TYPE);
        try {
          const selectionTexts = JSON.parse(multiSelectionText);
          if (Array.isArray(selectionTexts) && selectionTexts.length === selectionCount) text = selectionTexts;
        } catch {
        }
      }
      const textDocument = this.#textDocument;
      if (textDocument !== void 0) this.#replaceSelectionText(Array.isArray(text) ? text.map((t) => textDocument.normalizeEol(t)) : textDocument.normalizeEol(text), void 0, true, "document");
    }
  };
  #computeContentOffset(contentEl) {
    if (this.#isDiff && this.#diffSyle === "split" && this.#isWrap) {
      this.#contentOffset = {
        top: contentEl.offsetTop,
        left: contentEl.offsetLeft - this.#getGutterWidth()
      };
      if (this.#options.__debug === true) console.log("[diffs/editor] content offset:", this.#contentOffset);
    }
  }
  get #activeContentOffset() {
    if (this.#isDiff && this.#diffSyle === "split" && this.#isWrap) return this.#contentOffset;
  }
  #runCommand(command) {
    const textDocument = this.#textDocument;
    if (textDocument === void 0) return;
    switch (command) {
      case "openSearchPanel":
        this.#openSearchPanel("find");
        break;
      case "openSearchReplacePanel":
        this.#openSearchPanel("replace");
        break;
      case "findNextMatch": {
        const selections = this.#selections;
        if (selections === void 0) break;
        if (selections.some(isCollapsedSelection)) {
          const expanded = selections.map((sel) => {
            if (isCollapsedSelection(sel)) return expandCollapsedSelectionToWord(textDocument, sel);
            return sel;
          });
          this.#updateSelections(expanded);
          this.focus();
        } else {
          const nextMatch = findNextMatch(textDocument, selections);
          if (nextMatch !== void 0) {
            this.#updateSelections(nextMatch);
            const primaryMatch = nextMatch.at(-1);
            if (primaryMatch !== void 0) this.#revealLineIfCollapsed(getCaretPosition(primaryMatch).line);
            this.#scrollToPrimaryCaret();
          }
        }
        break;
      }
      case "moveLineUp":
      case "moveLineDown":
        this.#moveSelectedLines(command === "moveLineUp" ? -1 : 1);
        break;
      case "copyLineUp":
      case "copyLineDown":
        this.#copySelectedLines(command === "copyLineUp" ? -1 : 1);
        break;
      case "simplifySelection": {
        const selections = this.#selections;
        const primarySelection = selections?.at(-1);
        if (selections === void 0 || primarySelection === void 0) break;
        if (selections.length > 1) {
          this.#updateSelections([primarySelection]);
          this.#focus(getCaretPosition(primarySelection));
        } else if (!isCollapsedSelection(primarySelection)) {
          const caret = getCaretPosition(primarySelection);
          this.#updateSelections([{
            start: caret,
            end: caret,
            direction: 0
          }]);
          this.#focus(caret);
        }
        break;
      }
      case "insertBlankLine":
        this.#insertBlankLine();
        break;
      case "deleteHardLineForward":
        this.#deleteHardLineForward();
        break;
      case "toggleComment":
      case "toggleBlockComment": {
        const selections = this.#selections;
        if (selections === void 0) break;
        const { lineComment, blockComment } = resolveCommentConfig(textDocument.languageId, this.#options.languageCommentConfig);
        if (command === "toggleComment" && lineComment !== null) {
          this.#applyCommandEdits(resolveLineCommentEdits(textDocument, selections, lineComment));
          break;
        }
        const linewise = command === "toggleComment";
        const result = resolveBlockCommentEdits(textDocument, selections, blockComment, linewise);
        if (result !== void 0) this.#applyCommandEdits(result.edits, linewise ? void 0 : (document2) => result.nextSelectionOffsets.map(([start, end, direction]) => ({
          start: document2.positionAt(start),
          end: document2.positionAt(end),
          direction
        })));
        break;
      }
      case "indent":
      case "outdent":
      case "indentLess":
      case "indentMore":
        if (this.#selections !== void 0) {
          const edits = [];
          const nextSelections = [];
          const editedLines = /* @__PURE__ */ new Set();
          const sameLineIndents = [];
          for (const selection of this.#selections) {
            const startLine = selection.start.line;
            const outdent = command === "outdent" || command === "indentLess";
            const lineBased = command === "indentLess" || command === "indentMore";
            if (startLine !== selection.end.line || outdent || lineBased) {
              const ret = resolveIndentEdits(textDocument, selection, this.#metrics.tabSize, outdent);
              for (const edit of ret[0]) {
                const line = edit.range.start.line;
                if (!editedLines.has(line)) {
                  editedLines.add(line);
                  edits.push(edit);
                }
              }
              nextSelections.push(ret[1]);
            } else {
              const text = textDocument.charAt({
                line: startLine,
                character: 0
              }) === "	" ? "	" : " ".repeat(this.#metrics.tabSize);
              edits.push({
                range: selection,
                newText: text
              });
              sameLineIndents.push({
                line: startLine,
                startCharacter: selection.start.character,
                addedLength: text.length - (selection.end.character - selection.start.character),
                selectionIndex: nextSelections.length
              });
              const nextPosition = {
                line: selection.start.line,
                character: selection.start.character + text.length
              };
              nextSelections.push({
                start: nextPosition,
                end: nextPosition,
                direction: 0
              });
            }
          }
          for (const indent of sameLineIndents) {
            let shift = 0;
            for (const other of sameLineIndents) if (other.line === indent.line && other.startCharacter < indent.startCharacter) shift += other.addedLength;
            if (shift !== 0) {
              const current = nextSelections[indent.selectionIndex];
              const position = {
                line: indent.line,
                character: current.start.character + shift
              };
              nextSelections[indent.selectionIndex] = {
                start: position,
                end: position,
                direction: 0
              };
            }
          }
          const change = textDocument.applyEdits(edits, true, this.#selections, nextSelections);
          if (change !== void 0) this.#applyChange(change, nextSelections);
        }
        break;
      case "selectAll": {
        const fullSelection = getDocumentFullSelection(textDocument);
        this.#updateSelections([fullSelection]);
        this.focus();
        const renderedLineRanges = this.#getRenderedEditableLineRanges();
        const firstRenderedLine = renderedLineRanges[0]?.[0];
        const lastRenderedLine = renderedLineRanges.at(-1)?.[1];
        if (firstRenderedLine !== void 0 && lastRenderedLine !== void 0) {
          this.#suppressNativeSelectionSync = true;
          this.#setWindowSelection({
            start: {
              line: firstRenderedLine,
              character: 0
            },
            end: {
              line: lastRenderedLine,
              character: textDocument.getLineLength(lastRenderedLine)
            },
            direction: 1
          });
        }
        break;
      }
      case "moveCursorToDocStart":
      case "moveCursorToDocEnd":
        {
          const boundarySelection = getDocumentBoundarySelection(textDocument, command === "moveCursorToDocEnd", this.#isDiff);
          this.#updateSelections([boundarySelection]);
          this.#revealLineIfCollapsed(getCaretPosition(boundarySelection).line);
          this.#scrollToPrimaryCaret();
        }
        break;
      case "expandSelectionDocStart":
      case "expandSelectionDocEnd":
        {
          const atEnd = command === "expandSelectionDocEnd";
          const selections = this.#selections;
          if (selections !== void 0) {
            const boundarySelection = getDocumentBoundarySelection(textDocument, atEnd, this.#isDiff);
            this.#updateSelections(extendSelections(selections, boundarySelection));
            this.#revealLineIfCollapsed(getCaretPosition(boundarySelection).line);
            this.#scrollToPrimaryCaret();
          }
        }
        break;
      case "undo":
      case "redo":
        this.#applyHistoryChange(command);
        break;
    }
  }
  #applyHistoryChange(command) {
    const textDocument = this.#textDocument;
    if (textDocument === void 0) return;
    if (command === "undo" && !textDocument.canUndo || command === "redo" && !textDocument.canRedo) return;
    const selections = this.#selections;
    const selectionOffsets = selections?.map((selection) => [textDocument.offsetAt(selection.start), textDocument.offsetAt(selection.end)]);
    const result = command === "undo" ? textDocument.undo() : textDocument.redo();
    if (result === void 0) return;
    const [change, recordedSelections, lineAnnotations, selectionEdits] = result;
    const nextSelections = recordedSelections ?? (selections !== void 0 && selectionOffsets !== void 0 && selectionEdits !== void 0 ? remapSelectionsAfterEdits(textDocument, selections, selectionOffsets, selectionEdits) : void 0);
    this.#applyChange(change, nextSelections, lineAnnotations);
  }
  /** Applies one undoable command batch and records its resulting selections. */
  #applyCommandEdits(edits, resolveNextSelections) {
    const textDocument = this.#textDocument;
    const selections = this.#selections;
    if (textDocument === void 0 || selections === void 0) return;
    const remapSelections = resolveNextSelections === void 0;
    const selectionOffsets = remapSelections ? selections.map((selection) => [textDocument.offsetAt(selection.start), textDocument.offsetAt(selection.end)]) : void 0;
    const resolvedEdits = remapSelections ? edits.map((edit) => {
      const start = textDocument.offsetAt(edit.range.start);
      const end = textDocument.offsetAt(edit.range.end);
      return {
        start: Math.min(start, end),
        end: Math.max(start, end),
        text: edit.newText
      };
    }).sort((a, b) => {
      const startOrder = a.start - b.start;
      return startOrder !== 0 ? startOrder : a.end - b.end;
    }) : void 0;
    const change = textDocument.applyEdits(edits, true, selections, void 0, true);
    if (change === void 0) return;
    const nextSelections = remapSelections ? remapSelectionsAfterEdits(textDocument, selections, selectionOffsets, resolvedEdits) : resolveNextSelections(textDocument);
    textDocument.setLastUndoSelectionsAfter(nextSelections);
    this.#applyChange(change, nextSelections, this.#applyChangeToLineAnnotations(change));
  }
  /** Copies selected line blocks and keeps the selection in the requested copy. */
  #copySelectedLines(direction) {
    const textDocument = this.#textDocument;
    const selections = this.#selections;
    if (textDocument === void 0 || selections === void 0) return;
    const blocks = getSelectedLineBlocks(selections);
    if (blocks.length === 0) return;
    const copiedLinesBefore = [];
    let copiedLineCount = 0;
    const edits = [];
    for (const block of blocks) {
      copiedLinesBefore.push(copiedLineCount);
      const blockLineCount = block.endLine - block.startLine + 1;
      copiedLineCount += blockLineCount;
      const text = textDocument.getText({
        start: {
          line: block.startLine,
          character: 0
        },
        end: {
          line: block.endLine,
          character: textDocument.getLineLength(block.endLine)
        }
      });
      if (direction > 0) {
        const position = {
          line: block.startLine,
          character: 0
        };
        edits.push({
          range: {
            start: position,
            end: position
          },
          newText: text + textDocument.eol
        });
      } else if (block.endLine < textDocument.lineCount - 1) {
        const position = {
          line: block.endLine + 1,
          character: 0
        };
        edits.push({
          range: {
            start: position,
            end: position
          },
          newText: text + textDocument.eol
        });
      } else {
        const position = {
          line: block.endLine,
          character: textDocument.getLineLength(block.endLine)
        };
        edits.push({
          range: {
            start: position,
            end: position
          },
          newText: textDocument.eol + text
        });
      }
    }
    const nextSelections = selections.map((selection) => {
      const line = selection.start.line;
      let low = 0;
      let high = blocks.length - 1;
      while (low <= high) {
        const middle = low + high >>> 1;
        const block2 = blocks[middle];
        if (line < block2.startLine) high = middle - 1;
        else if (line > block2.endLine) low = middle + 1;
        else {
          low = middle;
          break;
        }
      }
      const blockIndex = Math.max(0, low <= high ? low : high);
      const block = blocks[blockIndex];
      const shift = copiedLinesBefore[blockIndex] + (direction > 0 ? block.endLine - block.startLine + 1 : 0);
      return {
        start: {
          ...selection.start,
          line: selection.start.line + shift
        },
        end: {
          ...selection.end,
          line: selection.end.line + shift
        },
        direction: selection.direction
      };
    });
    this.#applyCommandEdits(edits, () => nextSelections);
  }
  /** Inserts an indented blank line after each selection's final line. */
  #insertBlankLine() {
    const textDocument = this.#textDocument;
    const selections = this.#selections;
    if (textDocument === void 0 || selections === void 0) return;
    const selectionLines = selections.map((selection) => getCaretPosition(selection).line);
    const targetLines = Array.from(new Set(selectionLines)).sort((a, b) => a - b);
    const targetIndex = /* @__PURE__ */ new Map();
    const indents = /* @__PURE__ */ new Map();
    const edits = [];
    for (let index = 0; index < targetLines.length; index++) {
      const line = targetLines[index];
      const lineText = textDocument.getLineText(line);
      const indent = /^\s*/.exec(lineText)?.[0] ?? "";
      targetIndex.set(line, index);
      indents.set(line, indent);
      const position = {
        line,
        character: textDocument.getLineLength(line)
      };
      edits.push({
        range: {
          start: position,
          end: position
        },
        newText: textDocument.eol + indent
      });
    }
    const nextSelections = selections.map((_, index) => {
      const line = selectionLines[index];
      const position = {
        line: line + 1 + targetIndex.get(line),
        character: indents.get(line).length
      };
      return {
        start: position,
        end: position,
        direction: 0
      };
    });
    this.#applyCommandEdits(edits, () => nextSelections);
  }
  #moveSelectedLines(direction) {
    const textDocument = this.#textDocument;
    const selections = this.#selections;
    if (textDocument === void 0 || selections === void 0) return;
    const blocks = getSelectedLineBlocks(selections);
    if (blocks.length === 0 || direction < 0 && blocks[0].startLine === 0 || direction > 0 && blocks.at(-1).endLine >= textDocument.lineCount - 1) return;
    const lineCount = textDocument.lineCount;
    const lineRangeEnd = (line) => line < lineCount - 1 ? {
      line: line + 1,
      character: 0
    } : {
      line,
      character: textDocument.getLineLength(line)
    };
    const getLinesText = (lines, appendFinalLineBreak) => {
      const text = lines.map((line) => textDocument.getLineText(line)).join(textDocument.eol);
      return appendFinalLineBreak ? text + textDocument.eol : text;
    };
    const edits = [];
    if (direction < 0) for (const block of blocks) {
      const previousLine = block.startLine - 1;
      const blockLines = [];
      for (let line = block.startLine; line <= block.endLine; line++) blockLines.push(line);
      edits.push({
        range: {
          start: {
            line: previousLine,
            character: 0
          },
          end: lineRangeEnd(block.endLine)
        },
        newText: getLinesText([...blockLines, previousLine], block.endLine < lineCount - 1)
      });
    }
    else for (let index = blocks.length - 1; index >= 0; index--) {
      const block = blocks[index];
      const nextLine = block.endLine + 1;
      const blockLines = [];
      for (let line = block.startLine; line <= block.endLine; line++) blockLines.push(line);
      edits.push({
        range: {
          start: {
            line: block.startLine,
            character: 0
          },
          end: lineRangeEnd(nextLine)
        },
        newText: getLinesText([nextLine, ...blockLines], nextLine < lineCount - 1)
      });
    }
    const lastBlock = blocks.at(-1);
    const lastLineLengthAfterMove = direction > 0 && lastBlock.endLine === lineCount - 2 ? textDocument.getLineLength(lastBlock.endLine) : textDocument.getLineLength(lineCount - 1);
    const nextSelections = selections.map((selection) => shiftSelectionLines(selection, direction, lineCount, (line) => line === lineCount - 1 ? lastLineLengthAfterMove : textDocument.getLineLength(line)));
    const change = textDocument.applyEdits(edits, true, selections, nextSelections, true);
    if (change !== void 0) this.#applyChange(change, nextSelections);
  }
  #handleLayoutResize = () => {
    const lineAnnotations = this.#lineAnnotations?.length ?? 0;
    const prevGutterWidth = this.#gutterWidthCache;
    const prevContentWidth = this.#contentWidthCache;
    this.#gutterWidthCache = void 0;
    this.#contentWidthCache = void 0;
    const gutterWidthChanged = this.#getGutterWidth() !== prevGutterWidth;
    const contentWidthChanged = this.#getContentWidth() !== prevContentWidth;
    if (!gutterWidthChanged && !contentWidthChanged) return;
    this.#lineElementsCache.clear();
    this.#lastAccessedCharX = void 0;
    this.#metrics.clearTextWidthCache();
    if (contentWidthChanged) {
      this.#wrapLineOffsetsCache.clear();
      if (this.#isWrap || lineAnnotations > 0) this.#lineYCache.clear();
    }
    if (this.#selections !== void 0 || this.#matches !== void 0 || this.#markerRenderer !== void 0) {
      this.#updateSelections(this.#selections ?? []);
      if (this.#selections !== void 0 && this.#contentHasFocus) this.focus();
    }
    this.#markerRenderer?.removePopover();
    this.#computeContentOffset(this.#contentElement);
  };
  #remeasureMetricsOnFontLoad() {
    if (this.#fontRemeasureScheduled) return;
    const fonts = document.fonts;
    if (fonts === void 0) return;
    this.#fontRemeasureScheduled = true;
    fonts.ready.then(() => {
      if (this.#contentElement === void 0 || !this.#metrics.remeasureCharacterWidth()) return;
      this.#gutterWidthCache = void 0;
      this.#contentWidthCache = void 0;
      this.#resetCache();
      this.#wrapLineOffsetsCache.clear();
      if (this.#selections !== void 0 || this.#matches !== void 0 || this.#markerRenderer !== void 0) this.#updateSelections(this.#selections ?? []);
      this.#markerRenderer?.removePopover();
    });
  }
  #rerender(change, newLineAnnotations, renderRange = this.#renderRange, shouldUpdateBuffer) {
    const tokenizer = this.#tokenizer;
    const fileInstance = this.#fileInstance;
    const textDocument = this.#textDocument;
    const gutterEl = this.#gutterElement;
    const contentEl = this.#contentElement;
    if (tokenizer === void 0 || fileInstance === void 0 || textDocument === void 0 || contentEl === void 0) return;
    tokenizer.stopBackgroundTokenize();
    const t = performance.now();
    const dirtyLines = tokenizer.tokenize(change, renderRange);
    const t2 = performance.now();
    if (dirtyLines.size > 0) {
      const children = contentEl.children;
      const dirtyLineIndexes = /* @__PURE__ */ new Set();
      for (const lineIndex of dirtyLines.keys()) if (this.#isLineRenderable(lineIndex)) dirtyLineIndexes.add(lineIndex);
      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        if (child !== void 0) {
          const lineNumber = getLineNumberAttr(child);
          const lineType = child.dataset.lineType;
          if (lineNumber === void 0 || lineType === "change-deletion") continue;
          const lineIndex = lineNumber - 1;
          if (dirtyLineIndexes.has(lineIndex)) {
            const tokens = dirtyLines.get(lineIndex);
            child.replaceChildren(...renderLineTokens(tokens));
            dirtyLineIndexes.delete(lineIndex);
            if (dirtyLineIndexes.size === 0) break;
          }
        }
      }
      if (dirtyLineIndexes.size > 0) {
        let lastRenderedLineNumber = 0;
        for (let i = children.length - 1; i >= 0; i--) {
          const child = children[i];
          const lineNumber = getLineNumberAttr(child);
          if (lineNumber !== void 0 && child.dataset.lineType !== "change-deletion") {
            lastRenderedLineNumber = lineNumber;
            break;
          }
        }
        for (const lineIndex of dirtyLineIndexes) {
          if (lineIndex < lastRenderedLineNumber) continue;
          const tokens = dirtyLines.get(lineIndex);
          const lineNumber = String(lineIndex + 1);
          h("div", {
            dataset: {
              line: lineNumber,
              lineType: "context",
              lineIndex: lineIndex.toString()
            },
            children: renderLineTokens(tokens)
          }, contentEl);
          if (gutterEl !== void 0) h("div", {
            dataset: {
              lineType: "context",
              columnNumber: lineNumber,
              lineIndex: lineIndex.toString()
            },
            children: [h("span", {
              dataset: { lineNumberContent: "" },
              textContent: lineNumber
            })]
          }, gutterEl);
        }
      }
    }
    if (change.lineDelta < 0) for (const children of [contentEl.children, gutterEl?.children ?? []]) for (let i = children.length - 1; i >= 0; i--) {
      const child = children[i];
      const lineNumber = getLineNumberAttr(child) ?? getLineNumberAttr(child, "columnNumber");
      const lineType = child.dataset.lineType;
      if (lineNumber === void 0 || lineType === "change-deletion") continue;
      if (lineNumber - 1 < change.lineCount) break;
      child.remove();
    }
    const didLineCountChange = change.lineDelta !== 0;
    if (didLineCountChange) {
      let gridRow = contentEl.children.length;
      for (const child of contentEl.children) {
        const { bufferSize } = child.dataset;
        if (bufferSize !== void 0) gridRow += parseInt(bufferSize) - 1;
      }
      contentEl.style.gridRow = "span " + gridRow;
      if (gutterEl !== void 0) gutterEl.style.gridRow = "span " + gridRow;
    }
    fileInstance.updateRenderCache(dirtyLines, tokenizer.themeType, {
      shouldRefreshDiffsView: this.#isDiff && !didLineCountChange,
      lineCountChangeInFlight: didLineCountChange
    });
    if (didLineCountChange) fileInstance.applyDocumentChange(textDocument, newLineAnnotations, shouldUpdateBuffer);
    if (didLineCountChange || this.#isDiff && this.#diffSyle === "unified") this.#resetCache();
    if (newLineAnnotations !== void 0) {
      this.#lineAnnotations = newLineAnnotations;
      renderLineAnnotations(newLineAnnotations, contentEl, gutterEl);
    }
    if (this.#options.__debug === true) console.log(`[diffs/editor] re-render in: ${round(performance.now() - t2)}ms,`, `tokenize in: ${round(t2 - t)}ms (${dirtyLines.size} dirty lines)`);
  }
  #handleInput(inputType, data) {
    switch (inputType) {
      case "insertText": {
        const text = data ?? "";
        const textDocument = this.#textDocument;
        const selections = this.#selections;
        const autoSurroundTexts = textDocument !== void 0 && selections !== void 0 ? getAutoSurroundReplacementTexts(textDocument, selections, text, this.#options.autoSurround) : void 0;
        this.#replaceSelectionText(autoSurroundTexts ?? text);
        break;
      }
      case "insertCompositionText":
        break;
      case "insertLineBreak":
      case "insertParagraph":
        this.#replaceSelectionText(this.#textDocument?.eol ?? "\n");
        break;
      case "deleteContentBackward":
        this.#deleteSelectionText();
        break;
      case "deleteContentForward":
        this.#deleteSelectionText(true);
        break;
      case "deleteSoftLineBackward":
      case "deleteHardLineBackward":
        this.#deleteSoftLineBackward();
        break;
      case "deleteWordBackward":
        this.#deleteWordBackward();
        break;
      case "insertTranspose":
        this.#insertTranspose();
        break;
      default:
        console.warn(`[diffs] Unknown input type: ${inputType}`, data);
        break;
    }
  }
  #focus(position, preventScroll = true, shouldFocus) {
    this.#contentHasFocus = true;
    if (position !== void 0) {
      this.#shouldIgnoreSelectionChange = true;
      this.#setWindowSelection({
        start: position,
        end: position,
        direction: 0
      });
      queueRender(() => {
        if (shouldFocus?.() === false || !this.#contentHasFocus) {
          this.#shouldIgnoreSelectionChange = false;
          return;
        }
        this.#contentElement?.focus({ preventScroll });
        queueRender(() => {
          this.#shouldIgnoreSelectionChange = false;
        });
      });
    } else if (shouldFocus?.() !== false) this.#contentElement?.focus({ preventScroll });
    else this.#contentHasFocus = false;
  }
  #restoreReplacementFocus(position) {
    const request = this.#replacementFocusRequest;
    if (request == null) return;
    if (this.#retainSearchPanelFocus) {
      this.#replacementFocusRequest = void 0;
      this.#contentHasFocus = false;
      this.#shouldIgnoreSelectionChange = false;
      return;
    }
    const contentElement = this.#contentElement;
    if (contentElement == null || !this.#replacementFocusIsAvailable(contentElement)) {
      this.#replacementFocusRequest = void 0;
      this.#contentHasFocus = false;
      return;
    }
    const shouldFocus = () => {
      if (this.#replacementFocusRequest !== request) return false;
      const shouldRestore = this.#replacementFocusIsAvailable(contentElement);
      this.#replacementFocusRequest = void 0;
      return shouldRestore;
    };
    if (position != null) {
      this.#focus(position, true, shouldFocus);
      return;
    }
    const primarySelection = this.#selections?.at(-1);
    if (primarySelection == null) {
      this.#focus(void 0, true, shouldFocus);
      return;
    }
    const primaryPosition = primarySelection.direction === -1 ? primarySelection.end : primarySelection.start;
    this.#focus(primaryPosition, true, shouldFocus);
  }
  #replacementFocusIsAvailable(contentElement) {
    const fileContainer = this.#fileContainer;
    const shadowRoot = fileContainer?.shadowRoot;
    if (fileContainer == null || shadowRoot == null || this.#contentElement !== contentElement || !shadowRoot.contains(contentElement)) return false;
    const { activeElement: shadowActiveElement } = shadowRoot;
    if (shadowActiveElement === contentElement || shadowActiveElement != null && contentElement.contains(shadowActiveElement)) return true;
    if (shadowActiveElement != null) return false;
    const { ownerDocument } = fileContainer;
    const { activeElement } = ownerDocument;
    return activeElement == null || activeElement === ownerDocument.body || activeElement === ownerDocument.documentElement || activeElement === fileContainer;
  }
  #getFirstVisibleLineNumber(offset = 0) {
    const contentElement = this.#contentElement;
    const fileContainer = this.#fileContainer;
    if (this.#textDocument == null || contentElement == null || fileContainer == null) return;
    const viewport = this.#fileInstance?.getEditorViewport?.() ?? this.#getDefaultEditorViewport(fileContainer);
    let viewportTop;
    let viewportBottom;
    if (viewport instanceof HTMLElement) {
      const viewportRect = viewport.getBoundingClientRect();
      viewportTop = viewportRect.top;
      viewportBottom = viewportRect.bottom;
    } else {
      const viewportWindow = viewport.defaultView;
      if (viewportWindow == null) return;
      viewportTop = 0;
      viewportBottom = viewportWindow.innerHeight;
    }
    const stickyHeader = fileContainer.shadowRoot?.querySelector("[data-diffs-header][data-sticky]");
    if (stickyHeader != null) viewportTop = Math.max(viewportTop, stickyHeader.getBoundingClientRect().bottom);
    if (Number.isFinite(offset)) viewportTop += Math.max(0, offset);
    if (viewportBottom <= viewportTop) return;
    for (const child of contentElement.children) {
      const row = child;
      const lineNumber = getLineNumberAttr(row);
      const lineType = row.dataset.lineType;
      if (lineNumber == null || lineType == null || !isLineEditable(lineType)) continue;
      const rowRect = row.getBoundingClientRect();
      if (rowRect.bottom <= rowRect.top) continue;
      if (rowRect.top >= viewportTop && rowRect.top < viewportBottom) return lineNumber;
    }
  }
  #getDefaultEditorViewport(fileContainer) {
    const ownerDocument = fileContainer.ownerDocument;
    let element = fileContainer.parentElement;
    while (element != null && element !== ownerDocument.body && element !== ownerDocument.documentElement) {
      const overflowY = element.ownerDocument.defaultView?.getComputedStyle(element).overflowY;
      if (overflowY === "auto" || overflowY === "scroll" || overflowY === "overlay") return element;
      element = element.parentElement;
    }
    return ownerDocument;
  }
  #focusAtPosition(position, preventScroll) {
    const selection = {
      start: position,
      end: position,
      direction: 0
    };
    this.#canMountSelectionAction = false;
    this.#updateSelections([selection]);
    this.#revealLineIfCollapsed(position.line);
    if (preventScroll) this.#focus(position, true);
    else this.#scrollToPrimaryCaret();
  }
  #setWindowSelection(selection) {
    const winSelection = window.getSelection();
    if (winSelection === null) return;
    let { start, end, direction } = selection;
    if (comparePosition(start, end) > 0) [start, end] = [end, start];
    const startLineElement = this.#getLineElement(start.line);
    const endLineElement = this.#getLineElement(end.line);
    if (startLineElement === void 0 || endLineElement === void 0) return;
    let [anchorNode, anchorOffset] = getSelectionAnchor(startLineElement, start.character);
    let [focusNode, focusOffset] = getSelectionAnchor(endLineElement, end.character);
    if (direction === -1) [anchorNode, anchorOffset, focusNode, focusOffset] = [
      focusNode,
      focusOffset,
      anchorNode,
      anchorOffset
    ];
    try {
      winSelection.setBaseAndExtent(anchorNode, clampDomOffset(anchorNode, anchorOffset), focusNode, clampDomOffset(focusNode, focusOffset));
    } catch (err) {
      console.error("[diffs/editor] failed to update window selection:", err);
    }
  }
  #scrollToPrimaryCaret(noFocus = false, scrollPosition = "nearest") {
    const primarySelection = this.#selections?.at(-1);
    if (primarySelection === void 0) return;
    const primaryCaretElement = this.#primaryCaretElement;
    if (primaryCaretElement !== void 0) {
      primaryCaretElement.scrollIntoView({
        block: scrollPosition,
        inline: "nearest"
      });
      if (!noFocus) {
        const position = primarySelection.direction === -1 ? primarySelection.end : primarySelection.start;
        if (this.#replacementFocusRequest !== void 0) this.#restoreReplacementFocus(position);
        else this.#focus(position);
      }
    } else {
      const pos = getCaretPosition(primarySelection);
      this.#scrollToLine(pos.line, pos.character, noFocus);
    }
  }
  #getScrollMargin() {
    const top = this.#searchPanel !== void 0 ? 48 : 0;
    const start = this.#getGutterWidth() + this.#metrics.ch;
    return `${top}px ${this.#metrics.ch}px 0 ${start}px`;
  }
  #scrollToLine(line, char = 0, noFocus = false) {
    this.__postponeBgTokenizeToNextFrame();
    const virtualCaret = h("div", { style: {
      position: "absolute",
      left: "0",
      width: "2px",
      height: this.#metrics.lineHeight + "px",
      scrollMargin: this.#getScrollMargin()
    } });
    if (this.#getLineElement(line) !== void 0) {
      const [left, wrapLine] = this.#getCharX(line, char);
      const lineY = this.#getLineY(line) + wrapLine * this.#metrics.lineHeight;
      virtualCaret.style.top = lineY + "px";
      virtualCaret.style.left = left + "px";
      this.#overlayElement?.appendChild(virtualCaret);
      virtualCaret.scrollIntoView({
        block: "center",
        inline: "nearest"
      });
      if (!noFocus) {
        const position = {
          line,
          character: char
        };
        if (this.#replacementFocusRequest !== void 0) this.#restoreReplacementFocus(position);
        else this.#focus(position);
      }
      this.#scrollingToLine = void 0;
      this.#scrollingToLineChar = void 0;
      this.#scrollingToLineFixed = false;
      this.#scrollingToLineNoFocus = false;
    } else {
      const modelLinePosition = this.#fileInstance?.getLinePosition?.(line + 1);
      if (modelLinePosition !== void 0) {
        virtualCaret.style.top = modelLinePosition.top + "px";
        this.#fileContainer?.shadowRoot?.appendChild(virtualCaret);
        virtualCaret.scrollIntoView({
          block: "center",
          inline: "nearest"
        });
        if (modelLinePosition.height > 0 && this.#isLineRenderable(line)) {
          this.#scrollingToLine = line;
          this.#scrollingToLineChar = char;
          this.#scrollingToLineNoFocus = noFocus;
        } else {
          this.#scrollingToLine = void 0;
          this.#scrollingToLineChar = void 0;
          this.#scrollingToLineNoFocus = false;
        }
      } else {
        let yFix = 0;
        if (this.#scrollingToLine === line && this.#contentElement !== void 0) for (let i = this.#contentElement.childElementCount - 1; i >= 0; i--) {
          const child = this.#contentElement.children[i];
          const lineType = child.dataset.lineType;
          const lineNumber = getLineNumberAttr(child);
          if (lineType !== void 0 && isLineEditable(lineType) && lineNumber !== void 0) {
            yFix = (line - (lineNumber - 1)) * this.#metrics.lineHeight;
            break;
          }
        }
        const approximateLineY = ((this.#lineAnnotations ?? []).filter((annotation) => annotation.lineNumber < line).length + line) * this.#metrics.lineHeight + yFix;
        virtualCaret.style.top = approximateLineY + "px";
        this.#fileContainer?.shadowRoot?.appendChild(virtualCaret);
        virtualCaret.scrollIntoView({
          block: "center",
          inline: "nearest"
        });
        if (this.#scrollingToLine === line && (yFix === 0 || this.#scrollingToLineFixed) || !this.#isLineRenderable(line)) {
          this.#scrollingToLine = void 0;
          this.#scrollingToLineChar = void 0;
          this.#scrollingToLineFixed = false;
          this.#scrollingToLineNoFocus = false;
        } else {
          this.#scrollingToLine = line;
          this.#scrollingToLineChar = char;
          this.#scrollingToLineFixed = yFix !== 0;
          this.#scrollingToLineNoFocus = noFocus;
        }
      }
    }
    virtualCaret.remove();
  }
  #spanLineSelection(anchorLine, focusLine, textDocument) {
    const lineStart = (line) => ({
      line,
      character: 0
    });
    const lineEnd = (line) => ({
      line,
      character: textDocument.getLineText(line).length
    });
    if (focusLine < anchorLine) return {
      start: lineStart(focusLine),
      end: lineEnd(anchorLine),
      direction: -1
    };
    return {
      start: lineStart(anchorLine),
      end: lineEnd(focusLine),
      direction: 1
    };
  }
  #isDeletedLineTarget(event) {
    const target = event.composedPath()[0];
    return target instanceof HTMLElement && target.closest("[data-line]")?.getAttribute("data-line-type") === "change-deletion";
  }
  #selectDeletedLines(anchorContent, focusContent, deletionsCode) {
    const rows = [...deletionsCode.querySelectorAll("[data-content] > [data-line]")];
    const anchorIndex = rows.indexOf(anchorContent);
    const focusIndex = rows.indexOf(focusContent);
    const [topContent, bottomContent] = focusIndex < anchorIndex ? [focusContent, anchorContent] : [anchorContent, focusContent];
    const winSelection = window.getSelection();
    if (winSelection !== null) {
      const range = document.createRange();
      range.setStart(topContent, 0);
      range.setEnd(bottomContent, bottomContent.childNodes.length);
      winSelection.removeAllRanges();
      winSelection.addRange(range);
    }
    this.#setDeletedTextSelectionActive(true);
    this.#updateSelections([]);
    this.#setEditorActiveLineSafe(getLineNumberAttr(focusContent) ?? null, true, "deletions");
    const lo = Math.min(anchorIndex, focusIndex);
    const hi = Math.max(anchorIndex, focusIndex);
    this.#deletedSelectionText = lo < 0 ? "" : rows.slice(lo, hi + 1).filter((row) => row.getAttribute("data-line-type") === "change-deletion").map((row) => row.textContent ?? "").join("\n");
  }
  #contentRowForGutterRow(gutterRow, contentColumn) {
    const gutterColumn = gutterRow.parentElement;
    if (gutterColumn == null || contentColumn == null) return;
    const index = [...gutterColumn.children].indexOf(gutterRow);
    const row = contentColumn.children[index];
    return row instanceof HTMLElement ? row : void 0;
  }
  #beginDeletionGutterSelection(gutterRow, code, isMouse) {
    const contentColumn = code.querySelector("[data-content]");
    const anchorContent = this.#contentRowForGutterRow(gutterRow, contentColumn);
    if (anchorContent === void 0) return false;
    this.#selectDeletedLines(anchorContent, anchorContent, code);
    if (isMouse) this.#replaceSelectEventListeners([addEventListener(document, "mousemove", (moveEvent) => {
      const moveTarget = moveEvent.composedPath()[0];
      const moveGutter = moveTarget instanceof HTMLElement ? moveTarget.closest("[data-column-number]") : null;
      if (moveGutter instanceof HTMLElement && code.contains(moveGutter)) {
        const focusContent = this.#contentRowForGutterRow(moveGutter, contentColumn);
        if (focusContent !== void 0) this.#selectDeletedLines(anchorContent, focusContent, code);
      }
    }, { passive: true })]);
    return true;
  }
  #isDeletedTextSelectionActive() {
    return this.#fileContainer?.shadowRoot?.querySelector("pre")?.hasAttribute("data-deleted-text-selection") ?? false;
  }
  #deletedTextForClipboard() {
    return this.#deletedSelectionText !== "" ? this.#deletedSelectionText : window.getSelection()?.toString() ?? "";
  }
  #setDeletedTextSelectionActive(active) {
    const pre = this.#fileContainer?.shadowRoot?.querySelector("pre");
    if (pre == null) return;
    if (active) {
      pre.setAttribute("data-deleted-text-selection", "");
      this.#setEditorActiveLineSafe(null);
      this.#deletedSelectionText = "";
    } else {
      pre.removeAttribute("data-deleted-text-selection");
      this.#deletedSelectionText = "";
    }
  }
  #setEditorActiveLineSafe(lineNumber, lineNumberOnly = false, side = "additions") {
    try {
      this.#fileInstance?.setEditorActiveLine(lineNumber, {
        lineNumberOnly,
        side
      });
    } catch {
    }
  }
  #scheduleThemeSelectionRefresh() {
    if (this.#themeSelectionRefreshFrame !== void 0) return;
    this.#themeSelectionRefreshFrame = requestAnimationFrame(() => {
      this.#themeSelectionRefreshFrame = void 0;
      if (this.#selections !== void 0 || this.#matches !== void 0 || this.#markerRenderer !== void 0) this.#updateSelections(this.#selections ?? []);
    });
  }
  #updateSelections(selections) {
    this.__postponeBgTokenizeToNextFrame();
    this.#primaryCaretElement = void 0;
    this.#setEditorActiveLineSafe(null);
    if (selections.length === 0 && this.#matches === void 0 && this.#markerRenderer === void 0) {
      this.#selections = void 0;
      this.#overlayElements?.forEach((el) => el.remove());
      this.#overlayElements?.clear();
      this.#selectionAction?.cleanup();
      this.#selectionAction = void 0;
      return;
    }
    const fragment = document.createDocumentFragment();
    const renderCtx = {
      fragment,
      elements: /* @__PURE__ */ new Map()
    };
    if (selections.length > 0) {
      const normalizedSelections = mergeOverlappingSelections(selections);
      const primarySelection = normalizedSelections.at(-1);
      this.#selections = normalizedSelections;
      const hasNonEmptySelection = normalizedSelections.some((selection) => !isCollapsedSelection(selection));
      const caretLine = getCaretPosition(primarySelection).line + 1;
      this.#setEditorActiveLineSafe(caretLine, hasNonEmptySelection);
      for (const selection of normalizedSelections) {
        if (!isCollapsedSelection(selection)) this.#renderSelection(renderCtx, "selection", selection);
        this.#renderCaret(renderCtx, selection, selection === primarySelection);
      }
      const bracketMatchRanges = this.#options.matchBrackets !== false && this.#textDocument !== void 0 && this.#tokenizer !== void 0 && isCollapsedSelection(primarySelection) ? findBracketMatchRanges(this.#textDocument, this.#tokenizer, primarySelection.start) : void 0;
      if (bracketMatchRanges !== void 0) for (const range of bracketMatchRanges) this.#renderSelection(renderCtx, "bracketMatch", range);
    }
    const textDocument = this.#textDocument;
    if (this.#matches !== void 0 && textDocument !== void 0) {
      const matches = this.#matches;
      const renderRange = this.#renderRange;
      const renderedLineRanges = renderRange !== void 0 && Number.isFinite(renderRange.totalLines) || this.#isDiff && this.#fileInstance?.options.expandUnchanged !== true ? this.#getRenderedEditableLineRanges() : void 0;
      const primarySelection = this.#selections?.at(-1);
      const primaryStartOffset = primarySelection !== void 0 ? textDocument.offsetAt(primarySelection.start) : -1;
      const primaryEndOffset = primarySelection !== void 0 ? textDocument.offsetAt(primarySelection.end) : -1;
      let firstMatchIndex = 0;
      const rangeCount = renderedLineRanges?.length ?? 1;
      for (let rangeIndex = 0; rangeIndex < rangeCount; rangeIndex++) {
        let visibleEndOffset = Infinity;
        const lineRange = renderedLineRanges?.[rangeIndex];
        if (lineRange !== void 0) {
          const [firstLine, lastLine] = lineRange;
          const visibleStartOffset = textDocument.offsetAt({
            line: firstLine,
            character: 0
          });
          const endLine = lastLine + 1;
          visibleEndOffset = endLine < textDocument.lineCount ? textDocument.offsetAt({
            line: endLine,
            character: 0
          }) : textDocument.offsetAt({
            line: endLine - 1,
            character: textDocument.getLineLength(endLine - 1)
          });
          let low = firstMatchIndex;
          let high = matches.length;
          while (low < high) {
            const middle = low + Math.floor((high - low) / 2);
            if (matches[middle][1] <= visibleStartOffset) low = middle + 1;
            else high = middle;
          }
          firstMatchIndex = low;
        }
        for (; firstMatchIndex < matches.length; firstMatchIndex++) {
          const [startOffset, endOffset] = matches[firstMatchIndex];
          if (startOffset >= visibleEndOffset) break;
          const range = {
            start: textDocument.positionAt(startOffset),
            end: textDocument.positionAt(endOffset)
          };
          const isFocused = primaryStartOffset === startOffset && primaryEndOffset === endOffset;
          this.#renderSelection(renderCtx, "match", range, isFocused ? "focus" : void 0);
        }
      }
    }
    if (this.#markerRenderer !== void 0 && textDocument !== void 0) for (const marker of this.#markerRenderer.markers) this.#renderSelection(renderCtx, "marker", marker, markerSeverityDatasetKey(marker.severity));
    this.#overlayElement?.appendChild(fragment);
    this.#overlayElements?.forEach((el) => el.remove());
    this.#overlayElements?.clear();
    this.#overlayElements = renderCtx.elements;
    this.#updateSelectionActionPopover();
  }
  #renderSelection(renderCtx, type, range, extraDataset) {
    if (this.#textDocument === void 0) return;
    const { start, end } = range;
    let firstLine = start.line;
    let endLine = end.line + 1;
    if (this.#renderRange !== void 0) {
      const { startingLine, totalLines } = this.#renderRange;
      firstLine = Math.max(firstLine, startingLine);
      endLine = Math.min(endLine, startingLine + totalLines);
    }
    for (let line = firstLine; line < endLine; line++) {
      if (!this.#isLineVisible(line)) continue;
      const isLastLine = line === end.line;
      const startChar = line === start.line ? start.character : 0;
      const endChar = isLastLine ? end.character : this.#textDocument.getLineLength(line);
      if (this.#isWrap) {
        const contentWidth = this.#getContentWidth();
        const lineText = this.#textDocument.getLineText(line);
        if (2 * this.#metrics.ch + this.#metrics.measureTextWidth(lineText) > contentWidth) {
          this.#renderWrappedSelection(renderCtx, line, lineText, startChar, endChar, isLastLine, type, extraDataset);
          continue;
        }
      }
      let left = 0;
      let width = 0;
      let paddingEnd = 0;
      if (startChar === 0) left = this.#getGutterWidth() + this.#metrics.ch + (this.#activeContentOffset?.left ?? 0);
      else left = this.#getCharX(line, startChar)[0];
      if (!isLastLine && type === "selection") paddingEnd = this.#metrics.ch;
      if (startChar === endChar) width = paddingEnd;
      else width = this.#getCharX(line, endChar)[0] - left + paddingEnd;
      this.#renderSelectionBlock(renderCtx, type, line, 0, left, width, extraDataset);
    }
  }
  #renderWrappedSelection(renderCtx, line, lineText, startChar, endChar, isLastLine, type, extraDataset) {
    const wrapOffsets = this.#wrapLineTextOrWholeLine(line);
    const segmentCount = wrapOffsets.length - 1;
    const offsetLeft = this.#getGutterWidth() + this.#metrics.ch + (this.#activeContentOffset?.left ?? 0);
    for (let wrapLine = 0; wrapLine < segmentCount; wrapLine++) {
      const segmentStart = wrapOffsets[wrapLine];
      const segmentEnd = wrapOffsets[wrapLine + 1];
      const wrapStartChar = Math.max(startChar, segmentStart);
      const wrapEndChar = Math.min(endChar, segmentEnd);
      if (wrapStartChar > wrapEndChar) continue;
      const segmentStartWidth = this.#segmentTextWidth(lineText, segmentStart, wrapStartChar);
      const segmentLeft = offsetLeft + segmentStartWidth;
      let paddingEnd = 0;
      if (!isLastLine && wrapLine === segmentCount - 1 && type === "selection") paddingEnd = this.#metrics.ch;
      const segmentWidth = wrapStartChar === wrapEndChar ? paddingEnd : this.#segmentTextWidth(lineText, segmentStart, wrapEndChar) - segmentStartWidth + paddingEnd;
      this.#renderSelectionBlock(renderCtx, type, line, wrapLine, segmentLeft, segmentWidth, extraDataset);
    }
  }
  #segmentTextWidth(lineText, segmentStart, character) {
    if (character <= segmentStart) return 0;
    const segmentText = lineText.slice(segmentStart, character);
    const asciiColumns = getExpandedAsciiTextColumns(segmentText, this.#metrics.tabSize);
    return asciiColumns !== -1 ? asciiColumns * this.#metrics.ch : this.#metrics.measureTextWidth(segmentText);
  }
  #renderSelectionBlock(renderCtx, type, line, wrapLine, left, width, extraDataset) {
    if (width === 0) return;
    const { ch, lineHeight } = this.#metrics;
    const y = this.#getLineY(line) + wrapLine * lineHeight;
    const cacheKey = `${type}-${line}/${wrapLine}-${left}-${width} ${extraDataset ?? ""}`;
    const overlayEls = this.#overlayElements;
    const rounded = (this.#options.roundedSelection ?? true) && type === "selection";
    const addRoundedCorner = (line2, wrapLine2, left2, radius) => {
      const top = this.#getLineY(line2) + wrapLine2 * lineHeight;
      const lineElement = this.#getLineElement(line2);
      let cornerBg = "initial";
      if (lineElement !== void 0 && (lineElement.dataset.lineType === "change-addition" || lineElement.dataset.selectedLine !== void 0)) cornerBg = getComputedStyle(lineElement).getPropertyValue("--diffs-line-bg");
      const css = `width:${ch}px;transform:translateX(${left2}px) translateY(${top}px);--diffs-selection-corner-bg:${cornerBg}`;
      const dataset = {
        selectionCorner: "",
        [radius]: ""
      };
      const cacheKeyPrefix = `${type}-block-${line2}/${wrapLine2}-${left2}-1ch`;
      let cacheKey2 = cacheKeyPrefix + "-" + radius;
      if (radius === "rbl") {
        const prevCornerKey = cacheKeyPrefix + "-rtl";
        const prevCorner = renderCtx.elements.get(prevCornerKey);
        if (prevCorner !== void 0) {
          prevCorner.remove();
          renderCtx.elements.delete(prevCornerKey);
          cacheKey2 += "-rtl";
          dataset.rtl = "";
        }
      }
      let cornerEl = renderCtx.elements.get(cacheKey2);
      if (cornerEl !== void 0) return;
      if (overlayEls?.has(cacheKey2) === true) {
        cornerEl = overlayEls.get(cacheKey2);
        cornerEl.style.cssText = css;
        overlayEls.delete(cacheKey2);
      } else cornerEl = h("div", {
        dataset: "selectionRange",
        style: { cssText: css },
        children: [h("div", { dataset })]
      }, renderCtx.fragment);
      renderCtx.elements.set(cacheKey2, cornerEl);
    };
    const addRadiusStyle = (element) => {
      const end = left + width;
      const dataset = element.dataset;
      const previousSelectionRange = renderCtx.previousSelectionRange;
      if (previousSelectionRange === void 0 || previousSelectionRange.line !== line || previousSelectionRange.wrapLine !== wrapLine) renderCtx.previousSelectionRange = {
        element,
        line,
        wrapLine,
        left,
        width
      };
      if (previousSelectionRange === void 0 || end <= previousSelectionRange.left) [
        "rtl",
        "rtr",
        "rbl",
        "rbr"
      ].forEach((key) => {
        dataset[key] = "";
      });
      else {
        const prevLine = previousSelectionRange.line;
        const prevWrapLine = previousSelectionRange.wrapLine;
        const prevLeft = previousSelectionRange.left;
        const prevDataset = previousSelectionRange.element.dataset;
        const prevEnd = prevLeft + previousSelectionRange.width;
        if (prevLeft > left) addRoundedCorner(prevLine, prevWrapLine, prevLeft - ch, "rbr");
        delete prevDataset.rbl;
        delete dataset.rtl;
        delete dataset.rtr;
        if (end >= prevEnd) delete prevDataset.rbr;
        if (end > prevEnd) {
          addRoundedCorner(prevLine, prevWrapLine, prevEnd, "rbl");
          dataset.rtr = "";
        }
        if (end < prevEnd) addRoundedCorner(line, wrapLine, end, "rtl");
        if (left < prevLeft) dataset.rtl = "";
        dataset.rbl = "";
        dataset.rbr = "";
      }
    };
    let rangeEl = renderCtx.elements.get(cacheKey);
    if (rangeEl !== void 0) {
      if (rounded) addRadiusStyle(rangeEl);
      return;
    }
    if (overlayEls?.has(cacheKey) === true) {
      rangeEl = overlayEls.get(cacheKey);
      overlayEls.delete(cacheKey);
    } else rangeEl = h("div", { dataset: extraDataset ? [type + "Range", extraDataset] : type + "Range" }, renderCtx.fragment);
    rangeEl.style.width = `${width}px`;
    rangeEl.style.transform = `translateX(${left}px) translateY(${y}px)`;
    if (rounded) addRadiusStyle(rangeEl);
    renderCtx.elements.set(cacheKey, rangeEl);
  }
  #renderCaret(renderCtx, selection, isPrimary) {
    const { line, character } = getCaretPosition(selection);
    if (!this.#isLineVisible(line)) return;
    const [left, wrapLine] = this.#getCharX(line, character);
    const cacheKey = "caret-" + line + "/" + wrapLine + ":" + character;
    if (renderCtx.elements.has(cacheKey)) return;
    const caretEl = h("div", {
      dataset: "caret",
      style: { transform: `translateX(${left - 1}px) translateY(${this.#getLineY(line) + wrapLine * this.#metrics.lineHeight}px)` }
    }, renderCtx.fragment);
    renderCtx.elements.set(cacheKey, caretEl);
    if (isPrimary) {
      caretEl.style.scrollMargin = this.#getScrollMargin();
      this.#primaryCaretElement = caretEl;
    }
  }
  #updateSelectionActionPopover() {
    const primarySelection = this.#selections?.at(-1);
    const overlayElement = this.#overlayElement;
    const textDocument = this.#textDocument;
    const renderSelectionAction = this.#options.renderSelectionAction;
    const cleanup = () => {
      this.#selectionAction?.cleanup();
      this.#selectionAction = void 0;
    };
    if (this.#options.enabledSelectionAction !== true || renderSelectionAction === void 0 || primarySelection === void 0 || isCollapsedSelection(primarySelection) || this.#isContentMouseDown || overlayElement === void 0 || textDocument === void 0) {
      cleanup();
      return;
    }
    const head = getCaretPosition(primarySelection);
    if (!this.#isLineVisible(head.line)) {
      cleanup();
      return;
    }
    if (this.#selectionAction === void 0) {
      if (!this.#canMountSelectionAction) return;
      const getActiveSelection = () => this.#selections?.at(-1) ?? primarySelection;
      const selectionActionElement = renderSelectionAction({
        textDocument,
        get selection() {
          return getActiveSelection();
        },
        applyEdits: (edits) => this.applyEdits(edits),
        getSelectionText: () => this.#textDocument?.getText(getActiveSelection()) ?? "",
        replaceSelectionText: (text) => {
          this.#replaceSelectionText(text, [getActiveSelection()]);
        },
        close: () => {
          cleanup();
          this.#scrollToPrimaryCaret();
        }
      });
      this.#selectionAction = new SelectionActionWidget(selectionActionElement, overlayElement, () => this.#updateSelectionActionPopover());
      this.#getPopoverManager().resetPlacement(SELECTION_ACTION_POPOVER_PLACEMENT_KEY);
    }
    const lineHeight = this.#metrics.lineHeight;
    const isBackward = primarySelection.direction === -1;
    const preferred = {
      placeAbove: isBackward,
      anchor: head
    };
    const fallback = isBackward ? {
      placeAbove: false,
      anchor: primarySelection.end
    } : {
      placeAbove: true,
      anchor: primarySelection.start
    };
    const popoverHeight = this.#selectionAction.height;
    const candidateGeometry = (candidate) => {
      const [left2, candidateWrapLine] = this.#getCharX(candidate.anchor.line, candidate.anchor.character);
      const rowTop = this.#getLineY(candidate.anchor.line) + candidateWrapLine * lineHeight;
      const anchorTop2 = candidate.placeAbove ? rowTop : rowTop + lineHeight;
      const top = candidate.placeAbove ? anchorTop2 - popoverHeight : anchorTop2;
      return {
        top,
        bottom: top + popoverHeight,
        left: left2,
        anchorTop: anchorTop2,
        rowTop
      };
    };
    const preferredGeometry = candidateGeometry(preferred);
    const lineCount = textDocument.lineCount;
    const atDocumentEdge = isBackward ? head.line < 3 : head.line >= lineCount - 3;
    const fallbackGeometry = this.#isLineVisible(fallback.anchor.line) ? candidateGeometry(fallback) : void 0;
    const popoverManager = this.#getPopoverManager();
    const viewport = popoverManager.getPlacementBounds();
    const useFallback = fallbackGeometry !== void 0 && popoverManager.choosePlacement({
      preferred: preferredGeometry,
      fallback: fallbackGeometry,
      viewport,
      popoverHeight,
      atDocumentEdge,
      placementKey: SELECTION_ACTION_POPOVER_PLACEMENT_KEY
    }) === "fallback";
    if (fallbackGeometry === void 0) popoverManager.setPlacement("preferred", SELECTION_ACTION_POPOVER_PLACEMENT_KEY);
    const { placeAbove } = useFallback ? fallback : preferred;
    const { left, anchorTop } = useFallback && fallbackGeometry !== void 0 ? fallbackGeometry : preferredGeometry;
    const selectionTop = isBackward ? preferredGeometry.rowTop : fallbackGeometry?.rowTop ?? -Infinity;
    const selectionBottom = (isBackward ? fallbackGeometry?.rowTop ?? Infinity : preferredGeometry.rowTop) + (primarySelection.end.line > primarySelection.start.line && primarySelection.end.character === 0 ? 0 : lineHeight);
    const isSelectionVisible = viewport === void 0 || selectionBottom > viewport.top && selectionTop < viewport.bottom;
    this.#selectionAction.reposition(left, anchorTop, this.#getGutterWidth(), placeAbove, isSelectionVisible, viewport);
  }
  #openSearchPanel(mode) {
    if (this.#searchPanel !== void 0) {
      this.#searchPanel.setMode(mode);
      return;
    }
    this.#renderSearchPanel(mode);
  }
  #renderSearchPanel(mode) {
    this.#searchPanel?.cleanup();
    const textDocument = this.#textDocument;
    const preElement = this.#fileContainer?.shadowRoot?.querySelector("pre");
    const selections = this.#selections;
    if (textDocument === void 0 || preElement == null) return;
    let defaultQuery = "";
    let initialMatch = void 0;
    if (selections !== void 0 && selections.length > 0) {
      let primarySelection = selections.at(-1);
      if (isCollapsedSelection(primarySelection)) {
        primarySelection = expandCollapsedSelectionToWord(textDocument, primarySelection);
        this.#updateSelections([...selections.slice(0, -1), primarySelection]);
        const selectionText = textDocument.getText(primarySelection);
        if (selectionText !== "" && !selectionText.includes("\n")) {
          defaultQuery = selectionText;
          initialMatch = [textDocument.offsetAt(primarySelection.start), textDocument.offsetAt(primarySelection.end)];
        }
      }
    }
    const scrollToMatch = ([startOffset, endOffset], retainFocus) => {
      const nextSelection = createSelectionFromAnchorAndFocusOffsets(textDocument, startOffset, endOffset);
      this.#updateSelections([nextSelection]);
      this.#revealLineIfCollapsed(getCaretPosition(nextSelection).line);
      this.#scrollToPrimaryCaret(true);
      this.#retainSearchPanelFocus = retainFocus;
    };
    const searchPanel = new SearchPanelWidget({
      textDocument,
      containerElement: preElement,
      defaultQuery,
      mode,
      initialMatch,
      scrollToMatch,
      applyReplace: (edits) => {
        if (edits.length === 0) return;
        const change = textDocument.applyEdits(edits.map((edit) => ({
          range: {
            start: textDocument.positionAt(edit.start),
            end: textDocument.positionAt(edit.end)
          },
          newText: edit.text
        })), true, this.#selections);
        if (change !== void 0) this.#applyChange(change, void 0, this.#applyChangeToLineAnnotations(change), { skipSearchRefresh: true });
      },
      onUpdate: (allMatches, options) => {
        if (allMatches.length === 0) {
          this.#matches = void 0;
          this.#updateSelections(this.#selections ?? []);
          return;
        }
        this.#matches = allMatches;
        if (options?.syncSelection === false) {
          this.#updateSelections(this.#selections ?? []);
          const primarySelection2 = this.#selections?.at(-1);
          if (primarySelection2 !== void 0) {
            const startOffset = textDocument.offsetAt(primarySelection2.start);
            const endOffset = textDocument.offsetAt(primarySelection2.end);
            for (const match of allMatches) if (match[0] === startOffset && match[1] === endOffset) return match;
          }
          return;
        }
        const primarySelection = this.#selections?.at(-1);
        let searchOffset = 0;
        let nextMatch;
        if (primarySelection !== void 0) searchOffset = textDocument.offsetAt(primarySelection.start);
        for (const m of allMatches) if (m[0] >= searchOffset) {
          nextMatch = m;
          break;
        }
        if (nextMatch !== void 0) scrollToMatch(nextMatch, true);
        else this.#updateSelections(this.#selections ?? []);
        return nextMatch;
      },
      onClose: () => {
        this.#searchPanel = void 0;
        this.#retainSearchPanelFocus = false;
        this.#matches = void 0;
        this.#updateSelections(this.#selections ?? []);
      }
    });
    this.#searchPanel = searchPanel;
    this.#retainSearchPanelFocus = false;
  }
  #getSelectionText() {
    const textDocument = this.#textDocument;
    const selections = this.#selections;
    if (textDocument === void 0 || selections === void 0) return "";
    return getSelectionText(textDocument, selections);
  }
  #getSelectionClipboardTexts() {
    const textDocument = this.#textDocument;
    const selections = this.#selections;
    if (textDocument === void 0 || selections === void 0) return [];
    return getSelectionClipboardTexts(textDocument, selections);
  }
  /** Writes both the portable text and the selection pairing metadata. */
  #writeSelectionClipboardData(clipboardData, text, selectionTexts) {
    if (clipboardData === null) return;
    clipboardData.setData("text", text);
    if (selectionTexts.length > 1) clipboardData.setData(MULTI_SELECTION_CLIPBOARD_TYPE, JSON.stringify(selectionTexts));
  }
  #cutSelectionText() {
    const textDocument = this.#textDocument;
    const selections = this.#selections;
    if (textDocument === void 0 || selections === void 0 || selections.length === 0) return "";
    if (selections.some((selection) => isCollapsedSelection(selection))) {
      const cut = resolveSelectionCut(textDocument, selections);
      this.#applySelectionCutEdits(cut.edits, cut.nextSelectionOffsets);
      return cut.text;
    }
    const text = getSelectionText(textDocument, selections);
    this.#replaceSelectionText("", void 0, true);
    return text;
  }
  #applySelectionCutEdits(edits, nextSelectionOffsets) {
    const textDocument = this.#textDocument;
    const selections = this.#selections;
    if (textDocument === void 0 || selections === void 0 || edits.length === 0) return;
    const change = textDocument.applyResolvedEdits(edits, true, selections, void 0, true);
    if (change === void 0) return;
    const nextSelections = nextSelectionOffsets.map((offset) => {
      const caret = textDocument.positionAt(offset);
      return {
        start: caret,
        end: caret,
        direction: 0
      };
    });
    textDocument.setLastUndoSelectionsAfter(nextSelections);
    this.#applyChange(change, nextSelections, this.#applyChangeToLineAnnotations(change));
  }
  #replaceSelectionText(text, selections = this.#selections, undoBoundary = false, textOrder = "selection") {
    if (selections === void 0) return;
    const textDocument = this.#textDocument;
    const primarySelection = selections.at(-1);
    if (textDocument === void 0 || primarySelection === void 0) return;
    const { nextSelections, change } = Array.isArray(text) && text.length === selections.length ? applyTextReplaceToSelections(textDocument, selections, text, this.#lineAnnotations, undoBoundary, textOrder) : applyTextChangeToSelections(textDocument, selections, {
      start: textDocument.offsetAt(primarySelection.start),
      end: textDocument.offsetAt(primarySelection.end),
      text: Array.isArray(text) ? text.join(textDocument.eol) : text
    }, this.#lineAnnotations, void 0, undoBoundary);
    if (change !== void 0) this.#applyChange(change, nextSelections, this.#applyChangeToLineAnnotations(change));
  }
  #deleteSelectionText(forward = false) {
    const selections = this.#selections;
    const textDocument = this.#textDocument;
    if (selections === void 0 || textDocument === void 0) return;
    const { nextSelections, change } = applyDeleteCharacterToSelections(textDocument, selections, forward, this.#lineAnnotations, this.#metrics.tabSize);
    if (change !== void 0) this.#applyChange(change, nextSelections, this.#applyChangeToLineAnnotations(change));
  }
  #deleteSoftLineBackward() {
    const selections = this.#selections;
    const textDocument = this.#textDocument;
    if (selections === void 0 || textDocument === void 0) return;
    const { nextSelections, change } = applyDeleteSoftLineBackwardToSelections(textDocument, selections, this.#isWrap ? (line, character) => {
      const wrapOffsets = this.#wrapLineTextOrWholeLine(line);
      for (let w = 0; w + 1 < wrapOffsets.length; w++) {
        const segmentStart = wrapOffsets[w];
        const segmentEnd = wrapOffsets[w + 1];
        if (character >= segmentStart && character <= segmentEnd) return segmentStart;
      }
      return 0;
    } : void 0, this.#lineAnnotations);
    if (change !== void 0) this.#applyChange(change, nextSelections, this.#applyChangeToLineAnnotations(change));
  }
  #deleteWordBackward() {
    const selections = this.#selections;
    const textDocument = this.#textDocument;
    if (selections === void 0 || textDocument === void 0) return;
    const { nextSelections, change } = applyDeleteWordBackwardToSelections(textDocument, selections, this.#lineAnnotations);
    if (change !== void 0) this.#applyChange(change, nextSelections, this.#applyChangeToLineAnnotations(change));
  }
  #deleteHardLineForward() {
    const selections = this.#selections;
    const textDocument = this.#textDocument;
    if (selections === void 0 || textDocument === void 0) return;
    const { nextSelections, change } = applyDeleteHardLineForwardToSelections(textDocument, selections, this.#lineAnnotations);
    if (change !== void 0) this.#applyChange(change, nextSelections, this.#applyChangeToLineAnnotations(change));
  }
  #insertTranspose() {
    const selections = this.#selections;
    const textDocument = this.#textDocument;
    if (selections === void 0 || textDocument === void 0) return;
    const { nextSelections, change } = applyTransposeToSelections(textDocument, selections, this.#lineAnnotations);
    if (change !== void 0) this.#applyChange(change, nextSelections, this.#applyChangeToLineAnnotations(change));
  }
  #applyChange(change, newSelections, newLineAnnotations, options) {
    const fileRef = this.getFile();
    const onChange = this.#options.onChange;
    if (fileRef !== void 0 && onChange !== void 0) {
      const lineAnnotations = newLineAnnotations ?? this.#lineAnnotations;
      onChange(fileRef, lineAnnotations, {
        changes: change.changes,
        file: fileRef,
        lineAnnotations
      });
    }
    if (change.lineDelta !== 0 || this.#isWrap) {
      for (const line of this.#lineYCache.keys()) if (line >= change.startLine) this.#lineYCache.delete(line);
    }
    if (this.#wrapLineOffsetsCache.size > 0) {
      if (change.lineDelta === 0 && (change.changedLineRanges.length === 1 || change.changedLineChanges?.every(([, , editLineDelta]) => editLineDelta === 0) === true)) for (const [rangeStart, rangeEnd] of change.changedLineRanges) for (let line = rangeStart; line <= rangeEnd; line++) this.#wrapLineOffsetsCache.delete(line);
      else for (const line of this.#wrapLineOffsetsCache.keys()) if (line >= change.startLine) this.#wrapLineOffsetsCache.delete(line);
    }
    this.#lastAccessedCharX = void 0;
    let renderRange = this.#renderRange;
    let shouldUpdateBuffer;
    if (renderRange !== void 0 && newSelections !== void 0 && newSelections.length > 0) {
      const primarySelection = newSelections.at(-1);
      const renderRangeEndLine = renderRange.startingLine + renderRange.totalLines;
      if (primarySelection.end.line >= renderRangeEndLine) {
        const widenedTotalLines = primarySelection.end.line - renderRange.startingLine + 1;
        const maxWidenLines = this.#viewportWindowLines === void 0 || this.#viewportWindowLines === Infinity ? Infinity : this.#viewportWindowLines * MAX_EDIT_WIDEN_WINDOW_MULTIPLE;
        if (change.startLine <= renderRangeEndLine && widenedTotalLines <= maxWidenLines && this.#isLineRenderable(primarySelection.end.line)) {
          if (primarySelection.end.line > renderRangeEndLine) shouldUpdateBuffer = true;
          renderRange = {
            ...renderRange,
            totalLines: widenedTotalLines
          };
          this.#renderRange = renderRange;
        } else shouldUpdateBuffer = true;
      }
    }
    this.#rerender(change, newLineAnnotations, renderRange, shouldUpdateBuffer);
    if (options?.skipSearchRefresh !== true && this.#searchPanel !== void 0 && this.#matches !== void 0) this.#searchPanel.updateMatches({ syncSelection: false });
    if (newSelections !== void 0) {
      this.#updateSelections(newSelections);
      if (options?.skipFocus !== true) {
        const revealTarget = newSelections.at(-1);
        if (revealTarget !== void 0) this.#revealLineIfCollapsed(getCaretPosition(revealTarget).line);
        if (this.#primaryCaretElement !== void 0) requestAnimationFrame(() => {
          this.#primaryCaretElement?.scrollIntoView({
            block: "nearest",
            inline: "nearest"
          });
        });
        else if (newSelections.length > 0) {
          const pos = getCaretPosition(newSelections.at(-1));
          this.#scrollToLine(pos.line, pos.character);
        }
        this.focus({ preventScroll: true });
      }
    }
  }
  #applyChangeToLineAnnotations(change) {
    if (this.#lineAnnotations !== void 0) {
      const nextLineAnnotations = applyDocumentChangeToLineAnnotations(change, this.#lineAnnotations);
      if (nextLineAnnotations !== void 0) {
        this.#textDocument?.setLastUndoLineAnnotations(this.#lineAnnotations, nextLineAnnotations);
        return nextLineAnnotations;
      }
    }
  }
  #getRenderedEditableLineRanges() {
    const contentElement = this.#contentElement;
    if (contentElement === void 0) return [];
    const ranges = [];
    for (const child of contentElement.children) {
      const el = child;
      const lineType = el.dataset.lineType;
      const lineNumber = getLineNumberAttr(el);
      if (lineNumber === void 0 || lineType === void 0 || !isLineEditable(lineType)) continue;
      const line = lineNumber - 1;
      const current = ranges.at(-1);
      if (current !== void 0 && line <= current[1] + 1) current[1] = Math.max(current[1], line);
      else ranges.push([line, line]);
    }
    return ranges;
  }
  #getLineElement(line) {
    let lineElement = this.#lineElementsCache.get(line);
    if (lineElement !== void 0) return lineElement ?? void 0;
    const renderRange = this.#renderRange;
    if (renderRange !== void 0 && (line < renderRange.startingLine || line >= renderRange.startingLine + renderRange.totalLines)) return;
    const contentElement = this.#contentElement;
    if (contentElement === void 0) return;
    if (renderRange !== void 0) {
      const { startingLine } = renderRange;
      const { children } = contentElement;
      for (let i = line - startingLine; i <= children.length; i++) {
        const child = children[i];
        if (child === void 0) break;
        const lineNumber = getLineNumberAttr(child);
        const lineType = child.dataset.lineType;
        if (lineNumber !== void 0 && lineNumber === line + 1 && lineType !== void 0 && isLineEditable(lineType)) {
          lineElement = child;
          break;
        }
      }
    }
    lineElement ??= contentElement.querySelector(`[data-line="${line + 1}"]` + (this.#diffSyle === "unified" ? ':not([data-line-type="change-deletion"])' : ""));
    if (lineElement !== void 0) this.#lineElementsCache.set(line, lineElement);
    return lineElement ?? void 0;
  }
  #getGutterWidth() {
    if (this.#gutterElement === void 0) return 0;
    if (this.#gutterWidthCache === void 0) {
      const diffsColumnNumberWidth = this.#contentElement?.parentElement?.style.getPropertyValue("--diffs-column-number-width");
      if (diffsColumnNumberWidth !== void 0 && diffsColumnNumberWidth.length > 2 && diffsColumnNumberWidth.endsWith("px")) this.#gutterWidthCache = parseInt(diffsColumnNumberWidth.slice(0, -2), 10);
      else this.#gutterWidthCache = this.#gutterElement.offsetWidth;
    }
    return this.#gutterWidthCache;
  }
  #getContentWidth() {
    if (this.#contentElement === void 0) return 0;
    if (this.#contentWidthCache === void 0) {
      const diffsColumnContentWidth = this.#contentElement.parentElement?.style.getPropertyValue("--diffs-column-content-width");
      if (diffsColumnContentWidth !== void 0 && diffsColumnContentWidth.length > 2 && diffsColumnContentWidth.endsWith("px")) this.#contentWidthCache = parseFloat(diffsColumnContentWidth.slice(0, -2));
      else this.#contentWidthCache = this.#contentElement.offsetWidth;
    }
    return this.#contentWidthCache;
  }
  #getLineY(line) {
    const cachedY = this.#lineYCache.get(line);
    if (cachedY !== void 0) return cachedY;
    const lineElement = this.#getLineElement(line);
    if (lineElement === void 0) return -1;
    let y = lineElement.offsetTop + this.#metrics.paddingTop;
    y += this.#activeContentOffset?.top ?? 0;
    this.#lineYCache.set(line, y);
    return y;
  }
  #getCharX(line, char) {
    if (this.#lastAccessedCharX !== void 0 && this.#lastAccessedCharX[0] === line && this.#lastAccessedCharX[1] === char) return [this.#lastAccessedCharX[2], this.#lastAccessedCharX[3]];
    const lineText = this.#textDocument?.getLineText(line);
    const offsetLeft = this.#getGutterWidth() + this.#metrics.ch;
    if (lineText === void 0 || lineText.length === 0 || char <= 0) return [offsetLeft + (this.#activeContentOffset?.left ?? 0), 0];
    const boundedCharacter = snapTextOffsetToUnicodeBoundary(lineText, Math.min(char, lineText.length));
    const textBeforeCharacter = lineText.slice(0, boundedCharacter);
    const asciiColumns = getExpandedAsciiTextColumns(textBeforeCharacter, this.#metrics.tabSize);
    let left = 0;
    let wrapLine = 0;
    if (asciiColumns !== -1) left = offsetLeft + asciiColumns * this.#metrics.ch;
    else left = offsetLeft + this.#metrics.measureTextWidth(textBeforeCharacter);
    if (this.#isWrap) {
      const contentWidth = this.#getContentWidth();
      if (2 * this.#metrics.ch + this.#metrics.measureTextWidth(lineText) > contentWidth) {
        const wrapOffsets = this.#wrapLineText(line);
        if (wrapOffsets == null) return [left + (this.#activeContentOffset?.left ?? 0), 0];
        for (let w = 0; w + 1 < wrapOffsets.length; w++) {
          const segmentStart = wrapOffsets[w];
          if (boundedCharacter <= wrapOffsets[w + 1]) {
            wrapLine = w;
            const prefixInSegment = lineText.slice(segmentStart, boundedCharacter);
            const segmentAsciiColumns = getExpandedAsciiTextColumns(prefixInSegment, this.#metrics.tabSize);
            if (segmentAsciiColumns !== -1) left = offsetLeft + segmentAsciiColumns * this.#metrics.ch;
            else left = offsetLeft + this.#metrics.measureTextWidth(prefixInSegment);
            break;
          }
        }
      }
      left += this.#activeContentOffset?.left ?? 0;
    }
    if (this.#lastAccessedCharX !== void 0) {
      this.#lastAccessedCharX[0] = line;
      this.#lastAccessedCharX[1] = char;
      this.#lastAccessedCharX[2] = left;
      this.#lastAccessedCharX[3] = wrapLine;
    } else this.#lastAccessedCharX = [
      line,
      char,
      left,
      wrapLine
    ];
    return [left, wrapLine];
  }
  #wrapLineText(line) {
    const cachedOffsets = this.#wrapLineOffsetsCache.get(line);
    if (cachedOffsets !== void 0) return cachedOffsets;
    if (this.#wrapLineOffsetsCache.size >= MAX_WRAP_OFFSETS_CACHE_LINES) this.#wrapLineOffsetsCache.clear();
    const lineText = this.#textDocument?.getLineText(line);
    if (lineText === void 0 || lineText.length === 0) {
      const offsets = new Uint32Array([0]);
      this.#wrapLineOffsetsCache.set(line, offsets);
      return offsets;
    }
    const contentElement = this.#contentElement;
    if (contentElement == null || !contentElement.isConnected) return;
    const div = h("div", {
      style: {
        position: "absolute",
        top: "0",
        left: "0",
        width: "100%",
        boxSizing: "border-box",
        visibility: "hidden",
        pointerEvents: "none",
        whiteSpace: "pre-wrap",
        wordBreak: "break-word",
        font: "inherit",
        paddingInline: "1ch",
        tabSize: this.#metrics.tabSize.toString()
      },
      textContent: lineText
    }, contentElement);
    const textNode = div.firstChild;
    const range = document.createRange();
    const starts = [];
    try {
      const divRect = div.getBoundingClientRect();
      if (divRect.width === 0) return;
      const unicodeOffsets = getUnicodeMeasurementOffsets(lineText);
      const wrapLineStartLeft = divRect.left + this.#metrics.ch;
      const graphemeCount = unicodeOffsets === void 0 ? lineText.length : unicodeOffsets.length - 1;
      const graphemeStart = (index) => unicodeOffsets === void 0 ? index : unicodeOffsets[index];
      const measureGrapheme = (index) => {
        range.setStart(textNode, graphemeStart(index));
        range.setEnd(textNode, graphemeStart(index + 1));
        return range.getBoundingClientRect();
      };
      starts.push(0);
      let lastTop = measureGrapheme(0).top;
      let searchStart = 1;
      while (searchStart < graphemeCount) {
        let low = searchStart;
        let high = graphemeCount;
        while (low < high) {
          const mid = low + high >> 1;
          if (measureGrapheme(mid).top > lastTop) high = mid;
          else low = mid + 1;
        }
        if (low >= graphemeCount) break;
        const { left, top } = measureGrapheme(low);
        const startsPastLineStart = isSafari() && left - wrapLineStartLeft > this.#metrics.ch / 2;
        starts.push(graphemeStart(startsPastLineStart ? low - 1 : low));
        lastTop = top;
        searchStart = low + 1;
      }
      const offsets = new Uint32Array(starts.length + 1);
      for (let i = 0; i < starts.length; i++) offsets[i] = starts[i];
      offsets[starts.length] = lineText.length;
      this.#wrapLineOffsetsCache.set(line, offsets);
      return offsets;
    } finally {
      div.remove();
    }
  }
  #wrapLineTextOrWholeLine(line) {
    const offsets = this.#wrapLineText(line);
    if (offsets !== void 0) return offsets;
    const length = this.#textDocument?.getLineText(line)?.length ?? 0;
    return Uint32Array.of(0, length);
  }
  #rangeBelongsToEditor({ startContainer, endContainer }) {
    const contentEl = this.#contentElement;
    if (contentEl === void 0) return false;
    return contentEl.contains(startContainer) && contentEl.contains(endContainer);
  }
  #isLineVisible(line) {
    const lineCount = this.#textDocument?.lineCount ?? 0;
    if (line < 0 || line >= lineCount) return false;
    return this.#getLineElement(line) !== void 0;
  }
};
function hasOnlyWinLineEndings(string) {
  return string.includes("\r\n") && !string.startsWith("\n") && !string.match(/[^\r]\n/);
}
function hasOnlyUnixLineEndings(string) {
  return !string.includes("\r\n") && string.includes("\n");
}
function unixToWin(patch) {
  if (Array.isArray(patch)) {
    return patch.map((p) => unixToWin(p));
  }
  return Object.assign(Object.assign({}, patch), { hunks: patch.hunks.map((hunk) => Object.assign(Object.assign({}, hunk), { lines: hunk.lines.map((line, i) => {
    var _a;
    return line.startsWith("\\") || line.endsWith("\r") || ((_a = hunk.lines[i + 1]) === null || _a === void 0 ? void 0 : _a.startsWith("\\")) ? line : line + "\r";
  }) })) });
}
function winToUnix(patch) {
  if (Array.isArray(patch)) {
    return patch.map((p) => winToUnix(p));
  }
  return Object.assign(Object.assign({}, patch), { hunks: patch.hunks.map((hunk) => Object.assign(Object.assign({}, hunk), { lines: hunk.lines.map((line) => line.endsWith("\r") ? line.substring(0, line.length - 1) : line) })) });
}
function isUnix(patch) {
  if (!Array.isArray(patch)) {
    patch = [patch];
  }
  return !patch.some((index) => index.hunks.some((hunk) => hunk.lines.some((line) => !line.startsWith("\\") && line.endsWith("\r"))));
}
function isWin(patch) {
  if (!Array.isArray(patch)) {
    patch = [patch];
  }
  return patch.some((index) => index.hunks.some((hunk) => hunk.lines.some((line) => line.endsWith("\r")))) && patch.every((index) => index.hunks.every((hunk) => hunk.lines.every((line, i) => {
    var _a;
    return line.startsWith("\\") || line.endsWith("\r") || ((_a = hunk.lines[i + 1]) === null || _a === void 0 ? void 0 : _a.startsWith("\\"));
  })));
}
function parsePatch(uniDiff) {
  const diffstr = uniDiff.split(/\n/), list = [];
  let i = 0;
  function isGitDiffHeader(line) {
    return /^diff --git /.test(line);
  }
  function isDiffHeader(line) {
    return isGitDiffHeader(line) || /^Index:\s/.test(line) || /^diff(?: -r \w+)+\s/.test(line);
  }
  function isFileHeader(line) {
    return /^(---|\+\+\+)\s/.test(line);
  }
  function isHunkHeader(line) {
    return /^@@\s/.test(line);
  }
  function parseIndex() {
    var _a;
    const index = {};
    index.hunks = [];
    list.push(index);
    let seenDiffHeader = false;
    while (i < diffstr.length) {
      const line = diffstr[i];
      if (isFileHeader(line) || isHunkHeader(line)) {
        break;
      }
      if (isGitDiffHeader(line)) {
        if (seenDiffHeader) {
          return;
        }
        seenDiffHeader = true;
        index.isGit = true;
        const paths = parseGitDiffHeader(line);
        if (paths) {
          index.oldFileName = paths.oldFileName;
          index.newFileName = paths.newFileName;
        }
        i++;
        while (i < diffstr.length) {
          const extLine = diffstr[i];
          if (isFileHeader(extLine) || isHunkHeader(extLine) || isDiffHeader(extLine)) {
            break;
          }
          const renameFromMatch = /^rename from (.*)/.exec(extLine);
          if (renameFromMatch) {
            index.oldFileName = "a/" + unquoteIfQuoted(renameFromMatch[1]);
            index.isRename = true;
          }
          const renameToMatch = /^rename to (.*)/.exec(extLine);
          if (renameToMatch) {
            index.newFileName = "b/" + unquoteIfQuoted(renameToMatch[1]);
            index.isRename = true;
          }
          const copyFromMatch = /^copy from (.*)/.exec(extLine);
          if (copyFromMatch) {
            index.oldFileName = "a/" + unquoteIfQuoted(copyFromMatch[1]);
            index.isCopy = true;
          }
          const copyToMatch = /^copy to (.*)/.exec(extLine);
          if (copyToMatch) {
            index.newFileName = "b/" + unquoteIfQuoted(copyToMatch[1]);
            index.isCopy = true;
          }
          const newFileModeMatch = /^new file mode (\d+)/.exec(extLine);
          if (newFileModeMatch) {
            index.isCreate = true;
            index.newMode = newFileModeMatch[1];
          }
          const deletedFileModeMatch = /^deleted file mode (\d+)/.exec(extLine);
          if (deletedFileModeMatch) {
            index.isDelete = true;
            index.oldMode = deletedFileModeMatch[1];
          }
          const oldModeMatch = /^old mode (\d+)/.exec(extLine);
          if (oldModeMatch) {
            index.oldMode = oldModeMatch[1];
          }
          const newModeMatch = /^new mode (\d+)/.exec(extLine);
          if (newModeMatch) {
            index.newMode = newModeMatch[1];
          }
          if (/^Binary files /.test(extLine)) {
            index.isBinary = true;
          }
          i++;
        }
        continue;
      } else if (isDiffHeader(line)) {
        if (seenDiffHeader) {
          return;
        }
        seenDiffHeader = true;
        const headerMatch = /^(?:Index:|diff(?: -r \w+)+)\s+/.exec(line);
        if (headerMatch) {
          index.index = line.substring(headerMatch[0].length).trim();
        }
      }
      i++;
    }
    parseFileHeader(index);
    parseFileHeader(index);
    if (index.oldFileName === void 0 !== (index.newFileName === void 0)) {
      throw new Error("Missing " + (index.oldFileName !== void 0 ? '"+++ ..."' : '"--- ..."') + " file header for " + ((_a = index.oldFileName) !== null && _a !== void 0 ? _a : index.newFileName));
    }
    while (i < diffstr.length) {
      const line = diffstr[i];
      if (isDiffHeader(line) || isFileHeader(line) || /^===================================================================/.test(line)) {
        break;
      } else if (isHunkHeader(line)) {
        index.hunks.push(parseHunk());
      } else {
        i++;
      }
    }
  }
  function parseGitDiffHeader(line) {
    const rest = line.substring("diff --git ".length);
    if (rest.startsWith('"')) {
      const oldPath = parseQuotedFileName(rest);
      if (oldPath === null) {
        return null;
      }
      const afterOld = rest.substring(oldPath.rawLength + 1);
      let newFileName;
      if (afterOld.startsWith('"')) {
        const newPath = parseQuotedFileName(afterOld);
        if (newPath === null) {
          return null;
        }
        newFileName = newPath.fileName;
      } else {
        newFileName = afterOld;
      }
      return {
        oldFileName: oldPath.fileName,
        newFileName
      };
    }
    const quoteIdx = rest.indexOf('"');
    if (quoteIdx > 0) {
      const oldFileName = rest.substring(0, quoteIdx - 1);
      const newPath = parseQuotedFileName(rest.substring(quoteIdx));
      if (newPath === null) {
        return null;
      }
      return {
        oldFileName,
        newFileName: newPath.fileName
      };
    }
    if (rest.startsWith("a/")) {
      const splits = [];
      let idx = 0;
      while (true) {
        idx = rest.indexOf(" b/", idx + 1);
        if (idx === -1) {
          break;
        }
        splits.push(idx);
      }
      if (splits.length > 0) {
        const mid = splits[Math.floor(splits.length / 2)];
        return {
          oldFileName: rest.substring(0, mid),
          newFileName: rest.substring(mid + 1)
        };
      }
    }
    return null;
  }
  function unquoteIfQuoted(s) {
    if (s.startsWith('"')) {
      const parsed = parseQuotedFileName(s);
      if (parsed) {
        return parsed.fileName;
      }
    }
    return s;
  }
  function parseQuotedFileName(s) {
    if (!s.startsWith('"')) {
      return null;
    }
    let result = "";
    let j = 1;
    while (j < s.length) {
      if (s[j] === '"') {
        return { fileName: result, rawLength: j + 1 };
      }
      if (s[j] === "\\" && j + 1 < s.length) {
        j++;
        switch (s[j]) {
          case "a":
            result += "\x07";
            break;
          case "b":
            result += "\b";
            break;
          case "f":
            result += "\f";
            break;
          case "n":
            result += "\n";
            break;
          case "r":
            result += "\r";
            break;
          case "t":
            result += "	";
            break;
          case "v":
            result += "\v";
            break;
          case "\\":
            result += "\\";
            break;
          case '"':
            result += '"';
            break;
          case "0":
          case "1":
          case "2":
          case "3":
          case "4":
          case "5":
          case "6":
          case "7": {
            if (j + 2 >= s.length || s[j + 1] < "0" || s[j + 1] > "7" || s[j + 2] < "0" || s[j + 2] > "7") {
              return null;
            }
            const bytes = [parseInt(s.substring(j, j + 3), 8)];
            j += 3;
            while (s[j] === "\\" && s[j + 1] >= "0" && s[j + 1] <= "7") {
              if (j + 3 >= s.length || s[j + 2] < "0" || s[j + 2] > "7" || s[j + 3] < "0" || s[j + 3] > "7") {
                return null;
              }
              bytes.push(parseInt(s.substring(j + 1, j + 4), 8));
              j += 4;
            }
            result += new TextDecoder("utf-8").decode(new Uint8Array(bytes));
            continue;
          }
          // Note that in C, there are also three kinds of hex escape sequences:
          // - \xhh
          // - \uhhhh
          // - \Uhhhhhhhh
          // We do not bother to parse them here because, so far as we know,
          // they are never emitted by any tools that generate unified diff
          // format diffs, and so for now jsdiff does not consider them legal.
          default:
            return null;
        }
      } else {
        result += s[j];
      }
      j++;
    }
    return null;
  }
  function parseFileHeader(index) {
    const fileHeaderMatch = /^(---|\+\+\+)\s+/.exec(diffstr[i]);
    if (fileHeaderMatch) {
      const prefix = fileHeaderMatch[1], data = diffstr[i].substring(3).trim().split("	", 2), header = (data[1] || "").trim();
      let fileName = data[0];
      if (fileName.startsWith('"')) {
        fileName = unquoteIfQuoted(fileName);
      } else {
        fileName = fileName.replace(/\\\\/g, "\\");
      }
      if (prefix === "---") {
        index.oldFileName = fileName;
        index.oldHeader = header;
      } else {
        index.newFileName = fileName;
        index.newHeader = header;
      }
      i++;
    }
  }
  function parseHunk() {
    var _a;
    const chunkHeaderIndex = i, chunkHeaderLine = diffstr[i++], chunkHeader = chunkHeaderLine.split(/@@ -(\d+)(?:,(\d+))? \+(\d+)(?:,(\d+))? @@/);
    const hunk = {
      oldStart: +chunkHeader[1],
      oldLines: typeof chunkHeader[2] === "undefined" ? 1 : +chunkHeader[2],
      newStart: +chunkHeader[3],
      newLines: typeof chunkHeader[4] === "undefined" ? 1 : +chunkHeader[4],
      lines: []
    };
    if (hunk.oldLines === 0) {
      hunk.oldStart += 1;
    }
    if (hunk.newLines === 0) {
      hunk.newStart += 1;
    }
    let addCount = 0, removeCount = 0;
    for (; i < diffstr.length && (removeCount < hunk.oldLines || addCount < hunk.newLines || ((_a = diffstr[i]) === null || _a === void 0 ? void 0 : _a.startsWith("\\"))); i++) {
      const operation = diffstr[i].length == 0 && i != diffstr.length - 1 ? " " : diffstr[i][0];
      if (operation === "+" || operation === "-" || operation === " " || operation === "\\") {
        hunk.lines.push(diffstr[i]);
        if (operation === "+") {
          addCount++;
        } else if (operation === "-") {
          removeCount++;
        } else if (operation === " ") {
          addCount++;
          removeCount++;
        }
      } else {
        throw new Error(`Hunk at line ${chunkHeaderIndex + 1} contained invalid line ${diffstr[i]}`);
      }
    }
    if (!addCount && hunk.newLines === 1) {
      hunk.newLines = 0;
    }
    if (!removeCount && hunk.oldLines === 1) {
      hunk.oldLines = 0;
    }
    if (addCount !== hunk.newLines) {
      throw new Error("Added line count did not match for hunk at line " + (chunkHeaderIndex + 1));
    }
    if (removeCount !== hunk.oldLines) {
      throw new Error("Removed line count did not match for hunk at line " + (chunkHeaderIndex + 1));
    }
    if (i < diffstr.length && diffstr[i] && /^[+ -]/.test(diffstr[i]) && !isFileHeader(diffstr[i])) {
      throw new Error("Hunk at line " + (chunkHeaderIndex + 1) + " has more lines than expected (expected " + hunk.oldLines + " old lines and " + hunk.newLines + " new lines)");
    }
    return hunk;
  }
  while (i < diffstr.length) {
    parseIndex();
  }
  return list;
}
function distanceIterator(start, minLine, maxLine) {
  let wantForward = true, backwardExhausted = false, forwardExhausted = false, localOffset = 1;
  return function iterator() {
    if (wantForward && !forwardExhausted) {
      if (backwardExhausted) {
        localOffset++;
      } else {
        wantForward = false;
      }
      if (start + localOffset <= maxLine) {
        return start + localOffset;
      }
      forwardExhausted = true;
    }
    if (!backwardExhausted) {
      if (!forwardExhausted) {
        wantForward = true;
      }
      if (minLine <= start - localOffset) {
        return start - localOffset++;
      }
      backwardExhausted = true;
      return iterator();
    }
    return void 0;
  };
}
function applyPatch(source, patch, options = {}) {
  let patches;
  if (typeof patch === "string") {
    patches = parsePatch(patch);
  } else if (Array.isArray(patch)) {
    patches = patch;
  } else {
    patches = [patch];
  }
  if (patches.length > 1) {
    throw new Error("applyPatch only works with a single input.");
  }
  return applyStructuredPatch(source, patches[0], options);
}
function applyStructuredPatch(source, patch, options = {}) {
  if (options.autoConvertLineEndings || options.autoConvertLineEndings == null) {
    if (hasOnlyWinLineEndings(source) && isUnix(patch)) {
      patch = unixToWin(patch);
    } else if (hasOnlyUnixLineEndings(source) && isWin(patch)) {
      patch = winToUnix(patch);
    }
  }
  const lines = source.split("\n"), hunks = patch.hunks, compareLine = options.compareLine || ((lineNumber, line, operation, patchContent) => line === patchContent), fuzzFactor = options.fuzzFactor || 0;
  let minLine = 0;
  if (fuzzFactor < 0 || !Number.isInteger(fuzzFactor)) {
    throw new Error("fuzzFactor must be a non-negative integer");
  }
  if (!hunks.length) {
    return source;
  }
  let prevLine = "", removeEOFNL = false, addEOFNL = false;
  for (let i = 0; i < hunks[hunks.length - 1].lines.length; i++) {
    const line = hunks[hunks.length - 1].lines[i];
    if (line[0] == "\\") {
      if (prevLine[0] == "+") {
        removeEOFNL = true;
      } else if (prevLine[0] == "-") {
        addEOFNL = true;
      }
    }
    prevLine = line;
  }
  if (removeEOFNL) {
    if (addEOFNL) {
      if (!fuzzFactor && lines[lines.length - 1] == "") {
        return false;
      }
    } else if (lines[lines.length - 1] == "") {
      lines.pop();
    } else if (!fuzzFactor) {
      return false;
    }
  } else if (addEOFNL) {
    if (lines[lines.length - 1] != "") {
      lines.push("");
    } else if (!fuzzFactor) {
      return false;
    }
  }
  function applyHunk(hunkLines, toPos, maxErrors, hunkLinesI = 0, lastContextLineMatched = true, patchedLines = [], patchedLinesLength = 0) {
    let nConsecutiveOldContextLines = 0;
    let nextContextLineMustMatch = false;
    for (; hunkLinesI < hunkLines.length; hunkLinesI++) {
      const hunkLine = hunkLines[hunkLinesI], operation = hunkLine.length > 0 ? hunkLine[0] : " ", content = hunkLine.length > 0 ? hunkLine.substr(1) : hunkLine;
      if (operation === "-") {
        if (compareLine(toPos + 1, lines[toPos], operation, content)) {
          toPos++;
          nConsecutiveOldContextLines = 0;
        } else {
          if (!maxErrors || lines[toPos] == null) {
            return null;
          }
          patchedLines[patchedLinesLength] = lines[toPos];
          return applyHunk(hunkLines, toPos + 1, maxErrors - 1, hunkLinesI, false, patchedLines, patchedLinesLength + 1);
        }
      }
      if (operation === "+") {
        if (!lastContextLineMatched) {
          return null;
        }
        patchedLines[patchedLinesLength] = content;
        patchedLinesLength++;
        nConsecutiveOldContextLines = 0;
        nextContextLineMustMatch = true;
      }
      if (operation === " ") {
        nConsecutiveOldContextLines++;
        patchedLines[patchedLinesLength] = lines[toPos];
        if (compareLine(toPos + 1, lines[toPos], operation, content)) {
          patchedLinesLength++;
          lastContextLineMatched = true;
          nextContextLineMustMatch = false;
          toPos++;
        } else {
          if (nextContextLineMustMatch || !maxErrors) {
            return null;
          }
          return lines[toPos] && (applyHunk(hunkLines, toPos + 1, maxErrors - 1, hunkLinesI + 1, false, patchedLines, patchedLinesLength + 1) || applyHunk(hunkLines, toPos + 1, maxErrors - 1, hunkLinesI, false, patchedLines, patchedLinesLength + 1)) || applyHunk(hunkLines, toPos, maxErrors - 1, hunkLinesI + 1, false, patchedLines, patchedLinesLength);
        }
      }
    }
    patchedLinesLength -= nConsecutiveOldContextLines;
    toPos -= nConsecutiveOldContextLines;
    patchedLines.length = patchedLinesLength;
    return {
      patchedLines,
      oldLineLastI: toPos - 1
    };
  }
  const resultLines = [];
  let prevHunkOffset = 0;
  for (let i = 0; i < hunks.length; i++) {
    const hunk = hunks[i];
    let hunkResult;
    const maxLine = lines.length - hunk.oldLines + fuzzFactor;
    let toPos;
    for (let maxErrors = 0; maxErrors <= fuzzFactor; maxErrors++) {
      toPos = hunk.oldStart + prevHunkOffset - 1;
      const iterator = distanceIterator(toPos, minLine, maxLine);
      for (; toPos !== void 0; toPos = iterator()) {
        hunkResult = applyHunk(hunk.lines, toPos, maxErrors);
        if (hunkResult) {
          break;
        }
      }
      if (hunkResult) {
        break;
      }
    }
    if (!hunkResult) {
      return false;
    }
    for (let i2 = minLine; i2 < toPos; i2++) {
      resultLines.push(lines[i2]);
    }
    for (let i2 = 0; i2 < hunkResult.patchedLines.length; i2++) {
      const line = hunkResult.patchedLines[i2];
      resultLines.push(line);
    }
    minLine = hunkResult.oldLineLastI + 1;
    prevHunkOffset = toPos + 1 - hunk.oldStart;
  }
  for (let i = minLine; i < lines.length; i++) {
    resultLines.push(lines[i]);
  }
  return resultLines.join("\n");
}
function swapPrefix(fileName) {
  if (fileName === void 0 || fileName === "/dev/null") {
    return fileName;
  }
  if (fileName.startsWith("a/")) {
    return "b/" + fileName.slice(2);
  }
  if (fileName.startsWith("b/")) {
    return "a/" + fileName.slice(2);
  }
  return fileName;
}
function reversePatch(structuredPatch) {
  if (Array.isArray(structuredPatch)) {
    return structuredPatch.map((patch) => reversePatch(patch)).reverse();
  }
  const reversed = Object.assign(Object.assign({}, structuredPatch), { oldFileName: structuredPatch.isGit ? swapPrefix(structuredPatch.newFileName) : structuredPatch.newFileName, oldHeader: structuredPatch.newHeader, newFileName: structuredPatch.isGit ? swapPrefix(structuredPatch.oldFileName) : structuredPatch.oldFileName, newHeader: structuredPatch.oldHeader, oldMode: structuredPatch.newMode, newMode: structuredPatch.oldMode, isCreate: structuredPatch.isDelete, isDelete: structuredPatch.isCreate, hunks: structuredPatch.hunks.map((hunk) => {
    return {
      oldLines: hunk.newLines,
      oldStart: hunk.newStart,
      newLines: hunk.oldLines,
      newStart: hunk.oldStart,
      lines: hunk.lines.map((l) => {
        if (l.startsWith("-")) {
          return `+${l.slice(1)}`;
        }
        if (l.startsWith("+")) {
          return `-${l.slice(1)}`;
        }
        return l;
      })
    };
  }) });
  if (structuredPatch.isCopy) {
    reversed.newFileName = "/dev/null";
    reversed.newHeader = void 0;
    reversed.isDelete = true;
    delete reversed.isCreate;
    delete reversed.isCopy;
    delete reversed.isRename;
    reversed.hunks = [];
  }
  return reversed;
}
function getSingularPatch(patch) {
  const parsedPatches = parsePatchFiles(patch);
  if (parsedPatches.length !== 1) {
    console.error(parsedPatches);
    throw new Error("PatchDiff: Provided patch must include only 1 patch, with 1 diff");
  }
  const { files } = parsedPatches[0];
  if (files.length !== 1) {
    console.error(files);
    throw new Error("FileDiff: Provided patch must contain exactly 1 file diff");
  }
  return files[0];
}
function PatchDiff({ patch, options, editorOptions, metrics, lineAnnotations, selectedLines, className, style, prerenderedHTML, renderAnnotation, renderCustomHeader, renderHeaderPrefix, renderHeaderFilenameSuffix, renderHeaderMetadata, renderGutterUtility, disableWorkerPool = false, edit = false }) {
  const fileDiff = usePatch(patch);
  const { ref, getHoveredLine } = useFileDiffInstance({
    fileDiff,
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
    children: templateRender(renderDiffChildren({
      fileDiff,
      renderCustomHeader,
      renderHeaderPrefix,
      renderHeaderFilenameSuffix,
      renderHeaderMetadata,
      renderAnnotation,
      lineAnnotations,
      renderGutterUtility,
      getHoveredLine
    }), prerenderedHTML)
  });
}
function usePatch(patch) {
  return reactExports.useMemo(() => getSingularPatch(patch), [patch]);
}
const CAP_LINES = 6;
const LINE_HEIGHT$1 = 17;
const DIFF_VARS$1 = {
  "--diffs-font-size": "10px",
  "--diffs-line-height": `${LINE_HEIGHT$1}px`,
  "--diffs-bg": "transparent"
};
class PatchErrorBoundary extends reactExports.Component {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}
function patchPreviewLineCount(patch) {
  const rows = patch.split("\n");
  const hasHunk = rows.some((line) => line.startsWith("@@"));
  if (!hasHunk) return rows.filter((line, index) => line !== "" || index < rows.length - 1).length;
  let insideHunk = false;
  let count = 0;
  for (const line of rows) {
    if (line.startsWith("@@")) {
      insideHunk = true;
      continue;
    }
    if (insideHunk && !line.startsWith("\\ No newline") && (line.startsWith("+") || line.startsWith("-") || line.startsWith(" "))) {
      count += 1;
    }
  }
  return count;
}
function patchPreviewStat(patch, action) {
  let added = 0;
  let removed = 0;
  let insideHunk = false;
  for (const line of patch.split("\n")) {
    if (line.startsWith("@@")) {
      insideHunk = true;
      continue;
    }
    if (insideHunk && line.startsWith("+") && !line.startsWith("+++")) added += 1;
    if (insideHunk && line.startsWith("-") && !line.startsWith("---")) removed += 1;
  }
  if (!insideHunk && action === "create") {
    added = patch.split("\n").filter(Boolean).length;
  }
  if (!insideHunk && action === "remove") {
    removed = patch.split("\n").filter(Boolean).length;
  }
  return { added, removed };
}
function UnifiedPatchPreview({
  patch,
  action
}) {
  const [released, setReleased] = reactExports.useState(false);
  const diffTheme = useAvatarTheme() === "dark" ? "github-dark" : "github-light";
  const lineCount = patchPreviewLineCount(patch);
  const capped = lineCount > CAP_LINES;
  const stat = patchPreviewStat(patch, action);
  const toggleReleased = () => setReleased((value) => !value);
  if (!patch.trim()) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-2 py-2 text-[10px] text-[var(--text-muted)]", children: "No diff available." });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    PatchErrorBoundary,
    {
      fallback: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-2 py-2 text-[10px] text-[var(--text-muted)]", children: "Could not render this diff." }),
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: `relative min-w-0 overflow-hidden transition-[max-height] duration-150 motion-reduce:transition-none ${capped ? "cursor-pointer" : ""}`,
            style: { maxHeight: capped && !released ? CAP_LINES * LINE_HEIGHT$1 : void 0 },
            children: [
              capped ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  "aria-expanded": released,
                  "aria-label": released ? "Collapse code diff" : `Show all ${lineCount} lines`,
                  onClick: toggleReleased,
                  className: "absolute inset-0 z-10 w-full cursor-pointer bg-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--accent)]"
                }
              ) : null,
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                PatchDiff,
                {
                  patch,
                  disableWorkerPool: true,
                  style: DIFF_VARS$1,
                  options: {
                    theme: diffTheme,
                    diffStyle: "unified",
                    overflow: "wrap",
                    stickyHeader: false,
                    disableFileHeader: true
                  }
                }
              ),
              capped && !released ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  "aria-hidden": true,
                  className: "pointer-events-none absolute inset-x-0 bottom-0 h-[26px] bg-gradient-to-b from-transparent to-[var(--bg-inner)]"
                }
              ) : null
            ]
          }
        ),
        capped ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-8 items-center border-t border-[var(--border-subtle)] bg-[var(--bg-card-soft)] px-1.5 py-0.5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            "aria-expanded": released,
            onClick: toggleReleased,
            className: "flex min-w-0 flex-1 items-center gap-1.5 px-0.5 py-[3px] text-[10px] font-semibold text-[var(--text-muted)] hover:text-[var(--text-strong)]",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                ChevronDown,
                {
                  size: 11,
                  strokeWidth: 2,
                  "aria-hidden": true,
                  className: `transition-transform motion-reduce:transition-none ${released ? "rotate-180" : ""}`
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: released ? "Show less" : `Show all ${lineCount} lines` }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-auto inline-flex shrink-0 gap-1.5 font-mono font-semibold", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[var(--success)]", children: [
                  "+",
                  stat.added
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[var(--danger)]", children: [
                  "−",
                  stat.removed
                ] })
              ] })
            ]
          }
        ) }) : null
      ] })
    }
  );
}
const ARTIFACT = {
  rule: { Icon: ScrollText, color: "var(--accent)" },
  skill: { Icon: Sparkles, color: "var(--warn)" },
  hook: { Icon: Webhook, color: "var(--info)" },
  doc: { Icon: FileText, color: "var(--text-muted)" }
};
const ACTION_GLYPH = {
  create: "+",
  update: "~",
  remove: "−"
};
function opActionLabel(op) {
  const verb = op.action === "create" ? "Add" : op.action === "update" ? "Update" : "Remove";
  const artifact = op.artifactType.charAt(0).toUpperCase() + op.artifactType.slice(1);
  return `${verb} ${artifact}`;
}
function OperationPill({
  op,
  searchQuery,
  label,
  tooltip,
  color: colorOverride
}) {
  const color = colorOverride ?? ARTIFACT[op.artifactType].color;
  const name = label ?? op.artifactType.charAt(0).toUpperCase() + op.artifactType.slice(1);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipLabel, { label: tooltip ?? opActionLabel(op), side: "top", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "span",
    {
      className: "inline-flex shrink-0 items-center gap-1 rounded-[5px] px-1.5 py-0.5 text-[10px] font-semibold leading-none",
      style: { background: `color-mix(in srgb, ${color} 16%, transparent)`, color },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[11px] font-bold", children: ACTION_GLYPH[op.action] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { transform: "translateY(0.5px)" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(SearchHighlightText, { text: name, query: searchQuery }) })
      ]
    }
  ) });
}
function fileNameFromPath(path) {
  const trimmed = path.replace(/[\\/]+$/, "");
  return trimmed.split(/[\\/]/).filter(Boolean).at(-1) ?? path;
}
function parentDirectoryPath(path) {
  const trimmed = path.replace(/[\\/]+$/, "");
  const separatorIndex = Math.max(trimmed.lastIndexOf("/"), trimmed.lastIndexOf("\\"));
  if (separatorIndex < 0) return ".";
  if (separatorIndex === 0) return trimmed.slice(0, 1);
  if (separatorIndex === 2 && /^[A-Za-z]:[\\/]/.test(trimmed)) return trimmed.slice(0, 3);
  return trimmed.slice(0, separatorIndex);
}
function buildEditableOperationDiff(operation, proposedContent) {
  const name = operation.targetPath ?? operation.pathDisplay ?? "suggestion.txt";
  if (operation.action === "create") {
    return parseDiffFromFile(null, { name, contents: proposedContent });
  }
  if (operation.action !== "update" || typeof operation.newContent !== "string") return null;
  const parsedPatch = parsePatch(operation.patchPreview);
  if (parsedPatch.length !== 1) return null;
  const originalContent = applyPatch(operation.newContent, reversePatch(parsedPatch[0]));
  if (originalContent === false) return null;
  return parseDiffFromFile(
    { name, contents: originalContent },
    { name, contents: proposedContent }
  );
}
const LINE_HEIGHT = 17;
const ACTION_TONE = {
  create: "var(--success)",
  update: "var(--info)",
  remove: "var(--danger)"
};
const DIFF_VARS = {
  "--diffs-font-size": "10px",
  "--diffs-line-height": `${LINE_HEIGHT}px`,
  "--diffs-bg": "transparent"
};
class DiffErrorBoundary extends reactExports.Component {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}
function location(op) {
  return {
    label: op.locationLabel ?? (op.artifactScope === "global" ? "Global" : "Project"),
    path: op.pathDisplay ?? op.targetPath?.split(/[\\/]/).pop() ?? "(no file)"
  };
}
function fileActionLabel(target) {
  if (target === "finder") return "Finder";
  if (target === "vscode") return "VS Code";
  return "Zed";
}
function patchLineCount(patch) {
  return patchPreviewLineCount(patch);
}
function operationDiffStat(op) {
  if (!op.patchPreview.includes("@@") && op.action === "create" && op.newContent) {
    return { added: op.newContent.split("\n").filter(Boolean).length, removed: 0 };
  }
  return patchPreviewStat(op.patchPreview, op.action);
}
function FileActionsMenu({
  op,
  onGoToLocation,
  fileOpenTargets = [],
  onOpenFile,
  onOpenFolder,
  onActionError,
  editing = false,
  onEditInline
}) {
  const loc = location(op);
  const targetPath = op.targetPath;
  const hasExistingFileTargets = Boolean(
    op.action !== "create" && targetPath && onOpenFile && fileOpenTargets.length > 0
  );
  const canOpenFutureFileFolder = Boolean(
    op.action === "create" && targetPath && onOpenFolder && fileOpenTargets.includes("finder")
  );
  if (!targetPath || !onEditInline && !onGoToLocation && !hasExistingFileTargets && !canOpenFutureFileFolder) {
    return null;
  }
  const run = (callback) => {
    onActionError?.(null);
    void callback().catch((error) => onActionError?.(error));
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenu, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        "aria-label": `More actions for ${loc.path}`,
        className: "flex size-7 shrink-0 items-center justify-center rounded-[6px] text-[var(--text-muted)] transition-colors hover:bg-[var(--bg-card-soft)] hover:text-[var(--text-strong)]",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuMoreIcon, { orientation: "horizontal" })
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuContent, { align: "end", className: "w-[196px] min-w-[196px]", children: [
      onEditInline ? /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuItem, { onSelect: onEditInline, children: [
        editing ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: editing ? "Save inline edit" : "Edit inline" })
      ] }) : null,
      onGoToLocation ? /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuItem, { onSelect: () => run(() => onGoToLocation(op)), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FolderSearch, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "truncate", children: [
          "Go to ",
          loc.label
        ] })
      ] }) : null,
      canOpenFutureFileFolder ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        DropdownMenuItem,
        {
          onSelect: () => {
            if (onOpenFolder) run(() => onOpenFolder(parentDirectoryPath(targetPath)));
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AppIcon, { app: "finder" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Open folder in Finder" })
          ]
        }
      ) : null,
      hasExistingFileTargets ? /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuSub, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuSubTrigger, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FolderOpen, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Open in" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuSubContent, { className: "w-[148px] min-w-[148px] max-w-[148px]", children: fileOpenTargets.map((target) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          DropdownMenuItem,
          {
            onSelect: () => {
              if (onOpenFile) run(() => onOpenFile(targetPath, target));
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(AppIcon, { app: target }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: fileActionLabel(target) })
            ]
          },
          target
        )) })
      ] }) : null
    ] })
  ] });
}
function isExecutable(op) {
  if (op.artifactType === "hook") return true;
  const normalized = (op.targetPath ?? "").replace(/\\/g, "/").trim().toLowerCase();
  return normalized.split("/").pop() === "settings.json";
}
function HookWarning() {
  const [open, setOpen] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-b border-[var(--border-subtle)]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        "aria-expanded": open,
        onClick: () => setOpen((value) => !value),
        className: "flex w-full items-center gap-1.5 px-2 py-[5px] text-left text-[10px] font-semibold text-[var(--text-muted)] hover:text-[var(--text-body)]",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { size: 12, strokeWidth: 2.1, "aria-hidden": true, className: "text-[var(--warn)]" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "min-w-0 flex-1", children: "Runs commands automatically" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            ChevronDown,
            {
              size: 11,
              strokeWidth: 2,
              "aria-hidden": true,
              className: `transition-transform motion-reduce:transition-none ${open ? "rotate-180" : ""}`
            }
          )
        ]
      }
    ),
    open ? /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "m-0 px-2 pb-[7px] pl-[26px] text-[10px] leading-[1.5] text-[var(--text-body)]", children: [
      "This edits a hook in ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "font-mono", children: "settings.json" }),
      ". The command in the patch below executes on its own during future agent runs, not just when you ask. Review it before applying."
    ] }) : null
  ] });
}
function DiffMessage({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-2 py-2 text-[10px] text-[var(--text-muted)]", children });
}
function OperationPatch({ op }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(UnifiedPatchPreview, { patch: op.patchPreview, action: op.action });
}
function EditableOperationPatch({
  op,
  content,
  onChange,
  onValidationError
}) {
  const [fileDiff] = reactExports.useState(() => buildEditableOperationDiff(op, content));
  const diffTheme = useAvatarTheme() === "dark" ? "github-dark" : "github-light";
  const createEditor = reactExports.useCallback(
    (options) => new Editor(options),
    []
  );
  if (!fileDiff) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(DiffMessage, { children: "This change cannot be edited inline. Describe the change below instead." });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(DiffErrorBoundary, { fallback: /* @__PURE__ */ jsxRuntimeExports.jsx(DiffMessage, { children: "Could not open the inline editor." }), children: /* @__PURE__ */ jsxRuntimeExports.jsx(EditProvider, { createEditor, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    FileDiff,
    {
      fileDiff,
      edit: true,
      disableWorkerPool: true,
      style: DIFF_VARS,
      editorOptions: {
        onAttach: (editor) => {
          requestAnimationFrame(() => editor.focus({ lineNumber: "first-visible" }));
        },
        onChange: (file) => {
          if (file.contents.length > 5e4) {
            onValidationError("Inline edits must be 50,000 characters or fewer.");
            return;
          }
          onValidationError(null);
          onChange(file.contents);
        }
      },
      options: {
        theme: diffTheme,
        diffStyle: "unified",
        overflow: "wrap",
        stickyHeader: false,
        disableFileHeader: true
      }
    }
  ) }) });
}
function SavedOperationPatch({
  op,
  content
}) {
  const fileDiff = reactExports.useMemo(() => buildEditableOperationDiff(op, content), [content, op]);
  const diffTheme = useAvatarTheme() === "dark" ? "github-dark" : "github-light";
  if (!fileDiff) return /* @__PURE__ */ jsxRuntimeExports.jsx(OperationPatch, { op });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(DiffErrorBoundary, { fallback: /* @__PURE__ */ jsxRuntimeExports.jsx(DiffMessage, { children: "Could not render this diff." }), children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    FileDiff,
    {
      fileDiff,
      disableWorkerPool: true,
      style: DIFF_VARS,
      options: {
        theme: diffTheme,
        diffStyle: "unified",
        overflow: "wrap",
        stickyHeader: false,
        disableFileHeader: true
      }
    }
  ) });
}
function OperationPreview({
  op,
  onGoToLocation,
  fileOpenTargets = [],
  onOpenFile,
  onOpenFolder,
  editContent,
  editing = false,
  onEditContent,
  onEditValidationError,
  onStartEditing,
  onSaveEditing,
  pillLabel,
  pillTooltip,
  pillColor,
  scopeLabel: scopeLabelOverride,
  previewFallback
}) {
  const [open, setOpen] = reactExports.useState(true);
  const [actionError, setActionError] = reactExports.useState(null);
  const [editValidationError, setEditValidationError] = reactExports.useState(null);
  const containerRef = reactExports.useRef(null);
  const loc = location(op);
  const scopeLabel = scopeLabelOverride ?? (op.artifactScope === "global" ? "All projects (global)" : `Project: ${loc.label}`);
  const canEdit = op.action !== "remove" && (op.newContent?.length ?? 0) <= 5e4 && Boolean(onStartEditing && onSaveEditing && onEditContent);
  const hasSavedEdit = canEdit && typeof editContent === "string" && editContent !== op.newContent;
  const saveEditing = () => {
    if (editValidationError) return;
    onSaveEditing?.();
  };
  const editAction = canEdit ? /* @__PURE__ */ jsxRuntimeExports.jsx(
    "button",
    {
      type: "button",
      "aria-label": editing ? "Save inline edit" : "Edit operation inline",
      title: editing ? "Save edit" : "Edit inline",
      onClick: editing ? saveEditing : onStartEditing,
      disabled: editing && Boolean(editValidationError),
      className: `flex size-7 shrink-0 items-center justify-center rounded-[6px] transition-colors ${editing ? "text-[var(--accent)] hover:bg-[var(--bg-card-soft)]" : "text-[var(--text-muted)] hover:bg-[var(--bg-card-soft)] hover:text-[var(--text-strong)]"}`,
      children: editing ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "size-3", strokeWidth: 2.3, "aria-hidden": true }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "size-[10px]", strokeWidth: 2, "aria-hidden": true })
    }
  ) : null;
  reactExports.useEffect(() => {
    if (!editing || !onSaveEditing) return;
    const saveWhenClickingOutside = (event) => {
      const container = containerRef.current;
      if (!container || event.composedPath().includes(container)) return;
      saveEditing();
    };
    document.addEventListener("pointerdown", saveWhenClickingOutside, true);
    return () => document.removeEventListener("pointerdown", saveWhenClickingOutside, true);
  }, [editValidationError, editing, onSaveEditing]);
  reactExports.useEffect(() => {
    if (!editing) setEditValidationError(null);
  }, [editing]);
  const fileActions = {
    onGoToLocation,
    fileOpenTargets,
    onOpenFile,
    onOpenFolder,
    onActionError: (error) => {
      setActionError(
        error === null ? null : error instanceof Error ? error.message : "Could not open this location."
      );
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: containerRef, className: "shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    ExpandableCard,
    {
      collapsible: true,
      open,
      onOpenChange: setOpen,
      emphasis: editing ? "active" : "default",
      leading: /* @__PURE__ */ jsxRuntimeExports.jsx(OperationPill, { op, label: pillLabel, tooltip: pillTooltip, color: pillColor }),
      title: scopeLabel,
      titleClassName: "text-[11px] font-semibold text-[var(--text-body)]",
      trailing: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        editAction,
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          FileActionsMenu,
          {
            op,
            ...fileActions,
            editing,
            onEditInline: canEdit ? editing ? saveEditing : onStartEditing : void 0
          }
        )
      ] }),
      subheader: /* @__PURE__ */ jsxRuntimeExports.jsx(
        PathHovercard,
        {
          path: op.targetPath ?? loc.path,
          title: fileNameFromPath(op.targetPath ?? loc.path),
          label: "File path",
          side: "bottom",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "block w-full truncate border-t border-[var(--border-subtle)] bg-[var(--bg-card-soft)] px-2 py-[5px] font-mono text-[9px] text-[var(--text-muted)] transition-colors hover:text-[var(--text-strong)]", children: loc.path })
        }
      ),
      notice: isExecutable(op) ? /* @__PURE__ */ jsxRuntimeExports.jsx(HookWarning, {}) : null,
      footer: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-8 items-center gap-2 border-t border-[var(--border-subtle)] bg-[color-mix(in_srgb,var(--bg-card-soft)_55%,transparent)] px-2 py-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "m-0 min-w-0 flex-1 text-[10px] leading-[1.5] text-[var(--text-muted)]", children: op.summary }) }),
      after: actionError ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "m-0 border-t border-[var(--danger)]/20 bg-[var(--danger)]/5 px-2 py-1.5 text-[10px] leading-[1.4] text-[var(--danger)]", children: actionError }) : null,
      children: [
        editing && onEditContent ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          EditableOperationPatch,
          {
            op,
            content: editContent ?? op.newContent ?? "",
            onChange: onEditContent,
            onValidationError: (error) => {
              setEditValidationError(error);
              onEditValidationError?.(error);
            }
          }
        ) : hasSavedEdit ? /* @__PURE__ */ jsxRuntimeExports.jsx(SavedOperationPatch, { op, content: editContent ?? "" }) : previewFallback && !op.patchPreview ? previewFallback : /* @__PURE__ */ jsxRuntimeExports.jsx(OperationPatch, { op }),
        editValidationError ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "p",
          {
            role: "alert",
            className: "m-0 border-t border-[var(--border-subtle)] px-2 py-1 text-[10px] text-[var(--danger)]",
            children: editValidationError
          }
        ) : null
      ]
    }
  ) });
}
function operationTone(op) {
  return ACTION_TONE[op.action];
}
const SuggestionDiff = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  OperationPreview,
  operationDiffStat,
  operationTone,
  patchLineCount
}, Symbol.toStringTag, { value: "Module" }));
export {
  OperationPill as O,
  SuggestionDiff as S,
  OperationPreview as a
};
//# sourceMappingURL=SuggestionDiff-D6FifeP0.js.map

//# debugId=2e31a34a-0319-5cec-823d-0e319caaff7f
