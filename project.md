# Agentic Coding: Project Specification

**Status:** Approved for implementation

**Version:** 1.2.0

**Last updated:** 2026-08-19

**Owner:** Jesus Graterol

**Canonical domain:** `https://agenticcoding.jesusgraterol.dev`

**Canonical filename:** `project.md`

## 1. Document purpose and authority

This document defines the product, content, experience, technical architecture, deployment model, and acceptance criteria for the **Agentic Coding** website.

The website will be built and maintained by coding agents working with the developer. This specification is the product contract those agents must follow.

When sources of direction conflict, use this precedence:

1. explicit developer decisions made after this specification
2. this specification
3. the repository's protected coding instructions, including the root `AGENTS.md`
4. the established codebase architecture and conventions
5. current official documentation for the installed versions of Astro, Tailwind CSS, GitHub Pages, and other dependencies

A coding agent must not silently reinterpret, expand, or reduce the product described here. Material changes to the site's philosophy, routes, public resources, deployment model, or scope require developer approval.

The terms **MUST**, **MUST NOT**, **SHOULD**, **SHOULD NOT**, and **MAY** describe requirement strength.

## 2. Product summary

**Agentic Coding** is a small, open, content-first website that explains a disciplined way of building software with coding agents.

It is not a SaaS product, an AI wrapper, or a prompt-generation application. It is an interactive manifesto and practical toolkit for developers who want the leverage of coding agents without surrendering engineering quality, transparency, maintainability, or control.

The project has four primary offerings:

1. a concise, visually compelling explanation of Agentic Coding
2. a ready-to-use, repository-agnostic `AGENTS.md` foundation
3. one canonical prompt for safely refining an existing `AGENTS.md`
4. a cookbook of practical Agentic Coding workflows

The site will be statically generated with Astro and hosted on GitHub Pages at `agenticcoding.jesusgraterol.dev`.

## 3. Core thesis

AI has accelerated the rate at which software can be produced. The greater opportunity is to improve the quality of the software developers can afford to build.

Coding agents can participate meaningfully in:

- understanding a codebase
- investigating a problem
- planning a solution
- challenging assumptions
- comparing architectural approaches
- decomposing work
- implementing code
- creating and running tests
- reviewing changes
- finding regressions
- synchronizing documentation
- correcting their own work

The developer should not treat the agent only as an implementation engine. The agent is an active engineering collaborator across the lifecycle.

The developer nevertheless remains accountable for:

- the real objective
- product and domain knowledge
- important constraints
- architecture and tradeoff approval
- the authority granted to the agent
- the final quality bar
- whether a change belongs in the system

The central position of the project is:

> **Do not delegate engineering to the agent. Engineer with the agent.**

## 4. Definition of Agentic Coding

**Agentic Coding is a collaborative software-development discipline in which developers use coding agents across planning, decomposition, implementation, verification, and review while retaining responsibility for intent, system direction, and engineering quality.**

Agentic Coding sits between traditional manual coding and vibe coding, but it is not defined by the percentage of code written by AI.

The distinguishing question is:

> **Who controls the engineering decisions, scope, evidence, and quality?**

An Agentic Coding workflow may delegate a very large amount of implementation to an agent. It remains Agentic Coding when the work is grounded in explicit context, bounded authority, collaborative decisions, coherent execution units, meaningful verification, transparent reporting, and developer accountability.

## 5. The three modes of coding

The site MUST explain the following distinction accurately and without caricature.

### 5.1 Manual coding

The developer performs most planning, implementation, verification, and review directly.

The developer may use ordinary tools and autocomplete, but the development process is primarily human-executed.

### 5.2 Vibe coding

The developer describes a desired result and delegates substantial implementation to an AI system, often evaluating progress mainly through visible behavior or whether the result appears to work.

The term must not be presented as a synonym for all AI-assisted development. The site should describe vibe coding as one end of a control and inspection spectrum, not as an insult or as inherently useless.

Vibe coding can be appropriate for experimentation, disposable prototypes, learning, or low-risk work. The site's concern is using that operating model for maintainable production systems without sufficient context, inspection, or corrective mechanisms.

### 5.3 Agentic Coding

The developer and agent collaborate on the problem and the solution.

The agent may inspect, plan, propose, challenge, decompose, implement, test, and review. The developer actively shapes the process, approves material decisions, controls scope, and verifies that the resulting system deserves to exist.

The site MUST make clear that Agentic Coding is not merely a compromise between writing code manually and delegating code blindly. It is a distinct engineering discipline.

## 6. Product principles

### 6.1 Collaborate on the plan

Planning is one of the strongest uses of a coding agent.

A good planning session is interactive. The developer brings intent, domain context, priorities, and judgment. The agent brings codebase inspection, breadth of analysis, consequence tracing, alternative proposals, and the ability to identify details that may have been overlooked.

The agent is not expected to wait passively for a fully formed architecture. It should help create and challenge the architecture.

### 6.2 Pave the way before delegating broadly

Coding agents are highly capable, but ambiguous environments force them to solve too many adjacent decisions while trying to complete the requested task.

Before giving an agent broad implementation authority, the developer should establish and demonstrate:

- where responsibilities belong
- how modules are structured
- how existing abstractions are reused
- how validation and errors work
- what deserves a new abstraction
- how tests should be designed
- how documentation remains accurate
- how changes are reviewed
- what "done" means

The developer is not teaching the agent how to program. The developer is teaching it how engineering is done in this system.

### 6.3 Demonstrate → Codify → Delegate → Verify

This loop describes how a project becomes increasingly safe and effective for agentic development.

**Demonstrate**

Work closely with the agent. Make important decisions explicit. Correct behavior that does not fit the system and explain why.

**Codify**

Turn recurring decisions into durable project context: coding instructions, architecture, examples, tests, schemas, documentation, reusable abstractions, and automation.

**Delegate**

Grant the agent progressively larger and more complete tasks as the surrounding system becomes clearer.

**Verify**

Keep automated checks, agent review, and developer inspection as the corrective layer.

### 6.4 Wide context, narrow authority

A coding agent should inspect enough surrounding code to understand the complete affected path.

That does not authorize it to modify everything it discovers.

The project MUST teach the distinction between:

- understanding an adjacent dependency
- changing an adjacent dependency

A concise expression of the principle is:

> **Give the agent a wide field of view and a narrow target.**

Another required concept is:

> **A dependency is not automatically a deliverable.**

### 6.5 Plan → Breakdown → Execute → Review → Repeat

This is the primary change-development loop taught by the project.

**Plan**

Investigate the problem and the existing system. Collaboratively establish the architecture, scope, affected contracts, risks, tests, and intended final state.

**Breakdown**

Convert the approved strategy into ordered, coherent milestones. Each milestone must be implementable, verifiable, and reviewable as a meaningful finished state.

