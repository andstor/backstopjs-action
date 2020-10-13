const core = require('@actions/core');
const exec = require('@actions/exec');

async function installBackstopjs() {
  let cmd = 'npm';
  let args = ['install', 'backstopjs', '--production', '--parseable'];
  core.info('Installing BackstopJS...');

  let installOutput = '';
  const options = {};
  options.listeners = {
      stdout: (data) => {
          installOutput += data.toString();
      }
  };

  await exec.exec(cmd, args, options);
  core.debug(`Installation output: ${installOutput}`);
}

module.exports = {
  installBackstopjs
};