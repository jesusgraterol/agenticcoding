# Agentic Coding: Project Specification

**Status:** Approved for implementation

**Version:** 1.0.0

**Last updated:** 2026-10-15

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

The project has five primary offerings:

1. a concise, visually compelling explanation of Agentic Coding
2. a ready-to-use, repository-agnostic `AGENTS.md` foundation
3. one canonical prompt for safely refining an existing `AGENTS.md`
4. a visual walkthrough of the workflow, showing each step run through an agent skill
5. a cookbook of techniques for recurring situations that no skill covers

The site is organized around one thesis: **`AGENTS.md` sets the standards. Skills run the workflow. You decide how much to delegate.**

The workflow runs through jg-skills, a separate open-source collection of explicit-only agent skills published at `https://jg-skills.jesusgraterol.dev`. This site owns the method: the standards, the refinement prompt, and the visual walkthroughs. jg-skills owns the installable skills and their full instructions. The two sites link to each other, and this site never duplicates the skill text.

The site will be statically generated with Astro and hosted on GitHub Pages at `agenticcoding.jesusgraterol.dev`.

## 3. Core thesis

AI has accelerated the rate at which software can be produced. The greater opportunity is to improve the quality of the software developers can afford to build.

Coding agents can participate meaningfully in:

- classifying the requested authority before acting
- understanding a codebase
- investigating a problem
- planning a solution
- challenging a proposed plan before approval
- comparing architectural approaches
- decomposing work
- implementing code
- creating and running tests
- reviewing changes
- finding regressions
- synchronizing documentation
- correcting their own work
- publishing a change when the developer explicitly grants that authority, per change or per run

The developer should not treat the agent only as an implementation engine. The agent is an active engineering collaborator across the lifecycle.

The developer nevertheless remains accountable for:

- the real objective
- the authority granted for the current action
- product and domain knowledge
- important constraints
- architecture and tradeoff approval
- the authority granted to the agent
- the final quality bar
- whether a change belongs in the system
- whether, and how far in advance, publication is authorized

The central position of the project is:

> **Do not delegate engineering to the agent. Engineer with the agent.**

## 4. Definition of Agentic Coding

**Agentic Coding is a collaborative software-development discipline in which developers use coding agents across planning, decomposition, implementation, verification, and review while retaining responsibility for intent, system direction, and engineering quality.**

Throughout this specification, Evidence is agent-operated and developer-governed. The coding agent operates the phase by performing the findings-first review, running applicable verification, challenging test adequacy, investigating failures, and assembling reproducible evidence. A developer governs it by challenging intent and risk assumptions, strengthening independent test oracles, deciding when additional evidence or code inspection is necessary, and owning the acceptance decision.

This relationship separates workload from authority. The agent carries the verification workload. The developer builds the system that makes the evidence trustworthy and remains accountable for acceptance. The amount of direct developer involvement varies with risk, novelty, and project maturity rather than following a prescribed allocation.

Every product surface, public resource, workflow step, and cookbook recipe that describes implementation review MUST preserve this relationship. It must identify the agent as the primary evidence operator and the developer as the acceptance authority. Direct developer code inspection is proportional and risk-triggered rather than universally mandatory. As agents and independent verification systems mature, routine line-by-line inspection MAY give way to evidence-led acceptance, while code remains available for audit when evidence is weak, correlated, incomplete, novel, or attached to a high-risk change.

In an autonomous run, the developer exercises that authority twice: in advance, by explicitly granting the run, and afterwards, by judging the published result. The run's review gate and stop conditions bound what the agent may accept and publish in between.

Agentic Coding sits between traditional manual coding and vibe coding, but it is not defined by the percentage of code written by AI.

The distinguishing question is:

> **Who controls the engineering decisions, scope, evidence, and quality?**

An Agentic Coding workflow may delegate a very large amount of implementation to an agent. It remains Agentic Coding when the work is grounded in an explicit task contract, current repository evidence, established ownership, bounded authority, collaborative decisions, coherent execution units, meaningful verification, synchronized state, transparent reporting, and developer accountability.

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

The agent may inspect, plan, propose, challenge, decompose, implement, test, perform adversarial review, assemble the evidence for acceptance, and publish when the developer explicitly grants that authority, either for one change or for an autonomous run. The developer actively shapes the process, approves material decisions, controls scope, supervises the evidence, invests in independent verification, accepts or rejects the resulting state, and decides whether and when publication is authorized.

The site MUST make clear that Agentic Coding is not merely a compromise between writing code manually and delegating code blindly. It is a distinct engineering discipline.

## 6. Product principles

### 6.1 Dispatch skills before classifying ordinary intent

An explicitly invoked agent skill selects an executable workflow before the agent classifies the request as an ordinary explanation, investigation, plan, review, or implementation task.

The agent MUST:

- run a skill only when the developer explicitly invokes it
- follow the skill's authority, write limits, stopping conditions, and output contract through completion
- apply the repository's coding instructions to the work the skill performs
- classify ordinary task intent only when no skill is invoked
- treat publication, deployment, and other external actions as authorized only by an explicit developer request or an invoked skill whose workflow includes them

Skill dispatch is part of the reliability system because the same words can authorize materially different actions depending on whether they invoke a defined workflow. The workflow taught by this site runs through jg-skills, whose skills are explicit-only: they run only when the developer invokes them by name. That guarantee is verified with Claude Code and Codex.

### 6.2 Collaborate on the plan

Planning is one of the strongest uses of a coding agent.

A good planning session is interactive. The developer brings intent, domain context, priorities, and judgment. The agent brings codebase inspection, breadth of analysis, consequence tracing, alternative proposals, and the ability to identify details that may have been overlooked.

The agent is not expected to wait passively for a fully formed architecture. It should help create the architecture, then challenge material assumptions before approval while changing course is still inexpensive.

### 6.3 Pave the way before delegating broadly

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

### 6.4 Demonstrate → Codify → Delegate → Verify

This loop describes how a project becomes increasingly safe and effective for agentic development.

**Demonstrate**

Work closely with the agent. Make important decisions explicit. Correct behavior that does not fit the system and explain why.

**Codify**

Turn recurring decisions into durable project context: coding instructions, architecture, examples, tests, schemas, documentation, reusable abstractions, and automation.

