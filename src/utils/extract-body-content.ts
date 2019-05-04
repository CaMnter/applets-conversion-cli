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
 * Created by：CaMnter
 */

/**
 * Extract body content
 *
 * @param $ CheerioStatic
 */
export function extractBodyContent($?: CheerioStatic): string {
  if (!($ && $.html && 'function' === typeof $.html)) {
    return '';
  }
  const body = $('body');
  return body && body.children && 'function' === typeof body.children ?
    $.html(body.children(), {
      xmlMode: true,
      lowerCaseTags: true,
      recognizeSelfClosing: true
    }) : '';
}
