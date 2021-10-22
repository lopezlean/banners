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
const { join, resolve } = require('path');
const fs = require('fs');
const {
  awaitStream,
  bytesToKB,
  getDirectories,
  getLastGitBranch,
  getLastGitCommitHash,
} = require('./scripts/lib');



const sourceDir = 'html/';
const zipName = 'Morgan_StanleyatWork_Banners';
// Base directory
const outputDir = 'site/';
const imagesSrc = `./html/_collections/**/*.jpg`;
// Pages
const pages = '';


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
   console.log({outputDir});
   console.log({imagesSrc});
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
  '970x250': [80, 40],
  '970x250-exite': [80, 40]
};

const optimizeImages = async () => {
  const bannerPaths = await getDirectories(`${outputDir}${pages}`);
  const defaultSettingsBanners = bannerPaths.filter(
    (x) => !QUALITY_SETTINGS[x]
  );
  console.log({bannerPaths});
  console.log({defaultSettingsBanners});
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
        `Optimizing images for ${banner} ${path} (${['1x', '2x'][index]} @ ${quality}%)`
      );
      try {
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
      } catch(e){
        console.log({e});
      }
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
  gulp.series(resizeImages)
);

const filesizes = async (done) => {
  const buildPagesBase = `${outputDir}${pages}`;
  const bannerPaths = await getDirectories(buildPagesBase);

  const sizes = bannerPaths.map((path) => {
    const basePath = resolve(__dirname, `${buildPagesBase}${path}`);
    const htmlSize = fs.statSync(`${basePath}/index.html`).size;
    const cssSize = fs.statSync(`${basePath}/style.css`).size;
    const largestFontSize = fs.statSync(
      `${basePath}/shared/fonts/MSGloriolaIIStd.woff`
    ).size;

    let largestImageSize = 0;
    try {
      largestImageSize = Math.max(
        fs.statSync(`${basePath}/img@2x.jpg`).size,
        fs.statSync(`${basePath}/img.jpg`).size
      );
    } catch (e) {
      // FIXME: should fail if an image is expected to be found
    }

    return htmlSize + cssSize + largestFontSize + largestImageSize;
  });

  console.log('Worst-case scenario initial payload sizes:');

  bannerPaths.forEach((path, index) => {
    const size = sizes[index];
    const oversize = size > FILESIZE_LIMIT;
    console.log(
      chalk[oversize ? 'red' : 'green']`${path.padEnd(64)} = ${bytesToKB(
        sizes[index]
      )}`
    );
  });

  if (sizes.some((size) => size > FILESIZE_LIMIT)) {
    throw new Error(
      `Some banners are over the ${bytesToKB(FILESIZE_LIMIT)} size limit.`
    );
  }

  done();
};

gulp.task(
  "filesizes",
  gulp.series(filesizes)
);

/**
 * Default task, running just `gulp` will compile the sass,
 * compile the jekyll site, launch BrowserSync & watch files.
 */
gulp.task("default", gulp.parallel("browser-sync", "watch"));
