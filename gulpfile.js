'use strict'

const gulp = require('gulp')
const $ = require('gulp-load-plugins')()

const browserSync = require('browser-sync').create()
const runSequence = require('run-sequence')
const webpack = require('webpack')
const rimraf = require('rimraf')

let distTask = false

gulp.task('default', ['dev'])

gulp.task('dev', () => {
  distTask = false

  runSequence(
    ['clear'],
    ['scripts', 'styles', 'templates', 'server'],
    ['styles:watch', 'templates:watch', 'scripts:watch'],
    ['test', 'test:watch'] // TODO: tests are not run
  )
})

gulp.task('dist', () => {
  distTask = true

  runSequence(['clear'], ['scripts'], ['styles'], ['templates'], ['server', 'test'])
})

gulp.task('clear', (cb) => rimraf('./dist', cb))
gulp.task('server', () => server('./dist'))

gulp.task('scripts', () => scripts('./app/scripts/app.js', './dist/scripts/', false))
gulp.task('scripts:watch', () => scripts('./app/scripts/app.js', './dist/scripts/', true))

gulp.task('styles', () => styles('./app/styles/styles.less', './dist/styles'))
gulp.task('styles:watch', () => gulp.watch('./app/styles/**', ['styles']))

gulp.task('templates', () => templates('./app/index.html', './dist'))
gulp.task('templates:watch', () => gulp.watch('./app/**/*.html', ['templates']))

gulp.task('test', () => test('./test/**/*.js'))
gulp.task('test:watch', () => gulp.watch(['./test/**/*.js', './app/scripts/**/*.js'], ['test']))

// functions

const server = (baseDir) => {
  browserSync.init({
    server: {
      baseDir: baseDir
    },
    ghostMode: false,
    port: 8080,
    open: false
  })
}

const scripts = (from, to, watch) => {
  return gulp.src(from)
    .pipe($.webpack({
      // TODO: when watch is true, finish callback is not called, causes problems with runSequence
      watch: watch,
      devtool: 'source-map',
      output: { filename: from.split('/').reverse()[0] }, // TODO: refactor
      module: {
        loaders: [{
          test: /\.js$/,
          exclude: /(node_modules|dist|test)/,
          loader: 'babel',
          query: { presets: ['es2015', 'stage-2'] }
        }]
      },
      plugins: distTask ? [
        new webpack.optimize.UglifyJsPlugin({
          sourceMap: true,
          mangle: true,
          minimize: true
        })
      ] : []
    }, webpack))
    .pipe($.if(distTask, $.rev())) // thanks to this, filenames in sourcemaps do not match
    .pipe(gulp.dest(to))
    .pipe($.if(distTask, $.rev.manifest('./dist/rev-manifest.json', {base: './dist', merge: true})))
    .pipe($.if(distTask, gulp.dest('./dist')))
    .pipe(browserSync.stream())
}

const styles = (from, to) => {
  return gulp.src(from)
    .pipe($.sourcemaps.init())
    .pipe($.less())
    .on('error', handleError)
    .pipe($.autoprefixer({browsers: ['last 2 versions', 'Firefox ESR', 'ie >= 9']}))
    .pipe($.if(distTask, $.minifyCss()))
    .pipe($.if(distTask, $.rev()))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest(to))
    .pipe($.if(distTask, $.rev.manifest('./dist/rev-manifest.json', {base: './dist', merge: true})))
    .pipe($.if(distTask, gulp.dest('./dist')))
    .pipe(browserSync.stream({match: '**/*.css'}))
}

const templates = (from, to) => {
  const manifest = distTask ? require('./dist/rev-manifest.json') : ''

  return gulp.src(from)
    .pipe($.changed(to))
    .pipe($.if(distTask, $.revManifestReplace({
      base: '.',
      manifest: manifest
    })))
    .pipe($.if(distTask, $.htmlmin({
      removeComments: true,
      collapseWhitespace: true
    })))
    .pipe(gulp.dest(to))
    .pipe(browserSync.stream())
}

const test = (files) => {
  return gulp.src(files)
    .pipe($.ava())
    .on('error', handleError)
}

function handleError (err) {
  $.util.log($.util.colors.red(`Error: ${ err.message }`))
  // keeps gulp from hanging when error happens
  this.emit('end')
}
