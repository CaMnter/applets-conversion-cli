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

/**
 * Created by：CaMnter
 */

import * as fs from 'fs';
import * as glob from 'glob';
import * as path from 'path';
import { Stats, WriteFileOptions } from 'fs';
import { isString, isFunction } from './utils'

/**
 * override sync
 *
 * @param input input
 * @param output string
 * @param options object
 */
export function overrideSync(
  input: string,
  output: string,
  options: {
    flag?: string,
    encoding?: string | null,
    // fileContent: string, filePath: string
    override?: (content: string, absolutePath: string, relativePath: string) => { content?: string, filePath?: string } | undefined
    [option: string]: string | boolean | Function | undefined | null
  }
): void {
  if (!(input && isString(input))) {
    return;
  }
  if (!(output && isString(output))) {
    return;
  }

  const expectOptions = {
    encoding: 'utf8',
    ...options,
  };

  const stats: Stats = fs.statSync(input);
  const isFile = stats.isFile();
  const isDirectory = stats.isDirectory();
  if (isFile) {
    overrideFileSync(input, output, expectOptions);
  } else if (isDirectory) {
    overrideDirSync(input, output, expectOptions);
  }
}

/**
 * override file sync
 *
 * @param input input
 * @param output string
 * @param options object
 */
export function overrideFileSync(
  input: string,
  output: string,
  options: {
    flag?: string,
    encoding?: string | null,
    inputAbsolutePath?: string | null,
    // content?: string, absolutePath?: string, relativePath?: string
    override?: (content: string, absolutePath: string, relativePath: string) => { content?: string, filePath?: string } | undefined
    [option: string]: string | boolean | Function | undefined | null
  }
): void {
  const mkFile: boolean = mkFileSync(output);
  if (!mkFile) {
    throw new Error(`mkFile error, path = ${ output }`);
    return;
  }

  let content: string = fs.readFileSync(input, options) as string;
  let filePath: string = output;
  if (options && options.override && isFunction(options.override)) {
    let inputAbsolutePath = options.inputAbsolutePath as string;
    if (!(inputAbsolutePath && isString(inputAbsolutePath) && '' !== inputAbsolutePath)) {
      inputAbsolutePath = path.join(process.cwd(), input);
    }
    const result: { content?: string, filePath?: string } | undefined = options.override(
      content,
      inputAbsolutePath,
      input
    );
    if (result && result.content) {
      content = result.content;
    }
    if (result && result.filePath) {
      filePath = result.filePath;
    }
  }
  writeFileSync(filePath, content);
}

/**
 * override dir sync
 *
 * @param input input
 * @param output output
 * @param options options
 */
export function overrideDirSync(
  input: string,
  output: string,
  options: {
    flag?: string,
    encoding?: string | null,
    // fileContent: string, filePath: string
    override?: (content: string, absolutePath: string, relativePath: string) => { content?: string, filePath?: string } | undefined
    [option: string]: string | boolean | Function | undefined | null
  }
): void {
  const mkdir: boolean = mkdirSync(output);
  if (!mkdir) {
    throw new Error(`mkdir error, path = ${ output }`);
    return;
  }

  const currentDirPath: string = process.cwd();
  const inputAbsolutePath: string = path.join(currentDirPath, input);
  const globPattern = inputAbsolutePath + '!(node_modules)/**/*.{js,ts,axml,wxml,acss,wxss}';
  const globResult: string[] = glob.sync(globPattern);

  globResult.forEach(filePath => {
    // TODO filter
    options.relativePath = input;
    options.absolutePath = path.join(currentDirPath, filePath);
    const basename: string = path.basename(filePath);
    const createFilePath: string = path.join(output, basename);
    overrideFileSync(filePath, createFilePath, options)
  });
}

/**
 * write file sync
 *
 * @param filePath filePath
 * @param content content
 * @param options options
 */
export function writeFileSync(
  filePath: string,
  content: string,
  options?: WriteFileOptions
): void {
  if (!(filePath && isString(filePath))) {
    return;
  }

  const dir: string = path.dirname(filePath);
  mkdirSync(dir);
  fs.writeFileSync(filePath, content, options);
}

/**
 * mk file sync
 *
 * @param input input
 */
export function mkFileSync(input: string): boolean {
  if (!(input && isString(input))) {
    return false;
  }

  const targetFilePath: string = path.join(input);
  if (targetFilePath && fs.existsSync(targetFilePath)) {
    return true;
  }

  const targetDirPath: string = path.dirname(targetFilePath);
  if (fs.existsSync(targetDirPath)) {
    return true;
  }

  fs.mkdirSync(targetDirPath);
  return true;
}

/**
 * mk dir sync
 *
 * @param input input
 */
export function mkdirSync(input: string): boolean {
  if (!(input && isString(input))) {
    return false;
  }

  let targetDirPath: string = path.join(input);
  if (targetDirPath && fs.existsSync(targetDirPath)) {
    return true;
  }

  let actualDeepestPath: string = getActualDeepestPath(input);
  let actualChildrenPath: string = path.relative(actualDeepestPath, input);

  // no need to create
  if (!actualChildrenPath) {
    return true;
  }

  /**
   * eg:
   *
   *「input」'app/page/my/index.js'
   *「actualDeepestPath」'app/page'
   *「actualChildrenPath」'my/index.js'
   *
   *「actualChildrenPathList」['my', 'index.js']
   */
  const startsWithSlash: boolean = targetDirPath.startsWith(path.sep);
  const startsWithFallbackSymbol: boolean = targetDirPath.startsWith(`..${ path.sep }`);
  let actualPath: string = '';
  if (startsWithSlash) {
    /**
     * /**
     */
    actualPath = path.join(targetDirPath);
    actualDeepestPath = getActualDeepestPath(actualPath);
    actualChildrenPath = path.relative(actualDeepestPath, actualPath);

    mkDirsSync(actualDeepestPath, actualChildrenPath);
  } else if (startsWithFallbackSymbol) {
    /**
     * ../**
     */
    actualPath = path.resolve(process.cwd(), targetDirPath);
    actualDeepestPath = getActualDeepestPath(actualPath);
    actualChildrenPath = path.relative(actualDeepestPath, actualPath);

    mkDirsSync(actualDeepestPath, actualChildrenPath);
  } else {
    /**
     * **
     * normal
     */
    mkDirsSync(actualDeepestPath, actualChildrenPath);
  }
  return true;
}

/**
 * mk dirs sync
 *
 * @param actualDeepestPath actualDeepestPath
 * @param actualChildrenPath actualChildrenPath
 */
export function mkDirsSync(actualDeepestPath: string, actualChildrenPath: string): void {
  let outputDirPath: string = actualDeepestPath;
  const actualChildrenPathList: Array<string> = actualChildrenPath.split(path.sep);
  actualChildrenPathList.forEach((dirname: string) => {
    outputDirPath = path.join(outputDirPath, dirname);
    const exists: boolean = fs.existsSync(outputDirPath);
    if (!exists) {
      fs.mkdirSync(outputDirPath);
    }
  });
}

/**
 * get actual deepest path
 *
 * @param input input
 */
export function getActualDeepestPath(input: string): string {
  const exists: boolean = fs.existsSync(input);
  if (!exists) {
    return getActualDeepestPath(path.dirname(input));
  } else {
    return input;
  }
}