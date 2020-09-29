// const gulp = require("gulp");
const { src, dest, watch, series } = require("gulp");

const autoprefixer = require("autoprefixer");
const sass = require("gulp-sass");
var browserSync = require("browser-sync").create();

const cssnano = require("cssnano");
const postcss = require("gulp-postcss");
const sourcemaps = require("gulp-sourcemaps");

const pug = require("gulp-pug");
//====================================================//

sass.compiler = require("node-sass");
//-------------------development----------------------------------//
function style() {
  return (
    // where scss is
    src("scss/main.scss")
      // sass compiler
      .pipe(sourcemaps.init())
      .pipe(sass())
      .pipe(sourcemaps.write("."))
      // .pipe(browserSync.stream())
      .pipe(dest("dist/css"))
  );
}

//-------------------production----------------------------------//
var processors = [
  autoprefixer({
    Browserslist: ["last 2 versions"],
    cascade: false,
  }),
  cssnano,
];

function buildFinal() {
  return src("scss/main.scss")
    .pipe(sass())
    .pipe(postcss(processors))
    .pipe(dest("dist/css"));
}

//-------------------pug----------------------------------//
function html() {
  return src("pug/*.pug").pipe(pug()).pipe(dest("./dist"));
}

//-------------------watch----------------------------------//
function watching() {
  // browserSync.init({
  //   server: {
  //     baseDir: "./",
  //   },
  // });
  // watch("scss/*.scss", style);
  // watch("scss/**/*.scss", style);
  // watch("./*.html").on("change", browserSync.reload);
  // watch("./*.js").on("change",browserSync.reload)
  browserSync.init({
    notify: false,
    open: false,
    server: "./dist",
  });
  watch(["scss/**/*.scss", "pug/**/*.pug"], series([html, style])).on(
    "change",
    browserSync.reload
  );
}

//-------------------watch----------------------------------//
function watchscss() {
  watch("scss/**/*.scss", style);
}

//-------------------exports----------------------------------//
exports.buildFinal = buildFinal;
exports.watching = watching;
exports.watchscss = watchscss;
exports.style = style;
exports.html = html;
