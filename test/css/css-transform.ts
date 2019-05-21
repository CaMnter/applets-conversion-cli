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
import { CssType } from "../../src/type/css-type";
import { cssTransform } from "../../src/css/css-transform";

/**
 * @author CaMnter
 */

describe('「css transform」', function () {

  it('css transform「single quotes」', () => {
    const code = '@import \'./sign/save.wxss\';\n' +
      '@import \'./sign/you.wxss\';\n' +
      '@import \'./sign/from.wxss\';\n' +
      '@import \'./sign/anything.wxss\';\n' +
      '\n' +
      '.save {\n' +
      '\twidth: 2333rpx;\n' +
      '\tbackground: #faebd7\n' +
      '}\n' +
      '\n' +
      '.you {\n' +
      '\tdisplay: flex;\n' +
      '\theight: 2233rpx;\n' +
      '\tflex-direction: column;\n' +
      '\tjustify-content: center;\n' +
      '\talign-items: center\n' +
      '}\n' +
      '\n' +
      '.from {\n' +
      '\twidth: 2233rpx;\n' +
      '\twidth: 233rpx;\n' +
      '\theight: 233rpx;\n' +
      '\tbackground: bisque;\n' +
      '\tbackground: #deb887\n' +
      '}\n' +
      '\n' +
      '.anything {\n' +
      '\tdisplay: flex;\n' +
      '\tflex-direction: column;\n' +
      '\tjustify-content: center;\n' +
      '\talign-items: center\n' +
      '}\n' +
      '\n' +
      '.anything {\n' +
      '\twidth: 23rpx;\n' +
      '\theight: 23rpx;\n' +
      '\tbackground: #ff69b4\n' +
      '}';
    const result = cssTransform(code, CssType.wxss, CssType.acss);
    expect(result).to.equal('@import \'./sign/save.acss\';\n' +
      '\n' +
      '@import \'./sign/you.acss\';\n' +
      '\n' +
      '@import \'./sign/from.acss\';\n' +
      '\n' +
      '@import \'./sign/anything.acss\';\n' +
      '\n' +
      '.save {\n' +
      '  width: 2333rpx;\n' +
      '  background: #faebd7;\n' +
      '}\n' +
      '\n' +
      '.you {\n' +
      '  display: flex;\n' +
      '  height: 2233rpx;\n' +
      '  flex-direction: column;\n' +
      '  justify-content: center;\n' +
      '  align-items: center;\n' +
      '}\n' +
      '\n' +
      '.from {\n' +
      '  width: 2233rpx;\n' +
      '  width: 233rpx;\n' +
      '  height: 233rpx;\n' +
      '  background: bisque;\n' +
      '  background: #deb887;\n' +
      '}\n' +
      '\n' +
      '.anything {\n' +
      '  display: flex;\n' +
      '  flex-direction: column;\n' +
      '  justify-content: center;\n' +
      '  align-items: center;\n' +
      '}\n' +
      '\n' +
      '.anything {\n' +
      '  width: 23rpx;\n' +
      '  height: 23rpx;\n' +
      '  background: #ff69b4;\n' +
      '}');
  });

  it('css transform「double quotes」', () => {
    const code = '@import \"./sign/save.wxss\";\n';
    const result = cssTransform(code, CssType.wxss, CssType.acss);
    expect(result).to.equal('@import "./sign/save.acss";');
  })

});
