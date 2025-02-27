/**
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * This file compiles a list of codesandbox examples and gallery-config/index.js  in the example-gallery project.
 * The information written is of the form:
 * [{
 *   label: "Either the folder name or a value read from a config file.",
 *   url: "The url of the codesandbox",
 *   thumbnail: "The local path of a thumbnail or url of the form 'url(...)'"
 * }, ...]
 *
 * A peer folder is deemed to be an example package if it contains either a package.json or a gallery.config.js.
 *
 * Each example folder can have a config file `gallery.config.js` however it is not ordinarily needed.
 * By default the following mapping is made
 * {
 *   label: folder name,
 *   url: baseUrl + folder name, // baseUrl is `https://codesandbox.io/s/github/carbon-design-system/ibm-cloud-cognitive/tree/main/examples/cloud-cognitive/`
 *   thumbnail: folder name + '/thumbnail.png'
 * }
 *
 * NOTE: If no thumbnail is found then the thumbnail value is omitted from the output.
 * NOTE2: A local config file allows examples not in this repo to  be added
 *
 * The resulting IBM Cloud Cognitive package example-gallery can be seen here
 * https://codesandbox.io/s/github/carbon-design-system/ibm-cloud-cognitive/tree/main/examples/cloud-cognitive/example-gallery
 */

const path = require('path');
const fs = require('fs');

const updateGalleryConfig = () => {
  const directoryPath = path.join(__dirname, '../../examples/cloud-cognitive');
  const galleryConfigDir = path.join(
    directoryPath,
    'example-gallery/src/gallery-config'
  );
  const galleryConfigPath = path.join(galleryConfigDir, '/index.js');

  const deleteAndRecreateGalleryConfigDir = () => {
    // delete and recreate config folder
    if (fs.existsSync(galleryConfigDir)) {
      fs.rmdirSync(galleryConfigDir, { recursive: true });
    }
    fs.mkdirSync(galleryConfigDir);
  };

  const getExampleDirectories = () => {
    // gets a list of peer directories excluding ones starting 'example-gallery'
    const directories = fs
      .readdirSync(directoryPath, { withFileTypes: true })
      .filter(
        (item) => item.isDirectory() && !item.name.startsWith('example-gallery')
      )
      .map((item) => item.name);

    return directories;
  };

  const getExampleDirectoriesConfig = (directories) => {
    // examines peer directories and adds config for them if they have a package.json

    const newConfig = [];
    // add the config for each dir
    directories.forEach((dir) => {
      const examplePath = path.join(directoryPath, dir);
      const configPath = path.join(examplePath, 'gallery.config.json');

      const hasPackage = fs.existsSync(path.join(examplePath, 'package.json'));

      if (hasPackage) {
        let config;
        const hasGalleryConfig = fs.existsSync(configPath);

        if (hasGalleryConfig) {
          const configRaw = fs.readFileSync(configPath);
          config = JSON.parse(configRaw);
        }

        // config can include label and thumbnail for package
        const label = config?.label || dir;

        // find a thumbnail if it exists
        const thumbnail = [config?.thumbnail, 'thumbnail.png'].find((file) => {
          if (!file) {
            return false;
          }

          const filePath = path.join(examplePath, file);
          return fs.existsSync(filePath);
        });

        // config url or default
        const url =
          config?.url ??
          `https://codesandbox.io/s/github/carbon-design-system/ibm-cloud-cognitive/tree/main/examples/cloud-cognitive/${dir}`;

        const output = { label, url };

        // have a thumbnail so add it to th config
        if (thumbnail) {
          // use basename of the thumbnailPath discarding any folders
          const newThumbnailName = `${dir}--${path.basename(thumbnail)}`;

          fs.copyFileSync(
            path.join(examplePath, thumbnail),
            path.join(galleryConfigDir, newThumbnailName)
          );
          output.thumbnail = `./${newThumbnailName}`;
        }

        newConfig.push(output);
      }
    });

    return newConfig;
  };

  const getMergedConfig = (config) => {
    let mergedConfig;
    // appends any local config to the passed in config
    const localConfigPath = path.join(__dirname, 'gallery.config.json');

    if (fs.existsSync(localConfigPath)) {
      const localConfigRaw = fs.readFileSync(localConfigPath);
      const localConfig = JSON.parse(localConfigRaw);

      if (localConfig?.examples?.length > 0) {
        mergedConfig = config.concat(localConfig.examples);
      }
    }
    if (!mergedConfig) {
      mergedConfig = config.slice();
    }

    return mergedConfig;
  };

  const writeGalleryConfig = (config) => {
    // const configString = JSON.stringify(config);
    fs.writeFileSync(galleryConfigPath, 'const config = [');
    config.forEach((item) => {
      const thumbnail =
        item.thumbnail && item.thumbnail.startsWith('url(')
          ? `'${item.thumbnail}'`
          : "'url( ' + require('" + item.thumbnail + "').default + ')'";
      fs.appendFileSync(
        galleryConfigPath,
        `{ label: '${item.label}', url: '${item.url}', thumbnail: ${thumbnail} },`
      );
    });
    fs.appendFileSync(galleryConfigPath, ']; export default config;');
  };

  // Starts here
  deleteAndRecreateGalleryConfigDir();
  const directories = getExampleDirectories();
  const dirConfig = getExampleDirectoriesConfig(directories);
  const mergedConfig = getMergedConfig(dirConfig);
  // console.dir(mergedConfig);
  writeGalleryConfig(mergedConfig);
};

updateGalleryConfig();
