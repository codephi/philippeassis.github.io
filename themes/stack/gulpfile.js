var gulp = require("gulp")
var minify = require("gulp-minify")
var stylus = require("gulp-stylus")
var concat = require("gulp-concat")

gulp.task('js', function() {
    gulp.src([
            './node_modules/bootstrap/dist/js/bootstrap.min.js',
            './node_modules/is-in-viewport/lib/isInViewport.min.js',
            './assets/vendors/parallax-objects/parallax-objects.min.js',
            './assets/vendors/jquery-scrollto/scrollto.min.js',
            './assets/js/main.js'
        ])
        .pipe(concat('main.js'))
        .pipe(minify({
            ext: {
                src: '-debug.js',
                min: '.min.js'
            },
            exclude: ['tasks'],
            ignoreFiles: ['.combo.js', '-min.js']
        }))
        .pipe(gulp.dest('./source/js'))
})

gulp.task('stylus', function buildHTML() {
    gulp.src('./assets/styl/*.styl')
        .pipe(stylus({
            compress: true,
            'include css': true
        }))
        .pipe(gulp.dest('./source/css'))
})

gulp.task('fonts', function buildHTML() {
    gulp.src('./assets/fonts/**/*')
        .pipe(gulp.dest('./source/fonts'))
})

gulp.task('images', function buildHTML() {
    gulp.src(['./assets/img/*', './assets/logos/*'])
        .pipe(gulp.dest('./source/img'))
})

gulp.task('default', ['stylus', 'js', 'images', 'fonts'])
