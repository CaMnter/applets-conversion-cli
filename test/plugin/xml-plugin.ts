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

import { expect } from 'chai';
import XmlPlugin from "../../src/lib/plugin/xml-plugin";
import { AppletType } from "../../src/lib/type/applet-type";

/**
 * @author CaMnter
 */

describe('xml plugin', function () {

  it('xml plugin', () => {
    const code = '<view wx:if="{{Save}}"><view wx:for="{{you}}" wx:for-index="wxIndex" wx:for-item="wxItem"><text wx:key="{{wxIndex}}" catchtap="catchtap">{{wxItem}}</text></view></view>';
    const xmlPlugin: XmlPlugin = new XmlPlugin(AppletType.wx, AppletType.my);
    const result: string = xmlPlugin.run(code);
    expect(result).to.equal('<view a:if="{{Save}}"><view a:for="{{you}}" a:for-index="wxIndex" a:for-item="wxItem"><text a:key="{{wxIndex}}" catchTap="catchtap">{{wxItem}}</text></view></view>');
  });

});
