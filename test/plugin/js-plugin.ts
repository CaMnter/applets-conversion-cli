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

import { expect } from "chai";
import JsPlugin from "../../src/plugin/js-plugin";
import BabelPluginAlipayToWechat from "../../src/babel-plugin/babel-plugin-alipay-to-wechat";
import BabelPluginWechatToAlipay from "../../src/babel-plugin/babel-plugin-wechat-to-alipay";

/**
 * @author CaMnter
 */

const babelPluginAlipayToWechat: Function = new BabelPluginAlipayToWechat().createPlugin();
const babelPluginWechatToAlipay: Function = new BabelPluginWechatToAlipay().createPlugin();

describe('js plugin', function () {

  it('my.httpRequest => wx.request', () => {
    const code = 'my.httpRequest;';
    const expectCode = 'wx.request;';
    const jsPlugin: JsPlugin = new JsPlugin(code, babelPluginAlipayToWechat);
    jsPlugin.run();
    expect(jsPlugin.result).to.equal(expectCode);
  });

  it('my.navigateTo => wx.navigateTo', () => {
    const code = 'my.navigateTo;';
    const expectCode = 'wx.navigateTo;';
    const jsPlugin: JsPlugin = new JsPlugin(code, babelPluginAlipayToWechat);
    jsPlugin.run();
    expect(jsPlugin.result).to.equal(expectCode);
  });

  it('my.httpRequest() => wx.request()', () => {
    const code = 'my.httpRequest();';
    const expectCode = 'wx.request();';
    const jsPlugin: JsPlugin = new JsPlugin(code, babelPluginAlipayToWechat);
    jsPlugin.run();
    expect(jsPlugin.result).to.equal(expectCode);
  });

  it('my.navigateTo() => wx.navigateTo()', () => {
    const code = 'my.navigateTo();';
    const expectCode = 'wx.navigateTo();';
    const jsPlugin: JsPlugin = new JsPlugin(code, babelPluginAlipayToWechat);
    jsPlugin.run();
    expect(jsPlugin.result).to.equal(expectCode);
  });

  it('my[\"httpRequest\"]() => wx[\"request\"]()', () => {
    const code = 'my[\"httpRequest\"]();';
    const expectCode = 'wx[\"request\"]();';
    const jsPlugin: JsPlugin = new JsPlugin(code, babelPluginAlipayToWechat);
    jsPlugin.run();
    expect(jsPlugin.result).to.equal(expectCode);
  });

  it('my[\"navigateTo\"]() => wx[\"navigateTo\"]()', () => {
    const code = 'my[\"navigateTo\"]();';
    const expectCode = 'wx[\"navigateTo\"]();';
    const jsPlugin: JsPlugin = new JsPlugin(code, babelPluginAlipayToWechat);
    jsPlugin.run();
    expect(jsPlugin.result).to.equal(expectCode);
  });

  it('my.httpRequest({ url: \'https://www.camnter.com\' }) => wx.request({ url: \'https://www.camnter.com\' })', () => {
    const code = 'my.httpRequest({\n' +
      '  url: \'https://www.camnter.com\'\n' +
      '});';
    const expectCode = 'wx.request({\n' +
      '  url: \'https://www.camnter.com\'\n' +
      '});';
    const jsPlugin: JsPlugin = new JsPlugin(code, babelPluginAlipayToWechat);
    jsPlugin.run();
    expect(jsPlugin.result).to.equal(expectCode);
  });

  it('my[\"httpRequest\"]({ url: \'https://www.camnter.com\' }) => wx[\"request\"]({ url: \'https://www.camnter.com\' })', () => {
    const code = 'my[\"httpRequest\"]({\n' +
      '  url: \'https://www.camnter.com\'\n' +
      '});';
    const expectCode = 'wx[\"request\"]({\n' +
      '  url: \'https://www.camnter.com\'\n' +
      '});';
    const jsPlugin: JsPlugin = new JsPlugin(code, babelPluginAlipayToWechat);
    jsPlugin.run();
    expect(jsPlugin.result).to.equal(expectCode);
  });

  it('my[functionName]({ url: \'https://www.camnter.com\' }) => wx[functionName]({ url: \'https://www.camnter.com\' })', () => {
    const code = 'my[functionName]({\n' +
      '  url: \'https://www.camnter.com\'\n' +
      '});';
    const expectCode = 'wx[functionName]({\n' +
      '  url: \'https://www.camnter.com\'\n' +
      '});';
    const jsPlugin: JsPlugin = new JsPlugin(code, babelPluginAlipayToWechat);
    jsPlugin.run();
    expect(jsPlugin.result).to.equal(expectCode);
  });

  // wx

  it('wx.request => my.httpRequest', () => {
    const code = 'wx.request;';
    const expectCode = 'my.httpRequest;';
    const jsPlugin: JsPlugin = new JsPlugin(code, babelPluginWechatToAlipay);
    jsPlugin.run();
    expect(jsPlugin.result).to.equal(expectCode);
  });

  it('wx.navigateTo => my.navigateTo', () => {
    const code = 'wx.navigateTo;';
    const expectCode = 'my.navigateTo;';
    const jsPlugin: JsPlugin = new JsPlugin(code, babelPluginWechatToAlipay);
    jsPlugin.run();
    expect(jsPlugin.result).to.equal(expectCode);
  });

  it('wx.request() => my.httpRequest()', () => {
    const code = 'wx.request();';
    const expectCode = 'my.httpRequest();';
    const jsPlugin: JsPlugin = new JsPlugin(code, babelPluginWechatToAlipay);
    jsPlugin.run();
    expect(jsPlugin.result).to.equal(expectCode);
  });

  it('wx.navigateTo() => my.navigateTo()', () => {
    const code = 'wx.navigateTo();';
    const expectCode = 'my.navigateTo();';
    const jsPlugin: JsPlugin = new JsPlugin(code, babelPluginWechatToAlipay);
    jsPlugin.run();
    expect(jsPlugin.result).to.equal(expectCode);
  });

  it('wx[\"request\"]() => my[\"httpRequest\"]()', () => {
    const code = 'wx[\"request\"]();';
    const expectCode = 'my[\"httpRequest\"]();';
    const jsPlugin: JsPlugin = new JsPlugin(code, babelPluginWechatToAlipay);
    jsPlugin.run();
    expect(jsPlugin.result).to.equal(expectCode);
  });

  it('wx[\"navigateTo\"]() => my[\"navigateTo\"]()', () => {
    const code = 'wx[\"navigateTo\"]();';
    const expectCode = 'my[\"navigateTo\"]();';
    const jsPlugin: JsPlugin = new JsPlugin(code, babelPluginWechatToAlipay);
    jsPlugin.run();
    expect(jsPlugin.result).to.equal(expectCode);
  });

  it('wx.request({ url: \'https://www.camnter.com\' }) => my.request({ url: \'https://www.camnter.com\' })', () => {
    const code = 'wx.request({\n' +
      '  url: \'https://www.camnter.com\'\n' +
      '});';
    const expectCode = 'my.httpRequest({\n' +
      '  url: \'https://www.camnter.com\'\n' +
      '});';
    const jsPlugin: JsPlugin = new JsPlugin(code, babelPluginWechatToAlipay);
    jsPlugin.run();
    expect(jsPlugin.result).to.equal(expectCode);
  });

  it('wx[\"request\"]({ url: \'https://www.camnter.com\' }) => my[\"httpRequest\"]({ url: \'https://www.camnter.com\' })', () => {
    const code = 'wx[\"request\"]({\n' +
      '  url: \'https://www.camnter.com\'\n' +
      '});';
    const expectCode = 'my[\"httpRequest\"]({\n' +
      '  url: \'https://www.camnter.com\'\n' +
      '});';
    const jsPlugin: JsPlugin = new JsPlugin(code, babelPluginWechatToAlipay);
    jsPlugin.run();
    expect(jsPlugin.result).to.equal(expectCode);
  });

  it('wx[functionName]({ url: \'https://www.camnter.com\' }) => my[functionName]({ url: \'https://www.camnter.com\' })', () => {
    const code = 'wx[functionName]({\n' +
      '  url: \'https://www.camnter.com\'\n' +
      '});';
    const expectCode = 'my[functionName]({\n' +
      '  url: \'https://www.camnter.com\'\n' +
      '});';
    const jsPlugin: JsPlugin = new JsPlugin(code, babelPluginWechatToAlipay);
    jsPlugin.run();
    expect(jsPlugin.result).to.equal(expectCode);
  });

});
