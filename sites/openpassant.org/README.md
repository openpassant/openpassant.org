# openpassant.org

Static site for the OpenPassant open-source project. Plain HTML and CSS, one small script, no build step, no third-party requests.

## Preview

```
cd openpassant.org
python3 -m http.server 8081
```

Then open http://localhost:8081.

## Files

Same layout as passant.io. `assets/css/tokens.css` and `assets/css/base.css` are shared between the two sites: change them in one place and copy to the other, so the sites stay one family.

## Before launch

- [ ] Register the GitHub organisation and npm scope. Every `github.com/openpassant/...` link and the `@openpassant/core` import in the code sample assume names that are not registered yet.
- [ ] The Spec, Contributor guide and Code of conduct links point at files that must exist in the repository: `docs/crypto-spec.md`, `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`.
- [ ] Keep the roadmap table honest. Status classes are `badge--planned`, `badge--progress` and `badge--ok`.
- [ ] Update the hero badge text as milestones land.

## Deploying

Any static host works. GitHub Pages is a natural fit once the organisation exists: push this folder to a repository and enable Pages, then point the domain at it.
