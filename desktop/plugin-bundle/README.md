# Blume plugin installer

Version 0.26.5. Served by a Deliveries ledger at /plugin/setup.mjs. Blume → Plugin shows the exact command with a one-time installation key:

```sh
curl -fsSL <ledger>/plugin/setup.mjs -o blume-setup.mjs && BLUME_INSTALL_KEY=<key> node blume-setup.mjs install --harness codex --endpoint <ledger>/mcp
```

Add --home DIR to install into an isolated harness home (CODEX_HOME or CLAUDE_CONFIG_DIR). verify and uninstall take the same --harness and --home.
