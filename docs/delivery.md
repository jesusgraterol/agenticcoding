# Task delivery

Default stop: `development`.

| Stop          | Operator |
| ------------- | -------- |
| `development` | agent    |
| `main`        | agent    |

## development

Run the [required checks](testing.md), review the scoped changes, create signed and signed-off commits and push without force. Integrate the reviewed source into development and confirm from fresh local/remote Git reads that the remote branch contains its exact HEAD. Preserve unrelated work and planning records.

## main

Only when this stop is selected, promote checked development work to main, push and verify the [GitHub Pages workflow](development.md#deployment) and the actual deployed artifact. A push alone does not establish deployment. Domain/DNS ownership remains outside this repository.

Remove only task-owned temporary resources, clean inactive integrated worktrees, merged task branches and claims after checking their exact heads. Preserve unique or dirty work and report any remaining delivery action.