**Execute**

Implement only the currently authorized scope. Keep required production changes together with their tests, contracts, documentation, migrations, and verification.

**Review**

Assume the implementation may contain mistakes. Inspect correctness, regressions, architecture, duplication, security, edge cases, test adequacy, maintainability, and documentation.

**Repeat**

Use what was learned to authorize the next milestone or revise the plan.

### 6.6 Clarity creates better delegation

Every important decision the agent does not have to reinvent is attention it can spend solving the actual problem.

The project should explain that strong instructions do not reduce an agent's capability. They focus it.

Clear goals, constraints, examples, architecture, ownership boundaries, and review rules reduce:

- duplicated code
- unnecessary abstractions
- adjacent refactors
- inconsistent patterns
- weak reusability
- missed edge cases
- unreviewable changes
- technically correct but misplaced implementations

### 6.7 Capability needs a reliability system

Coding agents are capable enough to build large systems and capable enough to build the wrong system convincingly.

The site must not advocate unrestricted autonomy.

The desired system around the agent is:

> **Context → Constraints → Plan → Breakdown → Execution → Tests → Review → Correction**

A required message is:

> **The agent provides capability. The engineering process provides reliability.**

### 6.8 Quality is the lasting opportunity

Speed is the most visible benefit of coding agents.

The site's stronger thesis is that coding agents make previously expensive engineering practices more affordable:

- deeper planning
- more alternatives
- better tests
- edge-case analysis
- documentation synchronization
- codebase consistency checks
- security review
- type safety
- failure-path analysis
- refactoring analysis
- repeated review

A required editorial idea is:

> **The first benefit is speed. The lasting benefit should be better software.**

## 7. Target audience

### 7.1 Primary audience

Professional software developers who:

- already use or are considering coding agents
- care about maintainability and production quality
- want to delegate more without losing control
- are dissatisfied with messy, broad, or inconsistent agent changes
- want a repeatable workflow for planning, implementation, and review
- need practical starting instructions for their repositories

### 7.2 Secondary audience

- engineering leads defining team practices
- open-source maintainers
- developers introducing agents into mature codebases
- developers moving beyond ad hoc prompting
- technical decision-makers evaluating AI-assisted development

### 7.3 Audience assumptions

The content may assume familiarity with source control, code review, tests, and repositories.

The content must not assume a specific programming language, framework, model provider, editor, or coding-agent product.

## 8. Product goals

The first production release MUST:

1. explain Agentic Coding in a brief, compelling, and credible way
2. distinguish it clearly from both manual coding and vibe coding
3. present collaborative planning as a core capability
4. teach developers to pave the way before broad delegation
5. teach wide context and narrow authority
6. present the Plan → Breakdown → Execute → Review loop
7. present the Demonstrate → Codify → Delegate → Verify loop
8. explain why strong self-correcting mechanisms are necessary
9. explain why the long-term opportunity is software quality
10. provide a neutral, ready-to-use `AGENTS.md`
11. provide one canonical, preservation-first refinement prompt
12. provide a useful cookbook with practical workflows
13. work fully as a static GitHub Pages site
14. be beautiful, modern, responsive, accessible, fast, and shareable
15. support Jesus Graterol's professional reputation in an understated way
16. remain free and usable without an account, backend, or AI API
17. ground the discipline in an understated example from the real project work behind it

## 9. Non-goals

The first production release MUST NOT include:

- user accounts
- authentication
- a database
- a backend
- server-side rendering
- an AI API integration
- a chat interface
- direct execution of coding agents
- repository connections
- file uploads
- an `AGENTS.md` form builder
- a refinement questionnaire on the website
- dynamic prompt generation
- direct editing of a visitor's repository
- a CMS
- comments, community profiles, or social features
- paid plans, donations, checkout, or monetization
- vendor rankings or model benchmarks
- a dashboard
- a PWA requirement
- a service worker unless later justified
- complex animation, WebGL, canvas-heavy hero effects, or background video

The `/refine` feature is explicitly **not** a prompt builder. It is a page containing one canonical prompt that delegates repository-aware refinement to the developer's own coding agent.

## 10. Editorial positioning

### 10.1 Tone

The writing should be:

- concise
- direct
- confident
- pragmatic
- technically literate
- optimistic without hype
- opinionated about process, not about programming stacks
- respectful of developers who choose other workflows

The writing should not sound like:

- a corporate AI landing page
- a model-provider advertisement
- a manifesto against programmers
- an attack on vibe coding
- a claim that agents are always correct
- a claim that developer judgment is obsolete

### 10.2 Claims

The site MUST NOT claim that this project invented the term "Agentic Coding."

It MAY present a specific definition and discipline for professional Agentic Coding.

Claims about coding-agent capabilities should be framed as practical observations and should avoid unsupported absolutes.

### 10.3 Personal positioning

The site should provide a modest professional benefit to Jesus Graterol.

It MUST include:

- a clear author attribution
- a link to the project's public source repository once configured
- a configurable link to Jesus's professional or personal website
- a concise statement that the project reflects how he believes professional software development should evolve

It MUST NOT turn the experience into a résumé, sales funnel, consulting pitch, or personal-brand takeover.

A suitable footer-level statement is:

> **Built by Jesus Graterol using Agentic Coding.**

## 11. Information architecture and routes

All public content routes MUST be statically generated.

| Route | Purpose |
| --- | --- |
| `/` | Main interactive manifesto and project overview |
| `/start` | Human-readable presentation of the ready-to-use foundation |
| `/AGENTS.md` | Raw canonical ready-to-use `AGENTS.md` |
| `/refine` | Human-readable presentation of the canonical refinement prompt |
| `/refine.txt` | Raw canonical refinement prompt |
| `/cookbook` | Cookbook index |
| `/cookbook/[slug]` | Individual cookbook recipe |
| `/404.html` | Custom not-found page generated from `src/pages/404.astro` |

The site MAY use section anchors on `/`, but every primary practical resource must have a stable route.

The route structure must not depend on client-side routing to work. Direct navigation, browser refresh, external linking, and GitHub Pages static serving must work for every route.

## 12. Global navigation

The primary navigation MUST contain:

- Agentic Coding
- Start
- Refine
- Cookbook
- Source

Requirements:

- "Agentic Coding" returns to `/`
- "Source" opens the configured repository
- the active destination is visually identifiable
- the navigation is fully keyboard accessible
- the mobile navigation works at 320px without horizontal overflow
- the navigation remains usable with JavaScript disabled
- a skip link allows keyboard users to move directly to main content
- the theme control is available from the header or another globally consistent location

## 13. Homepage specification

The homepage is the principal shareable experience. It should feel like an editorial story with focused interactive demonstrations, not a dashboard.