**Delegate**

Grant the agent progressively larger and more complete tasks as the surrounding system becomes clearer: from one supervised milestone at a time to autonomous runs that review and publish each milestone within explicit limits.

**Verify**

Make the agent responsible for most verification and evidence assembly. The developer challenges the evidence, improves the verification system, and decides whether additional testing or code inspection is required before acceptance.

### 6.5 Wide context, narrow authority

A coding agent should inspect enough surrounding code to understand the complete affected path.

That does not authorize it to modify everything it discovers.

The project MUST teach the distinction between:

- understanding an adjacent dependency
- changing an adjacent dependency

A concise expression of the principle is:

> **Give the agent a wide field of view and a narrow target.**

Another required concept is:

> **A dependency is not automatically a deliverable.**

### 6.6 Plan → Challenge → Breakdown when useful → Execute → Review

This is the primary change-development sequence taught by the project. Each stage runs through an explicitly invoked jg skill: `jg-plan`, `jg-challenge-plan`, `jg-breakdown`, `jg-execute`, and `jg-review`. An optional `jg-brainstorm` conversation may precede the plan, `jg-debug` finds and fixes a bug whose cause is not obvious, and `jg-pause` stops the agent at a safe point.

**Plan**

Investigate the problem and current repository state. Collaboratively establish the task contract, architecture, ownership, affected contracts, risks, tests, verification, and intended final state.

**Challenge**

Treat the plan as an untrusted proposal. Verify its material claims, expose unsupported assumptions, missing work, hidden blast radius, unnecessary complexity, weak rollback or compatibility paths, and tests that could pass while important behavior remains wrong. Challenge is read-only, advisory, and stale as soon as the plan changes.

**Breakdown when useful**

Evaluate whether the approved strategy contains at least two coherent implementation slices that can each be completed, verified, and reviewed as a meaningful finished state. Create ordered milestones only when those boundaries are useful. When the plan is one coherent slice, implement it as one complete scope after approval instead of manufacturing milestones.

**Execute**

Implement only the currently authorized scope. Keep required production changes together with their tests, contracts, documentation, migrations, and verification.

Execution is supervised by default: the agent builds the next authorized milestone, runs its checks, and stops. In an autonomous run, which the developer must invoke explicitly, the agent also reviews and publishes each milestone before starting the next.

**Review**

The coding agent must assume the implementation may contain mistakes and inspect correctness, regressions, architecture, duplication, security, edge cases, test adequacy, maintainability, and documentation. It must run applicable checks, identify uncertainty, and produce reproducible evidence tied to the exact reviewed state. The developer then challenges the evidence and its interpretation of product intent, strengthens independent tests or oracles where needed, and decides whether to correct the current work, continue with another authorized slice, or complete the change. The developer inspects code when the change's risk, novelty, or evidence quality warrants it.

Publication is not a sixth lifecycle stage. It requires its own explicit grant, given in one of two ways:

- **per change:** the developer invokes `jg-push` after `jg-review`
- **per run:** the developer invokes `jg-execute auto`, which reviews and publishes each milestone and stops when a decision, scope change, repeated failure, incomplete review, merge conflict, or failed push needs the developer

Implementation authority, plan approval, and milestone completion never imply publication. Staging, signing, and destination follow the repository's own policy or the invoked skill.

### 6.7 Clarity creates better delegation

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

### 6.8 Capability needs a reliability system

Coding agents are capable enough to build large systems and capable enough to build the wrong system convincingly.

The site must not advocate unrestricted autonomy.

The desired system around the agent is:

> **Task Contract → Repository Evidence → Plan → Challenge → Breakdown when useful → Execution → Agent-operated Evidence → Developer Judgment → Correct, Continue, or Complete**

Publication must be shown as an explicit grant beside that system, never as an automatic consequence of it.

An autonomous run is bounded autonomy, not free rein. The developer grants it explicitly. It asks before publishing to the default branch or publishing commits that were already unpushed, stops after three failed fix attempts or an incomplete review, and never weakens a test, check, or finding to proceed.

A required message is:

> **The agent provides capability. The engineering process provides reliability.**

### 6.9 Quality is the lasting opportunity

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
- repeated agent review, stronger evidence, and risk-triggered developer audits

A required editorial idea is:

> **The first benefit is speed. The lasting benefit should be better software.**

### 6.10 Evidence matures beyond routine code inspection

Agent-generated implementation and agent-generated tests can share the same mistaken assumption. A green suite is therefore not automatically independent evidence.

Developers should invest in verification systems that challenge the implementation from outside its construction path. Depending on the behavior and failure risk, this may include:

- property-based and fuzz testing
- mutation testing that demonstrates whether tests detect meaningful defects
- contract and differential testing
- realistic integration and end-to-end tests
- durable invariants, schemas, and transactional constraints
- production observability, canaries, and reversible releases
- an independent agent or model attacking the implementation and its evidence

These techniques are selected from real risk rather than applied mechanically.

As the agent, repository, and verification system mature, developer review may progress through four states:

1. inspect the code and evidence directly
2. inspect all material evidence while sampling implementation
3. audit code only when risk or weak evidence triggers it
4. accept primarily from specifications, system behavior, and independent evidence while preserving code as an auditable artifact

The destination is not less engineering judgment. It is judgment exercised through stronger evidence instead of mandatory line-by-line inspection.

Delegation follows the same maturity. A project moves from supervised milestones, where the developer runs review and publication for each one, to autonomous runs, where the developer grants the run and judges the published result, once its verification system makes the review gate trustworthy.

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

The method content must not assume a specific programming language, framework, model provider, editor, or coding-agent product.

The site may name jg-skills as the companion collection that runs the workflow. Wherever it recommends installing the skills, it MUST state that their explicit-only invocation is verified with Claude Code and Codex, and MUST NOT imply that guarantee for other agents. Examples show skill names without an agent-specific prefix and explain the invocation syntax once: `/jg-plan` in Claude Code, `$jg-plan` in Codex.

## 8. Product goals

The first production release MUST:

1. explain Agentic Coding in a brief, compelling, and credible way
2. distinguish it clearly from both manual coding and vibe coding
3. present collaborative planning as a core capability
4. teach developers to pave the way before broad delegation
5. teach wide context and narrow authority
6. present skill-before-intent dispatch and the six-layer engineering contract
7. present the Plan → Challenge → Breakdown when useful → Execute → Review sequence with Correct, Continue, or Complete outcomes and the jg skill that runs each stage
8. present publication as an explicit grant, per change or per autonomous run, together with the limits of autonomous runs
9. present the Demonstrate → Codify → Delegate → Verify loop
10. explain why strong self-correcting mechanisms are necessary
11. explain why the long-term opportunity is software quality
12. provide a neutral, ready-to-use `AGENTS.md`
13. provide one canonical, preservation-first refinement prompt
14. provide a visual workflow walkthrough that links each stage to its jg skill
15. provide a concise cookbook of techniques for situations no skill covers
16. work fully as a static GitHub Pages site
17. be beautiful, modern, responsive, accessible, fast, and shareable, preferring concrete examples to long explanations
18. support Jesus Graterol's professional reputation in an understated way
19. remain free and usable without an account, backend, or AI API
20. ground the discipline in an understated example from the real project work behind it

## 9. Non-goals

The first production release MUST NOT include:

- user accounts
- authentication
- a database
- a backend
- server-side rendering
- an AI API integration
- an interactive chat interface (static example transcripts are allowed)
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
| `/workflow` | Visual walkthrough of the skill-based workflow |
| `/cookbook` | Cookbook index |
| `/cookbook/[slug]` | Individual cookbook recipe |
| `/404.html` | Custom not-found page generated from `src/pages/404.astro` |

The site MAY use section anchors on `/`, but every primary practical resource must have a stable route.

The route structure must not depend on client-side routing to work. Direct navigation, browser refresh, external linking, and GitHub Pages static serving must work for every route.

## 12. Global navigation

The primary navigation MUST contain:

- Agentic Coding
- Start
- Workflow
- Refine
- Cookbook
- Skills
- Source

Requirements:

- "Agentic Coding" returns to `/`
- "Skills" opens `https://jg-skills.jesusgraterol.dev/` and is identifiable as an external destination
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
- calls to action for `/start` and `/workflow`
- a static session transcript that shows the workflow running through jg skills on a fictional feature, in at most ten short messages

Recommended starting direction:

> **Software development after manual coding, without giving up engineering.**

Supporting idea:

> `AGENTS.md` sets the standards. Skills run the workflow. You decide how much to delegate.

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
- publication and other external action authority
- developer responsibility
- primary goal

The visual must communicate that the spectrum is about control and engineering process, not simply how many lines the agent writes.

The comparison must remain a semantic table at every viewport width. On small screens, its columns must remain intact inside an accessible horizontal scroll region instead of flattening into cards. That region must contain its own overflow so the page itself never scrolls horizontally.

### 13.4 Definition of Agentic Coding

Display the canonical definition from section 4 prominently.

The section should reinforce:

- the agent is a planning collaborator
- the agent can propose and challenge architecture
- the agent can implement, perform adversarial review, and assemble most acceptance evidence
- the developer supervises the evidence and retains accountability for acceptance
- direct code inspection becomes proportional to risk and evidence quality
- Agentic Coding increases leverage rather than removing discipline

A featured line should be:

> **Do not delegate engineering to the agent. Engineer with the agent.**

### 13.5 Engineering contract

The homepage MUST compress the operating instructions into a static six-layer visual between the operating-model definition and the per-change workflow:

1. skill dispatch, task intent, and authority
2. repository evidence and decision precedence
3. ownership, reuse, and public contracts
4. coherent implementation and synchronized state
5. adversarial evidence and developer acceptance
6. explicitly granted publication and external action

Each layer pairs its rule with one short example line. Example lines that describe a skill must match what that skill may change according to the jg-skills README.

The visual must remain concise enough to function as a manifesto rather than an instruction manual. It must use semantic HTML, preserve an ordered reading sequence, communicate meaning without relying on color, flatten unnecessary containers on mobile, work from 320px through large desktop widths, support light and dark themes through existing tokens, and require no JavaScript or animation.

### 13.6 Interactive planning in the hero

The hero transcript MUST correct the idea that the developer plans alone and the agent only implements.

Through `jg-brainstorm` and `jg-plan`, it should show a short, realistic interaction:

1. the developer describes a problem or initial approach
2. the agent inspects the relevant system
3. the agent identifies an existing pattern, constraint, or overlooked consequence
4. the developer challenges or redirects the proposal
5. the agent revises the plan
6. both converge on an implementation-ready strategy

The example must be understandable without model-specific branding. Speakers are labeled "You" and "Coding agent", and the transcript continues through execution, review, and a signed push.

The interaction may use a fictional feature such as organization-level API keys, but it must remain concise and technically credible.

All text must exist in the static HTML. Animation may progressively reveal or highlight it, but must not be required to access it.

### 13.7 Plan → Challenge → Breakdown when useful → Execute → Review

This is a signature visual and conceptual section. The homepage presents the sequence as a skill pipeline grouped into Plan, Build, and Ship stages, and each skill links to its step on `/workflow`. Optional skills are marked with text, not color alone.

The visualization MUST expose five ordered stages:

#### Plan

- inspect the relevant codebase
- clarify intent and constraints
- identify architecture and ownership
- identify affected contracts and files
- identify risks, tests, and verification
- obtain developer approval before implementation

#### Challenge

- require one exact current plan
- identify the plan with a complete content hash
- treat the plan as untrusted and verify material claims against repository evidence
- expose scope mismatch, unsupported assumptions, hidden blast radius, unnecessary complexity, weak compatibility or rollback, and tests that could miss important defects
- report material findings and unresolved decisions through a deterministic recommendation
- remain read-only, advisory, and stale after plan revision

#### Breakdown when useful

- use the current plan as the authoritative strategy
- determine whether at least two meaningful implementation slices exist
- create ordered milestones only when useful
- keep one coherent plan as one complete implementation scope
- do not redesign the solution
- keep each milestone internally coherent
- keep implementation with its required tests, documentation, contracts, exports, migrations, and verification
- provide a review checkpoint
- obtain approval for the milestone sequence when one is created

#### Execute

