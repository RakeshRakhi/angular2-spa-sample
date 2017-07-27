var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var typescript = require('gulp-typescript');
 
var Builder = require('systemjs-builder');
var uglify = require('gulp-uglify');
var gulpSequence = require('gulp-sequence')
var pump = require('pump');
// compile ts 
// gulp.task('compile:ts', function() {
//   return gulp.src(['./src/**/*.ts'])
//     .pipe(sourcemaps.init())
//     .pipe(typescript({
//       noEmitOnError: true,
//       target: 'ES5',
//       removeComments: false,
//       experimentalDecorators: true,
//       emitDecoratorMetadata: true,
//       module: 'system',
//       moduleResolution: 'node'
//     }))
//     .pipe(sourcemaps.write('./'))
//     .pipe(gulp.dest('./dist/src'));
// });

gulp.task('copy:html',function(){
    return gulp.src(['src/**/*.html'], {"base": './src/'})
     .pipe(gulp.dest('./dist/src'));
});
gulp.task('copy:css',function(){
    return gulp.src(['src/**/*.css'], {"base": './src/'})
     .pipe(gulp.dest('./dist/src'));
});
gulp.task('copy:js',function(){
    return gulp.src(['src/**/*.js'], {"base": './src/'})
     .pipe(gulp.dest('./dist/src'));
});
// coppy js assets libraries
gulp.task('copy:vendor', function() {
  return gulp.src([
    "node_modules/core-js/client/shim.min.js",
    "node_modules/zone.js/dist/zone.js",
    "node_modules/reflect-metadata/Reflect.js",
    "node_modules/systemjs/dist/system.src.js",
    "systemjs.config.js",
    "./src/lib/js/theme.js",
    "./src/lib/js/jquery.js",
    "./src/lib/js/calendar.js",
    "./src/lib/js/event_def.js",
   
    "./src/lib/js/bootstrap.min.js",
    "./src/lib/js/tabs.js",
    "./src/lib/js/preloader.js",
    "systemjs-text-plugin.js"
  ]).pipe(gulp.dest('./dist/vendor/'));
});
gulp.task('copy',['copy:vendor','copy:html','copy:css','copy:js']);
gulp.task('compress:js', function (cb) {
  pump([
        gulp.src('dist/**/*.js', {"base": './dist/'}),
        uglify(),
        gulp.dest('dist')
    ],
    cb
  );
});
gulp.task('compress', [ 'compress:js']);


// bundle angular app
var builder = new Builder('./','systemjs.config.js')


gulp.task('bundle:app', function(){
    return builder.bundle('./src/student/student.routerModule.js', './dist/src/student/main.js');
// return builder.bundle('./src/app/main.js', './dist/src/app/main.js');
});
gulp.task('sequence', function(){
  gulpSequence('bundle:app', 'copy', 'compress');
})
gulp.task('default', gulpSequence('copy','compress'));