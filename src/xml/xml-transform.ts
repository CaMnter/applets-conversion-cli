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

import { load } from "cheerio";
import { AppletType } from "../type/applet-type";
import { replaceAttrs } from "./replace-attrs";
import { extractBodyContent } from "./extract-body-content";

/**
 * @author CaMnter
 */

/**
 * xml transForm
 *
 * @param code code
 * @param target target
 * @param expect expect
 */
export function xmlTransForm(code: string | undefined | null,
                             target: AppletType,
                             expect: AppletType): { $: CheerioStatic, bodyContent: string } {
  const $: CheerioStatic = load(code as string);
  replaceAttrs(target, expect, $);
  const bodyContent: string = extractBodyContent($);
  return {
    $,
    bodyContent
  };
}