- implement only the explicitly authorized milestone or scope
- reuse existing architecture and abstractions
- avoid adjacent cleanup
- verify each logical step
- stop before beginning the next unauthorized milestone
- run supervised by default; when the developer invokes `jg-execute auto`, build, review, and publish each remaining milestone within the run's stop conditions

#### Review

- make the agent the primary evidence operator and the developer the acceptance authority
- run through `jg-review` for the current task's uncommitted work and `jg-review <target-branch>` for a branch
- require the agent to report findings before praise or summary
- inspect correctness and regressions
- inspect scope and duplication
- inspect tests and whether defects could survive them
- inspect security, maintainability, and documentation
- report checks that did and did not run
- produce a clear readiness verdict
- require the developer to challenge the evidence, strengthen independent oracles where needed, and decide whether risk warrants code inspection

Review must lead to one of three explicit outcomes:

- **Correct** when evidence exposes a defect, stale contract, or material uncertainty
- **Continue** when an accepted milestone is complete and another authorized slice remains
- **Complete** when the accepted state satisfies the task contract and no implementation work remains

Publication MUST appear beside this sequence as an explicit grant, not as a numbered stage. A supervised/autonomous toggle MUST show who runs `jg-review` and `jg-push` in each mode: the developer invokes them in supervised mode, and `jg-execute auto` runs them after each milestone once the developer has granted the run. Publication must never appear to follow automatically from Review, plan approval, implementation authority, or milestone completion.

The toggle MUST work without JavaScript, keep both modes in the static HTML, and remain keyboard operable.

A reduced-motion presentation must preserve the same content without animated movement.

### 13.8 Pave the way

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

### 13.9 Demonstrate → Codify → Delegate → Verify

This section is the second signature loop.

It MUST explain each stage using the definitions in section 6.4.

The Verify stage MUST communicate that Evidence is agent-operated and developer-governed. It must separate verification workload from acceptance authority and show the maturity progression from direct code-and-evidence inspection toward evidence-led acceptance with risk-triggered code audits.

The Delegate stage MUST show the progression from supervised milestones to autonomous runs and list the limits of an autonomous run.

The visual treatment should differ enough from the primary change loop that users do not confuse them:

- Plan → Challenge → Breakdown when useful → Execute → Review is the sequence for an individual change
- Demonstrate → Codify → Delegate → Verify is a loop for improving the developer-agent-codebase relationship over time

### 13.10 Wide context, narrow authority

This section MUST visually demonstrate:

- one requested task
- the surrounding dependencies an agent may inspect
- the narrow set of paths the agent is authorized to modify

Required phrases:

> **Give agents context. Do not give them free rein.**

> **A dependency is not automatically a deliverable.**

The visual should work without animation and must not rely on color alone to show editable versus inspect-only areas.

### 13.11 Why going back feels impossible

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
- developers can spend more effort on judgment, system design, independent test oracles, and verification systems

### 13.12 Capability without free rein

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

The solution presented by the site is not less capable agents. It is stronger context, boundaries, transparency, independent evidence, risk-triggered auditing, and developer control.

### 13.13 Applied in practice

The homepage MUST identify `moldea` as the real project work through which Agentic Coding was shaped.

The section must:

- keep the brand name lowercase
- use the approved light- and dark-theme Moldea lockups without modifying their artwork
- describe `moldea` with its own canonical category and promise: "Git-native project context for coding agents" and "Keep project knowledge in Git. Bring relevant context into coding-agent work."
- present the project as a whole: project knowledge in Git under `/moldea/`, the open-source Agent Skill, the open-source packages, and the hosted platform
- describe the hosted platform as in development until it is publicly available
- link only to live destinations: the project on GitHub, `https://skill.moldea.ai/`, and `https://packages.moldea.ai/`; link `https://moldea.ai/` once it is no longer under construction
- remain an understated evidence section rather than a product advertisement

The section MUST NOT claim customer adoption, general availability, hosted-platform availability, or outcomes that the current Moldea project does not establish. It must not invent a Moldea tagline or use an under-construction product screenshot as evidence.

### 13.14 Practical resources

The homepage MUST conclude the main narrative with four clear destinations:

- **Start with the foundation** → `/start`
- **Run the workflow with skills** → `/workflow`
- **Refine existing instructions** → `/refine`
- **Handle the harder moments** → `/cookbook`

After these destinations, a jg-skills bridge section mirrors the `AGENTS.md` section on the jg-skills site. It shows `AGENTS.md` setting the standards and jg-skills running the workflow, each beside its project's mark, with a "Browse the skills" card linking to the jg-skills skill catalog and an "Install them" card holding the copyable install command and the verification note.

### 13.15 Author section and footer

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
- free of tool-specific workflows, including any mention of jg-skills
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

#### Independent judgment and candor

- assess claims and proposals on evidence, including the developer's and the agent's own earlier work
- state plainly what is wrong, why it matters, and the smallest correction
- separate verified facts from assumptions and correct the agent's own mistakes directly
- avoid flattery, unsupported reassurance, and invented objections
- never treat candor as authority to expand scope or skip approvals

#### Skill dispatch, task intent, and authority

Before ordinary task-intent classification, determine whether the developer invoked a skill. A skill mention inside a question, example, quotation, explanation, or planning discussion does not invoke it.

When a skill is invoked:

- follow that skill's workflow instead of reclassifying it as an ordinary request
- respect its write limits, authorization boundaries, stopping conditions, and output contract
- apply the rest of the foundation to the work the skill performs
- do not ask for confirmation before actions the skill already authorizes

Loading an implicit skill is not an invocation, and naming one only loads its guidance; the accompanying text is classified as an ordinary request.

Only when no skill is invoked, determine whether the developer requested:

- an explanation or investigation
- a plan
- a breakdown
- a review
- an implementation

Do not modify files for a planning-only or review-only request.

Describing a change, reporting a defect, stating a preference, asking for an opinion, or requesting a plan does not by itself authorize implementation; a clear action request does. Intent is reassessed with each message, and doubt about authorization is never resolved by assuming it.

Treat the stated objective, constraints, exclusions, and acceptance criteria as the task contract.

Material ambiguities are asked about together in one numbered message, each with a recommended answer. Safe assumptions settle details of authorized work, never whether work is authorized.

Implementation authority does not automatically authorize commits, pushes, pull requests, deployments, releases, migrations in production or shared environments, external messages, or account and service changes. A delivery the developer explicitly requested, such as opening a pull request, also covers the commits and pushes it requires.

