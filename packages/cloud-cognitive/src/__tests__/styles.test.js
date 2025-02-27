/**
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const { renderSync } = require('node-sass');
const { resolve } = require('path');

const name = 'CSS export checks';

describe(name, () => {
  // This test will fail if the generated CSS changes and no longer matches
  // the snapshot. If a change to the exported CSS for released components is
  // intended, re-run the tests with -u to update the snapshot, and check the
  // fresh snapshot in as part of the PR.
  it("doesn't change the exported CSS for released components", () => {
    expect(
      renderSync({
        file: resolve(__dirname, '../index-without-carbon-released-only.scss'),
        includePaths: [resolve(__dirname, '../../../../node_modules')],
        outputStyle: 'expanded',
      }).css.toString()
    ).toMatchSnapshot();
  });

  // This test will fail if any generated CSS changes.
  it.skip("doesn't change any of the generated CSS", () => {
    expect(
      renderSync({
        file: resolve(__dirname, '../index.scss'),
        includePaths: [resolve(__dirname, '../../../../node_modules')],
        outputStyle: 'expanded',
      }).css.toString()
    ).toMatchSnapshot();
  });

  // This test will fail if the project settings generates any CSS, as this
  // file should be including definitions and variables only.
  it("doesn't generate any CSS from the project settings", () => {
    expect(
      renderSync({
        file: resolve(__dirname, '../global/styles/_project-settings.scss'),
        includePaths: [resolve(__dirname, '../../../../node_modules')],
        outputStyle: 'compressed',
      }).css.toString()
    ).toHaveLength(0);
  });
});
