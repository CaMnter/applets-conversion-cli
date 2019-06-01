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

import { load } from 'cheerio';
import { expect } from 'chai';
import { AppletType } from "../../src/lib/type/applet-type";
import { replaceAttrs } from "../../src/lib/xml/replace-attrs";

/**
 * @author CaMnter
 */

describe('「replace attrs」', function () {

  it('replace attrs xml「wx -> my」', () => {
    const code = '<scroll-view wx:if="{{Save}}" bindscroll="onScroll"><view wx:for="{{you}}" wx:for-index="wxIndex" wx:for-item="wxItem"><text wx:key="{{wxIndex}}" bindtap="onTap">{{wxItem}}</text></view></scroll-view>';
    let $ = load(code);
    replaceAttrs(AppletType.wx, AppletType.my, $);
    expect($.html()).to.equal('<html><head></head><body><scroll-view a:if="{{Save}}" onScroll="onScroll"><view a:for="{{you}}" a:for-index="wxIndex" a:for-item="wxItem"><text a:key="{{wxIndex}}" onTap="onTap">{{wxItem}}</text></view></scroll-view></body></html>');
  });

  it('replace attrs xml「my -> wx」', () => {
    const code = '<scroll-view a:if="{{Save}}" onScroll="onScroll"><view a:for="{{you}}" a:for-index="wxIndex" a:for-item="wxItem"><text a:key="{{wxIndex}}" onTap="onTap">{{wxItem}}</text></view></scroll-view>';
    let $ = load(code, { xmlMode: false, lowerCaseAttributeNames: false });
    replaceAttrs(AppletType.my, AppletType.wx, $);
    expect($.html()).to.equal('<html><head></head><body><scroll-view wx:if="{{Save}}" bindscroll="onScroll"><view wx:for="{{you}}" wx:for-index="wxIndex" wx:for-item="wxItem"><text wx:key="{{wxIndex}}" bindtap="onTap">{{wxItem}}</text></view></scroll-view></body></html>');
  });

});
