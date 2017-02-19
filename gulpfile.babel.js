import gulp from 'gulp';
import sourcemaps from 'gulp-sourcemaps';
import autoprefixer from 'gulp-autoprefixer';
import sass from 'gulp-sass';

import browserify from 'browserify';
import source from 'vinyl-source-stream';

const dirs = {
    src: 'src',
    dest: 'dist'
};

const conf = {
    sass: {
        src: `${dirs.src}/scss/app.scss`,
        dest: `${dirs.dest}/css`
    },
    js: {
        src: `${dirs.src}/js/index.js`,
        dest: `${dirs.dest}/js/app.js`
    }
};

gulp.task('js', () => {
    return (
        browserify({
            entries: conf.js.src,
            extensions: ['js'],
            debug: true
        })
        .transform('babelify', {
            presets: ['es2015']
        })
        .bundle()
        .on('error', function(err) {
            console.log(`--> Error bundling: ${err}`);
            this.emit('end');
        })
        .pipe(source(conf.js.dest))
        .pipe(gulp.dest('.'))
    );
});

gulp.task('sass', () => {
    return (
        gulp.src(conf.sass.src)
            .pipe(sourcemaps.init())
            .pipe(sass.sync().on('error', sass.logError))
            .pipe(autoprefixer())
            .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest(conf.sass.dest))
    );
});

gulp.task('watch', ['bundle'], () => {
    gulp.watch(`${dirs.src}/js/*.js`, ['js']);
    gulp.watch(`${dirs.src}/scss/**/*.scss`, ['sass']);
});

gulp.task('bundle', ['js', 'sass']);

gulp.task('default', ['watch']);


















