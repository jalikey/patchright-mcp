#!/usr/bin/env node
/**
 * Copyright (c) Microsoft Corporation.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

require('./playwright-extra-setup');

const { program } = require('patchright-core/lib/utilsBundle');
const { decorateCommand } = require('patchright/lib/mcp/program');

const packageJSON = require('./package.json');
const p = program.version('Version ' + packageJSON.version).name('Patchright MCP');

// 增强 proxy 支持
const originalParse = program.parseAsync;
program.parseAsync = async function(args) {
  // 这里可以加自定义 proxy 逻辑，如果上游没完全透传
  const result = await originalParse.call(this, args);
  return result;
};

decorateCommand(p, packageJSON.version);
void program.parseAsync(process.argv);
