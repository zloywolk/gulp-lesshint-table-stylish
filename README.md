﻿# gulp-lesshint-table-stylish

A table stylish for gulp-lesshint plugin

## Usage

```js
const lesshint = require('gulp-lesshint');
const stylish = require('gulp-lesshint-table-stylish');

gulp.task('default', () =>
    gulp.src(['file.js'])
        .pipe(lesshint())
        .pipe(lesshint.reporter(stylish))
);
```