### 13.1 Hero

The hero MUST include:

- the product name: `Agentic Coding`
- a concise thesis
- a short explanation
- calls to action for `/start`, `/refine`, and `/cookbook`

Recommended starting direction:

> **Software development after manual coding, without giving up engineering.**

Supporting idea:

> Coding agents can help us plan, build, test, and review at extraordinary speed. Agentic Coding is the discipline of using that leverage without surrendering context, control, or quality.

The final copy may be refined during implementation, but it must preserve the meaning established in this specification.

### 13.2 AI changed coding

This section introduces the historical transition:

- software development was dominated by manually written implementation
- AI made code generation cheap and fast
- raw generation speed does not automatically produce maintainable systems
- the next question is how professional development should adapt

This section should be brief.

### 13.3 Manual Coding → Agentic Coding → Vibe Coding

The homepage MUST include a clear comparison with Agentic Coding visually centered.

The comparison should cover at least:

- planning
- architecture
- implementation
- context
- verification
- review
- developer responsibility
- primary goal

The visual must communicate that the spectrum is about control and engineering process, not simply how many lines the agent writes.

The comparison must remain a semantic table at every viewport width. On small screens, its columns must remain intact inside an accessible horizontal scroll region instead of flattening into cards. That region must contain its own overflow so the page itself never scrolls horizontally.

### 13.4 Definition of Agentic Coding

Display the canonical definition from section 4 prominently.

The section should reinforce:

- the agent is a planning collaborator
- the agent can propose and challenge architecture
- the agent can implement and review
- the developer retains accountability
- Agentic Coding increases leverage rather than removing discipline

A featured line should be:

> **Do not delegate engineering to the agent. Engineer with the agent.**

### 13.5 Interactive planning

This section MUST correct the idea that the developer plans alone and the agent only implements.

It should show a short, realistic interaction:

1. the developer describes a problem or initial approach
2. the agent inspects the relevant system
3. the agent identifies an existing pattern, constraint, or overlooked consequence
4. the developer challenges or redirects the proposal
5. the agent revises the plan
6. both converge on an implementation-ready strategy

The example must be understandable without model-specific branding.

The interaction may use a fictional feature such as organization-level API keys, but it must remain concise and technically credible.

All text must exist in the static HTML. Animation may progressively reveal or highlight it, but must not be required to access it.

### 13.6 Plan → Breakdown → Execute → Review

This is a signature visual and conceptual section.

The visualization MUST expose four selectable or focusable stages:

#### Plan

- inspect the relevant codebase
- clarify intent and constraints
- identify architecture and ownership
- identify affected contracts and files
- identify risks, tests, and verification
- obtain developer approval before implementation

#### Breakdown

- use the current plan as the authoritative strategy
- create ordered milestones
- do not redesign the solution
- keep each milestone internally coherent
- keep implementation with its required tests, documentation, contracts, exports, migrations, and verification
- provide a review checkpoint
- obtain approval for the milestone sequence

#### Execute

- implement only the explicitly authorized milestone or scope
- reuse existing architecture and abstractions
- avoid adjacent cleanup
- verify each logical step
- stop before beginning the next unauthorized milestone

#### Review

- review findings before praise or summary
- inspect correctness and regressions
- inspect scope and duplication
- inspect tests and whether defects could survive them
- inspect security, maintainability, and documentation
- report checks that did and did not run
- produce a clear readiness verdict

The loop should visually return to planning or the next milestone.

A reduced-motion presentation must preserve the same content without animated movement.

### 13.7 Pave the way

This section explains why agents can be messy when the environment is unclear.

It MUST discuss:

- missed details
- duplicate code
- weak reuse
- inconsistent architecture
- unnecessary adjacent work
- unclear stopping points
- agents simultaneously solving the task and inventing the process

The section must avoid presenting those outcomes as proof that agents are incapable. The point is that the quality of the surrounding engineering system strongly affects the quality of the result.

A featured line should be:

> **Before you delegate broadly, establish the path you want the agent to follow.**

### 13.8 Demonstrate → Codify → Delegate → Verify

This section is the second signature loop.

It MUST explain each stage using the definitions in section 6.3.

The visual treatment should differ enough from the primary change loop that users do not confuse them:

- Plan → Breakdown → Execute → Review is a loop for an individual change
- Demonstrate → Codify → Delegate → Verify is a loop for improving the developer-agent-codebase relationship over time

### 13.9 Wide context, narrow authority

This section MUST visually demonstrate:

- one requested task
- the surrounding dependencies an agent may inspect
- the narrow set of paths the agent is authorized to modify

Required phrases:

> **Give agents context. Do not give them free rein.**

> **A dependency is not automatically a deliverable.**

The visual should work without animation and must not rely on color alone to show editable versus inspect-only areas.

### 13.10 Why going back feels impossible

This section explains why a disciplined coding-agent workflow can make fully manual development feel unnecessarily limiting.

It should cover leverage across:

- planning
- exploration
- implementation
- testing
- review
- documentation
- repeated correction

It must not say that manual coding skills are obsolete.

The section should frame the benefit as:

- more engineering work can be attempted
- more alternatives can be evaluated
- more quality checks can be afforded
- developers can spend more effort on judgment and system design

### 13.11 Capability without free rein

This section provides the project's caution.

It MUST state that the technology is not reliable enough to receive unrestricted authority over production systems.

It should explain that agents can:

- misunderstand intent
- miss repository context
- choose a plausible but wrong abstraction
- duplicate an existing mechanism
- broaden scope
- satisfy tests without satisfying the real requirement
- produce convincing but fragile code

The solution presented by the site is not less capable agents. It is stronger context, boundaries, transparency, tests, review, and developer control.

### 13.12 Applied in practice

The homepage MUST identify `moldea` as the real project work through which Agentic Coding was shaped.

The section must:

- keep the brand name lowercase
- use the approved light- and dark-theme Moldea lockups without modifying their artwork
- connect the project to durable context, instructions as production assets, and deterministic verification
- link to `https://moldea.ai/`
- remain an understated evidence section rather than a product advertisement

The section MUST NOT claim customer adoption, general availability, or outcomes that the current Moldea project does not establish. It must not invent a Moldea tagline or use an under-construction product screenshot as evidence.

### 13.13 Practical resources

The homepage MUST conclude the main narrative with three clear destinations:

- **Start with the foundation** → `/start`
- **Refine existing instructions** → `/refine`
- **Practice the workflow** → `/cookbook`

### 13.14 Author section and footer

The footer MUST include:

- author attribution
- source repository link once configured
- canonical domain
- license
- a short "built using Agentic Coding" statement

No newsletter, lead form, donation control, or commercial call to action is required.

## 14. Ready-to-use `AGENTS.md` foundation

