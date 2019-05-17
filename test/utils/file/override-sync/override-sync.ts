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

import { overrideFileSync, overrideSync } from "../../../../src/utils/file-system/file";
import * as path from "path";

/**
 * Created by：CaMnter
 */

describe('「override sync」', function () {

  it('override dir「same level」', () => {
    const input: string = 'test/utils/file/override-sync/input';
    const output: string = 'test/utils/file/override-sync/input';
    overrideSync(input, output, {
      override: function (content: string, absolutePath: string, relativePath: string) {
        const basename: string = path.basename(absolutePath);
        return {
          content: `'Save you from anything'// Only save you from anything`,
          filePath: path.join(output, basename)
        }
      }
    });
  });

  it('override dir「different level」', () => {
    const input: string = 'test/utils/file/override-sync/input';
    const output: string = 'test/utils/file/override-sync/output/2333';
    overrideSync(input, output, {
      override: function (content: string, absolutePath: string, relativePath: string) {
        const basename: string = path.basename(absolutePath);
        return {
          content: `'Save you from anything'\n// Only save you from anything`,
          filePath: path.join(output, basename)
        }
      }
    });
  });

  it('override dir「absolute path」', () => {
    const input: string = 'test/utils/file/override-sync/input';
    const output: string = path.resolve(process.cwd(), 'test/utils/file/override-sync/output/23333');
    overrideSync(input, output, {
      override: function (content: string, absolutePath: string, relativePath: string) {
        const basename: string = path.basename(absolutePath);
        return {
          content: `'Save you from anything'\n// Only save you from anything`,
          filePath: path.join(output, basename)
        }
      }
    });
  });

  it('override file「same level」', () => {
    const input: string = 'test/utils/file/override-sync/input.ts';
    const output: string = 'test/utils/file/override-sync/output.ts';
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
    const input: string = 'test/utils/file/override-sync/input.ts';
    const output: string = 'test/utils/file/override-sync/output/output.ts';
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

