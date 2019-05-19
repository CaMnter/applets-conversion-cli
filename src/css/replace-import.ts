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
import { replaceLastString } from "../utils/replace-last-string";
import { Rule, AtRule, Import, Comment, StyleRules, Stylesheet } from 'css';

/**
 * @author CaMnter
 */

export function replaceImport(target: CssType,
                              expect: CssType,
                              stylesheet?: Stylesheet): void {
  if (!stylesheet) {
    return;
  }
  const styleRules: StyleRules | undefined = stylesheet.stylesheet;
  if (!styleRules) {
    return;
  }
  const rules: Array<Rule | Comment | AtRule> = styleRules.rules;
  rules.forEach((value: Rule | Comment | AtRule) => {
    const { type } = value;
    if ('import' === type) {
      const valueImport: Import = value as Import;
      const importValue = valueImport.import;
      if (importValue) {
        let suffix: string = '';
        let replace: boolean = false;
        if (importValue.endsWith(`${ target }'`)) {
          suffix = `'`;
          replace = true;
        } else if (importValue.endsWith(`${ target }"`)) {
          suffix = `"`;
          replace = true;
        } else if (importValue.endsWith(`${ target }`)) {
          suffix = '';
          replace = true;
        }
        if (replace) {
          valueImport.import = replaceLastString(importValue, `${ target }${ suffix }`, `${ expect }${ suffix }`);
        }
      }
    }
  })
}