### 14.1 Purpose

The project MUST provide a complete `AGENTS.md` that a developer can use immediately in a new or existing repository.

It must be:

- repository-agnostic
- language-agnostic
- framework-agnostic
- model-agnostic
- free of placeholders
- free of Jesus-specific package preferences
- free of project-specific architecture
- strict about engineering process
- short enough to inspect and trust in one sitting
- useful without requiring the rest of this website

It cannot be literally value-neutral because it represents the Agentic Coding discipline. It must, however, avoid arbitrary technical opinions unrelated to that discipline.

### 14.2 Public source of truth

The canonical public foundation content MUST live in one source file inside the repository, recommended as:

`src/content/resources/agents-foundation.md`

The human-readable `/start` page and raw `/AGENTS.md` endpoint MUST derive from that same canonical source.

The repository's root `AGENTS.md`, if present, is the internal coding-instruction file for building this project. It is not automatically the same document as the public foundation and MUST NOT be used as the public source unless the developer explicitly changes this architecture.

### 14.3 Foundation content requirements

The public foundation MUST cover the following durable principles.

#### Quality objective

Optimize for:

- correctness
- clarity
- maintainability
- consistency
- reviewability
- alignment with the existing codebase

Do not optimize for cleverness or maximum change volume.

#### Task intent

Before acting, determine whether the developer requested:

- an explanation or investigation
- a plan
- a breakdown
- a review
- an implementation

Do not modify files for a planning-only or review-only request.

Treat the stated objective, constraints, exclusions, and acceptance criteria as the task contract.

Implementation authority does not automatically authorize commits, pushes, pull requests, deployments, releases, migrations in production or shared environments, external messages, or account and service changes.

#### Decision precedence and instruction scope

The foundation MUST establish this conflict order:

1. explicit developer requirements and acceptance criteria, subject to safety and production correctness
2. safety, security, privacy, data integrity, and production correctness
3. existing behavior, public contracts, and established architecture
4. repository tooling, tests, configuration, and framework conventions
5. general foundation guidance
6. official documentation matching the installed version

The foundation MUST require agents to follow every instruction file applicable to the affected path and respect more specific scoped instructions within their scope.

#### Codebase-first workflow

Before substantial planning, diagnosis, review, or implementation:

- inspect the root project documentation when available
- inspect the smallest complete affected path
- inspect existing architecture, conventions, tests, tooling, and related documentation
- use discovered repository facts instead of generic assumptions
- avoid broad exploration when a smaller scope is sufficient

#### Planning collaboration

For substantial work:

- investigate the problem with the developer
- identify alternatives and tradeoffs
- challenge assumptions when evidence supports it
- establish architecture, ownership, contracts, risks, tests, and verification
- distinguish a proposed plan from authorization to implement it

#### Scope control

- inspect broadly enough to understand the task
- modify only the authorized scope
- do not treat discovery as authorization
- do not perform unrelated cleanup
- do not introduce new abstractions when an existing owner can be extended
- report adjacent issues instead of silently expanding the task
- stop when repository evidence requires a material scope or strategy change

#### Reuse and architecture

- preserve existing behavior unless change is intentional
- reuse established utilities, services, components, schemas, and patterns
- avoid parallel implementations and duplicate ownership
- place new behavior with the module that owns it
- prefer the smallest correct solution consistent with the codebase

#### Coherent execution

- execute approved work in small logical steps
- keep each authorized milestone internally coherent
- keep required tests, documentation, contracts, migrations, and verification with the behavior they support
- do not leave deliberate dead-end scaffolding or temporary duplication
- stop after the authorized milestone

#### Tests and self-correction

- add or update tests when they provide meaningful confidence
- choose the test level that exercises the real correctness property
- cover realistic failure modes and boundaries
- do not treat a passing test suite as proof
- investigate whether production code or the expectation is wrong when tests fail
- never weaken tests solely to make them pass
- report checks that could not be run

#### Review

- review the complete scoped change
- report findings first
- inspect correctness, regressions, architecture, scope, reuse, tests, security, maintainability, and documentation
- distinguish verified facts from uncertainty
- do not declare readiness while a material concern is unresolved

#### Transparency

- state important assumptions
- identify blockers
- identify material deviations before applying them
- do not claim a check passed unless it actually ran successfully
- disclose unverified behavior
- preserve user-authored work
- do not reset, clean, stash, revert, or overwrite unrelated changes to simplify the worktree
- do not hide failures

#### Safety

- do not expose secrets
- avoid destructive actions without explicit authorization
- validate security-sensitive and data-integrity-sensitive paths
- do not make high-blast-radius contract, dependency, schema, deployment, or infrastructure changes casually

#### Conditional production safeguards

The foundation MUST include concise, conditional safeguards for:

- frontend accessibility, keyboard operation, responsive behavior, theme support, and reduced motion
- established migration workflows, compatibility, rollback, and explicit authority before executing migrations in production or shared environments
- external-response validation, bounded timeouts or cancellation, safe retries, and idempotent side effects
- server-side authorization, exact value-bearing arithmetic where required, and transactional integrity

#### Documentation and instruction governance

The foundation MUST require directly affected state-bearing documentation to remain synchronized without authorizing unrelated rewrites.

Coding-instruction files MUST be treated as governance files. Agents must not create, edit, rename, move, delete, or reformat them unless the developer explicitly requests an instruction change.

### 14.4 Foundation commands

The public foundation MUST include neutral versions of the following commands.

#### `plan`

When explicitly invoked:

- perform planning-only work
- inspect the relevant repository context
- do not modify files or Git state
- produce an implementation-ready strategy
- identify exact affected areas when evidence permits
- include tests, verification, risks, and unresolved decisions
- end with an approval boundary

#### `breakdown`

When explicitly invoked:

- require a current concrete plan
- preserve that plan's strategy and scope
- do not redesign the solution
- produce ordered implementation milestones
- make each milestone coherent, testable, verifiable, and reviewable
- include objective, dependencies, owned scope, work, verification, acceptance criteria, and review checkpoint
- keep supporting correctness work with the behavior
- end with an approval boundary
- do not begin implementation
- state that breakdown does not approve the plan or authorize implementation
- require explicit authorization for each milestone unless approval and milestone authorization are clearly combined

#### `review`

When explicitly invoked:

- default to the complete uncommitted worktree against `HEAD`, including staged, unstaged, untracked, deleted, and renamed paths, unless another scope is explicit
- exclude existing commits from an unqualified review
- perform review-only work
- do not edit the reviewed change
- inspect the complete requested scope
- run relevant non-writing checks when available
- report findings in severity order
- report checks run and checks not run
- provide a clear readiness verdict
- avoid a ready verdict when material uncertainty remains

