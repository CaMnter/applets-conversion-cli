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

import { BabelPluginWechatToAlipay } from "./babel-plugin-wechat-to-alipay";
import { BabelPluginAlipayToWechat } from "./babel-plugin-alipay-to-wechat";

export function getBabelPluginWechatToAlipay(): Function {
  return new BabelPluginWechatToAlipay().createPlugin();
}

export function getBabelPluginAlipayToWechat(): Function {
  return new BabelPluginAlipayToWechat().createPlugin();
}