#### Decision precedence and instruction scope

The foundation MUST establish this conflict order:

1. explicit developer requirements and acceptance criteria, subject to safety and production correctness
2. safety, security, privacy, data integrity, and production correctness
3. existing behavior, public contracts, and established architecture
4. repository tooling, tests, configuration, and framework conventions
5. general foundation guidance and the implicit skills that match the task
6. official documentation matching the installed version

For the factual behavior of an installed dependency, its official documentation for the installed major version overrides examples and general preferences. A rule that looks outdated for the installed version is reported with the current guidance.

The foundation MUST require agents to follow every instruction file applicable to the affected path and respect more specific scoped instructions within their scope.

#### Implicit skills

- implicit skills hold stack-specific standards, not workflows, and the foundation names no specific skill
- read every installed implicit skill that matches the task before planning, writing, or reviewing, and say so when a matching skill is unavailable
- loading or naming one never authorizes an action
- they rank with the foundation's general guidance, which wins except where a skill states an exception for its own area

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

#### Planning records

- change planning files only through an invoked planning or execution skill, except a named milestone's status when the developer asks for that milestone without invoking a skill
- retain planning files as the task record after completion
- treat another task's planning files as history, not evidence of current behavior

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
- fit new code to the closest stable local pattern, and use the form the installed version documents as current in code the task adds or rewrites, without migrating existing code
- add dependencies only when justified, with the existing package manager, lockfile, and version-pinning convention

#### Proportional rigor and tradeoffs

- match complexity and safeguards to the consequences of failure, not the size of the change
- give critical behavior the strongest practical design and lower-risk behavior the simplest correct one
- when viable approaches differ materially and the task does not decide between them, present at most three options with their guarantees, limitations, costs, and failure consequences, recommend one, and ask the developer to choose

#### Error handling

- fail loudly when an assumption is violated, using the project's established error types
- let errors propagate unless they can be recovered from or translated at a boundary
- keep the original error as the cause when translating, without exposing internal details across that boundary, and never swallow errors
- keep documented error contracts synchronized with the implementation
- never emit guessed or placeholder contracts; report a contract that cannot be established as a blocker

#### Validation and schemas

- validate external and untrusted data at its boundary with the repository's schema or validation library
- derive types from schemas and reuse existing ones
- choose strictness for compatibility, and model nullable and optional values explicitly

#### Resource efficiency

- consider how cost grows with input size, frequency, and concurrency
- make operations efficient before caching them, and cache only with a defined source of truth, keys, isolation, freshness, invalidation, and size limits
- bound or paginate growth-capable collections at the source, preferring keyset or seek-backed cursor pagination for new database-backed lists

#### Coherent execution

- execute approved work in small logical steps
- keep each authorized milestone internally coherent
- keep required tests, documentation, contracts, migrations, and verification with the behavior they support
- do not leave deliberate dead-end scaffolding or temporary duplication
- when a root cause is a repeatable pattern, search for other instances, fix those within scope, and report the rest
- stop after the authorized milestone

#### Tests and self-correction

- follow the repository's testing guidelines on every topic they cover, then its established test conventions, with the foundation's testing rules as defaults
- hold three floors regardless: never weaken a test to get a passing run, report material risk a repository rule leaves untested, and keep tests out of production artifacts
- add or update tests when they provide meaningful confidence
- choose the test level that exercises the real correctness property, combining levels when they protect distinct risks
- mock only external boundaries that cannot be exercised safely, and never drop essential tests for CI cost
- keep tests deterministic: wait for conditions, control sources of nondeterminism, repeat new or changed end-to-end and integration tests with retries off, keep timeouts narrow, and report tests that passed only on retry
- cover realistic failure modes and boundaries
- identify when implementation and tests may share the same mistaken assumption
- use independent oracles and adversarial verification techniques when risk justifies them
- do not treat a passing test suite as proof
- investigate whether production code or the expectation is wrong when tests fail
- start a bug fix with a test that fails for the reported reason when automated coverage adds confidence, and take expected values from an independent source
- never weaken tests solely to make them pass
- report checks that could not be run

#### Review

- require the agent to review the complete scoped change, through an invoked review skill or the developer's review request
- report findings first
- inspect correctness, regressions, architecture, scope, reuse, tests, security, maintainability, and documentation
- assemble reproducible evidence tied to the exact reviewed state
- distinguish verified facts from uncertainty
- do not declare readiness while a material concern is unresolved
- require a developer to challenge the evidence and retain the acceptance decision
- make direct developer code inspection proportional to risk, novelty, and evidence quality

#### Publication authority

- implementation, plan approval, milestone completion, review readiness, and acceptance do not by themselves authorize publication
- publication requires an explicit developer request or an invoked skill whose workflow includes it, such as an autonomous run that reviews and publishes each milestone within its stop conditions
- an explicitly requested delivery, such as opening a pull request, also covers the commits and pushes it requires
- staging, signing, and destination follow repository policy or the invoked skill
- task-scoped review and push belong to the skills that perform them; the foundation does not restate them

#### Transparency

- state important assumptions
- identify blockers
- identify material deviations before applying them
- do not claim a check passed unless it actually ran successfully
- disclose unverified behavior
- preserve user-authored work
- do not reset, clean, stash, revert, or overwrite unrelated changes to simplify the worktree
- format only the files the task changed, and report pre-existing drift
- do not hide failures
- finish with a completion summary unless an invoked skill defines its own report

#### Task cleanup

- stop the processes the task started unless the developer asks to keep them or an established workflow requires them, and delete its scratch output once it is no longer needed
- preserve deliverables, planning records, failure evidence, and anything the task did not create
- never clean up broadly, and report anything that could not be cleaned up

#### Safety

- do not expose secrets, and keep tokens, credentials, cookies, payment data, and full provider payloads out of logs
- avoid destructive actions without explicit authorization
- validate security-sensitive and data-integrity-sensitive paths, never trusting client-provided ids, roles, or balances, and allowlisting dynamic SQL identifiers
- do not make high-blast-radius contract, dependency, schema, configuration, CI/CD, deployment, infrastructure, event or queue name, cache key, or durable storage format changes casually