The neutral foundation SHOULD NOT include a `repo push` command in v1 because commit signing, staging, remote selection, and publication policy vary significantly across repositories.

### 14.5 Foundation page behavior

The `/start` page MUST include:

- a plain-language explanation of the foundation
- the complete rendered file
- a **Copy `AGENTS.md`** action
- a **Download `AGENTS.md`** action
- a **View raw** action
- the current foundation version
- the last meaningful update date
- a concise statement of what the foundation deliberately does not prescribe
- a link to the refinement workflow for repositories with existing instructions

The copied, downloaded, raw, and rendered content must come from the same canonical source.

## 15. Existing-instructions refinement prompt

### 15.1 Purpose

The project MUST provide one canonical prompt that a developer can paste into the coding agent already working inside their repository.

The prompt's purpose is to inject Agentic Coding values into an existing `AGENTS.md` or instruction system without destroying useful existing guidance.

The website MUST NOT:

- ask the visitor questions
- upload or parse their file
- generate a customized prompt
- attempt to understand their repository
- directly rewrite their instructions

The interactivity belongs in the conversation between the developer and their own coding agent.

### 15.2 Public source of truth

The canonical prompt SHOULD live at:

`src/content/resources/refinement-prompt.md`

The human-readable `/refine` page and raw `/refine.txt` endpoint MUST derive from this same source.

### 15.3 Prompt workflow

The prompt MUST instruct the coding agent to follow this workflow.

#### Stage 1: Inspect before proposing

Inspect:

- the target `AGENTS.md`
- repository-level and nested instruction files that may affect the same scope
- relevant project documentation
- architecture and tooling evidence needed to understand existing rules
- the hierarchy and precedence of instruction files

Do not edit yet.

Summarize:

- valuable existing guidance
- project-specific rules
- current planning and execution model
- current review and test expectations
- overlap or duplication
- contradictions or ambiguity
- missing Agentic Coding values
- potentially obsolete guidance
- decisions that require developer input

#### Stage 2: Collaborate interactively

Ask one focused question at a time only when the answer materially affects the result.

Do not use a generic questionnaire when repository evidence already answers the issue.

Questions may address:

- planning approval
- breakdown and milestone boundaries
- execution authorization
- scope expansion
- adjacent cleanup
- test expectations
- review expectations
- preservation of exact sections
- instruction-file ownership
- conflicts between current rules and Agentic Coding values

Do not edit while material decisions remain unresolved.

#### Stage 3: Present a preservation-first proposal

Organize the proposal as:

- **Preserve**
- **Strengthen**
- **Add**
- **Reconcile**
- **Remove or consolidate**

For every proposed change:

- explain why it is needed
- identify the affected section
- preserve existing terminology and structure where practical
- distinguish a missing value from a stylistic preference
- avoid replacing project-specific rules with generic text

Removal or consolidation requires especially clear justification.

#### Stage 4: Obtain explicit approval

The agent must stop before editing and request approval for the proposed change set.

The following do not count as approval:

- the initial prompt
- permission to inspect
- answers to questions
- discussion of options

The developer may approve, reject, or amend individual changes.

#### Stage 5: Apply minimal edits

After approval:

- modify only approved instruction files
- preserve unrelated guidance
- preserve project-specific constraints
- avoid broad rewrites
- avoid cosmetic restructuring
- deduplicate only where meaning is preserved
- do not modify production code
- do not modify tests, documentation, or configuration outside the approved instruction scope
- do not remove a meaningful rule merely to shorten the file
- do not add conflicting parallel rules

#### Stage 6: Audit the result

After editing, report:

- what was preserved
- what was strengthened
- what was added
- what was reconciled
- what was removed or consolidated
- why each material change was made
- any remaining conflict or ambiguity
- whether instruction precedence remains clear
- whether any important original rule was accidentally lost
- the exact files changed

### 15.4 Values the prompt must inject

The prompt MUST ask the coding agent to assess and, when appropriate, introduce or strengthen these values:

1. quality, clarity, maintainability, and correctness over cleverness
2. task intent and explicit authorization boundaries
3. codebase-first reasoning
4. collaborative planning
5. plan approval before substantial implementation
6. optional plan breakdown into coherent milestones
7. milestone-scoped execution
8. wide context and narrow authority
9. reuse of existing architecture and ownership
10. avoidance of adjacent refactors and duplicate implementations
11. meaningful tests and self-correction
12. test-failure triage instead of blindly changing expectations
13. adversarial review
14. transparent assumptions, blockers, skipped checks, and uncertainty
15. progressive delegation after the project has established clear rails
16. developer accountability for final engineering decisions

The prompt must not blindly impose:

- a language
- a framework
- a folder structure
- a package manager
- exact test filenames
- a database convention
- a particular model or vendor
- Jesus's personal libraries
- the full contents of the public foundation
- the full contents of Jesus's private coding instructions

Agentic Coding values are portable. Their concrete expression must fit the repository.

### 15.5 Refine page behavior

The `/refine` page MUST include:

- a brief explanation of when to use the prompt
- a clear statement that it is one canonical prompt, not a builder
- the full rendered prompt
- a **Copy refinement prompt** action
- a **View raw** action
- the current prompt version
- the last meaningful update date
- a warning to review the proposed changes before approving edits
- a link to `/start` for repositories with no useful existing instructions

## 16. Cookbook

### 16.1 Purpose

The cookbook converts the philosophy into repeatable day-to-day workflows.

It should teach techniques rather than present prompts as magic incantations.

Each recipe MUST explain:

- the situation
- the common mistake
- the Agentic Coding approach
- a copyable prompt or conversation starter
- what a good result should contain
- warning signs
- the developer's review responsibility

### 16.2 Initial recipes

The first production release MUST include these eight recipes:

1. **Plan a feature**
   - turn a vague requirement into a codebase-grounded implementation plan

2. **Challenge a plan**
   - ask the agent to attack assumptions, alternatives, risks, and missing cases before implementation

3. **Break down a plan**
   - convert an approved strategy into coherent, reviewable milestones without redesigning it

4. **Execute one milestone**
   - authorize a bounded implementation slice and stop before later work

5. **Review a change**
   - perform a findings-first review of correctness, regression risk, architecture, scope, tests, and maintainability

6. **Investigate a failing test**
   - determine intended behavior before changing production code or the expectation

7. **Control scope**
   - give the agent enough context to understand dependencies without authorizing adjacent work

8. **Refine coding instructions**
   - use the canonical refinement process to strengthen an existing `AGENTS.md`

A later version MAY add recipes such as introducing agents to an unfamiliar codebase, improving test depth, synchronizing documentation, or preparing a pull request.

### 16.3 Recipe content model

Cookbook entries MUST be managed through an Astro build-time content collection with a strict schema.

Recommended fields:

