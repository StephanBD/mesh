// const gulp = require("gulp");

const { src, dest, task, watch, series, parallel } = require("gulp"); // series
const autoprefixer = require("autoprefixer");
const sass = require("gulp-sass");
const browserSync = require("browser-sync");

const cssnano = require("cssnano");
const postcss = require("gulp-postcss");
const sourcemaps = require("gulp-sourcemaps");

// const concat = require("gulp-concat");
// const replace = require("gulp-replace");
// const uglify = require("gulp-uglify");

// const { default: GulpPug } = require("gulp-pug");

/**************************************************/
// function css(cb) {
//   src("scss/main.scss")
//     .pipe(
//       sass({
//         includePaths: ["scss"],
//       }).on("error", sass.logError)
//     )
//     .pipe(
//       autoprefixer({
//         browsers: ["last 2 versions"],
//         cascade: false
//       })
//     )
//     .pipe(dest("css"));

//   cb();
// }

// function watch_sass() {
//   watch("scss/*.scss", css);
// }

// task("css", css);
// task("default", css);
// task("watch", watch_sass);

/**************************************************/
// // variables
// const files = {
//   scssPath: "scss/main.scss",
//   jsPath: "app/*.js",
// };
// // // task
// function scssTask() {
//   return src(files.scssPath)
//     .pipe(sourcemaps.init())
//     .pipe(sass())
//     .pipe(postcss([autoprefixer(), cssnano()]))
//     .pipe(sourcemaps.write("."))
//     .pipe(dest("dist"));
// }

// // JS task
// function jsTask() {
//   return src(files.jsPath)
//     .pipe(concat("app.js"))
//     .pipe(uglify())
//     .pipe(dest("dist"));
// }

// // cachebusting task
// const cdString = new Date().getTime();
// function cacheBusting() {
//   return src(["index.html"])
//     .pipe(replace(/cd=\d+/g, "cd=" + cdString))
//     .pipe(dest("."));
// }

// // watch task
// function watchtask() {
//   watch([files.scssPath, files.jsPath], parallel(scssTask, jsTask));
// }

// // default task
// exports.default = series(parallel(scssTask, jsTask), cacheBusting, watchtask);

/**************************************************/
function style() {
  return (
    // where css
    src("scss/main.scss")
      // sass compiler
      .pipe(sourcemaps.init())
      .pipe(sass())
      // where do save
      .pipe(sourcemaps.write("."))
      // .pipe(browserSync.stream())
      .pipe(dest("dist"))
  );
}

function buildFinal() {
  return src("scss/main.scss")
    .pipe(sass())
    .pipe(
      postcss([
        autoprefixer({
          Browserslist: ["last 2 versions"],
          cascade: false,
        }),
        cssnano(),
      ])
    )
    .pipe(dest("dist"));
}

function watching() {
  // browserSync.init({
  //   server: {
  //     baseDir: "./",
  //   },
  // });
  // watch("scss/*.scss", style);
  watch("scss/**/*.scss", style);
  // watch("./*.html").on("change", browserSync.reload);
  // watch("./*.js").on("change",browserSync.reload)
}

exports.buildFinal = buildFinal;
exports.style = style;
exports.watching = watching;
