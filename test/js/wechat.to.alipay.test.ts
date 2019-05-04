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

// @ts-ignore
const assert = require('assert');
import { jsTransForm } from '../../lib/js/js-transform' ;
import { getBabelPluginWechatToAlipay } from '../../lib/plugin/provider' ;

describe('「wechat to alipay」', function () {

  it('wx.request => my.httpRequest', () => {
    const code = 'wx.request;';
    const expect = 'my.httpRequest;';
    assert.equal(jsTransForm(code, getBabelPluginWechatToAlipay()), expect);
  });

  it('wx.navigateTo => my.navigateTo', () => {
    const code = 'wx.navigateTo;';
    const expect = 'my.navigateTo;';
    assert.equal(jsTransForm(code, getBabelPluginWechatToAlipay()), expect);
  });

  it('wx.request() => my.httpRequest()', () => {
    const code = 'wx.request();';
    const expect = 'my.httpRequest();';
    assert.equal(jsTransForm(code, getBabelPluginWechatToAlipay()), expect);
  });

  it('wx.navigateTo() => my.navigateTo()', () => {
    const code = 'wx.navigateTo();';
    const expect = 'my.navigateTo();';
    assert.equal(jsTransForm(code, getBabelPluginWechatToAlipay()), expect);
  });

  it('wx[\"request\"]() => my[\"httpRequest\"]()', () => {
    const code = 'wx[\"request\"]();';
    const expect = 'my[\"httpRequest\"]();';
    assert.equal(jsTransForm(code, getBabelPluginWechatToAlipay()), expect);
  });

  it('wx[\"navigateTo\"]() => my[\"navigateTo\"]()', () => {
    const code = 'wx[\"navigateTo\"]();';
    const expect = 'my[\"navigateTo\"]();';
    assert.equal(jsTransForm(code, getBabelPluginWechatToAlipay()), expect);
  });

  it('wx.request({ url: \'https://www.camnter.com\' }) => my.request({ url: \'https://www.camnter.com\' })', () => {
    const code = 'wx.request({\n' +
      '  url: \'https://www.camnter.com\'\n' +
      '});';
    const expect = 'my.httpRequest({\n' +
      '  url: \'https://www.camnter.com\'\n' +
      '});';
    assert.equal(jsTransForm(code, getBabelPluginWechatToAlipay()), expect);
  });

  it('wx[\"request\"]({ url: \'https://www.camnter.com\' }) => my[\"httpRequest\"]({ url: \'https://www.camnter.com\' })', () => {
    const code = 'wx[\"request\"]({\n' +
      '  url: \'https://www.camnter.com\'\n' +
      '});';
    const expect = 'my[\"httpRequest\"]({\n' +
      '  url: \'https://www.camnter.com\'\n' +
      '});';
    assert.equal(jsTransForm(code, getBabelPluginWechatToAlipay()), expect);
  });

  it('wx[functionName]({ url: \'https://www.camnter.com\' }) => my[functionName]({ url: \'https://www.camnter.com\' })', () => {
    const code = 'wx[functionName]({\n' +
      '  url: \'https://www.camnter.com\'\n' +
      '});';
    const expect = 'my[functionName]({\n' +
      '  url: \'https://www.camnter.com\'\n' +
      '});';
    assert.equal(jsTransForm(code, getBabelPluginWechatToAlipay()), expect);
  });

});
