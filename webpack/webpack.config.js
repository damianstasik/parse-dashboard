/*
 * Copyright (c) 2016-present, Parse, LLC
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */
import { resolve } from 'node:path';
import configuration from './base.config.js';

configuration.entry = {
  dashboard: './dashboard/index.js',
  login: './login/index.js',
  signup: './signup/index.js',
  PIG: './parse-interface-guide/index.js',
  quickstart: './quickstart/index.js',
};

configuration.output.path = resolve('./bundles');

export default configuration;
