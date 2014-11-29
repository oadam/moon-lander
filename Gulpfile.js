var gulp = require('gulp');
var ts = require('gulp-typescript');
var del = require('del');
var karma = require('gulp-karma');

gulp.task('ts', function() {
    var tsResult = gulp.src('src/*.ts')
        .pipe(ts({}));
    return tsResult.js.pipe(gulp.dest('build/js'));
});
gulp.task('karma', ['ts'], function() {
    return gulp.src('build/*.js').pipe(karma({
            configFile: 'karma.conf.js',
            action: 'run'
        }))
        .on('error', function(err) {
            throw err;
        });
});
gulp.task('clean', function() {
    del(['build', 'release']);
});

gulp.task('watch', function() {
    gulp.watch('src/*.ts', ['ts']);
});
gulp.task('default', ['karma']);