#### Portable paths and scripts

- assume Windows, macOS, and Linux unless the repository documents otherwise
- follow the project's naming conventions, use portable names where they leave the choice open, and build paths with the runtime's path APIs
- treat user-supplied paths as untrusted and keep resolved paths inside their intended root
- prefer scripts in the project's main language, start processes without a shell, and never interpolate untrusted values into shell commands

#### Conditional production safeguards

The foundation MUST include concise, conditional safeguards for:

- frontend accessibility, keyboard operation, responsive behavior, theme support, and reduced motion
- established migration workflows, compatibility, rollback, and explicit authority before executing migrations in production or shared environments
- external-response validation, bounded timeouts or cancellation, safe and bounded retries, and idempotent side effects
- at-least-once delivery for queues, jobs, and webhooks, with authenticated and validated payloads before any side effect
- server-side authorization, integer minor units or decimal types for money and credits, and transactional integrity

#### Documentation and instruction governance

The foundation MUST require directly affected state-bearing documentation to remain synchronized without authorizing unrelated rewrites.

Coding-instruction files MUST be treated as governance files. Agents must not create, edit, rename, move, delete, or reformat them unless the developer explicitly requests an instruction change.

### 14.4 Workflows come from skills

The public foundation MUST NOT define agent commands or skill workflows. Executable workflows for planning, plan challenge, breakdown, execution, debugging, review, and publication live in skills that the repository installs. The foundation states only how an invoked skill, or an implicit skill that matches the task, relates to the rest of the instructions.

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
- a pairing block, outside the copyable file, that recommends jg-skills with the install command, the explicit-only verification note, and a link to `/workflow`

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
- the agents or tools that consume each file and whether its filename, location, and syntax are supported
- whether each file is authoritative, mirrored, generated, protected, or managed elsewhere
- relevant project documentation
- architecture and tooling evidence needed to understand existing rules
- the hierarchy and precedence of instruction files
- installed agent skills that define workflows, so proposals neither duplicate nor contradict them in instruction files
- installed implicit skills and their triggers, so proposals neither restate nor contradict their standards
- the repository's testing guidelines and its test-runner retry and timeout configuration
- the schema or validation library the repository uses at its boundaries
- the current worktree state and pre-existing instruction-file changes

Keep inspection proportional, respect repository context exclusions and sensitive-data boundaries, and do not edit files, install dependencies, create artifacts, or change Git state.

Produce an instruction map covering each relevant source's path, consumer, scope, precedence, owner, editability, conflicts, duplication, and synchronization requirements.

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

Ask the questions that materially affect the result together in one numbered message, each with a recommended answer.

Do not use a generic questionnaire when repository evidence already answers the issue.

Questions may address:

- target instruction scope and consuming agents or tools
- planning approval
- breakdown and milestone boundaries
- execution authorization
- scope expansion
- adjacent cleanup
- test expectations
- review expectations
- preservation of exact sections
- canonical ownership, generated or mirrored files, and precedence
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

- assign a stable proposal ID
- identify the affected file, section, scope, and consuming agents or tools
- describe the current behavior and supporting repository evidence
- provide exact proposed rule text or a reviewable patch preview
- explain why it is needed and what failure it prevents
- preserve existing terminology and structure where practical
- distinguish a missing value from a stylistic preference
- explain scope, precedence, compatibility, source-ownership, and synchronization effects
- identify rules replaced, consolidated, or made unnecessary
- define concrete acceptance criteria
- avoid replacing project-specific rules with generic text

Removal or consolidation requires especially clear justification.

Every meaningful affected rule must have an explicit final disposition. The agent should recommend no change when the current instructions already express the relevant values clearly and safely.

#### Stage 4: Obtain explicit approval

The agent must stop before editing and request approval for the proposed change set.

The following do not count as approval:

- the initial prompt
- permission to inspect
- answers to questions
- discussion of options

The developer may approve, reject, or amend individual proposal IDs. Approval must identify the complete proposal or the specific IDs authorized for editing. Approved IDs and explicit amendments become the editing contract; unresolved or unapproved items remain out of scope.

#### Stage 5: Apply minimal edits

After approval:

- modify only approved instruction files
- apply only approved proposal IDs and amendments
- preserve pre-existing worktree changes and distinguish them from refinement edits
- preserve unrelated guidance
- preserve project-specific constraints
- avoid broad rewrites
- avoid cosmetic restructuring
- deduplicate only where meaning is preserved
- do not modify production code
- do not modify tests, documentation, or configuration outside the approved instruction scope
- do not remove a meaningful rule merely to shorten the file
- do not add conflicting parallel rules
- edit authoritative sources instead of generated or mirrored output
- follow required handoff workflows for protected or externally managed instruction files
- do not reset, clean, stash, revert, or overwrite unrelated work

Approval to edit instructions does not authorize commits, pushes, pull requests, deployments, releases, production or shared-environment changes, external messages, dependency installation, or account and service actions.

#### Stage 6: Audit the result

After editing, compare the result with the original files, pre-existing worktree state, instruction map, and approved proposal. Verify supported filenames, locations, scopes, syntax, ownership, synchronization, precedence, skill and command invocation semantics, and every original rule's final disposition. Run existing instruction-specific checks when available without installing new tooling.

Review representative failure scenarios when applicable, including answer-only and planning-only requests, a defect report or opinion request without an action request, partial proposal approval, scoped conflicts, a conflict with an implicit skill, a rule outdated for the installed version, a timing-dependent test, pre-existing changes, high-blast-radius changes, and unauthorized external actions.

Report:

- what was preserved
- what was strengthened
- what was added
- what was reconciled
- what was removed or consolidated
- why each material change was made
- any remaining conflict or ambiguity
- whether instruction precedence remains clear
- whether any important original rule was accidentally lost
- checks and scenarios evaluated, results, and checks not run
- pre-existing changes preserved
- the exact files changed

### 15.4 Values the prompt must inject

The prompt MUST ask the coding agent to assess and, when appropriate, introduce or strengthen these values:

