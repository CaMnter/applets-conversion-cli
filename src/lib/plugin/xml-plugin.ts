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

import BasePlugin from "./base-plugin";
import { AppletType } from "../type/applet-type";
import { xmlTransForm } from "../xml/xml-transform";

/**
 * @author CaMnter
 */

class XmlPlugin extends BasePlugin {

  private _$: CheerioStatic | undefined;

  constructor(target: AppletType, expect: AppletType) {
    super(target, expect);
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

  get $(): CheerioStatic | undefined {
    return this._$;
  }

}

export default XmlPlugin;