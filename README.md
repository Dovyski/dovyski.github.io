# dovyski.github.io
The source and content of my personal website/blog.

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
