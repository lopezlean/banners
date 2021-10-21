// Gulpfile.js
const gulp = require("gulp");
const sass = require("gulp-sass")(require("node-sass"));
const browserSync = require("browser-sync");
const sourcemaps = require("gulp-sourcemaps");
const prefix = require("gulp-autoprefixer");
const cp = require("child_process");
var glob = require("glob")
var path = require('path');


const imagesResizer = require('gulp-images-resizer');
const imagemin = require('gulp-imagemin');
const rename = require('gulp-rename');

const {
  awaitStream,
  bytesToKB,
  getDirectories,
  getLastGitBranch,
  getLastGitCommitHash,
} = require('./scripts/lib');



const sourceDir = 'src/';
const zipName = 'Morgan_StanleyatWork_Banners';
// Base directory
const outputDir = 'build/';
const imagesSrc = `./build/**/*.jpg`;


// const uglify = require('gulp-uglify');
const concat = require("gulp-concat");
// const minifyCSS = require('gulp-minify-css');
// Sass Compiler
// sass.compiler = require("node-sass");
// Jekyll Config
var jekyll = process.platform === "win32" ? "jekyll.bat" : 'jekyll';
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
  //process.env.JEKYLL_ENV = 'production';
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
                  outputStyle: 'compressed',
                  onError: browserSync.notify,
                }).on("error", sass.logError)
              ).pipe(gulp.dest("site/" + "/" + dirname));;
              
              gulp.src(["shared/**/*"]).pipe(gulp.dest("site/" + dirname + "/shared"));
          });
    });

    glob("html/_collections/_300x250-exite/*/index.md", {}, function (er, files) {
     
      const clearString = "html/_collections/_";
      files.forEach(file => {
        const dirname = path.dirname(file).replace(clearString,"");
        console.log(`copying shared folder to ${dirname}`);
        gulp
        .src("scss/300x250-exite/style.scss")
        .pipe(sourcemaps.init())
        .pipe(
          prefix(["last 15 versions", "> 1%", "ie 8", "ie 7"], { cascade: true })
        )
        .pipe(
          sass({
            includePaths: ["scss"],
            outputStyle: 'compressed',
            onError: browserSync.notify,
          }).on("error", sass.logError)
        ).pipe(gulp.dest("site/" + "/" + dirname));;
        
        gulp.src(["shared/**/*"]).pipe(gulp.dest("site/" + dirname + "/shared"));
    });
});
glob("html/_collections/_160x600-exite/*/index.md", {}, function (er, files) {
     
  const clearString = "html/_collections/_";
  files.forEach(file => {
    const dirname = path.dirname(file).replace(clearString,"");
    console.log(`copying shared folder to ${dirname}`);
    gulp
    .src("scss/160x600-exite/style.scss")
    .pipe(sourcemaps.init())
    .pipe(
      prefix(["last 15 versions", "> 1%", "ie 8", "ie 7"], { cascade: true })
    )
    .pipe(
      sass({
        includePaths: ["scss"],
        outputStyle: 'compressed',
        onError: browserSync.notify,
      }).on("error", sass.logError)
    ).pipe(gulp.dest("site/" + "/" + dirname));;
    
    gulp.src(["shared/**/*"]).pipe(gulp.dest("site/" + dirname + "/shared"));
});
});

glob("html/_collections/_300x600-exite/*/index.md", {}, function (er, files) {
     
  const clearString = "html/_collections/_";
  files.forEach(file => {
    const dirname = path.dirname(file).replace(clearString,"");
    console.log(`copying shared folder to ${dirname}`);
    gulp
    .src("scss/300x600-exite/style.scss")
    .pipe(sourcemaps.init())
    .pipe(
      prefix(["last 15 versions", "> 1%", "ie 8", "ie 7"], { cascade: true })
    )
    .pipe(
      sass({
        includePaths: ["scss"],
        outputStyle: 'compressed',
        onError: browserSync.notify,
      }).on("error", sass.logError)
    ).pipe(gulp.dest("site/" + "/" + dirname));;
    
    gulp.src(["shared/**/*"]).pipe(gulp.dest("site/" + dirname + "/shared"));
});
});

glob("html/_collections/_970x250-exite/*/index.md", {}, function (er, files) {
     
  const clearString = "html/_collections/_";
  files.forEach(file => {
    const dirname = path.dirname(file).replace(clearString,"");
    console.log(`copying shared folder to ${dirname}`);
    gulp
    .src("scss/970x250-exite/style.scss")
    .pipe(sourcemaps.init())
    .pipe(
      prefix(["last 15 versions", "> 1%", "ie 8", "ie 7"], { cascade: true })
    )
    .pipe(
      sass({
        includePaths: ["scss"],
        outputStyle: 'compressed',
        onError: browserSync.notify,
      }).on("error", sass.logError)
    ).pipe(gulp.dest("site/" + "/" + dirname));;
    
    gulp.src(["shared/**/*"]).pipe(gulp.dest("site/" + dirname + "/shared"));
});
});


