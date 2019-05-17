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

import { expect } from 'chai';
import { jsTransForm } from '../../src/js/js-transform' ;
import BabelPluginAlipayToWechat from "../../src/babel-plugin/babel-plugin-alipay-to-wechat";

const plugin: Function = new BabelPluginAlipayToWechat().createPlugin()

describe('「alipay to wechat」', function () {

  it('my.httpRequest => wx.request', () => {
    const code = 'my.httpRequest;';
    const expectCode = 'wx.request;';
    expect(jsTransForm(code, plugin())).to.equal(expectCode);
  });

  it('my.navigateTo => wx.navigateTo', () => {
    const code = 'my.navigateTo;';
    const expectCode = 'wx.navigateTo;';
    expect(jsTransForm(code, plugin())).to.equal(expectCode);
  });

  it('my.httpRequest() => wx.request()', () => {
    const code = 'my.httpRequest();';
    const expectCode = 'wx.request();';
    expect(jsTransForm(code, plugin())).to.equal(expectCode);
  });

  it('my.navigateTo() => wx.navigateTo()', () => {
    const code = 'my.navigateTo();';
    const expectCode = 'wx.navigateTo();';
    expect(jsTransForm(code, plugin())).to.equal(expectCode);
  });

  it('my[\"httpRequest\"]() => wx[\"request\"]()', () => {
    const code = 'my[\"httpRequest\"]();';
    const expectCode = 'wx[\"request\"]();';
    expect(jsTransForm(code, plugin())).to.equal(expectCode);
  });

  it('my[\"navigateTo\"]() => wx[\"navigateTo\"]()', () => {
    const code = 'my[\"navigateTo\"]();';
    const expectCode = 'wx[\"navigateTo\"]();';
    expect(jsTransForm(code, plugin())).to.equal(expectCode);
  });

  it('my.httpRequest({ url: \'https://www.camnter.com\' }) => wx.request({ url: \'https://www.camnter.com\' })', () => {
    const code = 'my.httpRequest({\n' +
      '  url: \'https://www.camnter.com\'\n' +
      '});';
    const expectCode = 'wx.request({\n' +
      '  url: \'https://www.camnter.com\'\n' +
      '});';
    expect(jsTransForm(code, plugin())).to.equal(expectCode);
  });

  it('my[\"httpRequest\"]({ url: \'https://www.camnter.com\' }) => wx[\"request\"]({ url: \'https://www.camnter.com\' })', () => {
    const code = 'my[\"httpRequest\"]({\n' +
      '  url: \'https://www.camnter.com\'\n' +
      '});';
    const expectCode = 'wx[\"request\"]({\n' +
      '  url: \'https://www.camnter.com\'\n' +
      '});';
    expect(jsTransForm(code, plugin())).to.equal(expectCode);
  });

  it('my[functionName]({ url: \'https://www.camnter.com\' }) => wx[functionName]({ url: \'https://www.camnter.com\' })', () => {
    const code = 'my[functionName]({\n' +
      '  url: \'https://www.camnter.com\'\n' +
      '});';
    const expectCode = 'wx[functionName]({\n' +
      '  url: \'https://www.camnter.com\'\n' +
      '});';
    expect(jsTransForm(code, plugin())).to.equal(expectCode);
  });

})