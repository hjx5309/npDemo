var gulp=require('gulp');
var less=require('gulp-less');
var minifyCSS = require('gulp-minify-css');

//less的编译，压缩
gulp.task('style',function(){
    return gulp.src(['src/styles/*.less','!src/styles/_*.less'])
        .pipe(less())//less的编译
        .pipe(minifyCSS())//css压缩
        .pipe(gulp.dest('dist/Css/'))
        .pipe(reload({stream:true}));;
})
/**************************************/

/****************js合并，混淆*********************/
var concat=require('gulp-concat');
var obfuscate=require('gulp-obfuscate');
gulp.task('js',function(){
    return gulp.src('src/script/*.js')
        .pipe(concat('all.js'))//合并js文件
        .pipe(obfuscate())
        .pipe(gulp.dest('dist/script/'))
        .pipe(reload({stream:true}));;

})
/********************图片复制**********************************/
gulp.task('img', function() {
    // 将你的默认的任务代码放在这
    gulp.src("src/img/*.*")
        .pipe(gulp.dest("dist/img/"))
        .pipe(reload({stream:true}));

});
/****************html压缩******************************/
var htmlmin = require('gulp-htmlmin');
gulp.task('minify', function() {
    return gulp.src('src/*.html')
        .pipe(htmlmin({collapseWhitespace: true}))//将空格去掉
        .pipe(gulp.dest('dist/'))
       .pipe(reload({stream:true}));
});

/**************************************************/
gulp.task('copy', function() {
    // 将你的默认的任务代码放在这
    gulp.src("src/index.html")
        .pipe(gulp.dest("dist/"))
});
gulp.task('dist', function() {
    // 将你的默认的任务代码放在这
    gulp.watch("src/index.html",['copy']);
    gulp.watch("src/styles/*.less",['Comless'])

});

/****************************/
var browserSync=require("browser-sync")
var reload = browserSync.reload;
gulp.task('serve',function(){
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });
    gulp.watch('src/styles/*.less',['style'])
    gulp.watch('src/script/*.js',['js'])
    gulp.watch('src/img/*.img',['img'])
    gulp.watch('src/*.html',['minify'])

})