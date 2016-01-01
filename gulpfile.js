var gulp = require('gulp'),
    connect = require('gulp-connect'),
    bower = require('gulp-bower'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    clean = require('gulp-clean');
    
// include plug-ins
var jshint = require('gulp-jshint');

gulp.task('webserver', function () {
    connect.server({
        //port: 80,
        //host: 'gulp.dev',
        //livereload: true
    });
});
gulp.task('default',['webserver']);
//gulp.task('default', ['bower','clean','copy']);

gulp.task('bower', function () {
    return bower()
        .pipe(gulp.dest('build/lib/'))
});

var bases = {
    app: 'src/**',
    dist :'build/src',
    maindest : 'build/'
};

gulp.task('clean', function () {
    return gulp.src(bases.dist)
        .pipe(clean());
});

gulp.task('copy',['clean'] ,function () {
    // Copy html
    gulp.src(bases.app)
        .pipe(gulp.dest(bases.dist));

    // // Copy lib scripts, maintaining the original directory structure
    gulp.src(['app.js','index.html'])
        .pipe(gulp.dest(bases.maindest));


    // // Copy styles
    // gulp.src(paths.styles, { cwd: bases.app })
    //     .pipe(gulp.dest(bases.dist + 'styles'));

});

/////////////////////////////////////////////////////////////////////////////////////

// var clean = require('gulp-clean');
// var jshint = require('gulp-jshint');
// var concat = require('gulp-concat');
// var uglify = require('gulp-uglify');
// var imagemin = require('gulp-imagemin');

// var bases = {
//     app: 'src/',
//     dist: 'lib/',
// };

// var paths = {
//     scripts: ['src/**/*.js'],
//     libs: ['lib/**/*.js'],
//     styles: ['styles/**/*.css'],
//     html: ['src/**/*.html'],
//     images: ['src/**/*.png']
// };

// // Delete the dist directory
// gulp.task('clean', function () {
//     return gulp.src(bases.dist)
//         .pipe(clean());
// });

// // Process scripts and concatenate them into one output file
// gulp.task('scripts', ['clean'], function () {
//     gulp.src(paths.scripts, { cwd: bases.app })
//         .pipe(jshint())
//         .pipe(jshint.reporter('default'))
//         .pipe(uglify())
//         .pipe(concat('app.min.js'))
//         .pipe(gulp.dest(bases.dist + 'scripts/'));
// });

// // Imagemin images and ouput them in dist
// gulp.task('imagemin', ['clean'], function () {
//     gulp.src(paths.images, { cwd: bases.app })
//         .pipe(imagemin())
//         .pipe(gulp.dest(bases.dist + 'images/'));
// });

// // Copy all other files to dist directly
// gulp.task('copy', ['clean'], function () {
//     // Copy html
//     gulp.src(paths.html, { cwd: bases.app })
//         .pipe(gulp.dest(bases.dist));

//     // Copy styles
//     gulp.src(paths.styles, { cwd: bases.app })
//         .pipe(gulp.dest(bases.dist + 'styles'));

//     // Copy lib scripts, maintaining the original directory structure
//     gulp.src(paths.libs, { cwd: 'app/**' })
//         .pipe(gulp.dest(bases.dist));

//     // Copy extra html5bp files
//     gulp.src(paths.extras, { cwd: bases.app })
//         .pipe(gulp.dest(bases.dist));
// });

// // A development task to run anytime a file changes
// gulp.task('watch', function () {
//     gulp.watch('app/**/*', ['scripts', 'copy']);
// });

// // Define the default task as a sequence of the above tasks
// gulp.task('default', ['clean', 'scripts', 'imagemin', 'copy']);