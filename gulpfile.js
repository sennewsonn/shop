var gulp        	= require('gulp'),
	sync  			= require('browser-sync').create(),
	jade  			= require('gulp-jade'),
	sass  			= require('gulp-sass'),
	imagemin  		= require('gulp-imagemin'),
	useref			= require('gulp-useref'),
	wiredep  		= require('wiredep').stream,
	assets 			= useref.assets(),
	plumber  		= require('gulp-plumber');

var config = {
	jade: {
		directory : "./app/**/*.jade",
		main_file : "./app/index.jade",
		folder : "./app/",
		destination : './develop'
	},
	sass: {
		directory: "./app/styles/**/*.scss",
		destination : './develop/style'
	},
	js: {
		directory: "./app/js/**/*.*",
		destination : './develop/js'
	},
	images: {
		directory : "./app/img/*.*",
		destination : './develop/img'
	},
	sync: {
		directory : "./develop/",
		files : ['./develop/**/*.*']
	}
};

//DEVELOP

gulp.task('sync', function() {
	sync.init({
		server: {
			baseDir: config.sync.directory,
			index: "index.html"
		}
	});
});

gulp.task('jade', function() {
	gulp.src(config.jade.main_file)
		.pipe(plumber())
		.pipe(jade({
			pretty: '\t'
		}))
		.pipe(gulp.dest(config.jade.destination));
});

gulp.task('bower', function () {
	gulp.src(config.jade.main_file)
		.pipe(wiredep({
			directory: 'bower_components'
		}))
		.pipe(gulp.dest(config.jade.folder));
});


gulp.task('sass', function(){
	gulp.src(config.sass.directory)
		.pipe(plumber())
		.pipe(sass())
		.pipe(gulp.dest(config.sass.destination))
});

gulp.task('js', function(){
	gulp.src(config.js.directory)
		.pipe(plumber())
		.pipe(gulp.dest(config.js.destination))
});


gulp.task('images', function() {
	gulp.src(config.images.directory)
		.pipe(plumber())
		.pipe(imagemin({
			progressive: true
		}))
		.pipe(gulp.dest(config.images.destination))
});

gulp.task('watch', function(){
	gulp.watch(config.jade.directory, ['jade']);
	gulp.watch(config.sass.directory, ['sass']);
	gulp.watch(config.js.directory, ['js']);
	gulp.watch(config.images.directory, ['images']);
	gulp.watch(config.sync.files).on('change', sync.reload);
});


// PRODUCTION
gulp.task('prod_templates', function () {
	return gulp.src('develop/*.html')
		.pipe(assets)
		.pipe(assets.restore())
		.pipe(useref())
		.pipe(gulp.dest('production'));
});


gulp.task('default', ['bower',
	                  'jade',
	                  'sass',
	                  'js',
	                  'images',
	                  'sync',
	                  'watch']);