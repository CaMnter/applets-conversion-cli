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
import { Stats, WriteFileOptions } from 'fs';
import * as path from 'path';
import { isString, isFunction } from './utils'

export function overrideSync(
  input: string,
  output: string,
  options: {
    flag?: string,
    encoding?: string | null,
    // fileContent: string, filePath: string
    override?: (content?: string, absolutePath?: string, relativePath?: string) => { content?: string, filePath?: string } | undefined
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

export function overrideFileSync(
  input: string,
  output: string,
  options: {
    flag?: string,
    encoding?: string | null,
    // fileContent: string, filePath: string
    override?: (content?: string, absolutePath?: string, relativePath?: string) => { content?: string, filePath?: string } | undefined
    [option: string]: string | boolean | Function | undefined | null
  }
): void {
  const mkFile: boolean = mkFileSync(output);
  if (mkFile) {
    throw new Error(`mkFile error, path = ${ output }`);
    return;
  }

  let content: string = fs.readFileSync(input, options) as string;
  let filePath: string = output;
  if (options && options.override && isFunction(options.override)) {
    const result: { content?: string, filePath?: string } | undefined = options.override(content, filePath);
    if (result && result.content) {
      content = result.content;
    }
    if (result && result.filePath) {
      filePath = result.filePath;
    }
  }
  writeFileSync(filePath, content);
}

export function overrideDirSync(
  input: string,
  output: string,
  options: {
    flag?: string,
    encoding?: string | null,
    // fileContent: string, filePath: string
    override?: (content?: string, absolutePath?: string, relativePath?: string) => { content?: string, filePath?: string } | undefined
    [option: string]: string | boolean | Function | undefined | null
  }
): void {
  const mkdir: boolean = mkdirSync(output);
  if (mkdir) {
    throw new Error(`mkdir error, path = ${ output }`);
    return;
  }

  // TODO readdirSync

}

export function writeFileSync(filePath: string, content: string, options?: WriteFileOptions): void {
  if (!(filePath && isString(filePath))) {
    return;
  }

  const dir: string = path.dirname(filePath);
  mkdirSync(dir);
  fs.writeFileSync(filePath, content);
}

export function mkFileSync(input: string): boolean {
  if (!(input && isString(input) && fs.existsSync(input))) {
    return false;
  }

  fs.mkdirSync(path.join(input));
  return true;
}

export function mkdirSync(input: string): boolean {
  if (!(input && isString(input) && fs.existsSync(input))) {
    return false;
  }

  const actualDeepestPath: string = getActualDeepestPath(input);
  const actualChildrenPath: string = path.relative(actualDeepestPath, input);

  // no need to create
  if (actualChildrenPath) {
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
   *「forEach」
   *「1」「path.join(actualDeepestPath, childrenPath)」app/page/my
   *「2」「path.join(actualDeepestPath, childrenPath)」app/page/my/index.js
   */
  const actualChildrenPathList: Array<string> = actualChildrenPath.split(path.sep);
  actualChildrenPathList.forEach((childrenPath: string) => {
    fs.mkdirSync(path.join(actualDeepestPath, childrenPath));
  });
  return true;
}

export function getActualDeepestPath(input: string): string {
  const exists: boolean = fs.existsSync(input);
  if (!exists) {
    return getActualDeepestPath(path.dirname(input));
  } else {
    return input;
  }
}