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

import chalk, { Chalk } from "chalk";

/**
 * @author CaMnter
 */

const red: Chalk = chalk.hex('#C13928');
const cyan: Chalk = chalk.hex('#6AC2CC');
const gray: Chalk = chalk.hex('#6F7783');
const white: Chalk = chalk.hex('#FFFFFF');
const green: Chalk = chalk.hex('#3BB82F');
const yellow: Chalk = chalk.hex('#DAAA7C');
const magenta: Chalk = chalk.hex('#D192E2');

/**
 * info
 *
 * @param text text
 * @param chalk chalk
 */
export function info(text: string, chalk?: Chalk) {
  console.log(gray('「info」'), chalk ? chalk(text) : text);
}

/**
 * warn
 *
 * @param text text
 * @param chalk chalk
 */
export function warn(text: string, chalk?: Chalk) {
  console.log(yellow('「warn」'), chalk ? chalk(text) : text);
}

/**
 * error
 *
 * @param text text
 * @param chalk chalk
 */
export function error(text: string, chalk?: Chalk) {
  console.log(red('「error」'), chalk ? chalk(text) : text);
}

/**
 * info any
 *
 * @param any any
 */
export function infoAny(any: any) {
  console.log(gray('「info」'), any);
}

/**
 * warn any
 *
 * @param any any
 */
export function warnAny(any: any) {
  console.log(gray('「warn」'), any);
}

/**
 * error any
 *
 * @param any any
 */
export function errorAny(any: any) {
  console.log(gray('「error」'), any);
}