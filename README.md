# nevenspooner.com

Personal portfolio site, built with plain HTML, CSS and a little vanilla
JavaScript. No framework, no build step. Project and writing content lives in
JSON so it's easy to add to.

## Structure

```
index.html          Home, intro, about, work, writing, contact
project.html        Project write-up template (reads ?p=<slug>)
post.html           Field-note template (reads ?post=<slug>)
data/projects.json  All projects
data/posts.json     All field notes / blog posts
styles.css          All styling
main.js             Loads the JSON and renders the lists + detail pages
favicon.svg         Site icon
assets/             Images (add your own photo here)
```

## Adding a project

Append one object to `data/projects.json`. It shows up on the home page and gets
its own page at `project.html?p=<slug>` automatically. Format:

```json
{
  "slug": "my-project",
  "number": "05",
  "title": "My Project",
  "tag": "LIVE",
  "cardCta": "Live · write-up",
  "blurb": "One-line summary shown on the home page.",
  "stack": "Service A · Service B · Service C",
  "tagline": "A longer sentence shown at the top of the project page.",
  "repo": "https://github.com/nsepvo/my-project",
  "demo": "https://example.com",
  "overview": "A paragraph introducing the project.",
  "services": [{ "name": "Service A", "role": "What it does here." }],
  "flow": [{ "heading": "How it works", "steps": ["Step one.", "Step two."] }],
  "decisions": [{ "title": "A choice", "body": "Why I made it." }],
  "learnings": [{ "title": "What I learned", "body": "The detail." }],
  "next": ["An idea for next time"]
}
```

Leave `demo` as `""` if there's no live demo, and the button is hidden.

## Adding a field note

Append one object to `data/posts.json`:

```json
{
  "slug": "my-note",
  "kicker": "ON SOMETHING",
  "from": "MY PROJECT",
  "projectSlug": "my-project",
  "title": "The headline",
  "teaser": "One line shown on the home page.",
  "lead": "The opening paragraph.",
  "body": ["A paragraph.", "Another paragraph."],
  "takeaway": "The one-sentence lesson."
}
```

## Running locally

Because the pages load JSON with `fetch`, open the site through a local server
(opening the file directly with `file://` will block the fetch):

```bash
python3 -m http.server
# then visit http://localhost:8000
```

## Deploying with GitHub Pages

1. Push these files to the repo.
2. In the repo: **Settings → Pages → Build and deployment**.
3. Source: **Deploy from a branch**, branch `main`, folder `/ (root)`.
4. Add your `nevenspooner.com` domain under **Custom domain**.

GitHub Pages serves over HTTPS, so the JSON loads fine once deployed.

## Adding a photo

Drop a photo at `assets/neven-spooner.jpg` and replace the placeholder in the
About section of `index.html`:

```html
<div class="photo"><img src="assets/neven-spooner.jpg" alt="Neven Spooner"></div>
```
