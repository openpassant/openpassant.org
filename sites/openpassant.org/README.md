# openpassant.org

Static site for the OpenPassant open-source project. Plain HTML and CSS, one small script, no build step, no third-party requests.

## Preview

From the repository root:

```
cd sites/openpassant.org
python3 -m http.server 8081
```

Then open http://localhost:8081.

## Files

Same layout as passant.io. `assets/css/tokens.css` and `assets/css/base.css` are shared between the two sites: change them in one place and copy to the other, so the sites stay one family.

## Before launch

- [x] Register the GitHub organisation (done; the npm scope is still open). The
      `github.com/openpassant/...` links go live once the toolkit repository is pushed.
- [ ] The Spec, Contributor guide and Code of conduct links point at files that must exist in the pushed toolkit repository: `docs/crypto-spec.md`, `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`.
- [ ] Keep the roadmap table honest. Status classes are `badge--planned`, `badge--progress` and `badge--ok`.
- [ ] Update the hero badge text as milestones land.

## Deploying

The web root is `sites/openpassant.org/` inside this repository (mirroring the
passant.io company repository's layout), so deploy the subfolder, not the repo root:

```
rsync -av --delete sites/openpassant.org/ user@server:/var/www/openpassant.org/
```

Any static host that can target a subdirectory works the same way (Cloudflare Pages
and Netlify: build command none, output directory `sites/openpassant.org`). Note that
GitHub Pages' deploy-from-branch mode only serves the repo root or `/docs`, so using
Pages with this layout needs a small Pages Actions workflow instead.

`openpassant.io` should 301-redirect here; keep the site served from `openpassant.org`.
