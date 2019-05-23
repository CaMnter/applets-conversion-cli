/*
 * Copyright (C) 2019 CaMnter yuanyu.camnter@gmail.com
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import * as gulp from 'gulp';
import { Project } from "gulp-typescript";
import * as gulpTypescript from 'gulp-typescript';
import * as gulpSourcemaps from 'gulp-sourcemaps';
import { ICompileStream } from "gulp-typescript/release/project";

/**
 * @author CaMnter
 */

const mergeStream: Function = require('merge-stream');
const tsProject: Project = gulpTypescript.createProject('tsconfig.json');

gulp.task('compile', () => {
  const tsResult: ICompileStream = gulp.src(['src/**/*.ts'])
    .pipe(gulpSourcemaps.init())
    .pipe(tsProject());
  return mergeStream(tsResult)
    .pipe(gulpSourcemaps.write('.'))
    .pipe(gulp.dest(tsProject.options.outDir || 'es5'));
});