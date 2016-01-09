'use strict'

const gulp = require('gulp')
const $ = require('gulp-load-plugins')()

const browserSync = require('browser-sync').create()
const runSequence = require('run-sequence')
const rimraf = require('rimraf')

let distTask = false

gulp.task('default', ['dev'])

gulp.task('dev', cb => {
  distTask = false
  runSequence(
    ['test', 'test:watch', 'styles:watch', 'templates:watch', 'scripts:watch']
  )

  runSequence(
    ['clear'],
    ['scripts', 'styles', 'templates', 'server']
    , cb)
})

gulp.task('dist', cb => {
  distTask = true

  runSequence(
    ['test', 'server']
  )

  runSequence(
    ['clear'],
    ['scripts', 'styles'],
    ['templates']
    , cb)
})

gulp.task('clear', (cb) => rimraf('./dist', cb))
gulp.task('server', () => server('./dist'))

gulp.task('scripts', () => scripts('./app/scripts/app.js', './dist/scripts/', false))
gulp.task('scripts:watch', () => scripts('./app/scripts/app.js', './dist/scripts/', true))

gulp.task('templates', () => templates('./app/index.html', './dist'))
gulp.task('templates:watch', () => gulp.watch('./app/index.html', ['templates']))

gulp.task('styles', () => styles('./app/styles/styles.less', './dist/styles'))
gulp.task('styles:watch', () => gulp.watch(['./app/styles/**'], ['styles']))

gulp.task('test', () => {
  gulp.src('./test/**/*.js')
    .pipe($.ava())
    .on('error', handleError)
})

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
      output: { filename: from.split('/').reverse()[0] },
      module: {
        loaders: [{
          test: /\.js$/,
          exclude: /(node_modules|dist|test)/,
          loader: 'babel',
          query: { presets: ['es2015', 'stage-2'] }
        }]
      }
    }))
    .pipe(gulp.dest(to))
    .pipe(browserSync.stream())
}

const styles = (from, to) => {
  return gulp.src(from)
    .pipe($.changed(to, {extension: '.css'}))
    .pipe($.sourcemaps.init())
    .pipe($.less())
    .on('error', handleError)
    .pipe($.autoprefixer({browsers: ['last 2 versions', 'Firefox ESR', 'ie >= 9']}))
    .pipe($.if(distTask, $.minifyCss()))
    .pipe($.if(distTask, $.rev()))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest(to))
    .pipe($.if(distTask, $.rev.manifest('dist/rev-manifest.json', {base: './dist', merge: true})))
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

function handleError (err) {
  $.util.log($.util.colors.red(`Error: ${ err.message }`))
  // keeps gulp from hanging when error happens
  this.emit('end')
}
