import gulp from "gulp";
import babel from "gulp-babel";
import plumber from "gulp-plumber";

import pug from "gulp-pug";

import postcss from "gulp-postcss";
import stylelint from "gulp-stylelint";
import prettier from "gulp-prettier";

import { deleteSync } from "del";

import { init as server, reload } from "browser-sync";

const PATHS = {
  html: {
    src: "src/pages/**/*.pug",
    dest: "public",
  },
  css: {
    src: "src/css/style.css",
    dest: "public/css",
  },
  js: {
    src: "src/js/**/*.js",
    dest: "public/js",
  },
};

export const html = () => {
  return gulp
    .src([PATHS.html.src])
    .pipe(plumber())
    .pipe(pug({ pretty: true }))
    .pipe(gulp.dest(PATHS.html.dest))
    .pipe(reload({ stream: true }));
};

export const css = () => {
  return gulp
    .src([PATHS.css.src])
    .pipe(plumber())
    .pipe(postcss())
    .pipe(
      stylelint({
        reporters: [
          {
            formatter: "string",
            console: true,
          },
        ],
      }),
    )
    .pipe(prettier())
    .pipe(gulp.dest(PATHS.css.dest))
    .pipe(reload({ stream: true }));
};

export const js = () => {
  return gulp
    .src([PATHS.js.src])
    .pipe(plumber())
    .pipe(babel({ presets: ["@babel/preset-env"] }))
    .pipe(gulp.dest(PATHS.js.dest))
    .pipe(reload({ stream: true }));
};

export const clean = (done) => {
  const deletedFiles = deleteSync(["./public/**"]);

  console.log(`Files deleted: \n${deletedFiles.join("\n")}`);
  done();
};

export const build = gulp.series(html, css, js);

export const watch = () => {
  gulp.watch("src/pages/**/*.pug", gulp.series("html"));
  gulp.watch("src/css/**/*.css", gulp.series("css"));
  gulp.watch("src/js/**/*.js", gulp.series("js"));
  server({
    server: {
      baseDir: "./public/",
    },
    ghostMode: false,
    open: false,
    online: false,
  });
};

export const dev = gulp.series(build, watch);
export default dev;
