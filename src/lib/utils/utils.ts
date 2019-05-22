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
 * @author CaMnter
 */

const toString = Object.prototype.toString;

/**
 * is object
 *
 * @param target target
 */
export function isObject(target: any | undefined): boolean {
  return '[object Object]' === toString.call(target);
}

/**
 * is function
 *
 * @param target target
 */
export function isFunction(target: any | undefined): boolean {
  return target && 'function' === typeof target;
}

/**
 * is string
 *
 * @param target target
 */
export function isString(target: any | undefined): boolean {
  return target && 'string' === typeof target;
}

/**
 * is number
 *
 * @param target target
 */
export function isNumber(target: any | undefined): boolean {
  return target && 'number' === typeof target;
}

/**
 * nothing to do
 */
export function nothingToDo() {

}