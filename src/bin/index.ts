#!/usr/bin/env node

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

import * as commander from "commander";
import { appletsConversionTool, AppletsConversionToolParams } from "../index";

/**
 * @author CaMnter
 */

let currentVersion = 'latest';
try {
  const { version } = require('../../package.json');
  currentVersion = version;
} catch (e) {
}

commander
  .version(currentVersion || 'latest')
  .usage('[options] <any>')
  .option('-s, --src <string>', '目标路径')
  .option('-o, --out <string>', '输出路径')
  .option('-t, --target <string>', '目标类型「\'wx\', \'my\'」')
  .option('-e, --expect <string>', '期望类型「\'wx\', \'my\'」')
  .option('-5, --es5 <boolean>', '是否转为 es5', false)
  .option('-f, --filter <string>', '过滤关键字「node_module, .tea, .idea」等', '')
  .parse(process.argv);

const { src, out, target, expect, es5 } = commander;

const filter: string = commander.filter;
let expectFilter: Array<string> = [];
if (filter && '' !== filter) {
  expectFilter = filter.split(',');
}
if (expectFilter.length > 0) {
  expectFilter = expectFilter.map((value: string) => {
    return value.trim();
  });
}

const params: AppletsConversionToolParams = {
  src,
  out,
  target,
  expect,
  options: {
    es5: es5 ? true : false,
    filter: expectFilter || [],
  }
};

appletsConversionTool(params);
