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

  private readonly _babelPlugin: Function;

  private _result: string | undefined;

  constructor(babelPlugin: Function) {
    if (!babelPlugin) {
      throw new Error(`JsPlugin # constructor #「babelPlugin」error: ${ babelPlugin }`);
    }

    this._babelPlugin = babelPlugin;
  }

  run(code: string | undefined | null): string {
    if (!code || '' === code) {
      throw new Error(`XmlPlugin # constructor #「code」error: ${ code }`);
    }

    this._result = jsTransForm(code, this._babelPlugin);
    return this._result;
  }

  get babelPlugin(): Function {
    return this._babelPlugin;
  }

  get result(): string | undefined {
    return this._result;
  }

}

export default JsPlugin;