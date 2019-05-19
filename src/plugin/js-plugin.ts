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

import { IPlugin } from "./i-plugin";
import { jsTransForm } from "../js/js-transform";

/**
 * @author CaMnter
 */

class JsPlugin implements IPlugin {

  private readonly _code: string | undefined | null;
  private readonly _babelPlugin: Function;

  private _result: string | undefined;

  constructor(code: string | undefined | null, babelPlugin: Function) {
    this._code = code;
    this._babelPlugin = babelPlugin;

    if (!code || '' === code) {
      throw new Error(`JsPlugin # constructor #「code」error: ${ code }`);
    }

    if (!babelPlugin) {
      throw new Error(`JsPlugin # constructor #「babelPlugin」error: ${ babelPlugin }`);
    }
  }

  run(): void {
    this._result = jsTransForm(this._code, this._babelPlugin);
  }

  get code(): string | undefined | null {
    return this._code;
  }

  get babelPlugin(): Function {
    return this._babelPlugin;
  }

  get result(): string | undefined {
    return this._result;
  }

}

export default JsPlugin;