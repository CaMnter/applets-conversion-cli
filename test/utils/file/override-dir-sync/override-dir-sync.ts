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

import * as path from 'path';
import { overrideDirSync } from "../../../../src/lib/utils/file-system/file-system";

/**
 * @author CaMnter
 */

describe('「override dir sync」', function () {

  it('override dir「same level」', () => {
    const input: string = 'test/utils/file/override-dir-sync/input';
    const output: string = 'test/utils/file/override-dir-sync/input';
    overrideDirSync(input, output, {
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
    const input: string = 'test/utils/file/override-dir-sync/input';
    const output: string = 'test/utils/file/override-dir-sync/output/2333';
    overrideDirSync(input, output, {
      override: function (content: string, absolutePath: string, relativePath: string) {
        const basename: string = path.basename(absolutePath);
        return {
          content: `'Save you from anything'\n// Only save you from anything`,
          filePath: path.join(output, basename)
        }
      }
    });
  });

  it('override dir「fallback symbol」', () => {
    // const input: string = 'test/utils/file/override-dir-sync/input';
    // const output: string = '../../output/2333';
    // overrideDirSync(input, output, {
    //   override: function (content: string, absolutePath: string, relativePath: string) {
    //     const basename: string = path.basename(absolutePath);
    //     return {
    //       content: `'Save you from anything'\n// Only save you from anything`,
    //       filePath: path.join(output, basename)
    //     }
    //   }
    // });
  });

  it('override dir「absolute path」', () => {
    const input: string = 'test/utils/file/override-dir-sync/input';
    const output: string = path.resolve(process.cwd(), 'test/utils/file/override-dir-sync/output/23333');
    overrideDirSync(input, output, {
      override: function (content: string, absolutePath: string, relativePath: string) {
        const basename: string = path.basename(absolutePath);
        return {
          content: `'Save you from anything'\n// Only save you from anything`,
          filePath: path.join(output, basename)
        }
      }
    });
  });

});
