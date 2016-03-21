'use strict'

// imports

const path = require('path')

const gulp = require('gulp')
const $ = require('gulp-load-plugins')()

const browserSync = require('browser-sync').create()
const runSequence = require('run-sequence')
const webpack = require('webpack')
const webpackStream = require('webpack-stream')
const del = require('del')

// local variables

let production = false

// tasks

gulp.task('default', ['dev'])

gulp.task('dev', () => {
  runSequence(
    ['clear'],
    ['styles', 'templates'],
    ['server', 'scripts+watch']
    // webpack-stream bug, until solved scripts+watch needs to be run last
    // see: https://github.com/shama/webpack-stream/issues/79
  )

  runSequence(['test', 'test:watch', 'styles:watch', 'templates:watch'])
})

gulp.task('dist', () => {
  production = true

  runSequence(['clear'], ['scripts'], ['styles'], ['templates'], ['server'])
  runSequence(['test'])
})

gulp.task('clear', () => del('./dist'))
gulp.task('server', () => server('./dist'))

gulp.task('scripts', () => scripts('./app/scripts/app.js', './dist/scripts/', false))
gulp.task('scripts+watch', () => scripts('./app/scripts/app.js', './dist/scripts/', true))

gulp.task('styles', () => styles('./app/styles/styles.less', './dist/styles'))
gulp.task('styles:watch', () => gulp.watch('./app/styles/**', ['styles']))

gulp.task('templates', () => templates('./app/index.html', './dist'))
gulp.task('templates:watch', () => gulp.watch('./app/**/*.html', ['templates']))

gulp.task('test', () => { test('./test/**/*.js') }) // no return, temporary fix, until https://github.com/sindresorhus/gulp-ava/issues/8 is resolved
gulp.task('test:watch', () => gulp.watch(['./test/**/*.js', './app/scripts/**/*.js'], ['test']))

// task functions

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
  const filter = $.filter('*.js', {restore: true})

  return gulp.src(from)
    .pipe($.plumber())
    .pipe(webpackStream({
      watch: watch,
      devtool: 'source-map',
      output: { filename: path.parse(from).base },
      module: {
        loaders: [{
          test: /\.js$/,
          exclude: /(node_modules|dist|test)/,
          loader: 'babel',
          query: {
            presets: ['es2015', 'stage-2'],
            cacheDirectory: true
          }
        }]
      },
      plugins: production ? [
        new webpack.optimize.UglifyJsPlugin({
          sourceMap: true,
          mangle: true,
          minimize: true
        }),
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': production ? '"production"' : '"development"'
        })
      ] : []
    }, webpack))
    .pipe($.if(production, filter))
    .pipe($.if(production, $.rev()))
    .pipe($.if(production, filter.restore))
    .pipe(gulp.dest(to))
    .pipe($.if(production, $.rev.manifest('./dist/rev-manifest.json', {base: './dist', merge: true})))
    .pipe($.if(production, gulp.dest('./dist')))
    .pipe(browserSync.stream())
}

const styles = (from, to) => {
  return gulp.src(from)
    .pipe($.sourcemaps.init())
    .pipe($.less())
    .on('error', handleError)
    .pipe($.autoprefixer({browsers: ['last 2 versions', 'Firefox ESR', 'ie >= 9']}))
    .pipe($.if(production, $.cleanCss()))
    .pipe($.if(production, $.rev()))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest(to))
    .pipe($.if(production, $.rev.manifest('./dist/rev-manifest.json', {base: './dist', merge: true})))
    .pipe($.if(production, gulp.dest('./dist')))
    .pipe(browserSync.stream({match: '**/*.css'}))
}

const templates = (from, to) => {
  const manifest = production ? require('./dist/rev-manifest.json') : ''

  return gulp.src(from)
    .pipe($.changed(to))
    .pipe($.if(production, $.revManifestReplace({
      base: '.',
      manifest: manifest
    })))
    .pipe($.if(production, $.htmlmin({
      removeComments: true,
      collapseWhitespace: true
    })))
    .pipe(gulp.dest(to))
    .pipe(browserSync.stream())
}

const test = (files) => {
  return gulp.src(files)
    .pipe($.ava())
    .on('error', handleError) // temporary fix, until https://github.com/sindresorhus/gulp-ava/issues/8 is resolved
}

// helper functions

function handleError (err) {
  $.util.log($.util.colors.red(`Error: ${ err.message }`))
  // keeps gulp from hanging when error happens
  this.emit('end')
}
