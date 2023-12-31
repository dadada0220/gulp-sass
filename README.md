# gulp-sass-compiler

GulpでSassをコンパイルするためのファイル一式

## 環境構築

以下コマンドで必要なモジュールをインストール（`node v18.15.0`で動作確認済み）。

```
npm install
```

その後`gulpfile.js`の、コンパイル元などのパスを定義している箇所を、自身の環境に合わせて修正する。

```javascript
const sassFiles = 'path/to/scss/**/*.scss';
const ignoreFiles = '!' + 'path/to/scss/**/_*.scss';
const cssDist = 'path/to/css';
```

- `gulpfile.js`から見た相対パスで記述する。
  - `'../path/to/scss/**/*.scss';`のような、上の階層に対する指定も可能。
- `xxxxx/**/*.拡張子`のように記述すると、特定のディレクトリ内全てのファイルを対象にできる。

## 使い方

```
// ウォッチ（ファイルを監視）
npx gulp watch
or
npm run watch
```

```
// ビルド（単発）
npx gulp
or
npm run build
```

## 機能一覧

- **Sassのコンパイル**
  - 指定したパスにある.scssファイルをCSSにコンパイルする。ただし、ファイル名がアンダースコア(_)で始まるパーシャルファイルは無視される。
- **エラーハンドリング**
  - gulp-plumberとgulp-notifyを使用してエラーハンドリングを行う。エラーが発生した際にプロセスが停止しないようにし、エラーメッセージを通知する。
- **自動プレフィックス追加**
  - gulp-autoprefixerを使用してCSSルールに自動的にベンダープレフィックスを付ける。これにより、各種ブラウザの互換性を向上させることができる。
- **ソースマップの生成**
  - gulp-sourcemapsを使用してソースマップを生成する。これにより、ブラウザのデベロッパーツールで元のSassファイルを直接参照することができる。
- **ファイルの監視**
  - gulp.watchを使用して.scssファイルの変更を監視する。.scssファイルが変更されると、自動的にSassのコンパイルが行われる。
- **デフォルトタスクの定義**
  - gulpコマンドを実行すると、Sassのコンパイルタスク(sass)が実行される。
- **開発タスクの定義**
  - gulp watchコマンドを実行すると、Sassのコンパイルタスクを実行した後にファイルの監視タスク(watch)が実行される。

## watch中のコンパイルが重い時

処理後半の`gulp.watch`をパターン1に変える。

デフォルトの設定だと、全てのSassファイルを保存したらコンパイルされるが、これだと全てのSassファイルがコンパイルされてしまう（触っていないファイルもコンパイルされる）。だから処理が重くなる。

パターン1にすることで、`_`が付いたファイルを保存してもコンパイルはされなくなる代わりに、処理は軽くなる。この場合は`_`が付いていないファイルを保存するとコンパイルされる。

```javascript
gulp.task('watch', function () {
  ・
  ・
  ・
});
```
