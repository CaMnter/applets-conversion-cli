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

import { overrideFileSync } from "../../../../src/utils/file-system/file-system";

/**
 * @author CaMnter
 */

describe('「override file sync」', function () {

  it('override file「same level」', () => {
    const input: string = 'test/utils/file/override-file-sync/input.ts';
    const output: string = 'test/utils/file/override-file-sync/output.ts';
    overrideFileSync(input, output, {
      override: function (content: string, absolutePath: string, relativePath: string) {
        return {
          content: `${ content }\n// Only save you from anything\n// Only save you from anything\n// Only save you from anything`,
          filePath: output
        }
      }
    });
  });

  it('override file「different level」', () => {
    const input: string = 'test/utils/file/override-file-sync/input.ts';
    const output: string = 'test/utils/file/override-file-sync/output/output.ts';
    overrideFileSync(input, output, {
      override: function (content: string, absolutePath: string, relativePath: string) {
        return {
          content: `${ content }\n// Only save you from anything\n// Only save you from anything\n// Only save you from anything`,
          filePath: output
        }
      }
    });
  });

});
