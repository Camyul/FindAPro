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
const run = require('gulp-run');

const paths = {
    webroot: './wwwroot/'
};

paths.css = paths.webroot + 'css/**/*.css';
paths.adminCss = paths.webroot + 'css/adminTheme/**/*.css';

paths.vendorsJs = paths.webroot + 'vendors/**/*.js';
paths.vendorsconcatedJsDest = paths.webroot + 'js/concatedJs/concatVendorsJs.min.js';

//Clean vendors JS
gulp.task('cleanVendorsJs:js', function (cb) {
    rimraf(paths.vendorsconcatedJsDest, cb);

    //rimraf(paths.themeConcatJsDest, cb);
});

//Concat vendors JS
gulp.task('concatVendors:js', function () {

    return gulp.src([paths.vendorsJs])
        .pipe(concat(paths.vendorsconcatedJsDest))
        .pipe(gulp.dest('.'));
});

gulp.task('clean', ['cleanVendorsJs:js']);

// gulp.task("clean", ["clean:js", "cleanTheme:js", "cleanTemp:js", "cleanAdminTheme:js",
//                     "cleanWebTemp:css", "cleanAdminTemp:css", "cleanModalTemp:css", "cleanSiteCss:css", "cleanAdminSiteCss:css"]);


gulp.task('default', ['clean', 'concatVendors:js']);