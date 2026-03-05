---
description: Policy for committing changes to the repository
---

# Commit Policy

To ensure all changes meet the user's expectations before they are finalized and deployed:

1.  **Stop Before Commit**: After making code changes and verifying them, do NOT automatically commit.
2.  **Request Approval**: Use the `notify_user` tool to present the changes and ask for explicit approval.
3.  **Wait for Acceptance**: Only proceed with `git commit` and `git push` after the user has explicitly stated they approve the changes.
4.  **Confirm Deployment**: Once approved and pushed, notify the user that the changes are being deployed.
