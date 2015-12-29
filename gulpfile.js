'use strict';

const gulp = require('gulp');
const $ = require('gulp-load-plugins')();

const browserify = require('browserify');
const babelify = require('babelify');
const watchify = require('watchify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');

const browserSync = require('browser-sync').create();
const runSequence = require('run-sequence');
const rimraf = require('rimraf');

let distTask = false;

gulp.task('default', ['dev']);

gulp.task('dev', cb => {
	distTask = false;
	runSequence(
		['browser-sync', 'test', 'test:watch', 'scripts:watch', 'styles:watch', 'templates:watch']
	);

	runSequence(
		['clear'],
		['scripts', 'styles', 'templates']
	, cb);
});

gulp.task('dist', cb => {
	distTask = true;
	runSequence(
		['clear', 'test'],
		['scripts', 'styles'],
		['templates', 'browser-sync']
	, cb);
});

gulp.task('scripts', () => scripts('./app/scripts/app.js', './dist/scripts/', false));
gulp.task('scripts:watch', () => scripts('./app/scripts/app.js', './dist/scripts/', true));

gulp.task('templates', () => {
	const manifest = distTask ? require('./dist/rev-manifest.json') : '';

	return gulp.src('./app/index.html')
		.pipe($.if(distTask, $.revManifestReplace({
			base: '.',
			manifest: manifest
		})))
		.pipe($.if(distTask, $.htmlmin({
			removeComments: true,
			collapseWhitespace: true
		})))
		.pipe(gulp.dest('./dist'))
		.pipe(browserSync.stream());
});

gulp.task('templates:watch', () => {
	return gulp.watch('./app/index.html', ['templates']);
});

gulp.task('styles', () => {
	return gulp.src('./app/styles/styles.less')
		.pipe($.sourcemaps.init())
		.pipe($.less())
		.on('error', handleError)
		.pipe($.autoprefixer({browsers: ['last 2 versions', 'Firefox ESR', 'ie >= 9']}))
		.pipe($.if(distTask, $.minifyCss()))
		.pipe($.if(distTask, $.rev()))
		.pipe($.sourcemaps.write('.'))
		.pipe(gulp.dest('./dist/styles'))
		.pipe($.if(distTask, $.rev.manifest('dist/rev-manifest.json', {base: './dist', merge: true})))
		.pipe($.if(distTask, gulp.dest('./dist')))
		.pipe(browserSync.stream({match: '**/*.css'}));
});

gulp.task('styles:watch', () => {
	return gulp.watch('./app/styles/**', ['styles']);
});

gulp.task('test', () => {
	gulp.src('./test/**/*.js')
		.pipe($.ava())
		.on('error', handleError);
});

gulp.task('test:watch', () => {
	return gulp.watch(['./test/**/*.js', './app/js/**/*.js'], ['test']);
});

gulp.task('browser-sync', () => {
	browserSync.init({
		server: {
			baseDir: './dist'
		},
		ghostMode: false,
		port: 8080,
		open: false
	});
});

gulp.task('clear', cb => rimraf('./dist', cb));

function scripts(entry, dest, watch) {
	const config = {
		entries: entry,
		debug: true,
		transform: [babelify.configure({presets: ['es2015']})]
	};

	const bundler = watch ? watchify(browserify(config)) : browserify(config);
	let elapsedTime = Date.now();

	function rebundle() {
		const stream = bundler.bundle();
		return stream
			.on('error', handleError)
			.pipe(source(entry))
			.pipe(buffer())
			.pipe($.sourcemaps.init({loadMaps: true}))
			.pipe($.if(distTask, $.uglify()))
			.pipe($.flatten())
			.pipe($.if(distTask, $.rev()))
			.pipe($.sourcemaps.write('.'))
			.pipe(gulp.dest(dest))
			.pipe($.if(distTask, $.rev.manifest('dist/rev-manifest.json', {base: './dist', merge: true})))
			.pipe($.if(distTask, gulp.dest('./dist')))
			.on('end', () => {
				$.util.log(`Rebundle ${ Date.now() - elapsedTime } ms`);
			})
			.pipe(browserSync.stream());
	}

	// listen for an update and run rebundle
	bundler.on('update', () => {
		elapsedTime = Date.now();
		rebundle();
	});

	return watch ? bundler.bundle() : rebundle();
}

function handleError(err) {
	$.util.log($.util.colors.red(`Error: ${ err.message }`));
	// keeps gulp from hanging when error happens
	this.emit('end');
}
