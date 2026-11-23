# Running Deliveries against a PR preview

Integration testing of hosted Deliveries happens only against a pull request's Product PR
Preview deployment set, controlled by pushing to that PR. Local, unpushed service changes
cannot be tested against hosted services.

1. Commit and push the exact change to a same-repository PR (draft is fine).
2. Wait for the **Product PR Preview** workflow for that head SHA to finish. It deploys the
   PR's Auth, the Deliveries runtime and its containers, runs the Deliveries smoke,
   and only then records the manifest.
3. From the same checkout, with `HEAD` equal to the PR head:

   ```sh
   export CLOUDFLARE_WORKERS_SUBDOMAIN=<account DNS label>
   pnpm dev
   ```

   The launcher prints `backend environment: PR #<n> · preview-pr-<n>-<sha>`. The main process
   receives `BLUME_AUTH_URL=https://blume-auth-pr-<n>.<account>.workers.dev` and
   `BLUME_CONTROL_REMOTE_ENDPOINT=https://blume-deliveries-runtime-pr-<n>.<account>.workers.dev`;
   the ledger worker forwards signed-in requests to that hosted runtime. There is no local
   ledger.

4. Sign in on the Blume account screen with **New here? Create an account**. Social
   providers are disabled in previews and production credentials never work there. Accounts,
   deliveries and evidence live in the PR's isolated D1, Durable Objects and R2 and are
   deleted when the PR closes. Cookies are stored per issuer, so switching between production
   and different PRs never reuses a session.

Failure messages name the missing prerequisite: no account label, no manifest for the exact
SHA (push or wait), a registry or runtime mismatch, or a conflicting preset `BLUME_AUTH_URL` /
`BLUME_CONTROL_REMOTE_ENDPOINT`. Without a PR preview, `BLUME_USE_PRODUCTION_BACKENDS=1` with
explicit HTTPS `BLUME_CONTROL_REMOTE_ENDPOINT` and `BLUME_AUTH_URL` is the only alternative.
Deployment details are in the
[Deliveries preview runbook](../../../../services/deliveries-runtime/docs/preview.md).
