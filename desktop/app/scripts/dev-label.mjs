/* eslint-disable @typescript-eslint/explicit-function-return-type */

import { existsSync, realpathSync } from 'node:fs'
import { DatabaseSync } from 'node:sqlite'
import { join, resolve } from 'node:path'

const CONVERSATION_TITLE_FLAGS = ['--conversation-title', '--conversation']
const REMOTE_DEBUGGING_PORT_FLAG = '--remoteDebuggingPort'
const DEV_PROFILE_FLAG = '--profile'
const DEV_PROFILES = new Set(['full', 'ui', 'conversations', 'native'])
const STATIC_RUNNER_FLAGS = new Set(['--static', '--no-hmr'])
const SIGNED_OUT_FLAG = '--signed-out'

function normalizeDevProfile(value) {
  const profile = value?.trim() || 'full'
  if (!DEV_PROFILES.has(profile)) {
    throw new Error(`${DEV_PROFILE_FLAG} must be one of: ${[...DEV_PROFILES].join(', ')}`)
  }
  return profile
}
function normalizeRemoteDebuggingPort(value) {
  const trimmed = value?.trim()
  if (!trimmed || !/^\d+$/.test(trimmed)) return null
  const port = Number(trimmed)
  return Number.isSafeInteger(port) && port >= 1 && port <= 65_535 ? port : null
}

export function readRemoteDebuggingPortParameter(args) {
  let port = null
  for (let index = 0; index < args.length; index += 1) {
    const argument = args[index]
    if (argument === REMOTE_DEBUGGING_PORT_FLAG) {
      const parsed = normalizeRemoteDebuggingPort(args[index + 1])
      if (parsed !== null) port = parsed
      index += 1
      continue
    }
    if (argument.startsWith(`${REMOTE_DEBUGGING_PORT_FLAG}=`)) {
      const parsed = normalizeRemoteDebuggingPort(
        argument.slice(REMOTE_DEBUGGING_PORT_FLAG.length + 1)
      )
      if (parsed !== null) port = parsed
    }
  }
  return port
}

/**
 * Keep launcher-only identity flags out of electron-vite while forwarding its
 * own CLI options (for example `--remoteDebuggingPort 9223`). This lets CDP
 * runs use the normal launcher, including DB-backed task labels, parser prep,
 * native dependency rebuilds, sandbox selection, and process cleanup.
 */
export function parseDevLauncherArguments(args, env = process.env) {
  let conversationTitle = null
  let runtimeProfile = null
  let runnerMode = env.BLUME_DEV_RUNNER?.trim() === 'static' ? 'static' : 'hmr'
  let signedOut = env.BLUME_DEV_SIGNED_OUT === '1'
  const electronViteArgs = []

  for (let index = 0; index < args.length; index += 1) {
    const argument = args[index]
    if (index === 0 && argument === '--') continue
    if (STATIC_RUNNER_FLAGS.has(argument)) {
      runnerMode = 'static'
      continue
    }
    if (argument === DEV_PROFILE_FLAG) {
      const value = args[index + 1]?.trim()
      if (!value || value.startsWith('--')) {
        throw new Error(`${DEV_PROFILE_FLAG} requires a non-empty profile`)
      }
      runtimeProfile = normalizeDevProfile(value)
      index += 1
      continue
    }
    if (argument.startsWith(`${DEV_PROFILE_FLAG}=`)) {
      const value = argument.slice(DEV_PROFILE_FLAG.length + 1).trim()
      if (!value) throw new Error(`${DEV_PROFILE_FLAG} requires a non-empty profile`)
      runtimeProfile = normalizeDevProfile(value)
      continue
    }
    if (argument === SIGNED_OUT_FLAG) {
      signedOut = true
      continue
    }
    let matchedTitleFlag = false
    for (const flag of CONVERSATION_TITLE_FLAGS) {
      if (argument === flag) {
        const value = args[index + 1]?.trim()
        if (!value || value.startsWith('--')) {
          throw new Error(`${flag} requires a non-empty title`)
        }
        if (conversationTitle === null) conversationTitle = value
        index += 1
        matchedTitleFlag = true
        break
      }
      if (argument.startsWith(`${flag}=`)) {
        const value = argument.slice(flag.length + 1).trim()
        if (!value) throw new Error(`${flag} requires a non-empty title`)
        if (conversationTitle === null) conversationTitle = value
        matchedTitleFlag = true
        break
      }
    }
    if (!matchedTitleFlag) electronViteArgs.push(argument)
  }

  return {
    conversationTitle: conversationTitle ?? (env.BLUME_DEV_CONVERSATION_TITLE?.trim() || null),
    runtimeProfile: runtimeProfile ?? normalizeDevProfile(env.BLUME_DEV_PROFILE),
    runnerMode,
    signedOut,
    electronViteArgs,
    cdpPort: readRemoteDebuggingPortParameter(electronViteArgs)
  }
}

export function readConversationTitleParameter(args, env = process.env) {
  return parseDevLauncherArguments(args, env).conversationTitle
}

