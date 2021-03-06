"use strict";

var browserSync     = require('browser-sync'),
    reload          = browserSync.reload,
    gulp            = require('gulp'),
    swig            = require('gulp-swig'),
    gulp_notify     = require('gulp-notify'),
    notify          = function(msgString) {
                        return gulp_notify({
                            onLast: true,
                            message: msgString
                        });
    },
    prettify        = require('gulp-prettify'),
    sass            = require('gulp-sass'),
    sourcemaps      = require('gulp-sourcemaps'),
    sassOpts        = {
        errLogToConsole: true
    },
    swigOpts        = {
        defaults: {
            cache: false
        },
        data: {
            'page': {}
        }
    };

gulp.task('build-html', function() {
    gulp.src('./src/**/*.html')
        .pipe(notify('HTML built'))
        .pipe(swig(swigOpts))
        .pipe(prettify({
            indent_size: 4
        }))
        .pipe(gulp.dest('./doc/'))
        .on("end", reload);
});

gulp.task('build-default-sass', function() {
    gulp.src('./src/themes/default/scss/default.scss')
        .pipe(sourcemaps.init())
        .pipe(sass(sassOpts))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./assets/css'))
        .pipe(gulp.dest('./doc/assets/css'))
        .pipe(notify('Default SCSS built'))
        .pipe(reload({stream: true}));
});

gulp.task('build-kirkwood-sass', function() {
    gulp.src('./src/themes/kirkwood/scss/kirkwood.scss')
        .pipe(sourcemaps.init())
        .pipe(sass(sassOpts))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./assets/css'))
        .pipe(gulp.dest('./doc/assets/css'))
        .pipe(notify('Kirkwood SCSS built'))
        .pipe(reload({stream: true}));
});

gulp.task('build-info-sass', function() {
    gulp.src('./src/themes/info/scss/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass(sassOpts))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./assets/css'))
        .pipe(gulp.dest('./doc/assets/css'))
        .pipe(notify('Info SCSS built'))
        .pipe(reload({stream: true}));
});

gulp.task('build-geospatial-sass', function() {
    gulp.src('./src/themes/geospatial/scss/geospatial.scss')
        .pipe(sourcemaps.init())
        .pipe(sass(sassOpts))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./assets/css'))
        .pipe(gulp.dest('./doc/assets/css'))
        .pipe(notify('Geospatial SCSS built'))
        .pipe(reload({stream: true}));
});

gulp.task('start', function() {
    browserSync.init({
        server: "./doc",
        open: false
    });
    gulp.watch('./src/**/*.html', ['build-html']);
    gulp.watch('./src/components/**/*.scss', ['build-default-sass', 'build-kirkwood-sass', 'build-info-sass', 'build-geospatial-sass']);
    gulp.watch('./src/themes/default/**/*.scss', ['build-default-sass']);
    gulp.watch('./src/themes/kirkwood/**/*.scss', ['build-default-sass', 'build-kirkwood-sass']);
    gulp.watch('./src/themes/info/**/*.scss', ['build-default-sass', 'build-info-sass']);
    gulp.watch('./src/themes/geospatial/**/*.scss', ['build-default-sass', 'build-geospatial-sass']);
});

gulp.task('default', ['start'], function() {
    gulp.src('./gulpfile.js').pipe(notify('Factory Number One dev environment started. Point your browser to http://localhost:3000'));
});

// Run the first build, or re-build assets after cleaning files
gulp.task('init', ['build-default-sass', 'build-info-sass', 'build-kirkwood-sass', 'build-html'], function() {
    gulp.src('./src/static/**/*.*')
        .pipe(gulp.dest('./assets/'))
        .pipe(gulp.dest('./doc/assets/'));

    gulp.src('./src/themes/kirkwood/img/*.*')
        .pipe(gulp.dest('./assets/kirkwood/img/'))
        .pipe(gulp.dest('./doc/assets/kirkwood/img/'));

    gulp.src('./src/themes/info/img/*.*')
        .pipe(gulp.dest('./assets/info/img/'))
        .pipe(gulp.dest('./doc/assets/info/img/'));

    gulp.src('./src/themes/geospatial/img/*.*')
        .pipe(gulp.dest('./assets/geospatial/img/'))
        .pipe(gulp.dest('./doc/assets/geospatial/img/'));

    gulp.src('./src/logo.svg')
        .pipe(gulp.dest('./doc/'));
});
