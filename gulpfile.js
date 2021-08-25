// Gulpfile.js
const gulp = require("gulp");
const sass = require("gulp-sass")(require("node-sass"));
const browserSync = require("browser-sync");
const sourcemaps = require("gulp-sourcemaps");
const prefix = require("gulp-autoprefixer");
const cp = require("child_process");
var glob = require("glob")
var path = require('path');




// const uglify = require('gulp-uglify');
const concat = require("gulp-concat");
// const minifyCSS = require('gulp-minify-css');
// Sass Compiler
// sass.compiler = require("node-sass");
// Jekyll Config
var jekyll = process.platform === "win32" ? "jekyll.bat" : "jekyll";
var messages = {
  jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build',
};

function baseName(str)
{
   var base = new String(str).substring(str.lastIndexOf('/') + 1); 
    if(base.lastIndexOf(".") != -1)       
        base = base.substring(0, base.lastIndexOf("."));
   return base;
}

// Build the Jekyll Site
gulp.task("jekyll-build", function (done) {
  browserSync.notify(messages.jekyllBuild);
  return cp
    .spawn(jekyll, ["build", ["--trace"]], { stdio: "inherit" })
    .on("close", done);
});

// Jekyll Build
gulp.task(
  "jekyll-rebuild",
  gulp.series("jekyll-build", function (done) {
    browserSync.reload();
    done();
  })
);


// Compile Sass
gulp.task(
  "sass",
  gulp.series(function () {
    
  
    
    glob("html/_collections/_300x250/*/index.md", {}, function (er, files) {
     
            const clearString = "html/_collections/_";
            files.forEach(file => {
              const dirname = path.dirname(file).replace(clearString,"");
              console.log(`copying shared folder to ${dirname}`);
              gulp
              .src("scss/300x250/style.scss")
              .pipe(sourcemaps.init())
              .pipe(
                prefix(["last 15 versions", "> 1%", "ie 8", "ie 7"], { cascade: true })
              )
              .pipe(
                sass({
                  includePaths: ["scss"],
                  onError: browserSync.notify,
                }).on("error", sass.logError)
              ).pipe(gulp.dest("site/" + "/" + dirname));;
              
              gulp.src(["shared/**/*"]).pipe(gulp.dest("site/" + dirname + "/shared"));
          });
    });

    glob("html/_collections/_300x600/*/index.md", {}, function (er, files) {
     
      const clearString = "html/_collections/_";
      files.forEach(file => {
        const dirname = path.dirname(file).replace(clearString,"");
        console.log(`copying shared folder to ${dirname}`);
        gulp
        .src("scss/300x600/style.scss")
        .pipe(sourcemaps.init())
        .pipe(
          prefix(["last 15 versions", "> 1%", "ie 8", "ie 7"], { cascade: true })
        )
        .pipe(
          sass({
            includePaths: ["scss"],
            onError: browserSync.notify,
          }).on("error", sass.logError)
        ).pipe(gulp.dest("site/" + "/" + dirname));;
        
        gulp.src(["shared/**/*"]).pipe(gulp.dest("site/" + dirname + "/shared"));
    });
});


        
    return gulp
      .src("scss/main.scss")
      .pipe(sourcemaps.init())
      .pipe(
        sass({
          includePaths: ["scss"],
          onError: browserSync.notify,
        }).on("error", sass.logError)
      )
      .pipe(
        prefix(["last 15 versions", "> 1%", "ie 8", "ie 7"], { cascade: true })
      )
      .pipe(sourcemaps.write())
      .pipe(gulp.dest("site/assets/css"))
      .pipe(browserSync.reload({ stream: true }));
  })
);

//  Wait for jekyll-build, then launch the Server
gulp.task(
  "browser-sync",
  gulp.series("jekyll-build", "sass", function () {
    console.log("Start browser sync");
    return browserSync({
      server: {
        baseDir: "site",
      },
    });
  })
);



/**
 * Watch scss files for changes & recompile
 * Watch html/md files, run jekyll & reload BrowserSync
 */
gulp.task("watch", function () {
  // Watch Style
  gulp.watch("scss/**", gulp.series("sass"));
  // Watch
  gulp.watch(["html/**/*.html"], gulp.series("jekyll-rebuild","sass"));
  gulp.watch(["html/**/*.md"], gulp.series("jekyll-rebuild","sass"));

});

/**
 * Default task, running just `gulp` will compile the sass,
 * compile the jekyll site, launch BrowserSync & watch files.
 */
gulp.task("default", gulp.parallel("browser-sync", "watch"));
