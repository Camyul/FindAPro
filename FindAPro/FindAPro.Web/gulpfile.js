/// <binding BeforeBuild='clean' AfterBuild='default' />
/*
This file is the main entry point for defining Gulp tasks and using Gulp plugins.
Click here to learn more. https://go.microsoft.com/fwlink/?LinkId=518007
*/

const gulp = require('gulp');
const rimraf = require('rimraf');
const concat = require('gulp-concat');
const cssmin = require('gulp-cssmin');
const uglify = require('gulp-uglify');

const paths = {
    webroot: './wwwroot/'
};

paths.vendorsCss = paths.webroot + 'vendors/**/*.css';
paths.vendorsMinCss = paths.webroot + 'vendors/**/*min.css';
paths.vendorsConcatedCssDest = paths.webroot + 'css/concatedCss/concatedVendorsCss.min.css';
paths.vendorsMinCssDest = paths.webroot + 'css/concatedCss/minVendorsCss.min.css';
paths.vendorsFinalMinCssDest = paths.webroot + 'css/finalVendorsCss.min.css';
paths.vendorsTempMinCss = paths.webroot + 'css/**/*min.css';

paths.adminCss = paths.webroot + 'css/adminTheme/**/*.css';
paths.adminMinCssDest = paths.webroot + 'css/concatedCss/minAdminCss.min.css';

paths.vendorsJs = paths.webroot + 'vendors/**/*.js';
paths.vendorsconcatedJsDest = paths.webroot + 'js/concatedJs/concatVendorsJs.min.js';

//Clean vendors minified Css
gulp.task('cleanVendorsCss:css', function (cb) {
    rimraf(paths.vendorsTempMinCss, cb);
});

//Minify vendors css exept *min.css
gulp.task('minVendorsCss:css', function () {
    return gulp.src([paths.vendorsCss, '!' + paths.vendorsMinCss])
        .pipe(concat(paths.vendorsMinCssDest))
        .pipe(cssmin())
        .pipe(gulp.dest('.'));
});

//Minify Admin Theme css exept
gulp.task('minAdminCss:css', function () {
    return gulp.src([paths.adminCss])
        .pipe(concat(paths.adminMinCssDest))
        .pipe(cssmin())
        .pipe(gulp.dest('.'));
});

//Concat vendors minified css, after executed 'minVendorsCss:css' and create finalVendorsCss.min.css
gulp.task('concatVendorsMinCss:css', ['minVendorsCss:css', 'minAdminCss:css'], function () {
    return gulp.src([paths.vendorsMinCssDest, paths.vendorsMinCss, paths.adminMinCssDest])
        .pipe(concat(paths.vendorsFinalMinCssDest))
        .pipe(gulp.dest('.'));
});

//Clean vendors JS
gulp.task('cleanVendorsJs:js', function (cb) {
    rimraf(paths.vendorsconcatedJsDest, cb);
});

//Concat vendors JS
gulp.task('concatVendors:js', function () {

    return gulp.src([paths.vendorsJs])
        .pipe(concat(paths.vendorsconcatedJsDest))
        .pipe(gulp.dest('.'));
});

//Run all clean tasks
gulp.task('clean', ['cleanVendorsJs:js', 'cleanVendorsCss:css']);

// gulp.task("clean", ["clean:js", "cleanTheme:js", "cleanTemp:js", "cleanAdminTheme:js",
//                     "cleanWebTemp:css", "cleanAdminTemp:css", "cleanModalTemp:css", "cleanSiteCss:css", "cleanAdminSiteCss:css"]);


gulp.task('default', ['concatVendors:js', 'concatVendorsMinCss:css']);