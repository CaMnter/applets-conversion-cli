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

import { IPlugin } from "../i-plugin";
import { isLegalString } from "../../utils/utils";
import { BabelFileResult, transform } from "@babel/core";

/**
 * @author CaMnter
 */

abstract class BabelCodePlugin implements IPlugin {

  private _plugin: any;
  private _result: string | undefined;

  run(code: string | undefined | null): string {
    let expectCode: string = '';
    if (this._plugin && isLegalString(code)) {
      const opts: { plugins?: Array<any> } = {};
      opts.plugins = [this._plugin];
      const result: BabelFileResult | null = transform(code as string, opts);
      if (result && result.code && 'string' == typeof result.code) {
        expectCode = result.code;
      }
    } else {
      expectCode = code as string;
    }
    return expectCode;
  }


  get result(): string | undefined {
    return this._result;
  }

  /**
   * set plugin
   */
  abstract setPlugin(): any;

  get plugin(): any {
    return this._plugin;
  }

}

export default BabelCodePlugin;
