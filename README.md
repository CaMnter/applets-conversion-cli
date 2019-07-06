# applets-conversion-tool

<br>

# 简介

<br>

小程序转换工具，支持了较为普遍的转换场景，比如：xml，js，css。目前，只支持「微信」和「支付宝」

<br>
<br>

# 安装

<br>

```powershell
npm install applets-conversion-tool -g
```

<br>
<br>

# 使用

<br>

**参数**
| 参数 | 值 | 描述
|:-|:-|:-|
| -s「--src」 | path | 转换前的输入目录路径 |
| -o「--out」 | path | 转换后的输出目录路径 |
| -t「--target」| wx, my | 输入目录的小程序类型「目前只支持 wx, my」 |
| -e「--expect」| wx, my | 输出目录的小程序类型「目前只支持 wx, my」 |
| -5「--es5」| true, false | 遇到一些 es6 语法时，是否转为 es5？ |
| -f「--filter」| string | 过滤关键字，过滤存在对应关键字在文件路径，默认过滤「node_modules, .tea, .idea」 |

<br>

**Demo**

```shell
# -s
applets-conversion-tool -t wx -e my -s test/applets/wechat-demo

# -o
applets-conversion-tool -t wx -e my -s test/applets/wechat-demo -o test/applets/wechat-demo-to-alipay

# -f
applets-conversion-tool -t wx -e my -s test/applets/wechat-demo -o test/applets/wechat-demo-to-alipay-filter -f expect-filter-dir

# -5
applets-conversion-tool -t wx -e my -s test/applets/wechat-demo -o test/applets/wechat-demo-to-alipay-filter-es5 -f expect-filter-dir -5 true
```

<br>
<br>

# TODO

<br>

- - [ ] PluginClassProperties
- - [ ] Json
- - [ ] wxs, sjs

<br>
<br>

# License

      Copyright (C) 2019 CaMnter yuanyu.camnter@gmail.com

      Licensed under the Apache License, Version 2.0 (the "License");
      you may not use this file except in compliance with the License.
      You may obtain a copy of the License at

         http://www.apache.org/licenses/LICENSE-2.0

      Unless required by applicable law or agreed to in writing, software
      distributed under the License is distributed on an "AS IS" BASIS,
      WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
      See the License for the specific language governing permissions and
      limitations under the License.