glob("html/_collections/_970x250/*/index.md", {}, function (er, files) {
     
  const clearString = "html/_collections/_";
  files.forEach(file => {
    const dirname = path.dirname(file).replace(clearString,"");
    console.log(`copying shared folder to ${dirname}`);
    gulp
    .src("scss/970x250/style.scss")
    .pipe(sourcemaps.init())
    .pipe(
      prefix(["last 15 versions", "> 1%", "ie 8", "ie 7"], { cascade: true })
    )
    .pipe(
      sass({
        includePaths: ["scss"],
        outputStyle: 'compressed',
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
            outputStyle: 'compressed',
            onError: browserSync.notify,
          }).on("error", sass.logError)
        ).pipe(gulp.dest("site/" + "/" + dirname));;
        
        gulp.src(["shared/**/*"]).pipe(gulp.dest("site/" + dirname + "/shared"));
    });
});

glob("html/_collections/_160x600/*/index.md", {}, function (er, files) {
     
  const clearString = "html/_collections/_";
  files.forEach(file => {
    const dirname = path.dirname(file).replace(clearString,"");
    console.log(`copying shared folder to ${dirname}`);
    gulp
    .src("scss/160x600/style.scss")
    .pipe(sourcemaps.init())
    .pipe(
      prefix(["last 15 versions", "> 1%", "ie 8", "ie 7"], { cascade: true })
    )
    .pipe(
      sass({
        includePaths: ["scss"],
        outputStyle: 'compressed',
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
          outputStyle: 'compressed',
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







/******************************************
 * Copy and Resize Images (JPG)
 ******************************************/

 const copyAndResizeImages = () => {
  return Promise.all(
    [
      { scale: '50%', suffix: '' },
      { scale: '100%', suffix: '@2x' },
    ].map(({ scale, suffix }) =>
      awaitStream(
        gulp.src(imagesSrc)
          .pipe(
            rename((path) =>
              Object.assign({}, path, { basename: path.basename + suffix })
            )
          )
          .pipe(
            imagesResizer({
              format: 'jpg',
              width: scale,
              quality: 100,
            })
          )
          .pipe(gulp.dest(outputDir))
      )
    )
  );
};

/******************************************
 * Optimize/Compress Images (JPG)
 ******************************************/

// default jpeg compression quality settings [1x resolution, 2x resolution]
const DEFAULT_QUALITIES = [85, 65];

// compression quality settings specific to certain banners
const QUALITY_SETTINGS = {
  'CT~BAN_CS~970x250_YR~20_CV~Morgan_StanleyatWork_Wings': [80, 40],
};

const optimizeImages = async () => {
  const bannerPaths = await getDirectories(`${outputDir}${pages}`);
  const defaultSettingsBanners = bannerPaths.filter(
    (x) => !QUALITY_SETTINGS[x]
  );

  const settings = [
    ...defaultSettingsBanners.map((key) => [key, DEFAULT_QUALITIES]),
    ...Object.entries(QUALITY_SETTINGS),
  ];

  for (const [banner, qualities] of settings) {
    const paths = [
      [`${outputDir}${pages}${banner}/*.jpg`, '!**/*@2x.jpg'],
      [`${outputDir}${pages}${banner}/*@2x.jpg`],
    ];

    for (const index in paths) {
      const path = paths[index];
      const quality = qualities[index];

      console.log(
        `Optimizing images for ${banner} (${['1x', '2x'][index]} @ ${quality}%)`
      );

      await awaitStream(
        gulp.src(path)
          .pipe(
            imagemin([
              imagemin.mozjpeg({
                progressive: true,
                quality,
              }),
            ])
          )
          .pipe(gulp.dest(`${outputDir}${pages}${banner}/`))
      );
    }
  }
};


function createBuildDirectory(){
  return gulp.src(['site/**/*']).pipe(gulp.dest('build/'));
}

function resizeImages(cb){
  copyAndResizeImages();
  optimizeImages();
  cb();
}

gulp.task(
  "build-project",
  gulp.series(createBuildDirectory,resizeImages)
);

/**
 * Default task, running just `gulp` will compile the sass,
 * compile the jekyll site, launch BrowserSync & watch files.
 */
gulp.task("default", gulp.parallel("browser-sync", "watch"));