- `title`
- `description`
- `slug`
- `order`
- `category`
- `updatedAt`
- `readingTime` or a value derived at build time
- `featured`
- `draft`

The body contains the recipe sections.

Draft entries must not be rendered into public routes or the production sitemap.

### 16.4 Cookbook index

The `/cookbook` page MUST:

- explain the purpose of the cookbook
- show all published recipes
- order recipes intentionally rather than by filename
- include descriptions
- expose stable links
- remain useful without JavaScript

Client-side filtering is optional and should not be added unless the initial recipe count justifies it.

### 16.5 Recipe page

Every recipe page MUST include:

- title
- concise description
- situation
- common mistake
- Agentic approach
- copyable prompt
- what to inspect in the result
- warning signs
- related recipes
- last updated date
- canonical metadata

Prompt copy controls must copy the exact canonical prompt text shown in the recipe.

## 17. Interaction requirements

### 17.1 General

Interactive elements must enhance already available static content.

No essential explanation may be hidden behind JavaScript-only rendering.

### 17.2 Copy controls

Reusable copy controls are required for:

- `AGENTS.md`
- the refinement prompt
- cookbook prompts

Copy behavior MUST:

- occur only after a user action
- copy the exact canonical text
- expose a visible success state
- announce success to assistive technology
- expose a visible error state if clipboard writing fails
- avoid reading from the clipboard
- reset its temporary status without creating distracting motion

A raw-view or downloadable fallback must remain available.

### 17.3 Theme

The site MUST support:

- system preference by default
- explicit light mode
- explicit dark mode
- persistence of the visitor's explicit preference in local storage
- no flash that makes text unreadable
- sufficient contrast in both modes

Theme preference is the only required browser-persisted state.

### 17.4 Navigation experience

The site SHOULD use Astro's client router to provide fast, SPA-like navigation and restrained view transitions.

Correctness must not depend on the client router. Standard links and statically generated pages remain authoritative.

Client-side scripts must initialize correctly after client-routed navigation.

Client-routed navigation MUST expose a lightweight progress indicator while the next page is being prepared. The indicator must provide immediate feedback without blocking interaction or shifting the page layout. It must clear after successful navigation, failed navigation, interruption, and browser history traversal.

### 17.5 Motion

Motion may be used to:

- orient users between sections
- highlight the active workflow stage
- reveal short predictable content
- make navigation feel polished

Motion MUST:

- be subtle
- use low-cost opacity and small transforms
- avoid looping decoration
- avoid parallax
- avoid large movement
- avoid height animation for unpredictable content
- honor `prefers-reduced-motion`
- preserve all information when motion is disabled

## 18. Visual design requirements

### 18.1 Direction

The site should feel like:

- a serious engineering manifesto
- a small methodology site
- an editorial technology publication
- a polished open-source project

It should not feel like:

- a SaaS dashboard
- a generic component-library demo
- a crypto project
- a futuristic AI cliché
- a model-provider clone

### 18.2 Visual language

Prefer:

- strong typography
- generous whitespace
- clear editorial rhythm
- structured diagrams
- restrained code and terminal surfaces
- subtle borders and grids
- purposeful asymmetry where it remains responsive
- a small, consistent design-token system

Avoid:

- robot illustrations
- glowing brains
- excessive gradients
- neon overload
- floating glass cards without purpose
- decorative charts with no meaning
- stock photography
- fake product dashboards

### 18.3 Design tokens

The implementation MUST centralize semantic tokens for at least:

- page background
- elevated surface
- secondary surface
- primary text
- muted text
- border
- strong border
- accent
- accent contrast
- focus ring
- code background
- success
- warning
- error

Tokens must support light and dark themes.

Do not scatter one-off colors throughout components.

### 18.4 Typography

The site MUST use a highly readable sans-serif system.

A custom font MAY be used if it is:

- open for the intended use
- self-hosted or bundled through an installed package
- not loaded from a third-party font CDN
- performant
- tested across light and dark themes

The implementation must define:

- display heading scale
- section heading scale
- body text
- small metadata
- monospace code text
- readable maximum prose width

The exact font family is an implementation design decision unless the developer supplies a brand requirement.

### 18.5 Diagrams

The signature loops and context/authority visualization should be built with semantic HTML and lightweight SVG where useful.

They must:

- scale to 320px
- not require horizontal page scrolling
- remain understandable without color
- include accessible text equivalents
- avoid canvas or WebGL

## 19. Responsive requirements

The complete site MUST work from 320px wide through large desktop displays.

Requirements:

- no horizontal page overflow at 320px
- navigation remains usable
- comparison content adapts without losing meaning
- the comparison table scrolls within its own region on narrow viewports
- workflow diagrams stack or recompose cleanly
- code and prompt blocks scroll internally when necessary
- touch targets remain usable
- headings do not overflow
- long URLs and code wrap or scroll safely
- interactive controls remain visible and reachable
- no content becomes hover-only

Use a mobile-first implementation.

## 20. Accessibility requirements

Target **WCAG 2.2 AA**.

At minimum:

- semantic landmarks
- one primary `main` region
- valid heading hierarchy
- skip link
- visible focus indicators
- keyboard-operable navigation and controls
- native elements before ARIA
- accurate accessible names
- no color-only meaning
- sufficient light and dark contrast
- reduced-motion support
- route-change announcements when client routing is used
- clear status announcements for copy actions
- accessible comparison and workflow alternatives
- alt text or empty alt text as appropriate
- no focus traps
- no inaccessible custom scroll behavior
- no automatic audio or video

Accessibility is part of acceptance, not a later enhancement.

## 21. Technical architecture

### 21.1 Required stack

Use:

- Astro
- static output
- strict TypeScript
- Tailwind CSS 4 through the official Vite plugin approach
- Astro build-time content collections
- native Astro components
- native browser JavaScript for simple interactions
- the official Astro sitemap integration
- GitHub Actions
- GitHub Pages

Use the current stable versions supported at implementation time and pin exact dependency versions in the repository lockfile.

Use a supported Node.js LTS major compatible with the selected Astro version. Record the runtime requirement in `package.json` and the repository documentation.

### 21.2 React policy

Do not add React to the initial project by default.

The required interactions are expected to be maintainable with Astro components and native client scripts.

React MAY be introduced later only when a specific interactive component has state or composition complexity that materially benefits from it. Adding React requires an explicit justification and must not turn the site into a monolithic React application.

### 21.3 Static output

Astro MUST use static output.

The site must not require:

- server adapters
- runtime environment variables
- server actions
- API routes executed on request
- server-side sessions
- database access

Static file endpoints may be used because Astro executes them at build time.

### 21.4 Canonical raw resources

Use static file endpoints to generate:

- `/AGENTS.md`
- `/refine.txt`

