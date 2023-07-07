const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');

// パスを定義
const sassFiles = 'path/to/scss/**/*.scss'; // コンパイルするSassファイル
const ignoreFiles = '!' + 'path/to/scss/**/_*.scss'; // コンパイル対象から除外するSassファイル
const cssDist = 'path/to/css'; // コンパイル先

// Sassコンパイルの処理
gulp.task('sass', function () {
  return gulp
    .src([sassFiles, ignoreFiles]) // アンダースコアで始まるSassファイルを無視
    .pipe(plumber({
      errorHandler: notify.onError('Error: <%= error.message %>') // エラー通知
    }))
    .pipe(sourcemaps.init()) // ソースマップの初期化
    .pipe(sass({ outputStyle: 'expanded' })) // Sassのコンパイル
    .pipe(autoprefixer({
      cascade: false // ベンダープレフィックスの自動追加
    }))
    .pipe(sourcemaps.write('.')) // ソースマップの書き込み
    .pipe(gulp.dest(cssDist)); // コンパイル後のCSSを出力する場所
});

// タスクを定義
gulp.task('watch', function () {
  /**
   * パターン1
   * watch中に_*.scssを保存してもコンパイルされない
   * （_が付いていないscssを保存した問のみコンパイルされる）
   */
  // gulp.watch([sassFiles, ignoreFiles], gulp.task('sass'));

  /**
   * パターン2
   * watch中に全てのscssファイルを保存したらコンパイルされる
   * （大規模の場合はパフォーマンスが悪くなる恐れあり）
   */
  gulp.watch(sassFiles, gulp.task('sass'));
});

gulp.task('default', gulp.series('sass')); // npx gulp
gulp.task('watch', gulp.series('sass', 'watch')); // npx gulp watch
