var gulp      	= require('gulp'),
		//sass        = require('gulp-sass'),
		browserSync = require('browser-sync'),
		concat			= require('gulp-concat'),
		minifyCSS   = require('gulp-minify-css'),
		uglify			= require('gulp-uglifyjs'),
		clean 			= require('gulp-clean'),
		rename			= require('gulp-rename'),
		del					= require('del'),

		autoprefixer= require('gulp-autoprefixer')

gulp.task('clean', function() {
  return gulp.src('dist/', {read: false})
    .pipe(clean());
});

gulp.task('concat_js', ['clean'], function() {
	return gulp.src('js/*.js')
	.pipe(concat('all.js'))
	.pipe(gulp.dest('dist/'))
})

gulp.task('browser-sync', ['concat_js'], function() {

	return browserSync({
		server: {
					baseDir: '.'
				},
		notify: false
	});
});

gulp.task('sass:watch', ['browser-sync'], function(){

	gulp.watch('*.html', ['concat_js', browserSync.reload]);
	gulp.watch('**/*.js', ['concat_js', browserSync.reload]);
});

gulp.task('default', function(){
	gulp.start('sass:watch');
});

// gulp.task('sass-convert', function() {
//  return gulp.src('app/sass/**/theme.scss')
//  	.pipe(converter({
// 		from: 'scss',
// 		to: 'sass',
// 	}))
// 		.pipe(rename('theme.sass'))
// 		.pipe(gulp.dest('app/sass/sass'))
// });
