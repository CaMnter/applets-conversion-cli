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
import { AppletType } from "../type/applet-type";
import { xmlTransForm } from "../xml/xml-transform";

/**
 * @author CaMnter
 */

class XmlPlugin implements IPlugin {

  private readonly _target: AppletType;
  private readonly _expect: AppletType;

  private _result: string | undefined;
  private _$: CheerioStatic | undefined;

  constructor(target: AppletType, expect: AppletType) {
    if (!target) {
      throw new Error(`XmlPlugin # constructor #「target」error: ${ target }`);
    }

    if (!expect) {
      throw new Error(`XmlPlugin # constructor #「expect」error: ${ expect }`);
    }

    this._target = target;
    this._expect = expect;
  }

  run(code: string | undefined | null): string {
    if (!code || '' === code) {
      throw new Error(`XmlPlugin # constructor #「code」error: ${ code }`);
    }
    const { $, bodyContent } = xmlTransForm(code, this._target, this._expect);
    this._$ = $;
    this._result = bodyContent;
    return this._result;
  }

  get target(): AppletType {
    return this._target;
  }

  get expect(): AppletType {
    return this._expect;
  }

  get result(): string | undefined {
    return this._result;
  }

  get $(): CheerioStatic | undefined {
    return this._$;
  }

}

export default XmlPlugin;