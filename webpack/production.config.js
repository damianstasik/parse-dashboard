/*
 * Copyright (c) 2016-present, Parse, LLC
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */
var configuration = require('./base.config.js');

configuration.mode = 'production';
configuration.entry = {
  dashboard: './dashboard/index.tsx',
  login: './login/index.tsx',
  PIG: './parse-interface-guide/index.tsx',
  quickstart: './quickstart/index.tsx',
};
configuration.output.path = require('path').resolve('./production/bundles');

module.exports = configuration;