1. quality, clarity, maintainability, and correctness over cleverness
2. task intent and explicit authorization boundaries, including explicit authority for external actions, granted per action or per explicitly invoked autonomous run, or as a necessary step of an explicitly requested delivery
3. decision precedence and correct scoped-instruction handling
4. codebase-first reasoning
5. collaborative planning
6. plan approval before substantial implementation
7. optional plan breakdown into coherent milestones
8. milestone-scoped execution
9. wide context and narrow authority
10. reuse of existing architecture and ownership
11. avoidance of adjacent refactors and duplicate implementations
12. meaningful tests and self-correction, with independent evidence where tests and implementation may share an assumption
13. test-failure triage instead of blindly changing expectations
14. adversarial review
15. preservation of developer-authored and pre-existing work
16. security, privacy, authorization, data integrity, and destructive-action safety
17. deliberate handling of high-blast-radius changes and conditional production safeguards
18. state-bearing documentation synchronization, with coding-instruction files changed only on explicit request
19. unambiguous skill or command invocation, permissions, approval boundaries, and stopping conditions
20. transparent assumptions, blockers, skipped checks, and uncertainty
21. progressive delegation after the project has established clear rails
22. developer accountability for final engineering decisions
23. planning records retained as the task record
24. bug fixes that start from a test failing for the reported reason
25. a search for other instances of a repeatable root cause
26. evidence over agreement: candor without flattery, invented objections, or scope expansion
27. rigor proportional to the consequences of failure, with materially different approaches presented as a few options for the developer to choose
28. error handling that fails loudly, preserves causes, never swallows errors, and keeps documented error contracts current
29. resource efficiency, with growth-capable collections bounded at the source and caching only where reuse justifies it
30. cleanup of task-owned processes and temporary files without broad or destructive cleanup
31. portable paths and scripts, with untrusted paths kept inside their intended root
32. implicit skills that hold stack-specific standards, read when they match the task, ranked with the general instructions, and never treated as authorization
33. the questions that decide the work asked together in one numbered message, each with a recommended answer
34. the repository's testing guidelines first, with floors that forbid weakening tests to pass, require reporting material risk left untested, and keep tests out of production artifacts
35. deterministic tests that wait for conditions, control time and other sources of nondeterminism, and are repeated before they count as done
36. external and untrusted data validated at its boundary with the repository's schema library, with types derived from schemas
37. official documentation for the installed version as the authority on factual behavior, current API forms in new code, and outdated rules reported instead of silently followed
38. no guessed or placeholder contracts, with a blocker reported instead
39. at-least-once delivery, authenticated payloads, and bounded retries for queues, jobs, and webhooks
40. sensitive values kept out of logs, exact representations for money, and no trust in client-provided ids, roles, or balances
41. dependencies added only when justified, with the existing package manager and lockfile
42. formatting limited to the files a task changed

The prompt must not blindly impose:

- a language
- a framework
- a folder structure
- a package manager
- exact test filenames
- a specific schema library, test runner, or retry and timeout values
- specific named skills
- a database convention
- a particular model or vendor
- specific dependencies, personal packages, or third-party libraries
- an instruction hierarchy unsupported by the repository's actual agents or tools
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

## 16. Cookbook and workflow page

### 16.1 Purpose

The cookbook covers recurring engineering situations that no skill runs: orienting in an unfamiliar codebase, controlling scope, synchronizing documentation, recovering from drift, deepening a test strategy, and refining instructions. The workflow itself lives on `/workflow` (section 16.6).

It should teach techniques rather than present prompts as magic incantations. It MUST help developers identify their current situation, provide the right context, steer weak first responses, and preserve the decisions that remain theirs.

Recipes lead with the example. Each recipe MUST contain:

- a one-to-three-sentence situation
- a short example transcript
- a copyable prompt
- what a good result looks like, including the developer's review responsibility
- follow-up moves for shallow or drifting results
- warning signs

Each recipe body stays at or below about 440 words, two minutes at the site's reading-time rate.

### 16.2 Recipes

The cookbook MUST include these six recipes in intentional editorial order:

1. **Orient to a codebase**
   - build a verified working map of an unfamiliar repository before planning changes

2. **Control scope**
   - give the agent enough context to understand dependencies without authorizing adjacent work

3. **Synchronize documentation**
   - keep durable documentation aligned with implemented behavior and authoritative ownership

4. **Recover from agent drift**
   - stop a wandering implementation, preserve useful work, and restore a bounded contract

5. **Deepen a test strategy**
   - design correctness evidence around realistic defects and meaningful integration boundaries

6. **Refine coding instructions**
   - use the canonical refinement process to strengthen an existing `AGENTS.md`

A later version MAY add recipes only when they cover a distinct, recurring situation that neither the cookbook nor a skill already handles.

### 16.3 Recipe content model

Cookbook entries MUST be managed through an Astro build-time content collection with a strict schema.

Recommended fields:

- `title`
- `description`
- `situation`
- `example`, a short transcript validated by the same schema as the site's other transcripts
- `prompt`
- `slug`
- `order`
- `category`
- `relatedSlugs`
- `publishedAt`
- `updatedAt`
- `featured`
- `draft`

The body contains the recipe sections. Reading time is derived at build time.

Draft entries must not be rendered into public routes or the production sitemap.

### 16.4 Cookbook index

The `/cookbook` page MUST:

- explain that recipes cover situations no skill runs
- help developers choose from their current engineering situation, routing situations a skill covers to the matching `/workflow` step
- group recipes into understandable workflow tracks
- show all published recipes
- order recipes intentionally rather than by filename
- include descriptions
- expose stable links
- remain useful without JavaScript

Client-side filtering is optional and should not be added unless the recipe count justifies it.

### 16.5 Recipe page

Every recipe page MUST include:

- title
- concise description
- situation
- example transcript
- copyable prompt
- what good looks like
- follow-up moves
- warning signs
- related recipes
- publication and update dates
- canonical metadata

Prompt copy controls must copy the exact canonical prompt text shown in the recipe.

### 16.6 Workflow page

The `/workflow` page shows the workflow running through jg skills. It MUST include:

