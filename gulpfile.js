/**
 * TODO : need to add :
 * - task copy fonts dist
 * - task : images minify for dist
 * - task : app html template to template cache 
 */

var gulp       = require('gulp');

var del        = require('del');
var concat     = require('gulp-concat');
var nodemon    = require('gulp-nodemon');
var livereload = require('gulp-livereload');
var sass       = require('gulp-sass');
var minifyCss  = require('gulp-minify-css');
var jshint     = require('gulp-jshint');
var uglify     = require('gulp-uglify');
var imagemin   = require('gulp-imagemin');
var sourcemaps = require('gulp-sourcemaps');
var notify     = require('gulp-notify');
var wrap       = require("gulp-wrap");

//gulp config (dirs and files)
var config    = require('./src/gulp/config/config');


gulp.task('dist:clean', function (cb) {
  del([config.baseDirs.dist + '**/*'], cb);
});

gulp.task('public:clean', function (cb) {
  del([config.publicDirs.root + '**/*'], cb);
});

gulp.task('dev:concat:vendor:js', function () {
  return gulp.src(config.appfiles.vendor.js)
    .pipe(concat(config.concatFilenames.vendor.js))
    .pipe(gulp.dest(config.baseDirs.app + config.publicDirs.js));
});

gulp.task('dev:concat:vendor:noConcat:js', function () {
  return gulp.src(config.appfiles.vendor.noConcat.js)
    .pipe(gulp.dest(config.baseDirs.app + config.publicDirs.js));
});

gulp.task('dev:concat:vendor:css', function () {
  return gulp.src(config.appfiles.vendor.css)
    .pipe(concat(config.concatFilenames.vendor.css))
    .pipe(gulp.dest(config.baseDirs.app + config.publicDirs.css));
});

gulp.task('dev:concat:app:js', function () {
  return gulp.src(config.appfiles.app.js)
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(concat(config.concatFilenames.app.js))
    .pipe(gulp.dest(config.baseDirs.app + config.publicDirs.js));
});

gulp.task('dev:concat:app:sass', function () {
  return gulp.src(config.appfiles.app.sass)
    .pipe(sourcemaps.init())
    .pipe(sass().on("error", notify.onError(function (error) {
              return "Error: " + error.message;
          })))
    .pipe(concat(config.concatFilenames.app.css))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(config.baseDirs.app + config.publicDirs.css));
});

gulp.task('dev:copy:app:images', function(){
  return gulp.src(config.appfiles.app.images)
    .pipe(gulp.dest(config.baseDirs.app + config.publicDirs.images));
});

gulp.task('dev:copy:app:favico', function(){
  return gulp.src(config.appfiles.app.favico)
    .pipe(gulp.dest(config.baseDirs.app + config.publicDirs.favico));
});

gulp.task('dev:copy:vendor:fonts', function(){
  return gulp.src(config.appfiles.vendor.fonts)
    .pipe(gulp.dest(config.baseDirs.app + config.publicDirs.fonts));
});

/**
 * TODO : need to fix to really ignore dirs and files : 
 * -> here not working
 */
gulp.task('nodemon', function () {
  nodemon({
      script: config.baseDirs.app + config.startupScript,
      verbose: true,
      ext: 'js',
      ignore: [
        config.baseDirs + config.publicDirs.root,
        config.baseDirs + config.srcRootDir + '**/*',
        config.baseDirs + 'node_modules/**/*',
        config.baseDirs + 'bower_components/**/*',
        config.baseDirs.dist + '**/*'  
      ]
    })
    .on('restart', function () {
      console.log('Magic restarted');
    });
});
//restart client on app src files change
gulp.task('livereload', ['dev:concat:app:js', 'dev:concat:app:sass'], function () {
  return gulp.src(config.appfiles.index)
    .pipe(livereload());
});

gulp.task('watch', function () {
  livereload.listen();
  gulp.watch([
      config.appfiles.app.js,
      config.appfiles.app.sass,
      config.baseDirs.app + 'server/views/**/*.ejs',
    ], ['livereload'])
    .on('change', function(event) {
      console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
});

gulp.task('default', [
  'dev:concat:vendor:js', 
  'dev:concat:vendor:noConcat:js',
  'dev:concat:vendor:css', 
  'dev:concat:app:js', 
  'dev:concat:app:sass', 
  'dev:copy:app:images',
  'dev:copy:app:favico',
  'dev:copy:vendor:fonts',
  //'nodemon', 
  'watch'
 ]);
 
 gulp.task('build', [
  'dev:concat:vendor:js', 
  'dev:concat:vendor:noConcat:js',
  'dev:concat:vendor:css', 
  'dev:concat:app:js', 
  'dev:concat:app:sass', 
  'dev:copy:app:images',
  'dev:copy:app:favico',
  'dev:copy:vendor:fonts'
 ]);
  
gulp.task('dist', [
  'dev:concat:vendor:js', 
  'dev:concat:vendor:noConcat:js',
  'dev:concat:vendor:css', 
  'dev:concat:app:js', 
  'dev:concat:app:sass', 
  'dev:copy:app:images',
  'dev:copy:app:favico',
  'dev:copy:vendor:fonts',
  'dist:minify:app:css', 
  'dist:minify:app:js', 
  'dist:copy',
  //'dist:copy:nodemodules'
]);

gulp.task('dist:minify:app:css', function() {
  return gulp.src(config.baseDirs.app + config.publicDirs.css + config.concatFilenames.app.css)
    .pipe(sourcemaps.init())
    .pipe(minifyCss())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(config.baseDirs.app + config.publicDirs.css));
});

gulp.task('dist:minify:app:js', function() {
  return gulp.src(config.baseDirs.app + config.publicDirs.js + config.concatFilenames.app.js)
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(config.baseDirs.app + config.publicDirs.js));
});

gulp.task('dist:copy', function() {
  // server.js - file
  gulp.src(config.baseDirs.app + config.startupScript)
    .pipe(gulp.dest(config.baseDirs.dist));
    
  // package.json - file
  gulp.src(config.baseDirs.app + config.sysDirs.packageJSON)
    .pipe(gulp.dest(config.baseDirs.dist));    

  // README.md - file
  gulp.src(config.baseDirs.app + config.sysDirs.readme)
    .pipe(gulp.dest(config.baseDirs.dist));    

  //server  - js sources
  gulp.src(config.sysDirs.serverJS)
    .pipe(gulp.dest(config.baseDirs.dist + config.sysDirs.serverRootDir));

  //server  - ejs sources
  gulp.src(config.sysDirs.serverEJS)
    .pipe(gulp.dest(config.baseDirs.dist + config.sysDirs.serverRootDir));
     
   //public  - all content 
  gulp.src(config.baseDirs.app + config.publicDirs.root + '**/*')
    .pipe(gulp.dest(config.baseDirs.dist + config.sysDirs.publicRootDir));   
              
});

/**
 * task to copy node module should be no use
 * package JSON should be used on production server
 */
gulp.task('dist:copy:nodemodules', function(){
  //server  - node modules
  gulp.src(config.sysDirs.nodeModules)
    .pipe(gulp.dest(config.baseDirs.dist + config.sysDirs.nodeModulesRootDir));  
});