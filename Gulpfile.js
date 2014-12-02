var gulp = require('gulp');
var ts = require('gulp-typescript');
var del = require('del');
var karma = require('gulp-karma');
var inject = require('gulp-inject');

gulp.task('ts', function() {
    var tsResult = gulp.src('src/*.ts')
        .pipe(ts({
            noImplicitAny: true
        }));
    return tsResult.js.pipe(gulp.dest('build'));
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
gulp.task('js', ['ts'], function() {
    var sources = gulp.src(['build/*.js', '!build/*_test.js']);
    return sources.pipe(gulp.dest('release'));
});
gulp.task('index', ['js'], function() {
    var target = gulp.src('src/index.html');
    var js = gulp.src('*.js', {
        cwd: 'release'
    });
    return target.pipe(inject(js, {
            //relative: true
        }))
        .pipe(gulp.dest('release'));
});

gulp.task('clean', function() {
    del(['build', 'release']);
});

gulp.task('watch', function() {
    gulp.watch('src/*.ts', ['build']);
});
gulp.task('build', ['ts', 'js', 'index']);
gulp.task('default', ['build', 'karma']);