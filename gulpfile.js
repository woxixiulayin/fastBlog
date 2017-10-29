var gulp = require("gulp");
var ts = require("gulp-typescript");
var babel = require('gulp-babel');
var tsProject = ts.createProject("../tsconfig.json");

gulp.task('trans-server-ts', function () {
    var tsResult = gulp.src("src/**/*.ts")
    .pipe(tsProject())

    return tsResult.js
    .pipe(gulp.dest('./dist'))
})


const watchServer = function() {
    var serverWatcher = gulp.watch([
        './src/**/*.ts',
        './tsconfig.json',
        './config.js',
    ],
    ['trans-server-ts']
);

    serverWatcher.on('change', function () {
        console.log('run task trans-server-ts')
    })
}

// these tasks will be run once at begin
const defaultTasks = ['trans-server-ts']
const watchers = [watchServer]

gulp.task('default', defaultTasks, function() {
    watchers.forEach(function(watcher) {
        watcher()
    })
  // 将你的默认的任务代码放在这
});