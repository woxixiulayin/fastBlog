var gulp = require("gulp");
var ts = require("gulp-typescript");
var tsProject = ts.createProject("./tsconfig.json");
const spawn = require('child_process').spawn;
const ts_node = require('ts-node'); 

gulp.task('trans-server-ts', function () {
    var tsResult = gulp.src("src/**/*.ts")
        .pipe(tsProject())

    return tsResult.js
        .pipe(gulp.dest('./dist'))
})


gulp.task('dev-server', function () {
    ts_node.parse('./src/server.ts')
})

// const watchServerFile = function () {
//     var serverWatcher = gulp.watch([
//         './src/**/*.ts',
//         './tsconfig.json',
//         './config.js',
//     ], ['trans-server-ts']);

//     serverWatcher.on('change', function () {
//         console.log('run task trans-server-ts')
//     })
// }

const watchForServe = function () {
    var watcher = gulp.watch([
        './dist/**/*js'
    ], ['dev-server'])
}

// these tasks will be run once at begin
const defaultTasks = [ 'dev-server']

const watchers = [watchForServe]

gulp.task('default', defaultTasks, function () {
    watchers.forEach(function (watcher) {
        watcher()
    })
    // 将你的默认的任务代码放在这
});