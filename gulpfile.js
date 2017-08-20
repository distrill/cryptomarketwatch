const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const runSequence = require('run-sequence');
const webpack = require('webpack-stream');
const path = require('path');

const webpackConfig = require('./webpack.config');

gulp.task('dev', () => {
  runSequence('build', 'nodemon', 'watch');
});

gulp.task('build', () => {
  runSequence('webpack');
});

gulp.task('webpack', () => {
  return gulp
    .src(path.join(__dirname, 'src', 'frontend', 'index.js'))
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest('./public'));
});

gulp.task('nodemon', () => {
  nodemon({
    script: './src/server.js',
    ext: 'js',
    env: {
      NODE_ENV: 'development',
    },
  });
});

gulp.task('watch', () => {
  return gulp.watch(['./src/frontend/**/*.js'], ['webpack']);
});
