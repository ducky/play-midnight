(function(){
	'use strict';

	var gulp = require('gulp'),
		Merge = require('streamqueue'),
		argv = require('yargs').argv,
		$ = require('gulp-load-plugins')({
			rename: {
				'gulp-sass': 'sass',
				'gulp-minify-css': 'minifycss'
			},
			lazy: false
		});

	/* Combine Sass / Libraries */
	gulp.task('styles', function() {
		var style = gulp.src('src/scss/*.scss');

		return style
			.pipe($.sass({ outputStyle: 'compressed', errLogToConsole: true }))
			.pipe($.autoprefixer({ browsers: ['last 2 version'] }))
			.pipe($.if(argv.prod, $.minifycss()))
			.pipe(gulp.dest('dist/css'))
			.pipe($.notify({ message: 'Styles Task Completed' }));
	});

	/* Main Script / Libraries */
	gulp.task('scripts-main', function() {
		var notify = gulp.src('src/js/play-midnight-notify.js'),
				utils = gulp.src('src/js/play-midnight-utils.js'),
				script = gulp.src('src/js/play-midnight.js'),
				merged;

		merged = new Merge({ objectMode: true });
		merged.queue(utils);
		merged.queue(notify);
		merged.queue(script);

		return merged.done()
			.pipe($.jshint())
			.pipe($.jshint.reporter('default'))
			.pipe($.concat('play-midnight.js'))
			.pipe($.if(argv.prod, $.uglify()))
			.pipe(gulp.dest('dist/js'))
			.pipe($.notify({ message: 'Main Scripts Task Completed' }));
	});

	/* Background Script */
	gulp.task('scripts-bg', function() {
		var script = gulp.src('src/js/background.js');

		return script
			.pipe($.jshint())
			.pipe($.jshint.reporter('default'))
			.pipe($.if(argv.prod, $.uglify()))
			.pipe(gulp.dest('dist/js'))
			.pipe($.notify({ message: 'Background Scripts Task Completed' }));
	});

	/* Images Script */
	gulp.task('images', function() {
		var images = gulp.src('src/images/**/*');

		return images
			.pipe(gulp.dest('dist/images'))
			.pipe($.notify({ message: 'Images Task Completed' }));
	});

	/* HTML Script */
	gulp.task('html', function() {
		var html = gulp.src('src/**/*.html');

		return html
			.pipe(gulp.dest('dist'))
			.pipe($.notify({ message: 'HTML Task Completed' }));
	});

	/* Watch File Changes */
	gulp.task('watch', function() {
		gulp.watch('src/scss/**/*.scss', ['styles']);
		gulp.watch('src/js/**/play-midnight*.js', ['scripts-main']);
		gulp.watch('src/js/**/background.js', ['scripts-bg']);
		gulp.watch('src/images/**/*', ['images']);
		gulp.watch('src/**/*.html', ['html']);
	});

	/* Default Task */
	gulp.task('default', function() {
		gulp.start('styles', 'scripts-main', 'scripts-bg', 'images', 'html');
	});
}());
