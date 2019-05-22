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

import { BabelFileResult, transform } from "@babel/core";

/**
 * @author CaMnter
 */

export function jsTransForm(code: string | undefined | null, babelPlugin: Function): string {
  let expectCode = '';
  if (!code) {
    return expectCode;
  }
  // IApplet
  const opts: { plugins?: Array<any> } = {};
  if (babelPlugin) {
    opts.plugins = [babelPlugin];
    const result: BabelFileResult | null = transform(code, opts);
    if (result && result.code && 'string' == typeof result.code) {
      expectCode = result.code;
    }
  }
  return expectCode;
}