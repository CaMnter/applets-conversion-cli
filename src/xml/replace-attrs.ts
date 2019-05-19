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
 * @author CaMnter
 */

import { AppletType } from "../type/applet-type";
import { alipayToWechatXmlMap } from "./map/alipay-to-wechat-map";
import { wechatToAlipayXmlMap } from "./map/wechat-to-alipay-map";

/**
 * xml transform
 *
 * @param target AppletType
 * @param expect AppletType
 * @param $ CheerioStatic
 */
export function replaceAttrs(target: AppletType, expect: AppletType, $?: CheerioStatic): CheerioStatic | undefined {
  if (!$) {
    return undefined;
  }

  const map: { [attr: string]: string } | undefined = getXmlAttrsMap(target, expect);
  if (!map) {
    return undefined;
  }

  $('*').each((index: number, element: CheerioElement) => {
    const attribs: { [attr: string]: string } = element.attribs;
    if (attribs) {
      const expectAttribs: { [attr: string]: string } = {};
      Object.keys(element.attribs).forEach((attrName: string) => {
        const alipayAttrName = (map as { [attr: string]: string })[attrName];
        if (alipayAttrName) {
          const value = element.attribs[attrName];
          expectAttribs[alipayAttrName] = value;
        }
      });
      element.attribs = expectAttribs;
    }
  });

  return $;
}

/**
 * get xml attrs map
 *
 * @param target AppletType
 * @param expect AppletType
 */
export function getXmlAttrsMap(target: AppletType, expect: AppletType): { [attr: string]: string } | undefined {
  let map: { [attr: string]: string } | undefined = undefined;
  if (AppletType.wx === target && AppletType.my === expect) {
    map = wechatToAlipayXmlMap;
  } else if (AppletType.my === target && AppletType.wx === expect) {
    map = alipayToWechatXmlMap;
  }
  return map;
}