Each endpoint MUST return content from the same canonical source used by its rendered page.

Recommended response content types:

- `text/markdown; charset=utf-8` for `/AGENTS.md`
- `text/plain; charset=utf-8` for `/refine.txt`

Both files should end with one newline and use LF line endings.

### 21.5 Content collections

Use build-time content collections for:

- cookbook recipes
- public resources

Define strict schemas in `src/content.config.ts` using the APIs appropriate to the installed Astro version.

Content validation must fail the build when required metadata is missing or invalid.

### 21.6 Astro client routing

The base layout SHOULD include Astro's current supported client router for SPA-like navigation.

Requirements:

- pages remain real static pages
- standard anchor navigation remains valid
- page titles and route announcements remain correct
- scripts account for client-routed page lifecycle
- client-routed preparation exposes accessible progress and always clears its loading state
- transitions are minimal
- reduced-motion users receive no unnecessary animation

### 21.7 Tailwind CSS

Use Tailwind CSS 4 through its Vite plugin.

Do not use the deprecated `@astrojs/tailwind` integration for a new Tailwind 4 project.

Use:

- semantic CSS variables for design tokens
- Tailwind utilities for layout and presentation
- custom CSS only for global tokens, typography primitives, browser-specific behavior, or visuals Tailwind cannot express cleanly

Do not create a large bespoke CSS framework.

### 21.8 Suggested repository structure

```text
.
├── .github/
│   └── workflows/
├── public/
│   ├── favicon.svg
│   ├── og/
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── copy-control/
│   │   ├── comparison/
│   │   ├── navigation/
│   │   ├── theme-control/
│   │   ├── workflow-loop/
│   │   └── shared/
│   ├── content/
│   │   ├── cookbook/
│   │   └── resources/
│   │       ├── agents-foundation.md
│   │       └── refinement-prompt.md
│   ├── layouts/
│   │   ├── base-layout.astro
│   │   └── content-layout.astro
│   ├── pages/
│   │   ├── index.astro
│   │   ├── start.astro
│   │   ├── AGENTS.md.ts
│   │   ├── refine.astro
│   │   ├── refine.txt.ts
│   │   ├── cookbook/
│   │   │   ├── index.astro
│   │   │   └── [slug].astro
│   │   └── 404.astro
│   ├── styles/
│   │   └── global.css
│   ├── utilities/
│   ├── content.config.ts
│   └── site.config.ts
├── AGENTS.md
├── README.md
├── astro.config.ts
├── package.json
├── project.md
└── tsconfig.json
```

This is a suggested ownership model, not permission to create meaningless directories or split trivial files. The coding agent must keep implementation units cohesive and follow the repository's final established conventions.

### 21.9 Central site configuration

Use one typed configuration module for:

- site name
- canonical URL
- default description
- author name
- author URL
- repository URL
- social metadata
- default Open Graph image
- resource versions

Do not duplicate these values across layouts and pages.

Unknown links must be omitted or left as clearly documented configuration requirements. Do not invent handles or URLs.

## 22. GitHub Pages deployment

### 22.1 Production domain

The production URL is:

`https://agenticcoding.jesusgraterol.dev`

Astro's `site` configuration MUST use this canonical URL.

Because the production site uses a custom domain at the domain root, the project should not configure a repository-name base path unless deployment evidence shows it is required.

### 22.2 Publishing source

Configure GitHub Pages to publish through **GitHub Actions**.

Do not publish compiled files manually to a dedicated branch.

Do not add a `gh-pages` runtime dependency solely for deployment.

### 22.3 Deployment trigger

A successful push or merge to `main` that changes the site MUST build and publish automatically.

The workflow MUST also support manual dispatch.

Pull requests MUST run verification and build checks without deploying to production.

Deployment must occur only after required checks for the same commit succeed.

### 22.4 Deployment implementation

Use the official Astro GitHub Pages deployment approach and official GitHub Pages actions.

The workflow must grant only the permissions required for Pages deployment.

The workflow must:

1. check out the repository
2. install the locked dependencies
3. run required verification
4. build the static site
5. upload the Pages artifact
6. deploy the exact artifact

The deployed artifact must have the generated site entry file at its top level.

### 22.5 Custom domain

The custom domain must be configured in GitHub Pages settings and DNS.

Requirements:

- verify the domain through GitHub when available
- enable HTTPS after certificate provisioning
- treat GitHub Pages settings as authoritative
- do not rely on a repository `CNAME` file when using the custom GitHub Actions deployment workflow
- document the configured DNS target without inventing it before the repository owner and Pages target are known

### 22.6 Deployment concurrency

Only the latest valid production deployment should remain active.

The workflow should prevent concurrent deployments from racing and may cancel an older in-progress deployment when a newer commit supersedes it.

## 23. SEO and sharing

Every public HTML route MUST include:

- unique page title
- unique meta description
- canonical URL
- Open Graph title
- Open Graph description
- Open Graph URL
- Open Graph image
- Twitter/X summary-card metadata
- theme color appropriate to the current design

The project MUST include:

- `robots.txt`
- a root `llms.txt` generated from canonical project content
- generated sitemap
- descriptive favicon
- a default 1200×630 Open Graph image
- a custom 404 page

Cookbook recipes should use article-style structured metadata when it can be added accurately.

The homepage should use website-level structured metadata.

The cookbook index should use collection-page structured metadata. Public HTML pages should identify `/llms.txt` with `rel="describedby"`, and pages with canonical raw resources should expose them with `rel="alternate"` and an accurate media type.

Do not add fabricated ratings, dates, organizations, or author profiles to structured data.

## 24. Privacy and security

The initial site collects no personal data.

Requirements:

- no account
- no form submission
- no file upload
- no cookies
- no advertising scripts
- no fingerprinting
- no AI requests
- no repository access
- no clipboard reads
- clipboard writes only after explicit user action
- no third-party font CDN
- no third-party script by default
- theme preference may be stored locally
- external links use safe opener behavior

Analytics are out of scope for v1. If added later, they require explicit approval and should be cookieless, privacy-respecting, and documented.

GitHub Pages cannot provide arbitrary application-server behavior. Do not design security requirements that depend on custom server headers or runtime secret storage.

## 25. Performance requirements

The site should ship as static HTML with the smallest practical JavaScript footprint.

Requirements:

- no client framework runtime by default
- no JavaScript for purely presentational content
- no layout-blocking third-party scripts
- optimized images with explicit dimensions
- lightweight SVG for diagrams
- no large hero media
- no client-side fetch for content already available at build time
- no duplicated content payload for raw resources
- no unnecessary hydration
- no avoidable layout shift
- font loading must not make content invisible
- direct page loads must remain fast on mobile connections

Performance must not be improved by removing accessibility, metadata, readable typography, or necessary functionality.

