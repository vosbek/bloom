"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="c9b7e495-2f0f-5ea8-a037-1ef9631c8ef9")}catch(e){}}();

const index = require("./index-TxTRDZxy.js");
class SetupBrowserService {
  constructor(deps) {
    this.knownProjectRoots = /* @__PURE__ */ new Set();
    this.deps = {
      ...deps,
      sources: deps.sources ?? index.harnessIds()
    };
  }
  isUnsafeScanRoot(projectPath) {
    return index.isUnsafeSetupScanRoot({
      projectPath,
      home: this.deps.home,
      path: this.deps.path
    });
  }
  registerProjectRoot(projectPath) {
    const root = this.deps.path.resolve(projectPath);
    this.knownProjectRoots.add(root);
    return root;
  }
  projectRootForPath(targetPath) {
    const resolved = this.deps.path.resolve(targetPath);
    return [...this.knownProjectRoots].filter((root) => resolved === root || resolved.startsWith(`${root}${this.deps.path.sep}`)).sort((left, right) => right.length - left.length)[0];
  }
  async scanProject(projectPath, options = {}) {
    const name = this.deps.path.basename(projectPath);
    const scanRoot = this.deps.path.resolve(projectPath);
    if (this.isUnsafeScanRoot(scanRoot)) {
      return {
        path: projectPath,
        name,
        harnesses: [],
        scattered: [],
        categories: [],
        artifacts: [],
        artifactRelationships: [],
        artifactDiagnostics: [],
        artifactsTruncated: false
      };
    }
    this.registerProjectRoot(scanRoot);
    const scan = await index.scanSetupBrowserProject(scanRoot, {
      fs: this.deps.fs,
      path: this.scanPath(),
      sources: this.deps.sources,
      signal: options.signal,
      summaryOnly: options.summaryOnly,
      artifactContext: options.projectId ? { projectId: options.projectId, workspaceLocationId: options.workspaceLocationId } : void 0
    });
    return {
      path: projectPath,
      name,
      harnesses: scan.harnesses.map((harness) => this.toHarnessView(harness)),
      scattered: scan.scattered,
      categories: scan.categories.map((category) => this.toCategory(category)),
      artifacts: scan.artifacts,
      artifactRelationships: scan.artifactRelationships,
      artifactDiagnostics: scan.artifactDiagnostics,
      artifactsTruncated: scan.artifactsTruncated
    };
  }
  async listHarnessSetup() {
    return (await index.scanSetupBrowserHarnesses({
      home: this.deps.home,
      fs: this.deps.fs,
      path: this.scanPath(),
      sources: this.deps.sources
    })).map((harness) => this.toHarnessView(harness));
  }
  readHarnessEntry(absPath) {
    return index.readAllowedSetupBrowserFile(absPath, {
      fs: this.deps.accessFs,
      path: this.accessPath(),
      allowPath: (resolved) => this.isAllowedHarnessPath(resolved)
    });
  }
  writeHarnessEntry(absPath, content, options) {
    return index.writeAllowedSetupBrowserFile(absPath, content, {
      fs: this.deps.accessFs,
      path: this.accessPath(),
      allowPath: (resolved) => this.isAllowedWritableHarnessPath(resolved),
      allowCreate: true,
      expectedContent: options?.expectedContent
    });
  }
  readProjectFile(absPath) {
    return index.readAllowedSetupBrowserFile(absPath, {
      fs: this.deps.accessFs,
      path: this.accessPath(),
      allowPath: (resolved) => this.isAllowedProjectPath(resolved)
    });
  }
  writeProjectFile(absPath, content, options) {
    return index.writeAllowedSetupBrowserFile(absPath, content, {
      fs: this.deps.accessFs,
      path: this.accessPath(),
      allowPath: (resolved) => this.isAllowedProjectPath(resolved),
      expectedContent: options?.expectedContent
    });
  }
  /** Resolve an artifact-sync path canonically and allow it only under scanner-owned roots. */
  async resolveAllowedArtifactSyncPath(absPath) {
    const requested = this.deps.path.resolve(absPath);
    let existing = requested;
    while (true) {
      try {
        const canonical = this.deps.path.resolve(await this.deps.accessFs.realpath(existing));
        const suffix = this.deps.path.relative(existing, requested);
        const destination = this.deps.path.resolve(this.deps.path.join(canonical, suffix));
        return this.isAllowedWritableHarnessPath(destination) || this.isAllowedProjectPath(destination) ? destination : null;
      } catch (error) {
        const code = error?.code;
        const message = error instanceof Error ? error.message : String(error);
        if (code !== "ENOENT" && !/ENOENT|not found/i.test(message)) return null;
        const parent = this.deps.path.dirname(existing);
        if (parent === existing) return null;
        existing = parent;
      }
    }
  }
  async isAllowedArtifactSyncPath(absPath) {
    return await this.resolveAllowedArtifactSyncPath(absPath) !== null;
  }
  async deleteArtifact(artifact) {
    if (artifact.source.type === "external" || !artifact.source.runtimePath) {
      throw new Error("This artifact does not have a local source to delete.");
    }
    const installedPackageRoot = artifact.source.type === "installed-package" ? this.installedPackageDeletionRoot(artifact) : void 0;
    if (artifact.source.type === "installed-package" && !installedPackageRoot) {
      throw new Error("Installed package path does not match a discovered plugin.");
    }
    const targetPath = installedPackageRoot ?? artifact.source.runtimePath;
    let allowPath = installedPackageRoot ? (candidate) => this.deps.path.resolve(candidate) === this.deps.path.resolve(installedPackageRoot) : artifact.scope === "project" ? (resolved2) => this.isAllowedProjectPath(resolved2) : (resolved2) => this.isAllowedWritableHarnessPath(resolved2);
    if (artifact.source.type === "config-entry") {
      const content = artifact.scope === "project" ? await this.readProjectFile(targetPath) : await this.readHarnessEntry(targetPath);
      const nextContent = index.removeStructuredArtifactConfigEntry(
        content,
        artifact.source.path,
        artifact.source.keyPath,
        artifact.name
      );
      if (artifact.scope === "project") await this.writeProjectFile(targetPath, nextContent);
      else {
        await index.writeAllowedSetupBrowserFile(targetPath, nextContent, {
          fs: this.deps.accessFs,
          path: this.accessPath(),
          allowPath: (resolved2) => this.isAllowedStructuredConfigWritePath(resolved2)
        });
      }
      return;
    }
    const resolved = this.deps.path.resolve(targetPath);
    const protectedRoots = artifact.scope === "project" ? [...this.knownProjectRoots] : [
      ...this.harnessRootPaths(),
      ...this.harnessRootPaths().flatMap(
        (root) => index.SETUP_BROWSER_CATEGORY_DIRS.map(
          (category) => this.deps.path.resolve(this.deps.path.join(root, category))
        )
      )
    ];
    if (protectedRoots.some((root) => resolved === root)) {
      throw new Error("The setup root itself cannot be deleted.");
    }
    if (artifact.scope === "project" && artifact.source.type === "directory") {
      const skillFile = (await this.deps.fs.readdir(resolved)).find(
        (name) => name.toLocaleLowerCase() === "skill.md"
      );
      if (!skillFile) throw new Error("Only discovered project skill directories can be deleted.");
      await this.readProjectFile(this.deps.path.join(resolved, skillFile));
      allowPath = (candidate) => this.deps.path.resolve(candidate) === this.deps.path.resolve(resolved);
    }
    const expectedType = artifact.source.type === "file" ? "file" : artifact.source.type === "directory" ? "directory" : "either";
    await index.deleteAllowedSetupBrowserPath(targetPath, expectedType, {
      fs: this.deps.accessFs,
      path: this.accessPath(),
      allowPath
    });
  }
  async listDevFormatRoots() {
    return Promise.all(
      this.deps.sources.map(async (source) => {
        const homeDir = index.harnessHomeDir(source);
        const rootPath = this.deps.path.join(this.deps.home, homeDir);
        const st = await this.safeDevFormatStat(rootPath);
        if (!st?.isDirectory()) {
          return {
            source,
            label: index.harnessLabel(source),
            path: rootPath,
            exists: false
          };
        }
        const { children, truncated } = await this.listDevFormatChildrenWithTruncation(rootPath);
        return {
          source,
          label: index.harnessLabel(source),
          path: rootPath,
          exists: true,
          node: {
            ...index.setupDevFormatNodeFromStat(rootPath, homeDir.split("/").pop() ?? homeDir, st),
            children,
            truncated
          }
        };
      })
    );
  }
  async listDevFormatChildren(path) {
    return (await this.listDevFormatChildrenWithTruncation(path)).children;
  }
  /**
   * Reads any file listed by the dev-format explorer. The explorer surfaces
   * the full harness home trees (session logs, todos, ...), which is broader
   * than the setup-entry allowlist used by readHarnessEntry.
   */
  readDevFormatFile(absPath) {
    return index.readAllowedSetupBrowserFile(absPath, {
      fs: this.deps.accessFs,
      path: this.accessPath(),
      allowPath: (resolved) => this.isAllowedDevFormatPath(resolved)
    });
  }
  scanPath() {
    return { join: this.deps.path.join, sep: this.deps.path.sep };
  }
  accessPath() {
    return {
      resolve: this.deps.path.resolve,
      dirname: this.deps.path.dirname,
      basename: this.deps.path.basename,
      join: this.deps.path.join
    };
  }
  platform() {
    return this.deps.platform ?? "posix";
  }
  harnessRootPaths() {
    return this.deps.sources.map(
      (source) => this.deps.path.resolve(this.deps.path.join(this.deps.home, index.harnessHomeDir(source)))
    );
  }
  harnessRootForPath(targetPath) {
    const resolved = this.deps.path.resolve(targetPath);
    return this.harnessRootPaths().filter((root) => resolved === root || resolved.startsWith(`${root}${this.deps.path.sep}`)).sort((left, right) => right.length - left.length)[0];
  }
  installedPackageDeletionRoot(artifact) {
    const source = artifact.source;
    if (artifact.scope !== "global" || source.type !== "installed-package" || !source.runtimePath) {
      return void 0;
    }
    const runtimePath = this.deps.path.resolve(source.runtimePath);
    const harnessRoot = this.harnessRootForPath(runtimePath);
    if (!harnessRoot) return void 0;
    const relativePath = this.deps.path.relative(harnessRoot, runtimePath);
    const segments = relativePath.split(this.deps.path.sep).filter(Boolean);
    const expectedLength = source.version ? 5 : 4;
    if (segments.length !== expectedLength || segments[0] !== "plugins" || segments[1] !== "cache") {
      return void 0;
    }
    const marketplace = segments[2];
    const plugin = segments[3];
    if (!marketplace || !plugin || source.packageId !== `${plugin}@${marketplace}`) {
      return void 0;
    }
    if (source.version && segments[4] !== source.version) return void 0;
    return this.deps.path.resolve(
      this.deps.path.join(harnessRoot, "plugins", "cache", marketplace, plugin)
    );
  }
  isAllowedHarnessPath(resolved) {
    return index.isAllowedSetupBrowserHarnessPath(resolved, {
      home: this.deps.path.resolve(this.deps.home),
      systemRoots: this.harnessRootPaths(),
      sources: this.deps.sources,
      sep: this.deps.path.sep,
      platform: this.platform()
    });
  }
  isAllowedWritableHarnessPath(resolved) {
    const policy = {
      sep: this.deps.path.sep,
      platform: this.platform()
    };
    return this.harnessRootPaths().some(
      (root) => index.isAllowedSetupBrowserSystemRootPath(root, resolved, policy)
    );
  }
  isAllowedStructuredConfigWritePath(resolved) {
    return resolved === this.deps.path.resolve(this.deps.path.join(this.deps.home, ".claude.json")) || this.isAllowedWritableHarnessPath(resolved);
  }
  isAllowedProjectPath(resolved) {
    return index.isAllowedSetupBrowserProjectPath(resolved, {
      knownProjectRoots: [...this.knownProjectRoots],
      basename: this.deps.path.basename,
      sep: this.deps.path.sep,
      platform: this.platform()
    });
  }
  isAllowedDevFormatPath(resolved) {
    return index.isAllowedSetupDevFormatPath(resolved, {
      roots: this.harnessRootPaths(),
      sep: this.deps.path.sep,
      platform: this.platform()
    });
  }
  async assertAllowedDevFormatPath(path) {
    const resolved = this.deps.path.resolve(path);
    if (!this.isAllowedDevFormatPath(resolved)) throw new Error("path not allowed");
    const st = await this.deps.accessFs.lstat(resolved).catch(() => null);
    if (st?.isSymbolicLink()) throw new Error("path not allowed");
    const canonical = await this.deps.accessFs.realpath(resolved).catch(() => resolved);
    if (!this.isAllowedDevFormatPath(canonical)) throw new Error("path not allowed");
    return canonical;
  }
  async safeDevFormatStat(path) {
    try {
      return await this.deps.devFormatFs.stat(path);
    } catch {
      return null;
    }
  }
  async listDevFormatChildrenWithTruncation(path) {
    const resolved = await this.assertAllowedDevFormatPath(path);
    return index.listSetupDevFormatChildren(resolved, {
      fs: this.deps.devFormatFs,
      path: { join: this.deps.path.join }
    });
  }
  toCategory(category) {
    return {
      name: category.name,
      entries: category.entries.map((entry) => ({ ...entry }))
    };
  }
  toHarnessView(harness) {
    return {
      source: harness.source,
      path: harness.path,
      exists: harness.exists,
      categories: harness.categories.map((category) => this.toCategory(category)),
      artifacts: harness.artifacts,
      artifactRelationships: harness.artifactRelationships,
      artifactDiagnostics: harness.artifactDiagnostics
    };
  }
}
exports.SetupBrowserService = SetupBrowserService;
//# sourceMappingURL=browser-DmfmUSN8.js.map

//# debugId=c9b7e495-2f0f-5ea8-a037-1ef9631c8ef9
