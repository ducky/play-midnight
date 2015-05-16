(function(){
	'use strict';

	var gulp = require('gulp'),
		merge = require('streamqueue'),
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
		var style = gulp.src('scss/*.scss');

		return style
			.pipe($.sass({ outputStyle: 'compressed', errLogToConsole: true }))
			.pipe($.autoprefixer({ browsers: ['last 2 version'] }))
			.pipe($.if(argv.prod, $.minifycss()))
			.pipe(gulp.dest('css'))
			.pipe($.notify({ message: 'Styles Task Completed' }));
	});

	/* Main Script / Libraries */
	gulp.task('scripts-main', function() {
		var libraries = gulp.src('js/libs/*.js'),
			script = gulp.src('js/play-midnight.js');

		return script
			.pipe($.jshint())
			.pipe($.jshint.reporter('default'))
			.pipe(merge({ objectMode: true }, libraries, script))
			.pipe($.concat('play-midnight.min.js'))
			.pipe($.if(argv.prod, $.uglify()))
			.pipe(gulp.dest('js'))
			.pipe($.notify({ message: 'Main Scripts Task Completed' }));
	});

	/* Background Script */
	gulp.task('scripts-bg', function() {
		var script = gulp.src('js/background.js');

		return script
			.pipe($.jshint())
			.pipe($.jshint.reporter('default'))
			.pipe($.concat('background.min.js'))
			.pipe($.if(argv.prod, $.uglify()))
			.pipe(gulp.dest('js'))
			.pipe($.notify({ message: 'Background Scripts Task Completed' }));
	});

	/* Watch File Changes */
	gulp.task('watch', function() {
		gulp.watch('scss/**/*.scss', ['styles']);
		gulp.watch('js/**/play-midnight.js', ['scripts-main']);
		gulp.watch('js/**/background.js', ['scripts-bg']);

		// $.livereload.listen();

		// gulp.watch(['**/*.js', '**/*.scss']).on('change', $.livereload.changed);
	});

	/* Default Task */
	gulp.task('default', function() {
		gulp.start('styles', 'scripts-main', 'scripts-bg');
	});
}());