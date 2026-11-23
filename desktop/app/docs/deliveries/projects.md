# Projects

A project is a named set of repositories. Deliveries belong to a project; agent setup belongs to a repository.

## Model

- **Every repository starts as its own project.** The ledger has no record for it. The project's id is the repository identity (`github.com/owner/name`, a `file:` path), and its name is the short repository label.
- **A record appears** once a person renames a project, merges projects or moves a repository, once an agent registers its project, or when a person sets one up (`ControlState.projects`). A repository is in at most one record.
- **People set projects up themselves.** Projects › Add project (`?add=1`) lists the repositories and folders in no project yet (this computer's checkouts and folders, then the GitHub repositories Blume can read) and creates a record from the chosen ones (`project_create`). A project's Sources card adds more the same way (`project_add_sources`). Both refuse a location that is already in a project: moving one between projects stays Move, which keeps its deliveries in view.
- **A delivery starts in one repository** (`Delivery.project`) and belongs to that repository's project. `Delivery.repositories` lists the other repositories it reached.
- **Setup stays per repository.** A project page lists its repositories, and each one opens the shared Setup view for that repository, read from its default branch on GitHub. There is no project-level setup.
- **Applications belong to projects.** An application is what runs and is tested (a website, a desktop app, an API) with its surfaces, environments and scenarios (`TestApplication`). Each one belongs to exactly one project (`TestApplication.project`: the record id, or the repository of a repository that is its own project) and takes its code location from it; a project can have several. Agents configure applications through `blume_setup` op update. MCP test execution is unavailable; existing applications and test history remain readable through `blume_tests` op get. A conversation without a project is asked to register one with `blume_project_register` first. Older ledgers, which made one application per delivery repository named after it, are attached to the owning project on read, one legacy application per project (`testApplications.ts`). When a project gets a record or merges, its applications follow.
- **Agents without a repository** (`unassigned`) never join a project.

The model lives in `packages/app/core/src/features/controlPlane/projects.ts` (`@blume/app-core/control-plane-projects`). It depends only on the runtime-neutral `@blume/projects-identity` (canonical repository matching), so the ledger, the renderer and the plugin bridge share it.

## What an agent sees

An agent's repository is the one its conversation reported. It can read and work on:

1. deliveries in its repository's project;
2. deliveries that reached its repository;
3. deliveries it already joined;
4. deliveries a message linked for it.

A delivery-linked message is the invitation to work across repositories. It can come from the person (the Agents page composer lists every delivery) or from an agent that can already see the delivery. `blume_context` returns the agent's `project`.

## Joining projects

When an agent works on a delivery from a repository in another project, the delivery reaches that repository:

- **The person invited the agent, and the other project is only that repository with no deliveries of its own:** it joins the delivery's project at once. This quietly covers the common first cross-repository delivery. An agent's invitation never joins projects: the reached repository sees that delivery, and the person is asked as below.
- **Otherwise:** the person is asked. The Projects page shows a suggestion on both projects. The person can merge the projects, move only that repository, or keep them separate. "Keep separate" is remembered for that pair of repositories.

Merges are not automatic beyond the lone-repository case, for three reasons:

- One shared library would otherwise snowball unrelated projects together.
- Agents on unrelated work would start seeing each other's deliveries without the person deciding.
- The person owns project boundaries.

A merge can be undone: "Make it its own project" splits a repository out again.

## Operations

These are human-only ledger operations:

- `project_create` creates a project, with its name, from repositories and folders in no project yet.
- `project_add_sources` adds repositories and folders in no project yet to a project.
- `project_rename` gives a project a name (and creates its record).
- `project_merge` moves every repository of one project into another.
- `project_move_repository` moves one repository into another project.
- `project_split_repository` makes a repository its own project again.
- `project_suggestion_dismiss` keeps two repositories in separate projects.

`project_create` and `project_add_sources` refuse a location that is already in a project, including a repository that is its own project with deliveries: moving one between projects stays `project_move_repository`.
