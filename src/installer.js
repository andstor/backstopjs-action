const core = require('@actions/core');
const exec = require('@actions/exec');
const path = require('path');

async function installBackstopjs() {
  const actionDir = path.join(__dirname, '../');

  let cmd = 'npm';
  let args = ['install', 'backstopjs', '--production', '--parseable'];
  core.info('Installing BackstopJS...');
  core.debug(`Command: ${cmd} ${args}`);

  let installOutput = '';
  const options = {};
  options.listeners = {
    stdout: (data) => {
      installOutput += data.toString();
    }
  };
  options.cwd = actionDir;

  await exec.exec(cmd, args, options);
  await exec.exec('ls','', options)
  core.debug(`Installation output: ${installOutput}`);
  return;
}

module.exports = {
  installBackstopjs
};