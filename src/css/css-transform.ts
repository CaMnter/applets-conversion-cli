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

import { CssType } from "./type/css-type";
import { replaceImport } from "./replace-import";
import { parse, stringify, Stylesheet } from "css";

/**
 * @author CaMnter
 */

/**
 * css transform
 *
 * @param code code
 * @param target target
 * @param expect expect
 */
export function cssTransform(code: string | undefined | null, target: CssType, expect: CssType): string {
  let expectCode: string = '';
  if (!code) {
    return expectCode;
  }
  const stylesheet: Stylesheet = parse(code, {});
  replaceImport(target, expect, stylesheet);
  expectCode = stringify(stylesheet, { indent: '  ' });
  return expectCode;
}
