# dovyski.github.io
The source and content of my personal website/blog.

## Preview locally

### Design versions

The final spaceflight design is published from `master`, the repository's
default branch and GitHub Pages source. The charcoal sidebar and Source Sans 3
design is preserved at the `charcoal-source-sans-checkpoint` tag (`08ec2aa`).
The earlier editorial redesign lives on `design/editorial-refresh`.

The 1960s spaceflight direction is on `design/spaceflight`. Its homepage portrait
was created with the built-in image generation tool using the existing profile
photo as the identity reference; the prompt is saved in
`_design/spaceflight-image-prompt.md`.

The current homepage uses separate space and astronaut layers. The developer
portrait and its prompt are documented in `_design/astronaut-laptop-prompt.md`;
the space-background prompt is in `_design/layered-hero-prompts.md`. Historical
video sources and edit timestamps are recorded in `_design/archival-footage.md`.
Hero motion can be paused and honors reduced-motion and data-saving preferences.

With a clean working tree, preview the charcoal version using
`git switch --detach charcoal-source-sans-checkpoint`. Return to the final site
with `git switch master`, or use `git switch design/editorial-refresh` to view
the earlier editorial experiment. Restart the preview server after switching
versions so the generated pages are rebuilt together.

With Jekyll and `jekyll-paginate` installed, run from the repository root:

```sh
jekyll serve --config _config.yml,_config.preview.yml --drafts --force_polling
```

Open http://localhost:4000/blog/how-i-use-ai-for-development/ to preview the AI development series introduction. Edit `_drafts/how-i-use-ai-for-development.md` and refresh to see changes. Drafts are excluded from normal production builds.

## Deploy outside Github
The website was designed to be served in a custom domain outside Github Pages. For that reason, it will not work under the `github.io` domain. In order to make it work in another web server, you need a special folder structure.

Assuming the `DocumentRoot` of the web server is `/home/fernandobev/fernandobevilacqua.com/site/`, create the file `update.sh` in the parent folder of `DocumentRoot` with the following content:

```
BASE_SITE_FOLDER="/home/fernandobev/fernandobevilacqua.com"
echo 'Fetching last modifications from git repo...'
cd $BASE_SITE_FOLDER/dovyski.github.io.git
git reset HEAD --hard
git pull
cd ..
echo 'Removing Github Pages lock...'
mv $BASE_SITE_FOLDER/dovyski.github.io.git/_layouts/default.nogithub.html $BASE_SITE_FOLDER/dovyski.github.io.git/_layouts/default.html
echo 'Deploying jekyll website...'
jekyll build --source $BASE_SITE_FOLDER/dovyski.github.io.git/ --destination $BASE_SITE_FOLDER/site/
echo 'All good!'
date +%Y-%m-%d:%H:%M:%S
```

Still in the parent folder of `DocumentRoot`, clone the website repository:

```
git clone https://github.com/Dovyski/dovyski.github.io dovyski.github.io.git
```

The files in the _parent_ folder of `DocumentRoot` will be:

* `site`
* `dovyski.github.io.git`
* `update.sh`

Just run `update.sh` and it will fetch the website from the repository and update everything.
