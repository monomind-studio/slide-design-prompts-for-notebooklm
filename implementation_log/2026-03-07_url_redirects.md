# Implementation Plan: URL Redirects and Main Page

## 1. Make the Main Page the Root `index.html`
- Moved the contents of `pages/NotebookLM Slide Prompts by MonoMind.html` to the root `index.html`.
- Updated the relative asset paths inside the new `index.html`.
- Updated the iframe sources inside the new `index.html` to point to the `pages/` directory.

## 2. Update the Target Domain in Metadata
- Replaced instances of `https://sdp.monomind.one` in the new `index.html` metadata blocks with `https://slide-prompts.monomind.one`.
- Updated `build.js` so metadata templates point to the new domain.
- Regenerated `pages/generator.html`.

## 3. Configure the Domain Redirects
- Created a `_redirects` file in the root of the project with the following Cloudflare Pages redirect rule:
  ```
  https://sdp.monomind.one/* https://slide-prompts.monomind.one/:splat 301
  ```

## 4. Test and Deploy
- Made `pages/NotebookLM Slide Prompts by MonoMind.html` a simple redirect back to `/` so existing links redirect smoothly in addition to the domain level redirect.
- Saved this implementation log.
- Committing the changes.
