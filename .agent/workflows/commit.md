---
description: Commit and push all pending changes to the repository
---

This workflow will stage all changes, create a commit with a descriptive message, and push to the remote repository.

1. Review the current changes to ensure everything is correct.
2. Ask the user for a brief commit message if the context isn't clear.
3. Write an implementation log file as a `.md` document in the `implementation_log` folder summarizing the implemented changes.
// turbo
4. Run the following command to stage and push:
   `git add . && git commit -m "[commit message]" && git push origin main`