export function devRunnerArguments(runnerMode, electronViteArgs) {
  if (runnerMode !== 'static') return ['dev', ...electronViteArgs]
  const previewArgs = ['preview', '--skipBuild']
  for (let index = 0; index < electronViteArgs.length; index += 1) {
    const argument = electronViteArgs[index]
    if (argument === REMOTE_DEBUGGING_PORT_FLAG) {
      index += 1
      continue
    }
    if (argument.startsWith(`${REMOTE_DEBUGGING_PORT_FLAG}=`)) continue
    previewArgs.push(argument)
  }
  return previewArgs
}

export function resolveLaunchPath(value) {
  const absolute = resolve(value)
  if (!existsSync(absolute)) return absolute.replace(/\\/g, '/')
  return realpathSync.native(absolute).replace(/\\/g, '/')
}

export function devSandboxSlug(appPath) {
  return appPath.replace(/^\//, '').replace(/[^a-zA-Z0-9._-]+/g, '_')
}

/**
 * Ordered databases used only to discover the label for a dev launch. Packaged
 * canary is checked before stable because it is where the active task is most
 * likely to have been ingested, while the checkout's own dev sandbox is the
 * final fallback for a conversation that has only been seen by that worktree.
 */
export function devLabelDatabaseCandidates({ homeDir, devAppPath, stableDbPath }) {
  const blumeRoot = join(homeDir, '.blume')
  return [
    { source: 'canary', dbPath: join(blumeRoot, '.canary', 'blume.sqlite') },
    { source: 'stable', dbPath: stableDbPath ?? join(blumeRoot, 'blume.sqlite') },
    {
      source: 'dev-worktree',
      dbPath: join(blumeRoot, '.dev', devSandboxSlug(devAppPath), 'blume.sqlite')
    }
  ]
}

export function inferWorktreeName(path) {
  const normalized = path.replace(/\\/g, '/')
  const codex = normalized.match(/\/(?:\.codex)\/worktrees\/([^/]+)(?:\/|$)/)
  if (codex?.[1]) return codex[1]
  const harness = normalized.match(
    /\/(?:\.claude|\.cursor|\.pi|\.omp)\/(?:worktrees|workspaces|worktree)\/([^/]+)(?:\/|$)/
  )
  return harness?.[1] ?? null
}

export function findConversationForWorkingDirectory({ dbPath, workingDirectory }) {
  if (!existsSync(dbPath)) {
    return { error: `main Blume database not found at ${dbPath}` }
  }
  let db
  try {
    db = new DatabaseSync(dbPath, { readOnly: true })
    const normalizedCwd = "replace(coalesce(cwd, ''), '\\', '/')"
    const row = db
      .prepare(
        `SELECT coalesce(nullif(trim(title), ''), nullif(trim(provider_title), '')) AS conversation_name,
              workspace, workspace_kind
         FROM conversations
         WHERE (thread_source IS NULL OR thread_source NOT IN ('subagent', 'guardian_review'))
           AND (${normalizedCwd} = ?
                OR (${normalizedCwd} != '' AND substr(${normalizedCwd}, 1, length(?) + 1) = ? || '/'))
         ORDER BY CASE WHEN ${normalizedCwd} = ? THEN 0 ELSE 1 END,
                  last_activity_ts DESC
         LIMIT 1`
      )
      .get(workingDirectory, workingDirectory, workingDirectory, workingDirectory)
    if (!row) {
      return {
        error: `no user-owned conversation has working directory ${workingDirectory} in the main Blume database`
      }
    }
    const conversationName = String(row.conversation_name ?? '').trim()
    if (!conversationName) {
      return {
        error: `the latest user-owned conversation for ${workingDirectory} does not have a title yet`
      }
    }
    return {
      conversationName,
      worktreeName:
        row.workspace_kind && String(row.workspace ?? '').trim()
          ? String(row.workspace).trim()
          : null
    }
  } catch (error) {
    return { error: error instanceof Error ? error.message : String(error) }
  } finally {
    db?.close()
  }
}

export function resolveDevLabel({ dbCandidates, launchPath, workingDirectory, conversationTitle }) {
  if (conversationTitle) {
    return {
      conversationName: conversationTitle,
      worktreeName: inferWorktreeName(launchPath),
      source: 'parameter',
      error: null
    }
  }

  const failures = []
  for (const candidate of dbCandidates) {
    const conversation = findConversationForWorkingDirectory({
      dbPath: candidate.dbPath,
      workingDirectory
    })
    if (!('error' in conversation)) {
      return {
        conversationName: conversation.conversationName,
        worktreeName: conversation.worktreeName || inferWorktreeName(launchPath),
        source: candidate.source,
        error: null
      }
    }
    failures.push(`${candidate.source}: ${conversation.error}`)
  }

  return {
    conversationName: null,
    worktreeName: inferWorktreeName(launchPath),
    source: 'missing',
    error: `${failures.join('; ')}. Start with --conversation-title "<conversation name>". Choose a short, descriptive title for the work being done.`
  }
}