- an install command block with a copy control, the explicit-only verification note, one line on invocation syntax, and one line stating that skills defer engineering standards to the repository's `AGENTS.md`, linking to `/start`
- one section per stage (Plan, Build, Ship) and one step per skill, anchored by the skill name: `jg-brainstorm`, `jg-plan`, `jg-challenge-plan`, `jg-breakdown`, `jg-execute`, `jg-debug`, `jg-pause`, `jg-review`, `jg-push`
- for each step: a one-sentence purpose, an "Optional" or "When needed" marker where applicable, what the skill may change, a short example transcript with one artifact, and a link to the skill's page on jg-skills
- a supervised/autonomous toggle on `jg-execute` that shows the autonomous cycle (implement, checks, review, fix, push) and its stop conditions
- a `jg-debug` example with a failing test, the fix, and the passing test
- the Correct, Continue, or Complete outcomes on `jg-review`, noting `jg-review <target-branch>` for branches
- a closing section that lists `jg-command`, `jg-feedback`, and `jg-session` and points to the cookbook for situations no skill covers

The examples continue one fictional feature across all steps. What each skill may change MUST match the "What it may change" column of the jg-skills README. The step catalog lives in the site configuration and MUST be updated when jg-skills adds, removes, or renames a skill, or changes what one may change.

## 17. Interaction requirements

### 17.1 General

Interactive elements must enhance already available static content.

No essential explanation may be hidden behind JavaScript-only rendering.

### 17.2 Copy controls

Reusable copy controls are required for:

- `AGENTS.md`
- the refinement prompt
- cookbook prompts
- the jg-skills install command

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
- static session transcripts and file artifacts that show real workflow output
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
├── coding-agent-planning/
│   └── <unix-seconds>_<descriptive-slug>/
│       ├── plan.md
│       └── milestones.md
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
│   │   ├── workflow.astro
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

Each directory under `coding-agent-planning/` owns one authoritative `plan.md` and, only when useful, one `milestones.md`. This repository keeps those planning artifacts under version control; they are workflow records rather than Astro source inputs or generated website content.

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
- the jg-skills URL, install command, and explicit-only verification note
- the workflow step catalog

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
- a root `llms.txt` generated from canonical project content, linking the workflow page and the jg-skills index
- generated sitemap
- descriptive favicon
- a default 1200×630 Open Graph image
- a custom 404 page

Cookbook recipes should use article-style structured metadata when it can be added accurately.

Article pages should expose a truthful publication date and, when different, last-meaningful-update date in visible semantic markup, Open Graph article metadata, and structured data. Content metadata validation must reject an update date earlier than its publication date.

The homepage should use website-level structured metadata.

The cookbook index should use collection-page structured metadata. Public HTML pages should identify `/llms.txt` with `rel="describedby"`, and pages with canonical raw resources should expose them with `rel="alternate"` and an accurate media type.

Every public content page below the homepage should expose a visible, navigable breadcrumb trail and matching `BreadcrumbList` structured data derived from the same route hierarchy.

Every internal link with a fragment MUST point to an existing `id`.

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
- durable public foundation and refinement contracts, including skill-first dispatch, planning records, review evidence, and publication authority

Do not test Astro, Tailwind, or browser behavior already guaranteed by those tools unless project integration adds meaningful risk.

### 26.3 End-to-end coverage

Use browser-level tests for important user-visible flows:

- homepage loads and exposes all required major sections
- homepage exposes the engineering-contract layers, Challenge stage, Correct/Continue/Complete outcomes, and the supervised/autonomous publication toggle
- direct navigation to every public route succeeds
- a cookbook deep link works when loaded directly
- the workflow page exposes nine skill steps with their jg-skills links and a working install-command copy control
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
- every internal fragment link matches an existing anchor
- the foundation version, skill dispatch, review terminology, and publication authority remain synchronized

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
- the engineering-contract visual
- the skill pipeline, its three Review outcomes, and the supervised/autonomous toggle
- the workflow page and its transcripts at 320px
- the project-maturity loop
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
- how the workflow step catalog stays synchronized with jg-skills
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
- preserve skill-before-intent dispatch
- preserve adversarial plan challenge before approval
- preserve developer accountability
- preserve agent-operated Evidence and developer-governed acceptance
- preserve risk-triggered access to code inspection without making it universally mandatory
- preserve the need for independent evidence that can challenge correlated implementation and test assumptions
- preserve the warning against unrestricted authority
- preserve wide context and narrow authority
- preserve Correct, Continue, or Complete as explicit Review outcomes
- preserve publication as an explicit grant, per change or per autonomous run, never implied by implementation authority
- preserve the role of self-correcting mechanisms
- keep Agentic Coding stack- and vendor-agnostic
- keep skill descriptions consistent with the jg-skills README, state the explicit-only verification limit wherever installation is recommended, and link to jg-skills for full instructions
- keep the public foundation neutral with respect to implementation technologies
- keep the refinement prompt preservation-first and interactive
- do not turn `/refine` into a builder
- keep copied, raw, downloaded, and rendered resources synchronized
- update versions intentionally
- update the workflow page when a jg skill is added, removed, renamed, or changes what it may change

## 31. Definition of done

The first production release is complete only when all of the following are true.

### 31.1 Product

- the homepage communicates the complete Agentic Coding thesis
- collaborative planning is clearly represented
- paving the way before delegation is clearly represented
- the engineering-contract visual, per-change sequence, and project-maturity loop are present
- wide context and narrow authority are clearly represented
- the quality-over-speed thesis is present
- the caution against free rein is present
- the Moldea field-application section is factual and understated
- Evidence is consistently shown as agent-operated and developer-governed
- developer accountability remains explicit while code inspection is proportional and risk-triggered
- the maturity path from direct code review to evidence-led acceptance is present
- the workflow page documents all nine skill steps, including `jg-challenge-plan` as read-only and advisory and both `jg-review` forms with their distinct scopes
- publication is shown as an explicit grant, per change or per autonomous run, with the limits of autonomous runs
- the ready-to-use foundation is complete
- the refinement prompt is complete
- the six cookbook recipes are published
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
4. adopt a practical Plan → Challenge → Breakdown when useful → Execute → Review workflow through explicit agent skills
5. distinguish Correct, Continue, or Complete from explicitly granted publication, per change or per run
6. begin immediately with a ready-to-use `AGENTS.md`
7. safely refine existing instructions through their own coding agent
8. learn practical techniques from a concise cookbook

The experience should leave the visitor with one clear conclusion:

> **Agentic Coding is not about giving AI more control. It is about giving developers dramatically more leverage without surrendering engineering discipline.**
