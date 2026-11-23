# IPC contract - recovered from the shipped build

Static analysis of `resources/app.asar` (REA, 7,732 files parsed, 5.4M AST nodes). Every channel below is a literal recovered from the bundle; handler pairings come from the Electron boundary inventory.

## Main process - `handle` (25 channels)

| Channel |
|---|
| `account:getSession` |
| `app:setAppBadge` |
| `app:setCommandMenu` |
| `appUsage:getTotalProcessRunningSeconds` |
| `control:account` |
| `control:expand` |
| `control:github` |
| `control:plugin` |
| `control:projects` |
| `control:request` |
| `db:settings:all` |
| `db:settings:get` |
| `db:settings:set` |
| `dev:info` |
| `harnesses:codexBrand` |
| `identity:get` |
| `identity:getProfile` |
| `posthog:featureFlagEnabled` |
| `posthog:featureFlagEvaluations` |
| `posthog:featureFlagValue` |
| `referrals:getStatus` |
| `updater:getReadyState` |
| `updater:restartToInstall` |
| `usage:fetch` |
| `window:isFullscreen` |

## Main process - `on` (2 channels)

| Channel |
|---|
| `control:feed` |
| `win:invoke` |

## Renderer - `invoke` (153 channels)

| Channel |
|---|
| `account:cancelSocialSignIn` |
| `account:changePassword` |
| `account:delete` |
| `account:getSession` |
| `account:getSocialProviders` |
| `account:listDevices` |
| `account:listSessions` |
| `account:requestPasswordReset` |
| `account:revokeOtherSessions` |
| `account:revokeSession` |
| `account:signIn` |
| `account:signInSocial` |
| `account:signOut` |
| `account:signUp` |
| `account:updateProfile` |
| `announcements:copyPrompt` |
| `announcements:listActive` |
| `announcements:openUrl` |
| `app:setAppBadge` |
| `app:setCommandMenu` |
| `appUsage:getTotalProcessRunningSeconds` |
| `appUsage:setProductAccessAvailable` |
| `careers:listOpenings` |
| `careers:openOpening` |
| `chatwoot:widgetConfig` |
| `chatwoot:widgetContactUpdate` |
| `chatwoot:widgetMessages` |
| `chatwoot:widgetSendMessage` |
| `conversations:continue` |
| `conversations:copy` |
| `conversations:openLocation` |
| `db:conversations:applyTitleToHarness` |
| `db:conversations:cancelList` |
| `db:conversations:dismiss` |
| `db:conversations:get` |
| `db:conversations:idle` |
| `db:conversations:list` |
| `db:conversations:listForView` |
| `db:conversations:listForViewCancelable` |
| `db:conversations:refresh` |
| `db:conversations:regenerateTitle` |
| `db:conversations:resume` |
| `db:conversations:revertTitleToProvider` |
| `db:conversations:searchTranscript` |
| `db:conversations:setTitle` |
| `db:conversations:transcript` |
| `db:projects:cancelList` |
| `db:projects:cancelResolvePath` |
| `db:projects:get` |
| `db:projects:list` |
| `db:projects:listRecent` |
| `db:projects:listRecentCancelable` |
| `db:projects:resolvePath` |
| `db:settings:all` |
| `db:settings:get` |
| `db:settings:set` |
| `db:userTurns:active` |
| `dev:info` |
| `devFormats:listChildren` |
| `devFormats:listRoots` |
| `devFormats:readFile` |
| `diagnostics:getLogFilePath` |
| `diagnostics:log` |
| `feedbackBoard:addVote` |
| `feedbackBoard:createComment` |
| `feedbackBoard:createPost` |
| `feedbackBoard:deleteComment` |
| `feedbackBoard:deletePost` |
| `feedbackBoard:getAccess` |
| `feedbackBoard:listComments` |
| `feedbackBoard:listPosts` |
| `feedbackBoard:listTop` |
| `feedbackBoard:updateStatus` |
| `harnesses:cancelProjectScan` |
| `harnesses:codexBrand` |
| `harnesses:createStarterFolder` |
| `harnesses:deleteArtifact` |
| `harnesses:detectFirstRun` |
| `harnesses:list` |
| `harnesses:listSetup` |
| `harnesses:managedRouterStatus` |
| `harnesses:openManagedBilling` |
| `harnesses:openSetupTerminal` |
| `harnesses:readEntry` |
| `harnesses:readProjectFile` |
| `harnesses:scanProject` |
| `harnesses:setUpManagedPi` |
| `harnesses:suggestProjectFolders` |
| `harnesses:writeEntry` |
| `harnesses:writeProjectFile` |
| `identity:get` |
| `identity:getProfile` |
| `identity:setEmail` |
| `image:export` |
| `linkPreview:capture` |
| `localLink:running` |
| `onboarding:complete` |
| `onboarding:getState` |
| `perf:reset` |
| `perf:snapshot` |
| `posthog:featureFlagEnabled` |
| `posthog:featureFlagEvaluations` |
| `posthog:featureFlagValue` |
| `referrals:getLink` |
| `referrals:getStatus` |
| `release:info` |
| `search:query` |
| `settings:conversationParseDefault` |
| `settings:getLaunchAtLogin` |
| `settings:getTerminal` |
| `settings:openLaunchAtLoginSettings` |
| `settings:setLaunchAtLogin` |
| `settings:setTerminal` |
| `setup:applyChange` |
| `setup:cancelPreviewSync` |
| `setup:getVersion` |
| `setup:list` |
| `setup:listVersions` |
| `setup:refresh` |
| `setup:undo` |
| `share:text` |
| `signalAnalytics:getDashboard` |
| `system:openFileLocation` |
| `system:openFolderLocation` |
| `system:selectFolder` |
| `terminal:attach` |
| `terminal:close` |
| `terminal:detach` |
| `terminal:list` |
| `terminal:open` |
| `terminal:openPage` |
| `terminal:openTerminalApp` |
| `terminal:resize` |
| `terminal:restart` |
| `terminal:write` |
| `updater:getReadyState` |
| `updater:restartToInstall` |
| `usage:connectProvider` |
| `usage:fetch` |
| `usage:openKeychainAccess` |
| `usage:setCursorCookie` |
| `window:close` |
| `window:isFullscreen` |
| `window:minimize` |
| `wrapped:cancelListAvailableWeeks` |
| `wrapped:featureFlagEnabled` |
| `wrapped:generateLastSevenDays` |
| `wrapped:generateWeek` |
| `wrapped:get` |
| `wrapped:getUnseen` |
| `wrapped:list` |
| `wrapped:listAvailableWeeks` |
| `wrapped:markSeen` |

## Renderer - `on` (13 channels)

| Channel |
|---|
| `app:deep-link` |
| `app:image-context-menu-action` |
| `app:menu-command` |
| `app:open-conversation` |
| `conversations:changed` |
| `posthog:featureFlagsChanged` |
| `terminal:commandExit` |
| `terminal:output` |
| `terminal:page-requested` |
| `terminal:status` |
| `updater:ready-changed` |
| `window:fullscreen-changed` |
| `wrapped:changed` |

## Renderer - `once` (0 channels)

| Channel |
|---|