## 26. Testing and verification

### 26.1 General

Testing must focus on behavior and contracts that could realistically break.

Do not add tests only to increase test count.

Follow the repository's coding instructions for test placement, naming, category scripts, and production-build exclusion.

### 26.2 Unit coverage

Add focused unit tests where they provide value, including:

- canonical resource text normalization
- resource endpoint output
- content metadata validation owned by project utilities
- theme preference parsing and resolution
- copy-state logic if extracted into a reusable utility
- any non-trivial workflow interaction logic

Do not test Astro, Tailwind, or browser behavior already guaranteed by those tools unless project integration adds meaningful risk.

### 26.3 End-to-end coverage

Use browser-level tests for important user-visible flows:

- homepage loads and exposes all required major sections
- direct navigation to every public route succeeds
- a cookbook deep link works when loaded directly
- `/AGENTS.md` returns the canonical foundation
- `/refine.txt` returns the canonical prompt
- copied resource text matches the canonical source
- theme selection works and persists
- mobile navigation is keyboard operable
- the progress indicator behaves correctly during delayed, failed, interrupted, and browser history navigation
- copy controls expose success state
- the custom 404 page is generated and usable
- the site has no horizontal page overflow at 320px in representative routes
- primary interactions work with keyboard input
- reduced-motion behavior removes non-essential animation
- light and dark themes remain readable

Automated accessibility scanning should complement, not replace, manual keyboard and semantic review.

### 26.4 Content synchronization tests

The build or test suite MUST verify:

- `/start`, `/AGENTS.md`, and the copy action use the same foundation source
- `/refine`, `/refine.txt`, and the copy action use the same refinement-prompt source
- draft cookbook entries do not appear in routes or sitemap
- cookbook slugs are unique
- required route metadata exists
- internal links are valid

### 26.5 Required checks

The repository MUST expose scripts for the checks supported by the implementation.

At minimum, CI must run:

- dependency installation from the committed lockfile
- Astro type/content checks
- unit tests when present
- end-to-end tests when present
- linting
- formatting verification
- production build

Do not claim a check passed unless it ran successfully.

The production deployment job must not publish when a required check fails.

### 26.6 Manual visual verification

Before the first release, inspect:

- 320px mobile
- common mobile width
- tablet
- laptop
- large desktop
- light mode
- dark mode
- keyboard navigation
- focus visibility
- reduced motion
- long prompt and code blocks
- comparison readability
- both signature loops
- Open Graph preview
- GitHub Pages direct-route behavior
- custom-domain HTTPS

## 27. Repository documentation

The root `README.md` MUST document:

- what Agentic Coding is
- the purpose of the repository
- local setup
- required Node.js version
- package-manager usage
- development commands
- test commands
- production build
- GitHub Pages deployment
- custom-domain expectations
- content organization
- how to add a cookbook recipe
- canonical sources for the public foundation and refinement prompt
- the distinction between the repository's root `AGENTS.md` and the public `/AGENTS.md`
- license
- source and author information

The README should remain concise and use this `project.md` as the complete product specification.

## 28. Versioning of public resources

The public foundation and refinement prompt are durable resources and MUST expose a version.

Use semantic versioning:

- major: materially changes the operating model or removes established guidance
- minor: adds meaningful compatible guidance
- patch: clarifies wording or fixes defects without changing intended behavior

The human-readable pages must display each resource's current version and last meaningful update date.

Resource metadata must be stored once and reused by page rendering and site configuration.

The raw resource may include a concise version comment when it does not harm direct usability.

## 29. Licensing

Use the MIT License for the initial repository unless the developer explicitly selects another license before publication.

The license must apply clearly to:

- source code
- the public `AGENTS.md` foundation
- the refinement prompt
- cookbook prompts and examples

Do not add restrictive terms that undermine copying and adaptation of the practical resources.

## 30. Content maintenance rules

When changing the project's philosophy or practical resources:

- preserve the distinction between planning collaboration and implementation
- preserve developer accountability
- preserve the warning against unrestricted authority
- preserve wide context and narrow authority
- preserve the role of self-correcting mechanisms
- keep Agentic Coding stack- and vendor-agnostic
- keep the public foundation neutral with respect to implementation technologies
- keep the refinement prompt preservation-first and interactive
- do not turn `/refine` into a builder
- keep copied, raw, downloaded, and rendered resources synchronized
- update versions intentionally
- update related cookbook recipes when a workflow contract changes

## 31. Definition of done

The first production release is complete only when all of the following are true.

### 31.1 Product

- the homepage communicates the complete Agentic Coding thesis
- collaborative planning is clearly represented
- paving the way before delegation is clearly represented
- both signature loops are present
- wide context and narrow authority are clearly represented
- the quality-over-speed thesis is present
- the caution against free rein is present
- the Moldea field-application section is factual and understated
- the ready-to-use foundation is complete
- the refinement prompt is complete
- all eight initial cookbook recipes are published
- author attribution and source links are present

### 31.2 Functional

- all required routes build
- all routes work through direct GitHub Pages navigation
- copy actions work
- raw resources work
- rendered and raw resources are synchronized
- theme switching works
- mobile navigation works
- the 404 page works
- no feature depends on a backend

### 31.3 Experience

- the site looks intentional and modern
- the experience feels editorial rather than application-like
- the site works at 320px
- light and dark modes are complete
- keyboard navigation is complete
- client-routed navigation provides clear loading feedback
- reduced-motion behavior is complete
- no required content is JavaScript-only
- no page has unintended horizontal overflow

### 31.4 Technical

- Astro uses static output
- Tailwind 4 uses the Vite plugin approach
- content collections validate cookbook and resource content
- React is not included without explicit justification
- official sitemap generation is configured
- exact dependency versions and a lockfile are committed
- required tests and checks pass
- production build succeeds
- the GitHub Pages workflow deploys automatically from `main`
- the custom domain serves over HTTPS

### 31.5 Documentation

- `README.md` is complete
- `project.md` is present
- repository coding instructions exist as appropriate
- content-maintenance instructions are clear
- deployment and custom-domain steps are documented
- no state-bearing documentation contradicts the implementation

## 32. Final product promise

The finished project should allow a developer to:

1. understand why Agentic Coding is different from both manual coding and vibe coding
2. understand that coding agents can be powerful planning partners
3. understand why developers must pave the way before broad delegation
4. adopt a practical Plan → Breakdown → Execute → Review workflow
5. begin immediately with a ready-to-use `AGENTS.md`
6. safely refine existing instructions through their own coding agent
7. learn practical techniques from a concise cookbook

The experience should leave the visitor with one clear conclusion:

> **Agentic Coding is not about giving AI more control. It is about giving developers dramatically more leverage without surrendering engineering discipline.**
