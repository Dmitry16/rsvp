var gulp      	= require('gulp'),
		//sass        = require('gulp-sass'),
		browserSync = require('browser-sync'),
		concat			= require('gulp-concat'),
		minifyCSS   = require('gulp-minify-css'),
		//concatCss		= require('gulp-concat-css'),
		uglify			= require('gulp-uglifyjs'),
		//cssnano			= require('gulp-cssnano'),
		clean 			= require('gulp-clean'),
		rename			= require('gulp-rename'),
		del					= require('del'),
		// imagemin		= require('gulp-imagemin'),
		// pngquant		= require('imagemin-pngquant'),
		// cache				= require('gulp-cache'),
		autoprefixer= require('gulp-autoprefixer')
		// sassdoc 		= require('sassdoc'),
		// converter 	= require('sass-convert'),
		//bourbon			= require('node-bourbon').includePaths,
    //neat 				= require('node-neat').includePaths;

// var paths = {
//     scss: 'app/sass/**/*.scss'
// };

// gulp.task('bourbon', function () {
//     return gulp.src(paths.scss)
//         .pipe(sass({
// 						//includePaths: require('node-bourbon').includePaths,
// 						includePaths: ['styles'].concat(neat),
// 						//style: 'compressed',
// 						//quiet: true
//             //includePaths: ['styles'].concat(neat)
//         }))
//         .pipe(gulp.dest('app/css'));
// });
//
// gulp.task('clean', ['sass'], function() {
//   return gulp.src(['app/production/css', 'app/production/js',
//   	'app/production/images'], {read: false})
//     .pipe(clean());
// });
//
// gulp.task('concat-styles', ['clean'], function() {
//     return gulp.src([
//     	'app/css/foundation.css',
//     	'app/css/normalize.css',
//     	'app/css/main.css'
// 		])
//     	.pipe(concat('main.min.css'))
//         .pipe(minifyCSS({
//             keepBreaks: true
//         }))
//         .pipe(gulp.dest('app/production/css'));
// });
//
// gulp.task('sass', function(){
// 	return	gulp.src('app/sass/main.scss')
// 		.pipe(sass({
// 			includePaths: require('node-bourbon').includePaths,
// 			includePaths: require('node-neat').includePaths,
// 			//includePaths: require('bitters').includePaths
// 		}))
// 		//.pipe(autoprefixer(['last 15 versions', '>1%', 'ie 8', 'ie 7'], { cascade: true }))
// 		.pipe(gulp.dest('app/css'))
// 		.pipe(browserSync.reload({stream: true}));
// });
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

	gulp.watch('*.html', browserSync.reload);
	gulp.watch('**/*.js', browserSync.reload);
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
