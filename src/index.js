const core = require('@actions/core');
const path = require('path');
//const utils = require('./utils');
const installer = require('./installer');

async function run() {
  try {
    const GITHUB_WORKSPACE = process.env.GITHUB_WORKSPACE;

    const command = core.getInput('command');
    const configFile = core.getInput('config_file');
    const filter = core.getInput('filter');

    const configPath = path.join(GITHUB_WORKSPACE, configFile);
    const options = {
      filter: filter,
      config: configPath
    }

    await installer.installBackstopjs();
    
    const backstopPath = path.join(__dirname, '../node_modules/backstopjs');
    console.log(backstopPath);

    const backstop = require(backstopPath);
    core.addPath(backstopPath);

    if (command) {
      backstop(command, options)
        .then(() => {
          // test successful
          core.info('Tests completed successfully!');
        }).catch(() => {
          // test failed
          core.setFailed('Tests failed!');
        }).finally(() => {

          //const config = await utils.getConfigObject(configPath);
          core.setOutput('backstopjs-dir', 'backstop_data');
          //core.setOutput('img-diff', config.paths.bitmaps_reference);
          //core.setOutput('img-diff', config.paths.bitmaps_test);
        });
        
      }

  } catch (error) {
    core.setFailed(error.message);
  }
}

run()
